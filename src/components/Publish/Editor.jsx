/**
 * Created by JonirRings on 2016/10/29.
 */
import React, { Component, PropTypes } from 'react';
import { Editor, EditorState } from 'draft-js';
import withStyle from 'isomorphic-style-loader/lib/withStyles';
import s from './Editor.css';

class PublishEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = editorState => this.setState({ editorState });
  }

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <div>Publish page should provide an editor</div>
        <label>title:<input type="text" /></label>
        <div className={s.editorContainer}>
          <Editor editorState={editorState} onChange={this.onChange} />
        </div>
      </div>
    );
  }
}
export default withStyle(s)(PublishEditor);
