import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import styled from 'styled-components';
import { actions as usersActions } from '../../ducks/users';
import { Container, Row, SingleSelect } from '../../elements';
import alphabetize from '../../util/alphabetize';

import logo from '../../assets/images/horizontal-logo.png';

const HeaderWrapper = styled.div`
  background-color: ${({ theme }) => theme.primary};
`;

const HeaderRow = styled(Row)`
  justify-content: space-between;
  padding: 0 0.5rem;

  @media (min-width: 768px) {
    padding: 0 1rem;
  }
`;

const HeaderLogo = styled.img`
  max-height: 2.5rem;
`;

const HeaderSelect = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  margin-left: 1rem;
`;

const HeaderName = styled.h1`
  font-family: Burbank;
  text-transform: uppercase;
  text-align: center;
  width: 100%;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    width: auto;
    margin: 0;
  }
`;

const HeaderTabContainer = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin: 0 0 -0.5rem;
  width: 100%;

  @media (min-width: 768px) {
    width: auto;
    margin: 0 0 -1rem;
  }
`;

const HeaderTab = styled.li`
  margin: 0 0.5rem;
  padding: 0.75rem;
  color: ${({ theme, active }) => (active ? theme.white : theme.offWhite)};
  background-color: ${({ theme, active }) => (active ? theme.offPrimary : 'transparent')};
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  cursor: pointer;
`;

const PlayerHeader = ({
  requestUserList, goTo, users, match,
}) => {
  useEffect(() => {
    requestUserList();
  }, requestUserList);

  const { data } = users;
  const user = data[match.params.userId];
  const username = user ? user.username : '';

  const userList = Object.values(data)
    .map(u => ({ value: u.id, label: u.username }))
    .filter(u => u.label && u.value)
    .sort(alphabetize);

  return (
    <HeaderWrapper>
      <Container>
        <HeaderRow style={{ marginBottom: '2rem' }}>
          <HeaderLogo src={logo} />
          <HeaderSelect>
            <SingleSelect
              options={userList}
              onChange={({ value }) => goTo(`/users/${value}`)}
              isClearable={false}
              placeholder="Select Player..."
            />
          </HeaderSelect>
        </HeaderRow>
        <HeaderRow>
          <HeaderName>{username}</HeaderName>
          <HeaderTabContainer>
            <HeaderTab active>Overview</HeaderTab>
            <HeaderTab>Charts</HeaderTab>
            <HeaderTab>Compare</HeaderTab>
          </HeaderTabContainer>
        </HeaderRow>
      </Container>
    </HeaderWrapper>
  );
};

const mapStateToProps = ({ users }) => ({
  users,
});

const mapDispatchToProps = dispatch => ({
  requestUserList: () => dispatch(usersActions.requestUserList()),
  goTo: url => dispatch(push(url)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlayerHeader);
