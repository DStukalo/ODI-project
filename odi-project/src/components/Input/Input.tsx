import styles from './Input.module.scss';

export type TInputProps = {
  type: string;
  name?: string;
  value: string;
  placeholder: string;
  classes: string;
	callback?: { (): void };
}

export function Input(props: TInputProps) {
	const {
		classes, type, name, value, placeholder, callback,
	} = props;
	return (
		<input
			className={styles[classes]}
			type={type}
			name={name}
			value={value}
			placeholder={placeholder}
			onChange={callback}
		/>
	);
}
