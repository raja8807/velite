import { useEffect, useState } from "react";
import ExamPortal from "./exam/exam";
import LoginScreen from "./login/login";
import ExamsList from "./list/list";
import { getAllData, getDataByQuery } from "@/libs/firebase/firebase";

const HomeScreen = ({ session }) => {
  const [currentScreen, setCurrentScreen] = useState("login");
  const [currentExam, setCurrentExam] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [examsList, setExamsList] = useState([]);

  const fetchExamsList = async () => {
    try {
      const res = await getAllData("exams");
      const subRes = await getDataByQuery("submissions", [
        "uid",
        "==",
        session.uid,
      ]);
      setSubmissions(subRes);
      setExamsList(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (session) {
      setCurrentScreen("list");
      fetchExamsList();
    } else {
      setCurrentScreen("login");
    }
  }, [session]);

  if (currentScreen === "login") {
    return <LoginScreen />;
  }

  if (currentScreen === "list") {
    return (
      <ExamsList
        session={session}
        setCurrentExam={setCurrentExam}
        setCurrentScreen={setCurrentScreen}
        submissions={submissions}
        examsList={examsList}
      />
    );
  }

  if (currentScreen === "portal" && currentExam) {
    return (
      <ExamPortal
        currentExam={currentExam}
        setCurrentScreen={setCurrentScreen}
        setCurrentExam={setCurrentExam}
        setSubmissions={setSubmissions}
        session={session}
      />
    );
  }

  return <></>;
};

export default HomeScreen;
