import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import {Link} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import Header from "./Header";
import {FaPlaystation} from "react-icons/fa";
import {FaXbox} from "react-icons/fa";
import {FaWindows} from "react-icons/fa";
import {SiNintendoswitch} from "react-icons/si";
import Spinner from "react-bootstrap/Spinner";
import Dropdown from "react-bootstrap/Dropdown";

function Games() {
    const [title, setTitle] = useState("Popularity");
    const [games, setGames] = useState([]);
    const [url, seturl] = useState([""]);

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

    useEffect(() => {
        Fecthgames(page, url);
    }, [page, url]);

    const handleObserver = (entities) => {
        const target = entities[0];
        if (target.isIntersecting) {
            setPage((page) => page + 1);
        }
    };

    const Fecthgames = (page, url) => {
        fetch(
            `https://api.rawg.io/api/games?key=bfd5f2572bfa44d59a6b934e77eb37c0&parent_platforms=2${url}&page_size=24&page=${page}`
        )
            .then((resp) => resp.json())
            .then(({results}) => {
                setGames([...games, ...results]);
            });
    };

    const platforms = (e) => {
        let a = e.platform.name;
        switch (a) {
            case "PC":
                return <FaWindows/>;
            case "PlayStation":
                return <FaPlaystation/>;
            case "Xbox":
                return <FaXbox/>;
            case "Nintendo":
                return <SiNintendoswitch/>;
        }
    };

    const clickHandler = (e) => {
        let a = e.target.innerHTML;
        switch (a) {
            case "Name":
                seturl("&ordering=name");
                setPage(1);
                setTitle("Name");
                setGames([]);
                break;
            case "Release Date":
                seturl("&ordering=released");
                setPage(1);
                setTitle("Release Date");
                setGames([]);
                break;
            case "Rating":
                seturl("&ordering=-metacritic");
                setPage(1);
                setTitle("Rating");
                setGames([]);
                break;
            default:
                seturl("");
                setPage(1);
                setTitle("Popularity");
                setGames([]);
                break;
        }
    };

    return (
        <div className="Body">
            <Header/>
            <h1>Games for PlayStation</h1>
            <Dropdown>
                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    Sort by: <b>{title}</b>
                </Dropdown.Toggle>
                <Dropdown.Menu className="drop">
                    <Dropdown.Item onClick={clickHandler}>Name</Dropdown.Item>
                    <Dropdown.Item onClick={clickHandler}>Popularity</Dropdown.Item>
                    <Dropdown.Item onClick={clickHandler}>Release Date</Dropdown.Item>
                    <Dropdown.Item onClick={clickHandler}>Rating</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <div>
                <CardDeck>
                    {games.map((game) => (
                        <Card key={game.id}>
                            <Link
                                to={{pathname: `/${game.name}`, Gamedetails: {game: game}}}
                            >
                                <div className="imgc">
                                    <Card.Img variant="top" src={game.background_image}/>
                                </div>
                                <div className="hover">
                                    {game.parent_platforms.map((platform) => (
                                        <div className="icons">{platforms(platform)}</div>
                                    ))}
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
        </div>
    );
}

export default Games;
