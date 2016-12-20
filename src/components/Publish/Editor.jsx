/**
 * Created by JonirRings on 2016/10/29.
 */
import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import withStyle from 'isomorphic-style-loader/lib/withStyles';
import s from './Editor.css';
import AddPostMutation from './AddPostMutation';

class PublishEditor extends Component {
  static propTypes={
    viewer: PropTypes.shape().isRequired,
  };
  static contextTypes = {
    relay: Relay.PropTypes.Environment,
  };
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    this.context.relay.commitUpdate(
      new AddPostMutation({
        title: this.input.value,
        content: this.textArea.value,
        viewer: this.props.viewer,
      }),
    );
    event.preventDefault();
  }
  render() {
    return (
      <div className={s.publish}>
        <div>Publish page should provide an editor</div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title">title:<input id="title" type="text" ref={input => this.input = input} /></label>
          <div className={s.editorContainer}>
            <textarea ref={textArea => this.textArea = textArea} />
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
export default withStyle(s)(PublishEditor);
