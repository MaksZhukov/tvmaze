import React from 'react';
import { Box, Typography } from '@mui/material';

interface InfoFieldProps {
	label: string;
	value: React.ReactNode;
	fullWidth?: boolean;
}

export const InfoField: React.FC<InfoFieldProps> = ({ label, value, fullWidth = false }) => (
	<Box sx={fullWidth ? { gridColumn: '1 / -1' } : undefined}>
		<Typography variant='subtitle2' color='text.secondary'>
			{label}
		</Typography>
		<Typography variant='body2'>{value}</Typography>
	</Box>
);
