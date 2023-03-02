import React, { useState, useEffect } from "react";
import { Container, Button, Row, Form, Col, Card  } from "react-bootstrap";
import swal from "sweetalert";



const Popovers = () => {

  const [err, setError] = useState(false);
  const [rate, setRate] = useState();
  const [message, setMessage] = useState("");
  const [currency, setCurrency] = useState();
  const [from, setFrom] = useState("XXX");
  const [to, setTo] = useState("XXX");
  const [date, setDate] = useState(new Date().toLocaleDateString("en-CA"));



  useEffect(() => {
    fetchedRate()

  }, []);

  async function fetchedRate() {
      try {
        const response = await fetch(
          `http://localhost:8080/api/project/exchange?currencyFrom=${from}&currencyTo=${to}&date=${date}`,
          {
            method: "GET",
            headers: {
              'Accept': 'application/json',
              "Content-Type": "application/json",
            },
            redirect: "follow",
          }
        );
        let fetchedRate = await response.json();
        JSON.parse(JSON.stringify(fetchedRate))
        setRate(fetchedRate)
      } catch (err) {
        console.log(err);
        setError(err);
      }
  }

  useEffect(() => {
    check()

  }, []);

  async function check() {
    try {
      const response = await fetch(
        `http://localhost:8080/api/project/check?currencyFrom=${from}&currencyTo=${to}&date=${date}`,
        {
          method: "GET",
          headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
          },
          redirect: "follow",
        }
      );
      let check = await response.text();
      setMessage(check)
      console.log(message)

      if(message && message !== "Good"){
        swal({ text: message, icon: "warning" });
      }

    } catch (err) {
      console.log(err);
      setError(err);
    }
  }


  useEffect(() => {
    fetchedCurrency();
  }, []);

  async function fetchedCurrency() {
    try {
      const response = await fetch(
        `http://localhost:8080/api/project/from`,
        {
          method: "GET",
          headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
          },
          redirect: "follow",
        }
      );
      let fetchedCurrency = await response.json();
      JSON.parse(JSON.stringify(fetchedCurrency))
      setCurrency(fetchedCurrency)
    } catch (err) {
      console.log(err);
      setError(err);
    }
  }




  return (
    <Container className="d-flex justify-content-center align-items-center" >

      <Col>
        <div>
          <h1 style={{textAlign: "center"}}>Exchange rate</h1>
        </div>

        <Container>
          <Card className="shadow-lg border rounded-3 mt-5 mb-3">
            <Card.Body>
              <Row>

                <Col md="4">
                  <h6>Choose first currency</h6>
                  <div className="mt-1 mb-0 text-muted small">
                    <Form.Select id="from" size="sm" onChange={e =>{
                      setFrom(e.target.value)
                    }}>
                      <option value= "0" >Choose currency...</option>

                      {currency && currency.map((currency) => {
                          return (
                            <option value={currency}>{currency}</option>
                          )})}


                    </Form.Select>
                  </div>
                </Col>
                <Col md="4">
                  <h6>Chosse second currency</h6>
                  <div className="mt-1 mb-0 text-muted small">
                    <Form.Select  id="to" size="sm" onChange={e =>{
                      setTo(e.target.value)

                    }}>
                      <option value= "0" >Choose currency...</option>

                      {currency && currency.map((currency) => {
                        return (
                          <option value={currency}>{currency}</option>
                        )})}


                    </Form.Select>
                  </div>
                </Col>
                <Col md="4">
                  <h6>Choose date</h6>
                  <div className="mt-1 mb-0 text-muted small">
                    <Form.Control
                      type="date"
                      name="duedate"
                      placeholder="Due date"
                      id="date"
                      onSelect={e =>{
                      setDate(e.target.value)
                    }}
                    />
                  </div>
                </Col>
                <Row>
                  <Col className="flex-column mt-4 ">
                    <p>Rate for this parameters is: {rate}</p>
                  </Col>
                </Row>

                <Col className="d-flex flex-column mt-4">
                  <Button onClick={() => {
                        fetchedRate()
                        check()
                  }}>Add</Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>


        <Button onClick={() => {
          fetchedRate()
        }}>Zmień</Button>

      </Col>


    </Container>

  )
}

export default React.memo(Popovers)
