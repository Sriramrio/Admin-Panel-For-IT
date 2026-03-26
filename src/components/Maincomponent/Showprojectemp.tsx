import { db } from "../../db"
import { useLiveQuery } from "dexie-react-hooks"
const Showprojectemp = () => {
      const dbdata=useLiveQuery(()=>db.ProjectTable.toArray())
  return (
    <>
    <div className=''>
        {dbdata?.map(item=>(
        <div className="bg-gray-400 p-4 ">
            <span>{item.Projecttitle}</span>
        </div>
        ))}
    </div>
    </>
  )
}

export default Showprojectemp
