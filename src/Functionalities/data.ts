export interface classType {
  name: string;
  teacher: string;
  maxNoOfStudents: number;
  students: object[];
}

export const classesMock = [
  {
    name: "Graphics",
    teacher: "Kyle",
    maxNoOfStudents: 10,
    students: [{ name: "John" }, { name: "Beth" }, { name: "Mike" }],
  },
  {
    name: "Mechatronics",
    teacher: "Allen",
    maxNoOfStudents: 5,
    students: [
      { name: "Stewie" },
      { name: "Chris" },
      { name: "Peter" },
      { name: "Brian" },
    ],
  },
  {
    name: "Robotics",
    teacher: "Anna",
    maxNoOfStudents: 5,
    students: [{ name: "Andrew" }, { name: "Leia" }],
  },
];
