import React, { useEffect, useState } from "react";
import styles from "./list.module.scss";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import MainFrame from "@/components/ui/main_frame/main_frame";
import { Book, Clock, Person, Question } from "react-bootstrap-icons";
import CustomButton from "@/components/ui/custom_button/custom_button";
import { signOut } from "firebase/auth";
import { auth, getAllData } from "@/libs/firebase/firebase";
import { Col, Row } from "react-bootstrap";
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
      return b.mark - a.mark;
    })[0];

    if (sub && high) {
      return `${high.mark}/${el.questions.length}`;
    }
    return "NA";
  };

  return (
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
                          <div className={styles.min}>
                            <Clock /> <p>{el.time} Minutes</p>
                          </div>

                          <div  className={styles.min}>
                            <p>Previous high: {getPrev(el)}</p>
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
