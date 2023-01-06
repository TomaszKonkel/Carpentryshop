import React, {useEffect, useState} from "react";

import {
  CContainer,
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
  CCol,
  CRow, CFormInput
} from '@coreui/react'

import {
  MDBTypography,
} from "mdb-react-ui-kit";

import Cart from "./Cart"
import Assigment from "./Assigment";
import axios from "axios";
import swal from "sweetalert";




const Order = () => {
  const [loading, setLoading] = useState(true);
  const [fetchLoading, setFetchLoading] = useState(false);

  const [assigment, setAssigment] = useState(null);
  const [err, setError] = useState(false);
  const [totalAssigment, setTotalAssigment] = useState(0);
  const [totalCart, setTotalCart] = useState(0);
  const [order, setOrder] = useState(null);
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");


  const total = totalCart + totalAssigment;

  let sumCart = order && Object.keys(order).length;
  let sumAssigment = assigment && Object.keys(assigment).length;
  let sum = sumCart + sumAssigment;


  useEffect(() => {
    fetchedAssigment();
  }, []);



  async function fetchedAssigment() {
    try {
      const response = await fetch("http://localhost:8080/api/itemA/all", {
        method: "GET", headers: {
          'Accept': 'application/json', "Content-Type": "application/json",
        }, redirect: "follow",
      });
      let fetchedAssigment = await response.json();
      JSON.parse(JSON.stringify(fetchedAssigment))
      setAssigment(fetchedAssigment)
      // setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  }

  useEffect(() => {
    fetchedOrder();
  }, []);



  async function fetchedOrder() {
    try {
      const response = await fetch("http://localhost:8080/api/item/all", {
        method: "GET", headers: {
          'Accept': 'application/json', "Content-Type": "application/json",
        }, redirect: "follow",
      });
      let fetchedOrder = await response.json();
      JSON.parse(JSON.stringify(fetchedOrder))
      setOrder(fetchedOrder)
      // setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  }

  useEffect(() => {
    fetchedTotalPrizeCart();
  }, []);

  async function fetchedTotalPrizeCart() {
    try {
      const response = await fetch("http://localhost:8080/api/cart/total", {
        method: "GET", headers: {
          'Accept': 'application/json', "Content-Type": "application/json",
        },
        redirect: "follow",
      });
      let fetchedTotalPrizeCart = await response.json();
      JSON.parse(JSON.stringify(fetchedTotalPrizeCart))
      setTotalCart(fetchedTotalPrizeCart)
      // setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  }

  useEffect(() => {
    fetchedTotalPrizeAssigment();
  }, []);

  async function fetchedTotalPrizeAssigment() {
    try {
      const response = await fetch("http://localhost:8080/api/assigment/total", {
        method: "GET", headers: {
          'Accept': 'application/json', "Content-Type": "application/json",
        }, redirect: "follow",
      });
      let fetchedTotalPrizeAssigment = await response.json();
      JSON.parse(JSON.stringify(fetchedTotalPrizeAssigment))
      setTotalAssigment(fetchedTotalPrizeAssigment)
      // setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  }

  async function postData(url, data) {
    setFetchLoading(true);
    let dataJson = JSON.stringify(data);
    try {
      const response = await axios.get(url, dataJson, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
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
        setLoading(false)
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
      console.log("1. " + response.status);
    } catch (error) {
      if (error) {
        swal({ text: "Błąd przy dodawaniu!!!", icon: "warning" });
        console.log("2"+error)
      }
    }
  }

  const onSubmit = () => {

    postData("http://localhost:8080/api/assigment/end", {
    });
    postData("http://localhost:8080/api/cart/end", {
    });
    if(totalAssigment > 0){
      updateData(`http://localhost:8080/api/assigment/customerData/${name}/${lastname}/${phonenumber}`, {
      });
    }



  };
  return (
    <CContainer className="py-5 h-100">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossOrigin="anonymous"/>
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
            integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
            crossOrigin="anonymous"/>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.compat.css"
      />
      <CRow className="justify-content-center my-4">
        <CCol md="8">
          <CCard className="mb-4">
            <CCardHeader className="py-3">
              <MDBTypography tag="h5" className="mb-0">
                Cart - {sum} items
              </MDBTypography>
            </CCardHeader>

            {totalCart == 0 && totalAssigment == 0 &&
              <div >
                <div className="d-flex align-items-center justify-content-center" style={{margin: 10}}>
                  <i className="fas fa-cart-arrow-down fa-10x"></i>
                </div>

                  <div className="d-flex align-items-center justify-content-center">

                    <h3><strong>Your order is empty :(</strong></h3>


                  </div>
                  <div className="d-flex align-items-center justify-content-center">

                    <h5 >Please, add something</h5>

                  </div>
              </div>

            }

            {totalCart > 0 &&
              <Cart/>
            }

            {totalAssigment > 0 &&
              <Assigment/>
            }

          </CCard>

        </CCol>

        <CCol md="4">
            <CCard className=" rounded-3">
              <CCardBody>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <MDBTypography tag="h5" className="mb-0">
                    Summary
                  </MDBTypography>
                </div>


                <form className="mt-4">
                  <CFormInput disabled={sumAssigment <= 0 ? true : false} onChange={
                    e => setName(e.target.value)
                  }
                    className="mb-4" label="Customer Name" type="text"/>
                  <CFormInput disabled={sumAssigment <= 0 ? true : false} onChange={
                    e => setLastname(e.target.value)
                  }
                              className="mb-4" label="Customer Lastname" type="text"/>
                  <CFormInput  disabled={sumAssigment <= 0 ? true : false} type="number" onChange={
                    e => setPhonenumber(e.target.value)
                  }
                    label="Customer phone number"
                    />
                </form>

                <hr />

                <div className="d-flex justify-content-between">
                  <p className="mb-2">Products</p>
                  <p className="mb-2">{totalCart} zł</p>
                </div>

                <div className="d-flex justify-content-between">
                  <p className="mb-2">Projects</p>
                  <p className="mb-2">{totalAssigment} zł</p>
                </div>

                <hr />

                <div className="d-flex justify-content-between">
                  <p className="mb-2"><strong>Total</strong></p>
                  <p className="mb-2">{total} zł</p>
                </div>

                <CButton color="info" block size="lg" disabled={
                  total === 0 ? true : false
                }
                         onClick={() =>{
                           if(totalAssigment > 0){
                             if(name === "" || lastname === "" || phonenumber === ""){
                               swal({ text: "Please enter all information about customer", icon: "warning" })
                             }
                             else{
                               onSubmit()
                             }

                           }
                           else {
                             onSubmit()
                           }
                         }
                         } >
                  <div className="d-flex justify-content-between">

                  <span>
                          Checkout{" "}
                    <i className="fas fa-long-arrow-alt-right ms-2"></i>
                        </span>
                  </div>
                </CButton>
              </CCardBody>
            </CCard>
        </CCol>


      </CRow>
    </CContainer>
  )
}

export default Order
