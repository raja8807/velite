import React, { useState } from "react";
import styles from "./login.module.scss";
import MainFrame from "@/components/ui/main_frame/main_frame";
import CustomInput from "@/components/ui/cuatom_input/cuatom_input";
import CustomButton from "@/components/ui/custom_button/custom_button";
import {
  createUserWithEmailAndPassword,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { auth } from "@/libs/firebase/firebase";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import { Google } from "react-bootstrap-icons";

const LoginScreen = () => {
  const [currentForm, setCurrentForm] = useState("Login");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
  });
  const [signupValues, setSignupValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    await signInWithPopup(auth, provider)
      .then((result) => {
        // This function is triggered after the redirect when the user signs in
        console.log(result);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error(
          "Error signing in with Google: ",
          errorCode,
          errorMessage
        );
      });
    // try {
    //   // alert("ok");
    //   const provider = new GoogleAuthProvider();
    //   signInWithRedirect(auth, provider).then((res) => {
    //     console.log(res);
    //   });

    //   // alert(res)
    //   // provider.providerId =
    //   // alert(getRedirectResult(auth,res))
    //   // console.log(res);
    // } catch (err) {
    //   alert(err.message);
    //   console.log(err);
    // }
  };

  return (
    <div className={styles.LoginScreen}>
      <CustomContainer>
        <MainFrame>
          <div className={styles.wrap}>
            <div className={styles.box}>
              <h2>{currentForm}</h2>
              {currentForm === "Login" && (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setError(null);
                    setIsLoading(true);
                    try {
                      const user = await signInWithEmailAndPassword(
                        auth,
                        loginValues.email,
                        loginValues.password
                      );
                    } catch (err) {
                      setError(err.message);
                    }
                    setIsLoading(false);
                  }}
                >
                  <CustomInput
                    placeHolder="Email"
                    onChange={(e, v) => {
                      setError(null);
                      setLoginValues((prev) => ({ ...prev, email: v }));
                    }}
                    error={error}
                    value={loginValues.email}
                  />
                  <CustomInput
                    placeHolder="Password"
                    type="password"
                    onChange={(e, v) => {
                      setError(null);

                      setLoginValues((prev) => ({ ...prev, password: v }));
                    }}
                    value={loginValues.password}
                    error={error}
                  />
                  <CustomButton isLoading={isLoading}>Login</CustomButton>
                  <small>
                    Don&apos;t have account?{" "}
                    <span
                      onClick={() => {
                        setError(null);

                        setCurrentForm("Sign Up");
                      }}
                    >
                      Sign Up
                    </span>
                  </small>
                </form>
              )}
              {currentForm === "Sign Up" && (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    try {
                      setError(null);

                      setIsLoading(true);

                      await createUserWithEmailAndPassword(
                        auth,
                        signupValues.email,
                        signupValues.password
                      );

                      setCurrentForm("Login");
                      setLoginValues({ ...signupValues });
                    } catch (error) {
                      setError(error.message);
                    }
                    setIsLoading(false);

                    // const user = await signInWithEmailAndPassword(
                    //   auth,
                    //   "yora8807@gmail.com",
                    //   "qwerty12345"
                    // );

                    // console.log(user);
                  }}
                >
                  <CustomInput
                    placeHolder="Email"
                    onChange={(e, v) => {
                      setError(null);

                      setSignupValues((prev) => ({ ...prev, email: v }));
                    }}
                    value={signupValues.email}
                    error={error}
                  />
                  <CustomInput
                    placeHolder="Password"
                    type="password"
                    onChange={(e, v) => {
                      setError(null);

                      setSignupValues((prev) => ({ ...prev, password: v }));
                    }}
                    value={signupValues.password}
                    error={error}
                  />
                  <CustomInput
                    placeHolder="Confirm Password"
                    type="password"
                    onChange={(e, v) => {
                      setError(null);

                      setSignupValues((prev) => ({
                        ...prev,
                        confirmPassword: v,
                      }));
                    }}
                    value={signupValues.confirmPassword}
                    error={error}
                  />
                  <CustomButton isLoading={isLoading}>Sign Up</CustomButton>
                  <small>
                    Already have account?{" "}
                    <span
                      onClick={() => {
                        setError(null);

                        setCurrentForm("Login");
                      }}
                    >
                      Login
                    </span>
                  </small>
                </form>
              )}
              <div className={styles.tpp}>
                <div className={styles.divider}>
                  <hr />
                  Or
                  <hr />
                </div>
                <div
                  className={styles.btn}
                  onClick={async () => {
                    await loginWithGoogle();
                  }}
                >
                  <Google /> Continue with Google
                </div>
              </div>
            </div>
          </div>
        </MainFrame>
      </CustomContainer>
    </div>
  );
};

export default LoginScreen;
