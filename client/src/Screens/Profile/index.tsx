/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
import React from 'react';
import './index.css';
import { observer } from 'mobx-react';
import { User as Store } from '../../Store';

const LoginForm = observer(() => {
    const submit = () => {
        const {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            err,
            password,
            confirm,
            ...rest
        } = Store.user;

        const passwordCheck = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

        if (!rest.name)Store.setError('Name  Shouldn\'t Be Empty');
        else if (password && password !== '*******') {
            if (!passwordCheck.test(password)) {
                Store.setError('Should Have 8 characters with a Number and a Special Character');
            } else if (password !== confirm) {
                Store.setError('Password Must Be Same');
            } else {
                Store.updateUser(true);
            }
        } else {
            Store.updateUser(false);
        }
    };

    const file = (e:any) => {
        if (e.target.files.length > 0) {
            const formData = new FormData();
            formData.append('file', e.target.files[0]);
        } else {
            Store.setError('File Upload Not Successfull');
        }
    };

    return (
        <div
            className="container"
            style={{ background: '#ffffff', marginTop: '15%' }}
        >
            <div className="main-body">
                <div className="row">
                    <h6 style={{ textAlign: 'center', color: 'red' }}>{Store.user.err}</h6>
                    <div className="col-lg-1" style={{ marginTop: '10%' }}>
                        <a
                            href="/"
                            style={{
                                border: 'none',
                                outline: 'none',
                            }}
                        >
                            <img
                                src="./home.png"
                                alt="back"
                                style={{
                                    height: '60px',
                                    width: '60px',
                                }}
                            />
                        </a>
                    </div>
                    <div className="col-lg-3">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex flex-column align-items-center text-center">
                                    <img src={Store.user.img} alt="Admin" className="rounded-circle p-1 bg-primary" width="100" />
                                    <div className="mt-3">
                                        <h4>User</h4>
                                        <p className="text-secondary mb-1">email</p>
                                        <p className="text-muted font-size-sm">Completed</p>
                                        <p className="text-muted font-size-sm">Expired</p>
                                        <p className="text-muted font-size-sm">Overdue</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <form>
                            <div className="card">
                                <div className="card-body">
                                    <div className="row mb-3">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Name</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            <input
                                                type="text"
                                                className="form-control"
                                                onChange={(e) => Store.setName(e.target.value)}
                                                value={Store.user.name}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Email</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            <input type="text" disabled className="form-control" value={Store.user.email} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Password</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            <input
                                                type="password"
                                                className="form-control"
                                                onChange={(e) => Store.setPassword(e.target.value)}
                                                value={Store.user.password}
                                                autoComplete="true"
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Confirm Password</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            <input
                                                type="password"
                                                className="form-control"
                                                onChange={(e) => Store.setConfirm(e.target.value)}
                                                value={Store.user.confirm}
                                                autoComplete="true"
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">User Image</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            <input id="input-b2" name="input-b2" type="file" onChange={file} className="file" data-show-preview="false" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-3" />
                                        <div className="col-sm-9 text-secondary">
                                            <button type="button" className="btn btn-primary px-4" onClick={submit}>Save Changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default LoginForm;
