interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}
interface CoursePartBasic extends CoursePartDescription {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartSpecial extends CoursePartDescription {
  requirements: string[];
  kind: "special";
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;
interface HeaderProps {
  name: string;
}

interface ContentProps {
  content: Array<CoursePart>;
}

interface TotalProps {
  totalExercises: number;
}

const Total = (props: TotalProps) => {
  console.log(props);
  return (
    <div>
      <p>Number of exercises {props.totalExercises}</p>
    </div>
  );
};

const Content = (props: ContentProps) => {
  const Part = (props: CoursePart) => {
    const CoursePartCommon = () => {
      return (
        <div>
          <p>
            <b>
              {props.name} {props.exerciseCount}
            </b>
          </p>
        </div>
      );
    };

    switch (props.kind) {
      case "basic":
        return (
          <div>
            <CoursePartCommon />
            <p>
              {" "}
              <i> {props.description} </i>
            </p>
          </div>
        );
      case "group":
        return (
          <div>
            <CoursePartCommon />
            <p>project exercises {props.groupProjectCount}</p>
          </div>
        );
      case "background":
        return (
          <div>
            <CoursePartCommon />
            <p>
              {" "}
              <i> {props.description} </i>
            </p>
            <p>submit to {props.backgroundMaterial}</p>
          </div>
        );
        case "special":
          return (
          <div>
            <CoursePartCommon />
            <p>
              {" "}
              <i> {props.description} </i>
            </p>
            <p> required skills: {props.requirements.join(", ")}</p>
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <div>
      {props.content.map(course => (
        <Part key={course.name} {...course} />
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

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special",
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
