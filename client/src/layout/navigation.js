import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
  Button
} from 'reactstrap';

const Navigation = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" dark expand="md">
          <Container>
          <NavbarBrand href="/">IHC</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link className='nav-link' to="/">Home</Link>
            </NavItem>
            <NavItem>
                <Link className='nav-link' to="/schedule">Jadwal</Link>
            </NavItem>
            <NavItem>
                <Link className='nav-link' to="/">Bayar</Link>
            </NavItem>
            <NavItem>
                <Link className='nav-link' to="/">Profil</Link>
            </NavItem>
            
          </Nav>
          <span>
                {props.isAuthenticated === true ? (
                    <Button className='btn-sm px-2 py-1 btn-log' onClick={props.logout}>
                        Logout
                    </Button>
                ) : (
                    <Button className='btn-sm px-2 py-1 btn-log' onClick={props.login}>
                        Login
                    </Button>
                )}
          </span>
        </Collapse>
          </Container>
      </Navbar>
    </div>
  );
}

export default Navigation;