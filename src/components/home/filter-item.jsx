import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import PropTypes from 'prop-types'

import './filter-item.less'

class FilterItem extends Component {
  constructor(props) {
    super(props)
    this.pickList = []
    this.state = {
      filterData: []
    }
    this.dealDataSource(props.dataSource)
  }

  static defaultProps = {
    multiple: false,
    type: ''
  }

  dealDataSource(dataSourceList) {
    if (dataSourceList && dataSourceList.length > 0) {
      let m = 3
      let multiple = Math.floor(dataSourceList.length / m)
      const moore = dataSourceList.length % m
      if (moore > 0) {
          multiple += 1
      }
      const tList = []
      for (let i = 0; i < multiple; i++) {
          const nList = dataSourceList.slice(i * m, i * m + m)
          if (nList.length < m) {
              for (let j = 0; j < m - nList.length; j++) {
                  nList.push({})
              }
          } 
          tList.push(nList)
      }
      this.setState({
        filterData: tList
      })
    }
  }
  handleStockPick(item) {
    if (this.props.multiple) {
      if (item.pick) {
        item.pick = false
        const fIndex = this.pickList.findIndex(f => f.value === item.value)
        if (fIndex > -1) {
          this.pickList.splice(fIndex, 1)
        }
      } else {
        item.pick = true
        this.pickList.push(item)
      }
      const { filterData } = this.state
      filterData.forEach(arr => {
        const findex = arr.findIndex(f => f.value === item.value)
        if (findex > -1) {
          arr.splice(findex, 1, item)
        }
      })
      this.setState({
        filterData: filterData
      })
    } else {
      if (item.pick) {
        item.pick = false
        const fIndex = this.pickList.findIndex(f => f.value === item.value)
        if (fIndex > -1) {
          this.pickList.splice(fIndex, 1)
        }
      } else {
        item.pick = true
        this.pickList = [item]
      }
      const { filterData } = this.state
      filterData.forEach(arr => {
        // 把所有的选中改为非选中状态
        arr.forEach(a => {
          if (a.pick) {
            a.pick = false
          }
        })
        const findex = arr.findIndex(f => f.value === item.value)
        if (findex > -1) {
          arr.splice(findex, 1, item)
        }
      })
      this.setState({
        filterData: filterData
      })
    }
    if (this.props.dealFilterItem) {
      this.props.dealFilterItem(this.props.type, this.pickList)
    }
  }

  render() {
    return (
      <View className="filter-item-wrap">
        <View className="title">{this.props.title}</View>
        {this.state.filterData.map((arr, index) => {
          return (
            <View className="stock-group" key={index}>
              {arr.map(data => {
                return (
                  <Text 
                    onClick={this.handleStockPick.bind(this, data)}
                    className={`stock ${!data.value ? 'stock-blank' : ''} ${data.pick ? 'stock-select' : ''}`} 
                    key={data.value}>{data.label}</Text>
                )
              })}
            </View>
          )
        })}
      </View>
    )
  }
}

FilterItem.propTypes = {
  dealFilterItem: PropTypes.func.isRequired
} 

export default FilterItem