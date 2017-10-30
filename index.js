//  FpsUtils revision 1.5 - Hugedong Edition
//  Credits to Xiphon, Saegusa & Bernkastel for code and ideas
// 
// Changes:
// Moved to Command
// Added all classes to fps hide and show
// Made commands more user friendly (imo)
// TC buff has a limited mode that reduces spam while still retaining duration, default is it updating every 7 hits

const Command = require('command');
const fs = require('fs');

var config = require('./config.json');


module.exports = function FpsUtils(dispatch) {

    let DEBUG = false;
    let player,
        cid,
        model,
        pcid,
        clss,
        tchits = 7, //change this to fine tune TC spamage
        counter = 0,
        dur,
        locx = [],
        locy = [],
        state = 0,
        lastState = 0,
        hiddenPlayers = {},
        hiddenIndividual = {};

    let flags = {
        hide: {
            tanks: false,
            dps: false,
            healers: false,
            ranged: false,
            warrior: false,
            lancer: false,
            slayer: false,
            berserker: false,
            sorcerer: false,
            archer: false,
            priest: false,
            reaper: false,
            gunner: false,
            ninja: false,
            valkyrie: false
        },
        fireworks: false, //these options control the settings, true will enable them upon login, flase disabled. By default all are false except TC.
        hitme: false,
        damage: false, //damage numbers
        hit: false, //hit
        logo: false,
        tcremove: false, //
        tc: true, // Shows refreshes at a reduced rate (once every 7 hits by default)
        tcp: true //party abnormality refresh spam
    };

    const command = Command(dispatch);
    const classes = config.classes;

    function getClass(m) {
        return (m % 100);
    }
    command.add('fps', (setting, value) => {
        switch (setting) {
            // Set state to 0: Disabled.
            case "0":
                state = 0;
                config.state = 0;
                log('fps-utils optimization disabled by client.');
                command.message('optimization disabled by user. [0]');

                if (lastState > 2) {
                    // Display all hidden players.
                    for (let pl in hiddenPlayers) {
                        if (!hiddenIndividual[hiddenPlayers[pl].cid]) {
                            dispatch.toClient('S_SPAWN_USER', 3, hiddenPlayers[pl]);
                        }
                    }
                }

                break;
                // Set state to 1: Only hide projectiles.
            case "1":
                state = 1;
                config.state = 1;
                flags.hit = true;
                log('fps-utils optimization set to stage 1, disabling skill particles.');
                command.message('optimization set to remove skill particles. [1]');

                if (lastState > 2) {
                    // Display all hidden players. EXCEPT HIDDEN INDIVIDUALS
                    for (let pl in hiddenPlayers) {
                        if (!hiddenIndividual[hiddenPlayers[pl].cid]) {
                            dispatch.toClient('S_SPAWN_USER', 3, hiddenPlayers[pl]);
                        }
                    }
                }

                break;
                // Set state to 2: Hide all skill animations.
            case "2":
                state = 2;
                flags.hit = true;
                config.state = 2;
                log('fps-utils optimization set to stage 2, disabling skill animations.');
                command.message('optimization set to remove skill animations and hit effects. [2]');

                // Spawn all players with disabled animations.
                if (lastState > 2) {
                    for (let pl in hiddenPlayers) {
                        if (!hiddenIndividual[hiddenPlayers[pl].cid]) {
                            dispatch.toClient('S_SPAWN_USER', 3, hiddenPlayers[pl]);
                        }
                    }
                }
                break;
                // Set state to 3: Hide all other players.
            case "3":
                state = 3;
                flags.hit = true;
                config.state = 3;
                log('fps-utils optimization set to stage 3, disabling other player models.');
                command.message('optimization set to remove other player models [3]');

                if (lastState < 3) {
                    // Hide all players on screen and disable spawn.
                    for (let pl in hiddenPlayers) {
                        if (!hiddenIndividual[hiddenPlayers[pl].cid]) {
                            dispatch.toClient('S_DESPAWN_USER', 2, {
                                target: hiddenPlayers[pl].cid,
                                type: 1
                            });
                        }
                    }
                }
                break;
                // Save configuration to file.
            case "save":
                saveConfig();
                break;
                // Disable fireworks.
            case "fireworks":
                flags.fireworks = !flags.fireworks;
                log('fps-utils toggled fireworks: ' + flags.fireworks);
                command.message(`Fireworks toggled off: ${flags.fireworks}`);
                break;
                //disable players attack markers
            case "hit":
                if (value === null || value === undefined || value === "") {
                    command.message(`Missing command arguments, "fps hit [on, me, damage]"`);
                    break
                } else {
                    switch (value) {
                        case "me":
                            flags.hitme = !flags.hitme;
                            log('fps-utils toggled users hit effects: ' + flags.hit);
                            command.message(`User hit effects turned off: ${flags.hit}`);
                            break;

                        case "on":
                            flags.hit = !flags.hit;
                            log('fps-utils toggled hit effects on others: ' + flags.hit);
                            command.message(`Player hit effects on others turned off: ${flags.hit}`);
                            break;
                        case "damage":
                            flags.damage = !flags.damage;
                            log('fps-utils toggled player damage numbers: ' + flags.damage);
                            command.message(`Player damage numbers toggled off: ${flags.damage}`);
                            break;
                    }
                }
                break;
                //disable guild logos
            case "logo":
                flags.logo = !flags.logo;
                log('fps-utils toggled guild logos: ' + flags.logo);
                command.message(`toggled guild logos off: ${flags.logo}`);
                break;
                //Hide TC abnormality spam
            case "tc":
                if (value === null || value === undefined || value === "") {
                    command.message(`Missing command arguments, "fps tc [remove,party,on]"`);
                    break
                } else {
                    switch (value) {
                        case "remove":
                            flags.tcremove = !flags.tcremove;
                            command.message('TC buff will not refresh:' + flags.tcremove);
                            log('fps-utils toggled showing TC refreshes: ' + flags.tcremove);
                            break;
                        case "party":
                            command.message('TC buff will not be shown on party members:' + flags.tcp);
                            log('fps-utils toggled showing TC refreshes: ' + flags.tcp);
                            break;
                        case "on":
                            flags.tc = !flags.tc;
                            log('Smart TC fix enabled ' + flags.tc);
                            command.message(`toggled toggled smart TC fix: ${flags.tc}`);
                            break;
                    }
                }
                break;
                // Toggle individual classes on and off
            case "hide":
                if (value === null || value === undefined || value === "") {
                    //console.log('fps-utils missing arguments for command "hide"');
                    command.message(`missing arguments for command "hide" [dps, healers, tanks], [username] or [class]`);
                    break;
                } else {
                    if (state < 3)
                        switch (value) {
                            case "tanks":
                            case "dps":
                            case "healers":
                            case "ranged":
                            case "lancer":
                            case "slayer":
                            case "berserker":
                            case "sorcerer":
                            case "archer":
                            case "priest":
                            case "mystic":
                            case "reaper":
                            case "gunner":
                            case "ninja":
                            case "valkyrie":
                                flags.hide[value] = true;
                                command.message(`All ${value}'s hidden`);

                                for (let pl in hiddenPlayers) {
                                    if (!hiddenIndividual[hiddenPlayers[pl].cid] && (classes[value].indexOf(getClass(hiddenPlayers[pl].model)) > -1)) {
                                        dispatch.toClient('S_DESPAWN_USER', 2, {
                                            target: hiddenPlayers[pl].cid,
                                            type: 1
                                        });
                                    }
                                }
                                break
                                // Argument is an individual name or not recognized.   
                            default:
                                for (let pl in hiddenPlayers) {
                                    if (hiddenPlayers[pl].name.toString().toLowerCase() === value) {
                                        command.message(`player ${hiddenPlayers[pl].name} is added to the hiding list.`);
                                        hiddenIndividual[hiddenPlayers[pl].cid] = hiddenPlayers[pl];
                                        config.hiddenPeople.push(hiddenPlayers[pl].name.toString());
                                        dispatch.toClient('S_DESPAWN_USER', 2, {
                                            target: hiddenPlayers[pl].cid,
                                            type: 1
                                        });
                                        break;
                                    }
                                }
                                break;
                        }
                }
                break;

                // Try to respawn all hidden players included in show command.
            case "show":
                if (value === null || value === undefined || value === "") {
                    log('fps-utils missing arguments for command "show"');
                    command.message(`missing arguments for command "show" [dps, ranged, healers, tanks] or [username]`);
                    break;
                } else {
                    if (state < 3) {
                        switch (value) {
                            case "dps":
                            case "healers":
                            case "tanks":
                            case "ranged":
                            case "warrior":
                            case "lancer":
                            case "slayer":
                            case "berserker":
                            case "sorcerer":
                            case "archer":
                            case "priest":
                            case "mystic":
                            case "reaper":
                            case "gunner":
                            case "ninja":
                            case "valkyrie":
                                if (flags.hide[value]) {
                                    flags.hide[value] = false;
                                    log('fps-utils showing: ' + value);
                                    command.message(`showing ${value}`);
                                    for (let pl in hiddenPlayers) {
                                        if (classes[value].indexOf(getClass(hiddenPlayers[pl].model)) > -1) {
                                            if (!hiddenIndividual[hiddenPlayers[pl].cid])
                                                dispatch.toClient('S_SPAWN_USER', 3, hiddenPlayers[pl]);
                                        }
                                    }
                                }
                                break;
                            default:
                                // Individuals or unkown handler.
                                for (let pl in hiddenIndividual) {
                                    if (value === hiddenIndividual[pl].name.toString().toLowerCase()) {
                                        command.message(`showing player ${hiddenIndividual[pl].name}.`);
                                        config.hiddenPeople.splice(config.hiddenPeople.indexOf(hiddenPlayers[pl].name), 1);
                                        dispatch.toClient('S_SPAWN_USER', 3, hiddenIndividual[pl]);
                                        delete hiddenIndividual[pl];
                                    }
                                }
                                break;
                        }
                    }
                }
                break;
                // List the players in individuals list.
            case "list":
                let hiddenArray = [];
                for (let pl in hiddenIndividual) {
                    hiddenArray.push(hiddenIndividual[pl].name);
                }
                command.message(`Manually hidden players: ${hiddenArray}`);
                break;
                // Command not recognized
            default:
                command.message('Command not recognized. use [!fps help] for a list of available commands');
                break;
        }

        return false;
    });

    function log(msg) {
        if (DEBUG) console.log('[fps-utils] ' + msg);
    }

    function saveConfig() {
        fs.writeFile('./config.json', config, 'utf8', (err) => {
            if (!err) log("config file overwritten successfully");
        });
    }

    dispatch.hook('S_LOGIN', 2, (event) => {
        pcid = event.cid;
        ({
            cid,
            model
        } = event);
        player = event.name;
        clss = getClass(event.model);
        job = (event.model - 10101) % 100;
        state = config.state || 0;
    });

    dispatch.hook('S_LOAD_TOPO', 1, (event) => {
        // Refresh the hide list upon teleport or zone change.
        hiddenPlayers = {};
    });

    dispatch.hook('S_SPAWN_USER', 3, (event) => {

        // Add players in proximity of user to possible hide list.
        hiddenPlayers[event.cid] = event;

        // Check the state or if the individual is hidden.
        if (state === 3 || hiddenIndividual[event.cid]) {
            return false;
        }

        // Hide dps enabled, remove dps characters;
        if (flags.hide.dps && classes.dps.indexOf(getClass(event.model)) > -1) {
            return false;
        }

        //hide ranged enabled, delet ranged characters;
        if (flags.hide.ranged && classes.ranged.indexOf(getClass(event.model)) > -1) {
            return false;
        }

        // Hide tanks enabled, remove tank characters;
        if (flags.hide.tanks && classes.tanks.indexOf(getClass(event.model)) > -1) {
            return false;
        }

        // Why would you want this on, seriously...
        if (flags.hide.healers && classes.healers.indexOf(getClass(event.model)) > -1) {
            return false;
        }

    });

    dispatch.hook('S_DESPAWN_USER', 2, (event) => {
        delete hiddenPlayers[event.target];

        if (state === 3 || hiddenIndividual[event.target]) {
            return false;
        }
    });

    dispatch.hook('S_SPAWN_NPC', 3, (event) => {
        if (flags.fireworks) {
            if (event.huntingZoneId === 1023 && (event.templateId === 60016000 || event.templateId === 80037000))
                return false;
        }
    });
    dispatch.hook('S_EACH_SKILL_RESULT', 3, {
        order: 999
    }, (event) => {

        if (event.source.equals(pcid) || event.owner.equals(pcid)) {
            if (flags.damage) {
                event.damage = '';
                return true;
            }
            if (flags.hitme) {
                event.skill = '',
                    event.type = '',
                    event.type2 = '';
                return true;
            }
        }
        if (flags.hit) {
            if (hiddenPlayers[event.source] || hiddenPlayers[event.owner]) {
                event.skill = '',
                    event.type = '',
                    event.type2 = '';
                return true;
            }
        }
    });
    dispatch.hook('S_SPAWN_USER', 5, (event) => {
        if (flags.logo) {
            event.guildEmblem = '';
            return true;
        }
    });
    dispatch.hook('S_GUILD_NAME', 1, (event) => {
        if (flags.logo) {
            event.guildEmblem = '';
            return true;
        }
    });

    dispatch.hook('S_ABNORMALITY_BEGIN', 2, {
        order: 999
    }, (event) => {
        if (flags.tc) { //abnormality begin doesn't cause the lag but whatevs
            if (event.id === 101300) {
                event.duration = 0;
                return true;
            }
        }

    });
    dispatch.hook('S_PARTY_MEMBER_ABNORMAL_ADD', 3, {
        order: 999
    }, (event) => {
        if (event.id === 101300 && flags.tcp) {
            return false;
        }
    });
    dispatch.hook('S_ABNORMALITY_REFRESH', 1, {
        order: 999
    }, (event) => {
        if (event.id === 101300 && flags.tc) {
            dur = event.duration;
            counter = counter + 1;
            if (counter >= tchits) {
                counter = 0;
                event.duration = dur;
                return true;
            } else {
                return false;
            }
        }
        if (event.id === 101300 && flags.tcremove) {
            return false;
        }
    });

    dispatch.hook('S_USER_LOCATION', 1, (event) => {
        // Update locations of every player in case we need to spawn them.
        hiddenPlayers[event.target].x = event.x2;
        hiddenPlayers[event.target].y = event.y2;
        hiddenPlayers[event.target].z = event.z2;
        hiddenPlayers[event.target].w = event.w;
        if (state > 2 || hiddenIndividual[event.target]) {
            return false;
        }
    });

    dispatch.hook('S_ACTION_STAGE', 1, (event) => {

        // If state is higher than state1 remove all skill animations.    
        if (state > 1 && (hiddenPlayers[event.source] || hiddenIndividual[event.source])) {
            return false;
        }
        if (state === 2 && (((event.x - locx[event.source]) > 25 || (locx[event.source] - event.x) > 25) || ((event.y - locy[event.source]) > 25 || (locy[event.source] - event.y) > 25)) && (hiddenPlayers[event.source] || hiddenIndividual[event.source])) {
            dispatch.toClient('S_USER_LOCATION', 1, {
                target: event.source,
                x1: locx[event.source],
                y1: locy[event.source],
                z1: event.z,
                w: event.w,
                unk2: 0,
                speed: 300,
                x2: event.x,
                y2: event.y,
                z2: event.z,
                type: 0,
                unk: 0
            });
            locx[event.source] = event.x;
            locy[event.source] = event.y;
        }
    });

    dispatch.hook('S_ACTION_END', 1, (event) => {
        // If we're removing skill animations we should ignore the end packet too.
        if (state > 1 && (hiddenPlayers[event.source] || hiddenIndividual[event.source]))
            return false;
    });

    dispatch.hook('S_START_USER_PROJECTILE', 1, (event) => {
        // State 1 and higher ignores particles and projectiles so we're ignoring this.
        if (state > 0 && (hiddenPlayers[event.source] || hiddenIndividual[event.source]))
            return false;
    });

    dispatch.hook('S_SPAWN_PROJECTILE', 1, (event) => {
        // Ignore the projectile spawn if enabled in state.
        if (state > 0 && (hiddenPlayers[event.source] || hiddenIndividual[event.source]))
            return false;
    });


};
