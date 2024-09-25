import axios from "axios"; 

const Api  = axios.create({
  baseURL : 'http://127.0.0.1:8080/api/cloud-pic',
  headers: {
    ContentType: "application/json",
  }, 
});

export default Api;