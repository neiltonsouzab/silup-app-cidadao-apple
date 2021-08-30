import axios from 'axios';

const api = axios.create({
  baseURL: 'https://emdur.silup.com.br/api/cidadao_apple',
});

export default api;
