import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions as userActions } from '../ducks/users';
import { actions as gamesActions } from '../ducks/games';
import { actions as chartActions } from '../ducks/charts';
import Stats from '../components/Stats';
import GameList from '../components/GamesList';
import KDChart from '../components/KDChart';
import PlacementPieChart from '../components/PlacementPieChart';
import GamesBarChart from '../components/GamesBarChart';

class UserInfo extends React.PureComponent {
  componentDidMount() {
    const {
      match,
      ui,
      requestUser,
      requestUserGames,
      requestUserRecords,
      requestKdChart,
    } = this.props;

    const { userId: id } = match.params;

    requestUser(id);
    requestUserGames(id, ui.mode);
    requestUserRecords(id);
    requestKdChart(id, ui.mode);
  }

  componentDidUpdate(prevProps) {
    const { match: prevMatch, ui: prevUi } = prevProps;
    const {
      match,
      ui,
      requestUser,
      requestUserGames,
      requestUserRecords,
      requestKdChart,
    } = this.props;

    const { userId: id } = match.params;

    if (id !== prevMatch.params.userId) {
      requestUser(id);
      requestUserGames(id, ui.mode);
      requestUserRecords(id);
      requestKdChart(id, ui.mode);
    } else if (ui.mode !== prevUi.mode) {
      requestUserGames(id, ui.mode);
      requestKdChart(id, ui.mode);
    }
  }

  render() {
    const {
      users, match, ui, games, charts,
    } = this.props;

    const user = users.data[match.params.userId] || {};
    const data = user[ui.mode] || {};

    const recordGames = ui.mode === 'all' ? Object.values(games.data.records) : [games.data.records[ui.mode]];

    const { kdChart } = charts;

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
              <KDChart {...kdChart.data} />
              <PlacementPieChart />
              <GamesBarChart />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ users, ui, games, charts }) => ({
  users,
  ui,
  games,
  charts,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(userActions, dispatch),
  ...bindActionCreators(gamesActions, dispatch),
  ...bindActionCreators(chartActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserInfo);
