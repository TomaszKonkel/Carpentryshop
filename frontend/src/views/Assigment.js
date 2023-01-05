import {CRow, CCol, CCard, CCardBody, CContainer, CCardImage, CButton, CFormInput} from '@coreui/react'
import {Button} from "react-bootstrap";
import swal from "sweetalert";
import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import axios from "axios";
import CIcon from '@coreui/icons-react'
import {MDBInput, MDBRipple, MDBTypography} from "mdb-react-ui-kit";
import {
  cilMinus,
  cilPlus, cilTrash
} from '@coreui/icons'


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function Assigment() {
    const [loading, setLoading] = useState(true);
    const [fetchLoading, setFetchLoading] = useState(false);
    const [assigment, setAssigment] = useState(null);
    const [err, setError] = useState(false);

    useEffect(() => {
        fetchedOrder();
    }, []);



    async function fetchedOrder() {
        try {
            const response = await fetch("http://localhost:8080/api/itemA/all", {
                method: "GET", headers: {
                    'Accept': 'application/json', "Content-Type": "application/json",
                }, redirect: "follow",
            });
            let fetchedOrder = await response.json();
            JSON.parse(JSON.stringify(fetchedOrder))
            setAssigment(fetchedOrder)
            // setLoading(false);
        } catch (err) {
            console.log(err);
            setError(err);
        }
    }





    async function postDeleteProducts(url) {
        try {
            const response = await axios.delete(url, {
                headers: {
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                },
            });
            window.location.reload()
        } catch (error) {
            if (error) {
                console.log(error)
            }
        }
    }

    const deleteProduct = (id, furniture, quan) => {
        postDeleteProducts(`http://localhost:8080/api/itemA/delete/${id}`,);

        updateData(`http://localhost:8080/api/assigment/totalpriceTrash/${furniture.basePrice * quan}`, {

      });
    };

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

    const onSubmit = () => {

        postData("http://localhost:8080/api/assigment/end", {
        });
        postData("http://localhost:8080/api/cart/end", {
        });

    };
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

    const doPlus = (assigment, furnitureNew) => {
        const {
            id = assigment.id,
            data = assigment.data,
            quantityItemAssigment = assigment.quantityItemAssigment,
            furniture = assigment.furniture
        } = assigment

        const {
            idProduct = assigment.furniture.id,
            descriptionProduct = assigment.furniture.description,
            nameProduct = assigment.furniture.name,
            furnitureCategory = assigment.furniture.furnitureCategory,
            basePrice = assigment.furniture.basePrice,
            weight = assigment.furniture.weight
        } = furnitureNew
        updateData(`http://localhost:8080/api/itemA/details/${assigment.id}`, {
            id: id,
            data: data,
            quantityItemAssigment: quantityItemAssigment + 1,
            furniture: furnitureNew
        });

      updateData(`http://localhost:8080/api/assigment/totalprice/${furnitureNew.basePrice}`, {

      });
    }

    const doMinus = (assigment, furnitureNew) => {
        const {
            id = assigment.id,
            data = assigment.data,
            quantityItemAssigment = assigment.quantityItemAssigment,
            furniture = assigment.furniture
        } = assigment

        const {
            idProduct = assigment.furniture.id,
            descriptionProduct = assigment.furniture.description,
            nameProduct = assigment.furniture.name,
            furnitureCategory = assigment.furniture.furnitureCategory,
            basePrice = assigment.furniture.basePrice,
            weight = assigment.furniture.weight
        } = furnitureNew
        updateData(`http://localhost:8080/api/itemA/details/${assigment.id}`, {
            id: id,
            data: data,
            quantityItemAssigment: quantityItemAssigment - 1,
            furniture: furnitureNew
        });

      updateData(`http://localhost:8080/api/assigment/totalprice2/${furnitureNew.basePrice}`, {

      });
    }

    return (

        <section >
            <CContainer >


                        {assigment && assigment.map((order) => {

                                return (
                                  <CCardBody>
                                    <CRow>
                                      <CCol lg="3" md="12" className="mb-4 mb-lg-0">
                                        <MDBRipple rippleTag="div" rippleColor="light"
                                                   className="bg-image rounded hover-zoom hover-overlay">

                                          <CCardImage className="rounded-3" fluid
                                                      src={order.furniture.photos}
                                          />


                                          <a href="src/views/Assigment#!">
                                            <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" , }}>
                                            </div>
                                          </a>
                                        </MDBRipple>
                                      </CCol>

                                      <CCol lg="5" md="6" className=" mb-4 mb-lg-0">

                                        <p className="lead fw-normal mb-2">
                                          <strong>{order.furniture.name}</strong>
                                        </p>


                                        <p className="text-muted">Weight: {order.furniture.weight}</p>
                                        <p className="text-muted">Quantity: {order.quantityItemAssigment}</p>



                                        <CButton value={order.id} color="danger"
                                                 onClick={e => {
                                                   swal({
                                                     title: "Jesteś pewien?",
                                                     text: "Potwierdzenie oznacza usunięcie klienta",
                                                     icon: "warning",
                                                     buttons: true,
                                                     dangerMode: true,
                                                   })
                                                     .then((willDelete) => {
                                                       if (willDelete) {
                                                         console.log(e.target.value)
                                                         deleteProduct(order.id, order.furniture, order.quantityItemAssigment)
                                                         setTimeout(2000)
                                                         swal("Unit has been deleted", {
                                                           icon: "success",
                                                         }).then(function () {
                                                           window.location = "/";
                                                         });
                                                         ;
                                                         ;
                                                       }
                                                     });
                                                 }}
                                        >
                                          <CIcon icon={cilTrash} />
                                        </CButton>



                                      </CCol>
                                      <CCol lg="4" md="6" className="mb-4 mb-lg-0">
                                        <div className="d-flex mb-4" >


                                          <CButton variant="success" size="sm"
                                                   onClick={() => {

                                                     if(order.quantityItemAssigment == 1){
                                                       swal({
                                                         title: "Ilość przedmoiotu w zamówieniu nie może być mniejsza od 1",
                                                         icon: "warning",
                                                         buttons: true,
                                                         dangerMode: true,
                                                       })
                                                     }else{
                                                       doMinus(order, order.furniture)
                                                     }

                                                   }}>
                                            <CIcon icon={cilMinus} />
                                          </CButton>





                                          <CFormInput defaultValue={order.quantityItemAssigment} type="number" readonly/>


                                          <CButton variant="success" size="sm" className="px-3 me-2"
                                                   onClick={() => {
                                                     doPlus(order, order.furniture)
                                                   }}>
                                            <CIcon icon={cilPlus}  />
                                          </CButton>


                                        </div>

                                        <p className="text-start text-md-center">

                                          <strong>{order.furniture.basePrice}zł</strong>



                                        </p>
                                      </CCol>
                                    </CRow>

                                    <hr />


                                  </CCardBody>)


                        })}



            </CContainer>
        </section>
    )}
