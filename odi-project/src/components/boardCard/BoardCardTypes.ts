export interface BoardCardInfo {
	text: string;
  id: string;
	callback: (id: string) => Promise<void>;
}
