import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

export const getUsernameOrNullByUid = (uid) => {
  var username;
  username = db.ref('users/' + uid).once('value').then( (snap) => {
  console.log("snap.val().username is: ", snap.val().username)
  return snap.val().username;
  })
  .catch( (err) => {
    console.log("ERROR" + err);
    return null;
  });
    console.log("username inside method is: ", username);
    return username;
}

//favorites
export const createFavorite = (userID, designObjectName) =>
  db.ref('favorites').push({
      userID: userID,
      designObjectID: designObjectName
  });

export const getAllFavoritesForUserID = (userID) =>
  db.ref(`favorites`).orderByChild('userID').equalTo(userID).once('value');

export const deleteFavorites = (userID, designObjectName) =>
  db.
  ref(`favorites`).
  orderByChild('userID').
  equalTo(userID).
  on('child_added', function(snapshot){
    let fave = snapshot.val();
    if (fave.designObjectID == designObjectName){
      snapshot.ref.remove();
    }
  });

  export const getAllFavorites = () =>
    db.ref(`favorites`).once('value');

export const findDesignObjectByName = (name) =>
  db.ref(`categories/*/${name}`).once('value');

// Categories API

export const getCategories = () =>
  db.ref('categories').once('value');

export const getCategoryById = (id) =>
  db.ref(`categories/${id}`).once('value');

// Child count and get random object from DB

export const getRandomDesignObject = () => {
  return getCategories().then(snapshot => {
    let allDesignObjects = {};
    let categories = snapshot.val();
    for (let categoryName in categories){
      let categoryDesignObjects = categories[categoryName];
      for (let designObject in categoryDesignObjects){
        allDesignObjects[designObject] = categoryDesignObjects[designObject];
        allDesignObjects[designObject]['category'] = categoryName;
      }
    }
    let totalObjectsCount = Object.keys(allDesignObjects).length;
    let randomIdx = Math.floor(Math.random()*totalObjectsCount);

    let randomDesignObjectName = Object.keys(allDesignObjects)[randomIdx];
    // console.log("random design_object is: ", randomDesignObjectName);
    // console.log("random design_object stats are: ", allDesignObjects[randomDesignObjectName]);

    let randomObj = {};
    randomObj[randomDesignObjectName] = allDesignObjects[randomDesignObjectName];
    return randomObj;

  });
}
