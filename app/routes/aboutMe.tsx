import { redirect } from "react-router";

export async function loader() {
  return redirect("https://www.linkedin.com/in/mahdi-khorshidi/");
}
