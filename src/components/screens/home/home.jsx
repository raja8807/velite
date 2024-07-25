import { useEffect, useState } from "react";
import ExamPortal from "./exam/exam";
import LoginScreen from "./login/login";
import ExamsList from "./list/list";
import { getAllData, getDataByQuery } from "@/libs/firebase/firebase";
import SubmissionsScreen from "./sumbissions/sumbissions";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";

const HomeScreen = ({ session }) => {
  const [currentScreen, setCurrentScreen] = useState("");
  const [currentExam, setCurrentExam] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [examsList, setExamsList] = useState([]);

  const fetchExamsList = async () => {
    try {
      const subRes = await getDataByQuery("submissions", [
        "uid",
        "==",
        session.uid,
      ]);
      setSubmissions(subRes);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (session) {
      setCurrentScreen("list");
      fetchExamsList();
    } else {
      if (session === null) {
        setCurrentScreen("login");
      }
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
        setExamsList={setExamsList}
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

  if (currentScreen === "submissions") {
    return (
      <SubmissionsScreen
        submissions={submissions}
        setCurrentScreen={setCurrentScreen}
        session={session}
      />
    );
  }

  return <><LoadingScreen/></>;
};

export default HomeScreen;
