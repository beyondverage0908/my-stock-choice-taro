import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import withShare from '@utils/withShare';
import './index.less'
import MyStockChoice from '../../components/stock-choice/my-stock-choice'

@withShare({
  title: '首个小程序的选股平台！', 
})
export default class Index extends Component {
  config = {
    navigationBarTitleText: '我的自选'
  }

  constructor(props) {
    super(props)
  }

  componentWillMount() { 
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View>
        <MyStockChoice />
      </View>
    )
  }
}