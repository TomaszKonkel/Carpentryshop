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

export default function Assignment() {
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

    const deleteProduct = (id) => {
        postDeleteProducts(`http://localhost:8080/api/itemA/delete/${id}`,);
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
                swal({ text: "Error occurred while changing!!!", icon: "warning" });
                console.log("2"+error)
            }
        }
    }



  const doChangeAssigment = (id, operation, quan) => {
    updateData(`http://localhost:8080/api/assigment/modified?item=${id}&operation=${operation}&quan=${quan}`, {
    });
  }

  const doChangePrice = (operation, price) => {
    updateData(`http://localhost:8080/api/assigment/totalprice?operation=${operation}&total=${price}`, {
    });
  }

    return (

        <section >
            <CContainer >
                        {assigment && assigment
                          .sort((a, b) => a.project.name > b.project.name ? 1 : -1)
                          .map((order) => {
                                return (
                                  <CCardBody>
                                    <CRow>
                                      <CCol lg="3" md="12" className="mb-4 mb-lg-0">
                                        <MDBRipple rippleTag="div" rippleColor="light"
                                                   className="bg-image rounded hover-zoom hover-overlay">

                                          <CCardImage className="rounded-3" fluid
                                                      src={order.project.photos}
                                          />

                                        </MDBRipple>
                                      </CCol>

                                      <CCol lg="5" md="6" className=" mb-4 mb-lg-0">

                                        <p className="lead fw-normal mb-2">
                                          <strong>{order.project.name}</strong>
                                        </p>

                                        <p className="text-muted">Quantity: {order.quantityItemAssigment}</p>

                                        <CButton value={order.id} color="danger"
                                                 onClick={e => {
                                                   swal({
                                                     title: "Are your sure?",
                                                     text: "Confirmation means delete from order",
                                                     icon: "warning",
                                                     buttons: true,
                                                     dangerMode: true,
                                                   })
                                                     .then((willDelete) => {
                                                       if (willDelete) {
                                                         console.log(e.target.value)
                                                         deleteProduct(order.id)
                                                         doChangePrice("minus", (order.project.basePrice * order.quantityItemAssigment))
                                                         setTimeout(2000)
                                                         swal("Project has been deleted", {
                                                           icon: "success",
                                                         }).then(function () {
                                                           window.location.reload()
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
                                                         title: "Quantity of project in order can't be less than 1",
                                                         icon: "warning",
                                                         buttons: true,
                                                         dangerMode: true,
                                                       })
                                                     }else{
                                                       doChangeAssigment(order.id, "minus", 1)
                                                       doChangePrice("minus", order.project.basePrice)
                                                     }

                                                   }}>
                                            <CIcon icon={cilMinus} />
                                          </CButton>





                                          <CFormInput defaultValue={order.quantityItemAssigment} type="number" readOnly/>


                                          <CButton variant="success" size="sm" className="px-3 me-2"
                                                   onClick={() => {
                                                     doChangeAssigment(order.id, "plus", 1)
                                                     doChangePrice("plus", order.project.basePrice)
                                                   }}>
                                            <CIcon icon={cilPlus}  />
                                          </CButton>


                                        </div>

                                        <p className="text-start text-md-center">

                                          <strong>{order.project.basePrice}zł</strong>



                                        </p>
                                      </CCol>
                                    </CRow>

                                    <hr />


                                  </CCardBody>)


                        })}



            </CContainer>
        </section>
    )}
