import { Card, Col, Container, Row } from 'react-bootstrap';
import moment from 'moment/moment';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { FaPlaystation, FaWindows, FaXbox } from 'react-icons/fa';
import { SiNintendoswitch } from 'react-icons/si';

function Upcoming() {
  const [games, setGames] = useState([]);
  const [nextgames, setnextGames] = useState([]);
  useEffect(() => {
    Fecthgames();
    Fecthnextgames();
  }, []);

  let startMonth = moment().startOf('month').format('YYYY-MM-DD');
  let endMonth = moment().endOf('month').format('YYYY-MM-DD');

  const Fecthgames = () => {
    fetch(
      `https://api.rawg.io/api/games?key=${
        process.env.REACT_APP_RAWG_KEY
      }&page_size=36&ordering=released&parent_platforms=1,2,3,7&dates=${moment().format(
        'YYYY-MM-DD'
      )},${moment().endOf('month').format('YYYY-MM-DD')}`
    )
      .then((resp) => resp.json())
      .then(({ results }) => {
        setGames(results);
      });
  };

  const Fecthnextgames = () => {
    fetch(
      `https://api.rawg.io/api/games?key=${
        process.env.REACT_APP_RAWG_KEY
      }&page_size=36&ordering=released&parent_platforms=1,2,3,7&dates=${moment(
        startMonth
      )
        .add(1, 'months')
        .format('YYYY-MM-DD')},${moment(endMonth)
        .add(1, 'months')
        .format('YYYY-MM-DD')}`
    )
      .then((resp) => resp.json())
      .then(({ results }) => {
        setnextGames(results);
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
      <h1 className='mb-4'>Upcoming Games</h1>
      <Tabs defaultActiveKey='this' variant='pills' className='mb-3'>
        <Tab eventKey='this' title='This Month'>
          <Row xs={1} md={2} lg={3} xl={4}>
            {games?.map((game) => (
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
        </Tab>
        <Tab eventKey='next' title='Next Month'>
          <Row xs={1} md={2} lg={3} xl={4}>
            {nextgames?.map((game) => (
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
        </Tab>
      </Tabs>
    </Container>
  );
}

export default Upcoming;
