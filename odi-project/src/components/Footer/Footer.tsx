import { ReactComponent as LogoSVG } from '@/assets/rs_school_js-logo.svg';
import styles from './Footer.module.scss';

export function Footer() {
	return (
		<footer className={styles.footer}>
			<div className={styles.container}>
				<div className={styles.year}>© 2022</div>
				<div className={styles.github}>
					<a
						href="https://github.com/Olgamalk"
						className={styles.link}
						target="_blank"
						rel="noreferrer"
					>
						Olga
					</a>
					<a
						href="https://github.com/Igor-Novitski"
						className={styles.link}
						target="_blank"
						rel="noreferrer"
					>
						Igor
					</a>
					<a
						href="https://github.com/DStukalo"
						className={styles.link}
						target="_blank"
						rel="noreferrer"
					>
						Dmytro
					</a>
				</div>
				<div className={styles.rsschool}>
					<a
						href="https://rs.school/react/"
						className={styles.rss_link}
						target="_blank"
						rel="noreferrer"
					>
						<LogoSVG className={styles.rss_image} />
					</a>
				</div>
			</div>
		</footer>
	);
}
