import { Link } from 'react-router-dom';
import React from 'react';
import DesignObjectImg from "./DesignObjectImg"

const DesignObjectLink = (props) => {
  if (props.name){
    return     <div>
          <Link
            to={{pathname:`/designObject/${props.name}`,
            state: {src: props.src} }}>
            <DesignObjectImg src={props.src} />
          </Link>
          <h2>{props.name}</h2>
        </div>

  } else {
    return <div></div>
  }

};

export default DesignObjectLink;
