export default function taskBlock(trueOrFalse) {
  var task = false;
  var task2 = true;

  if (trueOrFalse) {
    // No need to redeclare the variables, just assign new values
    task = true;
    task2 = false;
  }

  return [task, task2];
}