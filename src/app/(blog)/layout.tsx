import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Sidebar from "../components/common/Sidebar";
import { siteConfig } from "../lib/config";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col gap-10">
      <Header />
      <div className="flex-1 max-w-5xl mx-auto px-4  w-full flex gap-10">
        <main className="flex-1 min-w-0">{children}</main>
        <div className="w-46 shrink-0 hidden lg:block border border-amber-400">
          <Sidebar tags={siteConfig.sidebarTags} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default layout;
