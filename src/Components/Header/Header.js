import { Button, Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../shared/context/auth-context';
import Search from '../Search';
import './Header.css';

function Header() {
  const auth = useContext(AuthContext);
  return (
    <Navbar collapseOnSelect expand='lg' variant='dark' sticky='top'>
      <Container fluid style={{ paddingLeft: 0 }}>
        <Navbar.Brand
          as={Link}
          to='/'
          className='d-flex align-items-center fs-3'
        >
          <img src='/logo.png' width='150' height='auto' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto fs-5'>
            <NavDropdown title='Games' id='collasible-nav-dropdown'>
              <NavDropdown.Item
                as={Link}
                reloadDocument
                to={{
                  pathname: `/platform/1`,
                }}
              >
                PC
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                reloadDocument
                to={{
                  pathname: `/platform/2`,
                }}
              >
                Playstation
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                reloadDocument
                to={{
                  pathname: `/platform/7`,
                }}
              >
                Nintendo
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                reloadDocument
                to={{
                  pathname: `/platform/3`,
                }}
              >
                Xbox
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to={'/Upcoming'}>
              Upcoming
            </Nav.Link>
            <Nav.Link as={Link} to={'/Favorites'}>
              Favourites
            </Nav.Link>
          </Nav>

          <Search />

          {auth.isLoggedIn ? (
            <Button
              variant='light'
              className='fs-6 mt-3 mt-lg-0'
              onClick={auth.logout}
            >
              Logout
            </Button>
          ) : (
            <Button variant='light' className='fs-6' as={Link} to='/login'>
              Sign In
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
