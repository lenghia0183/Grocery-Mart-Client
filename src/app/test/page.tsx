"use client";

import React, { useState } from "react";
import Tabs from "@/components/Tabs";
import Header from "@/components/Header";
import Dialog from "@/components/Dialog";
import DrawerMenu from "@/components/DrawerMenu";
import LabelValue from "@/components/LabelValue";
import GoToTop from "@/components/GoToTop";
import { useQueryState } from "@/hooks/useQueryState";
import Pagination from "@/components/Pagination";

export default function Test() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);

  const {
    page: productPage,
    tab: productTab,
    keyword,
    filters,
    orderBy,
    order,
    setPage,
    setTab,
    setKeyword,
  } = useQueryState({
    page: 2,
  });

  // Dữ liệu tab
  const tabList = [
    { label: "Dialog", value: "dialog" },
    { label: "Drawer", value: "drawer" },
    { label: "LabelValue", value: "labelValue" },
  ];

  const handleTabChange = (value?: string) => {
    setTab(value || "dialog");
  };

  console.log("filters", filters);
  console.log("order", order);
  console.log("orderBy", orderBy);

  const renderTabContent = () => {
    switch (productTab) {
      case "dialog":
        return (
          <>
            <button onClick={() => setIsOpen(true)}>Open Dialog</button>
            <Dialog
              isOpen={isOpen}
              onCancel={() => setIsOpen(false)}
              title="Example Dialog"
              submitLabel="Submit"
              cancelLabel="Cancel"
            >
              <p>This is a dialog content.</p>
            </Dialog>
          </>
        );
      case "drawer":
        return (
          <>
            <button onClick={() => setIsOpenDrawer(true)}>Open Drawer</button>
            <DrawerMenu
              isOpen={isOpenDrawer}
              renderContent={() => <div>Drawer Menu Content</div>}
              handleClose={() => setIsOpenDrawer(false)}
              handleOverlayClick={() => setIsOpenDrawer(false)}
              position="bottom"
            />
          </>
        );
      case "labelValue":
        return (
          <LabelValue label="Le cong nghia" value={<p>Le cong nghia</p>} />
        );
      default:
        return null;
    }
  };

  return (
    <main>
      <Header />
      <div className="container">
        <div className="filters">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search..."
          />
        </div>

        <Tabs
          list={tabList}
          value={productTab}
          onChange={handleTabChange}
          className="mb-6"
          tabClassName="text-lg"
          divider={false}
        >
          {renderTabContent()}
        </Tabs>

        <div className="pagination">
          <button
            onClick={() => setPage(productPage - 1)}
            disabled={productPage <= 1}
          >
            Previous
          </button>
          <span>{productPage}</span>
          <button onClick={() => setPage(productPage + 1)}>Next</button>
        </div>

        <Pagination pageCount={10} />

        <GoToTop />
      </div>
    </main>
  );
}
