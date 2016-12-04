/**
 * Created by JonirRings on 2016/10/29.
 */
import React, { Component, PropTypes } from 'react';
import { Editor, EditorState } from 'draft-js';
import withStyle from 'isomorphic-style-loader/lib/withStyles';
import s from './Editor.css';
import AddPostMutation from './AddPostMutation';

class PublishEditor extends Component {
  static propTypes={
    relay: PropTypes.any,
    viewer: PropTypes.any.isRequired,
  };
  constructor(props) {
    super(props);
    this.onContentChange = this.onContentChange.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
  }
  onContentChange(event) {
    this.setState({ content: event.target.value });
  }
  onTitleChange(event) {
    this.setState({ title: event.target.value });
  }
  addPost() {
    this.props.relay.commitUpdate(
      new AddPostMutation({ ...this.state, viewer:this.props.viewer }),
    );
  }
  render() {
    return (
      <div className={s.publish}>
        viewer:{this.props.viewer.name}
        <div>Publish page should provide an editor</div>
        <label>title:<input type="text" onChange={this.onTitleChange} /></label>
        <div className={s.editorContainer}>
          <textarea onChange={this.onContentChange} />
        </div>
        <button onClick={this.addPost.bind(this)}>Add Post</button>
      </div>
    );
  }
}
export default withStyle(s)(PublishEditor);
