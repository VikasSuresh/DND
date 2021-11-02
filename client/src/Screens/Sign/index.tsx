/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import React, { useState } from 'react';
import './index.css';

const LoginForm = (props:any) => {
    const emailCheck = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const [state, setState] = useState(false);
    const [login, setLogin] = useState({
        email: '',
        password: '',
        err: '',
    });
    const [reg, setReg] = useState({
        name: '',
        email: '',
        password: '',
        confirm: '',
        err: '',
    });

    const regSubmit = async (e:any) => {
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
            try {
                await axios.post(`${process.env.REACT_APP_SERVER_API}/users/register`, {
                    name,
                    email,
                    password,
                }, {
                    withCredentials: true,
                });

                window.location.reload();
            } catch (error:any) {
                if (error.message.indexOf('403') !== -1) {
                    setReg((prevState) => ({ ...prevState, err: 'Email Already Exists.' }));
                } else {
                    setReg((prevState) => ({ ...prevState, err: 'Error.' }));
                }
            }
        }
    };

    const loginSubmit = async (e:any) => {
        e.preventDefault();
        const {
            email, password,
        } = login;

        if (!email || !password) setLogin((prevState) => ({ ...prevState, err: 'All Fields Should be Filled' }));
        else if (!emailCheck.test(email)) setLogin((prevState) => ({ ...prevState, err: 'Not Valid Email Format' }));
        else {
            try {
                await axios.post(`${process.env.REACT_APP_SERVER_API}/users/login`, {
                    email,
                    password,
                }, {
                    withCredentials: true,
                });

                props.history.push('/');
            } catch (error:any) {
                if (error.message.indexOf('404') !== -1) {
                    setLogin((prevState) => ({ ...prevState, err: 'User Does not exist.' }));
                } else if (error.message.indexOf('403') !== -1) {
                    setLogin((prevState) => ({ ...prevState, err: 'Invalid Password.' }));
                } else {
                    setLogin((prevState) => ({ ...prevState, err: 'Error.' }));
                }
            }
        }
    };

    return (
        <section style={{ backgroundColor: state ? '#bd353f' : '#256cca' }}>
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
                                <a href="#" onClick={() => setState(true)}> Sign Up.</a>
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
                                <a href="#" onClick={() => setState(false)}> Sign in.</a>
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
