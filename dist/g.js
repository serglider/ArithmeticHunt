function Ball(t,e){this.id=t,this.data=e,this.x=0,this.y=0,this.r=10,this.vx=0,this.vy=0,this.c=function(){let t="#";for(let e=0;e<6;e++)t+="0123456789ABCDEF"[Math.floor(16*Math.random())];return t}(),this.isAlive=!0,this.isYoung=!0,this.bumped=[];let i=null,s=null;this.done=!1;let n=0;const r=2*Math.PI,h={hor:!1,vert:!1},o=[.45,.35,.3],l=()=>{return`bold ${Math.round(this.r*o[e.complexity])}px sans-serif`};this.render=(()=>{this.isAlive&&(i.fillStyle=this.c,i.beginPath(),i.arc(this.x,this.y,this.r,0,r),i.fill(),i.fillStyle="#DDDCC5",i.beginPath(),i.arc(this.x,this.y,.9*this.r,0,r),i.fill(),i.fillStyle="#1D2326",i.font=l(),i.fillText(e.expression,this.x,this.y))}),this.bump=((t,e,i)=>{this.bumped.includes(t)||(this.c="red",this.vx=1.1*e,this.vy=1.1*i,this.bumped.push(t),this.done=!0)}),this.setData=(t=>{i=t.ctx,s=t.bounds,this.x=t.x,this.y=t.y,this.vx=t.vx,this.vy=t.vy}),this.update=(()=>{let t=-4;this.done||(t=++n%5==0?1:0),this.r+=t,this.r=this.r>120?120:this.r,this.r<=0?this.isAlive=!1:this.r>30&&(this.isYoung=!1),this.x+this.r>s.w||this.x-this.r<0?h.vert||(this.vx*=-1,h.vert=!0):h.vert=!1,this.y+this.r>s.h||this.y-this.r<0?h.hor||(this.vy*=-1,h.hor=!0):h.hor=!1,this.x+=this.vx,this.y+=this.vy}),this.intersects=(t=>{if(this.done)return!1;return function(t,e){return Math.hypot(t.x-e.x,t.y-e.y)}(this,t)<this.r+t.r})}function Game(t,e){let i,s,n,r=0,h=12,o=Date.now(),l=!0,a=7;function c(c){const d=Date.now()-o,u=12-Math.round(d/1e3);c<a&&function(){const i=function(){let t="";for(let e=0;e<10;e++)t+="0123456789ABCDEF"[Math.floor(16*Math.random())];return t}();l=!l;const s=t.getExpression(l),r=new e(i,s);n.spawn(r)}(),u!==h&&(h=u,s.setText(h)),d>12e3&&(i.setText(`TIME OUT! SCORE: ${r}`),n.stop())}this.onCorrect=(()=>{o=Date.now(),h=12,r++,i.setText(`SCORE: ${r}`),20!==r&&30!==r||t.levelUp(),a=Math.floor(r/15)+7}),this.onFail=(()=>{n.stop(),i.setText(`WRONG! SCORE: ${r}`)}),this.reset=(()=>{r=0,h=12,o=Date.now(),i.setText("SCORE: 0")}),this.start=(t=>{(n=t).addCallback(c)}),this.setTextfields=((t,e)=>{s=e,(i=t).setText("SCORE: 0"),s.setText(h)})}function Generator(){const t={add:function(t,e){return t+e},substract:function(t,e){return t-e},addSign:"+",substractSign:"-"},e=[[1,1],[2,1],[2,2]];let i=0,s=[e[i]];function n(t=1){return Array.from({length:t},(t,e)=>e?r():r(e)).join("")}function r(t){let e=Math.floor(10*Math.random());for(;e===t;)e=Math.floor(10*Math.random());return e.toString()}this.getExpression=(e=>{return function(e,s){const r=n(e[0]),h=n(e[1]),o=Math.random()>.5?"add":"substract",l=t[`${o}Sign`],a=t[o](+r,+h),c=s?a:function(t){let e;const i=Math.round(Math.random());e=t<10?i?t+1:t-1:i?Math.ceil(1.04*t):Math.floor(.98*t);return e}(a);return{complexity:i,isCorrect:s,actual:a,expression:`${r} ${l} ${h} = ${c}`}}(function(t){return t[Math.floor(Math.random()*t.length)]}(s),e)}),this.levelUp=(()=>{e[++i]&&s.push(e[i])}),this.reset=(()=>{s=[e[i=0]]})}const help=document.querySelector(".help-outer");let isHelpShown=!0;const generator=new Generator,game=new Game(generator,Ball),world=new World,player=new Player(game,world.centerX,world.centerY),scoreText=new Textfield({x:world.centerX,y:30,color:"#DDDCC5",fontSize:36}),timerText=new Textfield({x:world.width-40,y:30,color:"#DDDCC5",fontSize:36,text:"12"}),toolbar=new Rect({x:0,y:0,w:world.width,h:60,color:"rgba(29,35,38,0.7)"});function init(){generator.reset(),player.reset(),game.reset(),world.reset(),world.spawn(player),world.spawn(toolbar),world.spawn(scoreText),world.spawn(timerText)}function toggleHelp(){isHelpShown=!isHelpShown,help.style.display=isHelpShown?"table":"none"}function Player(t,e,i){this.x=e,this.y=i,this.r=50,this.id="player";let s=!1;this.data={isCorrect:null};let n=null,r=null;const h=2*Math.PI;this.render=(()=>{s&&(n.fillStyle=this.c1,n.beginPath(),n.arc(this.x,this.y,this.r,0,h),n.fill(),n.fillStyle=this.c2,n.beginPath(),n.arc(this.x,this.y,.9*this.r,0,h),n.fill())}),this.reset=(()=>{this.c1="#611427",this.c2="#958976",this.isAlive=!0,s=!1}),this.bump=((e,i,s,n)=>{n?(this.c1="#958976",t.onCorrect(),setTimeout(()=>{this.c1="#611427"},500)):(this.c2="#611427",t.onFail())}),this.setData=(e=>{n=e.ctx,r=e.bounds,n.canvas.addEventListener("mousemove",e=>{if(t.over)return;s=!0;const{x:i,y:r}=function(t,e){const i=t.getBoundingClientRect();return{x:e.pageX-i.left,y:e.pageY-i.top}}(n.canvas,e);this.x=i,this.y=r})}),this.update=(()=>{}),this.intersects=(t=>{if(!s)return!1;return function(t,e){return Math.hypot(t.x-e.x,t.y-e.y)}(this,t)<this.r+t.r})}function Rect({x:t,y:e,w:i,h:s,color:n}){this.isStatic=!0;let r=null;this.render=(()=>{r.fillStyle=n,r.fillRect(t,e,i,s)}),this.setData=(t=>{r=t.ctx})}function Textfield({x:t,y:e,color:i,fontSize:s,text:n=""}){this.text=n,this.prefix="",this.id="TF",this.isStatic=!0;const r=`${s}px sans-serif`;let h=null;this.setText=(t=>{this.text=t}),this.setPrefix=(t=>{this.prefix=t}),this.render=(()=>{h.fillStyle=i,h.font=r,h.fillText(this.prefix+this.text,t,e)}),this.setData=(t=>{h=t.ctx})}function World(){const t=document.querySelector("canvas"),e=t.getContext("2d"),i=.3;let s=[],n=[],r=!0;const h={w:window.innerWidth,h:window.innerHeight},o=[];let l=performance.now(),a=0;function c(h){if(a>3)return;const u=h-l;!function(){for(let t=s.length-1;t>=0;t--){let e=s[t];e.isAlive?(s.forEach(d),e.update()):(s.splice(t,1),e=null)}}(),u>i&&(l=h,e.clearRect(0,0,t.width,t.height),s.forEach(t=>t.render()),n.forEach(t=>t.render()),function(){const t=s.length;o.forEach(e=>e(t))}()),r&&a++,requestAnimationFrame(c)}function d(t,e){t.done||t.isYoung||s.forEach((i,s)=>{if(s<=e||i.done||i.isYoung)return;if(t.intersects(i)){const e=t.vx,s=t.vy;t.bump(i.id,i.vx,i.vy,i.data.isCorrect),i.bump(t.id,e,s,t.data.isCorrect)}})}function u(t,e){return Math.floor(Math.random()*(e-t+1)+t)}t.width=h.w,t.height=h.h,e.textAlign="center",e.textBaseline="middle",this.centerX=h.w/2,this.centerY=h.h/2,this.width=h.w,this.height=h.h,this.add=(t=>{t.isStatic?n.push(t):s.push(t)}),this.stop=(()=>{r=!0}),this.isStopped=(()=>r),this.reset=(()=>{r=!1,s=[],n=[],l=performance.now(),a=0,c(l)}),this.addCallback=(t=>{o.push(t)}),this.spawn=(t=>{const i=function(){let t,e,i,s;switch(u(0,3)){case 0:t=u(0,h.w),e=0,i=u(-4,4),s=u(-4,-1);break;case 1:t=h.w,e=u(0,h.h),i=u(1,4),s=u(-4,4);break;case 2:t=u(0,h.w),e=h.h,i=u(-4,4),s=u(1,4);break;case 3:t=0,e=u(0,h.h),i=u(-4,-1),s=u(-4,4)}return{x:t,y:e,vy:s,vx:i}}();i.ctx=e,i.bounds=h,t.setData(i),this.add(t)})}window.onkeyup=(t=>{world.isStopped()&&(32===t.keyCode?(isHelpShown&&toggleHelp(),init()):27===t.keyCode&&toggleHelp())}),game.setTextfields(scoreText,timerText),game.start(world);
//# sourceMappingURL=g.js.map
