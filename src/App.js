import React, { Component, useState } from 'react';
import './App.css';
import Person from './Person/Person';
import { Layout } from 'antd';
import { StreamApp } from 'react-activity-feed';
import 'react-activity-feed/dist/index.css';

const key = 's7ezwzp6k776'
const Secret = '3hmrsshtvsxzr7ryzmfqu4rz5hf9n8uruu3aq4kef2keza3tgydtj32dtzuau7nz'

const { Header, Footer, Sider, Content } = Layout;

let stream = require('getstream');
let client = stream.connect(key);
// let userToken = client.createUserToken('icy-disk-9');
let userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoicnlhbiJ9.CXJfBSKnnOeX_5mDCBz_mKrjf5Hb0t4NWEmIIUaZRnc'


class App extends Component {
  
// state = {
// inputValue:''
// };

  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      postcount: ''
    };
  }

  updateInputValue(newInputValue) {
    this.setState({inputValue: newInputValue});
    // console.log(newInputValue);
    console.log(this.state.inputValue);
  }

  postMsg() {
    console.log(this.state.inputValue);
    // this.setState(state => ({
    // }));
    //hit Stream API 
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

        {/* Here: this onChange function is listening for specific events, e means events */}
        <textarea onChange={e => this.updateInputValue(e.target.value)}></textarea>

        <div></div>
        <br></br>

        <button onClick={() => this.postMsg()}>
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
