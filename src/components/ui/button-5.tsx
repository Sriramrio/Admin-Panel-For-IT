import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { type Projecttype } from "../../db";
import { type Employessdatatype } from "../../db";
type Props = {
  projectdata: Projecttype[];
  employeedata: Employessdatatype[];
};

export const Component = ({ projectdata, employeedata }: Props) => {
  const downloadExcel = () => {
    const projectSheet = XLSX.utils.json_to_sheet(projectdata);
    const employeeSheet = XLSX.utils.json_to_sheet(employeedata);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, projectSheet, "Projects");
    XLSX.utils.book_append_sheet(workbook, employeeSheet, "Employees");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(data, "ERP_Report.xlsx");
  };

  return (
    <>
      <div
        className="group relative cursor-pointer p-1 w-40 border bg-white rounded-xl overflow-hidden text-black text-center font-medium"
        onClick={downloadExcel}
      >
        <span className="translate-y-0 group-hover:-translate-y-12 group-hover:opacity-0 transition-all duration-300 inline-block">
          Download Report
        </span>
        <div className="flex gap-2 text-white bg-green-400 z-10 items-center absolute left-0 top-0 h-full w-full justify-center translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 rounded-full group-hover:rounded-none ">
          <span>
            Clike Me <i className="bi bi-download"></i>
          </span>
        </div>
      </div>
    </>
  );
};
