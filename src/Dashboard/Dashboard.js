import { EyeIcon, HashtagIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import {
    Card, CardText, CardBody, CardTitle, Pagination, PaginationItem, PaginationLink, Container, Row, Col, Label, CardFooter, Button
} from 'reactstrap';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';



// console.log("invoiceGetData ", invoiceGetData)
const Dashboard = () => {

    // get old invoice list
    let invoiceGetData = JSON.parse(localStorage.getItem("invoice"));
    invoiceGetData = invoiceGetData ? invoiceGetData?.reverse() : []

    const cardsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(invoiceGetData?.length / cardsPerPage);
  
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = invoiceGetData?.slice(indexOfFirstCard, indexOfLastCard);
  
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    function storeInvoiceRecord(item){
        // set invoice
        localStorage.setItem("old-invoice", JSON.stringify(item));
        
        window.location.href ="/dashboard-view-invoice"
    }

    return (
        <div>
            <Header />

            <Container>
                <Row>
                    {currentCards?.map((item, id) => (
                        <Col sm="4" md="4" key={id+1} >
                            <Card className='m-1'>
                                <CardBody>
                                <Row>
                                    <Col xs="8" sm="8" md="8">
                                        <CardTitle tag="h6">{item?.date}</CardTitle>
                                        {/* <CardBody className='fixed-card-body' >
                                            <img src={item?.logo} className='' key='1' />
                                        </CardBody> */}
                                        <CardText className='d-flex fixed-card-text'>{'INV'} <HashtagIcon className="h-6 w-6 text-gray-500" />{':'}{item?.invoiceNumber}</CardText>
                                    </Col>
                                    <Col xs="4" sm="4" md="4" className="position-relative">
                          
                                        <EyeIcon className="absolute top-0 right-0 h-6 w-6 text-blue-500" onClick={()=> storeInvoiceRecord(item)} />
                                    </Col>
                                    </Row>

                                </CardBody>
                                {/* <CardFooter className='fixed-card-footer'> */}
                                    {/*  */}
                                    {/* <Button className='bg-text-wp wp-cursor-pointer m-2' color='secondary' onClick={() => { setModal2(true); setEditFormData(item) }} > Modify </Button> */}
                                    {/* <Button className='bg-text-shop-wp wp-cursor-pointer m-2' onClick={(e) => { setEditFormData(item); deleteShop(e, item) }} > Delete </Button> */}
                                    {/* <Button className='bg-text-wp wp-cursor-pointer m-2' color='secondary' onClick={() => itemStockPage(item)}> Product </Button> */}
                                {/* </CardFooter> */}
                            </Card>
                        </Col>
                    ))}
                </Row>
                <Row className='mb-9'>
                    <Col className='mb-9' >
                    <Pagination
                        aria-label="Page navigation example"
                        style={{ marginTop: '20px', justifyContent: 'center' }} // Inline styles for the entire pagination
                        className="custom-pagination" >
                        <PaginationItem disabled={currentPage === 1}>
                            <PaginationLink
                                first
                                href="#"
                                onClick={() => handlePageChange(1)}
                                style={{ color: '#000' }} // Inline style for individual links
                                className="custom-pagination-link" // Apply custom CSS class
                            />
                        </PaginationItem>
                        <PaginationItem disabled={currentPage === 1}>
                            <PaginationLink
                                previous
                                href="#"
                                onClick={() => handlePageChange(currentPage - 1)}
                                style={{ color: '#000' }}
                                className="custom-pagination-link"
                            />
                        </PaginationItem>

                        {[...Array(totalPages)]?.map((_, i) => (
                            <PaginationItem active={i + 1 === currentPage} key={i}>
                                <PaginationLink
                                    href="#"
                                    onClick={() => handlePageChange(i + 1)}
                                    style={i + 1 === currentPage ? { backgroundColor: 'gray', color: 'white' } : { color: '#000' }} // Inline style for active and non-active links
                                    className="custom-pagination-link"
                                >
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        <PaginationItem disabled={currentPage === totalPages}>
                            <PaginationLink
                                next
                                href="#"
                                onClick={() => handlePageChange(currentPage + 1)}
                                style={{ color: '#000' }}
                                className="custom-pagination-link"
                            />
                        </PaginationItem>
                        <PaginationItem disabled={currentPage === totalPages}>
                            <PaginationLink
                                last
                                href="#"
                                onClick={() => handlePageChange(totalPages)}
                                style={{ color: '#000' }}
                                className="custom-pagination-link"
                            />
                        </PaginationItem>
                    </Pagination>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Dashboard;