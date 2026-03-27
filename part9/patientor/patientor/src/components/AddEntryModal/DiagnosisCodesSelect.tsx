import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Diagnosis } from "../../types";

interface Props {
  diagnoses: Diagnosis[];
  diagnosisCodes: string[];
  setDiagnosisCodes: (codes: string[]) => void;
}

const DiagnosisCodesSelect = ({
  diagnoses,
  diagnosisCodes,
  setDiagnosisCodes,
}: Props) => {
  const onChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <FormControl fullWidth sx={{ mt: 2 }}>
      <InputLabel id="diagnosis-codes-label">Diagnosis codes</InputLabel>
      <Select
        labelId="diagnosis-codes-label"
        multiple
        value={diagnosisCodes}
        onChange={onChange}
        input={<OutlinedInput label="Diagnosis codes" />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((code) => (
              <Chip key={code} label={code} size="small" />
            ))}
          </Box>
        )}
      >
        {diagnoses.map((diagnosis) => (
          <MenuItem key={diagnosis.code} value={diagnosis.code}>
            {diagnosis.code} - {diagnosis.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DiagnosisCodesSelect;
