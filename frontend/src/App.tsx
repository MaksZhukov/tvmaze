import { Container, Typography, Box, Alert, AlertTitle, Paper, ThemeProvider, createTheme } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { SearchBar } from './components/SearchBar';
import { ShowCard } from './components/ShowCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ShowDetailsModal } from './components/ShowDetailsModal';
import { useShowSearch } from './hooks/useShowSearch';
import { useCallback, useState } from 'react';
import type { TVMazeShow } from '../../shared/types';

const theme = createTheme();

function App() {
	const { searchResults, loading, error, searchShows } = useShowSearch();
	const [selectedShow, setSelectedShow] = useState<TVMazeShow | null>(null);
	const [modalOpen, setModalOpen] = useState(false);

	const handleSearch = useCallback(searchShows, [searchShows]);

	const handleCardClick = (show: TVMazeShow) => {
		setSelectedShow(show);
		setModalOpen(true);
	};

	const handleCloseModal = () => {
		setModalOpen(false);
		setSelectedShow(null);
	};

	return (
		<ThemeProvider theme={theme}>
			<Box
				sx={{
					minHeight: '100vh',
					background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
					py: 4
				}}>
				<Container maxWidth='xl'>
					<Box textAlign='center' mb={6}>
						<Typography variant='h2' component='h1' gutterBottom sx={{ fontWeight: 'bold' }}>
							TV Show Search
						</Typography>
						<Typography variant='h6' color='text.secondary' gutterBottom>
							Discover your next favorite TV show
						</Typography>

						<Box display='flex' justifyContent='center' alignItems='center' gap={1} mt={2}></Box>
					</Box>

					<Box maxWidth='md' mx='auto' mb={6}>
						<SearchBar onSearch={handleSearch} placeholder='Search for TV shows...' />
					</Box>

					{error && (
						<Box maxWidth='md' mx='auto' mb={4}>
							<Alert severity='error'>
								<AlertTitle>Error</AlertTitle>
								{error}
							</Alert>
						</Box>
					)}

					{loading && (
						<Box maxWidth='md' mx='auto' mb={4}>
							<LoadingSpinner size='lg' />
							<Typography variant='body1' textAlign='center' color='text.secondary' mt={2}>
								Searching for shows...
							</Typography>
						</Box>
					)}

					{searchResults.length > 0 && (
						<Box mb={6}>
							<Typography variant='h4' component='h2' textAlign='center' gutterBottom>
								Found {searchResults.length} show{searchResults.length !== 1 ? 's' : ''}
							</Typography>

							<Box display='grid' gridTemplateColumns='repeat(auto-fill, minmax(280px, 1fr))' gap={3}>
								{searchResults.map((result) => (
									<Box key={result.show.id}>
										<ShowCard
											show={result.show}
											score={result.score}
											onCardClick={handleCardClick}
										/>
									</Box>
								))}
							</Box>
						</Box>
					)}

					{!loading && !error && searchResults.length === 0 && (
						<Box maxWidth='md' mx='auto' textAlign='center'>
							<Paper elevation={1} sx={{ p: 4 }}>
								<SearchIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
								<Typography variant='h6' component='h3' gutterBottom>
									No shows found
								</Typography>
								<Typography variant='body1' color='text.secondary'>
									Try searching for a different TV show or movie title.
								</Typography>
							</Paper>
						</Box>
					)}
				</Container>
			</Box>

			<ShowDetailsModal show={selectedShow} open={modalOpen} onClose={handleCloseModal} />
		</ThemeProvider>
	);
}

export default App;
