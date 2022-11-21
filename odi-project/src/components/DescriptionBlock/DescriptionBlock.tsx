import styles from './DescriptionBlock.module.scss';
import { DescriptionCard } from './DescriptionBlockTypes';

export function DescriptionBlock(props: DescriptionCard) {
	const {
		text, classes,
	} = props;
	return (
		<div className={styles.wrapper}>
			<div className={`${styles.imgWrapper} ${styles[classes]}`} />
			<p className={styles.description}>
				{text}
			</p>
		</div>
	);
}
