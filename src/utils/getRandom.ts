function getRandom(min: number, max: number, Exclude?: any): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  if (Exclude?.includes(num)) {
    return getRandom(min, max, Exclude);
  } else {
    return num;
  }
}

export default getRandom;
