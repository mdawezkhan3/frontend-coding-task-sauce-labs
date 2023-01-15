import { useState } from 'react';
import sha1 from 'js-sha1';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { NO_CHANCES_LEFT, INITIAL_QUIZ_STATE } from '../constants';

export default function QuestionAnswerContainerCard({ fetchApi, score, chancesLeft, currentQuestion, setQuizData }) {
  const [answer, setAnswer] = useState("");

  const handleAnswerInputChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = () => {
    if (sha1(answer.toLowerCase()) === currentQuestion?.answerSha1) {
      setQuizData(prevState => ({
        ...prevState,
        score: prevState.score + 1,
        questionNumber: prevState.questionNumber + 1
      }));
    } else {
      setQuizData(prevState => ({
        ...prevState,
        questionNumber: prevState.chancesLeft !== NO_CHANCES_LEFT ? prevState.questionNumber + 1 : prevState.questionNumber,
        chancesLeft: prevState.chancesLeft - 1,
      }));
    }
    setAnswer("");
  };

  const restartGame = () => {
    setQuizData(INITIAL_QUIZ_STATE);
    fetchApi(true);
  };

  return (
    <Card className='question-answer-card' sx={{ width: 400 }}>
      {chancesLeft === NO_CHANCES_LEFT ? (
        <>
          <CardContent>
            <Typography variant="h5" component="div">
              Total Score: {score}
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button onClick={restartGame}>Play Again</Button>
          </CardActions>
        </>
      ) : (
        <>
          <CardContent>
            <Typography variant="h5" component="div" sx={{py: 2}} >
              {currentQuestion?.question}
            </Typography>
            <TextField autoFocus fullWidth label="Answer" variant="outlined" value={answer} onChange={handleAnswerInputChange} />
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button disabled={!answer} onClick={handleSubmit}>Submit</Button>
          </CardActions>
        </>
      )}
    </Card>
  );
}
