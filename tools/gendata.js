const fs = require("fs")
const csv = require("csv-parser")

const print = console.log

let data = {}

const RUSSIA = 0
const FRANCE = 1

//=== SPACES ===
const names = 'names.csv'
const connections = 'mapped_connections.csv'

let done_with_spaces = false //flag to stop progress until writing of space data is finished

data.spaces = [ {name: "Pool"} ]

fs.createReadStream(names)
	.pipe(csv())
	.on('data', (row) => {
		const {
			id,
			name,
			type,
			nation = null,
			supply = 0,
			depot = false,
			vp = 0,
		} = row
		data.spaces.push({
			id: Number(id),
			name: (name === "Dunaburg") ? "Dünaburg" : name, //handling the umlaut here since the csv messes it up
			type,
			nation: (nation === '') ? null : nation,
			supply: ((Number(supply) === 1) ? true : false),
			depot: ((Number(depot) === 1) ? true : false),
			vp: (Number(vp) > 0) ? Number(vp) : 0,
			track: [],
			road: [],
			bridge: [],
		}) 
	})
	.on('end', () => {
		fs.createReadStream(connections)
			.pipe(csv())
			.on('data', (row) => {
				const {
					id,
					space1,
					space2,
					type,
					bridge,
				} = row
				switch(type) {
				case "road":
					data.spaces[space1].road.push(Number(space2))
					data.spaces[space2].road.push(Number(space1))
					break
				case "track":
					data.spaces[space1].track.push(Number(space2))
					data.spaces[space2].track.push(Number(space1))
				}
				if (Number(bridge) === 1) {
					data.spaces[space1].bridge.push(Number(space2))
					data.spaces[space2].bridge.push(Number(space1))
				}
			})
			.on('end', () => { //Not the most pretty way to do it, but it works

				//=== SCENARIO DATA ===
				data.scenarios = []

				const JUNE_5 = 0
				const JULY_R = 1
				const JULY_1 = 2
				const JULY_2 = 3
				const JULY_3 = 4
				const JULY_4 = 5
				const JULY_5 = 6
				const AUG_R = 7
				const AUG_1 = 8
				const AUG_2 = 9
				const AUG_3 = 10
				const AUG_4 = 11
				const AUG_5 = 12
				const SEPT_R = 13
				const SEPT_1 = 14
				const SEPT_2 = 15
				const SEPT_3 = 16
				const SEPT_4 = 17
				const SEPT_5 = 18
				const OCT_R = 19
				const OCT_1 = 20
				const OCT_2 = 21
				const OCT_3 = 22
				const OCT_4 = 23
				const OCT_5 = 24
				const NOV_R = 25
				const NOV_1 = 26
				const NOV_2 = 27
				const NOV_3 = 28
				const NOV_4 = 29
				const NOV_5 = 30

				const first_fr_card = 54

				function fr(card) {
					return first_fr_card + card
				}

				function def_scenario(id, name, start, end, vp, initiative, ru_hand_size, fr_hand_size, ru_cards, fr_cards, ru_removed, fr_removed, french_logistic_preparations, winter) {
					data.scenarios.push({id, name, start, end, vp, initiative, hand_size: [ru_hand_size, fr_hand_size], cards_in_hand: [ru_cards, fr_cards], removed_cards: [ru_removed, fr_removed], french_logistic_preparations, winter})
				}

				def_scenario(1, "The Eagles' March on Smolensk",    JUNE_5, AUG_4,  -11, 1, 3, 4, [1, 2, 4],              [fr(1), fr(9), fr(13)],             [],             [],                                     true,  false)
				def_scenario(2, "The Eagles' March on Moscow",      JUNE_5, SEPT_5, -19, 1, 3, 4, [1, 2, 4],              [fr(1), fr(9), fr(13)],             [],             [],                                     true,  false)
				def_scenario(3, "The Grand Campaign",               JUNE_5, NOV_5,  -14, 1, 3, 4, [1, 2, 4],              [fr(1), fr(9), fr(13)],             [],             [],                                     true,  true)
				def_scenario(4, "Hollow Victories",                 JULY_5, SEPT_5, -15, 2, 2, 2, [3, 8],                 [fr(5), fr(7)],                     [2, 6, 19, 43], [fr(1), fr(9), fr(17), fr(24)],         false, false)
				def_scenario(5, "Battle of Smolensk Campaign Start",AUG_3,  NOV_5,  -8,  3, 3, 3, [3, 9, 16, 17, 22, 40], [fr(2), fr(4), fr(11), fr(14)],     [2, 6, 19, 43], [fr(1), fr(5), fr(9), fr(17), fr(24)],  false, true)
				def_scenario(6, "The Retreat of the Grande Armée",  OCT_3,  NOV_5,  16, -1, 3, 3, [20, 25, 37, 48, 50],   [fr(27), fr(28), fr(36), fr(37)],   [15, 16, 17, 18, 19, 40, 43, 52], [fr(15), fr(17), fr(19), fr(20), fr(24), fr(34)], false, true)
				//=== LEADERS ===
				data.leaders = []

				function def_leader(id, faction, name, seniority, vp, short_name) {
					data.leaders.push({id, faction, name, seniority, vp, short_name})
				}

				def_leader(0,  RUSSIA, "Tsar Alexander I",       4, 5, "Alexander")
				def_leader(1,  RUSSIA, "Mikhail Kutuzov",        3, 2, "Kutuzov")
				def_leader(2,  RUSSIA, "Barclay de Tolly",       2, 1, "Tolly")
				def_leader(3,  RUSSIA, "Pyotr Bagration",        2, 1, "Bagration")
				def_leader(4,  RUSSIA, "Alexander Tormasov",     2, 1, "Tormasov")
				def_leader(5,  RUSSIA, "Peter Wittgenstein",     1, 1, "Wittgenstein")
				def_leader(6,  RUSSIA, "Pavel Chichagov",        1, 1, "Chichagov")
				def_leader(7,  RUSSIA, "Matvei Platov",          1, 0, "Platov")

				def_leader(8,  FRANCE, "Emperor Napoléon",       4, 10,"Napoleon")
				def_leader(9,  FRANCE, "Jerome Bonaparte",       3, 3, "Jerome")
				def_leader(10, FRANCE, "Eugene de Beauharnais",  3, 3, "Beauharnais")
				def_leader(11, FRANCE, "Louis-Nicolas Davout",   2, 2, "Davout")
				def_leader(12, FRANCE, "Joachim Murat",          1, 2, "Murat")
				def_leader(13, FRANCE, "Karl von Schwarzenberg", 1, 1, "Schwarzenberg")

				//=== CARDS ===
				data.cards = []

				const SUMMER = 0
				const WINTER = 1
				const BOTH = 2

				const DUMMY = 0
				const EVENT = 1
				const BATTLE = 2
				const RESP = 3 //Response

				function def_card(faction, id, name, season, type, ops, permanently_remove = false, immediate = false) {
					switch(faction) {
					case RUSSIA:
						data.cards.push({id, who: faction, name, season, type, ops, permanently_remove, immediate})
						break
					case FRANCE:
						data.cards.push({id: (id + 54), who: faction, name, season, type, ops, permanently_remove, immediate})
					}
				}

				/* RUSSIA */
				def_card(RUSSIA,    0,  "Dummy",                    BOTH,   DUMMY,  0)
				def_card(RUSSIA,    1,  "Well-Disciplined Retreat", SUMMER, EVENT,  2)
				def_card(RUSSIA,    2,  "Confused Retreat",         SUMMER, EVENT,  1, true)
				def_card(RUSSIA,    3,  "Opolchenie",               SUMMER, EVENT,  3, true)
				def_card(RUSSIA,    4,  "Evasive Maneuvers",        SUMMER, EVENT,  3)
				def_card(RUSSIA,    5,  "Idle Reserves",            SUMMER, BATTLE, 2)
				def_card(RUSSIA,    6,  "Bagration's Retreat",      SUMMER, EVENT,  2, true)
				def_card(RUSSIA,    7,  "Indecision",               SUMMER, EVENT,  3)
				def_card(RUSSIA,    8,  "Fighting Withdrawal",      SUMMER, BATTLE, 3)
				def_card(RUSSIA,    9,  "Uninspired Tactics",       SUMMER, BATTLE, 2)
				def_card(RUSSIA,    10, "Scorched Earth",           SUMMER, EVENT,  3)
				def_card(RUSSIA,    11, "Holy Mother Russia",       SUMMER, EVENT,  0, false, true)
				def_card(RUSSIA,    12, "Outflanking",              BOTH,   BATTLE, 3)
				def_card(RUSSIA,    13, "Garrison Troops",          BOTH,   EVENT,  2)
				def_card(RUSSIA,    14, "Extreme Weather",          BOTH,   EVENT,  0, false, true)
				def_card(RUSSIA,    15, "Pride and Hesitation",     BOTH,   EVENT,  2, true)
				def_card(RUSSIA,    16, "Kutuzov Appointed",        BOTH,   EVENT,  3, false)
				def_card(RUSSIA,    17, "The Finland Corps",        BOTH,   EVENT,  3, true)
				def_card(RUSSIA,    18, "Treaty of Bucharest",      BOTH,   EVENT,  3, true)
				def_card(RUSSIA,    19, "The Czar Leaves The Army", BOTH,   EVENT,  2, true)
				def_card(RUSSIA,    20, "Flying Columns",           BOTH,   EVENT,  2)
				def_card(RUSSIA,    21, "Overstretched Logistics",  BOTH,   EVENT,  3)
				def_card(RUSSIA,    22, "City Ablaze!",             BOTH,   RESP,   3)
				def_card(RUSSIA,    23, "Stubborn Rearguard",       BOTH,   RESP,   3)
				def_card(RUSSIA,    24, "New Posting",              BOTH,   EVENT,  2)
				def_card(RUSSIA,    25, "Exhausting March",         BOTH,   RESP,   3)
				def_card(RUSSIA,    26, "Exhausting March",         BOTH,   RESP,   3)
				def_card(RUSSIA,    27, "Unexpected Retreat",       BOTH,   EVENT,  3)
				def_card(RUSSIA,    28, "Poor Coordination",        BOTH,   BATTLE, 3)
				def_card(RUSSIA,    29, "Cavalry Screening",        BOTH,   EVENT,  2)
				def_card(RUSSIA,    30, "Devastated Landscape",     BOTH,   EVENT,  3)
				def_card(RUSSIA,    31, "Stoic Infantry",           BOTH,   BATTLE, 3)
				def_card(RUSSIA,    32, "The Artillery Corps",      BOTH,   BATTLE, 4)
				def_card(RUSSIA,    33, "Fortifications",           BOTH,   BATTLE, 2)
				def_card(RUSSIA,    34, "Platov\'s Cossacks",       BOTH,   BATTLE, 2)
				def_card(RUSSIA,    35, "Fickle Habsburgs",         BOTH,   BATTLE, 2)
				def_card(RUSSIA,    36, "Infantry Squares",         BOTH,   BATTLE, 2)
				def_card(RUSSIA,    37, "Enveloping Moves",         BOTH,   BATTLE, 3)
				def_card(RUSSIA,    38, "Konstantine's Corps",      BOTH,   BATTLE, 4)
				def_card(RUSSIA,    39, "Cavalry Charge",           BOTH,   BATTLE, 3)
				def_card(RUSSIA,    40, "Delayed Forces",           BOTH,   BATTLE, 2, true)
				def_card(RUSSIA,    41, "Fierce Fighting",          BOTH,   BATTLE, 2)
				def_card(RUSSIA,    42, "Command Friction",         BOTH,   EVENT,  0, false, true)
				def_card(RUSSIA,    43, "Exhausted Horses",         BOTH,   EVENT,  3, true)
				def_card(RUSSIA,    44, "Disease & Starvation",     BOTH,   EVENT,  3)
				def_card(RUSSIA,    45, "Poor Logistics",           BOTH,   EVENT,  0, false, true)
				def_card(RUSSIA,    46, "Devastated Countryside",   WINTER, EVENT,  0, false, true)
				def_card(RUSSIA,    47, "Treacherous Allies",       WINTER, BATTLE, 3)
				def_card(RUSSIA,    48, "Disorderly March",         WINTER, EVENT,  3)
				def_card(RUSSIA,    49, "Cossack Patrols",          WINTER, EVENT,  4)
				def_card(RUSSIA,    50, "Crumbling Cohesion",       WINTER, BATTLE, 3)
				def_card(RUSSIA,    51, "Unreliable Germans",       WINTER, BATTLE, 3)
				def_card(RUSSIA,    52, "Barclay de Tolly Resigns", WINTER, EVENT,  0, true, true)
				def_card(RUSSIA,    53, "Aggressive Cossacks",      WINTER, BATTLE, 3)

				/* FRANCE */
				def_card(FRANCE,    0,  "Dummy",                     BOTH,   DUMMY,  0)
				def_card(FRANCE,    1,  "Hard Marching",             SUMMER, EVENT,  4, true)
				def_card(FRANCE,    2,  "Hard Marching",             SUMMER, EVENT,  4, true)
				def_card(FRANCE,    3,  "War Weariness",             SUMMER, EVENT,  3, true)
				def_card(FRANCE,    4,  "Holy Mother Russia",        SUMMER, EVENT,  3, true)
				def_card(FRANCE,    5,  "Polish Support",            SUMMER, EVENT,  2, true)
				def_card(FRANCE,    6,  "Outflanking",               SUMMER, BATTLE, 4)
				def_card(FRANCE,    7,  "Unsuccessful Disengagement",SUMMER, EVENT,  3, false)
				def_card(FRANCE,    8,  "Infighting & Intrigue",     SUMMER, EVENT,  2)
				def_card(FRANCE,    9,  "Fast Marching",             SUMMER, EVENT,  3, true)
				def_card(FRANCE,    10, "Fast Marching",             SUMMER, EVENT,  3, true)
				def_card(FRANCE,    11, "Grand Battery",             SUMMER, BATTLE, 4)
				def_card(FRANCE,    12, "Cavalry Charge",            SUMMER, BATTLE, 4)
				def_card(FRANCE,    13, "Murat's Cavalry",           SUMMER, BATTLE, 3, true)
				def_card(FRANCE,    14, "Skillfull Maneuvers",       SUMMER, EVENT,  4)
				def_card(FRANCE,    15, "Peace Offer",               BOTH,   BATTLE, 2)
				def_card(FRANCE,    16, "Infantry Squares",          BOTH,   BATTLE, 2)
				def_card(FRANCE,    17, "Davout Takes Command",      BOTH,   EVENT,  2, true)
				def_card(FRANCE,    18, "Outflanking",               BOTH,   BATTLE, 3, true)
				def_card(FRANCE,    19, "IX Corps Arrives",          BOTH,   EVENT,  3, true)
				def_card(FRANCE,    20, "XI Corps Arrives",          BOTH,   EVENT,  3, true)
				def_card(FRANCE,    21, "Confusing Orders",          BOTH,   BATTLE, 3)
				def_card(FRANCE,    22, "Poor Communications",       BOTH,   EVENT,  0, false, true)
				def_card(FRANCE,    23, "Poor Coordination",         BOTH,   BATTLE, 2)
				def_card(FRANCE,    24, "Jérôme Goes Home",          BOTH,   EVENT,  0, true, true)
				def_card(FRANCE,    25, "Good Leadership",           BOTH,   EVENT,  2)
				def_card(FRANCE,    26, "Combined Arms",             BOTH,   BATTLE, 3)
				def_card(FRANCE,    27, "Confusions and Delays",     BOTH,   BATTLE, 3)
				def_card(FRANCE,    28, "Saint–Cyr\'s VI Corps",     BOTH,   BATTLE, 3, true)
				def_card(FRANCE,    29, "Eblé's Pontoneers",         BOTH,   BATTLE, 3)
				def_card(FRANCE,    30, "Stubborn Rearguard",        BOTH,   RESP,   3)
				def_card(FRANCE,    31, "The Imperial Guard",        BOTH,   BATTLE, 4, true)
				def_card(FRANCE,    32, "Delayed Forces",            BOTH,   BATTLE, 3)
				def_card(FRANCE,    33, "Napoléon's Marshals",       BOTH,   BATTLE, 3)
				def_card(FRANCE,    34, "Fierce Fighting",           BOTH,   BATTLE, 4, true)
				def_card(FRANCE,    35, "Ney\'s III Corps",          BOTH,   BATTLE, 3)
				def_card(FRANCE,    36, "Eugène\'s IV Corps",        BOTH,   BATTLE, 3, true)
				def_card(FRANCE,    37, "Poniatowski\'s V Corps",    BOTH,   EVENT,  3, true)
				def_card(FRANCE,    38, "Inferior Gunpowder",        BOTH,   BATTLE, 3)
				def_card(FRANCE,    39, "Chaos In The Rear Areas",   BOTH,   EVENT,  0, false, true)
				def_card(FRANCE,    40, "Vulnerable Supply Lines",   WINTER, EVENT,  0, false, true)
				def_card(FRANCE,    41, "Freezing Weather",          WINTER, EVENT,  0, false, true)
				def_card(FRANCE,    42, "Extreme Weather",           WINTER, EVENT,  0, false, true)
				def_card(FRANCE,    43, "Logistics Collapse",        WINTER, EVENT,  0, true, true)
				def_card(FRANCE,    44, "Chaotic Food Distribution", WINTER, EVENT,  0, false, true)
				def_card(FRANCE,    45, "Much Needed Victuals",      WINTER, EVENT,  1)
				def_card(FRANCE,    46, "Energetic Leadership",      WINTER, EVENT,  3)
				def_card(FRANCE,    47, "Inferior Musketry",         WINTER, BATTLE, 2)
				def_card(FRANCE,    48, "Napoléon Returns to Paris", WINTER, EVENT,  1, true)
				def_card(FRANCE,    49, "Tough Rearguard",           WINTER, EVENT,  2)
				def_card(FRANCE,    50, "Courage of Desperation",    WINTER, BATTLE, 3)
				def_card(FRANCE,    51, "The Old Guard",             WINTER, BATTLE, 3)
				def_card(FRANCE,    52, "Ney\'s Escape",             WINTER, BATTLE, 2, true)
				def_card(FRANCE,    53, "Lethargic Pursuit",         WINTER, EVENT,  2)

				//=== PIECES ===
				const AUSTRIA = 2
				const PRUSSIA = 3

				const INFANTRY = 0
				const CAVALRY = 1
				const GUARD = 2
				const COSSACK = 3
				const DEPOT_MARKER = 4

				data.pieces = []

				function def_piece(faction, nationality, type, quantity, amount) {
					let name
					switch(type) {
					case INFANTRY:
						name = "Infantry"; break
					case CAVALRY:
						name = "Cavalry"; break
					case GUARD:
						name = "Guard"; break
					case COSSACK:
						name = "Cossack"; break
					case DEPOT_MARKER:
						name = "Depot"; break
					default:
						throw("Piece undefined!")
					}
					data.pieces.push({faction, nationality, name, type, quantity, amount})
				}

				def_piece(RUSSIA,   RUSSIA,     INFANTRY,   1,  45)
				def_piece(RUSSIA,   RUSSIA,     INFANTRY,   2,  24)
				def_piece(RUSSIA,   RUSSIA,     INFANTRY,   5,  6)
				def_piece(RUSSIA,   RUSSIA,     INFANTRY,   10, 1)
				def_piece(RUSSIA,   RUSSIA,     CAVALRY,    1,  12)
				def_piece(RUSSIA,   RUSSIA,     CAVALRY,    2,  1)
				def_piece(RUSSIA,   RUSSIA,     COSSACK,    1,  14)
				def_piece(RUSSIA,   RUSSIA,     DEPOT_MARKER, -1, 14)

				def_piece(FRANCE,   FRANCE,     INFANTRY,   1,  27)
				def_piece(FRANCE,   FRANCE,     INFANTRY,   2,  15)
				def_piece(FRANCE,   FRANCE,     INFANTRY,   5,  7)
				def_piece(FRANCE,   FRANCE,     INFANTRY,   10, 2)
				def_piece(FRANCE,   FRANCE,     CAVALRY,    1,  10)
				def_piece(FRANCE,   FRANCE,     CAVALRY,    2,  2)
				def_piece(FRANCE,   FRANCE,     GUARD,      1,  4)
				def_piece(FRANCE,   PRUSSIA,    INFANTRY,   1,  5)
				def_piece(FRANCE,   AUSTRIA,    INFANTRY,   1,  6)
				def_piece(FRANCE,   FRANCE,     DEPOT_MARKER, -1, 7)

				//=== ORDERS ===
				const FORCED_MARCH = 0
				const CAVALRY_PATROLS = 1
				const MARCH = 2
				const EVADE = 3
				const DEFEND = 4
				const RALLY = 5
				const COSSACK_RAID = 6
				const PLACE_DEPOT = 7
				const FORAGE = 8
				const DUMMY_ORDER = 9

				data.orders = [ null ]
				let num = 1
				function define_order(who, type, num_of_type) {
					for (i = 0; i < num_of_type; ++i) {
						data.orders.push({id: num, owner: who, type})
						num++
					}
				}

				define_order(RUSSIA, FORCED_MARCH, 4)
				define_order(RUSSIA, CAVALRY_PATROLS, 2)
				define_order(RUSSIA, MARCH, 5)
				define_order(RUSSIA, EVADE, 4)
				define_order(RUSSIA, DEFEND, 2)
				define_order(RUSSIA, RALLY, 2)
				define_order(RUSSIA, COSSACK_RAID, 2)
				define_order(RUSSIA, PLACE_DEPOT, 1)
				define_order(RUSSIA, FORAGE, 2)
				define_order(RUSSIA, DUMMY_ORDER, 4)

				define_order(FRANCE, FORCED_MARCH, 5)
				define_order(FRANCE, CAVALRY_PATROLS, 1)
				define_order(FRANCE, MARCH, 5)
				define_order(FRANCE, EVADE, 3)
				define_order(FRANCE, DEFEND, 1)
				define_order(FRANCE, RALLY, 2)
				define_order(FRANCE, PLACE_DEPOT, 1)
				define_order(FRANCE, FORAGE, 3)
				define_order(FRANCE, DUMMY_ORDER, 4)


				fs.writeFileSync("data.js", "const data = " + JSON.stringify(data, 0, 2) + "\nif (typeof module !== 'undefined') module.exports = data\n", "utf8")
			})
	})