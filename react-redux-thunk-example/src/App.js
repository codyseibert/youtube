import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import { addToCountAction } from './actions/addToCountAction';

const App = ({ count, addToCountAction }) => {
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => addToCountAction(10)}>
          click me {count}
        </button>
      </header>
    </div>
  );
};

const mapStateToProps = state => ({ count: state.count });

const mapDispatchToProps = dispatch => ({
  addToCountAction: amount =>
    dispatch(addToCountAction(amount))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
