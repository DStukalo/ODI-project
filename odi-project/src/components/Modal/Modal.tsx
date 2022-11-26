// import { Button } from '../Button/Button';
import styles from './Modal.module.scss';

interface ModalProps {
  header: string;
  text: string;
	classes: string;
  buttonText: string;
  onClose: (showModal: boolean) => void;
}

export function Modal(props: ModalProps) {

	const {
		header, text, classes, buttonText, onClose,
	} = props;

	return (
		<div className={styles[classes]}>
			<div>
				<div>
					<h2>{header}</h2>
					<h3>{text}</h3>
					{/* <Button
						text={'Close'}
						classes={styles.button_auth}
						callback={onClose}
					>
						{buttonText}
					</Button> */}
					<button type="button" onClick={() => onClose(false)}>{buttonText}</button>
				</div>
			</div>
		</div>
	);
}
