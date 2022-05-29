/**
 * Colours to help me scan chat more easily.
 * I understand these colours are biased and use the colours historically used with gender
 * so if you're using this fork, keep that in mind.
 * Feel free to fork and change the colours.
 *  
 * An ideal feature would be to add support for colour picking in the extension itself.
 * I unfortunately don't have the time to help with that.
 * 
 * This is what I use:
 * 
 *  - pink: she/her and other pronouns where "she" is ok
 *  - blue: he/him and other pronouns where "he" is ok
 *  - green: it/its (I use this for my bot)
 *  - purple: gender neutral
 */
const pink = "#EF15BF"
const purple = "#A915EF"
const green = "#00BD85"
const blue = "#1539B9"

export const pronounToColourMap: Record<string,string> = {
  "aeaer": purple,
  "any": purple,
  "eem": purple,
  "faefaer": purple,
  "hehim": blue,
  "heshe": purple,
  "hethem": blue,
  "itits": green,
  "other": purple,
  "perper": purple,
  "sheher": pink,
  "shethem": pink,
  "theythem": purple,
  "vever": purple,
  "xexem": purple,
  "ziehir": purple,
}