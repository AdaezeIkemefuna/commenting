// import { Realtime } from "ably/browser/static/ably-commonjs.js";
// const Ably = require("ably");
// export default new Ably.Realtime("process.env.ABLY_API_KEY");

import { Realtime } from "ably";

const API_KEY = "ER9x-g.WmJrrA:zAVRHAJwGRlrKqByzRmn0vwMCOhxOq8_2fg0Iin50-o";

export const ably = new Realtime(API_KEY);

export default ably;
