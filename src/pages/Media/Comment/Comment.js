import React from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { useQuery } from '@tanstack/react-query';

const Comment = ({ post }) => {
    const { _id } = post;


    // get all comments by using useQuery
    const { data: comments = [], isLoading, refetch } = useQuery({
        queryKey: ['comment', _id],
        queryFn: async () => {
            const res = await fetch(`https://endgame-project-1-server.vercel.app/comment/${_id}`);
            const data = await res.json();
            return data;
        }
    })
    if (isLoading) {
        return <button className="btn btn-square loading"></button>
    }


    const postCommentToDatabase = event => {
        event.preventDefault();
        const form = event.target;
        const comment = form?.comment?.value;
        const data = {
            comment,
            id: _id,
        }
        fetch('https://endgame-project-1-server.vercel.app/comment', {
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
                    refetch();
                }
            })
    }


    return (
        <>
            <form onSubmit={postCommentToDatabase}>
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
        </>
    );
};

export default Comment;