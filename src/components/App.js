// @flow
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const contextType = {
  insertCss: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  setDescription: PropTypes.func.isRequired,
};

type Props = {
  context: any,
  children: React$Element<any>,
};

class App extends PureComponent {
  static childContextTypes = contextType;
  getChildContext() {
    return this.props.context;
  }
  props: Props;
  render() {
    return React.Children.only(this.props.children);
  }
}


export default App;
