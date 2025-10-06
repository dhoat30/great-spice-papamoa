import {useState, useEffect} from 'react'
import styled from "@emotion/styled";
export default function Map() {
    const [showMap, setShowMap] = useState(false)

    useEffect(()=> { 
        setTimeout(()=> { 
            setShowMap(true)
        },1500)
    })
  return (
    <Section>
        {showMap && 
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50511.98934333017!2d176.2543864544005!3d-37.69621469005437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d6e7191fe6be03b%3A0x261d7570b7e2094e!2sGreat%20Spice%20Papamoa!5e0!3m2!1sen!2snz!4v1730009039333!5m2!1sen!2snz" width="100%"    loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        }
    </Section>
  )
}

const Section  = styled.section`
position:relative; 
height: 400px; 
animation: skeleton-loading 1s linear infinite alternate;
    color: transparent;

    @keyframes skeleton-loading {
    0% {
        background-color: #F5F5F5; /* FROM Color 1 */
    }
    100% {
        background-color: #E2E2E2; /* TO Color 2 */
    }
}
iframe{ 
    border: none; 
    width: 100%; 
    height: 400px; 
}
`
