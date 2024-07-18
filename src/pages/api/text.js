import admin from "firebase-admin";
import { getApps, getApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const handler = async (req, res) => {
 

  try {
    const firebaseAdmin = !getApps().length
      ? admin.initializeApp({
          credential: admin.credential.cert(
            "./jt-test-26ac5-9db62a1858fb.json"
          ),
        })
      : getApp();

    const token = await getAuth(firebaseAdmin).createCustomToken(
      "aennnfdvsndj"
    );

    return res.status(200).json({
      token: token,
    });
    
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      error: err,
    });
  }
};

export default handler;
