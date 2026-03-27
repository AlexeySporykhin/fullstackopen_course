import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { NewOccupationalHealthcareEntry, Diagnosis } from "../../types";
import DiagnosisCodesSelect from "./DiagnosisCodesSelect";

interface Props {
  onCancel: () => void;
  onSubmit: (values: NewOccupationalHealthcareEntry) => void;
  diagnoses: Diagnosis[];
}

const OccupationalHealthcareEntryForm = ({
  onCancel,
  onSubmit,
  diagnoses,
}: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      type: "OccupationalHealthcare",
      description,
      date,
      specialist,
      diagnosisCodes,
      employerName,
      sickLeave:
        sickLeaveStartDate && sickLeaveEndDate
          ? {
              startDate: sickLeaveStartDate,
              endDate: sickLeaveEndDate,
            }
          : undefined,
    });
  };

  return (
    <div>
      <h3>New Occupational Healthcare Entry</h3>
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
          label="Employer Name"
          fullWidth
          required
          value={employerName}
          onChange={(e) => setEmployerName(e.target.value)}
          sx={{ mt: 2 }}
        />
        <TextField
          label="Sick Leave Start Date"
          type="date"
          fullWidth
          value={sickLeaveStartDate}
          onChange={(e) => setSickLeaveStartDate(e.target.value)}
          sx={{ mt: 2 }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Sick Leave End Date"
          type="date"
          fullWidth
          value={sickLeaveEndDate}
          onChange={(e) => setSickLeaveEndDate(e.target.value)}
          sx={{ mt: 2 }}
          InputLabelProps={{ shrink: true }}
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

export default OccupationalHealthcareEntryForm;
