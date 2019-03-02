import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Select from 'react-select';
import { actions as usersActions } from '../ducks/users';
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

class SearchBar extends React.PureComponent {
  componentDidMount() {
    const { 
      requestUserList,
    } = this.props;

    requestUserList();
  }

  render() {
    const {
      users, goTo,
    } = this.props;
    const { data } = users;

    const userOptions = Object.values(data).map(u => ({
      value: u.id,
      label: u.username,
    }));

    return (
      <Select
        options={userOptions}
        styles={selectStyles}
        onChange={option => goTo(`/users/${option.value}`)}
        isClearable={false}
        value={{ label: userOptions.label, value: userOptions.value }}
      />
    );
  }
}

const mapStateToProps = ({ users, ui }) => ({
  users,
  ui,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(usersActions, dispatch),
  goTo: url => dispatch(push(url)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchBar);
