import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.107.0/testing/asserts.ts";

const filename = "inputs/four.txt";
const content = await Deno.readTextFile(filename);
const input: string[] = content.split("\n");

function splitter(input: string[]): [string[], string[][][]] {
  const [first, ...tail] = input;
  const draw = first.split(",").map((x) => x.trim());
  const boards = [];
  let tmp = [];
  for (const b of tail) {
    if (b.trim().length === 0) {
      if (tmp.length > 0) boards.push(tmp);
      tmp = [];
    } else tmp.push(b.split(/\s+/gmi).filter((x) => x !== ""));
  }
  boards.push(tmp);
  return [draw, boards];
}

function checkw(
  board: string[][],
  draw: string[],
): { number: number; step: number; sum: number } {
  const result = [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
  ];
  for (const n in draw) {
    let ir = 0;
    let ic = 0;
    while (ir <= 4) {
      if (board[ir][ic % 5] === draw[n]) {
        result[ir][ic % 5] = true;
        break;
      }
      ic++;
      ir = Math.floor(ic / 5);
    }
    const v = [0, 1, 2, 3, 4].some((x) => result.every((r) => r[x]));
    const h = result.some((r) => r.every((x) => x));
    if (v || h) {
      const sum = board.reduce(
        (acc, r, ridx) =>
          acc +
          r.reduce(
            (acc, c, cidx) => acc + (!result[ridx][cidx] ? parseInt(c) : 0),
            0,
          ),
        0,
      );
      return { number: parseInt(draw[n]), step: parseInt(n), sum };
    }
  }
  return { number: -1, step: -1, sum: -1 };
}

function parse1(input: string[]) {
  const [draw, boards] = splitter(input);
  const result = boards.reduce(
    (acc, b) => {
      const res = checkw(b, draw);
      return acc.step === -1 || acc.step > res.step ? res : acc;
    },
    { number: -1, step: -1, sum: -1 },
  );
  return result.number * result.sum;
}

function parse2(input: string[]) {
  const [draw, boards] = splitter(input);
  const results = boards.map((b) => checkw(b, draw));
  results.sort((a, b) => b.step - a.step);
  return results[0].number * results[0].sum;
}

Deno.test("Day4", () => {
  const test =
    `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`;

  const arr: string[] = test.split("\n").map((x) => x.trim());

  const res1 = parse1(arr);
  assertEquals(res1, 4512);

  const res2 = parse2(arr);
  assertEquals(res2, 1924);

  // clear
  console.log();

  const part1 = parse1(input);
  assert(part1);
  console.log("Part 1: ", part1);

  const part2 = parse2(input);
  assert(part2);
  console.log("Part 2: ", part2);
});

`
80 16 10 79 55
93 60  4  0 29
 7 97  3  9 86
43 67 78 64 35
44 83 40 33 12
`;
