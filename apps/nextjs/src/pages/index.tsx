// Imports
// ========================================================
import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import type { inferProcedureOutput } from "@trpc/server";
import type { AppRouter } from "@acme/api";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useState } from "react";

// Components
// ========================================================
/**
 *
 * @returns
 */
const AuthShowcase: React.FC<{ callback?: () => void }> = ({
  callback = () => {},
}) => {
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
  });
  const { user, error, isLoading } = useUser();
  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined,
    { enabled: !!user },
  );
  const postCreate = trpc.post.create.useMutation({
    onSuccess: () => {
      if (callback) {
        callback();
      }
    },
  });

  // Functions
  const onSubmitFormNewPost = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      postCreate.mutateAsync(inputs);
      setInputs({ title: "", content: "" });
    } catch (error) {
      console.error({ error });
    }
  };

  // Render
  /**
   *
   */
  if (isLoading)
    return (
      <div>
        <code>Loading...</code>
      </div>
    );

  /**
   *
   */
  if (error)
    return (
      <div>
        <code>{JSON.stringify(error)}</code>
      </div>
    );

  /**
   *
   */
  return (
    <div className="">
      {user && (
        <>
          <pre>
            <code>{secretMessage ? secretMessage : null}</code>
          </pre>

          <hr />

          <div>
            <div>
              <h2>Authenticated User</h2>
              <pre>
                <code>{JSON.stringify({ user }, null, " ")}</code>
              </pre>
              <p>
                Welcome{" "}
                <span className="ml-2 rounded bg-black/30 px-3 py-2">
                  {user.name}
                </span>
              </p>
              <p>
                <a type="button" href="/api/auth/logout">
                  Logout
                </a>
              </p>
            </div>
          </div>

          <hr />

          <h2>New Post</h2>

          <div className="w-full">
            <form onSubmit={onSubmitFormNewPost}>
              <div className="mb-4">
                <label htmlFor="title">Title</label>
                <input
                  required
                  className="w-full max-w-lg"
                  id="title"
                  name="title"
                  type="text"
                  value={inputs.title}
                  placeholder="Ex: My Post Title"
                  onChange={(e) => {
                    setInputs((existing) => ({
                      ...existing,
                      title: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="mb-4">
                <label className="mb-2 block" htmlFor="content">
                  Content
                </label>
                <input
                  required
                  className="w-full max-w-lg"
                  id="content"
                  name="content"
                  type="text"
                  value={inputs.content}
                  placeholder="Ex: Here is my message"
                  onChange={(e) => {
                    setInputs((existing) => ({
                      ...existing,
                      content: e.target.value,
                    }));
                  }}
                />
              </div>
              <div>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </>
      )}
      {!user && (
        <p>
          <Link type="button" href="/api/auth/login">
            Login
          </Link>
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
}> = ({ post, onClick }) => {
  // Functions
  const onClickDelete = () => {
    if (onClick) {
      onClick(post.id);
    }
  };

  // Render
  return (
    <div className="group relative rounded-lg border border-zinc-700 bg-zinc-900 transition-all duration-200 ease-in-out hover:border-zinc-400 hover:shadow-[0px_0px_0px_2px_rgba(161,161,170,1)]">
      <div className="p-6">
        <h3 className="mb-0">{post.title}</h3>
        <p className="mb-0">{post.content}</p>
      </div>
      {onClick ? (
        <button
          onClick={onClickDelete}
          className="absolute -right-4 -top-4 hidden px-3 leading-8 group-hover:block"
        >
          &times;
        </button>
      ) : null}
    </div>
  );
};

/**
 *
 * @returns
 */
const Home: NextPage = () => {
  // State / Props
  const { user } = useUser();

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
    },
  });

  /**
   *
   */
  const redisGet = trpc.redis.get.useMutation();

  /**
   *
   */
  const redisSet = trpc.redis.set.useMutation();

  /**
   *
   */
  const isLoading =
    redisSet.isLoading ||
    redisGet.isLoading ||
    postQuery.isLoading ||
    postDelete.isLoading ||
    postQuery.isFetching;

  /**
   *
   * @param event
   */
  const onSubmitSetKey = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const key = event.currentTarget.key.value;
    const value = event.currentTarget.value.value;
    try {
      redisSet.mutateAsync({ key, value });
    } catch (error) {
      console.error({ error });
    }
  };

  // Render
  return (
    <>
      <Head>
        <title>Create T3 App Auth0</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="px-8 pb-14 pt-8">
        <h1>Create T3 NextJS Pages Auth0</h1>

        <hr />

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
          pariatur perferendis dignissimos voluptatibus in quo odit officia
          voluptates animi dolor numquam, inventore, quae cumque ratione eveniet
          blanditiis libero sit et.
        </p>

        <AuthShowcase callback={() => postQuery.refetch()} />

        <hr />

        <h2>Redis</h2>

        <div>
          <form onSubmit={onSubmitSetKey}>
            <div className="mb-4">
              <label htmlFor="key">Key</label>
              <input
                required
                className="w-full max-w-lg"
                id="key"
                name="key"
                type="text"
                placeholder="Ex: my-key"
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block" htmlFor="value">
                Value
              </label>
              <input
                required
                className="w-full max-w-lg"
                id="value"
                name="value"
                type="text"
                placeholder="Ex: my-value"
              />
            </div>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
        <pre>
          <code>{JSON.stringify(redisGet?.data)}</code>
        </pre>

        <hr />

        <h2>Posts</h2>

        <div className="flex overflow-y-scroll">
          {postQuery.data ? (
            <div className="flex gap-4 rounded-lg bg-zinc-950/50 p-8">
              {postQuery.data?.map((p) => {
                return (
                  <PostCard
                    key={p.id}
                    post={p}
                    onClick={
                      user
                        ? async (id) => {
                            try {
                              await postDelete.mutateAsync(id);
                            } catch (error) {
                              console.error({ error });
                            }
                          }
                        : undefined
                    }
                  />
                );
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
