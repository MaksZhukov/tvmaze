import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import { TVMazeSearchResult, APIResponse, APIError } from '../../shared/types';
import helmet from 'helmet';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(helmet());

const TVMAZE_BASE_URL = 'https://api.tvmaze.com';

app.get('/api/search/shows', async (req: Request<{}, {}, {}, { q: string }>, res: Response) => {
	try {
		const { q } = req.query;

		if (!q) {
			const error: APIError = {
				error: 'Missing query parameter',
				message: 'Query parameter "q" is required'
			};
			return res.status(400).json(error);
		}

		const response = await axios.get<TVMazeSearchResult[]>(`${TVMAZE_BASE_URL}/search/shows`, {
			params: { q }
		});

		const apiResponse: APIResponse<TVMazeSearchResult[]> = {
			success: true,
			data: response.data,
			count: response.data.length
		};

		res.json(apiResponse);
	} catch (error) {
		console.error('Error fetching shows:', error instanceof Error ? error.message : 'Unknown error');

		if (axios.isAxiosError(error)) {
			if (error.response) {
				console.error('TVMaze API error:', error.response.data);
			} else if (error.request) {
				console.error('TVMaze API is unavailable');
			}
		} else {
			console.error('Error fetching shows:', error instanceof Error ? error.message : 'Unknown error');
		}

		const apiError: APIError = {
			error: 'Internal server error',
			message: error instanceof Error ? error.message : 'Unknown error'
		};
		res.status(500).json(apiError);
	}
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	console.error(err.stack);
	const apiError: APIError = {
		error: 'Something broke!',
		message: err.message
	};
	res.status(500).json(apiError);
});

// 404 handler
app.use('*', (req: Request, res: Response) => {
	const apiError: APIError = {
		error: 'Route not found',
		message: `Cannot ${req.method} ${req.originalUrl}`
	};
	res.status(404).json(apiError);
});

app.listen(PORT, () => {
	console.log(`🚀 TVMaze API server running on port ${PORT}`);
	console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
	console.log(`🔍 Search shows: http://localhost:${PORT}/api/search/shows?q=banana`);
});
