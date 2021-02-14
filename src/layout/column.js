import * as React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { device } from "../helpers";


const getColumnUsingLayout = (columns, layout) => {
    if (columns > (layout || 12)) {
        return layout || 12;
    }
    return columns;
};

export const ColumnWrapperContainer = styled.div`
    ${({ columns, layout }) => css`
        flex-basis: 100%;
        justify-content: center;
        @media ${device.tablet} {
            display: flex;
            flex-basis: 50%;
        }
        @media ${device.laptop} {
            display: flex;
            flex-basis: calc( ${getColumnUsingLayout(columns, layout)} / ${ layout || 12 } * 100% );
        }
       
    `}
`;

const Column = ({ layout, columns, children }) => (
    <ColumnWrapperContainer layout={layout} columns={columns}>
        {children}
    </ColumnWrapperContainer>
);

Column.propTypes = {
    layout: PropTypes.number,
    columns: PropTypes.number.isRequired,
    children: PropTypes.element.isRequired,
};

export default Column;
