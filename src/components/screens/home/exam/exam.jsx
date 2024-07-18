import React, { useEffect, useState } from "react";
import styles from "./exam.module.scss";
import MainFrame from "@/components/ui/main_frame/main_frame";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import CustomButton from "@/components/ui/custom_button/custom_button";
import { CheckCircleFill, Clock, XCircleFill } from "react-bootstrap-icons";
import { Col, Row } from "react-bootstrap";
import dynamic from "next/dynamic";

const StartExamPopup = dynamic(
  () => import("./start_exam_popup/start_exam_popup"),
  {
    ssr: false,
  }
);
const SubmitExamPopup = dynamic(
  () => import("./submit_exam_popup/submit_exam_popup"),
  {
    ssr: false,
  }
);

const ExamPortal = ({
  currentExam,
  setCurrentScreen,
  setCurrentExam,
  setSubmissions,
}) => {
  const [questions, setQuestions] = useState(currentExam.questions);

  const [showStartPopup, setShowStartPopup] = useState(true);
  const [showSubmitPopup, setShowSubmitPopup] = useState(false);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = questions[currentQuestionIndex];
  const options = ["A", "B", "C", "D"];

  let timeout = null;

  const checkAnswer = (ansIdx) => {
    clearTimeout(timeout);
    setQuestions((prev) => {
      const q = [...prev];
      q[currentQuestionIndex].selectedAnswer = ansIdx;
      return q;
    });

    // if (currentQuestionIndex !== questions.length - 1) {
    //   timeout = setTimeout(() => {
    //     setCurrentQuestionIndex((prev) => prev + 1);
    //   }, 5000);
    // }
  };

  const getAnsColor = (ansIdx) => {
    if (currentQuestion.selectedAnswer !== null) {
      if (currentQuestion.selectedAnswer === currentQuestion.answer) {
        if (ansIdx === currentQuestion.selectedAnswer) {
          return `${styles.correct} ${styles.disabled}`;
        }
      } else {
        if (ansIdx === currentQuestion.answer) {
          return `${styles.correct} ${styles.disabled}`;
        }
        if (ansIdx === currentQuestion.selectedAnswer) {
          return `${styles.wrong} ${styles.disabled}`;
        }
      }

      return styles.disabled;
    }
    return "";
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ""; // This line is necessary for Chrome to show the alert
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const examDurationMinute = currentExam.time;

  const [minutes, setMinutes] = useState(examDurationMinute);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let countdownInterval;

    if (isActive) {
      countdownInterval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else {
          if (minutes === 0) {
            clearInterval(countdownInterval);
            setIsActive(false);
            setShowSubmitPopup("time");
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
    }

    return () => clearInterval(countdownInterval);
  }, [minutes, seconds, isActive]);

  return (
    <div
      className={styles.ExamPortal}
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      <StartExamPopup
        show={showStartPopup}
        setShow={setShowStartPopup}
        setIsActive={setIsActive}
        questions={questions}
        examDurationMinute={examDurationMinute}
        setCurrentScreen={setCurrentScreen}
        setCurrentExam={setCurrentExam}
      />
      <SubmitExamPopup
        show={showSubmitPopup}
        setShow={setShowSubmitPopup}
        questions={questions}
        setCurrentScreen={setCurrentScreen}
        setCurrentExam={setCurrentExam}
        setSubmissions={setSubmissions}
        currentExam={currentExam}
      />
      <CustomContainer>
        <MainFrame>
          <div className={styles.portal}>
            <div className={styles.top}>
              <div className={styles.left}>
                <Clock />
                <div>
                  <small>Time Remaining</small>
                  <p>
                    {minutes < 10 ? `0${minutes}` : minutes}:
                    {seconds < 10 ? `0${seconds}` : seconds}
                  </p>
                </div>
              </div>

              <div>
                <CustomButton
                  onClick={() => {
                    setShowSubmitPopup(true);
                  }}
                >
                  Submit
                </CustomButton>
              </div>
            </div>

            <div className={styles.middle}>
              <div className={styles.question}>
                <small>
                  Question {currentQuestionIndex + 1} of {questions.length}
                </small>
                <p>{currentQuestion.question}</p>
                <br />
                <Row>
                  {currentQuestion.answers.map((ans, ansIdx) => {
                    return (
                      <Col xs={12} md={6} key={`ans_${ansIdx}`}>
                        <div
                          className={`${styles.answer} ${getAnsColor(ansIdx)}`}
                          onClick={() => {
                            if (currentQuestion.selectedAnswer === null) {
                              checkAnswer(ansIdx);
                            }
                          }}
                        >
                          <div>{options[ansIdx]}.</div>
                          {ans}

                          <div className={styles.ico}>
                            {currentQuestion?.selectedAnswer === ansIdx ? (
                              currentQuestion.answer ===
                              currentQuestion.selectedAnswer ? (
                                <CheckCircleFill />
                              ) : (
                                <XCircleFill />
                              )
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              </div>
            </div>

            <div className={styles.bottom}>
              <CustomButton
                variant={2}
                disabled={currentQuestionIndex === 0}
                onClick={() => {
                  clearTimeout(timeout);

                  setCurrentQuestionIndex((prev) => prev - 1);
                }}
              >
                Prev
              </CustomButton>
              <div className={styles.nums}>
                {questions.map((q, i) => {
                  return (
                    <div
                      key={`ques_btn_${i}`}
                      className={
                        currentQuestionIndex === i ? styles.active : ""
                      }
                      onClick={() => {
                        clearTimeout(timeout);
                        setCurrentQuestionIndex(i);
                      }}
                    >
                      {i + 1}
                    </div>
                  );
                })}
              </div>
              {currentQuestionIndex === questions.length - 1 ? (
                <CustomButton
                  onClick={() => {
                    clearTimeout(timeout);
                    setShowSubmitPopup(true);
                  }}
                >
                  Submit
                </CustomButton>
              ) : (
                <CustomButton
                  variant={1}
                  disabled={currentQuestionIndex === questions.length - 1}
                  onClick={() => {
                    clearTimeout(timeout);
                    setCurrentQuestionIndex((prev) => prev + 1);
                  }}
                >
                  Next
                </CustomButton>
              )}
            </div>
          </div>
        </MainFrame>
      </CustomContainer>
    </div>
  );
};

export default ExamPortal;