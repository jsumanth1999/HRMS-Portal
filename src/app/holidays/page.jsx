"use client"
import React from 'react';
import { holidaysList, years } from '@/utils/holidayDetails';
import OtherTable from '@/components/OtherTable';

const page = () => {

    return (
        <div>
            <div className="p-4 sm:ml-64">
                <OtherTable data={holidaysList} />
            </div>
        </div>
    );
}

export default page;
