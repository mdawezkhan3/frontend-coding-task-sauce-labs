import { Box, Paper, Typography } from "@mui/material";

const ScoreCard = ({ score, chancesLeft}) => {

  return (
    <Paper className="score-card" variant="outlined" square>
      <Box>
        <Typography><b>Score:</b> {score}</Typography>
        <Typography><b>Chances Left:</b> {chancesLeft}</Typography>
      </Box>
    </Paper>
  );
};

export default ScoreCard;