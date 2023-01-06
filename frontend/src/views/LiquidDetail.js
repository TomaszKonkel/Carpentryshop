import React, { useState, useEffect } from "react";
import { Container, Button, Row, Form  } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import swal from "sweetalert";
import { useHistory, useLocation } from "react-router-dom";


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function LiquidDetail() {

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

    useEffect(() => {
        fetchedProducts();
    }, []);


    const [newName, setNewName] = useState("");
    const [newCategoryL, setNewCategoryL] = useState("");
    const [newCapacity, setNewCapacity] = useState("");
    const [newPricePerLiter, setNewPricePerLiter] = useState("");
    const [newQuantity, setNewQuantity] = useState("");
    const [newDescription, setNewDescription] = useState("");

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
            setNewCategoryL(fetchedProducts.liquidCategory)
            setNewCapacity(fetchedProducts.capacity)
            setNewPricePerLiter(fetchedProducts.pricePerLiter)
            setNewQuantity(fetchedProducts.quantity)
            setNewDescription(fetchedProducts.description)


        } catch (error) {
            setError(error);
            console.log(err);
        }
    }


    ////////////////////



    async function postData(url, data) {

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
                    text: "Product has been added to list!",
                    icon: "success",
                }).then(function() {
                    window.location = "/";
                });;

            }
        } catch (error) {
            if (error) {
                swal({ text: "Błąd przy dodawaniu!!!", icon: "warning" });
                console.log("2"+error)
            }
        }
    }

    const onSubmit = (productData) => {
        const {
            name = newName ,
            description = newDescription,
            liquidCategory = newCategoryL,
            pricePerLiter = newPricePerLiter,
            quantity = newQuantity,
            capacity = newCapacity

        } = productData;
        postData(`http://localhost:8080/api/liquid/details/update/liquid/${query.get("id")}`, {
            id: query.get("id"),
            name: name,
            liquidCategory: liquidCategory,
            capacity: capacity,
            pricePerLiter: pricePerLiter,
            quantity: quantity,
            description : description
        });
        console.log("3"+postData);
    };


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
                            event => setNewCategoryL(event.target.value)
                        } style={{border:0}} defaultValue={newCategoryL}>
                            <option value={newCategoryL}>{newCategoryL}</option>
                            {category && category.map((category) => {
                                return (
                                    <option value={category}>{category}</option>
                                )})}
                        </Form.Control>
                    </tr>
                    <tr>
                        <td>Capacity</td>
                        <Form.Control type="number" min="0" onChange={
                            event => setNewCapacity(event.target.value)
                        } style={{border:0}} defaultValue={newCapacity}/>
                    </tr>
                    <tr>
                        <td>Price</td>
                        <Form.Control type="number" min="0" onChange={
                            event => setNewPricePerLiter(event.target.value)
                        } style={{border:0}} defaultValue={newPricePerLiter}/>
                    </tr>
                    <tr>
                        <td>Quantity</td>
                        <Form.Control type="number" min="0" onChange={
                            event => setNewQuantity(event.target.value)
                        } style={{border:0}} defaultValue={newQuantity}/>
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
