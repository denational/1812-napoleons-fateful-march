"use strict"

const RUSSIA = 0
const FRANCE = 1
const PRUSSIA = 2
const AUSTRIA = 3

const ROLES = ["Russia", "France"]
const abbreviations = ["ru", "fr", "pr", "au"]

function get_abbreviation(who) {
	return abbreviations[who]
}

function enemy(who) {
	return 1 - who
}

/* SPACES */
const areas = data.areas
const area_length = areas.length

const POOL = 0
const FRENCH_CASUALTIES = 157
const OUT_OF_PLAY = -1

function get_area_name(area) {
	return areas[area].name
}

/* CARDS */
const C_SCORCHED_EARTH = 10
const C_PRIDE_AND_HESITATION = 15
const C_KUTUZOV_APPOINTED = 16
const C_THE_FINLAND_CORPS = 17
const C_TREATY_OF_BUCHAREST = 18
const C_THE_CZAR_LEAVES_THE_ARMY = 19
const C_EXHAUSTING_MARCH_1 = 25
const C_EXHAUSTING_MARCH_2 = 26
const C_DISORDERLY_MARCH = 48
const C_COSSACK_PATROLS = 49

const C_HARD_MARCHING_2 = 56
const C_HOLY_MOTHER_RUSSIA_FR = 58
const C_INFIGHTING_AND_INTRIGUE = 62
const C_PEACE_OFFER = 69
const C_DAVOUT_TAKES_COMMAND = 71
const C_IX_CORPS_ARRIVES = 73
const C_XI_CORPS_ARRIVES = 74
const C_COURAGE_OF_DESPERATION = 104
const C_NEYS_ESCAPE = 106
const C_LETHARGIC_PURSUIT = 107

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

const leaders = data.leaders
const first_ru_leader = 0
const last_ru_leader = 7
const first_fr_leader = 8
const last_fr_leader = 13

function get_leader_name(leader) {
	return leaders[leader].name
}

function get_leader_short_name(leader) {
	return leaders[leader].short_name
}

function get_leader_location(leader) {
	return V.leaders[leader]
}

function get_leader_faction(leader) {
	return leaders[leader].faction
}

function get_first_leader(faction) {
	return (faction === RUSSIA) ? first_ru_leader : first_fr_leader
}

function get_last_leader(faction) {
	return (faction === RUSSIA) ? last_ru_leader : last_fr_leader
}

function has_friendly_leader(who, s) {
	return get_seniormost_leader(who, s) !== -1
}

/* ORDERS */
const first_ru_order = 1
const last_ru_order = 28
const first_fr_order = 29
const last_fr_order = 53

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

function get_first_order(who) {
	return (who === RUSSIA) ? first_ru_order : first_fr_order
}

function get_last_order(who) {
	return (who === RUSSIA) ? last_ru_order : last_fr_order
}

function get_player_orders(who) {
	return (who === RUSSIA) ? G.russian.orders : (who === FRANCE) ? G.french.orders : null
}

function get_order_type_name(type) {
	switch(type) {
	case FORCED_MARCH: return "forced_march"
	case CAVALRY_PATROLS: return "cavalry_patrols"
	case MARCH: return "march"
	case EVADE: return "evade"
	case DEFEND: return "defend"
	case RALLY: return "rally"
	case COSSACK_RAID: return "cossack_raid"
	case PLACE_DEPOT: return "place_depot"
	case FORAGE: return "forage"
	case DUMMY_ORDER: return "dummy_order"
	default: return type
	}
}

/* TROOPS */
const FRESH_INFANTRY = 0
const EXHAUSTED_INFANTRY = 1
const FRESH_CAVALRY = 2
const EXHAUSTED_CAVALRY = 3
const FRESH_COSSACK = 4
const EXHAUSTED_COSSACK = 5
const FRESH_GUARD = 6
const EXHAUSTED_GUARD = 7

const FRESH_PRUSSIAN_INFANTRY = 8
const EXHAUSTED_PRUSSIAN_INFANTRY = 9
const FRESH_AUSTRIAN_INFANTRY = 10
const EXHAUSTED_AUSTRIAN_INFANTRY = 11

const TROOP_ENTRY_WHO_SHIFT = 10
const TROOP_ENTRY_TYPE_SHIFT = 6
const TROOP_ENTRY_NUM_SHIFT = 0

const TROOP_ENTRY_WHO_MASK = 1024
const TROOP_ENTRY_TYPE_MASK = 960
const TROOP_ENTRY_NUM_MASK = 63

const first_ru_inf = 0
const last_ru_inf = 79
const first_fr_inf = 80
const last_fr_inf = 134
const first_fr_pr_inf = 135
const last_fr_pr_inf = 139
const first_fr_au_inf = 140
const last_fr_au_inf = 150

const first_ru_cav = 151
const last_ru_cav = 166
const first_fr_cav = 180
const last_fr_cav = 210

const first_ru_cossack = 211
const last_ru_cossack = 230

const first_fr_guard = 231
const last_fr_guard = 240

var used_troops = [
	[first_ru_inf, first_fr_inf, first_fr_pr_inf, first_fr_au_inf],
	[first_ru_cav, first_fr_cav],
	[first_ru_cossack, first_fr_guard],
]

const last_troops = [
	[last_ru_inf, last_fr_inf, last_fr_pr_inf, last_fr_au_inf],
	[last_ru_cav, last_fr_cav],
	[last_ru_cossack, last_fr_guard],
]

var used_half_strength = [0, 0]

const INFANTRY = 0
const CAVALRY = 1
const SPECIAL = 2

function get_troop_name(type) {
	switch(type) {
	case FRESH_INFANTRY:
	case EXHAUSTED_INFANTRY:
	case FRESH_PRUSSIAN_INFANTRY:
	case EXHAUSTED_PRUSSIAN_INFANTRY:
	case FRESH_AUSTRIAN_INFANTRY:
	case EXHAUSTED_AUSTRIAN_INFANTRY:
		return "infantry"
	case FRESH_CAVALRY:
	case EXHAUSTED_CAVALRY:
		return "cavalry"
	case FRESH_COSSACK:
	case EXHAUSTED_COSSACK:
		return "cossack"
	case FRESH_GUARD:
	case EXHAUSTED_GUARD:
		return "guard"
	default:
		return "unknown"
	}
}

function get_troop_bucket(type) {
	switch(type) {
	case FRESH_INFANTRY:
	case EXHAUSTED_INFANTRY:
	case FRESH_CAVALRY:
	case EXHAUSTED_CAVALRY:
	case FRESH_PRUSSIAN_INFANTRY:
	case FRESH_AUSTRIAN_INFANTRY:
		return get_troop_name(type)
	default:
		return "special"
	}
}

function is_fresh(type) {
	switch(type) {
	case FRESH_INFANTRY:
	case FRESH_CAVALRY:
	case FRESH_COSSACK:
	case FRESH_GUARD:
	case FRESH_PRUSSIAN_INFANTRY:
	case FRESH_AUSTRIAN_INFANTRY:
		return true
	}
	return false
}

function get_exhaustion(type) {
	return is_fresh(type) ? "fresh" : "exhausted"
}

function get_used(who, type) {
	switch(type) {
	case FRESH_INFANTRY:
	case EXHAUSTED_INFANTRY:
		return used_troops[INFANTRY][who]
	case FRESH_CAVALRY:
	case EXHAUSTED_CAVALRY:
		return used_troops[CAVALRY][who]
	case FRESH_COSSACK:
	case EXHAUSTED_COSSACK:
		return used_troops[SPECIAL][RUSSIA]
	case FRESH_GUARD:
	case EXHAUSTED_GUARD:
		return used_troops[SPECIAL][FRANCE]
	case FRESH_PRUSSIAN_INFANTRY:
	case EXHAUSTED_PRUSSIAN_INFANTRY:
		return used_troops[INFANTRY][PRUSSIA]
	case FRESH_AUSTRIAN_INFANTRY:
	case EXHAUSTED_AUSTRIAN_INFANTRY:
		return used_troops[INFANTRY][AUSTRIA]
	}
}

function incr_used(who, type) {
	switch(type) {
	case FRESH_INFANTRY:
	case EXHAUSTED_INFANTRY:
		return used_troops[INFANTRY][who]++
	case FRESH_CAVALRY:
	case EXHAUSTED_CAVALRY:
		return used_troops[CAVALRY][who]++
	case FRESH_COSSACK:
	case EXHAUSTED_COSSACK:
		return used_troops[SPECIAL][RUSSIA]++
	case FRESH_GUARD:
	case EXHAUSTED_GUARD:
		return used_troops[SPECIAL][FRANCE]++
	case FRESH_PRUSSIAN_INFANTRY:
	case EXHAUSTED_PRUSSIAN_INFANTRY:
		return used_troops[INFANTRY][PRUSSIA]++
	case FRESH_AUSTRIAN_INFANTRY:
	case EXHAUSTED_AUSTRIAN_INFANTRY:
		return used_troops[INFANTRY][AUSTRIA]++
	}
}

function reset_used() {
	used_troops = [
		[first_ru_inf, first_fr_inf, first_fr_pr_inf, first_fr_au_inf],
		[first_ru_cav, first_fr_cav],
		[first_ru_cossack, first_fr_guard],
	]
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


function is_cavalry(troop_type) {
	return (troop_type === FRESH_CAVALRY) || (troop_type === EXHAUSTED_CAVALRY)
}

function is_cossack(troop_type) {
	return (troop_type === FRESH_COSSACK) || (troop_type === EXHAUSTED_COSSACK)
}

/* TIME */
const JUNE_5 = 0
const JULY_R = 1
const JULY_5 = 6
const AUG_R = 7
const AUG_5 = 12
const SEPT_R = 13
const SEPT_5 = 18
const OCT_R = 19
const OCT_5 = 24
const NOV_R = 25
const NOV_5 = 30

var num_devastated = 0

const FIRST_AREA = 1
const LAST_AREA = 156

const FIRST_CONNECTION = 1
const LAST_CONNECTION = 261

const NO_MOVE = -1

/* MISC FUNCTIONS */
function process_area_name(name) {
	name = name.replace(/(Grand Duchy of Warsaw|Prussia) (North|South)/, "$1")
	name = name.replace(/^Unnamed\W.*/, "Unnamed")
	name = name.replace(/^Vladimir\W.*/, "Vladimir")

	return name
}


function get_pool_depots(side) {
	return (side === RUSSIA) ? "ru_pool_depots" : "fr_pool_depots"
}

function translate_right(rect, amt) {
	rect[0] += amt
	return rect
}

//=== INITIALIZE VIEW ===
function on_init() {
	define_board("#map", 2500, 2027, [0, 0, 0, 0])
	define_panel("#plan_orders", "plan_orders", 0)
	define_panel("#played", "played", 0)
	define_panel("#hand", "hand", 0)
	define_panel("#ru_leaders", "leaders", RUSSIA)
	define_panel("#fr_leaders", "leaders", FRANCE)
   
	/* SPACES */
	for (let area = FIRST_AREA; area <= LAST_AREA; ++area) {
		define_space("area", area, layout[get_area_name(area)], areas[area].type)
			.tooltip(`${process_area_name(get_area_name(area))} (${areas[area].zone})`)
		
		define_stack("area_stack", area, layout[get_area_name(area)], -20, -20, 0, -58, 0, 36, 1, 4)
		define_stack("orders_stack", area, translate_right(layout[get_area_name(area)], 52), 0, -100, 0, -125)
	}

	for (let connection = FIRST_CONNECTION; connection <= LAST_CONNECTION; ++connection) {
		define_space("connection", connection, layout[`Connection${connection}`]).tooltip(`Connection${connection}`)
		define_stack("connection_stack", connection, layout[`Connection${connection}`], -20, -20, 0, -58, 0, 36, 1, 4, 0.5, 0.5)
	}

	define_layout("ru_pool_depots", 0, layout["Russia Pool Depots"])
	define_layout("fr_pool_depots", 0, layout["France Pool Depots"])
	define_layout("ru_pool_leaders", 0, layout["Russia Pool Leaders"])
	define_layout("fr_pool_leaders", 0, layout["France Pool Leaders"])
	define_layout("fr_casualties", 0, layout["France Casualties"])

	/* ORDERS */
	for (let id = first_ru_order; id <= last_fr_order; ++id) {
		define_piece("order", id, `${get_order_type_name(data.orders[id].type)} ${get_abbreviation(data.orders[id].owner)}`)
	}

	/* LEADERS */
	function define_leader_board(leader) {
		const leader_board = define_thing("leader_board", leader)
			.keyword(get_leader_short_name(leader))
		define_thing("subordinate_leaders", leader)
			.static_child(leader_board)
			.keyword("square")
		define_thing("subordinate_infantry", leader)
			.static_child(leader_board)
			.keyword("square")
		define_thing("subordinate_cavalry", leader)
			.static_child(leader_board)
			.keyword("square")
		define_thing("subordinate_special", leader)
			.static_child(leader_board)
			//.keyword("square")
	}

	for (let leader = 0; leader < leaders.length; ++leader) {
		define_piece("leader", leader, get_leader_short_name(leader))
			.stackable()
		define_leader_board(leader)
	}

	/* TROOPS */
	//Modified define_piece_list()
	function define_troop_list(action, a, b, keywords) {
		for (var i = a; i <= b; ++i) {
			let troop = define_piece(action, i, keywords)
				.stackable()
			define_thing("troop-text", i)
		}
	}

	define_troop_list("infantry", first_ru_inf, last_ru_inf, "ru")
	define_troop_list("infantry", first_fr_inf, last_fr_inf, "fr")
	define_troop_list("infantry", first_fr_pr_inf, last_fr_pr_inf, "pr")
	define_troop_list("infantry", first_fr_au_inf, last_fr_au_inf, "au")

	define_troop_list("cavalry", first_ru_cav, last_ru_cav, "ru")
	define_troop_list("cavalry", first_fr_cav, last_fr_cav, "fr")

	define_troop_list("cossack", first_ru_cossack, last_ru_cossack, "ru")
	define_troop_list("guard", first_fr_guard, last_fr_guard, "fr")

	/* CARDS */
	define_card_list("card", 0, 107, "card_")

	/* DEVASTATION/DEPOTS */
	define_marker_list("devastation", 0, 80)
	define_marker_list("depot", 0, 13, "ru")
	define_marker_list("depot", 14, 20, "fr")
	define_marker_list("attrition_checked", 0, 80)

	define_marker_list("half_strength_ru", 0, 150)
	define_marker_list("half_strength_fr", 0, 150)

	/* TRACKS */
	define_layout_track_v("track-vp", 0, 20, layout["VP Track"])
	define_marker("vp", 0)
	define_layout("track-time", JUNE_5, layout["June 5"])
	define_layout_track_h("track-time", JULY_5, JULY_R, layout["July"])
	define_layout_track_h("track-time", AUG_5, AUG_R, layout["AUG"])
	define_layout_track_h("track-time", SEPT_5, SEPT_R, layout["SEPT"])
	define_layout_track_h("track-time", OCT_5, OCT_R, layout["OCT"])
	define_layout_track_h("track-time", NOV_5, NOV_R, layout["NOV"])
	define_marker("time", 0, "current")
	define_marker("time", 1, "end")

	define_layout_track_v("track-initiative", 1, 4, layout["Initiative Track"])
	define_marker("initiative", 0)
}

//=== UPDATE VIEW ===
function on_update() {
	begin_update()

	roles[RUSSIA].stat.innerHTML = `${V.hand_length[RUSSIA]} cards`
	roles[FRANCE].stat.innerHTML = `${V.hand_length[FRANCE]} cards`

	//Reset counters
	reset_used()
	used_half_strength[RUSSIA] = 0
	used_half_strength[FRANCE] = 0
	num_devastated = 0

	update_tracks()
	update_leaders()
	update_troops()
	update_depots()
	update_devastation()
	update_orders()

	for (let c of V.current_hand) {
		populate("hand", 0, "card", c)
	}

	if (V.played_cards && V.played_cards[R])
		for (let c of V.played_cards[R])
			populate("played", 0, "card", c)

	for (let leader = 0; leader <= 13; ++leader) {
		action_button_with_argument(`leader_button`, leader, leaders[leader].log_name)
		if (V.move && V.move.leaders) {
			let btn = document.getElementById("leader_button_" + leader + "_button")
			if (btn)
				btn.classList.toggle("button_selected", set_has(V.move.leaders, leader))
		}
	}

	if (V.attrition_checked) {
		let marker = 0
		for (let area of V.attrition_checked)
			populate("area_stack", area, "attrition_checked", marker++)
	}

	action_button_with_argument("troop", FRESH_INFANTRY, "Infantry")
	action_button_with_argument("troop", EXHAUSTED_INFANTRY, "Exh. Infantry")
	action_button_with_argument("troop", FRESH_CAVALRY, "Cavalry")
	action_button_with_argument("troop", EXHAUSTED_CAVALRY, "Exh. Cavalry")
	action_button_with_argument("troop", FRESH_COSSACK, "Cossack")
	action_button_with_argument("troop", EXHAUSTED_COSSACK, "Exh. Cossack")
	action_button_with_argument("troop", FRESH_GUARD, "Guard")
	action_button_with_argument("troop", EXHAUSTED_GUARD, "Exh. Guard")
	action_button_with_argument("troop", FRESH_PRUSSIAN_INFANTRY, "Pr. Infantry")
	action_button_with_argument("troop", EXHAUSTED_PRUSSIAN_INFANTRY, "Exh. Pr. Infantry")
	action_button_with_argument("troop", FRESH_AUSTRIAN_INFANTRY, "Au. Infantry")
	action_button_with_argument("troop", EXHAUSTED_AUSTRIAN_INFANTRY, "Exh. Au. Infantry")

	action_button_with_argument("troop_2x", FRESH_INFANTRY, "2x Infantry")
	action_button_with_argument("troop_2x", FRESH_PRUSSIAN_INFANTRY, "2x Pr. Infantry")
	action_button_with_argument("troop_2x", FRESH_AUSTRIAN_INFANTRY, "2x Au. Infantry")
	action_button_with_argument("troop_2x", EXHAUSTED_INFANTRY, "2x Exh. Infantry")
	action_button_with_argument("troop_2x", EXHAUSTED_PRUSSIAN_INFANTRY, "2x Exh. Pr. Infantry")
	action_button_with_argument("troop_2x", EXHAUSTED_AUSTRIAN_INFANTRY, "2x Exh. Au. Infantry")

	action_button_with_argument("add_troop", FRESH_INFANTRY, "+ Inf.")
	action_button_with_argument("remove_troop", FRESH_INFANTRY, "- Inf.")
	action_button_with_argument("add_troop", EXHAUSTED_INFANTRY, "+ Exh. Inf.")
	action_button_with_argument("remove_troop", EXHAUSTED_INFANTRY, "- Exh. Inf.")
	action_button_with_argument("add_troop", FRESH_CAVALRY, "+ Cav.")
	action_button_with_argument("remove_troop", FRESH_CAVALRY, "- Cav.")
	action_button_with_argument("add_troop", EXHAUSTED_CAVALRY, "+ Exh. Cav.")
	action_button_with_argument("remove_troop", EXHAUSTED_CAVALRY, "- Exh. Cav.")
	action_button_with_argument("add_troop", FRESH_COSSACK, "+ Coss.")
	action_button_with_argument("remove_troop", FRESH_COSSACK, "- Coss.")
	action_button_with_argument("add_troop", EXHAUSTED_COSSACK, "+ Exh. Coss.")
	action_button_with_argument("remove_troop", EXHAUSTED_COSSACK, "- Exh. Coss.")
	action_button_with_argument("add_troop", FRESH_GUARD, "+ Guard")
	action_button_with_argument("remove_troop", FRESH_GUARD, "- Guard")
	action_button_with_argument("add_troop", EXHAUSTED_GUARD, "+ Exh. Guard")
	action_button_with_argument("remove_troop", EXHAUSTED_GUARD, "- Exh. Guard")
	action_button_with_argument("add_troop", FRESH_PRUSSIAN_INFANTRY, "+ Pr. Inf.")
	action_button_with_argument("remove_troop", FRESH_PRUSSIAN_INFANTRY, "- Pr. Inf.")
	action_button_with_argument("add_troop", EXHAUSTED_PRUSSIAN_INFANTRY, "+ Exh. Pr. Inf.")
	action_button_with_argument("remove_troop", EXHAUSTED_PRUSSIAN_INFANTRY, "- Exh. Pr. Inf.")
	action_button_with_argument("add_troop", FRESH_AUSTRIAN_INFANTRY, "+ Au. Inf.")
	action_button_with_argument("remove_troop", FRESH_AUSTRIAN_INFANTRY, "- Au. Inf.")
	action_button_with_argument("add_troop", EXHAUSTED_AUSTRIAN_INFANTRY, "+ Exh. Au. Inf.")
	action_button_with_argument("remove_troop", EXHAUSTED_AUSTRIAN_INFANTRY, "- Exh. Au. Inf.")

	action_button("select_all", "Select All")
	action_button("shuffle", "Shuffle Deck")
	action_button("discard_and_redraw", "Discard & Redraw")
	action_button("combine", "Combine")
	action_button("add_1_to_attrition_distance", "Add 1 to Attrition Distance")

	action_button_with_argument("move_type", -1, "SPs that have not moved")
	action_button_with_argument("move_type", 0, "Forced March SPs")
	action_button_with_argument("move_type", 2, "March SPs")

	action_button("place_order", "Place Order")
	action_button("change_order", "Change Order")

	action_button("remove_defend_order", "Remove Defend Order")
	action_button("cancel_river_effect", "Cancel River Effect")

	action_button("roll", "Roll")
	action_button("eliminate", "Eliminate")

	action_button("exhaust", "Exhaust")
	action_button("eliminate_2", "Eliminate 2")

	action_button("done", "Done")
	action_button("next", "Next")
	action_button("draw", "Draw")
	action_button("discard", "Discard")
	action_button("confirm", "Confirm")

	action_button("russia", "Russia")
	action_button("france", "France")
	action_button("pass", "Pass")

	action_button_with_argument("card_button", C_SCORCHED_EARTH, "#10 Scorched Earth")
	action_button_with_argument("card_button", C_PRIDE_AND_HESITATION, "#15 Pride and Hesitation")
	action_button_with_argument("card_button", C_KUTUZOV_APPOINTED, "#16 Kutuzov Appointed")
	action_button_with_argument("card_button", C_THE_FINLAND_CORPS, "#17 The Finland Corps")
	action_button_with_argument("card_button", C_TREATY_OF_BUCHAREST, "#18 Treaty of Bucharest")
	action_button_with_argument("card_button", C_THE_CZAR_LEAVES_THE_ARMY, "#19 The Czar Leaves The Army")
	action_button_with_argument("card_button", C_EXHAUSTING_MARCH_1, "#25 Exhausting March")
	action_button_with_argument("card_button", C_EXHAUSTING_MARCH_2, "#26 Exhausting March")
	action_button_with_argument("card_button", C_DISORDERLY_MARCH, "#48 Disorderly March")
	action_button_with_argument("card_button", C_COSSACK_PATROLS, "#49 Cossack Patrols")
	
	action_button_with_argument("card_button", C_HARD_MARCHING_2, "#2 Hard Marching")
	action_button_with_argument("card_button", C_HOLY_MOTHER_RUSSIA_FR, "#4 Holy Mother Russia")
	action_button_with_argument("card_button", C_INFIGHTING_AND_INTRIGUE, "#8 Infighting amp; Intrigue")
	action_button_with_argument("card_button", C_PEACE_OFFER, "#15 Peace Offer")
	action_button_with_argument("card_button", C_DAVOUT_TAKES_COMMAND, "#16 Davout Takes Command")
	action_button_with_argument("card_button", C_IX_CORPS_ARRIVES, "#19 IX Corps Arrives")
	action_button_with_argument("card_button", C_XI_CORPS_ARRIVES, "#20 XI Corps Arrives")
	action_button_with_argument("card_button", C_COURAGE_OF_DESPERATION, "#50 Courage of Desperation")
	action_button_with_argument("card_button", C_NEYS_ESCAPE, "#52 Ney's Escape")
	action_button_with_argument("card_button", C_LETHARGIC_PURSUIT, "#53 Lethargic Pursuit")

	action_button("undo", "Undo")

	end_update()
}

function is_seniormost_leader(leader, area) {
	return get_seniormost_leader(get_leader_faction(leader), area) === leader
}

function get_seniormost_leader(who, area) {
	for (let leader of V.seniority[who]) {
		if (get_leader_location(leader) === area) {
			return leader
		}
	}
	return -1
}

function update_tracks() {
	//Time
	populate("track-time", V.turn, "time", 0)
	populate("track-time", V.end_turn, "time", 1)

	//VP
	if (V.vp >= 0) {
		update_keyword("vp", 0, "fr")
	} else {
		update_keyword("vp", 0, "ru")
	}
	populate("track-vp", Math.min(Math.max(0, Math.abs(V.vp)), 20), "vp", 0)

	//Initiative
	if (V.initiative >= 0) {
		update_keyword("initiative", 0, "fr")
	} else {
		update_keyword("initiative", 0, "ru")
	}
	populate("track-initiative", Math.abs(V.initiative), "initiative", 0)
}

function has_battle(area) {
	return map_has(V.battles, area)
}

function get_battle_entry(area, fallback) {
	return map_get(G.battles, area, fallback)
}

function get_battle_attacker(area) {
	return map_get(V.battles, area, null)?.attacker.who ?? -1
}

function get_battle_defender(area) {
	return map_get(V.battles, area, null)?.defender.who ?? -1
}

function find_connection(a, b) {
	return data.connections.findIndex(conn => (set_has(conn, a) && set_has(conn, b)))
}

function get_attacker_data(area) {
	return get_battle_entry(area, null)?.attacker ?? null
}

function get_defender_data(area) {
	return get_battle_entry(area, null)?.defender ?? null
}

function get_player_battle_data(who, area) {
	return is_battle_attacker(who, area) ? get_attacker_data(area) : get_defender_data(area)
}

function is_battle_attacker(who, area) {
	return get_battle_attacker(area) === who
}

function is_battle_defender(who, area) {
	return get_battle_defender(area) === who
}

function get_leaders_on_connection(who, area, from) {
	let leaders = []
	let battle_data = is_battle_attacker(who, area) ? get_attacker_data(area) : get_defender_data(area)
	for (let entry of battle_data.forces) {
		if ((entry.from === from) && (entry.leaders.length > 0)) {
			for (let leader of entry.leaders) set_add(leaders, leader)
		} 
	}
	return leaders
}

function get_leader_battle_origin(leader, battle) {
	let battle_data
	if (get_battle_attacker(battle) === get_leader_faction(leader))
		battle_data = get_attacker_data(battle)
	else
		battle_data = get_defender_data(battle)
		
	for (let entry of battle_data.forces) {
		if (set_has(entry.leaders, leader)) return entry.from
	}
	return -1
}

function get_seniormost_leader_from_list(who, list) {
	return V.seniority[who].find(leader => list.includes(leader))
}

function get_seniormost_leader_on_connection(who, from, to)  {
	let leaders = []
	for (let entry of get_player_battle_data(who, to).forces) {
		if (entry.from === from)
			entry.leaders.forEach(leader => set_add(leaders, leader))
	}
	return leaders.length > 0 ? get_seniormost_leader_from_list(who, leaders) : -1
}

function update_leaders() {
	for (let leader = 0; leader < V.leaders.length; ++leader) {
		let location = get_leader_location(leader)
		switch(location) {
		case OUT_OF_PLAY:
			populate((get_leader_faction(leader) === RUSSIA) ? "fr_pool_leaders" : "ru_pool_leaders", 0, "leader", leader)
			break
		case POOL:
			populate((get_leader_faction(leader) === RUSSIA) ? "ru_pool_leaders" : "fr_pool_leaders", 0, "leader", leader)
			break
		case FRENCH_CASUALTIES:
			populate("fr_casualties", 0, "leader", leader)
			break
		default:			
			if (has_battle(location)) {
				for (let force of get_player_battle_data(get_leader_faction(leader), location).forces) {
					if (set_has(force.leaders, leader)) {
						if (force.from === location) {
							if (get_seniormost_leader_on_connection(get_leader_faction(leader), location, location) === leader) {
								populate("area_stack", get_leader_location(leader), "leader", leader)
								populate("leaders", get_leader_faction(leader), "leader_board", leader)
							} else {
								populate("subordinate_leaders", get_seniormost_leader_on_connection(get_leader_faction(leader), force.from, location), "leader", leader)
							}
						} else {
							if (get_seniormost_leader_on_connection(get_leader_faction(leader), force.from, location) === leader) {
								populate("connection_stack", find_connection(location, force.from), "leader", leader)
								populate("leaders", get_leader_faction(leader), "leader_board", leader)
							} else {
								populate("subordinate_leaders", get_seniormost_leader_on_connection(get_leader_faction(leader), force.from, location), "leader", leader)
							}
						}
					}
				}
			} else {
				if (is_seniormost_leader(leader, get_leader_location(leader))) {
					populate("area_stack", get_leader_location(leader), "leader", leader)
					populate("leaders", get_leader_faction(leader), "leader_board", leader)
				} else 
					populate("subordinate_leaders", get_seniormost_leader(get_leader_faction(leader), get_leader_location(leader)), "leader", leader)
			}
		}
	}
}

function has_bridge(from, to) {
	return data.areas[from].bridge.includes(to)
}

function update_troops() {
	// V.troops is a plain array map keyed by area and each value contains a set of bitpacked troop entries
	map_for_each(V.troops, (area, entries) => {
		for (let entry of entries) {
			// Unravel bitmasks
			let player = decode_troop_entry_who(entry)
			let type = decode_troop_entry_type(entry)
			let num = decode_troop_entry_num(entry)

			// Map to lookup what number to populate on each troop marker
			let troop_nums = []

			// Population logic
			// To make battle calculations easier on the server, SPs participating in battle are all 'within' the area where the battle is occuring.
			// However:
			// Some SPs need to be populated on the connections corresponding to where they entered from.
			// All attacking SPs are populated on connections.
			// Defending SPs which were in the area before the battle started are populated within the area.
			// Defending SPs which entered after the battle started are populated on the connection from which they entered the area.

			// Battle population logic
			if (has_battle(area)) {
				// All battle entries use V.battles as basis to populate them onto the right places.
				// Attacker: All SPs are populated on connections.				

				for (let force of get_player_battle_data(player, area).forces) {
					if (force.troops[type] > 0) 
					{
						// Update the exhaustion status of the next unused troop piece of the current type
						update_keyword(get_troop_name(type), get_used(player, type), is_fresh(type) ? "fresh" : "exhausted")
						
						// Defending forces who were in the area before the battle started
						if (force.from === area) {
							if (get_seniormost_leader_on_connection(player, area, area) > -1) {
								populate( 
									`subordinate_${get_troop_bucket(type)}`, get_seniormost_leader_on_connection(player, force.from, area),
									get_troop_name(type), get_used(player, type)
								)
								populate(get_troop_name(type), get_used(player, type), "troop-text", get_used(player, type))
							}
							else {
								populate(
									`area_stack`, area,
									get_troop_name(type), get_used(player, type)
								)
								populate(get_troop_name(type), get_used(player, type), "troop-text", get_used(player, type))
							}
						} 
						else {
							// SPs with a leader on their connection go to his mat
							if (get_seniormost_leader_on_connection(player, force.from, area) > -1) {
								populate(
									`subordinate_${get_troop_bucket(type)}`, get_seniormost_leader_on_connection(player, force.from, area),
									get_troop_name(type), get_used(player, type)
								)
								populate(get_troop_name(type), get_used(player, type), "troop-text", get_used(player, type))
							} 
							// Otherwise they are populated on the map
							else {
								populate(
									`connection_stack`, find_connection(force.from, area),
									get_troop_name(type), get_used(player, type)
								)
								populate(get_troop_name(type), get_used(player, type), "troop-text", get_used(player, type))
							}
						}

						if (force.move_type === FORCED_MARCH)
							populate(get_troop_name(type), get_used(player, type), `half_strength_${get_abbreviation(player)}`, used_half_strength[player]++)

						if (is_battle_attacker(player, area) && has_bridge(force.from, area))
							populate(get_troop_name(type), get_used(player, type), `half_strength_${get_abbreviation(player)}`, used_half_strength[player]++)
						
						if (!map_has(troop_nums, get_used(player, type)))
							map_set(troop_nums, get_used(player, type), force.troops[type])

						incr_used(player, type)
					}
				}
			}
			else {
				let num_moved = 0

				if (map_has(V.moved, area) && map_get(V.moved, area, null).some(force => force.move_type === FORCED_MARCH)) {
					for (let force of map_get(V.moved, area, null)) {
						if (force.faction === player && force.troops[type] > 0 && force.move_type === FORCED_MARCH) {
							update_keyword(get_troop_name(type), get_used(player, type), is_fresh(type) ? "fresh" : "exhausted")

							if (has_friendly_leader(player, area)) {
								populate(
									`subordinate_${get_troop_bucket(type)}`, get_seniormost_leader(player, area),
									get_troop_name(type), get_used(player, type)
								)
								populate(get_troop_name(type), get_used(player, type), "troop-text", get_used(player, type))
							} else {
								populate(
									"area_stack", area, 
									get_troop_name(type), get_used(player, type)
								)
								populate(get_troop_name(type), get_used(player, type), "troop-text", get_used(player, type))
							}

							num_moved += force.troops[type]
							populate(get_troop_name(type), get_used(player, type), `half_strength_${get_abbreviation(player)}`, used_half_strength[player]++)

							if (!map_has(troop_nums, get_used(player, type)))
								map_set(troop_nums, get_used(player, type), force.troops[type])

							incr_used(player, type)
						}
					}
				}

				// Default population logic
				// If there is a friendly leader in the area, put SPs there on his mat
				if (num > num_moved) {
					update_keyword(get_troop_name(type), get_used(player, type), is_fresh(type) ? "fresh" : "exhausted")

					if (has_friendly_leader(player, area)) {
						populate(
							`subordinate_${get_troop_bucket(type)}`, get_seniormost_leader(player, area),
							get_troop_name(type), get_used(player, type)
						)
						populate(get_troop_name(type), get_used(player, type), "troop-text", get_used(player, type))
					} else {
						if (area === FRENCH_CASUALTIES) {
							populate("fr_casualties", 0, get_troop_name(type), get_used(player, type))
							populate(get_troop_name(type), get_used(player, type), "troop-text", get_used(player, type))
						} else {
							populate("area_stack", area, get_troop_name(type), get_used(player, type))
							populate(get_troop_name(type), get_used(player, type), "troop-text", get_used(player, type))
						}
					}

					if (!map_has(troop_nums, get_used(player, type)))
						map_set(troop_nums, get_used(player, type), num - num_moved)
					incr_used(player, type)
				}
			}
			map_for_each(troop_nums, (id, count) => {
				update_text("troop-text", id, count)
			})
		}
	})
}

function update_depots() {
	for (let depot = 0; depot < V.depots.length; ++depot) {
		if (V.depots[depot] === POOL) {
			populate(get_pool_depots((depot < 14 ? RUSSIA : FRANCE)), 0, "depot", depot)
		} else {
			populate("area", V.depots[depot], "depot", depot)
		}
	}
}

function update_devastation() {
	let num_devastated = 0
	for (let dev = 1; dev < V.devastation.length; ++dev) {
		if (Number(V.devastation[Number(dev)]) > 0) {
			populate("area", Number(dev), "devastation", num_devastated)
			update_keyword("devastation", num_devastated, `lvl${V.devastation[dev]}`)

			num_devastated++
		}
	}
}

function update_orders() {
	for (let order = 0; order < V.orders.length; ++order) {
		if (V.orders[order] === POOL) {
			populate("plan_orders", 0, "order", order + get_first_order(R))
		} else {
			populate("orders_stack", V.orders[order], "order", order + get_first_order(R))
		}
	}

	for (let order = 0; order < V.enemy_orders.length; ++order) {
		populate("orders_stack", V.enemy_orders[order], "order", order + get_first_order(enemy(R)))
		update_keyword("order", order + get_first_order(enemy(R)), `hidden ${get_abbreviation(enemy(R))}`)
	}

	if (V.selected_orders) {
		for (let o of V.selected_orders) {
			update_keyword("order", o, "selected")
		}
	}

}

//=== LOG/PROMPT (WIP) ===
function escape_text(text) {
	escape_html(text)
	escape_typography(text)
	text = escape_tip_class_sub(text, /CN(\d+)/g, "card-tip", "card card_$1", data.cards.map(card => card.name))
	text = escape_tip_class_sub(text, /CR(\d+)/g, "card-tip ru", "card card_$1", data.cards.map(card => card.name))
	text = escape_tip_class_sub(text, /CF(\d+)/g, "card-tip fr", "card card_$1", data.cards.map(card => card.name))
	text = escape_tip_light(text, /S(\d+)/g, "area-tip", "area", data.areas.map(s => `${process_area_name(s.name)} (${s.zone})`))
	text = escape_tip_light(text, /L(\d+)/g, "tip", "leader", data.leaders.map(leader => leader.log_name))

	text = escape_dice(text, /\b(battle_fr|battle_ru)([0-6])\b/g)
	text = escape_dice(text, /\b([W])([0-6])\b/g)
	return text
}

function on_log(text, ix) {
	var p = document.createElement("div")

	if ((text === "HR ") || (text === "HF ")) { //Intentional line-breaks
		text = text.substring(2)
		p.className = "br"
		return p
	} else if (text.startsWith("HR") || text.startsWith("HF")) {
		text = text.substring(2)
		if (text === "") {
			p.hidden = true
			return p
		}
	}
	
	let is_box_header = false
	update_log_boxes(ix)
	
	switch(text[0]) {
	case "}":
		close_log_box(ix)
		return p
	case "{":
		open_log_box(ix, text.substring(1, 3))
		is_box_header = true
		text = text.substring(3)
		break
	case "!":
		if (text[1] === "S")
			p.className = 'h1 summer'
		else if (text[1] === "W")
			p.className = 'h1 winter'
		else 
			p.className = 'h1'
		text = text.substring(2)
		break
	case "@":
		text = text.substring(1)
		p.className = 'h2'
		break
	case "#":
		text = text.substring(1)
		p.className = 'h3'
		break
	case "$":
		p.className = `h4 ${text.substring(1, 3)}`
		text = text.substring(3)
		break
	case "%":
		p.className = 'h5'
		text = text.substring(1)
		break
	case ">":
		text = text.substring(1)
		p.className = 'i'
		break
	case "<":
		text = text.substring(1)
		p.className = 'ii'
		break
	case "&":
		text = text.substring(1)
		p.className = 'italic'
		break
	}
    
	p.innerHTML = escape_text(text)
	if (is_box_header) {
		p.classList.add("header")
	}
	apply_log_boxes(ix, p, "group")
	return p
}

function on_prompt(text) {
	return escape_text(text)
}

scroll_with_middle_mouse("main")

// === UTILITY FUNCTIONS ===
// Array utility functions
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

// Sets as plain sorted arrays
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

// Map as plain sorted array of key/value pairs


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