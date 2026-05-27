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
const spaces = data.spaces
const space_length = spaces.length

const AVAILABLE = 0
const FRENCH_CASUALTIES = 156
const OUT_OF_PLAY = 157

function get_space_name(space) {
    return spaces[space].name
}

/* LEADERS */
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

function is_seniormost_leader(who, space) {
    let faction = get_leader_faction(who)
    for (let leader = get_first_leader(faction); leader <= get_last_leader(faction); ++leader) {
        if (get_leader_location(leader) === space) {
            return (who === leader)
        }
    }
    return false
}

function get_seniormost_leader(faction, space) {
    for (let leader = get_first_leader(faction); leader <= get_last_leader(faction); ++leader) {
        if (get_leader_location(leader) === space) {
            return leader
        }
    }
    return -1
}

/* ORDERS */
const first_ru_order = 0
const last_ru_order = 28
const first_fr_order = 29
const last_fr_order = 53

function get_player_orders(who) {
    return (who === RUSSIA) ? G.russian.orders : (who === FRANCE) ? G.french.orders : null
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

const first_ru_inf = 0
const last_ru_inf = 79
const first_fr_inf = 80
const last_fr_inf = 134
const first_pr_inf = 135
const last_pr_inf = 139
const first_au_inf = 140
const last_au_inf = 150

const first_ru_cav = 0
const last_ru_cav = 15
const first_fr_cav = 16
const last_fr_cav = 30

const first_ru_cossack = 0
const last_ru_cossack = 15

const first_fr_guard = 0
const last_fr_guard = 4

var used_troops = [
    [first_ru_inf, first_fr_inf, first_pr_inf, first_au_inf],
    [first_ru_cav, first_fr_cav],
    [first_ru_cossack, first_fr_guard],
]

const last_troops = [
    [last_ru_inf, last_fr_inf, last_pr_inf, last_au_inf],
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
    }
}

function incr_used(who, type) {
    switch(type) {
        case FRESH_INFANTRY:
        case EXHAUSTED_INFANTRY:
            return used_troops[INFANTRY][who]++; break
        case FRESH_CAVALRY:
        case EXHAUSTED_CAVALRY:
            return used_troops[CAVALRY][who]++; break
        case FRESH_COSSACK:
        case EXHAUSTED_COSSACK:
            return used_troops[SPECIAL][RUSSIA]++; break
        case FRESH_GUARD:
        case EXHAUSTED_GUARD:
            return used_troops[SPECIAL][FRANCE]++; break
    }
}

function reset_used() {
    used_troops = [
        [first_ru_inf, first_fr_inf, first_pr_inf, first_au_inf],
        [first_ru_cav, first_fr_cav],
        [first_ru_cossack, first_fr_guard],
    ]
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

/* MISC FUNCTIONS */
function get_pool(side) {
    return (side === RUSSIA) ? "ru_pool" : "fr_pool"
}

function get_played_cards(side) {
    return (side === RUSSIA) ? V.russian.played_cards : V.french.played_cards
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
    for (let s = 1; s < space_length; ++s) {
        define_space("space", s, layout[get_space_name(s)])
        define_stack("space_stack", s, layout[get_space_name(s)])
    }
    define_layout("ru_pool", 0, layout["Russia Force Pool"], "square")
    define_layout("fr_pool", 0, layout["France Force Pool"], "square")
    define_layout("fr_casualties", 0, layout["France Casualties"], "square")

    /* ORDERS */
    data.orders.forEach(({ owner, type, id }) => {
        define_piece("order", id, `${type} ${get_abbreviation(owner)}`)
    })

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
            .keyword("square")
    }

    for (let leader = 0; leader < leaders.length; ++leader) {
        define_piece("leader", leader, get_leader_short_name(leader))
        define_leader_board(leader)
    }

    /* TROOPS */
    //Modified define_piece_list() adding a number keyword (to update values on counters)
    function define_troop_list(action, a, b, keywords) {
        for (var i = a; i <= b; ++i)
            define_piece(action, i, keywords)
                .keyword(`n${i}`)
                .stackable()
    }

    define_troop_list("infantry", first_ru_inf, first_fr_inf - 1, "ru")
    define_troop_list("infantry", first_fr_inf, first_pr_inf - 1, "fr")
    define_troop_list("infantry", first_pr_inf, first_au_inf - 1, "pr")
    define_troop_list("infantry", first_au_inf, (8 * space_length) - 1, "au")

    define_troop_list("cavalry", first_ru_cav, last_ru_cav, "ru")
    define_troop_list("cavalry", first_fr_cav, last_fr_cav, "fr")

    define_troop_list("cossack", 0, 15, "ru")
    define_troop_list("guard", 0, 4, "fr")

    /* CARDS */
    define_card_list("card", 0, 107, "card_")

    /* DEVASTATION/DEPOTS */
    define_marker_list("devastation", 0, 80)
    define_marker_list("depot", 0, 13, "ru")
    define_marker_list("depot", 14, 20, "fr")

    /* TRACKS */
    define_layout_track_v("track-vp", 0, 20, layout["VP Track"])
    define_marker("vp", FRANCE, "fr")
    define_marker("vp", RUSSIA, "ru")

    define_layout("track-time", JUNE_5, layout["June 5"])
    define_layout_track_h("track-time", JULY_5, JULY_R, layout["July"])
    define_layout_track_h("track-time", AUG_5, AUG_R, layout["AUG"])
    define_layout_track_h("track-time", SEPT_5, SEPT_R, layout["SEPT"])
    define_layout_track_h("track-time", OCT_5, OCT_R, layout["OCT"])
    define_layout_track_h("track-time", NOV_5, NOV_R, layout["NOV"])
    define_marker("time", 0, "current")
    define_marker("time", 1, "end")

    define_layout_track_v("track-initiative", 1, 4, layout["Initiative Track"])
    define_marker("initiative", FRANCE, "fr")
    define_marker("initiative", RUSSIA, "ru")
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

    for (let c of V.current_hand) {
        populate("hand", 0, "card", c)
    }

    if (get_played_cards(R).length === 0) {
        update_panel_show("played", 0, false)
    } else {
        update_panel_show("played", 0, true)
        for (let c of get_played_cards(R)) {
            populate("played", 0, "card", c)
        }
    }

    update_orders()    

    action_button("done", "Done")
    action_button("draw", "Draw")
    action_button("confirm", "Confirm")
    action_button("pass", "Pass")
    action_button("undo", "Undo")

    end_update()
}

function update_tracks() {
    //Time
    populate("track-time", V.turn, "time", 0)
    populate("track-time", V.last_turn, "time", 1)

    //VP
    if (V.vp >= 0) {
        populate("track-vp", V.vp, "vp", FRANCE)
    } else {
        populate("track-vp", Math.abs(V.vp), "vp", RUSSIA)
    }

    //Initiative
    if (V.initiative >= 0) {
        populate("track-initiative", V.initiative, "initiative", FRANCE)
    } else {
        populate("track-initiative", Math.abs(V.initiative), "initiative", RUSSIA)
    }
}

function update_leaders() {
    for (let leader = 0; leader < V.leaders.length; ++leader) {
        switch(get_leader_location(leader)) {
            case OUT_OF_PLAY: continue;
            case AVAILABLE:
                populate(get_pool(get_leader_faction(leader)), 0, "leader", leader); break
            case FRENCH_CASUALTIES:
                populate("fr_casualties", 0, "leader", leader); break
            default:
                if (is_seniormost_leader(leader, get_leader_location(leader))) {
                    populate("space", get_leader_location(leader), "leader", leader)
                    populate("leaders", get_leader_faction(leader), "leader_board", leader)
                } else {
                    populate("subordinate_leaders", get_seniormost_leader(get_leader_faction(leader), get_leader_location(leader)), "leader", leader)
                }
        }
    }
}

function update_troops() {
    for (let space in V.troops) {
        for (let who in V.troops[space]) {
            for (let type in V.troops[space][who]) {
                const s = Number(space)
                const owner = Number(who)
                const troop_type = Number(type)

                if (is_fresh(troop_type))
                    update_keyword(get_troop_name(troop_type), get_used(owner, troop_type), "fresh")
                else
                    update_keyword(get_troop_name(troop_type), get_used(owner, troop_type), "exhausted")

                if (has_friendly_leader(owner, s)) {
                    populate(`subordinate_${get_troop_bucket(troop_type)}`, get_seniormost_leader(owner, s), get_troop_name(troop_type), get_used(owner, troop_type))
                } else {
                    populate("space_stack", s, get_troop_name(troop_type), get_used(owner, troop_type))
                }
                const cntr = document.querySelector(`.piece.${get_troop_name(troop_type)}.${get_abbreviation(owner)}.n${get_used(owner, troop_type)}`)

                if (!cntr) {
                    console.warn("Missing troop element", { space: get_space_name(space), who: get_abbreviation(who), type: type})
                    continue
                }

                cntr.setAttribute("count", V.troops[space][who][type])
                incr_used(owner, troop_type)
            }
        }
    }
}

function update_depots() {
    for (let depot = 0; depot < V.depot.length; ++depot) {
        if (V.depot[depot] === AVAILABLE) {
            populate(get_pool((depot < 14 ? RUSSIA : FRANCE)), 0, "depot", depot)
        } else {
            populate("space", V.depot[depot], "depot", depot)
        }
    }
}

function update_devastation() {
    for (let dev in V.devastation) {
        update_keyword("devastation", num_devastated, `lvl${V.devastation[dev]}`)
        
        populate("space", Number(dev), "devastation", num_devastated)

        num_devastated++
    }
}

function update_orders() {
    //Show/hide the orders panel depending on current state
    if (V.state === "choose_orders" || V.state === "place_orders") {
        update_panel_show("plan_orders", 0, true)
    } else {
        update_panel_show("plan_orders", 0, false)
    }

    //Show the green outline for selected orders
    if (V.state === "choose_orders") {
        if (V.russian.selected_orders) {
            for (let order of V.russian.selected_orders) {
                update_keyword("order", order, "selected")
            }
        }
        if (V.french.selected_orders) {
            for (let order of V.french.selected_orders) {
                update_keyword("order", order, "selected")
            }
        }
    }

    //Populate orders
    for (const [space, orders] of Object.entries(get_player_orders(R))) {
        for (let order of orders) {
            if (Number(space) === AVAILABLE && (V.state === "choose_orders" || V.state === "place_orders")) {
                populate("plan_orders", 0, "order", Number(order.id))
            } else if (Number(space) !== AVAILABLE) {
                populate("space", Number(space), "order", Number(order.id))
            }
        }
    }
}

//=== LOG/PROMPT (WIP) ===
function escape_text(text) {
    escape_html(text)
    escape_typography(text)

    text = escape_tip_class_sub(text, /C(\d+)/g, "tip", "card card_$1", data.cards.map(card => card.name))
    return text
}

function on_log(text, ix) {
    var p = document.createElement("div")
    let is_box_header = false

	update_log_boxes(ix)

    switch(text[0]) {
        case "}":
			close_log_box(ix)
			return p
		case "{":
            let side = (Number(text.substring(2)) >= 54) ? "fr" : "ru"
			open_log_box(ix, side)
			is_box_header = true
			text = text.substring(1)
			break
        case "=":
            text = text.substring(1)
            p.className = 'h1'
            break
        case "#":
            text = text.substring(1)
            p.className = 'h2'
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