import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { actions as gamesActions } from '../ducks/games';
import GamesList from '../components/GamesList';
import Column from '../components/Column';
import SearchBar from '../components/SearchBar';
import Container from '../components/Container';
import Footer from '../components/Footer';
import SignUp from '../components/SignUp';
import { theme as mainTheme } from '../assets/constants/colors';
import logo from '../assets/images/vertical-logo.png';

const Banner = styled.div`
  width: 100%;
  box-shadow: 0px 4px 2px -2px ${({ theme }) => theme.black};
  text-align: center;
  padding: 2.25rem 0 2rem;
  background-color: ${({ theme }) => theme.black};

  h1 {
    font-size: 50px;
    font-weight: 500;
    color: ${({ theme }) => theme.primary};
    font-weight:
  }

  img {
    max-height: 16rem;
  }
`;

const HomeContainer = styled(Container)`
  flex-direction: column;
  align-items: center;
  padding-top: 4rem;
`;

const HomeColumn = styled(Column)`
  margin-top: 4rem;

  @media (min-width: 640px) {
    width: 750px;
  }
`;

const homeStyles = {
  container: base => ({
    ...base,
    fontWeight: '200',
    color: mainTheme.primary,
    width: '100%',
    maxWidth: 760,
  }),
  control: base => ({
    ...base,
    backgroundColor: mainTheme.black,
    width: '100%',
    height: '100%',
    border: 'none',
    boxShadow: 'none',
    cursor: 'text',
    transition: 'none',
  }),
  clearIndicator: base => ({
    ...base,
    color: mainTheme.fontColor,
    cursor: 'pointer',
    '&:hover': {
      color: mainTheme.primary,
    },
  }),
  singleValue: base => ({
    ...base,
    color: mainTheme.fontColor,
  }),
  placeholder: base => ({
    ...base,
    // color: mainTheme.fontColor,
  }),
  input: base => ({
    ...base,
    color: mainTheme.primaryFont,
  }),
  menu: base => ({
    ...base,
    backgroundColor: mainTheme.black,
    // boxShadow: '0 14px 12px rgba(0,0,0,.25), 0 10px 8px rgba(0,0,0,.22)',
    borderRadius: 0,
    border: `1px solid ${mainTheme.white}`,
    // marginTop: '-0.125rem',
  }),
  option: (base, state) => ({
    ...base,
    '&:hover': {
      color: mainTheme.primary,
      backgroundColor: mainTheme.darkGray,
    },
    color: state.isSelected ? mainTheme.primary : mainTheme.fontColor,
    backgroundColor: mainTheme.black,
    cursor: 'pointer',
  }),
  indicatorSeparator: base => ({
    ...base,
    backgroundColor: 'none',
  }),
  dropdownIndicator: base => ({
    ...base,
    cursor: 'pointer',
    color: mainTheme.fontColor,
    '&:hover': {
      color: mainTheme.primary,
    },
  }),
};

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
        <SignUp />
        <Banner>
          <img src={logo} alt="Logo" />
        </Banner>
        <HomeContainer>
          <SearchBar styles={homeStyles} placeholder="Select User..." />
          <HomeColumn>
            <GamesList games={data} title="All Recent Games" />
          </HomeColumn>
        </HomeContainer>
        <Footer />
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
