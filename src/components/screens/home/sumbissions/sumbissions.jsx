import CustomButton from "@/components/ui/custom_button/custom_button";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import MainFrame from "@/components/ui/main_frame/main_frame";
import React from "react";
import {
  Book,
  CheckCircle,
  ChevronLeft,
  Clock,
  InfoCircle,
  PersonCircle,
  QuestionCircle,
} from "react-bootstrap-icons";
import styles from "./submissions.module.scss";
import { Col, Row } from "react-bootstrap";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const SubmissionsScreen = ({ submissions, setCurrentScreen, session }) => {
  const getDate = (date) => {
    if (date) {
      const eDate = new Date(date);
      return `${eDate.getDate()}/${
        eDate.getMonth() + 1
      }/${eDate.getFullYear()}`;
    }
  };

  const getColor = (reason) => {
    if (reason === "Rules Violation") {
      return "red";
    }
    if (reason === "Time Out") {
      return "orange";
    }
  };

  return (
    <div className={styles.ExamsList}>
      <CustomContainer>
        <MainFrame>
          <div className={styles.portal}>
            {/* <div className={styles.top}>
              <div className={styles.left}>
                <PersonCircle />
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
            <br /> */}
            <CustomButton
              onClick={() => {
                setCurrentScreen("list");
              }}
            >
              <ChevronLeft
                style={{
                  marginBottom: "4px",
                }}
              />
              Back To Exams
            </CustomButton>
            <div className={styles.list}>
              <Row>
                {submissions.map((sub) => {
                  return (
                    <Col key={sub.id} xs={12} md={6} lg={4}>
                      <div className={styles.submission}>
                        <div className={styles.name}>
                          <div>
                            <Book />
                            <p className={styles.title}>{sub.examTitle}</p>
                          </div>
                          <div className={styles.ques}>
                            {getDate(sub.created_at)}
                          </div>
                        </div>

                        <div className={styles.time}>
                          <div className={styles.min}>
                            <p>
                              <Clock /> {sub.examTime} Minutes
                            </p>

                            <p>
                              <QuestionCircle />
                              {sub.totalQuestions} Questions
                            </p>

                            <p>
                              <InfoCircle />
                              {sub.questionsAttended} Questions Attended
                            </p>

                            <p>
                              <CheckCircle />
                              {sub.correctAnswers} Correct Answers
                            </p>
                            <p
                              style={{
                                color: getColor(sub.reason),
                              }}
                            >
                              <InfoCircle />
                              {sub.reason}
                            </p>
                          </div>

                          <div className={styles.chart}>
                            <CircularProgressbar
                              value={sub.correctAnswers}
                              minValue={0}
                              maxValue={sub.totalQuestions}
                              text={`
                ${((sub.correctAnswers / sub.totalQuestions) * 100).toFixed(1)}%
                `}
                            />
                          </div>

                          {/* <div className={styles.min}>
                            <p>Previous high: {getPrev(el)}</p>
                          </div> */}
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

export default SubmissionsScreen;
