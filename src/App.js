import React, { Component, useState } from 'react';
import './App.css';
import CustomActivity from './CustomActivity/CustomActivity';
import { Layout } from 'antd';
import 'react-activity-feed/dist/index.css';
import { StreamApp, StatusUpdateForm, NotificationDropdown, FlatFeed, Activity } from 'react-activity-feed';
import { connect } from 'getstream';


// To do:
// connect the feed
// add activities to the feed
// 


const { Header, Footer, Sider, Content } = Layout;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      postText: '',
      postcount: '',
      items: [],
      token: '',
      userID: 'ryan'
    };
  }

  getToken(userName){
    fetch("http://localhost:1801/feedstoken?req=" + userName, {method: 'POST'})
    .then(res => res.json())
    .then(data => this.setState({token: data.payload}))
    console.log("token:" + this.state.token)
  }

  // life cycle hook
  componentDidMount() {
    this.getToken('ryan')
    console.log(this.state.token)    
  }

  updateInputValue(newInputValue) {
    this.setState({inputValue: newInputValue});
    console.log(this.state.inputValue);
  }

  postMsg = async () => {
    this.getToken('ryan');
    console.log(this.state.inputValue);
    const key = 'qaq9tzbfa59s'
    const appID = '100501'
    const client = connect(key, this.state.token, appID)
    console.log(client)
    const feed = client.feed('user', 'ryan', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidW5kZWZpbmVkIn0.Pw_RkXrzD7zXqsYixYYkQ7LqCefmvyyWRGm_3gsuSQ4')
    console.log(feed)
    const activityfeed = {
      'actor': 'ryan',
      'verb': this.state.inputValue,
      'object': 'Testing Feed',
      'attachments': 'https://image.shutterstock.com/image-photo/portrait-tiger-black-background-600w-1543677188.jpg',
      'time': '2020-11-21T20:30:45.123'
      };
      console.log(activityfeed)
    const addactivity = await feed.addActivity(activityfeed);
    console.log(addactivity);
    // const add = feed.addActivity(addactivity)
    // return feed
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
            {/* <StreamApp
              apiKey="qaq9tzbfa59s"
              appId="100501"
             token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidW5kZWZpbmVkIn0.Pw_RkXrzD7zXqsYixYYkQ7LqCefmvyyWRGm_3gsuSQ4"
            >
              <NotificationDropdown notify/>
              <FlatFeed
                notify
              />
            </StreamApp>  */}
        {/* APP */}

        <StreamApp
            // apiKey="3ektw92qb4ew"
            // appId="93749"
            // token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoic2VldGhhIn0.ZDepaoDtrvJXaWAQhVxPOUzsIy7LG5T_qrEPZt9PPzE"
            apiKey="qaq9tzbfa59s"
            appId="100501"
           token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidW5kZWZpbmVkIn0.Pw_RkXrzD7zXqsYixYYkQ7LqCefmvyyWRGm_3gsuSQ4"
          
        >
          <FlatFeed Activity={CustomActivity} notify />
          <StatusUpdateForm feedGroup="timeline" />
        </StreamApp>
        
        </div></Footer>
      </Layout>
    </Layout>
    </Layout>
      </div>      
    );
  }
}

export default App;





// // next: interact with stream api (look at doing this inside life cycle hook or constructor)
// // Feed.activity
// // Check out life cycle hooks - always want to grab feed, so it can be stored as a value to manipulate, did component now??
// // Server side end points - Seetha

// const key = 'qaq9tzbfa59s'
// const secret = '87hpnuzt45t9bac2t73u2thk2h8dzdt9w6tcyp7bzth9h5t7qnm6damrg97tfnnj'
// const appID = '100501'
// let stream = require('getstream');
// let client = stream.connect(key, null, appID);
// let userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoicnlhbiJ9.Va9Thg7gl4GtW3z1Q18FsHxYL7P0rAbXJtzpQTAr4KQ'

// const newFeed = client.feed('user', 'ryan', userToken);
// // console.log(newFeed);
// const activity = newFeed.addActivity({
//   actor: 'ryan', 
//   tweet: 'Hello world', 
//   verb: 'tweet', 
// })