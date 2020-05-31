import getFirebaseInstance from "./firebase";
import useAuth from './useAuth';
import FirebaseContext from "./context";

// useAuth={ user, firebase, loading }
// const FirebaseContext = React.createContext(null);
export { FirebaseContext, useAuth };
export default getFirebaseInstance;