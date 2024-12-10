
import Sidebar from '@/components/Sidebar';
import React from 'react';
import Tab from '@/components/Tab';
import { tabData } from '@/utils/data';

const page = () => {
    return (
            <div className="p-4 sm:ml-64">
                <Tab data={tabData} />
            </div>
    );
}

export default page;
