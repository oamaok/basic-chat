import React, { Component } from 'react';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import { stateToProps } from 'utilities';

import { closeModal } from 'actions/modal';
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
      this.props.closeModal();
    }
  }

  render() {
    const components = Map([
      [MODAL_NONE, null],
      [MODAL_ROOM_SELECTOR, <RoomSelector />],
      [MODAL_USER_SELECTOR, <UserSelector />],
    ]);

    const { modal } = this.props;

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
    return (
      <div
        ref={(elem) => { this.wrapperElement = elem; }}
        className={modal.open ? 'modal-wrapper open' : 'modal-wrapper'}
        onClick={this.handleWrapperClick}
      >
        {components.get(modal.component)}
      </div>
    );
  }
}

export default connect(stateToProps('modal'), {
  closeModal,
})(Modal);
