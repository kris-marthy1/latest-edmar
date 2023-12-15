import React, { useState, useEffect }  from 'react';
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

        
      }, [report, prodList, categList]);

   return(
    <>
    <small>Note: click on column title to sort</small>
<MDBDataTable
      data={data}
      sorting={false}
    />
</>
   )
}
