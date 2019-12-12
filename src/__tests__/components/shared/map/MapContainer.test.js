import React from 'react';
import { shallow, mount } from 'enzyme';
import MapWrapper, {
  MapContainer
} from '../../../../components/shared/map/MapContainer';

describe('Map container', () => {
  let map = shallow(<MapContainer />);
  test('should map should render', () => {
    expect(map.find('InfoWindow').exists()).toBe(true);
  });
  describe('on clicking the marker', () => {
    const mapWrapper = mount(<MapWrapper />);
    test('should ', () => {
      console.log('mapWrapper.debug()', mapWrapper.debug());
      //   map.find('Marker').simulate('click');
    });
  });
});
