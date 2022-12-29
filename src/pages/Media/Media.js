import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { HeartIcon, HandThumbUpIcon } from '@heroicons/react/24/solid';

const Media = () => {
    const { data: posts = [], isLoading, error } = useQuery({
        queryKey: ['post'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/post');
            const data = await res.json();
            return data;
        }
    })
    if (isLoading) {
        return <button className="btn btn-square loading"></button>
    }



    return (
        <div className='grid grid-cols-1 md:grid-cols-4 gap-5 p-5 bg-gray-100'>

            <div className='text-xl d-none md:block bg-white'>
                <p className="text-2xl text-center font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-pink-500">
                    All Users
                </p>
            </div>
            <div className="bg-clip-content grid gap-y-10 col-span-2">
                {
                    posts.map(post => <div className='bg-white p-4' key={post?._id}>
                        <p className='mb-4'>{post?.textPost}</p>
                        <img className='w-full h-48' src={post?.image} alt="" />
                        <div className='flex justify-between items-center my-2 flex-wrap'>
                            <div className='relative'>
                                <button className='btn btn-outline'><HeartIcon className='w-6 h-6 text-red-500 mr-2'></HeartIcon> Love
                                </button>
                                <span className='absolute -top-2 -right-2 bg-red-500 text-white  w-6 h-6 rounded-full text-center'>0</span>
                            </div>

                            <button className='btn btn-sm btn-md'>Details</button>
                        </div>
                        <textarea rows="1" className="w-full border mt-6 rounded-full pl-4 bg-slate-100" placeholder="comment..."></textarea>
                    </div>
                    )
                }
            </div>
            <div className="border d-none md:block bg-white">
                <p className="text-2xl text-center font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-green-500">
                    Message
                </p>
            </div>
        </div>
    );
};

export default Media;