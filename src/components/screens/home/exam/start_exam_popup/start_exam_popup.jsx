import CustomButton from "@/components/ui/custom_button/custom_button";
import CustomModal from "@/components/ui/custom_modal/custom_modal";
import React, { useState } from "react";
import styles from "./start_exam_popup.module.scss";
import { v4 } from "uuid";
import { addData } from "@/libs/firebase/firebase";

const StartExamPopup = ({
  show,
  setShow,
  setIsActive,
  questions,
  examDurationMinute,
  setCurrentScreen,
  currentExam,
  setCurrentExam,
  session,
  setSubmissions,
  setCurrentSubmission,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showRules, setShowRules] = useState(false);

  const startExam = async () => {
    setIsLoading(true);
    try {
      const id = v4();

      const created_at = new Date().toLocaleString();

      const submission = {
        id,
        uid: session?.uid,
        exam_id: currentExam.id,
        totalQuestions: questions.length,
        correctAnswers: 0,
        questionsAttended: 0,
        examTime: currentExam.time,
        examTitle: currentExam.title,
        student_email: session?.email,
        created_at,
        reason: "Rules Violation",
      };

      await addData("submissions", submission);

      setSubmissions((prev) => [submission, ...prev]);
      setCurrentSubmission(submission);
      setIsActive(true);
      setShow(false);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  return (
    <>
      <CustomModal show={showRules} setShow={setShowRules} title="Exam Rules">
        <div className={styles.StartExamPopup}>
          <ul>
            <li>
              <p>Complete the exam before time.</p>
            </li>
            <li>
              <p>Do not refresh the exam page.</p>
            </li>
            <li>
              <p>Do not change the tab.</p>
            </li>
          </ul>
          <small
            style={{
              color: "red",
            }}
          >
            *Violation of rules will be reported.
          </small>
          <br />
          <br />
          <CustomButton onClick={startExam} isLoading={isLoading}>
            Start Exam
          </CustomButton>
          &nbsp; &nbsp;
          <CustomButton
            onClick={() => {
              setShowRules(false);
            }}
            variant={2}
          >
            Back
          </CustomButton>
          &nbsp; &nbsp;
          <CustomButton
            onClick={() => {
              setCurrentExam(null);
              setCurrentScreen("list");
            }}
            variant={3}
          >
            Back to list
          </CustomButton>
        </div>
      </CustomModal>
      <CustomModal show={show} title="Start Exam" hasClose={false}>
        <div className={styles.StartExamPopup}>
          <h4 className={styles.title}>{currentExam.title}</h4>
          <p>Total Questions : {questions.length}</p>
          <p>ExamDuration : {examDurationMinute} Minute</p>
          <small
            style={{
              color: "red",
            }}
          >
            *Violation of rules will be reported. Click &quot;View Rules&quot;.
          </small>
          <br />
          <br />
          <CustomButton onClick={startExam} isLoading={isLoading}>
            Start Exam
          </CustomButton>
          &nbsp; &nbsp;
          <CustomButton
            onClick={() => {
              setShowRules(true);
            }}
            isLoading={isLoading}
            variant={2}
          >
            View Rules
          </CustomButton>
          &nbsp; &nbsp;
          <CustomButton
            onClick={() => {
              setCurrentExam(null);
              setCurrentScreen("list");
            }}
            variant={3}
          >
            Back to list
          </CustomButton>
        </div>
      </CustomModal>
    </>
  );
};

export default StartExamPopup;
