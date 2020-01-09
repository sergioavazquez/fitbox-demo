// App Global Reducers
import { combineReducers } from 'redux';
import * as GlobalActions from '../actions';

const systemInitState = {
  isConfigReady: false,
  mainError: {
    code: null,
    errorMsg: null
  },
  config: null
}

function systemReducer(state = systemInitState, action) {
  switch (action.type) {
    case GlobalActions.SYSTEM_CONFIG_LOADED:
      return {
        ...state,
        isConfigReady: true,
        config: action.payload.config,
      }
    case GlobalActions.SYSTEM_CONFIG_FAILED:
      return {
        ...state,
        isConfigReady: true,
        mainError: {
          code: 400,
          errorMsg: "Configuration Error"
        }
      }
    case GlobalActions.SYSTEM_ERROR:
      return {
        ...state,
        mainError: action.payload,
      }
    case GlobalActions.RESET_SYSTEM_ERROR:
      return {
        ...state,
        mainError: {
          code: null,
          errorMsg: null
        }
      }
    default:
      return {
        ...state,
      }

  }
}

const deviceInfoInitState = {
  height: null,
  width: null,
  landscape: false,
}

function deviceInfoReducer(state = deviceInfoInitState, action) {
  switch (action.type) {
    case GlobalActions.UPDATE_DEVICE_INFO:
      return {
        ...state,
        height: action.payload.height,
        width: action.payload.width,
        landscape: (action.payload.width > action.payload.height) ? true : false,
      }
    default:
      return {
        ...state,
      }
  }
}

const rootReducer = combineReducers({
  systemReducer,
  deviceInfoReducer
})

export default rootReducer