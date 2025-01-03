import styled from "@emotion/styled";
import React from "react";
import Image from "next/image";
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from "next/link";
export default function JustImageHero({ desktopImage, mobileImage, cta }) {
  const matches = useMediaQuery('(min-width:500px)');
  const imagePadding = matches ? ((desktopImage?.height / desktopImage?.width) * 100) : ((mobileImage?.height / mobileImage?.width) * 100);
  console.log('cta', cta);
  return (
    <Section
    
      href={cta?.url}
    >
      <div className="desktop-image image-wrapper"   style={{
        paddingBottom: `${(desktopImage?.height / desktopImage?.width) * 100}%`,
      }}>
   
        <Image src={ desktopImage?.url } alt={ desktopImage.alt } fill quality={100} />

      </div>
      <div className="mobile-image image-wrapper"  style={{
        paddingBottom: `${(mobileImage?.height / mobileImage?.width) * 100}%`,
      }}>
  
        <Image src={mobileImage?.url} alt={ mobileImage.alt } fill quality={100} />
   
      </div>
    </Section>
  );
}
const Section = styled(Link)`
  position: relative;
  width: 100%;
  display: block;
  .desktop-image{ 
    display: none ; 
@media (min-width: 600px) {
  display:block; 
  }
} 
.mobile-image{ 
@media (min-width: 600px) {
  display:none; 
  }
} 
`;
