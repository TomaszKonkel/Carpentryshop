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



export default function Cart() {
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
        postDeleteProducts(`http://localhost:8080/api/item/delete/${id}`,);
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
                    window.location = "/";
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
            window.location.reload()
        } catch (error) {
            if (error) {
                swal({ text: "Błąd przy dodawaniu!!!", icon: "warning" });
                console.log("2"+error)
            }
        }
    }


    //Uruchamia się razem ze smietnikiem, przywraca wartość dodanych itemów
    const doChangeC = (index, elementConstant, quan) => {

        const {
            id = order.elementConstant.id,
            description = order.elementConstant.description,
            name = order.elementConstant.name,
            constantCategory = order.elementConstant.constantCategory,
            pricePerPiece = order.elementConstant.pricePerPiece,
            lengthInCm = order.elementConstant.lengthInCm,
            widthInCm = order.elementConstant.widthInCm,
            quantity = order.elementConstant.quantity
        } = elementConstant

        updateData(`http://localhost:8080/api/constant/details/update/constant/${index}`, {
            id: id,
            name: name,
            constantCategory: constantCategory,
            pricePerPiece: pricePerPiece,
            lengthInCm: lengthInCm,
            widthInCm: widthInCm,
            description: description,
            quantity: quantity + quan
        });

      updateData(`http://localhost:8080/api/cart/totalpriceTrash/${elementConstant.pricePerPiece * quan}`, {

      });


    };
    const doChangeL = (index, elementLiquid, quan) => {

        const {
            id= order.elementLiquid.id,
            name= order.elementLiquid.name,
            capacity= order.elementLiquid.capacity,
            pricePerLiter= order.elementLiquid.pricePerLiter,
            liquidCategory= order.elementLiquid.liquidCategory,
            description= order.elementLiquid.description,
            quantity= order.elementLiquid.quantity
        } = elementLiquid

        updateData(`http://localhost:8080/api/liquid/details/update/liquid/${index}`, {
            id: id,
            name: name,
            liquidCategory: liquidCategory,
            pricePerLiter: pricePerLiter,
            capacity: capacity,
            description: description,
            quantity: quantity + quan
        });

      updateData(`http://localhost:8080/api/cart/totalpriceTrash/${elementLiquid.pricePerLiter * quan}`, {

      });



    };

    const doChangeMinusC = (order, elementConstantNew) => {
        const {
            id = order.id,
            data = order.data,
            quantityItemCart = order.quantityItemCart,
            elementConstant = order.elementConstant,
        } = order;
        const {
            idProduct = order.elementConstant.id,
            descriptionProduct = order.elementConstant.description,
            nameProduct = order.elementConstant.name,
            constantCategoryProduct = order.elementConstant.constantCategory,
            pricePerPieceProduct = order.elementConstant.pricePerPiece,
            lengthInCmProduct = order.elementConstant.lengthInCm,
            widthInCmProduct = order.elementConstant.widthInCm,
            quantityProduct = order.elementConstant.quantity
        } = elementConstantNew;

        updateData(`http://localhost:8080/api/constant/details/update/constant/${order.elementConstant.id}`, {
            id: idProduct,
            name: nameProduct,
            description: descriptionProduct,
            constantCategory: constantCategoryProduct,
            pricePerPiece: pricePerPieceProduct,
            lengthInCm: lengthInCmProduct,
            widthInCm: widthInCmProduct,
            quantity: quantityProduct + 1

        });

        updateData(`http://localhost:8080/api/item/details/${order.id}`, {
            id: id,
            data: data,
            quantityItemCart: quantityItemCart - 1,
            elementConstant: elementConstantNew
        });

      updateData(`http://localhost:8080/api/cart/totalprice2/${order.elementConstant.pricePerPiece}`, {
      });


    };
    const doChangePlusC = (order, elementConstantNew) => {
        const {
            id = order.id,
            data = order.data,
            quantityItemCart = order.quantityItemCart,
            elementConstant = order.elementConstant,

        } = order;
        const {
            idProduct = order.elementConstant.id,
            descriptionProduct = order.elementConstant.description,
            nameProduct = order.elementConstant.name,
            constantCategoryProduct = order.elementConstant.constantCategory,
            pricePerPieceProduct = order.elementConstant.pricePerPiece,
            lengthInCmProduct = order.elementConstant.lengthInCm,
            widthInCmProduct = order.elementConstant.widthInCm,
            quantityProduct = order.elementConstant.quantity
        } = elementConstantNew;


        updateData(`http://localhost:8080/api/constant/details/update/constant/${order.elementConstant.id}`, {
            id: idProduct,
            name: nameProduct,
            description: descriptionProduct,
            constantCategory: constantCategoryProduct,
            pricePerPiece: pricePerPieceProduct,
            lengthInCm: lengthInCmProduct,
            widthInCm: widthInCmProduct,
            quantity: quantityProduct - 1

        });

        updateData(`http://localhost:8080/api/item/details/${order.id}`, {
            id: id,
            data: data,
            quantityItemCart: quantityItemCart + 1,
            elementConstant: elementConstantNew,


        });

      updateData(`http://localhost:8080/api/cart/totalprice/${order.elementConstant.pricePerPiece}`, {
      });





    };

    const doChangeMinusL = (order, elementLiquidNew) => {
        const {
            id = order.id,
            data = order.data,
            quantityItemCart = order.quantityItemCart,
            elementLiquid = order.elementLiquid,
        } = order;
        const {
            idProduct= order.elementLiquid.id,
            nameProduct= order.elementLiquid.name,
            capacityProduct= order.elementLiquid.capacity,
            pricePerLiterProduct= order.elementLiquid.pricePerLiter,
            liquidCategoryProduct= order.elementLiquid.liquidCategory,
            descriptionProduct= order.elementLiquid.description,
            quantityProduct= order.elementLiquid.quantity
        } = elementLiquidNew;

        updateData(`http://localhost:8080/api/liquid/details/update/liquid/${order.elementLiquid.id}`, {
            id: idProduct,
            name: nameProduct,
            description: descriptionProduct,
            liquidCategory: liquidCategoryProduct,
            pricePerLiter: pricePerLiterProduct,
            capacity: capacityProduct,
            quantity: quantityProduct + 1

        });

        updateData(`http://localhost:8080/api/item/details/${order.id}`, {
            id: id,
            data: data,
            quantityItemCart: quantityItemCart -1,
            elementLiquid: elementLiquidNew
        });

      updateData(`http://localhost:8080/api/cart/totalprice2/${order.elementLiquid.pricePerLiter}`, {
      });



    };
    const doChangePlusL = (order, elementLiquidNew) => {
        const {
            id = order.id,
            data = order.data,
            quantityItemCart = order.quantityItemCart,
            elementLiquid = order.elementLiquid,

        } = order;
        const {
            idProduct= order.elementLiquid.id,
            nameProduct= order.elementLiquid.name,
            capacityProduct= order.elementLiquid.capacity,
            pricePerLiterProduct= order.elementLiquid.pricePerLiter,
            liquidCategoryProduct= order.elementLiquid.liquidCategory,
            descriptionProduct= order.elementLiquid.description,
            quantityProduct= order.elementLiquid.quantity
        } = elementLiquidNew;


        updateData(`http://localhost:8080/api/liquid/details/update/liquid/${order.elementLiquid.id}`, {
            id: idProduct,
            name: nameProduct,
            description: descriptionProduct,
            liquidCategory: liquidCategoryProduct,
            pricePerLiter: pricePerLiterProduct,
            capacity: capacityProduct,
            quantity: quantityProduct - 1

        });

        updateData(`http://localhost:8080/api/item/details/${order.id}`, {
            id: id,
            data: data,
            quantityItemCart: quantityItemCart +1,
            elementLiquid: elementLiquidNew
        });

      updateData(`http://localhost:8080/api/cart/totalprice/${order.elementLiquid.pricePerLiter}`, {
      });

    };


    return (

<section >
    <CContainer className="py-2">


                {order && order.map((order) => {

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
                                  <a href="src/views/Cart#!">
                                    <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" , }}>
                                    </div>
                                  </a>
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
                                {order.elementConstant != null &&
                                  <p className="text-muted">Ilosc: {order.elementConstant.quantity}</p>
                                }
                                {order.elementLiquid != null &&
                                  <p className="text-muted">Ilosc: {order.elementLiquid.quantity}</p>

                                }


                                {order.elementConstant != null &&
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
                                                   deleteProduct(order.id)
                                                   doChangeC(order.elementConstant.id, order.elementConstant, order.quantityItemCart)
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
                                }
                                {order.elementLiquid != null &&
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
                                                   deleteProduct(order.id)
                                                   doChangeL(order.elementLiquid.id, order.elementLiquid, order.quantityItemCart)
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
                                }


                              </CCol>
                              <CCol lg="4" md="6" className="mb-4 mb-lg-0">
                                <div className="d-flex mb-4" >

                                  {order.elementConstant != null &&
                                    <CButton variant="success" size="sm"
                                             onClick={() => {

                                               if(order.quantityItemCart == 1){
                                                 swal({
                                                   title: "Ilość przedmoiotu w zamówieniu nie może być mniejsza od 1",
                                                   icon: "warning",
                                                   buttons: true,
                                                   dangerMode: true,
                                                 })
                                               }else{
                                                 doChangeMinusC(order, order.elementConstant)
                                               }

                                             }}>
                                      <CIcon icon={cilMinus} />
                                    </CButton>
                                  }

                                  {order.elementLiquid != null &&
                                    <CButton variant="success" size="sm" className="px-3 me-2"
                                             onClick={() => {

                                               if(order.quantityItemCart == 1){
                                                 swal({
                                                   title: "Ilość przedmoiotu w zamówieniu nie może być mniejsza od 1",
                                                   icon: "warning",
                                                   buttons: true,
                                                   dangerMode: true,
                                                 })
                                               }else{
                                                 doChangeMinusL(order, order.elementLiquid)
                                               }

                                             }}>
                                      <CIcon icon={cilMinus}  />
                                    </CButton>
                                  }


                                  <CFormInput defaultValue={order.quantityItemCart} type="number" readonly/>

                                  {order.elementConstant != null &&
                                    <CButton variant="success" size="sm" className="px-3 me-2"
                                             onClick={() => {

                                               if(order.elementConstant.quantity == 0){
                                                 swal({
                                                   title: "Nie ma tyle przedmiotów",
                                                   icon: "warning",
                                                   buttons: true,
                                                   dangerMode: true,
                                                 })
                                               }else{
                                                 doChangePlusC(order, order.elementConstant)
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
                                                   title: "Nie ma tyle przedmiotów",
                                                   icon: "warning",
                                                   buttons: true,
                                                   dangerMode: true,
                                                 })
                                               }else{
                                                 doChangePlusL(order, order.elementLiquid)
                                               }
                                             }}>
                                      <CIcon icon={cilPlus}  />
                                    </CButton>
                                  }
                                </div>

                                <p className="text-start text-md-center">
                                  {order.elementConstant != null &&
                                    <strong>{order.elementConstant.pricePerPiece * order.quantityItemCart}zł</strong>
                                  }
                                  {order.elementLiquid != null &&
                                    <strong>{order.elementLiquid.pricePerLiter * order.quantityItemCart}zł</strong>
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
