import React from 'react';
import { HeartIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import Comment from '../Comment/Comment';


const Post = ({ post, refetch }) => {

    const { _id, image, textPost, loveReact } = post;


    // put love react
    const storedLoveReactToDatabase = id => {

        fetch(`https://endgame-project-1-server.vercel.app/post/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ 'loveReact': 1 })
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged === true) {
                    refetch();
                }
            })
    }


    return (
        <div className='bg-white p-4'>
            <p className='mb-4'>{textPost}</p>
            <img className='w-full h-48' src={image} alt="" />
            <div className='flex justify-between items-center my-2 flex-wrap'>
                <div className='relative'>
                    <button onClick={() => storedLoveReactToDatabase(_id)} className='btn btn-outline'><HeartIcon className='w-6 h-6 text-red-500 mr-2'></HeartIcon> Love
                    </button>
                    <span className='absolute -top-2 -right-2 bg-red-500 text-white  w-6 h-6 rounded-full text-center'>{loveReact}</span>
                </div>
                <Link to={`/media/${_id}`} className='btn'>Details</Link>
            </div>

            <Comment post={post}></Comment>

        </div>
    );
};

export default Post;