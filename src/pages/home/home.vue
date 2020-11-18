<template>
  <div>
    <div id="main" class="box"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import {mapActions,mapGetters} from "vuex"

export default {
  computed: {
    ...mapGetters({
      list: "cate/list"
    })
  },
  methods: {
    ...mapActions({
      reqList: "cate/reqList"
    })
  },
  watch: {
    list: {
      handler() {
       var myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '商品分类'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
              data: this.list.map(item=>item.catename),
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
               data:this.list.map(item=>item.children?item.children.length:0)
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      },
      deep:true
    }
  },
  mounted() {
    this.reqList()
  }
};
</script>

<style scoped>
.box {
  width: 80vw;
  height: 80vh;
}
</style>