import React, {PropTypes} from 'react';

class App extends React.Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  render() {
    return React.Children.only(this.props.children);
  }

}

export default App;
