import CustomButton from "@/components/ui/custom_button/custom_button";
import CustomModal from "@/components/ui/custom_modal/custom_modal";
import React from "react";
import styles from "./start_exam_popup.module.scss";

const StartExamPopup = ({
  show,
  setShow,
  setIsActive,
  questions,
  examDurationMinute,
  setCurrentScreen,
  currentExam,
  setCurrentExam,
}) => {
  return (
    <CustomModal show={show} title="Start Exam" hasClose={false}>
      <div className={styles.StartExamPopup}>
        <h4 className={styles.title}>{currentExam.title}</h4>
        <p>Total Questions : {questions.length}</p>
        <p>ExamDuration : {examDurationMinute} Minute</p>
        <br/>
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
          Exit
        </CustomButton>
      </div>
    </CustomModal>
  );
};

export default StartExamPopup;
