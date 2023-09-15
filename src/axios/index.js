import axios from "axios";

export const motionAPI = axios.create({
  baseURL: "https://motion.propulsion-home.ch/backend/api",
});

export const DummyJsonAPI = axios.create({
  baseURL: "https://dummyjson.com",
});
