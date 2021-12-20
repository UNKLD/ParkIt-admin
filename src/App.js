import './App.css';
import './materialize/css/materialize.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './views/LoginPage';
import Dashboard from './views/admin/Dashboard';
import UsersList from './views/admin/UsersList';
import EmpUsersList from './views/emp/EmpUsersList';
import AddTariff from './views/includes/AddTariff';
import AddEmployee from './views/includes/AddEmployee';
import AddLotInfo from './views/includes/AddLotInfo';
import AddNearLot from './views/includes/AddNearLot';
import ShowParkingLot from './views/admin/ShowParkingLot';
import EmployeeList from './views/admin/EmployeeList';
import NearByList from './views/admin/NearByList';
import OwnerDashboard from './views/OwnerDashboard';
import AddAdmin from './views/AddAdmin';
import OwnerRegister from './views/OwnerRegister';
import EmpLogin from './views/emp/LoginPage';
import EmpDashboard from './views/emp/Dashboard';
import AdminLogin from './views/admin/LoginPage';
import ShowReservations from './views/admin/ShowReservations';
import Report from './views/Report';
import ShowFeedBacks from './views/admin/ShowFeedBacks';
import ReactSession from 'react-client-session/dist/ReactSession';

function App() {
  ReactSession.setStoreType('localStorage');
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/employeelogin" component={EmpLogin} />
          <Route exact path="/adminlogin" component={AdminLogin} />
          <Route exact path="/ownerdashboard" component={OwnerDashboard} />
          <Route exact path="/feedbacks" component={ShowFeedBacks} />
          <Route exact path="/ownerregister" component={OwnerRegister} />
          <Route exact path="/addadmin" component={AddAdmin} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/empdashboard" component={EmpDashboard} />
          <Route exact path="/usersList" component={UsersList} />
          <Route exact path="/showreserve" component={ShowReservations} />
          <Route exact path="/showreport" component={Report} />
          <Route exact path="/nearbylist" component={NearByList} />
          <Route exact path="/empuserslist" component={EmpUsersList} />
          <Route exact path="/addtariff" component={AddTariff} />
          <Route exact path="/addemployee" component={AddEmployee} />
          <Route exact path="/addlotinfo" component={AddLotInfo} />
          <Route exact path="/addnearlot" component={AddNearLot} />
          <Route exact path="/showparkinglot" component={ShowParkingLot} />
          <Route export path="/employeelist" component={EmployeeList} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
