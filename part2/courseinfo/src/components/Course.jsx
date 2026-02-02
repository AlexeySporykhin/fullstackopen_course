const Header = ({ courseName }) => <h1>{courseName}</h1>;

const Content = ({ parts }) =>
  parts.map((part) => <Part key={part.id} part={part} />);

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Total = ({ parts }) => {
  const totalExercises = parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises,
    0,
  );
  return <p><strong>total of {totalExercises} exercises</strong></p>;
};

const Course = ({ course }) => {
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;