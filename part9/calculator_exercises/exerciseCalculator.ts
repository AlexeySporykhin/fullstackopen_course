interface ExercisesStats {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseExerciseArguments = (
  args: string[],
): { dailyExercises: number[]; target: number } => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const target = Number(args[2]);
  if (isNaN(target)) throw new Error("Target value must be a number");

  const dailyExercises = args.slice(3).map(Number);
  if (dailyExercises.some(isNaN))
    throw new Error("All exercise values must be numbers");

  return { target, dailyExercises };
};

const calculateExercises = (
  dailyExercises: number[],
  target: number,
): ExercisesStats => {
  const periodLength = dailyExercises.length;
  const trainingDays = dailyExercises.filter(hours => hours > 0).length;
  const totalHours = dailyExercises.reduce((sum, hours) => sum + hours, 0);
  const average = totalHours / periodLength;
  const success = average >= target;
  const rating = success ? 3 : average >= target * 0.75 ? 2 : 1;
  const ratingDescription =
    rating === 3
      ? "Great job! You met your target."
      : rating === 2
        ? "Not too bad but could be better."
        : "You need to work harder to meet your target.";
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { target, dailyExercises } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(dailyExercises, target));
} catch (error: unknown) {
  let errorMessage = "Something went wrong.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
