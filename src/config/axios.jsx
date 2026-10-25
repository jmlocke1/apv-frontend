import axios from "axios";
import config from "./config";

const clienteAxios = axios.create({
    baseURL: `${config.apiDomain}/api`
});

export default clienteAxios;