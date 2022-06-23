const initState = {
}

const favoriteReducer = (state = initState,action) => {
    switch (action.type){
        case "ADD_FAVORITE":
            console.log("created favorite", action.favorite);
            return state;
        case "ADD_FAVORITE_ERR":
            console.log("created favorite error", action.err)
            return state;
        default:
            return state
    }
}

export default favoriteReducer;