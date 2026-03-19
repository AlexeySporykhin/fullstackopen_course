import express from "express";
import qs from "qs";
import { calculateBmi } from "./bmiCalculator";
import { isNotNumber } from "./utils/helperFunctions";

const app = express();

app.get("/hello", (_req, res) => {
  return res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = qs.parse(req.url.split("?")[1]);
  if (!height || !weight || isNotNumber(height) || isNotNumber(weight)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }
  const bmi = calculateBmi(Number(height), Number(weight));

  return res.json({
    height,
    weight,
    bmi,
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
