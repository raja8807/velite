import CustomButton from "@/components/ui/custom_button/custom_button";
import CustomModal from "@/components/ui/custom_modal/custom_modal";
import React from "react";

const StartExamPopup = ({
  show,
  setShow,
  setIsActive,
  questions,
  examDurationMinute,
  setCurrentScreen,
  setCurrentExam,
}) => {
  return (
    <CustomModal
      show={show}
      setShow={setShow}
      title="Start Exam"
      hasClose={false}
    >
      <p>Total Questions : {questions.length}</p>
      <br />
      <p>ExamDuration : {examDurationMinute} Minute</p>
      <br />
      <CustomButton
        onClick={() => {
          setIsActive(true);
          setShow(false);
        }}
      >
        Start Exam
      </CustomButton>
      &nbsp; &nbsp;
      <CustomButton
        onClick={() => {
          setCurrentExam(null);
          setCurrentScreen("list");
        }}
        variant={2}
      >
        Back To List
      </CustomButton>
    </CustomModal>
  );
};

export default StartExamPopup;
