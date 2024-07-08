import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { FlightInfo } from "../types/TypeInfo";

interface SearchResultsTableProps {
  searchResults: FlightInfo[];
}

const SearchResultsTable: React.FC<SearchResultsTableProps> = ({
  searchResults,
}) => {
  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Table>
        <TableHead sx={{ backgroundColor: "primary.main" }}>
          <TableRow>
            <TableCell sx={{ color: "common.white", fontWeight: "bold" }}>
              Airline
            </TableCell>
            <TableCell sx={{ color: "common.white", fontWeight: "bold" }}>
              Flight Number
            </TableCell>
            <TableCell sx={{ color: "common.white", fontWeight: "bold" }}>
              Origin
            </TableCell>
            <TableCell sx={{ color: "common.white", fontWeight: "bold" }}>
              Destination
            </TableCell>
            <TableCell sx={{ color: "common.white", fontWeight: "bold" }}>
              Departure Time
            </TableCell>
            <TableCell sx={{ color: "common.white", fontWeight: "bold" }}>
              Delays
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {searchResults.map((result) => (
            <TableRow
              key={result.id}
              sx={{ "&:nth-of-type(odd)": { backgroundColor: "action.hover" } }}
            >
              <TableCell>{result.airline}</TableCell>
              <TableCell>{result.flight_number}</TableCell>
              <TableCell>{result.origin}</TableCell>
              <TableCell>{result.destination}</TableCell>
              <TableCell>{result.actual_departure_at}</TableCell>
              <TableCell>
                <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                  {result.delays.map((delay) => (
                    <li
                      key={delay.code}
                      style={{ marginBottom: "8px", color: "#757575" }}
                    >
                      <Typography variant="body2" component="span">
                        {delay.description} ({delay.time_minutes} mins)
                      </Typography>
                    </li>
                  ))}
                </ul>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SearchResultsTable;
