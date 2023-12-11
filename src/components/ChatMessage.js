import { auth } from "../firebase.config";
import classes from "./ChatMessage.module.css";

function ChatMessage(props) {
	const { text, uid, photoURL } = props.message;

	const messageType =
		auth.currentUser.uid === uid
			? `${classes.message} ${classes["message-container-sent"]}`
			: `${classes.message} ${classes["message-container-recieved"]}`;
	return (
		<div className={messageType}>
			<img src={photoURL} alt="profile" className={classes.profile} />
			<p className={classes.text}>
				<span className={classes.span}>{text}</span>
			</p>
		</div>
	);
}

export default ChatMessage;
