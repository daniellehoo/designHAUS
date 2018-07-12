import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {db} from '../firebase';
import DesignObjectImg from "./DesignObjectImg"
import DesignObjectLink from "./DesignObjectLink"


class Landing extends Component{
  constructor(props){
    super(props);
    this.state = {
    ...props,
    randomDesignObject: '',
    styleClass: 'landing_hidden'};

    this.rerollRandom = this.rerollRandom.bind(this);
  };

  componentDidMount(){
    // db.getRandomDesignObject().then( obj => {
    //   this.setState(() => ({ randomDesignObject: obj }));
    // });
  }

  rerollRandom() {
    db.getRandomDesignObject().then( obj =>
      this.setState(() => ({
        randomDesignObject: obj,
        styleClass: 'landing_visible'
       }))
    );
  }

  render(){
    let randomDesignObjectName = this.state.randomDesignObject ? Object.keys(this.state.randomDesignObject)[0] : null
    let randomDesignObjectSrc = this.state.randomDesignObject ? Object.values(this.state.randomDesignObject)[0].img_url : ''
    return(
      <div className="landing">
        <h1>designHAUS</h1>
        <button className="homeButton" onClick={this.rerollRandom}>
          <i className="fa fa-lightbulb-o" aria-hidden="true"></i>&nbsp;&nbsp;G E N E R A T E
        &nbsp; I N S P I R A T I O N <i className="fa fa-lightbulb-o" aria-hidden="true"></i></button>
        <DesignObjectLink src={randomDesignObjectSrc} name={randomDesignObjectName}/>
      </div>
    );
  }
}

export default Landing;
