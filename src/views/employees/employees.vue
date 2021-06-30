<template>
  <div class="employees-container">
    <div class="app-container">
      <PageTool>
        <template #left>
          <span>总记录数: {{ total }} 条</span>
        </template>
        <template #right>
          <el-button type="warning" size="small">excel导入</el-button>
          <el-button type="danger" size="small">excel导出</el-button>
          <el-button type="primary" size="small" @click="hAdd()">新增员工</el-button>
        </template>
      </PageTool>

      <el-card style="margin-top: 10px;">
        <el-table border :data="employee" :default-sort="{prop: 'workNumber'}">
          <el-table-column label="序号" type="index" :index="indexMethod" />
          <el-table-column label="姓名" prop="username" />
          <el-table-column label="工号" sortable prop="workNumber" />
          <el-table-column label="聘用形式" prop="formOfEmployment">
            <template slot-scope="scope">
              {{ formOfEmployment(scope.row.formOfEmployment) }}
            </template>
          </el-table-column>
          <el-table-column label="部门" prop="departmentName" />
          <el-table-column label="入职时间" sortable prop="timeOfEntry" />
          <!-- <el-table-column label="账户状态" prop="" /> -->
          <el-table-column label="操作" width="280">
            <template slot-scope="{ row }">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">分配角色</el-button>
              <el-button type="text" size="small" @click="hDel(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <el-pagination
            layout="jumper, prev, pager, next, total, sizes"
            :page-sizes="[2,, 4 ,5, 8, 10]"
            :total="total"
            :page-size=" pageParams.size"
            @current-change="hCurrentChange"
            @size-change="hSizeChange"
          />
        </el-row>
      </el-card>
    </div>
    <!-- 弹窗组件 -->
    <el-dialog
      title="添加"
      :visible.sync="showDialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <empDialog @close-dialog="closeDialog" />
    </el-dialog>
  </div>
</template>

<script>
import { getEmployee, delEmployee } from '@/api/employees'
import empDialog from './empDialog.vue'
import types from '@/constant/employees'
const obj = types.hireType.reduce((t, v) => ({ ...t, [v.id]: v.value }), {})

export default {
  components: {
    empDialog
  },
  data() {
    return {
      pageParams: { page: 1, size: 5 },
      employee: [],
      total: 0,
      showDialog: false
    }
  },
  created() {
    this.loadEmployee()
  },
  methods: {
    // 关闭弹窗
    closeDialog() {
      this.showDialog = false
    },
    // 新增员工
    async hAdd() {
      try {
        this.showDialog = true
        // const res = await add()
      } catch (err) {
        console.log(err)
      }
    },
    // 删除
    async doDel(id) {
      try {
        await delEmployee(id)
        this.$message.success('删除成功')
        this.loadEmployee()
        if (this.employee.length === 1) {
          this.page = Math.max(--this.pageParams.page, 1)
        }
      } catch (err) {
        console.log(err)
        this.$message.error(err.message)
      }
    },
    hDel(id) {
      console.log(id)
      this.$confirm('确认删除吗').then(() => {
        this.doDel(id)
      })
    },
    // formOfEmployment
    formOfEmployment(row) {
      return obj[row]
      // const item = types.hireType.find(item => item.id === row)
      // if (item) {
      //   return item.value
      // } else {
      //   return '不能确定'
      // }
    },
    // 获取数据
    async loadEmployee() {
      try {
        const res = await getEmployee(this.pageParams)
        this.employee = res.data.rows
        this.total = res.data.total
      } catch (err) {
        console.log(err)
      }
    },
    // 分页点击事件
    hCurrentChange(page) {
      this.pageParams.page = page
      this.loadEmployee()
    },
    hSizeChange(size) {
      this.pageParams.size = size
      this.loadEmployee()
    },
    // 自增序号
    indexMethod(index) {
      return (this.pageParams.page - 1) * this.pageParams.size + index + 1
    }
  }
}
</script>
