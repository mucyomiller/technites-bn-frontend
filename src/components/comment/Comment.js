import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from 'react-redux'
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from 'draftjs-to-html';
import { toast } from "react-toastify";
import moment from "moment";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { retrieveComment, deleteComment, submitComment } from "../../redux/actions/commentAction";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./Comment.scss";
import ic_delete from "../../assets/ic_delete.svg";
import ic_account_circle from "../../assets/ic_account_circle.svg";
import ic_send from "../../assets/ic_send.svg";

// silent unnecessary warnings
console.warn = (function (_warn) {
  return function (message) {
  };
})(console.warn);


// Comment wrapper
const Comment = ({ requestId, owner }) => {
  const dispatch = useDispatch();
  const comments = useSelector(state => state.comment.comments);

  const removeComment = useCallback(async (commentId, requestId) => {
    await dispatch(deleteComment(commentId, requestId));
    // initiate new data retrieval
    dispatch(retrieveComment(requestId));
  }, [comments]);

  const saveComment = useCallback(
    (requestId, comment) => {
      dispatch(submitComment(requestId, comment));
    },
    [comments],
  );

  useEffect(() => {
    dispatch(retrieveComment(requestId));
  }, []);
  return (
    <div className="comment comment-card">
      <br />
      <CommentEditor requestId={requestId} saveComment={saveComment} />
      <span className="title m-b-10">
        Comments
      </span>
      {
        _.isArray(comments) ? comments.map((i) => <CommentItem owner={owner} key={i.id} comment={i} removeComment={removeComment} />) : <h2>loading...</h2>
      }
    </div>
  );
};

Comment.propTypes = {
  requestId: PropTypes.number.isRequired,
  owner: PropTypes.object.isRequired,
};

// CommentItem Item
const CommentItem = ({ owner, comment, removeComment }) => {
  let deketeBtn;
  if (comment.user_id == owner) {
    deketeBtn = <span id="btn_delete" onClick={e => removeComment(comment.id, comment.request_id)} className="title m-l-15 clickable" role="button" tabIndex={0}>
      <img src={ic_delete} width={24} height={24} alt="delete icon" />
    </span>
  } else {
    deketeBtn = ''
  }

  return (
    <div className="flex flex-column m-t-10 m-b-10 p-r-10 p-l-10">
      <div className="flex flex-row vertical-center space-between">
        <div className="flex flex-row vertical-center">
          <div className="avatar">
            <img src={comment.User.image_url ? comment.User.image_url : ic_account_circle} width={42} height={42} alt="profile icon" />
          </div>
          <span className="m-l-5">{`${comment.User.firstname} ${comment.User.lastname}`} {moment(comment.createdAt).format("ll")}</span>
        </div>
        {deketeBtn}
      </div>
      <div className="flex cell flex-row vertical-center">
        <div className="avatar m-r-5" />
        <div className="comment-content" dangerouslySetInnerHTML={{ __html: comment.comment.replace(/(<? *script)/gi, 'illegalscript') }} />
      </div>
    </div>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  removeComment: PropTypes.func.isRequired,
};


// Comment Editor
const CommentEditor = ({ requestId, saveComment }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [editorState, setEditorState] = useState(
    EditorState.createEmpty()
  );
  const comments = useSelector(state => state.comment.comments);

  useEffect(() => {
    setIsLoading(false);
  }, [comments]);
  const save = () => {
    // prepare data
    setIsLoading(true);
    const rawContent = convertToRaw(editorState.getCurrentContent());
    const markup = draftToHtml(rawContent);
    // dispatch save action
    if (editorState.getCurrentContent().hasText()) {
      saveComment(requestId, markup);
      const _editorState = EditorState.push(editorState, ContentState.createFromText(''));
      setEditorState(_editorState);
    } else {
      setIsLoading(false);
      toast.error("you cannot save an empty comment!");
    }
  };

  return (
    <div className="flex flex-row vertical-center">
      <div className="avatar" />
      <div className="flex flex-column comment-editor">
        <Editor
          editorState={editorState}
          toolbarClassName="comment-toolbar"
          wrapperClassName="comment-editor-wrapper"
          editorClassName="comment-editor"
          onEditorStateChange={setEditorState}
        />
        <span onClick={save} className="btn btn-primary clickable save-comment" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', borderRadius: '10px' }} role="button" tabIndex={0}>
          save comment
        {isLoading ? (<FontAwesomeIcon style={{ marginLeft: "5px" }} icon={faCircleNotch} spin />) : <img src={ic_send} witdth={18} height={18} />}
        </span>
      </div>
    </div>
  );
}

CommentEditor.propTypes = {
  requestId: PropTypes.number.isRequired,
  saveComment: PropTypes.func.isRequired,
};

export default Comment;
