# Fps Utils
Written for tera-proxy, a free script filled with features dedicated to improve your fps, in the open world, in dungeons and in battlegrounds.

## How to use
* Put the script folder "fps-utils" into bin/node_modules.
* Log the game using the proxy.

## Commands
***Note:*** *To start the command, you can either start it in any channel by adding `!` prefix, or `/!`, or just going to proxy channel **proxy channel** where it doesn't need any prefix.*


|    Command(s)    |         Argument(s)        |      Example         |             Details              |
|      :---        |            :---:           |        :---:         |                ---:              |
|   `gui` \| `g`   |             N/A            |`!fps gui`            |          Opens GUI.              |
|       N/A        |             N/A            |`!fps-util`           |          Opens Help.             |
|  `0`\|`1`\|`2`\|`3` |             N/A            |`!0`\|`!1`\|`!2` \|`!3`  |          Changes Mode.           |
| `mode` \| `state` |    `0` \| `1` \| `2` \| `3`   |`!fps mode 2`         |          Changes Mode.           |
| `hide` \| `show`  |      Player\|Class\|Role     |`!fps hide mie`       |  Hides/shows Player\|Class\|Role.  |
|     `party`      |             N/A            |`!fps party`          |     Hides all but your party.    |
|      `raid`      |             N/A            |`!fps raid`           |Auto `mode 2` when raid has 18 or more ppls.|
|      `list`      |             N/A            |`!fps list`           | Prints list of hidden things.    |
|`summons` \| `sums`|      `other`\| `me`        |`!fps sums me`        |`other` hide other sums; `me` yours.|
|`skill` \| `skills`|`blacklist` \| Class \<arg3\>|`!fps skill blacklist`|Blacklist on/off; arg3 = classname|
|  `npc` \| `npcs`  |             N/A            |`!fps npc`            |Hides/shows blacklisted npcs.     |
|      `hit`       |   `me` \| `other` \| `damage`|`!fps hit me`         |Hides/shows skill results for each|
|    `firework`    |             N/A            |`!fps firework`       |Hides/shows Dragon fireworks.     |
|   `abn`\|`all`    |`blacklist` \<add\|remv num\>|`!fps abn blacklist`  |Hides/shows effects.              |
|  `proj`\|`all`    |`blacklist` \<add\|remv num\>|`!fps proj all`       |Hides/shows projectiles.          |
|   `guildlogo`    |             N/A            |`!fps guildlogo`      |Hides/shows guild logos           |
| `style`\|`costume`|             N/A            |`!fps style`          |Hides/shows style for ppl\|npc     |
|  `gui npcsearch` |           \<arg1\>         |`!fps gui npcsearch E`|Opens list of npcs matching arg1. |
|    `npczoom`     |             N/A            |`!fps npczoom`        |If enabled, prevent zoom on npcs. |
|    `dropitem`    |             N/A            |`!fps dropitem`       |Hides/shows blacklisted drops.    |


### Additional explaination for some of the commands *in-case not clear*
- Modes: Sets the current presets optimization to \<num\>; \<num\> can be:
  -  `0`, `off`: Turns off preset optimization.
  - `1`, `one`: Activates hiding all effects
  - `2`, `two`: Activates hiding players' skills, their effects, projectiles, damage numbers
  - `3`, `three`: Activates hiding all players & their skills, effects, projectiles, damage numbers.
- Raid auto state: if enabled, Automatically change mode to 2 as soon as your party gets 18 memebers or above, and auto revert back(if you didn't change it manually) to last mode when it drops below 18.
- Others Summons: if enabled, Prevent showing any summon for npcs(Thralls, Healbot, Turrets etc.) from other players.
- Own summons: if enabled, Prevent showing any summon for npcs from you.
- Style: if enabled, Removes all costumes including gear shapes on players & Removes the icons above npcs heads.
- Npc zoom-ins: if enabled, Prevent the annoying auto camera zoom-in on npcs.
- Drops: if enabled, Prevent the blacklisted drops of other players from showing, the default list has mystic motes of all levels.

## Suggestions
* If you have suggestions, need help, or want to comment on my coding, leave an issue report.

## Credits
Contributers in this module:
- [HugeDong69](https://github.com/codeagon) - Super-Cozy developer. [Donation link](https://ko-fi.com/codeagon)
- [Saegusae](https://github.com/Saegusae) - Original developer. [Donation link](https://www.patreon.com/saegusa)
- [SerenTera](https://github.com/SerenTera)
- [Kyoukaya](https://github.com/kyoukaya)
- [SaltyMonkey](https://github.com/SaltyMonkey) - [Donation link](https://www.patreon.com/SaltyMonkey)
- [Leyki](https://github.com/Leyki)

---

Special thanks to these people:
- [Pinkie Pie](https://github.com/pinkipi) Donation link: [![Donate](https://img.shields.io/badge/Donate-PayPal-ff69b4.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=5MTKARBK2CNG8&lc=US&item_name=Pinkie%27s%20TERA%20Mods&currency_code=USD)
- [Caali](https://github.com/hackerman-caali) 
- [Bernkastel](https://github.com/Bernkastel-0)
- [Kasea](https://github.com/Kaseaa)
