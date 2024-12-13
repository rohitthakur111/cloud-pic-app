const PageSize = ({handleSelect, searchParams,options,setPageSize})=>{
    const pageSizeArray = ()=>{
        let arr = [];
        for(let i=1;i<=10; i++){
            arr.push(i*5)
        }
        return arr
    }
    return(
        <>
            <div className="flex flex-row gap-4">
                <div>
                    <select 
                        className="select w-full max-w-xs  select-bordered" 
                        value={searchParams.get('pagesize') || ''}
                        onChange={(e)=>setPageSize(e.target.value)}
                    >
                        <option value="" disabled defaultValue>Select Page Size</option>
                            {pageSizeArray().map((option,i)=> <option value={option} key={i}> Page Size : {option} 
                        </option>)}
                    </select>
                </div>  
                <div>
                    <select 
                        className="select w-full max-w-xs  select-bordered" 
                        value={searchParams.get('type') || ''}
                        onChange={handleSelect}
                    >
                        <option value="" disabled defaultValue>Select your images</option>
                            {options.map((option,i)=> <option value={option.value} key={i}> {option.title} 
                        </option>)}
                    </select>
                </div>
            </div>
        </>
    )
}
export default PageSize