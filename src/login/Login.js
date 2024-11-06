import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Row,
} from 'reactstrap'
import axios from 'axios';


import avatar9 from '../logo.png'
// import swal from 'sweetalert2'

// const swal = require("sweetalert2");
let permList = [
  "can_view",
];
const Login = () => {

  const [getFormDataError, setGetFormDataError] = React.useState({
    "password": false,
    "email": false
  })
  const [usernameVar, setUsernameVar] = useState("")
  const [passwordVar, setPasswordVar] = useState("")
  const [loader, setLoader] = useState("<div></div")
  const [login, setLogin] = useState("Login")
  const [loginError, setLoginError] = useState("")
  const [userType, setUserType] = useState("Student")
  const [userTypeError, setUserTypeError] = useState(false)

  function CheckLogin(e) {
    e.preventDefault();
    // // console.log("fff", process.env.REACT_APP_BASE_API, passwordVar, usernameVar)
    // window.location.href = "/dashboard";

    if (usernameVar === "") {
      setGetFormDataError({ ...getFormDataError, ...{ "email": true } })
    }
    else if (passwordVar === "") {
      setGetFormDataError({ ...getFormDataError, ...{ "password": true } })

    }

    else {
      setLogin("")
      setLoader('<div class="spinner-border "style="color: #e0922f;"></div>`')
      let data = JSON.stringify({
        "email": usernameVar,
        "password": passwordVar

      });

      let config = {
        method: 'post',
        url: process.env.REACT_APP_BASE_API + "/login",
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };
      axios(config).then(response => {
        // console.log(response.data, "auth ", response.data.token_type + " " + response.data.token);
        if (userType === "Student") {
          let counter = 600000; // 600000 = 10m
          let userData = response.data;
          userData = { ...userData, ...{ type: userType, counter: counter } }
          localStorage.setItem("userDataStore", JSON.stringify(userData));
          // Cookie
          // document.cookie = "cookieData" + "=" + JSON.stringify({ 
          //   aCount: "", 
          // wallet: "",
          // status: "",
          // aCess: "",
          // refresh: "",            
          // permission_list: ""
          // })
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 1000)
        }
        else if (userType === "School") {
          //

        }


      }).catch(function (error) {

        if (error.response) {
          setLoader("<a></a>")
          setLogin("Login")
          setLoginError("Wrong user credentials")
          /*
            * The request was made and the server responded with a
            * status code that falls out of the range of 2xx
            */

        } else if (error.request) {

          setLoader("<a></a>")
          setLogin("Login")
          setLoginError("Wrong user credentials")
          /*
            * The request was made but no response was received, `error.request`
            * is an instance of XMLHttpRequest in the browser and an instance
            * of http.ClientRequest in Node.js
            */

        } else {
          // Something happened in setting up the request and triggered an Error

        }
      }
      );

      // swal.fire({
      //     background: '#ffffff00',
      //     // html: `<div class="spinner-border "style="color: #e0922f;"></div>`, 
      //     showLoaderOnConfirm: false,
      //     showConfirmButton: false,
      //     allowOutsideClick: false,
      //     willOpen: () => {
      //     return 
      //     },
      //   });
    }

  }

  function userTypeLogin(e) {
    setUserType(e.target.value)
    setUserTypeError(false)
  }
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-3xl font-bold mb-6 text-gray-800">Invoice</div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Number</label>
          <input
            type="text"
            error={getFormDataError?.email}
            id="email"
            name="email"
            placeholder="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            onChange={(e) => (setUsernameVar(e.target.value), setGetFormDataError({ ...getFormDataError, ...{ "first_name": false } }))}
          />
        </div>
        <div>
          {/* <InputLabel shrink htmlFor="password"> </InputLabel> */}
          <input
            error={getFormDataError?.password}
            margin="normal"
            required
            fullWidth
            name="password"
            placeholder="Password "
            type="password"
            id="password"
            // variant = "standard"
            autoComplete="current-password"
            onChange={(e) => (setPasswordVar(e.target.value), setGetFormDataError({ ...getFormDataError, ...{ "password": false } }))}
          />
        </div>

      </div>

      <Row className="justify-content-center">
        <Col md={12} lg={12} xl={12}>
          <Card className="p-0 cl-container">
            <CardBody className='m-0'>
              <Row>
                <Col xs="0" sm="0" md={0} lg="1" xl="1" ></Col>
                <Col xs="12" sm="12" md={12} lg="10" xl="10" className='trade-name' >
                  <span><img src={avatar9} className='mb-0' width="100%" alt="venture innovo" /> </span>


                  <p className='m-0 text-center fs-6'>
                    Login
                  </p>
                  <Col xs="12" sm="12" md={12} lg={12} className="mt-3" >
                    <div className='mui-control-form' >

                      {/* <InputLabel shrink htmlFor="email"> </InputLabel> */}





                      {/* <FormControl fullWidth>
                          <InputLabel id="user-type-label" className='mt-3' >Select Login As * </InputLabel>
                          <Select
                            labelId="user-type-label"
                            id="user-type"
                            error={userTypeError}
                            value={userType}
                            label=" Login As"
                            onChange={(e)=>userTypeLogin(e)}
                            variant="standard"
                          >
                            <MenuItem value={"Student"}> As Student</MenuItem>
                            <MenuItem value={"School"}>As School</MenuItem>
                          </Select>
                        </FormControl> */}
                    </div>
                  </Col>
                  <p className="text-medium-emphasis mb-0">{loginError}</p>
                  <Row>
                    <Col xs={12}>
                      {/*  */}
                      {login === "Login" ?

                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                          onClick={(e) => CheckLogin(e)}
                          // style={{ background: "#0a0463"}}
                          className="bg-text-com-wp"
                        >
                          {login}
                        </Button>
                        :
                        <a dangerouslySetInnerHTML={{ __html: loader }}></a>

                      }
                    </Col>
                  </Row>



                </Col>
                <Col xs="0" sm="0" md={0} lg="1" xl="1" ></Col>
              </Row>
              <div >
              </div>
              <p className='mt-10 mb-2 text-center'>
                Don{"'"}t have an aCount? <a href='/signup'> Sign Up </a>
                <br />
                <a href='/reset-password' >Forget Password</a>
              </p>
            </CardBody>
          </Card>

        </Col>
      </Row>


    </div>
  )
}

export default Login
