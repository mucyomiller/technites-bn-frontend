import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { retrieveProfile } from "../../redux/actions/profileAction";
import { fetchAllMessages } from "../../redux/actions/ChatActions";
import "./Chat.scss";
import { socket } from "../../config/sockets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faTimes,
  faArrowDown
} from "@fortawesome/free-solid-svg-icons";
import { Facebook } from "react-content-loader";

export class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      user: {},
      errors: {},
      myMessage: "",
      newMessage: false,
      showState: false,
      loading: true
    };
  }
  messagesEnd = React.createRef();
  componentDidMount() {
    this.props.retrieveProfile();
    this.props.fetchAllMessages();
    if (socket) {
      socket.on("send_message", data => {
        // check if isSender
        if (this.props.user.id !== data.user_id) {
          this.setState({ newMessage: true });
          // check if chat box is open
          if (!localStorage.showState) {
            toast.success(`${data.from}: ${data.message}`, {
              position: toast.POSITION.TOP_RIGHT
            });
          }
        }
        this.props.fetchAllMessages();
      });
    }
    if (localStorage.showState) {
      this.setState({ showState: true });
    }
  }
  UNSAFE_componentWillReceiveProps({ errors, user, messages }) {
    this.setState({ errors, user, messages, loading: false });
  }
  componentDidUpdate() {
    if (this.state.showState) {
      this.scrollToBottom();
    }
  }
  scrollToBottom = () => {
    // const chatBox = document.querySelector('.chat-body');
    // chatBox.scrollTo(0, chatBox.scrollHeight);
    this.messagesEnd.current.scrollIntoView();
  };
  sendMessageOnKeyPress = e => {
    this.setState({ myMessage: e.target.value });
    if (e.which === 13) {
      this.sendMessage();
    }
  };
  sendMessage = () => {
    const messageContent = {
      from: this.props.user.id,
      to: 0,
      message: this.state.myMessage
    };
    if (this.state.myMessage !== "") {
      socket.emit("message", messageContent);
      this.props.fetchAllMessages();
      this.setState({ myMessage: "", newMessage: false });
      document.querySelector('.chat-txtbox').value="";
    }
  };
  render() {
    const { user, messages } = this.props;
    const { newMessage, loading, showState } = this.state;
    const allMessages = messages.messages;

    const MyFacebookLoader = () => <Facebook />;
    return (
      <>
        {showState ? (
          <div className="chat-container">
            <div className="chat-header">
              <span className="online-dot" />
              <span className="user-name">
                {user.firstname} {user.lastname}
              </span>
              <FontAwesomeIcon
                className="close-icon"
                icon={faTimes}
                onClick={() => {
                  localStorage.removeItem("showState");
                  this.setState({ showState: false });
                }}
              />
            </div>
            <div className="chat-body">
              {loading ? (
                <>
                  <MyFacebookLoader />
                  <MyFacebookLoader />
                  <MyFacebookLoader />
                </>
              ) : null}
              {newMessage ? (
                <span
                  className="new-message-alert"
                  onClick={() => {
                    this.setState({ newMessage: false });
                    this.scrollToBottom();
                  }}
                >
                  There is a new message
                  <FontAwesomeIcon className="close-icon" icon={faArrowDown} />
                </span>
              ) : null}

              {allMessages
                ? allMessages.map(message => (
                    <div
                      className={
                        message.User.id === user.id
                          ? "my-chat"
                          : "other-users-chat"
                      }
                      key={message.id}
                    >
                      <div className="time-stamp">
                        <p className="time-stamp-label">
                          {moment(message.createdAt).fromNow()}
                        </p>
                      </div>
                      <div className="chat-body-content">
                        {message.User.id === user.id ? (
                          <>
                            <span className="user-text">{message.message}</span>
                            <img
                              src={
                                message.User.image_url
                                  ? message.User.image_url
                                  : "https://res.cloudinary.com/technites/image/upload/v1575018314/zdwsxd8b7tsruzdetcqw.png"
                              }
                              className="user-avatar"
                            />
                          </>
                        ) : (
                          <>
                            <img
                              src={
                                message.User.image_url
                                  ? message.User.image_url
                                  : "https://res.cloudinary.com/technites/image/upload/v1575018314/zdwsxd8b7tsruzdetcqw.png"
                              }
                              className="user-avatar"
                            />
                            <h4 className="chat-user-info">
                              {message.User.firstname} {message.User.lastname}{" "}
                            </h4>
                            <span className="user-text">{message.message}</span>
                          </>
                        )}
                      </div>
                    </div>
                  ))
                : null}
              <div className="end-of-messages" ref={this.messagesEnd} />
            </div>
            <div className="chat-footer">
              <input
                name="message"
                type="text"
                className="chat-txtbox"
                placeholder="Write a message..."
                onKeyUp={this.sendMessageOnKeyPress}
              />
              <FontAwesomeIcon
                className="chat-btn"
                icon={faPaperPlane}
                onClick={this.sendMessage}
              />
            </div>
          </div>
        ) : null}
      </>
    );
  }
}
const mapStateToProps = state => ({
  messages: state.messages,
  user: state.profile.user,
  errors: state.errors
});
export default connect(mapStateToProps, { retrieveProfile, fetchAllMessages })(Chat);
