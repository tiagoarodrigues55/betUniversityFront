// registers in JSON file for simplicity, store in a db for production applications
import { supabase } from './supabaseClient';

import { User } from '../Types';

export const users = {
	getUserByEmail: async (email) =>
		await supabase.from('users').select('*').eq('email', email).single(),
	getUserById: async (id) =>
		await supabase.from('users').select('*').eq('id', id).single(),
	getAll: async () => await supabase.from('users').select('*'),
	create: async (register) => await supabase.from('users').insert(register),
	update: async (email, params) =>
		await supabase.from('users').update(params).match({ email }),
};

export const events = {
	getEventByName: async (name) =>
		await supabase.from('events').select('*').eq('name', name).single(),
	getEventById: async (id) =>
		await supabase.from('events').select('*').eq('id', id).single(),
	getEventsByProps: async (propValue, propName) =>
		await supabase.from('events').select('*').eq(propName, propValue),
	getAll: async () => await supabase.from('events').select('*'),
	create: async (register) => await supabase.from('events').insert(register),
	update: async (name, params) =>
		await supabase.from('events').update(params).match({ name }),
};

export const bets = {
	getBetsByEventId: async (event_id) =>
		await supabase.from('events').select('*').eq('event_id', event_id),
	getEventsByProps: async (propValue, propName) =>
		await supabase.from('events').select('*').eq(propName, propValue),
	getAll: async () => await supabase.from('events').select('*'),
	create: async (register) => await supabase.from('events').insert(register),
	update: async (name, params) =>
		await supabase.from('events').update(params).match({ name }),
};

export const getUser = async (email: string) => {
	const response = await supabase
		.from('users')
		.select('*')
		.eq('email', email)
		.single();

	return response;
};

export const createUser = async (register: User) => {
	const response = await supabase.from('users').insert(register);

	return response;
};

export const updateUser = async (params: User) => {
	const response = await supabase
		.from('users')
		.update(params)
		.match(params.id);

	return response;
};
