export type Device = {
	name: string;
	type: string;
	size: {
		width: number;
		height: number;
	};
};

export type DeviceSelection = {
	desktop: number;
	mobile: number;
};
