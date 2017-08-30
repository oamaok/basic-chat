export function setUsers(users) {
  return {
    type: 'SET_USERS',
    data: users,
  };
}

export function addUser(user) {
  return {
    type: 'ADD_USER',
    data: user,
  };
}

export function setConnectedUsers(userIds) {
  return {
    type: 'SET_CONNECTED_USERS',
    data: userIds,
  };
}

export function addConnectedUser(userId) {
  return {
    type: 'ADD_CONNECTED_USER',
    data: userId,
  };
}

export function removeConnectedUser(userId) {
  return {
    type: 'REMOVE_CONNECTED_USER',
    data: userId,
  };
}
