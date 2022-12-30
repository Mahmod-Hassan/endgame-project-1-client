import { HeartIcon } from '@heroicons/react/24/solid';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useLoaderData, useParams } from 'react-router-dom';

const PostDetails = () => {
    const { id } = useParams();
    const posts = useLoaderData();
    const machedPost = posts.find(post => post?._id === id);
    const { _id, image, textPost, loveReact } = machedPost;


    // get all comments by using useQuery
    const { data: comments = [], isLoading } = useQuery({
        queryKey: ['comment', _id],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/comment/${_id}`);
            const data = await res.json();
            return data;
        }
    })
    if (isLoading) {
        return <button className="btn btn-square loading"></button>
    }


    return (
        <div>
            <h1 className='text-center text-6xl text-secondary font-bold mb-8'>Your post details</h1>
            <div className='md:flex justify-center gap-20'>
                <div className='md:w-1/2'>
                    <img className='w-full' src={image} alt="" />
                </div>
                <div className='md:w-1/2 grid gap-4'>
                    <h3 className='bg-primary text-white font-bold text-2xl p-3 rounded'>{textPost}</h3>
                    <p className='bg-pink-300 text-xl rounded p-2'>You got {loveReact} <HeartIcon className='w-6 inline h-6 text-red-500'></HeartIcon> react</p>
                    <div className='bg-primary text-white  p-3 rounded'>
                        <h2 className='font-bold text-2xl'>People comments in your post</h2>
                        <p className='text-xl text-gray-200'>{comments?.length && <><span>&gt;</span> {comments[0]?.comment}</>}</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PostDetails;