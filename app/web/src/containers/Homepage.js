import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions as userActions } from '../ducks/users';
import { actions as gamesActions } from '../ducks/games';
import NewGame from '../components/NewGame';

class Homepage extends React.PureComponent {
  componentDidMount() {
    const {
      requestUser,
      requestUserGames,
    } = this.props;

    requestUser(id);
    requestUserGames(id, 'all');
  }

  // componentDidUpdate() {
  //   const {
  //     match,
  //     requestUser,
  //     requestUserGames,
  //   } = this.props;

  //   const { userId: id } = match.params;

  //   requestUser(id);
  //   requestUserGames(id, 'all');
  // }

  render() {
    const {
      users, match, games,
    } = this.props;

    const user = users.data[match.params.userId] || {};
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
