import React from "react";
import { storiesOf } from "@storybook/react";
import AddHost from "../components/admin/AddHost";
import Provider from "../../.storybook/Provider";
import "../components/admin/AddHost.scss";
import "../components/side-bar/sidebar.scss";
const props = {
    history: {
      push: () => { },
    },
    location: {},
    toggleNotPaneHandler: () => { },
    notificationCounter: 5
  };
  storiesOf('Dashboard | AddHost', module)
    .addDecorator(story => <Provider story={story()} />)
    .add('AddHost', () => (<AddHost {...props} />));
    