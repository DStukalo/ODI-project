export interface BoardCardInfo {
	text: string;
  id: string;
	callback: () => Promise<void>;
}
