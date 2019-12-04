/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { retrieveProfile } from '../../redux/actions/profileAction';
import SideBar from '../side-bar';
import HomeNav from '../home-nav/HomeNav';
import Footer from '../footer';
import '../../styles/add-accommodation.scss';
import {
  createRoom,
  getMyAccommodations
} from '../../redux/actions/accommodatinsAction';

export class AddRoom extends Component {
  state = {
    data: {
      services: [],
      amenities: [{ amenity: 'amenity 1' }],
      images: [],
      status: true,
      cost: 10
    }
  };

  componentDidMount() {
    this.props.retrieveProfile();
    this.props.getMyAccommodations();
  }

  handleInputChange = ({ target: input }) => {
    const data = { ...this.state.data };
    data[input.id] = input.value;
    this.setState({ data });
  };

  handleCheckbox = ({ target: input }) => {
    this.state.data.services.push({ service: input.value });
  };

  handleImageSelect = ({ target: input }) => {
    const images = Object.values(input.files);
    images.forEach(image => this.state.data.images.push(image));
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      data: {
        accommodation_id,
        name,
        room_type,
        description,
        cost,
        status,
        images
      }
    } = this.state;
    let form_data = new FormData();
    form_data.append('accommodation_id', accommodation_id);
    form_data.append('name', name);
    form_data.append('room_type', room_type);
    form_data.append('description', description);
    form_data.append('cost', cost);
    form_data.append('status', status);
    images.forEach(image => form_data.append('images', image, image.name));
    this.props.createRoom(form_data);
  };

  render() {
    const { isLoading, user, accommodations} = this.props;
    
    return (
      <>
        <HomeNav user={user} />
        <SideBar userRole={user.role_value} />
        <>
          <div className="current-page">
            <div className="u-margin-bottom-small">
              <h2 className="heading-secondary--current-page">Add Room</h2>
            </div>
          </div>
        </>
        <section className="section-book">
          <div className="row">
            <div className="book">
              <div className="book__form">
                <form onSubmit={this.handleSubmit} className="form">
                  <div className="form__group">
                    <div className="form__select-group">
                      <select
                        id="accommodation_id"
                        onChange={this.handleInputChange}
                        className="dropbtn"
                        required
                      >
                        <option value="">Chose accommodation? </option>
                        {!accommodations ? (null) : (accommodations.map(accommodation => {
                          return <option key={accommodation.id} value={accommodation.id}>{accommodation.accommodation_name}</option>
                        }))}
                      </select>
                    </div>
                  </div>

                  <div className="form__group">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="form__input"
                      placeholder="Room name"
                      required
                      onChange={this.handleInputChange}
                    />
                    <label htmlFor="name" className="form__label">
                      Room name
                    </label>
                  </div>
                  <div className="form__group">
                    <div className="form__select-group">
                      <select
                        id="room_type"
                        onChange={this.handleInputChange}
                        className="dropbtn"
                        required
                      >
                        <option value="">Type of room? </option>
                        <option value="single">Single room</option>
                        <option value="double">Double room</option>
                        <option value="triple">Tripple room</option>
                        <option value="quad">Quad room</option>
                        <option value="queen">Queen room</option>
                        <option value="king">King room</option>
                        <option value="studio">Studio room</option>
                      </select>
                    </div>
                  </div>

                  <div className="form__group">
                    <textarea
                      id="description"
                      name="description"
                      type="textarea"
                      className="form__textarea"
                      placeholder="description"
                      required
                      onChange={this.handleInputChange}
                    />
                    <label htmlFor="desc" className="form__label">
                      Description
                    </label>
                  </div>
                  <div className="form__group">
                    <input
                      id="images"
                      type="file"
                      className="form__input"
                      placeholder="images"
                      name="myImage"
                      accept="image/*"
                      onChange={this.handleImageSelect}
                      multiple
                      required
                    />
                  </div>
                  <div className="form__group">
                    <button className="btn btn--primary">
                    {isLoading ? ("Saving...") : (<>Save</> )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }
}

AddRoom.propTypes = {
  retrieveProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  accommodations: state.accommodations.hostAccommodations,
  user: state.profile.user,
  locations: state.accommodations.locations,
  isLoading: state.accommodations.isLoading
});

const mapDispatchToProps = {
  retrieveProfile,
  createRoom,
  getMyAccommodations
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRoom);
