// SearchBar.tsx

import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Typography,
  Box,
  Paper, // Import Paper from MUI for TableContainer
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import SearchResultsTable from "./SearchResultsTable"; // Import SearchResultsTable component
import { FlightInfo } from "../types/TypeInfo"; // Assuming FlightInfo and types are imported

const SearchBar: React.FC = () => {
  const [filterType, setFilterType] = useState<"airlines" | "destination">(
    "airlines"
  );
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [destination, setDestination] = useState("");
  const [searchQueryError, setSearchQueryError] = useState<string>("");
  const [searchResults, setSearchResults] = useState<FlightInfo[]>([]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const filter = searchParams.get("filter");
    const query = searchParams.get("query");

    if (filter === "airlines") {
      setFilterType("airlines");
      setSelectedAirlines(query ? query.split(",") : []);
    } else if (filter === "destination") {
      setFilterType("destination");
      setDestination(query || "");
    }
  }, [location.search]);

  const handleSearch = async () => {
    if (filterType === "destination" && destination.length < 3) {
      setSearchQueryError("Destination must be at least 3 characters long");
      return;
    }

    if (filterType === "airlines" && selectedAirlines.length === 0) {
      setSearchQueryError("Please enter at least one airline");
      return;
    }

    setSearchQueryError(""); // Clear any previous error messages

    let queryParams = "";
    if (filterType === "destination") {
      queryParams = `destination=${destination}`;
    } else if (filterType === "airlines") {
      queryParams = selectedAirlines
        .map((airline) => `airlines=${airline}`)
        .join("&");
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/get_flight_info?${queryParams}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data: FlightInfo[] = await response.json(); // Ensure data is of FlightInfo[] type
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAirlinesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAirlines(event.target.value.split(","));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        bgcolor: "white",
        textAlign: "center",
        p: 4,
        color: "black",
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom>
        <span style={{ color: "#3f51b5", fontWeight: "bold" }}>
          Cosmos Airline Search Portal
        </span>
      </Typography>
      <FormControl component="fieldset" sx={{ mb: 2 }}>
        <FormLabel component="legend">Filter By</FormLabel>
        <RadioGroup
          row
          value={filterType}
          onChange={(e) =>
            setFilterType(e.target.value as "airlines" | "destination")
          }
        >
          <FormControlLabel
            value="airlines"
            control={<Radio sx={{ color: "black" }} />}
            label="Airlines"
            sx={{ color: "black" }}
          />
          <FormControlLabel
            value="destination"
            control={<Radio sx={{ color: "black" }} />}
            label="Destination"
            sx={{ color: "black" }}
          />
        </RadioGroup>
      </FormControl>
      {filterType === "destination" ? (
        <TextField
          label="Destination"
          variant="outlined"
          value={destination}
          onChange={(e) => {
            setDestination(e.target.value);
            if (searchQueryError && e.target.value.length >= 3) {
              setSearchQueryError("");
            }
          }}
          error={searchQueryError !== ""}
          helperText={searchQueryError}
          sx={{ mb: 2, width: "300px" }}
        />
      ) : (
        <TextField
          label="Airlines (comma-separated)"
          variant="outlined"
          value={selectedAirlines.join(",")}
          onChange={(e) => {
            setSelectedAirlines(e.target.value.split(","));
            if (searchQueryError && e.target.value.trim() !== "") {
              setSearchQueryError("");
            }
          }}
          error={searchQueryError !== ""}
          helperText={searchQueryError}
          sx={{ mb: 2, width: "300px" }}
        />
      )}
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>

      {/* Render SearchResultsTable component if there are search results */}
      {searchResults.length > 0 && (
        <SearchResultsTable searchResults={searchResults} />
      )}
    </Box>
  );
};

export default SearchBar;
