import { HeartIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { useLoaderData, useParams } from 'react-router-dom';

const PostDetails = () => {
    const { id } = useParams();
    const posts = useLoaderData();
    console.log(posts);
    const machedPost = posts.find(post => post?._id === id);
    const { _id, image, textPost, loveReact } = machedPost;
    return (
        <div>
            <h1 className='text-center text-6xl text-secondary font-bold mb-8'>Your post details</h1>
            <div className='flex justify-center gap-20'>
                <div>
                    <img src={image} alt="" />
                </div>
                <div>
                    <h3 className='text-2xl'>{textPost}</h3>
                    <p>You got {loveReact} <HeartIcon className='w-6 inline h-6 text-red-500 mr-2'></HeartIcon>react</p>
                </div>
            </div>
        </div>
    );
};

export default PostDetails;