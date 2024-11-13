(function () {
    let modalState = false 
    // console.log(" data ", document.getElementsByClassName('modal'))
    document.addEventListener("submit", function() {
        document.addEventListener("DOMContentLoaded", function() {
            createCss(window.innerHeight, window.innerWidth);
        });
    });
    this.wpPay = function (post) {

        let elements = document.getElementsByClassName('modal');
        // console.log(elements, document.getElementsByClassName('modal'))
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }
        if (JSON.parse(post).apikey) {
            // console.log(" data ", JSON.parse(post))
            // document.addEventListener("DOMContentLoaded", function() {
            //     // 
            // });
            submitData(post)      
                 
        }
    }
    function submitData(dataToCheckout) {
        // 
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        // console.log(" data ", JSON.parse(raw))
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: dataToCheckout,
            redirect: 'follow'
        };
        fetch(window.p_url, requestOptions)
            .then(response => response.text() )
            .then(result => {
                // console.log("res", JSON?.parse(result) )
                if((JSON?.parse(result))?.status){
                    // let splitUrl = "https://web.wingipay.com/checkout/9340716f-c602-4e53-96ea-ecc6dc4c55f8/".split("/");
                    let splitUrl = (JSON?.parse(result)?.redirect_url).split("/")
                    let newUrl = splitUrl[ splitUrl[splitUrl?.length-1] === "" ? (splitUrl.length-2) : splitUrl.length-1 ]
                    
                    // console.log( newUrl, splitUrl[splitUrl?.length-1], newUrl )
                    // createHtml( "http://127.0.0.1:3002/checkout/" + newUrl)
                    createHtml( JSON?.parse(result)?.redirect_url )
                    
                    // window.location.href = JSON?.parse(result)?.redirect_url
                }
                else{
                    alert((JSON?.parse(result))?.message)
                }
            }
            )
            .catch(error => {
                console.log('error', error)
                // alert("")
            });
    }
    // set global env for create session checkout
    window.p_url = "https://prod.wingipay.com/web/checkout/add/"

    // create modal for checking out iframe
    function initializeModal(url){
        // 
        createCss(window.innerHeight, window.innerWidth);
        // Get the modal and the button that opens it
        const modal = document.getElementById("myModal");
        const btn = document.getElementsByClassName("wp-dash-btn")[0];
        // const btn = document.getElementById("wp-dash-btn");
        // Get the <span> element that closes the modal
        const span = document.getElementsByClassName("close")[0];
        // console.log(btn.onclick)
        if(span.onclick){
            // closeModal(span, modal);
        }
        else if(btn.onclick){
            openModal(btn, modal);
        }
        else{
            modal.style.display = "block";
        }
        span.onclick = function() {
            modal.style.display = "none"; 

            // Hide the reloading process from the user
            document.getElementsByTagName('body')[0].style.opacity = 0;
            location.reload(true)
            // submitData({"country" : "GHS"})           
        }
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                // modal.style.display = "none";
            }
        }
    }

    // set modal to true
    function openModal(btn, modal){
        // When the user clicks the button, open the modal
        btn.onclick = function() {
            modal.style.display = "block";
        }
    }
    // set modal to false
    function closeModal(span, modal){
        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }
    }

    function createCss(deviceHeight, deviceWidth){
        // Create a style element
        const modalStyles = document.createElement("style");
        // console.log(deviceHeight, deviceWidth)
        // Add the CSS rules to the style element
        if(deviceWidth > 1010){
            modalStyles.textContent = `
            /* Modal styles */
            .modal {
                // display: none; /* Hidden by default */
                position: fixed; /* Stay in place */
                z-index: 1; /* Sit on top */
                left: 0;
                top: 0;
                width: 100%; /* Full width */
                height: 100%; /* Full height */
                overflow-y: hidden;
                overflow-x: hidden; /* Enable scroll if needed */
                background-color: rgba(0,0,0,0.4); /* Black background with opacity */
            }

            /* Modal content styles */
            .modal-content {
                // background-color: #fefefe;
                background-color: #fff0;
                margin: 10% auto 30% auto; /* 0px from the top and centered */
                padding: 0px 0px 60px 0px;
                border: 0px solid #888;
                width: 40%; /* Could be more or less, depending on screen size */
                height: 61%;
            }

            /* Close button styles */
            .close {            
                color: #aaa;
                // margin: 0px 0px auto auto;
                margin: 0px -17px -0px -1px;
                padding: 1px;
                float: right;
                // width: 100%;
                font-size: 28px;
                font-weight: bold;
                border-radius: 40%;
                // border: 1px solid #ff7643;
                background: #fff;
                color: #ff7643;
            }

            .close:hover,
            .close:focus {
                color: black;
                text-decoration: none;
                cursor: pointer;
            }
            .checkout-0{
                backgroud: #fff
            }
            `;
        }
        else{
            modalStyles.textContent = `
            /* Modal styles */
            .modal {
                // display: none; /* Hidden by default */
                position: fixed; /* Stay in place */
                z-index: 1; /* Sit on top */
                left: 0;
                top: 0;
                width: 100%; /* Full width */
                height: 100%; /* Full height */
                overflow-y: hidden;
                overflow-x: hidden; /* Enable scroll if needed */
                background-color: rgba(0,0,0,0.4); /* Black background with opacity */
            }

            /* Modal content styles */
            .modal-content {
                // background-color: #fefefe;
                background-color: #fff0;
                margin: 10% auto 30% auto; /* 0px from the top and centered */
                padding: 0px 0px 60px 0px;
                border: 0px solid #888;
                width: 100%; /* Could be more or less, depending on screen size */
                height: 60%;
            }

            /* Close button styles */
            .close {            
                color: #aaa;
                margin: 0px 0px auto auto;
                // margin: 0px -17px -0px -1px;
                padding: 4px;
                float: right;
                // width: 100%;
                font-size: 28px;
                font-weight: bold;
                border-radius: 40%;
                // border: 1px solid #ff7643;
                background: #fff;
                color: #ff7643;
            }

            .close:hover,
            .close:focus {
                color: black;
                text-decoration: none;
                cursor: pointer;
            }
            .checkout-0{
                backgroud: #fff
            }
            `;
        }
        // Append the style element to the document head
        document.head.appendChild(modalStyles);
    }
    function createHtml(url) {
        // Create the modal container element
        const modalContainer = document.createElement("div");
        modalContainer.id = "myModal";
        modalContainer.classList.add("modal");

        // Create the modal content element
        const modalContent = document.createElement("div");
        modalContent.classList.add("modal-content");

        // Create the close button element
        const closeButton = document.createElement("span");
        closeButton.classList.add("close");
        closeButton.innerHTML = "&times;";
        modalContent.appendChild(closeButton);

        // Create the text content for the modal
        // const modalText = document.createElement("p");
        // modalText.innerHTML = "Hello, world!";

        const iframe = document.createElement('iframe');
        iframe.src = url;
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.padding = '0px 0px auto auto !important';
        iframe.style.margin = '0px auto 30% auto';
        iframe.style.border = 'none';
        iframe.height = '100%';
        iframe.width = '100%';
        
        // modalContent.appendChild(modalText);
        modalContent.appendChild(iframe);

        // Add the modal content to the modal container
        modalContainer.appendChild(modalContent);
        
        


        // Add the modal container to the DOM
        document.body.appendChild(modalContainer);

        initializeModal(url)

    }
})();