export type OptionType = {
  item: string;
  link: string;
  icon?: React.ReactNode;
};

export type SidebarTypes = {
  item: string;
  link: string;
};

export type testObject = {
  question:string
  options: Array<string>
}
export type testQuestionSaveObject = {
   id:string,
   title:string,
   questions:testObject,
   answers:Array<string>
}