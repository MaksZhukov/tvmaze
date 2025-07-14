import type { TVMazeShow } from '@shared/types';
import { Card, CardContent, CardMedia, Typography, Chip, Box, Rating, Stack, Divider } from '@mui/material';
import { Star as StarIcon } from '@mui/icons-material';

interface ShowCardProps {
	show: TVMazeShow;
	score?: number;
	onCardClick?: (show: TVMazeShow) => void;
}

export const ShowCard: React.FC<ShowCardProps> = ({ show, score, onCardClick }) => {
	const formatGenres = (genres: string[]) => {
		return genres.join(', ');
	};

	const formatRating = (rating: number | null) => {
		return rating ? rating / 2 : 0; // Convert from 10-point to 5-point scale
	};

	const formatStatus = (status: string) => {
		return status.charAt(0).toUpperCase() + status.slice(1);
	};

	const getStatusColor = (status: string) => {
		switch (status.toLowerCase()) {
			case 'running':
				return 'success';
			case 'ended':
				return 'error';
			default:
				return 'default';
		}
	};

	const handleCardClick = () => {
		if (onCardClick) {
			onCardClick(show);
		}
	};

	return (
		<Card
			onClick={handleCardClick}
			sx={{
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				transition: 'box-shadow 0.3s ease-in-out, transform 0.2s ease-in-out',
				cursor: onCardClick ? 'pointer' : 'default',
				'&:hover': {
					boxShadow: 6,
					transform: onCardClick ? 'translateY(-2px)' : 'none'
				}
			}}>
			<Box sx={{ position: 'relative' }}>
				<CardMedia
					component='img'
					height='200'
					image={show.image?.medium || '/placeholder-show.svg'}
					alt={show.name}
					sx={{ objectFit: 'cover' }}
				/>
				{score && (
					<Chip
						label={`Score: ${score.toFixed(1)}`}
						color='primary'
						size='small'
						sx={{
							position: 'absolute',
							top: 8,
							right: 8,
							fontWeight: 'bold'
						}}
					/>
				)}
			</Box>

			<CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
				<Typography variant='h6' component='h3' gutterBottom sx={{ fontWeight: 'bold' }}>
					{show.name}
				</Typography>

				<Stack spacing={1} sx={{ mb: 2 }}>
					{show.genres.length > 0 && (
						<Box>
							<Typography variant='body2' color='text.secondary' sx={{ fontWeight: 'medium' }}>
								Genres: {formatGenres(show.genres)}
							</Typography>
						</Box>
					)}

					<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
						<Typography variant='body2' color='text.secondary' sx={{ fontWeight: 'medium' }}>
							Status:
						</Typography>
						<Chip
							label={formatStatus(show.status)}
							color={getStatusColor(show.status) as 'success' | 'error' | 'default'}
							size='small'
						/>
					</Box>

					{show.rating.average && (
						<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
							<Typography variant='body2' color='text.secondary' sx={{ fontWeight: 'medium' }}>
								Rating:
							</Typography>
							<Rating
								value={formatRating(show.rating.average)}
								readOnly
								size='small'
								icon={<StarIcon fontSize='inherit' />}
							/>
						</Box>
					)}

					{show.premiered && (
						<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
							<Typography variant='body2' color='text.secondary' sx={{ fontWeight: 'medium' }}>
								Premiered:
							</Typography>
							<Typography variant='body2' color='text.primary'>
								{new Date(show.premiered).getFullYear()}
							</Typography>
						</Box>
					)}

					{show.network && (
						<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
							<Typography variant='body2' color='text.secondary' sx={{ fontWeight: 'medium' }}>
								Network:
							</Typography>
							<Typography variant='body2' color='text.primary'>
								{show.network.name}
							</Typography>
						</Box>
					)}
				</Stack>

				{show.summary && (
					<>
						<Divider sx={{ my: 1 }} />
						<Typography
							variant='body2'
							color='text.secondary'
							sx={{
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								display: '-webkit-box',
								WebkitLineClamp: 3,
								WebkitBoxOrient: 'vertical'
							}}
							dangerouslySetInnerHTML={{
								__html: show.summary.replace(/<[^>]*>/g, '')
							}}
						/>
					</>
				)}
			</CardContent>
		</Card>
	);
};
