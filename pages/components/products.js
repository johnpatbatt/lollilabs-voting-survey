import React, { useState, useEffect } from "react";
import { Heading, Page, TextStyle, Layout, EmptyState } from "@shopify/polaris";
import { ResourcePicker, TitleBar } from "@shopify/app-bridge-react";
import ProductsList from "./product-list";
import axios from "axios";

export default function Index() {
  const [emptyState, setEmptyState] = useState(true);
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);

  const setUpdateStatus = () => {
    setUpdate(!update);
  };

  const handleSelection = (resources) => {
    setOpen(false);

    const productIds = resources.selection.map((product) => product.id);

    axios
      .post("/product/save", {
        products: productIds,
      })
      .then((res) => {
        if (res.data.success == true) {
          setUpdateStatus();
          console.log("product saved");
        }
      });
  };

  console.log("status", update);

  return (
    <Page title="Voting Products">
      <ResourcePicker // Resource picker component
        resourceType="Product"
        showVariants={false}
        open={open}
        onSelection={(resources) => handleSelection(resources)}
        onCancel={() => setOpen(false)}
      />

      <>
        <EmptyState
          action={{
            content: "Select products",
            onAction: () => setOpen(true),
          }}
        >
          <p>Select products to show their voting score.</p>
        </EmptyState>
        {/* <ResourceListWithProducts
          getUpdateStatus={setUpdateStatus}
          update={update}
          getIdUpdateStatus={setIdUpdateStatus}
          idupdate={idupdate}
        /> */}
        <ProductsList getUpdateStatus={setUpdateStatus} update={update} />
      </>
    </Page>
  );
}
