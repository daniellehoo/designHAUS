import React, { Component } from 'react';
import { firebase, db } from '../firebase';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      designObjectNamesToUrls: {}
    };
  }

  componentDidMount() {
    db.getCategories().then(snapshot => {
      snapshot.forEach(snap => {
        for( let k in snap.val()){
          let newPair = {};
          newPair[k] = snap.val()[k].img_url;
          this.setState( prevState => ( { designObjectNamesToUrls: Object.assign({}, prevState.designObjectNamesToUrls, newPair)}))
        }
      })
    })
  }

  render() {
    const favorites = this.props.userFavoriteObjectNames.map((name, i) => {
      let img_url = this.state.designObjectNamesToUrls[name]
      return (
        <div className="user_favorites">
          <div className="user_favorites_objects" key={i}>{name}<br/><img src={img_url} /></div>
        </div>
      )
    })
    return (
      <div className="user_favorites_container">
        <h1>User Home</h1>
        <h2>User Favorites List</h2>
        <div>{favorites}</div>
      </div>
    );
  }
}

export default User;
