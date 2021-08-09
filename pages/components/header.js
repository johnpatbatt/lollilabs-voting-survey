import React, { useCallback, useState } from "react";
import { Card, Tabs } from "@shopify/polaris";
import Products from "./products";
import Scores from "./scores";

export default function TabsExample() {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );
  const HandlePageChange = () => {
    switch (selected) {
      case 0:
        return <Products />;

      case 1:
        return <Scores />;

      default:
        return <Products />;
    }
  };
  const tabs = [
    {
      id: "voting-products",
      content: "Products",
      accessibilityLabel: "All Voting Products",
      panelID: "all-voting-products",
    },
    {
      id: "voting-result",
      content: "Result",
      accessibilityLabel: "Voting survey result",
      panelID: "voting-survey-result",
    },
  ];

  return (
    <Card>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
        <HandlePageChange />
      </Tabs>
    </Card>
  );
}
