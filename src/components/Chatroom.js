import { useEffect, useRef } from "react";
import classes from "./Chatroom.module.css";
import {
	Timestamp,
	addDoc,
	collection,
	limit,
	orderBy,
	query,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import ChatMessage from "./ChatMessage";
import { auth, db } from "../firebase.config";

function Chatroom() {
	const messagesRef = collection(db, "messages");
	const q = query(messagesRef, orderBy("createdAt"), limit(25));
	const [messages, isLoading] = useCollection(q);
	const textRef = useRef();
	const dummy = useRef();
	const mainRef = useRef();

	useEffect(() => {
		if (dummy.current) {
			dummy.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages]);

	async function sendMessage(e) {
		e.preventDefault();
		const { uid, photoURL } = auth.currentUser;
		let text = textRef.current.value;
		
		if (text.trim().length !== 0) {
			const timestamp = Timestamp.now();
			await addDoc(messagesRef, {
				text,
				uid,
				photoURL,
				createdAt: timestamp,
			});

			textRef.current.value = "";
		}
	}

	return (
		<div className={`${classes.container} container mx-auto`}>
			<header className={classes.header}>
				<button onClick={() => auth.signOut()}>Signout</button>
			</header>
			{isLoading && (
				<div className="lds-ring">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			)}
			{!isLoading && (
				<main className={classes.main} ref={mainRef}>
					{messages &&
						messages.docs.map((msg) => (
							<ChatMessage key={msg.id} message={msg.data()} />
						))}

					<span ref={dummy}></span>
				</main>
			)}
			<form onSubmit={sendMessage} className={classes.form}>
				<input ref={textRef} />
				<button className={classes.send}>send</button>
			</form>
		</div>
	);
}

export default Chatroom;
