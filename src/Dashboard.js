import React, { useState } from 'react';
import {
    Card, CardText, CardBody, CardTitle, Pagination, PaginationItem, PaginationLink, Container, Row, Col, Label, CardFooter, Button
} from 'reactstrap';


// get old invoice list
const invoiceGetData = JSON.parse(localStorage.getItem("invoice"));

const Dashboard = () => {

    const cardsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(invoiceGetData.length / cardsPerPage);
  
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = invoiceGetData.slice(indexOfFirstCard, indexOfLastCard);
  
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>


            <Container>
                <Row>
                    {invoiceGetData.map((item) => (
                        <Col md="4" key={item?.id} >
                            <Card className='m-1'>
                                <CardBody>
                                    <CardTitle tag="h6">{item?.date}</CardTitle>
                                    <CardBody className='fixed-card-body' >
                                        <img src={item?.logo} className='' key='1' />
                                    </CardBody>
                                    <CardText className='fixed-card-text'>{item?.bio?.length > 35 ? item?.bio?.slice(0, 35) : item?.bio} </CardText>
                                </CardBody>
                                <CardFooter className='fixed-card-footer'>
                                    {/*  */}
                                    {/* <Button className='bg-text-wp wp-cursor-pointer m-2' color='secondary' onClick={() => { setModal2(true); setEditFormData(item) }} > Modify </Button> */}
                                    {/* <Button className='bg-text-shop-wp wp-cursor-pointer m-2' onClick={(e) => { setEditFormData(item); deleteShop(e, item) }} > Delete </Button> */}
                                    {/* <Button className='bg-text-wp wp-cursor-pointer m-2' color='secondary' onClick={() => itemStockPage(item)}> Product </Button> */}
                                </CardFooter>
                            </Card>
                        </Col>
                    ))}
                </Row>

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

                    {[...Array(totalPages)].map((_, i) => (
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
            </Container>
        </div>
    );
};

export default Dashboard;