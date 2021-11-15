import axios from 'axios';
//import constants from '../config/constants';

const api = axios.create({
  baseURL: 'https://pi-project-univesp-back.herokuapp.com/',
});

export default api;

