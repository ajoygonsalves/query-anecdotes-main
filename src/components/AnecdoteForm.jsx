import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../../anecdotesService";
import { useState } from "react";

const AnecdoteForm = () => {
  const [error, setError] = useState(null);

  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
      setError(null);
    },
    onError: (error) => {
      console.error("Error creating anecdote:", error.message);
      setError(error.message);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    if (content.length >= 5) {
      newAnecdoteMutation.mutate(content);
    } else {
      console.error("Anecdote must be at least 5 characters long");
    }
  };

  return (
    <div>
      <h3>create new</h3>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
