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
      @close="closeDia"
    >
      <el-form
        ref="addForm"
        label-width="80px"
        :model="form"
        :rules="rules"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="form.description" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="hSubmit">确认</el-button>
          <el-button @click="showDialog = false">取消</el-button>
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
      // 表单校验
      rules: {
        name: [
          { required: true, message: '输入名不能为空', trigger: 'blur' },
          { min: 1, max: 6, message: '输入最多6个字', trigger: 'change' },
          { min: 1, max: 6, message: '输入最多6个字', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '描述不能为空', trigger: 'blur' }
        ]
      },
      isEdit: false, // 是否是编辑状态
      activeName: 'first', // 默认显示的tabs标签
      roles: [], // 当前页显示的数据
      page: 1, // 分页高亮
      pageParams: { // 查询数据
        page: 1,
        pagesize: 2
      },
      total: 0, // 总条数
      form: { name: '', description: '' }, // 弹层表单
      showDialog: false // 是否显示弹层
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
  // watch: {
  //   showDialog: function() {
  //     this.isEdit ? '' : this.form = { name: '', description: '' }
  //   }
  // },

  created() {
    this.loadRoles()
  },
  methods: {
    closeDia() {
      this.form = { name: '', description: '' }
    },
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
        } else {
          return false
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
