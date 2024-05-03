export default function updateStudentGradeByCity(stds, city, newGrades) {
  if (!Array.isArray(stds) || !Array.isArray(newGrades)) {
    return [];
  }
  const stc = stds.filter((student) => student.location === city).map((student) => {
    const itt = newGrades.find((stt) => student.id === stt.studentId);
    return { ...student, grade: itt ? itt.grade : 'N/A' };
  });
  return stc;
}
