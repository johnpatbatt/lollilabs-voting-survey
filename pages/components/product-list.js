import React, { useState, useEffect } from "react";
import {
  Card,
  ResourceList,
  ResourceItem,
  Stack,
  TextStyle,
  Thumbnail,
} from "@shopify/polaris";
import store from "store-js";
import axios from "axios";

function ProductsList(props) {
  const [allProducts, setAllProducts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    axios.post("/product/get", {}).then((res) => {
      const productsData = res.data.products;
      setAllProducts(productsData);
    });
  }, [props.update]);

  const resourceName = {
    singular: "Product",
    plural: "Products",
  };

  const promotedBulkActions = [
    {
      content: "Delete Products",
      onAction: () => {
        axios
          .post("/product/remove", {
            products: selectedItems,
          })
          .then((res) => {
            if (res.data.success == true) {
              props.getUpdateStatus();
              setSelectedItems([]);
            }
          });
      },
    },
  ];

  return (
    <Card>
      <ResourceList // Defines your resource list component
        showHeader
        resourceName={resourceName}
        items={allProducts}
        renderItem={renderItem}
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems}
        promotedBulkActions={promotedBulkActions}
      />
    </Card>
  );

  function renderItem(item) {
    const media = (
      <Thumbnail
        source={item.featuredImage ? item.featuredImage : ""}
        alt={item.featuredImage ? "voting product" : ""}
      />
    );
    const price = item.price;

    return (
      <ResourceItem
        verticalAlignment="center"
        id={item.id}
        media={media}
        accessibilityLabel={`View details for ${item.title}`}
        onClick={() => {
          store.set("item", item);
        }}
      >
        <h3>
          <TextStyle variation="strong">{item.title}</TextStyle>
        </h3>
        <p>${price}</p>
      </ResourceItem>
    );
  }
}

export default ProductsList;
