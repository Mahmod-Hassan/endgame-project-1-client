import React from 'react';
import Modal from './Modal';

const About = () => {
    return (
        <>
            <div className='md:w-2/3 lg:w-1/2 mx-auto shadow-md p-5 bg-gray-800 text-white'>
                <div className='flex justify-between'>
                    <img className='ml-16 w-20 h-20 rounded-full' src="https://i.ibb.co/kSJ995W/IMG-20221223-WA0000.jpg" alt="" />

                    <label htmlFor="edit-myInfo-modal" className="btn btn-sm bg-red-500 border-none">Edit</label>
                </div>
                <h1 className='text-pink-500 font-bold text-3xl'>Mahmod Hasan</h1>
                <p>Email: <span>mahmod7788@gmail.com</span></p>
                <p>Address: <span>Chittagong, Bangladesh</span></p>
                <p>College: Syedabad Adarsha College</p>
            </div>
            <Modal></Modal>
        </>

    );
};

export default About;