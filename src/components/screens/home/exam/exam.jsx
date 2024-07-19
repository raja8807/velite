import React, { useEffect, useState } from "react";
import styles from "./exam.module.scss";
import MainFrame from "@/components/ui/main_frame/main_frame";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import CustomButton from "@/components/ui/custom_button/custom_button";
import { Col, Form, Row } from "react-bootstrap";
import CustomInput from "@/components/ui/cuatom_input/cuatom_input";
import CustomTextArea from "@/components/ui/custom_textarea/custom_textarea";
import { v4 } from "uuid";
import { Toast } from "react-bootstrap";
import { addData, updateData } from "@/libs/firebase/firebase";

const ExamPortal = ({
  currentExam,
  setCurrentExam,
  setCurrentScreen,
  isNewExam,
  setExamsList,
  showToastMessage,
}) => {
  const options = ["A", "B", "C", "D"];

  const [isLoading, setInsLoading] = useState(false);

  return (
    <div
      className={styles.ExamPortal}
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      <CustomContainer>
        <MainFrame>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setInsLoading(true);
              try {
                const noAnswers = currentExam.questions.filter(
                  (q) => q.answer === null
                );

                if (noAnswers.length) {
                  const x = noAnswers.map((a) => {
                    return (
                      currentExam.questions.findIndex((q) => q.id === a.id) + 1
                    );
                  });
                  alert(`Questions ${x.join(", ")} has no answer selected`);
                } else {
                  if (isNewExam) {
                    const eId = v4();

                    await addData(
                      "exams",
                      {
                        id: eId,
                        ...currentExam,
                      },
                      eId
                    );

                    setExamsList((prev) => [currentExam, ...prev]);
                    setCurrentScreen("portal");
                    showToastMessage("Saved Successfully");
                  } else {
                    await updateData("exams", currentExam, currentExam.id);

                    setExamsList((prev) => {
                      const examIndex = prev.findIndex(
                        (e) => e.id === currentExam.id
                      );
                      const exams = [...prev];
                      exams[examIndex] = currentExam;
                      return exams;
                    });
                  }
                }
                showToastMessage("Saved Successfully");
              } catch (err) {
                showToastMessage("Something went wrong");
                console.log(err);
              }
              setInsLoading(false);
            }}
          >
            <div className={styles.portal}>
              <div className={styles.top}>
                <div className={styles.left}>
                  {/* <Clock /> */}
                  <div>
                    <small>Exam Tilte</small>
                    <CustomInput
                      value={currentExam?.title}
                      onChange={(e, v) => {
                        setCurrentExam((prev) => ({ ...prev, title: v }));
                      }}
                      required
                      placeHolder="Title"
                    />
                  </div>
                  <div className={styles.time}>
                    <small>Exam Time</small>
                    <CustomInput
                      type="number"
                      value={currentExam?.time}
                      minValue={1}
                      min={1}
                      onChange={(e, v) => {
                        setCurrentExam((prev) => ({ ...prev, time: v }));
                      }}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className={styles.middle}>
                {currentExam.questions.map((currentQuestion, qIdx) => {
                  return (
                    <div className={styles.question} key={currentQuestion.id}>
                      <div className={styles.qHead}>
                        <small>Question {qIdx + 1}</small>
                        <CustomButton
                          variant={2}
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentExam((prev) => {
                              const ex = { ...prev };
                              ex.questions = ex.questions.filter(
                                (q) => q.id !== currentQuestion.id
                              );
                              return ex;
                            });
                          }}
                        >
                          Delete
                        </CustomButton>
                      </div>
                      <CustomTextArea
                        value={currentQuestion.question}
                        rows={5}
                        onChange={(e, v) => [
                          setCurrentExam((prev) => {
                            const ex = { ...prev };

                            ex.questions[qIdx].question = v;

                            return ex;
                          }),
                        ]}
                        required
                        placeHolder="Question"
                      />
                      <br />
                      <Row>
                        {currentQuestion.answers.map((ans, ansIdx) => {
                          return (
                            <Col xs={12} md={6} key={`ans_${ansIdx}`}>
                              <div className={`${styles.answer}`}>
                                <CustomInput
                                  value={ans}
                                  onChange={(e, v) => [
                                    setCurrentExam((prev) => {
                                      const ex = { ...prev };
                                      ex.questions[qIdx].answers[ansIdx] = v;
                                      return ex;
                                    }),
                                  ]}
                                  placeHolder={`Option ${options[ansIdx]}.`}
                                  required
                                />

                                <Form.Check
                                  checked={currentQuestion.answer === ansIdx}
                                  className={styles.check}
                                  id={`${currentQuestion.id}_ans`}
                                  onChange={(e) => {
                                    setCurrentExam((prev) => {
                                      const ex = { ...prev };
                                      ex.questions[qIdx].answer = ansIdx;
                                      return ex;
                                    });
                                  }}
                                />
                              </div>
                            </Col>
                          );
                        })}
                      </Row>
                    </div>
                  );
                })}

                <CustomButton
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentExam((prev) => {
                      const ex = { ...prev };

                      const id = v4();

                      console.log(id);

                      ex.questions = [
                        ...ex.questions,
                        {
                          id,
                          question: "",
                          answers: ["", "", "", ""],
                          answer: null,
                          selectedAnswer: null,
                        },
                      ];

                      return ex;
                    });
                  }}
                >
                  Add Question
                </CustomButton>

                <div className={styles.cont}>
                  <CustomButton
                    variant={2}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentScreen("list");
                    }}
                  >
                    Back To List
                  </CustomButton>

                  <CustomButton isLoading={isLoading}>Submit</CustomButton>
                </div>
              </div>
            </div>
          </form>
        </MainFrame>
      </CustomContainer>
    </div>
  );
};

export default ExamPortal;
