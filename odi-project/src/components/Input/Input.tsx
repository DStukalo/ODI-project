import styles from './Input.module.scss';

export type TInputProps = {
  type: string;
  name?: string;
  value: string;
  placeholder: string;
  classes: string;
	onChange?: { (e: React.ChangeEvent<HTMLInputElement>): void };
}

export function Input(props: TInputProps) {
	const {
		classes, type, name, value, placeholder, onChange,
	} = props;
	return (
		<input
			className={styles[classes]}
			type={type}
			name={name}
			value={value}
			placeholder={placeholder}
			onChange={onChange}
		/>
	);
}
