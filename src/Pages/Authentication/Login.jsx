import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../Providers/Authcontext';
import Swal from 'sweetalert2';

const Login = () => {
    const { handleLogin, handleGoogleLogin } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLoginUser = e => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value

        handleLogin(email, password)
            .then(() => {
                Swal.fire({
                    title: "Success!",
                    text: "Account created successfully",
                    icon: "success",
                });
                navigate('/')
            })
    }

    const googleHandle = () => {
        handleGoogleLogin()
            .then(() => {
                Swal.fire({
                    title: "Success!",
                    text: "Logged in successfully with Google",
                    icon: "success",
                });
                navigate("/");
            })
    }

    return (
        <div className='w-11/12 mx-auto py-3'>
            <form onSubmit={handleLoginUser} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Login</button>
                    <p className='py-3'>Do you Register? please <Link to='/register'><button className="btn btn-primary">Register</button></Link> or <Link><button onClick={googleHandle} className="btn btn-primary">google</button></Link></p>
                </div>
            </form>
        </div>
    );
};

export default Login;