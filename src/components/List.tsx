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
    link_flair_text_color: string;
    locked: boolean;
    num_comments: number;
    over_18: boolean;
    permalink: string;
    pinned: boolean;
    preview: {
      images: {
        resolutions: { height: number; url: string; width: number }[];
      }[];
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
  const thumbnail = (post: Post): string => {
    let url: string;
    switch (post.data.thumbnail) {
      case "nsfw":
      case "default":
      case "spoiler":
      case "image":
        url = post.data.preview.images[0].resolutions[0].url;
        break;
      default:
        url = post.data.thumbnail;
    }
    return url.replaceAll("amp;", "");
  };
  const formatTime = (time: number, units: Intl.RelativeTimeFormatUnit) => {
    const parts = new Intl.RelativeTimeFormat("en", {
      style: "narrow",
    }).formatToParts(Math.floor(time), units);
    return `${parts[1].value}${parts[2].value}`;
  };
  const convertEpoch = (epoch: number) => {
    const time =
      (new Date().getTime() - new Date(epoch * 1000).getTime()) / 1000;
    if (time === 1) return "Just now";
    if (time < 60) return formatTime(time, "seconds");
    if (time < 3600) return formatTime(time / 60, "minutes");
    if (time < 86400) return formatTime(time / 3600, "hours");
    if (time < 604800) return formatTime(time / 86400, "days");
    if (time < 2419200) return formatTime(time / 604800, "weeks");
    if (time < 29030400) return formatTime(time / 2419200, "months");
    return formatTime(time / 29030400, "years");
  };
  createEffect(
    on(token, () => {
      invoke("hot", { token: token() }).then((res) => {
        console.log(res);
        setPosts((res as { data: { children: Post[] } }).data.children);
      })!;
    }),
  );
  return (
    <div>
      <For each={posts()}>
        {(post) => (
          <div class="flex border-t border-gray-800 p-1">
            <div class="w-full">
              <p>{post.data.title ?? ""}</p>
              <div>
                <a href="">{post.data.subreddit}</a>
                <Show when={post.data.locked}>
                  <span class="ml-1">🔒</span>
                </Show>
                <Show when={post.data.link_flair_text}>
                  <span
                    class="ml-1 px-1"
                    style={{
                      background: `${post.data.link_flair_background_color}`,
                      color: `${
                        post.data.link_flair_text_color === "light"
                          ? "white"
                          : "black"
                      }`,
                    }}
                  >
                    {post.data.link_flair_text?.replace(/:\w+:\s?|amp;/g, "")}
                  </span>
                </Show>
                <span> {convertEpoch(post.data.created)}</span>
              </div>
              <div>
                <span>{post.data.ups}</span>
                <span> {post.data.num_comments} comments</span>
                <Show when={post.data.spoiler}>
                  {" "}
                  <span class="rounded border-2 border-red-600 px-1 font-bold text-red-600">
                    SPOILER
                  </span>
                </Show>
                <Show when={post.data.over_18}>
                  {" "}
                  <span class="rounded bg-red-600 px-1 font-bold text-white">
                    NSFW
                  </span>
                </Show>
              </div>
            </div>
            <Show when={post.data.thumbnail_width !== null}>
              <img
                class="h-16 w-16 rounded object-cover"
                style={{
                  filter: post.data.spoiler ? "blur(4px)" : "",
                }}
                src={thumbnail(post)}
              />
            </Show>
          </div>
        )}
      </For>
    </div>
  );
};

export default List;
