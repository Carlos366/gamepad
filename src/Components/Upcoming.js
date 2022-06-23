import Card from "react-bootstrap/Card";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import CardDeck from "react-bootstrap/CardDeck";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {FaPlaystation, FaWindows, FaXbox} from "react-icons/fa";
import Header from "./Header";
import {SiNintendoswitch} from "react-icons/si";

function Upcoming() {
    const [games, setGames] = useState([]);
    const [nextgames, setnextGames] = useState([]);
    useEffect(() => {
        Fecthgames();
        Fecthnextgames();
    }, []);

    const today = () => {
        let newDate = new Date();
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        return `${year}-${month < 10 ? `0${month}` : `${month}`}-${
            date < 10 ? `0${date}` : `${date}`
        }`;
    };

    const endofmonth = () => {
        let newDate = new Date();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        let date = new Date(year, month, 0).getDate();
        return `${year}-${month < 10 ? `0${month}` : `${month}`}-${date}`;
    };
    const endofnextmonth = () => {
        let newDate = new Date();
        let month = newDate.getMonth() + 2;
        let year = newDate.getFullYear();
        let date = new Date(year, month, 0).getDate();
        return `${year}-${month < 10 ? `0${month}` : `${month}`}-${date}`;
    };
    const nextmonth = () => {
        let newDate = new Date();
        let month = newDate.getMonth() + 2;
        let year = newDate.getFullYear();
        return `${year}-${month < 10 ? `0${month}` : `${month}`}-01`;
    };

    const Fecthgames = () => {
        fetch(
            `https://api.rawg.io/api/games?key=bfd5f2572bfa44d59a6b934e77eb37c0&page_size=36&ordering=released&parent_platforms=1,2,3,7&dates=${today()},${endofmonth()}`
        )
            .then((resp) => resp.json())
            .then(({results}) => {
                setGames(results);
            });
    };

    const Fecthnextgames = () => {
        fetch(
            `https://api.rawg.io/api/games?key=bfd5f2572bfa44d59a6b934e77eb37c0&page_size=36&ordering=released&parent_platforms=1,2,3,7&dates=${nextmonth()},${endofnextmonth()}`
        )
            .then((resp) => resp.json())
            .then(({results}) => {
                setnextGames(results);
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

    return (
        <div className="Body">
            <Header/>
            <h1>Upcoming Games</h1>
            <Tabs defaultActiveKey="this" variant="pills" className="mb-3">
                <Tab eventKey="this" title="This Month">
                    <CardDeck>
                        {games.map((game) => (
                            <Card key={game.id}>
                                <Link
                                    to={{
                                        pathname: `/${game.name}`,
                                        Gamedetails: {game: game},
                                    }}
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
                </Tab>
                <Tab eventKey="next" title="Next Month">
                    <CardDeck>
                        {nextgames.map((game) => (
                            <Card key={game.id}>
                                <Link
                                    to={{
                                        pathname: `/${game.name}`,
                                        Gamedetails: {game: game},
                                    }}
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
                </Tab>
            </Tabs>
        </div>
    );
}

export default Upcoming;
