
export const SYSTEM_CONFIG_LOADED = 'SYSTEM_CONFIG_LOADED';
export const SYSTEM_CONFIG_FAILED = 'SYSTEM_CONFIG_FAILED';
export const SYSTEM_ERROR = 'SYSTEM_ERROR';
export const RESET_SYSTEM_ERROR = 'RESET_SYSTEM_ERROR';
export const UPDATE_DEVICE_INFO = 'UPDATE_DEVICE_INFO';

export const systemErrorManager = (code, errorMsg) => (dispatch, getState) => {
  dispatch({ type: SYSTEM_ERROR, payload: { code, errorMsg } });
}