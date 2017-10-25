# fps-utils

  Written for tera-proxy, a free script filled with features dedicated to improve your fps, in the open world and in dungeons.
  edited by me, hugedong, to add more things ;3c!!
  full rewrite coming soon!

  **To support development Saegusae, who made this mod:** 
  throw money [here](https://www.patreon.com/saegusa) where you can show your support for him!
  I don't have a patreon because I enjoy being poor, so send me memes on discord instead!

### ps.
This is a new fork and a new project for me, and is going to be rewritten/updated more in the future !fps 2 should work better, however I personally wouldn't use it in PVP or anything like that.

## How to use:
* Setup tera-proxy by meishuu (https://github.com/meishuu/tera-proxy)
* put the script folder "fps-utils" into bin/node_modules
* Log the game using the proxy.
* Now you have access to fps-utils commands

## Commands:

Command | Argument(s) | Usage | Description
---|---|---|---
**!fps** | 0, 1, 2, 3 | !fps [state] | Sets the current fps-utils oprtimization state. 0 disables, 1 hides particles, 2 hides skill animations(can be wonky), 3 hides all players.
**!fps** | fireworks | !fps fireworks | Enables/Disables hiding of firework entities in open world.
**!fps** | tc | !fps tc | Enables/Disables the traverse cut buff abnormality spam that has been lagging users. Default true (see index.js to disable)
**!fps** | damage | !fps damage | Enables/Disables hiding of damage numbers for the player.
**!fps** | hit | !fps hit | Enables/Disables hiding of hit effects.
**!fps** | hitme | !fps hitme | Enables/Disables hiding of hit effects for the player.
**!fps** | logo | !fps logo | Enables/Disables hiding of guild logos, will require players to be reloaded (enter/exit the area)
**!fps** | hide | !fps hide [args] | Takes *dps*, *healers*, *tanks* *ranged* or *any username* as a sub argument, tries to hide all respective characters of said specifics off the screen.
**!fps** | show | !fps show [args] | Again takes *healers*, *tanks* or *any username* as a sub argument, tries to show all hidden characters of said specifics on the screen.
**!fps** | list | !fps list |  Prints a list of characters currently hidden by *hide* command to chat.
**!fps** | save | !fps save |  Saves your current settings to the configuration file for the next launch.

## Update Log:
* Added support for Traverse Cut hiding
* Added support for damage number hiding and hits 
* Added support for hiding guild logos (not sure why you'd want this tbh)
* Fixed !fps 2 (again)
* Added !fps hide ranged
* Made 

## Work In Progress:
* Overall improvements.
* Save configuration upon exit to remember last state.
* ~~Revive !fps 2 to it's full glory and screw this "2 IS A MEME" gaem.~~
* Add support for hiding ~~ranged DPS~~ and certain classes
* Rewrite and command support

## Suggestions:
* If you have suggestions, need help, or want to comment on my shitty coding, leave an issue report or message me (Hugedong69 on pinkies discord)
