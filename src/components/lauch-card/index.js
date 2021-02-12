import React from "react";
import styled from "styled-components";
import { device } from "../../helpers";
import Image from "../image";
import Lockup from "../lockup";

const LaunchCardWrapper = styled.div`
  display: block;
  margin-bottom: 30px;
  margin-left: 20px;
  width: 100%;

  @media ${device.laptop} {
    width: 30%;
  }
`;

const LaunchCardContainer = styled.div``;

const ImagContainer = styled.div`
  padding: 40px 20px;
  background-color: #b3c7cc;
  position: relative;
  margin-top: auto;

  img {
    height: 100px;
    width: auto;
    display: block;
    margin: 0 auto;
  }
`;

const Content = styled.div`
  padding: 20px;
  background-color: #f6f7f7;
  flex: 1;
`;

function LaunchCard(props) {
  return (
    <LaunchCardWrapper>
      <LaunchCardContainer>
        <ImagContainer>
          <Image url={props.image} />
        </ImagContainer>

        <Content>
          <Lockup text={props.description} tag="h3" title={props.title} />
        </Content>
        {/* Youtube Link ? */}
      </LaunchCardContainer>
    </LaunchCardWrapper>
  );
}

export default LaunchCard;
