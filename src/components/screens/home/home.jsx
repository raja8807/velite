import { useEffect, useState } from "react";
import ExamPortal from "./exam/exam";
import LoginScreen from "./login/login";
import ExamsList from "./list/list";
import CustomToast from "@/components/ui/toast/toast";

const HomeScreen = ({ session }) => {
  const [currentScreen, setCurrentScreen] = useState("login");
  const [currentExam, setCurrentExam] = useState(null);
  const [submissions, setSubmissions] = useState([]);

  const [toastMessage, setToastMessage] = useState("");

  const showToastMessage = (message) => {
    setToastMessage(message);
  };

  const [examsList, setExamsList] = useState([
    {
      id: "1234",
      time: 1,
      title: "Exam 1",
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
    },
    {
      id: "12s4",
      time: 10,
      title: "Exam 2",

      questions: [
        {
          id: "asnd",
          question:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius optio sit blanditiis esse officia eos rem quis! Delectus, impedit dolores!? Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius optio sit blanditiis esse officia eos",
          answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
          answer: null,
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
          answer: null,
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
    },
  ]);

  useEffect(() => {
    if (session) {
      setCurrentScreen("list");
    } else {
      setCurrentScreen("login");
    }
  }, [session]);

  return (
    <>
      <CustomToast message={toastMessage} setShow={setToastMessage} />
      {currentScreen === "login" && <LoginScreen />}
      {currentScreen === "list" && (
        <ExamsList
          session={session}
          setCurrentExam={setCurrentExam}
          setCurrentScreen={setCurrentScreen}
          submissions={submissions}
          examsList={examsList}
        />
      )}

      {currentScreen === "portal" && currentExam && (
        <ExamPortal
          currentExam={currentExam}
          setCurrentScreen={setCurrentScreen}
          setCurrentExam={setCurrentExam}
          setExamsList={setExamsList}
          showToastMessage={showToastMessage}
        />
      )}

      {currentScreen === "new" && currentExam && (
        <ExamPortal
          currentExam={currentExam}
          setCurrentScreen={setCurrentScreen}
          setCurrentExam={setCurrentExam}
          setExamsList={setExamsList}
          showToastMessage={showToastMessage}
          isNewExam
        />
      )}
    </>
  );
};

export default HomeScreen;
