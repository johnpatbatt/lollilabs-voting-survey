import React, { useCallback, useState, useEffect } from "react";
import { Card, DataTable, Link, Page } from "@shopify/polaris";
import axios from "axios";

export default function FullDataTableExample() {
  const [sortedRows, setSortedRows] = useState(null);
  const [initiallySortedProducts, setInitiallySortedProducts] = useState([]);

  useEffect(() => {
    axios.post("/product/get", {}).then((res) => {
      const productsData = res.data.products;
      setInitiallySortedProducts(productsData);
    });
  }, []);

  const initiallySortedRows = initiallySortedProducts.map((product) => [
    product.title,
    product.score,
  ]);

  const rows = sortedRows ? sortedRows : initiallySortedRows;
  const handleSort = useCallback(
    (index, direction) => setSortedRows(sortCurrency(rows, index, direction)),
    [rows]
  );

  return (
    <Page title="Voting score by product">
      <Card>
        <DataTable
          columnContentTypes={["text", "numeric"]}
          headings={["Product", "Avg Score"]}
          rows={rows}
          sortable={[false, true]}
          defaultSortDirection="descending"
          initialSortColumnIndex={1}
          onSort={handleSort}
          footerContent={`Showing ${rows.length} of ${rows.length} results`}
        />
      </Card>
    </Page>
  );

  function sortCurrency(rows, index, direction) {
    return [...rows].sort((rowA, rowB) => {
      const amountA = parseFloat(rowA[index].substring(1));
      const amountB = parseFloat(rowB[index].substring(1));

      return direction === "descending" ? amountB - amountA : amountA - amountB;
    });
  }
}
