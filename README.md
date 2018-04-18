# FPS-UTILS

  Written for TERA-Proxy, a free script filled with features dedicated to improving your FPS.
  
  ****

  **To support development of this mod**:
  
  Throw money [here](https://www.patreon.com/saegusa) to show support for Saegusa, the original developer of this mod.
  
  Buy me a [covfefe](https://ko-fi.com/codeagon) (I can't actually drink coffee but I will eat your money)
  ****
- [FPS-UTILS](#fps-utils)
  - [Big Note](#big-note)
  - [Installation](#installation)
  - [Commands](#commands)
    - [Additional command info](#additional-command-info)
  - [Update Log](#update-log)
  - [Work In Progress:](#work-in-progress)
  - [Suggestions](#suggestions)
  - [Credits](#credits)

## Big Note
FPS-Utils has received a facelift, several features have changed, fixed or removed entirely, so please read the readme!

## Installation 
***Note***: *If you're using [Caali's proxy](https://discord.gg/maqBmJV) fps-utils will be automatically updated and already installed so will not need to do the following.*
* put the script folder "fps-utils" into bin/node_modules
* Log the game using the proxy.

## Commands
***Note:*** *When inputting commands directly from the **proxy channel**  the prefix `!` should be ignored.*

Command | Argument(s) | Example | Description
---|---|---|---
**!fps mode** | 1, 2, 3, off | !fps mode 1| Sets the current fps-utils optimization state. 0 disables, 1 hides particles, 2 hides skill animations, 3 hides all players. All modes toggle`fps hit on`
**!fps tc** | remove, party, on | !fps tc remove | Hides traverse cut spam.`Remove`stops the buff from being refreshed except for when it ends,`party`stops you from being spammed with party members getting the buff
**!fps hit** | me, damage, other | !fps hit other | Enables/Disables hiding of hit effects for the player.`Damage`toggles damage numbers off.`Me` turns hit effects off for **you** (disables damage numbers also unfortunately), other disables effects for other users (recommended).
**!fps hide** | playername, dps, healers, tanks, ranged, classname | !fps hide Spacecats, !fps hide valkyrie |hides dps, healers, tanks or ranged classes, any username or a class, class names can be found in`config.json`.
**!fps show** | playername, dps, healers, tanks, ranged, classname| !fps show Memeboy | Takes the same arguments as above and instead unhides them.
**!fps list** |  | !fps list |  Prints a list of characters/classes/roles currently hidden by *hide* command to chat.
**!fps fireworks** | None | !fps fireworks | Enables/Disables hiding of firework entities in open world.
**!fps summons** | None | !fps summons | Enables/Disables hiding of ALL summoned entities(gunner turrets, mystic thralls, etc);
**!fps skill** | blacklist, class <classname>  | !fps skill class lancer | `black` toggles the skill blacklist feature, `class <classname>`toggles displaying of ALL skills for that class
**!fps npc** | None | !fps npc | Enables/Disables hiding of ALL NPCs within the npc blacklist
**!fps effects** | all, blacklist | !fps effects blacklist | Toggles showing of either blacklisted abnormality effects or all abnormality effects (your own ones still display normally in all mode, however not in blacklist mode).
**!fps style** | None | !fps style | Enables/Disables showing of all spawned players as wearing the same outfit. Requires leaving and re-entering the area or re-logging to take effect.
**!fps proj** | None | !fps proj | Enables/Disables showing of all projectiles, eg hailstorm.

### Additional command info
*  A full list of skill IDs can be found [here.](https://github.com/pinkipi/skill-prediction/blob/master/config/skills.js)
*  A full list of NPCs and Abnormalities will be posted later.
  
## Update Log
* Rewrote the entire mod.
## Work In Progress:


## Suggestions
* If you have suggestions, need help, or want to comment on my shitty coding, leave an issue report or message me (Hugedong69 on pinkies discord)

## Credits
The following people have helped in making FPS-Utils:
- [Saegusae](https://github.com/Saegusae/) - Original developer
- [Bernkastel](https://github.com/Bernkastel-0/) - Whos code I stole and then rewrote because it was also broken
- [SerenTera](https://github.com/SerenTera) - God coder who added a lot of features and cleaned a lot of things up
- [Caali](https://github.com/hackerman-caali/) - Provided update functionality to proxy so that I can yell at less users
- [Kasea](https://github.com/Kaseaa/) - Let me steal code (I hope :eyes: )
- [Kyoukaya](https://github.com/kyoukaya) - Fixed my grabo code
- [SaltyMonkey](https://github.com/SaltyMonkey) - Yelled at me a bunch
- [Pinkie](https://github.com/pinkipi/) - Told me dumb js things that I should know but don't because I'm dumb
