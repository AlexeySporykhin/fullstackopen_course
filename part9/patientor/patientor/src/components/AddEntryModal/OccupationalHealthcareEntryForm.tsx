import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { NewOccupationalHealthcareEntry } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: NewOccupationalHealthcareEntry) => void;
}

const OccupationalHealthcareEntryForm = ({ onCancel, onSubmit }: Props) => {
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label="Date"
          fullWidth
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={(e) => setSpecialist(e.target.value)}
        />
        <TextField
          label="Diagnosis Codes"
          fullWidth
          value={diagnosisCodes.join(", ")}
          onChange={(e) => setDiagnosisCodes(e.target.value.split(", "))}
        />
        <TextField
          label="Employer Name"
          fullWidth
          value={employerName}
          onChange={(e) => setEmployerName(e.target.value)}
        />
        <TextField
          label="Sick Leave Start Date"
          fullWidth
          value={sickLeaveStartDate}
          onChange={(e) => setSickLeaveStartDate(e.target.value)}
        />
        <TextField
          label="Sick Leave End Date"
          fullWidth
          value={sickLeaveEndDate}
          onChange={(e) => setSickLeaveEndDate(e.target.value)}
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
