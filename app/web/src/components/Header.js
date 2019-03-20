import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { actions as usersActions } from '../ducks/users';
import { actions as uiActions } from '../ducks/ui';
import Container from './Container';
import SearchBar from './SearchBar';

import logo from '../assets/images/horizontal-logo.png';

const HeaderDiv = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.primary};
`;

const HeaderContainer = styled(Container)`
  padding: 0 1rem;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  width: 100%;
`;

const ResponsiveRow = styled(Row)`
  flex-wrap: wrap;
  margin-top: 2rem;

  @media (max-width: 639px) {
    margin-top: 0rem;
    justify-content: center;
  }
`;

const SiteTitle = styled.span`
  margin: 0.5rem 1rem 0.5rem 0;

  img {
    max-height: 2.5rem;
  }
`;

const HeaderBreak = styled.div`
  width: calc(100% - 1rem);
  margin: 0 0.5rem;
  height: 1px;
`;

const Name = styled.h1`
  text-transform: uppercase;
  margin: 0;

  @media (max-width: 639px) {
    margin: 0.5rem;
  }
`;

const TabList = styled.ul`
  list-style-type: none;
  line-height: 1.6;
  margin: 0;
  display: flex;
  align-items: center;

  @media (max-width: 639px) {
    margin: 0.5rem;
  }
`;

const Tab = styled.li`
  > button {
    text-decoration: ${({ isActive }) => (isActive ? 'underline' : 'none')};
    color: ${({ isActive, theme }) => (isActive ? theme.white : theme.offWhite)};
    padding: 1rem;
    text-transform: capitalize;
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.white};
    }
  }
`;

class Header extends React.PureComponent {
  componentDidMount() {
    const { requestUserList } = this.props;

    requestUserList();
  }

  render() {
    const {
      users, match, ui, setGameMode,
    } = this.props;

    const user = users.data[match.params.userId] || {};

    const { username } = user;

    return (
      <React.Fragment>
        <Helmet>
          <title>{`${username} Stats - FN Dash`}</title>
        </Helmet>
        <HeaderDiv>
          <HeaderContainer>
            <Row>
              <SiteTitle>
                <Link to="/">
                  <img src={logo} alt="FN Dash Logo" />
                </Link>
              </SiteTitle>
              <SearchBar placeholder="Select User..." />
            </Row>
            <HeaderBreak />
            <ResponsiveRow>
              <Name>{username}</Name>
              <TabList>
                {['all', 'solo', 'duo', 'squad'].map(v => (
                  <Tab key={v} isActive={v === ui.mode}>
                    <button type="button" onClick={() => setGameMode(v)}>
                      {v}
                    </button>
                  </Tab>
                ))}
              </TabList>
            </ResponsiveRow>
          </HeaderContainer>
        </HeaderDiv>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ users, ui }) => ({
  users,
  ui,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(usersActions, dispatch),
  ...bindActionCreators(uiActions, dispatch),
  goTo: url => dispatch(push(url)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
