"use client";
import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import Image from "next/image";
import styled from "@emotion/styled";
import PlayIcon from "../Icons/PlayIcon";
import useMediaQuery from '@mui/material/useMediaQuery';

export default function BackgroundVideo({
  videoURL,
  placeholderImage,
  className,
  showCompressedImage,
}) {
const [hideBackgroundImage, setHideBackgroundImage] =useState(false)
const matches = useMediaQuery('(min-width:1000px)');
if(!matches) return null
  // Add a callback function to trigger when the video is ready
  const handleVideoReady = () => {
    setTimeout(()=> { 
      setHideBackgroundImage(true)
    },2000)

  };

  const imageURL = showCompressedImage
    ? placeholderImage.sizes.large
    : placeholderImage.url;
  return (
    <ContainerStyled className={className}>
      <div className="overlay"></div>
      <div className="video-wrapper">
        
          <>
            <div className="video-overlay"></div>
            <Image
              src={imageURL} // Replace with your placeholder image path
              fill
              alt={placeholderImage.alt}
              sizes="100vw"
              placeholder="blur" // Add the blur placeholder attribute
              blurDataURL={placeholderImage.sizes.thumbnail} // Low-resolution version of the image for blur effect
              priority // Ensure image loads as soon as possible
              onLoad={handleVideoReady}
              style={{
                objectFit: "cover",
              }}
            />
          </>
      

        {hideBackgroundImage && (
          <ReactPlayer
            url={videoURL}
            width="100%"
            height="100%"
            playing
            loop
            muted
            style={{position:"absolute", zIndex: 7}}
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
