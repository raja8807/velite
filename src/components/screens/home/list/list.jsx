import React from "react";
import styles from "./list.module.scss";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import MainFrame from "@/components/ui/main_frame/main_frame";
import { Book, Clock, Person, Question } from "react-bootstrap-icons";
import CustomButton from "@/components/ui/custom_button/custom_button";
import { signOut } from "firebase/auth";
import { auth } from "@/libs/firebase/firebase";
import { Col, Row } from "react-bootstrap";
const ExamsList = ({
  session,
  setCurrentScreen,
  setCurrentExam,
  submissions,
}) => {
  const examsList = [
    {
      id: "1234",
      time: 1,
      questions: [
        {
          id: "asnd",
          question:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius optio sit blanditiis esse officia eos rem quis! Delectus, impedit dolores!? Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius optio sit blanditiis esse officia eos",
          answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
          answer: 2,
          selectedAnswer: null,
        },
        {
          id: "sdv",
          question:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius optio sit blanditiis esse officia eos rem quis! Delectus, impedit dolores!? Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius optio sit blanditiis esse officia eos",
          answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
          answer: 2,
          selectedAnswer: null,
        },
        {
          id: "aefwe",
          question:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius optio sit blanditiis esse officia eos rem quis! Delectus, impedit dolores!? Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius optio sit blanditiis esse officia eos",
          answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
          answer: 2,
          selectedAnswer: null,
        },
        {
          id: "qewe",
          question:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius optio sit blanditiis esse officia eos rem quis! Delectus, impedit dolores!? Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius optio sit blanditiis esse officia eos",
          answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
          answer: 2,
          selectedAnswer: null,
        },
        {
          id: "dzd",
          question:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius optio sit blanditiis esse officia eos rem quis! Delectus, impedit dolores!? Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius optio sit blanditiis esse officia eos",
          answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
          answer: 2,
          selectedAnswer: null,
        },
        {
          id: "dgdf",
          question:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius optio sit blanditiis esse officia eos rem quis! Delectus, impedit dolores!? Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius optio sit blanditiis esse officia eos",
          answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
          answer: 2,
          selectedAnswer: null,
        },
        {
          id: "asdsd",
          question:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius optio sit blanditiis esse officia eos rem quis! Delectus, impedit dolores!? Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius optio sit blanditiis esse officia eos",
          answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
          answer: 2,
          selectedAnswer: null,
        },
        {
          id: "zzxx",
          question:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius optio sit blanditiis esse officia eos rem quis! Delectus, impedit dolores!? Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius optio sit blanditiis esse officia eos",
          answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
          answer: 2,
          selectedAnswer: null,
        },
        {
          id: "rreree",
          question:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius optio sit blanditiis esse officia eos rem quis! Delectus, impedit dolores!? Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius optio sit blanditiis esse officia eos",
          answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
          answer: 2,
          selectedAnswer: null,
        },
        {
          id: "kdmf",
          question:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius optio sit blanditiis esse officia eos rem quis! Delectus, impedit dolores!? Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius optio sit blanditiis esse officia eos",
          answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
          answer: 2,
          selectedAnswer: null,
        },
      ],
      name: "Exam 1",
    },
    {
      id: "12s4",
      time: 10,
      questions: [
        {
          id: "asnd",
          question:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius optio sit blanditiis esse officia eos rem quis! Delectus, impedit dolores!? Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius optio sit blanditiis esse officia eos",
          answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
          answer: 2,
          selectedAnswer: null,
        },
        {
          id: "sdv",
          question:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius optio sit blanditiis esse officia eos rem quis! Delectus, impedit dolores!? Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius optio sit blanditiis esse officia eos",
          answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
          answer: 2,
          selectedAnswer: null,
        },
        {
          id: "aefwe",
          question:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius optio sit blanditiis esse officia eos rem quis! Delectus, impedit dolores!? Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius optio sit blanditiis esse officia eos",
          answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
          answer: 2,
          selectedAnswer: null,
        },
        {
          id: "qewe",
          question:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius optio sit blanditiis esse officia eos rem quis! Delectus, impedit dolores!? Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius optio sit blanditiis esse officia eos",
          answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
          answer: 2,
          selectedAnswer: null,
        },
        {
          id: "dzd",
          question:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius optio sit blanditiis esse officia eos rem quis! Delectus, impedit dolores!? Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius optio sit blanditiis esse officia eos",
          answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
          answer: 2,
          selectedAnswer: null,
        },
        {
          id: "dgdf",
          question:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius optio sit blanditiis esse officia eos rem quis! Delectus, impedit dolores!? Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius optio sit blanditiis esse officia eos",
          answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
          answer: 2,
          selectedAnswer: null,
        },
        {
          id: "asdsd",
          question:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius optio sit blanditiis esse officia eos rem quis! Delectus, impedit dolores!? Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius optio sit blanditiis esse officia eos",
          answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
          answer: 2,
          selectedAnswer: null,
        },
        {
          id: "zzxx",
          question:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius optio sit blanditiis esse officia eos rem quis! Delectus, impedit dolores!? Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius optio sit blanditiis esse officia eos",
          answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
          answer: 2,
          selectedAnswer: null,
        },
        {
          id: "rreree",
          question:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius optio sit blanditiis esse officia eos rem quis! Delectus, impedit dolores!? Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius optio sit blanditiis esse officia eos",
          answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
          answer: 2,
          selectedAnswer: null,
        },
        {
          id: "kdmf",
          question:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius optio sit blanditiis esse officia eos rem quis! Delectus, impedit dolores!? Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius optio sit blanditiis esse officia eos",
          answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
          answer: 2,
          selectedAnswer: null,
        },
      ],
      name: "Exam 2",
    },
  ];

  const getPrev = (el) => {
    const sub = submissions.find((s) => s.exam_id === el.id);
    if (sub) {
      return `${sub.mark}/${el.questions.length}`;
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
                            <p>{el.name}</p>
                          </div>
                          <div className={styles.ques}>
                            <p>{el.questions.length} Questions</p>
                          </div>
                        </div>
                        <div className={styles.time}>
                          <div>
                            <Clock /> <p>{el.time} Minutes</p>
                          </div>

                          <div>
                            <p>Previous : {getPrev(el)}</p>
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
