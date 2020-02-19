<template>
  <div class="register">
    <el-form ref="form" :model="form" label-width="80px" :rules="formRules">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" >
        <el-input v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="form.checkPass" autocomplete="off"></el-input>
  </el-form-item>
      <el-form-item label="联系电话" prop="tel">
        <el-input v-model.number="form.tel"></el-input>
      </el-form-item>
       <el-form-item label="所在行业" prop="industry">
        <el-input v-model="form.industry"></el-input>
      </el-form-item>
        <el-form-item label="公司名称" prop="company">
        <el-input v-model="form.company"></el-input>
      </el-form-item>
       <el-row>
      <el-col :span="8">
      <el-form-item label="现居住地" prop="provinces">
        <el-input v-model="form.provinces" placeholder="请填写省" ></el-input>
      </el-form-item>
      </el-col>
       <el-col :span="8">
      <el-form-item  prop="city">
        <el-input v-model="form.city" placeholder="请填写市"></el-input>
      </el-form-item>
       </el-col>
       <el-col :span="8">
      <el-form-item  prop="district">
        <el-input v-model="form.district" placeholder="请填写区/县"></el-input>
      </el-form-item>
       </el-col>
       </el-row>
       <el-form-item label="教育背景" prop="stu_place">
        <el-input v-model="form.stu_place" placeholder="请填写学校所在省"></el-input>
        </el-form-item>
       <el-form-item  prop="school">
        <el-input v-model="form.school" placeholder="请填写学校"></el-input>
        </el-form-item>
        <el-form-item  prop="major">
        <el-input v-model="form.major" placeholder="请填写专业"></el-input>
        </el-form-item>
        <el-form-item  prop="class">
         <el-input v-model="form.class" placeholder="请填写班级"></el-input>
        </el-form-item>
      <el-form-item label="毕业时间" prop="date">
        <el-col :span="11">
          <el-date-picker type="date"
                          placeholder="选择日期"
                          v-model="form.date"
                          style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="form.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="onSubmit">立即注册</el-button>
        <el-button @click="resetform">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.checkPass !== '') {
          this.$refs.form.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        checkPass: '',
        name: '',
        password: '',
        industry: '',
        tel: '',
        company: '',
        provinces: '',
        city: '',
        district: '',
        stu_place: '',
        school: '',
        major: '',
        class: '',
        date: '',
        sex: ''
      },
      // 这是表单的验证规则对象
      formRules: {
        // 验证用户名是否合法
        name: [
          { required: true, message: '请输入登录名', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在2-8个字符之间', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        date: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        industry: [
          { required: true, message: '请输入所在行业', trigger: 'blur' },
          { min: 2, max: 16, message: '长度在2-16个字符之间', trigger: 'blur' }
        ],
        company: [
          { required: true, message: '请输入所在行业', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在2-50个字符之间', trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '请输入11位电话', trigger: 'blur' },
          { type: 'number', message: '电话必须为数字值', trigger: 'blur' }
        ],
        class: [
          { required: true, message: '请输入班级名', trigger: 'blur' }
        ],
        school: [
          { required: true, message: '请输入学校名', trigger: 'blur' }
        ],
        major: [
          { required: true, message: '请输入专业名', trigger: 'blur' }
        ],
        stu_place: [
          { required: true, message: '请输入学校所在省市', trigger: 'blur' }
        ],
        provinces: [
          { required: true, message: '值不得为空', trigger: 'blur' }
        ],
        city: [
          { required: true, message: '值不得为空', trigger: 'blur' }
        ],
        district: [
          { required: true, message: '值不得为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      this.$refs.form.validate(async valid => {
        if (!valid) return
        const res = await this.$http.post('http://localhost:55273/api/Register', {
          'user_name': this.form.name,
          'password': this.form.password,
          'industry': this.form.industry,
          'tel': this.form.tel,
          'company': this.form.company,
          'address': this.form.provinces + this.form.city + this.form.district,
          'stu_place': this.form.stu_place,
          'school': this.form.school,
          'major': this.form.major,
          'class_name': this.form.class,
          'date': this.form.date,
          'sex': this.form.sex
        })
        if (res.status !== 200) return this.$message.console.error('注册失败')
        this.$message.success('注册成功')
        this.$router.push('/login')
      })
    },
    resetform () {
      this.$refs.form.resetFields()
    }

  }
}
</script>

<style lang="less" scoped>
</style>
