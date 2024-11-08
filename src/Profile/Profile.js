import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

import logo from '../logo.png'
import { Col, Container, Row } from 'reactstrap';



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
        // console.log("profileData ", profileData)
        // set new Profile
        localStorage.setItem("profile", JSON.stringify(profileData));

    };

    return (
        <div className="max-w-4xl mx-auto p-6 mb-10 bg-white rounded-lg ">
        {/* <div className="m"> */}
            <Container className=' mb-10 '>
                <div className="text-3xl font-bold mb-6 text-gray-800">Profile</div>

                <div className="grid gap-6">
                    <div>
                        <input
                            type="text"
                            name="companyName"
                            value={profileData?.companyName}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded mb-4"
                            placeholder="Your Company Name"
                        />
                        <textarea
                            name="companyAddress"
                            value={profileData?.companyAddress}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded mb-4"
                            placeholder="Your Company Address"
                            rows="3"
                        />
                        <input
                            type="text"
                            name="currency"
                            value={profileData?.currency}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded mb-4"
                            placeholder="Your Currency"
                        />
                        <textarea
                            name="notes"
                            value={profileData?.notes}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded mb-4"
                            placeholder="Your Notes"
                        />
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