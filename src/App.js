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
      <Header>Seetha & Ryan's Feeds Project</Header>
      <Layout>
      <Sider style={{background:'white'}}>
       <div id="sidebarContainer"> 
       Toggle Between Feeds Here
       </div>
        </Sider>
      <Layout>
        <Content><h1>Our Feeds</h1></Content>
        <div id="postContainer">
        //Post Section//
        <div></div>
        <div id="textBox">
          Enter Post  Here
        </div>
        <div></div>
        <button onClick={this.postMsg}>
        Post
        </button>
        
        </div>
        <Footer>        
          <div id="container">
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
