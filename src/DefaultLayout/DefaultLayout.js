import React, { Component } from 'react'
import FooterNavigation from '../Footer/FooterNavigation';
// import { getSessionTimeout } from '../Utils/Utils'; 

// session  
const currentUser = JSON.parse(localStorage.getItem("userDataStore")); 

class DefaultLayout extends Component {
  componentDidMount(){
    // getSessionTimeout();

  }
  render() {
    if(!currentUser){
    //   window.location.href = "/login"
    } 

    window.onstorage = () => {
      // // console.log("storage >", JSON.parse(localStorage.getItem("userDataStore")) )
      if(JSON.parse(localStorage.getItem("userDataStore")) === null){
        // // console.log("storage ")
        // window.location.href="/";
      }
    };
    return (
      <div>
        {/* <AppSidebar /> */}
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          {/* <AppHeader /> */}
          <div className="body flex-grow-1 px-3">
            {/* <AppContent /> */}
          </div>
          <FooterNavigation />
        </div>
      </div>
    );
  }
}

export default DefaultLayout;



// // console.log("storage listener")
// window.addEventListener('storage', function(event){
//   // console.log("storage listener")
//   if (event.key == 'logout-event') { 
//       // ..
//   }
// });