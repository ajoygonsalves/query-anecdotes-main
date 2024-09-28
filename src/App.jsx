import { useEffect } from "react";
import {
  createAnecdote,
  getAnecdotes,
  likeAnecdote,
  removeAnecdote,
} from "../anecdotesService";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const App = () => {
  const handleVote = (id) => {
    likeAnecdoteMutation.mutate(id);
  };

  const handleDelete = (id) => {
    removeAnecdoteMutation.mutate(id);
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

  const removeAnecdoteMutation = useMutation({
    mutationFn: removeAnecdote,
    onSuccess: (removed) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]) || [];
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
    onError: (error) => {
      console.error("Error removing anecdote:", error.message);
    },
  });

  const likeAnecdoteMutation = useMutation({
    mutationFn: likeAnecdote,
    onSuccess: (likedAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]) || [];
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
    onError: (error) => {
      console.error("Error liking anecdote:", error.message);
    },
  });

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

        {anecdotes.data &&
          anecdotes.data.map((anecdote) => (
            <div key={anecdote.id}>
              <div>{anecdote.content}</div>
              <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote.id)}>vote</button>
              </div>
              <div>
                <button onClick={() => handleDelete(anecdote.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    );
  }
};

export default App;
