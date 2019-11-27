import React from "react";
import { shallow } from "enzyme";
import { RequestActionModal } from "../../../../components/shared/modal/RequestActionModal";
import { request } from "../../../../__mocks__/fixtures";

const props = {
  data: request,
  triggerText: "TestButton",
  handleAction: jest.fn(),
  approveReject: jest.fn(),
  closeModal: jest.fn(),
};

describe("RequestActionModal", () => {
  let requestActionModal;
  requestActionModal = shallow(<RequestActionModal {...props} />);

  test("should have the confirm action button", () => {
    expect(requestActionModal.find(".action").text()).toEqual(
      props.triggerText,
    );
  });

  test("should have the cancle action button", () => {
    expect(requestActionModal.find(".cancel").text()).toEqual("Cancel");
  });

  test("should call the `handleAction` function when the action button click", () => {
    const spyAction = jest.spyOn(requestActionModal.instance(), "handleAction");
    requestActionModal.find(".action").simulate("click");
    expect(spyAction).toHaveBeenCalled();
  });
});
