"use client";
import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import Image from "next/image";
import styled from "@emotion/styled";
import PlayIcon from "../Icons/PlayIcon";
export default function BackgroundVideo({
  videoURL,
  placeholderImage,
  className,
  showCompressedImage,
}) {
  const imageURL = showCompressedImage
    ? placeholderImage.sizes.large
    : placeholderImage.url;
  const [videoLoaded, setVideoLoaded] = useState(false); // New state for tracking video load
  useEffect(() => {
    setVideoLoaded(true);
  }, []);
  return (
    <ContainerStyled className={className}>
      <div className="overlay"></div>
      <div className="video-wrapper">
        {!videoLoaded && (
          <>
            <div className="video-overlay"></div>
            <Image
              src={imageURL} // Replace with your placeholder image path
              fill
              alt={placeholderImage.alt}
              style={{
                objectFit: "cover", // cover, contain, none
              }}
            />
          </>
        )}

        {videoLoaded && (
          <ReactPlayer
            url={videoURL}
            width="100%"
            height="100%"
            playing
            loop
            muted
          />
        )}
      </div>
    </ContainerStyled>
  );
}
const ContainerStyled = styled.div`
  .video-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .video-overlay {
    background: rgba(31, 101, 135, 0.3);
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 8;
  }
  .img-wrapper {
    img {
      object-fit: cover;
    }
  }
`;
