import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { actions as gamesActions } from '../ducks/games';
import GamesList from '../components/GamesList';
import Column from '../components/Column';
import SearchBar from '../components/SearchBar';
import Container from '../components/Container';

const Banner = styled.div`
  width: 100%;
  border-bottom: 3px solid ${({ theme }) => theme.border};
  text-align: center;
  padding: 2.3rem 0 2rem;

  h1 {
    font-size: 50px;
    font-weight: 500;
    color: ${({ theme }) => theme.primary};
    font-weight:
  }
`;

const HomeContainer = styled(Container)`
  flex-direction: column;
  align-items: center;
  padding-top: 6rem;
`;

const HomeColumn = styled(Column)`
  margin-top: 15rem;
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
        <Banner>
          <h1>FN Dash</h1>
        </Banner>
        <HomeContainer>
          <SearchBar />
          <HomeColumn>
            <GamesList games={data} title="Recent Games" />
          </HomeColumn>
        </HomeContainer>
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
