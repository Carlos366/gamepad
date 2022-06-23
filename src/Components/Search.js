import React, { useState, useEffect } from "react";
import { RiSearchLine } from "react-icons/ri";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";

function Search() {
  const [gameResults, setGameResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const inputHandler = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };
  useEffect(() => {
    if (searchTerm) {
      Search(searchTerm);
    } else {
      return null;
    }
  }, [searchTerm]);
  const Search = (e) => {
    //e.preventDefault()
    fetch(
      `https://rawg.io/api/games?key=bfd5f2572bfa44d59a6b934e77eb37c0&search=${e}&parent_platforms=1,2,3,7&page_size=6`
    )
      .then((resp) => resp.json())
      .then(({ results }) => {
        setGameResults(results);
      });
  };

  const showdrop = () => {
    if (searchTerm) {
      return (
        <Dropdown className="searchdrop">
          <h5>Games</h5>
          <Link
            to={{ pathname: `/Results`, searchTerm: { search: searchTerm } }}
          >
            <h6>See all results</h6>
          </Link>
          <div className="sbox">
            {gameResults.map((game) => (
              <Link
                to={{ pathname: `/${game.name}`, Gamedetails: { game: game } }}
                className="searchres"
              >
                <div className="imags">
                  <img src={game.background_image} />
                </div>
                <div className="imagt">{game.name}</div>
              </Link>
            ))}
          </div>
        </Dropdown>
      );
    }
  };
  return (
    <div className="search">
      <Form className="form-inline">
        <RiSearchLine className="searchicon" />
        <FormControl
          type="text"
          placeholder="Search"
          className="searchbar"
          onChange={inputHandler}
        />
      </Form>
      {showdrop()}
    </div>
  );
}
export default Search;
