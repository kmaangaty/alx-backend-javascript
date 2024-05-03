const getStudentIdsSum = (students) => {
  return students.reduce(
      (acc, value) => acc + value.id, 0,
  );
};

export default getStudentIdsSum;
