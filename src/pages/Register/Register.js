import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';


const Register = () => {

    const navigate = useNavigate();
    const [error, setError] = useState('');
    const { createUser, updateUser } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();


    const handleRegister = data => {
        const { name, email, password, photoUrl, location, university } = data;
        if (!/[A-Z]/.test(password)) {
            setError('at least one uppercase');
            return;
        }
        if (!/[0-9]/.test(password)) {
            setError('at least One number');
            return;
        }
        if (password.length < 6) {
            setError('at least 6 character')
            return;
        }
        createUser(email, password)
            .then(result => {
                console.log(result);
                const userInfo = {
                    displayName: name,
                    photoUrl,
                }
                updateUser(userInfo)
                    .then(() => {
                        savedUserToDatabase(name, email, location, university)
                    })
                    .catch(err => {
                        console.log(err);
                        toast.error(err.message);
                    })
            })
            .catch(err => {
                toast.error(err.message);
            })
    }
    // registration form event handler end

    // saved user to database by this function
    const savedUserToDatabase = (name, email, location, university) => {
        const user = { name, email, location, university }
        fetch('http://localhost:5000/user', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    navigate('/')
                    toast.success('user created successfully')
                }
            })
    }

    return (
        <div>
            <div className='sm:w-4/5 md:w-2/3 lg:w-1/2 mx-auto border-4 border-secondary  p-5'>
                <h2 className="text-4xl text-secondary font-bold text-center">Register Now</h2>
                <form onSubmit={handleSubmit(handleRegister)}>

                    <div className="form-control">
                        <label className="label">Name</label>
                        <input {...register("name", { required: "name is required" })} type="text" placeholder="Name" className="input input-bordered" />
                        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                    </div>

                    <div className="form-control">
                        <label className="label">Photo Url</label>
                        <input {...register("photoUrl")} type="text" placeholder="Photo Url (optional)" className="input input-bordered" />
                    </div>


                    <div className="form-control">
                        <label className="label">Email</label>
                        <input {...register("email", { required: "email required" })} type="email" placeholder="email" className="input input-bordered" />
                        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                    </div>

                    <div className="form-control">
                        <label className="label">Password</label>
                        <input {...register("password", { required: "password field required" })} type="password" placeholder="password" className="input input-bordered" />
                        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                    </div>
                    <div className="form-control">
                        <label className="label">Location</label>
                        <input {...register("location", { required: "this field is required" })} type="text" placeholder="BrahmanBaria" className="input input-bordered" />
                        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                    </div>
                    <div className="form-control">
                        <label className="label">University / College</label>
                        <input {...register("university", { required: "this field is required" })} type="text" placeholder="Dhaka Versity" className="input input-bordered" />
                        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                    </div>



                    {
                        error && <p className='text-red-500'>{error}
                        </p>
                    }

                    <button className='btn btn-secondary mt-4 w-full' type="submit">Sign Up</button>
                </form>
                <p className='text-sm mt-5'>Already have an account ? <Link to='/login' className='text-blue-500 underline hover:underline-offset-8 font-bold'>please login</Link></p>

            </div>
        </div>
    );
};

export default Register;