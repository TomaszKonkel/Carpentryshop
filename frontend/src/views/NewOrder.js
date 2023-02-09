import React, { useState, useEffect } from "react";
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CContainer,
  CCardImage,
  CButton,
  CFormInput,
  CInputGroup,
  CInputGroupText, CFormLabel, CFormFeedback
} from '@coreui/react'
import { useLocation } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import {cilSearch} from "@coreui/icons";
import CIcon from "@coreui/icons-react";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const NewOrder = () => {

  const [loading, setLoading] = useState(true);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [products, setProducts] = useState(null);
  const [err, setError] = useState(false);
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetchedProducts();
  }, []);

  // Fetching list of products
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
      console.log("TU"+err);
      setError(err);
    }
  }

  // Function which posting data to Order
  async function postData(url, data) {
    setFetchLoading(true);
    let dataJson = JSON.stringify(data);
    try {
      const response = await axios.post(url, dataJson, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });
      if (response.status === 200) {
        swal({
          text: "Product has been added to order!",
          icon: "success",
        }).then(function() {
          window.location.reload()
        });;
        setLoading(false)
      }
    } catch (error) {
      if (error) {
        swal({ text: "Error occurs while adding!!!", icon: "warning" });

      }
    }
  }

  // Initializing function which call posting function with parameters od products
  const onSubmitConstant = (ElementConst) => {
    const {
      id = products.id,
      description = products.description,
      name = products.name,
      constantCategory = products.constantCategory,
      pricePerPiece = products.pricePerPiece,
      quantity = products.quantity,
      lengthInCm = products.lengthInCm,
      widthInCm = products.widthInCm
    } = ElementConst;

    postData("http://localhost:8080/api/items/addItem", {
      elementConstant: ElementConst,
    });

  };

  const onSubmitLiquid = (ElementLiquid) => {
    const {
      id = products.id,
      description = products.description,
      name = products.name,
      liquidCategory = products.liquidCategory,
      capacity = products.capacity,
      quantity = products.quantity,
      pricePerLiter = products.pricePerLiter

    } = ElementLiquid;

    postData("http://localhost:8080/api/items/addItem", {
      elementLiquid: ElementLiquid
    });

  };

  const onSubmitFurniture = (Project) => {
    const {
      id = products.id,
      description = products.description,
      name = products.name,
      furnitureCategory = products.furnitureCategory,
      basePrice = products.basePrice,
      weight = products.weight,
    } = Project;

    postData("http://localhost:8080/api/assigment/add", {
      project: Project
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
      console.log("1. " + response.status);
    } catch (error) {
      if (error) {
        swal({ text: "Error occurs while updating!!!", icon: "warning" });
        console.log("2"+error)
      }
    }
  }

  const doChange = (id, type, operation, quan) => {
    updateData(`http://localhost:8080/api/products/modified?product=${id}&type=${type}&operation=${operation}&quan=${quan}`, {
    });
  }


  const filtered = products && products.filter((el) => {

    if(search === ""){
      return el;
    }
    else {
      return Object.values(el)
        .join(' ')
        .toLowerCase()
        .includes(search.toLowerCase())
    }
  })

  return (
    <CContainer fluid>
      <CRow className="justify-content-center mb-0">

        <CCol md={12}>
          <CInputGroup className="has-validation">
            <CFormInput placeholder="Search"
              onChange={e =>{
              setSearch(e.target.value)
            }}></CFormInput>
            <CButton  color='primary'>
              <CIcon icon={cilSearch} />
            </CButton>
          </CInputGroup>
        </CCol>

        <CCol md="12" xl="10">
          {filtered && [...filtered]
            .sort((a, b) => a.type > b.type ? 1 : -1)
            .map(products => {
              if (products.productStatus == true){

              return (
                <CCard className="shadow-lg border rounded-3 mt-5 mb-3">
                  <CCardBody>
                    <CRow>
                      <CCol md="12" lg="3" className="mb-4 mb-lg-0">

                        <CCardImage
                          src={products.photos}
                          fluid
                          className="w-100"

                        />

                      </CCol>
                      <CCol md="6">
                        <h5>{products.name}</h5>
                        <div className="d-flex flex-row">
                          <div className="text-danger mb-1 me-2">
                            {products.type}
                          </div>
                        </div>
                        <div className="border-sm-start-none border-bottom mt-1 mb-0 text-muted small">
                          {products && products.type === "FURNITURE" &&
                            <span>Weight: {products.weight}</span>
                          }
                          {products && products.type === "CONSTANT" &&
                            <span>
                              <span>Lenght: {products.lengthInCm} CM &nbsp;</span>
                              <span className="text-primary"> • </span>
                              <span>&nbsp; Width: {products.widthInCm} CM</span>
                              <span className="text-primary"> • </span>
                              <span>&nbsp; Quantity: {products.quantity} pcs</span>
                            </span>
                          }
                          {products && products.type === "LIQUID" &&
                            <span>
                              <span>Capacity: {products.capacity}L &nbsp;</span>
                              <span className="text-primary"> • </span>
                              <span>&nbsp; Quantity: {products.quantity} pcs</span>
                            </span>
                          }


                        </div>

                        <p className="text-truncate mb-4 mb-md-0">
                          {products.description}
                        </p>
                      </CCol>
                      <CCol
                        md="6"
                        lg="3"
                        className="border-sm-start-none border-start"
                      >
                        <div className="d-flex flex-row align-items-center mb-1">
                          {products && products.type === "FURNITURE" &&
                            <h4>{products.basePrice} zł</h4>
                          }
                          {products && products.type === "CONSTANT" &&
                            <h4>{products.pricePerPiece} zł</h4>
                          }
                          {products && products.type === "LIQUID" &&
                            <h4>{products.pricePerLiter} zł</h4>
                          }


                        </div>

                        <div className="d-flex flex-column">

                          {products && products.type === "CONSTANT" &&
                            <CButton value={products.id} color="success" disabled={products.quantity <= 0 ? true : false}
                                     onClick={e => {
                                       swal({
                                         title: "Are you sure?",
                                         text: "Confirmation means add to order",
                                         icon: "warning",
                                         buttons: true,
                                         dangerMode: true,
                                       })
                                         .then((willPost) => {
                                           if (willPost) {
                                             onSubmitConstant(products)
                                             doChange(e.target.value, "CONSTANT", "minus", 1)
                                             swal("Constant has been added", {
                                               icon: "success",
                                             });
                                             ;
                                             ;
                                           }
                                         });
                                     }}
                            >
                              Add to Order
                            </CButton>
                          }
                          {products && products.type === "LIQUID" &&
                            <CButton value={products.id} color="success" disabled={products.quantity <= 0 ? true : false}
                                     onClick={e => {
                                       swal({
                                         title: "Are you sure?",
                                         text: "Confirmation means add to order",
                                         icon: "warning",
                                         buttons: true,
                                         dangerMode: true,
                                       })
                                         .then((willPost) => {
                                           if (willPost) {
                                             onSubmitLiquid(products)
                                             doChange(e.target.value, "LIQUID", "minus", 1)
                                             swal("Liquid has been added", {
                                               icon: "success",
                                             });
                                             ;
                                             ;
                                           }
                                         });
                                     }}
                            >
                              Add to Cart
                            </CButton>
                          }
                          {products && products.type === "FURNITURE" &&
                            <CButton value={products.id} color="success"
                                     onClick={e => {
                                       swal({
                                         title: "Are you sure?",
                                         text: "Confirmation means add to order",
                                         icon: "warning",
                                         buttons: true,
                                         dangerMode: true,
                                       })
                                         .then((willPost) => {
                                           if (willPost) {
                                             onSubmitFurniture(products)
                                           }
                                         });
                                     }}
                            >
                              Add to Assignment
                            </CButton>
                          }
                        </div>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>

              )}
          })}
        </CCol>
      </CRow>
    </CContainer>
  );
}

export default NewOrder
