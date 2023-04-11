import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts/core'
// 引入柱状图图表，图表后缀都为 Chart
import { PieChart, BarChart } from 'echarts/charts'
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent
} from 'echarts/components'
// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  PieChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
])

import './index.scss'

const color = ['red', 'green', 'blue']

const Dashboard = () => {
  const barRef = useRef<HTMLDivElement>(null)
  const pieRef = useRef<HTMLDivElement>(null)
  const basicData = [
    {
      title: '用户',
      count: 4
    },
    {
      title: '课程',
      count: 6
    },
    {
      title: '帖子',
      count: 100
    }
  ]

  useEffect(() => {
    const pieChart = echarts.init(pieRef.current!)
    const barChart = echarts.init(barRef.current!)
    barChart.setOption({
      tooltip: {},
      xAxis: {
        data: ['pizza', '新教室', 'test', 'course']
      },
      yAxis: {},
      series: [
        {
          name: '帖子数',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    })
    pieChart.setOption({
      title: {
        text: '标签',
        left: 'center',
        top: 'center'
      },
      series: [
        {
          type: 'pie',
          data: [
            {
              value: 335,
              name: 'A'
            },
            {
              value: 234,
              name: 'B'
            },
            {
              value: 1548,
              name: 'C'
            }
          ],
          radius: ['40%', '70%']
        }
      ]
    })
  }, [])
  return (
    <div className="dashboard">
      <section>
        <header>基础统计</header>
        <div className="basic-statistic">
          {basicData.map((item, index) => (
            <div
              key={item.title + item.count}
              className={`statistic-item statistic-item-${color[index]}`}
            >
              <div className="statistic-item-title">{item.title}</div>
              <div className="statistic-item-count">{item.count}</div>
            </div>
          ))}
        </div>
      </section>
      <section>
        <header>其他统计</header>
        <div className="basic-chart">
          <div className="chart-item">
            <div className="chart-item-title">课程帖子</div>
            <div className="chart-item-content" ref={barRef} />
          </div>
          <div className="chart-item">
            <div className="chart-item-title">标签</div>
            <div className="chart-item-content" ref={pieRef} />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard
