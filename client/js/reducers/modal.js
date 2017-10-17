import { createReducer } from 'utilities';
import { ModalsState } from 'records';

export default createReducer(new ModalsState(), {
  OPEN_MODAL: (state, component) => state
    .set('open', true)
    .set('component', component),

  CLOSE_MODAL: state => state
    .set('open', false),
});
