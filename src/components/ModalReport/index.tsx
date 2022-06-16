import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import api from '../../services/api';
import { supabase } from '../../services/supabaseClient';

import * as S from './styles';

type ModalReportProps = {
	isModalOpen: boolean;
	handleCloseModal: () => void;
};

function ModalReport({ isModalOpen, handleCloseModal }: ModalReportProps) {
	const { data: session } = useSession();
	const [message, setMessage] = useState('');

	function handleSendReport(event) {
		event.preventDefault();

		if (message.length <= 0)
			return Swal.fire({
				text: 'Preencha o campo de mensagem.',
				icon: 'error',
				confirmButtonText: 'Entendi',
				background: '#331A4d',
				color: '#ffffff',
			});

		const report = {
			user: session?.user?.email,
			message,
		};

		try {
			supabase
				.from('reports')
				.insert(report)
				.then((response) => {
					handleCloseModal();
					Swal.fire({
						text: 'Bug enviado com sucesso..',
						icon: 'success',
						confirmButtonText: 'Bora',
						background: '#331A4d',
						color: '#2ed03d',
					});
					console.log(message);
					setMessage('');
				});
		} catch (error) {
			Swal.fire({
				text: 'Ocorreu um erro.',
				icon: 'error',
				confirmButtonText: 'Entendi',
				background: '#331A4d',
				color: '#ffffff',
			});
		}
	}

	return (
		<S.Backdrop onClick={handleCloseModal} isModalOpen={isModalOpen}>
			<S.Wrapper
				onClick={(event) => event.stopPropagation()}
				onSubmit={handleSendReport}
			>
				<h4>Reporte um bug</h4>
				<div className="form-control">
					<label htmlFor="">Mensagem</label>
					<textarea
						value={message}
						onChange={(event) => setMessage(event.target.value)}
						name="message"
					/>
				</div>

				<button type="submit">Enviar</button>
			</S.Wrapper>
		</S.Backdrop>
	);
}

export default ModalReport;
