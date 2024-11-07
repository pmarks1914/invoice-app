import React from 'react';
import {
    Card, CardText, CardBody, CardTitle, Pagination, PaginationItem, PaginationLink, Container, Row, Col, Label, CardFooter, Button
} from 'reactstrap';


// get old invoice list
const invoiceGetData = JSON.parse(localStorage.getItem("invoice"));

const Dashboard = () => {

    return (
        <div>

            <Row>
                {currentCards.map((item) => (
                    <Col md="4" key={item?.id} >
                        <Card className='m-1'>
                            <CardBody>
                                <CardTitle tag="h6">{item?.name}</CardTitle>
                                <CardBody className='fixed-card-body' >
                                    <img src={item?.logo} className='' key='1' />
                                </CardBody>
                                <CardText className='fixed-card-text'>{item?.bio?.length > 35 ? item?.bio?.slice(0, 35) : item?.bio} </CardText>
                            </CardBody>
                            <CardFooter className='fixed-card-footer'>
                                {/*  */}
                                <Button className='bg-text-wp wp-cursor-pointer m-2' color='secondary' onClick={() => { setModal2(true); setEditFormData(item) }} > Modify </Button>
                                <Button className='bg-text-shop-wp wp-cursor-pointer m-2' onClick={(e) => { setEditFormData(item); deleteShop(e, item) }} > Delete </Button>
                                <Button className='bg-text-wp wp-cursor-pointer m-2' color='secondary' onClick={() => itemStockPage(item)}> Product </Button>
                            </CardFooter>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Dashboard;