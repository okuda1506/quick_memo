import { useState } from "react";

type Memo = {
  value: string;
  readonly id: number;
  archived: boolean;
  removed: boolean;
};

type Filter = "memo" | "archived" | "removed";

export const App = () => {
  const [text, setText] = useState("");
  const [memos, setMemos] = useState<Memo[]>([]);
  const [filter, setFilter] = useState<Filter>("memo");

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

  const handleMemo = <K extends keyof Memo, V extends Memo[K]>(
    id: number,
    key: K,
    value: V
  ) => {
    setMemos((memos) => {
      const newMemos = memos.map((memo) => {
        if (memo.id === id) {
          return { ...memo, [key]: value };
        } else {
          return memo;
        }
      });

      return newMemos;
    });
  };

  const handleSort = (filter: Filter) => {
    setFilter(filter);
  };

  const handleEmpty = () => {
    setMemos((memos) => memos.filter((memo) => !memo.removed));
  };

  const filteredMemos = memos.filter((memo) => {
    switch (filter) {
      case "memo":
        return !memo.archived && !memo.removed;
      case "archived":
        return memo.archived && !memo.removed;
      case "removed":
        return memo.removed;
      default:
        return memo;
    }
  });

  return (
    <div>
      <select
        defaultValue="all"
        onChange={(e) => handleSort(e.target.value as Filter)}
      >
        <option value="memo">メモ</option>
        <option value="archived">アーカイブ</option>
        <option value="removed">ゴミ箱</option>
      </select>
      {filter === "removed" ? (
        <button
          onClick={handleEmpty}
          disabled={memos.filter((memo) => memo.removed).length === 0}
        >
          空にする
        </button>
      ) : (
        filter !== "archived" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <input type="text" value={text} onChange={(e) => handleChange(e)} />
            <input type="submit" value="追加" onSubmit={handleSubmit} />
          </form>
        )
      )}
      <ul>
        {filteredMemos.map((memo) => {
          return (
            <li key={memo.id}>
              <input
                type="checkbox"
                disabled={memo.removed}
                checked={memo.archived}
                onChange={() => handleMemo(memo.id, 'archived', !memo.archived)}
              />
              <input
                type="text"
                disabled={memo.removed}
                value={memo.value}
                onChange={(e) => handleMemo(memo.id, 'value', e.target.value)}
              />
              <button onClick={() => handleMemo(memo.id, 'removed', !memo.removed)}>
                {memo.removed ? "復元" : "削除"}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
