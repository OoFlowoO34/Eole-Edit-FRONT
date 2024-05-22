class Config {
    static BASE_URL_API: string = process.env.NODE_ENV === 'development'? 'http://localhost:5000' : '';
  }
  
export default Config;
  