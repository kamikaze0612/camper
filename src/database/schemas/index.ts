import * as accommodation from "./accommodation";
import * as user from "./user";
import * as booking from "./booking";
import * as host from "./host";

export const schema = {
  ...user,
  ...accommodation,
  ...booking,
  ...host,
};

export type Schema = typeof schema;
