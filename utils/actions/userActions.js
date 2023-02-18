import {get} from "firebase/database";
import {userRef} from "../firebaseHelper";

export const getUserData = async (uid) => {
  try {
    const snapshot = await get(userRef(uid));
    return snapshot.val();
  } catch (err) {
    console.error(err);
    throw new Error("Can't access to database");
  }
}