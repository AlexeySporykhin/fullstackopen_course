interface ExercisesStats {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
