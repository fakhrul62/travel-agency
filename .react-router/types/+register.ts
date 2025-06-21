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
  "/trip/:tripId": {
    "tripId": string;
  };
  "/admin/profile": {};
  "/user-dashboard": {};
  "/my-trips": {};
  "/ai-trip": {};
  "/user/profile": {};
  "/sign-up": {};
  "/*": {
    "*": string;
  };
};