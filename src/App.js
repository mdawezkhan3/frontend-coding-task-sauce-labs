import React, { useEffect, useState, useMemo } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import AppBar from './components/Appbar';
import QuestionAnswerContainerCard from './components/QuestionAnswerContainerCard';
import ScoreCard from './components/ScoreCard';
import { INITIAL_QUIZ_STATE } from "./constants";

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [quizData, setQuizData] = useState(INITIAL_QUIZ_STATE);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState(prefersDarkMode ? 'dark' : 'light',);
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode
        },
      }),
    [mode],
  );
  const currentQuestion = quizData.questionsData[quizData.questionNumber];

  useEffect(() => {
    if (quizData.questionNumber === quizData.questionsData.length && quizData.chancesLeft) fetchApi();
  }, [quizData.questionNumber]);

  const addUniqueQuestionsFetchedFromAPI = (fetchedQuestions) => {
    const existingQuestions = quizData.questionsData;
    fetchedQuestions.forEach((questionObj) => {
      const questionExists = existingQuestions.find(existingQuestionObj => existingQuestionObj.question === questionObj.question);
      if (!questionExists) existingQuestions.push(questionObj);
    });
    setQuizData(prevState => ({
      ...prevState,
      questionsData: existingQuestions
    }));
  };

  async function fetchApi(playAgain = false) {
    try {
      setLoading(true);
      let response = await fetch("https://eok9ha49itquif.m.pipedream.net");
      response = await response.json();
      if (playAgain) setQuizData(prevState => ({
        ...prevState,
        questionsData: response.questions
      }));
      else addUniqueQuestionsFetchedFromAPI(response.questions); 
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleModeChange = () => {
    setMode(prevState => prevState === "light" ? "dark" : "light");
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar handleModeChange={handleModeChange} />
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <CircularProgress />
        </Box>
      ) : (
        <QuestionAnswerContainerCard
          score={quizData.score}
          chancesLeft={quizData.chancesLeft}
          setQuizData={setQuizData}
          fetchApi={fetchApi}
          currentQuestion={currentQuestion} />
      )}
      <ScoreCard
        score={quizData.score}
        chancesLeft={quizData.chancesLeft} />
    </ThemeProvider>
  );
}

export default App;
