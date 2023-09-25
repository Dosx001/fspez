import { Show, createSignal } from "solid-js";
import SideMenu from "./SideMenu";

const MenuBar = () => {
  const [showMenu, setShowMenu] = createSignal(false);
  return (
    <div>
      <Show when={showMenu()}>
        <SideMenu setShowMenu={setShowMenu} />
      </Show>
      <div class="fixed bottom-0 flex w-full justify-between bg-zinc-900 py-2">
        <div />
        <div class="flex">
          <svg
            viewBox="0 0 490 490"
            class="mx-2 h-6 w-6 stroke-white stroke-[36px]"
          >
            <path d="m280 278a153 153 0 1 0-2 2l170 170m-91-117 110 110-26 26-110-110" />
          </svg>
          <svg
            viewBox="0 0 24 24"
            class="mx-2 h-6 w-6 stroke-white stroke-2"
            stroke-linecap="round"
          >
            <path d="m2 6h20M2 11h11M2 16h5" />
          </svg>
          <button
            onClick={() => {
              setShowMenu(!showMenu());
            }}
          >
            <svg
              viewBox="0 0 24 24"
              class="mx-2 h-6 w-6 stroke-white stroke-2"
              stroke-linecap="round"
            >
              <path d="m2 6h20M2 11h20M2 16h20" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
