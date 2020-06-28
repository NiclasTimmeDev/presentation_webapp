import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Input = (props) => {
  return <input placeholder={props.placeholder} type={props.type} />;
};

Input.propTypes = {};

export default Input;
