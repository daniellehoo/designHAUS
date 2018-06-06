import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {db, firebase} from '../firebase';
import AddFavoriteButton from './AddFavoriteButton';

class Category extends Component{
  constructor(props){
    super(props)
    this.state={
      categoryID: props.categoryID,
      design_entities: [],
      favorited: this.props.isFavorite,
      authUser: this.props.authUser,
      userFavorites: []
     }
  }

  componentWillMount(){
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? (
            db.getUsernameOrNullByUid(authUser.uid).then( (res) => {
              this.setState(() => ({ authUser }));
              this.setState(() => ({ username: res}));
              db.getAllFavoritesForUserID(authUser.uid).then( snapshot => {
                let results = snapshot.val();
                if (results){
                  this.setState(() => ( { userFavorites: results }));
                } else {
                  console.log("couldn't set UserFavorites; results was: ", results);
                }
              });
            })

        )
        : this.setState(() => ({ authUser: null }));
    });

    db.getCategoryById(this.state.categoryID).then(snapshot =>
      this.setState(() => ({ design_entities: snapshot.val()}))
    );
  }

  render(){
    const design_entities = this.state.design_entities ? Object.keys(this.state.design_entities) : []
    const design_entities_divs = design_entities.map( (k, i) =>{
      const src = this.state.design_entities[k].img_url
      return (
        <div className="design_object_container" key={i}>
          { /* this.renderFavoriteHeart() */ }
          <div className="circle_image">
            <img className="image_item" src={src} alt={k}/>
            <div className="design_object_overlay">
            <div className="design_object_title">
              <Link className="design_object_title"
                to={{pathname:`/designObject/${k}`,
                state: {src: this.state.design_entities[k].img_url} }}>{k}
              </Link>
            </div>
            </div>
          </div>
          <AddFavoriteButton
                authUser={this.state.authUser}
                designObjectName={k}
                favoritesList = {this.state.userFavorites}
                key={i}
          />
        </div>
        );
    });
    return(
      <div className="design_entities">
        <h1>Category: {this.state.categoryID}</h1>
        <ul>{design_entities_divs}</ul>
      </div>
    );
  }
}

export default Category;
