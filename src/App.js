import CustomersDetails from "./components/CustomerDetails/CustomersDetails";
import { Route, Switch } from "react-router";
import CustomerBidDetails from "./components/CustomerBidDetails/CustomerBidDetails";
const App = function () {
  return (
    <Switch>
      <Route path="/" component={CustomersDetails} exact />
      <Route path="/bidPage/:id" component={CustomerBidDetails} />
    </Switch>
  );
}

export default App;
