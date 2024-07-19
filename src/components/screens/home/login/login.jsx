import React, { useState } from "react";
import styles from "./login.module.scss";
import MainFrame from "@/components/ui/main_frame/main_frame";
import CustomInput from "@/components/ui/cuatom_input/cuatom_input";
import CustomButton from "@/components/ui/custom_button/custom_button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/libs/firebase/firebase";
import CustomContainer from "@/components/ui/custom_container/custom_container";

const LoginScreen = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
  });

  return (
    <div className={styles.LoginScreen}>
      <CustomContainer>
        <MainFrame>
          <div className={styles.wrap}>
            <div className={styles.box}>
              <h2>Admin Login</h2>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setError(null);
                  setIsLoading(true);
                  try {
                    if (
                      loginValues.email === process.env.NEXT_PUBLIC_SFZOM_ITA
                    ) {
                      const user = await signInWithEmailAndPassword(
                        auth,
                        loginValues.email,
                        loginValues.password
                      );
                    } else {
                      throw new Error("Unauthorized");
                    }
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
              </form>
            </div>
          </div>
        </MainFrame>
      </CustomContainer>
    </div>
  );
};

export default LoginScreen;
