import React, { Component } from 'react';
import { connect } from 'react-redux';
import { stateToProps } from 'utilities';

import {
  MODAL_NONE,
  MODAL_USER_SELECTOR,
  MODAL_ROOM_SELECTOR,
} from 'utilities/constants';

import RoomSelector from 'containers/modals/RoomSelector';
import UserSelector from 'containers/modals/UserSelector';

class Modal extends Component {
  wrapperElement = null

  handleWrapperClick = (evt) => {
    if (evt.target === this.wrapperElement) {
      // DEV-SCHOOL: closeModal action should be called here.
    }
  }

  render() {
    // DEV-SCHOOL: The wrapper should have class additional 'open' when a modal is active.
    const modalClass = 'modal-wrapper';

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
    return (
      <div
        ref={(elem) => { this.wrapperElement = elem; }}
        className={modalClass}
        onClick={this.handleWrapperClick}
      >
        {/* DEV-SCHOOL: The correct modal component should be embedded here */}
      </div>
    );
  }
}

// DEV-SCHOOL: Supply the connect HOC with the correct parameters.
export default connect()(Modal);
