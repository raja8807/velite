import CustomButton from "@/components/ui/custom_button/custom_button";
import CustomModal from "@/components/ui/custom_modal/custom_modal";
import { addData } from "@/libs/firebase/firebase";
import React from "react";
import { v4 } from "uuid";

const SubmitExamPopup = ({
  show,
  setShow,
  questions,
  setCurrentExam,
  setCurrentScreen,
  setSubmissions,
  currentExam,
  uid,
}) => {
  const getCorrectAnswers = () => {
    let ca = 0;

    questions.forEach((q) => {
      if (q.answer === q.selectedAnswer) {
        ca++;
      }
    });

    return ca;
  };

  const submitExam = async () => {
    try {
      const id = v4();
      const submission = {
        id,
        exam_id: currentExam.id,
        mark: getCorrectAnswers(),
        uid,
      };
      await addData("submissions", submission);

      setSubmissions((prev) => [submission, ...prev]);
      setCurrentExam(null);
      setCurrentScreen("list");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CustomModal
      title={show !== "time" ? "Submit Answers" : "Time Out"}
      show={!!show}
      hasClose={show !== "time"}
      setShow={show !== "time" ? setShow : () => {}}
    >
      <p>Total Questions : {questions.length}</p>
      <br />
      <p>Correct Answers : {getCorrectAnswers()}</p>
      <br />
      <CustomButton onClick={submitExam}>Submit</CustomButton>
    </CustomModal>
  );
};

export default SubmitExamPopup;
