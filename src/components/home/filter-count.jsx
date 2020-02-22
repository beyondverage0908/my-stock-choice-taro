import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './filter-count.less'

export default class FilterCount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: ''
    }
    this.dealCountMessage(props.count)
  }
  componentWillReceiveProps(nextProps) {
    this.dealCountMessage(nextProps.count)
  }
  dealCountMessage(count) {
    let message = ''
    if (count <= 0 || !count) {
      message = `暂无符合条件的股票，请筛选`
    } else if (count > 100) {
      message = `超过${100}支，请继续添加条件`
    } else {
      message = `查看满足条件的${count}支股票`
    }
    this.setState({
      message: message
    })
  }
  handleFilterOutStock() {
    const { count } = this.props
    if (count && count < 100) {
      Taro.navigateTo({
        url: '/pages/filterout-stock/index'
      })
    }
  }
  render() {
    const { count } = this.props
    return (
      <View className="count-wrap">
        <View onClick={this.handleFilterOutStock} className={`count ${(!count || count > 100) ? 'not-fit' : ''}`}>{this.state.message}</View>
      </View>
    )
  }
}