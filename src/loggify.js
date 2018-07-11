// @flow
import * as React from 'react';
import styled from 'styled-components';

export default function logify(Wrapped) {
  const originals = {};

  const methodsToLog = [
    'componentWillReceiveProps',
    // 'getDerivedStateFromProps',
    // 'shouldComponentUpdate',
    'componentWillUpdate',
    // 'render',
    'componentDidUpdate',
    'componentWillUnmount',
    'componentWillMount',
    'componentDidMount',
  ];

  methodsToLog.map((method) => {
    if (Wrapped.prototype[method]) {
      originals[method] = Wrapped.prototype[method];
    }

    /* eslint-disable func-names */
    /* eslint-disable no-param-reassign */
    Wrapped.prototype[method] = function(...args) {
      let original = originals[method];
      console.groupCollapsed(`${Wrapped.displayName} called ${method}`);
      console.groupEnd();

      if (original) {
        original = original.bind(this);
        original(...args);
      }
    };

    return 0;
  });
  /* eslint-enable func-names */
  /* eslint-enable no-param-reassign */

  type Props = {};

  return (props: Props) => {
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
