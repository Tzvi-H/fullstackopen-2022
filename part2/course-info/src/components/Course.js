const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const Header = ({ course }) => <h1>{course}</h1>;

const Content = ({ parts }) => {
  return parts.map((part) => <Part part={part} key={part.id} />);
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Total = ({ parts }) => (
  <p>
    Number of exercises {parts.reduce((acc, part) => acc + part.exercises, 0)}
  </p>
);

export default Course;
