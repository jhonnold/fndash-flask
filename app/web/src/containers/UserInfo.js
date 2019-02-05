import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions as userActions } from '../ducks/users';
import { actions as gamesActions } from '../ducks/games';
import Stats from '../components/Stats';
import GameList from '../components/GamesList';
import KDChart from '../components/KDChart';
import PlacementPieChart from '../components/PlacementPieChart';
import GamesBarChart from '../components/GamesBarChart';

class UserInfo extends React.PureComponent {
  componentDidMount() {
    const {
      match, ui, requestUser, requestUserGames, requestUserRecords,
    } = this.props;

    requestUser(match.params.userId);
    requestUserGames(match.params.userId, ui.mode);
    requestUserRecords(match.params.userId);
  }

  componentDidUpdate(prevProps) {
    const { match: prevMatch, ui: prevUi } = prevProps;
    const {
      match, ui, requestUser, requestUserGames, requestUserRecords,
    } = this.props;

    if (match.params.userId !== prevMatch.params.userId) {
      requestUser(match.params.userId);
      requestUserGames(match.params.userId, ui.mode);
      requestUserRecords(match.params.userId);
    } else if (ui.mode !== prevUi.mode) {
      requestUserGames(match.params.userId, ui.mode);
    }
  }

  render() {
    const {
      users, match, ui, games,
    } = this.props;

    const user = users.data[match.params.userId] || {};
    const data = user[ui.mode] || {};

    const recordGames = ui.mode === 'all' ? Object.values(games.data.records) : [games.data.records[ui.mode]];

    return (
      <React.Fragment>
        <Stats data={data} />
        <div className="minute-data">
          <div className="minute-data__container">
            <div className="games">
              <GameList games={recordGames} title="Records" />
              <GameList games={games.data.games} />
            </div>
            <div className="charts">
              <KDChart />
              <PlacementPieChart />
              <GamesBarChart />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ users, ui, games }) => ({
  users,
  ui,
  games,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(userActions, dispatch),
  ...bindActionCreators(gamesActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserInfo);
