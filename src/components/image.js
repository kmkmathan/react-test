import * as React from "react";
import styled from "styled-components";
import { device } from "../helpers";

const Image = styled.img`
  display: inline-block;
  height: 100vh;
  width: 100%;

  @media ${device.laptop} {
    height: auto;
  }
`;

const image = (props) => {
  return (
    <>
      <Image src={props.url} />
    </>
  );
};

export default image;
