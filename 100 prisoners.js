const range = (n) => [...Array(n).keys()];
const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = (Math.random() * i) >>> 0;
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const sample = (a, k) => {
  const n = a.length,
    idx = range(n),
    r = [];
  for (let i = 0; i < k; i++) {
    const j = (Math.random() * (n - i)) >>> 0;
    r.push(a[idx[j]]);
    idx[j] = idx[n - i - 1];
  }
  return r;
};
const randomPick = (prisoner, k, drawers) => {
  return sample(drawers, k).some((num) => num === prisoner);
};
const cyclicPick = (prisoner, k, drawers) => {
  for (let num = prisoner, i = 0; i < k; i++) {
    if ((num = drawers[num]) === prisoner) return true;
  }
  return false;
};
const cyclicMax = (drawers) => {
  const checked = new Set();
  let max = 0;
  for (let i = 0; i < drawers.length; i++) {
    if (checked.has(i)) continue;
    checked.add(i);
    let num = drawers[i],
      count = 1;
    while (!checked.has(num)) {
      checked.add(num);
      (num = drawers[num]), (count += 1);
    }
    max = Math.max(max, count);
  }
  return max;
};
const guard = (drawers, k) =>
  new Proxy(drawers, {
    count: 0,
    get(target, key, recv) {
      const n = Number(key);
      if (Number.isInteger(n) && n >= 0) console.assert(this.count++ < k);
      return Reflect.get(target, key, recv);
    },
  });
const challenge = (pick, drawers) => {
  const prisoners = drawers.length,
    k = Math.floor(prisoners / 2);
  return range(prisoners).every((prisoner) => pick(prisoner, k, drawers));
};
const simulate = (prisoners, times) => {
  const drawers = range(prisoners);
  let successRandom = 0,
    successCyclic = 0;
  for (let i = 0; i < times; i++) {
    shuffle(drawers);
    successRandom += challenge(randomPick, drawers);
    successCyclic += challenge(cyclicPick, drawers);
  }
  return { successRandom, successCyclic };
};
{
  const prisoners = 100,
    times = 100000;
  const { successRandom, successCyclic } = simulate(prisoners, times);
  console.log(`${prisoners} Random Pick: ${(successRandom * 100) / times}`); // => 0%
  console.log(`${prisoners} Cyclic Pick: ${(successCyclic * 100) / times}`); // => 31%
}
