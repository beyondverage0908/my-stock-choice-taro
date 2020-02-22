import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View } from '@tarojs/components'
import withShare from '@utils/withShare';
import './index.less'
import FilterHeader from '../../components/common/filter-header'
import FilterPanel from '../../components/home/filter-panel'
import { 
  changeSessionId, 
  changeSystemVisitCount,
  changeSystemLoginCode
} from '../../actions/system'
import { sysVisit, login } from '@api/sys'

@withShare({
  title: '首个小程序的选股平台！', 
})
@connect(( { system }) => ({
  system
}), (dispatch) => {
  return {
    changeSessionId(sessionId) {
      dispatch(changeSessionId(sessionId))
    },
    changeSystemVisitCount(count) {
      dispatch(changeSystemVisitCount(count))
    },
    changeSystemLoginCode(code) {
      dispatch(changeSystemLoginCode(code))
    }
  }
})
export default class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  }

  constructor(props) {
    super(props)
  }

  componentWillMount() { }

  componentDidMount () { 
    this.wechatLogin()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  async visitSystem(stockCode) {
    try {
      const { data } = await sysVisit(stockCode || '000001.SH')
      if (data.success) {
        this.props.changeSystemVisitCount(data.data.pv)
      } 
    } catch (error) {
      console.log(error)
    }
  }

  async wechatLogin() {
    const res = await Taro.login()
    if (res.errMsg === 'login:ok') {
      this.props.changeSystemLoginCode(res.code)
      const { data } = await login(res.code)
      if (data.success) {
        this.props.changeSessionId(data.data.sessionId || '')
        this.visitSystem('000001.SH')
      } else {
        Taro.showToast({ title: data.message, icon: 'none' })
      }
    } else {
      Taro.showToast({ title: '登录失败，请重启小程序后再试', icon: 'none' })
    }
  }

  render () {
    return (
      <View className='index'>
        <FilterHeader />
        <FilterPanel />
      </View>
    )
  }
}