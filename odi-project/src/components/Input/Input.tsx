import styles from './Input.module.scss';

export type TInputProps = {
  type: string;
  name?: string;
  value: string;
	autocomplete?: string;
  placeholder?: string;
  classes: string;
	onChange?: { (e: React.ChangeEvent<HTMLInputElement>): void };
}

export function Input(props: TInputProps) {
	const {
		classes, type, name, value, autocomplete, placeholder, onChange,
	} = props;
	return (
		<input
			className={styles[classes]}
			type={type}
			name={name}
			required
			value={value}
			autoComplete={autocomplete}
			placeholder={placeholder}
			onChange={onChange}
		/>
	);
}
