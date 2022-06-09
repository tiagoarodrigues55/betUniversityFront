export interface Bet {
	user_id: string; // id do usuário
	game_id: string; // id do jogo
	game_name: string; // nome do jogo
	teams: string; // times
	modality: string; // modalidade
	odds: number[]; // odds no momento da aposta [odd do time 1, odd do time 2, odd do empate]
	bet: number; // index da aposta (0, 1 ou 2)
	bet_value: number; // valor da aposta
	offer: boolean; // é oferta?
	status: string; // status (open, closed, pending)
	result: number; // Resultado (null, 0, 1 ou 2)
}

export interface Game {
	id: string; // id do jogo
	name: string; // Nome do jogo (Final do Futebol GV X MAC)
	teams: string[]; // [nome do time 1, nome do time 2]
	odds: number[]; // odds atuais [odd do time 1, odd do time 2, odd do empate]
	modality: string; // Modalidade da partida
	status: string; // status (open, closed, pending)
	bets: number[]; // Quantidade de apostas em cada opção ([0, 0, 0])
	payments: number[]; // Dinheiro apostado em cada opção ([0, 0, 0])
	debts: number[]; // Total a ser pago por opção ([0, 0, 0])
	event: string; // Nome do evento do Jogo (Integramix, Interusp, Intermed)
}

export interface User {
	id: Record<string, unknown>; // id do usuário
	name: string; // id do usuário
	email: string; // email
	password: string; // Senha
	favorite_team: string; // Faculdade que estuda/torce
	total_bet: number; // Total apostado
	wallet: number; // Saldo na carteira
	score: number; // Pontos
	forms_progress: number; // Respostas respondidas
	expectedBet: number; // Quanto o usuário falou que apostaria
	default_event: string; // Evento padrão (integramix, interusp, economiadas)
}
