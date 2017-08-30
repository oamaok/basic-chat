export function setAvailableRooms(rooms) {
  return {
    type: 'SET_AVAILABLE_ROOMS',
    data: rooms,
  };
}

export function addAvailableRoom(room) {
  return {
    type: 'ADD_AVAILABLE_ROOM',
    data: room,
  };
}

export function setActiveRooms(roomIds) {
  return {
    type: 'SET_ACTIVE_ROOMS',
    data: roomIds,
  };
}

export function addActiveRoom(roomId) {
  return {
    type: 'ADD_ACTIVE_ROOM',
    data: roomId,
  };
}

export function setCurrentRoom(roomId) {
  return {
    type: 'SET_CURRENT_ROOM',
    data: roomId,
  };
}


export function createRoomRequest() {
  return {
    type: 'CREATE_ROOM_REQUEST',
  };
}

export function createRoomRequestFailure(error) {
  return {
    type: 'CREATE_ROOM_REQUEST_FAILURE',
    data: error,
  };
}

export function createRoomRequestSuccess() {
  return {
    type: 'CREATE_ROOM_REQUEST_SUCCESS',
  };
}
