import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input } from '@tarojs/components'
import './filter-header.less'
import { connect } from '@tarojs/redux'
import { 
  getSearchAsyncStockList,
  saveSearchStockList
} from '../../actions/home'

@connect(({ home }) => ({ 
  home
}), (dispatch) => ({
  getSearchStockList(keyword) {
    dispatch(getSearchAsyncStockList(keyword))
  },
  saveSearchStockList(list) {
    dispatch(saveSearchStockList(list))
  }
}))
export default class FilterHeader extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showPanel: true
    }
  }

  handleSearchTextChange(e) {
    const keyword = e.target.value
    this.props.getSearchStockList(keyword)
    this.setState({
      showPanel: true
    })
  }

  handleChoiceStock(stock) {
    Taro.navigateTo({
      url: `/pages/stock-detail/index?zqdm=${stock.zqdm}&zqjc=${stock.zqjc}`
    }).then(() => {
      this.setState({
        showPanel: false,
        keyword: ''
      })
      this.props.saveSearchStockList([])
    })
  }

  handleFilter() {
    const pages = Taro.getCurrentPages()
    if (pages.length > 1) {
      Taro.navigateBack({ url: '/pages/home/index' })
    }
  }

  handleAvatar() {
    Taro.navigateTo({
      url: '/pages/stock-choice/index'
    })
  }

  renderAvatar() {
    return (
      <View className="user-avatar-wrap">
        <View className="user-avatar" onClick={this.handleAvatar}>
          <open-data type="userAvatarUrl"></open-data> 
        </View>
      </View>
    )
  }

  renderBody() {
    const { keyword } = this.state
    return (
      <View className="search-body">
        <Input onInput={this.handleSearchTextChange} value={keyword} className="searcher" type="text" placeholder="请输入" />
      </View>
    )
  }

  renderFilter() {
    return (
      <View className="filt-sizer-wrap">
        <View onClick={this.handleFilter} className="filt-sizer">选股器</View>
      </View>
    )
  }

  renderFilterResult() {
    // 在类组件中，有以render开头的组件，使用到props中的属性，需要先将属性结构出来，在使用该属性，否则可能无效（坑啊）
    const { home } = this.props
    const { showPanel } = this.state
    let contents = null
    if (showPanel && home.searchStockList && home.searchStockList.length) {
      contents = home.searchStockList.map(stock => {
        return <View onClick={this.handleChoiceStock.bind(this, stock)} className="search-item" key={stock.zqdm}>
          <Text>{stock.zqjc}</Text><Text>({stock.zqdm})</Text>
        </View>
      })
    }
    return (
      <View className="filter-res-wrap">
        {contents}
      </View>
    )
  }

  render() {
    return (
      <View className="filter-header-wrap">
        <View className="filter-header-bg">
          {this.renderAvatar()}
          {this.renderBody()}
          {this.renderFilter()}
        </View>
        {this.renderFilterResult()}
      </View>
    )
  }
}