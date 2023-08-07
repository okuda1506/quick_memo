// React から useState フックをインポート
import { useState } from "react";

type Memo = {
  value: string;
  readonly id: number;
};

export const App = () => {
  const [text, setText] = useState("");
  const [memos, setMemos] = useState<Memo[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = () => {
    if (!text) return;

    const newMemo: Memo = {
      value: text,
      id: new Date().getTime(),
    };

    setMemos((memos) => [newMemo, ...memos]);
    setText("");
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input type="text" value={text} onChange={(e) => handleChange(e)} />
        <input type="submit" value="追加" onSubmit={handleSubmit} />
      </form>
      <ul>
        {memos.map((memo) => {
          return <li key={memo.id}>{memo.value}</li>
        })}
      </ul>
    </div>
  );
};
