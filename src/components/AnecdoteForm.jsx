import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../../anecdotesService";
import { useState } from "react";
import { useCreateNotification } from "../context/NotificationContext";

const AnecdoteForm = () => {
  const createNotification = useCreateNotification();

  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
      createNotification(`Anecdote created: ${anecdote.content}`);
    },
    onError: (error) => {
      createNotification(`Error creating anecdote: ${error.message}`);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate(content);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
