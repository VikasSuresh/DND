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
        authenticated: '',
        password: '*******',
        confirm: '*******',
        err: '',
    };

    constructor() {
        makeObservable(this, {
            user: observable,
            fetch: action,
            logout: action,
            updateUser: action,
            setError: action,
            setName: action,
            setConfirm: action,
            setPassword: action,
        });
    }

    async fetch() {
        try {
            const { data: { value } } = await axios.get(`${process.env.REACT_APP_SERVER_API}/users`, {
                withCredentials: true,
            });

            this.user = {
                ...this.user,
                name: value.name,
                img: value.img,
                email: value.email,
                _id: value._id,
                authenticated: 'Authorized',
            };
        } catch (error) {
            this.user.authenticated = 'Not Authorized';
        }
    }

    setConfirm(confirm) {
        this.user.confirm = confirm;
    }

    setPassword(password) {
        this.user.password = password;
    }

    setName(name) {
        this.user.name = name;
    }

    setError(err) {
        this.user.err = err;
    }

    updateUser(pwd) {
        if (!pwd) {
            console.log('without');
        } else {
            console.log('with');
        }
        this.user.err = '';
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
