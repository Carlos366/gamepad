import { Card, Col, Container, Row, Spinner, Dropdown } from 'react-bootstrap';

import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { FaPlaystation } from 'react-icons/fa';
import { FaXbox } from 'react-icons/fa';
import { FaWindows } from 'react-icons/fa';
import { SiNintendoswitch } from 'react-icons/si';

function Results() {
  const { search } = useParams();
  console.log(search);
  // const { search } = props.location.searchTerm;
  const [games, setGames] = useState([]);

  // tracking on which page we currently are
  const [page, setPage] = useState(1);
  // add loader refrence
  const loader = useRef(null);

  useEffect(() => {
    var options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };
    // initialize IntersectionObserver
    // and attaching to Load More div
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, []);

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPage((page) => page + 1);
    }
  };

  useEffect(() => {
    reset();
  }, [search]);

  const reset = () => {
    setPage(1);
  };

  useEffect(() => {
    Fecthgames(search, page);
  }, [page, search]);

  const Fecthgames = (search, page) => {
    fetch(
      `https://rawg.io/api/games?key=${process.env.REACT_APP_RAWG_KEY}&search=${search}&parent_platforms=1,2,3,7&page_size=24&page=${page}`
    )
      .then((resp) => resp.json())
      .then(({ results }) => {
        if (results) {
          if (page == 1) {
            setGames(results);
          } else {
            setGames([...games, ...results]);
          }
        }
      });
  };
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

  return (
    <Container fluid className='text-white'>
      <h1>Search results for '{search}'</h1>
      <div>
        <Row xs={1} md={2} lg={3} xl={4}>
          {games.map((game) => (
            <Col key={game.id}>
              <Card className='bg-dark'>
                <Link
                  to={{
                    pathname: `/${game.id}`,
                  }}
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
        <div className='loading' ref={loader}>
          <Spinner animation='border' role='status' />
        </div>
      </div>
    </Container>
  );
}

export default Results;
