import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

interface Column {
  id: "no" | "name" | "image" | "price" | "status" | "sell";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "no", label: "No", minWidth: 50 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "image", label: "Image", minWidth: 60 },
  { id: "price", label: "Price", minWidth: 170 },
  { id: "status", label: "Status", minWidth: 170 },
  { id: "sell", label: "Sell", minWidth: 170 },
];

interface Data {
  no: string;
  name: string;
  image: string;
  price: number;
  status: string;
  sell: number;
}

function createData(
  no: string,
  name: string,
  image: string,
  price: number,
  status: string,
  sell: number
): Data {
  return { no, name, image, price, status, sell };
}

const rows = [
  createData(
    "1",
    "Greek salad on white plate on old rustic wooden table",
    "https://imgs.search.brave.com/of8SVmsOlmSVqFhzTWPt8IkoYSr7rGgu15twsFh8LlU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cHJvZC53ZWJzaXRl/LWZpbGVzLmNvbS82/MDQxNGIyMWYxZmZj/ZGJiMGQ1YWQ2ODgv/NjY2ODk1OWU2Mjlh/OWNmYzdiZmYxNDk4/X0FEXzRuWGMwT3N3/a1BnUGtIbHdnOEdR/TnBYOWl4N1JMYlFI/WmF0TTZRTzdSdml2/Ri1UY3owWDVUUUhE/dW5KejIzdlNNdVNy/Uk4wNEt6NW9oVjJ0/b0Mzc0swRVZSRVN3/c3FORzRKS1lMTG1i/akE5Ri15dks3bE1z/SGNtRjlpMWU2YS1u/cC1ybUs0MU9DVHlX/bkxpcXdTTzE5SF9n/el8tQS5qcGVn",
    13,
    "Active",
    3287263
  ),
  createData(
    "2",
    "China",
    "https://imgs.search.brave.com/lOKdrHkHP2ubOunbytx70hZuq16w-tD4OmiC3B6qk_I/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMDcv/NTQzLzIxMC9zbWFs/bC9ncmVlay1zYWxh/ZC1vbi13aGl0ZS1w/bGF0ZS1vbi1vbGQt/cnVzdGljLXdvb2Rl/bi10YWJsZS1zaWRl/LXZpZXctcGhvdG8u/anBn",
    14,
    "Active",
    9596961
  ),
  createData(
    "3",
    "Italy",
    "https://imgs.search.brave.com/IVqqrddY3JQDZei_CVBOADVj6Jt-P9AyXr7Pm7lVK3U/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cHJvZC53ZWJzaXRl/LWZpbGVzLmNvbS82/MDQxNGIyMWYxZmZj/ZGJiMGQ1YWQ2ODgv/NjY2ODk1OWUyMWZh/MzMxZDkzZmUxNjY2/X0FEXzRuWGVmcGI4/OV8wejdsSnk1V2Ja/Q2FYaVRPYVdjdVUt/bXI2ZTQ5MEZhMnBl/aWtkYmp0dGQ4SHdJ/Z3NrNFoxWW8tZ3pa/NnFPUkNkTGZIa1Bj/TVZaT0t0T1lwYzFU/emJZY191bVNZNlNp/V3lDUnVHRjgwUXU0/N3RhdlFUbzhJSC0z/YjNEbmFZSFhGS1Rz/VlUtTnBzYXVUSDI2/NzBxWTAuanBlZw",
    60,
    "Active",
    301340
  ),
  createData(
    "4",
    "Scallop Sashimi with Meyer Lemon Confit",
    "https://imgs.search.brave.com/YrBk8zOUmcFdf8EBh6m37LrX3DCyjqi7fdsn5uCcIJM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Zm9vZGFuZHdpbmUu/Y29tL3RobWIvVnVV/R2lUbklSMzZuUXpV/S2wxZ09kX1dTM0ZF/PS8xNTAweDAvZmls/dGVyczpub191cHNj/YWxlKCk6bWF4X2J5/dGVzKDE1MDAwMCk6/c3RyaXBfaWNjKCkv/MjAxMDEyLXNzLWRp/c2hlcy1zY2FsbG9w/LXNhc2hpbWktMDcw/MjA4ZjJlNjI2NGUw/Mzk3YTA3NjY3ZDU3/M2VjNTQuanBn",
    32,
    "Active",
    9833520
  ),
  createData(
    "5",
    "Fancy plate of food with greens and a sauce",
    "https://imgs.search.brave.com/n6hZVghpwqMefWNWXcEtictm2KNi1rEN9Igetc19pDk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMudGhlcmVzdGF1/cmFudGhxLmNvbS91/cGxvYWRzLzIwMjQv/MTAvU3RvY2tJbWFn/ZV9GYW5jeV9QbGF0/ZV9vZl9mb29kX3dp/dGhfR3JlZW5zX2Fu/ZF9NdXNocm9vbXMu/anBn",
    24,
    "Active",
    9984670
  ),
  createData(
    "6",
    "Delicious gourmet food Delicious gourmet food",
    "https://imgs.search.brave.com/SsXdtYarxnrgl1E2aDKFRwLOy7YgvwJ8JsQGd6hPWgY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTE3/MTY4MDMxL3Bob3Rv/L2RlbGljaW91cy1n/b3VybWV0LWZvb2Qu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PXByTUlRVmVPTGhi/LWR1ZEk1Qy1nSHJf/TGtBekRFYkZ4VTA2/TFU0T21pNkU9",
    21,
    "Active",
    7692024
  ),
];

export function ProductTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.no}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === "image" ? (
                            <img
                              src={value.toString()}
                              alt={row.name}
                              style={{
                                maxWidth: "60px",
                                height: "60px",
                              }}
                              className="rounded-full object-cover"
                            />
                          ) : column.id === "price" ? (
                            `$${value}`
                          ) : column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
