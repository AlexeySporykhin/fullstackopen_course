import {
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import {
  NewHealthCheckEntry,
  HealthCheckRating,
  Diagnosis,
} from "../../types";
import DiagnosisCodesSelect from "./DiagnosisCodesSelect";

interface Props {
  onCancel: () => void;
  onSubmit: (values: NewHealthCheckEntry) => void;
  diagnoses: Diagnosis[];
}

const HealthCheckEntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState(HealthCheckRating.Healthy);

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      type: "HealthCheck",
      description,
      date,
      specialist,
      diagnosisCodes,
      healthCheckRating,
    });
  };
  return (
    <div>
      <h3>New HealthCheck Entry</h3>
      <form onSubmit={addEntry}>
        <TextField
          label="Description"
          fullWidth
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mt: 1 }}
        />
        <TextField
          label="Date"
          type="date"
          fullWidth
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
          sx={{ mt: 2 }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Specialist"
          fullWidth
          required
          value={specialist}
          onChange={(e) => setSpecialist(e.target.value)}
          sx={{ mt: 2 }}
        />
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="health-rating-label">Health check rating</InputLabel>
          <Select
            labelId="health-rating-label"
            label="Health check rating"
          value={healthCheckRating}
            onChange={(e) =>
              setHealthCheckRating(e.target.value as HealthCheckRating)
            }
          >
            <MenuItem value={HealthCheckRating.Healthy}>Healthy</MenuItem>
            <MenuItem value={HealthCheckRating.LowRisk}>Low risk</MenuItem>
            <MenuItem value={HealthCheckRating.HighRisk}>High risk</MenuItem>
            <MenuItem value={HealthCheckRating.CriticalRisk}>
              Critical risk
            </MenuItem>
          </Select>
        </FormControl>
        <DiagnosisCodesSelect
          diagnoses={diagnoses}
          diagnosisCodes={diagnosisCodes}
          setDiagnosisCodes={setDiagnosisCodes}
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
