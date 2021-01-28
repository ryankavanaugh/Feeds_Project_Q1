import React from 'react';
import { LikeButton, Activity } from 'react-activity-feed';

const CustomActivity = (props) => {
  return (
    <Activity
      {...props}
      Footer={
        <LikeButton {...props} />
       }
    />
  );
};

export default CustomActivity;