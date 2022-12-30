import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';

const Modal = ({ refetch }) => {

    const { register, handleSubmit } = useForm();
    const { user } = useContext(AuthContext);

    const updateUserInfoToDatabase = data => {
        fetch(`https://endgame-project-1-server.vercel.app/user/${user?.uid}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged === true) {
                    toast.success('Successfully updated')
                    refetch();
                }
            })
    }
    return (
        <div>
            <input type="checkbox" id="edit-myInfo-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="edit-myInfo-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <form onSubmit={handleSubmit(updateUserInfoToDatabase)}>
                        <div className="form-control">
                            <input {...register('name')} className='input input-bordered w-full mb-2' type="text" defaultValue={user?.displayName} />
                        </div>

                        <div className="form-control">
                            <input {...register('email')} className='input input-bordered w-full mb-2' type="email" defaultValue={user?.email} />
                        </div>

                        <div className="form-control">
                            <input {...register('address')} className='input input-bordered w-full mb-2' type="text" placeholder='address' />
                        </div>

                        <div className="form-control">
                            <input {...register('university')} className='input input-bordered w-full mb-2' type="text" placeholder='university' />
                        </div>

                        <button className='btn'>Save</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Modal;