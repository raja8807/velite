import CustomButton from "@/components/ui/custom_button/custom_button";
import CustomModal from "@/components/ui/custom_modal/custom_modal";
import { addData } from "@/libs/firebase/firebase";
import React from "react";
import { v4 } from "uuid";
import { useState } from "react";

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

  const [isSubmitted, setIsSubmitted] = useState(false);

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
      setIsSubmitted(true);
    } catch (err) {
      console.log(err);
    }
  };

  const getTitle = () => {
    if (isSubmitted) {
      return "Submitted Successfully";
    }
    if (show === "time") {
      return "Time Out";
    }
    return "Submit Answers";
  };

  const getHasClose = () => {
    if (isSubmitted) {
      return false;
    }
    if (show === "time") {
      return false;
    }

    return true;
  };

  const getAttended = () => {
    let ca = 0;

    questions.forEach((q) => {
      if (q.selectedAnswer !== null) {
        ca++;
      }
    });

    return ca;
  };

  return (
    <CustomModal
      title={getTitle()}
      show={!!show}
      hasClose={getHasClose()}
      setShow={getHasClose() ? setShow : () => {}}
    >
      <h3>{currentExam.title}</h3>
      <p>Total Questions : {questions.length}</p>
      <p>Correct Answers : {getCorrectAnswers()}</p>
      <p>Questions Attended : {getAttended()}</p>

      <br />
      {!isSubmitted ? (
        <CustomButton onClick={submitExam}>Submit</CustomButton>
      ) : (
        <CustomButton
          onClick={() => {
            setCurrentExam(null);
            setCurrentScreen("list");
          }}
        >
          Back To List
        </CustomButton>
      )}
    </CustomModal>
  );
};

export default SubmitExamPopup;
