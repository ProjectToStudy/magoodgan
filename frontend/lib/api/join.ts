import axios from '.';
import { JoinAPIBody, JoinDuplicatedBody } from '../../types/join';

export const joinDuplicatedAPI = (body: JoinDuplicatedBody) => { return axios.post('/api/hello', body); };
export const joinAPI = (body: JoinAPIBody) => { return axios.post('/api/', body); };
