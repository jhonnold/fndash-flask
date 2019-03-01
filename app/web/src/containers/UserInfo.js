import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { actions as userActions } from '../ducks/users';
import { actions as gamesActions } from '../ducks/games';
import { actions as chartActions } from '../ducks/charts';
import Stats from '../components/Stats';
import GameList from '../components/GamesList';
import KDChart from '../components/KDChart';
import PlacementPieChart from '../components/PlacementPieChart';
import GamesBarChart from '../components/GamesBarChart';
import TimePlayedChart from '../components/TimePlayedChart';
import TimePlayed from '../components/TimePlayed';
import Column from '../components/Column';
import Container from '../components/Container';

const ReversedContainer = styled(Container)`
  flex-direction: row-reverse;
`;

const ChartColumn = styled(Column)`
  height: min-content;
`;

const MinuteData = styled.div`
  margin-top: 1rem;
  width: 100%;
`;

class UserInfo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.matchColumnHeights = this.matchColumnHeights.bind(this);
  }

  componentDidMount() {
    const {
      match,
      ui,
      requestUser,
      requestUserGames,
      requestUserRecords,
      requestKdChart,
      requestPlacementChart,
      requestGamesChart,
      requestTimePlayedChart,
    } = this.props;

    const { userId: id } = match.params;

    requestUser(id);
    requestUserGames(id, ui.mode);
    requestUserRecords(id);
    requestKdChart(id, ui.mode);
    requestPlacementChart(id);
    requestGamesChart(id, ui.mode);
    requestTimePlayedChart(id);

    window.addEventListener('resize', this.matchColumnHeights);
    this.matchColumnHeights();
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
      requestPlacementChart,
      requestGamesChart,
      requestTimePlayedChart,
    } = this.props;

    const { userId: id } = match.params;

    if (id !== prevMatch.params.userId) {
      requestUser(id);
      requestUserGames(id, ui.mode);
      requestUserRecords(id);
      requestKdChart(id, ui.mode);
      requestPlacementChart(id);
      requestGamesChart(id, ui.mode);
      requestTimePlayedChart(id);
    } else if (ui.mode !== prevUi.mode) {
      requestUserGames(id, ui.mode);
      requestKdChart(id, ui.mode);
      requestGamesChart(id, ui.mode);
    }

    this.matchColumnHeights();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.matchColumnHeights);
  }

  matchColumnHeights() {
    // Must wait must a wee bit of time for the new sizes to
    // be registered
    setTimeout(() => {
      this.gamesColumn.style.height = `${this.chartsColumn.scrollHeight}px`;
    }, 10);
  }

  render() {
    const {
      users, match, ui, games, charts,
    } = this.props;

    const user = users.data[match.params.userId] || {};
    const data = user[ui.mode] || {};

    const recordGames = ui.mode === 'all' ? Object.values(games.data.records) : [games.data.records[ui.mode]];

    const {
      kdChart, placementChart, gamesChart, timePlayedChart,
    } = charts;

    return (
      <React.Fragment>
        <Stats data={data} />
        <MinuteData>
          <ReversedContainer>
            <ChartColumn
              ref={(el) => {
                this.chartsColumn = el;
              }}
            >
              <KDChart {...kdChart.data} />
              <GamesBarChart {...gamesChart.data} />
              <PlacementPieChart mode={ui.mode} data={placementChart.data} />
              {ui.mode === 'all' ? (
                <TimePlayedChart {...timePlayedChart.data} />
              ) : (
                <TimePlayed data={timePlayedChart.data} mode={ui.mode} />
              )}
            </ChartColumn>
            <Column
              ref={(el) => {
                this.gamesColumn = el;
              }}
            >
              <GameList games={recordGames} title="Records" />
              <GameList games={games.data.games} autoOverflow />
            </Column>
          </ReversedContainer>
        </MinuteData>
      </React.Fragment>
    );
  }
}

// eslint-disable-next-line object-curly-newline
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
