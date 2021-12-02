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

Deno.test("Examples", () => {
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
});

Deno.test("Part 1:", () => {
  const res = parse1(input);
  assert(res);
  console.log(res);
});
Deno.test("Part 2:", () => {
  const res = parse2(input);
  assert(res);
  console.log(res);
});
