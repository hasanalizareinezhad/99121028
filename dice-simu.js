function diceCounter(n) {
  let num1 = 0,
    num2 = 0,
    num3 = 0,
    num4 = 0,
    num5 = 0,
    num6 = 0;

  for (let i = 0; i <= n; i++) {
    const dice = Math.ceil(Math.random() * 6);
    switch (dice) {
      case 1:
        num1 += 1;
        break;
      case 2:
        num2 += 1;
        break;
      case 3:
        num3 += 1;
        break;
      case 4:
        num4 += 1;
        break;
      case 5:
        num5 += 1;
        break;
      case 6:
        num6 += 1;
        break;
    }
  }

  let sum = num1 + num2 + num3 + num4 + num5 + num6;

  console.log(
    `\nnumber 1: ${num1} times repeated\nIts probability is ${
      (num1 / sum).toFixed(3) * 100
    }%\n`
  );
  console.log(
    `number 2: ${num2} times repeated\nIts probability is ${
      (num2 / sum).toFixed(3) * 100
    }%\n`
  );
  console.log(
    `number 3: ${num3} times repeated\nIts probability is ${
      (num3 / sum).toFixed(3) * 100
    }%\n`
  );
  console.log(
    `number 4: ${num4} times repeated\nIts probability is ${
      (num4 / sum).toFixed(3) * 100
    }%\n`
  );
  console.log(
    `number 5: ${num5} times repeated\nIts probability is ${
      (num5 / sum).toFixed(3) * 100
    }%\n`
  );
  console.log(
    `number 6: ${num6} times repeated\nIts probability is ${
      (num6 / sum).toFixed(3) * 100
    }%\n`
  );
}

diceCounter(600000);
