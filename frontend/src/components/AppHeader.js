import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {cilCart, cilList, cilMenu} from '@coreui/icons'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>

        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/Dashboard" component={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
          <CNavItem>
            <CNavLink to="/Order" component={NavLink}>
                <CIcon icon={cilCart} size="lg" style={{color: "red"}} />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/JobList" component={NavLink}>
              <CIcon icon={cilList} size="lg" />
            </CNavLink>
          </CNavItem>
        </CHeaderNav>

      </CContainer>

    </CHeader>
  )
}

export default AppHeader
