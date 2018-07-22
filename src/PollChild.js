// @flow
import React from 'react';
import loggify from './loggify';
import {
  // Parent,
  // Column,
  // Row,
  ChildContainer,
  // H4,
  H5,
  // Id,
  // Value,
  // Item,
  // NoKey,
  // Medium,
  // Faster,
} from './styled';

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
    //this.pollData();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.parentPoll !== this.props.parentPoll) {
      return true;
    }
    if (nextState.poll !== this.state.poll) {
      return true;
    }

    return false;
  }

  componentWillUnmount() {
    clearInterval(this.pollInterval);
  }

  getRandomInt = (min: number, max: number) => {
    const _min = Math.ceil(min);
    const _max = Math.floor(max);
    return Math.floor(Math.random() * (_max - _min + 1)) + _min;
  }

  pollData = () => {
    this.pollInterval = setInterval(() => {
      console.log('Poll!');
      this.setState(() => ({ poll: this.getRandomInt(1, 9) }));
    }, 5000);
  };

  render() {
    console.log('PollChild rerendered');
    return (
      <ChildContainer>
        <H5>poll: {this.state.poll}</H5>
        <H5>parentPoll: {this.props.parentPoll}</H5>
      </ChildContainer>
    );
  }
}

// PollChild = loggify(PollChild);

export default PollChild;
