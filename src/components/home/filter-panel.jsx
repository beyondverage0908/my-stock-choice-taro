import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import condition from './condition'
import FilterItem from './filter-item'
import FilterCount from './filter-count'
import { getFilterStockCount } from '@api/filter-stock'
import { connect } from '@tarojs/redux'
import './filter-panel.less'
import { changeFilterQuery } from '../../actions/home'

@connect(({ home }) => ({
  home
}), dispatch => ({
  changeQuery(query) {
    dispatch(changeFilterQuery(query))
  }
}))
class FilterPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
    this.tempQuery = {}
  }

  getQuery() {
    const arrMap = {
      wz: 'againstGroups',
      sz: 'assets',
      ss: 'years',
      hy: 'indexCodes'
    }
    const query = {}
    // jbm jsm zjm
    for (const key in this.tempQuery) {
      if (this.tempQuery.hasOwnProperty(key)) {
        const value = this.tempQuery[key];
        if (Array.isArray(value)) {
          query[arrMap[key]] = value.join(',')
        } else {
          for (const k in value) {
            if (value.hasOwnProperty(k)) {
              query[k] = value[k]
            }
          }
        }
      }
    }
    return query
  }
  async getFilterInfo() {
    const query = this.getQuery()
    try {
      const { data } = await getFilterStockCount(query)
      if (data.success) {
        this.setState({ count: data.data })
        // 设置到store中
        this.props.changeQuery(query)
      } else {
        Taro.showToast({
          title: data.message,
          duration: 2000,
          icon: 'none'
        })
      } 
    } catch (error) {
      console.log(error)
    }
  }

  dealJbm(pickList = []) {
    const map = {
      iG: 'g',
      iMagic: 'magic',
      iROE: 'roe',
      iCashing: 'cashing',
      iRating: 'rating'
    }
    const jbmQueryList = pickList.map(p => map[p.value])
    const query = {}
    jbmQueryList.forEach(code => {
      query[code] = 1
    })
    this.tempQuery['jbm'] = query
    this.getFilterInfo()
  }
  dealJsm(pickList) {
    const map = {
      iMA7: 'ma7',
      iMA0: 'ma0',
      iLow: 'low'
    }
    const jsmQueryList = pickList.map(p => map[p.value])
    const query = {}
    jsmQueryList.forEach(code => {
      query[code] = 1
    })
    this.tempQuery['jsm'] = query
    this.getFilterInfo()
  }
  dealZjm(pickList) {
    const map = {
      iAmt: 'amt',
      iHot: 'hot',
      iAgainst: 'against'
    }
    const zjmQueryList = pickList.map(p => map[p.value])
    const query = {}
    zjmQueryList.forEach(code => {
      query[code] = 1
    })
    this.tempQuery['zjm'] = query
    this.getFilterInfo()
  }
  dealWz(pickList) {
    this.tempQuery['wz'] = pickList.map(p => p.value)
    this.getFilterInfo()
  }
  dealSz(pickList) {
    // 市值
    this.tempQuery['sz'] = pickList.map(p => p.value)
    this.getFilterInfo()
  }
  dealSs(pickList) {
    // 上市
    this.tempQuery['ss'] = pickList.map(p => p.value)
    this.getFilterInfo()
  }
  dealHy(pickList) {
    // 行业
    this.tempQuery['hy'] = pickList.map(p => p.value)
    this.getFilterInfo()
  }
  handleFilterItem(type, filterList) {
    switch (type) {
      case 'jbm':
        this.dealJbm(filterList)
        break;
      case 'jsm':
        this.dealJsm(filterList)
        break;
      case 'zjm':
        this.dealZjm(filterList)
        break;
      case 'wz':
        this.dealWz(filterList)
        break;
      case 'sz':
        this.dealSz(filterList)
        break;
      case 'ss':
        this.dealSs(filterList)
        break;
      case 'hy':
        this.dealHy(filterList)
        break;
    }
  }

  render() {
    return (
      <View>
        <View className="filter-panel">
          {Object.keys(condition).map(key => {
            return (
              <FilterItem
                key={key}
                title={condition[key].title}
                type={key}
                multiple={condition[key].multiple}
                dataSource={condition[key].list}
                dealFilterItem={this.handleFilterItem.bind(this)}></FilterItem>
            )
          })}
        </View>
        <FilterCount count={this.state.count}/>
      </View>
    )
  }
}

export default FilterPanel