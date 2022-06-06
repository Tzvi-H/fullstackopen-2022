import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const selectAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  const voteFor = (index) => {
    const newVotes = [...votes];
    newVotes[selected]++;
    setVotes(newVotes);
  };

  const greatestVotesIndex = votes.indexOf(Math.max(...votes));

  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        {anecdotes[selected]}
        <br />
        has {votes[selected]} votes
        <div>
          <button onClick={() => voteFor(selected)}>vote</button>
          <button onClick={selectAnecdote}>next anecdote</button>
        </div>
      </div>

      <div>
        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[greatestVotesIndex]}</p>
        <p>has {votes[greatestVotesIndex]} votes</p>
      </div>
    </div>
  );
};

export default App;
