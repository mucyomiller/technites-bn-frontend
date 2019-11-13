/* eslint-disable comma-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import placeholder from "../../assets/house_place_holder.jpg";

class ImageContainer extends Component {
  render() {
    return (
      <div className="image-container">
        <div>
          <img
            src={
              this.props.images[1] !== undefined
                ? this.props.images[1].images.image1
                : placeholder
            }
            alt=""
          />
        </div>
        <div>
          <img
            src={
              this.props.images[1] !== undefined
                ? this.props.images[1].images.image2
                : placeholder
            }
            alt=""
          />
        </div>
      </div>
    );
  }
}

export default ImageContainer;
