// React core.
import React from "react";
import Header from "../Header";

// Firebase.
import firebase from "firebase/app";
import "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

// Styles
import styles from "./Firebbb.module.css"; // This uses CSS modules.
// import "./firebaseui-styling.global.css"; // Import globally.

// Get the Firebase config from the auto generated file.
// const firebaseConfig = require("./firebase-config.json").result;

const firebaseConfig = {
  apiKey: "AIzaSyCiwnPCn_--rpErk6Ia1O8-rGlIYsxUK08",
  authDomain: "tricolor-77333.firebaseapp.com",
  databaseURL: "https://tricolor-77333.firebaseio.com",
  projectId: "tricolor-77333",
  storageBucket: "tricolor-77333.appspot.com",
  messagingSenderId: "857411439733",
  appId: "1:857411439733:web:86ad7edc3881543f13bc3c",
};

// Instantiate a Firebase app.
const firebaseApp = firebase.initializeApp(firebaseConfig);

/**
 * The Splash Page containing the login UI.
 */
class Firebbb extends React.Component {
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  };

  state = {
    isSignedIn: undefined,
  };

  /**
   * @inheritDoc
   */
  componentDidMount() {
    this.unregisterAuthObserver = firebaseApp
      .auth()
      .onAuthStateChanged((user) => {
        this.setState({ isSignedIn: !!user });
      });
  }

  /**
   * @inheritDoc
   */
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  /**
   * @inheritDoc
   */
  render() {
    return (
      <div className={styles.container}>
        {this.state.isSignedIn !== undefined && !this.state.isSignedIn && (
          <div>
            <StyledFirebaseAuth
              className={styles.firebaseUi}
              uiConfig={this.uiConfig}
              firebaseAuth={firebaseApp.auth()}
            />
          </div>
        )}

        {this.state.isSignedIn && (
          <div className={styles.signedIn}>
            Hello {firebaseApp.auth().currentUser.displayName}.{" "}
            {firebaseApp.auth().currentUser.email} You are now signed In!{" "}
            <a
              href="#z"
              className={styles.button}
              onClick={() => {
                this.props.changeCurrentPage(0);
                firebaseApp.auth().signOut();
              }}
            >
              Sign-out
            </a>
            <Header
              changeCurrentPage={this.props.changeCurrentPage}
              currentUser={firebaseApp.auth().currentUser.displayName}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Firebbb;
