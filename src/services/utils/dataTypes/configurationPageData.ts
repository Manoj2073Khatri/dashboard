export default interface PlatformReferenceTableData {
    id?: any | null,
    name: string,
    description: string,
    status: boolean,
    createdAt: Date,
    updatedAt: Date,
  }

 export default interface PlatformReferenceTableDataColumn{
    Header: string,
    accessor: string,
    //Cell?:any,
 }
 export default interface AdminTableDataColumn{
   id?: any,
   email :string,
   userName: string,
   role: string,
   updatedAt: Date,
   status: boolean
 }
 export default interface ExtractedDocumentData{
   id?:any,
   fileName: string,
   status: boolean,
   updatedAt: Date,
 }