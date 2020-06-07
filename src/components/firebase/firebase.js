import firebaseConfig from "./config";
import axios from 'axios';

class Firebase {
  constructor(app) {
    if (!firebaseInstance) {
      app.initializeApp(firebaseConfig);

      this.auth = app.auth();
      this.db = app.firestore();
      this.functions = app.functions();
      this.storage = app.storage();
    }
  }

  // realtime = onSnapshot = no need 'async' -> to check if the user has username after registration success
  getUserProfile({userId, onSnapshot}){
    return this.db.collection('publicProfiles')
      .where('userId', '==', userId)
      .limit(1)
      .onSnapshot(onSnapshot)
  }

  async createAuthor({authorName}){
    const createAuthorCallable = this.functions.httpsCallable('createAuthor');
    createAuthorCallable({authorName})
  }

  async getAuthors(){
    return this.db.collection('authors').get()
  }

  async createBook({ bookName, authorId, bookCover }){
    const createBookCallable = this.functions.httpsCallable('createBook');
    return createBookCallable({bookName, authorId, bookCover })
  }

  async register({ email, password, username }) {
    // Create email and password in firebase Authentication
    await this.auth.createUserWithEmailAndPassword(email, password);

    // Set username (docs) and userId (property) in db
    const createProfileCallable = this.functions.httpsCallable('createPublicProfile');
    createProfileCallable({ username })
  }

  async postComment({text, bookId}){
    const postCommentCallable = this.functions.httpsCallable('postComment'); // 'postComment' = exports.postComment in firebase cloud functions
    return postCommentCallable({text, bookId})
  }

  // realtime = onSnapshot = no need 'async' -> it will error
  subscribeToBookComments({bookId, onSnapshot}){
    const bookRef = this.db.collection('books').doc(bookId)
    return this.db.collection('comments')
      .where('book', '==', bookRef)
      .orderBy('dateCreated', 'desc') // descending
      .onSnapshot(onSnapshot)  // 'book' = reference
  }

  async login({ email, password }) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  async logout() {
    await this.auth.signOut();
  }
}

let firebaseInstance;

function getFirebaseInstance(app) {
  if (!firebaseInstance && app) {
    firebaseInstance = new Firebase(app);
    return firebaseInstance;
  } else if (firebaseInstance) {
    return firebaseInstance
  } else {
    return null;
  }
}

export default getFirebaseInstance;
