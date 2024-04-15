import React from "react";
import 'chart.js/auto';
import { Line as LineJs } from 'react-chartjs-2';

type PropsLine = {
    data: Array<number>;
    title: string;
}

export const Line: React.FC<PropsLine> = ({data, title}) => {
    let labelsData: Array<number> = [];
    data.forEach((value,index) => {
        labelsData.push(index);
    });
    const dataset = {
        labels: labelsData,
        datasets: [{
            label: title,
            data: data,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    }

    return(
        <LineJs  datasetIdKey='0' data={dataset} />
    );
}