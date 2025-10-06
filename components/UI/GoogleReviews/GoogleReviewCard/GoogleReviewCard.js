import React, { useState } from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import GoogleIcon from "../../Icons/GoogleIcon";

export default function GoogleReviewCard({
  name,
  description,
  customerPic,
  className,
  timeAgo,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const numberOfStars = 5;
  const starsJSX = Array.from({ length: numberOfStars }, (_, index) => (
    <StarIcon key={index} sx={{ color: "#FABB05", fontSize: "1rem" }} />
  ));

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  // Limit description to 200 characters if not expanded
  const charLimit = 180;
  const shortDescription =
    description.length > charLimit
      ? description.slice(0, charLimit) + "..."
      : description;

  return (
    <Div className={className}>
      <div className="quote-mark-wrapper">
        <svg width="84" height="73" viewBox="0 0 84 73" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.2" d="M34.2794 0V13.5921C33.9706 21.6353 33.5074 29.2713 32.8897 36.5C32.1691 43.7287 30.3676 50.3975 27.4853 56.5063C24.5 62.7169 19.5588 68.2148 12.6618 73L3.39706 63.3787C5.35294 61.6478 7.875 58.0844 10.9632 52.6883C14.0515 47.394 15.6985 40.0635 15.9044 30.6967L0 28.7113V0H34.2794ZM84 0V13.5921C84 21.5335 83.5882 29.1185 82.7647 36.3473C81.8382 43.576 79.7794 50.2957 76.5882 56.5063C73.3971 62.7169 68.3529 68.2148 61.4559 73L52.1912 63.3787C54.1471 61.6478 56.6691 58.1353 59.7574 52.841C62.8456 47.5467 64.4926 40.2162 64.6985 30.8494L49.7206 28.7113V0H84Z" fill="#1D1D1D"/>
</svg>

      </div>
      <div className="description-wrapper mt-16 mb-16">
        <Typography variant="body1" component="p" color={"#1D1D1D"}>
          {isExpanded ? description : shortDescription}
        </Typography>
        {description.length > charLimit && (
          <button onClick={toggleExpand} className="read-more-button">
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        )}
      </div>
      <div className="profile-wrapper flex justify-between align-center">
       
        <div className="name-wrapper flex gap-8 align-center">
           <Image
          src={customerPic}
          alt={`${name} profile picture`}
          width="40"
          height="40"
        />
          <Typography variant="subtitle1" sx={{fontWeight: 600}} component="h3" color={"#1D1D1D"}>
            {name}
          </Typography>
       
        </div>
           <div className="flex gap-8 align-center stars-wrapper ">
            <div>{starsJSX}</div>
            <Typography
              variant="body2"
              component="div"
              className="time-ago"
              color={"#1D1D1D"}
            >
              {timeAgo}
            </Typography>
          </div>
      </div>
      {/* <GoogleIcon /> */}
    </Div>
  );
}

const Div = styled.div`
  background: var(--light-surface-container-lowest);
  padding: 16px;
  border: 1px solid var(--dark-outline-variant);
  max-width: calc(100% - 16px);
  border-radius: 12px;
  position: relative; 
  @media (max-width: 600px) {
  max-width: calc(100%);
  }
  .quote-mark-wrapper{ 
    position: absolute;
    top: 24px;
    right: 24px; 
   opacity: 0.5;
    z-index: 10;
  }
  .profile-wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
  }

  .description-wrapper {
    position: relative;
    p {
      margin-bottom: 8px;
    }
    .read-more-button {
      background: none;
      border: none;
      color: var(--light-primary);
      cursor: pointer;
      font-weight: 500;
      text-decoration: underline;
    }
  }
  .time-ago {
    color: var(--light-on-surface);
    line-height: 0;
    position: relative;
    top: -2px;
  }
  .stars-wrapper{ 
    position: relative; 
    top: 2px; 
  }
`;
