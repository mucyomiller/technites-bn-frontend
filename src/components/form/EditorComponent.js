/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./EditorComponent.scss";

// Comment Editor
const EditorComponent = ({ handleChange }) => {
  const [editorState, setEditorState] = useState(
    EditorState.createEmpty(),
  );

  const send = () => {
    // prepare data
    const rawContent = convertToRaw(editorState.getCurrentContent());
    const markup = draftToHtml(rawContent);
    // dispatch save action
    handleChange(markup);
  };

  useEffect(() => {
    send();
  }, [editorState]);

  return (
    <div className="flex flex-row vertical-center">
      <Editor
        editorState={editorState}
        toolbarClassName="comment-toolbar"
        wrapperClassName="comment-editor-wrapper"
        editorClassName="comment-editor"
        onEditorStateChange={setEditorState}
      />
    </div>
  );
};

export default EditorComponent;
