import React, { useCallback, useState } from "react";
import { Card, Tabs } from "@shopify/polaris";
import Products from "./products";
import MirositeOne from "./microsite-one";
import MirositeTwo from "./microsite-two";

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
        return <MirositeOne />;

      case 2:
        return <MirositeTwo />;

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
      id: "microsite-1",
      content: "Microsite 1",
      accessibilityLabel: "Microsite 1 Voting survey result",
      panelID: "micrositeone-voting-survey-result",
    },
    {
      id: "microsite-2",
      content: "Microsite 2",
      accessibilityLabel: "Microsite 2 Voting survey result",
      panelID: "micrositetwo-voting-survey-result",
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
