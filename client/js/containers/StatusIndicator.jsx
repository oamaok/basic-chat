import React from 'react';
import { connect } from 'react-redux';
import { stateToProps } from 'utilities';

function StatusIndicator({ user, users }) {
  const online = users.connectedUsers.includes(user.id);
  const className = online ? 'status-circle online' : 'status-circle';

  return (
    <div className={className} />
  );
}

export default connect(stateToProps('users'))(StatusIndicator);
