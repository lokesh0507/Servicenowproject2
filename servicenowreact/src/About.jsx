import { Typography, Box, Stack, Card, CardContent } from "@mui/material";

export default function About() {
  return (
    <Box
      sx={{
        p: 4,
        maxWidth: "900px",
        margin: "auto",
      }}
    >
      {/* Title */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        About This Application
      </Typography>

      <Typography variant="subtitle1" sx={{ mb: 4, opacity: 0.8 }}>
        A modern and user-friendly Incident Management System designed to
        simplify the way users handle incidents through a clean and responsive interface.
      </Typography>

      {/* Cards Section */}
      <Stack spacing={3}>
        
        {/* Project Overview */}
        <Card elevation={3} sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              📝 Project Overview
            </Typography>
            <Typography>
              This application offers an intuitive dashboard where users can view,
              create, update, and manage incident records efficiently. The goal is to
              provide a simple and interactive experience for handling day-to-day
              incident operations.
            </Typography>
          </CardContent>
        </Card>

        {/* Mission */}
        <Card elevation={3} sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              🎯 Our Mission
            </Typography>
            <Typography>
              Our mission is to make incident handling faster, clearer, and more
              manageable by using modern web technologies and clean interface design.
            </Typography>
          </CardContent>
        </Card>

        {/* Application Features */}
        <Card elevation={3} sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              ⚙️ Key Features
            </Typography>
            <Typography>
              • View all incidents in a structured and responsive UI <br />
              • Create new incidents effortlessly <br />
              • Edit and update existing incidents <br />
              • Delete records when necessary <br />
              • Supports Dark/Light mode for better user experience <br />
              • Modern dashboard layout with professional styling
            </Typography>
          </CardContent>
        </Card>

        {/* Technologies */}
        <Card elevation={3} sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              💻 Technologies Used
            </Typography>
            <Typography>
              • <b>React.js</b> – For building dynamic and interactive UI <br />
              • <b>Material UI</b> – For designing modern and responsive components <br />
              • <b>Node.js + Express.js</b> – For backend processing and routing <br />
              • <b>Axios</b> – For all API requests <br />
              • <b>REST APIs</b> – Used for real-time incident operations
            </Typography>
          </CardContent>
        </Card>

        {/* Vision */}
        <Card elevation={3} sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              🌟 Our Vision
            </Typography>
            <Typography>
              We aim to create user-centric applications that simplify workflows and
              improve productivity. Our focus is on delivering clean design,
              seamless interaction, and efficiency in daily operations.
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
