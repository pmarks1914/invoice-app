import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

import logo from '../logo.png'
import { Col, Container, Row } from 'reactstrap';
import Swal from 'sweetalert2';
import { Select } from '@mui/material';



const Profile = () => {
    // get old invoice list
    const profileGetData = JSON.parse(localStorage.getItem("profile"));
    const [profileData, setprofileData] = useState(profileGetData);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
            setprofileData(prev => ({
                ...prev,
                [name]: value
            }));
        
    };

    const handleInputTaxChange = (e) => {
        const { name, value } = e.target;
        setprofileData({
            ...profileData,
            'tax': (value/100)
        });
        
    };

    // print invoive
    const profilePost = () => {

        Swal.fire({
            icon: 'info',
            title: 'Action: Save Profile',
            text: 'Proceed to save',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Confirm',
            cancelButtonText: "Cancel",
            cancelButtonColor: 'red',
            confirmButtonColor: 'blue'
          }).then((result) => {
            if (result.isConfirmed) {
                // console.log("profileData ", profileData)
                // set new Profile
                localStorage.setItem("profile", JSON.stringify(profileData));
              }
              else{
                // 
              }
          } );

    };

    return (
        <div className="max-w-4xl mx-auto p-6 mb-10 bg-white rounded-lg ">
        {/* <div className="m"> */}
            <Container className=' mb-10 '>
                <div className="text-3xl font-bold mb-6 text-gray-800">Profile</div>

                <div className="grid gap-6">
                    <div>
                        <label htmlFor='companyName'> Company Name </label>
                        <input
                            type="text"
                            name="companyName"
                            id="companyName"
                            value={profileData?.companyName}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded mb-2"
                            placeholder="Your Company Name"
                        />
                        <label htmlFor='companyAddress'> Address </label>
                        <textarea
                            name="companyAddress"
                            id='companyAddress'
                            value={profileData?.companyAddress}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded mb-2"
                            placeholder="Your Company Address"
                            rows="3"
                        />
                        <label htmlFor='currency'> Currency </label>
                        <input
                            type="text"
                            name="currency"
                            id='currency'
                            value={profileData?.currency}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded mb-2"
                            placeholder="Your Currency"
                        />
                        <label htmlFor='notes'> Notes </label>
                        <textarea
                            name="notes"
                            id='notes'
                            value={profileData?.notes}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded mb-2"
                            placeholder="Your Notes"
                        />
                        <label htmlFor='tax'> Tax </label>
                        <input
                            type="number"
                            name="tax"
                            value={profileData?.tax * 100} 
                            onChange={(e)=>handleInputTaxChange(e)}
                            className="w-full p-2 border rounded"
                            placeholder="Tax rate eg. 10"
                            min="0"
                            max="100"
                        />
              <label for="selectInvoice" className="f-w-label mb-0"> Roles </label>
              <Select
                // isMulti
                className='mt-1'
                id='selectInvoice'
                placeholder="Select a role for the user..."
                // onChange={handleChange}
                // onChange={(e)=>setFormInviteData({...formInviteData, ...{"role": e}})}
                // options={optionRoles}
              />
                    </div>
                    
                </div>

                <button
                    onClick={profilePost}
                    className="mt-6 bg-blue-500 text-white p-2 rounded"
                >
                    Save
                </button>

            </Container>


        </div>
    );
};

export default Profile;