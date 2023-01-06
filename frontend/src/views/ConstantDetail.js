import React, { useState, useEffect } from "react";
import { Container, Button, Row, Form  } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import swal from "sweetalert";
import { useHistory, useLocation } from "react-router-dom";


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function ConstantDetail() {

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
                "http://localhost:8080/api/constant/category",
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
    const [newCategoryC, setNewCategoryC] = useState("");
    const [newPricePerPiece, setNewPricePerPiece] = useState("");
    const [newQuantity, setNewQuantity] = useState("")
    const [newLengthInCm, setNewLengthInCm] = useState("");
    const [newWidthInCm, setNewWidthInCm] = useState("");
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
            setNewCategoryC(fetchedProducts.constantCategory)
            setNewQuantity(fetchedProducts.quantity)
            setNewPricePerPiece(fetchedProducts.pricePerPiece)
            setNewLengthInCm(fetchedProducts.lengthInCm)
            setNewWidthInCm(fetchedProducts.widthInCm)
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
                    text: "Constant is updated!",
                    icon: "success",
                }).then(function() {
                    window.location = "/";
                });;

            }
        } catch (error) {
            if (error) {
                swal({ text: "Error occurred while updating!!!", icon: "warning" });
                console.log("2"+error)
            }
        }
    }

    const onSubmit = (productData) => {
        const {
            name = newName ,
            description = newDescription,
            constantCategory = newCategoryC,
            quantity = newQuantity,
            pricePerPiece= newPricePerPiece,
            lengthInCm = newLengthInCm,
            widthInCm = newWidthInCm


        } = productData;
        postData(`http://localhost:8080/api/constant/details/update/constant/${query.get("id")}`, {
            id: query.get("id"),
            name: name,
            constantCategory: constantCategory,
            pricePerPiece: pricePerPiece,
            lengthInCm: lengthInCm,
            widthInCm: widthInCm,
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
                        <Form.Control  onChange={
                            event => setNewName(event.target.value)
                        } style={{border:0}} className="border-sm-start-none border-bottom" defaultValue={newName} />
                    </tr>
                    <tr>
                        <td>Category</td>
                        <Form.Control as = "select" onChange={
                            event => setNewCategoryC(event.target.value)
                        } style={{border:0}} defaultValue={newCategoryC}>
                            <option value={newCategoryC}>{newCategoryC}</option>
                            {category && category.map((category) => {
                                return (
                                    <option value={category}>{category}</option>
                                )})}
                        </Form.Control>
                    </tr>
                    <tr>
                        <td>Prize per piece</td>
                        <Form.Control type="number" min="0" onChange={
                            event => setNewPricePerPiece(event.target.value)
                        } style={{border:0}} defaultValue={newPricePerPiece}/>
                    </tr>
                    <tr>
                        <td>Length</td>
                        <Form.Control type="number" min="0" onChange={
                            event => setNewLengthInCm(event.target.value)
                        } style={{border:0}} defaultValue={newLengthInCm}/>
                    </tr>
                    <tr>
                        <td>Width</td>
                        <Form.Control type="number" min="0" onChange={
                            event => setNewWidthInCm(event.target.value)
                        } style={{border:0}} defaultValue={newWidthInCm}/>
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
