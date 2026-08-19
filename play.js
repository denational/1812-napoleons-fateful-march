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
		
		define_stack("area_stack", area, layout[get_area_name(area)], -20, -20, 0, -58, 0, 36, 1, 4, 0.5, 0.5)
		define_stack("orders_stack", area, translate_right(layout[get_area_name(area)], 52), 0, -60, 0, -12)
	}

	for (let connection = FIRST_CONNECTION; connection <= LAST_CONNECTION; ++connection) {
		define_space("connection", connection, layout[`Connection${connection}`])
		define_stack("connection_stack", connection, layout[`Connection${connection}`], -20, -20, 0, -58, 0, 36, 1, 4, 0.5, 0.5)
	}

	define_layout("ru_pool_depots", 0, layout["Russia Pool Depots"], "square")
	define_layout("fr_pool_depots", 0, layout["France Pool Depots"], "square")
	define_layout("ru_pool_leaders", 0, layout["Russia Pool Leaders"], "square")
	define_layout("fr_pool_leaders", 0, layout["France Pool Leaders"], "square")
	define_stack("fr_casualties", 0, layout["France Casualties"], -20, -20, 0, -58, 0, 36, 1, 4, 0.5, 0.5)

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
	//Modified define_piece_list() adding a number keyword (to update values on counters)
	function define_troop_list(action, a, b, keywords) {
		for (var i = a; i <= b; ++i) {
			let troop = define_piece(action, i, keywords)
				.keyword(`n${i}`)
				.stackable()
			define_thing("troop-text", i)
				.static_child(troop)
		}
	}

	define_troop_list("infantry", first_ru_inf, first_fr_inf - 1, "ru")
	define_troop_list("infantry", first_fr_inf, first_fr_pr_inf - 1, "fr")
	define_troop_list("infantry", first_fr_pr_inf, first_fr_au_inf - 1, "pr")
	define_troop_list("infantry", first_fr_au_inf, 160, "au")

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

	define_marker_list("half_strength_ru", 0, 15)
	define_marker_list("half_strength_fr", 0, 15)

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

	action_button_with_argument("troop_2x", EXHAUSTED_INFANTRY, "2x Exh. Infantry")
	action_button_with_argument("troop_2x", EXHAUSTED_PRUSSIAN_INFANTRY, "2x Exh. Pr. Infantry")
	action_button_with_argument("troop_2x", FRESH_AUSTRIAN_INFANTRY, "2x Exh. Au. Infantry")

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
	action_button("discard_and_draw", "Discard & Draw")
	action_button("add_1_to_attrition_distance")

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
	populate("track-vp", Math.abs(V.vp), "vp", 0)

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

function update_leaders() {
	for (let leader = 0; leader < V.leaders.length; ++leader) {
		let location = get_leader_location(leader)
		switch(location) {
		case OUT_OF_PLAY:
			populate((get_leader_faction(leader) === RUSSIA) ? "fr_pool_leaders" : "ru_pool_leaders", 0, "leader", leader); break
		case POOL:
			populate((get_leader_faction(leader) === RUSSIA) ? "ru_pool_leaders" : "fr_pool_leaders", 0, "leader", leader); break
		case FRENCH_CASUALTIES:
			populate("fr_casualties", 0, "leader", leader); break
		default:
			if (!has_battle(location) || is_battle_defender(get_leader_faction(leader), location)) {
				if (is_seniormost_leader(leader, get_leader_location(leader))) {
					populate("area_stack", get_leader_location(leader), "leader", leader)
					populate("leaders", get_leader_faction(leader), "leader_board", leader)
				} else 
					populate("subordinate_leaders", get_seniormost_leader(get_leader_faction(leader), get_leader_location(leader)), "leader", leader)
			} else {
				for (let entry of get_attacker_data(location).forces) {
					if (set_has(entry.leaders, leader))
						if (get_seniormost_leader_from_list(get_leader_faction(leader), get_leaders_on_connection(get_leader_faction(leader), location, entry.from)) === leader) {
							populate("connection_stack", find_connection(location, entry.from), "leader", leader)
							populate("leaders", get_leader_faction(leader), "leader_board", leader)
						} else
							populate("subordinate_leaders", get_seniormost_leader_from_list(get_leader_faction(leader), entry.leaders), "leader", leader)
				}
			}
		}
	}
}

function has_bridge(from, to) {
	return data.areas[from].bridge.includes(to)
}

function update_troops() {
	map_for_each(G.troops, (area, entries) => {
		let half_strength_connections = []
		let half_strength_areas = []
		for (let entry of entries) {
			//Unraveling bitmasks
			let who = decode_troop_entry_who(entry)
			let type = decode_troop_entry_type(entry)
			let num = decode_troop_entry_num(entry)

			if (has_battle(area) && is_battle_attacker(who, area)) {
				for (let entry of get_attacker_data(area).forces) {
					let connection = find_connection(entry.from, area)
					if (!set_has(half_strength_connections, connection) && entry.move_type === 0)
						populate_generic("connection_stack", connection, `half_strength_${get_abbreviation(who)}`, 1)
					if (!set_has(half_strength_connections, connection) && has_bridge(entry.from, area))
						populate_generic("connection_stack", connection, `half_strength_${get_abbreviation(who)}`, 1)
					set_add(half_strength_connections, connection)
				}
			} else {
				if (map_has(V.moved, area) && map_get(V.moved, area).some(entry => entry.move_type === 0) && !set_has(half_strength_areas, area)) {
					populate_generic("area_stack", area, `half_strength_${get_abbreviation(who)}`, 1)
					set_add(half_strength_areas, area)
				}
			}
			

			//Updating the marker to its 'fresh' or 'exhausted' side
			if (is_fresh(type)) {
				update_keyword(get_troop_name(type), get_used(who, type), "fresh")
			} else {
				update_keyword(get_troop_name(type), get_used(who, type), "exhausted")
			}

			
			if (has_battle(area) && is_battle_attacker(who, area)) {
				let connection_split = [] //In order to correctly update the number of troops in case there are troops of the same type across multiple connections

				for (let entry of get_attacker_data(area).forces) {
					if (entry.troops[type] > 0) {
						if (is_fresh(type)) {
							update_keyword(get_troop_name(type), get_used(who, type), "fresh")
						} else {
							update_keyword(get_troop_name(type), get_used(who, type), "exhausted")
						}

						let connection = find_connection(area, entry.from)						

						if (entry.leaders.length === 0) {
							populate("connection_stack", connection, get_troop_name(type), get_used(who, type))
						} else {
							populate(`subordinate_${get_troop_bucket(type)}`, get_seniormost_leader_from_list(who, entry.leaders), get_troop_name(type), get_used(who, type))
						}
						if (!map_has(connection_split, connection)) {
							map_set(connection_split, connection, {id: get_used(who, type), amt: entry.troops[type]})
						} else {
							map_get(connection_split, connection, null).amt = map_get(connection_split, connection, null).amt + entry.troops[type]
						}
						incr_used(who, type)
					}
				}
				map_for_each(connection_split, (connection, entry) => {
					update_text("troop-text", entry.id, entry.amt)
				})
				continue
			} 
			//Populating the marker (without the number of troops)
			else if (has_friendly_leader(who, area) && ((is_cavalry(type) || is_cossack(type)) || (get_seniormost_leader(who, area) !== PLATOV))) { //If there's a friendly leader in the area, put the troops on his mat
				populate(`subordinate_${get_troop_bucket(type)}`, get_seniormost_leader(who, area), get_troop_name(type), get_used(who, type))
			} 
			else if (area === FRENCH_CASUALTIES) {
				populate("fr_casualties", 0, get_troop_name(type), get_used(who, type))
			} 
			else {
				populate("area_stack", area, get_troop_name(type), get_used(who, type))
			}

			update_text("troop-text", get_used(who, type), num)
			incr_used(who, type)
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

/* FRAMEWORK */

function array_insert(array, index, item) {
	for (var i = array.length; i > index; --i)
		array[i] = array[i - 1]
	array[index] = item
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