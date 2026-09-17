/* global console */

"use strict"

// TODO: Give a player VP for eliminating a force, unless the force only consists of Cossack SPs.
// TODO: Fix place depot phase (does not map to the general pattern).
// TODO: Add event restrictions on certain orders.
// TODO: Better handling of response events.
// TODO: Fully filter view for roles who shouldn't see SP composition.

const data = require("./data")

const RUSSIA = 0
const FRANCE = 1
const ROLES = ["Russia", "France"]

// Framework global variables
var G, L, V, R, P = {}
// Could play event checks
var E = {}

// === CONSTANTS ===
// Default value for logging
const NONE = -1

/* CARDS */
const cards = data.cards

const C_DUMMY_RU = 0
const C_WELL_DISCIPLINED_RETREAT = 1
const C_CONFUSED_RETREAT = 2
const C_OPOLCHENIE = 3
const C_EVASIVE_MANEUVERS = 4
const C_IDLE_RESERVES = 5
const C_BAGRATIONS_RETREAT = 6
const C_INDECISION = 7
const C_FIGHTING_WITHDRAWAL = 8
const C_UNINSPIRED_TACTICS = 9
const C_SCORCHED_EARTH = 10
const C_HOLY_MOTHER_RUSSIA_RU = 11
const C_OUTFLANKING_RU = 12
const C_GARRISON_TROOPS = 13
const C_EXTREME_WEATHER_RU = 14
const C_PRIDE_AND_HESITATION = 15
const C_KUTUZOV_APPOINTED = 16
const C_THE_FINLAND_CORPS = 17
const C_TREATY_OF_BUCHAREST = 18
const C_THE_CZAR_LEAVES_THE_ARMY = 19
const C_FLYING_COLUMNS = 20
const C_OVERSTRETCHED_LOGISTICS = 21
const C_CITY_ABLAZE = 22
const C_STUBBORN_REARGUARD_RU = 23
const C_NEW_POSTING = 24
const C_EXHAUSTING_MARCH_1 = 25
const C_EXHAUSTING_MARCH_2 = 26
const C_UNEXPECTED_RETREAT = 27
const C_POOR_COORDINATION_RU = 28
const C_CAVALRY_SCREENING = 29
const C_DEVASTATED_LANDSCAPE = 30
const C_STOIC_INFANTRY = 31
const C_THE_ARTILLERY_CORPS = 32
const C_FORTIFICATIONS = 33
const C_PLATOVS_COSSACKS = 34
const C_FICKLE_HABSBURGS = 35
const C_INFANTRY_SQUARES_RU = 36
const C_ENVELOPING_MOVES = 37
const C_KONSTANTINES_CORPS = 38
const C_CAVALRY_CHARGE_RU = 39
const C_DELAYED_FORCES_RU = 40
const C_FIERCE_FIGHTING_RU = 41
const C_COMMAND_FRICTION = 42
const C_EXHAUSTED_HORSES = 43
const C_DISEASE_AND_STARVATION = 44
const C_POOR_LOGISTICS = 45
const C_DEVASTATED_COUNTRYSIDE = 46
const C_TREACHEROUS_ALLIES = 47
const C_DISORDERLY_MARCH = 48
const C_COSSACK_PATROLS = 49
const C_CRUMBLING_COHESION = 50
const C_UNRELIABLE_GERMANS = 51
const C_BARCLAY_DE_TOLLY_RESIGNS = 52
const C_AGGRESSIVE_COSSACKS = 53

const C_DUMMY_FR = 54
const C_HARD_MARCHING_1 = 55
const C_HARD_MARCHING_2 = 56
const C_WAR_WEARINESS = 57
const C_HOLY_MOTHER_RUSSIA_FR = 58
const C_POLISH_SUPPORT = 59
const C_OUTFLANKING_FR_1 = 60
const C_UNSUCCESSFUL_DISENGAGEMENT = 61
const C_INFIGHTING_AND_INTRIGUE = 62
const C_FAST_MARCHING_1 = 63
const C_FAST_MARCHING_2 = 64
const C_GRAND_BATTERY = 65
const C_CAVALRY_CHARGE_FR = 66
const C_MURATS_CAVALRY = 67
const C_SKILLFULL_MANEUVERS = 68
const C_PEACE_OFFER = 69
const C_INFANTRY_SQUARES_FR = 70
const C_DAVOUT_TAKES_COMMAND = 71
const C_OUTFLANKING_FR_2 = 72
const C_IX_CORPS_ARRIVES = 73
const C_XI_CORPS_ARRIVES = 74
const C_CONFUSING_ORDERS = 75
const C_POOR_COMMUNICATIONS = 76
const C_POOR_COORDINATION_FR = 77
const C_JEROME_GOES_HOME = 78
const C_GOOD_LEADERSHIP = 79
const C_COMBINED_ARMS = 80
const C_CONFUSIONS_AND_DELAYS = 81
const C_SAINT_CYRS_VI_CORPS = 82
const C_EBLES_PONTONEERS = 83
const C_STUBBORN_REARGUARD_FR = 84
const C_THE_IMPERIAL_GUARD = 85
const C_DELAYED_FORCES_FR = 86
const C_NAPOLEONS_MARSHALS = 87
const C_FIERCE_FIGHTING_FR = 88
const C_NEYS_III_CORPS = 89
const C_EUGENES_IV_CORPS = 90
const C_PONIATOWSKIS_V_CORPS = 91
const C_INFERIOR_GUNPOWDER = 92
const C_CHAOS_IN_THE_REAR_AREAS = 93
const C_VULNERABLE_SUPPLY_LINES = 94
const C_FREEZING_WEATHER = 95
const C_EXTREME_WEATHER_FR = 96
const C_LOGISTICS_COLLAPSE = 97
const C_CHAOTIC_FOOD_DISTRIBUTION = 98
const C_MUCH_NEEDED_VICTUALS = 99
const C_ENERGETIC_LEADERSHIP = 100
const C_INFERIOR_MUSKETRY = 101
const C_NAPOLEON_RETURNS_TO_PARIS = 102
const C_TOUGH_REARGUARD = 103
const C_COURAGE_OF_DESPERATION = 104
const C_THE_OLD_GUARD = 105
const C_NEYS_ESCAPE = 106
const C_LETHARGIC_PURSUIT = 107

/* TIME & SEASONS */
const SUMMER = 0
const WINTER = 1
const BOTH = 2

const JUNE = 0
const JULY = 1
const AUG = 2
const SEPT = 3
const OCT = 4
const NOV = 5

const JUNE_5 = 0

/* AREAS */
const areas = data.areas

const HIDDEN = -2
const OUT_OF_PLAY = -1
const POOL = 0

const S_PRUSSIA_NORTH = 1 // The northern of the two "Prussia" areas
const S_KALTINENAI = 3
const S_PRUSSIA_SOUTH = 5
const S_KALVARIJA = 6
const S_SUWALKI = 7
const S_GRODNO = 9
const S_SZCZUCZY = 10
const S_GRAND_DUCHY_OF_WARSAW_NORTH = 11
const S_BIALYSTOK = 12
const S_GRAND_DUCHY_OF_WARSAW_SOUTH = 14
const S_AUSTRIA = 16
const S_ZAMOSC = 18
const S_RIGA = 19
const S_VENDEN = 20
const S_MITAU = 22
const S_ECKAU = 23
const S_SIAULAI = 24
const S_VILKOMIR = 27
const S_UNNAMED_B2 = 28
const S_KOVNO = 29
const S_VILNA = 30
const S_LIDA = 33
const S_VOLKOVYSK = 34
const S_SLONIM = 35
const S_PRUZHANY = 36
const S_BIELSK = 37
const S_KOBRYN = 38
const S_BREST = 39
const S_RATNO = 40
const S_KOVEL = 41
const S_VLADIMIR_B6 = 43 // Two areas named Vladimir on map, so added extra identifying info
const S_LUTSK = 44
const S_DUBNO = 45
const S_LIVONIA = 46
const S_OSTROV = 47
const S_JAKOBSTADT = 49
const S_DUNABURG = 51
const S_DRISSA = 52
const S_VIDZY = 53
const S_SALAKAS = 54
const S_SVENCIONYS = 55
const S_DOKSHITSY = 56
const S_MOLODECHNO = 58
const S_MINSK = 60
const S_PLESHCHENITSY = 61
const S_NOVGRUDOK = 62
const S_NESVICH = 63
const S_SLUTSK = 64
const S_PINSK = 66
const S_ROVNO = 68
const S_MOLDAVIA = 71
const S_PSKOV = 72
const S_SEVEZH = 75
const S_POLOTSK = 77
const S_DISNA = 78
const S_KAMEN = 79
const S_KOKHANOVO = 82
const S_BORISOV = 83
const S_MOGILEV = 84
const S_BOBRUYSK = 85
const S_RAGOSTOV = 87
const S_MOZYR = 88
const S_ZHITOMIR = 91
const S_KIEV = 92
const S_BEZHANITZY = 93
const S_TOROPETS = 96
const S_PORECZIE = 99
const S_VITEBSK = 100
const S_SMOLENSK = 101
const S_BABINOVICHI = 102
const S_ORSHA = 103
const S_MSTISLAVL = 104
const S_UNNAMED_E4 = 105 // Unnamed areas are named "Unnamed" + sector
const S_UKRAINE = 113
const S_DUKHOVSHCHINA = 115
const S_VYAZMA = 118
const S_DOROGOBUZH = 119
const S_SVERSKOVO = 120
const S_ROSLAVL = 122
const S_BRYANSK = 123
const S_TORZHOK = 131
const S_TVER = 132
const S_GZHATSK = 136
const S_MOZHAYSK = 137
const S_MALOYAROSLAVET = 139
const S_TARUTINO = 140
const S_KALUGA = 142
const S_KOSELYSK = 143
const S_OREL = 145
const S_VORONEZH = 147
const S_VLADIMIR_H1 = 149
const S_MOSCOW = 150
const S_UNNAMED_H2 = 151
const S_RYAZAN = 153
const FRENCH_CASUALTIES = 157

const FIRST_AREA = 1
const LAST_AREA = 156
const NUM_AREAS = 158

// Some precomputed (sorted) groupings of areas
const SUPPLY_SOURCES = [
	[ S_RIGA, S_LIVONIA, S_PSKOV, S_UKRAINE, S_TORZHOK, S_VORONEZH, S_VLADIMIR_H1, S_UNNAMED_H2, S_RYAZAN ],
	[ S_PRUSSIA_SOUTH, S_GRAND_DUCHY_OF_WARSAW_NORTH, S_GRAND_DUCHY_OF_WARSAW_SOUTH, S_AUSTRIA ],
]
const FRENCH_OFF_MAP_AREAS = [ S_PRUSSIA_NORTH, S_PRUSSIA_SOUTH, S_GRAND_DUCHY_OF_WARSAW_NORTH, S_GRAND_DUCHY_OF_WARSAW_SOUTH, S_AUSTRIA ]

/* LEADERS */
const leaders = data.leaders
const NUM_LEADERS = 14

const first_russia_leader = 0
const last_russia_leader = 7
const first_france_leader = 8
const last_france_leader = 13

const L_ALEXANDER = 0
const L_KUTUZOV = 1
const L_DE_TOLLY = 2
const L_BAGRATION = 3
const L_TORMASOV = 4
const L_WITTGENSTEIN = 5
const L_CHICHAGOV = 6
const L_PLATOV = 7

const L_NAPOLEON = 8
const L_JEROME = 9
const L_DE_BEAUHARNAIS = 10 // Used names on counters, he is referred to as 'Eugène' in other places
const L_DAVOUT = 11
const L_MURAT = 12
const L_SCHWARZENBERG = 13

const LEADERS_WHO_CAN_CHANGE_ORDERS = [
	[L_KUTUZOV, L_DE_TOLLY, L_BAGRATION, L_CHICHAGOV],
	[L_NAPOLEON, L_DAVOUT, L_SCHWARZENBERG]
]

/* ORDERS */
const orders = data.orders

const first_russia_order = 1
const last_russia_order = 28
const first_france_order = 29
const last_france_order = 53

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
const NUM_ORDER_TYPES = 10

const FIRST_ORDER = 1
const LAST_ORDER = 53
const NUM_ORDERS = 54

/* TROOPS */
// X1 vs. X0,5
const HALF_STRENGTH = 0
const FULL_STRENGTH = 1

const FRESH_INFANTRY = 0
const EXHAUSTED_INFANTRY = 1
const FRESH_CAVALRY = 2
const EXHAUSTED_CAVALRY = 3
const FRESH_COSSACK = 4
const EXHAUSTED_COSSACK = 5
const FRESH_GUARD = 6
const EXHAUSTED_GUARD = 7

//Not types, but much easier to handle for activation this way
//NOTE: Will need refactor in case 1813 is implemented
const FRESH_PRUSSIAN_INFANTRY = 8
const EXHAUSTED_PRUSSIAN_INFANTRY = 9
const FRESH_AUSTRIAN_INFANTRY = 10
const EXHAUSTED_AUSTRIAN_INFANTRY = 11

const NUM_TROOP_TYPES = 12

/* DEPOTS */
const NUM_DEPOTS_RU = 14
const NUM_DEPOTS_FR = 7

const first_russia_depot = 0
const last_russia_depot = 13
const first_france_depot = 14
const last_france_depot = 20

/* DICE */
const FRANCE_BATTLE_DIE = {
	1: -1,
	2: -1,
	3: -1,
	4: 2,
	5: 3,
	6: 4,
}

const WINTER_ONLY_MINUS_1 = 1
const SUMMER_ONLY_4 = 6

function roll_france_battle_die() {
	let roll = random(6) + 1
	log_battle_roll(roll, FRANCE)
	if ((roll === WINTER_ONLY_MINUS_1) && (get_current_season() !== WINTER)) {
		log("Weather is not Winter: roll changed to 0.")
		return 0
	} else if ((roll === SUMMER_ONLY_4) && (get_current_season() !== SUMMER)) {
		log("Weather is not Summer: roll changed to 0.")
		return 0
	}
	return FRANCE_BATTLE_DIE[roll]
}

const RUSSIA_BATTLE_DIE = {
	1: -2,
	2: 1,
	3: 1,
	4: 1,
	5: 2,
	6: 3,
}

const DEFENDING_ONLY_1 = 2

function roll_russia_battle_die() {
	let roll = random(6) + 1
	log_battle_roll(roll, RUSSIA)
	if (roll === DEFENDING_ONLY_1 && (get_battle_defender(G.current_battle) !== RUSSIA)) {
		log("Russia is not defending: roll changed to 0.")
		return 0
	}
	return RUSSIA_BATTLE_DIE[roll]
}

const BATTLE_TABLE = [
	{min: 0, max: 2, hits: 0},
	{min: 3, max: 5, hits: 1},
	{min: 6, max: 9, hits: 2},
	{min: 10, max: 13, hits: 3},
	{min: 14, max: 17, hits: 4},
	{min: 18, max: 22, hits: 5},
	{min: 23, max: 27, hits: 6},
	{min: 28, max: 33, hits: 7},
	{min: 34, max: 1000, hits: 8}, //No max
]

function get_combat_losses_inflicted(combat_value) {
	if (combat_value > 34) return 8
	return BATTLE_TABLE.find(entry => (entry.min <= combat_value) && (combat_value <= entry.max)).hits
}

function get_summer_weather_die_result(who, roll) {
	switch(roll) {
	case 1: return -2
	case 2: return -1
	case 3:
		if (who === RUSSIA)
			return -1
		else
			return 0
	case 4: return 0
	case 5: return 1
	case 6: return 1
	}
}

function get_winter_weather_die_result(who, roll) {
	switch(roll) {
	case 1: return -1
	case 2: return 0
	case 3:
		if (who === RUSSIA)
			return 0
		else
			return 1
	case 4: return 1
	case 5: return 2
	case 6: return 3
	}
}

const ATTRITION_TABLE = [
	[[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 1], [0, 1]], //1
	[[0, 0], [0, 0], [0, 0], [0, 0], [0, 1], [1, 1], [1, 1]], //2
	[[0, 0], [0, 0], [0, 0], [0, 0], [1, 1], [1, 1], [2, 1]], //3
	[[0, 0], [0, 0], [0, 0], [0, 1], [1, 1], [2, 1], [2, 2]], //4
	[[0, 0], [0, 0], [0, 0], [1, 1], [1, 1], [2, 1], [2, 2]], //5
	[[0, 0], [0, 0], [0, 1], [1, 1], [1, 1], [2, 2], [3, 2]], //6
	[[0, 0], [0, 0], [1, 1], [1, 1], [2, 1], [2, 2], [4, 2]], //7-8
	[[0, 0], [0, 1], [1, 1], [1, 1], [2, 2], [2, 2], [4, 3]], //9-11
	[[0, 1], [1, 1], [1, 1], [2, 1], [2, 2], [3, 2], [5, 3]], //12-14
	[[1, 1], [1, 1], [2, 1], [2, 2], [3, 2], [4, 3], [6, 3]], //15-20
	[[1, 1], [2, 1], [2, 2], [3, 2], [4, 3], [5, 3], [7, 3]], //21+
]

function get_modified_size_row(modified_size) {
	if (modified_size <= 1) return 0
	else if (modified_size >= 2 && modified_size <= 6) return modified_size - 1
	else if (modified_size >= 7 && modified_size <= 8) return 6
	else if (modified_size >= 9 && modified_size <= 11) return 7
	else if (modified_size >= 12 && modified_size <= 14) return 8
	else if (modified_size >= 15 && modified_size <= 20) return 9
	else return 10
}

function lookup_attrition_table(modified_size, distance_to_nearest_depot) {
	distance_to_nearest_depot = Math.max(0, Math.min(6, distance_to_nearest_depot))
	return ATTRITION_TABLE[get_modified_size_row(modified_size)][distance_to_nearest_depot].slice()
}

// === DATA ACCESSORS ===
function enemy(who) {
	return 1 - who
}

/* CARDS */
function get_card_owner(c) {
	return cards[c].who
}

function is_card_dummy(c) {
	return c === C_DUMMY_RU || c === C_DUMMY_FR
}

function get_card_season(c) {
	return cards[c].season
}

function is_must_play_event(c) {
	return cards[c].immediate
}

function get_card_ops(c) {
	return cards[c].ops
}

function is_permanent_removal_card(c) {
	return cards[c].permanently_remove
}

function get_hand(who) {
	return G.hand[who]
}

function get_non_dummy_cards_in_hand(who) {
	return get_hand(who).filter(card => !is_card_dummy(card))
}

function count_non_dummy_cards_in_hand(who) {
	return array_count(get_hand(who), card => !is_card_dummy(card))
}

function hand_has(who, card) {
	return set_has(get_hand(who), card)
}

function get_deck(who) {
	return G.deck[who]
}

function get_discard(who) {
	return G.discard[who]
}

function get_removed(who) {
	return G.removed[who]
}

function get_dummy(who) {
	return (who === RUSSIA) ? C_DUMMY_RU : C_DUMMY_FR
}

/* AREAS */
function get_area_name(a) {
	return areas[a].name
}

function get_area_type(a) {
	return areas[a].type
}

function is_fortress_town(a) {
	return areas[a].fortress
}

function get_area_nation(a) { //If it is exclusive to one side
	return areas[a].nation
}

function is_depot_town(a) {
	return areas[a].depot
}

function get_area_vp(a) {
	return areas[a].vp
}

function is_vp_area(a) {
	return get_area_vp(a) > 0
}

function get_adjacent_areas_by_track(a) {
	return areas[a].track
}

function get_adjacent_areas_by_road(a) {
	return areas[a].road
}

function is_key_city(a) {
	return get_area_type(a) === "key_city"
}

function is_off_map_area(a) {
	return get_area_type(a) === "off_map"
}

//Nations may not enter off-map areas belonging to the opposing side
function can_enter_area(who, a) {
	return (get_area_nation(a) === null) || (get_area_nation(a) === who)
}

function is_french_off_map_area(a) {
	return is_off_map_area(a) && can_enter_area(FRANCE, a)
}

function is_fr_controlled(a) {
	if (is_french_off_map_area(a)) return true
	return has_troop(a) && has_friendly_troop(FRANCE, a) && !has_friendly_troop(RUSSIA, a)
}

function is_ru_controlled(a) {
	return !is_fr_controlled(a)
}

function is_friendly_controlled(who, area) {
	return (who === RUSSIA && is_ru_controlled(area)) || (who === FRANCE && is_fr_controlled(area))
}

function get_all_adjacent_areas(area) {
	return [...get_all_adjacent_areas_of_connection_type(area, TRACK), ...get_all_adjacent_areas_of_connection_type(area, ROAD)]
}

/* LEADERS */
function get_leader_faction(leader) {
	return leaders[leader].faction
}

function get_leader_seniority(leader) {
	return leaders[leader].seniority
}

function get_leader_vp(leader) {
	return leaders[leader].vp
}

function get_leader_short_name(leader) {
	return leaders[leader].short_name
}

function get_first_leader(who) {
	return (who === RUSSIA) ? first_russia_leader : first_france_leader
}

function get_last_leader(who) {
	return (who === RUSSIA) ? last_russia_leader : last_france_leader
}

function get_leader_location(leader) {
	return G.leaders[leader]
}

function is_leader_on_map(leader) {
	return (get_leader_location(leader) !== POOL) && (get_leader_location(leader) !== OUT_OF_PLAY)
}

function move_leader(who, where) {
	G.leaders[who] = where
}

function get_seniormost_leader(who, area) {
	for (let leader of G.seniority[who]) {
		if (get_leader_location(leader) === area) {
			return leader
		}
	}
	return -1
}

function get_areas_with_leaders(who) {
	let areas = []
	for (let leader = get_first_leader(who); leader <= get_last_leader(who); ++leader) {
		let location = get_leader_location(leader)
		if (location !== POOL && location !== OUT_OF_PLAY && !set_has(areas, location))
			set_add(areas, location)
	}
	return areas
}

function is_seniormost_leader(leader, area) {
	return get_seniormost_leader(get_leader_faction(leader), area) === leader
}

function get_leaders_at_area(side, area) {
	let leaders = []
	for (let leader = get_first_leader(side); leader <= get_last_leader(side); ++leader) {
		if (get_leader_location(leader) === area)  {
			set_add(leaders, leader)
		}
	}
	return leaders
}

function has_friendly_leader(who, space) {
	return G.leaders.slice(get_first_leader(who), get_last_leader(who) + 1).some(loc => loc === space)
}

function get_seniormost_leader_from_list(who, list) {
	return G.seniority[who].find(leader => list.includes(leader))
}

/* ORDERS */
function get_order_owner(order) {
	return orders[order].owner
}

function get_order_type(order) {
	return orders[order].type
}

function get_first_order(who) {
	return (who === RUSSIA) ? first_russia_order : first_france_order
}

function get_last_order(who) {
	return (who === RUSSIA) ? last_russia_order : last_france_order
}

function get_order_name(order) {
	return get_order_type_name(get_order_type(order))
}

function get_order_type_name(type) {
	switch(type) {
	case FORCED_MARCH: return "Forced March"
	case CAVALRY_PATROLS: return "Cavalry Patrols"
	case MARCH: return "March"
	case EVADE: return "Evade"
	case DEFEND: return "Defend"
	case RALLY: return "Rally"
	case COSSACK_RAID: return "Cossack Raid"
	case PLACE_DEPOT: return "Place Depot"
	case FORAGE: return "Forage"
	case DUMMY_ORDER: return "Dummy"
	default: return type
	}
}

function has_order_of_type(who, type, area) {
	return get_orders_at_area(who, area).some(order => get_order_type(order) === type)
}

function has_order_of_switchable_type(who, current_type, area) {
	for (let type = FORAGE; type > current_type; --type) {
		if (has_order_of_type(who, type, area)) return true
	}
	return false
}

function has_switchable_order_in_pool(who, type) {
	return has_order_of_switchable_type(who, type, POOL)
}

function has_non_dummy_order_at_area(who, area) {
	return get_orders_at_area(who, area).some(order => get_order_type(order) !== DUMMY_ORDER)
}

/* TROOPS */
/*
	G.sps is a plain array map, using the map functions from the framework.
	Each key in the 'map' corresponds to an area id where there are troops present. Areas with no troops will be culled.
	Each value in the 'map' is a 'set', using the set functions in the framework.

	Each set is a sorted plain array of bitpacked troop data.

	Each bitpacked entry follows the following format: (NOTE: For programming simplicity, I've fudged the Prussian and Austrian SPs as separate 'types' of troops, not separate nationalities.)
		Player owner		1 bit 		Uses player mnemonics RUSSIA and FRANCE.
		Type 				4 bits 		Corresponds to the 12 (8 type + 4 allies) constants defined in the "Troops" section of constants
		Number of troops		6 bits  		Safe estimate of max. troops of a specific nationality and type in an area.
*/
const TROOP_ENTRY_WHO_SHIFT = 10
const TROOP_ENTRY_TYPE_SHIFT = 6
// eslint-disable-next-line no-unused-vars
const TROOP_ENTRY_NUM_SHIFT = 0

const TROOP_ENTRY_WHO_MASK = 1024
const TROOP_ENTRY_TYPE_MASK = 960
const TROOP_ENTRY_NUM_MASK = 63

function init_troop_entry(area) {
	map_set(G.sps, area, [])
}

function delete_troop_entry(area) {
	map_delete(G.sps, area)
}

function decode_troop_entry_who(entry) {
	return (entry & TROOP_ENTRY_WHO_MASK) >> TROOP_ENTRY_WHO_SHIFT
}

function decode_troop_entry_type(entry) {
	return (entry & TROOP_ENTRY_TYPE_MASK) >> TROOP_ENTRY_TYPE_SHIFT
}

function decode_troop_entry_num(entry) {
	return entry & TROOP_ENTRY_NUM_MASK
}

function get_troop_entry(who, area, type, fallback) {
	return get_area_troop_set(area, fallback)?.find(entry => (decode_troop_entry_who(entry) === who) && (decode_troop_entry_type(entry) === type)) ?? fallback
}

function has_troop(area) {
	return map_has(G.sps, area)
}

function get_area_troop_set(area, fallback = null) {
	return map_get(G.sps, area, fallback)
}

function construct_troop_entry(who, type, num) {
	let entry = 0
	entry += who << TROOP_ENTRY_WHO_SHIFT
	entry += type << TROOP_ENTRY_TYPE_SHIFT
	entry += num
	return entry
}

function has_friendly_troop(who, area) {
	if (!has_troop(area)) return false
	for (let entry of get_area_troop_set(area))
		if (decode_troop_entry_who(entry) === who) return true
	return false
}

function get_troop_types_at_area(who, area) {
	let types = []
	for (let entry of get_area_troop_set(area, [])) {
		let owner = decode_troop_entry_who(entry)
		if (who === owner) {
			let type = decode_troop_entry_type(entry)
			if (!set_has(types, type)) { set_add(types, type) }
		}
	}
	return types
}

function is_troop_type_exhausted(type) {
	return !!(type & 1)
}

function is_troop_type_fresh(type) {
	return !is_troop_type_exhausted(type)
}

function has_troop_in_area(who, area) {
	return get_area_troop_set(area, null)?.some(entry => decode_troop_entry_who(entry) === who) ?? false
}

function has_exhausted_sp(who, area) {
	return get_area_troop_set(area, undefined)?.some(entry => (decode_troop_entry_who(entry) === who) && (is_troop_type_exhausted(decode_troop_entry_type(entry))))
}

function get_troop_type_name(type) {
	switch(type) {
	case FRESH_INFANTRY: return "Infantry"
	case EXHAUSTED_INFANTRY: return "Exh. Infantry"
	case FRESH_CAVALRY: return "Cavalry"
	case EXHAUSTED_CAVALRY: return "Exh. Cavalry"
	case FRESH_COSSACK: return "Cossack"
	case EXHAUSTED_COSSACK: return "Exh. Cossack"
	case FRESH_GUARD: return "Guard"
	case EXHAUSTED_GUARD: return "Exh. Guard"
	case FRESH_PRUSSIAN_INFANTRY: return "Pr. Infantry"
	case EXHAUSTED_PRUSSIAN_INFANTRY: return "Exh. Pr. Infantry"
	case FRESH_AUSTRIAN_INFANTRY: return "Au. Infantry"
	case EXHAUSTED_AUSTRIAN_INFANTRY: return "Exh. Au. Infantry"
	default:
		return "unknown"
	}
}

function is_fresh_infantry(troop_type) {
	return is_infantry(troop_type) && is_troop_type_fresh(troop_type)
}

function is_fresh_cavalry(troop_type) {
	return troop_type === FRESH_CAVALRY
}

function has_french_sp(area) {
	return get_area_troop_set(area)?.some(entry => (decode_troop_entry_who(entry) === FRANCE) && (decode_troop_entry_type(entry) < FRESH_PRUSSIAN_INFANTRY)) ?? false
}

function has_prussian_sp(area) {
	return get_area_troop_set(area).some(entry => (decode_troop_entry_type(entry) === FRESH_PRUSSIAN_INFANTRY) || (decode_troop_entry_type(entry) === EXHAUSTED_PRUSSIAN_INFANTRY))
}

function has_austrian_sp(area) {
	return get_area_troop_set(area).some(entry => (decode_troop_entry_type(entry) === FRESH_AUSTRIAN_INFANTRY) || (decode_troop_entry_type(entry) === EXHAUSTED_AUSTRIAN_INFANTRY))
}

function count_num_sps(who, area) {
	if (!has_troop(area)) return 0

	let count = 0
	for (let entry of get_area_troop_set(area, null))
		if (decode_troop_entry_who(entry) === who)
			count += decode_troop_entry_num(entry)
	return count
}

function find_areas_with_most_ru_sps() {
	let area_with_most_sps = []
	let count = 0
	map_for_each_key(G.sps, (area) => {
		if (has_russian_sp(area) && (count_num_sps(RUSSIA, area) > count)) {
			set_add(area_with_most_sps, area)
			count = count_num_sps(RUSSIA, area)
			let entries_to_delete = area_with_most_sps.filter(s => count_num_sps(RUSSIA, s) < count)
			for (let s of entries_to_delete) { set_delete(area_with_most_sps, s) }
		}
	})
	return area_with_most_sps
}

function is_infantry(troop_type) {
	return set_has([FRESH_INFANTRY, EXHAUSTED_INFANTRY, FRESH_PRUSSIAN_INFANTRY, EXHAUSTED_PRUSSIAN_INFANTRY, FRESH_AUSTRIAN_INFANTRY, EXHAUSTED_AUSTRIAN_INFANTRY], troop_type)
}

function is_cavalry(troop_type) {
	return (troop_type === FRESH_CAVALRY) || (troop_type === EXHAUSTED_CAVALRY)
}

function is_cossack(troop_type) {
	return (troop_type === FRESH_COSSACK) || (troop_type === EXHAUSTED_COSSACK)
}

function has_russian_sp(area) {
	return has_friendly_troop(RUSSIA, area)
}

function get_troop_list_by_type(who, area) {
	let list = Array(NUM_TROOP_TYPES).fill(0)
	if (!has_friendly_troop(who, area)) return list

	for (let entry of get_area_troop_set(area)) {
		if (decode_troop_entry_who(entry) === who) {
			let type = decode_troop_entry_type(entry)
			let num = decode_troop_entry_num(entry)
			list[type] = num
		}
	}

	return list
}

function has_sp_of_type(who, type, area) {
	if (!has_troop(area)) return false
	return get_area_troop_set(area).some(entry => {
		return decode_troop_entry_who(entry) === who
		&& decode_troop_entry_type(entry) === type
	})
}

function get_move_strength(move_type) {
	if (move_type === FORCED_MARCH)
		return HALF_STRENGTH
	return FULL_STRENGTH
}

/* TIME */
function get_month(turn) {
	return Math.ceil(turn / 6)
}

function is_resource_turn(turn) {
	return (turn % 6 === 1)
}

function get_turn_name(turn) {
	if (turn % 6 === 0) { return "5" }
	if (is_resource_turn(turn)) { return "R" }
	return `${(turn % 6 - 1)}`
}

function get_month_name(turn) {
	switch(get_month(turn)) {
	case JUNE: return "June"
	case JULY: return "July"
	case AUG: return "August"
	case SEPT: return "September"
	case OCT: return "October"
	case NOV: return "November"
	default: return get_month(turn)
	}
}

function get_season(turn) {
	return (get_month(turn) >= OCT) ? WINTER : SUMMER
}

function get_current_turn() {
	return G.turn
}

function get_current_month() {
	return get_month(G.turn)
}

function get_current_season() {
	return get_season(G.turn)
}

function shift_initiative(in_favor_of, amount = 1) {
	while(amount > 0) {
		if (in_favor_of === RUSSIA) {
			if (G.initiative > -4) {G.initiative--}
			if (G.initiative === 0) {G.initiative--} //no zero
		} else {
			if (G.initiative < 4) {G.initiative++}
			if (G.initiative === 0) {G.initiative++} //no zero
		}
		--amount
	}
	log(`Initiative to ${ROLES[get_who_has_initiative()]} ${get_current_initiative_level()}.`)
}

function get_who_has_initiative() {
	return (G.initiative > 0) ? FRANCE : RUSSIA
}

/* DEPOTS */
function get_first_depot(who) {
	return (who === RUSSIA) ? first_russia_depot : first_france_depot
}

function get_last_depot(who) {
	return (who === RUSSIA) ? last_russia_depot : last_france_depot
}

function get_depots(who) {
	return G.depots.slice(get_first_depot(who), get_last_depot(who) + 1)
}

function get_depot_location(id) {
	return G.depots[id]
}

function move_depot(id, where) {
	G.depots[id] = where
}

function remove_depot(id, where) {
	G.depots[id] = POOL
	log(`Removed depot at ${format_area(where)}.`)
	let who = id <= last_russia_depot ? RUSSIA : FRANCE
	update_supply(who)
}

function find_depot_at_location(who, area) {
	for (let depot = get_first_depot(who); depot <= get_last_depot(who); ++depot) {
		if (get_depot_location(depot) === area) return depot
	}
	return -1
}

function add_depot(who, where) {
	for (let depot = get_first_depot(who); depot <= get_last_depot(who); ++depot) {
		if (get_depot_location(depot) === POOL) {
			move_depot(depot, where)
			return
		}
	}
}

function is_depot_on_map(depot) {
	return (get_depot_location(depot) !== POOL) && (get_depot_location(depot) !== OUT_OF_PLAY)
}

function has_depot_on_map(who) {
	for (let depot = get_first_depot(who); depot <= get_last_depot(who); ++depot)
		if (is_depot_on_map(depot)) return true
	return false
}

function get_areas_with_depots(who) {
	let areas = []

	for (let depot = get_first_depot(who); depot <= get_last_depot(who); ++depot)
		if (is_depot_on_map(depot))
			set_add(areas, get_depot_location(depot))

	return areas
}

function count_num_french_depots_on_map() {
	return array_count(get_depots(FRANCE), area => !((area === POOL) || (area === OUT_OF_PLAY)))
}

function get_all_unoccupied_depots(who) {
	let unoccupied_depots = []
	for (let area of get_areas_with_depots(who)) {
		if (!has_troop_in_area(FRANCE, area)) {
			set_add(unoccupied_depots, area)
		}
	}
	return unoccupied_depots
}

function has_enemy_depot(who, area) {
	return get_depots(enemy(who)).some(a => (a === area))
}

/* DEVASTATION */
function set_devastation(where, level) {
	map_set(G.devastation, where, level)
}

function get_devastation(area) {
	if (!map_has(G.devastation, area))
		return 0
	return map_get(G.devastation, area)
}

function increase_devastation(area, amount = 1) {
	map_set(G.devastation, area, Math.min(3, get_devastation(area) + amount))
}

function get_areas_with_devastation() {
	let areas = []
	for (let area = FIRST_AREA; area <= LAST_AREA; ++area) {
		if (get_devastation(area) > 0) {
			set_add(areas, area)
		}
	}
	return areas
}

function get_devastated_areas_with_french_troops() {
	return get_areas_with_devastation().filter(area => has_troop_in_area(FRANCE, area))
}

function find_connection(a, b) {
	return data.connections.findIndex(conn => (set_has(conn, a) && set_has(conn, b)))
}

/* OPTIONAL RULES */
function is_no_unsuccessful_disengagement() {
	return G.options.no_unsuccessful_disengagement
}

function is_superior_staff_officers() {
	return G.options.superior_staff
}

function is_russian_disorganization_and_confusion() {
	return G.options.russian_confusion
}

// === STATE-MANIPULATING FUNCTIONS ===
/* VP */
function sudden_death() {
	if (G.vp >= 20) {
		log_h1("Sudden Death")
		finish(FRANCE, `Sudden Death: France won with ${Math.abs(G.vp)} VP.`)
		return true
	} else if (G.vp <= -20) {
		log_h1("Sudden Death")
		finish(RUSSIA, `Sudden Death: Russia won with ${Math.abs(G.vp)} VP.`)
		return true
	}
	return false
}

function increase_vp(who, amount = 1) {
	log(`${ROLES[who]} +${amount} VP.`)
	if (who === RUSSIA)
		G.vp -= amount
	else
		G.vp += amount
}

function decrease_vp(who, amount = 1) {
	log(`${ROLES[who]} -${amount} VP.`)
	if (who === RUSSIA)
		G.vp += amount
	else
		G.vp -= amount
}

/* CARDS */
function add_to_hand(who, card) {
	set_add(get_hand(who), card)
}

function remove_card_from_hand(who, card) {
	set_delete(get_hand(who), card)
}

function draw_card(who) {
	let drawn_card = get_deck(who).pop()
	add_to_hand(who, drawn_card)
	log(`${ROLES[who]} drew a card.`)
	return drawn_card
}

function discard_card(c) {
	let who = get_card_owner(c)
	remove_card_from_hand(who, c)
	set_add(get_discard(who), c)
}

function remove_card(c) {
	let who = get_card_owner(c)
	remove_card_from_hand(who, c)
	set_add(get_removed(who), c)
}

function discard_or_remove_card(c) {
	is_permanent_removal_card(c) ? remove_card(c) : discard_card(c)
}

function return_dummy_to_hand(who) {
	add_to_hand(who, get_dummy(who))
}

function has_card_in_hand(who) {
	return get_non_dummy_cards_in_hand(who).length > 0
}

/* TROOPS */
//Sets the number of troops at a given area to a specific number.
function set_troop(who, area, type, num) {
	if (!has_troop(area)) init_troop_entry(area)

	let entry = get_troop_entry(who, area, type, -1)
	if (entry > -1)
		set_delete(get_area_troop_set(area), entry)

	set_add(get_area_troop_set(area, null), construct_troop_entry(who, type, num))
}

//Adds X troops of a specific type to a given area.
function add_troop(who, area, type, num) {
	if (!has_troop(area)) init_troop_entry(area)

	let entry = get_troop_entry(who, area, type, null)
	if (entry !== null)
		set_troop(who, area, type, decode_troop_entry_num(entry) + num)
	else
		set_troop(who, area, type, num)
}

function remove_troop(who, area, type, num) {
	let entry = get_troop_entry(who, area, type, null)
	if (entry !== null) {
		let remaining_troop_count = decode_troop_entry_num(entry)
		if (remaining_troop_count < num) {
			throw new Error(`Need to remove ${num} ${ROLES[who]} ${get_troop_type_name(type)} at ${get_area_name(area)}. Only ${remaining_troop_count} found.`)
		}

		set_delete(get_area_troop_set(area), entry)
		if (remaining_troop_count !== num) {
			set_troop(who, area, type, remaining_troop_count - num)
		}

		if (get_area_troop_set(area).length === 0 || get_area_troop_set(area).every(val => decode_troop_entry_num(val) === 0)) {
			delete_troop_entry(area)
		}
	}
}

function move_troop(who, from, to, type, num) {
	remove_troop(who, from, type, num)
	add_troop(who, to, type, num)
}

function rally_troop(who, area, type, num = 1) {
	remove_troop(who, area, type, num)
	add_troop(who, area, type - 1, num)
}

/* ORDERS */
function place_order(id, location) {
	G.orders[id] = location
	add_to_orders_by_type(id)
}

function add_order_of_type_from_pool(who, type, where) {
	let id = get_orders_at_area(who, POOL).find(order => get_order_type(order) === type)
	place_order(id, where)
	return id
}

// === VIEW ===
function is_observer(role) {
	return role !== RUSSIA && role !== FRANCE
}

function filter_log(log, player) {
	if (Array.isArray(log)) {
		log = log.map(entry => {
			if (entry.startsWith("HR") && (player !== RUSSIA))
				return "HR"
			else if (entry.startsWith("HF") && (player !== FRANCE))
				return "HF"
			else if (entry.startsWith("EF") && (player === FRANCE))
				return "HR"
			else if (entry.startsWith("ER") && (player === RUSSIA))
				return "HF"
			return entry
		})
	}
	return log
}

function filter_leaders(leaders, player) {
	let filtered_leaders = leaders.slice()
	for (let leader = 0; leader < leaders.length; ++leader) {
		if (get_leader_faction(leader) !== player && is_leader_on_map(leader) && !is_seniormost_leader(leader, get_leader_location(leader)))
			filtered_leaders[leader] = HIDDEN
	}
	return filtered_leaders
}

// Needs more cleanup, especially for the observer view.
function on_view() {
	// Global stuff
	// G.turn will be undefined before the 'main' script is called.
	V.initiative = G.initiative
	V.seniority = G.seniority
	V.vp = G.vp
	V.turn = (G.turn === undefined) ? G.start_turn : G.turn
	V.end_turn = G.end_turn
	V.played_cards = G.played_cards ?? [[], []]
	V.attrition_checked = G.attrition_checked
	V.removed = G.removed
	V.set_aside = G.set_aside
	V.depots = G.depots
	V.devastation = G.devastation

	// Only pass each players' cards
	V.current_hand = G.hand[R] ?? []
	V.current_discard = G.discard[R] ?? []
	V.committed_cards = G.committed_cards[R] ?? []
	V.hand_length = [G.hand[RUSSIA].length, G.hand[FRANCE].length]
	V.num_enemy_committed_cards = G.committed_cards[enemy(R)]?.length ?? 0

	// Only pass orders' identities if the role matches the player.
	V.orders = G.orders.slice(get_first_order(R), get_last_order(R) + 1) ?? []
	V.enemy_orders = []
	if (!is_observer(R)) {
		for (let order = get_first_order(enemy(R)); order <= get_last_order(enemy(R)); ++order) {
			if (get_order_location(order) !== POOL)
				V.enemy_orders.push(get_order_location(order))
		}
	}
	V.selected_orders = G.selected_orders?.[R] ?? []

	// Stuff that needs to be filtered based on role
	V.log = filter_log(V.log, R)
	V.leaders = filter_leaders(G.leaders, R)
	// TODO: Filter these based on role
	V.sps = G.sps
	V.battles = G.battles
	V.moved = G.moved
	V.move = G.move
}

// === FRAMEWORK EXTENSIONS ===
/*
	1812 contains many simultaneous steps, which need to be sequenced into multi-active states.
	For instance, must-play events are executed immediately as they are drawn (within the draw_card_to_hand state).

	To keep the program clearer, I have defined some of these states as a smaller state machine within the global RTT framework.

	'States' are enumerated in a states table within the current multi-active state.
	The overall structure of each 'local' state is fairly similar to a normal RTT state. All prompt and action handlers use a 'on_' prefix for clarity.
	An action to the (multi-active) state is routed to the action handler corresponding to the player's current local state.

	Example:
		P.my_multi_active_state = {
			_begin() {
				L.state = ["state1", "state1"]
			},
			states: {
				state1 : {
					on_begin() { ... },
					on_prompt() { ... },
					on_area(area) { ... },
				}
			},
			prompt()	{ this.states[L.state[R]].on_prompt() }
			area(area) 	{ this.states[L.state[R]].on_area(area) }
		}

	L.state needs to be defined as an array of length 2 for the following functions to work.
*/

/* COMMON EXTENSIONS */

// Loosely mimics the goto function of the global RTT framework.
// The standard state transition used in most multi-active states.
// Calls on_end() if present on the state that is ending (similar to _end() in the global framework).
// Calls on_begin() if present on the next state (similar to _begin() in the global framework).
function goto_local_state(player, state) {
	try {
		P[L.P]?.states?.[L.state[player]]?.on_end?.()
		L.state[player] = state
		P[L.P]?.states?.[state]?.on_begin?.()
	} catch(x) {
		console.error(x)
	}
}

// Enumerate local 'states' in order of execution.
// Each local 'state' has an eligible(player) method, which evaluates to whether the player can perform the state's action.
// See select_orders for an example.
function advance_local_state(player) {
	let states = P[L.P].states
	let keys = Object.keys(states)
	let current_state = keys.indexOf(L.state[player])

	try {
		for (let i = current_state + 1; i < keys.length; ++i) {
			if (states[keys[i]].eligible(player)) {
				goto_local_state(player, keys[i])
				return
			}
		}
	} catch(x) {
		console.error(x)
	}
}

// Loosely mimics end() in the global framework.
// End the player's time in the current local state.
// Calls a common finish_state() helper, if present, in the common multi-active state.
// finish_state contains final cleanup steps that must happen as one side leaves the state.
function end_local_state(player) {
	try {
		P[L.P]?.states?.[L.state[player]]?.on_end?.()
		P[L.P]?.finish_state?.()
	} catch(x) {
		console.error(x)
	}
}

// Requires L.undo to be defined!
// Pushes the player's last action to their personal undo stack.
// Each 'label' requires separate handling in the (multi-active) state's undo method to reconstruct the previous state.
function push_local_undo(player, label, info) {
	if (info !== undefined)
		L.undo[player].push({ state: L.state[player], action: label, info })
	else
		L.undo[player].push({ state: L.state[player], action: label })
}

// === SCENARIOS & SETUP ===
const THE_EAGLES_MARCH_ON_SMOLENSK = "The Eagles' March on Smolensk"
const THE_EAGLES_MARCH_ON_MOSCOW = "The Eagles' March on Moscow"
const THE_GRAND_CAMPAIGN = "The Grand Campaign"
const HOLLOW_VICTORIES = "Hollow Victories"
const BATTLE_OF_SMOLENSK_CAMPAIGN_START = "Battle of Smolensk Campaign Start"
const THE_RETREAT_OF_THE_GRANDE_ARMEE = "The Retreat of the Grande Armée"

const SCENARIOS = [
	THE_EAGLES_MARCH_ON_SMOLENSK,
	THE_EAGLES_MARCH_ON_MOSCOW,
	THE_GRAND_CAMPAIGN,
	HOLLOW_VICTORIES,
	BATTLE_OF_SMOLENSK_CAMPAIGN_START,
	THE_RETREAT_OF_THE_GRANDE_ARMEE,
]

exports.default_scenario = THE_GRAND_CAMPAIGN

function on_setup(scenario, options) {
	// Most scenario-specific data is precalculated in tools/gendata.js
	const SCENARIO_DATA = data.scenarios.find(sc => sc.name === scenario)

	log_h1(scenario, NONE)

	// Start and end turns
	// The main state iterates between these two values.
	G.scenario = scenario
	G.start_turn = SCENARIO_DATA.start
	G.end_turn = SCENARIO_DATA.end

	// Optional rules
	G.options = object_copy(options)

	// VP and Initiative
	G.vp = SCENARIO_DATA.vp
	G.initiative = SCENARIO_DATA.initiative

	// Different sets of cards
	G.deck = SCENARIO_DATA.deck.map(cards => cards.slice())
	G.removed = SCENARIO_DATA.removed.map(cards => cards.slice())
	G.set_aside = SCENARIO_DATA.set_aside.map(cards => cards.slice())
	G.discard = [[], []]
	G.hand = [[C_DUMMY_RU, ...SCENARIO_DATA.cards_in_hand[RUSSIA]], [C_DUMMY_FR, ...SCENARIO_DATA.cards_in_hand[FRANCE]]]

	// Holds the locations of each leader
	G.leaders = new Array(NUM_LEADERS).fill(POOL)
	// Holds the location of each depot
	G.depots = new Array(NUM_DEPOTS_RU + NUM_DEPOTS_FR).fill(POOL)
	// Organized as a plain array map keyed by area. Areas with zero devastation are not stored.
	G.devastation = []

	// Cards on the table that will be showed to all roles
	G.played_cards = [[], []]
	// Roles that are not the player will see the number, but not the identity of committed cards.
	G.committed_cards = [[], []]
	G.persistent_events = []

	G.orders = [null, ...(new Array(NUM_ORDERS).fill(POOL))]
	G.orders_by_type = Array.from({ length: NUM_ORDER_TYPES }, () => [[], []])
	G.selected_orders = [[], []]

	// Holds the true value of SPs, organized by nationality, type, and amount of SPs.
	// Organized as a plain array map -- see description above.
	G.sps = []

	// Leaders, SPs and other information necessary to conduct a movement of forces.
	// 'Move' is defined loosely here, and is used for Forced March, March, Evade, and Retreat -- with different structures.
	G.move = {}

	// Both G.moved.leaders and G.moved.sps are maps using the map functions in the framework.
	// G.moved.leaders is keyed by the leader's id and holds the area from which he entered his destination (for client population purposes).
	// G.moved.sps is keyed by area and holds a set of bitpacked entries representing the forces in that area that have previously moved.
	G.moved = {
		leaders: [],
		sps: []
	}

	// Organized as a plain array map keyed by area.
	// Stores information necessary to conduct a battle.
	G.battles = []

	// [TODO]
	// Organized as a plain array map keyed by area.
	// In each area, roles that are not the player are only allowed to see the topmost SP in the stack.
	// Since SPs are sorted on type, we pick a random SP type to be the topmost SP in the stack.
	G.visible_sp_type = []

	//To track who commands who (particularly in cases where both leaders have the same seniority)
	G.seniority = [
		[L_ALEXANDER, L_KUTUZOV, L_DE_TOLLY, L_BAGRATION, L_TORMASOV, L_WITTGENSTEIN, L_CHICHAGOV, L_PLATOV],
		[L_NAPOLEON, L_JEROME, L_DE_BEAUHARNAIS, L_DAVOUT, L_MURAT, L_SCHWARZENBERG]
	]
	G.abilities_used = 0

	G.attrition_checked = []

	G.has_france_occupied_moscow = false
	if (scenario === THE_RETREAT_OF_THE_GRANDE_ARMEE)
		G.has_france_occupied_moscow = true

	update_supply()

	G.platov_order = -1
	G.superior_staff_officers_order = -1

	log_h5("Special Rules")
	if ([THE_EAGLES_MARCH_ON_SMOLENSK, THE_EAGLES_MARCH_ON_MOSCOW, THE_GRAND_CAMPAIGN].includes(scenario))
		log(`French Logistic Preparations.`)

	if ([THE_GRAND_CAMPAIGN, BATTLE_OF_SMOLENSK_CAMPAIGN_START, THE_RETREAT_OF_THE_GRANDE_ARMEE].includes(scenario))
		log(`Winter.`)
	log()

	if (is_no_unsuccessful_disengagement() || is_superior_staff_officers() || is_russian_disorganization_and_confusion())
		log_h5("Optional Rules")

	if (
		is_no_unsuccessful_disengagement()
		&& G.start_turn === JUNE_5
	) {
		array_delete_item(get_deck(FRANCE), C_UNSUCCESSFUL_DISENGAGEMENT)
		set_add(get_discard(FRANCE), C_UNSUCCESSFUL_DISENGAGEMENT)
		log(`Less Luck of the Draw.`)
	}

	if (is_superior_staff_officers())
		log(`Superior Staff Officers.`)

	if (
		is_russian_disorganization_and_confusion()
		&& scenario !== THE_RETREAT_OF_THE_GRANDE_ARMEE
	) {
		add_order_of_type_from_pool(RUSSIA, RALLY, OUT_OF_PLAY)
		log(`Russian Disorganization & Confusion.`)
	}

	switch(get_month(G.start_turn)) {
	case JUNE: setup_june(); break
	case JULY: setup_july(); break
	case AUG: setup_aug(); break
	case OCT: setup_oct(); break
	}

	G.active = [RUSSIA, FRANCE]
	call("setup_hand", {scenario, hand_size: SCENARIO_DATA.hand_size.slice()})
}

function update_supply(player) {
	if (player === undefined)
		G.supply = [calculate_distance_to_nearest_depot(RUSSIA), calculate_distance_to_nearest_depot(FRANCE)]
	else
		G.supply[player] = calculate_distance_to_nearest_depot(player)
}

function setup_june() {
	log_h1("June Setup", SUMMER)
	/* RUSSIA */
	set_troop(RUSSIA, S_RIGA, FRESH_INFANTRY, 2)
	set_troop(RUSSIA, S_DUNABURG, FRESH_INFANTRY, 1)
	add_depot(RUSSIA, S_DUNABURG)
	move_leader(L_WITTGENSTEIN, S_KALTINENAI)
	set_troop(RUSSIA, S_KALTINENAI, FRESH_INFANTRY, 3)
	set_troop(RUSSIA, S_VILKOMIR, FRESH_CAVALRY, 2)
	set_troop(RUSSIA, S_VILKOMIR, FRESH_INFANTRY, 2)
	move_leader(L_ALEXANDER, S_VILNA)
	move_leader(L_DE_TOLLY, S_VILNA)
	set_troop(RUSSIA, S_VILNA, FRESH_INFANTRY, 6)
	add_depot(RUSSIA, S_VILNA)
	set_troop(RUSSIA, S_SVENCIONYS, FRESH_INFANTRY, 3)
	set_troop(RUSSIA, S_MOLODECHNO, FRESH_CAVALRY, 1)
	set_troop(RUSSIA, S_MOLODECHNO, FRESH_INFANTRY, 1)
	add_depot(RUSSIA, S_MINSK)
	set_troop(RUSSIA, S_LIDA, FRESH_CAVALRY, 1)
	set_troop(RUSSIA, S_LIDA, FRESH_INFANTRY, 2)
	move_leader(L_PLATOV, S_GRODNO)
	set_troop(RUSSIA, S_GRODNO, FRESH_COSSACK, 2)
	set_troop(RUSSIA, S_BIALYSTOK, FRESH_CAVALRY, 1)
	move_leader(L_BAGRATION, S_VOLKOVYSK)
	set_troop(RUSSIA, S_VOLKOVYSK, FRESH_INFANTRY, 4)
	set_troop(RUSSIA, S_BREST, FRESH_INFANTRY, 1)
	add_depot(RUSSIA, S_BREST)
	set_troop(RUSSIA, S_KOVEL, FRESH_CAVALRY, 1)
	set_troop(RUSSIA, S_KOVEL, EXHAUSTED_CAVALRY, 1)
	move_leader(L_TORMASOV, S_LUTSK)
	set_troop(RUSSIA, S_LUTSK, FRESH_INFANTRY, 1)
	set_troop(RUSSIA, S_LUTSK, EXHAUSTED_INFANTRY, 1)
	add_depot(RUSSIA, S_LUTSK)
	set_troop(RUSSIA, S_ROVNO, FRESH_INFANTRY, 1)
	set_troop(RUSSIA, S_DUBNO, FRESH_INFANTRY, 1)

	set_troop(RUSSIA, S_TOROPETS, FRESH_INFANTRY, 2)
	set_troop(RUSSIA, S_POLOTSK, FRESH_INFANTRY, 1)
	set_troop(RUSSIA, S_VITEBSK, FRESH_INFANTRY, 1)
	add_depot(RUSSIA, S_VITEBSK)
	add_depot(RUSSIA, S_SMOLENSK)
	set_troop(RUSSIA, S_BORISOV, FRESH_INFANTRY, 1)
	set_troop(RUSSIA, S_MOGILEV, FRESH_INFANTRY, 1)
	add_depot(RUSSIA, S_MOGILEV)
	set_troop(RUSSIA, S_BOBRUYSK, FRESH_INFANTRY, 1)
	set_troop(RUSSIA, S_MOZYR, FRESH_INFANTRY, 1)
	set_troop(RUSSIA, S_KIEV, FRESH_INFANTRY, 1)
	add_depot(RUSSIA, S_KIEV)
	add_depot(RUSSIA, S_ZHITOMIR)

	set_troop(RUSSIA, S_MOSCOW, FRESH_INFANTRY, 1)
	add_depot(RUSSIA, S_MOSCOW)
	add_depot(RUSSIA, S_VYAZMA)
	set_troop(RUSSIA, S_KALUGA, FRESH_INFANTRY, 1)
	add_depot(RUSSIA, S_KALUGA)
	set_troop(RUSSIA, S_OREL, FRESH_INFANTRY, 1)
	add_depot(RUSSIA, S_OREL)
	set_troop(RUSSIA, S_VORONEZH, FRESH_COSSACK, 1)

	/* FRANCE */
	set_troop(FRANCE, S_PRUSSIA_NORTH, FRESH_PRUSSIAN_INFANTRY, 3)
	move_leader(L_NAPOLEON, S_KALVARIJA)
	move_leader(L_MURAT, S_KALVARIJA)
	set_troop(FRANCE, S_KALVARIJA, FRESH_GUARD, 4)
	set_troop(FRANCE, S_KALVARIJA, FRESH_CAVALRY, 5)
	set_troop(FRANCE, S_KALVARIJA, FRESH_INFANTRY, 19)
	move_leader(L_DE_BEAUHARNAIS, S_SUWALKI)
	set_troop(FRANCE, S_SUWALKI, FRESH_CAVALRY, 1)
	set_troop(FRANCE, S_SUWALKI, FRESH_INFANTRY, 7)
	move_leader(L_JEROME, S_SZCZUCZY)
	set_troop(FRANCE, S_SZCZUCZY, FRESH_CAVALRY, 2)
	set_troop(FRANCE, S_SZCZUCZY, FRESH_INFANTRY, 6)
	set_troop(FRANCE, S_SUWALKI, FRESH_CAVALRY, 1)
	set_troop(FRANCE, S_GRAND_DUCHY_OF_WARSAW_NORTH, FRESH_INFANTRY, 2)
	move_leader(L_SCHWARZENBERG, S_GRAND_DUCHY_OF_WARSAW_SOUTH)
	set_troop(FRANCE, S_GRAND_DUCHY_OF_WARSAW_SOUTH, FRESH_AUSTRIAN_INFANTRY, 3)
	set_troop(FRANCE, S_AUSTRIA, FRESH_AUSTRIAN_INFANTRY, 1)

	set_devastation(S_KALVARIJA, 1)
	set_devastation(S_SUWALKI, 1)
	set_devastation(S_SZCZUCZY, 1)
}

function setup_july() {
	log_h1("July Setup", SUMMER)
	/* RUSSIA */
	set_troop(RUSSIA, S_RIGA, FRESH_INFANTRY, 2)
	set_troop(RUSSIA, S_DUNABURG, FRESH_INFANTRY, 1)
	add_depot(RUSSIA, S_DUNABURG)
	move_leader(L_WITTGENSTEIN, S_SEVEZH)
	set_troop(RUSSIA, S_SEVEZH, FRESH_INFANTRY, 2)
	set_troop(RUSSIA, S_SEVEZH, EXHAUSTED_INFANTRY, 1)
	move_leader(L_DE_TOLLY, S_VITEBSK)
	set_troop(RUSSIA, S_VITEBSK, FRESH_INFANTRY, 7)
	set_troop(RUSSIA, S_VITEBSK, FRESH_CAVALRY, 2)
	set_troop(RUSSIA, S_VITEBSK, EXHAUSTED_INFANTRY, 5)
	set_troop(RUSSIA, S_VITEBSK, EXHAUSTED_CAVALRY, 1)
	add_depot(RUSSIA, S_VITEBSK)
	move_leader(L_PLATOV, S_BABINOVICHI)
	set_troop(RUSSIA, S_BABINOVICHI, FRESH_COSSACK, 1)
	set_troop(RUSSIA, S_SMOLENSK, FRESH_INFANTRY, 2)
	add_depot(RUSSIA, S_SMOLENSK)
	set_troop(RUSSIA, S_DUKHOVSHCHINA, FRESH_INFANTRY, 2)
	set_troop(RUSSIA, S_RAGOSTOV, FRESH_INFANTRY, 1)
	set_troop(RUSSIA, S_RAGOSTOV, EXHAUSTED_INFANTRY, 1)
	move_leader(L_BAGRATION, S_UNNAMED_E4)
	set_troop(RUSSIA, S_UNNAMED_E4, FRESH_INFANTRY, 2)
	set_troop(RUSSIA, S_UNNAMED_E4, FRESH_CAVALRY, 1)
	set_troop(RUSSIA, S_UNNAMED_E4, EXHAUSTED_INFANTRY, 1)
	set_troop(RUSSIA, S_MSTISLAVL, FRESH_COSSACK, 1)

	move_leader(L_TORMASOV, S_BREST)
	set_troop(RUSSIA, S_BREST, FRESH_INFANTRY, 1)
	set_troop(RUSSIA, S_BREST, EXHAUSTED_INFANTRY, 1)
	set_troop(RUSSIA, S_VLADIMIR_B6, FRESH_INFANTRY, 1)
	set_troop(RUSSIA, S_KOBRYN, FRESH_CAVALRY, 1)
	set_troop(RUSSIA, S_KOBRYN, EXHAUSTED_CAVALRY, 1)
	add_depot(RUSSIA, S_LUTSK)
	set_troop(RUSSIA, S_PINSK, FRESH_INFANTRY, 1)
	set_troop(RUSSIA, S_MOZYR, FRESH_INFANTRY, 1)
	add_depot(RUSSIA, S_MOZYR)
	add_depot(RUSSIA, S_ZHITOMIR)
	set_troop(RUSSIA, S_KIEV, FRESH_INFANTRY, 2)
	add_depot(RUSSIA, S_KIEV)

	set_troop(RUSSIA, S_MOSCOW, FRESH_INFANTRY, 2)
	add_depot(RUSSIA, S_MOSCOW)
	add_depot(RUSSIA, S_VYAZMA)
	set_troop(RUSSIA, S_KALUGA, FRESH_INFANTRY, 2)
	add_depot(RUSSIA, S_KALUGA)
	set_troop(RUSSIA, S_OREL, FRESH_INFANTRY, 1)
	add_depot(RUSSIA, S_OREL)
	set_troop(RUSSIA, S_VORONEZH, FRESH_COSSACK, 2)

	/* FRANCE */
	set_troop(FRANCE, S_MITAU, FRESH_PRUSSIAN_INFANTRY, 1)
	set_troop(FRANCE, S_UNNAMED_B2, FRESH_PRUSSIAN_INFANTRY, 2)
	set_troop(FRANCE, S_VIDZY, FRESH_INFANTRY, 1)
	set_troop(FRANCE, S_DISNA, FRESH_INFANTRY, 1)
	set_troop(FRANCE, S_POLOTSK, FRESH_INFANTRY, 2)
	set_troop(FRANCE, S_POLOTSK, EXHAUSTED_INFANTRY, 1)
	move_leader(L_NAPOLEON, S_KAMEN)
	move_leader(L_MURAT, S_KAMEN)
	move_leader(L_DE_BEAUHARNAIS, S_KAMEN)
	set_troop(FRANCE, S_KAMEN, FRESH_GUARD, 4)
	set_troop(FRANCE, S_KAMEN, FRESH_CAVALRY, 3)
	set_troop(FRANCE, S_KAMEN, FRESH_INFANTRY, 5)
	set_troop(FRANCE, S_KAMEN, EXHAUSTED_INFANTRY, 4)
	set_troop(FRANCE, S_KAMEN, EXHAUSTED_CAVALRY, 2)
	set_troop(FRANCE, S_KOVNO, FRESH_INFANTRY, 1)
	add_depot(FRANCE, S_KOVNO)
	set_troop(FRANCE, S_VILNA, FRESH_INFANTRY, 1)
	add_depot(FRANCE, S_VILNA)
	set_troop(FRANCE, S_MINSK, FRESH_INFANTRY, 1)
	add_depot(FRANCE, S_MINSK)
	set_troop(FRANCE, S_BORISOV, FRESH_INFANTRY, 3)
	set_troop(FRANCE, S_BORISOV, EXHAUSTED_INFANTRY, 1)
	move_leader(L_DAVOUT, S_MOGILEV)
	set_troop(FRANCE, S_MOGILEV, FRESH_INFANTRY, 2)
	set_troop(FRANCE, S_MOGILEV, EXHAUSTED_INFANTRY, 1)
	set_troop(FRANCE, S_KOKHANOVO, FRESH_INFANTRY, 3)
	set_troop(FRANCE, S_KOKHANOVO, EXHAUSTED_INFANTRY, 1)
	set_troop(FRANCE, S_ORSHA, FRESH_CAVALRY, 1)
	move_leader(L_SCHWARZENBERG, S_NESVICH)
	set_troop(FRANCE, S_NESVICH, FRESH_AUSTRIAN_INFANTRY, 1)
	set_troop(FRANCE, S_NESVICH, EXHAUSTED_AUSTRIAN_INFANTRY, 1)
	set_troop(FRANCE, S_SLUTSK, FRESH_CAVALRY, 1)
	set_troop(FRANCE, S_PRUZHANY, FRESH_INFANTRY, 2)
	set_troop(FRANCE, S_ZAMOSC, FRESH_AUSTRIAN_INFANTRY, 1)
	set_troop(FRANCE, FRENCH_CASUALTIES, FRESH_INFANTRY, 6)
	set_troop(FRANCE, FRENCH_CASUALTIES, FRESH_CAVALRY, 1)

	/* DEVASTATION */
	set_devastation(S_KALVARIJA, 1)
	set_devastation(S_SUWALKI, 1)
	set_devastation(S_GRODNO, 1)
	set_devastation(S_BIALYSTOK, 1)
	set_devastation(S_SZCZUCZY, 1)
	set_devastation(S_MITAU, 1)
	set_devastation(S_SIAULAI, 1)
	set_devastation(S_LIDA, 1)
	set_devastation(S_VOLKOVYSK, 1)
	set_devastation(S_BIELSK, 1)
	set_devastation(S_SLONIM, 1)
	set_devastation(S_BREST, 1)
	set_devastation(S_SALAKAS, 1)
	set_devastation(S_DOKSHITSY, 1)
	set_devastation(S_PLESHCHENITSY, 1)
	set_devastation(S_NOVGRUDOK, 1)
	set_devastation(S_SEVEZH, 1)
	set_devastation(S_KAMEN, 1)
	set_devastation(S_BORISOV, 1)
	set_devastation(S_KOKHANOVO, 1)
	set_devastation(S_BOBRUYSK, 1)
	set_devastation(S_UNNAMED_E4, 1)

	set_devastation(S_VILKOMIR, 2)
	set_devastation(S_VILNA, 2)
	set_devastation(S_VIDZY, 2)
	set_devastation(S_DRISSA, 2)
	set_devastation(S_MOLODECHNO, 2)
	set_devastation(S_NESVICH, 2)
	set_devastation(S_POLOTSK, 2)
	set_devastation(S_MOGILEV, 2)

	set_devastation(S_SVENCIONYS, 3)
}

function setup_aug() {
	log_h1("August Setup", SUMMER)
	/* RUSSIA */
	set_troop(RUSSIA, S_RIGA, FRESH_INFANTRY, 1)
	set_troop(RUSSIA, S_MITAU, FRESH_INFANTRY, 1)
	move_leader(L_WITTGENSTEIN, S_SEVEZH)
	set_troop(RUSSIA, S_SEVEZH, FRESH_INFANTRY, 2)
	set_troop(RUSSIA, S_SEVEZH, EXHAUSTED_INFANTRY, 1)
	move_leader(L_DE_TOLLY, S_SMOLENSK)
	set_troop(RUSSIA, S_SMOLENSK, FRESH_INFANTRY, 8)
	set_troop(RUSSIA, S_SMOLENSK, FRESH_CAVALRY, 2)
	set_troop(RUSSIA, S_SMOLENSK, EXHAUSTED_INFANTRY, 5)
	set_troop(RUSSIA, S_SMOLENSK, EXHAUSTED_CAVALRY, 1)
	add_depot(RUSSIA, S_SMOLENSK)
	move_leader(L_BAGRATION, S_SVERSKOVO)
	set_troop(RUSSIA, S_SVERSKOVO, FRESH_INFANTRY, 3)
	set_troop(RUSSIA, S_SVERSKOVO, FRESH_CAVALRY, 1)
	set_troop(RUSSIA, S_SVERSKOVO, EXHAUSTED_INFANTRY, 2)
	set_troop(RUSSIA, S_ROSLAVL, FRESH_COSSACK, 1)
	move_leader(L_PLATOV, S_DUKHOVSHCHINA)
	set_troop(RUSSIA, S_DUKHOVSHCHINA, FRESH_COSSACK, 2)

	set_troop(RUSSIA, S_MOSCOW, FRESH_INFANTRY, 3)
	add_depot(RUSSIA, S_MOSCOW)
	add_depot(RUSSIA, S_VYAZMA)
	set_troop(RUSSIA, S_KALUGA, FRESH_INFANTRY, 3)
	add_depot(RUSSIA, S_KALUGA)
	set_troop(RUSSIA, S_OREL, FRESH_INFANTRY, 1)
	add_depot(RUSSIA, S_OREL)
	set_troop(RUSSIA, S_VORONEZH, FRESH_COSSACK, 2)

	move_leader(L_TORMASOV, S_KOBRYN)
	set_troop(RUSSIA, S_KOBRYN, FRESH_INFANTRY, 2)
	set_troop(RUSSIA, S_KOBRYN, FRESH_CAVALRY, 2)
	set_troop(RUSSIA, S_KOBRYN, EXHAUSTED_INFANTRY, 1)
	set_troop(RUSSIA, S_PINSK, FRESH_INFANTRY, 1)
	set_troop(RUSSIA, S_LUTSK, FRESH_INFANTRY, 1)
	add_depot(RUSSIA, S_LUTSK)
	set_troop(RUSSIA, S_MOZYR, FRESH_INFANTRY, 1)
	add_depot(RUSSIA, S_MOZYR)
	add_depot(RUSSIA, S_ZHITOMIR)
	set_troop(RUSSIA, S_KIEV, FRESH_INFANTRY, 3)
	add_depot(RUSSIA, S_KIEV)

	/* FRANCE */
	set_troop(FRANCE, S_ECKAU, FRESH_PRUSSIAN_INFANTRY, 1)
	set_troop(FRANCE, S_JAKOBSTADT, FRESH_PRUSSIAN_INFANTRY, 1)
	set_troop(FRANCE, S_JAKOBSTADT, EXHAUSTED_PRUSSIAN_INFANTRY, 1)
	set_troop(FRANCE, S_DUNABURG, FRESH_INFANTRY, 1)
	set_troop(FRANCE, S_DRISSA, FRESH_INFANTRY, 1)
	set_troop(FRANCE, S_POLOTSK, FRESH_INFANTRY, 1)
	set_troop(FRANCE, S_POLOTSK, EXHAUSTED_INFANTRY, 1)
	add_depot(FRANCE, S_POLOTSK)
	move_leader(L_NAPOLEON, S_VITEBSK)
	set_troop(FRANCE, S_VITEBSK, FRESH_GUARD, 3)
	set_troop(FRANCE, S_VITEBSK, FRESH_INFANTRY, 3)
	set_troop(FRANCE, S_VITEBSK, FRESH_CAVALRY, 1)
	set_troop(FRANCE, S_VITEBSK, EXHAUSTED_INFANTRY, 2)
	set_troop(FRANCE, S_VITEBSK, EXHAUSTED_GUARD, 1)
	move_leader(L_DE_BEAUHARNAIS, S_PORECZIE)
	set_troop(FRANCE, S_PORECZIE, FRESH_INFANTRY, 3)
	move_leader(L_MURAT, S_BABINOVICHI)
	move_leader(L_DAVOUT, S_BABINOVICHI)
	set_troop(FRANCE, S_BABINOVICHI, FRESH_INFANTRY, 7)
	set_troop(FRANCE, S_BABINOVICHI, FRESH_CAVALRY, 2)
	set_troop(FRANCE, S_BABINOVICHI, EXHAUSTED_INFANTRY, 3)
	set_troop(FRANCE, S_BABINOVICHI, EXHAUSTED_CAVALRY, 2)
	set_troop(FRANCE, S_KOKHANOVO, FRESH_CAVALRY, 1)
	set_troop(FRANCE, S_MOGILEV, FRESH_INFANTRY, 2)
	set_troop(FRANCE, S_RAGOSTOV, FRESH_CAVALRY, 1)
	set_troop(FRANCE, S_BOBRUYSK, FRESH_INFANTRY, 1)
	set_troop(FRANCE, S_MINSK, FRESH_INFANTRY, 1)
	add_depot(FRANCE, S_MINSK)
	set_troop(FRANCE, S_VILNA, FRESH_INFANTRY, 1)
	add_depot(FRANCE, S_VILNA)
	set_troop(FRANCE, S_KOVNO, FRESH_INFANTRY, 2)
	add_depot(FRANCE, S_KOVNO)
	set_troop(FRANCE, S_MOLODECHNO, FRESH_INFANTRY, 1)
	move_leader(L_SCHWARZENBERG, S_PRUZHANY)
	set_troop(FRANCE, S_PRUZHANY, FRESH_AUSTRIAN_INFANTRY, 2)
	set_troop(FRANCE, S_PRUZHANY, FRESH_INFANTRY, 2)
	set_troop(FRANCE, S_PRUZHANY, EXHAUSTED_AUSTRIAN_INFANTRY, 1)
	set_troop(FRANCE, S_ZAMOSC, FRESH_AUSTRIAN_INFANTRY, 1)
	set_troop(FRANCE, FRENCH_CASUALTIES, FRESH_INFANTRY, 7)
	set_troop(FRANCE, FRENCH_CASUALTIES, FRESH_CAVALRY, 1)

	/* DEVASTATION */
	set_devastation(S_SUWALKI, 1)
	set_devastation(S_KALVARIJA, 1)
	set_devastation(S_GRODNO, 1)
	set_devastation(S_SZCZUCZY, 1)
	set_devastation(S_BIALYSTOK, 1)
	set_devastation(S_MITAU, 1)
	set_devastation(S_SIAULAI, 1)
	set_devastation(S_LIDA, 1)
	set_devastation(S_VOLKOVYSK, 1)
	set_devastation(S_BIELSK, 1)
	set_devastation(S_PRUZHANY, 1)
	set_devastation(S_KOBRYN, 1)
	set_devastation(S_SALAKAS, 1)
	set_devastation(S_DOKSHITSY, 1)
	set_devastation(S_PLESHCHENITSY, 1)
	set_devastation(S_NOVGRUDOK, 1)
	set_devastation(S_KAMEN, 1)
	set_devastation(S_BORISOV, 1)
	set_devastation(S_KOKHANOVO, 1)
	set_devastation(S_BOBRUYSK, 1)
	set_devastation(S_ORSHA, 1)
	set_devastation(S_RAGOSTOV, 1)

	set_devastation(S_VILKOMIR, 2)
	set_devastation(S_VILNA, 2)
	set_devastation(S_SLONIM, 2)
	set_devastation(S_BREST, 2)
	set_devastation(S_VIDZY, 2)
	set_devastation(S_DRISSA, 2)
	set_devastation(S_MOLODECHNO, 2)
	set_devastation(S_NESVICH, 2)
	set_devastation(S_SEVEZH, 2)
	set_devastation(S_POLOTSK, 2)
	set_devastation(S_MOGILEV, 2)
	set_devastation(S_PORECZIE, 2)
	set_devastation(S_VITEBSK, 2)
	set_devastation(S_BABINOVICHI, 2)
	set_devastation(S_UNNAMED_E4, 2)

	set_devastation(S_SVENCIONYS, 3)
}

function setup_oct() {
	log_h1("October Setup", WINTER)
	/* RUSSIA */
	set_troop(RUSSIA, S_RIGA, FRESH_INFANTRY, 2)
	set_troop(RUSSIA, S_DRISSA, FRESH_INFANTRY, 1)
	move_leader(L_WITTGENSTEIN, S_SEVEZH)
	set_troop(RUSSIA, S_SEVEZH, FRESH_INFANTRY, 3)
	set_troop(RUSSIA, S_SEVEZH, EXHAUSTED_INFANTRY, 1)
	set_troop(RUSSIA, S_OSTROV, FRESH_INFANTRY, 1)

	set_troop(RUSSIA, S_BRYANSK, FRESH_COSSACK, 1)
	move_leader(L_PLATOV, S_KOSELYSK)
	set_troop(RUSSIA, S_KOSELYSK, FRESH_COSSACK, 2)
	set_troop(RUSSIA, S_OREL, FRESH_INFANTRY, 1)
	add_depot(RUSSIA, S_OREL)
	set_troop(RUSSIA, S_MALOYAROSLAVET, FRESH_INFANTRY, 1)
	set_troop(RUSSIA, S_MALOYAROSLAVET, FRESH_CAVALRY, 2)
	set_troop(RUSSIA, S_MALOYAROSLAVET, FRESH_COSSACK, 1)
	set_troop(RUSSIA, S_MALOYAROSLAVET, EXHAUSTED_INFANTRY, 1)
	move_leader(L_KUTUZOV, S_KALUGA)
	move_leader(L_TORMASOV, S_KALUGA)
	set_troop(RUSSIA, S_KALUGA, FRESH_INFANTRY, 7)
	set_troop(RUSSIA, S_KALUGA, FRESH_CAVALRY, 1)
	set_troop(RUSSIA, S_KALUGA, FRESH_COSSACK, 1)
	set_troop(RUSSIA, S_KALUGA, EXHAUSTED_INFANTRY, 3)
	set_troop(RUSSIA, S_KALUGA, EXHAUSTED_CAVALRY, 1)
	add_depot(RUSSIA, S_KALUGA)
	set_troop(RUSSIA, S_VLADIMIR_H1, FRESH_COSSACK, 1)
	set_troop(RUSSIA, S_VORONEZH, FRESH_COSSACK, 1)

	set_troop(RUSSIA, S_BREST, FRESH_INFANTRY, 2)
	add_depot(RUSSIA, S_BREST)
	move_leader(L_CHICHAGOV, S_PRUZHANY)
	set_troop(RUSSIA, S_PRUZHANY, FRESH_INFANTRY, 3)
	set_troop(RUSSIA, S_PRUZHANY, FRESH_CAVALRY, 1)
	set_troop(RUSSIA,S_PRUZHANY, EXHAUSTED_INFANTRY, 2)
	set_troop(RUSSIA, S_PRUZHANY, EXHAUSTED_CAVALRY, 1)
	set_troop(RUSSIA, S_KOVEL, FRESH_INFANTRY, 1)
	set_troop(RUSSIA, S_LUTSK, FRESH_INFANTRY, 1)
	add_depot(RUSSIA, S_LUTSK)
	set_troop(RUSSIA, S_MOZYR, FRESH_INFANTRY, 1)
	add_depot(RUSSIA, S_MOZYR)
	set_troop(RUSSIA, S_KIEV, FRESH_INFANTRY, 1)
	add_depot(RUSSIA, S_KIEV)

	move_leader(L_ALEXANDER, POOL)
	move_leader(L_DE_TOLLY, POOL)
	move_leader(L_BAGRATION, POOL)

	/* FRANCE */
	set_troop(FRANCE, S_PRUSSIA_SOUTH, FRESH_INFANTRY, 1)
	set_troop(FRANCE, S_MITAU, FRESH_PRUSSIAN_INFANTRY, 1)
	set_troop(FRANCE, S_KOVNO, FRESH_INFANTRY, 1)
	add_depot(FRANCE, S_KOVNO)
	move_leader(L_SCHWARZENBERG, S_BIALYSTOK)
	set_troop(FRANCE, S_BIALYSTOK, FRESH_AUSTRIAN_INFANTRY, 1)
	set_troop(FRANCE, S_BIALYSTOK, FRESH_INFANTRY, 1)
	set_troop(FRANCE, S_BIALYSTOK, EXHAUSTED_AUSTRIAN_INFANTRY, 1)
	set_troop(FRANCE, S_ZAMOSC, FRESH_AUSTRIAN_INFANTRY, 1)
	set_troop(FRANCE, S_VILNA, FRESH_INFANTRY, 5)
	add_depot(FRANCE, S_VILNA)
	set_troop(FRANCE, S_SVENCIONYS, FRESH_INFANTRY, 1)
	set_troop(FRANCE, S_DUNABURG, FRESH_PRUSSIAN_INFANTRY, 1)
	set_troop(FRANCE, S_DUNABURG, EXHAUSTED_PRUSSIAN_INFANTRY, 1)
	set_troop(FRANCE, S_DOKSHITSY, FRESH_INFANTRY, 1)
	set_troop(FRANCE, S_MINSK, FRESH_INFANTRY, 1)
	set_troop(FRANCE, S_POLOTSK, FRESH_INFANTRY, 2)
	set_troop(FRANCE, S_POLOTSK, EXHAUSTED_INFANTRY, 1)
	add_depot(FRANCE, S_POLOTSK)
	set_troop(FRANCE, S_KAMEN, FRESH_INFANTRY, 1)
	set_troop(FRANCE, S_VITEBSK, EXHAUSTED_INFANTRY, 1)
	set_troop(FRANCE, S_ORSHA, FRESH_INFANTRY, 1)
	set_troop(FRANCE, S_MOGILEV, EXHAUSTED_INFANTRY, 1)
	set_troop(FRANCE, S_RAGOSTOV, FRESH_INFANTRY, 1)
	set_troop(FRANCE, S_SMOLENSK, FRESH_INFANTRY, 4)
	add_depot(FRANCE, S_SMOLENSK)
	add_depot(FRANCE, S_DOROGOBUZH)
	set_troop(FRANCE, S_VYAZMA, FRESH_INFANTRY, 1)
	set_troop(FRANCE, S_MOZHAYSK, FRESH_INFANTRY, 1)
	move_leader(L_MURAT, S_TARUTINO)
	set_troop(FRANCE, S_TARUTINO, FRESH_INFANTRY, 2)
	set_troop(FRANCE, S_TARUTINO, FRESH_CAVALRY, 1)
	set_troop(FRANCE, S_TARUTINO, EXHAUSTED_INFANTRY, 1)
	set_troop(FRANCE, S_TARUTINO, EXHAUSTED_CAVALRY, 1)
	move_leader(L_NAPOLEON, S_MOSCOW)
	move_leader(L_DAVOUT, S_MOSCOW)
	move_leader(L_DE_BEAUHARNAIS, S_MOSCOW)
	set_troop(FRANCE, S_MOSCOW, FRESH_GUARD, 3)
	set_troop(FRANCE, S_MOSCOW, FRESH_INFANTRY, 4)
	set_troop(FRANCE, S_MOSCOW, EXHAUSTED_GUARD, 1)
	set_troop(FRANCE, S_MOSCOW, EXHAUSTED_INFANTRY, 2)
	add_depot(FRANCE, S_MOSCOW)
	set_troop(FRANCE, FRENCH_CASUALTIES, FRESH_INFANTRY, 16)
	set_troop(FRANCE, FRENCH_CASUALTIES, FRESH_CAVALRY, 6)

	/* DEVASTATION */
	set_devastation(S_SUWALKI, 1)
	set_devastation(S_KALVARIJA, 1)
	set_devastation(S_GRODNO, 1)
	set_devastation(S_SZCZUCZY, 1)
	set_devastation(S_BIALYSTOK, 1)
	set_devastation(S_MITAU, 1)
	set_devastation(S_SIAULAI, 1)
	set_devastation(S_LIDA, 1)
	set_devastation(S_BIELSK, 1)
	set_devastation(S_JAKOBSTADT, 1)
	set_devastation(S_SALAKAS, 1)
	set_devastation(S_DOKSHITSY, 1)
	set_devastation(S_PLESHCHENITSY, 1)
	set_devastation(S_KAMEN, 1)
	set_devastation(S_BORISOV, 1)
	set_devastation(S_KOKHANOVO, 1)
	set_devastation(S_BOBRUYSK, 1)
	set_devastation(S_ORSHA, 1)
	set_devastation(S_RAGOSTOV, 1)
	set_devastation(S_VYAZMA, 1)
	set_devastation(S_MALOYAROSLAVET, 1)

	set_devastation(S_VILKOMIR, 2)
	set_devastation(S_VILNA, 2)
	set_devastation(S_SLONIM, 2)
	set_devastation(S_RATNO, 2)
	set_devastation(S_KOVEL, 2)
	set_devastation(S_DUNABURG, 2)
	set_devastation(S_DRISSA, 2)
	set_devastation(S_VIDZY, 2)
	set_devastation(S_MOLODECHNO, 2)
	set_devastation(S_NESVICH, 2)
	set_devastation(S_UNNAMED_E4, 2)
	set_devastation(S_VITEBSK, 2)
	set_devastation(S_PORECZIE, 2)
	set_devastation(S_BABINOVICHI, 2)
	set_devastation(S_MOGILEV, 2)
	set_devastation(S_DOROGOBUZH, 2)
	set_devastation(S_GZHATSK, 2)
	set_devastation(S_KALUGA, 2)

	set_devastation(S_PRUZHANY, 3)
	set_devastation(S_BREST, 3)
	set_devastation(S_KOBRYN, 3)
	set_devastation(S_SVENCIONYS, 3)
	set_devastation(S_SEVEZH, 3)
	set_devastation(S_POLOTSK, 3)
	set_devastation(S_SMOLENSK, 3)
	set_devastation(S_MOZHAYSK, 3)
	set_devastation(S_TARUTINO, 3)
	set_devastation(S_MOSCOW, 3)
}

P.setup_hand = {
	_begin() {
		// L.scenario
		// L.hand_size
		log_h2("Setup Hand")
		L.discarded_cards = [[], []]
		L.has_shuffled_deck = [false, false]
		L.drawn_card = [-1, -1]
	},
	prompt() {
		let num_non_dummy_cards = [count_non_dummy_cards_in_hand(RUSSIA), count_non_dummy_cards_in_hand(FRANCE)]

		if (!L.has_shuffled_deck[R]) {
			if (num_non_dummy_cards[R] > L.hand_size[R])
				V.prompt = `Discard cards (${num_non_dummy_cards[R] - L.hand_size[R]} remaining).`
			else if (num_non_dummy_cards[R] > 0)
				V.prompt = `You may discard more cards before shuffling the deck, or pass.`
			else
				V.prompt = `Shuffle the deck.`

			button_undo(L.discarded_cards[R].length > 0)
			button("shuffle", num_non_dummy_cards[R] <= L.hand_size[R])

			get_non_dummy_cards_in_hand(R).forEach(action_card)
		} else {
			if ((num_non_dummy_cards[R] === L.hand_size[R]) && (L.drawn_card[R] === -1)) {
				V.prompt = `Setup hand – All done.`
				button_done()
			} else {
				if (L.drawn_card[R] === -1) {
					V.prompt = `Draw cards: ${L.hand_size[R] - num_non_dummy_cards[R]} remaining.`
					button_draw()
				} else {
					if (is_must_play_event(L.drawn_card[R])) {
						V.prompt = `Discard and redraw Must-Play event: ${format_card(L.drawn_card[R])}.`
						button("discard_and_redraw")
					} else {
						V.prompt = `You drew ${format_card(L.drawn_card[R])}.`
						button_confirm()
					}
				}
			}
		}
	},
	card(card) {
		L.discarded_cards[R].push(card)
		remove_card_from_hand(R, card)
	},
	undo() {
		add_to_hand(R, L.discarded_cards[R].pop())
	},
	shuffle() {
		for (let card of L.discarded_cards[R])
			set_add(get_deck(R), card)

		shuffle(get_deck(R))
		L.has_shuffled_deck[R] = true
		log(`${possessive(R)} deck shuffled.`)
	},
	draw() {
		L.drawn_card[R] = draw_card(R)
	},
	discard_and_redraw() {
		discard_card(L.drawn_card[R])
		L.drawn_card[R] = draw_card(R)
	},
	confirm() {
		L.drawn_card[R] = -1
	},
	done() {
		set_delete(G.active, R)
		if (G.active.length === 0) {
			// Scenario 5 special rule: Holy Mother Russia is placed on top of the Russian deck
			if (L.scenario === BATTLE_OF_SMOLENSK_CAMPAIGN_START)
				place_card_at_the_top_of_the_deck(C_HOLY_MOTHER_RUSSIA_RU)
			goto("main")
		}
	}
}

function place_card_at_the_top_of_the_deck(card) {
	let who = get_card_owner(card)
	if (set_has(get_discard(who), card))
		set_delete(get_discard(who), card)
	else if (get_deck(who).includes(cards))
		array_delete_item(get_deck(who), card)
	get_deck(who).push(card)
	log(`${format_card(card)} placed on top of the ${ROLES[who]} deck.`)
}

// === MAIN ===
P.main = script(`
	for G.turn in G.start_turn to G.end_turn {
		eval { start_turn(G.turn) }
		if (is_resource_turn(G.turn)) {
			call resources_phase
		} else {
			call turn
		}
	}
	goto finish_game
`)

// Called in main script
// eslint-disable-next-line no-unused-vars
function start_turn(turn) {
	if (is_resource_turn(turn))
		log_h1(`${get_month_name(G.turn)} – Resources Phase`, get_season(turn))
	else
		log_h1(`${get_month_name(G.turn)} ${get_turn_name(G.turn)}`, get_season(turn))

	if (turn === JUNE_5) {
		log_h5("French Logistic Preparations")
		log_italic(`France receives a free Forced March and Place Depot order. As an exception to the rules, this Place Depot order may be placed in ${format_area(S_KOVNO)}.`)
	}
}

// === END-GAME OBJECTIVES ===
P.finish_game = function() {
	log_h1("Objectives Scoring")
	log()
	for (let f of END_GAME_OBJECTIVES[G.scenario]) {
		f()
		log()
	}

	log_h1("Game Over")
	log()
	if (G.vp > 0)
		finish(FRANCE, `France won with ${G.vp} VP.`)
	else if (G.vp < 0)
		finish(RUSSIA, `Russia won with ${Math.abs(G.vp)} VP.`)
	else
		finish("Draw", `Neither side has a VP advantage.`)
}

const END_GAME_OBJECTIVES = {
	[THE_EAGLES_MARCH_ON_SMOLENSK]: [
		is_france_within_two_areas_of_moscow,
		count_russian_occupied_areas_adjacent_to_french_off_map_areas,
	],
	[THE_EAGLES_MARCH_ON_MOSCOW]: [
		count_russian_occupied_areas_adjacent_to_french_off_map_areas,
		has_france_ever_controlled_moscow ,
	],
	[THE_GRAND_CAMPAIGN]: [
		count_russian_occupied_areas_adjacent_to_french_off_map_areas,
		count_french_casualties,
	],
	[HOLLOW_VICTORIES]: [
		count_russian_occupied_areas_adjacent_to_french_off_map_areas,
		has_france_ever_controlled_moscow,
	],
	[BATTLE_OF_SMOLENSK_CAMPAIGN_START]: [
		count_russian_occupied_areas_adjacent_to_french_off_map_areas,
		count_french_casualties,
	],
	[THE_RETREAT_OF_THE_GRANDE_ARMEE]: [
		count_russian_occupied_areas_adjacent_to_french_off_map_areas,
		count_french_casualties,
	],
}

/* VICTORY CONDITION CHECKS */
function is_france_within_two_areas_of_moscow() {
	function does_france_gain_vp() {
		if (has_sp_of_type(FRANCE, FRESH_INFANTRY, S_MOSCOW)) return true

		let queue = [ S_MOSCOW ]
		let distance = []
		map_set(distance, S_MOSCOW, 0)

		while (queue.length > 0) {
			let current = queue.shift()
			if (map_get(distance, current) < 2) {
				for (let adj of get_all_adjacent_areas(current)) {
					if (has_sp_of_type(FRANCE, FRESH_INFANTRY, adj)) {
						return true
					} else {
						if (!map_has(distance, adj))
							map_set(distance, adj, map_get(distance, current) + 1)
					}
				}
			}
		}

		return false
	}

	if (does_france_gain_vp()) {
		log(`France has a fresh Infantry SP within two areas of Moscow.`)
		increase_vp(FRANCE, 1)
	} else {
		log(`France does not have a fresh Infantry SP within two areas of Moscow.`)
	}
}

function count_russian_occupied_areas_adjacent_to_french_off_map_areas() {
	let areas = []
	for (let area of FRENCH_OFF_MAP_AREAS) {
		for (let adj of get_all_adjacent_areas(area)) {
			if (has_russian_sp(adj) && !set_has(areas, adj))
				set_add(areas, adj)
		}
	}

	log(`Russia has SPs in ${areas.length} areas adjacent to a French off-map area.`)
	if (areas.length > 0) {
		for (let area of areas)
			logi(format_area(area))

		increase_vp(RUSSIA, areas.length)
	}
}

function has_france_ever_controlled_moscow() {
	if (G.has_france_occupied_moscow) {
		log(`France has controlled ${format_area(S_MOSCOW)}.`)
	} else {
		log(`France has never controlled ${format_area(S_MOSCOW)}.`)
		increase_vp(RUSSIA, 3)
	}
}

function count_french_casualties() {
	let count = count_num_sps(FRANCE, FRENCH_CASUALTIES)
	log(`${count} French Casualties.`)
	for (let type of get_troop_types_at_area(FRANCE, FRENCH_CASUALTIES))
		logi(`${count_num_sps_of_type(FRANCE, type, FRENCH_CASUALTIES)} ${get_troop_type_name(type)}`)
	increase_vp(RUSSIA, Math.floor(count / 3))
}

// === RESOURCES PHASE ===
P.resources_phase = script(`
	if (get_current_month() === OCT) {
		call add_winter_cards
	}
	if (get_current_season() === WINTER) {
		call winter_shift_initiative
	}
	call free_replacements
	call additional_replacements
	call select_new_cards

	eval { log_h2("Draw Cards") }
	set G.active [RUSSIA, FRANCE]
	call draw_card_to_hand { num_cards_to_draw: L.$ }
`)

P.add_winter_cards = function() {
	for (let who = RUSSIA; who <= FRANCE; ++who) {
		let summer_cards = []
		G.deck[who].forEach(card => {
			if (get_card_season(card) === SUMMER) summer_cards.push(card)
		})
		G.hand[who].forEach(card => {
			if (get_card_season(card) == SUMMER) summer_cards.push(card)
		})
		G.deck[who] = G.deck[who].filter(card => get_card_season(card) !== SUMMER)
		G.hand[who] = G.hand[who].filter(card => get_card_season(card) !== SUMMER)
		G.deck[who] = G.deck[who].concat(G.set_aside[who])
		summer_cards.forEach(card => set_add(G.removed[who], card))
		shuffle(G.deck[who])
	}
	log("Removed Summer cards.")
	log("Added Winter cards.")
	log("Decks reshuffled.")
	log()
	end()
}

P.winter_shift_initiative = function() {
	log_h5("Winter")
	shift_initiative(RUSSIA)
	log()
	end()
}

P.free_replacements = {
	_begin() {
		log_h2("Free Replacements")

		G.active = [RUSSIA, FRANCE]

		L.free_replacements_areas = [[S_KIEV, S_SMOLENSK, S_KALUGA, S_MOSCOW], [S_KOVNO]]
		L.areas = [[], []]
		L.areas_received = [[], []]
		for (let who = RUSSIA; who <= FRANCE; ++who)
			L.areas[who] = L.free_replacements_areas[who].filter(area => is_friendly_controlled(who, area))

		L.has_gained_free_cossack = false
	},
	prompt() {
		if (L.areas[R].length > 0) {
			V.prompt = `Receive 1 Infantry SP in ${join_array_with_and(L.areas[R].map(format_area))}.`
			L.areas[R].forEach(area => action_area(area))
		} else if (R === RUSSIA && !L.has_gained_free_cossack) {
			V.prompt = `Receive 1 Cossack SP at ${format_area(S_VORONEZH)}.`
			action_area(S_VORONEZH)
		} else {
			V.prompt = `Free Replacements: All done.`
			button_done()
		}
		button_undo(L.areas_received[R].length > 0 || (R === RUSSIA && L.has_gained_free_cossack))
	},
	area(area) {
		if (L.areas[R].length > 0) {
			add_troop(R, area, FRESH_INFANTRY, 1)
			set_delete(L.areas[R], area)
			L.areas_received[R].push(area)
		} else {
			add_troop(R, area, FRESH_COSSACK, 1)
			L.has_gained_free_cossack = true
		}
	},
	undo() {
		if (R === RUSSIA && L.has_gained_free_cossack) {
			remove_troop(R, S_VORONEZH, FRESH_COSSACK, 1)
			L.has_gained_free_cossack = false
		} else {
			let area = L.areas_received[R].pop()
			remove_troop(R, area, FRESH_INFANTRY, 1)
			set_add(L.areas[R], area)
		}
	},
	done() {
		set_delete(G.active, R)
		if (G.active.length === 0) {
			for (let who = RUSSIA; who <= FRANCE; ++who) {
				log(`${ROLES[who]}`)
				if ((who === FRANCE) && L.free_replacements_areas[FRANCE].every(area => !is_friendly_controlled(FRANCE, area))) {
					logi("Nothing")
					break
				}
				for (let area of L.free_replacements_areas[who]) {
					if (is_friendly_controlled(who, area)) {
						logi(format_area(area))
						logii(`1 Infantry`)
					}
				}
				if (who === RUSSIA) {
					logi(format_area(S_VORONEZH))
					logii(`1 Cossack`)
				}
			}
			log()
			end()
		}
	}
}

function count_total_sp_amount_on_map(who, type) {
	let count = 0
	let exhausted_version = type + 1

	map_for_each_value(G.sps, (entries) => {
		for (let entry of entries) {
			if ((decode_troop_entry_who(entry) === who) && [type, exhausted_version].includes(decode_troop_entry_type(entry)))
				count += decode_troop_entry_num(entry)
		}
	})

	return count
}

function could_receive_sp(who, type) {
	if (is_infantry(type))
		return count_total_sp_amount_on_map(who, type) + 2 <= data.max_sp_amounts[who][get_troop_type_name(type)]

	return count_total_sp_amount_on_map(who, type) + 1 <= data.max_sp_amounts[who][get_troop_type_name(type)]
}

P.additional_replacements = {
	_begin() {
		log_h2("Additional Replacements")
		G.active = [RUSSIA, FRANCE]

		L.state = [null, null]
		for (let player = RUSSIA; player <= FRANCE; ++player) {
			if (has_card_in_hand(player))
				L.state[player] = "discard_card"
			else
				L.state[player] = "all_done"
		}

		L.discarded = [[], []]
		L.selected_type = [-1, -1]
		L.count = [0, 0]

		L.reinforced = [[], []]
		L.undo = [[], []]
	},
	states: {
		"discard_card": {
			on_prompt() {
				V.prompt = `You may discard a card to gain additional replacements, or pass.`
				for (let card of get_non_dummy_cards_in_hand(R))
					action_card(card)
				button_pass()
			},
			on_card(card) {
				push_local_undo(R, "discard", { card })
				L.discarded[R].push(card)
				remove_card_from_hand(R, card)
				set_add(get_discard(R), card)
				goto_local_state(R, "select_reinforcement_sp")
			}
		},
		"select_reinforcement_sp": {
			on_prompt() {
				V.prompt = `Select an SP type to reinforce.`
				for (let type = 0; type < NUM_TROOP_TYPES; ++type) {
					if (is_troop_type_fresh(type) && could_receive_sp(R, type)) {
						if (is_infantry(type))
							action("troop_2x", type)
						else
							button_troop(type)
					}
				}
			},
			on_troop_button(type) {
				push_local_undo(R, "select_reinforcement_type")
				L.selected_type[R] = type
				L.count[R] = is_infantry(type) ? 2 : 1
				goto_local_state(R, "place_sp")
			},
			on_troop_2x(type) {
				this.on_troop_button(type)
			}
		},
		"place_sp": {
			on_prompt() {
				V.prompt = `Select an area to place ${get_troop_type_name(L.selected_type[R])}. (${L.count[R]} remaining)`
				let areas = filter_areas(area => {
					return (has_friendly_leader(R, area) || is_key_city(area) || has_friendly_depot(R, area))
					&& is_area_in_supply(R, area)
					&& is_friendly_controlled(R, area)
				})

				// End if fuzzer. Makes more sense for a human to undo at this point (and recover a card) rather than passing.
				if (areas.length === 0 && globalThis.RTT_FUZZER)
					button_pass()
				else
					areas.forEach(action_area)
			},
			on_area(area) {
				push_local_undo(R, "place_sp", { area, type: L.selected_type[R] })
				L.reinforced[R].push({area, type: L.selected_type[R]})
				add_troop(R, area, L.selected_type[R], 1)
				if (--L.count[R] === 0) {
					if (has_card_in_hand(R))
						goto_local_state(R, "discard_card")
					else
						goto_local_state(R, "all_done")
				}
			}
		},
		"all_done": {
			on_prompt() {
				V.prompt = `Receive additional reinforcements: All done.`
				button_done()
			}
		}
	},
	prompt() {
		this.states[L.state[R]].on_prompt()
		button_undo(L.undo[R].length > 0)
	},
	undo() {
		let undo = L.undo[R].pop()

		if (L.state[R] !== undo.state)
			L.state[R] = undo.state

		switch(undo.action) {
		case "discard":
			L.discarded[R].pop()
			add_to_hand(R, undo.info.card)
			set_delete(get_discard(R), undo.info.card)
			return
		case "select_reinforcement_type":
			L.selected_type[R] = -1
			L.count[R] = 0
			return
		case "place_sp":
			remove_troop(R, undo.info.area, undo.info.type, 1)
			++L.count[R]
			return
		}
	},
	pass() { this.done() },
	done() {
		set_delete(G.active, R)
		if (G.active.length === 0) {
			for (let player = RUSSIA; player <= FRANCE; ++player) {
				log_only(player, `${ROLES[enemy(player)]} discarded ${L.discarded[enemy(player)].length} cards.`)

				if (L.reinforced[player].length > 0) {
					log_only(player, `Discarded`)
					for (let card of L.discarded[player])
						log_only(player, format_i(format_card(card)))

					log_only(player, `Reinforced`)
					for (let entry of L.reinforced[player]) {
						log_only(player, format_i(format_area(entry.area)))
						log_only(player, format_ii(`1 ${get_troop_type_name(entry.type)}`))
					}
				}
			}
			log()
			end()
		}
	},
	card(card)			{ this.states[L.state[R]].on_card(card) },
	area(area)			{ this.states[L.state[R]].on_area(area) },
	troop_button(type)	{ this.states[L.state[R]].on_troop_button(type) },
	troop_2x(type)		{ this.states[L.state[R]].on_troop_2x(type) },
}

// TODO: Maybe move to data?
const DESIGNATED_CARD_CHOICES = [
	null,
	{
		"Russia": [C_THE_CZAR_LEAVES_THE_ARMY, C_SCORCHED_EARTH],
		"France": [C_DAVOUT_TAKES_COMMAND, C_HARD_MARCHING_2]
	},
	{
		"Russia": [C_THE_FINLAND_CORPS, C_KUTUZOV_APPOINTED],
		"France": [C_INFIGHTING_AND_INTRIGUE, C_HOLY_MOTHER_RUSSIA_FR]
	},
	{
		"Russia": [C_TREATY_OF_BUCHAREST, C_EXHAUSTING_MARCH_2],
		"France": [C_PEACE_OFFER, C_IX_CORPS_ARRIVES],
	},
	{
		"Russia": [C_PRIDE_AND_HESITATION, C_DISORDERLY_MARCH],
		"France": [C_XI_CORPS_ARRIVES, C_LETHARGIC_PURSUIT],
	},
	{
		"Russia": [C_COSSACK_PATROLS, C_EXHAUSTING_MARCH_1],
		"France": [C_COURAGE_OF_DESPERATION, C_NEYS_ESCAPE],
	}
]

function get_designated_card_choices(who, month) {
	return DESIGNATED_CARD_CHOICES[month][ROLES[who]]
}

P.select_new_cards = {
	_begin() {
		log_h2("Select Card")

		G.active = [RUSSIA, FRANCE]
		L.has_combined_draw_and_discard = false
		L.selected_card = [-1, -1]

		L.card_choices = [get_designated_card_choices(RUSSIA, get_current_month()), get_designated_card_choices(FRANCE, get_current_month())]
		for (let who = RUSSIA; who <= FRANCE; ++who)
			L.card_choices[who] = L.card_choices[who].filter(card => get_deck(who).includes(card) || set_has(get_discard(who), card))
	},
	prompt() {
		if (!L.has_combined_draw_and_discard) {
			V.prompt = `Combine draw and discard piles.`
			button("combine")
		} else if (L.selected_card[R] === -1) {
			if (L.card_choices[R].length > 0) {
				V.prompt = `Select a card for this month. (${join_array_with_or(L.card_choices[R].map(card => format_card(card)))})`
				L.card_choices[R].forEach(card => action("card_button", card))
			} else {
				V.prompt = `The designated cards for this month are in your hand or already played.`
				button_confirm()
			}
		} else {
			V.prompt = `Confirm selection of ${format_card(L.selected_card[R])}.`
			button_confirm()
			button_undo()
		}
	},
	combine() {
		G.deck[R] = G.deck[R].concat(G.discard[R])
		G.discard[R] = []
		L.has_combined_draw_and_discard = true
	},
	card_button(card) {
		L.selected_card[R] = card
	},
	undo() {
		L.selected_card[R] = -1
	},
	confirm() {
		set_delete(G.active, R)

		if (L.selected_card[R] > -1) {
			add_to_hand(R, L.selected_card[R])
			array_delete_item(get_deck(R), L.selected_card[R])
			log_only(R, `Selected`)
			log_only(R, format_i(format_card(L.selected_card[R])))
		} else {
			log_only(R, `No cards selected.`)
		}

		shuffle(get_deck(R))
		log(`${ROLES[R]} deck reshuffled.`)

		if (G.active.length === 0) {
			let num_cards_to_draw = []
			for (let who = RUSSIA; who <= FRANCE; ++who)
				if (L.selected_card === -1)
					num_cards_to_draw.push(3)
				else
					num_cards_to_draw.push(2)

			log()
			end(num_cards_to_draw)
		}
	}
}

// === NORMAL TURNS ===
// Orders are defined as numbers instead of strings so that they can easily be funnelled into their specific order execution handler
const TURN_PHASES = [
	"draw_card_to_hand",
	"play_card_for_additional_orders",
	"select_orders",
	"place_orders",
	FORCED_MARCH,
	CAVALRY_PATROLS,
	MARCH,
	EVADE,
	"battle",
	RALLY,
	COSSACK_RAID,
	PLACE_DEPOT,
	"attrition",
	"lines_of_communications"
]

// Used in P.turn script
// eslint-disable-next-line no-unused-vars
function is_order_turn(turn) {
	return [FORCED_MARCH, CAVALRY_PATROLS, MARCH, EVADE, RALLY, COSSACK_RAID, PLACE_DEPOT].includes(TURN_PHASES[turn])
}

P.turn = script(`
	for G.phase in 0 to (TURN_PHASES.length - 1) {
		if (is_order_turn(G.phase)) {
			call execute_orders { type: TURN_PHASES[G.phase] }
		} else {
			call (TURN_PHASES[G.phase])
		}
	}
	goto end_turn
`)

P.end_turn = function() {
	log_h2(`End of Turn`)

	// Reset turn-specific trackers.
	clear_moved()
	map_clear(G.battles)
	G.abilities_used = 0

	// Reset orders.
	log("Removed all orders.")
	G.orders_by_type = Array.from({ length: NUM_ORDER_TYPES }, () => [[], []])
	for (let order = FIRST_ORDER; order <= LAST_ORDER; ++order) {
		if (get_order_location(order) !== POOL || get_order_location(order) !== OUT_OF_PLAY)
			G.orders[order] = POOL
	}

	// RU #11 Holy Mother Russia: The side controlling the designated key at the end of the turn gains 1 VP.
	if (is_event_active(C_HOLY_MOTHER_RUSSIA_RU)) {
		let key_controller = is_fr_controlled(get_event_keyword(C_HOLY_MOTHER_RUSSIA_RU, "key")) ? FRANCE : RUSSIA
		log(`${format_card(C_HOLY_MOTHER_RUSSIA_RU)}`)
		increase_vp(key_controller, 1)
	}

	// Check French occupation of Moscow.
	if (G.scenario !== THE_EAGLES_MARCH_ON_SMOLENSK && has_friendly_troop(FRANCE, S_MOSCOW) && is_area_in_supply(FRANCE, S_MOSCOW)) {
		log(`France occupies ${format_area(S_MOSCOW)} with an in-supply SP.`)
		increase_vp(FRANCE, get_current_season() == SUMMER ? 1 : 2)
	}

	// Clear all persistent events whose effect expires at the end of this turn.
	let events_to_clear = []
	map_for_each(G.persistent_events, (evt, info) => {
		if (info.remove <= G.turn)
			set_add(events_to_clear, evt)
	})
	events_to_clear.forEach(evt => map_delete(G.persistent_events, evt))

	// New rule in version 1.3 of the living rules.
	// If a side has Initiative level 4 at the end of the turn, they gain 1 VP.
	if (get_current_initiative_level() === 4) {
		log(`Initiative is at ${ROLES[get_who_has_initiative()]} 4.`)
		increase_vp(get_who_has_initiative())
	}

	if (!sudden_death())
		end()
}

// === DRAW CARD TO HAND ===
/*
	Supports both single-active and multi-active situations.
	All card draws in the game are redirected to this state.

	Some cards in 1812 are must-play events, which need to be resolved immediately upon being drawn. All of these events are defined within this state.
	Some of these events are fairly simple: the player just needs to confirm the event, and its actual effect persists through the turn.
	Other events are more complex and require more individual sequencing.
	Note that I have repeated some code from other sections of the rules (particularly attrition) so as to work around the limitation of the game being in a single state at each time.

	See the FRAMEWORK EXTENSIONS section above for more info on some of the custom syntax I use in this state.

	Must-play events:
		RUSSIA:
			#11: Holy Mother Russia				"holy_mother_russia_ru"
			#14: Extreme Weather				"extreme_weather_ru"
			#42: Command Friction				"command_friction"
			#45: Poor Logistics				"poor_logistics"
			#46: Devastated Countryside			"devastated_countryside"
			#52: Barclay de Tolly Resigns			"barclay_de_tolly_resigns"

		FRANCE:
			#22: Poor Communications			"poor_communications"
			#24: Jérôme Goes Home				"jerome_goes_home"
			#39: Chaos in the Rear Areas			"chaos_in_the_rear_areas"
			#40: Vulnerable Supply Lines		"	vulnerable_supply_lines"
			#41: Freezing Weather				"freezing_weather"
			#42: Extreme Weather				"extreme_weather_fr"
			#43: Logistics Collapse				"logistics_collapse"
			#44: Chaotic Food Distribution		"chaotic_food_distribution"
*/

function draw_a_card(player) {
	// Reshuffle deck if empty
	// Impossible for all practical cases (fuzzer handling)
	if (get_deck(player).length === 0) {
		G.deck[player] = get_discard(player).slice()
		get_discard(player).length = 0
		shuffle(get_deck(player))
		log(`Reshuffled ${ROLES[player]} deck.`)
	}

	L.drawn_card[player] = draw_card(player)
	goto_local_state(player, "review_drawn_card")
}

function init_event_tracker(card) {
	map_set(L.event_tracker, card, { step: -1 } )
}

function increment_event_tracker(card, amount = 1) {
	map_get(L.event_tracker, card, null).step += amount
}

function decrement_event_tracker(card, amount = 1) {
	map_get(L.event_tracker, card, null).step -= amount
}

function get_event_data(card, fallback = null) {
	return map_get(L.event_tracker, card, fallback)
}

function get_event_step(card) {
	return get_event_data(card).step
}

// TODO: Cleanup repeated discard/log
P.draw_card_to_hand = {
	_begin() {
		// NOTE: Set G.active to whoever needs to draw a card before calling (since we don't want to define must-play events in different places)
		// Supports simultaneous and individual card drawing

		if (Array.isArray(G.active) && !is_resource_turn(get_current_turn())) {
			G.active = [RUSSIA, FRANCE]
			log_h2("Draw a Card")
		}

		// Current local state
		L.state = ["draw_card", "draw_card"]
		// Current card drawn
		L.drawn_card = [-1, -1]
		// Some must-play draw are also multi-step (eeks!), so track them using a map
		// Also stores event-specific information, so that it stays organized
		L.event_tracker = []
		// Cache of persistent events played throughout the state by both sides (which will be added to G.persistent_events at the end)
		L.persistent_events = []
		// Number of cards each player must draw (relevant for the resources phase)
		L.num_cards_to_draw = L.num_cards_to_draw ?? [1, 1]
	},
	states: {
		"draw_card": {
			on_prompt() {
				V.prompt = "Draw a card to your hand."
				button_draw()
			},
			on_draw() {
				draw_a_card(R)
			},
		},
		"review_drawn_card": {
			on_prompt() {
				V.prompt = `You drew ${format_card(L.drawn_card[R])}.`
				button_confirm()
			},
			on_confirm() {
				if (is_must_play_event(L.drawn_card[R])) {
					set_add(L.persistent_events, L.drawn_card[R])
					init_event_tracker(L.drawn_card[R])
					goto_local_state(R, get_event_state_name(L.drawn_card[R]))
				} else {
					end_local_state(R)
				}
			},
		},
		// Sequencing this event is a bit tricky, and I have bent some rules to make this work.
		// Note to self: Beware touching G.active and R in this sub-state, since they can get mixed up between single-active and multi-active situations.
		"holy_mother_russia_ru": {
			on_begin() {
				get_event_data(C_HOLY_MOTHER_RUSSIA_RU).key = -1
			},
			on_prompt() {
				switch(get_event_step(C_HOLY_MOTHER_RUSSIA_RU)) {
				case -1:
					prompt_card(C_HOLY_MOTHER_RUSSIA_RU, "Receive two additional orders.")
					button_next()
					break
				case 0:
					if (set_has(G.active, FRANCE))
						prompt_card(C_HOLY_MOTHER_RUSSIA_RU, "France will designate a Russian-controlled Key City after resolving their actions.")
					else
						prompt_card(C_HOLY_MOTHER_RUSSIA_RU, "France will designate a Russian-controlled Key City.")
					button_confirm()
					break
				case 1:
					prompt_card(C_HOLY_MOTHER_RUSSIA_RU, "Designate a Russian-controlled Key City.")
					filter_areas(area => is_key_city(area) && is_ru_controlled(area)).forEach(action_area)
					break
				case 2:
					prompt_card(C_HOLY_MOTHER_RUSSIA_RU, `The side controlling ${format_area(get_event_data(C_HOLY_MOTHER_RUSSIA_RU).key)} at the end of the turn gains +1 VP.`)
					button_confirm()
				}
				button_undo(get_event_step(C_HOLY_MOTHER_RUSSIA_RU) === 0 || get_event_step(C_HOLY_MOTHER_RUSSIA_RU) === 2)
			},
			on_next() {
				increment_event_tracker(C_HOLY_MOTHER_RUSSIA_RU)
			},
			on_area(area) {
				increment_event_tracker(C_HOLY_MOTHER_RUSSIA_RU)
				get_event_data(C_HOLY_MOTHER_RUSSIA_RU).key = area
			},
			on_confirm() {
				if (R === RUSSIA) {
					increment_event_tracker(C_HOLY_MOTHER_RUSSIA_RU)
					discard_or_remove_card(C_HOLY_MOTHER_RUSSIA_RU)
					// If France has already finished the state, bring them back in.
					if (Array.isArray(G.active)) {
						if (!set_has(G.active, FRANCE)) { //If France is done doing their stuff & has exited the state
							set_add(G.active, FRANCE)
							goto_local_state(FRANCE, "holy_mother_russia_ru")
						}
					} else {
						G.active = FRANCE
						goto_local_state(FRANCE, "holy_mother_russia_ru")
					}
				} else {
					log_must_play_event(C_HOLY_MOTHER_RUSSIA_RU, get_event_data(C_HOLY_MOTHER_RUSSIA_RU).key)
				}
				end_local_state(R)
			},
			on_undo() {
				decrement_event_tracker(C_HOLY_MOTHER_RUSSIA_RU)
				if (R === FRANCE)
					get_event_data(C_HOLY_MOTHER_RUSSIA_RU).key = -1
			},
		},
		// Minor modification: Russia draws a card after confirming the card's effects (in order to maintain a constant flow in case another must-play is drawn)
		"extreme_weather_ru": {
			on_prompt() {
				switch(get_event_step(C_EXTREME_WEATHER_RU)) {
				case -1:
					prompt_card(C_EXTREME_WEATHER_RU, "France -2 orders this turn.")
					button_next()
					return
				case 0:
					prompt_card(C_EXTREME_WEATHER_RU, "1 fresh SP in each force that uses 'Forced March' or 'March' orders this turn is exhausted.")
					button_next()
					return
				case 1:
					prompt_card(C_EXTREME_WEATHER_RU, "Draw a card to your hand.")
					button_draw()
				}
				button_undo(get_event_step(C_EXTREME_WEATHER_RU) > -1)
			},
			on_next() { increment_event_tracker(C_EXTREME_WEATHER_RU) },
			on_undo() { decrement_event_tracker(C_EXTREME_WEATHER_RU) },
			on_draw() {
				draw_a_card(R)
			},
			on_end() {
				log_must_play_event(C_EXTREME_WEATHER_RU)
				discard_or_remove_card(C_EXTREME_WEATHER_RU)
			},
		},
		"command_friction": {
			on_prompt() {
				prompt_card(C_COMMAND_FRICTION, "At the beginning of the 'Place Orders' phase, FR may designate an area with more than one 1 RU leader. RU must discard a card to place orders there.")
				button_confirm()
			},
			on_confirm() {
				log_must_play_event(C_COMMAND_FRICTION)
				discard_or_remove_card(C_COMMAND_FRICTION)
				end_local_state(R)
			},
		},
		"poor_logistics": {
			on_prompt() {
				prompt_card(C_POOR_LOGISTICS, "This turn, the Russians may not use 'Place Depot' orders.")
				button_confirm()
			},
			on_confirm() {
				log_must_play_event(C_POOR_LOGISTICS)
				discard_or_remove_card(C_POOR_LOGISTICS)
				end_local_state(R)
			},
		},
		"devastated_countryside": {
			on_prompt() {
				prompt_card(C_DEVASTATED_COUNTRYSIDE, "The effect of Devastation markers is doubled for both sides this turn.")
				button_confirm()
			},
			on_confirm() {
				log_must_play_event(C_DEVASTATED_COUNTRYSIDE)
				discard_or_remove_card(C_DEVASTATED_COUNTRYSIDE)
				end_local_state(R)
			},
		},
		"barclay_de_tolly_resigns": {
			on_prompt() {
				if (!is_leader_on_map(L_DE_TOLLY)) {
					prompt_card(C_BARCLAY_DE_TOLLY_RESIGNS, `${format_leader(L_DE_TOLLY)} is not on map – no effect.`)
					button("confirm")
				} else if (!is_leader_on_map(L_KUTUZOV)) {
					prompt_card(C_BARCLAY_DE_TOLLY_RESIGNS, `${format_leader(L_KUTUZOV)} is not on map – no effect.`)
					button("confirm")
				} else {
					prompt_card(C_BARCLAY_DE_TOLLY_RESIGNS, `${format_leader(L_KUTUZOV)} is on map – remove ${format_leader(L_DE_TOLLY)} from play.`)
					action("leader", L_DE_TOLLY)
				}
			},
			on_confirm() {
				end_local_state(R)
			},
			on_leader(leader) {
				move_leader(leader, POOL)
				end_local_state(R)
			},
			on_end() {
				log_must_play_event(C_BARCLAY_DE_TOLLY_RESIGNS, get_leader_location(L_DE_TOLLY) === POOL)
				discard_or_remove_card(C_BARCLAY_DE_TOLLY_RESIGNS)
			},
		},
		"poor_communications": {
			on_prompt() {
				prompt_card(C_POOR_COMMUNICATIONS, "At the end of the 'Place Orders' phase, RU may designate 1 placed FR order to remove.")
				button("confirm")
			},
			on_confirm() {
				log_must_play_event(C_POOR_COMMUNICATIONS)
				discard_or_remove_card(C_POOR_COMMUNICATIONS)
				end_local_state(R)
			},
		},
		"jerome_goes_home": {
			on_prompt() {
				if (!is_leader_on_map(L_JEROME)) {
					prompt_card(C_JEROME_GOES_HOME, `${format_leader(L_JEROME)} is not on map – no effect.`)
					button("confirm")
				} else {
					prompt_card(C_JEROME_GOES_HOME, `Remove ${format_leader(L_JEROME)} at no VP cost from ${format_area(get_leader_location(L_JEROME))}.`)
					action("leader", L_JEROME)
				}
			},
			on_confirm() {
				end_local_state(R)
			},
			on_leader(leader) {
				move_leader(leader, POOL)
				end_local_state(R)
			},
			on_end() {
				log_must_play_event(C_JEROME_GOES_HOME, get_leader_location(L_JEROME) === POOL)
				discard_or_remove_card(C_JEROME_GOES_HOME)
			},
		},
		// NOTE: contains duplicated code from the Attrition section (working around not being able to be in multiple states at once)
		"chaos_in_the_rear_areas": {
			on_begin() {
				get_event_data(C_CHAOS_IN_THE_REAR_AREAS).losses_remaining 	= Math.min(get_devastated_areas_with_french_troops().length, 2)
				get_event_data(C_CHAOS_IN_THE_REAR_AREAS).choice 		= null
				get_event_data(C_CHAOS_IN_THE_REAR_AREAS).selected_area 	= -1
				get_event_data(C_CHAOS_IN_THE_REAR_AREAS).count 		= 0
				get_event_data(C_CHAOS_IN_THE_REAR_AREAS).undo 			= []
			},
			on_prompt() {
				if (get_event_data(C_CHAOS_IN_THE_REAR_AREAS).losses_remaining > 0) {
					if (get_event_data(C_CHAOS_IN_THE_REAR_AREAS).choice === null) {
						V.prompt = `Assign attrition losses: ${get_event_data(C_CHAOS_IN_THE_REAR_AREAS).losses_remaining} remaining.`
						let any_action = false

						if (get_devastated_areas_with_french_troops().some(area => has_fresh_sp(FRANCE, area))) {
							button("exhaust")
							any_action = true
						}

						let num_exhausted = 0
						for (let area of get_devastated_areas_with_french_troops()) {
							if (has_exhausted_sp(FRANCE, area))
								num_exhausted += count_num_exhausted_sps(FRANCE, area)
							if (num_exhausted >= 2) {
								button("eliminate_2")
								any_action = true
								break
							}
						}

						if (!any_action)
							button_done()
					} else if (get_event_data(C_CHAOS_IN_THE_REAR_AREAS).selected_area === -1) {
						V.prompt = `Select an area to ${get_event_data(C_CHAOS_IN_THE_REAR_AREAS).choice } a SP.`
						let areas
						if (get_event_data(C_CHAOS_IN_THE_REAR_AREAS).choice === "exhaust")
							areas = get_devastated_areas_with_french_troops().filter(area => has_fresh_sp(FRANCE, area))
						else
							areas = get_devastated_areas_with_french_troops().filter(area => has_exhausted_sp(FRANCE, area))

						if (areas.length <= 5)
							V.prompt += ` (${join_array_with_or(areas.map(format_area))})`
						areas.forEach(action_area)
					} else if (get_event_data(C_CHAOS_IN_THE_REAR_AREAS).count > 0) {
						V.prompt = `Select an SP to ${get_event_data(C_CHAOS_IN_THE_REAR_AREAS).choice}.`
						if (get_event_data(C_CHAOS_IN_THE_REAR_AREAS).choice === "exhaust") {
							for (let type of get_all_fresh_sp_types(FRANCE, get_event_data(C_CHAOS_IN_THE_REAR_AREAS).selected_area))
								action_troop_alt(type, get_event_data(C_CHAOS_IN_THE_REAR_AREAS).selected_area)
						} else {
							for (let type of get_all_exhausted_sp_types(FRANCE, get_event_data(C_CHAOS_IN_THE_REAR_AREAS).selected_area))
								action_troop_alt(type, get_event_data(C_CHAOS_IN_THE_REAR_AREAS).selected_area)
						}
					}
				} else {
					prompt_card(C_CHAOS_IN_THE_REAR_AREAS, "All done.")
					button_done()
				}
				button_undo(get_event_data(C_CHAOS_IN_THE_REAR_AREAS).undo.length > 0)
			},
			on_exhaust() {
				get_event_data(C_CHAOS_IN_THE_REAR_AREAS).undo.push({action: "select_choice", type: "exhaust"})
				get_event_data(C_CHAOS_IN_THE_REAR_AREAS).choice = "exhaust"
				get_event_data(C_CHAOS_IN_THE_REAR_AREAS).count = 1
			},
			on_eliminate_2() {
				get_event_data(C_CHAOS_IN_THE_REAR_AREAS).undo.push({action: "select_choice", type: "eliminate"})
				get_event_data(C_CHAOS_IN_THE_REAR_AREAS).choice = "eliminate"
				get_event_data(C_CHAOS_IN_THE_REAR_AREAS).count = 2
			},
			on_area(area) {
				get_event_data(C_CHAOS_IN_THE_REAR_AREAS).undo.push({action: "select_area", area })
				get_event_data(C_CHAOS_IN_THE_REAR_AREAS).selected_area = area
			},
			on_troop(entry) {
				let type = decode_troop_action_type(entry)
				if (get_event_data(C_CHAOS_IN_THE_REAR_AREAS).choice === "exhaust") {
					get_event_data(C_CHAOS_IN_THE_REAR_AREAS).undo.push({action: "exhaust", area: get_event_data(C_CHAOS_IN_THE_REAR_AREAS).selected_area, type })
					exhaust_sp(FRANCE, get_event_data(C_CHAOS_IN_THE_REAR_AREAS).selected_area, type)
				} else {
					get_event_data(C_CHAOS_IN_THE_REAR_AREAS).undo.push({action: "eliminate", area: get_event_data(C_CHAOS_IN_THE_REAR_AREAS).selected_area, type })
					eliminate_troop(FRANCE, get_event_data(C_CHAOS_IN_THE_REAR_AREAS).selected_area, type)
				}
				get_event_data(C_CHAOS_IN_THE_REAR_AREAS).selected_area = -1
				if (--get_event_data(C_CHAOS_IN_THE_REAR_AREAS).count === 0) {
					get_event_data(C_CHAOS_IN_THE_REAR_AREAS).choice = null
					--get_event_data(C_CHAOS_IN_THE_REAR_AREAS).losses_remaining
				}
			},
			on_done() {
				discard_or_remove_card(C_CHAOS_IN_THE_REAR_AREAS)
				end_local_state(R)
			},
			on_undo() {
				let action = get_event_data(C_CHAOS_IN_THE_REAR_AREAS).undo.pop()
				switch(action.action) {
				case "select_choice":
					get_event_data(C_CHAOS_IN_THE_REAR_AREAS).choice = null
					get_event_data(C_CHAOS_IN_THE_REAR_AREAS).count = 0
					return
				case "select_area":
					get_event_data(C_CHAOS_IN_THE_REAR_AREAS).selected_area = -1
					return
				case "exhaust":
					rally_troop(FRANCE, action.area, action.type + 1)
					get_event_data(C_CHAOS_IN_THE_REAR_AREAS).selected_area = action.area
					if (++get_event_data(C_CHAOS_IN_THE_REAR_AREAS).count === 1) {
						get_event_data(C_CHAOS_IN_THE_REAR_AREAS).choice = "exhaust"
						++get_event_data(C_CHAOS_IN_THE_REAR_AREAS).losses_remaining
					}
					return
				case "eliminate":
					add_troop(FRANCE, action.area, action.type)
					get_event_data(C_CHAOS_IN_THE_REAR_AREAS).selected_area = action.area
					if (++get_event_data(C_CHAOS_IN_THE_REAR_AREAS).count === 1) {
						get_event_data(C_CHAOS_IN_THE_REAR_AREAS).choice = "eliminate"
						++get_event_data(C_CHAOS_IN_THE_REAR_AREAS).losses_remaining
					}
				}
			}
		},
		"vulnerable_supply_lines": {
			on_begin() {
				get_event_data(C_VULNERABLE_SUPPLY_LINES).num_french_depots = count_num_french_depots_on_map()
				get_event_data(C_VULNERABLE_SUPPLY_LINES).depots_to_remove 	= get_all_unoccupied_depots(FRANCE)
				get_event_data(C_VULNERABLE_SUPPLY_LINES).removed_depots 	= [] //For undo
				get_event_data(C_VULNERABLE_SUPPLY_LINES).discarded_card 	= -1
			},
			on_prompt() {
				if (get_event_data(C_VULNERABLE_SUPPLY_LINES).num_french_depots >= 4) {
					switch(get_event_step(C_VULNERABLE_SUPPLY_LINES)) {
					case -1:
						if (get_hand(R).length > 2) {
							prompt_card(C_VULNERABLE_SUPPLY_LINES, "Discard a card from your hand.")
							for (let card of get_hand(R))
								if (!is_card_dummy(card) && card !== C_VULNERABLE_SUPPLY_LINES)
									action_card(card)
						} else {
							prompt_card(C_VULNERABLE_SUPPLY_LINES, "No cards in hand to discard.")
							button_next()
						}
						return
					case 0:
						prompt_card(C_VULNERABLE_SUPPLY_LINES, `You discarded ${format_card(get_event_data(C_VULNERABLE_SUPPLY_LINES).discarded_card)}.`)
						button_confirm()
						button_undo()
						return
					case 1:
						if (get_event_data(C_VULNERABLE_SUPPLY_LINES).depots_to_remove.length > 0) {
							prompt_card(C_VULNERABLE_SUPPLY_LINES, `Remove all unoccupied French Depot Markers (${join_array_with_and(get_event_data(C_VULNERABLE_SUPPLY_LINES).depots_to_remove.map(format_area))}).`)
							for (let area of get_event_data(C_VULNERABLE_SUPPLY_LINES).depots_to_remove)
								if (!get_event_data(C_VULNERABLE_SUPPLY_LINES).removed_depots.includes(area))
									action_depot(find_depot_at_location(FRANCE, area))
						} else {
							prompt_card(C_VULNERABLE_SUPPLY_LINES, `Remove unoccupied depots – all done.`)
							button_confirm()
						}
						button_undo()
					}
				} else {
					prompt_card(C_VULNERABLE_SUPPLY_LINES, "No effect.")
					button_confirm()
				}
			},
			on_card(card) {
				discard_card(card)
				get_event_data(C_VULNERABLE_SUPPLY_LINES).discarded_card = card
				increment_event_tracker(C_VULNERABLE_SUPPLY_LINES)
			},
			on_next() {
				increment_event_tracker(C_VULNERABLE_SUPPLY_LINES, 2)
			},
			on_confirm() {
				if (get_event_step(C_VULNERABLE_SUPPLY_LINES) === 0)
					increment_event_tracker(C_VULNERABLE_SUPPLY_LINES)
				else
					end_local_state(R)
			},
			on_depot(depot) {
				set_delete(get_event_data(C_VULNERABLE_SUPPLY_LINES).depots_to_remove, get_depot_location(depot))
				get_event_data(C_VULNERABLE_SUPPLY_LINES).removed_depots.push(get_depot_location(depot))
				G.depots[depot] = POOL //remove without log
			},
			on_undo() {
				if (get_event_step(C_VULNERABLE_SUPPLY_LINES) === 0) { //undo discard
					set_delete(get_discard(R), get_event_data(C_VULNERABLE_SUPPLY_LINES).discarded_card)
					add_to_hand(R, get_event_data(C_VULNERABLE_SUPPLY_LINES).discarded_card)
					get_event_data(C_VULNERABLE_SUPPLY_LINES).discarded_card = -1
					decrement_event_tracker(C_VULNERABLE_SUPPLY_LINES)
				} else {
					if (get_event_data(C_VULNERABLE_SUPPLY_LINES).removed_depots.length === 0)
						decrement_event_tracker(C_VULNERABLE_SUPPLY_LINES, (get_event_data(C_VULNERABLE_SUPPLY_LINES).discarded_card > -1) ? 1 : 2)
					else {
						let location = get_event_data(C_VULNERABLE_SUPPLY_LINES).removed_depots.pop()
						add_depot(R, location)
						set_add(get_event_data(C_VULNERABLE_SUPPLY_LINES).depots_to_remove, location)
					}
				}
			}
		},
		"freezing_weather": {
			on_prompt() {
				switch(get_event_step(C_FREEZING_WEATHER)) {
				case -1:
					prompt_card(C_FREEZING_WEATHER, "France may not use 'Place Depot' or 'Forage' orders this turn.")
					button_next()
					return
				case 0:
					prompt_card(C_FREEZING_WEATHER, "All French forces have a maximum move of 1 this turn, and fight as if under 'Forced March' orders.")
					button_confirm()
					button_undo()
					return
				}
			},
			on_next() {
				increment_event_tracker(C_FREEZING_WEATHER)
			},
			on_confirm() {
				log_must_play_event(C_FREEZING_WEATHER)
				discard_or_remove_card(C_FREEZING_WEATHER)
				end_local_state(R)
			},
			on_undo() {
				decrement_event_tracker(C_FREEZING_WEATHER)
			}
		},
		"extreme_weather_fr": {
			on_prompt() {
				switch(get_event_step(C_EXTREME_WEATHER_FR)) {
				case -1:
					prompt_card(C_EXTREME_WEATHER_FR, "This turn, both sides have -2 orders.")
					button_next()
					return
				case 0:
					prompt_card(C_EXTREME_WEATHER_FR, "This, AND the next, turn neither side may place 'Forced March' orders.")
					button_next()
					button_undo()
					return
				case 1:
					prompt_card(C_EXTREME_WEATHER_FR, "1 SP in each force that uses 'March' orders becomes exhausted.")
					button_confirm()
					button_undo()
					return
				}
			},
			on_next() { increment_event_tracker(C_EXTREME_WEATHER_FR) },
			on_confirm() {
				log_must_play_event(C_EXTREME_WEATHER_FR)
				discard_or_remove_card(C_EXTREME_WEATHER_FR)
				end_local_state(R)
			},
			on_undo() { decrement_event_tracker(C_EXTREME_WEATHER_FR) },
		},
		"logistics_collapse": {
			on_prompt() {
				prompt_card(C_LOGISTICS_COLLAPSE, "For the rest of the game, France must discard a card from hand to execute a 'Place Depot' order.")
				button_confirm()
			},
			on_confirm() { end_local_state(R) }
		},
		"chaotic_food_distribution": {
			on_begin() {
				get_event_data(C_CHAOTIC_FOOD_DISTRIBUTION).troop_type = -1
				get_event_data(C_CHAOTIC_FOOD_DISTRIBUTION).area = -1
				get_event_data(C_CHAOTIC_FOOD_DISTRIBUTION).removed_depot = -1
			},
			on_prompt() {
				if (has_depot_on_map(FRANCE)) {
					switch(get_event_step(C_CHAOTIC_FOOD_DISTRIBUTION)) {
					case -1:
						prompt_card(C_CHAOTIC_FOOD_DISTRIBUTION, "Remove a French depot from map.")
						for (let depot = get_first_depot(R); depot <= get_last_depot(R); ++depot)
							if (is_depot_on_map(depot))
								action_depot(depot)
						return
					case 0:
						if (has_exhausted_sp(R, get_event_data(C_CHAOTIC_FOOD_DISTRIBUTION).area)) {
							prompt_card(C_CHAOTIC_FOOD_DISTRIBUTION, `Rally an exhausted SP at ${format_area(get_event_data(C_CHAOTIC_FOOD_DISTRIBUTION).area)}.`)
							for (let type of get_all_exhausted_sp_types(R, get_event_data(C_CHAOTIC_FOOD_DISTRIBUTION).area))
								action_troop_alt(type, get_event_data(C_CHAOTIC_FOOD_DISTRIBUTION).area)
						} else {
							prompt_card(C_CHAOTIC_FOOD_DISTRIBUTION, `No exhausted SPs at ${format_area(get_event_data(C_CHAOTIC_FOOD_DISTRIBUTION).area)} to rally.`)
							button_next()
						}
						button_undo()
						return
					case 1:
						prompt_card(C_CHAOTIC_FOOD_DISTRIBUTION, "Draw a card to your hand.")
						button_draw()
						button_undo()
						return
					}
				} else {
					prompt_card(C_CHAOTIC_FOOD_DISTRIBUTION, "All done.")
					button_confirm()
				}
			},
			on_depot(depot) {
				get_event_data(C_CHAOTIC_FOOD_DISTRIBUTION).area = get_depot_location(depot)
				get_event_data(C_CHAOTIC_FOOD_DISTRIBUTION).removed_depot = depot
				G.depots[depot] = POOL
				increment_event_tracker(C_CHAOTIC_FOOD_DISTRIBUTION)
			},
			on_troop(type) {
				rally_troop(R, get_event_data(C_CHAOTIC_FOOD_DISTRIBUTION).area, type)
				get_event_data(C_CHAOTIC_FOOD_DISTRIBUTION).troop_type = type
				increment_event_tracker(C_CHAOTIC_FOOD_DISTRIBUTION)
			},
			on_next() {
				increment_event_tracker(C_CHAOTIC_FOOD_DISTRIBUTION)
			},
			on_draw() {
				// Handling here since another must-play could be drawn
				log_must_play_event(C_CHAOTIC_FOOD_DISTRIBUTION, get_event_data(C_CHAOTIC_FOOD_DISTRIBUTION).area)
				discard_or_remove_card(C_CHAOTIC_FOOD_DISTRIBUTION)
				draw_a_card(R)
			},
			on_confirm() {
				log_must_play_event(C_CHAOTIC_FOOD_DISTRIBUTION, "no effect")
				discard_or_remove_card(C_CHAOTIC_FOOD_DISTRIBUTION)
				end_local_state(R)
			},
			on_undo() {
				if (get_event_step(C_CHAOTIC_FOOD_DISTRIBUTION) === 0) {
					G.depots[get_event_data(C_CHAOTIC_FOOD_DISTRIBUTION).removed_depot] = get_event_data(C_CHAOTIC_FOOD_DISTRIBUTION).area
					get_event_data(C_CHAOTIC_FOOD_DISTRIBUTION).area = -1
					get_event_data(C_CHAOTIC_FOOD_DISTRIBUTION).removed_depot = -1
				} else {
					if (get_event_data(C_CHAOTIC_FOOD_DISTRIBUTION).troop_type > -1) {
						exhaust_sp(R, get_event_data(C_CHAOTIC_FOOD_DISTRIBUTION).area, get_event_data(C_CHAOTIC_FOOD_DISTRIBUTION).troop_type - 1)
						get_event_data(C_CHAOTIC_FOOD_DISTRIBUTION).troop_type = -1
					}
				}
				decrement_event_tracker(C_CHAOTIC_FOOD_DISTRIBUTION)
			}
		},
	},
	prompt() 		{ this.states[L.state[R]].on_prompt() },
	draw() 		{ this.states[L.state[R]].on_draw() },
	confirm() 		{ this.states[L.state[R]].on_confirm() },
	next() 		{ this.states[L.state[R]].on_next() },
	exhaust()		{ this.states[L.state[R]].on_exhaust() },
	eliminate_2()	{ this.states[L.state[R]].on_eliminate_2() },
	area(area) 		{ this.states[L.state[R]].on_area(area) },
	card(card) 		{ this.states[L.state[R]].on_card(card)},
	depot(depot) 	{ this.states[L.state[R]].on_depot(depot)},
	leader(leader) 	{ this.states[L.state[R]].on_leader(leader) },
	troop(type) 	{ this.states[L.state[R]].on_troop(type) },
	done() 		{ this.states[L.state[R]].on_done() },
	undo() 		{ this.states[L.state[R]].on_undo() },
	finish_state() {
		if (--L.num_cards_to_draw[R] > 0) {
			goto_local_state(R, "draw_card")
			return
		}

		// If France just finished (in a multi-active situation), and Russia has confimed drawing Holy Mother Russia, adjust France's local state.
		if (R === FRANCE && map_has(L.event_tracker, C_HOLY_MOTHER_RUSSIA_RU) && (get_event_step(C_HOLY_MOTHER_RUSSIA_RU) === 1)) {
			goto_local_state(FRANCE, "holy_mother_russia_ru")
			return
		}

		if (Array.isArray(G.active))
			set_delete(G.active, R)

		// Check R === FRANCE since we want France to have performed the last action.
		// G.active is set to FRANCE in a single-active situation when Russia draws Holy Mother Russia.
		if (
			(!Array.isArray(G.active) && (!set_has(L.persistent_events, C_HOLY_MOTHER_RUSSIA_RU) || R === FRANCE))
			|| G.active.length === 0
		) {
			for (let card of L.persistent_events) {
				if (card === C_HOLY_MOTHER_RUSSIA_RU)
					add_persistent_event(card, { key: get_event_data(C_HOLY_MOTHER_RUSSIA_RU).key })
				else
					add_persistent_event(card)
			}
			end()
		}
	}
}

//=== PLAY A CARD FOR ADDITIONAL ORDERS ===
P.play_card_for_additional_orders = script(`
	eval { log_h2("Play a Card for Orders") }
	set G.active [RUSSIA, FRANCE]
	call play_card_for_orders

	eval {
		log_h2("Play Events")
		L.initiative = get_who_has_initiative()
	}
	set G.active (1 - L.initiative)
	call play_events_with_ops_card
	set G.active L.initiative
	call play_events_with_ops_card
`)

function commit_card(card) {
	set_add(G.committed_cards[get_card_owner(card)], card)
}

function reveal_committed_cards(player, add_to_table = false) {
	for (let card of G.committed_cards[player]) {
		if (add_to_table)
			set_add(G.played_cards[player], card)
	}
	set_clear(G.committed_cards[player])
}

P.play_card_for_orders = {
	_begin() {
		L.played_card = [-1, -1]
		L.ops_played = [-1, -1]
	},
	prompt() {
		if (L.played_card[R] === -1) {
			V.prompt = `Play a card for additional orders, or play a Dummy.`
			get_hand(R).forEach(action_card)
		} else {
			V.prompt = `You played ${format_card(L.played_card[R])} for ${L.ops_played[R]} additional orders.`
			action_card(L.played_card[R])
			button_confirm()
			button_undo()
		}
	},
	card(card) {
		if (L.played_card[R] === -1) {
			L.played_card[R] = card
			L.ops_played[R] = get_card_ops(card)
			commit_card(card)
			discard_card(card)
		} else {
			this.undo()
		}
	},
	undo() {
		add_to_hand(R, L.played_card[R])
		set_delete(G.committed_cards[R], L.played_card[R])
		set_delete(G.discard[R], L.played_card[R])

		L.played_card[R] = -1
		L.ops_played[R] = -1
	},
	confirm() {
		set_delete(G.active, R)

		if (G.active.length === 0) {
			for (let who = RUSSIA; who <= FRANCE; ++who) {
				if (is_card_dummy(L.played_card[who]))
					return_dummy_to_hand(who)
				else
					discard_card(L.played_card[who])
				reveal_committed_cards(who)
				log(`${format_card(L.played_card[who])}: +${L.ops_played[who]} orders`)
			}

			G.additional_orders = L.ops_played
			end()
		}
	}
}

/*
	Events:
		RUSSIA
			#1:  Well-Disciplined Retreat
			#3:  Opolchenie
			#10: Scorched Earth
			#13: Garrison Troops
			#15: Pride and Hesitation
			#16: Kutuzov Appointed
			#17: The Finland Corps
			#18: Treaty of Bucharest
			#19: The Czar Leaves the Army

		FRANCE
			#1:  Hard Marching
			#2:  Hard Marching
			#3:  War Weariness
			#4:  Holy Mother Russia
			#5:  Polish Support
			#15: Peace Offer
			#17: Davout Takes Command
			#19: IX Corps Arrives
			#20: XI Corps Arrives
*/

// Figure out a way to put these cards in the data.
P.play_events_with_ops_card = {
	_begin() {
		L.events = [
			[C_WELL_DISCIPLINED_RETREAT, C_OPOLCHENIE, C_SCORCHED_EARTH, C_GARRISON_TROOPS, C_PRIDE_AND_HESITATION, C_KUTUZOV_APPOINTED, C_THE_FINLAND_CORPS, C_TREATY_OF_BUCHAREST, C_THE_CZAR_LEAVES_THE_ARMY],
			[C_HARD_MARCHING_1, C_HARD_MARCHING_2, C_WAR_WEARINESS, C_HOLY_MOTHER_RUSSIA_FR, C_POLISH_SUPPORT, C_PEACE_OFFER, C_DAVOUT_TAKES_COMMAND, C_IX_CORPS_ARRIVES, C_XI_CORPS_ARRIVES],
		]
		L.events_could_be_played = L.events[G.active].filter(card => can_play_event(card) && hand_has(G.active, card))
		L.has_played_event = false
	},
	prompt() {
		if (L.events_could_be_played.length > 0) {
			V.prompt = `Declare any events to be played with your OPs card, or pass.`
			L.events_could_be_played.forEach(card => action_card(card))
			button_pass()
		} else {
			if (L.has_played_event)
				V.prompt = `Play Events with OPs card — All done.`
			else
				V.prompt = `You do not have any events that can be played with your OPs card.`
			button_done()
		}
	},
	card(card) {
		push_undo()
		array_delete_item(L.events_could_be_played, card)
		L.has_played_event = true
		call("event", { card: card })
	},
	pass() {
		if (!L.has_played_event)
			log(`${ROLES[G.active]} did not play events.`)
		end()
	},
	done() { this.pass() }
}

//=== 3. CHOOSE ORDERS ===
function calculate_num_orders() {
	// Each player has two free orders by default
	var orders = [2, 2]

	// And some additional orders based on the OPs value of their committed card
	orders[RUSSIA] += G.additional_orders[RUSSIA]
	orders[FRANCE] += G.additional_orders[FRANCE]

	// RU #11: Holy Mother Russia -- Russia +2 orders
	if (is_event_active(C_HOLY_MOTHER_RUSSIA_RU)) {
		orders[RUSSIA] += 2
	}

	// RU #14: Extreme Weather -- France -2 orders
	if (is_event_active(C_EXTREME_WEATHER_RU)) {
		orders[FRANCE] = Math.max(0, orders[FRANCE] - 2)
	}

	// FR #42: Extreme Weather -- Both sides -2 orders
	if (is_event_active(C_EXTREME_WEATHER_FR)) {
		orders[RUSSIA] = Math.max(0, orders[RUSSIA] - 2)
		orders[FRANCE] = Math.max(0, orders[FRANCE] - 2)
	}

	return orders
}

function find_forbidden_orders(who) {
	let forbidden_orders = []

	// RU #45 Poor Logistics -- Russia may not use 'Place Depot' orders.
	if (who === RUSSIA && is_event_active(C_POOR_LOGISTICS))
		set_add(forbidden_orders, PLACE_DEPOT)

	// FR #41 Freezing Weather -- France may not use 'Place Depot' or 'Forage' orders.
	if (who === FRANCE && is_event_active(C_FREEZING_WEATHER)) {
		set_add(forbidden_orders, PLACE_DEPOT)
		set_add(forbidden_orders, FORAGE)
	}

	// FR #42 Extreme Weather -- Neither side may use 'Forced March' orders.
	if (is_event_active(C_EXTREME_WEATHER_FR))
		set_add(forbidden_orders, FORCED_MARCH)

	return forbidden_orders
}

function is_order_forbidden(who, type) {
	return set_has(find_forbidden_orders(who), type)
}

/*
	Choose Orders
	Current order of selection: (mainly so that players are able to pick all the specified orders before moving to freely selectable ones)

	Apply leader abilities first:
		Platov - may select a free 'Cossack Raid' or 'Evade' order

	Then orders limited to a specific type:
		Basic free orders -
			Russia - 1 Cavalry Patrols
			France - 1 Forage

		Optional rule (Superior Staff Officers) -
			France - 1 Cavalry Patrols

		Dummy orders -
			Russia - 4 Dummy orders
			France - 4 Dummy orders

		French Logistic Preparations (special rule for June 5 only) -
			France - 1 Place Depot, 1 March

		Events
			RU #10 Scorched Earth:
				Russia - 1 Evade order
			RU #16 Kutuzov Appointed:
				Russia - 1 Rally order
			FR #1 Hard Marching:
			FR #2 Hard Marching:
				France - 1 Forced March order per card

	Then orders that may be selected among any of the remaining options.
		Basic:
			Russia - 2 orders
			France - 2 orders

		Committed card:
			Russia - X orders (1-4 depending on card committed)
			France - X orders (1-4 depending on card committed)

		Events -
			RU #11 Holy Mother Russia
				Russia: +2 orders
			RU #14 Extreme Weather
				France: -2 orders
			FR #42 Extreme Weather
				Russia: -2 orders
				France: -2 orders

	Some orders may not be used during a turn (dictated by events), but can be selected (and used as a Dummy).
	TODO: Add warnings for this.
*/

function does_receive_platov_free_order(player) {
	return player === RUSSIA && is_leader_on_map(L_PLATOV)
}

function does_receive_superior_staff_officers_free_order(player) {
	return is_superior_staff_officers()
		&& player === FRANCE
		&& get_current_season() === SUMMER
		&& is_leader_on_map(L_NAPOLEON)
		&& is_area_in_supply(FRANCE, get_leader_location(L_NAPOLEON))
}

function is_french_logistic_preparations(player) {
	return player === FRANCE && get_current_turn() === JUNE_5
}

function generate_select_order_actions(who, types) {
	if (typeof types === 'number') types = [ types ]

	for (let order = get_first_order(who); order <= get_last_order(who); ++order) {
		if (
			get_order_location(order) === POOL
			&& !G.selected_orders[who].includes(order)
			&& types.includes(get_order_type(order))
		) {
			action_order(order)
		}
	}
}

function select_order(order, snapshot = true, advance_state = true) {
	if (snapshot)
		push_local_undo(R, "select_order")
	G.selected_orders[R].push(order)
	if (advance_state)
		advance_local_state(R)
}

P.select_orders = {
	_begin() {
		G.active = [RUSSIA, FRANCE]
		log_h2("Select Orders")

		// Number of orders that a player may freely select.
		L.num_orders = calculate_num_orders()

		// Reset trackers
		G.selected_orders = [[], []]
		G.platov_order = -1
		G.superior_staff_officers_order = -1

		// Local state
		L.state = [null, null]
		advance_local_state(RUSSIA)
		advance_local_state(FRANCE)

		// Local undo stack
		// Could optimize memory if necessary by using a trimmed down version of the standard local undo.
		L.undo = [[], []]

		// Generic properties
		L.count = [0, 0]
		L.already_selected_orders = [[], []]
	},
	states: {
		// Platov gives Russia a free Cossack Raid or Evade order each turn so long as he is on map.
		"select_free_order_platov": {
			eligible(player) { return does_receive_platov_free_order(player) },
			on_prompt() {
				prompt_leader(L_PLATOV, `Select a Cossack Raid or Evade order. This order would be placed in ${format_area(get_leader_location(L_PLATOV))}.`)
				generate_select_order_actions(R, [EVADE, COSSACK_RAID])
			},
			on_order(order) {
				push_local_undo(R, "select_platov_order")
				G.platov_order = order
				select_order(order, false)
			},
		},
		// Russia gets a Cavalry Patrols order by default
		"select_basic_free_order_ru": {
			eligible(player) { return player === RUSSIA },
			on_prompt() {
				V.prompt = `Select basic order: 1 Cavalry Patrols.`
				generate_select_order_actions(R, CAVALRY_PATROLS)
			},
			on_order(order) { select_order(order) },
		},
		// France gets a Forage order by default
		"select_basic_free_order_fr": {
			eligible(player) { return player === FRANCE },
			on_prompt() {
				V.prompt = `Select basic order: 1 Forage.`
				generate_select_order_actions(R, FORAGE)
			},
			on_order(order) { select_order(order) },
		},
		// Superior Staff Officers optional rule: France gets a Cavalry Patrols order in Napoléon's location in Summer.
		"superior_staff_officers": {
			eligible(player) {
				return does_receive_superior_staff_officers_free_order(player)
			},
			on_prompt() {
				V.prompt = `Superior Staff Officers: Select a Cavalry Patrols order. This order would be placed in ${format_area(get_leader_location(L_NAPOLEON))}.`
				generate_select_order_actions(R, CAVALRY_PATROLS)
			},
			on_order(order) {
				push_local_undo(R, "select_superior_staff_officers_order")
				G.superior_staff_officers_order = order
				select_order(order, false)
			}
		},
		// Each player must select 4 Dummy orders.
		"select_dummy_orders": {
			eligible(_) { return true },
			on_begin() {
				L.count[R] = 4
			},
			on_prompt() {
				V.prompt = `Select dummy orders: ${L.count[R]} remaining.`
				generate_select_order_actions(R, DUMMY_ORDER)
			},
			on_order(order) {
				push_local_undo(R, "select_dummy_order")
				select_order(order, false, --L.count[R] === 0)
			},
		},
		// French Logistic Preparations: France gets a free March and Place Depot order.
		"french_logistic_preparations": {
			eligible(player) { return is_french_logistic_preparations(player) },
			on_begin() {
				L.already_selected_orders[R].length = 0
			},
			on_prompt() {
				if (L.already_selected_orders[R].length === 0) {
					V.prompt = `French Logistic Preparations: Select 1 Place Depot and 1 March order.`
					generate_select_order_actions(R, [MARCH, PLACE_DEPOT])
				} else {
					let unselected_order = set_has(L.already_selected_orders[R], MARCH) ? PLACE_DEPOT : MARCH
					V.prompt = `French Logistic Preparations: Select 1 ${get_order_type_name(unselected_order)} order.`
					generate_select_order_actions(R, unselected_order)
				}
			},
			on_order(order) {
				let type = get_order_type(order)
				push_local_undo(R, "select_french_logistic_preparations_order", { type })
				set_add(L.already_selected_orders[R], type)
				select_order(order, false, L.already_selected_orders[R].length === 2)
			},
		},
		// Free orders from events.
		// RU #10 Scorched Earth: Russia receives a free Evade order.
		"scorched_earth": {
			eligible(player) { return player === RUSSIA && is_event_active(C_SCORCHED_EARTH) },
			on_prompt() {
				prompt_card(C_SCORCHED_EARTH, `Select a free Evade order.`)
				generate_select_order_actions(R, EVADE)
			},
			on_order(order) { select_order(order) },
		},
		// RU #16 Kutuzov Appointed: Russia receives a free Rally order.
		"kutuzov_appointed": {
			eligible(player) { return player === RUSSIA && is_event_active(C_KUTUZOV_APPOINTED) },
			on_prompt() {
				prompt_card(C_KUTUZOV_APPOINTED, `Select a free Rally order.`)
				generate_select_order_actions(R, RALLY)
			},
			on_order(order) { select_order(order) },
		},
		// FR #1 Hard Marching: France receives a free Forced March order.
		"hard_marching_1": {
			eligible(player) { return player === FRANCE && is_event_active(C_HARD_MARCHING_1) },
			on_prompt() {
				prompt_card(C_HARD_MARCHING_1, `Select a free Forced March order.`)
				generate_select_order_actions(R, FORCED_MARCH)
			},
			on_order(order) { select_order(order) },
		},
		// FR #2 Hard Marching: France receives a free Forced March order.
		"hard_marching_2": {
			eligible(player) { return player === FRANCE && is_event_active(C_HARD_MARCHING_2) },
			on_prompt() {
				prompt_card(C_HARD_MARCHING_2, `Select a free Forced March order.`)
				generate_select_order_actions(R, FORCED_MARCH)
			},
			on_order(order) { select_order(order) },
		},
		"select_orders_main": {
			eligible(_) { return true },
			on_begin() {
				L.count[R] = L.num_orders[R]
			},
			on_prompt() {
				if (L.count[R] > 0) {
					V.prompt = `Select ${L.count[R]} more orders.`
					for (let order = get_first_order(R); order <= get_last_order(R); ++order) {
						if (get_order_location(order) === POOL && !G.selected_orders[R].includes(order))
							action_order(order)
					}
				} else {
					V.prompt = `Select orders: All done.`
					button_confirm()
				}
			},
			on_order(order) {
				push_local_undo(R, "select_order_main")
				--L.count[R]
				select_order(order, false, false)
			},
			on_confirm() { end_local_state(R) },
		}
	},
	prompt() {
		this.states[L.state[R]].on_prompt()
		button_undo(L.undo[R].length > 0)
	},
	undo() {
		let undo = L.undo[R].pop()

		G.selected_orders[R].pop()
		if (L.state[R] !== undo.state) {
			L.state[R] = undo.state
			if (undo.state === "select_dummy_orders")
				L.count[R] = 0
		}

		if (undo.action === "select_platov_order")
			G.platov_order = -1
		else if (undo.action === "select_superior_staff_officers_order")
			G.superior_staff_officers_order = -1
		else if (undo.action === "select_dummy_order" || undo.action === "select_order_main")
			++L.count[R]
		else if (undo.action === "select_french_logistic_preparations_order")
			set_delete(L.already_selected_orders[R], undo.info.type)
	},
	finish_state() {
		set_delete(G.active, R)
		log(`${ROLES[R]} selected ${G.selected_orders[R].length} orders.`)
		if (G.active.length === 0)
			end()
	},
	order(order) 	{ this.states[L.state[R]].on_order(order) },
	confirm()		{ this.states[L.state[R]].on_confirm() },
}

// === PLACE ORDERS ===
// TODO: Allow alternating placing orders (implementing simultaneous optional rule as default for expediency)
// Alternating would be simple to program (since it would be single active), but would slow things down a LOT.
P.place_orders = script(`
	eval { log_h2("Place Orders") }

	set G.active FRANCE
	if (is_event_active(C_COMMAND_FRICTION)) {
		call command_friction
	}
	call begin_place_orders_events

	set G.active [RUSSIA, FRANCE]
	call do_place_orders

	set G.active RUSSIA
	if (is_event_active(C_POOR_COMMUNICATIONS)) {
		call poor_communications
	}
	goto end_place_orders_events
`)

P.begin_place_orders_events = {
	_begin() {
		L.events = [C_INFIGHTING_AND_INTRIGUE, C_LETHARGIC_PURSUIT].filter(card => can_play_event(card) && hand_has(G.active, card))
	},
	prompt() {
		if (L.events.length > 0) {
			V.prompt = `You may play ${join_array_with_or(L.events.map(card => `${format_card(card)}`))}.`
			L.events.forEach(action_card)
			if (L.events.length === 1)
				button("play")
			button_pass()
		} else {
			V.prompt = `Play Events — All done.`
			button_confirm()
		}
	},
	play() { this.card(L.events[0]) },
	pass() { this.confirm() },
	confirm() { end() },
	card(card) {
		push_undo()
		set_delete(L.events, card)
		call("event", { card })
	}
}

function do_place_order(player, area, snapshot = true) {
	if (snapshot)
		push_local_undo(player, "place_order", { order: L.selected_order[player], area })
	place_order(L.selected_order[player], area)
	cleanup_order(player)
}

function cleanup_order(player) {
	array_delete_item(L.orders_to_place[player], L.selected_order[player])
	set_add(L.orders_placed[player], L.selected_order[player])
	L.selected_order[player] = -1
	G.selected_orders[player].length = 0

	if (L.orders_to_place[player].length > 0)
		goto_local_state(player, "select_next_order")
	else
		goto_local_state(player, "all_done")
}

function undo_cleanup_order(player, order) {
	L.orders_to_place[player].push(order)
	set_delete(L.orders_placed[player], order)
	L.selected_order[player] = order
	G.selected_orders[player].push(order)
}

P.do_place_orders = {
	_begin() {
		L.orders_to_place = [G.selected_orders[RUSSIA].slice(), G.selected_orders[FRANCE].slice()]
		L.orders_placed = [[], []]
		L.selected_order = [-1, -1]
		G.selected_orders = [[], []]

		L.state = ["select_next_order", "select_next_order"]
		L.undo = [[], []]

		L.has_placed_platov_order = is_leader_on_map(L_PLATOV) ? false : true
		L.has_placed_superior_staff_officers_order = is_leader_on_map(L_NAPOLEON) ? false : true
		L.has_discarded_card = false
	},
	states: {
		"select_next_order": {
			on_prompt() {
				if (!L.has_placed_platov_order && does_receive_platov_free_order(R)) {
					prompt_leader(L_PLATOV, `Select an ${get_order_name(G.platov_order)} order.`)
					action_order(G.platov_order)
				} else if (!L.has_placed_superior_staff_officers_order && does_receive_superior_staff_officers_free_order(R)) {
					V.prompt = `Superior Staff Officers: Select a Cavalry Patrols order.`
					action_order(G.superior_staff_officers_order)
				} else {
					V.prompt = `Select next order to place. (${L.orders_to_place[R].length} remaining)`
					L.orders_to_place[R].forEach(action_order)
				}
			},
			on_order(order) {
				push_local_undo(R, "select_next_order", { order })
				L.selected_order[R] = order
				G.selected_orders[R].push(order) // Using existing client logic to highlight orders.
				goto_local_state(R, "place_order")
			}
		},
		"place_order": {
			on_prompt() {
				if (!L.has_placed_platov_order && does_receive_platov_free_order(R)) {
					if (is_event_active(C_COMMAND_FRICTION) && get_event_keyword(C_COMMAND_FRICTION, "area") === get_leader_location(L_PLATOV) && !has_card_in_hand(R)) {
						prompt_card(C_COMMAND_FRICTION, `Cannot place an order at ${format_area(get_leader_location(L_PLATOV))}.`)
						button_next()
					} else {
						V.prompt = `Place ${get_order_name(G.platov_order)} with ${format_leader(L_PLATOV)} at ${format_area(get_leader_location(L_PLATOV))}.`
						action_area(get_leader_location(L_PLATOV))
					}
				} else if (!L.has_placed_superior_staff_officers_order && does_receive_superior_staff_officers_free_order(R)) {
					V.prompt = `Place ${get_order_name(G.superior_staff_officers_order)} with ${format_leader(L_NAPOLEON)} at ${format_area(get_leader_location(L_NAPOLEON))}.`
					action_area(get_leader_location(L_NAPOLEON))
				} else {
					// French Logistic Preparations special rule.
					// France may place a Place Depot order in Kovno, even though they do not have SPs there yet.
					if (is_french_logistic_preparations(R) && get_order_type(L.selected_order[R]) === PLACE_DEPOT) {
						V.prompt = `French Logistic Preparations: You may place ${get_order_name(L.selected_order[R])} in any area with friendly SPs, or ${format_area(S_KOVNO)}.`
						action_area(S_KOVNO)
					} else {
						V.prompt = `Select an area with friendly SPs to place ${get_order_name(L.selected_order[R])}.`
					}
					get_areas_with_sps(R).forEach(action_area)
				}
			},
			on_next() {
				push_local_undo(R, "next", { order: L.selected_order[R] })
				L.has_placed_platov_order = true
				cleanup_order(R)
			},
			on_area(area) {
				if (R === RUSSIA && is_event_active(C_COMMAND_FRICTION) && get_event_keyword(C_COMMAND_FRICTION, "area") === area && !L.has_discarded_card) {
					goto_local_state(R, "command_friction_discard_card")
				} else {
					if (!L.has_placed_platov_order && does_receive_platov_free_order(R))
						L.has_placed_platov_order = true
					else if (!L.has_placed_superior_staff_officers_order && does_receive_superior_staff_officers_free_order(R))
						L.has_placed_superior_staff_officers_order = true
					do_place_order(R, area)
				}
			},
		},
		"command_friction_discard_card": {
			on_prompt() {
				if (has_card_in_hand(R)) {
					prompt_card(C_COMMAND_FRICTION, `You must discard a card to place orders at ${format_area(get_event_keyword(C_COMMAND_FRICTION, "area"))}.`)
					get_non_dummy_cards_in_hand(R).forEach(action_card)
				} else {
					prompt_card(C_COMMAND_FRICTION, "No cards in hand to discard.")
					button_pass()
				}
			},
			on_card(card) {
				push_local_undo(R, "discard", { card, order: L.selected_order[R], area: get_event_keyword(C_COMMAND_FRICTION, "area") })
				discard_card(card)
				L.has_discarded_card = true
				do_place_order(R, get_event_keyword(C_COMMAND_FRICTION, "area"), false)
			},
			on_pass() {
				P[L.P].undo()
			},
		},
		"all_done": {
			on_prompt() {
				V.prompt = `Place Orders: All done.`
				button_confirm()
			},
			on_confirm() { end_local_state(R) },
		}
	},
	prompt() {
		this.states[L.state[R]].on_prompt()
		button_undo(L.undo[R].length > 0)
	},
	undo() {
		let undo = L.undo[R].pop()

		if (L.state[R] !== undo.state)
			L.state[R] = undo.state

		switch(undo.action) {
		case "select_next_order":
			L.selected_order[R] = -1
			G.selected_orders[R].pop()
			return
		case "next":
			L.has_placed_platov_order = false
			undo_cleanup_order(R, undo.info.order)
			return
		case "discard":
			add_to_hand(R, undo.info.card)
			set_delete(get_discard(R), undo.info.card)
			L.has_discarded_card = false
		// Intended fallthrough since an order is placed immediately after discarding
		case "place_order":
			if (R === RUSSIA && L.has_placed_platov_order && undo.info.order === G.platov_order)
				L.has_placed_platov_order = false
			else if (R === FRANCE && L.has_placed_superior_staff_officers_order && undo.info.order === G.superior_staff_officers_order)
				L.has_placed_superior_staff_officers_order = false

			remove_order(undo.info.order)
			undo_cleanup_order(R, undo.info.order)

			return
		}
	},
	order(order) 	{ this.states[L.state[R]].on_order(order) },
	area(area) 		{ this.states[L.state[R]].on_area(area) },
	card(card) 		{ this.states[L.state[R]].on_card(card) },
	pass()			{ this.states[L.state[R]].on_pass() },
	next()			{ this.states[L.state[R]].on_next() },
	confirm() 		{ this.states[L.state[R]].on_confirm() },
	finish_state() {
		set_delete(G.active, R)
		if (G.active.length === 0)
			end()
	},
	_end() {
		let orders_by_area = []
		for (let who = RUSSIA; who <= FRANCE; ++who) {
			for (let order of L.orders_placed[who])
				set_add(map_get_set(orders_by_area, get_order_location(order)), order)
		}
		log("Placed")
		map_for_each(orders_by_area, (area, entries) => {
			if (entries.some(o => get_order_owner(o) === RUSSIA))
				log_only(RUSSIA, format_i(format_area(area)))
			if (entries.some(o => get_order_owner(o) === FRANCE))
				log_only(FRANCE, format_i(format_area(area)))
			for (let order of entries)
				log_only(get_order_owner(order), format_ii(get_order_name(order)))
		})
	}
}

P.end_place_orders_events = {
	_begin() {
		L.events = [C_NEW_POSTING, C_EXHAUSTED_HORSES, C_DISORDERLY_MARCH].filter(card => can_play_event(card) && hand_has(G.active, card))
	},
	prompt() {
		if (L.events.length > 0) {
			V.prompt = `You may play ${join_array_with_or(L.events.map(card => `${format_card(card)}`))}.`
			L.events.forEach(action_card)
			if (L.events.length === 1)
				button("play")
			button_pass()
		} else {
			V.prompt = `Play Events — All done.`
			button_confirm()
		}
	},
	play() { this.card(L.events[0]) },
	pass() { this.confirm() },
	confirm() { end() },
	card(card) {
		push_undo()
		set_delete(L.events, card)
		call("event", { card })
	}
}

// === COMMON ORDER EXECUTION STATES ===

/* CHANGE ORDERS */
/*
	Napoléon 			May change any order to any order.
	Davout 			May change an order to March.
	Schwarzenberg		May discard a card to place an Evade order during that step.

	Kutuzov			May change any order to Rally.
	de Tolly			May change an order to Evade.
	Bagration			May change an order to Defend.
	Chichagov			May discard a card to place a Forced March order during that step.
*/

// Though not in the rules, Brian has noted on multiple BGG forums that each leader may only change one order per turn.
function mark_ability_used(leader) {
	set_delete(L.leaders_who_can_use_abilities[R], leader)
	G.abilities_used |= (1 << leader)
}

// For undo
function mark_ability_unused(leader) {
	set_add(L.leaders_who_can_use_abilities[R], leader)
	G.abilities_used &= ~(1 << leader)
}

function is_leader_ability_used(leader) {
	return !!(G.abilities_used & (1 << leader))
}

function can_change_order_to(leader, current_type, type_to, area) {
	// The current order execution phase MUST be before the order that the leader is eligible to change to.
	// The leader must have an order of the current type in the area.
	// There must be an order of the target type in the pool.
	return current_type < type_to
	&& has_order_of_type(get_leader_faction(leader), current_type, area)
	&& has_order_of_type(get_leader_faction(leader), type_to, POOL)
}

function can_discard_card_to_place(leader, current_type, type_to) {
	// The current type MUST be the same as the target type (Forced March for Chichagov, Evade for Schwarzenberg).
	// The player must have a discardable card in hand.
	// The player must have an order of the target type in their pool.
	return current_type === type_to
	&& has_card_in_hand(get_leader_faction(leader))
	&& has_order_of_type(get_leader_faction(leader), type_to, POOL)
}

function can_change_order(leader, current_type) {
	if (
		is_leader_ability_used(leader)
		|| !is_leader_on_map(leader)
		|| !is_seniormost_leader(leader, get_leader_location(leader))
	) {
		return false
	}

	let area = get_leader_location(leader)

	switch(leader) {
	// May change an order to Rally.
	case L_KUTUZOV:
		return can_change_order_to(L_KUTUZOV, current_type, RALLY, area)
	// May change an order to Evade.
	case L_DE_TOLLY:
		return can_change_order_to(L_DE_TOLLY, current_type, EVADE, area)
	// May change an order to Defend.
	case L_BAGRATION:
		return can_change_order_to(L_BAGRATION, current_type, DEFEND, area)
	// May discard a card to place a Forced March order in that order´s step.
	case L_CHICHAGOV:
		return can_discard_card_to_place(L_CHICHAGOV, current_type, FORCED_MARCH)
	// May change an order to ANY order.
	case L_NAPOLEON:
		// RU #7 Indecision: Napoléon may not change orders for the duration of the turn.
		if (is_event_active(C_INDECISION))
			return false
		return (has_order_of_type(FRANCE, current_type, area) && has_switchable_order_in_pool(FRANCE, current_type))
		|| (has_non_dummy_order_at_area(FRANCE, area) && get_orders_at_area(FRANCE, area).some(order => get_order_type(order) !== current_type && get_order_type(order) !== DUMMY_ORDER) && has_order_of_type(FRANCE, current_type, POOL))
	// May change an order to March.
	case L_DAVOUT:
		return can_change_order_to(L_DAVOUT, current_type, MARCH, area)
	// May discard a card to place an Evade order during that order´s step.
	case L_SCHWARZENBERG:
		return can_discard_card_to_place(L_SCHWARZENBERG, current_type, EVADE)
	}
}

function prompt_change_order(leader, type) {
	prompt_leader(leader, `Change an order at ${format_area(get_leader_location(leader))} to ${get_order_type_name(type)}.`)
}

function generate_change_order_actions(leader, current_type, type) {
	// If the order that the leader could change to would occur AFTER the execution of the current type,
	// the leader may change any orders of the current type to the future type that he is eligible to change to.
	// Example: Kutuzov can change a Defend order to a Rally order prior to resolving battles.
	if (current_type < type) {
		get_orders_at_area(R, get_leader_location(leader))
			.filter(order => get_order_type(order) === current_type)
			.forEach(action_order)
	}
}

function change_order(leader, order, type_to) {
	remove_order(order)
	let replacement = add_order_of_type_from_pool(R, type_to, get_leader_location(leader))
	push_local_undo(R, "change_order", { leader, removed: order, placed: replacement })
	mark_ability_used(leader)

	// If changing an order with Napoléon, France needs to see the warning for RU #7 Indecision.
	if (leader === L_NAPOLEON) {
		L.napoleon_change.removed = order
		L.napoleon_change.placed = replacement
	} else {
		if (L.leaders_who_can_use_abilities[R].length === 0)
			goto_local_state(R, "all_done")
		else
			goto_local_state(R, "select_next_leader")
	}
}

function prompt_discard_card_to_place(leader, type_to, has_discarded) {
	if (!has_discarded)
		prompt_leader(leader, `Discard a card to place a ${get_order_type_name(type_to)} order.`)
	else
		prompt_leader(leader, `Place a ${get_order_type_name(type_to)} order at ${format_area(get_leader_location(leader))}.`)
}

function generate_discard_card_to_place_actions(leader, type_to, has_discarded) {
	if (!has_discarded) {
		get_non_dummy_cards_in_hand(get_leader_faction(leader)).forEach(action_card)
	} else {
		get_orders_at_area(get_leader_faction(leader), POOL)
			.filter(order => get_order_type(order) === type_to)
			.forEach(action_order)
		action_area(get_leader_location(leader))
	}
}

function complete_place_order_after_discard(leader, order, area) {
	push_local_undo(R, "place_order", { order, area, leader })
	mark_ability_used(leader)
	if (L.leaders_who_can_use_abilities[R].length === 0)
		goto_local_state(R, "all_done")
	else
		goto_local_state(R, "select_next_leader")
}

P.change_orders = {
	_begin() {
		// L.current_type
		// Explicitly log the name of the current order type if the phase name doesn't match the order name.
		if (L.current_type === DEFEND || L.current_type === FORAGE)
			log_h3(`Change Orders – ${get_order_type_name(L.current_type)}`)
		else
			log_h3("Change Orders")

		// For expediency, only keep players who could change an order.
		// The leaders who can change orders are public.
		// We are somewhat leaking the identity of orders, but I don't think it reveals too much.
		G.active = []
		L.leaders_who_can_use_abilities = LEADERS_WHO_CAN_CHANGE_ORDERS.map(leaders => leaders.slice())
		for (let who = RUSSIA; who <= FRANCE; ++who) {
			L.leaders_who_can_use_abilities[who] = L.leaders_who_can_use_abilities[who].filter(leader => can_change_order(leader, L.current_type))
			if (L.leaders_who_can_use_abilities[who].length > 0)
				set_add(G.active, who)
			else
				log(`${ROLES[who]} did not change orders.`)
		}

		// Finish state if neither side could change an order.
		if (G.active.length === 0) {
			end()
			return
		}

		// Initialize local state and undo.
		L.state = ["select_next_leader", "select_next_leader"]
		L.undo = [[], []]

		// Generic trackers
		L.has_discarded = [false, false]

		// RU #7 Indecision can prevent Napoléon from changing orders during a turn.
		// This is done retroactively for expediency.
		L.napoleon_choice = null
		L.napoleon_change = {
			removed: -1,
			placed: -1,
		}
	},
	inactive: "change orders",
	states: {
		"select_next_leader": {
			on_begin() {
				L.leaders_who_can_use_abilities[R] = LEADERS_WHO_CAN_CHANGE_ORDERS[R].slice().filter(leader => can_change_order(leader, L.current_type))
				if (L.leaders_who_can_use_abilities[R].length === 0)
					goto_local_state(R, "all_done")
			},
			on_prompt() {
				V.prompt = `You may use leader abilities to change orders. (Available leaders: ${join_array_with_or(L.leaders_who_can_use_abilities[R].map(format_leader))})`
				L.leaders_who_can_use_abilities[R].forEach(action_leader)
				L.leaders_who_can_use_abilities[R].forEach(button_leader)
				button_pass()
			},
			on_leader_button(leader) { this.on_leader(leader) },
			on_leader(leader) {
				push_local_undo(R, "select_leader")
				goto_local_state(R, get_leader_short_name(leader).toLowerCase())
			},
			on_pass() { end_local_state(R) }
		},
		// May change any order to Rally.
		"kutuzov": {
			on_prompt() {
				prompt_change_order(L_KUTUZOV, RALLY)
				generate_change_order_actions(L_KUTUZOV, L.current_type, RALLY)
			},
			on_order(order) { change_order(L_KUTUZOV, order, RALLY) },
		},
		// May change any order to Evade.
		"tolly": {
			on_prompt() {
				prompt_change_order(L_DE_TOLLY, EVADE)
				generate_change_order_actions(L_DE_TOLLY, L.current_type, EVADE)
			},
			on_order(order) { change_order(L_DE_TOLLY, order, EVADE) },
		},
		// May change any order to Defend.
		"bagration": {
			on_prompt() {
				prompt_change_order(L_BAGRATION, DEFEND)
				generate_change_order_actions(L_BAGRATION, L.current_type, DEFEND)
			},
			on_order(order) { change_order(L_BAGRATION, order, DEFEND) },
		},
		// May discard a card to place a Forced March order during that order's step.
		"chichagov": {
			on_begin() { L.has_discarded[R] = false },
			on_prompt() {
				prompt_discard_card_to_place(L_CHICHAGOV, FORCED_MARCH, L.has_discarded[R])
				generate_discard_card_to_place_actions(L_CHICHAGOV, FORCED_MARCH, L.has_discarded[R])
			},
			on_card(card) {
				push_local_undo(R, "discard", { card })
				discard_card(card)
				L.has_discarded[R] = true
			},
			on_order(order) {
				place_order(order, get_leader_location(L_CHICHAGOV))
				complete_place_order_after_discard(L_CHICHAGOV, order, get_leader_location(L_CHICHAGOV))
			},
			on_area(area) {
				let order = add_order_of_type_from_pool(R, FORCED_MARCH, area)
				complete_place_order_after_discard(L_CHICHAGOV, order, area)
			},
		},
		// May change ANY order to ANY order.
		"napoleon": {
			on_begin() {
				L.napoleon_choice = null
				L.has_changed_order = false
			},
			on_prompt() {
				let area = get_leader_location(L_NAPOLEON)

				if (L.napoleon_choice === null) {
					V.prompt = `Change an order at ${format_area(area)} to any non-Dummy order.`

					// Napoléon may change an order of the current type to any upcoming order type.
					if (
						has_order_of_type(R, L.current_type, area)
						&& has_switchable_order_in_pool(R, L.current_type)
					) {
						get_orders_at_area(R, area)
							.filter(order => get_order_type(order) === L.current_type)
							.forEach(action_order)
					}

					// Napoléon may change any non-dummy order in his area to an order of the current order type.
					if (
						has_order_of_type(R, L.current_type, POOL)
						&& has_non_dummy_order_at_area(R, area)
					) {
						get_orders_at_area(R, area)
							.filter(order => get_order_type(order) !== DUMMY_ORDER && get_order_type(order) !== L.current_type)
							.forEach(action_order)
					}
				} else if (!L.has_changed_order) {
					V.prompt = `Select a non-Dummy order to place at ${format_area(area)}.`

					// May place any order that will be executed in a future phase compared to the current order.
					get_orders_at_area(FRANCE, POOL)
						.filter(order => get_order_type(order) > L.current_type)
						.forEach(action_order)
				} else {
					V.prompt = `Russia may play ${format_card(C_INDECISION)} to cancel this change.`
					button_next()
				}
			},
			on_order(order) {
				if (L.napoleon_choice === null) {
					if (get_order_type(order) === L.current_type) {
						push_local_undo(R, "remove_order", { order, leader: L_NAPOLEON })
						L.napoleon_choice = "switch_out"
						remove_order(order)
						L.napoleon_change.removed = order
					} else {
						change_order(L_NAPOLEON, order, L.current_type)
						L.napoleon_choice = "change"
						L.has_changed_order = true
					}
				} else {
					push_local_undo(R, "place_order", { order, area: get_leader_location(L_NAPOLEON), leader: L_NAPOLEON })
					place_order(order, get_leader_location(L_NAPOLEON))
					L.napoleon_change.placed = order
					set_delete(L.leaders_who_can_use_abilities[R], L_NAPOLEON)
					mark_ability_used(L_NAPOLEON)
					L.has_changed_order = true
				}
			},
			on_next() {
				set_delete(L.leaders_who_can_use_abilities[R], L_NAPOLEON)
				if (L.leaders_who_can_use_abilities[R].length === 0)
					goto_local_state(R, "all_done")
				else
					goto_local_state(R, "select_next_leader")
			}
		},
		// May change an order to March.
		"davout": {
			on_prompt() {
				prompt_change_order(L_DAVOUT, MARCH)
				generate_change_order_actions(L_DAVOUT, L.current_type, MARCH)
			},
			on_order(order) { change_order(L_DAVOUT, order, MARCH) },
		},
		// May discard a card to place an Evade order during that order's step.
		"schwarzenberg": {
			on_begin() { L.has_discarded[R] = false },
			on_prompt() {
				prompt_discard_card_to_place(L_SCHWARZENBERG, EVADE, L.has_discarded[R])
				generate_discard_card_to_place_actions(L_SCHWARZENBERG, EVADE, L.has_discarded[R])
			},
			on_card(card) {
				push_local_undo(R, "discard", { card })
				discard_card(card)
				L.has_discarded[R] = true
			},
			on_order(order) {
				place_order(order, get_leader_location(L_SCHWARZENBERG))
				complete_place_order_after_discard(L_SCHWARZENBERG, order, get_leader_location(L_SCHWARZENBERG))
			},
			on_area(area) {
				let order = add_order_of_type_from_pool(R, EVADE, area)
				complete_place_order_after_discard(L_SCHWARZENBERG, order, area)
			}
		},
		"all_done": {
			on_prompt() {
				V.prompt = `Change orders — All done.`
				button_confirm()
			},
			on_confirm() {
				end_local_state(R)
			}
		}
	},
	prompt() {
		this.states[L.state[R]].on_prompt()
		button_undo(L.undo[R].length > 0)
	},
	undo() {
		let undo = L.undo[R].pop()

		if (L.state[R] !== undo.state)
			L.state[R] = undo.state

		switch(undo.action) {
		case "select_leader": break
		case "change_order":
			remove_order(undo.info.placed)
			place_order(undo.info.removed, get_leader_location(undo.info.leader))
			set_add(L.leaders_who_can_use_abilities[R], undo.info.leader)
			mark_ability_unused(undo.info.leader)
			if (undo.info.leader === L_NAPOLEON) {
				L.napoleon_choice = null
				L.napoleon_change.placed = -1
				L.napoleon_change.removed = -1
				L.has_changed_order = false
			}
			break
		case "discard":
			add_to_hand(R, undo.info.card)
			set_delete(get_discard(R), undo.info.card)
			break
		case "place_order":
			remove_order(undo.info.order)
			set_add(L.leaders_who_can_use_abilities[R], undo.info.leader)
			mark_ability_unused(undo.info.leader)
			if (undo.info.leader === L_NAPOLEON) {
				L.napoleon_change.placed = -1
				L.has_changed_order = false
			}
			break
		case "remove_order":
			place_order(undo.info.order, get_leader_location(L_NAPOLEON))
			L.napoleon_choice = null
			if (undo.info.leader === L_NAPOLEON)
				L.napoleon_change.removed = -1
			break
		}

		L.leaders_who_can_use_abilities[R] = LEADERS_WHO_CAN_CHANGE_ORDERS[R].slice().filter(leader => can_change_order(leader, L.current_type))
	},
	leader(leader)			{ this.states[L.state[R]].on_leader(leader) },
	leader_button(leader) 	{ this.states[L.state[R]].on_leader_button(leader) },
	area(area) 				{ this.states[L.state[R]].on_area(area) },
	order(order) 			{ this.states[L.state[R]].on_order(order) },
	card(card)				{ this.states[L.state[R]].on_card(card) },
	pass()					{ this.states[L.state[R]].on_pass() },
	next()					{ this.states[L.state[R]].on_next() },
	confirm()				{ this.states[L.state[R]].on_confirm() },
	finish_state() {
		set_delete(G.active, R)
		if (G.active.length === 0) {
			if (L.napoleon_choice !== null) {
				G.active = RUSSIA
				goto("may_play_indecision", { response_to: "napoleon_change", napoleon_change: L.napoleon_change })
			} else {
				end()
			}
		}
	}
}

/* FIRST PLAYER */
P.determine_who_goes_first = {
	_begin() {
		// L.type
		log_h3("First Player")

		L.event = -1
		L.first_player = -1
		L.has_confirmed = false

		// TODO: Add 'pass turn' feature for expediency.
		if (L.type === FORCED_MARCH && can_play_event(C_EVASIVE_MANEUVERS)) {
			G.active = RUSSIA
			L.event = C_EVASIVE_MANEUVERS
			call("may_play_evasive_maneuvers")
		} else if (can_play_event(C_ENERGETIC_LEADERSHIP)) {
			G.active = FRANCE
			L.event = C_ENERGETIC_LEADERSHIP
			call("may_play_energetic_leadership", { type: L.type })
		} else {
			G.active = get_who_has_initiative()
		}
	},
	prompt() {
		if (L.first_player === -1) {
			V.prompt = `Select who will execute the first ${get_order_type_name(L.type)} order this turn.`
			button("russia", get_executable_orders(RUSSIA, L.type).length > 0)
			button("france", get_executable_orders(FRANCE, L.type).length > 0)
		} else {
			V.prompt = `You chose ${ROLES[L.first_player]} to execute the first ${get_order_type_name(L.type)} order.`
			button_confirm()
		}
	},
	_resume() {
		if (L.$ === RUSSIA || L.$ === FRANCE) {
			L.L.$ = L.$
			end()
		} else {
			G.active = get_who_has_initiative()
		}
	},
	russia() {
		push_undo()
		L.first_player = RUSSIA
	},
	france() {
		push_undo()
		L.first_player = FRANCE
	},
	confirm() {
		push_undo()
		log(`${ROLES[G.active]} chose ${ROLES[L.first_player]} to go first.`)
		L.L.$ = L.first_player
		end()
	}
}

P.execute_orders = script(`
	eval { log_h2(get_order_type_name(L.type)) }
	call change_orders { current_type: L.type }
	if (get_placed_orders_of_type(L.type).length === 0) {
		goto log_no_orders_placed { type: L.type }
	} else {
		call determine_who_goes_first { type: L.type }

		if (L.type === CAVALRY_PATROLS) {
			set G.active RUSSIA
			call may_play_flying_columns
		}
		if (L.type === EVADE) {
			set G.active RUSSIA
			call may_play_evade_events
		}

		set G.active L.$
		call execute_next_order { type: L.type }

		if (L.type === CAVALRY_PATROLS) {
			set G.active FRANCE
			call may_play_good_leadership
		}
	}
`)

P.log_no_orders_placed = function() {
	log()
	log(`No ${get_order_type_name(L.type)} orders placed.`)
	log()
	end()
}

function filter_orders(who, type) {
	switch(type) {
	case FORCED_MARCH:
	case MARCH:
		filter_orders_of_type(who, type, (order) => {
			// Keep only the orders where there is (1) a friendly SP, and (2) at least one of those SPs haven't moved previously this turn
			// TODO: May be less confusing to filter out the second case at a later stage?
			let area = get_order_location(order)
			return has_friendly_troop(G.active, area) && (!have_sps_moved_in_area(area) || get_movable_sps_in_area(G.active, area).some(type => type > 0))
		})
		return
	case CAVALRY_PATROLS:
		filter_orders_of_type(who, type, (order) => {
			return has_cavalry_or_cossack_in_area(who, get_order_location(order))
		})
		return
	case EVADE:
		filter_orders_of_type(who, type, (order) => {
			return has_friendly_troop(G.active, get_order_location(order))
				&& has_battle(get_order_location(order))
				&& (!is_event_active(C_UNSUCCESSFUL_DISENGAGEMENT) || (is_event_active(C_UNSUCCESSFUL_DISENGAGEMENT) && !set_has(get_event_keyword(C_UNSUCCESSFUL_DISENGAGEMENT, "cancelled_orders"), order)))
		})
		return
	case RALLY:
		filter_orders_of_type(who, type, (order) => {
			return has_friendly_troop(G.active, get_order_location(order))
		})
		return
	case COSSACK_RAID:
		filter_orders_of_type(who, type, (order) => {
			return has_cossack_sp(get_order_location(order))
			&& get_all_adjacent_areas(get_order_location(order)).some(area => has_enemy_sp(who, area))
		})
		return
	case PLACE_DEPOT:
		filter_orders_of_type(who, type, (order) => {
			return has_friendly_troop(G.active, get_order_location(order)) && is_depot_town(get_order_location(order)) && has_depot_within_four_road_connections(who, get_order_location(order))
		})
		return
	}
}

function get_placed_orders_of_type(type) {
	return G.orders_by_type[type].flat(1)
}

function add_to_orders_by_type(order) {
	set_add(G.orders_by_type[get_order_type(order)][get_order_owner(order)], order)
}

function get_executable_orders(who, type) {
	return G.orders_by_type[type][who]
}

function has_executable_order(who, type) {
	return get_executable_orders(who, type).length > 0
}

// Different orders have slightly different conditions for when they do not have any effect
function filter_orders_of_type(who, type, filter_fn) {
	G.orders_by_type[type][who] = G.orders_by_type[type][who].filter(filter_fn)
}

function get_order_state_name(type) {
	switch(type) {
	case FORCED_MARCH: return "forced_march"
	case CAVALRY_PATROLS: return "cavalry_patrols"
	case MARCH: return "march"
	case EVADE: return "evade"
	case RALLY: return "rally"
	case COSSACK_RAID: return "cossack_raid"
	case PLACE_DEPOT: return "place_depot"
	}
}

P.execute_next_order = {
	_begin() {
		// L.type
		filter_orders(G.active, L.type)
	},
	prompt() {
		if (has_executable_order(G.active, L.type)) {
			V.prompt = `Select next ${get_order_type_name(L.type)} order to execute. (${join_array_with_or(get_executable_orders(G.active, L.type).map(order => format_area(get_order_location(order))))})`
			get_executable_orders(G.active, L.type).forEach(action_order)
		} else {
			V.prompt = `Execute ${get_order_type_name(L.type)} orders — All done.`
			button_done()
		}

		// The fuzzer loves to pull out all depots on map: This will wipe out all troops on map with attrition!
		if (L.type === PLACE_DEPOT && !globalThis.RTT_FUZZER)
			for (let depot = get_first_depot(G.active); depot <= get_last_depot(G.active); ++depot)
				if (is_depot_on_map(depot))
					action("depot", depot)
	},
	order(order) {
		push_undo()
		let area = get_order_location(order)
		remove_order(order)
		set_delete(get_executable_orders(G.active, L.type), order)

		log_h4(format_area(area), G.active)
		goto(`execute_${get_order_state_name(get_order_type(order))}`, { area })
	},
	done() {
		if (!has_executable_order(enemy(G.active), L.type)) {
			log()
			end()
		} else {
			G.active = enemy(G.active)
			goto("execute_next_order", { type: L.type })
		}
	},
	depot(depot) {
		push_undo()
		log_h4(format_area(get_depot_location(depot)), G.active)
		remove_depot(depot, get_depot_location(depot))
	},
}

// TODO: Add 'pass turn' feature on Exhausting March for expediency
P.end_order = {
	prompt() {
		V.prompt = `Execute ${get_order_type_name(L.type)} order — All done.`

		if (L.type === FORCED_MARCH && G.active === FRANCE && G.move.path.length > 1)
			V.prompt += ` Russia may play ${format_card(C_EXHAUSTING_MARCH_1)}.` // Putting in just one of the 'Exhausting March' cards

		button_confirm()

		// The fuzzer loves to pull out all depots on map: This will wipe out all troops on map with attrition!
		if (L.type === PLACE_DEPOT && !globalThis.RTT_FUZZER)
			for (let depot = get_first_depot(G.active); depot <= get_last_depot(G.active); ++depot)
				if (is_depot_on_map(depot))
					action("depot", depot)
	},
	confirm() {
		if (L.type === FORCED_MARCH && G.active === RUSSIA && is_event_active(C_EVASIVE_MANEUVERS) && has_executable_order(RUSSIA, FORCED_MARCH)) {
			goto("execute_next_order", { type: L.type })
		} else if (L.type === FORCED_MARCH && G.active === FRANCE && G.move.path.length > 1) {
			G.active = RUSSIA
			goto("may_play_exhausting_march")
		} else if (has_executable_order(enemy(G.active), L.type)) {
			G.active = enemy(G.active)
			goto("execute_next_order", { type: L.type })
		} else if (has_executable_order(G.active, L.type)) {
			goto("execute_next_order", { type: L.type })
		} else {
			end()
		}
	},
	depot(depot) {
		push_undo()
		log_h4(format_area(get_depot_location(depot)), G.active)
		remove_depot(depot, get_depot_location(depot))
	},
}

// === EXECUTE FORCED MARCH ORDERS ===
// === EXECUTE MARCH ORDERS ===
/*
	Both of these orders are fairly similar (excepting some events).

	Events that (only) affect Forced March orders:
		RU #4	Evasive Maneuvers			- Russia executes all Forced March orders first this turn.
		RU #6	Bagration's Retreat			- Playable when executing a Forced March order with Bagration. Forces in adjacent areas may join the order as long as all moving forces end in the same destination.
		RU #25	Exhausting March			- RESPONSE: France must suffer attrition losses equal to 1/5 of moving SPs + total number of track connections used in the move.
		RU #26	Exhausting March			- Same as RU #25.

		FR #1	Hard Marching				- France must exhaust 1 SP after forced marching; All Forced Marching SPs fight at X1.
		FR #2	Hard Marching				- Same as FR #1.

	Events that (only) affect March orders:
		FR #9	Fast Marching				- Forces using this March order may move up to 2 areas. 1 SP is exhausted after moving.
		FR #10	Fast Marching				- Same as FR #9.
		FR #37	Poniatowski's V Corps		- France may immediately Rally 2 exhausted Infantry SPs in the moving force.

	Events that affect both Forced March and March orders:
		RU #14	Extreme Weather				- 1 fresh SP (Cavalry if possible) in each moving force is exhausted.
		RU #15	Pride and Hesitation		- Russia +1 VP this turn if one or more French leaders leave Moscow.
		RU #22	City Ablaze!				- RESPONSE:	When France gain control of a Key City.
		RU #43	Exhausted Horses			- French forces have a maximum move of 1.
		RU #48	Disorderly March			- French forces must immediately stop after entering the target area.

		FR #4	Holy Mother Russia			- France +1 VP for each Russian force that leaves the target Key City.
		FR #8	Infighting & Intrigue		- Russian leaders in the target area may only execute Forced March/March orders if they end their move in a French-occupied area.
		FR #41	Freezing Weather			- All moving French forces have a maximum move of 1 and fight as if under Forced March orders.
		FR #42	Extreme Weather				- 1 SP in each force that uses March orders is exhausted.
*/

P.execute_forced_march = script(`
	if (G.active === RUSSIA && hand_has(RUSSIA, C_BAGRATIONS_RETREAT) && can_play_event(C_BAGRATIONS_RETREAT) && get_leader_location(L_BAGRATION) === L.area) {
		goto may_play_bagrations_retreat { area: L.area }
	} else {
		goto forced_march { area : L.area }
	}
`)

P.forced_march = script(`
	call select_force { type: FORCED_MARCH, area: L.area }
	if (G.move.sps.some(type => type > 0)) {
		call move
		if (get_post_move_exhaustion_events(G.active, FORCED_MARCH).length > 0) {
			call post_move_exhaustion
		}
	}
	if (!is_event_active(C_BAGRATIONS_RETREAT)) {
		goto end_order { type : FORCED_MARCH }
	}
`)

P.execute_march = script(`
	if (G.active === FRANCE && (hand_has(FRANCE, C_FAST_MARCHING_1)) || hand_has(FRANCE, C_FAST_MARCHING_2)) {
		call may_play_fast_marching { area: L.area }
	}
	call select_force { type: MARCH, area: L.area }
	if (G.active === FRANCE && hand_has(FRANCE, C_PONIATOWSKIS_V_CORPS) && can_play_event(C_PONIATOWSKIS_V_CORPS)) {
		call may_play_poniatowskis_v_corps
	}
	if (G.move.sps.some(type => type > 0)) {
		call move
		if (get_post_move_exhaustion_events(G.active, MARCH).length > 0) {
			call post_move_exhaustion
		}
	}
	goto end_order { type: MARCH }
`)

// === MOVEMENT (COMMON TO FORCED MARCH AND MARCH) ===
/*
	G.moved is a plain array map following the map functions in the framework.
	For simplicity, each key holds a list of forces in the area that have previously moved.

	G.moved = [area, forces, area, forces, ... ]

	20 bits
	Player 		- 1 bit 	- RUSSIA or FRANCE
	From   		- 8 bits 	- corresponds to area ix
	Strength 	- 1 bit 	- HALF_STRENGTH or FULL_STRENGTH
	type 		- 4 bits
	num 		- 6 bits
*/

function clear_moved() {
	map_clear(G.moved.leaders)
	map_clear(G.moved.sps)
}

// Leaders
function has_leader_moved(leader) {
	return map_has(G.moved.leaders, leader)
}

// 'strength' is used to match a leader to his force in the client.
// A leader does not have a 'strength'.
function mark_leader_moved(leader, from, strength) {
	map_set(G.moved.leaders, leader, { from, strength })
}

// SPs
const TROOP_MOVED_PLAYER_MASK = 1 << 19
const TROOP_MOVED_FROM_MASK = 522240
const TROOP_MOVED_STRENGTH_MASK = 1 << 10
const TROOP_MOVED_TYPE_MASK = 960
const TROOP_MOVED_NUM_MASK = 63

const TROOP_MOVED_PLAYER_SHIFT = 19
const TROOP_MOVED_FROM_SHIFT = 11
const TROOP_MOVED_STRENGTH_SHIFT = 10
const TROOP_MOVED_TYPE_SHIFT = 6
const TROOP_MOVED_NUM_SHIFT = 0

function decode_troop_moved_player(entry) {
	return (entry & TROOP_MOVED_PLAYER_MASK) >> TROOP_MOVED_PLAYER_SHIFT
}

function decode_troop_moved_from(entry) {
	return (entry & TROOP_MOVED_FROM_MASK) >> TROOP_MOVED_FROM_SHIFT
}

function decode_troop_moved_strength(entry) {
	return (entry & TROOP_MOVED_STRENGTH_MASK) >> TROOP_MOVED_STRENGTH_SHIFT
}

function decode_troop_moved_type(entry) {
	return (entry & TROOP_MOVED_TYPE_MASK) >> TROOP_MOVED_TYPE_SHIFT
}

function decode_troop_moved_num(entry) {
	return (entry & TROOP_MOVED_NUM_MASK) >> TROOP_MOVED_NUM_SHIFT
}

function encode_troop_moved(player, from, strength, type, num) {
	let entry = 0
	entry += player << TROOP_MOVED_PLAYER_SHIFT
	entry += from << TROOP_MOVED_FROM_SHIFT
	entry += strength << TROOP_MOVED_STRENGTH_SHIFT
	entry += type << TROOP_MOVED_TYPE_SHIFT
	entry += num
	return entry
}

function init_sps_moved(area) {
	map_set(G.moved.sps, area, [])
}

function have_sps_moved_in_area(area) {
	return map_has(G.moved.sps, area)
}

function get_moved_sps_in_area(area) {
	return map_get(G.moved.sps, area, [])
}

function find_moved_entry(area, player, from, strength, type) {
	return get_moved_sps_in_area(area).find(entry => {
		return decode_troop_moved_player(entry) === player
			&& decode_troop_moved_from(entry) === from
			&& decode_troop_moved_strength(entry) === strength
			&& decode_troop_moved_type(entry) === type
	}) ?? -1
}

function add_sp_moved(area, player, from, strength, type, num) {
	if (!map_has(G.moved.sps, area))
		init_sps_moved(area)

	let existing_entry = find_moved_entry(area, player, from, strength, type)

	if (existing_entry > -1)  {
		set_delete(get_moved_sps_in_area(area), existing_entry)
		set_add(get_moved_sps_in_area(area), encode_troop_moved(player, from, strength, type, decode_troop_moved_num(existing_entry) + num))
	} else {
		set_add(get_moved_sps_in_area(area), encode_troop_moved(player, from, strength, type, num))
	}
}

function remove_sp_moved(area, player, from, strength, type, num) {
	if (!map_has(G.moved.sps, area))
		return

	let existing_entry = find_moved_entry(area, player, from, strength, type)

	if (existing_entry > -1) {
		set_delete(get_moved_sps_in_area(area), existing_entry)
		let num_remaining = decode_troop_moved_num(existing_entry) - num
		if (num_remaining > 0)
			add_sp_moved(area, player, from, strength, type, num_remaining)
	}
}

function update_moved_exhaust(area, player, from, strength, type, num) {
	remove_sp_moved(area, player, from, strength, type, num)
	add_sp_moved(area, player, from, strength, type + 1, num)
}

function mark_force_moved() {
	let area = G.move.path[G.move.path.length - 1]
	let from = G.move.path[G.move.path.length - 2]
	let strength = get_move_strength(G.move.type)

	for (let leader of G.move.leaders)
		mark_leader_moved(leader, from, strength)

	for (let type = 0; type < G.move.sps.length; ++type) {
		if (G.move.sps[type] > 0)
			add_sp_moved(area, G.active, from, strength, type, G.move.sps[type])
	}
}

function move_force(from, to) {
	for (let leader of G.move.leaders)
		move_leader(leader, to)

	for (let type = 0; type < G.move.sps.length; ++type) {
		if (G.move.sps[type] > 0)
			move_troop(G.active, from, to, type, G.move.sps[type])
	}

	G.move.path.push(to)
}

/* SELECT FORCE */
function get_movable_sps_in_area(player, area) {
	var list = Array(NUM_TROOP_TYPES).fill(0)
	if (!has_friendly_troop(player, area))
		return list

	for (let entry of get_area_troop_set(area)) {
		if (decode_troop_entry_who(entry) === player) {
			let type = decode_troop_entry_type(entry)
			let num = decode_troop_entry_num(entry)

			if (
				is_event_active(C_BAGRATIONS_RETREAT)
				&& (type !== FRESH_CAVALRY && type !== FRESH_COSSACK)
				&& find_path_distance(area, get_event_keyword(C_BAGRATIONS_RETREAT, "destination")) > 2
			)
				list[type] = 0
			else
				list[type] = num
		}
	}

	if (have_sps_moved_in_area(area)) {
		let moved_sps = get_moved_sps_in_area(area)
		for (let item of moved_sps) {
			if (decode_troop_moved_player(item) === player)
				list[decode_troop_moved_type(item)] -= decode_troop_moved_num(item)
		}
	}

	return list
}

function get_max_move_allowance(who, area, type) {
	let sps = get_movable_sps_in_area(who, area)
	let allowance = type === FORCED_MARCH ? 3 : 2

	if (sps[FRESH_CAVALRY] === 0 && sps[FRESH_COSSACK] === 0)
		--allowance

	return allowance
}

// Alexander's ability: He may not willingly move without a leader
function can_alexander_be_babysitted(evade = false) {
	// Additional clarifications on the topic:
	// https://boardgamegeek.com/thread/3743026/fairly-basic-clarification-on-alexanders-stacking

	// Evade can use all leaders in the area, Forced March or March can only use leaders who haven't previously moved.
	let leaders = evade ? L.leaders : L.movable_leaders

	if (G.active !== RUSSIA) return true
	if (!set_has(leaders, L_ALEXANDER)) return true

	// Alexander may not move alone if there are other leaders in the area
	if (G.move.leaders.length === 1 && set_has(G.move.leaders, L_ALEXANDER) && leaders.length > 1)
		return false

	// No leader may willingly leave Alexander behind without a handler
	if ((leaders.length - G.move.leaders.length === 1) && !set_has(G.move.leaders, L_ALEXANDER))
		return false

	return true
}

function move_prompt() {
	let s = ` (Selected: `
	s += G.move.leaders.map(format_leader).join(", ")
	for (let type = 0; type < G.move.sps.length; ++type)
		if (G.move.sps[type] > 0)
			 s += `${G.move.leaders.length > 0 ? ", " : ""}${G.move.sps[type]} ${get_troop_type_name(type)}`

	V.prompt += s + ")"
}

// Alexander ability: Must always, if possible, stack and move with another Russian leader.
// No Russian leader may leave him behind alone.
// See can_alexander_be_babysitted() for more clarifications on this
function update_alexander_prompt(leaders_at_area) {
	if (set_has(leaders_at_area, L_ALEXANDER) && leaders_at_area.length > 1 && (!set_has(G.move.leaders, L_ALEXANDER) || G.move.leaders.length === 1))
		V.prompt += ` ${format_leader(L_ALEXANDER)} may not be activated alone or left behind without another leader.`
}

// Platov ability: May only command Cavalry and Cossack SPs.
function update_platov_prompt() {
	if (G.move.leaders.length === 1 && set_has(G.move.leaders, L_PLATOV))
		V.prompt += ` ${format_leader(L_PLATOV)} may only command Cavalry and Cossack SPs.`
}

function could_platov_select(type) {
	return is_cavalry(type) || is_cossack(type)
}

// See select_evade_force for selecting an evade force.
// This state assumes that all selectable SPs haven't moved and also enforces pinning and some events.
P.select_force = {
	_begin() {
		// L.type, L.area
		// Leaders and SPs eligible for movement
		L.movable_leaders = get_leaders_at_area(G.active, L.area).filter(leader => !has_leader_moved(leader))
		L.movable_sps = get_movable_sps_in_area(G.active, L.area)

		// Running count of number of SPs selected in total (to save on repeated traversals)
		L.num_sps_selected = 0
		// Count of how many SPs are eligible to move away from the area: by default, all SPs are eligible
		L.max_sps_selectable = L.movable_sps.reduce((a, b) => (a + b), 0)

		G.move = {
			// FORCED_MARCH or MARCH
			type: L.type,
			// Move path
			path: [ L.area ],
			// Pinned status
			pinned: false,
			// Moving leaders (set)
			leaders: [],
			// Moving SPs
			sps: Array(NUM_TROOP_TYPES).fill(0)
		}

		// Determine whether any or all SPs at the area are pinned
		// TODO: New Living Rules exception to this rule
		if (has_enemy_sp(G.active, L.area)) {
			G.move.pinned = true
			// The number of SPs pinned is equal to the number of enemy SPs in the area
			L.max_sps_selectable = Math.max(0, L.max_sps_selectable - count_num_sps(enemy(G.active), L.area))
		}
	},
	prompt() {
		if (L.max_sps_selectable === 0) {
			if (G.move.pinned)
				V.prompt = `All friendly SPs at ${format_area(L.area)} are pinned.`
			else
				V.prompt = `All friendly SPs at ${format_area(L.area)} have previously moved.`
			button_pass()

		} else {
			let sp_limit = G.move.leaders.length > 0 ? L.max_sps_selectable : 4

			if (G.move.leaders.length > 0) {
				V.prompt = `Select any or all leaders and SPs to move from ${format_area(L.area)}.`
				update_alexander_prompt(L.movable_leaders)
				update_platov_prompt()
			} else {
				V.prompt = `Select up to 4 SPs (at least 1) to move from ${format_area(L.area)}`
			}

			if (G.move.leaders.length > 0 || L.num_sps_selected > 0)
				move_prompt()

			// Bagration's Retreat must include Bagration!
			if (is_event_active(C_BAGRATIONS_RETREAT) && L.area === get_leader_location(L_BAGRATION))
				V.prompt += ` ${format_leader(L_BAGRATION)} must participate in ${format_card(C_BAGRATIONS_RETREAT)}.`

			// Infighting & Intrigue: Russian leaders in the target area may only move if they end their movement in an area with French SPs.
			if (
				!is_event_active(C_INFIGHTING_AND_INTRIGUE)
				|| get_event_keyword(C_INFIGHTING_AND_INTRIGUE, "area") !== L.area
				|| has_valid_infighting_and_intrigue_destination(G.active, L.area, L.type)
			) {
				for (let leader of L.movable_leaders)
					action_leader(leader)
			}

			for (let type = 0; type < G.move.sps.length; ++type) {
				// Platov leader ability: He may only command Cavalry and Cossack SPs
				if (
					G.active === RUSSIA
					&& G.move.leaders.length === 1
					&& set_has(G.move.leaders, L_PLATOV)
					&& !could_platov_select(type)
				) {
					continue
				}

				// If a Russian leader in the target Infighting & Intrigue destination is selected, only allow SP type that would be able to move to a French-occupied area to move.
				if (
					G.move.leaders.length > 0
					&& is_event_active(C_INFIGHTING_AND_INTRIGUE)
					&& get_event_keyword(C_INFIGHTING_AND_INTRIGUE, "area") === L.area
					&& type !== FRESH_CAVALRY && type !== FRESH_COSSACK		// Force types that have an extended move range
				) {
					let dist = L.type === FORCED_MARCH ? 2 : 1
					if (get_distance_to_closest_infighting_and_intrigue_destination(G.active, L.area, L.type) > dist)
						continue
				}

				if (L.movable_sps[type] > 0
					&& G.move.sps[type] < L.movable_sps[type]
					&& L.num_sps_selected < L.max_sps_selectable
				) {
					// Only get SPs that haven't previously moved.
					if (has_battle(L.area))
						action_troop_alt(type, L.area, FULL_STRENGTH, L.area)
					else
						action_troop_alt(type, L.area)
				}

				if (G.move.sps[type] > 0) {
					if (has_battle(L.area))
						action_troop_alt(type, L.area, FULL_STRENGTH, L.area, 1)
					else
						action_troop_alt(type, L.area, FULL_STRENGTH, POOL, 1)
				}
			}

			if (!G.move.pinned && (L.movable_leaders.length > G.move.leaders.length || L.num_sps_selected < L.max_sps_selectable) && L.max_sps_selectable <= sp_limit)
				button("select_all")

			button("move",
				L.num_sps_selected >= 1
				&& L.num_sps_selected <= sp_limit
				&& can_alexander_be_babysitted()
				&& ((!is_event_active(C_BAGRATIONS_RETREAT)) || (get_leader_location(L_BAGRATION) !== L.area) || set_has(G.move.leaders, L_BAGRATION))
			)
		}
	},
	pass() {
		push_undo()
		if (G.move.pinned)
			log("All SPs are pinned.")
		else
			log("No movable SPs.")
		log()
		end()
	},
	leader(leader) {
		push_undo()
		set_toggle(G.move.leaders, leader)

		// If a leader is removed and the only remaining leader is Platov, remove all non-Cavalry and non-Cossack SPs
		if (G.move.leaders.length === 1 && set_has(G.move.leaders, L_PLATOV)) {
			for (let type = 0; type < G.move.sps.length; ++type) {
				if ((!could_platov_select(type) && G.move.sps[type] > 0)) {
					L.num_sps_selected -= G.move.sps[type]
					G.move.sps[type] = 0
				}
			}
		}

		if (is_event_active(C_INFIGHTING_AND_INTRIGUE) && get_event_keyword(C_INFIGHTING_AND_INTRIGUE, "area") === L.area) {
			let dist = L.type === FORCED_MARCH ? 2: 1
			if (get_distance_to_closest_infighting_and_intrigue_destination(G.active, L.area, L.type) > dist) {
				for (let type = 0; type < G.move.sps.length; ++type) {
					if (type !== FRESH_CAVALRY && type !== FRESH_COSSACK) {
						L.num_sps_selected -= G.move.sps[type]
						G.move.sps[type] = 0
					}
				}
			}
		}
	},
	troop(entry) {
		push_undo()
		let type = decode_troop_action_type(entry)
		let moving = decode_troop_action_moving(entry)

		if (moving) {
			--G.move.sps[type]
			--L.num_sps_selected
		} else {
			++G.move.sps[type]
			++L.num_sps_selected
		}

	},
	select_all() {
		push_undo()

		if (
			!is_event_active(C_INFIGHTING_AND_INTRIGUE)
			|| get_event_keyword(C_INFIGHTING_AND_INTRIGUE, "area") !== L.area
			|| has_valid_infighting_and_intrigue_destination(G.active, L.area, L.type)
		) {
			for (let leader of L.movable_leaders) {
				if (!set_has(G.move.leaders, leader))
					set_add(G.move.leaders, leader)
			}
		}

		L.num_sps_selected = 0
		for (let type = 0; type < G.move.sps.length; ++type) {
			// If Platov is the only leader at the area, don't select SPs that are not Cavalry or Cossack
			if ((L.movable_leaders.length === 1 && set_has(G.move.leaders, L_PLATOV)) && !could_platov_select(type)) {
				continue
			} else if (is_event_active(C_INFIGHTING_AND_INTRIGUE) && G.move.leaders.length > 0) {
				let dist = L.type === FORCED_MARCH ? 2 : 1
				if (get_distance_to_closest_infighting_and_intrigue_destination(G.active, L.area, L.type) > dist && (type !== FRESH_CAVALRY && type !== FRESH_COSSACK))
					continue
			}

			G.move.sps[type] = L.movable_sps[type]
			L.num_sps_selected += L.movable_sps[type]
		}
	},
	move() {
		push_undo()
		end()
	}
}

/* MOVE */
function calculate_move_allowance(who, move_type, troops) {
	// Exhausted Horses supersedes 'Fast Marching'. My assumption is that Freezing Weather does the same since it has the same wording.
	// https://boardgamegeek.com/thread/3745296/fast-marching-and-exhausted-horses
	if (is_event_active(C_EXHAUSTED_HORSES) || (is_event_active(C_FREEZING_WEATHER) && who === FRANCE))
		return 1

	if ((move_type === MARCH) && (who === FRANCE) && (is_event_active(C_FAST_MARCHING_1) || is_event_active(C_FAST_MARCHING_2)))
		return 2

	let allowance = (move_type === FORCED_MARCH) ? 3 : 2
	for (let type = FRESH_INFANTRY; type <= EXHAUSTED_AUSTRIAN_INFANTRY; ++type) {
		if (((type !== FRESH_CAVALRY) && (type !== FRESH_COSSACK)) && (troops[type] > 0)) {
			return --allowance
		}
	}
	return allowance
}

function filter_areas(callback) {
	let areas = []
	for (let area = FIRST_AREA; area <= LAST_AREA; ++area)
		if (callback(area))
			set_add(areas, area)
	return areas
}

function get_movable_areas_in_radius(source, radius, callback = function(_) { return true }) {
	let queue = [ source ]
	let distance = []
	map_set(distance, source, 0)
	let areas = []

	while (queue.length > 0) {
		let current = queue.shift()

		if (map_get(distance, current, null) > radius)
			break

		if (has_enemy_sp(G.active, current))
			continue

		for (let adj of get_all_adjacent_areas(current)) {
			if (!can_enter_area(G.active, adj)) continue

			if (map_get(distance, current, null) < radius && !map_has(distance, adj) && can_enter_area(G.active, adj) && callback(adj))
				set_add(areas, adj)

			if (!queue.includes(adj) && !map_has(distance, adj)) {
				queue.push(adj)
				map_set(distance, adj, map_get(distance, current, null) + 1)
			}
		}
	}

	return areas
}

// Returns the possible areas a force could move to. See get_lone_alexander_destinations() for handling of Alexander's automatic move in case he is alone.
// NOTE: Brian rules that Evasive Maneuvers takes precedence over (and basically cancels) Infighting & Intrigue.
// TODO: Resolve edge case between Evasive Maneuvers and Bagration's Retreat.
function get_move_destinations(current_area, allowance) {
	// RU #4 Evasive Maneuvers: Russia may not end moves in, or adjacent to areas with French SPs
	if (is_event_active(C_EVASIVE_MANEUVERS) && G.active === RUSSIA && G.move.type === FORCED_MARCH) {
		let possible_destinations = get_movable_areas_in_radius(current_area, allowance, (area) => {
			return can_enter_area(G.active, area)
				&& !has_enemy_sp(G.active, area)
				&& get_all_adjacent_areas(area).every(loc => !has_enemy_sp(G.active, loc))
		})

		return get_movable_areas_in_radius(current_area, 1, (area) => {
			return can_enter_area(G.active, area)
				&& possible_destinations.some(destination => find_path_distance(area, destination) <= allowance - 1)
		})
	}
	// RU #6 Bagration's Retreat: All moving forces must move to the destination
	else if (is_event_active(C_BAGRATIONS_RETREAT) && G.active === RUSSIA) {
		let destination = get_event_keyword(C_BAGRATIONS_RETREAT, "destination")

		return get_movable_areas_in_radius(current_area, 1, (area) => {
			return can_enter_area(G.active, area)
				&& find_path_distance(area, destination) <= allowance - 1
		})
	}
	// FR #8 Infighting & Intrigue: Russian leaders in the target area may only execute a 'Forced March' order if they end up in a French-occupied area
	else if (is_event_active(C_INFIGHTING_AND_INTRIGUE) && G.active === RUSSIA && G.move.path[0] === get_event_keyword(C_INFIGHTING_AND_INTRIGUE, "area") && G.move.leaders.length > 0) {
		let possible_destinations = get_movable_areas_in_radius(current_area, allowance, (area) => {
			return can_enter_area(G.active, area) && has_enemy_sp(G.active, area)
		})

		return get_movable_areas_in_radius(current_area, 1, (area) => {
			return can_enter_area(G.active, area)
				&& possible_destinations.some(destination => find_path_distance(area, destination) <= allowance - 1)
		})
	}
	// Exception to pinning: If the pinning force consists of a single SP with no leader, the defending force may use the connection used by the attacker.
	else if (has_battle(current_area) && is_battle_defender(G.active, current_area) && (count_num_sps(enemy(G.active), current_area) > 1 || has_friendly_leader(enemy(G.active), current_area))) {
		return get_all_adjacent_areas(current_area).filter(area => !get_connections_used_by_attacker(current_area).includes(area))
	}
	else {
		return get_all_adjacent_areas(current_area).filter(area => can_enter_area(G.active, area))
	}
}

// If Alexander I is alone without a handler, move him towards the closest Russian leader.
// This is NOT in the rulebook.
// See https://boardgamegeek.com/thread/3743026/fairly-basic-clarification-on-alexanders-stacking for Brian's ruling. This is the basis on which I have implemented this rule.
// Since it is tricky and (well beyond the game's scope) to force other leaders to move toward Alexander if he is alone, I have only enforced that Alexander must move towards the cloest Russian leader.

function find_closest_destination_among_options(to, options) {
	let distance = []
	for (let a of options) {
		let possible_distances = to.map(area => find_path_distance(area, a))
		let minimum_distance = Math.min(...possible_distances)

		if (map_keys(distance).some(d => d < minimum_distance))
			continue
		else
			set_add(map_get_set(distance, minimum_distance), a)
	}
	// If no options meet the 'callback', return all the options.
	// This should be fairly rare for it to matter (it would require no Russian leader on map excepting Alexander).
	if (distance.length === 0)
		return options
	return distance[1] // Areas corresponding to the shortest distance
}

function find_location_of_closest_russian_leader(area) {
	let options = get_areas_with_leaders(RUSSIA).filter(area => get_leader_location(L_ALEXANDER) !== area)
	return find_closest_destination_among_options([ area ], options)
}

function get_lone_alexander_move_destinations() {
	let location_of_closest_russian_leader = find_location_of_closest_russian_leader(get_leader_location(L_ALEXANDER))
	let destinations = get_move_destinations(L.current_area, L.move_allowance)
	if (location_of_closest_russian_leader === -1)
		return destinations
	return find_closest_destination_among_options(location_of_closest_russian_leader, destinations)
}

P.move = {
	_begin() {
		L.move_allowance = calculate_move_allowance(G.active, G.move.type, G.move.sps)
		// Tracks which area the moving force is currently in. Only updated after the force has finished moving to the next area.
		L.current_area = G.move.path[G.move.path.length - 1]
		// Flag to show 'confirm battle' prompt.
		L.confirm_battle = false

		// Log start of move
		log(`Moved from ${format_area(L.current_area)}`)
		if (G.move.leaders.length > 0) {
			logi(format_leader(get_seniormost_leader_from_list(G.active, G.move.leaders)))
			for (let type = 0; type < G.move.sps.length; ++type) {
				if (G.move.sps[type] > 0)
					log_only(G.active, format_ii(`${G.move.sps[type]} ${get_troop_type_name(type)}`))
			}
		} else {
			for (let type = 0; type < G.move.sps.length; ++type) {
				if (G.move.sps[type] > 0)
					logii(`${G.move.sps[type]} ${get_troop_type_name(type)}`)
			}
		}
	},
	prompt() {
		if (L.confirm_battle) {
			if (has_battle(L.current_area))
				V.prompt = `This force will join the battle at ${format_area(L.current_area)}. Confirm?`
			else
				V.prompt = "This move may trigger a battle. Confirm?"
			button_confirm()
		}
		else if (L.move_allowance > 0) {
			V.prompt = `Select destination for move (${L.move_allowance} remaining MPs).`

			// Alexander must move towards that closest Russian leader (if present) if alone.
			// Does not enforce anything in the rare case that Alexander is the only Russian leader on map.
			if (G.active === RUSSIA && set_has(G.move.leaders, L_ALEXANDER) && G.move.leaders.length === 1) {
				V.prompt += ` ${format_leader(L_ALEXANDER)} must move towards the closest Russian leader since he is alone.`
				get_lone_alexander_move_destinations().forEach(action_area)
			} else {
				get_move_destinations(L.current_area, L.move_allowance).forEach(action_area)
			}

			button_done(G.move.path.length > 1)
		}
		else {
			V.prompt = `Move force: All done.`
			button_done()
		}
	},
	area(area) {
		push_undo()
		logi(`to ${format_area(area)}`)
		let could_play_city_ablaze = ((G.active === FRANCE) && is_key_city(area) && !has_troop(area))

		// If the destination is a VP area, increase VP
		if (is_vp_area(area) && !is_friendly_controlled(G.active, area) && !has_enemy_sp(G.active, area)) {
			increase_vp(G.active, get_area_vp(area))
			if (G.active === FRANCE && area === S_MOSCOW && !G.has_france_occupied_moscow) {
				// Scenario special rule: France gains +5 VP the instant it first enters Moscow.
				if (G.scenario === THE_GRAND_CAMPAIGN || G.scenario === BATTLE_OF_SMOLENSK_CAMPAIGN_START) {
					log("Scenario special rule.")
					increase_vp(FRANCE, 5)
					G.has_france_occupied_moscow = true
				}
			}
		}

		// RU #15 Pride and Hesitation: Russia gains +1 VP if any French leaders leave Moscow.
		if ((L.current_area === S_MOSCOW) && is_event_active(C_PRIDE_AND_HESITATION) && (G.move.leaders.length > 0) && (G.active === FRANCE)) {
			log_card(C_PRIDE_AND_HESITATION)
			decrease_vp(FRANCE)
		}

		// FR #4 Holy Mother Russia: France gains +1 VP for each force that leaves the selected area
		if (is_event_active(C_HOLY_MOTHER_RUSSIA_FR) && get_event_keyword(C_HOLY_MOTHER_RUSSIA_FR, "area") === L.current_area && (G.active === RUSSIA)) { //TO CHECK: Does this stack on the same move or only once per move?
			log_card(C_HOLY_MOTHER_RUSSIA_FR)
			increase_vp(FRANCE)
		}

		// FR #48 Disorderly March: France must stop after entering the target area.
		if (G.active === FRANCE && is_event_active(C_DISORDERLY_MARCH) && get_event_keyword(C_DISORDERLY_MARCH, "area") === area) {
			log_card(C_DISORDERLY_MARCH)
			L.move_allowance = 0
		}

		// Determine the new seniormost leader if multiple leaders occupy the target area
		let needs_to_determine_seniority = false
		if (G.move.leaders.length > 0 && has_friendly_leader(G.active, area))
			needs_to_determine_seniority = get_leader_seniority(get_seniormost_leader(G.active, area)) === get_leader_seniority(get_seniormost_leader_from_list(G.active, G.move.leaders))

		if (has_enemy_sp(G.active, area)) {
			L.confirm_battle = true
			L.current_area = area
		} else {
			conduct_movement(G.move.path[G.move.path.length - 1], area)

			if (is_vp_area(L.current_area) && !is_friendly_controlled(G.active, L.current_area)) {
				log(`${format_area(L.current_area)} abandoned!`)
				decrease_vp(G.active, get_area_vp(L.current_area))
			}

			L.current_area = area
		}

		if (!sudden_death()) {
			if (!has_enemy_sp(G.active, area)) {
				// If France just took an unnoccupied key city, Russia may play City Ablaze!
				// If the key city also has a depot, the depot removal is called from the City Ablaze states.
				if (could_play_city_ablaze)
					call(`russia_may_play_city_ablaze`, { area: area, who: FRANCE })
				else if (has_enemy_depot(G.active, area))
					call(`confirm_remove_depot`, { area: area })
				// Mutually exclusive with the previous two conditions since both of those would require that no SPs are already present.
				else if (needs_to_determine_seniority)
					call("determine_seniority", { area })
			}
		}
	},
	done() {
		push_undo()
		end()
	},
	_resume() {
		if (has_enemy_sp(G.active, G.move.path[G.move.path.length - 1]))
			end()
	},
	confirm() {
		push_undo()
		let previous_area = G.move.path[G.move.path.length - 1]

		let needs_to_determine_seniority = false
		if (G.move.leaders.length > 0 && has_friendly_leader(G.active, L.current_area))
			needs_to_determine_seniority = get_leader_seniority(get_seniormost_leader(G.active, L.current_area)) === get_leader_seniority(get_seniormost_leader_from_list(G.active, G.move.leaders))

		conduct_movement(previous_area, L.current_area)

		if (is_vp_area(previous_area) && !is_friendly_controlled(G.active, previous_area)) {
			log(`${format_area(previous_area)} abandoned!`)
			decrease_vp(G.active, get_area_vp(previous_area))
		}

		if (!sudden_death()) {
			if (needs_to_determine_seniority)
				call("determine_seniority", { area: L.current_area })
			else
				end()
		}
	},
	_end() { mark_force_moved() },
}

function conduct_movement(from, to) {
	move_force(from, to)
	L.move_allowance = Math.max(L.move_allowance - 1, 0)

	// Remove SPs from the battle in the origin area, if any.
	if (has_battle(from)) {
		if (!has_friendly_troop(G.active, from)) {
			delete_battle_entry(from)
		} else {
			// Only defenders who started the turn in the area would be eligible to move.
			get_player_battle_data(G.active, from).forces.forEach(force => {
				if (force.from === from && force.strength === FULL_STRENGTH) {
					for (let type = 0; type < force.troops.length; ++type) {
						if (force.troops[type] > 0)
							force.troops[type] -= G.move.sps[type]
					}
				}
			})
		}
	}

	// Add SPs to a battle in the target area, if it has enemy SPs.
	if (has_enemy_sp(G.active, to)) {
		if (!has_battle(to))
			log(`Battle declared at ${format_area(to)}.`)

		if (!has_battle(to)) {
			// Since no SPs from the attacking side are already present, we just add them as a single force.
			add_attacker_to_battle(G.active, from, to, G.move.type, G.move.leaders.slice(), G.move.sps.slice())

			// If all the defending SPs would fight at full strength, add them all as a single force.
			if (!have_sps_moved_in_area(to) || get_moved_sps_in_area(to).every(entry => decode_troop_moved_strength(entry) === FULL_STRENGTH)) {
				add_defender_to_battle(enemy(G.active), to, to, NONE, get_leaders_at_area(enemy(G.active), to), get_troop_list_by_type(enemy(G.active), to))
			} else {
				let leaders_at_area = get_leaders_at_area(enemy(G.active), to)
				let sps_at_area = get_troop_list_by_type(enemy(G.active), to)

				// Re-derive force (bit kludgy)
				let force = {
					leaders: [],
					sps: Array(NUM_TROOP_TYPES).fill(0)
				}

				// Add all Forced March SPs in the destination as a separate force.
				// They still count as having originating from the destination area, since the battle is declared after those SPs moved.
				// Leaders don't strictly have a 'strength', but it is less jarring to put them along with the force they entered with.
				map_for_each(G.moved.leaders, (leader, info) => {
					if (get_leader_location(leader) === to && info.strength === HALF_STRENGTH) {
						set_add(force.leaders, leader)
						set_delete(leaders_at_area, leader)
					}
				})
				for (let entry of get_moved_sps_in_area(to)) {
					if (
						decode_troop_moved_player(entry) === enemy(G.active)
						&& decode_troop_moved_strength(entry) === HALF_STRENGTH
					) {
						force.sps[decode_troop_moved_type(entry)] += decode_troop_moved_num(entry)
						sps_at_area[decode_troop_moved_type(entry)] -= decode_troop_moved_num(entry)
					}
				}
				add_defender_to_battle(enemy(G.active), to, to, HALF_STRENGTH, force.leaders, force.sps)

				// If any SPs or leaders who haven't yet been added to the battle, add them now at full strength.
				// March orders are not tracked for battle purposes, since they fight identically to SPs that did not move.
				if (leaders_at_area.length > 0 || sps_at_area.some(type => type > 0))
					add_defender_to_battle(G.active, to, to, NONE, leaders_at_area.slice(), sps_at_area.slice())
			}
		}
		// If reinforcing an existing battle, simply add them in as a separate force.
		else {
			if (is_battle_attacker(G.active, to))
				add_attacker_to_battle(G.active, from, to, G.move.type, G.move.leaders.slice(), G.move.sps.slice())
			else
				add_defender_to_battle(G.active, from, to, G.move.type, G.move.leaders.slice(), G.move.sps.slice())
		}
	}
}

P.confirm_remove_depot = {
	//L.area
	prompt() {
		V.prompt = `${ROLES[enemy(G.active)]} needs to remove a depot from ${format_area(L.area)}. Confirm move? (cannot be undone).`
		button_confirm()
	},
	confirm() {
		G.active = enemy(G.active)
		goto("remove_depot", { area: L.area })
	},
}

P.remove_depot = {
	_begin() {
		//L.area
		L.has_removed_depot = false
		L.has_discarded = false
	},
	prompt() {
		if (!L.has_removed_depot) {
			V.prompt = `Remove depot from ${format_area(L.area)}.`
			action("depot", find_depot_at_location(G.active, L.area))
		} else if (!L.has_discarded) {
			if (count_non_dummy_cards_in_hand(G.active) > 0) {
				V.prompt = `Discard a card from your hand.`
				get_non_dummy_cards_in_hand(G.active).forEach(action_card)
			} else {
				V.prompt = `No cards in hand to discard.`
				button_pass()
			}
		} else {
			V.prompt = `Remove depot: All done.`
			button_done()
		}
	},
	depot(depot) {
		push_undo()
		remove_depot(depot, get_depot_location(depot))
		L.has_removed_depot = true
	},
	card(card) {
		push_undo()
		discard_card(card)
		log_masked(G.active, `Discarded ${format_card(card)}.`, `${ROLES[G.active]} discarded a card.`)
		L.has_discarded = true
	},
	pass() {
		push_undo()
		L.has_discarded = true
	},
	done() {
		G.active = enemy(G.active)
		end()
	}
}

P.determine_seniority = {
	_begin() {
		// L.area
		L.leaders = []
		let max_seniority = get_leader_seniority(get_seniormost_leader(G.active, L.area))
		for (let leader of get_leaders_at_area(G.active, L.area)) {
			if (get_leader_seniority(leader) === max_seniority)
				set_add(L.leaders, leader)
		}
	},
	prompt() {
		V.prompt = `Select leader of combined force: ${join_array_with_or(L.leaders.map(format_leader))}`
		for (let leader of L.leaders)
			action("leader_button", leader)
	},
	leader_button(leader) {
		push_undo()
		let relative_seniorities = L.leaders.map(ldr => G.seniority[G.active].indexOf(ldr))
		array_delete_item(G.seniority[G.active], leader)
		array_insert(G.seniority[G.active],  Math.min(...relative_seniorities), leader)
		end()
	}
}

function get_post_move_exhaustion_events(who, move_type) {
	let events = []
	if (who === RUSSIA) {
		if (move_type === FORCED_MARCH) {
			if (is_event_active(C_EXTREME_WEATHER_RU))
				set_add(events, C_EXTREME_WEATHER_RU)
		} else {
			for (let event of [C_EXTREME_WEATHER_RU, C_EXTREME_WEATHER_FR])
				if (is_event_active(event)) set_add(events, event)
		}
	} else {
		if (move_type === FORCED_MARCH) {
			for (let event of [C_EXTREME_WEATHER_RU, C_HARD_MARCHING_1, C_HARD_MARCHING_2])
				if (is_event_active(event)) set_add(events, event)
		} else {
			for (let event of [C_EXTREME_WEATHER_RU, C_FAST_MARCHING_1, C_FAST_MARCHING_2, C_EXTREME_WEATHER_FR])
				if (is_event_active(event)) set_add(events, event)
		}
	}
	return events
}

function has_fresh_moving_sp() {
	for (let type = 0; type < NUM_TROOP_TYPES; ++type)
		if (is_troop_type_fresh(type) && G.move.sps[type] > 0)
			return true
	return false
}

P.post_move_exhaustion = {
	_begin() {
		L.events = get_post_move_exhaustion_events(G.active, G.move.type)
		L.current_event = L.events.shift()
	},
	prompt() {
		if (L.current_event > 0) {
			if (has_fresh_moving_sp()) {
				prompt_card(L.current_event, `Exhaust an SP in the moving force.`)

				if (L.current_event === C_EXTREME_WEATHER_RU && G.move.sps[FRESH_CAVALRY] > 0) {
					action_troop_alt(FRESH_CAVALRY, G.move.path[G.move.path.length - 1], get_move_strength(G.move.type), G.move.path[G.move.path.length - 2])
					return
				}

				for (let type = 0; type < G.move.sps.length; ++type)
					if (is_troop_type_fresh(type) && G.move.sps[type] > 0)
						action_troop_alt(type, G.move.path[G.move.path.length - 1], get_move_strength(G.move.type), G.move.path[G.move.path.length - 2])
			} else {
				prompt_card(L.current_event, `No fresh SPs in the moving force.`)
				button_confirm()
			}
		} else {
			V.prompt = `Assign exhaustion — All done.`
			button_done()
		}
	},
	troop(entry) {
		push_undo()
		let type = decode_troop_action_type(entry)
		let strength = decode_troop_action_strength(entry)
		let from = decode_troop_action_from(entry)
		let destination = G.move.path[G.move.path.length - 1]

		exhaust_sp(G.active, destination, type, 1, true, true, strength, from, has_battle(destination))

		log()
		log(`${format_card(L.current_event)}`)
		logi(`Exhausted`)
		log_masked(G.active, format_ii(`1 ${get_troop_type_name(type)}`), format_ii(`1 fresh SP`))

		if (L.current_event === C_FAST_MARCHING_1 || L.current_event === C_FAST_MARCHING_2)
			map_delete(G.persistent_events, L.current_event)
		L.current_event = L.events.shift() ?? -1
	},
	confirm() {
		push_undo()
		log(`${format_card(L.current_event)}`)
		logi(`Exhausted`)
		logii(`Nothing`)
		L.current_event = L.events.shift() ?? -1
	},
	done() {
		push_undo()
		end()
	}
}

// === EXECUTE CAVALRY PATROLS ORDERS ===
/*
	Cavalry Patrols
	RUSSIA
		#2 Confused Retreat - when executing Cavalry Patrols orders
		#20 Flying Columns - before executing Cavalry Patrols orders

	FRANCE
		#25 Good Leadership - after executing Cavalry Patrols orders
*/

P.execute_cavalry_patrols = script(`
	if (G.active === RUSSIA && hand_has(RUSSIA, C_CONFUSED_RETREAT)) {
		call may_play_confused_retreat { area: L.area }
	}
	call cavalry_patrols { area: L.area }
	goto end_order { type: CAVALRY_PATROLS }
`)

function has_cavalry_or_cossack_in_area(who, area) {
	if (!has_troop(area))
		return false
	return get_area_troop_set(area, null).some(entry => (decode_troop_entry_who(entry) === who) && (is_cavalry(decode_troop_entry_type(entry)) || is_cossack(decode_troop_entry_type(entry))))
}

function get_cavalry_patrols_targets(player, area) {
	let areas = [area, ...get_all_adjacent_areas(area)]
	return areas.filter(a => has_enemy_sp(player, a) || has_friendly_order(enemy(player), a))
}

P.cavalry_patrols = {
	_begin() {
		// L.area
		L.areas = get_cavalry_patrols_targets(G.active, L.area)
		L.selected_area = -1
	},
	prompt() {
		if (L.areas.length === 0) {
			V.prompt = `No valid targets for Cavalry Patrols at ${format_area(L.area)}.`
			button_pass()
		} else if (L.selected_area === -1) {
			V.prompt = `Select an area to reveal all enemy SPs and orders. (${join_array_with_or(L.areas.map(format_area))})`
			L.areas.forEach(action_area)
		} else {
			V.prompt = `You designated ${format_area(L.selected_area)}. (cannot be undone)`
			button_confirm()
		}
	},
	pass() {
		push_undo()
		log("No eligible areas to reveal enemy SPs and orders.")
		end()
	},
	area(area) {
		push_undo()
		L.selected_area = area
	},
	confirm() {
		clear_undo()
		goto("cavalry_patrols_reveal", { area: L.selected_area })
	}
}

P.cavalry_patrols_reveal = function() {
	log(`Revealed ${format_area(L.selected_area)}:`)
	logi("Leaders")
	for (let leader of get_leaders_at_area(G.active, L.selected_area))
		logii(format_leader(leader))
	logi("SPs")
	for (let entry of get_area_troop_set(L.selected_area, null)) {
		if (decode_troop_entry_who(entry) === enemy(G.active))
			logii(`${decode_troop_entry_num(entry)} ${get_troop_type_name(decode_troop_entry_type(entry))}`)
	}
	logi("Orders")
	if (get_orders_at_area(enemy(G.active), L.selected_area).length === 0)
		logii("No orders.")
	else
		for (let order of get_orders_at_area(enemy(G.active), L.selected_area))
			logii(`${get_order_type_name(get_order_type(order))}`)
	end()
}

// === EXECUTE EVADE ORDERS ===
/*
	Events
	RUSSIA
		#1 	Well-Disciplined Retreat 	Apply effect		- no exhaustion with Evade orders
		#27	Unexpected Retreat 			Before				- All Austrian SPs conduct an immediate 'Evade' in areas with Russian SPs. Schwarzenberg may accompany them.
		#29	Cavalry Screening 			Before				- Place up to 2 Evade orders in areas with RU Cavalry/Cossack

	FRANCE
		#4 Holy Mother Russia 			During				- FR +1 VP for each RU army that evades from the selected city
		#7 Unsuccessful Disengagement 	When RU executes	- Cancel all evade orders in one area.
		#49 Tough Rearguard				When				- No exhaustion suffered, inflict one exhaustion in Russians

*/

P.may_play_evade_events = {
	_begin() {
		L.events = [C_UNEXPECTED_RETREAT, C_CAVALRY_SCREENING].filter(card => hand_has(RUSSIA, card))
		L.has_played_event = false
	},
	prompt() {
		if (L.events.length > 0) {
			V.prompt = `You may play ${join_array_with_or(L.events.map(card => format_card(card)))}.`
			L.events.forEach(card => action_card(card))
			button_pass()
		} else if (L.has_played_event) {
			V.prompt = `Play Events: All done.`
			button_done()
		} else {
			V.prompt = `You do not have ${format_card(C_UNEXPECTED_RETREAT)} or ${format_card(C_CAVALRY_SCREENING)} in hand.`
			button_pass()
		}
	},
	card(card) {
		push_undo()
		L.has_played_event = true
		set_delete(L.events, card)
		call("event", { card })
	},
	pass() { end() },
	done() { end() }
}

P.execute_evade = script(`
	set L.evader G.active
	if (L.evader === RUSSIA && can_play_event(C_UNSUCCESSFUL_DISENGAGEMENT)) {
		set G.active FRANCE
		call may_play_unsuccessful_disengagement { area: L.area }
		set G.active RUSSIA
	}
	if (L.evader === FRANCE && can_play_event(C_TOUGH_REARGUARD) && hand_has(FRANCE, C_TOUGH_REARGUARD)) {
		call may_play_tough_rearguard
	}
	if (L.unsuccessful_disengagement) {
		goto end_order { type: EVADE }
	} else {
		call select_evade_destination { area: L.area }
		if (L.$ > -1) {
			call select_evade_force { area: L.area, destination: L.$ }
			if (has_battle(L.area)) {
				call evade { evader: L.evader, area: L.area }
			}
			call finish_evade { evader: L.evader, area: L.area }
		}
	}
`)

P.select_evade_destination = {
	_begin() {
		L.retreat_destinations = find_retreat_destinations(G.active, L.area)
		// Handles weird edge cases where the force has a valid retreat destination but the cluster is encircled by enemy SPs.
		if (L.retreat_destinations.length === 0)
			L.retreat_destinations = get_all_adjacent_areas(L.area).filter(area => !has_enemy_sp(G.active, area))
	},
	prompt() {
		if (L.retreat_destinations.length > 0) {
			V.prompt = `Select destination for Evade from ${format_area(L.area)}. (${join_array_with_or(L.retreat_destinations.map(format_area))})`
			L.retreat_destinations.forEach(action_area)
		} else {
			V.prompt = `No valid destination for Evade from ${format_area(L.area)}`
			button_confirm()
		}
	},
	area(area) {
		push_undo()
		L.L.$ = area
		end()
	},
	confirm() {
		push_undo()
		log(`No valid Evade destinations.`)
		log()
		L.L.$ = -1
		end()
	}
}

function get_evade_sps(who, area) {
	let evade_sps = []

	// Use battle data since it naturally has forces separated by connection and move type
	get_player_battle_data(who, area).forces.forEach((force) => {
		if (!map_has(evade_sps, force.from))
			map_set(evade_sps, force.from, [])

		let troops = Array(NUM_TROOP_TYPES).fill(0)
		for (let type = 0; type < force.troops.length; ++type) {
			if (is_event_active(C_UNEXPECTED_RETREAT) && !(type === FRESH_AUSTRIAN_INFANTRY || type === EXHAUSTED_AUSTRIAN_INFANTRY)) {
				continue
			} else {
				if (force.troops[type] > 0)
					troops[type] += force.troops[type]
			}
		}

		map_set(map_get(evade_sps, force.from, null), force.strength, troops)
	})

	return evade_sps
}

P.select_evade_force = {
	_begin() {
		// Leaders & SPs eligible for Evade
		// Schwarzenberg is the only leader who can join 'Unexpected Retreat'
		if (is_event_active(C_UNEXPECTED_RETREAT)) {
			L.leaders = []
			if (get_leader_location(L_SCHWARZENBERG) === L.area)
				set_add(L.leaders, L_SCHWARZENBERG)
		} else {
			L.leaders = get_leaders_at_area(G.active, L.area)
		}
		L.sps = get_evade_sps(G.active, L.area)

		// Running count of the number of SPs selected
		L.num_sps_selected = 0

		G.move = {
			type: EVADE,
			// Leaders part of the Evade
			leaders: [],
			// Nested map of troops that can evade.
			// First keyed by area of origin, then keyed by move type.
			// For attackers, area of origin is important as it can influence their retreat options after battle.
			// It has to be this intricate since connections influences where the force could retreat after battle & move type determines battle strength.
			sps: [],
			destination: L.destination,
		}
	},
	prompt() {
		// Selecting a force: unlimited with a leader, max. 4 without
		let max_sps_selectable = G.move.leaders.length > 0 ? count_num_sps(G.active, L.area) : 4

		if (G.move.leaders.length > 0) {
			V.prompt = `Select any or all leaders and SPs to evade from ${format_area(L.area)}.`
			update_alexander_prompt(L.leaders)
			update_platov_prompt()
		} else {
			V.prompt = `Select up to 4 SPs (at least 1) to move from ${format_area(L.area)}`
		}

		V.prompt = `Select leaders and SPs to evade from ${format_area(L.area)}.`

		for (let leader of L.leaders)
			action_leader(leader)

		map_for_each(L.sps, (from, forces) => {
			map_for_each(forces, (strength, sps) => {
				for (let type = 0; type < sps.length; ++type) {
					// Platov leader ability: He may only command Cavalry and Cossack SPs
					if (
						G.active === RUSSIA
						&& G.move.leaders.length === 1
						&& set_has(G.move.leaders, L_PLATOV)
						&& !could_platov_select(type)
					) {
						continue
					}

					if (sps[type] > 0) {
						// Ignore if all SPs have already been selected.
						if (map_has(G.move.sps, from) && map_has(map_get(G.move.sps, from), strength) && map_get(map_get(G.move.sps, from), strength)[type] >= sps[type])
							continue
						else
							action_troop_alt(type, L.area, strength, from)
					}
				}
			})
		})

		map_for_each(G.move.sps, (from, forces) => {
			map_for_each(forces, (strength, sps) => {
				for (let type = 0; type < sps.length; ++type)
					if (sps[type] > 0)
						action_troop_alt(type, L.area, strength, from, 1)
			})
		})

		if ((has_friendly_leader(G.active, L.area) || count_num_sps(G.active, L.area) <= 4)
				&& (G.move.leaders.length < L.leaders.length || L.num_sps_selected < max_sps_selectable)
		) {
			button("select_all")
		}

		button("evade",
			L.num_sps_selected > 0
			&& L.num_sps_selected <= max_sps_selectable
			&& can_alexander_be_babysitted(true)
		)
	},
	leader(leader) {
		push_undo()
		set_toggle(G.move.leaders, leader)

		// If a leader is removed and the only remaining leader is Platov, remove all non-Cavalry and non-Cossack SPs
		if (G.active === RUSSIA && G.move.leaders.length === 1 && set_has(G.move.leaders, L_PLATOV)) {
			map_for_each_value(G.move.sps, (forces) => {
				map_for_each_value(forces, (sps) => {
					for (let type = 0; type < sps.length; ++type) {
						if (!could_platov_select(type) && sps[type] > 0) {
							L.num_sps_selected -= sps[type]
							sps[type] = 0
						}
					}
				})
			})
		}
	},
	troop(entry) {
		push_undo()
		let type = decode_troop_action_type(entry)
		let strength = decode_troop_action_strength(entry)
		let from = decode_troop_action_from(entry)
		let moving = decode_troop_action_moving(entry)

		if (!map_has(G.move.sps, from))
			map_set(G.move.sps, from, [])

		if (!map_has(map_get(G.move.sps, from), strength))
			map_set(map_get(G.move.sps, from), strength, Array(NUM_TROOP_TYPES).fill(0))

		if (!moving) {
			++map_get(map_get(G.move.sps, from), strength)[type]
			++L.num_sps_selected
		} else {
			--map_get(map_get(G.move.sps, from), strength)[type]
			--L.num_sps_selected
		}
	},
	select_all() {
		push_undo()
		G.move.leaders = L.leaders.slice()
		map_clear(G.move.sps)

		L.num_sps_selected = 0
		map_for_each(L.sps, (from, forces) => {
			let copy = []
			map_for_each(forces, (strength, sps) => {
				copy.push(strength)
				// If Platov is the only leader at the area, do not add SPs that he cannot Command.
				if (G.active === RUSSIA && L.leaders.length === 1 && set_has(L.leaders, L_PLATOV)) {
					let selected_sps = Array(NUM_TROOP_TYPES).fill(0)
					for (let type = 0; type < sps.length; ++type) {
						if (could_platov_select(type) && sps[type] > 0) {
							selected_sps[type] += sps[type]
							L.num_sps_selected += sps[type]
						}
					}
					copy.push(selected_sps)
				} else {
					copy.push(sps.slice())
				}
			})
			map_set(G.move.sps, from, copy)
		})

		if (G.active === RUSSIA && L.leaders.length === 1 && set_has(L.leaders, L_PLATOV))
			return
		else if (is_event_active(C_UNEXPECTED_RETREAT))
			L.num_sps_selected = count_num_sps_of_type(FRANCE, FRESH_AUSTRIAN_INFANTRY, L.area) + count_num_sps_of_type(FRANCE, EXHAUSTED_AUSTRIAN_INFANTRY, L.area)
		else
			L.num_sps_selected = count_num_sps(G.active, L.area)
	},
	evade() {
		push_undo()

		log(`Evaded from ${format_area(L.area)}`)
		let sp_count = get_evading_sps()
		if (G.move.leaders.length > 0) {
			logi(format_leader(get_seniormost_leader_from_list(G.active, G.move.leaders))) //Seniormost leader
			for (let type = 0; type < sp_count.length; ++type) {
				if (sp_count[type] > 0)
					log_only(G.active, format_ii(`${sp_count[type]} ${get_troop_type_name(type)}`))
			}
		} else {
			for (let type = 0; type < sp_count.length; ++type) {
				if (sp_count[type] > 0) {
					logii(`${sp_count[type]} ${get_troop_type_name(type)}`)
				}
			}
		}
		log()

		if (is_event_active(C_TOUGH_REARGUARD)) {
			G.active = RUSSIA
			log_card(C_TOUGH_REARGUARD)
			goto("apply_tough_rearguard", { area: L.area })
		} else if (L.num_sps_selected === count_num_sps(G.active, L.area)) {
			goto("evade_pursuit", { evader: G.active, area: L.area })
		} else {
			end()
		}
	}
}

P.evade_pursuit = {
	_begin() {
		L.has_confirmed_pursuit = false
	},
	prompt() {
		if (!L.has_confirmed_pursuit) {
			V.prompt = `You have not left a rearguard at ${format_area(L.area)}. Confirm pursuit? (cannot be undone)`
			button_confirm()
		} else {
			V.prompt = `Reveal pursuit strength (1x Cavalry + 2x Cossack): ${L.pursuit_cavalry[R]}.`
			button_confirm()
		}
	},
	confirm() {
		push_undo()
		if (!L.has_confirmed_pursuit) {
			L.has_confirmed_pursuit = true
			G.active = [RUSSIA, FRANCE]
			L.pursuit_cavalry = [count_pursuit_cavalry(RUSSIA, L.area), count_pursuit_cavalry(FRANCE, L.area)]
		} else {
			set_delete(G.active, R)

			if (G.active.length === 0) {
				log()
				log_h5("Pursuit")
				log("Revealed")
				logi(`${ROLES[L.evader]}`)
				logii(`${L.pursuit_cavalry[L.evader]} strength`)
				logi(`${ROLES[enemy(L.evader)]}`)
				logii(`${L.pursuit_cavalry[enemy(L.evader)]} strength`)

				if (L.pursuit_cavalry[L.evader] <= L.pursuit_cavalry[enemy(L.evader)]) {
					log(`${ROLES[L.evader]} must exhaust 1 SP.`)
					log()
					goto("evade_pursuit_exhaustion", { evader: L.evader, area: L.area })
				} else {
					log(`Pursuit inconclusive!`)
					log()
					end()
				}
			}
		}
	}
}

function get_evading_sps() {
	let list = Array(NUM_TROOP_TYPES).fill(0)
	map_for_each_value(G.move.sps, (forces) => {
		map_for_each_value(forces, (sps) => {
			for (let type = 0; type < sps.length; ++type) {
				if (sps[type] > 0)
					list[type] += sps[type]
			}
		})
	})
	return list
}

P.evade_pursuit_exhaustion = {
	_begin() {
		// L.area
		G.active = L.evader
		L.has_assigned_exhaustion = false
	},
	prompt() {
		if (!has_fresh_sp(G.active, L.area)) {
			V.prompt = `No more fresh SPs at ${format_area(L.area)}.`
			button_next()
		} else if (!L.has_assigned_exhaustion) {
			// RU #1 Well Disciplined Retreat: No exhaustion when executing Evade orders, regardless of the number of cavalry/cossacks involved.
			if (L.evader === RUSSIA && is_event_active(C_WELL_DISCIPLINED_RETREAT)) {
				prompt_card(C_WELL_DISCIPLINED_RETREAT, "No exhaustion when executing Evade orders.")
				button_confirm()
			} else {
				V.prompt = `Lost pursuit: Assign one exhaustion to any evading SP.`
				map_for_each(G.move.sps, (from, forces) => {
					map_for_each(forces, (strength, sps) => {
						for (let type = 0; type < sps.length; ++type)
							if (is_troop_type_fresh(type) && sps[type] > 0)
								action_troop_alt(type, L.area, strength, from, 1)
					})
				})
			}
		} else {
			V.prompt = `Assign pursuit losses: All done.`
			button_done()
		}
	},
	troop(entry) {
		push_undo()
		let type = decode_troop_action_type(entry)
		let strength = decode_troop_action_strength(entry)
		let from = decode_troop_action_from(entry)

		battle_exhaust_sp(L.evader, L.area, type, strength, from)
		L.has_assigned_exhaustion = true

		map_get(map_get(G.move.sps, from), strength)[type]--
		map_get(map_get(G.move.sps, from), strength)[type + 1]++
	},
	next() {
		push_undo()
		goto("eliminate_all_sps", { evader: L.evader, area: L.area })
	},
	done() {
		push_undo()
		end()
	},
	confirm() {
		push_undo()
		log_card(C_WELL_DISCIPLINED_RETREAT)
		logi(`No exhaustion.`)
		L.has_assigned_exhaustion = true
	}
}

P.eliminate_all_sps = {
	_begin() {
		L.has_eliminated_sps = false
		L.has_shifted_vp = false
	},
	prompt() {
		if (!L.has_eliminated_sps) {
			V.prompt = `Eliminate all SPs at ${format_area(L.area)}.`
			button("eliminate")
		} else if (!L.has_shifted_vp) {
			if (has_friendly_leader(G.active, L.area)) {
				V.prompt = `No friendly SPs: Eliminate all leaders at ${format_area(L.area)}.`
				get_leaders_at_area(G.active, L.area).forEach(action_leader)
			} else {
				V.prompt = `Eliminated ${L.count} SPs: ${ROLES[G.active]} loses ${L.count} VP.`
				action_vp_marker()
			}
		} else {
			V.prompt = `Eliminate all SPs: All done.`
			button_done()
		}
	},
	eliminate() {
		push_undo()
		log(`${ROLES[G.active]} has no more fresh SPs.`)
		log(`Eliminated all SPs at ${format_area(L.area)}.`)
		L.count = count_num_sps(G.active, L.area)
		for (let type of get_troop_types_at_area(G.active, L.area))
			eliminate_troop(G.active, L.area, type, count_num_sps_of_type(G.active, type, L.area))
		L.has_eliminated_sps = true
		if (G.phase === TURN_PHASES.findIndex(phase => phase === EVADE))
			delete_battle_entry(L.area)
	},
	leader(leader) {
		push_undo()
		log("Eliminated")
		logi(format_leader(leader))
		eliminate_leader(leader)
	},
	vp() {
		push_undo()
		L.has_shifted_vp = true
		decrease_vp(G.active, L.count)
	},
	done() {
		push_undo()
		if (!sudden_death())
			end()
	}
}

P.evade = function() {
	let battle_data = get_player_battle_data(L.evader, L.area)

	for (let leader of G.move.leaders) {
		move_leader(leader, G.move.destination)
		for (let entry of battle_data.forces) {
			if (set_has(entry.leaders, leader)) {
				set_delete(entry.leaders, leader)
				break
			}
		}
	}

	map_for_each(G.move.sps, (origin, forces) => {
		map_for_each(forces, (strength, sps) => {
			for (let type = 0; type < sps.length; ++type) {
				if (sps[type] > 0) {
					move_troop(L.evader, L.area, G.move.destination, type, sps[type])
					for (let entry of battle_data.forces) {
						if (entry.from === origin && entry.strength === strength) {
							entry.troops[type] -= sps[type]
						}
					}
				}
			}
		})
	})

	if (battle_data.forces.every(force => force.troops.every(type => type === 0)))
		delete_battle_entry(L.area)

	if (is_event_active(C_HOLY_MOTHER_RUSSIA_FR) && get_event_keyword(C_HOLY_MOTHER_RUSSIA_FR, "area") === L.area) {
		log(`${format_card(C_HOLY_MOTHER_RUSSIA_FR)}`)
		increase_vp(RUSSIA)
	}

	log()
	log(`Evaded to ${format_area(G.move.destination)}.`)
	log()

	G.move = {}

	end()
}

P.finish_evade = {
	_begin() {
		G.active = L.evader
		if (has_friendly_depot(G.active, L.area) && !has_friendly_troop(G.active, L.area))
			call("remove_depot", { area: L.area })
	},
	prompt() {
		if (get_devastation(L.area) < 3) {
			V.prompt = `Increase devastation at ${format_area(L.area)} to ${get_devastation(L.area) + 1}.`
			action_area(L.area)
		} else {
			V.prompt = `Devastation at ${format_area(L.area)} cannot be increased further.`
			button_pass()
		}
	},
	_resume() {
		G.active = L.evader
	},
	area(area) {
		push_undo()
		increase_devastation(area)
		log(`Increased devastation at ${format_area(L.area)}.`)
		this.pass()
	},
	pass() {
		log()
		if (is_vp_area(L.area) && !has_friendly_troop(L.evader, L.area)) {
			increase_vp(enemy(L.evader), get_area_vp(L.area))
		}
		if (is_event_active(C_UNEXPECTED_RETREAT))
			end()
		else
			goto("end_order", { type: EVADE })
	}
}

function get_other_area(connection, area) {
	return data.connections[connection].find(loc => loc !== area)
}

function find_retreat_destinations(who, area, among = get_all_adjacent_areas(area), ignore_enemy_sps = false) {
	let closest_depots = find_closest_depot_for_retreat(who, area, ignore_enemy_sps)
	let retreat_destinations = []
	let best_distance = 999

	for (let depot of closest_depots) {
		let distances = []
		for (let neighbor of among) {
			let distance = find_path_distance(neighbor, depot, -1, ignore_enemy_sps)

			if (!map_has(distances, distance))
				map_set(distances, distance, [])
			set_add(map_get(distances,  distance, null), neighbor)
		}

		// distances[0] since the map is sorted on the distance to the nearest depot (so distances[0] would have the destinations closest to a depot)
		if (distances.length > 0 && (distances[0] <= best_distance)) {
			if (distances.length > 0) {
				if (distances[0] < best_distance) {
					retreat_destinations = distances[1].slice()
					best_distance = distances[0]
				} else {
					for (let area of distances[1]) { //Areas corresponding to shortest-distance entry
						set_add(retreat_destinations, area)
					}
				}
			}
		}
	}

	return retreat_destinations.filter(dest => {
		return ignore_enemy_sps || !has_enemy_sp(who, dest)
	})
}

function find_path_distance(a, b, connection_type = -1, ignore_enemy_sps = false) {
	let queue = [ a ]
	let distance = []
	let visited = []

	map_set(distance, a, 0)

	function get_distance(area, fallback = 999) { return map_get(distance, area, fallback)}

	while (queue.length > 0) {
		let current = queue.shift()

		if (current === b)
			return get_distance(current)

		if (set_has(visited, current)) {
			continue
		}

		set_add(visited, current)

		if (!ignore_enemy_sps && has_enemy_sp(G.active, current))
			continue

		let current_distance = get_distance(current)
		let adjacencies = (connection_type === ROAD) ? get_adjacent_areas_by_road(current) : get_all_adjacent_areas(current)
		for (let neighbor of adjacencies) {
			if (!map_has(distance, neighbor)) {
				map_set(distance, neighbor, current_distance + 1)
				queue.push(neighbor)
			}
		}
	}

	return 999
}

//Returns a set of depots that are closest to an area (for retreat purposes)
function find_closest_depot_for_retreat(who, area, ignore_enemy_sps = false) {
	let depots = get_areas_with_depots(who)
	// If there are NO depots on the map, use supply sources instead (mostly relevant for first-turn evasions)
	if (depots.length === 0) depots = get_supply_sources(who)

	let visited = []
	set_add(visited, area) //Depots that are in the area are excluded for retreat purposes

	let distance = []
	map_set(distance, area, 0)

	function get_distance(loc, fallback = 999) { return map_get(distance, loc, fallback) }

	let queue = []
	for (let loc of get_all_adjacent_areas(area)) {
		queue.push(loc)
		map_set(distance, loc, 1)
	}

	let closest_depots = []
	while (queue.length > 0) {
		let current = queue.shift()

		if (closest_depots.some(loc => get_distance(loc) < get_distance(current))) {
			return closest_depots
		}

		if (set_has(visited, current)) {
			continue
		}
		set_add(visited, current)

		if (!ignore_enemy_sps && has_enemy_sp(who, current))
			continue

		if (set_has(depots, current))
			set_add(closest_depots, current)

		let new_distance = get_distance(current) + 1
		for (let loc of get_all_adjacent_areas(current)) {
			if (!set_has(visited, loc)) queue.push(loc)
			if (!map_has(distance, loc) || (get_distance(loc) > new_distance))
				map_set(distance, loc, get_distance(current) + 1)
		}
	}
	return closest_depots
}

// === BATTLE RESOLUTION ===
/*
	NOTE: The events with an asterisk are the ones that are complete so far (will remove these later)

	Events
	RUSSIA
		#5 	Idle Reserves 			If defending											- Imperial Guard fight X0, unless France play 'The Imperial Guard'
		#7 	Indecision	 																	- Cancel the effect of 'The Imperial Guard'
		#8 	Fighting Withdrawal 	If defending											- Both sides' losses are reduced by 2 and no pursuit. RU must retreat after battle and count as having lost it.
		#9 	Uninspired Tactics		If defending in a fortress town || under defend orders	- FR losses +1
		#12	Outflanking				Attacking with a leader across > 1 connection			- FR designate one connection as the main attack. The FR combat value is reduced by the total combat value across all other connections
		#22 City Ablaze!			When FR gain control of a Key City
		#23	Stubborn Rearguard		Immediately after losing a battle						- Cancel any losses from pursuit in the battle
		#28	Poor Coordination		No restriction									- FR combat value -3 for each Track connection used
		#31 Stoic Infantry			If defending, at least 1 Infantry							- First two SPs exhausted in this battle immediately rally again
		#32 The Artillery Corps		If a RU leader is present								- FR losses +1, +1 more if France play 'Infantry Squares'
		#33	Fortifications			If defending with a leader								- Place a 'Defend' order, or double the effect of an existing one. Cancels 'Outflanking'.
		#34	Platov's Cossacks		If Platov is present									- Cossacks fight at X1. French combat value -= num cossacks
		#35	Fickle Habsburgs		If Schwarzenberg is present								- Losses on both sides -1, RU wins even if tied
		#36	Infantry Squares		If at least 4 RU Infantry SPs are present				- Combat value of all French Cavalry is X0, first loss must be cavalry if present
		#37	Enveloping Moves		If attacking with a leader								- If RU > FR fresh sps, drawn battle is considered Russian victory
		#38	Konstantine's Corps		If a RU leader is present								- Up to 3 Infantry SPs fight at X2, draw additional card if battle won
		#39	Cavalry Charge			If a RU leader is present								- Combat value of up to 2 RU Cavalry is doubled. draw additional card if battle won
		#40	Delayed Forces			If defending											- FR designates one connection used to enter battle, the combat value of FR forces entering across all other connections is X0. Cancels 'Outflanking'
		#41	Fierce Fighting			If defending with a leader								- Increase both sides' losses by 2, and no prusuit
		#47	Treacherous Allies																- If RU are within two areas of Vilna, eliminate all Prussian and Austrian Sps in this battle + Schwarzenberg
		#50	Crumbling Cohesion		If attacking											- Shift Initiative 1 in Russia's favor. Cossacks X(RU Initiative) instead of X0.
		#51	Unreliable Germans		If RU has the initiative								- All Austrian and Prussian SPs X0, French Infantry and Cavalry X0,5
		#53	Aggressive Cossacks		If RU has the initiative								- Combat value of Cossacks X2 instead of X0

	FRANCE
		#1 	Hard Marching																	- Forced March FR SPs fight X1 instead of X0,5
		#2 	Hard Marching																	- Forced March FR SPs fight X1 instead of X0,5
		#6 	Outflanking				If attacking from more than one direction				- RU designate one connection as main attack. The RU combat value is reduced by the total combat value across all other connections
		#7	Unsuccessful Diseng.															- Both sides losses -1
		#11	Grand Battery			If Napoleon is present									- RU losses +1 if defending, +2 if attacking. If RU played Infantry Squares losses +1 more.
		#12	Cavalry Charge			If Murat is present										- Up to two FR Cavalry SPs fight at X3
		#13	Murat's Cavalry			If Murat is present										- Up to two FR Cavalry SPs are doubled, but 1 is exhausted. If Fr win the battle, the remaining fresh Cavalry count X2 for pursuit.
		#14	Skillful Maneuvers		If attacking with a leader && across >1 connection		- When Battle cards are revealed, France may choose to either cancel the effect of a river or a 'defend' order.
		#16	Infantry Squares		If at least 2 FR infantry/Imperial Guard				- combat value of all RU Cavalry SPs is X0, and first loss must be cavalry
		#18	Outflanking				If attacking with a Leader and across >1 connection		- same as #6
		#21	Confusing Orders		If Kutuzov is present									- cancel the effect of up to 2 of the player RU battle cards
		#23	Poor Coordination		If RU forces entered the battle from >1 connection		- Reduce the total RU combat value by 2 for each connection used by RU to enter the battle
		#26	Combined Arms			If a FR leader is present								- X2 the combat value of up to 1 Cav. and 3 Inf. Cancels RU Infantry Squares.
		#27	Confusions & Delays		If defending											- Reduce FR losses by 2, RU by 1. France must retreat after battle, which is considered tied.
		#28	Saint-Cyr's VI Corps	If defending											- Place a 'Defend' order in the area and double the combat value of 2 FR Infantry SPs.
		#29	Eble's Pontoneers		If a FR leader is present								- Ignore the penalties of attacking across a river
		#30	Stubborn Rearguard		After losing											- Cancel any losses from pursuit in this battle
		#31	The Imperial Guard		If Napoleon is present.									- The combat value of all Imperial Guard are X3 instead of X1,5. If RU win, FR must discard a random card and Russia +2VP.
		#32	Delayed Forces			If RU forces entered the battle from >1 connection		- All RU Sps across 1 connection fight at X0. Cancels 'Outflanking'.
		#33	Napoleon's Marshals		If a FR leader is present								- Rally 1 exhausted SP before determining losses. Draw a card if you win the battle.
		#34	Fierce Fighting			If a FR leader is present								- FR losses +1, Russia losses +2, 1 RU eliminates 1 leader if present.
		#35	Ney's III Corps			If a FR leader is present								- up to 3 FR Infantry fight at X2, rally one exhuated SP after battle.
		#36	Eugene's IV Corps		If Eugene de Beauharnais is present						- up to 3 FR Infantry fight at X2
		#38	Inferior Gunpowder		If defending											- Halve the combat value of up to 8 RU Infantry SPs
		#47	Inferior Musketry		If defending											- Reduce FR losses by 1
		#50	Courage of Desperation	If RU has the Initiative								- Rally 1 exhausted SP. Up to 4 FR Exhausted SPs fight at X1 instead of X0.
		#51	The Old Guard			If an Imperial Guard SP is present						- Guard SPs fight at X2 instead of X1,5 and FR losses are reduced by 1. Cancels 'Outflanking'
		#52	Ney's Escape																	- Regardless of who wins FR must retreat, but may do so across any connection (incl. ones used by the attacker) as long as they are unoccupied by RU

	Leaders
	Napoleon - +1 to Battle Die and Play up to 4 cards
	Jerome	- -1 to Battle Die
	Beauharnais	- Play up to 3 cards
	Davout - +1 to battle die and play up to 3 cards
	Murat - count as 1 cav. sp for pursuit
	Schwarzenberg - Play up to 2 cards

	Alexander - -1 to Battle Die
	Kutuzov	- Battle Roll is automatically 1 & Play up to 2 cards
	Tolly - Play up to 3 cards
	Bagration - +1 to Battle die if defending & play up to 3 cards
	Tormasov - Play up to 2 cards
	Wittgenstein - Play up to 2 cards
	Chichagov - Play up to 2 cards
	Platov - none
*/

function init_battle_entry(area) {
	map_set(G.battles, area,
		{
			attacker: {who: -1, forces: [], losses: 0, num_eliminated: 0,},
			defender: {who: -1, forces: [], losses: 0, num_eliminated: 0,},
			events: [],
			// Event flags for those events that impact the global battle state (by completely ignoring certain connections)
			outflanking: -1,
			delayed_forces_ru: -1,
			delayed_forces_fr: -1,
		}
	)
}

function delete_battle_entry(area) {
	map_delete(G.battles, area)
}

function has_battle(area) {
	return map_has(G.battles, area)
}

function get_battle_entry(area, fallback = null) {
	return map_get(G.battles, area, fallback)
}

function get_attacker_data(area, fallback = null) {
	return get_battle_entry(area, fallback)?.attacker ?? null
}

function get_battle_attacker(area, fallback = null) {
	return get_attacker_data(area, fallback)?.who ?? -1
}

function is_battle_attacker(who, area) {
	return get_battle_attacker(area) === who
}

function add_attacker_to_battle(who, from, area, move_type, leaders, troops) {
	if (who === FRANCE && is_event_active(C_FREEZING_WEATHER)) {
		log()
		log(`${format_card(C_FREEZING_WEATHER)}`)
		logi(`All French forces fight as if under Forced March orders.`)
		move_type = FORCED_MARCH
	}

	if (!has_battle(area)) init_battle_entry(area)

	let battle = get_battle_entry(area, null)
	let strength = get_move_strength(move_type)

	//	Merge entries if there is already another with the same characteristics
	if (battle.attacker.forces.some(force => force.from === from && force.strength === strength)) {
		let force = battle.attacker.forces.find(f => f.from === from && f.strength === strength)

		for (let leader of leaders)
			set_add(force.leaders, leader)

		for (let type = 0; type < force.troops.length; ++type)
			if (troops[type] > 0)
				force.troops[type] += troops[type]
	}
	else {
		battle.attacker.who = who

		battle.attacker.forces.push({
			from: from,
			strength: strength,
			river_crossing: has_bridge(from, area),
			leaders: leaders,
			troops: troops,
		})
	}
}

function get_defender_data(area, fallback = null) {
	return get_battle_entry(area, fallback)?.defender ?? null
}

function get_battle_defender(area, fallback = null) {
	return get_defender_data(area, fallback)?.who ?? -1
}

function is_battle_defender(who, area) {
	return get_battle_defender(area) === who
}

function add_defender_to_battle(who, from, area, move_type, leaders, troops) {
	if (who === FRANCE && is_event_active(C_FREEZING_WEATHER)) {
		log()
		log(`${format_card(C_FREEZING_WEATHER)}`)
		logi(`All French forces fight as if under Forced March orders.`)
		move_type = FORCED_MARCH
	}

	if (!has_battle(area)) init_battle_entry(area)

	let battle = get_battle_entry(area, null)
	let strength = get_move_strength(move_type)

	if (battle.defender.forces.some(force => force.from === from && force.strength === strength)) {
		let force = battle.defender.forces.find(f => f.from === from && f.strength === strength)

		for (let leader of leaders)
			set_add(force.leaders, leader)

		for (let type = 0; type < force.troops.length; ++type)
			if (troops[type] > 0)
				force.troops[type] += troops[type]
	} else {
		battle.defender.who = who

		battle.defender.forces.push({
			from: from,
			strength: strength,
			river_crossing: false,
			leaders: leaders,
			troops: troops,
		})

		battle.defender.defend_order = false
	}
}

function get_player_battle_data(who, battle) {
	return is_battle_attacker(who, battle) ? get_attacker_data(battle) : get_defender_data(battle)
}

function get_connections_used_by_attacker(area) {
	if (!has_battle(area)) return []
	let origins = []
	get_attacker_data(area).forces.forEach(force => {
		if (!set_has(origins, force.from))
			set_add(origins, force.from)
	})
	return origins
}

function get_connections_used_by_defender(area) {
	if (!has_battle(area)) return []
	let origins = []
	get_defender_data(area).forces.forEach(force => {
		if (!set_has(origins, force.from))
			set_add(origins, force.from)
	})
	return origins
}

function get_connections_used_in_battle(who, area) {
	return is_battle_attacker(who, area) ? get_connections_used_by_attacker(area) : get_connections_used_by_defender(area)
}

function add_defend_order_to_battle(area) {
	get_battle_entry(area).defender.defend_order = true
}

function battle_has_defend_order(area) {
	return get_battle_entry(area).defender.defend_order
}

function update_battle_losses(who, area, amt) {
	get_player_battle_data(who, area).losses = amt
}

function has_bridge(from, to) {
	return areas[from]?.bridge.includes(to) ?? false
}

function add_battle_event(area, event) {
	if (!has_battle(area))
		init_battle_entry(area)

	set_add(get_battle_entry(area).events, event)
}

function remove_battle_event(area, event) {
	if (!has_battle(area))
		init_battle_entry(area)

	set_delete(get_battle_entry(area).events, event)
}

function is_battle_event_active(area, event) {
	return set_has(get_battle_entry(area).events, event)
}

function is_battle_event_currently_active(event) {
	if (!is_battle_event_active(G.current_battle, event))
		return false

	switch(event) {
	case C_IDLE_RESERVES:
		return !is_battle_event_currently_active(C_THE_IMPERIAL_GUARD)
	case C_OUTFLANKING_RU:
		return !is_battle_event_currently_active(C_DELAYED_FORCES_FR) && !is_battle_event_currently_active(C_THE_OLD_GUARD)
	case C_INFANTRY_SQUARES_RU:
		return !is_battle_event_currently_active(C_COMBINED_ARMS)
	case C_OUTFLANKING_FR_1:
	case C_OUTFLANKING_FR_2:
		return !is_battle_event_currently_active(C_POOR_COORDINATION_RU) && !is_battle_event_currently_active(C_FORTIFICATIONS) && !is_battle_event_currently_active(C_DELAYED_FORCES_RU)
	}

	return true
}

function add_battle_outflanking(area, connection_origin) {
	get_battle_entry(area, null).outflanking = connection_origin
}

// TOFIX
function add_battle_delayed_forces_ru(area, connection_origin) {
	get_battle_entry(area, null).delayed_forces_ru = connection_origin
}

function add_battle_delayed_forces_fr(area, connection_origin) {
	get_battle_entry(area, null).delayed_forces_fr = connection_origin
}

function set_battle_winner(who, area) {
	get_battle_entry(area).winner = who
}

function set_battle_loser(who, area) {
	get_battle_entry(area).loser = who
}

function get_battle_winner(area) {
	return get_battle_entry(area).winner
}

function get_battle_loser(area) {
	return get_battle_entry(area).loser
}

/* COMMON BATTLE EVENT ELIGIBILITY CHECKS */

function count_num_attacker_connections(area) {
	return get_connections_used_by_attacker(area).length
}

function count_num_defender_connections(area) {
	return get_connections_used_by_defender(area).length
}

function did_attacker_attack_across_multiple_connections(area) {
	return count_num_attacker_connections(area) > 1
}

function has_leader_in_battle(who, area) {
	return get_player_battle_data(who, area).forces.some(force => force.leaders.length > 0)
}

function is_leader_in_battle(leader, area) {
	return get_player_battle_data(get_leader_faction(leader), area).forces.some(force => set_has(force.leaders, leader))
}

function count_num_infantry(who, area) {
	if (!has_troop(area)) return 0
	let count = 0
	for (let entry of get_area_troop_set(area)) {
		if ((decode_troop_entry_who(entry) === who) && is_fresh_infantry(decode_troop_entry_type(entry)))
			count += decode_troop_entry_num(entry)
	}
	return count
}

function count_num_cavalry(who, area) {
	if (!has_troop(area)) return 0
	let count = 0
	for (let entry of get_area_troop_set(area)) {
		if ((decode_troop_entry_who(entry) === who) && is_fresh_cavalry(decode_troop_entry_type(entry)))
			count += decode_troop_entry_num(entry)
	}
	return count
}

function count_num_guard(who, area) {
	if (!has_troop(area)) return 0
	let count = 0
	for (let entry of get_area_troop_set(area)) {
		if ((decode_troop_entry_who(entry) === who) && (decode_troop_entry_type(entry) === FRESH_GUARD))
			count += decode_troop_entry_num(entry)
	}
	return count
}

P.battle = (`
	log "@Battles"
	call change_orders { current_type: DEFEND }
	goto resolve_battles
`)

const BATTLES_WITHOUT_LEADERS = 0
const BATTLES_WHERE_ONE_SIDE_HAS_LEADER = 1
const BATTLES_WHERE_BOTH_SIDES_HAVE_LEADERS = 2

function sort_battles_by_type() {
	let battles_by_type = [[], [], []]

	map_for_each_key(G.battles, (area) => {
		if (has_leader_in_battle(get_battle_attacker(area)) && has_leader_in_battle(get_battle_defender(area)))
			set_add(battles_by_type[BATTLES_WHERE_BOTH_SIDES_HAVE_LEADERS], area)
		else if (has_leader_in_battle(get_battle_attacker(area)) || has_leader_in_battle(get_battle_defender(area)))
			set_add(battles_by_type[BATTLES_WHERE_ONE_SIDE_HAS_LEADER], area)
		else
			set_add(battles_by_type[BATTLES_WITHOUT_LEADERS], area)
	})

	return battles_by_type
}

P.resolve_battles = {
	_begin() {
		log_h3("Resolve Battles")
		G.active = get_who_has_initiative()
		L.battles_by_type = sort_battles_by_type()
		L.current_battle_type = L.battles_by_type.findIndex(type => type.length > 0)
	},
	prompt() {
		if (L.current_battle_type === -1) {
			V.prompt = `No battles to execute this turn.`
			button_confirm()
		} else if (L.battles_by_type.every(list => list.length === 0)) {
			V.prompt = "Execute battles: all done."
			button_done()
		} else {
			if (L.current_battle_type === BATTLES_WITHOUT_LEADERS)
				V.prompt = `Pick next battle where neither side has leaders:`
			else if (L.current_battle_type === BATTLES_WHERE_ONE_SIDE_HAS_LEADER)
				V.prompt = `Pick next battle where only one side has a leader.`
			else
				V.prompt = `Pick next battle where both sides have leaders.`

			V.prompt += ` ${join_array_with_or(L.battles_by_type[L.current_battle_type].map(format_area))}`

			for (let area of L.battles_by_type[L.current_battle_type])
				action_area(area)
		}
	},
	confirm() {
		push_undo()
		log("No battles to execute this turn.")
		end()
	},
	done() {
		push_undo()
		end()
	},
	area(area) {
		clear_undo()
		G.current_battle = area
		log_h4(`${format_area(area)}`, get_battle_attacker(area))
		log()
		call("do_battle", { area: area, attacker: get_battle_attacker(area), defender: get_battle_defender(area) })
	},
	_resume() {
		set_delete(L.battles_by_type[L.current_battle_type], G.current_battle)
		while (L.current_battle_type < BATTLES_WHERE_BOTH_SIDES_HAVE_LEADERS) {
			if (L.battles_by_type[L.current_battle_type].length === 0)
				++L.current_battle_type
			else
				break
		}

		G.current_battle = -1
	},
	_end() {
		clear_moved()
		log()
	}
}

// WARNING: Used in P.do_battle script
function has_friendly_order(who, area) {
	return get_orders_at_area(who, area).length > 0
}

P.do_battle = script(`
	call play_battle_events { attacker: L.attacker, defender: L.defender, area: L.area }

	log "%Reveal Defend Orders"
	if (has_friendly_order(L.defender, L.area)) {
		set G.active L.defender
		call defend { area: L.area }
	} else {
		log ("No Defend orders.")
	}
	log ""

	call calculate_combat_value { attacker: L.attacker, defender: L.defender, area: L.area }
`)

P.defend = {
	_begin() {
		//L.area
		L.has_defend_order = get_orders_at_area(G.active, L.area).some(order => get_order_type(order) === DEFEND)
		L.loss_reduction = is_event_active(C_FORTIFICATIONS) && get_event_keyword(C_FORTIFICATIONS, "double_defense") ? 2 : 1
		L.has_confirmed = false
	},
	prompt() {
		if (!L.has_defend_order) {
			V.prompt = `You do not have a defend order at ${format_area(L.area)}.`
			button_pass()
		} else {
			V.prompt = `Reveal 'Defend' order to reduce your losses by ${L.loss_reduction} this battle?`
			for (let order of get_orders_at_area(G.active, L.area)) {
				if (get_order_type(order) === DEFEND)
					action_order(order)
			}
			button_pass()
		}
	},
	pass() {
		log(`No Defend orders.`)
		end()
	},
	order(order) {
		remove_order(order)
		add_defend_order_to_battle(L.area)
		log("Revealed Defend order.")
		if (L.loss_reduction === 2)
			log(`${format_card(C_FORTIFICATIONS)}: Double effect.`)
		end()
	}
}

function get_num_battle_events_could_by_played(who, area) {
	switch(get_seniormost_leader(who, area)) {
	case L_NAPOLEON:
		return 4
	case L_DE_TOLLY:
	case L_BAGRATION:
	case L_DE_BEAUHARNAIS:
	case L_DAVOUT:
		return 3
	case L_KUTUZOV:
	case L_TORMASOV:
	case L_WITTGENSTEIN:
	case L_CHICHAGOV:
	case L_SCHWARZENBERG:
		return 2
	}

	return 1
}

P.play_battle_events = script(`
	log "%Play Battle Events"
	set G.played_cards [[], []]
	set G.active L.attacker
	call commit_battle_events { area: L.area }
	set G.active L.defender
	call commit_battle_events { area: L.area }
	call reveal_battle_events
	if (is_battle_event_currently_active(C_THE_IMPERIAL_GUARD) && hand_has(RUSSIA, C_INDECISION)) {
		call may_play_indecision { response_to: "the_imperial_guard" }
	}
	if (is_battle_event_currently_active(C_CONFUSING_ORDERS)) {
		set G.active FRANCE
		call confusing_orders
	}

	for L.who in RUSSIA to FRANCE {
		if (G.played_cards[L.who].length > 0) {
			set G.active L.who
			call execute_battle_events
		}
	}
`)

const BATTLE_CARD = 2
function is_battle_card(card) {
	return cards[card].type === BATTLE_CARD
}

function count_num_battle_events_in_hand(who) {
	return array_count(get_hand(who), card => is_battle_card(card))
}

P.commit_battle_events = {
	_begin() {
		//L.area
		L.num_battle_events = get_num_battle_events_could_by_played(G.active, L.area)
		L.num_battle_events_in_hand = count_num_battle_events_in_hand(G.active) + 1 // Dummy
	},
	inactive: "play battle events",
	prompt() {
		if ((G.played_cards[G.active].length === L.num_battle_events) || (L.num_battle_events_in_hand === 0)) {
			V.prompt = `Play Battle Events: All done.`
		} else {
			V.prompt = `You may play any battle cards, or a dummy.`
			for (let card of get_hand(G.active))
				if ((is_battle_card(card) && can_play_event(card)) || is_card_dummy(card))
					action_card(card)
		}
		G.committed_cards[G.active].forEach(action_card)
		button_done()
	},
	card(card) {
		push_undo()
		if (set_has(G.committed_cards[G.active], card)) {
			add_to_hand(G.active, card)
			set_delete(G.committed_cards[G.active], card)
			L.num_battle_events_in_hand++
		} else {
			remove_card_from_hand(G.active, card)
			commit_card(card)
			L.num_battle_events_in_hand--
		}
	},
	done() {
		clear_undo()
		end()
	}
}

P.reveal_battle_events = function() {
	for (let who = RUSSIA; who <= FRANCE; ++who) {
		log(ROLES[who])
		reveal_committed_cards(who, true)

		if (G.played_cards[who].length > 0) {
			for (let c of G.played_cards[who]) {
				logi(format_card(c))
				if (!is_card_dummy(c))
					add_battle_event(G.current_battle, c)
			}

			if (set_has(G.played_cards[who], get_dummy(who))) {
				return_dummy_to_hand(who)
				set_delete(G.played_cards[who], get_dummy(who))
			}
		} else {
			logi("Nothing")
		}
	}
	log()
	end()
}

P.execute_battle_events = {
	_begin() {
		L.events_to_be_executed = G.played_cards[G.active].slice()
		if (set_has(L.events_to_be_executed, C_CONFUSING_ORDERS))
			set_delete(L.events_to_be_executed, C_CONFUSING_ORDERS)
	},
	prompt() {
		if (L.events_to_be_executed.length > 0) {
			V.prompt = `Scroll down and implement the effect of each battle event played (${join_array_with_and(L.events_to_be_executed.map(card => format_card(card)))}).`
			L.events_to_be_executed.forEach(action_card)
		} else {
			V.prompt = `Execute battle events: All done.`
			button_done()
		}
	},
	card(card) {
		push_undo()
		set_delete(L.events_to_be_executed, card)
		call("event", { card })
	},
	done() {
		log()
		end()
	}
}

P.calculate_combat_value = script(`
	eval { log_h5("Calculate Combat Value") }
	call do_combat_value_calculations { attacker: L.attacker, defender: L.defender, area: L.area }

	set G.active [RUSSIA, FRANCE]
	call roll_battle_die { combat_value: L.$ }
	call determine_losses { attacker: L.attacker, defender: L.defender, combat_value: L.$ }
	goto assign_losses { attacker: L.attacker, defender: L.defender, losses: L.hits }
`)

function is_outflanking_currently_active(who) {
	if (who === RUSSIA)
		return is_battle_event_currently_active(C_OUTFLANKING_RU)
	else
		return is_battle_event_currently_active(C_OUTFLANKING_FR_1) || is_battle_event_currently_active(C_OUTFLANKING_FR_2)
}

P.do_combat_value_calculations = function() {
	var combat_value = [0, 0]

	const attacker = get_attacker_data(G.current_battle)
	const attacker_who = get_battle_attacker(G.current_battle)
	attacker.sps_unaffected_by_events = get_troop_list_by_type(attacker_who, G.current_battle)

	for (let force of attacker.forces) {
		if (is_battle_event_currently_active(C_DELAYED_FORCES_RU) && force.from !== get_battle_entry(G.current_battle).delayed_forces_ru)
			continue
		if (attacker_who === RUSSIA && is_battle_event_currently_active(C_DELAYED_FORCES_FR) && force.from === get_battle_entry(G.current_battle).delayed_forces_fr)
			continue
		combat_value[attacker_who] += find_combat_value(attacker_who, force)
	}

	const defender = get_defender_data(G.current_battle)
	const defender_who = get_battle_defender(G.current_battle)
	defender.sps_unaffected_by_events = get_troop_list_by_type(defender_who, G.current_battle)

	for (let force of defender.forces) {
		if (defender_who === RUSSIA && is_battle_event_currently_active(C_DELAYED_FORCES_FR) && force.from === get_battle_entry(G.current_battle).delayed_forces_fr)
			continue
		combat_value[defender_who] += find_combat_value(defender_who, force)
	}

	// RU #28: Poor Coordination
	if (is_battle_event_currently_active(C_POOR_COORDINATION_RU)) {
		combat_value[FRANCE] -= 3 * count_num_track_connections_used_to_enter_battle(FRANCE, G.current_battle)
		//log(`Poor Coordination: France -${3 * count_num_track_connections_used_to_enter_battle(FRANCE, G.current_battle)}`)
	}

	// RU #34 Platov's Cossacks
	if (is_event_active(C_PLATOVS_COSSACKS))
		combat_value[FRANCE] -= count_num_sps_of_type(RUSSIA, FRESH_COSSACK, G.current_battle)

	// FR #23: Poor Coordination
	if (is_battle_event_currently_active(C_POOR_COORDINATION_FR)) {
		combat_value[RUSSIA] -= 2 * count_num_connections_used_to_enter_battle(RUSSIA, G.current_battle)
		//log(`Poor Coordination: Russia -${2 * count_num_connections_used_to_enter_battle(RUSSIA, G.current_battle)}`)
	}

	// RU #12, FR #6, FR #17: Outflanking
	if (attacker.who === FRANCE && is_outflanking_currently_active(FRANCE)) {
		combat_value[RUSSIA] -= calculate_outflanking_strength(G.current_battle)
		log(`Outflanking: -${calculate_outflanking_strength(G.current_battle)}`)
	} else if (attacker.who === RUSSIA && is_outflanking_currently_active(RUSSIA)) {
		combat_value[FRANCE] -= calculate_outflanking_strength(G.current_battle)
		log(`Outflanking: -${calculate_outflanking_strength(G.current_battle)}`)
	}

	L.L.$ = combat_value.slice()
	end()
}

function find_combat_value(who, force) {
	//log(`${ROLES[who]}`)
	//logi(`${format_area(battle_data.from)}`)
	let strength = 0

	strength += get_infantry_strength(who, force)
	strength += get_cavalry_strength(who, force)
	if (who === RUSSIA)
		strength += get_cossack_strength(force)
	if (who === FRANCE)
		strength += get_guard_strength(force)
	strength += get_exhausted_strength(who, force)

	//logi(`Total strength: ${strength}`)
	return strength
}

function apply_global_strength_modifier(who, type, force_modifier, card_modifier, num_sps) {
	let battle_data = get_player_battle_data(who, G.current_battle)
	let strength = 0

	if (battle_data.sps_unaffected_by_events[type] > 0) {
		let count = Math.min(battle_data.sps_unaffected_by_events[type], num_sps)
		battle_data.sps_unaffected_by_events[type] -= count

		strength += (card_modifier - 1) * count * force_modifier
	}

	return strength
}

// Applies effects of Forced March and River Crossing
function get_modifier(who, force) {
	let modifier = 1

	if (force.strength === HALF_STRENGTH) {
		if (who !== FRANCE && !is_event_active(C_HARD_MARCHING_1) && !is_event_active(C_HARD_MARCHING_2))
			modifier *= 0.5
	}

	if (force.river_crossing) {
		if (
			who !== FRANCE
			&& !is_battle_event_currently_active(C_EBLES_PONTONEERS)
			&& (!is_battle_event_currently_active(C_SKILLFULL_MANEUVERS) || get_event_keyword(C_SKILLFULL_MANEUVERS, "cancels") !== "river")
		) {
			modifier *= 0.5
		}

	}

	return modifier
}

function get_infantry_strength(who, force) {
	// Ignores French-allied Austrians and Prussians for now
	let count = force.troops[FRESH_INFANTRY]
	// Infantry fights at X1 by default.
	let modifier = 1 * get_modifier(who, force)

	var strength = count * modifier

	if (who === RUSSIA) {
		// RU #38 Konstantine's Corps: Up to 3 Russian Infantry fight at X2.
		if (is_battle_event_currently_active(C_KONSTANTINES_CORPS))
			strength += apply_global_strength_modifier(who, FRESH_INFANTRY, modifier, 2, 3)

		// FR #40 Inferior Gunpowder: Up to 8 Russian Infantry fight at X0.5.
		if (is_battle_event_currently_active(C_INFERIOR_GUNPOWDER))
			strength += apply_global_strength_modifier(who, FRESH_INFANTRY, modifier, 0.5, 8)
	} else {
		// Prussian and Austrian SPs
		// RU #51 Unreliable Germans: Prussian and Austrian SPs fight at X0.
		if (!is_battle_event_currently_active(C_UNRELIABLE_GERMANS)) {
			strength += force.troops[FRESH_PRUSSIAN_INFANTRY]
			strength += force.troops[FRESH_AUSTRIAN_INFANTRY]
		}

		// RU #51 Unreliable Germans: French Infantry fights at X0.5
		if (is_battle_event_currently_active(C_UNRELIABLE_GERMANS))
			strength -= 0.5 * Math.min(8, count) * modifier

		// FR #26: Combined Arms: Up to 3 French Infantry SPs fight at X2.
		if (is_battle_event_currently_active(C_COMBINED_ARMS))
			strength += apply_global_strength_modifier(who, FRESH_INFANTRY, modifier, 2, 3)

		// FR #35 Ney's III Corps: Up to 3 French Infantry SPs fight at X2.
		if (is_battle_event_currently_active(C_NEYS_III_CORPS))
			strength += apply_global_strength_modifier(who, FRESH_INFANTRY, modifier, 2, 3)

		// FR #36 Eugène's IV Corps: Up to 3 French Infantry SPs fight at X2
		if (is_battle_event_currently_active(C_EUGENES_IV_CORPS))
			strength += apply_global_strength_modifier(who, FRESH_INFANTRY, modifier, 2, 3)

		// FR #28: Saint-Cyr's VI Corps: Up to 2 French Infantry SPs fight at X2.
		if (is_battle_event_currently_active(C_SAINT_CYRS_VI_CORPS))
			strength += apply_global_strength_modifier(who, FRESH_INFANTRY, modifier, 2, 2)
	}

	return strength
}

function get_cavalry_strength(who, force) {
	// RU #36 Infantry Squares: All French Cavalry fight at X0.
	// FR #16 Infantry Squares: All Russian Cavalry fight at X0.
	if (
		who === FRANCE && is_battle_event_currently_active(C_INFANTRY_SQUARES_RU)
		|| (who === RUSSIA && is_battle_event_currently_active(C_INFANTRY_SQUARES_FR))
	)
		return 0

	let count = force.troops[FRESH_CAVALRY]
	let modifier
	if (is_fortress_town(G.current_battle))
		modifier = 0.5 * get_modifier(who, force)
	else
		modifier = 1 * get_modifier(who, force)

	let strength = count * modifier

	if (who === RUSSIA) {
		// RU #39 Cavalry Charge: Up to 2 Russian Cavalry SPs fight at X2.
		if (is_battle_event_currently_active(C_CAVALRY_CHARGE_RU))
			strength += apply_global_strength_modifier(who, FRESH_CAVALRY, modifier, 2, 2)
	} else {
		// RU #51 Unreliable Germans: French Cavalry fight at X0.5
		if (is_battle_event_currently_active(C_UNRELIABLE_GERMANS))
			strength -= 0.5 * strength * modifier

		// FR #12 Cavalry Charge: Up to 2 French Cavalry fight at X3.
		if (is_battle_event_currently_active(C_CAVALRY_CHARGE_FR))
			strength += apply_global_strength_modifier(who, FRESH_CAVALRY, modifier, 3, 2)

		// FR #13 Murat's Cavalry: Up to 2 French Cavalry SPs fight at X2.
		if (is_battle_event_currently_active(C_MURATS_CAVALRY))
			strength += apply_global_strength_modifier(who, FRESH_CAVALRY, modifier, 2, 2)

		// FR #26 Combined Arms: Up to 1 French Cavalry SP fights at X2.
		if (is_battle_event_currently_active(C_COMBINED_ARMS))
			strength += apply_global_strength_modifier(who, FRESH_CAVALRY, modifier, 2, 1)
	}

	return strength
}

function get_cossack_strength(force) {
	if (
		!is_battle_event_currently_active(C_PLATOVS_COSSACKS)
		&& !is_battle_event_currently_active(C_CRUMBLING_COHESION)
		&& !is_battle_event_currently_active(C_AGGRESSIVE_COSSACKS)
	)
		return 0

	let count = force.troops[FRESH_COSSACK]
	let modifier = get_modifier(RUSSIA, force)
	let strength = 0

	// RU #34: Platov's Cossacks: Cossacks fight at X1 instead of X0
	if (is_battle_event_currently_active(C_PLATOVS_COSSACKS))
		strength += count * modifier

	// RU #50: Crumbing Cohesion: Cossacks fight at X(Russian initiative level)
	if (is_battle_event_currently_active(C_CRUMBLING_COHESION)) {
		if (get_who_has_initiative() === RUSSIA)
			strength += count * modifier * get_current_initiative_level()
	}

	// RU #53: Aggressive Cossacks: Cossacks fight at X2
	if (is_battle_event_currently_active(C_AGGRESSIVE_COSSACKS))
		strength += 2 * count * modifier

	return strength
}

function get_guard_strength(force) {
	let count = force.troops[FRESH_GUARD]
	let modifier = get_modifier(FRANCE, force)
	let strength = 0

	if (is_battle_event_currently_active(C_THE_IMPERIAL_GUARD))
		strength = 3 * count * modifier
	else if (is_battle_event_currently_active(C_IDLE_RESERVES)) // Supersedes 'The Old Guard'
		strength = 0
	else if (is_battle_event_currently_active(C_THE_OLD_GUARD))
		strength = 2 * count * modifier
	else
		strength = 1.5 * count * modifier

	return strength
}

function get_exhausted_strength(who, battle_data) {
	if (who === FRANCE && is_battle_event_currently_active(C_COURAGE_OF_DESPERATION)) {
		let count = 0
		for (let type = 0; type < battle_data.troops.length; ++type) {
			if (is_troop_type_exhausted(type))
				count += battle_data.troops[type]
		}
		let modifier = get_modifier(who, battle_data)

		return Math.min(4, count) * modifier
	}

	return 0
}

function modify_battle_roll(who, roll) {
	switch(get_seniormost_leader(who, G.current_battle)) {
	case L_ALEXANDER: return roll - 1
	case L_KUTUZOV: return 1
	case L_BAGRATION: return is_battle_defender(who, G.current_battle) ? roll + 1 : roll
	case L_NAPOLEON: return roll + 1
	case L_JEROME: return roll - 1
	case L_DAVOUT: return roll + 1
	default: return roll
	}
}

function increment_eliminated(who, battle, amt = 1) {
	get_player_battle_data(who, battle).num_eliminated += amt
}

function decrement_eliminated(who, battle, amt = 1) {
	get_player_battle_data(who, battle).num_eliminated -= amt
}

P.roll_battle_die = {
	_begin() {
		//L.combat_value
		L.has_rolled_battle_die = [false, false]
		L.battle_roll = [-1, -1]
	},
	prompt() {
		if (!L.has_rolled_battle_die[R]) {
			V.prompt = `Roll battle die (current combat value: ${L.combat_value[R]}).`
			button_roll()
		} else {
			V.prompt = `Roll battle die: All done. (final combat value: ${L.combat_value[R]})`
			button_done()
		}
	},
	roll() {
		clear_undo()

		if (R === FRANCE)
			L.battle_roll[FRANCE] = roll_france_battle_die()
		else
			L.battle_roll[RUSSIA] = roll_russia_battle_die()

		L.battle_roll[RUSSIA] = modify_battle_roll(RUSSIA, L.battle_roll[RUSSIA])
		L.battle_roll[FRANCE] = modify_battle_roll(FRANCE, L.battle_roll[FRANCE])

		L.combat_value[R] += L.battle_roll[R]
		L.has_rolled_battle_die[R] = true
	},
	done() {
		set_delete(G.active, R)

		if (G.active.length === 0) {
			L.L.$ = L.combat_value.map(value => value >= 0 ? Math.floor(value): 0).slice()
			end()
		}
	}
}

P.determine_losses = function() {
	//L.combat_value
	L.losses = L.combat_value.map(value => get_combat_losses_inflicted(value)).reverse() //Hits for one side => losses for other

	//Basic modifiers
	if (is_fortress_town(G.current_battle) && ((count_num_infantry(L.defender, G.current_battle) > 0) || (count_num_guard(L.defender, G.current_battle) > 0)))
		++L.losses[L.attacker]

	if (battle_has_defend_order(G.current_battle)) {
		// RU #33 Fortifications: Doubles effect of Defend order
		if (is_battle_defender(RUSSIA, G.current_battle) && is_event_active(C_FORTIFICATIONS) && get_event_keyword(C_FORTIFICATIONS, "double_defense"))
			L.losses[L.defender] = Math.max(0, L.losses[L.defender] - 2)
		else
			L.losses[L.defender] = Math.max(0, L.losses[L.defender] - 1)
	}

	//Riga: special rule
	if (G.current_battle === S_RIGA && (is_battle_defender(RUSSIA, G.current_battle))) //Fortress Riga special rule
		L.losses[L.defender] = Math.max(0, L.losses[L.defender] - 1)

	//Events:
	// RU #8: Fighting Withdrawal
	if (is_battle_event_currently_active(C_FIGHTING_WITHDRAWAL)) {
		L.losses[RUSSIA] = Math.max(L.losses[RUSSIA] - 2, 0)
		L.losses[FRANCE] = Math.max(L.losses[FRANCE] - 2, 0)
	}

	// RU #9: Uninspired Tactics
	if (is_battle_event_currently_active(C_UNINSPIRED_TACTICS))
		++L.losses[FRANCE]

	// RU #32: The Artillery Corps
	if (is_battle_event_currently_active(C_THE_ARTILLERY_CORPS)) {
		++L.losses[FRANCE]
		if (is_battle_event_currently_active(C_INFANTRY_SQUARES_FR))
			++L.losses[FRANCE]
	}

	// RU #35 Fickle Habsburgs
	if (is_battle_event_currently_active(C_FICKLE_HABSBURGS)) {
		L.losses[RUSSIA] = Math.max(0, L.losses[RUSSIA] - 1)
		L.losses[FRANCE] = Math.max(0, L.losses[FRANCE] - 1)
	}

	// RU #41 Fierce Fighting
	if (is_battle_event_currently_active(C_FIERCE_FIGHTING_RU)) {
		L.losses[RUSSIA] += 2
		L.losses[FRANCE] += 2
	}

	// FR #7 Unsuccessful Disengagement
	if (is_event_active(C_UNSUCCESSFUL_DISENGAGEMENT) && (get_event_keyword(C_UNSUCCESSFUL_DISENGAGEMENT, "area") === G.current_battle)) {
		L.losses[RUSSIA] = Math.max(0, L.losses[RUSSIA] - 1)
		L.losses[FRANCE] = Math.max(0, L.losses[FRANCE] - 1)
	}

	// FR #11 Grand Battery
	if (is_battle_event_currently_active(C_GRAND_BATTERY)) {
		if (is_battle_defender(FRANCE, G.current_battle))
			++L.losses[RUSSIA]
		else
			L.losses[RUSSIA] += 2

		if (is_battle_event_currently_active(C_INFANTRY_SQUARES_RU))
			++L.losses[RUSSIA]
	}

	// FR #27 Confusions and Delays
	if (is_battle_event_currently_active(C_CONFUSIONS_AND_DELAYS)) {
		L.losses[RUSSIA] = Math.max(0, L.losses[RUSSIA] - 1)
		L.losses[FRANCE] = Math.max(0, L.losses[FRANCE] - 2)
	}

	// FR #34 Fierce Fighting
	if (is_battle_event_currently_active(C_FIERCE_FIGHTING_FR)) {
		L.losses[RUSSIA] += 2
		L.losses[FRANCE]++
	}

	// FR #47 Inferior Musketry
	if (is_battle_event_currently_active(C_INFERIOR_MUSKETRY))
		L.losses[FRANCE] = Math.max(L.losses[FRANCE] - 1, 0)

	log()
	for (let who = RUSSIA; who <= FRANCE; ++who) {
		log(`${ROLES[who]} suffered ${L.losses[who]} losses.`)

		logi(`+${get_combat_losses_inflicted(L.combat_value[enemy(who)])} ${ROLES[enemy(who)]} hits`)

		if (is_battle_attacker(who, G.current_battle)) {
			if (is_fortress_town(G.current_battle) && ((count_num_infantry(L.defender, G.current_battle) > 0) || (count_num_guard(L.defender, G.current_battle) > 0)))
				logi(`+1 fortress`)

		} else {
			if (battle_has_defend_order(G.current_battle))
				logi(`-1 Defend`)
			if (G.current_battle === S_RIGA && (is_battle_defender(RUSSIA, G.current_battle)))
				logi(`-1 ${format_area(S_RIGA)}`)
		}

		if (is_battle_event_currently_active(C_UNINSPIRED_TACTICS) && who === FRANCE)
			logi(`+1 ${format_card(C_UNINSPIRED_TACTICS)}`)
	}

	update_battle_losses(L.attacker, G.current_battle, L.losses[L.attacker])
	update_battle_losses(L.defender, G.current_battle, L.losses[L.defender])

	L.L.hits = L.losses
	log()
	end()
}

function count_num_fresh_sps(who, area) {
	if (!has_troop(area)) return 0

	let count = 0
	for (let entry of get_area_troop_set(area)) {
		if ((decode_troop_entry_who(entry) === who) && (is_troop_type_fresh(decode_troop_entry_type(entry))))
			count += decode_troop_entry_num(entry)
	}

	return count
}

function get_all_fresh_sp_types(who, area) {
	return get_troop_types_at_area(who, area).filter(type => is_troop_type_fresh(type))
}

function get_all_exhausted_sp_types(who, area) {
	return get_troop_types_at_area(who, area).filter(type => is_troop_type_exhausted(type))
}

function exhaust_sp(who, area, type, num = 1, update_move = false, update_moved = false, strength = FULL_STRENGTH, from = POOL, update_battles = false) {
	if (!is_troop_type_fresh(type))
		return

	remove_troop(who, area, type, num)
	add_troop(who, area, type + 1, num)

	if (update_move) {
		G.move.sps[type]--
		G.move.sps[type + 1]++
	}

	if (update_moved)
		update_moved_exhaust(area, who, from, strength, type, num)

	if (update_battles) {
		let bforce = get_player_battle_data(who, area).forces.find((f) => {
			return f.troops[type] > 0 && f.from === from && f.strength === strength
		})
		bforce.troops[type]--
		bforce.troops[type + 1]++
	}
}

function eliminate_sp(who, area, type, num = 1, update_move = false, update_moved = false, strength = FULL_STRENGTH, from = POOL, update_battles = false) {
	let was_friendly_controlled = is_friendly_controlled(who, area)

	remove_troop(who, area, type, num)
	if (who === FRANCE)
		add_troop(who, FRENCH_CASUALTIES, is_troop_type_fresh(type) ? type : type - 1, num)

	if (update_move)
		G.move.sps[type] -= num

	if (update_moved)
		remove_sp_moved(area, who, from, strength, type, num)

	if (update_battles) {
		let bforce = get_player_battle_data(who, area).forces.find((f) => {
			return f.troops[type] > 0 && f.from === from && f.strength === strength
		})
		bforce.troops[type]--
	}

	if (!has_battle(area) && is_vp_area(area) && was_friendly_controlled && !is_friendly_controlled(who, area)) {
		log(`${ROLES[who]} lost control of ${format_area(area)}.`)
		decrease_vp(who, get_area_vp(area))
	}
}

// TODO: Change everything to eliminate_sp
function eliminate_troop(who, area, type, num = 1) {
	remove_troop(who, area, type, num)
	if (who === FRANCE)
		add_troop(FRANCE, FRENCH_CASUALTIES, is_troop_type_fresh(type) ? type : type - 1, num)

	if (who === FRANCE && !has_friendly_troop(who, area) && is_vp_area(area))
		decrease_vp(who, get_area_vp(area))
}

function count_num_sps_of_type(who, type, area) {
	if (!has_troop(area)) return 0
	let count = 0
	for (let entry of get_area_troop_set(area, null)) {
		if ((decode_troop_entry_who(entry) === who) && (decode_troop_entry_type(entry) === type))
			count += decode_troop_entry_num(entry)
	}
	return count
}

function battle_rally_sp(who, area, type, strength, from, num = 1) {
	rally_troop(who, area, type, num)

	let battle_data = get_player_battle_data(who, area)
	let force = battle_data.forces.find(f => f.strength === strength && f.from === from)
	force.troops[type] -= num
	force.troops[type - 1] += num
}

function battle_exhaust_sp(who, area, type, strength, from, num = 1) {
	exhaust_sp(who, area, type, num, false, false, strength, from, true)
}

function battle_eliminate_sp(who, area, type, strength, from, num = 1) {
	eliminate_troop(who, area, type, num)
	increment_eliminated(who, area, num)

	let battle_data = get_player_battle_data(who, area)
	let force = battle_data.forces.find(f => f.strength === strength && f.from === from)
	force.troops[type] -= num
}

function battle_add_sp(who, area, type, strength, from, num = 1) {
	add_troop(who, area, type, num)
	decrement_eliminated(who, area, num)

	if (who === FRANCE)
		remove_troop(who, FRENCH_CASUALTIES, is_troop_type_exhausted(type) ? type - 1 : type, num)

	let battle_data = get_player_battle_data(who, area)
	let force = battle_data.forces.find(f => f.strength === strength && f.from === from)
	force.troops[type] += num
}

function battle_eliminate_troop(who, area, type, num = 1) {
	eliminate_troop(who, area, type, num)
	increment_eliminated(who, area, num)

	let battle_data = get_player_battle_data(who, area)
	let connections_rallied = [] //To undo onto same connections, just for the heck of it

	let count = 0
	for (let i = 0; i < battle_data.forces.length; ++i) {
		let entry = battle_data.forces[i]

		let num_available = Math.min(num - count, entry.troops[type])
		entry.troops[type] -= Math.min(num, num_available)

		if (!map_has(connections_rallied, i) && num_available > 0)
			map_set(connections_rallied, i, 0)
		map_increment(connections_rallied, i, num_available)

		if ((count += num_available) >= num) break
	}

	return connections_rallied
}

function would_be_eliminated_after_battle(player, area, losses) {
	if (!has_fresh_sp(player, area))
		return true

	if (losses === 0)
		return false

	let count = 0
	let sps = get_troop_list_by_type(player, area)
	let has_assigned_cavalry_loss = false

	function would_have_fresh_sp() {
		for (let type = 0; type < sps.length; ++type) {
			if (is_troop_type_fresh(type) && sps[type] > 0)
				return true
		}
		return false
	}

	while(losses > count && would_have_fresh_sp()) {
		if (count % 3 === 2 && sps[FRESH_CAVALRY] > 0 && !has_assigned_cavalry_loss) {
			sps[FRESH_CAVALRY]--
			if (count % 2 === 0)
				sps[EXHAUSTED_CAVALRY]++
		} else {
			let loss_type
			for (let type = 0; type < sps.length; ++type) {
				if (is_troop_type_fresh(type) && sps[type] > 0)
					loss_type = type
			}
			if (loss_type === undefined) return true
			sps[loss_type]--
			if (count % 2 === 0)
				++sps[loss_type + 1]
		}

		++count
	}

	return !would_have_fresh_sp()
}

P.assign_losses = {
	_begin() {
		// L.losses: Gives the count of number of hits total need to be taken
		// L.attacker, L.defender
		log_h5("Assign Losses")
		G.active = [RUSSIA, FRANCE]

		// Running count of the number of losses taken.
		// We can use modulus operations to determine when the player must take an exhaustion, elimination or a cavalry loss.
		L.count = [0, 0]
		// Has the player taken a cavalry loss in the last set of three losses?
		L.has_assigned_cavalry_loss = [false, false]

		// State machine to funnel each player through separate resolution steps
		L.state = [null, null]
		advance_local_state(RUSSIA)
		advance_local_state(FRANCE)

		// Local undo stack, held separately for each player
		L.undo = [[], []]
	},
	states: {
		"napoleons_marshals": {
			eligible(player) {
				return (player === FRANCE) && is_battle_event_currently_active(C_NAPOLEONS_MARSHALS)
			},
			on_prompt() {
				if (has_exhausted_sp(FRANCE, G.current_battle)) {
					prompt_card(C_NAPOLEONS_MARSHALS, `Rally an exhausted SP at ${format_area(G.current_battle)}.`)
					get_player_battle_data(FRANCE, G.current_battle).forces.forEach(force => {
						for (let type = 0; type < force.troops.length; ++type) {
							if (force.troops[type] > 0)
								action_troop_alt(type, G.current_battle, force.strength, force.from)
						}
					})
				} else {
					prompt_card(C_NAPOLEONS_MARSHALS, `No exhausted SPs at ${format_area(G.current_battle)} to Rally.`)
					button_next()
				}
			},
			on_troop(entry) {
				let type = decode_troop_action_type(entry)
				let strength = decode_troop_action_strength(entry)
				let from = decode_troop_action_from(entry)

				battle_rally_sp(R, G.current_battle, type, strength, from)
				push_local_undo(FRANCE, "rally", { type, strength, from })

				advance_local_state(FRANCE)
			},
			on_next() {
				push_local_undo(FRANCE, "next")
				advance_local_state(FRANCE)
			}
		},
		// Russia execute this, since they might need to eliminate a leader
		"fierce_fighting_fr": {
			eligible(player) {
				return (player === RUSSIA) && is_battle_event_currently_active(C_FIERCE_FIGHTING_FR)
			},
			on_prompt() {
				if (has_friendly_leader(RUSSIA, G.current_battle)) {
					prompt_card(C_FIERCE_FIGHTING_FR, `Eliminate a leader. (${join_array_with_or(get_leaders_at_area(RUSSIA, G.current_battle).map(format_leader))})`)
					get_leaders_at_area(RUSSIA, G.current_battle).forEach(leader => action_leader(leader))
				} else {
					prompt_card(C_FIERCE_FIGHTING_FR, `No leader at ${format_area(G.current_battle)} to eliminate.`)
					button_next()
				}
			},
			on_leader(leader) {
				move_leader(leader, OUT_OF_PLAY)
				log_card(C_FIERCE_FIGHTING_FR)
				logi(`${format_leader(leader)} killed!`)
				increase_vp(FRANCE, get_leader_vp(leader))

				let strength = -1
				let from = -1
				get_player_battle_data(RUSSIA, G.current_battle).forces.forEach(force => {
					if (set_has(force.leaders, leader)) {
						strength = force.strength
						from = force.from
						set_delete(force.leaders, leader)
						return
					}
				})

				push_local_undo(RUSSIA, "leader", { leader, strength, from })
				advance_local_state(RUSSIA)
			},
			on_next() {
				push_local_undo(RUSSIA, "next")
				advance_local_state(RUSSIA)
			}
		},
		// Common handling for both French & Russian Infantry Squares cards since they yield the same effect
		"infantry_squares": {
			eligible(player) {
				return (player === RUSSIA && is_battle_event_currently_active(C_INFANTRY_SQUARES_FR))
				|| (player === FRANCE && is_battle_event_currently_active(C_INFANTRY_SQUARES_RU))
			},
			on_prompt() {
				let card = (R === RUSSIA) ? C_INFANTRY_SQUARES_FR : C_INFANTRY_SQUARES_RU

				if (count_num_cavalry(R, G.current_battle) > 0) {
					prompt_card(card, `Assign a loss to a Cavalry SP.`)
					get_player_battle_data(R, G.current_battle).forces.forEach(force => {
						if (force.troops[FRESH_CAVALRY] > 0)
							action_troop_alt(FRESH_CAVALRY, G.current_battle, force.strength, force.from)
					})
				} else {
					prompt_card(card, `No Cavalry SPs at ${format_area(G.current_battle)}.`)
					button_next()
				}
			},
			on_troop(entry) {
				push_undo()
				let type = decode_troop_action_type(entry)
				let strength = decode_troop_action_strength(entry)
				let from = decode_troop_action_from(entry)

				// First battle loss is always an exhaustion
				battle_exhaust_sp(R, G.current_battle, type, strength, from)
				++L.count[R]

				push_local_undo(R, "exhaust", { type, strength, from })
				advance_local_state(R)
			},
			on_next() {
				push_local_undo(R, "next")
				advance_local_state(R)
			}
		},
		"assign_losses_main": {
			eligible(_) {
				return true
			},
			on_prompt() {
				if (L.losses[R] > L.count[R] && has_fresh_sp(R, G.current_battle)) {
					// At least 1 in 3 losses must be to a fresh Cavalry SP, if possible
					if (
						L.count[R] % 3 === 2
						&& count_num_cavalry(R, G.current_battle) > 0
						&& !L.has_assigned_cavalry_loss[R]
					) {
						V.prompt = `Assign a loss to a fresh Cavalry SP.`
						get_player_battle_data(R, G.current_battle).forces.forEach(force => {
							if (force.troops[FRESH_CAVALRY] > 0)
								action_troop_alt(FRESH_CAVALRY, G.current_battle, force.strength, force.from)
						})
					}
					// Players must alternate between exhausting and eliminating a fresh SP, starting with exhausting
					else {
						if (L.count[R] % 2 === 0)
							V.prompt = `Select a fresh SP to exhaust.`
						else
							V.prompt = `Select a fresh SP to eliminate.`
						get_player_battle_data(R, G.current_battle).forces.forEach(force => {
							for (let type = 0; type < force.troops.length; ++type) {
								if (is_troop_type_fresh(type) && force.troops[type] > 0)
									action_troop_alt(type, G.current_battle, force.strength, force.from)
							}
						})
					}
				} else {
					// A stack consisting solely of exhausted SPs is eliminated if in an area with fresh enemy SPs.
					// Since losses are taken simultaneously, we check whether the enemy would have a fresh SP after assigning losses.
					if (
						has_friendly_troop(R, G.current_battle)
						&& !has_fresh_sp(R, G.current_battle)
						&& !would_be_eliminated_after_battle(enemy(R), G.current_battle, L.losses[enemy[R]] - L.count[enemy[R]])
					) {
						V.prompt = `No more fresh SPs: Eliminate all SPs at ${format_area(G.current_battle)}.`
						button("eliminate")
					} else {
						V.prompt = `Assign losses: All done.`
						button_confirm()
					}
				}
			},
			on_troop(entry) {
				let type = decode_troop_action_type(entry)
				let strength = decode_troop_action_strength(entry)
				let from = decode_troop_action_from(entry)

				if (type === FRESH_CAVALRY)
					L.has_assigned_cavalry_loss[R] = true

				// Reset flag after every three losses
				if (L.count[R] % 3 === 0)
					L.has_assigned_cavalry_loss[R] = false

				if (L.count[R] % 2 === 0) {
					battle_exhaust_sp(R, G.current_battle, type, strength, from)
					push_local_undo(R, "exhaust", { type, strength, from })
					// Stoic Infantry: Track how many Russian infantry were eliminated
					if (is_battle_event_currently_active(C_STOIC_INFANTRY) && R === RUSSIA && is_infantry(type))
						map_get(G.persistent_events, C_STOIC_INFANTRY).num_exhausted_infantry++
				} else {
					battle_eliminate_sp(R, G.current_battle, type, strength, from)
					push_local_undo(R, "eliminate", { type, strength, from})
				}

				++L.count[R]
			},
			on_eliminate() {
				let eliminated_by_type = []
				let counts = []
				for (let type of get_all_exhausted_sp_types(R, G.current_battle)) {
					let count = count_num_sps_of_type(R, type, G.current_battle)
					let connections = battle_eliminate_troop(R, G.current_battle, type, count)
					map_set(eliminated_by_type, type, connections)
					map_set(counts, type, count)
				}
				push_local_undo(R, "eliminate_all", { eliminated_by_type, counts })
				// log(`${ROLES[R]} has no more fresh SPs.`)
				// log(`${ROLES[R]} eliminated!`)
			},
			on_confirm() {
				set_delete(G.active, R)
				if (G.active.length === 0) {
					for (let who = RUSSIA; who <= FRANCE; ++who) {
						log(`${ROLES[who]} assigned ${L.count[who]} losses.`)
						if (!has_friendly_troop(who, G.current_battle)) {
							log(`${ROLES[who]} has no more fresh SPs.`)
							log(`${ROLES[who]} eliminated!`)
						}
					}
					log()
					goto("determine_battle_winner", { count: L.count })
				}
			},
		},
	},
	prompt() 		{
		this.states[L.state[R]].on_prompt()
		button_undo(L.undo[R].length > 0)
	},
	// Pop from the local undo stack, then reconstruct the old state
	undo() {
		let undo = L.undo[R].pop()
		let battle_data = get_player_battle_data(R, G.current_battle)

		// Rewind local state, if necessary
		if (L.state[R] !== undo.state)
			L.state[R] = undo.state

		// Apply action-specific rules to reconstruct the old state
		switch(undo.action) {
		case "next":
			return
		// Undoes 'Fierce Fighting' elimination of a Russian leader.
		case "leader":
			move_leader(undo.info.leader, G.current_battle)
			set_add(
				battle_data.forces.find((force) => force.strength === undo.info.strength && force.from === undo.info.from).leaders,
				undo.info.leader
			)
			// Delete leader killed lines
			G.log.pop()
			G.log.pop()
			G.log.pop()
			G.vp -= get_leader_vp(undo.info.leader)
			return
		case "rally":
			battle_exhaust_sp(R, G.current_battle, undo.info.type - 1, undo.info.strength, undo.info.from)
			return
		case "exhaust":
			battle_rally_sp(R, G.current_battle, undo.info.type + 1, undo.info.strength, undo.info.from)
			--L.count[R]
			return
		case "eliminate":
			battle_add_sp(R, G.current_battle, undo.info.type, undo.info.strength, undo.info.from)
			--L.count[R]
			return
		case "eliminate_all":
			map_for_each(undo.info.eliminated_by_type, (type, connections) => {
				let count =  map_get(undo.info.counts, type)

				if (R === RUSSIA)
					add_troop(R, G.current_battle, type, count)
				else
					move_troop(R, FRENCH_CASUALTIES, G.current_battle, type, count)

				decrement_eliminated(R, G.current_battle, count)
				map_for_each(connections, (ix, amount) => {
					battle_data.forces[ix].troops[type] += amount
				})
			})
			return
		default:
			throw new Error(`Unknown action: ${undo.action}`)
		}
	},
	next() 		{ this.states[L.state[R]].on_next() },
	eliminate() 	{ this.states[L.state[R]].on_eliminate() },
	troop(entry) 	{ this.states[L.state[R]].on_troop(entry) },
	leader(leader) 	{ this.states[L.state[R]].on_leader(leader) },
	confirm()		{ this.states[L.state[R]].on_confirm() },
}

P.determine_battle_winner = function() {
	// FR #27 Confusions and Delays: The battle is considered tied, and the French MUST retreat from battle.
	// Clarification: Supersedes exhaustion victory (if all Russians are eliminated)
	if (is_battle_event_currently_active(C_CONFUSIONS_AND_DELAYS)) {
		log_h5("Tied Battle")
		log(`${format_card(C_CONFUSIONS_AND_DELAYS)}: France must retreat.`)
		log()
		set_battle_winner(RUSSIA, G.current_battle)
		set_battle_loser(FRANCE, G.current_battle)
		goto("end_battle", { drawn_battle: true })
	}

	// If one side has no SPs remaining, the other side wins if they have a fresh SP.
	else if ((!has_friendly_troop(RUSSIA, G.current_battle) && has_fresh_sp(FRANCE, G.current_battle))
		|| (!has_friendly_troop(FRANCE, G.current_battle) && has_fresh_sp(RUSSIA, G.current_battle))) {

		let winner = has_fresh_sp(RUSSIA, G.current_battle) ? RUSSIA : FRANCE
		set_battle_winner(winner, G.current_battle)
		set_battle_loser(enemy(winner), G.current_battle)
		log(`${ROLES[winner]} won.`)
		log()
		goto("end_battle", { drawn_battle: false })
	}

	// RU #8 Fighting Withdrawal: France wins
	else if (is_battle_event_currently_active(C_FIGHTING_WITHDRAWAL)) {
		log(`${format_card(C_FIGHTING_WITHDRAWAL)}: France won.`)
		log()
		set_battle_winner(FRANCE, G.current_battle)
		set_battle_loser(RUSSIA, G.current_battle)
		// Cancels pursuit after battle so go immediately go to Step 6 (VP Shifts)
		goto("end_battle", { drawn_battle: false })
	}

	// RU #37: Enveloping Moves: If Russia has more fresh SPs remaining, the battle is considered a draw that is won by Russia.
	else if (is_battle_event_currently_active(C_ENVELOPING_MOVES) && (count_num_fresh_sps(RUSSIA, G.current_battle) > count_num_fresh_sps(FRANCE, G.current_battle))) {
		log_h5("Tied Battle")
		log(`${format_card(C_ENVELOPING_MOVES)}: Russia won.`)
		log()
		set_battle_winner(RUSSIA, G.current_battle)
		set_battle_loser(FRANCE, G.current_battle)
		goto("end_battle", { drawn_battle: true })
	}

	// Tied Battle: determine whether events make it not a tie, else mark the battle as drawn
	else if (L.count[RUSSIA] === L.count[FRANCE]) {
		log_h5("Tied Battle")

		// RU #35 Fickle Habsburgs: Russia wins even if tied.
		if (is_battle_event_currently_active(C_FICKLE_HABSBURGS)) {
			log(`${format_card(C_FICKLE_HABSBURGS)}: Russia won.`)
			log()
			set_battle_winner(RUSSIA, G.current_battle)
			set_battle_loser(FRANCE, G.current_battle)
			goto("pursuit")
		}

		// Standard tied battle: Defender wins if fortress, else the player with the Initiative wins
		else {
			let winner
			if (is_fortress_town(G.current_battle) || did_all_attacking_forces_cross_bridges(G.current_battle)) {
				winner = get_battle_defender(G.current_battle)
				log(`Fortress Town: ${ROLES[winner]} won.`)

			} else {
				winner = get_who_has_initiative()
				log(`Initiative: ${ROLES[winner]} won.`)
				log()
			}
			set_battle_winner(winner, G.current_battle)
			set_battle_loser(enemy(winner), G.current_battle)
			goto("end_battle", { drawn_battle: true })
		}
	}

	// RU #41 Fierce Fighting: No pursuit after battle by either side
	else if (is_battle_event_currently_active(C_FIERCE_FIGHTING_RU)) {
		log(`${format_card(C_FIERCE_FIGHTING_RU)}: No pursuit after battle.`)
		log()
		let winner = find_battle_winner(L.count)
		set_battle_winner(winner, G.current_battle)
		set_battle_loser(enemy(winner), G.current_battle)
		goto("end_battle", { drawn_battle: false })
	}

	// Decisive battle: Pursuit
	else {
		log_h5("Determine Winner")
		let winner = find_battle_winner(L.count)
		set_battle_winner(winner, G.current_battle)
		set_battle_loser(enemy(winner), G.current_battle)

		log(`${ROLES[RUSSIA]} inflicted ${L.count[FRANCE]} losses.`)
		log(`${ROLES[FRANCE]} inflicted ${L.count[RUSSIA]} losses.`)
		log(`${ROLES[winner]} won!`)
		log()

		if (
			(winner === RUSSIA) && can_play_event(C_STUBBORN_REARGUARD_FR)
			|| (winner === FRANCE) && can_play_event(C_STUBBORN_REARGUARD_RU)
		) {
			G.active = enemy(winner)
			goto("may_play_stubborn_rearguard")
		} else {
			goto("pursuit")
		}
	}
}

function has_fresh_sp(who, area) {
	return get_area_troop_set(area, null)?.some(entry => decode_troop_entry_who(entry) === who && is_troop_type_fresh(decode_troop_entry_type(entry))) ?? false
}

function find_battle_winner(count) {
	return (count[RUSSIA] > count[FRANCE]) ? FRANCE : RUSSIA
}

function count_pursuit_cavalry(who, area) {
	let count = 0
	if (who === RUSSIA) {
		count = count_num_sps_of_type(who, FRESH_CAVALRY, area) + (2 * count_num_sps_of_type(who, FRESH_COSSACK, area))
	} else {
		// FR #13 Murat's Cavalry: French Cavalry count X2 for pursuit
		if (G.phase === "resolve_battles" && is_battle_event_currently_active(C_MURATS_CAVALRY))
			count = 2 * count_num_sps_of_type(who, FRESH_CAVALRY, area)
		else
			count = count_num_sps_of_type(who, FRESH_CAVALRY, area)
	}
	return count
}

P.pursuit = {
	_begin() {
		log_h5("Pursuit")
		G.active = [RUSSIA, FRANCE]

		L.winner = get_battle_winner(G.current_battle)
		L.pursuit_cavalry = [count_pursuit_cavalry(RUSSIA, G.current_battle), count_pursuit_cavalry(FRANCE, G.current_battle)]

		//Murat's ability: counts as cavalry SP for pursuit purposes
		if (get_leader_location(L_MURAT) === G.current_battle)
			++L.pursuit_cavalry[FRANCE]

	},
	prompt() {
		V.prompt = `Pursuit: reveal strength (1x Cavalry + 2x Cossack) - ${L.pursuit_cavalry[R]}.`
		button_confirm()
	},
	confirm() {
		set_delete(G.active, R)
		if (G.active.length === 0) {
			log(`${ROLES[L.winner]}`)
			logi(`${L.pursuit_cavalry[L.winner]} strength`)
			if (get_leader_location(L_MURAT) === G.current_battle && L.winner === FRANCE) { logii("1 Murat") }

			log(`${ROLES[enemy(L.winner)]}`)
			logi(`${L.pursuit_cavalry[enemy(L.winner)]} strength`)
			if (get_leader_location(L_MURAT) === G.current_battle && L.winner !== FRANCE) { logii("1 Murat") }
			log()

			if (L.pursuit_cavalry[L.winner] > L.pursuit_cavalry[enemy(L.winner)]) {
				let difference = L.pursuit_cavalry[L.winner] - L.pursuit_cavalry[enemy(L.winner)]
				log(`${ROLES[L.winner]} won the pursuit.`)
				log(`${ROLES[enemy(L.winner)]} must take ${difference} more losses.`)
				goto("assign_pursuit_losses", { loser: enemy(L.winner), difference })
			} else {
				log(`Pursuit inconclusive!`)
				log()
				goto("end_battle", { drawn_battle: false })
			}
		}
	}
}

P.assign_pursuit_losses = {
	_begin() {
		//L.loser, L.difference
		G.active = L.loser
		L.has_finished = false
	},
	prompt() {
		if (L.has_finished) {
			V.prompt = `Assign pursuit losses: All done.`
			button_done()
		} else if (count_num_fresh_sps(G.active, G.current_battle) === 0) {
			V.prompt = `No more fresh SPs: eliminate all SPs at ${format_area(G.current_battle)}.`
			button("eliminate")
		} else {
			V.prompt = `Pursuit: Eliminate ${L.difference} SPs at ${format_area(G.current_battle)}.`
			get_player_battle_data(R, G.current_battle).forces.forEach(force => {
				for (let type = 0; type < force.troops.length; ++type) {
					if (force.troops[type] > 0)
						action_troop_alt(type, G.current_battle, force.strength, force.from)
				}

			})
		}
	},
	eliminate() {
		push_undo()
		for (let type of get_all_exhausted_sp_types(R, G.current_battle)) {
			let count = count_num_sps_of_type(R, type, G.current_battle)
			battle_eliminate_troop(G.active, G.current_battle, type, count)
		}
		log(`${ROLES[R]} has no more fresh SPs.`)
		log(`${ROLES[R]} eliminated!`)

		L.has_finished = true
	},
	troop(entry) {
		push_undo()
		let type = decode_troop_action_type(entry)
		let strength = decode_troop_action_strength(entry)
		let from = decode_troop_action_from(entry)

		battle_eliminate_sp(G.active, G.current_battle, type, strength, from)

		if (--L.difference === 0)
			L.has_finished = true
	},
	done() {
		log()
		goto("end_battle", { drawn_battle: false })
	}
}

function did_all_attacking_forces_cross_bridges(battle) {
	let attacker_data = get_attacker_data(battle)

	return attacker_data.forces.every(force => force.bridge === true)
}

function get_battle_events(battle) {
	return get_battle_entry(battle, null)?.events ?? null
}

//TODO: Response trigger for City Ablaze! if France take control of a key city
P.end_battle = script(`
	eval {
		L.winner = get_battle_winner(G.current_battle)
		L.loser = get_battle_loser(G.current_battle)
	}
	if (!L.drawn_battle) {
		call battle_shift_vp_and_initiative { winner: L.winner }
	}
	if (could_any_end_battle_events_be_played()) {
		call end_battle_events
	}
	if (has_friendly_troop(L.loser, G.current_battle)) {
		call retreat { loser: L.loser }
	}
	if (has_friendly_leader(L.loser, G.current_battle)) {
		set G.active L.loser
		call eliminate_leader { area: G.current_battle }
	}
	if (has_friendly_depot(L.loser, G.current_battle)) {
		set G.active L.loser
		call remove_depot { area: G.current_battle }
	}
	if (get_battle_events(G.current_battle).length > 0) {
		call battle_draw_card_to_hand
	}
	eval {
		increase_devastation(G.current_battle)
		log("Increased devastation at S" + G.current_battle + ".")
	}
	eval {
		if (get_area_vp(G.current_battle) > 0 && is_battle_attacker(L.winner, G.current_battle)) {
			log()
			log(ROLES[L.winner] + " captured S" + G.current_battle + "!")
			increase_vp(L.winner, get_area_vp(G.current_battle))
		}
		G.played_cards[RUSSIA].length = 0
		G.played_cards[FRANCE].length = 0
		if (map_has(G.battles, G.current_battle)) {
			delete_battle_entry(G.current_battle)
		}
		G.active = get_who_has_initiative()
	}
`)

function get_current_initiative_level() {
	return Math.abs(G.initiative)
}

P.battle_shift_vp_and_initiative = {
	_begin() {
		//L.winner
		//console.log(get_battle_entry(G.current_battle, null))
		log_h5("VP & Initiative Shifts")
		G.active = L.winner
		L.num_enemy_sps_eliminated = get_player_battle_data(enemy(G.active), G.current_battle).num_eliminated
		L.has_shifted_vp = false
		L.has_finished = false
		L.step = -1
	},
	prompt() {
		if (!L.has_shifted_vp) {
			if (L.step === -1) {
				if (L.num_enemy_sps_eliminated > 0) {
					V.prompt = `Battle Winner: Shift VP marker ${L.num_enemy_sps_eliminated} spaces in your favor.`
					action_vp_marker()
				} else {
					V.prompt = `No enemy SPs eliminated - no VP shifts.`
					button_pass()
				}
			} else {
				if (G.active === RUSSIA)
					V.prompt = `Losing force included ${format_leader(L_NAPOLEON)}: Gain an additional VP shift.`
				else
					V.prompt = `Losing force included ${format_leader(L_ALEXANDER)}: Gain an additional VP shift.`
				action_vp_marker()
			}
		} else if (!L.has_finished) {
			if (G.active === get_who_has_initiative()) {
				if ((get_current_initiative_level() < 4) && (L.num_enemy_sps_eliminated >= get_current_initiative_level())) {
					V.prompt = `Shift Initiative Marker 1 in your favor for eliminating more losing SPs than the current Initiative level.`
					action_initiative_marker()
				} else if (get_current_initiative_level() === 4) {
					V.prompt = `Initiative cannot be shifted further.`
					button_pass()
				} else {
					V.prompt = `No Initiative shift: number of enemy SPs eliminated is not greater than the current initiative level.`
					button_pass()
				}
			} else {
				V.prompt = `Shift Initiative Marker 1 in your favor for winning the battle.`
				action_initiative_marker()
			}
		} else {
			V.prompt = `VP and Initiative Shifts: All done.`
			button_done()
		}
	},
	vp() {
		push_undo()
		if (L.step === -1) {
			log(`${ROLES[G.active]} eliminated ${L.num_enemy_sps_eliminated} enemy SPs.`)
			increase_vp(G.active, L.num_enemy_sps_eliminated)
			if (losing_force_includes_king(G.active, G.current_battle))
				++L.step
			else
				L.has_shifted_vp = true
		} else {
			if (G.active === RUSSIA)
				log(`Losing force included ${format_leader(L_NAPOLEON)}.`)
			else
				log(`Losing force included ${format_leader(L_ALEXANDER)}`)
			increase_vp(G.active)
			L.has_shifted_vp = true
		}
	},
	initiative() {
		push_undo()
		shift_initiative(G.active)
		L.has_finished = true
	},
	pass() {
		push_undo()
		if (!L.has_shifted_vp) {
			log("No VP shift.")
			L.has_shifted_vp = true
		} else {
			log("No Initiative shift.")
			L.has_finished = true
		}
	},
	done() {
		log()
		end()
	}
}

function losing_force_includes_king(winner, battle) {
	return ((winner === RUSSIA) && (get_leader_location(L_NAPOLEON) === battle)) || ((winner === FRANCE) && (get_leader_location(L_ALEXANDER) === battle))
}

// RU: Stoic Infantry
// FR: The Imperial Guard, Murat's Cavalry, Ney's III Corps
// Used in P.end_battle script
// eslint-disable-next-line no-unused-vars
function could_any_end_battle_events_be_played() {
	return (is_battle_event_currently_active(C_STOIC_INFANTRY) && has_russian_sp(G.current_battle))
			|| (is_battle_event_currently_active(C_THE_IMPERIAL_GUARD) && get_battle_loser(G.current_battle) === FRANCE)
			|| (is_battle_event_currently_active(C_MURATS_CAVALRY) || is_battle_event_currently_active(C_NEYS_III_CORPS))
}

P.end_battle_events = {
	_begin() {
		log_h5("Resolve Remaining Events")

		G.active = []
		if (is_battle_event_currently_active(C_STOIC_INFANTRY) && has_russian_sp(G.current_battle))
			set_add(G.active, RUSSIA)
		if (
			(is_battle_event_currently_active(C_THE_IMPERIAL_GUARD) && get_battle_loser(G.current_battle) === FRANCE)
			|| is_battle_event_currently_active(C_MURATS_CAVALRY)
			|| is_battle_event_currently_active(C_NEYS_III_CORPS)
		) {
			set_add(G.active, FRANCE)
		}

		// for 'Stoic Infantry'
		if (set_has(G.active, RUSSIA))
			L.num_sps_to_rally = Math.min(count_num_sps_of_type(RUSSIA, EXHAUSTED_INFANTRY, G.current_battle), Math.min(2, get_event_keyword(C_STOIC_INFANTRY, "num_exhausted_infantry", 0)))

		// for 'The Imperial Guard'
		if (is_battle_event_currently_active(C_THE_IMPERIAL_GUARD))
			L.has_discarded = false

		// Initializing local state machine
		L.state = [null, null]
		advance_local_state(RUSSIA)
		advance_local_state(FRANCE)

		// Local undo stack
		L.undo = [[], []]
	},
	states: {
		"stoic_infantry": {
			eligible(player) {
				return player === RUSSIA
				&& is_battle_event_currently_active(C_STOIC_INFANTRY)
				&& has_russian_sp(G.current_battle)
			},
			on_prompt() {
				if (L.num_sps_to_rally > 0) {
					prompt_card(C_STOIC_INFANTRY, `Rally up to ${L.num_sps_to_rally} exhausted Infantry SPs.`)
					get_player_battle_data(R, G.current_battle).forces.forEach(force => {
						if (force.troops[EXHAUSTED_INFANTRY] > 0)
							action_troop_alt(EXHAUSTED_INFANTRY, G.current_battle, force.strength, force.from)
					})
				} else {
					prompt_card(C_STOIC_INFANTRY, "All done.")
					button_confirm()
				}
			},
			on_troop(entry) {
				let type = decode_troop_action_type(entry)
				let strength = decode_troop_action_strength(entry)
				let from = decode_troop_action_from(entry)

				battle_rally_sp(R, G.current_battle, type, strength, from)
				--L.num_sps_to_rally

				push_local_undo(R, "rally", { type, strength, from })
			}
		},
		"the_imperial_guard": {
			eligible(player) {
				return (player === FRANCE)
				&& (get_battle_loser(G.current_battle) === FRANCE)
			},
			on_prompt() {
				if (!L.has_discarded) {
					if (has_card_in_hand(R)) {
						prompt_card(C_THE_IMPERIAL_GUARD, "Discard a random card from your hand for losing the battle. (cannot be undone)")
						button_discard()
					} else {
						prompt_card(C_THE_IMPERIAL_GUARD, "No cards in hand to discard.")
						button_next()
					}
				} else {
					prompt_card(C_THE_IMPERIAL_GUARD, `Shift the VP marker two spaces in Russia's favor.`)
					action_vp_marker()
				}
			},
			on_discard() {
				let discarded_card = random(get_hand(R).length - 1) + 1 //Cannot discard dummy, which is always placed at index 0
				discard_card(discarded_card)
				push_local_undo(R, "discard")
				L.has_discarded = true
			},
			on_next() {
				push_local_undo(R, "next")
				advance_local_state(R)
			},
			on_vp() {
				increase_vp(RUSSIA, 2)
				push_local_undo(R, "vp")
				advance_local_state(R)
			}
		},
		"murats_cavalry": {
			eligible(player) {
				return (player === FRANCE) && is_battle_event_currently_active(C_MURATS_CAVALRY)
			},
			on_prompt() {
				if (count_num_sps_of_type(FRANCE, FRESH_CAVALRY, G.current_battle) > 0) {
					prompt_card(C_MURATS_CAVALRY, `Exhaust a fresh Cavalry SP.`)
					get_player_battle_data(R, G.current_battle).forces.forEach(force => {
						if (force.troops[FRESH_CAVALRY] > 0)
							action_troop_alt(FRESH_CAVALRY, G.current_battle, force.strength, force.from)
					})
				} else {
					prompt_card(C_MURATS_CAVALRY, "No effect.")
					button_next()
				}
			},
			on_troop(entry) {
				let type = decode_troop_action_type(entry)
				let strength = decode_troop_action_strength(entry)
				let from = decode_troop_action_from(entry)

				battle_exhaust_sp(R, G.current_battle, type, strength, from)

				push_local_undo(R, "exhaust", { type, strength, from })
				advance_local_state(R)
			},
			on_next() {
				push_local_undo(R, "next")
				advance_local_state(R)
			}
		},
		"neys_iii_corps": {
			eligible(player) {
				return player === FRANCE && is_battle_event_currently_active(C_NEYS_III_CORPS)
			},
			on_prompt() {
				if (has_exhausted_sp(FRANCE, G.current_battle)) {
					prompt_card(C_NEYS_III_CORPS, "Rally an exhausted SP.")
					get_player_battle_data(R, G.current_battle).forces.forEach(force => {
						for (let type = 0; type < force.troops.length; ++type)
							if (is_troop_type_exhausted(type))
								action_troop_alt(type, G.current_battle, force.strength, force.from)
					})
				} else {
					prompt_card(C_NEYS_III_CORPS, `No exhausted SPs at ${format_area(G.current_battle)} to rally.`)
					button_next()
				}
			},
			on_troop(entry) {
				let type = decode_troop_action_type(entry)
				let strength = decode_troop_action_strength(entry)
				let from = decode_troop_action_from(entry)

				battle_rally_sp(R, G.current_battle, type, strength, from)

				push_local_undo(R, "rally", { type, strength, from })
				advance_local_state(R)
			},
			on_next() {
				push_local_undo(R, "next")
				advance_local_state(R)
			}
		},
		"finish_state": {
			eligible() { return true },
			on_prompt() {
				V.prompt = "Execute Events: All done."
				button_confirm()
			}
		}
	},
	prompt() {
		this.states[L.state[R]].on_prompt()
		button_undo(
			L.undo[R].length > 0
			&& L.undo[R][L.undo[R].length - 1].action !== "discard"
		)
	},
	undo() {
		let undo = L.undo[R].pop()

		if (undo.state !== L.state[R])
			L.state[R] = undo.state

		switch(undo.action) {
		case "next":
			return
		case "rally":
			battle_exhaust_sp(R, G.current_battle, undo.type, undo.strength, undo.from)
			if (R === RUSSIA)
				++L.num_sps_to_rally
			return
		case "exhaust":
			battle_rally_sp(R, G.current_battle, undo.type, undo.strength, undo.from)
			return
		case "vp":
			G.vp += 2 //Rewind Russia gaining 2 VP because of 'The Imperial Guard'
			return
		default:
			throw new Error(`Unknown action: ${undo.action}`)
		}
	},
	troop(entry) 	{ this.states[L.state[R]].on_troop(entry) },
	discard()		{ this.states[L.state[R]].on_discard() },
	vp() 			{ this.states[L.state[R]].on_vp() },
	next() 			{ this.states[L.state[R]].on_next() },
	confirm() {
		set_delete(G.active, R)
		if (is_event_active(C_STOIC_INFANTRY))
			map_delete(G.persistent_events, C_STOIC_INFANTRY)
		if (G.active.length === 0) {
			log()
			end()
		}
	}
}

function get_valid_attacker_retreat_connections(battle) {
	return get_connections_used_by_attacker(battle)
}

function get_valid_defender_retreat_connections(battle) {
	let possible_areas = []
	for (let area of get_all_adjacent_areas(battle))
		set_add(possible_areas, area)
	return possible_areas.filter(area => !set_has(get_connections_used_by_attacker(battle), area))
}

function get_valid_retreat_destinations(who, area, ignore_enemy_sps = false) {
	// Attackers in battle must select among the areas used to enter battle
	if (is_battle_attacker(who, area))
		return find_retreat_destinations(who, G.current_battle, get_valid_attacker_retreat_connections(area), ignore_enemy_sps)
	else
		return find_retreat_destinations(who, G.current_battle, get_valid_defender_retreat_connections(area), ignore_enemy_sps)
}

function has_retreat_destination(who, area) {
	return get_valid_retreat_destinations(who, area).length > 0
}

P.retreat = script(`
	log "%Retreat"
	set G.active L.loser
	while (has_friendly_troop(L.loser, G.current_battle)) {
		call select_retreat_destination
		if (has_friendly_troop(G.active, G.current_battle)) {
			call select_retreat_force { destination: L.$ }
			call do_retreat { destination: L.$ }
		}
	}
`)

P.select_retreat_destination = {
	_begin() {
		if (G.active === FRANCE && is_battle_event_currently_active(C_NEYS_ESCAPE)) {
			L.has_valid_retreat_destination = get_all_adjacent_areas(G.current_battle).some(area => !has_enemy_sp(FRANCE, area))
			if (L.has_valid_retreat_destination)
				L.retreat_destinations = get_all_adjacent_areas(G.current_battle).filter(area => !has_russian_sp(area))
			else
				L.retreat_destinations = get_valid_retreat_destinations(G.active, G.current_battle, !L.has_valid_retreat_destination)
		} else {
			L.has_valid_retreat_destination = has_retreat_destination(G.active, G.current_battle)
			L.retreat_destinations = get_valid_retreat_destinations(G.active, G.current_battle, !L.has_valid_retreat_destination)
		}
	},
	prompt() {
		V.prompt = `Select a destination to retreat from ${format_area(G.current_battle)}.`
		L.retreat_destinations.forEach(action_area)
	},
	area(area) {
		push_undo()
		L.L.$ = area
		if (!L.has_valid_retreat_destination)
			goto("exhaust_half_sps")
		else
			end()
	}
}

P.exhaust_half_sps = {
	_begin() {
		L.num_sps_to_exhaust = Math.ceil(count_num_sps(G.active, G.current_battle) / 2)
	},
	prompt() {
		if (!has_fresh_sp(G.active, G.current_battle) && has_fresh_sp(enemy(G.active), G.current_battle)) {
			V.prompt = `No fresh SPs at ${format_area(G.current_battle)}.`
			button_confirm()
		} else if (L.num_sps_to_exhaust === 0) {
			V.prompt = `Assign exhaustion — All done.`
			button_next()
		} else {
			V.prompt = `No valid retreat destination: exhaust half of the SPs at ${format_area(G.current_battle)}.`
			get_player_battle_data(G.active, G.current_battle).forces.forEach(force => {
				for (let type = 0; type < force.troops.length; ++type)
					action_troop_alt(type, G.current_battle, force.strength, force.from)
			})
		}
	},
	troop(entry) {
		push_undo()
		let type = decode_troop_action_type(entry)
		let strength = decode_troop_action_strength(entry)
		let from = decode_troop_action_from(entry)
		battle_exhaust_sp(G.active, G.current_battle, type, strength, from)
		--L.num_sps_to_exhaust
	},
	confirm() {
		push_undo()
		goto("eliminate_all_sps", { area: G.current_battle })
	},
	next() {
		push_undo()
		end()
	}
}

// Structurally similar to Evade: maybe condense later
P.select_retreat_force = {
	_begin() {
		L.leaders = get_leaders_at_area(G.active, G.current_battle)
		L.sps = get_evade_sps(G.active, G.current_battle)

		L.has_valid_retreat_destination = has_retreat_destination(G.active, G.current_battle)
		L.retreat_destinations = get_valid_retreat_destinations(G.active, G.current_battle, !L.has_valid_retreat_destination)

		L.num_sps_selected = 0

		G.move = {
			type: NONE,
			leaders: [],
			sps: [],
		}
	},
	prompt() {
		V.prompt = `Select leaders and SPs to retreat from ${format_area(G.current_battle)}.`

		if (G.move.leaders.length === 0 && L.num_sps_selected > 4)
			V.prompt += ` All SPs in the retreating force beyond the first 4 would be exhausted.`

		update_alexander_prompt(L.leaders)

		for (let leader of L.leaders)
			action_leader(leader)

		map_for_each(L.sps, (from, forces) => {
			map_for_each(forces, (strength, sps) => {
				for (let type = 0; type < sps.length; ++type) {
					if (sps[type] > 0) {
						if (map_has(G.move.sps, from) && map_has(map_get(G.move.sps, from), strength) && map_get(map_get(G.move.sps, from), strength)[type] >= sps[type])
							continue
						else
							action_troop_alt(type, G.current_battle, strength, from)
					}
				}
			})
		})

		map_for_each(G.move.sps, (from, forces) => {
			map_for_each(forces, (strength, sps) => {
				for (let type = 0; type < sps.length; ++type)
					if (sps[type] > 0)
						action_troop_alt(type, G.current_battle, strength, from, 1)
			})
		})

		if (L.leaders.length > G.move.leaders.length || L.num_sps_selected < count_num_sps(G.active, G.current_battle))
			button("select_all")

		if (has_enemy_sp(G.active, L.destination))
			button("retreat", L.leaders.length === G.move.leaders.length && L.num_sps_selected === count_num_sps(G.active, G.current_battle) && can_alexander_be_babysitted(true))
		else
			button("retreat", L.retreat_destinations.length > 1 || L.num_sps_selected === count_num_sps(G.active, G.current_battle) && can_alexander_be_babysitted(true))
	},
	leader(leader) {
		push_undo()
		set_toggle(G.move.leaders, leader)
	},
	troop(entry) {
		push_undo()
		let type = decode_troop_action_type(entry)
		let strength = decode_troop_action_strength(entry)
		let from = decode_troop_action_from(entry)
		let moving = decode_troop_action_moving(entry)

		if (!map_has(G.move.sps, from))
			map_set(G.move.sps, from, [])

		if (!map_has(map_get(G.move.sps, from), strength))
			map_set(map_get(G.move.sps, from), strength, Array(NUM_TROOP_TYPES).fill(0))

		if (!moving) {
			++map_get(map_get(G.move.sps, from), strength)[type]
			++L.num_sps_selected
		} else {
			--map_get(map_get(G.move.sps, from), strength)[type]
			--L.num_sps_selected
		}
	},
	select_all() {
		push_undo()
		G.move.leaders = L.leaders.slice()
		G.move.sps = []
		map_for_each(L.sps, (from, forces) => {
			let copy = []
			map_for_each(forces, (strength, sps) => {
				copy.push(strength)
				copy.push(sps.slice())
			})
			map_set(G.move.sps, from, copy)
		})
		L.num_sps_selected = count_num_sps(G.active, G.current_battle)
	},
	retreat() {
		push_undo()

		log(`Retreated from ${format_area(G.current_battle)}`)
		let sp_count = get_evading_sps()
		if (G.move.leaders.length > 0) {
			logi(format_leader(get_seniormost_leader_from_list(G.active, G.move.leaders))) // Seniormost leader
			for (let type = 0; type < sp_count.length; ++type) {
				if (sp_count[type] > 0)
					log_only(G.active, format_ii(`${sp_count[type]} ${get_troop_type_name(type)}`))
			}
		} else {
			for (let type = 0; type < sp_count.length; ++type) {
				if (sp_count[type] > 0)
					logii(`${sp_count[type]} ${get_troop_type_name(type)}`)
			}
		}

		end()
	}
}

P.do_retreat = function() {
	logi(`to ${format_area(L.destination)}`)

	for (let leader of G.move.leaders)
		move_leader(leader, L.destination)

	map_for_each(G.move.sps, (origin, forces) => {
		map_for_each(forces, (strength, sps) => {
			for (let type = 0; type < sps.length; ++type) {
				if (sps[type] > 0) {
					move_troop(G.active, G.current_battle, L.destination, type, sps[type])
					let force = get_player_battle_data(G.active, G.current_battle).forces.find(f => f.from === origin && f.strength === strength)
					force.troops[type] -= sps[type]
				}
			}
		})
	})

	if (has_enemy_sp(G.active, L.destination)) {
		let troops = get_evading_sps()

		if (has_battle(L.destination)) {
			if (is_battle_attacker(G.active, L.destination))
				add_attacker_to_battle(G.active, G.current_battle, L.destination, NONE, G.move.leaders, troops)
			else
				add_defender_to_battle(G.active, G.current_battle, L.destination, NONE, G.move.leaders, troops)
			log(`Joined existing battle at ${format_area(L.destination)}.`)
		} else {
			add_attacker_to_battle(G.active, G.current_battle, L.destination, NONE, G.move.leaders, troops)
			log(`Battle declared at ${format_area(L.destination)}.`)
		}
	}

	G.move = {}

	log()
	end()
}

P.eliminate_leader = {
	_begin() {
		L.leaders_to_eliminate = get_leaders_at_area(G.active, L.area)
		log("Eliminated")
	},
	prompt() {
		if (L.leaders_to_eliminate.length > 0) {
			V.prompt = `Select leaders to eliminate: ${join_array_with_and(L.leaders_to_eliminate.map(format_leader))}.`
			L.leaders_to_eliminate.forEach(action_leader)
		} else {
			V.prompt = `Eliminate leaders — All done.`
			button_done()
		}

	},
	leader(leader) {
		push_undo()
		logi(format_leader(leader))
		set_delete(L.leaders_to_eliminate, leader)
		eliminate_leader(leader)
	},
	done() {
		log()
		end()
	}
}

// Used in P.end_battle script
// eslint-disable-next-line no-unused-vars
function calculate_num_post_battle_card_draws() {
	let num_cards_to_draw = [0, 0]

	for (let who = RUSSIA; who <= FRANCE; ++who) {
		if (has_leader_in_battle(who, G.current_battle) && get_battle_events(G.current_battle).some(card => (get_card_owner(card) === who) && !is_card_dummy(card)))
			++num_cards_to_draw[who]
	}

	if (is_battle_event_currently_active(C_NAPOLEONS_MARSHALS) && get_battle_winner(G.current_battle) === FRANCE) {
		log(`${format_card(C_NAPOLEONS_MARSHALS)}: France draws an additional card.`)
		++num_cards_to_draw[FRANCE]
	}

	if (is_battle_event_currently_active(C_KONSTANTINES_CORPS) && get_battle_winner(G.current_battle) === RUSSIA) {
		log(`${format_card(C_KONSTANTINES_CORPS)}: Russia draws an additional card.`)
		++num_cards_to_draw[RUSSIA]
	}

	if (is_battle_event_currently_active(C_CAVALRY_CHARGE_RU) && get_battle_winner(G.current_battle) === RUSSIA) {
		log(`${format_card(C_CAVALRY_CHARGE_RU)}: Russia draws an additional card.`)
		++num_cards_to_draw[RUSSIA]
	}

	return num_cards_to_draw
}

P.battle_draw_card_to_hand = script(`
	log "%End of Battle"
	eval { L.num_cards_to_draw = (calculate_num_post_battle_card_draws()) }
	eval { clear_undo() }
	for L.who in RUSSIA to FRANCE {
		set G.active L.who
		while (L.num_cards_to_draw[L.who] > 0) {
			call draw_card_to_hand
			decr L.num_cards_to_draw[L.who]
		}
	}
`)

// === EXECUTE RALLY ORDERS ===
P.execute_rally = script(`
	call rally { area: L.area }
	if (G.active === RUSSIA && get_leader_location(L_KUTUZOV) === L.area) {
		call kutuzov_additional_rally { area: L.area }
	}
	goto end_order { type: RALLY }
`)

P.rally = {
	_begin() {
		// L.area, L.kutuzov
		L.count = 0
		log("Rallied")
	},
	prompt() {
		if (
			!has_exhausted_sp(G.active, L.area)
			// Second rally SP must be Infantry!
			|| (L.count === 1 && !get_all_exhausted_sp_types(G.active, L.area).some(type => is_infantry(type)))
		) {
			V.prompt = `No ${L.count > 0 ? "more" : ""} exhausted SPs at ${format_area(L.area)} to Rally.`
			button_confirm()
		} else {
			V.prompt = `You may flip back one of your exhausted SPs back to its fresh side.`
			if (has_friendly_depot(G.active, L.area) && count_num_exhausted_infantry(G.active, L.area) >= 2 && !L.kutuzov)
				V.prompt += ` (2 if Infantry)`

			for (let type of get_all_exhausted_sp_types(G.active, L.area)) {
				if (L.count === 0 || is_infantry(type))
					action_troop_alt(type, L.area)
			}
		}

		if (L.kutuzov)
			prompt_leader(L_KUTUZOV, V.prompt)
	},
	troop(entry) {
		push_undo()
		let type = decode_troop_action_type(entry)

		rally_troop(G.active, L.area, type)
		log_masked(G.active, format_i(`1 ${get_troop_type_name(type)}`), format_i(`1 Exh. SP`))

		if (!L.kutuzov && L.count === 0 && has_friendly_depot(G.active, L.area) && is_infantry(type))
			++L.count
		else
			end()
	},
	confirm() {
		push_undo()
		if (L.count === 0)
			logi("Nothing")
		end()
	}
}

P.kutuzov_additional_rally = function() {
	if (has_exhausted_sp(G.active, L.area)) {
		log(`${format_leader(L_KUTUZOV)}: Rally an additional SP.`)
		goto("rally", { area: L.area, kutuzov: true })
	} else {
		end()
	}
}

// === EXECUTE COSSACK RAID ORDERS ===
P.execute_cossack_raid = function() {
	goto("select_cossack_raid_target", { area: L.area })
}

function has_french_order(area) {
	return get_orders_at_area(FRANCE, area).length > 0
}

P.select_cossack_raid_target = {
	// L.area
	prompt() {
		V.prompt = `Select a target for the Cossack Raid. (cannot be undone)`
		for (let area of get_all_adjacent_areas(L.area)) {
			if (has_french_order(area) || has_friendly_troop(FRANCE, area))
				action_area(area)
		}
	},
	area(area) {
		log(`Targeted ${format_area(area)}:`)
		goto("apply_cossack_raid", { area })
	}
}

P.apply_cossack_raid = script(`
	set G.active FRANCE
	call remove_all_forage_orders { area: L.area }
	call eliminate_1_exhausted { area: L.area }
	call apply_cossack_raid_done
`)

P.remove_all_forage_orders = {
	_begin() {
		logi("Removed")
		L.orders_to_remove = get_orders_at_area(FRANCE, L.area).filter(order => get_order_type(order) === FORAGE)
	},
	prompt() {
		if (L.orders_to_remove.length > 0) {
			V.prompt = `Remove all Forage orders at ${format_area(L.area)}.`
			L.orders_to_remove.forEach(action_order)
		} else {
			V.prompt = `No Forage orders at ${format_area(L.area)}.`
			button_next()
		}
	},
	order(order) {
		push_undo()
		logii(`1 Forage`)
		remove_order(order)
		set_delete(L.orders_to_remove, order)
		if (L.orders_to_remove.length === 0)
			end()
	},
	next() {
		push_undo()
		logii(`Nothing`)
		end()
	}
}

// TODO: Unify with other elimination states
P.eliminate_1_exhausted = {
	_begin() {
		logi("Eliminated")
	},
	prompt() {
		if (has_exhausted_sp(G.active, L.area)) {
			V.prompt = `Eliminate 1 exhausted SP at ${format_area(L.area)}.`
			for (let type of get_all_exhausted_sp_types(G.active, L.area))
				action_troop_alt(type, L.area)
		} else {
			V.prompt = `No exhausted SPs at ${format_area(L.area)}.`
			button_next()
		}
	},
	troop(entry) {
		push_undo()
		let type = decode_troop_action_type(entry)
		eliminate_troop(G.active, L.area, type)
		log_only(G.active, format_ii(`1 ${get_troop_type_name(type)}`))
		log_only(enemy(G.active), format_ii(`1 Exh. SP`))
		end()
	},
	next() {
		push_undo()
		logii("Nothing")
		end()
	}
}

P.apply_cossack_raid_done = {
	prompt() {
		V.prompt = `Apply Cossack Raid: All done.`
		button_confirm()
	},
	confirm() {
		G.active = RUSSIA
		goto("end_order", { type: COSSACK_RAID })
	}
}

// === EXECUTE PLACE DEPOT ORDERS ===
P.execute_place_depot = function() {
	goto("do_place_depot", { area: L.area })
}

function has_depot_in_pool(who) {
	return has_friendly_depot(who, POOL)
}

P.do_place_depot = {
	_begin() {
		//L.area
		L.has_friendly_depot_in_range = false
		for (let depot of get_supply_sources_and_depots(G.active)) {
			if (find_path_distance(depot, L.area, ROAD) <= 4) {
				L.has_friendly_depot_in_range = true
				break
			}
		}
	},
	prompt() {
		if (L.has_friendly_depot_in_range) {
			if (has_depot_in_pool(G.active)) {
				V.prompt = `Place a Depot at ${format_area(L.area)}.`
				action_area(L.area)
			} else {
				V.prompt = `No depots in pool. You may remove other depots in order to place one at ${format_area(L.area)}.`
				button_pass()
			}
		} else {
			V.prompt = `${format_area(L.area)} cannot trace a path of 4 or less road connections to another friendly depot.`
			button_confirm()
		}

		// The fuzzer loves to pull out all depots on map: This will wipe out all troops on map with attrition!
		if (!globalThis.RTT_FUZZER)
			for (let depot = get_first_depot(G.active); depot <= get_last_depot(G.active); ++depot)
				if (is_depot_on_map(depot))
					action("depot", depot)
	},
	area(area) {
		push_undo()
		add_depot(G.active, area)
		log("Placed depot")
		logi(`${format_area(area)}`)
		goto("end_order", { type: PLACE_DEPOT })
	},
	depot(depot) {
		push_undo()
		log_h4(format_area(get_depot_location(depot)), G.active)
		remove_depot(depot, get_depot_location(depot))
	},
	confirm() {
		log("Cannot trace a line of 4 or less road connections to another depot.")
		goto("end_order", { type: PLACE_DEPOT })
	},
	pass() {
		log("No depots in pool.")
		goto("end_order", { type: PLACE_DEPOT })
	}
}

// === ATTRITION ===
/*
		Events
		RUSSIA
		RU #21 Overstretched Logistics		Beginning	- FR must EITHER: remove a depot or add 1 to attrition distance this turn
		RU #30 Devastated Landscape			Beginning	- Both sides remove all 'Forage' orders. Double effect of Devastation markers this turn.
		RU #44 Disease & Starvation			Beginning	- RU may eliminate up to 4 exhausted French SPs from any areas where Devastation is 2+.
		RU #46 Devastated Countryside		Must-Play	- Effect of Devastation markers is 2x this turn.
		RU #49 Cossack Patrols				Beginning	- In all FR areas adjacent to Cossack SPs, France must remove 1 Exhausted SP per such French area and remove all Forage orders.

		FRANCE
		FR #45 Much Needed Victuals			Beginning	- FR must remove a Depot marker - do not check Attrition there and immediately rally 2 exhausted infantry there
		FR #48 Napoléon Returns to Paris	End			- Permanently remove Napoléon from the game at no VP cost

	Leader abilities
	Murat		+1 to Modified Size in his area (applies even if not seniormost leader)
	Tormasov	-2 to Modified Size in his area
*/

P.attrition = script(`
	eval {
		log_h2("Attrition")
		L.player_with_initiative = get_who_has_initiative()
	}

	call change_orders { current_type: FORAGE }

	set G.active (1 - L.player_with_initiative)
	call attrition_events
	set G.active L.player_with_initiative
	call attrition_events

	set G.active L.player_with_initiative
	call roll_weather_die

	eval { log_h3("Perform Attrition") }
	set G.active (1 - L.player_with_initiative)
	call do_attrition
	set G.active L.player_with_initiative
	call do_attrition

	if (can_play_event(C_NAPOLEON_RETURNS_TO_PARIS)) {
		set G.active FRANCE
		call may_play_napoleon_returns_to_paris
	}
`)

function get_attrition_events(who) {
	if (who === RUSSIA)
		return [C_OVERSTRETCHED_LOGISTICS, C_DEVASTATED_LANDSCAPE, C_DISEASE_AND_STARVATION, C_COSSACK_PATROLS]
	else
		return [C_MUCH_NEEDED_VICTUALS]
}

P.attrition_events = {
	_begin() {
		L.events = get_attrition_events(G.active).filter(card => hand_has(G.active, card))
	},
	prompt() {
		if (L.events.length > 0) {
			V.prompt = `You may play events (${join_array_with_or(L.events.map(card => format_card(card)))}).`
			for (let card of L.events)
				action_card(card)
			button_pass()
		} else {
			V.prompt = `Play Events: All done.`
			button_done()
		}
	},
	card(card) {
		push_undo()
		set_delete(L.events, card)
		call("event", { card })
	},
	done() {
		end()
	},
	pass() { end() }
}

P.roll_weather_die = {
	_begin() {
		log_h3("Roll Weather Die")
		log()
		L.roll = -1
	},
	prompt() {
		if (L.roll === -1) {
			V.prompt = `Roll the ${get_current_season() === SUMMER ? "Summer" : "Winter"} Weather Die.`
			button_roll()
		} else {
			V.prompt = `Weather Roll: ${L.roll}.`
			button_confirm()
		}
	},
	roll() {
		clear_undo()
		L.roll = roll_d6()
		G.weather_roll = L.roll
		log(`Weather Die W${L.roll}.`)
		log_weather_die_result(L.roll)
	},
	confirm() {
		log()
		end()
	}
}

function log_weather_die_result(roll) {
	let result = get_current_season() === SUMMER ? get_summer_weather_die_result(NONE, roll) : get_winter_weather_die_result(NONE, roll)
	if (roll !== 3) {
		logi(`${result >= 0 ? "+" : ""}${result} to Modified Size`)
	} else {
		if (get_current_season() == SUMMER) {
			logi(`Russia: -1 to Modified Size`)
			logi(`France: +0 to Modified Size`)
		} else {
			logi(`Russia: +0 to Modified Size`)
			logi(`France: +1 to Modified Size`)
		}
	}
}

function get_areas_with_sps(who) {
	let areas = []
	map_for_each(G.sps, (area, entries) => {
		if (entries.some(entry => decode_troop_entry_who(entry) === who) && (area >= FIRST_AREA) && (area <= LAST_AREA))
			set_add(areas, area)
	})
	return areas
}

function calculate_modified_size(who, area) {
	let size = 0

	// Base: total number of SPs (exhausted and fresh)
	size += count_num_sps(who, area)

	// Apply weather effects
	size += get_current_season() === SUMMER ? get_summer_weather_die_result(who, G.weather_roll) : get_winter_weather_die_result(who, G.weather_roll)

	// Key City: -3 to Modified Size
	if (is_key_city(area))
		size = Math.max(0, size - 3)

	// RU #30 Devastated Landscape, RU #46 Devastated Countryside: Double effect of Devastation markers
	if (is_event_active(C_DEVASTATED_LANDSCAPE) || is_event_active(C_DEVASTATED_COUNTRYSIDE))
		size += 2 * get_devastation(area)
	else
		size += get_devastation(area)

	// Murat: +1 to Modified Size in his area (applies even if not seniormost leader)
	if ((who === FRANCE) && (get_leader_location(L_MURAT) === area))
		size += 1

	// Tormasov: -2 to Modified Size in his area
	if ((who === RUSSIA) && (is_seniormost_leader(L_TORMASOV, area)))
		size = Math.max(0, size - 2)

	return size
}

function log_attrition_info(who, area) {
	log_h4(`${format_area(area)}`, who)
	let size = calculate_modified_size(who, area)
	let distance_to_nearest_depot = get_supply_status(who, area)
	let weather_effect = get_current_season() === SUMMER ? get_summer_weather_die_result(who, G.weather_roll) : get_winter_weather_die_result(who, G.weather_roll)

	log_only(who, `Modified Size: ${size}`)
	log_only(who, format_i(`+${count_num_sps(who, area)} SPs`))
	log_only(who, format_i(`${weather_effect >= 0 ? "+" : ""}${weather_effect} Weather`))

	if (is_key_city(area))
		log_only(who, format_i(`-3 Key City`))

	if (is_event_active(C_DEVASTATED_LANDSCAPE)) {
		log_only(who, format_i(format_card(C_DEVASTATED_LANDSCAPE)))
		log_only(who, format_i(`+${2 * get_devastation(area)} Devastation`))
	} else if (is_event_active(C_DEVASTATED_COUNTRYSIDE)) {
		log_only(who, format_i(format_card(C_DEVASTATED_COUNTRYSIDE)))
		log_only(who, format_i(`+${2 * get_devastation(area)} Devastation`))
	} else if (get_devastation(area) > 0) {
		log_only(who, format_i(`+${get_devastation(area)} Devastation`))
	}

	if ((who === FRANCE) && (get_leader_location(L_MURAT) === area))
		log_only(who, format_i(`+1 ${format_leader(L_MURAT)}`))

	if ((who === RUSSIA) && (is_seniormost_leader(L_TORMASOV, area)))
		log_only(who, format_i(`-2 ${format_leader(L_TORMASOV)}`))

	log_only(who, `Distance to nearest Depot: ${distance_to_nearest_depot}`)
	if (is_event_active(C_OVERSTRETCHED_LOGISTICS) && who === FRANCE)
		log_only(who, format_i(`+1 ${format_card(C_OVERSTRETCHED_LOGISTICS)}`))

	log_only(who, `Attrition ${size} &times; ${distance_to_nearest_depot <= MAX_SUPPLY_DISTANCE ? distance_to_nearest_depot : "OOS"}: ${get_attrition_result_name(size, distance_to_nearest_depot)}`)
	log_only(enemy(who), `Attrition: ${get_attrition_result_name(size, distance_to_nearest_depot)}`)
	log()
}

function get_attrition_result_name(modified_size, distance_to_nearest_depot) {
	let result = lookup_attrition_table(modified_size, distance_to_nearest_depot)
	// The lookup returns an array of length 2: [<num. attrition losses>, <increase in devastation>]
	return `${result[0]}${"D".repeat(result[1])}`
}

function lookup_attrition_losses(modified_size, distance_to_nearest_depot) {
	return lookup_attrition_table(modified_size, distance_to_nearest_depot)[0]
}

function lookup_attrition_devastation(modified_size, distance_to_nearest_depot) {
	return lookup_attrition_table(modified_size, distance_to_nearest_depot)[1]
}

function count_num_exhausted_sps(who, area) {
	if (!has_troop(area)) return 0

	let count = 0
	for (let entry of get_area_troop_set(area, null)) {
		if ((decode_troop_entry_who(entry) === who) && is_troop_type_exhausted(decode_troop_entry_type(entry)))
			count += decode_troop_entry_num(entry)
	}
	return count
}

function get_current_attrition_area() {
	return G.attrition_data.area
}

function has_attrition_losses_remaining() {
	return G.attrition_data.num_losses_remaining > 0
}

function has_applied_attrition_devastation() {
	return G.attrition_data.devastation_increase === 0
}

function log_attrition() {
	if (G.attrition_data.previously_exhausted.length > 0) {
		log("Exhausted")
		let total = 0
		map_for_each(G.attrition_data.previously_exhausted, (type, num) => {
			log_only(G.active, format_i(`${num} ${get_troop_type_name(type)}`))
			total += num
		})
		log_only(enemy(G.active), format_i(`${total} fresh SPs`))
	}

	if (G.attrition_data.previously_eliminated.length > 0) {
		log("Eliminated")
		let total = 0
		map_for_each(G.attrition_data.previously_eliminated, (type, num) => {
			log_only(G.active, format_i(`${num} ${get_troop_type_name(type)}`))
			total += num
		})
		log_only(enemy(G.active), format_i(`${total} fresh SPs`))
	}
}

function reset_attrition_data() {
	G.attrition_data = {
		// Area currently being checked
		area: -1,
		// Number of ATTRITION LOSSES remaining
		num_losses_remaining: -1,
		// Raw amount of how much devastation must be increased
		devastation_increase: -1,
		// Number of UNITS assigned losses
		num_sps_affected: 0,
		// Number of ATTRITION LOSSES cancelled by a forage order (losses as a result of not being able to increase Devastation may be cancelled)
		num_cancels_remaining: 0,
		// Has assigned a Cavalry loss (1/3 hits)
		has_assigned_cavalry_loss: false,
		// Caches for logging
		previously_exhausted: [],
		previously_eliminated: [],
	}
}

P.do_attrition = {
	_begin() {
		// Update distances to nearest depot before calculations
		update_supply(G.active)

		L.areas = []
		for (let area of get_areas_with_sps(G.active)) {
			// FR #45 Much Needed Victuals: Attrition is not checked in the area it was executed
			if (is_event_active(C_MUCH_NEEDED_VICTUALS) && get_event_keyword(C_MUCH_NEEDED_VICTUALS, "area") === area)
				continue

			let modified_size = calculate_modified_size(G.active, area)
			let distance_to_nearest_depot = get_supply_status(G.active, area)

			// No need to make players check attrition in areas where it won't matter
			if (lookup_attrition_losses(modified_size, distance_to_nearest_depot) === 0
				&& lookup_attrition_devastation(modified_size, distance_to_nearest_depot) === 0
			) {
				// Populate 'Attrition Checked' markers
				set_add(G.attrition_checked, area)
			} else {
				set_add(L.areas, area)
			}
		}

		reset_attrition_data()
	},
	prompt() {
		if (L.areas.length > 0) {
			V.prompt = `Select next area to check attrition.`
			if (L.areas.length <= 5)
				V.prompt += ` (${join_array_with_or(L.areas.map(format_area))})`

			L.areas.forEach(action_area)
		} else {
			V.prompt = `Attrition: All done.`
			button_confirm()
		}
	},
	area(area) {
		push_undo()
		let modified_size = calculate_modified_size(G.active, area)
		let distance_to_nearest_depot = get_supply_status(G.active, area)

		G.attrition_data.area = area
		G.attrition_data.num_losses_remaining = Math.min(count_num_sps(G.active, area), lookup_attrition_losses(modified_size, distance_to_nearest_depot))
		G.attrition_data.devastation_increase = lookup_attrition_devastation(modified_size, distance_to_nearest_depot)

		log_attrition_info(G.active, area)

		if (has_order_of_type(G.active, FORAGE, area))
			call("reveal_forage_order", { area })
		else if (has_attrition_losses_remaining())
			call("assign_attrition_losses", { area })
		else
			call("increase_devastation", { area })
	},
	_resume() {
		if (has_attrition_losses_remaining() && has_friendly_troop(G.active, get_current_attrition_area()))
			call("assign_attrition_losses", { area: get_current_attrition_area() })
		else if (!has_applied_attrition_devastation())
			call("increase_devastation", { area: get_current_attrition_area() })
		else {
			log()
			log_attrition()
			set_delete(L.areas, get_current_attrition_area())
			set_add(G.attrition_checked, get_current_attrition_area())
			reset_attrition_data()
			log()
		}
	},
	confirm() {
		reset_attrition_data()
		G.attrition_checked.length = 0
		end()
	}
}

P.reveal_forage_order = {
	prompt() {
		V.prompt = `Reveal Forage order to reduce Attrition losses by 2?`

		action_order(get_orders_at_area(G.active, get_current_attrition_area()).find(order => get_order_type(order) === FORAGE))
		button_pass()
	},
	order(order) {
		push_undo()
		remove_order(order)
		log("Revealed Forage order.")
		logi(`-2 Attrition Losses`)
		log()
		G.attrition_data.num_cancels_remaining += 2
		while (G.attrition_data.num_losses_remaining > 0 && G.attrition_data.num_cancels_remaining > 0) {
			--G.attrition_data.num_losses_remaining
			--G.attrition_data.num_cancels_remaining
		}

		if (has_attrition_losses_remaining())
			goto("assign_attrition_losses", { area: get_current_attrition_area() })
		else if (!has_applied_attrition_devastation())
			goto("increase_devastation", { area: get_current_attrition_area() })
		else
			end()
	},
	pass() {
		push_undo()

		if (has_attrition_losses_remaining())
			goto("assign_attrition_losses", { area: get_current_attrition_area() })
		else if (!has_applied_attrition_devastation())
			goto("increase_devastation", { area: get_current_attrition_area() })
		else
			end()
	}
}

function must_assign_cavalry_attrition_loss() {
	return G.attrition_data.num_sps_affected % 3 === 2 && !G.attrition_data.has_assigned_cavalry_loss && has_cavalry_or_cossack_in_area(G.active, L.area)
}

// TODO: Maybe have a single state to assign attrition losses? (to reduce clicking)
P.assign_attrition_losses = {
	prompt() {
		V.prompt = `Assign attrition losses: ${G.attrition_data.num_losses_remaining} remaining.`

		if (must_assign_cavalry_attrition_loss()) {
			if (count_num_sps_of_type(G.active, FRESH_CAVALRY, L.area) > 0 || count_num_sps_of_type(G.active, FRESH_COSSACK, L.area) > 0)
				button("exhaust")

			if (count_num_sps_of_type(G.active, EXHAUSTED_CAVALRY, L.area) > 0 || count_num_sps_of_type(G.active, EXHAUSTED_COSSACK, L.area) > 0)
				button("eliminate_2")
		}
		else {
			if (has_fresh_sp(G.active, L.area))
				button("exhaust")

			if (count_num_exhausted_sps(G.active, L.area) >= 2
				|| ((has_friendly_troop(G.active, L.area) && count_num_sps(G.active, L.area) === count_num_exhausted_sps(G.active, L.area)))
			) {
				switch(G.attrition_data.num_sps_affected % 3) {
				case 0:
					button("eliminate_2")
					break
				case 1:
				case 2:
					button("eliminate_2", (
						get_all_exhausted_sp_types(G.active, L.area).some(type => is_cavalry(type) || is_cossack(type))
						|| G.attrition_data.has_assigned_cavalry_loss
						|| (!G.attrition_data.has_assigned_cavalry_loss && !has_cavalry_or_cossack_in_area(G.active, L.area))
					))
				}
			}
		}
	},
	exhaust() {
		push_undo()
		call_or_goto(--G.attrition_data.num_losses_remaining > 0, "exhaust_sp", { area: L.area })
	},
	eliminate_2() {
		push_undo()
		call_or_goto((--G.attrition_data.num_losses_remaining > 0) && (count_num_sps(G.active, L.area) > 2), "eliminate_2_exhausted_sps", { area: L.area })
	}
}

P.exhaust_sp = {
	// L.area
	prompt() {
		V.prompt = `Exhaust 1 fresh SP at ${format_area(L.area)}.`
		if (must_assign_cavalry_attrition_loss() && (count_num_sps_of_type(G.active, FRESH_CAVALRY, L.area) > 0 || count_num_sps_of_type(G.active, FRESH_COSSACK, L.area) > 0)) {
			for (let type of get_all_fresh_sp_types(G.active, L.area)) {
				if (is_cavalry(type) || is_cossack(type))
					action_troop_alt(type, L.area)
			}
		} else {
			get_all_fresh_sp_types(G.active, L.area).forEach(type => action_troop_alt(type, L.area))
		}
	},
	troop(entry) {
		push_undo()
		let type = decode_troop_action_type(entry)

		exhaust_sp(G.active, L.area, type)

		if (is_cavalry(type) || is_cossack(type))
			G.attrition_data.has_assigned_cavalry_loss = true
		if (++G.attrition_data.num_sps_affected % 3 === 0)
			G.attrition_data.has_assigned_cavalry_loss = false

		if (!map_has(G.attrition_data.previously_exhausted, type))
			map_set(G.attrition_data.previously_exhausted, type, 1)
		else
			map_increment(G.attrition_data.previously_exhausted, type)

		end()
	}
}

P.eliminate_2_exhausted_sps = {
	// L.area
	_begin() {
		L.count = Math.min(2, count_num_exhausted_sps(G.active, L.area))
	},
	prompt() {
		V.prompt = `Eliminate ${L.count} SPs at ${format_area(L.area)}.`
		if (must_assign_cavalry_attrition_loss() && (count_num_sps_of_type(G.active, EXHAUSTED_CAVALRY, L.area) > 0 || count_num_sps_of_type(G.active, EXHAUSTED_COSSACK, L.area) > 0)) {
			for (let type of get_all_exhausted_sp_types(G.active, L.area)) {
				if (is_cavalry(type) || is_cossack(type))
					action_troop_alt(type, L.area)
			}
		} else {
			get_all_exhausted_sp_types(G.active, L.area).forEach(type => action_troop_alt(type, L.area))
		}
	},
	troop(entry) {
		push_undo()
		let type = decode_troop_action_type(entry)

		eliminate_troop(G.active, L.area, type)

		if (is_cavalry(type) || is_cossack(type))
			G.attrition_data.has_assigned_cavalry_loss = true
		if (++G.attrition_data.num_sps_affected % 3 === 0)
			G.attrition_data.has_assigned_cavalry_loss = false

		if (!map_has(G.attrition_data.previously_eliminated, type))
			map_set(G.attrition_data.previously_eliminated, type, 1)
		else
			map_increment(G.attrition_data.previously_eliminated, type)

		if (--L.count === 0) {
			if (!has_friendly_troop(G.active, L.area) && has_friendly_leader(G.active, L.area))
				goto("eliminate_leader", { area: L.area })
			else
				end()
		}
	}
}

P.increase_devastation = {
	prompt() {
		if (get_devastation(L.area) < 3) {
			V.prompt = `Increase Devastation at ${format_area(L.area)} by ${G.attrition_data.devastation_increase}.`
			action_area(get_current_attrition_area())
		} else {
			V.prompt = `Devastation at ${format_area(L.area)} cannot be increased further.`
		}
		button_confirm()
	},
	area(_) {
		this.confirm()
	},
	confirm() {
		push_undo()
		let raw_devastation = get_devastation(L.area) + G.attrition_data.devastation_increase
		set_devastation(L.area, Math.min(3, raw_devastation))
		G.attrition_data.devastation_increase = 0

		log(`Devastation at ${format_area(L.area)} increased to ${get_devastation(L.area)}.`)

		if (
			raw_devastation > 3
			&& G.attrition_data.num_cancels_remaining === 0
			&& has_friendly_troop(G.active, L.area)
		) {
			log_only(G.active, `Cannot increase devastation further.`)
			++G.attrition_data.num_losses_remaining
			goto("assign_attrition_losses", { area: get_current_attrition_area() })
		} else {
			end()
		}
	}
}

// === LINES OF COMMUNICATIONS ===
function update_next_cluster(player) {
	L.current_cluster[player] = {}
	L.current_cluster[player].cluster = L.clustered_depots[player].shift()
	L.current_cluster[player].count = Math.ceil(L.current_cluster[player].cluster.length / 2)
}

P.lines_of_communications = {
	_begin() {
		log_h2("Lines of Communications")
		G.active = [RUSSIA, FRANCE]

		// Depots which cannot trace a valid LoC back to a supply source AND cannot trace a path of 4 or less road connections to another depot.
		L.unconnected_depots = [[], []]
		// Depots which cannot trace a valid LoC back to a supply source BUT can trace a path of 4 or less road connections to another depot.
		L.clustered_depots = [[], []]

		// The current cluster the player is checking Lines of Communications for.
		// Must remove half of the depots (rounded up) from each cluster.
		L.current_cluster = [{}, {}]

		// TODO
		// Undo stack
		L.undo = [[], []]

		for (let player = RUSSIA; player <= FRANCE; ++player) {
			let status = check_lines_of_communications(player)

			for (let area of status.remove)
				L.unconnected_depots[player].push(area)
			for (let cluster of status.remove_half)
				L.clustered_depots[player].push(cluster)

			if (L.unconnected_depots[player].length === 0 && L.clustered_depots[player].length > 0)
				update_next_cluster(player)
		}
	},
	inactive: "check lines of communications",
	prompt() {
		if (L.unconnected_depots[R].length > 0) {
			V.prompt = `Lines of Communications: Remove depots at ${join_array_with_and(L.unconnected_depots[R].map(format_area))}.`
			L.unconnected_depots[R].forEach(area => action_depot(find_depot_at_location(R, area)))
		} else if (L.current_cluster[R].count && L.current_cluster[R].count > 0) {
			V.prompt = `Lines of Communications: Remove ${L.current_cluster[R].count} depots among ${join_array_with_and(L.current_cluster[R].cluster.map(format_area))}`
			L.current_cluster[R].cluster.forEach(area => action_depot(find_depot_at_location(R, area)))
		} else {
			V.prompt = `Lines of Communications: All done.`
			button_confirm()
		}
	},
	depot(depot) {
		let area = get_depot_location(depot)
		remove_depot(depot, area)
		if (L.unconnected_depots[R].length > 0) {
			set_delete(L.unconnected_depots[R], area)
			if (L.unconnected_depots[R].length === 0 && L.clustered_depots[R].length > 0)
				update_next_cluster(R)
		} else {
			if (--L.current_cluster[R].count === 0 && L.clustered_depots[R].length > 0)
				update_next_cluster(R)
		}
	},
	confirm() {
		set_delete(G.active, R)
		if (G.active.length === 0)
			end()
	}
}

// === SUPPLY ===
const MAX_SUPPLY_DISTANCE = 5
const MAX_LOC_DISTANCE = 4

const ROAD = 1
const TRACK = 2

function get_all_adjacent_areas_of_connection_type(area, connection_type) {
	return (connection_type === ROAD) ? get_adjacent_areas_by_road(area) : get_adjacent_areas_by_track(area)
}

function get_supply_sources(who) {
	return SUPPLY_SOURCES[who].slice()
}

function get_supply_sources_and_depots(who) {
	let sources = get_supply_sources(who)
	for (let area of get_depots(who))
		if ((area !== POOL) && (area !== OUT_OF_PLAY))
			set_add(sources, area)
	return sources
}

function has_enemy_sp(who, space) {
	return (who === RUSSIA && has_friendly_troop(FRANCE, space)) || (who === FRANCE && has_friendly_troop(RUSSIA, space))
}

function get_supply_status(who, area) {
	if (who === FRANCE && is_event_active(C_OVERSTRETCHED_LOGISTICS))
		return G.supply[who][area] + 1
	else
		return G.supply[who][area]
}

/* SUPPLY */
// Returns the distance from each space to its closest node if in supply, greater than 5 if OOS
function calculate_distance_to_nearest_depot(who) {
	let sources = get_supply_sources_and_depots(who)
	let distance = new Array(NUM_AREAS).fill(999)

	for (let source of sources)
		distance[source] = 0

	for (let source of sources) {
		let queue = [ source ]

		while (queue.length > 0) {
			let current = queue.shift()

			if ((distance[current] > MAX_SUPPLY_DISTANCE) || has_enemy_sp(who, current))
				continue

			//Tracks and Roads are identical for supply purposes except for their modified distance: Road - 1, Track - 2
			//The TRACK and ROAD constants map to this distance
			for (let connection_type = ROAD; connection_type <= TRACK; ++connection_type) {
				for (let s of get_all_adjacent_areas_of_connection_type(current, connection_type)) {
					if (distance[s] > distance[current] + connection_type) {
						distance[s] = distance[current] + connection_type
						queue.push(s)
					}
				}
			}
		}

	}

	return distance
}

/* LINES OF COMMUNICATIONS */
function check_lines_of_communications(player) {
	let sources = get_supply_sources(player)

	let depots = []
	for (let depot = get_first_depot(player); depot <= get_last_depot(player); ++depot) {
		if (is_depot_on_map(depot))
			set_add(depots, get_depot_location(depot))
	}

	let status = {
		connected: [],
		remove_half: [],
		remove: depots.slice(),
	}

	let queue = sources.slice()
	let distance = []
	for (let source of sources)
		map_set(distance, source, 0)

	while (queue.length > 0) {
		let current = queue.shift()

		// Cannot trace through areas with enemy SPs.
		// Maximum distance of 4 road connections to the nearest depot.
		if (has_enemy_sp(player, current) || map_get(distance, current, 999) > MAX_LOC_DISTANCE)
			continue

		// Start with a player's supply sources, and traverse the graph using road connections.
		// Add depots to sources as they are encountered.
		for (let area of get_adjacent_areas_by_road(current)) { // Can only trace through road, not track.
			if (map_get(distance, area, 999) > map_get(distance, current, 999) + 1) {
				queue.push(area)
				if (set_has(depots, area) && !set_has(sources, area)) {
					set_add(sources, area)
					set_add(status.connected, area)
					set_delete(status.remove, area)
					map_set(distance, area, 0)
				} else {
					map_set(distance, area, map_get(distance, current, 999) + 1)
				}
			}
		}
	}

	if (status.remove.length > 0) {
		let clustered_depots = []

		// TODO: optimize
		for (let depot of status.remove) {
			let linkable_depots = get_linkable_depots(player, depot)
			if (linkable_depots.length > 0) {
				let cluster = status.remove_half.find(cl => set_has(cl, depot) || linkable_depots.some(a => set_has(cl, a))) ?? null
				if (cluster !== null) {
					if (!set_has(cluster, depot))
						set_add(cluster, depot)
				} else {
					status.remove_half.push([ depot, ...linkable_depots ])
				}
				set_add(clustered_depots, depot)
			}
		}

		clustered_depots.forEach(depot => set_delete(status.remove, depot))
	}

	return status
}

function get_linkable_depots(player, area) {
	let queue = [ area ]
	let distance = []
	let depots = []
	map_set(distance, area, 0)

	while (queue.length > 0) {
		let current = queue.shift()

		if (has_enemy_sp(player, current) || map_get(distance, current, 999) > MAX_LOC_DISTANCE)
			continue

		for (let adj of get_adjacent_areas_by_road(current)) {
			if (map_get(distance, adj, 999) > map_get(distance, current, 999) + 1) {
				queue.push(adj)
				if (has_friendly_depot(player, adj))
					set_add(depots, adj)
				map_set(distance, adj, map_get(distance, current, 999) + 1)
			}
		}
	}

	return depots
}

/* PLACE DEPOT ELIGIBILITY */
function has_depot_within_four_road_connections(who, area) {
	if (get_adjacent_areas_by_road(area).length === 0)
		return false

	let queue = [ area ]
	let distance = []
	map_set(distance, area, 0)

	while (queue.length > 0) {
		let current = queue.shift()

		if (map_get(distance, current) > 4)
			return false

		if (set_has(get_supply_sources_and_depots(who), current))
			return true

		for (let adj of get_adjacent_areas_by_road(current)) {
			if (!queue.includes(adj) && !map_has(distance, adj)) {
				queue.push(adj)
				map_set(distance, adj, map_get(distance, current, null) + 1)
			}
		}
	}
}

// === EVENTS ===
/*
	G.persistent events is a plain array 'map' using the framework functions.
	key - event card id
	value - an object that contains information relevant to the event, including
		event removal turn
		area it applies to (only some events)

	Use get_event_keyword to read specific keywords attached to the event
*/

function get_event_state_name(event) {
	return cards[event].state_name
}

function can_play_event(card) {
	if ((get_card_season(card) !== BOTH) && (get_card_season(card) !== get_season(G.turn))) return false
	if (is_battle_card(card) && (!G.current_battle || (G.current_battle === -1))) return false

	let evt = E[get_event_state_name(card)]
	if (evt && typeof evt === "function")
		return evt()

	return true
}

function is_event_active(event) {
	return map_has(G.persistent_events, event)
}

function add_persistent_event(evt, keywords) {
	let removal_turn = (evt === C_WELL_DISCIPLINED_RETREAT || evt === C_EXTREME_WEATHER_FR) ? G.turn + 1 : G.turn
	let key = evt
	let value = Object.assign({remove: removal_turn}, keywords)
	map_set(G.persistent_events, key, value)
}

function get_event_keyword(evt, keyword, fallback = null) {
	return map_get(G.persistent_events, evt)?.[keyword] ?? fallback
}

function log_must_play_event(card, info) {
	card_box_begin(card)
	switch(card) {
	case C_HOLY_MOTHER_RUSSIA_RU:
		log("Russia +2 orders.")
		log(`The side controlling ${format_area(get_event_data(C_HOLY_MOTHER_RUSSIA_RU).key)} at the end of the turn gain +1 VP.`)
		break
	case C_EXTREME_WEATHER_RU:
		log("France has -2 orders this turn.")
		log("1 fresh SP in each force that uses 'March' or 'Forced March' becomes exhausted.")
		break
	case C_COMMAND_FRICTION:
		log("France may designate an area with more than 1 RU leader at the beginning of the 'Place Orders' phase.")
		break
	case C_POOR_LOGISTICS:
		log("Russia may not use 'Place Depot' orders this turn.")
		break
	case C_DEVASTATED_COUNTRYSIDE:
		log("The effect of Devastation markers is doubled for both sides this turn.")
		break
	case C_BARCLAY_DE_TOLLY_RESIGNS:
		if (info)
			log("de Tolly removed from play.")
		else
			if (!is_leader_on_map(L_DE_TOLLY))
				log(`No effect – ${format_leader(L_DE_TOLLY)} is not on map.`)
			else
				log(`No effect – ${format_leader(L_KUTUZOV)} is not on map.`)
		break
	case C_POOR_COMMUNICATIONS:
		log("At the end of the 'Place Orders' phase, RU may designate 1 placed FR order to remove.")
		break
	case C_JEROME_GOES_HOME:
		if (info)
			log(`${format_leader(L_JEROME)} removed from play.`)
		else
			log(`No effect – ${format_leader(L_JEROME)} is not on map.`)
		break
	case C_FREEZING_WEATHER:
		log("FR may not use 'Place Depot' or 'Forage' orders this turn.")
		log("All FR forces have a maximum move of 1.")
		log("FR forces fight as if under 'Forced March' orders.")
		break
	case C_EXTREME_WEATHER_FR:
		log("Both sides -2 orders.")
		log("Neither side may place 'Forced March' orders this turn.")
		log("1 SP in every force that uses 'March' orders becomes exhausted.")
		break
	case C_LOGISTICS_COLLAPSE:
		log("For the rest of the game, France must discard a card to execute a 'Place Depot' order.")
		break
	case C_CHAOTIC_FOOD_DISTRIBUTION:
		if (info === "no effect") {
			log("No effect.")
		} else {
			if (get_event_data(C_CHAOTIC_FOOD_DISTRIBUTION).area) log(`Removed depot from ${format_area(get_event_data(C_CHAOTIC_FOOD_DISTRIBUTION).area)}.`)
			if (get_event_data(C_CHAOTIC_FOOD_DISTRIBUTION).troop_type) {
				log(`Rallied`)
				log_only(FRANCE, format_i(`1 ${get_troop_type_name(get_event_data(C_CHAOTIC_FOOD_DISTRIBUTION).troop_type)}`))
				log_only(RUSSIA, format_i(`1 Exh. SP`))
			}
		}
	}
	card_box_end()
}

/* COMMON EVENT STATES */

P.event = script(`
	eval {
		card_box_begin(L.card)
		call(get_event_state_name(L.card))
	}
	eval {
		card_box_end()
		discard_or_remove_card(L.card)
	}
`)

P.event_done = {
	// L.card
	prompt() {
		prompt_card(L.card, `All done.`)
		button_confirm()
	},
	confirm() {
		push_undo()
		end()
	}
}

P.may_play_event = {
	_begin() {
		// L.event (passed as integer if one event, array otherwise)
		// L.suffix? (more info about the event if necessary)
		// L.info? (any information that needs to be handed down to the card state)
		// L.goto_if_not_played? (name of state we should go to if the card is not played)
		L.suffix = L.suffix === undefined ? "" : ` ${L.suffix}`
		if (Array.isArray(L.event)) {
			L.event = L.event.filter(card => hand_has(G.active, card))
			if (L.event.length === 1)
				L.event = L.event[0]
		}
		L.current_event = -1
	},
	inactive() {
		if (typeof L.event === 'number')
			return `play ${format_card(L.event)}`
		else
			return ""
	},
	prompt() {
		if (typeof L.event === 'number') {
			if (hand_has(G.active, L.event)) {
				V.prompt = `You may play ${format_card(L.event)}` + L.suffix + "."
				button("play")
				action_card(L.event)
			} else {
				V.prompt = `You do not have ${format_card(L.event)} in hand.`
			}
			button_pass()
		} else {
			if (L.event.length > 0) {
				V.prompt = `You may play ${join_array_with_or(L.event.map(format_card))}` + L.suffix + "."
				L.event.forEach(action_card)
			} else {
				V.prompt = `You do not have any events in hand.`
			}
			button_pass()
		}
	},
	play() { this.card(L.event) },
	card(card) {
		push_undo()
		L.current_event = card
		card_box_begin(card)
		if (L.info)
			call(get_event_state_name(card), object_copy(L.info))
		else
			call(get_event_state_name(card))
	},
	pass() {
		push_undo()
		if (L.goto_if_not_played) {
			if (L.info)
				goto(L.goto_if_not_played, object_copy(L.info))
			else
				goto(L.goto_if_not_played)
		} else {
			if (L.current_event === C_UNSUCCESSFUL_DISENGAGEMENT)
				L.L.unsuccessful_disengagement = false
			end()
		}
	},
	_resume() {
		card_box_end()
		discard_or_remove_card(L.current_event)
		if (L.$ === undefined)
			goto("event_done", { card: L.current_event })
		else
			end(L.$)
	}
}

// Simple card confirmations.
P.confirm_event = {
	_begin() {
		// L.card: Card id.
		// L.sequence: Series of objects, each with prompt (string) and log_text(string) properties + an optional pred property.
		// L.inactive: Card-specific inactive text.
		L.inactive = L.inactive ?? ""
		// L.persistent: Whether to add the event as a persistent event.
		L.persistent = L.persistent ?? false
		L.step = 0
	},
	inactive() { return L.inactive },
	prompt() {
		prompt_card(L.card, L.sequence[L.step].prompt)
		button_confirm()
	},
	confirm() {
		push_undo()
		if (L.sequence[L.step].log_text)
			log(L.sequence[L.step].log_text)

		++L.step
		while (L.step < L.sequence.length) {
			if (L.sequence[L.step].pred === undefined || L.sequence[L.step].pred)
				return
			++L.step
		}

		if (L.step >= L.sequence.length)
			end()
	},
	_end() {
		if (L.persistent)
			add_persistent_event(L.card)
		L.on_end?.()
	}
}

/* COMMON UTILITY STATES */

// Shift VP.
P.shift_vp = {
	// L.in_favor_of, L.amount
	_begin() {
		L.amount = L.amount ?? 1
	},
	prompt() {
		V.prompt = `Shift VP marker ${L.amount} spaces in ${ROLES[L.in_favor_of]}'s favor.`
		action_vp_marker()
		button_next()
	},
	next() { this.vp() },
	vp() {
		push_undo()
		increase_vp(L.in_favor_of, L.amount)
		if (!sudden_death())
			end()
	}
}

// Shift Initiative.
P.shift_initiative = {
	// L.in_favor_of, L.amount
	_begin() {
		L.amount = L.amount ?? 1
		L.amount = get_who_has_initiative() === L.in_favor_of ? Math.min(4 - L.amount, L.amount) : L.amount
	},
	prompt() {
		if (L.amount === 0) {
			V.prompt = `Cannot shift Initiative further.`
			button_confirm()
		} else {
			V.prompt = `Shift Initiative ${L.amount} spaces in ${ROLES[L.in_favor_of]}'s favor.`
			action_initiative_marker()
			button_next()
		}
	},
	confirm() {
		push_undo()
		log(`Cannot shift Initiative further.`)
		end()
	},
	next() {
		push_undo()
		shift_initiative(L.in_favor_of, L.amount)
		end()
	},
	initiative() { this.next() },
}

// Receive a free order during the Select Orders phase.
P.receive_free_order = {
	// L.card, L.type
	prompt() {
		prompt_card(L.card, `Receive a free ${get_order_type_name(L.type)} order when selecting orders.`)
		button_confirm()
	},
	confirm() {
		push_undo()
		log(`Received`)
		logi(`1 ${get_order_type_name(L.type)}`)
		add_persistent_event(L.card) // To add orders in the Select Orders phase
		end()
	}
}

// Place orders of a specific type in any areas that meet a callback.
// Per-event callback function (since passing a callback with L is not stable).
function place_order_callback(card, area) {
	if (card === C_CONFUSED_RETREAT)
		return has_friendly_troop(G.active, area)
	else if (card === C_FLYING_COLUMNS)
		return has_cossack_sp(area)
	else if (card === C_CAVALRY_SCREENING)
		return has_cavalry_or_cossack_in_area(G.active, area)
	return false
}

P.place_orders_of_type = {
	_begin() {
		// L.card
		// L.type
		log(`Placed ${get_order_type_name(L.type)} orders`)
		L.areas = []
		L.count = Math.min(2, array_count(get_orders_at_area(G.active, POOL), order => get_order_type(order) === L.type))
	},
	prompt() {
		if (L.count === 0) {
			V.prompt = `No ${get_order_type_name(L.type)} order in pool to place.`
			button_confirm()
		} else {
			V.prompt = `Select areas to place ${get_order_type_name(L.type)} orders. (${L.count} remaining)`
			filter_areas(area => place_order_callback(L.card, area)).forEach(action_area)
		}
	},
	area(area) {
		push_undo()
		add_order_of_type_from_pool(G.active, L.type, area)
		logi(format_area(area))
		if (--L.count === 0)
			end()
	},
	confirm() {
		push_undo()
		end()
	}
}

/* EVENTS */

// RU #1: Well-Disciplined Retreat
P.well_disciplined_retreat = function() {
	goto("confirm_event", {
		card: C_WELL_DISCIPLINED_RETREAT,
		inactive: `play ${format_card(C_WELL_DISCIPLINED_RETREAT)}`,
		sequence: [{
			prompt: "For this, and the next, turn Russia suffers no exhaustion when using Evade orders.",
			log_text: "For this, and the next, turn Russia suffers no exhaustion when using Evade orders.",
		}],
		persistent: true,
	})
}

// RU #2: Confused Retreat
P.may_play_confused_retreat = function() {
	goto("may_play_event", { event: C_CONFUSED_RETREAT, info: { area: L.area } })
}

P.confused_retreat = script(`
	call shift_initiative { in_favor_of: FRANCE }
	call place_orders_of_type { card: C_CONFUSED_RETREAT, type: EVADE }
`)

// RU #3: Opolchenie
P.opolchenie = {
	_begin() {
		L.areas = [S_PSKOV, S_KIEV, S_SMOLENSK, S_KALUGA, S_MOSCOW].filter(area => is_ru_controlled(area))
		log("Placed")
	},
	inactive: "raise the militia",
	prompt() {
		// Always guaranteed at least Pskov (Russian off-map area cannot be entered by France)
		prompt_card(C_OPOLCHENIE, `Place 2 exhausted Russian Infantry SPs at ${join_array_with_and(L.areas.map(format_area))}.`)
		L.areas.forEach(action_area)
	},
	area(area) {
		push_undo()
		logi(`${format_area(area)}`)
		add_troop(RUSSIA, area, EXHAUSTED_INFANTRY, 2)
		logii(`2 ${get_troop_type_name(EXHAUSTED_INFANTRY)}`)
		set_delete(L.areas, area)
		if (L.areas.length === 0)
			end()
	}
}

// RU #4: Evasive Maneuvers
P.may_play_evasive_maneuvers = function() {
	goto("may_play_event", {
		event: C_EVASIVE_MANEUVERS,
		suffix: "to execute all Forced March orders first this turn",
	})
}

P.evasive_maneuvers = function() {
	goto("confirm_event", {
		card: C_EVASIVE_MANEUVERS,
		inactive: `play ${format_card(C_EVASIVE_MANEUVERS)}`,
		sequence: [
			{
				prompt: "Russia executes all Forced March orders first this turn.",
				log_text: "Russia executes all Forced March orders first."
			},
			{
				prompt: "Russian forces using Forced March orders may not end moves in, or adjacent to, French-occupied areas.",
				log_text: "Russian forces using Forced March orders may not end moves in, or adjacent to, French-occupied areas.",
			}
		],
		persistent: true,
		on_end() { L.L.$ = RUSSIA },
	})
}

// RU #5: Idle Reserves
E.idle_reserves = function() { return is_battle_defender(RUSSIA, G.current_battle) }

P.idle_reserves = function() {
	if (is_battle_event_currently_active(C_THE_IMPERIAL_GUARD)) {
		goto("confirm_event", {
			card: C_IDLE_RESERVES,
			inactive: `see their plans thwarted`,
			sequence: [{
				prompt: `No effect: France played ${format_card(C_THE_IMPERIAL_GUARD)}.`,
				log_text: `No effect – France played ${format_card(C_THE_IMPERIAL_GUARD)}.`,
			}]
		})
	} else {
		goto("confirm_event", {
			card: C_IDLE_RESERVES,
			inactive: `make the Emperor hesitate`,
			sequence: [{
				prompt: `All Imperial Guard SPs fight at X0 in this battle.`,
				log_text: `All Guard SPs fight X0.`,
			}]
		})
	}
}

// RU #6: Bagration's Retreat
function get_bagrations_retreat_destinations(area, radius = 2) {
	let movable_sps = get_movable_sps_in_area(get_leader_location(L_BAGRATION), L.area)
	if (movable_sps[FRESH_CAVALRY] > 0 || movable_sps[FRESH_COSSACK] > 0)
		radius = 3

	return get_movable_areas_in_radius(area, radius, (destination) => {
		return is_friendly_controlled(RUSSIA, destination)
		&& (is_key_city(destination) || has_friendly_depot(RUSSIA, destination))
	})
}

function get_areas_that_could_execute_bagrations_retreat(destination) {
	let source = get_leader_location(L_BAGRATION)
	let areas = [ source ]

	for (let area of get_all_adjacent_areas(source)) {
		if (!has_russian_sp(area) || get_movable_sps_in_area(RUSSIA, source).every(troop_type => troop_type === 0))
			continue

		let movable_sps = get_movable_sps_in_area(get_leader_location(L_BAGRATION), source)
		let radius = (movable_sps[FRESH_CAVALRY] > 0 || movable_sps[FRESH_COSSACK] > 0) ? 3 : 2

		if (set_has(get_movable_areas_in_radius(area, radius), destination))
			set_add(areas, area)
	}

	return areas
}

E.bagrations_retreat = function() {
	if (!is_leader_on_map(L_BAGRATION) || has_leader_moved(L_BAGRATION))
		return false
	return get_bagrations_retreat_destinations(get_leader_location(L_BAGRATION)).length > 0
}

P.may_play_bagrations_retreat = function() {
	goto("may_play_event", {
		event: C_BAGRATIONS_RETREAT,
		info: { area: L.area },
		suffix: "activate forces in adjacent areas when executing this order",
		goto_if_not_played: "forced_march"
	})
}

P.bagrations_retreat = script(`
	eval {
		L.prompt_text = "Russian forces in adjacent areas may join the move if all forces end in the same friendly Key City or Depot marker."
		L.log_text = "Russian forces in adjacent areas may join this Forced March."
	}
	call confirm_event { card: C_BAGRATIONS_RETREAT, inactive: "play CN6", sequence: [{ prompt: L.prompt_text, log_text: L.log_text }] }
	call bagrations_retreat_designate { area: L.area }
	call execute_bagrations_retreat { area: L.$ }
`)

P.bagrations_retreat_designate = {
	prompt() {
		let destinations = get_bagrations_retreat_destinations(L.area)
		prompt_card(C_BAGRATIONS_RETREAT, `Designate a destination to force march. (${join_array_with_or(destinations.map(format_area))})`)
		destinations.forEach(action_area)
	},
	area(area) {
		push_undo()
		log(`Designated ${format_area(area)}.`)
		add_persistent_event(C_BAGRATIONS_RETREAT, { destination: area })
		log()
		end()
	}
}

P.execute_bagrations_retreat = {
	_begin() {
		// L.destination
		L.areas = get_areas_that_could_execute_bagrations_retreat(L.destination)
	},
	prompt() {
		V.prompt = `Select next area to move. (${join_array_with_or(L.areas.map(format_area))})`
		L.areas.forEach(action_area)
	},
	area(area) {
		push_undo()
		set_delete(L.areas, area)
		call_or_goto(L.areas.length > 0, "forced_march", { area })
	},
	confirm() {
		push_undo()
		map_delete(G.persistent_events, C_BAGRATIONS_RETREAT)
		end()
	},
	_resume() { log() },
}

// RU #7: Indecision
P.may_play_indecision = function() {
	if (L.response_to === "the_imperial_guard") {
		goto("may_play_event", {
			event: C_INDECISION,
			info: { response_to: "the_imperial_guard" },
			suffix: `cancel the effect of ${format_card(C_THE_IMPERIAL_GUARD)}`,
		})
	} else {
		goto("may_play_event", {
			event: C_INDECISION,
			info: { response_to: "napoleon_change", napoleon_change: L.napoleon_change },
			suffix: `prevent ${format_leader(L_NAPOLEON)} from changing orders this turn`
		})
	}
}

P.indecision = function() {
	goto(`indecision_cancel_${L.response_to}`, L.response_to === "napoleon_change" ? { napoleon_change: L.napoleon_change } : {})
}

P.indecision_cancel_the_imperial_guard = {
	prompt() {
		prompt_card(C_INDECISION, `Cancel the effect of ${format_card(C_THE_IMPERIAL_GUARD)}. (cannot be undone)`)
		button_confirm()
	},
	confirm() {
		clear_undo()
		log(`Cancelled ${format_card(C_THE_IMPERIAL_GUARD)}.`)
		discard_or_remove_card(C_THE_IMPERIAL_GUARD)
		remove_battle_event(G.current_battle, C_THE_IMPERIAL_GUARD)
		set_delete(G.played_cards[FRANCE], C_THE_IMPERIAL_GUARD)
		end()
	}
}

P.indecision_cancel_napoleon_change = {
	prompt() {
		prompt_card(C_INDECISION, `Cancel ${format_leader(L_NAPOLEON)}'s ability to change orders this turn. (cannot be undone)`)
		button_confirm()
	},
	confirm() {
		clear_undo()
		log(`Cancelled ${format_leader(L_NAPOLEON)}'s change.`)
		log(`${format_leader(L_NAPOLEON)} may not change orders this turn.`)
		place_order(L.napoleon_change.removed, get_leader_location(L_NAPOLEON))
		remove_order(L.napoleon_change.placed, get_leader_location(L_NAPOLEON))
		add_persistent_event(C_INDECISION)
		end()
	}
}

// RU #8: Fighting Withdrawal
E.fighting_withdrawal = function() { return is_battle_defender(RUSSIA, G.current_battle) }

P.fighting_withdrawal = function() {
	goto("confirm_event", {
		card: C_FIGHTING_WITHDRAWAL,
		inactive: `extricate itself from the Grande Armée`,
		sequence: [
			{
				prompt: "Both sides' losses are reduced by 2 this battle.",
				log_text: "Both sides' losses are reduced by 2."
			},
			{
				prompt: "There is no pursuit, but Russia must retreat after battle and count as having lost it.",
				log_text: `No pursuit after battle.\nRussia must retreat.`,
			}
		]
	})
}

// RU #9: Uninspired Tactics
E.uninspired_tactics = function() { return is_battle_defender(RUSSIA, G.current_battle) && (is_fortress_town(G.current_battle) || battle_has_defend_order(G.current_battle)) }

P.uninspired_tactics = function() {
	goto("confirm_event", {
		card: C_UNINSPIRED_TACTICS,
		inactive: "make France pay dearly for their frontal assault",
		sequence: [{
			prompt: "Increase French losses by 1.",
			log_text: "French losses +1."
		}]
	})
}

//RU #10: Scorched Earth
function has_russian_sp_adjacent(area) {
	return get_all_adjacent_areas(area).some(adj => has_russian_sp(adj))
}

P.scorched_earth = script(`
	if (get_who_has_initiative() === FRANCE) {
		call shift_initiative { in_favor_of: RUSSIA }
	} else {
		log "France does not have the initiative."
	}
	call scorched_earth_increase_devastation
	call receive_free_order { card: C_SCORCHED_EARTH, type: EVADE }
	goto event_done { card: C_SCORCHED_EARTH }
`)

P.scorched_earth_increase_devastation = {
	_begin() {
		log("Devastated")
		L.selected_areas = []
	},
	inactive: "fall back and devastate the land",
	prompt() {
		prompt_card(C_SCORCHED_EARTH, `Increase Devastation in areas with, or adjacent to Russian SPs. (${5 - L.selected_areas.length} remaining)`)
		for (let area = FIRST_AREA; area <= LAST_AREA; ++area) {
			if (
				!set_has(L.selected_areas, area)
				&& (has_russian_sp(area) || has_russian_sp_adjacent(area))
			) {
				action_area(area)
			}
		}
		button_pass()
	},
	area(area) {
		push_undo()
		logi(format_area(area))
		increase_devastation(area)
		set_add(L.selected_areas, area)

		if (L.selected_areas.length >= 5)
			end()
	},
	pass() {
		push_undo()
		end()
	}
}

// RU #11 Holy Mother Russia (must-play event): See draw_card_to_hand

// RU #12: Outflanking
// FR #6: Outflanking
// FR #17: Outflanking
E.outflanking_ru = function() { return is_battle_attacker(RUSSIA, G.current_battle) && did_attacker_attack_across_multiple_connections(G.current_battle) }
E.outflanking_fr_1 = function() { return is_battle_attacker(FRANCE, G.current_battle) && did_attacker_attack_across_multiple_connections(G.current_battle) }
E.outflanking_fr_2 = function() { return is_battle_attacker(FRANCE, G.current_battle) && did_attacker_attack_across_multiple_connections(G.current_battle) }

P.outflanking_ru = function() {
	goto("outflanking", { attacker: RUSSIA, defender: FRANCE, card: C_OUTFLANKING_RU })
}

P.outflanking_fr_1 = function() {
	if (is_battle_event_currently_active(C_POOR_COORDINATION_RU) || is_battle_event_currently_active(C_DELAYED_FORCES_RU) || is_battle_event_currently_active(C_FORTIFICATIONS))
		goto("outflanking_no_effect", { card: C_OUTFLANKING_FR_1 })
	else
		goto("outflanking", { attacker: FRANCE, defender: RUSSIA, card: C_OUTFLANKING_FR_1 })
}

P.outflanking_fr_2 = function() {
	if (is_battle_event_currently_active(C_POOR_COORDINATION_RU) || is_battle_event_currently_active(C_DELAYED_FORCES_RU) || is_battle_event_currently_active(C_FORTIFICATIONS))
		goto("outflanking_no_effect", { card: C_OUTFLANKING_FR_2 })
	else
		goto("outflanking", { attacker: FRANCE, defender: RUSSIA, card: C_OUTFLANKING_FR_2 })
}

P.outflanking = {
	_begin() {
		//L.attacker, L.defender, L.card
		G.active = L.attacker
		L.has_defender_confirmed = false
		L.designated_connection_from = -1
	},
	prompt() {
		if (!L.has_defender_confirmed) {
			if (G.active === L.attacker) {
				prompt_card(L.card, `Confirm: ${ROLES[L.defender]} will designate a connection as the main attack.`)
				button_confirm()
			} else if (L.designated_connection_from === -1) {
				prompt_card(L.card, "Designate a connection as the main attack.")
				for (let origin of get_connections_used_by_attacker(G.current_battle))
					action_connection(origin, G.current_battle)
			} else {
				V.prompt = `You designated a connection from ${format_area(L.designated_connection_from)} to ${format_area(G.current_battle)}.`
				button_confirm()
			}
		} else {
			prompt_card(L.card, "All done.")
			button_done()
		}
	},
	confirm() {
		push_undo()
		if (G.active === L.defender)
			L.has_defender_confirmed = true
		G.active = enemy(G.active)
	},
	connection(connection_id) {
		push_undo()
		L.designated_connection_from = get_other_area(connection_id, G.current_battle)
		add_battle_outflanking(G.current_battle, L.designated_connection_from)
		log(`Designated connection from ${format_area(L.designated_connection_from)} to ${format_area(G.current_battle)}.`)
	},
	done() {
		push_undo()
		end()
	}
}

P.outflanking_no_effect = {
	_begin() {
		// RU #12 Outflanking has no card that cancels it
		G.active = FRANCE
		L.cancelling_cards = [C_POOR_COORDINATION_RU, C_FORTIFICATIONS, C_DELAYED_FORCES_RU].filter(is_battle_event_currently_active)
	},
	prompt() {
		prompt_card(L.card, `No effect – ${join_array_with_and(L.cancelling_cards.map(card => format_card(card)))} has been played.`)
		button_confirm()
	},
	confirm() {
		push_undo()
		L.cancelling_cards.forEach(card => {
			if (is_battle_event_currently_active(card))
				log(`${format_card(card)}: No effect.`)
		})
		end()
	}
}

P.cancel_outflanking = function() {
	// L.card
	let outflanking
	if (L.card === C_DELAYED_FORCES_FR || L.card === C_THE_OLD_GUARD)
		outflanking = C_OUTFLANKING_RU
	else
		outflanking = is_battle_event_active(G.current_battle, C_OUTFLANKING_FR_1) ? C_OUTFLANKING_FR_1 : C_OUTFLANKING_FR_2

	goto("confirm_event", {
		card: L.card,
		inactive: `thwart the ${possessive(enemy(G.active))} flanking maneuver`,
		sequence: [{
			prompt: `Cancels the effect of ${format_card(outflanking)}.`,
			log_text: `Cancels ${format_card(outflanking)}.`
		}]
	})
}

function calculate_outflanking_strength(area) {
	let attacker = get_attacker_data(area)
	let count = 0
	for (let entry of attacker.forces) {
		if (entry.from !== get_battle_entry(area, null).outflanking)
			for (let type of entry.troops)
				if (type > 0) count += type
	}
	return count
}

// RU #13: Garrison Troops
function is_enemy_controlled(who, area) {
	return ((who === RUSSIA) && (is_fr_controlled(area))) || ((who === FRANCE) && (is_ru_controlled(area)))
}

function does_path_exist(who, a, b, visited = []) {
	if (a === b) return true
	if (is_enemy_controlled(who, a)) return false

	for (let s of get_all_adjacent_areas(a)) {
		if (!set_has(visited, s)) {
			set_add(visited, s)
			if (does_path_exist(who, s, b, visited)) return true
		}
	}

	return false
}

function get_locations_with_leader(who) {
	let locations =  G.leaders.slice(get_first_leader(who), get_last_leader(who) + 1)
	let result = []
	for (let s of locations) {
		set_add(result, s)
	}
	return result
}

P.garrison_troops = {
	_begin() {
		L.units_moved = 0
		L.areas = get_areas_with_sps(RUSSIA).filter(area => !has_friendly_leader(RUSSIA, area) && is_area_in_supply(RUSSIA, area))
		L.selected_area = -1
		L.selected_type = -1
	},
	prompt() {
		if (L.units_moved < 5) {
			if (L.selected_type === -1) {
				prompt_card(C_GARRISON_TROOPS, `Select an SP to move.`)
				for (let area of L.areas) {
					for (let type of get_troop_types_at_area(G.active, area))
						action_troop_alt(type, area)
				}
				button_pass()
			} else {
				V.prompt = `Select a destination for the ${get_troop_type_name(L.selected_type)} SP.`
				for (let area of get_locations_with_leader(RUSSIA)) {
					if (does_path_exist(RUSSIA, L.selected_area, area))
						action_area(area)
				}
				// A human can undo and select another area
				if (globalThis.RTT_FUZZER)
					button_pass()
			}
		} else {
			prompt_card(C_GARRISON_TROOPS, "All done.")
			button_confirm()
		}
	},
	troop(entry) {
		push_undo()
		L.selected_area = decode_troop_action_area(entry)
		L.selected_type = decode_troop_action_type(entry)
	},
	area(area) {
		push_undo()
		move_troop(G.active, L.selected_area, area, L.selected_type, 1)

		log(`Moved from ${format_area(L.selected_area)}`)
		logi(`1 ${get_troop_type_name(L.selected_type)}`)
		logi(`to ${format_area(area)}`)

		L.selected_area = -1
		L.selected_type = -1
		++L.units_moved
	},
	confirm() { end() },
	pass() { end() }
}

// RU #14: Extreme Weather (must-play event) -- See draw_card_to_hand

// RU #15: Pride and Hesitation
E.pride_and_hesitation = function() { return is_fr_controlled(S_MOSCOW) }

P.pride_and_hesitation = function() {
	if (!L.has_shifted_initiative) {
		L.has_shifted_initiative = true
		call("shift_initiative", { in_favor_of: RUSSIA })
	} else {
		goto("confirm_event", {
			card: C_PRIDE_AND_HESITATION,
			inactive: `exploit ${format_leader(L_NAPOLEON)}'s hubris`,
			sequence: [
				{
					prompt: "This turn, Russia +1 VP if any French leaders leave Moscow.",
					log_text: "Russia +1 VP if any French leaders leave Moscow this turn."
				}
			],
			persistent: true
		})
	}
}

// RU #16: Kutuzov Appointed
E.kutuzov_appointed = function() { return get_current_month() >= AUG }

P.kutuzov_appointed = script(`
	call place_kutuzov
	call receive_free_order { card: C_KUTUZOV_APPOINTED, type: RALLY }
	if (is_russian_disorganization_and_confusion()) {
		call end_russian_disorganization_and_confusion
	}
`)

P.place_kutuzov = {
	_begin() {
		L.areas = find_areas_with_most_ru_sps()
	},
	inactive: "appoint Mikhail Kutuzov",
	prompt() {
		prompt_card(C_KUTUZOV_APPOINTED, `Place ${format_leader(L_KUTUZOV)}, 1 Infantry, and 1 Cossack in the area with the most Russian SPs. (${join_array_with_or(L.areas.map(area => get_area_name(area)))})`)
		L.areas.forEach(action_area)
	},
	area(area) {
		push_undo()
		move_leader(L_KUTUZOV, area)
		add_troop(RUSSIA, area, FRESH_INFANTRY, 1)
		add_troop(RUSSIA, area, FRESH_COSSACK, 1)

		log(`Placed at ${format_area(area)}`)
		logi(format_leader(L_KUTUZOV))
		logi(`1 Infantry`)
		logi(`1 Cossack`)

		end()
	}
}

P.end_russian_disorganization_and_confusion = {
	_begin() {
		L.order = G.orders.findIndex(location => location === OUT_OF_PLAY)
	},
	inactive: "rally the troops",
	prompt() {
		V.prompt = `End of Russian Disorganization & Confusion: Add the removed Rally order to your pool.`
		button_confirm()
		action_order(L.order)
	},
	confirm() { this.order(L.order) },
	order(order) {
		push_undo()
		G.orders[order] = POOL
		log(`End of Russian Disorganization & Confusion.`)
		end()
	}
}

// RU #17: The Finland Corps
E.the_finland_corps = function() { return get_current_month() >= AUG }

function get_finland_corps_destinations() {
	let areas = [S_RIGA, S_LIVONIA, S_PSKOV].filter(area => is_ru_controlled(area))
	for (let area of [S_RIGA, S_LIVONIA, S_PSKOV]) {
		for (let adj of get_all_adjacent_areas(area)) {
			if (is_ru_controlled(area) && !set_has(areas, adj))
				set_add(areas, adj)
		}
	}
	return areas
}

P.the_finland_corps = {
	_begin() {
		log("Placed")
		L.areas = get_finland_corps_destinations()
		L.sps_to_place = 3
	},
	inactive: "deploy Steinheil's Finland Corps",
	prompt() {
		// Always guaranteed Livonia and Pskov (Russian off-map areas)
		prompt_card(C_THE_FINLAND_CORPS, `Place ${L.sps_to_place} Infantry among ${join_array_with_or(L.areas.map(format_area))}.`)
		L.areas.forEach(action_area)
	},
	area(area) {
		push_undo()
		add_troop(RUSSIA, area, FRESH_INFANTRY, 1)
		logi(`${format_area(area)}`)
		logii(`1 Infantry`)
		if (--L.sps_to_place === 0)
			end()
	}
}

// RU #18: Treaty of Bucharest
E.treaty_of_bucharest = function() { return get_current_month() >= AUG }

P.treaty_of_bucharest = {
	_begin() {
		log("Placed")
		L.has_placed_chichagov = false
		L.sps_to_place = 3
		L.sp_log = []
	},
	inactive: "transfer Chichagov from Bessarabia",
	prompt() {
		if (!L.has_placed_chichagov)
			prompt_card(C_TREATY_OF_BUCHAREST, `Place Chichagov at ${format_area(S_UKRAINE)} or ${format_area(S_MOLDAVIA)}.`)
		else
			prompt_card(C_TREATY_OF_BUCHAREST, `Select where to place Infantry SPs — ${L.sps_to_place} remaining.`)

		action_area(S_UKRAINE)
		action_area(S_MOLDAVIA)
	},
	area(area) {
		push_undo()
		if (!L.has_placed_chichagov) {
			move_leader(L_CHICHAGOV, area)
			L.has_placed_chichagov = true
			logi(`${format_area(area)}`)
			logii(format_leader(L_CHICHAGOV))
		} else {
			add_troop(RUSSIA, area, FRESH_INFANTRY, 1)
			if (!map_has(L.sp_log, area))
				map_set(L.sp_log, area, 1)
			else
				map_increment(L.sp_log, area)
			if (--L.sps_to_place === 0) {
				map_for_each(L.sp_log, (loc, num) => {
					logi(format_area(loc))
					logii(`${num} Infantry`)
				})
				end()
			}
		}
	}
}

// RU #19: The Czar Leaves the Army
E.the_czar_leaves_the_army = function() { return is_leader_on_map(L_ALEXANDER) }

P.the_czar_leaves_the_army = script(`
	call send_alexander_home
	call draw_card_to_hand
	goto event_done { card: C_THE_CZAR_LEAVES_THE_ARMY }
`)

P.send_alexander_home = {
	inactive: "send Alexander back to St. Petersburg",
	prompt() {
		prompt_card(C_THE_CZAR_LEAVES_THE_ARMY, "Remove Alexander from play at no cost.")
		action_leader(L_ALEXANDER)
	},
	leader(_) {
		push_undo()
		log(`Removed from ${format_area(get_leader_location(L_ALEXANDER))}`)
		move_leader(L_ALEXANDER, POOL)
		logi(format_leader(L_ALEXANDER))
		end()
	}
}

// RU #20: Flying Columns
P.may_play_flying_columns = function() {
	goto("may_play_event", { event: C_FLYING_COLUMNS })
}

function has_cossack_sp(area) {
	if (!has_troop(area))
		return false
	return get_area_troop_set(area).some(entry => is_cossack(decode_troop_entry_type(entry)))
}

P.flying_columns = script(`
	call shift_initiative { in_favor_of: RUSSIA }
	call place_orders_of_type { card: C_FLYING_COLUMNS, type: COSSACK_RAID }
`)

// RU #21: Overstretched Logistics
P.overstretched_logistics = script(`
	call overstretched_logistics_confirm
	set G.active FRANCE
	call overstretched_logistics_choose
	call event_done { card: C_OVERSTRETCHED_LOGISTICS }
	set G.active RUSSIA
	goto event_done { card: C_OVERSTRETCHED_LOGISTICS }
`)

P.overstretched_logistics_confirm = function() {
	goto("confirm_event", {
		card: C_OVERSTRETCHED_LOGISTICS,
		inactive: `confirm play of ${format_card(C_OVERSTRETCHED_LOGISTICS)}`,
		sequence: [
			{ prompt: "France must either remove a depot marker or add 1 to the distance to the nearest Depot marker when checking for Attrition. Confirm?" }
		],
	})
}

P.overstretched_logistics_choose = {
	inactive: "contend with their poor logistics",
	prompt() {
		if (has_depot_on_map(FRANCE)) {
			prompt_card(C_OVERSTRETCHED_LOGISTICS, `Remove a depot marker or add 1 to the distance to the nearest Depot marker when checking for Attrition.`)
			for (let depot = get_first_depot(FRANCE); depot <= get_last_depot(FRANCE); ++depot) {
				if (is_depot_on_map(depot))
					action_depot(depot)
			}
		} else {
			prompt_card(C_OVERSTRETCHED_LOGISTICS, `Add 1 to the distance to the nearest Depot marker when checking for Attrition.`)
		}
		button("add_1_to_attrition_distance")
	},
	add_1_to_attrition_distance() {
		push_undo()
		log(`France adds 1 to the distance to the nearest Depot marker when checking for Attrition.`)
		add_persistent_event(C_OVERSTRETCHED_LOGISTICS)
		end()
	},
	depot(depot) {
		push_undo()
		remove_depot(depot, get_depot_location(depot))
		end()
	},
}

// RU #22: City Ablaze!
P.russia_may_play_city_ablaze = {
	//L.area
	prompt() {
		V.prompt = `Russia may play ${format_card(C_CITY_ABLAZE)} (cannot be undone)`
		button_confirm()
	},
	confirm() {
		clear_undo()
		G.active = RUSSIA
		goto("may_play_city_ablaze", { area: L.area })
	}
}

P.may_play_city_ablaze = {
	//L.area
	inactive: "to play CN22",
	prompt() {
		if (hand_has(RUSSIA, C_CITY_ABLAZE)) {
			V.prompt = `You may play ${format_card(C_CITY_ABLAZE)}.`
			action_card(C_CITY_ABLAZE)
		} else {
			V.prompt = `You do not have ${format_card(C_CITY_ABLAZE)}.`
			button_pass()
		}
	},
	card(card) {
		push_undo()
		goto("city_ablaze", { card, area: L.area})
	},
	pass() {
		if (!has_friendly_troop(RUSSIA, L.area) && has_friendly_depot(RUSSIA, L.area)) {
			goto("remove_depot", {area: L.area})
		} else {
			G.active = FRANCE
			end()
		}
	}
}

P.city_ablaze = {
	_begin() {
		card_box_begin(C_CITY_ABLAZE)
		L.step = -1
		call("draw_card_to_hand")
	},
	prompt() {
		switch(L.step) {
		case 0:
			prompt_card(C_CITY_ABLAZE, `Increase Devastation at ${format_area(L.area)} to 3.`)
			action_area(L.area)
			return
		case 1:
			prompt_card(C_CITY_ABLAZE, `Russia +1 VP.`)
			action_vp_marker()
			return
		case 2:
			if (get_who_has_initiative() === FRANCE) {
				prompt_card(C_CITY_ABLAZE, "Shift Initiative 1 in Russia's favor.")
				action_initiative_marker()
			} else {
				prompt_card(C_CITY_ABLAZE, "France does not have the initiative.")
				button_pass()
			}
			return
		default:
			prompt_card(C_CITY_ABLAZE, "All done.")
			button_done()
		}
	},
	_resume() {
		++L.step
	},
	area(area) {
		push_undo()
		set_devastation(area, 3)
		log(`Devastation at ${format_area(area)} set to 3.`)
		++L.step
	},
	vp() {
		push_undo()
		increase_vp(RUSSIA)
		++L.step
	},
	initiative() {
		push_undo()
		shift_initiative(RUSSIA)
		++L.step
	},
	pass() {
		push_undo()
		log("France does not have the initiative.")
		++L.step
	},
	done() {
		card_box_end()
		discard_or_remove_card(C_CITY_ABLAZE)
		if (!has_friendly_troop(RUSSIA, L.area) && has_friendly_depot(RUSSIA, L.area)) {
			goto("remove_depot", {area: L.area})
		} else {
			G.active = FRANCE
			end()
		}
	}
}

// RU #23: Stubborn Rearguard
// FR #30: Stubborn Rearguard
P.may_play_stubborn_rearguard = {
	_begin() {
		L.card = get_battle_loser(G.current_battle) === RUSSIA ? C_STUBBORN_REARGUARD_RU : C_STUBBORN_REARGUARD_FR
	},
	prompt() {
		if (hand_has(G.active, L.card)) {
			V.prompt = `You may play ${format_card(L.card)} to cancel any losses from pursuit after this battle.`
			action_card(L.card)
		} else {
			V.prompt = `You do not have ${format_card(L.card)} in hand.`
			button_pass()
		}
	},
	card(card) {
		push_undo()
		goto("stubborn_rearguard", { card })
	},
	pass() {
		goto("pursuit", { winner: enemy(G.active) })
	}
}

P.stubborn_rearguard = {
	prompt() {
		prompt_card(L.card, "Cancel any losses from pursuit in this battle. (cannot be undone)")
		button_confirm()
	},
	confirm() {
		// TO CHECK: Do we need to go to pursuit at this point since all losses are canceled?
		// I skip pursuit for now for simplicity
		goto("end_battle", { drawn_battle: false } )
	}
}

// RU #24: New Posting
function has_friendly_depot(who, area) {
	return get_depots(who).some(location => location === area)
}

function is_area_in_supply(who, area) {
	update_supply()
	return get_supply_status(who, area) <= MAX_SUPPLY_DISTANCE
}

P.new_posting = {
	_begin() {
		L.leaders_not_relocated = [L_ALEXANDER, L_KUTUZOV, L_DE_TOLLY, L_BAGRATION, L_TORMASOV, L_WITTGENSTEIN, L_CHICHAGOV, L_PLATOV].filter(leader => ((get_leader_location(leader) !== POOL) && (get_leader_location(leader) !== OUT_OF_PLAY)))
		L.selected_leader = -1
	},
	prompt() {
		if (L.leaders_not_relocated.length === 0) {
			prompt_card(C_NEW_POSTING, "All done.")
			button_done()
		}
		else if (L.selected_leader === -1) {
			prompt_card(C_NEW_POSTING, "You may relocate as many leaders as you wish.")
			for (let leader of L.leaders_not_relocated) {
				if (is_area_in_supply(RUSSIA, get_leader_location(leader))) {
					action_leader(leader)
				}
			}
			button_pass()
		}
		else if (L.selected_leader === L_ALEXANDER) { // MUST, if at all possible, stack and move with another leader.
			prompt_card(C_NEW_POSTING, `Relocate ${format_leader(L_ALEXANDER)} to any in-supply area with another Russian leader.`)
			for (let area = FIRST_AREA; area <= LAST_AREA; ++area) {
				if (is_area_in_supply(RUSSIA, area) && has_friendly_leader(RUSSIA, area) && (area !== get_leader_location(L.selected_leader) && (has_russian_sp(area)))) {
					action_area(area)
				}
			}
		}
		else if ((get_leader_location(L.selected_leader) === get_leader_location(L_ALEXANDER)) && (get_leaders_at_area(RUSSIA, get_leader_location(L.selected_leader)).length === 2)) {
			prompt_card(C_NEW_POSTING, `May not leave Alexander alone at ${format_area(get_leader_location(L.selected_leader))}.`)
			button_confirm() //placeholder for now so that fuzzer doesn't throw
		}
		else {
			prompt_card(C_NEW_POSTING, `Relocate ${format_leader(L.selected_leader)} to any in-supply space.`)
			for (let area = FIRST_AREA; area <= LAST_AREA; ++area) {
				if (is_area_in_supply(RUSSIA, area) && (area !== get_leader_location(L.selected_leader) && (has_russian_sp(area)))) {
					action_area(area)
				}
			}
		}
	},
	leader(leader) {
		push_undo()
		L.selected_leader = leader
	},
	area(area) {
		push_undo()
		log(`Moved to ${format_area(area)}`)
		move_leader(L.selected_leader, area)
		logi(format_leader(L.selected_leader))
		set_delete(L.leaders_not_relocated, L.selected_leader)
		L.selected_leader = -1
	},
	pass() {
		push_undo()
		end()
	},
	done() {
		push_undo()
		end()
	},
	confirm() {
		pop_undo()
	}
}

// RU #25 Exhausting March
// RU #26 Exhausting March
function count_moving_sps() {
	let count = 0
	for (let type = 0; type < G.move.sps.length; ++type)
		count += G.move.sps[type]
	return count
}

function count_fresh_moving_sps() {
	let count = 0
	for (let type = 0; type < G.move.sps.length; ++type) {
		if (is_troop_type_fresh(type))
			count += G.move.sps[type]
	}
	return count
}

function count_exhausted_moving_sps() {
	let count = 0
	for (let type = 0; type < G.move.sps.length; ++type) {
		if (is_troop_type_exhausted(type))
			count += G.move.sps[type]
	}
	return count
}

function is_track_connection(a, b) {
	return get_adjacent_areas_by_track(a).includes(b)
}

P.may_play_exhausting_march = {
	prompt() {
		if (hand_has(G.active, C_EXHAUSTING_MARCH_1)) {
			V.prompt = `You may play ${format_card(C_EXHAUSTING_MARCH_1)} (cannot be undone).`
			action_card(C_EXHAUSTING_MARCH_1)
		} else if (hand_has(G.active, C_EXHAUSTING_MARCH_2)) {
			V.prompt = `You may play ${format_card(C_EXHAUSTING_MARCH_2)} (cannot be undone).`
			action_card(C_EXHAUSTING_MARCH_2)
		} else {
			V.prompt = `You do not have ${format_card(C_EXHAUSTING_MARCH_1)}.`
			button_pass()
		}
		button_pass()
	},
	card(card) {
		clear_undo() // Since we reveal the size of the army in the subsequent step
		goto("exhausting_march", { card })
	},
	pass() {
		push_undo()
		if (has_executable_order(G.active, FORCED_MARCH)) {
			goto("execute_next_order", { type: FORCED_MARCH })
		} else if (has_executable_order(enemy(G.active), FORCED_MARCH)) {
			G.active = enemy(G.active)
			goto("execute_next_order", { type: FORCED_MARCH })
		} else {
			log()
			end()
		}
	}
}

P.exhausting_march = {
	_begin() {
		// L.card
		card_box_begin(L.card)

		L.sp_losses = Math.ceil(count_moving_sps() / 5)
		L.track_losses = 0
		for (let i = 0; i < G.move.path.length - 1; ++i)
			if (is_track_connection(G.move.path[i], G.move.path[i + 1]))
				++L.track_losses

		L.has_assigned = (L.sp_losses === 0 && L.track_losses === 0)
	},
	prompt() {
		if (!L.has_assigned) {
			prompt_card(L.card, `France must take ${L.sp_losses + L.track_losses} attrition losses.`)
			button_confirm()
		} else {
			prompt_card(L.card, `All done.`)
			button_done()
		}
	},
	confirm() {
		push_undo()
		log(`France must take ${L.sp_losses + L.track_losses} attrition losses.`)
		logi(`+${L.sp_losses} SPs`)
		logi(`+${L.track_losses} Tracks`)

		G.active = FRANCE
		call("exhausting_march_assign_attrition_losses", { losses: L.sp_losses + L.track_losses })
	},
	_resume() { L.has_assigned = true },
	done() {
		push_undo()
		if (L.sp_losses + L.track_losses === 0)
			log(`No losses to assign.`)
		if (has_executable_order(RUSSIA, FORCED_MARCH)) {
			G.active = RUSSIA
			goto("execute_next_order", { type: FORCED_MARCH })
		} else if (has_executable_order(FRANCE, FORCED_MARCH)) {
			G.active = FRANCE
			goto("execute_next_order", { type: FORCED_MARCH })
		} else {
			G.active = RUSSIA
			log()
			end()
		}
	},
	_end() {
		discard_or_remove_card(L.card)
		card_box_end()
	}
}

P.exhausting_march_assign_attrition_losses = {
	// L.losses
	prompt() {
		V.prompt = `Assign attrition losses in the moving force — ${L.losses} remaining.`
		button("exhaust", count_fresh_moving_sps() > 0)
		button("eliminate_2", count_exhausted_moving_sps() >= 2 || (count_exhausted_moving_sps() === 1 && count_fresh_moving_sps() === 0))
		if (count_moving_sps() === 0)
			button_pass()
	},
	exhaust() {
		push_undo()
		call_or_goto(--L.losses > 0, "exhausting_march_exhaust")
	},
	eliminate_2() {
		push_undo()
		call_or_goto(--L.losses > 0, "exhausting_march_eliminate")
	},
	pass() {
		push_undo()
		end()
	}
}

P.exhausting_march_exhaust = {
	prompt() {
		V.prompt = `Exhaust a fresh SP at ${format_area(G.move.path[G.move.path.length - 1])}.`
		for (let type = 0; type < G.move.sps.length; ++type) {
			if (is_troop_type_fresh(type) && G.move.sps[type] > 0)
				action_troop_alt(type, G.move.path[G.move.path.length - 1], HALF_STRENGTH, G.move.path[G.move.path.length - 2])
		}
	},
	troop(entry) {
		push_undo()
		let type = decode_troop_action_type(entry)
		let area = decode_troop_action_area(entry)
		let strength = decode_troop_action_strength(entry)
		let from = decode_troop_action_from(entry)

		exhaust_sp(G.active, area, type, 1, true, true, strength, from, has_battle(area))

		log("Exhausted")
		logi(`1 ${get_troop_type_name(type)}`)

		end()
	}
}

P.exhausting_march_eliminate = {
	_begin() {
		L.losses_remaining = Math.min(2, count_exhausted_moving_sps())
	},
	prompt() {
		V.prompt = `Eliminate an exhausted SP at ${format_area(G.move.path[G.move.path.length - 1])} — ${L.losses_remaining} remaining.`
		for (let type = 0; type < G.move.sps.length; ++type) {
			if (is_troop_type_exhausted(type) && G.move.sps[type] > 0)
				action_troop_alt(type, G.move.path[G.move.path.length - 1], HALF_STRENGTH, G.move.path[G.move.path.length - 2])
		}
	},
	troop(entry) {
		push_undo()
		let type = decode_troop_action_type(entry)
		let area = decode_troop_action_area(entry)
		let strength = decode_troop_action_strength(entry)
		let from = decode_troop_action_from(entry)

		log("Eliminated")
		logi(`1 ${get_troop_type_name(type)}`)

		eliminate_sp(G.active, area, type, 1, true, true, strength, from, has_battle(area))

		if (--L.losses_remaining === 0)
			end()
	}
}

// RU #27: Unexpected Retreat
P.unexpected_retreat = {
	prompt() {
		V.prompt = `Confirm play of ${format_card(C_UNEXPECTED_RETREAT)}? (cannot be undone).`
		button_confirm()
	},
	confirm() {
		clear_undo()
		log(`All Au. SPs immediately Evade from battle.`)
		add_persistent_event(C_UNEXPECTED_RETREAT)
		G.active = FRANCE
		goto("unexpected_retreat_evade")
	}
}

P.unexpected_retreat_evade = {
	_begin() {
		L.areas = []
		for (let area of map_keys(G.battles))
			if (has_troop(area) && has_austrian_sp(area) && has_russian_sp(area))
				set_add(L.areas, area)
		L.did_evade = false
	},
	prompt() {
		if (L.areas.length === 0) {
			prompt_card(C_UNEXPECTED_RETREAT, `All done.`)
			button_done()
		} else {
			prompt_card(C_UNEXPECTED_RETREAT, `Select next area from which Austrian SPs should evade. (${join_array_with_or(L.areas.map(format_area))})`)
			L.areas.forEach(action_area)
		}
	},
	area(area) {
		push_undo()
		if (!L.did_evade) {
			L.did_evade = true
			log_box_end()
		}
		set_delete(L.areas, area)
		log_h4(`${format_area(area)}`, G.active)
		log()
		log(`${format_card(C_UNEXPECTED_RETREAT)}`)
		call("execute_evade", { area, unexpected_retreat: true })
	},
	done() {
		if (!L.did_evade)
			log(`No battles with Au. SPs.`)
		G.active = RUSSIA
		if (is_event_active(C_UNEXPECTED_RETREAT))
			map_delete(G.persistent_events, C_UNEXPECTED_RETREAT)
		end()
	}
}

// RU #28: Poor Coordination
function count_num_track_connections_used_to_enter_battle(who, area) {
	return array_count(get_connections_used_in_battle(who, area), origin => get_adjacent_areas_by_track(area).includes(origin))
}

P.poor_coordination_ru = function() {
	L.num_track_connections_used = count_num_track_connections_used_to_enter_battle(FRANCE, G.current_battle)
	goto("confirm_event", {
		card: C_POOR_COORDINATION_RU,
		inactive: `disrupt French communications`,
		sequence: [
			{
				prompt:  `Reduce French combat value by ${3 * L.num_track_connections_used} for ${L.num_track_connections_used} Track connections used to enter the battle.`,
				log_text: `French combat value -${3 * L.num_track_connections_used}.`
			}
		]
	})
}

//RU #29: Cavalry Screening
P.cavalry_screening = script(`
	call place_orders_of_type { card: C_CAVALRY_SCREENING, type: EVADE }
	goto event_done { card: C_CAVALRY_SCREENING }
`)

// RU #30: Devastated Landscape
P.devastated_landscape = script(`
	call confirm_devastated_landscape
	set G.active [RUSSIA, FRANCE]
	call execute_devastated_landscape
	set G.active RUSSIA
`)

P.confirm_devastated_landscape = function() {
	goto("confirm_event", {
		card: C_DEVASTATED_LANDSCAPE,
		inactive: `leave behind barren lands`,
		sequence: [ { prompt: "Confirm event play? (cannot be undone)" } ]
	})
}

P.execute_devastated_landscape = {
	_begin() {
		L.forage_orders = [get_placed_orders_of_type(FORAGE).filter(order => get_order_owner(order) === RUSSIA), get_placed_orders_of_type(FORAGE).filter(order => get_order_owner(order) === FRANCE)]
		L.has_confirmed_devastation = [false, false]
		L.removed_orders = [[], []]
	},
	prompt() {
		if (L.forage_orders[R].length > 0) {
			if (L.forage_orders[R].length > 0) {
				prompt_card(C_DEVASTATED_LANDSCAPE, `Remove Forage orders from ${join_array_with_and(L.forage_orders[R].map(order => format_area(get_order_location(order))))}.`)
				for (let order of L.forage_orders[R])
					action_order(order)
			}
		} else if (!L.has_confirmed_devastation[R]) {
			prompt_card(C_DEVASTATED_LANDSCAPE, `The effect of all Devastation markers is doubled this turn.`)
			button_next()
		} else {
			prompt_card(C_DEVASTATED_LANDSCAPE, `All done.`)
			button_confirm()
		}
		button_undo(L.removed_orders[R].length > 0 || L.has_confirmed_devastation[R])
	},
	order(order) {
		L.removed_orders[R].push({ order, area: get_order_location(order) })
		remove_order(order)
		set_delete(L.forage_orders[R], order)
	},
	next() {
		L.has_confirmed_devastation[R] = true
	},
	undo() {
		if (L.has_confirmed_devastation[R]) {
			L.has_confirmed_devastation[R] = false
		} else {
			let previously_removed = L.removed_orders[R].pop()
			G.orders[previously_removed.order] = previously_removed.area
			set_add(L.forage_orders[R], previously_removed.order)
		}
	},
	confirm() {
		set_delete(G.active, R)
		if (G.active.length === 0)
			end()
	},
	_end() {
		log(`Removed Forage orders`)
		for (let who = RUSSIA; who <= FRANCE; ++who) {
			logi(`${ROLES[who]}`)
			if (L.removed_orders[who].length === 0) {
				logii("Nothing")
			} else {
				for (let entry of L.removed_orders[who])
					logii(format_area(entry.area))
			}
		}
		log(`The effect of Devastation markers is doubled this turn.`)

		add_persistent_event(C_DEVASTATED_LANDSCAPE)
	}
}

// RU #31: Stoic Infantry
E.stoic_infantry = function() { return is_battle_defender(RUSSIA, G.current_battle) && (count_num_infantry(RUSSIA, G.current_battle) > 0) }

P.stoic_infantry = {
	prompt() {
		prompt_card(C_STOIC_INFANTRY, "The first 2 Russian Infantry SPs to become exhausted this battle immediately rally again.")
		button_confirm()
	},
	confirm() {
		push_undo()
		log("The first 2 Russian Infantry SPs to become exhausted this battle immediately rally again.")
		add_persistent_event(C_STOIC_INFANTRY, { num_exhausted_infantry: 0 }) // A 'persistent event' for tracking the number of exhausted infantry, will be deleted at the end of the battle
		end()
	}
}

// RU #32: The Artillery Corps
E.the_artillery_corps = function() { return has_leader_in_battle(RUSSIA, G.current_battle) }

P.the_artillery_corps = function() {
	if (is_battle_event_currently_active(C_INFANTRY_SQUARES_FR)) {
		goto("confirm_event", {
			card: C_THE_ARTILLERY_CORPS,
			inactive: `decisively shell the grouped French`,
			sequence: [{
				prompt: `French losses are increased by 2 (${format_card(C_INFANTRY_SQUARES_FR)} was played).`,
				log_text: `${format_card(C_INFANTRY_SQUARES_FR)} — French losses +2.`
			}]
		})
	} else {
		goto("confirm_event", {
			card: C_THE_ARTILLERY_CORPS,
			inactive: `launch a cannonade`,
			sequence: [{
				prompt: `French losses are increased by 1.`,
				log_text: `French losses +1.`
			}]
		})
	}
}

// RU #33: Fortifications
E.fortifications = function() { return is_battle_defender(RUSSIA, G.current_battle) && has_leader_in_battle(RUSSIA, G.current_battle) }

P.fortifications = script(`
	eval {
		L.is_double_defense = has_order_of_type(G.active, DEFEND, G.current_battle)
		add_persistent_event(C_FORTIFICATIONS, { double_defense: L.is_double_defense })
	}
	if (L.is_double_defense) {
		call fortifications_double_defense
	} else {
		call fortifications_place_defend_order
	}
	if (is_battle_event_active(G.current_battle, C_OUTFLANKING_FR_1) || is_battle_event_active(G.current_battle, C_OUTFLANKING_FR_2)) {
		goto cancel_outflanking_fr { card: C_FORTIFICATIONS }
	}
`)

P.fortifications_double_defense = function() {
	goto("confirm_event", {
		card: C_FORTIFICATIONS,
		inactive: `fiercely defend their field fortifications`,
		sequence: [{
			prompt: `Doubles effect of existing defend order at ${format_area(G.current_battle)}.`,
			log_text: `Doubles effect of existing Defend order.`
		}]
	})
}

P.fortifications_place_defend_order = {
	inactive: `construct field fortifications`,
	prompt() {
		if (has_order_of_type(G.active, DEFEND, POOL)) {
			V.prompt = `Place a Defend order at ${format_area(G.current_battle)}.`
			action_area(G.current_battle)
			get_orders_at_area(G.active, POOL).filter(order => get_order_type(order) === DEFEND).forEach(action_order)
		} else {
			V.prompt = `No Defend orders in pool to place.`
			button_confirm()
		}
	},
	area(area) {
		push_undo()
		add_order_of_type_from_pool(G.active, DEFEND, area)
		this.log_placed_order()
		end()
	},
	order(order) {
		push_undo()
		place_order(order, G.current_battle)
		this.log_placed_order()
		end()
	},
	log_placed_order() {
		log(`Placed at ${format_area(G.current_battle)}`)
		logi(`Defend order`)
	},
	confirm() {
		push_undo()
		end()
	},
}

// RU #34: Platov's Cossacks
E.platovs_cossacks = function() { return is_leader_in_battle(L_PLATOV, G.current_battle) }

P.platovs_cossacks = function() {
	goto("confirm_event", {
		card: C_PLATOVS_COSSACKS,
		inactive: `fight with Platov's fierce Cossacks`,
		sequence: [
			{
				prompt: `Cossack SPs fight at X1 this battle.`,
				log_text: `Cossack SPs fight X1.`
			},
			{
				prompt: `The French combat value is decreased by the number of fresh Cossacks present.`,
				log_text: "French combat value is decreased by the number of fresh Cossack SPs present."
			}
		]
	})
}

// RU #35: Fickle Habsburgs
E.fickle_habsburgs = function() { return is_leader_in_battle(L_SCHWARZENBERG, G.current_battle) }

P.fickle_habsburgs = function() {
	goto("confirm_event", {
		card: C_FICKLE_HABSBURGS,
		inactive: `fight an indecisive battle against the fickle Austrians`,
		sequence: [
			{
				prompt: `Losses on both sides are reduced by 1.`,
				log_text: `Both sides' losses -1`,
			},
			{
				prompt: `Russia wins if the battle is tied.`,
				log_text: `Russia wins a tied battle.`,
			}
		]
	})
}

// RU #36: Infantry Squares
// FR #16 Infantry Squares
function has_cavalry_sp(who, area) {
	return has_sp_of_type(who, FRESH_CAVALRY, area) || has_sp_of_type(who, EXHAUSTED_CAVALRY, area)
}

E.infantry_squares_ru = function() { return count_num_infantry(RUSSIA, G.current_battle) >= 4 }
E.infantry_squares_fr = function() { return (count_num_infantry(FRANCE, G.current_battle) + count_num_guard(FRANCE, G.current_battle)) >= 2 }

P.infantry_squares = function() {
	let card = G.active === RUSSIA ? C_INFANTRY_SQUARES_RU : C_INFANTRY_SQUARES_FR
	goto("confirm_event", {
		card,
		inactive: `organize its infantry in square formation`,
		sequence: [
			{
				prompt: `${possessive(enemy(G.active))} Cavalry SPs fight at X0 this battle.`,
				log_text: `${possessive(enemy(G.active))} Cavalry SPs fight at X0.`
			},
			{
				pred: has_cavalry_sp(enemy(G.active), G.current_battle),
				prompt: `The first ${possessive(enemy(G.active))} loss in this battle must be a Cavalry SP.`,
				log_text: `The first ${possessive(enemy(G.active))} loss in this battle must be a Cavalry SP.`,
			}
		]
	})
}

// RU #37: Enveloping Moves
E.enveloping_moves = function() { return is_battle_attacker(RUSSIA, G.current_battle) && has_leader_in_battle(RUSSIA, G.current_battle) }

P.enveloping_moves = function() {
	goto("confirm_event", {
		card: C_ENVELOPING_MOVES,
		inactive: `launch a massed assault on French positions`,
		sequence: [{
			prompt: "If more Russian than French fresh SPs are present after battle, the battle is considered a draw that is won by Russia.",
			log_text: "If more Russian than French fresh SPs are present after battle, the battle is considered a draw that is won by Russia."
		}]
	})
}

// RU #38: Konstantine's Corps
E.konstantines_corps = function() { return has_leader_in_battle(RUSSIA, G.current_battle) }

P.konstantines_corps = function() {
	goto("confirm_event", {
		card: C_KONSTANTINES_CORPS,
		inactive: `commit the elite V corps`,
		sequence: [
			{
				prompt: `Up to 3 Russian Infantry SPs fight at X2 this battle.`,
				log_text: `Up to 3 Russian Infantry SPs fight at X2.`
			},
			{
				prompt: `Draw an additional card to hand at the end of the battle if you win.`,
				log_text: "Russia draws an additional card to their hand if they win the battle."
			}
		]
	})
}

// RU #39: Cavalry Charge
E.cavalry_charge_ru = function() { return has_leader_in_battle(RUSSIA, G.current_battle) }

P.cavalry_charge_ru = function() {
	goto("confirm_event", {
		card: C_CAVALRY_CHARGE_RU,
		inactive: `launch a cavalry charge`,
		sequence: [
			{
				prompt: `Up to 2 Russian Cavalry SPs fight at X2 this battle.`,
				log_text: `Up to 2 Russian Cavalry SPs fight at X2.`
			},
			{
				prompt: `Draw an additional card to hand at the end of the battle if you win.`,
				log_text: "Russia draws an additional card to their hand if they win the battle."
			}
		]
	})
}

// RU #40: Delayed Forces
// FR #32: Delayed Forces
E.delayed_forces_ru = function() { return is_battle_defender(RUSSIA, G.current_battle) }
E.delayed_forces_fr = function() {
	return (is_battle_attacker(RUSSIA, G.current_battle) && did_attacker_attack_across_multiple_connections(G.current_battle)) ||
		(is_battle_defender(RUSSIA, G.current_battle) && (count_num_defender_connections(G.current_battle) > 1))
}

P.delayed_forces_ru = function() { goto("delayed_forces", { card: C_DELAYED_FORCES_RU }) }
P.delayed_forces_fr = function() { goto("delayed_forces", { card: C_DELAYED_FORCES_FR }) }

P.delayed_forces = script(`
	call delayed_forces_acknowledge { card: L.card }
	set G.active (1 - G.active)
	call delayed_forces_designate { card: L.card }
	set G.active (1 - G.active)
	call delayed_forces_confirm { card: L.card, designated_connection_from: L.$ }
	if (is_outflanking_currently_active(enemy(G.active))) {
		goto cancel_outflanking { card: L.card }
	}
`)

P.delayed_forces_acknowledge = function() {
	// L.card
	let inactive = (is_battle_defender(G.active, G.current_battle)) ? `withdraw before ${possessive(enemy(G.active))} forces arrive` : `launch a surprise attack`
	goto("confirm_event", {
		card: L.card,
		inactive,
		sequence: [{ prompt: `${ROLES[enemy(G.active)]} designates one connection used to enter the battle.` }]
	})
}

P.delayed_forces_designate = {
	_begin() {
		// L.card
		L.designated_connection_from = -1
		L.effect = (L.card === C_DELAYED_FORCES_RU) ? `French forces entering across all other connections fight at X0.` : `All Russian forces entering across that connection fight at X0.`
	},
	inactive() { return `designated a connection for ${format_card(L.card)}` },
	prompt() {
		if (L.designated_connection_from === -1) {
			prompt_card(L.card, `Designate one connection used to enter battle at ${format_area(G.current_battle)}. ` + L.effect)
			for (let origin of get_connections_used_in_battle(enemy(G.active), G.current_battle))
				action_connection(origin, G.current_battle)
		} else {
			prompt_card(C_DELAYED_FORCES_RU, `You designated the connection from ${format_area(L.designated_connection_from)} to ${format_area(G.current_battle)}. (cannot be undone)`)
			button_confirm()
		}
	},
	connection(connection) {
		push_undo()
		L.designated_connection_from = get_other_area(connection, G.current_battle)
		log(`Designated connection from ${format_area(L.designated_connection_from)} to ${format_area(G.current_battle)}.`)
	},
	confirm() {
		push_undo()
		if (L.card === C_DELAYED_FORCES_RU)
			add_battle_delayed_forces_ru(G.current_battle, L.designated_connection_from)
		else
			add_battle_delayed_forces_fr(G.current_battle, L.designated_connection_from)
		log(L.effect)
		L.L.$ = L.designated_connection_from
		end()
	}
}

P.delayed_forces_confirm = function() {
	// L.card, L.designated_connection_from
	goto("confirm_event", {
		card: L.card,
		inactive: `review the designated connection`,
		sequence: [{ prompt: `France designated the connection from ${format_area(L.designated_connection_from)} to ${format_area(G.current_battle)}.`}]
	})
}

// RU #41: Fierce Fighting
E.fierce_fighting_ru = function() { return is_battle_defender(RUSSIA, G.current_battle) && has_leader_in_battle(RUSSIA, G.current_battle) }

P.fierce_fighting_ru = function() {
	goto("confirm_event", {
		card: C_FIERCE_FIGHTING_RU,
		inactive: `fiercely defend their positions`,
		sequence: [
			{
				prompt: "Increase both side's losses by 2.",
				log_text: "Both sides' losses +2."
			},
			{
				prompt: "There is no pursuit after battle.",
				log_text: "No pursuit after battle."
			}
		]
	})
}

// RU #42: Command Friction
// See draw_card_to_hand for the confirmation step
P.command_friction = {
	_begin() {
		card_box_begin(C_COMMAND_FRICTION)
		L.selected_area = -1

		L.areas_with_multiple_russian_leaders = []
		for (let area of G.leaders.slice(first_russia_leader, last_russia_leader + 1)) {
			if (area !== OUT_OF_PLAY && area !== POOL)
				if (array_count(G.leaders.slice(first_russia_leader, last_russia_leader + 1), loc => loc === area) >= 2)
					set_add(L.areas_with_multiple_russian_leaders, area)
		}
	},
	inactive: "start a fight",
	prompt() {
		if (L.selected_area > -1) {
			prompt_card(C_COMMAND_FRICTION, `You selected ${format_area(L.selected_area)}.`)
			button_confirm()
		} else {
			if (L.areas_with_multiple_russian_leaders.length === 0) {
				prompt_card(C_COMMAND_FRICTION, `No areas with multiple Russian leaders.`)
				button_pass()
			} else {
				prompt_card(C_COMMAND_FRICTION, `Select an area with multiple Russian leaders. (${join_array_with_or(L.areas_with_multiple_russian_leaders.map(format_area))}).`)
				L.areas_with_multiple_russian_leaders.forEach(action_area)
			}
		}
	},
	area(area) {
		push_undo()
		L.selected_area = area
	},
	pass() {
		log("No areas with multiple Russian leaders.")
		end()
	},
	confirm() {
		log(`France selected ${format_area(L.selected_area)}.`)
		add_persistent_event(C_COMMAND_FRICTION, { area: L.selected_area })
		end()
	},
	_end() { card_box_end() }
}

// RU #43: Exhausted Horses
function exhausted_horses_could_exhaust() {
	return get_areas_with_sps(FRANCE).some(area => count_num_sps_of_type(FRANCE, FRESH_CAVALRY, area) > 0)
}

function exhausted_horses_could_eliminate() {
	let count = 0
	for (let area of get_areas_with_sps(FRANCE)) {
		count += count_num_sps_of_type(FRANCE, EXHAUSTED_CAVALRY, area)
		if (count >= 2 || (count === 1 && !exhausted_horses_could_exhaust()))
			return true
	}
	return false
}

function count_num_exhausted_cavalry_on_map(who) {
	let count = 0
	for (let area of get_areas_with_sps(who))
		count += count_num_sps_of_type(who, EXHAUSTED_CAVALRY, area)
	return count
}

P.exhausted_horses = script(`
	call exhausted_horses_confirm_play
	set G.active FRANCE
	call exhausted_horses_assign_attrition_losses
	call exhausted_horses_confirm_effect
	set G.active RUSSIA
	goto event_done { card: C_EXHAUSTED_HORSES }
`)

P.exhausted_horses_confirm_play = function() {
	goto("confirm_event", {
		card: C_EXHAUSTED_HORSES,
		inactive: `play ${format_card(C_EXHAUSTED_HORSES)}`,
		sequence: [{ prompt: `Confirm event play?` }]
	})
}

P.exhausted_horses_assign_attrition_losses = {
	_begin() {
		L.has_assigned_attrition_losses = false
		L.losses_remaining = 2
	},
	prompt() {
		V.prompt = `Assign attrition losses — ${L.losses_remaining} remaining.`
		let any = false
		if (exhausted_horses_could_exhaust()) {
			any = true
			button("exhaust")
		}
		if (exhausted_horses_could_eliminate()) {
			any = true
			button("eliminate_2")
		}
		if (!any)
			button_pass()
	},
	exhaust() {
		push_undo()
		call_or_goto(--L.losses_remaining > 0, "exhausted_horses_exhaust")
	},
	eliminate_2() {
		push_undo()
		call_or_goto(--L.losses_remaining > 0, "exhausted_horses_eliminate")
	},
	pass() {
		push_undo()
		log(`No Cavalry SPs on map.`)
		end()
	},
	confirm() {
		push_undo()
		end()
	}
}

P.exhausted_horses_exhaust = {
	_begin() {
		log("Exhausted")
		L.areas = get_areas_with_sps(FRANCE).filter(area => has_sp_of_type(FRANCE, FRESH_CAVALRY, area))
	},
	prompt() {
		V.prompt = `Exhaust a fresh Cavalry SP.`
		if (L.areas.length <= 5)
			V.prompt += ` (${join_array_with_or(L.areas.map(format_area))})`
		L.areas.forEach(area => action_troop_alt(FRESH_CAVALRY, area))
	},
	troop(entry) {
		push_undo()
		let type = decode_troop_action_type(entry)
		let area = decode_troop_action_area(entry)
		exhaust_sp(FRANCE, area, type)
		logi(`${format_area(area)}`)
		log_masked(FRANCE, format_ii(`1 ${get_troop_type_name(type)}`), format_ii(`1 fresh SP`))
		end()
	}
}

P.exhausted_horses_eliminate = {
	_begin() {
		log("Eliminated")
		L.num_sps_to_eliminate = Math.min(2, count_num_exhausted_cavalry_on_map(FRANCE))
		L.areas = get_areas_with_sps(FRANCE).filter(area => has_sp_of_type(FRANCE, EXHAUSTED_CAVALRY, area))
	},
	prompt() {
		V.prompt = `Eliminate exhausted Cavalry SPs — ${L.num_sps_to_eliminate} remaining.`
		if (L.areas.length <= 5)
			V.prompt += ` (${join_array_with_or(L.areas.map(format_area))})`
		L.areas.forEach(area => action_troop_alt(EXHAUSTED_CAVALRY, area))
	},
	troop(entry) {
		push_undo()
		let type = decode_troop_action_type(entry)
		let area = decode_troop_action_area(entry)
		eliminate_troop(FRANCE, area, type)
		logi(`${format_area(area)}`)
		log_masked(FRANCE, format_ii(`1 ${get_troop_type_name(type)}`), format_ii(`1 Exh. SP`))

		if (--L.num_sps_to_eliminate === 0) {
			end()
		} else {
			if (!has_sp_of_type(FRANCE, EXHAUSTED_CAVALRY, area))
				array_delete_item(L.areas, area)
		}
	}
}

P.exhausted_horses_confirm_effect = function() {
	goto("confirm_event", {
		card: C_EXHAUSTED_HORSES,
		inactive: `suffer horrible losses among the horses`,
		sequence: [{
			prompt: `French forces have a maximum move of 1 this turn, regardless of type/orders.`,
			log_text: `French forces have a maximum move of 1 this turn.`
		}],
		persistent: true,
	})
}

// RU #44 Disease & Starvation
P.disease_and_starvation = script(`
	call disease_and_starvation_eliminate
	call event_done { card: C_DISEASE_AND_STARVATION }
	if (G.active === FRANCE) {
		set G.active RUSSIA
		goto event_done { card: C_DISEASE_AND_STARVATION }
	}
`)

P.disease_and_starvation_eliminate = {
	_begin() {
		log("Eliminated")
		L.num_sps_to_eliminate = 4
		L.areas = filter_areas(area => get_devastation(area) >= 2 && has_friendly_troop(FRANCE, area))
	},
	prompt() {
		if (L.areas.length > 0) {
			prompt_card(C_DISEASE_AND_STARVATION, `Select an area with a Devastation level of 2 or more to eliminate up to ${L.num_sps_to_eliminate} SPs.`)
			if (L.areas.length <= 5) V.prompt += ` (${join_array_with_or(L.areas.map(format_area))})`

			for (let area of L.areas)
				action_area(area)
		} else {
			prompt_card(C_DISEASE_AND_STARVATION, `No more areas with a Devastation level of 2 or more to eliminate French SPs.`)
			button_done()
		}
	},
	area(area) {
		clear_undo()
		set_delete(L.areas, area)
		if (L.num_sps_to_eliminate < count_num_exhausted_sps(FRANCE, area)) {
			G.active = FRANCE
			goto("disease_and_starvation_select_losses", { area, count: L.num_sps_to_eliminate })
		} else {
			logi(`${format_area(area)}`)
			log_only(RUSSIA, format_ii(`${count_num_exhausted_sps(FRANCE, area)} Exh. SPs`))
			// get_area_troop_set(area).forEach(entry => console.log([decode_troop_entry_who(entry), decode_troop_entry_type(entry), decode_troop_entry_num(entry)]))
			get_all_exhausted_sp_types(FRANCE, area).forEach((type) => {
				log_only(FRANCE, format_ii(`${count_num_sps_of_type(FRANCE, type, area)} ${get_troop_type_name(type)}`))
				L.num_sps_to_eliminate -= count_num_sps_of_type(FRANCE, type, area)
				eliminate_troop(FRANCE, area, type, count_num_sps_of_type(FRANCE, type, area))
			})
		}
		if (L.num_sps_to_eliminate === 0)
			end()
	},
	done() {
		if (L.num_sps_to_eliminate === 4)
			logi("Nothing")
		end()
	}
}

P.disease_and_starvation_select_losses = {
	_begin() {
		// L.area, L.count
		L.eliminated = []
		log_only(RUSSIA, format_ii(`${L.count} Exh. SPs`))
	},
	prompt() {
		prompt_card(C_DISEASE_AND_STARVATION, `Eliminate ${L.count} exhausted SPs at ${format_area(L.area)}.`)
		for (let type of get_all_exhausted_sp_types(G.active, L.area))
			action_troop_alt(type, L.area)
	},
	troop(entry) {
		push_undo()
		let type = decode_troop_action_type(entry)
		eliminate_troop(G.active, L.area, type)
		if (!map_has(L.eliminated, type))
			map_set(L.eliminated, type, 1)
		else
			map_increment(L.eliminated, type)

		if (--L.count === 0) {
			logi(`${format_area(L.area)}`)
			map_for_each(L.eliminated, (troop_type, num) => {
				log_only(FRANCE, format_ii(`${num} ${get_troop_type_name(troop_type)}`))
			})
			end()
		}
	}
}

// RU #45 Poor Logistics (must-play event) -- see draw_card_to_hand

// RU #46 Devastated Countryside (must-play event) -- see draw_card_to_hand

// RU #47: Treacherous Allies
// Used in treacherous_allies script
// eslint-disable-next-line no-unused-vars
function is_russia_within_two_areas_of_vilna() {
	return map_keys(G.sps).some(area => has_russian_sp(area) && find_path_distance(area, S_VILNA) <= 2)
}

function eliminate_leader(leader) {
	move_leader(leader, OUT_OF_PLAY)
	increase_vp(enemy(get_leader_faction(leader)), get_leader_vp(leader))
}

P.treacherous_allies = script(`
	if (is_russia_within_two_areas_of_vilna()) {
		call treacherous_allies_acknowledge
		set G.active FRANCE
		call treacherous_allies_betray
		call event_done { card: C_TREACHEROUS_ALLIES }
		set G.active RUSSIA
	} else {
		goto treacherous_allies_no_effect
	}
	goto event_done { card: C_TREACHEROUS_ALLIES }
`)

P.treacherous_allies_no_effect = function() {
	goto("confirm_event", {
		card: C_TREACHEROUS_ALLIES,
		inactive: `play ${format_card(C_TREACHEROUS_ALLIES)}`,
		sequence: [{
			prompt: "No effect.",
			log_text: "No effect."
		}]
	})
}

P.treacherous_allies_acknowledge = function() {
	goto("confirm_event", {
		card: C_TREACHEROUS_ALLIES,
		inactive: `play ${format_card(C_TREACHEROUS_ALLIES)}`,
		sequence: [{ prompt: "Confirm event play?" }]
	})
}

P.treacherous_allies_betray = {
	prompt() {
		let allied_nationalities_at_area = []
		if (has_prussian_sp(G.current_battle))
			set_add(allied_nationalities_at_area, "Prussian")
		if (has_austrian_sp(G.current_battle))
			set_add(allied_nationalities_at_area, "Austrian")
		let allies_string = allied_nationalities_at_area.length > 0 ? join_array_with_and(allied_nationalities_at_area) : "0 SPs."

		if (get_leader_location(L_SCHWARZENBERG) === G.current_battle)
			prompt_card(C_TREACHEROUS_ALLIES, `Eliminate ${format_leader(L_SCHWARZENBERG)} and all ${allies_string} SPs.`)
		button("eliminate")
	},
	eliminate() {
		push_undo()
		log("Eliminated")
		if (get_leader_location(L_SCHWARZENBERG) === G.current_battle) {
			logi(format_leader(L_SCHWARZENBERG))
			eliminate_leader(L_SCHWARZENBERG)
		}

		for (let type of get_troop_types_at_area(FRANCE, G.current_battle)) {
			if (type >= FRESH_PRUSSIAN_INFANTRY) {
				let count = count_num_sps_of_type(FRANCE, type, G.current_battle)
				logi(`${count} ${get_troop_type_name(type)}`)
				eliminate_troop(FRANCE, G.current_battle, type, count)
			}
		}

		// Remove these guys from the battle
		let battle_data = get_player_battle_data(FRANCE, G.current_battle)
		battle_data.forces.forEach(force => {
			if (set_has(force.leaders, L_SCHWARZENBERG))
				set_delete(force.leaders, L_SCHWARZENBERG)
			for (let type = FRESH_PRUSSIAN_INFANTRY; type <= EXHAUSTED_AUSTRIAN_INFANTRY; ++type) {
				if (force[type] > 0)
					force[type] = 0
			}
		})

		end()
	}
}

function get_order_location(order) {
	return G.orders[order]
}

function get_orders_at_area(who, area) {
	let orders = []
	for (let order = get_first_order(who); order <= get_last_order(who); ++order)
		if (get_order_location(order) === area) set_add(orders, order)
	return orders
}

function remove_order(id) {
	G.orders[id] = POOL
	set_delete(G.orders_by_type[get_order_type(id)][get_order_owner(id)], id)
}

// RU #48: Disorderly March
P.disorderly_march = script(`
	call shift_initiative { in_favor_of: RUSSIA }
	call disorderly_march_designate
	set G.active FRANCE
	call disorderly_march_remove_orders { area: L.$ }
	call disorderly_march_confirm_effect { area: L.$ }
	call event_done { card: C_DISORDERLY_MARCH }
	set G.active RUSSIA
	goto event_done { card: C_DISORDERLY_MARCH }
`)

P.disorderly_march_designate = {
	_begin() {
		L.designated_area = -1
	},
	inactive() { return `designate an area for ${format_card(C_DISORDERLY_MARCH)}` },
	prompt() {
		if (L.designated_area === -1) {
			prompt_card(C_DISORDERLY_MARCH, "Designate an area: France must remove all 'Defend', 'Forage', and 'Place Depot' orders on it.")
			filter_areas(area => has_french_order(area)).forEach(action_area)
		} else {
			prompt_card(C_DISORDERLY_MARCH, `You designated ${format_area(L.designated_area)}.`)
			button_confirm()
		}
	},
	area(area) {
		push_undo()
		L.designated_area = area
		log(`Designated ${format_area(area)}.`)
	},
	confirm() {
		push_undo()
		add_persistent_event(C_DISORDERLY_MARCH, { area: L.designated_area })
		L.L.$ = L.designated_area
		end()
	}
}

P.disorderly_march_remove_orders = {
	_begin() {
		// L.area
		L.orders = get_orders_at_area(FRANCE, L.area).filter(order => {
			get_order_type(order) === DEFEND || get_order_type(order) == FORAGE || get_order_type(order) === PLACE_DEPOT
		})
		log("Removed")
	},
	inactive() { return `remove orders from ${format_area(L.area)}` },
	prompt() {
		if (L.orders.length > 0) {
			V.prompt = `Remove all Defend, Forage, and Place Depot orders at ${format_area(L.area)}.`
			L.orders.forEach(action_order)
		} else {
			prompt_card(C_DISORDERLY_MARCH, `No Defend, Forage, or Place Depot orders at ${format_area(L.area)}.`)
			button_confirm()
		}
	},
	order(order) {
		push_undo()
		log_masked(FRANCE, format_i(get_order_name(order)), format_i(`1 order`))
		remove_order(order)
		set_delete(L.orders, order)
		if (L.orders.length === 0)
			end()
	},
	confirm() {
		push_undo()
		logi(`Nothing`)
		end()
	}
}

P.disorderly_march_confirm_effect = function() {
	// L.area
	goto("confirm_event", {
		card: C_DISORDERLY_MARCH,
		inactive: `suffer from poor march discipline`,
		sequence: [{
			prompt: `This turn, France must stop moving immediately after entering or exiting ${format_area(L.area)}.`,
			log_text: `France must stop moving immediately after entering or exiting ${format_area(L.area)}.`
		}]
	})
}

// RU #49: Cossack Patrols
P.cossack_patrols = script(`
	call cossack_patrols_confirm
	set G.active FRANCE
	call do_cossack_patrols
	set G.active RUSSIA
	goto event_done { card: C_COSSACK_PATROLS }
`)

P.cossack_patrols_confirm = function() {
	goto("confirm_event", {
		card: C_COSSACK_PATROLS,
		inactive: `play ${format_card(C_COSSACK_PATROLS)}`,
		sequence: [{ prompt: `Confirm event play?` }]
	})
}

P.do_cossack_patrols = {
	_begin() {
		log("Eliminated")
		L.areas = []
		get_areas_with_sps(RUSSIA).filter(area => has_cossack_sp(area)).forEach((area) => {
			for (let neighbor of get_all_adjacent_areas(area))
				if (has_exhausted_sp(FRANCE, neighbor) || has_order_of_type(FRANCE, FORAGE, neighbor))
					set_add(L.areas, neighbor)
		})
		if (L.areas.length === 0) logi("Nothing")

		L.selected_area = -1
		L.has_eliminated_sp = false
	},
	prompt() {
		if (L.areas.length > 0) {
			if (L.selected_area === -1) {
				prompt_card(C_COSSACK_PATROLS, `Select the next area to resolve the event.`)
				if (L.areas.length <= 5)
					V.prompt += ` ${join_array_with_or(L.areas.map(format_area))}`

				L.areas.forEach(action_area)
			} else if (!L.has_eliminated_sp && has_exhausted_sp(G.active, L.selected_area)) {
				prompt_card(C_COSSACK_PATROLS, `Eliminate 1 Exhausted SP at ${format_area(L.selected_area)}.`)
				for (let type of get_all_exhausted_sp_types(G.active, L.selected_area))
					action_troop_alt(type, L.selected_area)
			} else {
				prompt_card(C_COSSACK_PATROLS, `Remove Forage orders from ${format_area(L.selected_area)}.`)
				get_orders_at_area(G.active, L.selected_area).filter(order => get_order_type(order) === FORAGE).forEach(action_order)
			}
		} else {
			prompt_card(C_COSSACK_PATROLS, "All done.")
			button_confirm()
		}
	},
	area(area) {
		push_undo()
		L.selected_area = area
		logi(format_area(area))
	},
	troop(entry) {
		push_undo()
		let type = decode_troop_action_type(entry)
		eliminate_troop(G.active, L.selected_area, type)
		log_only(RUSSIA, format_ii(`1 Exh. SP`))
		log_only(FRANCE, format_ii(`1 ${get_troop_type_name(type)}`))
		if (!has_order_of_type(G.active, FORAGE, L.selected_area)) {
			set_delete(L.areas, L.selected_area)
			L.selected_area = -1
		} else {
			L.has_eliminated_sp = true
		}
	},
	order(order) {
		push_undo()
		remove_order(order)
		logii(`1 Forage`)
		if (!has_order_of_type(FRANCE, FORAGE, L.selected_area)) {
			L.has_eliminated_sp = false
			set_delete(L.areas, L.selected_area)
			L.selected_area = -1
		}
	},
	confirm() {
		push_undo()
		end()
	}
}

// RU #50: Crumbling Cohesion
E.crumbling_cohesion = function() { return is_battle_attacker(RUSSIA, G.current_battle) }

P.crumbling_cohesion = script(`
	call shift_initiative { in_favor_of: RUSSIA }
	goto crumbling_cohesion_confirm
`)

P.crumbling_cohesion_confirm = function() {
	goto("confirm_event", {
		card: C_CRUMBLING_COHESION,
		inactive: `make France's life miserable`,
		sequence: [{
			prompt: `Cossack SPs fight at X${get_who_has_initiative() === RUSSIA ? get_current_initiative_level() : 0} instead of X0.`,
			log_text: `Cossack SPs fight X${get_who_has_initiative() === RUSSIA ? get_current_initiative_level() : 0}.`
		}]
	})
}

// RU #51: Unreliable Germans
E.unreliable_germans = function() { return get_who_has_initiative() === RUSSIA }

P.unreliable_germans = function() {
	goto("confirm_event", {
		card: C_UNRELIABLE_GERMANS,
		inactive: `reduce the morale of the Emperor's Germans`,
		sequence: [
			{
				prompt: `All Austrian and Prussian SPs fight at X0 this battle.`,
				log_text: `All Austrian and Prussian SPs fight X0.`
			},
			{
				prompt: `All French Infantry and Cavalry SPs fight at X0,5 this battle.`,
				log_text: `All French Infantry and Cavalry SPs fight X0,5.`
			}
		]
	})
}

// RU #52 Barclay de Tolly Resigns (must-play event) -- see draw_card_to_hand

// RU #53: Aggressive Cossacks
E.aggressive_cossacks = function() { return get_who_has_initiative() === RUSSIA }

P.aggressive_cossacks = function() {
	goto("confirm_event", {
		card: C_AGGRESSIVE_COSSACKS,
		inactive: `pursue aggressive Cossack tactics`,
		sequence: [{
			prompt: `Cossack SPs fight at X2 instead of X0.`,
			log_text: `Cossack SPs fight X2.`
		}]
	})
}

// FR #1: Hard Marching
// FR #2: Hard Marching
P.hard_marching_1 = function() { goto("hard_marching", { card: C_HARD_MARCHING_1 }) }
P.hard_marching_2 = function() { goto("hard_marching", { card: C_HARD_MARCHING_2 }) }

P.hard_marching = script(`
	call shift_initiative { in_favor_of: FRANCE }
	call receive_free_order { card: L.card, type: FORCED_MARCH }
	call hard_marching_confirm_effects { card: L.card }
	goto event_done { card: L.card }
`)

P.hard_marching_confirm_effects = function() {
	// L.card
	goto("confirm_event", {
		card: L.card,
		inactive: `demonstrate its military prowess`,
		sequence: [
			{
				prompt: `1 SP in each Forced March force is exhausted.`,
				log_text: `1 SP in each Forced March force is exhausted.`
			},
			{
				prompt: `This turn, all French forces using 'Forced March' orders fight at X1 instead of X0,5.`,
				log_text: `All French forces using Forced March orders fight at X1.`
			}
		]
	})
}

//FR #3: War Weariness
function get_eliminated_leaders(player) {
	let leaders = []
	for (let leader = get_first_leader(player); leader <= get_last_leader(player); ++leader) {
		if (get_leader_location(leader) === OUT_OF_PLAY)
			set_add(leaders, leader)
	}
	return leaders
}

P.war_weariness = {
	_begin() {
		L.controlled_areas = [S_MOSCOW, S_TORZHOK, S_BEZHANITZY, S_OSTROV, S_VENDEN].filter(s => is_fr_controlled(s))
		L.eliminated_russian_leaders = get_eliminated_leaders(RUSSIA)
	},
	inactive: "press for a negotiated settlement",
	prompt() {
		prompt_card(C_WAR_WEARINESS, `Shift the VP marker ${ L.controlled_areas.length + L.eliminated_russian_leaders.length } in France's favor.`)
		action_vp_marker()
		button_next()
	},
	next() { this.vp() },
	vp() {
		push_undo()
		increase_vp(FRANCE, L.french_vp)
		L.controlled_areas.forEach(area => logi(`+1 ${format_area(area)}`))
		L.eliminated_russian_leaders.forEach(leader => logi(format_leader(leader)))
		goto("event_done", { card: C_WAR_WEARINESS })
	}
}

// FR #4: Holy Mother Russia (FR)
P.holy_mother_russia_fr = {
	inactive: "to exploit the pressure on the Russian leadership",
	prompt() {
		prompt_card(C_HOLY_MOTHER_RUSSIA_FR, "Designate a Key City area. France +1 VP for each RU force that leaves there via 'Forced March', 'March', or 'Evade' orders.")
		for (let area of filter_areas(a => is_key_city(a)))
			action_area(area)
	},
	area(area) {
		log(`This turn, France will gain 1 VP for each RU force that leaves ${format_area(area)} via Force March, March or Evade orders.`)
		add_persistent_event(C_HOLY_MOTHER_RUSSIA_FR, { area })
		goto("event_done", { card: C_HOLY_MOTHER_RUSSIA_FR })
	}
}

// FR #5: Polish Support
E.polish_support = function() { return set_has([S_KOVNO, S_VILNA, S_VITEBSK], get_leader_location(L_NAPOLEON)) }

P.polish_support = script(`
	call polish_support_place_infantry
	call draw_card_to_hand
	goto event_done { card: C_POLISH_SUPPORT }
`)

P.polish_support_place_infantry = {
	inactive: "recruit Polish volunteers",
	prompt() {
		prompt_card(C_POLISH_SUPPORT, `Place 2 Infantry SPs at ${format_area(get_leader_location(L_NAPOLEON))}.`)
		action_area(get_leader_location(L_NAPOLEON))
	},
	area(area) {
		push_undo()
		add_troop(FRANCE, area, FRESH_INFANTRY, 2)
		log(`Placed at ${format_area(area)}`)
		logi(`2 Infantry`)
		end()
	},
}

// FR #6 Outflanking -- see P.outflanking (handled with the Russian Outflanking event)

// FR #7 Unsuccessful Disengagement
P.may_play_unsuccessful_disengagement = function() {
	// L.area
	goto("may_play_event", {
		event: C_UNSUCCESSFUL_DISENGAGEMENT,
		suffix: `cancel all Evade orders at ${format_area(L.area)}`,
		info: { area: L.area }
	})
}

P.unsuccessful_disengagement = {
	inactive: "to catch up with the evading Russians",
	prompt() {
		prompt_card(C_UNSUCCESSFUL_DISENGAGEMENT, `Confirm cancelling all Evade orders at ${format_area(L.area)}?`)
		button_confirm()
	},
	confirm() {
		log(`Cancelled all Evade orders at ${format_area(L.area)}.`)
		end()
	},
	_end() {
		add_persistent_event(C_UNSUCCESSFUL_DISENGAGEMENT, {
			area: L.area,
			cancelled_orders: get_orders_at_area(RUSSIA, L.area).filter(order => get_order_type(order) === EVADE)
		})
		L.L.unsuccessful_disengagement = true
	}
}

// FR #8: Infighting & Intrigue
// NOTE: This one is tricky and is enforced in the 'move' state
function has_valid_infighting_and_intrigue_destination(who, area, type) {
	let allowance = get_max_move_allowance(who, area, type)
	return array_count(get_movable_areas_in_radius(area, allowance), destination => has_enemy_sp(who, destination)) > 0
}

function get_distance_to_closest_infighting_and_intrigue_destination(who, area, type) {
	let allowance = get_max_move_allowance(who, area, type)
	let areas = get_movable_areas_in_radius(area, allowance, destination => has_enemy_sp(who, destination))
	let min_distance = 999

	for (let l of areas) {
		let dist = find_path_distance(area, l)
		if (dist < min_distance)
			min_distance = dist
	}

	return min_distance
}

P.infighting_and_intrigue = {
	_begin() {
		L.selected_area = -1
	},
	inactive: "try to make the Russians give battle",
	prompt() {
		if (L.selected_area === -1) {
			prompt_card(C_INFIGHTING_AND_INTRIGUE, `Designate an area. This turn, Russian leaders there may only execute Forced March or March orders if they end in a French-occupied area.`)
			get_areas_with_leaders(RUSSIA).forEach(action_area)
		} else {
			prompt_card(C_INFIGHTING_AND_INTRIGUE, `You designated ${format_area(L.selected_area)}.`)
			button_confirm()
		}
	},
	area(area) {
		push_undo()
		L.selected_area = area
		log(`Selected ${format_area(area)}.`)
		log(`Russian leaders at ${format_area(area)} may only execute Forced March or March orders if they end in a French-occupied area.`)
	},
	confirm() {
		push_undo()
		add_persistent_event(C_INFIGHTING_AND_INTRIGUE, { area: L.selected_area })
		goto("event_done", { card: C_INFIGHTING_AND_INTRIGUE })
	}
}

// FR #9, FR #10: Fast Marching
P.may_play_fast_marching = function() {
	goto("may_play_event", {
		event: [C_FAST_MARCHING_1, C_FAST_MARCHING_2],
		info: { area: L.area }
	})
}

P.fast_marching_1 = function() { goto("fast_marching", { card: C_FAST_MARCHING_1, area: L.area }) }
P.fast_marching_2 = function() { goto("fast_marching", { card: C_FAST_MARCHING_2, area: L.area }) }

P.fast_marching = function() {
	// L.card, L.area
	goto("confirm_event", {
		card: L.card,
		inactive: `demonstrate impressive marching speed`,
		sequence: [
			{
				prompt: `The force using this March order has a move allowance of 2.`,
				log_text: `This March order has move 2.`
			},
			{
				prompt: `1 fresh SP (if any) in the moving force becomes exhausted.`,
				log_text: `1 fresh SP in the moving force becomes exhausted.`
			}
		],
		persistent: true
	})
}

// FR #11: Grand Battery
E.grand_battery = function() { return is_leader_in_battle(L_NAPOLEON, G.current_battle) }

P.grand_battery = function() {
	let loss_increase = is_battle_attacker(FRANCE, G.current_battle) ? 2 : 1
	goto("confirm_event", {
		card: C_GRAND_BATTERY,
		inactive: is_battle_event_currently_active(C_INFANTRY_SQUARES_RU) ? `blast the grouped Russians` : `launch a cannonade`,
		sequence: [
			{
				prompt: `Russian losses are increased by ${loss_increase}.`,
				log_text: `Russian losses +${loss_increase}.`
			},
			{
				pred: is_battle_event_currently_active(C_INFANTRY_SQUARES_RU),
				prompt: `Russian losses increased by an additional 1 because Russia played ${format_card(C_INFANTRY_SQUARES_RU)}.`,
				log_text: `${format_card(C_INFANTRY_SQUARES_RU)}: Russian losses increased by an additional 1.`
			}
		]
	})
}

// FR #12: Cavalry Charge
E.cavalry_charge_fr = function() { return is_leader_in_battle(L_MURAT, G.current_battle) }

P.cavalry_charge_fr = function() {
	goto("confirm_event", {
		card: C_CAVALRY_CHARGE_FR,
		inactive: `have ${format_leader(L_MURAT)} rally the cavalry`,
		sequence: [{
			prompt: `The combat value of up to 2 French Cavalry SPs are tripled.`,
			log_text: `Up to 2 French Cavalry SPs fight at X3.`
		}]
	})
}

// FR #13: Murat's Cavalry
E.murats_cavalry = function() { return is_leader_in_battle(L_MURAT, G.current_battle) }

P.murats_cavalry = function() {
	goto("confirm_event", {
		card: C_MURATS_CAVALRY,
		inactive: `have ${format_leader(L_MURAT)} launch an aggressive cavalry charge`,
		sequence: [
			{
				prompt: `The combat value of up to 2 French Cavalry SPs is doubled.`,
				log_text: `Up to 2 French Cavalry SPs fight at X2.`
			},
			{
				prompt: `1 French Cavalry SP is exhausted after battle.`,
				log_text: `1 Cavalry SP is exhausted after battle.`
			},
			{
				prompt: `If France wins the battle, French Cavalry SPs count X2 for the pursuit.`,
				log_text: `French Cavalry SPs count X2 for pursuit.`
			}
		]
	})
}

// FR #14: Skillful Maneuvers
E.skillfull_maneuvers = function() { return is_battle_attacker(FRANCE, G.current_battle) && did_attacker_attack_across_multiple_connections(G.current_battle) }

P.skillfull_maneuvers = {
	_begin() {
		L.selection = null
	},
	prompt() {
		if (L.selection === null) {
			prompt_card(C_SKILLFULL_MANEUVERS, `Choose which effect to play for.`)
			button("remove_defend_order", has_order_of_type(RUSSIA, DEFEND, G.current_battle))
			button("cancel_river_effect", (get_attacker_data(G.current_battle).forces.some(force => force.river_crossing)))
			button_pass()
		} else {
			let suffix = L.selection === "defend" ? "a defend order" : "a river"
			prompt_card(C_SKILLFULL_MANEUVERS, `You chose to cancel the effect of ${suffix}.`)
			button_confirm()
		}
	},
	remove_defend_order() {
		push_undo()
		let order = get_orders_at_area(RUSSIA, G.current_battle).find(order => get_order_type(order) === DEFEND)
		remove_order(order)
		log("Removed")
		logi(`Defend order`)
		L.selection = "defend"
	},
	cancel_river_effect() {
		push_undo()
		L.selection = "river"
		log(`Cancelled the effect of a River.`)
	},
	confirm() {
		push_undo()
		add_persistent_event(C_SKILLFULL_MANEUVERS, { cancels: L.selection })
		end()
	},
	pass() {
		push_undo()
		end()
	}
}

// FR #15: Peace Offer
const PEACE_OFFER_AREAS = [S_KIEV, S_TVER, S_RIGA, S_OSTROV, S_BEZHANITZY]

E.peace_offer = function() { return is_fr_controlled(S_MOSCOW) }

P.peace_offer = script(`
	call shift_vp { in_favor_of: FRANCE }
	call shift_initiative { in_favor_of: RUSSIA, amount: 2 }
	call peace_offer_adjust_vp
`)

P.peace_offer_adjust_vp = {
	_begin() {
		L.shift = 2 * array_count(PEACE_OFFER_AREAS, area => is_fr_controlled(area))
	},
	inactive: "propose a peace deal",
	prompt() {
		prompt_card(C_PEACE_OFFER, `Shift VP ${L.shift} spaces in France's favor.`)
		action_vp_marker()
		button_next()
	},
	next() { this.vp() },
	vp() {
		push_undo()
		increase_vp(FRANCE, L.shift)
		for (let area of PEACE_OFFER_AREAS) {
			if (is_fr_controlled(area))
				logi(format_area(area))
		}
		if (!sudden_death())
			goto("event_done", { card: C_PEACE_OFFER })
	}
}

// FR #16 Infantry Squares -- see RU #36 Infantry Squares

// FR #17: Davout Takes Command
P.davout_takes_command = {
	inactive: "appoint Davout as commander",
	prompt() {
		prompt_card(C_DAVOUT_TAKES_COMMAND, "Place Davout and 1 Infantry SP at any French-occupied area.")
		filter_areas(area => is_fr_controlled(area)).forEach(action_area)
	},
	area(area) {
		push_undo()
		move_leader(L_DAVOUT, area)
		add_troop(FRANCE, area, FRESH_INFANTRY, 1)
		log(`Placed at ${format_area(area)}`)
		logi(format_leader(L_DAVOUT))
		logi(1 + " " + get_troop_type_name(FRESH_INFANTRY))
		goto("event_done", { card: C_DAVOUT_TAKES_COMMAND })
	}
}

// FR #18 Outflanking -- see P.outflanking (handled with Russian Outflanking event)

// FR #19: IX Corps Arrives
// FR #20: XI Corps Arrives
E.ix_corps_arrives = function() { return get_current_month() >= AUG }
E.xi_corps_arrives = function() { return get_current_month() >= SEPT }

P.ix_corps_arrives = function() { goto("bring_event_reinforcements", { card: C_IX_CORPS_ARRIVES, count: 4 })}
P.xi_corps_arrives = function() { goto("bring_event_reinforcements", { card: C_IX_CORPS_ARRIVES, count: 5 })}

P.bring_event_reinforcements = {
	// L.card, L.count
	inactive() {
		if (L.card === C_IX_CORPS_ARRIVES)
			return `bring on Victor's IX Corps`
		else
			return `bring on Augereau's XI Corps`
	},
	prompt() {
		prompt_card(L.card, `Place ${L.count} French Infantry SPs at one French-controlled Key City or off-map area.`)
		filter_areas(area => is_fr_controlled(area) && (is_key_city(area) || is_french_off_map_area(area)))
			.forEach(action_area)
	},
	area(area) {
		push_undo()
		add_troop(FRANCE, area, FRESH_INFANTRY, L.count)
		log(`Placed at ${format_area(area)}`)
		logi(`${L.count} Infantry`)
		goto("event_done", { card: L.card })
	}
}

// FR #21: Confusing Orders
E.confusing_orders = function() { return is_leader_in_battle(L_KUTUZOV, G.current_battle) }

P.confusing_orders = {
	_begin() {
		card_box_begin(C_CONFUSING_ORDERS)
		log("Cancelled")
		L.num_cards_to_cancel = Math.min(2, G.played_cards[RUSSIA].length)
	},
	prompt() {
		if (L.num_cards_to_cancel > 0) {
			prompt_card(C_CONFUSING_ORDERS, `Select Russian battle events to cancel.`)
			G.played_cards[RUSSIA].forEach(action_card)
		} else {
			prompt_card(C_CONFUSING_ORDERS, "All done.")
			button_confirm()
		}
	},
	card(card) {
		push_undo()
		set_delete(G.played_cards[RUSSIA], card)
		remove_battle_event(G.current_battle, card)
		logi(format_card(card))
		--L.num_cards_to_cancel
	},
	confirm() {
		push_undo()
		card_box_end()
		end()
	}
}

// FR #22: Poor Communications
// RULES MODIFICATION: Now the player selects a space and a random order is removed from it (as opposed to selecting an order).
// This is to prevent information leak about the identity of the order.
function get_areas_with_french_orders() {
	let areas = []
	for (let order = get_first_order(FRANCE); order <= get_last_order(FRANCE); ++order) {
		let area = get_order_location(order)
		if (area !== POOL && area !== OUT_OF_PLAY)
			set_add(areas, area)
	}
	return areas
}

P.poor_communications = {
	_begin() {
		L.selected_area = -1
		card_box_begin(C_POOR_COMMUNICATIONS)
	},
	inactive: `resolve CN76`,
	prompt() {
		if (L.selected_area === -1) {
			let areas = get_areas_with_french_orders()

			prompt_card(C_POOR_COMMUNICATIONS, `Designate an area to randomly remove a French order.`)
			if (areas.length <= 5)
				V.prompt += ` (${join_array_with_or(areas.map(format_area))})`

			areas.forEach(action_area)
		} else {
			prompt_card(C_POOR_COMMUNICATIONS, `A random French order will be removed from ${format_area(L.selected_area)}. Confirm? (cannot be undone)`)
			button_confirm()
		}
	},
	area(area) {
		push_undo()
		L.selected_area = area
	},
	confirm() {
		clear_undo()
		let orders_at_area = get_orders_at_area(FRANCE, L.selected_area)
		let order_to_remove = random(orders_at_area.length)
		remove_order(orders_at_area[order_to_remove])
		log(`Removed from ${format_area(L.selected_area)}`)
		log_masked(FRANCE, format_i(`1 ${get_order_name(orders_at_area[order_to_remove])}`), format_i(`1 random order`))
		card_box_end()
		goto("event_done", { card: C_POOR_COMMUNICATIONS })
	}
}

// FR #23: Poor Coordination
E.poor_coordination_fr = function() { return count_num_connections_used_to_enter_battle(RUSSIA, G.current_battle) > 1 }

function count_num_connections_used_to_enter_battle(who, battle) {
	return is_battle_attacker(who, battle) ? count_num_attacker_connections(battle) : count_num_defender_connections(battle)
}

P.poor_coordination_fr = function() {
	let num_connections_used = count_num_connections_used_to_enter_battle(RUSSIA, G.current_battle)
	goto("confirm_event", {
		card: C_POOR_COORDINATION_FR,
		inactive: `outperform the poorly coordinated Russian forces`,
		sequence: [{
			prompt: `Reduce the Russian combat value by ${2 * num_connections_used} for ${num_connections_used} connections used to enter battle.`,
			log_text: `Russian combat value -${2 * num_connections_used}`
		}]
	})
}

// FR #24: Jérôme Goes Home -- see draw_card_to_hand (must-play event)

// FR #25: Good Leadership
P.may_play_good_leadership = function() {
	goto("may_play_event", { event: C_GOOD_LEADERSHIP })
}

function could_change_order_with_good_leadership() {
	for (let order = get_first_order(FRANCE); order <= get_last_order(FRANCE); ++order) {
		if (
			get_order_location(order) !== POOL && get_order_location(order) !== OUT_OF_PLAY
			&& has_french_sp(get_order_location(order))
			&& get_order_type(order) !== DUMMY_ORDER
		) {
			return true
		}
	}
	return false
}

P.good_leadership = {
	_begin() {
		L.has_changed_order = false
	},
	inactive: "exploit unforeseen oppurtunities",
	prompt() {
		if (!L.has_changed_order) {
			prompt_card(C_GOOD_LEADERSHIP, `Choose whether to place or change an order.`)
			button("place_order")
			button("change_order", could_change_order_with_good_leadership())
		} else {
			prompt_card(C_GOOD_LEADERSHIP, `You may immediately move a leader from any area to any other area.`)
			for (let leader = get_first_leader(FRANCE); leader <= get_last_leader(FRANCE); ++leader) {
				if (is_leader_on_map(leader))
					action_leader(leader)
			}
			button_pass()
		}
	},
	place_order() {
		push_undo()
		call("good_leadership_place_order")
	},
	change_order() {
		push_undo()
		call("good_leadership_change_order")
	},
	leader(leader) {
		push_undo()
		call("good_leadership_move_leader", { leader })
	},
	pass() {
		push_undo()
		goto("event_done", { card: C_GOOD_LEADERSHIP })
	},
	_resume() {
		if (!L.has_changed_order)
			L.has_changed_order = true
		else
			goto("event_done", { card: C_GOOD_LEADERSHIP })
	}
}

P.good_leadership_place_order = {
	_begin() { L.selected_area = -1 },
	prompt() {
		if (L.selected_area === -1) {
			prompt_card(C_GOOD_LEADERSHIP, `Select a French-occupied area to place an order.`)
			// NOTE: The card states "FR-occupied areas", so this excludes areas solely occupied by French-allied Prussian and Austrian SPs!
			filter_areas(area => has_french_sp(area)).forEach(action_area)
		} else {
			prompt_card(C_GOOD_LEADERSHIP, `Select an order to place at ${format_area(L.selected_area)}.`)
			get_orders_at_area(FRANCE, POOL).filter(order => get_order_type(order) !== DUMMY_ORDER).forEach(action_order)
		}
	},
	area(area) {
		push_undo()
		L.selected_area = area
	},
	order(order) {
		push_undo()
		place_order(order, L.selected_area)

		log("Placed")
		logi(`${format_area(L.selected_area)}`)
		log_masked(FRANCE, format_ii(`${get_order_name(order)}`), format_ii(`French order`))

		end()
	}
}

P.good_leadership_change_order = {
	_begin() { L.selected_area = -1 },
	prompt() {
		if (L.selected_area === -1) {
			prompt_card(C_GOOD_LEADERSHIP, `Select an order to change.`)
			for (let order = get_first_order(FRANCE); order <= get_last_order(FRANCE); ++order) {
				// NOTE: The card states "FR-occupied areas", so this excludes areas solely occupied by French-allied Prussian and Austrian SPs!
				if (
					get_order_location(order) !== POOL && get_order_location(order) !== OUT_OF_PLAY
					&& has_french_sp(get_order_location(order))
					&& get_order_type(order) !== DUMMY_ORDER
				)
					action_order(order)
			}
		} else {
			prompt_card(C_GOOD_LEADERSHIP, `Select an order to place at ${format_area(L.selected_area)}.`)
			get_orders_at_area(FRANCE, POOL).filter(order => get_order_type(order) !== DUMMY_ORDER).forEach(action_order)
		}
	},
	order(order) {
		push_undo()
		if (L.selected_area === -1) {
			L.selected_area = get_order_location(order)
			remove_order(order)
			log_masked(FRANCE, `Removed from ${format_area(L.selected_area)}`, `Changed at ${format_area(L.selected_area)}`)
			log_only(FRANCE, format_i(`${get_order_name(order)}`))
		} else {
			place_order(order, L.selected_area)
			log_only(FRANCE, `Placed`)
			log_masked(FRANCE, format_i(`${get_order_name(order)}`, format_i(`French order`)))
			end()
		}
	}
}

P.good_leadership_move_leader = {
	// L.leader
	prompt() {
		V.prompt = `Select a destination to move ${format_leader(L.leader)}.`
		filter_areas(area => has_friendly_troop(FRANCE, area) && area !== get_leader_location(L.leader)).forEach(action_area)
	},
	area(area) {
		push_undo()
		let needs_to_determine_seniority = false
		if (has_friendly_leader(G.active, area))
			needs_to_determine_seniority = get_leader_seniority(get_seniormost_leader(G.active, area)) === get_leader_seniority(L.leader)
		move_leader(L.leader, area)

		log("Moved")
		logi(format_leader(L.leader))
		logii(`${format_area(area)}`)

		// Add leader to the first force that entered the battle.
		if (has_battle(area))
			set_add(get_player_battle_data(G.active, area).forces[0].leaders, L.leader)
		// Player must determine seniority if the leader who just moved has the same seniority as the previous commanding leader.
		if (needs_to_determine_seniority)
			goto("determine_seniority", { area })
		else
			end()
	}
}

// FR #26: Combined Arms
E.combined_arms = function() { return has_leader_in_battle(FRANCE, G.current_battle) }

P.combined_arms = function() {
	goto("confirm_event", {
		card: C_COMBINED_ARMS,
		inactive: `organize a combined ${is_battle_attacker(FRANCE, G.current_battle) ? "attack" : "defense"}`,
		sequence: [
			{
				prompt: `The combat value of up to 1 Cavalry SP and 3 Infantry SPs are doubled.`,
				log_text: `Up to 1 Cavalry SP and 3 Infantry SPs fight X2.`
			},
			{
				pred: is_battle_event_active(G.current_battle, C_INFANTRY_SQUARES_RU),
				prompt: `Cancels the effect of ${format_card(C_INFANTRY_SQUARES_RU)}.`,
				log_text: `Cancels ${format_card(C_INFANTRY_SQUARES_RU)}.`
			}
		]
	})
}

// FR #27: Confusions & Delays
E.confusions_and_delays = function() { return is_battle_defender(FRANCE, G.current_battle) }

P.confusions_and_delays = function() {
	goto("confirm_event", {
		card: C_CONFUSIONS_AND_DELAYS,
		inactive: `escape in good order`,
		sequence: [
			{
				prompt: "Reduce French losses by 2, and Russian losses by 1.",
				log_text: `French losses -2.\nRussian losses -1.`
			},
			{
				prompt: `The French must retreat after this battle, which is considered tied.`,
				log_text: `France must retreat after battle.`
			}
		]
	})
}

// FR #28: Saint–Cyr's VI Corps
E.saint_cyrs_vi_corps = function() { return is_battle_defender(FRANCE, G.current_battle) }

P.saint_cyrs_vi_corps = {
	_begin() { L.has_placed_defend = false },
	prompt() {
		if (!L.has_placed_defend) {
			if (has_order_of_type(FRANCE, DEFEND, POOL)) {
				prompt_card(C_SAINT_CYRS_VI_CORPS, `Place a Defend order at ${format_area(G.current_battle)}.`)
				action_area(G.current_battle)
			} else {
				prompt_card(C_SAINT_CYRS_VI_CORPS, "No Defend orders in pool to place.")
				button_next()
			}
		} else {
			prompt_card(C_SAINT_CYRS_VI_CORPS, "The combat value of up to 2 Infantry SPs is doubled.")
			button_confirm()
		}
	},
	area(area) {
		push_undo()
		add_order_of_type_from_pool(FRANCE, DEFEND, area)
		log(`Placed 'Defend' order at ${format_area(G.current_battle)}.`)
		L.has_placed_defend = true
	},
	next() {
		push_undo()
		log("No Defend order in pool to place.")
		L.has_placed_defend = true
	},
	confirm() {
		push_undo()
		log("The combat value of up to 2 Infantry SPs is doubled.")
		end()
	}
}

// FR #29: Eblé's Pontoneers
E.ebles_pontoneers = function() { return has_leader_in_battle(FRANCE, G.current_battle) }

P.ebles_pontoneers = function() {
	goto("confirm_event", {
		card: C_EBLES_PONTONEERS,
		inactive: `use its capable Engineer Corps`,
		sequence: [{
			prompt: "No penalties for attacking across a river.",
			log_text: "No penalties for attacking across a river."
		}]
	})
}

// FR #30 Stubborn Rearguard -- see RU #23 Stubborn Rereaguard

// FR #31: The Imperial Guard
E.the_imperial_guard = function() { return is_leader_in_battle(L_NAPOLEON, G.current_battle) }

P.the_imperial_guard = function() {
	goto("confirm_event", {
		card: C_THE_IMPERIAL_GUARD,
		inactive: `commit the Imperial Guard`,
		sequence: [
			{
				prompt: `The combat value of all Imperial Guard SPs are X3, instead of X1,5.`,
				log_text: `All Guard SPs fight at X3.`
			},
			{
				prompt: `If Russia wins the battle, France must discard a random card, and Russia gains +2 VP.`,
				log_text: "If Russia wins, France must discard a random card, and lose 2 VP."
			}
		]
	})
}

// FR #32 Delayed Forces -- see RU #40 Delayed Forces

// FR #33: Napoléon's Marshals
E.napoleons_marshals = function() { return has_leader_in_battle(FRANCE, G.current_battle) }

P.napoleons_marshals = function() {
	goto("confirm_event", {
		card: C_NAPOLEONS_MARSHALS,
		inactive: `play ${format_card(C_NAPOLEONS_MARSHALS)}`,
		sequence: [
			{
				prompt: `Rally 1 exhausted SP before determining losses.`,
				log_text: `Rally 1 exhausted SP before determining losses.`
			},
			{
				prompt: `Draw a card to your hand if you win the battle.`,
				log_text: `France draws an additional card if it wins the battle.`
			}
		]
	})
}

// FR #34: Fierce Fighting
E.fierce_fighting_fr = function() { return has_leader_in_battle(FRANCE, G.current_battle) }

P.fierce_fighting_fr = function() {
	goto("confirm_event", {
		card: C_FIERCE_FIGHTING_FR,
		inactive: `inflict massive casualties on the Russians`,
		sequence: [
			{
				prompt: `Increase French losses by 1, and Russian losses by 2.`,
				log_text: `French losses +1.\nRussian losses +2.`
			},
			{
				pred: has_leader_in_battle(RUSSIA, G.current_battle),
				prompt: `Russia must eliminate ${join_array_with_or(get_leaders_at_area(RUSSIA, G.current_battle).map(format_leader))}.`,
				log_text: `Russia must eliminate a leader.`
			}
		]
	})
}

// FR #35: Ney's III Corps
E.neys_iii_corps = function() { return has_leader_in_battle(FRANCE, G.current_battle) }

P.neys_iii_corps = function() {
	goto("confirm_event", {
		card: C_NEYS_III_CORPS,
		inactive: `play ${format_card(C_NEYS_III_CORPS)}`,
		sequence: [
			{
				prompt: `Double the combat value of up to 3 French Infantry SPs.`,
				log_text: `Up to 3 French Infantry SPs fight at X2.`
			},
			{
				prompt: `Rally one exhausted SP after the battle.`,
				log_text: `French rallies an exhausted SP after battle.`
			}
		]
	})
}

// FR #36: Eugène's IV Corps
E.eugenes_iv_corps = function() { return is_leader_in_battle(L_DE_BEAUHARNAIS, G.current_battle) }

P.eugenes_iv_corps = function() {
	goto("confirm_event", {
		card: C_EUGENES_IV_CORPS,
		inactive: `commit the Italian IV corps`,
		sequence: [{
			prompt: `Double the combat value of up to 3 French Infantry SPs.`,
			log_text: `Up to 3 French Infantry SPs fight at X2.`,
		}]
	})
}

// FR #37: Poniatowski's V Corps
function is_exhausted_infantry(type) {
	return is_infantry(type) && is_troop_type_exhausted(type)
}

function count_num_exhausted_infantry(who, area) {
	if (!has_troop(area)) return 0

	let count = 0
	for (let entry of get_area_troop_set(area, null)) {
		if ((decode_troop_entry_who(entry) === who) && is_exhausted_infantry(decode_troop_entry_type(entry)))
			count += decode_troop_entry_num(entry)
	}
	return count
}

P.may_play_poniatowskis_v_corps = function() {
	goto("may_play_event", { event: C_PONIATOWSKIS_V_CORPS })
}

P.poniatowskis_v_corps = {
	_begin() {
		L.has_exhausted_infantry_sp = [EXHAUSTED_INFANTRY, EXHAUSTED_PRUSSIAN_INFANTRY, EXHAUSTED_AUSTRIAN_INFANTRY].some(type => G.move.sps[type] > 0)
		L.has_rallied = false

		L.count = 0
		for (let type = 0; type < G.move.sps.length; ++type) {
			if (is_exhausted_infantry(type) && G.move.sps[type] > 0)
				L.count += G.move.sps[type]
		}
		L.count = Math.min(2, L.count)

		log("Rallied")
		logi(format_area(G.move.path[G.move.path.length - 1]))
	},
	inactive: `benefit from Polish support`,
	prompt() {
		if (!L.has_exhausted_infantry_sp) {
			prompt_card(C_PONIATOWSKIS_V_CORPS, "No exhausted Infantry in the moving force.")
			button_pass()
		} else if (L.count > 0) {
			prompt_card(C_PONIATOWSKIS_V_CORPS, `Rally exhausted Infantry in the moving force: ${L.count} remaining.`)
			for (let type = 0; type < G.move.sps.length; ++type) {
				if (is_exhausted_infantry(type) && G.move.sps[type] > 0)
					action_troop_alt(type, G.move.path[G.move.path.length - 1], FULL_STRENGTH, POOL, 1)
			}
		}
	},
	troop(entry) {
		push_undo()
		let type = decode_troop_action_type(entry)
		let area = decode_troop_action_area(entry)

		rally_troop(G.active, area, type)
		G.move.sps[type]--
		G.move.sps[type - 1]++

		logii(`1 ${get_troop_type_name(type)}`)
		if (--L.count === 0)
			goto("event_done", { card: C_PONIATOWSKIS_V_CORPS })
	},
	pass() {
		push_undo()
		logii("Nothing")
		goto("event_done", { card: C_PONIATOWSKIS_V_CORPS })
	}
}

// FR #38: Inferior Gunpowder
E.inferior_gunpowder = function() { return is_battle_defender(FRANCE, G.current_battle) }

P.inferior_gunpowder = function() {
	goto("confirm_event", {
		card: C_INFERIOR_GUNPOWDER,
		inactive: `benefit from poor Russian training`,
		sequence: [{
			prompt: `Halve the combat value of up to 8 Russian Infantry SPs.`,
			log_text: `Up to 8 Russian Infantry SPs fight X0,5.`
		}]
	})
}

// FR #39 Chaos in the Rear Areas (must-play event) -- see draw_card_to_hand

// FR #40 Vulnerable Supply Lines (must-play event) -- see draw_card_to_hand

// FR #41 Freezing Weather (must-play event) -- see draw_card_to_hand

// FR #42 Extreme Weather (must-play event) -- see draw_card_to_hand

// FR #43 Logistics Collapse -- see draw_card_to_hand

// FR #44 Chaotic Food Distribution -- see draw_card_to_hand

// FR #45: Much Needed Victuals
P.much_needed_victuals = {
	_begin() {
		L.selected_area = -1
		L.num_sps_rallied = 0
	},
	prompt() {
		if (L.selected_area === -1) {
			if (has_depot_on_map(FRANCE)) {
				prompt_card(C_MUCH_NEEDED_VICTUALS, `Remove a depot from map.`)
				if (count_num_french_depots_on_map() <= 5)
					V.prompt += ` ${join_array_with_or(get_areas_with_depots(FRANCE).map(format_area))}`

				for (let depot = get_first_depot(FRANCE); depot <= get_last_depot(FRANCE); ++depot)
					if (is_depot_on_map(depot))
						action_depot(depot)
			} else {
				prompt_card(C_MUCH_NEEDED_VICTUALS, `No depots on map.`)
				button_pass()
			}
		} else if (L.num_sps_rallied < 2 && count_num_exhausted_infantry(FRANCE, L.selected_area) > 0) {
			V.prompt = `Rally ${2 - L.num_sps_rallied} exhausted Infantry at ${format_area(L.selected_area)}.`
			for (let type of get_all_exhausted_sp_types(FRANCE, L.selected_area))
				action_troop_alt(type, L.selected_area)
		} else {
			prompt_card(C_MUCH_NEEDED_VICTUALS, `Attrition will not be checked at ${format_area(L.selected_area)}`)
			button_confirm()
		}
	},
	depot(depot) {
		push_undo()
		L.selected_area = get_depot_location(depot)
		remove_depot(depot, get_depot_location(depot))
		log("Rallied")
		if (count_num_exhausted_infantry(FRANCE, L.selected_area) === 0)
			logi("Nothing")
	},
	pass() {
		push_undo()
		end()
	},
	troop(entry) {
		push_undo()
		let type = decode_troop_action_type(entry)
		rally_troop(FRANCE, L.selected_area, type)
		logi(`1 ${get_troop_type_name(type)}`)
		++L.num_sps_rallied
	},
	confirm() {
		push_undo()
		add_persistent_event(C_MUCH_NEEDED_VICTUALS, { area: L.selected_area })
		log(`No Attrition at ${format_area(L.selected_area)}.`)
		goto("event_done", { card: C_MUCH_NEEDED_VICTUALS })
	}
}

// FR #46: Energetic Leadership
P.may_play_energetic_leadership = function() {
	goto("may_play_event", { event: C_ENERGETIC_LEADERSHIP, info: { type: L.type } })
}

P.energetic_leadership = script(`
	call energetic_leadership_confirm { type: L.type }
	call draw_card_to_hand
	set L.L.$ FRANCE
	goto event_done { card: C_ENERGETIC_LEADERSHIP }
`)

P.energetic_leadership_confirm = {
	// L.type
	inactive: `escape Russian maneuvers`,
	prompt() {
		prompt_card(C_ENERGETIC_LEADERSHIP, `France resolves ${get_order_type_name(L.type)} orders first this turn.`)
		button_confirm()
	},
	confirm() {
		log(`France resolves ${get_order_type_name(L.type)} orders first this turn.`)
		end()
	}
}

// FR #47: Inferior Musketry
E.inferior_musketry = function() { return is_battle_defender(FRANCE, G.current_battle) }

P.inferior_musketry = function() {
	goto("confirm_event", {
		card: C_INFERIOR_MUSKETRY,
		inactive: `escape from the poorly-trained Russians`,
		sequence: [{
			prompt: `French losses are reduced by 1.`,
			log_text: `French losses -1.`
		}]
	})
}

// FR #48 Napoléon Returns to Paris
E.napoleon_returns_to_paris = function() { return is_leader_on_map(L_NAPOLEON) }

P.may_play_napoleon_returns_to_paris = function() {
	goto("may_play_event", { event: C_NAPOLEON_RETURNS_TO_PARIS })
}

P.napoleon_returns_to_paris = {
	prompt() {
		prompt_card(C_NAPOLEON_RETURNS_TO_PARIS, `Remove ${format_leader(L_NAPOLEON)} from ${format_area(get_leader_location(L_NAPOLEON))} at no cost.`)
		action_leader(L_NAPOLEON)
	},
	leader(_) {
		push_undo()
		log(`Removed from ${format_area(get_leader_location(L_NAPOLEON))}`)
		move_leader(L_NAPOLEON, POOL)
		logi(format_leader(L_NAPOLEON))
		goto("event_done", { card: C_NAPOLEON_RETURNS_TO_PARIS })
	}
}

// FR #49 Tough Rearguard
P.may_play_tough_rearguard = function() {
	goto("may_play_event", { event: C_TOUGH_REARGUARD })
}

P.tough_rearguard = function() {
	goto("confirm_event", {
		card: C_TOUGH_REARGUARD,
		inactive: `deliver a sharp rebuff on the Russians`,
		sequence: [
			{
				prompt: `Forces using this Evade order suffer no exhaustion.`,
				log_text: `France suffers no exhaustion.`
			},
			{
				prompt: `Inflict one exhaustion on Russian when evading.`,
				log_text: `1 exhaustion is infliction on Russia`,
			}
		],
		persistent: true,
	})
}

P.apply_tough_rearguard = {
	inactive() { return `assign exhaustion from ${format_card(C_TOUGH_REARGUARD)}` },
	prompt() {
		if (has_fresh_sp(G.active, L.area)) {
			prompt_card(C_TOUGH_REARGUARD, `Exhaust an SP at ${format_area(L.area)}.`)
			for (let type of get_all_fresh_sp_types(G.active, L.area))
				action_troop_alt(type, L.area)
		} else {
			prompt_card(C_TOUGH_REARGUARD, `No fresh SPs to exhaust.`)
			button_confirm()
		}
	},
	troop(entry) {
		push_undo()
		let type = decode_troop_action_type(entry)
		exhaust_sp(G.active, L.area, type)
		logi("Exhausted")
		log_only(RUSSIA, format_ii(`1 Russian ${get_troop_type_name(type)}`))
		log_only(FRANCE, format_ii(`1 Russian SP`))
		goto("event_done", { card: C_TOUGH_REARGUARD })
	},
	confirm() {
		push_undo()
		goto("event_done", { card: C_TOUGH_REARGUARD })
	},
	_end() { map_delete(G.persistent_events, C_TOUGH_REARGUARD) },
}

// FR #50: Courage of Desperation
E.courage_of_desperation = function() { return get_who_has_initiative() === RUSSIA }

P.courage_of_desperation = script(`
	call courage_of_desperation_rally
	call courage_of_desperation_confirm
	goto event_done { card: C_COURAGE_OF_DESPERATION }
`)

// Cannot use Rally state since this need battle specificity.
P.courage_of_desperation_rally = {
	_begin() {
		log("Rallied")
	},
	prompt() {
		if (has_exhausted_sp(G.active, G.current_battle)) {
			prompt_card(C_COURAGE_OF_DESPERATION, `Immediately Rally 1 exhausted SP.`)
			get_player_battle_data(G.active, G.current_battle).forces.forEach(force => {
				for (let type = 0; type < force.troops.length; ++type) {
					if (force.troops[type] > 0 && is_troop_type_exhausted(type))
						action_troop_alt(type, G.current_battle, force.strength, force.from)
				}
			})
		} else {
			prompt_card(C_COURAGE_OF_DESPERATION, `No exhausted SPs to rally.`)
			button_next()
		}

	},
	troop(entry) {
		let type = decode_troop_action_type(entry)
		let strength = decode_troop_action_strength(entry)
		let from = decode_troop_action_from(entry)

		battle_rally_sp(G.active, G.current_battle, type, strength, from)
		log_masked(FRANCE, `1 ${get_troop_type_name(type)}`, `1 Exh. SP`)
		end()
	},
	next() {
		push_undo()
		logi(`Nothing`)
		end()
	}
}

P.courage_of_desperation_confirm = function() {
	goto("confirm_event", {
		card: C_COURAGE_OF_DESPERATION,
		inactive: `mount a desperate defense`,
		sequence: [{
			prompt: `Up to 4 French exhausted SPs have combat value X1 instead of X0.`,
			log_text: `Up to 4 exhausted SPs fight X1.`
		}]
	})
}

// FR #51: The Old Guard
E.the_old_guard = function() { return count_num_guard(FRANCE, G.current_battle) > 0 }

P.the_old_guard = script(`
	call old_guard_confirm
	if (is_outflanking_active(enemy(G.active))) {
		goto cancel_outflanking { card: THE_OLD_GUARD }
	}
`)

P.the_old_guard_confirm = function() {
	goto("confirm_event", {
		card: C_THE_OLD_GUARD,
		inactive: `commit the powerful Old Guard`,
		sequence: [
			{
				prompt: `Imperial Guard SPs have combat value X2 instead of X1,5.`,
				log_text: `Imperial Guard SPs fight X2.`
			},
			{
				prompt: `French losses are reduced by 1.`,
				log_text: `French losses -1.`
			}
		]
	})
}

// FR #52: Ney's Escape
P.neys_escape = function() {
	goto("confirm_event", {
		card: C_NEYS_ESCAPE,
		inactive: `find a way around the Russian forces`,
		sequence: [{
			prompt: `Regardless of who wins combat, the French must retreat to ANY adjacent area without Russian SPs.`,
			log_text: `Regardless of who wins combat, the French must retreat to ANY adjacent area without Russian SPs.`
		}]
	})
}

// FR #53: Lethargic Pursuit
P.lethargic_pursuit = {
	_begin() {
		L.selected_area = -1
	},
	inactive: "exploit Kutuzov's lethargy",
	prompt() {
		if (L.selected_area === -1) {
			prompt_card(C_LETHARGIC_PURSUIT, `Designate an area. This turn, Russian forces there move, they may not enter areas containing a French leader.`)
			for (let area = FIRST_AREA; area <= LAST_AREA; ++area) {
				if (has_russian_sp(area))
					action_area(area)
			}
		} else {
			prompt_card(C_LETHARGIC_PURSUIT, `You selected ${format_area(L.selected_area)}.`)
			button_confirm()
		}
	},
	area(area) {
		push_undo()
		L.selected_area = area
	},
	confirm() {
		push_undo()
		add_persistent_event(C_LETHARGIC_PURSUIT, { area: L.selected_area })
		goto("event_done",  { card: C_LETHARGIC_PURSUIT })
	}
}

// === MISCELLANEOUS HELPERS ===
function array_count(array, callback) {
	let count = 0
	for (let item of array)
		if (callback(item))
			++count
	return count
}

function map_increment(map, key, amount = 1) {
	let current = map_get(map, key, null)
	if (current !== null)
		map_set(map, key, current + amount)
}

// Like Object.keys but for plain array maps
function map_keys(map) {
	let keys = []
	for (let i = 0; i < map.length; i += 2)
		keys.push(map[i])
	return keys
}

function map_for_each_key(map, f) {
	for (let i = 0; i < map.length; i += 2)
		f(map[i])
}

function map_for_each_value(map, f) {
	for (let i = 1; i < map.length; i += 2)
		f(map[i])
}

function roll_d6() {
	return random(6) + 1
}

// DEBUG: For quickly printing deeply nested objects (G.moved, G.battles)
// eslint-disable-next-line no-unused-vars
function print(msg) {
	console.log(JSON.stringify(msg, null, 2))
}

// === PROMPT HELPERS ===
function prompt_card(card, text) {
	V.prompt = `${format_card(card, NONE)}: ${text}`
}

function prompt_leader(leader, text) {
	V.prompt = `${format_leader(leader)}: ${text}`
}

function join_array_with(array, what) {
	switch(array.length) {
	case 1: return String(array[0])
	case 2: return String(array[0]) + " " + what + " " + String(array[1])
	default:
		var s = ""
		for (let i = 0; i < array.length - 1; ++i) {
			s = s + String(array[i]) + ", "
		}
		return s + what + " " + String(array[array.length - 1])
	}
}

function join_array_with_and(array) {
	return join_array_with(array, "and")
}

function join_array_with_or(array) {
	return join_array_with(array, "or")
}

// === ACTION/BUTTON WRAPPER FUNCTIONS ===
function button_draw(enabled = true) {
	button("draw", enabled)
}

function button_discard(enabled = true) {
	button("discard", enabled)
}

function button_pass(enabled = true) {
	 button("pass", enabled)
}

function button_next(enabled = true) {
	button("next", enabled)
}

function button_done(enabled = true) {
	button("done", enabled)
}
function button_confirm(enabled = true) {
	button("confirm", enabled)
}

function button_undo(enabled = true) {
	button("undo", enabled)
}

function button_roll(enabled = true) {
	button("roll", enabled)
}

function action_card(c) {
	action("card", c)
}

function action_area(area) {
	action("area", area)
}

function action_initiative_marker() {
	action("initiative", 0)
}

function action_vp_marker() {
	action("vp", 0)
}

function action_leader(leader) {
	action("leader", leader)
}

function button_leader(leader) {
	action("leader_button", leader)
}

function action_order(order) {
	action("order", order)
}

function action_depot(depot) {
	action("depot", depot)
}

function action_connection(from, to) {
	action("connection", find_connection(from, to))
}

function button_troop(type) {
	action("troop_button", type)
}

/*
	Since multiple SP counters with the same type but with different characteristics may be present in the same area, we bitpack additional information into the troop action's argument to identify the correct counter.
	This action format modifies the standard world.js framework's action callback in the client.

	23 bits
	1 bit 	- is the piece moving?
	1 bit 	- player 						(RUSSIA or FRANCE)
	4 bits 	- troop type 					(from FRESH_INFANTRY (0) to EXHAUSTED_AUSTRIAN_INFANTRY (11))
	1 bit 	- strength 						(HALF_STRENGTH, FULL_STRENGTH)
	8 bits 	- area 						(needs to accomodate at least 157)
	8 bit 	- area from which the SP entered 		(also needs to accomodate at least 157)
*/

const ACTION_TROOP_MOVING_MASK = 1 << 22
const ACTION_TROOP_PLAYER_MASK = 1 << 21
const ACTION_TROOP_TYPE_MASK = 1966080
const ACTION_TROOP_STRENGTH_MASK = 1 << 16
const ACTION_TROOP_AREA_MASK = 65280
const ACTION_TROOP_FROM_MASK = 255

const ACTION_TROOP_MOVING_SHIFT = 22
const ACTION_TROOP_PLAYER_SHIFT = 21
const ACTION_TROOP_TYPE_SHIFT = 17
const ACTION_TROOP_STRENGTH_SHIFT = 16
const ACTION_TROOP_AREA_SHIFT = 8
const ACTION_TROOP_FROM_SHIFT = 0

function package_troop(player, type, strength, area, from, move) {
	let m = move << ACTION_TROOP_MOVING_SHIFT
	let p = player << ACTION_TROOP_PLAYER_SHIFT
	let t = type << ACTION_TROOP_TYPE_SHIFT
	let s = strength << ACTION_TROOP_STRENGTH_SHIFT
	let a = area << ACTION_TROOP_AREA_SHIFT
	let f = from << ACTION_TROOP_FROM_SHIFT

	return m + p + t + s + a + f
}

function decode_troop_action_moving(entry) {
	return (entry & ACTION_TROOP_MOVING_MASK) >> ACTION_TROOP_MOVING_SHIFT
}

// Seems good to have for consistency
// eslint-disable-next-line no-unused-vars
function decode_troop_action_player(entry) {
	return (entry & ACTION_TROOP_PLAYER_MASK) >> ACTION_TROOP_PLAYER_SHIFT
}

function decode_troop_action_type(entry) {
	return (entry & ACTION_TROOP_TYPE_MASK) >> ACTION_TROOP_TYPE_SHIFT
}

function decode_troop_action_strength(entry) {
	return (entry & ACTION_TROOP_STRENGTH_MASK) >> ACTION_TROOP_STRENGTH_SHIFT
}

function decode_troop_action_area(entry) {
	return (entry & ACTION_TROOP_AREA_MASK) >> ACTION_TROOP_AREA_SHIFT
}

function decode_troop_action_from(entry) {
	return (entry & ACTION_TROOP_FROM_MASK) >> ACTION_TROOP_FROM_SHIFT
}

function action_troop_alt(type, area = 0, strength = FULL_STRENGTH, from = POOL, move = 0) {
	let player
	if (Array.isArray(G.active))
		player = R
	else
		player = G.active

	action("troop", package_troop(player, type, strength, area, from, move))
}

// === LOG FORMATTING ===
function get_abbreviation(who) {
	return (who === RUSSIA) ? "ru" : ((who === FRANCE) ? "fr" : "na")
}

function possessive(who) {
	return (who === RUSSIA) ? "Russian" : "French"
}

function format_card(card, highlight = get_card_owner(card)) {
	return `C${highlight === NONE ? "N" : ROLES[highlight][0]}${card}`
}

function format_leader(leader) {
	return `L${leader}`
}

function format_area(area) {
	return `S${area}`
}

function format_i(text) {
	return `>${text}`
}

function format_ii(text) {
	return `^${text}`
}

function log_h1(text, season = NONE) {
	log()
	log(`!${season === SUMMER ? "S" : (season === WINTER) ? "W" : "N" }${text}`)
	log()
}

function log_h2(text) {
	log()
	log(`@${text}`)
	log()
}

function log_h3(text) {
	log()
	log(`#${text}`)
	log()
}

function log_h4(text, who = BOTH) {
	log()
	log(`$${get_abbreviation(who)}${text}`)
}

function log_h5(text) {
	log("%" + text)
}

function logi(text) {
	log(`${format_i(text)}`)
}

function logii(text) {
	log(`${format_ii(text)}`)
}

function log_italic(text) {
	log("&" + text)
}

function log_card(card, who = get_card_owner(card)) {
	log(format_card(card, who))
}

function card_box_begin(card) {
	log_box_begin(format_card(card, NONE), get_card_owner(card))
}

function card_box_end() {
	log_box_end()
}

function log_box_begin(text, who) {
	log()
	log(`{${who === RUSSIA ? "ru" : "fr"}${text}`)
}

function log_battle_roll(roll, who) {
	log(`${ROLES[who]} rolled battle_${get_abbreviation(who)}${roll}.`)
}

function log_box_end() {
	log("}")
}

function log_only(who, text) {
	if (who === RUSSIA) log_russia_only(text)
	else if (who === FRANCE) log_france_only(text)
}

function log_russia_only(text) {
	log("HR" + text)
}

function log_france_only(text) {
	log("HF" + text)
}

function log_masked(who, text1, text2) {
	log_only(who, text1)
	log(`E${who === FRANCE ? "F" : "R"}` + text2)
}

// === TESTS & ASSERTIONS ===
// NOTE: Only runs in the fuzzer!

function on_assert() {
	assert_troop_entries()
	// TODO
	// assert_lone_leaders()
}

// Test invariant for G.sps: Each area has exactly one entry for each player & type.
function assert_troop_entries() {
	map_for_each(G.sps, (area, entries) => {
		for (let entry of entries) {
			if (array_count(entries, item => (decode_troop_entry_who(item) === decode_troop_entry_who(entry)) && (decode_troop_entry_type(item) === decode_troop_entry_type(entry))) > 1)
				throw new Error(`Multiple entries of ${ROLES[decode_troop_entry_who(entry)]} ${get_troop_type_name(decode_troop_entry_type(entry))} found at (${area}).`)
		}
	})
}

// TODO
// Leaders are immediately eliminated if they do not have any SPs with them.
function assert_lone_leaders() {
	if (TURN_PHASES.indexOf("resolve_battles") === G.phase || L === null)
		return

	for (let who = RUSSIA; who <= FRANCE; ++who) {
		for (let leader = get_first_leader(who); leader <= get_last_leader(who); ++leader) {
			if (is_leader_on_map(leader) && !has_friendly_troop(who, get_leader_location(leader)))
				throw new Error(`${get_leader_short_name(leader)} is alone without SPs at ${get_area_name(get_leader_location(leader))}.`)
		}
	}
}

// === COMMON FRAMEWORK - DO NOT EDIT ===
function log(s) {
	if (s === undefined) {
		if (G.log.length > 0 && G.log[G.log.length - 1] !== "")
			G.log.push("")
	} else {
		G.log.push(s)
	}
}

function prompt(s) {
	V.prompt = s
}

function button(action, enabled = true) {
	V.actions[action] = !!enabled | 0
}

function action(action, argument) {
	if (!(action in V.actions))
		V.actions[action] = []
	set_add(V.actions[action], argument)
}

function finish(result, message) {
	G.active = -1
	G.result = ROLES[result] ?? result
	G.L = L = { message }
	log()
	log(message)
}

function call_or_goto(pred, name, env) {
	if (pred)
		call(name, env)
	else
		goto(name, env)
}

function call(name, env) {
	G.L = L = { ...env, P: name, I: 0, L: L }
	P[name]?._begin?.()
}

function goto(name, env) {
	P[L.P]?._end?.()
	G.L = L = { ...env, P: name, I: 0, L: L.L }
	P[name]?._begin?.()
}

function end(result) {
	P[L.P]?._end?.()
	G.L = L = L.L
	if (result !== undefined)
		L.$ = result
	P[L.P]?._resume?.()
}

function resume() {
	P[L.P]?._resume?.()
}

exports.roles ??= ROLES

exports.scenarios ??= (typeof SCENARIOS !== "undefined") ? SCENARIOS : [ "Standard" ]

exports.setup = function (seed, scenario, options) {
	G = {
		active: null,
		seed,
		log: [],
		undo: [],
	}
	L = null
	R = null
	V = null

	on_setup(scenario, options)
	_run()
	_save()

	return G
}

exports.static_view = function (game) {
	var SV = null
	if (typeof on_static_view === "function") {
		G = state
		L = null
		R = role
		V = null
		_load()
		SV = on_static_view()
		_save()
	}
	return SV
}

exports.view = function (state, role) {
	G = state
	L = G.L
	R = role
	V = {
		log: G.log,
		prompt: null,
	}

	if ((Array.isArray(G.active) && G.active.includes(R)) || G.active === R) {
		_load()
		on_view()

		V.actions = {}

		try {
			if (P[L.P])
				P[L.P].prompt()
			else
				V.prompt = "TODO: " + L.P
		} catch (x) {
			console.error(x)
			V.prompt = x.toString()
		}

		if (V.actions.undo === undefined)
			button("undo", G.undo?.length > 0)

		_save()
	} else {
		_load()
		on_view()
		_save()

		if (G.active === "None") {
			V.prompt = L.message
		} else {
			var inactive = P[L.P]?.inactive
			if (inactive) {
				// NOTE: Modified to support functions since some multi-active states can involve players playing events.
				if (typeof inactive === "function") {
					if (Array.isArray(G.active) && G.active.length > 1)
						V.prompt = `Waiting for ${G.active.join(" and ")} to ${inactive()}.`
					else if (Array.isArray(G.active))
						V.prompt = `Waiting for ${G.active[0]} to ${inactive()}.`
					else
						V.prompt = `Waiting for ${G.active} to ${inactive()}.`
				} else {
					if (Array.isArray(G.active))
						V.prompt = `Waiting for ${G.active.join(" and ")} to ${inactive}.`
					else
						V.prompt = `Waiting for ${G.active} to ${inactive}.`
				}

			} else {
				if (Array.isArray(G.active))
					V.prompt = `Waiting for ${G.active.join(" and ")}.`
				else
					V.prompt = `Waiting for ${G.active}.`
			}
		}
	}

	return V
}

exports.action = function (state, role, action, argument) {
	G = state
	L = G.L
	R = role
	V = null

	var old_active = G.active

	_load()

	var this_state = P[L.P]
	if (this_state && typeof this_state[action] === "function") {
		this_state[action](argument)
		_run()
	} else if (action === "undo" && G.undo.length > 0) {
		pop_undo()
	} else {
		throw new Error("Invalid action: " + action)
	}

	_save()

	if (old_active !== G.active)
		clear_undo()

	return G
}

exports.finish = function (state, result, message) {
	G = state
	L = G.L
	R = null
	V = null

	_load()
	finish(result, message)
	_save()

	return G
}

exports.query = function (state, role, q) {
	G = state
	L = G.L
	R = role
	V = null

	_load()
	var result = on_query(q)
	_save()

	return result
}

exports.assert = function (state) {
	if (typeof on_assert === "function") {
		G = state
		L = G.L
		R = null
		V = null
		_load()
		on_assert()
		_save()
	}
}

function _load() {
	R = ROLES.indexOf(R)
	if (Array.isArray(G.active))
		G.active = G.active.map(r => ROLES.indexOf(r))
	else
		G.active = ROLES.indexOf(G.active)
}

function _save() {
	if (Array.isArray(G.active))
		G.active = G.active.map(r => ROLES[r])
	else
		G.active = ROLES[G.active] ?? "None"
}

function _run() {
	for (var i = 0; i < 1000 && L; ++i) {
		var prog = P[L.P]
		if (typeof prog === "function") {
			prog()
		} else if (Array.isArray(prog)) {
			if (L.I < prog.length) {
				try {
					prog[L.I++]()
				} catch (err) {
					err.message += "\n\tat P." + L.P + ":" + L.I
					throw err
				}
			} else {
				end()
			}
		} else {
			return // state
		}
	}
	if (L)
		throw new Error("runaway script")
}

function _parse(text) {
	var prog = []

	function lex(s) {
		var words = []
		var p = 0, n = s.length, m

		function lex_flush() {
			if (words.length > 0) {
				command(words)
				words = []
			}
		}

		function lex_newline() {
			while (p < n && s[p] === "\n")
				++p
			lex_flush()
		}

		function lex_semi() {
			++p
			lex_flush()
		}

		function lex_comment() {
			while (p < n && s[p] !== "\n")
				++p
		}

		function lex_word() {
			while (p < n && !" \t\n".includes(s[p]))
				++p
			words.push(s.substring(m, p))
		}

		function lex_qstring(q) {
			var x = 1
			++p
			while (p < n && x > 0) {
				if (s[p] === q)
					--x
				++p
			}
			if (p >= n && x > 0)
				throw new Error("unterminated string")
			words.push(s.substring(m, p))
		}

		function lex_bstring(a, b) {
			var x = 1
			++p
			while (p < n && x > 0) {
				if (s[p] === a)
					++x
				else if (s[p] === b)
					--x
				++p
			}
			if (p >= n && x > 0)
				throw new Error("unterminated string")
			words.push(s.substring(m, p))
		}

		while (p < n) {
			while (s[p] === " " || s[p] === "\t")
				++p
			if (p >= n) break
			m = p
			if (s[p] === "{") lex_bstring("{", "}")
			else if (s[p] === "[") lex_bstring("[", "]")
			else if (s[p] === "(") lex_bstring("(", ")")
			else if (s[p] === '"') lex_qstring('"')
			else if (s[p] === "\n") lex_newline()
			else if (s[p] === ";") lex_semi()
			else if (s[p] === "#") lex_comment()
			else if (s[p] === "/" && s[p+1] === "/") lex_comment()
			else if (s[p] === "-" && s[p+1] === "-") lex_comment()
			else lex_word()
		}

		if (words.length > 0)
			command(words)
	}

	function command(line) {
		var ix_loop, ix1, ix2
		var i, k, start, end, array, body

		switch (line[0]) {
		case "set":
			if (line.length !== 3)
				throw new Error("invalid set - " + line.join(" "))
			emit(line[1] + " = " + line[2])
			break

		case "incr":
			if (line.length !== 2)
				throw new Error("invalid incr - " + line.join(" "))
			emit("++(" + line[1] + ")")
			break

		case "decr":
			if (line.length !== 2)
				throw new Error("invalid decr - " + line.join(" "))
			emit("--(" + line[1] + ")")
			break

		case "eval":
			emit(line.slice(1).join(" "))
			break

		case "log":
			emit("log(" + line.slice(1).join(" ") + ")")
			break

		case "call":
			if (line.length === 3)
				emit("call(" + quote(line[1]) + ", " + line[2] + ")")
			else if (line.length === 2)
				emit("call(" + quote(line[1]) + ")")
			else
				throw new Error("invalid call - " + line.join(" "))
			break

		case "goto":
			if (line.length === 3)
				emit("goto(" + quote(line[1]) + ", " + line[2] + ")")
			else if (line.length === 2)
				emit("goto(" + quote(line[1]) + ")")
			else
				throw new Error("invalid goto - " + line.join(" "))
			break

		case "return":
			if (line.length === 1)
				emit(`end()`)
			else if (line.length === 2)
				emit(`end(${line[1]})`)
			else
				throw new Error("invalid return - " + line.join(" "))
			break

		case "while":
			// while (exp) { block }
			if (line.length !== 3)
				throw new Error("invalid while - " + line.join(" "))
			ix_loop = emit_jz(line[1])
			block(line[2])
			emit_jump(ix_loop)
			label(ix_loop)
			break

		case "for":
			// for i in (start) to (end) { block }
			if (line.length === 7 && line[2] === "in" && line[4] === "to") {
				i = line[1]
				start = line[3]
				end = line[5]
				body = line[6]
				emit(`${i} = ${start}`)
				ix_loop = prog.length
				block(body)
				emit(`if ((${i}) < ${end}) { ++(${i}); L.I = ${ix_loop} }`)
				return
			}
			// for i in (array) { block }
			// NOTE: array is evaluated repeatedly so should be a constant!
			else if (line.length === 5 && line[2] === "in") {
				k = line[1]
				i = k.replace(/^G\./, "L.G_") + "_"
				array = line[3]
				body = line[4]
				emit(`${i} = 0`)
				ix_loop = emit(`if (${i} < ${array}.length) { ${k} = ${array}[${i}++] } else { delete ${i} ; L.I = @ }`)
				block(body)
				emit_jump(ix_loop)
				label(ix_loop)
			} else {
				throw new Error("invalid for - " + line.join(" "))
			}
			break

		case "if":
			// if (exp) { block}
			// if (exp) { block } else { block }
			// TODO: if (exp) { block } elseif (exp) { block } else { block }
			ix1, ix2
			if (line.length === 3) {
				ix1 = emit_jz(line[1])
				block(line[2])
				label(ix1)
			} else if (line.length === 5 && line[3] === "else") {
				ix1 = emit_jz(line[1])
				block(line[2])
				ix2 = emit_jump()
				label(ix1)
				block(line[4])
				label(ix2)
			} else {
				throw new Error("invalid if - " + line.join(" "))
			}
			break

		default:
			throw new Error("unknown command - " + line.join(" "))
		}
	}

	function quote(s) {
		if ("{[(`'\"".includes(s[0]))
			return s
		return '"' + s + '"'
	}

	function emit_jz(exp, to = "@") {
		return emit("if (!(" + exp + ")) L.I = " + to)
	}

	function emit_jump(to = "@") {
		return emit("L.I = " + to)
	}

	function emit(s) {
		prog.push(s)
		return prog.length - 1
	}

	function label(ix) {
		prog[ix] = prog[ix].replace("@", prog.length)
	}

	function block(body) {
		if (body[0] !== "{")
			throw new Error("expected block")
		lex(body.slice(1, -1))
	}

	lex(text)

	return prog
}

function script(text) {
	return text
}

(function _compile() {
	var cache = {}
	for (var name in P) {
		if (typeof P[name] === "string") {
			var prog = []
			try {
				for (var inst of _parse(P[name])) {
					try {
						prog.push(cache[inst] ??= eval("(function(){" + inst + "})"))
					} catch (err) {
						err.message += "\n\tat (" + inst + ")"
						throw err
					}
				}
			} catch (err) {
				err.message += "\n\tat P." + name
				throw err
			}
			P[name] = prog
		}
	}
})()

/* LIBRARY */

function clear_undo() {
	if (G.undo) {
		G.undo.length = 0
	}
}

function push_undo() {
	var copy, k, v
	if (G.undo) {
		copy = {}
		for (k in G) {
			v = G[k]
			if (k === "undo")
				continue
			else if (k === "log")
				v = v.length
			else if (typeof v === "object" && v !== null)
				v = object_copy(v)
			copy[k] = v
		}
		G.undo.push(copy)
	}
}

function pop_undo() {
	if (G.undo) {
		var save_log = G.log
		var save_undo = G.undo
		G = save_undo.pop()
		save_log.length = G.log
		G.log = save_log
		G.undo = save_undo
	}
}

function random(range) {
	// An MLCG using integer arithmetic with doubles.
	// https://www.ams.org/journals/mcom/1999-68-225/S0025-5718-99-00996-5/S0025-5718-99-00996-5.pdf
	// m = 2**35 − 31
	return (G.seed = G.seed * 200105 % 34359738337) % range
}

function random_bigint(range) {
	// Largest MLCG that will fit its state in a double.
	// Uses BigInt for arithmetic, so is an order of magnitude slower.
	// https://www.ams.org/journals/mcom/1999-68-225/S0025-5718-99-00996-5/S0025-5718-99-00996-5.pdf
	// m = 2**53 - 111
	return (G.seed = Number(BigInt(G.seed) * 5667072534355537n % 9007199254740881n)) % range
}

function shuffle(list) {
	// Fisher-Yates shuffle
	var i, j, tmp
	for (i = list.length - 1; i > 0; --i) {
		j = random(i + 1)
		tmp = list[j]
		list[j] = list[i]
		list[i] = tmp
	}
}

function shuffle_bigint(list) {
	// Fisher-Yates shuffle
	var i, j, tmp
	for (i = list.length - 1; i > 0; --i) {
		j = random_bigint(i + 1)
		tmp = list[j]
		list[j] = list[i]
		list[i] = tmp
	}
}

// Fast deep copy for objects without cycles
function object_copy(original) {
	var copy, i, n, v
	if (Array.isArray(original)) {
		n = original.length
		copy = new Array(n)
		for (i = 0; i < n; ++i) {
			v = original[i]
			if (typeof v === "object" && v !== null)
				copy[i] = object_copy(v)
			else
				copy[i] = v
		}
		return copy
	} else {
		copy = {}
		for (i in original) {
			v = original[i]
			if (typeof v === "object" && v !== null)
				copy[i] = object_copy(v)
			else
				copy[i] = v
		}
		return copy
	}
}

// Fast deep object comparison for objects without cycles
function object_diff(a, b) {
	var i, key
	var a_length
	if (a === b)
		return false
	if (a !== null && b !== null && typeof a === "object" && typeof b === "object") {
		if (Array.isArray(a)) {
			if (!Array.isArray(b))
				return true
			a_length = a.length
			if (b.length !== a_length)
				return true
			for (i = 0; i < a_length; ++i)
				if (object_diff(a[i], b[i]))
					return true
			return false
		}
		for (key in a)
			if (object_diff(a[key], b[key]))
				return true
		for (key in b)
			if (!(key in a))
				return true
		return false
	}
	return true
}

// Array remove and insert (faster than splice)

function array_delete(array, index) {
	var i, n = array.length
	for (i = index + 1; i < n; ++i)
		array[i - 1] = array[i]
	array.length = n - 1
}

function array_delete_item(array, item) {
	var i, n = array.length
	for (i = 0; i < n; ++i)
		if (array[i] === item)
			return array_delete(array, i)
}

function array_insert(array, index, item) {
	for (var i = array.length; i > index; --i)
		array[i] = array[i - 1]
	array[index] = item
}

function array_delete_pair(array, index) {
	var i, n = array.length
	for (i = index + 2; i < n; ++i)
		array[i - 2] = array[i]
	array.length = n - 2
}

function array_insert_pair(array, index, key, value) {
	for (var i = array.length; i > index; i -= 2) {
		array[i] = array[i-2]
		array[i+1] = array[i-1]
	}
	array[index] = key
	array[index+1] = value
}

// Set as plain sorted array

function set_clear(set) {
	set.length = 0
}

function set_has(set, item) {
	var a = 0
	var b = set.length - 1
	while (a <= b) {
		var m = (a + b) >> 1
		var x = set[m]
		if (item < x)
			b = m - 1
		else if (item > x)
			a = m + 1
		else
			return true
	}
	return false
}

function set_add(set, item) {
	var a = 0
	var b = set.length - 1
	// optimize fast case of appending items in order
	if (item > set[b]) {
		set[b+1] = item
		return
	}
	while (a <= b) {
		var m = (a + b) >> 1
		var x = set[m]
		if (item < x)
			b = m - 1
		else if (item > x)
			a = m + 1
		else
			return
	}
	array_insert(set, a, item)
}

function set_delete(set, item) {
	var a = 0
	var b = set.length - 1
	while (a <= b) {
		var m = (a + b) >> 1
		var x = set[m]
		if (item < x)
			b = m - 1
		else if (item > x)
			a = m + 1
		else {
			array_delete(set, m)
			return
		}
	}
}

function set_toggle(set, item) {
	var a = 0
	var b = set.length - 1
	while (a <= b) {
		var m = (a + b) >> 1
		var x = set[m]
		if (item < x)
			b = m - 1
		else if (item > x)
			a = m + 1
		else {
			array_delete(set, m)
			return
		}
	}
	array_insert(set, a, item)
}

// Map as plain sorted array of key/value pairs

function map_clear(map) {
	map.length = 0
}

function map_has(map, key) {
	var a = 0
	var b = (map.length >> 1) - 1
	while (a <= b) {
		var m = (a + b) >> 1
		var x = map[m<<1]
		if (key < x)
			b = m - 1
		else if (key > x)
			a = m + 1
		else
			return true
	}
	return false
}

// NOTE: Added a null fallback for missing
function map_get(map, key, missing = null) {
	var a = 0
	var b = (map.length >> 1) - 1
	while (a <= b) {
		var m = (a + b) >> 1
		var x = map[m<<1]
		if (key < x)
			b = m - 1
		else if (key > x)
			a = m + 1
		else
			return map[(m<<1)+1]
	}
	return missing
}

function map_set(map, key, value) {
	var a = 0
	var b = (map.length >> 1) - 1
	while (a <= b) {
		var m = (a + b) >> 1
		var x = map[m<<1]
		if (key < x)
			b = m - 1
		else if (key > x)
			a = m + 1
		else {
			map[(m<<1)+1] = value
			return
		}
	}
	array_insert_pair(map, a<<1, key, value)
}

function map_delete(map, key) {
	var a = 0
	var b = (map.length >> 1) - 1
	while (a <= b) {
		var m = (a + b) >> 1
		var x = map[m<<1]
		if (key < x)
			b = m - 1
		else if (key > x)
			a = m + 1
		else {
			array_delete_pair(map, m<<1)
			return
		}
	}
}

function map_get_set(map, key) {
	var set = map_get(map, key, null)
	if (set === null)
		map_set(map, key, (set = []))
	return set
}

function map_for_each(map, f) {
	for (var i = 0; i < map.length; i += 2)
		f(map[i], map[i+1])
}

// same as Object.groupBy
function object_group_by(items, callback) {
	var item, key
	var groups = {}
	if (typeof callback === "function") {
		for (item of items) {
			key = callback(item)
			if (key in groups)
				groups[key].push(item)
			else
				groups[key] = [ item ]
		}
	} else {
		for (item of items) {
			key = item[callback]
			if (key in groups)
				groups[key].push(item)
			else
				groups[key] = [ item ]
		}
	}
	return groups
}

// like Object.groupBy but for plain array maps
function map_group_by(items, callback) {
	var item, key, arr
	var groups = []
	if (typeof callback === "function") {
		for (item of items) {
			key = callback(item)
			arr = map_get(groups, key)
			if (arr)
				arr.push(item)
			else
				map_set(groups, key, [ item ])
		}
	} else {
		for (item of items) {
			key = item[callback]
			arr = map_get(groups, key)
			if (arr)
				arr.push(item)
			else
				map_set(groups, key, [ item ])
		}
	}
	return groups
}