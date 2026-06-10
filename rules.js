"use strict"

const data = require("./data")

const ROLES = ["Russia", "France"]

var G, L, R, V = {} //Game, local state, role of player who triggered view object, view
var P = {} //States and procedures table
var E = {} //Can play event checks

//=== CONSTANTS ===
/* NATIONS */
const RU = 0 //Russia
const FR = 1 //France
const PR = 2 //Prussia
const AU = 3 //Austria

function get_nation_name(nation) {
	switch(nation) {
		case RU: return "Russia"
		case FR: return "France"
		case PR: return "Prussia"
		case AU: return "Austria"
		default: return nation
	}
}

function get_faction(nation) {
	switch(nation) {
		case RU: 
			return RU
		case FR:
		case PR:
		case AU:
			return FR
		default: 
			return -1
	}
}

/* CARDS */
const cards = data.cards
const first_ru_card = 0
const last_ru_card = 53
const first_fr_card = 54
const last_fr_card = 107
//RU cards
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

//FR cards
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
const CHAOTIC_FOOD_DISTRIIBUTION = 98
const MUCH_NEEDED_VICTUALS = 99
const ENERGETIC_LEADERSHIP = 100
const INFERIOR_MUSKETRY = 101
const NAPOLEON_RETURNS_TO_PARIS = 102
const TOUGH_REARGUARD = 103
const COURAGE_OF_DESPERATION = 104
const THE_OLD_GUARD = 105
const NEYS_ESCAPE = 106
const LETHARGIC_PURSUIT = 107

function get_card_owner(c) {
	return cards[c].who
}

function is_card_dummy(c) {
	return c === DUMMY_RU || c === DUMMY_FR
}

function is_card_friendly(who, c) {
	return who === cards[c].who
}

const SUMMER = 0
const WINTER = 1
const BOTH = 2

function get_card_season(c) {
	return cards[c].season
}

function is_must_play_event(c) {
	return cards[c].immediate
}

function get_card_ops(card) {
	return cards[card].ops
}

/* SPACES */
const spaces = data.spaces

const OUT_OF_PLAY = -1
const POOL = 0
const S_PRUSSIA_NORTH = 1 //The northern of the two "Prussia" spaces
const S_TILSIT = 2
const S_KALTINENAI = 3
const S_NEMAKSCIAI = 4
const S_PRUSSIA_SOUTH = 5
const S_KALVARIJA = 6
const S_SUWALKI = 7
const S_UNNAMED_A3 = 8 //Unnamed spaces are named "Unnamed" + sector
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
const S_VLADIMIR_GALICIA = 43 //Two spaces named Vladimir on map, so added extra identifying info
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
const S_UNNAMED_H4 = 155
const FRENCH_CASUALTIES = 156

const space_count = 154

function is_key_city(s) {
	return spaces[s].type === "key_city" || spaces[s].type === "key_fortress" || spaces[s].type === "moscow"
}

function is_fr_controlled(s) {
	if (!G.troops[s]) return false
	if (!G.troops[s][FR] && !G.troops[s][AU] && !G.troops[s][PR]) return false
	if (G.troops[s][RU]) return false
	return true
}

function is_ru_controlled(s) {
	return !is_fr_controlled(s)
}

function get_space_name(s) {
	return data.spaces[s].name
}

function get_space_control(s) {
	return is_fr_controlled(s) ? FR : RU
}

/* LEADERS */
const ALEXANDER_I = 0
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

const first_ru_leader = ALEXANDER_I
const last_ru_leader = PLATOV
const first_fr_leader = NAPOLEON
const last_fr_leader = SCHWARZENBERG

const leader_count = 14

function get_leader_location(leader) {
	return G.leaders[leader]
}

function is_leader_on_map(leader) {
	return (get_leader_location(leader) !== POOL) && (get_leader_location(leader) !== OUT_OF_PLAY)
}

function get_first_leader(who) {
	return (who === RU) ? first_ru_leader : first_fr_leader
}

function get_last_leader(who) {
	return (who === RU) ? last_ru_leader : last_fr_leader
}

function count_num_eliminated_leaders(who) {
	return G.leaders.slice(get_first_leader(who), get_last_leader(who)).filter(loc => loc === OUT_OF_PLAY).length
}



//Troops
const FRESH_INFANTRY = 0
const EXHAUSTED_INFANTRY = 1
const FRESH_CAVALRY = 2
const EXHAUSTED_CAVALRY = 3
const FRESH_COSSACK = 4
const EXHAUSTED_COSSACK = 5
const FRESH_GUARD = 6
const EXHAUSTED_GUARD = 7

//Turns
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

/* DEPOTS */
const NUM_DEPOTS_RU = 14
const NUM_DEPOTS_FR = 7

function shift_initiative_in_favor_of_russia() {
	if (G.initiative > -4) {G.initiative--}
	if (G.initiative === 0) {G.initiative--} //No 0
}

function shift_initiative_in_favor_of_france() {
	if (G.initiative < 4) {G.initiative++}
	if (G.initiative === 0) {G.initiative++} //No 0
}

//=== VIEW ===
function on_view() {
	V.active = G.active

	V.depots = [...G.depots[RU], ...G.depots[FR]]
	V.devastation = G.devastation
	V.current_discard = G.discard[R] ?? []
	V.french_logistic_preparations = G.french_logistic_preparations
	V.winter = G.winter
	V.hand_length = [G.hand[RU].length, G.hand[FR].length]
	V.current_hand = G.hand[R] ?? []
	V.initiative = G.initiative
	V.last_turn = G.last_turn
	V.leaders = G.leaders
	V.removed = G.removed
	V.set_aside = G.set_aside
	V.troops = G.troops
	V.turn = G.turn
	V.vp = G.vp
	V.played_cards = G.played_cards
}

//=== SCENARIOS & SETUP ===
const THE_EAGLES_MARCH_ON_SMOLENSK 			= "The Eagles' March on Smolensk"
const THE_EAGLES_MARCH_ON_MOSCOW 			= "The Eagles' March on Moscow"
const THE_GRAND_CAMPAIGN 					= "The Grand Campaign"
const HOLLOW_VICTORIES 						= "Hollow Victories"
const BATTLE_OF_SMOLENSK_CAMPAIGN_START 	= "Battle of Smolensk Campaign Start"
const THE_RETREAT_OF_THE_GRANDE_ARMEE 		= "The Retreat of the Grande Armée"

const SCENARIOS = [
	THE_EAGLES_MARCH_ON_SMOLENSK,
	THE_EAGLES_MARCH_ON_MOSCOW,
	THE_GRAND_CAMPAIGN,
	HOLLOW_VICTORIES,
	BATTLE_OF_SMOLENSK_CAMPAIGN_START,
	THE_RETREAT_OF_THE_GRANDE_ARMEE,
]

function on_setup(scenario, options) {
	const scenario_data = data.scenarios.find(sc => sc.name === scenario)

	log_h1(scenario)

	G.turn = scenario_data.start
	G.last_turn = scenario_data.end

	//Russia is negative, France is positive
	G.vp = scenario_data.vp
	G.initiative = scenario_data.initiative

	G.deck = [[], []]
	G.set_aside = [[], []]
	G.removed = [[], []]
	G.discard = [[], []]

	switch(scenario) {
		case THE_EAGLES_MARCH_ON_SMOLENSK:
		case THE_EAGLES_MARCH_ON_MOSCOW:
			for (let who = RU; who <= FR; ++who) {
				G.deck[who] = cards.filter(c => (is_card_friendly(who, c.id) && get_card_season(c.id) !== WINTER && !is_card_dummy(c.id)))
				G.removed[who] = cards.filter(c => (is_card_friendly(who, c.id) && get_card_season(c.id) === WINTER && !is_card_dummy(c.id)))
			}
			break
		case THE_GRAND_CAMPAIGN:
			for (let who = RU; who <= FR; ++who) {
				G.deck[who] = cards.filter(c => (is_card_friendly(who, c.id) && get_card_season(c.id) !== WINTER && !is_card_dummy(c.id)))
				G.set_aside[who] = cards.filter(c => (is_card_friendly(who, c.id) && get_card_season(c.id) === WINTER && !is_card_dummy(c.id)))
			}
			break
		case HOLLOW_VICTORIES:
			for (let who = RU; who <= FR; ++who) {
				G.deck[who] = cards.filter(c => (is_card_friendly(who, c.id) && get_card_season(c.id) !== WINTER && !is_card_dummy(c.id) && !scenario_data.removed_cards[who].includes(c.id)))
				G.removed[who] = [...scenario_data.removed_cards[who], ...cards.filter(c => (is_card_friendly(who, c.id) && get_card_season(c.id) === WINTER) && !is_card_dummy(c.id))]
			}
			break
		case BATTLE_OF_SMOLENSK_CAMPAIGN_START:
			for (let who = RU; who <= FR; ++who) {
				G.deck[who] = cards.filter(c => (is_card_friendly(who, c.id) && get_card_season(c.id) !== WINTER && !scenario_data.removed_cards[who].includes(c.id) && !is_card_dummy(c.id)))
				G.set_aside[who] = cards.filter(c => (is_card_friendly(who, c.id) && get_card_season(c.id) === WINTER && !is_card_dummy(c.id)))
				G.removed[who] = scenario_data.removed_cards[who]
			}
			break
		case THE_RETREAT_OF_THE_GRANDE_ARMEE:
			for (let who = RU; who <= FR; ++who) {
				G.deck[who] = cards.filter(c => (is_card_friendly(who, c.id) && get_card_season(c.id) !== SUMMER && !scenario_data.removed_cards[who].includes(c.id) && !is_card_dummy(c.id)))
				G.removed[who] = [...scenario_data.removed_cards[who], ...cards.filter(c => (is_card_friendly(who, c.id) && get_card_season(c.id) === SUMMER && !is_card_dummy(c.id)))]
			}
			break
		default: throw new Error(`${scenario} not found!`)
	}

	for (let who = RU; who <= FR; ++who) {
		G.deck[who] = G.deck[who].filter(c => !scenario_data.cards_in_hand[who].includes(c.id)).map(c => c.id)
		G.removed[who] = G.removed[who].map(c => c.id)
		G.set_aside[who] = G.set_aside[who].map(c => c.id)
	}

	G.hand = [[DUMMY_RU, ...scenario_data.cards_in_hand[RU]], [DUMMY_FR, ...scenario_data.cards_in_hand[FR]]]

	G.french_logistic_preparations = scenario_data.french_logistic_preparations
	G.winter = scenario_data.winter

	G.troops = {}
	G.leaders = Array(leader_count).fill(POOL)
	G.depots = [Array(NUM_DEPOTS_RU).fill(POOL), Array(NUM_DEPOTS_FR).fill(POOL)]
	G.devastation = Array(space_count).fill(0)

	G.played_cards = [[], []]
	G.persistent_events = []

	switch(get_month(G.turn)) {
		case JUNE: 
			setup_june()
			break
		case JULY: 
			setup_july()
			break
		case AUG: 
			setup_aug()
			break
		case OCT: 
			setup_oct()
			break
	}

	for (let deck = RU; deck <= FR; ++deck) {
		shuffle(G.deck[deck])
	}

	G.active = [RU, FR]
	call("setup_hand", {scenario, scenario_data})
}

function setup_june() {
	log("June Setup.")
	/* RUSSIA */
	set_troop(RU, S_RIGA, FRESH_INFANTRY, 2)
	set_troop(RU, S_DUNABURG, FRESH_INFANTRY, 1)
	add_depot(RU, S_DUNABURG)
	set_leader(S_KALTINENAI, WITTGENSTEIN)
	set_troop(RU, S_KALTINENAI, FRESH_INFANTRY, 3)
	set_troop(RU, S_VILKOMIR, FRESH_CAVALRY, 2)
	set_troop(RU, S_VILKOMIR, FRESH_INFANTRY, 2)
	set_leader(S_VILNA, ALEXANDER_I)
	set_leader(S_VILNA, DE_TOLLY)
	set_troop(RU, S_VILNA, FRESH_INFANTRY, 6)
	add_depot(RU, S_VILNA)
	set_troop(RU, S_SVENCIONYS, FRESH_INFANTRY, 3)
	set_troop(RU, S_MOLODECHNO, FRESH_CAVALRY, 1)
	set_troop(RU, S_MOLODECHNO, FRESH_INFANTRY, 1)
	add_depot(RU, S_MINSK)
	set_troop(RU, S_LIDA, FRESH_CAVALRY, 1)
	set_troop(RU, S_LIDA, FRESH_INFANTRY, 2)
	set_leader(S_GRODNO, PLATOV)
	set_troop(RU, S_GRODNO, FRESH_COSSACK, 2)
	set_troop(RU, S_BIALYSTOK, FRESH_CAVALRY, 1)
	set_leader(S_VOLKOVYSK, BAGRATION)
	set_troop(RU, S_VOLKOVYSK, FRESH_INFANTRY, 4)
	set_troop(RU, S_BREST, FRESH_INFANTRY, 1)
	add_depot(RU, S_BREST)
	set_troop(RU, S_KOVEL, FRESH_CAVALRY, 1)
	set_troop(RU, S_KOVEL, EXHAUSTED_CAVALRY, 1)
	set_leader(S_LUTSK, TORMASOV)
	set_troop(RU, S_LUTSK, FRESH_INFANTRY, 1)
	set_troop(RU, S_LUTSK, EXHAUSTED_INFANTRY, 1)
	add_depot(RU, S_LUTSK)
	set_troop(RU, S_ROVNO, FRESH_INFANTRY, 1)
	set_troop(RU, S_DUBNO, FRESH_INFANTRY, 1)

	set_troop(RU, S_TOROPETS, FRESH_INFANTRY, 2)
	set_troop(RU, S_POLOTSK, FRESH_INFANTRY, 1)
	set_troop(RU, S_VITEBSK, FRESH_INFANTRY, 1)
	add_depot(RU, S_SMOLENSK)
	set_troop(RU, S_BORISOV, FRESH_INFANTRY, 1)
	set_troop(RU, S_MOGILEV, FRESH_INFANTRY, 1)
	add_depot(RU, S_MOGILEV)
	set_troop(RU, S_BOBRUYSK, FRESH_INFANTRY, 1)
	set_troop(RU, S_MOZYR, FRESH_INFANTRY, 1)
	set_troop(RU, S_KIEV, FRESH_INFANTRY, 1)
	add_depot(RU, S_KIEV)
	add_depot(RU, S_ZHITOMIR)

	set_troop(RU, S_MOSCOW, FRESH_INFANTRY, 1)
	add_depot(RU, S_MOSCOW)
	add_depot(RU, S_VYAZMA)
	set_troop(RU, S_KALUGA, FRESH_INFANTRY, 1)
	add_depot(RU, S_KALUGA)
	set_troop(RU, S_OREL, FRESH_INFANTRY, 1)
	add_depot(RU, S_OREL)
	set_troop(RU, S_VORONEZH, FRESH_COSSACK, 1)

	/* FRANCE */
	set_troop(PR, S_PRUSSIA_NORTH, FRESH_INFANTRY, 3)
	set_leader(S_KALVARIJA, NAPOLEON)
	set_leader(S_KALVARIJA, MURAT)
	set_troop(FR, S_KALVARIJA, FRESH_GUARD, 4)
	set_troop(FR, S_KALVARIJA, FRESH_CAVALRY, 5)
	set_troop(FR, S_KALVARIJA, FRESH_INFANTRY, 19)
	set_leader(S_SUWALKI, DE_BEAUHARNAIS)
	set_troop(FR, S_SUWALKI, FRESH_CAVALRY, 1)
	set_troop(FR, S_SUWALKI, FRESH_INFANTRY, 7)
	set_leader(S_SZCZUCZY, JEROME)
	set_troop(FR, S_SZCZUCZY, FRESH_CAVALRY, 2)
	set_troop(FR, S_SZCZUCZY, FRESH_INFANTRY, 6)
	set_troop(FR, S_SUWALKI, FRESH_CAVALRY, 1)
	set_troop(FR, S_GRAND_DUCHY_OF_WARSAW_NORTH, FRESH_INFANTRY, 2)
	set_leader(S_GRAND_DUCHY_OF_WARSAW_SOUTH, SCHWARZENBERG)
	set_troop(AU, S_GRAND_DUCHY_OF_WARSAW_SOUTH, FRESH_INFANTRY, 3)
	set_troop(AU, S_AUSTRIA, FRESH_INFANTRY, 1)

	set_devastation(S_KALVARIJA, 1)
	set_devastation(S_SUWALKI, 1)
	set_devastation(S_SZCZUCZY, 1)
}

function setup_july() {
	log("July Setup.")
	/* RUSSIA */
	set_troop(RU, S_RIGA, FRESH_INFANTRY, 2)
	set_troop(RU, S_DUNABURG, FRESH_INFANTRY, 1)
	add_depot(RU, S_DUNABURG)
	set_leader(S_SEVEZH, WITTGENSTEIN)
	set_troop(RU, S_SEVEZH, FRESH_INFANTRY, 2)
	set_troop(RU, S_SEVEZH, EXHAUSTED_INFANTRY, 1)
	set_leader(S_VITEBSK, DE_TOLLY)
	set_troop(RU, S_VITEBSK, FRESH_INFANTRY, 7)
	set_troop(RU, S_VITEBSK, FRESH_CAVALRY, 2)
	set_troop(RU, S_VITEBSK, EXHAUSTED_INFANTRY, 5)
	set_troop(RU, S_VITEBSK, EXHAUSTED_CAVALRY, 1)
	add_depot(RU, S_VITEBSK)
	set_leader(S_BABINOVICHI, PLATOV)
	set_troop(RU, S_BABINOVICHI, FRESH_COSSACK, 1)
	set_troop(RU, S_SMOLENSK, FRESH_INFANTRY, 2)
	add_depot(RU, S_SMOLENSK)
	set_troop(RU, S_DUKHOVSHCHINA, FRESH_INFANTRY, 2)
	set_troop(RU, S_RAGOSTOV, FRESH_INFANTRY, 1)
	set_troop(RU, S_RAGOSTOV, EXHAUSTED_INFANTRY, 1)
	set_leader(S_UNNAMED_E4, BAGRATION)
	set_troop(RU, S_UNNAMED_E4, FRESH_INFANTRY, 2)
	set_troop(RU, S_UNNAMED_E4, FRESH_CAVALRY, 1)
	set_troop(RU, S_UNNAMED_E4, EXHAUSTED_INFANTRY, 1)
	set_troop(RU, S_MSTISLAVL, FRESH_COSSACK, 1)

	set_leader(S_BREST, TORMASOV)
	set_troop(RU, S_BREST, FRESH_INFANTRY, 1)
	set_troop(RU, S_BREST, EXHAUSTED_INFANTRY, 1)
	set_troop(RU, S_VLADIMIR_GALICIA, FRESH_INFANTRY, 1)
	set_troop(RU, S_KOBRYN, FRESH_CAVALRY, 1)
	set_troop(RU, S_KOBRYN, EXHAUSTED_CAVALRY, 1)
	add_depot(RU, S_LUTSK)
	set_troop(RU, S_PINSK, FRESH_INFANTRY, 1)
	set_troop(RU, S_MOZYR, FRESH_INFANTRY, 1)
	add_depot(RU, S_MOZYR)
	add_depot(RU, S_ZHITOMIR)
	set_troop(RU, S_KIEV, FRESH_INFANTRY, 2)
	add_depot(RU, S_KIEV)

	set_troop(RU, S_MOSCOW, FRESH_INFANTRY, 2)
	add_depot(RU, S_MOSCOW)
	add_depot(RU, S_VYAZMA)
	set_troop(RU, S_KALUGA, FRESH_INFANTRY, 2)
	add_depot(RU, S_KALUGA)
	set_troop(RU, S_OREL, FRESH_INFANTRY, 1)
	add_depot(RU, S_OREL)
	set_troop(RU, S_VORONEZH, FRESH_COSSACK, 2)

	/* FRANCE */
	set_troop(PR, S_MITAU, FRESH_INFANTRY, 1)
	set_troop(PR, S_UNNAMED_B2, FRESH_INFANTRY, 2)
	set_troop(FR, S_VIDZY, FRESH_INFANTRY, 1)
	set_troop(FR, S_DISNA, FRESH_INFANTRY, 1)
	set_troop(FR, S_POLOTSK, FRESH_INFANTRY, 2)
	set_troop(FR, S_POLOTSK, EXHAUSTED_INFANTRY, 1)
	set_leader(S_KAMEN, NAPOLEON)
	set_leader(S_KAMEN, MURAT)
	set_leader(S_KAMEN, DE_BEAUHARNAIS)
	set_troop(FR, S_KAMEN, FRESH_GUARD, 4)
	set_troop(FR, S_KAMEN, FRESH_CAVALRY, 3)
	set_troop(FR, S_KAMEN, FRESH_INFANTRY, 5)
	set_troop(FR, S_KAMEN, EXHAUSTED_INFANTRY, 4)
	set_troop(FR, S_KAMEN, EXHAUSTED_CAVALRY, 2)
	set_troop(FR, S_KOVNO, FRESH_INFANTRY, 1)
	add_depot(FR, S_KOVNO)
	set_troop(FR, S_VILNA, FRESH_INFANTRY, 1)
	add_depot(FR, S_VILNA)
	set_troop(FR, S_MINSK, FRESH_INFANTRY, 1)
	add_depot(FR, S_MINSK)
	set_troop(FR, S_BORISOV, FRESH_INFANTRY, 3)
	set_troop(FR, S_BORISOV, EXHAUSTED_INFANTRY, 1)
	set_leader(S_MOGILEV, DAVOUT)
	set_troop(FR, S_MOGILEV, FRESH_INFANTRY, 2)
	set_troop(FR, S_MOGILEV, EXHAUSTED_INFANTRY, 1)
	set_troop(FR, S_KOKHANOVO, FRESH_INFANTRY, 3)
	set_troop(FR, S_KOKHANOVO, EXHAUSTED_INFANTRY, 1)
	set_troop(FR, S_ORSHA, FRESH_CAVALRY, 1)
	set_leader(S_NESVICH, SCHWARZENBERG)
	set_troop(AU, S_NESVICH, FRESH_INFANTRY, 2)
	set_troop(AU, S_NESVICH, EXHAUSTED_INFANTRY, 1)
	set_troop(FR, S_SLUTSK, FRESH_CAVALRY, 1)
	set_troop(FR, S_PRUZHANY, FRESH_INFANTRY, 2)
	set_troop(AU, S_ZAMOSC, FRESH_INFANTRY, 1)
	set_troop(FR, FRENCH_CASUALTIES, FRESH_INFANTRY, 6)
	set_troop(FR, FRENCH_CASUALTIES, FRESH_CAVALRY, 1)

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
	log("August Setup.")
	/* RUSSIA */
	set_troop(RU, S_RIGA, FRESH_INFANTRY, 1)
	set_troop(RU, S_MITAU, FRESH_INFANTRY, 1)
	set_leader(S_SEVEZH, WITTGENSTEIN)
	set_troop(RU, S_SEVEZH, FRESH_INFANTRY, 2)
	set_troop(RU, S_SEVEZH, EXHAUSTED_INFANTRY, 1)
	set_leader(S_SMOLENSK, DE_TOLLY)
	set_troop(RU, S_SMOLENSK, FRESH_INFANTRY, 8)
	set_troop(RU, S_SMOLENSK, FRESH_CAVALRY, 2)
	set_troop(RU, S_SMOLENSK, EXHAUSTED_INFANTRY, 5)
	set_troop(RU, S_SMOLENSK, EXHAUSTED_CAVALRY, 1)
	add_depot(RU, S_SMOLENSK)
	set_leader(S_SVERSKOVO, BAGRATION)
	set_troop(RU, S_SVERSKOVO, FRESH_INFANTRY, 3)
	set_troop(RU, S_SVERSKOVO, FRESH_CAVALRY, 1)
	set_troop(RU, S_SVERSKOVO, EXHAUSTED_INFANTRY, 2)
	set_troop(RU, S_ROSLAVL, FRESH_COSSACK, 1)
	set_leader(S_DUKHOVSHCHINA, PLATOV)
	set_troop(RU, S_DUKHOVSHCHINA, FRESH_COSSACK, 2)

	set_troop(RU, S_MOSCOW, FRESH_INFANTRY, 3)
	add_depot(RU, S_MOSCOW)
	add_depot(RU, S_VYAZMA)
	set_troop(RU, S_KALUGA, FRESH_INFANTRY, 3)
	add_depot(RU, S_KALUGA)
	set_troop(RU, S_OREL, FRESH_INFANTRY, 1)
	add_depot(RU, S_OREL)
	set_troop(RU, S_VORONEZH, FRESH_COSSACK, 2)

	set_leader(S_KOBRYN, TORMASOV)
	set_troop(RU, S_KOBRYN, FRESH_INFANTRY, 2)
	set_troop(RU, S_KOBRYN, FRESH_CAVALRY, 2)
	set_troop(RU, S_KOBRYN, EXHAUSTED_INFANTRY, 1)
	set_troop(RU, S_PINSK, FRESH_INFANTRY, 1)
	set_troop(RU, S_LUTSK, FRESH_INFANTRY, 1)
	add_depot(RU, S_LUTSK)
	set_troop(RU, S_MOZYR, FRESH_INFANTRY, 1)
	add_depot(RU, S_MOZYR)
	add_depot(RU, S_ZHITOMIR)
	set_troop(RU, S_KIEV, FRESH_INFANTRY, 3)
	add_depot(RU, S_KIEV)

	/* FRANCE */
	set_troop(PR, S_ECKAU, FRESH_INFANTRY, 1)
	set_troop(PR, S_JAKOBSTADT, FRESH_INFANTRY, 1)
	set_troop(PR, S_JAKOBSTADT, EXHAUSTED_INFANTRY, 1)
	set_troop(FR, S_DUNABURG, FRESH_INFANTRY, 1)
	set_troop(FR, S_DRISSA, FRESH_INFANTRY, 1)
	set_troop(FR, S_POLOTSK, FRESH_INFANTRY, 1)
	set_troop(FR, S_POLOTSK, EXHAUSTED_INFANTRY, 1)
	add_depot(FR, S_POLOTSK)
	set_leader(S_VITEBSK, NAPOLEON)
	set_troop(FR, S_VITEBSK, FRESH_GUARD, 3)
	set_troop(FR, S_VITEBSK, FRESH_INFANTRY, 3)
	set_troop(FR, S_VITEBSK, FRESH_CAVALRY, 1)
	set_troop(FR, S_VITEBSK, EXHAUSTED_INFANTRY, 2)
	set_troop(FR, S_VITEBSK, EXHAUSTED_GUARD, 1)
	set_leader(S_PORECZIE, DE_BEAUHARNAIS)
	set_troop(FR, S_PORECZIE, FRESH_INFANTRY, 3)
	set_leader(S_BABINOVICHI, MURAT)
	set_leader(S_BABINOVICHI, DAVOUT)
	set_troop(FR, S_BABINOVICHI, FRESH_INFANTRY, 7)
	set_troop(FR, S_BABINOVICHI, FRESH_CAVALRY, 2)
	set_troop(FR, S_BABINOVICHI, EXHAUSTED_INFANTRY, 3)
	set_troop(FR, S_BABINOVICHI, EXHAUSTED_CAVALRY, 2)
	set_troop(FR, S_KOKHANOVO, FRESH_CAVALRY, 1)
	set_troop(FR, S_MOGILEV, FRESH_INFANTRY, 2)
	set_troop(FR, S_RAGOSTOV, FRESH_CAVALRY, 1)
	set_troop(FR, S_BOBRUYSK, FRESH_INFANTRY, 1)
	set_troop(FR, S_MINSK, FRESH_INFANTRY, 1)
	add_depot(FR, S_MINSK)
	set_troop(FR, S_VILNA, FRESH_INFANTRY, 1)
	add_depot(FR, S_VILNA)
	set_troop(FR, S_KOVNO, FRESH_INFANTRY, 2)
	add_depot(FR, S_KOVNO)
	set_troop(FR, S_MOLODECHNO, FRESH_INFANTRY, 1)
	set_leader(S_PRUZHANY, SCHWARZENBERG)
	set_troop(AU, S_PRUZHANY, FRESH_INFANTRY, 2)
	set_troop(FR, S_PRUZHANY, FRESH_INFANTRY, 2)
	set_troop(AU, S_PRUZHANY, EXHAUSTED_INFANTRY, 1)
	set_troop(AU, S_ZAMOSC, FRESH_INFANTRY, 1)
	set_troop(FR, FRENCH_CASUALTIES, FRESH_INFANTRY, 7)
	set_troop(FR, FRENCH_CASUALTIES, FRESH_CAVALRY, 1)

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
	log("October Setup.")
	/* RUSSIA */
	set_troop(RU, S_RIGA, FRESH_INFANTRY, 2)
	set_troop(RU, S_DRISSA, FRESH_INFANTRY, 1)
	set_leader(S_SEVEZH, WITTGENSTEIN)
	set_troop(RU, S_SEVEZH, FRESH_INFANTRY, 3)
	set_troop(RU, S_SEVEZH, EXHAUSTED_INFANTRY, 1)
	set_troop(RU, S_OSTROV, FRESH_INFANTRY, 1)

	set_troop(RU, S_BRYANSK, FRESH_COSSACK, 1)
	set_leader(S_KOSELYSK, PLATOV)
	set_troop(RU, S_KOSELYSK, FRESH_COSSACK, 2)
	set_troop(RU, S_OREL, FRESH_INFANTRY, 1)
	add_depot(RU, S_OREL)
	set_troop(RU, S_MALOYAROSLAVET, FRESH_INFANTRY, 1)
	set_troop(RU, S_MALOYAROSLAVET, FRESH_CAVALRY, 2)
	set_troop(RU, S_MALOYAROSLAVET, FRESH_COSSACK, 1)
	set_troop(RU, S_MALOYAROSLAVET, EXHAUSTED_INFANTRY, 1)
	set_leader(S_KALUGA, KUTUZOV)
	set_leader(S_KALUGA, TORMASOV)
	set_troop(RU, S_KALUGA, FRESH_INFANTRY, 7)
	set_troop(RU, S_KALUGA, FRESH_CAVALRY, 1)
	set_troop(RU, S_KALUGA, FRESH_COSSACK, 1)
	set_troop(RU, S_KALUGA, EXHAUSTED_INFANTRY, 3)
	set_troop(RU, S_KALUGA, EXHAUSTED_CAVALRY, 1)
	add_depot(RU, S_KALUGA)
	set_troop(RU, S_VLADIMIR_RUSSIA, FRESH_COSSACK, 1)
	set_troop(RU, S_VORONEZH, FRESH_COSSACK, 1)

	set_troop(RU, S_BREST, FRESH_INFANTRY, 2)
	add_depot(RU, S_BREST)
	set_leader(S_PRUZHANY, CHICHAGOV)
	set_troop(RU, S_PRUZHANY, FRESH_INFANTRY, 3)
	set_troop(RU, S_PRUZHANY, FRESH_CAVALRY, 1)
	set_troop(RU,S_PRUZHANY, EXHAUSTED_INFANTRY, 2)
	set_troop(RU, S_PRUZHANY, EXHAUSTED_CAVALRY, 1)
	set_troop(RU, S_KOVEL, FRESH_INFANTRY, 1)
	set_troop(RU, S_LUTSK, FRESH_INFANTRY, 1)
	add_depot(RU, S_LUTSK)
	set_troop(RU, S_MOZYR, FRESH_INFANTRY, 1)
	add_depot(RU, S_MOZYR)
	set_troop(RU, S_KIEV, FRESH_INFANTRY, 1)
	add_depot(RU, S_KIEV)

	set_leader(OUT_OF_PLAY, ALEXANDER_I)
	set_leader(OUT_OF_PLAY, DE_TOLLY)
	set_leader(OUT_OF_PLAY, BAGRATION)

	/* FRANCE */
	set_troop(FR, S_PRUSSIA_SOUTH, FRESH_INFANTRY, 1)
	set_troop(PR, S_MITAU, FRESH_INFANTRY, 1)
	set_troop(FR, S_KOVNO, FRESH_INFANTRY, 1)
	add_depot(FR, S_KOVNO)
	set_leader(S_BIALYSTOK, SCHWARZENBERG)
	set_troop(AU, S_BIALYSTOK, FRESH_INFANTRY, 1)
	set_troop(FR, S_BIALYSTOK, FRESH_INFANTRY, 1)
	set_troop(AU, S_BIALYSTOK, EXHAUSTED_INFANTRY, 1)
	set_troop(AU, S_ZAMOSC, FRESH_INFANTRY, 1)
	set_troop(FR, S_VILNA, FRESH_INFANTRY, 5)
	add_depot(FR, S_VILNA)
	set_troop(FR, S_SVENCIONYS, FRESH_INFANTRY, 1)
	set_troop(PR, S_DUNABURG, FRESH_INFANTRY, 1)
	set_troop(PR, S_DUNABURG, EXHAUSTED_INFANTRY, 1)
	set_troop(FR, S_DOKSHITSY, FRESH_INFANTRY, 1)
	set_troop(FR, S_MINSK, FRESH_INFANTRY, 1)
	set_troop(FR, S_POLOTSK, FRESH_INFANTRY, 2)
	set_troop(FR, S_POLOTSK, EXHAUSTED_INFANTRY, 1)
	add_depot(FR, S_POLOTSK)
	set_troop(FR, S_KAMEN, FRESH_INFANTRY, 1)
	set_troop(FR, S_VITEBSK, EXHAUSTED_INFANTRY, 1)
	set_troop(FR, S_ORSHA, FRESH_INFANTRY, 1)
	set_troop(FR, S_MOGILEV, EXHAUSTED_INFANTRY, 1)
	set_troop(FR, S_RAGOSTOV, FRESH_INFANTRY, 1)
	set_troop(FR, S_SMOLENSK, FRESH_INFANTRY, 4)
	add_depot(FR, S_SMOLENSK)
	add_depot(FR, S_DOROGOBUZH)
	set_troop(FR, S_VYAZMA, FRESH_INFANTRY, 1)
	set_troop(FR, S_MOZHAYSK, FRESH_INFANTRY, 1)
	set_leader(S_TARUTINO, MURAT)
	set_troop(FR, S_TARUTINO, FRESH_INFANTRY, 2)
	set_troop(FR, S_TARUTINO, FRESH_CAVALRY, 1)
	set_troop(FR, S_TARUTINO, EXHAUSTED_INFANTRY, 1)
	set_troop(FR, S_TARUTINO, EXHAUSTED_CAVALRY, 1)
	set_leader(S_MOSCOW, NAPOLEON)
	set_leader(S_MOSCOW, DAVOUT)
	set_leader(S_MOSCOW, DE_BEAUHARNAIS)
	set_troop(FR, S_MOSCOW, FRESH_GUARD, 3)
	set_troop(FR, S_MOSCOW, FRESH_INFANTRY, 4)
	set_troop(FR, S_MOSCOW, EXHAUSTED_GUARD, 1)
	set_troop(FR, S_MOSCOW, EXHAUSTED_INFANTRY, 2)
	add_depot(FR, S_MOSCOW)
	set_troop(FR, FRENCH_CASUALTIES, FRESH_INFANTRY, 16)
	set_troop(FR, FRENCH_CASUALTIES, FRESH_CAVALRY, 6)

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

function set_troop(who, space, type, num) {
	if (!G.troops[space]) G.troops[space] = {}
	if (!G.troops[space][who]) G.troops[space][who] = {}
	if (!G.troops[space][who][type]) G.troops[space][who][type] = 0

	G.troops[space][who][type] = num
}

function add_troop(who, space, type, num) {
	if (!G.troops[space]) G.troops[space] = {}
	if (!G.troops[space][who]) G.troops[space][who] = {}
	if (!G.troops[space][who][type]) G.troops[space][who][type] = 0

	G.troops[space][who][type] += num
}

function add_depot(who, where) {
	G.depots[who][G.depots[who].indexOf(POOL)] = where
}

function set_leader(where, who) {
	G.leaders[who] = where
}

function set_devastation(where, level) {
	G.devastation[where] = level
}

P.setup_hand = {
	_begin() {
		//L.scenario_data
		L.scenario_hand_size = L.scenario_data.hand_size //The number of non-dummy cards in hand specified by the scenario
		L.has_drawn_cards = [false, false]
		L.discarded = [[], []]
	},
	prompt() {
		if (!L.has_drawn_cards[R]) {
			if ((G.hand[R].length - 1) > L.scenario_hand_size[R]) {
				V.prompt = `Discard cards (${(G.hand[R].length - 1) - L.scenario_hand_size[R]} remaining).`
			} else if ((G.hand[R].length - 1) === L.scenario_hand_size[R]) {
				V.prompt = `You may discard more cards, or pass.`
				button("pass")
			} else if (G.hand[R].length > 1) {
				V.prompt = `You may discard more cards before drawing ${L.scenario_hand_size[R] - (G.hand[R].length - 1)} cards.`
				button("draw")
			} else {
				V.prompt = `Draw ${L.scenario_hand_size[R]} cards.`
				button("draw")
			}
			if (G.hand[R].length > 1) {
				for (let c of G.hand[R]) {
					if (!is_card_dummy(c)) {
						action("card", c)
					}
				}
			}
			if (L.discarded[R].length > 0) {
				button("undo")
			}
		} else {
			V.prompt = "Review drawn cards."
			button("done")
		}
	},
	card(c) {
		discard_card(R, c)
		L.discarded[R].push(c)
	},
	pass() {
		L.has_drawn_cards[R] = true
	},
	draw() {
		while ((G.hand[R].length - 1) < L.scenario_hand_size[R]) {
			let drawn_card = draw_card(R)
			if (is_must_play_event(drawn_card)) {
				discard_card(R, drawn_card)
				L.discarded[R].push(drawn_card)
			}
		}
		L.has_drawn_cards[R] = true
	},
	undo() {
		G.hand[R].push(L.discarded[R].pop())
	},
	done() {
		set_delete(G.active, R)
		if (Array.isArray(G.active) && G.active.length === 0) { //Scenario 5 special rule
			if (L.scenario === BATTLE_OF_SMOLENSK_CAMPAIGN_START) {
				if (G.discard[RU].includes(HOLY_MOTHER_RUSSIA_RU)) {
					set_delete(G.discard[RU], HOLY_MOTHER_RUSSIA_RU)
				} else if (G.deck[RU].includes(HOLY_MOTHER_RUSSIA_RU)) {
					array_delete_item(G.deck[RU], HOLY_MOTHER_RUSSIA_RU)
				}
				G.deck[RU].push(HOLY_MOTHER_RUSSIA_RU)
			}
			call("begin_turn")
		}
	}
}

function draw_card(who) {
	G.hand[who].push(G.deck[who].pop())
	//log(`${ROLES[who]} drew a card.`)
	return G.hand[who][G.hand[who].length - 1]
}

function is_permanent_removal_card(card) {
	return cards[card].permanently_remove
}

function discard_card(who, c) {
	G.discard[who].push(c)
	array_delete_item(G.hand[who], c)
	//log(`${ROLES[who]} discarded a card.`)
}

function remove_card(who, c) {
	G.removed[who].push(c)
	array_delete_item(G.hand[who], c)
}

//=== TURN STRUCTURE ===
P.begin_turn = function() {
	if (is_resource_turn(G.turn)) {
		call("resource_phase")
	} else {
		call("turn")
	}
}

// P.resource_phase = {}

P.turn = script(`
	log ("=" + get_month_name(G.turn) + " " + get_turn_name(G.turn))

	call draw_card_to_hand
	call play_card_for_orders

	log "#Play Events"
	set G.active (G.initiative > 0 ? FR : RU)
	call play_events
	set G.active (1 - G.active)
	call play_events
`)

P.draw_card_to_hand = {
	_begin() {
		G.active = [RU, FR]
		L.has_drawn_card = [false, false]
		L.drawn_card = [-1, -1]
		L.state = ["draw_card", "draw_card"] //Each player's state is tracked separately
		L.events = []
		//Flag to track actions on "Holy Mother Russia" (Russian)
		//-1: not executed yet; RU (0): Russia has confirmed event play; FR (1): France has selected the relevant space.
		L.holy_mother_russia_executed = -1

		log("#Draw Cards")
	},
	prompt() {
		//A mini state machine to handle must-play events without switching to separate event states
		//Most events are just 'confirm now, play later,' so logging is done from the confirm() method
		//draw a card -> review drawn card OR draw a card -> resolve appropriate event -> confirm
		switch(L.state[R]) { 
			case "draw_card":
				V.prompt = "Draw a card to your hand."
				button("draw")
				break
			case "review_drawn_card":
				V.prompt = `You drew C${L.drawn_card[R]}.`
				button("confirm")
				break
			case `event_${HOLY_MOTHER_RUSSIA_RU}`:
				if (G.active.includes(FR)) {
					V.prompt = `C${HOLY_MOTHER_RUSSIA_RU}: Receive 2 additional orders. France will select a space after resolving their actions.`
				} else {
					V.prompt = `C${HOLY_MOTHER_RUSSIA_RU}: Receive 2 additional orders. France will designate a RU-controlled Key City.`
				}
				button("confirm")
				break
			case "holy_mother_russia_ru_fr":
				if (L.holy_mother_russia_executed === RU) {
					V.prompt = `C${HOLY_MOTHER_RUSSIA_RU}: Designate a RU-controlled Key City. The side controlling the designated Key City at the end of the turn shift the VP Marker 1 in their favor.`
					for (let s = 1; s <= space_count; ++s) {
						if (is_key_city(s) && is_ru_controlled(s)) {
							action("space", s)
						}
					}
				} else if (L.holy_mother_russia_executed === FR) {
					V.prompt = `C${HOLY_MOTHER_RUSSIA_RU}: You selected ${get_space_name(L.selected_key)}.`
					button("confirm")
					button("undo")
				}
				break
			case `event_${EXTREME_WEATHER_RU}`:
				V.prompt = `C${EXTREME_WEATHER_RU}: Draw a card, FR has -2 orders this turn, 1 fresh SP in each force that uses 'March' or 'Forced March' becomes exhausted.`
				button("draw")
				break
			case `event_${COMMAND_FRICTION}`:
				V.prompt = `C${COMMAND_FRICTION}: At the beginning of the 'Place Orders' phase, FR may designate an area with more than one 1 RU leader. RU must discard a card to place orders there.`
				button("confirm")
				break
			case `event_${POOR_LOGISTICS}`:
				V.prompt = `C${POOR_LOGISTICS}: RU may not use 'Place Depot' orders this turn.`
				button("confirm")
				break
			case `event_${DEVASTATED_COUNTRYSIDE}`:
				V.prompt = `C${DEVASTATED_COUNTRYSIDE}: The effect of Devastation markers is doubled for both sides this turn.`
				button("confirm")
				break
			case `event_${BARCLAY_DE_TOLLY_RESIGNS}`:
				if (!is_leader_on_map(DE_TOLLY)) {
					V.prompt = `C${BARCLAY_DE_TOLLY_RESIGNS}: Barclay de Tolly is not on map - no effect.`
					button("confirm")
				} else if (is_leader_on_map(KUTUZOV)) {
					V.prompt = `C${BARCLAY_DE_TOLLY_RESIGNS}: Kutuzov is on map - remove Barclay de Tolly from play.`
					action("leader", DE_TOLLY)
				} else {
					V.prompt = `C${BARCLAY_DE_TOLLY_RESIGNS}: Kutuzov is not on map - no effect.`
					button("confirm")
				}
				break
			case `event_${POOR_COMMUNICATIONS}`:
				V.prompt = `C${POOR_COMMUNICATIONS}: At the end of the 'Place Orders' phase, RU may designate 1 placed FR order to remove.`
				button("confirm")
				break
			case `event_${JEROME_GOES_HOME}`:
				if (!is_leader_on_map(JEROME)) {
					V.prompt = `C${JEROME_GOES_HOME}: Jérôme is not on map - no effect.`
					button("confirm")
				} else {
					V.prompt = `C${JEROME_GOES_HOME}: Remove Jérôme from play.`
					action("leader", JEROME)
				}
				break
			case `event${CHAOS_IN_THE_REAR_AREAS}`:
				V.prompt = `C${CHAOS_IN_THE_REAR_AREAS}: Not implemented yet.`
				button("confirm")
			//french winter must-play events not implemented yet (will do after creating relevant functions)
		}
	},
	draw() {
		if (L.state[R] === `event_${EXTREME_WEATHER_RU}`) { //Since another must-play could be drawn, log here
			log_must_play_event(EXTREME_WEATHER_RU)
			discard_card(RU, EXTREME_WEATHER_RU)
		}
		L.drawn_card[R] = draw_card(R)
		log(`${ROLES[R]} drew a card.`)
		if (is_must_play_event(L.drawn_card[R])) {
			L.state[R] = `event_${L.drawn_card[R]}`
			L.events.push(L.drawn_card[R])
		} else {
			L.state[R] = "review_drawn_card"
		}
	},
	leader(leader) {
		if (L.state[R] === `event_${BARCLAY_DE_TOLLY_RESIGNS}`) {
			G.leaders[DE_TOLLY] = OUT_OF_PLAY
		} else if (L.state[R] === `event_${JEROME_GOES_HOME}`) {
			G.leaders[JEROME] = OUT_OF_PLAY
		}
		this.confirm()
	},
	space(s) {
		L.selected_key = s
		L.holy_mother_russia_executed = FR
	},
	undo() {
		switch(L.state[R]) {
			case "holy_mother_russia_ru_fr":
				L.selected_key = -1
				L.holy_mother_russia_executed = RU
				break
		}
	},
	confirm() {
		if (L.state[R] !== "review_drawn_card") { //i.e. is a must-play event
			if (L.state[R] !== "holy_mother_russia_ru_fr") {
				log_must_play_event(L.drawn_card[R]) //Do all logging in one go to prevent unintended nesting between both players' events

				if (is_permanent_removal_card(L.drawn_card[R])) { //Discard or remove, as appropriate
					remove_card(R, L.drawn_card[R])
				} else {
					discard_card(get_card_owner(L.drawn_card[R]), L.drawn_card[R])
				}
				
				if (L.drawn_card[R] === HOLY_MOTHER_RUSSIA_RU) { L.holy_mother_russia_executed = RU } //Update 'Holy Mother Russia' status
			} else {
				log_must_play_event(L.drawn_card[RU], L.selected_key)
			}
		}
		set_delete(G.active, R)

		if (L.holy_mother_russia_executed === RU) { //i.e. waiting for France to pick a space
			if (R === FR || (R === RU && !G.active.includes(FR))) {
				G.active.push(FR)
				L.state[FR] = "holy_mother_russia_ru_fr"
				return
			}
		}

		for (let evt of L.events) {
			add_persistent_event(evt)
		}

		if (L.selected_key) G.holy_mother_russia_key = L.selected_key
		if (Array.isArray(G.active) && G.active.length === 0) {
			end()
		}
	}
}

P.play_card_for_orders = {
	_begin() {
		G.active = [RU, FR]
		L.played_card = [-1, -1]
		L.ops_played = [-1, -1]
		log("#Play Cards")
	},
	prompt() {
		if (L.played_card[R] === -1) {
			V.prompt = "Play a card for additional orders, or play a Dummy."
			for (let c of G.hand[R]) {
				action("card", c)
			}
		} else {
			V.prompt = `You played C${L.played_card[R]} for ${L.ops_played[R]} additional orders.`
			button("confirm")
			button("undo")
		}
	},
	card(c) {
		L.played_card[R] = c
		L.ops_played[R] = get_card_ops(c)
		array_delete_item(G.hand[R], c)
	},
	undo() {
		if (is_card_dummy(L.played_card[R])) {
			array_insert(G.hand[R], 0, L.played_card[R])
		} else {
			G.hand[R].push(L.played_card[R])
		}
		L.played_card[R] = -1
		L.ops_played[R] = -1
	},
	confirm() {
		set_delete(G.active, R)
		if (is_card_dummy(L.played_card[R])) { //Dummy returns straight back to hand
			array_insert(G.hand[R], 0, L.played_card[R]) //Keeping a consistent position since it is almost always in hand
		} else {
			discard_card(R, L.played_card[R]) //Cards played for OPs may not be removed
		}
		if (Array.isArray(G.active) && G.active.length === 0) {
			for (let who = RU; who <= FR; ++who) {
				log(`${ROLES[who]} played C${L.played_card[who]} for ${L.ops_played[who]} additional orders.`)
			}
			end()
		}
	}
}

/* Events that can be played now
	1  Well-Disciplined Retreat
	3  Opolchenie
	10 Scorched Earth
	13 Garrison Troops
	15 Pride and Hesitation
	16 Kutuzov Appointed
	17 The Finland Corps
	18 Treaty of Bucharest
	19 The Czar Leaves the Army

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

P.play_events = {
	_begin() {
		L.events = [[WELL_DISCIPLINED_RETREAT, OPOLCHENIE, SCORCHED_EARTH, GARRISON_TROOPS,
						PRIDE_AND_HESITATION, KUTUZOV_APPOINTED, THE_FINLAND_CORPS, TREATY_OF_BUCHAREST, THE_CZAR_LEAVES_THE_ARMY],
					[HARD_MARCHING_1, HARD_MARCHING_2, WAR_WEARINESS, HOLY_MOTHER_RUSSIA_FR, POLISH_SUPPORT, 
						PEACE_OFFER, DAVOUT_TAKES_COMMAND, IX_CORPS_ARRIVES, XI_CORPS_ARRIVES]]
		L.could_play_events = G.hand[G.active].filter(c => L.events[G.active].includes(c))	

	},
	prompt() {
		if (L.could_play_events.length > 0) {
			V.prompt = "Declare any events to be played with your OPs card."
			for (let c of L.could_play_events) {
				if (can_play_event(c)) {
					action("card", c)
				}
			}
		} else {
			V.prompt = "No eligible events can be played with your OPs card."
		}
		button("pass")
	},
	card(c) {
		push_undo()
		L.active_card = c
		card_box_begin(c)
		G.played_cards[G.active].push(c)
		call(`event_${c}`)
	},
	_resume() {
		if (is_permanent_removal_card(L.active_card)) {
			remove_card(G.active, L.active_card)
		} else {
			discard_card(G.active, L.active_card)
		}
		array_delete_item(L.could_play_events, L.active_card)
		card_box_end(L.active_card)
	},
	pass() {
		end()
	}
}

/* 
	Events:

*/

P.choose_orders = {

}

//=== EVENTS ===
function can_play_event(card) {
	if (get_card_season(card) !== get_season(G.turn)) return false
	let could_play_event = E[`event_${card}`]
	return (could_play_event === undefined) ? true : could_play_event()
}

function add_persistent_event(evt, params) {
	let removal_turn = (evt === WELL_DISCIPLINED_RETREAT) ? G.turn + 1 : G.turn
	let key = evt
	let value = Object.assign({remove: removal_turn}, params)
	map_set(G.persistent_events, key, value)
	console.log(G.persistent_events)
}

// RU #1: Well-Disciplined Retreat
P.event_1 = function() {end()}

//Opolchenie

// 	RU #15: Pride and Hesitation
E.event_15 = function() {return get_space_control(S_MOSCOW) === FR}

P.event_15 = {
	_begin() {
		L.has_shifted_initiative = false
	},
	prompt() {
		if (!L.has_shifted_initiative) {
			V.prompt = `C${PRIDE_AND_HESITATION}: Shift Initiative 1 in Russia's favor.`
			action("initiative", 0)
		} else {
			V.prompt = `C${PRIDE_AND_HESITATION}: This turn, the VP marker is shifted 1 in Russia's favor if any French leaders leave Moscow.`
			button("confirm")
		}
	},
	initiative() {
		push_undo()
		shift_initiative_in_favor_of_russia()
		L.has_shifted_initiative = true
	},
	confirm() {
		push_undo()
		add_persistent_event(PRIDE_AND_HESITATION)
		end()
	}
}

//Kutuzov Appointed
E.event_16 = function() {return get_month(G.turn) >= AUG}

//The Finland Corps
E.event_17 = function() {return get_month(G.turn) >= AUG}

//Treaty of Bucharest
E.event_18 = function() {return get_month(G.turn) >= AUG}

//	FR #1, #2: Hard Marching
P.event_55 = function() { goto("hard_marching", {card: HARD_MARCHING_1}) }
P.event_56 = function() { goto("hard_marching", {card: HARD_MARCHING_2}) }

P.hard_marching = {
	_begin() {
		//L.card
		L.step = -1
	},
	prompt() {
		switch(L.step) {
			case -1:
				V.prompt = `C${L.card}: Shift the Initiative 1 in France's favor.`
				action("initiative", 0)
				break
			case 0:
				V.prompt = `C${L.card}: Receive 1 free Forced March order, but 1 SP in each forced marching force is exhausted.`
				button("confirm")
				break
			case 1:
				V.prompt = `C${L.card}: This turn all French forces using 'Forced March' orders fight at X1 instead of X0,5.`
				button("confirm")
		}
	},
	initiative(id) {
		push_undo()
		shift_initiative_in_favor_of_france()
		log(`Shifted Initiative 1 in favor of France.`)
		L.step++
	},
	confirm() {
		push_undo()
		if (L.step === 0) {
			L.step++
			log("France receives 1 free Forced March order, but 1 SP in each forced marching force is exhausted.")
		} else {
			add_persistent_event(L.card)
			log("This turn all French forces using 'Forced March' orders fight at X1 instead of X0,5.")
			end()
		}
	}
}

function get_leader_short_name(leader) {
	return data.leaders[leader].short_name
}

// FR #3: War Weariness
P.event_57 = {
	_begin() {
		L.spaces_controlled = [S_MOSCOW, S_TORZHOK, S_BEZHANITZY, S_OSTROV, S_VENDEN].filter(s => is_fr_controlled(s))
		L.russian_eliminated_leaders = 	[]
		for (let i = first_ru_leader; i <= last_ru_leader; ++i) {
			if (G.leaders[i] === OUT_OF_PLAY) L.russian_eliminated_leaders.push(i)
		}
		L.french_vp = L.spaces_controlled.length + L.russian_eliminated_leaders.length
		L.vp_shifted = false
	},
	prompt() {
		if (!L.vp_shifted) {
			V.prompt = `C${WAR_WEARINESS}: Shift the VP marker ${L.french_vp} in France's favor.`
			action("vp", 0)
		} else {
			V.prompt = `C${WAR_WEARINESS}: All done.`
			button("confirm")
		}
		
	},
	vp(id) {
		push_undo()
		G.vp += L.french_vp
		log(`France +${L.french_vp} VP.`)
		for (let s of L.spaces_controlled) {
			log(`>${get_space_name(s)}`)
		}
		for (let leader of L.russian_eliminated_leaders) {
			log(`>${get_leader_short_name(leader)}`)
		}
		L.vp_shifted = true
	},
	confirm() {
		push_undo()
		end()
	}
}

// FR #4: Holy Mother Russia
P.event_58 = {
	_begin() {
		L.key_city = -1
	},
	prompt() {
		if (L.key_city === -1) {
			V.prompt = `C${HOLY_MOTHER_RUSSIA_FR}: Designate a Key City. France will gain 1 VP for each RU force that leaves the area via 'Force March', 'March' or 'Evade'.`
			for (let s = 1; s < space_count; ++s) {
				if (is_key_city(s)) {
					action("space", s)
				}
			}
		} else {
			V.prompt = `C${HOLY_MOTHER_RUSSIA_FR}: All done.`
			button("confirm")
		}
	},
	space(s) {
		L.key_city = s
		log(`This turn, France will gain 1 VP for each RU force that leaves ${get_space_name(L.key_city)} via 'Force March', 'March' or 'Evade'.`)
	},
	confirm() {
		add_persistent_event(HOLY_MOTHER_RUSSIA_FR, {space: L.key_city})
		end()
	}
}

// FR #5: Polish Support
E.event_59 = function() { 
	return [S_KOVNO, S_VILNA, S_VITEBSK].includes(get_leader_location(NAPOLEON))
}

P.event_59 = {
	_begin() {
		L.has_placed_troops = false
		L.space = get_space_name(get_leader_location(NAPOLEON))
		L.drawn_card = -1
	},
	prompt() {
		if (!L.has_placed_troops) {
			V.prompt = `C${POLISH_SUPPORT}: Place 2 Infantry SPs at ${L.space}.`
			action("space", get_leader_location(NAPOLEON))
		} else if (L.drawn_card === -1) {
			V.prompt = `C${POLISH_SUPPORT}: Draw a card.`
			button("draw")
		} else {
			V.prompt = `C${POLISH_SUPPORT}: You drew C${L.drawn_card}.`
			button("confirm")
		}
	},
	space(s) {
		push_undo()
		add_troop(FR, s, FRESH_INFANTRY, 2)
		log(`Placed 2 French Infantry at ${L.space}.`)
		L.has_placed_troops = true
	},
	draw() {
		clear_undo()
		L.drawn_card = draw_card(G.active)
		log("France drew a card.")
	},
	confirm() {
		goto("event_done", {card: POLISH_SUPPORT})
	}
}

// FR #15: Peace Offer
E.event_69 = function() {
	return is_fr_controlled(S_MOSCOW)
}

P.event_69 = {
	_begin() {
		L.spaces_controlled = [S_KIEV, S_TVER, S_RIGA, S_OSTROV, S_BEZHANITZY].filter(s => is_fr_controlled(s))
		L.step = -1
	},
	prompt() {
		if (L.step === -1) {
			V.prompt = `C${PEACE_OFFER}: Shift the VP Marker 1 in France's favor.`
			action("vp", 0)
		} else if (L.step === 0) {
			V.prompt = `C${PEACE_OFFER}: Shift the Initiative Marker 2 in France's favor.`
			action("initiative", 0)
		} else {
			V.prompt = `C${PEACE_OFFER}: Gain ${2 * L.spaces_controlled.length} VP.`
			button("confirm")
		}
	},
	vp(id) {
		push_undo()
		G.vp++
		log("France +1 VP.")
		L.step++
	},
	initiative(id) {
		push_undo()
		shift_initiative_in_favor_of_russia()
		shift_initiative_in_favor_of_russia()
		log("Initiative Marker shifted 2 in favor of Russia.")
	},
	confirm() {
		push_undo()
		log(`France +${2 * L.spaces_controlled.length} VP.`)
		for (let s of L.spaces_controlled) {
			log(`>${get_space_name(s)}`)
		}
		goto("event_done", {card: PEACE_OFFER})
	}
}

// FR #17: Davout Takes Command
P.event_71 = {
	_begin() {
		L.placed_leader = false
	},
	prompt() {
		if (!L.placed_leader) {
			V.prompt = `C${DAVOUT_TAKES_COMMAND}: Place Davout and 1 French Infantry SP in any French-occupied area.`
			for (let s = 1; s < space_count; ++s) {
				if (is_fr_controlled(s)) {
					action("space", s)
				}
			}
		} else {
			V.prompt = `C${DAVOUT_TAKES_COMMAND}: All done.`
			button("confirm")
		}
		
	},
	space(s) {
		push_undo()
		set_leader(s, DAVOUT)
		add_troop(FR, s, FRESH_INFANTRY, 1)
		L.placed_leader = true
		log(`Davout placed at ${get_space_name(s)}.`)
		log(`1 French Infantry SP placed at ${get_space_name(s)}.`)
	},
	confirm() {
		push_undo()
		end()
	}
}

P.event_done = {
	prompt() {
		V.prompt = `C${L.card}: All done.`
		button("confirm")
	},
	confirm() {
		push_undo()
		end()
	}
}

//=== LOGGING ===
function log_must_play_event(c, space = -1 /*For 'Holy Mother Russia' (Russian version)*/) {
	card_box_begin(c)
	switch(c) {
		case HOLY_MOTHER_RUSSIA_RU:
			if (space === -1) {
				log("Russia +2 orders this turn.")
			} else {
				log(`France selected ${get_space_name(space)}.`)
				log(`The side controlling ${get_space_name(space)} at the end of the turn gain +1 VP.`)
			}
			break
		case EXTREME_WEATHER_RU:
			log("Russia drew a card.")
			log("France has -2 orders this turn.")
			log("1 fresh SP in each force that uses 'March' or 'Forced March' becomes exhausted.")
			break
		case COMMAND_FRICTION:
			log("France may designate an area with more than 1 RU leader at the beginning of the 'Place Orders' phase.")
			break
		case POOR_LOGISTICS:
			log("Russia may not use 'Place Depot' orders this turn.")
			break
		case DEVASTATED_COUNTRYSIDE:
			log("The effect of Devastation markers is doubled this turn.")
			break
		case BARCLAY_DE_TOLLY_RESIGNS:
			log("Barclay de Tolly removed.")
			break
		case POOR_COMMUNICATIONS:
			log("At the end of the 'Place Orders' phase, RU may designate 1 placed FR order to remove.")
			break
		case JEROME_GOES_HOME:
			log("Jérôme Bonaparte removed.")
			break
		case CHAOS_IN_THE_REAR_AREAS:
			log("Not implemented yet.")
			break
	}
	card_box_end()
}

function log_h1(text) {
	log()
	log(`=${text}`)
	log()
}

function card_box_begin(card) {
	log()
	log(`{C${card}`)
}

function card_box_end() {
	log ("}")
}

//=== FRAMEWORK ===
function on_query(q) {}
function on_assert() {}
//function on_static_view() {}

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