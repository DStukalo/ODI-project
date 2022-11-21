import styles from './TechnologyBlock.module.scss';
import { TechnologyCard } from './TechnologyBlockTypes';

export function TechnologyBlock(props: TechnologyCard) {
	const { link, text, icon } = props;

	return (
		<a href={link} className={styles.wrapper}>
			<img src={icon} alt={text} className={styles.imgWrapper} />
			<span className={styles.description}>
				{text}
			</span>
		</a>
	);
}
