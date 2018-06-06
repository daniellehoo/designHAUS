import React from 'react';

function DesignObject(props){
  return(
    <div className="design_object">
        <h2>{props.match.params.id}</h2>
        <img className="design_object_img" src={props.location.state.src} alt={props.match.params.id}/>
    </div>
  );
};

export default DesignObject;
