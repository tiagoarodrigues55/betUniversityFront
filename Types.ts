interface Bet {
  user_id: string, // id do usuário
  event_id: string, // id do evento
  modality: string, // modalidade
  odds: number[], // odds no momento da aposta [odd do time 1, odd do time 2, odd do empate]
  bet: number, // index da aposta (0, 1 ou 2)
  bet_value: number, // valor da aposta
  offer: boolean, // é oferta?
  status: string, // status (open, closed, pending)
}

interface Event {
  name: string, // Nome do evento (Final do Futebol GV X MAC)
  teams: string[], // [nome do time 1, nome do time 2]
  odds: number[], // odds atuais [odd do time 1, odd do time 2, odd do empate]
  modality: string, // Modalidade da partida
  status: string, // status (open, closed, pending)
  bets: number[], // Quantidade de apostas em cada opção ([0, 0, 0])
  payments: number[], // Dinheiro apostado em cada opção ([0, 0, 0])
  debts: number[], // Total a ser pago por opção ([0, 0, 0])
}

interface User {
  email: string, // email
  password: string, // Senha
  favorite_team: string, // Faculdade que estuda/torce
  total_bet: number, // Total apostado 
  wallet: number, // Saldo na carteira
  score: number, // Pontos
}