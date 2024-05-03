const getStudentsByLocation = (students, city) => {
  const arrs = students.filter((ft) => ft.location === city);
  return arrs;
};

export default getStudentsByLocation;
