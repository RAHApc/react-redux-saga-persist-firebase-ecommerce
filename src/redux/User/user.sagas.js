import { takeLatest, call, all, put } from "redux-saga/effects";
import { auth, getCurrentUser, GoogleProvider, handleUserProfile } from './../../firebase/utils';
import userTypes from "./user.types";
import { resetPasswordSuccess, signInSuccess, signOutUserSuccess, userError } from './user.action';
import { handleResetPasswordAPI } from "./user.helper";

export function* getSnapshotFromUserAuth(user, additionalData= {}){
    try {
        const userRef = yield call(handleUserProfile, {userAuth: user, additionalData});
        const snapshot = yield userRef.get();
        yield put(signInSuccess({
            id: snapshot.id,
            ...snapshot.data()
        }));
    } catch (error) {
        // console.log(error);
    }
}

export function* emailSignIn({ payload: {email, password} }){
    try {
        const {user} = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);
        // dispatch({type: userTypes.SIGN_IN_SUCCESS, payload: true});
    } catch (err) {
        // console.log(err);
    }
}

export function* onEmailSignInStart(){
    yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn);
}

export function* isUserAuthenticated(){
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth);    
        
    } catch (error) {
        // console.log(error);
    }
}

export function* onCheckUserSession(){
    yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutUser(){
    try {
        yield auth.signOut();
        yield put(signOutUserSuccess());
    } catch (error) {
        // console.log(error);
    }
}

export function* onSignOutStart(){
    yield takeLatest(userTypes.SIGN_OUT_USER_START, onSignOutUser);
}

export function* signUpUser({ payload: {
    displayName,
    email,
    password,
    confirmPassword
} }){

    if(password !== confirmPassword)
    {
        const err = ['Password Don\'t match'];
        yield put(
            userError(err)
        )
        return;
    }

    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        const additionalData= {displayName};
        yield getSnapshotFromUserAuth(user, additionalData);

    } catch (error) {
        // console.log(error);
    }
}

export function* onSignUpUserStart(){
    yield takeLatest(userTypes.SIGN_UP_USER_START, signUpUser)
}

export function* resetPassword({ payload: { email } }){
    try {
        yield call(handleResetPasswordAPI, email);
        yield put(
            resetPasswordSuccess()
        );      
    } catch (err) {
        yield put(
            userError(err)
        );
    }
}

export function* onResetPasswordStart(){
    yield takeLatest(userTypes.RESET_PASSWORD_START, resetPassword);
}

export function* googleSignIn(){
    try {
        const { user } = yield auth.signInWithPopup(GoogleProvider);
        yield getSnapshotFromUserAuth(user);
                  
      } catch (error) {
          // console.log(err);
      }
}

export function* onGoogleSignInStart(){
    yield takeLatest(userTypes.GOOGLE_SIGN_IN_START, googleSignIn);
}

export default function* userSagas(){
    yield all([
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpUserStart),
        call(onResetPasswordStart),
        call(onGoogleSignInStart),
    ])
}