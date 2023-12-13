import React, { useState, useEffect }  from 'react';
import Table from 'react-bootstrap/esm/Table';
import { MDBDataTable } from 'mdbreact';


export default function Report({ prodList, categList, report}){
    const [data, setData] = useState ({
        columns: [
          {
            label: 'Customer Name',
            field: 'name',
            sort: 'asc',
            width: 150
          },
          {
            label: 'Item Name',
            field: 'item',
            sort: 'asc',
            width: 270
          },
          {
            label: 'Quantity Ordered',
            field: 'quantity',
            sort: 'asc',
            width: 200
          },
          {
            label: 'Total Price',
            field: 'total',
            sort: 'asc',
            width: 150
          },
        ],
        rows: [

        ]
      })

    const [prodTotal, setProdTotal] = useState({});

    useEffect(() => {
        const updatedRows = report.map((reportItem) => {
          const matchingProd = prodList.find((prod) => prod.prodID === reportItem.prodID);
          const categoryName = categList.find((item) => matchingProd?.category === item[0])?.[1] || '';
    
          return {
            name: reportItem.name,
            item: matchingProd?.prodName || '',
            quantity: reportItem.stock,
            total: reportItem.total,
            category: categoryName,
          };
        });
        
        setData((prevData) => ({ ...prevData, rows: updatedRows }));

        const totalPriceMap = report.reduce((acc, reportItem) => {
            const matchingProd = prodList.find((prod) => prod.prodID === reportItem.prodID);
            if (matchingProd) {
            const currentTotalPrice = acc[matchingProd.prodName] || 0;
            acc[matchingProd.prodName] = currentTotalPrice + reportItem.total;
            }
            return acc;
        }, {});
        
        setProdTotal(totalPriceMap);
        
      }, [report, prodList, categList]);

   return(
    <>
    <h1>{JSON.stringify(prodTotal)}</h1>
    {/* <Table>
    <thead>
        <tr>
            <th>Customer Name</th>
            <th>Item Name</th>
            <th>Stock</th>
            <th>Category</th>
        </tr>
    </thead>
    <tbody>
        {report.map(report=>(
          
          <tr>

            <td>{report.name}</td>
            {
                prodList.map(prod=>{
                    if(report.prodID === prod.prodID){
                        return(
                            <>
                                <td>{prod.prodName}</td>
                                <td>{report.stock}</td>

                               {
                                categList.map((item, index)=>{
                                    if(prod.category === item[0]){
                                        return (<td>{item[1]}</td>)
                                    }
                                    return null;
                                })
                                }
                            </>
                        )
                    }
                    return null;
                })
                }
          </tr>  
          
        ))}
    </tbody>
</Table> */}
<MDBDataTable
      data={data}
      sorting={false}
    />
    {/* <h1>{JSON.stringify(report)}</h1> */}
</>
   )
}
