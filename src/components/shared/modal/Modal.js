import React, { Component, Fragment } from "react";
import ModalContent from "./RequestActionModal";
import ModalTrigger from "./ModalTrigger";

export class Modal extends Component {
  constructor() {
    super();
    this.state = {
      isShown: false,
    };
  }

  showModal = () => {
    this.setState({ isShown: true }, () => {
      this.closeButton.focus();
    });
    this.toggleScrollLock();
  };

  closeModal = () => {
    this.setState({ isShown: false });
    this.TriggerButton.focus();
    this.toggleScrollLock();
  };

  onKeyDown = (event) => {
    if (event.keyCode === 27) {
      this.closeModal();
    }
  };

  onClickOutside = (event) => {
    if (this.modal && this.modal.contains(event.target)) return;
    this.closeModal();
  };

  toggleScrollLock = () => {
    document.querySelector("html").classList.toggle("scroll-lock");
  };

  render() {
    return (
      <>
        <ModalTrigger
          showModal={this.showModal}
          buttonRef={n => (this.TriggerButton = n)}
          triggerText={this.props.triggerText}
          action={this.props.action}
        />
        {this.state.isShown ? (
          <ModalContent
            modalRef={n => (this.modal = n)}
            buttonRef={n => (this.closeButton = n)}
            closeModal={this.closeModal}
            onKeyDown={this.onKeyDown}
            onClickOutside={this.onClickOutside}
            triggerText={this.props.triggerText}
            data={this.props.data}
            action={this.props.action}
            status={this.props.status}
          />
        ) : (
          <Fragment />
        )}
      </>
    );
  }
}

export default Modal;
