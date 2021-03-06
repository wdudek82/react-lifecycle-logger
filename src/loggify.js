// @flow
import * as React from 'react';
import styled from 'styled-components';

type HOC<A, B> = (a: React.ComponentType<A>) => React.ComponentType<B>;

export default function loggify(Wrapped: HOC<*, *>) {
  const originals = {};

  const methodsToLog = [
    'componentWillReceiveProps',
    // 'getDerivedStateFromProps',
    'shouldComponentUpdate',
    'componentWillUpdate',
    // 'render',
    'componentDidUpdate',
    'componentWillUnmount',
    'componentWillMount',
    'componentDidMount',
  ];

  methodsToLog.map(method => {
    if (Wrapped.prototype[method]) {
      originals[method] = Wrapped.prototype[method];
    }

    /* eslint-disable func-names */
    /* eslint-disable no-param-reassign */
    Wrapped.prototype[method] = function(...args) {
      let original = originals[method];

      console.groupCollapsed(`${Wrapped.displayName} called ${method}`);

      if (
        method === 'componentWillReceiveProps' ||
        'shouldComponentUpdate' ||
        'componentWillUpdate'
      ) {
        console.log('nextProps', args[0]);
      }

      if (method === 'shouldComponentUpdate' || 'componentWillUpdate') {
        console.log('nextState', args[1]);
      }

      if (method === 'componentDidUpdate') {
        console.log('prevProps', args[0]);
        console.log('prevState', args[1]);
      }

      console.groupEnd();

      let result;

      if (original) {
        original = original.bind(this);
        result = original(...args);
      }

      if (
        method === 'shouldComponentUpdate' &&
        typeof original === 'undefined'
      ) {
        result = true;
      }

      return result;
    };

    Wrapped.prototype.setState = function(partialState, callback) {
      console.groupCollapsed(`${Wrapped.displayName} setState`);
      console.log('partialState', partialState);
      console.log('callback', callback);
      console.groupEnd();
      this.updater.enqueueSetState(this, partialState, callback, 'setState');
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
