import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Cliploader from "react-spinners/ClipLoader";
import styled from "styled-components";

const Spinner = (props) => {
  const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    opacity: 0.7;
    z-index: 1000;
  `;

  return (
    <Fragment>
      <Wrapper>
        <Cliploader color={"#9314F5"} size={150} />
      </Wrapper>
    </Fragment>
  );
};

Spinner.propTypes = {};

export default Spinner;
