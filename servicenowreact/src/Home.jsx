import {
  Stack,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  MenuItem,
  Box,
} from "@mui/material";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import axios from "axios";

export default function Home() {
  const { isLogged } = useContext(AuthContext);
  const [incidents, setIncidents] = useState([]);
  const[search, setSearch] = useState("");

  const [formData, setFormData] = useState({

    impact: "",
    urgency: "",
    
    short_description: "",
  });

  const [editing, setEditing] = useState(null);



  
  const fieldStyle = {
    width: 200,
    "& .MuiInputBase-input": {
      color: "text.primary",
    },
    "& .MuiInputLabel-root": {
      color: "text.secondary",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "text.secondary",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "primary.main",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "primary.main",
    },
  };

  
  useEffect(() => {
    async function fetchData() {
      if (isLogged) {
        try {
          const incidentList = await axios.get(
            "http://localhost:3001/api/incidents",
            { withCredentials: true }
          );
          setIncidents(incidentList.data.result || []);
        } catch (err) {
          console.error("Failed to fetch incidents:", err);
        }
      }
    }
    fetchData();
  }, [isLogged]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(
          `http://localhost:3001/api/incidents/${editing}`,
          {
            impact: parseInt(formData.impact),
            urgency: parseInt(formData.urgency),
            // state: parseInt(formData.state),
            short_description: formData.short_description,
          },
          { withCredentials: true }
        );
        alert("Incident updated!");
      } else {
        await axios.post(
          "http://localhost:3001/api/incidents",
          {
            impact: parseInt(formData.impact),
            urgency: parseInt(formData.urgency),
            // state: parseInt(formData.state),
            short_description: formData.short_description,
          },
          { withCredentials: true }
        );
        alert("Incident created!");
      }

     
      const res = await axios.get("http://localhost:3001/api/incidents", {
        withCredentials: true,
      });
      setIncidents(res.data.result || []);

     
      setFormData({
        impact: "",
        urgency: "",
        
        short_description: "",
      });
      setEditing(null);
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save incident.");
    }
  };

  
  const handleDelete = async (sys_id) => {
    try {
      await axios.delete(
        `http://localhost:3001/api/incidents/${sys_id}`,
        { withCredentials: true }
      );
      setIncidents((prev) =>
        prev.filter((inc) => inc.sys_id !== sys_id)
      );
    } catch (err) {
      alert("Delete failed");
    }
  };


  const handleEdit = (inc) => {
    setFormData({
      impact: String(inc.impact),
      urgency: inc.urgency,
      state: inc.state,
      short_description: inc.short_description,
    });
    setEditing(inc.sys_id);
  };

  return (
    <>
      {isLogged ? (
        <Stack spacing={4} sx={{ width: "95%" }}>
          <Typography variant="h4" fontWeight="bold">
            Incident Management
          </Typography>

         
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              gap: 9,
              flexWrap: "wrap",
              p: 3,
              borderRadius: 3,
              width: "100%",
              boxShadow: 3,
              overflowX: "hidden",
              backgroundColor: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.08)"
                  : "#ffffff",
              backdropFilter: (theme) =>
                theme.palette.mode === "dark" ? "blur(8px)" : "none",
              border: (theme) =>
                theme.palette.mode === "dark"
                  ? "1px solid rgba(255,255,255,0.1)"
                  : "1px solid #e0e0e0"
                  ,
            }}
          >
            <TextField
              select
              label="Impact"
              value={formData.impact}
              required
              // type="number"
              size="small"
              sx={fieldStyle}
              onChange={(e) =>
                setFormData({ ...formData, impact: e.target.value })
              }
              >
                <MenuItem value="1">1 - High</MenuItem>
                <MenuItem value="2">2 - Medium</MenuItem>
                <MenuItem value="3">3 - Low</MenuItem>
              </TextField>
              
            

            <TextField
              select
              label="Urgency"
              value={formData.urgency}
              required
              // type="number"
              size="small"
              sx={fieldStyle}
              onChange={(e) =>
                setFormData({ ...formData, urgency: e.target.value })
              }
              >
                <MenuItem value="1">1 - High</MenuItem>
                <MenuItem value="2">2 - Medium</MenuItem>
                <MenuItem value="3">3 - Low</MenuItem>
              </TextField>
            

            
              {/* {states.map((s) => (
                <MenuItem key={s.value} value={s.value}>
                  {s.label}
                </MenuItem>
              ))} */}
            

            <TextField
              label="Short Description"
              value={formData.short_description}
              required
              size="small"
              sx={{ ...fieldStyle, width: 300 }}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  short_description: e.target.value,
                })
              }
            />

            <Button
              type="submit"
              variant="contained"
              sx={{
                px: 3,
                height: 40,
                borderRadius: "25px",
                background: editing
                  ? "linear-gradient(45deg, #FF9800, #F57C00)"
                  : "linear-gradient(45deg, #4CAF50, #388E3C)",
                color: "white",
              }}
            >
              {editing ? "Update Incident" : "Insert Incident"}
            </Button>

            <TextField
              label="Search Incidents"
              placeholder="Search By Inc/short Description/priority"
              variant="outlined"
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{width: 300}}
            />
          </Box>

          
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {incidents
            .filter((inc) => {
              const q = search.toLowerCase();
              if (!q) return true;
              return (
                (inc.number || "").toLowerCase().includes(q) ||
                (inc.short_description || "").toLowerCase().includes(q) ||
                (inc.priority !== undefined && inc.priority !== null && inc.priority.toString().includes(q))
              );
            })
            .map((inc) => (
              <Grid item key={inc.sys_id}>
                <Card
                  sx={{
                    width: 320,
                    borderRadius: 3,
                    p: 1,
                    boxShadow: 4,
                    backgroundColor: (theme) =>
                      theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.05)"
                        : "white",
                    "&:hover": {
                      transform: "scale(1.03)",
                      transition: "0.3s",
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      <b>Number: </b>{inc.number}
                    </Typography>
                    <Typography><b>Short_description: </b>{inc.short_description}</Typography>
                    <Typography sx={{ mt: 0 }}>
                      <b>State:</b> {inc.state}
                    </Typography>
                    <Typography>
                      <b>Priority:</b> {inc.priority}
                    </Typography>

                    <Stack direction="row" spacing={2} mt={2}>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleEdit(inc)}
                      >
                        Edit
                      </Button>

                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(inc.sys_id)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Stack>
      ) : (
        <Typography>Please log in</Typography>
      )}
    </>
  );
}
