import { faGrinBeamSweat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const LargeIcon = styled.div`
  font-size: 100px;
`;

export const NoPostsEmptyState = ({ text }) => {
  return (
    <div className="text-center mt-5">
      <LargeIcon>
        <FontAwesomeIcon icon={faGrinBeamSweat} />
      </LargeIcon>
      <h3>{text}</h3>
    </div>
  );
};
