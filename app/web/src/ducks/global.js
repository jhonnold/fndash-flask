const ALL_DATA_REQUESETED = 'fn-dash/global/ALL_DATA_REQUESTED';
const MODE_DEPENDANT_DATA_REQUESTED = 'fn-dash/global/MODE_DEPENDANT_DATA_REQUESTED';

export const types = {
  ALL_DATA_REQUESETED,
  MODE_DEPENDANT_DATA_REQUESTED,
};

const requestAllData = (id, mode) => ({
  type: ALL_DATA_REQUESETED,
  payload: {
    id,
    mode,
  },
});

const requestModeDependantData = (id, mode) => ({
  type: MODE_DEPENDANT_DATA_REQUESTED,
  payload: {
    id,
    mode,
  },
});

export const actions = {
  requestAllData,
  requestModeDependantData,
};
