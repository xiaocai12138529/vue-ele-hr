<template>
  <div>
    <el-form ref="deptForm" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="form.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="form.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="form.manager" style="width:80%" placeholder="请选择">
          <el-option v-for="item in list" :key="item.id" :value="item.username" :label="item.username" />
          <!-- <el-option value="2" label="大美丽" /> -->
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
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
      required: false
    },
    originList: {
      type: Array,
      required: true
    }
  },
  data() {
    // 表单编码验证
    const validateCode = (rule, value, callback) => {
      let bo
      this.iseide
        // 编辑状态
        ? bo = this.originList.filter(item => item.id !== this.id).some(item => item.code === value)
        // 添加状态
        : bo = this.originList.some(item => item.code === value)
      bo ? callback(new Error('编码' + value + '已经存在')) : callback()
    }
    // 表单name校验
    const validateName = (rule, value, callback) => {
      // 添加部门, value 在同级部门中不能重复
      let nameList = this.originList.filter(item => item.pid === this.id).map(item => item.name)
      if (this.iseide) {
        const pid = this.originList.find(item => item.id === this.id).pid
        nameList = this.originList.filter(item => item.pid === pid && item.id !== this.id).map(item => item.name)
      }
      nameList.includes(value)
        ? callback(new Error('名字' + value + '已经被占用了'))
        : callback()
    }
    return {
      rules: {
        name: [
          { required: true, message: '部门名字不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名字在1-50个字符', trigger: 'change' },
          { validator: validateName, trigger: 'change' }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码在1-50个字符', trigger: 'change' },
          { validator: validateCode, trigger: 'change' }
        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '部门描述不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门描述在1-300个字符', trigger: 'change' }
        ]
      },
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
    // id() {
    //   this.get()
    // }
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
      this.$refs.deptForm.validate(valid => {
        if (valid) {
          this.iseide ? this.upd() : this.add()
        } else {
          this.$message.warning('请填入必填项')
          return false
        }
      })
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
