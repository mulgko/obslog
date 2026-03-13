import React from "react";
import Header from "@/src/app/components/common/Header";
import Footer from "@/src/app/components/common/Footer";
import Sidebar from "@/src/app/components/common/Sidebar";
import { siteConfig } from "@/src/app/lib/config";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col gap-10 overflow-x-hidden">
      <div className="flex-1 max-w-5xl mx-auto px-4 w-full flex gap-10">
        <main className="flex-1 min-w-0">{children}</main>
        <div className="w-46 shrink-0 hidden lg:block">
          <Sidebar tags={siteConfig.sidebarTags} />
        </div>
      </div>
    </div>
  );
};

export default layout;
