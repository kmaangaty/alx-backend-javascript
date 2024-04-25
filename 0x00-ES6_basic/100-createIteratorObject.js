export default function createIteratorObject(report) {
  const departments = Object.values(report.allEmployees);
  let index = 0;
  let employeeIndex = 0;

  return {
    [Symbol.iterator]: function() {
      return {
        next: function() {
          const employees = departments[index];
          if (employeeIndex >= employees.length) {
            index++;
            employeeIndex = 0;
          }

          if (index >= departments.length) {
            return { done: true };
          }

          return { value: employees[employeeIndex++], done: false };
        }
      };
    }
  };
}
