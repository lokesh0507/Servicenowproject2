import {
  Stack,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
} from "@mui/material";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import axios from "axios";

export default function Home() {
  const { isLogged } = useContext(AuthContext);
  const [incidents, setIncidents] = useState([]);
  const [formData, setFormData] = useState({
    impact: "",
    urgency: "",
    short_description: "",
  });
  const [editing, setEditing] = useState(null); 

  
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
            short_description: formData.short_description,
          },
          { withCredentials: true }
        );
        alert("Incident updated successfully!");
      } else {
        
        await axios.post(
          "http://localhost:3001/api/incidents",
          {
            impact: parseInt(formData.impact),
            urgency: parseInt(formData.urgency),
            short_description: formData.short_description,
          },
          { withCredentials: true }
        );
        alert("Incident inserted successfully!");
      }

      const res = await axios.get("http://localhost:3001/api/incidents", {
        withCredentials: true,
      });
      setIncidents(res.data.result || []);

     
      setFormData({ impact: "", urgency: "", short_description: "" });
      setEditing(null);
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save incident.");
    }
  };

  const handleDelete = async (sys_id) => {
    try {
      await axios.delete(`http://localhost:3001/api/incidents/${sys_id}`, {
        withCredentials: true,
      });

      setIncidents((prevIncidents) =>
        prevIncidents.filter((inc) => inc.sys_id !== sys_id)
      );
      setEditing(null);
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete incident.");
    }
  };

 
  const handleEdit = (inc) => {
    setFormData({
      impact: inc.impact || "",
      urgency: inc.urgency || "",
      short_description: inc.short_description || "",
    });
    setEditing(inc.sys_id);
  };

  return (
    <>
      {isLogged && incidents ? (
        <Stack spacing={3}>
          <Typography variant="h5">Incident Records:</Typography>

          <form onSubmit={handleSubmit}>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
              <TextField
                label="Impact"
                value={formData.impact}
                onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
                required
                size="small"
                sx={{ width: 150 }}
              />
              <TextField
                label="Urgency"
                value={formData.urgency}
                onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                required
                size="small"
                sx={{ width: 150 }}
              />
              <TextField
                label="Short Description"
                value={formData.short_description}
                onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                required
                size="small"
                sx={{ width: 300 }}
              />

              <Button type="submit" variant="contained" color="primary">
                {editing ? "Update Incident" : "Insert Incident"}
              </Button>
            </Stack>
          </form>

          <Grid container spacing={5} justifyContent={"space-around"}>
            {incidents.map((inc) => {
              return (
                <Grid key={inc.sys_id}>
                  <Card sx={{ width: 300, height: 200 }}>
                    <CardContent>
                      <Typography variant="h6">Incident #: {inc.number}</Typography>
                      <Typography variant="body2">
                        Description: {inc.short_description}
                      </Typography>
                      <Typography variant="body2">State: {inc.state}</Typography>
                      <Typography variant="body2">Priority: {inc.priority}</Typography>

                      <Button
                        sx={{ mt: 1 }}
                        variant="contained"
                        color="success"
                        onClick={() => handleEdit(inc)} // ✅ wired here
                      >
                        Edit
                      </Button>

                      <Button
                        sx={{ mt: 1, mx: 1 }}
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(inc.sys_id)}
                      >
                        Delete
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Stack>
      ) : (
        <Typography>Please log in</Typography>
      )}
    </>
  );
}
