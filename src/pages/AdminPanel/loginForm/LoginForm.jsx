import React, {useState, useEffect} from 'react';
import axiosApiInstance from '../../../utils/axios-middleware';
import axios from 'axios';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const __handleLogin = (e) => {
        e.preventDefault();
        // get base url from .env file
        const baseUrl = process.env.REACT_APP_API_URL;

        axiosApiInstance.post(`${baseUrl}/admin/login`, {
            email: email,
            password: password
        })
            .then(function (res) {
                console.log("response.data",res.data.message);
                localStorage.setItem('jwtToken', res.data.message);
                window.location.href = '/admin';
            })
            .catch(error => {
                console.log("error.response", error.response);
                console.log(error);
                setError(error);
            });
    };
    return (
        <div className="loginForm">
            <h1>Login</h1>
            <form action="" method="post">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        autoComplete="off"
                        className="form-control"
                        name="email"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="text"
                        autoComplete="off"
                        className="form-control"
                        name="password"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        placeholder="Enter password" />
                </div>
                <div className="form-group">
                    <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        onClick={__handleLogin}>Login</button>
                </div>
            </form>
        </div>
  )
}

export default LoginForm