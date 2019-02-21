'use strict'
/* global __dirname */

function LoadThis() { //Lets hope this won't break other modules.
	const { protocol } = require('tera-data-parser');

	protocol.messages.set('S_LOGIN', new Map().set(12, [['name', 'offset'], ['details', 'count'], ['details', 'offset'], ['shape', 'count'], ['shape', 'offset'], ['templateId', 'int32'], ['gameId', 'uint64'], ['serverId', 'uint32'], ['playerId', 'uint32'], ['actionMode', 'int32'], ['alive', 'bool'], ['status', 'int32'], ['walkSpeed', 'int32'], ['runSpeed', 'int32'], ['appearance', 'customize'], ['visible', 'bool'], ['isSecondCharacter', 'bool'], ['level', 'uint16'], ['profMineral', 'uint16'], ['profBug', 'uint16'], ['profHerb', 'uint16'], ['profEnergy', 'uint16'], ['profPet', 'uint16'], ['pkDeclareCount', 'int32'], ['pkKillCount', 'int32'], ['totalXp', 'int64'], ['levelXp', 'int64'], ['totalLevelXp', 'int64'], ['unkn1', 'int32'], ['restBonusXp', 'int32'], ['maxRestBonusXp', 'int32'], ['xpBonusPercent', 'float'], ['dropBonusPercent', 'float'], ['weapon', 'int32'], ['body', 'int32'], ['hand', 'int32'], ['feet', 'int32'], ['underwear', 'int32'], ['head', 'int32'], ['face', 'int32'], ['serverTime', 'int64'], ['isPkServer', 'bool'], ['chatBanEndTime', 'int64'], ['title', 'uint32'], ['weaponModel', 'int32'], ['bodyModel', 'int32'], ['handModel', 'int32'], ['feetModel', 'int32'], ['weaponDye', 'uint32'], ['bodyDye', 'uint32'], ['handDye', 'uint32'], ['feetDye', 'uint32'], ['unkn2', 'uint32'], ['weaponEnchant', 'uint32'], ['isWorldEventTarget', 'bool'], ['infamy', 'int32'], ['showFace', 'bool'], ['styleHead', 'uint32'], ['styleFace', 'uint32'], ['styleBack', 'uint32'], ['styleWeapon', 'uint32'], ['styleBody', 'uint32'], ['styleBodyDye', 'uint32'], ['unionId', 'uint32'], ['unionClass', 'uint32'], ['unionEchelon', 'uint32'], ['showStyle', 'bool'], ['titleCount', 'int64'], ['appearance2', 'int32'], ['scale', 'float'], ['name', 'string'], ['details', 'bytes'], ['shape', 'bytes']]))
	protocol.messages.set('S_ABNORMALITY_BEGIN', new Map().set(3, [['target', 'uint64'], ['source', 'uint64'], ['id', 'uint32'], ['duration', 'int32'], ['unk', 'int32'], ['stacks', 'int32']]))
	protocol.messages.set('S_CREATURE_CHANGE_HP', new Map().set(6, [['curHp', 'uint32'], ['maxHp', 'uint32'], ['diff', 'int32'], ['type', 'uint32'], ['target', 'uint64'], ['source', 'uint64'], ['crit', 'byte']]))
	protocol.messages.set('S_USER_LOCATION', new Map().set(5, [['gameId', 'uint64'], ['loc', 'vec3'], ['w', 'angle'], ['speed', 'int16'], ['dest', 'vec3'], ['type', 'int32'], ['inShuttle', 'bool']]))
	protocol.messages.set('S_START_USER_PROJECTILE', new Map().set(9, [['gameId', 'uint64'], ['templateId', 'int32'], ['unk1', 'int32'], ['id', 'uint64'], ['skill', 'uint32'], ['loc', 'vec3'], ['dest', 'vec3'], ['speed', 'float']]))
	protocol.messages.set('S_SPAWN_USER', new Map().set(14, [['icons', 'count'], ['icons', 'offset'], ['name', 'offset'], ['guildName', 'offset'], ['guildRank', 'offset'], ['details', 'count'], ['details', 'offset'], ['guildTitle', 'offset'], ['guildLogo', 'offset'], ['shape', 'count'], ['shape', 'offset'], ['serverId', 'uint32'], ['playerId', 'uint32'], ['gameId', 'uint64'], ['loc', 'vec3'], ['w', 'angle'], ['relation', 'int32'], ['templateId', 'int32'], ['huntingZoneId', 'int16'], ['walkSpeed', 'int16'], ['runSpeed', 'int16'], ['actionMode', 'int16'], ['status', 'int16'], ['visible', 'bool'], ['alive', 'bool'], ['appearance', 'customize'], ['weapon', 'uint32'], ['body', 'uint32'], ['hand', 'uint32'], ['feet', 'uint32'], ['underwear', 'uint32'], ['head', 'uint32'], ['face', 'uint32'], ['spawnFx', 'int32'], ['mount', 'int32'], ['pose', 'int32'], ['title', 'int32'], ['shuttleId', 'int64'], ['guildLogoId', 'int32'], ['exarch', 'bool'], ['gm', 'bool'], ['gmInvisible', 'bool'], ['weaponModel', 'uint32'], ['bodyModel', 'uint32'], ['handModel', 'uint32'], ['feetModel', 'uint32'], ['weaponDye', 'uint32'], ['bodyDye', 'uint32'], ['handDye', 'uint32'], ['feetDye', 'uint32'], ['weaponEnchant', 'uint32'], ['isWorldEventTarget', 'bool'], ['pkEnabled', 'bool'], ['level', 'int32'], ['vehicleEx', 'uint64'], ['showFace', 'bool'], ['styleHead', 'uint32'], ['styleFace', 'uint32'], ['styleBack', 'uint32'], ['styleWeapon', 'uint32'], ['styleBody', 'uint32'], ['styleBodyDye', 'uint32'], ['partyServer', 'int32'], ['partyId', 'int32'], ['raid', 'bool'], ['unionId', 'uint32'], ['unionClass', 'uint32'], ['unionEchelon', 'uint32'], ['showStyle', 'bool'], ['titleCount', 'int64'], ['appearance2', 'int32'], ['scale', 'float'], ['icons', [['icon', 'int32']]], ['name', 'string'], ['guildName', 'string'], ['guildRank', 'string'], ['details', 'bytes'], ['guildTitle', 'string'], ['guildLogo', 'string'], ['shape', 'bytes']]))
	protocol.messages.set('S_SPAWN_PROJECTILE', new Map().set(5, [['id', 'uint64'], ['unk1', 'uint32'], ['skill', 'uint32'], ['loc', 'vec3'], ['dest', 'vec3'], ['moving', 'bool'], ['speed', 'float'], ['gameId', 'uint64'], ['templateId', 'int32']]))
	protocol.messages.set('S_SPAWN_NPC', new Map().set(11, [['seats', 'count'], ['seats', 'offset'], ['npcName', 'offset'], ['gameId', 'uint64'], ['target', 'uint64'], ['loc', 'vec3'], ['w', 'angle'], ['relation', 'int32'], ['templateId', 'uint32'], ['huntingZoneId', 'uint16'], ['walkSpeed', 'int16'], ['runSpeed', 'int16'], ['status', 'int16'], ['mode', 'int16'], ['hpLevel', 'int16'], ['questInfo', 'int16'], ['visible', 'bool'], ['villager', 'bool'], ['spawnType', 'int32'], ['replaceId', 'uint64'], ['spawnScript', 'uint32'], ['replaceDespawnScript', 'uint32'], ['aggressive', 'bool'], ['owner', 'uint64'], ['occupiedByPartyId', 'uint64'], ['occupiedByPlayerId', 'uint64'], ['unk1', 'uint32'], ['unk2', 'byte'], ['seats', [['id', 'uint32'], ['passengerId', 'uint64'], ['pitch', 'angle'], ['yaw', 'angle'], ['passengerMaxHp', 'int32'], ['passengerMaxMp', 'int32'], ['passengerHp', 'int32'], ['passengerMp', 'int32']]], ['npcName', 'string']]))
	protocol.messages.set('S_SPAWN_DROPITEM', new Map().set(6, [['owners', 'count'], ['owners', 'offset'], ['gameId', 'uint64'], ['loc', 'vec3'], ['item', 'int32'], ['amount', 'int32'], ['expiry', 'int32'], ['explode', 'bool'], ['masterwork', 'bool'], ['enchant', 'int32'], ['source', 'uint64'], ['owners', [['gameId', 'uint64']]]]))
	protocol.messages.set('S_PARTY_MEMBER_LIST', new Map().set(7, [['members', 'count'], ['members', 'offset'], ['ims', 'bool'], ['raid', 'bool'], ['unk1', 'uint32'], ['unk2', 'uint32'], ['unk3', 'uint16'], ['unk4', 'uint16'], ['leaderServerId', 'uint32'], ['leaderPlayerId', 'uint32'], ['unk5', 'uint32'], ['unk6', 'uint32'], ['unk7', 'byte'], ['unk8', 'uint32'], ['unk9', 'byte'], ['unk10', 'uint32'], ['unk11', 'byte'], ['members', [['name', 'offset'], ['serverId', 'uint32'], ['playerId', 'uint32'], ['level', 'uint32'], ['class', 'uint32'], ['online', 'bool'], ['gameId', 'uint64'], ['order', 'int32'], ['canInvite', 'byte'], ['name', 'string']]]]))
	protocol.messages.set('S_ACTION_STAGE', new Map().set(9, [['animSeq', 'count'], ['animSeq', 'offset'], ['gameId', 'uint64'], ['loc', 'vec3'], ['w', 'angle'], ['templateId', 'int32'], ['skill', 'uint32'], ['stage', 'int32'], ['speed', 'float'], ['id', 'uint32'], ['animSeq', [['duration', 'int32'], ['xyRate', 'float'], ['zRate', 'float'], ['distance', 'float']]]]))
	const ReactionObject12 = [['movement', 'count'], ['movement', 'offset'], ['enable', 'bool'], ['instantPush', 'bool'], ['loc', 'vec3'], ['w', 'angle'], ['skill', 'uint32'], ['stage', 'int32'], ['id', 'uint32'], ['movement', [['duration', 'int32'], ['speed', 'float'], ['unk', 'float'], ['distance', 'float']]]]
	ReactionObject12.type = 'object';
	protocol.messages.set('S_EACH_SKILL_RESULT', new Map().set(12, [['source', 'uint64'], ['target', 'uint64'], ['templateId', 'int32'], ['skill', 'uint32'], ['stage', 'int32'], ['targeting', 'int16'], ['area', 'int16'], ['id', 'uint32'], ['time', 'int32'], ['damage', 'int32'], ['type', 'int16'], ['noctEffect', 'int16'], ['crit', 'bool'], ['stackExplode', 'bool'], ['reaction', ReactionObject12]]))
	//const ReactionObject13 = [['enable', 'bool'], ['push', 'bool'], ['loc', 'vec3'], ['w', 'angle'], ['skill', 'uint32'], ['stage', 'int32'], ['id', 'uint32'], ['animSeq', [['duration', 'int32'], ['xyRate', 'float'], ['zRate', 'float'], ['distance', 'float']]]]
	//ReactionObject13.type = 'object';
	//protocol.messages.set('S_EACH_SKILL_RESULT', new Map().set(13, [['source', 'uint64'], ['target', 'uint64'], ['templateId', 'int32'], ['skill', 'uint32'], ['targeting', 'int32'], ['area', 'int32'], ['id', 'uint32'], ['time', 'int32'], ['value', 'int32'], ['type', 'int16'], ['noctEffect', 'int16'], ['crit', 'bool'], ['stackExplode', 'bool'], ['reaction', ReactionObject13]]))

	// Misc.
	protocol.messages.set('S_JOIN_PRIVATE_CHAT', new Map().set(1, [['name', 'offset'], ['index', 'int32'], ['id', 'int32'], ['name', 'string']]))
	protocol.messages.set('S_USER_EFFECT', new Map().set(1, [['target', 'uint64'], ['circle', 'int32'], ['operation', 'int32']]))
	protocol.messages.set('C_PLAYER_LOCATION', new Map().set(5, [['loc', 'vec3'], ['w', 'angle'], ['dest', 'vec3'], ['type', 'int32'], ['jumpDistance', 'int16'], ['inShuttle', 'bool'], ['time', 'uint32']]))
	protocol.messages.set('S_ACTION_END', new Map().set(5, [['gameId', 'uint64'], ['loc', 'vec3'], ['w', 'angle'], ['templateId', 'int32'], ['skill', 'uint32'], ['type', 'int32'], ['id', 'uint32']]))
	protocol.messages.set('S_NPC_STATUS', new Map().set(2, [['gameId', 'uint64'], ['enraged', 'bool'], ['hpLevel', 'int32'], ['target', 'uint64'], ['status', 'int32']]))
	protocol.messages.set('C_USE_ITEM', new Map().set(3, [['gameId', 'uint64'], ['id', 'int32'], ['dbid', 'uint64'], ['target', 'uint64'], ['dest', 'vec3'], ['loc', 'vec3'], ['w', 'angle'], ['unk1', 'uint32'], ['unk2', 'uint32'], ['unk3', 'uint32'], ['unk4', 'bool']]))
	//protocol.messages.set('S_USER_EXTERNAL_CHANGE', new Map().set(7, [['gameId', 'uint64'], ['weapon', 'int32'], ['body', 'int32'], ['hand', 'int32'], ['feet', 'int32'], ['underwear', 'int32'], ['head', 'int32'], ['face', 'int32'], ['weaponModel', 'int32'], ['bodyModel', 'uint32'], ['handModel', 'uint32'], ['feetModel', 'uint32'], ['weaponDye', 'uint32'], ['bodyDye', 'uint32'], ['handDye', 'uint32'], ['feetDye', 'uint32'], ['underwearDye', 'uint32'], ['weaponEnchant', 'uint32'], ['styleHead', 'int32'], ['styleFace', 'int32'], ['styleBack', 'int32'], ['styleWeapon', 'int32'], ['styleBody', 'int32'], ['styleBodyDye', 'uint32'], ['showStyle', 'bool']]))
	//protocol.messages.set('S_INVEN', new Map().set(16, [['items', 'count'], ['items', 'offset'], ['gameId', 'uint64'], ['gold', 'int64'], ['open', 'bool'], ['first', 'bool'], ['more', 'bool'], ['size', 'int32'], ['itemLevelInventory', 'int32'], ['itemLevel', 'int32'], ['tcat', 'int64'], ['brokerUseTcat', 'int32'], ['items', [['passivities', 'count'], ['passivities', 'offset'], ['customString', 'offset'], ['id', 'int32'], ['dbid', 'uint64'], ['ownerId', 'uint64'], ['slot', 'uint32'], ['storageType', 'int32'], ['amount', 'int32'], ['enchant', 'int32'], ['durability', 'int32'], ['soulbound', 'bool'], ['crystal1', 'int32'], ['crystal2', 'int32'], ['crystal3', 'int32'], ['crystal4', 'int32'], ['crystal5', 'int32'], ['remodel', 'int32'], ['dye', 'uint32'], ['dyeSecRemaining', 'int32'], ['dyeDate', 'int64'], ['dyeExpiryDate', 'int64'], ['masterwork', 'bool'], ['enigma', 'int32'], ['masterworkBonus', 'int32'], ['itemLevel', 'int32'], ['timesBrokered', 'int32'], ['enchantAdvantage', 'int32'], ['enchantBonus', 'int32'], ['enchantBonusMaxPlus', 'int32'], ['boundToPlayer', 'uint64'], ['passivities', [['id', 'int32']]], ['customString', 'string']]]]))
	//const path = require('path');
	//protocol.messages.clear();
	//protocol.load(path.join(__dirname, 'Classic-tera-data'));
	//for (const [k, v] of protocol.messages.entries()) protocol.maps.set(k, v);
}

module.exports = function FpsUtils(mod) {

	// ~~~ * Data * ~~~ \\

	const NotCP = typeof global.TeraProxy === 'undefined';
	const Classic_NOTCP = mod.majorPatchVersion === 27 && NotCP;
	if (Classic_NOTCP) LoadThis(); //Pinkie's Proxy classic-server capability.
	const NpcData = require("./data/npcData.json"), SkillData = require("./data/skillString.json");
	const BnzC = '#BC8F8F', SlvC = '#9A9A9A', GldC = '#DAA520', PnkC = '#FFB7C5', HPkC = '#FF69B4', CPKC = '#ED5D92', RedC = '#FE6F5E', GrnC = '#4DE19C', LPrC = '#E0B0FF', PrpC = '#9966CC', LBlC = '#4DDCE1', BluC = '#436EEE', DBlC = '#5BC0BE', HBlC = '#08B3E5', GryC = '#778899', YlwC = '#C0B94D';
	const InvisibleNpcs = { 8: [6011], 12: [1, 2], 23: [201, 202], 34: [8000], 61: [9901], 62: [1039, 1040, 1041, 1042, 1900, 1901, 1902, 1903, 9001, 9002, 9003, 9004, 9901], 83: [9901], 207: [9901], 212: [1034], 223: [9901], 230: [9901] };
	const TrapsIds = [30120, 30220, 30320, 90120, 90220, 90320, 90420, 90520, 90620, 90720, 90820, 90920, 100120, 100220, 100320, 100420, 100520, 120220, 120320, 120420, 120520, 120620, 120720, 120820, 120920, 150120, 150220, 150320, 150420, 150520, 150620, 150720, 170120, 170220, 170320, 170420, 170520, 170620, 170720, 170820, 170920, 230120, 230220, 230320, 250120, 250220, 250320, 250420, 250520, 250620, 250720, 250820, 250920, 251020];
	const UserNPCs = [12345, 1100100, 1100101, 1023000, 1023001, 1023002, 1023003, 1023004, 1023005, 1023006, 1023007, 1023008, 1023009, 1023010, 1023011, 1023012, 1023013, 1023014, 1023200, 1023201, 1023202, 1023203, 1023204, 1023205, 1023206, 1023207, 1023208, 1023209, 1023210, 1023211, 1023300, 1023301, 1023302, 1023303, 1023304, 1023305, 1023306, 1023307, 1023308, 1023309, 1023310, 1023311, 1023312, 1023400, 1023401, 1023402, 1023403, 1023404, 1023405, 1024000, 1024001, 1024100, 1024200, 1024300, 2100100, 2100101, 10235001, 10235002, 10235003, 10235004, 10235005, 10235006, 10235007, 10235008, 10235009, 10235010, 10235011, 10235012, 10235013, 10235014, 10235015, 10235016, 10235017, 10235100, 10236001, 10236002, 10236003, 10236004, 10236005, 10236006, 10236007, 10236008, 10236009, 10236010, 10236011, 10236012, 10236013, 10236014, 10236015, 10236100, 10237001, 10237002, 10237003, 10237004, 10237005, 10237006, 10237007, 10237008, 10237009, 10237010, 10237011, 10237012, 10237013, 10237014, 10237015, 10237100, 10238001, 10238002, 10238003, 10238004, 10238005, 10238006, 10238007, 10238008, 10238100, 10239003, 30301001, 30301002, 30301003, 30301004, 30301005, 30302001, 30302002, 30302003, 30302004, 30302005, 30302006, 30302007, 30303001, 30303002, 30303003, 30303004, 30303005, 30303006, 30303007];
	const SpamAchIds = [6, 51, 377, 391, 466, 467, 468, 469, 470, 471, 472, 473, 476, 611, 1408, 1744, 1745, 1769, 1770, 1771, 1942, 1943, 1952, 1992, 2032, 2033, 2036, 2037, 2038, 2057, 2062, 2071, 2078, 2081, 2082, 2083, 2084, 2088, 2089, 2095, 6005, 9817, 28723, 28724, 28725, 28726, 28727, 28728, 28729, 28730, 28731, 28732, 28733, 28734, 28735, 28736, 510005, 510012, 510019, 510026, 510027, 510033, 510034, 510035, 510036, 510037, 510038, 510039, 510040, 510041, 520029, 520030, 520032, 520033, 520034, 520035, 520048, 520049, 520050, 520051, 525000, 525001, 525002, 525003, 525004, 525005, 525006, 525007, 525008, 525009, 525010, 525011, 525012, 525013, 525014, 525015, 525016, 525017, 525018, 525019, 525020, 525021, 525022, 525023, 525024, 525025, 5010000];
	const ImportantAbns = [90440009, 90442106, 90442110, 90442111, 90442112, 90442113, 90442114, 90442400, 90442401, 90442402, 90442403, 90442404, 90442405, 90442406, 90442407, 90442408, 90442502, 78200123, 78200126, 78200130, 78200131, 78200161, 78200162, 78200203, 78200204, 78200205, 78200209, 78200234, 78200235, 78200236];

	// ~~~ * Variables * ~~~ \\

	let MyGameId,
		MyName,
		MyPlayerId,
		SwitchCd,
		AllowedAchUps,
		LastState,
		LastVrange,
		ProjDebug,
		AbnDebug,
		TmpData = [],
		PMembers = [],
		SUsers = {},
		HUsers = {},
		SNpcs = {},
		HNpcs = {};

	// ~~~ * Gui Parser * ~~~ \\

	const Xmap = new WeakMap();

	if (!Xmap.has(mod.dispatch || mod)) {
		Xmap.set(mod.dispatch || mod, {});

		mod.hook('C_CONFIRM_UPDATE_NOTIFICATION', 'raw', () => false)

		mod.hook('C_ADMIN', 1, (event) => {
			const Xd = event.command.split(";")
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
			case "searchnpc": case "npcsearch":
				NpcJsonSearch("search", arg);
				break;
			case "npc":
				NpcJsonSearch("starts", arg);
				break;
			case "npclist":
				TmpData = []
				TmpData.push(
					{ text: `<font color="${PrpC}" size="+24"><p align="right">MAIN MENU</p></font><br><br>`, command: "fps gui" },
					{ text: `<font color="${YlwC}" size="+20"><p align="right">[Main NPC page]</p></font><br>`, command: "fps gui npcmain" },
					{ text: `<font color="${LBlC}" size="+19">Click a NPC ID to remove it from the blacklist:</font><br>` }
				)
				for (let i = 0; i < mod.settings.NpcsBlacklist.length; i++) {
					TmpData.push({ text: `<font color="${BnzC}" size="+17">${mod.settings.NpcsBlacklist[i].zone}, ${mod.settings.NpcsBlacklist[i].templateId}</font><br>`, command: `fps npc hide ${mod.settings.NpcsBlacklist[i].zone} ${mod.settings.NpcsBlacklist[i].templateId};fps gui npclist` })
				}
				gui.parse(TmpData, `<font color="${LPrC}">[FPS] Options - NPCs </font><font color="${GrnC}">(Blacklist)</font>`)
				TmpData = []
				break;
			case "npcmain":
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
					{ text: mod.majorPatchVersion < 79 ? `<font color="${PnkC}" size="+15"><p align="right">Classic server detected, buttons doesn't work here, thanks for understanding.</p></font><br>` : '' },
					{ text: `<font color="${PrpC}" size="+24"><p align="right">MAIN MENU</p></font><br>`, command: "fps gui" },
					{ text: `<font size="20"><font color="${LBlC}">Command</font>            <font color="${SlvC}">Arg(s)</font>                 <font color="${CPKC}">Example</font><br>` },
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
					{ text: `<font color="${HBlC}">hpnumbers</font>                <font color="${DBlC}">N/A</font>                    <font color="${HPkC}">!fps hpnumbers</font><br>` },
					{ text: `<font color="${HBlC}">mpnumbers</font>                <font color="${DBlC}">N/A</font>                    <font color="${HPkC}">!fps mpnumbers</font></font>` }
				], `<font color="${LPrC}">[FPS] HELP</font>`)
				break;
			default:
				gui.parse([
					{ text: mod.majorPatchVersion < 79 ? `<font color="${PnkC}" size="+15"><p align="right">Classic server detected, buttons doesn't work here, thanks for understanding.</p></font><br>` : '' },
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
					{ text: `<font color="${mod.settings.HideFireworks ? GrnC : RedC}" size="+18">[Fireworks]</font><br><br>`, command: "fps fireworks;fps gui" },
					{ text: `<font color="${YlwC}" size="+20">Self(own):</font>` }, { text: "&#09;" },
					{ text: `<font color="${mod.settings.HideHpNumbers ? GrnC : RedC}" size="+18">[HP Nums]</font>`, command: "fps hpnumbers;fps gui" }, { text: "&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.HideMpNumbers ? GrnC : RedC}" size="+18">[MP Nums]</font>`, command: "fps mpnumbers;fps gui" }, { text: "&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.HideMySummons ? GrnC : RedC}" size="+18">[Own summons]</font>`, command: "fps summons me;fps gui" }, { text: "&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.HideOwnBlacklistedAbns ? GrnC : RedC}" size="+18">[Blur/dizzy]</font><br>`, command: "fps screenabns;fps gui" },
					{ text: `<font color="${YlwC}" size="+20">Players:</font>` }, { text: "&#09;&#09;" },
					{ text: `<font color="${LBlC}" size="+18">[Spawned list]</font>`, command: "fps gui show" }, { text: "&nbsp;&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${LBlC}" size="+18">[Hidden list]</font>`, command: "fps gui hide" }, { text: "&nbsp;&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${mod.settings.HideOthersSummons ? GrnC : RedC}" size="+18">[Players summons]</font><br>`, command: "fps summons;fps gui" },
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
					{ text: `<font color="${mod.settings.PvpTraps ? GrnC : RedC}" size="+17">[Show Traps]</font><br><br><br>`, command: "fps pvptraps;fps gui" },
					{ text: `<font color="${BluC}" size="+22">Quick Links:</font><br>` },
					{ text: `<font color="${YlwC}" size="+20">UI:</font>` }, { text: "&#09;&#09;" },
					{ text: `<font color="${PrpC}" size="+17">[Mail]</font>`, command: "fps quicklink parcel" }, { text: "&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${PrpC}" size="+17">[Broker]</font>`, command: "fps quicklink broker" }, { text: "&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${PrpC}" size="+17">[Talent]</font>`, command: "fps quicklink talents" }, { text: "&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${PrpC}" size="+17">[Dress]</font>`, command: "fps quicklink dressingroom" }, { text: "&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${PrpC}" size="+17">[Hat Style]</font>`, command: "fps quicklink hatrestyle" }, { text: "&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${PrpC}" size="+17">[Search-Engine]</font><br>`, command: "fps quicklink searchengine" },
					{ text: `<font color="${YlwC}" size="+20">Party:</font>` }, { text: "&#09;" },
					{ text: `<font color="${CPKC}" size="+18">[Reset]</font>`, command: "fps quicklink reset" }, { text: "&nbsp;&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${CPKC}" size="+18">[Leave]</font>`, command: "fps quicklink drop" }, { text: "&nbsp;&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${CPKC}" size="+18">[Disband]</font><br>`, command: "fps quicklink disband" },
					{ text: `<font color="${YlwC}" size="+20">System:</font>` }, { text: "&#09;" },
					{ text: `<font color="${CPKC}" size="+18">[Character Selection]</font>`, command: "fps quicklink lobby" }, { text: "&#09;&#09;&#09;&#09;" },
					{ text: `<font color="${CPKC}" size="+18">[!! Instant Exit !!]</font><br>`, command: "fps quicklink instantexit" }
				], `<font color="${LPrC}">[FPS] Options</font> | <font color="${RedC}" size="+16">Red</font><font color="${LPrC}" size="+16"> = disabled, <font color="${GrnC}" size="+16">Green</font><font color="${LPrC}" size="+16"> = enabled</font>`)
		}
	}

	// ~~~ * Gui Functions * ~~~ \\

	function SkillJsonSearch(value) {
		let keys = [],
			skilldata = [],
			skillIds = [];
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
			skilldata.push({ command: `fps skill class ${value} ${skillIds[0][i]};fps gui class ${value}`, text: `<font color="${mod.settings.ClassesData[ClassNameFromID(value)].CD_SkillsBlacklist.includes(skillIds[0][i].toString()) ? GrnC : RedC}" size="+17">[${keys[i]}]</font><br>` });
		}
		return skilldata;
	}

	function NpcJsonSearch(type, arg) {
		const NpcDataLength = NpcData.length;
		TmpData = []
		TmpData.push({ text: `<font color="${PrpC}" size="+24"><p align="right">MAIN MENU</p></font><br><br>`, command: "fps gui" })
		switch (type) {
			case 'starts':
				for (let i = 0; i < NpcDataLength; i++) if (NpcData[i].Nm.startsWith(arg)) TmpData.push({ command: `fps npc hide ${NpcData[i].Hz} ${NpcData[i].Ti};fps gui npc ${arg}`, text: `<font color="${mod.settings.NpcsBlacklist.some(arrVal => NpcData[i].Hz == arrVal.zone && NpcData[i].Ti == arrVal.templateId) ? GrnC : RedC}" size="+17">${NpcData[i].Nm}</font><br>` });
				break;
			case 'search':
				for (let i = 0; i < NpcDataLength; i++) if (NpcData[i].Nm.includes(arg)) TmpData.push({ command: `fps npc hide ${NpcData[i].Hz} ${NpcData[i].Ti};fps gui npcsearch ${arg}`, text: `<font color="${mod.settings.NpcsBlacklist.some(arrVal => NpcData[i].Hz == arrVal.zone && NpcData[i].Ti == arrVal.templateId) ? GrnC : RedC}" size="+17">${NpcData[i].Nm} </font><br>` });
				break;
		}
		gui.parse(TmpData, `<font color="${LPrC}">[FPS] Options - NPCs</font> | <font color="${LBlC}" size="+16">Search results for '${arg}'</font>.`)
		TmpData = []
	}

	function ClassNameFromID(name) {
		for (const Class_data of Object.keys(mod.settings.ClassesData)) if (mod.settings.ClassesData[Class_data].name == name) return Class_data;
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
				mod.toClient('S_SPAWN_NPC', 11, HNpcs[i]);
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
					if (EqGid(SNpcs[k].owner) && UserNPCs.includes(SNpcs[k].templateId) && SNpcs[k].huntingZoneId === 1023) {
						mod.toClient('S_DESPAWN_NPC', 3, { gameId: SNpcs[k].gameId, loc: SNpcs[k].loc, type: 1, unk: 0 });
						HNpcs[SNpcs[k].gameId] = SNpcs[k];
					}
				}
				break;
			case 'others':
				for (let k in SNpcs) {
					if (!EqGid(SNpcs[k].owner) && UserNPCs.includes(SNpcs[k].templateId) && SNpcs[k].huntingZoneId === 1023) {
						mod.toClient('S_DESPAWN_NPC', 3, { gameId: SNpcs[k].gameId, loc: SNpcs[k].loc, type: 1, unk: 0 });
						HNpcs[SNpcs[k].gameId] = SNpcs[k];
					}
				}
				break;
			case 'bl':
				for (let k in SNpcs) {
					for (let i = 0; i < mod.settings.NpcsBlacklist.length; i++) {
						if (SNpcs[k].huntingZoneId == mod.settings.NpcsBlacklist[i].zone && SNpcs[k].templateId == mod.settings.NpcsBlacklist[i].templateId) {
							mod.toClient('S_DESPAWN_NPC', 3, { gameId: SNpcs[k].gameId, loc: SNpcs[k].loc, type: 1, unk: 0 });
							HNpcs[SNpcs[k].gameId] = SNpcs[k];
						}
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
					if (EqGid(HNpcs[v].owner) && UserNPCs.includes(HNpcs[v].templateId) && HNpcs[v].huntingZoneId === 1023) {
						mod.toClient('S_SPAWN_NPC', 11, HNpcs[v]);
						delete HNpcs[v];
					}
				}
				break;
			case 'others':
				for (let v in HNpcs) {
					if (!EqGid(HNpcs[v].owner) && UserNPCs.includes(HNpcs[v].templateId) && HNpcs[v].huntingZoneId === 1023) {
						mod.toClient('S_SPAWN_NPC', 11, HNpcs[v]);
						delete HNpcs[v];
					}
				}
				break;
			case 'bl':
				for (let v in HNpcs) {
					for (let i = 0; i < mod.settings.NpcsBlacklist.length; i++) {
						if (HNpcs[v].huntingZoneId == mod.settings.NpcsBlacklist[i].zone && HNpcs[v].templateId == mod.settings.NpcsBlacklist[i].templateId) {
							mod.toClient('S_SPAWN_NPC', 11, HNpcs[v]);
							delete HNpcs[v];
						}
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

	function ModifyUserAppearance(event) {
		let modified = false;

		if (mod.settings.ShowStyle) {
			event.weapon = event.body = event.hand = event.feet = event.underwear = event.head = event.face = 0;
			if (event.mount) event.mount = 16; //231; The mount 231 doesn't exist in classic server.
			if (mod.settings.Hideguildlogos) event.guildLogoId = 0;
			if (mod.majorPatchVersion >= 79) event.title = 0; //!classic
			// event.weaponModel = event.bodyModel = event.handModel = event.feetModel // TODO;
			event.weaponDye = event.bodyDye = event.handDye = event.feetDye = event.weaponEnchant = 0;
			event.showFace = false;
			event.styleHead = event.styleFace = event.styleBack = event.styleWeapon = event.styleBody = 0;
			if (mod.majorPatchVersion >= 79) event.underwearDye = event.styleBackDye = event.styleHeadDye = event.styleFaceDye = 0; //!classic
			event.showStyle = false;
			if (mod.majorPatchVersion >= 79) { //!classic
				event.styleFootprint = event.styleHeadScale = event.styleFaceScale = event.styleBackScale = 0;
				event.usedStyleHeadTransform = false;
			}
			event.styleBodyDye = 0;
			event.icons = [];

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

		if (mod.settings.Hit_Me && (EqGid(event.source) || EqGid(event.owner))) {
			event.templateId = 10101;
			if (!Classic_NOTCP) event.skill.id = 10100; else event.skill = 10100 + 0x4000000;
			event.time = 0;
			event.crit = false;

			modified = true;
		}

		if (mod.settings.Hit_Other && !EqGid(event.target) && !EqGid(event.source) && !EqGid(event.owner) && (SUsers[event.owner] || SUsers[event.source])) {
			event.templateId = 10101;
			if (!Classic_NOTCP) event.skill.id = 10100; else event.skill = 10100 + 0x4000000;
			event.time = 0;
			event.crit = false;

			modified = true;
		}

		if (mod.settings.Hit_Damage && (EqGid(event.source) || EqGid(event.owner) || UserNPCs.includes(event.templateId) && (Classic_NOTCP ? (((((Boolean(event.skill & 0x40000000) === true) && (event.skill >> 26 & 0xf) === 1)) ? (event.skill >> 16 & 0x3ff) : 0) === 1023) : event.skill.huntingZoneId === 1023))) {
			event.id = event.type = event.noctEffect = 0;
			if (!Classic_NOTCP) event.reaction.skill.id = 0; else event.reaction.skill = 0;
			if (!NotCP) event.damage = 0; else event.value = 0;
			event.crit = event.stackExplode = false;
			if (mod.majorPatchVersion >= 79) if (NotCP) event.blocked = false; else event.superArmor = false; //!classic

			modified = true;
		}

		if (mod.settings.Hit_All) {
			event.id = event.type = event.noctEffect = 0;
			if (!Classic_NOTCP) event.reaction.skill.id = 0; else event.reaction.skill = 0;
			if (!NotCP) event.damage = 0; else event.value = 0;
			event.crit = event.stackExplode = false;
			if (mod.majorPatchVersion >= 79) if (NotCP) event.blocked = false; else event.superArmor = false; //!classic
			event.target = 0;

			modified = true;
		}

		return modified ? true : undefined;
	}

	function NpcBCheck(event) {
		let blocked = false;
		//if (mod.settings.ShowStyle) event.repairable = false;

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

		return blocked;
	}

	function EqGid(xg) {
		return (xg === MyGameId);
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
		MyGameId = event.gameId;
		MyName = event.name;
		MyPlayerId = event.playerId;
		ProjDebug = false;
		AbnDebug = false;
		AllowedAchUps = 2;
	}

	function sLoadTopo() {
		SUsers = {};
		SNpcs = {};
		HUsers = {};
		HNpcs = {};
		AllowedAchUps = 1;
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
		PMembers = []
		if (mod.settings.RaidAutoChange) {
			if (!LastState || mod.settings.Mode !== 2) return;
			mod.command.exec(`fps mode ${LastState}`);
			LastState = null;
		}
	}

	function sMountVehicle(event) {
		if (EqGid(event.gameId)) return;
		SUsers[event.gameId].mount = event.id;
		if (HUsers[event.gameId]) HUsers[event.gameId].mount = event.id;
		if (mod.settings.ShowStyle) {
			event.id = 16; //231; 
			return true;
		}
	}

	function sUnmountVehicle(event) {
		if (EqGid(event.gameId)) return;
		SUsers[event.gameId].mount = 0;
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
		for (const Item of event.inventory)
			if ([152898, 184659, 201005, 201006, 201007, 201008, 201022, 855604].includes(Item.item)) {
				Item.cooldown = 0;
				return true;
			}
	}

	function sLoadingScreenControlInfo() {
		if (mod.settings.Mode >= 2) return false;
	}

	function sUpdateAchievementProgress(event) {
		if (AllowedAchUps) { AllowedAchUps--; return; }
		for (const Achieve of event.achievements) if (SpamAchIds.indexOf(Achieve.id) > -1) return false;
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

	function sUserMoveType() { return false; }

	function sPartyMemberList(event) {
		event.members.map(value => PMembers.push(value.name))
		if (mod.settings.RaidAutoChange) {
			if (event.members.length >= 18) {
				if (mod.settings.Mode === 3 || (LastState && mod.settings.Mode === 2)) return;
				LastState = mod.settings.Mode;
				mod.command.exec("fps mode 2");
			} else {
				if (!LastState || mod.settings.Mode !== 2) {
					LastState = null;
					return;
				}
				mod.command.exec(`fps mode ${LastState}`);
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
		//if (mod.settings.ShowStyle) { event.repairable = false; return true; } // partially... This option is not only used for the icons above npcs heads, but it's used also for showing the whole shape of some npcs, e.g. bahaar & glsh. :\
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
		if (HNpcs[event.gameId]) {
			HNpcs[event.gameId].loc = event.dest;
			HNpcs[event.gameId].w = event.w;
			return false;
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
		if ((!EqGid(event.target) && mod.settings.Mode === 3) || HUsers[event.target] || HNpcs[event.target]) return false;
	}

	function sFearMoveEnd(event) {
		if ((!EqGid(event.target) && mod.settings.Mode === 3) || HUsers[event.target] || HNpcs[event.target]) return false;
	}

	function sAbnormalityBegin(event) {
		if (AbnDebug) {
			if (EqGid(event.target)) log('Abnormality', 'Applied', 'on', MyName, event.id);
			if (EqGid(event.source)) log('Abnormality', 'Started', 'from', MyName, event.id);
			if (SUsers[event.target]) log('Abnormality', 'Applied', 'on', SUsers[event.target].name, event.id);
			if (SUsers[event.source]) log('Abnormality', 'Started', 'from', SUsers[event.source].name, event.id);
		}
		if([90442103, 90442107].includes(event.id)) { event.id = 768038; return true; }
		if (ImportantAbns.includes(event.id)) return;
		if (EqGid(event.target)) {
			if (mod.settings.HideOwnBlacklistedAbns && mod.settings.OwnAbnormalsBlacklist.includes(event.id)) return false;
			return;
		}
		if (HUsers[event.target] || HNpcs[event.target]) return false;
		if (event.id === 9943049) return false;
		if (mod.settings.HideBlacklistedAbnormalities && mod.settings.AbnormalitiesBlacklist.includes(event.id)) return false;
		if (mod.settings.HideAllAbnormalities && (SUsers[event.target] || SUsers[event.source] || mod.settings.AbnormalitiesBlacklist.includes(event.id))) return false;
	}

	function sAbnormalityRefresh(event) {
		if([90442103, 90442107].includes(event.id)) { event.id = 768038; return true; }
		if (ImportantAbns.includes(event.id)) return;
		if (HUsers[event.target] || HNpcs[event.target]) return false;
		if ((mod.settings.HideBlacklistedAbnormalities || mod.settings.HideAllAbnormalities) && (SUsers[[10306, 10316, 12001, 12003, 22040, 12120, 12130].includes(event.target)] || SUsers[[10306, 10316, 12001, 12003, 22040, 12120, 12130].includes(event.source)])) return false;
	}

	function sAbnormalityEnd(event) {
		if([90442103, 90442107].includes(event.id)) { event.id = 768038; return true; }
		if (event.id === 9943049) return false;
	}

	function sAbnormalityFail(event) {
		if ([3000021, 99020000, 99020010].includes(event.id)) return false;
	}

	function sActionStage(event) {
		if (EqGid(event.gameId) || !SUsers[event.gameId]) return;
		if ((mod.settings.Mode >= 2) || HUsers[event.gameId] || (mod.settings.HideBlacklistedSkills && mod.settings.ClassesData[ClassID(event.templateId)].CD_SkillsBlacklist.includes(Math.floor(((Classic_NOTCP ? (event.skill - 0x4000000) : event.skill.id) / 10000).toString()))) || mod.settings.ClassesData[ClassID(event.templateId)].CD_HideBlacklistedSkills) {
			UpdateUserLoc(event);
			return false;
		}
	}

	function sStartUserProjectile(event) {
		if (ProjDebug) {
			if (EqGid(event.gameId)) log('Projectile', 'Started', 'from', MyName, (Classic_NOTCP ? (event.skill - 0x4000000) : event.skill.id));
			if (SUsers[event.gameId]) log('Projectile', 'Started', 'from', SUsers[event.gameId].name, (Classic_NOTCP ? (event.skill - 0x4000000) : event.skill.id));
		}
		if (mod.settings.PvpTraps && TrapsIds.includes((Classic_NOTCP ? (event.skill - 0x4000000) : event.skill.id))) return;
		if ((mod.settings.HideBlacklistedProjectiles || mod.settings.HideAllProjectiles) && mod.settings.ProjectilesBlacklist.includes((Classic_NOTCP ? (event.skill - 0x4000000) : event.skill.id))) return false;
		if (!EqGid(event.gameId) && SUsers[event.gameId] && (HUsers[event.gameId] || mod.settings.Mode >= 2 || mod.settings.HideAllProjectiles)) return false;
	}

	function sSpawnProjectile(event) {
		if (Classic_NOTCP ? (Boolean(event.skill & 0x40000000) === true) : event.skill.npc) return;
		if (ProjDebug) {
			if (EqGid(event.gameId)) log('Projectile', 'Spawned', 'from', MyName, (Classic_NOTCP ? (event.skill - 0x4000000) : event.skill.id));
			if (SUsers[event.gameId]) log('Projectile', 'Spawned', 'from', SUsers[event.gameId].name, (Classic_NOTCP ? (event.skill - 0x4000000) : event.skill.id));
		}
		if (mod.settings.PvpTraps && TrapsIds.includes((Classic_NOTCP ? (event.skill - 0x4000000) : event.skill.id))) return;
		if ((mod.settings.HideBlacklistedProjectiles || mod.settings.HideAllProjectiles) && mod.settings.ProjectilesBlacklist.includes((Classic_NOTCP ? (event.skill - 0x4000000) : event.skill.id))) return false;
		if (!EqGid(event.gameId) && SUsers[event.gameId] && (HUsers[event.gameId] || mod.settings.Mode >= 2 || mod.settings.HideAllProjectiles)) return false;
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

	function sSpawnDropItem(event) {
		if (EqGid(event.source)) return;
		if (mod.settings.HideBlacklistedDrop) {
			for (let i in event.owners) {
				if (mod.majorPatchVersion >= 79 && event.owners[i].playerId.toString() === MyPlayerId.toString()) return; //!classic
				else if (mod.majorPatchVersion === 27 && event.owners[i].gameId.toString() === MyGameId.toString()) return;
			}
			if (mod.settings.DropBlacklist.includes(event.item)) return false;
		}
		if (mod.settings.Mode >= 2) {
			event.explode = 0;
			return true;
		}
	}

	function sFontSwapInfo() {
		if (mod.settings.Hit_Damage || mod.settings.Hit_All) return false;
	}

	// ~~~ * Packet Hooks * ~~~ \\

	const Last_Hook = { order: 100010 }
	const Last_Hookfn = { order: 100010, filter: { fake: null } };

	if (mod.majorPatchVersion >= 79) {
		mod.hook('S_DEAD_LOCATION', 2, sDeadLocation)
		mod.hook('S_USER_MOVETYPE', 'raw', Last_Hook, sUserMoveType)
		mod.hook('S_UNICAST_TRANSFORM_DATA', 5, Last_Hook, sUnicastTransformData)
		mod.hook('S_USER_APPEARANCE_CHANGE', 1, Last_Hookfn, sUserAppearanceChange)
		mod.hook('S_USER_EXTERNAL_CHANGE', 7, Last_Hookfn, sUserExternalChange)
		mod.hook('S_FONT_SWAP_INFO', 'raw', sFontSwapInfo)
	}

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
	mod.hook('S_UPDATE_ACHIEVEMENT_PROGRESS', 1, Last_Hookfn, sUpdateAchievementProgress)
	mod.hook('S_ITEM_CUSTOM_STRING', 2, sItemCustomString)

	mod.hook('S_GUILD_NAME', 1, sGuildName)
	mod.hook('S_APPLY_TITLE', 2, sApplyTitle)
	mod.hook('S_IMAGE_DATA', 'raw', sImageData)

	mod.hook('S_SPAWN_USER', 14, Last_Hook, sSpawnUser)
	mod.hook('S_SPAWN_USER', 14, Last_Hookfn, sSpawnUserfn)
	mod.hook('S_DESPAWN_USER', 3, Last_Hook, sDespawnUser)
	mod.hook('S_USER_LOCATION', 5, sUserLocation)
	mod.hook('S_USER_STATUS', 3, sUserStatus)
	//'S_DEAD_LOCATION'
	//'S_USER_MOVETYPE'
	mod.hook('S_PARTY_MEMBER_LIST', 7, sPartyMemberList)
	//'S_USER_APPEARANCE_CHANGE'
	//'S_USER_EXTERNAL_CHANGE' Found it... but like 90% confirmed, need someone has everything (costume-wise and gear-wise) equiped so it can 100% confirmed so caali push it... guess that won't happen any soon.
	//'S_UNICAST_TRANSFORM_DATA'

	mod.hook('S_SPAWN_NPC', 11, sSpawnNpc)
	mod.hook('S_DESPAWN_NPC', 3, sDespawnNpc)
	mod.hook('S_NPC_LOCATION', 3, sNpcLocation)
	mod.hook('S_CREATURE_ROTATE', 2, sCreatureRotate)
	mod.hook('S_FEARMOVE_STAGE', 1, sFearMoveStage)
	mod.hook('S_FEARMOVE_END', 1, sFearMoveEnd)

	mod.hook('S_ABNORMALITY_BEGIN', 3, Last_Hook, sAbnormalityBegin)
	mod.hook('S_ABNORMALITY_REFRESH', 1, Last_Hook, sAbnormalityRefresh)
	mod.hook('S_ABNORMALITY_FAIL', 1, sAbnormalityFail)
	mod.hook('S_ABNORMALITY_END', 1, sAbnormalityEnd)

	mod.hook('S_ACTION_STAGE', 9, Last_Hook, sActionStage)
	mod.hook('S_SPAWN_PROJECTILE', 5, Last_Hook, sSpawnProjectile)
	mod.hook('S_START_USER_PROJECTILE', 9, Last_Hook, sStartUserProjectile)
	mod.hook('S_PLAYER_CHANGE_MP', 1, sPlayerChangeMp)
	mod.hook('S_CREATURE_CHANGE_HP', 6, sCreatureChangeHp)
	mod.hook('S_EACH_SKILL_RESULT', NotCP ? 12 : 13, Last_Hook, sEachSkillResult)
	mod.hook('S_SPAWN_DROPITEM', 6, sSpawnDropItem)
	//'S_FONT_SWAP_INFO'

	// ~~~ * Commands * ~~~ \\

	mod.command.add('0', () => mod.command.exec('fps mode 0'))
	mod.command.add('1', () => mod.command.exec('fps mode 1'))
	mod.command.add('2', () => mod.command.exec('fps mode 2'))
	mod.command.add('3', () => mod.command.exec('fps mode 3'))

	mod.command.add(['fps', '!fps', 'fps-utils', '!fps-utils'], (key, arg, arg2, arg3) => {
		switch (key) {
			case "g": case "gui":
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
			case "mod": case "mode": case "state":
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
									for (let i in SUsers) { if (ClassID(SUsers[i].templateId) === classtohide) HideSpecificPlayer(SUsers[i].name); }
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
				mod.settings.OnlyParty = !mod.settings.OnlyParty;
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
				mod.settings.RaidAutoChange = !mod.settings.RaidAutoChange;
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
			case "summons": case "sums":
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
			case "skills": case "skill":
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
											let index = mod.settings.ClassesData[i].CD_SkillsBlacklist.indexOf(arg3);
											if (index !== -1) {
												mod.settings.ClassesData[i].CD_SkillsBlacklist.splice(index, 1);
												Msg(`Skill ID '${arg3}' <font color="${RedC}">Shown</font> for class '${arg2}'.`);
											}
											return;
										} else {
											mod.settings.ClassesData[i].CD_SkillsBlacklist.push(arg3);
											Msg(`Skill ID '${arg3}' <font color="${GrnC}">Hidden</font> for class '${arg2}'.`);
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
			case "npcs": case "npc":
				if (arg === 'hide') {
					if (!arg2 || !arg3) {
						mod.settings.HideBlacklistedNpcs = !mod.settings.HideBlacklistedNpcs;
						Msg(`Blacklisted NPCs ${mod.settings.HideBlacklistedNpcs ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
						break;
					}
					const found = mod.settings.NpcsBlacklist.some(s => s.zone === arg2 && s.templateId === arg3);
					if (found) {
						if (mod.settings.HideBlacklistedNpcs) ShowSpecificNpc(Number(arg2), Number(arg3));
						Msg(`NPC HntZone '${arg2}', TmpId '${arg3}' <font color="${RedC}">Removed from the blacklist</font>.`);
						mod.settings.NpcsBlacklist = mod.settings.NpcsBlacklist.filter(obj => obj.zone != arg2 || obj.templateId != arg3);
					} else {
						if (mod.settings.HideBlacklistedNpcs) HideSpecificNpc(Number(arg2), Number(arg3));
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
				setTimeout(() => mod.toServer('C_SET_VISIBLE_RANGE', 1, { range: LastVrange }), 1500);
				SwitchCd = true;
				setTimeout(() => SwitchCd = false, 2800);
				Msg(`Guild Logos ${mod.settings.Hideguildlogos ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
				break;
			case "costume": case "style":
				if (SwitchCd) return Msg(`<font color="${PnkC}">Try again in 3 seconds</font>.`);
				mod.settings.ShowStyle = !mod.settings.ShowStyle;
				mod.toServer('C_SET_VISIBLE_RANGE', 1, { range: 0 });
				setTimeout(() => mod.toServer('C_SET_VISIBLE_RANGE', 1, { range: LastVrange }), 1500);
				SwitchCd = true;
				setTimeout(() => SwitchCd = false, 2800);
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
						if (mod.majorPatchVersion < 79) return;	//classic
						mod.toServer('C_REQUEST_CONTRACT', 1, { type: 77 });
						break;
					case "broker":
						mod.toClient('S_NPC_MENU_SELECT', 1, { type: 28 });
						break;
					case "dress": case "dressingroom":
						if (mod.majorPatchVersion < 79) return;	//classic
						mod.toServer('C_REQUEST_CONTRACT', 1, { type: 76 });
						break;
					case "hat": case "hatrestyle":
						if (mod.majorPatchVersion < 79) return;	//classic
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
						mod.toClient('S_SHOW_AWESOMIUMWEB_SHOP', 1, { link: 'https://start.duckduckgo.com/' });
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
					const found1 = mod.settings.DropBlacklist.some(s => s === arg2);
					if (found1) {
						Msg(`Drops id '${arg2}' <font color="${RedC}">Removed from the blacklist</font>.`);
						mod.settings.DropBlacklist = mod.settings.DropBlacklist.filter(obj => obj != arg2);
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
			case "screenabns":
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
						mod.settings.OwnAbnormalsBlacklist = mod.settings.OwnAbnormalsBlacklist.filter(obj => obj != arg2);
					} else {
						Msg(`Abnormal id '${arg2}' <font color="${GrnC}">Added to the blacklist</font>.`);
						mod.settings.OwnAbnormalsBlacklist.push(arg2);
					}
					return;
				} else mod.settings.HideOwnBlacklistedAbns = !mod.settings.HideOwnBlacklistedAbns;
				Msg(`Blacklisted ScreenAbns ${mod.settings.HideOwnBlacklistedAbns ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
				break;
			case "hpnumbers":
				mod.settings.HideHpNumbers = !mod.settings.HideHpNumbers;
				Msg(`Own Hp numbers ${mod.settings.HideHpNumbers ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
				break;
			case "mpnumbers":
				mod.settings.HideMpNumbers = !mod.settings.HideMpNumbers;
				Msg(`Own Mp numbers ${mod.settings.HideMpNumbers ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
				break;
			case "help":
				mod.command.exec("fps gui help");
				break;
			default:
				Msg(`<font color="${RedC}">Unknown command, check command list</font>.`);
				mod.command.exec("fps gui help");
				break;
		}
		if (!NotCP) mod.saveSettings();
	})
}