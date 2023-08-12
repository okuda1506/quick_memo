import { useState } from "react";

type Memo = {
  value: string;
  readonly id: number;
  archived: boolean;
  removed: boolean;
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
      archived: false,
      removed: false,
    };

    setMemos((memos) => [newMemo, ...memos]);
    setText("");
  };

  const handleEdit = (id: number, value: string) => {
    setMemos((memos) => {
      const newMemos = memos.map((memo) => {
        if (memo.id === id) {
          return { ...memo, value: value };
        }
        return memo;
      });

      return newMemos;
    });
  };

  const handleArchive = (id: number, archived: boolean) => {
    setMemos((memos) => {
      const newMemos = memos.map((memo) => {
        if (memo.id === id) {
          return { ...memo, archived };
        }
        return memo;
      });

      return newMemos;
    });
  };

  const handleRemove = (id: number, removed: boolean) => {
    setMemos((memos) => {
      const newMemos = memos.map((memo) => {
        if (memo.id === id) {
          return {...memo, removed};
        }
        return memo;
      });

      return newMemos;
    });
  }

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
          return (
            <li key={memo.id}>
              <input
                type="checkbox"
                disabled={memo.removed}
                checked={memo.archived}
                onChange={() => handleArchive(memo.id, !memo.archived)}
              />
              <input
                type="text"
                disabled={memo.removed}
                value={memo.value}
                onChange={(e) => handleEdit(memo.id, e.target.value)}
              />
              <button onClick={() => handleRemove(memo.id, !memo.removed)}>
                {memo.removed ? '復元' : '削除'}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
