import useSWR, { cache } from 'swr';
import fetcher from '../fetcher';

const key = 'https://jsonplaceholder.typicode.com/posts';

const usePosts = () => {
  const { data, error, mutate } = useSWR(key, fetcher, { revalidateOnMount: !cache.has(key), revalidateOnFocus: false });

  const update = (newPost) => {
    mutate(key, async (posts) => {
      const updatedPost = await fetch(`${key}/${newPost.id}`, {
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