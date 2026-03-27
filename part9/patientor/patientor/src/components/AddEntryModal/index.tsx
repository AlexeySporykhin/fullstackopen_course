import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import { Diagnosis, NewEntry, EntryType } from "../../types";
import HealthCheckEntryForm from "./HealthCheckEntryForm";
import HospitalEntryForm from "./HospitalEntryForm";
import OccupationalHealthcareEntryForm from "./OccupationalHealthcareEntryForm";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewEntry) => void;
  diagnoses: Diagnosis[];
  error?: string;
}

  

const AddEntryModal = ({
  modalOpen,
  onClose,
  onSubmit,
  diagnoses,
  error,
}: Props) => {
  const [entryType, setEntryType] = useState<EntryType>("HealthCheck");

  const handleEntryTypeChange = (event: SelectChangeEvent) => {
    setEntryType(event.target.value as EntryType);
  };

  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
      <DialogTitle>Add a new entry</DialogTitle>
      <Divider />
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        <FormControl fullWidth sx={{ mb: 2, mt: 1 }}>
          <InputLabel id="entry-type-label">Entry Type</InputLabel>
          <Select
            labelId="entry-type-label"
            value={entryType}
            label="Entry Type"
            onChange={handleEntryTypeChange}
          >
            <MenuItem value="HealthCheck">HealthCheck</MenuItem>
            <MenuItem value="Hospital">Hospital</MenuItem>
            <MenuItem value="OccupationalHealthcare">
              OccupationalHealthcare
            </MenuItem>
          </Select>
        </FormControl>
        {entryType === "HealthCheck" && (
          <HealthCheckEntryForm
            onSubmit={onSubmit}
            onCancel={onClose}
            diagnoses={diagnoses}
          />
        )}
        {entryType === "Hospital" && (
          <HospitalEntryForm
            onSubmit={onSubmit}
            onCancel={onClose}
            diagnoses={diagnoses}
          />
        )}
        {entryType === "OccupationalHealthcare" && (
          <OccupationalHealthcareEntryForm
            onSubmit={onSubmit}
            onCancel={onClose}
            diagnoses={diagnoses}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddEntryModal;