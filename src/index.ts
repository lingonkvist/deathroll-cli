import { createInterface } from "node:readline/promises"
import { stdin as input, stdout as output } from "node:process"
import chalk from "chalk"

const COLORS = { narration: "#FFFF9F", emote: "#FF7F3F", whisper: "#FF7FFF" }

type Player = { name: string; kind: "human" | "cpu" }
type ChatChannel = "narration" | "emote" | "whisper"

const cpu: Player = { name: "Bran Ironbrew", kind: "cpu" }
const rl = createInterface({ input, output })

printChat("narration", "The raid leader calls a five minute break. Half the raid vanishes to restock on reagents; the other half are AFK.")

await rl.question("[Enter to continue]")
console.log("")

printChat("narration", "A stout dwarf with a thick braided beard stops in front of you, thumbs hooked in his belt.")
printChat("whisper", `Heya! Name's ${cpu.name}. Don't think we've been properly introduced. What do they call ye?`)

const name = await promptUntilValid(
  "Your name: ",
  (answer) => answer.length > 0,
  "Didn't catch that. Yer name?"
)

const human: Player = { name, kind: "human" }

console.log("")

printChat("emote", "Bran seizes your hand and shakes it firmly.")
printChat("whisper", `${human.name}! Aye, good to meet ye.`)


await rl.question("[Enter to continue]")
console.log("")

printChat("emote", "Bran digs into a pouch at his belt and produces a small, worn set of dice, rolling them between his fingers.")
printChat("whisper", `Break's near five minutes. Long enough for a proper deathroll, if ye've the stomach for it. Thousand gold, winner takes all. What d'ye say, ${human.name}?`)

const decision = await promptUntilValid(
  "Death roll? (Y/N): ",
  (answer) => ["y", "n"].includes(answer.toLowerCase()),
  "Simple question, friend. Yes or no?"
)

console.log("")

if (decision === "y") {
  printChat("emote", "Bran grins wide.")
  printChat("whisper", "Right then. High roll starts, standard rules. On three. One, two...")
} else if (decision === "n") {
  // Emote.
  printChat("emote", "Bran shrugs, unbothered, and pockets the dice.")
  // Whisper.
  printChat("whisper", "Suit yerself. More gold for the next fool.")
  // Emote.
  printChat("emote", "He claps you on the shoulder hard enough to rattle your teeth and wanders off to find another mark.")
}

rl.close()

// --- Helper functions ---
async function printChat(channel: ChatChannel, message: string) {
  console.log(chalk.hex(COLORS[channel])(message))
}

async function promptUntilValid(prompt: string, isValid: (answer: string) => boolean, retryMessage: string) {
  let answer = (await rl.question(prompt)).trim()

  while (!isValid(answer)) {
    console.log(retryMessage)
    answer = (await rl.question(prompt)).trim()
  }
  return answer
}