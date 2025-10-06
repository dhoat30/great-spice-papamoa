import React from 'react'
import styled from '@emotion/styled'
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Container from '@mui/material/Container';

export default function BeigeSection({title, description, backgroundImage }) {
  return (
<Section>
        {backgroundImage && 
        <div className="image-wrapper" style={{ paddingBottom: `${backgroundImage.height / backgroundImage.width * 100}%` }}>
          <Image src={backgroundImage.url} alt={title} fill />
        </div>
        }
    <Container maxWidth="lg" className="container ">
      <Typography variant="h2" component={"h2"} color={"#1d1d1d"}>{title}</Typography>
      <Typography  className="mt-24" variant="body1" component={"p"} color={"#1d1d1d"}> {description}</Typography>
    </Container>
  </Section>
  ) 
}

const Section = styled.section`
position: relative;
.image-wrapper{ 
    @media (max-width: 800px){
        padding-bottom: 60% !important; 
    } 
        @media (max-width: 500px){
        padding-bottom: 140% !important; 
    } 
}
.container{ 
    position: absolute; 
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    max-width: 900px; 
    z-index: 10; 
}
`; 