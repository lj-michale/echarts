/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

import LineSeries from './LineSeries';
import LineView from './LineView';
import LineSeriesModel from './LineSeries';

// In case developer forget to include grid component

import layoutPoints from '../../layout/points';
import dataSample from '../../processor/dataSample';

import { EChartsExtensionInstallRegisters } from '../../extension';

export function install(registers: EChartsExtensionInstallRegisters) {

    registers.registerChartView(LineView);
    registers.registerSeriesModel(LineSeries);

    registers.registerLayout(layoutPoints('line', true));

    registers.registerVisual({
        seriesType: 'line',
        reset: function (seriesModel: LineSeriesModel) {
            // Visual coding for legend
            const lineStyle = seriesModel.getModel('lineStyle');
            const itemStyle = seriesModel.getModel('itemStyle');
            const color = itemStyle ? itemStyle.get('color') : null;
            const borderColor = itemStyle ? itemStyle.get('borderColor') : null;//TODO
            const lineColor = lineStyle && lineStyle.get('color') || color;

            console.log(color, borderColor)
            if (lineStyle) {
                seriesModel.getData().setVisual('legendSymbolStyle', {
                    borderColor,
                    horizontalLineColor: lineColor,
                    horizontalLineWidth: lineStyle.get('width')
                });
            }
        }
    });

    // Down sample after filter
    registers.registerProcessor(
        registers.PRIORITY.PROCESSOR.STATISTIC,
        dataSample('line')
    );

}