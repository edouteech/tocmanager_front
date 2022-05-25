<template>
     <div Id="Login">
        <h1>Login</h1>
        <input type="Text" name="Username" v-Model="input.Username" Placeholder="Username" />
        <input Type="Password" Name="Password" V-Model="Input.Password" Placeholder="Password" />
        <button Type="Button" v-On:click="Login()">Login</button>
    </div> 
</template>

<script>
export default {
    name: 'Login',
    data() {
            return {
                input:{
                    Username: "",
                    Password: ""
                }
            }
        },
    methods: {
            Login() {
                if(This.input.Username != "" && This.input.Password != "") {
                    if(This.input.Username == This.$parent.mockAccount.Username && This.input.Password == This.$arent.mockAccount.Password) {
                        This.$emit("authenticated", true);
                        This.$router.replace({ name: "Secure" });
                    } else {
                        Console.Log("The Username And / Or Password Is Incorrect");
                    }
                } else {
                    Console.Log("A Username And Password Must Be Present");
                }
            }
        }

}
</script>

<style>
#Login {
        Width: 500px;
        Border: 1px Solid #CCCCCC;
        Background-Color: #FFFFFF;
        Margin: Auto;
        Margin-Top: 200px;
        Padding: 20px;
    }
</style>