import React from 'react';
import { HeartIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const Post = ({ post, refetch }) => {

    const { _id, image, textPost, loveReact } = post;

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
    console.log(comments);
    // put love react
    const putLoveReactToPost = id => {

        fetch(`http://localhost:5000/post/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify()
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged === true) {
                    refetch();
                }
            })
    }

    const handleComment = event => {

        const form = event.target;
        const comment = form?.comment?.value;
        console.log(comment);
        const data = {
            comment,
            id: _id,
        }
        fetch('http://localhost:5000/comment', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged === true) {
                    form.reset();
                }
            })
    }
    return (
        <div className='bg-white p-4'>
            <p className='mb-4'>{textPost}</p>
            <img className='w-full h-48' src={image} alt="" />
            <div className='flex justify-between items-center my-2 flex-wrap'>
                <div className='relative'>
                    <button onClick={() => putLoveReactToPost(_id)} className='btn btn-outline'><HeartIcon className='w-6 h-6 text-red-500 mr-2'></HeartIcon> Love
                    </button>
                    <span className='absolute -top-2 -right-2 bg-red-500 text-white  w-6 h-6 rounded-full text-center'>{loveReact}</span>
                </div>
                <Link to={`/media/${_id}`} className='btn'>Details</Link>
            </div>

            <form onSubmit={handleComment}>
                <textarea name="comment" rows="1" className="w-full border mt-6 rounded-full pl-4 bg-slate-100" placeholder="comment..."></textarea>
                <button type="submit" className='w-6 h-6 text-green-400'><PaperAirplaneIcon></PaperAirplaneIcon></button>
            </form>
            <div>
                {
                    comments.map(comm => <p
                        key={comm?._id}
                    >{comm?.comment}</p>)
                }
            </div>
        </div>
    );
};

export default Post;