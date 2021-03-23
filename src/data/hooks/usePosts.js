import useSWR, { mutate } from 'swr';
import fetcher from '../fetcher';

const baseURL = 'https://jsonplaceholder.typicode.com/posts';

const usePosts = () => {
  const { data, error } = useSWR(baseURL, fetcher, { revalidateOnMount: false, revalidateOnFocus: false, revalidateOnReconnect: false });

  const update = (newPost) => {
    mutate(baseURL, async (posts) => {
      const updatedPost = await fetch(`/api/todos/${newPost.id}`, {
        method: 'PATCH',
        body: JSON.stringify(newPost),
      });

      const filteredPosts = posts.filter((post) => post.id !== newPost.id);
      return [...filteredPosts, updatedPost];
    }, false);
  };

  return {
    posts: data,
    loading: !error && !data,
    error,
    update,
  };
};

export default usePosts;