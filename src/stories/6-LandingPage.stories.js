import React from 'react';
import { storiesOf } from "@storybook/react";
import Provider from "../../.storybook/Provider";
import LandingPage from "../components/landing-page/LandingPage";
import '../styles/App.scss';


storiesOf('LandingPage', module)
  .addDecorator(story => <Provider story={story()} />)
  .add('Landing Page', () => (<LandingPage />));

