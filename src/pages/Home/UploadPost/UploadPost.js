import userEvent from '@testing-library/user-event';
import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';


const UploadPost = () => {

    const { user } = useContext(AuthContext);
    // used react hook form to get input data
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const imgHostKey = process.env.REACT_APP_imgbb_key;

    // component name is here
    const handlePost = data => {
        if (!user?.email) {
            return toast.error('please login first')
        }
        const image = data.image[0];
        if (!image) {
            return toast.error('please upload a photo')
        }

        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?expiration=600&key=${imgHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success === true) {
                    console.log(imgData.data.url);
                    const post = {
                        textPost: data.textPost,
                        image: imgData.data.url
                    }
                    fetch('http://localhost:5000/post', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(post)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.acknowledged === true) {
                                toast.success('Your post successfull')
                                reset();
                            }
                        })
                }
            })
    }


    return (
        <div>
            <h1 className='text-pink-500 text-center text-5xl font-bold'>CREATE A POST</h1>
            <form onSubmit={handleSubmit(handlePost)} className="w-full lg:w-4/5 mx-auto grid gap-10 shadow-lg p-10">

                {/* textarea for writing user felling */}
                <textarea {...register("textPost", { required: true })} placeholder='Whats on your mind Mahmod?' className='input input-bordered w-full h-20' />
                {errors.textPost && <p className='text-red-500'>this field is required</p>}

                <input {...register('image')} type="file" className="file-input file-input-bordered w-full" />

                {/* post button is start */}
                <div className="flex justify-center">
                    <input className='btn w-full' type="submit" value="POST" />
                </div>

            </form>
        </div>
    );
};

export default UploadPost;