import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, CircularProgress, CssBaseline, InputLabel, TextField } from '@mui/material';
import { CContainer, CRow, CCol, CCard, CCardHeader, CCardBody } from '@coreui/react';
import avatar9 from 'path-to-avatar-image';

export default function ChangePassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const data = new FormData(event.currentTarget);
    const oldPassword = data.get('oldPassword');
    const newPassword = data.get('newPassword');
    const newPassword2 = data.get('newPassword2');

    if (newPassword !== newPassword2) {
      setError('New passwords do not match');
      setLoading(false);
      return;
    }

    const payload = JSON.stringify({
      oldPassword,
      newPassword,
      newPassword2,
    });

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_API}/v1/send/otp/email`, payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data.code === 200) {
        localStorage.setItem('signupInfo', payload);
        navigate('/otp');
      } else {
        setError('Failed to change password. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-light min-vh-100 min-vw-100 d-flex flex-row align-items-center">
      <CssBaseline />
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={4} lg={3} xl={3}>
            <CCard className="p-0 cl-container">
              <CCardHeader />
              <CCardBody className="m-0">
                <CRow>
                  <CCol xs="12" className="trade-name text-center">
                    <img src={avatar9} className="mb-0" width="100%" alt="venture innovo" />
                    <p className="m-0 fs-6">Change Password</p>
                    <Box component="form" noValidate autoComplete="on" onSubmit={handleSubmit}>
                      <TextField
                        label="Old Password"
                        name="oldPassword"
                        placeholder="Old password"
                        variant="outlined"
                        margin="normal"
                        type="password"
                        fullWidth
                        required
                      />
                      <TextField
                        label="New Password"
                        name="newPassword"
                        placeholder="New password"
                        variant="outlined"
                        margin="normal"
                        type="password"
                        fullWidth
                        required
                      />
                      <TextField
                        label="Confirm New Password"
                        name="newPassword2"
                        placeholder="Confirm password"
                        variant="outlined"
                        margin="normal"
                        type="password"
                        fullWidth
                        required
                      />
                      {error && <p style={{ color: 'red' }}>{error}</p>}
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        className="bg-text-com-wp"
                        disabled={loading}
                        style={{ color: '#fff' }}
                      >
                        {loading ? <CircularProgress size={24} /> : 'Submit'}
                      </Button>
                    </Box>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
}
