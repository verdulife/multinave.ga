import { browser } from '$app/env';
import { writable } from 'svelte/store';
import type { DeviceSelection } from '$lib/types';

let defaults: DeviceSelection;

export const UserStore = writable(
	(browser && JSON.parse(localStorage.getItem('UserStore'))) || {
		protocol: 'http',
		host: 'localhost',
		port: '4000',
		defaults: {
			desktop: 0,
			mobile: 0
		},
		first_visit: true
	}
);

UserStore.subscribe((val) => {
	browser && (localStorage.UserStore = JSON.stringify(val));
	defaults = val.defaults;
});

export const deviceSelection = writable(defaults);
