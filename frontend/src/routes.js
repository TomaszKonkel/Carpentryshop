import React from 'react'

const Dashboard = React.lazy(() => import('./views/Dashboard'))
const NewOrder = React.lazy(() => import('./views/NewOrder'))
const ProductList = React.lazy(() => import('./views/ProductList.js'))
const ProjectDetail = React.lazy(() => import('./views/ProjectDetail'))
const ConstantDetail = React.lazy(() => import('./views/ConstantDetail'))
const LiquidDetail = React.lazy(() => import('./views/LiquidDetail'))
const JobList = React.lazy(() => import('./views/JobList'))
const JobDetail = React.lazy(() => import('./views/JobDetail'))
const CreateProjects = React.lazy(() => import('./views/CreateProjects'))
const CreateConstant = React.lazy(() => import('./views/CreateConstant'))
const CreateLiquid = React.lazy(() => import('./views/CreateLiquid'))
const Order = React.lazy(() => import('./views/Order'))
const Delivery = React.lazy(() => import('./views/Delivery'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/Dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/ProductList', name: 'ProductList', element: ProductList },
  { path: '/NewOrder', name: 'NewOrder', element: NewOrder },
  { path: '/ProjectDetail', name: 'ProjectDetail', element: ProjectDetail },
  { path: '/CreateConstant', name: 'CreateConstant', element: CreateConstant },
  { path: '/LiquidDetail', name: 'LiquidDetail', element: LiquidDetail },
  { path: '/JobList', name: 'JobList', element: JobList },
  { path: '/JobDetail', name: 'JobDetail', element: JobDetail },
  { path: '/CreateProjects', name: 'CreateProjects', element: CreateProjects },
  { path: '/ConstantDetail', name: 'ConstantDetail', element: ConstantDetail },
  { path: '/CreateLiquid', name: 'CreateLiquid', element: CreateLiquid },
  { path: '/Order', name: 'Order', element: Order },
  { path: '/Delivery', name: 'Delivery', element: Delivery },
]

export default routes
