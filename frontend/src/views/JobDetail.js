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

const JobDetail = () => {
  let query = useQuery();



  const [todo, setTodo] = useState(null);
  const [err, setError] = useState(false);
  const [products, setProducts] = useState(null);
  const [resources, setResources] = useState(null);
  const [ajdi, setAjdi] = useState(0);

  const [which, setWhich] = useState(0);







  useEffect(() => {
    fetchedToDo();
  }, []);




  async function fetchedToDo() {
    try {
      const response = await fetch(
        `http://localhost:8080/api/assigment/details/${query.get("id")}`,
        {
          method: "GET",
          headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
          },
          redirect: "follow",
        }
      );
      let fetchedToDo = await response.json();
      JSON.parse(JSON.stringify(fetchedToDo))
      setTodo(fetchedToDo)

      setWhich(fetchedToDo.id)

    } catch (error) {
      setError(error);
      console.log(err);
    }
  }

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

  useEffect(() => {
    fetchedResources();
  }, []);

  async function fetchedResources() {
    try {
      const response = await fetch(
        `http://localhost:8080/api/resources/all`,
        {
          method: "GET",
          headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
          },
          redirect: "follow",
        }
      );
      let fetchedResources = await response.json();
      JSON.parse(JSON.stringify(fetchedResources))
      setResources(fetchedResources)
      // setLoading(false);
      console.log("elo" + resources);
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
        <div style={{display: "flex"}}>
          <h1>Assigment {todo && todo.id}</h1>
          <h3 style={{marginLeft: "auto"}}>Total price: {todo && todo.totalPrice} zł</h3>
        </div>
        {todo && todo.itemAssigment.map((as) => {
          return(
            <Container>
              <Card className="shadow-lg border rounded-3 mt-5 mb-3">
                <Card.Body>
                  <Row>
                    <Col md="12" lg="3" className="mb-4 mb-lg-0">
                      <p>{as.furniture.name}</p>
                      <div className="mb-2 text-muted small">
                        <span>Ilość: {as.quantityItemAssigment}</span>
                        <span className="text-primary"> • </span>
                        <span>Rodzaj: {as.furniture.furnitureCategory}</span>

                      </div>
                      <div className="mb-2 text-muted small">
                        <span>Data dodania: {as.data}<br /></span>
                      </div>
                    </Col>
                    <Col md="6">
                      <h5></h5>
                      <div className="d-flex flex-row">
                        <div className="text-danger mb-1 me-2">

                        </div>
                      </div>
                      <div className="mt-1 mb-0 text-muted small">
                        <Form.Control as = "select" size="sm" disabled={todo && todo.approved == true ? true : false} onChange={
                          event => setAjdi(event.target.value)
                        }>
                          <option value= "0" >Choose resource...</option>
                          {products && products.map((products) => {
                            if((products.type == "CONSTANT" || products.type == "LIQUID") && products.quantity > 0){

                              return (
                                <option value={products.id}>{products.id}|{products.name}</option>
                              )}})}

                        </Form.Control>
                      </div>
                      <div className="mb-2 text-muted small">
                        {resources && resources.filter(re => {
                          return re.itemAssigment.id === as.id;
                        }).map((re) => {
                          return (
                              <p style={{textAlign: "right"}}>
                                <span>{re.quantityResources}x</span>{" "}
                                <span>{re.product.name}</span> = {" "}
                                {re.product.type == "LIQUID" &&
                                  <span>{re.product.pricePerLiter * re.quantityResources} zł</span>
                                }
                                {re.product.type == "CONSTANT" &&
                                  <span>{re.product.pricePerPiece * re.quantityResources} zł</span>
                                }
                                <CButton variant="none" i
                                         onClick={ e => {
                                           console.log(e.target.value);
                                           swal({
                                             title: "Jesteś pewien?",
                                             text: "Potwierdzenie oznacza usunięcie klienta",
                                             icon: "warning",
                                             buttons: true,
                                             dangerMode: true,
                                           })
                                             .then((willDelete) => {
                                               if (willDelete) {
                                                 onDelete(todo.id, re.id, re.product.id, "plus", re.quantityResources )
                                                 swal("Unit has been deleted", {
                                                   icon: "success",
                                                 }).then(function () {
                                                   window.location.reload();
                                                 });;;
                                               }
                                             });
                                         }}
                                >
                                  {todo && todo.approved == false &&
                                    <CIcon icon={cilX} />
                                  }

                                </CButton>
                              </p>

                            )

                        })}

                      </div>



                    </Col>
                    <Col
                      md="6"
                      lg="3"
                      className="border-sm-start-none border-start"
                    >
                      <div className="d-flex flex-row align-items-center mb-1">
                        <Button  variant="success" disabled={todo && todo.approved == true ? true : false}
                                 onClick={ e => {
                                   if (ajdi == 0){
                                     swal({
                                       title: "Wybierz resource",
                                       icon: "warning",
                                       buttons: true,
                                       dangerMode: true,
                                     })
                                   }
                                   else{
                                   swal({
                                     title: "Jesteś pewien?",
                                     text: "Potwierdzenie oznacza usunięcie klienta",
                                     icon: "warning",
                                     buttons: true,
                                     dangerMode: true,
                                   })
                                     .then((willPost) => {
                                       if (willPost) {
                                         onSubmitConstant(ajdi, as, todo.id, "minus", 1)

                                         swal("Unit has been deleted", {
                                           icon: "success",
                                         });;;
                                       }
                                     });
                                 }}}
                        >
                          Add Resource
                        </Button>
                      </div>


                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Container>

          )})}


        <Button disabled={todo && todo.approved == true ? true : false} onClick={() => {
          endAssigment(which)
          swal("Unit has been deleted", {
            icon: "success",
          });
        }}>End Job</Button>

      </Col>


    </Container>

  )
}

export default JobDetail
