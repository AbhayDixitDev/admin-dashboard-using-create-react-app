import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import  logo from "./imageForget.png"

function Forget() {
    const [formType, setFormType] = useState(''); // 'password' or 'email'
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [result, setResult] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handlePasswordSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get("http://localhost:4000/users");
            const user = response.data.find(u => u.username === username && u.email === email);
            
            if (user) {
                setResult(`Your password is: ${user.password}`);
                setError('');
            } else {
                const wantToRegister = window.confirm("User not found. Would you like to register?");
                if (wantToRegister) {
                    navigate("/portal/create-user");
                } else {
                    setError("Invalid username or email");
                }
            }
        } catch (error) {
            console.error(error);
            setError("Something went wrong. Please try again.");
        }
    }

    const handleEmailSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get("http://localhost:4000/users");
            const user = response.data.find(u => u.username === username && u.password === password);
            
            if (user) {
                setResult(`Your email is: ${user.email}`);
                setError('');
            } else {
                const wantToRegister = window.confirm("User not found. Would you like to register?");
                if (wantToRegister) {
                    navigate("/portal/create-user");
                } else {
                    setError("Invalid username or password");
                }
            }
        } catch (error) {
            console.error(error);
            setError("Something went wrong. Please try again.");
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center min-vh-100">
                <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card o-hidden border-0 shadow-lg">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-block bg-password-image" style={{ backgroundImage: `url(${logo})` }}></div>
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Forgot Your Details?</h1>
                                        </div>
                                        
                                        {!formType && (
                                            <div className="text-center mb-4">
                                                <button className="btn btn-primary mr-3" onClick={() => setFormType('password')}>
                                                    Find Password
                                                </button>
                                                <button className="btn btn-primary" onClick={() => setFormType('email')}>
                                                    Find Email
                                                </button>
                                            </div>
                                        )}

                                        {error && <div className="alert alert-danger">{error}</div>}
                                        {result && <div className="alert alert-success">{result}</div>}

                                        {formType === 'password' && (
                                            <form className="user" onSubmit={handlePasswordSearch}>
                                                <div className="form-group">
                                                    <input type="text"
                                                        className="form-control form-control-user"
                                                        placeholder="Enter Username"
                                                        value={username}
                                                        onChange={(e) => setUsername(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <input type="email"
                                                        className="form-control form-control-user"
                                                        placeholder="Enter Email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                </div>
                                                <button type="submit" className="btn btn-primary btn-user btn-block">
                                                    Find Password
                                                </button>
                                            </form>
                                        )}

                                        {formType === 'email' && (
                                            <form className="user" onSubmit={handleEmailSearch}>
                                                <div className="form-group">
                                                    <input type="text"
                                                        className="form-control form-control-user"
                                                        placeholder="Enter Username"
                                                        value={username}
                                                        onChange={(e) => setUsername(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <input type="password"
                                                        className="form-control form-control-user"
                                                        placeholder="Enter Password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                </div>
                                                <button type="submit" className="btn btn-primary btn-user btn-block">
                                                    Find Email
                                                </button>
                                            </form>
                                        )}

                                        <hr />
                                        <div className="text-center">
                                            <Link className="small" to="/portal/create-user">Create an Account!</Link>
                                        </div>
                                        <div className="text-center mt-3">
                                            <Link className="small" to="/">Back to Login</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Forget
