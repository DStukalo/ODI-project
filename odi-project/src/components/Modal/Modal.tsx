import { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.scss';
import { Button } from '../Button/Button';

interface ModalProps {
	title?: string;
	classes: string;
	buttonText: string;
	onClose: (showModal: boolean) => void;
	// showModal: boolean;
	children?: ReactNode;
}

export function Modal(props: ModalProps) {
	const {
		title, classes, buttonText, onClose, children,
	} = props;

	return (
		ReactDOM.createPortal(
			<div className={styles[classes]}>
				<div>
					<h2>{title}</h2>
					{children}
					<Button
						text="Close"
						classes={styles.button_auth}
						callback={() => { onClose(false); }}
					>
						{buttonText}
					</Button>
				</div>
			</div>,
		document.getElementById('modal-root') as HTMLElement,
		)
	);

}
