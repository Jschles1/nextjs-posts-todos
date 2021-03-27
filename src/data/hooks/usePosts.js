import useSWR, { cache, mutate } from 'swr';
import fetcher from '../fetcher';

const key = 'https://jsonplaceholder.typicode.com/posts';

const usePosts = () => {
  const { data, error } = useSWR(key, fetcher, { revalidateOnMount: !cache.has(key), revalidateOnFocus: false });

  const createPost = (newPost) => {
    mutate(key, async (posts) => {
      const response = await fetch(key, {
        method: 'POST',
        body: JSON.stringify(newPost),
      });
      const addedPost = await response.json();

      return [...posts, { ...addedPost, ...newPost }].sort((a, b) => a.id - b.id);;
    }, false);
  };

  const updatePost = (newPost) => {
    mutate(key, (posts) => {;
      const filteredPosts = posts.filter((post) => post.id !== newPost.id);
      return [...filteredPosts, newPost].sort((a, b) => a.id - b.id);
    }, false);
  };

  const deletePost = (id) => {
    mutate(key, async (posts) => {
      await fetch(`${key}/${id}`, {
        method: 'DELETE',
      });

      const filteredPosts = posts.filter((post) => post.id !== id);
      return filteredPosts;
    }, false);
  };

  return {
    posts: data,
    loading: !error && !data,
    error,
    createPost,
    updatePost,
    deletePost,
  };
};

export default usePosts;