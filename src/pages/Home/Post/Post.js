import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-hot-toast';


const Post = () => {

    // used react hook form to get input data
    const { register, handleSubmit, formState: { errors } } = useForm();
    const imgHostKey = process.env.REACT_APP_imgbb_key;

    // component name is here
    const handlePost = data => {
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
                    toast.success('Your post successfully shared')
                    console.log(imgData.data.url);
                }
            })
    }


    return (
        <div className='sm:w-2/3 mx-auto border mt-20 p-10 bg-slate-100'>
            <form onSubmit={handleSubmit(handlePost)}>

                {/* textarea for writing user felling */}
                <textarea {...register("textPost", { required: true })} placeholder='Whats on your mind Mahmod?' className='input input-bordered w-full h-20 pt-2' /><br></br>
                {errors.textPost && <p className='text-red-500'>this field is required</p>}
                {/* upload_file input start */}
                <label onClick={setUploadPhoto(true)}
                    className="flex justify-center w-full h-32 px-4 bg-white my-5 border-2 border-gray-300 border-dashed cursor-pointer">
                    <span className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                        </svg>

                        <span className="font-medium text-blue-400">
                            Upload Photo
                        </span>
                    </span>


                    <input {...register('image')} type="file" className="hidden" />
                </label>
                {/* upload_file input end */}


                {/* post button is start */}
                <div className="flex justify-center">
                    <input className='btn w-1/2 ' type="submit" value="POST" />
                </div>
                {/* post button is end */}

            </form>
        </div>
    );
};

export default Post;