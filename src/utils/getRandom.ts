let Exclude: number[] = [];

function getRandom(min: number, max: number, noRepeat: boolean = true): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  const num = Math.floor(Math.random() * (max - min + 1)) + min;

  if (noRepeat) {
    if (Exclude.length >= max - min) Exclude = [];
    if (Exclude.includes(num)) return getRandom(min, max);
    Exclude.push(num);
  }
  console.log(num);

  return num;
}

export default getRandom;
