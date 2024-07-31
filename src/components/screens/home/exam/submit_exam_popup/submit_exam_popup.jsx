import CustomButton from "@/components/ui/custom_button/custom_button";
import CustomModal from "@/components/ui/custom_modal/custom_modal";
import { addData, updateData } from "@/libs/firebase/firebase";
import React from "react";
import { v4 } from "uuid";
import { useState } from "react";
import styles from "./submit_exam_popup.module.scss";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";

const SubmitExamPopup = ({
  show,
  setShow,
  questions,
  setCurrentExam,
  setCurrentScreen,
  setSubmissions,
  currentExam,
  session,
  currentSubmission,
  setCurrentSubmission,
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
  const [isLoading, setIsLoading] = useState(false);

  const getTitle = () => {
    if (isSubmitted) {
      return "Submitted Successfully";
    }
    if (show === "time") {
      return "Time Out";
    }
    if (show === "violated") {
      return "Sorry, You have violated the rules";
    }
    return "Submit Answers";
  };

  const getSubmissionReason = () => {
    if (show === "time") {
      return "Time Out";
    }
    if (show === "violated") {
      return "Rules Violation";
    }
    return "Exam Completed";
  };

  const getHasClose = () => {
    if (isSubmitted || isLoading) {
      return false;
    }
    if (show === "time" || show === "violated") {
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

  const submitExam = async () => {
    setIsLoading(true);
    try {
      const id = v4();

      const created_at = new Date().toLocaleString();

      const submission = {
        ...currentSubmission,
        correctAnswers: getCorrectAnswers(),
        questionsAttended: getAttended(),
        reason: getSubmissionReason(),
      };

      await updateData("submissions", submission, currentSubmission?.id);

      const res = await axios.post("/api/mail", {
        to: session?.email,
        subject: "Submission Successful",
        text: "Your submission has been successful",
        html: ` <p>
          Your submission for ${currentExam.title} on ${created_at} has been
          successful
        </p>

        <br />
        <br />

        <strong>Here is your result</strong>
        <p>Total Questions : ${questions.length}</p>
        <p>Correct Answers : ${getCorrectAnswers()}</p>
        <p>
          Questions Attended : <strong> ${getAttended()}</strong>
        </p>
        <p>
          Percentage: ${(
            (getCorrectAnswers() / questions.length) *
            100
          ).toFixed(1)}%
        </p>
        <p> Reason: ${getSubmissionReason()} </p>
        <br />
        <br />
        <p>
          Thank you for the participation
          <br />
          <strong>Best Of Luck!</strong>
        </p>
        `,
      });

      setSubmissions((prev) => {
        const x = [...prev];
        const idx = prev.findIndex((s) => s.id === submission?.id);
        x[idx] = submission;
        return x;
      });

      setIsSubmitted(true);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  return (
    <CustomModal
      title={getTitle()}
      show={!!show}
      hasClose={getHasClose()}
      setShow={getHasClose() ? setShow : () => {}}
    >
      <div className={styles.SubmitExamPopup}>
        <h4 className={styles.title}>{currentExam.title}</h4>
        <div className={styles.result}>
          <div>
            <p>Total Questions : {questions.length}</p>
            <p>Correct Answers : {getCorrectAnswers()}</p>
            <p>Questions Attended : {getAttended()}</p>
          </div>
          <div className={styles.chart}>
            <CircularProgressbar
              value={getCorrectAnswers()}
              minValue={0}
              maxValue={questions.length}
              text={`
                ${((getCorrectAnswers() / questions.length) * 100).toFixed(1)}%
                `}
            />
          </div>
        </div>
        <br />
        {!isSubmitted ? (
          <CustomButton onClick={submitExam} isLoading={isLoading}>
            Submit
          </CustomButton>
        ) : (
          <CustomButton
            onClick={() => {
              setCurrentExam(null);
              setCurrentSubmission(null);
              setCurrentScreen("list");
            }}
          >
            Back To List
          </CustomButton>
        )}
      </div>
    </CustomModal>
  );
};

export default SubmitExamPopup;
