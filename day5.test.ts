import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.107.0/testing/asserts.ts";

const filename = "inputs/five.txt";
const content = await Deno.readTextFile(filename);
const input: string[] = content.split("\n");

type Data = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

function determine(filtered: Data[]) {
  const map = new Map<string, number>();
  filtered.forEach((row) => {
    const isH = row.x1 === row.x2;
    const isV = row.y1 === row.y2;
    if (isH || isV) {
      const n1 = isH ? row.y1 : row.x1;
      const n2 = isH ? row.y2 : row.x2;

      const start = n1 < n2 ? n1 : n2;
      const end = n1 > n2 ? n1 : n2;
      for (let i = start; i <= end; i++) {
        const key = isH ? `${row.x1}-${i}` : `${i}-${row.y1}`;
        if (map.has(key)) map.set(key, map.get(key)! + 1);
        else map.set(key, 1);
      }
    } else {
      const range = Math.abs(row.x1 - row.x2);
      const xs = row.x1 > row.x2;
      const ys = row.y1 > row.y2;
      for (let i = 0; i <= range; i++) {
        const key = `${xs ? row.x1 - i : row.x1 + i}-${
          ys ? row.y1 - i : row.y1 + i
        }`;
        if (map.has(key)) map.set(key, map.get(key)! + 1);
        else map.set(key, 1);
      }
    }
  });
  let count = 0;
  for (const v of map.values()) if (v > 1) count++;
  return count;
}

function parse1(input: string[]) {
  const res = input.map((entry) => entry.split(" -> ").map((x) => x.split(",")))
    .map(([[x1, y1], [x2, y2]]) => ({
      x1: parseInt(x1),
      y1: parseInt(y1),
      x2: parseInt(x2),
      y2: parseInt(y2),
    }));

  const filtered: Data[] = res.filter((row) =>
    row.x1 === row.x2 || row.y1 === row.y2
  );
  return determine(filtered);
}

function parse2(input: string[]) {
  const res = input.map((entry) => entry.split(" -> ").map((x) => x.split(",")))
    .map(([[x1, y1], [x2, y2]]) => ({
      x1: parseInt(x1),
      y1: parseInt(y1),
      x2: parseInt(x2),
      y2: parseInt(y2),
    }));

  return determine(res);
}

Deno.test("Day5", () => {
  const test = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;

  const arr: string[] = test.split("\n").map((x) => x.trim());

  const res1 = parse1(arr);
  assertEquals(res1, 5);

  const res2 = parse2(arr);
  assertEquals(res2, 12);

  // clear
  console.log();

  const part1 = parse1(input);
  assert(part1);
  console.log("Part 1: ", part1);

  const part2 = parse2(input);
  assert(part2);
  console.log("Part 2: ", part2);
});
