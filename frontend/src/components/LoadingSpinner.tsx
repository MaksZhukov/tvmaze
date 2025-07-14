import { CircularProgress, Box } from '@mui/material';

interface LoadingSpinnerProps {
	size?: 'sm' | 'md' | 'lg';
	className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', className = '' }) => {
	const sizeMap = {
		sm: 24,
		md: 40,
		lg: 60
	};

	return (
		<Box className={className} display='flex' justifyContent='center' alignItems='center'>
			<CircularProgress size={sizeMap[size]} />
		</Box>
	);
};
