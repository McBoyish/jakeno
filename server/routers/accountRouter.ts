import axios from 'axios';
import { UserData, InputAccount } from 'types';
import { https } from 'server/api';

const uri = `${https}/api/account`;

export const register = async (name: string, password: string) => {
	try {
		const account: InputAccount = { name, password };
		const res = await axios.post<UserData | null>(`${uri}/register`, account);
		return res.data;
	} catch (e) {
		return null;
	}
};

export const login = async (name: string, password: string) => {
	try {
		const account: InputAccount = { name, password };
		const res = await axios.post<UserData | null>(`${uri}/login`, account);
		return res.data;
	} catch (e) {
		return null;
	}
};
