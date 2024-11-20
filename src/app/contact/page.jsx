
import Dropdown from '@/components/Dropdown';
import OtherContact from '@/components/ContactForm';
import Sidebar from '@/components/Sidebar';
import React from 'react';
import ContactForm from '@/components/ContactForm';
import OtherTable from '@/components/OtherTable';
import ContactTable from '@/components/ContactTable';

const page = () => {
    return (
        <div>
            <Sidebar />
            <div className="p-4 sm:ml-64">
                <div className='flex flex-row justify-between'>
                    <Dropdown />
                    <button className='p-2 mt-[20px] mb-[70px] bg-green-600 text-white hover:bg-green-300'>Add Address</button>
                </div>
                <ContactForm />
                <ContactTable />
            </div>
        </div>
    );
}

export default page;
