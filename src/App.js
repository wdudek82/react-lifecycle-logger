// @flow
import React from 'react';

type Props = {
  foo?: number,
};

class App extends React.Component<Props> {
  static displayName = 'AnotherOne';

  static defaultProps = {
    foo: 5,
  }

  componentDidUpdate() {
    console.log(this.props.foo);
  }

  render() {
    return <h1>Hello</h1>;
  }
};

export default App;
