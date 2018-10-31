import React, { Component } from 'react';
import { renderToStaticMarkup } from "react-dom/server";
import { withLocalize } from "react-localize-redux";
// import globalTranslations from "./translations/global.json";

import logo_base from './images/logo.png';
import logo_park from './images/logo-park.png';

import './App.css';

import { Route, Link, NavLink, Switch } from "react-router-dom";
// import $ from 'jquery';

import Dashboard from './dashboard/dashboard';
import Park from './park/park';

//menu functional component
const menu = ({match}, changeLogo, lang, langs, changeLang) => {   

  if(match.params.lang && langs.includes(match.params.lang)){ 
    lang = match.params.lang;    
  }  
  let menu_lang = (lang === '') ? '' : '/'+lang
  
  return(                      
  <ul className="navbar-nav mr-auto">
    <li className="nav-item" >
      <NavLink className={'nav-link'} activeClassName="active" to={menu_lang+'/'} exact onClick={() => changeLogo()} >Home</NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" activeClassName="active" to={menu_lang+'/park'} onClick={() => changeLogo(logo_park)} >Park</NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" activeClassName="active" to={menu_lang+'/sto'} onClick={() => changeLogo()} >Sto</NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" to={'/en'} exact={true} onClick={() => {         
        changeLang('en')
       }}>En</NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" to={'/'} exact={true} onClick={() => {         
        changeLang('')
       }}>It</NavLink>
    </li>
  </ul>)
}



class App extends Component {   
  logo = logo_base; 
  lang = '';      
  langs = ['it','en'];
  curUrl = '';  
  menu_lang = '';

  constructor(props) {
    super(props);        

    console.log('const')

    //current url
    this.curUrl = this.props.location.pathname; 
    //logo
    if(this.curUrl.includes('park')) this.logo = logo_park;
    //array delle lingue
    if(this.props.match.params.lang && this.langs.includes(this.props.match.params.lang)) this.lang = this.props.match.params.lang; //analizza l'array delle lingue    
    //menu lang
    if(this.props.match.params.lang && this.langs.includes(this.props.match.params.lang)){ 
      this.menu_lang = this.props.match.params.lang;    
    }  
    this.menu_lang = (this.menu_lang === '') ? '' : '/'+this.menu_lang

    this.state = {
      squares: Array(9).fill(null),
      exact: false,
      logo: this.logo,
      changeLogo: this.changeLogo,
      lang: this.lang,      
      langs: this.langs,
      articles: [],
      main_article: [],
      menu_lang: this.menu_lang
    };     

    this.loadCMS(this.lang)
  }
  
  loadCMS = async (l) => {
    let cms_lang = (l !== '') ? '&lang='+l : ''    
    //sticky
    let dataURL = 'https://www.hackweb.it/hw_wordpress/wp-json/wp/v2/posts/?_embed'+cms_lang+'&slug=hw'  
    fetch(dataURL)
      .then(res => res.json())
      .then(res => {                
        this.setState({
          main_article: res
        })
      })  
    //3 posts
    dataURL = 'https://www.hackweb.it/hw_wordpress/wp-json/wp/v2/posts/?_embed'+cms_lang+'&per_page=3&sticky=false'
    await fetch(dataURL)
      .then(res => res.json())
      .then(res => {                
        this.setState({
          articles: res
        })
      })  
  }

  changeLogo = (v = logo_base) => {            
    this.setState({logo: v})
  }

  changeLang = (l) => {        
    const menu_lang = (l === '') ? '' : '/'+l
    this.setState({
      lang: l,
      menu_lang: menu_lang
    })
    this.loadCMS(l)
  }

  componentDidMount(){
    //           
    console.log('componentDidMount')
  }  

  componentDidUpdate(){
    //
    // console.log('componentDidUpdate')    
  }

  render() {          
    // console.log('render')

    return (      
      <div>        
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">

          <Link className="navbar-brand" to={'/' + this.state.lang} >
            <img className="main-logo" src={this.state.logo} alt="" />
          </Link>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" ></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarsExampleDefault"> 

            {/* <Switch>
              <Route path="/" exact render={(match) => menu(match, this.changeLogo, this.state.lang, this.state.langs, this.changeLang) }></Route>
              <Route path="/:lang/" render={(match) => menu(match, this.changeLogo, this.state.lang, this.state.langs, this.changeLang) }></Route>                                                                                
            </Switch>    */}

            <ul className="navbar-nav mr-auto">
              <li className="nav-item" >
                <NavLink className={'nav-link'} activeClassName="active" to={this.state.menu_lang+'/'} exact >Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to={this.state.menu_lang+'/park'} >Park</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to={this.state.menu_lang+'/sto'} >Sto</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={'/en'} exact={true} onClick={() => {                   
                  this.changeLang('en')
                }}>En</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={'/'} exact={true} onClick={() => {                 
                  this.changeLang('')
                }}>It</NavLink>
              </li>
            </ul>

            <form className="form-inline my-2 my-lg-0">   
              <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" id="search-box" />         
            </form>
          </div>
        </nav> 
                
        <main role="main">               
          <Switch>
            <Route exact path="/" render={(match) => { return <Dashboard state={this.state} articles={this.state.articles} match={match} lang={this.state.lang} /> }} />                            
            <Route path="/sto" component={(props) => {return <div>yo!</div>}} />                                                                      
            <Route exact path="/park" render={(match) => <Park state={this.state} match={match} /> } />

            <Route path="/:lang" exact render={(match) => <Dashboard state={this.state} articles={this.state.articles} match={match} lang={this.state.lang} />} />              
            <Route path="/:lang/sto" component={(props) => {return <div>yo!</div>}} />        
            <Route exact path="/:lang/park" render={(match) => <Park state={this.state} match={match} /> } />                                                    
          </Switch>
        </main>      

        <footer className="container">
          <p>&copy; hackweb 2018</p>  
        </footer>
      </div>
    )
  }
}

export default App;
