import { atom } from "jotai"
const state = {
    filter: atom(""),
    presence: atom(null),
    currentPage: atom(1)
}

export default state