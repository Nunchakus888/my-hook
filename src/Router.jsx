import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Link to="/">useState</Link>
      <Link to="/useReduce">useReduce</Link>
    </Router>
  )
}
