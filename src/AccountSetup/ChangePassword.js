import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../logo.png'; // Assuming you have a logo similar to the Login component

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [error, setError] = useState({ oldPassword: false, newPassword: false, newPassword2: false });
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    setError({ oldPassword: !oldPassword, newPassword: !newPassword, newPassword2: !newPassword2 });
    if (!oldPassword || !newPassword || !newPassword2) return;

    if (newPassword !== newPassword2) {
      setSubmitError("New passwords do not match.");
      return;
    }

    setLoading(true);
    setSubmitError("");

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_API}/change-password`, {
        oldPassword,
        newPassword,
        newPassword2,
      });

      if (response.data.success) {
        // Handle successful password change (e.g., navigate or show success message)
        setTimeout(() => window.location.href = '/dashboard', 1000);
      } else {
        setSubmitError("Failed to change password. Please try again.");
      }
    } catch (err) {
      setSubmitError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 mt-10 bg-white rounded-lg">
      <img src={logo} alt="Logo" className="w-24 mx-auto mb-6" />
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Change Password</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Old Password</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className={`w-full p-2 mt-1 border rounded ${error.oldPassword ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter your old password"
          />
          {error.oldPassword && <p className="text-red-500 text-sm">Old password is required.</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={`w-full p-2 mt-1 border rounded ${error.newPassword ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter your new password"
          />
          {error.newPassword && <p className="text-red-500 text-sm">New password is required.</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
          <input
            type="password"
            value={newPassword2}
            onChange={(e) => setNewPassword2(e.target.value)}
            className={`w-full p-2 mt-1 border rounded ${error.newPassword2 ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Confirm your new password"
          />
          {error.newPassword2 && <p className="text-red-500 text-sm">Confirming new password is required.</p>}
        </div>

        {submitError && <p className="text-red-500 text-center mt-2">{submitError}</p>}
        
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
          disabled={loading}
        >
          {loading ? <span className="loader"></span> : 'Submit'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <a href="/dashboard" className="text-blue-500 hover:underline">Go back to Dashboard</a>
      </div>
    </div>
  );
};

export default ChangePassword;
