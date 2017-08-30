export function addMessages(messages) {
  return {
    type: 'ADD_MESSAGES',
    data: messages,
  };
}

export function addMessage(message) {
  return {
    type: 'ADD_MESSAGE',
    data: message,
  };
}

export function markMessageAsSent(localId, messageId) {
  return {
    type: 'MARK_AS_SENT',
    data: {
      localId,
      messageId,
    },
  };
}
