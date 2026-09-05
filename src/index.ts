import { createInterface } from "node:readline/promises"
import { stdin as input, stdout as output } from "node:process"

type Player = { name: string; kind: "human" | "cpu" }

const cpu: Player = { name: "Bran Ironbrew", kind: "cpu" }

const rl = createInterface({ input, output })

// Narration is gray.
console.log("The raid leader calls a five minute break. Half the raid vanishes to restock on reagents; the other half are AFK.")

// Narration is gray.
console.log("A stout dwarf with a thick braided beard stops in front of you, thumbs hooked in his belt.")

// Dialogue is pink (whisper).
console.log("Heya! Name's Bran Ironbrew. Don't think we've been properly introduced. What do they call ye?")

// Emotes are orange.
console.log("Bran extends a gauntleted hand.")

// Player input is white.
const name = (await rl.question("Your name: ")).trim()

const human: Player = { name, kind: "human" }

// Dialogue is pink (whisper).
console.log(`Great to meet ye ${human.name}`)

rl.close()