import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from 'draftjs-to-html';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import moment from "moment";
import _ from "lodash";
import PropTypes from 'prop-types';
import ic_account_circle from "../../assets/ic_account_circle.svg";
import ic_send from "../../assets/ic_send.svg";
import "./Feedback.scss";
import { retrieveFeedback, submitFeedback } from '../../redux/actions/feedbackAction';

const Feedback = ({ accommodationId }) => {
  const dispatch = useDispatch();
  const feedbacks = useSelector(state => state.feedback.feedbacks);
  useEffect(() => {
    if (!isNaN(accommodationId)) dispatch(retrieveFeedback(accommodationId));
  }, [accommodationId]);

  const saveFeedback = useCallback(
    (accommodationId, feedback) => {
      dispatch(submitFeedback(accommodationId, feedback));
    },
    [feedbacks],
  );

  return (
    <div className="feedback">
      <span className="title m-b-10">
        Feedbacks
      </span>
      <br />
      <br />
      <FeedbackEditor accommodationId={accommodationId} saveFeedback={saveFeedback} />
      <br />
      {
        _.isArray(feedbacks) ? feedbacks.map((i) => <FeedbackItem key={i.id} feedback={i} />) : <h2>loading...</h2>
      }
    </div>
  )
}

// Comment Editor
export const FeedbackEditor = ({ accommodationId, saveFeedback }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [editorState, setEditorState] = useState(
    EditorState.createEmpty()
  );
  const feedbacks = useSelector(state => state.feedback.feedbacks);
  useEffect(() => {
    setIsLoading(false);
  }, [feedbacks]);
  const save = () => {
    // prepare data
    setIsLoading(true);
    const rawContent = convertToRaw(editorState.getCurrentContent());
    const markup = draftToHtml(rawContent);
    // dispatch save action
    if (editorState.getCurrentContent().hasText()) {
      saveFeedback(accommodationId, markup);
      const _editorState = EditorState.push(editorState, ContentState.createFromText(''));
      setEditorState(_editorState);
    } else {
      setIsLoading(false);
      toast.error("You cannot add an Empty feedback!");
    }
  };

  return (
    <div className="flex flex-column feedback-editor">
      <Editor
        editorState={editorState}
        toolbarClassName="comment-toolbar"
        wrapperClassName="comment-editor-wrapper"
        editorClassName="feedback-editor"
        onEditorStateChange={setEditorState}
      />
      <span onClick={save} className="btn btn-primary clickable save-feedback" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', borderRadius: '10px' }} role="button" tabIndex={0}>
        Add feeback
        {isLoading ? (<FontAwesomeIcon style={{ marginLeft: "5px" }} icon={faCircleNotch} spin />) : <img src={ic_send} witdth={18} height={18} />}
      </span>
    </div>
  );
}


const FeedbackItem = ({ feedback }) => {
  return (
    <div className="flex flex-column m-t-10 m-b-10 p-r-10 p-l-10">
      <div className="flex flex-row vertical-center space-between">
        <div className="flex flex-row vertical-center">
          <div className="avatar">
            <img src={feedback.User.image_url ? feedback.User.image_url : ic_account_circle} width={42} height={42} alt="profile icon" />
          </div>
          <span className="m-l-5 bolder">{`${feedback.User.firstname} ${feedback.User.lastname}`}</span><span className="m-l-5">{moment(feedback.createdAt).fromNow()}</span>
        </div>
      </div>
      <div className="flex cell flex-row vertical-center">
        <div className="avatar m-r-5" />
        <div className="comment-content" dangerouslySetInnerHTML={{ __html: feedback.feedback.replace(/(<? *script)/gi, 'illegalscript') }} />
      </div>
    </div>
  );
}

export default Feedback;
