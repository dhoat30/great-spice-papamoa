'use client'
import styled from '@emotion/styled'
import ParkingIcon from '../Icons/ParkingIcon'
import WifiIcon from '../Icons/WifiIcon';
import BYOIcon from '../Icons/BYOIcon';
import AwardIcons from '../Icons/AwardIcons';
import WheelchairIcon from '../Icons/WheelchairIcon';
export default function StaticUsp({centerAlign = false}){ 
    const gridJustify = centerAlign ? 'center' : 'flex-start';
    return (
        <Div className="usp-wrapper mt-32" >
                            <ul style={{justifyContent: gridJustify}}>
                                <li>
                                    <ParkingIcon />
                                    <span> Free Parking</span>
                                </li>
                                <li>
                                    <WifiIcon />
                                    <span> Free Wifi</span>
                                </li>
                                <li>
                                    <BYOIcon />
                                    <span> BYO - Wine</span>
                                </li>


                                <li>
                                    <AwardIcons />
                                    <span> Award Winning</span>
                                </li>
                                <li>
                                    <WheelchairIcon />
                                    <span> Wheelchair Accessible</span>
                                </li>
                            </ul>
                        </Div>

    )
}

const Div = styled.div`

       ul{ 
        display: grid;
        grid-template-columns: 250px 250px;
        gap: 24px;
        
        @media(max-width: 600px){
            grid-template-columns: 1fr;
        } 
        svg {
            width: 40px;
            path {
              fill: var(--dark-on-surface);
            }
          }
          li{ 
            display: flex; 
            align-items: center;
         
            span{ 
                color: var(--dark-on-surface);
            }
          }
       }
         
       
`