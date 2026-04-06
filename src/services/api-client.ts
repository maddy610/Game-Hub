import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "f8ac3ccfc2fb40c2ae612f897999c294",
  },
});
