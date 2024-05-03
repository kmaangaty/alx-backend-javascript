export default function updateStudentGradeByCity(stds, md, ngs) {
  if (!Array.isArray(stds) || !Array.isArray(ngs)) {
    return [];
  }
  const stc = stds.filter((student) => student.location === md).map((student) => {
    const itt = ngs.find((stt) => student.id === stt.studentId);
    return { ...student, grade: itt ? itt.grade : 'N/A' };
  });
  return stc;
}
