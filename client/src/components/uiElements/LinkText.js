import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

const A = styled.span`
  color: ${(props) => props.theme.primaryContrast};
  font-size: ${(props) => props.theme.minor};
  text-decoration: underline;
  display: block;
  padding: 5px 0;
`;

const LinkText = (props) => {
  return (
    <Link to={props.to}>
      <A>{props.children}</A>
    </Link>
  );
};

LinkText.propTypes = {};

export default LinkText;
