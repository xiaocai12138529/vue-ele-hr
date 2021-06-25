<template>
  <div class="department-container">
    <div class="app-container">
      <el-card>
        <!-- 用一个行列布局 -->
        <el-row
          type="flex"
          justify="space-between"
          align="middle"
          style="height: 40px; width: 100%;"
        >
          <el-col :span="20">
            <svg-icon icon-class="home" /><span>江苏传智播客教育科技股份有限公司</span>
          </el-col>
          <el-col :span="4">
            <el-row
              type="flex"
              justify="end"
            >
              <!-- 两个内容 -->
              <el-col>负责人</el-col>
              <!-- 下拉菜单 element -->
              <el-col>
                <!-- dropdown 是下拉组件 -->
                <el-dropdown>
                  <span>
                    操作<i class="el-icon-arrow-down" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>添加子部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>

        <el-tree
          :data="list"
          default-expand-all
          :expand-on-click-node="isExpandOnClickNode"
        >
          <template slot-scope="{ node, data }">
            <el-row
              type="flex"
              justify="space-between"
              align="middle"
              style="height: 40px; width: 100%;"
            >
              <el-col :span="20">
                <svg-icon icon-class="user" /><span>{{ data.name }}</span>
              </el-col>
              <el-col :span="4">
                <el-row
                  type="flex"
                  justify="end"
                >
                  <!-- 两个内容 -->
                  <el-col>{{ data.manager }}</el-col>
                  <!-- 下拉菜单 element -->
                  <el-col>
                    <!-- dropdown 是下拉组件 -->
                    <el-dropdown>
                      <span>
                        操作<i class="el-icon-arrow-down" />
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="addIdexp(data.id)">添加子部门</el-dropdown-item>
                        <el-dropdown-item @click.native="updId(data.id)">修改子部门</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-tree>
      </el-card>
    </div>

    <!-- 弹层 -->
    <el-dialog
      title="添加或修改子部门"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="showDialog"
    >
      <deptDialong
        :id="carId"
        :iseide="isEide"
        @dialong-false="hEnd"
      />
    </el-dialog>
  </div>
</template>
<script>
import { getDepartments } from '@/api/department.js'
import treeFn from '@/utils/tree'
import deptDialong from './deptDialog.vue'
export default {
  name: 'Department',
  components: { deptDialong },
  data() {
    return {
      isEide: false,
      isExpandOnClickNode: true,
      // 操作的部门编号
      carId: null,
      // 显示弹层
      showDialog: false,
      // 依赖一份树形数据
      list: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  created() {
    this.getDepartment()
  },
  methods: {
    updId(val) {
      this.showDialog = true
      this.isEide = true
      this.carId = val
    },
    // 关闭弹层并刷新数据
    hEnd() {
      this.showDialog = false
      this.getDepartment()
      this.isEide = false
    },
    // 添加部门
    addIdexp(val) {
      this.showDialog = true
      this.carId = val
    },
    async getDepartment() {
      try {
        const res = await getDepartments()
        console.log(res)
        res.data.depts.shift()
        this.list = treeFn(res.data.depts)
      } catch (err) {
        console.log(err)
      }
    },
    handleNodeClick(data) {
      console.log(data)
    }
  }
}
</script>

<style lang="scss">
.el-col-4 {
  flex: auto;
  position: absolute;
  right: 0;
  width: 400px;
}
</style>
