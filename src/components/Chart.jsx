import React from 'react'
import { Defs, LinearGradient, Stop } from 'react-native-svg'
import { LineChart, Grid, YAxis } from 'react-native-svg-charts'
import { View } from 'react-native'
import {Colors} from '../theme/Colors'
import {auth} from "../../firebase";
import {Title} from "react-native-paper";

const Charts = () => {
    const data = [50, 60, 40, 65, 65, 70, 85, 91, 85, 75, 63, 84, 90, 70, 80]

    const contentInset = { top: 10, bottom: 10 }

    return (
        <View style={{ height: 200, flexDirection: 'row' }}>
            <YAxis
                data={data}
                contentInset={contentInset}
                svg={{
                    fill: 'grey',
                    fontSize: 10,
                }}
                numberOfTicks={10}
                formatLabel={(value) => `${value}`}
            />
            <LineChart
                style={{ flex: 1, marginLeft: 15 }}
                data={data}
                svg={{ stroke: Colors.colors.chart }}
                contentInset={contentInset}
            >
                <Grid />
            </LineChart>
        </View>
    )
}

export default Charts