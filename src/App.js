import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

class App extends Component {

  postMsg() {
    console.log('posting message');
    // this.setState(state => ({
    // }));
  }

  render() {
    return (
      <div className="App"> 
      <Layout>
      <Header><h1>Seetha & Ryan's Feeds Project</h1></Header>
      <Layout>
      <Sider style={{background:'white'}}>
       <div id="sidebarContainer"> 
       Toggle Between Feeds Here
       </div>
        </Sider>
      <Layout>
        <Content><h1>Our Feeds</h1></Content>
        <div id="postContainer">
        <br></br>
        <div></div>
        <div id="textBox">
          Enter Post  Here
        </div>
        <div></div>
        <br></br>
        <button onClick={this.postMsg}>
        Post
        </button>
        
        </div>
        <Footer>        
          <div id="container">
            <br></br>
          Personal Timeline & Global Feed
        </div></Footer>
      </Layout>
    </Layout>
    </Layout>
      </div>      
    );
  }
}

export default App;
