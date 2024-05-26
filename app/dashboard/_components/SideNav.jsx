import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import { LibraryBig, LineChart, MessageSquare, Shield } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

function SideNav() {
  const menuList = [
    {
      id: 1,
      name: "My Forms",
      icon: LibraryBig,
      path: "/dashboard",
    },
    {
      id: 1,
      name: "Responses",
      icon: MessageSquare,
      path: "/dashboard/responses",
    },
  ];

  const { user } = useUser();
  const path = usePathname();
  const [formList, setFormList] = useState();
  const [PercFileCreated, setPercFileCreated] = useState(0);

  useEffect(() => {
    user && GetFormList();
  }, [user]);

  const GetFormList = async () => {
    const result = await db
      .select()
      .from(JsonForms)
      .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(JsonForms.id));

    setFormList(result);

    const perc = (result.length / 10) * 100;
    setPercFileCreated(perc);
  };

  return (
    <div className="h-screen shadow-md border">
      <div className="p-5">
        {menuList.map((menu, index) => (
          <Link
            href={menu.path}
            key={index}
            className={`flex items-center gap-3 p-4 mb-3 
                hover:bg-primary hover:text-white rounded-lg
                cursor-pointer text-gray-500
                ${path == menu.path && "bg-primary text-white"}
                `}
          >
            <menu.icon />
            {menu.name}
          </Link>
        ))}
      </div>
      <div className="fixed bottom-7 p-6 w-64 ">
        <Button className="w-full">+ Create Form</Button>
        <div className="my-7">
          <Progress value={PercFileCreated} />
          <h2 className="text-sm mt-2 text-gray-600">
            <strong>{formList?.length} </strong>Out of <strong>10</strong> File
            Created
          </h2>
          <h2 className="text-sm mt-3 text-pretty text-gray-600">
            For Upgrade reacch me out.
          </h2>
          <Link href={"https://github.com/shreyzeous21"} target="_blank">
            <Button className="bg-black text-white mt-2">Contact Me</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
