import { ReactNode } from 'react';

export type TButtonProps = {
	text?: string;
  classes: string;
	callback?: { (): void };
	image?: string;
	children?: ReactNode;
}
