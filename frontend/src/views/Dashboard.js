import React, {useEffect, useState} from 'react'

import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cilCloudDownload,
  cilX, cilCheckAlt,
} from '@coreui/icons'



import CountAll from './CountAll'

const Dashboard = () => {

  const [assigmentTotal, setAssigmentTotal] = useState(null);
  const [cartTotal, setCartTotal] = useState(null);
  const [itemCart, setItemCart] = useState(null);
  const [itemAssigment, setItemAssigment] = useState(null);
  const [today, setToday] = useState(new Date());
  const [lastTenDays, setLastTenDays] = useState(new Date());
  const [sumTotalAssigment, setTotalAssigment] = useState(0)
  const [sumTotalCart, setTotalCart] = useState(0)


  useEffect(() => {
   setInterval(() => {
     setToday(new Date())
     setLastTenDays(new Date())
  }, 3600000)
  });

  useEffect(() => {

    const sumTotalAssigment = assigmentTotal && assigmentTotal.reduce((sum, assigmentTotal) => {
      if(assigmentTotal.creationDate == today.toLocaleDateString("en-CA")){
        sum += assigmentTotal.totalPrice;
      }
      return sum;
    }, 0)
    setTotalAssigment(sumTotalAssigment)

    const sumTotalCart = cartTotal && cartTotal.reduce((sum, cartTotal) => {
      if(cartTotal.creationDate == today.toLocaleDateString("en-CA")){
        sum += cartTotal.totalPrice;
      }
      return sum;
    }, 0)
    setTotalCart(sumTotalCart)
  });

  useEffect(() => {
    fetchedAssigmentTotal();
  }, []);



  async function fetchedAssigmentTotal() {
    try {
      const response = await fetch("http://localhost:8080/api/assigment/allAssigment", {
        method: "GET", headers: {
          'Accept': 'application/json', "Content-Type": "application/json",
        }, redirect: "follow",
      });
      let fetchedAssigmentTotal = await response.json();
      JSON.parse(JSON.stringify(fetchedAssigmentTotal))
      setAssigmentTotal(fetchedAssigmentTotal)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchedItemAssigment();
  }, []);



  async function fetchedItemAssigment() {
    try {
      const response = await fetch("http://localhost:8080/api/itemA/allAssigment", {
        method: "GET", headers: {
          'Accept': 'application/json', "Content-Type": "application/json",
        }, redirect: "follow",
      });
      let fetchedItemAssigment = await response.json();
      JSON.parse(JSON.stringify(fetchedItemAssigment))
      setItemAssigment(fetchedItemAssigment)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchedCartTotal();
  }, []);



  async function fetchedCartTotal() {
    try {
      const response = await fetch("http://localhost:8080/api/items/allItems", {
        method: "GET", headers: {
          'Accept': 'application/json', "Content-Type": "application/json",
        }, redirect: "follow",
      });
      let fetchedCartTotal = await response.json();
      JSON.parse(JSON.stringify(fetchedCartTotal))
      setCartTotal(fetchedCartTotal)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchedItemCart();
  }, []);



  async function fetchedItemCart() {
    try {
      const response = await fetch("http://localhost:8080/api/item/allCart", {
        method: "GET", headers: {
          'Accept': 'application/json', "Content-Type": "application/json",
        }, redirect: "follow",
      });
      let fetchedItemCart = await response.json();
      JSON.parse(JSON.stringify(fetchedItemCart))
      setItemCart(fetchedItemCart)
    } catch (err) {
      console.log(err);
    }
  }

  lastTenDays.setDate(lastTenDays.getDate() - 10)

  let tenProducts = [];
  let tenProjects = [];
  let tenAll = [];

  for (let i=0; i<10; i++){
    const objCart = {
      data: lastTenDays.toLocaleDateString("en-CA"),
      total: 0
    };
    const objAssigment = {
      data: lastTenDays.toLocaleDateString("en-CA"),
      total: 0
    };
    const objAll = {
      data: lastTenDays.toLocaleDateString("en-CA"),
      total: 0
    };

    tenProducts.push(objCart)
    tenProjects.push(objAssigment)
    tenAll.push(objAll)

    cartTotal && cartTotal.forEach(x => {
      if(tenProducts[i].data == x.creationDate) {
        if (tenProducts[i].total > 0){
          tenProducts[i].total += x.totalPrice
          tenAll[i].total += x.totalPrice
        }
        else {
          tenProducts[i].total = x.totalPrice
          tenAll[i].total += x.totalPrice
        }
      }
    })

    assigmentTotal && assigmentTotal.forEach(x => {
      if(tenProjects[i].data == x.creationDate) {
        if (tenProjects[i].total > 0){
          tenProjects[i].total += x.totalPrice
          tenAll[i].total += x.totalPrice
        }
        else {
          tenProjects[i].total = x.totalPrice
          tenAll[i].total += x.totalPrice
        }
      }
    })

    lastTenDays.setDate(lastTenDays.getDate() + 1)
  }



  let countCart = []
  let countAssigment = []

  itemCart && itemCart.forEach(function(a) {
    if(a.elementConstant != null) {
    if (!this[a.elementConstant.name]) {
      this[a.elementConstant.name] = {
        name: a.elementConstant.name,
        count: 0
      };
      countCart.push(this[a.elementConstant.name]);
    }
    this[a.elementConstant.name].count += a.quantityItems;
  }
    if(a.elementLiquid != null) {
      if (!this[a.elementLiquid.name]) {
        this[a.elementLiquid.name] = {
          name: a.elementLiquid.name,
          count: 0
        };
        countCart.push(this[a.elementLiquid.name]);
      }
      this[a.elementLiquid.name].count += a.quantityItems;
    }
    }, Object.create(null));

  itemAssigment && itemAssigment.forEach(function(a) {

      if (!this[a.project.name]) {
        this[a.project.name] = {
          name: a.project.name,
          count: 0
        };
        countAssigment.push(this[a.project.name]);
      }
      this[a.project.name].count += a.quantityItemAssigment;


  }, Object.create(null));



  let countTop5 = [];
  for (let i=0; i<5; i++){
    const obj = {
      name: '',
      count: 0
    }

    countTop5.push(obj)

    if(countTop5.length == 1) {
      countCart && countCart.forEach((x) => {
          if(x.count >= countTop5[i].count){
            countTop5[i].name = x.name
            countTop5[i].count = x.count
          }
      })

      countAssigment && countAssigment.forEach((y) => {
        if(y.count >= countTop5[i].count){
          countTop5[i].name = y.name
          countTop5[i].count = y.count
        }
      })
    }

    if(countTop5.length > 1){
      countCart && countCart.forEach((x) => {
        const found = countTop5.find(el => el.name == x.name && el.count == x.count)
        if(x.count >= countTop5[i].count && found == undefined ){
          countTop5[i].name = x.name
          countTop5[i].count = x.count
        }
      })

      countAssigment && countAssigment.forEach((y) => {
        const found = countTop5.find(el => el.name == y.name && el.count == y.count)
        if(y.count >= countTop5[i].count && found == undefined ){
          countTop5[i].name = y.name
          countTop5[i].count = y.count
        }
      })
    }
  }
  const sumTotal = tenAll && tenAll.reduce((sum, tenAll) => {

      sum += tenAll.total;

    return sum;
  }, 0)

  console.log(countTop5)








  return (
    <>
      <CountAll />
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Earnings Today
              </h4>
              <div className="small text-medium-emphasis">{sumTotalAssigment + sumTotalCart} zł</div>
            </CCol>

          </CRow>
          <CChartLine
            style={{ height: '300px', marginTop: '40px' }}
            data={{
              labels: tenProducts && tenProducts.map((x) => x.data),
              datasets: [
                {
                  label: 'Products ',
                  backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
                  borderColor: getStyle('--cui-info'),
                  pointHoverBackgroundColor: getStyle('--cui-info'),
                  borderWidth: 2,
                  data: tenProducts && tenProducts.map((x) => x.total),
                  fill: true,
                },
                {
                  label: 'Projects',
                  backgroundColor: 'transparent',
                  borderColor: getStyle('--cui-success'),
                  pointHoverBackgroundColor: getStyle('--cui-success'),
                  borderWidth: 4,
                  data: tenProjects && tenProjects.map((x) => x.total),
                },
                {
                  label: 'All Earn',
                  backgroundColor: 'transparent',
                  borderColor: getStyle('--cui-danger'),
                  pointHoverBackgroundColor: getStyle('--cui-danger'),
                  borderWidth: 1,
                  borderDash: [8, 5],
                  data: tenAll && tenAll.map((x) => x.total),
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: true,
                },
              },
              scales: {
                x: {
                  grid: {
                    drawOnChartArea: false,
                  },
                },
                y: {
                  ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(250 / 5),
                    max: 250,
                  },
                },
              },
              elements: {
                line: {
                  tension: 0.4,
                },
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3,
                },
              },
            }}
          />
        </CCardBody>
        <CCardFooter>
          <CRow  className="text-center">

            <CCol className="mb-sm-2 mb-0" >
              <div className="text-medium-emphasis">Money Earn Progress</div>
              <strong>
                {sumTotal} zł earn ({Math.ceil(sumTotal/50000 * 100)}%)
              </strong>
              <CProgress thin className="mt-2"  value={Math.ceil(sumTotal/50000 * 100)} />
            </CCol>

          </CRow>
        </CCardFooter>
      </CCard>



      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Best Selling Products</CCardHeader>
            <CCardBody>
              <CRow>


                <CCol >
                  <CRow>
                    <CCol >
                      <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Sell Goal</div>
                        <div className="fs-5 fw-semibold">1500</div>
                      </div>
                    </CCol>
                    <CCol>
                      <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Up To Goal</div>
                        <div className="fs-5 fw-semibold">{(countTop5[0].count - 1500) * (-1)}</div>
                      </div>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />



                  <div className="mb-5"></div>

                  {countTop5.map((item, index) => (
                    <div className="progress-group" >
                      <div className="progress-group-header">
                        {((item.count / 1500) * 100) >= 100 &&
                          <CIcon className="me-2" icon={cilCheckAlt} size="lg"/>
                        }
                        {((item.count / 1500) * 100) < 100 &&
                          <CIcon className="me-2" icon={cilX} size="lg"/>
                        }
                        <span>{item.name}</span>
                        <span className="ms-auto fw-semibold">
                          {item.count}{' '}
                          <span className="text-medium-emphasis small">({Math.ceil((item.count / 1500) * 100)}%)</span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        {((item.count / 1500) * 100) >= 100 &&
                          <CProgress thin color="success" value={Math.ceil((item.count / 1500) * 100)} />
                        }
                        {((item.count / 1500) * 100) < 100 &&
                          <CProgress thin color="danger" value={Math.ceil((item.count / 1500) * 100)} />
                        }
                      </div>
                    </div>
                  ))}
                </CCol>
              </CRow>

              <br />


            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
