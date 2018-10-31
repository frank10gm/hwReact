import React, { Component } from 'react';
// import socketIOClient from 'socket.io-client'
import PropTypes from "prop-types";

class Dashboard extends Component {
    socket = null    

    static contextTypes = {
        router: PropTypes.object
    }
    
    constructor(props, context) {
        super(props, context);        

        this.endpoint = 'http://localhost:8081/chat';
        // this.socket = socketIOClient(this.endpoint) //this.state.endpoint        

        this.state = {
            endpoint: this.endpoint,
            color: 'white',
            socket: this.socket,
            chat_sid: '',
            articles: this.props.articles,            
            main_article: this.props.state.main_article        
        };  
        
    }    

    send = () => {        
        console.log('change color')
        // this.state.socket.emit('change color', 'red', 'yellow')                 
    }

    handleKeyUp = () =>{
        // this.state.socket.emit('typing', {data: this.state.chat_sid}) 
    }

    handleLinkClick = (e) => {          
        e.preventDefault()                    
        const link = e.target.attributes.href.value;        
        const lang = (this.props.state.lang === '') ? '' : '/'+this.props.state.lang
        if(link.includes('//')) window.open(link, '_blank')        
        else this.context.router.history.push(lang+'/'+link)        
    }

    updateLinks = () => {        
        let pageContent = document.getElementById('articles')
        let main_article = document.getElementById('main_article')
        let links = Array.from(pageContent.querySelectorAll('a'))          
        Array.from(main_article.querySelectorAll('a')).forEach((el) => {
            links.push(el)
        })
        links.map( (node) => node.onclick = (e) => {                      
            this.handleLinkClick(e)
        });        
    }

    componentWillMount() {
        //
    }

    componentDidMount() {        
        //socket
        // this.state.socket.on('connect', () => {
        //     this.state.socket.emit('new_client');            
        // });
        
        // this.state.socket.on('new_client', (sid) => {
        //     console.log('i\'m connected: ' + sid)
        //     this.setState({chat_sid: sid})
        // })

        // this.state.socket.on('change color', (color) => {            
        //     console.log('ricevuto: ' + color);
        //     document.body.style.backgroundColor = color            
        // })         

        this.updateLinks()
    }

    componentDidUpdate() {        
        this.updateLinks()
    }

    componentWillReceiveProps(nextProps) {                
        this.setState({
            articles: nextProps.articles,            
            main_article: nextProps.state.main_article
        })
    }    


    render() {            

        let articles = this.state.articles.map((el, index) => {
            let content = el.content.rendered

            return <div key={el.slug} className="col-md-4">
                <h2>{el.title.rendered}</h2>
                <div dangerouslySetInnerHTML={{ __html: content }}></div>            
            </div>
        });                

        let main_article = (this.state.main_article.length > 0) ? <div id="main_article">
            <h1 className="display-3" >{this.state.main_article[0].title.rendered}</h1>
            <div dangerouslySetInnerHTML={{ __html: this.state.main_article[0].content.rendered }}></div>            
        </div> : <div id="main_article"></div>
                
        return(
            <div>
                <div className="jumbotron">
                    <div className="container">                        
                        {main_article}
                    </div>
                </div>
                <div className="container">  
                    <div id="articles" className="row">                    
                        {articles}                        
                    </div>
                    <hr />
                </div>   
            </div>
        )
    }
}

export default Dashboard;