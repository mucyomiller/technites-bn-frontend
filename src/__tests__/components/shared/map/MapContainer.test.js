import React from "react"
import { shallow } from "enzyme";
import {MapContainer} from "../../../../components/shared/map/MapContainer"

describe('Map container', () => {
    let map = shallow(<MapContainer />)
    test('should map should render', () => {
        expect(map.find("InfoWindow").exists()).toBe(true)
    })
    
})
