import React from "react";
import { Routes, Route } from "react-router-dom";
import SearchBar from "./components/SearchBar";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SearchBar />} />
      {/* <Route path="/search" element={<SearchResults />} /> */}
    </Routes>
  );
};

export default App;
