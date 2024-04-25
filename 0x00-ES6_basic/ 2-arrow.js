export default function taskBlock(trueOrFalse) {
  let task = false;
  let task2 = true;

  if (trueOrFalse) {
    task = true; // Assign to the existing variable, no need to redeclare
    task2 = false; // Assign to the existing variable, no need to redeclare
  }

  return [task, task2];
}
