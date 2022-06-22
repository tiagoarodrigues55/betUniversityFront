import { useState } from 'react';
import CreatableSelect from 'react-select';

import * as S from './styles';

import universities from '../../assets/universidades.json';
import api from '../../services/api';
import Swal from 'sweetalert2';

function CreateGameTemplate() {
	const [formData, setFormData] = useState({
		name: '',
		teams: [],
		modality: '',
		place: '',
		date: '',
	});

	const { name, modality, place, date } = formData;

	function handleCreateGame(event) {
		event.preventDefault();

		const payload = {
			...formData,
			date: new Date(date).toISOString(),
		};

		api.post('/api/games', payload).then((response) => {
			console.log('Jogo criado');
			console.log(response);
			return Swal.fire({
				text: 'Boa sorte!',
				title: 'Jogo criado com sucesso',
				icon: 'success',
				confirmButtonText: 'Bora',
				background: '#331A4d',
				color: '#2ed03d'
			});
		});
	}

	function handleChange(event) {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	}

	return (
		<S.Wrapper onSubmit={handleCreateGame}>
			<h2>Criar jogo</h2>

			<S.InputContainer>
				<S.FormControl>
					<label>Nome do evento</label>
					<input value={name} name="name" onChange={handleChange} type="text" />
				</S.FormControl>
				<S.FormControl>
					<label>Faculdade</label>
					<S.SelectContainer>
						<CreatableSelect
							key="select-create-game-1"
							className="select"
							name="Team 1"
							isClearable
							onChange={(event: any) => {
								setFormData({
									...formData,
									teams: [...formData.teams, event.value],
								});
							}}
							options={universities.map((uni) => ({
								value: String(uni.Estado),
								label: String(uni.Estado),
							}))}
						/>
						<CreatableSelect
							key="select-create-game-2"
							className="select"
							name="Team 2"
							isClearable
							onChange={(event: any) => {
								setFormData({
									...formData,
									teams: [...formData.teams, event.value],
								});
							}}
							options={universities.map((uni) => ({
								value: String(uni.Estado),
								label: String(uni.Estado),
							}))}
						/>
					</S.SelectContainer>
				</S.FormControl>
				<S.FormControl>
					<label>Modalidade</label>
					<input
						value={modality}
						name="modality"
						onChange={handleChange}
						type="text"
					/>
				</S.FormControl>
				<S.FormControl>
					<label>Lugar</label>
					<input
						value={place}
						name="place"
						onChange={handleChange}
						type="text"
					/>
				</S.FormControl>
				<S.FormControl>
					<label>Data</label>
					<input value={date} type="datetime-local" name="date" onChange={handleChange} />
				</S.FormControl>
			</S.InputContainer>
			<button type="submit">Criar jogo</button>
		</S.Wrapper>
	);
}

export default CreateGameTemplate;
