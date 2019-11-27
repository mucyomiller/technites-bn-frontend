/* eslint-disable react/prop-types */
import React, { Component } from "react";

class RoomList extends Component {
  render() {
    const { rooms } = this.props;
    return (
      <>
        {rooms.map((room) => {
          const url = `url(${room.images[0].image_url})`;
          return (
            <div key={room.id} className="acc__resources__item">
              <div
                className="acc__resources__item__img"
                style={{ backgroundImage: url }}
              />
              <div className="acc-details">
                <h3>{`${room.name} - ${room.room_type} room`}</h3>
                <br />
                <h4>{room.status ? ("Available") : ("Unavailable")}</h4>
              </div>
            </div>
          );
        })}
      </>
    );
  }
}

export default RoomList;
