import * as React from 'react';
import styled from 'styled-components';

const Paragraph = styled.p`
  font-size: 15px;
  line-height: 1.5em;
`

const paragraph = (props) => {
  return (
    <Paragraph>{props.text}</Paragraph>
  )
}

export default paragraph;