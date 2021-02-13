import * as React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { device } from "../helpers";


const getColumns = (columns, layout) => {
    if (columns > (layout || 12)) {
        return layout || 12;
    }
    return columns;
};

export const ColumnWrapper = styled.div`
    ${({ columns, layout }) => css`
        flex-basis: 100%;
        @media ${device.laptop} {
            display: flex;
            flex-basis: calc(
                ${getColumns(columns, layout)} / ${layout || 12} *
                100%
            );
        }
    `}
`;

const Column = ({ layout, columns, children }) => (
    <ColumnWrapper layout={layout} columns={columns}>
        {children}
    </ColumnWrapper>
);

Column.propTypes = {
    layout: PropTypes.number,
    columns: PropTypes.number.isRequired,
    children: PropTypes.element.isRequired,
};

export default Column;
