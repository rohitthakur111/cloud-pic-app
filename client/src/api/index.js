import axios from "axios"; 

const Api  = axios.create({
  baseURL : 'http://localhost:8080/api/cloud-pic',
  headers: {
    ContentType: "application/json",
  }, 
});

export default Api;
