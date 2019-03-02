import axios from 'axios';

export default axios.create({
  baseURL: 'http://local.ciless.com:3000/api/',
});
