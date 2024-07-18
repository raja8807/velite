import { doc, setDoc } from "firebase/firestore";
import { db, updateData } from "../firebase";

export const createUser = async (data, id) => {
  try {
    const res = await setDoc(doc(db, "Candidate", id), data);

    return {
      id,
      ...data,
    };
  } catch (err) {
    throw new Error(err);
  }
};

export const updateUser = async (data) => {
  try {
    await updateData("Candidate", data, data.id);
    return data;
  } catch (err) {
    throw new Error(err);
  }
};
