import { assert, assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { slidingWindows } from "https://deno.land/std/collections/sliding_windows.ts";

const filename = "inputs/one.txt";
const content = await Deno.readTextFile(filename);

function parse1(input: string): number {
  const arr = input.split("\n").map((z) => parseInt(z.trim(), 10));
  const windowslice = slidingWindows(arr, 2);
  return windowslice.reduce((acc, [a, b]) => a < b ? acc + 1 : acc, 0);
}

function parse2(input: string): number {
  const arr = input.split("\n").map((z) => parseInt(z.trim(), 10));
  const windowslice = slidingWindows(arr, 3);
  const second = slidingWindows(windowslice, 2);
  return second.reduce(
    (acc, [[a, b, c], [d, e, f]]) => a + b + c < d + e + f ? acc + 1 : acc,
    0,
  );
}
Deno.test("Day1", () => {
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

  // clear
  console.log();

  const part1 = parse1(content);
  assert(part1);
  console.log("Part 1: ", part1);

  const part2 = parse2(content);
  assert(part2);
  console.log("Part 2: ", part2);
});
