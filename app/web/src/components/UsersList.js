import React from 'react';
import moment from 'moment-timezone';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Card from './Card';
import { pSBC } from '../assets/constants/colors';

const Username = styled.span`
  padding: 0.5rem;
  margin: 0.5rem;
  background-color: ${({ theme }) => pSBC(-0.125, theme.primary, false, true)};
  border-left: 0.0625rem solid ${({ theme }) => theme.lightGreen};
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: 640px) {
    width: calc(50% - 1rem);
  }

  h5 {
    display: inline-block;
    margin: 0;
  }

  p {
    margin: 0;
    font-size: 0.75rem;
    color: ${({ theme }) => theme.offWhite};
  }

  span {
    margin-right: 1rem;

    i {
      margin-right: 0.25rem;
    }
  }
`;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const H5 = styled.h5`
  color: ${({ theme }) => theme.offWhite};
`;

function UsersList({ title, users = [] }) {
  const usernames = users.map(u => (
    <Username key={u.id}>
      <Link to={`/users/${u.id}`}>
        <h5>{u.username}</h5>
        <p>Played {moment(u.playedAt).fromNow()}</p>
        <div>
          <span>
            <i className="fas fa-skull" /> {u.kills}
          </span>
          <span>
            <i className="fas fa-crosshairs" />
            {u.kd.toFixed(3)}
          </span>
        </div>
      </Link>
    </Username>
  ));

  return (
    <Card>
      <h3>{title}</h3>
      <List>{usernames.length > 0 ? usernames : <H5>No Active Users at this Time</H5>}</List>
    </Card>
  );
}

export default UsersList;
