import axios from "axios"; 

const Api  = axios.create({
  baseURL : 'https://cloud-pic-rohitthakur111s-projects.vercel.app/api/cloud-pic',
  headers: {
    ContentType: "application/json",
  }, 
});

export default Api;
