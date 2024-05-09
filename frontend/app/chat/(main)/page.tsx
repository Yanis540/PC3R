import React from 'react';
import { LuSend } from "react-icons/lu";

interface PageProps {

};

function Page({}:PageProps) {
    return (
        <div className="flex-1 flex flex-col items-center justify-center ">
            <div className="px-4 py-2  border border-gray-300  rounded-lg hover:bg-gray-200/10 transation-all duration-200 ">
                <LuSend className="h-6 w-6 text-gray-300 " />
            </div>
        </div>
    );
};

export default Page;