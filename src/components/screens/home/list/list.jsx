import React from "react";
import styles from "./list.module.scss";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import MainFrame from "@/components/ui/main_frame/main_frame";
import { Book, Clock, Person, Question } from "react-bootstrap-icons";
import CustomButton from "@/components/ui/custom_button/custom_button";
import { signOut } from "firebase/auth";
import { auth } from "@/libs/firebase/firebase";
import { Col, Row, Toast, ToastContainer } from "react-bootstrap";
import { v4 } from "uuid";
const ExamsList = ({
  session,
  setCurrentScreen,
  setCurrentExam,
  examsList,
}) => {
  return (
    <>
      <div className={styles.ExamsList}>
        <CustomContainer>
          <MainFrame>
            <div className={styles.portal}>
              <div className={styles.top}>
                <div className={styles.left}>
                  <Person />
                  <div>
                    <p>{session?.email}</p>
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
                onClick={() => {
                  const id = v4();
                  const qId = v4();
                  setCurrentExam({
                    id,
                    time: 1,
                    title: "",
                    questions: [
                      {
                        id: qId,
                        question: "",
                        answers: ["", "", "", ""],
                        answer: null,
                        selectedAnswer: null,
                      },
                    ],
                  });
                  setCurrentScreen("new");
                }}
              >
                Create Exam
              </CustomButton>
              <br />

              <div className={styles.list}>
                <Row>
                  {examsList.map((el) => {
                    return (
                      <Col key={el.id} xs={12} md={6} lg={4}>
                        <div
                          className={styles.exam}
                          onClick={() => {
                            setCurrentExam(el);
                            setCurrentScreen("portal");
                          }}
                        >
                          <div className={styles.name}>
                            <div>
                              <Book />
                              <p>{el.title}</p>
                            </div>
                            <div className={styles.ques}>
                              <p>{el.questions.length} Questions</p>
                            </div>
                          </div>
                          <div className={styles.time}>
                            <div>
                              <Clock /> <p>{el.time} Minute(s)</p>
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
    </>
  );
};

export default ExamsList;
