import { Button } from "@/components/ui/button";
import { db } from "@/configs";
import { userResponses } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";

function FormListItemResp({ jsonForm, formRecord }) {
  const [loading, setLoading] = useState(false);
  const [responseCount, setResponseCount] = useState(0);

  // Fetch the response count when the component mounts
  useEffect(() => {
    const fetchResponseCount = async () => {
      try {
        const countResult = await db
          .select()
          .from(userResponses)
          .where(eq(userResponses.formRef, formRecord.id))
          .count()
          .execute(); // Make sure to call execute() on the query

        // Set the response count
        setResponseCount(countResult[0]?.count || 0);
      } catch (error) {
        console.error("Error fetching response count:", error);
      }
    };

    fetchResponseCount();
  }, [formRecord.id]);

  // Function to export data to Excel
  const ExportData = async () => {
    let jsonData = [];
    setLoading(true);

    try {
      const result = await db
        .select()
        .from(userResponses)
        .where(eq(userResponses.formRef, formRecord.id))
        .execute(); // Make sure to call execute() on the query

      if (result) {
        result.forEach((item) => {
          const jsonItem = JSON.parse(item.jsonResponse);
          jsonData.push(jsonItem);
        });
      }
      console.log(jsonData);
      exportToExcel(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to convert JSON data to Excel and download it
  const exportToExcel = (jsonData) => {
    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    XLSX.writeFile(workbook, `${jsonForm?.formTitle}.xlsx`);
  };

  return (
    <div className="border shadow-sm rounded-lg p-4 my-5">
      <h2 className="text-lg text-black">{jsonForm?.formTitle}</h2>
      <h2 className="text-sm text-gray-500">{jsonForm?.formHeading}</h2>
      <hr className="my-4"></hr>
      <div className="flex justify-between items-center">
        <h2 className="text-sm">
          <strong>{responseCount}</strong> Responses
        </h2>
        <Button
          className=""
          size="sm"
          onClick={() => ExportData()}
          disabled={loading}
        >
          {loading ? <Loader2 className="animate-spin" /> : "Export"}
        </Button>
      </div>
    </div>
  );
}

export default FormListItemResp;
