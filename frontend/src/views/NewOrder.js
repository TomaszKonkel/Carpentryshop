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

    postData("http://localhost:8080/api/cart/add", {
      elementConstant: ElementConst
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

    postData("http://localhost:8080/api/cart/addLiquid", {
      elementLiquid: ElementLiquid
    });

  };

  const onSubmitFurniture = (Furniture) => {
    const {
      id = products.id,
      description = products.description,
      name = products.name,
      furnitureCategory = products.furnitureCategory,
      basePrice = products.basePrice,
      weight = products.weight,
    } = Furniture;

    postData("http://localhost:8080/api/assigment/add", {
      furniture: Furniture
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

  //Function which call function of updating quantity number
  const doChangeC = (index, elementConstant) => {
    const {
      id = products.id,
      description = products.description,
      name = products.name,
      constantCategory = products.constantCategory,
      pricePerPiece = products.pricePerPiece,
      lengthInCm = products.lengthInCm,
      widthInCm = products.widthInCm,
      quantity = products.quantity
    } = elementConstant
    updateData(`http://localhost:8080/api/constant/details/update/constant/${index}`, {
      id: id,
      name: name,
      constantCategory: constantCategory,
      pricePerPiece: pricePerPiece,
      lengthInCm: lengthInCm,
      widthInCm: widthInCm,
      description: description,
      quantity: quantity - 1
    });

  };

  const doChangeL = (index, elementLiquid) => {
    const {
      id= products.elementLiquid.id,
      name= products.elementLiquid.name,
      capacity= products.elementLiquid.capacity,
      pricePerLiter= products.elementLiquid.pricePerLiter,
      liquidCategory= products.elementLiquid.liquidCategory,
      description= products.elementLiquid.description,
      quantity= products.elementLiquid.quantity
    } = elementLiquid
    updateData(`http://localhost:8080/api/liquid/details/update/liquid/${index}`, {
      id: id,
      name: name,
      liquidCategory: liquidCategory,
      pricePerLiter: pricePerLiter,
      capacity: capacity,
      description: description,
      quantity: quantity -1
    });

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
            <CFormInput placeholder="Wyszukaj produkt"
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
                            <h4>{products.pricePerLiter} zł/ </h4>
                          }


                        </div>
                        <div>
                          <p></p>

                        </div>
                        <h6 className="text-success text-center">Dodatkowe opcje</h6>
                        <div className="d-flex flex-column mt-4">

                          {products && products.type === "CONSTANT" &&
                            <CButton value={products.id} color="success" disabled={products.quantity <= 0 ? true : false}
                                     onClick={e => {
                                       swal({
                                         title: "Jesteś pewien?",
                                         text: "Potwierdzenie oznacza usunięcie klienta",
                                         icon: "warning",
                                         buttons: true,
                                         dangerMode: true,
                                       })
                                         .then((willPost) => {
                                           if (willPost) {
                                             onSubmitConstant(products)
                                             doChangeC(e.target.value, products)
                                             swal("Unit has been deleted", {
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
                          {products && products.type === "LIQUID" &&
                            <CButton value={products.id} color="success" disabled={products.quantity <= 0 ? true : false}
                                     onClick={e => {
                                       swal({
                                         title: "Jesteś pewien?",
                                         text: "Potwierdzenie oznacza usunięcie klienta",
                                         icon: "warning",
                                         buttons: true,
                                         dangerMode: true,
                                       })
                                         .then((willPost) => {
                                           if (willPost) {
                                             onSubmitLiquid(products)
                                             doChangeL(e.target.value, products)
                                             swal("Unit has been deleted", {
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
                                         title: "Jesteś pewien?",
                                         text: "Potwierdzenie oznacza usunięcie klienta",
                                         icon: "warning",
                                         buttons: true,
                                         dangerMode: true,
                                       })
                                         .then((willPost) => {
                                           if (willPost) {
                                             onSubmitFurniture(products)
                                             swal("Unit has been deleted", {
                                               icon: "success",
                                             });
                                             ;
                                             ;
                                           }
                                         });
                                     }}
                            >
                              Add to Assigment
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
