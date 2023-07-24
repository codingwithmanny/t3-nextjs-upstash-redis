// Imports
// ========================================================
import { useAuth0 } from "@auth0/auth0-react";
import type { inferProcedureOutput } from "@trpc/server";
import type { AppRouter } from "@acme/api";
import { useState } from "react";
import trpc from '../../utils/trpc';

// Components
// ========================================================
/**
 * 
 * @returns 
 */
const AuthShowcase: React.FC<{ callback?: () => void, isDisabled?: boolean; }> = ({ callback = () => { }, isDisabled = false }) => {
  const [inputs, setInputs] = useState({
    title: '',
    content: ''
  });
  // const { user, isAuthenticated, isLoading, logout, loginWithRedirect, getAccessTokenSilently } = useAuth0();
  const { user, error, isLoading, loginWithRedirect, logout } = useAuth0();
  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined,
    { enabled: !!user },
  );
  const postCreate = trpc.post.create.useMutation({
    onSuccess: () => {
      if (callback) {
        callback();
      }
    }
  });

  // Functions
  const onSubmitFormNewPost = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      postCreate.mutateAsync(inputs);
      setInputs({ title: '', content: '' });
    } catch (error) {
      console.error({ error });
    }
  };

  // Render
  /**
   * 
   */
  if (isLoading) return <div><code>Loading...</code></div>;

  /**
   * 
   */
  if (error) return <div><code>{JSON.stringify(error)}</code></div>;

  /**
   * 
   */
  return (
    <div className="">
      {user && (
        <>
          <pre><code>{secretMessage ? secretMessage : null}</code></pre>

          <hr />

          <div>
            <div>
              <h2>Authenticated User</h2>
              <pre><code>{JSON.stringify({ user }, null, ' ')}</code></pre>
              <p>Welcome <span className="bg-black/30 px-3 py-2 rounded ml-2">{user.name}</span></p>
              <p><button type="button" onClick={() => logout({
                openUrl: async (url) => {
                  window.location.replace(`${url}&returnTo=${window.location.origin}`);
                }
              })} >Logout</button></p>
            </div>
          </div>

          <hr />

          <h2>New Post</h2>

          <div className="w-full">
            <form onSubmit={onSubmitFormNewPost}>
              <div className="mb-4">
                <label htmlFor="title">Title</label>
                <input disabled={isDisabled || postCreate.isLoading} required className="w-full max-w-lg" id="title" name="title" type="text" value={inputs.title} placeholder="Ex: My Post Title" onChange={(e) => {
                  setInputs((existing) => ({ ...existing, title: e.target.value }))
                }} />
              </div>
              <div className="mb-4">
                <label className="block mb-2" htmlFor="content">Content</label>
                <input disabled={isDisabled || postCreate.isLoading} required className="w-full max-w-lg" id="content" name="content" type="text" value={inputs.content} placeholder="Ex: Here is my message" onChange={(e) => {
                  setInputs((existing) => ({ ...existing, content: e.target.value }))
                }} />
              </div>
              <div>
                <button disabled={isDisabled || postCreate.isLoading} type="submit">Submit</button>
              </div>
            </form>
          </div>
        </>
      )}
      {!user && (
        <p>
          <button type="button" onClick={() => loginWithRedirect()}>Login</button>
        </p>
      )}
    </div>
  );
};

/**
 * 
 * @param param0 
 * @returns 
 */
const PostCard: React.FC<{
  post: inferProcedureOutput<AppRouter["post"]["all"]>[number];
  onClick?: (id: string) => void;
  isDisabled?: boolean;
}> = ({ post, onClick, isDisabled = false }) => {
  // Functions
  const onClickDelete = () => {
    if (onClick) {
      onClick(post.id);
    }
  };

  // Render
  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-lg relative group hover:border-zinc-400 hover:shadow-[0px_0px_0px_2px_rgba(161,161,170,1)] transition-all ease-in-out duration-200">
      <div className="p-6">
        <h3 className="mb-0">{post.title}</h3>
        <p className="mb-0">{post.content}</p>
      </div>
      {onClick && !isDisabled ? <button onClick={onClickDelete} className="absolute group-hover:block hidden -top-4 -right-4 leading-8 px-3">&times;</button> : null}
    </div>
  );
};

// Page Component
// ========================================================
/**
 * 
 * @returns 
 */
const Home = () => {
  // State / Props
  // const { user, isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently } = useAuth0();
  const { user } = useAuth0();

  // Requests
  /**
   * 
   */
  const postQuery = trpc.post.all.useQuery();

  /**
   * 
   */
  const postDelete = trpc.post.delete.useMutation({
    onSuccess: () => {
      postQuery.refetch();
    }
  });

  /**
   * 
   */
  const isLoading = postQuery.isLoading || postDelete.isLoading || postQuery.isFetching;

  // Render
  return (
    <>
      <main className="px-8 pt-8 pb-14">
        <h1>Create T3 ViteJS Auth0</h1>

        <hr />

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam pariatur perferendis dignissimos voluptatibus in quo odit officia voluptates animi dolor numquam, inventore, quae cumque ratione eveniet blanditiis libero sit et.</p>

        <AuthShowcase callback={() => {
          postQuery.refetch()
        }} isDisabled={isLoading} />

        <hr />

        <h2>Posts</h2>

        <div className="flex overflow-y-scroll">
          {postQuery.data ? (
            <div className="flex gap-4 p-8 bg-zinc-950/50 rounded-lg">
              {postQuery.data?.map((p) => {
                return <PostCard key={p.id} post={p} isDisabled={isLoading} onClick={user ? async (id) => {
                  try {
                    await postDelete.mutateAsync(id);
                  } catch (error) {
                    console.error({ error });
                  }
                } : undefined} />;
              })}
            </div>
          ) : (
            <p>Loading..</p>
          )}
        </div>
      </main>
    </>
  );
};

// Exports
// ========================================================
export default Home;