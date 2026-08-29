"use strict"

//MOSTLY DONE: Battle events
//TODO: Fix & complete retreat
//MOSTLY DONE: Attrition
//TODO: Attrition events
//TODO: Resources Phase
//TODO: New Living Rules updates (from notes.html)

const data = require("./data")

const RUSSIA = 0
const FRANCE = 1
const ROLES = ["Russia", "France"]

//Framework global variables
var G, L, V, R, P = {}
//Could play event checks
var E = {}

//=== CONSTANTS ===
const NONE = -1 //Default value for logging

/* CARDS */
const cards = data.cards

const first_russia_card = 0
const last_russia_card = 53
const first_france_card = 54
const last_fr_card = 107

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

/* AREAS */
const areas = data.areas

const ELIMINATED = -2
const OUT_OF_PLAY = -1
const POOL = 0

const S_PRUSSIA_NORTH = 1 //The northern of the two "Prussia" areas
const S_TILSIT = 2
const S_KALTINENAI = 3
const S_NEMAKSCIAI = 4
const S_PRUSSIA_SOUTH = 5
const S_KALVARIJA = 6
const S_SUWALKI = 7
const S_UNNAMED_A3 = 8 //Unnamed areas are named "Unnamed" + sector
const S_GRODNO = 9
const S_SZCZUCZY = 10
const S_GRAND_DUCHY_OF_WARSAW_NORTH = 11
const S_BIALYSTOK = 12
const S_DROHICZYN = 13
const S_GRAND_DUCHY_OF_WARSAW_SOUTH = 14
const S_BIALA = 15
const S_AUSTRIA = 16
const S_LUBLIN = 17
const S_ZAMOSC = 18
const S_RIGA = 19
const S_VENDEN = 20
const S_FRIEDRICHSTADT = 21
const S_MITAU = 22
const S_ECKAU = 23
const S_SIAULAI = 24
const S_PANEVEZYS = 25
const S_KEDAINIAI = 26
const S_VILKOMIR = 27
const S_UNNAMED_B2 = 28
const S_KOVNO = 29
const S_VILNA = 30
const S_ONUSKIS = 31
const S_MOSTYR = 32
const S_LIDA = 33
const S_VOLKOVYSK = 34
const S_SLONIM = 35
const S_PRUZHANY = 36
const S_BIELSK = 37
const S_KOBRYN = 38
const S_BREST = 39
const S_RATNO = 40
const S_KOVEL = 41
const S_UNNAMED_B5 = 42
const S_VLADIMIR_GALICIA = 43 //Two areas named Vladimir on map, so added extra identifying info
const S_LUTSK = 44
const S_DUBNO = 45
const S_LIVONIA = 46
const S_OSTROV = 47
const S_UNNAMED_C1 = 48
const S_JAKOBSTADT = 49
const S_LUDZHA = 50
const S_DUNABURG = 51
const S_DRISSA = 52
const S_VIDZY = 53
const S_SALAKAS = 54
const S_SVENCIONYS = 55
const S_DOKSHITSY = 56
const S_NASTANISKI = 57
const S_MOLODECHNO = 58
const S_VOLOZHIN = 59
const S_MINSK = 60
const S_PLESHCHENITSY = 61
const S_NOVGRUDOK = 62
const S_NESVICH = 63
const S_SLUTSK = 64
const S_KLETSK = 65
const S_PINSK = 66
const S_UNNAMED_C6 = 67
const S_ROVNO = 68
const S_OSTROG = 69
const S_NOVOGRAD = 70
const S_MOLDAVIA = 71
const S_PSKOV = 72
const S_OPOCHKA = 73
const S_UNNAMED_D1 = 74
const S_SEVEZH = 75
const S_RUDNYA = 76
const S_POLOTSK = 77
const S_DISNA = 78
const S_KAMEN = 79
const S_LEPEL = 80
const S_SENNO = 81
const S_KOKHANOVO = 82
const S_BORISOV = 83
const S_MOGILEV = 84
const S_BOBRUYSK = 85
const S_IGUMEN = 86
const S_RAGOSTOV = 87
const S_MOZYR = 88
const S_UNNAMED_D5 = 89
const S_UNNAMED_D6 = 90
const S_ZHITOMIR = 91
const S_KIEV = 92
const S_BEZHANITZY = 93
const S_UNNAMED_E1 = 94
const S_VELIKIYE_LUKI = 95
const S_TOROPETS = 96
const S_USVYATY = 97
const S_UNNAMED_E2 = 98
const S_PORECZIE = 99
const S_VITEBSK = 100
const S_SMOLENSK = 101
const S_BABINOVICHI = 102
const S_ORSHA = 103
const S_MSTISLAVL = 104
const S_UNNAMED_E4 = 105
const S_KLIMOVICH = 106
const S_NOVOZYBKOV = 107
const S_NOVO_BELITZA = 108
const S_UNNAMED_E5_WEST = 109
const S_UNNAMED_E5_EAST = 110
const S_GORODNYA = 111
const S_KOZELETS = 112
const S_UKRAINE = 113
const S_BELYY = 114
const S_DUKHOVSHCHINA = 115
const S_SYCHEVKA = 116
const S_UNNAMED_F2 = 117
const S_VYAZMA = 118
const S_DOROGOBUZH = 119
const S_SVERSKOVO = 120
const S_UNNAMED_F3 = 121
const S_ROSLAVL = 122
const S_BRYANSK = 123
const S_SURAZH = 124
const S_TRUBSHEVSK = 125
const S_STARODUB = 126
const S_NOVGOROD_SEVERSKIY = 127
const S_SOSNITSA = 128
const S_CHERNIGOV = 129
const S_NEZHIN = 130
const S_TORZHOK = 131
const S_TVER = 132
const S_STARITSA = 133
const S_VOSKRESENTSK = 134
const S_KLIN = 135
const S_GZHATSK = 136
const S_MOZHAYSK = 137
const S_SILENKI = 138
const S_MALOYAROSLAVET = 139
const S_TARUTINO = 140
const S_YUKHNOV = 141
const S_KALUGA = 142
const S_KOSELYSK = 143
const S_BELEV = 144
const S_OREL = 145
const S_KARACHEV = 146
const S_VORONEZH = 147
const S_KORTSEVA = 148
const S_VLADIMIR_RUSSIA = 149
const S_MOSCOW = 150
const S_UNNAMED_H2 = 151
const S_SERPUKHOV = 152
const S_RYAZAN = 153
const S_TULA = 154
const S_UNNAMED_H3 = 155
const S_UNNAMED_H4 = 156
const FRENCH_CASUALTIES = 157

const FIRST_AREA = 1
const LAST_AREA = 156
const NUM_AREAS = 158

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
const L_DE_BEAUHARNAIS = 10 //Used names on counters, he is referred to as 'Eugène' in other places
const L_DAVOUT = 11
const L_MURAT = 12
const L_SCHWARZENBERG = 13

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

const SUPPLY_SOURCES = [
	[S_RIGA, S_LIVONIA, S_PSKOV, S_UKRAINE, S_TORZHOK, S_VORONEZH, S_VLADIMIR_RUSSIA, S_UNNAMED_H2, S_RYAZAN], 
	[S_PRUSSIA_SOUTH, S_GRAND_DUCHY_OF_WARSAW_NORTH, S_GRAND_DUCHY_OF_WARSAW_SOUTH, S_AUSTRIA],
]

//=== DATA ACCESSORS ===
function get_faction(nation) {
	return (nation === RUSSIA) ? RUSSIA : FRANCE
}

function enemy(who) {
	return (who === RUSSIA) ? FRANCE : RUSSIA
}

/* CARDS */
function get_card_owner(c) {
	return cards[c].who
}

function is_card_dummy(c) {
	return c === C_DUMMY_RU || c === C_DUMMY_FR
}

function is_card_friendly(who, c) {
	return who === cards[c].who
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

function is_supply_source(a) {
	return areas[a].supply
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

/* LEADERS */
function get_leader_faction(leader) {
	return leaders[leader].faction
}

function get_leader_name(leader) {
	return leaders[leader].name
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

function set_leader(who, where) {
	G.leaders[who] = where
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
	for (let type = FORAGE; type >= current_type; --type) {
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
	G.troops is a plain array map, using the map functions from the framework.
	Each key in the 'map' corresponds to an area id where there are troops present. Areas with no troops will be culled.
	Each value in the 'map' is a 'set', using the set functions in the framework.

	Each set is a sorted plain array of bitpacked troop data.

	Each bitpacked entry follows the following format: (NOTE: For programming simplicity, I've fudged the Prussian and Austrian SPs as separate 'types' of troops, not separate nationalities.)
		Player owner		1 bit 		Uses player mnemonics RUSSIA and FRANCE.
		Type 				4 bits 		Corresponds to the 12 (8 type + 4 allies) constants defined in the "Troops" section of constants
		Number of troops	6 bits  	Safe estimate of max. troops of a specific nationality and type in an area.
*/
const TROOP_ENTRY_WHO_SHIFT = 10
const TROOP_ENTRY_TYPE_SHIFT = 6
const TROOP_ENTRY_NUM_SHIFT = 0

const TROOP_ENTRY_WHO_MASK = 1024
const TROOP_ENTRY_TYPE_MASK = 960
const TROOP_ENTRY_NUM_MASK = 63

function init_troop_entry(area) {
	map_set(G.troops, area, [])
}

function delete_troop_entry(area) {
	map_delete(G.troops, area)
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
	return map_has(G.troops, area)
}

function get_area_troop_set(area, fallback = null) {
	return map_get(G.troops, area, fallback)
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
	map_for_each(G.troops, (area, set) => {
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

function is_guard(troop_type) {
	return (troop_type === FRESH_GUARD) || (troop_type === EXHAUSTED_GUARD)
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

/* TIME */
function get_month(turn) {
	return Math.ceil(turn / 6)
}

function get_current_month() {
	return get_month(G.turn)
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
	log(`Removed depot at S${where}.`)
}

function find_depot_at_location(who, area) {
	for (let depot = get_first_depot(who); depot <= get_last_depot(who); ++depot) {
		if (get_depot_location(depot) === area) return depot
	}
	return -1
}

function remove_depot_from_area(who, where) {
	remove_depot(find_depot_at_location(who, where), where)
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
	G.devastation[where] = level
}

function get_devastation(area) {
	return G.devastation[area]
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

//=== STATE-MANIPULATING FUNCTIONS ===
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
			throw new Error(`Need to remove ${num} troops of ${who} ${type} at ${area}. Only ${remaining_troop_count} found.`)
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

function move_formation(leaders, troops, from, to) {
	for (let leader of leaders)
		move_leader(leader, to)

	for (let type = 0; type < troops.length; ++type)
		if (troops[type] > 0)
			move_troop(G.active, from, to, type, troops[type])
}

function mark_already_moved(who, path, move_type, leaders, troops) {
	let from = path[path.length - 2]
	let destination = path[path.length - 1]

	if (!map_has(G.moved, destination))
		map_set(G.moved, destination, [])
	
	if (map_get(G.moved, destination).some(force => force.from === from && force.move_type === move_type)) {
		let force = map_get(G.moved, destination).find(f => f.from === from && f.move_type === move_type)

		for (let leader of leaders) 
			set_add(force.leaders, leader)
		for (let type = 0; type < troops.length; ++type) 
			force.troops[type] += troops[type]

		return
	}
	
	let entry = 
	{
		faction: who,
		from,
		move_type,
		river_crossing: has_bridge(path[path.length - 2], destination) ,
		leaders: [],
		troops: Array(NUM_TROOP_TYPES).fill(0)
	}

	for (let leader of leaders) set_add(entry.leaders, leader)
	for (let type = 0; type < troops.length; ++type) entry.troops[type] += troops[type]

	map_get(G.moved, destination).push(entry)
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

//=== VIEW ===
function filter_log(log, player) {
	if (Array.isArray(log)) {
		log = log.map(entry => {
			if (entry.startsWith("HR") && (player !== RUSSIA))
				return "HR"
			else if (entry.startsWith("HF") && (player !== FRANCE))
				return "HF"
			return entry
		})
	}
	return log
}

function on_view() {
	V.log = filter_log(V.log, R)

	V.active = G.active
	V.depots = G.depots
	V.devastation = G.devastation
	V.current_discard = G.discard[R] ?? []
	V.french_logistic_preparations = G.french_logistic_preparations
	V.winter = G.winter
	V.hand_length = [G.hand[RUSSIA].length, G.hand[FRANCE].length]
	V.current_hand = G.hand[R] ?? []
	V.initiative = G.initiative
	V.end_turn = G.end_turn
	V.leaders = G.leaders
	V.removed = G.removed
	V.set_aside = G.set_aside
	V.troops = G.troops
	V.turn = (G.turn === undefined) ? G.start_turn : G.turn
	V.vp = G.vp
	V.played_cards = G.played_cards ?? [[], []]
	V.orders = G.orders.slice(get_first_order(R), get_last_order(R) + 1) ?? []
	V.enemy_orders = G.orders.slice(get_first_order(enemy(R)), get_last_order(enemy(R)) + 1)?.filter(loc => loc !== POOL) ?? [] 
	V.selected_orders = (G.selected_orders) ? G.selected_orders[R] : []
	V.seniority = G.seniority
	V.battles = G.battles
	V.attrition_checked = G.attrition_checked
	V.moved = G.moved
	V.move = G.move
}

// === FRAMEWORK EXTENSIONS ===
/*
	Several states in 1812 involve playing events during multi-active states.
	For instance, must-play events are executed immediately as they are drawn.
	In other cases, it is useful (for expediency) to include event actions within multi-active states.

	In these states, players are shown a different prompt/actions depending on their 'local state'.

	'Local states' are enumerated within the multi-active state in the relative order in which they need to be executed, e.g.:
	P.state = {
	...
	states: {
		state1: {...},
		state2: {...}
	}
	}

	(WIP)
*/

function update_local_state(who) {
	let states = P[L.P].states
	let keys = Object.keys(states)
	let current_state = keys.indexOf(L.state[who])

	try {
		for (let i = current_state + 1; i < keys.length; ++i) {
			if (states[keys[i]].eligible(who)) {
				L.state[who] = keys[i]
				return
			}
		}	
	} catch(x) {
		console.error(x)
	}
}

//=== SCENARIOS & SETUP ===
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

function on_setup(scenario, options) {
	const SCENARIO_DATA = data.scenarios.find(sc => sc.name === scenario)

	log_h1(scenario, NONE)

	G.start_turn = SCENARIO_DATA.start
	G.end_turn = SCENARIO_DATA.end

	G.vp = SCENARIO_DATA.vp
	G.initiative = SCENARIO_DATA.initiative

	G.deck = SCENARIO_DATA.deck.map(cards => cards.slice())
	G.removed = SCENARIO_DATA.removed.map(cards => cards.slice())
	G.set_aside = SCENARIO_DATA.set_aside.map(cards => cards.slice())

	G.discard = [[], []]

	G.hand = [[C_DUMMY_RU, ...SCENARIO_DATA.cards_in_hand[RUSSIA]], [C_DUMMY_FR, ...SCENARIO_DATA.cards_in_hand[FRANCE]]]
	G.french_logistic_preparations = SCENARIO_DATA.french_logistic_preparations
	G.winter = SCENARIO_DATA.winter

	G.troops = []
	G.leaders = new Array(NUM_LEADERS).fill(POOL)
	G.depots = new Array(NUM_DEPOTS_RU + NUM_DEPOTS_FR).fill(POOL)
	G.devastation = new Array(NUM_AREAS).fill(0)

	G.played_cards = [[], []]
	G.persistent_events = []

	G.orders = [null, ...(new Array(NUM_ORDERS).fill(POOL))]
	G.orders_by_type = Array.from({ length: NUM_ORDER_TYPES }, () => [[], []])
	G.selected_orders = [[], []]

	G.move = {}
	G.moved = []
	G.battles = []

	//To track who commands who (particularly in cases where both leaders have the same seniority)
	G.seniority = [	
		[L_ALEXANDER, L_KUTUZOV, L_DE_TOLLY, L_BAGRATION, L_TORMASOV, L_WITTGENSTEIN, L_CHICHAGOV, L_PLATOV], 
		[L_NAPOLEON, L_JEROME, L_DE_BEAUHARNAIS, L_DAVOUT, L_MURAT, L_SCHWARZENBERG]
	]

	

	G.attrition_checked = []

	update_supply()

	switch(get_month(G.start_turn)) {
	case JUNE: setup_june(); break
	case JULY: setup_july(); break
	case AUG: setup_aug(); break
	case OCT: setup_oct(); break
	}

	G.platov_order = -1
	//G.supply = [calculate_distance_to_nearest_depot(RU), calculate_distance_to_nearest_depot(FR)]

	G.active = [RUSSIA, FRANCE]
	call("setup_hand", {scenario, hand_size: SCENARIO_DATA.hand_size.slice()})

}

function update_supply(who) {
	if (who === undefined) G.supply = [calculate_distance_to_nearest_depot(RUSSIA), calculate_distance_to_nearest_depot(FRANCE)]
	else G.supply[who] = calculate_distance_to_nearest_depot(who)
}

function setup_june() {
	log_h1("June Setup", SUMMER)
	/* RUSSIA */
	set_troop(RUSSIA, S_RIGA, FRESH_INFANTRY, 2)
	set_troop(RUSSIA, S_DUNABURG, FRESH_INFANTRY, 1)
	add_depot(RUSSIA, S_DUNABURG)
	set_leader(L_WITTGENSTEIN, S_KALTINENAI)
	set_troop(RUSSIA, S_KALTINENAI, FRESH_INFANTRY, 3)
	set_troop(RUSSIA, S_VILKOMIR, FRESH_CAVALRY, 2)
	set_troop(RUSSIA, S_VILKOMIR, FRESH_INFANTRY, 2)
	set_leader(L_ALEXANDER, S_VILNA)
	set_leader(L_DE_TOLLY, S_VILNA)
	set_troop(RUSSIA, S_VILNA, FRESH_INFANTRY, 6)
	add_depot(RUSSIA, S_VILNA)
	set_troop(RUSSIA, S_SVENCIONYS, FRESH_INFANTRY, 3)
	set_troop(RUSSIA, S_MOLODECHNO, FRESH_CAVALRY, 1)
	set_troop(RUSSIA, S_MOLODECHNO, FRESH_INFANTRY, 1)
	add_depot(RUSSIA, S_MINSK)
	set_troop(RUSSIA, S_LIDA, FRESH_CAVALRY, 1)
	set_troop(RUSSIA, S_LIDA, FRESH_INFANTRY, 2)
	set_leader(L_PLATOV, S_GRODNO)
	set_troop(RUSSIA, S_GRODNO, FRESH_COSSACK, 2)
	set_troop(RUSSIA, S_BIALYSTOK, FRESH_CAVALRY, 1)
	set_leader(L_BAGRATION, S_VOLKOVYSK)
	set_troop(RUSSIA, S_VOLKOVYSK, FRESH_INFANTRY, 4)
	set_troop(RUSSIA, S_BREST, FRESH_INFANTRY, 1)
	add_depot(RUSSIA, S_BREST)
	set_troop(RUSSIA, S_KOVEL, FRESH_CAVALRY, 1)
	set_troop(RUSSIA, S_KOVEL, EXHAUSTED_CAVALRY, 1)
	set_leader(L_TORMASOV, S_LUTSK)
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
	set_leader(L_NAPOLEON, S_KALVARIJA)
	set_leader(L_MURAT, S_KALVARIJA)
	set_troop(FRANCE, S_KALVARIJA, FRESH_GUARD, 4)
	set_troop(FRANCE, S_KALVARIJA, FRESH_CAVALRY, 5)
	set_troop(FRANCE, S_KALVARIJA, FRESH_INFANTRY, 19)
	set_leader(L_DE_BEAUHARNAIS, S_SUWALKI)
	set_troop(FRANCE, S_SUWALKI, FRESH_CAVALRY, 1)
	set_troop(FRANCE, S_SUWALKI, FRESH_INFANTRY, 7)
	set_leader(L_JEROME, S_SZCZUCZY)
	set_troop(FRANCE, S_SZCZUCZY, FRESH_CAVALRY, 2)
	set_troop(FRANCE, S_SZCZUCZY, FRESH_INFANTRY, 6)
	set_troop(FRANCE, S_SUWALKI, FRESH_CAVALRY, 1)
	set_troop(FRANCE, S_GRAND_DUCHY_OF_WARSAW_NORTH, FRESH_INFANTRY, 2)
	set_leader(L_SCHWARZENBERG, S_GRAND_DUCHY_OF_WARSAW_SOUTH)
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
	set_leader(L_WITTGENSTEIN, S_SEVEZH)
	set_troop(RUSSIA, S_SEVEZH, FRESH_INFANTRY, 2)
	set_troop(RUSSIA, S_SEVEZH, EXHAUSTED_INFANTRY, 1)
	set_leader(L_DE_TOLLY, S_VITEBSK)
	set_troop(RUSSIA, S_VITEBSK, FRESH_INFANTRY, 7)
	set_troop(RUSSIA, S_VITEBSK, FRESH_CAVALRY, 2)
	set_troop(RUSSIA, S_VITEBSK, EXHAUSTED_INFANTRY, 5)
	set_troop(RUSSIA, S_VITEBSK, EXHAUSTED_CAVALRY, 1)
	add_depot(RUSSIA, S_VITEBSK)
	set_leader(L_PLATOV, S_BABINOVICHI)
	set_troop(RUSSIA, S_BABINOVICHI, FRESH_COSSACK, 1)
	set_troop(RUSSIA, S_SMOLENSK, FRESH_INFANTRY, 2)
	add_depot(RUSSIA, S_SMOLENSK)
	set_troop(RUSSIA, S_DUKHOVSHCHINA, FRESH_INFANTRY, 2)
	set_troop(RUSSIA, S_RAGOSTOV, FRESH_INFANTRY, 1)
	set_troop(RUSSIA, S_RAGOSTOV, EXHAUSTED_INFANTRY, 1)
	set_leader(L_BAGRATION, S_UNNAMED_E4)
	set_troop(RUSSIA, S_UNNAMED_E4, FRESH_INFANTRY, 2)
	set_troop(RUSSIA, S_UNNAMED_E4, FRESH_CAVALRY, 1)
	set_troop(RUSSIA, S_UNNAMED_E4, EXHAUSTED_INFANTRY, 1)
	set_troop(RUSSIA, S_MSTISLAVL, FRESH_COSSACK, 1)

	set_leader(L_TORMASOV, S_BREST)
	set_troop(RUSSIA, S_BREST, FRESH_INFANTRY, 1)
	set_troop(RUSSIA, S_BREST, EXHAUSTED_INFANTRY, 1)
	set_troop(RUSSIA, S_VLADIMIR_GALICIA, FRESH_INFANTRY, 1)
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
	set_leader(L_NAPOLEON, S_KAMEN)
	set_leader(L_MURAT, S_KAMEN)
	set_leader(L_DE_BEAUHARNAIS, S_KAMEN)
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
	set_leader(L_DAVOUT, S_MOGILEV)
	set_troop(FRANCE, S_MOGILEV, FRESH_INFANTRY, 2)
	set_troop(FRANCE, S_MOGILEV, EXHAUSTED_INFANTRY, 1)
	set_troop(FRANCE, S_KOKHANOVO, FRESH_INFANTRY, 3)
	set_troop(FRANCE, S_KOKHANOVO, EXHAUSTED_INFANTRY, 1)
	set_troop(FRANCE, S_ORSHA, FRESH_CAVALRY, 1)
	set_leader(L_SCHWARZENBERG, S_NESVICH)
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
	set_leader(L_WITTGENSTEIN, S_SEVEZH)
	set_troop(RUSSIA, S_SEVEZH, FRESH_INFANTRY, 2)
	set_troop(RUSSIA, S_SEVEZH, EXHAUSTED_INFANTRY, 1)
	set_leader(L_DE_TOLLY, S_SMOLENSK)
	set_troop(RUSSIA, S_SMOLENSK, FRESH_INFANTRY, 8)
	set_troop(RUSSIA, S_SMOLENSK, FRESH_CAVALRY, 2)
	set_troop(RUSSIA, S_SMOLENSK, EXHAUSTED_INFANTRY, 5)
	set_troop(RUSSIA, S_SMOLENSK, EXHAUSTED_CAVALRY, 1)
	add_depot(RUSSIA, S_SMOLENSK)
	set_leader(L_BAGRATION, S_SVERSKOVO)
	set_troop(RUSSIA, S_SVERSKOVO, FRESH_INFANTRY, 3)
	set_troop(RUSSIA, S_SVERSKOVO, FRESH_CAVALRY, 1)
	set_troop(RUSSIA, S_SVERSKOVO, EXHAUSTED_INFANTRY, 2)
	set_troop(RUSSIA, S_ROSLAVL, FRESH_COSSACK, 1)
	set_leader(L_PLATOV, S_DUKHOVSHCHINA)
	set_troop(RUSSIA, S_DUKHOVSHCHINA, FRESH_COSSACK, 2)

	set_troop(RUSSIA, S_MOSCOW, FRESH_INFANTRY, 3)
	add_depot(RUSSIA, S_MOSCOW)
	add_depot(RUSSIA, S_VYAZMA)
	set_troop(RUSSIA, S_KALUGA, FRESH_INFANTRY, 3)
	add_depot(RUSSIA, S_KALUGA)
	set_troop(RUSSIA, S_OREL, FRESH_INFANTRY, 1)
	add_depot(RUSSIA, S_OREL)
	set_troop(RUSSIA, S_VORONEZH, FRESH_COSSACK, 2)

	set_leader(L_TORMASOV, S_KOBRYN)
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
	set_leader(L_NAPOLEON, S_VITEBSK)
	set_troop(FRANCE, S_VITEBSK, FRESH_GUARD, 3)
	set_troop(FRANCE, S_VITEBSK, FRESH_INFANTRY, 3)
	set_troop(FRANCE, S_VITEBSK, FRESH_CAVALRY, 1)
	set_troop(FRANCE, S_VITEBSK, EXHAUSTED_INFANTRY, 2)
	set_troop(FRANCE, S_VITEBSK, EXHAUSTED_GUARD, 1)
	set_leader(L_DE_BEAUHARNAIS, S_PORECZIE)
	set_troop(FRANCE, S_PORECZIE, FRESH_INFANTRY, 3)
	set_leader(L_MURAT, S_BABINOVICHI)
	set_leader(L_DAVOUT, S_BABINOVICHI)
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
	set_leader(L_SCHWARZENBERG, S_PRUZHANY)
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
	set_leader(L_WITTGENSTEIN, S_SEVEZH)
	set_troop(RUSSIA, S_SEVEZH, FRESH_INFANTRY, 3)
	set_troop(RUSSIA, S_SEVEZH, EXHAUSTED_INFANTRY, 1)
	set_troop(RUSSIA, S_OSTROV, FRESH_INFANTRY, 1)

	set_troop(RUSSIA, S_BRYANSK, FRESH_COSSACK, 1)
	set_leader(L_PLATOV, S_KOSELYSK)
	set_troop(RUSSIA, S_KOSELYSK, FRESH_COSSACK, 2)
	set_troop(RUSSIA, S_OREL, FRESH_INFANTRY, 1)
	add_depot(RUSSIA, S_OREL)
	set_troop(RUSSIA, S_MALOYAROSLAVET, FRESH_INFANTRY, 1)
	set_troop(RUSSIA, S_MALOYAROSLAVET, FRESH_CAVALRY, 2)
	set_troop(RUSSIA, S_MALOYAROSLAVET, FRESH_COSSACK, 1)
	set_troop(RUSSIA, S_MALOYAROSLAVET, EXHAUSTED_INFANTRY, 1)
	set_leader(L_KUTUZOV, S_KALUGA)
	set_leader(L_TORMASOV, S_KALUGA)
	set_troop(RUSSIA, S_KALUGA, FRESH_INFANTRY, 7)
	set_troop(RUSSIA, S_KALUGA, FRESH_CAVALRY, 1)
	set_troop(RUSSIA, S_KALUGA, FRESH_COSSACK, 1)
	set_troop(RUSSIA, S_KALUGA, EXHAUSTED_INFANTRY, 3)
	set_troop(RUSSIA, S_KALUGA, EXHAUSTED_CAVALRY, 1)
	add_depot(RUSSIA, S_KALUGA)
	set_troop(RUSSIA, S_VLADIMIR_RUSSIA, FRESH_COSSACK, 1)
	set_troop(RUSSIA, S_VORONEZH, FRESH_COSSACK, 1)

	set_troop(RUSSIA, S_BREST, FRESH_INFANTRY, 2)
	add_depot(RUSSIA, S_BREST)
	set_leader(L_CHICHAGOV, S_PRUZHANY)
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

	set_leader(L_ALEXANDER, POOL)
	set_leader(L_DE_TOLLY, POOL)
	set_leader(L_BAGRATION, POOL)

	/* FRANCE */
	set_troop(FRANCE, S_PRUSSIA_SOUTH, FRESH_INFANTRY, 1)
	set_troop(FRANCE, S_MITAU, FRESH_PRUSSIAN_INFANTRY, 1)
	set_troop(FRANCE, S_KOVNO, FRESH_INFANTRY, 1)
	add_depot(FRANCE, S_KOVNO)
	set_leader(L_SCHWARZENBERG, S_BIALYSTOK)
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
	set_leader(L_MURAT, S_TARUTINO)
	set_troop(FRANCE, S_TARUTINO, FRESH_INFANTRY, 2)
	set_troop(FRANCE, S_TARUTINO, FRESH_CAVALRY, 1)
	set_troop(FRANCE, S_TARUTINO, EXHAUSTED_INFANTRY, 1)
	set_troop(FRANCE, S_TARUTINO, EXHAUSTED_CAVALRY, 1)
	set_leader(L_NAPOLEON, S_MOSCOW)
	set_leader(L_DAVOUT, S_MOSCOW)
	set_leader(L_DE_BEAUHARNAIS, S_MOSCOW)
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
		//L.scenario
		//L.hand_size
		log_h2("Setup Hand")
		L.discarded_cards = [[], []]
		L.has_shuffled_deck = [false, false]
		L.drawn_card = [-1, -1]
	},
	prompt() {
		let num_non_dummy_cards = [count_non_dummy_cards_in_hand(RUSSIA), count_non_dummy_cards_in_hand(FRANCE)]

		if (!L.has_shuffled_deck[R]) {
			if (num_non_dummy_cards[R] > L.hand_size[R])
				prompt(`Discard cards (${num_non_dummy_cards[R] - L.hand_size[R]} remaining).`)
			else if (num_non_dummy_cards[R] > 0)
				prompt(`You may discard more cards before shuffling the deck, or pass.`)
			else
				prompt(`Shuffle the deck.`)

			button_undo(L.discarded_cards[R].length > 0)
			button("shuffle", num_non_dummy_cards[R] <= L.hand_size[R])

			get_non_dummy_cards_in_hand(R).forEach(action_card)
		} else {
			if ((num_non_dummy_cards[R] === L.hand_size[R]) && (L.drawn_card[R] === -1)) {
				prompt(`Setup hand – All done.`)
				button_done()
			} else {
				if (L.drawn_card[R] === -1) {
					prompt(`Draw cards: ${L.hand_size[R] - num_non_dummy_cards[R]} remaining.`)
					button_draw()
				} else {
					if (is_must_play_event(L.drawn_card[R])) {
						prompt(`Discard and redraw Must-Play event: ${get_card_log_alias(L.drawn_card[R])}.`)
						button("discard_and_redraw")
					} else {
						prompt(`You drew ${get_card_log_alias(L.drawn_card[R])}.`)
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
		log(`${ROLES[R]} deck shuffled.`)	
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
		if (G.active.length === 0) { //Scenario 5 special rule
			if (L.scenario === BATTLE_OF_SMOLENSK_CAMPAIGN_START) {
				place_card_at_the_top_of_the_deck(C_HOLY_MOTHER_RUSSIA_RU)
			}
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
	log(`${get_card_log_alias(card)} placed on top of the ${ROLES[who]} deck.`)
}

//=== MAIN ===
P.main = script(`
	for G.turn in G.start_turn to G.end_turn {
		if (is_resource_turn(G.turn)) {
			call resources_phase
		} else {
			call turn	
		}
	}
	goto final_scoring	
`)

function start_turn(turn) {
	if (is_resource_turn(turn))
		log_h1(`${get_month_name(G.turn)} – Resources Phase`, get_season(turn))
	else
		log_h1(`${get_month_name(G.turn)} ${get_turn_name(G.turn)}`, get_season(turn))

	if (turn === JUNE_5) {
		log_h5("French Logistic Preparations")
		log_italic(`France receives a free Forced March and Place Depot order. As an exception to the rules, this Place Depot order may be placed in S${S_KOVNO}.`)
		log()
	}

	if (turn === OCT_R || (G.start_turn >= OCT_R)) {
		log_h5("Winter")
		log_italic(`Initiative is shifted 1 in Russia's favor during each subsequent Resources Step.`)
		log_italic(`The Winter Weather Die is used in the Attrition Step.`)
		log()
	}
	log()

	if (!is_resource_turn(turn)) {
		G.active = [RUSSIA, FRANCE]
		log_h2("Draw a Card")
		log()
	}
}

P.final_scoring = function() {
	log_h1("The End")
	log()
	if (G.vp > 0)
		finish(FRANCE, `France won with ${G.vp} VP.`)
	else if (G.vp < 0)
		finish(RUSSIA, `Russia won with ${Math.abs(G.vp)} VP.`)
	else
		finish("Draw", `Neither side has a VP advantage.`)
}

// === RESOURCE PHASES ===
P.resources_phase = script(`
	eval { start_turn(G.turn) }
	call free_replacements
	call additional_replacements
	call select_new_cards

	log "@Draw Cards"
	set G.active [RUSSIA, FRANCE]
	log
	call draw_card_to_hand { num_cards_to_draw: L.$ }
`)

P.free_replacements = {
	_begin() {
		log_h2("Free Replacements")

		G.active = [RUSSIA, FRANCE]

		L.free_replacements_areas = [[S_KIEV, S_SMOLENSK, S_KALUGA, S_MOSCOW], [S_KOVNO]]
		L.areas = [[], []]
		for (let who = RUSSIA; who <= FRANCE; ++who)
			L.areas[who] = L.free_replacements_areas[who].filter(area => is_friendly_controlled(who, area))

		L.has_gained_free_cossack = false
	},
	prompt() {
		if (L.areas[R].length > 0) {
			prompt(`Receive 1 Infantry SP in ${join_array_with_and(L.areas[R].map(area => `S${area}`))}.`)
			L.areas[R].forEach(area => action_area(area))
		} else if (R === RUSSIA && !L.has_gained_free_cossack) {
			prompt(`Receive 1 Cossack SP at S${S_VORONEZH}.`)
			action_area(S_VORONEZH)
		} else {
			prompt(`Free Replacements: All done.`)
			button_done()
		}
	},
	area(area) {
		if (L.areas[R].length > 0) {
			add_troop(R, area, FRESH_INFANTRY, 1)
			set_delete(L.areas[R], area)
		} else {
			add_troop(R, area, FRESH_COSSACK, 1)
			L.has_gained_free_cossack = true
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
						logi(`S${area}`)
						log(`<1 Infantry`)
					}
				}
				if (who === RUSSIA) {
					logi(`S${S_VORONEZH}`)
					log(`<1 Cossack`)
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

	map_for_each(G.troops, (area, entries) => {
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
		for (let who = RUSSIA; who <= FRANCE; ++who)
			L.state[who] = has_card_in_hand(who) ? "discard_card" : "all_done"

		L.num_cards_discarded = [0, 0]
		L.has_discarded_card = [false, false]
		L.selected_type = [-1, -1]
		L.count = [0, 0]
	},
	states: {
		"discard_card": 
		{
			prompt() {
				prompt(`You may discard a card to gain additional replacements, or pass.`)
				get_non_dummy_cards_in_hand(R).forEach(card => action_card(card))
				button_pass()
			},
			on_card(card) {
				remove_card_from_hand(R, card)
				set_add(get_discard(R), card)
				++L.num_cards_discarded[R]

				L.state[R] = "select_reinforcement_sp"
			},
		},
		"select_reinforcement_sp": 
		{
			prompt() {
				prompt(`Select an SP type to reinforce.`)
				for (let type = 0; type < NUM_TROOP_TYPES; ++type) {
					if (is_troop_type_fresh(type) && could_receive_sp(R, type)) {
						if (is_infantry(type))
							action("troop_2x", type)
						else
							action_troop(type)
					}
				}
			},
			on_troop(type) {
				L.selected_type[R] = type
				L.count[R] = is_infantry(type) ? 2 : 1
				L.state[R] = "place_sp"
			},
			on_troop_2x(type) {
				this.on_troop(type)
			}
		},
		"place_sp": 
		{
			prompt() {
				prompt(`Select a location to place ${get_troop_type_name(L.selected_type[R])}. (${L.count[R]} remaining).`)
				for (let area = FIRST_AREA; area <= LAST_AREA; ++area)
					if (has_friendly_leader(R, area) || (is_key_city(area) && is_friendly_controlled(area)) || has_friendly_depot(R, area))
						if (is_area_in_supply(R, area))
							action_area(area)
			},
			on_area(area) {
				add_troop(R, area, L.selected_type[R], 1)
				if (--L.count[R] === 0)
					if (has_card_in_hand(R))
						L.state[R] = "discard_card"
					else
						L.state[R] = "all_done"
			}
		},
		"all_done": 
		{
			prompt() {
				prompt(`Receive additional reinforcements: All done.`)
				button_done()
			}
		}
	},
	prompt() {
		this.states[L.state[R]].prompt()
	},
	pass() {
		this.done()
	},
	done() {
		set_delete(G.active, R)
		if (G.active.length === 0) {
			for (let who = RUSSIA; who <= FRANCE; ++who)
				if (L.num_cards_discarded[who] > 0)
					log(`${ROLES[who]} discarded ${L.num_cards_discarded[who]} cards.`)
				else
					log(`${ROLES[who]} did not discard cards.`)
			log()
			end()
		}	
	},
	card(card)		{ this.states[L.state[R]].on_card(card) },
	area(area)		{ this.states[L.state[R]].on_area(area) },
	troop(type)		{ this.states[L.state[R]].on_troop(type) },
	troop_2x(type)	{ this.states[L.state[R]].on_troop_2x(type) },
}

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
			prompt(`Combine draw and discard piles.`)
			button("combine")
		} else if (L.selected_card[R] === -1) {
			if (L.card_choices[R].length > 0) {
				prompt(`Select a card for this month. (${join_array_with_or(L.card_choices[R].map(card => get_card_log_alias(card)))})`)
				L.card_choices[R].forEach(card => action("card_button", card))
			} else {
				prompt(`The designated cards for this month are in your hand or already played.`)
				button_confirm()
			}
		} else {
			prompt(`Confirm selection of ${get_card_log_alias(L.selected_card[R])}.`)
			button_confirm()
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
	confirm() {
		set_delete(G.active, R)

		if (L.selected_card[R] > -1) {
			add_to_hand(R, L.selected_card[R])
			array_delete_item(get_deck(R), L.selected_card[R])
			log_only(R, `Selected`)
			log_only(R, `>${get_card_log_alias(L.selected_card[R])}`)
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

// Draw card needs refactor to allow same player to draw multiple cards

// === NORMAL TURNS ===
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

function is_order_turn(turn) {
	return [FORCED_MARCH, CAVALRY_PATROLS, MARCH, EVADE, RALLY, COSSACK_RAID, PLACE_DEPOT].includes(TURN_PHASES[turn])
}

P.turn = script(`
	eval { start_turn(G.turn) }
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
	
	map_clear(G.moved)
	map_clear(G.battles)

	//Reset orders
	log("Removed all orders.")
	G.orders_by_type = Array.from({ length: NUM_ORDER_TYPES }, () => [[], []])
	for (let order = FIRST_ORDER; order <= LAST_ORDER; ++order)
		if (get_order_location(order) !== POOL || get_order_location(order) !== OUT_OF_PLAY)
			G.orders[order] = POOL

	if (is_event_active(C_HOLY_MOTHER_RUSSIA_RU)) {
		let key_controller = is_fr_controlled(map_get(G.persistent_events, C_HOLY_MOTHER_RUSSIA_RU).area) ? FRANCE: RUSSIA
		log(`${get_card_log_alias(C_HOLY_MOTHER_RUSSIA_RU)}`)
		increase_vp(key_controller, 1)
	}

	if (Math.abs(G.vp) < 20) {
		let events_to_clear = []
		map_for_each(G.persistent_events, (evt, info) => {
			if (info.remove === G.turn)
				set_add(events_to_clear, evt)
		})
		events_to_clear.forEach(evt => map_delete(G.persistent_events, evt))

		end()
	}
}

//=== 1. DRAW CARD TO HAND ===
/* 
	Basic rules:
		At the beginning of each new turn, each player draws a random card from their Draw Pile to their hand. (p. 9)
		Some cards are Must-Play cards that must be played for their (often negative) event immediately upon being drawn. (p. 6)

	Must-play events:
		RUSSIA:
			#11: Holy Mother Russia
			#14: Extreme Weather
			#42: Command Friction
			#45: Poor Logistics
			#46: Devastated Countryside
			#52: Barclay de Tolly Resigns

		FRANCE:
			#22: Poor Communications
			#24: Jérôme Goes Home
			#39: Chaos in the Rear Areas
			#40: Vulnerable Supply Lines
			#41: Freezing Weather
			#42: Extreme Weather
			#43: Logistics Collapse
			#44: Chaotic Food Distribution

	draw_card_to_hand handles this by channelling players through a local state machine independently (L.state is tracked separately for each player).

	All card draws in the game are redirected to this state, so must-play events are defined as local states within draw_card_to_hand.
	Unlike some of the other states that use the 'local state' mechanism, this state uses direct transitions rather than the enumerating approach of the other states.
*/

function draw_a_card(player) {
	if (get_deck(player).length === 0) {
		G.deck[player] = get_discard(player).slice()
		get_discard(player).length = 0
		shuffle(get_deck(player))
		log(`Reshuffled ${ROLES[player]} deck.`)
	}
	L.drawn_card[player] = draw_card(player)
	L.state[player] = "review_drawn_card"
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

function finish_state(player) {
	if (--L.num_cards_to_draw[R] > 0) {
		L.state[R] = "draw_card"
		return
	}

	if (player === FRANCE && map_has(L.event_tracker, C_HOLY_MOTHER_RUSSIA_RU) && (get_event_step(C_HOLY_MOTHER_RUSSIA_RU) === 1)) {
		L.state[FRANCE] = "holy_mother_russia_ru"
		return
	} 

	if (Array.isArray(G.active)) set_delete(G.active, player)
	
	if ((Array.isArray(G.active) && G.active.length === 0) || !Array.isArray(G.active)) {
		for (let event of L.persistent_events) add_persistent_event(event)
		if (set_has(L.persistent_events, C_HOLY_MOTHER_RUSSIA_RU)) add_event_keyword(C_HOLY_MOTHER_RUSSIA_RU, { area: get_event_data(C_HOLY_MOTHER_RUSSIA_RU).key} )
		end()
	}
} 

P.draw_card_to_hand = {
	_begin() {
		// NOTE: Set G.active to whoever needs to draw a card before calling (since we don't want to define must-play events in different places)
		// Current local state
		L.state = ["draw_card", "draw_card"]
		//Current card drawn
		L.drawn_card = [-1, -1]
		// Some must-play draw are also multi-step (eeks!), so track them using a map
		// Also stores event-specific information, so that it stays organized
		L.event_tracker = []
		// Cache of persistent events played throughout the state (which will be added to G.persistent_events at the end)
		L.persistent_events = []
		// Number of cards each player must draw (relevant for the resources phase)
		L.num_cards_to_draw = L.num_cards_to_draw ?? [1, 1]
	},
	states: {
		"draw_card":
		{
			prompt() {
				prompt("Draw a card to your hand.")
				button_draw()
			},
			on_draw() {
				draw_a_card(R)
			}
		},
		"review_drawn_card":
		{
			prompt() {
				prompt(`You drew ${get_card_log_alias(L.drawn_card[R])}.`)
				button_confirm()
			},
			on_confirm() {
				if (is_must_play_event(L.drawn_card[R])) {
					L.state[R] = get_event_state_name(L.drawn_card[R])
					set_add(L.persistent_events, L.drawn_card[R])
					init_event_tracker(L.drawn_card[R])
					if (L.drawn_card[R] === C_VULNERABLE_SUPPLY_LINES) {
						get_event_data(C_VULNERABLE_SUPPLY_LINES).num_french_depots = count_num_french_depots_on_map()
						get_event_data(C_VULNERABLE_SUPPLY_LINES).depots_to_remove = get_all_unoccupied_depots(FRANCE)
						get_event_data(C_VULNERABLE_SUPPLY_LINES).removed_depots = [] //For undo
						get_event_data(C_VULNERABLE_SUPPLY_LINES).discarded_card = -1
					} else if (L.drawn_card[R] === C_CHAOTIC_FOOD_DISTRIBUTION) {
						get_event_data(C_CHAOTIC_FOOD_DISTRIBUTION).troop_type = -1
						get_event_data(C_CHAOTIC_FOOD_DISTRIBUTION).area = -1
						get_event_data(C_CHAOTIC_FOOD_DISTRIBUTION).removed_depot = -1
					}
				} else {
					finish_state(R)
				}
			}
		},
		"holy_mother_russia_ru":
		{
			prompt() {
				switch(get_event_step(C_HOLY_MOTHER_RUSSIA_RU)) {
				case -1:
					prompt_card(C_HOLY_MOTHER_RUSSIA_RU, "Receive two additional orders.")
					button_next()
					return
				case 0:
					if (set_has(G.active, FRANCE))
						prompt_card(C_HOLY_MOTHER_RUSSIA_RU, "France will designate a Russian-controlled Key City after resolving their actions.")
					else
						prompt_card(C_HOLY_MOTHER_RUSSIA_RU, "France will designate a Russian-controlled Key City.")
					button_confirm()
					button_undo()
					return
				case 1:
					prompt_card(C_HOLY_MOTHER_RUSSIA_RU, "Designate a Russian-controlled Key City.")
					for (let area = FIRST_AREA; area <= LAST_AREA; ++area)
						if (is_key_city(area) && is_ru_controlled(area)) 
							action_area(area)
					return
				case 2: 
					prompt_card(C_HOLY_MOTHER_RUSSIA_RU, `The side controlling S${get_event_data(C_HOLY_MOTHER_RUSSIA_RU).key} at the end of the turn gains +1 VP.`)
					button_confirm()
					button_undo()
				}
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
					if (Array.isArray(G.active)) {
						if (!set_has(G.active, FRANCE)) { //If France is done doing their stuff & has exited the state
							set_add(G.active, FRANCE)
							L.state[FRANCE] = "holy_mother_russia_ru"
						}
						finish_state(RUSSIA)
					} else {
						G.active = FRANCE
						L.state[FRANCE] = "holy_mother_russia_ru"
					}
				} else {
					log_must_play_event(C_HOLY_MOTHER_RUSSIA_RU, get_event_data(C_HOLY_MOTHER_RUSSIA_RU).key)
					if (Array.isArray(G.active)) {
						finish_state(FRANCE)
					} else {
						G.active = RUSSIA
						finish_state(RUSSIA)
					}
				}
			},
			on_undo() {
				decrement_event_tracker(C_HOLY_MOTHER_RUSSIA_RU)
				if (R === FRANCE) get_event_data(C_HOLY_MOTHER_RUSSIA_RU).key = -1
			}
		},
		"extreme_weather_ru": //MODIFICATION: Russia draws a card after confirming the card's effects (in order to maintain a constant flow in case another must-play is drawn)
		{
			prompt() {
				switch(get_event_step(C_EXTREME_WEATHER_RU)) {
				case -1:
					prompt_card(C_EXTREME_WEATHER_RU, "France -2 orders this turn.")
					button_next()
					return
				case 0:
					prompt_card(C_EXTREME_WEATHER_RU, "1 fresh SP in each force that uses 'Forced March' or 'March' orders this turn is exhausted.")
					button_next()
					button_undo()
					return
				case 1: 
					prompt_card(C_EXTREME_WEATHER_RU, "Draw a card to your hand.")
					button_draw()
					button_undo()
				}
			},
			on_next() { increment_event_tracker(C_EXTREME_WEATHER_RU) },
			on_undo() { decrement_event_tracker(C_EXTREME_WEATHER_RU) },
			on_draw() {
				log_must_play_event(C_EXTREME_WEATHER_RU) //Handling here since another must-play could be drawn
				discard_or_remove_card(C_EXTREME_WEATHER_RU)
				draw_a_card(R)
			}
		},
		"command_friction": 
		{
			prompt() {
				prompt_card(C_COMMAND_FRICTION, "At the beginning of the 'Place Orders' phase, FR may designate an area with more than one 1 RU leader. RU must discard a card to place orders there.")
				button_confirm()
			},
			on_confirm() {
				log_must_play_event(C_COMMAND_FRICTION)
				discard_or_remove_card(C_COMMAND_FRICTION)
				finish_state(R)
			}
		},
		"poor_logistics":
		{
			prompt() {
				prompt_card(C_POOR_LOGISTICS, "This turn, the Russians may not use 'Place Depot' orders.")
				button_confirm()
			},
			on_confirm() {
				log_must_play_event(C_POOR_LOGISTICS)
				discard_or_remove_card(C_POOR_LOGISTICS)
				finish_state(R)
			}
		},
		"devastated_countryside":
		{
			prompt() {
				prompt_card(C_DEVASTATED_COUNTRYSIDE, "The effect of Devastation markers is doubled for both sides this turn.")
				button_confirm()
			},
			on_confirm() {
				log_must_play_event(C_DEVASTATED_COUNTRYSIDE)
				discard_or_remove_card(C_DEVASTATED_COUNTRYSIDE)
				finish_state(R)
			}
		},
		"barclay_de_tolly_resigns":
		{
			prompt() {
				if (!is_leader_on_map(L_DE_TOLLY)) {
					prompt_card(C_BARCLAY_DE_TOLLY_RESIGNS, `L${L_DE_TOLLY} is not on map – no effect.`)
					button("confirm")
				} else if (!is_leader_on_map(L_KUTUZOV)) {
					prompt_card(C_BARCLAY_DE_TOLLY_RESIGNS, `L${L_KUTUZOV} is not on map – no effect.`)
					button("confirm")
				} else {
					prompt_card(C_BARCLAY_DE_TOLLY_RESIGNS, `${L_KUTUZOV} is on map – remove L${L_DE_TOLLY} from play.`)
					action("leader", L_DE_TOLLY)
				}
			},
			on_confirm() {
				log_must_play_event(C_BARCLAY_DE_TOLLY_RESIGNS, false)
				discard_or_remove_card(C_BARCLAY_DE_TOLLY_RESIGNS)
				finish_state(R)
			},
			on_leader(leader) {
				move_leader(leader, OUT_OF_PLAY)
				log_must_play_event(C_BARCLAY_DE_TOLLY_RESIGNS, true)
				discard_or_remove_card(C_BARCLAY_DE_TOLLY_RESIGNS)
				finish_state(R)
			}
		},
		"poor_communications":
		{
			prompt() {
				prompt_card(C_POOR_COMMUNICATIONS, "At the end of the 'Place Orders' phase, RU may designate 1 placed FR order to remove.")
				button("confirm")
			},
			on_confirm() {
				log_must_play_event(C_POOR_COMMUNICATIONS)
				discard_or_remove_card(C_POOR_COMMUNICATIONS)
				finish_state(R)
			}
		},
		"jerome_goes_home":
		{
			prompt() {
				if (!is_leader_on_map(L_JEROME)) {
					prompt_card(C_JEROME_GOES_HOME, `L${L_JEROME} is not on map – no effect.`)
					button("confirm")
				} else {
					prompt_card(C_JEROME_GOES_HOME, `Remove L${L_JEROME} at no VP cost from S${get_leader_location(L_JEROME)}.`)
					action("leader", L_JEROME)
				}
			},
			on_confirm() {
				this.cleanup(false)
			},
			on_leader(leader) {
				move_leader(leader, OUT_OF_PLAY)
				this.cleanup(true)
			},
			cleanup(removed) {
				log_must_play_event(C_JEROME_GOES_HOME, removed)
				discard_or_remove_card(C_JEROME_GOES_HOME)
				finish_state(R)
			}
		},
		"chaos_in_the_rear_areas":
		{
			prompt() {
				prompt("TODO")
				button_done()
			},
			on_done() {
				log("TODO")
				finish_state(R)
			}
		},
		"vulnerable_supply_lines": 
		{
			prompt() {
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
						prompt_card(C_VULNERABLE_SUPPLY_LINES, `You discarded ${get_card_log_alias(get_event_data(C_VULNERABLE_SUPPLY_LINES).discarded_card)}.`)
						button_confirm()
						button_undo()
						return
					case 1:
						if (get_event_data(C_VULNERABLE_SUPPLY_LINES).depots_to_remove.length > 0) {
							prompt_card(C_VULNERABLE_SUPPLY_LINES, `Remove all unoccupied French Depot Markers (${join_array_with_and(get_event_data(C_VULNERABLE_SUPPLY_LINES).depots_to_remove.map(area => `S${area}`))}).`)
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
					finish_state(R)
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
		"freezing_weather": 
		{
			prompt() {
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
				finish_state(R)
			},
			on_undo() {
				decrement_event_tracker(C_FREEZING_WEATHER)
			}
		},
		"extreme_weather_fr": 
		{
			prompt() {
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
			on_confirm() { finish_state(R) },
			on_undo() { decrement_event_tracker(C_EXTREME_WEATHER_FR) },
		},
		"logistics_collapse":
		{
			prompt() {
				prompt_card(C_LOGISTICS_COLLAPSE, "For the rest of the game, France must discard a card from hand to execute a 'Place Depot' order.")
				button_confirm()
			},
			on_confirm() { finish_state(R) }
		},
		"chaotic_food_distribution":
		{
			prompt() {
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
							prompt_card(C_CHAOTIC_FOOD_DISTRIBUTION, `Rally an exhausted SP at S${get_event_data(C_CHAOTIC_FOOD_DISTRIBUTION).area}.`)
							for (let type of get_all_exhausted_sp_types(R, get_event_data(C_CHAOTIC_FOOD_DISTRIBUTION).area))
								action_troop(type)
						} else {
							prompt_card(C_CHAOTIC_FOOD_DISTRIBUTION, `No exhausted SPs at S${get_event_data(C_CHAOTIC_FOOD_DISTRIBUTION).area} to rally.`)
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
				log_must_play_event(C_CHAOTIC_FOOD_DISTRIBUTION, get_event_data(C_CHAOTIC_FOOD_DISTRIBUTION).area) //Handling here since another must-play could be drawn
				discard_or_remove_card(C_CHAOTIC_FOOD_DISTRIBUTION)
				draw_a_card(R)
			},
			on_confirm() {
				log_must_play_event(C_CHAOTIC_FOOD_DISTRIBUTION, "no effect")
				discard_or_remove_card(C_CHAOTIC_FOOD_DISTRIBUTION)
				finish_state(R)
			},
			on_undo() {
				if (get_event_step(C_CHAOTIC_FOOD_DISTRIBUTION) === 0) {
					G.depots[get_event_data(C_CHAOTIC_FOOD_DISTRIBUTION).removed_depot] = get_event_data(C_CHAOTIC_FOOD_DISTRIBUTION).area
					get_event_data(C_CHAOTIC_FOOD_DISTRIBUTION).area = -1
					get_event_data(C_CHAOTIC_FOOD_DISTRIBUTION).removed_depot = -1
				} else {
					if (get_event_data(C_CHAOTIC_FOOD_DISTRIBUTION).troop_type > -1) {
						exhaust_troop(R, get_event_data(C_CHAOTIC_FOOD_DISTRIBUTION).area, get_event_data(C_CHAOTIC_FOOD_DISTRIBUTION).troop_type - 1)
						get_event_data(C_CHAOTIC_FOOD_DISTRIBUTION).troop_type = -1
					}
				}
				decrement_event_tracker(C_CHAOTIC_FOOD_DISTRIBUTION)
			}
		},	
	},
	prompt() 		{ this.states[L.state[R]].prompt() },
	draw() 			{ this.states[L.state[R]].on_draw() },
	confirm() 		{ this.states[L.state[R]].on_confirm() },
	next() 			{ this.states[L.state[R]].on_next() },
	area(area) 		{ this.states[L.state[R]].on_area(area) },
	card(card) 		{ this.states[L.state[R]].on_card(card)},
	depot(depot) 	{ this.states[L.state[R]].on_depot(depot)},
	leader(leader) 	{ this.states[L.state[R]].on_leader(leader) },
	troop(type) 	{ this.states[L.state[R]].on_troop(type) },
	done() 			{ this.states[L.state[R]].on_done() },
	undo() 			{ this.states[L.state[R]].on_undo() }
}

//=== 2. PLAY A CARD FOR ADDITIONAL ORDERS ===
P.play_card_for_additional_orders = script(`
	log ""
	log "@Play a Card for Orders"
	set G.active [RUSSIA, FRANCE]
	call play_card_for_orders

	log "@Play Events"
	log ""
	eval { L.initiative = get_who_has_initiative() }
	set G.active (1 - L.initiative)
	call play_events_with_ops_card
	set G.active L.initiative
	call play_events_with_ops_card	
`)

function get_who_has_initiative() {
	return (G.initiative > 0) ? FRANCE : RUSSIA
}

/*
	At the beginning of each new Turn, each player plays a card to increase the number of orders for that turn by its OPS value.
	If a player doesn’t want to use a card for extra orders, he uses his Dummy card to hide this intention from his opponent.
	Players then simultaneously flip their chosen card revealing it to the opponent. (p. 9)
*/

P.play_card_for_orders = {
	_begin() {
		L.played_card = [-1, -1]
		L.ops_played = [-1, -1]
	},
	prompt() {
		if (L.played_card[R] === -1) {
			prompt("Play a card for additional orders, or play a Dummy.")
			get_hand(R).forEach(card => action_card(card))
		} else {
			prompt(`You played ${get_card_log_alias(L.played_card[R])} for ${L.ops_played[R]} additional orders.`)
			button_confirm()
			button_undo()
		}
	},
	card(card) {
		L.played_card[R] = card
		L.ops_played[R] = get_card_ops(card)
		discard_card(card)
	},
	undo() {
		if (is_card_dummy(L.played_card[R]))
			return_dummy_to_hand(R)
		else
			add_to_hand(R, L.played_card[R])

		L.played_card[R] = -1
		L.ops_played[R] = -1
	},
	confirm() {
		set_delete(G.active, R)
		if (is_card_dummy(L.played_card[R])) {
			return_dummy_to_hand(R)
		} else {
			discard_card(L.played_card[R])
		}

		if (G.active.length === 0) {
			log()
			for (let who = RUSSIA; who <= FRANCE; ++who) {
				log(`${get_card_log_alias(L.played_card[who])}: +${L.ops_played[who]} orders`)
			}
			log()
			G.additional_orders = L.ops_played
			end()
		}
	}
}

/* 
	Basic rules:
		First, the non-initiative player declares if he wants to play any events along with his OPS card and
		place the chosen event(s) face up on the table, and then the player with the Initiative does the same. (p. 9)

	Events:
		RUSSIA
			1  Well-Disciplined Retreat
			3  Opolchenie
			10 Scorched Earth
			13 Garrison Troops
			15 Pride and Hesitation
			16 Kutuzov Appointed
			17 The Finland Corps
			18 Treaty of Bucharest
			19 The Czar Leaves the Army

		FRANCE
			1  Hard Marching
			2  Hard Marching
			3  War Weariness
			4  Holy Mother Russia
			5  Polish Support
			15 Peace Offer
			17 Davout Takes Command
			19 IX Corps Arrives
			20 XI Corps Arrives

*/

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
			prompt("Declare any events to be played with your OPs card, or pass.")
			for (let c of L.events_could_be_played) {
				action_card(c)
			}
			button_pass()
		} else if (L.has_played_event) {
			prompt("No more eligible events can be played.")
			button_done()
		} else {
			prompt("No eligible events can be played.")
			button_done()
		}
	},
	card(c) {
		push_undo()
		L.active_card = c
		call("event", { card: c })
	},
	_resume() {
		array_delete_item(L.events_could_be_played, L.active_card)
		L.has_played_event = true
	},
	pass() {
		if (!L.has_played_event) {
			log(`${ROLES[G.active]} did not play events.`)
			end()
		} else
			end()
	},
	done() {
		this.pass()
	}
}

//=== 3. CHOOSE ORDERS ===
function calculate_num_orders() {
	//Each player has two free orders by default
	var orders = [2, 2] 
	
	//And some additional orders based on the OPs value of their committed card
	orders[RUSSIA] += G.additional_orders[RUSSIA]
	orders[FRANCE] += G.additional_orders[FRANCE]

	// RU #11: Holy Mother Russia - Russia +2 orders
	if (is_event_active(C_HOLY_MOTHER_RUSSIA_RU)) { 
		orders[RUSSIA] += 2
	}

	// RU #14: Extreme Weather - France -2 orders
	if (is_event_active(C_EXTREME_WEATHER_RU)) {
		orders[FRANCE] = Math.max(0, orders[FRANCE] - 2)
	}

	// FR #42: Extreme Weather - Both sides -2 orders
	if (is_event_active(C_EXTREME_WEATHER_FR)) {
		orders[RUSSIA] = Math.max(0, orders[RUSSIA] - 2)
		orders[FRANCE] = Math.max(0, orders[FRANCE] - 2)
	}

	return orders
}

function find_forbidden_orders() { //Being proactive here, maybe rollback later?
	let forbidden_orders = [[], []]

	// RU #45: Russia may not use 'Place Depot' orders.
	if (is_event_active(C_POOR_LOGISTICS)) {
		L.forbidden_orders[RUSSIA].push(PLACE_DEPOT)
	}

	// FR #41: France may not use 'Place Depot' or 'Forage' orders.
	if (is_event_active(C_FREEZING_WEATHER)) {
		L.forbidden_orders[FRANCE].push(PLACE_DEPOT, FORAGE)
	}

	// FR #42: Neither side may use 'Forced March' orders.
	if (is_event_active(C_EXTREME_WEATHER_FR)) {
		L.forbidden_orders[RUSSIA].push(FORCED_MARCH)
		L.forbidden_orders[FRANCE].push(FORCED_MARCH)
	}

	return forbidden_orders
}

/*
	Choose Orders
	Current order of selection: (mainly so that players are able to pick all the specified orders before moving to freely choosable ones)

	Apply leader abilities first:
		Platov - may select a free 'Cossack Raid' or 'Evade' order

	Then orders limited to a specific type:
		Basic free orders -
			Russia - 1 Cavalry Patrols
			France - 1 Forage

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

		Optional rule (Increased French Command Capability) -
			France - 1 Cavalry Patrols

	Then orders that may be selected among any of the remaining options.
		Basic:
			Russia - 2 orders
			France - 2 orders

		Committed card:
			Russia - X orders (1-3 depending on card)
			France - X orders (1-4 depending on card)

		Events - 
			RU #11 Holy Mother Russia
				Russia - 2 orders
			RU #14 Extreme Weather
				France: -2 orders
			FR #42 Extreme Weather
				Russia: -2 orders
				France: -2 orders

	Some orders may not be used during a turn (dictated by events), but can be selected (and used as a Dummy).
	TODO: Add warnings for this.		
*/

function get_selected_orders(who) {
	return G.selected_orders[who]
}

function generate_select_order_actions(who, types) {
	if (typeof types === 'number') types = [types]

	for (let order = get_first_order(who); order <= get_last_order(who); ++order) 
		if (!get_selected_orders(who).includes(order) && (types.includes(get_order_type(order))))
			action_order(order)
}

function get_current_turn() {
	return G.turn
}

const STATE_SELECT_FREE_ORDER_PLATOV = 0
const STATE_SELECT_BASIC_FREE_ORDER = 1
const STATE_SELECT_DUMMY_ORDERS = 2
const STATE_FRENCH_LOGISTIC_PREPARATIONS = 3
const STATE_SCORCHED_EARTH = 4
const STATE_KUTUZOV_APPOINTED = 5
const STATE_HARD_MARCHING_1 = 6
const STATE_HARD_MARCHING_2 = 7
const STATE_INCREASED_FRENCH_COMMAND_CAPABILITY = 8
const STATE_SELECT_ORDERS_MAIN = 9

const CHOOSE_ORDERS_STATE_TRANSITIONS = [
	function(who) { return (who === RUSSIA) && is_leader_on_map(L_PLATOV) },
	function() { return true },
	function() { return true },
	function(who) { return (who === FRANCE) && (get_current_turn() === JUNE_5) },
	function(who) { return (who === RUSSIA) && is_event_active(C_SCORCHED_EARTH) },
	function(who) { return (who === RUSSIA) && is_event_active(C_KUTUZOV_APPOINTED) },
	function(who) { return (who === FRANCE) && is_event_active(C_HARD_MARCHING_1) },
	function(who) { return (who === FRANCE) && is_event_active(C_HARD_MARCHING_2) },
	function(who) { return (who === FRANCE) && false /*TODO is_increased_french_command_capability()*/ },
	function() { return true },
]

P.select_orders = {
	_begin() {
		G.active = [RUSSIA, FRANCE]
		log_h2("Select Orders")

		L.num_orders = calculate_num_orders() //Number of basic 'any-choose' orders

		G.selected_orders = [[], []] //Stack of orders selected by each side, can be popped to undo
		L.state = [-1, -1]
		L.state_history = [[], []] //Stack for undo purposes

		this.update_state(RUSSIA)
		this.update_state(FRANCE)
		
		L.count = [-1, -1] //Generic counting variable used in multiple sub-states
		L.already_selected = [[], []] //To track whether a type of order has already been selected in this sub-state
	},
	prompt() {
		switch(L.state[R]) {
		case STATE_SELECT_FREE_ORDER_PLATOV:
			prompt_leader(L_PLATOV, "Select a Cossack Raid or Evade order.")
			generate_select_order_actions(R, [COSSACK_RAID, EVADE])
			break
		case STATE_SELECT_BASIC_FREE_ORDER:
			if (R === RUSSIA) {
				prompt("Select basic orders: 1 Cavalry Patrols.")
				generate_select_order_actions(R, CAVALRY_PATROLS)
			} else {
				prompt("Select basic orders: 1 Forage.")
				generate_select_order_actions(R, FORAGE)
			}
			break
		case STATE_SELECT_DUMMY_ORDERS:
			prompt(`Select dummy orders (${L.count[R]} remaining).`)
			generate_select_order_actions(R, DUMMY_ORDER)
			break
		case STATE_FRENCH_LOGISTIC_PREPARATIONS:
			if (set_has(L.already_selected, PLACE_DEPOT))
				prompt("French Logistic Preparations: Select 1 March order.")
			else if (set_has(L.already_selected, MARCH))
				prompt("French Logistic Preparations: Select 1 Place Depot order.")
			else
				prompt(`French Logistic Preparations: Select 1 Place Depot and 1 March order.`) //TODO: Modify prompt dynamically
			
			for (let order = get_first_order(R); order <= get_last_order(R); ++order) 
				if (!get_selected_orders(R).includes(order) && (get_order_type(order) === PLACE_DEPOT || get_order_type(order) === MARCH) && !set_has(L.already_selected[R], get_order_type(order)))
					action_order(order)
			break
		case STATE_SCORCHED_EARTH:
			prompt_card(C_SCORCHED_EARTH, "Select 1 Evade order.")
			generate_select_order_actions(R, EVADE)
			break
		case STATE_KUTUZOV_APPOINTED:
			prompt_card(C_KUTUZOV_APPOINTED, "Select 1 Rally order.")
			generate_select_order_actions(R, RALLY)
			break
		case STATE_HARD_MARCHING_1:
			prompt_card(C_HARD_MARCHING_1, "Select 1 Forced March order.")
			generate_select_order_actions(R, FORCED_MARCH)
			break
		case STATE_HARD_MARCHING_2:
			prompt_card(C_HARD_MARCHING_2, "Select 1 Forced March order.")
			generate_select_order_actions(R, FORCED_MARCH)
			break
		case STATE_INCREASED_FRENCH_COMMAND_CAPABILITY:
			prompt("Increased French Command Capability: Select 1 Cavalry Patrols order.")
			generate_select_order_actions(R, CAVALRY_PATROLS)
			break
		case STATE_SELECT_ORDERS_MAIN:
			if (L.count[R] > 0) {
				prompt(`Select ${L.count[R]} more orders.`)
				for (let order = get_first_order(R); order <= get_last_order(R); ++order) {
					if (!get_selected_orders(R).includes(order)) action_order(order)
				}
			} else {
				prompt(`Select orders: All done.`)
				button_done()
			}
		}
		button_undo(G.selected_orders[R].length > 0)
	},
	order(order_id) {
		G.selected_orders[R].push(order_id)
		switch(L.state[R]) {
		case STATE_SELECT_FREE_ORDER_PLATOV: //Saving Platov choice for enforcement in 'Place Orders'
			G.platov_order = order_id
			this.update_state(R)
			return
		case STATE_SELECT_DUMMY_ORDERS: //Change states only after all 4 Dummies are placed
			if (--L.count[R] <= 0) this.update_state(R) 
			return
		case STATE_FRENCH_LOGISTIC_PREPARATIONS: //Change states only after both 'March' and 'Place Depot' are placed
			set_add(L.already_selected[R], get_order_type(order_id))
			if (L.already_selected[R].length === 2) this.update_state(R)
			return
		case STATE_SELECT_ORDERS_MAIN: //No transition
			--L.count[R]
			return
		default:
			this.update_state(R)	
		}
	},
	done() {
		set_delete(G.active, R)
		log(`${ROLES[R]} selected ${G.selected_orders[R].length} orders.`)
		if (G.active.length === 0) {
			log()
			end()
		}
	},
	undo() {
		G.selected_orders[R].pop()

		switch(L.state[R]) {
		case STATE_SELECT_DUMMY_ORDERS:
			if (L.count[R] < 4) ++L.count[R] //If any dummies are on map, just increment the number of dummies left to place
			else  L.state[R] = L.state_history[R].pop() //Else go back to previous state
			break
		case STATE_FRENCH_LOGISTIC_PREPARATIONS:
			if (L.already_selected[R].length === 0) { //If neither 'Place Depot' nor 'March' has been selected, rewind state
				L.state[R] = L.state_history[R].pop()
				L.count[R] = 1
			} else { //Remove the latest selection
				L.already_selected[R].pop()
			}
			break
		case STATE_SELECT_ORDERS_MAIN:
			if (L.count[R] < L.num_orders[R]) { //If any orders placed in this step remain, just increment the num. of orders left to place
				++L.count[R]
				break
			}
			//If no orders placed, fallthrough to default (to rewind back to the correct state & initialize flags)
		default:
			L.state[R] = L.state_history[R].pop()

			if (L.state[R] === STATE_SELECT_DUMMY_ORDERS)
				L.count[R] = 1
			else if (L.state[R] === STATE_SELECT_ORDERS_MAIN)
				L.count[R] = 1
			else if (L.state[R] === STATE_FRENCH_LOGISTIC_PREPARATIONS)
				L.already_selected[R].pop()
		}

		if (L.state[R] === STATE_SELECT_FREE_ORDER_PLATOV) G.platov_order = -1
	},
	update_state(who) {
		for (let state = L.state[who] + 1; state <= CHOOSE_ORDERS_STATE_TRANSITIONS.length; ++state) { //Pick the next state, in the order of states defined above that could be performed
			if (CHOOSE_ORDERS_STATE_TRANSITIONS[state](who)) {
				L.state_history[who].push(L.state[who])
				L.state[who] = state
				break
			}
		}
		//Initialize flags for states where multiple orders are placed
		switch(L.state[who]) {
		case STATE_SELECT_DUMMY_ORDERS: L.count[R] = 4; return
		case STATE_FRENCH_LOGISTIC_PREPARATIONS: L.already_selected[R].length = 0; return
		case STATE_SELECT_ORDERS_MAIN: L.count[R] = L.num_orders[R]; return
		}
	}
}

//=== 4. PLACE ORDERS ===
//TODO: Allow alternating placing orders (implementing simultaneous optional rule as default for expediency)
P.place_orders = script(`
	log "@Place Orders"
	
	set G.active FRANCE
	if (is_event_active(C_COMMAND_FRICTION)) {
		call command_friction
	}
	call place_orders_events { time: "beginning" }

	set G.active [RUSSIA, FRANCE]
	call do_place_orders

	set G.active RUSSIA
	if (is_event_active(C_POOR_COMMUNICATIONS)) {
		call poor_communications
	}
	call place_orders_events { time: "end" }
`)

//Common state for events that could be played at the beginning of place orders or end of place orders
//The structure is identical, just the list of events that could be played vary and the player taking actions (beginning: FRANCE, end: RUSSIA)
P.place_orders_events = { 
	_begin() {
		//L.time
		L.events = (L.time === "beginning") ? [C_INFIGHTING_AND_INTRIGUE, C_LETHARGIC_PURSUIT] : [C_NEW_POSTING, C_EXHAUSTED_HORSES, C_DISORDERLY_MARCH]
		L.playable_events = L.events.filter(card => can_play_event(card) && hand_has(G.active, card))
		L.has_played_event = false
	},
	prompt() {
		if (L.playable_events.length > 0) {
			prompt(`You may play events (${L.events.map(card => get_card_log_alias(card)).join(", ")}).`)
			for (let c of L.playable_events) 
				action_card(c)
			button_pass()
		} else {
			if (L.has_played_event)
				prompt("Play Events: All done.")
			else 
				prompt(`You do not have ${join_array_with_or(L.events.map(card => get_card_log_alias(card, NONE)))}.`)
			button_done()
		}
	},
	card(c) {
		push_undo()
		L.has_played_event = true
		set_delete(L.playable_events, c)
		call("event", { card: c })
	},
	pass() { end() },
	done() { end() }
}

//TODO: implement orders that must be placed on a specific spot (e.g. Platov, french optional rule)
P.do_place_orders = {
	_begin() {
		L.orders_to_place = G.selected_orders.slice() //Copy selected orders
		L.selected_order = [-1, -1] //The order that each player has currently selected

		L.state = ["", ""]
		L.state[RUSSIA] = is_leader_on_map(L_PLATOV) ? "place_platov_order" : "place_orders_main"
		L.state[FRANCE] = false /*is_increased_french_command_capability()*/ ? "place_increased_french_command_capability_order" : "place_orders_main"

		L.orders_placed = [[], []] //Undo stack

		G.selected_orders = [[], []]
	},
	is_french_logistic_preparations() {
		return (G.turn === JUNE_5) && (R === FRANCE) && (get_order_type(L.selected_order[R]) === PLACE_DEPOT)
	},
	prompt() {
		if (L.orders_to_place[R].length === 0) {
			prompt("Place Orders: All done.")
			button_confirm()
		}
		else if (L.selected_order[R] === -1) {
			if (L.state[R] === "place_platov_order") {
				prompt_leader(L_PLATOV, `Select a ${get_order_name(G.platov_order)} order.`)
				for (let order of L.orders_to_place[R])
					if (get_order_type(order) === get_order_type(G.platov_order))
						action_order(order)
			}
			else if (L.state[R] === "place_increased_french_command_capability_order") {
				prompt(`Increased French Command Capability: Select a Cavalry Patrols order.`)
				for (let order of L.orders_to_place[R])
					if (get_order_type(order) === CAVALRY_PATROLS)
						action_order(order)
			}
			else {
				prompt(`Select an order to place (${L.orders_to_place[R].length} remaining).`)
				for (let order of L.orders_to_place[R]) action_order(order)
			}
		}
		else {
			if (L.state[R] === "place_platov_order") {
				prompt(`Place ${get_order_name(G.platov_order)} with L${L_PLATOV} at S${get_leader_location(L_PLATOV)}.`)
				action_area(get_leader_location(L_PLATOV))
			}
			else if (L.state[R] === "place_increased_french_command_capability_order") {
				prompt(`Increased French Command Capability: Place a 'Cavalry Patrols' order at S${get_leader_location(L_NAPOLEON)}.`)
				action_area(get_leader_location(L_NAPOLEON))
			}
			else {
				if (this.is_french_logistic_preparations()) //French Logistic Preparations special rule
					prompt(`French Logistic Preparations: Place ${get_order_name(L.selected_order[R])} in any area with friendly SPs, or Kovno.`)
				else
					prompt(`Place ${get_order_name(L.selected_order[R])} in any area with friendly SPs.`)

				for (let area = FIRST_AREA; area <= LAST_AREA; ++area) {
					if (has_friendly_troop(R, area) || (this.is_french_logistic_preparations() && (area === S_KOVNO)) )
						action_area(area)
				}
			}
		}
		button_undo((L.orders_placed[R].length > 0) || (L.selected_order[R] !== -1))
	},
	order(order) {
		L.selected_order[R] = order
		G.selected_orders[R].push(order) //Utilizing existing client logic to highlight the order
	},
	area(area) {
		G.orders[L.selected_order[R]] = area //Update order's location
		add_to_orders_by_type(L.selected_order[R])
		G.selected_orders[R] = [] //Unhighlight the order that was just placed

		//Move order from 'to place' to 'placed'
		array_delete_item(L.orders_to_place[R], L.selected_order[R])
		L.orders_placed[R].push(L.selected_order[R])

		L.selected_order[R] = -1
		if (L.state[R] !== "place_orders_main") L.state[R] = "place_orders_main"
	},
	undo() {
		if (L.selected_order[R] > -1) { //i.e. has an order selected
			G.selected_orders[R].pop()
			L.selected_order[R] = -1
		} else {
			L.selected_order[R] = L.orders_placed[R].pop()
			
			G.orders[L.selected_order[R]] = POOL
			set_delete(G.orders_by_type[get_order_type(L.selected_order[R])][get_order_owner(L.selected_order[R])], L.selected_order[R])
			G.selected_orders[R].push(L.selected_order[R])

			L.orders_to_place[R].push(L.selected_order[R])
			if (L.orders_placed[R].length === 0)
				if ((R === RUSSIA) && (is_leader_on_map(L_PLATOV)))
					L.state[R] = "place_platov_order"
				else if ((R === FRANCE) && (false /*is_increased_french_command_capability()*/ )) //TO REPLACE AFTER ADDING OPTIONAL RULES
					L.state[R] = "place_increased_french_command_capability_order"
		}
	},
	confirm() {
		set_delete(G.active, R)
		if (G.active.length === 0) {
			let orders_by_area = []
			for (let who = RUSSIA; who <= FRANCE; ++who) {
				for (let order of L.orders_placed[who]) {
					if (!map_has(orders_by_area, get_order_location(order))) map_set(orders_by_area, get_order_location(order), [])
					
					set_add(map_get(orders_by_area, get_order_location(order), null), order)
				}
			}

			log()
			log("Placed")
			map_for_each(orders_by_area, (area, entries) => {
				if (entries.some(o => get_order_owner(o) === RUSSIA)) log_only(RUSSIA, `>S${area}`)
				if (entries.some(o => get_order_owner(o) === FRANCE)) log_only(FRANCE, `>S${area}`)
				for (let order of entries) {
					log_only(get_order_owner(order), "<" + get_order_type_name(get_order_type(order)))
				}
				
			})
			log()

			end()
		}
	}
}

//=== COMMON ORDER EXECUTION STATES ===
P.determine_who_goes_first = {
	_begin() {
		//L.order_type
		log_h3("First Player")
		log()

		//These events are mutually exclusive since Evasive Maneuvers is summer-only and Energetic Leadership is winter-only
		if ((L.order_type === FORCED_MARCH) && can_play_event(C_EVASIVE_MANEUVERS)) {
			L.state = C_EVASIVE_MANEUVERS
			G.active = RUSSIA
		} else if (can_play_event(C_ENERGETIC_LEADERSHIP)) {
			L.state = C_ENERGETIC_LEADERSHIP
			G.active = FRANCE
		} else {
			L.state = -1
			G.active = get_who_has_initiative()
		}

		L.has_played_card = false
		L.step = -1
		L.first_player = -1
	},
	inactive: "choose who goes first",
	prompt() {
		switch(L.state) {
		case C_EVASIVE_MANEUVERS:
			if (L.played_card) {
				prompt_card(C_EVASIVE_MANEUVERS, "Russia executes all forced march orders first this turn, but may not end moves in or adjacent to enemy-occupied areas.")
				button_confirm()
			} else {
				if (hand_has(G.active, C_EVASIVE_MANEUVERS)) {
					prompt(`You may play ${get_card_log_alias(C_EVASIVE_MANEUVERS)}.`)
					action_card(C_EVASIVE_MANEUVERS)
					button_pass()
				} else {
					prompt(`You do not have ${get_card_log_alias(C_EVASIVE_MANEUVERS)} in hand.`)
					button_pass()
				}
			}
			return
		case C_ENERGETIC_LEADERSHIP:
			if (L.played_card) {
				if (L.step === -1) {
					prompt_card(C_ENERGETIC_LEADERSHIP, `France executes ${get_order_type_name(L.order_type)} orders first this turn.`)
					button_next()
				} else {
					prompt_card(C_ENERGETIC_LEADERSHIP, "All done.")
					button_confirm()
				}
			} else {
				if (hand_has(G.active, C_ENERGETIC_LEADERSHIP)) {
					prompt(`You may play ${get_card_log_alias(C_ENERGETIC_LEADERSHIP)}.`)
					action_card(C_ENERGETIC_LEADERSHIP)
					button_pass()
				} else {
					prompt(`You do not have ${get_card_log_alias(C_ENERGETIC_LEADERSHIP)}.`)
					button_pass()
				}
			}
			return
		default:
			if (L.step === -1) {
				prompt(`Pick who executes ${get_order_type_name(L.order_type)} first this turn.`)
				button("russia")
				button("france")
			} else {
				prompt(`You chose ${ROLES[L.first_player]} to go first.`)
				button_confirm()
			}
			return
		}
	},
	card(card) {
		push_undo()
		L.played_card = true
		card_box_begin(card)
	},
	next() {
		push_undo()
		++L.step
	},
	pass() {
		push_undo()
		G.active = get_who_has_initiative()
		L.state = -1
		L.step = -1
	},
	_resume() {
		++L.step
	},
	confirm() {
		if (L.played_card) {
			log("Russia executes all 'Forced March' orders first this turn, but may not end moves in or adjacent to enemy-occupied areas.")
			card_box_end()
			if ((L.state === C_EVASIVE_MANEUVERS) || (L.state === C_ENERGETIC_LEADERSHIP)) {
				add_persistent_event(L.state)
				discard_card(L.state)
			} 
			
			if (L.state === C_ENERGETIC_LEADERSHIP) {
				L.first_player = FRANCE
			} else if (L.state === C_EVASIVE_MANEUVERS) {
				L.first_player = RUSSIA
			}
		} else {
			log(`${ROLES[G.active]} chose ${ROLES[L.first_player]} to go first.`)
		}
		L.L.$ = L.first_player
		
		end()
	},
	russia() {
		push_undo()
		L.first_player = RUSSIA
		++L.step
		if (L.state === C_EVASIVE_MANEUVERS) call("draw_card_to_hand")
	},
	france() {
		push_undo()
		L.first_player = FRANCE
		++L.step
		if (L.state === C_EVASIVE_MANEUVERS) call("draw_card_to_hand")
	}
}

/* 
	Napoléon 	- may change any order to any order
	Davout 		- may change an order to 'March'
	Schwarzen.	- may discard a card to place an Evade order during that step

	Kutuzov		- may change any order to Rally
	de Tolly	- may change an order to 'Evade'
	Bagration	- may change an order to 'Defend'
	Chichagov	- may discard a card to place a 'Forced March' order during that step
*/

function can_change_order_to(leader, current_type, type_to, area) {
	let side = get_leader_faction(leader)

	//If in an execution phase PRIOR to the order the leader has the ability to switch to,
	//there must be an order of the current type in the leader's location and an order of the type he can switch to in the pool.
	if (current_type < type_to)
		return (has_order_of_type(side, current_type, area) && has_order_of_type(side, type_to, POOL))

	//If in the execution phase of the order the leader has the ability to switch to,
	//there must be a non-dummy (since dummies don't count) order at the leader's location and an order of the type he can switch to in the pool.
	if (current_type === type_to)
		return get_orders_at_area(get_leader_faction(leader), area).some(order => (get_order_type(order) !== DUMMY_ORDER) && (get_order_type(order) !== current_type)) && has_order_of_type(side, type_to, POOL)

	return false
}

function can_switch_order(leader, current_type) {
	if (!is_leader_on_map(leader) || !is_seniormost_leader(leader, get_leader_location(leader))) return false
	let area = get_leader_location(leader)
	

	switch(leader) {
	//May change an order to ‘Rally’.
	case L_KUTUZOV:
		return can_change_order_to(L_KUTUZOV, current_type, RALLY, area)
	//May change an order to ‘Evade’
	case L_DE_TOLLY:
		return can_change_order_to(L_DE_TOLLY, current_type, EVADE, area)
	//May change an order to ‘Defend’
	case L_BAGRATION:
		return can_change_order_to(L_BAGRATION, current_type, DEFEND, area)
	//May discard a card to place a ‘Forced March’ order in that order´s step
	case L_CHICHAGOV:
		return (current_type === FORCED_MARCH) && (has_card_in_hand(RUSSIA) && has_order_of_type(RUSSIA, FORCED_MARCH, POOL))
	//May change an order to ANY order
	case L_NAPOLEON:
		return (has_order_of_type(FRANCE, current_type, area) && has_switchable_order_in_pool(FRANCE, current_type)) || (has_non_dummy_order_at_area(FRANCE, area) && has_order_of_type(FRANCE, current_type, POOL))
	//May change an order to ‘March’
	case L_DAVOUT:
		return can_change_order_to(L_DAVOUT, current_type, MARCH, area)
	//May discard a card to place an ‘Evade’ order during that order´s step
	case L_SCHWARZENBERG:
		return (current_type === EVADE) && (has_card_in_hand(FRANCE) && has_order_of_type(FRANCE, EVADE, POOL))
	}
}

P.change_orders = {
	_begin() {
		//L.current_order_type
		//Defend doesn't have its own phase, so it might be unclear
		if (L.current_order_type === DEFEND || L.current_order_type === FORAGE) 
			log_h3(`Change Orders – ${get_order_type_name(L.current_order_type)}`)
		else
			log_h3("Change Orders")
			
		log()

		G.active = [RUSSIA, FRANCE]

		L.selected_leader = [-1, -1]
		L.step = [-1, -1]

		L.leaders_who_can_use_abilities = [[L_KUTUZOV, L_DE_TOLLY, L_BAGRATION, L_CHICHAGOV], [L_NAPOLEON, L_DAVOUT, L_SCHWARZENBERG]]

		//Undo
		L.leaders_who_have_used_abilities = [[], []]
		L.switches = [[], []]
		L.removed_orders = [[], []]
		L.placed_orders = [[], []]
		L.discarded_card = [-1, -1]
		L.napoleon_action = -1
		L.log = [[], []] //Cache of all logging, sorted by player (all done at the end of the state)

		for (let who = RUSSIA; who <= FRANCE; ++who)
			L.leaders_who_can_use_abilities[who] = L.leaders_who_can_use_abilities[who].filter(leader => can_switch_order(leader, L.current_order_type))
	},
	push_log(text) {
		L.log[R].push(text)
	},
	pop_log() {
		L.log[R].pop()
	},
	prompt() {
		if (L.leaders_who_can_use_abilities[R].length > 0) {
			switch(L.selected_leader[R]) {
			case -1:
				prompt(`You may use leader abilities to change orders (${join_array_with_or(L.leaders_who_can_use_abilities[R].map(leader => `L${leader}`))}).`)
				for (let leader of L.leaders_who_can_use_abilities[R]) 
					action("leader_button", leader)
				button_pass()
				break
			case L_KUTUZOV:
				this.prompt_change_order_to(RALLY)
				break
			case L_DE_TOLLY:
				this.prompt_change_order_to(EVADE)
				break
			case L_BAGRATION:
				this.prompt_change_order_to(DEFEND)
				break
			case L_CHICHAGOV:
				this.prompt_discard_card_to_place(FORCED_MARCH)
				break
			case L_NAPOLEON: //Handled independently since he can do a mixture of both types of 'switch orders'
				if (L.step[R] === -1) {
					prompt_leader(L_NAPOLEON, `Change an order at S${get_leader_location(L_NAPOLEON)} to any non-Dummy order.`)
					for (let order of get_orders_at_area(R, get_leader_location(L_NAPOLEON))) {
						//If Napoleon can switch OUT of the current order, generate actions on all the orders of the current order type at Napoleon's location
						if ((has_order_of_type(FRANCE, L.current_order_type, get_leader_location(L_NAPOLEON)) && has_switchable_order_in_pool(FRANCE, L.current_order_type))) {
							if (get_order_type(order) === L.current_order_type) action_order(order)
						}
						//If there is an order of the current order type in the pool and a non-dummy order in Napoleon's location, he can switch INTO the current order type
						if ((has_non_dummy_order_at_area(FRANCE, get_leader_location(L_NAPOLEON)) && has_order_of_type(FRANCE, L.current_order_type, POOL))) {
							if (get_order_type(order) !== DUMMY_ORDER) action_order(order)
						}
					}
				} else {
					prompt_leader(L_NAPOLEON, `Pick a non-Dummy order from your pool to place at S${get_leader_location(L_NAPOLEON)}.`)
					for (let order of get_orders_at_area(R, POOL))
						if (get_order_type(order) > L.current_order_type) 
							action_order(order)
				}
				break
			case L_DAVOUT:
				this.prompt_change_order_to(MARCH)
				break
			case L_SCHWARZENBERG:
				this.prompt_discard_card_to_place(EVADE)
				break
			}
		} else {
			prompt(`No leader abilities can be triggered now.`)
			button_done()
		}
		button_undo((L.leaders_who_have_used_abilities[R].length > 0) || (L.selected_leader[R] > -1))
	},
	prompt_change_order_to(type) {
		let leader_location = get_leader_location(L.selected_leader[R])
		prompt_leader(L.selected_leader[R], `Change an order at S${leader_location} to '${get_order_type_name(type)}'.`)
		if (L.current_order_type < type) {
			for (let order of get_orders_at_area(R, leader_location))
				if (get_order_type(order) === L.current_order_type) 
					action_order(order)
		} else {
			for (let order of get_orders_at_area(R, leader_location))
				if ((get_order_type(order) !== DUMMY_ORDER) && (get_order_type(order) !== type)) 
					action_order(order)
		}
	},
	prompt_discard_card_to_place(type) {
		if (L.step[R] === -1) {
			prompt_leader(L.selected_leader[R], `Discard a card in order to place '${get_order_type_name(type)}'.`)
			get_non_dummy_cards_in_hand(R).forEach(action_card)
		} else {
			let leader_location = get_leader_location(L.selected_leader[R])
			prompt_leader(L.selected_leader[R], `Place a '${get_order_type_name(type)}' order at S${leader_location}.`)
			for (let order of get_orders_at_area(R, POOL))
				if (get_order_type(order) === type)
					action_order(order)
		}
	},
	order(order) {
		this.push_log(`L${L.selected_leader[R]} at S${get_leader_location(L.selected_leader[R])}`)
		switch(L.selected_leader[R]) {
		case L_KUTUZOV:
			this.switch_order(order, RALLY)
			break
		case L_DE_TOLLY:
			this.switch_order(order, EVADE)
			break
		case L_BAGRATION:
			log(`L${L_BAGRATION}`)
			this.switch_order(order, DEFEND)
			break
		case L_CHICHAGOV:
			place_order(order, get_leader_location(L_CHICHAGOV))
			L.placed_orders[R].push(order)
			this.push_log(`>Discarded a card to place ${get_order_name(order)}.`)
			break
		case L_NAPOLEON: //The one unique case, so involves more bespoke code compared to the other leaders
			if (L.step[R] === -1) {
				L.napoleon_action = 1
				if (get_order_type(order) === L.current_order_type) {
					remove_order(order)
					L.removed_orders[R].push(order)
					++L.step[R]
					return
				} else {
					L.napoleon_action = 2
					this.switch_order(order, L.current_order_type)
					this.push_log(`>Changed an order.`)
					break
				}
			} else {
				L.napoleon_action = 3
				place_order(order, get_leader_location(L_NAPOLEON))
				L.placed_orders[R].push(order)
				this.push_log(`>Changed an order.`)
				break
			}
		case L_DAVOUT:
			this.switch_order(order, MARCH)
			break
		case L_SCHWARZENBERG:
			place_order(order, get_leader_location(L_SCHWARZENBERG))
			L.placed_orders[R].push(order)
			this.push_log(`>Discarded a card to place ${get_order_name(order)}.`)
		}
		set_delete(L.leaders_who_can_use_abilities[R], L.selected_leader[R])
		L.leaders_who_have_used_abilities[R].push(L.selected_leader[R])
		L.selected_leader[R] = -1
	},
	switch_order(order, replacement_type) {
		remove_order(order)
		let replacement_order = add_order_of_type_from_pool(R, replacement_type, get_leader_location(L.selected_leader[R]))
		L.switches[R].push([order, replacement_order]) 
		if (L.selected_leader[R] !== L_NAPOLEON)
			this.push_log(`>Changed an order to ${get_order_type_name(replacement_type)}.`)
	},
	undo() {
		if (L.selected_leader[R] > -1) {
			if (L.step[R] === -1) { //A leader is currently selected, but not an order
				L.selected_leader[R] = -1
			} else {
				if ((L.selected_leader[R] === L_CHICHAGOV) || (L.selected_leader[R] === L_SCHWARZENBERG)) {
					set_delete(get_discard(R), L.discarded_card[R])
					add_to_hand(R, L.discarded_card[R])
					L.discarded_card[R] = -1
				} else if (L.selected_leader[R] === L_NAPOLEON) {
					place_order(L.removed_orders[R].pop(), get_leader_location(L_NAPOLEON))
				}
				--L.step[R]
			}
		} else {
			L.selected_leader[R]  = L.leaders_who_have_used_abilities[R].pop()
			this.pop_log(R)

			//All leaders with a change order to TYPE ability
			if ((L.selected_leader[R] === L_KUTUZOV) || (L.selected_leader[R] === L_DE_TOLLY) || (L.selected_leader[R] === L_BAGRATION) || (L.selected_leader[R] === L_DAVOUT) || ((L.selected_leader[R] === L_NAPOLEON) && (L.napoleon_action === 2))) {
				let previous_switch = L.switches[R].pop()
				let order_that_was_removed = previous_switch[0]
				let order_that_was_placed = previous_switch[1]

				remove_order(order_that_was_placed)
				place_order(order_that_was_removed, get_leader_location(L.selected_leader[R]))
			}
			else if ((L.selected_leader[R] === L_CHICHAGOV) || (L.selected_leader[R] === L_SCHWARZENBERG) || ((L.selected_leader[R] === L_NAPOLEON) && (L.napoleon_action === 3))) {
				let order_that_was_placed = L.placed_orders[R].pop()

				remove_order(order_that_was_placed)
				
				L.step[R] = 0

				if (L.selected_leader[R] === L_NAPOLEON) L.napoleon_action = 1
			}

			set_add(L.leaders_who_can_use_abilities[R], L.selected_leader[R])
		}
	},
	leader_button(leader) {
		L.selected_leader[R] = leader
		L.step[R] = -1
	},
	card(card) {
		discard_card(card)
		L.discarded_card[R] = card
		++L.step[R]
	},
	pass() { this.done() },
	done() {
		set_delete(G.active, R)

		if (L.leaders_who_have_used_abilities[R].length === 0)
			log(`${ROLES[R]} did not change orders.`)

		if (G.active.length === 0) {
			for (let who = RUSSIA; who <= FRANCE; ++who)
				for (let s of L.log[who])
					log(s)
			
			end()
		}
	}
}

P.execute_orders = script(`
	eval { log_h2(get_order_type_name(L.type)) }
	call change_orders { current_order_type: L.type }
	if (get_placed_orders_of_type(L.type).length === 0) {
		log
		eval { log("No " + get_order_type_name(L.type) + " orders placed.") }
		log
	} else {
		call determine_who_goes_first { order_type: L.type }

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

function has_depot_within_four_road_connections(who, area) {
	if (get_adjacent_areas_by_road(area).length === 0) return false

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

function filter_orders(who, type) {
	switch(type) {
	case FORCED_MARCH:
	case MARCH:
		filter_orders_of_type(who, type, (order) => {
			// Keep only the orders where there is (1) a friendly SP, and (2) at least one of those SPs haven't moved previously this turn
			// TODO: May be less confusing to filter out the second case at a later stage?
			let area = get_order_location(order)
			return has_friendly_troop(G.active, area) && (!map_has(G.moved, area) || get_movable_sps_in_area(G.active, area).some(type => type > 0))
		})
		return
	case CAVALRY_PATROLS:
		filter_orders_of_type(who, type, (order) => {
			return has_cavalry_or_cossack_in_area(who, get_order_location(order))
				&& (has_enemy_sp(who, get_order_location(order)) || get_all_adjacent_areas(get_order_location(order)).some(area => has_enemy_sp(who, area)))
		})
		return
	case EVADE:
		filter_orders_of_type(who, type, (order) => {
			return has_friendly_troop(G.active, get_order_location(order)) 
				&& has_battle(get_order_location(order)) 
				&& !is_event_active(C_UNSUCCESSFUL_DISENGAGEMENT) || (is_event_active(C_UNSUCCESSFUL_DISENGAGEMENT) && !set_has(map_get(G.persistent_events, C_UNSUCCESSFUL_DISENGAGEMENT).cancelled_orders, order))
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
			prompt(`Select next ${get_order_type_name(L.type)} order to execute. (${join_array_with_or(get_executable_orders(G.active, L.type).map(order => `S${get_order_location(order)}`))}) `)
			get_executable_orders(G.active, L.type).forEach(action_order)
		} else {
			prompt(`Execute ${get_order_type_name(L.type)} orders — All done.`)
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

		log()
		log_h4(`S${area}`, G.active)

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
		log_h4(`S${get_depot_location(depot)}`, G.active)
		remove_depot(depot, get_depot_location(depot))
	},
}

// TODO: Add 'pass turn' feature for expediency
P.end_order = {
	prompt() {
		prompt(`Execute ${get_order_type_name(L.type)} order — All done.`)

		if (L.type === FORCED_MARCH && G.active === FRANCE && G.move.path.length > 1)
			V.prompt += ` Russia may play ${get_card_log_alias(C_EXHAUSTING_MARCH_1)}.` // Putting in just one of the 'Exhausting March' cards

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
		} 
		else if (L.type === FORCED_MARCH && G.active === FRANCE) {
			G.active = enemy(G.active)
			goto("may_play_exhausting_march")
		}
		else if (has_executable_order(enemy(G.active), L.type)) {
			G.active = enemy(G.active)
			goto("execute_next_order", { type: L.type })
		} 
		else if (has_executable_order(G.active, L.type)) {
			goto("execute_next_order", { type: L.type })
		} 
		else {
			log()
			end()
		}
	},
	depot(depot) {
		push_undo()
		log_h4(`S${get_depot_location(depot)}`, G.active)
		remove_depot(depot, get_depot_location(depot))
	},
}

//=== 5. EXECUTE FORCED MARCH ORDERS ===
/*
	STATUS: Almost done.
	TODO: Bagration's Retreat, Indecision

	Events:
		RUSSIA
			RU #4 	Evasive Maneuvers		- before determine_initiative
			RU #6 	Bagration's Retreat		- when executing a Forced March with Bagration
			RU #7 	Indecision				- France changes an order with Napoleon
			RU #14 	Extreme Weather			- 1 fresh sp becomes exhausted after moving
			RU #15	Pride and Hesitation	- Russia +1VP if 1+ french leaders leave moscow
			RU #22	City Ablaze!			- when France gain control of a key city
			RU #25	Exhausting March		- after France have executed a 'Forced March' order
			RU #26 	Exhausting March		- same as #25
			RU #48	Disorderly March		- France must stop after entering/exiting space

		FRANCE
			FR #1	Hard Marching			- 1 SP exhausted after moving; fight at X1
			FR #2	Hard Marching			- same as #1
			FR #4	Holy Mother Russia		- when a RU force exits the key city
			FR #46	Energetic Leadership	- when executing any type of orders
			FR #53	Lethargic Pursuit		- may not enter areas with a french leader
*/

P.execute_forced_march = function() {
	if (G.active === RUSSIA && hand_has(RUSSIA, C_BAGRATIONS_RETREAT) && get_leader_location(L_BAGRATION) === L.area)
		goto("may_play_bagrations_retreat", { area: L.area })
	else
		goto("select_force", { type: FORCED_MARCH, area: L.area })
}

//=== 7. EXECUTE MARCH ORDERS ===
/*
	RUSSIA
		RU #14 Extreme Weather 			- 1 fresh SP becomes exhausted

	FRANCE
		FR #9 Fast Marching				- Move 2, but one fresh SP becomes exhausted
		FR #10 Fast Marching 			- same as #9
		FR #37 Poniatowski's V Corps 	- Immediately rally 2 exhausted Infantry SPs in the moving force
		FR #42 Extreme Weather 			- 1 fresh SP becomes exhausted
*/

P.execute_march = function() {
	if (G.active === FRANCE && (hand_has(FRANCE, C_FAST_MARCHING_1) || hand_has(FRANCE, C_FAST_MARCHING_2))) 
		goto("may_play_fast_marching", { area: L.area })
	else
		goto("select_force", { type: MARCH, area: L.area })
}

//=== MOVEMENT (COMMON TO FORCED MARCH AND MARCH) ===
/*
	Events:
		RUSSIA
			RU #15	Pride and Hesitation	- Russia +1VP if 1+ french leaders leave moscow
			RU #22	City Ablaze!			- when France gain control of a key city
			RU #48	Disorderly March		- France must stop after entering/exiting space

		FRANCE
			FR #1	Hard Marching			- 1 SP exhausted after moving; fight at X1
			FR #2	Hard Marching			- same as #1
			FR #4	Holy Mother Russia		- when a RU force exits the key city
			FR #9 	Fast Marching 			- Move 2, but one fresh SP becomes exhausted
			FR #10 	Fast Marching 			- Move 2, but one fresh SP becomes exhausted
			FR #53	Lethargic Pursuit		- RU may not enter areas with a french leader
*/

/*
	G.moved: plain array map
	[area, [entries], area, [entries]]

	entry: {
		forced_march: false
		did_cross_bridge: false
		leaders: []
		troops: Array(12)
	}
*/

/* SELECT FORCE */
function has_leader_moved(leader) {
	if (!map_has(G.moved, get_leader_location(leader))) return false
	return map_get(G.moved, get_leader_location(leader), null).some(entry => set_has(entry.leaders, leader))
}

function get_movable_sps_in_area(who, area) {
	let list = Array(NUM_TROOP_TYPES).fill(0)
	if (!has_friendly_troop(who, area)) return list

	for (let entry of get_area_troop_set(area)) {
		if (decode_troop_entry_who(entry) === who) {
			let type = decode_troop_entry_type(entry)
			let num = decode_troop_entry_num(entry)
			list[type] = num

			if (map_has(G.moved, area)) {
				let entries =  map_get(G.moved, area, null)
				for (let item of entries) {
					if (item.faction === who)
						list[type] -= item.troops[type] 
				}
			}
		}
	}
	return list
}

// Alexander's ability (aka disability): He may not willingly move without a leader
// TODO: Make Alexander move towards nearest Russian leader if alone
function can_alexander_be_babysitted(evade = false) {
	// Additional clarifications on the topic:
	// https://boardgamegeek.com/thread/3743026/fairly-basic-clarification-on-alexanders-stacking

	// Evade can use all leaders in the area, Forced March or March can only use leaders who haven't previously moved.
	let leaders = evade ? L.leaders : L.movable_leaders

	if (G.active !== RUSSIA) return true
	if (!set_has(leaders, L_ALEXANDER)) return true

	// Alexander may not move alone if there are other leaders in the area
	if (G.move.leaders.length === 1 && set_has(G.move.leaders, L_ALEXANDER) && leaders.length > 0)
		return false
	
	// No leader may willingly leave Alexander behind without a handler
	if ((leaders.length - G.move.leaders.length === 1) && !set_has(G.move.leaders, L_ALEXANDER))
		return false

	return true
}

P.select_force = {
	_begin() {
		// L.type, L.area
		// Leaders and SPs eligible for movement
		L.movable_leaders = get_leaders_at_area(G.active, L.area)
		L.movable_sps = get_movable_sps_in_area(G.active, L.area)

		// Running count of number of SPs selected in total (to save on repeated traversals)
		L.num_sps_selected = 0
		// Count of how many SPs are eligible to move away from the area: by default, all SPs are eligible
		L.max_sps_selectable = L.movable_sps.reduce((a, b) => (a + b), 0)

		// Assemble move object
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
		if (has_enemy_sp(G.active, L.area)) {
			G.move.pinned = true
			// The number of SPs pinned is equal to the number of enemy SPs in the area
			L.max_sps_selectable = Math.max(0, L.max_sps_selectable - count_num_sps(enemy(G.active), L.area))
		}
	},
	prompt() {
		if (L.max_sps_selectable === 0) {
			if (G.move.pinned)
				prompt(`All friendly SPs at S${L.area} are pinned.`)
			else
				prompt(`All friendly SPs at S${L.area} have previously moved.`)
			button_pass()
		} 
		else if (G.move.leaders.length > 0) {
			prompt(`Select any or all leaders and SPs to move from S${L.area}.`)

			// Alexander ability: Must always, if possible, stack and move with another Russian leader.
			// No Russian leader may leave him behind alone.
			// See can_alexander_be_babysitted() for more clarifications on this
			if (set_has(L.movable_leaders, L_ALEXANDER) && L.movable_leaders.length > 1 && (!set_has(G.move.leaders, L_ALEXANDER) || G.move.leaders.length === 1)) 
				V.prompt += ` L${L_ALEXANDER} may not be activated alone or left behind without another leader.`

			// Platov ability: May only command Cavalry and Cossack SPs.
			if (G.move.leaders.length === 1 && set_has(G.move.leaders, L_PLATOV)) 
				V.prompt += ` L${L_PLATOV} may only command Cavalry and Cossack SPs.`

			for (let leader of L.movable_leaders)
				button_leader(leader)

			for (let type = 0; type < G.move.sps.length; ++type) {
				// Platov leader ability: He may only command Cavalry and Cossack SPs
				if (G.move.leaders.length === 1 && set_has(G.move.leaders, L_PLATOV)) {
					if (!is_cavalry(type) && !is_cossack(type))
						continue
				}

				if (L.movable_sps[type] > 0
					&& G.move.sps[type] < L.movable_sps[type]
					&& L.num_sps_selected < L.max_sps_selectable
				) {
					action("add_troop", type)
				}

				if (G.move.sps[type] > 0)
					action("remove_troop", type)
			}

			if (!G.move.pinned && L.movable_leaders.length > G.move.leaders.length || L.num_sps_selected < L.max_sps_selectable)
				button("select_all")

			button_done(L.num_sps_selected >= 1 && can_alexander_be_babysitted())
		}
		else {
			prompt(`Select up to 4 SPs (at least 1) to move from S${L.area}.`)

			for (let leader of L.movable_leaders)
				button_leader(leader)

			for (let type = 0; type < G.move.sps.length; ++type) {
				if (L.movable_sps[type] > 0
					&& G.move.sps[type] < L.movable_sps[type]
					&& L.num_sps_selected < L.max_sps_selectable
				) {
					action("add_troop", type)
				}

				if (G.move.sps[type] > 0)
					action("remove_troop", type)
			}

			if (!G.move.pinned && L.movable_leaders.length === 0 && L.num_sps_selected < L.max_sps_selectable && L.max_sps_selectable <= 4)
				button("select_all")

			button_done(L.num_sps_selected >= 1 && can_alexander_be_babysitted())
		}
	},
	pass() {
		push_undo()

		if (G.move.pinned)
			log("All SPs are pinned.")
		else
			log("No movable SPs.")

		log()
		goto("end_order", { type: G.move.type })
	},
	leader_button(leader) {
		push_undo()
		set_toggle(G.move.leaders, leader)

		// If a leader is removed and the only remaining leader is Platov, remove all non-Cavalry and non-Cossack SPs
		if (G.move.leaders.length === 1 && set_has(G.move.leaders, L_PLATOV)) {
			for (let type = 0; type < G.move.sps.length; ++type) {
				if ((!is_cavalry(type) && !is_cossack(type)) && G.move.sps[type] > 0) {
					L.num_sps_selected -= G.move.sps[type]
					G.move.sps[type] = 0
				}
			}
		}
	},
	add_troop(type) {
		push_undo()
		++G.move.sps[type]
		++L.num_sps_selected
	},
	remove_troop(type) {
		push_undo()
		--G.move.sps[type]
		--L.num_sps_selected
	},
	select_all() {
		push_undo()
		for (let leader of L.movable_leaders) {
			if (!set_has(G.move.leaders, leader))
				set_add(G.move.leaders, leader)
		}

		for (let type = 0; type < G.move.sps.length; ++type) {
			// If Platov is the only leader at the area, don't select SPs that are not Cavalry or Cossack
			if ((L.movable_leaders.length === 1 && set_has(G.move.leaders, L_PLATOV)) && (!is_cavalry(type) && !is_cossack(type))) {
				continue
			} else {
				G.move.sps[type] = L.movable_sps[type]
				L.num_sps_selected += L.movable_sps[type]
			}
		}
	},
	done() {
		push_undo()
		if ((L.type === MARCH) && (G.active === FRANCE) && hand_has(FRANCE, C_PONIATOWSKIS_V_CORPS)) 
			goto("may_play_poniatowskis_v_corps")
		else
			goto("move")
	}
}

/* MOVE */
function calculate_move_allowance(who, move_type, troops) {
	// Exhausted Horses supersedes 'Fast Marching'. My assumption is that Freezing Weather does the same since it has the same wording.
	// https://boardgamegeek.com/thread/3745296/fast-marching-and-exhausted-horses
	if ((is_event_active(C_EXHAUSTED_HORSES) || is_event_active(C_FREEZING_WEATHER)) && (who === FRANCE))
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

function get_movable_areas_in_radius(source, radius, callback = function(area) { return true }) {
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

			if (map_get(distance, current, null) < radius && !map_has(distance, adj) && callback(adj))
				set_add(areas, adj)

			if (!queue.includes(adj) && !map_has(distance, adj)) {
				queue.push(adj)
				map_set(distance, adj, map_get(distance, current, null) + 1)
			}
		}
	}

	return areas
}

// NOTE: Brian rules that Evasive Maneuvers takes precedence over (and basically cancels) Infighting & Intrigue
// Brian's ruling: "Evasive Maneuvres is placed last and thus takes precedence :)"

// TODO: Alexander must move towards the closest Russian leader if he doesn't have a babysitter
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
	// FR #8 Infighting & Intrigue: Russian leaders in the target area may only execute a 'Forced March' order if they end up in a French-occupied area
	if (is_event_active(C_INFIGHTING_AND_INTRIGUE) && G.active === RUSSIA && G.move.path[0] === map_get(G.persistent_events, C_INFIGHTING_AND_INTRIGUE, null).area && G.move.leaders.length > 0) {
		let possible_destinations = get_movable_areas_in_radius(current_area, allowance, (area) => {
			return can_enter_area(G.active, area) && has_enemy_sp(G.active, area) 
		})

		return get_movable_areas_in_radius(current_area, 1, (area) => {
			return can_enter_area(G.active, area) 
				&& possible_destinations.some(destination => find_path_distance(area, destination) <= allowance - 1)
		})

	}
	else if (has_battle(current_area) && is_battle_defender(G.active, current_area)) {
		return get_all_adjacent_areas(current_area).filter(area => !get_connections_used_by_attacker(current_area).includes(area))
	}
	else {
		return get_all_adjacent_areas(current_area)
	}
}

P.move = {
	_begin() {
		// Number of areas left to move
		L.move_allowance = calculate_move_allowance(G.active, G.move.type, G.move.sps)
		// Tracks which area the moving force is currently in
		L.current_area = G.move.path[G.move.path.length - 1]
		// Flag to show 'confirm battle' prompt
		L.confirm_battle = false

		// Log start of move
		log(`Moved from S${L.current_area}`)
		if (G.move.leaders.length > 0) {
			logi(`L${get_seniormost_leader_from_list(G.active, G.move.leaders)}`) //Seniormost leader
			for (let type = 0; type < G.move.sps.length; ++type) {
				if (G.move.sps[type] > 0) {
					log_only(G.active, "<" + G.move.sps[type] + " " + get_troop_type_name(type))
				}
			}
		} else {
			for (let type = 0; type < G.move.sps.length; ++type) {
				if (G.move.sps[type] > 0) {
					log("<" + G.move.sps[type] + " " + get_troop_type_name(type))
				}
			}
		}
	},
	prompt() {
		if (L.confirm_battle) {
			if (has_battle(L.current_area))
				prompt(`This force will join the battle at S${L.current_area}. Confirm?`)
			else
				prompt("This move may trigger a battle. Confirm?")
			button_confirm()
		}
		else if (L.move_allowance > 0) {
			prompt(`Select destination for move (${L.move_allowance} remaining MPs).`)
			get_move_destinations(L.current_area, L.move_allowance).forEach(action_area)
			button_done()
		}
		else {
			prompt(`Move force: All done.`)
			button_done()
		}
	},
	area(area) {
		push_undo()
		logi("to S" + area)
		let could_play_city_ablaze = ((G.active === FRANCE) && is_key_city(area) && !has_troop(area))

		// If the destination is a VP area, increase VP
		if (is_vp_area(area) && !is_friendly_controlled(G.active, area) && !has_enemy_sp(G.active, area)) {
			increase_vp(G.active, get_area_vp(area))
		} 

		// RU #15 Pride and Hesitation: Russia gains +1 VP if any French leaders leave Moscow.
		if ((L.current_area === S_MOSCOW) && is_event_active(C_PRIDE_AND_HESITATION) && (G.move.leaders.length > 0) && (G.active === FRANCE)) {
			log_card(C_PRIDE_AND_HESITATION)
			increase_vp(RUSSIA)
		}

		// FR #4 Holy Mother Russia: France gains +1 VP for each force that leaves the selected area
		if (is_event_active(C_HOLY_MOTHER_RUSSIA_FR) && (map_get(G.persistent_events, C_HOLY_MOTHER_RUSSIA_FR, -1).area === L.current_area) && (G.active === RUSSIA)) { //TO CHECK: Does this stack on the same move or only once per move?
			log_card(C_HOLY_MOTHER_RUSSIA_FR)
			increase_vp(FRANCE)
		}

		// FR #48 Disorderly March: France must stop after entering the target area.
		if ((G.active === FRANCE) && (is_event_active(C_DISORDERLY_MARCH)) && (map_get(G.persistent_events, C_DISORDERLY_MARCH, null).area === area)) {
			log_card(C_DISORDERLY_MARCH)
			L.move_allowance = 0
		}

		// Determine the new seniormost leader if multiple leaders occupy the target area
		let determine_seniority = []
		if (has_friendly_leader(G.active, area) && G.move.leaders.length > 0 && (get_leader_seniority(get_seniormost_leader(G.active, area)) === get_leader_seniority(get_seniormost_leader_from_list(G.active, G.move.leaders)))) {
			for (let leader of get_leaders_at_area(G.active, area)) {
				if (get_leader_seniority(leader) === get_leader_seniority(get_seniormost_leader(G.active, area)))
					set_add(determine_seniority, leader)
			}
			
			set_add(determine_seniority, get_seniormost_leader_from_list(G.active, G.move.leaders))
		}

		if (has_enemy_sp(G.active, area)) {
			L.confirm_battle = true
			L.current_area = area
		} else {
			move_formation(G.move.leaders, G.move.sps, G.move.path[G.move.path.length - 1], area)
			G.move.path.push(area)
			L.move_allowance = Math.max(--L.move_allowance, 0)

			if (is_vp_area(L.current_area) && !is_friendly_controlled(G.active, L.current_area)) {
				log(`S${L.current_area} abandoned!`)
				decrease_vp(G.active, get_area_vp(L.current_area))
			}

			L.current_area = area
			
			//https://boardgamegeek.com/thread/3347839/card-22-city-ablaze-russian-card
			//Russia plays City Ablaze first, depots are checked after (In the case of City Ablaze + depot removal, the depot removal is called from the City Ablaze states)
			if (could_play_city_ablaze) { //If France just took an unnoccupied key city, Russia may play City Ablaze!
				call(`russia_may_play_city_ablaze`, { area: area, who: FRANCE })
			} else if (!has_enemy_sp(G.active, area) && has_enemy_depot(G.active, area)) {
				call(`confirm_remove_depot`, { area: area })
			}
		}	

		//This is mutually exclusive from City Ablaze! and removing an enemy depot since those two require that the area has no troops
		if (determine_seniority.length > 0) call("determine_seniority", { leaders: determine_seniority })
	}, 
	done() {
		push_undo()
		mark_already_moved(G.active, G.move.path, G.move.type, G.move.leaders, G.move.sps)
		goto("post_move_exhaustion")
	},
	confirm() {
		push_undo()
		let previous_area = G.move.path[G.move.path.length - 1]
		move_formation(G.move.leaders, G.move.sps, previous_area, L.current_area)
		G.move.path.push(L.current_area)

		if (is_vp_area(previous_area) && !is_friendly_controlled(G.active, previous_area)) {
			log(`S${previous_area} abandoned!`)
			decrease_vp(G.active, get_area_vp(previous_area))
		}

		if (!has_battle(L.current_area))
			log(`Battle declared at S${L.current_area}.`)

		if (!has_battle(L.current_area) && !map_has(G.moved, L.current_area)) {
			add_attacker_to_battle(G.active, previous_area, L.current_area, G.move.type, G.move.leaders.slice(), G.move.sps.slice())
			add_defender_to_battle(enemy(G.active), L.current_area, L.current_area, -1, get_leaders_at_area(enemy(G.active), L.current_area), get_troop_list_by_type(enemy(G.active), L.current_area))

		} else if (!has_battle(L.current_area) && map_has(G.moved, L.current_area)) {
			add_attacker_to_battle(G.active, previous_area, L.current_area, G.move.type, G.move.leaders.slice(), G.move.sps.slice())
			
			let leaders = get_leaders_at_area(enemy(G.active), L.current_area)
			let troops = get_troop_list_by_type(enemy(G.active), L.current_area)
			for (let entry of map_get(G.moved, L.current_area, null)) {
				if (entry.faction === enemy(G.active)) {
					add_defender_to_battle(enemy(G.active), L.current_area, L.current_area, entry.move_type, entry.leaders, entry.troops)
					for (let leader of entry.leaders) 
						set_delete(leaders, leader)
					for (let type = 0; type < troops.length; ++type)
						troops[type] -= entry.troops[type]
				}
			}
			if (troops.some(type => type > 0) || leaders.length > 0)
				add_defender_to_battle(enemy(G.active), L.current_area, L.current_area, -1, leaders, troops)
		} else if (has_battle(L.current_area) && (get_battle_attacker(L.current_area) === G.active)) {
			add_attacker_to_battle(G.active, previous_area, L.current_area, G.move.type, G.move.leaders.slice(), G.move.sps.slice())
		} else if (has_battle(L.current_area) && (get_battle_defender(L.current_area) === G.active)) {
			add_defender_to_battle(G.active, previous_area, L.current_area, G.move.type, G.move.leaders.slice(), G.move.sps.slice())
		}

		mark_already_moved(G.active, G.move.path, G.move.type, G.move.leaders, G.move.sps)

		goto("post_move_exhaustion")
	}
}

P.confirm_remove_depot = {
	//L.area
	prompt() {
		prompt(`${ROLES[enemy(G.active)]} needs to remove a depot from S${L.area}. Confirm move? (cannot be undone).`) 
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
			prompt(`Remove depot from S${L.area}.`)
			action("depot", find_depot_at_location(G.active, L.area))
		} else if (!L.has_discarded) {
			if (count_non_dummy_cards_in_hand(G.active) > 0) {
				prompt(`Discard a card from your hand.`)
				get_non_dummy_cards_in_hand(G.active).forEach(action_card)
			} else {
				prompt(`No cards in hand to discard.`)
				button_pass()
			}
		} else {
			prompt(`Remove depot: All done.`)
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
		log(`${ROLES[G.active]} discarded a card.`)
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
		//L.leaders
	},
	prompt() {
		prompt(`Select leader of combined force: ${join_array_with_or(L.leaders.map(leader => `L${leader}`))}`)
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
			if (is_event_active(C_EXTREME_WEATHER_RU)) set_add(events, C_EXTREME_WEATHER_RU)
		} else {
			if (is_event_active(C_EXTREME_WEATHER_FR)) set_add(events, C_EXTREME_WEATHER_FR)
		}
	} else {
		if (move_type === FORCED_MARCH) {
			for (let event of [C_EXTREME_WEATHER_RU, C_HARD_MARCHING_1, C_HARD_MARCHING_2])
				if (is_event_active(event)) set_add(events, event)
		} else {
			for (let event of [C_FAST_MARCHING_1, C_FAST_MARCHING_2, C_EXTREME_WEATHER_FR])
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
		//G.move
		L.events = get_post_move_exhaustion_events(G.active, G.move.type)
		if (L.events.length === 0) 
			goto("end_order", { type: G.move.type })
		else
			L.current_event = L.events.shift()
	},
	prompt() {
		if (L.current_event > 0) {
			if (has_fresh_moving_sp()) {
				prompt_card(L.current_event, `Exhaust an SP in the moving force.`)
				for (let type = 0; type < G.move.sps.length; ++type)
					if (is_troop_type_fresh(type) && G.move.sps[type] > 0) 
						action("troop", type)
			} else {
				prompt_card(L.current_event, `No fresh SPs in the moving force.`)
				button_confirm()
			}
		} else {
			prompt(`Assign exhaustion — All done.`)
			button_done()
		}
	},
	troop(type) {
		push_undo()
		let destination = G.move.path[G.move.path.length - 1]
		exhaust_troop(G.active, destination, type)
		// Update moved registry
		let force = map_get(G.moved, destination, null).find((f) => {
			return f.from === G.move.path[G.move.path.length - 2] && f.move_type === G.move.type && f.troops[type] > 0
		})
		force.troops[type]--
		force.troops[type + 1]++

		// Update battle registry
		if (has_battle(destination)) {
			let bforce = get_player_battle_data(G.active, destination).forces.find((f) => {
				return f.from === G.move.path[G.move.path.length - 2] && f.move_type === G.move.type && f.troops[type] > 0
			})
			bforce.troops[type]--
			bforce.troops[type + 1]++
		}

		log()
		log(`${get_card_log_alias(L.current_event)}`)
		log(`>Exhausted`)
		log_only(G.active, `<1 ${get_troop_type_name(type)}`)
		log_only(enemy(G.active), `<1 fresh SP`)

		if (L.current_event === C_FAST_MARCHING_1 || L.current_event === C_FAST_MARCHING_2) 
			map_delete(G.persistent_events, L.current_event)
		L.current_event = L.events.shift() ?? -1
	},
	confirm() {
		push_undo()
		log(`${get_card_log_alias(L.current_event)}`)
		log(`Exhausted`)
		logi(`Nothing`)
		L.current_event = L.events.shift() ?? -1
	},
	done() {
		push_undo()
		goto("end_order", { type: G.move.type })
	}
}

//=== 6. EXECUTE CAVALRY PATROLS ORDERS ===
/*
	Cavalry Patrols
	RUSSIA
		#2 Confused Retreat - when executing Cavalry Patrols orders
		#20 Flying Columns - before executing Cavalry Patrols orders

	FRANCE
		#25 Good Leadership - after executing Cavalry Patrols orders
*/

function has_cavalry_or_cossack_in_area(who, area) {
	if (!has_troop(area)) return false
	return get_area_troop_set(area, null).some(entry => (decode_troop_entry_who(entry) === who) && (is_cavalry(decode_troop_entry_type(entry)) || is_cossack(decode_troop_entry_type(entry))))
}

P.execute_cavalry_patrols = function() {
	if (G.active === RUSSIA && hand_has(RUSSIA, C_CONFUSED_RETREAT))
		goto("may_play_confused_retreat", { area: L.area })
	else
		goto("do_cavalry_patrols", { area: L.area })
}

P.do_cavalry_patrols = {
	_begin() {
		//L.area
		L.areas_that_could_be_scouted = []
		if (has_enemy_sp(G.active, L.area)) set_add(L.areas_that_could_be_scouted, L.area)
		for (let area of get_all_adjacent_areas(L.area))
			if (has_enemy_sp(G.active, area)) set_add(L.areas_that_could_be_scouted, area)
		
		L.selected_area = -1
		L.has_confirmed_area = false
		L.has_finished = false
	},
	prompt() {
		if (L.has_confirmed_area && !L.has_finished) {
			prompt(`Execute Cavalry Patrols order: All done.`)
			button_done()
		} else if (L.areas_that_could_be_scouted.length > 0) {
			if (L.selected_area === -1) {
				prompt(`Designate an area to reveal all enemy troops and orders. (${join_array_with_or(L.areas_that_could_be_scouted.map(area => `S${area}`))})`)
				for (let area of L.areas_that_could_be_scouted) 
					action_area(area)
			}
			else {
				prompt(`You selected S${L.selected_area}. Confirm? (Cannot be undone)`)
				button_confirm()
			}
		} else {
			prompt(`No eligible area to reveal enemy troops and orders.`)
			button_pass()
		}
	},
	area(area) {
		push_undo()
		L.selected_area = area
	},
	confirm() {
		clear_undo()
		L.has_confirmed_area = true

		log(`Revealed S${L.selected_area}:`)
		logi("Troops")
		for (let entry of get_area_troop_set(L.selected_area, null)) {
			if (decode_troop_entry_who(entry) === enemy(G.active))
				log(`<${decode_troop_entry_num(entry)} ${get_troop_type_name(decode_troop_entry_type(entry))}`)
		}
		logi("Orders")
		if (get_orders_at_area(enemy(G.active), L.selected_area).length === 0)
			log("<No orders.")
		else
			for (let order of get_orders_at_area(enemy(G.active), L.selected_area))
				log(`<${get_order_type_name(get_order_type(order))}`)

		log()
		goto("end_order", { type: CAVALRY_PATROLS })
	},
	done() {
		if (G.active === FRANCE && can_play_event(C_GOOD_LEADERSHIP))
			goto("may_play_good_leadership")
		else 
			end()
	},
	pass() {
		log("No eligible areas to reveal enemy SPs and orders.")
		goto("end_order", { type: CAVALRY_PATROLS })
	}
}

//=== 8. EXECUTE EVADE ORDERS ===
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
			prompt(`You may play ${join_array_with_or(L.events.map(card => get_card_log_alias(card)))}.`)
			L.events.forEach(action_card)
			button_pass()
		} else if (L.has_played_event) {
			prompt(`Play Events: All done.`)
			button_done()
		} else {
			prompt(`You do not have ${get_card_log_alias(C_UNEXPECTED_RETREAT)} or ${get_card_log_alias(C_CAVALRY_SCREENING)} in hand.`)
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
		call select_evade_force { area: L.area, destination: L.$ }
		if (has_friendly_troop(L.evader, L.area)) {
			call evade { evader: L.evader, area: L.area }
		}
		call finish_evade { evader: L.evader, area: L.area }
	}
`)

P.select_evade_destination = {
	_begin() {
		L.retreat_destinations = find_retreat_destinations(G.active, L.area)
	},
	prompt() {
		prompt(`Select destination for Evade from S${L.area}. (${join_array_with_or(L.retreat_destinations.map(area => `S${area}`))})`)
		L.retreat_destinations.forEach(action_area)
	},
	area(area) {
		push_undo()
		L.L.$ = area
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

		map_set(map_get(evade_sps, force.from, null), force.move_type, troops)
	})

	return evade_sps
}

// TODO: Improve UI
// This state is likely the most unintuitive in the entire game, because of the degree of specificity needed to pick the right SPs.
// MAYBE: Making troops clickable pieces might improve UI
P.select_evade_force = {
	_begin() {
		// Leaders & troops eligible for evade
		if (is_event_active(C_UNEXPECTED_RETREAT))
			L.leaders = get_leader_location(L_SCHWARZENBERG) === L.area ? [L_SCHWARZENBERG] : []
		else
			L.leaders = get_leaders_at_area(G.active, L.area)
		L.sps = get_evade_sps(G.active, L.area)

		// Running count of total number of SPs selected
		L.num_sps_selected = 0

		G.move = {
			// Leaders part of the evade
			leaders: [],
			// Nested map of troops that can evade.
			// First keyed by area of origin, then keyed by move type.
			// For defenders, area of origin is set by default to the area they're evading from (since it's irrelevant for battle).
			// For attackers, area of origin is important as it can influence their retreat options after battle.
			// It has to be this intricate since connections influences where the force could retreat after battle & move type determines battle strength.
			sps: [],
			// Evade destination (selected in previous state)
			destination: L.destination,
		}

		L.selected_from = -1
		L.selected_move_type = -2
	},
	prompt() {
		// Selecting a force: unlimited with a leader, max. 4 without
		let max_sps_selectable = G.move.leaders.length > 0 ? count_num_sps(G.active, L.area) : 4

		prompt(`Select leaders and SPs to evade from S${L.area}.`)

		if (L.selected_from === -1) {
			prompt(`Evade: You may select SPs from specific connections, or select all SPs.`)

			map_keys(L.sps).forEach((from) => {
				if (from === L.area)
					action_area(L.area)
				else
					action_connection(from, L.area)
			})

			if ((has_friendly_leader(G.active, L.area) || count_num_sps(G.active, L.area) <= 4) 
				&& (G.move.leaders.length < L.leaders.length || L.num_sps_selected < max_sps_selectable)
			)
				button("select_all")

			button_confirm(L.num_sps_selected > 0)
		} else {
			if (L.selected_move_type === -2) {
				prompt(`Select a move type of SPs to select from S${L.area}.`)
				for (let i = 0; i < map_get(L.sps, L.selected_from, null).length; i += 2)
					action("move_type", map_get(L.sps, L.selected_from, null)[i])
				button_done()
			} else {
				for (let leader of L.leaders)
					if (!set_has(G.move.leaders, leader))
						button_leader(leader)

				let troops = map_get(map_get(L.sps, L.selected_from, null), L.selected_move_type, null)

				for (let type = 0; type < NUM_TROOP_TYPES; ++type) {
					if (troops[type] > 0
						&& L.num_sps_selected < max_sps_selectable
						&& troops[type] > map_get(map_get(G.move.sps, L.selected_from, null), L.selected_move_type, null)[type]
					) {
						action("add_troop", type)
					}

					if (map_get(map_get(G.move.sps, L.selected_from, null), L.selected_move_type, null)[type] > 0)
						action("remove_troop", type)
				}

				button_next()
			}
		}
	},
	area(area) {
		if (L.selected_from === -1) {
			L.selected_from = area
			if (!map_has(G.move.sps, area))
				map_set(G.move.sps, area, [])
			map_keys(map_get(L.sps, L.selected_from, [])).forEach((move_type) => {
				if (!map_has(map_get(G.move.sps, L.selected_from, null), move_type))
					map_set(map_get(G.move.sps, area, null), move_type, Array(NUM_TROOP_TYPES).fill(0))
			})
			L.selected_move_type = -2
		}
	},
	connection(id) {
		L.selected_from = get_other_area(id, L.area)
		if (!map_has(G.move.sps, L.selected_from))
			map_set(G.move.sps, L.selected_from, [])
		map_keys(map_get(L.sps, L.selected_from, [])).forEach((move_type) => {
			if (!map_has(map_get(G.move.sps, L.selected_from, null), move_type))
				map_set(map_get(G.move.sps, L.selected_from, null), move_type, Array(NUM_TROOP_TYPES).fill(0))
		})
		L.selected_move_type = -2
	},
	leader_button(leader) {
		push_undo()
		set_toggle(G.move.leaders, leader)
	},
	move_type(move_type) {
		push_undo()
		L.selected_move_type = move_type
	},
	add_troop(type) {
		push_undo()
		++map_get(map_get(G.move.sps, L.selected_from, null), L.selected_move_type, null)[type]
		++L.num_sps_selected
	},
	remove_troop(type) {
		push_undo()
		--map_get(map_get(G.move.sps, L.selected_from, null), L.selected_move_type, null)[type]
		--L.num_sps_selected
	},
	next() {
		push_undo()
		L.selected_move_type = -2
	},
	done() {
		push_undo()
		L.selected_from = -1
	},
	select_all() {
		push_undo()
		G.move.leaders = L.leaders.slice()
		G.move.sps = []
		map_for_each(L.sps, (from, forces) => {
			G.move.sps.push(from)
			G.move.sps.push(forces.slice())
		})
		if (is_event_active(C_UNEXPECTED_RETREAT))
			L.num_sps_selected = count_num_sps_of_type(FRANCE, FRESH_AUSTRIAN_INFANTRY, L.area) + count_num_sps_of_type(FRANCE, EXHAUSTED_AUSTRIAN_INFANTRY, L.area)
		else
			L.num_sps_selected = count_num_sps(FRANCE, L.area)
	},
	confirm() {
		push_undo()

		log(`Evaded from S${L.area}`)
		let sp_count = get_evading_sps()
		if (G.move.leaders.length > 0) {
			logi(`L${get_seniormost_leader_from_list(G.active, G.move.leaders)}`) //Seniormost leader
			for (let type = 0; type < sp_count.length; ++type) {
				if (sp_count[type] > 0) {
					log_only(G.active, "<" + sp_count[type] + " " + get_troop_type_name(type))
				}
			}
		} else {
			for (let type = 0; type < sp_count.length; ++type) {
				if (sp_count[type] > 0) {
					log(">" + sp_count[type] + " " + get_troop_type_name(type))
				}
			}
		}
		log()

		if (is_event_active(C_TOUGH_REARGUARD)) {
			G.active = RUSSIA
			log(`${get_card_log_alias(C_TOUGH_REARGUARD)}`)
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
			prompt(`You have not left a rearguard at S${L.area}. Confirm pursuit? (cannot be undone)`)
			button_confirm()
		} else {
			prompt(`Reveal pursuit strength (1x Cavalry + 2x Cossack): ${L.pursuit_cavalry[R]}.`)
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
				log(`<${L.pursuit_cavalry[L.evader]} strength`)
				logi(`${ROLES[enemy(L.evader)]}`)
				log(`<${L.pursuit_cavalry[enemy(L.evader)]} strength`)

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
	map_for_each(G.move.sps, (from, forces) => {
		map_for_each(forces, (move_type, sps) => {
			for (let type = 0; type < sps.length; ++type)
				if (sps[type] > 0) {
					list[type] += sps[type]
				}
		})
	})
	return list
}

function get_evading_sp_types() {
	let list = []
	map_for_each(G.move.sps, (from, forces) => {
		map_for_each(forces, (move_type, sps) => {
			for (let type = 0; type < sps.length; ++type)
				if (sps[type] > 0) {
					set_add(list, type)
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
		if (!has_fresh_sp(G.active, L.area) && has_fresh_sp(enemy(G.active), L.area)) {
			prompt(`No more fresh SPs at S${L.area}.`)
			button_next()
		} else if (!L.has_assigned_exhaustion) {
			if (L.evader === RUSSIA && is_event_active(C_WELL_DISCIPLINED_RETREAT)) {
				prompt_card(C_WELL_DISCIPLINED_RETREAT, "No exhaustion when executing Evade orders.")
				button_confirm()
			} else {
				prompt(`Lost pursuit: Assign one exhaustion to any evading SP.`)
				get_evading_sp_types().filter(type => is_troop_type_fresh(type)).forEach(action_troop)
			}
		} else {
			prompt(`Assign pursuit losses: All done.`)
			button_done()
		}
	},
	troop(type) {
		push_undo()
		battle_exhaust_troop(L.evader, L.area, type)
		L.has_assigned_exhaustion = true

		L.count = 1
		map_for_each(G.move.sps, (from, forces) => {
			map_for_each(forces, (move_type, sps) => {
				if (sps[type] > 0) {
					if (L.count-- > 0) {
						--sps[type]
						++sps[type + 1]
					}
				}
			})
		})
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
		log(`${get_card_log_alias(C_WELL_DISCIPLINED_RETREAT)}`)
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
			prompt(`Eliminate all SPs at S${L.area}.`)
			button("eliminate")
		} else if (!L.has_shifted_vp) {
			if (has_friendly_leader(G.active, L.area)) {
				prompt(`No friendly SPs: Eliminate all leaders at S${L.area}.`)
				get_leaders_at_area(G.active, L.area).forEach(action_leader)
			} else {
				prompt(`Eliminated ${L.count} SPs: ${ROLES[G.active]} loses ${L.count} VP.`)
				action_vp_marker()
			}
		} else {
			prompt(`Eliminate all SPs: All done.`)
			button_done()
		}
	},
	eliminate() {
		push_undo()
		log(`${ROLES[G.active]} has no more fresh SPs.`)
		log(`Eliminated all SPs at S${L.area}.`)
		L.count = count_num_sps(G.active, L.area)
		for (let type of get_troop_types_at_area(G.active, L.area))
			eliminate_troop(G.active, L.area, type)
		L.has_eliminated_sps = true
		map_delete(G.battles, L.area)
	},
	leader(leader) {
		push_undo()
		log("Eliminated")
		logi(`L${leader}`)
		eliminate_leader(leader)
	},
	vp() {
		push_undo()
		L.has_shifted_vp = true
		decrease_vp(G.active, L.count)
	},
	done() {
		push_undo()
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
		map_for_each(forces, (move_type, sps) => {
			for (let type = 0; type < sps.length; ++type) {
				if (sps[type] > 0) {
					move_troop(L.evader, L.area, G.move.destination, type, sps[type])
					for (let entry of battle_data.forces) {
						if (entry.from === origin && entry.move_type === move_type) {
							entry.troops[type] -= sps[type]
						}
					}
				}
			}
		})
	})

	if (battle_data.forces.every(force => force.troops.every(type => type === 0)))
		map_delete(G.battles, L.area)

	if (is_event_active(C_HOLY_MOTHER_RUSSIA_FR) && map_get(G.persistent_events, C_HOLY_MOTHER_RUSSIA_FR, null).area === L.area) {
		log(`${get_card_log_alias(C_HOLY_MOTHER_RUSSIA_FR)}`)
		increase_vp(RUSSIA)
	}

	log()
	log(`Evaded to S${G.move.destination}.`)
	log()

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
			prompt(`Increase devastation at S${L.area} to ${get_devastation(L.area) + 1}.`)
			action_area(L.area)
		} else {
			prompt(`Devastation at S${L.area} cannot be increased further.`)
			button_pass()
		}
	},
	_resume() {
		G.active = L.evader
	},
	area(area) {
		push_undo()
		increase_devastation(area)
		log(`Increased devastation at S${L.area}.`)
		this.pass()
	},
	pass() {
		log()
		if (is_event_active(C_UNEXPECTED_RETREAT))
			end()
		else
			goto("end_order", { type: EVADE })
	}
}

function get_player_battle_data(who, battle) {
	return is_battle_attacker(who, battle) ? get_attacker_data(battle) : get_defender_data(battle)
}

function get_other_area(connection, area) {
	return data.connections[connection].find(loc => loc !== area)
}

function find_retreat_destinations(who, area, among = get_all_adjacent_areas(area)) {
	let closest_depots = find_closest_depot_for_retreat(who, area)
	let retreat_destinations = []
	let best_distance = 999

	for (let depot of closest_depots) {
		let distances = []
		for (let neighbor of among) {
			let distance = find_path_distance(neighbor, depot)

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
	return retreat_destinations.filter(dest => !has_enemy_sp(who, dest) && !set_has(get_connections_used_in_battle(enemy(who), area), dest))
}

function find_path_distance(a, b, connection_type = -1) {
	let queue = [ a ]
	let distance = []
	let visited = []

	map_set(distance, a, 0)

	function get_distance(area, fallback = 999) { return map_get(distance, area, fallback)}

	while (queue.length > 0) {
		let current = queue.shift()

		if (current === b) return get_distance(current)

		if (set_has(visited, current)) {
			continue
		}

		set_add(visited, current)

		if (has_enemy_sp(G.active, current)) continue

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
function find_closest_depot_for_retreat(who, area) {
	let depots = get_areas_with_depots(who)
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

		//The closest depot might be in an area with a battle, so update depot status for an area before checking enemy troop presence (which blocks further tracing along that path)
		//https://boardgamegeek.com/thread/3700409/when-precisely-are-captured-depots-removed
		if (set_has(depots, current)) { 
			set_add(closest_depots, current)
		}

		if (has_enemy_sp(who, current)) continue //The closest depot area might be contested, so continue after checking

		let new_distance = get_distance(current) + 1
		for (let loc of get_all_adjacent_areas(current)) {
			if (!set_has(visited, loc)) queue.push(loc)
			if (!map_has(distance, loc) || (get_distance(loc) > new_distance))
				map_set(distance, loc, get_distance(current) + 1)
		} 
	}
	return closest_depots
}

//=== 9. BATTLE RESOLUTION ===
/*
	Events
	RUSSIA
*		#5 	Idle Reserves 			If defending											- Imperial Guard fight X0, unless France play 'The Imperial Guard'
*		#7 	Indecision	 																	- Cancel the effect of 'The Imperial Guard'
*		#8 	Fighting Withdrawal 	If defending											- Both sides' losses are reduced by 2 and no pursuit. RU must retreat after battle and count as having lost it.
*		#9 	Uninspired Tactics		If defending in a fortress town || under defend orders	- FR losses +1
*		#12	Outflanking				Attacking with a leader across > 1 connection			- FR designate one connection as the main attack. The FR combat value is reduced by the total combat value across all other connections
		#22 City Ablaze!			When FR gain control of a Key City
		#23	Stubborn Rearguard		Immediately after losing a battle						- Cancel any losses from pursuit in the battle
*		#28	Poor Coordination		No restriction											- FR combat value -3 for each Track connection used
		#31 Stoic Infantry			If defending, at least 1 Infantry						- First two SPs exhausted in this battle immediately rally again
*		#32 The Artillery Corps		If a RU leader is present								- FR losses +1, +1 more if France play 'Infantry Squares'
*		#33	Fortifications			If defending with a leader								- Place a 'Defend' order, or double the effect of an existing one. Cancels 'Outflanking'.
*		#34	Platov's Cossacks		If Platov is present									- Cossacks fight at X1. French combat value -= num cossacks
*		#35	Fickle Habsburgs		If Schwarzenberg is present								- Losses on both sides -1, RU wins even if tied
*		#36	Infantry Squares		If at least 4 RU Infantry SPs are present				- Combat value of all French Cavalry is X0, first loss must be cavalry if present
*		#37	Enveloping Moves		If attacking with a leader								- If RU > FR fresh sps, drawn battle is considered Russian victory
-		#38	Konstantine's Corps		If a RU leader is present								- Up to 3 Infantry SPs fight at X2, draw additional card if battle won
-		#39	Cavalry Charge			If a RU leader is present								- Combat value of up to 2 RU Cavalry is doubled. draw additional card if battle won
		#40 Delayed Forces			If defending											- FR designates one connection used to enter battle, the combat value of FR forces entering across all other connections is X0. Cancels 'Outflanking'
*		#41	Fierce Fighting			If defending with a leader								- Increase both sides' losses by 2, and no prusuit
*		#47	Treacherous Allies																- If RU are within two areas of Vilna, eliminate all Prussian and Austrian Sps in this battle + Schwarzenberg
*		#50	Crumbling Cohesion		If attacking											- Shift Initiative 1 in Russia's favor. Cossacks X(RU Initiative) instead of X0.
*		#51	Unreliable Germans		If RU has the initiative								- All Austrian and Prussian SPs X0, French Infantry and Cavalry X0,5
*		#53	Aggressive Cossacks		If RU has the initiative								- Combat value of Cossacks X2 instead of X0

	FRANCE
*		#1 	Hard Marching																	- Forced March FR SPs fight X1 instead of X0,5
*		#2 	Hard Marching																	- Forced March FR SPs fight X1 instead of X0,5
*		#6 	Outflanking				If attacking from more than one direction				- RU designate one connection as main attack. The RU combat value is reduced by the total combat value across all other connections
*		#7	Unsuccessful Diseng.															- Both sides losses -1
*		#11	Grand Battery			If Napoleon is present									- RU losses +1 if defending, +2 if attacking. If RU played Infantry Squares losses +1 more.
*		#12	Cavalry Charge			If Murat is present										- Up to two FR Cavalry SPs fight at X3
*		#13	Murat's Cavalry			If Murat is present										- Up to two FR Cavalry SPs are doubled, but 1 is exhausted. If Fr win the battle, the remaining fresh Cavalry count X2 for pursuit.
		#14	Skillful Maneuvers		If attacking with a leader && across >1 connection		- When Battle cards are revealed, France may choose to either cancel the effect of a river or a 'defend' order.
*		#16	Infantry Squares		If at least 2 FR infantry/Imperial Guard				- combat value of all RU Cavalry SPs is X0, and first loss must be cavalry
*		#18	Outflanking				If attacking with a Leader and across >1 connection		- same as #6
		#21	Confusing Orders		If Kutuzov is present									- cancel the effect of up to 2 of the player RU battle cards
*		#23	Poor Coordination		If RU forces entered the battle from >1 connection		- Reduce the total RU combat value by 2 for each connection used by RU to enter the battle
*		#26	Combined Arms			If a FR leader is present								- X2 the combat value of up to 1 Cav. and 3 Inf. Cancels RU Infantry Squares.
*		#27	Confusions & Delays		If defending											- Reduce FR losses by 2, RU by 1. France must retreat after battle, which is considered tied.
-		#28	Saint-Cyr's VI Corps	If defending											- Place a 'Defend' order in the area and double the combat value of 2 FR Infantry SPs.
*		#29	Eble's Pontoneers		If a FR leader is present								- Ignore the penalties of attacking across a river
		#30	Stubborn Rearguard		After losing											- Cancel any losses from pursuit in this battle
*		#31	The Imperial Guard		If Napoleon is present.									- The combat value of all Imperial Guard are X3 instead of X1,5. If RU win, FR must discard a random card and Russia +2VP.
		#32	Delayed Forces			If RU forces entered the battle from >1 connection		- All RU Sps across 1 connection fight at X0. Cancels 'Outflanking'.
*		#33	Napoleon's Marshals		If a FR leader is present								- Rally 1 exhausted SP before determining losses. Draw a card if you win the battle.
*		#34	Fierce Fighting			If a FR leader is present								- FR losses +1, Russia losses +2, 1 RU eliminates 1 leader if present.
-		#35	Ney's III Corps			If a FR leader is present								- up to 3 FR Infantry fight at X2, rally one exhuated SP after battle.
*		#36	Eugene's IV Corps		If Eugene de Beauharnais is present						- up to 3 FR Infantry fight at X2
*		#38	Inferior Gunpowder		If defending											- Halve the combat value of up to 8 RU Infantry SPs
*		#47	Inferior Musketry		If defending											- Reduce FR losses by 1
*		#50	Courage of Desperation	If RU has the Initiative								- Rally 1 exhausted SP. Up to 4 FR Exhausted SPs fight at X1 instead of X0.
*		#51	The Old Guard			If an Imperial Guard SP is present						- Guard SPs fight at X2 instead of X1,5 and FR losses are reduced by 1. Cancels 'Outflanking'
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
			outflanking: -1,
		}
	)
}

function has_battle(area) {
	return map_has(G.battles, area)
}

function get_battle_entry(area, fallback) {
	return map_get(G.battles, area, fallback)
}

function get_battle_attacker(area) {
	return map_get(G.battles, area, null)?.attacker.who ?? -1
}

function get_battle_defender(area) {
	return map_get(G.battles, area, null)?.defender.who ?? -1
}

function is_battle_attacker(who, area) {
	return get_battle_attacker(area) === who
}

function is_battle_defender(who, area) {
	return get_battle_defender(area) === who
}

function add_attacker_to_battle(who, from, area, move_type, leaders, troops) {
	if (who === FRANCE && is_event_active(C_FREEZING_WEATHER)) {
		log()
		log(`${get_card_log_alias(C_FREEZING_WEATHER)}`)
		logi(`All French forces fight as if under Forced March orders.`)
		move_type = FORCED_MARCH
	}

	if (!has_battle(area)) init_battle_entry(area)

	let battle = get_battle_entry(area, null)

	//	Merge entries if there is already another with the same characteristics
	if (battle.attacker.forces.some(force => force.from === from && force.move_type === move_type)) {
		let force = battle.attacker.forces.find(f => f.from === from && f.move_type === move_type)

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
			move_type: move_type,
			river_crossing: has_bridge(from, area),
			leaders: leaders,
			troops: troops,
		})
	}
	
}

function get_attacker_data(area) {
	return get_battle_entry(area, null)?.attacker ?? null
}

function add_defender_to_battle(who, from, area, move_type, leaders, troops) {
	if (who === FRANCE && is_event_active(C_FREEZING_WEATHER)) {
		log()
		log(`${get_card_log_alias(C_FREEZING_WEATHER)}`)
		logi(`All French forces fight as if under Forced March orders.`)
		move_type = FORCED_MARCH
	}

	if (!has_battle(area)) init_battle_entry(area)

	let battle = get_battle_entry(area, null)

	if (battle.defender.forces.some(force => force.from === from && force.move_type === move_type)) {
		let force = battle.defender.forces.find(f => f.from === from && f.move_type === move_type)

		for (let leader of leaders)
			set_add(force.leaders, leader)

		for (let type = 0; type < force.troops.length; ++type)
			if (troops[type] > 0)
				force.troops[type] += troops[type]
	} else {
		battle.defender.who = who

		battle.defender.forces.push({
			from: from,
			move_type: move_type,
			river_crossing: false,
			leaders: leaders,
			troops: troops,
		})

		battle.defender.defend_order = false
	}

	
}

function get_connections_used_by_attacker(area) {
	if (!has_battle(area)) return []
	let areas = []
	for (let entry of get_attacker_data(area).forces)
		set_add(areas, entry.from)
	return areas
}

function get_connections_used_by_defender(area) {
	if (!has_battle(area)) return []
	let areas = []
	for (let entry of get_defender_data(area).forces)
		set_add(areas, entry.from)
	return areas
}

function get_connections_used_in_battle(who, area) {
	return is_battle_attacker(who, area) ? get_connections_used_by_attacker(area) : get_connections_used_by_defender(area)
}

function get_defender_data(area) {
	return get_battle_entry(area, null)?.defender ?? null
}

function add_defend_order_to_battle(area) {
	let battle = get_battle_entry(area, null)

	battle.defender.defend_order = true
}

function battle_has_defend_order(area) {
	let battle = get_battle_entry(area, null)

	return battle.defender.defend_order
}

function update_battle_losses(who, area, amt) {
	let battle = get_battle_entry(area, null)

	get_player_battle_data(who, area).losses = amt
}

function has_bridge(from, to) {
	return areas[from]?.bridge.includes(to) ?? false
}

function add_battle_event(area, event) {
	if (!has_battle(area)) init_battle_entry(area)

	let battle = get_battle_entry(area, null)

	set_add(battle.events, event)

	//console.log(JSON.stringify(G.battles, null, 2))
}

function remove_battle_event(area, event) {
	if (!has_battle(area)) init_battle_entry(area)
	let battle = get_battle_entry(area, null)
	set_delete(battle.events, event)
}

function add_battle_outflanking(area, connection_origin) {
	get_battle_entry(area, null).outflanking = connection_origin
}

function is_battle_event_active(area, event) {
	let battle = get_battle_entry(area, null)

	return set_has(battle.events, event)
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

function set_battle_winner(who, area) {
	let battle = get_battle_entry(area, null)
	battle.winner = who
}

function set_battle_loser(who, area) {
	let battle = get_battle_entry(area, null)
	battle.loser = who
}

function get_battle_winner(area) {
	let battle = get_battle_entry(area, null)
	return battle.winner
}

function get_battle_loser(area) {
	let battle = get_battle_entry(area, null)
	return battle.loser
}

function count_num_attacker_connections(area) {
	let battle = get_battle_entry(area, null)
	let areas_from = []
	for (let entry of battle.attacker.forces) {
		set_add(areas_from, entry.from)
	}
	return areas_from.length
}

function count_num_defender_connections(area) {
	let battle = get_battle_entry(area, null)
	let areas_from = []
	for (let entry of battle.defender.forces) {
		set_add(areas_from, entry.from)
	}
	return areas_from.length
}

function did_attacker_attack_across_multiple_connections(area) {
	return count_num_attacker_connections(area) > 1
}

function has_leader_in_battle(who, area) {
	let battle = get_battle_entry(area, null)
	if (is_battle_attacker(who, area))
		return battle.attacker.forces.some(entry => entry.leaders.length > 0)
	return battle.defender.forces.some(entry => entry.leaders.length > 0)
}

function is_leader_in_battle(leader, area) {
	let battle = get_battle_entry(area, null)
	if (is_battle_attacker(get_leader_faction(leader), area))
		return battle.attacker.forces.some(entry => set_has(entry.leaders, leader))
	return battle.defender.forces.some(entry => set_has(entry.leaders, leader))
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

function is_troop_type_fresh(troop_type) {
	return !is_troop_type_exhausted(troop_type)
}

function is_fresh_infantry(troop_type) {
	return is_infantry(troop_type) && is_troop_type_fresh(troop_type)
}

function is_fresh_cavalry(troop_type) {
	return is_cavalry(troop_type) && is_troop_type_fresh(troop_type)
}

/* 
	G.battles = [key, value, key, value]
	key: area
	value: entire battle data for that battle

	Each value: 
	{
		attacker: 
		{
			who: FRANCE/RUSSIA,
			forces: [
				{
					from: ,
					move_type: FORCED_MARCH/MARCH
					leaders: [],
					troops: [],
				}
				...
			]
		}
		defender:
		events: [(set)] e.g. [HARD_MARCHING, THE_GRAND_BATTERY]
	}

*/

P.battle = (`
	log "@Battles"
	call change_orders { current_order_type: DEFEND }
	call resolve_battles
`)

const BATTLES_WITHOUT_LEADERS = 0
const BATTLES_WHERE_ONE_SIDE_HAS_LEADER = 1
const BATTLES_WHERE_BOTH_SIDES_HAVE_LEADERS = 2

function sort_battles_by_type() {
	let battles_by_type = [[], [], []]

	map_for_each(G.battles, (area, battle) => {
		if (battle.attacker.forces.some(entry => entry.leaders.length > 0) && battle.defender.forces.some(entry => entry.leaders.length > 0)) {
			set_add(battles_by_type[BATTLES_WHERE_BOTH_SIDES_HAVE_LEADERS], area)
		} else if (battle.attacker.forces.some(entry => entry.leaders.length > 0) || battle.defender.forces.some(entry => entry.leaders.length > 0)) {
			set_add(battles_by_type[BATTLES_WHERE_ONE_SIDE_HAS_LEADER], area)
		} else {
			set_add(battles_by_type[BATTLES_WITHOUT_LEADERS], area)
		}
	})

	return battles_by_type
}

P.resolve_battles = {
	_begin() {
		log_h3("Resolve Battles")
		G.active = get_who_has_initiative()

		L.battles_by_type = sort_battles_by_type()

		L.current_battle_type = L.battles_by_type.findIndex(type => type.length > 0)
		//console.log(L.battles_by_type)
	},
	prompt() {
		if (L.current_battle_type === -1) {
			prompt(`No battles to execute this turn.`)
			button_confirm()
		} else if (L.battles_by_type.every(list => list.length === 0)) {
			prompt("Execute battles: all done.")
			button_done()
		} else {
			if (L.current_battle_type === BATTLES_WITHOUT_LEADERS)
				prompt(`Pick next battle where neither side has leaders:`)
			else if (L.current_battle_type === BATTLES_WHERE_ONE_SIDE_HAS_LEADER)
				prompt(`Pick next battle where only one side has a leader.`)
			else
				prompt(`Pick next battle where both sides have leaders.`)

			V.prompt += ` ${join_array_with_or(L.battles_by_type[L.current_battle_type].map(area => `S${area}`))}`

			for (let area of L.battles_by_type[L.current_battle_type])
				action_area(area)
		}
	},
	confirm() {
		push_undo()
		log("No battles to execute this turn.")
		log()
		end()
	},
	done() {
		push_undo()
		log()
		end()
	},
	area(area) {
		clear_undo()
		G.current_battle = area
		log_h4(`S${area}`, get_battle_attacker(area))
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
	}
}

function has_friendly_order(who, area) {
	return get_orders_at_area(who, area).length > 0
}

P.do_battle = script(`
	eval { log_h5("Reveal Defend Orders") }
	if (has_friendly_order(L.defender, L.area)) {
		set G.active L.defender
		call defend { area: L.area }
	} else {
		log ("No Defend orders.")
	}
	log ""
	
	call play_battle_events { attacker: L.attacker, defender: L.defender, area: L.area }
	call calculate_combat_value { attacker: L.attacker, defender: L.defender, area: L.area }
`)

P.defend = {
	_begin() {
		//L.area
		L.has_defend_order = get_orders_at_area(G.active, L.area).some(order => get_order_type(order) === DEFEND)
		L.has_confirmed = false
	},
	prompt() {
		if (!L.has_defend_order) {
			prompt(`You do not have a defend order at S${L.area}.`)
			button_pass()
		} else {
			prompt(`Reveal 'Defend' order to reduce your losses by 1 this battle?`)
			for (let order of get_orders_at_area(G.active, L.area))
				if (get_order_type(order) === DEFEND) action_order(order)
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
		end()
	}
}

function get_num_battle_events_could_by_played(who, area) {
	let seniormost_leader = get_seniormost_leader(who, area)

	switch(seniormost_leader) {
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

//TODO:  RU #7 "Indecision" trigger after FR plays #31 "The Imperial Guard"
/*
	Events that need a state transition:
	RUSSIA
		#33 Fortifications

*/
P.commit_battle_events = {
	_begin() {
		//L.area
		L.num_battle_events = get_num_battle_events_could_by_played(G.active, L.area)
		L.num_battle_events_in_hand = count_num_battle_events_in_hand(G.active) + 1 //Dummy
	},
	inactive: "play battle events",
	prompt() {
		if ((G.played_cards[G.active] === L.num_battle_events) || (L.num_battle_events_in_hand === 0)) {
			prompt(`Play Battle Events: All done.`)
			button_done()
		} else {
			prompt(`You may play any battle cards, or a dummy.`)
			for (let card of get_hand(G.active)) 
				if ((is_battle_card(card) && can_play_event(card)) || is_card_dummy(card)) 
					action_card(card)
			button_done()
		}
	},
	card(card) {
		push_undo()
		remove_card_from_hand(G.active, card)
		set_add(G.played_cards[G.active], card)
		L.num_battle_events_in_hand--
	},
	done() {
		clear_undo()
		end()
	}
}

P.reveal_battle_events = function() {
	for (let who = RUSSIA; who <= FRANCE; ++who) {
		log(ROLES[who])
		if (G.played_cards[who].length > 0) {
			for (let c of G.played_cards[who]) {
				logi(get_card_log_alias(c))
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
	},
	prompt() {
		if (L.events_to_be_executed.length > 0) {
			prompt(`Scroll down and implement the effect of each battle event played (${join_array_with_and(L.events_to_be_executed.map(card => get_card_log_alias(card)))}).`)
			for (let card of L.events_to_be_executed)
				action_card(card)
		} else {
			prompt(`Execute battle events: All done.`)
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
		if (!is_battle_event_currently_active(C_POOR_COORDINATION_RU))
			return is_battle_event_currently_active(C_OUTFLANKING_FR_1) || is_battle_event_currently_active(C_OUTFLANKING_FR_2)
	return false
}

P.do_combat_value_calculations = function() {
	let combat_value = [0, 0]
	//log("DEBUG INFO")
	let attacker = get_attacker_data(G.current_battle)

	for (let entry = 0; entry < attacker.forces.length; ++entry) {
		
		combat_value[attacker.who] += find_combat_value(attacker.who, attacker.forces[entry])
	}
	log(`${ROLES[attacker.who]} base: ${combat_value[attacker.who]}`)

	let defender = get_defender_data(G.current_battle)
	for (let entry = 0; entry < defender.forces.length; ++entry) {
		combat_value[defender.who] += find_combat_value(defender.who, defender.forces[entry])
	}

	// RU #28: Poor Coordination
	if (is_battle_event_currently_active(C_POOR_COORDINATION_RU)) {
		combat_value[FRANCE] -= 3 * count_num_track_connections_used_to_enter_battle(FRANCE, G.current_battle)
		//log(`Poor Coordination: France -${3 * count_num_track_connections_used_to_enter_battle(FRANCE, G.current_battle)}`)
	}

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
		//log(`Outflanking: -${calculate_outflanking_strength(G.current_battle)}`)
	}

	log(`${ROLES[defender.who]} base: ${combat_value[defender.who]}`)
	log()
	L.L.$ = combat_value.slice()
	end()
}

function find_combat_value(who, battle_data) {
	//log(`${ROLES[who]}`)
	//logi(`S${battle_data.from}`)
	let strength = 0

	strength += get_infantry_strength(who, battle_data)
	strength += get_cavalry_strength(who, battle_data)
	if (who === RUSSIA) strength += get_cossack_strength(battle_data)
	if (who === FRANCE) strength += get_guard_strength(battle_data)
	strength += get_exhausted_strength(who, battle_data)

	// RU #34 Platov's Cossacks
	if (is_event_active(C_PLATOVS_COSSACKS) && (who === FRANCE))
		strength -= count_num_sps_of_type(RUSSIA, FRESH_COSSACK, G.current_battle)

	//logi(`Total strength: ${strength}`)
	return strength
} 

// Applies effects of forced march and river crossing
function get_modifier(who, battle_data) {
	let modifier = 1

	// Forced Marching SPs fight X0.5
	// FR #1, FR #2 Hard Marching: France fights X1 despite forced marching.
	if ((battle_data.move_type === FORCED_MARCH) && ((who !== FRANCE) || (!is_event_active(C_HARD_MARCHING_1) && !is_event_active(C_HARD_MARCHING_2))))
		modifier *= 0.5

	// Forces that crossed a river fight X0.5
	// FR #29 Eblé's Pontoneers: France ignores 0.5X for crossing a river.
	if (battle_data.river_crossing && !((who === FRANCE) && (is_battle_event_currently_active(C_EBLES_PONTONEERS))))
		modifier *= 0.5

	return modifier
}

function get_infantry_strength(who, battle_data) {
	let count = battle_data.troops[FRESH_INFANTRY]
	let modifier = get_modifier(who, battle_data)
	let strength = count * modifier

	if (who === RUSSIA) {
		// RU #38 Konstantine's Corps: Up to 3 Russian Infantry fight at X2
		if (is_battle_event_currently_active(C_KONSTANTINES_CORPS))
			strength += Math.min(3, count) * modifier
		
		// FR #40 Inferior Gunpowder: Up to 8 Russian Infantry fight at X0.5
		if (is_battle_event_currently_active(C_INFERIOR_GUNPOWDER))
			strength -= Math.min(8, count) * modifier * 0.5
	} else {
		// Prussians & Austrians
		// RU #51 Unreliable Germans: allied Infantry fights X0
		if (!is_battle_event_currently_active(C_UNRELIABLE_GERMANS))
			strength += (battle_data.troops[FRESH_AUSTRIAN_INFANTRY] + battle_data.troops[FRESH_PRUSSIAN_INFANTRY]) * modifier

		// RU #51 Unreliable Germans: French Infantry fights X0.5
		if (is_battle_event_currently_active(C_UNRELIABLE_GERMANS))
			strength -= count * modifier * 0.5

		// FR #26 Combined Arms: Up to 3 French Infantry SPs fight at X2
		if (is_battle_event_currently_active(C_COMBINED_ARMS))
			strength += Math.min(3, count) * modifier

		// FR #28 Saint–Cyr's VI Corps: Up to 2 French Infantry SPs fight at X2
		if ((who === FRANCE) && is_battle_event_currently_active(C_SAINT_CYRS_VI_CORPS))
			strength += Math.min(2, count) * modifier

		// FR #35 Ney's III Corps: Up to 3 French Infantry SPs fight at X2
		if (is_battle_event_currently_active(C_NEYS_III_CORPS))
			strength += Math.min(3, count) * modifier

		// FR #36 Eugène's IV Corps: Up to 3 French Infantry SPs fight at X2
		if (is_battle_event_currently_active(C_EUGENES_IV_CORPS))
			strength += Math.min(3, count) * modifier
	}

	//log(`<Total Infantry: ${strength}`)
	return strength
}

function get_cavalry_strength(who, battle_data) {
	if (who === FRANCE && is_battle_event_currently_active(C_INFANTRY_SQUARES_RU)
	|| (who === RUSSIA && is_battle_event_currently_active(C_INFANTRY_SQUARES_FR)))
		return 0

	let count = battle_data.troops[FRESH_CAVALRY]
	let modifier = get_modifier(who, battle_data) * (is_fortress_town(G.current_battle) ? 0.5 : 1)
	let strength = count * modifier

	if (who === RUSSIA) {
		// RU #39 Cavalry Charge: Up to 2 Russian Cavalry SPs fight at X2
		if (is_battle_event_currently_active(C_CAVALRY_CHARGE_RU))
			strength += Math.min(2, count) * modifier
	} else {
		// RU #51 Unreliable Germans: French Cavalry fight at X0.5
		if (is_battle_event_currently_active(C_UNRELIABLE_GERMANS))
			strength *= 0.5

		// FR #12 Cavalry Charge: Up to 2 French Cavalry fight at X3
		if (is_battle_event_currently_active(C_CAVALRY_CHARGE_FR))
			strength += 2 * Math.min(2, count) * modifier

		// FR #13 Murat's Cavalry: Up to 2 French Cavalry SPs fight at X2
		if (is_battle_event_currently_active(C_MURATS_CAVALRY))
			strength += Math.min(2, count) * modifier

		// FR #26 Combined Arms: Up to 1 French Cavalry SP fights at X2
		if (is_battle_event_currently_active(C_COMBINED_ARMS))
			strength += Math.min(1, count) * modifier
	}

	//log(`<Total Cavalry: ${strength}`)
	return strength
}

function get_cossack_strength(battle_data) {
	let count = battle_data.troops[FRESH_COSSACK]
	let modifier = get_modifier(RUSSIA, battle_data)
	let strength = 0

	// RU #34: Platov's Cossacks: Cossacks fight at X1 instead of X0
	if (is_battle_event_currently_active(C_PLATOVS_COSSACKS))
		strength += count * modifier

	// RU #50: Crumbing Cohesion: Cossacks fight at X(Russian initiative level)
	if (is_battle_event_currently_active(C_CRUMBLING_COHESION))
		if (get_who_has_initiative() === RUSSIA)
			strength += count * modifier * get_current_initiative_level()

	// RU #53: Aggressive Cossacks: Cossacks fight at X2
	if (is_battle_event_currently_active(C_AGGRESSIVE_COSSACKS))
		strength += count * 2 * modifier

	//log(`<Total Cossack: ${strength}`)
	return strength
}

function get_guard_strength(battle_data) {
	let count = battle_data.troops[FRESH_GUARD]
	let modifier = get_modifier(FRANCE, battle_data)
	let strength = 0
	
	if (is_battle_event_currently_active(C_THE_IMPERIAL_GUARD))
		strength = 3 * count * modifier
	else if (is_battle_event_currently_active(C_IDLE_RESERVES)) // Supersedes 'The Old Guard'
		strength = 0
	else if (is_battle_event_currently_active(C_THE_OLD_GUARD))
		strength = 2 * count * modifier
	else
		strength = 1.5 * count * modifier

	//log(`<Total Guard: ${strength}`)
	return strength
}

function get_exhausted_strength(who, battle_data) {
	if (who === FRANCE && is_battle_event_currently_active(C_COURAGE_OF_DESPERATION)) {
		let count = 0
		for (let type = 0; type <= battle_data.troops.length; ++type)
			if (is_troop_type_exhausted(type)) count += battle_data.troops[type]
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
			prompt(`Roll battle die (current combat value: ${L.combat_value[R]}).`)
			button_roll()
		} else {
			prompt(`Roll battle die: All done. (final combat value: ${L.combat_value[R]})`)
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
	
	if (battle_has_defend_order(G.current_battle))
		L.losses[L.defender] = Math.max(0, L.losses[L.defender] - 1)

	if (is_battle_event_currently_active(C_FORTIFICATIONS)) //Doubles effect of Defend order
		L.losses[L.defender] = Math.max(0, L.losses[L.defender] - 1)

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
				logi(`-1 S${S_RIGA}`)
		}

		if (is_battle_event_currently_active(C_UNINSPIRED_TACTICS) && who === FRANCE)
			logi(`+1 ${get_card_log_alias(C_UNINSPIRED_TACTICS)}`)
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

function exhaust_troop(who, area, type, num = 1) {
	if (!is_troop_type_fresh(type)) return

	remove_troop(who, area, type, num)
	add_troop(who, area, type + 1, num)
}

function eliminate_troop(who, area, type, num = 1) {
	remove_troop(who, area, type, num)
	if (who === FRANCE)
		add_troop(FRANCE, FRENCH_CASUALTIES, is_troop_type_fresh(type) ? type : type - 1, num)
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

function battle_rally_troop(who, area, type, num = 1) {
	rally_troop(who, area, type, num)

	let battle_data = get_player_battle_data(who, area)
	let connections_rallied = [] //To undo onto same connections, just for the heck of it

	let count = 0
	for (let i = 0; i < battle_data.forces.length; ++i) {
		let entry = battle_data.forces[i]

		let num_available = Math.min(num - count, entry.troops[type])
		entry.troops[type - 1] += Math.min(num, num_available)
		entry.troops[type] -= Math.min(num, num_available)

		if (!map_has(connections_rallied, i) && num_available > 0) 
			map_set(connections_rallied, i, 0)
		map_increment(connections_rallied, i, num_available)

		if ((count += num_available) >= num) break
	}

	return connections_rallied
}

function battle_exhaust_troop(who, area, type, num = 1) {
	exhaust_troop(who, area, type, num)

	let battle_data = get_player_battle_data(who, area)
	let connections_rallied = [] //To undo onto same connections, just for the heck of it

	let count = 0
	for (let i = 0; i < battle_data.forces.length; ++i) {
		let entry = battle_data.forces[i]

		let num_available = Math.min(num - count, entry.troops[type])
		entry.troops[type + 1] += Math.min(num, num_available)
		entry.troops[type] -= Math.min(num, num_available)

		if (!map_has(connections_rallied, i) && num_available > 0) 
			map_set(connections_rallied, i, 0)
		map_increment(connections_rallied, i, num_available)

		if ((count += num_available) >= num) break
	}

	return connections_rallied
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

function battle_eliminate_leader(leader) {
	move_leader(leader, OUT_OF_PLAY)
	L.eliminated_leader = leader

	let battle_data = get_player_battle_data(get_leader_faction(leader), G.current_battle)
	for (let i = 0; i <= battle_data.forces.length; ++i) {
		if (set_has(battle_data.forces[i].leaders, leader)) {
			set_delete(battle_data.forces[i].leaders, leader)
			return i
		}
	}
}

// Push to stack of each action and an object of associated info needed to reconstruct the state
function push_local_undo(who, action_type, info = {}) {
	L.undo[who].push({state: L.state[who], action: action_type, info})
}

//TODO: Response trigger for "Stubborn Rearguard" if Russia loses
P.assign_losses = {
	_begin() {
		//L.losses: Gives the count of number of hits total need to be taken
		//L.attacker, L.defender
		log_h5("Assign Losses")
		G.active = [RUSSIA, FRANCE]

		//Running count of number of hits taken (used to determine elimination/exhaustion/cavalry hit)
		L.count = [0, 0]
		L.has_assigned_cavalry_loss = [false, false]

		//State machine to handle event interactions (as enumerated below)
		L.state = [null, null]
		update_local_state(RUSSIA)
		update_local_state(FRANCE)

		//Local undo stack: stores the local state, type of action performed and any additional information necessary to reconstruct the previous game state
		L.undo = [[], []]
	},
	// Enumerate possible local 'states' a player could run into
	states: {
		"napoleons_marshals": 
		{
			eligible(player) { return player === FRANCE && is_battle_event_currently_active(C_NAPOLEONS_MARSHALS) },
			prompt() {
				if (has_exhausted_sp(FRANCE, G.current_battle)) {
					prompt_card(C_NAPOLEONS_MARSHALS, `Rally an exhausted SP.`)
					for (let type of get_all_exhausted_sp_types(FRANCE, G.current_battle))
						action("troop", type)
				} else {
					prompt_card(C_NAPOLEONS_MARSHALS, `No exhausted SPs to Rally.`)
					button_next()
				}
			},
			on_troop(type) {
				let connections = battle_rally_troop(FRANCE, G.current_battle, type)
				push_local_undo(FRANCE, "rally", { type, num: 1, connections } )
				update_local_state(FRANCE)
			},
			on_next() {
				push_local_undo(FRANCE, "next")
				update_local_state(FRANCE)
			}
		},
		"fierce_fighting_fr":
		{	//Check Russia since they need to take the hits despite it being a French event
			eligible(player) {  return player === RUSSIA && is_battle_event_currently_active(C_FIERCE_FIGHTING_FR) },
			prompt() {
				let leaders = get_leaders_at_area(RUSSIA, G.current_battle)
				if (leaders.length > 0) {
					prompt_card(C_FIERCE_FIGHTING_FR, `Eliminate a leader. (${join_array_with_or(leaders.map(leader => `L${leader}`))})`)
					for (let leader of leaders)
						button_leader(leader)
				} else {
					prompt_card(C_FIERCE_FIGHTING_FR, `No leader at S${G.current_battle} to eliminate.`)
					button_next()
				}
			},
			on_leader_button(leader) {
				let connection = battle_eliminate_leader(leader)
				push_local_undo(RUSSIA, "leader", { leader, connection })
				log(`${get_card_log_alias(C_FIERCE_FIGHTING_FR)}: L${leader} killed!`)
				increase_vp(FRANCE, get_leader_vp(leader))
				
				update_local_state(RUSSIA)
			},
			on_next() {
				push_local_undo(RUSSIA, "next")
				update_local_state(RUSSIA)
			}
		},
		"infantry_squares":
		{
			eligible(player) { return (player === RUSSIA && is_battle_event_currently_active(C_INFANTRY_SQUARES_FR)) || (player === FRANCE && is_battle_event_currently_active(C_INFANTRY_SQUARES_RU)) },
			prompt() {
				let card = (R === RUSSIA) ? C_INFANTRY_SQUARES_FR : C_INFANTRY_SQUARES_RU
				if (count_num_cavalry(FRANCE, G.current_battle) > 0) {
					prompt_card(card, "Assign a loss to a Cavalry SP.")
					action("troop", FRESH_CAVALRY)
				} else {
					prompt_card(card, `No Cavalry SPs at S${G.current_battle}.`)
					button_next()
				}
			},
			on_troop(type) {
				L.has_assigned_cavalry_loss[R] = true
				let connections = battle_exhaust_troop(R, G.current_battle, type) //First hit is always an exhaustion
				push_local_undo(R, "exhaust", { type, num: 1, connections })
				++L.count[R]
				update_local_state(R)
			},
			on_next() {
				push_local_undo(R, "next")
				update_local_state(R)
			}
		},
		"assign_losses_main":
		{
			eligible() { return true },
			prompt() {
				if (L.losses[R] > L.count[R]) {
					if (count_num_fresh_sps(R, G.current_battle) > 0) {
						if (L.count[R] % 3 === 2 && (count_num_cavalry(R, G.current_battle) > 0) && !L.has_assigned_cavalry_loss[R]) {
							prompt(`Assign a loss to a fresh Cavalry SP.`)
							action("troop", FRESH_CAVALRY)
						} else if (L.count[R] % 2 === 0) {
							prompt(`Select an SP to exhaust.`)
							for (let type of get_all_fresh_sp_types(R, G.current_battle)) {
								action("troop", type)
							}
						} else {
							prompt(`Select an SP to eliminate.`)
							for (let type of get_all_fresh_sp_types(R, G.current_battle)) {
								action("troop", type)
							}
						}
					} else {
						if (has_exhausted_sp(R, G.current_battle) && has_fresh_sp(enemy(R), G.current_battle)) {
							prompt(`No more fresh SPs: Eliminate all exhausted SPs at S${G.current_battle}.`)
							button("eliminate")
						} else {
							prompt(`Assign losses: All done.`)
							button_done()
						}
					}
				} else {
					if ((count_num_fresh_sps(R, G.current_battle) === 0 && has_exhausted_sp(R, G.current_battle)) && has_fresh_sp(enemy(R), G.current_battle)) {
						prompt(`No more fresh SPs: Eliminate all exhausted SPs at S${G.current_battle}.`)
						button("eliminate")
					} else {
						prompt("Assign losses: All done.")
						button_done()
					}
				}
			},
			on_troop(type) {
				//1 in every 3 losses taken must come from a cavalry SP, if possible (the possible part is handled in prompt())
				if (type === FRESH_CAVALRY) L.has_assigned_cavalry_loss[R] = true
				if (L.count[R] % 3 === 0) L.has_assigned_cavalry_loss[R] = false

				if (L.count[R] % 2 === 0) {
					let connections = battle_exhaust_troop(R, G.current_battle, type)
					push_local_undo(R, "exhaust", { type, num: 1, connections })
					if (is_battle_event_currently_active(C_STOIC_INFANTRY) && R === RUSSIA && is_infantry(type))
						map_get(G.persistent_events, C_STOIC_INFANTRY, null).num_exhausted_infantry++
				} else {
					let connections = battle_eliminate_troop(R, G.current_battle, type)
					push_local_undo(R, "eliminate", { type, num: 1, connections })
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
				//log(`${ROLES[R]} has no more fresh SPs.`)
				//log(`${ROLES[R]} eliminated!`)
			},
			on_done() {
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
	prompt() {
		this.states[L.state[R]].prompt()
		button_undo(L.undo[R].length > 0)
	},
	undo() { //Pop from the (local) undo stack, then reconstruct the previous state based on the previous action and supporting info
		let previous_action = L.undo[R].pop()
		L.state[R] = previous_action.state
		let battle_data = get_player_battle_data(R, G.current_battle)

		switch(previous_action.action) {
		case "next": return
		case "leader":
			move_leader(previous_action.info.leader, G.current_battle)
			set_add(battle_data.forces[previous_action.info.connection].leaders, previous_action.info.leader)
			//You can only add XOR remove at the end of the log (deleting the two leader killed lines)
			G.log.pop()
			G.log.pop()
			G.vp -= get_leader_vp(previous_action.info.leader)
			return
		case "rally":
			exhaust_troop(R, G.current_battle, previous_action.info.type - 1, previous_action.info.num)
			map_for_each(previous_action.info.connections, (ix, amount) => {
				battle_data.forces[ix].troops[previous_action.info.type] += amount
				battle_data.forces[ix].troops[previous_action.info.type - 1] -= amount
			})
			return
		case "eliminate":
			if (R === RUSSIA) add_troop(R, G.current_battle, previous_action.info.type, previous_action.info.num)
			else move_troop(R, FRENCH_CASUALTIES, G.current_battle, previous_action.info.type, previous_action.info.num)
			decrement_eliminated(R, G.current_battle, previous_action.info.num)
			map_for_each(previous_action.info.connections, (ix, amount) => {
				battle_data.forces[ix].troops[previous_action.info.type] += amount
			})
			--L.count[R]
			return
		case "exhaust":
			rally_troop(R, G.current_battle, previous_action.info.type + 1, previous_action.info.num)
			map_for_each(previous_action.info.connections, (ix, amount) => {
				battle_data.forces[ix].troops[previous_action.info.type] += amount
				battle_data.forces[ix].troops[previous_action.info.type + 1] -= amount
			})
			--L.count[R]
			return		
		case "eliminate_all":
			map_for_each(previous_action.info.eliminated_by_type, (type, connections) => {
				let count =  map_get(previous_action.info.counts, type)
				if (R === RUSSIA) add_troop(R, G.current_battle, type, count)
				else move_troop(R, FRENCH_CASUALTIES, G.current_battle, type, count)
				decrement_eliminated(R, G.current_battle, count)
				map_for_each(connections, (ix, amount) => {
					battle_data.forces[ix].troops[type] += amount
				})
			})
			return
		default: throw new Error(`Unknown action: ${previous_action.action}`)
		}
	},
	troop(type) { this.states[L.state[R]].on_troop(type) },
	eliminate() { this.states[L.state[R]].on_eliminate() },
	next() { this.states[L.state[R]].on_next() },
	leader_button(leader) { this.states[L.state[R]].on_leader_button(leader) },
	done() { this.states[L.state[R]].on_done() },
}

//TODO: Stoic Infantry: Immediately rally first two exhausted RU SPs
P.determine_battle_winner = function() {
	// FR #27 Confusions and Delays: The battle is considered tied, and the French MUST retreat from battle.
	//	Clarification: Supersedes exhaustion victory (if all Russians are eliminated)
	if (is_battle_event_currently_active(C_CONFUSIONS_AND_DELAYS)) {
		log_h5("Tied Battle")
		log(`${get_card_log_alias(C_CONFUSIONS_AND_DELAYS)}: France must retreat.`)
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
		log(`${get_card_log_alias(C_FIGHTING_WITHDRAWAL)}: France won.`)
		log()
		set_battle_winner(FRANCE, G.current_battle)
		set_battle_loser(RUSSIA, G.current_battle)
		goto("end_battle", { drawn_battle: false })
	}

	// RU #37: Enveloping Moves: If Russia has more fresh SPs remaining, the battle is considered a draw that is won by Russia.
	else if (is_battle_event_currently_active(C_ENVELOPING_MOVES) && (count_num_fresh_sps(RUSSIA, G.current_battle) > count_num_fresh_sps(FRANCE, G.current_battle))) {
		log_h5("Tied Battle")
		log(`${get_card_log_alias(C_ENVELOPING_MOVES)}: Russia won.`)
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
			log(`${get_card_log_alias(C_FICKLE_HABSBURGS)}: Russia won.`)
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
		log(`${get_card_log_alias(C_FIERCE_FIGHTING_RU)}: No pursuit after battle.`)
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

		if (can_play_event(C_STUBBORN_REARGUARD_RU) && (winner === FRANCE))
			goto("may_play_stubborn_rearguard_ru")
		else
			goto("pursuit")
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
		count = count_num_cavalry(who, area) + (2 * count_num_cossack(area))
	} else {
		// FR #13 Murat's Cavalry: French Cavalry count X2 for pursuit
		if (G.phase === "resolve_battles" && is_battle_event_currently_active(C_MURATS_CAVALRY))
			count = 2 * count_num_cavalry(who, area)
		else
			count = count_num_cavalry(who, area)
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
		prompt(`Pursuit: reveal strength (1x Cavalry + 2x Cossack) - ${L.pursuit_cavalry[R]}.`)
		button_confirm()
	},
	confirm() {
		set_delete(G.active, R)
		if (G.active.length === 0) {
			log(`${ROLES[L.winner]}`)
			logi(`${L.pursuit_cavalry[L.winner]} strength`)
			if (get_leader_location(L_MURAT) === G.current_battle && L.winner === FRANCE) { log("<1 Murat") }

			log(`${ROLES[enemy(L.winner)]}`)
			logi(`${L.pursuit_cavalry[enemy(L.winner)]} strength`)
			if (get_leader_location(L_MURAT) === G.current_battle && L.winner !== FRANCE) { log("<1 Murat") }
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
			prompt(`Assign pursuit losses: All done.`)
			button_done()
		} else if (count_num_fresh_sps(G.active, G.current_battle) === 0) {
			prompt(`No more fresh SPs: eliminate all SPs at S${G.current_battle}.`)
			button("eliminate")
		} else {
			prompt(`Pursuit: Eliminate ${L.difference} SPs at S${G.current_battle}.`)
			for (let type of get_troop_types_at_area(G.active, G.current_battle))
				action("troop", type)
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
	troop(type) {
		push_undo()
		battle_eliminate_troop(G.active, G.current_battle, type)
		if (--L.difference === 0) L.has_finished = true
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
		map_delete(G.battles, G.current_battle)
		if (G.battles.length > 0) { 
			G.active = get_who_has_initiative() 
		}
		map_clear(G.moved)
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
					prompt(`Battle Winner: Shift VP marker ${L.num_enemy_sps_eliminated} spaces in your favor.`)
					action_vp_marker()
				} else {
					prompt(`No enemy SPs eliminated - no VP shifts.`)
					button_pass()
				}
			} else {
				if (G.active === RUSSIA)
					prompt(`Losing force included L${L_NAPOLEON}: Gain an additional VP shift.`)
				else
					prompt(`Losing force included L${L_ALEXANDER}: Gain an additional VP shift.`)
				action_vp_marker()
			}
		} else if (!L.has_finished) {
			if (G.active === get_who_has_initiative()) {
				if ((get_current_initiative_level() < 4) && (L.num_enemy_sps_eliminated >= get_current_initiative_level())) {
					prompt(`Shift Initiative Marker 1 in your favor for eliminating more losing SPs than the current Initiative level.`)
					action_initiative_marker()
				} else if (get_current_initiative_level() === 4) {
					prompt(`Initiative cannot be shifted further.`)
					button_pass()
				} else {
					prompt(`No Initiative shift: number of enemy SPs eliminated is not greater than the current initiative level.`)
					button_pass()
				}
			} else {
				prompt(`Shift Initiative Marker 1 in your favor for winning the battle.`)
				action_initiative_marker()
			}
		} else {
			prompt(`VP and Initiative Shifts: All done.`)
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
			log(`Losing force included L${G.active === RUSSIA ? L_NAPOLEON : L_ALEXANDER}.`)
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
		if ((is_battle_event_currently_active(C_THE_IMPERIAL_GUARD) && get_battle_loser(G.current_battle) === FRANCE)
			|| is_battle_event_currently_active(C_MURATS_CAVALRY) || is_battle_event_currently_active(C_NEYS_III_CORPS))
			set_add(G.active, FRANCE)

		L.state = [null, null]
		update_local_state(RUSSIA)
		update_local_state(FRANCE)

		L.num_sps_to_rally = Math.min(count_num_sps_of_type(RUSSIA, EXHAUSTED_INFANTRY, G.current_battle), Math.min(2, get_event_keyword(C_STOIC_INFANTRY, "num_exhausted_infantry", 0)))
		L.has_discarded = false

		L.undo = [[], []]
	},
	states: {
		"stoic_infantry":
		{
			eligible(player) { return player === RUSSIA && is_battle_event_currently_active(C_STOIC_INFANTRY) && has_russian_sp(G.current_battle) },
			prompt() {
				if (L.num_sps_to_rally > 0) {
					prompt_card(C_STOIC_INFANTRY, `Rally up to ${L.num_sps_to_rally} exhausted Infantry SPs.`)
					action_troop(EXHAUSTED_INFANTRY)
				} else {
					prompt_card(C_STOIC_INFANTRY, "All done.")
					button_done()
				}
			},
			on_troop(type) {
				let connections = battle_rally_troop(RUSSIA, G.current_battle, type)
				push_local_undo(RUSSIA, "rally", { type, num: 1, connections } )
				--L.num_sps_to_rally
			},
			on_done() {
				set_delete(G.active, RUSSIA)
				if (G.active.length === 0) {
					log()
					end()
				}
			}
		},
		"the_imperial_guard":
		{
			eligible(player) { return player === FRANCE && is_battle_event_currently_active(C_THE_IMPERIAL_GUARD) && get_battle_loser(G.current_battle) === FRANCE },
			prompt() {
				if (!L.has_discarded) {
					if (has_card_in_hand(FRANCE)) {
						prompt_card(C_THE_IMPERIAL_GUARD, "Discard a random card from your hand for losing the battle.")
						button_discard()
					} else {
						prompt_card(C_THE_IMPERIAL_GUARD, "No cards in hand to discard.")
						button_next()
					}
				} else {
					prompt_card(C_THE_IMPERIAL_GUARD, "Shift the VP marker 2 in Russia's favor.")
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
				update_local_state(R)
			},
			on_vp() {
				increase_vp(RUSSIA, 2)
				push_local_undo(R, "vp")
				update_local_state(R)
			}
		},
		"murats_cavalry":
		{
			eligible(player) { return player === FRANCE && is_battle_event_currently_active(C_MURATS_CAVALRY) },
			prompt() {
				if (count_num_sps_of_type(FRANCE, FRESH_CAVALRY, G.current_battle) > 0) {
					prompt_card(C_MURATS_CAVALRY, "Exhaust a fresh Cavalry SP.")
					action_troop(FRESH_CAVALRY)
				} else {
					prompt_card(C_MURATS_CAVALRY, "No effect.")
					button_next()
				}
			},
			on_troop(type) {
				let connections = battle_exhaust_troop(FRANCE, G.current_battle, type)
				push_local_undo(FRANCE, "exhaust", { type, num: 1, connections })
				update_local_state(FRANCE)
			},
			on_next() {
				push_local_undo(R, "next")
				update_local_state(R)
			}
		},
		"neys_iii_corps":
		{
			eligible(player) { return player === FRANCE && is_battle_event_currently_active(C_NEYS_III_CORPS) },
			prompt() {
				if (has_exhausted_sp(FRANCE, G.current_battle)) {
					prompt_card(C_NEYS_III_CORPS, "Rally an exhausted SP.")
					for (let type of get_all_exhausted_sp_types(FRANCE, G.current_battle))
						action_troop(type)
				} else {
					prompt_card(C_NEYS_III_CORPS, `No exhausted SPs at S${G.current_battle} to rally.`)
					button_next()
				}
			},
			on_troop(type) {
				let connections = battle_rally_troop(FRANCE, G.current_battle, type)
				push_local_undo(FRANCE, "rally", { type, num: 1, connections } )
				update_local_state(FRANCE)
			},
			on_next() {
				push_local_undo(R, "next")
				update_local_state(R)
			}
		},
		"finish_state":
		{
			eligible() { return true },
			prompt() {
				prompt("Execute Events: All done.")
				button_done()
			}
		}
	},
	prompt() { 
		this.states[L.state[R]].prompt()
		button_undo(L.undo[R].length > 0 && L.undo[R][L.undo[R].length - 1].action !== "discard") //Cannot undo the random discard from 'The Imperial Guard'
		//console.log(JSON.stringify(L.undo, null, 2))
	},
	undo() {
		let previous_action = L.undo[R].pop()
		L.state[R] = previous_action.state
		let battle_data = get_player_battle_data(R, G.current_battle)
		
		switch(previous_action.action) {
		case "next": return
		case "rally":
			exhaust_troop(R, G.current_battle, previous_action.info.type - 1, previous_action.info.num)
			map_for_each(previous_action.info.connections, (ix, amount) => {
				battle_data.forces[ix].troops[previous_action.info.type] += amount
				battle_data.forces[ix].troops[previous_action.info.type - 1] -= amount
			})
			return
		case "exhaust":
			rally_troop(R, G.current_battle, previous_action.info.type + 1, previous_action.info.num)
			map_for_each(previous_action.info.connections, (ix, amount) => {
				battle_data.forces[ix].troops[previous_action.info.type] += amount
				battle_data.forces[ix].troops[previous_action.info.type + 1] -= amount
			})
			return
		case "vp":
			G.vp += 2 //Rewind Russia gaining 2 VP because of 'The Imperial Guard'
			return	
		default:
			throw new Error(`Unknown action: ${previous_action.action}`)	
		}
	},
	troop(type) { this.states[L.state[R]].on_troop(type) },
	discard() { this.states[L.state[R]].on_discard() },
	vp() { this.states[L.state[R]].on_vp() },
	next() { this.states[L.state[R]].on_next() },
	done() { 
		set_delete(G.active, R)
		if (G.active.length === 0) {
			end()
		}
	},
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

//TODO: Handling with no retreat areas
//TODO: Alexander & Platov ability enforcement (will do after finishing battle events)
P.retreat = {
	_begin() {
		//L.loser
		log_h5("Retreat")
		G.active = L.loser
		let possible_retreat_destinations = []
		if (is_battle_attacker(L.loser, G.current_battle))
			possible_retreat_destinations = get_valid_attacker_retreat_connections(G.current_battle)
		else
			possible_retreat_destinations = get_valid_defender_retreat_connections(G.current_battle)

		L.retreat_destinations = find_retreat_destinations(L.loser, G.current_battle, possible_retreat_destinations)

		L.retreat = {
			total_num: 0,
			leaders: [],
			troops: Array(NUM_TROOP_TYPES).fill(0),
		}

		L.selected_area = -1
		L.has_retreated = false
	},
	prompt() {
		if (L.selected_area === -1) {
			prompt(`Select a retreat destination. (${join_array_with_or(L.retreat_destinations.map(area => `S${area}`))})`)
			for (let area of L.retreat_destinations)
				action_area(area)
		} else if (!L.has_retreated) {
			prompt(`Select a force to retreat from S${G.current_battle}.`)

			for (let leader of get_leaders_at_area(G.active, G.current_battle))
				if (!set_has(L.retreat.leaders, leader))
					button_leader(leader)

			for (let type of get_troop_types_at_area(G.active, G.current_battle)) {
				if (count_num_sps_of_type(G.active, type, G.current_battle) > L.retreat.troops[type]) {
					action("add_troop", type)
				}
				if (L.retreat.troops[type] > 0) {
					action("remove_troop", type)
				}
			}

			button("select_all")
			button_confirm(L.retreat_destinations.length > 1 || (L.retreat_destinations.length === 1 && (count_num_sps(G.active, G.current_battle) === L.retreat.total_num)))
		} else {
			prompt(`Retreat: All done.`)
			button_done()
		}
	},
	area(area) {
		push_undo()
		L.selected_area = area
	},
	leader_button(leader) {
		push_undo()
		set_toggle(L.retreat.leaders, leader)
	},
	add_troop(type) {
		push_undo()
		L.retreat.troops[type]++
		L.retreat.total_num++
	},
	remove_troop(type) {
		push_undo()
		L.retreat.troops[type]--
		L.retreat.total_num--
	},
	select_all() {
		push_undo()
		for (let leader of get_leaders_at_area(G.active, G.current_battle))
			if (!set_has(L.retreat.leaders, leader)) set_add(L.retreat.leaders, leader)

		L.retreat.total_num = 0
		for (let type of get_troop_types_at_area(G.active, G.current_battle)) {
			let count = count_num_sps_of_type(G.active, type, G.current_battle)
			L.retreat.total_num += count
			L.retreat.troops[type] = count
		}
	},
	confirm() {
		push_undo()
		move_formation(L.retreat.leaders, L.retreat.troops, G.current_battle, L.selected_area)
		set_delete(L.retreat_destinations, L.selected_area)
		log("Retreated from S" + G.current_battle)
		if (L.retreat.leaders.length > 0) {
			logi(`L${L.retreat.leaders[0]}`) //Seniormost leader
			for (let type = 0; type < L.retreat.troops.length; ++type) {
				if (L.retreat.troops[type] > 0) {
					log_only(G.active, "<" + L.retreat.troops[type] + " " + get_troop_type_name(type))
				}
			}
		} else {
			for (let type = 0; type < L.retreat.troops.length; ++type) {
				if (L.retreat.troops[type] > 0) {
					log("<" + L.retreat.troops[type] + " " + get_troop_type_name(type))
				}
			}
		}
		logi("to S" + L.selected_area)
		log()
		
		if (!has_friendly_troop(G.active, G.current_battle))
			L.has_retreated = true
		else {
			L.selected_area = -1
			L.retreat.total_num = 0
			L.retreat.leaders.length = 0
			L.retreat.troops = Array(NUM_TROOP_TYPES).fill(0)
		}
	},
	done() {
		log()
		end()
	}
}

P.eliminate_leader = {
	_begin() {
		L.leaders_to_eliminate = get_leaders_at_area(G.active, L.area)
		log("Eliminated")
	},
	prompt() {
		if (L.leaders_to_eliminate.length > 0) {
			prompt(`Select leaders to eliminate: ${join_array_with_and(L.leaders_to_eliminate.map(leader => `L${leader}`))}.`)
			L.leaders_to_eliminate.forEach(action_leader)
		} else {
			prompt(`Eliminate leaders — All done.`)
			button_done()
		}
		
	},
	leader(leader) {
		push_undo()
		logi(`L${leader}`)
		set_delete(L.leaders_to_eliminate, leader)
		eliminate_leader(leader)
	},
	done() {
		log()
		end()
	}
}

function calculate_num_post_battle_card_draws() {
	let num_cards_to_draw = [0, 0]

	for (let who = RUSSIA; who <= FRANCE; ++who) {
		if (has_leader_in_battle(who, G.current_battle) && get_battle_events(G.current_battle).some(card => (get_card_owner(card) === who) && !is_card_dummy(card)))
			++num_cards_to_draw[who]
	}
	
	if (is_battle_event_currently_active(C_NAPOLEONS_MARSHALS) && get_battle_winner(G.current_battle) === FRANCE) {
		log(`${get_card_log_alias(C_NAPOLEONS_MARSHALS)}: France draws an additional card.`)
		++num_cards_to_draw[FRANCE]
	}

	if (is_battle_event_currently_active(C_KONSTANTINES_CORPS) && get_battle_winner(G.current_battle) === RUSSIA) {
		log(`${get_card_log_alias(C_KONSTANTINES_CORPS)}: Russia draws an additional card.`)
		++num_cards_to_draw[RUSSIA]
	}

	if (is_battle_event_currently_active(C_CAVALRY_CHARGE_RU) && get_battle_winner(G.current_battle) === RUSSIA) {
		log(`${get_card_log_alias(C_CAVALRY_CHARGE_RU)}: Russia draws an additional card.`)
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

//=== 10. EXECUTE RALLY ORDERS ===
P.execute_rally = function() {
	goto("do_rally", { area: L.area })
}

P.do_rally = {
	_begin() {
		//L.area
		L.has_rallied = false
	},
	prompt() {
		if (!L.has_rallied) {
			if (!has_exhausted_sp(G.active, L.area)) {
				prompt(`No exhausted SPs at S${L.area} to rally.`)
				button_confirm()
			} else {
				if (has_friendly_depot(G.active, L.area)) {
					prompt(`You may flip back one for your exhausted troops back to its fresh side (2 if Infantry).`)
					for (let type of get_troop_types_at_area(G.active, L.area)) {
						if (is_exhausted_infantry(type) && (count_num_sps_of_type(G.active, type, L.area) >= 2))
							action("troop_2x", type)
					}
				} else {
					prompt(`You may flip back one for your exhausted troops back to its fresh side.`)
				}
				for (let type of get_troop_types_at_area(G.active, L.area)) {
					if (is_troop_type_exhausted(type)) {
						action("troop", type)
					}
				}
			}
		} else {
			prompt(`Execute Rally order: All done.`)
			button_done()
		}
	},
	troop(type) {
		push_undo()
		rally_troop(G.active, L.area, type)
		log("Rallied")
		logi(`1 ${get_troop_type_name(type)}`)
		L.has_rallied = true
	},
	troop_2x(type) {
		push_undo()
		rally_troop(G.active, L.area, type, 2)
		log("Rallied")
		logi(`2 ${get_troop_type_name(type)}`)
		L.has_rallied = true
	},
	confirm() {
		push_undo()
		log("No exhausted SPs to Rally.")
		goto("end_order", { type: RALLY })
	},
	done() {
		push_undo()
		goto("end_order", { type: RALLY })
	}

}

//=== 11. EXECUTE COSSACK RAID ORDERS ===
P.execute_cossack_raid = function() {
	goto("do_cossack_raid", { area: L.area })
}

function count_num_cossack(area) {
	let count = 0
	for (let entry of get_area_troop_set(area, null)) {
		if (is_cossack(decode_troop_entry_type(entry)))
			count += decode_troop_entry_num(entry)
	}
	return count
}

function has_french_order(area) {
	return get_orders_at_area(FRANCE, area).length > 0
}

P.do_cossack_raid = {
	_begin() {
		//L.area
		L.has_raided = false
	},
	prompt() {
		if (!L.has_raided) {
			prompt(`Select a target for the Cossack Raid (Cannot be undone).`)
			for (let area of get_all_adjacent_areas(L.area)) {
				if (has_french_order(area) || has_friendly_troop(FRANCE, area)) {
					action_area(area)
				}
			}
		} else {
			prompt(`Cossack Raid: All done.`)
			button_done()
		}
	},
	area(area) {
		push_undo()
		G.active = FRANCE
		L.has_raided = true
		log(`Targeted S${area}:`)
		goto("apply_cossack_raid", {area})
	},
	done() {
		push_undo()
		log()
		end()
	}
}

P.apply_cossack_raid = {
	_begin() {
		//L.area
		L.orders_to_remove = get_orders_at_area(FRANCE, L.area).filter(order => get_order_type(order) === FORAGE)
		L.step = -1
	},
	prompt() {
		if (L.step === -1) {
			if (L.orders_to_remove.length > 0) {
				prompt(`Remove all Forage orders from S${L.area}.`)
				for (let order of L.orders_to_remove) action_order(order)
			} else {
				prompt(`No Forage orders at S${L.area}.`)
				button_next()
			}
		} else if (L.step === 0) {
			if (has_exhausted_sp(FRANCE, L.area)) {
				prompt(`Eliminate 1 Exhausted SP from S${L.area}.`)
				for (let type of get_troop_types_at_area(FRANCE, L.area)) {
					if (is_troop_type_exhausted(type)) action("troop", type)
				}
			} else {
				prompt(`No exhausted SPs at S${L.area}.`)
				button_next()
			}
		} else {
			prompt("Apply Cossack Raid: All done (Cannot be undone).")
			button_done()
		}
	},
	order(order) {
		push_undo()
		remove_order(order)
		set_delete(L.orders_to_remove, order)
		if (L.orders_to_remove.length === 0) ++L.step
	},
	troop(type) {
		push_undo()
		eliminate_troop(FRANCE, L.area, type)
		logi("Eliminated")
		log_only(RUSSIA, `<1 Exh. SP`)
		log_only(FRANCE, `<1 ${get_troop_type_name(type)}`)
		++L.step
	},
	next() {
		if (L.step === -1) log(`>No Forage orders.`)
		else log(`>No Exh. SPs.`)
		++L.step
	},
	done() {
		G.active = RUSSIA
		goto("end_order", { type: COSSACK_RAID })
	}
}

//=== 12. EXECUTE PLACE DEPOT ORDERS ===
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
				prompt(`Place a Depot at S${L.area}.`)
				action_area(L.area)
			} else {
				prompt(`No depots in pool. You may remove other depots in order to place one at S${L.area}.`)
				button_pass()
			}
		} else {
			prompt(`S${L.area} cannot trace a path of 4 or less road connections to another friendly depot.`)
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
		logi(`S${area}`)
		goto("end_order", { type: PLACE_DEPOT })
	},
	depot(depot) {
		push_undo()
		log_h4(`S${get_depot_location(depot)}`, G.active)
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
	
	call change_orders { current_order_type: FORAGE }
	
	set G.active (1 - L.player_with_initiative)
	call attrition_events
	set G.active L.player_with_initiative
	call attrition_events
	
	set G.active L.player_with_initiative
	call roll_weather_die

	log "#Perform Attrition"
	log
	set G.active (1 - L.player_with_initiative)
	call do_attrition	
	set G.active L.player_with_initiative
	call do_attrition
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
			prompt(`You may play events (${join_array_with_or(L.events.map(card => get_card_log_alias(card)))}).`)
			for (let card of L.events)
				action_card(card)
			button_pass()
		} else {
			prompt(`Play Events: All done.`)
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
			prompt(`Roll the ${get_current_season() === SUMMER ? "Summer" : "Winter"} Weather Die.`)
			button_roll()
		} else {
			prompt(`Weather Roll: ${L.roll}.`)
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
	map_for_each(G.troops, (area, entries) => {
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
	log_only(who, `$${get_abbreviation(who)}S${area}`)
	log_only(who, `%Result`)
	let size = calculate_modified_size(who, area)
	let distance_to_nearest_depot = G.supply[who][area]
	let weather_effect = get_current_season() === SUMMER ? get_summer_weather_die_result(who, G.weather_roll) : get_winter_weather_die_result(who, G.weather_roll)

	log_only(who, `>Modified Size: ${size}`)
	log_only(who, `<+${count_num_sps(who, area)} SPs`)
	log_only(who, `<${weather_effect >= 0 ? "+" : ""}${weather_effect} Weather`)
	if (is_key_city(area)) log_only(who, `<-3 Key City`)
	
	if (is_event_active(C_DEVASTATED_LANDSCAPE)) {
		log_only(who, `<${get_card_log_alias(C_DEVASTATED_LANDSCAPE)}`)
		log_only(who, `<+${2 * get_devastation(area)} Devastation`)
	} else if (is_event_active(C_DEVASTATED_COUNTRYSIDE)) {
		log_only(who, `<${get_card_log_alias(C_DEVASTATED_COUNTRYSIDE)}`)
		log_only(who, `<+${2 * get_devastation(area)} Devastation`)
	} else if (get_devastation(area) > 0) {
		log_only(who, `<+${get_devastation(area)} Devastation`)
	}

	if ((who === FRANCE) && (get_leader_location(L_MURAT) === area)) log_only(who, `<+1 L${L_MURAT}`)
	if ((who === RUSSIA) && (is_seniormost_leader(L_TORMASOV, area))) log_only(who, `<-2 L${L_TORMASOV}`)

	log_only(who, `>Distance to nearest Depot: ${distance_to_nearest_depot}`)

	log_only(who, `Attrition ${size} &times; ${distance_to_nearest_depot <= MAX_SUPPLY_DISTANCE ? distance_to_nearest_depot : "OOS"}: ${get_attrition_result_name(size, distance_to_nearest_depot)}`)

	log_only(who, " ")
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
		// Number of ATTRITION LOSSES cancelled by a forage order
		num_cancels_remaining: 0,
		// Has assigned a Cavalry loss (1/3 hits)
		has_assigned_cavalry_loss: false,
	}
}

P.do_attrition = {
	_begin() {
		// Update distances to nearest depot before calculations
		update_supply(G.active)

		L.areas = []
		for (let area of get_areas_with_sps(G.active)) {
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
			prompt(`Select next area to check attrition.`)
			if (L.areas.length <= 5) add_to_prompt(` (${join_array_with_or(L.areas.map(area => `S${area}`))})`)

			L.areas.forEach(action_area)
		} else {
			prompt(`Attrition: all done.`)
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
			set_delete(L.areas, get_current_attrition_area())
			set_add(G.attrition_checked, get_current_attrition_area())
			reset_attrition_data()
			log()
		}
	},
	confirm() {
		reset_attrition_data()
		G.attrition_checked.length = 0
		log()
		end()
	}
}

P.reveal_forage_order = {
	prompt() {
		prompt(`Reveal Forage order to reduce Attrition losses by 2?`)

		action_order(get_orders_at_area(G.active, get_current_attrition_area()).find(order => get_order_type(order) === FORAGE))
		button_pass()
	},
	order(order) {
		push_undo()
		remove_order(order)
		log_only(G.active, "Revealed Forage order.")
		log_only(G.active, `>-2 Attrition losses`)
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

P.assign_attrition_losses = {
	prompt() {
		prompt(`Assign attrition losses: ${G.attrition_data.num_losses_remaining} remaining.`)

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
					if (
						get_all_exhausted_sp_types(G.active, L.area).some(type => is_cavalry(type) || is_cossack(type))
						|| G.attrition_data.has_assigned_cavalry_loss
						|| (!G.attrition_data.has_assigned_cavalry_loss && !has_cavalry_or_cossack_in_area(G.active, L.area))
					)
						button("eliminate_2")
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
		prompt(`Exhaust 1 fresh SP at S${L.area}.`)
		if (must_assign_cavalry_attrition_loss() && (count_num_sps_of_type(G.active, FRESH_CAVALRY, L.area) > 0 || count_num_sps_of_type(G.active, FRESH_COSSACK, L.area) > 0))
			get_all_fresh_sp_types(G.active, L.area).filter(type => is_cavalry(type) || is_cossack(type)).forEach(action_troop)
		else
			get_all_fresh_sp_types(G.active, L.area).forEach(action_troop)
	},
	troop(type) {
		push_undo()
		exhaust_troop(G.active, L.area, type)

		if (is_cavalry(type) || is_cossack(type))
			G.attrition_data.has_assigned_cavalry_loss = true
		if (++G.attrition_data.num_sps_affected % 3 === 0)
			G.attrition_data.has_assigned_cavalry_loss = false

		log_only(G.active, "Exhausted")
		log_only(G.active, `>1 ${get_troop_type_name(type)}`)

		end()
	}
}

P.eliminate_2_exhausted_sps = {
	// L.area
	_begin() {
		L.count = Math.min(2, count_num_exhausted_sps(G.active, L.area))
	},
	prompt() {
		prompt(`Eliminate ${L.count} SPs at S${L.area}.`)
		if (must_assign_cavalry_attrition_loss() && (count_num_sps_of_type(G.active, EXHAUSTED_CAVALRY, L.area) > 0 || count_num_sps_of_type(G.active, EXHAUSTED_COSSACK, L.area) > 0))
			get_all_exhausted_sp_types(G.active, L.area).filter(type => is_cavalry(type) || is_cossack(type)).forEach(action_troop)
		else
			get_all_exhausted_sp_types(G.active, L.area).forEach(action_troop)
	},
	troop(type) {
		push_undo()
		eliminate_troop(G.active, L.area, type)
		
		if (is_cavalry(type) || is_cossack(type))
			G.attrition_data.has_assigned_cavalry_loss = true
		if (++G.attrition_data.num_sps_affected % 3 === 0)
			G.attrition_data.has_assigned_cavalry_loss = false

		log_only(G.active, "Eliminated")
		log_only(G.active, `>1 ${get_troop_type_name(type)}`)

		// If the area is no longer controlled by the active player, apply VP penalties as appropriate
		if (!is_friendly_controlled(G.active, L.area) && is_vp_area(L.area))
			decrease_vp(G.active, get_area_vp(L.area))

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
			prompt(`Increase Devastation at S${L.area} by ${G.attrition_data.devastation_increase}.`)
			action_area(get_current_attrition_area())
		} else {
			prompt(`Devastation at S${L.area} cannot be increased further.`)
			button_confirm()
		}
	},
	area(_) {
		this.confirm()
	},
	confirm() {
		push_undo()
		let raw_devastation = get_devastation(L.area) + G.attrition_data.devastation_increase
		set_devastation(L.area, Math.min(3, raw_devastation))
		G.attrition_data.devastation_increase = 0

		log_only(G.active, `Devastation at S${L.area} increased to ${get_devastation(L.area)}.`)

		if (raw_devastation > 3 
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
P.lines_of_communications = {
	_begin() {
		log_h2("Lines of Communications")
		G.active = [RUSSIA, FRANCE]
		
		L.depots_to_remove = [check_lines_of_communication(RUSSIA), check_lines_of_communication(FRANCE)]
		L.removed_depots = [[], []]
	},
	prompt() {
		if (L.depots_to_remove[R].length > 0) {
			prompt(`Remove depots at ${join_array_with_and(L.depots_to_remove[R].map(area => `S${area}`))}.`)
			for (let area of L.depots_to_remove[R]) action_depot(find_depot_at_location(R, area))
		} else {
			prompt(`Check Lines of Communications: All done.`)
			button_confirm()
		}
	},
	depot(depot) {
		set_delete(L.depots_to_remove[R], get_depot_location(depot))
		remove_depot(depot, get_depot_location(depot))
	},
	confirm() {
		set_delete(G.active, R)
		if (G.active.length === 0) {
			for (let who = RUSSIA; who <= FRANCE; ++who)
				if (L.removed_depots[R].length === 0)
					log(`All ${ROLES[who]} depots are in supply.`)
			end()
		}
	}
}

//=== SUPPLY, LINES OF COMMUNICATION & ATTRITION ===
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

function is_in_supply(who, space) {
	return G.supply[who][space] <= MAX_SUPPLY_DISTANCE
}

function has_enemy_sp(who, space) {
	return (who === RUSSIA && has_friendly_troop(FRANCE, space)) || (who === FRANCE && has_friendly_troop(RUSSIA, space))
}

function get_supply_status(who, area) {
	return G.supply[who][area]
}

/* SUPPLY */

//Returns the distance from each space to its closest node if in supply, greater than 5 if OOS
function calculate_distance_to_nearest_depot(who) {
	let sources = get_supply_sources_and_depots(who)
	let distance = new Array(NUM_AREAS).fill(999)

	for (let source of sources) {
		distance[source] = 0
	}

	for (let source of sources) {
		let queue = [ source ]

		while (queue.length > 0) {
			let current = queue.shift()

			if ((distance[current] > MAX_SUPPLY_DISTANCE) || has_enemy_sp(who, current)) {
				continue
			}

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

/* LINES OF COMMUNICATION */

//Returns a plain array map with each on-map depot of that side and its corresponding supply status
function check_lines_of_communication(who) {
	let sources = get_supply_sources(who) //Starting supply sources without depots

	let depots = [] //Set of depot spaces for efficient lookup
	for (let depot of get_depots(who).filter(s => (s !== POOL) && (s !== OUT_OF_PLAY))) {
		set_add(depots, depot)
	}

	let out_of_supply_depots = depots.slice()

	let queue = sources.slice()
	let distance = new Array(NUM_AREAS).fill(999)
	for (let source of sources) { //Start with supply sources
		distance[source] = 0
	}

	while (queue.length > 0) {
		let current = queue.shift()

		//Cannot trace through enemy SPs & max. distance of 4
		if (has_enemy_sp(who, current) || distance[current] > MAX_LOC_DISTANCE)
			continue

		// Logic inverted from the rules: We start from supply sources and add depots as supply sources as they are encountered
		for (let s of get_adjacent_areas_by_road(current)) { //Can trace only via road, not track
			if ((distance[s] > distance[current] + 1)) {
				queue.push(s)
				if (set_has(depots, s) && !set_has(sources, s)) { //If a new in-supply depot is encountered, make it a source
					set_add(sources, s)
					set_delete(out_of_supply_depots, s)
					distance[s] = 0
				} else {
					distance[s] = distance[current] + 1
				}
			}
		}
	}

	return out_of_supply_depots
}

/* ATTRITION - TODO */

//=== EVENTS ===
/*
	G.persistent events is a plain 1D array 'map' of alternating key, value pairs (see framework).
	key - event card id
	value - an object that contains information relevant to the event, including
		event removal turn
		area it applies to (only some events)

	Use add_event_keyword to add any keywords necessary to store the event's effect
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

function add_event_keyword(evt, keywords) {
	let evt_data = map_get(G.persistent_events, evt, null)
	if (evt_data !== null) {
		evt_data = Object.assign(evt_data, keywords)
	}
}

function get_event_keyword(evt, keyword, fallback = null) {
	return map_get(G.persistent_events, evt, fallback)?.[keyword] ?? null
}

function prompt_event_confirmation(evt, info) {
	E[get_event_state_name(evt)].confirm_prompt()
}

function prompt_card(c, text) {
	prompt(`${get_card_log_alias(c, NONE)}: ${text}`)
}

function log_must_play_event(card, info) {
	card_box_begin(card)
	switch(card) {
	case C_HOLY_MOTHER_RUSSIA_RU:
		log("Russia +2 orders.")
		log(`The side controlling S${get_event_data(C_HOLY_MOTHER_RUSSIA_RU).key} at the end of the turn gain +1 VP.`)
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
				log(`No effect – L${L_DE_TOLLY} is not on map.`)
			else 
				log(`No effect – L${L_KUTUZOV} is not on map.`)
		break
	case C_POOR_COMMUNICATIONS:
		log("At the end of the 'Place Orders' phase, RU may designate 1 placed FR order to remove.")
		break
	case C_JEROME_GOES_HOME:
		if (info) 
			log(`L${L_JEROME} removed from play.`)
		else  
			log(`No effect – L${L_JEROME} is not on map.`)
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
		if (info === "no effect") log("No effect.")
		else {
			if (get_event_data(C_CHAOTIC_FOOD_DISTRIBUTION).area) log(`Removed depot from S${get_event_data(C_CHAOTIC_FOOD_DISTRIBUTION).area}.`)
			if (get_event_data(C_CHAOTIC_FOOD_DISTRIBUTION).troop_type) {
				log(`Rallied`)
				log_only(FRANCE, `>1 ${get_troop_type_name(get_event_data(C_CHAOTIC_FOOD_DISTRIBUTION).troop_type)}`)
				log_only(RUSSIA, `>1 Exh. SP`)
			}
		}
	
	}
	card_box_end()
}

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

//RU #1: Well-Disciplined Retreat
P.well_disciplined_retreat = {
	inactive: "play C1",
	prompt() {
		prompt_card(C_WELL_DISCIPLINED_RETREAT, "For this, and the next turn, Russia suffers no exhaustion when using Evade orders.")
		button_next()
	},
	next() {
		push_undo()
		log("For this, and the next turn, Russia suffers no exhaustion when using Evade orders.")
		add_persistent_event(C_WELL_DISCIPLINED_RETREAT)
		end()
	}
}

// RU #2: Confused Retreat
P.may_play_confused_retreat = {
	//L.area
	inactive: "play C2",
	prompt() {
		if (hand_has(RUSSIA, C_CONFUSED_RETREAT)) {
			prompt(`You may play ${get_card_log_alias(C_CONFUSED_RETREAT)}.`)
			action_card(C_CONFUSED_RETREAT)
			button_pass()
		} else {
			prompt(`You do not have ${get_card_log_alias(C_CONFUSED_RETREAT)}.`)
			button_pass()
		}
	},
	card(card) {
		push_undo()
		goto("confused_retreat", { area: L.area })
	},
	pass() {
		push_undo()
		goto("do_cavalry_patrols", { area: L.area })
	}
}

P.confused_retreat = {
	_begin() {
		card_box_begin(C_CONFUSED_RETREAT)
		L.step = -1
		L.count = Math.min(2, array_count(get_orders_at_area(RUSSIA, POOL), order => (get_order_type(order) === EVADE)))
		L.selected_order = -1
		L.areas = []
	},
	inactive: "retreat",
	prompt() {
		if (L.step === -1) {
			prompt_card(C_CONFUSED_RETREAT, "Shift Initiative 1 in France's favor.")
			action_initiative_marker()
		} else if (L.step === 0) {
			if (L.count === 0) {
				prompt_card(C_CONFUSED_RETREAT, `No Evade orders in pool to place.`)
				button_confirm()
			} else {
				if (L.selected_order === -1) {
					prompt_card(C_CONFUSED_RETREAT, `Select ${L.count} Evade orders to place.`)
					for (let order of get_orders_at_area(RUSSIA, POOL))
						if (get_order_type(order) === EVADE) action_order(order)
				} else {
					prompt(`Select a location to place Evade.`)
					for (let area = FIRST_AREA; area <= LAST_AREA; ++area) 
						if (has_russian_sp(area)) action_area(area) 
				}
			}
		} else {
			prompt_card(C_CONFUSED_RETREAT, "All done.")
			button_done()
		}
	},
	initiative() {
		push_undo()
		shift_initiative(FRANCE)
		++L.step
	},
	confirm() {
		push_undo()
		++L.step
	},
	order(order) {
		push_undo()
		L.selected_order = order
	},
	area(area) {
		push_undo()
		place_order(L.selected_order, area)
		set_add(L.areas, area)

		L.selected_order = -1
		if (--L.count === 0) ++L.step
	},
	done() {
		push_undo()
		log("Placed")
		L.areas.forEach((area) => {
			logi(`S${area}`)
			log(`<Evade`)
		})
		card_box_end()
		discard_or_remove_card(C_CONFUSED_RETREAT)
		goto("do_cavalry_patrols", { area: L.area })
	}
}

//RU #3: Opolchenie
P.opolchenie = {
	_begin() {
		//WILL FAIL IF THE ORDER OF THE SPACES IS CHANGED (set_delete() at this.area())
		L.areas = [S_PSKOV, S_KIEV, S_SMOLENSK, S_KALUGA, S_MOSCOW].filter(area => is_ru_controlled(area))
	},
	inactive: "raise the militia",
	prompt() {
		//Always guaranteed at least Pskov (Russian off-map area cannot be entered by France)
		prompt_card(C_OPOLCHENIE, `Place 2 exhausted Russian Infantry SPs at ${join_array_with_and(L.areas.map(s => `S${s}`))}.`)
		for (let area of L.areas) {
			action_area(area)
		}
	},
	area(area) {
		push_undo()
		log("Placed at S" + area)
		add_troop(RUSSIA, area, EXHAUSTED_INFANTRY, 2)
		logi(2 + " " + get_troop_type_name(EXHAUSTED_INFANTRY))
		set_delete(L.areas, area)
		if (!L.areas || L.areas.length === 0) end()
	}
}

function has_russian_sp(area) {
	return has_friendly_troop(RUSSIA, area)
}

function has_russian_sp_adjacent(area) {
	for (let adj of get_all_adjacent_areas(area)) {
		if (has_russian_sp(adj)) return true
	}
	return false
}

function get_all_adjacent_areas(area) {
	return [...get_all_adjacent_areas_of_connection_type(area, TRACK), ...get_all_adjacent_areas_of_connection_type(area, ROAD)]
}

function increase_devastation(area, amount = 1) {
	G.devastation[area] = Math.min(3, G.devastation[area] + amount)
}

//RU #5: Idle Reserves
E.idle_reserves = function() { return is_battle_defender(RUSSIA, G.current_battle) }

P.idle_reserves = {
	prompt() {
		if (is_battle_event_currently_active(C_THE_IMPERIAL_GUARD))
			prompt_card(C_IDLE_RESERVES, `No effect: France played ${get_card_log_alias(C_THE_IMPERIAL_GUARD)}.`)
		else
			prompt_card(C_IDLE_RESERVES, "All Imperial Guard SPs fight at X0 this battle.")
		button_confirm()
	},
	confirm() {
		push_undo()
		if (is_battle_event_currently_active(C_THE_IMPERIAL_GUARD))
			log(`No effect – France played ${get_card_log_alias(C_THE_IMPERIAL_GUARD)}.`)
		else
			log("All Imperial Guard SPs fight at X0.")
		end()
	}
}

//RU #6: Bagration's Retreat
P.may_play_bagrations_retreat = {
	inactive: "play C6",
	prompt() {
		if (hand_has(RUSSIA, C_BAGRATIONS_RETREAT)) {
			prompt(`You may play ${get_card_log_alias(C_BAGRATIONS_RETREAT)}.`)
			action_card(C_BAGRATIONS_RETREAT)
		} else {
			prompt(`You do not have ${get_card_log_alias(C_BAGRATIONS_RETREAT)}.`)
		}
		button_pass()
	},
	card(card) {
		push_undo()
		discard_or_remove_card(card)
		goto("bagrations_retreat", { area: L.area } )
	},
	pass() {
		push_undo()
		goto("select_force", { type: FORCED_MARCH, area: L.area })
	}
}

P.bagrations_retreat = { //TODO
	_begin() {
		end()
	}
}

// RU #7: Indecision
P.may_play_indecision = {
	prompt() {
		if (L.response_to === "the_imperial_guard") {
			prompt(`You may play ${get_card_log_alias(C_INDECISION)} to cancel the effect of ${get_card_log_alias(C_THE_IMPERIAL_GUARD)}.`)
			action_card(C_INDECISION)
			button_pass()
		} else {
			prompt(`Change order with Napoleon - todo`)
		}
	},
	card(card) {
		push_undo()
		if (L.response_to === "the_imperial_guard")
			goto("indecision_cancel_imperial_guard")
		else
			goto("indecision_cancel_napoleon_change")
	},
	pass() {
		push_undo()
		end()
	}
}

P.indecision_cancel_imperial_guard = {
	_begin() {
		card_box_begin(C_INDECISION)
	},
	prompt() {
		prompt_card(C_INDECISION, `Cancel the effect of ${get_card_log_alias(C_THE_IMPERIAL_GUARD)} (cannot be undone).`)
		button_confirm()
	},
	confirm() {
		clear_undo()
		log(`Cancelled ${get_card_log_alias(C_THE_IMPERIAL_GUARD)}.`)
		log_box_end()
		discard_or_remove_card(C_INDECISION)
		discard_or_remove_card(C_THE_IMPERIAL_GUARD)
		remove_battle_event(G.current_battle, C_THE_IMPERIAL_GUARD)
		set_delete(G.played_cards[FRANCE], C_THE_IMPERIAL_GUARD)
		end()
	}
}

// RU #8: Fighting Withdrawal
E.fighting_withdrawal = function() { return is_battle_defender(RUSSIA, G.current_battle) }

P.fighting_withdrawal = {
	_begin() {
		L.step = -1
	},
	prompt() {
		if (L.step === -1) {
			prompt_card(C_FIGHTING_WITHDRAWAL, `Both sides losses are reduced by 2 in this battle.`)
			button_next()
		} else {
			prompt_card(C_FIGHTING_WITHDRAWAL, `There is no pursuit, but Russia must retreat after battle and count as having lost it.`)
			button_confirm()
		}
	},
	next() {
		push_undo()
		log("Both sides' losses are reduced by 2.")
		++L.step
	},
	confirm() {
		push_undo()
		log("Russia must retreat and count as having lost the battle.")
		end()
	}
}

//RU #9: Uninspired Tactics
E.uninspired_tactics = function() { return (is_battle_defender(RUSSIA, G.current_battle) && is_fortress_town(G.current_battle)) || battle_has_defend_order(G.current_battle) }

P.uninspired_tactics = {
	prompt() {
		prompt_card(C_UNINSPIRED_TACTICS, "French losses +1.")
		button_confirm()
	},
	confirm() {
		push_undo()
		log("French losses +1.")
		end()
	}
}

//RU #10: Scorched Earth
P.scorched_earth = {
	_begin() {
		L.step = -1
		L.selected_areas = []
	},
	inactive: "fall back and devastate the land",
	prompt() {
		if (L.step === -1) {
			if (get_who_has_initiative() === FRANCE) {
				prompt_card(C_SCORCHED_EARTH, "Reduce French Initiative by 1.")
				action_initiative_marker()
			} else {
				prompt_card(C_SCORCHED_EARTH, "France does not have the initiative.")
				button_next()
			}
		} else if (L.step === 0) {
			if (L.selected_areas.length < 5) {
				prompt_card(C_SCORCHED_EARTH, "Increase Devastation in up to 5 areas with, or adjacent to, Russian SPs.")
				for (let area = FIRST_AREA; area <= LAST_AREA; ++area) {
					if (!set_has(L.selected_areas, area) && (has_russian_sp(area) || has_russian_sp_adjacent(area))) {
						action_area(area)
					}
				}
				button_pass()
			} else {
				prompt_card(C_SCORCHED_EARTH, "Increase Devastation - All done.")
				button_next()
			}
			 
		} else {
			prompt_card(C_SCORCHED_EARTH, "Receive 1 Evade order.")
			button_next()
		}
	},
	initiative() {
		push_undo()
		shift_initiative(RUSSIA)
		++L.step
		log(`Devastated`)
	},
	next() {
		push_undo()
		if (++L.step > 1) {
			add_persistent_event(C_SCORCHED_EARTH) //To add the extra order in the Choose Orders step
			log(`Received`)
			logi(`1 Evade order`)
			end()
		}
	},
	area(area) {
		push_undo()
		logi(`S${area}`)
		increase_devastation(area)
		set_add(L.selected_areas, area)
	},
	pass() {
		push_undo()
		++L.step
	}
}

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
	if (is_battle_event_currently_active(C_POOR_COORDINATION_RU))
		goto("outflanking_no_effect", { card: C_OUTFLANKING_FR_1 })
	else
		goto("outflanking", { attacker: FRANCE, defender: RUSSIA, card: C_OUTFLANKING_FR_1 }) 
}

P.outflanking_fr_2 = function() { 
	if (is_battle_event_currently_active(C_POOR_COORDINATION_RU))
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
				prompt(`You designated a connection from S${L.designated_connection_from} to S${G.current_battle}.`)
				button_confirm()
			}
		} else {
			prompt_card(L.card, "All done.")
			button_done()
		}
	},
	confirm() {
		push_undo()
		if (G.active === L.defender) L.has_defender_confirmed = true
		G.active = enemy(G.active)
	},
	connection(connection_id) {
		push_undo()
		L.designated_connection_from = get_other_area(connection_id, G.current_battle)
		add_battle_outflanking(G.current_battle, L.designated_connection_from)
		log(`Designated connection from S${L.designated_connection_from} to S${G.current_battle}.`)
	},
	done() {
		push_undo()
		end()
	}
}

P.outflanking_no_effect = {
	_begin() {
		G.active = FRANCE
	},
	prompt() {
		prompt_card(L.card, `No effect – ${get_card_log_alias(C_POOR_COORDINATION_RU)} has been played.`)
		button_confirm()
	},
	confirm() {
		push_undo()
		log(`${get_card_log_alias(C_POOR_COORDINATION_RU)}: No effect.`)
		end()
	}
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
P.garrison_troops = {
	_begin() {
		L.units_moved = 0
		L.selected_area = -1
		L.selected_sp_type = -1
	},
	inactive: "disband minor garrisons",
	prompt() {
		if (L.selected_area === -1) {
			let areas = get_areas_with_sps(RUSSIA).filter(area => !has_friendly_leader(RUSSIA, area) && is_area_in_supply(RUSSIA, area))

			if (L.units_moved < 5 && areas.length > 0) {
				prompt_card(C_GARRISON_TROOPS, `Select an area with Russian SPs and without a leader.`)
				for (let area of get_areas_with_sps(RUSSIA))
					if (!has_friendly_leader(RUSSIA, area) && is_area_in_supply(RUSSIA, area))
						action_area(area)
			} else {
				prompt_card(C_GARRISON_TROOPS, "All done.")
				button_done()
			}
		} else if (L.selected_sp_type === -1) {
			prompt_card(C_GARRISON_TROOPS, `Select an SP to move from S${L.selected_area}.`)
			get_troop_types_at_area(RUSSIA, L.selected_area).forEach(type => action_troop(type))
		} else {
			prompt_card(C_GARRISON_TROOPS, `Select a destination for ${get_troop_type_name(L.selected_sp_type)} at S${L.selected_area}.`)
			// NOTE: Might be expensive, think about better ways later
			for (let area of get_locations_with_leader(RUSSIA))
				if (does_path_exist(RUSSIA, L.selected_area, area))
					action_area(area)
		}
	},
	area(area) {
		push_undo()
		if (L.selected_area === -1) {
			L.selected_area = area
		} else {
			move_troop(RUSSIA, L.selected_area, area, L.selected_sp_type, 1)
			log(`Moved from S${L.selected_area}`)
			logi(`1 ${get_troop_type_name(L.selected_sp_type)}`)
			logi(`to S${area}`)

			L.selected_area = -1
			L.selected_sp_type = -1
			++L.units_moved
		}
	},
	troop(type) {
		push_undo()
		L.selected_sp_type = type
	},
	done() {
		end()
	}
}

// RU #15: Pride and Hesitation
E.pride_and_hesitation = function() { return is_fr_controlled(S_MOSCOW) }

P.pride_and_hesitation = {
	_begin() {
		L.has_shifted_initiative = false
	},
	inactive: "exploit Napoleon's hubris",
	prompt() {
		if (L.has_shifted_initiative) {
			prompt_card(C_PRIDE_AND_HESITATION, "This turn, Russia +1 VP if any French leaders leave Moscow.")
			button_next()
		} else {
			prompt_card(C_PRIDE_AND_HESITATION, "Shift Initiative 1 in Russia's favor.")
			action_initiative_marker()
		}
	},
	next() {
		push_undo()
		log("Russia +1 VP if any French leaders leave Moscow this turn.")
		add_persistent_event(C_PRIDE_AND_HESITATION)
		end()
	},
	initiative() {
		push_undo()
		shift_initiative(RUSSIA)
		L.has_shifted_initiative = true
	}
}

// RU #16: Kutuzov Appointed
E.kutuzov_appointed = function() { return get_current_month() >= AUG }

P.kutuzov_appointed = {
	_begin() {
		L.has_placed_kutuzov = false
	},
	inactive: "appoint Mikhail Kutuzov",
	prompt() {
		let areas_with_most_ru_sps = find_areas_with_most_ru_sps()
		if (L.has_placed_kutuzov) {
			prompt_card(C_KUTUZOV_APPOINTED, "Receive a free Rally order.")
			button_next()
		} else {
			prompt_card(C_KUTUZOV_APPOINTED, `Place ${L_KUTUZOV} in the space with the most Russian SPs (${join_array_with_or(areas_with_most_ru_sps.map(area => get_area_name(area)))}).`)
			for (let area of areas_with_most_ru_sps) {
				action_area(area)
			}
		}
	},
	area(area) {
		push_undo()
		log("Placed at S" + area)
		move_leader(L_KUTUZOV, area)
		logi(`L${L_KUTUZOV}`)
		add_troop(RUSSIA, area, FRESH_INFANTRY, 1)
		logi(1 + " " + get_troop_type_name(FRESH_INFANTRY))
		add_troop(RUSSIA, area, FRESH_COSSACK, 1)
		logi(1 + " " + get_troop_type_name(FRESH_COSSACK))
		L.has_placed_kutuzov = true
	},
	next() {
		push_undo()
		log("Received a free Rally order.")
		add_persistent_event(C_KUTUZOV_APPOINTED) //To add the free Rally order later
		end()
	}
}

// RU #17: The Finland Corps
E.the_finland_corps = function() { return get_current_month() >= AUG }

P.the_finland_corps = {
	_begin() {
		L.spaces = [S_RIGA, S_LIVONIA, S_PSKOV].filter(area => is_ru_controlled(area))
		for (let area of [S_RIGA, S_LIVONIA, S_PSKOV]) {
			for (let s of get_all_adjacent_areas(area)) {
				if (is_ru_controlled(s) && !set_has(L.spaces, s)) set_add(L.spaces, s)
			}
		}
		L.troops_to_place = 3
		L.placement_status = []
	},
	inactive: "deploy Steinheil's Finland Corps",
	prompt() {
		//Always guaranteed Livonia and Pskov (Russian off-map areas)
		prompt_card(C_THE_FINLAND_CORPS, `Place ${L.troops_to_place} Infantry among ${join_array_with_or(L.spaces.map(area => `S${area}`))}.`)
		for (let s of L.spaces) {
			action_area(s)
		}
	},
	area(area) {
		push_undo()
		if (map_has(L.placement_status, area)) {
			map_increment(L.placement_status, area)
		} else {
			map_set(L.placement_status, area, 1)
		}
		add_troop(RUSSIA, area, FRESH_INFANTRY, 1)
		if (--L.troops_to_place === 0) {
			map_for_each(L.placement_status, (a, amount) => {
				log("Placed at S" + a)
				logi(amount + " " + get_troop_type_name(FRESH_INFANTRY))
			})
			end()
		} 
	}
}

//RU #18: Treaty of Bucharest
E.treaty_of_bucharest = function() { return get_current_month() >= AUG }

P.treaty_of_bucharest = {
	inactive: "transfer Chichagov from Bessarabia",
	prompt() {
		prompt_card(C_TREATY_OF_BUCHAREST, `Place Chichagov and 3 Infantry SPs at S${S_UKRAINE} or S${S_MOLDAVIA}.`)
		action_area(S_UKRAINE)
		action_area(S_MOLDAVIA)
	},
	area(area) {
		push_undo()
		log("Placed at S" + area)
		move_leader(L_CHICHAGOV, area)
		logi(`L${L_CHICHAGOV}`)
		add_troop(RUSSIA, area, FRESH_INFANTRY, 3)
		end()
	}
}

//RU #19: The Czar Leaves the Army
P.the_czar_leaves_the_army = {
	_begin() {
		L.step = -1
	},
	inactive: "send Alexander back to St. Petersburg",
	prompt() {
		if (L.step === -1) {
			prompt_card(C_THE_CZAR_LEAVES_THE_ARMY, "Remove Alexander from play at no cost.")
			action_leader(L_ALEXANDER)
		} else {
			prompt_card(C_THE_CZAR_LEAVES_THE_ARMY, "All done.")
			button_next()
		}
		
	},
	leader(alexander) {
		push_undo()
		log("Removed from S" + get_leader_location(L_ALEXANDER)) 
		move_leader(alexander, POOL)
		logi(`L${L_ALEXANDER}`)
		++L.step
		call("draw_card_to_hand")
	},
	next() {
		push_undo()
		end()
	}
}

//RU #20: Flying Columns
P.may_play_flying_columns = {
	inactive: "play C20",
	prompt() {
		if (hand_has(RUSSIA, C_FLYING_COLUMNS)) {
			prompt(`You may play ${get_card_log_alias(C_FLYING_COLUMNS)}.`)
			action_card(C_FLYING_COLUMNS)
			button_pass()
		} else {
			prompt(`You do not have ${get_card_log_alias(C_FLYING_COLUMNS)}.`)
			button_pass()
		}
	},
	card(card) {
		push_undo()
		goto("flying_columns")
	},
	pass() {
		end()
	}
}

function has_cossack_sp(area) {
	if (!has_troop(area)) return false
	return get_area_troop_set(area).some(entry => is_cossack(decode_troop_entry_type(entry)))
}

P.flying_columns = {
	_begin() {
		card_box_begin(C_FLYING_COLUMNS)
		L.step = -1
		L.count = array_count(get_orders_at_area(G.active, POOL), order => get_order_type(order) === COSSACK_RAID)
	},
	inactive: "organize flying columns of cossacks",
	prompt() {
		if (L.step === -1) {
			prompt_card(C_FLYING_COLUMNS, "Shift Initiative 1 in Russia's favor.")
			action_initiative_marker()
		} else if (L.step === 0) {
			if (L.count === 0) {
				prompt_card(C_FLYING_COLUMNS, `No Cossack Raid orders in pool to place.`)
				button_confirm()
			} else {
				prompt(`Select up to ${L.count} locations to place Cossack Raid.`)
				for (let area = FIRST_AREA; area <= LAST_AREA; ++area) 
					if (has_cossack_sp(area)) 
						action_area(area) 
			}
		} else {
			prompt_card(C_FLYING_COLUMNS, "All done.")
			button_done()
		}
	},
	initiative() {
		push_undo()
		shift_initiative(RUSSIA)
		++L.step
		log("Placed")
	},
	confirm() {
		push_undo()
		++L.step
		logi("Nothing")
	},
	area(area) {
		push_undo()
		add_order_of_type_from_pool(G.active, COSSACK_RAID, area)
		logi(`S${area}`)
		log(`<Cossack Raid`)

		if (--L.count === 0) 
			++L.step
	},
	done() {
		push_undo()
		card_box_end()
		discard_or_remove_card(C_FLYING_COLUMNS)
		end()
	}
}

// RU #21 Overstretched Logistics
P.overstretched_logistics = {
	_begin() { 
		L.has_russia_confirmed = false
		L.has_france_confirmed = false
	},
	prompt() {
		if (!L.has_russia_confirmed) {
			prompt_card(C_OVERSTRETCHED_LOGISTICS, "France must either remove a depot marker or add 1 to the distance to the nearest Depot marker when checking for Attrition. Confirm?")
			button_confirm()
		} else if (!L.has_france_confirmed) {
			if (has_depot_on_map(FRANCE)) {
				prompt_card(C_OVERSTRETCHED_LOGISTICS, `Remove a depot marker or add 1 to the distance to the nearest Depot marker when checking for Attrition.`)
				for (let depot = get_first_depot(FRANCE); depot <= get_last_depot(FRANCE); ++depot)
					if (is_depot_on_map(depot)) action_depot(depot)
			} else {
				prompt_card(C_OVERSTRETCHED_LOGISTICS, `Add 1 to the distance to the nearest Depot marker when checking for Attrition.`)
				button("add_1_to_attrition_distance")
			}
		} else {
			prompt_card(C_OVERSTRETCHED_LOGISTICS, "All done.")
			button_done()
		}
	},
	confirm() {
		G.active = FRANCE
		L.has_russia_confirmed = true
	},
	depot(depot) {
		push_undo()
		log(`Removed from S${get_depot_location(depot)}`)
		logi("1 depot marker")
		remove_depot(depot, get_depot_location(depot))
		L.has_france_confirmed = true
	},
	add_1_to_attrition_distance() {
		push_undo()
		log(`France adds 1 to the distance to the nearest Depot marker when checking for Attrition.`)
		add_persistent_event(C_OVERSTRETCHED_LOGISTICS)
		L.has_france_confirmed = true
	},
	done() {
		if (G.active === FRANCE)
			G.active = RUSSIA
		else
			end()
	}
}

// RU #22: City Ablaze!
P.russia_may_play_city_ablaze = {
	//L.area
	prompt() {
		prompt(`Russia may play ${get_card_log_alias(C_CITY_ABLAZE)} (cannot be undone)`)
		button_confirm()
	},
	confirm() {
		clear_undo()
		goto("may_play_city_ablaze", { area: L.area} )
	}
	
}

P.may_play_city_ablaze = {
	_begin() {
		//L.area
		G.active = RUSSIA
	},
	inactive: "to play C22",
	prompt() {
		if (hand_has(RUSSIA, C_CITY_ABLAZE)) {
			prompt(`You may play ${get_card_log_alias(C_CITY_ABLAZE)}.`)
			action_card(C_CITY_ABLAZE)
		} else {
			prompt(`You do not have ${get_card_log_alias(C_CITY_ABLAZE)}.`)
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
			prompt_card(C_CITY_ABLAZE, `Increase Devastation at S${L.area} to 3.`)
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
		log(`Devastation at S${area} set to 3.`)
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
P.may_play_stubborn_rearguard_ru = {
	_begin() {
		G.active = RUSSIA
	},
	prompt() {
		if (hand_has(RUSSIA, C_STUBBORN_REARGUARD_RU)) {
			prompt(`You may play ${get_card_log_alias(C_STUBBORN_REARGUARD_RU)} to cancel any losses from pursuit after this battle.`)
			action_card(C_STUBBORN_REARGUARD_RU)
		} else {
			prompt(`You do not have ${get_card_log_alias(C_STUBBORN_REARGUARD_RU)} in hand.`)
			button_pass()
		}
	},
	card(card) {
		push_undo()
		goto("event", { card })
	},
	pass() {
		goto("pursuit", { winner: FRANCE })
	}
}

P.stubborn_rearguard_ru = {
	prompt() {
		prompt_card(C_STUBBORN_REARGUARD_RU, "Cancel any losses from pursuit in this battle. (cannot be undone)")
		button_confirm()
	},
	confirm() {
		//TO CHECK: Do we even need to go to pursuit at this point?
		goto("end_battle", { drawn_battle: false } )
	}
}

function has_friendly_depot(who, area) {
	return get_depots(who).some(location => location === area)
}

function is_area_in_supply(who, area) {
	update_supply()
	return G.supply[who][area] <= MAX_SUPPLY_DISTANCE
}

// RU #24: New Posting
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
		else if (L.selected_leader === L_ALEXANDER) { //MUST, if at all possible, stack and move with another leader.
			prompt_card(C_NEW_POSTING, `Relocate L${L_ALEXANDER} to any in-supply space. L${L_ALEXANDER} must stack with another Russian leader.`)
			for (let area = FIRST_AREA; area <= LAST_AREA; ++area) {
				if (is_area_in_supply(RUSSIA, area) && has_friendly_leader(RUSSIA, area) && (area !== get_leader_location(L.selected_leader) && (has_russian_sp(area)))) {
					action_area(area)
				}
			}
		} 
		else if ((get_leader_location(L.selected_leader) === get_leader_location(L_ALEXANDER)) && (get_leaders_at_area(RUSSIA, get_leader_location(L.selected_leader)).length === 2)) {
			prompt_card(C_NEW_POSTING, `May not leave Alexander alone at S${get_leader_location(L.selected_leader)}.`)
			button_confirm() //placeholder for now so that fuzzer doesn't throw
		}
		else {
			prompt_card(C_NEW_POSTING, `Relocate L${L.selected_leader} to any in-supply space.`)
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
		log("Moved to S" + area)
		move_leader(L.selected_leader, area)
		logi(`L${L.selected_leader}`)
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

// RU #25, RU #26 Exhausting March
P.may_play_exhausting_march = {
	prompt() {
		if (hand_has(G.active, C_EXHAUSTING_MARCH_1)) {
			prompt(`You may play ${get_card_log_alias(C_EXHAUSTING_MARCH_1)}.`)
			action_card(C_EXHAUSTING_MARCH_1)
		} else if (hand_has(G.active, C_EXHAUSTING_MARCH_2)) {
			prompt(`You may play ${get_card_log_alias(C_EXHAUSTING_MARCH_2)}.`)
			action_card(C_EXHAUSTING_MARCH_2)
		} else {
			prompt(`You do not have ${get_card_log_alias(C_EXHAUSTING_MARCH_1)}.`)
			button_pass()
		}
		button_pass()
	},
	card(card) {
		push_undo()
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

function is_track_connection(a, b) {
	return get_adjacent_areas_by_track(a).includes(b)
}

P.exhausting_march = {
	_begin() {
		// L.card, G.move
		card_box_begin(C_EXHAUSTING_MARCH_1)
		L.num_losses = 0
		L.sp_losses = 0

		G.move.sps.forEach(amt => L.sp_losses += amt)
		L.sp_losses = Math.ceil(L.sp_losses / 5)
		L.num_losses += L.sp_losses

		for (let i = 0; i < G.move.path.length - 1; ++i)
			if (is_track_connection(G.move.path[i], G.move.path[i + 1])) 
				++L.num_losses
	},
	prompt() {
		prompt_card(L.card, `France must take ${L.num_losses} attrition losses.`)
		button_confirm()
	},
	confirm() {
		push_undo()
		log(`France takes ${L.num_losses} attrition losses.`)
		logi(`+${L.sp_losses} SPs`)
		logi(`+${L.num_losses - L.sp_losses} Tracks`)
		// G.active = FRANCE
		// TODO
		card_box_end()
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

// RU #27: Unexpected Retreat
P.unexpected_retreat = {
	prompt() {
		prompt(`Confirm play of ${get_card_log_alias(C_UNEXPECTED_RETREAT)}? (cannot be undone).`)
		button_confirm()
	},
	confirm() {
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
			if (has_austrian_sp(area) && has_russian_sp(area))
				set_add(L.areas, area)
		L.did_evade = false
	},
	prompt() {
		if (L.areas.length === 0) {
			prompt_card(C_UNEXPECTED_RETREAT, `All done.`)
			button_done()
		} else {
			prompt_card(C_UNEXPECTED_RETREAT, `Select next area from which Austrian SPs should evade. (${join_array_with_or(L.areas.map(area => `S${area}`))})`)
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
		log_h4(`S${area}`, G.active)
		log()
		log(`${get_card_log_alias(C_UNEXPECTED_RETREAT)}`)
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

P.poor_coordination_ru = {
	_begin() {
		L.num_track_connections_used = count_num_track_connections_used_to_enter_battle(FRANCE, G.current_battle) 
	},
	prompt() {
		prompt_card(C_POOR_COORDINATION_RU, `Reduce French combat value by ${3 * L.num_track_connections_used} for ${L.num_track_connections_used} Track connections used to enter the battle.`)
		button_confirm()
	},
	confirm() {
		push_undo()
		log(`France combat value -${3 * L.num_track_connections_used}.`)
		end()
	}
}

//RU #29: Cavalry Screening
P.cavalry_screening = {
	_begin() {
		L.count = Math.min(2, array_count(get_orders_at_area(G.active, POOL), order => get_order_type(order) === EVADE))
	},
	inactive: "retreat under cover of their cavalry",
	prompt() {
		if (L.count > 0) {
			prompt_card(C_CAVALRY_SCREENING, `Place Evade orders on areas containing RU Cavalry and/or Cossack SPs (${L.count} remaining).`)
			for (let area = FIRST_AREA; area <= LAST_AREA; ++area)
				if (has_troop(area) && has_cavalry_or_cossack_in_area(G.active, area)) 
					action_area(area)
		} else {
			prompt_card(C_CAVALRY_SCREENING, "All done.")
			button_done()
		}
	},
	area(area) {
		push_undo()
		add_order_of_type_from_pool(G.active, EVADE, area)
		--L.count
		log("Placed 'Evade' at S" + area + ".")
	},
	done() { 
		push_undo()
		end() 
	}
}

// RU #30: Devastated Landscape
P.devastated_landscape = {
	prompt() {
		prompt_card(C_DEVASTATED_LANDSCAPE, `Confirm event play? (cannot be undone)`)
		button_confirm()
	},
	confirm() {
		goto("execute_devastated_landscape")
	},
	done() {
		push_undo()
		end()
	}
}

// TODO: undo
P.execute_devastated_landscape = {
	_begin() {
		G.active = [RUSSIA, FRANCE]
		L.forage_orders = [get_placed_orders_of_type(FORAGE).filter(order => get_order_owner(order) === RUSSIA), get_placed_orders_of_type(FORAGE).filter(order => get_order_owner(order) === FRANCE)]
		L.has_confirmed_devastation = [false, false]
		L.removed_orders = [[], []]
	},
	prompt() {
		if (L.forage_orders[R].length > 0) {
			if (L.forage_orders[R].length > 0) {
				prompt_card(C_DEVASTATED_LANDSCAPE, `Remove Forage orders from ${join_array_with_and(L.forage_orders[R].map(order => `S${get_order_location(order)}`))}.`)
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
		if (G.active.length === 0) {
			add_persistent_event(C_DEVASTATED_LANDSCAPE)
			end()
		}
	}
}

// RU #31: Stoic Infantry
E.stoic_infantry = function() { return is_battle_defender(RUSSIA, G.current_battle) && (count_num_infantry(RUSSIA, G.current_battle) > 0) }

P.stoic_infantry = { //TODO: Implement actual effect
	prompt() {
		prompt_card(C_STOIC_INFANTRY, "The first 2 Russian Infantry SPs to become exhausted this battle immediately rally again.")
		button_confirm()
	},
	confirm() {
		push_undo()
		log("The first 2 Russian Infantry SPs to become exhausted this battle immediately rally again.")
		add_persistent_event(C_STOIC_INFANTRY, { num_exhausted_infantry: 0 }) //A 'persistent event' for tracking, will be deleted at the end of the battle
		end()
	}
}

// RU #32: The Artillery Corps
E.the_artillery_corps = function() { return has_leader_in_battle(RUSSIA, G.current_battle) }

P.the_artillery_corps = {
	prompt() {
		if (is_battle_event_currently_active(C_INFANTRY_SQUARES_FR))
			prompt_card(C_THE_ARTILLERY_CORPS, `French losses are increased by 2 (${get_card_log_alias(C_INFANTRY_SQUARES_FR)} was played).`)
		else
			prompt_card(C_THE_ARTILLERY_CORPS, `French losses are increased by 1.`)
		button_confirm()
	},
	confirm() {
		push_undo()
		if (is_battle_event_currently_active(C_INFANTRY_SQUARES_FR))
			log(`French losses +2. (${get_card_log_alias(C_INFANTRY_SQUARES_FR)})`)
		else
			log(`French losses +1.`)
		end()
	}
}

// RU #33: Fortifications
E.fortifications = function() { return is_battle_defender(RUSSIA, G.current_battle) && has_leader_in_battle(RUSSIA, G.current_battle) }

P.fortifications = {
	_begin() {
		L.step = -1
		L.outflanking = is_battle_event_active(G.current_battle, C_OUTFLANKING_FR_1) ? C_OUTFLANKING_FR_1 : (is_battle_event_active(G.current_battle, C_OUTFLANKING_FR_2) ? C_OUTFLANKING_FR_2 : -1) 
	},
	prompt() {
		if (L.step === -1) {
			if (battle_has_defend_order(G.current_battle)) {
				prompt_card(C_FORTIFICATIONS, `Double the effect of Defend at S${G.current_battle}.`)
				button_confirm()
			} else {
				if (has_order_of_type(G.active, DEFEND, POOL)) {
					prompt_card(C_FORTIFICATIONS, `Place a Defend order at S${G.current_battle}.`)
					action_area(G.current_battle)
				} else {
					prompt_card(C_FORTIFICATIONS, `No defend orders in pool.`)
					button_pass()
				}
			}
		} else {
			prompt_card(C_FORTIFICATIONS, `Cancels the effect of ${get_card_log_alias(L.outflanking)}.`)
			button_confirm()
		}
	},
	confirm() {
		push_undo()
		if (L.step === -1)
			log("Doubles effect of Defend order.")
		else
			log(`Cancels ${get_card_log_alias(L.outflanking)}.`)
		this.transition()
	},
	area(area) {
		push_undo()
		add_order_of_type_from_pool(G.active, DEFEND, area)
		this.transition()
	},
	pass() {
		push_undo()
		this.transition()
	},
	transition() {
		if (L.outflanking > -1 && L.step === -1) ++L.step
		else end()
	}
}

// RU #34: Platov's Cossacks
E.platovs_cossacks = function() { return is_leader_in_battle(L_PLATOV, G.current_battle) }

P.platovs_cossacks = {
	prompt() {
		prompt_card(C_PLATOVS_COSSACKS, `Cossack SPs fight at X1, and the French combat value is decreased by the number of fresh Cossacks present.`)
		button_confirm()
	},
	confirm() {
		push_undo()
		log("Cossack SPs fight at X1.")
		log("French combat value is decreased by the number of fresh Cossack SPs present.")
		end()
	}
}

// RU #35: Fickle Habsburgs
E.fickle_habsburgs = function() { return is_leader_in_battle(L_SCHWARZENBERG, G.current_battle) }

P.fickle_habsburgs = {
	prompt() {
		prompt_card(C_FICKLE_HABSBURGS, "Losses on both sides are reduced by 1, and Russia wins a tied battle.")
		button_confirm()
	},
	confirm() {
		push_undo()
		log("Both sides' losses -1.")
		log("Russia wins if the battle is tied.")
		end()
	}
}

// RU #36: Infantry Squares
E.infantry_squares_ru = function() { return count_num_infantry(RUSSIA, G.current_battle) >= 4 }

P.infantry_squares_ru = {
	prompt() {
		prompt_card(C_INFANTRY_SQUARES_RU, "French Cavalry SPs fight at X0, and the first French loss in this battle must be a Cavalry SP, if possible.")
		button_confirm()
	},
	confirm() {
		push_undo()
		log("French Cavalry SPs fight at X0.")
		log("The first French losses this battle must be a Cavalry SP, if possible.")
		end()
	}
}

// RU #37: Enveloping Moves
E.enveloping_moves = function() { return is_battle_attacker(RUSSIA, G.current_battle) && has_leader_in_battle(RUSSIA, G.current_battle) }

P.enveloping_moves = {
	prompt() {
		prompt_card(C_ENVELOPING_MOVES, "If more Russian than French fresh SPs are present after battle, the battle is considered a draw that is won by Russia.")
		button_confirm()
	},
	confirm() {
		push_undo()
		log("If more Russian than French fresh SPs are present after battle, the battle is considered a draw that is won by Russia.")
		end()
	}
}

// RU #38: Konstantine's Corps
E.konstantines_corps = function() { return has_leader_in_battle(RUSSIA, G.current_battle) }

P.konstantines_corps = {
	prompt() {
		prompt_card(C_KONSTANTINES_CORPS, "Up to 3 Russian Infantry SPs fight at X2, and draw an additional card to your hand at the end of the battle if you win.")
		button_confirm()
	},
	confirm() {
		push_undo()
		log("Up to 3 Russian Infantry SPs fight at X2.")
		log("Russia draws an additional card to their hand if they win the battle.")
		end()
	}
}

// RU #39: Cavalry Charge
E.cavalry_charge_ru = function() { return has_leader_in_battle(RUSSIA, G.current_battle) }

P.cavalry_charge = {
	prompt() {
		prompt_card(C_CAVALRY_CHARGE_RU, "Up to 2 Russian Cavalry SPs fight at X2, and draw an additional card to your hand at the end of the battle if you win.")
		button_confirm()
	},
	confirm() {
		push_undo()
		log("Up to 2 Russian Cavalry SPs fight at X2.")
		log("Russia draws an additional card to their hand if they win the battle.")
		end()
	}
}

// RU #40: Delayed Forces: TODO
E.delayed_forces_ru = function() { return is_battle_defender(RUSSIA, G.current_battle) }

// RU #41: Fierce Fighting
E.fierce_fighting_ru = function() { return is_battle_defender(RUSSIA, G.current_battle) && has_leader_in_battle(RUSSIA, G.current_battle) }

P.fierce_fighting_ru = {
	prompt() {
		prompt_card(C_FIERCE_FIGHTING_RU, `Increase both sides' losses by 2, and there is no pursuit after battle.`)
		button_confirm()
	},
	confirm() {
		push_undo()
		log("Both sides' losses +2.")
		log("No pursuit after battle.")
		end()
	}
}

// RU #42: Command Friction
P.command_friction = {
	_begin() {
		card_box_begin(C_COMMAND_FRICTION)
		L.selected_area = -1

		L.areas_with_multiple_russian_leaders = []
		for (let area of G.leaders.slice(first_russia_leader, last_russia_leader + 1)) {
			if (array_count(G.leaders.slice(first_russia_leader, last_russia_leader + 1), loc => loc === area) >= 2) {
				set_add(L.areas_with_multiple_russian_leaders, area)
			}
		}
	},
	inactive: "start a fight",
	prompt() {
		if (L.selected_area > -1) {
			prompt_card(C_COMMAND_FRICTION, `You selected S${L.selected_area}.`)
			button_confirm()
		} else {
			if (L.areas_with_multiple_russian_leaders.length === 0) {
				prompt_card(C_COMMAND_FRICTION, `No areas with multiple Russian leaders.`)
				button_pass()
			} else {
				prompt_card(C_COMMAND_FRICTION, `Select an area with multiple Russian leaders. (${join_array_with_or(L.areas_with_multiple_russian_leaders.map(area => `S${area}`))}).`)
				for (let area of L.areas_with_multiple_russian_leaders) {
					action_area(area)
				}
			}
		}
	},
	area(area) {
		push_undo()
		L.selected_area = area
	},
	pass() {
		log("No areas with multiple Russian leaders.")
		card_box_end()
		end()
	},
	confirm() {
		log("France selected S" + L.selected_area + ".") 
		card_box_end()
		end()
	}
}

// RU #43: Exhausted Horses
P.exhausted_horses = { //TODO
	_begin() {
		end()
	}
}

// RU #44 Disease & Starvation
P.disease_and_starvation = {
	_begin() {
		L.num_enemy_sps_eliminated = 0

		L.areas = []
		for (let area = FIRST_AREA; area <= LAST_AREA; ++area)
			if (get_devastation(area) >= 2 && has_friendly_troop(FRANCE, area))
				set_add(L.areas, area)
	},
	prompt() {
		if (L.num_enemy_sps_eliminated < 4) {
			if (L.areas.length > 0) {
				prompt_card(C_DISEASE_AND_STARVATION, `Select an area with a Devastation level of 2 or more to eliminate up to ${4 - L.num_enemy_sps_eliminated} SPs.`)
				if (L.areas.length <= 5) V.prompt += ` ${join_array_with_or(L.areas.map(area => `S${area}`))}`

				for (let area of L.areas) 
					action_area(area)
			} else {
				prompt_card(C_DISEASE_AND_STARVATION, `No more areas with a Devastation level of 2 or more to eliminate French SPs.`)
				button_done()
			}
		} else {
			prompt_card(C_DISEASE_AND_STARVATION, "All done.")
			button_done()
		}
	},
}

// RU #47: Treacherous Allies
function is_russia_within_two_areas_of_vilna() {
	let area_exists = false
	map_for_each(G.troops, (area, entries) => {
		if (has_russian_sp(area) && (find_path_distance(area, S_VILNA) <= 2))
			area_exists = true
	})
	return area_exists
}

P.treacherous_allies = {
	_begin() {
		L.step = -1
	},
	prompt() {
		if (is_russia_within_two_areas_of_vilna()) {
			if (L.step === -1) {
				prompt_card(C_TREACHEROUS_ALLIES, `Confirm: France must remove Schwarzenberg and all Prussian and Austrian SPs at S${G.current_battle}.`)
				button_confirm()
			} else if (L.step === 0) {
				let allied_nationalities_at_area = []
				if (has_prussian_sp(G.current_battle)) set_add(allied_nationalities_at_area, "Prussian")
				if (has_austrian_sp(G.current_battle)) set_add(allied_nationalities_at_area, "Austrian")
				
				let allies_string = allied_nationalities_at_area.length > 0 ? join_array_with_and(allied_nationalities_at_area) : "0 SPs."
				
				if (get_leader_location(L_SCHWARZENBERG) === G.current_battle)
					prompt_card(C_TREACHEROUS_ALLIES, `Eliminate L${L_SCHWARZENBERG} and all ${allies_string} SPs.`)
				button("eliminate")
			} else {
				prompt_card(C_TREACHEROUS_ALLIES, "All done.")
				button_done()
			}
		} else {
			prompt_card(C_TREACHEROUS_ALLIES, "No effect.")
			button_confirm()
		}
	},
	confirm() {
		push_undo()
		if (is_russia_within_two_areas_of_vilna()) {
			G.active = FRANCE
			++L.step
		} else {
			log("No effect.")
			end()
		}
	},
	eliminate() {
		push_undo()
		log("Eliminated")
		if (get_leader_location(L_SCHWARZENBERG) === G.current_battle) {
			logi(`L${L_SCHWARZENBERG}`)
			eliminate_leader(L_SCHWARZENBERG)
		}

		for (let type of get_troop_types_at_area(FRANCE, G.current_battle)) {
			if (type >= FRESH_PRUSSIAN_INFANTRY) {
				let count = count_num_sps_of_type(FRANCE, type, G.current_battle)
				logi(`${count} ${get_troop_type_name(type)}`)
				eliminate_troop(FRANCE, G.current_battle, type, count)
			}
		}

		//TODO: Remove these guys from the battle

		++L.step
	},
	done() {
		end()
	}
}

function eliminate_leader(leader) {
	move_leader(leader, OUT_OF_PLAY)
	increase_vp(enemy(get_leader_faction(leader)), get_leader_vp(leader))
}

function get_order_location(order) {
	return G.orders[order]
}

function has_order(area) {
	return G.orders.some(order_location => order_location === area)
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
P.disorderly_march = {
	_begin() {
		L.step = -1
		L.orders_to_remove = []
	},
	inactive: "expose the French troops' poor discipline",
	prompt() {
		if (L.step === -1) {
			prompt_card(C_DISORDERLY_MARCH, "Shift the Initiative marker 1 in Russia's favor.")
			action_initiative_marker()
		} else if (L.step === 0) {
			prompt_card(C_DISORDERLY_MARCH, "Designate an area: France must remove all 'Defend', 'Forage', and 'Place Depot' orders on it.")
			for (let area = FIRST_AREA; area <= LAST_AREA; ++area) 
				if (has_french_sp(area) && has_order(area)) action_area(area)
		} else if (L.step === 1) {
			prompt_card(C_DISORDERLY_MARCH, "You designated S" + L.selected_area + ". French forces must stop moving immediately after entering/exiting it. (CANNOT BE UNDONE)")
			button_confirm()
		} else if (L.step === 2) {
			if (L.orders_to_remove.length > 0) {
				prompt_card(C_DISORDERLY_MARCH, `Remove all 'Defend', 'Forage', and 'Place Depot' orders from S${L.selected_area}.`)
				for (let order of L.orders_to_remove) {
					action_order(order)
				}
			} else {
				prompt_card(C_DISORDERLY_MARCH, `This turn, France must stop after entering S${L.selected_area}.`)
				button_done()
			}
		} else {
			prompt_card(C_DISORDERLY_MARCH, "All done.")
			button_next()
		}
	},
	initiative() {
		push_undo()
		shift_initiative(RUSSIA)
		++L.step
	},
	area(area) {
		push_undo()
		log(`Designated S${area}.`)
		L.selected_area = area
		++L.step
	},
	order(order_id) {
		push_undo()
		log("Removed from S" + L.selected_area)
		logi("1 order")
		remove_order(order_id)
		set_delete(L.orders_to_remove, order_id)
	},
	done() {
		++L.step
		log(`This turn, France must stop after entering S${L.selected_area}.`)
		G.active = RUSSIA
	},
	confirm() {
		clear_undo()
		//log(`France must remove all 'Defend', 'Forage', and 'Place Depot' orders at S${L.selected_area}.`)
		L.orders_to_remove = get_orders_at_area(FRANCE, L.selected_area).filter(order => [DEFEND, FORAGE, PLACE_DEPOT].includes(get_order_type(order)))
		++L.step
		G.active = FRANCE
	},
	next() {
		end()
	}
}

// RU #50: Crumbling Cohesion
E.crumbling_cohesion = function() { return is_battle_attacker(RUSSIA, G.current_battle) }

P.crumbling_cohesion = {
	_begin() {
		L.step = -1
	},
	prompt() {
		if (L.step === -1) {
			if (get_who_has_initiative() === RUSSIA && get_current_initiative_level() === 4) {
				prompt_card(C_CRUMBLING_COHESION, `Cannot increase Initiative further.`)
				button_next()
			} else {
				prompt_card(C_CRUMBLING_COHESION, "Shift Initiative 1 in favor of Russia.")
				action_initiative_marker()
			}
		} else {
			prompt_card(C_CRUMBLING_COHESION, `Cossack SPs fight at X${get_who_has_initiative() === RUSSIA ? get_current_initiative_level() : 0} instead of X0.`)
			button_confirm()
		}
	},
	next() {
		push_undo()
		log("Cannot shift Initiative further.")
		++L.step
	},
	initiative() {
		push_undo()
		shift_initiative(RUSSIA)
		++L.step
	},
	confirm() {
		push_undo()
		log( `Cossack SPs fight at X${get_who_has_initiative() === RUSSIA ? get_current_initiative_level() : 0}.`)
		end()
	}
}

// RU #51: Unreliable Germans
E.unreliable_germans = function() { return get_who_has_initiative() === RUSSIA }

P.unreliable_germans = {
	prompt() {
		prompt_card(C_UNRELIABLE_GERMANS, `All Austrian and Prussian SPs fight with X0 combat value, while French Infantry and Cavalry fight with X0,5 combat value.`)
		button_confirm()
	},
	confirm() {
		push_undo()
		log("Austrian and Prussian SPs fight at X0.")
		log("French Infantry and Cavalry fight at X0,5.")
		end()
	}
	
}

// RU #53: Aggressive Cossacks
E.aggressive_cossacks = function() { return get_who_has_initiative() === RUSSIA }

P.aggressive_cossacks = {
	prompt() {
		prompt_card(C_AGGRESSIVE_COSSACKS, "Cossack SPs fight at X2 instead of X0.")
		button_confirm()
	},
	confirm() {
		push_undo()
		log("Cossack SPs fight at X2.")
		end()
	}
}

// FR #1: Hard Marching
// FR #2: Hard Marching
P.hard_marching_1 = function() { goto("hard_marching", {card: C_HARD_MARCHING_1}) }
P.hard_marching_2 = function() { goto("hard_marching", {card: C_HARD_MARCHING_2}) }

P.hard_marching = {
	_begin() {
		//L.card
		L.step = -1
	},
	inactive: "demonstrate its military prowess",
	prompt() {
		if (L.step === -1) {
			prompt_card(L.card, "Shift the Initiative 1 in France's favor.")
			action_initiative_marker()
		} else if (L.step === 0) {
			prompt_card(L.card, "Receive 1 free Forced March order, but 1 SP in each forced marching force is exhausted.")
			button_next()
		} else {
			prompt_card(L.card, "This turn all French forces using 'Forced March' orders fight at X1 instead of X0,5.")
			button_next()
		}
	},
	initiative() {
		push_undo()
		shift_initiative(FRANCE)
		++L.step
	},
	next() {
		push_undo()
		if (L.step === 0) {
			++L.step
			log("France receives 1 free Forced March order, but 1 SP in each forced marching force is exhausted.")
		} else {
			add_persistent_event(L.card)
			log("This turn all French forces using 'Forced March' orders fight at X1 instead of X0,5.")
			end()
		}
	}
}

//FR #3: War Weariness
P.war_weariness = {
	_begin() {
		L.controlled_areas = [S_MOSCOW, S_TORZHOK, S_BEZHANITZY, S_OSTROV, S_VENDEN].filter(s => is_fr_controlled(s))
		L.eliminated_russian_leaders = []
		for (let i = first_russia_leader; i <= last_russia_leader; ++i) {
			if (G.leaders[i] === OUT_OF_PLAY) L.eliminated_russian_leaders.push(i)
		}

		L.french_vp = L.controlled_areas.length + L.eliminated_russian_leaders.length
	},
	inactive: "press for a negotiated settlement",
	prompt() {
		prompt_card(C_WAR_WEARINESS, `Shift the VP marker ${L.french_vp} in France's favor.`)
		action_vp_marker()
	},
	vp() {
		push_undo()
		increase_vp(FRANCE, L.french_vp)
		for (let s of L.controlled_areas) {
			logi(`+1 S${s}`)
		}
		for (let leader of L.eliminated_russian_leaders) {
			logi(`+1 L${leader}`)
		}
		end()
	}
}

// FR #4: Holy Mother Russia (FR)
P.holy_mother_russia_fr = {
	inactive: "to exploit the pressure on the Russian leadership",
	prompt() {
		prompt_card(C_HOLY_MOTHER_RUSSIA_FR, "Designate a Key City area. France +1 VP for each RU force that leaves there via 'Forced March', 'March', or 'Evade' orders.")
		for (let area = FIRST_AREA; area <= LAST_AREA; ++area) { //TO CHECK: Does this have to be restricted to RU-controlled Key cities?
			if (get_area_type(area) === "key_city") {
				action_area(area)
			}
		}
	},
	area(area) {
		log(`This turn, France will gain 1 VP for each RU force that leaves S${area} via 'Force March', 'March' or 'Evade'.`)
		add_persistent_event(C_HOLY_MOTHER_RUSSIA_FR, {area: area})
		end()
	}
}

// FR #5: Polish Support
E.polish_support = function() { return set_has([S_KOVNO, S_VILNA, S_VITEBSK], get_leader_location(L_NAPOLEON)) }

P.polish_support = {
	_begin() {
		L.step = -1
	},
	inactive: "recruit Polish volunteers",
	prompt() {
		if (L.step === -1) {
			prompt_card(C_POLISH_SUPPORT, "Place 2 Infantry SPs at S" + get_leader_location(L_NAPOLEON) + ".")
			action_area(get_leader_location(L_NAPOLEON))
		} else {
			prompt_card(C_POLISH_SUPPORT, "All done.")
			button_next()
		}
	},
	area(area) {
		push_undo()
		log("Placed at S" + area)
		add_troop(FRANCE, area, FRESH_INFANTRY, 2)
		logi(2 + " " + get_troop_type_name(FRESH_INFANTRY))
		++L.step
		call("draw_card_to_hand")
	},
	_resume() {
		++L.step
	},
	next() {
		push_undo()
		end()
	},
	_resume() {
		++L.step
	},
}

// FR #7 Unsuccessful Disengagement
P.may_play_unsuccessful_disengagement = {
	prompt() {
		if (set_has(get_hand(FRANCE), C_UNSUCCESSFUL_DISENGAGEMENT)) {
			prompt(`You may play ${get_card_log_alias(C_UNSUCCESSFUL_DISENGAGEMENT)} to cancel all Evade orders at S${L.area}.`)
			action_card(C_UNSUCCESSFUL_DISENGAGEMENT)
		} else {
			prompt(`You do not have ${get_card_log_alias(C_UNSUCCESSFUL_DISENGAGEMENT)} in hand.`)
		}
		button_pass()
	},
	card(card) {
		push_undo()
		goto("unsuccessful_disengagement", { area: L.area })
	},
	pass() {
		L.L.unsuccessful_disengagement = false
		end()
	}
}

P.unsuccessful_disengagement = {
	_begin() {
		card_box_begin(C_UNSUCCESSFUL_DISENGAGEMENT)
	},
	prompt() {
		prompt_card(C_UNSUCCESSFUL_DISENGAGEMENT, `Confirm cancelling all Evade orders at S${L.area}?`)
		button_confirm()
	},
	confirm() {
		log(`Cancelled all Evade orders at S${L.area}.`)

		let cancelled_orders = []
		for (let order of get_orders_at_area(enemy(G.active), L.area))
			if (get_order_type(order) === EVADE)
				set_add(cancelled_orders, order)

		add_persistent_event(C_UNSUCCESSFUL_DISENGAGEMENT, { area: L.area, cancelled_orders })
		L.L.unsuccessful_disengagement = true
		
		card_box_end()
		discard_or_remove_card(C_UNSUCCESSFUL_DISENGAGEMENT)
		end()
	}
}

// FR #8: Infighting & Intrigue
P.infighting_and_intrigue = {
	_begin() {
		L.selected_area = -1
	},
	inactive: "try to make the Russians give battle",
	prompt() {
		if (L.selected_area > -1) {
			prompt_card(C_INFIGHTING_AND_INTRIGUE, `You selected S${L.selected_area}.`)
			button_confirm()
		} else {
			prompt_card(C_INFIGHTING_AND_INTRIGUE, `Designate an area. This turn, Russian leaders there may only execute 'Forced March' or 'March' orders if they end in a French-occupied area.`)
			for (let area of [...new Set(G.leaders.slice(first_russia_leader, last_russia_leader + 1).filter(a => (a !== POOL) && (a !== OUT_OF_PLAY)))]) {
				action_area(area)
			}
		}
	},
	area(area) {
		push_undo()
		L.selected_area = area
		log(`Selected S${area}.`)
		log(`Russian leaders at S${area} may only execute Forced March or March orders if they end in a French-occupied area.`)
	},
	confirm() {
		push_undo()
		add_persistent_event(C_INFIGHTING_AND_INTRIGUE, { area: L.selected_area })
		end()
	}
}

// FR #9, FR #10: Hard Marching
P.may_play_fast_marching = {
	_begin() {
		L.events = [C_FAST_MARCHING_1, C_FAST_MARCHING_2].filter(card => hand_has(G.active, card))
	},
	prompt() {
		prompt(`You may play ${join_array_with_or(L.events.map(card => `${get_card_log_alias(card)}`))}.`)
		L.events.forEach(action_card)
		button_pass()
	},
	card(card) {
		push_undo()
		set_delete(L.events, card)
		goto("fast_marching", { area: L.area, card })
	},
	pass() { goto("select_force", { type: MARCH, area: L.area }) }
}

P.fast_marching = {
	_begin() { 
		// L.area, L.card
		card_box_begin(L.card)
		L.step = -1 
	},
	prompt() {
		if (L.step === -1)
			prompt_card(C_FAST_MARCHING_1, `The force using this March order have a move allowance of 2.`)
		else
			prompt_card(C_FAST_MARCHING_2, `1 fresh SP (if any) in the moving force becomes exhausted.`)
		button_confirm()
	},
	confirm() {
		push_undo()
		if (L.step === -1) {
			++L.step
			log(`This March order has a move allowance of 2.`)
		} else {
			log(`1 fresh SP in the moving force becomes exhausted.`)
			add_persistent_event(L.card)
			card_box_end()
			discard_or_remove_card(L.card)
			goto("select_force", { type: MARCH, area: L.area })
		}
	}
}

// FR #11: Grand Battery
E.grand_battery = function() { return is_leader_in_battle(L_NAPOLEON, G.current_battle) }

function add_to_prompt(text) {
	V.prompt += text
}

P.grand_battery = {
	prompt() {
		if (is_battle_defender(FRANCE, G.current_battle))
			prompt_card(C_GRAND_BATTERY, "Russian losses +1.")
		else
			prompt_card(C_GRAND_BATTERY, "Russian losses +2.")

		if (is_battle_event_currently_active(C_INFANTRY_SQUARES_RU))
			add_to_prompt(` Russian losses increased by an additional 1 because Russia played ${get_card_log_alias(C_INFANTRY_SQUARES_RU)}.`)

		button_confirm()
	},
	confirm() {
		push_undo()
		if (is_battle_defender(FRANCE, G.current_battle))
			log("Russian losses +1.")
		else
			log("Russian losses +2.")
		if (is_battle_event_currently_active(C_INFANTRY_SQUARES_RU))
			log(`${get_card_log_alias(C_INFANTRY_SQUARES_RU)}: Russian losses increased by an additional 1.`)
		end()
	}
}

// FR #12: Cavalry Charge
E.cavalry_charge_fr = function() { return is_leader_in_battle(L_MURAT, G.current_battle) }

P.cavalry_charge_fr = {
	prompt() {
		prompt_card(C_CAVALRY_CHARGE_FR, "The combat value of up to 2 FR Cavalry SPs are tripled.")
		button_confirm()
	},
	confirm() {
		push_undo()
		log("Up to 2 FR Cavalry SPs fight X3.")
		end()
	}
}

// FR #13: Murat's Cavalry
E.murats_cavalry = function() { return is_leader_in_battle(L_MURAT, G.current_battle) }

P.murats_cavalry = {
	_begin() { L.step = -1 },
	prompt() {
		if (L.step === -1) {
			prompt_card(C_MURATS_CAVALRY, "The combat value of up to 2 French Cavalry SPs is doubled, but one such SP becomes exhausted after the battle.")
			button_confirm()
		} else {
			prompt_card(C_MURATS_CAVALRY, "If France wins the battle, the remaining fresh Cavalry count X2 for pursuit.")
			button_confirm()
		}
	},
	confirm() {
		push_undo()
		if (L.step === -1)  {
			log("Up to 2 French Cavalry SPs fight at X2.")
			++L.step
		} else {
			log("If France wins the battle, the remaining Cavalry count X2 for pursuit.")
			end()
		}
	}
}

// FR #14: Skillful Maneuvers: TODO
E.skillfull_maneuvers = function() { return is_battle_attacker(FRANCE, G.current_battle) && did_attacker_attack_across_multiple_connections(G.current_battle) }

P.skillfull_maneuvers = {
	_begin() { L.selection = null },
	prompt() {
		if (L.selection === null) {
			prompt_card(C_SKILLFULL_MANEUVERS, "Choose an effect to play.")
			if (get_defender_data(G.current_battle).defend_order)
				button("remove_defend_order")
			if (get_attacker_data(G.current_battle).forces.some(entry => entry.river_crossing === true))
				button("cancel_river_effect")
			button_pass()
		}
	}
}

function increase_vp(who, amount = 1) {
	log(`${ROLES[who]} +${amount} VP.`)
	if (who === RUSSIA)
		G.vp -= amount
	else
		G.vp += amount

	if (Math.abs(G.vp) >= 20) {
		log_h1("The End")
		finish(who, `Sudden Death: ${ROLES[who]} won with ${Math.abs(G.vp)} VP.`)
	}
}

function decrease_vp(who, amount = 1) {
	log(`${ROLES[who]} -${amount} VP.`)
	if (who === RUSSIA)
		G.vp += amount
	else
		G.vp -= amount

	if (Math.abs(G.vp) >= 20) {
		log_h1("The End")
		finish(enemy(who), `Sudden Death: ${ROLES[enemy(who)]} won ${Math.abs(G.vp)} VP.`)
	}
}

// FR #15: Peace Offer
E.peace_offer = function() { return is_fr_controlled(S_MOSCOW) }

P.peace_offer = {
	_begin() {
		L.step = -1
		L.areas_occupied = [S_RIGA, S_OSTROV, S_KIEV, S_BEZHANITZY, S_TVER].filter(area => is_fr_controlled(area))
		L.french_vp = L.areas_occupied.length * 2
	},
	inactive: "propose a peace deal",
	prompt() {
		if (L.step === -1) {
			prompt_card(C_PEACE_OFFER, "France +1 VP.")
			action_vp_marker()
		} else if (L.step === 0) {
			prompt_card(C_PEACE_OFFER, "Shift Initiative 2 in favor of Russia.")
			action_initiative_marker()
		} else {
			prompt_card(C_PEACE_OFFER, `France +${L.french_vp} VP.`)
			button_next()
		}
	},
	vp() {
		push_undo()
		increase_vp(FRANCE)
		++L.step
	},
	initiative() {
		push_undo()
		shift_initiative(RUSSIA, 2)
		++L.step
	},
	next() {
		push_undo()
		increase_vp(FRANCE, L.french_vp)
		for (let area of L.areas_occupied) {
			logi("+2 " + get_area_name(area))
		}
		end()
	}

}

// FR #16 Infantry Squares
E.infantry_squares_fr = function() { return (count_num_infantry(FRANCE, G.current_battle) + count_num_guard(FRANCE, G.current_battle)) >= 2 }

P.infantry_squares_fr = {
	prompt() {
		prompt_card(C_INFANTRY_SQUARES_FR, "Russian Cavalry SPs fight at X0, and the first Russian loss in this battle must be a Cavalry SP, if possible.")
		button_confirm()
	},
	confirm() {
		push_undo()
		log("Russian Cavalry SPs fight at X0.")
		log("The first Russian loss this battle must be a Cavalry SP, if possible.")
		end()
	}
}

// FR #17: Davout Takes Command
P.davout_takes_command = {
	inactive: "appoint Davout as commander",
	prompt() {
		prompt_card(C_DAVOUT_TAKES_COMMAND, "Place Davout and 1 Infantry SP at any French-occupied area.")
		for (let area = FIRST_AREA; area <= LAST_AREA; ++area) 
			if (is_fr_controlled(area)) action_area(area)
	},
	area(area) {
		push_undo()
		log("Placed at S" + area)
		move_leader(L_DAVOUT, area)
		logi(`L${L_DAVOUT}`)
		add_troop(FRANCE, area, FRESH_INFANTRY, 1)
		logi(1 + " " + get_troop_type_name(FRESH_INFANTRY))
		end()
	}
}

// FR #19: IX Corps Arrives
E.ix_corps_arrives = function() { return get_current_month() >= AUG }

P.ix_corps_arrives = {
	inactive: "bring on the IX Corps",
	prompt() {
		prompt_card(C_IX_CORPS_ARRIVES, "Place 4 French Infantry SP at one French-controlled key city or off-map area.")
		for (let area = FIRST_AREA; area <= LAST_AREA; ++area)
			if (is_fr_controlled(area) && ((get_area_type(area) === "off_map") || get_area_type(area) === "key_city"))
				action_area(area)
	},
	area(area) {
		push_undo()
		log("Placed at S" + area)
		add_troop(FRANCE, area, FRESH_INFANTRY, 4)
		logi("4 " + get_troop_type_name(FRESH_INFANTRY))
		end()
	}
}

// FR #20: XI Corps Arrives
E.xi_corps_arrives = function() { return get_current_month() >= SEPT }

P.xi_corps_arrives = {
	inactive: "bring on the XI Corps",
	prompt() {
		prompt_card(C_XI_CORPS_ARRIVES, "Place 5 French Infantry SP at one French-controlled key city or off-map area.")
		for (let area = FIRST_AREA; area <= LAST_AREA; ++area)
			if (is_fr_controlled(area) && ((get_area_type(area) === "off_map") || get_area_type(area) === "key_city"))
				action_area(area)
	},
	area(area) {
		push_undo()
		log("Placed at S" + area)
		add_troop(FRANCE, area, FRESH_INFANTRY, 5)
		logi("5 " + get_troop_type_name(FRESH_INFANTRY))
		end()
	}
}

function get_areas_with_french_orders() {
	return [...new Set(G.orders.slice(get_first_order(FRANCE), get_last_order(FRANCE) + 1).filter(order => (order !== POOL) && (order !== OUT_OF_PLAY)))]
}

// FR #21: Confusing Orders
E.confusing_orders = function() { return is_leader_in_battle(L_KUTUZOV, G.current_battle) }

// FR #22: Poor Communications
//RULES MODIFICATION: Now the player selects a space and a random order is removed from it (as opposed to selecting an order).
//This is to prevent information leak about the identity of the order.
P.poor_communications = {
	_begin() {
		L.selected_area = -1
		card_box_begin(C_POOR_COMMUNICATIONS)
	},
	inactive: "execute C76",
	prompt() {
		if (L.selected_area > 0) {
			prompt_card(C_POOR_COMMUNICATIONS, `A random French order was removed from S${L.selected_area}.`)
			button_next()
		} else {
			prompt_card(C_POOR_COMMUNICATIONS, `Choose a space to remove a random placed French order. (CANNOT BE UNDONE)`)
			for (let area of get_areas_with_french_orders()) {
				action_area(area)
			}
		}
	},
	area(area) {
		clear_undo()
		L.selected_area = area
		let orders_at_area = get_orders_at_area(FRANCE, area)
		let order_to_remove = random(orders_at_area.length)
		remove_order(orders_at_area[order_to_remove])
		log(`Removed from S${area}`)
		log_only(RUSSIA, `>1 random order`)
		log_only(FRANCE, `>1 ${get_order_name(orders_at_area[order_to_remove])}`)
	},
	next() {
		card_box_end()
		end()
	}
}

// FR #23: Poor Coordination
E.poor_coordination_fr = function() { return count_num_connections_used_to_enter_battle(RUSSIA, G.current_battle) > 1 }

function count_num_connections_used_to_enter_battle(who, battle) {
	return is_battle_attacker(who, battle) ? count_num_attacker_connections(battle) : count_num_defender_connections(battle)
}

P.poor_coordination_fr = {
	begin() { L.num_connections_used = count_num_connections_used_to_enter_battle(RUSSIA, G.current_battle) },
	prompt() {
		prompt_card(C_POOR_COORDINATION_FR, `Reduce the Russian combat value by ${2 * L.num_connections_used} for ${L.num_connections_used} connections used to enter battle.`)
		button_confirm()
	},
	confirm() {
		push_undo()
		log(`Reduce the Russian combat value by ${2 * L.num_connections_used} for ${L.num_connections_used} connections used to enter battle.`)
		end()
	}
}

// FR #25: Good Leadership
P.may_play_good_leadership = {
	inactive: "play C79",
	prompt() {
		if (hand_has(FRANCE, C_GOOD_LEADERSHIP)) {
			prompt(`You may play ${get_card_log_alias(C_GOOD_LEADERSHIP)}.`)
			action_card(C_GOOD_LEADERSHIP)
			button_pass()
		} else {
			prompt(`You do not have ${get_card_log_alias(C_GOOD_LEADERSHIP)}.`)
			button_pass()
		}
	},
	card(card) {
		push_undo()
		goto("good_leadership")
	},
	pass() {
		push_undo()
		end()
	}
}

function could_switch_order(who) {
	for (let order = FIRST_ORDER; order <= LAST_ORDER; ++order) {
		if ((get_order_type(order) !== DUMMY_ORDER) && (get_order_location(order) !== POOL) && (get_order_location(order) !== OUT_OF_PLAY) && (has_friendly_troop(FRANCE, get_order_location(order))))
			return true
	}
	return false
}

P.good_leadership = {
	_begin() {
		card_box_begin(C_GOOD_LEADERSHIP)

		L.step = -1
		L.choice = null
		L.selected_order = -1
		L.switch_area = -1
		L.selected_leader = -1
	},
	inactive: "exploit unforeseen oppurtunities",
	prompt() {
		if (L.step === -1) {
			prompt_card(C_GOOD_LEADERSHIP, "Choose whether to place or change an order.")
			button("place_order")
			button("change_order")
		} else if (L.step === 0) {
			if (L.choice === "place") {
				prompt_card(C_GOOD_LEADERSHIP, "Select an order to place.")
				for (let order of get_orders_at_area(FRANCE, POOL)) {
					if (get_order_type(order) !== DUMMY_ORDER)
						action_order(order)
				}
			} else {
				prompt_card(C_GOOD_LEADERSHIP, "Select an order to change.")
				for (let order = FIRST_ORDER; order <= LAST_ORDER; ++order) {
					if ((get_order_type(order) !== DUMMY_ORDER) && (get_order_location(order) !== POOL) && (get_order_location(order) !== OUT_OF_PLAY) && (has_friendly_troop(FRANCE, get_order_location(order))))
						action_order(order)
				}
			}
		} else if (L.step === 1) {
			if (L.choice === "place") {
				prompt_card(C_GOOD_LEADERSHIP, `Select a French-occupied area to place ${get_order_name(L.selected_order)}.`)
				for (let area = FIRST_AREA; area <= LAST_AREA; ++area) {
					if (has_friendly_troop(FRANCE, area)) action_area(area)
				}
			} else {
				prompt_card(C_GOOD_LEADERSHIP, `Select an order to place at S${L.switch_area}.`)
				for (let order of get_orders_at_area(FRANCE, POOL)) {
					if (get_order_type(order) !== DUMMY_ORDER)
						action_order(order)
				}
			}
		} else if (L.step === 2) {
			prompt_card(C_GOOD_LEADERSHIP, "You may immediately move a leader from any area to any other area.")
			for (let leader = get_first_leader(FRANCE); leader <= get_last_leader(FRANCE); ++leader) {
				if (is_leader_on_map(leader)) action_leader(leader)
			}
			button_pass()
		} else if (L.step === 3) {
			prompt_card(C_GOOD_LEADERSHIP, `Select a destination for L${L.selected_leader}.`)
			for (let area = FIRST_AREA; area <= LAST_AREA; ++area) {
				if (has_friendly_troop(FRANCE, area)) action_area(area)
			}
		} else {
			prompt_card(C_GOOD_LEADERSHIP, "All done.")
			button_done()
		}
	},
	place_order() {
		push_undo()
		L.choice = "place"
		++L.step
	},
	change_order() {
		push_undo()
		L.choice = "change"
		++L.step
	},
	order(order) {
		push_undo()
		if (L.step === 0) {
			if (L.choice === "place") {
				L.selected_order = order
			} else {
				L.switch_area = get_order_location(order)

				log_only(FRANCE, "Changed")
				log_only(FRANCE, `>S${get_order_location(order)}`)
				log_only(FRANCE, "<" + get_order_name(order))
				log_only(RUSSIA, `Changed an order at S${get_order_location(order)}.`)

				remove_order(order)
			}
		} else {
			place_order(order, L.switch_area)
			log_only(FRANCE, `<to ${ get_order_name(order)}`)
		}
		++L.step
	},
	area(area) {
		push_undo()
		if (L.step === 1) {
			log_only(FRANCE, "Placed")
			log_only(FRANCE, `>S${area}`)
			log_only(FRANCE, "<" + get_order_name(L.selected_order))
			log_only(RUSSIA, `Placed an order at S${area}.`)
			place_order(L.selected_order, area)
		} else {
			log("Moved")
			logi(`L${L.selected_leader}`)
			log("<S" + area)
			move_leader(L.selected_leader, area)
		}
		++L.step
	},
	leader(leader) {
		push_undo()
		L.selected_leader = leader
		++L.step
	},
	pass() {
		push_undo()
		L.step += 2
	},
	done() {
		card_box_end()
		discard_or_remove_card(C_GOOD_LEADERSHIP)
		end()
	}
}

// FR #26: Combined Arms
E.combined_arms = function() { return has_leader_in_battle(FRANCE, G.current_battle) }

P.combined_arms = {
	_begin() { L.step = -1 },
	prompt() {
		if (L.step === -1)
			prompt_card(C_COMBINED_ARMS, "The combat value of up to 1 Cavalry and 3 Infantry SPs is doubled.")
		else 
			prompt_card(C_COMBINED_ARMS, `Cancels the effect of ${get_card_log_alias(C_INFANTRY_SQUARES_RU)}.`)
		button_confirm()
	},
	confirm() {
		push_undo()

		if (L.step === -1)
			log("The combat value of up to 1 Cavalry and 3 Infantry SPs is doubled.")
		else
			log(`Cancels ${get_card_log_alias(C_INFANTRY_SQUARES_RU)}.`)

		if (L.step > -1 || !is_battle_event_active(G.current_battle, C_INFANTRY_SQUARES_RU)) 
			end()
		else
			++L.step
	}
}

// FR #27: Confusions & Delays
E.confusions_and_delays = function() { return is_battle_defender(FRANCE, G.current_battle) }

P.confusions_and_delays = {
	prompt() {
		prompt_card(C_CONFUSIONS_AND_DELAYS, "French losses -2, and Russian losses -1. The French must retreat after this battle which is considered to be tied.")
		button_confirm()
	},
	confirm() {
		push_undo()
		log("France losses -2.")
		log("Russia losses -1.")
		log("France must retreat after this battle, which is considered tied.")
		end()
	}
}

// FR #28: Saint–Cyr's VI Corps
E.saint_cyrs_vi_corps = function() { return is_battle_defender(FRANCE, G.current_battle) }

P.saint_cyrs_vi_corps = {
	_begin() { L.has_placed_defend = false },
	prompt() {
		if (!L.has_placed_defend) {
			if (has_order_of_type(FRANCE, DEFEND, POOL)) {
				prompt_card(C_SAINT_CYRS_VI_CORPS, `Place a Defend order at S${G.current_battle}.`)
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
		log(`Placed 'Defend' order at S${G.current_battle}.`)
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

P.ebles_pontoneers = {
	prompt() {
		prompt_card(C_EBLES_PONTONEERS, "No penalties for attacking across a river.")
		button_confirm()
	},
	confirm() {
		push_undo()
		log("No penalties for attacking across a river.")
		end()
	}
}

// FR #31: The Imperial Guard
E.the_imperial_guard = function() { return is_leader_in_battle(L_NAPOLEON, G.current_battle) }

P.the_imperial_guard = {
	_begin() { L.step = -1 },
	prompt() {
		if (L.step === -1)
			prompt_card(C_THE_IMPERIAL_GUARD, `All Imperial Guard SPs fight at X3 instead of X1.5.`)
		else
			prompt_card(C_THE_IMPERIAL_GUARD, `If Russia wins the battle, France must discard a random card, and Russia gains +2 VP.`)
		button_confirm()
	},
	confirm() {
		push_undo()
		if (L.step === -1) {
			log(`All Guard SPs fight at X3.`)
			++L.step
		} else {
			log("If Russia wins, France must discard a random card, and lose 2 VP.")
			end()
		}
		if (L.step === -1) ++L.step
		else end()
	}
}

// FR #32: Delayed Forces

E.delayed_forces_fr = function() {
	return (is_battle_attacker(RUSSIA, G.current_battle) && did_attacker_attack_across_multiple_connections(G.current_battle)) ||
		(is_battle_defender(RUSSIA, G.current_battle) && (count_num_defender_connections(G.current_battle) > 1))
}

// FR #33: Napoléon's Marshals
E.napoleons_marshals = function() { return has_leader_in_battle(FRANCE, G.current_battle) }

P.napoleons_marshals = {
	_begin() { L.step = -1 },
	prompt() {
		if (L.step === -1)
			prompt_card(C_NAPOLEONS_MARSHALS, `You may rally 1 exhausted SP before determining losses.`)
		else
			prompt_card(C_NAPOLEONS_MARSHALS, `Draw a card to your hand if you win the battle.`)
		button_confirm()
	},
	confirm() {
		push_undo()
		if (L.step === -1) {
			log("France rallies 1 exhausted SP before determining losses.")
			++L.step
		} else {
			log("France draws a card if it wins the battle.")
			end()
		}
	}
}

// FR #34: Fierce Fighting
E.fierce_fighting_fr = function() { return has_leader_in_battle(FRANCE, G.current_battle) }

P.fierce_fighting_fr = {
	_begin() { L.step = -1 },
	prompt() {
		if (L.step === -1)
			prompt_card(C_FIERCE_FIGHTING_FR, "Increase French losses by 1 and Russian losses by 2.")
		else
			prompt_card(C_FIERCE_FIGHTING_FR, "Russia must eliminate a leader if one is present.")
		button_confirm()
	},
	confirm() {
		push_undo()
		if (L.step === -1) {
			log("France losses +1.")
			log("Russia losses +2.")
			++L.step
		} else {
			log("Russia must eliminate a leader if one is present.")
			end()
		}
	}
}

// FR #35: Ney's III Corps
E.neys_iii_corps = function() { return has_leader_in_battle(FRANCE, G.current_battle) }

P.neys_iii_corps = {
	_begin() { L.step = -1 },
	prompt() {
		if (L.step === -1)
			prompt_card(C_NEYS_III_CORPS, "Up to 3 French Infantry SPs fight at X2.")
		else 
			prompt_card(C_NEYS_III_CORPS, "Rally 1 exhausted French SP after the battle.")
		button_confirm()
	},
	confirm() {
		push_undo()
		if (L.step === -1) {
			log("Up to 3 French Infantry SPs fight at X2.")
			++L.step
		} else {
			log("1 exhausted French SP is rallied after battle.")
			end()
		}
	}
}

// FR #36: Eugène's IV Corps
E.eugenes_iv_corps = function() { return is_leader_in_battle(L_DE_BEAUHARNAIS, G.current_battle) }

P.eugenes_iv_corps = {
	prompt() {
		prompt_card(C_EUGENES_IV_CORPS, "Up to 3 French Infantry SPs fight at X2.")
		button_confirm()
	},
	confirm() {
		push_undo()
		log("Up to 3 French Infantry SPs fight at X2.")
		end()
	}
}

function is_exhausted_infantry(type) {
	return is_infantry(type) && is_troop_type_exhausted(type)
}

function count_num_exhausted_infantry(who, area) {
	let count = 0
	for (let entry of get_area_troop_set(area, null)) {
		if ((decode_troop_entry_who(entry) === who) && is_exhausted_infantry(decode_troop_entry_type(entry)))
			count += decode_troop_entry_num(entry)
	}
	return count
}

// FR #37: Poniatowski's V Corps
P.may_play_poniatowskis_v_corps = {
	inactive: "play C91",
	prompt() {
		if (hand_has(FRANCE, C_PONIATOWSKIS_V_CORPS)) {
			prompt(`You may play ${get_card_log_alias(C_PONIATOWSKIS_V_CORPS)}.`)
			action_card(C_PONIATOWSKIS_V_CORPS)
			button_pass()
		} else {
			prompt(`You do not have ${get_card_log_alias(C_PONIATOWSKIS_V_CORPS)}.`)
			button_pass()
		}
	},
	card(card) {
		push_undo()
		goto("poniatowskis_v_corps")
	},
	pass() {
		push_undo()
		goto("move")
	}
}


P.poniatowskis_v_corps = {
	_begin() {
		//G.move
		L.has_exhausted_infantry_sp = [EXHAUSTED_INFANTRY, EXHAUSTED_PRUSSIAN_INFANTRY, EXHAUSTED_AUSTRIAN_INFANTRY].some(type => G.move.sps[type] > 0)
		L.count = 0
		for (let type of [EXHAUSTED_INFANTRY, EXHAUSTED_PRUSSIAN_INFANTRY, EXHAUSTED_AUSTRIAN_INFANTRY])
			L.count += G.move.sps[type]
		L.has_rallied = false
		card_box_begin(C_PONIATOWSKIS_V_CORPS)
	},
	prompt() {
		if (!L.has_exhausted_infantry_sp) {
			prompt_card(C_PONIATOWSKIS_V_CORPS, "No exhausted infantry in the moving force to rally.")
			button_pass()
		} else if (L.count === 0) {
			prompt_card(C_PONIATOWSKIS_V_CORPS, "All done.")
			button_done()
		} else {
			prompt_card(C_PONIATOWSKIS_V_CORPS, `Rally exhausted infantry SPs in the moving force (${L.count} remaining).`)
			for (let type of [EXHAUSTED_INFANTRY, EXHAUSTED_PRUSSIAN_INFANTRY, EXHAUSTED_AUSTRIAN_INFANTRY])
				if (G.move.sps[type] > 0)
					action("troop", type)
		}
	},
	troop(type) {
		push_undo()
		rally_troop(G.active, G.move.path[G.move.path.length - 1], type)
		--G.move.sps[type]
		++G.move.sps[type - 1]
		log("Rallied")
		logi(`S${G.move.path[G.move.path.length -1]}`)
		log("<1 Exh. Infantry")
		--L.count
	},
	pass() {
		push_undo()
		log("No exhausted SPs to rally.")
		card_box_end()
		discard_or_remove_card(C_PONIATOWSKIS_V_CORPS)
		goto("move")
	},
	done() {
		push_undo()
		card_box_end()
		discard_or_remove_card(C_PONIATOWSKIS_V_CORPS)
		goto("move")
	}
}

// FR #38: Inferior Gunpowder
E.inferior_gunpowder = function() { return is_battle_defender(FRANCE, G.current_battle) }

P.inferior_gunpowder = {
	prompt() {
		prompt_card(C_INFERIOR_GUNPOWDER, "Up to 8 Russian Infantry SPs fight at X0,5.")
		button_confirm()
	},
	confirm() {
		push_undo()
		log("Up to 8 Russian Infantry SPs fight at X0,5.")
		end()
	}
}

// FR #47: Inferior Musketry
E.inferior_musketry = function() { return is_battle_defender(FRANCE, G.current_battle) }

P.inferior_musketry = {
	prompt() {
		prompt_card(C_INFERIOR_MUSKETRY, "French losses are reduced by 1.")
		button_confirm()
	},
	confirm() {
		push_undo()
		log("French losses -1.")
		end()
	}	
}

// FR #48 Tough Rearguard
P.may_play_tough_rearguard = {
	prompt() {
		prompt(`You may play ${get_card_log_alias(C_TOUGH_REARGUARD)}.`)
		action_card(C_TOUGH_REARGUARD)
		button_pass()
	},
	card(card) {
		push_undo()
		goto("event", { card })
	},
	pass() {
		push_undo()
		end()
	}
}

P.tough_rearguard = {
	_begin() { L.step = -1 },
	prompt() {
		if (L.step === -1) {
			prompt_card(C_TOUGH_REARGUARD, `Forces using this Evade order suffer no exhaustion.`)
			button_confirm()
		} else {
			prompt_card(C_TOUGH_REARGUARD, `Inflict one exhaustion on Russia when evading.`)
			button_confirm()
		}
	},
	confirm() {
		push_undo()
		if (L.step === -1) {
			++L.step
			log(`Forces using this Evade order suffer no exhaustion.`)
		} else {
			log(`1 exhaustion is inflicted on Russia.`)
			add_persistent_event(C_TOUGH_REARGUARD)
			end()
		}
	}
}

P.apply_tough_rearguard = {
	_begin() { L.has_exhausted_sp = false },
	prompt() {
		if (!L.has_exhausted_sp) {
			if (has_fresh_sp(G.active, L.area)) {
				prompt_card(C_TOUGH_REARGUARD, `Exhaust an SP at S${L.area}.`)
				get_all_fresh_sp_types(G.active, L.area).forEach(action_troop)
			} else {
				prompt_card(C_TOUGH_REARGUARD, `No fresh SPs to exhaust.`)
				button_confirm()
			}
		} else {
			prompt_card(C_TOUGH_REARGUARD, `All done.`)
			button_done()
		}
	},
	troop(type) {
		push_undo()
		exhaust_troop(G.active, L.area, type)
		logi("Exhausted")
		log_only(RUSSIA, `<1 Russian ${get_troop_type_name(type)}`)
		log_only(FRANCE, `<1 Russian SP`)
		L.has_exhausted_sp = true
	},
	confirm() {
		push_undo()
		L.has_exhausted_sp = true
	},
	done() {
		push_undo()
		map_delete(G.persistent_events, C_TOUGH_REARGUARD)
		end()
	}
}

// FR #50: Courage of Desperation
E.courage_of_desperation = function() { return get_who_has_initiative() === RUSSIA }

P.courage_of_desperation = {
	_begin() { L.step = -1 },
	prompt() {
		if (L.step === -1) {
			if (has_exhausted_sp(G.active, G.current_battle)) {
				prompt_card(C_COURAGE_OF_DESPERATION, "Immediately Rally 1 Exhausted SP.")
				for (let type of get_all_exhausted_sp_types(G.active, G.current_battle)) action("troop", type)
			} else {
				prompt_card(C_COURAGE_OF_DESPERATION, "No exhausted SPs to Rally.")
				button_next()
			}
		} else {
			prompt_card(C_COURAGE_OF_DESPERATION, "Up to 4 exhausted French SPs fight at X1 instead of X0.")
			button_confirm()
		}
	},
	troop(type) {
		push_undo()
		battle_rally_troop(G.active, G.current_battle, type)
		log("Rallied")
		log_only(FRANCE, `1 ${get_troop_type_name(type)}`)
		log_only(RUSSIA, `1 Exh. French SP`)
		++L.step
	},
	next() {
		push_undo()
		log("No exhausted SPs to rally.")
		++L.step
	},
	confirm() {
		push_undo()
		log("Up to 4 exhausted French SPs fight at X1.")
		end()
	}
}

// FR #51: The Old Guard
E.the_old_guard = function() { return count_num_guard(FRANCE, G.current_battle) > 0 }

P.the_old_guard = {
	_begin() { L.step = -1 },
	prompt() {
		if (L.step === -1) {
			prompt_card(C_THE_OLD_GUARD, "Imperial Guard SPs fight at X2 instead of X1.5.")
			button_next()
		} else if (L.step === 0) {
			prompt_card(C_THE_OLD_GUARD, "French losses are reduced by 1.")
			if (is_battle_event_active(G.current_battle, C_OUTFLANKING_RU)) 
				button_next()
			else
				button_confirm()
		} else {
			prompt_card(C_THE_OLD_GUARD, `Cancels the effect of ${get_card_log_alias(C_OUTFLANKING_RU)} this battle.`)
			button_confirm()
		}
	},
	next() {
		push_undo()
		if (L.step === -1) log("Guard SPs fight at X2.")
		else log("French losses -1.")
		++L.step
	},
	confirm() {
		push_undo()
		if (L.step === 0) log("French losses -1.")
		else log(`Cancels ${get_card_log_alias(C_OUTFLANKING_RU)}.`)
		end()
	}
}

// FR #53: Lethargic Pursuit
P.lethargic_pursuit = {
	_begin() {
		L.selected_area = -1
	},
	inactive: "exploit Kutuzov's lethargy",
	prompt() {
		if (L.selected_area > -1) {
			prompt_card(C_LETHARGIC_PURSUIT, `You selected S${L.selected_area}.`)
			button_confirm()
		} else {
			prompt_card(C_LETHARGIC_PURSUIT, `Designate an area. This turn, Russian forces there move, they may not enter areas containing a French leader.`)
			for (let area = FIRST_AREA; area <= LAST_AREA; ++area)
				if (has_russian_sp(area)) action_area(area)
		}
	},
	area(area) {
		push_undo()
		L.selected_area = area
	},
	confirm() {
		push_undo()
		add_persistent_event(C_LETHARGIC_PURSUIT, { area: L.selected_area })
		end()
	}
}

//=== MISC HELPERS ===
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

function map_decrement(map, key, amount = 1) {
	let current = map_get(map, key, null)
	if (current !== null)
		map_set(map, key, current - amount)
}

// Like Object.keys but for plain array maps
function map_keys(map) {
	let keys = []
	for (let i = 0; i < map.length; i += 2)
		keys.push(map[i])
	return keys
}

function roll_d6() {
	return random(6) + 1
}

// DEBUG: For quickly printing deeply nested objects (G.moved, G.battles)
function print(msg) {
	console.log(JSON.stringify(msg, null, 2))
}

//=== PROMPT HELPERS ===
function prompt_leader(leader, text) {
	prompt(`L${leader}: ${text}`)
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

//=== ACTION/BUTTON WRAPPER FUNCTIONS ===
function button_draw(enabled = true) 	{ button("draw", enabled) }
function button_discard(enabled = true) { button("discard", enabled) }
function button_pass(enabled = true) 	{ button("pass", enabled) }
function button_next(enabled = true) 	{ button("next", enabled) }
function button_done(enabled = true) 	{ button("done", enabled) }
function button_confirm(enabled = true) { button("confirm", enabled) }
function button_undo(enabled = true) 	{ button("undo", enabled) }
function button_roll(enabled = true) 	{ button("roll", enabled) }
function action_card(c) 				{ action("card", c) }
function action_area(area) 				{ action("area", area) }
function action_initiative_marker() 	{ action("initiative", 0) }
function action_leader(leader) 			{ action("leader", leader) }
function action_vp_marker()				{ action("vp", 0) }
function action_order(order) 			{ action("order", order) }
function action_depot(depot) 			{ action("depot", depot) }
function action_connection(from, to) 	{ action("connection", find_connection(from, to)) }
function action_troop(type) 			{ action("troop", type) }
function button_leader(leader) 			{ action("leader_button", leader) }

//=== LOGGING ===
function get_abbreviation(who) {
	return (who === RUSSIA) ? "ru" : ((who === FRANCE) ? "fr" : "na")
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
}

function log_h4(text, who = BOTH) {
	log()
	log(`$${get_abbreviation(who)}${text}`)
}

function log_h5(text) {
	log("%" + text)
}

function logi(text) {
	log(">" + text)
}

function log_italic(text) {
	log("&" + text)
}

function get_card_log_alias(card, who = get_card_owner(card)) {
	return `C${who === NONE ? "N" : ROLES[who][0]}${card}`
}

function log_card(card, who = get_card_owner(card)) {
	log(get_card_log_alias(card, who))
}

function card_box_begin(card) {
	log_box_begin(get_card_log_alias(card, NONE), get_card_owner(card))
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

function log_roll(roll) { //Uses fallback white die defined in world.js
	log(`W${roll}`)
}

//=== COMMON FRAMEWORK - DO NOT EDIT ===
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
				if (Array.isArray(G.active))
					V.prompt = `Waiting for ${G.active.join(" and ")} to ${inactive}.`
				else
					V.prompt = `Waiting for ${G.active} to ${inactive}.`
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

// WARNING: Added a null fallback for missing
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