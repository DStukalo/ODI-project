import { Button } from '@/components/Button/Button';
import { AboutBlock } from '@/components/AboutBlock/AboutBlock';
import { DescriptionBlock } from '@/components/DescriptionBlock/DescriptionBlock';
import { TechnologyBlock } from '@/components/TechnologyBlock/TechnologyBlock';
import { technologiesData } from '@/components/TechnologyBlock/TechnologiesData';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { TranslationContext } from '@/App';
import { TranslWelcome } from './WelcomeTypes';
import styles from './WelcomePage.module.scss';

let path = 'main';

function switchPage() {
	if (localStorage.getItem('isLogged') === 'false') {
		path = 'main';// будет использоваться redux для смени состояния
	} else {
		path = 'authorization';// будет использоваться redux для смени состояния
	}
}

export function WelcomePage() {
	const useTranslation = () => useContext(TranslationContext);
	const { translations, language } = useTranslation();
	const newLocal = (translations as TranslWelcome)[language as keyof TranslWelcome];
	return (
		<div className={styles.wrapper}>
			<section className={styles.welcomeSection}>
				<div className={styles.descriptionBlock}>
					<h1 className={styles.mainTittle}>{newLocal.welcomeTittle}</h1>
					<p className={styles.description}>
						{newLocal.welcomeDescription}
					</p>
					<NavLink to={`/${path}`}>
						<Button
							text={newLocal.welcomeButton}
							classes="welcome__btn"
							image="/images/icon-start.png"
							callback={switchPage}
						/>
					</NavLink>
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
