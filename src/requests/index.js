import axios from 'axios'

const request = axios.create({
    baseURL: process.env.VUE_APP_API_HOST,
    timeout: 3000
});

axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    // TODO: 顯示錯誤訊息

    return Promise.reject(error);
});

export default request