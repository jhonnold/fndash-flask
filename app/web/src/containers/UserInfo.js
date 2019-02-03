import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions as userActions } from '../ducks/users';

class UserInfo extends React.PureComponent {
  componentDidMount() {
    const { requestUser, match } = this.props;

    requestUser(match.params.userId);
  }

  componentDidUpdate(prevProps) {
    const { match: prevMatch } = prevProps;
    const { match, requestUser } = this.props;

    if (match.params.userId !== prevMatch.params.userId) requestUser(match.params.userId);
  }

  render() {
    const { users, match, ui } = this.props;
    const { data } = users;

    const user = users.data[match.params.userId] || {};

    const { wins_total, matchesplayed_total, kills_total } = user;

    return (
      <div className="stats">
        <div className="stats__container">
          <div className="stats__number-stat">
            <h2>
              <i className="fas fa-trophy" />
            </h2>
            <h2>{wins_total}</h2>
            <h3>Victories</h3>
          </div>
          <div className="stats__number-stat">
            <h2>
              <i className="fas fa-gamepad" />
            </h2>
            <h2>{matchesplayed_total}</h2>
            <h3>Matches</h3>
          </div>
          <div className="stats__number-stat">
            <h2>
              <i className="fas fa-skull" />
            </h2>
            <h2>{kills_total}</h2>
            <h3>Kills</h3>
          </div>
          <div className="stats__number-stat">
            <h2>
              <i className="fas fa-crosshairs" />
            </h2>
            {/* TODO - SHOW PROPER KD */}
            <h2>1.2</h2>
            <h3>K/D</h3>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users, ui }) => ({
  users,
  ui,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(userActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserInfo);
