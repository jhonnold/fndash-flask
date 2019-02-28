import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions as userActions } from '../ducks/users';
import { actions as gamesActions } from '../ducks/games';
import NewGame from '../components/NewGame';

class Homepage extends React.PureComponent {
  componentDidMount() {
    const {
      requestUsers,
      requestGames,
    } = this.props;

    requestUsers();
    requestGames();
  }

  componentDidUpdate() {
    const {
      requestUsers,
      requestGames,
    } = this.props;

    requestUsers();
    requestGames();
  }

  render() {
    const {
      users, games,
    } = this.props;

    const user = users.data || {};
    const data = games.data.games;

    return (
      <React.Fragment>
        <div className="banner">
          <h1 className="banner--title">Fortnite Dashboard</h1>
        </div>
        <div className="main">
          <div className="main__games">
            <NewGame data={data} user={user} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({
  users, games,
}) => ({
  users,
  games,
});

const matchDispatchToProps = dispatch => ({
  ...bindActionCreators(userActions, dispatch),
  ...bindActionCreators(gamesActions, dispatch),
});

export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(Homepage);
