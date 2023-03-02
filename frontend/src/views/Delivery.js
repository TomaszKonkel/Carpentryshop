import React, { useState, useEffect } from "react";
import { Container, Button, Row, Form, Col, Card  } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import swal from "sweetalert";
import { useLocation } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import {cilDelete, cilMinus, cilPlus, cilTrash, cilX} from "@coreui/icons";
import {CButton, CFormInput} from "@coreui/react";




function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Popovers = () => {

  const [err, setError] = useState(false);
  const [products, setProducts] = useState(null);
  const [ajdi, setAjdi] = useState(4);
  let [delivery, setDelivery] = useState([]);
  const [quan, setQuan] = useState(1);

  useEffect(() => {
    const delivery = JSON.parse(localStorage.getItem('delivery'));
    if (delivery) {
      setDelivery(delivery);
    }
  }, []);



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

    } catch (err) {
      console.log(err);
      setError(err);
    }
  }

  async function updateData(url, data) {

    let dataJson = JSON.stringify(data);
    try {
      const response = await axios.put(url, dataJson, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });
      window.location.reload()
    } catch (error) {
      if (error) {
        swal({ text: "Error occurred while changing!!!", icon: "warning" });
        console.log("2"+error)
      }
    }
  }

  const completeDelivery = () => {

    var keys = [];
    var values = [];
    var types = [];
    delivery && delivery.forEach(x => {
      keys.push(x.id)
      values.push(x.quantity)
      types.push(x.types)
    })


    updateData(`http://localhost:8080/api/products/delivery?product=${keys}&quan=${values}&types=${types}`, {
    });
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

                    <Col md="10">
                      <h6>Pick product one by one from select input</h6>
                      <div className="mt-1 mb-0 text-muted small">
                        <Form.Control as = "select" id="select" size="sm">
                          <option value= "0" >Choose resource...</option>
                          {products && products.map((products) => {
                            if((products.type == "CONSTANT" || products.type == "LIQUID") && products.quantity > 0){

                              return (
                                <option value={products.id}>{products.id}|{products.name}</option>
                              )}})}

                        </Form.Control>
                      </div>
                    </Col>
                    <Col className="d-flex flex-column mt-4">
                      <Button onClick={
                        () => {
                          setQuan(quan)

                          let e = document.getElementById("select");
                          let value = e.value;
                          setAjdi(value)
                          const found = products && products.find(x => {
                            return x.id == value
                          })
                          const names = found.name;
                          const types = found.type;

                          if(delivery.find(x => x.id == value) != undefined)
                          {
                            delivery.find(x => {
                              if(x.id === value){
                                x.quantity = x.quantity + quan
                              }
                            })
                          }
                          else{
                            delivery.push({
                              id: value,
                              name: names,
                              quantity: quan,
                              types: types
                            });
                            localStorage.setItem("delivery", JSON.stringify(delivery));

                          }
                        setQuan(1)
                        }
                      }>Add</Button>
                    </Col>
                    <Row md="4" style={{display:"flex"}}>
                      <div style={{margin:"auto"}} className="d-flex mb-4" md="4" >
                        <CButton variant="success" size="sm"
                                 onClick={() =>{
                                   if(quan == 1){
                                     swal({
                                       title: "Product can't be added with quantity less than 1",
                                       icon: "warning",
                                       buttons: true,
                                       dangerMode: true,
                                     })
                                   }else{
                                     setQuan(quan - 1)
                                   }

                                 }}
                        >
                          <CIcon icon={cilMinus} />
                        </CButton>

                          <CFormInput style={{textAlign:"center"}} value={quan} type="number" readOnly/>

                        <CButton variant="success" size="sm" className="px-3 me-2"
                                 onClick={() =>{
                                   setQuan(quan + 1)
                                 }}
                        >
                          <CIcon icon={cilPlus}  />
                        </CButton>
                      </div>
                    </Row>

                      {delivery && delivery.map(delivery => (
                        <div>
                          <span key={delivery.id}>{delivery.id} {delivery.quantity} {delivery.name} {delivery.types}</span>
                        </div>

                      ))}


                  </Row>
                </Card.Body>
              </Card>
            </Container>


        <Button onClick={() => {

          swal({
            title: "Are you sure, you wanna add this products?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((willPost) => {
            if (willPost) {
              completeDelivery()
                delivery = []
              localStorage.setItem("delivery", JSON.stringify(delivery));
            }
          });
        }}>Zmień</Button>

      </Col>


    </Container>

  )
}

export default React.memo(Popovers)
