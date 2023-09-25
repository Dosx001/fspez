import type { Setter } from "solid-js";

const SideMenu = (props: { setShowMenu: Setter<boolean> }) => {
  return (
    <div class="fixed top-0 m-0 ml-[25%] h-full w-3/4 overflow-y-scroll bg-black fill-white text-white">
      <button
        class="flex w-full py-2 hover:bg-gray-900"
        onClick={() => {
          props.setShowMenu(false);
        }}
      >
        <svg viewBox="0 0 24 24" class="mx-2 h-6 w-6">
          <path d="M12 2c3.032 0 5.5 2.467 5.5 5.5 0 1.458-.483 3.196-3.248 5.59 4.111 1.961 6.602 5.253 7.482 8.909h-19.486c.955-4.188 4.005-7.399 7.519-8.889-1.601-1.287-3.267-3.323-3.267-5.61 0-3.033 2.468-5.5 5.5-5.5zm0-2c-4.142 0-7.5 3.357-7.5 7.5 0 2.012.797 3.834 2.086 5.182-5.03 3.009-6.586 8.501-6.586 11.318h24c0-2.791-1.657-8.28-6.59-11.314 1.292-1.348 2.09-3.172 2.09-5.186 0-4.143-3.358-7.5-7.5-7.5z" />
        </svg>
        <p>Profile</p>
      </button>
      <button
        class="flex w-full py-2 hover:bg-gray-900"
        onClick={() => {
          props.setShowMenu(false);
        }}
      >
        <svg viewBox="0 0 24 24" class="mx-2 h-6 w-6">
          <path d="M0 3v18h24v-18h-24zm22 2l-10 8-10-8h19zm-20 14v-12l10 8 10-8v12h-20z" />
        </svg>
        <p>Inbox</p>
      </button>
      <button
        class="flex w-full py-2 hover:bg-gray-900"
        onClick={() => {
          props.setShowMenu(false);
        }}
      >
        <svg viewBox="0 0 24 24" class="mx-2 h-6 w-6">
          <path d="M5 0v24l7-6 7 6v-24h-14zm1 1h12v21l-6-5-6 5v-21z" />
        </svg>
        <p>Saved</p>
      </button>
      <button
        class="flex w-full py-2 hover:bg-gray-900"
        onClick={() => {
          props.setShowMenu(false);
        }}
      >
        <svg viewBox="0 0 24 24" class="mx-2 h-6 w-6">
          <path d="M14.139 2.63l3.068-1.441.786 3.297 3.39.032-.722 3.312 3.038 1.5-2.087 2.671 2.087 2.67-3.038 1.499.722 3.312-3.39.033-.786 3.296-3.068-1.441-2.139 2.63-2.138-2.63-3.068 1.441-.787-3.296-3.389-.033.722-3.312-3.039-1.499 2.088-2.67-2.088-2.671 3.039-1.5-.722-3.312 3.389-.032.787-3.297 3.068 1.441 2.138-2.63 2.139 2.63zm-3.742 2.342l-2.303-1.081-.59 2.474-2.542.024.542 2.483-2.279 1.125 1.566 2.004-1.566 2.002 2.279 1.124-.542 2.485 2.542.025.59 2.472 2.303-1.081 1.603 1.972 1.604-1.972 2.301 1.081.59-2.472 2.543-.025-.542-2.485 2.279-1.124-1.565-2.002 1.565-2.004-2.279-1.125.542-2.483-2.543-.024-.59-2.474-2.301 1.081-1.604-1.972-1.603 1.972z" />
        </svg>
        <p>New</p>
      </button>
      <button
        class="flex w-full py-2 hover:bg-gray-900"
        onClick={() => {
          props.setShowMenu(false);
        }}
      >
        <svg viewBox="0 0 24 24" class="mx-2 h-6 w-6">
          <path d="M24 3.875l-6 1.221 1.716 1.708-5.351 5.358-3.001-3.002-7.336 7.242 1.41 1.418 5.922-5.834 2.991 2.993 6.781-6.762 1.667 1.66 1.201-6.002z" />
        </svg>
        <p>Popular</p>
      </button>
      <button
        class="flex w-full py-2 hover:bg-gray-900"
        onClick={() => {
          props.setShowMenu(false);
        }}
      >
        <svg viewBox="0 0 24 24" class="mx-2 h-6 w-6">
          <path d="M7 19h-6v-11h6v11zm8-18h-6v18h6v-18zm8 11h-6v7h6v-7z" />
        </svg>
        <p>All</p>
      </button>
      <button
        class="flex w-full py-2 hover:bg-gray-900"
        onClick={() => {
          props.setShowMenu(false);
        }}
      >
        <svg viewBox="0 0 24 24" class="mx-2 h-6 w-6">
          <path d="M21 13v10h-6v-6h-6v6h-6v-10h-3l12-12 12 12h-3z" />
        </svg>
        <p>Home</p>
      </button>
    </div>
  );
};

export default SideMenu;
