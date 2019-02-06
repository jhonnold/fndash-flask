import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { Helmet } from 'react-helmet';
import { actions as usersActions } from '../ducks/users';
import { actions as uiActions } from '../ducks/ui';

class Header extends React.PureComponent {
  componentDidMount() {
    const { requestUserList } = this.props;

    requestUserList();

    $(document).foundation();
  }

  render() {
    const {
      users, match, ui, setGameMode,
    } = this.props;
    const { data } = users;

    const user = users.data[match.params.userId] || {};

    const { username } = user;

    return (
      <React.Fragment>
        <Helmet>
          <title>{`${username} Stats - FN Dashboard`}</title>
        </Helmet>
        <div className="header">
          <div className="header__container">
            <nav className="header__top">
              <span className="header__title">Fortnite Dashboard</span>
              <ul className="header__name-menu" data-dropdown-menu>
                <li>
                  {/* eslint-disable-next-line */}
                  <a href="#">{username}</a>
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
              <ul className="header__mode-tabs">
                {['all', 'solo', 'duo', 'squad'].map(v => (
                  <li
                    key={v}
                    className={`header__mode-tabs-title ${ui.mode === v ? 'is-active' : ''}`}
                  >
                    <button type="button" onClick={() => setGameMode(v)}>
                      {v}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
