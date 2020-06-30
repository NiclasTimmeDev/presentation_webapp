import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  padding: ${(props) => props.theme.paddingMini} 0;
`;

const Label = styled.label`
  font-weight: bold;
  font-size: 20px;
`;
const Input = styled.input`
  background-color: transparent;
  border: ${(props) => (props.error ? "2px solid red" : "none")};
  border-radius: ${(props) =>
    props.error ? props.theme.borderRadiusMedium : "0"};
  border-bottom: ${(props) =>
    props.error ? "2px solid red" : "2px solid lightgray"};
  padding: 5px;
  width: 100%;
  transition: border-bottom 0.5s;
  margin-bottom: ${(props) => (props.error ? "1px" : props.theme.marginText)};
  &:hover {
    border-bottom: 2px solid
      ${(props) => (props.error ? "red" : props.theme.secondaryCTA)};
  }
  &:focus {
    outline: none;
    border-bottom: 2px solid ${(props) => props.theme.secondaryCTA};
  }
`;

const Error = styled.div`
  font-size: ${(props) => props.theme.minor};
  color: red;
  margin-bottom: ${(props) => props.theme.marginText};
`;

const FormGroup = (props) => {
  return (
    <Wrapper>
      {props.label && <Label for={props.name}>{props.label}</Label>}
      <Input
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        error={props.error}
        onChange={props.onChange}
        type={props.type}
      />
      {props.error && <Error>{props.errorText}</Error>}
    </Wrapper>
  );
};

FormGroup.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  error: PropTypes.bool.isRequired,
  errorText: PropTypes.string.isRequired,
  onChange: PropTypes.any,
};

export default FormGroup;
