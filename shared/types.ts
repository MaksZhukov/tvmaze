export interface TVMazeShowNetwork {
	id: number;
	name: string;
	country: {
		name: string;
		code: string;
		timezone: string;
	};
	officialSite: string | null;
}

export interface TVMazeShowWebChannel extends TVMazeShowNetwork {}

export interface TVMazeShowLinks {
	self: {
		href: string;
	};
	previousepisode?: {
		href: string;
		name: string;
	};
}

export interface TVMazeShowImage {
	medium: string;
	original: string;
}

export interface TVMazeShow {
	id: number;
	url: string;
	name: string;
	type: string;
	language: string;
	genres: string[];
	status: string;
	runtime: number | null;
	averageRuntime: number | null;
	premiered: string | null;
	ended: string | null;
	officialSite: string | null;
	schedule: {
		time: string;
		days: string[];
	};
	rating: {
		average: number | null;
	};
	weight: number;
	network: TVMazeShowNetwork | null;
	webChannel: TVMazeShowWebChannel | null;
	dvdCountry: string | null;
	externals: {
		tvrage: number | null;
		thetvdb: number | null;
		imdb: string | null;
	};
	image: TVMazeShowImage | null;
	summary: string | null;
	updated: number;
	_links: TVMazeShowLinks;
}

export interface TVMazeSearchResult {
	score: number;
	show: TVMazeShow;
}

export interface APIResponse<T> {
	success: boolean;
	data: T;
	count?: number;
}

export interface APIError {
	error: string;
	message: string;
}

export interface SearchQuery {
	q: string;
}
