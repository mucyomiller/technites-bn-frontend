import React, { Component } from 'react';
class ModalTrigger extends Component {
  render() {
    const modalStyleClass = `modal-button ${this.props.action} request-card--modal`
    return (
      <button
        ref={this.props.buttonRef}
        onClick={this.props.showModal}
        className={modalStyleClass}
      >
        {this.props.triggerText}
        {this.props.data}
        {this.props.status}
      </button>
    );
  }
}

export default ModalTrigger;
