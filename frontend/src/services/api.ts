import type { APIResponse, TVMazeSearchResult, APIError } from '../../../shared/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export class ApiService {
	static async searchShows(
		query: string,
		signal?: AbortSignal
	): Promise<APIResponse<TVMazeSearchResult[]> | APIError> {
		try {
			const response = await fetch(`${API_BASE_URL}/api/search/shows?q=${encodeURIComponent(query)}`, {
				signal
			});
			const data = await response.json();

			if (!response.ok) {
				return data as APIError;
			}

			return data as APIResponse<TVMazeSearchResult[]>;
		} catch (error) {
			if (error instanceof Error && error.name === 'AbortError') {
				throw error;
			}

			return {
				error: 'Network Error',
				message: 'Failed to connect to the server. Please check if the backend is running.'
			};
		}
	}
}
