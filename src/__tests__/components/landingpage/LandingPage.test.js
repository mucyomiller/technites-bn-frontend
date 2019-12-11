import React from "react";
import { shallow } from "enzyme"
import { LandingPage } from "../../../components/landing-page/LandingPage";

let landingPage;
const props = {
    isAuthenticated: false
}

describe('Landing page when user is not authenticated', () => {
    landingPage = shallow(<LandingPage {...props}/>);
    test('should load the landing page', () => {
        expect(landingPage.find("Connect(LoginForm)").exists()).toBe(true);
    })
    
})

describe('Landing page when user is authenticated', () => {
    beforeEach(() => {
        props.isAuthenticated = true;
    });

    landingPage = shallow(<LandingPage {...props}/>);
    test('should load the landing page', () => {
        // console.log('landingPage.debug()', landingPage.debug())
    })
    
})
