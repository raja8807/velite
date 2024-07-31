import React, { useEffect, useState } from "react";
import styles from "./list.module.scss";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import MainFrame from "@/components/ui/main_frame/main_frame";
import {
  Book,
  Clock,
  Person,
  PersonCircle,
  Question,
} from "react-bootstrap-icons";
import CustomButton from "@/components/ui/custom_button/custom_button";
import { signOut } from "firebase/auth";
import { auth, getAllData } from "@/libs/firebase/firebase";
import { Col, Image, Row } from "react-bootstrap";
import CustomModal from "@/components/ui/custom_modal/custom_modal";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ExamsList = ({
  session,
  setCurrentScreen,
  setCurrentExam,
  submissions,
  examsList,
  setExamsList,
}) => {
  const fetchExamsList = async () => {
    try {
      const res = await getAllData("exams");
      setExamsList(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (session) {
      fetchExamsList();
    }
  }, [session]);

  const getPrev = (el) => {
    const sub = submissions.filter((s) => s.exam_id === el.id);

    const high = sub.sort((a, b) => {
      return b.correctAnswers - a.correctAnswers;
    })[0];

    if (sub && high) {
      return `${high.correctAnswers}/${high.totalQuestions}`;
    }
    return "NA";
  };

  const [showSubmittedPopupFor, setShowSubmittedPopupFor] = useState(null);

  return (
    <div className={styles.ExamsList}>
      <CustomModal
        show={showSubmittedPopupFor}
        setShow={setShowSubmittedPopupFor}
        title={"Already submitted"}
      >
        <div className={styles.SubmitExamPopup}>
          <h4 className={styles.title}>{showSubmittedPopupFor?.examTitle}</h4>
          <div className={styles.result}>
            <div>
              <p>Total Questions : {showSubmittedPopupFor?.totalQuestions}</p>
              <p>Correct Answers : {showSubmittedPopupFor?.correctAnswers}</p>
              <p>
                Questions Attended : {showSubmittedPopupFor?.questionsAttended}
              </p>
            </div>
            <div className={styles.chart}>
              <CircularProgressbar
                value={showSubmittedPopupFor?.correctAnswers}
                minValue={0}
                maxValue={showSubmittedPopupFor?.totalQuestions}
                text={`
                ${(
                  (showSubmittedPopupFor?.correctAnswers /
                    showSubmittedPopupFor?.totalQuestions) *
                  100
                ).toFixed(1)}%
                `}
              />
            </div>
          </div>
          <br />

          <CustomButton
            onClick={() => {
              setShowSubmittedPopupFor(null);
            }}
          >
            Back To List
          </CustomButton>
        </div>
      </CustomModal>
      <CustomContainer>
        <MainFrame>
          <div className={styles.portal}>
            <div className={styles.top}>
              <div className={styles.left}>
                {session?.photoURL ? (
                  <div className={styles.img}>
                    <Image src={session?.photoURL} fluid alt="img" />
                  </div>
                ) : (
                  <PersonCircle />
                )}
                <div>
                  <p>{session?.displayName || session?.email}</p>
                </div>
              </div>

              <div>
                <CustomButton
                  onClick={async () => {
                    await signOut(auth);
                  }}
                >
                  Logout
                </CustomButton>
              </div>
            </div>
            <br />
            <CustomButton
              variant={2}
              onClick={() => {
                setCurrentScreen("submissions");
              }}
            >
              Previous Submissions
            </CustomButton>
            <br />
            <br />
            <div className={styles.list}>
              <Row>
                {examsList.map((el) => {
                  return (
                    <Col key={el.id} xs={12} md={6} lg={4}>
                      <div
                        className={styles.exam}
                        onClick={() => {
                          if (getPrev(el) === "NA") {
                            setCurrentExam(el);
                            setCurrentScreen("portal");
                          } else {
                            const x = submissions.filter(
                              (s) => s.exam_id === el.id
                            );
                            setShowSubmittedPopupFor(x[0]);
                          }
                        }}
                      >
                        <div className={styles.wrap}>
                          <div className={styles.name}>
                            <div>
                              <Book />
                              <p className={styles.title}>{el.title}</p>
                            </div>
                            <div className={styles.ques}>
                              <p>{el.questions.length} Questions</p>
                            </div>
                          </div>
                          <div className={styles.time}>
                            <div className={styles.min}>
                              <Clock /> <p>{el.time} Minutes</p>
                            </div>

                            <div className={styles.min}>
                              <p>Previous high: {getPrev(el)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </div>
          </div>
        </MainFrame>
      </CustomContainer>
    </div>
  );
};

export default ExamsList;
