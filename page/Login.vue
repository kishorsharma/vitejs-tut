<template>
  <div class="wrapper fadeInDown" style="margin-top: 160px">
    <div class="card" style="width: 25rem;left: 40%; top: 30%; text-align: center;">
      <div class="card-body">
        <form>
          <div class="form-group">
            <label>
              <img
                class="card-img-top"
                src="https://driftt.imgix.net/https%3A%2F%2Fdriftt.imgix.net%2Fhttps%253A%252F%252Fs3.amazonaws.com%252Fcustomer-api-avatars-prod%252F1856419%252Ff79399bbd9bbf5aa5e4165e4f154104bpwznbv8hdvn4%3Ffit%3Dmax%26fm%3Dpng%26h%3D200%26w%3D200%26s%3D5851ce9df11ad2722ae5d7cf6aa5fbd3?fit=max&fm=png&h=200&w=200&s=d3e005a20e8ea7b7e77bf2eea1c9fa00"
                alt="Card image cap"
                height="200"
                width="200"
              />
            </label>
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              v-model="email"
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              @keyup="checkEmail"
            />
            <small
              id="emailHelp"
              class="form-text text-muted"
            >We'll never share your email with anyone else.</small>
          </div>
          <div v-if="isSSOEnabled"><small >We have found your account linked with SSO. Click login to sign-in.</small></div>
          <div class="form-group" v-else>
            <label for="exampleInputPassword1">Password</label>
            <input
              v-model="password"
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
          <button type="button" class="btn btn-primary" @click="login" >Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  setup() {
    return {
      email: "",
      password: "",
      isSSOEnabled: false,
      debounce: null
    };
  },
  methods: {
    checkEmail() {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        console.log("Email check: ", this.email);
        if (this.email.indexOf("@") > 3) {
          console.log("start checking email: ", this.email);
          fetch(`https://localhost:3000/checkEmail`, {
              method: 'post',
              body: JSON.stringify({email: this.email})
            })
            .then(res => res.json())
            .then(res => {
              console.log("res: ", res);
              this.isSSOEnabled = res.sso;
              this.redirectLink = res.redirectLink;
            })
            .catch(error => {
              console.log("Error: ", error);
            });
        }
      }, 500);
    },
    login() {
      console.log("Lgin is called", this.email);
      if (this.isSSOEnabled) {
        window.location.href = this.redirectLink;
      }
      // fetch(`https://localhost:3000/login`, {
      //   method: 'post',
      //   body: JSON.stringify({
      //         email: this.email,
      //         password: this.password
      //       }),
        
      // })
      // .then(res => {
      //   console.log("res: ", res);
      //   if (res.type === "opaqueredirect") {
      //     // window.location.href = res.url;
      //   } else {
      //     // return res;
      //   }
      // })
      // .catch(error => {
      //   console.log("Error: ", error);
      // });
    }
  }
};
</script>

<style>
</style>