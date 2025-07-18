import { setupServer } from "msw/node"
import { afterAll, afterEach, beforeAll } from "vitest"

import { handlers } from "./handlers"

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
