import { useEffect, useState } from 'react';
import { Button } from '../Button/Button';
import styles from './boardCard.module.scss';
import {BoardCardInfo } from './BoardCardTypes';
import { useTranslation } from '../../locales/useTranslation';
import { Modal } from '../Modal/Modal';

export function BoardCard(props: BoardCardInfo) {
	const {	text, id, callback } = props;
	const [modalDel, setShowModalDel] = useState(false);
	const newLocal = useTranslation();
	const showModalDel = () => {
		setShowModalDel(true);
	};
	const closeModalDel = () => {
		setShowModalDel(false);
	};
	const deleteBoard = async () => {
		setShowModalDel(false);
		await callback(id);
	};
	return (
		<div className={styles.board}>
			{modalDel && (
				<Modal
					title={newLocal.deleteTitle}
					onClose={setShowModalDel}
					classes="modal_delete"
				>
					<div>
						<Button
							classes="modalBoard__btn"
							text={newLocal.yes}
							callback={deleteBoard}
						/>
						<Button
							classes="modalBoard__btn"
							text={newLocal.no}
							callback={closeModalDel}
						/>
					</div>
				</Modal>
			)}
			<p className={styles.tittle}>{text}</p>
			<Button
				classes="deleteBoard__btn"
				image="/images/icon-del.png"
				callback={showModalDel}
			/>
		</div>
	);
}
