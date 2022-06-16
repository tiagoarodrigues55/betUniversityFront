import * as S from './styles';

import { FiHelpCircle } from 'react-icons/fi';

type ReportButtonProps = {
  handleOpenModal: () => void;
};

function ReportButton({ handleOpenModal }: ReportButtonProps) {
	return (
		<S.Wrapper onClick={handleOpenModal}>
			<FiHelpCircle size={24} color="#fff" />
		</S.Wrapper>
	);
}

export default ReportButton;
