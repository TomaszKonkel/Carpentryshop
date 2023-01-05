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
  const [ajdi, setAjdi] = useState(0);

  let delivery =[];

  console.log(delivery)



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




  ////////////////////



  async function postData(url, data) {

    let dataJson = JSON.stringify(data);
    try {
      const response = await axios.post(url, dataJson, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',

        },
      });
      console.log("1. " + response.status);
      if (response.status === 200) {
        swal({
          text: "Produkt dodany do listy!",
          icon: "success",
        }).then(function() {
          window.location.reload()
        });;

      }
    } catch (error) {
      if (error) {
        swal({ text: "Błąd przy dodawaniu!!!", icon: "warning" });
        console.log("2"+error)
      }
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
        swal({ text: "Błąd przy dodawaniu!!!", icon: "warning" });
        console.log("2"+error)
      }
    }
  }

  async function postDelete(url) {
    try {
      const response = await axios.delete(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });
      console.log(response);
    } catch (error) {
      if (error) {
        console.log(error)
      }
    }
  }

  const onSubmitConstant = (ajdi, item, assigment, operation, quan) => {

    const found = products.find(obj => {
      return obj.id == ajdi;
    });

    const kind = found.type;
    let kindPrice = 0;
    if(found.type ===("CONSTANT") ) {
      kindPrice = found.pricePerPiece;
    }
    if(found.type ===("LIQUID")) {
      kindPrice = found.pricePerLiter;
    }

    updateData(`http://localhost:8080/api/resources/modified/${ajdi}/${kind}/${operation}/${quan}`, {
    });
    updateData(`http://localhost:8080/api/resources/modifiedPrice/${assigment}/${kindPrice}/plus/1`, {
    });
    postData(`http://localhost:8080/api/resources/add/${ajdi}/${assigment}`, {
      itemAssigment: item
    });

  };

  const onDelete = (assigment, resource, ajdi, operation, quan) => {

    const found = products.find(obj => {
      return obj.id == ajdi;
    });

    const kind = found.type;
    let kindPrice = 0;
    if(found.type ===("CONSTANT") ) {
      kindPrice = found.pricePerPiece;
    }
    if(found.type ===("LIQUID")) {
      kindPrice = found.pricePerLiter;
    }

    updateData(`http://localhost:8080/api/resources/modifiedPrice/${assigment}/${kindPrice}/minus/${quan}`, {
    });
    updateData(`http://localhost:8080/api/resources/modified/${ajdi}/${kind}/${operation}/${quan}`, {
    });
    postDelete(`http://localhost:8080/api/resources/delete/${resource}`)

  };

  const endAssigment = (assigment) => {

    updateData(`http://localhost:8080/api/assigment/end/${assigment}`,{})

  };




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
                            const obj = {
                              id: ajdi,
                          }
                          delivery.push(obj)

                            console.log(delivery)
                        }
                        }>
                          <option value= "0" >Choose resource...</option>
                          {products && products.map((products) => {
                            if((products.type == "CONSTANT" || products.type == "LIQUID") && products.quantity > 0){

                              return (
                                <option value={products.id}>{products.id}|{products.name}</option>
                              )}})}

                        </Form.Control>
                      </div>
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
