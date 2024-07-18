import { useEffect, useState } from "react";
import ExamPortal from "./exam/exam";
import LoginScreen from "./login/login";
import ExamsList from "./list/list";

const HomeScreen = ({ session }) => {
  const [currentScreen, setCurrentScreen] = useState("login");
  const [currentExam, setCurrentExam] = useState(null);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    if (session) {
      setCurrentScreen("list");
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
      />
    );
  }

  return <></>;
};

export default HomeScreen;
