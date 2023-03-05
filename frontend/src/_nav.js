import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilCart,
  cilDescription,
  cilDrop, cilList,
  cilPencil, cilPlus,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/Dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Theme',
  },
  {
    component: CNavItem,
    name: 'Products',
    to: '/ProductList',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'New',
    to: '/NewOrder',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Components',
  },
  {
    component: CNavGroup,
    name: 'Create',
    to: '/base',
    icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Project',
        to: '/CreateProjects',
      },
      {
        component: CNavItem,
        name: 'Constant',
        to: '/CreateConstant',
      },
      {
        component: CNavItem,
        name: 'Liquid',
        to: '/CreateLiquid',
      },

    ],
  },
  {
    component: CNavItem,
    name: 'Order',
    to: '/Order',
    icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Job List',
    to: '/JobList',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Supply',
    to: '/Delivery',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  },



]

export default _nav
