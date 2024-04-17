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
        </div>
    </BackgroundWrapper>
  
    );
};

export default Main;