import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { HeartIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

const TopThreePost = () => {
    const { data: topPosts = [], isLoading, refetch } = useQuery({
        queryKey: [],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/top-post');
            const data = await res.json();
            return data;
        }
    })
    if (isLoading) {
        return <button className='btn loading bg-white'></button>
    }

    return (
        <div className='grid gap-y-10 lg:w-4/5 mx-auto bg-danger mt-10'>
            <h1 className='text-center text-green-500 font-bold text-5xl'>TOP 3 POSTS</h1>
            {
                topPosts.map(post => <div
                    key={post?._id}
                    className='shadow-lg p-5 rounded-lg'>
                    <p className='mb-4'>{post?.textPost}</p>
                    <img className='w-full h-48' src={post?.image} alt="" />
                    <div className='flex justify-between items-center my-2 flex-wrap'>
                        <div className='relative'>
                            <button className='btn btn-outline'><HeartIcon className='w-6 h-6 text-red-500 mr-2'></HeartIcon> Love
                            </button>
                            <span className='absolute -top-2 -right-2 bg-red-500 text-white  w-6 h-6 rounded-full text-center'>{post?.loveReact}</span>
                        </div>
                        <Link to={`/media/${post?._id}`} className='btn'>Details</Link>
                    </div>
                </div>)
            }
        </div>
    );
};

export default TopThreePost;