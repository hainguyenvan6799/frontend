import axios from 'axios';

export default axios.create({
    baseURL: "https://backend-lienlactructuyen.herokuapp.com/api"
})
