/* eslint-disable react/prop-types */
import React, { Component } from 'react';

class RoomList extends Component {
  render() {
    const { rooms } = this.props;
    return (
      <>
        {rooms.map(room => {
          return (
            <div key={room.id} className="acc__resources__item">
              <div className="acc__resources__item__img">
              {!room.images ? (
                <img
                  class="composition__photo--acc"
                  src="https://img.icons8.com/officel/200/000000/image-file.png"
                  alt="not found"
                />
              ) : (
                <img
                  src={room.images[0]}
                  alt="room"
                  class="composition__photo--acc"
                />
              )}
              </div>
              <div className="acc-details">
                <h3>{`${room.name} - ${room.room_type} room`}</h3>
                <br />
                <h4>{room.status ? 'Available' : 'Unavailable'}</h4>
              </div>
            </div>
          );
        })}
      </>
    );
  }
}

export default RoomList;
