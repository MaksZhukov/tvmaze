import React from 'react';
import { Link } from '@mui/material';

interface ExternalLinkProps {
	href: string;
	children: React.ReactNode;
}

export const ExternalLink: React.FC<ExternalLinkProps> = ({ href, children }) => (
	<Link href={href} target='_blank' rel='noopener noreferrer'>
		{children}
	</Link>
);
