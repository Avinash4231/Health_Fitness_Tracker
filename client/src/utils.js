export const BaseURL = 'http://127.0.0.1:5129';
// export const BaseURL = 'http://localhost:8080';

export const getToken = () => {
    return localStorage.getItem("token");
};