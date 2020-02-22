import Taro, { Component } from '@tarojs/taro'
import FilterHeader from '../../components/common/filter-header'
import './index.less'
import withShare from '@utils/withShare';
import { View } from '@tarojs/components';

@withShare({
  title: '首个小程序的选股平台！', 
})
export default class StockDetail extends Component {
  config = {
    navigationBarTitleText: '股票详情'
  }
  
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const params = this.$router.params
    this.setState({
      zqdm: params.zqdm,
      zqjc: params.zqjc
    })
  }

  render() {
    return (
      <View>
        <FilterHeader />
        <View className="wait">抱歉，本模块正在内测中，敬请期待...</View>
      </View>
    )
  }
}