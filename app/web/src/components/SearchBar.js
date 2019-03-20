import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Select from 'react-select';
import { actions as usersActions } from '../ducks/users';
import { theme as mainTheme } from '../assets/constants/colors';

class SearchBar extends React.PureComponent {
  componentDidMount() {
    const { requestUserList } = this.props;

    requestUserList();
  }

  render() {
    const {
      users, goTo, styles, placeholder,
    } = this.props;
    const { data } = users;

    const selectStyles = {
      container: base => ({
        ...base,
        fontWeight: '200',
        color: mainTheme.secondary,
        width: '100%',
        maxWidth: 240,
      }),
      control: base => ({
        ...base,
        backgroundColor: mainTheme.secondary,
        width: '100%',
        border: 'none',
        boxShadow: 'none',
        cursor: 'text',
        transition: 'none',
      }),
      clearIndicator: base => ({
        ...base,
        color: mainTheme.offWhite,
        cursor: 'pointer',
        '&:hover': {
          color: mainTheme.primary,
        },
      }),
      singleValue: base => ({
        ...base,
        color: mainTheme.white,
      }),
      placeholder: base => ({
        ...base,
        color: mainTheme.offWhite,
      }),
      input: base => ({
        ...base,
        color: mainTheme.white,
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
          color: mainTheme.white,
          backgroundColor: mainTheme.secondary,
        },
        color: state.isSelected ? mainTheme.white : mainTheme.offWhite,
        backgroundColor: state.isSelected ? mainTheme.secondary : mainTheme.primary,
        cursor: 'pointer',
      }),
      indicatorSeparator: base => ({
        ...base,
        backgroundColor: 'none',
      }),
      dropdownIndicator: base => ({
        ...base,
        cursor: 'pointer',
        color: mainTheme.offWhite,
        '&:hover': {
          color: mainTheme.primary,
        },
      }),
    };

    const userOptions = Object.values(data)
      .map(u => ({
        value: u.id,
        label: u.username,
      }))
      .sort((a, b) => {
        if (!a.label) return -1;
        if (!b.label) return 1;
        if (a.label.toUpperCase() < b.label.toUpperCase()) {
          return -1;
        }
        if (a.label.toUpperCase() > b.label.toUpperCase()) {
          return 1;
        }
        return 0;
      })
      .filter(u => u.label && u.value);

    return (
      <Select
        options={userOptions}
        styles={styles || selectStyles}
        onChange={option => goTo(`/users/${option.value}`)}
        isClearable={false}
        placeholder={placeholder || 'Search...'}
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
