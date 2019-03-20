import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Card from './Card';
import { pSBC } from '../assets/constants/colors';

const Username = styled.span`
  padding: 0.5rem;
  margin: 0.5rem 1rem 0.5rem 0;
  background-color: ${({ theme }) => pSBC(-0.125, theme.primary, false, true)};
  border-left: 0.0625rem solid ${({ theme }) => theme.lightGreen};
  border-radius: 0.25rem;

  h5 {
    display: inline-block;
    margin: 0;
  }
`;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function UsersList({ title, users = [] }) {
  const usernames = users.map(u => (
    <Username key={u.id}>
      <h5>
        <Link to={`/users/${u.id}`}>{u.username}</Link>
      </h5>
    </Username>
  ));

  return (
    <Card>
      <h3>{title}</h3>
      <List>{usernames.length > 0 ? usernames : <h5>No Active Users at this Time</h5>}</List>
    </Card>
  );
}

export default UsersList;
