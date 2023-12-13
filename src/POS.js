import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/esm/Table';


export default function PoS({ prodList, categList, setProdList, onSendArrayReps, onSendArrayToProd }) {
        
    
    useEffect(() => {
        onSendArrayToProd(prodList);
    }, [prodList, onSendArrayToProd]);

  

    const [name, setName] = useState('')
    const [user, setUser] = useState({
        name: ''
    })
    const [cart, setCart] = useState([])
    const [transaction, setTransaction] = useState([])
    const [productStocks, setProductStocks] = useState({})
    console.log(transaction)







    useEffect(() => {
        onSendArrayReps(transaction);
    }, [transaction, onSendArrayReps]);

    function addToCart(id) {
        
        const stockValue = productStocks[id] || 0;
        const updatedCart = [...cart];
        const prodItem = prodList.find(item => item.prodID === id);
        const existingCartItemIndex = updatedCart.findIndex(item => item.prodID === id && user.name === item.name);

        if (existingCartItemIndex !== -1) {
            const Stock = updatedCart[existingCartItemIndex].stock;
            const newStock = parseInt(Stock) + parseInt(stockValue);
            const totals = updatedCart[existingCartItemIndex].total;
            const newTotal = totals + (prodItem.prodPrice * stockValue);
            
            
            if (parseInt(stockValue) <= 0 || parseInt(stockValue) === null) {
                alert('Please input valid amount.')
            } else if (parseInt(stockValue) > parseInt(prodItem.prodStocks)) {
                alert('Exceeded available stock');
            } else {
                updatedCart[existingCartItemIndex].stock = newStock;
                updatedCart[existingCartItemIndex].total = newTotal;
                const updatedProdList = prodList.map(prod => {
                    if (prodItem.prodID === prod.prodID) {
                        const Stock = prod.prodStocks - stockValue;
                        return { ...prod, prodStocks: Stock };
                    }
                    return prod;
                });
        
                setProdList(updatedProdList);
            }
        } else {
            if (parseInt(stockValue) <= 0 || parseInt(stockValue) === null) {
                alert('Please input valid amount.')
            } else if (parseInt(stockValue) > parseInt(prodItem.prodStocks)) {
                alert('Exceeded available stock');
            } else {
                const totalPrice = prodItem.prodPrice * stockValue
                updatedCart.push({ name: name, prodID: id, stock: stockValue, total: totalPrice });
               
                const updatedProdList = prodList.map(prod => {
                    if (prodItem.prodID === prod.prodID) {
                        const Stock = prod.prodStocks - stockValue;
                        return { ...prod, prodStocks: Stock };
                    }
                    return prod;
                });
        
                setProdList(updatedProdList);
            }
        }

        setCart(updatedCart);
        setProductStocks({ ...productStocks, [id]: '' });   
        setTransaction(updatedCart)
    }
    
    return (
        <Container className="mt-3">
            <h1 className='text-center'>Order</h1>
            <Row className=''>

                {user.name === ''
                        ?
                        (
                            <Col md={4} >
                                <Form>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Your name?</Form.Label>
                                        <Form.Control value={name} onChange={e => setName(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <button onClick={() => {
                                            setUser({ ...user, name: name })
                                        }}>Save</button>
                                    </Form.Group>
                                </Form>
                            </Col>

                        )
                        :
                        (
                            <Col md={5}>
                                <div className='d-flex justify-content-between mb-4'>
                                    <h3>Welcome {user.name}!</h3>
                                    <button onClick={() => {
                                        setUser({ name: '' })
                                    }}>Log Out</button>
                                </div>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Your Purchases</th>
                                            <th>Item Name</th>
                                            <th>Stock</th>
                                            <th>Category</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart.map(cart => (
                                            cart.name === name ?
                                                <tr>
                                                    <td></td>
                                                    {
                                                        prodList.map(prod => {
                                                            if (cart.prodID === prod.prodID) {
                                                                return (
                                                                    <>
                                                                        <td>{prod.prodName}</td>
                                                                        <td>{cart.stock}</td>

                                                                        {
                                                                            categList.map((item, index) => {
                                                                                if (prod.category === item[0]) {
                                                                                    return (<td>{item[1]}</td>)
                                                                                }
                                                                                return null;
                                                                            })
                                                                        }
                                                                    </>
                                                                )
                                                            }
                                                            return null;
                                                        })
                                                    }
                                                    <td>{cart.total}</td>
                                                </tr>
                                                :
                                                <></>
                                        ))}
                                    </tbody>
                                </Table>
                            </Col>
                        )
                }
                <Col>
                    <Row xs={2} md={3}>
                        {prodList.map((prod, index) => (
                            prod.prodStocks <= 0 ?
                                <></>
                                :
                                (<Col key={index} className="mb-2">
                                    <Card style={{ width: '15rem' }}>
                                        <Card.Header>{prod.prodName}</Card.Header>
                                        <Card.Body>
                                            <Card.Text>
                                                <p>Price: {prod.prodPrice}</p>
                                                <p>Stock: {prod.prodStocks}</p>
                                                {
                                                    categList.map((item, index) => {
                                                        if (prod.category === item[0]) {
                                                            return (<p>Category: {item[1]}</p>)
                                                        }
                                                        return null;
                                                    })
                                                }
                                            </Card.Text>
                                        </Card.Body>
                                        {user.name === ''
                                            ?
                                            <></>
                                            :
                                            <Card.Footer>
                                                <input
                                                    max={prod.prodStocks}
                                                    type="number"
                                                    value={productStocks[prod.prodID] || ''}
                                                    onChange={e => {
                                                        setProductStocks({ ...productStocks, [prod.prodID]: e.target.value });
                                                    }}
                                                />
                                                <button onClick={() => addToCart(prod.prodID)}>Order</button>
                                            </Card.Footer>
                                        }
                                    </Card>
                                </Col>)
                        ))}
                    </Row>
                </Col>
            </Row>
            
        </Container>
    );
}