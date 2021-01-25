import React, { Component, useState } from 'react';
import './App.css';
import Person from './Person/Person';
import { Layout } from 'antd';
import 'react-activity-feed/dist/index.css';
import { StreamApp, NotificationDropdown, FlatFeed } from 'react-activity-feed';
import { connect } from 'getstream';

const { Header, Footer, Sider, Content } = Layout;

const key = 'qaq9tzbfa59s'
const secret = '87hpnuzt45t9bac2t73u2thk2h8dzdt9w6tcyp7bzth9h5t7qnm6damrg97tfnnj'
const appID = '100501'
let stream = require('getstream');
let client = stream.connect(key);
// let userToken = client.createUserToken('ryan');
let userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoicnlhbiJ9.Va9Thg7gl4GtW3z1Q18FsHxYL7P0rAbXJtzpQTAr4KQ'

const newFeed = client.feed('user', 'ryan', userToken);
// console.log(newFeed);
// const activity = newFeed.addActivity({
//   actor: 'ryan', 
//   tweet: 'Hello world', 
//   verb: 'tweet', 
// })

// next thing interacting with stream api (do a lot of this inside life cycle hook or constructor)
// Feed.activity
// Check out life cycle hooks - always want to grab feed, so it can be stored as a value to manipulate, did component now??
// Server side end points - Seetha

class App extends Component {
// state = {
// inputValue:''
// };
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      postText: '',
      postcount: '',
      items: [],
      token: ''
    };
  }

  // life cycle hook, runs first or second
  componentDidMount() {
    this.getToken()
  }

  updateInputValue(newInputValue) {
    this.setState({inputValue: newInputValue});
    // console.log(newInputValue);
    console.log(this.state.inputValue);
  }


  getToken(){
    // fetch("http://localhost:1800/feedstoken?req=ryan", {method: 'POST'})
    // // this happens once we get the response data
    // .then((res) => {
    //   console.log((res))
    // })
    // .catch(err => console.log(err))

    fetch("http://localhost:1800/feedstoken?req=ryan", {method: 'POST'})
    .then(res => res.json())
    .then(data => this.setState({token: data.payload}))
    // .then(data => console.log(data));
  }

  addFeedActivites() {
    // Variables
    const key = 'qaq9tzbfa59s'
    const Secret = '87hpnuzt45t9bac2t73u2thk2h8dzdt9w6tcyp7bzth9h5t7qnm6damrg97tfnnj'
    const appID = '100501'
    const userID = 'ryan'
    let stream = require('getstream');

    // Instantiate a new Client (server side)
    let client = stream.connect(key, Secret, appID);

    // Create Token (server side)
    const token = client.createUserToken(userID);

    // Add activity
    let activity = { actor: 2, verb: 'tweet', object: 1, foreign_id: 'tweet:1' };

    let feed = client.feed('user', userID);
    // activity = { actor: 'steve', verb: 'pin', object: 'Place:42' };
    const add = feed.addActivity(activity)
    return feed
  }


  postMsg() {
    this.getToken();
    console.log(this.state.inputValue);
    // fetch('http://example.com/movies.json')
    // .then(response => response.json())
    // .then(data => console.log(data));
    // this.setState(state => ({
    // }));
        // console.log('hi!');
    // let result = this.addFeedActivites();
    // console.log(result);
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
          
          {/* APP */}
            <StreamApp
              apiKey="qaq9tzbfa59s"
              appId="100501"
              // token = 
              token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoicnlhbiJ9.Va9Thg7gl4GtW3z1Q18FsHxYL7P0rAbXJtzpQTAr4KQ' 
              // token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoidXNlci1vbmUifQ.3bHobv2wuUyrUtohiSmyZ744RUzGnoWkMEPI3zFaq78"
            >
              <NotificationDropdown notify/>
              <FlatFeed
                notify
              />
            </StreamApp>
        
        {/* APP */}
        
        
        </div></Footer>
      </Layout>
    </Layout>
    </Layout>
      </div>      
    );
  }
}

export default App;
