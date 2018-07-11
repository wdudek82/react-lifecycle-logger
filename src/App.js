// @flow
import React from 'react';
import PollChild from './PollChild';
import loggify from './loggify';

type State = {
  data: ?number,
  showPollChild: boolean,
};

class App extends React.Component<null, State> {
  static displayName = 'App';

  state = {
    data: null,
    showPollChild: false,
  };

  componentWillMount() {
    this.fetchData();
  }

  fetchData = () => {
    console.log('Going to fetch data!');
    setTimeout(() => {
      console.log('data retrieved!');
      this.setState(() => ({ data: Math.random() }));
    }, 1000);
  };

  render() {
    const { showPollChild } = this.state;

    return (
      <div>
        <h1>Hello {this.state.data ? this.state.data : '?'}</h1>
        <button
          type="submit"
          onClick={() => {
            this.setState((prevState) => ({ showPollChild: !prevState.showPollChild }));
          }}
        >
          {showPollChild ? 'Hide' : 'Show'}
        </button>

        {showPollChild ? <PollChild /> : null}
      </div>
    );
  }
}

export default loggify(App);
