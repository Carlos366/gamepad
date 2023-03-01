import React, { useState, useEffect, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import moment from 'moment/moment';
import { AuthContext } from '../shared/context/auth-context';
import { Row, Col, Container, Spinner } from 'react-bootstrap';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FaPlaystation, FaWindows, FaXbox } from 'react-icons/fa';
import { SiNintendoswitch } from 'react-icons/si';
import axios from 'axios';
import { toast } from 'react-toastify';

function Game() {
  const { id } = useParams();
  const [gameResults, setGameResults] = useState([]);
  const [GameScreenshots, setGameScreenshots] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (auth.isLoggedIn == true) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_API}/favorites/${id}`, {
          headers: {
            authorization: 'Bearer ' + auth.token,
          },
        })
        .then((res) => {
          setIsFavorite(true);
        });
    }
    fetchGame();
    fetchScreenshot();
  }, [id, auth]);

  const fetchGame = () => {
    fetch(
      `https://api.rawg.io/api/games/${id}?key=${process.env.REACT_APP_RAWG_KEY}`
    )
      .then((resp) => resp.json())
      .then((results) => {
        setGameResults(results);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const fetchScreenshot = () => {
    fetch(
      `https://api.rawg.io/api/games/${id}/screenshots?key=${process.env.REACT_APP_RAWG_KEY}`
    )
      .then((resp) => resp.json())
      .then(({ results }) => {
        setGameScreenshots(results.slice(0, 2));
      });
  };
  const platforms = (e) => {
    if (e.platform.name.includes('PC')) {
      return <FaWindows />;
    }
    if (e.platform.name.includes('PlayStation')) {
      return <FaPlaystation />;
    }
    if (e.platform.name.includes('Xbox')) {
      return <FaXbox />;
    }
    if (e.platform.name.includes('Nintendo')) {
      return <SiNintendoswitch />;
    }
  };

  const addFavorite = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_API}/favorites`,
        {
          id_game: gameResults.id,
          background_image: gameResults.background_image,
          parent_platforms: gameResults.parent_platforms,
          name: gameResults.name,
        },
        {
          headers: {
            authorization: 'Bearer ' + auth.token,
          },
        }
      )
      .then((res) => {
        setIsFavorite(true);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const removeFavorite = async () => {
    await axios
      .delete(`${process.env.REACT_APP_BACKEND_API}/favorites/${id}`, {
        headers: {
          authorization: 'Bearer ' + auth.token,
        },
      })
      .then(() => {
        setIsFavorite(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return !loading ? (
    <Container fluid className='text-white'>
      <Row className='overflow-hidden p-0 m-0 gamehead'>
        <img className='p-0' src={gameResults?.background_image} />
      </Row>
      <div className='GameBody'>
        <Row className='mb-5 p-4  gamecard'>
          <div className='d-flex justify-content-between align-items-center flex-row'>
            <h2>{gameResults?.name}</h2>
            {isFavorite ? (
              <AiFillHeart
                style={{ fontSize: '30px' }}
                onClick={removeFavorite}
              />
            ) : (
              <AiOutlineHeart
                style={{ fontSize: '30px' }}
                onClick={addFavorite}
              />
            )}
          </div>
          <div className='icons'>
            {gameResults?.parent_platforms?.map((platform) =>
              platforms(platform)
            )}
          </div>

          <Col className='mt-5 d-flex flex-row gap-5'>
            <div>
              <h4>Rating</h4>
              <h5 className='texto'>
                {gameResults?.metacritic ? gameResults?.metacritic : '-'}
              </h5>
            </div>
            <div>
              <h4>Release Date</h4>
              <h5 className='texto'>
                {gameResults?.released
                  ? moment(gameResults?.released).format('DD MMMM  YYYY')
                  : '-'}
              </h5>
            </div>
          </Col>
        </Row>

        <Row className='mb-5 p-4'>
          <h4>Description</h4>
          <div>{gameResults?.description_raw}</div>
        </Row>

        <Row className='mb-5 p-4'>
          <Col sm={6} className='mb-3'>
            <h6>Platforms</h6>
            <h6>
              {gameResults?.platforms?.map((p) => (
                <span className='texto'>
                  <u>{p.platform.name}</u>,{' '}
                </span>
              ))}
            </h6>
          </Col>
          <Col sm={3} className='mb-3'>
            <h6>Genre</h6>
            <h6>
              {gameResults?.genres?.length > 0
                ? gameResults?.genres.map((p) => (
                    <span className='texto'>
                      <u>{p.name}</u>,{' '}
                    </span>
                  ))
                : '-'}
            </h6>
          </Col>
          <Col sm={3} className='mb-3'>
            <h6>Age Rating</h6>
            <h6 className='texto'>
              {gameResults?.esrb_rating ? gameResults?.esrb_rating.name : '-'}
            </h6>
          </Col>
          <Col lg={6} className='mb-3'>
            <h6>Tags</h6>
            <h6>
              {gameResults?.tags
                ? gameResults?.tags.map((p) => {
                    if (p.language == 'eng') {
                      return (
                        <span className='texto'>
                          <u>{p.name}</u>,{' '}
                        </span>
                      );
                    }
                  })
                : '-'}
            </h6>
          </Col>
          <Col lg={6} className='mb-3'>
            <h6>Where to buy</h6>

            {gameResults?.stores
              ? gameResults?.stores.map((p) => (
                  <a href={p.url ? p.url : null} className='mr-2 '>
                    <button className='btn-light p-4 mr-2 mb-2'>
                      {p.store.name}
                    </button>
                  </a>
                ))
              : '-'}
          </Col>
        </Row>
        {gameResults?.clip ? (
          <>
            <h4>Media</h4>
            <div>
              <video controls className='video' src={gameResults?.clip}></video>
            </div>
          </>
        ) : null}

        <Row className='mb-5 p-4'>
          {GameScreenshots.map((ima) => (
            <Col md={6} className='p-0'>
              <img className='p-1 w-100' src={ima.image} />
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  ) : (
    <div className='loading'>
      <Spinner animation='border' role='status' />
    </div>
  );
}

export default Game;
