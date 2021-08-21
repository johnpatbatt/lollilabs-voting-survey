import React, { useCallback, useState, useEffect } from "react";
import { Card, DataTable, Page, Stack, Heading } from "@shopify/polaris";
import axios from "axios";
import { CSVLink } from "react-csv";

export default function FullDataTableExample() {
  const [sortedRows, setSortedRows] = useState(null);
  const [initiallySortedProducts, setInitiallySortedProducts] = useState([]);
  const [totalData, setTotalData] = useState([]);

  useEffect(() => {
    axios.post("/micrositetwo/get", {}).then((res) => {
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

  const csvTotalHeaders = [
    { label: "Product", key: "title" },
    { label: "Total Score", key: "totalScore" },
    { label: "Avg Score", key: "avgScore" },
  ];

  const csvHeaders = [
    { label: "Product", key: "title" },
    { label: "Descriptor", key: "survey" },
    { label: "Score", key: "score" },
    { label: "Date", key: "date" },
  ];

  const csvTotalSurveyData = totalData.map((totalSurvey) => ({
    title: totalSurvey._id,
    totalScore: totalSurvey.totalScore,
    avgScore: totalSurvey.avgScore,
  }));

  const csvSurveyData = initiallySortedProducts.map((survey) => ({
    title: survey.title,
    survey: survey.survey,
    score: survey.score,
    date: createAt(survey._id),
  }));

  const csvTotalReport = {
    data: csvTotalSurveyData,
    headers: csvTotalHeaders,
    filename: "Microsote_2_Total_Survey.csv",
  };

  const csvReport = {
    data: csvSurveyData,
    headers: csvHeaders,
    filename: "Microsote_2_All_Survey.csv",
  };

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
    <Page title="Microsite 2 Voting Survey">
      <Card>
        <Stack>
          <Stack.Item fill>
            <Heading>Total survey data</Heading>
          </Stack.Item>
          <Stack.Item>
            <CSVLink
              {...csvTotalReport}
              className="Polaris-Button Polaris-Button--primary"
              target="_blank"
            >
              Export to CSV
            </CSVLink>
          </Stack.Item>
        </Stack>

        <DataTable
          columnContentTypes={["text", "numeric", "numeric"]}
          headings={["Product", "Total Score", "Avg Score"]}
          rows={totalSurveyRows}
          sortable={[false, true]}
          footerContent={`Showing ${totalSurveyRows.length} of ${totalSurveyRows.length} results`}
        />

        <Stack>
          <Stack.Item fill>
            <Heading>All survey data</Heading>
          </Stack.Item>
          <Stack.Item>
            <CSVLink
              {...csvReport}
              className="Polaris-Button Polaris-Button--primary"
              target="_blank"
            >
              Export to CSV
            </CSVLink>
          </Stack.Item>
        </Stack>

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
