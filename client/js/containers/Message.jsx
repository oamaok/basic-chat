import React from 'react';
import { connect } from 'react-redux';
import { stateToProps } from 'utilities';

function Message({ messages, users }) {
  const { allUsers } = users;

  const message = messages[0];

  const user = allUsers.get(message.userId);

  const padZero = num => `0${num}`.substr(-2);

  const year = message.createdAt.getFullYear();
  const month = padZero(message.createdAt.getMonth() + 1);
  const date = padZero(message.createdAt.getDate());
  const hour = padZero(message.createdAt.getHours());
  const minute = padZero(message.createdAt.getMinutes());

  const dateString = `${year}-${month}-${date} ${hour}:${minute}`;

  const formatContent = msg => (
    <div className="contents">
      {msg.contents.split('\n').map(split => <p>{split}</p>)}
    </div>
  );

  return (
    <div className={message.sent ? 'message' : 'message unsent'}>
      <div className="sender">{user.firstName} {user.lastName}</div>
      <div className="date">{dateString}</div>
      {messages.map(formatContent)}
      {message.sent &&
        <div className="tools">

        </div>
      }
      <div className="clearfix" />
    </div>
  );
}

export default connect(stateToProps('users'))(Message);
