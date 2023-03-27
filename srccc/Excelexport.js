import { Button } from '@mui/material';
import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style'

const exportFunc = (data) => {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "sheet1");
    XLSX.writeFile(wb, "MyExcel.xls");
}


export default exportFunc;