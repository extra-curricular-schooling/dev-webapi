webpackJsonp([2],{"+4jY":function(t,e){},"/cXr":function(t,e){},"/qhp":function(t,e,s){t.exports=s.p+"static/img/star-clip-art.9b5a7c3.png"},ZlNH:function(t,e){},"c7q/":function(t,e){},eYrN:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("mvHQ"),i=s.n(a),n=s("ao7l"),o=s("mtWM"),r=s.n(o),l=s("8UL1"),c=s("Zm3I"),d=s("e7x4"),u=s.n(d),m=s("jLbN"),g=s("rd2Y"),h={name:"ForgotPassword",components:{"bad-password":m.a},data:function(){return{username:"",questions:[],passwordMessage:"",confirmPasswordMessage:"",specialCharInfo:this.$store.getters.getSpecialCharacters,PASSWORD_REGEX:this.$store.getters.getPasswordRegex,isActive:!1,body:"firstStep",isHidden:!0}},methods:{getSecurityAnswer:function(t){var e;return 1==t?e="answer1":2==t?e="answer2":3==t&&(e="answer3"),document.getElementById(e).value},getPassword:function(){return document.getElementById("password").value},validatePassword:function(){this.$data.PASSWORD_REGEX.test(document.getElementById("password").value)||""==document.getElementById("password").value?""==document.getElementById("password").value?(document.getElementById("password").className="input",document.getElementById("passwordControl").className="help",this.$data.passwordMessage=""):(document.getElementById("password").className="input is-success",document.getElementById("passwordControl").className="help",this.$data.passwordMessage=""):(document.getElementById("password").className="input",document.getElementById("passwordControl").className="help is-info",this.$data.passwordMessage=this.$store.getters.getPasswordMessage)},validateConfirmPassword:function(){document.getElementById("password").value!=document.getElementById("confirmPassword").value&&""!=document.getElementById("confirmPassword").value?(document.getElementById("confirmPassword").className="input",document.getElementById("confirmPasswordControl").className="help is-info",this.$data.confirmPasswordMessage=this.$store.getters.getConfirmPasswordMessage):""==document.getElementById("confirmPassword").value?(document.getElementById("confirmPassword").className="input",document.getElementById("confirmPasswordControl").className="help",this.$data.confirmPasswordMessage=""):document.getElementById("password").value==document.getElementById("confirmPassword").value&&(document.getElementById("confirmPassword").className="input is-success",document.getElementById("confirmPasswordControl").className="help",this.$data.confirmPasswordMessage="")},isValidAnswers:function(){return null!=document.getElementById("answer1").value&&null!=document.getElementById("answer2").value&&null!=document.getElementById("answer2").value},isValidCredentials:function(){return"input is-success"==document.getElementById("password").className&&"input is-success"==document.getElementById("confirmPassword").className},toggle:function(){this.isActive=!this.isActive},next:function(){this.getSecurityQuestions()},cancel:function(){this.close()},submit:function(){this.submitAnswers()},complete:function(){this.submitNewPassword()},close:function(){this.toggle(),this.flush(),this.body="firstStep"},toggleAlert:function(t){this.$refs.alert.toggle(t),c.a.$on("click",function(t){console.log(t),"rejected"==t&&(document.getElementById("password").value="",document.getElementById("password").className="input",document.getElementById("confirmPassword").value="",document.getElementById("confirmPassword").className="input")})},toggleForgetUsername:function(){this.close(),c.a.$emit("forgetUsername")},toggleSpecialCharInfo:function(){this.isHidden=!this.isHidden},passwordEventHelper:function(t){this.validateConfirmPassword(),"input is-success"==document.getElementById("password").className&&"input is-success"==document.getElementById("confirmPassword").className&&this.toggleAlert(t)},flush:function(){this.username="","secondStep"==this.body&&(document.getElementById("answer1").value="",document.getElementById("answer2").value="",document.getElementById("answer3").value=""),"thirdStep"==this.body&&(document.getElementById("password").value="",document.getElementById("confirmPassword").value="")},getSecurityQuestions:function(){var t=this;this.$store.commit("clearAuthorizationHeader"),null!=this.username&&(this.toggle(),c.a.$emit("loading"),r()({method:"GET",url:this.$store.getters.getBaseAppUrl+"ForgetCredentials/GetSecurityQuestions?username="+this.username,headers:this.$store.getters.getRequestHeaders,timeout:this.$store.getters.getDefaultTimeout}).then(function(e){console.log(e),200===e.status&&(t.questions=e.data,c.a.$emit("loading"),t.toggle(),t.body="secondStep")}).catch(function(e){console.log(e),t.flush(),c.a.$emit("loading"),"ECONNABORTED"==e.code&&u()({type:"error",title:"We Apologize",text:"Fetching your information took too long."}),409===e.response.status&&(t.toggle(),t.$data.body="noUsername")}))},submitAnswers:function(){var t=this;this.isValidAnswers()&&(this.toggle(),c.a.$emit("loading"),r()({method:"POST",url:this.$store.getters.getBaseAppUrl+"ForgetCredentials/SubmitAnswers",headers:this.$store.getters.getRequestHeaders,timeout:this.$store.getters.getDefaultTimeout,data:{username:this.$data.username,securityQuestions:[{question:Number(this.$data.questions[0].SecurityQuestionID),answer:this.getSecurityAnswer(1)},{question:Number(this.$data.questions[1].SecurityQuestionID),answer:this.getSecurityAnswer(2)},{question:Number(this.$data.questions[2].SecurityQuestionID),answer:this.getSecurityAnswer(3)}]}}).then(function(e){console.log(e),200===e.status&&(c.a.$emit("loading"),t.toggle(),t.body="thirdStep")}).catch(function(e){console.log(e),c.a.$emit("loading"),"ECONNABORTED"==e.code&&(t.flush(),t.body="firstStep",u()({type:"error",title:"We Apologize",text:"Fetching your information took too long."})),403===e.response.status&&(t.toggle(),document.getElementById("answer1").value="",document.getElementById("answer2").value="",document.getElementById("answer3").value="",t.$store.getters.getWrongAnswersCount<=t.$store.getters.getMaxWrong?(t.$store.dispatch("incrementWrongAnswersCount"),u()({type:"error",title:"Hmm...",text:"The answers you submitted are not correct"})):u()({type:"error",title:"Uh-Oh",text:"You have entered too many wrong answers.  Please contact us for assistance."})),500===e.response.status&&(t.flush(),t.body="firstStep",u()({type:"error",title:"We Apologize",text:"We are unable to process your request at this time."}))}))},submitNewPassword:function(){var t=this;this.isValidCredentials()&&(this.toggle(),c.a.$emit("loading"),r()({method:"POST",url:this.$store.getters.getBaseAppUrl+"ForgetCredentials/SubmitNewPassword",headers:this.$store.getters.getRequestHeaders,timeout:this.$store.getters.getDefaultTimeout,data:{username:this.username,password:this.getPassword()}}).then(function(e){console.log(e),200===e.status&&(t.questions=e.data,c.a.$emit("loading"),t.body="success",t.toggle())}).catch(function(e){console.log(e),c.a.$emit("loading"),"ECONNABORTED"==e.code&&(t.flush(),t.body="firstStep",u()({type:"error",title:"We Apologize",text:"Fetching your information took too long."})),500===e.response.status&&(t.flush(),t.body="firstStep",u()({type:"error",title:"We Apologize",text:"We are unable to process your request at this time."}))}))}}},p={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"modal",class:{"is-active":t.isActive}},[s("div",{staticClass:"modal-background"}),t._v(" "),s("div",{staticClass:"modal-content"},[s("div",{staticClass:"box"},[t._m(0),t._v(" "),"firstStep"===t.body?s("div",{staticClass:"body"},[s("p",[t._v("Forgot your password?  No worries.")]),t._v(" "),s("p",[t._v("We just need information you used to register.")]),s("br"),t._v(" "),s("div",{staticClass:"field username"},[s("label",{staticClass:"label field-element is-required"},[t._v("Username")]),t._v(" "),s("div",{staticClass:"control has-icons-left has-icons-right"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.username,expression:"username"}],staticClass:"input",attrs:{type:"text",placeholder:"Username"},domProps:{value:t.username},on:{input:function(e){e.target.composing||(t.username=e.target.value)}}}),t._v(" "),t._m(1)])])]):t._e(),t._v(" "),"noUsername"===t.body?s("div",{staticClass:"body"},[s("p",[t._v("Uh-Oh.  It seems the username you entered does not exist.  You may need to create an account or recover a forgotten username.")]),s("br")]):t._e(),t._v(" "),"secondStep"===t.body?s("div",{staticClass:"body"},[s("div",{staticClass:"is-field-group"},[s("div",{staticClass:"field security-questions"},[s("label",{staticClass:"label field-element is-required"},[t._v("Security Questions")]),t._v(" "),s("div",{staticClass:"control"},[s("p",[t._v(t._s(t.questions[0].SecQuestion))])])]),t._v(" "),t._m(2),t._v(" "),s("div",{staticClass:"field security-questions"},[s("div",{staticClass:"control"},[s("p",[t._v(t._s(t.questions[1].SecQuestion))])])]),t._v(" "),t._m(3),t._v(" "),s("div",{staticClass:"field security-questions"},[s("div",{staticClass:"control"},[s("p",[t._v(t._s(t.questions[2].SecQuestion))])])]),t._v(" "),t._m(4)])]):t._e(),t._v(" "),s("bad-password",{ref:"alert"}),t._v(" "),"thirdStep"===t.body?s("div",{staticClass:"body"},[t._m(5),s("p"),s("div",{staticClass:"field password"},[s("div",{staticClass:"field is-horizontal",staticStyle:{height:"24px","margin-bottom":"0.5em"}},[s("div",{staticClass:"field-body"},[s("label",{staticClass:"label field is-required",staticStyle:{"text-align":"left"}},[t._v("New Password")]),t._v(" "),s("span",{staticClass:"icon has-text-info",staticStyle:{float:"right"},attrs:{title:"What are special characters?"},on:{click:function(e){return e.preventDefault(),t.toggleSpecialCharInfo(e)}}},[s("i",{staticClass:"fas fa-info-circle"})])])]),t._v(" "),s("div",{staticClass:"notification is-warning",class:{"is-hidden":t.isHidden}},[s("button",{staticClass:"delete",on:{click:function(e){return e.preventDefault(),t.toggleSpecialCharInfo(e)}}}),t._v(" "),s("p",[t._v("Special characters are non-alphabetic and non-numeric characters.")]),t._v(" "),s("p",[t._v("For passwords, these are the special characters allowed: "),s("strong",[t._v(t._s(t.specialCharInfo))])])]),t._v(" "),s("div",{staticClass:"control has-icons-left"},[s("input",{staticClass:"input",attrs:{id:"password",type:"password",placeholder:"************",required:""},on:{keyup:t.validatePassword}}),t._v(" "),t._m(6)]),t._v(" "),s("p",{staticClass:"help",attrs:{id:"passwordControl"}},[t._v(t._s(t.passwordMessage))])]),t._v(" "),s("div",{staticClass:"field confirm-password"},[s("label",{staticClass:"label field-element is-required"},[t._v("Confirm New Password")]),t._v(" "),s("div",{staticClass:"control has-icons-left"},[s("input",{staticClass:"input",attrs:{id:"confirmPassword",type:"password",placeholder:"************",required:""},on:{keyup:function(e){t.passwordEventHelper(t.getPassword())}}}),t._v(" "),t._m(7)]),t._v(" "),s("p",{staticClass:"help",attrs:{id:"confirmPasswordControl"}},[t._v(t._s(t.confirmPasswordMessage))])])]):t._e(),t._v(" "),"success"===t.body?s("div",{staticClass:"body"},[s("p",[t._v("Congratulations!  You have successfully changed your password.")])]):t._e(),t._v(" "),s("br"),t._v(" "),s("div",{staticClass:"field is-grouped is-grouped-centered form-buttons"},["success"!==t.body?s("p",{staticClass:"control"},[s("button",{staticClass:"button is-link cancel-button",on:{click:function(e){return e.preventDefault(),t.cancel(e)}}},[t._v("\n          Cancel\n          ")])]):t._e(),t._v(" "),"firstStep"===t.body?s("p",{staticClass:"control"},[s("button",{staticClass:"button is-primary submit-button",on:{click:function(e){return e.preventDefault(),t.next(e)}}},[t._v("\n          Next\n          ")])]):t._e(),t._v(" "),"noUsername"===t.body?s("p",{staticClass:"control"},[s("router-link",{staticClass:"button is-primary register-button",attrs:{to:"/Registration",tag:"button"}},[t._v("\n          Create An Account\n          ")])],1):t._e(),t._v(" "),"noUsername"===t.body?s("p",{staticClass:"control"},[s("button",{staticClass:"button is-primary",on:{click:function(e){return e.preventDefault(),t.toggleForgetUsername(e)}}},[t._v("\n          I Forgot My Username\n          ")])]):t._e(),t._v(" "),"secondStep"===t.body?s("p",{staticClass:"control"},[s("button",{staticClass:"button is-primary submit-button",on:{click:function(e){return e.preventDefault(),t.submit(e)}}},[t._v("\n          Submit\n          ")])]):t._e(),t._v(" "),"thirdStep"===t.body?s("p",{staticClass:"control"},[s("button",{staticClass:"button is-primary submit-button",on:{click:function(e){return e.preventDefault(),t.complete(e)}}},[t._v("\n          Complete\n          ")])]):t._e(),t._v(" "),"success"===t.body?s("p",{staticClass:"control"},[s("button",{staticClass:"button is-primary submit-button",on:{click:function(e){return e.preventDefault(),t.close(e)}}},[t._v("\n          Awesome!\n          ")])]):t._e()])],1)])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("span",{staticClass:"header"},[e("h1",[this._v("Forgot Password")]),e("br")])},function(){var t=this.$createElement,e=this._self._c||t;return e("span",{staticClass:"icon is-small is-left"},[e("i",{staticClass:"fas fa-user"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"field security-questions-answers"},[e("div",{staticClass:"control"},[e("input",{staticClass:"input",attrs:{id:"answer1",type:"text",placeholder:"Answer 1",required:""}})])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"field security-questions-answers"},[e("div",{staticClass:"control"},[e("input",{staticClass:"input",attrs:{id:"answer2",type:"text",placeholder:"Answer 2",required:""}})])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"field security-questions-answers"},[e("div",{staticClass:"control"},[e("input",{staticClass:"input",attrs:{id:"answer3",type:"text",placeholder:"Answer 3",required:""}})])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("Please enter a "),e("strong",[this._v("new password")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("span",{staticClass:"icon is-small is-left"},[e("i",{staticClass:"fas fa-lock"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("span",{staticClass:"icon is-small is-left"},[e("i",{staticClass:"fas fa-lock"})])}]};var v=s("VU/8")(h,p,!1,function(t){s("ZlNH")},"data-v-dff91ad6",null).exports,f={name:"ForgotUsername",components:{"loading-modal":g.a},created:function(){var t=this;c.a.$on("forgetUsername",function(){t.toggle()})},data:function(){return{email:"",username:"",emailMessage:"",EMAIL_REGEX:this.$store.getters.getEmailRegex,isActive:!1,body:"firstStep"}},methods:{toggle:function(){"firstStep"==this.body&&(document.getElementById("email").className="input"),this.isActive=!this.isActive,this.emailMessage=""},cancel:function(){this.close()},submit:function(){this.submitEmail()},close:function(){this.toggle(),this.body="firstStep",this.email="",this.username=""},validateEmail:function(){this.$data.EMAIL_REGEX.test(this.$data.email)||""==this.$data.email?""==this.$data.email?(document.getElementById("email").className="input",document.getElementById("emailControl").className="help",this.$data.emailMessage=""):(document.getElementById("email").className="input is-success",document.getElementById("emailControl").className="help",this.$data.emailMessage=""):(document.getElementById("email").className="input",document.getElementById("emailControl").className="help is-info",this.$data.emailMessage=this.$store.getters.getEmailMessage)},isValid:function(){return"input is-success"==document.getElementById("email").className&&null!=this.email},submitEmail:function(){var t=this;this.$store.commit("clearAuthorizationHeader"),this.isValid()&&(this.toggle(),c.a.$emit("loading"),r()({method:"GET",url:this.$store.getters.getBaseAppUrl+"ForgetCredentials/GetUsername?email="+this.email,headers:this.$store.getters.getRequestHeaders,timeout:this.$store.getters.getDefaultTimeout}).then(function(e){console.log(e),200===e.status&&(t.$data.username=e.data,c.a.$emit("loading"),t.toggle(),t.$data.body="success",t.$data.email="")}).catch(function(e){console.log(e),c.a.$emit("loading"),"ECONNABORTED"==e.code&&u()({type:"error",title:"We Apologize",text:"Fetching your information took too long."}),409===e.response.status&&(t.toggle(),t.$data.body="noEmail"),500===e.response.status&&u()({type:"error",title:"We Apologize",text:"We are unable to process your request at this time."}),t.$data.email=""}))}}},_={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"modal",class:{"is-active":t.isActive}},[s("div",{staticClass:"modal-background"}),t._v(" "),s("div",{staticClass:"modal-content"},[s("div",{staticClass:"box"},[t._m(0),t._v(" "),s("loading-modal"),t._v(" "),"firstStep"===t.body?s("div",{staticClass:"body"},[s("p",[t._v("Forgot your username?  No worries.")]),t._v(" "),s("p",[t._v("We just need the email you used to register.")]),s("br"),t._v(" "),s("div",{staticClass:"field email"},[s("label",{staticClass:"label field-element is-required"},[t._v("Email")]),t._v(" "),s("div",{staticClass:"control has-icons-left has-icons-right"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"input",attrs:{id:"email",type:"email",placeholder:"Email Address"},domProps:{value:t.email},on:{keyup:t.validateEmail,input:function(e){e.target.composing||(t.email=e.target.value)}}}),t._v(" "),t._m(1)]),t._v(" "),s("p",{staticClass:"help",attrs:{id:"emailControl"}},[t._v(t._s(t.emailMessage))])])]):t._e(),t._v(" "),"success"===t.body?s("div",{staticClass:"body"},[s("p",[t._v("Good news.  We found your username!")]),s("br"),t._v(" "),s("div",{staticClass:"control"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.username,expression:"username"}],staticClass:"input",attrs:{type:"text",readonly:""},domProps:{value:t.username},on:{input:function(e){e.target.composing||(t.username=e.target.value)}}})])]):t._e(),t._v(" "),"noEmail"===t.body?s("div",{staticClass:"body"},[s("p",[t._v("Uh-Oh.  It seems the email you entered does not exist.  Perhaps you may need to create an account.")]),s("br")]):t._e(),t._v(" "),s("br"),t._v(" "),s("div",{staticClass:"field is-grouped is-grouped-centered form-buttons"},["success"!==t.body?s("p",{staticClass:"control"},[s("button",{staticClass:"button is-link cancel-button",on:{click:function(e){return e.preventDefault(),t.cancel(e)}}},[t._v("\n          Cancel\n          ")])]):t._e(),t._v(" "),"firstStep"===t.body?s("p",{staticClass:"control"},[s("button",{staticClass:"button is-primary submit-button",on:{click:function(e){return e.preventDefault(),t.submit(e)}}},[t._v("\n          Submit\n          ")])]):t._e(),t._v(" "),"success"===t.body?s("p",{staticClass:"control"},[s("button",{staticClass:"button is-primary submit-button",on:{click:function(e){return e.preventDefault(),t.close(e)}}},[t._v("\n          Awesome!\n          ")])]):t._e(),t._v(" "),"noEmail"===t.body?s("p",{staticClass:"control"},[s("router-link",{staticClass:"button is-primary register-button",attrs:{to:"/Registration",tag:"button"}},[t._v("\n          Create An Account\n          ")])],1):t._e()])],1)])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("span",{staticClass:"header"},[e("h1",[this._v("Forgot Username")]),e("br")])},function(){var t=this.$createElement,e=this._self._c||t;return e("span",{staticClass:"icon is-small is-left"},[e("i",{staticClass:"fas fa-envelope"})])}]};var y=s("VU/8")(f,_,!1,function(t){s("+4jY")},"data-v-7ce6871e",null).exports,C=s("rXDB"),b=s("3p6I"),w=s("abWm"),$=s.n(w),E={name:"LoginPanel",components:{"error-modal":l.a,"forgot-password":v,"forgot-username":y,"loading-modal":g.a},data:function(){return{username:"",password:"",isDisabled:!0,headers:this.$store.getters.getRequestHeaders,loginURI:this.$store.getters.getLoginPortal,currentRole:"",isAuth:""}},mounted:function(){this.updateLocalSecurityState()},updated:function(){this.updateLocalSecurityState()},methods:{updateLocalSecurityState:function(){this.currentRole=this.$store.getters.getRole,this.isAuth=this.$store.getters.isAuth},changePassword:function(){this.$refs.password.toggle()},rememberUsername:function(){this.$refs.username.toggle()},toggleErrorModal:function(t){this.$store.dispatch("updateErrorMessage",t),c.a.$emit("error")},toggleLoadingModal:function(){c.a.$emit("loading")},postCredentials:function(){var t=this;this.$store.dispatch("signOut"),this.$store.commit("clearAuthorizationHeader"),null!=this.username&&null!=this.password&&(this.toggleLoadingModal(),r()({method:"POST",url:this.$store.getters.getBaseAppUrl+this.$store.getters.getLoginPortal,headers:this.$store.getters.getRequestHeaders,data:{username:this.username,password:this.password}}).then(function(e){if(200===e.status){var s=e.data,a=C.a.parseUrlQuery(s).jwt;if(void 0!==a)t.handlePartialAccount(s,a);else{var i=$.a.decode(e.data.AuthToken,{complete:!0});if(""!==i.payload.iss){var n=t.$store.getters.getValidIssuers,o=!1;for(var r in n)n[r]===i.payload.iss&&(o=!0);o?(t.$store.dispatch("updateRole",i.payload.role),t.$store.dispatch("updateUsername",t.username),t.$store.dispatch("signIn",e.data.AuthToken),t.$store.dispatch("updateToken",e.data.AuthToken),t.toggleLoadingModal(),c.a.$emit("loggedIn"),t.$router.push("/Home")):(t.toggleLoadingModal(),t.toggleErrorModal("An error has occurred, please try again later!"))}else t.toggleLoadingModal(),t.toggleErrorModal("An error has occurred, please try again later!")}}}).catch(function(e){t.toggleLoadingModal(),e.response?"SUSPENDED"===e.response.data.message?u()({imageUrl:"../../../static/images/professor.png",imageHeight:"300px",imageWidth:"100px",title:"Bad News",text:"According to our records, you have been suspended. Please contact an administrator for more information"}):400===e.response.status?u()({imageUrl:"../../../static/images/uhoh-bird.png",title:"Uh-Oh",text:"Invalid credentials. Please try again."}):500===e.response.status?u()({type:"error",title:"We Apologize",text:"We are unable to process your request at this time."}):u()({type:"error",title:"Bad News",text:"Something has gone wrong. Please try again."}):e.request?(console.log("problems with request"),u()({type:"error",title:"We Apologize",text:"Our server is currently not responding."}),console.log(e.request)):u()({type:"error",title:"Bad News",text:"Something has gone wrong. Please try again."})}))},handlePartialAccount:function(t,e){var s=b.a.myDecode(e);"partial-registration"===C.a.getUrlPath(t)&&(this.$store.dispatch("updateRole",s.roleType),this.$store.dispatch("updateUsername",s.username),this.$store.commit("setAuthToken",e),this.$router.push({name:"PartialRegistration",params:{jwt:e}})),"home"===C.a.getUrlPath(t)&&(this.$store.dispatch("updateRole",s.role),this.$store.dispatch("updateUsername",s.unique_name),this.$store.dispatch("updateToken",e),this.$store.commit("signIn",e),this.$router.push({name:"Home"}))}},watch:{username:function(){""!==this.username&&""!==this.password?this.isDisabled=!1:this.isDisabled=!0},password:function(){""!==this.username&&""!==this.password?this.isDisabled=!1:this.isDisabled=!0}}},S={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.isAuth?t._e():s("div",[s("error-modal"),t._v(" "),s("loading-modal"),t._v(" "),s("div",{staticClass:"field"},[s("label",{staticClass:"label field-element is-required"},[t._v("Username")]),t._v(" "),s("div",{staticClass:"control has-icons-left has-icons-right"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.username,expression:"username"}],staticClass:"input",attrs:{type:"text",placeholder:"Username",required:""},domProps:{value:t.username},on:{input:function(e){e.target.composing||(t.username=e.target.value)}}}),t._v(" "),t._m(0)])]),t._v(" "),s("div",{staticClass:"field password"},[s("label",{staticClass:"label field-element is-required"},[t._v("Password")]),t._v(" "),s("div",{staticClass:"control has-icons-left"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"input",attrs:{type:"password",placeholder:"************",required:""},domProps:{value:t.password},on:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.postCredentials(e):null},input:function(e){e.target.composing||(t.password=e.target.value)}}}),t._v(" "),t._m(1)])]),t._v(" "),s("div",{staticClass:"forgot-credentials"},[s("span",{staticClass:"forgot-username"},[s("forgot-username",{ref:"username"}),t._v(" "),s("a",{staticClass:"forget-links",on:{click:function(e){return e.preventDefault(),t.rememberUsername(e)}}},[t._v("Forgot Username?")]),s("br")],1),t._v(" "),s("span",{staticClass:"forgot-password"},[s("forgot-password",{ref:"password"}),t._v(" "),s("a",{staticClass:"forget-links",on:{click:function(e){return e.preventDefault(),t.changePassword(e)}}},[t._v("Forgot Password?")])],1)]),t._v(" "),s("div",{staticClass:"field is-grouped is-grouped-centered"},[s("p",{staticClass:"control"},[s("button",{staticClass:"button is-primary login-button",attrs:{disabled:t.isDisabled},on:{click:t.postCredentials}},[t._v("\n        Login\n      ")])]),t._v(" "),s("p",{staticClass:"control"},[s("router-link",{staticClass:"button is-link register-button",attrs:{to:"/Registration",tag:"button"}},[t._v("\n        Sign Up\n      ")])],1)])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("span",{staticClass:"icon is-small is-left"},[e("i",{staticClass:"fas fa-user"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("span",{staticClass:"icon is-small is-left"},[e("i",{staticClass:"fas fa-lock"})])}]};var P=s("VU/8")(E,S,!1,function(t){s("yp7z")},"data-v-2f8b08c1",null).exports,A={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"notification is-success",class:{"is-hidden":t.isHidden}},[s("button",{staticClass:"delete",on:{click:function(e){return e.preventDefault(),t.toggleNotification(e)}}}),t._v(" "),s("strong",[t._v("Congratulations!")]),s("br"),t._v(" "),s("p",[t._v("You've successfully registered your information.  Make sure to login to start learning!")])])},staticRenderFns:[]};var I=s("VU/8")({name:"RegistrationAlert",data:function(){return{isHidden:!0}},methods:{toggleNotification:function(){this.isHidden=!this.isHidden}}},A,!1,function(t){s("/cXr")},null,null).exports,B={name:"Main",components:{DefaultLayout:n.default,LoginPanel:P,RegistrationAlert:I},data:function(){return{msg:"Welcome to Your Vue.js App"}},mounted:function(){this.checkRedirectionFromRegistration()},methods:{checkRedirectionFromRegistration:function(){i()(this.$route.params)===i()({isSuccess:!0})&&this.$refs.alert.toggleNotification()}}},N={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container is-fullhd"},[t._m(0),t._v(" "),s("registration-alert",{ref:"alert"}),t._v(" "),t._m(1),t._v(" "),t._m(2),t._v(" "),s("section",{staticClass:"hero is-light"},[s("div",{staticClass:"hero-body"},[s("div",{staticClass:"container is-fluid"},[s("div",{staticClass:"tile is-ancestor"},[s("div",{staticClass:"tile is-parent"},[s("article",{staticClass:"tile is-child box"},[t._m(3),t._v(" "),s("Login-Panel")],1)]),t._v(" "),t._m(4),t._v(" "),t._m(5),t._v(" "),t._m(6)])])])]),t._v(" "),t._m(7),t._v(" "),t._m(8),t._v(" "),s("div",{staticStyle:{height:"1px"}})],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("section",{staticClass:"hero is-dark"},[e("div",{staticClass:"hero-body"},[e("div",{staticClass:"container is-fluid"})])])},function(){var t=this.$createElement,e=this._self._c||t;return e("section",{staticClass:"hero is-light"},[e("div",{staticClass:"hero-body"},[e("div",{staticClass:"container is-fluid"},[e("div",{staticClass:"box"},[e("div",{staticClass:"container is-fluid"},[e("h1",{staticClass:"title"},[this._v("\r\n                            What do we do?\r\n                        ")]),this._v(" "),e("p")]),this._v(" "),e("div",{staticClass:"container is-fluid"},[e("h2",{staticClass:"subtitle"},[this._v("\r\n                            Well it all began on a nice day, very typical for Southern California. The sun is out and there is frolic and laugher all\r\n                            around. And then a sudden realization was made. The senior project had begun and neigh an idea\r\n                            was to be had. So out of the blue, Sir Scott came up with this idea for which we have implemented\r\n                            here today. Sooner or later, someone, somewhere, with actual ideas that can be expressed in tangible\r\n                            words, will edit out this masterpiece, and in turn, put something less awesome but probably more\r\n                            appropriate for our cause. Until that day arrives,\r\n                            "),e("strong",[this._v("I love this class. I don't lose sleep to this project at all.")]),this._v(" Honestly though, all BS\r\n                            aside, I learned alot and will forever be grateful. Keep your head up guys.\r\n                            "),e("strong",[this._v("Almost done!")])])])])])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("section",{staticClass:"hero is-info"},[e("div",{staticClass:"hero-body"},[e("div",{staticClass:"container is-fluid"})])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h1",{staticClass:"title"},[e("strong",[this._v("Getting Started")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"tile is-parent"},[s("article",{staticClass:"tile is-child box"},[s("h1",{staticClass:"title"},[s("strong",[t._v("Setting Up")])]),t._v(" "),s("hr",{staticClass:"dropdown-divider"}),t._v(" "),s("p",[t._v("\r\n                  Getting settled can be a daunting task. Here at ECS, we make it easy to find great\r\n                  articles tailered to your interests!\r\n                ")]),t._v(" "),s("hr",{staticClass:"dropdown-divider"}),t._v(" "),s("p",[t._v("\r\n                  Get going in a matter of minutes, simply tell us what you want to see, and we'll deliver!\r\n                  "),s("strong",[t._v("It's that simple!")])]),t._v(" "),s("hr",{staticClass:"dropdown-divider"}),t._v(" "),s("p",[t._v("\r\n                  What are you waiting for?\r\n                ")]),t._v(" "),s("hr",{staticClass:"dropdown-divider"})])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"tile is-parent"},[a("article",{staticClass:"tile is-child box"},[a("h1",{staticClass:"title"},[t._v("Start Reading!")]),t._v(" "),a("hr",{staticClass:"dropdown-divider"}),t._v(" "),a("blockquote",[t._v("\r\n                  Enjoy our "),a("strong",[t._v("immersive")]),t._v(" collection of readings chosen to give the reader a pleasant illustration\r\n                  of the material.\r\n                ")]),t._v(" "),a("hr",{staticClass:"dropdown-divider"}),t._v(" "),a("blockquote",[a("strong",[t._v("200+")]),t._v(" Articles!\r\n                ")]),t._v(" "),a("span",[a("img",{staticStyle:{height:"75px"},attrs:{src:s("unP2"),alt:""}})]),t._v(" "),a("hr",{staticClass:"dropdown-divider"})])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"tile is-parent is-vertical"},[a("div",{staticClass:"tile is-child box"},[a("div",{staticClass:"container is-fluid"},[a("span",[a("img",{staticStyle:{height:"75px"},attrs:{src:s("/qhp"),alt:""}})]),t._v(" "),a("span",[a("p",[a("strong",[t._v("Earn Points! Win Prizes!")])])])]),t._v(" "),a("hr",{staticClass:"dropdown-divider"}),t._v(" "),a("p",[t._v("\r\n                  The more you read, the more you win!\r\n                ")]),t._v(" "),a("hr",{staticClass:"dropdown-divider"})]),t._v(" "),a("div",{staticClass:"tile is-child box"},[a("p",[t._v("Share your favorite articles on")]),t._v(" "),a("figure",{staticClass:"image"},[a("a",{attrs:{href:"https://www.linkedin.com/",target:"_blank"}},[a("img",{attrs:{src:s("iW5P"),alt:""}})])])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("section",{staticClass:"hero is-dark"},[e("div",{staticClass:"hero-body"},[e("div",{staticClass:"container is-fluid"})])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",{staticClass:"hero is-light"},[s("div",{staticClass:"hero-body"},[s("div",{staticClass:"content has-text-centered"},[s("p",[s("strong",[t._v("ECS")]),t._v(" by\r\n                    "),s("a",{attrs:{href:"/"}},[t._v("KND")]),t._v(". The source code is licensed\r\n                    "),s("a",{attrs:{href:"http://opensource.org/licenses/mit-license.php"}},[t._v("MIT")]),t._v(". The website content is licensed\r\n                    "),s("a",{attrs:{href:"http://creativecommons.org/licenses/by-nc-sa/4.0/"}},[t._v("CC BY NC SA 4.0")]),t._v(".\r\n                ")])])])])}]};var x=s("VU/8")(B,N,!1,function(t){s("c7q/")},"data-v-e5e030f2",null);e.default=x.exports},iW5P:function(t,e,s){t.exports=s.p+"static/img/linkedin-logo.f50fa49.png"},mvHQ:function(t,e,s){t.exports={default:s("qkKv"),__esModule:!0}},qkKv:function(t,e,s){var a=s("FeBl"),i=a.JSON||(a.JSON={stringify:JSON.stringify});t.exports=function(t){return i.stringify.apply(i,arguments)}},unP2:function(t,e,s){t.exports=s.p+"static/img/open-book.319b94e.gif"},yp7z:function(t,e){}});
//# sourceMappingURL=2.da9a043e5e060ab6e77e.js.map