<template>
  <div class="department-container">
    <div class="app-container">
      <el-card>
        <!-- 具体页面结构 -->
        员工
        <PageTool>
          <template #left>总记录20条</template>
          <template #right>
            <el-button>导入excel</el-button>
          </template>

        </PageTool>
      </el-card>
    </div>
  </div>
</template>

<script>
import PageTool from '@/components/PageTool'
export default {
  components: {
    PageTool
  },
  data() {
    return {

    }
  }
}
</script>
