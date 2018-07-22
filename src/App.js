// @flow
import React from 'react';
import PollChild from './PollChild';
import loggify from './loggify';
import {
  Parent,
  Column,
  // Row,
  // ChildContainer,
  H4,
  // H5,
  // Id,
  // Value,
  // Item,
  // NoKey,
  // Medium,
  // Faster,
} from './styled';

type Props = {};

type State = {
  data: ?number,
  showPollChild: boolean,
  parentPoll: number,
};

class App extends React.Component<Props, State> {
  pollInterval: IntervalID = setInterval(() => {}, 1000);

  static displayName = 'App';

  state = {
    data: null,
    showPollChild: false,
    parentPoll: -1,
  };

  componentDidMount() {
    this.fetchData();
    this.createParentPoll();
  }

  componentWillUpdate(nextProps: Props, nextState: State) {
    if (nextState.parentPoll !== this.state.parentPoll) {
      // canvas state was deleted
    }
    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.parentPoll !== this.state.parentPoll) {
      // let { canvasCtx } = this;
      // canvasCtx.fillStyle = (this.state.parentPoll % 2 === 1) ? 'green' : 'red';
      // canvasCtx.arc(75, 75, 50, 0, 2 * Math.PI);
      // canvasCtx.fill();
    }
  }

  componentWillUnmount = () => {
    clearInterval(this.pollInterval);
  };

  getRandomInt = (min: number, max: number) => {
    const _min = Math.ceil(min);
    const _max = Math.floor(max);
    return Math.floor(Math.random() * (_max - _min + 1)) + _min;
  };

  fetchData = () => {
    console.log('Going to fetch data!');
    setTimeout(() => {
      console.log('data retrieved!');
      this.setState(() => ({ data: Math.random() }));
    }, 1000);
  };

  createParentPoll = () => {
    this.pollInterval = setInterval(() => {
      this.setState(() => ({ parentPoll: this.getRandomInt(1, 2) }));
    }, 5000);
  };

  render() {
    const { data, showPollChild, parentPoll } = this.state;

    return (
      <Parent>
        <Column>
          <H4>Hello {data || '?'}</H4>
          <H4>{parentPoll}</H4>
          <button
            type="submit"
            onClick={() => {
              this.setState(prevState => ({
                showPollChild: !prevState.showPollChild,
              }));
            }}
          >
            {showPollChild ? 'Hide' : 'Show'}
          </button>

          {showPollChild ? <PollChild parentPoll={parentPoll} /> : null}
        </Column>
      </Parent>
    );
  }
}

App = loggify(App);

export default App;
