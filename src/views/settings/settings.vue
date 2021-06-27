<template>
  <div class="department-container">
    <div class="app-container">
      <el-card>
        <!-- 具体页面结构 -->
        <el-tabs v-model="activeName">
          <!-- tabs 标签栏 -->
          <el-tab-pane label="用户管理" name="first">
            <!-- 添加按钮 -->
            <el-button type="primary" @click="addRoulll">+添加角色</el-button>
            <!-- 表格 -->
            <el-table :data="roles">
              <el-table-column
                label="序号"
                width="120"
                type="index"
                :index="indexMethod"
              />
              <el-table-column label="角色名称" width="240" prop="name" />
              <el-table-column label="描述" prop="description" />
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary" @click="hUpdRole(scope.row)">编辑</el-button>
                  <el-button size="small" type="danger" @click="delRole(scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>

            <el-row type="flex" justify="center" align="middle" style="height: 60px">
              <el-pagination
                background
                layout="prev, pager, next"
                :current-page.sync="page"
                :total="total"
                :page-size="pageParams.pagesize"
                @current-change="hCurrentChange"
              />
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <!-- 弹层 -->
    <el-dialog
      width="30%"
      :visible.sync="showDialog"
      :title="isEdit ? '修改角色' : '新增角色'"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form
        ref="addForm"
        :model="form"
        label-width="80px"
      >
        <el-form-item label="角色名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="form.description" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="hSubmit">确认</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { getRoles, delRole, addRole, updRole } from '@/api/setting'
export default {
  name: 'Setting',
  data() {
    return {
      isEdit: false,
      activeName: 'first',
      roles: [],
      page: 1,
      pageParams: {
        page: 1,
        pagesize: 2
      },
      total: 0,
      form: { name: '', description: '' },
      showDialog: false
    }
  },
  computed: {
    // 是不是最后一条
    isLastPage: function() {
      const sum = Math.ceil(this.total / this.pageParams.pagesize)
      return this.pageParams.page === sum
    },
    maxNum: function() {
      return Math.ceil(this.total / this.pageParams.pagesize)
    },
    // 数据是不是满的
    isLastPageFulled: function() {
      return (this.total % this.pageParams.pagesize) === 0
    }
  },

  created() {
    this.loadRoles()
  },
  methods: {
    addRoulll() {
      this.isEdit = false
      this.showDialog = true
    },
    // 修改数据
    hUpdRole(row) {
      this.isEdit = true
      this.showDialog = true
      this.form = { ...row }
    },
    // 修改角色
    async doUpd() {
      try {
        const res = await updRole(this.form)
        console.log(res.data)
        this.showDialog = false
        this.$message.success('修改成功')
        this.loadRoles()
      } catch (err) {
        console.log(err)
      }
    },
    // 添加角色
    async doAdd() {
      try {
        const res = await addRole(this.form)
        console.log(res.data)
        this.showDialog = false
        this.$message.success('添加成功')
        // 向上取整
        if (this.isLastPageFulled) {
          this.pageParams.page = this.maxNum + 1
        } else {
          this.pageParams.page = this.maxNum
        }
        this.loadRoles()
      } catch (err) {
        console.log(err)
        this.$message('添加失败')
      }
    },
    // 增加 / 修改 角色事件
    hSubmit() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.isEdit ? this.doUpd() : this.doAdd()
        }
      })
    },
    // 查询数据
    async loadRoles() {
      try {
        const res = await getRoles(this.pageParams)
        console.log(res)
        this.roles = res.data.rows
        this.total = res.data.total
        this.page = this.pageParams.page
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
    },
    // 序号计算
    indexMethod(index) {
      return (this.pageParams.page - 1) * 2 + index + 1
    }
  }
}
</script>
