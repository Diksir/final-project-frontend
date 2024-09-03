import { http } from './config';

export const loginUser = async (payload) => http.post('/login/', payload);

export const registerUser = (payload) => http.post('/register/', payload);
