import { createReducer } from 'utilities';
import { ModalsState } from 'records';

export default createReducer(new ModalsState(), {
  // DEV-SCHOOL: Implement the following reducers.
  OPEN_MODAL: (state, component) => state,
  CLOSE_MODAL: state => state,
});
