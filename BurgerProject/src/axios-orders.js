import axios from 'axios';

const instance = axios.create({
    baseURL:'https://react-my-burger-a4e01.firebaseio.com/'
});

export default instance;