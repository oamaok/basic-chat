export function setAvailableRooms(rooms) {
  return {
    type: 'SET_AVAILABLE_ROOMS',
    data: rooms,
  };
}

export function setActiveRooms(roomIds) {
  return {
    type: 'SET_ACTIVE_ROOMS',
    data: roomIds,
  };
}
