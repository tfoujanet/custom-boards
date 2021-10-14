export const splitArrayInChunks = (array, size) => {
  const workArray = [...array];
  const result = [];
  while (workArray.length > size) {
    const spliced = workArray.splice(0, size);
    result.push(spliced);
  }
  return [...result, workArray];
};
