"use strict"

const ROLES = ["Russia", "France"]
const ABBREVIATIONS = ["ru", "fr", "pr", "au"]

const NONE = -1

// === CONSTANTS ===
/* AREAS */
const areas = data.areas
const NUM_AREAS = 158

const FIRST_AREA = 1
const LAST_AREA = 156

// Some useful areas
const HIDDEN = -2
const OUT_OF_PLAY = -1
const POOL = 0
const FRENCH_CASUALTIES = 157

/* CARDS */
// TODO: Maybe add to data.js later?
// Cards that could be selected during a Resources Turn (defined as action buttons with argument in on_update())
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

const RESOURCE_PHASE_CARD_OPTIONS = [
	// RUSSIA
	[
		C_SCORCHED_EARTH, C_PRIDE_AND_HESITATION, C_KUTUZOV_APPOINTED, C_THE_FINLAND_CORPS, C_TREATY_OF_BUCHAREST,
		C_THE_CZAR_LEAVES_THE_ARMY, C_EXHAUSTING_MARCH_1, C_EXHAUSTING_MARCH_2, C_DISORDERLY_MARCH, C_COSSACK_PATROLS
	],
	// FRANCE
	[
		C_HARD_MARCHING_2, C_HOLY_MOTHER_RUSSIA_FR, C_INFIGHTING_AND_INTRIGUE, C_PEACE_OFFER, C_DAVOUT_TAKES_COMMAND,
		C_IX_CORPS_ARRIVES, C_XI_CORPS_ARRIVES, C_COURAGE_OF_DESPERATION, C_NEYS_ESCAPE, C_LETHARGIC_PURSUIT
	]
]

/* LEADERS */
const leaders = data.leaders
const NUM_LEADERS = 14

const first_russia_leader = 0
const last_russia_leader = 7
const first_france_leader = 8
const last_france_leader = 13

/* ORDERS */
const first_russia_order = 1
const last_russia_order = 28
const first_france_order = 29
const last_france_order = 53

// NOTE: The FORCED_MARCH and MARCH constants are also used as constants for move type
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

/* CONNECTIONS */
const FIRST_CONNECTION = 1
const LAST_CONNECTION = 261

/* DEPOTS */
const NUM_DEPOTS_RU = 14
const NUM_DEPOTS_FR = 7

// === DATA FUNCTIONS ===
/* PLAYERS/NATIONS */
function is_observer(role) {
	return role !== RUSSIA && role !== FRANCE
}

function get_abbreviation(nation) {
	return ABBREVIATIONS[nation]
}

function get_opponent(player) {
	return 1 - player
}

/* AREAS */
function get_area_name(area) {
	return areas[area].name
}

// TODO: Add CSS based on area's type: e.g. key_city, riga, etc.
function get_area_type(area) {
	return areas[area].type
}

// The zone the area is on the map, for ease-of-use
function get_area_zone(area) {
	return areas[area].zone
}

// Some areas have the same name, so some additional identifying info was added when defining areas' layout
function process_area_name(name) {
	name = name.replace(/(Grand Duchy of Warsaw|Prussia) (North|South)/, "$1")
	name = name.replace(/^Unnamed\W.*/, "Unnamed")
	name = name.replace(/^Vladimir\W.*/, "Vladimir")

	return name
}

/* LEADERS */
function get_leader_owner(leader) {
	return leaders[leader].faction
}

// A leader's last name, stripped of prepositions e.g. 'de', and using only plain English characters
// For CSS selectors
function get_leader_short_name(leader) {
	return leaders[leader].short_name
}

function get_first_leader(player) {
	switch(player) {
	case RUSSIA: return first_russia_leader
	case FRANCE: return first_france_leader
	default: return -1
	}
}

function get_last_leader(player) {
	if (player === RUSSIA)
		return last_russia_leader
	return last_france_leader
}

function get_leader_location(leader) {
	return V.leaders[leader]
}

function has_friendly_leader(player, area) {
	for (let leader = get_first_leader(player); leader <= get_last_leader(player); ++leader)
		if (get_leader_location(leader) === area)
			return true

	return false
}

// V.seniority contains the current hierarchy of leaders of a side.
// Some leaders have the same seniority, so the hierarchy could change (to an extent)
function get_seniormost_leader(player, area) {
	return V.seniority[player].find(leader => get_leader_location(leader) === area)
}

function is_seniormost_leader(leader, area) {
	return get_seniormost_leader(get_leader_owner(leader), area) === leader
}

/* ORDERS */
function get_first_order(player) {
	switch(player) {
	case RUSSIA: return first_russia_order
	case FRANCE: return first_france_order
	default: return -1
	}
}

function get_last_order(player) {
	switch(player) {
	case RUSSIA: return last_russia_order
	case FRANCE: return last_france_order
	default: return -1
	}
}

function get_order_type(order) {
	return data.orders[order].type
}

function get_order_owner(order) {
	return data.orders[order].owner
}

function get_order_type_selector(type) {
	switch(type) {
	case FORCED_MARCH: 		return "forced_march"
	case CAVALRY_PATROLS: 	return "cavalry_patrols"
	case MARCH:				return "march"
	case EVADE:				return "evade"
	case DEFEND:			return "defend"
	case RALLY:				return "rally"
	case COSSACK_RAID:		return "cossack_raid"
	case PLACE_DEPOT:		return "place_depot"
	case FORAGE:			return "forage"
	case DUMMY_ORDER:		return "dummy_order"
	default:				return type
	}
}

function get_order_keyword(order) {
	let selector = get_order_type_selector(get_order_type(order))
	let abbreviation = get_abbreviation(get_order_owner(order))
	return `${selector} ${abbreviation}`
}

/* DEPOTS */
function get_num_depots(player) {
	switch(player) {
	case RUSSIA: return NUM_DEPOTS_RU
	case FRANCE: return NUM_DEPOTS_FR
	default: return -1
	}
}

function get_pool_depots(side) {
	return (side === RUSSIA) ? "ru_pool_depots" : "fr_pool_depots"
}

// === SPECIAL TROOP HANDLING (WIP) ===

// === INITIALIZE THINGS ===
/* HELPERS */
function translate_right(rect, amt) {
	rect[0] += amt
	return rect
}

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

function move_offset_x(area) {
	let a = layout[get_area_name(area)].slice()
	return a[0] + 15
}

function move_offset_y(area) {
	let a = layout[get_area_name(area)]
	return a[1] - 15
}

function on_init() {
	define_board("#map", 2500, 2027, [0, 0, 0, 0])

	// Panel containing orders that are in the player's pool
	define_panel("#plan_orders", "plan_orders", 0)
	// Panel for cards that have been revealed ('on the table')
	define_panel("#table", "table", 0)
	// Player hand
	define_panel("#hand", "hand", 0)
	// Leaders
	define_panel("#ru_leaders", "leaders", RUSSIA)
	define_panel("#fr_leaders", "leaders", FRANCE)

	define_html_thing("#vp_display", "vp_display", 0)

	/* AREAS */
	for (let area = FIRST_AREA; area <= LAST_AREA; ++area) {
		// For actions & populating static markers (devastation, depots)
		define_space("area", area, layout[get_area_name(area)], get_area_type(area))
			.tooltip(`${process_area_name(get_area_name(area))} (${get_area_zone(area)})`)

		// Where leaders & SPs are populated
		define_stack("area_stack", area, layout[get_area_name(area)], -8, -8, 0, -58, 0, 36, 1, 60)
		// Where we populate orders
		define_stack("orders_stack", area, translate_right(layout[get_area_name(area)], 60), 0, -85, 0, -125)
	}

	define_stack("move", 0, [0, 0, 25, 25], -15, -15, 0, -58, 0, 36, 1, 10)

	define_layout("ru_pool_depots", 0, layout["Russia Pool Depots"])
	define_layout("fr_pool_depots", 0, layout["France Pool Depots"])
	define_layout("ru_pool_leaders", 0, layout["Russia Pool Leaders"])
	define_layout("fr_pool_leaders", 0, layout["France Pool Leaders"])
	define_layout("fr_casualties", 0, layout["France Casualties"])

	/* CONNECTIONS */
	for (let connection = FIRST_CONNECTION; connection <= LAST_CONNECTION; ++connection) {
		// A clickable action space
		define_space("connection", connection, layout[`Connection${connection}`])//.tooltip(connection)

		// Where leaders & SPs are populated
		// Same as area stack
		define_stack("connection_stack", connection, layout[`Connection${connection}`], -8, -8, 0, -58, 0, 36, 1, 60)
	}

	/* ORDERS */
	for (let order = first_russia_order; order <= last_france_order; ++order)
		define_piece("order", order, get_order_keyword(order))

	/* LEADERS */
	for (let leader = first_russia_leader; leader <= last_russia_leader; ++leader) {
		define_piece("leader", leader, "ru " + get_leader_short_name(leader))
			.stackable()
		define_leader_board(leader)
	}
	for (let leader = first_france_leader; leader <= last_france_leader; ++leader) {
		define_piece("leader", leader, "fr " + get_leader_short_name(leader))
			.stackable()
		define_leader_board(leader)
	}

	/* SPS (see sp.js) */
	define_sps()

	/* CARDS */
	define_card_list("card", 0, 107, "card_")

	/* DEVASTATION/DEPOTS */
	define_marker_list("devastation", 0, NUM_AREAS - 1)
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

	reset_sp_trackers()

	update_tracks()
	update_sps()
	update_leaders()
	update_depots()
	update_devastation()
	update_orders()

	if (V.vp > 0) {
		document.getElementById("vp_display").innerHTML = `<b>VP:</b> France ${V.vp}`
	} else if (V.vp < 0) {
		document.getElementById("vp_display").innerHTML = `<b>VP:</b> Russia ${Math.abs(V.vp)}`
	} else {
		document.getElementById("vp_display").innerHTML = `<b>VP:</b> ${V.vp}`
	}

	if (V.initiative > 0) {
		document.getElementById("vp_display").innerHTML += `<br><b>Initiative:</b> France ${V.initiative}`
	} else {
		document.getElementById("vp_display").innerHTML += `<br><b>Initiative:</b> Russia ${Math.abs(V.initiative)}`
	}

	for (let c of V.current_hand) {
		populate("hand", 0, "card", c)
	}

	if (V.played_cards || V.committed_cards || V.num_enemy_committed_cards > 0) {
		update_panel_show("table", 0, (V.played_cards && V.played_cards[R] && V.played_cards[R].length > 0) || (V.committed_cards && V.committed_cards.length > 0) || (V.num_enemy_committed_cards > 0))
		if (V.played_cards) {
			for (let card of V.played_cards.flat(1))
				populate("table", 0, "card", card)
		}
		if (V.num_enemy_committed_cards > 0)
			populate_generic("table", 0, `card card_back_${get_abbreviation(get_opponent(R))}`, V.num_enemy_committed_cards)
		if (V.committed_cards && V.committed_cards.length > 0) {
			for (let card of V.committed_cards)
				populate("table", 0, "card", card)
		}
	}

	update_panel_show("leaders", RUSSIA, false)
	update_panel_show("leaders", FRANCE, false)

	for (let leader = 0; leader <= 13; ++leader) {
		action_button_with_argument(`leader_button`, leader, leaders[leader].log_name)
		if (V.move && V.move.leaders) {
			let counter = document.getElementById("leader piece " + get_leader_short_name(leader))
			if (counter)
				counter.classList.toggle("selected", set_has(V.move.leaders, leader))
		}
	}

	if (V.attrition_checked) {
		let marker = 0
		for (let area of V.attrition_checked)
			populate("area_stack", area, "attrition_checked", marker++)
	}

	action_button_with_argument("sp_button", FRESH_INFANTRY, "Infantry")
	action_button_with_argument("sp_button", EXHAUSTED_INFANTRY, "Exh. Infantry")
	action_button_with_argument("sp_button", FRESH_CAVALRY, "Cavalry")
	action_button_with_argument("sp_button", EXHAUSTED_CAVALRY, "Exh. Cavalry")
	action_button_with_argument("sp_button", FRESH_COSSACK, "Cossack")
	action_button_with_argument("sp_button", EXHAUSTED_COSSACK, "Exh. Cossack")
	action_button_with_argument("sp_button", FRESH_GUARD, "Guard")
	action_button_with_argument("sp_button", EXHAUSTED_GUARD, "Exh. Guard")
	action_button_with_argument("sp_button", FRESH_PRUSSIAN_INFANTRY, "Pr. Infantry")
	action_button_with_argument("sp_button", EXHAUSTED_PRUSSIAN_INFANTRY, "Exh. Pr. Infantry")
	action_button_with_argument("sp_button", FRESH_AUSTRIAN_INFANTRY, "Au. Infantry")
	action_button_with_argument("sp_button", EXHAUSTED_AUSTRIAN_INFANTRY, "Exh. Au. Infantry")

	action_button_with_argument("sp_2x", FRESH_INFANTRY, "2x Infantry")
	action_button_with_argument("sp_2x", FRESH_PRUSSIAN_INFANTRY, "2x Pr. Infantry")
	action_button_with_argument("sp_2x", FRESH_AUSTRIAN_INFANTRY, "2x Au. Infantry")
	action_button_with_argument("sp_2x", EXHAUSTED_INFANTRY, "2x Exh. Infantry")
	action_button_with_argument("sp_2x", EXHAUSTED_PRUSSIAN_INFANTRY, "2x Exh. Pr. Infantry")
	action_button_with_argument("sp_2x", EXHAUSTED_AUSTRIAN_INFANTRY, "2x Exh. Au. Infantry")

	action_button_with_argument("add_sp", FRESH_INFANTRY, "+ Inf.")
	action_button_with_argument("remove_sp", FRESH_INFANTRY, "- Inf.")
	action_button_with_argument("add_sp", EXHAUSTED_INFANTRY, "+ Exh. Inf.")
	action_button_with_argument("remove_sp", EXHAUSTED_INFANTRY, "- Exh. Inf.")
	action_button_with_argument("add_sp", FRESH_CAVALRY, "+ Cav.")
	action_button_with_argument("remove_sp", FRESH_CAVALRY, "- Cav.")
	action_button_with_argument("add_sp", EXHAUSTED_CAVALRY, "+ Exh. Cav.")
	action_button_with_argument("remove_sp", EXHAUSTED_CAVALRY, "- Exh. Cav.")
	action_button_with_argument("add_sp", FRESH_COSSACK, "+ Coss.")
	action_button_with_argument("remove_sp", FRESH_COSSACK, "- Coss.")
	action_button_with_argument("add_sp", EXHAUSTED_COSSACK, "+ Exh. Coss.")
	action_button_with_argument("remove_sp", EXHAUSTED_COSSACK, "- Exh. Coss.")
	action_button_with_argument("add_sp", FRESH_GUARD, "+ Guard")
	action_button_with_argument("remove_sp", FRESH_GUARD, "- Guard")
	action_button_with_argument("add_sp", EXHAUSTED_GUARD, "+ Exh. Guard")
	action_button_with_argument("remove_sp", EXHAUSTED_GUARD, "- Exh. Guard")
	action_button_with_argument("add_sp", FRESH_PRUSSIAN_INFANTRY, "+ Pr. Inf.")
	action_button_with_argument("remove_sp", FRESH_PRUSSIAN_INFANTRY, "- Pr. Inf.")
	action_button_with_argument("add_sp", EXHAUSTED_PRUSSIAN_INFANTRY, "+ Exh. Pr. Inf.")
	action_button_with_argument("remove_sp", EXHAUSTED_PRUSSIAN_INFANTRY, "- Exh. Pr. Inf.")
	action_button_with_argument("add_sp", FRESH_AUSTRIAN_INFANTRY, "+ Au. Inf.")
	action_button_with_argument("remove_sp", FRESH_AUSTRIAN_INFANTRY, "- Au. Inf.")
	action_button_with_argument("add_sp", EXHAUSTED_AUSTRIAN_INFANTRY, "+ Exh. Au. Inf.")
	action_button_with_argument("remove_sp", EXHAUSTED_AUSTRIAN_INFANTRY, "- Exh. Au. Inf.")

	action_button("select_all", "Select All")
	action_button("shuffle", "Shuffle Deck")
	action_button("discard_and_redraw", "Discard & Redraw")
	action_button("combine", "Combine")
	action_button("add_1_to_attrition_distance", "Add 1 to Attrition Distance")

	// FR #14 Skillfull Maneuvers
	action_button("remove_defend_order", "Remove Defend Order")
	action_button("cancel_river_effect", "Cancel River Effect")

	// FR #25 Good Leadership
	action_button("place_order", "Place Order")
	action_button("change_order", "Change Order")

	action_button("roll", "Roll")
	action_button("eliminate", "Eliminate")

	action_button("exhaust", "Exhaust")
	action_button("eliminate_2", "Eliminate 2")

	action_button("play", "Play")
	action_button("done", "Done")
	action_button("move", "Move")
	action_button("evade", "Evade")
	action_button("retreat", "Retreat")
	action_button("next", "Next")
	action_button("draw", "Draw")
	action_button("discard", "Discard")
	action_button("confirm", "Confirm")

	action_button("russia", "Russia")
	action_button("france", "France")
	action_button("pass", "Pass")

	for (let player = RUSSIA; player <= FRANCE; ++player) {
		for (let card of RESOURCE_PHASE_CARD_OPTIONS[player])
			action_button_with_argument("card_button", card, `#${data.cards[card].id} ${data.cards[card].name}`)
	}

	action_button("undo", "Undo")

	end_update()
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

function get_battle_entry(area, fallback = null) {
	return map_get(V.battles, area, fallback)
}

function get_battle_attacker(area) {
	return map_get(V.battles, area)?.attacker.who ?? -1
}

function get_battle_defender(area) {
	return map_get(V.battles, area)?.defender.who ?? -1
}

function find_connection(a, b) {
	return data.connections.findIndex(conn => (set_has(conn, a) && set_has(conn, b)))
}

function get_attacker_data(area) {
	return get_battle_entry(area)?.attacker ?? null
}

function get_defender_data(area) {
	return get_battle_entry(area)?.defender ?? null
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
	if (get_battle_attacker(battle) === get_leader_owner(leader))
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
	for (let leader = V.leaders.length - 1; leader >= 0; --leader) {
		let location = get_leader_location(leader)
		switch(location) {
		case HIDDEN: break
		case OUT_OF_PLAY:
			populate((get_leader_owner(leader) === RUSSIA) ? "fr_pool_leaders" : "ru_pool_leaders", 0, "leader", leader)
			break
		case POOL:
			populate((get_leader_owner(leader) === RUSSIA) ? "ru_pool_leaders" : "fr_pool_leaders", 0, "leader", leader)
			break
		case FRENCH_CASUALTIES:
			populate("fr_casualties", 0, "leader", leader)
			break
		default:
			if (has_battle(location)) {
				for (let force of get_player_battle_data(get_leader_owner(leader), location).forces) {
					if (set_has(force.leaders, leader)) {
						if (V.move && (V.move.type === EVADE || V.move.type === NONE) && V.move.leaders && set_has(V.move.leaders, leader)) {
							update_position("move", 0, move_offset_x(location), move_offset_y(location))
							populate("move", 0, "leader", leader)
						} else {
							if (get_seniormost_leader_on_connection(get_leader_owner(leader), force.from, location) === leader) {
								if (force.from === location) {
									populate("area_stack", get_leader_location(leader), "leader", leader)
								} else {
									populate("connection_stack", find_connection(location, force.from), "leader", leader)
								}
							}
						}
					}
				}
			} else {
				if (V.move && V.move.leaders && V.move.path && V.move.path.length === 1 && set_has(V.move.leaders, leader)) {
					update_position("move", 0, move_offset_x(location), move_offset_y(location))
					populate("move", 0, "leader", leader)
				}
				else if (R === get_leader_owner(leader) || (R !== get_leader_owner(leader) && is_seniormost_leader(leader, location)))
					populate("area_stack", get_leader_location(leader), "leader", leader)
			}
		}
	}
}

function has_bridge(from, to) {
	return data.areas[from].bridge.includes(to)
}

function update_sps() {
	// V.sps is a plain array map keyed by area and each value contains a set of bitpacked troop entries

	map_for_each(V.sps, (area, entries) => {
		for (let entry of entries) {
			// Unravel bitmasks
			let player = decode_sp_player(entry)
			let type = decode_sp_type(entry)
			let num = decode_sp_num(entry)

			// Map to lookup what number to populate on each troop marker
			let sp_nums = []

			// Population logic
			// To make battle calculations easier on the server, SPs participating in battle are all 'within' the area where the battle is occuring.
			// However:
			// Some SPs need to be populated on the connections corresponding to where they entered from.
			// 		All attacking SPs are populated on connections.
			// 		Defending SPs which were in the area before the battle started are populated within the area.
			// 		Defending SPs which entered after the battle started are populated on the connection from which they entered the area.

			// Battle population logic
			if (has_battle(area)) {
				// All battle entries use V.battles as basis to populate them onto the right places.
				// Attacker: All SPs are populated on connections.
				// Defender: Only SPs that entered the area after the battle was first declared.



				for (let force of get_player_battle_data(player, area).forces) {
					if (force.sps[type] > 0) {
						let num_moving = 0

						if (V.move && (V.move.type === EVADE || V.move.type === NONE) && V.move.sps && map_has(V.move.sps, force.from) && map_has(map_get(V.move.sps, force.from), force.strength)) {
							if (map_get(map_get(V.move.sps, force.from), force.strength)[type] > 0) {
								update_position("move", 0, move_offset_x(area), move_offset_y(area))
								update_sp_exhaustion(get_used(player, type), get_exhaustion_selector(type))

								if (R === player || (R !== player && V.move.leaders.length === 0))
									populate_sp(player, type, "move", 0)

								lookup_sp(get_used(player, type)).my_area = area
								lookup_sp(get_used(player, type)).my_from = force.from
								lookup_sp(get_used(player, type)).am_moving = 1

								num_moving += map_get(map_get(V.move.sps, force.from), force.strength)[type]
								if (force.strength === HALF_STRENGTH)
									populate_half_strength(player, get_used(player, type))
								if (!map_has(sp_nums, get_used(player, type)))
									map_set(sp_nums, get_used(player, type), map_get(map_get(V.move.sps, force.from), force.strength)[type])
								incr_used(player, type)
							}
						}

						if (force.sps[type] > num_moving) {
							// Update the exhaustion status of the corresponding sp counter
							update_sp_exhaustion(get_used(player, type), get_exhaustion_selector(type))

							// Defending forces which were in the area before the battle started have their 'from' set to the area itself
							if (force.from === area) {
								if (R === player || (R !== player && get_seniormost_leader_on_connection(player, area, area) === -1))
									populate_sp(player, type, "area_stack", area)

								lookup_sp(get_used(player, type)).my_area = area
								lookup_sp(get_used(player, type)).my_from = area
							} else {
								if (R === player || (R !== player && get_seniormost_leader_on_connection(player, force.from, area) === -1))
									populate_sp(player, type, "connection_stack", find_connection(force.from, area))

								lookup_sp(get_used(player, type)).my_area = area
								lookup_sp(get_used(player, type)).my_from = force.from
							}

							if (force.strength === HALF_STRENGTH && (is_battle_attacker(player, area) && has_bridge(force.from, area)))
								populate_half_strength(player, get_used(player, type), true, 2)
							else if ((force.strength === HALF_STRENGTH || (is_battle_attacker(player, area) && has_bridge(force.from, area))))
								populate_half_strength(player, get_used(player, type), force.strength === HALF_STRENGTH)

							if (!map_has(sp_nums, get_used(player, type)))
								map_set(sp_nums, get_used(player, type), force.sps[type] - num_moving)

							incr_used(player, type)
						}
					}
				}
			} else {
				let num_moved = 0

				if (
					map_has(V.moved.sps, area)
					&& map_get(V.moved.sps, area).some(item => decode_sp_player(item) === player && decode_sp_type(item) === type)
				) {
					for (let item of map_get(V.moved.sps, area, null)) {
						if (decode_sp_player(item) === player && decode_sp_type(item) === type) {
							update_sp_exhaustion(get_used(player, type), get_exhaustion_selector(type))

							if (R === player || !has_friendly_leader(player, area))
								populate_sp(player, type, "area_stack", area)

							lookup_sp(get_used(player, type)).my_area = area
							lookup_sp(get_used(player, type)).my_from = decode_sp_from(item)
							num_moved += decode_sp_num(item)

							if (decode_sp_strength(item) === HALF_STRENGTH)
								populate_half_strength(player, get_used(player, type))

							if (!map_has(sp_nums, get_used(player, type)))
								map_set(sp_nums, get_used(player, type), decode_sp_num(item))
							incr_used(player, type)
						}
					}
				}

				if (V.move && V.move.sps) {
					if (V.move.path && V.move.path.length === 1 && V.move.path[V.move.path.length - 1] === area && V.move.sps[type] > 0) {
						update_position("move", 0, move_offset_x(area), move_offset_y(area))
						update_sp_exhaustion(get_used(player, type), get_exhaustion_selector(type))

						if (R === player || (R !== player && V.move.leaders.length === 0))
							populate_sp(player, type, "move", 0)

						lookup_sp(get_used(player, type)).my_area = area
						if (V.move.path.length >= 2)
							lookup_sp(get_used(player, type)).my_from = V.move.path[V.move.path.length - 2]
						else
							lookup_sp(get_used(player, type)).my_from = POOL
						lookup_sp(get_used(player, type)).am_moving = 1

						num_moved += V.move.sps[type]
						if (!map_has(sp_nums, get_used(player, type)))
							map_set(sp_nums, get_used(player, type), V.move.sps[type])
						incr_used(player, type)
					}
				}

				if (num > num_moved) {
					update_sp_exhaustion(get_used(player, type), get_exhaustion_selector(type))

					// French casualties are public
					if (area === FRENCH_CASUALTIES) {
						populate_sp(player, type, "fr_casualties", 0)
					} else {
						if (R === player || (R !== player && !has_friendly_leader(player, area)))
							populate_sp(player, type, "area_stack", area)
					}

					lookup_sp(get_used(player, type)).my_area = area
					lookup_sp(get_used(player, type)).my_from = POOL
				}

				if (!map_has(sp_nums, get_used(player, type)))
					map_set(sp_nums, get_used(player, type), num - num_moved)
				incr_used(player, type)
			}
			map_for_each(sp_nums, (id, count) => {
				populate("sp", id, "sp-text", id)
				update_text("sp-text", id, count)
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
	map_for_each(V.devastation, (area, amount) => {
		populate("area", area, "devastation", area)
		update_keyword("devastation", area, `lvl${amount}`)
	})
}

function update_orders() {
	if (!is_observer(R)) {
		for (let order = 0; order < V.orders.length; ++order) {
			switch(V.orders[order]) {
			case OUT_OF_PLAY:
				populate(get_pool_depots(R), 0, "order", order + get_first_order(R))
				break
			case POOL:
				populate("plan_orders", 0, "order", order + get_first_order(R))
				break
			default:
				populate("orders_stack", V.orders[order], "order", order + get_first_order(R))
			}
		}

		for (let order = 0; order < V.enemy_orders.length; ++order) {
			if (V.enemy_orders[order] === OUT_OF_PLAY)
				populate(get_pool_depots(1 - R), 0, "order", order + get_first_order(1 - R))
			else
				populate("orders_stack", V.enemy_orders[order], "order", order + get_first_order(get_opponent(R)))
			update_keyword("order", order + get_first_order(get_opponent(R)), `hidden ${get_abbreviation(get_opponent(R))}`)
		}
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

function on_prompt(text) {
	return escape_text(text)
}

function on_log(text, ix) {
	var p = document.createElement("div")

	if ((text === "HR ") || (text === "HF ")) { //Intentional line-breaks
		text = text.substring(2)
		p.className = "br"
		return p
	} else if (text.startsWith("HR") || text.startsWith("HF") || text.startsWith("ER") || text.startsWith("EF")) {
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
	case "^":
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

// NOTE: I added a null fallback since that is what I use for most use cases.
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

function map_for_each(map, f) {
	for (var i = 0; i < map.length; i += 2)
		f(map[i], map[i+1])
}
