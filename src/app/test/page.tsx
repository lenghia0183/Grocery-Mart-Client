"use client";

import React, { useState } from "react";
import Tabs from "@/components/Tabs";
import Header from "@/components/Header";
import Dialog from "@/components/Dialog";
import DrawerMenu from "@/components/DrawerMenu";
import LabelValue from "@/components/LabelValue";
import GoToTop from "@/components/GoToTop";
export default function Test() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState("dialog");

  const tabList = [
    { label: "Dialog", value: "dialog" },
    { label: "Drawer", value: "drawer" },
    { label: "LabelValue", value: "labelValue" },
  ];

  const handleTabChange = (value?: string) => {
    setSelectedTab(value || "dialog");
  };

  const renderTabContent = () => {
    switch (selectedTab) {
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
            <button
              onClick={() => {
                setIsOpenDrawer(true);
              }}
            >
              Open Drawer
            </button>
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
        <Tabs
          list={tabList}
          value={selectedTab}
          onChange={handleTabChange}
          className="mb-6"
          tabClassName="text-lg"
          divider={false}
        >
          {renderTabContent()}
        </Tabs>
        <GoToTop />
      </div>
    </main>
  );
}
