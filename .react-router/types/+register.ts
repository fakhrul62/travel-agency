import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/sign-in": {};
  "/api/create-trip": {};
  "/dashboard": {};
  "/all-users": {};
  "/trips": {};
  "/trips/create": {};
};