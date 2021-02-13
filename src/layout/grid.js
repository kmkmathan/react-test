import * as React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

export const GridComponent = styled.div`
  display: flex;
  flex-wrap: ${(p) => p.wrap || "wrap"};
`;

const Grid = (props) => (
  <GridComponent wrap={props.wrap}>{props.children}</GridComponent>
);

Grid.defaultProps = {
  wrap: "wrap",
};

Grid.propTypes = {
  children: PropTypes.array.isRequired,
};

export default Grid;
