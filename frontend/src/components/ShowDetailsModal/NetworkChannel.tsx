import React from 'react';
import { InfoField } from './InfoField';

interface NetworkChannelProps {
	label: string;
	name: string;
	country?: { name: string } | null;
}

export const NetworkChannel: React.FC<NetworkChannelProps> = ({ label, name, country }) => (
	<InfoField
		label={label}
		value={
			<>
				{name}
				{country && ` (${country.name})`}
			</>
		}
		fullWidth
	/>
);
