// @flow
import React from 'react';
import styled from 'styled-components';

export default function logify(Wrapped) {
  return (props) => {
    return (
      <LoggerContainer>
        <H2>{Wrapped.displayName} is now loggified</H2>
        <Wrapped {...props} />
      </LoggerContainer>
    );
  };
}

const LoggerContainer = styled.div`
  background: aliceblue;
  border 1px solid aquamarine;
  border-radius: 5px;
`;

LoggerContainer.displayName = 'LoggerContainer';

const H2 = styled.h2`
  color: blueviolet;
`;

H2.displayName = 'H2';
