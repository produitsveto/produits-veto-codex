import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { renderHomePage } from "../src/render/home.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve(root, "index.html");

await writeFile(output, renderHomePage(), "utf8");
console.log(`Generated ${output}`);
