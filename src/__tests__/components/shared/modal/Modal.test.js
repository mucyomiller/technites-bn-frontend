/* eslint-disable import/no-named-as-default */
import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { Modal } from "../../../../components/shared/modal/Modal";
import mockStore from "../../../../__mocks__/mockStore";
import { request } from "../../../../__mocks__/fixtures";

const props = {
  showModal: jest.fn(),
  triggerText: "Trigger text",
  buttonRef: jest.fn(),
  handleAction: jest.fn(),
  data: request,
};

describe("Modal", () => {
  let modal;
  let modalProvider;

  modal = mount(<Modal {...props} />);
  modalProvider = mount(
    <Provider store={mockStore}>
      <Modal {...props} />
    </Provider>,
  );

  test("should have an initial `isShown` state of false", () => {
    expect(modal.state().isShown).toBe(false);
  });

  test("should have `ModalTrigger` present", () => {
    expect(modal.find("ModalTrigger").exists()).toBe(true);
  });

  describe("when the modal is triggered", () => {
    beforeEach(() => {
      modalProvider.find("ModalTrigger").simulate("click");
    });

    test("should have an action button", () => {
      expect(modalProvider.find(".action").text()).toEqual(props.triggerText);
    });

    test("should have a cancel action button", () => {
      expect(modalProvider.find(".cancel").text()).toEqual("Cancel");
    });

    describe("and the action button is clicked", () => {
      beforeEach(() => {
        modalProvider.find(".action").simulate("click");
      });

      test("should close the modal", () => {
        expect(modalProvider.find("Connect(RequestActionModal)").exist).toBe(undefined);
      });
    });

    describe("and the cancel button is clicked", () => {
      beforeEach(() => {
        modalProvider.find(".modal-footer .cancel").simulate("click");
      });
      test("should not have the `RequestActionModal` on clicking the cancel button", () => {
        expect(modalProvider.find("Connect(RequestActionModal)").exist).toBe(undefined);
      });
    });
  });
});
