
"use strict"

const data = require("./data")

const RUSSIA = 0
const FRANCE = 1
const PRUSSIA = 2
const AUSTRIA = 3
const ROLES = ["Russia", "France"]

const SCENARIOS = [
    //"The Eagles' March on Smolensk",
    //"The Eagles' March on Moscow",
    "The Grand Campaign",
    //"Hollow Victories",
    //"Battle of Smolensk Campaign Start",
    //"The Retreat of the Grande Armée",
]

function get_name(who) {
	switch(who) {
		case RUSSIA: return "Russia"
		case FRANCE: return "France"
		case PRUSSIA: return "Prussia"
		case AUSTRIA: return "Austria"
	}
}

var G, L, R, V, P = {}

//=== DATA ===
const spaces = data.spaces
const leaders = data.leaders
const cards = data.cards
const pieces = data.pieces
const orders = data.orders

/* SPACES */
const AVAILABLE = 0
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
const OUT_OF_PLAY = 157

/* LEADERS */
const ALEXANDER = 0
const KUTUZOV = 1
const TOLLY = 2 //Eliminated 'de' to make short form more concise
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
const FRESH = 0
const EXHAUSTED = 1

const FRESH_INFANTRY = 0
const EXHAUSTED_INFANTRY = 1
const FRESH_CAVALRY = 2
const EXHAUSTED_CAVALRY = 3
const FRESH_COSSACK = 4
const EXHAUSTED_COSSACK = 5
const FRESH_GUARD = 6
const EXHAUSTED_GUARD = 7

function get_type_name(type) {
	switch(type) {
		case FRESH_INFANTRY: return "fresh inf"
		case EXHAUSTED_INFANTRY: return "exhausted inf"
		case FRESH_CAVALRY: return "fresh cav"
		case EXHAUSTED_CAVALRY: return "exhausted cav"
		case FRESH_COSSACK: return "fresh cossack"
		case EXHAUSTED_COSSACK: return "exhausted cossack"
		case FRESH_GUARD: return "fresh guard"
		case EXHAUSTED_GUARD: return "exhausted guard"
	}
}

/* CARDS */
const first_ru_card = 0
const last_ru_card = 53
const first_fr_card = 54
const last_fr_card = 107

const RUSSIA_DUMMY = 0
const WELL_DISCIPLINED_RETREAT = 1
const CONFUSED_RETREAT = 2
const EVASIVE_MANEUVERS = 4

const FRANCE_DUMMY = 54
const HARD_MARCHING = first_fr_card + 1
const FAST_MARCHING = first_fr_card + 9
const MURATS_CAVALRY = first_fr_card + 13

/* TURN */
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

function get_turn_number(turn) {
	return (turn % 6 === 1) ? "R" : (turn % 6 === 0) ? 5 : ((turn % 6) - 1)
}

const DUMMY = 0

//=== DATA FUNCTIONS ===
/* LEADERS */
function get_leader_nationality(leader) {
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

function setup_leader(who, where) {
	G.leaders[who] = where
}

/* DEPOT/DEVASTATION */

function set_devastation(where, level) {
	G.devastation[where] = level
}

function setup_depot(who, where) {
	let depot = (who === RUSSIA) ? G.russian.depots : G.french.depots
	depot[depot.indexOf(AVAILABLE)] = where
}

/* TROOPS */
function is_fresh_or_exhausted(type) {
	return (type % 2 === 0) ? FRESH : EXHAUSTED
}

function get_map_from_type(type) {
	switch(type) {
		case FRESH_INFANTRY:
		case EXHAUSTED_INFANTRY:
			return G.infantry
		case FRESH_CAVALRY:
		case EXHAUSTED_CAVALRY:
			return G.cavalry
		case FRESH_COSSACK:
		case EXHAUSTED_COSSACK:
			return G.cossack
		case FRESH_GUARD:
		case EXHAUSTED_GUARD:
			return G.guard
	}
}

function init_troop_entry(type, where) {
	map_set(get_map_from_type(type), where, 0)
}

function setup_troop(owner, where, type, number) {
	if (!Object.hasOwn(G.troops, where))
		G.troops[where] = {}
	if (!Object.hasOwn(G.troops[where], owner)) {
        G.troops[where][owner] = {}
    }
	G.troops[where][owner][type] = (G.troops[where][owner][type] ?? 0) + number
}

function setup_russian_troop(where, type, number) {
	setup_troop(RUSSIA, where, type, number)
}

function setup_french_troop(where, type, number) {
	setup_troop(FRANCE, where, type, number)
}

/* HAND */
function get_card(side, number) {
	return (side === RUSSIA) ? number : (first_fr_card + number)
}

function is_must_play_event(card) {
	return cards[card].immediate === "true" || cards[card].immediate === true
}

function get_france_hand() {
	return G.hand[FRANCE]
}

function push_to_hand(who, cards) {
	if (Array.isArray(cards)) {
		for (let c of cards) {
			G.hand[who].push(c)
		}
	} else {
		G.hand[who].push(cards)
	}
}

function get_russia_hand() {
	return G.hand[RUSSIA]
}

function discard_card(card) {
	if (card >= first_ru_card && card <= last_ru_card) {
		array_delete_item(get_russia_hand(), card)
		G.discard[RUSSIA].push(card)
	} else {
		array_delete_item(get_france_hand(), card)
		G.discard[FRANCE].push(card)
	}
}

function get_hand(who) {
	return (who === RUSSIA) ? G.hand[RUSSIA] : G.hand[FRANCE]
}

function is_dummy(card) {
	return card === FRANCE_DUMMY || card === RUSSIA_DUMMY
}

function get_card_name(card) {
	return cards[card].name
}

function draw_card(who) {
	G.hand[who].push(G.deck[who].pop())
}

P.setup_hand = {
	_begin() {
		log_h2("Setup")
		L.has_discarded = [false, false]
		L.cards_discarded = [[], []]
	},
	prompt() {
		if (L.has_discarded[R]) {
			V.prompt = "Review drawn cards."
			button("done")
		} else {
			V.prompt = "You may discard any cards in your hand before drawing new cards."
			for (let card of get_hand(R)) {
				if (!is_dummy(card)) {
					action("card", card)
				}
			}
			if (L.cards_discarded[R].length == 0) {
				button("pass")
			}
			if (L.cards_discarded[R].length > 0) {
				button("undo")
				button("draw")
			}
		}
 	},
	card(card) {
		push_undo()
		console.log(L.cards_discarded[R])
		discard_card(card)
		L.cards_discarded[R].push(card)
	},
	undo() {
		let c = G.discard[R].pop()
		G.hand[R].push(c)
		array_delete_item(L.cards_discarded[R], c)
	},
	draw() {
		L.has_discarded[R] = true

		while (get_hand(R).length < 4) {
			draw_card(R)
			let card = G.hand[R][G.hand[R].length - 1]
			while (is_must_play_event(card)) {
				discard_card(G.hand[R][G.hand[R].length - 1])
				draw_card(R)
				card = G.hand[R][G.hand[R].length - 1]
			}
		}
	},
	pass() {
		log(`${ROLES[R]} did not discard cards.`)
		this.done()
	},
	done() {
		set_delete(G.active, R)

		if (G.active.length === 0) {
			for (let who = RUSSIA; who <= FRANCE; ++who) {
				for (let c of L.cards_discarded[who]) {
					log(`${ROLES[who]} discarded C${c}.`)
				}
			}

			call("june")
		}
	}
}

function who_has_initiative() {
	return (G.initiative > 0 ? FRANCE : RUSSIA)
}

P.june = script(`
	log "=June"

	set G.active [RUSSIA, FRANCE]
	call turn	
`)

P.turn = script(`
	eval {
		log_h2("Turn " + get_turn_number(G.turn))
	}
	
	set G.active (1 - G.who_has_initiative)
	call draw_card
	set G.active G.who_has_initiative
	call draw_card

	set G.active [RUSSIA, FRANCE]
	call play_card_for_orders

	set G.active [RUSSIA, FRANCE]
	call choose_orders


`)

P.draw_card = {
	_begin() {
		L.has_drawn_card = false
		L.executed_event = false
	},
	prompt() {
		if (L.executed_event) {
			V.prompt = "Draw a card: done."
			button("done")
		} else if (L.has_drawn_card) {
			V.prompt = `You drew C${L.drawn_card}.`
			button("confirm")
		} else {
			V.prompt = "Draw a card."
			button("draw")
		}
	},
	draw() {
		draw_card(G.active)
		L.drawn_card = G.hand[G.active][G.hand[G.active].length - 1]
		L.has_drawn_card = true
		log(`${ROLES[G.active]} drew a card.`)
		if (is_must_play_event(L.drawn_card)) {
			call("event", { card: L.drawn_card })
		}
	},
	done() {
		end()
	},
	confirm() {
		end()
	},
	_resume() {
		L.executed_event = true
	}
}

function get_card_ops(card) {
	return cards[card].ops
}

function place_card_on_table(c) {
	if (c < 54) {
		G.russian.played_cards.push(c)
	} else {
		G.french.played_cards.push(c)
	}
}

function get_played_cards(who) {
	return (who === RUSSIA) ? G.russian.played_cards : G.french.played_cards
}

P.play_card_for_orders = {
	_begin() {
		log_h2("Play Cards")
		L.played_card = [-1, -1]
		L.ops_played = [-1, -1]
	},
	prompt() {
		if (L.played_card[R] === -1) {
			V.prompt = "Play a card to gain additional orders, or play a Dummy."
			for (let c of G.hand[R]) {
				action("card", c)
			}
		} else {
			V.prompt = `You played C${L.played_card[R]}.`
			button("confirm")
			button("undo")
		}
	},
	card(c) {
		push_undo()
		L.played_card[R] = c
		L.ops_played[R] = get_card_ops(c)
		array_delete_item(G.hand[R], c)
		place_card_on_table(c)
	},
	undo() {
		L.played_card[R] = -1
		L.ops_played[R] = -1
		G.hand[R].push(get_played_cards(R).pop())
	},
	confirm() {
		set_delete(G.active, R)

		if (G.active.length === 0) {
			for (let who = RUSSIA; who <= FRANCE; ++who) {
				log(`${ROLES[who]} played C${L.played_card[who]} (${L.ops_played[who]}).`)
			}	
		}
	}
}

//=== EVENTS ===

P.event = script(`
	eval {card_box_begin(L.card)}
	call ("event_" + L.card)
	eval {
		discard_card(L.card)
		card_box_end()
	}
`)


P.event_76 = {
	_begin() {
	},
	prompt() {
		V.prompt = `C76: Russia may designate one order to remove after placing orders.`
		button("confirm")
	},
	confirm() {
		log("Russia may designate one order to remove after placing orders.")
		end()
	}
}

function set_out_of_play(leader) {
	G.leaders[leader] = OUT_OF_PLAY
}

P.event_78 = {
	prompt() {
		V.prompt = `C78: Remove Jérôme from play.`
		action("leader", JEROME)
	},
	leader(leader) {
		push_undo()
		set_out_of_play(JEROME)
		log("Jérôme removed from play.")
		end()
	}
}

P.event_93 = {
	prompt() {
		V.prompt = "C93: todo-not implemented yet."
		button("done")
	},
	done() {
		end()
	}
}

//=== SETUP ===
function on_setup(scenario, options) {

	G.leaders = Array(leaders.length).fill(AVAILABLE)
	G.troops = {}
	G.devastation = {}

	G.french = {}
	G.french.played_cards = []
	G.russian = {}
	G.russian.played_cards = []

	G.russian.depots = Array(14).fill(AVAILABLE)
	G.french.depots = Array(7).fill(AVAILABLE)

	G.deck = [[], []]
	G.discard = [[], []]

	switch(scenario) {
		default:
			setup_grand_campaign()
	}
}

function setup_grand_campaign() {
	log_h1("The Grand Campaign", false)
	log("French Logistic Preparations.")
	log("Winter.")
	G.turn = JUNE_5
	G.last_turn = NOV_5

	G.french_logistic_preparations = true

	G.vp = -14
	G.initiative = 1
	G.who_has_initiative = FRANCE
	//1-45, 1-39 
	
	for (let card = 1; card <= 45; ++card) {
		if (card <= 39) {
			G.deck[FRANCE].push(get_card(FRANCE, card))
		}
		G.deck[RUSSIA].push(card)
	}
	shuffle(G.deck[RUSSIA])
	shuffle(G.deck[FRANCE])

	let cards = [[WELL_DISCIPLINED_RETREAT, CONFUSED_RETREAT, EVASIVE_MANEUVERS], [HARD_MARCHING, FAST_MARCHING, MURATS_CAVALRY]]
	for (let who = RUSSIA; who <= FRANCE; ++who) {
		for (let c = 0; c < cards[who].length; ++c) {
			array_delete_item(G.deck[who], cards[who][c])
		}
	}

	G.hand = [[], []]
	setup_june_5()

	G.active = [RUSSIA, FRANCE]
	call("setup_hand")
}

function setup_june_5() {
	setup_russian_troop(S_RIGA, FRESH_INFANTRY, 2)
	setup_russian_troop(S_DUNABURG, FRESH_INFANTRY, 1)
	setup_depot(RUSSIA, S_DUNABURG)
	setup_leader(WITTGENSTEIN, S_KALTINENAI)
	setup_russian_troop(S_KALTINENAI, FRESH_INFANTRY, 2)
	setup_russian_troop(S_VILKOMIR, FRESH_CAVALRY, 2)
	setup_russian_troop(S_VILKOMIR, FRESH_INFANTRY, 2)
	setup_leader(ALEXANDER, S_VILNA)
	setup_leader(TOLLY, S_VILNA)
	setup_russian_troop(S_VILNA, FRESH_INFANTRY, 6)
	setup_depot(RUSSIA, S_VILNA)
	setup_russian_troop(S_SVENCIONYS, FRESH_INFANTRY, 3)
	setup_russian_troop(S_MOLODECHNO, FRESH_CAVALRY, 1)
	setup_russian_troop(S_MOLODECHNO, FRESH_INFANTRY, 1)
	setup_depot(RUSSIA, S_MINSK)
	setup_russian_troop(S_LIDA, FRESH_CAVALRY, 1)
	setup_russian_troop(S_LIDA, FRESH_CAVALRY, 2)
	setup_leader(PLATOV, S_GRODNO)
	setup_russian_troop(S_GRODNO, FRESH_COSSACK, 2)
	setup_russian_troop(S_BIALYSTOK, FRESH_CAVALRY, 1)
	setup_leader(BAGRATION, S_VOLKOVYSK)
	setup_russian_troop(S_VOLKOVYSK, FRESH_INFANTRY, 4)
	setup_russian_troop(S_BREST, FRESH_INFANTRY, 1)
	setup_depot(RUSSIA, S_BREST)
	setup_russian_troop(S_KOVEL, FRESH_CAVALRY, 1)
	setup_russian_troop(S_KOVEL, EXHAUSTED_CAVALRY, 1)
	setup_leader(TORMASOV, S_LUTSK)
	setup_russian_troop(S_LUTSK, FRESH_INFANTRY, 1)
	setup_russian_troop(S_LUTSK, EXHAUSTED_INFANTRY, 1)
	setup_depot(RUSSIA, S_LUTSK)
	setup_russian_troop(S_ROVNO, FRESH_INFANTRY, 1)
	setup_russian_troop(S_DUBNO, FRESH_INFANTRY, 1)
	setup_russian_troop(S_TOROPETS, FRESH_INFANTRY, 2)
	setup_russian_troop(S_POLOTSK, FRESH_INFANTRY, 1)
	setup_russian_troop(S_VITEBSK, FRESH_INFANTRY, 1)
	setup_depot(RUSSIA, S_VITEBSK)
	setup_russian_troop(S_SMOLENSK, FRESH_INFANTRY, 1)
	setup_depot(RUSSIA, S_SMOLENSK)
	setup_russian_troop(S_BORISOV, FRESH_INFANTRY, 1)
	setup_russian_troop(S_MOGILEV, FRESH_INFANTRY, 1)
	setup_depot(RUSSIA, S_MOGILEV)
	setup_russian_troop(S_BOBRUYSK, FRESH_INFANTRY, 1)
	setup_russian_troop(S_MOZYR, FRESH_INFANTRY, 1)
	setup_russian_troop(S_KIEV, FRESH_INFANTRY, 1)
	setup_depot(RUSSIA, S_KIEV)
	setup_depot(RUSSIA, S_ZHITOMIR)
	setup_russian_troop(S_MOSCOW, FRESH_INFANTRY, 1)
	setup_depot(RUSSIA, S_MOSCOW)
	setup_depot(RUSSIA, S_VYAZMA)
	setup_russian_troop(S_KALUGA, FRESH_INFANTRY, 1)
	setup_depot(RUSSIA, S_KALUGA)
	setup_russian_troop(S_OREL, FRESH_INFANTRY, 1)
	setup_depot(RUSSIA, S_OREL)
	setup_russian_troop(S_VORONEZH, FRESH_COSSACK, 1)

	setup_troop(PRUSSIA, S_PRUSSIA_NORTH, FRESH_INFANTRY, 3)

	setup_leader(NAPOLEON, S_KALVARIJA)
	setup_leader(MURAT, S_KALVARIJA)
	setup_french_troop(S_KALVARIJA, FRESH_INFANTRY, 19)
	setup_french_troop(S_KALVARIJA, FRESH_CAVALRY, 5)
	setup_french_troop(S_KALVARIJA, FRESH_GUARD, 4)

	setup_leader(BEAUHARNAIS, S_SUWALKI)
	setup_french_troop(S_SUWALKI, FRESH_INFANTRY, 7)
	setup_french_troop(S_SUWALKI, FRESH_CAVALRY, 1)

	setup_leader(JEROME, S_SZCZUCZY)
	setup_french_troop(S_SZCZUCZY, FRESH_INFANTRY, 6)
	setup_french_troop(S_SZCZUCZY, FRESH_CAVALRY, 2)

	setup_french_troop(S_GRAND_DUCHY_OF_WARSAW_NORTH, FRESH_INFANTRY, 2)

	setup_leader(SCHWARZENBERG, S_GRAND_DUCHY_OF_WARSAW_SOUTH)
	setup_troop(AUSTRIA, S_GRAND_DUCHY_OF_WARSAW_SOUTH, FRESH_INFANTRY, 3)

	setup_troop(AUSTRIA, S_AUSTRIA, FRESH_INFANTRY, 1)

	set_devastation(S_KALVARIJA, 1)
	set_devastation(S_SUWALKI, 1)
	set_devastation(S_SZCZUCZY, 1)

	push_to_hand(FRANCE, [FRANCE_DUMMY, HARD_MARCHING, FAST_MARCHING, MURATS_CAVALRY])
	push_to_hand(RUSSIA, [RUSSIA_DUMMY, WELL_DISCIPLINED_RETREAT, CONFUSED_RETREAT, EVASIVE_MANEUVERS])
}

//=== VIEW ===
function on_view() {
	V.turn = G.turn
	V.last_turn = G.last_turn
	V.french_logistic_preparations = G.french_logistic_preparations
	V.vp = G.vp
	V.initiative = G.initiative
	V.leaders = G.leaders
	V.current_hand = (R === RUSSIA) ? G.hand[RUSSIA] : G.hand[FRANCE]
	V.active = G.active
	V.troops = G.troops
	V.hand_length = [G.hand[RUSSIA].length, G.hand[FRANCE].length]
	V.devastation = G.devastation
	V.depot = [...G.russian.depots, ...G.french.depots]

	V.french = G.french
	V.russian = G.russian
}
function on_query(q) {}
function on_assert() {}

//=== LOG ===
function log_h1(msg, br = true) {
	if (br) log_br()
	log(`=${msg}`)
	log_br()
}

function log_h2(msg) {
	log_br()
	log(`#${msg}`)
	log_br()
}

function log_br() {
	log("")
}

function card_box_begin(card) {
	log_br()
	log(`{C${card}`)
}

function card_box_end() {
	log ("}")
}

//=== FRAMEWORK ===
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