import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import registerLottie from '../../assets/animatin/Animation - 1733835669663.json'
import Lottie from 'lottie-react';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import AuthContext from '../../Providers/Authcontext';

const Register = () => {
    const [error, setError] = useState('')
    const {handleRegisterUser, handleGoogleLogin, setUser, manageProfile} = useContext(AuthContext); 
    const navigate = useNavigate()

    const handleRegister = e => {
        e.preventDefault()
        setError('')
        const form = e.target
        const name = form.name.value
        const email = form.email.value
        const photoUrl = form.photoUrl.value
        const password = form.password.value
        
        if (!/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password)) {
            setError("please strong password")
            return;
        }

        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Email not valid",
                showConfirmButton: false,
                timer: 1500
              });
            return;
        }
        handleRegisterUser(email, password)
            .then(res => {
                manageProfile({displayName: name, photoURL: photoUrl})
                .then(() => {
                    const user = res.user
                    setUser({
                    ...user, 
                    displayName: name,
                    photoURL: photoUrl,
                    });
                    Swal.fire({
                        title: "Success!",
                        text: "Account created successfully",
                        icon: "success",
                    });
                    navigate('/')
                })
            })
    
    }
    const googleHandle = () => {
        handleGoogleLogin()
        .then((res) => {
            const user = res.user;
            setUser(user);
            Swal.fire({
                title: "Success!",
                text: "Logged in successfully with Google",
                icon: "success",
            });
        })
    }



    return (
        <div className='w-11/12 mx-auto py-3'>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left w-96">
                        <Lottie animationData={registerLottie}></Lottie>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <h1 className="text-5xl font-bold text-center py-3">Register now!</h1>
                        <form onSubmit={handleRegister} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="Text" name='name' placeholder="Name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">PhotoURL</span>
                                </label>
                                <input type="url" name='photoUrl' placeholder="photoUrl" className="input input-bordered" required />
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
                                <button className="btn btn-primary">Register</button>
                                {error && <p className="text-red-500">{error}</p>}
                                <p className='py-3'>Do you login? please <Link to='/login'><button className="btn btn-primary">login</button></Link> or <Link><button onClick={googleHandle} className="btn btn-primary">google</button></Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;