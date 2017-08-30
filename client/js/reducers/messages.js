import { Set } from 'immutable';
import { createReducer } from 'utilities';
import { MessagesState, MessageRecord } from 'records';

export default createReducer(new MessagesState(), {
  ADD_MESSAGES: (state, messages) => state
    .update('allMessages', msgs => msgs.concat(messages.map(
      message => [message.id, (new MessageRecord(message)).set('createdAt', new Date(message.createdAt))]
    )))
    .update('roomMessages', roomMessages => messages.reduce(
      (map, message) => map.update(message.roomId, msgs => (msgs || Set()).add(message.id)),
      roomMessages
    )),

  ADD_MESSAGE: (state, message) => state
    .update('allMessages', msgs => msgs
      .set(message.id, new MessageRecord(message).set('createdAt', new Date(message.createdAt)))
    )
    .updateIn(['roomMessages', message.roomId], msgs => (msgs || Set()).add(message.id)),


  MARK_AS_SENT: (state, { localId, messageId }) => state
    .update('allMessages', messages => messages
      .set(messageId, messages.get(localId).set('sent', true).set('id', messageId))
      .delete(localId)
    )
    .updateIn(['roomMessages', state.allMessages.get(localId).roomId],
      messages => messages.delete(localId).add(messageId)
    ),
});
