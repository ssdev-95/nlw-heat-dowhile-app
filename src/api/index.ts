import axios from 'axios'

const domain = process.env.VUE_APP_API_HOST
const baseURL = `https://${domain}/`

const api = axios.create({
	baseURL,
  headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*'
	}
})
// TODO: add token to requests if available
/*axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});*/

export { api }
