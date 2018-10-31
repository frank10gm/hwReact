
const nav = ({match}) => {    
    if(!match.params.lang){
      if(match.url != '/'){                 
        this.exact = true;              
      }
    }  
    return(                  
    <ul className="navbar-nav mr-auto">
      <li className="nav-item" >
        <NavLink className="nav-link" activeClassName="active" to={'/'} exact={this.exact} >Home</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" activeClassName="active" to="/park" onClick={() => {this.exact = true;} } >Park</NavLink>
      </li>
    </ul>)
};