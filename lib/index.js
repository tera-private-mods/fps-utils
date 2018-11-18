"use strict"
/* global __dirname */

String.prototype.clr = function (HexClr) { return `<font color='${HexClr}'>${this}</font>` }
const Gui = require('Gui')
let BronzeClr = '#BC8F8F',
	SilverClr = '#9A9A9A',
	GoldClr = '#DAA520',
	PinkClr = '#FFB7C5',
	HPinkClr = '#FF69B4',
	CPinkClr = '#ED5D92',
	RedClr = '#FE6F5E',
	GreenClr = '#4DE19C',
	LPurpleClr = '#E0B0FF',
	PurpleClr = '#9966CC',
	DPurpleClr = '#957DAD',
	LBlueClr = '#4DDCE1',
	BlueClr = '#436EEE',
	DBlueClr = '#00575e',
	HBlueClr = '#08B3E5',
	GrayClr = '#778899',
	YellowClr = '#DCE14D',
	OrangeClr = '#FFBE5E';

module.exports = function FpsUtils(mod) {
	var notcaaliproxy = mod.proxyAuthor !== 'caali' || mod.base.proxyAuthor !== 'caali';

	const NpcData = require(`./data/npcData.json`),
		SkillData = require(`./data/skillString.json`)

	let MyGameId,
		MyName,
		MyPlayerId,
		ChangeOnCd,
		laststate,
		lastrange,
		TmpData = [],
		partyMembers = [],
		hiddenNpcs = {},
		hiddenUsers = {},
		spawnedPlayers = {},
		alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
		gui = new Gui(mod);

	if (notcaaliproxy) {
		const options = require('../module').options
		if (options) {
			const settingsVersion = options.settingsVersion
			if (settingsVersion) {
				mod.settings = require('./setting_migration')(mod.settings._version === settingsVersion ? settingsVersion : undefined, settingsVersion, mod.settings)
			}
		}
	}

	// ~~~ * Gui Handler * ~~~ \\

	function GuiHandler(page, arg) {
		switch (page) {
			case 'searchnpc':
			case 'npcsearch':
				TmpData = []
				TmpData.push({ text: `<font color="${PurpleClr}" size="+24"><p align="right">MAIN MENU</p></font><br><br>`, command: `fps gui` })
				JsonSearch(arg, NpcData, `search`, `<font color="${LBlueClr}" size="+16">Search results for "${arg}"</font>.`)
				break
			case 'npc':
				TmpData = []
				TmpData.push({ text: `<font color="${PurpleClr}" size="+24"><p align="right">MAIN MENU</p></font><br><br>`, command: `fps gui` })
				JsonSearch(arg, NpcData, `starts`, `<font color="${LBlueClr}" size="+16">Search results for "${arg}"</font>.`)
				break
			case 'npclist':
				TmpData = []
				TmpData.push(
					{ text: `<font color="${PurpleClr}" size="+24"><p align="right">MAIN MENU</p></font><br><br>`, command: `fps gui` },
					{ text: `<font color="${YellowClr}" size="+20"><p align="right">[Main NPC page]</p></font><br>`, command: `fps gui npcMain` },
					{ text: `<font color="${LBlueClr}" size="+19">Click a NPC ID to remove it from the blacklist:</font><br>` }
				)
				for (let i = 0; i < mod.settings.NpcsBlacklist.length; i++) {
					TmpData.push({ text: `<font color="${BronzeClr}" size="+17">${mod.settings.NpcsBlacklist[i].zone}, ${mod.settings.NpcsBlacklist[i].templateId}</font><br>`, command: `fps npc hide ${mod.settings.NpcsBlacklist[i].zone} ${mod.settings.NpcsBlacklist[i].templateId};fps gui npclist` })
				}
				gui.parse(TmpData, `<font color="${LPurpleClr}">[FPS] Options - NPCs </font><font color="${GreenClr}">(Blacklist)</font>`)
				TmpData = []
				break
			case 'npcMain':
				TmpData = []
				TmpData.push(
					{ text: `<font color="${PurpleClr}" size="+24"><p align="right">MAIN MENU</p></font><br><br>`, command: `fps gui` },
					{ text: `<font color="${YellowClr}" size="+20"><p align="right">[Blacklisted NPCs list]</p></font><br>`, command: `fps gui npclist` },
					{ text: `<font color="${mod.settings.HideBlacklistedNpcs ? GreenClr : RedClr}" size="+20"><p align="right">[Blacklisted NPCs are ${mod.settings.HideBlacklistedNpcs ? 'Blocked' : 'Not-Blocked'}]</p></font><br><br>`, command: `fps npc;fps gui npcMain` },
					{ text: `<font color="${LBlueClr}" size="+19">Click a letter to view all NPCs starting with that letter:<br><br>` }
				)
				for (var i = 0; i < alphabet.length; i++) {
					TmpData.push(
						{ text: `<font color="${BronzeClr}" size="+18">${alphabet[i]}</font>`, command: `fps gui npc ${alphabet[i]}` },
						{ text: `&nbsp;` }
					)
				}
				TmpData.push({ text: `<br><br><font color="${PinkClr}" size="+16">(Command </font><font color="${HPinkClr}" size="+16">"fps gui searchnpc &#60;name&#62;"</font><font color="${PinkClr}" size="+16"> to search for a specific NPC's name, Case sensitive)</font>` })
				gui.parse(TmpData, `<font color="${LPurpleClr}">[FPS] Options - NPCs </font><font color="${YellowClr}">(Main)</font>`)
				TmpData = []
				break
			case "show":
				TmpData = []
				TmpData.push(
					{ text: `<font color="${PurpleClr}" size="+24"><p align="right">MAIN MENU</p></font><br>`, command: `fps gui` },
					{ text: `<font color="${PinkClr}" size="+16">(Command </font><font color="${HPinkClr}" size="+16">"fps hide &#60;name&#62;"</font><font color="${PinkClr}" size="+16"> to hide someone that does not appear here)</font><br><br>` },
					{ text: `<font color="${LBlueClr}" size="+19">Click to hide & add to blacklist.</font><br>` }
				)
				for (let i in spawnedPlayers) {
					TmpData.push(
						{ text: `<font color="${mod.settings.PlayersBlacklist.includes(spawnedPlayers[i].name) ? GreenClr : RedClr}" size="+17">${spawnedPlayers[i].name}</font>`, command: mod.settings.PlayersBlacklist.includes(spawnedPlayers[i].name) ? `fps show ${spawnedPlayers[i].name};fps gui show` : `fps hide  ${spawnedPlayers[i].name};fps gui show` },
						{ text: `${JustifySpaces(spawnedPlayers[i].name.length)}<font color="${mod.settings.PlayersBlacklist.includes(spawnedPlayers[i].name) ? GreenClr : RedClr}" size="+17">${mod.settings.PlayersBlacklist.includes(spawnedPlayers[i].name) ? 'is Hidden' : 'is Shown'}.</font><br>` }
					)
				}
				gui.parse(TmpData, `<font color="${LPurpleClr}">[FPS] Options - Players </font><font color="${RedClr}">(Shown)</font>`)
				TmpData = []
				break
			case "hide":
				TmpData = []
				TmpData.push(
					{ text: `<font color="${PurpleClr}" size="+24"><p align="right">MAIN MENU</p></font><br><br>`, command: `fps gui` },
					{ text: `<font color="${LBlueClr}" size="+19">Click to show & remove from blacklist.</font><br>` }
				)
				mod.settings.PlayersBlacklist.forEach((mem) => { TmpData.push({ text: `<font color="${BronzeClr}" size="+17">${mem}</font><br>`, command: `fps show ${mem};fps gui hide` }) })
				gui.parse(TmpData, `<font color="${LPurpleClr}">[FPS] Options - Players </font><font color="${GreenClr}">(Hidden)</font>`)
				TmpData = []
				break
			case "skills":
				gui.parse([
					{ text: `<font color="${PurpleClr}" size="+24"><p align="right">MAIN MENU</p></font><br>`, command: `fps gui` },
					{ text: `<font color="${mod.settings.HideBlacklistedSkills ? GreenClr : RedClr}" size="+22"><p align="right">[Blacklisted skills are ${mod.settings.HideBlacklistedSkills ? 'Blocked' : 'Not-Blocked'}]</p></font><br><br>`, command: `fps skill blacklist;fps gui skills` },
					{ text: `<font color="${YellowClr}" size="+20">Tankers:</font>&#09;&#09;` },
					{ text: `<font color="${LBlueClr}" size="+18">&#40;Lancer&#41;</font>`, command: `fps gui class lancer` },
					{ text: `&nbsp;&nbsp;` },
					{ text: `<font color="${LBlueClr}" size="+18">&#40;Brawler&#41;</font><br><br>`, command: `fps gui class brawler` },
					{ text: `<font color="${YellowClr}" size="+20">Healers:</font>&#09;&#09;` },
					{ text: `<font color="${LBlueClr}" size="+18">&#40;Priest&#41;</font>`, command: `fps gui class priest` },
					{ text: `&nbsp;&nbsp;` },
					{ text: `<font color="${LBlueClr}" size="+18">&#40;Mystic&#41;</font><br><br>`, command: `fps gui class mystic` },
					{ text: `<font color="${YellowClr}" size="+20">Dpsers(melee):</font>&#09;` },
					{ text: `<font color="${LBlueClr}" size="+18">&#40;Warrior&#41;</font>`, command: `fps gui class warrior` },
					{ text: `&nbsp;&nbsp;` },
					{ text: `<font color="${LBlueClr}" size="+18">&#40;Slayer&#41;</font>`, command: `fps gui class slayer` },
					{ text: `&nbsp;&nbsp;` },
					{ text: `<font color="${LBlueClr}" size="+18">&#40;Berserker&#41;</font>`, command: `fps gui class berserker` },
					{ text: `&nbsp;&nbsp;` },
					{ text: `<font color="${LBlueClr}" size="+18">&#40;Ninja&#41;</font>`, command: `fps gui class ninja` },
					{ text: `&nbsp;&nbsp;` },
					{ text: `<font color="${LBlueClr}" size="+18">&#40;Valkyrie&#41;</font>`, command: `fps gui class valkyrie` },
					{ text: `&nbsp;&nbsp;` },
					{ text: `<font color="${LBlueClr}" size="+18">&#40;Reaper&#41;</font><br><br>`, command: `fps gui class reaper` },
					{ text: `<font color="${YellowClr}" size="+20">Dpsers(ranged):</font>&#09;` },
					{ text: `<font color="${LBlueClr}" size="+18">&#40;Sorcerer&#41;</font>`, command: `fps gui class sorcerer` },
					{ text: `&nbsp;&nbsp;` },
					{ text: `<font color="${LBlueClr}" size="+18">&#40;Archer&#41;</font>`, command: `fps gui class archer` },
					{ text: `&nbsp;&nbsp;` },
					{ text: `<font color="${LBlueClr}" size="+18">&#40;Gunner&#41;</font>`, command: `fps gui class gunner` }
				], `<font color="${LPurpleClr}">[FPS] Options - Skills </font><font color="${YellowClr}">(Choose class)</font>`)
				break
			case "class":
				gui.parse(SkillsList(arg), `<font color="${LPurpleClr}">[FPS] Options - Skill list for "${arg}"</font>`)
				break
			case "role":
				gui.parse([
					{ text: `<font color="${PurpleClr}" size="+24"><p align="right">MAIN MENU</p></font><br><br>`, command: `fps gui` },
					{ text: `<font color="${YellowClr}" size="+20">By Roles:</font>&#09;` },
					{ text: `<font color="${mod.settings.RolesBlacklist.includes('tank') ? GreenClr : RedClr}" size="+18">[Tankers]</font>`, command: `fps ${mod.settings.RolesBlacklist.includes('tank') ? `show` : `hide`} tank;fps gui role` },
					{ text: `&nbsp;&nbsp;` },
					{ text: `<font color="${mod.settings.RolesBlacklist.includes('healer') ? GreenClr : RedClr}" size="+18">[Healers]</font>`, command: `fps ${mod.settings.RolesBlacklist.includes('healer') ? `show` : `hide`} healer;fps gui role` },
					{ text: `&nbsp;&nbsp;` },
					{ text: `<font color="${mod.settings.RolesBlacklist.includes('dps') ? GreenClr : RedClr}" size="+18" >[Dps-All]</font>`, command: `fps ${mod.settings.RolesBlacklist.includes('dps') ? `show` : `hide`} dps;fps gui role` },
					{ text: `&nbsp;&nbsp;` },
					{ text: `<font color="${mod.settings.RolesBlacklist.includes('ranged') ? GreenClr : RedClr}" size="+18">[Dps-Ranged]</font><br><br><br><br>`, command: `fps ${mod.settings.RolesBlacklist.includes('ranged') ? `show` : `hide`} ranged;fps gui role` },
					{ text: `<font color="${DBlueClr}" size="+22">By Classes</font><br><br>` },
					{ text: `<font color="${YellowClr}" size="+20">Tankers:</font>&#09;&#09;` },
					{ text: `<font color="${mod.settings.ClassesBlacklist.includes('lancer') ? GreenClr : RedClr}" size="+18">[Lancer]</font>`, command: `fps ${mod.settings.ClassesBlacklist.includes('lancer') ? `show` : `hide`} lancer;fps gui role` },
					{ text: `&nbsp;&nbsp;` },
					{ text: `<font color="${mod.settings.ClassesBlacklist.includes('brawler') ? GreenClr : RedClr}" size="+18">[Brawler]</font><br><br>`, command: `fps ${mod.settings.ClassesBlacklist.includes('brawler') ? `show` : `hide`} brawler;fps gui role` },
					{ text: `<font color="${YellowClr}" size="+20">Healers:</font>&#09;&#09;` },
					{ text: `<font color="${mod.settings.ClassesBlacklist.includes('priest') ? GreenClr : RedClr}" size="+18">[Priest]</font>`, command: `fps ${mod.settings.ClassesBlacklist.includes('priest') ? `show` : `hide`} priest;fps gui role` },
					{ text: `&nbsp;&nbsp;` },
					{ text: `<font color="${mod.settings.ClassesBlacklist.includes('mystic') ? GreenClr : RedClr}" size="+18">[Mystic]</font><br><br>`, command: `fps ${mod.settings.ClassesBlacklist.includes('mystic') ? `show` : `hide`} mystic;fps gui role` },
					{ text: `<font color="${YellowClr}" size="+20">Dpsers(melee):</font>&#09;` },
					{ text: `<font color="${mod.settings.ClassesBlacklist.includes('warrior') ? GreenClr : RedClr}" size="+18">[Warrior]</font>`, command: `fps ${mod.settings.ClassesBlacklist.includes('warrior') ? `show` : `hide`} warrior;fps gui role` },
					{ text: `&nbsp;&nbsp;` },
					{ text: `<font color="${mod.settings.ClassesBlacklist.includes('slayer') ? GreenClr : RedClr}" size="+18">[Slayer]</font>`, command: `fps ${mod.settings.ClassesBlacklist.includes('slayer') ? `show` : `hide`} slayer;fps gui role` },
					{ text: `&nbsp;&nbsp;` },
					{ text: `<font color="${mod.settings.ClassesBlacklist.includes('berserker') ? GreenClr : RedClr}" size="+18">[Berserker]</font>`, command: `fps ${mod.settings.ClassesBlacklist.includes('berserker') ? `show` : `hide`} berserker;fps gui role` },
					{ text: `&nbsp;&nbsp;` },
					{ text: `<font color="${mod.settings.ClassesBlacklist.includes('ninja') ? GreenClr : RedClr}" size="+18">[Ninja]</font>`, command: `fps ${mod.settings.ClassesBlacklist.includes('ninja') ? `show` : `hide`} ninja;fps gui role` },
					{ text: `&nbsp;&nbsp;` },
					{ text: `<font color="${mod.settings.ClassesBlacklist.includes('valkyrie') ? GreenClr : RedClr}" size="+18">[Valkyrie]</font>`, command: `fps ${mod.settings.ClassesBlacklist.includes('valkyrie') ? `show` : `hide`} valkyrie;fps gui role` },
					{ text: `&nbsp;&nbsp;` },
					{ text: `<font color="${mod.settings.ClassesBlacklist.includes('reaper') ? GreenClr : RedClr}" size="+18">[Reaper]</font><br><br>`, command: `fps ${mod.settings.ClassesBlacklist.includes('reaper') ? `show` : `hide`} reaper;fps gui role` },
					{ text: `<font color="${YellowClr}" size="+20">Dpsers(ranged):</font>&#09;` },
					{ text: `<font color="${mod.settings.ClassesBlacklist.includes('sorcerer') ? GreenClr : RedClr}" size="+18">[Sorcerer]</font>`, command: `fps ${mod.settings.ClassesBlacklist.includes('sorcerer') ? `show` : `hide`} sorcerer;fps gui role` },
					{ text: `&nbsp;&nbsp;` },
					{ text: `<font color="${mod.settings.ClassesBlacklist.includes('archer') ? GreenClr : RedClr}" size="+18">[Archer]</font>`, command: `fps ${mod.settings.ClassesBlacklist.includes('archer') ? `show` : `hide`} archer;fps gui role` },
					{ text: `&nbsp;&nbsp;` },
					{ text: `<font color="${mod.settings.ClassesBlacklist.includes('gunner') ? GreenClr : RedClr}" size="+18">[Gunner]</font>`, command: `fps ${mod.settings.ClassesBlacklist.includes('gunner') ? `show` : `hide`} gunner;fps gui role` }
				], `<font color="${LPurpleClr}">[FPS] Options - Roles/Classes</font>`)
				break
			case "abn":
				TmpData = []
				TmpData.push(
					{ text: `<font color="${PurpleClr}" size="+24"><p align="right">MAIN MENU</p></font><br>`, command: `fps gui` },
					{ text: `<font color="${mod.settings.AbnDebug ? GreenClr : RedClr}" size="+19"><p align="right">Debug</p></font><br>`, command: `fps abn log;fps gui abn` },
					{ text: `<font color="${mod.settings.HideAllAbnormalities ? GreenClr : RedClr}" size="+22">[All Abnormalities are ${mod.settings.HideAllAbnormalities ? 'Hidden' : 'Shown'}]</font><br>`, command: `fps abn all;fps gui abn` },
					{ text: `<font color="${mod.settings.HideBlacklistedAbnormalities ? GreenClr : RedClr}" size="+22">[Blacklisted Abnormalities are ${mod.settings.HideBlacklistedAbnormalities ? 'Hidden' : 'Shown'}]</font><br><br>`, command: `fps abn blacklist;fps gui abn` },
					{ text: `<font color="${LPurpleClr}" size="+19">Blacklist: </font><font color="${PinkClr}" size="17+">Click to remove from the blacklist.</font><br>` }
				)
				mod.settings.AbnormalitiesBlacklist.forEach((abnmem) => { TmpData.push({ text: `<font color="${BronzeClr}" size="+16">${abnmem}<br></font>`, command: `fps abn blacklist remv ${abnmem};fps gui abn` }) })
				gui.parse(TmpData, `<font color="${LPurpleClr}">[FPS] Options - Abnormalities</font>`)
				TmpData = []
				break
			case "proj":
				TmpData = []
				TmpData.push(
					{ text: `<font color="${PurpleClr}" size="+24"><p align="right">MAIN MENU</p></font><br>`, command: `fps gui` },
					{ text: `<font color="${mod.settings.ProjDebug ? GreenClr : RedClr}" size="+19"><p align="right">Debug</p></font><br>`, command: `fps proj log;fps gui proj` },
					{ text: `<font color="${mod.settings.HideAllProjectiles ? GreenClr : RedClr}" size="+22">[All Projectiles are ${mod.settings.HideAllProjectiles ? 'Hidden' : 'Shown'}]</font><br>`, command: `fps proj all;fps gui proj` },
					{ text: `<font color="${mod.settings.HideBlacklistedProjectiles ? GreenClr : RedClr}" size="+22">[Blacklisted Projectiles are ${mod.settings.HideBlacklistedProjectiles ? 'Hidden' : 'Shown'}] </font><br><br>`, command: `fps proj blacklist;fps gui proj` },
					{ text: `<font color="${LPurpleClr}" size="+19">Blacklist: </font><font color="${PinkClr}" size="17+">Click to remove from the blacklist.</font><br>` }
				)
				mod.settings.ProjectilesBlacklist.forEach((projmem) => { TmpData.push({ text: `<font color="${BronzeClr}" size="+16">${projmem}<br></font>`, command: `fps proj blacklist remv ${projmem};fps gui proj` }) })
				gui.parse(TmpData, `<font color="${LPurpleClr}">[FPS] Options - Projectiles</font>`)
				TmpData = []
				break
			case "help":				//TO_DO - Better formating, it looks messy :sad:
				gui.parse([
					{ text: `<font color="${PurpleClr}" size="+24"><p align="right">MAIN MENU</p></font><br>`, command: `fps gui` },
					{ text: `<font color="${PinkClr}" size="+17"><p align="right">Note: This page not yet completely developed, if you can't understand anything, just go check the README, Thank you.</p></font><br>` },
					{ text: `<font color="${HBlueClr}" size="16" style="font-family:Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New, monospace;">` },
					{ text: `|    Command(s)    |         Argument(s)        |      Example         |             Details              |<br>` },
					{ text: `|   'gui' | 'g'    |             N/A            |'!fps gui'            |          Opens GUI.              |<br>` },
					{ text: `|       N/A        |             N/A            |'!fps-util'           |          Opens Help.             |<br>` },
					{ text: `|  '0'|'1'|'2'|'3' |             N/A            |'!0'|'!1'|'!2' |'!3'  |          Changes Mode.           |<br>` },
					{ text: `| 'mode' | 'state' |    '0' | '1' | '2' | '3'   |'!fps mode 2'         |          Changes Mode.           |<br>` },
					{ text: `| 'hide' | 'show'  |      Player|Class|Role     |'!fps hide mie'       |  Hides/shows Player|Class|Role.  |<br>` },
					{ text: `|     'party'      |             N/A            |'!fps party'          |     Hides all but your party.    |<br>` },
					{ text: `|      'raid'      |             N/A            |'!fps raid'           |Auto 'mode 2' when party 18+ ppls.|<br>` },
					{ text: `|      'list'      |             N/A            |'!fps list'           | Prints list of hidden things.    |<br>` },
					{ text: `|'summons' | 'sums'|        'other' | 'me'      |'!fps sums me'        |oth hide others sums; 'me' yours. |<br>` },
					{ text: `|'skill' | 'skills'|'blacklist' | Class \<arg3\>  |'!fps skill blacklist'|Blacklist on/off; arg3 = classname|<br>` },
					{ text: `|  'npc' | 'npcs'  |             N/A            |'!fps npc'            |Hides/shows blacklisted npcs.     |<br>` },
					{ text: `|      'hit'       |   'me' | 'other' | 'damage'|'!fps hit me'         |Hides/shows skill results for each|<br>` },
					{ text: `|    'firework'    |             N/A            |'!fps firework'       |Hides/shows Dragon fireworks.     |<br>` },
					{ text: `|   'abn'|'all'    |'blacklist' \<add|remv num\>  |'!fps abn blacklist'  |Hides/shows effects.              |<br>` },
					{ text: `|  'proj'|'all'    |'blacklist' \<add|remv num\>  |'!fps proj all'       |Hides/shows projectiles.          |<br>` },
					{ text: `|   'guildlogo'    |             N/A            |'!fps guildlogo'      |Hides/shows guild logos           |<br>` },
					{ text: `| 'style'|'costume'|             N/A            |'!fps style'          |Hides/shows style for ppl|npc     |<br>` },
					{ text: `|  'gui npcsearch' |           \<arg1\>           |'!fps gui npcsearch E'|Opens list of npcs matching arg1. |<br>` },
					{ text: `|    'npczoom'     |             N/A            |'!fps npczoom'        |If enabled, prevent zoom on npcs. |<br>` },
					{ text: `|    'dropitem'    |             N/A            |'!fps dropitem'       |Hides/shows blacklisted drops.    |<br>` },
					{ text: `</font>` }
				], `<font color="${LPurpleClr}">[FPS] HELP </font>`)
				break;
			default:
				gui.parse([
					{ text: `<font color="${PurpleClr}" size="+24"><p align="right">REFRESH</p></font><br><br>`, command: `fps gui` },
					{ text: `<font color="${YellowClr}" size="+21">Modes:</font>&#09;&#09;` },
					{ text: `<font color="${mod.settings.Mode === 0 ? GreenClr : RedClr}" size="+18">[Mode 0]</font>`, command: `fps mode 0;fps gui` },
					{ text: `&nbsp;&nbsp;&nbsp;` },
					{ text: `<font color="${mod.settings.Mode === 1 ? GreenClr : RedClr}" size="+18">[Mode 1]</font>`, command: `fps mode 1;fps gui` },
					{ text: `&nbsp;&nbsp;&nbsp;` },
					{ text: `<font color="${mod.settings.Mode === 2 ? GreenClr : RedClr}" size="+18">[Mode 2]</font>`, command: `fps mode 2;fps gui` },
					{ text: `&nbsp;&nbsp;&nbsp;` },
					{ text: `<font color="${mod.settings.Mode === 3 ? GreenClr : RedClr}" size="+18">[Mode 3]</font><br><br>`, command: `fps mode 3;fps gui` },
					{ text: `<font color="${YellowClr}" size="+21">Hit:</font>&#09;&#09;&#09;` },
					{ text: `<font color="${mod.settings.Hit_Me ? GreenClr : RedClr}" size="+18">[Own effect]</font>`, command: `fps hit me;fps gui` },
					{ text: `&nbsp;&nbsp;` },
					{ text: `<font color="${mod.settings.Hit_Other ? GreenClr : RedClr}" size="+18">[Players effect]</font>`, command: `fps hit other;fps gui` },
					{ text: `&nbsp;&nbsp;` },
					{ text: `<font color="${mod.settings.Hit_Damage ? GreenClr : RedClr}" size="+18">[Damage numbers]</font><br><br>`, command: `fps hit damage;fps gui` },
					{ text: `<font color="${YellowClr}" size="+21">Hide:</font>&#09;&#09;` },
					{ text: `<font color="${mod.settings.HideMySummons ? GreenClr : RedClr}" size="+17">[Own summons]</font>`, command: `fps summons me;fps gui` },
					{ text: `&nbsp;&nbsp;` },
					{ text: `<font color="${mod.settings.HideOthersSummons ? GreenClr : RedClr}" size="+17">[Players summons]</font>`, command: `fps summons;fps gui` },
					{ text: `&nbsp;&nbsp;` },
					{ text: `<font color="${mod.settings.HideFireworks ? GreenClr : RedClr}" size="+17">[Fireworks]</font><br>`, command: `fps fireworks;fps gui` },
					{ text: `&#09;&#09;&#09;` },
					{ text: `<font color="${mod.settings.OnlyParty ? GreenClr : RedClr}" size="+17">[Everyone but party]</font>`, command: `fps party;fps gui` },
					{ text: `&nbsp;&nbsp;` },
					{ text: `<font color="${mod.settings.Hideguildlogos ? GreenClr : RedClr}" size="+17">[Guild Logos]</font>`, command: `fps guildlogo;fps gui` },
					{ text: `&nbsp;&nbsp;` },
					{ text: `<font color="${mod.settings.ShowStyle ? GreenClr : RedClr}" size="+17">[Style]</font>`, command: `fps style;fps gui` },
					{ text: `&nbsp;&nbsp;` },
					{ text: `<font color="${mod.settings.HideBlacklistedDrop ? GreenClr : RedClr}" size="+17">[Drops]</font><br><br>`, command: `fps dropitem;fps gui` },
					{ text: `<font color="${YellowClr}" size="+21">Players:</font>&#09;` },
					{ text: `<font color="${LBlueClr}" size="+18">[Hidden list]</font>`, command: `fps gui hide` },
					{ text: `&nbsp;&nbsp;&nbsp;&nbsp;` },
					{ text: `<font color="${LBlueClr}" size="+18">[Shown list]</font><br><br>`, command: `fps gui show` },
					{ text: `<font color="${YellowClr}" size="+21">ETC:</font>&#09;&#09;` },
					{ text: `<font color="${LBlueClr}" size="+17">[Classes/Roles]</font>`, command: `fps gui role` },
					{ text: `&nbsp;&nbsp;&nbsp;` },
					{ text: `<font color="${LBlueClr}" size="+17">[Skills]</font>`, command: `fps gui skills` },
					{ text: `&nbsp;&nbsp;&nbsp;` },
					{ text: `<font color="${LBlueClr}" size="+17">[NPCs]</font>`, command: `fps gui npcMain` },
					{ text: `&nbsp;&nbsp;` },
					{ text: `<font color="${LBlueClr}" size="+17">[Abnormals]</font><br>`, command: `fps gui abn` },
					{ text: `&#09;&#09;&#09;` },
					{ text: `<font color="${LBlueClr}" size="+17">[Projectiles]</font>`, command: `fps gui proj` },
					{ text: `&nbsp;&nbsp;` },
					{ text: `<font color="${mod.settings.RaidAutoChange ? GreenClr : RedClr}" size="+17">[Raid auto state]</font>`, command: `fps raid;fps gui` },
					{ text: `&nbsp;&nbsp;` },
					{ text: `<font color="${mod.settings.NoZoomingToNpc ? GreenClr : RedClr}" size="+17">[Npc zoom-ins]</font>`, command: `fps npczoom;fps gui` },
					{ text: `<br><br><br><br><br><br>` },
					{ text: `<font color="${BlueClr}" size="+22">Quick Links:</font><br>` },
					{ text: `<font color="${DBlueClr}" size="+21">UI:</font>&#09;&#09;` },
					{ text: `<font color="${PurpleClr}" size="+17">[Mail]</font>`, command: `fps quicklink parcel` },
					{ text: `&nbsp;&nbsp;&nbsp;` },
					{ text: `<font color="${PurpleClr}" size="+17">[Broker]</font>`, command: `fps quicklink broker` },
					{ text: `&nbsp;&nbsp;&nbsp;` },
					{ text: `<font color="${PurpleClr}" size="+17">[Talent]</font>`, command: `fps quicklink talents` },
					{ text: `&nbsp;&nbsp;&nbsp;` },
					{ text: `<font color="${PurpleClr}" size="+17">[Dress]</font>`, command: `fps quicklink dressingroom` },
					{ text: `&nbsp;&nbsp;&nbsp;` },
					{ text: `<font color="${PurpleClr}" size="+17">[Hat Style]</font>`, command: `fps quicklink hatrestyle` },
					{ text: `&nbsp;&nbsp;&nbsp;` },
					{ text: `<font color="${PurpleClr}" size="+17">[Search-Engine]</font><br>`, command: `fps quicklink searchengine` },
					{ text: `<font color="${DBlueClr}" size="+21">Group:</font>&#09;` },
					{ text: `<font color="${OrangeClr}" size="+17">[Reset]</font>`, command: `fps quicklink reset` },
					{ text: `&nbsp;&nbsp;&nbsp;&nbsp;` },
					{ text: `<font color="${CPinkClr}" size="+17">[Leave]</font>`, command: `fps quicklink drop` },
					{ text: `&nbsp;&nbsp;&nbsp;` },
					{ text: `<font color="${CPinkClr}" size="+17">[Disband]</font><br>`, command: `fps quicklink disband` },
					{ text: `<font color="${DBlueClr}" size="+21">Extra:</font>&#09;` },
					{ text: `<font color="${CPinkClr}" size="+17">[Lobby]</font>`, command: `fps quicklink lobby` },
					{ text: `&nbsp;&nbsp;&nbsp;` },
					{ text: `<font color="${CPinkClr}" size="+17">[Exit]</font><br>`, command: `fps quicklink exit` }

				], `<font color="${LPurpleClr}">[FPS] Options</font> | <font color="${RedClr}" size="+16">Red</font><font color="${LPurpleClr}" size="+16"> = disabled, <font color="${GreenClr}" size="+16">Green</font><font color="${LPurpleClr}" size="+16"> = enabled</font>`)
		}
	}

	// ~~~ * Gui Functions * ~~~ \\

	function JustifySpaces(ToJustify) {
		if (ToJustify <= 3) return '&#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09;';
		else if (ToJustify <= 7) return '&#09;&#09;&#09;&#09;&#09;&#09;&#09;';
		else if (ToJustify <= 12) return '&#09;&#09;&#09;&#09;&#09;&#09;';
		else if (ToJustify <= 15) return '&#09;&#09;&#09;&#09;&#09;';
		else return '&#09;&#09;&#09;&#09;';
	}

	function SkillsList(value) {
		let keys = [],
			skilldata = [],
			skillIds = []
		skilldata.push(
			{ text: `<font color="${PurpleClr}" size="+24"><p align="right">MAIN MENU</p></font><br>`, command: `fps gui` },
			{ text: `<font color="${mod.settings.HideBlacklistedSkills ? GreenClr : RedClr}" size="+22"><p align="right">[Blacklisted skills are ${mod.settings.HideBlacklistedSkills ? 'Blocked' : 'Not-Blocked'}]</p></font><br>`, command: `fps skill blacklist;fps gui skills` },
			{ text: `<font color="${LBlueClr}" size="+19">Click skill to blacklist it.</font><br>` }
		)
		for (let key in SkillData[value]) {
			keys.push(key);
		}
		skillIds.push(Object.values(SkillData[value]))
		for (var i = 0; i < keys.length; i++) {
			skilldata.push({ command: `fps skill class ${value} ${skillIds[0][i]};fps gui class ${value}`, text: `<font color="${mod.settings.ClassesData[ClassNameFromID(value)].CD_SkillsBlacklist.includes(skillIds[0][i].toString()) ? GreenClr : RedClr}" size="+17">[${keys[i]}]</font><br>` })
		}
		return skilldata
	}

	function JsonSearch(nameKey, array, arg, title) {
		for (let i = 0; i < array.length; i++) {
			if (array[i].Name.startsWith(nameKey) && arg == `starts`) {
				TmpData.push({
					command: `fps npc hide ${array[i].HuntingZoneId} ${array[i].TemplateId};fps gui npc ${nameKey}`, text: `<font color="${mod.settings.NpcsBlacklist.some(() => {
						return mod.settings.NpcsBlacklist.some((arrVal) => {
							if (array[i].HuntingZoneId == arrVal.zone && array[i].TemplateId == arrVal.templateId) return true
							return false
						})
					}) ? GreenClr : RedClr}" size="+17">${array[i].Name}</font><br>`
				})
			}
			if (array[i].Name.includes(nameKey) && arg == `search`) {
				TmpData.push({ command: `fps npc hide ${array[i].HuntingZoneId} ${array[i].TemplateId};fps gui npc ${nameKey}`, text: `<font color="${BronzeClr}" size="+17">${array[i].Name}</font><br>` })
			}
			if (!isNaN(arg)) {
				if (array[i].nameKey == arg) {
					return true
				}
			}
		}
		gui.parse(TmpData, `<font color="${LPurpleClr}">[FPS] Options - NPCs</font> | ` + title)
		TmpData = []
	}

	function ClassNameFromID(name) {
		for (let Class_data of Object.keys(mod.settings.ClassesData)) {
			if (mod.settings.ClassesData[Class_data].name == name) {
				return Class_data
			}
		}
	}

	// ~~~ * Command Functions * ~~~ \\

	function Msg(msg) {
		mod.command.message(`[FPS] ${msg}`.clr(LPurpleClr))
	}

	function HideSpecificPlayer(name) {
		for (let i in spawnedPlayers) {
			if (spawnedPlayers[i].name.toString().toLowerCase() === name.toLowerCase()) {
				mod.send('S_DESPAWN_USER', 3, { gameId: spawnedPlayers[i].gameId, type: 1 });
				hiddenUsers[spawnedPlayers[i].gameId] = spawnedPlayers[i];
				return;
			}
		}
	}

	function RemoveEntry(name) {
		var what, a = arguments, L = a.length, ax;
		while (L > 1 && name.length) {
			what = a[--L];
			while ((ax = name.indexOf(what)) !== -1) { name.splice(ax, 1); }
		}
		return name;
	}

	function ShowSpecificPlayer(name) {
		for (let i in hiddenUsers) {
			if (hiddenUsers[i].name.toString().toLowerCase() === name.toLowerCase()) {
				ModifyAppearance(hiddenUsers[i]);
				mod.send('S_SPAWN_USER', 13, hiddenUsers[i]);
				delete hiddenUsers[i];
				return;
			}
		}
	}

	function HideAll() {
		if (!mod.settings.OnlyParty) {
			for (let i in spawnedPlayers) {
				mod.send('S_DESPAWN_USER', 3, { gameId: spawnedPlayers[i].gameId, type: 1 });
				hiddenUsers[spawnedPlayers[i].gameId] = spawnedPlayers[i];
			}
		}
	}

	function ShowAll() {
		for (let i in hiddenUsers) {
			ModifyAppearance(hiddenUsers[i]);
			mod.send('S_SPAWN_USER', 13, hiddenUsers[i]);
			delete hiddenUsers[i];
		}
	}

	// ~~~ * Functions * ~~~ \\

	function EqGid(xg) {
		if (notcaaliproxy) return (xg === MyGameId)
		return (xg.equals(MyGameId))
	}

	function ModifyAppearance(event) {
		let modified = false;

		if (mod.settings.ShowStyle) {
			event.ShowStyle = false;
			event.weaponEnchant = event.body = event.hand = event.feet = event.underwear = event.head = event.face = event.weapon = 0;
			event.title = event.underwearDye = event.styleBackDye = event.styleHeadDye = event.styleFaceDye = event.styleBodyDye = event.showFace = event.styleHead = event.styleFace = event.styleBack = event.styleWeapon = event.styleBody = event.styleFootprint = 0;
			event.icons = [];
			if (event.mount) event.mount = 231;
			modified = true;
		}

		if (mod.settings.Hideguildlogos) {
			event.guildEmblem = '';
			modified = true;
		}

		return modified;
	}

	function ModifySkillResult(event) {
		let modified = false;

		if (mod.settings.Hit_Me) {
			event.skill = { npc: 0, type: 0, id: 0 };
			modified = true;
		}

		if (mod.settings.Hit_Damage) {
			event.damage = event.type = 0;
			modified = true;
		}

		return modified;
	}

	function ClassID(m) {
		return (m % 100)
	}

	function UpdateLoc(event) {
		mod.send('S_USER_LOCATION', 5, { gameId: event.gameId, loc: event.loc, dest: event.loc, w: event.w, speed: 300, type: 7 });
	}

	// ~~~* Hook functions * ~~~ \\

	function sLogin(event) {
		MyGameId = event.gameId;
		MyName = event.name;
		MyPlayerId = event.playerId;
		laststate = undefined;
		if (mod.settings.ProjDebug) {
			mod.settings.ProjDebug = false
			Msg('Detected Projectile debug on, ' + 'Made off'.clr(HPinkClr) + '.')
		}
		if (mod.settings.AbnDebug) {
			mod.settings.AbnDebug = false
			Msg('Detected Abnormalities debug on, ' + 'Made off'.clr(HPinkClr) + '.')
		}
	}

	function sLoadTopo() {
		spawnedPlayers = {};
		hiddenUsers = {};
		hiddenNpcs = {};
		if (mod.settings.ProjDebug) {
			mod.settings.ProjDebug = false
			Msg('Detected Projectile debug on, ' + 'Made off'.clr(HPinkClr) + '.')
		}
		if (mod.settings.AbnDebug) {
			mod.settings.AbnDebug = false
			Msg('Detected Abnormalities debug on, ' + 'Made off'.clr(HPinkClr) + '.')
		}
	}

	function sLeaveParty() {
		partyMembers = []
		if (mod.settings.RaidAutoChange) {
			if (mod.settings.Mode !== 2 || laststate === undefined) return;
			mod.command.exec(`fps mode ${laststate}`)
			laststate = undefined;
		}
	}

	function sMountVehicle(event) {
		if (EqGid(event.gameId)) return;
		spawnedPlayers[event.gameId].mount = event.id
		if (hiddenUsers[event.gameId]) hiddenUsers[event.gameId].mount = event.id;
		if (mod.settings.ShowStyle) {
			event.id = 231
			return true;
		}
	}

	function sUnmountVehicle(event) {
		if (EqGid(event.gameId)) return;
		spawnedPlayers[event.gameId].mount = 0
		if (hiddenUsers[event.gameId]) hiddenUsers[event.gameId].mount = 0;
	}

	function cSetVisibleRange(event) {
		lastrange = event.range
	}

	function sStartCooltimeItem(event) {
		if (event.cooldown == 0) return false
	}

	function sStartActionScript(event) {
		if ([40000, 40001, 40002].includes(event.script)) return;
		if (mod.settings.NoZoomingToNpc) return false
	}

	function sPcBangInventory(event) {
		for (let item of event.inventory)
			if ([152898, 184659, 201005, 201006, 201007, 201008, 201022, 855604].includes(item.item)) {
				item.cooldown = 0;
				return true;
			}
	}

	function sLoadingScreenControlInfo() {
		if (mod.settings.Mode >= 2) return false
	}

	function sGuildName(event) {
		if (mod.settings.Hideguildlogos) {
			event.guildEmblem = '';
			return true;
		}
	}

	function sApplyTitle(event) {
		if (EqGid(event.gameId)) return;
		if (mod.settings.ShowStyle) return false
	}

	function sImageData() {
		if (mod.settings.Hideguildlogos) return false
	}

	function sRequestCityWarMapInfoDetail(event) {
		if (mod.settings.Hideguildlogos) {
			for (let lgd in event.guilds) {
				if (typeof event.guilds[lgd].id !== 'undefined') {
					event.guilds[lgd].emblem = '';
					return true;
				}
			}
		}
	}

	function sSpawnUser(event) {
		spawnedPlayers[event.gameId] = event;
		if (mod.settings.Mode === 3 || mod.settings.PlayersBlacklist.includes(event.name) || mod.settings.ClassesData[ClassID(event.templateId)].isHidden === true || (mod.settings.OnlyParty && !partyMembers.includes(event.name))) {
			hiddenUsers[event.gameId] = event;
			return false;
		}
		if (ModifyAppearance(event)) return true;
	}

	function sSpawnUserfn(event) {
		if (ModifyAppearance(event)) return true;
	}

	function sDespawnUser(event) {
		delete hiddenUsers[event.gameId];
		delete spawnedPlayers[event.gameId];
	}

	function sUserLocation(event) {
		if (spawnedPlayers[event.gameId]) spawnedPlayers[event.gameId].loc = event.dest;
		if (hiddenUsers[event.gameId]) {
			hiddenUsers[event.gameId].loc = event.dest;
			return false;
		}
	}

	function sUserMoveType() { return false; }

	function sPartyMemberList(event) {
		event.members.map((value) => { partyMembers.push(value.name) })
		if (mod.settings.RaidAutoChange) {
			if (event.members.length >= 18) {
				if (mod.settings.Mode === 3) return;
				laststate = mod.settings.Mode
				mod.command.exec(`fps mode 2`)
			} else {
				if (mod.settings.Mode !== 2 || laststate === undefined) return;
				mod.command.exec(`fps mode ${laststate}`)
				laststate = undefined;
			}
		}
	}

	function sUserExternalChange(event) {
		if (EqGid(event.gameId)) return;
		if (mod.settings.ShowStyle) {
			event.ShowStyle = false;
			event.weaponEnchant = event.body = event.hand = event.feet = event.underwear = event.head = event.face = event.weapon = 0;
			event.title = event.underwearDye = event.styleBackDye = event.styleHeadDye = event.styleFaceDye = event.styleBodyDye = event.showFace = event.styleHead = event.styleFace = event.styleBack = event.styleWeapon = event.styleBody = event.styleFootprint = 0;
			return true;
		}
	}

	function sUnicastTransformData(event) {
		if (EqGid(event.gameId)) return;
		if (mod.settings.ShowStyle) return false;
		if (mod.settings.Hideguildlogos) {
			event.guildLogo = '';
			return true;
		}
	}

	function sSpawnNpc(event) {
		if (mod.settings.HideBlacklistedNpcs) {
			for (var i = 0; i < mod.settings.NpcsBlacklist.length; i++) {
				if (event.huntingZoneId == mod.settings.NpcsBlacklist[i].zone && event.templateId == mod.settings.NpcsBlacklist[i].templateId) {
					hiddenNpcs[event.gameId] = event;
					return false;
				}
			}
		}
		if (event.huntingZoneId === 1023) {
			if (EqGid(event.owner)) {
				if (!mod.settings.HideMySummons) return;
				hiddenNpcs[event.gameId] = event;
				return false;
			}
			if (!mod.settings.HideOthersSummons) return;
			hiddenNpcs[event.gameId] = event;
			return false;
		}
		if (mod.settings.HideFireworks && event.huntingZoneId === 1023 && (event.templateId === 60016000 || event.templateId === 80037000)) return false;
		if (mod.settings.ShowStyle) {
			event.repairable = false;
			return true;
		}
	}

	function sDespawnNpc(event) {
		delete hiddenNpcs[event.gameId];
		if (event.type !== 5) return;
		event.type = 1;
		return true;
	}

	function sFearMoveStage(event) {
		if ((!EqGid(event.target) && mod.settings.Mode === 3) || hiddenUsers[event.target] || hiddenNpcs[event.target]) return false;
	}

	function sFearMoveEnd(event) {
		if ((!EqGid(event.target) && mod.settings.Mode === 3) || hiddenUsers[event.target] || hiddenNpcs[event.target]) return false;
	}

	function sAbnormalityBegin(event) {
		if (mod.settings.AbnDebug) {
			if (EqGid(event.target)) console.log(`\x1b[2m[${new Date().toTimeString().slice(0, 8)}]\x1b[0m \x1b[31m->\x1b[0m \x1b[36mAbnormality \x1b[4mStarted\x1b[0m \x1b[44mon\x1b[0m \x1b[37m'${MyName}'\x1b[0m:\x1b[33m \ID "\x1b[32m${event.id}\x1b[0m"`);
			if (EqGid(event.source)) console.log(`\x1b[2m[${new Date().toTimeString().slice(0, 8)}]\x1b[0m \x1b[31m->\x1b[0m \x1b[36mAbnormality \x1b[4mStarted\x1b[0m \x1b[45mfrom\x1b[0m \x1b[37m'${MyName}'\x1b[0m:\x1b[33m \ID "\x1b[32m${event.id}\x1b[0m"`);
			if (spawnedPlayers[event.target]) console.log(`\x1b[2m[${new Date().toTimeString().slice(0, 8)}]\x1b[0m \x1b[31m->\x1b[0m \x1b[36mAbnormality \x1b[4mStarted\x1b[0m \x1b[44mon\x1b[0m \x1b[37m'${spawnedPlayers[event.target].name}'\x1b[0m:\x1b[33m \ID "\x1b[32m${event.id}\x1b[0m"`);
			if (spawnedPlayers[event.source]) console.log(`\x1b[2m[${new Date().toTimeString().slice(0, 8)}]\x1b[0m \x1b[31m->\x1b[0m \x1b[36mAbnormality \x1b[4mStarted\x1b[0m \x1b[45mfrom\x1b[0m \x1b[37m'${spawnedPlayers[event.source].name}'\x1b[0m:\x1b[33m \ID "\x1b[32m${event.id}\x1b[0m"`);
		}
		if (EqGid(event.target)) return;
		if (hiddenUsers[event.target]) return false;
		if (mod.settings.HideBlacklistedAbnormalities && mod.settings.AbnormalitiesBlacklist.includes(event.id)) return false;
		if (mod.settings.HideAllAbnormalities && (spawnedPlayers[event.target] || spawnedPlayers[event.source] || mod.settings.AbnormalitiesBlacklist.includes(event.id))) return false;
	}

	function sAbnormalityRefresh(event) {
		if (hiddenUsers[event.target]) return false;
		if ((mod.settings.HideBlacklistedAbnormalities || mod.settings.HideAllAbnormalities) && (spawnedPlayers[[10306, 10316, 12001, 12003, 12120, 12130].includes(event.target)] || spawnedPlayers[[10306, 10316, 12001, 12003, 12120, 12130].includes(event.source)])) return false;
	}

	function sAbnormalityFail(event) {
		if (event.id === 3000021) return false;
	}

	function sActionStage(event) {
		if (EqGid(event.gameId) || !spawnedPlayers[event.gameId]) return;
		if ((mod.settings.Mode >= 2) || hiddenUsers[event.gameId] || (mod.settings.HideBlacklistedSkills && mod.settings.ClassesData[ClassID(event.templateId)].CD_SkillsBlacklist.includes(Math.floor(event.skill.id / 10000).toString())) || mod.settings.ClassesData[ClassID(event.templateId)].CD_HideBlacklistedSkills) {
			UpdateLoc(event);
			return false;
		}
	}

	function sStartUserProjectile(event) {
		if (mod.settings.ProjDebug) {
			if (EqGid(event.gameId)) console.log(`\x1b[2m[${new Date().toTimeString().slice(0, 8)}]\x1b[0m \x1b[31m->\x1b[0m \x1b[36mProjectile \x1b[4mStarted\x1b[0m \x1b[45mfrom\x1b[0m \x1b[37m'${MyName}'\x1b[0m:\x1b[33m \Skill_ID "\x1b[32m${event.skill.id}\x1b[0m"`);
			if (spawnedPlayers[event.gameId]) console.log(`\x1b[2m[${new Date().toTimeString().slice(0, 8)}]\x1b[0m \x1b[31m->\x1b[0m \x1b[36mProjectile \x1b[4mStarted\x1b[0m \x1b[45mfrom\x1b[0m \x1b[37m'${spawnedPlayers[event.source].name}'\x1b[0m:\x1b[33m \Skill_ID "\x1b[32m${event.skill.id}\x1b[0m"`);
		}
		if (mod.settings.HideBlacklistedProjectiles && mod.settings.ProjectilesBlacklist.includes(event.skill.id)) return false;
		if (!EqGid(event.gameId) && spawnedPlayers[event.gameId] && (hiddenUsers[event.gameId] || mod.settings.Mode > 0 || mod.settings.HideAllProjectiles)) return false;
	}

	function sSpawnProjectile(event) {
		if (mod.settings.ProjDebug) {
			if (EqGid(event.gameId)) console.log(`\x1b[2m[${new Date().toTimeString().slice(0, 8)}]\x1b[0m \x1b[31m->\x1b[0m \x1b[36mProjectile \x1b[4mSpawned\x1b[0m \x1b[45mfrom\x1b[0m \x1b[37m'${MyName}'\x1b[0m:\x1b[33m \Skill_ID "\x1b[32m${event.skill.id}\x1b[0m"`);
			if (spawnedPlayers[event.gameId]) console.log(`\x1b[2m[${new Date().toTimeString().slice(0, 8)}]\x1b[0m \x1b[31m->\x1b[0m \x1b[36mProjectile \x1b[4mSpawned\x1b[0m \x1b[45mfrom\x1b[0m \x1b[37m'${spawnedPlayers[event.source].name}'\x1b[0m:\x1b[33m \Skill_ID "\x1b[32m${event.skill.id}\x1b[0m"`);
		}
		if (mod.settings.HideBlacklistedProjectiles && mod.settings.ProjectilesBlacklist.includes(event.skill.id)) return false;
		if (!EqGid(event.gameId) && spawnedPlayers[event.gameId] && (hiddenUsers[event.gameId] || mod.settings.Mode > 0 || mod.settings.HideAllProjectiles)) return false;
	}

	function sEachSkillResult(event) {
		if (EqGid(event.source) || EqGid(event.owner)) {
			if (ModifySkillResult(event)) return true;
		}
		if (!EqGid(event.target) && mod.settings.Hit_Other && (spawnedPlayers[event.owner] || spawnedPlayers[event.source])) {
			event.skill = { npc: 0, type: 0, id: 0 };
			event.id = event.damage = event.type = event.noctEffect = event.crit = event.stackExplode = event.blocked = 0;
			event.reaction.skill = 0;
			return true;
		}
	}

	function sSpawnDropItem(event) {
		if (EqGid(event.source)) return;
		if (mod.settings.HideBlacklistedDrop) {
			for (let i in event.owners) {
				if (event.owners[i].playerId.toString() == MyPlayerId.toString()) return;
			}
			if (mod.settings.DropBlacklist.includes(event.item)) return false;
		}
		if (mod.settings.Mode >= 2) {
			event.explode = 0;
			return true;
		}
	}

	function sFontSwapInfo() {
		if (mod.settings.Hit_Damage) return false;
	}

	// ~~~ * Packet Hooks * ~~~ \\

	mod.hook('S_LOGIN', 10, sLogin)
	mod.hook('S_LOAD_TOPO', 'raw', sLoadTopo)
	mod.hook('S_LEAVE_PARTY', 'raw', sLeaveParty)
	mod.hook('S_MOUNT_VEHICLE', 2, sMountVehicle)
	mod.hook('S_UNMOUNT_VEHICLE', 2, sUnmountVehicle)
	mod.hook('C_SET_VISIBLE_RANGE', 1, cSetVisibleRange)
	mod.hook('S_START_COOLTIME_ITEM', 1, sStartCooltimeItem)
	mod.hook('S_START_ACTION_SCRIPT', 3, sStartActionScript)
	mod.hook('S_PCBANGINVENTORY_DATALIST', 1, sPcBangInventory)
	mod.hook('S_LOADING_SCREEN_CONTROL_INFO', 'raw', sLoadingScreenControlInfo)

	mod.hook('S_GUILD_NAME', 1, sGuildName)
	mod.hook('S_APPLY_TITLE', 2, sApplyTitle)
	mod.hook('S_IMAGE_DATA', 'raw', sImageData)
	mod.hook('S_REQUEST_CITY_WAR_MAP_INFO_DETAIL', 1, sRequestCityWarMapInfoDetail)

	mod.hook('S_SPAWN_USER', 13, { order: 9999 }, sSpawnUser)
	mod.hook('S_SPAWN_USER', 13, { order: 99999, filter: { fake: null } }, sSpawnUserfn)
	mod.hook('S_DESPAWN_USER', 3, { order: 999 }, sDespawnUser)
	mod.hook('S_USER_LOCATION', 5, sUserLocation)
	mod.hook('S_USER_MOVETYPE', 'raw', sUserMoveType)
	mod.hook('S_PARTY_MEMBER_LIST', 7, sPartyMemberList)
	mod.hook('S_USER_EXTERNAL_CHANGE', 6, { order: 9999 }, sUserExternalChange)
	mod.hook('S_UNICAST_TRANSFORM_DATA', 3, { order: 99999 }, sUnicastTransformData)

	mod.hook('S_SPAWN_NPC', 9, sSpawnNpc)
	mod.hook('S_DESPAWN_NPC', 3, sDespawnNpc)
	mod.hook('S_FEARMOVE_STAGE', 1, sFearMoveStage)
	mod.hook('S_FEARMOVE_END', 1, sFearMoveEnd)

	mod.hook('S_ABNORMALITY_BEGIN', 3, { order: 999 }, sAbnormalityBegin)
	mod.hook('S_ABNORMALITY_REFRESH', 1, { order: 999 }, sAbnormalityRefresh)
	mod.hook('S_ABNORMALITY_FAIL', 1, sAbnormalityFail)

	mod.hook('S_ACTION_STAGE', 8, { order: 999 }, sActionStage)
	mod.hook('S_SPAWN_PROJECTILE', 5, { order: 999 }, sSpawnProjectile)
	mod.hook('S_START_USER_PROJECTILE', 9, { order: 999 }, sStartUserProjectile)
	mod.hook('S_EACH_SKILL_RESULT', 12, { order: 999 }, sEachSkillResult)
	mod.hook('S_SPAWN_DROPITEM', 6, sSpawnDropItem)
	mod.hook('S_FONT_SWAP_INFO', 'raw', sFontSwapInfo)

	// ~~~ * Commands * ~~~ \\

	mod.command.add('0', () => mod.command.exec('fps mode 0'))
	mod.command.add('1', () => mod.command.exec('fps mode 1'))
	mod.command.add('2', () => mod.command.exec('fps mode 2'))
	mod.command.add('3', () => mod.command.exec('fps mode 3'))

	mod.command.add(['fps', 'fps-utils', 'fpsutil', 'fpsutils'], (key, arg, arg2, arg3) => {
		switch (key) {
			case "g":
			case "gui":
				GuiHandler(arg, arg2);
				break
			case "0":
				mod.command.exec(`fps mode 0`);
				break
			case "1":
				mod.command.exec(`fps mode 1`);
				break
			case "2":
				mod.command.exec(`fps mode 2`)
				break
			case "3":
				mod.command.exec(`fps mode 3`);
				break
			case "mode":
			case "state":
				switch (arg) {
					case "0":
					case "off":
						if (mod.settings.Mode === 3) ShowAll();
						mod.settings.Mode = 0;

						mod.settings.HideAllAbnormalities = false;
						mod.settings.HideAllProjectiles = false;
						mod.settings.Hit_Other = false;

						Msg(`Mode 0.`.clr(RedClr));
						break
					case "1":
					case "one":
						if (mod.settings.Mode === 3) ShowAll();
						mod.settings.Mode = 1;

						mod.settings.HideAllAbnormalities = false;
						mod.settings.HideAllProjectiles = true;
						mod.settings.Hit_Other = true;

						Msg(`Mode 1.`.clr(BronzeClr));
						break
					case "2":
					case "two":
						if (mod.settings.Mode === 3) ShowAll();
						mod.settings.Mode = 2;

						mod.settings.HideAllAbnormalities = true;
						mod.settings.HideAllProjectiles = true;
						mod.settings.Hit_Other = true;

						Msg(`Mode 2.`.clr(SilverClr));
						break
					case "3":
					case "three":
						HideAll();
						mod.settings.Mode = 3;

						mod.settings.HideAllAbnormalities = true;
						mod.settings.HideAllProjectiles = true;
						mod.settings.Hit_Other = true;

						mod.settings.OnlyParty = false;

						Msg(`Mode 3.`.clr(GoldClr));
						break
					default:
						Msg(`Invalid" ${arg}".`.clr(GrayClr));
						Msg(`Modes: ` + `[0, 1, 2, 3]`.clr(PinkClr) + '.');
						break
				}
				break
			case "hide":
				if (typeof arg === "string" && arg !== null) {
					if (mod.settings.PlayersBlacklist.includes(arg)) {
						Msg(`Player "${arg}"` + ` Already hidden`.clr(RedClr) + '.');
						return;
					} else
						if ((mod.settings.ClassesNames.includes(arg) && !mod.settings.ClassesBlacklist.includes(arg)) || (mod.settings.RolesNames.includes(arg) && !mod.settings.RolesBlacklist.includes(arg))) {
							for (let i in mod.settings.ClassesData) {
								if ((mod.settings.ClassesData[i].name === arg || mod.settings.ClassesData[i].role.includes(arg)) && mod.settings.ClassesData[i].isHidden !== true) {
									mod.settings.ClassesData[i].isHidden = true;
									if (mod.settings.ClassesData[i].name === arg) mod.settings.ClassesBlacklist.push(arg);
									if (mod.settings.ClassesData[i].role.includes(arg)) mod.settings.RolesBlacklist.push(arg);
									let classtohide = mod.settings.ClassesData[i].model;
									for (let i in spawnedPlayers) {
										if (ClassID(spawnedPlayers[i].templateId) === classtohide) HideSpecificPlayer(spawnedPlayers[i].name);
									}
								}
							}
							Msg(`Class/Role ${arg}` + ` Hidden`.clr(GreenClr) + '.');
							return;
						} else if (mod.settings.ClassesBlacklist.includes(arg) || mod.settings.RolesBlacklist.includes(arg)) {
							Msg(`Class/Role "${arg}"` + ` Already hidden`.clr(RedClr) + '.');
							return;
						}
					Msg(`Player "${arg}"` + ` Hidden`.clr(GreenClr) + '.');
					mod.settings.PlayersBlacklist.push(arg);
					HideSpecificPlayer(arg);
				} else
					Msg(`Invalid ${arg2}.`.clr(GrayClr));
				break
			case "show":
				if (typeof arg === "string" && arg !== null) {
					if (mod.settings.PlayersBlacklist.includes(arg)) {
						ShowSpecificPlayer(arg);
						RemoveEntry(mod.settings.PlayersBlacklist, arg);
						Msg(`Player "${arg}"` + ` Shown`.clr(RedClr) + '.');
						return;
					}
					if ((mod.settings.ClassesNames.includes(arg) && mod.settings.ClassesBlacklist.includes(arg)) || (mod.settings.RolesBlacklist.includes(arg) && mod.settings.RolesNames.includes(arg))) {
						for (let i in mod.settings.ClassesData) {
							if (mod.settings.ClassesData[i].name === arg || mod.settings.ClassesData[i].role.includes(arg)) {
								if (mod.settings.ClassesData[i].name === arg) RemoveEntry(mod.settings.ClassesBlacklist, arg);
								if (mod.settings.ClassesData[i].role.includes(arg)) RemoveEntry(mod.settings.RolesBlacklist, arg);
								mod.settings.ClassesData[i].isHidden = false;
								let classToShow = mod.settings.ClassesData[i].model;
								for (let i in hiddenUsers) {
									if (ClassID(hiddenUsers[i].templateId) === classToShow) ShowSpecificPlayer(hiddenUsers[i].name);
								}
							}
						}
						Msg(`Class "${arg}"` + ` Shown`.clr(RedClr) + '.');
					} else if (!mod.settings.ClassesBlacklist.includes(arg) || !mod.settings.RolesBlacklist.includes(arg)) {
						Msg(`Class/Role "${arg}"` + ` Already shown`.clr(RedClr) + '.');
					} else if (!mod.settings.PlayersBlacklist.includes(arg)) {
						Msg(`Player "${arg}"` + ` Already shown`.clr(RedClr) + '.');
					}
				}
				break
			case "party":
				if (mod.settings.Mode === 3) return Msg(`You've to disable mode 3 first.`.clr(RedClr));
				mod.settings.OnlyParty = !mod.settings.OnlyParty
				if (mod.settings.OnlyParty) {
					for (let i in spawnedPlayers) {
						if (!partyMembers.includes(spawnedPlayers[i].name)) {
							mod.send('S_DESPAWN_USER', 3, { gameId: spawnedPlayers[i].gameId, type: 1 })
							hiddenUsers[spawnedPlayers[i].gameId] = spawnedPlayers[i];
						}
					}
				} else {
					ShowAll()
				}
				Msg(`Everyone but party ${mod.settings.OnlyParty ? 'Hidden'.clr(GreenClr) : 'Shown'.clr(RedClr)}.`);
				break
			case "raid":
				mod.settings.RaidAutoChange = !mod.settings.RaidAutoChange
				Msg(`Raid auto-state ${mod.settings.RaidAutoChange ? 'Enabled'.clr(GreenClr) : 'Disabled'.clr(RedClr)}.`);
				break
			case "list":
				Msg(`Hidden players: ${mod.settings.PlayersBlacklist}.`.clr(PinkClr));
				Msg(`Hidden classes: ${mod.settings.ClassesBlacklist}.`.clr(PinkClr));
				Msg(`Hidden roles: ${mod.settings.RolesBlacklist}.`.clr(PinkClr));
				break
			case "summons":
			case "sums":
				switch (arg) {
					case "me":
						mod.settings.HideMySummons = !mod.settings.HideMySummons;
						Msg(`Own summoned NPCs ${mod.settings.HideMySummons ? 'Hidden'.clr(RedClr) : 'Shown'.clr(GreenClr)}.`);
						break
					default:
						mod.settings.HideOthersSummons = !mod.settings.HideOthersSummons;
						Msg(`Others summoned NPCs ${mod.settings.HideOthersSummons ? 'Hidden'.clr(GreenClr) : 'Shown'.clr(RedClr)}.`);
						break
				}
				break
			case "skills":
			case "skill":
				switch (arg) {
					case "blacklist":
						mod.settings.HideBlacklistedSkills = !mod.settings.HideBlacklistedSkills;
						Msg(`Blacklisted skills ${mod.settings.HideBlacklistedSkills ? 'Hidden'.clr(GreenClr) : 'Shown'.clr(RedClr)}.`);
						break
					case "class":
						if (mod.settings.ClassesNames.includes(arg2)) {
							for (let i in mod.settings.ClassesData) {
								if (mod.settings.ClassesData[i].name === arg2) {
									if (arg3 != null && !isNaN(arg3) && arg3 < 50) {
										if (mod.settings.ClassesData[i].CD_SkillsBlacklist.includes(arg3)) {
											let index = mod.settings.ClassesData[i].CD_SkillsBlacklist.indexOf(arg3)
											if (index !== -1) {
												mod.settings.ClassesData[i].CD_SkillsBlacklist.splice(index, 1)
												Msg(`Skill ID '${arg3}'` + ` Shown`.clr(RedClr) + ` for class '${arg2}'.`)
											}
											return
										} else {
											mod.settings.ClassesData[i].CD_SkillsBlacklist.push(arg3)
											Msg(`Skill ID '${arg3}'` + ` Hidden`.clr(GreenClr) + ` for class '${arg2}'.`)
											return
										}

									} else {
										mod.settings.ClassesData[i].CD_HideBlacklistedSkills = !mod.settings.ClassesData[i].CD_HideBlacklistedSkills;
										Msg(`Skills for '${arg2}' class ${mod.settings.ClassesData[i].CD_HideBlacklistedSkills ? 'Hidden'.clr(GreenClr) : 'Shown'.clr(RedClr)}.`);
										return;
									}
								}
							}
						} else
							Msg(`Class ${arg2} not found.`.clr(RedClr));
						break
				}
				break
			case "npcs":
			case "npc":
				if (arg == 'hide') {
					if (!arg2 || !arg3) {
						mod.settings.HideBlacklistedNpcs = !mod.settings.HideBlacklistedNpcs;
						Msg(`Blacklisted NPCs ${mod.settings.HideBlacklistedNpcs ? 'Hidden'.clr(GreenClr) : 'Shown'.clr(RedClr)}.`);
						break;
					}
					let found = mod.settings.NpcsBlacklist.some((s) => {
						return s.zone === arg2 && s.templateId === arg3;
					});
					if (found) {
						Msg(`NPC HntZone '${arg2}', TmpId '${arg3}'` + ` Removed from the blacklist`.clr(RedClr) + '.')
						mod.settings.NpcsBlacklist = mod.settings.NpcsBlacklist.filter((obj) => {
							return obj.zone != arg2 || obj.templateId != arg3;
						})

					} else {
						Msg(`NPC HntZone '${arg2}', TmpId '${arg3}'` + ` Added to the blacklist`.clr(GreenClr) + '.')
						mod.settings.NpcsBlacklist.push({ zone: arg2, templateId: arg3 })
					}
					return
				} else
					mod.settings.HideBlacklistedNpcs = !mod.settings.HideBlacklistedNpcs;
				Msg(`Blacklisted NPCs ${mod.settings.HideBlacklistedNpcs ? 'Hidden'.clr(GreenClr) : 'Shown'.clr(RedClr)}.`);
				break
			case "hit":
				switch (arg) {
					case "me":
						mod.settings.Hit_Me = !mod.settings.Hit_Me;
						Msg(`Own hits effect ${mod.settings.Hit_Me ? 'Hidden'.clr(GreenClr) : 'Shown'.clr(RedClr)}.`);
						break
					case "other":
						mod.settings.Hit_Other = !mod.settings.Hit_Other;
						Msg(`Players hit effect ${mod.settings.Hit_Other ? 'Hidden'.clr(GreenClr) : 'Shown'.clr(RedClr)}.`);
						break
					case "damage":
						mod.settings.Hit_Damage = !mod.settings.Hit_Damage;
						Msg(`Damage numbers ${mod.settings.Hit_Damage ? 'Hidden'.clr(GreenClr) : 'Shown'.clr(RedClr)}.`);
						break
					default:
						Msg(`Invalid &#40;hit&#41; "${arg}".`.clr(GrayClr));
						break;
				}
				break
			case "fireworks":
			case "firework":
				mod.settings.HideFireworks = !mod.settings.HideFireworks;
				Msg(`Fireworks ${mod.settings.HideFireworks ? 'Hidden'.clr(GreenClr) : 'Shown'.clr(RedClr)}.`);
				break
			case "abn":
			case "effects":
			case "abnormal":
			case "abnormalities":
				switch (arg) {
					case "all":
						mod.settings.HideAllAbnormalities = !mod.settings.HideAllAbnormalities;
						Msg(`All Abnormalities ${mod.settings.HideAllAbnormalities ? 'Hidden'.clr(GreenClr) : 'Shown'.clr(RedClr)}.`);
						break
					case "blacklist":
						if (!arg2 || !arg3) {
							mod.settings.HideBlacklistedAbnormalities = !mod.settings.HideBlacklistedAbnormalities;
							Msg(`Blacklisted Abnormalities ${mod.settings.HideBlacklistedAbnormalities ? 'Hidden'.clr(GreenClr) : 'Shown'.clr(RedClr)}.`);
							break
						} else if (arg2 && arg3) {
							arg3 = Number(arg3);
							if (!mod.settings.AbnormalitiesBlacklist.includes(arg3)) {
								if (arg2 == 'add') {
									mod.settings.AbnormalitiesBlacklist.push(arg3)
									Msg(`Blacklisted Abnormalities` + ` added "${arg3}"`.clr(GreenClr) + '.')
									return
								} else if (arg2 == 'remv') {
									Msg(`Blacklisted Abnormalities` + ` can't remove "${arg3}" as it's not there`.clr(GrayClr) + '.')
									return
								}
							} else if (mod.settings.AbnormalitiesBlacklist.includes(arg3)) {
								if (arg2 == 'add') {
									Msg(`Blacklisted Abnormalities` + ` can't add "${arg3}" as it's already there`.clr(GrayClr) + '.')
									return
								} else if (arg2 == 'remv') {
									let index = mod.settings.AbnormalitiesBlacklist.indexOf(arg3)
									if (index !== -1) {
										mod.settings.AbnormalitiesBlacklist.splice(index, 1)
										Msg(`Blacklisted Abnormalities` + ` removed "${arg3}"`.clr(RedClr) + '.')
										return
									}
								}
							} else return Msg(`Invalid &#40;abnormalities Blacklist&#41; "${arg}".`.clr(GrayClr));
						}
						break
					case "log":
					case "debug":
						mod.settings.AbnDebug = !mod.settings.AbnDebug
						Msg(`Abnormalities debug ${mod.settings.AbnDebug ? 'started'.clr(GreenClr) : 'stopped'.clr(RedClr)}, check your console for details.`)
						break;
					default:
						Msg(`Invalid &#40;abnormalities&#41; "${arg}".`.clr(GrayClr));
						break;
				}
				break
			case "guildlogo":
				if (ChangeOnCd) return Msg(`Try again in 4 seconds.`.clr(PinkClr));
				mod.settings.Hideguildlogos = !mod.settings.Hideguildlogos;
				mod.send('C_SET_VISIBLE_RANGE', 1, { range: 0 })
				setTimeout(() => { mod.send('C_SET_VISIBLE_RANGE', 1, { range: lastrange }) }, 1500);
				ChangeOnCd = true
				setTimeout(() => { ChangeOnCd = false }, 4000);
				Msg(`Guild Logos ${mod.settings.Hideguildlogos ? 'Hidden'.clr(GreenClr) : 'Shown'.clr(RedClr)}.`);
				break
			case "costume":
			case "style":
				if (ChangeOnCd) return Msg(`Try again in 4 seconds.`.clr(PinkClr));
				mod.settings.ShowStyle = !mod.settings.ShowStyle;
				mod.send('C_SET_VISIBLE_RANGE', 1, { range: 0 })
				setTimeout(() => { mod.send('C_SET_VISIBLE_RANGE', 1, { range: lastrange }) }, 1500);
				ChangeOnCd = true
				setTimeout(() => { ChangeOnCd = false }, 4000);
				Msg(`Style of NPCs & others ${mod.settings.ShowStyle ? 'Hidden'.clr(GreenClr) : 'Shown'.clr(RedClr)}.`);
				break
			case "proj":
			case "projectile":
				switch (arg) {
					case "all":
						mod.settings.HideAllProjectiles = !mod.settings.HideAllProjectiles;
						Msg(`Projectiles ${mod.settings.HideAllProjectiles ? 'Hidden'.clr(GreenClr) : 'Shown'.clr(RedClr)}.`);
						break
					case "blacklist":
						if (!arg2 || !arg3) {
							mod.settings.HideBlacklistedProjectiles = !mod.settings.HideBlacklistedProjectiles;
							Msg(`Blacklisted projectile ${mod.settings.HideBlacklistedProjectiles ? 'Hidden'.clr(GreenClr) : 'Shown'.clr(RedClr)}.`);
							break
						} else if (arg2 && arg3) {
							arg3 = Number(arg3);
							if (!mod.settings.ProjectilesBlacklist.includes(arg3)) {
								if (arg2 == 'add') {
									mod.settings.ProjectilesBlacklist.push(arg3)
									Msg(`Blacklisted projectile` + ` added "${arg3}"`.clr(GreenClr) + '.')
									return
								} else if (arg2 == 'remv') {
									Msg(`Blacklisted projectile` + ` can't remove "${arg3}" as it's not there`.clr(GrayClr) + '.')
									return
								}
							} else if (mod.settings.ProjectilesBlacklist.includes(arg3)) {
								if (arg2 == 'add') {
									Msg(`Blacklisted projectile` + ` can't add "${arg3}" as it's already there`.clr(GrayClr) + '.')
									return
								} else if (arg2 == 'remv') {
									let index = mod.settings.ProjectilesBlacklist.indexOf(arg3)
									if (index !== -1) {
										mod.settings.ProjectilesBlacklist.splice(index, 1)
										Msg(`Blacklisted projectile` + ` removed "${arg3}"`.clr(RedClr) + '.')
										return
									}
								}
							} else return Msg(`Invalid &#40;projectile Blacklist&#41; "${arg}".`.clr(GrayClr));
						}
						break;
					case "log":
					case "debug":
						mod.settings.ProjDebug = !mod.settings.ProjDebug
						Msg(`Projectile debug ${mod.settings.ProjDebug ? 'started'.clr(GreenClr) : 'stopped'.clr(RedClr)}, check your console for details.`)
						break;
					default:
						Msg(`Invalid &#40;projectile&#41; "${arg}".`.clr(GrayClr));
						break;
				}
				break
			case "quicklink":
				switch (arg) {
					case "parcel":
						mod.send('C_REQUEST_CONTRACT', 1, { type: 8 });
						break;
					case "talents":
						mod.send('S_REQUEST_CONTRACT', 1, { type: 77 });
						break;
					case "broker":
						mod.send('S_NPC_MENU_SELECT', 1, { type: 28 });
						break;
					case "dressingroom":
						mod.send('C_REQUEST_CONTRACT', 1, { type: 76 });
						break;
					case "hatrestyle":
						mod.send('C_REQUEST_CONTRACT', 1, { type: 90 });
						break;
					case "lobby":
						mod.send('C_RETURN_TO_LOBBY', 1, {});
						break;
					case "exit":
						mod.send('C_EXIT', 1, {});
						break;
					case "drop":
						mod.send('C_LEAVE_PARTY', 1, {});
						break;
					case "disband":
						mod.send('C_DISMISS_PARTY', 1, {});
						break;
					case "reset":
						mod.send('C_RESET_ALL_DUNGEON', 1, {});
						break;
					case "searchengine":
						mod.send('S_SHOW_AWESOMIUMWEB_SHOP', 1, { link: 'https://duckduckgo.com/' });
						break;
					default:
						Msg(`Invalid &#40;quicklink&#41; "${arg}".`.clr(GrayClr));
						break;
				}
				break;
			case "npczoom":
				mod.settings.NoZoomingToNpc = !mod.settings.NoZoomingToNpc;
				Msg(`Npc zoom-ins ${mod.settings.NoZoomingToNpc ? 'Disabled'.clr(GreenClr) : 'ON'.clr(RedClr)}.`);
				break
			case "dropitem":
				if (arg == 'hide') {
					if (!arg2) {
						mod.settings.HideBlacklistedDrop = !mod.settings.HideBlacklistedDrop;
						Msg(`Blacklisted Drops ${mod.settings.HideBlacklistedDrop ? 'Hidden'.clr(GreenClr) : 'Shown'.clr(RedClr)}.`);
						break;
					}
					arg2 = Number(arg2);
					let found = mod.settings.DropBlacklist.some((s) => { return s === arg2; });
					if (found) {
						Msg(`Drops id '${arg2}'` + ` Removed from the blacklist`.clr(RedClr) + '.')
						mod.settings.DropBlacklist = mod.settings.DropBlacklist.filter((obj) => { return obj != arg2; })
					} else {
						Msg(`Drops id '${arg2}'` + ` Added to the blacklist`.clr(GreenClr) + '.')
						mod.settings.DropBlacklist.push(arg2)
					}
					return
				} else
					mod.settings.HideBlacklistedDrop = !mod.settings.HideBlacklistedDrop;
				Msg(`Blacklisted Drops ${mod.settings.HideBlacklistedDrop ? 'Hidden'.clr(GreenClr) : 'Shown'.clr(RedClr)}.`);
				break;
			case "help":
				mod.command.exec(`fps gui help`)
				break
			default:
				Msg('Unknown command, check command list.'.clr(RedClr));
				mod.command.exec(`fps gui help`)
				break
		}
		if (!notcaaliproxy) mod.saveSettings();
	})
}