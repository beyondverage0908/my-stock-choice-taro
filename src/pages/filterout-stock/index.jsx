import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { getFilterStocks } from "@api/filter-stock"
import { addToStocks } from "@api/home"
import toast from '@utils/toast'
import './index.less'

@connect(({ home }) => ({
  home
}))
class FilterOutStock extends Component {
  config = {
    navigationBarTitleText: '灵芝选股'
  }
  constructor(props) {
    super(props)
    this.state = {
      tableHeadLabelList: [
        { label: '序号', key: 'index' },
        { label: '股票代码', key: 'windCode' },
        { label: '股票简称', key: 'zqjc' },
        { label: '最新价', key: 'closePrice' },
        { label: '总市值', key: 'asset' },
        { label: '加入自选', key: 'isAdded' }
      ],
      tableData: []
    }
  }
  componentDidMount() {
    this.getFilterStocks()
  }
  async getFilterStocks() {
    const { home } = this.props
    const query = home.filterQuery
    query.pageNum = 1
    query.pageSize = 100
    try {
      const { data } = await getFilterStocks(query)
      if (data.success) {
        this.setState({
          tableData: data.data || []
        })
      } else {
        toast.tip(data.message)
      }
    } catch (error) {
      toast.tip('网络异常请重试')
    }
  }
  async handleChoiceStock(info) {
    try {
      const { data } = await addToStocks({ zqdm: info.windCode, zqjc: info.zqjc })
      if (data.success) {
        toast.tip('添加自选股成功')
        const { tableData } = this.state
        const findex = tableData.findIndex(stock => stock.windCode === info.windCode)
        const f = tableData.find(stock => stock.windCode === info.windCode)
        f.isAdded = true
        tableData.splice(findex, 1, f)
        this.setState({
          tableData
        })
      } else {
        toast.tip(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.tip('网络异常，请重试')
    }
  }
  getTableTd(tr, td, tridx, tdidx, tableHeadLabelList) {
    let content = null
    if (tdidx === 0) {
      content = <Text>{tridx + 1}</Text>
    } else if (tr[td.key] === false && tdidx === tableHeadLabelList.length - 1) {
      content = <Text className="opt" onClick={this.handleChoiceStock.bind(this, tr)}>自选</Text>
    } else if (tr[td.key] === true && tdidx === tableHeadLabelList.length - 1) {
      content = <Text>已自选</Text>
    } else {
      content = <Text>{tr[td.key]}</Text>
    }
    return content
  }
  render() {
    const { home } = this.props
    const { tableHeadLabelList, tableData } = this.state

    return (
      <View>
        {
          tableData.length > 0
          &&
          <View className="stock-table-rating">
            <View className="table">
              <View className="tr">
                {tableHeadLabelList.map((head, index) => {
                  return <View key={head.key} className={`th ${index === 0 ? 'border-left' : ''}`}>{head.label}</View>
                })}
              </View>
              {tableData.length > 0 && tableData.map((tr, tridx) => {
                return (
                  <View className="tr" key={tr.windCode}>
                    {
                      tableHeadLabelList.map((item, idx) => {
                        return (
                          <View 
                            className={`td ${idx === 0 ? 'border-left' : ''} ${tridx === tableData.length - 1 ? 'border-bottom' : ''}`} 
                            key={item.label}>
                            { this.getTableTd(tr, item, tridx, idx, tableHeadLabelList) }
                          </View>
                        )
                      })
                    }
                  </View>
                )
              })}
            </View>
          </View>
        }
      </View>
    )
  }
}