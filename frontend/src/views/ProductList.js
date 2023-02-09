import React, { useEffect, useState} from 'react'
import {CRow, CCol, CCard, CCardBody, CContainer, CCardImage, CButton, CInputGroup, CFormInput} from '@coreui/react'
import { Link } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import CIcon from "@coreui/icons-react";
import {cilSearch} from "@coreui/icons";



const ProductList = () => {
    const [products, setProducts] = useState(null);
    const [err, setError] = useState(false);
    const [search, setSearch] = useState("")


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
                      "dataType": "json"
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

  async function changeStatus(url) {
    try {
      const response = await axios.post(url, {
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

  const statusChange = (id) => {
    changeStatus(
      `http://localhost:8080/api/products/status/${id}`,
    );
  };




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
                      return(
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
                                                <h4>{products.pricePerLiter} zł </h4>
                                                }


                                           </div>
                                            <div>
                                                <p></p>

                                            </div>
                                        <h6 className="text-success text-center">Dodatkowe opcje</h6>
                                        <div className="d-flex flex-column mt-4">
                                            {products && products.type === "FURNITURE" &&
                                            <CButton color="outline-primary"><Link style={{ color: "primary", textDecoration: "none" }} to={`/ProjectDetail?id=${products.id}`}>
                                                Details
                                            </Link></CButton> }
                                            {products && products.type === "CONSTANT" &&
                                            <CButton color="outline-primary"><Link style={{ color: "primary", textDecoration: "none" }} to={`/ConstantDetail?id=${products.id}`}>
                                                Details
                                            </Link></CButton> }
                                            {products && products.type === "LIQUID" &&
                                            <CButton color="outline-primary"><Link style={{ color: "primary", textDecoration: "none" }} to={`/LiquidDetail?id=${products.id}`}>
                                                Details
                                            </Link></CButton> }
                                        </div>
                                        <div className="d-flex flex-column mt-2">
                                          {products && products.productStatus === true &&

                                            <CButton value={products.id} color="outline-danger"
                                                     onClick={e => {
                                                       console.log(e.target.value);
                                                       swal({
                                                         title: "Are you sure?",
                                                         text: "Confirmation means disabled item",
                                                         icon: "warning",
                                                         buttons: true,
                                                         dangerMode: true,
                                                       })
                                                         .then((willDelete) => {
                                                           if (willDelete) {
                                                             statusChange(e.target.value)
                                                             swal("Item has been disabled", {
                                                               icon: "success",
                                                             }).then(function () {
                                                               window.location.reload();
                                                             });
                                                             ;
                                                             ;
                                                           }
                                                         });
                                                     }}
                                            >
                                              Disabled
                                            </CButton>
                                          }

                                          {products && products.productStatus === false &&

                                            <CButton value={products.id} color="outline-success"
                                                     onClick={e => {
                                                       console.log(e.target.value);
                                                       swal({
                                                         title: "Are you sure?",
                                                         text: "Confirmation means Enabled item",
                                                         icon: "warning",
                                                         buttons: true,
                                                         dangerMode: true,
                                                       })
                                                         .then((willDelete) => {
                                                           if (willDelete) {
                                                             statusChange(e.target.value)
                                                             swal("Item has been enabled", {
                                                               icon: "success",
                                                             }).then(function () {
                                                               window.location.reload();
                                                             });
                                                             ;
                                                             ;
                                                           }
                                                         });
                                                     }}
                                            >
                                              Enabled
                                            </CButton>
                                          }
                                        </div>
                                    </CCol>
                                </CRow>
                            </CCardBody>
                    </CCard>
                    )
                    })}
                    </CCol>
                    </CRow>
                    </CContainer>
  )
}

export default ProductList
