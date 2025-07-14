import type { TVMazeShow } from '../../../../shared/types';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Typography,
	Box,
	Chip,
	Rating,
	Divider,
	Stack,
	IconButton
} from '@mui/material';
import { Close as CloseIcon, Star as StarIcon } from '@mui/icons-material';
import { InfoField } from './InfoField';
import { ExternalLink } from './ExternalLink';
import { NetworkChannel } from './NetworkChannel';

interface ShowDetailsModalProps {
	show: TVMazeShow | null;
	open: boolean;
	onClose: () => void;
}

export const ShowDetailsModal: React.FC<ShowDetailsModalProps> = ({ show, open, onClose }) => {
	if (!show) return null;

	const formatRating = (rating: number | null) => {
		return rating ? rating / 2 : 0;
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

	const formatDate = (dateString: string | null) => {
		if (!dateString) return 'Unknown';
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	};

	const formatSchedule = (schedule: { time: string; days: string[] }) => {
		if (schedule.days.length === 0) return 'No schedule available';
		const days = schedule.days.join(', ');
		return `${days} at ${schedule.time}`;
	};

	const renderInfoField = (condition: boolean, label: string, value: React.ReactNode, fullWidth = false) => {
		return condition ? <InfoField key={label} label={label} value={value} fullWidth={fullWidth} /> : null;
	};

	return (
		<Dialog
			open={open}
			onClose={onClose}
			maxWidth='md'
			fullWidth
			PaperProps={{
				sx: {
					borderRadius: 2,
					maxHeight: '90vh'
				}
			}}>
			<DialogTitle sx={{ pb: 1 }}>
				<Box display='flex' justifyContent='space-between' alignItems='center'>
					<Typography variant='h5' component='h2' sx={{ fontWeight: 'bold' }}>
						{show.name}
					</Typography>
					<IconButton onClick={onClose} size='small'>
						<CloseIcon />
					</IconButton>
				</Box>
			</DialogTitle>

			<DialogContent dividers>
				<Box display='flex' gap={3} flexDirection={{ xs: 'column', md: 'row' }}>
					<Box sx={{ width: { xs: '100%', md: '33%' } }}>
						<Box
							component='img'
							src={show.image?.original || show.image?.medium || '/placeholder-show.svg'}
							alt={show.name}
							sx={{
								width: '100%',
								height: 'auto',
								borderRadius: 1,
								objectFit: 'cover'
							}}
						/>
					</Box>

					<Box sx={{ flex: 1 }}>
						<Stack spacing={2}>
							<Box
								display='flex'
								justifyContent='space-between'
								alignItems='center'
								flexWrap='wrap'
								gap={1}>
								<Chip
									label={formatStatus(show.status)}
									color={getStatusColor(show.status) as 'success' | 'error' | 'default'}
									size='medium'
								/>
								{show.rating.average && (
									<Box display='flex' alignItems='center' gap={1}>
										<Rating
											value={formatRating(show.rating.average)}
											readOnly
											icon={<StarIcon fontSize='inherit' />}
										/>
										<Typography variant='body2' color='text.secondary'>
											({show.rating.average}/10)
										</Typography>
									</Box>
								)}
							</Box>

							{show.genres.length > 0 && (
								<Box>
									<Typography variant='subtitle2' color='text.secondary' gutterBottom>
										Genres
									</Typography>
									<Box display='flex' gap={1} flexWrap='wrap'>
										{show.genres.map((genre) => (
											<Chip key={genre} label={genre} size='small' variant='outlined' />
										))}
									</Box>
								</Box>
							)}

							{show.summary && (
								<Box>
									<Typography variant='subtitle2' color='text.secondary' gutterBottom>
										Summary
									</Typography>
									<Typography
										variant='body2'
										sx={{ lineHeight: 1.6 }}
										dangerouslySetInnerHTML={{
											__html: show.summary.replace(/<[^>]*>/g, '')
										}}
									/>
								</Box>
							)}

							<Divider />

							<Box display='grid' gridTemplateColumns='repeat(auto-fit, minmax(200px, 1fr))' gap={2}>
								{renderInfoField(!!show.type, 'Type', show.type)}
								{renderInfoField(!!show.language, 'Language', show.language)}
								{renderInfoField(!!show.premiered, 'Premiered', formatDate(show.premiered))}
								{renderInfoField(!!show.ended, 'Ended', formatDate(show.ended))}
								{renderInfoField(!!show.runtime, 'Runtime', `${show.runtime} minutes`)}
								{renderInfoField(
									!!show.averageRuntime,
									'Average Runtime',
									`${show.averageRuntime} minutes`
								)}

								{show.network && (
									<NetworkChannel
										label='Network'
										name={show.network.name}
										country={show.network.country}
									/>
								)}

								{show.webChannel && (
									<NetworkChannel
										label='Web Channel'
										name={show.webChannel.name}
										country={show.webChannel.country}
									/>
								)}

								{renderInfoField(!!show.schedule, 'Schedule', formatSchedule(show.schedule), true)}

								{show.officialSite && (
									<InfoField
										label='Official Site'
										value={
											<ExternalLink href={show.officialSite}>Visit Official Site</ExternalLink>
										}
										fullWidth
									/>
								)}

								{show.externals.imdb && (
									<InfoField
										label='External Links'
										value={
											<Box display='flex' gap={2}>
												<ExternalLink
													href={`https://www.imdb.com/title/${show.externals.imdb}`}>
													IMDb
												</ExternalLink>
												{show.url && <ExternalLink href={show.url}>TVMaze</ExternalLink>}
											</Box>
										}
										fullWidth
									/>
								)}
							</Box>
						</Stack>
					</Box>
				</Box>
			</DialogContent>

			<DialogActions sx={{ p: 2 }}>
				<Button onClick={onClose} variant='contained'>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
};
