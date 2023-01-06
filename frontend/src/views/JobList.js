import React, {useEffect, useState} from "react";
import {CContainer , CAccordionItem, CAccordion, CAccordionBody, CAccordionHeader} from "@coreui/react";
import {Accordion, Button} from "react-bootstrap";
import { Link } from "react-router-dom";





const JobList = () => {
  const [loading, setLoading] = useState(true);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [toDo, setToDo] = useState(null);
  const [resources, setResources] = useState(null);

  const [err, setError] = useState(false);

  useEffect(() => {
    fetchedToDo();
  }, []);



  async function fetchedToDo() {
    try {
      const response = await fetch("http://localhost:8080/api/assigment/all", {
        method: "GET", headers: {
          'Accept': 'application/json', "Content-Type": "application/json",
        }, redirect: "follow",
      });
      let fetchedToDo = await response.json();
      JSON.parse(JSON.stringify(fetchedToDo))
      setToDo(fetchedToDo)

    } catch (err) {
      console.log(err);
      setError(err);
    }
  }

  useEffect(() => {
    fetchedResources();
  }, []);

  async function fetchedResources() {
    try {
      const response = await fetch(
        `http://localhost:8080/api/resources/all`,
        {
          method: "GET",
          headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
          },
          redirect: "follow",
        }
      );
      let fetchedResources = await response.json();
      JSON.parse(JSON.stringify(fetchedResources))
      setResources(fetchedResources)
      // setLoading(false);
      console.log("elo" + resources);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  }


  return (

    <CContainer>

      {toDo && toDo.map((todo) => {

        return (
          <CContainer  >

            {Object.keys(toDo).length == 0 &&
              <p>Brak zleceń</p>
            }
                {todo.inCart == false &&
                <CAccordion  style={{ margin: 10}} activeItemKey={2}>
                  <CAccordionItem  itemKey={1}>

                    <CAccordionHeader style={{display: "flex"}}>
                      <p>{todo.name}&nbsp;</p>
                      {todo.approved == false &&
                        <p>{" "} - In Progress</p>
                      }
                      {todo.approved == true &&
                        <p >{" "} - Completed</p>
                      }
                    </CAccordionHeader>
                    <CAccordionBody >
                      <div style={{display: "flex"}}>

                        <p><strong>Ordered by:</strong> {todo.customerName} {todo.customerLastName}</p>
                        <p style={{marginLeft: "auto"}}><strong>Date of order:</strong> {todo.creationDate}</p>
                      </div>
                      <div style={{display: "flex"}}>
                        <p style={{marginLeft: "auto"}}><strong>Total :</strong> {todo.totalPrice} zł</p>
                      </div>
                      <hr />
                      {todo.itemAssigment?.map((as) => {

                        return(
                          <div>
                            <div style={{display: "flex"}}>
                              <p>{as.furniture.name} {""} x{as.quantityItemAssigment} = {as.furniture.basePrice * as.quantityItemAssigment} zł</p>
                            </div>

                        {resources && resources.map((re) => {
                          return (
                            <p style={{textAlign: "right"}}>
                              {re.itemAssigment.id == as.id &&

                                <span>
                                  <span>{re.quantityResources}x</span>{" "}
                                  <span>{re.product.name}</span> = {" "}
                                  {re.product.type == "LIQUID" &&
                                    <span>{re.product.pricePerLiter * re.quantityResources} zł</span>
                                  }
                                  {re.product.type == "CONSTANT" &&
                                    <span>{re.product.pricePerPiece * re.quantityResources} zł</span>
                                  }

                                </span>

                              }
                            </p>

                          )

                        })}

                          </div>
                        )})}

                        <div style={{ display: "flex" }}>
                          <Button style={{ marginLeft: "auto" }} ><Link style={{ color: "white", textDecoration: "none" }} to={`/JobDetail?id=${todo.id}`}>Go To</Link></Button>
                        </div>

                    </CAccordionBody>

                  </CAccordionItem>
                </CAccordion>
                }
          </CContainer>

        )})}

    </CContainer >

  )
}

export default JobList
