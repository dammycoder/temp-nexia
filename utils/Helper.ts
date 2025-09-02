export const getBaseUrl = () => {
    if (process.env.NEXT_PUBLIC_STRAPI_URL) {
      return process.env.NEXT_PUBLIC_STRAPI_URL;
    }
  
    return 'http://localhost:1337';
  };
  
  export const isServer = () => {
    return typeof window === 'undefined';
  };