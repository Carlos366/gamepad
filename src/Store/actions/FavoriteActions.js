
const addFavorite = (favorite) => {
    return (dispatch, getState, {getFirestore,getFirebase})=>{
        const firestore = getFirestore();
        const firebase = getFirebase();
        const profile = getState().firebase.auth.uid;
        firestore.collection(`users`).doc(`${profile}`).update({
            favoritos: firebase.firestore.FieldValue.arrayUnion(favorite)
        },{merge:true}).then(()=>{
            dispatch({type:'ADD_FAVORITE', favorite});
        }).catch((err)=>{
            dispatch({type:'ADD_FAVORITE_ERR', err});
        })

    }
}

export default addFavorite;