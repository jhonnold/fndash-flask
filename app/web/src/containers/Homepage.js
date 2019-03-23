import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { actions as userActions } from '../ducks/users';
import UsersList from '../components/UsersList';
import Column from '../components/Column';
import SearchBar from '../components/SearchBar';
import Container from '../components/Container';
import Footer from '../components/Footer';
import SignUp from '../components/SignUp';
import Banner from '../components/Banner';
import { theme as mainTheme } from '../assets/constants/colors';

const HomeContainer = styled(Container)`
  flex-direction: column;
  align-items: center;
  padding-top: 4rem;
  flex: 1;
`;

const HomeColumn = styled(Column)`
  margin-top: 4rem;
  max-width: 750px
  width: 100%;

  @media (min-width: 640px) {
    width: 100%;
  }
`;

const homeStyles = {
  container: base => ({
    ...base,
    fontWeight: '200',
    color: mainTheme.primary,
    width: 'calc(100% - 2rem)',
    maxWidth: 'calc(750px - 2rem)',
    margin: '0 1rem',
  }),
  control: base => ({
    ...base,
    backgroundColor: mainTheme.primary,
    width: '100%',
    height: '100%',
    minHeight: 50,
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
    const { startRequestingActiveUsers } = this.props;

    startRequestingActiveUsers();
  }

  componentWillUnmount() {
    const { stopRequestingActiveUsers } = this.props;

    stopRequestingActiveUsers();
  }

  onJoin(username) {
    const { requestJoinUser } = this.props;

    requestJoinUser(username);
  }

  render() {
    const { signupOpen } = this.state;
    const { users } = this.props;

    const { activeUsers } = users.data;

    return (
      <React.Fragment>
        {signupOpen && (
          <SignUp
            users={users}
            onSubmit={this.onJoin}
            onClose={() => this.setState({ signupOpen: false })}
          />
        )}
        <Banner />
        <HomeContainer>
          <SearchBar styles={homeStyles} placeholder="Select Player..." />
          <HomeColumn>
            <UsersList users={activeUsers} title="Active Players" />
          </HomeColumn>
        </HomeContainer>
        <Footer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ users }) => ({
  users,
});

const matchDispatchToProps = dispatch => ({
  ...bindActionCreators(userActions, dispatch),
  requestJoinUser: uid => dispatch(userActions.requestJoinUser(uid)),
});

export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(Homepage);
