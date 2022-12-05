import { useAppSelector } from '@/hooks/redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/Button/Button';
import { AboutBlock } from '@/components/AboutBlock/AboutBlock';
import { DescriptionBlock } from '@/components/DescriptionBlock/DescriptionBlock';
import { TechnologyBlock } from '@/components/TechnologyBlock/TechnologyBlock';
import { technologiesData } from '@/components/TechnologyBlock/TechnologiesData';
import { useTranslation } from '@/locales/useTranslation';
import styles from './WelcomePage.module.scss';

export function WelcomePage() {
	const newLocal = useTranslation();
	const navigate = useNavigate();
	const { isLogged } = useAppSelector((state) => state.userReducer);

	const switchPage = () => {
		if (isLogged) {
			navigate('/main');
		} else {
			navigate('/authorization/login');
		}
	};

	return (
		<div className={styles.wrapper}>
			<section className={styles.welcomeSection}>
				<div className={styles.descriptionBlock}>
					<h1 className={styles.mainTittle}>{newLocal.welcomeTittle}</h1>
					<p className={styles.description}>
						{newLocal.welcomeDescription}
					</p>
					<Button
						text={newLocal.welcomeButton}
						classes="welcome__btn"
						image="/images/icon-start.png"
						callback={switchPage}
					/>
				</div>
				<div className={styles.welcomeImg} />
			</section>
			<hr className={styles.line} />
			<section className={styles.descriptionWrapper}>
				<DescriptionBlock
					text={newLocal.descriptionKanban}
					classes="img-kanban"
				/>
				<DescriptionBlock
					text={newLocal.descriptionList}
					classes="img-list"
				/>
				<DescriptionBlock
					text={newLocal.descriptionTime}
					classes="img-time"
				/>
			</section>
			<hr className={styles.line} />
			<section className={styles.technologyWrapper}>
				<h2 className={styles.tittle}>{newLocal.technologiesTittle}</h2>
				<div className={styles.cardWrapper}>
					{technologiesData.map((card) => (
						<TechnologyBlock
							text={card.text}
							icon={card.icon}
							link={card.link}
							key={card.text}
						/>
					))}
				</div>
			</section>
			<hr className={styles.line} />
			<section className={styles.aboutWrapper}>
				<h2 className={styles.tittle}>{newLocal.aboutTittle}</h2>
				<AboutBlock
					tittle={newLocal.DmitroTittle}
					text={newLocal.DmitroInfo}
					classes="img-wrapper-dmytro"
					wrapper="about-card-left"
				/>
				<AboutBlock
					tittle={newLocal.IgorTittle}
					text={newLocal.IgorInfo}
					classes="img-wrapper-igor"
					wrapper="about-card-right"
				/>
				<AboutBlock
					tittle={newLocal.OlgaTittle}
					text={newLocal.OlgaInfo}
					classes="img-wrapper-olga"
					wrapper="about-card-left"
				/>
			</section>
		</div>
	);
}
