import React from "react";
import { Box, H1, Text, Table, TableHead, TableRow, TableCell } from "@adminjs/design-system";

const DashboardUI = () => {
  return (
    <Box variant="grey" padding="lg">
      <H1>⚽ Football League Dashboard</H1>
      <Text>Welcome to the Football League Management System.</Text>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>🏆 League Name</TableCell>
            <TableCell>📅 Start Date</TableCell>
            <TableCell>📍 Location</TableCell>
          </TableRow>
        </TableHead>
        <TableRow>
          <TableCell>Premier League</TableCell>
          <TableCell>March 10, 2025</TableCell>
          <TableCell>London</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Champions League</TableCell>
          <TableCell>April 15, 2025</TableCell>
          <TableCell>Paris</TableCell>
        </TableRow>
      </Table>
    </Box>
  );
};

export default DashboardUI;
