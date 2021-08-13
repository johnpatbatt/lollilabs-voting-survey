import React, { useCallback, useState, useEffect } from "react";
import { Card, DataTable, Link, Page } from "@shopify/polaris";
import axios from "axios";

export default function FullDataTableExample() {
  const [sortedRows, setSortedRows] = useState(null);
  const [initiallySortedProducts, setInitiallySortedProducts] = useState([]);
  const [totalData, setTotalData] = useState([]);

  useEffect(() => {
    axios.post("/micrositeone/get", {}).then((res) => {
      const surveysData = res.data.surveys;
      const totalSurveyData = res.data.totalSurvey;
      setInitiallySortedProducts(surveysData);
      setTotalData(totalSurveyData);
    });
  }, []);

  console.log("survey", initiallySortedProducts);
  console.log("totalSurveyData", totalData);

  function createAt(id) {
    let timestamp = id.toString().substring(0, 8);
    let date = new Date(parseInt(timestamp, 16) * 1000);
    return JSON.stringify(date);
  }

  const initiallySortedRows = initiallySortedProducts.map((survey) => [
    survey.title,
    survey.survey,
    survey.score,
    createAt(survey._id),
  ]);

  const totalSurveyRows = totalData.map((totalSurvey) => [
    totalSurvey._id,
    totalSurvey.totalScore,
    totalSurvey.avgScore,
  ]);

  const rows = sortedRows ? sortedRows : initiallySortedRows;

  return (
    <Page title="Microsite 1 Voting Survey">
      <Card>
        <DataTable
          columnContentTypes={["text", "numeric", "numeric"]}
          headings={["Product", "Total Score", "Avg Score"]}
          rows={totalSurveyRows}
          sortable={[false, true]}
          footerContent={`Showing ${totalSurveyRows.length} of ${totalSurveyRows.length} results`}
        />
        <DataTable
          columnContentTypes={["text", "text", "numeric", "text"]}
          headings={["Product", "Descriptor", "Score", "Date"]}
          rows={rows}
          sortable={[false, true]}
          footerContent={`Showing ${rows.length} of ${rows.length} results`}
        />
      </Card>
    </Page>
  );
}
