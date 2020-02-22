const condition = {
    // 基本面
    jbm: {
        title: '基本面',
        multiple: true,
        list: [
            {
                label: '高性价比',
                value: 'iMagic'
            },
            {
                label: '高成长',
                value: 'iG'
            },
            {
                label: '高价值',
                value: 'iROE'
            },
            {
                label: '高分红',
                value: 'iCashing'
            },
            {
                label: '机构评级高',
                value: 'iRating'
            }
        ]
    },
    // 技术面
    jsm: {
        title: '技术面',
        multiple: true,
        list: [
            {
                label: '均线多头',
                value: 'iMA7'
            },
            {
                label: '均线粘合',
                value: 'iMA0'
            },
            {
                label: '底部区域',
                value: 'iLow'
            }
        ]
    },
    // 资金面
    zjm: {
        title: '资金面',
        multiple: true,
        list: [
            {
                label: '明显放量',
                value: 'iAmt'
            },
            {
                label: '热点板块',
                value: 'iHot'
            },
            {
                label: '逆市上涨',
                value: 'iAgainst'
            }
        ]
    },
    // 位置
    wz: {
        title: '位置',
        multiple: false,
        list: [
            {
                label: '强于大盘',
                value: 1
            },
            {
                label: '同步大盘',
                value: 2
            },
            {
                label: '弱于大盘',
                value: 3
            }
        ]
    },
    // 市值
    sz: {
        title: '市值',
        multiple: false,
        list: [
            {
                label: '十亿级',
                value: 1
            },
            {
                label: '百亿级',
                value: 2
            },
            {
                label: '千亿以上',
                value: 3
            }
        ]
    },
    // 上市
    ss: {
        title: '上市',
        multiple: false,
        list: [
            {
                label: '一年内',
                value: 1
            },
            {
                label: '三年内',
                value: 2
            },
            {
                label: '三年以上',
                value: 3
            }
        ]
    },
    // 行业
    hy: {
        title: '行业',
        multiple: true,
        list: [
            {
                label: '可选消费',
                value: '882004.WI'
            },
            {
                label: '日常消费',
                value: '882005.WI'
            },
            {
                label: '医疗保健',
                value: '882006.WI'
            },
            {
                label: '金融',
                value: '882007.WI'
            },
            {
                label: '信息技术',
                value: '882008.WI'
            },
            {
                label: '电信服务',
                value: '882009.WI'
            },
            {
                label: '公用事业',
                value: '882010.WI'
            },
            {
                label: '能源',
                value: '882001.WI'
            }, 
            {
                label: '房地产',
                value: '882011.WI'
            }, 
            {
                label: '材料',
                value: '882002.WI'
            },
            {
                label: '工业',
                value: '882003.WI'
            }
        ]
    },
}
export default condition