import { createInterface } from "node:readline/promises"
import { stdin as input, stdout as output } from "node:process"
import { randomInt } from "node:crypto"

type Player = { name: string; kind: "human" | "cpu" }

const cpu: Player = { name: "Bran Ironbrew", kind: "cpu" }
const rl = createInterface({ input, output })

// Narration is gray.
console.log("The raid leader calls a five minute break. Half the raid vanishes to restock on reagents; the other half are AFK.")

await rl.question("[Enter to continue]")

// Narration is gray.
console.log("\nA stout dwarf with a thick braided beard stops in front of you, thumbs hooked in his belt.")

// Emotes are orange.
console.log("Bran extends a gauntleted hand.")

// Dialogue is pink (whisper).
console.log(`Heya! Name's ${cpu.name}. Don't think we've been properly introduced. What do they call ye?`)

// Player input is white.
const name = (await rl.question("Your name: ")).trim()
const human: Player = { name, kind: "human" }

// Dialogue is pink (whisper).
console.log(`${human.name}! Great to meet ye.`)
console.log(`Break's near five minutes. Long enough for a proper deathroll, if ye've the stomach for it. Thousand gold, winner takes all. What d'ye say, ${human.name}?`)

const decision = await validateInput(("Play death roll? (Y/N): "), ["y", "n"], "Bran tugs his beard.\nSimple question, friend. Yes or no?")

if (decision === "y") {
  console.log("Right then. High roll starts, standard rules. On three: one, two...")
} else if(decision === "n") {
  // Emote.
  console.log("Bran shrugs, unbothered, and pockets the dice.")
  // Whisper.
  console.log("Suit yerself. More gold for the next fool.")
  // Emote.
  console.log("He claps you on the shoulder hard enough to rattle your teeth and wanders off to find another mark.")
}

rl.close()

// --- Helper functions ---
async function validateInput(prompt: string, conditions: Array<string>, retryText: string) {
  let decision = (await rl.question(prompt)).trim().toLowerCase()

  while (!conditions.includes(decision)) {
    console.log(retryText)
    decision = (await rl.question(prompt)).trim().toLowerCase()
  }
  return decision
}