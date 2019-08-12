<template>
  <div>
    <cube-form
      :model="model"
      :schema="schema"
      @validate="handleValidate"
      @submit="handleLogin"
    ></cube-form>
  </div>
</template>

<script>
export default {
    data() {
        return {
            model: {
                username:'',
                password:'',
            },
            schema: {
                fields:[
                    {
                        type:'input',
                        modelKey:'username',
                        label:'用户名',
                        props:{
                            placeholder:'请输入用户名'
                        },
                        rules:{
                            required:true
                        },
                        trigger:'blur',
                        messages:{
                            required:'用户名为必填项'
                        }
                    },
                    {
                        type:'input',
                        modelKey:'password',
                        label:'密码',
                        props:{
                            type:'password',
                            placeholder:'请输入密码',
                            eye:{open:false}
                        },
                        rules:{
                            required:true
                        },
                        trigger:'blur',
                        messages:{
                            required:'密码为必填项'
                        }
                    },
                    {
                        type:'submit',
                        label:'登录'
                    }
                ]
            }
        }
    },
    methods: {
        async handleLogin(e) {
            e.preventDefault();
            const res = await this.$http.get('/api/login',{params:{
                username:this.model.username,
                password:this.model.password
            }})
            console.log(res)
            const {code,token,message} = res.data
            if(code==0){
                localStorage.setItem('token',token) //缓存到本地
                this.$store.commit('setToken',token) //存入vuex
                const { redirect } = this.$route.query || '/'
                this.$router.push(redirect)
            }else{
                const toast = this.$createToast({
                    time:2000,
                    txt:message || '登录失败',
                    type:'error'
                })
                toast.show()
            }
        },
        handleValidate(ret) {
            console.log('校验'+ret)
        }
    },
};
</script>

<style lang="scss" scoped>
</style>