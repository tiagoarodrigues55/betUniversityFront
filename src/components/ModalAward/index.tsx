import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import Swal from 'sweetalert2';
import api from '../../services/api';
import { supabase } from '../../services/supabaseClient';

import * as S from './styles';

type ModalAwardProps = {
	isModalOpen: boolean;
	handleCloseModal: () => void;
	setQrCode: (value: string) => void;
};

const products = [
	{
		id: 1,
		name: 'Sacola',
		value: 10,
		image_path: '/sacola.png',
	},
	{
		id: 2,
		name: 'Garrafa',
		value: 10,
		image_path: '/squeeze.png',
	},
	{
		id: 3,
		name: 'Copo',
		value: 20,
		image_path: '/copo.png',
	},
	{
		id: 4,
		name: 'Caneca',
		value: 50,
		image_path: '/caneca.png',
	},
	{
		id: 5,
		name: 'Powerbank',
		value: 50,
		image_path: '/powerbank.png',
	},
	{
		id: 6,
		name: 'Tirante',
		value: 10,
		image_path: '/tirante.png',
	},
];

function ModalAward({
	isModalOpen,
	handleCloseModal,
	setQrCode,
}: ModalAwardProps) {
	const [award, setAward] = useState<any>({
		value: 0,
		name: '',
	});
	const { data: session } = useSession();

	function onCloseModal() {
		handleCloseModal();
		setAward({
			value: 0,
			name: '',
		});
	}

	function handleGenerateQrCode(event) {
		event.preventDefault();
		handleCloseModal();
		setQrCode(
			`https://interbet.vercel.app/liquid?value=${award.value}&user_id=${session.user.id}`
		);
	}

	return (
		<S.Backdrop onClick={onCloseModal} isModalOpen={isModalOpen}>
			<S.Wrapper
				onClick={(event) => event.stopPropagation()}
				onSubmit={handleGenerateQrCode}
			>
				<S.Title>
					<h4>Lista de produtos</h4>

					<FiX
						className="close-modal-icon"
						color="#fff"
						size={26}
						onClick={onCloseModal}
					/>
				</S.Title>

				<S.ProductsContainer>
					{products.map((product) => (
						<S.Product key={product.id}>
							<S.ProductImage>
								<Image src={product.image_path} width={90} height={100} />
							</S.ProductImage>
							<S.ProductInfo>
								<span>{product.name}</span>
								<h5>{product.value} pontos</h5>
								<S.SelectAwardButton
									isAwardSelected={award['name'] === product.name}
									type="button"
									onClick={() =>
										setAward({ value: product.value, name: product.name })
									}
								>
									Selecionar
								</S.SelectAwardButton>
							</S.ProductInfo>
						</S.Product>
					))}
				</S.ProductsContainer>

				<S.ButtonAward>Liquidar</S.ButtonAward>
			</S.Wrapper>
		</S.Backdrop>
	);
}

export default ModalAward;
