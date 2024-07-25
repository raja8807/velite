import CustomButton from "@/components/ui/custom_button/custom_button";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import MainFrame from "@/components/ui/main_frame/main_frame";
import React, { useEffect, useState } from "react";
import {
  Book,
  CheckCircle,
  ChevronLeft,
  Clock,
  Filter,
  InfoCircle,
  PersonCircle,
  QuestionCircle,
} from "react-bootstrap-icons";
import styles from "./submissions.module.scss";
import { Col, Row } from "react-bootstrap";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { deletMultipleData, getDataByQuery } from "@/libs/firebase/firebase";
import CustomInput from "@/components/ui/cuatom_input/cuatom_input";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";

const SubmissionsScreen = ({
  setCurrentScreen,
  examId,
  setShowSubmissionsFor,
}) => {
  const getDate = (date) => {
    if (date) {
      const eDate = new Date(date);
      return `${eDate.getDate()}/${
        eDate.getMonth() + 1
      }/${eDate.getFullYear()}`;
    }
  };

  const [initialSubmissions, setInitialSubmissions] = useState([]);
  const [submissions, setSubmissions] = useState();
  const [searchQuery, setSearchQuery] = useState({
    text: "",
    gt: "",
    lt: "",
  });
  const [showFilters, setShowFilter] = useState(false);

  const fetSubmissions = async () => {
    try {
      const res = await getDataByQuery("submissions", [
        "exam_id",
        "==",
        examId,
      ]);
      setInitialSubmissions(res);
      setSubmissions(res || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetSubmissions();
  }, [examId]);

  const clearAll = async () => {
    try {
      const res = await deletMultipleData("submissions", initialSubmissions);
      if (res) {
        setSubmissions([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.ExamsList}>
      {!submissions && <LoadingScreen />}
      <CustomContainer>
        <MainFrame>
          <div className={styles.portal}>
            <div className={styles.controls}>
              <CustomButton
                onClick={() => {
                  setShowSubmissionsFor(null);
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
              <CustomButton variant={3} onClick={clearAll}>
                Clear All
              </CustomButton>
            </div>
            <br />
            <div className={styles.searchBar}>
              <div className={styles.top}>
                <CustomInput
                  placeHolder="Search"
                  value={searchQuery.text}
                  onChange={(e, v) => {
                    setSubmissions(() => {
                      return initialSubmissions.filter((s) => {
                        return s.student_email && s.student_email.includes(v);
                      });
                    });
                    setSearchQuery((prev) => ({ ...prev, text: v }));
                  }}
                />
                <Filter
                  onClick={() => {
                    setShowFilter((prev) => !prev);
                  }}
                />
              </div>
              {showFilters && (
                <div>
                  <hr />
                  <Row>
                    <Col xs={6} md={4} lg={3}>
                      <CustomInput
                        placeHolder="Percentage more than"
                        value={searchQuery.gt}
                        onChange={(e, v) => {
                          setSubmissions(() => {
                            return initialSubmissions.filter((s) => {
                              return (
                                s.student_email &&
                                s.student_email.includes(searchQuery.text) &&
                                (s.correctAnswers / s.totalQuestions) * 100 >= v
                              );
                            });
                          });
                          setSearchQuery((prev) => ({
                            ...prev,
                            gt: v,
                            lt: "",
                          }));
                        }}
                      />
                    </Col>
                    {/* <Col xs={6} md={4} lg={3}>
                    <CustomInput
                      placeHolder="Percentage less than"
                      value={searchQuery.lt}
                      onChange={(e, v) => {
                        setSubmissions(() => {
                          return initialSubmissions.filter((s) => {
                            return (
                              s.student_email.includes(searchQuery.text) &&
                              (s.correctAnswers / s.totalQuestions) * 100 <= v
                            );
                          });
                        });
                        setSearchQuery((prev) => ({ ...prev, lt: v, gt: "" }));
                      }}
                    />
                  </Col> */}
                  </Row>
                  <br />
                </div>
              )}
            </div>

            {submissions && (
              <div className={styles.list}>
                <Row>
                  {submissions.map((sub) => {
                    return (
                      <Col key={sub.id} xs={12} md={6} lg={4}>
                        <div className={styles.submission}>
                          <div className={styles.name}>
                            <div>
                              <PersonCircle />
                              {sub && sub.student_email && (
                                <p
                                  className={styles.title}
                                  dangerouslySetInnerHTML={{
                                    __html: sub.student_email.replace(
                                      searchQuery.text,
                                      `<span>${searchQuery.text}</span>`
                                    ),
                                  }}
                                ></p>
                              )}
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
            )}

            {submissions && submissions?.length === 0 && (
              <div className={styles.noRecs}>No Records Found</div>
            )}
          </div>
        </MainFrame>
      </CustomContainer>
    </div>
  );
};

export default SubmissionsScreen;
