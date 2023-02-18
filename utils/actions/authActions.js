import AsyncStorage from "@react-native-async-storage/async-storage";
import {set} from 'firebase/database';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';

import {auth, userRef} from "../firebaseHelper";
import {authenticate, logout} from "../../store/slices/authSlice";
import {getUserData} from "./userActions";

let timer;

export const signUp = (firstName, lastName, email, password) => {
  return async (dispatch) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const {uid, stsTokenManager} = result.user;
      const {accessToken, expirationTime} = stsTokenManager;
      const expiryDate = new Date(expirationTime);
      const userData = await createUser(firstName, lastName, email, uid);

      dispatch(authenticate({token: accessToken, userData,}));
      await saveDataToStorage(accessToken, uid, expiryDate);

      const millisecondsUntilExpiry = expiryDate - new Date();
      timer = setTimeout(() => {
        dispatch(userLogout());
      }, millisecondsUntilExpiry);
    } catch (err) {
      console.error(err)
      const errorCode = err.code;
      let message = "Something went wrong";
      if (errorCode === 'auth/email-already-in-use') {
        message = "This email is already in use";
      }

      throw new Error(message);
    }
  }
}

export const signIn = (email, password) => {
  return async (dispatch) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const {uid, stsTokenManager} = result.user;
      const {accessToken, expirationTime} = stsTokenManager;
      const expiryDate = new Date(expirationTime);
      const userData = await getUserData(uid);

      dispatch(authenticate({token: accessToken, userData}));
      await saveDataToStorage(accessToken, uid, expiryDate);

      const millisecondsUntilExpiry = expiryDate - new Date();
      timer = setTimeout(() => {
        dispatch(userLogout());
      }, millisecondsUntilExpiry);
    } catch (err) {
      let message;
      switch (err.code) {
        case 'auth/too-many-requests':
          message = 'Too many requests, just wait a little bit before next auth';
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          message = 'The username or password was incorrect';
          break;
        default:
          message = "Something went wrong";
      }

      throw new Error(message);
    }
  }
}

export const userLogout = () => {
  return async (dispatch) => {
    await AsyncStorage.clear();
    clearTimeout(timer);
    await dispatch(logout())
  }
}

const createUser = async (firstName, lastname, email, uid) => {
  const fullName = `${firstName} ${lastname}`.toLowerCase();
  const userData = {
    firstName,
    lastname,
    fullName,
    email,
    uid,
    signUpDate: new Date().toISOString(),
  };

  await set(userRef(uid), userData);
  return userData;
}

const saveDataToStorage = async (token, uid, expiryDate) => {
  await AsyncStorage.setItem("userData", JSON.stringify({
    token,
    uid,
    expiryDate: expiryDate.toISOString()
  }));
}
