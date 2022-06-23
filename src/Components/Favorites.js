import React from "react";
import {connect} from "react-redux"
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import Card from "react-bootstrap/Card";
import {Link} from "react-router-dom";
import CardDeck from "react-bootstrap/CardDeck";
import Header from "./Header";
import { Redirect } from 'react-router-dom'

const Favorites = (props) => {
    const {favorites, auth} = props;
    console.log(favorites)
    if (!auth.uid) return <Redirect to='/Login' />
    return(
        <div className="Body">
            <Header/>
            <div>
                <h1>Your Favourites</h1>
            <CardDeck>
            {favorites ? favorites.map(game => (
                <Card key={game.id}>
                    <Link to={{pathname:`/${game.name}` ,
                        Gamedetails: {game:game}
                    }}>
                        <div className="imgc">
                            <Card.Img variant="top" src={game.background_image} /></div>
                        <Card.Body>
                            <Card.Title>{game.name}</Card.Title>
                        </Card.Body>
                    </Link>
                </Card>
            )) : <div className="mt-5 text-dark"><h1 className="text-center w-100 mt-5">It looks like you dont have any favourites yet,</h1><h3 className="text-center w-100 mt-2">Start browsing and save your favourite games!</h3></div>
            }</CardDeck>
            </div>
        </div>
    )
}
const mapStateToProps = (state) =>{
    return {
        favorites: state.firebase.profile.favoritos,
        auth: state.firebase.auth
    }
}
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: `users`}
    ])
)(Favorites);
