'use client';
import React,  { useEffect } from 'react';
import styled from "@emotion/styled";
import Container from "@mui/material/Container";

export default function ReservationWidget() {
    return (
        <Section> 
            <Container maxWidth="xl">
        <div>
          <div id="rd-widget-frame" style={{ maxWidth: 600, margin: 'auto' }}></div>
          <input 
            id="rdwidgeturl" 
            name="rdwidgeturl" 
            value="https://booking.resdiary.com/widget/Standard/GreatSpicePapamoa/9171?includeJquery=false" 
            type="hidden"
          />
          <script 
            src="https://booking.resdiary.com/bundles/WidgetV2Loader.js" 
            strategy="afterInteractive" 
          />
        </div>
        </Container>
        </Section>
      );
}

const Section = styled.section`
background: var(--dark-surface-container-lowest);
min-height: 600px; 
padding-top: 40px; 
padding-bottom: 40px;  
`