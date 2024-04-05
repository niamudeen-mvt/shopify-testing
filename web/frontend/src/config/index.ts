export const BASE_URL = "http://localhost:7000/api/v1";

// export const BASE_URL = "https://test-backend-iota.vercel.app/api/v1";

export const config = {
  ACCESS_TOKEN_KEY: 'access_token',
  REFRESH_TOKEN_KEY: 'refresh_token',
  UPLOADCARE_PUBLIC_KEY: process.env.REACT_APP_UPLOADCARE_PUBLIC_KEY,
  UPLOADCARE_PRIVATE_KEY: process.env.REACT_APP_UPLOADCARE_SECRET_KEY,
};
