// @flow
import React from 'react';
import PollChild from './PollChild';
import loggify from './loggify';

type State = {
  data: ?number,
  showPollChild: boolean,
  parentPoll: number,
};

class App extends React.Component<null, State> {
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

  componentWillUnmount = () => {
    clearInterval(this.pollInterval);
  }

  fetchData = () => {
    console.log('Going to fetch data!');
    setTimeout(() => {
      console.log('data retrieved!');
      this.setState(() => ({ data: Math.random() }));
    }, 1000);
  };

  createParentPoll = () => {
    this.pollInterval = setInterval(() => {
      this.setState(() => ({ parentPoll: getRandomInt(1, 9) }));
    }, 5000);
  };

  render() {
    const { data, showPollChild, parentPoll } = this.state;

    return (
      <div>
        <h1>Hello {data || '?'}</h1>
        <h3>{parentPoll}</h3>
        <button
          type="submit"
          onClick={() => {
            this.setState((prevState) => ({
              showPollChild: !prevState.showPollChild,
            }));
          }}
        >
          {showPollChild ? 'Hide' : 'Show'}
        </button>

        {showPollChild ?
          <PollChild parentPoll={parentPoll} /> :
          null}
      </div>
    );
  }
}

function getRandomInt(min, max) {
  const _min = Math.ceil(min);
  const _max = Math.floor(max);
  return Math.floor(Math.random() * (_max - _min + 1)) + _min;
}

export default loggify(App);
