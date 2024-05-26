import * as accommodation from "./accommodation";
import * as user from "./user";
import * as booking from "./booking";
import * as host from "./host";
import * as account from "./account";
import * as verificationToken from "./verificationToken";

export const schema = {
  ...user,
  ...accommodation,
  ...booking,
  ...host,
  ...account,
  ...verificationToken,
};

export type Schema = typeof schema;
