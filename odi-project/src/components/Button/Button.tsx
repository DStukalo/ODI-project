import styles from './Button.module.scss';
import { TButtonProps } from './ButtonTypes';

export function Button(props: TButtonProps) {
	const {
		text, classes, callback, image,
	} = props;
	return (
		<button type="button" className={styles[classes]} onClick={callback}>
			{image && (
				<img src={image} alt={image} />
			)}
			{text}
		</button>
	);
}
