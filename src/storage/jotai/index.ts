import { atomWithStorage } from "jotai/utils";

const cartAtom = atomWithStorage<IProduct[]>("CART_ITEMS", []);

export { cartAtom };
