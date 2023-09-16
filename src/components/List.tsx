import { invoke } from "@tauri-apps/api/tauri";
import { useToken } from "context/token";
import { For, Show, createEffect, createSignal, on } from "solid-js";

interface Post {
  data: {
    created: number;
    domain: string;
    gallery_data?: { id: string; media_id: string }[];
    is_gallery: boolean;
    is_self: boolean;
    is_video: boolean;
    link_flair_background_color: string;
    link_flair_text: string;
    locked: boolean;
    num_comments: number;
    over_18: boolean;
    permalink: string;
    pinned: boolean;
    preview: {
      images: { resolution: { height: number; url: string; width: number }[] };
    };
    quarantine: boolean;
    saved: boolean;
    spoiler: boolean;
    stickied: boolean;
    subreddit: string;
    thumbnail: string;
    thumbnail_height: number | null;
    thumbnail_width: number | null;
    title: string;
    ups: number;
    url: string;
    visited: boolean;
  };
}

const List = () => {
  const token = useToken().token;
  const [posts, setPosts] = createSignal<Post[]>([]);
  createEffect(
    on(token, () => {
      invoke("hot", { token: token() }).then((res) => {
        console.log(res);
        setPosts(res.data.children);
      })!;
    }),
  );
  return (
    <div>
      <For each={posts()}>
        {(post) => (
          <div class="flex">
            <div class="w-full rounded border border-black">
              <p>{post.data.title ?? ""}</p>
              <div>
                <a href="">{post.data.subreddit}</a>
              </div>
              <div>
                <span>{post.data.ups} </span>
                <span>{post.data.num_comments} comments </span>
                <Show when={post.data.over_18}>
                  <span class="rounded bg-red-600 px-1 font-bold text-white">
                    NSFW
                  </span>
                </Show>
              </div>
            </div>
            <Show when={post.data.is_video}>
              <img src={post.data.preview.images[0]!.url} />
            </Show>
            <Show when={post.data.thumbnail_width !== null}>
              <img src={post.data.thumbnail} />
            </Show>
          </div>
        )}
      </For>
    </div>
  );
};

export default List;
