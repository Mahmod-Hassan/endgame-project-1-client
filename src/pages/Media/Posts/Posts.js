import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Post from '../Post/Post';



const Posts = () => {

    const { data: posts = [], isLoading, refetch } = useQuery({
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

            <div className='text-xl d-none hidden md:block bg-white'>
                <p className="text-2xl text-center font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-pink-500">
                    All Users
                </p>
            </div>
            <div className="bg-clip-content grid gap-y-10 col-span-2">
                {
                    posts.map(post => <Post
                        key={post?._id}
                        post={post}
                        refetch={refetch}
                    ></Post>
                    )
                }
            </div>
            <div className="border d-none hidden md:block bg-white">
                <p className="text-2xl text-center font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-green-500">
                    Message
                </p>
            </div>
        </div>
    );
};

export default Posts;