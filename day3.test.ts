import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.107.0/testing/asserts.ts";
import { partition } from "https://deno.land/std@0.108.0/collections/mod.ts";

const filename = "inputs/three.txt";
const content = await Deno.readTextFile(filename);
const input: string[] = content.split("\n").map((t) => t.trim());

function parse1(input: string[]) {
  const tmp = input;
  let tgamma = "";
  let tepsilon = "";
  for (let i = 0; i < input[0].length; i++) {
    const [ones, zeros] = partition(tmp, (it) => it[i] !== "0");
    tgamma += ones.length > zeros.length ? "1" : "0";
    tepsilon += ones.length < zeros.length ? "1" : "0";
  }

  const gamma = parseInt(tgamma, 2);
  const epsilon = parseInt(tepsilon, 2);

  return gamma * epsilon;
}
function parse2(input: string[]) {
  let tmp = input;
  for (let i = 0; i < input[0].length; i++) {
    const [ones, zeros] = partition(tmp, (it) => it[i] !== "0");
    if (ones.length === zeros.length) tmp = ones;
    else tmp = ones.length < zeros.length ? zeros : ones;
    if (tmp.length === 1) break;
  }
  const oxygen = parseInt(tmp[0], 2);

  tmp = input;
  for (let i = 0; i < input[0].length; i++) {
    const [ones, zeros] = partition(tmp, (it) => it[i] !== "0");
    if (ones.length === zeros.length) tmp = zeros;
    else tmp = ones.length > zeros.length ? zeros : ones;
    if (tmp.length === 1) break;
  }
  const co2 = parseInt(tmp[0], 2);
  return oxygen * co2;
}

Deno.test("Day3", () => {
  const test = `00100
  11110
  10110
  10111
  10101
  01111
  00111
  11100
  10000
  11001
  00010
  01010`;

  const arr: string[] = test.split("\n").map((t) => t.trim());

  const res1 = parse1(arr);
  assertEquals(res1, 198);

  const res2 = parse2(arr);
  assertEquals(res2, 230);

  // clear
  console.log();

  const part1 = parse1(input);
  assert(part1);
  console.log("Part 1: ", part1);

  const part2 = parse2(input);
  assert(part2);
  console.log("Part 2: ", part2);
});
