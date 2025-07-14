import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());
const TVMAZE_BASE_URL = 'https://api.tvmaze.com';
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'TVMaze API server is running' });
});
app.get('/api/search/shows', async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) {
            const error = {
                error: 'Missing query parameter',
                message: 'Query parameter "q" is required'
            };
            return res.status(400).json(error);
        }
        const response = await axios.get(`${TVMAZE_BASE_URL}/search/shows`, {
            params: { q },
            timeout: 10000
        });
        const apiResponse = {
            success: true,
            data: response.data,
            count: response.data.length
        };
        res.json(apiResponse);
    }
    catch (error) {
        console.error('Error fetching shows:', error instanceof Error ? error.message : 'Unknown error');
        if (axios.isAxiosError(error)) {
            if (error.response) {
                const apiError = {
                    error: 'TVMaze API error',
                    message: error.response.data?.message || error.message
                };
                res.status(error.response.status).json(apiError);
            }
            else if (error.request) {
                const apiError = {
                    error: 'TVMaze API is unavailable',
                    message: 'Could not reach TVMaze API'
                };
                res.status(503).json(apiError);
            }
            else {
                const apiError = {
                    error: 'Internal server error',
                    message: error.message
                };
                res.status(500).json(apiError);
            }
        }
        else {
            const apiError = {
                error: 'Internal server error',
                message: error instanceof Error ? error.message : 'Unknown error'
            };
            res.status(500).json(apiError);
        }
    }
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    const apiError = {
        error: 'Something broke!',
        message: err.message
    };
    res.status(500).json(apiError);
});
app.use('*', (req, res) => {
    const apiError = {
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
//# sourceMappingURL=server.js.map