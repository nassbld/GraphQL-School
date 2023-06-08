import {launch} from "./server.js";

launch({
  protocol: process.env.PROTOCOL,
  host: process.env.HOST,
  port: process.env.PORT,
});