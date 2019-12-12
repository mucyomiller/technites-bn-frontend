import React from "react";
import { storiesOf } from "@storybook/react";
import Provider from "../../.storybook/Provider";
import '../styles/App.scss'

import { Register } from '../components/register-page/RegisterPage';
const props = {
    history: {
        push: () => { },
    },
    location: {},
    displayVerifyConfirmation: false
};
storiesOf('Authentication | Register', module)
    .addDecorator(story => <Provider story={story()} />)
    .add('Register', () => (<Register {...props} />));