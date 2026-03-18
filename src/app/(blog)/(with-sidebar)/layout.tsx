import React from "react";
import Sidebar from "@/src/app/components/common/Sidebar";
import { siteConfig } from "@/src/app/lib/config";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-10 w-full">
      <div className="flex-1 min-w-0">{children}</div>
      <div className="w-46 shrink-0 hidden lg:block">
        <Sidebar tags={siteConfig.sidebarTags} />
      </div>
    </div>
  );
};

export default layout;
