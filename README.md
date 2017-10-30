# fps-utils

  Written for tera-proxy, a free script filled with features dedicated to improve your fps, in the open world and in dungeons.
  edited by me, hugedong, to add more things ;3c!!
  full rewrite coming soon!

  **To support development Saegusae, who made this mod:** 
  throw money [here](https://www.patreon.com/saegusa) where you can show your support for him!
  I don't have a patreon because I enjoy being poor, so send me memes on discord instead!

### Note
Big update today, please redownload all files. See changelog and commands for more details.

## How to use:
* Setup tera-proxy by meishuu (https://github.com/meishuu/tera-proxy)
* put the script folder "fps-utils" into bin/node_modules
* Log the game using the proxy.
* Now you have access to fps-utils commands
* Default commands can be found in index.js

## Commands:

Command | Argument(s) | Example | Description
---|---|---|---
**fps mode** | 1, 2, 3, off | !fps [state] | Sets the current fps-utils oprtimization state. 0 disables, 1 hides particles, 2 hides skill animations, 3 hides all players. Also turns fps hit on.
**!fps tc** | remove, party, on | !fps tc remove | Hides traverse cut spam, by default this is turned on. *Remove* stops the buff from being refreshed except for when it ends, *party*" turns the effect off/on on other players.
**!fps hit** | me, damage, on | !fps hit damage | Enables/Disables hiding of hit effects for the player. *Damage* toggles damage numbers off. *Me* turns hit effects off for the player (disables damage numbers also unfortunately).
**!fps hide** | playername> dps, healers, tanks, ranged, class | !fps hide [args] |hides dps, healers, tanks ranged any username or a class name , class names can be found in config.js.
**fps show** | playername, dps, healers, tanks, ranged, class| !fps show [args] | Again takes *healers*, *tanks*, *any username* or *class* as a sub argument, tries to show all hidden characters of said specifics on the screen.
**!fps list** |  | !fps list |  Prints a list of characters currently hidden by *hide* command to chat.
**!fps fireworks** |  | !fps fireworks | Enables/Disables hiding of firework entities in open world.
**!fps logo** |  | !fps logo | Enables/Disables hiding of guild logos, will require players to be reloaded (enter/exit the area)

## Update Log:
* All FPS modes now activate !fps hit as there's no reason for them not to
* Fixed TC, now displays the buff without the spam, by default it refreshes every 7 hits
* Now using Command instead of chathooks, some commands have also changed
* Added class support to fps hide/show

## Work In Progress:
* Overall improvements.
* Save configuration upon exit to remember last state.
* ~~Revive !fps 2 to it's full glory and screw this "2 IS A MEME" gaem.~~
* ~~Add support for hiding ranged dps and certain classes~~
* ~~Rewrite and command support~~

## Suggestions:
* If you have suggestions, need help, or want to comment on my shitty coding, leave an issue report or message me (Hugedong69 on pinkies discord)
