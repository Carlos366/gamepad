import React, {useState, useEffect} from "react";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "./Header";
import {FaPlaystation, FaWindows, FaXbox} from "react-icons/fa";
import {SiNintendoswitch} from "react-icons/si";
import {MdFavoriteBorder} from "react-icons/md";
import Button from "react-bootstrap/Button";
import {MdFavorite} from "react-icons/md";
import addFavorite from "../Store/actions/FavoriteActions";
import {connect} from "react-redux";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";

function Game(props) {
    const {game} = props.location.Gamedetails;
    const {favorites} = props;
    const [condition, setCondition] = useState(false);
    const [news, setNews] = useState([]);
    const [gameResults, setGameResults] = useState([]);
    const [GameVideo, setGameVideo] = useState([]);
    const [GameScreenshots, setGameScreenshots] = useState([]);

    useEffect(() => {
        fetchGame();
        fetchVideo();
        fetchScreenshot();
        fetchNews();
    }, [game]);

    useEffect(() => {
        checkButton();
    }, [condition, gameResults]);

    const responsive = {
        desktop: {
            breakpoint: {max: 3000, min: 1200},
            items: 3,
            slidesToSlide: 3, // optional, default to 1.
        },
        laptop: {
            breakpoint: {max: 1200, min: 800},
            items: 2,
            slidesToSlide: 2, // optional, default to 1.
        },
        tablet: {
            breakpoint: {max: 800, min: 464},
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
        },
        mobile: {
            breakpoint: {max: 464, min: 0},
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
        },
    };

    const fetchGame = () => {
        fetch(
            `https://api.rawg.io/api/games?key=bfd5f2572bfa44d59a6b934e77eb37c0&${game.id}`
        )
            .then((resp) => resp.json())
            .then((results) => {
                setGameResults(results);
            });
    };

    const fetchVideo = () => {
        fetch(
            `https://api.rawg.io/api/games?key=bfd5f2572bfa44d59a6b934e77eb37c0&${game.id}`
        )
            .then((resp) => resp.json())
            .then((results) => {
                setGameVideo(results.clip);
            });
    };
    const clip = () => {
        if (GameVideo) {
            return (
                <div>
                    <video controls className="video" src={GameVideo.clip}></video>
                </div>
            );
        } else {

        }
    };
    const thenews = () => {
        if (news != "") {
            return (
                <div>
                    <h4>News</h4>
                    <Carousel
                        responsive={responsive}
                        ssr
                        infinite={false}
                        containerClass="first-carousel-container container"
                    >
                        {news.map((neww) => (
                            <card className="newscard" key={neww.source.id}>
                                <a href={neww.url}>
                                    <img className="w-100" src={neww.urlToImage}/>
                                    <Card.Body className="headline">
                                        <Card.Title>{neww.title}</Card.Title>
                                    </Card.Body>
                                </a>
                            </card>
                        ))}
                    </Carousel>
                </div>
            );
        }
        return null;
    };
    const fetchScreenshot = () => {
        fetch(
            `https://api.rawg.io/api/games?key=bfd5f2572bfa44d59a6b934e77eb37c0&${game.id}/screenshots`
        )
            .then((resp) => resp.json())
            .then(({results}) => {
                setGameScreenshots(results.slice(0, 2));
            });
    };
    const fetchNews = () => {
        fetch(
            `https://newsapi.org/v2/everything?qInTitle="${game.name}"&language=en&apiKey=72654d1db08c42c190a91bd772d52143`
        )
            .then((resp) => resp.json())
            .then(({articles}) => {
                setNews(articles);
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
    const checkButton = () => {
        favorites &&
        favorites.map((favorite) => {
            if (favorite.id == gameResults.id) {
                setCondition(true);
            }
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        props.addFavorite(gameResults);
    };
    return (
        <div>
            <Header/>
            <div className="gamehead">
                <img className="gameimg" src={gameResults.background_image}/>
            </div>
            <div className="GameBody">
                <div className="gameheader">
                    <div className="gamecard">
                        <h2>
                            {gameResults.name}
                            {condition ? (
                                <Button variant="favbtn">
                                    <MdFavorite size="2.5rem"/>
                                </Button>
                            ) : (
                                <Button onClick={handleSubmit} variant="favbtn">
                                    <MdFavoriteBorder size="2.5rem"/>
                                </Button>
                            )}
                        </h2>
                        {game.parent_platforms.map((platform) => (
                            <div className="icons">{platforms(platform)}</div>
                        ))}
                    </div>
                    <div className="infsec pt-0 pl-xl-5">
                        <div className="gameinf">
                            <h4>Rating</h4>
                            <h5 className="texto">
                                {gameResults.metacritic ? gameResults.metacritic : "-"}
                            </h5>
                        </div>
                        <div className="gameinf">
                            <h4>Release Date</h4>
                            <h5 className="texto">
                                {gameResults.released ? gameResults.released : "-"}
                            </h5>
                        </div>
                    </div>
                </div>
                <h4>Description</h4>
                <div>{gameResults.description_raw}</div>
                <Row className="px-3">
                    <Col className="col-12 mt-2 col-sm-7 pl-0">
                        <h6>Platforms</h6>
                        <h6>
                            {game.platforms.map((p) => (
                                <span className="texto">
                  <u>{p.platform.name}</u>,{" "}
                </span>
                            ))}
                        </h6>
                    </Col>
                    <Col className="col-sm-3 mt-2 col-6 pl-0">
                        <h6>Genre</h6>
                        <h6>
                            {game.genres.length > 0
                                ? game.genres.map((p) => (
                                    <span className="texto">
                      <u>{p.name}</u>,{" "}
                    </span>
                                ))
                                : "-"}
                        </h6>
                    </Col>
                    <Col className="col-sm-2 mt-2 col-6 pl-0">
                        <h6>Age Rating</h6>
                        <h6 className="texto">
                            {game.esrb_rating ? game.esrb_rating.name : "-"}
                        </h6>
                    </Col>
                    <Col className="col-lg-7 col-12 mt-4 pl-0 pr-4">
                        <h6>Tags</h6>
                        <h6>
                            {game.tags
                                ? game.tags.map((p) => {
                                    if (p.language == "eng") {
                                        return (
                                            <span className="texto">
                          <u>{p.name}</u>,{" "}
                        </span>
                                        );
                                    }
                                })
                                : "-"}
                        </h6>
                    </Col>
                    <Col className="col-lg-5 col-12 mt-4 p-0">
                        <h6>Where to buy</h6>
                        <h6>
                            {gameResults.stores
                                ? gameResults.stores.map((p) => (
                                    <a href={p.url ? p.url : null}>
                                        <button className="btn-dark p-4 mr-2 mb-2">
                                            {p.store.name}
                                        </button>
                                    </a>
                                ))
                                : "-"}
                        </h6>
                    </Col>
                </Row>
                <h4>Media</h4>
                <div>{clip()}</div>

                <Row className="px-2">
                    {GameScreenshots.map((ima) => (
                        <Col md={6} className="p-0">
                            <img className="p-1 w-100" src={ima.image}/>
                        </Col>
                    ))}
                </Row>
                {thenews()}
            </div>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        addFavorite: (favorite) => dispatch(addFavorite(favorite)),
    };
};
const mapStateToProps = (state) => {
    console.log(state);
    return {
        favorites: state.firebase.profile.favoritos,
    };
};
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{collection: `users`}])
)(Game);
