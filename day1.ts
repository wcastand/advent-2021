import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.107.0/testing/asserts.ts";

const filename = "inputs/one.txt";
const content = await Deno.readTextFile(filename);

function towindow<T>(arr: T[], size: number): T[][] {
  return Array.from(
    { length: arr.length - 1 },
    (_, index) => arr.slice(index, index + size),
  );
}

function parse1(input: string): number {
  const arr = input.split("\n").map((z) => parseInt(z.trim(), 10));
  const windowslice = towindow(arr, 2);
  return windowslice.reduce((acc, [a, b]) => a < b ? acc + 1 : acc, 0);
}

function parse2(input: string): number {
  const arr = input.split("\n").map((z) => parseInt(z.trim(), 10));
  const windowslice = towindow(arr, 3);
  const second = towindow(windowslice, 2);
  return second.reduce(
    (acc, [[a, b, c], [d, e, f]]) => a + b + c < d + e + f ? acc + 1 : acc,
    0,
  );
}
Deno.test("Examples", () => {
  const test = `199
  200
  208
  210
  200
  207
  240
  269
  260
  263`;
  const res1 = parse1(test);
  assertEquals(res1, 7);

  const res2 = parse2(test);
  assertEquals(res2, 5);
});

Deno.test("Part 1:", () => {
  const res = parse1(content);
  assert(res);
  console.log(res);
});
Deno.test("Part 2:", () => {
  const res = parse2(content);
  assert(res);
  console.log(res);
});
