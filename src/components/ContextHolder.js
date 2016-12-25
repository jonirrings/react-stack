/**
 * Created by peterf on 2016/11/28.
 */
import React, { Component, PropTypes } from 'react';

const contextType = {
  insertCss: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
};

const propTypes = {
  context: PropTypes.shape(contextType).isRequired,
  children: PropTypes.element.isRequired,
};

class ContextHolder extends Component {
  getChildContext() {
    return this.props.context;
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

ContextHolder.propTypes = propTypes;
ContextHolder.childContextTypes = contextType;

export default ContextHolder;
