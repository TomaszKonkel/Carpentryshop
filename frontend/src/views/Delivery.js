import React, { useState, useEffect } from "react";
import { Container, Button, Row, Form, Col, Card  } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import swal from "sweetalert";
import { useLocation } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import {cilDelete, cilTrash, cilX} from "@coreui/icons";
import {CButton} from "@coreui/react";




function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Popovers = () => {

  const [err, setError] = useState(false);
  const [products, setProducts] = useState(null);
  const [ajdi, setAjdi] = useState(4);
  const [delivery, setDelivery] = useState([]);



  useEffect(() => {
    fetchedProducts();
  }, []);

  async function fetchedProducts() {
    try {
      const response = await fetch(
        "http://localhost:8080/api/products/all",
        {
          method: "GET",
          headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
          },
          redirect: "follow",
        }
      );
      let fetchedProducts = await response.json();
      JSON.parse(JSON.stringify(fetchedProducts))
      setProducts(fetchedProducts)
      // setLoading(false);
      console.log("elo" + products);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  }


  return (
    <Container className="d-flex justify-content-center align-items-center" >

      <Col>
        <div>
          <h1 style={{textAlign: "center"}}>Choose products from delivery</h1>
        </div>

            <Container>
              <Card className="shadow-lg border rounded-3 mt-5 mb-3">
                <Card.Body>
                  <Row>

                    <Col>
                      <div className="mt-1 mb-0 text-muted small">
                        <Form.Control as = "select" size="sm" onChange={
                          event => {
                            setAjdi(event.target.value)

                            const found = products && products.find(x => {
                              return x.id == ajdi
                            })
                            console.log(found.name)

                            delivery.push({
                              id: ajdi,
                              quantity: 0,
                            });

                            console.log(delivery)
                        }
                        }
                          >
                          <option value= "0" >Choose resource...</option>
                          {products && products.map((products) => {
                            if((products.type == "CONSTANT" || products.type == "LIQUID") && products.quantity > 0){

                              return (
                                <option value={products.id}>{products.id}|{products.name}</option>
                              )}})}

                        </Form.Control>
                      </div>
                      {delivery.map(delivery => (
                        <div>
                          <span key={delivery.id}>{delivery.id} {delivery.quantity}</span>
                        </div>

                      ))}
                    </Col>

                  </Row>
                </Card.Body>
              </Card>
            </Container>


        <Button onClick={() => {

          swal("Unit has been deleted", {
            icon: "success",
          });
        }}>Zmień</Button>

      </Col>


    </Container>

  )
}

export default Popovers
