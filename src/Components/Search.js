import React, { useState, useEffect } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';

function Search() {
  const [gameResults, setGameResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const inputHandler = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    Search();
  }, [searchTerm]);

  const Search = () => {
    //e.preventDefault()
    fetch(
      `https://rawg.io/api/games?key=${process.env.REACT_APP_RAWG_KEY}&search=${searchTerm}&parent_platforms=1,2,3,7&page_size=6`
    )
      .then((resp) => resp.json())
      .then(({ results }) => {
        setGameResults(results);
      });
  };

  return (
    <div className='search me-lg-2 d-none d-lg-block'>
      <Form className='d-flex align-items-center '>
        <FormControl
          type='text'
          placeholder='Search'
          className='searchbar'
          onChange={inputHandler}
        />
      </Form>
      {searchTerm ? (
        <Dropdown className='searchdrop py-3 px-2 w-100'>
          <h5>Games</h5>

          <div className='sbox'>
            {gameResults.map((game) => (
              <Link
                to={{
                  pathname: `/${game.id}`,
                }}
                onClick={() => setSearchTerm('')}
                className='searchres'
              >
                <div className='imags'>
                  <img src={game.background_image} />
                </div>
                <div className='imagt'>{game.name}</div>
              </Link>
            ))}
          </div>

          <Link
            to={{
              pathname: `/Results/${searchTerm}`,
            }}
            onClick={() => setSearchTerm('')}
          >
            <h6 className='mt-4'>See all results</h6>
          </Link>
        </Dropdown>
      ) : null}
    </div>
  );
}
export default Search;
