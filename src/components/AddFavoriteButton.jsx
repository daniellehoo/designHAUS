import React, { Component } from 'react';
import {firebase, db} from '../firebase';

class AddFavoriteButton extends Component{
  constructor(props){
    super(props)
    this.state= {
      authUser: '',
      designObjectName: props.designObjectName,
      favoritesList: props.favoritesList
    }
    this.addFavoriteHandler = this.addFavoriteHandler.bind(this);
    this.removeFavoriteHandler = this.removeFavoriteHandler.bind(this);
    this.isDesignObjectInFavorites = this.isDesignObjectInFavorites.bind(this);
  }

  componentWillMount(){
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? (
            db.getUsernameOrNullByUid(authUser.uid).then( (res) => {
              this.setState(() => ({ authUser }));
            db.getAllFavoritesForUserID(authUser.uid).then( snapshot => {
                let results = snapshot.val();
                if (results){
                  this.setState(() => ( { userFavorites: results }));
                  this.setState(prevState => ({
                    isAlreadyFavorited: this.isDesignObjectInFavorites(this.state.designObjectName, results)}));
                } else {
                  console.log("couldn't set UserFavorites; results was: ", results);
                }
              });
            }))
        : this.setState(() => ({
          authUser: null, }));
    });
  }

  isDesignObjectInFavorites(designObjectName, favoritesList){
    console.log("designObjectName is: ", designObjectName);
    console.log("favoritesList is: ", favoritesList);
    if (favoritesList){
      let favoritesNames = Object.values(favoritesList).map( (fave) => {
        return fave.designObjectID;
      });
      console.log("favoritesNames is: ", favoritesNames);
      for (let i in favoritesNames){
        if(designObjectName === favoritesNames[i]){
          return true;
        }
      }
      return false;
    }
    return false;
  }

  addFavoriteHandler(){
    let designObjectName = this.state.designObjectName;
    let uid = this.state.authUser ? this.state.authUser.uid : null;
    if(uid){
      this.setState(prevState => ({
        isAlreadyFavorited: !prevState.isAlreadyFavorited
      }));
      console.log("ADDING FAVORITE: ", designObjectName, " for ", uid);
      let favoriteID = db.createFavorite(uid, designObjectName);
      console.log(`FAVORITE ADDED ${favoriteID}`);
    } else {
      console.log("can't add favorite (no authUser)");
    }
  }

  removeFavoriteHandler(){
   this.setState(prevState => ({
     isAlreadyFavorited: !prevState.isAlreadyFavorited
   }));
   let designObjectName = this.state.designObjectName;
   let uid = this.state.authUser.uid;
   db.deleteFavorites(uid, designObjectName);
 }

  AddButton(){
    return(
      <button
          className="fav_button"
          onClick={this.addFavoriteHandler}
          key={this.state.i}
          id={this.state.designObjectName}
          >
            Add Favorite<i className="fas fa-heart"></i></button>
    )
  }

  RemoveButton(){
    return(
      <button
          className="fav_button"
          onClick={() => { this.removeFavoriteHandler() }}
          key={this.state.i}
          id={this.state.designObjectName}
          >Remove Favorite</button>
    )
  }

  render(){
    if (this.state.isAlreadyFavorited){
      return(this.RemoveButton());
    } else {
      return(this.AddButton());
    }
  }
}

export default AddFavoriteButton;
