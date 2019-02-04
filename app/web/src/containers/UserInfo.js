import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions as userActions } from '../ducks/users';
import Stats from '../components/Stats';

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

    const user = users.data[match.params.userId] || {};
    const data = user[ui.mode] || {};

    return (
      <React.Fragment>
        <Stats data={data} />
        <div className="minute-data">
          <div className="minute-data__container" />
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
  ...bindActionCreators(userActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserInfo);
