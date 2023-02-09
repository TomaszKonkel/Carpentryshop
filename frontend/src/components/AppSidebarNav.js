import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

export const AppSidebarNav = ({ items }) => {
  const location = useLocation()
  const navLink = (name, icon) => {
    return (
      <>
        {icon && icon}
        {name && name}
      </>
    )
  }

  const navItem = (item) => {
    const { component, name, icon, ...rest } = item
    const Component = component
    return (
      <Component
        {...(rest.to &&
          !rest.items && {
            component: NavLink,
          })}

        {...rest}
      >
        {navLink(name, icon)}
      </Component>
    )
  }
  const navGroup = (item) => {
    const { component, name, icon, to, ...rest } = item
    const Component = component
    return (
      <Component
        toggler={navLink(name, icon)}
        visible={location.pathname.startsWith(to)}
        {...rest}
      >
        {item.items?.map((item) =>
          item.items ? navGroup(item) : navItem(item),
        )}
      </Component>
    )
  }

  return (
    <React.Fragment>
      {items &&
        items.map((item) => (item.items ? navGroup(item) : navItem(item)))}
    </React.Fragment>
  )
}

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
}
