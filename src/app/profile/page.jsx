import Sidebar from '@/components/Sidebar';
import Table from '@/components/Table';
import React from 'react';
import {personDetails, officialDetails}  from '@/utils/personDetails';

const page = () => {
    console.log(personDetails);
    
    return (
        <div>
            <Sidebar />
            <div className="p-4 sm:ml-64">
                <Table data={personDetails} />
                <Table data={officialDetails}/>
            </div>
        </div>
    );
}

export default page;
