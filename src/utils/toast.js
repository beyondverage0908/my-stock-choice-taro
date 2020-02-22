import Taro from '@tarojs/taro';

function tip(title, duration = 1000) {
  Taro.showToast({
    icon: 'none',
    title,
    duration: duration
  });
}

const toast = {
  tip
};

export default toast;
