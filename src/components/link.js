import * as React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

export const LinkWrap = styled.span`
  text-decoration: none;
  color: ${props => props.color};
  display: block;

  :hover {
    color: ${props => props.hover};
    text-transform: inherit;
  }
`;


const link = (props) => <LinkWrap as={Link} to={props.url} color={props.color} hover={props.hover}> 
  {props.title}
</LinkWrap>

export default link