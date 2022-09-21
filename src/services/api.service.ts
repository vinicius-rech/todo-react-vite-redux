import axios from "axios";

export const API = axios.create({
  baseURL: 'https://api-nest-production.up.railway.app/',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    "Access-Control-Allow-Origin": "*",
  }
})
