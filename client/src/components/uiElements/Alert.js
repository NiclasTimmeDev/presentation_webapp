import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { connect } from "react-redux";

const Alert = (props) => {
  const Alert = styled.div`
    width: 100%;
    height: 50px;
    background-color: ${(props) =>
      props.type === "danger"
        ? "#F8D7DB"
        : props.type === "warning"
        ? "#FFF3CD"
        : "#D4EDDA"};
    text-align: center;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) =>
      props.type === "danger"
        ? "#721C24"
        : props.type === "warning"
        ? "#846405"
        : "#367042"};
  `;

  return (
    props.type !== "none" && <Alert type={props.type}>{props.message}</Alert>
  );
};

Alert.propTypes = {};

const mapStateToProps = (state) => ({
  type: state.alert.type,
  message: state.alert.message,
});

export default connect(mapStateToProps)(Alert);
