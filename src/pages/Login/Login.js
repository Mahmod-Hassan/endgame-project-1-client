import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';



const Login = () => {
    const { signIn, googleSignIn } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    const handleLogin = data => {
        const { email, password } = data;
        signIn(email, password)
            .then(result => {
                toast.success('successfully logged In');
                navigate(from, { replace: true });
            })
            .catch(err => {
                toast.error(err.message);
            })
    }
    // login form evnet handler end

    // google signin method start
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                savedUserToDatabase(user?.displayName, user?.email)
            })
            .catch(err => {
                toast.error(err.message);
            })
    }
    // google sign in method end

    const savedUserToDatabase = (name, email) => {
        const user = { name, email, location: 'empty', university: 'empty' }
        fetch(`http://localhost:5000/user?email=${email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Google sign in successful')
                    navigate(from, { replace: true });
                }
            })
    }

    return (
        <div>
            <div className='md:w-1/2 mx-auto border-4 border-primary mt-5 p-5'>
                <h2 className="text-4xl text-primary font-bold">Please Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>

                    <div className="form-control">
                        <label className="label">Email</label>
                        <input {...register("email", { required: "email is required" })} type="text" placeholder="email" className="input input-bordered" />
                        {
                            errors.email && <p className='text-red-500'>{errors.email.message}</p>
                        }
                    </div>

                    <div className="form-control">
                        <label className="label">Password</label>
                        <input {...register("password", { required: "password is required" })} type="password" placeholder="password" className="input input-bordered" />
                        {
                            errors.password && <p className='text-red-500'>{errors.password.message}</p>
                        }
                    </div>

                    <button className='btn btn-primary mt-4 w-full' type="submit">Login</button>
                </form>
                <p className='text-sm mt-10 mb-5'>New to this website </p><Link to='/register' className='text-blue-500 underline hover:underline-offset-8 font-bold'>please register</Link>

                <button onClick={handleGoogleSignIn} className="btn btn-outline btn-white w-full">SignIn With Google</button>
            </div>
        </div>
    );
};

export default Login;