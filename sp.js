/* global world, Thing */

// TODO: Animate positions

// Class declaration for handling the special characteristics of SPs.
// WARNING: Modifies world.js framework.

const RUSSIA = 0
const FRANCE = 1
const PRUSSIA = 2
const AUSTRIA = 3

function get_faction(nation) {
	return (nation === RUSSIA) ? RUSSIA : FRANCE
}

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

var used_sps = [
	[first_ru_inf, first_fr_inf, first_fr_pr_inf, first_fr_au_inf],
	[first_ru_cav, first_fr_cav],
	[first_ru_cossack, first_fr_guard],
]

var used_half_strength = [0, 0]

const FRESH = "fresh"
const EXHAUSTED = "exhausted"

// === GENERAL FUNCTIONS ===
function is_infantry(type) {
	return set_has([FRESH_INFANTRY, EXHAUSTED_INFANTRY, FRESH_PRUSSIAN_INFANTRY, EXHAUSTED_PRUSSIAN_INFANTRY, FRESH_AUSTRIAN_INFANTRY, EXHAUSTED_AUSTRIAN_INFANTRY], type)
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

function get_exhaustion_selector(type) {
	return is_exhausted(type) ? EXHAUSTED : FRESH
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
	if (type === FRESH_INFANTRY || type === EXHAUSTED_INFANTRY) {
		if (player === RUSSIA) return first_ru_inf
		if (player === FRANCE) return first_fr_inf
	} else if (type === FRESH_CAVALRY || type === EXHAUSTED_CAVALRY ) {
		if (player === RUSSIA) return first_ru_cav
		if (player === FRANCE) return first_fr_cav
	} else if (type === FRESH_COSSACK || type === EXHAUSTED_COSSACK) {
		return first_ru_cossack
	} else if (type === FRESH_GUARD || type === EXHAUSTED_GUARD) {
		return first_fr_guard
	} else if (type === FRESH_PRUSSIAN_INFANTRY || type === EXHAUSTED_PRUSSIAN_INFANTRY) {
		return first_fr_pr_inf
	} else if (type === FRESH_AUSTRIAN_INFANTRY || type === EXHAUSTED_AUSTRIAN_INFANTRY) {
		return first_fr_au_inf
	}
}

function get_last_counter(player, type) {
	if (type === FRESH_INFANTRY || type === EXHAUSTED_INFANTRY) {
		if (player === RUSSIA) return last_ru_inf
		if (player === FRANCE) return last_fr_inf
	} else if (type === FRESH_CAVALRY || type === EXHAUSTED_CAVALRY ) {
		if (player === RUSSIA) return last_ru_cav
		if (player === FRANCE) return last_fr_cav
	} else if (type === FRESH_COSSACK || type === EXHAUSTED_COSSACK) {
		return last_ru_cossack
	} else if (type === FRESH_GUARD || type === EXHAUSTED_GUARD) {
		return last_fr_guard
	} else if (type === FRESH_PRUSSIAN_INFANTRY || type === EXHAUSTED_PRUSSIAN_INFANTRY) {
		return last_fr_pr_inf
	} else if (type === FRESH_AUSTRIAN_INFANTRY || type === EXHAUSTED_AUSTRIAN_INFANTRY) {
		return last_fr_au_inf
	}
}

function get_used(who, type) {
	switch(type) {
	case FRESH_INFANTRY:
	case EXHAUSTED_INFANTRY:
		return used_sps[INFANTRY][who]
	case FRESH_CAVALRY:
	case EXHAUSTED_CAVALRY:
		return used_sps[CAVALRY][who]
	case FRESH_COSSACK:
	case EXHAUSTED_COSSACK:
		return used_sps[SPECIAL][RUSSIA]
	case FRESH_GUARD:
	case EXHAUSTED_GUARD:
		return used_sps[SPECIAL][FRANCE]
	case FRESH_PRUSSIAN_INFANTRY:
	case EXHAUSTED_PRUSSIAN_INFANTRY:
		return used_sps[INFANTRY][PRUSSIA]
	case FRESH_AUSTRIAN_INFANTRY:
	case EXHAUSTED_AUSTRIAN_INFANTRY:
		return used_sps[INFANTRY][AUSTRIA]
	}
}

function incr_used(who, type) {
	switch(type) {
	case FRESH_INFANTRY:
	case EXHAUSTED_INFANTRY:
		return used_sps[INFANTRY][who]++
	case FRESH_CAVALRY:
	case EXHAUSTED_CAVALRY:
		return used_sps[CAVALRY][who]++
	case FRESH_COSSACK:
	case EXHAUSTED_COSSACK:
		return used_sps[SPECIAL][RUSSIA]++
	case FRESH_GUARD:
	case EXHAUSTED_GUARD:
		return used_sps[SPECIAL][FRANCE]++
	case FRESH_PRUSSIAN_INFANTRY:
	case EXHAUSTED_PRUSSIAN_INFANTRY:
		return used_sps[INFANTRY][PRUSSIA]++
	case FRESH_AUSTRIAN_INFANTRY:
	case EXHAUSTED_AUSTRIAN_INFANTRY:
		return used_sps[INFANTRY][AUSTRIA]++
	}
}

function reset_used() {
	used_sps = [
		[first_ru_inf, first_fr_inf, first_fr_pr_inf, first_fr_au_inf],
		[first_ru_cav, first_fr_cav],
		[first_ru_cossack, first_fr_guard],
	]
}

// === SEND AND RECEIVE SPECIAL ACTION ===

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

// === SPECIAL TROOP ELEMENTS ===

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

	// Modified action method. Calls a modified callback that supports the bitpacked argument.
	action() {
		if (!this.is_action) {
			this.is_action = true
			this.element.addEventListener("mousedown", on_click_sp)
			world.action_list.push(this)
		}
		return this
	}
}

/* DEFINE SPs */

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

function define_sp_type_list(type, a, b, keywords) {
	for (let i = a; i <= b; ++i)
		define_sp_of_type(type, i, keywords)
}

function define_sps() {
	define_sp_type_list(FRESH_INFANTRY, first_ru_inf, last_ru_inf, RUSSIA)
	define_sp_type_list(FRESH_INFANTRY, first_fr_inf, last_fr_inf, FRANCE)
	define_sp_type_list(FRESH_PRUSSIAN_INFANTRY, first_fr_pr_inf, last_fr_pr_inf, PRUSSIA)
	define_sp_type_list(FRESH_AUSTRIAN_INFANTRY, first_fr_au_inf, last_fr_au_inf, AUSTRIA)

	define_sp_type_list(FRESH_CAVALRY, first_ru_cav, last_ru_cav, RUSSIA)
	define_sp_type_list(FRESH_CAVALRY, first_fr_cav, last_fr_cav, FRANCE)

	define_sp_type_list(FRESH_COSSACK, first_ru_cossack, last_ru_cossack, RUSSIA)
	define_sp_type_list(FRESH_GUARD, first_fr_guard, last_fr_guard, FRANCE)
}

/* UPDATE SPs */

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
	populate_generic("sp", parent_id, `half_strength_${get_abbreviation(player)}`, count)

	let sp = lookup_sp(parent_id)
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