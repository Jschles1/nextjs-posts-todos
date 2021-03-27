import PostLink from '../../src/components/PostLink';
import LoadingSpinner from '../../src/components/LoadingSpinner';
import AlertMessage from '../../src/components/AlertMessage';
import usePosts from '../../src/data/hooks/usePosts';

export default function Posts() {
  const { posts, error, loading } = usePosts();

  console.log('posts', posts);
  console.log('error', error);

  if (loading) {
    return <LoadingSpinner />;
  }

  const postList = posts.map((post) => <PostLink key={post.id} id={post.id} title={post.title} />);

  return (
    <div>
      <h1>Posts</h1>

      <div>
        {postList}
      </div>

      <AlertMessage />
    </div>
  );
}