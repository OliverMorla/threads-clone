import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production"
    ? "http://threads-clone.us-east-2.elasticbeanstalk.com"
    : "http://threads-clone.us-east-2.elasticbeanstalk.com";

export const socket = io(URL!);
