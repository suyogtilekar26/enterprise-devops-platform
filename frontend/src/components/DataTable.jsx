function DataTable({

    title,
    columns,
    data

}) {

    return (

        <div className="table-card">

            <h2>

                {title}

            </h2>

            <table>

                <thead>

                    <tr>

                        {

                            columns.map((column,index)=>(

                                <th key={index}>

                                    {column}

                                </th>

                            ))

                        }

                    </tr>

                </thead>

                <tbody>

                    {

                        data.map((row,rowIndex)=>(

                            <tr key={rowIndex}>

                                {

                                    row.map((cell,colIndex)=>(

                                        <td key={colIndex}>

                                            {cell}

                                        </td>

                                    ))

                                }

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default DataTable;