"use client";
import styles from './Hero.module.css'
import Typography from '@mui/material/Typography'
import Contact from '@/components/Pages/Contact/Contact';
import styled from '@emotion/styled'
import ContactInfo from "../../Footer/ContactInfo";
import StaticUsp from '../../USP/StaticUsp';


export default function ContactHero({ data, contactInfoData }) {
    if (!data) return null
    const heroData = {
        subtitle: data.subtitle,
        title: data.title,
        description: data.description,
    };

    return (
        <>
            <Section >
                <div className={`max-width-xl container`}>
                    <div className="content-wrapper">
                        <div className="title-wrapper">
                            <Typography variant="h1" component="h1" className="title">
                                {heroData.title}
                            </Typography>
                            <Typography variant="body1" component="div" className="description mt-8">
                                {heroData.description}
                            </Typography>
                        </div>
                            <StaticUsp/> 
                        
                        <ContactInfo className="mt-40" contactInfo={contactInfoData} />
                    </div>
                    <Contact />

                </div>
            </Section>


        </>

    )
}

const Section = styled.section`
background: var(--dark-surface-container-low);
padding: 120px 0 40px 0; 
@media(max-width: 600px){
    padding: 80px 0 40px 0; 

} 
.container{ 
    display: grid; 
    grid-template-columns: 1fr 1fr;
    gap: 40px; 
    align-items: start;
    @media(max-width: 1100px){ 
        grid-template-columns: 1fr;
    }
}
.content-wrapper{ 
 
}
`