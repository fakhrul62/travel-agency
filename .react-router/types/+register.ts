import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/api/create-trip": {};
  "/dashboard": {};
  "/all-users": {};
  "/all-trips": {};
  "/trips/create": {};
  "/all-trips/:tripId": {
    "tripId": string;
  };
  "/sign-up": {};
  "/*": {
    "*": string;
  };
};