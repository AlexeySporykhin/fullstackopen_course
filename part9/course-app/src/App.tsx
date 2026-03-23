interface HeaderProps {
  name: string;
}

interface ContentProps {
  content: Array<{
    name: string;
    exerciseCount: number;
  }>;
}

interface TotalProps {
  totalExercises: number;
}

const Total = (props: TotalProps) => {
  console.log(props)
  return (
    <div>
      <p>Number of exercises {props.totalExercises}</p>
    </div>
  )
}

const Content = (props: ContentProps) => {
  console.log(props);
  return (
    <div>
      {props.content.map(course => (
        <p>
          {course.name} {course.exerciseCount}
        </p>
      ))}
    </div>
  );
};
const Header = (props: HeaderProps) => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  );
};

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
    },
  ];

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0,
  );

  return (
    <div>
      <Header name={courseName} />
      <Content content={courseParts} />
      <Total totalExercises={totalExercises} />      
    </div>
  );
};

export default App;
