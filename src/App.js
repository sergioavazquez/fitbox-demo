import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as GlobalActions from './actions';
import { debounce } from './utils';
import { ErrorScreen } from './elements/notifications';
import Routes from './routes';


class App extends Component {
  constructor(props) {
    super(props);
    this.updateScreenSize = debounce(this.updateScreenSize.bind(this), 25);
  }

  componentDidMount() {
    const { initApp } = this.props;
    initApp();
    this.updateScreenSize();
    // Attach listeners
    window.addEventListener('resize', this.updateScreenSize, false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateScreenSize, false);
  }

  updateScreenSize() {
    const { height, width, updateDeviceInfo } = this.props;
    let newState = { updated: false };

    const newHeight = window.innerHeight;
    const newWidth = window.innerWidth;

    if (newWidth !== width || newHeight !== height) {
      newState['height'] = newHeight;
      newState['width'] = newWidth;
      newState['updated'] = true;
    }

    if (newState.updated) {
      delete newState.updated;
      updateDeviceInfo(newState);
    }
  }

  render() {
    const { config, mainError } = this.props;
    let appRender;

    if (mainError.code) {
      appRender = (<ErrorScreen error={mainError} />);
    } else {
      if (!config) {
        appRender = <div>Loading...</div>
      } else {
        appRender = Routes({ config });
      }
    }
    return <div className="App">{appRender}</div>;
  }
}

function mapStateToProps(state) {
  const { isConfigReady, mainError, config } = state.systemReducer;
  return {
    isConfigReady,
    config,
    mainError
  }
}
const mapDispatchToProps = (dispatch, ownProps, state) => {
  return {
    // This is the first method to be executed, if it fails it displays an error.
    initApp: function (configFile) {
      const config = { data: 'ok' };
      dispatch({ type: GlobalActions.SYSTEM_CONFIG_LOADED, payload: { config } });
    },

    updateDeviceInfo: (info) => {
      dispatch({ type: GlobalActions.UPDATE_DEVICE_INFO, payload: info });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
