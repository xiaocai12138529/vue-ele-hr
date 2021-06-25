<template>
  <div>
    <el-form ref="deptForm" label-width="120px">
      <el-form-item label="部门名称">
        <el-input v-model="form.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码">
        <el-input v-model="form.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人">
        <el-select v-model="form.manager" style="width:80%" placeholder="请选择">
          <el-option v-for="item in list" :key="item.id" :value="item.username" :label="item.username" />
          <!-- <el-option value="2" label="大美丽" /> -->
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍">
        <el-input v-model="form.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="hSubmit">确定</el-button>
        <el-button size="small" @click="hCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getEmployeeSimple, addDpartment, getDpartment, updDpartment } from '@/api/employees.js'
export default ({
  props: {
    id: {
      type: String,
      default: ''
    },
    iseide: {
      type: Boolean,
      defaults: false
    }
  },
  data() {
    return {
      form: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      list: []
    }
  },
  watch: {
    // 监听id变化来重新渲染数据
    id() {
      this.get()
    }
  },
  created() {
    this.loadGet()
    if (this.iseide) {
      this.get()
    }
  },
  methods: {
    // 渲染数据
    async get() {
      const res = await getDpartment(this.id)
      console.log(res.data)
      this.form = { ...res.data }
      console.log(this.form)
    },
    // 修改部门
    async upd() {
      const res = await updDpartment(this.id)
      console.log(res)
      this.$emit('dialong-false')
      this.$message({ message: res.message, type: 'success' })
    },
    async add() {
      // 1.封装添加api
      // 2. 按钮点击之后, 发送ajax请求
      // 3. 关闭弹层
      // 4.tree中的数据要更新
      try {
        const params = { ...this.form, pid: this.id }
        const res = await addDpartment(params)
        console.log(res)
        this.$emit('dialong-false')
        this.$message({ message: res.message, type: 'success' })
        this.form = { name: '', code: '', manager: '', introduce: '' }
      } catch (err) {
        console.log(err)
      }
    },
    // 添加部门
    async hSubmit() {
      this.iseide ? this.upd() : this.add()
    },
    hCancel() {
      console.log(123)
      this.$emit('dialong-false')
      this.form = { name: '', code: '', manager: '', introduce: '' }
    },
    // 获取负责人
    async loadGet() {
      try {
        const res = await getEmployeeSimple()
        console.log(res)
        this.list = res.data
      } catch (err) {
        console.log(err)
      }
    }
  }
})
</script>
