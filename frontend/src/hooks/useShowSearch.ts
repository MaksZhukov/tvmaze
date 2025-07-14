import { useState, useCallback, useRef } from 'react';
import { ApiService } from '../services/api';
import type { TVMazeSearchResult } from '../../../shared/types';

interface UseShowSearchReturn {
	searchResults: TVMazeSearchResult[];
	loading: boolean;
	error: string | null;
	searchShows: (query: string) => Promise<void>;
	clearResults: () => void;
}

export const useShowSearch = (): UseShowSearchReturn => {
	const [searchResults, setSearchResults] = useState<TVMazeSearchResult[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const abortControllerRef = useRef<AbortController | null>(null);

	const clearResults = useCallback(() => {
		if (abortControllerRef.current) {
			abortControllerRef.current.abort();
			abortControllerRef.current = null;
		}

		setSearchResults([]);
		setError(null);
		setLoading(false);
	}, []);

	const searchShows = useCallback(
		async (query: string) => {
			if (!query.trim()) {
				clearResults();
				return;
			}

			if (abortControllerRef.current) {
				abortControllerRef.current.abort();
			}

			abortControllerRef.current = new AbortController();
			const currentAbortController = abortControllerRef.current;

			setLoading(true);
			setError(null);
			setSearchResults([]);

			try {
				const result = await ApiService.searchShows(query, currentAbortController.signal);

				if (abortControllerRef.current === currentAbortController) {
					if ('error' in result) {
						setError(result.message);
						setSearchResults([]);
					} else {
						setSearchResults(result.data);
						setError(null);
					}
				}
			} catch (error) {
				if (
					abortControllerRef.current === currentAbortController &&
					!(error instanceof Error && error.name === 'AbortError')
				) {
					setError('An unexpected error occurred');
					setSearchResults([]);
				}
			} finally {
				if (abortControllerRef.current === currentAbortController) {
					setLoading(false);
				}
			}
		},
		[clearResults]
	);

	return {
		searchResults,
		loading,
		error,
		searchShows,
		clearResults
	};
};
