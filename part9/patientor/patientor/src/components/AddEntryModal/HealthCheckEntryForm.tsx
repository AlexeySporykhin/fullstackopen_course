import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { NewHealthCheckEntry, HealthCheckRating } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: NewHealthCheckEntry) => void;
}

const HealthCheckEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState(HealthCheckRating.Healthy);

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      type: "HealthCheck",
      description: description,
      date: date,
      specialist: specialist,
      diagnosisCodes: diagnosisCodes,
      healthCheckRating: healthCheckRating,
    });
  };
  return (
    <div>
      <h3>New HealthCheck Entry</h3>
      <form onSubmit={addEntry}>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <TextField
          label="Date"
          fullWidth
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={e => setSpecialist(e.target.value)}
        />
        <TextField
          label="Health Check Rating"
          fullWidth
          value={healthCheckRating}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setHealthCheckRating(Number(e.target.value))
          }
        />
        <TextField
          label="Diagnosis Codes"
          fullWidth
          value={diagnosisCodes.join(", ")}
          onChange={e => setDiagnosisCodes(e.target.value.split(", "))}
        />
        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default HealthCheckEntryForm;
