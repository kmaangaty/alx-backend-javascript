export default function taskBlock(trueOrFalse) {
  let task = false;
  let task2 = true;

  if (trueOrFalse) {
    let task = true; // Change var to let
    let task2 = false; // Change var to let
  }

  return [task, task2];
}