import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { actions as gamesActions } from '../ducks/games';
import { actions as userActions } from '../ducks/users';
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
  box-shadow: 0px 4px 2px -2px ${({ theme }) => theme.primary};
  text-align: center;
  padding: 2.25rem 0 2rem;
  background-color: ${({ theme }) => theme.primary};

  h1 {
    font-size: 50px;
    font-weight: 500;
    color: ${({ theme }) => theme.primary};
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
    backgroundColor: mainTheme.primary,
    width: '100%',
    height: '100%',
    border: 'none',
    boxShadow: 'none',
    cursor: 'text',
    transition: 'none',
  }),
  clearIndicator: base => ({
    ...base,
    color: mainTheme.offWhite,
    cursor: 'pointer',
    '&:hover': {
      color: mainTheme.primary,
    },
  }),
  singleValue: base => ({
    ...base,
    color: mainTheme.white,
  }),
  placeholder: base => ({
    ...base,
    color: mainTheme.offWhite,
  }),
  input: base => ({
    ...base,
    color: mainTheme.white,
  }),
  menu: base => ({
    ...base,
    backgroundColor: mainTheme.primary,
    borderRadius: 0,
    border: `1px solid ${mainTheme.white}`,
  }),
  option: (base, state) => ({
    ...base,
    '&:hover': {
      color: mainTheme.white,
      backgroundColor: mainTheme.secondary,
    },
    color: state.isSelected ? mainTheme.white : mainTheme.offWhite,
    backgroundColor: state.isSelected ? mainTheme.secondary : mainTheme.primary,
    cursor: 'pointer',
  }),
  indicatorSeparator: base => ({
    ...base,
    backgroundColor: 'none',
  }),
  dropdownIndicator: base => ({
    ...base,
    cursor: 'pointer',
    color: mainTheme.offWhite,
    '&:hover': {
      color: mainTheme.primary,
    },
  }),
};

class Homepage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      signupOpen: true,
    };

    this.onJoin = this.onJoin.bind(this);
  }

  componentDidMount() {
    const { requestRecentGames } = this.props;

    requestRecentGames();
  }

  onJoin(uid) {
    const { requestJoinUser, rejectedJoinUser } = this.props;

    if (uid.length !== 32) {
      rejectedJoinUser('Invalid UID');
      return;
    }

    requestJoinUser(uid);
  }

  render() {
    const { signupOpen } = this.state;
    const { games, users } = this.props;

    const data = games.data.games;

    return (
      <React.Fragment>
        {signupOpen && (
          <SignUp
            users={users}
            onSubmit={this.onJoin}
            onClose={() => this.setState({ signupOpen: false })}
          />
        )}
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

const mapStateToProps = ({ games, users }) => ({
  games,
  users,
});

const matchDispatchToProps = dispatch => ({
  ...bindActionCreators(gamesActions, dispatch),
  requestJoinUser: uid => dispatch(userActions.requestJoinUser(uid)),
  rejectedJoinUser: err => dispatch(userActions.rejectedJoinUser(err)),
});

export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(Homepage);
