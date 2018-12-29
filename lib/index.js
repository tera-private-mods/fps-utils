'use strict'
/* global __dirname */

module.exports = function FpsUtils(mod) {
	const NotCP = typeof global.TeraProxy === 'undefined'; //For niceName forced thing and broken settings auto-save For Caali's Proxy users.
	const NpcData = require("./data/npcData.json"),
		SkillData = require("./data/skillString.json"),
		BnzC = '#BC8F8F', SlvC = '#9A9A9A', GldC = '#DAA520', PnkC = '#FFB7C5', HPkC = '#FF69B4', CPKC = '#ED5D92', RedC = '#FE6F5E', GrnC = '#4DE19C', LPrC = '#E0B0FF', PrpC = '#9966CC', LBlC = '#4DDCE1', BluC = '#436EEE', DBlC = '#00575e', HBlC = '#08B3E5', GryC = '#778899', YlwC = '#C0B94D', OngC = '#FFBE5E';

	const FishingNpcs = { 8: [6011], 12: [1, 2], 23: [201, 202], 34: [8000], 61: [9901], 62: [1017, 1035, 1039, 1040, 1041, 1042, 1900, 1901, 1902, 1903, 9001, 9002, 9003, 9004, 9901], 83: [9901], 207: [9901], 212: [1034], 223: [9901, 9906, 9907, 9915, 9925], 230: [9901], 362: [1201, 1202, 1301, 1302] };
	const PvPProjs = [30120, 30220, 30320, 90120, 90220, 90320, 90420, 90520, 90620, 90720, 90820, 90920, 100120, 100220, 100320, 100420, 100520, 120220, 120320, 120420, 120520, 120620, 120720, 120820, 120920, 150120, 150220, 150320, 150420, 150520, 150620, 150720, 170120, 170220, 170320, 170420, 170520, 170620, 170720, 170820, 170920, 230120, 230220, 230320, 250120, 250220, 250320, 250420, 250520, 250620, 250720, 250820, 250920, 251020];
	const UserSumNPCs = [12345, 1100100, 1100101, 1023000, 1023001, 1023002, 1023003, 1023004, 1023005, 1023006, 1023007, 1023008, 1023009, 1023010, 1023011, 1023012, 1023013, 1023014, 1023200, 1023201, 1023202, 1023203, 1023204, 1023205, 1023206, 1023207, 1023208, 1023209, 1023210, 1023211, 1023300, 1023301, 1023302, 1023303, 1023304, 1023305, 1023306, 1023307, 1023308, 1023309, 1023310, 1023311, 1023312, 1023400, 1023401, 1023402, 1023403, 1023404, 1023405, 1024000, 1024001, 1024100, 1024200, 1024300, 2100100, 2100101, 10235001, 10235002, 10235003, 10235004, 10235005, 10235006, 10235007, 10235008, 10235009, 10235010, 10235011, 10235012, 10235013, 10235014, 10235015, 10235016, 10235017, 10235100, 10236001, 10236002, 10236003, 10236004, 10236005, 10236006, 10236007, 10236008, 10236009, 10236010, 10236011, 10236012, 10236013, 10236014, 10236015, 10236100, 10237001, 10237002, 10237003, 10237004, 10237005, 10237006, 10237007, 10237008, 10237009, 10237010, 10237011, 10237012, 10237013, 10237014, 10237015, 10237100, 10238001, 10238002, 10238003, 10238004, 10238005, 10238006, 10238007, 10238008, 10238100, 10239003, 30301001, 30301002, 30301003, 30301004, 30301005, 30302001, 30302002, 30302003, 30302004, 30302005, 30302006, 30302007, 30303001, 30303002, 30303003, 30303004, 30303005, 30303006, 30303007,];

	let MyGameId,
		MyName,
		MyPlayerId,
		SwitchCd,
		LastState,
		LastVrange,
		ProjDebug,
		AbnDebug,
		TmpData = [],
		PMembers = [],
		SUsers = {},
		HUsers = {},
		SNpcs = {},
		HNpcs = {},
		OldChan = { z: 0, c: 0, t: 0 };

	// ~~~ * Gui Parser * ~~~ \\

	let Xd;
	const Xmap = new WeakMap();

	if (!Xmap.has(mod.dispatch || mod)) {
		Xmap.set(mod.dispatch || mod, {});

		mod.hook('C_CONFIRM_UPDATE_NOTIFICATION', 'raw', () => false)

		mod.hook('C_ADMIN', 1, (event) => {
			Xd = event.command.split(";")
			Xd.forEach(cmd => mod.command.exec(cmd))
			return false
		})
	}

	const gui = {
		parse(Xarray, Xtitle) {
			let Xdata = '';
			for (let i = 0; i < Xarray.length; i++) {
				if (Xdata.length >= 16000) {
					Xdata += `Gui data limit exceeded, some values may be missing.`;
					break;
				}
				if (Xarray[i].command) Xdata += `<a href="admincommand:/@${Xarray[i].command}">${Xarray[i].text}</a>`;
				else if (!Xarray[i].command) Xdata += `${Xarray[i].text}`;
				else continue;
			}
			mod.toClient('S_ANNOUNCE_UPDATE_NOTIFICATION', 1, {
				id: 0,
				title: Xtitle,
				body: Xdata
			})
		}
	}

	// ~~~ * Gui Handler * ~~~ \\

	function GuiHandler(page, arg) {
		switch (page) {
			case "searchnpc":
			case "npcsearch":
				NpcJsonSearch(arg, NpcData, "search", `<font color="${LBlC}" size="+16">Search results for '${arg}'</font>.`)
				break;
			case "npc":
				NpcJsonSearch(arg, NpcData, "starts", `<font color="${LBlC}" size="+16">Search results for '${arg}'</font>.`)
				break;
			case "npclist":
				TmpData = []
				TmpData.push(
					{ text: `<font color="${PrpC}" size="+24"><p align="right">MAIN MENU</p></font><br><br>`, command: "fps gui" },
					{ text: `<font color="${YlwC}" size="+20"><p align="right">[Main NPC page]</p></font><br>`, command: "fps gui npcMain" },
					{ text: `<font color="${LBlC}" size="+19">Click a NPC ID to remove it from the blacklist:</font><br>` }
				)
				for (let i = 0; i < mod.settings.NpcsBlacklist.length; i++) {
					TmpData.push({ text: `<font color="${BnzC}" size="+17">${mod.settings.NpcsBlacklist[i].zone}, ${mod.settings.NpcsBlacklist[i].templateId}</font><br>`, command: `fps npc hide ${mod.settings.NpcsBlacklist[i].zone} ${mod.settings.NpcsBlacklist[i].templateId};fps gui npclist` })
				}
				gui.parse(TmpData, `<font color="${LPrC}">[FPS] Options - NPCs </font><font color="${GrnC}">(Blacklist)</font>`)
				TmpData = []
				break;
			case "npcMain":
				TmpData = []
				TmpData.push(
					{ text: `<font color="${PrpC}" size="+24"><p align="right">MAIN MENU</p></font><br><br>`, command: "fps gui" },
					{ text: `<font color="${YlwC}" size="+20"><p align="right">[Blacklisted NPCs list]</p></font><br>`, command: "fps gui npclist" },
					{ text: `<font color="${LBlC}" size="+19">Click a letter to view all NPCs starting with that letter:<br><br>` }
				)
				for (let i = 25, alphabet = ["Z", "Y", "X", "W", "V", "U", "T", "S", "R", "Q", "P", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A"]; i > -1; i--) {
					TmpData.push({ text: `<font color="${BluC}" size="+19">${alphabet[i]}</font>`, command: `fps gui npc ${alphabet[i]}` }, { text: "&nbsp;&nbsp;" })
				}
				TmpData.push(
					{ text: `<br><br><font color="${PnkC}" size="+16">(Command </font><font color="${HPkC}" size="+16">"fps gui searchnpc &#60;name&#62;"</font><font color="${PnkC}" size="+16"> to search for a specific NPCs names, Case sensitive)</font>` },
					{ text: `<br><br><font color="${PnkC}" size="+16">(Command </font><font color="${HPkC}" size="+16">"fps gui npc &#60;letters&#62;"</font><font color="${PnkC}" size="+16"> to search for NPCs names that starts with that 'letters', Case sensitive)</font>` },
					{ text: `<br><br><font color="${PnkC}" size="+16">If you want to search for npc with space between it's name, you've to add the whole name inside quotations, e.g. <font color="${HPkC}" size="+16">fps gui npcsearch "Bay Kamara"\`</font></font>` }
				)
				gui.parse(TmpData, `<font color="${LPrC}">[FPS] Options - NPCs </font><font color="${YlwC}">(Main)</font>`)
				TmpData = []
				break;
			case "show":
				TmpData = []
				TmpData.push(
					{ text: `<font color="${PrpC}" size="+24"><p align="right">MAIN MENU</p></font><br>`, command: "fps gui" },
					{ text: `<font color="${RedC}" size="+16">Red</font><font color="${LPrC}" size="+16"> = Shown, <font color="${GrnC}" size="+16">Green</font><font color="${LPrC}" size="+16"> = Hidden</font></font><br>` },
					{ text: `<font color="${PnkC}" size="+16">(Command </font><font color="${HPkC}" size="+16">"fps hide &#60;name&#62;"</font><font color="${PnkC}" size="+16"> to hide someone that does not appear here)</font><br><br>` },
					{ text: `<font color="${LBlC}" size="+19">Click on <font color="${RedC}">Red</font> to hide & add to blacklist.<br>Click on <font color="${GrnC}">Green</font> to show & remove from blacklist</font><br>` }
				)
				for (let i in SUsers) {
					TmpData.push({ text: `<font color="${mod.settings.PlayersBlacklist.includes(SUsers[i].name) ? GrnC : RedC}" size="+17">${SUsers[i].name}</font><br>`, command: mod.settings.PlayersBlacklist.includes(SUsers[i].name) ? `fps show ${SUsers[i].name};fps gui show` : `fps hide  ${SUsers[i].name};fps gui show` })
				}
				gui.parse(TmpData, `<font color="${LPrC}">[FPS] Options - Players </font><font color="${RedC}">(In-distance)</font>`)
				TmpData = []
				break;
			case "hide":
				TmpData = []
				TmpData.push(
					{ text: `<font color="${PrpC}" size="+24"><p align="right">MAIN MENU</p></font><br><br>`, command: "fps gui" },
					{ text: `<font color="${LBlC}" size="+19">Click to show & remove from blacklist.</font><br>` }
				)
				mod.settings.PlayersBlacklist.forEach(mem => TmpData.push({ text: `<font color="${BnzC}" size="+17">${mem}</font><br>`, command: `fps show ${mem};fps gui hide` }))
				gui.parse(TmpData, `<font color="${LPrC}">[FPS] Options - Players </font><font color="${GrnC}">(Hidden)</font>`)
				TmpData = []
				break;
			case "skills":
				gui.parse([
					{ text: `<font color="${PrpC}" size="+24"><p align="right">MAIN MENU</p></font><br>`, command: "fps gui" },
					{ text: `<font color="${YlwC}" size="+20">Tankers:</font>` }, { text: "&#09;&#09;" },
					{ text: `<font color="${LBlC}" size="+18">&#40;Lancer&#41;</font>`, command: "fps gui class lancer" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${LBlC}" size="+18">&#40;Brawler&#41;</font><br><br>`, command: "fps gui class brawler" },
					{ text: `<font color="${YlwC}" size="+20">Healers:</font>` }, { text: "&#09;&#09;" },
					{ text: `<font color="${LBlC}" size="+18">&#40;Priest&#41;</font>`, command: "fps gui class priest" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${LBlC}" size="+18">&#40;Mystic&#41;</font><br><br>`, command: "fps gui class mystic" },
					{ text: `<font color="${YlwC}" size="+20">Dpsers(melee):</font>` }, { text: "&#09;" },
					{ text: `<font color="${LBlC}" size="+18">&#40;Warrior&#41;</font>`, command: "fps gui class warrior" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${LBlC}" size="+18">&#40;Slayer&#41;</font>`, command: "fps gui class slayer" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${LBlC}" size="+18">&#40;Berserker&#41;</font>`, command: "fps gui class berserker" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${LBlC}" size="+18">&#40;Ninja&#41;</font>`, command: "fps gui class ninja" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${LBlC}" size="+18">&#40;Valkyrie&#41;</font>`, command: "fps gui class valkyrie" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${LBlC}" size="+18">&#40;Reaper&#41;</font><br><br>`, command: "fps gui class reaper" },
					{ text: `<font color="${YlwC}" size="+20">Dpsers(ranged):</font>` }, { text: "&#09;" },
					{ text: `<font color="${LBlC}" size="+18">&#40;Sorcerer&#41;</font>`, command: "fps gui class sorcerer" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${LBlC}" size="+18">&#40;Archer&#41;</font>`, command: "fps gui class archer" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${LBlC}" size="+18">&#40;Gunner&#41;</font>`, command: "fps gui class gunner" }
				], `<font color="${LPrC}">[FPS] Options - Skills </font><font color="${YlwC}">(Choose class)</font>`)
				break;
			case "class":
				gui.parse(SkillJsonSearch(arg), `<font color="${LPrC}">[FPS] Options - Skill list for '${arg}'</font>`)
				break;
			case "role":
				gui.parse([
					{ text: `<font color="${PrpC}" size="+24"><p align="right">MAIN MENU</p></font><br><br>`, command: "fps gui" },
					{ text: `<font color="${YlwC}" size="+20">By Roles:</font>` }, { text: "&#09;" },
					{ text: `<font color="${mod.settings.RolesBlacklist.includes('tank') ? GrnC : RedC}" size="+18">[Tankers]</font>`, command: `fps ${mod.settings.RolesBlacklist.includes('tank') ? `show` : `hide`} tank;fps gui role` }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.RolesBlacklist.includes('healer') ? GrnC : RedC}" size="+18">[Healers]</font>`, command: `fps ${mod.settings.RolesBlacklist.includes('healer') ? `show` : `hide`} healer;fps gui role` }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.RolesBlacklist.includes('dps') ? GrnC : RedC}" size="+18" >[Dps-All]</font>`, command: `fps ${mod.settings.RolesBlacklist.includes('dps') ? `show` : `hide`} dps;fps gui role` }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.RolesBlacklist.includes('ranged') ? GrnC : RedC}" size="+18">[Dps-Ranged]</font><br><br><br><br>`, command: `fps ${mod.settings.RolesBlacklist.includes('ranged') ? `show` : `hide`} ranged;fps gui role` },
					{ text: `<font color="${DBlC}" size="+22">By Classes</font><br><br>` },
					{ text: `<font color="${YlwC}" size="+20">Tankers:</font>` }, { text: "&#09;&#09;" },
					{ text: `<font color="${mod.settings.ClassesBlacklist.includes('lancer') ? GrnC : RedC}" size="+18">[Lancer]</font>`, command: `fps ${mod.settings.ClassesBlacklist.includes('lancer') ? `show` : `hide`} lancer;fps gui role` }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.ClassesBlacklist.includes('brawler') ? GrnC : RedC}" size="+18">[Brawler]</font><br><br>`, command: `fps ${mod.settings.ClassesBlacklist.includes('brawler') ? `show` : `hide`} brawler;fps gui role` },
					{ text: `<font color="${YlwC}" size="+20">Healers:</font>` }, { text: "&#09;&#09;" },
					{ text: `<font color="${mod.settings.ClassesBlacklist.includes('priest') ? GrnC : RedC}" size="+18">[Priest]</font>`, command: `fps ${mod.settings.ClassesBlacklist.includes('priest') ? `show` : `hide`} priest;fps gui role` }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.ClassesBlacklist.includes('mystic') ? GrnC : RedC}" size="+18">[Mystic]</font><br><br>`, command: `fps ${mod.settings.ClassesBlacklist.includes('mystic') ? `show` : `hide`} mystic;fps gui role` },
					{ text: `<font color="${YlwC}" size="+20">Dpsers(melee):</font>` }, { text: "&#09;" },
					{ text: `<font color="${mod.settings.ClassesBlacklist.includes('warrior') ? GrnC : RedC}" size="+18">[Warrior]</font>`, command: `fps ${mod.settings.ClassesBlacklist.includes('warrior') ? `show` : `hide`} warrior;fps gui role` }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.ClassesBlacklist.includes('slayer') ? GrnC : RedC}" size="+18">[Slayer]</font>`, command: `fps ${mod.settings.ClassesBlacklist.includes('slayer') ? `show` : `hide`} slayer;fps gui role` }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.ClassesBlacklist.includes('berserker') ? GrnC : RedC}" size="+18">[Berserker]</font>`, command: `fps ${mod.settings.ClassesBlacklist.includes('berserker') ? `show` : `hide`} berserker;fps gui role` }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.ClassesBlacklist.includes('ninja') ? GrnC : RedC}" size="+18">[Ninja]</font>`, command: `fps ${mod.settings.ClassesBlacklist.includes('ninja') ? `show` : `hide`} ninja;fps gui role` }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.ClassesBlacklist.includes('valkyrie') ? GrnC : RedC}" size="+18">[Valkyrie]</font>`, command: `fps ${mod.settings.ClassesBlacklist.includes('valkyrie') ? `show` : `hide`} valkyrie;fps gui role` }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.ClassesBlacklist.includes('reaper') ? GrnC : RedC}" size="+18">[Reaper]</font><br><br>`, command: `fps ${mod.settings.ClassesBlacklist.includes('reaper') ? `show` : `hide`} reaper;fps gui role` },
					{ text: `<font color="${YlwC}" size="+20">Dpsers(ranged):</font>` }, { text: "&#09;" },
					{ text: `<font color="${mod.settings.ClassesBlacklist.includes('sorcerer') ? GrnC : RedC}" size="+18">[Sorcerer]</font>`, command: `fps ${mod.settings.ClassesBlacklist.includes('sorcerer') ? `show` : `hide`} sorcerer;fps gui role` }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.ClassesBlacklist.includes('archer') ? GrnC : RedC}" size="+18">[Archer]</font>`, command: `fps ${mod.settings.ClassesBlacklist.includes('archer') ? `show` : `hide`} archer;fps gui role` }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.ClassesBlacklist.includes('gunner') ? GrnC : RedC}" size="+18">[Gunner]</font>`, command: `fps ${mod.settings.ClassesBlacklist.includes('gunner') ? `show` : `hide`} gunner;fps gui role` }
				], `<font color="${LPrC}">[FPS] Options - Roles/Classes</font>`)
				break;
			case "abn":
				TmpData = []
				TmpData.push(
					{ text: `<font color="${PrpC}" size="+24"><p align="right">MAIN MENU</p></font><br>`, command: "fps gui" },
					{ text: `<font color="${AbnDebug ? GrnC : RedC}" size="+19"><p align="right">Debug</p></font><br>`, command: "fps abn log;fps gui abn" },
					{ text: `<font color="${LPrC}" size="+19">Blacklist: </font><font color="${PnkC}" size="17+">Click to remove from the blacklist.</font><br>` }
				)
				mod.settings.AbnormalitiesBlacklist.forEach(abnmem => TmpData.push({ text: `<font color="${BnzC}" size="+16">${abnmem}<br></font>`, command: `fps abn blacklist remv ${abnmem};fps gui abn` }))
				gui.parse(TmpData, `<font color="${LPrC}">[FPS] Options - Abnormalities</font>`)
				TmpData = []
				break;
			case "proj":
				TmpData = []
				TmpData.push(
					{ text: `<font color="${PrpC}" size="+24"><p align="right">MAIN MENU</p></font><br>`, command: "fps gui" },
					{ text: `<font color="${ProjDebug ? GrnC : RedC}" size="+19"><p align="right">Debug</p></font><br>`, command: "fps proj log;fps gui proj" },
					{ text: `<font color="${LPrC}" size="+19">Blacklist: </font><font color="${PnkC}" size="17+">Click to remove from the blacklist.</font><br>` }
				)
				mod.settings.ProjectilesBlacklist.forEach(projmem => TmpData.push({ text: `<font color="${BnzC}" size="+16">${projmem}<br></font>`, command: `fps proj blacklist remv ${projmem};fps gui proj` }))
				gui.parse(TmpData, `<font color="${LPrC}">[FPS] Options - Projectiles</font>`)
				TmpData = []
				break;
			case "help":
				gui.parse([
					{ text: `<font color="${PrpC}" size="+24"><p align="right">MAIN MENU</p></font><br>`, command: "fps gui" },
					{ text: `<font size="20">` },
					{ text: `<font color="${LBlC}">Command</font>            <font color="${SlvC}">Arg(s)</font>                 <font color="${CPKC}">Example</font><br>` },
					{ text: `<font color="${HBlC}">gui ^ g</font>                      <font color="${DBlC}">N/A</font>                    <font color="${HPkC}">!fps gui</font><br>` },
					{ text: `<font color="${HBlC}">  N/A</font>                         <font color="${DBlC}">N/A</font>                    <font color="${HPkC}">!fps-util</font><br>` },
					{ text: `<font color="${HBlC}">0 ^ 1 ^ 2 ^ 3</font>             <font color="${DBlC}">N/A</font>                    <font color="${HPkC}">!0 ^ !1 ^ !2 ^ !3</font><br>` },
					{ text: `<font color="${HBlC}">mode</font>                  <font color="${DBlC}">0 ^ 1 ^ 2 ^ 3</font>            <font color="${HPkC}">!fps mode 2</font><br>` },
					{ text: `<font color="${HBlC}">hide^show</font>    <font color="${DBlC}">Player^Class^Role</font>    <font color="${HPkC}">!fps hide mie</font><br>` },
					{ text: `<font color="${HBlC}">party</font>                        <font color="${DBlC}">N/A</font>                    <font color="${HPkC}">!fps party</font><br>` },
					{ text: `<font color="${HBlC}">raid</font>                           <font color="${DBlC}">N/A</font>                    <font color="${HPkC}">!fps raid</font><br>` },
					{ text: `<font color="${HBlC}">list</font>                             <font color="${DBlC}">N/A</font>                    <font color="${HPkC}">!fps list</font><br>` },
					{ text: `<font color="${HBlC}">sums</font>                 <font color="${DBlC}">other ^ me</font>               <font color="${HPkC}">!fps sums me</font><br>` },
					{ text: `<font color="${HBlC}">skill</font>                       <font color="${DBlC}">blacklist</font>               <font color="${HPkC}">!fps skill blacklist</font><br>` },
					{ text: `<font color="${HBlC}">npc</font>                      <font color="${DBlC}">N/A ^ hide</font>             <font color="${HPkC}">!fps npc</font><br>` },
					{ text: `<font color="${HBlC}">hit</font>                  <font color="${DBlC}">me^other^damage</font>  <font color="${HPkC}">!fps hit me</font><br>` },
					{ text: `<font color="${HBlC}">firework</font>                  <font color="${DBlC}">N/A</font>                    <font color="${HPkC}">!fps firework</font><br>` },
					{ text: `<font color="${HBlC}">abn</font>                   <font color="${DBlC}">all ^ blacklist</font>          <font color="${HPkC}">!fps abn blacklist</font><br>` },
					{ text: `<font color="${HBlC}">proj</font>                   <font color="${DBlC}">all ^ blacklist</font>          <font color="${HPkC}">!fps proj all</font><br>` },
					{ text: `<font color="${HBlC}">guildlogo</font>                <font color="${DBlC}">N/A</font>                    <font color="${HPkC}">!fps guildlogo</font><br>` },
					{ text: `<font color="${HBlC}">style</font>                          <font color="${DBlC}">N/A</font>                    <font color="${HPkC}">!fps style</font><br>` },
					{ text: `<font color="${HBlC}">gui npcsearch</font>      <font color="${DBlC}">"target"</font>             <font color="${HPkC}">!fps gui npcsearch E</font><br>` },
					{ text: `<font color="${HBlC}">npczoom</font>                 <font color="${DBlC}">N/A</font>                    <font color="${HPkC}">!fps npczoom</font><br>` },
					{ text: `<font color="${HBlC}">dropitem</font>                 <font color="${DBlC}">N/A ^ hide</font>        <font color="${HPkC}">!fps dropitem</font><br>` },
					{ text: `<font color="${HBlC}">monsterdeathani</font>   <font color="${DBlC}">N/A</font>                    <font color="${HPkC}">!fps monsterdeathani</font><br>` },
					{ text: `<font color="${HBlC}">screenabns</font>             <font color="${DBlC}">N/A ^  hide</font>      <font color="${HPkC}">!fps screenabns</font><br>` },
					{ text: `<font color="${HBlC}">fish ^ fishing</font>           <font color="${DBlC}">N/A</font>                    <font color="${HPkC}">!fps fishing</font>` },
					{ text: `</font>` }
				], `<font color="${LPrC}">[FPS] HELP</font>`)
				break;
			default:
				gui.parse([
					{ text: `<font color="${PrpC}" size="+24"><p align="right">REFRESH</p></font><br>`, command: "fps gui" },
					{ text: `<font color="${YlwC}" size="+21">Modes:</font>` }, { text: "&#09;&#09;" },
					{ text: `<font color="${mod.settings.Mode === 0 ? GrnC : RedC}" size="+18">[Mode 0]</font>`, command: "fps mode 0;fps gui" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.Mode === 1 ? GrnC : RedC}" size="+18">[Mode 1]</font>`, command: "fps mode 1;fps gui" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.Mode === 2 ? GrnC : RedC}" size="+18">[Mode 2]</font>`, command: "fps mode 2;fps gui" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.Mode === 3 ? GrnC : RedC}" size="+18">[Mode 3]</font>`, command: "fps mode 3;fps gui" }, { text: "&nbsp;&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.Fishing ? GrnC : RedC}" size="+18">[Fishing]</font><br><br>`, command: "fps fishing;fps gui" },
					{ text: `<font color="${YlwC}" size="+21">Hit:</font>` }, { text: "&#09;&#09;&#09;" },
					{ text: `<font color="${mod.settings.Hit_Other ? GrnC : RedC}" size="+18">[Players effect]</font>`, command: "fps hit other;fps gui" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.Hit_Me ? GrnC : RedC}" size="+18">[Own effect]</font>`, command: "fps hit me;fps gui" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.Hit_Damage ? GrnC : RedC}" size="+18">[Damage numbers]</font><br><br>`, command: "fps hit damage;fps gui" },
					{ text: `<font color="${YlwC}" size="+21">Hide:</font>` }, { text: "&#09;&#09;" },
					{ text: `<font color="${mod.settings.HideOthersSummons ? GrnC : RedC}" size="+17">[Players summons]</font>`, command: "fps summons;fps gui" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.HideMySummons ? GrnC : RedC}" size="+17">[Own summons]</font>`, command: "fps summons me;fps gui" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.HideFireworks ? GrnC : RedC}" size="+17">[Fireworks]</font><br>`, command: "fps fireworks;fps gui" }, { text: "&#09;&#09;&#09;" },
					{ text: `<font color="${mod.settings.ShowStyle ? GrnC : RedC}" size="+17">[Style]</font>`, command: "fps style;fps gui" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.Hideguildlogos ? GrnC : RedC}" size="+17">[Guild Logos]</font>`, command: "fps guildlogo;fps gui" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.HideBlacklistedDrop ? GrnC : RedC}" size="+17">[Drops]</font>`, command: "fps dropitem;fps gui" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.HideOwnBlacklistedAbns ? GrnC : RedC}" size="+17">[Dizziness]</font><br>`, command: "fps screenabns;fps gui" }, { text: "&#09;&#09;&#09;" },
					{ text: `<font color="${mod.settings.HideAllAbnormalities ? GrnC : RedC}" size="+16">[All Abnormals]</font>`, command: "fps abn all;fps gui" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.HideBlacklistedAbnormalities ? GrnC : RedC}" size="+16">[Abnormals BList]</font>`, command: "fps abn blacklist;fps gui" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.HideAllProjectiles ? GrnC : RedC}" size="+16">[All Projs]</font>`, command: "fps proj all;fps gui" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.HideBlacklistedProjectiles ? GrnC : RedC}" size="+16">[Projs BList]</font><br>`, command: "fps proj blacklist;fps gui" }, { text: "&#09;&#09;&#09;" },
					{ text: `<font color="${mod.settings.HideMonsterDeathAnimation ? GrnC : RedC}" size="+16">[NPCs Death Ani]</font>`, command: "fps monsterdeathani;fps gui" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.ActionScripts ? GrnC : RedC}" size="+16">[NPCs Zoom-in]</font>`, command: "fps npczoom;fps gui" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.HideBlacklistedNpcs ? GrnC : RedC}" size="+16">[NPCs BList]</font>`, command: "fps npc;fps gui" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.HideBlacklistedSkills ? GrnC : RedC}" size="+16">[Skills BList]</font><br><br>`, command: "fps skill blacklist;fps gui" },
					{ text: `<font color="${YlwC}" size="+21">Players:</font>` }, { text: "&#09;" },
					{ text: `<font color="${LBlC}" size="+18">[Hidden list]</font>`, command: "fps gui hide" }, { text: "&nbsp;&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${LBlC}" size="+18">[Shown list]</font><br><br>`, command: "fps gui show" },
					{ text: `<font color="${YlwC}" size="+21">Misc.</font>` }, { text: "&#09;&#09;" },
					{ text: `<font color="${LBlC}" size="+17">[Classes/Roles]</font>`, command: "fps gui role" }, { text: "&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${LBlC}" size="+17">[Skills]</font>`, command: "fps gui skills" }, { text: "&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${LBlC}" size="+17">[NPCs]</font>`, command: "fps gui npcMain" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${LBlC}" size="+17">[Abnormals]</font><br>`, command: "fps gui abn" }, { text: "&#09;&#09;&#09;" },
					{ text: `<font color="${LBlC}" size="+17">[Projectiles]</font>`, command: "fps gui proj" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.RaidAutoChange ? GrnC : RedC}" size="+16">[Raid auto state]</font>`, command: "fps raid;fps gui" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.OnlyParty ? GrnC : RedC}" size="+16">[Only Party]</font>`, command: "fps party;fps gui" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.PvpTraps ? GrnC : RedC}" size="+16">[PvpTraps]</font><br><br><br><br>`, command: "fps pvptraps;fps gui" },
					{ text: `<font color="${BluC}" size="+22">Quick Links:</font><br>` },
					{ text: `<font color="${DBlC}" size="+21">UI:</font>` }, { text: "&#09;&#09;" },
					{ text: `<font color="${PrpC}" size="+17">[Mail]</font>`, command: "fps quicklink parcel" }, { text: "&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${PrpC}" size="+17">[Broker]</font>`, command: "fps quicklink broker" }, { text: "&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${PrpC}" size="+17">[Talent]</font>`, command: "fps quicklink talents" }, { text: "&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${PrpC}" size="+17">[Dress]</font>`, command: "fps quicklink dressingroom" }, { text: "&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${PrpC}" size="+17">[Hat Style]</font>`, command: "fps quicklink hatrestyle" }, { text: "&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${PrpC}" size="+17">[Search-Engine]</font><br>`, command: "fps quicklink searchengine" },
					{ text: `<font color="${DBlC}" size="+21">Group:</font>` }, { text: "&#09;" },
					{ text: `<font color="${OngC}" size="+17">[Reset]</font>`, command: "fps quicklink reset" }, { text: "&nbsp;&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${CPKC}" size="+17">[Leave]</font>`, command: "fps quicklink drop" }, { text: "&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${CPKC}" size="+17">[Disband]</font><br>`, command: "fps quicklink disband" },
					{ text: `<font color="${DBlC}" size="+21">Extra:</font>` }, { text: "&#09;" },
					{ text: `<font color="${CPKC}" size="+17">[Lobby]</font>`, command: "fps quicklink lobby" }, { text: "&#09;&#09;&#09;&#09;&#09;&#09;&nbsp;" },
					{ text: `<font color="${HPkC}" size="+17">[!! Instant Exit]</font><br>`, command: "fps quicklink instantexit" }
				], `<font color="${LPrC}">[FPS] Options</font> | <font color="${RedC}" size="+16">Red</font><font color="${LPrC}" size="+16"> = disabled, <font color="${GrnC}" size="+16">Green</font><font color="${LPrC}" size="+16"> = enabled</font>`)
		}
	}


	// ~~~ * Gui Functions * ~~~ \\

	function SkillJsonSearch(value) {
		let keys = [],
			skilldata = [],
			skillIds = []
		skilldata.push(
			{ text: `<font color="${PrpC}" size="+24"><p align="right">MAIN MENU</p></font><br>`, command: "fps gui" },
			{ text: `<font color="${mod.settings.HideBlacklistedSkills ? GrnC : RedC}" size="+22"><p align="right">[Blacklisted skills are ${mod.settings.HideBlacklistedSkills ? 'Hidden' : 'Shown'}]</p></font><br>`, command: "fps skill blacklist;fps gui skills" },
			{ text: `<font color="${LBlC}" size="+19">Click skill to blacklist it.</font><br>` }
		)
		for (let key in SkillData[value]) {
			keys.push(key);
		}
		skillIds.push(Object.values(SkillData[value]))
		for (let i = 0; i < keys.length; i++) {
			skilldata.push({ command: `fps skill class ${value} ${skillIds[0][i]};fps gui class ${value}`, text: `<font color="${mod.settings.ClassesData[ClassNameFromID(value)].CD_SkillsBlacklist.includes(skillIds[0][i].toString()) ? GrnC : RedC}" size="+17">[${keys[i]}]</font><br>` })
		}
		return skilldata
	}

	function NpcJsonSearch(nameKey, array, arg, title) {
		TmpData = []
		TmpData.push({ text: `<font color="${PrpC}" size="+24"><p align="right">MAIN MENU</p></font><br><br>`, command: "fps gui" })
		for (let i = 0; i < array.length; i++) {
			if (array[i].Nm.startsWith(nameKey) && arg === "starts") TmpData.push({ command: `fps npc hide ${array[i].Hz} ${array[i].Ti};fps gui npc ${nameKey}`, text: `<font color="${mod.settings.NpcsBlacklist.some(arrVal => array[i].Hz == arrVal.zone && array[i].Ti == arrVal.templateId) ? GrnC : RedC}" size="+17">${array[i].Nm}</font><br>` });
			if (array[i].Nm.includes(nameKey) && arg === "search") TmpData.push({ command: `fps npc hide ${array[i].Hz} ${array[i].Ti};fps gui npcsearch ${nameKey}`, text: `<font color="${mod.settings.NpcsBlacklist.some(arrVal => array[i].Hz == arrVal.zone && array[i].Ti == arrVal.templateId) ? GrnC : RedC}" size="+17">${array[i].Nm} </font><br>` });
		}
		gui.parse(TmpData, `<font color="${LPrC}">[FPS] Options - NPCs</font> |  ${title}`)
		TmpData = []
	}

	function ClassNameFromID(name) {
		for (let Class_data of Object.keys(mod.settings.ClassesData)) {
			if (mod.settings.ClassesData[Class_data].name == name) return Class_data;
		}
	}

	// ~~~ * Command Functions * ~~~ \\

	function Msg(msg) {
		if (NotCP) mod.command.message(`<font color="${LPrC}">[FPS] ${msg}</font>`);
		else mod.command.message(`<font color="${LPrC}">${msg}</font>`);
	}

	function RemoveEntity(name) {
		let what, A = arguments, Al = A.length, Ax;
		while (Al > 1 && name.length) {
			what = A[--Al];
			while ((Ax = name.indexOf(what)) !== -1) name.splice(Ax, 1);
		}
		return name;
	}

	function HideSpecificPlayer(name) {
		for (let i in SUsers) {
			if (SUsers[i].name.toString().toLowerCase() === name.toLowerCase()) {
				mod.toClient('S_DESPAWN_USER', 3, { gameId: SUsers[i].gameId, type: 1 });
				HUsers[SUsers[i].gameId] = SUsers[i];
				return;
			}
		}
	}

	function HideSpecificNpc(hz, ti) {
		for (let i in SNpcs) {
			if (SNpcs[i].huntingZoneId === hz && SNpcs[i].templateId === ti) {
				mod.toClient('S_DESPAWN_NPC', 3, { gameId: SNpcs[i].gameId, loc: SNpcs[i].loc, type: 1, unk: 0 })
				HNpcs[SNpcs[i].gameId] = SNpcs[i];
				HNpcs[SNpcs[i].gameId].spawnType = 1;
				HNpcs[SNpcs[i].gameId].spawnScript = 0;
			}
		}
	}

	function ShowSpecificPlayer(name) {
		for (let i in HUsers) {
			if (HUsers[i].name.toString().toLowerCase() === name.toLowerCase()) {
				ModifyUserAppearance(HUsers[i]);
				mod.toClient('S_SPAWN_USER', 14, HUsers[i]);
				delete HUsers[i];
			}
		}
	}

	function ShowSpecificNpc(hz, ti) {
		for (let i in HNpcs) {
			if (HNpcs[i].huntingZoneId === hz && HNpcs[i].templateId === ti) {
				mod.toClient('S_SPAWN_NPC', 10, HNpcs[i]);
				delete HNpcs[i];
			}
		}
	}

	function HideAllPlayers() {
		if (!mod.settings.OnlyParty) {
			for (let i in SUsers) {
				mod.toClient('S_DESPAWN_USER', 3, { gameId: SUsers[i].gameId, type: 1 });
				HUsers[SUsers[i].gameId] = SUsers[i];
				HUsers[SUsers[i].gameId].spawnFx = 1;
			}
		}
	}

	function HideNpcs(type) {
		switch (type) {
			case 'own':
				for (let k in SNpcs) {
					if (EqGid(SNpcs[k].owner) && UserSumNPCs.includes(SNpcs[k].templateId) && SNpcs[k].huntingZoneId === 1023) {
						mod.toClient('S_DESPAWN_NPC', 3, { gameId: SNpcs[k].gameId, loc: SNpcs[k].loc, type: 1, unk: 0 })
						HNpcs[SNpcs[k].gameId] = SNpcs[k];
					}
				}
				break;
			case 'others':
				for (let k in SNpcs) {
					if (!EqGid(SNpcs[k].owner) && UserSumNPCs.includes(SNpcs[k].templateId) && SNpcs[k].huntingZoneId === 1023) {
						mod.toClient('S_DESPAWN_NPC', 3, { gameId: SNpcs[k].gameId, loc: SNpcs[k].loc, type: 1, unk: 0 })
						HNpcs[SNpcs[k].gameId] = SNpcs[k];
					}
				}
				break;
			case 'bl':
				for (let k in SNpcs) {
					for (let i = 0; i < mod.settings.NpcsBlacklist.length; i++) {
						if (SNpcs[k].huntingZoneId == mod.settings.NpcsBlacklist[i].zone && SNpcs[k].templateId == mod.settings.NpcsBlacklist[i].templateId) {
							mod.toClient('S_DESPAWN_NPC', 3, { gameId: SNpcs[k].gameId, loc: SNpcs[k].loc, type: 1, unk: 0 })
							HNpcs[SNpcs[k].gameId] = SNpcs[k];
						}
					}
				}
				break;
			case 'fish':
				for (let k in SNpcs) {
					if (FishingNpcs[SNpcs[k].huntingZoneId] && FishingNpcs[SNpcs[k].huntingZoneId].includes(SNpcs[k].templateId)) {
						mod.toClient('S_DESPAWN_NPC', 3, { gameId: SNpcs[k].gameId, loc: SNpcs[k].loc, type: 1, unk: 0 })
						HNpcs[SNpcs[k].gameId] = SNpcs[k];
					}
				}
				break;
			default: break;
		}
	}

	function ShowNpcs(type) {
		switch (type) {
			case 'own':
				for (let v in HNpcs) {
					if (EqGid(HNpcs[v].owner) && UserSumNPCs.includes(HNpcs[v].templateId) && HNpcs[v].huntingZoneId === 1023) {
						mod.toClient('S_SPAWN_NPC', 10, HNpcs[v]);
						delete HNpcs[v];
					}
				}
				break;
			case 'others':
				for (let v in HNpcs) {
					if (!EqGid(HNpcs[v].owner) && UserSumNPCs.includes(HNpcs[v].templateId) && HNpcs[v].huntingZoneId === 1023) {
						mod.toClient('S_SPAWN_NPC', 10, HNpcs[v]);
						delete HNpcs[v];
					}
				}
				break;
			case 'bl':
				for (let v in HNpcs) {
					for (let i = 0; i < mod.settings.NpcsBlacklist.length; i++) {
						if (HNpcs[v].huntingZoneId == mod.settings.NpcsBlacklist[i].zone && HNpcs[v].templateId == mod.settings.NpcsBlacklist[i].templateId) {
							mod.toClient('S_SPAWN_NPC', 10, HNpcs[v]);
							delete HNpcs[v];
						}
					}
				}
				break;
			case 'fish':
				for (let v in HNpcs) {
					if (FishingNpcs[HNpcs[v].huntingZoneId] && FishingNpcs[HNpcs[v].huntingZoneId].includes(HNpcs[v].templateId)) {
						mod.toClient('S_SPAWN_NPC', 10, HNpcs[v]);
						delete HNpcs[v];
					}
				}
				break;
			default: break;
		}
	}

	function ShowAllPlayers() {
		for (let i in HUsers) {
			ModifyUserAppearance(HUsers[i]);
			mod.toClient('S_SPAWN_USER', 14, HUsers[i]);
			delete HUsers[i];
		}
	}

	// ~~~ * Functions * ~~~ \\

	function EqGid(xg) {
		return (xg === MyGameId)
	}

	function ModifyUserAppearance(event) {
		let modified = false;

		if (mod.settings.ShowStyle) {
			event.ShowStyle = event.showFace = false;
			event.weaponEnchant = event.body = event.hand = event.feet = event.underwear = event.head = event.face = event.weapon = event.title = event.underwearDye = event.styleBackDye = event.styleHeadDye = event.styleFaceDye = event.styleBodyDye = event.weaponEnchant = event.styleHead = event.styleFace = event.styleBack = event.styleWeapon = event.styleBody = event.styleFootprint = 0;
			event.icons = [];
			if (event.mount) event.mount = 231;
			modified = true;
		}

		if (mod.settings.Hideguildlogos) {
			event.guildLogo = '';
			event.guildLogoId = 0;
			modified = true;
		}

		return modified;
	}

	function ModifySkillResult(event) {
		let modified = false;

		if (mod.settings.Hit_Me) {
			event.skill = { reserved: 0, npc: false, type: 0, huntingZoneId: 0, id: 0 };
			modified = true;
		}

		if (mod.settings.Hit_Damage) {
			event.damage = event.type = event.crit = event.noctEffect = event.stackExplode = 0;
			modified = true;
		}

		return modified;
	}

	function NpcBCheck(event) {
		let blocked = false;

		if (mod.settings.ShowStyle) event.repairable = false;

		if (mod.settings.HideBlacklistedNpcs) {
			for (let i = 0; i < mod.settings.NpcsBlacklist.length; i++) {
				if (event.huntingZoneId == mod.settings.NpcsBlacklist[i].zone && event.templateId == mod.settings.NpcsBlacklist[i].templateId) {
					HNpcs[event.gameId] = event;
					HNpcs[event.gameId].spawnType = 1;
					HNpcs[event.gameId].spawnScript = 0;
					blocked = true;
					break;
				}
			}
		}

		if (mod.settings.Fishing && FishingNpcs[event.huntingZoneId] && FishingNpcs[event.huntingZoneId].includes(event.templateId)) {
			HNpcs[event.gameId] = event;
			HNpcs[event.gameId].spawnType = 1;
			HNpcs[event.gameId].spawnScript = 0;
			blocked = true;
		}

		if (mod.settings.HideFireworks && event.huntingZoneId === 1023 && [60016000, 80037000].includes(event.templateId)) {
			HNpcs[event.gameId] = event;
			blocked = true;
		}

		if (UserSumNPCs.includes(event.templateId) && event.huntingZoneId === 1023) {
			if (EqGid(event.owner) && mod.settings.HideMySummons) {
				HNpcs[event.gameId] = event;
				HNpcs[event.gameId].spawnType = 1;
				HNpcs[event.gameId].spawnScript = 0;
				blocked = true;

			} else if (!EqGid(event.owner) && mod.settings.HideOthersSummons) {
				HNpcs[event.gameId] = event;
				HNpcs[event.gameId].spawnType = 1;
				HNpcs[event.gameId].spawnScript = 0;
				blocked = true;
			}
		}

		return blocked;
	}

	function ClassID(m) {
		return (m % 100)
	}

	function log(name, type, from, target, id) {
		console.log(`[\x1b[37m${new Date().toJSON().slice(11)}\x1b[39m] \x1b[91m->\x1b[39m \x1b[36m${name}\x1b[39m \x1b[35m${type}\x1b[39m \x1b[97m${from}\x1b[39m \x1b[32m'${target}'\x1b[39m: \x1b[94m\ID\x1b[39m "\x1b[31m${id}\x1b[39m\x1b[49m\x1b[0m"`);
	}

	function UpdateLoc(event) {
		mod.toClient('S_USER_LOCATION', 5, { gameId: event.gameId, loc: event.loc, dest: event.loc, w: event.w, speed: 300, type: 7 });
	}

	// ~~~* Hook functions * ~~~ \\

	function sLogin(event) {
		LastState = event.name === MyName ? LastState : null
		MyGameId = event.gameId;
		MyName = event.name;
		MyPlayerId = event.playerId;
		ProjDebug = false;
		AbnDebug = false;
	}

	function sLoadTopo() {
		SUsers = {};
		SNpcs = {};
		HUsers = {};
		HNpcs = {};
		if (ProjDebug) {
			ProjDebug = false
			Msg(`<font color="${HPkC}">Auto Disabled</font> projectile debug, to reduce the unneeded spam.`)
		}
		if (AbnDebug) {
			AbnDebug = false
			Msg(`<font color="${HPkC}">Auto Disabled</font> abnormalities debug, to reduce the unneeded spam.`)
		}
	}

	function sLeaveParty() {
		PMembers = []
		if (mod.settings.RaidAutoChange) {
			if (!LastState || mod.settings.Mode !== 2) return;
			mod.command.exec(`fps mode ${LastState}`)
			LastState = null;
		}
	}

	function sMountVehicle(event) {
		if (EqGid(event.gameId)) return;
		SUsers[event.gameId].mount = event.id
		if (HUsers[event.gameId]) HUsers[event.gameId].mount = event.id;
		if (mod.settings.ShowStyle) {
			event.id = 231
			return true;
		}
	}

	function sUnmountVehicle(event) {
		if (EqGid(event.gameId)) return;
		SUsers[event.gameId].mount = 0
		if (HUsers[event.gameId]) HUsers[event.gameId].mount = 0;
	}

	function cSetVisibleRange(event) {
		LastVrange = event.range
	}

	function sStartCooltimeItem(event) {
		if (event.cooldown === 0) return false;
	}

	function sStartActionScript(event) {
		if ([40000, 40001, 40002].includes(event.script)) return;
		if (mod.settings.ActionScripts) return false;
	}

	function sPcBangInventory(event) {
		for (let item of event.inventory)
			if ([152898, 184659, 201005, 201006, 201007, 201008, 201022, 855604].includes(item.item)) {
				item.cooldown = 0;
				return true;
			}
	}

	function sLoadingScreenControlInfo() {
		if (mod.settings.Mode >= 2) return false;
	}

	function sSocial(event) {
		if (!mod.settings.Fishing) return;
		if ([1, 2, 3, 31, 32, 33].includes(event.animation)) return false;
	}

	function sSystemMessage(event) { // TODO; probably delete this, as it's useless.
		if (!mod.settings.Fishing) return;
		const msg = mod.parseSystemMessage(event.message)
		if (msg.id === 'SMT_KOREAN_RATING_TEENAGER_PROHIBITED') return false;
		if (msg.id === 'SMT_FIELD_EVENT_WORLD_ANNOUNCE') return false;
	}

	function sPartyMatchLink() {
		if (mod.settings.Fishing) return false;
	}

	function sViewPartyInvite() {
		if (mod.settings.Fishing) return false;
	}

	/*function sQuestVillagerInfo() {
		if (mod.settings.Fishing) return false;
	}*/

	function sUpdateAchievementProgress() {
		if (mod.settings.Fishing) return false;
	}

	function sCurrentChannel(event) {
		if (!mod.settings.Fishing) return;
		if (event.zone === OldChan.z && event.channel === OldChan.c && event.type === OldChan.t) return false;
		OldChan.z = event.zone;
		OldChan.c = event.channel;
		OldChan.t = event.type;
	}

	function sItemCustomString(event) {
		if (event.customStrings.length === 0) return false;
	}

	function sGuildName(event) {
		if (mod.settings.Hideguildlogos) {
			event.guildEmblem = '';
			return true;
		}
	}

	function sApplyTitle(event) {
		if (EqGid(event.gameId)) return;
		if (mod.settings.ShowStyle) return false;
	}

	function sImageData() {
		if (mod.settings.Hideguildlogos) return false;
	}

	function sSpawnUser(event) {
		SUsers[event.gameId] = event;
		SUsers[event.gameId].spawnFx = 1;
		if (mod.settings.Mode === 3 || mod.settings.PlayersBlacklist.includes(event.name) || mod.settings.ClassesData[ClassID(event.templateId)].isHidden || (mod.settings.OnlyParty && !PMembers.includes(event.name))) {
			HUsers[event.gameId] = event;
			HUsers[event.gameId].spawnFx = 1;
			return false;
		}
		if (ModifyUserAppearance(event)) return true;
	}

	function sSpawnUserfn(event) {
		if (ModifyUserAppearance(event)) return true;
	}

	function sDespawnUser(event) {
		delete HUsers[event.gameId];
		delete SUsers[event.gameId];
	}

	function sUserLocation(event) {
		if (SUsers[event.gameId]) {
			SUsers[event.gameId].loc = event.dest
			SUsers[event.gameId].w = event.w
		}
		if (HUsers[event.gameId]) {
			HUsers[event.gameId].loc = event.dest;
			HUsers[event.gameId].w = event.w
			return false;
		}
	}

	function sUserStatus(event) {
		if (SUsers[event.gameId]) SUsers[event.gameId].status = event.status
		if (HUsers[event.gameId]) {
			HUsers[event.gameId].status = event.status
			return false;
		}
	}

	function sDeadLocation(event) {
		if (SUsers[event.gameId]) SUsers[event.gameId].loc = event.loc
		if (HUsers[event.gameId]) HUsers[event.gameId].loc = event.loc
	}

	function sUserMoveType() { return false; }

	function sPartyMemberList(event) {
		event.members.map(value => PMembers.push(value.name))
		if (mod.settings.RaidAutoChange) {
			if (event.members.length >= 18) {
				if (mod.settings.Mode === 3 || (LastState && mod.settings.Mode === 2)) return;
				LastState = mod.settings.Mode
				mod.command.exec("fps mode 2")
			} else {
				if (!LastState || mod.settings.Mode !== 2) {
					LastState = null;
					return;
				}
				mod.command.exec(`fps mode ${LastState}`)
				LastState = null;
			}
		}
	}

	function sUserAppearanceChange(event) {
		if (EqGid(event.id)) return;
		if (mod.settings.ShowStyle) return false;
	}

	function sUserExternalChange(event) {
		if (EqGid(event.gameId)) return;
		if (mod.settings.ShowStyle) return false;
	}

	function sUnicastTransformData(event) {
		if (!event.gameId || EqGid(event.gameId)) return;
		if (mod.settings.ShowStyle) return false;
		if (mod.settings.Hideguildlogos) {
			event.guildLogo = '';
			return true;
		}
	}

	function sSpawnNpc(event) {
		SNpcs[event.gameId] = event;
		SNpcs[event.gameId].spawnType = 1;
		SNpcs[event.gameId].spawnScript = 0;
		if (NpcBCheck(event)) return false;
		if (mod.settings.ShowStyle) {
			event.repairable = false;
			return true;
		}
	}

	function sDespawnNpc(event) {
		delete HNpcs[event.gameId];
		delete SNpcs[event.gameId];
		if (!mod.settings.HideMonsterDeathAnimation || event.type !== 5) return;
		event.type = 1;
		return true;
	}

	function sNpcLocation(event) {
		if (SNpcs[event.gameId]) {
			SNpcs[event.gameId].loc = event.dest
			SNpcs[event.gameId].w = event.w
		}
		if (HNpcs[event.gameId]) {
			HNpcs[event.gameId].loc = event.dest
			HNpcs[event.gameId].w = event.w
			return false;
		}
	}

	function sCreatureRotate(event) {
		if (SNpcs[event.gameId]) SNpcs[event.gameId].w = event.w
		if (HNpcs[event.gameId]) {
			HNpcs[event.gameId].w = event.w
			return false;
		}
	}

	function sFearMoveStage(event) {
		if ((!EqGid(event.target) && mod.settings.Mode >= 2) || HUsers[event.target] || HNpcs[event.target]) return false;
	}

	function sFearMoveEnd(event) {
		if ((!EqGid(event.target) && mod.settings.Mode >= 2) || HUsers[event.target] || HNpcs[event.target]) return false;
	}

	function sAbnormalityBegin(event) {
		if (AbnDebug) {
			if (EqGid(event.target)) log('Abnormality', 'Applied', 'on', MyName, event.id)
			if (EqGid(event.source)) log('Abnormality', 'Started', 'from', MyName, event.id)
			if (SUsers[event.target]) log('Abnormality', 'Applied', 'on', SUsers[event.target].name, event.id)
			if (SUsers[event.source]) log('Abnormality', 'Started', 'from', SUsers[event.source].name, event.id)
		}
		if (EqGid(event.target)) {
			if (mod.settings.HideOwnBlacklistedAbns && mod.settings.OwnAbnormalsBlacklist.includes(event.id)) return false;
			return;
		}
		if (HUsers[event.target] || HNpcs[event.target]) return false;
		if (mod.settings.Fishing && event.id === 9943049) return false;
		if (mod.settings.HideBlacklistedAbnormalities && mod.settings.AbnormalitiesBlacklist.includes(event.id)) return false;
		if (mod.settings.HideAllAbnormalities && (SUsers[event.target] || SUsers[event.source] || mod.settings.AbnormalitiesBlacklist.includes(event.id))) return false;
	}

	function sAbnormalityRefresh(event) {
		if (HUsers[event.target] || HNpcs[event.target]) return false;
		if ((mod.settings.HideBlacklistedAbnormalities || mod.settings.HideAllAbnormalities) && (SUsers[[10306, 10316, 12001, 12003, 22040, 12120, 12130].includes(event.target)] || SUsers[[10306, 10316, 12001, 12003, 22040, 12120, 12130].includes(event.source)])) return false;
	}

	function sAbnormalityEnd(event) {
		if (mod.settings.Fishing && event.id === 9943049) return false;
	}

	function sAbnormalityFail(event) {
		if ([3000021, 99020000, 99020010].includes(event.id)) return false;
	}

	function sChangeRelation(event) {
		if (SUsers[event.target]) SUsers[event.target].relation = event.relation
		if (HUsers[event.target]) {
			HUsers[event.target].relation = event.relation
			return false;
		}
		if (SNpcs[event.target]) SNpcs[event.target].relation = event.relation
		if (HNpcs[event.target]) {
			HNpcs[event.target].relation = event.relation
			return false;
		}
	}

	function sActionStage(event) {
		if (EqGid(event.gameId) || !SUsers[event.gameId]) return;
		if ((mod.settings.Mode >= 2) || HUsers[event.gameId] || (mod.settings.HideBlacklistedSkills && mod.settings.ClassesData[ClassID(event.templateId)].CD_SkillsBlacklist.includes(Math.floor(event.skill.id / 10000).toString())) || mod.settings.ClassesData[ClassID(event.templateId)].CD_HideBlacklistedSkills) {
			UpdateLoc(event);
			return false;
		}
	}

	function sStartUserProjectile(event) {
		if (ProjDebug) {
			if (EqGid(event.gameId)) log('Projectile', 'Started', 'from', MyName, event.skill.id)
			if (SUsers[event.gameId]) log('Projectile', 'Started', 'from', SUsers[event.gameId].name, event.skill.id)
		}
		if (mod.settings.PvpTraps && PvPProjs.includes(event.skill.id)) return;
		if ((mod.settings.HideBlacklistedProjectiles || mod.settings.HideAllProjectiles) && mod.settings.ProjectilesBlacklist.includes(event.skill.id)) return false;
		if (!EqGid(event.gameId) && SUsers[event.gameId] && (HUsers[event.gameId] || mod.settings.Mode > 0 || mod.settings.HideAllProjectiles)) return false;
	}

	function sSpawnProjectile(event) {
		if (ProjDebug) {
			if (EqGid(event.gameId)) log('Projectile', 'Spawned', 'from', MyName, event.skill.id)
			if (SUsers[event.gameId]) log('Projectile', 'Spawned', 'from', SUsers[event.gameId].name, event.skill.id)
		}
		if (mod.settings.PvpTraps && PvPProjs.includes(event.skill.id)) return;
		if ((mod.settings.HideBlacklistedProjectiles || mod.settings.HideAllProjectiles) && mod.settings.ProjectilesBlacklist.includes(event.skill.id)) return false;
		if (!EqGid(event.gameId) && SUsers[event.gameId] && (HUsers[event.gameId] || mod.settings.Mode > 0 || mod.settings.HideAllProjectiles)) return false;
	}

	function sEachSkillResult(event) {
		if ((EqGid(event.source) || EqGid(event.owner)) && ModifySkillResult(event)) return true;
		if (!EqGid(event.target) && mod.settings.Hit_Other && (SUsers[event.owner] || SUsers[event.source])) {
			event.skill = { reserved: 0, npc: false, type: 0, huntingZoneId: 0, id: 0 };
			event.id = event.damage = event.type = event.crit = event.noctEffect = event.crit = event.stackExplode = event.blocked = event.reaction.skill = 0;
			return true;
		}
	}

	function sSpawnDropItem(event) {
		if (EqGid(event.source)) return;
		if (mod.settings.HideBlacklistedDrop) {
			for (let i in event.owners) {
				if (event.owners[i].playerId.toString() === MyPlayerId.toString()) return;
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

	mod.hook('S_LOGIN', 12, sLogin)
	mod.hook('S_LOAD_TOPO', 'raw', sLoadTopo)
	mod.hook('S_LEAVE_PARTY', 'raw', sLeaveParty)
	mod.hook('S_MOUNT_VEHICLE', 2, sMountVehicle)
	mod.hook('S_UNMOUNT_VEHICLE', 2, sUnmountVehicle)
	mod.hook('C_SET_VISIBLE_RANGE', 1, cSetVisibleRange)
	mod.hook('S_START_COOLTIME_ITEM', 1, sStartCooltimeItem)
	mod.hook('S_START_ACTION_SCRIPT', 3, sStartActionScript)
	mod.hook('S_PCBANGINVENTORY_DATALIST', 1, sPcBangInventory)
	mod.hook('S_LOADING_SCREEN_CONTROL_INFO', 'raw', sLoadingScreenControlInfo)

	mod.hook('S_SOCIAL', 1, sSocial)
	mod.hook('S_SYSTEM_MESSAGE', 1, sSystemMessage)
	mod.hook('S_PARTY_MATCH_LINK', 'raw', sPartyMatchLink)
	mod.hook('S_VIEW_PARTY_INVITE', 'raw', sViewPartyInvite)
	//mod.hook('S_QUEST_VILLAGER_INFO', 'raw', sQuestVillagerInfo) opcode currently not public, but soon it will be.
	mod.hook('S_UPDATE_ACHIEVEMENT_PROGRESS', 'raw', sUpdateAchievementProgress)
	mod.hook('S_CURRENT_CHANNEL', 2, sCurrentChannel)
	mod.hook('S_ITEM_CUSTOM_STRING', 2, sItemCustomString)

	mod.hook('S_GUILD_NAME', 1, sGuildName)
	mod.hook('S_APPLY_TITLE', 2, sApplyTitle)
	mod.hook('S_IMAGE_DATA', 'raw', sImageData)

	mod.hook('S_SPAWN_USER', 14, { order: 9999 }, sSpawnUser)
	mod.hook('S_SPAWN_USER', 14, { order: 99999, filter: { fake: null } }, sSpawnUserfn)
	mod.hook('S_DESPAWN_USER', 3, { order: 999 }, sDespawnUser)
	mod.hook('S_USER_LOCATION', 5, sUserLocation)
	mod.hook('S_USER_STATUS', 3, sUserStatus)
	mod.hook('S_DEAD_LOCATION', 2, sDeadLocation)
	mod.hook('S_USER_MOVETYPE', 'raw', sUserMoveType)
	mod.hook('S_PARTY_MEMBER_LIST', 7, sPartyMemberList)
	mod.hook('S_USER_APPEARANCE_CHANGE', 1, { order: 9999 }, sUserAppearanceChange)
	mod.hook('S_USER_EXTERNAL_CHANGE', 7, { order: 9999 }, sUserExternalChange)
	mod.hook('S_UNICAST_TRANSFORM_DATA', 5, { order: 99999 }, sUnicastTransformData)

	mod.hook('S_SPAWN_NPC', 10, sSpawnNpc)
	mod.hook('S_DESPAWN_NPC', 3, sDespawnNpc)
	mod.hook('S_NPC_LOCATION', 3, sNpcLocation)
	mod.hook('S_CREATURE_ROTATE', 2, sCreatureRotate)
	mod.hook('S_FEARMOVE_STAGE', 1, sFearMoveStage)
	mod.hook('S_FEARMOVE_END', 1, sFearMoveEnd)

	mod.hook('S_ABNORMALITY_BEGIN', 3, { order: 999 }, sAbnormalityBegin)
	mod.hook('S_ABNORMALITY_REFRESH', 1, { order: 999 }, sAbnormalityRefresh)
	mod.hook('S_ABNORMALITY_FAIL', 1, sAbnormalityFail)
	mod.hook('S_ABNORMALITY_END', 1, sAbnormalityEnd)
	mod.hook('S_CHANGE_RELATION', 1, sChangeRelation)

	mod.hook('S_ACTION_STAGE', 9, { order: 999 }, sActionStage)
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

	mod.command.add(['fps', '!fps', 'fps-utils', '!fps-utils'], (key, arg, arg2, arg3) => {
		switch (key) {
			case "g":
			case "gui":
				GuiHandler(arg, arg2);
				break;
			case "0":
				mod.command.exec('fps mode 0');
				break;
			case "1":
				mod.command.exec('fps mode 1');
				break;
			case "2":
				mod.command.exec('fps mode 2')
				break;
			case "3":
				mod.command.exec('fps mode 3');
				break;
			case "mod":
			case "mode":
			case "state":
				switch (arg) {
					case "0":
					case "off":
					case "zero":
						if (mod.settings.Mode === 3) ShowAllPlayers();
						mod.settings.Mode = 0;
						mod.settings.HideAllAbnormalities = false;
						mod.settings.HideAllProjectiles = false;
						mod.settings.Hit_Other = false;
						Msg(`<font color="${RedC}">Mode 0</font>.`);
						break;
					case "1":
					case "one":
						if (mod.settings.Mode === 3) ShowAllPlayers();
						mod.settings.Mode = 1;
						mod.settings.HideAllAbnormalities = false;
						mod.settings.HideAllProjectiles = true;
						mod.settings.Hit_Other = true;
						Msg(`<font color="${BnzC}">Mode 1</font>.`);
						break;
					case "2":
					case "two":
						if (mod.settings.Mode === 3) ShowAllPlayers();
						mod.settings.Mode = 2;
						mod.settings.HideAllAbnormalities = true;
						mod.settings.HideAllProjectiles = true;
						mod.settings.Hit_Other = true;
						Msg(`<font color="${SlvC}">Mode 2</font>.`);
						break;
					case "3":
					case "three":
						HideAllPlayers();
						mod.settings.Mode = 3;
						mod.settings.HideAllAbnormalities = true;
						mod.settings.HideAllProjectiles = true;
						mod.settings.Hit_Other = true;
						mod.settings.OnlyParty = false;
						Msg(`<font color="${GldC}">Mode 3</font>.`);
						break;
					default:
						Msg(`<font color="${GryC}">Invalid" ${arg}"</font>.`);
						Msg(`Modes: "<font color="${PnkC}">[0, 1, 2, 3]</font>.`);
						break;
				}
				break;
			case "hide":
				if (typeof arg === "string" && arg !== null) {
					if (mod.settings.PlayersBlacklist.includes(arg)) return Msg(`Player '${arg}' <font color="${RedC}">Already hidden</font>.`);
					else
						if ((mod.settings.ClassesNames.includes(arg) && !mod.settings.ClassesBlacklist.includes(arg)) || (mod.settings.RolesNames.includes(arg) && !mod.settings.RolesBlacklist.includes(arg))) {
							for (let i in mod.settings.ClassesData) {
								if ((mod.settings.ClassesData[i].name === arg || mod.settings.ClassesData[i].role.includes(arg)) && mod.settings.ClassesData[i].isHidden !== true) {
									mod.settings.ClassesData[i].isHidden = true;
									if (mod.settings.ClassesData[i].name === arg) mod.settings.ClassesBlacklist.push(arg);
									if (mod.settings.ClassesData[i].role.includes(arg)) mod.settings.RolesBlacklist.push(arg);
									let classtohide = mod.settings.ClassesData[i].model;
									for (let i in SUsers) {
										if (ClassID(SUsers[i].templateId) === classtohide) HideSpecificPlayer(SUsers[i].name);
									}
								}
							}
							Msg(`Class/Role ${arg} <font color="${GrnC}">Hidden</font>.`);
							return;
						} else if (mod.settings.ClassesBlacklist.includes(arg) || mod.settings.RolesBlacklist.includes(arg)) return Msg(`Class/Role '${arg}' <font color="${RedC}">Already hidden</font>.`);
					Msg(`Player '${arg}' <font color="${GrnC}">Hidden</font>.`);
					mod.settings.PlayersBlacklist.push(arg);
					HideSpecificPlayer(arg);
				} else Msg(`<font color="${GryC}">Invalid ${arg2}</font>.`);
				break;
			case "show":
				if (typeof arg === "string" && arg !== null) {
					if (mod.settings.PlayersBlacklist.includes(arg)) {
						ShowSpecificPlayer(arg);
						RemoveEntity(mod.settings.PlayersBlacklist, arg);
						Msg(`Player '${arg}' <font color="${RedC}">Shown</font>.`);
						return;
					}
					if ((mod.settings.ClassesNames.includes(arg) && mod.settings.ClassesBlacklist.includes(arg)) || (mod.settings.RolesBlacklist.includes(arg) && mod.settings.RolesNames.includes(arg))) {
						for (let i in mod.settings.ClassesData) {
							if (mod.settings.ClassesData[i].name === arg || mod.settings.ClassesData[i].role.includes(arg)) {
								if (mod.settings.ClassesData[i].name === arg) RemoveEntity(mod.settings.ClassesBlacklist, arg);
								if (mod.settings.ClassesData[i].role.includes(arg)) RemoveEntity(mod.settings.RolesBlacklist, arg);
								mod.settings.ClassesData[i].isHidden = false;
								let classToShow = mod.settings.ClassesData[i].model;
								for (let i in HUsers) {
									if (ClassID(HUsers[i].templateId) === classToShow) ShowSpecificPlayer(HUsers[i].name);
								}
							}
						}
						Msg(`Class '${arg}' <font color="${RedC}">Shown</font>.`);
					} else if (!mod.settings.ClassesBlacklist.includes(arg) || !mod.settings.RolesBlacklist.includes(arg)) Msg(`Class/Role '${arg}' <font color="${RedC}">Already shown</font>.`);
					else if (!mod.settings.PlayersBlacklist.includes(arg)) Msg(`Player '${arg}' <font color="${RedC}">Already shown</font>.`);
					else Msg(`<font color="${GryC}">Invalid ${arg2}</font>.`);
				}
				break;
			case "party":
				if (mod.settings.Mode === 3) return Msg(`<font color="${RedC}">You've to disable mode 3 first</font>.`);
				mod.settings.OnlyParty = !mod.settings.OnlyParty
				if (mod.settings.OnlyParty) {
					for (let i in SUsers) {
						if (!PMembers.includes(SUsers[i].name)) {
							mod.toClient('S_DESPAWN_USER', 3, { gameId: SUsers[i].gameId, type: 1 })
							HUsers[SUsers[i].gameId] = SUsers[i];
						}
					}
				} else ShowAllPlayers();
				Msg(`Everyone but party ${mod.settings.OnlyParty ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
				break;
			case "raid":
				mod.settings.RaidAutoChange = !mod.settings.RaidAutoChange
				Msg(`Raid auto-state ${mod.settings.RaidAutoChange ? `<font color="${GrnC}">Enabled</font>` : `<font color="${RedC}">Disabled</font>`}.`);
				break;
			case "pvptraps":
				mod.settings.PvpTraps = !mod.settings.PvpTraps;
				Msg(`Pvp Traps are ${mod.settings.PvpTraps ? `<font color="${GrnC}">Shown<font color="${PnkC}">(not affected by hide all projectiles)</font></font>` : `<font color="${RedC}">Normal<font color="${PnkC}">(affected by hide all projectiles)</font></font>`}.`);
				break;
			case "list":
				Msg(`<font color="${PnkC}">Hidden players: ${mod.settings.PlayersBlacklist}</font>.`);
				Msg(`<font color="${PnkC}">Hidden classes: ${mod.settings.ClassesBlacklist}</font>.`);
				Msg(`<font color="${PnkC}">Hidden roles: ${mod.settings.RolesBlacklist}</font>.`);
				break;
			case "summons":
			case "sums":
				switch (arg) {
					case "me":
						mod.settings.HideMySummons = !mod.settings.HideMySummons;
						mod.settings.HideMySummons ? HideNpcs('own') : ShowNpcs('own');
						Msg(`Own summoned NPCs ${mod.settings.HideMySummons ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
						break;
					default:
						mod.settings.HideOthersSummons = !mod.settings.HideOthersSummons;
						mod.settings.HideOthersSummons ? HideNpcs('others') : ShowNpcs('others');
						Msg(`Others summoned NPCs ${mod.settings.HideOthersSummons ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
						break;
				}
				break;
			case "skills":
			case "skill":
				switch (arg) {
					case "blacklist":
						mod.settings.HideBlacklistedSkills = !mod.settings.HideBlacklistedSkills;
						Msg(`Blacklisted skills ${mod.settings.HideBlacklistedSkills ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
						break;
					case "class":
						if (mod.settings.ClassesNames.includes(arg2)) {
							for (let i in mod.settings.ClassesData) {
								if (mod.settings.ClassesData[i].name === arg2) {
									if (arg3 != null && !isNaN(arg3) && arg3 < 50) {
										if (mod.settings.ClassesData[i].CD_SkillsBlacklist.includes(arg3)) {
											let index = mod.settings.ClassesData[i].CD_SkillsBlacklist.indexOf(arg3)
											if (index !== -1) {
												mod.settings.ClassesData[i].CD_SkillsBlacklist.splice(index, 1)
												Msg(`Skill ID '${arg3}' <font color="${RedC}">Shown</font> for class '${arg2}'.`)
											}
											return;
										} else {
											mod.settings.ClassesData[i].CD_SkillsBlacklist.push(arg3)
											Msg(`Skill ID '${arg3}' <font color="${GrnC}">Hidden</font> for class '${arg2}'.`)
											return;
										}
									} else {
										mod.settings.ClassesData[i].CD_HideBlacklistedSkills = !mod.settings.ClassesData[i].CD_HideBlacklistedSkills;
										Msg(`Skills for '${arg2}' class ${mod.settings.ClassesData[i].CD_HideBlacklistedSkills ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
										return;
									}
								}
							}
						} else Msg(`<font color="${RedC}">Class ${arg2} not found</font>.`);
						break;
				}
				break;
			case "npcs":
			case "npc":
				if (arg === 'hide') {
					if (!arg2 || !arg3) {
						mod.settings.HideBlacklistedNpcs = !mod.settings.HideBlacklistedNpcs;
						Msg(`Blacklisted NPCs ${mod.settings.HideBlacklistedNpcs ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
						break;
					}
					if (FishingNpcs[Number(arg2)] && FishingNpcs[Number(arg2)].includes(Number(arg3))) return Msg(`<font color="${RedC}">You can't show or hide blocked fishing npcs by this option, use "<font color="${PnkC}">Fishing</font>" button instead!</font>`);
					let found = mod.settings.NpcsBlacklist.some(s => s.zone === arg2 && s.templateId === arg3);
					if (found) {
						if (mod.settings.HideBlacklistedNpcs) ShowSpecificNpc(Number(arg2), Number(arg3));
						Msg(`NPC HntZone '${arg2}', TmpId '${arg3}' <font color="${RedC}">Removed from the blacklist</font>.`)
						mod.settings.NpcsBlacklist = mod.settings.NpcsBlacklist.filter(obj => obj.zone != arg2 || obj.templateId != arg3);
					} else {
						if (mod.settings.HideBlacklistedNpcs) HideSpecificNpc(Number(arg2), Number(arg3));
						Msg(`NPC HntZone '${arg2}', TmpId '${arg3}' <font color="${GrnC}">Added to the blacklist</font>.`)
						mod.settings.NpcsBlacklist.push({ zone: arg2, templateId: arg3 })
					}
					return;
				} else {
					mod.settings.HideBlacklistedNpcs = !mod.settings.HideBlacklistedNpcs;
					mod.settings.HideBlacklistedNpcs ? HideNpcs('bl') : ShowNpcs('bl');
					Msg(`Blacklisted NPCs ${mod.settings.HideBlacklistedNpcs ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
				}
				break;
			case "hit":
				switch (arg) {
					case "me":
						mod.settings.Hit_Me = !mod.settings.Hit_Me;
						Msg(`Own hits effect ${mod.settings.Hit_Me ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
						break;
					case "other":
						mod.settings.Hit_Other = !mod.settings.Hit_Other;
						Msg(`Players hit effect ${mod.settings.Hit_Other ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
						break;
					case "damage":
						mod.settings.Hit_Damage = !mod.settings.Hit_Damage;
						Msg(`Damage numbers ${mod.settings.Hit_Damage ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
						break;
					default:
						Msg(`<font color="${GryC}">Invalid &#40;hit&#41; '${arg}'</font>.`);
						break;
				}
				break;
			case "fireworks":
			case "firework":
				mod.settings.HideFireworks = !mod.settings.HideFireworks;
				Msg(`Fireworks ${mod.settings.HideFireworks ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
				break;
			case "abn":
			case "effects":
			case "abnormal":
			case "abnormalities":
				switch (arg) {
					case "all":
						mod.settings.HideAllAbnormalities = !mod.settings.HideAllAbnormalities;
						Msg(`All Abnormalities ${mod.settings.HideAllAbnormalities ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
						break;
					case "blacklist":
						if (!arg2 || !arg3) {
							mod.settings.HideBlacklistedAbnormalities = !mod.settings.HideBlacklistedAbnormalities;
							Msg(`Blacklisted Abnormalities ${mod.settings.HideBlacklistedAbnormalities ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
							break;
						} else if (arg2 && arg3) {
							arg3 = Number(arg3);
							if (!mod.settings.AbnormalitiesBlacklist.includes(arg3)) {
								if (arg2 === 'add') {
									mod.settings.AbnormalitiesBlacklist.push(arg3)
									Msg(`Blacklisted Abnormalities <font color="${GrnC}">added '${arg3}'</font>..`)
									return;
								} else if (arg2 === 'remv') return Msg(`Blacklisted Abnormalities <font color="${RedC}">can't remove '${arg3}' as it's not there</font>.`);

							} else if (mod.settings.AbnormalitiesBlacklist.includes(arg3)) {
								if (arg2 === 'add') return Msg(`Blacklisted Abnormalities <font color="${RedC}">can't add '${arg3}' as it's already there</font>.`);
								else if (arg2 === 'remv') {
									let index = mod.settings.AbnormalitiesBlacklist.indexOf(arg3)
									if (index !== -1) {
										mod.settings.AbnormalitiesBlacklist.splice(index, 1)
										Msg(`Blacklisted Abnormalities <font color="${RedC}">removed '${arg3}'</font>.`);
										return;
									}
								}
							} else return Msg(`<font color="${GryC}">Invalid &#40;abnormalities Blacklist&#41; '${arg}'</font>.`);
						}
						break;
					case "log":
					case "debug":
						AbnDebug = !AbnDebug;
						if (AbnDebug) Msg(`Abnormalities debug <font color="${GrnC}">started</font>, check your proxy console for details.`)
						else Msg(`Abnormalities debug <font color="${RedC}">stopped</font>.`);
						break;
					default:
						Msg(`<font color="${GryC}">Invalid &#40;abnormalities&#41; '${arg}'</font>.`);
						break;
				}
				break;
			case "guildlogo":
				if (SwitchCd) return Msg(`<font color="${PnkC}">Try again in 3 seconds</font>.`);
				mod.settings.Hideguildlogos = !mod.settings.Hideguildlogos;
				mod.toServer('C_SET_VISIBLE_RANGE', 1, { range: 0 });
				setTimeout(() => mod.toServer('C_SET_VISIBLE_RANGE', 1, { range: LastVrange }), 1500);
				SwitchCd = true;
				setTimeout(() => SwitchCd = false, 2800);
				Msg(`Guild Logos ${mod.settings.Hideguildlogos ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
				break;
			case "costume":
			case "style":
				if (SwitchCd) return Msg(`<font color="${PnkC}">Try again in 3 seconds</font>.`);
				mod.settings.ShowStyle = !mod.settings.ShowStyle;
				mod.toServer('C_SET_VISIBLE_RANGE', 1, { range: 0 })
				setTimeout(() => mod.toServer('C_SET_VISIBLE_RANGE', 1, { range: LastVrange }), 1500);
				SwitchCd = true
				setTimeout(() => SwitchCd = false, 2800);
				Msg(`Style of NPCs & others ${mod.settings.ShowStyle ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
				break;
			case "proj":
			case "projectile":
				switch (arg) {
					case "all":
						mod.settings.HideAllProjectiles = !mod.settings.HideAllProjectiles;
						Msg(`Projectiles ${mod.settings.HideAllProjectiles ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
						break;
					case "blacklist":
						if (!arg2 || !arg3) {
							mod.settings.HideBlacklistedProjectiles = !mod.settings.HideBlacklistedProjectiles;
							Msg(`Blacklisted projectile ${mod.settings.HideBlacklistedProjectiles ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
							break;
						} else if (arg2 && arg3) {
							arg3 = Number(arg3);
							if (!mod.settings.ProjectilesBlacklist.includes(arg3)) {
								if (arg2 === 'add') {
									mod.settings.ProjectilesBlacklist.push(arg3)
									Msg(`Blacklisted projectile <font color="${GrnC}">added '${arg3}'</font>.`)
									return;
								} else if (arg2 === 'remv') return Msg(`Blacklisted projectile <font color="${RedC}">can't remove '${arg3}' as it's not there</font>.`);
							} else if (mod.settings.ProjectilesBlacklist.includes(arg3)) {
								if (arg2 === 'add') return Msg(`Blacklisted projectile <font color="${RedC}">can't add '${arg3}' as it's already there</font>.`);
								else if (arg2 === 'remv') {
									let index = mod.settings.ProjectilesBlacklist.indexOf(arg3)
									if (index !== -1) {
										mod.settings.ProjectilesBlacklist.splice(index, 1)
										Msg(`Blacklisted projectile <font color="${RedC}">removed '${arg3}'</font>.`)
										return;
									}
								}
							} else return Msg(`<font color="${GryC}">Invalid &#40;projectile Blacklist&#41; '${arg}'</font>.`);
						}
						break;
					case "log":
					case "debug":
						ProjDebug = !ProjDebug
						if (ProjDebug) Msg(`Projectile debug <font color="${GrnC}">started</font>, check your proxy console for details.`)
						else Msg(`Projectile debug <font color="${RedC}">stopped</font>.`);
						break;
					default:
						Msg(`<font color="${GryC}">Invalid &#40;projectile&#41; '${arg}'</font>.`);
						break;
				}
				break;
			case "quicklink":
				switch (arg) {
					case "mail": case "parcel":
						mod.toServer('C_REQUEST_CONTRACT', 1, { type: 8 });
						break;
					case "talent": case "talents":
						mod.toServer('C_REQUEST_CONTRACT', 1, { type: 77 });
						break;
					case "broker":
						mod.toClient('S_NPC_MENU_SELECT', 1, { type: 28 });
						break;
					case "dress": case "dressingroom":
						mod.toServer('C_REQUEST_CONTRACT', 1, { type: 76 });
						break;
					case "hat": case "hatrestyle":
						mod.toServer('C_REQUEST_CONTRACT', 1, { type: 90 });
						break;
					case "lobby":
						mod.toServer('C_RETURN_TO_LOBBY', 1, {});
						break;
					case "exit": case "instantexit":
						mod.toClient('S_EXIT', 3, { category: 0, code: 0 });
						break;
					case "drop":
						mod.toServer('C_LEAVE_PARTY', 1, {});
						break;
					case "disband":
						mod.toServer('C_DISMISS_PARTY', 1, {});
						break;
					case "reset":
						mod.toServer('C_RESET_ALL_DUNGEON', 1, {});
						break;
					case "searchengine":
						mod.toClient('S_SHOW_AWESOMIUMWEB_SHOP', 1, { link: 'https://duckduckgo.com/' });
						break;
					default:
						Msg(`<font color="${GryC}">Invalid &#40;quicklink&#41; '${arg}'</font>.`);
						break;
				}
				break;
			case "npczoom":
				mod.settings.ActionScripts = !mod.settings.ActionScripts;
				Msg(`Npc zoom-ins ${mod.settings.ActionScripts ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
				break;
			case "dropitem":
				if (arg === 'hide') {
					if (!arg2) {
						mod.settings.HideBlacklistedDrop = !mod.settings.HideBlacklistedDrop;
						Msg(`Blacklisted Drops ${mod.settings.HideBlacklistedDrop ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
						break;
					}
					arg2 = Number(arg2);
					let found = mod.settings.DropBlacklist.some(s => s === arg2);
					if (found) {
						Msg(`Drops id '${arg2}' <font color="${RedC}">Removed from the blacklist</font>.`)
						mod.settings.DropBlacklist = mod.settings.DropBlacklist.filter(obj => obj != arg2)
					} else {
						Msg(`Drops id '${arg2}' <font color="${GrnC}">Added to the blacklist</font>.`)
						mod.settings.DropBlacklist.push(arg2)
					}
					return;
				} else mod.settings.HideBlacklistedDrop = !mod.settings.HideBlacklistedDrop;
				Msg(`Blacklisted Drops ${mod.settings.HideBlacklistedDrop ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
				break;
			case "monsterdeathani":
			case "monstersdeathani":
				mod.settings.HideMonsterDeathAnimation = !mod.settings.HideMonsterDeathAnimation;
				Msg(`Monsters Death Animation is ${mod.settings.HideMonsterDeathAnimation ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
				break;
			case "screenabns":
				if (arg === 'hide') {
					if (!arg2) {
						mod.settings.HideOwnBlacklistedAbns = !mod.settings.HideOwnBlacklistedAbns;
						Msg(`Blacklisted ScreenAbns ${mod.settings.OwnAbnormalsBlacklist ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
						break;
					}
					arg2 = Number(arg2);
					let found = mod.settings.OwnAbnormalsBlacklist.some(m => m === arg2);
					if (found) {
						Msg(`Abnormal id '${arg2}' <font color="${RedC}">Removed from the blacklist</font>.`)
						mod.settings.OwnAbnormalsBlacklist = mod.settings.OwnAbnormalsBlacklist.filter(obj => obj != arg2);
					} else {
						Msg(`Abnormal id '${arg2}' <font color="${GrnC}">Added to the blacklist</font>.`)
						mod.settings.OwnAbnormalsBlacklist.push(arg2)
					}
					return;
				} else mod.settings.HideOwnBlacklistedAbns = !mod.settings.HideOwnBlacklistedAbns;
				Msg(`Blacklisted ScreenAbns ${mod.settings.HideOwnBlacklistedAbns ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
				break;
			case "fish":
			case "fishing":
				mod.settings.Fishing = !mod.settings.Fishing;
				Msg(`Fishing mode is ${mod.settings.Fishing ? `<font color="${GrnC}">Enabled</font>` : `<font color="${RedC}">Disabled</font>`}.`);
				mod.settings.Fishing ? HideNpcs('fish') : ShowNpcs('fish');
				break;
			case "help":
				mod.command.exec("fps gui help");
				break;
			default:
				Msg(`<font color="${RedC}">Unknown command, check command list</font>.`);
				mod.command.exec("fps gui help");
				break;
		}
		if (!NotCP) mod.saveSettings(); // for some reason settings still.... doesn't save properly on first run for caali's proxy so we have this here now as temp fix I guess. 🤷
	})
}