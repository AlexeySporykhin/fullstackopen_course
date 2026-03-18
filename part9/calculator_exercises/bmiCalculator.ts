const calculateBmi = (height: number, weight: number) => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    if (bmi < 18.5) {
        return 'Underweight';
    } else if (bmi < 25) {
        return 'Normal range';
    } else {
        return 'Overweight';
    }
}

console.log(calculateBmi(180, 74));