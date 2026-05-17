"use strict"

const RUSSIA = 0
const FRANCE = 1
const PRUSSIA = 2
const AUSTRIA = 3
const ROLES = ["Russia", "France"]

const spaces = data.spaces
const france_cards = data.france_cards
const russia_cards = data.russia_cards
const leaders = data.leaders

const abbreviations = ["ru", "fr", "pr", "au"]

const AVAILABLE = 0
const FRENCH_CASUALTIES = 156
const OUT_OF_PLAY = 157

/* LEADERS */
const ALEXANDER = 0
const KUTUZOV = 1
const TOLLY = 2 
const BAGRATION = 3
const TORMASOV = 4
const WITTGENSTEIN = 5
const CHICHAGOV = 6
const PLATOV = 7

const NAPOLEON = 8
const JEROME = 9
const BEAUHARNAIS = 10
const DAVOUT = 11
const MURAT = 12
const SCHWARZENBERG = 13

/* TROOPS */
const FRESH_INFANTRY = 0
const EXHAUSTED_INFANTRY = 4

const first_ru_infantry_fresh = 1
const first_fr_infantry_fresh = first_ru_infantry_fresh + spaces.length
const first_pr_infantry_fresh = first_fr_infantry_fresh + spaces.length
const first_au_infantry_fresh = first_pr_infantry_fresh + spaces.length
const first_ru_infantry_exhausted = first_au_infantry_fresh + spaces.length
const first_fr_infantry_exhausted = first_ru_infantry_exhausted + spaces.length
const first_pr_infantry_exhausted = first_fr_infantry_exhausted + spaces.length
const first_au_infantry_exhausted = first_pr_infantry_exhausted + spaces.length
const first_infantry = [
    first_ru_infantry_fresh, first_fr_infantry_fresh, first_pr_infantry_fresh, first_au_infantry_fresh,
    first_ru_infantry_exhausted, first_fr_infantry_exhausted, first_pr_infantry_exhausted, first_au_infantry_exhausted
]

const first_ru_cavalry_fresh = 1
const first_fr_cavalry_fresh = first_ru_cavalry_fresh + spaces.length
const first_ru_cavalry_exhausted = first_fr_cavalry_fresh + spaces.length
const first_fr_cavalry_exhausted = first_ru_cavalry_exhausted + spaces.length
const first_cavalry = [
    first_ru_cavalry_fresh, first_fr_cavalry_fresh,
    first_ru_cavalry_exhausted,  first_fr_cavalry_exhausted
]

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

function piece_on_map(piece) {
    return piece >= 1 && piece < FRENCH_CASUALTIES
}

//=== DATA FUNCTIONS
function get_leader_short_name(leader) {
    return leaders[leader].short_name
}

function get_leader_faction(leader) {
    return (leader >= ALEXANDER && leader <= PLATOV) ? RUSSIA : FRANCE
}

function get_seniormost_leader(faction, space) {
    switch(faction) {
        case RUSSIA:
            return V.leaders.slice(ALEXANDER, PLATOV + 1).indexOf(space)
        case FRANCE:
        case AUSTRIA:
        case PRUSSIA:
            return NAPOLEON + V.leaders.slice(NAPOLEON).indexOf(space)
    }
}

function has_leader(space) {
    return V.leaders.includes(space)
}

function has_friendly_leader(who, space) {
    return (who === RUSSIA && has_russian_leader(space)) || ((who === FRANCE || who === AUSTRIA || who === PRUSSIA) && has_french_leader(space))
}

function has_russian_leader(space) {
    return V.leaders.slice(ALEXANDER, PLATOV + 1).includes(space)
}

function has_french_leader(space) {
    return V.leaders.slice(NAPOLEON).includes(space)
}

function get_leader_loc(leader) {
    return V.leaders[leader]
}

function is_seniormost_leader(leader, space) {
    return get_seniormost_leader(get_leader_faction(leader), space) === leader
}
//=== INIT VIEW ===
function on_init() {
    define_board("#map", 2500, 2027, [0, 0, 0, 0])
    //Hand
    define_panel("#hand", "hand", 0)
    //Generals
    define_panel("#fr_leaders", "fr_leaders", 0)
    define_panel("#ru_leaders", "ru_leaders", 0)

    /* SPACES */
    for (let s = 1; s < spaces.length; ++s) {
        define_stack("space", s, layout[spaces[s].name], -20, -14).tooltip(`${spaces[s].name} - ${spaces[s].type}`)
    }
    define_layout("fr_pool", FRANCE, layout["France Force Pool"], "square")
    define_layout("ru_pool", RUSSIA, layout["Russia Force Pool"], "square")
    define_layout("fr_casualties", FRANCE, layout["France Casualties"], "square")

    /* LEADERS */
    for (let leader = 0; leader < leaders.length; ++leader) {
        define_piece("leader", leader, get_leader_short_name(leader))
        define_leader_board(leader)
    }

    /* TROOPS */
    define_infantry()
    define_cavalry()
    define_cossack()
    define_guard()

    /* CARDS */
    define_card_list("card", 0, 107, "card_")

    /* DEVASTATION */
    for (let i = 1; i <= 3; ++i) {
        define_marker_list(`devastation${i}`, 1, spaces.length - 1)
    }
    
    /* DEPOTS */
    define_marker_list("depot", 0, spaces.length - 1, "ru")
    define_marker_list("depot", spaces.length, (2 * spaces.length) - 1, "fr")

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

function define_troop_list(action, a, b, keywords) { //Modified define_piece_list adding a number keyword (to update values on counters)
	    for (var i = a; i <= b; ++i)
		    define_piece(action, i, keywords)
                .keyword(`n${i}`)
}

function define_infantry() {
    const sides = ["fresh", "exhausted"]
    const owners = abbreviations
    let i = 0
    for (let side = 0; side < sides.length; ++side) {
        for (let who = RUSSIA; who < owners.length; ++who) {
            define_troop_list("infantry", first_infantry[i], first_infantry[i] + spaces.length - 1, `${sides[side]} ${owners[who]}`)
            i++
        }
    }
}

function define_cavalry() {
    define_troop_list("cavalry", 0, spaces.length - 1, "fresh ru")
    define_troop_list("cavalry", spaces.length, (2 * spaces.length) - 1, "fresh fr")
    define_troop_list("cavalry", 2 * spaces.length, (3* spaces.length) - 1, "exhausted ru")
    define_troop_list("cavalry", 3 * spaces.length, (4* spaces.length - 1), "exhausted fr")
}

function define_guard() {
    define_troop_list("guard", 0, spaces.length - 1, "fresh")
    define_troop_list("guard", spaces.length, (2* spaces.length) - 1, "exhausted")
}

function define_cossack() {
    define_troop_list("cossack", 0, spaces.length - 1, "fresh")
    define_troop_list("cossack", spaces.length, (2* spaces.length) - 1, "exhausted")
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
        .keyword("square")
}

//=== UPDATE VIEW ===
function on_update() {
    begin_update()

    update_tracks()
    update_leaders()

    for (let c of V.current_hand) {
        populate("hand", 0, "card", c)
    }

    for (let s = 0; s < V.depot.length; ++s) {
        if (V.depot[s] === RUSSIA || V.depot[s] === FRANCE) {
            populate("space", s, "depot", (V.depot[s] === RUSSIA) ? s : s + spaces.length)
        }
    }

    update_infantry()
    update_cavalry()
    update_cossack()
    update_guard()

    for (let s = 0; s < V.devastation.length; ++s) {
        if (V.devastation[s] > 0) {
            populate("space", s, `devastation${V.devastation[s]}`, s)
        }
    }

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
        switch(V.leaders[leader]) {
            case OUT_OF_PLAY:
                break
            case AVAILABLE:
                populate(leaders[leader].faction === RUSSIA ? "ru_pool" : "fr_pool", leaders[leader].faction, "leader", leader); break
            case FRENCH_CASUALTIES:
                populate("fr_casualties", FRANCE, "leader", leader); break
            default:
                if (is_seniormost_leader(leader, get_leader_loc(leader))) { //Only the seniormost leader is put on-map
                    populate("space", V.leaders[leader], "leader", leader)
                    populate(((get_leader_faction(leader) === RUSSIA) ? "ru_leaders" : "fr_leaders"), 0, "leader_board", leader)
                    populate("leader_board", leader, "subordinate_leaders", leader)
                    populate("leader_board", leader, "subordinate_infantry", leader)
                    populate("leader_board", leader, "subordinate_special", leader)
                } else { //Others go onto the most senior leader's mat
                    populate("subordinate_leaders", get_seniormost_leader(leaders[leader].faction, V.leaders[leader]), "leader", leader)
                }
        }
    }
}

function update_infantry() {
    const sides = ["fresh", "exhausted"]
    const owners = abbreviations

    for (let who = 0; who < owners.length; ++who) {
        for (let s = 1; s < V.infantry[who].length; ++s) {
            for (let inf = 0; inf < first_infantry.length; ++inf) {
                if (V.infantry[who][s][inf] !== 0) {
                    if (has_friendly_leader(who, s)) {
                        populate("subordinate_infantry", get_seniormost_leader(who, s), "infantry", first_infantry[inf] + s)
                    } else {
                        populate("space", s, "infantry", first_infantry[inf] + s)
                    }
                    let cntr = document.querySelector(`.piece.infantry.${sides[Math.trunc(inf / 4)]}.${owners[who]}.n${first_infantry[inf] + s}`)
                    cntr.setAttribute("count", V.infantry[who][s][inf])
                }
            }
        }
    }
}

function update_cavalry() {
    const sides = ["fresh", "exhausted"]
    const owners = ["ru", "fr"]

    for (let who = 0; who < owners.length; ++who) {
        for (let s = 1; s < V.cavalry[who].length; ++s) {
            for (let cav = 0; cav < 2; ++cav) {
                if (V.cavalry[who][s][cav] !== 0) {
                    if (has_friendly_leader(who, s)) {
                        populate("subordinate_cavalry", get_seniormost_leader(who, s), "cavalry", first_cavalry[cav] + s)
                    } else {
                        populate("space", s, "cavalry", first_cavalry[cav] + s)
                    }
                    let cntr = document.querySelector(`.piece.cavalry.${sides[Math.trunc(cav / 2)]}.${owners[who]}.n${first_cavalry[cav] + s}`)
                    cntr.setAttribute("count", V.cavalry[who][s][cav])
                }
            }
        }
    }
}

function update_cossack() {
    for (let s = 1; s < V.cossack.length; ++s) {
        for (let side = 0; side < V.cossack[s].length; ++side) {
            if (V.cossack[s][side] !== 0) {
                if (has_friendly_leader(RUSSIA, s)) {
                        populate("subordinate_special", get_seniormost_leader(RUSSIA, s), "cossack", (side === 0 ? s : (spaces.length + s)))
                } else {
                        populate("space", s, "cossack", (side === 0 ? s : (spaces.length + s)))
                }
                let cntr = document.querySelector(`.piece.cossack.${ (side === 0 ? "fresh" : "exhausted")}.n${side === 0 ? s : (spaces.length + s)}`)
                cntr.setAttribute("count", V.cossack[s][side])
            }
        }
    }
}

function update_guard() {
    for (let s = 1; s < V.guard.length; ++s) {
        for (let side = 0; side < V.guard[s].length; ++side) {
            if (V.guard[s][side] !== 0) {
                if (has_friendly_leader(FRANCE, s)) {
                        populate("subordinate_special", get_seniormost_leader(FRANCE, s), "guard", (side === 0 ? s : (spaces.length + s)))
                } else {
                        populate("space", s, "guard", (side === 0 ? s : (spaces.length + s)))
                }
                let cntr = document.querySelector(`.piece.guard.${ (side === 0 ? "fresh" : "exhausted")}.n${side === 0 ? s : (spaces.length + s)}`)
                cntr.setAttribute("count", V.guard[s][side])
            }
        }
    }
}