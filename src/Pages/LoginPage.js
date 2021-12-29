import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import { auth, db } from "../firebase-config";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { NavigationType, useNavigate } from "react-router-dom";

function LoginPage() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPhoneNumber, setRegisterPhoneNumber] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const register = async () => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user.uid);

      // Add to userDB
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        phoneNumber: registerPhoneNumber || user.phoneNumber || null,
        displayName: registerUsername || user.displayName || null,
        accountType: "basic"
      });

      //Add to localStorage
      localStorage.setItem("app_userId", user.uid);
      navigate("/my-account");
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async () => {
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
      //Add to localStorage
      localStorage.setItem("app_userId", user.uid);
      navigate("/my-account");
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem("app_userId");
  };

  return (
    <div>
      <div className="registration-form">
        <h3>Register User</h3>
        <input
          placeholder="Email"
          onChange={(event) => setRegisterEmail(event.target.value)}
        />
        <input
          placeholder="Password"
          onChange={(event) => setRegisterPassword(event.target.value)}
        />
        <input
          placeholder="Username"
          onChange={(event) => setRegisterUsername(event.target.value)}
        />
        <input
          placeholder="Phone Number"
          onChange={(event) => setRegisterPhoneNumber(event.target.value)}
        />
        <button onClick={register}>Create User</button>
      </div>
      <div className="login-form">
        <h3>Login</h3>
        <input
          placeholder="Email"
          onChange={(event) => setLoginEmail(event.target.value)}
        />
        <input
          placeholder="Password"
          onChange={(event) => setLoginPassword(event.target.value)}
        />
        <button onClick={login}>Login</button>
      </div>

      <h4>User Logged In:</h4>
      {user?.email}
      <button onClick={logout}>Sign Out</button>
    </div>
  );
}

export default LoginPage;
