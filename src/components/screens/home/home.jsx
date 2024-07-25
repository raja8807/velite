import { useEffect, useState } from "react";
import ExamPortal from "./exam/exam";
import LoginScreen from "./login/login";
import ExamsList from "./list/list";
import CustomToast from "@/components/ui/toast/toast";
import { getAllData } from "@/libs/firebase/firebase";
import SubmissionsScreen from "./submissions/submissions";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";

const HomeScreen = ({ session }) => {
  const [currentScreen, setCurrentScreen] = useState();
  const [currentExam, setCurrentExam] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [showSubmissionsFor, setShowSubmissionsFor] = useState(null);

  const showToastMessage = (message) => {
    setToastMessage(message);
  };

  const [examsList, setExamsList] = useState([]);

  const fetchExams = async () => {
    try {
      const res = await getAllData("exams");
      setExamsList(res);
    } catch (err) {
      showToastMessage("Something went wrong");
      console.log(err);
    }
  };

  useEffect(() => {
    if (session) {
      fetchExams();
      setCurrentScreen("list");
    } else {
      if (session === null) {
        setCurrentScreen("login");
      }
    }
  }, [session]);

  return (
    <>
      <CustomToast message={toastMessage} setShow={setToastMessage} />
      {currentScreen === "login" && <LoginScreen />}
      {currentScreen === "list" && examsList && (
        <ExamsList
          session={session}
          setCurrentExam={setCurrentExam}
          setCurrentScreen={setCurrentScreen}
          examsList={examsList}
          setExamsList={setExamsList}
          showToastMessage={showToastMessage}
          setShowSubmissionsFor={setShowSubmissionsFor}
        />
      )}

      {currentScreen === "portal" && currentExam && examsList && (
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

      {currentScreen === "submissions" && (
        <SubmissionsScreen
          setCurrentScreen={setCurrentScreen}
          examId={showSubmissionsFor}
          setShowSubmissionsFor={setShowSubmissionsFor}
        />
      )}

      {!currentScreen && <LoadingScreen/>}
    </>
  );
};

export default HomeScreen;
