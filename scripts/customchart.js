function DrawLine(type, renderAt, caption, xaxisname, yaxisname, data) {
    var test = {
        type: type,
        renderAt: renderAt,
        width: "100%",
        height: "95%",
        dataFormat: 'json',
        dataSource: {
            "chart": {
                "caption": caption,
                "xaxisname": xaxisname,
                "yaxisname": yaxisname,
                "numberprefix": "Rs.",
                "bgcolor": "FFFFFF",
                "paletteColors": "#0075c2,#1aaf5d,#f2c500,#f45b00,#8e0000",
                "showvalues": "0",
                "showBorder": "0",
                "theme": "fint"
            },
            "data": data
        }
    };
    return test;
}

function DrawPie(type, renderAt, caption, data) {
    var test = {
        type: type,
        renderAt: renderAt,
        width: "100%",
        height: "95%",
        dataFormat: 'json',
        dataSource: {
            "chart": {
                "caption": caption,
                "paletteColors": "#0075c2,#1aaf5d,#f2c500,#f45b00,#8e0000",
                "bgColor": "#ffffff",
                "showBorder": "0",
                "use3DLighting": "0",
                "showShadow": "0",
                "enableSmartLabels": "0",
                "startingAngle": "0",
                "showValues": "0",
                "showPercentInTooltip": "1",
                "decimals": "2",
                "captionFontSize": "14",
                "subcaptionFontSize": "14",
                "subcaptionFontBold": "0",
                "toolTipColor": "#ffffff",
                "toolTipBorderThickness": "0",
                "toolTipBgColor": "#000000",
                "toolTipBgAlpha": "80",
                "toolTipBorderRadius": "2",
                "showHoverEffect": "1",
                "showLegend": "0",
                "showLabels": "0",
                "labelDistance": "15",
                "legendBgColor": "#ffffff",
                "legendBorderAlpha": "0",
                "legendShadow": "0",
                "legendItemFontSize": "10",
                "legendItemFontColor": "#666666",
                "useDataPlotColorForLabels": "1"
            },
            "data": data
        }};
    return test;
}