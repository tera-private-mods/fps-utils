'use strict'
/* global __dirname */

// ~~~ * Data * ~~~ \\

const NpcData = require("./data/npcData.json"), SkillData = require("./data/skillString.json");
const Last_Hook = { order: 100010 }, Last_Hookfn = { order: 100010, filter: { fake: null, silenced: false, modified: null } };
const BnzC = '#BC8F8F', SlvC = '#9A9A9A', GldC = '#DAA520', PnkC = '#FFB7C5', HPkC = '#FF69B4', CPKC = '#ED5D92', RedC = '#FE6F5E', GrnC = '#4DE19C', LPrC = '#E0B0FF', PrpC = '#9966CC', LBlC = '#4DDCE1', BluC = '#436EEE', DBlC = '#5BC0BE', HBlC = '#08B3E5', GryC = '#778899', YlwC = '#C0B94D';
const InvisibleNpcs = { 8: [6011], 12: [1], 23: [201, 202], 34: [8000], 61: [9901], 62: [9001, 9002, 9003, 9004, 9901], 83: [9901], 207: [9901], 223: [9901], 230: [9901], 2010: [9901], 2011: [9901], 2012: [9901], 2013: [9901], 2014: [9901], 2015: [9901] };
const TrapsIds = [30120, 30220, 30320, 90220, 90320, 90420, 90520, 90620, 90720, 90820, 90920, 100120, 100220, 100320, 100420, 100520, 120220, 120320, 120420, 120520, 120620, 120720, 120820, 120920, 150120, 150220, 150320, 150420, 150520, 150620, 150720, 170120, 170220, 170320, 170420, 170520, 170620, 170720, 170820, 170920, 230120, 230220, 230320, 250120, 250220, 250320, 250420, 250520, 250620, 250720, 250820, 250920, 251020];
const UserNPCs = [12345, 1100100, 1100101, 1023000, 1023001, 1023002, 1023003, 1023004, 1023005, 1023006, 1023007, 1023008, 1023009, 1023010, 1023011, 1023012, 1023013, 1023014, 1023200, 1023201, 1023202, 1023203, 1023204, 1023205, 1023206, 1023207, 1023208, 1023209, 1023210, 1023211, 1023300, 1023301, 1023302, 1023303, 1023304, 1023305, 1023306, 1023307, 1023308, 1023309, 1023310, 1023311, 1023312, 1023400, 1023401, 1023402, 1023403, 1023404, 1023405, 1024000, 1024001, 1024100, 1024200, 1024300, 2100100, 2100101, 10235001, 10235002, 10235003, 10235004, 10235005, 10235006, 10235007, 10235008, 10235009, 10235010, 10235011, 10235012, 10235013, 10235014, 10235015, 10235016, 10235017, 10235100, 10236001, 10236002, 10236003, 10236004, 10236005, 10236006, 10236007, 10236008, 10236009, 10236010, 10236011, 10236012, 10236013, 10236014, 10236015, 10236100, 10237001, 10237002, 10237003, 10237004, 10237005, 10237006, 10237007, 10237008, 10237009, 10237010, 10237011, 10237012, 10237013, 10237014, 10237015, 10237100, 10238001, 10238002, 10238003, 10238004, 10238005, 10238006, 10238007, 10238008, 10238100, 10239003, 30301001, 30301002, 30301003, 30301004, 30301005, 30302001, 30302002, 30302003, 30302004, 30302005, 30302006, 30302007, 30303001, 30303002, 30303003, 30303004, 30303005, 30303006, 30303007];
const SpamAchIds = [6, 14, 15, 17, 18, 51, 377, 391, 466, 467, 468, 469, 470, 471, 472, 473, 476, 611, 1002, 1003, 1004, 1005, 1308, 1309, 1310, 1311, 1312, 1313, 1314, 1315, 1408, 1420, 1744, 1745, 1769, 1770, 1771, 1942, 1943, 1952, 1992, 2032, 2033, 2036, 2037, 2038, 2057, 2062, 2071, 2078, 2081, 2082, 2083, 2084, 2088, 2089, 2095, 6005, 9817, 20605, 20607, 20608, 28723, 28724, 28725, 28726, 28727, 28728, 28729, 28730, 28731, 28732, 28733, 28734, 28735, 28736, 510005, 510012, 510019, 510026, 510027, 510033, 510034, 510035, 510036, 510037, 510038, 510039, 510040, 510041, 520029, 520030, 520032, 520033, 520034, 520035, 520048, 520049, 520050, 520051, 525000, 525001, 525002, 525003, 525004, 525005, 525006, 525007, 525008, 525009, 525010, 525011, 525012, 525013, 525014, 525015, 525016, 525017, 525018, 525019, 525020, 525021, 525022, 525023, 525024, 525025, 5010000];
const ImportantAbns = [90440009, 90442106, 90442110, 90442111, 90442112, 90442113, 90442114, 90442400, 90442401, 90442402, 90442403, 90442404, 90442405, 90442406, 90442407, 90442408, 90442502, 78200123, 78200126, 78200130, 78200131, 78200161, 78200162, 78200203, 78200204, 78200205, 78200209, 78200234, 78200235, 78200236];
const BlockedAbns = [201, 202, 902, 903, 908, 910, 911, 912, 913, 916, 917, 920, 921, 922, 1130, 1131, 1133, 1461, 1462, 1490, 1491, 1495, 1510, 1511, 1512, 1610, 1630, 1800, 2040, 2041, 2042, 2057, 2058, 2059, 2060, 2066, 2067, 2068, 2081, 2755, 2756, 2757, 2758, 2759, 2760, 2761, 4401, 4600, 4610, 4611, 4612, 4613, 4614, 4615, 4616, 4950, 5060, 6005, 6006, 6007, 6009, 6016, 10400, 10401, 10402, 10403, 10404, 10405, 10501, 10502, 10503, 10504, 10505, 10506, 10510, 10511, 10512, 10513, 10514, 10515, 10516, 10520, 10521, 10522, 10523, 10524, 10525, 10600, 10601, 10602, 10603, 10604, 10605, 10606, 10610, 10611, 10612, 10613, 10614, 10615, 10616, 10620, 10621, 10622, 10623, 10624, 10625, 10625, 10700, 10701, 10702, 10703, 10704, 10705, 10706, 10710, 10711, 10712, 10713, 10714, 10715, 10716, 10720, 10721, 10722, 10723, 10724, 10725, 10800, 10801, 10802, 10803, 10804, 10805, 10806, 12230, 12240, 27050, 40175, 40176, 48732, 48733, 48734, 48735, 48736, 48737, 48738, 48739, 60005, 60018, 60026, 70214, 70221, 70222, 70223, 70224, 70225, 70226, 70227, 70228, 70231, 70232, 70233, 70234, 70235, 70241, 70242, 70243, 70244, 70245, 70251, 70252, 70253, 70254, 70255, 70256, 70261, 70262, 70263, 70264, 70271, 70272, 70273, 70274, 70275, 70281, 70282, 70283, 70284, 70285, 70286, 70287, 70288, 70289, 70290, 70300, 70301, 70302, 70303, 70304, 70305, 70310, 70311, 70312, 70313, 70314, 70315, 70321, 70322, 70323, 70324, 70325, 70330, 70331, 70332, 70333, 70334, 70335, 70336, 70337, 70338, 70341, 70342, 70343, 70344, 70345, 70346, 70347, 70348, 70351, 70352, 70353, 70354, 70355, 70356, 70357, 70358, 70359, 70360, 70361, 70362, 70363, 70364, 70365, 70366, 70367, 70368, 70369, 70370, 70462, 88611, 88612, 100200, 100201, 100202, 100203, 100294, 100295, 100296, 100297, 100298, 100299, 100800, 100801, 101801, 101900, 102600, 103100, 103102, 103104, 103130, 103131, 200200, 200201, 200202, 200230, 200231, 200232, 200500, 200900, 200901, 200930, 200931, 201200, 201300, 201301, 201302, 201303, 201304, 201305, 201700, 201807, 201808, 201811, 201812, 201830, 201831, 300300, 300301, 400100, 400101, 400102, 400103, 400104, 400105, 401705, 401706, 401710, 401711, 401721, 401722, 401723, 401724, 401727, 401728, 457017, 457052, 476615, 476616, 476617, 476618, 500200, 500500, 500600, 500601, 500602, 500700, 500701, 500702, 500703, 500704, 500705, 500706, 500707, 500720, 500721, 500722, 500723, 500724, 500725, 500726, 500727, 501000, 501001, 501002, 501003, 501004, 501005, 501006, 501020, 501021, 501022, 501023, 501024, 501025, 501026, 501400, 501402, 600900, 600901, 600902, 600903, 600904, 600905, 600906, 600907, 600908, 600920, 600921, 600922, 600923, 600924, 600925, 600926, 600927, 600928, 601450, 620000, 620001, 621000, 622001, 622002, 700200, 700201, 700202, 700203, 700230, 700231, 700232, 700233, 700300, 700400, 700401, 700402, 700403, 700404, 700405, 700406, 700407, 700408, 700409, 700600, 700601, 700602, 700603, 700630, 700631, 700700, 700701, 700730, 700731, 701001, 701002, 701003, 701004, 701005, 701006, 701007, 701008, 701009, 701010, 701011, 701012, 701511, 701540, 701541, 701542, 701543, 701544, 701545, 701546, 701547, 701548, 701549, 701550, 701551, 701560, 701561, 701562, 701563, 701564, 701565, 701566, 701567, 701568, 701569, 701570, 701571, 701604, 701605, 701606, 701607, 701800, 701801, 701802, 701803, 701804, 701805, 701806, 701807, 701808, 701820, 701821, 701822, 701823, 701824, 701825, 701826, 701827, 701828, 701900, 702000, 702001, 702002, 702003, 702005, 702012, 757002, 757003, 757004, 757005, 757006, 757007, 757008, 757009, 757016, 757017, 757018, 757029, 757031, 757032, 757033, 757049, 757052, 757054, 760009, 760015, 760031, 760032, 776021, 776022, 776023, 776024, 776025, 776026, 776028, 776029, 800100, 800101, 800102, 800103, 800104, 800105, 800106, 800107, 800108, 800300, 800301, 800302, 800303, 800304, 801000, 801001, 801100, 801101, 801400, 801401, 806020, 806021, 806022, 806023, 806028, 830004, 905434, 905932, 999996, 4510004, 4510005, 4510006, 4510007, 4510008, 4510009, 4510010, 4510011, 4510012, 4510013, 4510014, 4510015, 5000000, 5000003, 5020003, 5020006, 5020007, 5020008, 5020010, 5020011, 5030004, 5030005, 5690001, 7691000, 7691007, 9691000, 9691007, 9691011, 9943049, 10152050, 10152096, 10154030, 10154054, 10155550, 14400002, 14400003, 44300066, 44300073, 44300078, 44300079, 47630300, 47650400, 47660100, 47660200, 47660300, 47660400, 47660500, 47660600, 47660700, 47660800, 47660900, 47662300, 47662800, 47680400, 74300078, 74300081, 75000016, 76600024, 77600017, 77702400, 77703433, 77703437, 78200379, 78200383, 80401500, 81121101, 81121102, 81121103, 81121104, 81121105, 81121201, 81121202, 81121203, 81121204, 81121205, 90341010, 90442101, 91600019, 93503301, 93503302, 93503303, 93503401, 93503402, 98200379, 98200383, 98850027, 98850030, 98850035, 98850036, 99000900, 99000910, 99000920, 99000930, 99000940, 99000950, 99000960, 99000970, 99001000, 99001010, 99001020, 99001030, 99001040, 99001050, 99001060, 99001070, 99001200, 99001210, 99001220, 99001230, 99001240, 99001250, 99001260, 99001270, 99001300, 99001301, 99001302, 99001303, 99001310, 99001320, 99001330, 99001340, 99001350, 99001360, 99001370, 99001400, 99001410, 99001420, 99001430, 99001440, 99001450, 99001460, 99001470, 99001700, 99001710, 99001720, 99001730, 99001740, 99001750, 99001760, 99001770, 99002300, 99002310, 99002320, 99002330, 99002340, 99002350, 99002360, 99002370, 99003200, 99003400, 99003500, 99003600, 99003700, 99020000, 99020010, 99020020, 99070011, 99070021, 99070023, 99070025, 99070027, 99070028, 99070029, 99070030, 99070031, 99070032, 999001001, 999001002, 999001003, 999001004, 999001005, 999001006, 999001007, 999001008, 999001011, 999001018, 999001019, 999001020, 999001021, 999009820, 999010000];
const GameJobs = ["warrior", "lancer", "slayer", "berserker", "sorcerer", "archer", "priest", "mystic", "reaper", "gunner", "brawler", "ninja", "valkyrie"], GameRoles = ["dps", "healer", "tank", "ranged"];

module.exports = function FpsUtils(mod) {

	const NotCP = typeof mod.compileProto !== 'undefined';

	// ~~~ * Variables * ~~~ \\

	let MyGameId,
		MyName,
		SwitchCd,
		AllowedAchUps,
		LastState,
		LastGState,
		LastVrange,
		ProjDebug,
		AbnDebug,
		TmpData = [],
		PMembers = [],
		SUsers = {},
		HUsers = {},
		SNpcs = {},
		HNpcs = {},
		SPets = {},
		HPets = {},
		HSeedBoxes = {};

	// ~~~ * Gui Parser * ~~~ \\

	const Xmap = new WeakMap();

	if (!Xmap.has(mod.dispatch || mod)) {
		Xmap.set(mod.dispatch || mod, {});

		mod.hook('C_CONFIRM_UPDATE_NOTIFICATION', 'raw', Last_Hook, () => false)

		mod.hook('C_ADMIN', 1, Last_Hookfn, (event) => {
			const commands = event.command.split(";")
			for (const cmd of commands)
				try { mod.command.exec(cmd) }
				catch (err) { continue } //In-case it errors out, to prevent the C_ADMIN packet from being sent to server.
			return false
		})
	}

	const gui = {
		parse(Xarray, title, body = '') {
			for (const data of Xarray) {
				if (body.length >= 16000) {
					body += 'Gui data limit exceeded, some values may be missing.';
					break;
				}
				if (data.command) body += `<a href="admincommand:/@${data.command}">${data.text}</a>`;
				else if (!data.command) body += `${data.text}`;
				else continue;
			}
			mod.toClient('S_ANNOUNCE_UPDATE_NOTIFICATION', 1, { id: 0, title, body })
		}
	}

	// ~~~ * Gui Handler * ~~~ \\

	function GuiHandler(page, arg) {
		switch (page) {
			case "searchnpc": case "npcsearch":
				NpcJsonSearch("search", arg);
				break;
			case "npc":
				NpcJsonSearch("starts", arg);
				break;
			case "npclist":
				TmpData.push(
					{ text: `<font color="${PrpC}" size="+24"><p align="right">MAIN MENU</p></font><br><br>`, command: "fps gui" },
					{ text: `<font color="${YlwC}" size="+20"><p align="right">[Main NPC page]</p></font><br>`, command: "fps gui npcmain" },
					{ text: `<font color="${LBlC}" size="+19">Click a NPC ID to remove it from the blacklist:</font><br>` }
				)
				for (const blNpc of mod.settings.NpcsBlacklist) TmpData.push({ text: `<font color="${BnzC}" size="+17">${blNpc.zone}, ${blNpc.templateId}</font><br>`, command: `fps npc hide ${blNpc.zone} ${blNpc.templateId};fps gui npclist` })
				gui.parse(TmpData, `<font color="${LPrC}">[FPS] Options - NPCs </font><font color="${GrnC}">(Blacklist)</font>`)
				break;
			case "npcmain":
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
				break;
			case "show":
				TmpData.push(
					{ text: `<font color="${PrpC}" size="+24"><p align="right">MAIN MENU</p></font><br>`, command: "fps gui" },
					{ text: `<font color="${RedC}" size="+16">Red</font><font color="${LPrC}" size="+16"> = Shown, <font color="${GrnC}" size="+16">Green</font><font color="${LPrC}" size="+16"> = Hidden</font></font><br>` },
					{ text: `<font color="${PnkC}" size="+16">(Command </font><font color="${HPkC}" size="+16">"fps hide &#60;name&#62;"</font><font color="${PnkC}" size="+16"> to hide someone that does not appear here)</font><br><br>` },
					{ text: `<font color="${LBlC}" size="+19">Click on <font color="${RedC}">Red</font> to hide & add to blacklist.<br>Click on <font color="${GrnC}">Green</font> to show & remove from blacklist</font><br>` }
				)
				for (const sUser in SUsers) TmpData.push({ text: `<font color="${mod.settings.PlayersBlacklist.indexOf(SUsers[sUser].name.toLowerCase()) !== -1 ? GrnC : RedC}" size="+17">${SUsers[sUser].name}</font><br>`, command: mod.settings.PlayersBlacklist.indexOf(SUsers[sUser].name.toLowerCase()) !== -1 ? `fps show ${SUsers[sUser].name};fps gui show` : `fps hide ${SUsers[sUser].name};fps gui show` })
				gui.parse(TmpData, `<font color="${LPrC}">[FPS] Options - Players </font><font color="${RedC}">(In-distance)</font>`)
				break;
			case "hide":
				TmpData.push(
					{ text: `<font color="${PrpC}" size="+24"><p align="right">MAIN MENU</p></font><br><br>`, command: "fps gui" },
					{ text: `<font color="${LBlC}" size="+19">Click to show & remove from blacklist.</font><br>` }
				)
				mod.settings.PlayersBlacklist.forEach(mem => TmpData.push({ text: `<font color="${BnzC}" size="+17">${mem}</font><br>`, command: `fps show ${mem};fps gui hide` }))
				gui.parse(TmpData, `<font color="${LPrC}">[FPS] Options - Players </font><font color="${GrnC}">(Hidden)</font>`)
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
					{ text: `<font color="${mod.settings.RolesBlacklist.includes('tank') ? GrnC : RedC}" size="+18">[Tankers]</font>`, command: `fps ${mod.settings.RolesBlacklist.includes('tank') ? "show" : "hide"} tank;fps gui role` }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.RolesBlacklist.includes('healer') ? GrnC : RedC}" size="+18">[Healers]</font>`, command: `fps ${mod.settings.RolesBlacklist.includes('healer') ? "show" : "hide"} healer;fps gui role` }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.RolesBlacklist.includes('dps') ? GrnC : RedC}" size="+18" >[Dps-All]</font>`, command: `fps ${mod.settings.RolesBlacklist.includes('dps') ? "show" : "hide"} dps;fps gui role` }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.RolesBlacklist.includes('ranged') ? GrnC : RedC}" size="+18">[Dps-Ranged]</font><br><br><br><br>`, command: `fps ${mod.settings.RolesBlacklist.includes('ranged') ? "show" : "hide"} ranged;fps gui role` },
					{ text: `<font color="${DBlC}" size="+22">By Classes</font><br><br>` },
					{ text: `<font color="${YlwC}" size="+20">Tankers:</font>` }, { text: "&#09;&#09;" },
					{ text: `<font color="${mod.settings.ClassesBlacklist.includes('lancer') ? GrnC : RedC}" size="+18">[Lancer]</font>`, command: `fps ${mod.settings.ClassesBlacklist.includes('lancer') ? "show" : "hide"} lancer;fps gui role` }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.ClassesBlacklist.includes('brawler') ? GrnC : RedC}" size="+18">[Brawler]</font><br><br>`, command: `fps ${mod.settings.ClassesBlacklist.includes('brawler') ? "show" : "hide"} brawler;fps gui role` },
					{ text: `<font color="${YlwC}" size="+20">Healers:</font>` }, { text: "&#09;&#09;" },
					{ text: `<font color="${mod.settings.ClassesBlacklist.includes('priest') ? GrnC : RedC}" size="+18">[Priest]</font>`, command: `fps ${mod.settings.ClassesBlacklist.includes('priest') ? "show" : "hide"} priest;fps gui role` }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.ClassesBlacklist.includes('mystic') ? GrnC : RedC}" size="+18">[Mystic]</font><br><br>`, command: `fps ${mod.settings.ClassesBlacklist.includes('mystic') ? "show" : "hide"} mystic;fps gui role` },
					{ text: `<font color="${YlwC}" size="+20">Dpsers(melee):</font>` }, { text: "&#09;" },
					{ text: `<font color="${mod.settings.ClassesBlacklist.includes('warrior') ? GrnC : RedC}" size="+18">[Warrior]</font>`, command: `fps ${mod.settings.ClassesBlacklist.includes('warrior') ? "show" : "hide"} warrior;fps gui role` }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.ClassesBlacklist.includes('slayer') ? GrnC : RedC}" size="+18">[Slayer]</font>`, command: `fps ${mod.settings.ClassesBlacklist.includes('slayer') ? "show" : "hide"} slayer;fps gui role` }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.ClassesBlacklist.includes('berserker') ? GrnC : RedC}" size="+18">[Berserker]</font>`, command: `fps ${mod.settings.ClassesBlacklist.includes('berserker') ? "show" : "hide"} berserker;fps gui role` }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.ClassesBlacklist.includes('ninja') ? GrnC : RedC}" size="+18">[Ninja]</font>`, command: `fps ${mod.settings.ClassesBlacklist.includes('ninja') ? "show" : "hide"} ninja;fps gui role` }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.ClassesBlacklist.includes('valkyrie') ? GrnC : RedC}" size="+18">[Valkyrie]</font>`, command: `fps ${mod.settings.ClassesBlacklist.includes('valkyrie') ? "show" : "hide"} valkyrie;fps gui role` }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.ClassesBlacklist.includes('reaper') ? GrnC : RedC}" size="+18">[Reaper]</font><br><br>`, command: `fps ${mod.settings.ClassesBlacklist.includes('reaper') ? "show" : "hide"} reaper;fps gui role` },
					{ text: `<font color="${YlwC}" size="+20">Dpsers(ranged):</font>` }, { text: "&#09;" },
					{ text: `<font color="${mod.settings.ClassesBlacklist.includes('sorcerer') ? GrnC : RedC}" size="+18">[Sorcerer]</font>`, command: `fps ${mod.settings.ClassesBlacklist.includes('sorcerer') ? "show" : "hide"} sorcerer;fps gui role` }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.ClassesBlacklist.includes('archer') ? GrnC : RedC}" size="+18">[Archer]</font>`, command: `fps ${mod.settings.ClassesBlacklist.includes('archer') ? "show" : "hide"} archer;fps gui role` }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.ClassesBlacklist.includes('gunner') ? GrnC : RedC}" size="+18">[Gunner]</font>`, command: `fps ${mod.settings.ClassesBlacklist.includes('gunner') ? "show" : "hide"} gunner;fps gui role` }
				], `<font color="${LPrC}">[FPS] Options - Roles/Classes</font>`)
				break;
			case "abn":
				TmpData.push(
					{ text: `<font color="${PrpC}" size="+24"><p align="right">MAIN MENU</p></font><br>`, command: "fps gui" },
					{ text: `<font color="${AbnDebug ? GrnC : RedC}" size="+19"><p align="right">Debug</p></font><br>`, command: "fps abn log;fps gui abn" },
					{ text: `<font color="${LPrC}" size="+19">Blacklist: </font><font color="${PnkC}" size="17+">Click to remove from the blacklist.</font><br>` }
				)
				mod.settings.AbnormalitiesBlacklist.forEach(abnmem => TmpData.push({ text: `<font color="${BnzC}" size="+16">${abnmem}<br></font>`, command: `fps abn blacklist remv ${abnmem};fps gui abn` }))
				gui.parse(TmpData, `<font color="${LPrC}">[FPS] Options - Abnormalities</font>`)
				break;
			case "proj":
				TmpData.push(
					{ text: `<font color="${PrpC}" size="+24"><p align="right">MAIN MENU</p></font><br>`, command: "fps gui" },
					{ text: `<font color="${ProjDebug ? GrnC : RedC}" size="+19"><p align="right">Debug</p></font><br>`, command: "fps proj log;fps gui proj" },
					{ text: `<font color="${LPrC}" size="+19">Blacklist: </font><font color="${PnkC}" size="17+">Click to remove from the blacklist.</font><br>` }
				)
				mod.settings.ProjectilesBlacklist.forEach(projmem => TmpData.push({ text: `<font color="${BnzC}" size="+16">${projmem}<br></font>`, command: `fps proj blacklist remv ${projmem};fps gui proj` }))
				gui.parse(TmpData, `<font color="${LPrC}">[FPS] Options - Projectiles</font>`)
				break;
			case "help":
				gui.parse([
					{ text: `<font color="${PrpC}" size="+24"><p align="right">MAIN MENU</p></font><br>`, command: "fps gui" },
					{ text: `<font size="20"><font color="${LBlC}">Command</font>            <font color="${SlvC}">Arg(s)</font>                 <font color="${CPKC}">Example</font><br>` },
					{ text: `<font color="${HBlC}">gui ^ g</font>                      <font color="${DBlC}">N/A</font>                    <font color="${HPkC}">!fps gui</font><br>` },
					{ text: `<font color="${HBlC}"> N/A </font>                         <font color="${DBlC}">N/A</font>                    <font color="${HPkC}">!fps-util</font><br>` },
					{ text: `<font color="${HBlC}">0 ^ 1 ^ 2 ^ 3</font>              <font color="${DBlC}">N/A</font>                    <font color="${HPkC}">!0 ^ !1 ^ !2 ^ !3</font><br>` },
					{ text: `<font color="${HBlC}">mode</font>                  <font color="${DBlC}">0 ^ 1 ^ 2 ^ 3</font>            <font color="${HPkC}">!fps mode 2</font><br>` },
					{ text: `<font color="${HBlC}">hide^show</font>    <font color="${DBlC}">Player^Class^Role</font>      <font color="${HPkC}">!fps hide mie</font><br>` },
					{ text: `<font color="${HBlC}">party</font>                         <font color="${DBlC}">N/A</font>                    <font color="${HPkC}">!fps party</font><br>` },
					{ text: `<font color="${HBlC}">raid</font>                           <font color="${DBlC}">N/A</font>                    <font color="${HPkC}">!fps raid</font><br>` },
					{ text: `<font color="${HBlC}">list</font>                            <font color="${DBlC}">N/A</font>                    <font color="${HPkC}">!fps list</font><br>` },
					{ text: `<font color="${HBlC}">sums</font>                 <font color="${DBlC}">other ^ me</font>               <font color="${HPkC}">!fps sums me</font><br>` },
					{ text: `<font color="${HBlC}">skill</font>                       <font color="${DBlC}">blacklist</font>               <font color="${HPkC}">!fps skill blacklist</font><br>` },
					{ text: `<font color="${HBlC}">npc</font>                      <font color="${DBlC}">N/A ^ hide</font>             <font color="${HPkC}">!fps npc</font><br>` },
					{ text: `<font color="${HBlC}">hit</font>                  <font color="${DBlC}">me^other^damage</font>    <font color="${HPkC}">!fps hit me</font><br>` },
					{ text: `<font color="${HBlC}">firework</font>                 <font color="${DBlC}">N/A</font>                     <font color="${HPkC}">!fps firework</font><br>` },
					{ text: `<font color="${HBlC}">abn</font>                   <font color="${DBlC}">all ^ blacklist</font>          <font color="${HPkC}">!fps abn blacklist</font><br>` },
					{ text: `<font color="${HBlC}">proj</font>                   <font color="${DBlC}">all ^ blacklist</font>          <font color="${HPkC}">!fps proj all</font><br>` },
					{ text: `<font color="${HBlC}">guildlogo</font>                <font color="${DBlC}">N/A</font>                    <font color="${HPkC}">!fps guildlogo</font><br>` },
					{ text: `<font color="${HBlC}">style</font>                        <font color="${DBlC}">N/A</font>                    <font color="${HPkC}">!fps style</font><br>` },
					{ text: `<font color="${HBlC}">gui npcsearch</font>      <font color="${DBlC}">"target"</font>                <font color="${HPkC}">!fps gui npcsearch E</font><br>` },
					{ text: `<font color="${HBlC}">npczoom</font>                 <font color="${DBlC}">N/A</font>                    <font color="${HPkC}">!fps npczoom</font><br>` },
					{ text: `<font color="${HBlC}">dropitem</font>                 <font color="${DBlC}">N/A ^ hide</font>        <font color="${HPkC}">!fps dropitem</font><br>` },
					{ text: `<font color="${HBlC}">monsterdeathani</font>   <font color="${DBlC}">N/A</font>                    <font color="${HPkC}">!fps monsterdeathani</font><br>` },
					{ text: `<font color="${HBlC}">screenabns</font>             <font color="${DBlC}">N/A ^  hide</font>       <font color="${HPkC}">!fps screenabns</font><br>` },
					{ text: `<font color="${HBlC}">hpnumbers</font>             <font color="${DBlC}">N/A</font>                    <font color="${HPkC}">!fps hpnumbers</font><br>` },
					{ text: `<font color="${HBlC}">mpnumbers</font>            <font color="${DBlC}">N/A</font>                    <font color="${HPkC}">!fps mpnumbers</font><br>` },
					{ text: `<font color="${HBlC}">pet</font>                          <font color="${DBlC}">N/A</font>                     <font color="${HPkC}">!fps raid</font><br>` },
					{ text: `<font color="${HBlC}">guardian</font>                <font color="${DBlC}">N/A</font>                      <font color="${HPkC}">!fps guardian</font><br>` },
					{ text: `<font color="${HBlC}">muteothers</font>            <font color="${DBlC}">N/A</font>                      <font color="${HPkC}">!fps muteothers</font><br>` },
					{ text: `<font color="${HBlC}">stream</font>                   <font color="${DBlC}">N/A</font>                      <font color="${HPkC}">!fps stream</font></font><br>` },
				], `<font color="${LPrC}">[FPS] HELP</font>`)
				break;
			default:
				gui.parse([
					{ text: `<font color="${PrpC}" size="+15"><p align="right">REFRESH</p></font><br>`, command: "fps gui" },
					{ text: `<font color="${YlwC}" size="+20">Modes:</font>` }, { text: "&#09;&#09;" },
					{ text: `<font color="${mod.settings.Mode === 0 ? GrnC : RedC}" size="+18">[Mode 0]</font>`, command: "fps mode 0;fps gui" }, { text: "&nbsp;&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.Mode === 1 ? GrnC : RedC}" size="+18">[Mode 1]</font>`, command: "fps mode 1;fps gui" }, { text: "&nbsp;&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.Mode === 2 ? GrnC : RedC}" size="+18">[Mode 2]</font>`, command: "fps mode 2;fps gui" }, { text: "&nbsp;&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.Mode === 3 ? GrnC : RedC}" size="+18">[Mode 3]</font><br><br>`, command: "fps mode 3;fps gui" },
					{ text: `<font color="${YlwC}" size="+20">Hit:</font>` }, { text: "&#09;&#09;&#09;" },
					{ text: `<font color="${mod.settings.Hit_Other ? GrnC : RedC}" size="+18">[Players]</font>`, command: "fps hit other;fps gui" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.Hit_Me ? GrnC : RedC}" size="+18">[Own]</font>`, command: "fps hit me;fps gui" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.Hit_Damage ? GrnC : RedC}" size="+18">[Dmg/heal numbers]</font>`, command: "fps hit damage;fps gui" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.Hit_All ? GrnC : RedC}" size="+18">[ALL]</font><br><br>`, command: "fps hit all;fps gui" },
					{ text: `<font color="${YlwC}" size="+20">Hide:</font>` }, { text: "&#09;&#09;" },
					{ text: `<font color="${LBlC}" size="+18">[Classes/Roles]</font>`, command: "fps gui role" }, { text: "&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.ShowStyle ? GrnC : RedC}" size="+18">[Style]</font>`, command: "fps style;fps gui" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.Hideguildlogos ? GrnC : RedC}" size="+18">[Guild Logos]</font>`, command: "fps guildlogo;fps gui" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.HideFireworks ? GrnC : RedC}" size="+18">[Firework]</font>`, command: "fps fireworks;fps gui" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.HideServantBalloons ? GrnC : RedC}" size="+18">[Pets Popup]</font><br><br>`, command: "fps petspopup;fps gui" },
					{ text: `<font color="${YlwC}" size="+20">Self(own):</font>` }, { text: "&#09;" },
					{ text: `<font color="${mod.settings.HideHpNumbers ? GrnC : RedC}" size="+18">[HP Nums]</font>`, command: "fps hpnumbers;fps gui" }, { text: "&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.HideMpNumbers ? GrnC : RedC}" size="+18">[MP Nums]</font>`, command: "fps mpnumbers;fps gui" }, { text: "&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.HideMySummons ? GrnC : RedC}" size="+18">[Own summons]</font>`, command: "fps summons me;fps gui" }, { text: "&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.HideMyServants ? GrnC : RedC}" size="+18">[Pets]</font>`, command: "fps pet me;fps gui" }, { text: "&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.HideOwnBlacklistedAbns ? GrnC : RedC}" size="+18">[Blur/dizzy]</font><br>`, command: "fps screenabns;fps gui" },
					{ text: `<font color="${YlwC}" size="+20">Players:</font>` }, { text: "&#09;&#09;" },
					{ text: `<font color="${LBlC}" size="+18">[Spawned list]</font>`, command: "fps gui show" }, { text: "&nbsp;&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${LBlC}" size="+18">[Hidden list]</font>`, command: "fps gui hide" }, { text: "&nbsp;&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.HideOthersSummons ? GrnC : RedC}" size="+18">[Players summons]</font>`, command: "fps summons;fps gui" }, { text: "&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.HideOthersServants ? GrnC : RedC}" size="+18">[Pets]</font><br>`, command: "fps pet;fps gui" },
					{ text: `<font color="${YlwC}" size="+20">NPCs:</font>` }, { text: "&#09;&#09;" },
					{ text: `<font color="${LBlC}" size="+18">[Menu]</font>`, command: "fps gui npcmain" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.HideMonsterDeathAnimation ? GrnC : RedC}" size="+18">[Hide Death Ani]</font>`, command: "fps monsterdeathani;fps gui" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.ActionScripts ? GrnC : RedC}" size="+18">[Zoom-ins]</font>`, command: "fps npczoom;fps gui" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.HideBlacklistedNpcs ? GrnC : RedC}" size="+18">[Hide Blacklisted]</font><br><br>`, command: "fps npc;fps gui" },
					{ text: `<font color="${YlwC}" size="+20">Skills:</font>` }, { text: "&#09;&#09;" },
					{ text: `<font color="${LBlC}" size="+18">[Hide individually]</font>`, command: "fps gui skills" }, { text: "&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.HideBlacklistedSkills ? GrnC : RedC}" size="+18">[Hide Blacklisted]</font><br>`, command: "fps skill blacklist;fps gui" },
					{ text: `<font color="${YlwC}" size="+20">Abnormal:</font>` }, { text: "&#09;" },
					{ text: `<font color="${mod.settings.HideAllAbnormalities ? GrnC : RedC}" size="+18">[Hide ALL]</font>`, command: "fps abn all;fps gui" }, { text: "&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.HideBlacklistedAbnormalities ? GrnC : RedC}" size="+18">[Hide Blacklisted]</font>`, command: "fps abn blacklist;fps gui" }, { text: "&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${LBlC}" size="+18">[Black List]</font><br>`, command: "fps gui abn" },
					{ text: `<font color="${YlwC}" size="+20">Projectile:</font>` }, { text: "&#09;" },
					{ text: `<font color="${mod.settings.HideAllProjectiles ? GrnC : RedC}" size="+18">[Hide ALL]</font>`, command: "fps proj all;fps gui" }, { text: "&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.HideBlacklistedProjectiles ? GrnC : RedC}" size="+18">[Hide Blacklisted]</font>`, command: "fps proj blacklist;fps gui" }, { text: "&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${LBlC}" size="+18">[Black List]</font><br><br>`, command: "fps gui proj" },
					{ text: `<font color="${YlwC}" size="+20">Misc.</font>` }, { text: "&#09;&#09;" },
					{ text: `<font color="${mod.settings.RaidAutoChange ? GrnC : RedC}" size="+18">[Raid auto state]</font>`, command: "fps raid;fps gui" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.OnlyParty ? GrnC : RedC}" size="+18">[Only Party]</font>`, command: "fps party;fps gui" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.HideBlacklistedDrop ? GrnC : RedC}" size="+18">[Drops BList]</font>`, command: "fps dropitem;fps gui" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.PvpTraps ? GrnC : RedC}" size="+17">[Show Traps]</font><br>`, command: "fps pvptraps;fps gui" }, { text: "&#09;&#09;&#09;" },
					{ text: `<font color="${mod.settings.GuardianAutoChange ? GrnC : RedC}" size="+17">[Guardian auto state]</font>`, command: "fps guardian;fps gui" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.MuteOthersVoice ? GrnC : RedC}" size="+17">[Mute others voice]</font>`, command: "fps muteothers;fps gui" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.StreamMode ? GrnC : RedC}" size="+17">[Stream]</font><br><br>`, command: "fps stream;fps gui" },
					{ text: `<font color="${BluC}" size="+22">Quick Links:</font><br>` },
					{ text: `<font color="${YlwC}" size="+20">UI:</font>` }, { text: "&#09;&#09;" },
					{ text: `<font color="${PrpC}" size="+17">[Mail]</font>`, command: "fps quicklink parcel" }, { text: "&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${PrpC}" size="+17">[Broker]</font>`, command: "fps quicklink broker" }, { text: "&nbsp;&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${PrpC}" size="+17">[Talent]</font>`, command: "fps quicklink talents" }, { text: "&nbsp;&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${PrpC}" size="+17">[Dress]</font>`, command: "fps quicklink dressingroom" }, { text: "&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${PrpC}" size="+17">[Hat Style]</font><br>`, command: "fps quicklink hatrestyle" },
					{ text: `<font color="${YlwC}" size="+20">Party:</font>` }, { text: "&#09;" },
					{ text: `<font color="${CPKC}" size="+18">[Reset]</font>`, command: "fps quicklink reset" }, { text: "&nbsp;&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${CPKC}" size="+18">[Leave]</font>`, command: "fps quicklink drop" }, { text: "&nbsp;&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${CPKC}" size="+18">[Disband]</font><br>`, command: "fps quicklink disband" },
					{ text: `<font color="${YlwC}" size="+20">System:</font>` }, { text: "&#09;" },
					{ text: `<font color="${CPKC}" size="+18">[Character Selection]</font>`, command: "fps quicklink lobby" }, { text: "&#09;&#09;&#09;&#09;&#09;" },
					{ text: `<font color="${CPKC}" size="+18">[! Instant Exit !]</font><br>`, command: "fps quicklink instantexit" }
				], `<font color="${LPrC}">[FPS] Options</font> | <font color="${RedC}" size="+16">Red</font><font color="${LPrC}" size="+16"> = disabled, <font color="${GrnC}" size="+16">Green</font><font color="${LPrC}" size="+16"> = enabled</font>`)
				break;
		}
		TmpData = [];
	}

	// ~~~ * Gui Functions * ~~~ \\

	function SkillJsonSearch(value) {
		let keys = [],
			skilldata = [],
			skillIds = [];
		skilldata.push(
			{ text: `<font color="${PrpC}" size="+24"><p align="right">MAIN MENU</p></font><br>`, command: "fps gui" },
			{ text: `<font color="${mod.settings.HideBlacklistedSkills ? GrnC : RedC}" size="+22"><p align="right">[Blacklisted skills are ${mod.settings.HideBlacklistedSkills ? 'Hidden' : 'Shown'}]</p></font><br>`, command: `fps skill blacklist;fps gui class ${value}` },
			{ text: `<font color="${LBlC}" size="+19">Click skill to blacklist it.</font><br>` }
		)
		for (const key in SkillData[value]) keys.push(key);
		skillIds.push(Object.values(SkillData[value]))
		for (let i = 0; i < keys.length; i++) {
			skilldata.push({ command: `fps skill class ${value} ${skillIds[0][i]};fps gui class ${value}`, text: `<font color="${mod.settings.ClassesData[ClassNameFromID(value)].CD_SkillsBlacklist.includes(skillIds[0][i].toString()) ? GrnC : RedC}" size="+17">[${keys[i]}]</font><br>` });
		}
		return skilldata;
	}

	function NpcJsonSearch(type, arg) {
		TmpData.push({ text: `<font color="${PrpC}" size="+24"><p align="right">MAIN MENU</p></font><br><br>`, command: "fps gui" })
		for (const data of NpcData)
			if (type === 'starts' && data.Nm.startsWith(arg) || type === 'search' && data.Nm.includes(arg))
				TmpData.push({ command: `fps npc hide ${data.Hz} ${data.Ti};fps gui ${type === 'starts' ? 'npc' : 'npcsearch'} ${arg}`, text: `<font color="${mod.settings.NpcsBlacklist.some(arrVal => data.Hz === arrVal.zone && data.Ti === arrVal.templateId) ? GrnC : RedC}" size="+17">${data.Nm}</font><br>` })
		gui.parse(TmpData, `<font color="${LPrC}">[FPS] Options - NPCs</font> | <font color="${LBlC}" size="+16">Search results for '${arg}'</font>.`)
		TmpData = []
	}

	function ClassNameFromID(name) {
		for (const cData of Object.keys(mod.settings.ClassesData)) if (mod.settings.ClassesData[cData].name === name) return cData;
	}

	// ~~~ * Command Functions * ~~~ \\

	function Msg(msg) {
		if (mod.settings.StreamMode) return;
		mod.command.message(`<font color="${LPrC}">${NotCP ? '[FPS] ' : ''}${msg}</font>`);
	}

	function RemoveEntity(name) {
		let what, A = arguments, Al = A.length, Ax;
		while (Al > 1 && name.length) {
			what = A[--Al];
			while ((Ax = name.indexOf(what)) !== -1) name.splice(Ax, 1);
		}
		return name;
	}

	function HideSpecificPlayerByName(name) {
		for (const sUser in SUsers) {
			if (SUsers[sUser].name.toString().toLowerCase() === name.toLowerCase()) {
				mod.toClient('S_DESPAWN_USER', 3, { gameId: SUsers[sUser].gameId, type: 1 });
				HUsers[SUsers[sUser].gameId] = SUsers[sUser];
				break;
			}
		}
	}

	function HideSpecificNpcByHzTi(hz, ti) {
		for (const sNpc in SNpcs) {
			if (SNpcs[sNpc].huntingZoneId === hz && SNpcs[sNpc].templateId === ti) {
				mod.toClient('S_DESPAWN_NPC', 3, { gameId: SNpcs[sNpc].gameId, loc: SNpcs[sNpc].loc, type: 1, unk: 0 })
				HNpcs[SNpcs[sNpc].gameId] = SNpcs[sNpc];
				HNpcs[SNpcs[sNpc].gameId].spawnType = 1;
				HNpcs[SNpcs[sNpc].gameId].spawnScript = 0;
				break;
			}
		}
	}

	function HideSpecificNpcByGid(gameId) {
		mod.toClient('S_DESPAWN_NPC', 3, { gameId, loc: SNpcs[gameId].loc, type: 1, unk: 0 })
		HNpcs[gameId] = SNpcs[gameId]
		HNpcs[gameId].spawnType = 1
		HNpcs[gameId].spawnScript = 0
	}

	function HideNpcs(type, whose) {
		switch (type) {
			case 'own':
			case 'others':
				for (const sNpc in SNpcs)
					if ((type === 'own' && EqGid(SNpcs[sNpc].owner) || type === 'others' && !EqGid(SNpcs[sNpc].owner)) && UserNPCs.includes(SNpcs[sNpc].templateId) && SNpcs[sNpc].huntingZoneId === 1023) HideSpecificNpcByGid(SNpcs[sNpc].gameId)
				break;
			case 'bl':
				for (const sNpc in SNpcs)
					for (const blNpc of mod.settings.NpcsBlacklist)
						if (SNpcs[sNpc].huntingZoneId === Number(blNpc.zone) && SNpcs[sNpc].templateId === Number(blNpc.templateId)) HideSpecificNpcByGid(SNpcs[sNpc].gameId)
				break;
			case 'pet':
				for (const sPet in SPets)
					if (whose === 'own' && EqGid(SPets[sPet].ownerId) || whose === 'others' && !EqGid(SPets[sPet].ownerId)) {
						mod.toClient('S_REQUEST_DESPAWN_SERVANT', 1, { gameId: SPets[sPet].gameId, despawnType: 1 })
						HPets[SPets[sPet].gameId] = SPets[sPet]
					}
				break;
			default: break;
		}
	}

	function HideAllPlayers() {
		if (mod.settings.OnlyParty) return undefined;
		for (const sUser in SUsers) {
			mod.toClient('S_DESPAWN_USER', 3, { gameId: SUsers[sUser].gameId, type: 1 });
			HUsers[SUsers[sUser].gameId] = SUsers[sUser];
			HUsers[SUsers[sUser].gameId].spawnFx = 1;
		}
	}

	function ShowSpecificPlayerByName(name) {
		for (const hUser in HUsers) {
			if (HUsers[hUser].name.toString().toLowerCase() === name.toLowerCase()) {
				ModifyUserAppearance(HUsers[hUser]);
				mod.toClient('S_SPAWN_USER', 16, HUsers[hUser]);
				delete HUsers[hUser];
				break;
			}
		}
	}

	function ShowSpecificNpcByHzTi(hz, ti) {
		for (const hNpc in HNpcs) {
			if (HNpcs[hNpc].huntingZoneId === hz && HNpcs[hNpc].templateId === ti) {
				mod.toClient('S_SPAWN_NPC', mod.majorPatchVersion < 101 ? 11 : 12, HNpcs[hNpc]);
				delete HNpcs[hNpc];
				break;
			}
		}
	}

	function ShowSpecificNpcByGid(gameId) {
		mod.toClient('S_SPAWN_NPC', mod.majorPatchVersion < 101 ? 11 : 12, HNpcs[gameId])
		delete HNpcs[gameId]
	}

	function ShowNpcs(type, whose) {
		switch (type) {
			case 'own':
			case 'others':
				for (const hNpc in HNpcs)
					if (type === 'own' && EqGid(HNpcs[hNpc].owner || type === 'others' && !EqGid(HNpcs[hNpc].owner)) && UserNPCs.includes(HNpcs[hNpc].templateId) && HNpcs[hNpc].huntingZoneId === 1023) ShowSpecificNpcByGid(HNpcs[hNpc].gameId)
				break;
			case 'bl':
				for (const hNpc in HNpcs)
					for (const blNpc of mod.settings.NpcsBlacklist)
						if (HNpcs[hNpc].huntingZoneId === Number(blNpc.zone) && HNpcs[hNpc].templateId === Number(blNpc.templateId)) ShowSpecificNpcByGid(HNpcs[hNpc].gameId)
				break;
			case 'pet':
				for (const hPet in HPets)
					if (whose === 'own' && EqGid(HPets[hPet].ownerId) || whose === 'others' && !EqGid(HPets[hPet].ownerId)) {
						mod.toClient('S_REQUEST_SPAWN_SERVANT', 4, HPets[hPet])
						delete HPets[hPet]
					}
				break;
			default: break;
		}
	}

	function ShowAllPlayers() {
		for (const hUser in HUsers) {
			ModifyUserAppearance(HUsers[hUser]);
			mod.toClient('S_SPAWN_USER', 16, HUsers[hUser]);
			delete HUsers[hUser];
		}
	}

	// ~~~ * Functions * ~~~ \\

	function ModifyUserAppearance(event) {
		let modified = undefined;

		if (mod.settings.ShowStyle) {
			event.weapon = [10001, 10002, 10003, 10004, 10005, 10006, 10007, 10008, 80396, 55005, 82005, 58171, 59053][event.templateId % 100 - 1];
			event.body = event.hand = event.feet = event.underwear = event.head = event.face = 0;
			if (event.mount) event.mount = 16;
			event.title = 0;
			event.weaponDye = event.bodyDye = event.handDye = event.feetDye = event.weaponEnchant = 0;
			event.showFace = false;
			event.styleHead = event.styleFace = event.styleBack = event.styleWeapon = event.styleBody = 0;
			event.underwearDye = event.styleBackDye = event.styleHeadDye = event.styleFaceDye = 0;
			event.showStyle = false;
			event.styleFootprint = event.styleHeadScale = event.styleFaceScale = event.styleBackScale = 0;
			event.usedStyleHeadTransform = false;
			event.styleBodyDye = 0;
			event.icons = [];

			modified = true;
		}

		if (mod.settings.Hideguildlogos) {
			event.guildLogo = '';
			event.guildLogoId = 0;

			modified = true;
		}

		if (mod.settings.MuteOthersVoice) {
			event.appearance.voice = 249;

			modified = true;
		}

		return modified;
	}

	function ModifyAbnormalities(event, end) {
		if (ImportantAbns.indexOf(event.id) !== -1) return undefined;

		if ([90442103, 90442107].indexOf(event.id) !== -1) {
			event.id = 47702000;

			return true;
		}

		if (!end) {
			if (EqGid(event.target)) {
				if (mod.settings.HideOwnBlacklistedAbns && mod.settings.OwnAbnormalsBlacklist.indexOf(event.id) !== -1) return false;

				return undefined;
			}

			if (HUsers[event.target] || HNpcs[event.target] || event.id === 9943049) return false;
			if (mod.settings.HideBlacklistedAbnormalities && (mod.settings.AbnormalitiesBlacklist.indexOf(event.id) !== -1 || BlockedAbns.indexOf(event.id) !== -1)) return false;
			if (mod.settings.HideAllAbnormalities && (SUsers[event.target] || mod.settings.AbnormalitiesBlacklist.indexOf(event.id) !== -1 || BlockedAbns.indexOf(event.id) !== -1)) return false;
		}
	}

	function ActionHCheck(event, end) {
		let hidden = false;

		if (EqGid(event.gameId) || !SUsers[event.gameId]) return undefined;

		if (mod.settings.Mode >= 2 || HUsers[event.gameId] || mod.settings.ClassesData[ClassID(event.templateId)].CD_HideBlacklistedSkills) hidden = true;
		if (mod.settings.HideBlacklistedSkills && mod.settings.ClassesData[ClassID(event.templateId)].CD_SkillsBlacklist.includes(Math.floor(event.skill.id / 10000).toString())) hidden = true;

		if (hidden) UpdateUserLoc(event);

		if (HNpcs[event.gameId]) {
			HNpcs[event.gameId].loc = event.loc;

			hidden = true;
		}

		return !end && hidden ? false : undefined;
	}

	function ProjectileBCheck(event) {
		let blocked = false;

		if ((mod.settings.Mode !== 3 && event.skill.id === 90120) || (mod.settings.PvpTraps && TrapsIds.includes(event.skill.id))) return undefined;

		if ((mod.settings.HideBlacklistedProjectiles || mod.settings.HideAllProjectiles) && mod.settings.ProjectilesBlacklist.includes(event.skill.id)) blocked = true;
		if (!EqGid(event.gameId) && SUsers[event.gameId] && (HUsers[event.gameId] || mod.settings.Mode >= 2 || mod.settings.HideAllProjectiles)) blocked = true;

		return blocked ? false : undefined;
	}

	function ModifySkillResult(event) {
		let modified = undefined;

		if (mod.settings.Hit_Me && (EqGid(event.source) || EqGid(event.owner))) {
			event.templateId = 0;
			event.skill.id = 0;
			event.time = event.type = event.noctEffect = 0;
			event.crit = event.stackExplode = event.superArmor = false;
			event.superArmorId = event.hitCylinderId = 0;

			modified = true;
		}

		if (mod.settings.Hit_Other && !EqGid(event.target) && !EqGid(event.source) && !EqGid(event.owner) && (SUsers[event.owner] || SUsers[event.source])) {
			event.templateId = 0;
			event.skill.id = 0;
			event.time = event.type = event.noctEffect = 0;
			event.crit = event.stackExplode = event.superArmor = false;
			event.superArmorId = event.hitCylinderId = 0;

			modified = true;
		}

		if (mod.settings.Hit_Damage && (EqGid(event.source) || EqGid(event.owner) || EqGid(event.target) || UserNPCs.includes(event.templateId) && event.skill.huntingZoneId === 1023)) {
			event.value = 0n;

			modified = true;
		}

		if (mod.settings.Hit_All) {
			event.templateId = 0;
			event.skill.id = 0;
			event.time = event.type = event.noctEffect = 0;
			event.value = 0n;
			event.crit = event.stackExplode = event.superArmor = false;
			event.superArmorId = event.hitCylinderId = 0;

			modified = true;
		}

		return modified;
	}

	const UserBCheck = user => { for (const plBlist of mod.settings.PlayersBlacklist) if (plBlist.toLowerCase() === user.toLowerCase()) return true }

	function NpcBCheck(event) {
		let blocked = false;

		if (mod.settings.HideBlacklistedNpcs) {
			for (const blNpc of mod.settings.NpcsBlacklist) {
				if (event.huntingZoneId === Number(blNpc.zone) && event.templateId === Number(blNpc.templateId)) {
					HNpcs[event.gameId] = event;
					HNpcs[event.gameId].spawnType = 1;
					HNpcs[event.gameId].spawnScript = 0;
					blocked = true;
					break;
				}
			}
		}

		if (InvisibleNpcs[event.huntingZoneId] && InvisibleNpcs[event.huntingZoneId].includes(event.templateId)) {
			HNpcs[event.gameId] = event;
			blocked = true;
		}

		if (mod.settings.HideFireworks && event.huntingZoneId === 1023 && [60016000, 80037000].includes(event.templateId)) {
			HNpcs[event.gameId] = event;
			blocked = true;
		}

		if (UserNPCs.includes(event.templateId) && event.huntingZoneId === 1023) {
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

		return blocked ? false : undefined;
	}

	function EqGid(xG) {
		return (xG === MyGameId);
	}

	function ClassID(m) {
		return (m % 100);
	}

	function log(name, type, from, target, id) {
		console.log(`[\x1b[37m${new Date().toJSON().slice(11)}\x1b[39m] \x1b[91m->\x1b[39m \x1b[36m${name}\x1b[39m \x1b[35m${type}\x1b[39m \x1b[97m${from}\x1b[39m \x1b[32m'${target}'\x1b[39m: \x1b[94m\ID\x1b[39m "\x1b[31m${id}\x1b[39m\x1b[49m\x1b[0m"`);
	}

	function UpdateUserLoc(event) {
		mod.toClient('S_USER_LOCATION', 5, { gameId: event.gameId, loc: event.loc, w: event.w, speed: 300, dest: event.loc, type: 7 });
	}

	// ~~~ * Hook Functions * ~~~ \\

	function sLogin(event) {
		LastState = event.name === MyName ? LastState : null;
		LastGState = null;
		MyGameId = event.gameId;
		MyName = event.name;
		ProjDebug = false;
		AbnDebug = false;
		if (mod.settings.StreamMode) console.log("\x1b[94mINFO\x1b[34m [FPS-UTILS]\x1b[39m - Steam Mode is enabled, No messages will be sent in-game messages until its disabled.");
	}

	function sLoadTopo() {
		SUsers = {};
		SNpcs = {};
		HUsers = {};
		HNpcs = {};
		AllowedAchUps = 2;
		if (ProjDebug) {
			ProjDebug = false
			Msg(`<font color="${HPkC}">Auto Disabled</font> projectile debug, to reduce the unneeded spam.`);
		}
		if (AbnDebug) {
			AbnDebug = false
			Msg(`<font color="${HPkC}">Auto Disabled</font> abnormalities debug, to reduce the unneeded spam.`);
		}
	}

	function sLeaveParty() {
		if (mod.settings.OnlyParty)
			for (const sUser in SUsers)
				if (PMembers.includes(SUsers[sUser].name)) HideSpecificPlayerByName(SUsers[sUser].name)
		PMembers = []
		if (mod.settings.RaidAutoChange) {
			if (LastState === null || mod.settings.Mode !== 2) {
				LastState = null;
				return;
			}
			mod.command.exec(`fps mode ${LastState}`);
			LastState = null;
		}
	}

	function sMountVehicle(event) {
		if (EqGid(event.gameId)) return;
		SUsers[event.gameId].mount = event.id;
		if (HUsers[event.gameId]) HUsers[event.gameId].mount = event.id;
		if (mod.settings.ShowStyle) {
			event.id = 16;
			return true;
		}
	}

	function sUnmountVehicle(event) {
		if (EqGid(event.gameId)) return;
		SUsers[event.gameId].mount = 0;
		if (HUsers[event.gameId]) HUsers[event.gameId].mount = 0;
	}

	function cSetVisibleRange(event) {
		LastVrange = event.range;
	}

	function sStartCooltimeItem(event) {
		if (event.cooldown === 0) return false;
	}

	function sStartActionScript(event) {
		if ([40000, 40001, 40002, 426002].includes(event.script)) return;
		if (mod.settings.ActionScripts) return false;
	}

	function sLoadingScreenControlInfo() {
		if (mod.settings.Mode >= 2) return false;
	}

	function sUpdateAchievementProgress(event) {
		if (AllowedAchUps) {
			AllowedAchUps--;
			return;
		}
		for (const Achieve of event.achievements) if (SpamAchIds.indexOf(Achieve.id) !== -1 || !Achieve.requirements.length) return false;
	}

	function sItemCustomString(event) {
		if (event.customStrings.length === 0) return false;
	}

	function sSocial(event) {
		if (EqGid(event.target)) return;
		if (HUsers[event.target] || HNpcs[event.target]) return false;
	}

	function sGuildName(event) {
		if (mod.settings.Hideguildlogos) {
			event.guildLogo = '';
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
		if (mod.settings.Mode === 3 || UserBCheck(event.name) || mod.settings.ClassesData[ClassID(event.templateId)].isHidden || (mod.settings.OnlyParty && !PMembers.includes(event.name))) {
			HUsers[event.gameId] = event;
			HUsers[event.gameId].spawnFx = 1;
			return false;
		}
		return ModifyUserAppearance(event);
	}

	function sSpawnUserfn(event) {
		return ModifyUserAppearance(event);
	}

	function sDespawnUser(event) {
		delete HUsers[event.gameId];
		delete SUsers[event.gameId];
	}

	function sUserLocation(event) {
		if (SUsers[event.gameId]) {
			SUsers[event.gameId].loc = event.dest;
			SUsers[event.gameId].w = event.w;
		}
		if (HUsers[event.gameId]) {
			HUsers[event.gameId].loc = event.dest;
			HUsers[event.gameId].w = event.w;
			return false;
		}
	}

	function sUserStatus(event) {
		if (SUsers[event.gameId]) SUsers[event.gameId].status = event.status;
		if (HUsers[event.gameId]) {
			HUsers[event.gameId].status = event.status;
			return false;
		}
	}

	function sDeadLocation(event) {
		if (SUsers[event.gameId]) SUsers[event.gameId].loc = event.loc;
		if (HUsers[event.gameId]) HUsers[event.gameId].loc = event.loc;
	}

	function sUserMovetype(event) {
		if (SUsers[event.gameId]) SUsers[event.gameId].w = event.w
		if (HUsers[event.gameId]) {
			HUsers[event.gameId].w = event.w
			return false
		}
	}

	function sPartyMemberList(event) {
		event.members.map(value => PMembers.push(value.name))
		if (mod.settings.OnlyParty)
			for (const sUser in SUsers) {
				if (!PMembers.includes(SUsers[sUser].name)) HideSpecificPlayerByName(SUsers[sUser].name)
				else if (HUsers[SUsers[sUser].gameId]) ShowSpecificPlayerByName(SUsers[sUser].name)
			}
		if (mod.settings.RaidAutoChange) {
			if (event.members.length >= 18) { //event.raid
				if (mod.settings.Mode >= 2 || (LastState === null && mod.settings.Mode === 2)) return;
				LastState = mod.settings.Mode;
				mod.command.exec("fps state 2");
			} else {
				if (LastState === null || mod.settings.Mode !== 2) {
					LastState = null;
					return;
				}
				mod.command.exec(`fps state ${LastState}`);
				LastState = null;
			}
		}
	}

	function sUserAppearanceChange(event) {
		if (EqGid(event.id)) return;
		if (mod.settings.ShowStyle) return false;
	}

	function sUserChangeFaceCustom(event) {
		if (EqGid(event.gameId)) return;

		if (mod.settings.MuteOthersVoice) {
			event.appearance.voice = 249;
			return true;
		}
	}

	function sUserExternalChange(event) {
		if (EqGid(event.gameId)) return;
		if (mod.settings.ShowStyle) return false;
	}

	function sUnicastTransformData(event) {
		if (EqGid(event.gameId) || !event.gameId) return;
		if (mod.settings.ShowStyle) return false;

		let modified = undefined;

		if (mod.settings.Hideguildlogos) {
			event.guildLogo = '';

			modified = true;
		}

		if (mod.settings.MuteOthersVoice) {
			event.appearance.voice = 249;

			modified = true;
		}

		return modified;
	}

	function sSpawnNpc(event) {
		SNpcs[event.gameId] = event;
		SNpcs[event.gameId].spawnType = 1;
		SNpcs[event.gameId].spawnScript = 0;
		return NpcBCheck(event);
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
			SNpcs[event.gameId].loc = event.dest;
			SNpcs[event.gameId].w = event.w;
		}
		if (SPets[event.gameId]) {
			SPets[event.gameId].loc = event.dest;
			SPets[event.gameId].w = event.w;
		}
		if (HPets[event.gameId]) {
			HPets[event.gameId].loc = event.dest;
			HPets[event.gameId].w = event.w;
			return false
		}
		if (HNpcs[event.gameId]) {
			HNpcs[event.gameId].loc = event.dest;
			HNpcs[event.gameId].w = event.w;
			return false;
		}
	}

	function sCreatureLife(event) {
		if (SNpcs[event.gameId]) {
			SNpcs[event.gameId].loc = event.loc;
			SNpcs[event.gameId].alive = event.alive;
		}
		if (HNpcs[event.gameId]) {
			SNpcs[event.gameId].loc = event.loc;
			HNpcs[event.gameId].alive = event.alive;
		}
	}

	function sCreatureRotate(event) {
		if (SNpcs[event.gameId]) SNpcs[event.gameId].w = event.w;
		if (HNpcs[event.gameId]) {
			HNpcs[event.gameId].w = event.w;
			return false;
		}
	}

	function sFearMoveStage(event) {
		if ((!EqGid(event.gameId) && mod.settings.Mode === 3) || HUsers[event.gameId] || HNpcs[event.gameId]) return false;
	}

	function sFearMoveEnd(event) {
		if ((!EqGid(event.gameId) && mod.settings.Mode === 3) || HUsers[event.gameId] || HNpcs[event.gameId]) return false;
	}

	function sRequestSpawnServant(event) {
		SPets[event.gameId] = event;
		if (EqGid(event.ownerId) && mod.settings.HideMyServants) {
			HPets[event.gameId] = event;
			return false;
		} else if (!EqGid(event.ownerId) && mod.settings.HideOthersServants) {
			HPets[event.gameId] = event;
			return false;
		}
	}

	function sRequestDespawnServant(event) {
		delete HPets[event.gameId];
		delete SPets[event.gameId];
	}

	function sQuestBalloon(event) {
		if (!SPets[event.source]) return;
		if (mod.settings.HideServantBalloons) return false;
	}

	function sAbnormalityBegin(event) {
		if (AbnDebug) {
			if (EqGid(event.target)) log('Abnormality', 'Applied', 'on', MyName, event.id);
			if (EqGid(event.source)) log('Abnormality', 'Started', 'from', MyName, event.id);
			if (SUsers[event.target]) log('Abnormality', 'Applied', 'on', SUsers[event.target].name, event.id);
			if (SUsers[event.source]) log('Abnormality', 'Started', 'from', SUsers[event.source].name, event.id);
		}
		return ModifyAbnormalities(event);
	}

	function sAbnormalityRefresh(event) {
		return ModifyAbnormalities(event);
	}

	function sAbnormalityEnd(event) {
		return ModifyAbnormalities(event, true);
	}

	function sActionStage(event) {
		return ActionHCheck(event);
	}

	function sActionEnd(event) {
		return ActionHCheck(event, true);
	}

	function sStartUserProjectile(event) {
		if (ProjDebug) {
			if (EqGid(event.gameId)) log('Projectile', 'Started', 'from', MyName, event.skill.id);
			if (SUsers[event.gameId]) log('Projectile', 'Started', 'from', SUsers[event.gameId].name, event.skill.id);
		}
		return ProjectileBCheck(event);
	}

	function sSpawnProjectile(event) {
		if (event.skill.npc) return;
		if (ProjDebug) {
			if (EqGid(event.gameId)) log('Projectile', 'Spawned', 'from', MyName, event.skill.id);
			if (SUsers[event.gameId]) log('Projectile', 'Spawned', 'from', SUsers[event.gameId].name, event.skill.id);
		}
		return ProjectileBCheck(event);
	}

	function sPlayerChangeMp(event) {
		if (!mod.settings.HideMpNumbers || !EqGid(event.target)) return;
		if (event.type !== 0) {
			event.type = 0;
			return true;
		}
	}

	function sCreatureChangeHp(event) {
		if (!mod.settings.HideHpNumbers || !EqGid(event.target)) return;
		if (event.type !== 10) {
			event.type = 10;
			return true;
		}
	}

	function sEachSkillResult(event) {
		return ModifySkillResult(event);
	}

	function sItemExplosionResult(event) {
		if (mod.settings.Mode >= 2 || (EqGid(event.gameId) && mod.settings.Hit_Me) || (!EqGid(event.gameId) && mod.settings.Hit_Other) || mod.settings.Hit_All || HUsers[event.gameId]) {
			for (const gameId of event.items) {
				if (SUsers[event.gameId] && mod.settings.HideBlacklistedDrop && mod.settings.DropBlacklist.some(item => [8008, 8009, 8010, 8011, 8012, 8013, 8014, 8015, 8016, 8017, 8018, 8019, 8020, 8021, 8022, 8023].indexOf(item) !== -1)) continue;
				mod.toClient('S_DESPAWN_DROPITEM', 4, { gameId });
			}
			return false
		}
	}

	function sSpawnDropItem(event) {
		if (EqGid(event.source)) return;
		if (mod.settings.HideBlacklistedDrop && mod.settings.DropBlacklist.indexOf(event.item) !== -1) return false;
		if (mod.settings.Mode >= 2) {
			event.explode = 0;
			return true;
		}
	}

	function sFontSwapInfo() {
		if (mod.settings.Hit_Damage || mod.settings.Hit_All) return false;
	}

	function sSpawnEventSeed(event) {
		if (HUsers[event.owner]) {
			HSeedBoxes[event.gameId] = event;
			return false;
		}
	}

	function sUpdateEventSeedState(event) {
		if (HSeedBoxes[event.gameId]) return false;
	}

	function sResultEventSeed(event) {
		if (HSeedBoxes[event.gameId]) return false;
	}

	function sDespawnEventSeed(event) {
		if (HSeedBoxes[event.gameId]) {
			delete HSeedBoxes[event.gameId];
			return false;
		}
	}

	function sFieldEventOnEnter() {
		if (mod.settings.GuardianAutoChange) {
			if ((LastGState !== null && mod.settings.Mode === 2) || mod.settings.Mode >= 2) return;
			LastGState = mod.settings.Mode;
			mod.command.exec("fps state 2")
		}
	}

	function sFieldEventOnLeave() {
		if (mod.settings.GuardianAutoChange) {
			if (LastGState === null || mod.settings.Mode !== 2) {
				LastGState = null;
				return;
			}
			mod.command.exec(`fps state ${LastGState}`);
			LastGState = null;
		}
	}

	// ~~~ * Packet Hooks * ~~~ \\

	mod.hook('S_LOGIN', 14, sLogin)
	mod.hook('S_LOAD_TOPO', 'raw', sLoadTopo)
	mod.hook('S_LEAVE_PARTY', 'raw', sLeaveParty)
	mod.hook('S_MOUNT_VEHICLE', 2, Last_Hook, sMountVehicle)
	mod.hook('S_UNMOUNT_VEHICLE', 2, Last_Hook, sUnmountVehicle)
	mod.hook('C_SET_VISIBLE_RANGE', 1, cSetVisibleRange)
	mod.hook('S_START_COOLTIME_ITEM', 1, Last_Hook, sStartCooltimeItem)
	mod.hook('S_START_ACTION_SCRIPT', 3, Last_Hook, sStartActionScript)

	mod.hook('S_LOADING_SCREEN_CONTROL_INFO', 'raw', Last_Hook, sLoadingScreenControlInfo)
	mod.hook('S_UPDATE_ACHIEVEMENT_PROGRESS', 1, Last_Hookfn, sUpdateAchievementProgress)
	mod.hook('S_ITEM_CUSTOM_STRING', 2, Last_Hook, sItemCustomString)

	mod.hook('S_SOCIAL', 1, Last_Hook, sSocial)
	mod.hook('S_GUILD_NAME', 2, Last_Hook, sGuildName)
	mod.hook('S_APPLY_TITLE', 3, Last_Hook, sApplyTitle)
	mod.hook('S_IMAGE_DATA', 'raw', Last_Hook, sImageData)

	mod.hook('S_SPAWN_USER', 16, Last_Hook, sSpawnUser)
	mod.hook('S_SPAWN_USER', 16, Last_Hookfn, sSpawnUserfn)
	mod.hook('S_DESPAWN_USER', 3, sDespawnUser)
	mod.hook('S_USER_LOCATION', 5, Last_Hook, sUserLocation)
	mod.hook('S_USER_STATUS', 3, Last_Hook, sUserStatus)
	mod.hook('S_DEAD_LOCATION', 2, sDeadLocation)
	mod.hook('S_USER_MOVETYPE', 1, Last_Hook, sUserMovetype)
	mod.hook('S_PARTY_MEMBER_LIST', 7, sPartyMemberList)
	mod.hook('S_USER_APPEARANCE_CHANGE', 1, Last_Hook, sUserAppearanceChange)
	mod.hook('S_USER_CHANGE_FACE_CUSTOM', 2, Last_Hook, sUserChangeFaceCustom)
	mod.hook('S_USER_EXTERNAL_CHANGE', 7, Last_Hook, sUserExternalChange)
	mod.hook('S_UNICAST_TRANSFORM_DATA', 6, Last_Hook, sUnicastTransformData)

	mod.hook('S_SPAWN_NPC', mod.majorPatchVersion < 101 ? 11 : 12, Last_Hook, sSpawnNpc)
	mod.hook('S_DESPAWN_NPC', 3, Last_Hook, sDespawnNpc)
	mod.hook('S_NPC_LOCATION', 3, Last_Hook, sNpcLocation)
	mod.hook('S_CREATURE_LIFE', 3, sCreatureLife)
	mod.hook('S_CREATURE_ROTATE', 2, Last_Hook, sCreatureRotate)
	mod.hook('S_FEARMOVE_STAGE', 2, Last_Hook, sFearMoveStage)
	mod.hook('S_FEARMOVE_END', 2, Last_Hook, sFearMoveEnd)

	mod.hook('S_REQUEST_SPAWN_SERVANT', 4, Last_Hook, sRequestSpawnServant)
	mod.hook('S_REQUEST_DESPAWN_SERVANT', 1, Last_Hook, sRequestDespawnServant)
	mod.hook('S_QUEST_BALLOON', 1, Last_Hook, sQuestBalloon)

	mod.hook('S_ABNORMALITY_BEGIN', 3, Last_Hookfn, sAbnormalityBegin)
	mod.hook('S_ABNORMALITY_REFRESH', 1, Last_Hookfn, sAbnormalityRefresh)
	mod.hook('S_ABNORMALITY_END', 1, Last_Hookfn, sAbnormalityEnd)

	mod.hook('S_ACTION_STAGE', 9, Last_Hook, sActionStage)
	mod.hook('S_ACTION_END', 5, Last_Hook, sActionEnd)
	mod.hook('S_SPAWN_PROJECTILE', 5, Last_Hook, sSpawnProjectile)
	mod.hook('S_START_USER_PROJECTILE', 9, Last_Hook, sStartUserProjectile)
	mod.hook('S_PLAYER_CHANGE_MP', 1, Last_Hook, sPlayerChangeMp)
	mod.hook('S_CREATURE_CHANGE_HP', 6, Last_Hook, sCreatureChangeHp)
	mod.hook('S_ITEM_EXPLOSION_RESULT', 2, Last_Hook, sItemExplosionResult)
	mod.hook('S_EACH_SKILL_RESULT', 14, Last_Hook, sEachSkillResult)
	mod.hook('S_SPAWN_DROPITEM', 9, Last_Hook, sSpawnDropItem)
	mod.hook('S_FONT_SWAP_INFO', 'raw', Last_Hookfn, sFontSwapInfo)

	mod.hook('S_SPAWN_EVENT_SEED', 2, Last_Hookfn, sSpawnEventSeed)
	mod.hook('S_UPDATE_EVENT_SEED_STATE', 4, Last_Hookfn, sUpdateEventSeedState)
	mod.hook('S_RESULT_EVENT_SEED', 2, Last_Hookfn, sResultEventSeed)
	mod.hook('S_DESPAWN_EVENT_SEED', 1, Last_Hookfn, sDespawnEventSeed)

	mod.hook('S_FIELD_EVENT_ON_ENTER', 'raw', sFieldEventOnEnter)
	mod.hook('S_FIELD_EVENT_ON_LEAVE', 'raw', sFieldEventOnLeave)

	// ~~~ * Commands * ~~~ \\

	mod.command.add('0', () => mod.command.exec('fps mode 0'))
	mod.command.add('1', () => mod.command.exec('fps mode 1'))
	mod.command.add('2', () => mod.command.exec('fps mode 2'))
	mod.command.add('3', () => mod.command.exec('fps mode 3'))

	mod.command.add(['fps', '!fps', 'fps-utils', '!fps-utils'], (key, arg, arg2, arg3) => {
		key = key ? key.toLowerCase() : key;
		arg = arg ? arg.toLowerCase() : arg;
		arg2 = arg2 ? arg2.toLowerCase() : arg2;
		arg3 = arg3 ? arg3.toLowerCase() : arg3;
		switch (key) {
			case "b": mod.command.exec('fps skills blacklist'); break;
			case "p": mod.command.exec('fps party'); break;
			case "g": case "gui": GuiHandler(arg, arg2); break;
			case "0": mod.command.exec('fps mode 0'); break;
			case "1": mod.command.exec('fps mode 1'); break;
			case "2": mod.command.exec('fps mode 2'); break;
			case "3": mod.command.exec('fps mode 3'); break;
			case "m": case "mod": case "mode": case "state":
				switch (arg) {
					case "0": case "off": case "zero":
						if (mod.settings.Mode === 3) ShowAllPlayers();
						mod.settings.Mode = 0;
						mod.settings.HideAllAbnormalities = false;
						mod.settings.HideAllProjectiles = false;
						if (!mod.settings.Hit_All) mod.settings.Hit_Other = false;
						Msg(`<font color="${RedC}">Mode 0</font>.`);
						break;
					case "1": case "one":
						if (mod.settings.Mode === 3) ShowAllPlayers();
						mod.settings.Mode = 1;
						mod.settings.HideAllAbnormalities = false;
						mod.settings.HideAllProjectiles = true;
						if (!mod.settings.Hit_All) mod.settings.Hit_Other = true;
						Msg(`<font color="${BnzC}">Mode 1</font>.`);
						break;
					case "2": case "two":
						if (mod.settings.Mode === 3) ShowAllPlayers();
						mod.settings.Mode = 2;
						mod.settings.HideAllAbnormalities = true;
						mod.settings.HideAllProjectiles = true;
						if (!mod.settings.Hit_All) mod.settings.Hit_Other = true;
						Msg(`<font color="${SlvC}">Mode 2</font>.`);
						break;
					case "3": case "three":
						HideAllPlayers();
						mod.settings.Mode = 3;
						mod.settings.HideAllAbnormalities = true;
						mod.settings.HideAllProjectiles = true;
						if (!mod.settings.Hit_All) mod.settings.Hit_Other = true;
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
						if ((GameJobs.includes(arg) && !mod.settings.ClassesBlacklist.includes(arg)) || (GameRoles.includes(arg) && !mod.settings.RolesBlacklist.includes(arg))) {
							for (const cData in mod.settings.ClassesData) {
								if ((mod.settings.ClassesData[cData].name === arg || mod.settings.ClassesData[cData].role.includes(arg)) && !mod.settings.ClassesData[cData].isHidden) {
									mod.settings.ClassesData[cData].isHidden = true;
									if (mod.settings.ClassesData[cData].name === arg) mod.settings.ClassesBlacklist.push(arg);
									if (mod.settings.ClassesData[cData].role.includes(arg)) mod.settings.RolesBlacklist.push(arg);
									let classtohide = mod.settings.ClassesData[cData].model;
									for (const sUser in SUsers)
										if (ClassID(SUsers[sUser].templateId) === classtohide) HideSpecificPlayerByName(SUsers[sUser].name);
								}
							}
							Msg(`Class/Role ${arg} <font color="${GrnC}">Hidden</font>.`);
							return;
						} else if (mod.settings.ClassesBlacklist.includes(arg) || mod.settings.RolesBlacklist.includes(arg)) return Msg(`Class/Role '${arg}' <font color="${RedC}">Already hidden</font>.`);
					Msg(`Player '${arg}' <font color="${GrnC}">Hidden</font>.`);
					mod.settings.PlayersBlacklist.push(arg);
					HideSpecificPlayerByName(arg);
				} else Msg(`<font color="${GryC}">Invalid ${arg2}</font>.`);
				break;
			case "show":
				if (typeof arg === "string" && arg !== null) {
					if (mod.settings.PlayersBlacklist.includes(arg)) {
						ShowSpecificPlayerByName(arg);
						RemoveEntity(mod.settings.PlayersBlacklist, arg);
						Msg(`Player '${arg}' <font color="${RedC}">Shown</font>.`);
						return;
					}
					if ((GameJobs.includes(arg) && mod.settings.ClassesBlacklist.includes(arg)) || (mod.settings.RolesBlacklist.includes(arg) && GameRoles.includes(arg))) {
						for (const cData in mod.settings.ClassesData) {
							if (mod.settings.ClassesData[cData].name === arg || mod.settings.ClassesData[cData].role.includes(arg)) {
								if (mod.settings.ClassesData[cData].name === arg) RemoveEntity(mod.settings.ClassesBlacklist, arg);
								if (mod.settings.ClassesData[cData].role.includes(arg)) RemoveEntity(mod.settings.RolesBlacklist, arg);
								mod.settings.ClassesData[cData].isHidden = false;
								let classToShow = mod.settings.ClassesData[cData].model;
								for (const hUser in HUsers) if (ClassID(HUsers[hUser].templateId) === classToShow) ShowSpecificPlayerByName(HUsers[hUser].name);
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
				//if(!PMembers.length) return Msg(`<font color="${GryC}">You must be in party in-order to enable this</font>.`)
				mod.settings.OnlyParty = !mod.settings.OnlyParty;
				if (mod.settings.OnlyParty) {
					for (const sUser in SUsers) {
						if (!PMembers.includes(SUsers[sUser].name)) HideSpecificPlayerByName(SUsers[sUser].name)
						else if (HUsers[SUsers[sUser].gameId]) ShowSpecificPlayerByName(SUsers[sUser].name)
					}
				} else ShowAllPlayers();
				Msg(`Everyone but party ${mod.settings.OnlyParty ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
				break;
			case "raid":
				mod.settings.RaidAutoChange = !mod.settings.RaidAutoChange;
				Msg(`Raid auto-state ${mod.settings.RaidAutoChange ? `<font color="${GrnC}">Enabled</font>` : `<font color="${RedC}">Disabled</font>`}.`);
				if (!mod.settings.GuardianAutoChange) LastState = null;
				break;
			case "guardian":
				mod.settings.GuardianAutoChange = !mod.settings.GuardianAutoChange;
				Msg(`Guardian auto-state ${mod.settings.GuardianAutoChange ? `<font color="${GrnC}">Enabled</font>` : `<font color="${RedC}">Disabled</font>`}.`);
				if (!mod.settings.GuardianAutoChange) LastGState = null;
				break;
			case "pvptraps":
				mod.settings.PvpTraps = !mod.settings.PvpTraps;
				Msg(`Pvp Traps are ${mod.settings.PvpTraps ? `<font color="${GrnC}">Shown<font color="${PnkC}">(not affected by hide all projectiles)</font></font>` : `<font color="${RedC}">Normal<font color="${PnkC}">(affected by hide all projectiles)</font></font>`}.`);
				break;
			case "list":
				Msg(`<font color="${PnkC}">Hidden players: ${mod.settings.PlayersBlacklist.length ? mod.settings.PlayersBlacklist.join(', ') : 0}</font>.`);
				Msg(`<font color="${PnkC}">Hidden classes: ${mod.settings.ClassesBlacklist.length ? mod.settings.ClassesBlacklist.join(', ') : 0}</font>.`);
				Msg(`<font color="${PnkC}">Hidden roles: ${mod.settings.RolesBlacklist.length ? mod.settings.RolesBlacklist.join(', ') : 0}</font>.`);
				break;
			case "summons": case "sums":
				switch (arg) {
					case "me": case "own":
						mod.settings.HideMySummons = !mod.settings.HideMySummons;
						mod.settings.HideMySummons ? HideNpcs('own') : ShowNpcs('own');
						Msg(`Own summoned NPCs are ${mod.settings.HideMySummons ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
						break;
					default:
						mod.settings.HideOthersSummons = !mod.settings.HideOthersSummons;
						mod.settings.HideOthersSummons ? HideNpcs('others') : ShowNpcs('others');
						Msg(`Others summoned NPCs are ${mod.settings.HideOthersSummons ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
						break;
				}
				break;
			case "skills": case "skill":
				switch (arg) {
					case "blacklist":
						mod.settings.HideBlacklistedSkills = !mod.settings.HideBlacklistedSkills;
						Msg(`Blacklisted skills ${mod.settings.HideBlacklistedSkills ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
						break;
					case "class":
						if (GameJobs.includes(arg2)) {
							for (const cData in mod.settings.ClassesData) {
								if (mod.settings.ClassesData[cData].name === arg2) {
									if (arg3 && !isNaN(arg3) && arg3 < 50) {
										if (mod.settings.ClassesData[cData].CD_SkillsBlacklist.includes(arg3)) {
											let index = mod.settings.ClassesData[cData].CD_SkillsBlacklist.indexOf(arg3);
											if (index !== -1) {
												mod.settings.ClassesData[cData].CD_SkillsBlacklist.splice(index, 1);
												Msg(`Skill ID '${arg3}' <font color="${RedC}">Shown</font> for class '${arg2}'.`);
											}
											return;
										} else {
											mod.settings.ClassesData[cData].CD_SkillsBlacklist.push(arg3);
											Msg(`Skill ID '${arg3}' <font color="${GrnC}">Hidden</font> for class '${arg2}'.`);
											return;
										}
									} else {
										mod.settings.ClassesData[cData].CD_HideBlacklistedSkills = !mod.settings.ClassesData[cData].CD_HideBlacklistedSkills;
										Msg(`Skills for '${arg2}' class ${mod.settings.ClassesData[cData].CD_HideBlacklistedSkills ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
										return;
									}
								}
							}
						} else Msg(`<font color="${RedC}">Class ${arg2} not found</font>.`);
						break;
				}
				break;
			case "npcs": case "npc":
				if (arg === 'hide') {
					if (!arg2 || !arg3) {
						mod.settings.HideBlacklistedNpcs = !mod.settings.HideBlacklistedNpcs;
						Msg(`Blacklisted NPCs ${mod.settings.HideBlacklistedNpcs ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
						break;
					}
					const found = mod.settings.NpcsBlacklist.some(s => s.zone === arg2 && s.templateId === arg3);
					if (found) {
						if (mod.settings.HideBlacklistedNpcs) ShowSpecificNpcByHzTi(Number(arg2), Number(arg3));
						Msg(`NPC HntZone '${arg2}', TmpId '${arg3}' <font color="${RedC}">Removed from the blacklist</font>.`);
						mod.settings.NpcsBlacklist = mod.settings.NpcsBlacklist.filter(obj => obj.zone !== arg2 || obj.templateId !== arg3);
					} else {
						if (mod.settings.HideBlacklistedNpcs) HideSpecificNpcByHzTi(Number(arg2), Number(arg3));
						Msg(`NPC HntZone '${arg2}', TmpId '${arg3}' <font color="${GrnC}">Added to the blacklist</font>.`);
						mod.settings.NpcsBlacklist.push({ zone: arg2, templateId: arg3 });
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
						if (mod.settings.Hit_All) return Msg(`<font color="${RedC}">You've to disable hit ALL first</font>.`);
						mod.settings.Hit_Me = !mod.settings.Hit_Me;
						Msg(`Own hits effect ${mod.settings.Hit_Me ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
						break;
					case "other":
						if (mod.settings.Hit_All) return Msg(`<font color="${RedC}">You've to disable hit ALL first</font>.`);
						mod.settings.Hit_Other = !mod.settings.Hit_Other;
						Msg(`Players hit effect ${mod.settings.Hit_Other ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
						break;
					case "damage":
						if (mod.settings.Hit_All) return Msg(`<font color="${RedC}">You've to disable hit ALL first</font>.`);
						mod.settings.Hit_Damage = !mod.settings.Hit_Damage;
						Msg(`Damage numbers ${mod.settings.Hit_Damage ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
						break;
					case "all":
						mod.settings.Hit_Me = mod.settings.Hit_Other = mod.settings.Hit_Damage = false;
						mod.settings.Hit_All = !mod.settings.Hit_All;
						Msg(`Hit all ${mod.settings.Hit_All ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
						break;
					default:
						Msg(`<font color="${GryC}">Invalid &#40;hit&#41; '${arg}'</font>.`);
						break;
				}
				break;
			case "fireworks": case "firework":
				mod.settings.HideFireworks = !mod.settings.HideFireworks;
				Msg(`Fireworks ${mod.settings.HideFireworks ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
				break;
			case "abn": case "effects": case "abnormal": case "abnormalities":
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
									mod.settings.AbnormalitiesBlacklist.push(arg3);
									Msg(`Blacklisted Abnormalities <font color="${GrnC}">added '${arg3}'</font>.`);
									return;
								} else if (arg2 === 'remv') return Msg(`Blacklisted Abnormalities <font color="${RedC}">can't remove '${arg3}' as it's not there</font>.`);

							} else if (mod.settings.AbnormalitiesBlacklist.includes(arg3)) {
								if (arg2 === 'add') return Msg(`Blacklisted Abnormalities <font color="${RedC}">can't add '${arg3}' as it's already there</font>.`);
								else if (arg2 === 'remv') {
									let index = mod.settings.AbnormalitiesBlacklist.indexOf(arg3);
									if (index !== -1) {
										mod.settings.AbnormalitiesBlacklist.splice(index, 1);
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
				mod.setTimeout(() => mod.toServer('C_SET_VISIBLE_RANGE', 1, { range: LastVrange }), 1500);
				SwitchCd = true;
				mod.setTimeout(() => SwitchCd = false, 2800);
				Msg(`Guild Logos ${mod.settings.Hideguildlogos ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
				break;
			case "costume": case "style":
				if (SwitchCd) return Msg(`<font color="${PnkC}">Try again in 3 seconds</font>.`);
				mod.settings.ShowStyle = !mod.settings.ShowStyle;
				mod.toServer('C_SET_VISIBLE_RANGE', 1, { range: 0 });
				mod.setTimeout(() => mod.toServer('C_SET_VISIBLE_RANGE', 1, { range: LastVrange }), 1500);
				SwitchCd = true;
				mod.setTimeout(() => SwitchCd = false, 2800);
				Msg(`Style of NPCs & others ${mod.settings.ShowStyle ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
				break;
			case "proj": case "projectile":
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
									mod.settings.ProjectilesBlacklist.push(arg3);
									Msg(`Blacklisted projectile <font color="${GrnC}">added '${arg3}'</font>.`);
									return;
								} else if (arg2 === 'remv') return Msg(`Blacklisted projectile <font color="${RedC}">can't remove '${arg3}' as it's not there</font>.`);
							} else if (mod.settings.ProjectilesBlacklist.includes(arg3)) {
								if (arg2 === 'add') return Msg(`Blacklisted projectile <font color="${RedC}">can't add '${arg3}' as it's already there</font>.`);
								else if (arg2 === 'remv') {
									let index = mod.settings.ProjectilesBlacklist.indexOf(arg3);
									if (index !== -1) {
										mod.settings.ProjectilesBlacklist.splice(index, 1);
										Msg(`Blacklisted projectile <font color="${RedC}">removed '${arg3}'</font>.`);
										return;
									}
								}
							} else return Msg(`<font color="${GryC}">Invalid &#40;projectile Blacklist&#41; '${arg}'</font>.`);
						}
						break;
					case "log": case "debug":
						ProjDebug = !ProjDebug;
						if (ProjDebug) Msg(`Projectile debug <font color="${GrnC}">started</font>, check your proxy console for details.`);
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
						mod.toServer('C_REQUEST_CONTRACT', 1, { type: 78 });
						break;
					case "broker":
						mod.toClient('S_NPC_MENU_SELECT', 1, { type: 28 });
						break;
					case "dress": case "dressingroom":
						mod.toServer('C_REQUEST_CONTRACT', 1, { type: 77 });
						break;
					case "hat": case "hatrestyle":
						mod.toServer('C_REQUEST_CONTRACT', 1, { type: 91 });
						break;
					case "lobby":
						mod.toServer('C_RETURN_TO_LOBBY', 1);
						break;
					case "exit": case "instantexit":
						mod.toClient('S_EXIT', 3, { category: 0, code: 0 });
						break;
					case "drop":
						mod.toServer('C_LEAVE_PARTY', 1);
						break;
					case "disband":
						mod.toServer('C_DISMISS_PARTY', 1);
						break;
					case "reset":
						mod.toServer('C_RESET_ALL_DUNGEON', 1);
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
			case "dropitem": case "drops":
				if (arg === 'hide') {
					if (!arg2) {
						mod.settings.HideBlacklistedDrop = !mod.settings.HideBlacklistedDrop;
						Msg(`Blacklisted Drops ${mod.settings.HideBlacklistedDrop ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
						break;
					}
					arg2 = Number(arg2);
					const found1 = mod.settings.DropBlacklist.some(s => s === arg2);
					if (found1) {
						Msg(`Drops id '${arg2}' <font color="${RedC}">Removed from the blacklist</font>.`);
						mod.settings.DropBlacklist = mod.settings.DropBlacklist.filter(obj => obj !== Number(arg2));
					} else {
						Msg(`Drops id '${arg2}' <font color="${GrnC}">Added to the blacklist</font>.`);
						mod.settings.DropBlacklist.push(arg2);
					}
					return;
				} else mod.settings.HideBlacklistedDrop = !mod.settings.HideBlacklistedDrop;
				Msg(`Blacklisted Drops ${mod.settings.HideBlacklistedDrop ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
				break;
			case "monsterdeathani": case "monstersdeathani":
				mod.settings.HideMonsterDeathAnimation = !mod.settings.HideMonsterDeathAnimation;
				Msg(`Monsters Death Animation is ${mod.settings.HideMonsterDeathAnimation ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
				break;
			case "screenabns": case "blur":
				if (arg === 'hide') {
					if (!arg2) {
						mod.settings.HideOwnBlacklistedAbns = !mod.settings.HideOwnBlacklistedAbns;
						Msg(`Blacklisted ScreenAbns ${mod.settings.OwnAbnormalsBlacklist ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
						break;
					}
					arg2 = Number(arg2);
					const found2 = mod.settings.OwnAbnormalsBlacklist.some(m => m === arg2);
					if (found2) {
						Msg(`Abnormal id '${arg2}' <font color="${RedC}">Removed from the blacklist</font>.`);
						mod.settings.OwnAbnormalsBlacklist = mod.settings.OwnAbnormalsBlacklist.filter(obj => obj !== Number(arg2));
					} else {
						Msg(`Abnormal id '${arg2}' <font color="${GrnC}">Added to the blacklist</font>.`);
						mod.settings.OwnAbnormalsBlacklist.push(arg2);
					}
					return;
				} else mod.settings.HideOwnBlacklistedAbns = !mod.settings.HideOwnBlacklistedAbns;
				Msg(`Blacklisted ScreenAbns ${mod.settings.HideOwnBlacklistedAbns ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
				break;
			case "pet": case "pets": case "servant": case "servants":
				switch (arg) {
					case "me":
						mod.settings.HideMyServants = !mod.settings.HideMyServants;
						mod.settings.HideMyServants ? HideNpcs('pet', 'own') : ShowNpcs('pet', 'own');
						Msg(`Own Servants are ${mod.settings.HideMyServants ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
						break;
					default:
						mod.settings.HideOthersServants = !mod.settings.HideOthersServants;
						mod.settings.HideOthersServants ? HideNpcs('pet', 'others') : ShowNpcs('pet', 'others');
						Msg(`Others summoned Servants are ${mod.settings.HideOthersServants ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
						break;
				}
				break;
			case "hpnumbers":
				mod.settings.HideHpNumbers = !mod.settings.HideHpNumbers;
				Msg(`Own Hp numbers ${mod.settings.HideHpNumbers ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
				break;
			case "mpnumbers":
				mod.settings.HideMpNumbers = !mod.settings.HideMpNumbers;
				Msg(`Own Mp numbers ${mod.settings.HideMpNumbers ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
				break;
			case "muteothers":
				mod.settings.MuteOthersVoice = !mod.settings.MuteOthersVoice;
				Msg(`Mute others voice is ${mod.settings.MuteOthersVoice ? `<font color="${GrnC}">Enabled</font>` : `<font color="${RedC}">Disabled</font>`}.`);
				break;
			case "petspopup":
				mod.settings.HideServantBalloons = !mod.settings.HideServantBalloons;
				Msg(`Hide Pets Popup chat balloons is ${mod.settings.HideServantBalloons ? `<font color="${GrnC}">Enabled</font>` : `<font color="${RedC}">Disabled</font>`}.`);
				break;
			case "stream":
				mod.settings.StreamMode = !mod.settings.StreamMode;
				Msg(`Stream mode is ${mod.settings.StreamMode ? `<font color="${GrnC}">Enabled</font>` : `<font color="${RedC}">Disabled</font>`}.`);
				if (mod.settings.StreamMode) console.log("\x1b[94mINFO\x1b[34m [FPS-UTILS]\x1b[39m - Steam Mode has been enabled, No messages will be sent in-game messages until its disabled.");
				else console.log("\x1b[94mINFO\x1b[34m [FPS-UTILS]\x1b[39m - Steam Mode has been disabled.");
				break;
			case "help": case "h":
				mod.command.exec("fps gui help");
				break;
			default:
				//Msg(`<font color="${RedC}">Unknown command, check command list</font>.`);
				//mod.command.exec("fps gui help");
				mod.command.exec("fps gui");
				break;
		}
		if (!NotCP && typeof mod.settings.ClassesData["12"] === 'undefined') mod.saveSettings();
	})
}