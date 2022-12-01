function elemInArray<T>(array: T[], elem: T): boolean {
  return array.indexOf(elem) !== -1;
}

export {
   elemInArray,
}