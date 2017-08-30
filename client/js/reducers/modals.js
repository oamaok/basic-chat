import { createReducer } from 'utilities';
import { ModalsState } from 'records';

export default createReducer(new ModalsState(), {
  OPEN_ROOM_SELECTOR: state => state.set('roomSelectorOpen', true),
  CLOSE_ROOM_SELECTOR: state => state.set('roomSelectorOpen', false),

  OPEN_USER_SELECTOR: state => state.set('userSelectorOpen', true),
  CLOSE_USER_SELECTOR: state => state.set('userSelectorOpen', false),
});
