import {
    makeObservable, observable, action,
} from 'mobx';

const axios = require('axios').default;

class User {
    user = {
        _id: 0,
        img: '',
        name: '',
        email: '',
        authenticated: false,
    };

    constructor() {
        makeObservable(this, {
            user: observable,
            fetch: action,
            logout: action,
        });
    }

    async fetch() {
        const { data: { value } } = await axios.get(`${process.env.REACT_APP_SERVER_API}/users`, {
            withCredentials: true,
        });

        this.user = {
            ...this.user,
            name: value.name,
            img: value.img,
            email: value.email,
            _id: value._id,
            authenticated: true,
        };
    }

    async logout() {
        this.user = {
            ...this.user,
            name: '',
            img: '',
            email: '',
            _id: 0,
            authenticated: false,
        };
    }
}

export default new User();
