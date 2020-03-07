import React, { useState, useCallback, memo, useMemo } from "react";

const ChildWithMemo = memo(({ profile, updateName }) => {
  console.log("MemoChild Render");
  return <div>
    <h3>ChildWithMemo</h3>
    <p>This is name from parents: {profile.name} </p>
    <p>This is persistent age from parents: {profile.age} </p>
    <input onChange={updateName} placeholder='input new name' />
  </div>;
});

export default function Parents() {
  const [count, setCount] = useState(1);
  const [name, setName] = useState('Init name');
  console.log("Parents Render");

  const handleClick = () => setCount(count + 1)
  const updateName = useCallback(e => setName(e.target.value), []);
  const profile = useMemo(() => ({ name, age: 24 }), [name])

  return (
    <div>
      <div>count: {count}</div>
      <button onClick={handleClick}>+ 1</button>
      <ChildWithMemo profile={profile} updateName={updateName} />
    </div>
  );
}