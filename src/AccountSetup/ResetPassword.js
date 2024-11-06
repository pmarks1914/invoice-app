import React from 'react';
import { Box, TextField, InputLabel, Button, CssBaseline } from '@mui/material';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const navigate = useNavigate();

  const [getFormData, setGetFormData] = React.useState({});
  const [getFormDataError, setGetFormDataError] = React.useState({
    email: false,
    password: false,
    password1: false,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Password validation logic
    const hasUppercase = /[A-Z]/.test(getFormData.password || "");
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;"'<>,.?/\\|~`-]/.test(getFormData.password || "");
    const isPasswordValid = getFormData.password?.length >= 8 && hasUppercase && hasSpecialChar;
    
    if (!getFormData.email) {
      setGetFormDataError({ ...getFormDataError, email: true });
    } else if (!isPasswordValid) {
      setGetFormDataError({ ...getFormDataError, password: true });
    } else if (getFormData.password !== getFormData.password1) {
      setGetFormDataError({ ...getFormDataError, password1: true });
    } else {
      sendOTP();
    }
  };

  const sendOTP = () => {
    axios.post(`${process.env.REACT_APP_BASE_API}/v1/send/otp/email`, {
      email: getFormData.email,
    }).then(response => {
      Swal.fire({
        text: 'Check your email and type the code here.',
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'Submit',
        preConfirm: (otpCode) => {
          if (!otpCode) {
            Swal.showValidationMessage(`Request failed! code is required.`);
          } else {
            resetPassword(otpCode);
          }
        },
      });
    }).catch(error => {
      console.error("Error sending OTP:", error);
    });
  };

  const resetPassword = (otpCode) => {
    axios.put(`${process.env.REACT_APP_BASE_API}/v1/forget/password`, {
      email: getFormData.email,
      password: getFormData.password,
      code: otpCode,
    }).then(response => {
      Swal.fire({
        text: response.data.message,
        icon: 'success',
      }).then(() => {
        navigate('/login');
      });
    }).catch(error => {
      Swal.fire({
        text: error.response?.data?.message || "Error resetting password.",
        icon: 'error',
      });
    });
  };

  return (
    <div className="bg-light min-vh-100 min-vw-100 d-flex flex-row align-items-center">
      <CssBaseline />
      <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="on" className="form-container">
        <InputLabel htmlFor="email">Email</InputLabel>
        <TextField
          error={getFormDataError.email}
          id="email"
          name="email"
          placeholder="Your email"
          variant="outlined"
          fullWidth
          required
          onChange={(e) => {
            setGetFormData({ ...getFormData, email: e.target.value });
            setGetFormDataError({ ...getFormDataError, email: false });
          }}
        />
        <InputLabel htmlFor="newPassword">New Password</InputLabel>
        <TextField
          error={getFormDataError.password}
          type="password"
          name="password"
          placeholder="New password"
          variant="outlined"
          fullWidth
          required
          onChange={(e) => {
            setGetFormData({ ...getFormData, password: e.target.value });
            setGetFormDataError({ ...getFormDataError, password: false });
          }}
        />
        {getFormDataError.password && <p className="error-text">Password must be strong, with uppercase and special characters.</p>}
        <InputLabel htmlFor="newPassword2">Confirm Password</InputLabel>
        <TextField
          error={getFormDataError.password1}
          type="password"
          name="password1"
          placeholder="Confirm password"
          variant="outlined"
          fullWidth
          required
          onChange={(e) => {
            setGetFormData({ ...getFormData, password1: e.target.value });
            setGetFormDataError({ ...getFormDataError, password1: false });
          }}
        />
        {getFormDataError.password1 && <p className="error-text">Passwords do not match.</p>}
        <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
          Submit
        </Button>
      </Box>
    </div>
  );
}
