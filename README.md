# Fps Utils
Written for tera-proxy, a free script filled with features dedicated to improve your fps, in the open world, in dungeons and in battlegrounds.

## How to use
* Put the script folder "fps-utils" into bin/node_modules.
* Log the game using the proxy.

## Commands
***Note:*** *To start the command, you can either start it in any channel by adding `!` prefix, or `/!`, or just going to proxy channel **proxy channel** where it doesn't need any prefix.*


|    Command(s)    |         Argument(s)        |      Example         |   Details   |
|      :---        |            :---:           |        :---:         |---:         |
|   `gui` \| `g`   |             N/A            |`!fps gui`            |Opens GUI.   |
|       N/A        |             N/A            |`!fps-util`           |Opens Help.  |
|`0`\|`1`\|`2`\|`3`|             N/A            |`!0`\|`!1`\|`!2`\|`!3`|Changes Mode.|
| `mode` \| `state`| `0` \| `1` \| `2` \| `3`   |`!fps mode 2`         |Changes Mode.|
| `hide` \| `show` |    Player\|Class\|Role     |`!fps hide mie`       | - |
|     `party`      |             N/A            |`!fps party`          | - |
|      `raid`      |             N/A            |`!fps raid`           | - |
|      `list`      |             N/A            |`!fps list`           | - |
|`summons` \|`sums`|      `other`\| `me`        |`!fps sums me`        | - |
|`skill` \|`skills`|  `blacklist`\| Class `arg` |`!fps skill blacklist`| - |
|  `npc` \|`npcs`  |      N/A \| `hide arg`     |`!fps npc`            | - |
|      `hit`       | `me` \| `other` \| `damage`|`!fps hit me`         | - |
|    `firework`    |             N/A            |`!fps firework`       | - |
|`abn`\| `abnormal`|`all`\|`blacklist arg arg2` |`!fps abn blacklist`  | - |
|       `proj`     |`all`\|`blacklist arg arg2` |`!fps proj all`       | - |
|    `guildlogo`   |             N/A            |`!fps guildlogo`      | - |
|`style`\|`costume`|             N/A            |`!fps style`          | - |
|  `gui npcsearch` |           \<arg1\>         |`!fps gui npcsearch E`| - |
|    `npczoom`     |             N/A            |`!fps npczoom`        | - |
|    `dropitem`    |       N/A \| `hide arg`    |`!fps dropitem`       | - |
| `monsterdeathani`|             N/A            |`!fps monsterdeathani`| - |
|   `screenabns`   |       N/A \| `hide arg`    |`!fps screenabns`     | - |

#### Additional explaination commands.*
- Modes: Sets the current presets optimization to \<num\>; \<num\> can be:
  - `0`, `off`: Turns off preset optimization.
  - `1`, `one`: Activates hiding all effects
  - `2`, `two`: Activates hiding players' skills, their effects, projectiles, damage numbers
  - `3`, `three`: Activates hiding all players & their skills, effects, projectiles, damage numbers.
- Hit: Sets the current hit effect to \<hxa\>; \<hxa\> can be:
  - `me`: Turns off showing own skill hit effect (and damage too... need to find workaround).
  - `other`: Turns off showing other ppls skill hit effect (and damage too... need to find workaround, this cause issue with Shinra meter not showing other ppls dps).
  - `damage`: Turns off showing damage numbers.
- Fireworks: If enabled, Prevent dragon fireworks from showing in your client. (the barrel and the flying thingy).
- Hide & Show: `hide`/`show`: if followed by Player\|Class\|Role hides/shows that Player\|Class\|Role.
- GuildLogos: If enabled, Prevent Guild logos from loading in your client.
- Party: if enabled, hides everyone but your party members.
- Monsters Death Animation: if enabled, Prevent the death animations for monsters from appearing in your client.
- Style: if enabled, Removes all costumes, titles & Removes the "shiny" icons above npcs heads, also make fixed mount shape for all other ppls mounts.
- Npc zoom-ins: if enabled, Prevent the annoying auto camera zoom-in on npcs, in others words, it blocks the ActionScripts for all npcs except teleportal ones.
- Raid auto state: if enabled, Automatically change mode to 2 as soon as your party gets 18 memebers or above, and auto revert back(if you didn't change it manually) to last mode when it drops below 18.
- List: Prints out list of hidden players, classes, and roles.
- Others Summons: if enabled, Prevent showing any summon for npcs(Thralls, Healbot, Turrets etc.) from other players.
- Own summons: if enabled, Prevent showing any summon for npcs from you.
- Skill: if enabled, Prevent showing any blacklisted skills.
  - `blacklist`: triggers on/off for hiding backlisted skills.
  - `class \<cls\>`: if \<cls\> is a valid class name, it turns on/off showing any skill for that class.
- Npc: if enabled, Prevent showing any blacklisted npc.
  - `hide \<hz\> \<ti\>`: adds or removes to the npcs blacklist. \<hz\> is the hunting zone and \<ti\> is the template id.
- Abnormal: if `all` enabled, Prevent showing other peoples effects.
  - `blacklist`: if you type `\!fps abn blacklist` it will trigger on/off blacklist hidden/shown.
  - `blacklist \<x\> \<xx\>`: \<x\> can be 'add' to add or 'remv' to remove from the blacklist, \<xx\> is the abnomral id.
- Proj: if `all` enabled, Prevent showing any projectiles.
  - `blacklist`: if you type `\!fps proj blacklist` it will trigger on/off blacklist hidden/shown.
  - `blacklist \<z\> \<zz\>`: \<z\> can be 'add' to add or 'remv' to remove from the blacklist, \<zz\> is the projectile id.
- Drops: if enabled, Prevent the blacklisted drops of other players from showing, the default list has mystic motes of all levels.
  - `hide \<v\>`: adds or removes to the drops blacklist. \<v\> is the item id.
- ScreenAbns: if enabled, Prevent the blacklisted annoying blur screen effects of your character from showing, the default list has couple of ids I picked 'em by hand, additional explaination about them can be found in `settings_migration`.
  - `hide \<b\>`: adds or removes to the ScreenAbns blacklist. \<v\> is the item id.
- GUI: It has these & much more, not need to bother with details, these are important ones you should know:
  - `gui npcsearch \<name\>`: if \<name\> exist, it will show a list of available npcs with that name, be aware, names are case-sensitive due to that huge amount of npcs.
  - `gui npc \<letters\>`: if \<letters\> exist, it will show a list of available npcs with names that starts with that letters, letters are case-sensitive, you know why.

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
