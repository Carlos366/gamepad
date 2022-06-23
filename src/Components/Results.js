import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import { Link } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { FaSteam } from "react-icons/fa";
import Header from "./Header";
import Spinner from "react-bootstrap/Spinner";

function Results(props) {
  const { search } = props.location.searchTerm;
  const [games, setGames] = useState([]);

  // tracking on which page we currently are
  const [page, setPage] = useState(1);
  // add loader refrence
  const loader = useRef(null);

  useEffect(() => {
    var options = {
      root: null,
      rootMargin: "20px",
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
      `https://rawg.io/api/games?key=bfd5f2572bfa44d59a6b934e77eb37c0&search=${search}&parent_platforms=1,2,3,7&page_size=24&page=${page}`
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

  return (
    <div className="Body">
      <Header />
      <h1>Search results for '{search}'</h1>
      <CardDeck>
        {games.map((game) => (
          <Card key={game.id}>
            <Link
              to={{ pathname: `/${game.name}`, Gamedetails: { game: game } }}
            >
              <div className="imgc">
                <Card.Img variant="top" src={game.background_image} />
              </div>
              <div className="hover">
                <div className="icons">
                  <FaSteam />
                  <FaSteam />
                  <FaSteam />
                </div>
              </div>
              <Card.Body>
                <Card.Title>{game.name}</Card.Title>
              </Card.Body>
            </Link>
          </Card>
        ))}
      </CardDeck>
      <div className="loading" ref={loader}>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    </div>
  );
}

export default Results;
