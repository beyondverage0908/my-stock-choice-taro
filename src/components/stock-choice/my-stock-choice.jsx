import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './my-stock-choice.less'
import { getUserStocks, removeFromStocks } from '@api/home';
import toast from '@utils/toast'
import qrcode from '@assets/qrcode.jpeg'

export default class MyStockChoice extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // 0.等待 1.买一 2.买二 3.买三
      buyingLabel: {
        '0': '', // 0等待，显示空白
        '1': '买一',
        '2': '买二',
        '3': '买三'
      },
      // 机构名称 研究员 2019预测 2020预测
      tableHeadLabelList: [
        { label: '序号', key: 'index' },
        { label: '公司名称', key: 'zqjc' },
        { label: '性价比', key: 'value' },
        { label: '买点', key: 'buying' },
        { label: '操作', key: 'opt' }
      ],
      tableData: []
    }
  }

  componentWillMount() { 
    this.getUserChoiceStocks()
  }

  async getUserChoiceStocks() {
    try {
      const { data } = await getUserStocks()
      if (data.success) {
        console.log(data)
        this.setState({
          tableData: data.data
        })
      } else {
        toast.tip(data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async handleRemoveChoiceStock(stock) {
    try {
      const { tableData } = this.state
      const { data } = await removeFromStocks(stock.zqdm)
      if (data.success) {
        const index = tableData.findIndex(item => item.zqdm === stock.zqdm);
        tableData.splice(index, 1);
        this.setState({
          tableData
        })
        toast.tip('删除自选股成功')
      } else {
        toast.tip(data.message)
      } 
    } catch (error) {
      console.log(error)
    }
  }

  tableTd(key, tr, item, tridx) {
    const { buyingLabel } = this.state
    let content = null
    if (key === 'index') {
      content = (<View>{ tridx + 1 }</View>)
    } else if (key === 'buying') {
      content = (<View>{ buyingLabel[tr[item.key]] }</View>)
    } else if (key === 'opt') {
      content = (<View onClick={this.handleRemoveChoiceStock.bind(this, tr)}>取消自选</View>)
    } else if (key === 'value') {
      content = (<View className={ tr[item.key] === 0 ? 'red' : ''}>{tr[item.key]}</View>)
    } else {
      content = (<View>{tr[item.key]}</View>)
    }
    return content
  }
  tableBody() {
    const { tableData, tableHeadLabelList } = this.state
    if (!tableData || !tableData.length) {
      return null
    }
    const body = (
      <View>
        {
          tableData.map((tr, tridx) => (
            <View className="tr" key={tr.zqdm}>
              { tableHeadLabelList.map((item, idx) => (
                <View className={`td ${idx === 0 ? 'border-left' : ''} ${tridx === tableData.length - 1 ? 'border-bottom' : ''}`} key={item.label}>
                  {this.tableTd(item.key, tr, item, tridx)}
                </View>
              )) }
            </View>
          ))
        }
        { (!tableData || !tableData.length) && <View className="no-data">暂无数据</View>}
      </View>
    )
    return body
  }

  renderFocus() {
    const content = (
      <View className="footer">
        <Image className="img-qrcode" src={qrcode} alt />
        <View className="desc">
          <View className="title">
            欢迎扫码关注
            <Text className="fixed">解套宝</Text>公众号
          </View>
          <View className="subtitle">一组股票轮动策略介绍</View>
        </View>
      </View>
    )
    return content
  }

  render() {
    const { tableHeadLabelList } = this.state

    return (
      <View className="stock-table-rating">
        <View className="table">
          <View className="tr">
            {tableHeadLabelList.map((head, index) => (<View className={`th ${index === 0 ? 'border-left' : ''}`} key={head.label}>{head.label}</View>))}
          </View>
          {this.tableBody()}
        </View>
        { this.renderFocus() }
      </View>
    )
  }
}