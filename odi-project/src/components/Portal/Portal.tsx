import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

export interface PortalProps {
  children: ReactNode;
}

export function Portal(props: PortalProps) {
	return ReactDOM.createPortal(
		props.children,
    document.getElementById('modal-root') as HTMLElement,
	);
}
