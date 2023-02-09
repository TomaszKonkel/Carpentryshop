import {CRow, CCol, CCard, CCardBody, CContainer, CCardImage, CButton, CFormInput} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import swal from "sweetalert";
import React, {useEffect, useState} from "react";

import axios from "axios";
import {MDBInput, MDBRipple, MDBTypography} from "mdb-react-ui-kit";
import {
  cilMinus,
  cilPlus, cilTask, cilTrash
} from '@coreui/icons'



export default function Items() {
    const [loading, setLoading] = useState(true);
    const [fetchLoading, setFetchLoading] = useState(false);
    const [order, setOrder] = useState(null);
    const [err, setError] = useState(false);




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

    async function postDeleteProducts(url) {
        try {
            const response = await axios.delete(url, {
                headers: {
                    'Accept': 'application/json',
                  'Content-Type': 'application/json'
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
        postDeleteProducts(`http://localhost:8080/api/item/deleteItem/${id}`,);
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

    const doChange = (id, type, operation, quan) => {
      updateData(`http://localhost:8080/api/products/modified?product=${id}&type=${type}&operation=${operation}&quan=${quan}`, {
      });
    }

    const doChangeItem = (id, operation, quan) => {
      updateData(`http://localhost:8080/api/items/modified?item=${id}&operation=${operation}&quan=${quan}`, {
      });
    }

    const doChangePrice = (operation, price) => {
      updateData(`http://localhost:8080/api/items/totalprice?operation=${operation}&total=${price}`, {
      });
    }


    return (

    <section >
        <CContainer className="py-2">
                    {order && order
                      .sort((a, b) => a.id > b.id ? 1 : -1)
                      .map((order) => {

                            return (
                              <CCardBody>
                                <CRow>
                                  <CCol lg="3" md="12" className="mb-4 mb-lg-0">
                                    <MDBRipple rippleTag="div" rippleColor="light"
                                               className="bg-image rounded hover-zoom hover-overlay">
                                      {order.elementConstant != null &&
                                        <CCardImage className="rounded-3" fluid
                                                    src={order.elementConstant.photos}
                                        />
                                      }
                                      {order.elementLiquid != null &&
                                        <CCardImage className="rounded-3" fluid
                                                    src={order.elementLiquid.photos}
                                        />
                                      }
                                    </MDBRipple>
                                  </CCol>

                                  <CCol lg="5" md="6" className=" mb-4 mb-lg-0">
                                    {order.elementConstant != null &&
                                      <p className="lead fw-normal mb-2">
                                        <strong>{order.elementConstant.name}</strong>
                                      </p>
                                    }
                                    {order.elementLiquid != null &&
                                      <p className="lead fw-normal mb-2">
                                        <strong>{order.elementLiquid.name}</strong>
                                      </p>
                                    }

                                      <p className="text-muted">Quantity: {order.quantityItems}</p>




                                    {order.elementConstant != null &&
                                      <CButton value={order.id} color="danger"
                                               onClick={e => {
                                                 swal({
                                                   title: "Are you sure?",
                                                   text: "Confirmation means delete from order",
                                                   icon: "warning",
                                                   buttons: true,
                                                   dangerMode: true,
                                                 })
                                                   .then((willDelete) => {
                                                     if (willDelete) {
                                                       deleteProduct(order.id)
                                                       doChange(order.elementConstant.id, "CONSTANT", "plus", order.quantityItems)
                                                       doChangePrice("minus", (order.elementConstant.pricePerPiece * order.quantityItems))
                                                       swal("Constant has been deleted", {
                                                         icon: "success",
                                                       })

                                                     }
                                                   });
                                               }}
                                      >
                                        <CIcon icon={cilTrash} />
                                      </CButton>
                                    }
                                    {order.elementLiquid != null &&
                                      <CButton value={order.id} color="danger"
                                               onClick={e => {
                                                 swal({
                                                   title: "Are you sure?",
                                                   text: "Confirmation means delete from order",
                                                   icon: "warning",
                                                   buttons: true,
                                                   dangerMode: true,
                                                 })
                                                   .then((willDelete) => {
                                                     if (willDelete) {
                                                       deleteProduct(order.id)
                                                       doChange(order.elementLiquid.id, "LIQUID", "plus", order.quantityItems)
                                                       doChangePrice("minus", (order.elementLiquid.pricePerLiter * order.quantityItems))
                                                       swal("Liquid has been deleted", {
                                                         icon: "success",
                                                       })
                                                     }
                                                   });
                                               }}
                                      >
                                        <CIcon icon={cilTrash} />
                                      </CButton>
                                    }


                                  </CCol>
                                  <CCol lg="4" md="6" className="mb-4 mb-lg-0">
                                    <div className="d-flex mb-4" >

                                      {order.elementConstant != null &&
                                        <CButton variant="success" size="sm"
                                                 onClick={() => {

                                                   if(order.quantityItems == 1){
                                                     swal({
                                                       title: "Quantity of project in order can't be less than 1",
                                                       icon: "warning",
                                                       buttons: true,
                                                       dangerMode: true,
                                                     })
                                                   }else{

                                                     doChange(order.elementConstant.id, "CONSTANT", "plus", 1)
                                                     doChangeItem(order.id, "minus", 1)
                                                     doChangePrice("minus", order.elementConstant.pricePerPiece)
                                                   }

                                                 }}>
                                          <CIcon icon={cilMinus} />
                                        </CButton>
                                      }

                                      {order.elementLiquid != null &&
                                        <CButton variant="success" size="sm" className="px-3 me-2"
                                                 onClick={() => {

                                                   if(order.quantityItems == 1){
                                                     swal({
                                                       title: "Quantity of project in order can't be less than 1",
                                                       icon: "warning",
                                                       buttons: true,
                                                       dangerMode: true,
                                                     })
                                                   }else{
                                                     doChange(order.elementLiquid.id, "LIQUID", "plus", 1)
                                                     doChangeItem(order.id, "minus", 1)
                                                     doChangePrice("minus", order.elementLiquid.pricePerLiter)
                                                   }

                                                 }}>
                                          <CIcon icon={cilMinus}  />
                                        </CButton>
                                      }


                                      <CFormInput defaultValue={order.quantityItems} type="number" readOnly/>

                                      {order.elementConstant != null &&
                                        <CButton variant="success" size="sm" className="px-3 me-2"
                                                 onClick={() => {

                                                   if(order.elementConstant.quantity == 0){
                                                     swal({
                                                       title: "There is no more products",
                                                       icon: "warning",
                                                       buttons: true,
                                                       dangerMode: true,
                                                     })
                                                   }else{
                                                     doChange(order.elementConstant.id, "CONSTANT", "minus", 1)
                                                     doChangeItem(order.id, "plus", 1)
                                                     doChangePrice("plus", order.elementConstant.pricePerPiece)
                                                   }
                                                 }}>
                                          <CIcon icon={cilPlus}  />
                                        </CButton>
                                      }
                                      {order.elementLiquid != null &&
                                        <CButton variant="success" size="sm" className="px-3 me-2"
                                                 onClick={() => {

                                                   if(order.elementLiquid.quantity == 0){
                                                     swal({
                                                       title: "There is no more products",
                                                       icon: "warning",
                                                       buttons: true,
                                                       dangerMode: true,
                                                     })
                                                   }else{
                                                     doChange(order.elementLiquid.id, "LIQUID", "minus", 1)
                                                     doChangeItem(order.id, "plus", 1)
                                                     doChangePrice("plus", order.elementLiquid.pricePerLiter)
                                                   }
                                                 }}>
                                          <CIcon icon={cilPlus}  />
                                        </CButton>
                                      }
                                    </div>

                                    <p className="text-start text-md-center">
                                      {order.elementConstant != null &&
                                        <strong>{order.elementConstant.pricePerPiece * order.quantityItems}zł</strong>
                                      }
                                      {order.elementLiquid != null &&
                                        <strong>{order.elementLiquid.pricePerLiter * order.quantityItems}zł</strong>
                                      }

                                    </p>
                                  </CCol>
                                </CRow>

                                <hr />


                              </CCardBody>)


                    })}




        </CContainer>
    </section>
        )}
