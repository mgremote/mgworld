import React from 'react'
import { NavLink as Link } from 'react-router-dom'
import {
  Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink
} from 'reactstrap'
import { getContext, getUser } from '../context'

const LOGOUT_URL = `${getContext()}/logout`

export default class _Nav extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isOpen: false }
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render () {
    const user = getUser() || {}
    const { isOpen } = this.state
    return (
      <Navbar color='faded' light expand='md'>
        <NavbarBrand to='/' tag={Link}>Home</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='ml-auto' navbar>
            <NavItem>
              <Link
                activeClassName='active'
                className='nav-link'
                exact
                to='/'
              >
                Home
              </Link>
            </NavItem>
            <NavItem>
              <Link
                activeClassName='active'
                className='nav-link'
                to='/about'
              >
                About
              </Link>
            </NavItem>
            <NavItem>
              <NavLink href={LOGOUT_URL}>
                Logout
                {user.name}
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}
