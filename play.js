"use strict"

// To remove later after the client is sorted.
/* global world, Thing, V, R, data, layout, _focus_stack, _blur_stack, begin_update, end_update */
/* global define_thing, define_layout, define_panel, define_space, define_stack, define_layout_track_h, define_layout_track_v */
/* global define_board, define_piece, define_marker, define_card_list, define_marker_list, define_html_thing */
/* global populate, update_keyword, lookup_thing, update_panel_show, update_position, populate_generic, update_text, create_window */
/* global escape_tip_class_sub, escape_tip_light, escape_html, escape_typography, escape_dice, update_log_boxes, apply_log_boxes, open_log_box, close_log_box */

// TODO: Animate positions

const RUSSIA = 0
const FRANCE = 1
const PRUSSIA = 2
const AUSTRIA = 3

const ROLES = ["Russia", "France"]
const ABBREVIATIONS = ["ru", "fr", "pr", "au"]

const NONE = -1

function is_mobile() {
	return ("ontouchstart" in window) || (window.innerWidth < 800)
}

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
const FIRST_RUSSIAN_CARD = 0
const LAST_RUSSIAN_CARD = 53
const FIRST_FRENCH_CARD = 54
const LAST_FRENCH_CARD = 107

// Either cards that could be selected during a Resource Turn,
// or those that need special layout handling.
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
const C_HARD_MARCHING_1 = 55
const C_HARD_MARCHING_2 = 56
const C_HOLY_MOTHER_RUSSIA_FR = 58
const C_INFIGHTING_AND_INTRIGUE = 62
const C_SKILLFULL_MANEUVERS = 68
const C_PEACE_OFFER = 69
const C_DAVOUT_TAKES_COMMAND = 71
const C_IX_CORPS_ARRIVES = 73
const C_XI_CORPS_ARRIVES = 74
const C_EBLES_PONTONEERS = 83
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

const first_russia_leader = 0
const last_russia_leader = 7
const first_france_leader = 8
const last_france_leader = 13

/* SPs */
// Standard SP types
const FRESH_INFANTRY = 0
const EXHAUSTED_INFANTRY = 1
const FRESH_CAVALRY = 2
const EXHAUSTED_CAVALRY = 3
const FRESH_COSSACK = 4
const EXHAUSTED_COSSACK = 5
const FRESH_GUARD = 6
const EXHAUSTED_GUARD = 7

// Allied SP types
const FRESH_PRUSSIAN_INFANTRY = 8
const EXHAUSTED_PRUSSIAN_INFANTRY = 9
const FRESH_AUSTRIAN_INFANTRY = 10
const EXHAUSTED_AUSTRIAN_INFANTRY = 11

const NUM_SP_TYPES = 12

// Strength flags
// Conveniently coincides with FORCED_MARCH
const HALF_STRENGTH = 0
const FULL_STRENGTH = 1

// Tracking used SP markers
const INFANTRY = 0
const CAVALRY = 1
const SPECIAL = 2

// SP Pool
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

const FIRST_SPS = [
	[first_ru_inf, first_fr_inf, first_fr_pr_inf, first_fr_au_inf],
	[first_ru_cav, first_fr_cav],
	[first_ru_cossack, first_fr_guard]
]

const LAST_SPS = [
	[last_ru_inf, last_fr_inf, last_fr_pr_inf, last_fr_au_inf],
	[last_ru_cav, last_fr_cav],
	[last_ru_cossack, last_fr_guard]
]

var used_sps = [
	[first_ru_inf, first_fr_inf, first_fr_pr_inf, first_fr_au_inf],
	[first_ru_cav, first_fr_cav],
	[first_ru_cossack, first_fr_guard],
]

var used_half_strength = [0, 0]

const FRESH = "fresh"
const EXHAUSTED = "exhausted"

/* ORDERS */
const first_russia_order = 1
// const last_russia_order = 28
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

// === DATA FUNCTIONS ===
/* PLAYERS/NATIONS */
function get_faction(nation) {
	return (nation === RUSSIA) ? RUSSIA : FRANCE
}

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

function has_bridge(from, to) {
	return data.areas[from].bridge.includes(to)
}

/* CARDS */
function get_card_ops(card) {
	return data.cards[card].ops
}

function get_first_card(player) {
	return player === RUSSIA ? FIRST_RUSSIAN_CARD : FIRST_FRENCH_CARD
}

function get_last_card(player) {
	return player === RUSSIA ? LAST_RUSSIAN_CARD : LAST_FRENCH_CARD
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

/* SPs */
function is_infantry(type) {
	return (type === FRESH_INFANTRY || type === EXHAUSTED_INFANTRY || (type >= FRESH_PRUSSIAN_INFANTRY && type < NUM_SP_TYPES))
}

function is_cavalry(type) {
	return type === FRESH_CAVALRY || type === EXHAUSTED_CAVALRY
}

function is_cossack(type) {
	return type === FRESH_COSSACK || type === EXHAUSTED_COSSACK
}

function is_guard(type) {
	return type === FRESH_GUARD || type === EXHAUSTED_GUARD
}

function is_fresh(type) {
	return !is_exhausted(type)
}

function is_exhausted(type) {
	return !!(type & 1)
}

function get_sp_selector(type) {
	if (is_infantry(type))
		return "infantry"
	else if (is_cavalry(type))
		return "cavalry"
	else if (is_cossack(type))
		return "cossack"
	else if (is_guard(type))
		return "guard"
	else
		throw new Error(`Unknown SP selector: ${type}`)
}

function get_sp_type_name(type) {
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

function get_exhaustion_selector(type) {
	return is_exhausted(type) ? EXHAUSTED : FRESH
}

function get_sp_bucket(type) {
	if (is_infantry(type))
		return INFANTRY
	if (is_cavalry(type))
		return CAVALRY
	if (is_cossack(type) || is_guard(type))
		return SPECIAL
}

function get_sp_nationality(player, type) {
	if (type < FRESH_PRUSSIAN_INFANTRY)
		return player
	else if (type === FRESH_PRUSSIAN_INFANTRY || type === EXHAUSTED_PRUSSIAN_INFANTRY)
		return PRUSSIA
	else if (type === FRESH_AUSTRIAN_INFANTRY || type === EXHAUSTED_AUSTRIAN_INFANTRY)
		return AUSTRIA
}

/* ORDERS */
function get_first_order(player) {
	switch(player) {
	case RUSSIA: return first_russia_order
	case FRANCE: return first_france_order
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
	case FORCED_MARCH: 	return "forced_march"
	case CAVALRY_PATROLS: 	return "cavalry_patrols"
	case MARCH:			return "march"
	case EVADE:			return "evade"
	case DEFEND:		return "defend"
	case RALLY:			return "rally"
	case COSSACK_RAID:	return "cossack_raid"
	case PLACE_DEPOT:		return "place_depot"
	case FORAGE:		return "forage"
	case DUMMY_ORDER:		return "dummy_order"
	default:			return type
	}
}

function get_order_keyword(order) {
	let selector = get_order_type_selector(get_order_type(order))
	let abbreviation = get_abbreviation(get_order_owner(order))
	return `${selector} ${abbreviation}`
}

/* DEPOTS */
function get_pool_depots(side) {
	return (side === RUSSIA) ? "ru_pool_depots" : "fr_pool_depots"
}

/* EVENTS */
function is_event_active(event) {
	return map_has(V.persistent_events, event)
}

function is_battle_event_active(area, event) {
	return set_has(map_get(V.battles, area, []).events, event)
}

function get_event_keyword(evt, keyword, fallback = null) {
	return map_get(V.persistent_events, evt)?.[keyword] ?? fallback
}

/* BATTLES */
function has_battle(area) {
	return map_has(V.battles, area)
}

function get_battle_entry(area, fallback = null) {
	return map_get(V.battles, area, fallback)
}

function get_battle_attacker(area) {
	return map_get(V.battles, area)?.attacker.who ?? -1
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

// === SPECIAL SP HANDLING ===
// WARNING: Modifies world.js framework.

function package_sp_action(player, type, strength, area, from, moving) {
	let m = moving << SP_MOVING_SHIFT
	let a = area << SP_AREA_SHIFT
	let f = from << SP_FROM_SHIFT
	let s = strength << SP_STRENGTH_SHIFT
	let p = player << SP_PLAYER_SHIFT
	let t = type << SP_TYPE_SHIFT
	let n = 0 << SP_NUM_SHIFT // Not used

	return m | a | f | s | p | t | n
}

// Locating a SP element that matches the characteristics of the bitpacked argument.
function find_sp(argument) {
	let moving 		= decode_sp_moving(argument)
	let player 		= decode_sp_player(argument)
	let type 		= decode_sp_type(argument)
	let strength 	= decode_sp_strength(argument)
	let area 		= decode_sp_area(argument)
	let from 		= decode_sp_from(argument)

	for (let i = get_first_counter(player, type); i <= get_last_counter(player, type); ++i) {
		let sp = world.things.sp[i]

		if (
			sp.my_player === player
			&& sp.my_type === type
			&& sp.am_moving === moving
			&& sp.my_strength === strength
			&& sp.my_area === area
			&& sp.my_from === from
		) {
			return sp.my_id
		}
	}

	// TODO: Throw error if a sp not found.
	return -1
}

// Validates special sp action.
// Used in end_update() in world.js
// eslint-disable-next-line no-unused-vars
function is_sp_action(action, id) {
	if (V.actions) {
		if (id === undefined)
			return V.actions[action] === 1
		if (V.actions[action] === undefined)
			return false
		if (!Array.isArray(V.actions[action]))
			throw new Error("action is not a list: " + action)

		let sp_action_ids = V.actions[action].map(entry => find_sp(entry))
		return sp_action_ids.includes(id)
	}
	return false
}

function on_click_sp(evt) {
	if (evt.button === 0) {
		var sp = evt.currentTarget.thing
		evt.stopPropagation()
		if (_focus_stack(sp.element.parentElement.thing)) {
			if (!send_action("sp", package_sp_id(sp.my_id)))
				_blur_stack()
		}
	}
}

function package_sp_id(id) {
	let sp = lookup_sp(id)

	return package_sp_action(
		sp.my_player,
		sp.my_type,
		sp.my_strength,
		sp.my_area,
		sp.my_from,
		sp.am_moving
	)
}

class SP extends Thing {
	constructor(element, type, action, id) {
		// We can now conveniently use all standard Thing functions excepting those which affect actions.
		super(element, action, id)

		// Flag to layout SP separately when selecting a force.
		this.am_moving = false

		// Owner (RUSSIA or FRANCE)
		this.my_player = -1

		// Type (one of the 12 SP types)
		this.my_type = type

		// Strength (Full strength or half strength)
		this.my_strength = FULL_STRENGTH

		// Area
		this.my_area = -1

		// Area the SP entered the area from (relevant to battles)
		this.my_from = -1
	}

	// Modified action method. Calls a modified callback that supports thikjuyhnm e bitpacked argument.
	action() {
		if (!this.is_action) {
			this.is_action = true
			this.element.addEventListener("mousedown", on_click_sp)
			world.action_list.push(this)
		}
		return this
	}
}

// === SP BITPACKING ===
const SP_MOVING_SHIFT 	= 28
const SP_AREA_SHIFT 	= 20
const SP_FROM_SHIFT 	= 12
const SP_STRENGTH_SHIFT = 11
const SP_PLAYER_SHIFT 	= 10
const SP_TYPE_SHIFT 	= 6
const SP_NUM_SHIFT 	= 0

const SP_MOVING_MASK	= 1 << SP_MOVING_SHIFT
const SP_AREA_MASK 	= 0xFF << SP_AREA_SHIFT
const SP_FROM_MASK 	= 0xFF << SP_FROM_SHIFT
const SP_STRENGTH_MASK 	= 1 << SP_STRENGTH_SHIFT
const SP_PLAYER_MASK 	= 1 << SP_PLAYER_SHIFT
const SP_TYPE_MASK	= 0xF << SP_TYPE_SHIFT
const SP_NUM_MASK 	= 0b111111 << SP_NUM_SHIFT

// Whether an SP is selected to move (for UI purposes)
function decode_sp_moving(entry) {
	return (entry & SP_MOVING_MASK) >>> SP_MOVING_SHIFT
}

// Where the SP is (for the special SP action)
function decode_sp_area(entry) {
	return (entry & SP_AREA_MASK) >>> SP_AREA_SHIFT
}

// Where the SP entered its current location from
function decode_sp_from(entry) {
	return (entry & SP_FROM_MASK) >>> SP_FROM_SHIFT
}

// The SP's current strength (HALF_STRENGTH or FULL_STRENGTH)
function decode_sp_strength(entry) {
	return (entry & SP_STRENGTH_MASK) >>> SP_STRENGTH_SHIFT
}

// The SP's owner (RUSSIA or FRANCE)
function decode_sp_player(entry) {
	return (entry & SP_PLAYER_MASK) >>> SP_PLAYER_SHIFT
}

// The SP's type (matches one of the 12 types)
function decode_sp_type(entry) {
	return (entry & SP_TYPE_MASK) >>> SP_TYPE_SHIFT
}

// The number of SPs of a specific nationality and type in an area. Max. of 63 (should be more than enough, even for the fuzzer)
function decode_sp_num(entry) {
	return (entry & SP_NUM_MASK) >>> SP_NUM_SHIFT
}

function get_first_counter(player, type) {
	return FIRST_SPS[get_sp_bucket(type)][get_sp_nationality(player, type)]
}

function get_last_counter(player, type) {
	return LAST_SPS[get_sp_bucket(type)][get_sp_nationality(player, type)]
}

function get_used(player, type) {
	return used_sps[get_sp_bucket(type)][get_sp_nationality(player, type)]
}

function incr_used(player, type) {
	return used_sps[get_sp_bucket(type)][get_sp_nationality(player, type)]++
}

function reset_used() {
	used_sps = [
		[first_ru_inf, first_fr_inf, first_fr_pr_inf, first_fr_au_inf],
		[first_ru_cav, first_fr_cav],
		[first_ru_cossack, first_fr_guard],
	]
}

// === INITIALIZE THINGS ===
/* HELPERS */
function translate_right(rect, amt) {
	rect[0] += amt
	return rect
}

function define_sp(type, id) {
	return new SP(document.createElement("div"), type, "sp", id)
}

function define_sp_of_type(type, id, nationality) {
	let sp =  define_sp(type, id)
		.keyword(get_sp_selector(type))
		.action()
		.animate()
		.stackable()
		.keyword(get_abbreviation(nationality))

	define_thing("sp-text", id)
	sp.my_player = get_faction(nationality)

	return sp
}

function define_sp_type_list(player, type) {
	for (let i = get_first_counter(player, type); i <= get_last_counter(player, type); ++i)
		define_sp_of_type(type, i, get_sp_nationality(player, type))
}

function move_offset_x(area) {
	let a = layout[get_area_name(area)].slice()
	return a[0] + 15
}

function move_offset_y(area) {
	let a = layout[get_area_name(area)]
	return a[1] - 15
}

// eslint-disable-next-line no-unused-vars
function on_init() {
	define_board("#map", 2500, 2027, [0, 0, 0, 0])

	define_panel("#plan_orders", "plan_orders", 0)
	define_panel("#table", "table", 0)
	define_panel("#hand", "hand", 0)
	define_html_thing("#vp_display", "vp_display", 0)

	create_window("russian_cards_dialog", "Inspect Russian Cards", update_russian_cards_dialog, true)
	create_window("french_cards_dialog", "Inspect French Cards", update_french_cards_dialog, true)

	/* AREAS */
	for (let area = FIRST_AREA; area <= LAST_AREA; ++area) {
		define_space("area", area, layout[get_area_name(area)], get_area_type(area))
			.tooltip(`${process_area_name(get_area_name(area))} (${get_area_zone(area)})`)
		define_stack("area_stack", area, layout[get_area_name(area)], -8, -8, 0, -58, 0, 36, 1, 60)
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
		define_space("connection", connection, layout[`Connection${connection}`])//.tooltip(connection)
		define_stack("connection_stack", connection, layout[`Connection${connection}`], -8, -8, 0, -58, 0, 36, 1, 60)
	}

	/* ORDERS */
	for (let order = first_russia_order; order <= last_france_order; ++order)
		define_piece("order", order, get_order_keyword(order))

	/* LEADERS */
	for (let player = RUSSIA; player <= FRANCE; ++player) {
		for (let leader = get_first_leader(player); leader <= get_last_leader(player); ++leader) {
			define_piece("leader", leader, `${get_abbreviation(player)} ${get_leader_short_name(leader)}`)
				.stackable()
		}
	}

	/* SPs */
	// Uses the fresh version of the SP by default (the counter might become exhausted later in on_update()).
	define_sp_type_list(RUSSIA, FRESH_INFANTRY)
	define_sp_type_list(FRANCE, FRESH_INFANTRY)
	define_sp_type_list(FRANCE, FRESH_PRUSSIAN_INFANTRY)
	define_sp_type_list(FRANCE, FRESH_AUSTRIAN_INFANTRY)

	define_sp_type_list(RUSSIA, FRESH_CAVALRY)
	define_sp_type_list(FRANCE, FRESH_CAVALRY)

	define_sp_type_list(RUSSIA, FRESH_COSSACK)
	define_sp_type_list(FRANCE, FRESH_GUARD)

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
function populate_moving(area, child_name, child_id) {
	update_position("move", 0, move_offset_x(area), move_offset_y(area))
	populate("move", 0, child_name, child_id)
}

function scroll_to_hand() {
	scroll_into_view(document.getElementById("hand"))
}

// eslint-disable-next-line no-unused-vars
function on_update() {
	begin_update()

	roles[RUSSIA].stat.innerHTML = `${V.hand_length[RUSSIA]} cards`
	roles[FRANCE].stat.innerHTML = `${V.hand_length[FRANCE]} cards`

	if (!is_observer(R))
		roles[R].stat.addEventListener("click", scroll_to_hand)

	reset_sp_trackers()

	update_tracks()
	update_sps()
	update_leaders()
	update_depots()
	update_devastation()
	update_orders()
	update_sidebar()
	update_cards()

	// Attrition checked markers
	if (V.attrition_checked) {
		let marker = 0
		for (let area of V.attrition_checked)
			populate("area_stack", area, "attrition_checked", marker++)
	}

	define_buttons()

	end_update()
}

/* TIME, VP, INITIATIVE */
function update_tracks() {
	// Time
	populate("track-time", V.turn, "time", 0)
	populate("track-time", V.end_turn, "time", 1)

	// VP
	update_keyword("vp", 0, V.vp >= 0 ? "fr" : "ru")
	populate("track-vp", Math.min(Math.max(0, Math.abs(V.vp)), 20), "vp", 0)

	// Initiative
	update_keyword("initiative", 0, V.initiative > 0 ? "fr" : "ru")
	populate("track-initiative", Math.abs(V.initiative), "initiative", 0)
}

/* LEADERS */
function update_leaders() {
	let leaders = V.seniority.flat(1).reverse()
	for (let leader of leaders) {
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
							populate_moving(location, "leader", leader)
						} else {
							if (get_seniormost_leader_on_connection(get_leader_owner(leader), force.from, location) === leader || R === get_leader_owner(leader)) {
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
				if (V.move && V.move.leaders && V.move.path && V.move.path.length === 1 && set_has(V.move.leaders, leader))
					populate_moving(location, "leader", leader)
				else if (R === get_leader_owner(leader) || (R !== get_leader_owner(leader) && is_seniormost_leader(leader, location)))
					populate("area_stack", get_leader_location(leader), "leader", leader)
			}
		}
	}
}

/* SPs */
function lookup_sp(id) {
	return lookup_thing("sp", id)
}

function reset_sp_trackers() {
	reset_used()
	used_half_strength[RUSSIA] = 0
	used_half_strength[FRANCE] = 0
}

function update_sp_exhaustion(id, state) {
	let sp = lookup_thing("sp", id)
	if (!sp)
		throw new Error (`Troop ${id} not found!`)
	update_keyword("sp", id, state)
	if (is_exhausted(sp.my_type) && state === FRESH || is_fresh(sp.my_type) && state === EXHAUSTED)
		sp.my_type = toggle_sp_type_exhaustion(sp.my_type)
}

function toggle_sp_type_exhaustion(type) {
	if (is_fresh(type))
		return type + 1
	else
		return type - 1
}

function populate_half_strength(player, parent_id, half_strength = true, count = 1) {
	let sp = lookup_sp(parent_id)

	if (player === FRANCE && (is_event_active(C_HARD_MARCHING_1) || is_event_active(C_HARD_MARCHING_2)))
		--count

	if (
		player === FRANCE
		&& map_has(V.battles, sp.my_area)
		&& (
			(is_battle_event_active(sp.my_area, C_SKILLFULL_MANEUVERS) && get_event_keyword(C_SKILLFULL_MANEUVERS, "cancels") !== "river")
			|| is_battle_event_active(sp.my_area, C_EBLES_PONTONEERS)
		)
	) {
		--count
	}

	if (count > 0)
		populate_generic("sp", parent_id, `half_strength_${get_abbreviation(player)}`, count)

	if (half_strength)
		sp.my_strength = HALF_STRENGTH
}

function populate_sp(player, type, parent_action, parent_id) {
	let sp_id = get_used(player, type)

	populate(parent_action, parent_id, "sp", sp_id)

	// Reset flag each render
	lookup_sp(sp_id).my_strength = FULL_STRENGTH
	lookup_sp(sp_id).am_moving = 0
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

/* DEPOTS */
function update_depots() {
	for (let depot = 0; depot < V.depots.length; ++depot) {
		if (V.depots[depot] === POOL) {
			populate(get_pool_depots((depot < 14 ? RUSSIA : FRANCE)), 0, "depot", depot)
		} else {
			populate("area", V.depots[depot], "depot", depot)
		}
	}
}

/* DEVASTATION */
function update_devastation() {
	map_for_each(V.devastation, (area, amount) => {
		populate("area", area, "devastation", area)
		update_keyword("devastation", area, `lvl${amount}`)
	})
}

/* ORDERS */
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

/* SIDEBAR */
function update_sidebar() {
	const sidebar = document.getElementById("vp_display")

	if (V.vp === 0)
		sidebar.innerHTML = `<b>VP:</b> ${V.vp}`
	else
		sidebar.innerHTML = `<b>VP:</b> ${ROLES[V.vp > 0 ? FRANCE : RUSSIA]} ${Math.abs(V.vp)}`

	sidebar.innerHTML += `<br>`
	sidebar.innerHTML += `<b>Initiative:</b> ${ROLES[V.initiative > 0 ? FRANCE : RUSSIA]} ${Math.abs(V.initiative)}`
}

/* CARDS */
function update_cards() {
	for (let card of V.current_hand)
		populate("hand", 0, "card", card)

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
}

/* BUTTONS */
function define_buttons() {
	for (let leader = 0; leader <= 13; ++leader)
		action_button_with_argument(`leader_button`, leader, leaders[leader].log_name)

	for (let type = 0; type < NUM_SP_TYPES; ++type) {
		action_button_with_argument("sp_button", type, get_sp_type_name(type))
		if (is_infantry(type))
			action_button_with_argument("sp_2x", type, `2x ${get_sp_type_name(type)}`)
		action_button_with_argument("add_sp", type, `+ ${get_sp_type_name(type)}`)
		action_button_with_argument("remove_sp", type, `+ ${get_sp_type_name(type)}`)
	}

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

	confirm_action_button("end_place_orders", "Done", "You have not yet placed all orders. Confirm passing?")

	action_button("undo", "Undo")
}

// === UPDATE DIALOGS ===
function format_card(card, highlight = NONE) {
	return escape_text(`C${highlight === NONE ? "N" : ROLES[highlight][0]}${card}`)
}

function print_cards_section(arr, acc, title, list, del = true) {
	arr.push(`<dt>` + title + ` (` + list.length + `)`)
	if (list.length > 0) {
		for (let card of list) {
			arr.push(`<dd>[${get_card_ops(card)}] ${format_card(card)}`)
			if (del)
				set_delete(acc, card)
		}
	} else {
		arr.push(`<dd>Nothing`)
	}
}

function update_cards_dialog(player, viewer) {
	var text = []
	var cards = []
	for (let i = get_first_card(player); i <= get_last_card(player); ++i)
		cards.push(i)

	text.push(`<d1>`)
	if (V.discard)
		print_cards_section(text, cards, `Discarded Cards`, V.discard[player])
	print_cards_section(text, cards, `Removed from Play`, V.removed[player])
	print_cards_section(text, cards, `Set Aside`, V.set_aside[player])
	print_cards_section(text, cards, `In Hand or Deck`, cards, false)
	text.push(`</d1>`)

	return text.join("")
}

function update_russian_cards_dialog() {
	return update_cards_dialog(RUSSIA, R)
}

function update_french_cards_dialog() {
	return update_cards_dialog(FRANCE, R)
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

// eslint-disable-next-line no-unused-vars
function on_prompt(text) {
	return escape_text(text)
}

// eslint-disable-next-line no-unused-vars
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

function array_delete(array, index) {
	var i, n = array.length
	for (i = index + 1; i < n; ++i)
		array[i - 1] = array[i]
	array.length = n - 1
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