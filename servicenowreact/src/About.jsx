import { Typography, Box } from "@mui/material";

export default function About() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5">About This App</Typography>
      <Typography>This is a simple incident management application.</Typography>
    </Box>
  );
}
