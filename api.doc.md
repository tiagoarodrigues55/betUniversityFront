** Rotas **


Temos três rotas principais aqui, uma pra cada entidade. /users, /games, /bets

Cada uma delas possui 4 métodos, GET, POST, PUT GET por parâmetro


** /users **
GET /users - devolve todos os usuários
GET /users[id] - devolve o usuário dono do id
POST /users - recebe { email, name, favorite_team, wallet, forms_progress, expected_bet } e cria o usuário
PUT /users - recebe email e atualiza o usuário com as demais informações do body


** /games **
GET /games - devolve todos os jogos
GET /games[name] - devolve o jogo dono desse nome
POST /games - recebe  { name, teams, modality, place, date, event } e cria o Jogo
PUT /games - recebe name e atualiza o jogo com as demais informações do body

Temos a possibilidade de filtrar por um desses parâmetros { status, modality } usuando query. Por exemplo:
/games?status=open - devolve todos os jogos abertos
/games?modality=Futebol - devolve todos os jogos de futebol
/games?status=open&modality=Futebol - devolve todos os jogos abertos de Futebol 

** /bets **
GET /bets - devolve todas as apostas
GET /bets[user_id] - devolve as apostas feitas pelo usuário que é dono desse id
POST /bets - recebe  { user_id, game_id, game_name, teams, modality, odds, bet, bet_value, offer } e cria a aposta. Além de atualizar o as informações do jogo apostado e do usuário
PUT /bets - recebe id e atualiza a aposta com as demais informações do body

Temos a possibilidade de filtrar por um desses parâmetros { status, game_id } usuando query. Por exemplo:
/bets?status=open - devolve todas as apostas abertos
/bets?game_id=2 - devolve todas as apostas do jogo 2
/bets?status=open&game_id=2 - devolve todas as apostas abertas do jogo 2 


