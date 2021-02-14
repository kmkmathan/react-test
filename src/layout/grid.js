import * as React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

export const GridWrapper = styled.div`
    flex-wrap: ${(p) => p.wrap || "wrap"};
    display: flex;
`;

const Grid = (props) => (
  <GridWrapper wrap={props.wrap}>{props.children}</GridWrapper>
);

Grid.defaultProps = {
    wrap: "wrap"
};

Grid.propTypes = {
    children: PropTypes.array.isRequired,
};

export default Grid;
