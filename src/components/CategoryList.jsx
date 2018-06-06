import React, { Component } from 'react';
import {db} from '../firebase';
import { Link } from 'react-router-dom';

class CategoryList extends Component{
  constructor(props){
    super(props)
    this.state={ categories: [] }
  }

  componentDidMount(){
    db.getCategories().then(snapshot => {
      console.log("CategoryList.jsx (componentDidMount): result is: ", snapshot.val());
      this.setState(() => ({ categories: snapshot.val()}))
    }
    );
  }

  render(){
    const categories = Object.keys(this.state.categories).map(category => {
      return(<li><Link to={`/categories/${category}`}>{category}</Link></li>);
    }
    );

  return(
    <div>
      <h1>designHAUS Category List</h1>
    <div className="categoryList">{categories}</div>
    </div>
  );
}
}

export default CategoryList;
