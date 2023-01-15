import { AppBar as MaterialUiAppBar } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Tooltip } from '@mui/material';

export default function AppBar({ handleModeChange }) {
  const theme = useTheme();

  const getTooltipTitle = () => {
    return `Switch to ${theme.palette.mode === 'dark' ? "Light" : "Dark"} Mode`;
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MaterialUiAppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            QUIZ
          </Typography>
          <Tooltip title={getTooltipTitle()} placement="left" arrow>
            <IconButton sx={{ ml: 1 }} onClick={handleModeChange} color="inherit">
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </MaterialUiAppBar>
    </Box>
  );
}
