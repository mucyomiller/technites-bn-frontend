import React from 'react';
import { storiesOf } from "@storybook/react";
import Provider from "../../.storybook/Provider";
import HomeNav from "../components/home-nav/HomeNav";
import '../styles/App.scss';
import '../components/home-nav/HomeNav.scss';

const props = {
  history: {
    push: () => { },
  },
  location: {},
  toggleNotPaneHandler: () => { },
  notificationCounter: 5
};

storiesOf('Dashboard | HomeNav', module)
  .addDecorator(story => <Provider story={story()} />)
  .add('HomeNav', () => (<HomeNav {...props} />));

