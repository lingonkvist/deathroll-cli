import { createInterface } from "node:readline/promises"
import { stdin as input, stdout as output } from "node:process"
import { randomInt } from "node:crypto"
import chalk from "chalk"

const COLORS = { narration: "#AAAAAA", emote: "#FF7F3F", whisper: "#FF7FFF", system: "#FFFF00" }

type Player = { name: string; kind: "human" | "cpu" }
type ChatChannel = "narration" | "emote" | "whisper" | "system"

const cpu: Player = { name: "Bran Ironbrew", kind: "cpu" }
const rl = createInterface({ input, output })

printChat("narration", "You are with your guild in Molten Core.")
printChat("narration", "The raid leader calls a five minute break. Half the raid vanishes to restock on reagents; the other half are AFK.")
await rl.question("")

printChat("narration", "A stout dwarf with a thick braided beard stops in front of you, thumbs hooked in his belt.")
printChat("whisper", `Heya! Name's ${cpu.name}. Don't think we've been properly introduced. What do they call ye?`)

const name = await promptUntilValid(
  "My name is: ",
  (answer) => answer.length > 0,
  "Didn't catch that. Yer name?"
)

const human: Player = { name, kind: "human" }

console.log("")

printChat("emote", "Bran seizes your hand and shakes it firmly.")
printChat("whisper", `${human.name}! Aye, good to meet ye.`)
await rl.question("")

printChat("emote", "Bran digs into a pouch at his belt and produces a small, worn set of dice, rolling them between his fingers.")
printChat("whisper", `Break's near five minutes. Long enough for a proper deathroll, if ye've the stomach for it. Thousand gold, winner takes all. What d'ye say, ${human.name}?`)

const decision = await promptUntilValid(
  "Death roll the dwarf? (Y/N): ",
  (answer) => ["y", "n"].includes(answer.toLowerCase()),
  "Simple question, friend. Yes or no?"
)

console.log("")

if (decision.toLowerCase() === "y") {
  printChat("emote", "Bran grins wide.")
  printChat("whisper", "Right then. Standard rules. You start.")

  let currentMax: number = 1000
  let currentPlayer: Player = human

  while (true) {
    let score

    if (currentPlayer === human) {
      if(currentMax < 1000) await sleep(500)
      await rl.question("[Enter to roll]")
      console.log("")
      score = roll(currentMax)
      printChat("system", `${human.name} rolls ${score}`)
    } else {
      await sleep(500)
      score = roll(currentMax)
      printChat("system", `${cpu.name} rolls ${score}`)
    }

    if (score > 1) {
      currentMax = score
      currentPlayer = currentPlayer === human ? cpu : human
    } else {
      console.log(`You ${currentPlayer.name === human.name ? "lost..." : "won!"}`)
      break
    }
  }

  await rl.question("")
  console.log("")

  if (currentPlayer === human) {
    printChat("emote", "Bran chuckles and sweeps up the gold.")
    printChat("whisper", "Ah, don't look so grim. The dice are fickle. Could've gone either way.")
  } else {
    printChat("emote", "Bran stares at the dice for a long moment, then lets out a slow breath.")
    printChat("whisper", "Aye. Aye, that's fair.")
  }
} else {
  printChat("whisper", "Suit yerself. More gold for the next fool.")
  printChat("emote", "He claps you on the shoulder hard enough to rattle your teeth and wanders off to find another mark.")
}

rl.close()

// --- Helper functions ---
function printChat(channel: ChatChannel, message: string) {
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

function roll(maxRoll: number) {
  return randomInt(1, maxRoll + 1)
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}