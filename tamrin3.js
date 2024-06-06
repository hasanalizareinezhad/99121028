function toJalali(gy, gm, gd) {
  let g_d_m, jy, jm, jd, gy2, days;
  gy -= 1600;
  gy2 = gm > 2 ? gy + 1 : gy;
  days =
    365 * gy +
    Math.floor((gy2 + 3) / 4) -
    Math.floor((gy2 + 99) / 100) +
    Math.floor((gy2 + 399) / 400) -
    80 +
    gd +
    [0, 31, 62, 93, 124, 155, 186, 216, 246, 276, 306, 336][gm - 1];
  jy = 979 + 33 * Math.floor(days / 12053);
  days %= 12053;
  jy += 4 * Math.floor(days / 1461);
  days %= 1461;
  if (days > 365) {
    jy += Math.floor((days - 1) / 365);
    days = (days - 1) % 365;
  }
  if (days < 186) {
    jm = 1 + Math.floor(days / 31);
    jd = 1 + (days % 31);
  } else {
    jm = 7 + Math.floor((days - 186) / 30);
    jd = 1 + ((days - 186) % 30);
  }
  return { year: jy, month: jm, day: jd };
}

const result = toJalali(2023, 2, 20);
console.log(result);
