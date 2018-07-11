// @flow
import React from 'react';
import logify from './loggify';

type Props = {};

type State = {
  poll: number,
};

class PollChild extends React.Component<Props, State> {
  static displayName = 'PollChild';

  state = {
    poll: 0,
  }

  componentDidMount() {
    this.pollData();
  }

  componentWillUnmount() {
    clearInterval(this.pollInterval);
  }

  pollData = () => {
    this.pollInterval = setInterval(() => {
      console.log('Poll!');
      this.setState(() => (
        { poll: Math.floor(Math.random() * 10) }
      ));
    }, 1000);
  };

  render() {
    return <h4>poll: {this.state.poll}</h4>;
  }
}

export default logify(PollChild);
