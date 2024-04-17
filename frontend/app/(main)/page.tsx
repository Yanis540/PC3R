import { Icons } from '@/components/icons';
import Image from 'next/image';
import React from 'react';
import Flashback from './components/Flashback/Flashback';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import BackgroundWrapper from '@/components/BackgroundWrapper';

interface MainProps {

};

function Main({}:MainProps) {
    return (
    <BackgroundWrapper>
        <div className={
            "flex min-h-screen gap-y-16 flex-col items-center justify-between p-8 lg:px-20 lg:py-8 fade-up"
        }>
            <Flashback /> 
            <h1 className="flex flex-col items-center px-2 py-2 font-semibold text-lg  md:text-xl justify-center h-16  bg-gradient-to-r from-purple-900 via-5% via-purple-700   to-red-600    text-white rounded-lg ">
                Join us on our + 100 year of travel with all safety ! 
            </h1>

        </div>
    </BackgroundWrapper>
  
    );
};

export default Main;