/* eslint-disable react/require-default-props */
import styles from './Button.module.scss';

type TButtonProps = {
	text: string;
  classes: string;
	callback?: { (): void };
	image?: string;

}

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
