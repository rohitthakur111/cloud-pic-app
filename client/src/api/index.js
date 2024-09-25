import axios from "axios"; 

const Api  = axios.create({
  baseURL : 'https://cloud-pic-app-api.vercel.app',
  headers: {
    ContentType: "application/json",
  }, 
});

export default Api;
