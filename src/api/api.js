import axios from 'axios';
import constants from '../config/constants';

const api = axios.create({
  baseURL: constants.generalApiPath,
});

export default api;

