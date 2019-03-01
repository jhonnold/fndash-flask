import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions as gamesActions } from '../ducks/games';
import GamesList from '../components/GamesList';

class Homepage extends React.PureComponent {
  componentDidMount() {
    const {
      requestRecentGames,
    } = this.props;

    requestRecentGames();
  }

  render() {
    const {
      games,
    } = this.props;

    const data = games.data.games;

    return (
      <React.Fragment>
        <div className="banner">
          <h1 className="banner--title">Fortnite Dashboard</h1>
        </div>
        <div className="main">
          <div className="main__games">
            <GamesList games={data} title="Recent Games" />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({
  games,
}) => ({
  games,
});

const matchDispatchToProps = dispatch => ({
  ...bindActionCreators(gamesActions, dispatch),
});

export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(Homepage);
