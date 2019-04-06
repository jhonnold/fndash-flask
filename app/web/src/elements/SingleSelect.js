import React from 'react';
import Select from 'react-select';
import { theme } from '../assets/constants/colors';

const selectStyles = {
  container: base => ({
    ...base,
    color: theme.secondary,
    width: '100%',
    maxWidth: 300,
  }),
  control: base => ({
    ...base,
    backgroundColor: theme.secondary,
    width: '100%',
    border: 'none',
    boxShadow: 'none',
    cursor: 'text',
    transition: 'none',
  }),
  clearIndicator: base => ({
    ...base,
    color: theme.offWhite,
    cursor: 'pointer',
    '&:hover': {
      color: theme.primary,
    },
  }),
  singleValue: base => ({
    ...base,
    color: theme.white,
  }),
  placeholder: base => ({
    ...base,
    color: theme.offWhite,
  }),
  input: base => ({
    ...base,
    color: theme.white,
  }),
  menu: base => ({
    ...base,
    backgroundColor: theme.black,
    borderRadius: 0,
    border: `1px solid ${theme.white}`,
  }),
  option: (base, state) => ({
    ...base,
    '&:hover': {
      color: theme.white,
      backgroundColor: theme.secondary,
    },
    color: state.isSelected ? theme.white : theme.offWhite,
    backgroundColor: state.isSelected ? theme.secondary : theme.primary,
    cursor: 'pointer',
  }),
  indicatorSeparator: base => ({
    ...base,
    backgroundColor: 'none',
  }),
  dropdownIndicator: base => ({
    ...base,
    cursor: 'pointer',
    color: theme.offWhite,
    '&:hover': {
      color: theme.white,
    },
  }),
};

export default ({ styles, ...restProps }) => (
  <Select {...restProps} styles={styles || selectStyles} />
);
