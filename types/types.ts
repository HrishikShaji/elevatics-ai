export type TopicsDataResponse = {
	topics: string[][];
};

export type SubTopicType = {
	title: string;
	desc: string;
	report: string;
};

export type SelectedSubTopicsType = {
	[key: string]: SubTopicType[];
};

export type Theme = "dark" | "light";

export type ThemeItem = {
	backgroundColor: string;
	textColor: string;
};

export type ThemeColors = {
	primary: ThemeItem;
	secondary: ThemeItem;
	ternary: ThemeItem;
	button: ThemeItem;
	border: { color: string };
	selectedTitle: { color: string };
	unSelectedTitle: { color: string };
	selectedSubTitle: { color: string };
	unSelectedSubTitle: { color: string };
	input: { textColor: string; borderColor: string };
};

export type Modal = "signIn" | "library" | "settings" | "";
