import React from "react";

import "./gallery.scss";
import { Container } from "react-bootstrap";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";

const Gallery = () => {
  const images = [
    {
      original: "https://gems.edu.np/assets/IMG_3284-C-XuhZrv.jpg",
      thumbnail: "https://gems.edu.np/assets/IMG_3284-C-XuhZrv.jpg",
    },
    {
      original: "https://gems.edu.np/assets/thunder3-y15vqFFY.jpg",
      thumbnail: "https://gems.edu.np/assets/thunder3-y15vqFFY.jpg",
    },
    {
      original: "https://gems.edu.np/assets/DSC_0666-BEmgt8lj.jpg",
      thumbnail: "https://gems.edu.np/assets/DSC_0666-BEmgt8lj.jpg",
    },
  ];
  return (
    <>
      <div className="gallry-rea">
        <Container>
          <h1>Explore Our Moments</h1>
          <p>
            Dive into our Gallery to relive the excitement and achievements of
            Thunderbolts. Browse through vibrant photos and videos capturing the
            action, camaraderie, and memorable moments from our events and
            training sessions. See the passion and energy that drives our
            community and get inspired for your own journey with us.
          </p>
          <div className="gallery-App">
            <ImageGallery items={images} thumbnailPosition="left" />
          </div>
        </Container>
      </div>
    </>
  );
};

export default Gallery;
