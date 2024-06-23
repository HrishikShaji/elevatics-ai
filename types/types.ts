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

export type Modal = "profile" | "signIn" | "library" | "settings" | "";

export type Reference = {
  [key: string]: string;
};

export type Report = {
  report: string;
  references: Reference;
  search_qury: string;
};

export type ReportData = {
  [key: string]: {
    [index: string]: Report;
  };
};

export type ReportLoading = {
  [key: string]: {
    [index: string]: boolean;
  };
};

export type SubTopicsType = {
  [key: string]: string[][];
};



export type DropDownItem = {
  label: string;
  value: string;
}

export type DataFormatType = "No presets" | "Structured data" | "Quantitative data"
export type OutputFormatType = "chat" | "report" | "report_table"

export type ReportOptions = {
  outputFormat: OutputFormatType;
  internet: boolean;
  dataFormat: DataFormatType
}

export type TopicsLimit = {
  topics: number;
  subTopics: number;
}


export type SubTopicsDataResponse = {
  subtopics: string[][];
};
