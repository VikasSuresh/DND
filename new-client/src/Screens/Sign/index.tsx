/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';

import './index.css';

const LoginForm = () => {
    const [state, setState] = useState(false);
    const [login, setLogin] = useState({
        email: '',
        password: '',
    });
    const [reg, setReg] = useState({
        name: '',
        email: '',
        password: '',
        confirm: '',
    });

    const regSubmit = () => {
        const {
            name, email, password, confirm,
        } = reg;
        const regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

        if (regularExpression.test(password)) {
            if (password === confirm) console.log(true);
        } else console.log('err');
        console.log(name, email);
    };

    const loginSubmit = () => {
        console.log(login);
    };

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
                            <input type="email" placeholder="Email" onChange={(e) => setLogin((prevState) => ({ ...prevState, email: e.target.value }))} />
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
                            <input type="text" placeholder="Name" onChange={(e) => setReg((prevState) => ({ ...prevState, name: e.target.value }))} />
                            <input type="email" placeholder="Email Address" onChange={(e) => setReg((prevState) => ({ ...prevState, email: e.target.value }))} />
                            <input type="password" placeholder="Create Password" autoComplete="on" onChange={(e) => setReg((prevState) => ({ ...prevState, password: e.target.value }))} />
                            <input type="password" placeholder="Confirm Password" autoComplete="on" onChange={(e) => setReg((prevState) => ({ ...prevState, confirm: e.target.value }))} />
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
