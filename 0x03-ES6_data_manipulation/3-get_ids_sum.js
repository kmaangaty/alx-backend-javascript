const getStudentIdsSum = (students) => {
  const id = students.reduce(
    (k, v) => k + v.id, 0,
  );
  return id;
};

export default getStudentIdsSum;
