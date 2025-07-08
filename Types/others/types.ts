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
  question: string
  options: Array<string>
}
export type testQuestionSaveObject = {
  id: string,
  user_id:number,
  title: string,
  questions: testObject,
  answers: Array<string>
}

export type valided_answers = { q_index: number, given_answer: boolean, correct_answer: string }

export type resulttype = {
  qustions_details: testQuestionSaveObject
  Validated_answers: Array<valided_answers>
};

export type users_details_ = {
  user_id: number,
  users: {
    username: string,
    email: string,
    profile_pic: string,
  }
}