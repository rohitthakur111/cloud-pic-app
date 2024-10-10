import axios from "axios";

const PROD_ENV = true;
const SERVER_URL = PROD_ENV ? "https://cloud-pic-app-api.vercel.app/api/cloud-pic" : "http://localhost:8080/api/cloud-pic";

const Api = axios.create({
  baseURL: SERVER_URL,  
  headers: {
    'Content-Type': 'application/json', 
  }
});

export default Api;
