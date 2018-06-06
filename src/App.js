import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import {firebase, db} from './firebase';
import Landing from './components/Landing';
import Login from './components/Login';
import CategoryList from './components/CategoryList';
import Category from './components/Category';
import DesignObject from './components/DesignObject';
import User from './components/User';
import SignUp from './components/SignUp';
import Nav from './partials/Nav';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: '',
      categories: [],
      designObject: '',
      randomDesignObject: null,
      userFavorites: {},
      userFavoriteObjectNames: []
    };
    this.findUserFavorites = this.findUserFavorites.bind(this);
  }

  findUserFavorites(userID) {
    db.getAllFavoritesForUserID(userID).then( snapshot => {
      snapshot.forEach(snap => {
        this.setState(prevState => (
          {userFavoriteObjectNames:
            [...prevState.userFavoriteObjectNames,
              snap.val().designObjectID]}))
      })
      let results = snapshot.val();
      if (results){
        this.setState(() => ( { userFavorites: results }));
      } else {
        console.log("couldn't set UserFavorites; results was: ", results);
      }
    });
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
    console.log("*** authUser.uid is ", authUser.uid)
      authUser
        ? (
            db.getUsernameOrNullByUid(authUser.uid).then( (res) => {
              this.setState(() => ({ authUser }));
              this.setState(() => ({ username: res}));
              this.findUserFavorites(this.state.authUser.uid);
            })
        )
        : this.setState(() => ({ authUser: null }));
    });

    // setState to FireBase DB categories
    db.getCategories().then(snapshot => {
      this.setState(() => ({ categories: snapshot.val() }))
    });

    db.getAllFavorites().then( snapshot => {
      let results = snapshot.val();
    });

  }

  render() {
    console.log("this.state.userFavorites: ", this.state.userFavorites)
    return (
      <div className="App">
         <Nav
           authUser={this.state.authUser}
           username={this.state.username}/>
        <Switch>
          <Route
            render={() => (<Landing
              authUser={this.state.authUser}
              randomDesignObject={this.state.randomDesignObject}/>)}
            exact path='/' />
          <Route path='/login'
            component={Login}/>
              <Route
            render={() => (<CategoryList
            categories={this.state.categories}/>)}
            exact path='/categories'/>
          <Route path='/categories/:id'
            render={({match}) => (<Category
              authUser={this.state.authUser}
              categoryID={match.params.id}/>)}
            />
          <Route exact path='/designObject/:id/'
            component={DesignObject}/>
          <Route path='/user'
            render={() => (<User
            userFavoriteObjectNames={this.state.userFavoriteObjectNames}
          />)}
          />
          <Route path='/signup'
            component={SignUp}/>
        </Switch>
      </div>
    );
  }
}

export default App;
