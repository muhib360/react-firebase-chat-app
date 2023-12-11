import './App.css'
import Authentication from "./components/Authentication";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase.config";
import Chatroom from "./components/Chatroom";

function App() {
	const [user, isLoading] = useAuthState(auth);

	return (
		<>
			{isLoading && (
				<div className="lds-ring">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			)}
			{!isLoading && (user ? <Chatroom /> : <Authentication />)}
		</>
	);
}

export default App;
