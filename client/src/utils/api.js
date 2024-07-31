const baseURL =
  process.env.NODE_ENV === 'development'
    ? '/api'
    : 'https://markpad.up.railway.app/api';

export { baseURL };
