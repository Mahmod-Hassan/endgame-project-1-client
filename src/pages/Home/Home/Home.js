import React from 'react';
import CopyPost from '../CopyPost/CopyPost';
import TopThreePost from '../TopThreePost/TopThreePost';
import UploadPost from '../UploadPost/UploadPost';

const Home = () => {
    return (
        <div className='md:grid grid-cols-2 grid-row-2 mg:gap-5 lg:gap-10'>
            <UploadPost></UploadPost>
            <CopyPost></CopyPost>
            <TopThreePost></TopThreePost>
        </div>
    );
};

export default Home;