import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";
import { useTransition, animated } from "react-spring";

function App() {
  const [fieldName1, setFieldName1] = useState("");
  const [fieldName2, setFieldName2] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch("/api/fetch-data");
    const jsonData = await response.json();
    setData(jsonData);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch("/api/submit-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fieldName1, fieldName2 }),
    });

    if (response.ok) {
      // Clear form fields
      setFieldName1("");
      setFieldName2("");

      // Fetch updated data
      await fetchData();
    }
  };

  const transitions = useTransition(data, {
    keys: (item) => item.id,
    from: { opacity: 0, transform: "translate3d(0, 40px, 0)" },
    enter: { opacity: 1, transform: "translate3d(0, 0px, 0)" },
    leave: { opacity: 0, transform: "translate3d(0, -40px, 0)" },
  });

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Field 1"
            value={fieldName1}
            onChange={(e) => setFieldName1(e.target.value)}
            disabled={loading}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Field 2"
            value={fieldName2}
            onChange={(e) => setFieldName2(e.target.value)}
            disabled={loading}
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          Submit
        </Button>
      </form>
      <Box mt={4}>
        {loading ? (
          <CircularProgress />
        ) : (
          transitions((styles, item) => (
            <animated.div style={styles}>
              <Paper
                sx={{
                  padding: "16px",
                  marginBottom: "16px",
                }}
              >
                <p>
                  {item.custom_value_1}: {item.custom_value_2}
                </p>
              </Paper>
            </animated.div>
          ))
        )}
      </Box>
    </Container>
  );
}

export default App;
