import axios from '.';
import { JoinAPIBody, JoinDuplicatedBody } from '../../types/auth';

export const joinDuplicatedAPI = (body: JoinDuplicatedBody) => { axios.post('/api/join', body); };
export const joinAPI = (body: JoinAPIBody) => { axios.post('/api/', body); };
