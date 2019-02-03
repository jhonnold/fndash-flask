import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import $ from 'jquery';
import { actions as usersActions } from '../ducks/users';

class Header extends React.PureComponent {
  componentDidMount() {
    $(document).foundation();

    const { requestUserList } = this.props;

    requestUserList();
  }

  render() {
    const { users, match } = this.props;
    const { data } = users;

    const user = users.data[match.params.userId];

    const { username, id } = user;

    return (
      <div className="header">
        <div className="header__container">
          <nav className="header__top">
            <span className="header__title">Fortnite Dashboard</span>
            <ul className="header__name-menu" data-dropdown-menu>
              <li>
                <a href={`/users/${id}`}>{username}</a>
                <ul className="menu">
                  {Object.values(data).map(u => (
                    <li key={u.id}>
                      <Link to={`/users/${u.id}`}>{u.username}</Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
          <div className="header__break" />
          <div className="header__lower-menu">
            <span className="header__name">
              <h2>{username}</h2>
            </span>
            <ul className="header__mode-tabs" data-tabs id="mode-tabs">
              <li className="header__mode-tabs-title tabs-title is-active">
                <a href="#all_stats">All</a>
              </li>
              <li className="header__mode-tabs-title tabs-title">
                <a href="#solo_stats">Solo</a>
              </li>
              <li className="header__mode-tabs-title tabs-title">
                <a href="#duo_stats">Duo</a>
              </li>
              <li className="header__mode-tabs-title tabs-title">
                <a href="#squad_stats">Squad</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => ({
  users,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(usersActions, dispatch),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Header),
);
