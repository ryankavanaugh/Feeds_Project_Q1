import React, { Component, useState } from 'react';
import './App.css';
//import CustomActivity from './CustomActivity/CustomActivity';
import { Layout } from 'antd';
import 'react-activity-feed/dist/index.css';
import { StreamApp, StatusUpdateForm, NotificationDropdown, LikeButton,
  FlatFeed, Activity, CommentItem, CommentField, CommentList } from 'react-activity-feed';
import { connect } from 'getstream';
const stream = require('getstream');
const { Header, Footer, Sider, Content } = Layout;

// To do
// login that takes you to your feed
// toggle buttons that change feed
// aggregated notification feed that takes you to the post
// photos, comments, + reactions, will CDN be an issue with photos?

const CustomActivity = (props) => {
  return (
    <Activity
      {...props}
      Footer={
      
        <div>
        <LikeButton {...props} />
        <CommentField
                      activity={props.activity}
                      // onAddReaction={props.onAddReaction} 
                      />
                      <CommentList
                      activityId={props.activity.id}
                      CommentItem={(props) => (
                       <div>
                          <CommentItem {...props} />
                          <LikeButton
                            reaction={props.comment}
                            {...props}
                        />
                        </div>)} />
        </div>

        // <div>
        // <LikeButton {...props} />
        // <CommentField
        // activity={props.activity}
        // onAddReaction={props.onAddReaction} />
        // </div>

        
      }
    />
  );
};
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
   fetch("http://localhost:3002/token",
    {
      method: "post",
      headers: { "Content-Type" : "application/json"},
      body: JSON.stringify({
        input: 'seetha'
      })
    }).then(response => response.json())
    .then(token => { return token })
  }
  // life cycle hook
  componentDidMount() {
    this.getToken(this.state.userID)
    console.log(this.state.token)
  }

  updateInputValue(newInputValue) {
    this.setState({inputValue: newInputValue});
    console.log(this.state.inputValue);
  }

  createFollowRelationship = async () => {
    //userOne follows UserTwo
    const key = 'qaq9tzbfa59s'
    const appID = '100501'
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiamFjayJ9.vG9zkuZvcQpRftbYFpNdxBKNxvCNV-gG3SJtJmP_bUg';
    const userOne = 'jack';
    const userTwo = 'ryan';
    const client = stream.connect( key, token, appID);
    // const feed = client.feed('timeline', this.state.userID, token);
    const feed = client.feed('timeline', userOne, token);
    feed.follow('timeline', userTwo);
  }

  postMsg = async () => {
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiamFjayJ9.vG9zkuZvcQpRftbYFpNdxBKNxvCNV-gG3SJtJmP_bUg';
    // // const userID='seetha';
    // // const userID = this.state.userID

    const key = 'qaq9tzbfa59s'
    const appID = '100501'
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiamFjayJ9.vG9zkuZvcQpRftbYFpNdxBKNxvCNV-gG3SJtJmP_bUg';
    const userID = 'jack';
    const client = stream.connect( key, token, appID);
    // const feed = client.feed('timeline', this.state.userID, token);
    const feed = client.feed('timeline', userID, token);
    // await feed.follow('ryan');
    
    const activityfeed = {
      'actor': "SU:"+userID,
      'verb': this.state.inputValue,
      'object': this.state.inputValue,
      'attachments': 'https://image.shutterstock.com/image-photo/portrait-tiger-black-background-600w-1543677188.jpg',
      'time': new Date()
      };
    const addactivity = await feed.addActivity(activityfeed);
    }

  postTimelineMsg = async () => {
      const key = 'qaq9tzbfa59s'
      const appID = '100501'
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoicnlhbiJ9.Va9Thg7gl4GtW3z1Q18FsHxYL7P0rAbXJtzpQTAr4KQ';
      const userID = 'ryan';
      const client = stream.connect( key, token, appID);
      // const feed = client.feed('timeline', this.state.userID, token);
      const feed = client.feed('timeline', userID, token);
      
      
      const activityfeed = {
        'actor': "SU:"+userID,
        'verb': this.state.inputValue,
        'object': this.state.inputValue,
        'attachments': 'https://image.shutterstock.com/image-photo/portrait-tiger-black-background-600w-1543677188.jpg',
        'time': new Date()
        };
      const addactivity = await feed.addActivity(activityfeed);
      }

  render() {
    return (
      <div className="App">
      <Layout>
      <Header><h1>Seetha & Ryan's Feeds Project</h1></Header>
      <Layout>
      <Sider style={{background:'white'}}>
       <div id="sidebarContainer">
       Global Feed
       Personal Timeline
       Notification 
       </div>
        </Sider>

        <Content>
        <div id="postContainer">
        <br></br>
        <b>Global Feed/Jack</b>
        <br></br>
        <br></br>
        <div></div>
        
        <textarea onChange={e => this.updateInputValue(e.target.value)}></textarea>
        <div></div>
        <br></br>
        <button onClick={() => this.postMsg()}>
        Post
        </button>
            <br></br>
          
        <StreamApp
            // const key = 'qaq9tzbfa59s'
            // const appID = '100501'
            // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiamFjayJ9.vG9zkuZvcQpRftbYFpNdxBKNxvCNV-gG3SJtJmP_bUg';
            //  apiKey="3ektw92qb4ew"
            //  appId="93749"
            //  token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoic2VldGhhIn0.ZDepaoDtrvJXaWAQhVxPOUzsIy7LG5T_qrEPZt9PPzE"
            apiKey="qaq9tzbfa59s"
            appId="100501"
           token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiamFjayJ9.vG9zkuZvcQpRftbYFpNdxBKNxvCNV-gG3SJtJmP_bUg"
        >
          <FlatFeed Activity={CustomActivity} notify />
          <StatusUpdateForm feedGroup="timeline" />
        </StreamApp>
        </div>

        <div id="postContainer">
          <br></br>
        <b>Personal Timeline/Ryan</b> 
        <br></br>
        <br></br>
        <div></div>
        <textarea onChange={e => this.updateInputValue(e.target.value)}></textarea>
        <div></div>
        <br></br>
        <button onClick={() => this.postTimelineMsg()}>
        Post
        </button>
        <button onClick={() => this.createFollowRelationship()}>
        Create Follow Relationship
        </button>
            <br></br>
        <StreamApp
            apiKey="qaq9tzbfa59s"
            appId="100501"
           token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoicnlhbiJ9.Va9Thg7gl4GtW3z1Q18FsHxYL7P0rAbXJtzpQTAr4KQ"
        >
          <FlatFeed Activity={CustomActivity} notify />
          <StatusUpdateForm feedGroup="timeline" />
        </StreamApp>
        </div>

        </Content>
        </Layout>
        <Footer> Footer
          </Footer>
      </Layout>

      </div>
    );
  }
}
export default App;