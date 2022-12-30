import React from 'react';
import { useForm } from 'react-hook-form';

const Modal = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handelUserInfo = data => {
        const { name, email, address, university } = data;
        fetch(`http://localhost:5000/userInfo`, {
            method: 'PUT',
            headers: {
                'content-type': 'application / json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }
    return (
        <>
            <input type="checkbox" id="edit-myInfo-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="edit-myInfo-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <form onClick={handleSubmit(handelUserInfo)}>
                        <div className='form-control'>
                            <label className='label label-text'>Name</label>
                            <input {...register("name")} className='input input-bordered' type="text" />
                        </div>
                        <div className='form-control'>
                            <label className='label label-text'>Email</label>
                            <input {...register("email")} className='input input-bordered' type="email" />
                        </div>
                        <div className='form-control'>
                            <label className='label label-text'>Address</label>
                            <input {...register("address")} className='input input-bordered' type="text" />
                        </div>
                        <div className='form-control'>
                            <label className='label label-text'>University</label>
                            <input {...register("university")} className='input input-bordered' type="text" />
                        </div>
                        <input className='btn mt-4' type="submit" value="Save" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default Modal;