
import React from "react";
import PropTypes from "prop-types";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import {
    BarSeries,
    AreaSeries,
} from "react-stockcharts/lib/series";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
    CrossHairCursor,
    MouseCoordinateX,
    MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";

import { SingleValueTooltip } from "react-stockcharts/lib/tooltip";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";

class AreaChartWithEdge extends React.Component {
    render() {
        const { type, data: initialData, width, ratio, barColor } = this.props;

        const xScaleProvider = discontinuousTimeScaleProvider
            .inputDateAccessor(d => d.time);
        const {
            data,
            xScale,
            xAccessor,
            displayXAccessor,
        } = xScaleProvider(initialData);

        const start = xAccessor(last(data));
        const end = xAccessor(data[Math.max(0, data.length - 150)]);
        const xExtents = [start, end];
        return (
            <ChartCanvas height={400}
                         ratio={ratio}
                         width={width}
                         margin={{ left: 70, right: 70, top: 20, bottom: 30 }}
                         type={type}
                         seriesName="MSFT"
                         data={data}
                         xScale={xScale}
                         xAccessor={xAccessor}
                         displayXAccessor={displayXAccessor}
                         xExtents={xExtents}
                         barColor={barColor}
            >
                <Chart id={1}
                       yExtents={d => [d.price, d.price]}
                >
                    <XAxis axisAt="bottom" orient="bottom"/>
                    <YAxis axisAt="right" orient="right" ticks={5} />

                    <MouseCoordinateX
                        at="bottom"
                        orient="bottom"
                        displayFormat={timeFormat("%Y-%m-%d  %H:%M")} />
                    <MouseCoordinateY
                        at="right"
                        orient="right"
                        displayFormat={format(".6f")} />

                    <AreaSeries yAccessor={d => d.price}
                                fill="#FFFFFF"
                    />

                    <SingleValueTooltip
                        // xLabel="Date" /* xLabel is optional, absence will not show the x value */
                        yLabel="Price"
                        yAccessor={d => d.price}
                        xDisplayFormat={timeFormat("%Y-%m-%d %H:%M")} yDisplayFormat={format(".6f")}
                        /* valueStroke="green" - optional prop */
                        /* labelStroke="#4682B4" - optional prop */
                        origin={[-40, 0]}/>
                    <SingleValueTooltip
                        yLabel="Volume" yAccessor={(d) => d.quantity}
                        origin={[-40, 20]}/>
                </Chart>
                <Chart id={2}
                       yExtents={d => [0, d.quantity]}
                       height={100} origin={(w, h) => [0, h - 100]}
                >
                    <XAxis axisAt="bottom" orient="bottom" />
                    <YAxis axisAt="left" orient="left" ticks={5} tickFormat={format(".2s")}/>

                    <MouseCoordinateY
                        at="left"
                        orient="left"
                        displayFormat={format(".4s")} />

                    <BarSeries yAccessor={d => d.quantity}
                               stroke fill={barColor} // "#FF0000"
                               opacity={0.4}
                               widthRatio={0.8} />
                </Chart>
                <CrossHairCursor />
            </ChartCanvas>
        );
    }
}

AreaChartWithEdge.propTypes = {
    data: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    ratio: PropTypes.number.isRequired,
    barColor: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

AreaChartWithEdge.defaultProps = {
    type: "svg",
};
AreaChartWithEdge = fitWidth(AreaChartWithEdge);

export default AreaChartWithEdge;
