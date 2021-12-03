import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.107.0/testing/asserts.ts";

const filename = "inputs/two.txt";
const content = await Deno.readTextFile(filename);
const input: [string, number][] = content.split("\n").map((z) => {
  const [direction, value] = z.trim().split(" ");
  return [direction, parseInt(value, 10)];
});

function parse1(input: [string, number][]) {
  const pos: [number, number] = [0, 0];
  for (const [d, v] of input) {
    switch (d) {
      case "forward":
        pos[0] += v;
        break;
      case "up":
        pos[1] -= v;
        break;
      case "down":
        pos[1] += v;
        break;
    }
  }
  return pos[0] * pos[1];
}
function parse2(input: [string, number][]) {
  const pos: [number, number, number] = [0, 0, 0];
  for (const [d, v] of input) {
    switch (d) {
      case "forward": {
        pos[0] += v;
        pos[1] += pos[2] * v;
        break;
      }
      case "up":
        pos[2] -= v;
        break;
      case "down":
        pos[2] += v;
        break;
    }
  }
  return pos[0] * pos[1];
}

Deno.test("Day2", () => {
  const test = `forward 5
  down 5
  forward 8
  up 3
  down 8
  forward 2`;

  const arr: [string, number][] = test.split("\n").map((z) => {
    const [direction, value] = z.trim().split(" ");
    return [direction, parseInt(value, 10)];
  });
  const res1 = parse1(arr);
  assertEquals(res1, 150);

  const res2 = parse2(arr);
  assertEquals(res2, 900);

  // clear
  console.log();

  // part 1
  const part1 = parse1(input);
  assert(part1);
  console.log("Part 1: ", part1);

  // part 2
  const part2 = parse2(input);
  assert(part2);
  console.log("Part 2: ", part2);
});
