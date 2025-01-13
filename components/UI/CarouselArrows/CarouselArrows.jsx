import React from "react";
import styled from "@emotion/styled";
import LongArrowIcon from "../Icons/LongArrowIcon";
export default function CarouselArrows({ next, previous, className,color }) {
  return (
    <Container className={`${className} flex justify-end  pb-8`}>
      <div className="wrapper flex gap-2 flex-initial ">
        <div className="arrow-wrapper " onClick={previous}>
          <LongArrowIcon color={color}/>
        </div>
        <div className="arrow-wrapper " onClick={next} >
          <LongArrowIcon className="right-arrow" color={color} />
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .wrapper {
    display: flex;
    gap: 8px;
  }
  .arrow-wrapper {
    cursor: pointer;
    svg {
      path {
       
      }
    }
    &:hover {
      svg {
        path {
      
        }
      }
    }
  }
  .right-arrow {
    transform: rotate(180deg);
  }
`;
