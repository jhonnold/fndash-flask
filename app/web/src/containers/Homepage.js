import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { actions as gamesActions } from '../ducks/games';
import GamesList from '../components/GamesList';
import Banner from '../components/Banner';
import Column from '../components/Column';


const HomeColumn = styled(Column)`
  width: 30%!important;
  margin: 3rem;
`;

const Main = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
`;

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
        <Banner />
        <Main>
          <HomeColumn>
            <div className="main__games">
              <GamesList games={data} title="Recent Games" />
            </div>
          </HomeColumn>
          <div className="fake-search-bar">
            <input type="text" placeholder="FAKE" />
          </div>
        </Main> 
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
