import React, {useEffect, useState} from 'react'
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import {cilArrowBottom, cilArrowTop, cilMinus, cilOptions} from '@coreui/icons'

const CountAll = () => {
    const [cart, setCart] = useState(null);
    const [assigment, setAssigment] = useState(null);
    const [today, setToday] = useState(new Date());
    const [lastFiveDays, setLastFiveDays] = useState(new Date());
    const [sumTotalProduct, setTotalProduct] = useState(0);
    const [sumTotalProjects, setTotalProjects] = useState(0);


  useEffect(() => {
    setInterval(() => {
      setToday(new Date())
      setLastFiveDays(new Date())
    }, 3600000)
  });

  useEffect(() => {


    const sumProduct = cart && cart.reduce((sum, cart) => {
      if(cart.data == today.toLocaleDateString("en-CA")){
        sum += cart.quantityItems
      }
      return sum;
    }, 0)

    setTotalProduct(sumProduct)
    const sumProjects = assigment && assigment.reduce((sum, assigment) => {
      if(assigment.data == today.toLocaleDateString("en-CA")){
        sum += assigment.quantityItemAssigment
      }
      return sum;
    }, 0)
    setTotalProjects(sumProjects)
  });



  useEffect(() => {
    fetchedAssigment();
  }, []);



  async function fetchedAssigment() {
    try {
      const response = await fetch("http://localhost:8080/api/itemA/allAssigment", {
        method: "GET", headers: {
          'Accept': 'application/json', "Content-Type": "application/json",
        }, redirect: "follow",
      });
      let fetchedAssigment = await response.json();
      JSON.parse(JSON.stringify(fetchedAssigment))
      setAssigment(fetchedAssigment)
    } catch (err) {
      console.log(err);
    }
  }


  useEffect(() => {
    fetchedCart();
  }, []);



  async function fetchedCart() {
    try {
      const response = await fetch("http://localhost:8080/api/item/allCart", {
        method: "GET", headers: {
          'Accept': 'application/json', "Content-Type": "application/json",
        }, redirect: "follow",
      });
      let fetchedCart = await response.json();
      JSON.parse(JSON.stringify(fetchedCart))
      setCart(fetchedCart)
    } catch (err) {
      console.log(err);
    }
  }



  lastFiveDays.setDate(lastFiveDays.getDate() - 5)


  let fiveProducts = [];
  let fiveProjects = [];
  let fiveAll = [];

  for (let i=0; i<5; i++){
    const objProducts = {
      data: lastFiveDays.toLocaleDateString("en-CA"),
      quantity: 0
    };
    const objProjects = {
      data: lastFiveDays.toLocaleDateString("en-CA"),
      quantity: 0
    };
    const objAll = {
      data: lastFiveDays.toLocaleDateString("en-CA"),
      quantity: 0
    };

    fiveProducts.push(objProducts)
    fiveProjects.push(objProjects)
    fiveAll.push(objAll)

    cart && cart.forEach(x => {
      if(fiveProducts[i].data == x.data) {
        if (fiveProducts[i].quantity > 0){
          fiveProducts[i].quantity += x.quantityItems
          fiveAll[i].quantity += x.quantityItems
        }
        else {
          fiveProducts[i].quantity = x.quantityItems
          fiveAll[i].quantity += x.quantityItems
        }
      }
    })

    assigment && assigment.forEach(x => {
      if(fiveProjects[i].data == x.data) {
        if (fiveProjects[i].quantity > 0){
          fiveProjects[i].quantity += x.quantityItemAssigment
          fiveAll[i].quantity += x.quantityItemAssigment
        }
        else {
          fiveProjects[i].quantity = x.quantityItemAssigment
          fiveAll[i].quantity += x.quantityItemAssigment
        }
      }
    })

    lastFiveDays.setDate(lastFiveDays.getDate() + 1)
  }





  let diffProduct = (sumTotalProduct - fiveProducts[fiveProducts.length - 1].quantity)
  var percentProducts = Math.round( (diffProduct / fiveProducts[fiveProducts.length - 1].quantity) * 100)

  if(percentProducts == Infinity){
    percentProducts = sumTotalProduct * 100;
  }


  let diffProjects = (sumTotalProjects - fiveProjects[fiveProjects.length - 1].quantity)
  var percentProjects = Math.round( (diffProjects / fiveProjects[fiveProjects.length - 1].quantity) * 100)

  if(percentProjects == Infinity){
    percentProjects = sumTotalProjects * 100;
  }

  let diffAll = ((sumTotalProjects + sumTotalProduct) - fiveAll[fiveAll.length - 1].quantity)
  var percentAll = Math.round( (diffAll / fiveAll[fiveAll.length - 1].quantity) * 100)

  if(percentAll == Infinity){
    percentAll = (sumTotalProjects + sumTotalProduct) * 100;
  }




  return (
    <CRow>
      <CCol sm={6} lg={4}>
        <CWidgetStatsA
          className="mb-4"
          color="primary"
          value={
            <>
              {sumTotalProduct}{' '}
              <span className="fs-6 fw-normal">
                  ({percentProducts}%
                      {percentProducts < 0 &&
                        <CIcon icon={cilArrowBottom} />
                      }
                      {percentProducts > 0 &&
                        <CIcon icon={cilArrowTop} />
                      }
                      {percentProducts == 0 &&
                        <CIcon icon={cilMinus} />
                      }
                  )
              </span>
            </>
          }
          title="Products"

          chart={
            <CChartLine
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: fiveProducts && fiveProducts.map((x) => x.data),
                datasets: [
                  {
                    label: 'Products',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-primary'),
                    data: fiveProducts && fiveProducts.map((x) => x.quantity),
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                    tension: 0.4,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
      <CCol sm={6} lg={4}>
          <CWidgetStatsA
            className="mb-4"
            color="info"
            value={
              <>
                {sumTotalProjects}{' '}
                <span className="fs-6 fw-normal">
                ({percentProjects}%
                  {percentProjects < 0 &&
                    <CIcon icon={cilArrowBottom} />
                  }
                  {percentProjects > 0 &&
                    <CIcon icon={cilArrowTop} />
                  }
                  {percentProjects == 0 &&
                    <CIcon icon={cilMinus} />
                  }
                  )
              </span>
              </>
            }
            title="Projects"
            chart={
              <CChartLine
                className="mt-3 mx-3"
                style={{ height: '70px' }}
                data={{
                  labels: fiveProjects && fiveProjects.map((x) => x.data),
                  datasets: [
                    {
                      label: 'Projects',
                      backgroundColor: 'transparent',
                      borderColor: 'rgba(255,255,255,.55)',
                      pointBackgroundColor: getStyle('--cui-info'),
                      data: fiveProjects && fiveProjects.map((x) => x.quantity),
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      grid: {
                        display: false,
                        drawBorder: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                    y: {
                      display: false,
                      grid: {
                        display: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                  },
                  elements: {
                    line: {
                      borderWidth: 1,
                    },
                    point: {
                      radius: 4,
                      hitRadius: 10,
                      hoverRadius: 4,
                    },
                  },
                }}
              />
            }
          />

      </CCol>
      <CCol sm={6} lg={4}>
        <CWidgetStatsA
          className="mb-4"
          color="warning"
          value={
            <>
              {sumTotalProduct + sumTotalProjects}{' '}
              <span className="fs-6 fw-normal">
                ({percentAll}%
                {percentAll < 0 &&
                  <CIcon icon={cilArrowBottom} />
                }
                {percentAll > 0 &&
                  <CIcon icon={cilArrowTop} />
                }
                {percentAll == 0 &&
                  <CIcon icon={cilMinus} />
                }
                )
              </span>
            </>
          }
          title="All Sells"

          chart={
            <CChartLine
              className="mt-3"
              style={{ height: '70px' }}
              data={{
                labels: fiveAll && fiveAll.map((x) => x.data),
                datasets: [
                  {
                    label: 'All Sells',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: fiveAll && fiveAll.map((x) => x.quantity),
                    fill: true,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    display: false,
                  },
                  y: {
                    display: false,
                  },
                },
                elements: {
                  line: {
                    borderWidth: 2,
                    tension: 0.4,
                  },
                  point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>

    </CRow>
  )
}

export default CountAll
