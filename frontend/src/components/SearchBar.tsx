import { useState, useEffect } from 'react';
import { TextField, InputAdornment, Box } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';

interface SearchBarProps {
	onSearch: (query: string) => void;
	placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder = 'Search for TV shows...' }) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [query, setQuery] = useState(() => searchParams.get('q') || '');

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			onSearch(query);
			if (query.trim()) {
				setSearchParams({ q: query.trim() });
			} else {
				setSearchParams({});
			}
		}, 500);

		return () => clearTimeout(timeoutId);
	}, [query, onSearch]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
	};

	return (
		<Box>
			<TextField
				fullWidth
				value={query}
				onChange={handleInputChange}
				placeholder={placeholder}
				variant='outlined'
				InputProps={{
					startAdornment: (
						<InputAdornment position='start'>
							<SearchIcon color='action' />
						</InputAdornment>
					)
				}}
				sx={{
					'& .MuiOutlinedInput-root': {
						fontSize: '1.125rem',
						'&:hover fieldset': {
							borderColor: 'primary.main'
						}
					}
				}}
			/>
		</Box>
	);
};
