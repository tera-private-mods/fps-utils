# fps-utils

  Written for tera-proxy, a free script filled with features dedicated to improve your fps, in the open world and in dungeons.
  
  ##
  
  **To support development of this mod**:
  
  Throw money [here](https://www.patreon.com/saegusa) to show support for Saegusa, the original developer of this mod.
  
  Buy me a [covfefe](https://ko-fi.com/hugedong) (I can't actually drink coffee)
  ****

### Note:
This **huge** update was 100% all done by [SerenTera](https://github.com/SerenTera) please go check their stuff out because it's way better than anything I've ever done.

# How to use:
***Note***: *If you're using [Caali's proxy](https://discord.gg/maqBmJV) fps-utils will be automatically updated and already installed so will not need to do the following.*
* put the script folder "fps-utils" into bin/node_modules
* Log the game using the proxy.
* Now you have access to fps-utils commands
* Default commands can be found in index.js

## Commands:
***Note:*** *When inputting commands directly from the **proxy channel**  the prefix `!` should be ignored.*

Command | Argument(s) | Example | Description
---|---|---|---
**!fps mode** | 1, 2, 3, off | !fps mode 1| Sets the current fps-utils optimization state. 0 disables, 1 hides particles, 2 hides skill animations, 3 hides all players. All modes toggle`fps hit on`
**!fps tc** | remove, party, on | !fps tc remove | Hides traverse cut spam.`Remove`stops the buff from being refreshed except for when it ends,`party`stops you from being spammed with party members getting the buff
**!fps hit** | me, damage, on | !fps hit on | Enables/Disables hiding of hit effects for the player.`Damage`toggles damage numbers off.`Me` turns hit effects off for **you** (disables damage numbers also unfortunately).
**!fps hide** | playername, dps, healers, tanks, ranged, class | !fps hide Spacecats, !fps hide valkyrie |hides dps, healers, tanks or ranged classes, any username or a class, class names can be found in`db.json`.
**!fps show** | playername, dps, healers, tanks, ranged, class| !fps show Memeboy | Takes the same arguments as above and instead unhides them.
**!fps list** |  | !fps list |  Prints a list of characters currently hidden by *hide* command to chat.
**!fps fireworks** | None | !fps fireworks | Enables/Disables hiding of firework entities in open world.
**!fps logo** | None | !fps logo | Enables/Disables hiding of guild logos, will require players to be reloaded (enter/exit the area)
**!fps block**| skill, skilluser, summon, summonuser ,effect| !fps block skill| Toggle to hide specific skills, NPCs or abnormality effects as defined in`db.json`(see addition help). By default several things are included in the blocklist for ease of use.
****

### Additional help:
 - `fps block`can be customized to hide specific skills, effects and NPCs. Simply edit`db.json` to include the ID of the skill, abnormality, or NPC you wish to hide. For example,`10155130`is the ID of the abnormality effect for`Ragnarok`, which may cause lag for some users, adding it to the`hiddenskill`section of`db.json`will cause it to be blocked when`fps block effect`is active.  A full list of IDs can be found [here.](https://github.com/neowutran/TeraDpsMeterData/tree/7194b31b111c48963618067d32ae7cfeab9675bb)
## Update Log:
- Reworked various commands, shortened some stuffs.
- Added specific skill, summon and effect blacklist (db.json)
- Added config saving (config.json)
- Added automatic saving feature to config.json after every command use (set AUTO_SAVE to true)
- Neaten code, combined various code fragments where possible
- Correct Last state (Fixes respawning player bugs when going back to mode 1/2)
## Work In Progress:
* Overall improvements.
* Adding aliasing for commands
* ~~Save configuration upon exit to remember last state.~~
* ~~Revive !fps 2 to it's full glory and screw this "2 IS A MEME" gaem.~~
* ~~Add support for hiding ranged dps and certain classes~~
* ~~Rewrite and command support~~

## Suggestions:
* If you have suggestions, need help, or want to comment on my shitty coding, leave an issue report or message me (Hugedong69 on pinkies discord)

## Credits: 
The following people have helped in making FPS-Utils:
- [Saegusae](https://github.com/Saegusae/) - Original developer
- [Bernkastel](https://github.com/Bernkastel-0/) - Whos code I stole and then rewrote because it was also broken
- [SerenTera](https://github.com/SerenTera) - God coder who added a lot of features and cleaned a lot of things up
- [Caali](https://github.com/hackerman-caali/) - Provided update functionality to proxy so that I can yell at less users
- [Kasea](https://github.com/Kaseaa/) - Let me steal code (I hope :eyes: )
- [Kyoukaya](https://github.com/kyoukaya) - Fixed my grabo code
- [SaltyMonkey](https://github.com/SaltyMonkey) - Yelled at me a bunch
- [Pinkie](https://github.com/pinkipi/) - Told me dumb js things that I should know but don't because I'm dumb
