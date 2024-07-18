import CustomButton from "@/components/ui/custom_button/custom_button";
import CustomModal from "@/components/ui/custom_modal/custom_modal";
import React from "react";

const SubmitExamPopup = ({
  show,
  setShow,
  questions,
  setCurrentExam,
  setCurrentScreen,
  setSubmissions,
  currentExam,
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
      <CustomButton
        onClick={() => {
          setSubmissions((prev) => [
            {
              id: "zdvnd",
              exam_id: currentExam.id,
              mark: getCorrectAnswers(),
            },
            ...prev,
          ]);
          setCurrentExam(null);
          setCurrentScreen("list");
        }}
      >
        Submit
      </CustomButton>
    </CustomModal>
  );
};

export default SubmitExamPopup;
