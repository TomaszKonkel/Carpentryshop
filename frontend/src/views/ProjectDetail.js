import React, { useState, useEffect } from "react";
import { Container, Button, Row, Form  } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import swal from "sweetalert";
import {useLocation } from "react-router-dom";


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function FurnitureDetail() {

    let query = useQuery();



    const [products, setProducts] = useState(null);
    const [err, setError] = useState(false);
    const [category, setCategory] = useState(null);

    useEffect(() => {
        fetchedCategory();
    }, []);

    async function fetchedCategory() {
        try {
            const response = await fetch(
                "http://localhost:8080/api/furniture/category",
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




    const [newName, setNewName] = useState("");
    const [newCategoryF, setNewCategoryF] = useState("");
    const [newBasePrice, setNewBasePrice] = useState("");
    const [newWeight, setNewWeight] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newImage, setNewImage] = useState("");

  useEffect(() => {
    fetchedProducts();
  }, []);

    async function fetchedProducts() {
        try {
            const response = await fetch(
                `http://localhost:8080/api/products/details/${query.get("id")}`,
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


            setNewName(fetchedProducts.name)
            setNewCategoryF(fetchedProducts.furnitureCategory)
            setNewBasePrice(fetchedProducts.basePrice)
            setNewWeight(fetchedProducts.weight)
            setNewDescription(fetchedProducts.description)
            setNewImage(fetchedProducts.photos)


        } catch (error) {
            setError(error);
            console.log(err);
        }
    }


    ////////////////////



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
                    text: "Project is updated!",
                    icon: "success",
                }).then(function() {
                    window.location = "/";
                });;

            }
        } catch (error) {
            if (error) {
                swal({ text: "Something goes wrong!!!", icon: "warning" });
                console.log("2"+error)
            }
        }
    }

    const onSubmit = (productData) => {
        const {
            name = newName ,
            description = newDescription,
            furnitureCategory = newCategoryF,
            basePrice= newBasePrice,
            weight = newWeight
        } = productData;
      updateData(`http://localhost:8080/api/project/details/update/project/${query.get("id")}`, {
            id: query.get("id"),
            name: name,
            furnitureCategory: furnitureCategory,
            basePrice: basePrice,
            weight: weight,
            description : description
        });
    };

console.log(newImage)
    return (
        <Container fluid>
            <Row className="d-flex justify-content-center align-items-center">
                <Table >
                    <thead>
                    <tr>
                        <th>Pole</th>
                        <th>Value</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Name</td>
                        <Form.Control onChange={
                            event => setNewName(event.target.value)
                        } style={{border:0}} defaultValue={newName} />
                    </tr>
                    <tr>
                        <td>Category</td>
                        <Form.Control as = "select" onChange={
                            event => setNewCategoryF(event.target.value)
                        } style={{border:0}} defaultValue={newCategoryF}>
                            <option value={newCategoryF}>{newCategoryF}</option>
                            {category && category.map((category, index) => {
                                return (
                                    <option value={category}>{category}</option>
                                )})}
                        </Form.Control>
                    </tr>
                    <tr>
                        <td>Base Prize</td>
                        <Form.Control type="number" min="0" onChange={
                            event => setNewBasePrice(event.target.value)
                        } style={{border:0}} defaultValue={newBasePrice}/>
                    </tr>



                    <tr>
                        <td>Description</td>
                        <Form.Control as ="textarea" onChange={
                            event => setNewDescription(event.target.value)
                        } style={{border:0}} defaultValue={newDescription}/>
                    </tr>
                    </tbody>
                </Table>
                <Button onClick={onSubmit}>Zmień</Button>
            </Row>

        </Container>
    );
};
