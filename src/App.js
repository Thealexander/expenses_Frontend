import { Header, Footer } from "./components/layout";
import "./App.css";
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ExpenseDetails from "./components/expense/ExpenseDetails";

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Header /> */}
        <div className="container container-fluid">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/expenses/:id/' element={<ExpenseDetails />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
