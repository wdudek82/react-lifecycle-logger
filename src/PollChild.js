// @flow
import React from 'react';
import logify from './loggify';

type Props = {
  parentPoll: number,
};

type State = {
  poll: number,
};

class PollChild extends React.Component<Props, State> {
  pollInterval: IntervalID = setInterval(() => {}, 5000);

  static displayName = 'PollChild';

  state = {
    poll: 0,
  };

  componentDidMount() {
    this.pollData();
  }

  componentWillUnmount() {
    clearInterval(this.pollInterval);
  }

  pollData = () => {
    this.pollInterval = setInterval(() => {
      console.log('Poll!');
      this.setState(() => ({ poll: Math.floor(Math.random() * 10) }));
    }, 5000);
  };

  render() {
    return (
      <div>
        <h4>poll: {this.state.poll}</h4>
        <h4>parentPoll: {this.props.parentPoll}</h4>
      </div>
    );
  }
}

export default logify(PollChild);
