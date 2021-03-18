(this.webpackJsonpstatic=this.webpackJsonpstatic||[]).push([[0],{30:function(e,t,n){},38:function(e,t,n){},39:function(e,t,n){"use strict";n.r(t);var a=n(1),s=n.n(a),r=n(24),c=n.n(r),i=(n(30),n(8)),o=n.n(i),u=n(16),l=n(11),h=n(12),j=n(7),p=n(14),d=n(13),b=n(2),O=n(10),g=n.n(O),m=n(18),f=n(0),x=function(e){Object(p.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).state={username:"",email:"",password:""},a.handleInput=a.handleInput.bind(Object(j.a)(a)),a}return Object(h.a)(n,[{key:"handleInput",value:function(e){this.setState(Object(m.a)({},e.target.name,e.target.value))}},{key:"render",value:function(){var e=this;return Object(f.jsxs)("form",{className:"loginform",onSubmit:function(t){return e.props.handleLogin(t,e.state)},children:[Object(f.jsx)("input",{type:"text",name:"username",value:this.state.username,placeholder:"username",onChange:this.handleInput}),Object(f.jsx)("br",{}),Object(f.jsx)("input",{type:"email",name:"email",value:this.state.email,placeholder:"email",onChange:this.handleInput}),Object(f.jsx)("br",{}),Object(f.jsx)("input",{type:"password",name:"password",value:this.state.password,placeholder:"password",onChange:this.handleInput}),Object(f.jsx)("br",{}),Object(f.jsx)("button",{className:"btn",type:"submit",children:"Login"})]})}}]),n}(a.Component),v=function(e){Object(p.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).state={username:"",email:"",password1:"",password2:""},a.handleInput=a.handleInput.bind(Object(j.a)(a)),a}return Object(h.a)(n,[{key:"handleInput",value:function(e){this.setState(Object(m.a)({},e.target.name,e.target.value))}},{key:"render",value:function(){var e=this;return Object(f.jsxs)("form",{className:"regform",onSubmit:function(t){return e.props.handleRegistration(t,e.state)},children:[Object(f.jsx)("input",{className:"reginput",type:"text",name:"username",value:this.state.username,placeholder:"username",onChange:this.handleInput}),Object(f.jsx)("input",{className:"reginput",type:"email",name:"email",value:this.state.email,placeholder:"email",onChange:this.handleInput}),Object(f.jsx)("input",{className:"reginput",type:"password",name:"password1",value:this.state.password1,placeholder:"password",onChange:this.handleInput}),Object(f.jsx)("input",{className:"reginput",type:"password",name:"password2",value:this.state.password2,placeholder:"confirm password",onChange:this.handleInput}),Object(f.jsx)("button",{className:"btn",type:"submit",children:"Register"})]})}}]),n}(a.Component),y=function(e){Object(p.a)(n,e);var t=Object(d.a)(n);function n(e){return Object(l.a)(this,n),t.call(this,e)}return Object(h.a)(n,[{key:"componentDidMount",value:function(){var e=Object(u.a)(o.a.mark((function e(){var t,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/rest-auth/user/");case 2:return t=e.sent,e.next=5,t.json();case 5:n=e.sent,console.log(n);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return Object(f.jsxs)("div",{className:"container",children:[Object(f.jsxs)("div",{children:[Object(f.jsx)("h1",{children:"Username"}),Object(f.jsx)("div",{classname:"profpic",children:Object(f.jsx)("img",{src:"#",alt:"user"})}),Object(f.jsx)("div",{classname:"bio",children:Object(f.jsx)("p",{children:"My Bio:"})})]}),Object(f.jsxs)("div",{className:"my_plants",children:[Object(f.jsx)("label",{htmlFor:"myplants",children:"My Plants"}),Object(f.jsx)("input",{type:"text"})]})]})}}]),n}(a.Component),k=n(9);var w=function(e){var t=e.isLoggedIn;return Object(f.jsxs)("ul",{className:"nav-bar",children:[Object(f.jsx)("li",{className:"nav-bar-right",children:Object(f.jsx)(k.b,{to:"/",children:"Home"})}),Object(f.jsxs)("li",{className:"nav-bar-left",children:[Object(f.jsx)(k.b,{to:"/profile/",children:"Profile"})," "]}),t?Object(f.jsx)("button",{className:"reg-btn",onClick:function(t){return e.handleLogOut(t)},type:"submit",children:"LogOut"}):Object(f.jsxs)("span",{children:[Object(f.jsx)("li",{className:"nav-bar-left",children:Object(f.jsx)(k.b,{to:"/login/",children:"Login"})}),Object(f.jsxs)("li",{className:"nav-bar-left",children:[Object(f.jsx)(k.b,{to:"/register/",children:"Register"})," "]})]})]})},L=(n(38),function(e){Object(p.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).state={isLoggedIn:!!g.a.get("Authorization")},a.handleRegistration=a.handleRegistration.bind(Object(j.a)(a)),a.handleLogin=a.handleLogin.bind(Object(j.a)(a)),a.handleLogOut=a.handleLogOut.bind(Object(j.a)(a)),a}return Object(h.a)(n,[{key:"handleLogin",value:function(){var e=Object(u.a)(o.a.mark((function e(t,n){var a,s,r,c;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),a={method:"POST",headers:{"Content-Type":"application/json","X-CSRFToken":g.a.get("csrftoken")},body:JSON.stringify(n)},s=function(e){return console.warn(e)},e.next=5,fetch("/rest-auth/login/",a).catch(s);case 5:return r=e.sent,e.next=8,r.json().catch(s);case 8:(c=e.sent).key&&(g.a.set("Authorization","Token ".concat(c.key)),this.setState({isLoggedIn:!0}),this.props.history.push("/"));case 10:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"handleRegistration",value:function(){var e=Object(u.a)(o.a.mark((function e(t,n){var a,s,r,c;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),a={method:"POST",headers:{"Content-Type":"application/json","X-CSRFToken":g.a.get("csrftoken")},body:JSON.stringify(n)},s=function(e){return console.warn(e)},e.next=5,fetch("/rest-auth/registration/",a).catch(s);case 5:return r=e.sent,e.next=8,r.json().catch(s);case 8:(c=e.sent).key&&(g.a.set("Authorization","Token ".concat(c.key)),this.setState({isLoggedIn:!0}),this.props.history.push("/"));case 10:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"handleLogOut",value:function(){var e=Object(u.a)(o.a.mark((function e(t){var n,a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),alert("logging out"),n={method:"POST",headers:{"Content-Type":"application/json","X-CSRFToken":g.a.get("csrftoken")}},a=function(e){return console.warn(e)},e.next=6,fetch("/rest-auth/logout/",n).catch(a);case 6:e.sent.ok&&(g.a.remove("Authorization"),this.setState({isLoggedIn:!1}),this.props.history.push("/login/"));case 8:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){return Object(f.jsxs)(s.a.Fragment,{children:[Object(f.jsx)(w,{isLoggedIn:this.state.isLoggedIn,handleLogOut:this.handleLogOut}),Object(f.jsxs)(b.c,{children:[Object(f.jsx)(b.a,{path:"/login",children:Object(f.jsx)(x,{handleLogin:this.handleLogin})}),Object(f.jsx)(b.a,{path:"/register",children:Object(f.jsx)(v,{handleRegistration:this.handleRegistration})}),Object(f.jsx)(b.a,{path:"/profile",children:Object(f.jsx)(y,{})})]})]})}}]),n}(a.Component)),I=Object(b.f)(L),C=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,40)).then((function(t){var n=t.getCLS,a=t.getFID,s=t.getFCP,r=t.getLCP,c=t.getTTFB;n(e),a(e),s(e),r(e),c(e)}))};c.a.render(Object(f.jsx)(s.a.StrictMode,{children:Object(f.jsx)(k.a,{children:Object(f.jsx)(I,{})})}),document.getElementById("root")),C()}},[[39,1,2]]]);
//# sourceMappingURL=main.56659188.chunk.js.map