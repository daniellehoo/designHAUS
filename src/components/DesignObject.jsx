import React from 'react';
import AddFavoriteButton from './AddFavoriteButton';

function DesignObject(props){
  return(
    <div className="design_object">
        <h2>{props.match.params.id}</h2>
        <img className="design_object_img" src={props.location.state.src} alt={props.match.params.id}/>
      <div>
        <AddFavoriteButton
              authUser={props.location.state.authUser}
              designObjectName={props.match.params.id}
              favoritesList = {props.location.state.userFavorites}
              key={1}
        />
      </div>
    </div>
  );
};

export default DesignObject;
