"use strict"

const data = require("./data")

const RUSSIA = 0
const FRANCE = 1
const ROLES = ["Russia", "France"]

var G, L, V, R, P = {}

//=== CONSTANTS ===
/* ALLIED NATIONS */
const PRUSSIA = 2
const AUSTRIA = 3

/* CARDS */
const cards = data.cards

const first_russia_card = 0
const last_russia_card = 53
const first_france_card = 54
const last_fr_card = 107

const DUMMY_RU = 0
const WELL_DISCIPLINED_RETREAT = 1
const CONFUSED_RETREAT = 2
const OPOLCHENIE = 3
const EVASIVE_MANEUVERS = 4
const IDLE_RESERVES = 5
const BAGRATIONS_RETREAT = 6
const INDECISION = 7
const FIGHTING_WITHDRAWAL = 8
const UNINSPIRED_TACTICS = 9
const SCORCHED_EARTH = 10
const HOLY_MOTHER_RUSSIA_RU = 11
const OUTFLANKING_RU = 12
const GARRISON_TROOPS = 13
const EXTREME_WEATHER_RU = 14
const PRIDE_AND_HESITATION = 15
const KUTUZOV_APPOINTED = 16
const THE_FINLAND_CORPS = 17
const TREATY_OF_BUCHAREST = 18
const THE_CZAR_LEAVES_THE_ARMY = 19
const FLYING_COLUMNS = 20
const OVERSTRETCHED_LOGISTICS = 21
const CITY_ABLAZE = 22
const STUBBORN_REARGUARD_RU = 23
const NEW_POSTING = 24
const EXHAUSTING_MARCH_1 = 25
const EXHAUSTING_MARCH_2 = 26
const UNEXPECTED_RETREAT = 27
const POOR_COORDINATION_RU = 28
const CAVALRY_SCREENING = 29
const DEVASTATED_LANDSCAPE = 30
const STOIC_INFANTRY = 31
const THE_ARTILLERY_CORPS = 32
const FORTIFICATIONS = 33
const PLATOVS_COSSACKS = 34
const FICKLE_HABSBURGS = 35
const INFANTRY_SQUARES_RU = 36
const ENVELOPING_MOVES = 37
const KONSTANTINES_CORPS = 38
const CAVALRY_CHARGE_RU = 39
const DELAYED_FORCES_RU = 40
const FIERCE_FIGHTING_RU = 41
const COMMAND_FRICTION = 42
const EXHAUSTED_HORSES = 43
const DISEASE_AND_STARVATION = 44
const POOR_LOGISTICS = 45
const DEVASTATED_COUNTRYSIDE = 46
const TREACHEROUS_ALLIES = 47
const DISORDERLY_MARCH = 48
const COSSACK_PATROLS = 49
const CRUMBLING_COHESION = 50
const UNRELIABLE_GERMANS = 51
const BARCLAY_DE_TOLLY_RESIGNS = 52
const AGGRESSIVE_COSSACKS = 53

const DUMMY_FR = 54
const HARD_MARCHING_1 = 55
const HARD_MARCHING_2 = 56
const WAR_WEARINESS = 57
const HOLY_MOTHER_RUSSIA_FR = 58
const POLISH_SUPPORT = 59
const OUTFLANKING = 60
const UNSUCCESSFUL_DISENGAGEMENT = 61
const INFIGHTING_AND_INTRIGUE = 62
const FAST_MARCHING_1 = 63
const FAST_MARCHING_2 = 64
const GRAND_BATTERY = 65
const CAVALRY_CHARGE_FR = 66
const MURATS_CAVALRY = 67
const SKILLFULL_MANEUVERS = 68
const PEACE_OFFER = 69
const INFANTRY_SQUARES_FR = 70
const DAVOUT_TAKES_COMMAND = 71
const OUTFLANKING_FR = 72
const IX_CORPS_ARRIVES = 73
const XI_CORPS_ARRIVES = 74
const CONFUSING_ORDERS = 75
const POOR_COMMUNICATIONS = 76
const POOR_COORDINATION_FR = 77
const JEROME_GOES_HOME = 78
const GOOD_LEADERSHIP = 79
const COMBINED_ARMS = 80
const CONFUSIONS_AND_DELAYS = 81
const SAINT_CYRS_VI_CORPS = 82
const EBLES_PONTONEERS = 83
const STUBBORN_REARGUARD_FR = 84
const THE_IMPERIAL_GUARD = 85
const DELAYED_FORCES_FR = 86
const NAPOLEONS_MARSHALS = 87
const FIERCE_FIGHTING_FR = 88
const NEYS_III_CORPS = 89
const EUGENES_IV_CORPS = 90
const PONIATOWSKIS_V_CORPS = 91
const INFERIOR_GUNPOWDER = 92
const CHAOS_IN_THE_REAR_AREAS = 93
const VULNERABLE_SUPPLY_LINES = 94
const FREEZING_WEATHER = 95
const EXTREME_WEATHER_FR = 96
const LOGISTICS_COLLAPSE = 97
const CHAOTIC_FOOD_DISTRIBUTION = 98
const MUCH_NEEDED_VICTUALS = 99
const ENERGETIC_LEADERSHIP = 100
const INFERIOR_MUSKETRY = 101
const NAPOLEON_RETURNS_TO_PARIS = 102
const TOUGH_REARGUARD = 103
const COURAGE_OF_DESPERATION = 104
const THE_OLD_GUARD = 105
const NEYS_ESCAPE = 106
const LETHARGIC_PURSUIT = 107

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
const NUM_SPACES = 158

/* LEADERS */
const leaders = data.leaders
const NUM_LEADERS = 14

const first_russia_leader = 0
const last_russia_leader = 7
const first_france_leader = 8
const last_france_leader = 13

const ALEXANDER = 0
const KUTUZOV = 1
const DE_TOLLY = 2
const BAGRATION = 3
const TORMASOV = 4
const WITTGENSTEIN = 5
const CHICHAGOV = 6
const PLATOV = 7

const NAPOLEON = 8
const JEROME = 9
const DE_BEAUHARNAIS = 10
const DAVOUT = 11
const MURAT = 12
const SCHWARZENBERG = 13

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
const FRESH_PRUSSIAN_INFANTRY = 8
const EXHAUSTED_PRUSSIAN_INFANTRY = 9
const FRESH_AUSTRIAN_INFANTRY = 10
const EXHAUSTED_AUSTRIAN_INFANTRY = 11

/* DEPOTS */
const NUM_DEPOTS_RU = 14
const NUM_DEPOTS_FR = 7

//=== DATA ACCESSORS ===
/* NATIONS */
function get_nation_name(nation) {
	switch(nation) {
	case RUSSIA:
	case FRANCE:
		return ROLES[nation]
	case PRUSSIA:
		return "Prussia"
	case AUSTRIA:
		return "Austria"
	}
}

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
	return c === DUMMY_RU || c === DUMMY_FR
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
	return (who === RUSSIA) ? DUMMY_RU : DUMMY_FR
}

function count_non_dummy_cards_in_hand(who) {
	return G.hand[who].includes(get_dummy(who)) ? G.hand[who].length - 1 : G.hand[who].length
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

//is_fr_controlled, is_ru_controlled, 
function is_fr_controlled(a) {
	if (is_french_off_map_area(a)) return true
	return has_troop(a) && has_friendly_troop(FRANCE, a) && !has_friendly_troop(RUSSIA, a)
}

function is_ru_controlled(a) {
	return !is_fr_controlled(a)
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

function set_leader(who, where) { //TO REFACTOR
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

/* TROOPS */
/*
	The following functions use the current approach to storing troops: the most bulky part of the state.

	The tricky part about storing troops is that the game treats troops as currency, similar to Washington's War.
	Unlike Washington's War, however, there are multiple types of troops.

	G.troops is a plain array map, using the map functions from the framework.
	Each key in the 'map' corresponds to an area id, where there are troops. This is intentionally sparse to save storage area, areas with no troops will be culled.
	Each value in the 'map' is a 'set', using the set functions in the framework.

	Each set is a sorted plain array of bitpacked troop data.
	Each entry follows the following format:

	Player owner - 1 bit - Uses player mnemonics RUSSIA and FRANCE. Useful for activation and other situations when allies count as French.
	Type - 4 bits - Corresponds to the 8 + 4 type constants defined in the "Troops" section of constants
	Number of troops - 6 bits - Safe estimate since combining the starting French armies will go slightly over 31 fresh infantry.
	0 1111 000000
	| |||| ||||||

	The convenient side-effect of using a set is that entries get sorted by nation.

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

function get_area_troop_set(area, fallback) {
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

function count_num_sps(who, area) {
	let count = 0
	for (let entry of get_area_troop_set(area))
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
}

/* DEPOTS */
const first_russia_depot = 0
const last_russia_depot = 13
const first_france_depot = 14
const last_france_depot = 21

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
	log("Removed depot from S" + where + ".")
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

function get_areas_with_depots(who) {
	return [...new Set(get_depots(who).filter(area => !(area === POOL || area === OUT_OF_PLAY)))]
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

//=== STATE-MANIPULATING FUNCTIONS ===
/* CARDS */
function draw_card(who) {
	let drawn_card = get_deck(who).pop()
	get_hand(who).push(drawn_card)
	log(`${ROLES[who]} drew a card.`)
	return drawn_card
}

function discard_card(c) {
	let card_owner = get_card_owner(c)
	array_delete_item(get_hand(card_owner), c)
	set_add(get_discard(card_owner), c)
}

function remove_card(c) {
	let who = get_card_owner(c)
	array_delete_item(get_hand(who), c)
	set_add(get_removed(who), c)
}

function discard_or_remove_card(c) {
	is_permanent_removal_card(c) ? remove_card(c) : discard_card(c)
}

function return_dummy_to_hand(who) {
	array_insert(get_hand(who), 0, get_dummy(who))
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

//=== VIEW ===
function on_view() {
	V.active = G.active

	if (R !== RUSSIA) {
		V.log = V.log.filter(entry => !entry.startsWith("HR"))
	}
	
	if (R !== FRANCE) {
		V.log = V.log.filter(entry => !entry.startsWith("HF"))
	}

	V.log = V.log.map(entry => (entry.startsWith("HR") || entry.startsWith("HF")) ? entry.substring(2) : entry)

	V.depots = G.depots
	V.devastation = G.devastation
	V.current_discard = G.discard[R] ?? []
	V.french_logistic_preparations = G.french_logistic_preparations
	V.winter = G.winter
	V.hand_length = [G.hand[RUSSIA].length, G.hand[FRANCE].length]
	V.current_hand = G.hand[R] ?? []
	V.initiative = G.initiative
	V.last_turn = G.last_turn
	V.leaders = G.leaders
	V.removed = G.removed
	V.set_aside = G.set_aside
	V.troops = G.troops
	V.turn = G.turn
	V.vp = G.vp
	V.played_cards = G.played_cards ?? [[], []]
	V.orders = G.orders.slice(get_first_order(R), get_last_order(R) + 1) ?? []
	V.enemy_orders = G.orders.slice(get_first_order(enemy(R)), get_last_order(enemy(R)) + 1)?.filter(loc => loc !== POOL) ?? [] 
	V.selected_orders = (G.selected_orders) ? G.selected_orders[R] : []
	V.seniority = G.seniority
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

	log_h1(scenario)

	G.turn = SCENARIO_DATA.start
	G.last_turn = SCENARIO_DATA.end

	G.vp = SCENARIO_DATA.vp
	G.initiative = SCENARIO_DATA.initiative

	G.deck = SCENARIO_DATA.deck.map(cards => cards.slice())
	G.removed = SCENARIO_DATA.removed.map(cards => cards.slice())
	G.set_aside = SCENARIO_DATA.set_aside.map(cards => cards.slice())

	G.discard = [[], []]

	G.hand = [[DUMMY_RU, ...SCENARIO_DATA.cards_in_hand[RUSSIA]], [DUMMY_FR, ...SCENARIO_DATA.cards_in_hand[FRANCE]]]
	G.french_logistic_preparations = SCENARIO_DATA.french_logistic_preparations
	G.winter = SCENARIO_DATA.winter

	G.troops = []
	G.leaders = new Array(NUM_LEADERS).fill(POOL)
	G.depots = new Array(NUM_DEPOTS_RU + NUM_DEPOTS_FR).fill(POOL)
	G.devastation = new Array(NUM_SPACES).fill(0)

	G.played_cards = [[], []]
	G.persistent_events = []

	G.orders = [null, ...(new Array(NUM_ORDERS).fill(POOL))]
	G.enemy_orders = []
	G.selected_orders = [[], []]

	//To track who commands who (particularly in cases where both leaders have the same seniority)
	G.seniority = [	
		[ALEXANDER, KUTUZOV, DE_TOLLY, BAGRATION, TORMASOV, WITTGENSTEIN, CHICHAGOV, PLATOV], 
		[NAPOLEON, JEROME, DE_BEAUHARNAIS, DAVOUT, MURAT, SCHWARZENBERG]
	]

	G.already_moved = {
		leaders: [],
		troops: []
	}

	update_supply()

	switch(get_current_month()) {
	case JUNE: setup_june(); break
	case JULY: setup_july(); break
	case AUG: setup_aug(); break
	case OCT: setup_oct(); break
	}

	for (let who = RUSSIA; who <= FRANCE; ++who) {
		shuffle(G.deck[who])
	}

	//G.supply = [calculate_distance_to_nearest_depot(RU), calculate_distance_to_nearest_depot(FR)]

	G.active = [RUSSIA, FRANCE]
	call("setup_hand", {scenario, hand_size: SCENARIO_DATA.hand_size.slice()})

}

function update_supply(who) {
	if (who === undefined) G.supply = [calculate_distance_to_nearest_depot(RUSSIA), calculate_distance_to_nearest_depot(FRANCE)]
	else G.supply[who] = calculate_distance_to_nearest_depot(who)
}

function setup_june() {
	log_h1("June Setup")
	/* RUSSIA */
	set_troop(RUSSIA, S_RIGA, FRESH_INFANTRY, 2)
	set_troop(RUSSIA, S_DUNABURG, FRESH_INFANTRY, 1)
	add_depot(RUSSIA, S_DUNABURG)
	set_leader(WITTGENSTEIN, S_KALTINENAI)
	set_troop(RUSSIA, S_KALTINENAI, FRESH_INFANTRY, 3)
	set_troop(RUSSIA, S_VILKOMIR, FRESH_CAVALRY, 2)
	set_troop(RUSSIA, S_VILKOMIR, FRESH_INFANTRY, 2)
	set_leader(ALEXANDER, S_VILNA)
	set_leader(DE_TOLLY, S_VILNA)
	set_troop(RUSSIA, S_VILNA, FRESH_INFANTRY, 6)
	add_depot(RUSSIA, S_VILNA)
	set_troop(RUSSIA, S_SVENCIONYS, FRESH_INFANTRY, 3)
	set_troop(RUSSIA, S_MOLODECHNO, FRESH_CAVALRY, 1)
	set_troop(RUSSIA, S_MOLODECHNO, FRESH_INFANTRY, 1)
	add_depot(RUSSIA, S_MINSK)
	set_troop(RUSSIA, S_LIDA, FRESH_CAVALRY, 1)
	set_troop(RUSSIA, S_LIDA, FRESH_INFANTRY, 2)
	set_leader(PLATOV, S_GRODNO)
	set_troop(RUSSIA, S_GRODNO, FRESH_COSSACK, 2)
	set_troop(RUSSIA, S_BIALYSTOK, FRESH_CAVALRY, 1)
	set_leader(BAGRATION, S_VOLKOVYSK)
	set_troop(RUSSIA, S_VOLKOVYSK, FRESH_INFANTRY, 4)
	set_troop(RUSSIA, S_BREST, FRESH_INFANTRY, 1)
	add_depot(RUSSIA, S_BREST)
	set_troop(RUSSIA, S_KOVEL, FRESH_CAVALRY, 1)
	set_troop(RUSSIA, S_KOVEL, EXHAUSTED_CAVALRY, 1)
	set_leader(TORMASOV, S_LUTSK)
	set_troop(RUSSIA, S_LUTSK, FRESH_INFANTRY, 1)
	set_troop(RUSSIA, S_LUTSK, EXHAUSTED_INFANTRY, 1)
	add_depot(RUSSIA, S_LUTSK)
	set_troop(RUSSIA, S_ROVNO, FRESH_INFANTRY, 1)
	set_troop(RUSSIA, S_DUBNO, FRESH_INFANTRY, 1)

	set_troop(RUSSIA, S_TOROPETS, FRESH_INFANTRY, 2)
	set_troop(RUSSIA, S_POLOTSK, FRESH_INFANTRY, 1)
	set_troop(RUSSIA, S_VITEBSK, FRESH_INFANTRY, 1)
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
	set_leader(NAPOLEON, S_KALVARIJA)
	set_leader(MURAT, S_KALVARIJA)
	set_troop(FRANCE, S_KALVARIJA, FRESH_GUARD, 4)
	set_troop(FRANCE, S_KALVARIJA, FRESH_CAVALRY, 5)
	set_troop(FRANCE, S_KALVARIJA, FRESH_INFANTRY, 19)
	set_leader(DE_BEAUHARNAIS, S_SUWALKI)
	set_troop(FRANCE, S_SUWALKI, FRESH_CAVALRY, 1)
	set_troop(FRANCE, S_SUWALKI, FRESH_INFANTRY, 7)
	set_leader(JEROME, S_SZCZUCZY)
	set_troop(FRANCE, S_SZCZUCZY, FRESH_CAVALRY, 2)
	set_troop(FRANCE, S_SZCZUCZY, FRESH_INFANTRY, 6)
	set_troop(FRANCE, S_SUWALKI, FRESH_CAVALRY, 1)
	set_troop(FRANCE, S_GRAND_DUCHY_OF_WARSAW_NORTH, FRESH_INFANTRY, 2)
	set_leader(SCHWARZENBERG, S_GRAND_DUCHY_OF_WARSAW_SOUTH)
	set_troop(FRANCE, S_GRAND_DUCHY_OF_WARSAW_SOUTH, FRESH_AUSTRIAN_INFANTRY, 3)
	set_troop(FRANCE, S_AUSTRIA, FRESH_AUSTRIAN_INFANTRY, 1)

	set_devastation(S_KALVARIJA, 1)
	set_devastation(S_SUWALKI, 1)
	set_devastation(S_SZCZUCZY, 1)
}

function setup_july() {
	log_h1("July Setup")
	/* RUSSIA */
	set_troop(RUSSIA, S_RIGA, FRESH_INFANTRY, 2)
	set_troop(RUSSIA, S_DUNABURG, FRESH_INFANTRY, 1)
	add_depot(RUSSIA, S_DUNABURG)
	set_leader(WITTGENSTEIN, S_SEVEZH)
	set_troop(RUSSIA, S_SEVEZH, FRESH_INFANTRY, 2)
	set_troop(RUSSIA, S_SEVEZH, EXHAUSTED_INFANTRY, 1)
	set_leader(DE_TOLLY, S_VITEBSK)
	set_troop(RUSSIA, S_VITEBSK, FRESH_INFANTRY, 7)
	set_troop(RUSSIA, S_VITEBSK, FRESH_CAVALRY, 2)
	set_troop(RUSSIA, S_VITEBSK, EXHAUSTED_INFANTRY, 5)
	set_troop(RUSSIA, S_VITEBSK, EXHAUSTED_CAVALRY, 1)
	add_depot(RUSSIA, S_VITEBSK)
	set_leader(PLATOV, S_BABINOVICHI)
	set_troop(RUSSIA, S_BABINOVICHI, FRESH_COSSACK, 1)
	set_troop(RUSSIA, S_SMOLENSK, FRESH_INFANTRY, 2)
	add_depot(RUSSIA, S_SMOLENSK)
	set_troop(RUSSIA, S_DUKHOVSHCHINA, FRESH_INFANTRY, 2)
	set_troop(RUSSIA, S_RAGOSTOV, FRESH_INFANTRY, 1)
	set_troop(RUSSIA, S_RAGOSTOV, EXHAUSTED_INFANTRY, 1)
	set_leader(BAGRATION, S_UNNAMED_E4)
	set_troop(RUSSIA, S_UNNAMED_E4, FRESH_INFANTRY, 2)
	set_troop(RUSSIA, S_UNNAMED_E4, FRESH_CAVALRY, 1)
	set_troop(RUSSIA, S_UNNAMED_E4, EXHAUSTED_INFANTRY, 1)
	set_troop(RUSSIA, S_MSTISLAVL, FRESH_COSSACK, 1)

	set_leader(TORMASOV, S_BREST)
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
	set_leader(NAPOLEON, S_KAMEN)
	set_leader(MURAT, S_KAMEN)
	set_leader(DE_BEAUHARNAIS, S_KAMEN)
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
	set_leader(DAVOUT, S_MOGILEV)
	set_troop(FRANCE, S_MOGILEV, FRESH_INFANTRY, 2)
	set_troop(FRANCE, S_MOGILEV, EXHAUSTED_INFANTRY, 1)
	set_troop(FRANCE, S_KOKHANOVO, FRESH_INFANTRY, 3)
	set_troop(FRANCE, S_KOKHANOVO, EXHAUSTED_INFANTRY, 1)
	set_troop(FRANCE, S_ORSHA, FRESH_CAVALRY, 1)
	set_leader(SCHWARZENBERG, S_NESVICH)
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
	log_h1("August Setup")
	/* RUSSIA */
	set_troop(RUSSIA, S_RIGA, FRESH_INFANTRY, 1)
	set_troop(RUSSIA, S_MITAU, FRESH_INFANTRY, 1)
	set_leader(WITTGENSTEIN, S_SEVEZH)
	set_troop(RUSSIA, S_SEVEZH, FRESH_INFANTRY, 2)
	set_troop(RUSSIA, S_SEVEZH, EXHAUSTED_INFANTRY, 1)
	set_leader(DE_TOLLY, S_SMOLENSK)
	set_troop(RUSSIA, S_SMOLENSK, FRESH_INFANTRY, 8)
	set_troop(RUSSIA, S_SMOLENSK, FRESH_CAVALRY, 2)
	set_troop(RUSSIA, S_SMOLENSK, EXHAUSTED_INFANTRY, 5)
	set_troop(RUSSIA, S_SMOLENSK, EXHAUSTED_CAVALRY, 1)
	add_depot(RUSSIA, S_SMOLENSK)
	set_leader(BAGRATION, S_SVERSKOVO)
	set_troop(RUSSIA, S_SVERSKOVO, FRESH_INFANTRY, 3)
	set_troop(RUSSIA, S_SVERSKOVO, FRESH_CAVALRY, 1)
	set_troop(RUSSIA, S_SVERSKOVO, EXHAUSTED_INFANTRY, 2)
	set_troop(RUSSIA, S_ROSLAVL, FRESH_COSSACK, 1)
	set_leader(PLATOV, S_DUKHOVSHCHINA)
	set_troop(RUSSIA, S_DUKHOVSHCHINA, FRESH_COSSACK, 2)

	set_troop(RUSSIA, S_MOSCOW, FRESH_INFANTRY, 3)
	add_depot(RUSSIA, S_MOSCOW)
	add_depot(RUSSIA, S_VYAZMA)
	set_troop(RUSSIA, S_KALUGA, FRESH_INFANTRY, 3)
	add_depot(RUSSIA, S_KALUGA)
	set_troop(RUSSIA, S_OREL, FRESH_INFANTRY, 1)
	add_depot(RUSSIA, S_OREL)
	set_troop(RUSSIA, S_VORONEZH, FRESH_COSSACK, 2)

	set_leader(TORMASOV, S_KOBRYN)
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
	set_leader(NAPOLEON, S_VITEBSK)
	set_troop(FRANCE, S_VITEBSK, FRESH_GUARD, 3)
	set_troop(FRANCE, S_VITEBSK, FRESH_INFANTRY, 3)
	set_troop(FRANCE, S_VITEBSK, FRESH_CAVALRY, 1)
	set_troop(FRANCE, S_VITEBSK, EXHAUSTED_INFANTRY, 2)
	set_troop(FRANCE, S_VITEBSK, EXHAUSTED_GUARD, 1)
	set_leader(DE_BEAUHARNAIS, S_PORECZIE)
	set_troop(FRANCE, S_PORECZIE, FRESH_INFANTRY, 3)
	set_leader(MURAT, S_BABINOVICHI)
	set_leader(DAVOUT, S_BABINOVICHI)
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
	set_leader(SCHWARZENBERG, S_PRUZHANY)
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
	log_h1("October Setup")
	/* RUSSIA */
	set_troop(RUSSIA, S_RIGA, FRESH_INFANTRY, 2)
	set_troop(RUSSIA, S_DRISSA, FRESH_INFANTRY, 1)
	set_leader(WITTGENSTEIN, S_SEVEZH)
	set_troop(RUSSIA, S_SEVEZH, FRESH_INFANTRY, 3)
	set_troop(RUSSIA, S_SEVEZH, EXHAUSTED_INFANTRY, 1)
	set_troop(RUSSIA, S_OSTROV, FRESH_INFANTRY, 1)

	set_troop(RUSSIA, S_BRYANSK, FRESH_COSSACK, 1)
	set_leader(PLATOV, S_KOSELYSK)
	set_troop(RUSSIA, S_KOSELYSK, FRESH_COSSACK, 2)
	set_troop(RUSSIA, S_OREL, FRESH_INFANTRY, 1)
	add_depot(RUSSIA, S_OREL)
	set_troop(RUSSIA, S_MALOYAROSLAVET, FRESH_INFANTRY, 1)
	set_troop(RUSSIA, S_MALOYAROSLAVET, FRESH_CAVALRY, 2)
	set_troop(RUSSIA, S_MALOYAROSLAVET, FRESH_COSSACK, 1)
	set_troop(RUSSIA, S_MALOYAROSLAVET, EXHAUSTED_INFANTRY, 1)
	set_leader(KUTUZOV, S_KALUGA)
	set_leader(TORMASOV, S_KALUGA)
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
	set_leader(CHICHAGOV, S_PRUZHANY)
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

	set_leader(ALEXANDER, POOL)
	set_leader(DE_TOLLY, POOL)
	set_leader(BAGRATION, POOL)

	/* FRANCE */
	set_troop(FRANCE, S_PRUSSIA_SOUTH, FRESH_INFANTRY, 1)
	set_troop(FRANCE, S_MITAU, FRESH_PRUSSIAN_INFANTRY, 1)
	set_troop(FRANCE, S_KOVNO, FRESH_INFANTRY, 1)
	add_depot(FRANCE, S_KOVNO)
	set_leader(SCHWARZENBERG, S_BIALYSTOK)
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
	set_leader(MURAT, S_TARUTINO)
	set_troop(FRANCE, S_TARUTINO, FRESH_INFANTRY, 2)
	set_troop(FRANCE, S_TARUTINO, FRESH_CAVALRY, 1)
	set_troop(FRANCE, S_TARUTINO, EXHAUSTED_INFANTRY, 1)
	set_troop(FRANCE, S_TARUTINO, EXHAUSTED_CAVALRY, 1)
	set_leader(NAPOLEON, S_MOSCOW)
	set_leader(DAVOUT, S_MOSCOW)
	set_leader(DE_BEAUHARNAIS, S_MOSCOW)
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
P.setup_hand = { //TODO: clarification on whether discards are public, shuffle deck later
	_begin() {
		//L.scenario
		//L.hand_size
		log_h2("Setup Hand")
		L.has_drawn_cards = [false, false]
		L.discarded_cards = [[], []]
		L.has_passed = [false, false]
	},
	prompt() {
		let num_non_dummy_cards = [count_non_dummy_cards_in_hand(RUSSIA), count_non_dummy_cards_in_hand(FRANCE)]

		if (!L.has_drawn_cards[R]) {
			if (num_non_dummy_cards[R] > L.hand_size[R]) {
				prompt(`Discard cards (${num_non_dummy_cards[R] - L.hand_size[R]} remaining).`)
			} else if (num_non_dummy_cards[R] === L.hand_size[R]) {
				prompt(`You may discard more cards, or pass.`)
				button_pass()
			} else if (num_non_dummy_cards[R] > 0) {
				prompt(`You may discard more cards before drawing ${L.hand_size[R] - num_non_dummy_cards[R]} cards.`)
				button_draw()
			} else {
				prompt(`Draw ${L.hand_size[R]} cards.`)
				button_draw()
			}

			if (num_non_dummy_cards[R] > 0) {
				for (let c of get_hand(R)) {
					if (!is_card_dummy(c)) {
						action_card(c)
					}
				}
			}

			button_undo(L.discarded_cards[R].length > 0 || L.has_passed[R])
		}
		else {
			prompt(`Review drawn cards.`)
			button_done()
		}
	},
	card(c) {
		discard_card(c)
		L.discarded_cards[R].push(c)
	},
	pass() {
		L.has_drawn_cards[R] = true
	},
	draw() {
		while (count_non_dummy_cards_in_hand(R) < L.hand_size[R]) {
			let drawn_card = draw_card(R)
			if (is_must_play_event(drawn_card)) {
				log(`Discarded C${drawn_card} (must-play event).`)
				discard_card(drawn_card)
			}
		}
		L.has_drawn_cards[R] = true
	},
	undo() {
		if (L.discarded_cards[R].length > 0 ) {
			get_hand(R).push(L.discarded_cards[R].pop())
		} else {
			L.has_passed[R] = false
		}
	},
	done() {
		set_delete(G.active, R)

		if (G.active.length === 0) { //Scenario 5 special rule
			if (L.scenario === BATTLE_OF_SMOLENSK_CAMPAIGN_START) {
				if (set_has(get_discard(RUSSIA), HOLY_MOTHER_RUSSIA_RU)) {
					set_delete(get_discard(RUSSIA), HOLY_MOTHER_RUSSIA_RU)
				} else if (get_deck(RUSSIA).includes(HOLY_MOTHER_RUSSIA_RU)) {
					array_delete_item(get_deck(RUSSIA), HOLY_MOTHER_RUSSIA_RU)
				}
				get_deck(RUSSIA).push(HOLY_MOTHER_RUSSIA_RU)
				log(`C${HOLY_MOTHER_RUSSIA_RU} placed on top of the Russian deck.`)
			}
			call("begin_turn")
		}
	}
}

function test_card(c) {
	let who = get_card_owner(c)
	if (set_has(get_discard(who), c)) {
		set_delete(get_discard(who), c)
	} else if (get_deck(who).includes(c)) {
		array_delete_item(get_deck(who), c)
	}
	get_deck(who).push(c)
	log(`TEST: C${c} placed on top of the ${ROLES[who]} deck.`)
}

//=== BEGINNING OF TURN ===
P.begin_turn = function() {
	if (is_resource_turn(G.turn)) {
		call("resource_turn")
	} else {
		call("turn")
	}
}

P.turn = script(`
	eval { log_h1(get_month_name(G.turn) + " " + get_turn_name(G.turn))}

	call draw_card_to_hand
	call play_card_for_additional_orders
	call select_orders
	call place_orders
	call forced_march
	call cavalry_patrols
	call march
`)

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

	Without must-play events, it's fairly straightforward: each player draws a card, then reviews what card they drew.
	Most must play events are fairly simple to handle, since they are persistent events that just need to be confirmed now. These a dispatched to their corresponding 'E' object (see below).
	Three events need a lot more manual handling and are handled explicitly within this state: 'Holy Mother Russia', 'Chaos in the Rear Areas', and 'Vulnerable Supply Lines.'

*/

P.draw_card_to_hand = {
	_begin() {
		G.active = [RUSSIA, FRANCE]

		//The latest card drawn by each player
		L.drawn_card = [-1, -1]
		//The current 'state' each player is in (determines whether to show the general prompts/actions vs. event prompts/actions)
		L.state = ["draw_card", "draw_card"]
		//A list of persistent events accumulated through this state, updated to G.persistent_events at the end of the state
		L.persistent_events = []
		
		/*
			Generic map to track actions on the three manually handled events: 'Holy Mother Russia' (Russia), 'Chaos in the Rear Areas', and 'Vulnerable Supply Lines'
			Status summary:
			'Holy Mother Russia': -1 => nothing has happened yet, 0/RUSSIA => Russia has confimed drawing the card, waiting for France to choose, 1/FRANCE => France has chosen the space & needs to confirm
			'Vulnerable Supply Lines'
		*/
		L.event_execution_status = []
		map_set(L.event_execution_status, HOLY_MOTHER_RUSSIA_RU, -1)
		map_set(L.event_execution_status, CHAOS_IN_THE_REAR_AREAS, -1)
		map_set(L.event_execution_status, VULNERABLE_SUPPLY_LINES, -1)
		map_set(L.event_execution_status, CHAOTIC_FOOD_DISTRIBUTION, -1)

		//Event flags
		//To handle logging on leader events (kludge!)
		L.event_already_executed = [false, false]
		//The selected key for 'Holy Mother Russia'
		L.selected_key = -1
		//For 'Vulnerable Supply Lines'
		L.num_french_depots = count_num_french_depots_on_map()
		L.depots_to_remove = []
		//For 'Chaos in the Rear Areas'
		L.devastated_areas_with_french_troops = get_devastated_areas_with_french_troops()
		L.count = Math.min(L.devastated_areas_with_french_troops.length, 2)
		L.selected_area = -1

		log_h2("Draw Cards")
	},
	prompt() {
		//console.log(L.state)
		switch(L.state[R]) {
		case "draw_card":
			prompt("Draw a card to your hand.")
			button_draw()
			return
		case "review_drawn_card":
			prompt(`You drew C${L.drawn_card[R]}.`)
			button_confirm()
			return
		case "holy_mother_russia_ru_fr": //EXCEPTION: Extra step where France picks a key city (in addition to usual confirmation)
			if (map_get(L.event_execution_status, HOLY_MOTHER_RUSSIA_RU, null) === RUSSIA) {
				prompt_card(HOLY_MOTHER_RUSSIA_RU, "Designate a RU-controlled Key City.")
				for (let a = FIRST_AREA; a <= LAST_AREA; ++a) {
					if (is_key_city(a) && is_ru_controlled(a)) {
						action("area", a)
					}
				}
			} else {
				prompt_card(HOLY_MOTHER_RUSSIA_RU, `The side controlling S${L.selected_key} at the end of the turn gains +1 VP.`)
				button("confirm")
				button("undo")
			}
			return
		case `event_${CHAOS_IN_THE_REAR_AREAS}`: //WIP
			if (L.count > 0) {
				if (L.selected_area === -1) {
					prompt_card(CHAOS_IN_THE_REAR_AREAS, "Take 2 attrition losses from any areas with a Devastation Marker.")
					for (let area of L.devastated_areas_with_french_troops) {
						action("area", area)
					}
				} else {
					prompt(`Assign attrition losses in ${L.selected_area} (Will do when doing attrition code).`)
					button_done()
				}
			} else {
				prompt_card(CHAOS_IN_THE_REAR_AREAS, "All done.")
				button_confirm()
			}
			return
		case `event_${VULNERABLE_SUPPLY_LINES}`:
			if (L.num_french_depots >= 4) {
				if (map_get(L.event_execution_status, VULNERABLE_SUPPLY_LINES, null) === -1) {
					prompt_card(VULNERABLE_SUPPLY_LINES, "Discard a card from your hand.")
					button_discard()
				} else if (map_get(L.event_execution_status, VULNERABLE_SUPPLY_LINES, null) === 0) {
					prompt_card(VULNERABLE_SUPPLY_LINES, `You discarded C${L.discarded_card}.`)
					button_next()
				} else {
					if (L.depots_to_remove.length > 0) {
						prompt_card(VULNERABLE_SUPPLY_LINES, "Remove all unoccupied French Depot Markers.")
						for (let area of L.depots_to_remove) {
							action("area", area)
						}
					} else {
						prompt_card(VULNERABLE_SUPPLY_LINES, "All done.")
						button_confirm()
					}
				}
			} else {
				prompt_card(VULNERABLE_SUPPLY_LINES, "No effect.")
				button_confirm()
			}
			return
		case `event_${CHAOTIC_FOOD_DISTRIBUTION}`:
			if (get_depots(FRANCE).some(depot => (depot !== POOL) && (depot !== OUT_OF_PLAY))) {
				if (map_get(L.event_execution_status, CHAOTIC_FOOD_DISTRIBUTION, null) === -1) {
					prompt_card(CHAOTIC_FOOD_DISTRIBUTION, "Remove a French depot from map.")
					for (let area of get_areas_with_depots(FRANCE)) {
						action("area", area)
					}
				} else if (map_get(L.event_execution_status, CHAOTIC_FOOD_DISTRIBUTION, null) === 0) {
					if (has_exhausted_sp(R, L.selected_area)) {
						prompt_card(CHAOTIC_FOOD_DISTRIBUTION, `Rally one exhausted SP at S${L.selected_area}.` )
						for (let type of get_troop_types_at_area(FRANCE, L.selected_area)) {
							if (is_troop_type_exhausted(type)) {
								action("troop", type)
							}
						}
					} else {
						prompt_card(CHAOTIC_FOOD_DISTRIBUTION, "No troops to rally.")
						button_next()
					}
				} else {
					prompt_card(CHAOTIC_FOOD_DISTRIBUTION, "Draw a card.")
					button_draw()
				}
			} else {
				prompt_card(CHAOTIC_FOOD_DISTRIBUTION, "All done.")
				button_confirm()
			}
			button_undo(map_get(L.event_execution_status, CHAOTIC_FOOD_DISTRIBUTION, null) > -1)
			return
		default: 
			prompt_event_confirmation(L.state[R])
			return
		}
	},
	draw() {
		if (L.drawn_card[R] === EXTREME_WEATHER_RU) { //EXCEPTION: Since another must-play could be drawn, log here
			log_event_confirmation(EXTREME_WEATHER_RU)
			discard_or_remove_card(EXTREME_WEATHER_RU)
		} else if ((L.drawn_card[R] === CHAOTIC_FOOD_DISTRIBUTION)) {
			card_box_end()
			discard_or_remove_card(CHAOTIC_FOOD_DISTRIBUTION)
		}

		L.drawn_card[R] = draw_card(R)
		if (is_must_play_event(L.drawn_card[R])) {
			L.state[R] = `event_${L.drawn_card[R]}`
			L.persistent_events.push(L.drawn_card[R])
			if (L.drawn_card[R] === VULNERABLE_SUPPLY_LINES) {
				L.depots_to_remove = get_all_unoccupied_depots(FRANCE)
			} else if (L.drawn_card[R] === CHAOTIC_FOOD_DISTRIBUTION) {
				card_box_begin(CHAOTIC_FOOD_DISTRIBUTION)
			}
		} else {
			L.state[R] = "review_drawn_card"
		}
	},
	discard() {
		card_box_begin(VULNERABLE_SUPPLY_LINES)
		let random_card = random(get_hand(FRANCE).length - 1) + 1 //Excluding the 'Dummy', which is always in position zero
		L.discarded_card = get_hand(FRANCE)[random_card]
		discard_card(get_hand(FRANCE)[random_card])
		log("France discarded a card.")
		map_set(L.event_execution_status, VULNERABLE_SUPPLY_LINES, 0) //Increment execution status
	},
	next() {
		switch(L.state[R]) {
		case `event_${VULNERABLE_SUPPLY_LINES}`:
			map_set(L.event_execution_status, VULNERABLE_SUPPLY_LINES, 1)
			return
		case `event_${CHAOTIC_FOOD_DISTRIBUTION}`:
			map_set(L.event_execution_status, CHAOTIC_FOOD_DISTRIBUTION, 1)
			return
		}
		
	},
	done() {
		finish("WIP", "exit code 1")
	},
	leader(leader) {
		//Possible calls from "Barclay de Tolly Resigns" or "Jérôme Goes Home"
		move_leader(leader, OUT_OF_PLAY)
		log_event_execution(L.drawn_card[R])
		L.event_already_executed[R] = true
		this.confirm()
	},
	area(a) {
		switch(L.state[R]) {
		case "holy_mother_russia_ru_fr":
			L.selected_key = a
			map_set(L.event_execution_status, HOLY_MOTHER_RUSSIA_RU, FRANCE)
			return
		case `event_${CHAOS_IN_THE_REAR_AREAS}`:
			L.selected_area = a
			return
		case `event_${VULNERABLE_SUPPLY_LINES}`:
			remove_depot_from_area(FRANCE, a)
			set_delete(L.depots_to_remove, a)
			return
		case `event_${CHAOTIC_FOOD_DISTRIBUTION}`:
			L.selected_area = a
			remove_depot_from_area(FRANCE, a)
			map_set(L.event_execution_status, CHAOTIC_FOOD_DISTRIBUTION, 0)
			return
		}
	},
	troop(type) {
		rally_troop(R, L.selected_area, type)
		map_set(L.event_execution_status, CHAOTIC_FOOD_DISTRIBUTION, 1)
	},
	undo() { //TODO
		switch(L.state[R]) {
		case "holy_mother_russia_ru_fr":
			L.selected_key = -1
			map_set(L.event_execution_status, HOLY_MOTHER_RUSSIA_RU, RUSSIA)
			return
		case `event_${VULNERABLE_SUPPLY_LINES}`:
			return
		}
		
	},
	confirm() {
		if (L.drawn_card[R] === VULNERABLE_SUPPLY_LINES) {
			if (map_get(L.event_execution_status, VULNERABLE_SUPPLY_LINES, null) === -1) {
				card_box_begin(VULNERABLE_SUPPLY_LINES)
				log("No effect.")
			} 
			card_box_end()
			discard_or_remove_card(L.drawn_card[R])
			set_delete(G.active, R)
		} 
		else if ((L.drawn_card[R] !== HOLY_MOTHER_RUSSIA_RU) && (L.state[R] !== "holy_mother_russia_ru_fr") && (L.state[R] !== "review_drawn_card")) { //Any must-play event except "Holy Mother Russia"
			if (L.drawn_card[R] === CHAOTIC_FOOD_DISTRIBUTION) {
				log("No effect.")
				card_box_end()
			} else if (!L.event_already_executed[R]) {
				log_event_confirmation(L.drawn_card[R]) //Do all logging in one go to prevent unintended nesting between both players' events
			}
			discard_or_remove_card(L.drawn_card[R])
			set_delete(G.active, R)
		} 
		else if (L.drawn_card[RUSSIA] === HOLY_MOTHER_RUSSIA_RU) { //If something needs to be done to advance the resolution steps of "Holy Mother Russia"
			if (map_get(L.event_execution_status, HOLY_MOTHER_RUSSIA_RU, null) === -1) {
				map_set(L.event_execution_status, HOLY_MOTHER_RUSSIA_RU, RUSSIA)
				discard_or_remove_card(HOLY_MOTHER_RUSSIA_RU)
				set_delete(G.active, RUSSIA)
			}

			if (map_get(L.event_execution_status, HOLY_MOTHER_RUSSIA_RU, null) === RUSSIA) {
				if (R === FRANCE || (R === RUSSIA && !G.active.includes(FRANCE))) { //Only make France do anything if they're already done with their actions
					set_add(G.active, FRANCE)
					L.state[FRANCE] = "holy_mother_russia_ru_fr"
					return
				}
			} else { //Log manually since the key also needs to be logged in addition to the card
				log_event_execution(HOLY_MOTHER_RUSSIA_RU, L.selected_key)
				set_delete(G.active, FRANCE)
			}
		} 
		else if (L.state[R] === "review_drawn_card") {
			set_delete(G.active, R)
		}

		if (G.active.length === 0) {
			for (let evt of L.persistent_events) { add_persistent_event(evt) }
			if (L.selected_key > -1) { add_event_keyword(HOLY_MOTHER_RUSSIA_RU, { area : L.selected_key}) }

			end()
		}
	}
}

//=== 2. PLAY A CARD FOR ADDITIONAL ORDERS ===
P.play_card_for_additional_orders = script(`
	log "@Play a Card for Orders"
	set G.active [RUSSIA, FRANCE]
	call play_card_for_orders

	log "@Play Events"
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
			for (let c of get_hand(R)) {
				action_card(c)
			}
		} else {
			prompt(`You played C${L.played_card[R]} for ${L.ops_played[R]} additional orders.`)
			button_confirm()
			button_undo()
		}
	},
	card(c) {
		L.played_card[R] = c
		L.ops_played[R] = get_card_ops(c)
		array_delete_item(get_hand(R), c)
	},
	undo() {
		if (is_card_dummy(L.played_card[R])) {
			return_dummy_to_hand(R)
		} else {
			get_hand(R).push(L.played_card[R])
		}
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
				log_h3(`C${L.played_card[who]}: +${L.ops_played[who]} orders`, who)
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
			[WELL_DISCIPLINED_RETREAT, OPOLCHENIE, SCORCHED_EARTH, GARRISON_TROOPS, PRIDE_AND_HESITATION, KUTUZOV_APPOINTED, THE_FINLAND_CORPS, TREATY_OF_BUCHAREST, THE_CZAR_LEAVES_THE_ARMY],
			[HARD_MARCHING_1, HARD_MARCHING_2, WAR_WEARINESS, HOLY_MOTHER_RUSSIA_FR, POLISH_SUPPORT, PEACE_OFFER, DAVOUT_TAKES_COMMAND, IX_CORPS_ARRIVES, XI_CORPS_ARRIVES],
		]
		L.events_could_be_played = L.events[G.active].filter(c => can_play_event(c) && (get_hand(G.active).includes(c)))
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
	},
	pass() {
		end()
	},
	done() {
		end()
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
	if (is_event_active(HOLY_MOTHER_RUSSIA_RU)) { 
		orders[RUSSIA] += 2
	}

	// RU #14: Extreme Weather - France -2 orders
	if (is_event_active(EXTREME_WEATHER_RU)) {
		orders[FRANCE] = Math.max(0, orders[FRANCE] - 2)
	}

	// FR #42: Extreme Weather - Both sides -2 orders
	if (is_event_active(EXTREME_WEATHER_FR)) {
		orders[RUSSIA] = Math.max(0, orders[RUSSIA] - 2)
		orders[FRANCE] = Math.max(0, orders[FRANCE] - 2)
	}

	return orders
}

function find_forbidden_orders() { //Being proactive here, maybe rollback later?
	let forbidden_orders = [[], []]

	// RU #45: Russia may not use 'Place Depot' orders.
	if (is_event_active(POOR_LOGISTICS)) {
		L.forbidden_orders[RUSSIA].push(PLACE_DEPOT)
	}

	// FR #41: France may not use 'Place Depot' or 'Forage' orders.
	if (is_event_active(FREEZING_WEATHER)) {
		L.forbidden_orders[FRANCE].push(PLACE_DEPOT, FORAGE)
	}

	// FR #42: Neither side may use 'Forced March' orders.
	if (is_event_active(EXTREME_WEATHER_FR)) {
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
	function(who) { return (who === RUSSIA) && is_leader_on_map(PLATOV) },
	function(who) { return true },
	function(who) { return true },
	function(who) { return (who === FRANCE) && (get_current_turn() === JUNE_5) },
	function(who) { return (who === RUSSIA) && is_event_active(SCORCHED_EARTH) },
	function(who) { return (who === RUSSIA) && is_event_active(KUTUZOV_APPOINTED) },
	function(who) { return (who === FRANCE) && is_event_active(HARD_MARCHING_1) },
	function(who) { return (who === FRANCE) && is_event_active(HARD_MARCHING_2) },
	function(who) { return (who === FRANCE) && false /*TODO is_increased_french_command_capability()*/ },
	function(who) { return true },
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
			prompt_leader(PLATOV, "Select a Cossack Raid or Evade order.")
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
			prompt_card(SCORCHED_EARTH, "Select 1 Evade order.")
			generate_select_order_actions(R, EVADE)
			break
		case STATE_KUTUZOV_APPOINTED:
			prompt_card(KUTUZOV_APPOINTED, "Select 1 Rally order.")
			generate_select_order_actions(R, RALLY)
			break
		case STATE_HARD_MARCHING_1:
			prompt_card(HARD_MARCHING_1, "Select 1 Forced March order.")
			generate_select_order_actions(R, FORCED_MARCH)
			break
		case STATE_HARD_MARCHING_2:
			prompt_card(HARD_MARCHING_2, "Select 1 Forced March order.")
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
		case STATE_SELECT_DUMMY_ORDERS:
			//console.log(L.count[R])
			if (--L.count[R] <= 0) this.update_state(R)
			return
		case STATE_FRENCH_LOGISTIC_PREPARATIONS:
			set_add(L.already_selected[R], get_order_type(order_id))
			if (L.already_selected[R].length === 2) this.update_state(R)
			return
		case STATE_SELECT_ORDERS_MAIN:
			--L.count[R]
			return
		default:
			this.update_state(R)	
		}
	},
	done() {
		set_delete(G.active, R)
		log(`${ROLES[R]} chose ${G.selected_orders[R].length} orders.`)
		if (G.active.length === 0) {
			log()
			end()
		}
	},
	undo() {
		G.selected_orders[R].pop()

		switch(L.state[R]) {
		case STATE_SELECT_DUMMY_ORDERS:
			if (L.count[R] < 4) ++L.count[R]
			else L.state[R] = L.state_history[R].pop()
			break
		case STATE_FRENCH_LOGISTIC_PREPARATIONS:
			if (L.already_selected[R].length === 0) {
				L.state[R] = L.state_history[R].pop()
				L.count[R] = 1
			} else {
				L.already_selected[R].pop()
			}
			break
		case STATE_SELECT_ORDERS_MAIN:
			if (L.count[R] < L.num_orders[R]) {
				++L.count[R]
				break
			}
			//NOTE: Intended fallthrough to default (in order to rewind state correctly if no orders have been selected yet in this state)
		default:
			L.state[R] = L.state_history[R].pop()

			if (L.state[R] === STATE_SELECT_DUMMY_ORDERS)
				L.count[R] = 1
			else if (L.state[R] === STATE_SELECT_ORDERS_MAIN)
				L.count[R] = 1
			else if (L.state[R] === STATE_FRENCH_LOGISTIC_PREPARATIONS)
				L.already_selected[R].pop()
		}
	},
	update_state(who) {
		for (let state = L.state[who] + 1; state <= CHOOSE_ORDERS_STATE_TRANSITIONS.length; ++state) {
			if (CHOOSE_ORDERS_STATE_TRANSITIONS[state](who)) {
				L.state_history[who].push(L.state[who])
				L.state[who] = state
				break
			}
		}

		if (L.state[who] === STATE_SELECT_DUMMY_ORDERS)
			L.count[R] = 4
		else if (L.state[who] === STATE_SELECT_ORDERS_MAIN)
			L.count[R] = L.num_orders[R]
	}
}
//=== 4. PLACE ORDERS ===
//TODO: Allow alternating placing orders (implementing simultaneous optional rule as default for expediency)
P.place_orders = script(`
	log "@Place Orders"
	
	set G.active FRANCE
	if (is_event_active(COMMAND_FRICTION)) {
		call ("event_" + COMMAND_FRICTION)
	}
	call place_orders_events { time: "beginning" }

	set G.active [RUSSIA, FRANCE]
	call do_place_orders

	set G.active RUSSIA
	if (is_event_active(POOR_COMMUNICATIONS)) {
		call ("event_" + POOR_COMMUNICATIONS)
	}
	call place_orders_events { time: "end" }
`)

P.place_orders_events = {
	_begin() {
		//L.time
		L.events = (L.time === "beginning") ? [INFIGHTING_AND_INTRIGUE, LETHARGIC_PURSUIT] : [NEW_POSTING, EXHAUSTED_HORSES, DISORDERLY_MARCH]
		L.events = L.events.filter(card => can_play_event(card) && get_hand(G.active).includes(card))
		L.has_played_event = false
	},
	prompt() {
		if (L.events.length > 0) {
			prompt(`You may play events (${L.events.map(card => `C${card}`).join(", ")}).`)
			for (let c of L.events) action_card(c)
			button_pass()
		} else {
			if (L.has_played_event)
				prompt("No more events to play.")
			else 
				prompt("No eligible events in hand to play.")
			button_done()
		}
	},
	card(c) {
		push_undo()
		L.has_played_event = true
		set_delete(L.events, c)
		call("event", { card: c })
	},
	pass() { end() },
	done() { end() }
}

//TODO: implement orders that must be placed on a specific spot (e.g. Platov, french optional rule)
P.do_place_orders = {
	_begin() {
		L.orders_to_place = G.selected_orders.slice() //So that we can use the same client 'selected' code to highlight orders in this state
		L.orders_placed = [[], []] //Local undo stack to pop last order back into orders_to_place

		L.selected_order = [-1, -1] //Who has what order currently selected

		G.orders_by_type = []
		for (let i = 0; i < NUM_ORDER_TYPES; ++i) G.orders_by_type.push([]) //Organized for easy lookup in subsequent states
		G.selected_orders = [[], []] //Resetting the old selected orders container
	},
	prompt() {
		if (L.orders_to_place[R].length === 0) {
			prompt("Place Orders: All done.")
			button_confirm()
		}
		else if (L.selected_order[R] === -1) {
			prompt(`Select an order to place (${L.orders_to_place[R].length} remaining).`)
			for (let order of L.orders_to_place[R]) action_order(order)
		}
		else {
			if ((G.turn === JUNE_5) && (R === FRANCE) && (get_order_type(L.selected_order[R]) === PLACE_DEPOT)) { //French Logistic Preparations special rule
				prompt(`Place ${get_order_name(L.selected_order[R])} in any area with friendly SPs, or Kovno.`)
				action_area(S_KOVNO)
			} else {
				prompt(`Place ${get_order_name(L.selected_order[R])} in any area with friendly SPs.`)
			}

			for (let area = FIRST_AREA; area <= LAST_AREA; ++area)
				if (has_friendly_troop(R, area)) 
					action_area(area)
		}

		button_undo((L.orders_placed[R].length > 0) || (L.selected_order[R] !== -1))
	},
	order(order) {
		L.selected_order[R] = order
		G.selected_orders[R].push(order) //Utilizing existing client logic to highlight the order
	},
	area(area) {
		G.orders[L.selected_order[R]] = area //Update order's location
		set_add(G.orders_by_type[get_order_type(L.selected_order[R])], L.selected_order[R])
		G.selected_orders[R] = [] //Unhighlight the order that was just placed

		//Move order from 'to place' to 'placed'
		array_delete_item(L.orders_to_place[R], L.selected_order[R])
		L.orders_placed[R].push(L.selected_order[R])

		L.selected_order[R] = -1
	},
	undo() {
		if (L.selected_order[R] > -1) { //i.e. has an order selected
			G.selected_orders[R].pop()
			L.selected_order[R] = -1
		} else {
			L.selected_order[R] = L.orders_placed[R].pop()
			
			G.orders[L.selected_order[R]] = POOL
			set_delete(G.orders_by_type[get_order_type(L.selected_order[R])], L.selected_order[R])
			G.selected_orders[R].push(L.selected_order[R])

			L.orders_to_place[R].push(L.selected_order[R])
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
		//These events are mutually exclusive since Evasive Maneuvers is summer-only and Energetic Leadership is winter-only
		if ((L.order_type === FORCED_MARCH) && can_play_event(EVASIVE_MANEUVERS)) {
			L.state = EVASIVE_MANEUVERS
			G.active = RUSSIA
		} else if (can_play_event(ENERGETIC_LEADERSHIP)) {
			L.state = ENERGETIC_LEADERSHIP
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
		case EVASIVE_MANEUVERS:
			if (L.played_card) {
				prompt_card(EVASIVE_MANEUVERS, "Russia executes all forced march orders first this turn, but may not end moves in or adjacent to enemy-occupied areas.")
				button_confirm()
			} else {
				if (get_hand(RUSSIA).includes(EVASIVE_MANEUVERS)) {
					prompt(`You may play C${EVASIVE_MANEUVERS}.`)
					action_card(EVASIVE_MANEUVERS)
					button_pass()
				} else {
					prompt(`You do not have C${EVASIVE_MANEUVERS} in hand.`)
					button_pass()
				}
			}
			return
		case ENERGETIC_LEADERSHIP:
			if (L.played_card) {
				if (L.step === -1) {
					prompt_card(ENERGETIC_LEADERSHIP, `France executes ${get_order_type_name(L.order_type)} orders first this turn.`)
					button_next()
				} else if (L.step === 0) {
					prompt_card(ENERGETIC_LEADERSHIP, "Draw a card.")
					button_draw()
				} else {
					prompt_card(ENERGETIC_LEADERSHIP, "All done.")
					button_confirm()
				}
			} else {
				if (get_hand(FRANCE).includes(ENERGETIC_LEADERSHIP)) {
					prompt(`You may play C${ENERGETIC_LEADERSHIP}.`)
					action_card(ENERGETIC_LEADERSHIP)
					button_pass()
				} else {
					prompt(`You do not have C${ENERGETIC_LEADERSHIP}.`)
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
	draw() {
		clear_undo()

		let drawn_card = draw_card(G.active)
		if (is_must_play_event(drawn_card)) {
			call("must_play_event", { card: drawn_card })
		}
	},
	_resume() {
		++L.step
	},
	confirm() {
		if (L.played_card) {
			log("Russia executes all 'Forced March' orders first this turn, but may not end moves in or adjacent to enemy-occupied areas.")
			card_box_end()
			if ((L.state === EVASIVE_MANEUVERS) || (L.state === ENERGETIC_LEADERSHIP)) add_persistent_event(L.state)
			if (L.state === ENERGETIC_LEADERSHIP) L.first_player = FRANCE
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
	},
	france() {
		push_undo()
		L.first_player = FRANCE
		++L.step
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

function has_card_in_hand(who) {
	return get_hand(who).some(card => !is_card_dummy(card)) && (get_hand(who).length > 0)
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

function place_order(id, location) {
	G.orders[id] = location
	set_add(G.orders_by_type[get_order_type(id)], id)
}

function add_order_of_type_from_pool(who, type, where) {
	let id = get_orders_at_area(who, POOL).find(order => get_order_type(order) === type)
	place_order(id, where)
	return id
}

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
	case KUTUZOV:
		return can_change_order_to(KUTUZOV, current_type, RALLY, area)
	//May change an order to ‘Evade’
	case DE_TOLLY:
		return can_change_order_to(DE_TOLLY, current_type, EVADE, area)
	//May change an order to ‘Defend’
	case BAGRATION:
		return can_change_order_to(BAGRATION, current_type, DEFEND, area)
	//May discard a card to place a ‘Forced March’ order in that order´s step
	case CHICHAGOV:
		return (current_type === FORCED_MARCH) && (has_card_in_hand(RUSSIA) && has_order_of_type(RUSSIA, FORCED_MARCH, POOL))
	//May change an order to ANY order
	case NAPOLEON:
		return (has_order_of_type(FRANCE, current_type, area) && has_switchable_order_in_pool(FRANCE, current_type)) || (has_non_dummy_order_at_area(FRANCE, area) && has_order_of_type(FRANCE, current_type, POOL))
	//May change an order to ‘March’
	case DAVOUT:
		return can_change_order_to(DAVOUT, current_type, MARCH, area)
	//May discard a card to place an ‘Evade’ order during that order´s step
	case SCHWARZENBERG:
		return (current_type === EVADE) && (has_card_in_hand(FRANCE) && has_order_of_type(FRANCE, EVADE, POOL))
	}
}

P.switch_orders = {
	_begin() {
		//L.current_order_type
		G.active = [RUSSIA, FRANCE]

		L.selected_leader = [-1, -1]
		L.step = [-1, -1]

		L.leaders_who_can_use_abilities = [[KUTUZOV, DE_TOLLY, BAGRATION, CHICHAGOV], [NAPOLEON, DAVOUT, SCHWARZENBERG]]

		//Undo
		L.leaders_who_have_used_abilities = [[], []]
		L.switches = [[], []]
		L.removed_orders = [[], []]
		L.placed_orders = [[], []]
		L.discarded_card = [-1, -1]
		L.napoleon_action = -1

		for (let who = RUSSIA; who <= FRANCE; ++who)
			L.leaders_who_can_use_abilities[who] = L.leaders_who_can_use_abilities[who].filter(leader => can_switch_order(leader, L.current_order_type))
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
			case KUTUZOV:
				this.prompt_change_order_to(RALLY)
				break
			case DE_TOLLY:
				this.prompt_change_order_to(EVADE)
				break
			case BAGRATION:
				this.prompt_change_order_to(DEFEND)
				break
			case CHICHAGOV:
				this.prompt_discard_card_to_place(FORCED_MARCH)
				break
			case NAPOLEON:
				if (L.step[R] === -1) {
					prompt_leader(NAPOLEON, `Change an order at S${get_leader_location(NAPOLEON)} to any non-Dummy order.`)
					for (let order of get_orders_at_area(R, get_leader_location(NAPOLEON))) {
						//If Napoleon can switch OUT of the current order, generate actions on all the orders of the current order type at Napoleon's location
						if ((has_order_of_type(FRANCE, L.current_order_type, get_leader_location(NAPOLEON)) && has_switchable_order_in_pool(FRANCE, L.current_order_type))) {
							if (get_order_type(order) === L.current_order_type) action_order(order)
						}
						//If there is an order of the current order type in the pool and a non-dummy order in Napoleon's location, he can switch INTO the current order type
						if ((has_non_dummy_order_at_area(FRANCE, get_leader_location(NAPOLEON)) && has_order_of_type(FRANCE, L.current_order_type, POOL))) {
							if (get_order_type(order) !== DUMMY_ORDER) action_order(order)
						}
					}
				} else {
					prompt_leader(NAPOLEON, `Pick a non-Dummy order from your pool to place at S${get_leader_location(NAPOLEON)}.`)
					for (let order of get_orders_at_area(R, POOL))
						if (get_order_type(order) > L.current_order_type) 
							action_order(order)
				}
				break
			case DAVOUT:
				this.prompt_change_order_to(MARCH)
				break
			case SCHWARZENBERG:
				this.prompt_discard_card_to_place(EVADE)
				break
			}
		} else {
			prompt(`No leader abilities can be triggered now.`)
			button_done()
		}
		button_undo((L.leaders_who_have_used_abilities[R].length > 0) || (L.selected_leader[R] > -1))
	},
	undo() {
		if (L.selected_leader[R] > -1) {
			if (L.step[R] === -1) { //A leader is currently selected, but not an order
				L.selected_leader[R] = -1
			} else {
				if ((L.selected_leader[R] === CHICHAGOV) || (L.selected_leader[R] === SCHWARZENBERG)) {
					set_delete(get_discard(R), L.discarded_card[R])
					get_hand(R).push(L.discarded_card[R])
					L.discarded_card[R] = -1
				} else if (L.selected_leader[R] === NAPOLEON) {
					place_order(L.removed_orders[R].pop(), get_leader_location(NAPOLEON))
				}
				--L.step[R]
			}
		} else {
			L.selected_leader[R]  = L.leaders_who_have_used_abilities[R].pop()

			//Future note to self: Variables cannot be declared in case, which is why conditionals are used
			//All leaders with a change order to TYPE ability
			if ((L.selected_leader[R] === KUTUZOV) || (L.selected_leader[R] === DE_TOLLY) || (L.selected_leader[R] === BAGRATION) || (L.selected_leader[R] === DAVOUT) || ((L.selected_leader[R] === NAPOLEON) && (L.napoleon_action === 2))) {
				let previous_switch = L.switches[R].pop()
				let order_that_was_removed = previous_switch[0]
				let order_that_was_placed = previous_switch[1]

				remove_order(order_that_was_placed)
				place_order(order_that_was_removed, get_leader_location(L.selected_leader[R]))
			}
			else if ((L.selected_leader[R] === CHICHAGOV) || (L.selected_leader[R] === SCHWARZENBERG) || ((L.selected_leader[R] === NAPOLEON) && (L.napoleon_action === 3))) {
				let order_that_was_placed = L.placed_orders[R].pop()

				remove_order(order_that_was_placed)
				
				L.step[R] = 0

				if (L.selected_leader[R] === NAPOLEON) L.napoleon_action = 1
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
			for (let c of get_hand(R)) 
				if (!is_card_dummy(c)) 
					action_card(c)
		} else {
			let leader_location = get_leader_location(L.selected_leader[R])
			prompt_leader(L.selected_leader[R], `Place a '${get_order_type_name(type)}' order at S${leader_location}.`)
			for (let order of get_orders_at_area(R, POOL))
				if (get_order_type(order) === type)
					action_order(order)
		}
	},
	order(order) {
		switch(L.selected_leader[R]) {
		case KUTUZOV:
			this.switch_order(order, RALLY)
			break
		case DE_TOLLY:
			this.switch_order(order, EVADE)
			break
		case BAGRATION:
			this.switch_order(order, DEFEND)
			break
		case CHICHAGOV:
			place_order(order, get_leader_location(CHICHAGOV))
			L.placed_orders[R].push(order)
			break
		case NAPOLEON:
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
					break
				}
			} else {
				L.napoleon_action = 3
				place_order(order, get_leader_location(NAPOLEON))
				L.placed_orders[R].push(order)
				break
			}
		case DAVOUT:
			this.switch_order(order, MARCH)
			break
		case SCHWARZENBERG:
			place_order(order, get_leader_location(SCHWARZENBERG))
			L.placed_orders[R].push(order)
		}
		set_delete(L.leaders_who_can_use_abilities[R], L.selected_leader[R])
		L.leaders_who_have_used_abilities[R].push(L.selected_leader[R])
		L.selected_leader[R] = -1
	},
	switch_order(order, replacement_type) {
		remove_order(order)
		let replacement_order = add_order_of_type_from_pool(R, replacement_type, get_leader_location(L.selected_leader[R]))
		L.switches[R].push([order, replacement_order]) 
	},
	pass() { this.done() },
	done() {
		set_delete(G.active, R)

		if (G.active.length === 0) {
			end()
		}
	}
}


//=== 5. EXECUTE FORCED MARCH ORDERS ===
function get_placed_orders_of_type(type) {
	return G.orders_by_type[type]
}

P.forced_march = script(`
	log "@Execute Forced Marches"

	if (get_placed_orders_of_type(FORCED_MARCH).length === 0) {
		log "No forced march orders placed."
	} else {
		call determine_who_goes_first { order_type: FORCED_MARCH }
		call switch_orders { current_order_type: FORCED_MARCH }
		call execute_forced_marches { first_player: L.$ }
	}
`)

P.execute_forced_marches = {
	_begin() {
		//L.first_player
		if (is_event_active(EVASIVE_MANEUVERS)) {
			goto(`event_${EVASIVE_MANEUVERS}`)
		} else {
			G.active = L.first_player
			L.has_passed = [false, false]
			L.current_order = -1
			L.has_executed_order = false
			L.forced_march_orders = get_placed_orders_of_type(FORCED_MARCH)
			L.orders_by_side = [L.forced_march_orders.filter(o => get_order_owner(o) === RUSSIA), L.forced_march_orders.filter(o => get_order_owner(o) === FRANCE)]
			
			for (let who = RUSSIA; who <= FRANCE; ++who) {
				L.orders_by_side[who] = L.orders_by_side[who].filter(order => has_friendly_troop(who, get_order_location(order)))
			}
		}
		
	},
	prompt() {
		if (L.orders_by_side[G.active].length === 0) {
			prompt(`Execute Forced March orders: All done.`)
			button_done()
		} else {
			if (L.has_executed_order) {
				prompt(`Execute Forced March order: All done.`)
				button_confirm()
			} else {
				prompt(`Select a Forced March order to execute: ${join_array_with_or(L.orders_by_side[G.active].map(order => `S${get_order_location(order)}`))}`)
				for (let order of L.orders_by_side[G.active]) 
					if (has_friendly_troop(G.active, get_order_location(order)))
						action_order(order)
			}
		}
	},
	order(order) {
		push_undo()
		let area = get_order_location(order)
		remove_order(order)
		L.current_order = order
		if ((G.active === RUSSIA) && (get_leader_location(BAGRATION) === area) && can_play_event(BAGRATIONS_RETREAT) && get_hand(RUSSIA).includes(BAGRATIONS_RETREAT)) 
			call("may_play_bagrations_retreat", { type: FORCED_MARCH, area: area})
		else
			call("select_force", { type: FORCED_MARCH, area: area})
	},
	_resume() {
		L.has_executed_order = true
		//Remove orders that cannot be executed now
		L.orders_by_side[G.active] = L.orders_by_side[G.active].filter(order => has_friendly_troop(G.active, get_order_location(order)) && (get_all_movable_troops_in_area(G.active, get_order_location(order)).some(type => type > 0)))
	},
	confirm() {
		push_undo()
		set_delete(L.orders_by_side[G.active], L.current_order)
		if (!L.has_passed[enemy(G.active)]) G.active = enemy(G.active)
		
		L.has_executed_order = false
		L.current_order = -1
	},
	done() {
		L.has_passed[G.active] = true
		log(`${ROLES[G.active]} passed.`)

		L.has_executed_order = false
		L.current_order = -1

		if (L.has_passed[RUSSIA] && L.has_passed[FRANCE]) {
			log()
			end()
		} else {
			G.active = enemy(G.active)
		}
	}
}

const NUM_TROOP_TYPES = 12
function get_all_movable_troops_in_area(who, area) {
	let list = Array(NUM_TROOP_TYPES).fill(0)
	if (!has_friendly_troop(who, area)) return list

	for (let entry of get_area_troop_set(area)) {
		if (decode_troop_entry_who(entry) === who) {
			let type = decode_troop_entry_type(entry)
			let num = decode_troop_entry_num(entry)
			list[type] = num

			if (map_has(G.already_moved.troops, area)) {
				let already_moved_entries = map_get(G.already_moved.troops, area, [])

				let ent = already_moved_entries.find(e => (decode_troop_entry_who(e) === who) && (decode_troop_entry_type(e) === type)) ?? -1
				if (ent > -1) {
					list[decode_troop_entry_type(ent)] -= decode_troop_entry_num(ent)
					continue
				}
			}
		}
	}
	return list
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

function get_leaders_at_area(side, area) {
	let leaders = []
	for (let leader = get_first_leader(side); leader <= get_last_leader(side); ++leader) {
		if (get_leader_location(leader) === area)  {
			set_add(leaders, leader)
		}
	}
	return leaders
}

function can_alexander_be_babysitted() {
	if (G.active !== RUSSIA) return true
	if (!set_has(L.leaders_at_area, ALEXANDER)) return true

	//Alexander may not move alone if there are other leaders in the area
	if (L.move.leaders.length === 1 && set_has(L.move.leaders, ALEXANDER) && L.leaders_at_area.length > 0)
		return false
	
	//No leader may willingly leave Alexander behind
	if ((L.leaders_at_area.length - L.move.leaders.length === 1) && !set_has(L.move.leaders, ALEXANDER))
		return false

	return true
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

//TODO: Pinning
P.select_force = {
	_begin() {
		//L.type, L.area
		//Leaders at area and troops eligible for movement (not those that have moved previously)
		L.leaders_at_area = get_leaders_at_area(G.active, L.area)
		L.troops_at_area = get_all_movable_troops_in_area(G.active, L.area)		
		L.num_troops_selected = 0

		L.move = {
			type: L.type,
			path: [L.area],
			pinned: false,
			leaders: [],
			troops: Array(NUM_TROOP_TYPES).fill(0),
		}

		//Pinning
		if (count_num_sps(enemy(G.active), L.area) > 0) {
			L.move.pinned = true //Flag to indicate to the next state to avoid connections used by the attacker
			L.max_troops_selectable = Math.max(L.troops_at_area.reduce((a, b) => (a + b), 0) - count_num_sps(enemy(G.active), L.area), 0)
		} else {
			L.max_troops_selectable = L.troops_at_area.reduce((a, b) => (a + b), 0)
		}

		log()
		log_h3(`S${L.area}`, G.active)
	},
	prompt() {
		if (L.max_troops_selectable === 0) {
			prompt(`Pinned: May not move any SPs from S${L.area}.`)
			button_pass()
		} else if (L.move.leaders.length > 0) {
			prompt(`Select any number of SPs to move from S${L.area}.`)

			if (set_has(L.leaders_at_area, ALEXANDER) && L.leaders_at_area.length > 1) V.prompt += " Alexander may not be activated alone or left behind without another leader."
			if (L.move.leaders.length === 1 && set_has(L.move.leaders, PLATOV)) V.prompt += " Platov may only command Cavalry and Cossack SPs."

			if (L.leaders_at_area.length > L.move.leaders.length) {
				for (let leader of L.leaders_at_area) {
					if (!set_has(L.move.leaders, leader) && !set_has(G.already_moved.leaders, leader))
						button_leader(leader)
				}
			}

			for (let type of get_troop_types_at_area(G.active, L.area)) {
				if (L.move.leaders.length === 1 && set_has(L.move.leaders, PLATOV)) {
					if ((L.move.troops[type] < L.troops_at_area[type]) && (L.num_troops_selected < L.max_troops_selectable) && (is_cavalry(type) || is_cossack(type)))
						action("add_troop", type)
				} else {
					if ((L.move.troops[type] < L.troops_at_area[type]) && (L.num_troops_selected < L.max_troops_selectable))
						action("add_troop", type)
				}
				
				if (L.move.troops[type] > 0)
					action("remove_troop", type)
			}

			if (L.num_troops_selected < L.max_troops_selectable)
				button("select_all")

			button_done(L.num_troops_selected >= 1 && can_alexander_be_babysitted())
		} else {
			prompt(`Select up to 4 SPs (at least 1) to move from S${L.area}.`)

			for (let leader of L.leaders_at_area)
				if (!set_has(G.already_moved.leaders, leader))
					button_leader(leader)

			for (let type of get_troop_types_at_area(G.active, L.area)) {
				if ((L.move.troops[type] < L.troops_at_area[type]) && (L.num_troops_selected < 4))
					action("add_troop", type)
				if (L.move.troops[type] > 0)
					action("remove_troop", type)
			}

			button_done(L.num_troops_selected >= 1 && can_alexander_be_babysitted())
		}

		//Alexander's ability (aka disability): He may not willingly move without a leader
		
	},
	leader_button(leader) {
		push_undo()
		set_toggle(L.move.leaders, leader)
		if (L.move.leaders.length === 1 && set_has(L.move.leaders, PLATOV)) {
			for (let type = FRESH_INFANTRY; type <= EXHAUSTED_AUSTRIAN_INFANTRY; ++type) {
				if (!is_cavalry(type) && !is_cossack(type)) {
					L.num_troops_selected -= L.move.troops[type]
					L.move.troops[type] = 0
				}
			}
		}
	},
	add_troop(type) {
		push_undo()
		++L.move.troops[type]
		++L.num_troops_selected
	},
	remove_troop(type) {
		push_undo()
		--L.move.troops[type]
		--L.num_troops_selected
	},
	select_all() {
		push_undo()
		for (let type = 0; type < NUM_TROOP_TYPES; ++type) {
			if (L.troops_at_area[type] > 0) {
				L.move.troops[type] = L.troops_at_area[type]
				L.num_troops_selected += L.troops_at_area[type]
			}
		}
	},
	done() {
		push_undo()
		if ((L.type === MARCH) && (G.active === FRANCE) && (get_hand(FRANCE).includes(PONIATOWSKIS_V_CORPS))) 
			goto("may_play_poniatowskis_v_corps", { move: L.move })
		else
			goto("move", { move: L.move })
	},
	pass() {
		push_undo()
		log("Pinned.")
		log()
		end()
	}
}

function calculate_move_allowance(who, move_type, troops) {
	if ((move_type === MARCH) && (who === FRANCE) && (is_event_active(FAST_MARCHING_1) || is_event_active(FAST_MARCHING_2))) return 2

	let allowance = (move_type === FORCED_MARCH) ? 3 : 2
	for (let type = FRESH_INFANTRY; type <= EXHAUSTED_AUSTRIAN_INFANTRY; ++type) {
		if (((type !== FRESH_CAVALRY) && (type !== FRESH_COSSACK)) && (troops[type] > 0)) {
			return --allowance
		}
	}
	return allowance
}

function is_friendly_controlled(who, area) {
	return (who === RUSSIA && is_ru_controlled(area)) || (who === FRANCE && is_fr_controlled(area))
} 

/*
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

P.move = {
	_begin() {
		//L.move
		L.allowance = calculate_move_allowance(G.active, L.move.type, L.move.troops)
		
		L.current_area = L.move.path[L.move.path.length - 1]
		log("Moved from S" + L.move.path[L.move.path.length - 1])
		if (L.move.leaders.length > 0) {
			logi(`L${L.move.leaders[0]}`) //Seniormost leader
			for (let type = 0; type < L.move.troops.length; ++type) {
				if (L.move.troops[type] > 0) {
					log_only(G.active, "<" + L.move.troops[type] + " " + get_troop_type_name(type))
				}
			}
		} else {
			for (let type = 0; type < L.move.troops.length; ++type) {
				if (L.move.troops[type] > 0) {
					log("<" + L.move.troops[type] + " " + get_troop_type_name(type))
				}
			}
		}
		L.confirm_battle = false
	},
	prompt() {
		if (L.confirm_battle) {
			prompt("This move may trigger a battle. Confirm?")
			button_confirm()
		} else if (L.allowance > 0) {
			prompt(`Select destination for move (${L.allowance} remaining MPs).`)
			for (let area of get_all_adjacent_areas(L.move.path[L.move.path.length - 1])) {
				if ((L.move.type === FORCED_MARCH) && is_event_active(EVASIVE_MANEUVERS) && (G.active === RUSSIA)) {
					if (!is_fr_controlled(area) && !get_all_adjacent_areas(area).some(a => is_fr_controlled(a)) && can_enter_area(G.active, area))
						action_area(area)
				} else {
					if (can_enter_area(G.active, area))
						action_area(area)
				}
			}
			button_done()
		} else {
			prompt(`Move: All done.`)
			button_done()
		}
	},
	area(area) {
		push_undo()
		logi("to S" + area)
		let could_play_city_ablaze = ((G.active === FRANCE) && is_key_city(area) && !has_troop(area))

		if (is_vp_area(area) && !is_friendly_controlled(G.active, area) && !has_enemy_sp(G.active, area)) {
			increase_vp(G.active, get_area_vp(area))
		} 

		if ((L.current_area === S_MOSCOW) && is_event_active(PRIDE_AND_HESITATION) && (L.move.leaders.length > 0) && (G.active === FRANCE)) {
			log(`C${PRIDE_AND_HESITATION}.`)
			increase_vp(RUSSIA)
		}

		if (is_event_active(HOLY_MOTHER_RUSSIA_FR) && (map_get(G.persistent_events, HOLY_MOTHER_RUSSIA_FR, -1).area === L.current_area) && (G.active === RUSSIA)) { //TO CHECK: Does this stack on the same move or only once per move?
			log(`C${HOLY_MOTHER_RUSSIA_FR}.`)
			increase_vp(FRANCE)
		}

		if ((G.active === FRANCE) && (is_event_active(DISORDERLY_MARCH)) && (map_get(G.persistent_events, DISORDERLY_MARCH, null).area === area)) {
			log(`C${DISORDERLY_MARCH}.`)
			L.allowance = 0
		}

		let determine_seniority = []
		if (has_friendly_leader(G.active, area) && L.move.leaders.length > 0 && (get_leader_seniority(get_seniormost_leader(G.active, area)) === get_leader_seniority(get_seniormost_leader_from_list(G.active, L.move.leaders)))) {
			for (let leader of get_leaders_at_area(G.active, area)) {
				if (get_leader_seniority(leader) === get_leader_seniority(get_seniormost_leader(G.active, area)))
					set_add(determine_seniority, leader)
			}
			
			set_add(determine_seniority, get_seniormost_leader_from_list(G.active, L.move.leaders))
		}

		if (has_enemy_sp(G.active, area)) {
			L.confirm_battle = true
			L.current_area = area
		} else {
			move_formation(L.move.leaders, L.move.troops, L.move.path[L.move.path.length - 1], area)
			L.move.path.push(area)
			L.allowance = Math.max(--L.allowance, 0)

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
		mark_already_moved(G.active, L.move.path[L.move.path.length - 1], L.move.leaders, L.move.troops)
		//TODO: Attrition losses not yet implemented
		end()
	},
	confirm() {
		let previous_area = L.move.path[L.move.path.length - 1]
		move_formation(L.move.leaders, L.move.troops, previous_area, L.current_area)
		L.move.path.push(L.current_area)

		if (is_vp_area(previous_area) && !is_friendly_controlled(G.active, previous_area)) {
			log(`S${previous_area} abandoned!`)
			decrease_vp(G.active, get_area_vp(previous_area))
		}

		mark_already_moved(G.active, previous_area, L.move.leaders, L.move.troops)
		end()
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
				for (let c of get_hand(G.active)) 
					if (!is_card_dummy(c)) action_card(c)
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

function has_enemy_depot(who, area) {
	return get_depots(enemy(who)).some(a => (a === area))
}

function has_friendly_leader(who, space) {
	return G.leaders.slice(get_first_leader(who), get_last_leader(who) + 1).some(loc => loc === space)
}

function get_seniormost_leader_from_list(who, list) {
	return G.seniority[who].find(leader => list.includes(leader))
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

function move_formation(leaders, troops, from, to) {
	for (let leader of leaders)
		move_leader(leader, to)

	for (let type = 0; type < troops.length; ++type)
		if (troops[type] > 0)
			move_troop(G.active, from, to, type, troops[type])
}

function mark_already_moved(who, area, leaders, troops) {
	for (let leader of leaders)
		set_add(G.already_moved.leaders, leader)

	if (!map_has(G.already_moved.troops, area)) map_set(G.already_moved.troops, area, [])
	for (let type = 0; type < troops.length; ++type) {
		if (troops[type] > 0)
			add_troop_to_already_moved(who, area, type, troops[type])
	}
}

function add_troop_to_already_moved(who, area, type, num) {
	if (!map_has(G.already_moved.troops, area)) map_set(G.already_moved.troops, area, [])
	
	let entry = map_get(G.already_moved.troops, area, null)?.find(entry => (decode_troop_entry_who(entry) === who) && (decode_troop_entry_type(entry) === type)) ?? null
	if (entry !== null)
		set_already_moved(who, area, type, decode_troop_entry_num(entry) + num)
	else
		set_already_moved(who, area, type, num)
}

function set_already_moved(who, area, type, num) {
	let entry = map_get(G.already_moved.troops, area, null)?.find(entry => (decode_troop_entry_who(entry) === who) && (decode_troop_entry_type(entry) === type)) ?? null
	if (entry !== null)
		set_delete(map_get(G.already_moved.troops, area, null), entry)

	set_add(map_get(G.already_moved.troops, area, null), construct_troop_entry(who, type, num))
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

P.cavalry_patrols = script(`
	log "@Execute Cavalry Patrols"

	if (get_placed_orders_of_type(CAVALRY_PATROLS).length === 0) {
		log "No cavalry orders placed by either side."
		log ""
	} else {
		call determine_who_goes_first { order_type: CAVALRY_PATROLS }
		call switch_orders { current_order_type: CAVALRY_PATROLS }
		set G.active RUSSIA
		call may_play_flying_columns
		call execute_cavalry_patrols { first_player: L.$ }
		set G.active FRANCE
		call may_play_good_leadership
	}
`)

function has_troop_that_can_execute_cavalry_patrols(who, area) {
	return get_area_troop_set(area, null).some(entry => (decode_troop_entry_who(entry) === who) && (is_cavalry(decode_troop_entry_type(entry)) || is_cossack(decode_troop_entry_type(entry))))
}

P.execute_cavalry_patrols = {
	_begin() {
		//L.first_player
		G.active = L.first_player
		L.has_passed = [false, false]
		L.current_order = -1
		L.has_executed_order = false
		L.forced_march_orders = get_placed_orders_of_type(CAVALRY_PATROLS)
		L.orders_by_side = [L.forced_march_orders.filter(o => get_order_owner(o) === RUSSIA), L.forced_march_orders.filter(o => get_order_owner(o) === FRANCE)]

		for (let who = RUSSIA; who <= FRANCE; ++who) {
			L.orders_by_side[who] = L.orders_by_side[who].filter(order => has_friendly_troop(who, get_order_location(order)) && has_troop_that_can_execute_cavalry_patrols(who, get_order_location(order)))
		}
	},
	prompt() {
		if (L.orders_by_side[G.active].length === 0) {
			prompt(`Execute Cavalry Patrols orders: All done.`)
			button_done()
		} else {
			if (L.has_executed_order) {
				prompt(`Execute Cavalry Patrols order: All done.`)
				button_confirm()
			} else {
				prompt(`Select a Cavalry Patrols order to execute: ${join_array_with_or(L.orders_by_side[G.active].map(order => `S${get_order_location(order)}`))}`)
				for (let order of L.orders_by_side[G.active]) 
					if (has_troop(get_order_location(order)) && has_troop_that_can_execute_cavalry_patrols(G.active, get_order_location(order)))
						action_order(order)
			}
		}
	},
	order(order) {
		push_undo()
		let area = get_order_location(order)
		log_h3(`S${area}`, G.active)
		remove_order(order)
		L.current_order = order
		if ((G.active === RUSSIA) && get_hand(RUSSIA).includes(CONFUSED_RETREAT))
			call("may_play_confused_retreat", { area })
		else
			call("do_cavalry_patrols", { area })
	},
	_resume() {
		L.has_executed_order = true
	},
	confirm() {
		push_undo()
		set_delete(L.orders_by_side[G.active], L.current_order)
		if (!L.has_passed[enemy(G.active)]) G.active = enemy(G.active)
		
		L.has_executed_order = false
		L.current_order = -1
	},
	done() {
		L.has_passed[G.active] = true
		log(`${ROLES[G.active]} passed.`)
		L.has_executed_order = false
		L.current_order = -1

		if (L.has_passed[RUSSIA] && L.has_passed[FRANCE]) {
			end()
		} else {
			G.active = enemy(G.active)
		}
	}
}

P.do_cavalry_patrols = {
	_begin() {
		//L.area
		L.areas_that_could_be_scouted = []
		if (has_enemy_sp(L.area)) set_add(L.areas_that_could_be_scouted, L.area)
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
	},
	done() {
		if (G.active === FRANCE && can_play_event(GOOD_LEADERSHIP))
			goto("may_play_good_leadership")
		else 
			end()
	},
	pass() {
		log("No eligible areas to reveal enemy SPs and orders.")
		end()
	}
}

//=== 7. EXECUTE MARCH ORDERS ===
/*
	RUSSIA
		#14 Extreme Weather - 1 fresh SP becomes exhausted

	FRANCE
		#9 Fast Marching - Move 2, but one fresh SP becomes exhausted
		#10 Fast Marching - Move 2, but one fresh SP becomes exhausted
		#37 Poniatowski's V Corps - Immediately rally 2 exhausted Infantry SPs in the moving force
		#42 Extreme Weather - 1 fresh SP becomes exhausted
*/

P.march = script(`
	log "@Execute Marches"

	if (get_placed_orders_of_type(MARCH).length === 0) {
		log "No march orders placed."
	} else {
		call determine_who_goes_first { order_type: MARCH }
		call switch_orders { current_order_type: MARCH }
		call execute_marches { first_player: L.$ }
		eval { finish("WIP", "exit code 0") }
	}
`)

P.execute_marches = {
	_begin() {
		//L.first_player
		G.active = L.first_player
		L.has_passed = [false, false]
		L.current_order = -1
		L.has_executed_order = false
		L.forced_march_orders = get_placed_orders_of_type(MARCH)
		L.orders_by_side = [L.forced_march_orders.filter(o => get_order_owner(o) === RUSSIA), L.forced_march_orders.filter(o => get_order_owner(o) === FRANCE)]
		
		for (let who = RUSSIA; who <= FRANCE; ++who) {
			L.orders_by_side[who] = L.orders_by_side[who].filter(order => has_friendly_troop(who, get_order_location(order)))
		}		
	},
	prompt() {
		if (L.orders_by_side[G.active].length === 0) {
			prompt(`Execute March orders: All done.`)
			button_done()
		} else {
			if (L.has_executed_order) {
				prompt(`Execute March order: All done.`)
				button_confirm()
			} else {
				prompt(`Select a March order to execute: ${join_array_with_or(L.orders_by_side[G.active].map(order => `S${get_order_location(order)}`))}`)
				for (let order of L.orders_by_side[G.active]) 
					if (has_friendly_troop(G.active, get_order_location(order)))
						action_order(order)
			}
		}
	},
	order(order) {
		push_undo()
		let area = get_order_location(order)
		remove_order(order)
		L.current_order = order
		call("select_force", { type: MARCH, area: area})
	},
	_resume() {
		L.has_executed_order = true
		//Remove orders that cannot be executed now
		L.orders_by_side[G.active] = L.orders_by_side[G.active].filter(order => has_friendly_troop(G.active, get_order_location(order)) && (get_all_movable_troops_in_area(G.active, get_order_location(order)).some(type => type > 0)))
	},
	confirm() {
		push_undo()
		set_delete(L.orders_by_side[G.active], L.current_order)
		if (!L.has_passed[enemy(G.active)]) G.active = enemy(G.active)
		
		L.has_executed_order = false
		L.current_order = -1
	},
	done() {
		L.has_passed[G.active] = true
		log(`${ROLES[G.active]} passed.`)

		L.has_executed_order = false
		L.current_order = -1

		if (L.has_passed[RUSSIA] && L.has_passed[FRANCE]) {
			log()
			end()
		} else {
			G.active = enemy(G.active)
		}
	}
}


//=== 8. EXECUTE EVADE ORDERS ===

//=== 9. BATTLE RESOLUTION ===
/* 
	G.battles = [key, value, key, value]
	key: space
	value: entire battle data for that battle

	Each value: 
	{
		attacker: 
		defender:
	}

*/

//=== 10. EXECUTE RALLY ORDERS ===

//=== 11. EXECUTE COSSACK RAID ORDERS ===

//=== 12. EXECUTE PLACE DEPOT ORDERS ===

//=== SUPPLY, LINES OF COMMUNICATION & ATTRITION ===
const SUPPLY_SOURCES = [
	[S_RIGA, S_LIVONIA, S_PSKOV, S_UKRAINE, S_TORZHOK, S_VORONEZH, S_VLADIMIR_RUSSIA, S_UNNAMED_H2, S_RYAZAN], 
	[S_PRUSSIA_SOUTH, S_GRAND_DUCHY_OF_WARSAW_NORTH, S_GRAND_DUCHY_OF_WARSAW_SOUTH, S_AUSTRIA],
]

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

/* SUPPLY */

//Returns the distance from each space to its closest node if in supply, greater than 5 if OOS
function calculate_distance_to_nearest_depot(who) {
	let sources = get_supply_sources_and_depots(who)
	let distance = new Array(NUM_SPACES).fill(999)

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

	let depot_status = [] //Map pairing depots with whether they are in-supply or OOS
	for (let depot of depots) {
		map_set(depot_status, depot, false)
	}

	let queue = sources.slice()
	let distance = new Array(NUM_SPACES).fill(999)
	for (let source of sources) { //Start with supply sources
		distance[source] = 0
	}

	while (queue.length > 0) {
		let current = queue.shift()

		//Cannot trace through enemy SPs & max. distance of 4
		if (has_enemy_sp(who, current) || distance[current] > MAX_LOC_DISTANCE) { 
			continue
		}

		for (let s of get_adjacent_areas_by_road(current)) { //Can trace only via road, not track
			if ((distance[s] > distance[current] + 1)) {
				queue.push(s)
				if (set_has(depots, s) && !set_has(sources, s)) { //If a new in-supply depot is encountered, make it a source
					set_add(sources, s)
					map_set(depot_status, s, true)
					distance[s] = 0
				} else {
					distance[s] = distance[current] + 1
				}
			}
		}
	}

	return depot_status
}

/* ATTRITION - TODO */

//=== EVENTS ===
/*
	E - Catch-all global variable to store most things relevant to events, including:
		E.event_$.could_play() - additional factors, if any, influencing an event's playability, beyond season and owner

		and helper functions to handle must-play events, which usually need to be resolved in multi-active states:
		E.event_$.confirm_prompt() - creates the client actions for a must-play event confirmation step (use prompt_event_confirmation(evt) to call it)
		E.event_$.execute_prompt() - creates the client actions for a player to take action on a must play event during a multi-active state
		E.event_$.on_area(a) - does whatever needs to be done after clicking on a area while executing a (usually) must-play event

*/

var E = {}

/*
	G.persistent events is a plain 1D array 'map' of alternating key, value pairs (see framework).
	key - event card id
	value - an object that contains information relevant to the event, including
		event removal turn
		area it applies to (only some events)

	Use add_event_keyword to add any keywords necessary to store the event's effect
*/
function can_play_event(card) {
	if ((get_card_season(card) !== BOTH) && (get_card_season(card) !== get_season(G.turn))) return false

	let evt = E[`event_${card}`]
	if (!evt || typeof evt.could_play !== "function") {
		return true
	}

	let could_play_event = E[`event_${card}`].could_play()
	return (typeof could_play_event !== "function") ? true : could_play_event()
}

function is_event_active(event) {
	return map_has(G.persistent_events, event)
}

function add_persistent_event(evt, keywords) {
	let removal_turn = (evt === WELL_DISCIPLINED_RETREAT || evt === EXTREME_WEATHER_FR) ? G.turn + 1 : G.turn
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

function prompt_event_confirmation(evt, info) {
	if (typeof evt === "string") {
		E[evt].confirm_prompt()
	} else {
		E[`event_${evt}`].confirm_prompt()
	}
}

function prompt_event_execution(evt, info) {
	//console.log(evt)
	if (typeof evt === "string") {
		if (info)  	{ E[evt].execute_prompt(info) }
		else 		{ E[evt].execute_prompt() }
	} else {
		if (info)  	{ E[`event_${evt}`].execute_prompt(info) }
		else 		{ E[`event_${evt}`].execute_prompt() }
	}
}

function prompt_card(c, text) {
	prompt(`C${c}: ${text}`)
}

function log_event_confirmation(c, info) {
	card_box_begin(c)
	if (info) {
		E[`event_${c}`].confirm_log(info)
	} else {
		E[`event_${c}`].confirm_log()
	}
	card_box_end(c)
}

function log_event_execution(c, info) {
	card_box_begin(c)
	if (info) {
		E[`event_${c}`].execute_log(info)
	} else {
		E[`event_${c}`].execute_log()
	}
	card_box_end(c)
}

P.event = script(`
	eval { card_box_begin(L.card) }
	if (is_must_play_event(L.card)) {
		call must_play_event { card: L.card }
	} else {
		call ("event_" + L.card)
	}
	eval {
		card_box_end()
		discard_or_remove_card(L.card)
	}	
`)

P.must_play_event = {
	_begin() {
		if ([HOLY_MOTHER_RUSSIA_RU, CHAOS_IN_THE_REAR_AREAS, VULNERABLE_SUPPLY_LINES, CHAOTIC_FOOD_DISTRIBUTION].includes(L.card)) {
			goto(`event_${L.card}`)
		}
	},
	prompt() {
		prompt_event_confirmation(L.card)
	},
	confirm() {
		log_event_confirmation(L.card)
		discard_or_remove_card(L.card)
		end()
	},
	draw() {
		if (L.card === EXTREME_WEATHER_RU) { //EXCEPTION: Since another must-play could be drawn, log here
			log("France has -2 orders this turn.")
			log("1 fresh SP in each force that uses 'March' or 'Forced March' becomes exhausted")
			discard_or_remove_card(EXTREME_WEATHER_RU)
		}

		L.drawn_card = draw_card(G.active)
		if (is_must_play_event(L.drawn_card)) {
			goto("must_play_event", { card: L.drawn_card })
		} else {
			end()
		}
	},
	leader(leader) {
		//Possible calls from "Barclay de Tolly Resigns" or "Jérôme Goes Home"
		move_leader(leader, OUT_OF_PLAY)
		log_event_execution(L.card)
		discard_or_remove_card(L.card)
		end()
	},
}

//RU #1: Well-Disciplined Retreat
P.event_1 = {
	inactive: "play C1",
	prompt() {
		prompt_card(WELL_DISCIPLINED_RETREAT, "For this, and the next turn, Russia suffers no exhaustion when using Evade orders.")
		button_next()
	},
	next() {
		push_undo()
		log("For this, and the next turn, Russia suffers no exhaustion when using Evade orders.")
		add_persistent_event(WELL_DISCIPLINED_RETREAT)
		end()
	}
}

// RU #2: Confused Retreat
P.may_play_confused_retreat = {
	//L.area
	inactive: "play C2",
	prompt() {
		if (get_hand(RUSSIA).includes(CONFUSED_RETREAT)) {
			prompt(`You may play C${CONFUSED_RETREAT}.`)
			action_card(CONFUSED_RETREAT)
			button_pass()
		} else {
			prompt(`You do not have C${CONFUSED_RETREAT}.`)
			button_pass()
		}
	},
	card(card) {
		push_undo()
		goto("event_2", { area: L.area })
	},
	pass() {
		push_undo()
		goto("do_cavalry_patrols", { area: L.area })
	}
}

P.event_2 = {
	_begin() {
		card_box_begin(CONFUSED_RETREAT)
		L.step = -1
		L.count = Math.min(2, array_count(get_orders_at_area(RUSSIA, POOL), order => (get_order_type(order) === EVADE)))
		L.selected_order = -1
	},
	inactive: "retreat",
	prompt() {
		if (L.step === -1) {
			prompt_card(CONFUSED_RETREAT, "Shift Initiative 1 in France's favor.")
			action_initiative_marker()
		} else if (L.step === 0) {
			if (L.count === 0) {
				prompt_card(CONFUSED_RETREAT, `No 'Evade' orders in pool to place.`)
				button_confirm()
			} else {
				if (L.selected_order === -1) {
					prompt_card(CONFUSED_RETREAT, `Select ${L.count} 'Evade' orders to place.`)
					for (let order of get_orders_at_area(RUSSIA, POOL))
						if (get_order_type(order) === EVADE) action_order(order)
				} else {
					prompt(`Select a location to place 'Evade'.`)
					for (let area = FIRST_AREA; area <= LAST_AREA; ++area) 
						if (has_russian_sp(area)) action_area(area) 
				}
			}
		} else {
			prompt_card(CONFUSED_RETREAT, "All done.")
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
		log("Placed 'Evade'")
		logi(`S${area}`)

		L.selected_order = -1
		if (--L.count === 0) ++L.step
	},
	done() {
		push_undo()
		card_box_end()
		discard_or_remove_card(CONFUSED_RETREAT)
		goto("do_cavalry_patrols", { area: L.area })
	}
}

//RU #3: Opolchenie
P.event_3 = {
	_begin() {
		//WILL FAIL IF THE ORDER OF THE SPACES IS CHANGED (set_delete() at this.area())
		L.areas = [S_PSKOV, S_KIEV, S_SMOLENSK, S_KALUGA, S_MOSCOW].filter(area => is_ru_controlled(area))
	},
	inactive: "raise the militia",
	prompt() {
		//Always guaranteed at least Pskov (Russian off-map area cannot be entered by France)
		prompt_card(OPOLCHENIE, `Place 2 exhausted Russian Infantry SPs at ${join_array_with_and(L.areas.map(s => `S${s}`))}.`)
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
	return [...get_adjacent_areas_by_track(area), ...get_adjacent_areas_by_road(area)]
}

function increase_devastation(area, amount = 1) {
	G.devastation[area] = Math.min(3, G.devastation[area] + amount)
}

//RU #4: Evasive Maneuvers
P.event_4 = {
	_begin() {
		G.active = RUSSIA
		L.current_order = -1
		L.has_executed_order = false
		L.forced_march_orders = get_placed_orders_of_type(FORCED_MARCH)
		L.orders_by_side = [L.forced_march_orders.filter(o => get_order_owner(o) === RUSSIA), L.forced_march_orders.filter(o => get_order_owner(o) === FRANCE)]

		L.has_passed = [false, false]
		
		for (let who = RUSSIA; who <= FRANCE; ++who) {
			L.orders_by_side[who] = L.orders_by_side[who].filter(order => has_friendly_troop(who, get_order_location(order)))
		}
	},
	prompt() {
		P.execute_forced_marches.prompt()
	},
	order(order) {
		P.execute_forced_marches.order(order)
	},
	confirm() {
		push_undo()
		set_delete(L.orders_by_side[G.active], L.current_order)
		
		L.has_executed_order = false
		L.current_order = -1
	},
	done() {
		P.execute_forced_marches.done()
	},
	_resume() {
		L.has_executed_order = true
		//Remove orders that cannot be executed now
		L.orders_by_side[G.active] = L.orders_by_side[G.active].filter(order => has_friendly_troop(G.active, get_order_location(order)) && (get_all_movable_troops_in_area(G.active, get_order_location(order)).some(type => type > 0)))
	},
}

//RU #6: Bagration's Retreat
P.may_play_bagrations_retreat = {
	inactive: "play C6",
	prompt() {
		if (get_hand(RUSSIA).includes(BAGRATIONS_RETREAT)) {
			prompt(`You may play C${BAGRATIONS_RETREAT}.`)
			action_card(BAGRATIONS_RETREAT)
		} else {
			prompt(`You do not have C${BAGRATIONS_RETREAT}.`)
		}
		button_pass()
	},
	card(card) {
		push_undo()
		discard_or_remove_card(card)
		goto(`event_${card}`, { area: L.area })
	},
	pass() {
		push_undo()
		goto("select_force", { type: FORCED_MARCH, area: L.area })
	}
},



//RU #10: Scorched Earth
P.event_10 = {
	_begin() {
		L.step = -1
		L.selected_areas = []
	},
	inactive: "fall back and devastate the land",
	prompt() {
		if (L.step === -1) {
			if (get_who_has_initiative() === FRANCE) {
				prompt_card(SCORCHED_EARTH, "Reduce French Initiative by 1")
				action_initiative_marker()
			} else {
				prompt_card(SCORCHED_EARTH, "France does not have the initiative.")
				button_next()
			}
		} else if (L.step === 0) {
			if (L.selected_areas.length < 5) {
				prompt_card(SCORCHED_EARTH, "Increase Devastation in up to 5 areas with, or adjacent to, Russian SPs.")
				for (let area = FIRST_AREA; area <= LAST_AREA; ++area) {
					if (!set_has(L.selected_areas, area) && (has_russian_sp(area) || has_russian_sp_adjacent(area))) {
						action_area(area)
					}
				}
				button_pass()
			} else {
				prompt_card(SCORCHED_EARTH, "Increase Devastation - All done.")
				button_next()
			}
			 
		} else {
			prompt_card(SCORCHED_EARTH, "Receive 1 Evade order.")
			button_next()
		}
	},
	initiative() {
		push_undo()
		shift_initiative(RUSSIA)
		++L.step
	},
	next() {
		push_undo()
		if (++L.step > 1) {
			add_persistent_event(SCORCHED_EARTH) //To add the extra order in the Choose Orders step
			log("Russia received an 'Evade' order.")
			end()
		}
	},
	area(area) {
		push_undo()
		increase_devastation(area)
		set_add(L.selected_areas, area)
	},
	pass() {
		push_undo()
		++L.step
	}
}

// RU #11: Holy Mother Russia
E.event_11 = {
	confirm_prompt() {
		if (set_has(G.active, FRANCE) || (G.active === FRANCE)) {
			prompt_card(HOLY_MOTHER_RUSSIA_RU, "Receive 2 additional orders. France will select a area after resolving their actions.")
		} else {
			prompt_card(HOLY_MOTHER_RUSSIA_RU, "Receive 2 additional orders. France will designate a Russian Key City.")
		}
		button_confirm()
	},
	execute_log(area) {
		log("Russia +2 orders.")
		log(`The side controlling S${area} at the end of the turn gain +1 VP.`)
	}
}

P.event_11 = script(`
	set G.active FRANCE
	call holy_mother_russia
	set G.active RUSSIA
	call holy_mother_russia
`)

P.holy_mother_russia = {
	_begin() {
		if (G.active === RUSSIA) L.step = -1
		L.selected_area =  is_event_active(HOLY_MOTHER_RUSSIA_RU) ? map_get(G.persistent_events, HOLY_MOTHER_RUSSIA_RU, null).area : -1
	},
	inactive: "acknowledge the dissatisfaction of the rank-and-file",
	prompt() {
		if (G.active === FRANCE) {
			if (L.selected_area === -1) {
				prompt_card(HOLY_MOTHER_RUSSIA_RU, "Designate a Russian-controlled key city. The side controlling it at the end of the turn gains +1 VP.")
				for (let area = FIRST_AREA; area <= LAST_AREA; ++area) 
					if (get_area_type(area) === "key_city" && is_ru_controlled(area)) action_area(area)
			} else {
				prompt_card(HOLY_MOTHER_RUSSIA_RU, "All done.") 
				button_done()
			}
		} else {
			if (L.step === -1) {
				prompt_card(HOLY_MOTHER_RUSSIA_RU, `France selected S${L.selected_area}. The side controlling it at the end of the turn gain +1 VP.`)
				button_next()
			} else if (L.step === 0) {
				prompt_card(HOLY_MOTHER_RUSSIA_RU, "Russia +2 orders.")
				button_next()
			} else {
				prompt_card(HOLY_MOTHER_RUSSIA_RU, "All done.")
				button_done()
			}
		}
	},
	area(area) {
		push_undo()
		add_persistent_event(HOLY_MOTHER_RUSSIA_RU, { area: area })
		log("France selected S" + area + ".")
		log("The side controlling S" + area + " gain +1 VP.")
		L.selected_area = area
	},
	done() {
		end()
	},
	next() {
		push_undo()
		if (++L.step === 1) 
			log("Russia +2 orders this turn.")
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

// RU #13: Garrison Troops
P.event_13 = {
	_begin() {
		L.units_moved = 0
		L.selected_area = -1
		L.force_selected = false
		finish("WIP", "exit code 2")
	},
	inactive: "disband minor garrisons",
	prompt() {
		if (L.force_selected) {
			prompt("Select a destination for the RU SPs.")
			for (let s of get_locations_with_leader(RUSSIA)) {
				if (is_in_supply(s) && does_path_exist(RUSSIA, L.selected_area, s)) {
					action_area(s)
				}
			}
		}
	}

}

// RU #14: Extreme Weather
E.event_14 = {
	confirm_prompt() {
		prompt_card(EXTREME_WEATHER_RU, "Draw a card, France -2 orders this turn, 1 fresh SP in each force that uses 'March' or 'Forced March' becomes exhausted.")
		button_draw()
	},
	confirm_log() {
		log("France has -2 orders this turn.")
		log("1 fresh SP in each force that uses 'March' or 'Forced March' becomes exhausted.")
	}
}

// RU #15: Pride and Hesitation
E.event_15 = {
	could_play() {
		return is_fr_controlled(S_MOSCOW)
	}
}

P.event_15 = {
	_begin() {
		L.has_shifted_initiative = false
	},
	inactive: "exploit Napoleon's hubris",
	prompt() {
		if (L.has_shifted_initiative) {
			prompt_card(PRIDE_AND_HESITATION, "This turn, Russia +1 VP if any French leaders leave Moscow.")
			button_next()
		} else {
			prompt_card(PRIDE_AND_HESITATION, "Shift Initiative 1 in Russia's favor.")
			action_initiative_marker()
		}
	},
	next() {
		push_undo()
		log("Russia +1 VP if any French leaders leave Moscow this turn.")
		add_persistent_event(PRIDE_AND_HESITATION)
		end()
	},
	initiative() {
		push_undo()
		shift_initiative(RUSSIA)
		L.has_shifted_initiative = true
	}
}

// RU #16: Kutuzov Appointed
E.event_16 = {
	could_play() {
		return get_current_month() >= AUG
	}
}

P.event_16 = {
	_begin() {
		L.has_placed_kutuzov = false
	},
	inactive: "appoint Mikhail Kutuzov",
	prompt() {
		let areas_with_most_ru_sps = find_areas_with_most_ru_sps()
		if (L.has_placed_kutuzov) {
			prompt_card(KUTUZOV_APPOINTED, "Receive a free Rally order.")
			button_next()
		} else {
			prompt_card(KUTUZOV_APPOINTED, `Place Kutuzov in the space with the most Russian SPs (${join_array_with_or(areas_with_most_ru_sps.map(area => get_area_name(area)))}).`)
			for (let area of areas_with_most_ru_sps) {
				action_area(area)
			}
		}
	},
	area(area) {
		push_undo()
		log("Placed at S" + area)
		move_leader(KUTUZOV, area)
		logi(`L${KUTUZOV}`)
		add_troop(RUSSIA, area, FRESH_INFANTRY, 1)
		logi(1 + " " + get_troop_type_name(FRESH_INFANTRY))
		add_troop(RUSSIA, area, FRESH_COSSACK, 1)
		logi(1 + " " + get_troop_type_name(FRESH_COSSACK))
		L.has_placed_kutuzov = true
	},
	next() {
		push_undo()
		log("Received a free Rally order.")
		add_persistent_event(KUTUZOV_APPOINTED) //To add the free Rally order later
		end()
	}
}

// RU #17: The Finland Corps
E.event_17 = {
	could_play() {
		return get_current_month() >= AUG
	}
}

P.event_17 = {
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
		prompt_card(THE_FINLAND_CORPS, `Place ${L.troops_to_place} Infantry among ${join_array_with_or(L.spaces.map(area => get_area_name(area)))}.`)
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
E.event_18 = {
	could_play() {
		return get_current_month() >= AUG
	}
}

P.event_18 = {
	inactive: "transfer Chichagov from Bessarabia",
	prompt() {
		prompt_card(TREATY_OF_BUCHAREST, `Place Chichagov and 3 Infantry SPs at S${S_UKRAINE} or S${S_MOLDAVIA}.`)
		action_area(S_UKRAINE)
		action_area(S_MOLDAVIA)
	},
	area(area) {
		push_undo()
		log("Placed at S" + area)
		move_leader(CHICHAGOV, area)
		logi(`L${CHICHAGOV}`)
		add_troop(RUSSIA, area, FRESH_INFANTRY, 3)
		end()
	}
}

//RU #19: The Czar Leaves the Army
P.event_19 = {
	_begin() {
		L.step = -1
	},
	inactive: "send Alexander back to St. Petersburg",
	prompt() {
		if (L.step === -1) {
			prompt_card(THE_CZAR_LEAVES_THE_ARMY, "Remove Alexander from play at no cost.")
			action_leader(ALEXANDER)
		} else if (L.step === 0) {
			prompt_card(THE_CZAR_LEAVES_THE_ARMY, "Draw a card.")
			button_draw()
		} else {
			prompt_card(THE_CZAR_LEAVES_THE_ARMY, "All done.")
			button_next()
		}
		
	},
	leader(alexander) {
		push_undo()
		log("Removed from S" + get_leader_location(ALEXANDER)) 
		move_leader(alexander, POOL)
		logi(`L${ALEXANDER}`)
		++L.step
	},
	draw() {
		clear_undo()
		L.drawn_card = draw_card(R)
		if (is_must_play_event(L.drawn_card)) {
			log_box_end()
			goto("event", { card: L.drawn_card})
		} else {
			++L.step
		}
	},
	_resume() {
		++L.step
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
		if (get_hand(RUSSIA).includes(FLYING_COLUMNS)) {
			prompt(`You may play C${FLYING_COLUMNS}.`)
			action_card(FLYING_COLUMNS)
			button_pass()
		} else {
			prompt(`You do not have C${FLYING_COLUMNS}.`)
			button_pass()
		}
	},
	card(card) {
		push_undo()
		goto(`event_${FLYING_COLUMNS}`)
	},
	pass() {
		end()
	}
}

function has_cossack_sp(area) {
	if (!has_troop(area)) return false
	return get_area_troop_set(area).some(entry => is_cossack(decode_troop_entry_type(entry)))
}

P.event_20 = {
	_begin() {
		card_box_begin(FLYING_COLUMNS)
		L.step = -1
		L.count = Math.min(2, array_count(get_orders_at_area(RUSSIA, POOL), order => (get_order_type(order) === COSSACK_RAID)))
		L.selected_order = -1
	},
	inactive: "organize flying columns of cossacks",
	prompt() {
		if (L.step === -1) {
			prompt_card(FLYING_COLUMNS, "Shift Initiative 1 in Russia's favor.")
			action_initiative_marker()
		} else if (L.step === 0) {
			if (L.count === 0) {
				prompt_card(FLYING_COLUMNS, `No 'Cossack Raid' orders in pool to place.`)
				button_confirm()
			} else {
				if (L.selected_order === -1) {
					prompt_card(FLYING_COLUMNS, `Select ${L.count} 'Cossack Raid' orders to place.`)
					for (let order of get_orders_at_area(RUSSIA, POOL))
						if (get_order_type(order) === COSSACK_RAID) action_order(order)
				} else {
					prompt(`Select a location to place 'Cossack Raid'.`)
					for (let area = FIRST_AREA; area <= LAST_AREA; ++area) 
						if (has_cossack_sp(area)) action_area(area) 
				}
			}
		} else {
			prompt_card(FLYING_COLUMNS, "All done.")
			button_done()
		}
	},
	initiative() {
		push_undo()
		shift_initiative(RUSSIA)
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
		log("Placed 'Cossack Raid'")
		logi(`S${area}`)

		L.selected_order = -1
		if (--L.count === 0) ++L.step
	},
	done() {
		push_undo()
		card_box_end()
		discard_or_remove_card(FLYING_COLUMNS)
		end()
	}
}

// RU #22: City Ablaze!
P.russia_may_play_city_ablaze = {
	//L.area
	prompt() {
		prompt(`Russia may play C${CITY_ABLAZE} (CANNOT BE UNDONE)`)
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
		if (get_hand(RUSSIA).includes(CITY_ABLAZE)) {
			prompt(`You may play C${CITY_ABLAZE}`)
			action_card(CITY_ABLAZE)
		} else {
			prompt(`You do not have C${CITY_ABLAZE}.`)
			button_pass()
		}
	},
	card(card) {
		push_undo()
		goto("event_22", { card: card, area: L.area })
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

P.event_22 = {
	_begin() {
		card_box_begin(CITY_ABLAZE)
		L.step = -1
	},
	prompt() {
		switch(L.step) {
		case -1:
			prompt_card(CITY_ABLAZE, `Draw a card to your hand.`)
			button_draw()
			return
		case 0:
			prompt_card(CITY_ABLAZE, `Increase Devastation at S${L.area} to 3.`)
			action_area(L.area)
			return
		case 1:
			prompt_card(CITY_ABLAZE, `Russia +1 VP.`)
			action_vp_marker()
			return
		case 2:
			if (get_who_has_initiative() === FRANCE) {
				prompt_card(CITY_ABLAZE, "Shift Initiative 1 in Russia's favor.")
				action_initiative_marker()
			} else {
				prompt_card(CITY_ABLAZE, "France does not have the initiative.")
				button_pass()
			}
			return
		default:
			prompt_card(CITY_ABLAZE, "All done.")
			button_done()
		}
	},
	draw() {
		clear_undo()
		L.drawn_card = draw_card(R)
		++L.step
		if (is_must_play_event(L.drawn_card)) call("event", { card: L.drawn_card})
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
		if (!has_friendly_troop(RUSSIA, L.area) && has_friendly_depot(RUSSIA, L.area)) {
			goto("remove_depot", {area: L.area})
		} else {
			G.active = FRANCE
			end()
		}
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
P.event_24 = {
	_begin() {
		L.leaders_not_relocated = [ALEXANDER, KUTUZOV, DE_TOLLY, BAGRATION, TORMASOV, WITTGENSTEIN, CHICHAGOV, PLATOV].filter(leader => ((get_leader_location(leader) !== POOL) && (get_leader_location(leader) !== OUT_OF_PLAY)))
		L.selected_leader = -1
	},
	prompt() {
		if (L.leaders_not_relocated.length === 0) {
			prompt_card(NEW_POSTING, "All done.")
			button_done()
		}
		else if (L.selected_leader === -1) {
			prompt_card(NEW_POSTING, "You may relocate as many leaders as you wish.")
			for (let leader of L.leaders_not_relocated) {
				if (is_area_in_supply(RUSSIA, get_leader_location(leader))) {
					action_leader(leader)
				}
			}
			button_pass()
		}
		else if (L.selected_leader === ALEXANDER) { //MUST, if at all possible, stack and move with another leader.
			prompt_card(NEW_POSTING, `Relocate L${ALEXANDER} to any in-supply space. L${ALEXANDER} must stack with another Russian leader.`)
			for (let area = FIRST_AREA; area <= LAST_AREA; ++area) {
				if (is_area_in_supply(RUSSIA, area) && has_friendly_leader(RUSSIA, area) && (area !== get_leader_location(L.selected_leader) && (has_russian_sp(area)))) {
					action_area(area)
				}
			}
		} 
		else if ((get_leader_location(L.selected_leader) === get_leader_location(ALEXANDER)) && (get_leaders_at_area(RUSSIA, get_leader_location(L.selected_leader)).length === 2)) {
			prompt_card(NEW_POSTING, `May not leave Alexander alone at S${get_leader_location(L.selected_leader)}.`)
			button_confirm() //placeholder for now so that fuzzer doesn't throw
		}
		else {
			prompt_card(NEW_POSTING, `Relocate L${L.selected_leader} to any in-supply space.`)
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

// RU #42: Command Friction
E.event_42 = {
	confirm_prompt() {
		prompt_card(COMMAND_FRICTION, "At the beginning of the 'Place Orders' phase, FR may designate an area with more than one 1 RU leader. RU must discard a card to place orders there.")
		button("confirm")
	},
	confirm_log() {
		log("France may designate an area with more than 1 RU leader at the beginning of the 'Place Orders' phase.")
	}
}

P.event_42 = {
	_begin() {
		card_box_begin(COMMAND_FRICTION)
		L.selected_area = -1
		L.areas_with_multiple_russian_leaders =  G.leaders.slice(get_first_leader(RUSSIA), get_last_leader(RUSSIA) + 1).filter(loc => array_count(G.leaders.slice(get_first_leader(RUSSIA), get_last_leader(RUSSIA) + 1), l => loc === l) > 2).filter(s => (s !== POOL) && (s !== OUT_OF_PLAY))
	},
	inactive: "start a fight",
	prompt() {
		if (L.selected_area > -1) {
			prompt_card(COMMAND_FRICTION, `You selected S${L.selected_area}.`)
			button_confirm()
		} else {
			if (L.areas_with_multiple_russian_leaders.length === 0) {
				prompt_card(COMMAND_FRICTION, `No areas with multiple Russian leaders.`)
				button_pass()
			} else {
				prompt_card(COMMAND_FRICTION, `Select an area with multiple Russian leaders. (${join_array_with_or(L.areas_with_multiple_russian_leaders.map(area => `S${area}`))}).`)
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
P.event_43 = { //TODO
	_begin() {
		end()
	}
}

// RU #45: Poor Logistics
E.event_45 = {
	confirm_prompt() {
		prompt_card(POOR_LOGISTICS, "RU may not use 'Place Depot' orders this turn.")
		button("confirm")
	},
	confirm_log() {
		log("RU may not use 'Place Depot' orders this turn.")
	}
}

// RU #46: Devastated Countryside
E.event_46 = {
	confirm_prompt() {
		prompt_card(DEVASTATED_COUNTRYSIDE, "The effect of Devastation markers is doubled for both sides this turn.")
		button("confirm")
	},
	confirm_log() {
		log("The effect of Devastation markers is doubled for both sides this turn.")
	}
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
	set_delete(G.orders_by_type[get_order_type(id)], id)
}

// RU #48: Disorderly March
P.event_48 = {
	_begin() {
		L.step = -1
		L.orders_to_remove = []
	},
	inactive: "expose the French troops' poor discipline",
	prompt() {
		if (L.step === -1) {
			prompt_card(DISORDERLY_MARCH, "Shift the Initiative marker 1 in Russia's favor.")
			action_initiative_marker()
		} else if (L.step === 0) {
			prompt_card(DISORDERLY_MARCH, "Designate an area: France must remove all 'Defend', 'Forage', and 'Place Depot' orders on it.")
			for (let area = FIRST_AREA; area <= LAST_AREA; ++area) 
				if (has_french_sp(area) && has_order(area)) action_area(area)
		} else if (L.step === 1) {
			prompt_card(DISORDERLY_MARCH, "You designated S" + L.selected_area + ". French forces must stop moving immediately after entering/exiting it. (CANNOT BE UNDONE)")
			button_confirm()
		} else if (L.step === 2) {
			if (L.orders_to_remove.length > 0) {
				prompt_card(DISORDERLY_MARCH, `Remove all 'Defend', 'Forage', and 'Place Depot' orders from S${L.selected_area}.`)
				for (let order of L.orders_to_remove) {
					action_order(order)
				}
			} else {
				prompt_card(DISORDERLY_MARCH, `Remove orders at S${L.selected_area}: All done.`)
				button_done()
			}
		} else {
			prompt_card(DISORDERLY_MARCH, "All done.")
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
		log("1 order")
		remove_order(order_id)
		set_delete(L.orders_to_remove, order_id)
	},
	done() {
		++L.step
		G.active = RUSSIA
	},
	confirm() {
		clear_undo()
		log(`France must remove all 'Defend', 'Forage', and 'Place Depot' orders at S${L.selected_area}.`)
		L.orders_to_remove = get_orders_at_area(FRANCE, L.selected_area).filter(order => [DEFEND, FORAGE, PLACE_DEPOT].includes(get_order_type(order)))
		++L.step
		G.active = FRANCE
	},
	next() {
		end()
	}
}

// RU #52: Barclay de Tolly Resigns
E.event_52 = {
	confirm_prompt() {
		if (!is_leader_on_map(DE_TOLLY)) {
			prompt_card(BARCLAY_DE_TOLLY_RESIGNS, "de Tolly is not on map – no effect.")
			button("confirm")
		} else if (!is_leader_on_map(KUTUZOV)) {
			prompt_card(BARCLAY_DE_TOLLY_RESIGNS, "Kutuzov is not on map – no effect.")
			button("confirm")
		} else {
			prompt_card(BARCLAY_DE_TOLLY_RESIGNS, "Kutuzov is on map – remove de Tolly from play.")
			action("leader", DE_TOLLY)
		}
	},
	confirm_log() {
		log("No effect.")
	},
	execute_log() {
		log("de Tolly removed from play.")
	}
}

// FR #1: Hard Marching
// FR #2: Hard Marching
P.event_55 = function() { goto("hard_marching", {card: HARD_MARCHING_1}) }
P.event_56 = function() { goto("hard_marching", {card: HARD_MARCHING_2}) }

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
P.event_57 = {
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
		prompt_card(WAR_WEARINESS, `Shift the VP marker ${L.french_vp} in France's favor.`)
		action_vp_marker()
	},
	vp() {
		push_undo()
		G.vp += L.french_vp
		log(`France +${L.french_vp} VP.`)
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
P.event_58 = {
	inactive: "to exploit the pressure on the Russian leadership",
	prompt() {
		prompt_card(HOLY_MOTHER_RUSSIA_FR, "Designate a Key City area. France +1 VP for each RU force that leaves there via 'Forced March', 'March', or 'Evade' orders.")
		for (let area = FIRST_AREA; area <= LAST_AREA; ++area) { //TO CHECK: Does this have to be restricted to RU-controlled Key cities?
			if (get_area_type(area) === "key_city") {
				action_area(area)
			}
		}
	},
	area(area) {
		log(`This turn, France will gain 1 VP for each RU force that leaves S${area} via 'Force March', 'March' or 'Evade'.`)
		add_persistent_event(HOLY_MOTHER_RUSSIA_FR, {area: area})
		end()
	}
}

// FR #5: Polish Support
E.event_59 = {
	could_play() {
		return set_has([S_KOVNO, S_VILNA, S_VITEBSK], get_leader_location(NAPOLEON))
	}
}

P.event_59 = {
	_begin() {
		L.step = -1
	},
	inactive: "recruit Polish volunteers",
	prompt() {
		if (L.step === -1) {
			prompt_card(POLISH_SUPPORT, "Place 2 Infantry SPs at S" + get_leader_location(NAPOLEON) + ".")
			action_area(get_leader_location(NAPOLEON))
		} else if (L.step === 0) {
			prompt_card(POLISH_SUPPORT, "Draw a card.")
			button_draw()
		} else {
			prompt_card(POLISH_SUPPORT, "All done.")
			button_next()
		}
	},
	area(area) {
		push_undo()
		log("Placed at S" + area)
		add_troop(FRANCE, area, FRESH_INFANTRY, 2)
		logi(2 + " " + get_troop_type_name(FRESH_INFANTRY))
		++L.step
	},
	draw() {
		clear_undo()
		L.drawn_card = draw_card(G.active)
		if (is_must_play_event(L.drawn_card)) {
			log_box_end()
			log_box_begin(L.drawn_card)
			call("must_play_event", { card: L.drawn_card })
		} else {
			++L.step
		}
	},
	next() {
		push_undo()
		end()
	},
	_resume() {
		++L.step
	},
}

// FR #8: Infighting & Intrigue
P.event_62 = {
	_begin() {
		L.selected_area = -1
	},
	inactive: "try to make the Russians give battle",
	prompt() {
		if (L.selected_area > -1) {
			prompt_card(INFIGHTING_AND_INTRIGUE, `You selected S${L.selected_area}.`)
			button_confirm()
		} else {
			prompt_card(INFIGHTING_AND_INTRIGUE, `Designate an area. This turn, Russian leaders there may only execute 'Forced March' or 'March' orders if they end in a French-occupied area.`)
			for (let area of [...new Set(G.leaders.slice(first_russia_leader, last_russia_leader + 1).filter(a => (a !== POOL) && (a !== OUT_OF_PLAY)))]) {
				action_area(area)
			}
		}
	},
	area(area) {
		push_undo()
		L.selected_area = area
	},
	confirm() {
		push_undo()
		add_persistent_event(INFIGHTING_AND_INTRIGUE, { area: L.selected_area })
		end()
	}
}

// FR #15: Peace Offer
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

E.event_69 = {
	could_play() {
		return is_fr_controlled(S_MOSCOW)
	}
}

P.event_69 = {
	_begin() {
		L.step = -1
		L.areas_occupied = [S_RIGA, S_OSTROV, S_KIEV, S_BEZHANITZY, S_TVER].filter(area => is_fr_controlled(area))
		L.french_vp = L.areas_occupied.length * 2
	},
	inactive: "propose a peace deal",
	prompt() {
		if (L.step === -1) {
			prompt_card(PEACE_OFFER, "France +1 VP.")
			action_vp_marker()
		} else if (L.step === 0) {
			prompt_card(PEACE_OFFER, "Shift Initiative 2 in favor of Russia.")
			action_initiative_marker()
		} else {
			prompt_card(PEACE_OFFER, `France +${L.french_vp} VP.`)
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

// FR #17: Davout Takes Command
P.event_71 = {
	inactive: "appoint Davout as commander",
	prompt() {
		prompt_card(DAVOUT_TAKES_COMMAND, "Place Davout and 1 Infantry SP at any French-occupied area.")
		for (let area = FIRST_AREA; area <= LAST_AREA; ++area) 
			if (is_fr_controlled(area)) action_area(area)
	},
	area(area) {
		push_undo()
		log("Placed at S" + area)
		move_leader(DAVOUT, area)
		logi(`L${DAVOUT}`)
		add_troop(FRANCE, area, FRESH_INFANTRY, 1)
		logi(1 + " " + get_troop_type_name(FRESH_INFANTRY))
		end()
	}
}

// FR #19: IX Corps Arrives
E.event_73 = {
	could_play() {
		return get_current_month() >= AUG
	}
}

P.event_73 = {
	inactive: "bring on the IX Corps",
	prompt() {
		prompt_card(IX_CORPS_ARRIVES, "Place 4 French Infantry SP at one French-controlled key city or off-map area.")
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
E.event_74 = {
	could_play() {
		return get_current_month() >= SEPT
	}
}

P.event_74 = {
	inactive: "bring on the XI Corps",
	prompt() {
		prompt_card(XI_CORPS_ARRIVES, "Place 5 French Infantry SP at one French-controlled key city or off-map area.")
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

// FR #22: Poor Communications
E.event_76 = {
	confirm_prompt() {
		prompt_card(POOR_COMMUNICATIONS, "At the end of the 'Place Orders' phase, RU may designate 1 placed FR order to remove.")
		button("confirm")
	},
	confirm_log() {
		log("At the end of the 'Place Orders' phase, RU may designate 1 placed FR order to remove.")
	}
}

//RULES MODIFICATION: Now the player selects a space and a random order is removed from it (as opposed to selecting an order).
//This is to prevent information leak about the identity of the order.
P.event_76 = {
	_begin() {
		L.selected_area = -1
		card_box_begin(POOR_COMMUNICATIONS)
	},
	inactive: "execute C76",
	prompt() {
		if (L.selected_area > 0) {
			prompt_card(POOR_COMMUNICATIONS, `A random French order was removed from S${L.selected_area}.`)
			button_next()
		} else {
			prompt_card(POOR_COMMUNICATIONS, `Choose a space to remove a random placed French order. (CANNOT BE UNDONE)`)
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
		log(`Removed order from S${area}.`)
	},
	next() {
		card_box_end()
		end()
	}
}

// FR #24: Jérôme Goes Home
E.event_78 = {
	confirm_prompt() {
		if (!is_leader_on_map(JEROME)) {
			prompt_card(JEROME_GOES_HOME, "Jérôme is not on map – no effect.")
			button("confirm")
		} else {
			prompt_card(JEROME_GOES_HOME, "Remove Jérôme from play.")
			action("leader", JEROME)
		}
	},
	confirm_log() {
		log("No effect.")
	},
	execute_log() {
		log("Jérôme removed from play.")
	}
}

// FR #25: Good Leadership
P.may_play_good_leadership = {
	inactive: "play C79",
	prompt() {
		if (get_hand(FRANCE).includes(GOOD_LEADERSHIP)) {
			prompt(`You may play C${GOOD_LEADERSHIP}.`)
			action_card(GOOD_LEADERSHIP)
			button_pass()
		} else {
			prompt(`You do not have C${GOOD_LEADERSHIP}.`)
			button_pass()
		}
	},
	card(card) {
		push_undo()
		goto(`event_${GOOD_LEADERSHIP}`)
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

P.event_79 = {
	_begin() {
		card_box_begin(GOOD_LEADERSHIP)

		L.step = -1
		L.choice = null
		L.selected_order = -1
		L.switch_area = -1
		L.selected_leader = -1
	},
	inactive: "exploit unforeseen oppurtunities",
	prompt() {
		if (L.step === -1) {
			prompt_card(GOOD_LEADERSHIP, "Choose whether to place or change an order.")
			button("place_order")
			button("change_order")
		} else if (L.step === 0) {
			if (L.choice === "place") {
				prompt_card(GOOD_LEADERSHIP, "Select an order to place.")
				for (let order of get_orders_at_area(FRANCE, POOL)) {
					if (get_order_type(order) !== DUMMY_ORDER)
						action_order(order)
				}
			} else {
				prompt_card(GOOD_LEADERSHIP, "Select an order to change.")
				for (let order = FIRST_ORDER; order <= LAST_ORDER; ++order) {
					if ((get_order_type(order) !== DUMMY_ORDER) && (get_order_location(order) !== POOL) && (get_order_location(order) !== OUT_OF_PLAY) && (has_friendly_troop(FRANCE, get_order_location(order))))
						action_order(order)
				}
			}
		} else if (L.step === 1) {
			if (L.choice === "place") {
				prompt_card(GOOD_LEADERSHIP, `Select a French-occupied area to place ${get_order_name(L.selected_order)}.`)
				for (let area = FIRST_AREA; area <= LAST_AREA; ++area) {
					if (has_friendly_troop(FRANCE, area)) action_area(area)
				}
			} else {
				prompt_card(GOOD_LEADERSHIP, `Select an order to place at S${L.switch_area}.`)
				for (let order of get_orders_at_area(FRANCE, POOL)) {
					if (get_order_type(order) !== DUMMY_ORDER)
						action_order(order)
				}
			}
		} else if (L.step === 2) {
			prompt_card(GOOD_LEADERSHIP, "You may immediately move a leader from any area to any other area.")
			for (let leader = get_first_leader(FRANCE); leader <= get_last_leader(FRANCE); ++leader) {
				if (is_leader_on_map(leader)) action_leader(leader)
			}
			button_pass()
		} else if (L.step === 3) {
			prompt_card(GOOD_LEADERSHIP, `Select a destination for L${L.selected_leader}.`)
			for (let area = FIRST_AREA; area <= LAST_AREA; ++area) {
				if (has_friendly_troop(FRANCE, area)) action_area(area)
			}
		} else {
			prompt_card(GOOD_LEADERSHIP, "All done.")
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
		if (get_hand(FRANCE).includes(PONIATOWSKIS_V_CORPS)) {
			prompt(`You may play C${PONIATOWSKIS_V_CORPS}.`)
			action_card(PONIATOWSKIS_V_CORPS)
			button_pass()
		} else {
			prompt(`You do not have C${PONIATOWSKIS_V_CORPS}.`)
			button_pass()
		}
	},
	card(card) {
		push_undo()
		goto(`event_${card}`, { move: L.move })
	},
	pass() {
		push_undo()
		goto("move", { move: L.move })
	}
}


P.event_91 = {
	_begin() {
		//L.move
		L.has_exhausted_infantry_sp = [EXHAUSTED_INFANTRY, EXHAUSTED_PRUSSIAN_INFANTRY, EXHAUSTED_AUSTRIAN_INFANTRY].some(type => L.move.troops[type] > 0)
		L.count = 0
		for (let type of [EXHAUSTED_INFANTRY, EXHAUSTED_PRUSSIAN_INFANTRY, EXHAUSTED_AUSTRIAN_INFANTRY])
			L.count += L.move.troops[type]
		L.has_rallied = false
		card_box_begin(PONIATOWSKIS_V_CORPS)
	},
	prompt() {
		if (!L.has_exhausted_infantry_sp) {
			prompt_card(PONIATOWSKIS_V_CORPS, "No exhausted infantry in the moving force to rally.")
			button_pass()
		} else if (L.count === 0) {
			prompt_card(PONIATOWSKIS_V_CORPS, "All done.")
			button_done()
		} else {
			prompt_card(PONIATOWSKIS_V_CORPS, `Rally exhausted infantry SPs in the moving force (${L.count} remaining).`)
			for (let type of [EXHAUSTED_INFANTRY, EXHAUSTED_PRUSSIAN_INFANTRY, EXHAUSTED_AUSTRIAN_INFANTRY])
				if (L.move.troops[type] > 0)
					action("troop", type)
		}
	},
	troop(type) {
		push_undo()
		rally_troop(G.active, L.move.path[L.move.path.length - 1], type)
		--L.move.troops[type]
		++L.move.troops[type - 1]
		log("Rallied")
		logi(`S${L.move.path[L.move.path.length -1]}`)
		log("<1 Exh. Infantry")
		--L.count
	},
	pass() {
		push_undo()
		log("No exhausted SPs to rally.")
		card_box_end()
		discard_or_remove_card(PONIATOWSKIS_V_CORPS)
		goto("move", { move: L.move })
	},
	done() {
		push_undo()
		card_box_end()
		discard_or_remove_card(PONIATOWSKIS_V_CORPS)
		goto("move", { move: L.move })
	}
}

// FR #39: Chaos In The Rear Areas
P.event_93 = { //TODO
	_begin() {
		end()
	}
}

// FR #40: Vulnerable Supply Lines
P.event_94 = {
	_begin() {
		L.discarded_card = -1
		L.step = -1
		L.depots_to_remove = get_all_unoccupied_depots(FRANCE)
	},
	inactive: "struggle against partisans",
	prompt() {
		if (L.num_french_depots >= 4) {
			if (L.step === -1) {
				prompt_card(VULNERABLE_SUPPLY_LINES, "Discard a card from your hand.")
				for (let c of get_hand(G.active)) {
					if (!is_card_dummy(c) && (c !== VULNERABLE_SUPPLY_LINES)) {
						action_card(c)
					}
				}
			} else if (L.step === 0) {
				prompt_card(VULNERABLE_SUPPLY_LINES, `You discarded C${L.discarded_card}.`)
				button_next()
			} else {
				if (L.depots_to_remove.length > 0) {
					prompt_card(VULNERABLE_SUPPLY_LINES, "Remove all unoccupied French Depot Markers.")
					for (let area of L.depots_to_remove) {
						action("area", area)
					}
				} else {
					prompt_card(VULNERABLE_SUPPLY_LINES, "All done.")
					button_next()
				}
			}
		} else {
			prompt_card(VULNERABLE_SUPPLY_LINES, "No effect.")
			button_confirm()
		}
	},
	card(c) {
		push_undo()
		discard_card(c)
		log("France discarded a card.")
		++L.step
		if (L.depots_to_remove.length > 0) log("Removed depots")
	},
	area(area) {
		push_undo()
		remove_depot_from_area(G.active, area)
		logi(`S${area}`)
	},
	next() {
		if (++L.step > 1) {
			end()
		}
	},
	confirm() {
		end()
	}
}

// FR #41: Freezing Weather
E.event_95 = {
	confirm_prompt() {
		if (get_current_month() === OCT) {
			prompt_card(FREEZING_WEATHER, "No effect.")
		} else {
			prompt_card(FREEZING_WEATHER, "FR may not use 'Place Depot' or 'Forage' orders this turn. All moving FR forces have a maximum move of 1 and fight as if under 'Forced March' orders.")
		}
		button_confirm()
	},
	confirm_log() {
		log("FR may not use 'Place Depot' or 'Forage' orders this turn.")
		log("All FR forces have a maximum move of 1")
		log("FR forces fight as if under 'Forced March' orders.")
	}
}

// FR #42: Extreme Weather
E.event_96 = {
	confirm_prompt() {
		prompt_card(EXTREME_WEATHER_FR, "Both sides -2 orders, no 'Forced March' orders for this and the next turn, 1 fresh SP that uses March orders becomes exhausted.")
		button_confirm()
	},
	confirm_log() {
		log("Both sides -2 orders.")
		log("Neither side may place 'Forced March' orders this turn.")
		log("1 SP in every force that uses 'March' orders becomes exhausted.")
	}
}

// FR #43: Logistics Collapse
E.event_97 = {
	confirm_prompt() {
		prompt_card(LOGISTICS_COLLAPSE, "For the rest of the game, France must discard a card to execute a 'Place Depot' order.")
		button_confirm()
	},
	confirm_log() {
		log("For the rest of the game, France must discard a card to execute a 'Place Depot' order.")
	}
}

// FR #44: Chaotic Food Distribution
P.event_98 = {
	_begin() {
		L.step = -1
		L.selected_area = -1
	},
	prompt() {
		if (get_depots(FRANCE).some(depot => (depot !== POOL) && (depot !== OUT_OF_PLAY))) {
			if (L.step === -1) {
				prompt_card(CHAOTIC_FOOD_DISTRIBUTION, "Remove a French depot from map.")
				for (let area of get_areas_with_depots(FRANCE)) {
					action("area", area)
				}
			} else if (L.step === 0) {
				if (has_exhausted_sp(G.active, L.selected_area)) {
					prompt_card(CHAOTIC_FOOD_DISTRIBUTION, `Rally one exhausted SP at S${L.selected_area}.` )
					for (let type of get_troop_types_at_area(FRANCE, L.selected_area)) {
						if (is_troop_type_exhausted(type)) {
							action("troop", type)
						}
					}
				} else {
					prompt_card(CHAOTIC_FOOD_DISTRIBUTION, "No troops to rally.")
					button_next()
				}
			} else if (L.step === 1) {
				prompt_card(CHAOTIC_FOOD_DISTRIBUTION, "Draw a card.")
				button_draw()
			} else {
				prompt_card(CHAOTIC_FOOD_DISTRIBUTION, "All done.")
				button_confirm()
			}
		} else {
			prompt_card(CHAOTIC_FOOD_DISTRIBUTION, "All done.")
			button_confirm()
		}
	},
	area(area) {
		push_undo()
		L.selected_area = area
		remove_depot_from_area(FRANCE, area)
		log("Removed depot")
		logi(`S${area}`)
		++L.step
	},
	troop(type) {
		push_undo()
		rally_troop(G.active, L.selected_area, type)
		++L.step
	},
	draw() {
		clear_undo()
		L.drawn_card = draw_card(G.active)
		if (is_must_play_event(L.drawn_card)) {
			log_box_end()
			log_box_begin(L.drawn_card)
			call("must_play_event", { card: L.drawn_card })
		}
	},
	_resume() {
		++L.step
	},
	next() {
		++L.step
	},
	confirm() {
		end()
	}
}

// FR #53: Lethargic Pursuit
P.event_107 = {
	_begin() {
		L.selected_area = -1
	},
	inactive: "exploit Kutuzov's lethargy",
	prompt() {
		if (L.selected_area > -1) {
			prompt_card(LETHARGIC_PURSUIT, `You selected S${L.selected_area}.`)
			button_confirm()
		} else {
			prompt_card(LETHARGIC_PURSUIT, `Designate an area. This turn, Russian forces there move, they may not enter areas containing a French leader.`)
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
		add_persistent_event(LETHARGIC_PURSUIT, { area: L.selected_area })
		end()
	}
}

//=== MISC HELPERS ===
function array_count(array, callback) {
	let count = 0
	for (let elt of array) {
		if (callback(elt)) { ++count }
	}
	return count
}

function map_increment(map, key, amount = 1) {
	let current = map_get(map, key, null)
	if (current)
		map_set(map, key, current + amount)
}

function map_decrement(map, key, amount = 1) {
	let current = map_get(map, key, null)
	if (current)
		map_set(map, key, current - amount)
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

function action_card(c) {
	action("card", c)
}

function action_area(area) {
	action("area", area)
}

function action_initiative_marker() {
	action("initiative", 0)
}

function action_leader(leader) {
	action("leader", leader)
}

function action_vp_marker() {
	action("vp", 0)
}

function action_order(order) {
	action("order", order)
}

function button_leader(leader) {
	action("leader_button", leader)
}

//=== LOGGING ===
function get_abbreviation(who) {
	return (who === RUSSIA) ? "ru" : "fr"
}

function log_h1(text) {
	log()
	log(`!${text}`)
	log()
}

function log_h2(text) {
	log()
	log(`@${text}`)
	log()
}

function log_h3(text, who) {
	log()
	log(`#${get_abbreviation(who)}${text}`)
}

function logi(text) {
	log(">" + text)
}

function card_box_begin(card) {
	log_box_begin(`C${card}`, get_card_owner(card))
}

function card_box_end() {
	log_box_end()
}

function log_box_begin(text, who) {
	log()
	log(`{${who === RUSSIA ? "ru" : "fr"}${text}`)
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

function map_get(map, key, missing) {
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