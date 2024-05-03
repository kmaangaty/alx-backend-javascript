const getListStudentIds = (arrs) => {
  if (!Array.isArray(arrs)) {
    return [];
  }
  return arrs.map((studentId) => studentId.id);
};

export default getListStudentIds;
