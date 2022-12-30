import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import Modal from './Modal';

const About = () => {
    const { user } = useContext(AuthContext);
    const { data: updatedUserInfo = [], isLoading, refetch } = useQuery({
        queryKey: [''],
        queryFn: async () => {
            const res = await fetch(`https://endgame-project-1-server.vercel.app/user/${user?.uid}`);
            const data = await res.json();
            return data
        }
    })
    if (isLoading) {
        return <button className='btn loading'></button>
    }
    const { name, email, address, university } = updatedUserInfo;
    return (
        <>
            <div className='md:w-2/3 lg:w-1/2 mx-auto shadow-md p-5 bg-gray-800 text-white'>
                <label htmlFor="edit-myInfo-modal" className="btn btn-sm bg-red-500 border-none">Edit</label>
                <div className='grid justify-center text-center'>
                    <img className='w-20 h-20 rounded-full mx-auto' src="https://i.ibb.co/kSJ995W/IMG-20221223-WA0000.jpg" alt="" />
                    <h1 className='text-pink-500 font-bold text-3xl'>{name}</h1>
                    <p className='text-blue-400'>{email}</p>
                    <p>address: {address}</p>
                    <p>university: {university}</p>
                </div>
            </div>
            <Modal refetch={refetch}></Modal>
        </>

    );
};

export default About;