import React, {useEffect, useState} from "react";
import axios from "axios";
import swal from "sweetalert";
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CFormTextarea,
} from '@coreui/react'



const CreateLiquid = () => {
    const [loading, setLoading]=useState(true);
    const [fetchLoading, setFetchLoading] = useState(false);
    const [category, setCategory] = useState(null);
    const [err, setError] = useState(false);

    const [newName, setNewName] = useState("");
    const [newCategoryL, setNewCategoryL] = useState("");
    const [newCapacity, setNewCapacity] = useState("");
    const [newPricePerLiter, setNewPricePerLiter] = useState("");
    const [newQuantity, setNewQuantity] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newImage, setNewImage] = useState("");

    const [validated, setValidated] = useState(false)
    const handleSubmit = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
        }
        else{

          const urlProduct = 'http://localhost:8080/api/liquid/addLiquid'
          const urlPhoto = 'http://localhost:8080/api/products/addPhoto'
          const image = new FormData();
          image.append(`image`, newImage)
          const liquid = {
            name: newName,
            liquidCategory: newCategoryL,
            capacity: newCapacity,
            quantity: newQuantity,
            pricePerLiter: newPricePerLiter,
            description : newDescription,
            productStatus: true
          }


          axios.post(urlProduct, liquid).then((res) => {
            console.log(res)
          })

          axios.put(urlPhoto, image).then((res) => {
            console.log(res)
          })

          swal({
            text: "Product added to list!!",
            icon: "success",
          }).then(function() {
            window.location = "Dashboard";
          });;
        }
      setValidated(true)
      }


    useEffect(() => {
        fetchedCategory();
    }, []);

    async function fetchedCategory() {
        try {
            const response = await fetch(
                "http://localhost:8080/api/liquid/category",
                {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        "Content-Type": "application/json",
                    },
                    redirect: "follow",
                }
            );
            let fetchedCategory = await response.json();
            JSON.parse(JSON.stringify(fetchedCategory))
            setCategory(fetchedCategory)
            // setLoading(false);

        } catch (err) {
            console.log(err);
            setError(err);
        }
    }


  return (
    <CForm
      className="row g-3 needs-validation"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <CCol md={12}>
        <CFormLabel htmlFor="validationCustom01">Name</CFormLabel>
        <CFormInput onChange={
                    event => setNewName(event.target.value)
                    }
                    type="text" id="validationCustom01"
                    style={{ textTransform: 'capatalize'}}  required />
        <CFormFeedback invalid>Please enter a name of product</CFormFeedback>
      </CCol>

      <CCol md={6}>
        <CFormLabel htmlFor="validationCustomUsername">Price per liter</CFormLabel>
        <CInputGroup className="has-validation">
          <CInputGroupText id="inputGroupPrepend">$</CInputGroupText>
          <CFormInput onChange={
                      event => setNewPricePerLiter(event.target.value)
                      }
                      type="number"
                      step="0.01"
                      id="validationCustomUsername"
                      aria-describedby="inputGroupPrepend"
                      required
          />
          <CFormFeedback invalid>Please enter a price of product</CFormFeedback>
        </CInputGroup>
      </CCol>

      <CCol md={6}>
        <CFormLabel htmlFor="validationCustom02">Category</CFormLabel>
        <CFormSelect onChange={
                     event => setNewCategoryL(event.target.value)
                     }
                     id="validationCustom02" required>
                      <option value="Choose...">Wybierz</option>
                          {category && category.map((category) => {
                            return (
                                <option value={category}>{category}</option>
                          )})}
        </CFormSelect>
        <CFormFeedback invalid>Please choose a category</CFormFeedback>
      </CCol>


      <CCol md={6}>
        <CFormLabel htmlFor="validationCustom03">Quantity</CFormLabel>
        <CFormInput onChange={
                    event => setNewQuantity(event.target.value)
                    }
                    type="number" step="1" id="validationCustom03"
                    required />
        <CFormFeedback invalid>Please enter a quantity</CFormFeedback>
      </CCol>

      <CCol md={6}>
        <CFormLabel htmlFor="validationCustom03">Capacity</CFormLabel>
        <CFormInput onChange={
                    event => setNewCapacity(event.target.value)
                    }
                    type="number" step="1" id="validationCustom03"
                    required />
        <CFormFeedback invalid>Please enter a capacity</CFormFeedback>
      </CCol>

      <CCol md={4}>
        <CFormLabel htmlFor="validationCustom03">Image</CFormLabel>
        <CFormInput onChange={
          event => {
            console.log(event.target.files)
            setNewImage(event.target.files[0])
          }

        }
                    type="file"  id="validationCustom03"
                    accept="image/*"
                    name="image"
                    required />
        <CFormFeedback invalid>Please choose a image</CFormFeedback>
      </CCol>


      <CCol md={12}>
        <CFormLabel htmlFor="validationCustom05">Description</CFormLabel>
        <CFormTextarea onChange={
                    event => setNewDescription(event.target.value)
                    }
                    type="text"
                    id="validationCustom05"
                    required/>
        <CFormFeedback invalid>Please enter a description</CFormFeedback>
      </CCol>

      <CCol xs={12}>
        <CButton
        color="primary" type="submit">
          Submit form
        </CButton>
      </CCol>
    </CForm>
  )
}

export default CreateLiquid
