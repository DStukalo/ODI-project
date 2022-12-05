import styles from './AboutBlock.module.scss';
import { DevelopCard } from './AboutBlockTypes';

export function AboutBlock(props: DevelopCard) {
	const {
		text, classes, tittle, wrapper,
	} = props;
	return (
		<div className={`${styles.aboutCard} ${styles[wrapper]}`}>
			<div className={`${styles.imgWrapper} ${styles[classes]}`} />
			<div className={styles.description}>
				<h4>{tittle}</h4>
				<p>
					{text}
				</p>
			</div>
		</div>
	);
}
