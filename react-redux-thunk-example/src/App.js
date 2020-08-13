import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { requestUsersAction } from './actions/requestUsersAction';
import { incrementCountAction } from './actions/incrementCountAction';

const App = ({
  count,
  users,
  isLoading,
  incrementCountAction,
  requestUsersAction,
}) => {
  useEffect(() => {
    requestUsersAction();
  }, [requestUsersAction]);

  return (
    <div className="App">
      <div onClick={() => incrementCountAction()}>
        {count}
      </div>
      <br />
      {isLoading && 'loading...'}
      {!isLoading &&
        users.map((vote, idx) => (
          <div key={idx}>
            ({idx + 1}) Username: {vote.user}
          </div>
        ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.users.isLoading,
  users: state.users.entries,
  count: state.count,
});

const mapDispatchToProps = {
  incrementCountAction,
  requestUsersAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
