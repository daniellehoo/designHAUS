import React from 'react';

const DesignObjectImg = (props) => {
  return(
    props.src ? <img className="landing_img" src={props.src}/> : <div>Loading...</div>
  );
};


export default DesignObjectImg;
