const getStudentsByLocation = (students, city) => {
  return students.filter((funtion) => funtion.location === city);
};

export default getStudentsByLocation;
