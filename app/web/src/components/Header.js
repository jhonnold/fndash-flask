import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';
import { actions as usersActions } from '../ducks/users';

class Header extends React.PureComponent {
  componentDidMount() {
    $(document).foundation();

    const { requestUserList } = this.props;

    requestUserList();
  }

  render() {
    return (
      <div className="header">
        <div className="header__container">
          <nav className="header__top">
            <span className="header__title">Fortnite Dashboard</span>
            <ul className="header__name-menu" data-dropdown-menu>
              <li>
                {/* TODO - SHOW PROPER USERNAME FROM PROPS */}
                <a href="/users/1">Zomby</a>
                <ul className="menu">
                  {/* TODO - MAP USERS TO LI */}
                  <li>
                    <a href="/users/1">Zomby</a>
                  </li>
                  <li>
                    <a href="/users/1">Zomby</a>
                  </li>
                  <li>
                    <a href="/users/1">Zomby</a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
          <div className="header__break" />
          <div className="header__lower-menu">
            <span className="header__name">
              {/* TODO - DISPLAY REAL NAME */}
              <h2>Zomby</h2>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
