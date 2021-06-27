<template>
  <div class="department-container">
    <div class="app-container">
      <el-card>
        <!-- 具体页面结构 -->
        <el-tabs v-model="activeName">
          <!-- tabs 标签栏 -->
          <el-tab-pane label="用户管理" name="first">
            <!-- 添加按钮 -->
            <el-button type="primary">+添加角色</el-button>
            <!-- 表格 -->
            <el-table :data="roles">
              <el-table-column
                label="序号"
                width="120"
              >
                <template slot-scope="scope">
                  {{ (pageParams.page - 1) }}
                </template>
              </el-table-column>
              <el-table-column label="角色名称" width="240" prop="name" />
              <el-table-column label="描述" prop="description" />
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary">编辑</el-button>
                  <el-button size="small" type="danger" @click="delRole(scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>

            <el-row type="flex" justify="center" align="middle" style="height: 60px">
              <el-pagination
                layout="prev, pager, next"
                :total="total"
                :page-size="pageParams.pagesize"
                @current-change="hCurrentChange"
              />
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>
<script>
import { getRoles, delRole } from '@/api/setting'
export default {
  data() {
    return {
      activeName: 'first',
      roles: [],
      pageParams: {
        page: 1,
        pagesize: 2
      },
      total: 0
    }
  },
  created() {
    this.loadRoles()
  },
  methods: {
    // 查询数据
    async loadRoles() {
      try {
        const res = await getRoles(this.pageParams)
        console.log(res)
        this.roles = res.data.rows
        this.total = res.data.total
      } catch (err) {
        console.log(err)
      }
    },
    // 点击页码事件
    hCurrentChange(curPage) {
      this.pageParams.page = curPage
      this.loadRoles()
    },
    // 删除按钮事件
    async delRole(id) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.doDel(id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 删除选项
    async doDel(id) {
      try {
        await delRole(id)
        this.roles.length === 1 && this.pageParams.page !== 1 ? this.pageParams.page-- : ''
        this.loadRoles()
      } catch (err) {
        this.$message('删除失败')
      }
    }
  }
}
</script>
