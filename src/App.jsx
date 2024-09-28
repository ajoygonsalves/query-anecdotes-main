import { useEffect } from "react";
import { getAnecdotes } from "../anecdotesService";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const App = () => {
  const handleVote = (anecdote) => {
    console.log("vote");
  };

  const queryClient = useQueryClient();

  const anecdotes = useQuery({
    queryKey: ["anecdotes"],
    queryFn: () => {
      return getAnecdotes();
    },
    retry: 1,
    onError: (error) => {
      console.error("An error occurred but we are handling it:", error.message);
    },
  });

  // const anecdotes = [
  //   {
  //     content: "If it hurts, do it more often",
  //     id: "47145",
  //     votes: 0,
  //   },
  // ];

  if (anecdotes.isError) {
    return (
      <div>
        <h3>Error</h3>
        <p>
          {anecdotes.error.message ||
            "An unexpected error occurred. Please try again later."}
        </p>
      </div>
    );
  }

  if (anecdotes.isLoading) return <div>Data is loading....</div>;

  if (anecdotes.isSuccess) {
    return (
      <div>
        <h3>Anecdote app</h3>

        <Notification />
        <AnecdoteForm />

        {anecdotes.data.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
      </div>
    );
  }
};

export default App;
