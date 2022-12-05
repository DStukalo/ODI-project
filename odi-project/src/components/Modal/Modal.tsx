import { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.scss';
import { Button } from '../Button/Button';

interface ModalProps {
	title?: string;
	classes: string;
	buttonText?: string;
	onClose: (showModal: boolean) => void;
	children?: ReactNode;
}

export function Modal(props: ModalProps) {
	const {
		title, classes, onClose, children,
	} = props;

	return (
		ReactDOM.createPortal(
			<div className={styles[classes]}>
				<div>
					<Button
						classes="button_close"
						callback={() => { onClose(false); }}
					/>
					<h2>{title}</h2>
					{children}
				</div>
			</div>,
		document.getElementById('modal-root') as HTMLElement,
		)
	);

}
