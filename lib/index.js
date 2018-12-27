/* global __dirname */

module.exports = function FpsUtils(mod) {
	const NotCP = typeof global.TeraProxy === 'undefined'; //For niceName forced thing and broken settings auto-save For Caali's Proxy users.
	const NpcData = require("./data/npcData.json"), SkillData = require("./data/skillString.json");
	const Alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
	const BronzeClr = '#BC8F8F', SilverClr = '#9A9A9A', GoldClr = '#DAA520', PinkClr = '#FFB7C5', HPinkClr = '#FF69B4', CPinkClr = '#ED5D92', RedClr = '#FE6F5E', GreenClr = '#4DE19C', LPurpleClr = '#E0B0FF', PurpleClr = '#9966CC', LBlueClr = '#4DDCE1', BlueClr = '#436EEE', DBlueClr = '#00575e', HBlueClr = '#08B3E5', GrayClr = '#778899', YellowClr = '#C0B94D', OrangeClr = '#FFBE5E';
	const FishingNpcs = { 8: [6011], 12: [1, 2], 23: [201, 202], 34: [8000], 61: [9901], 62: [1017, 1035, 1039, 1040, 1041, 1042, 1900, 1901, 1902, 1903, 9001, 9002, 9003, 9004, 9901], 83: [9901], 207: [9901], 212: [1034], 223: [9901, 9906, 9907, 9915, 9925], 230: [9901], 362: [1201, 1202, 1301, 1302] };
	const PvPProjs = [30120, 30220, 30320, 90120, 90220, 90320, 90420, 90520, 90620, 90720, 90820, 90920, 100120, 100220, 100320, 100520, 120220, 120320, 120420, 120520, 120620, 120720, 120820, 120920, 150120, 150220, 150320, 150420, 150520, 150620, 150720, 170120, 170220, 170320, 170420, 170520, 170620, 170720, 170820, 170920, 230120, 230220, 230320, 250120, 250220, 250320, 250420, 250520, 250620, 250720, 250820, 250920, 251020];
	const UserSumNPCs = [12345, 1100100, 1100101, 2010100, 2010101, 10235004, 10235005, 10235006, 10235007, 10235008, 10235009, 10235010, 10235011, 10235012, 10235013, 10235014, 10235015, 10235016, 10235017, 10236001, 10236002, 10236003, 10236004, 10236005, 10236006, 10236007, 10236008, 10236009, 10236010, 10236011, 10236012, 10236013, 10236014, 10236015, 10237003, 10237004, 10237005, 10237006, 10237007, 10237008, 10237009, 10237010, 10237011, 10237012, 10237013, 10237014, 10237015, 10237015, 10238001, 10238002, 10238003, 10238004, 10238005, 10238006, 10238007, 10238008, 10238008, 10239003, 30301001, 30301002, 30301003, 30301004, 30302001, 30302002, 30302003, 30302004, 30302005, 30302006, 30302007, 30303001, 30303002, 30303003, 30303004, 30303005, 30303006, 30303007];

	let MyGameId,
		MyName,
		MyPlayerId,
		SwitchCd,
		LastState,
		LastVrange,
		ProjDebug,
		AbnDebug,
		TmpData = [],
		PartyMembers = [],
		HiddenNpcs = {},
		HiddenUsers = {},
		HFishingNpcs = {},
		SpawnedUsers = {},
		SFishingNpcs = {},
		oldCurChan = { oldCzone: 0, oldCchannel: 0, oldCtype: 0 };

	// ~~~ * Gui Parser * ~~~ \\

	let Xd, Xdata = '';
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
			mod.toClient('S_ANNOUNCE_UPDATE_NOTIFICATION', 1, {
				id: 0,
				title: Xtitle,
				body: X1(Xarray)
			})
			Xdata = '';
		}
	}

	function X1(Xarray) {
		for (let i = 0; i < Xarray.length; i++) {
			if (Xdata.length >= 16000) {
				Xdata += `Gui data limit exceeded, some values may be missing.`;
				break;
			}
			if (Xarray[i].command) Xdata += `<a href="admincommand:/@${Xarray[i].command}">${Xarray[i].text}</a>`;
			else if (!Xarray[i].command) Xdata += `${Xarray[i].text}`;
			else continue;
		}
		return Xdata;
	}

	// ~~~ * Gui Handler * ~~~ \\

	function GuiHandler(page, arg) {
		switch (page) {
			case "searchnpc":
			case "npcsearch":
				NpcJsonSearch(arg, NpcData, "search", `<font color="${LBlueClr}" size="+16">Search results for '${arg}'</font>.`)
				break;
			case "npc":
				NpcJsonSearch(arg, NpcData, "starts", `<font color="${LBlueClr}" size="+16">Search results for '${arg}'</font>.`)
				break;
			case "npclist":
				TmpData = []
				TmpData.push(
					{ text: `<font color="${PurpleClr}" size="+24"><p align="right">MAIN MENU</p></font><br><br>`, command: "fps gui" },
					{ text: `<font color="${YellowClr}" size="+20"><p align="right">[Main NPC page]</p></font><br>`, command: "fps gui npcMain" },
					{ text: `<font color="${LBlueClr}" size="+19">Click a NPC ID to remove it from the blacklist:</font><br>` }
				)
				for (let i = 0; i < mod.settings.NpcsBlacklist.length; i++) {
					TmpData.push({ text: `<font color="${BronzeClr}" size="+17">${mod.settings.NpcsBlacklist[i].zone}, ${mod.settings.NpcsBlacklist[i].templateId}</font><br>`, command: `fps npc hide ${mod.settings.NpcsBlacklist[i].zone} ${mod.settings.NpcsBlacklist[i].templateId};fps gui npclist` })
				}
				gui.parse(TmpData, `<font color="${LPurpleClr}">[FPS] Options - NPCs </font><font color="${GreenClr}">(Blacklist)</font>`)
				TmpData = []
				break;
			case "npcMain":
				TmpData = []
				TmpData.push(
					{ text: `<font color="${PurpleClr}" size="+24"><p align="right">MAIN MENU</p></font><br><br>`, command: "fps gui" },
					{ text: `<font color="${YellowClr}" size="+20"><p align="right">[Blacklisted NPCs list]</p></font><br>`, command: "fps gui npclist" },
					{ text: `<font color="${LBlueClr}" size="+19">Click a letter to view all NPCs starting with that letter:<br><br>` }
				)
				for (let i = 0; i < Alphabet.length; i++) {
					TmpData.push(
						{ text: `<font color="${BronzeClr}" size="+19">${Alphabet[i]}</font>&nbsp;&nbsp;`, command: `fps gui npc ${Alphabet[i]}` }
					)
				}
				TmpData.push(
					{ text: `<br><br><font color="${PinkClr}" size="+16">(Command </font><font color="${HPinkClr}" size="+16">"fps gui searchnpc &#60;name&#62;"</font><font color="${PinkClr}" size="+16"> to search for a specific NPCs names, Case sensitive)</font>` },
					{ text: `<br><br><font color="${PinkClr}" size="+16">(Command </font><font color="${HPinkClr}" size="+16">"fps gui npc &#60;letters&#62;"</font><font color="${PinkClr}" size="+16"> to search for NPCs names that starts with that 'letters', Case sensitive)</font>` },
					{ text: `<br><br><font color="${PinkClr}" size="+16">If you want to search for npc with space between it's name, you've to add the whole name inside quotations, e.g. <font color="${HPinkClr}" size="+16">fps gui npcsearch "Bay Kamara"\`</font></font>` }
				)
				gui.parse(TmpData, `<font color="${LPurpleClr}">[FPS] Options - NPCs </font><font color="${YellowClr}">(Main)</font>`)
				TmpData = []
				break;
			case "show":
				TmpData = []
				TmpData.push(
					{ text: `<font color="${PurpleClr}" size="+24"><p align="right">MAIN MENU</p></font><br>`, command: "fps gui" },
					{ text: `<font color="${RedClr}" size="+16">Red</font><font color="${LPurpleClr}" size="+16"> = Shown, <font color="${GreenClr}" size="+16">Green</font><font color="${LPurpleClr}" size="+16"> = Hidden</font></font><br>` },
					{ text: `<font color="${PinkClr}" size="+16">(Command </font><font color="${HPinkClr}" size="+16">"fps hide &#60;name&#62;"</font><font color="${PinkClr}" size="+16"> to hide someone that does not appear here)</font><br><br>` },
					{ text: `<font color="${LBlueClr}" size="+19">Click on <font color="${RedClr}">Red</font> to hide & add to blacklist.<br>Click on <font color="${GreenClr}">Green</font> to show & remove from blacklist</font><br>` }
				)
				for (let i in SpawnedUsers) {
					TmpData.push({ text: `<font color="${mod.settings.PlayersBlacklist.includes(SpawnedUsers[i].name) ? GreenClr : RedClr}" size="+17">${SpawnedUsers[i].name}</font><br>`, command: mod.settings.PlayersBlacklist.includes(SpawnedUsers[i].name) ? `fps show ${SpawnedUsers[i].name};fps gui show` : `fps hide  ${SpawnedUsers[i].name};fps gui show` })
				}
				gui.parse(TmpData, `<font color="${LPurpleClr}">[FPS] Options - Players </font><font color="${RedClr}">(In-distance)</font>`)
				TmpData = []
				break;
			case "hide":
				TmpData = []
				TmpData.push(
					{ text: `<font color="${PurpleClr}" size="+24"><p align="right">MAIN MENU</p></font><br><br>`, command: "fps gui" },
					{ text: `<font color="${LBlueClr}" size="+19">Click to show & remove from blacklist.</font><br>` }
				)
				mod.settings.PlayersBlacklist.forEach(mem => TmpData.push({ text: `<font color="${BronzeClr}" size="+17">${mem}</font><br>`, command: `fps show ${mem};fps gui hide` }))
				gui.parse(TmpData, `<font color="${LPurpleClr}">[FPS] Options - Players </font><font color="${GreenClr}">(Hidden)</font>`)
				TmpData = []
				break;
			case "skills":
				gui.parse([
					{ text: `<font color="${PurpleClr}" size="+24"><p align="right">MAIN MENU</p></font><br>`, command: "fps gui" },
					{ text: `<font color="${YellowClr}" size="+20">Tankers:</font>&#09;&#09;` },
					{ text: `<font color="${LBlueClr}" size="+18">&#40;Lancer&#41;</font>&nbsp;&nbsp;`, command: "fps gui class lancer" },
					{ text: `<font color="${LBlueClr}" size="+18">&#40;Brawler&#41;</font><br><br>`, command: "fps gui class brawler" },
					{ text: `<font color="${YellowClr}" size="+20">Healers:</font>&#09;&#09;` },
					{ text: `<font color="${LBlueClr}" size="+18">&#40;Priest&#41;</font>&nbsp;&nbsp;`, command: "fps gui class priest" },
					{ text: `<font color="${LBlueClr}" size="+18">&#40;Mystic&#41;</font><br><br>`, command: "fps gui class mystic" },
					{ text: `<font color="${YellowClr}" size="+20">Dpsers(melee):</font>&#09;` },
					{ text: `<font color="${LBlueClr}" size="+18">&#40;Warrior&#41;</font>&nbsp;&nbsp;`, command: "fps gui class warrior" },
					{ text: `<font color="${LBlueClr}" size="+18">&#40;Slayer&#41;</font>&nbsp;&nbsp;`, command: "fps gui class slayer" },
					{ text: `<font color="${LBlueClr}" size="+18">&#40;Berserker&#41;</font>&nbsp;&nbsp;`, command: "fps gui class berserker" },
					{ text: `<font color="${LBlueClr}" size="+18">&#40;Ninja&#41;</font>&nbsp;&nbsp;`, command: "fps gui class ninja" },
					{ text: `<font color="${LBlueClr}" size="+18">&#40;Valkyrie&#41;</font>&nbsp;&nbsp;`, command: "fps gui class valkyrie" },
					{ text: `<font color="${LBlueClr}" size="+18">&#40;Reaper&#41;</font><br><br>`, command: "fps gui class reaper" },
					{ text: `<font color="${YellowClr}" size="+20">Dpsers(ranged):</font>&#09;` },
					{ text: `<font color="${LBlueClr}" size="+18">&#40;Sorcerer&#41;</font>&nbsp;&nbsp;`, command: "fps gui class sorcerer" },
					{ text: `<font color="${LBlueClr}" size="+18">&#40;Archer&#41;</font>&nbsp;&nbsp;`, command: "fps gui class archer" },
					{ text: `<font color="${LBlueClr}" size="+18">&#40;Gunner&#41;</font>`, command: "fps gui class gunner" }
				], `<font color="${LPurpleClr}">[FPS] Options - Skills </font><font color="${YellowClr}">(Choose class)</font>`)
				break;
			case "class":
				gui.parse(SkillJsonSearch(arg), `<font color="${LPurpleClr}">[FPS] Options - Skill list for '${arg}'</font>`)
				break;
			case "role":
				gui.parse([
					{ text: `<font color="${PurpleClr}" size="+24"><p align="right">MAIN MENU</p></font><br><br>`, command: "fps gui" },
					{ text: `<font color="${YellowClr}" size="+20">By Roles:</font>&#09;` },
					{ text: `<font color="${mod.settings.RolesBlacklist.includes('tank') ? GreenClr : RedClr}" size="+18">[Tankers]</font>&nbsp;&nbsp;`, command: `fps ${mod.settings.RolesBlacklist.includes('tank') ? `show` : `hide`} tank;fps gui role` },
					{ text: `<font color="${mod.settings.RolesBlacklist.includes('healer') ? GreenClr : RedClr}" size="+18">[Healers]</font>&nbsp;&nbsp;`, command: `fps ${mod.settings.RolesBlacklist.includes('healer') ? `show` : `hide`} healer;fps gui role` },
					{ text: `<font color="${mod.settings.RolesBlacklist.includes('dps') ? GreenClr : RedClr}" size="+18" >[Dps-All]</font>&nbsp;&nbsp;`, command: `fps ${mod.settings.RolesBlacklist.includes('dps') ? `show` : `hide`} dps;fps gui role` },
					{ text: `<font color="${mod.settings.RolesBlacklist.includes('ranged') ? GreenClr : RedClr}" size="+18">[Dps-Ranged]</font><br><br><br><br>`, command: `fps ${mod.settings.RolesBlacklist.includes('ranged') ? `show` : `hide`} ranged;fps gui role` },
					{ text: `<font color="${DBlueClr}" size="+22">By Classes</font><br><br>` },
					{ text: `<font color="${YellowClr}" size="+20">Tankers:</font>&#09;&#09;` },
					{ text: `<font color="${mod.settings.ClassesBlacklist.includes('lancer') ? GreenClr : RedClr}" size="+18">[Lancer]</font>&nbsp;&nbsp;`, command: `fps ${mod.settings.ClassesBlacklist.includes('lancer') ? `show` : `hide`} lancer;fps gui role` },
					{ text: `<font color="${mod.settings.ClassesBlacklist.includes('brawler') ? GreenClr : RedClr}" size="+18">[Brawler]</font><br><br>`, command: `fps ${mod.settings.ClassesBlacklist.includes('brawler') ? `show` : `hide`} brawler;fps gui role` },
					{ text: `<font color="${YellowClr}" size="+20">Healers:</font>&#09;&#09;` },
					{ text: `<font color="${mod.settings.ClassesBlacklist.includes('priest') ? GreenClr : RedClr}" size="+18">[Priest]</font>&nbsp;&nbsp;`, command: `fps ${mod.settings.ClassesBlacklist.includes('priest') ? `show` : `hide`} priest;fps gui role` },
					{ text: `<font color="${mod.settings.ClassesBlacklist.includes('mystic') ? GreenClr : RedClr}" size="+18">[Mystic]</font><br><br>`, command: `fps ${mod.settings.ClassesBlacklist.includes('mystic') ? `show` : `hide`} mystic;fps gui role` },
					{ text: `<font color="${YellowClr}" size="+20">Dpsers(melee):</font>&#09;` },
					{ text: `<font color="${mod.settings.ClassesBlacklist.includes('warrior') ? GreenClr : RedClr}" size="+18">[Warrior]</font>&nbsp;&nbsp;`, command: `fps ${mod.settings.ClassesBlacklist.includes('warrior') ? `show` : `hide`} warrior;fps gui role` },
					{ text: `<font color="${mod.settings.ClassesBlacklist.includes('slayer') ? GreenClr : RedClr}" size="+18">[Slayer]</font>&nbsp;&nbsp;`, command: `fps ${mod.settings.ClassesBlacklist.includes('slayer') ? `show` : `hide`} slayer;fps gui role` },
					{ text: `<font color="${mod.settings.ClassesBlacklist.includes('berserker') ? GreenClr : RedClr}" size="+18">[Berserker]</font>&nbsp;&nbsp;`, command: `fps ${mod.settings.ClassesBlacklist.includes('berserker') ? `show` : `hide`} berserker;fps gui role` },
					{ text: `<font color="${mod.settings.ClassesBlacklist.includes('ninja') ? GreenClr : RedClr}" size="+18">[Ninja]</font>&nbsp;&nbsp;`, command: `fps ${mod.settings.ClassesBlacklist.includes('ninja') ? `show` : `hide`} ninja;fps gui role` },
					{ text: `<font color="${mod.settings.ClassesBlacklist.includes('valkyrie') ? GreenClr : RedClr}" size="+18">[Valkyrie]</font>&nbsp;&nbsp;`, command: `fps ${mod.settings.ClassesBlacklist.includes('valkyrie') ? `show` : `hide`} valkyrie;fps gui role` },
					{ text: `<font color="${mod.settings.ClassesBlacklist.includes('reaper') ? GreenClr : RedClr}" size="+18">[Reaper]</font><br><br>`, command: `fps ${mod.settings.ClassesBlacklist.includes('reaper') ? `show` : `hide`} reaper;fps gui role` },
					{ text: `<font color="${YellowClr}" size="+20">Dpsers(ranged):</font>&#09;` },
					{ text: `<font color="${mod.settings.ClassesBlacklist.includes('sorcerer') ? GreenClr : RedClr}" size="+18">[Sorcerer]</font>&nbsp;&nbsp;`, command: `fps ${mod.settings.ClassesBlacklist.includes('sorcerer') ? `show` : `hide`} sorcerer;fps gui role` },
					{ text: `<font color="${mod.settings.ClassesBlacklist.includes('archer') ? GreenClr : RedClr}" size="+18">[Archer]</font>&nbsp;&nbsp;`, command: `fps ${mod.settings.ClassesBlacklist.includes('archer') ? `show` : `hide`} archer;fps gui role` },
					{ text: `<font color="${mod.settings.ClassesBlacklist.includes('gunner') ? GreenClr : RedClr}" size="+18">[Gunner]</font>`, command: `fps ${mod.settings.ClassesBlacklist.includes('gunner') ? `show` : `hide`} gunner;fps gui role` }
				], `<font color="${LPurpleClr}">[FPS] Options - Roles/Classes</font>`)
				break;
			case "abn":
				TmpData = []
				TmpData.push(
					{ text: `<font color="${PurpleClr}" size="+24"><p align="right">MAIN MENU</p></font><br>`, command: "fps gui" },
					{ text: `<font color="${AbnDebug ? GreenClr : RedClr}" size="+19"><p align="right">Debug</p></font><br>`, command: "fps abn log;fps gui abn" },
					{ text: `<font color="${LPurpleClr}" size="+19">Blacklist: </font><font color="${PinkClr}" size="17+">Click to remove from the blacklist.</font><br>` }
				)
				mod.settings.AbnormalitiesBlacklist.forEach(abnmem => TmpData.push({ text: `<font color="${BronzeClr}" size="+16">${abnmem}<br></font>`, command: `fps abn blacklist remv ${abnmem};fps gui abn` }))
				gui.parse(TmpData, `<font color="${LPurpleClr}">[FPS] Options - Abnormalities</font>`)
				TmpData = []
				break;
			case "proj":
				TmpData = []
				TmpData.push(
					{ text: `<font color="${PurpleClr}" size="+24"><p align="right">MAIN MENU</p></font><br>`, command: "fps gui" },
					{ text: `<font color="${ProjDebug ? GreenClr : RedClr}" size="+19"><p align="right">Debug</p></font><br>`, command: "fps proj log;fps gui proj" },
					{ text: `<font color="${LPurpleClr}" size="+19">Blacklist: </font><font color="${PinkClr}" size="17+">Click to remove from the blacklist.</font><br>` }
				)
				mod.settings.ProjectilesBlacklist.forEach(projmem => TmpData.push({ text: `<font color="${BronzeClr}" size="+16">${projmem}<br></font>`, command: `fps proj blacklist remv ${projmem};fps gui proj` }))
				gui.parse(TmpData, `<font color="${LPurpleClr}">[FPS] Options - Projectiles</font>`)
				TmpData = []
				break;
			case "help":
				gui.parse([
					{ text: `<font color="${PurpleClr}" size="+24"><p align="right">MAIN MENU</p></font><br>`, command: "fps gui" },
					{ text: `<font size="20">` },
					{ text: `<font color="${LBlueClr}">Command</font>           <font color="${SilverClr}">Arg(s)</font>                <font color="${CPinkClr}">Example</font><br>` },
					{ text: `<font color="${HBlueClr}">gui ^ g</font>                      <font color="${DBlueClr}">N/A</font>                    <font color="${HPinkClr}">!fps gui</font><br>` },
					{ text: `<font color="${HBlueClr}">  N/A</font>                         <font color="${DBlueClr}">N/A</font>                    <font color="${HPinkClr}">!fps-util</font><br>` },
					{ text: `<font color="${HBlueClr}">0 ^ 1 ^ 2 ^ 3</font>             <font color="${DBlueClr}">N/A</font>                    <font color="${HPinkClr}">!0 ^ !1 ^ !2 ^ !3</font><br>` },
					{ text: `<font color="${HBlueClr}">mode</font>                  <font color="${DBlueClr}">0 ^ 1 ^ 2 ^ 3</font>            <font color="${HPinkClr}">!fps mode 2</font><br>` },
					{ text: `<font color="${HBlueClr}">hide^show</font>    <font color="${DBlueClr}">Player^Class^Role</font>    <font color="${HPinkClr}">!fps hide mie</font><br>` },
					{ text: `<font color="${HBlueClr}">party</font>                        <font color="${DBlueClr}">N/A</font>                    <font color="${HPinkClr}">!fps party</font><br>` },
					{ text: `<font color="${HBlueClr}">raid</font>                           <font color="${DBlueClr}">N/A</font>                    <font color="${HPinkClr}">!fps raid</font><br>` },
					{ text: `<font color="${HBlueClr}">list</font>                             <font color="${DBlueClr}">N/A</font>                    <font color="${HPinkClr}">!fps list</font><br>` },
					{ text: `<font color="${HBlueClr}">sums</font>                 <font color="${DBlueClr}">other ^ me</font>               <font color="${HPinkClr}">!fps sums me</font><br>` },
					{ text: `<font color="${HBlueClr}">skill</font>                       <font color="${DBlueClr}">blacklist</font>               <font color="${HPinkClr}">!fps skill blacklist</font><br>` },
					{ text: `<font color="${HBlueClr}">npc</font>                      <font color="${DBlueClr}">N/A ^ hide</font>             <font color="${HPinkClr}">!fps npc</font><br>` },
					{ text: `<font color="${HBlueClr}">hit</font>                  <font color="${DBlueClr}">me^other^damage</font>  <font color="${HPinkClr}">!fps hit me</font><br>` },
					{ text: `<font color="${HBlueClr}">firework</font>                  <font color="${DBlueClr}">N/A</font>                    <font color="${HPinkClr}">!fps firework</font><br>` },
					{ text: `<font color="${HBlueClr}">abn</font>                   <font color="${DBlueClr}">all ^ blacklist</font>          <font color="${HPinkClr}">!fps abn blacklist</font><br>` },
					{ text: `<font color="${HBlueClr}">proj</font>                   <font color="${DBlueClr}">all ^ blacklist</font>          <font color="${HPinkClr}">!fps proj all</font><br>` },
					{ text: `<font color="${HBlueClr}">guildlogo</font>                <font color="${DBlueClr}">N/A</font>                    <font color="${HPinkClr}">!fps guildlogo</font><br>` },
					{ text: `<font color="${HBlueClr}">style</font>                          <font color="${DBlueClr}">N/A</font>                    <font color="${HPinkClr}">!fps style</font><br>` },
					{ text: `<font color="${HBlueClr}">gui npcsearch</font>      <font color="${DBlueClr}">"target"</font>             <font color="${HPinkClr}">!fps gui npcsearch E</font><br>` },
					{ text: `<font color="${HBlueClr}">npczoom</font>                 <font color="${DBlueClr}">N/A</font>                    <font color="${HPinkClr}">!fps npczoom</font><br>` },
					{ text: `<font color="${HBlueClr}">dropitem</font>                 <font color="${DBlueClr}">N/A ^ hide</font>        <font color="${HPinkClr}">!fps dropitem</font><br>` },
					{ text: `<font color="${HBlueClr}">monsterdeathani</font>   <font color="${DBlueClr}">N/A</font>                    <font color="${HPinkClr}">!fps monsterdeathani</font><br>` },
					{ text: `<font color="${HBlueClr}">screenabns</font>             <font color="${DBlueClr}">N/A ^  hide</font>      <font color="${HPinkClr}">!fps screenabns</font><br>` },
					{ text: `<font color="${HBlueClr}">fish ^ fishing</font>           <font color="${DBlueClr}">N/A</font>                    <font color="${HPinkClr}">!fps fishing</font>` },
					{ text: `</font>` }
				], `<font color="${LPurpleClr}">[FPS] HELP</font>`)
				break;
			default:
				gui.parse([
					{ text: `<font color="${PurpleClr}" size="+24"><p align="right">REFRESH</p></font><br>`, command: "fps gui" },
					{ text: `<font color="${YellowClr}" size="+21">Modes:</font>&#09;&#09;` },
					{ text: `<font color="${mod.settings.Mode === 0 ? GreenClr : RedClr}" size="+18">[Mode 0]</font>&nbsp;&nbsp;`, command: "fps mode 0;fps gui" },
					{ text: `<font color="${mod.settings.Mode === 1 ? GreenClr : RedClr}" size="+18">[Mode 1]</font>&nbsp;&nbsp;`, command: "fps mode 1;fps gui" },
					{ text: `<font color="${mod.settings.Mode === 2 ? GreenClr : RedClr}" size="+18">[Mode 2]</font>&nbsp;&nbsp;`, command: "fps mode 2;fps gui" },
					{ text: `<font color="${mod.settings.Mode === 3 ? GreenClr : RedClr}" size="+18">[Mode 3]</font>&nbsp;&nbsp;&nbsp;&nbsp;`, command: "fps mode 3;fps gui" },
					{ text: `<font color="${mod.settings.Fishing ? GreenClr : RedClr}" size="+18">[Fishing]</font><br><br>`, command: "fps fishing;fps gui" },
					{ text: `<font color="${YellowClr}" size="+21">Hit:</font>&#09;&#09;&#09;` },
					{ text: `<font color="${mod.settings.Hit_Other ? GreenClr : RedClr}" size="+18">[Players effect]</font>&nbsp;&nbsp;`, command: "fps hit other;fps gui" },
					{ text: `<font color="${mod.settings.Hit_Me ? GreenClr : RedClr}" size="+18">[Own effect]</font>&nbsp;&nbsp;`, command: "fps hit me;fps gui" },
					{ text: `<font color="${mod.settings.Hit_Damage ? GreenClr : RedClr}" size="+18">[Damage numbers]</font><br><br>`, command: "fps hit damage;fps gui" },
					{ text: `<font color="${YellowClr}" size="+21">Hide:</font>&#09;&#09;` },
					{ text: `<font color="${mod.settings.HideOthersSummons ? GreenClr : RedClr}" size="+17">[Players summons]</font>&nbsp;&nbsp;`, command: "fps summons;fps gui" },
					{ text: `<font color="${mod.settings.HideMySummons ? GreenClr : RedClr}" size="+17">[Own summons]</font>&nbsp;&nbsp;`, command: "fps summons me;fps gui" },
					{ text: `<font color="${mod.settings.HideFireworks ? GreenClr : RedClr}" size="+17">[Fireworks]</font><br>&#09;&#09;&#09;`, command: "fps fireworks;fps gui" },
					{ text: `<font color="${mod.settings.ShowStyle ? GreenClr : RedClr}" size="+17">[Style]</font>&nbsp;&nbsp;`, command: "fps style;fps gui" },
					{ text: `<font color="${mod.settings.Hideguildlogos ? GreenClr : RedClr}" size="+17">[Guild Logos]</font>&nbsp;&nbsp;`, command: "fps guildlogo;fps gui" },
					{ text: `<font color="${mod.settings.HideBlacklistedDrop ? GreenClr : RedClr}" size="+17">[Drops]</font>&nbsp;&nbsp;`, command: "fps dropitem;fps gui" },
					{ text: `<font color="${mod.settings.HideOwnBlacklistedAbns ? GreenClr : RedClr}" size="+17">[Dizziness]</font><br>&#09;&#09;&#09;`, command: "fps screenabns;fps gui" },
					{ text: `<font color="${mod.settings.HideAllAbnormalities ? GreenClr : RedClr}" size="+16">[All Abnormals]</font>&nbsp;&nbsp;`, command: "fps abn all;fps gui" },
					{ text: `<font color="${mod.settings.HideBlacklistedAbnormalities ? GreenClr : RedClr}" size="+16">[Abnormals BList]</font>&nbsp;&nbsp;`, command: "fps abn blacklist;fps gui" },
					{ text: `<font color="${mod.settings.HideAllProjectiles ? GreenClr : RedClr}" size="+16">[All Projs]</font>&nbsp;&nbsp;`, command: "fps proj all;fps gui" },
					{ text: `<font color="${mod.settings.HideBlacklistedProjectiles ? GreenClr : RedClr}" size="+16">[Projs BList]</font><br>&#09;&#09;&#09;`, command: "fps proj blacklist;fps gui" },
					{ text: `<font color="${mod.settings.HideMonsterDeathAnimation ? GreenClr : RedClr}" size="+16">[NPCs Death Ani]</font>&nbsp;&nbsp;`, command: "fps monsterdeathani;fps gui" },
					{ text: `<font color="${mod.settings.ActionScripts ? GreenClr : RedClr}" size="+16">[NPCs Zoom-in]</font>&nbsp;&nbsp;`, command: "fps npczoom;fps gui" },
					{ text: `<font color="${mod.settings.HideBlacklistedNpcs ? GreenClr : RedClr}" size="+16">[NPCs BList]</font>&nbsp;&nbsp;`, command: "fps npc;fps gui" },
					{ text: `<font color="${mod.settings.HideBlacklistedSkills ? GreenClr : RedClr}" size="+16">[Skills BList]</font><br><br>`, command: "fps skill blacklist;fps gui" },
					{ text: `<font color="${YellowClr}" size="+21">Players:</font>&#09;` },
					{ text: `<font color="${LBlueClr}" size="+18">[Hidden list]</font>&nbsp;&nbsp;&nbsp;&nbsp;`, command: "fps gui hide" },
					{ text: `<font color="${LBlueClr}" size="+18">[Shown list]</font><br><br>`, command: "fps gui show" },
					{ text: `<font color="${YellowClr}" size="+21">Misc.</font>&#09;&#09;` },
					{ text: `<font color="${LBlueClr}" size="+17">[Classes/Roles]</font>&nbsp;&nbsp;&nbsp;`, command: "fps gui role" },
					{ text: `<font color="${LBlueClr}" size="+17">[Skills]</font>&nbsp;&nbsp;&nbsp;`, command: "fps gui skills" },
					{ text: `<font color="${LBlueClr}" size="+17">[NPCs]</font>&nbsp;&nbsp;`, command: "fps gui npcMain" },
					{ text: `<font color="${LBlueClr}" size="+17">[Abnormals]</font><br>&#09;&#09;&#09;`, command: "fps gui abn" },
					{ text: `<font color="${LBlueClr}" size="+17">[Projectiles]</font>&nbsp;&nbsp;`, command: "fps gui proj" },
					{ text: `<font color="${mod.settings.RaidAutoChange ? GreenClr : RedClr}" size="+16">[Raid auto state]</font>&nbsp;&nbsp;`, command: "fps raid;fps gui" },
					{ text: `<font color="${mod.settings.OnlyParty ? GreenClr : RedClr}" size="+16">[Only Party]</font>&nbsp;&nbsp;`, command: "fps party;fps gui" },
					{ text: `<font color="${mod.settings.PvpTraps ? GreenClr : RedClr}" size="+16">[PvpTraps]</font><br><br><br><br>`, command: "fps pvptraps;fps gui" },
					{ text: `<font color="${BlueClr}" size="+22">Quick Links:</font><br>` },
					{ text: `<font color="${DBlueClr}" size="+21">UI:</font>&#09;&#09;` },
					{ text: `<font color="${PurpleClr}" size="+17">[Mail]</font>&nbsp;&nbsp;&nbsp;`, command: "fps quicklink parcel" },
					{ text: `<font color="${PurpleClr}" size="+17">[Broker]</font>&nbsp;&nbsp;&nbsp;`, command: "fps quicklink broker" },
					{ text: `<font color="${PurpleClr}" size="+17">[Talent]</font>&nbsp;&nbsp;&nbsp;`, command: "fps quicklink talents" },
					{ text: `<font color="${PurpleClr}" size="+17">[Dress]</font>&nbsp;&nbsp;&nbsp;`, command: "fps quicklink dressingroom" },
					{ text: `<font color="${PurpleClr}" size="+17">[Hat Style]</font>&nbsp;&nbsp;&nbsp;`, command: "fps quicklink hatrestyle" },
					{ text: `<font color="${PurpleClr}" size="+17">[Search-Engine]</font><br>`, command: "fps quicklink searchengine" },
					{ text: `<font color="${DBlueClr}" size="+21">Group:</font>&#09;` },
					{ text: `<font color="${OrangeClr}" size="+17">[Reset]</font>&nbsp;&nbsp;&nbsp;&nbsp;`, command: "fps quicklink reset" },
					{ text: `<font color="${CPinkClr}" size="+17">[Leave]</font>&nbsp;&nbsp;&nbsp;`, command: "fps quicklink drop" },
					{ text: `<font color="${CPinkClr}" size="+17">[Disband]</font><br>`, command: "fps quicklink disband" },
					{ text: `<font color="${DBlueClr}" size="+21">Extra:</font>&#09;` },
					{ text: `<font color="${CPinkClr}" size="+17">[Lobby]</font>&#09;&#09;&#09;&#09;&#09;&#09;&nbsp;`, command: "fps quicklink lobby" },
					{ text: `<font color="${HPinkClr}" size="+17">[!! Instant Exit]</font><br>`, command: "fps quicklink instantexit" }
				], `<font color="${LPurpleClr}">[FPS] Options</font> | <font color="${RedClr}" size="+16">Red</font><font color="${LPurpleClr}" size="+16"> = disabled, <font color="${GreenClr}" size="+16">Green</font><font color="${LPurpleClr}" size="+16"> = enabled</font>`)
		}
	}


	// ~~~ * Gui Functions * ~~~ \\

	function SkillJsonSearch(value) {
		let keys = [],
			skilldata = [],
			skillIds = []
		skilldata.push(
			{ text: `<font color="${PurpleClr}" size="+24"><p align="right">MAIN MENU</p></font><br>`, command: "fps gui" },
			{ text: `<font color="${mod.settings.HideBlacklistedSkills ? GreenClr : RedClr}" size="+22"><p align="right">[Blacklisted skills are ${mod.settings.HideBlacklistedSkills ? 'Hidden' : 'Shown'}]</p></font><br>`, command: "fps skill blacklist;fps gui skills" },
			{ text: `<font color="${LBlueClr}" size="+19">Click skill to blacklist it.</font><br>` }
		)
		for (let key in SkillData[value]) {
			keys.push(key);
		}
		skillIds.push(Object.values(SkillData[value]))
		for (let i = 0; i < keys.length; i++) {
			skilldata.push({ command: `fps skill class ${value} ${skillIds[0][i]};fps gui class ${value}`, text: `<font color="${mod.settings.ClassesData[ClassNameFromID(value)].CD_SkillsBlacklist.includes(skillIds[0][i].toString()) ? GreenClr : RedClr}" size="+17">[${keys[i]}]</font><br>` })
		}
		return skilldata
	}

	function NpcJsonSearch(nameKey, array, arg, title) {
		TmpData = []
		TmpData.push({ text: `<font color="${PurpleClr}" size="+24"><p align="right">MAIN MENU</p></font><br><br>`, command: "fps gui" })
		for (let i = 0; i < array.length; i++) {
			if (array[i].Nm.startsWith(nameKey) && arg === "starts") TmpData.push({ command: `fps npc hide ${array[i].Hz} ${array[i].Ti};fps gui npc ${nameKey}`, text: `<font color="${mod.settings.NpcsBlacklist.some(arrVal => array[i].Hz == arrVal.zone && array[i].Ti == arrVal.templateId) ? GreenClr : RedClr}" size="+17">${array[i].Nm}</font><br>` });
			if (array[i].Nm.includes(nameKey) && arg === "search") TmpData.push({ command: `fps npc hide ${array[i].Hz} ${array[i].Ti};fps gui npcsearch ${nameKey}`, text: `<font color="${mod.settings.NpcsBlacklist.some(arrVal => array[i].Hz == arrVal.zone && array[i].Ti == arrVal.templateId) ? GreenClr : RedClr}" size="+17">${array[i].Nm} </font><br>` });
		}
		gui.parse(TmpData, `<font color="${LPurpleClr}">[FPS] Options - NPCs</font> |  ${title}`)
		TmpData = []
	}

	function ClassNameFromID(name) {
		for (let Class_data of Object.keys(mod.settings.ClassesData)) {
			if (mod.settings.ClassesData[Class_data].name == name) return Class_data;
		}
	}

	// ~~~ * Command Functions * ~~~ \\

	function Msg(msg) {
		if (NotCP) mod.command.message(`<font color="${LPurpleClr}">[FPS] ${msg}</font>`);
		else mod.command.message(`<font color="${LPurpleClr}">${msg}</font>`);
	}

	function HideSpecificPlayer(name) {
		for (let i in SpawnedUsers) {
			if (SpawnedUsers[i].name.toString().toLowerCase() === name.toLowerCase()) {
				mod.toClient('S_DESPAWN_USER', 3, { gameId: SpawnedUsers[i].gameId, type: 1 });
				HiddenUsers[SpawnedUsers[i].gameId] = SpawnedUsers[i];
				return;
			}
		}
	}

	function RemoveEntity(name) {
		let what, A = arguments, Al = A.length, Ax;
		while (Al > 1 && name.length) {
			what = A[--Al];
			while ((Ax = name.indexOf(what)) !== -1) name.splice(Ax, 1);
		}
		return name;
	}

	function ShowSpecificPlayer(name) {
		for (let i in HiddenUsers) {
			if (HiddenUsers[i].name.toString().toLowerCase() === name.toLowerCase()) {
				ModifyAppearance(HiddenUsers[i]);
				mod.toClient('S_SPAWN_USER', 14, HiddenUsers[i]);
				delete HiddenUsers[i];
				return;
			}
		}
	}

	function HideAllPlayers() {
		if (!mod.settings.OnlyParty) {
			for (let i in SpawnedUsers) {
				mod.toClient('S_DESPAWN_USER', 3, { gameId: SpawnedUsers[i].gameId, type: 1 });
				HiddenUsers[SpawnedUsers[i].gameId] = SpawnedUsers[i];
			}
		}
	}

	function HideFishingNpcs() {
		for (let i in SFishingNpcs) {
			mod.toClient('S_DESPAWN_NPC', 3, { gameId: SFishingNpcs[i].gameId, loc: SFishingNpcs[i].loc, type: 1, unk: 0 })
			HFishingNpcs[SFishingNpcs[i].gameId] = SFishingNpcs[i];
		}
	}

	function ShowAllPlayers() {
		for (let i in HiddenUsers) {
			ModifyAppearance(HiddenUsers[i]);
			mod.toClient('S_SPAWN_USER', 14, HiddenUsers[i]);
			delete HiddenUsers[i];
		}
	}

	function ShowFishingNpcs() {
		for (let i in HFishingNpcs) {
			mod.toClient('S_SPAWN_NPC', 10, HFishingNpcs[i]);
			delete HFishingNpcs[i];
		}
	}

	// ~~~ * Functions * ~~~ \\

	function EqGid(xg) {
		return (xg === MyGameId)
	}

	function ModifyAppearance(event) {
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

	function ClassID(m) {
		return (m % 100)
	}

	function log(Name, type, from, target, id) {
		console.log(`[\x1b[37m${new Date().toJSON().slice(11, 23)}\x1b[39m] \x1b[91m->\x1b[39m \x1b[36m${Name}\x1b[39m \x1b[35m${type}\x1b[39m \x1b[97m${from}\x1b[39m \x1b[32m'${target}'\x1b[39m: \x1b[94m\ID\x1b[39m "\x1b[31m${id}\x1b[39m\x1b[49m\x1b[0m"`);
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
		SpawnedUsers = {};
		SFishingNpcs = {};
		HiddenUsers = {};
		HiddenNpcs = {};
		HFishingNpcs = {};
		if (ProjDebug) {
			ProjDebug = false
			Msg(`<font color="${HPinkClr}">Auto Disabled</font> projectile debug, to reduce the unneeded spam.`)
		}
		if (AbnDebug) {
			AbnDebug = false
			Msg(`<font color="${HPinkClr}">Auto Disabled</font> abnormalities debug, to reduce the unneeded spam.`)
		}
	}

	function sLeaveParty() {
		PartyMembers = []
		if (mod.settings.RaidAutoChange) {
			if (!LastState || mod.settings.Mode !== 2) return;
			mod.command.exec(`fps mode ${LastState}`)
			LastState = null;
		}
	}

	function sMountVehicle(event) {
		if (EqGid(event.gameId)) return;
		SpawnedUsers[event.gameId].mount = event.id
		if (HiddenUsers[event.gameId]) HiddenUsers[event.gameId].mount = event.id;
		if (mod.settings.ShowStyle) {
			event.id = 231
			return true;
		}
	}

	function sUnmountVehicle(event) {
		if (EqGid(event.gameId)) return;
		SpawnedUsers[event.gameId].mount = 0
		if (HiddenUsers[event.gameId]) HiddenUsers[event.gameId].mount = 0;
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

	function sSystemMessage(event) {
		if (!mod.settings.Fishing) return;
		const SystemMessage = mod.parseSystemMessage(event.message)
		if (['SMT_KOREAN_RATING_TEENAGER_PROHIBITED', 'SMT_FIELD_EVENT_WORLD_ANNOUNCE'].includes(SystemMessage.id)) return false;
		if (['SMT_GACHA_REWARD', 'SMT_FISHING_REWARD'].includes(SystemMessage.id) && SystemMessage.tokens.UserName !== MyName) return false;
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
		if (event.zone === oldCurChan.zone && event.channel === oldCurChan.channel && event.type === oldCurChan.type) return false;
		oldCurChan.zone = event.zone;
		oldCurChan.channel = event.channel;
		oldCurChan.type = event.type;
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
		SpawnedUsers[event.gameId] = event;
		if (mod.settings.Mode === 3 || mod.settings.PlayersBlacklist.includes(event.name) || mod.settings.ClassesData[ClassID(event.templateId)].isHidden || (mod.settings.OnlyParty && !PartyMembers.includes(event.name))) {
			HiddenUsers[event.gameId] = event;
			return false;
		}
		if (ModifyAppearance(event)) return true;
	}

	function sSpawnUserfn(event) {
		if (ModifyAppearance(event)) return true;
	}

	function sDespawnUser(event) {
		delete HiddenUsers[event.gameId];
		delete SpawnedUsers[event.gameId];
	}

	function sUserLocation(event) {
		if (SpawnedUsers[event.gameId]) SpawnedUsers[event.gameId].loc = event.dest;
		if (HiddenUsers[event.gameId]) {
			HiddenUsers[event.gameId].loc = event.dest;
			return false;
		}
	}

	function sUserMoveType() { return false; }

	function sPartyMemberList(event) {
		event.members.map(value => PartyMembers.push(value.name))
		if (mod.settings.RaidAutoChange) {
			if (event.members.length >= 18) {
				if (mod.settings.Mode === 3 || (LastState && mod.settings.Mode === 2)) return;
				LastState = mod.settings.Mode
				mod.command.exec("fps mode 2")
			} else {
				if (!LastState || mod.settings.Mode !== 2) return;
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
		if (mod.settings.HideBlacklistedNpcs) {
			for (let i = 0; i < mod.settings.NpcsBlacklist.length; i++) {
				if (event.huntingZoneId == mod.settings.NpcsBlacklist[i].zone && event.templateId == mod.settings.NpcsBlacklist[i].templateId) {
					HiddenNpcs[event.gameId] = event;
					return false;
				}
			}
		}
		if (event.huntingZoneId === 1023) {
			if (mod.settings.HideFireworks && [60016000, 80037000].includes(event.templateId)) return false;
			if (!UserSumNPCs.includes(event.id)) return;
			if (EqGid(event.owner)) {
				if (!mod.settings.HideMySummons) return;
				HiddenNpcs[event.gameId] = event;
				return false;
			}
			if (!mod.settings.HideOthersSummons) return;
			HiddenNpcs[event.gameId] = event;
			return false;
		}
		if (FishingNpcs[event.huntingZoneId] && FishingNpcs[event.huntingZoneId].includes(event.templateId)) {
			SFishingNpcs[event.gameId] = event;
			if (mod.settings.Fishing) {
				HFishingNpcs[event.gameId] = event;
				return false;
			}
		}
		if (mod.settings.ShowStyle) {
			event.repairable = false;
			return true;
		}
	}

	function sDespawnNpc(event) {
		delete HiddenNpcs[event.gameId];
		delete HFishingNpcs[event.gameId];
		delete SFishingNpcs[event.gameId];
		if (!mod.settings.HideMonsterDeathAnimation || event.type !== 5) return;
		event.type = 1;
		return true;
	}

	function sNpcLocation(event) {
		if (SFishingNpcs[event.gameId] && SFishingNpcs[event.gameId].gameId === event.gameId) SFishingNpcs[event.gameId].loc = event.dest
		if (HFishingNpcs[event.gameId]) return false; //TODO, make other npcs despawn like fishing ones, so npcs doesn't freeze in their one spot. | HiddenNpcs[event.target] |
	}

	function sFearMoveStage(event) {
		if ((!EqGid(event.target) && mod.settings.Mode >= 2) || HiddenUsers[event.target] || HiddenNpcs[event.target] || HFishingNpcs[event.target]) return false;
	}

	function sFearMoveEnd(event) {
		if ((!EqGid(event.target) && mod.settings.Mode >= 2) || HiddenUsers[event.target] || HiddenNpcs[event.target] || HFishingNpcs[event.target]) return false;
	}

	function sAbnormalityBegin(event) {
		if (AbnDebug) {
			if (EqGid(event.target)) log('Abnormality', 'Applied', 'on', MyName, event.id)
			if (EqGid(event.source)) log('Abnormality', 'Started', 'from', MyName, event.id)
			if (SpawnedUsers[event.target]) log('Abnormality', 'Applied', 'on', SpawnedUsers[event.target].name, event.id)
			if (SpawnedUsers[event.source]) log('Abnormality', 'Started', 'from', SpawnedUsers[event.source].name, event.id)
		}
		if (EqGid(event.target)) {
			if (mod.settings.HideOwnBlacklistedAbns && mod.settings.OwnAbnormalsBlacklist.includes(event.id)) return false;
			return;
		}
		if (HiddenUsers[event.target] || HiddenNpcs[event.target] || HFishingNpcs[event.target]) return false;
		if (mod.settings.Fishing && event.id === 9943049) return false;
		if (mod.settings.HideBlacklistedAbnormalities && mod.settings.AbnormalitiesBlacklist.includes(event.id)) return false;
		if (mod.settings.HideAllAbnormalities && (SpawnedUsers[event.target] || SpawnedUsers[event.source] || mod.settings.AbnormalitiesBlacklist.includes(event.id))) return false;
	}

	function sAbnormalityRefresh(event) {
		if (HiddenUsers[event.target] || HiddenNpcs[event.target] || HFishingNpcs[event.target]) return false;
		if ((mod.settings.HideBlacklistedAbnormalities || mod.settings.HideAllAbnormalities) && (SpawnedUsers[[10306, 10316, 12001, 12003, 22040, 12120, 12130].includes(event.target)] || SpawnedUsers[[10306, 10316, 12001, 12003, 22040, 12120, 12130].includes(event.source)])) return false;
	}

	function sAbnormalityEnd(event) {
		if (mod.settings.Fishing && event.id === 9943049) return false;
	}

	function sAbnormalityFail(event) {
		if ([3000021, 99020000, 99020010].includes(event.id)) return false;
	}

	function sActionStage(event) {
		if (EqGid(event.gameId) || !SpawnedUsers[event.gameId]) return;
		if ((mod.settings.Mode >= 2) || HiddenUsers[event.gameId] || (mod.settings.HideBlacklistedSkills && mod.settings.ClassesData[ClassID(event.templateId)].CD_SkillsBlacklist.includes(Math.floor(event.skill.id / 10000).toString())) || mod.settings.ClassesData[ClassID(event.templateId)].CD_HideBlacklistedSkills) {
			UpdateLoc(event);
			return false;
		}
	}

	function sStartUserProjectile(event) {
		if (ProjDebug) {
			if (EqGid(event.gameId)) log('Projectile', 'Started', 'from', MyName, event.skill.id)
			if (SpawnedUsers[event.gameId]) log('Projectile', 'Started', 'from', SpawnedUsers[event.gameId].name, event.skill.id)
		}
		if (mod.settings.PvpTraps && PvPProjs.includes(event.skill.id)) return;
		if ((mod.settings.HideBlacklistedProjectiles || mod.settings.HideAllProjectiles) && mod.settings.ProjectilesBlacklist.includes(event.skill.id)) return false;
		if (!EqGid(event.gameId) && SpawnedUsers[event.gameId] && (HiddenUsers[event.gameId] || mod.settings.Mode > 0 || mod.settings.HideAllProjectiles)) return false;
	}

	function sSpawnProjectile(event) {
		if (ProjDebug) {
			if (EqGid(event.gameId)) log('Projectile', 'Spawned', 'from', MyName, event.skill.id)
			if (SpawnedUsers[event.gameId]) log('Projectile', 'Spawned', 'from', SpawnedUsers[event.gameId].name, event.skill.id)
		}
		if (mod.settings.PvpTraps && PvPProjs.includes(event.skill.id)) return;
		if ((mod.settings.HideBlacklistedProjectiles || mod.settings.HideAllProjectiles) && mod.settings.ProjectilesBlacklist.includes(event.skill.id)) return false;
		if (!EqGid(event.gameId) && SpawnedUsers[event.gameId] && (HiddenUsers[event.gameId] || mod.settings.Mode > 0 || mod.settings.HideAllProjectiles)) return false;
	}

	function sEachSkillResult(event) {
		if ((EqGid(event.source) || EqGid(event.owner)) && ModifySkillResult(event)) return true;
		if (!EqGid(event.target) && mod.settings.Hit_Other && (SpawnedUsers[event.owner] || SpawnedUsers[event.source])) {
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
	mod.hook('S_USER_MOVETYPE', 'raw', sUserMoveType)
	mod.hook('S_PARTY_MEMBER_LIST', 7, sPartyMemberList)
	mod.hook('S_USER_APPEARANCE_CHANGE', 1, { order: 9999 }, sUserAppearanceChange)
	mod.hook('S_USER_EXTERNAL_CHANGE', 7, { order: 9999 }, sUserExternalChange)
	mod.hook('S_UNICAST_TRANSFORM_DATA', 5, { order: 99999 }, sUnicastTransformData)

	mod.hook('S_SPAWN_NPC', 10, sSpawnNpc)
	mod.hook('S_DESPAWN_NPC', 3, sDespawnNpc)
	mod.hook('S_NPC_LOCATION', 3, sNpcLocation)
	mod.hook('S_FEARMOVE_STAGE', 1, sFearMoveStage)
	mod.hook('S_FEARMOVE_END', 1, sFearMoveEnd)

	mod.hook('S_ABNORMALITY_BEGIN', 3, { order: 999 }, sAbnormalityBegin)
	mod.hook('S_ABNORMALITY_REFRESH', 1, { order: 999 }, sAbnormalityRefresh)
	mod.hook('S_ABNORMALITY_FAIL', 1, sAbnormalityFail)
	mod.hook('S_ABNORMALITY_END', 1, sAbnormalityEnd)

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
						Msg(`<font color="${RedClr}">Mode 0</font>.`);
						break;
					case "1":
					case "one":
						if (mod.settings.Mode === 3) ShowAllPlayers();
						mod.settings.Mode = 1;
						mod.settings.HideAllAbnormalities = false;
						mod.settings.HideAllProjectiles = true;
						mod.settings.Hit_Other = true;
						Msg(`<font color="${BronzeClr}">Mode 1</font>.`);
						break;
					case "2":
					case "two":
						if (mod.settings.Mode === 3) ShowAllPlayers();
						mod.settings.Mode = 2;
						mod.settings.HideAllAbnormalities = true;
						mod.settings.HideAllProjectiles = true;
						mod.settings.Hit_Other = true;
						Msg(`<font color="${SilverClr}">Mode 2</font>.`);
						break;
					case "3":
					case "three":
						HideAllPlayers();
						mod.settings.Mode = 3;
						mod.settings.HideAllAbnormalities = true;
						mod.settings.HideAllProjectiles = true;
						mod.settings.Hit_Other = true;
						mod.settings.OnlyParty = false;
						Msg(`<font color="${GoldClr}">Mode 3</font>.`);
						break;
					default:
						Msg(`<font color="${GrayClr}">Invalid" ${arg}"</font>.`);
						Msg(`Modes: "<font color="${PinkClr}">[0, 1, 2, 3]</font>.`);
						break;
				}
				break;
			case "hide":
				if (typeof arg === "string" && arg !== null) {
					if (mod.settings.PlayersBlacklist.includes(arg)) return Msg(`Player '${arg}' <font color="${RedClr}">Already hidden</font>.`);
					else
						if ((mod.settings.ClassesNames.includes(arg) && !mod.settings.ClassesBlacklist.includes(arg)) || (mod.settings.RolesNames.includes(arg) && !mod.settings.RolesBlacklist.includes(arg))) {
							for (let i in mod.settings.ClassesData) {
								if ((mod.settings.ClassesData[i].name === arg || mod.settings.ClassesData[i].role.includes(arg)) && mod.settings.ClassesData[i].isHidden !== true) {
									mod.settings.ClassesData[i].isHidden = true;
									if (mod.settings.ClassesData[i].name === arg) mod.settings.ClassesBlacklist.push(arg);
									if (mod.settings.ClassesData[i].role.includes(arg)) mod.settings.RolesBlacklist.push(arg);
									let classtohide = mod.settings.ClassesData[i].model;
									for (let i in SpawnedUsers) {
										if (ClassID(SpawnedUsers[i].templateId) === classtohide) HideSpecificPlayer(SpawnedUsers[i].name);
									}
								}
							}
							Msg(`Class/Role ${arg} <font color="${GreenClr}">Hidden</font>.`);
							return;
						} else if (mod.settings.ClassesBlacklist.includes(arg) || mod.settings.RolesBlacklist.includes(arg)) return Msg(`Class/Role '${arg}' <font color="${RedClr}">Already hidden</font>.`);
					Msg(`Player '${arg}' <font color="${GreenClr}">Hidden</font>.`);
					mod.settings.PlayersBlacklist.push(arg);
					HideSpecificPlayer(arg);
				} else Msg(`<font color="${GrayClr}">Invalid ${arg2}</font>.`);
				break;
			case "show":
				if (typeof arg === "string" && arg !== null) {
					if (mod.settings.PlayersBlacklist.includes(arg)) {
						ShowSpecificPlayer(arg);
						RemoveEntity(mod.settings.PlayersBlacklist, arg);
						Msg(`Player '${arg}' <font color="${RedClr}">Shown</font>.`);
						return;
					}
					if ((mod.settings.ClassesNames.includes(arg) && mod.settings.ClassesBlacklist.includes(arg)) || (mod.settings.RolesBlacklist.includes(arg) && mod.settings.RolesNames.includes(arg))) {
						for (let i in mod.settings.ClassesData) {
							if (mod.settings.ClassesData[i].name === arg || mod.settings.ClassesData[i].role.includes(arg)) {
								if (mod.settings.ClassesData[i].name === arg) RemoveEntity(mod.settings.ClassesBlacklist, arg);
								if (mod.settings.ClassesData[i].role.includes(arg)) RemoveEntity(mod.settings.RolesBlacklist, arg);
								mod.settings.ClassesData[i].isHidden = false;
								let classToShow = mod.settings.ClassesData[i].model;
								for (let i in HiddenUsers) {
									if (ClassID(HiddenUsers[i].templateId) === classToShow) ShowSpecificPlayer(HiddenUsers[i].name);
								}
							}
						}
						Msg(`Class '${arg}' <font color="${RedClr}">Shown</font>.`);
					} else if (!mod.settings.ClassesBlacklist.includes(arg) || !mod.settings.RolesBlacklist.includes(arg)) Msg(`Class/Role '${arg}' <font color="${RedClr}">Already shown</font>.`);
					else if (!mod.settings.PlayersBlacklist.includes(arg)) Msg(`Player '${arg}' <font color="${RedClr}">Already shown</font>.`);
					else Msg(`<font color="${GrayClr}">Invalid ${arg2}</font>.`);
				}
				break;
			case "party":
				if (mod.settings.Mode === 3) return Msg(`<font color="${RedClr}">You've to disable mode 3 first</font>.`);
				mod.settings.OnlyParty = !mod.settings.OnlyParty
				if (mod.settings.OnlyParty) {
					for (let i in SpawnedUsers) {
						if (!PartyMembers.includes(SpawnedUsers[i].name)) {
							mod.toClient('S_DESPAWN_USER', 3, { gameId: SpawnedUsers[i].gameId, type: 1 })
							HiddenUsers[SpawnedUsers[i].gameId] = SpawnedUsers[i];
						}
					}
				} else ShowAllPlayers();
				Msg(`Everyone but party ${mod.settings.OnlyParty ? `<font color="${GreenClr}">Hidden</font>` : `<font color="${RedClr}">Shown</font>`}.`);
				break;
			case "raid":
				mod.settings.RaidAutoChange = !mod.settings.RaidAutoChange
				Msg(`Raid auto-state ${mod.settings.RaidAutoChange ? `<font color="${GreenClr}">Enabled</font>` : `<font color="${RedClr}">Disabled</font>`}.`);
				break;
			case "pvptraps":
				mod.settings.PvpTraps = !mod.settings.PvpTraps;
				Msg(`Pvp Traps are ${mod.settings.PvpTraps ? `<font color="${GreenClr}">Shown<font color="${PinkClr}">(not affected by hide all projectiles)</font></font>` : `<font color="${RedClr}">Normal<font color="${PinkClr}">(affected by hide all projectiles)</font></font>`}.`);
				break;
			case "list":
				Msg(`<font color="${PinkClr}">Hidden players: ${mod.settings.PlayersBlacklist}</font>.`);
				Msg(`<font color="${PinkClr}">Hidden classes: ${mod.settings.ClassesBlacklist}</font>.`);
				Msg(`<font color="${PinkClr}">Hidden roles: ${mod.settings.RolesBlacklist}</font>.`);
				break;
			case "summons":
			case "sums":
				switch (arg) {
					case "me":
						mod.settings.HideMySummons = !mod.settings.HideMySummons;
						Msg(`Own summoned NPCs ${mod.settings.HideMySummons ? `<font color="${GreenClr}">Hidden</font>` : `<font color="${RedClr}">Shown</font>`}.`);
						break;
					default:
						mod.settings.HideOthersSummons = !mod.settings.HideOthersSummons;
						Msg(`Others summoned NPCs ${mod.settings.HideOthersSummons ? `<font color="${GreenClr}">Hidden</font>` : `<font color="${RedClr}">Shown</font>`}.`);
						break;
				}
				break;
			case "skills":
			case "skill":
				switch (arg) {
					case "blacklist":
						mod.settings.HideBlacklistedSkills = !mod.settings.HideBlacklistedSkills;
						Msg(`Blacklisted skills ${mod.settings.HideBlacklistedSkills ? `<font color="${GreenClr}">Hidden</font>` : `<font color="${RedClr}">Shown</font>`}.`);
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
												Msg(`Skill ID '${arg3}' <font color="${RedClr}">Shown</font> for class '${arg2}'.`)
											}
											return;
										} else {
											mod.settings.ClassesData[i].CD_SkillsBlacklist.push(arg3)
											Msg(`Skill ID '${arg3}' <font color="${GreenClr}">Hidden</font> for class '${arg2}'.`)
											return;
										}
									} else {
										mod.settings.ClassesData[i].CD_HideBlacklistedSkills = !mod.settings.ClassesData[i].CD_HideBlacklistedSkills;
										Msg(`Skills for '${arg2}' class ${mod.settings.ClassesData[i].CD_HideBlacklistedSkills ? `<font color="${GreenClr}">Hidden</font>` : `<font color="${RedClr}">Shown</font>`}.`);
										return;
									}
								}
							}
						} else Msg(`<font color="${RedClr}">Class ${arg2} not found</font>.`);
						break;
				}
				break;
			case "npcs":
			case "npc":
				if (arg === 'hide') {
					if (!arg2 || !arg3) {
						mod.settings.HideBlacklistedNpcs = !mod.settings.HideBlacklistedNpcs;
						Msg(`Blacklisted NPCs ${mod.settings.HideBlacklistedNpcs ? `<font color="${GreenClr}">Hidden</font>` : `<font color="${RedClr}">Shown</font>`}.`);
						break;
					}
					let found = mod.settings.NpcsBlacklist.some(s => s.zone === arg2 && s.templateId === arg3);
					if (found) {
						Msg(`NPC HntZone '${arg2}', TmpId '${arg3}' <font color="${RedClr}">Removed from the blacklist</font>.`)
						mod.settings.NpcsBlacklist = mod.settings.NpcsBlacklist.filter(obj => obj.zone != arg2 || obj.templateId != arg3);
					} else {
						Msg(`NPC HntZone '${arg2}', TmpId '${arg3}' <font color="${GreenClr}">Added to the blacklist</font>.`)
						mod.settings.NpcsBlacklist.push({ zone: arg2, templateId: arg3 })
					}
					return;
				} else mod.settings.HideBlacklistedNpcs = !mod.settings.HideBlacklistedNpcs;
				Msg(`Blacklisted NPCs ${mod.settings.HideBlacklistedNpcs ? `<font color="${GreenClr}">Hidden</font>` : `<font color="${RedClr}">Shown</font>`}.`);
				break;
			case "hit":
				switch (arg) {
					case "me":
						mod.settings.Hit_Me = !mod.settings.Hit_Me;
						Msg(`Own hits effect ${mod.settings.Hit_Me ? `<font color="${GreenClr}">Hidden</font>` : `<font color="${RedClr}">Shown</font>`}.`);
						break;
					case "other":
						mod.settings.Hit_Other = !mod.settings.Hit_Other;
						Msg(`Players hit effect ${mod.settings.Hit_Other ? `<font color="${GreenClr}">Hidden</font>` : `<font color="${RedClr}">Shown</font>`}.`);
						break;
					case "damage":
						mod.settings.Hit_Damage = !mod.settings.Hit_Damage;
						Msg(`Damage numbers ${mod.settings.Hit_Damage ? `<font color="${GreenClr}">Hidden</font>` : `<font color="${RedClr}">Shown</font>`}.`);
						break;
					default:
						Msg(`<font color="${GrayClr}">Invalid &#40;hit&#41; '${arg}'</font>.`);
						break;
				}
				break;
			case "fireworks":
			case "firework":
				mod.settings.HideFireworks = !mod.settings.HideFireworks;
				Msg(`Fireworks ${mod.settings.HideFireworks ? `<font color="${GreenClr}">Hidden</font>` : `<font color="${RedClr}">Shown</font>`}.`);
				break;
			case "abn":
			case "effects":
			case "abnormal":
			case "abnormalities":
				switch (arg) {
					case "all":
						mod.settings.HideAllAbnormalities = !mod.settings.HideAllAbnormalities;
						Msg(`All Abnormalities ${mod.settings.HideAllAbnormalities ? `<font color="${GreenClr}">Hidden</font>` : `<font color="${RedClr}">Shown</font>`}.`);
						break;
					case "blacklist":
						if (!arg2 || !arg3) {
							mod.settings.HideBlacklistedAbnormalities = !mod.settings.HideBlacklistedAbnormalities;
							Msg(`Blacklisted Abnormalities ${mod.settings.HideBlacklistedAbnormalities ? `<font color="${GreenClr}">Hidden</font>` : `<font color="${RedClr}">Shown</font>`}.`);
							break;
						} else if (arg2 && arg3) {
							arg3 = Number(arg3);
							if (!mod.settings.AbnormalitiesBlacklist.includes(arg3)) {
								if (arg2 === 'add') {
									mod.settings.AbnormalitiesBlacklist.push(arg3)
									Msg(`Blacklisted Abnormalities <font color="${GreenClr}">added '${arg3}'</font>..`)
									return;
								} else if (arg2 === 'remv') return Msg(`Blacklisted Abnormalities <font color="${RedClr}">can't remove '${arg3}' as it's not there</font>.`);

							} else if (mod.settings.AbnormalitiesBlacklist.includes(arg3)) {
								if (arg2 === 'add') return Msg(`Blacklisted Abnormalities <font color="${RedClr}">can't add '${arg3}' as it's already there</font>.`);
								else if (arg2 === 'remv') {
									let index = mod.settings.AbnormalitiesBlacklist.indexOf(arg3)
									if (index !== -1) {
										mod.settings.AbnormalitiesBlacklist.splice(index, 1)
										Msg(`Blacklisted Abnormalities <font color="${RedClr}">removed '${arg3}'</font>.`);
										return;
									}
								}
							} else return Msg(`<font color="${GrayClr}">Invalid &#40;abnormalities Blacklist&#41; '${arg}'</font>.`);
						}
						break;
					case "log":
					case "debug":
						AbnDebug = !AbnDebug;
						if (AbnDebug) Msg(`Abnormalities debug <font color="${GreenClr}">started</font>, check your proxy console for details.`)
						else Msg(`Abnormalities debug <font color="${RedClr}">stopped</font>.`);
						break;
					default:
						Msg(`<font color="${GrayClr}">Invalid &#40;abnormalities&#41; '${arg}'</font>.`);
						break;
				}
				break;
			case "guildlogo":
				if (SwitchCd) return Msg(`<font color="${PinkClr}">Try again in 3 seconds</font>.`);
				mod.settings.Hideguildlogos = !mod.settings.Hideguildlogos;
				mod.toServer('C_SET_VISIBLE_RANGE', 1, { range: 0 });
				setTimeout(() => mod.toServer('C_SET_VISIBLE_RANGE', 1, { range: LastVrange }), 1500);
				SwitchCd = true;
				setTimeout(() => SwitchCd = false, 2800);
				Msg(`Guild Logos ${mod.settings.Hideguildlogos ? `<font color="${GreenClr}">Hidden</font>` : `<font color="${RedClr}">Shown</font>`}.`);
				break;
			case "costume":
			case "style":
				if (SwitchCd) return Msg(`<font color="${PinkClr}">Try again in 3 seconds</font>.`);
				mod.settings.ShowStyle = !mod.settings.ShowStyle;
				mod.toServer('C_SET_VISIBLE_RANGE', 1, { range: 0 })
				setTimeout(() => mod.toServer('C_SET_VISIBLE_RANGE', 1, { range: LastVrange }), 1500);
				SwitchCd = true
				setTimeout(() => SwitchCd = false, 2800);
				Msg(`Style of NPCs & others ${mod.settings.ShowStyle ? `<font color="${GreenClr}">Hidden</font>` : `<font color="${RedClr}">Shown</font>`}.`);
				break;
			case "proj":
			case "projectile":
				switch (arg) {
					case "all":
						mod.settings.HideAllProjectiles = !mod.settings.HideAllProjectiles;
						Msg(`Projectiles ${mod.settings.HideAllProjectiles ? `<font color="${GreenClr}">Hidden</font>` : `<font color="${RedClr}">Shown</font>`}.`);
						break;
					case "blacklist":
						if (!arg2 || !arg3) {
							mod.settings.HideBlacklistedProjectiles = !mod.settings.HideBlacklistedProjectiles;
							Msg(`Blacklisted projectile ${mod.settings.HideBlacklistedProjectiles ? `<font color="${GreenClr}">Hidden</font>` : `<font color="${RedClr}">Shown</font>`}.`);
							break;
						} else if (arg2 && arg3) {
							arg3 = Number(arg3);
							if (!mod.settings.ProjectilesBlacklist.includes(arg3)) {
								if (arg2 === 'add') {
									mod.settings.ProjectilesBlacklist.push(arg3)
									Msg(`Blacklisted projectile <font color="${GreenClr}">added '${arg3}'</font>.`)
									return;
								} else if (arg2 === 'remv') return Msg(`Blacklisted projectile <font color="${RedClr}">can't remove '${arg3}' as it's not there</font>.`);
							} else if (mod.settings.ProjectilesBlacklist.includes(arg3)) {
								if (arg2 === 'add') return Msg(`Blacklisted projectile <font color="${RedClr}">can't add '${arg3}' as it's already there</font>.`);
								else if (arg2 === 'remv') {
									let index = mod.settings.ProjectilesBlacklist.indexOf(arg3)
									if (index !== -1) {
										mod.settings.ProjectilesBlacklist.splice(index, 1)
										Msg(`Blacklisted projectile <font color="${RedClr}">removed '${arg3}'</font>.`)
										return;
									}
								}
							} else return Msg(`<font color="${GrayClr}">Invalid &#40;projectile Blacklist&#41; '${arg}'</font>.`);
						}
						break;
					case "log":
					case "debug":
						ProjDebug = !ProjDebug
						if (ProjDebug) Msg(`Projectile debug <font color="${GreenClr}">started</font>, check your proxy console for details.`)
						else Msg(`Projectile debug <font color="${RedClr}">stopped</font>.`);
						break;
					default:
						Msg(`<font color="${GrayClr}">Invalid &#40;projectile&#41; '${arg}'</font>.`);
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
						Msg(`<font color="${GrayClr}">Invalid &#40;quicklink&#41; '${arg}'</font>.`);
						break;
				}
				break;
			case "npczoom":
				mod.settings.ActionScripts = !mod.settings.ActionScripts;
				Msg(`Npc zoom-ins ${mod.settings.ActionScripts ? `<font color="${GreenClr}">Hidden</font>` : `<font color="${RedClr}">Shown</font>`}.`);
				break;
			case "dropitem":
				if (arg === 'hide') {
					if (!arg2) {
						mod.settings.HideBlacklistedDrop = !mod.settings.HideBlacklistedDrop;
						Msg(`Blacklisted Drops ${mod.settings.HideBlacklistedDrop ? `<font color="${GreenClr}">Hidden</font>` : `<font color="${RedClr}">Shown</font>`}.`);
						break;
					}
					arg2 = Number(arg2);
					let found = mod.settings.DropBlacklist.some(s => s === arg2);
					if (found) {
						Msg(`Drops id '${arg2}' <font color="${RedClr}">Removed from the blacklist</font>.`)
						mod.settings.DropBlacklist = mod.settings.DropBlacklist.filter(obj => obj != arg2)
					} else {
						Msg(`Drops id '${arg2}' <font color="${GreenClr}">Added to the blacklist</font>.`)
						mod.settings.DropBlacklist.push(arg2)
					}
					return;
				} else mod.settings.HideBlacklistedDrop = !mod.settings.HideBlacklistedDrop;
				Msg(`Blacklisted Drops ${mod.settings.HideBlacklistedDrop ? `<font color="${GreenClr}">Hidden</font>` : `<font color="${RedClr}">Shown</font>`}.`);
				break;
			case "monsterdeathani":
			case "monstersdeathani":
				mod.settings.HideMonsterDeathAnimation = !mod.settings.HideMonsterDeathAnimation;
				Msg(`Monsters Death Animation is ${mod.settings.HideMonsterDeathAnimation ? `<font color="${GreenClr}">Hidden</font>` : `<font color="${RedClr}">Shown</font>`}.`);
				break;
			case "screenabns":
				if (arg === 'hide') {
					if (!arg2) {
						mod.settings.HideOwnBlacklistedAbns = !mod.settings.HideOwnBlacklistedAbns;
						Msg(`Blacklisted ScreenAbns ${mod.settings.OwnAbnormalsBlacklist ? `<font color="${GreenClr}">Hidden</font>` : `<font color="${RedClr}">Shown</font>`}.`);
						break;
					}
					arg2 = Number(arg2);
					let found = mod.settings.OwnAbnormalsBlacklist.some(m => m === arg2);
					if (found) {
						Msg(`Abnormal id '${arg2}' <font color="${RedClr}">Removed from the blacklist</font>.`)
						mod.settings.OwnAbnormalsBlacklist = mod.settings.OwnAbnormalsBlacklist.filter(obj => obj != arg2);
					} else {
						Msg(`Abnormal id '${arg2}' <font color="${GreenClr}">Added to the blacklist</font>.`)
						mod.settings.OwnAbnormalsBlacklist.push(arg2)
					}
					return;
				} else mod.settings.HideOwnBlacklistedAbns = !mod.settings.HideOwnBlacklistedAbns;
				Msg(`Blacklisted ScreenAbns ${mod.settings.HideOwnBlacklistedAbns ? `<font color="${GreenClr}">Hidden</font>` : `<font color="${RedClr}">Shown</font>`}.`);
				break;
			case "fish":
			case "fishing":
				mod.settings.Fishing = !mod.settings.Fishing;
				Msg(`Fishing mode is ${mod.settings.Fishing ? `<font color="${GreenClr}">Enabled</font>` : `<font color="${RedClr}">Disabled</font>`}.`);
				if (mod.settings.Fishing) HideFishingNpcs();
				else ShowFishingNpcs();
				break;
			case "help":
				mod.command.exec("fps gui help");
				break;
			default:
				Msg(`<font color="${RedClr}">Unknown command, check command list</font>.`);
				mod.command.exec("fps gui help");
				break;
		}
		if (!NotCP) mod.saveSettings(); // for some reason settings still.... doesn't save properly on first run for caali's proxy so we have this here now as temp fix I guess. 🤷
	})
}