/* eslint-disable jsx-a11y/anchor-is-valid */
// import axios from 'axios';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import './index.css';

const LoginForm = () => {
    const emailCheck = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const [state, setState] = useState(false);
    const [login, setLogin] = useState({
        email: '',
        password: '',
        err: '',
        login: false,
    });
    const [reg, setReg] = useState({
        name: '',
        email: '',
        password: '',
        confirm: '',
        err: '',
    });

    const regSubmit = (e:any) => {
        e.preventDefault();
        const {
            name, email, password, confirm,
        } = reg;

        const passwordCheck = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

        if (!name || !email || !password || !confirm) setReg((prevState) => ({ ...prevState, err: 'All Fields Should be Filled' }));
        else if (!emailCheck.test(email)) setReg((prevState) => ({ ...prevState, err: 'Not Valid Email Format' }));
        else if (!passwordCheck.test(password))setReg((prevState) => ({ ...prevState, err: 'Should Have 8 characters with a Number and a Special Character' }));
        else if (password !== confirm) setReg((prevState) => ({ ...prevState, err: 'Password Must Be Same' }));
        else {
            const exists = 'axios';
            if (exists)setReg((prevState) => ({ ...prevState, err: 'Email Already Exists' }));
            else {
                setReg({
                    name: '', email: '', password: '', confirm: '', err: '',
                });
                setState(false);
            }
        }
    };

    const loginSubmit = (e:any) => {
        e.preventDefault();
        const {
            email, password,
        } = login;

        if (!email || !password) setLogin((prevState) => ({ ...prevState, err: 'All Fields Should be Filled' }));
        else if (!emailCheck.test(email)) setLogin((prevState) => ({ ...prevState, err: 'Not Valid Email Format' }));
        else {
            const exists = 'axios.get()';
            if (!exists)setLogin((prevState) => ({ ...prevState, err: 'User Does not exist.' }));
            else {
                setLogin({
                    email: '', password: '', err: '', login: true,
                });
                localStorage.setItem('credentials', 'true');
            }
        }
    };

    if (login.login) {
        return (
            <Redirect to="/tasks" />
        );
    }

    return (
        <section style={{ backgroundColor: state ? '#256cca' : '#da3846f6' }}>
            <div className={state ? 'container active' : 'container'}>
                <div className="user signinBx">
                    <div className="imgBx">
                        <img src="/reg.jpg" alt="reg" />
                    </div>
                    <div className="formBx">
                        <form onSubmit={loginSubmit}>
                            <h2>Sign In</h2>
                            <h6>{login.err}</h6>
                            <input type="text" placeholder="Email" onChange={(e) => setLogin((prevState) => ({ ...prevState, email: e.target.value }))} />
                            <input type="password" placeholder="Password" autoComplete="on" onChange={(e) => setLogin((prevState) => ({ ...prevState, password: e.target.value }))} />
                            <input type="submit" value="Login" />
                            <p className="signup">
                                {'Don\'t have an account ?'}
                                <a href="#" onClick={() => setState(true)}>Sign Up.</a>
                            </p>
                        </form>
                    </div>
                </div>
                <div className="user signupBx">
                    <div className="formBx">
                        <form onSubmit={regSubmit}>
                            <h2>Create an account</h2>
                            <h6>{reg.err}</h6>
                            <input type="text" value={reg.name} placeholder="Name" onChange={(e) => setReg((prevState) => ({ ...prevState, name: e.target.value }))} />
                            <input type="text" value={reg.email} placeholder="Email Address" onChange={(e) => setReg((prevState) => ({ ...prevState, email: e.target.value }))} />
                            <input
                                type="password"
                                value={reg.password}
                                placeholder="Create Password"
                                autoComplete="on"
                                onChange={(e) => setReg((prevState) => ({ ...prevState, password: e.target.value }))}
                            />
                            <input
                                type="password"
                                value={reg.confirm}
                                placeholder="Confirm Password"
                                autoComplete="on"
                                onChange={(e) => setReg((prevState) => ({ ...prevState, confirm: e.target.value }))}
                            />
                            <input type="submit" value="Sign Up" />
                            <p className="signin">
                                Already have an account ?
                                <a href="#" onClick={() => setState(false)}>Sign in.</a>
                            </p>
                        </form>
                    </div>
                    <div className="imgBx"><img src="sign.jpg" alt="sign" /></div>
                </div>
            </div>
        </section>
    );
};

export default LoginForm;
