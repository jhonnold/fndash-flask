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
  background-color: ${({ theme }) => theme.black};
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

const SiteTitle = styled.span`
  margin: 0.5rem 1rem 0.5rem 0;

  img {
    max-height: 2.5rem;
  }
`;

const HeaderBreak = styled.div`
  width: calc(100% - 1rem);
  margin: 0 0.5rem;
  background-color: ${({ theme }) => theme.border};
  height: 1px;
`;

const Name = styled.h2`
  text-transform: uppercase;
  color: ${({ theme }) => theme.primary};
  margin: 0;
`;

const TabList = styled.ul`
  list-style-type: none;
  line-height: 1.6;
  margin: 0;
  display: flex;
  align-items: center;
`;

const Tab = styled.li`
  > button {
    color: ${({ isActive, theme }) => (isActive ? theme.primary : theme.white)};
    padding: 1rem;
    text-transform: capitalize;
    cursor: pointer;
    font-weight: 300;
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
            <Row>
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
            </Row>
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
