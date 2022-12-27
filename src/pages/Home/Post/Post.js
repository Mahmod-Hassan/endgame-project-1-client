import React from 'react';

const Post = () => {
        const handlePost = event => {
        event.preventDefault();
        const form = event.target;
        console.log(form);
        const postText = form.text.value;
        const photo = form.photo.value;
        console.log(postText,photo);

    }
    return (
        <div className='sm:w-2/3 mx-auto border mt-20 p-10 bg-slate-100'>
            <form onSubmit={handlePost}>
                <textarea name="text" placeholder='Whats on your mind Mahmod?' className='input input-bordered w-full h-20 pt-2'  /><br></br>
                <input name="photo" type="file" className="file-input w-full h-40 my-4 border-dotted" /><br></br>
                <div className="flex justify-center">
                    <input className='btn w-1/2 ' type="submit" value="POST" />
                </div>
            </form>
        </div>
    );
};

export default Post;