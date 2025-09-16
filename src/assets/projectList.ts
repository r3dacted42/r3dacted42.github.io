import { colors } from "../constants";
import type { WindowStyle } from "../types";

export default [
    { repo: "sparrow-vps", windowStyle: { fgColor: colors.black.ff, bgColor: colors.yellow.a8 } },
    { repo: "maxwell", title: "maxwell appreciation page", windowStyle: { bgColor: colors.orange.a8 } },
    { repo: "tic-tac-toe", windowStyle: { bgColor: colors.black.a8 } },
    { repo: "turtle-graphics", title: "webgl turtle graphics", windowStyle: { bgColor: colors.green.a8 } },
    { repo: "bank-mgmt-sys", title: "ncurses bank mgmt sys" },
] as { repo: string, title?: string, windowStyle?: WindowStyle }[];