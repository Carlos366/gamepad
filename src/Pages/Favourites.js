import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AuthContext } from '../shared/context/auth-context';
import { FaPlaystation } from 'react-icons/fa';
import { FaXbox } from 'react-icons/fa';
import { FaWindows } from 'react-icons/fa';
import { SiNintendoswitch } from 'react-icons/si';
import { toast } from 'react-toastify';

function Favourites() {
  const auth = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  const platforms = (e) => {
    let a = e.platform.name;
    switch (a) {
      case 'PC':
        return <FaWindows />;
      case 'PlayStation':
        return <FaPlaystation />;
      case 'Xbox':
        return <FaXbox />;
      case 'Nintendo':
        return <SiNintendoswitch />;
    }
  };

  useEffect(() => {
    if (auth.isLoggedIn == true) {
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_API}/favorites/user/${auth.userId}`,
          {
            headers: {
              authorization: 'Bearer ' + auth.token,
            },
          }
        )
        .then((res) => {
          setFavorites(res.data.favorites);
        });
    } else {
      navigate('/login');
    }
  }, []);

  return (
    <Container fluid className='text-white'>
      <h1 className='mb-4'>My Favorite Games List</h1>{' '}
      <div style={{ marginTop: '20px' }}>
        {favorites.length ? (
          <Row xs={1} md={2} lg={3} xl={4}>
            {favorites.map((game) => (
              <Col key={game.id_game}>
                <Card className='bg-dark'>
                  <Link
                    to={{
                      pathname: `/${game.id_game}`,
                    }}
                    state={{ name: 'zayne' }}
                  >
                    <div className='imgc'>
                      <Card.Img variant='top' src={game.background_image} />
                    </div>
                    <div className='hover'>
                      {game.parent_platforms.map((platform) => (
                        <div className='icons'>{platforms(platform)}</div>
                      ))}
                    </div>
                    <Card.Body>
                      <Card.Title>{game.name}</Card.Title>
                    </Card.Body>
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <h3 className='mb-4'>There are no favorites to show</h3>
        )}
      </div>
    </Container>
  );
}

export default Favourites;
