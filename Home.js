import Container from 'react-bootstrap/Container';
import { Line, Bar } from 'react-chartjs-2'; // Import Line and Bar from 'react-chartjs-2'
import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

export default function GraphData({labelStocks, dataStocks, report, prodList}){
    const myChart = {
        labels: labelStocks,
        datasets: [{
            label: 'Stocks',
            data: dataStocks,
            backgroundColor: [
              'rgba(127, 0 , 255)',
            ],
            borderColor: 'rgb(127, 0 , 255)',
            tension: 0.1
        }]
    };
    const [prodTotal, setProdTotal] = useState({});
    useEffect(() => {

        const totalPriceMap = report.reduce((acc, reportItem) => {
            const matchingProd = prodList.find((prod) => prod.prodID === reportItem.prodID);
            if (matchingProd) {
            const currentTotalPrice = acc[matchingProd.prodName] || 0;
            acc[matchingProd.prodName] = currentTotalPrice + reportItem.total;
            }
            return acc;
        }, {});
        
        setProdTotal(totalPriceMap);
        
      }, [report, prodList]);

    var labelSales = [];
    var prodSales = [];
    Object.keys(prodTotal).forEach(function (key){
        labelSales.push(key)
        prodSales.push(prodTotal[key])
      })

    const myChart2 = {
        labels: labelSales,
        datasets: [{
            label: 'Sales',
            data: prodSales,
            backgroundColor: [
              'rgba(255, 99, 132)',
              'rgba(255, 159, 64)',
              'rgba(255, 205, 86)',
              'rgba(75, 192, 192)',
              'rgba(54, 162, 235)',
              'rgba(153, 102, 255)',
              'rgba(201, 203, 207)'
            ],
            borderColor: [
              'rgba(255, 99, 132)',
              'rgba(255, 159, 64)',
              'rgba(255, 205, 86)',
              'rgba(75, 192, 192)',
              'rgba(54, 162, 235)',
              'rgba(153, 102, 255)',
              'rgba(201, 203, 207)'
            ],
            tension: 0.1
        }]
    };
    console.log(labelSales)
    return(
        <Container>
            <div style={{ display: 'flex' }}>
                <div style={{ width: '50%' }}>
                    <Line data={myChart} />
                </div>
                <div style={{ width: '50%' }}>
                    <Bar data={myChart2} />
                </div>
            </div>
        </Container>
    )
   
}

