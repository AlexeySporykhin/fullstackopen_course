import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { NewHospitalEntry, Diagnosis } from "../../types";
import DiagnosisCodesSelect from "./DiagnosisCodesSelect";

interface Props {
  onCancel: () => void;
  onSubmit: (values: NewHospitalEntry) => void;
  diagnoses: Diagnosis[];
}

const HospitalEntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      type: "Hospital",
      description,
      date,
      specialist,
      diagnosisCodes,
      discharge: {
        date: dischargeDate,
        criteria: dischargeCriteria,
      },
    });
  };

  return (
    <div>
      <h3>New Hospital Entry</h3>
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
        <DiagnosisCodesSelect
          diagnoses={diagnoses}
          diagnosisCodes={diagnosisCodes}
          setDiagnosisCodes={setDiagnosisCodes}
        />
        <TextField
          label="Discharge Date"
          type="date"
          fullWidth
          required
          value={dischargeDate}
          onChange={(e) => setDischargeDate(e.target.value)}
          sx={{ mt: 2 }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Discharge Criteria"
          fullWidth
          required
          value={dischargeCriteria}
          onChange={(e) => setDischargeCriteria(e.target.value)}
          sx={{ mt: 2 }}
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
              style={{ float: "right" }}
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

export default HospitalEntryForm;
