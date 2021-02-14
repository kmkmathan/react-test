import React from "react";
import styled from "styled-components";
import { device } from "../../helpers";
import Image from "../image";
import Lockup from "../lockup";

const LaunchCardWrapper = styled.div`
  display: block;
  margin-bottom: 30px;
  width: 100%;
 

  @media ${device.laptop} {
    width: calc(100% - 20px);
  }
`;

const LaunchCardContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 0 10px;
  padding-bottom: 30px;
  box-sizing: border-box;
  flex-direction: column-reverse;
  justify-content: space-between;
`;

const ImagContainer = styled.div`
  padding: 40px 20px;
  background-color: #b3c7cc;
  position: relative;

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
