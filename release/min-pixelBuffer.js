var pixelBuffer_prototype=function(){"use strict";!function(t){var r,a,i,e;t._createTables=function(){i=function(){this.r=0,this.g=0,this.b=0,this.a=0,this.next=null},a=[512,512,456,512,328,456,335,512,405,328,271,456,388,335,292,512,454,405,364,328,298,271,496,456,420,388,360,335,312,292,273,512,482,454,428,405,383,364,345,328,312,298,284,271,259,496,475,456,437,420,404,388,374,360,347,335,323,312,302,292,282,273,265,512,497,482,468,454,441,428,417,405,394,383,373,364,354,345,337,328,320,312,305,298,291,284,278,271,265,259,507,496,485,475,465,456,446,437,428,420,412,404,396,388,381,374,367,360,354,347,341,335,329,323,318,312,307,302,297,292,287,282,278,273,269,265,261,512,505,497,489,482,475,468,461,454,447,441,435,428,422,417,411,405,399,394,389,383,378,373,368,364,359,354,350,345,341,337,332,328,324,320,316,312,309,305,301,298,294,291,287,284,281,278,274,271,268,265,262,259,257,507,501,496,491,485,480,475,470,465,460,456,451,446,442,437,433,428,424,420,416,412,408,404,400,396,392,388,385,381,377,374,370,367,363,360,357,354,350,347,344,341,338,335,332,329,326,323,320,318,315,312,310,307,304,302,299,297,294,292,289,287,285,282,280,278,275,273,271,269,267,265,263,261,259],e=[9,11,12,13,13,14,14,15,15,15,15,16,16,16,16,17,17,17,17,17,17,17,18,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,19,19,19,19,19,19,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24]},t._stackBlurRGB=function(t,r,n,f){if(!(isNaN(f)||1>f)){f|=0;var o,s,u,h,l,c,p,v,_,x,g,b,d,w,I,B,m,y,M,C,F=t.data,R=f+f+1,k=r-1,A=n-1,E=f+1,G=E*(E+1)/2,N=new i,O=N;for(u=1;R>u;u++)if(O=O.next=new i,u==E)var j=O;O.next=N;var D=null,P=null;p=c=0;var T=a[f],H=e[f];for(s=0;n>s;s++){for(w=I=B=v=_=x=0,g=E*(m=F[c]),b=E*(y=F[c+1]),d=E*(M=F[c+2]),v+=G*m,_+=G*y,x+=G*M,O=N,u=0;E>u;u++)O.r=m,O.g=y,O.b=M,O=O.next;for(u=1;E>u;u++)h=c+((u>k?k:u)<<2),v+=(O.r=m=F[h])*(C=E-u),_+=(O.g=y=F[h+1])*C,x+=(O.b=M=F[h+2])*C,w+=m,I+=y,B+=M,O=O.next;for(D=N,P=j,o=0;r>o;o++)F[c]=v*T>>H,F[c+1]=_*T>>H,F[c+2]=x*T>>H,v-=g,_-=b,x-=d,g-=D.r,b-=D.g,d-=D.b,h=p+((h=o+f+1)<k?h:k)<<2,w+=D.r=F[h],I+=D.g=F[h+1],B+=D.b=F[h+2],v+=w,_+=I,x+=B,D=D.next,g+=m=P.r,b+=y=P.g,d+=M=P.b,w-=m,I-=y,B-=M,P=P.next,c+=4;p+=r}for(o=0;r>o;o++){for(I=B=w=_=x=v=0,c=o<<2,g=E*(m=F[c]),b=E*(y=F[c+1]),d=E*(M=F[c+2]),v+=G*m,_+=G*y,x+=G*M,O=N,u=0;E>u;u++)O.r=m,O.g=y,O.b=M,O=O.next;for(l=r,u=1;f>=u;u++)c=l+o<<2,v+=(O.r=m=F[c])*(C=E-u),_+=(O.g=y=F[c+1])*C,x+=(O.b=M=F[c+2])*C,w+=m,I+=y,B+=M,O=O.next,A>u&&(l+=r);for(c=o,D=N,P=j,s=0;n>s;s++)h=c<<2,F[h]=v*T>>H,F[h+1]=_*T>>H,F[h+2]=x*T>>H,v-=g,_-=b,x-=d,g-=D.r,b-=D.g,d-=D.b,h=o+((h=s+E)<A?h:A)*r<<2,v+=w+=D.r=F[h],_+=I+=D.g=F[h+1],x+=B+=D.b=F[h+2],D=D.next,g+=m=P.r,b+=y=P.g,d+=M=P.b,w-=m,I-=y,B-=M,P=P.next,c+=r}}},t._stackBlurRGBA=function(t,r,n,f){if(!(isNaN(f)||1>f)){f|=0;var o,s,u,h,l,c,p,v,_,x,g,b,d,w,I,B,m,y,M,C,F,R,k,A,E=t.data,G=f+f+1,N=r-1,O=n-1,j=f+1,D=j*(j+1)/2,P=new i,T=P;for(u=1;G>u;u++)if(T=T.next=new i,u==j)var H=T;T.next=P;var S=null,W=null;p=c=0;var q=a[f],z=e[f];for(s=0;n>s;s++){for(B=m=y=M=v=_=x=g=0,b=j*(C=E[c]),d=j*(F=E[c+1]),w=j*(R=E[c+2]),I=j*(k=E[c+3]),v+=D*C,_+=D*F,x+=D*R,g+=D*k,T=P,u=0;j>u;u++)T.r=C,T.g=F,T.b=R,T.a=k,T=T.next;for(u=1;j>u;u++)h=c+((u>N?N:u)<<2),v+=(T.r=C=E[h])*(A=j-u),_+=(T.g=F=E[h+1])*A,x+=(T.b=R=E[h+2])*A,g+=(T.a=k=E[h+3])*A,B+=C,m+=F,y+=R,M+=k,T=T.next;for(S=P,W=H,o=0;r>o;o++)E[c+3]=k=g*q>>z,0!=k?(k=255/k,E[c]=(v*q>>z)*k,E[c+1]=(_*q>>z)*k,E[c+2]=(x*q>>z)*k):E[c]=E[c+1]=E[c+2]=0,v-=b,_-=d,x-=w,g-=I,b-=S.r,d-=S.g,w-=S.b,I-=S.a,h=p+((h=o+f+1)<N?h:N)<<2,B+=S.r=E[h],m+=S.g=E[h+1],y+=S.b=E[h+2],M+=S.a=E[h+3],v+=B,_+=m,x+=y,g+=M,S=S.next,b+=C=W.r,d+=F=W.g,w+=R=W.b,I+=k=W.a,B-=C,m-=F,y-=R,M-=k,W=W.next,c+=4;p+=r}for(o=0;r>o;o++){for(m=y=M=B=_=x=g=v=0,c=o<<2,b=j*(C=E[c]),d=j*(F=E[c+1]),w=j*(R=E[c+2]),I=j*(k=E[c+3]),v+=D*C,_+=D*F,x+=D*R,g+=D*k,T=P,u=0;j>u;u++)T.r=C,T.g=F,T.b=R,T.a=k,T=T.next;for(l=r,u=1;f>=u;u++)c=l+o<<2,v+=(T.r=C=E[c])*(A=j-u),_+=(T.g=F=E[c+1])*A,x+=(T.b=R=E[c+2])*A,g+=(T.a=k=E[c+3])*A,B+=C,m+=F,y+=R,M+=k,T=T.next,O>u&&(l+=r);for(c=o,S=P,W=H,s=0;n>s;s++)h=c<<2,E[h+3]=k=g*q>>z,k>0?(k=255/k,E[h]=(v*q>>z)*k,E[h+1]=(_*q>>z)*k,E[h+2]=(x*q>>z)*k):E[h]=E[h+1]=E[h+2]=0,v-=b,_-=d,x-=w,g-=I,b-=S.r,d-=S.g,w-=S.b,I-=S.a,h=o+((h=s+j)<O?h:O)*r<<2,v+=B+=S.r=E[h],_+=m+=S.g=E[h+1],x+=y+=S.b=E[h+2],g+=M+=S.a=E[h+3],S=S.next,b+=C=W.r,d+=F=W.g,w+=R=W.b,I+=k=W.a,B-=C,m-=F,y-=R,M-=k,W=W.next,c+=r}}},t.applyFilters=function(t,r){var a=this;r.forEach(function(r){var i=r[0],e=r[1];a[i]&&a[i](t,e)})},t.bc=function(t,r){this.brightnessContrast(t,r)},t.blur=function(t,r){r.alphablur?this._stackBlurRGBA(t,t.width,t.height,r.blur||3):this._stackBlurRGB(t,t.width,t.height,r.blur||3)},t.brightnessContrast=function(t,r){var a=t.data,i=t.width,e=t.height,n=150*(parseInt(r.brightness,10)||0),f=150*(parseFloat(r.contrast)||0),o=!1;if(o)n=Math.min(150,Math.max(-150,n));else var s=1+Math.min(150,Math.max(-150,n))/150;f=Math.max(0,f+1);var u,h,l,c,p=i*e,v=4*p;1!=f?o?(l=f,c=(n-128)*f+128):(l=s*f,c=128*-f+128):o?(l=1,c=n):(l=s,c=0);for(var _,x,g;p--;)a[v]=(_=a[v-=4]*l+c)>255?255:0>_?0:_,a[u]=(x=a[u=v+1]*l+c)>255?255:0>x?0:x,a[h]=(g=a[h=v+2]*l+c)>255?255:0>g?0:g;return!0},t.createRenderBuffer=function(t,r,a){var i=document.createElement("canvas");i.setAttribute("width",t),i.setAttribute("height",r);var e=i.getContext("2d");return a&&e.drawImage(a,0,0),{canvas:i,buffer:e.getImageData(0,0,t,r)}},t.grayscale=function(t,r){r=r||{};for(var a=r.grayscale||1,i=t.width,e=t.height,n=t.data,f=0,o=i*e*4;o>f;){var s=n[f],u=n[f+1],h=n[f+2],l=Math.floor(.2126*s+.7152*u+.0722*h);s=(1-a)*s+a*l,u=(1-a)*u+a*l,h=(1-a)*h+a*l,n[f]=Math.max(0,Math.min(s,255)),n[f+1]=Math.max(0,Math.min(u,255)),n[f+2]=Math.max(0,Math.min(h,255)),f+=4}},t.hsl=function(t,r){var a=t.data,i=t.width,e=t.height,n=360*parseFloat(r.hue,10)||0,f=255*(parseFloat(r.saturation,10)||0),o=255*(parseFloat(r.lightness,10)||0);if(0>f)var s=1+f;else var s=1+2*f;n=n%360/360;for(var u=6*n,h=255*o,l=1+o,c=1-o,p=i*e,v=4*p,_=v+1,x=v+2;p--;){var g=a[v-=4],b=a[_=v+1],d=a[x=v+2];if(0!=n||0!=f){var w=g;b>w&&(w=b),d>w&&(w=d);var I=g;I>b&&(I=b),I>d&&(I=d);var B=w-I,m=(I+w)/510;if(m>0&&B>0){if(.5>=m){var y=B/(w+I)*s;y>1&&(y=1);var M=m*(1+y)}else{var y=B/(510-w-I)*s;y>1&&(y=1);var M=m+y-m*y}if(g==w)if(b==I)var e=5+(w-d)/B+u;else var e=1-(w-b)/B+u;else if(b==w)if(d==I)var e=1+(w-g)/B+u;else var e=3-(w-d)/B+u;else if(g==I)var e=3+(w-b)/B+u;else var e=5-(w-g)/B+u;0>e&&(e+=6),e>=6&&(e-=6);var C=m+m-M,F=e>>0;0==F?(g=255*M,b=255*(C+(M-C)*(e-F)),d=255*C):1==F?(g=255*(M-(M-C)*(e-F)),b=255*M,d=255*C):2==F?(g=255*C,b=255*M,d=255*(C+(M-C)*(e-F))):3==F?(g=255*C,b=255*(M-(M-C)*(e-F)),d=255*M):4==F?(g=255*(C+(M-C)*(e-F)),b=255*C,d=255*M):5==F&&(g=255*M,b=255*C,d=255*(M-(M-C)*(e-F)))}}0>o?(g*=l,b*=l,d*=l):o>0&&(g=g*c+h,b=b*c+h,d=d*c+h),a[v]=0>g?0:g>255?255:g,a[_]=0>b?0:b>255?255:b,a[x]=0>d?0:d>255?255:d}},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(){this.filterCanvas=null,this.maxW=0,this.maxH=0,r||(this._createTables(),r=!0)}),t.output=function(t,r){if(r.outputCanvas){var a=r.outputCanvas.getContext("2d");a.putImageData(t,0,0)}},t.sepia=function(t,r){var a=t.width,i=t.height,e=4*a,n=i,f=r.sepia||1;f||(f=1);var o=t.data;do{var s=(n-1)*e,u=a;do{var h,l,c,p=s+4*(u-1),v=o[p],_=o[p+1],x=o[p+2],h=(1-f)*v+f*(.393*v+.769*_+.189*x),l=(1-f)*_+f*(.349*v+.686*_+.168*x),c=(1-f)*x+f*(.272*v+.534*_+.131*x);0>h&&(h=0),h>255&&(h=255),0>l&&(l=0),l>255&&(l=255),0>c&&(c=0),c>255&&(c=255),o[p]=h,o[p+1]=l,o[p+2]=c}while(--u)}while(--n)}}(this),function(t){t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(){})}(this)},pixelBuffer=function(t,r,a,i,e,n,f,o){if(!(this instanceof pixelBuffer))return new pixelBuffer(t,r,a,i,e,n,f,o);var s=[t,r,a,i,e,n,f,o];if(this.__factoryClass){var u,h=this;if(this.__factoryClass.forEach(function(t){u=t.apply(h,s)}),"[object Function]"==Object.prototype.toString.call(u)){if(u._classInfo.name!=pixelBuffer._classInfo.name)return new u(t,r,a,i,e,n,f,o)}else if(u)return u}if(this.__traitInit){var h=this;this.__traitInit.forEach(function(t){t.apply(h,s)})}else"function"==typeof this.init&&this.init.apply(this,s)};pixelBuffer._classInfo={name:"pixelBuffer"},pixelBuffer.prototype=new pixelBuffer_prototype,"undefined"!=typeof window&&(window.pixelBuffer=pixelBuffer),"undefined"!=typeof window&&(window.pixelBuffer_prototype=pixelBuffer_prototype);