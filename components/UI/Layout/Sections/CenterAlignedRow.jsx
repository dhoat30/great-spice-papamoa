import React from 'react'
import styled from '@emotion/styled'
import Link from 'next/link'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
export default function CenterAlignedRow({ title, description, link }) {
  return (
    <Section>
        <Container maxWidth="md" className="container" > 
            <Typography variant="h4" component={"h2"} color={"#1d1d1d"}>{title}</Typography>
            <Typography variant="body1" component={"p"} color={"#1d1d1d"}>{description}</Typography>
            <Link href={link.url} passHref className="mt-24 inline-block">
               <Button variant="contained" color="primary" >
          {link.title}
          </Button>
            </Link>
        </Container>
        </Section>
  )
}
const Section = styled.section`
padding: 80px 0;
background: var(--light-surface-container-low);
text-align: center;
@media (max-width: 768px) {
    padding: 40px 0;    
    }
`