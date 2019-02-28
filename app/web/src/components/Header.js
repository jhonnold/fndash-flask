import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Helmet } from 'react-helmet';
import Select from 'react-select';
import styled from 'styled-components';
import { actions as usersActions } from '../ducks/users';
import { actions as uiActions } from '../ducks/ui';
import Container from './Container';
import { theme as mainTheme } from '../assets/constants/colors';

const selectStyles = {
  container: base => ({
    ...base,
    fontWeight: '200',
    color: mainTheme.primary,
    width: '100%',
    maxWidth: 240,
  }),
  control: base => ({
    ...base,
    backgroundColor: mainTheme.black,
    width: '100%',
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
    color: mainTheme.fontColor,
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
      users, match, ui, setGameMode, goTo,
    } = this.props;
    const { data } = users;

    const user = users.data[match.params.userId] || {};

    const { username } = user;
    const userOptions = Object.values(data).map(u => ({
      value: u.id,
      label: u.username,
    }));

    return (
      <React.Fragment>
        <Helmet>
          <title>{`${username} Stats - FN Dashboard`}</title>
        </Helmet>
        <HeaderDiv>
          <HeaderContainer>
            <Row>
              <SiteTitle>Fortnite Dashboard</SiteTitle>
              <Select
                options={userOptions}
                styles={selectStyles}
                onChange={option => goTo(`/users/${option.value}`)}
                isClearable={false}
                value={{ label: user.username, value: user.id }}
              />
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
