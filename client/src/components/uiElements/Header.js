import React from "react";
import styled from "styled-components";

const Hero = styled.h1`
  font-size: ${(props) => {
    return props.theme.largest;
  }};
  font-weight: bold;
  text-transform: uppercase;
`;

const HeroHeader = (props) => {
  return <Hero>{props.children}</Hero>;
};

export { HeroHeader };
