import axios from 'axios';
import store from '@/store';
import router from '@/router';

const HTTP = axios.create({
  baseURL: 'http://localhost:3000'
});

const get = (route, params) => {
  return HTTP.get(route, { params }).then(res => res.data);
};

const post = (route, params) => {
  return HTTP.post(route, params).then(res => res.data);
};

// Add a request interceptor
HTTP.interceptors.request.use(
  config => {
    // add token to header before request is sent
    config.headers['Authorization'] = store.getters['auth/token'];

    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
HTTP.interceptors.response.use(
  response => {
    if (response.headers.token) {
      store.dispatch('updateToken', response.headers.token);
    }

    return response;
  },
  error => {
    // Do something with response error
    if (error.response.status === 401) {
      store.dispatch('doLogin').then(() => {
        router.push('/login');
      });
    }

    return Promise.reject(error);
  }
);

export default {
  get,
  post
};
