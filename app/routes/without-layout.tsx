import { Link } from "react-router";

export default function WithoutLayout() {
  return (
    <div>
      <h1>Without Layout</h1>
      <Link to="/">Go Back to Home</Link>
    </div>
  );
}
