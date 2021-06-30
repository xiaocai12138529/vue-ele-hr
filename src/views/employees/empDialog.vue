<template>
  <!-- 表单 -->
  <el-form ref="formDate" label-width="120px" :model="form" :rules="rules">
    <el-form-item label="姓名" prop="username">
      <el-input v-model="form.username" style="width:50%" placeholder="请输入姓名" />
    </el-form-item>
    <el-form-item label="手机" prop="mobile">
      <el-input v-model="form.mobile" style="width:50%" placeholder="请输入手机号" />
    </el-form-item>
    <el-form-item label="入职时间" prop="timeOfEntry">
      <el-date-picker v-model="form.timeOfEntry" style="width:50%" placeholder="请选择入职时间" />
    </el-form-item>
    <el-form-item label="聘用形式" prop="formOfEmployment">
      <el-select v-model="form.formOfEmployment" style="width:50%" placeholder="请选择">
        <el-option
          v-for="item in hireType"
          :key="item.id"
          :value="item.id"
          :label="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="工号" prop="workNumber">
      <el-input v-model="form.workNumber" style="width:50%" placeholder="请输入工号" />
    </el-form-item>
    <el-form-item label="部门" prop="departmentName">
      <el-input v-model="form.departmentName" style="width:50%" placeholder="请选择部门" @focus="hFocus" />
      <el-tree
        v-show="showTree"
        style="width:50%"
        :data="department"
        :props="defaultProps"
        @node-click="nodeClick"
      />
      <!-- </el-input> -->
    </el-form-item>
    <el-form-item label="转正时间" prop="correctionTime">
      <el-date-picker v-model="form.correctionTime" style="width:50%" placeholder="请选择转正时间" />
    </el-form-item>
    <el-form-item>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="addEmployee('formDate')">确定</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
/**
 *  username	        string	非必须		姓名
    mobile	          string	非必须		手机号
    formOfEmployment	number	非必须		聘用形式
    workNumber	      string	非必须		工号
    departmentName	  string	非必须		组织名称
    timeOfEntry	      string	非必须		入职时间
    correctionTime	  string	非必须		转正时间
 */
// 聘用形式
import { getDepartments } from '@/api/department'
import { addEmployee } from '@/api/employees'
import tree from '@/utils/tree'
import types from '@/constant/employees'
const hireType = types.hireType
// const obj = types.hireType.reduce((t, v) => ({ ...t, [v.id]: v.value }), {})
export default {
  name: 'EmpDialog',
  data() {
    return {
      showTree: false,
      department: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      form: {
        username: '123',
        mobile: '15510847465',
        formOfEmployment: '',
        workNumber: '666',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 4, message: '用户姓名为1-4位', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: 'blur' }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: 'change' }
        ],
        timeOfEntry: [
          { required: true, message: '请选择入职时间', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    hireType: () => {
      return hireType
    }
  },
  created() {
  },
  methods: {
    async loadDepartment() {
      try {
        const res = await getDepartments()
        res.data.depts.shift()
        this.department = tree(res.data.depts)
        this.showTree = true
      } catch (err) {
        console.log(err)
      }
    },
    async doAdd() {
      try {
        const res = await addEmployee(this.form)
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    },
    // 添加
    addEmployee(formDate) {
      this.$refs[formDate].validate((valid) => {
        if (valid) {
          this.doAdd()
          this.$emit('update-employee')
          this.$emit('close-dialog')
          this.$message.success('添加成功')
        } else {
          return false
        }
      })
    },
    // 取消事件
    close() {
      this.$emit('close-dialog')
    },
    // 用户在tree中点击了某个节点
    nodeClick(department, data) {
      if (!department.children.length) {
        this.form.departmentName = department.name
      }
      this.showTree = false
    },
    hFocus() {
      this.loadDepartment()
    },
    resetForm() {
      this.$refs.formDate.resetFields()
    }
  }
}
</script>
