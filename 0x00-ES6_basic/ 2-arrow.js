export default function taskBlock(trueOrFalse) {
  const task = false;
  const task2 = true;

  if (trueOrFalse) {
    // No need to reassign, as const variables cannot be reassigned
  }

  return [task, task2];
}
