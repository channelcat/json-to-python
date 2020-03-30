import generate from "./generator";

const input = document.getElementById("input") as HTMLTextAreaElement;
const output = document.getElementById("output") as HTMLTextAreaElement;
const inline = document.getElementById("inline") as HTMLInputElement;
let json = input.value;

async function updoot() {
  output.value = await generate("python", input.value, inline.checked);
}

input.addEventListener("change", updoot);
inline.addEventListener("change", updoot);
updoot();
