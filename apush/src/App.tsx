import "./App.css";
import { Home } from "./components/Home";
import { Header } from "./components/Header";
import { Route, Routes } from "react-router-dom";
import { PageInside } from "./components/PageInside";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/apush" element={<Home />} />
        <Route path="/:page" element={<PageInside />} />
      </Routes>
    </div>
  );
}

export default App;
