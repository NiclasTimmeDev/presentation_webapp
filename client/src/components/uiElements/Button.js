import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Btn = styled.button`
  border-radius: ${(props) => props.theme.borderRadiusLarge};
  padding: 5px 10px;
  border: none;
  font-size: ${(props) => props.theme.following};
  cursor: pointer;
  transition: background-color 0.3s linear;
  &:focus {
    outline: none;
  }
`;

/*=======================
PRIMARY BUTTON
=======================*/
const PrimaryBtn = styled(Btn)`
  background-color: ${(props) => props.theme.primaryCTA};
  &:hover {
    background-color: #7fe6ba;
  }
  width: ${(props) => props.fullWidth && "100%"};
`;

const PrimaryButton = (props) => {
  return (
    <PrimaryBtn type={props.type} fullWidth={props.fullWidth}>
      {props.children}
    </PrimaryBtn>
  );
};

/*=======================
SECONDARY BUTTON
=======================*/
const SecondaryBtn = styled(Btn)`
  background-color: ${(props) => props.theme.secondaryCTA};
  &:hover {
    background-color: #a1e2d3;
  }
  width: ${(props) => props.fullWidth && "100%"};
`;

const SecondaryButton = (props) => {
  return (
    <SecondaryBtn type={props.type} fullWidth={props.fullWidth}>
      {props.children}
    </SecondaryBtn>
  );
};

/*=======================
TERTIARY BUTTON
=======================*/
const TertiaryBtn = styled(Btn)`
  background-color: ${(props) => props.theme.secondaryContrast};
  color: #fff;
  &:hover {
    background-color: #ad5ceb;
  }
  width: ${(props) => props.fullWidth && "100%"};
`;

const TertiaryButton = (props) => {
  return (
    <TertiaryBtn type={props.type} fullWidth={props.fullWidth}>
      {props.children}
    </TertiaryBtn>
  );
};

/*=======================
GHOST BUTTON
=======================*/
const GhostBtn = styled(Btn)`
  background-color: transparent;
  border: 2px solid ${(props) => props.theme.secondaryContrast};
  color: ${(props) => props.theme.secondaryContrast};
  &:hover {
    color: ${(props) => props.theme.tertiaryContrast};
    border: 2px solid ${(props) => props.theme.tertiaryContrast};
  }
  width: ${(props) => props.fullWidth && "100%"};
`;

const GhostButton = (props) => {
  return (
    <GhostBtn type={props.type} fullWidth={props.fullWidth}>
      {props.children}
    </GhostBtn>
  );
};

export { PrimaryButton, SecondaryButton, TertiaryButton, GhostButton };
