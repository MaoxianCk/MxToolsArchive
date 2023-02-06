import{c as j,a as s,b as _,d as m,e as I,u as O,f as E,g as P,h as R,i as F,j as a,F as p,_ as z,r as L,o as h,k as y,w as u,l as $,t as b,m as S,n as T,p as M,q as V,s as D,v,x as w,y as C,z as N,A as W,B as q,C as A}from"./index-cd732ffa.js";const G=t=>{const{textColor1:e,textColor2:l,fontWeightStrong:o,fontSize:c}=t;return{fontSize:c,titleTextColor:e,textColor:l,titleFontWeight:o}},H={name:"Thing",common:j,self:G},J=H,K=s("thing",`
 display: flex;
 transition: color .3s var(--n-bezier);
 font-size: var(--n-font-size);
 color: var(--n-text-color);
`,[s("thing-avatar",`
 margin-right: 12px;
 margin-top: 2px;
 `),s("thing-avatar-header-wrapper",`
 display: flex;
 flex-wrap: nowrap;
 `,[s("thing-header-wrapper",`
 flex: 1;
 `)]),s("thing-main",`
 flex-grow: 1;
 `,[s("thing-header",`
 display: flex;
 margin-bottom: 4px;
 justify-content: space-between;
 align-items: center;
 `,[_("title",`
 font-size: 16px;
 font-weight: var(--n-title-font-weight);
 transition: color .3s var(--n-bezier);
 color: var(--n-title-text-color);
 `)]),_("description",[m("&:not(:last-child)",`
 margin-bottom: 4px;
 `)]),_("content",[m("&:not(:first-child)",`
 margin-top: 12px;
 `)]),_("footer",[m("&:not(:first-child)",`
 margin-top: 12px;
 `)]),_("action",[m("&:not(:first-child)",`
 margin-top: 12px;
 `)])])]),Q=Object.assign(Object.assign({},E.props),{title:String,titleExtra:String,description:String,descriptionStyle:[String,Object],content:String,contentStyle:[String,Object],contentIndented:Boolean}),U=I({name:"Thing",props:Q,setup(t,{slots:e}){const{mergedClsPrefixRef:l,inlineThemeDisabled:o,mergedRtlRef:c}=O(t),d=E("Thing","-thing",K,J,t,l),x=P("Thing",c,l),g=R(()=>{const{self:{titleTextColor:r,textColor:n,titleFontWeight:f,fontSize:k},common:{cubicBezierEaseInOut:B}}=d.value;return{"--n-bezier":B,"--n-font-size":k,"--n-text-color":n,"--n-title-font-weight":f,"--n-title-text-color":r}}),i=o?F("thing",void 0,g,t):void 0;return()=>{var r;const{value:n}=l,f=x?x.value:!1;return(r=i==null?void 0:i.onRender)===null||r===void 0||r.call(i),a("div",{class:[`${n}-thing`,i==null?void 0:i.themeClass,f&&`${n}-thing--rtl`],style:o?void 0:g.value},e.avatar&&t.contentIndented?a("div",{class:`${n}-thing-avatar`},e.avatar()):null,a("div",{class:`${n}-thing-main`},!t.contentIndented&&(e.header||t.title||e["header-extra"]||t.titleExtra||e.avatar)?a("div",{class:`${n}-thing-avatar-header-wrapper`},e.avatar?a("div",{class:`${n}-thing-avatar`},e.avatar()):null,e.header||t.title||e["header-extra"]||t.titleExtra?a("div",{class:`${n}-thing-header-wrapper`},a("div",{class:`${n}-thing-header`},e.header||t.title?a("div",{class:`${n}-thing-header__title`},e.header?e.header():t.title):null,e["header-extra"]||t.titleExtra?a("div",{class:`${n}-thing-header__extra`},e["header-extra"]?e["header-extra"]():t.titleExtra):null),e.description||t.description?a("div",{class:`${n}-thing-main__description`,style:t.descriptionStyle},e.description?e.description():t.description):null):null):a(p,null,e.header||t.title||e["header-extra"]||t.titleExtra?a("div",{class:`${n}-thing-header`},e.header||t.title?a("div",{class:`${n}-thing-header__title`},e.header?e.header():t.title):null,e["header-extra"]||t.titleExtra?a("div",{class:`${n}-thing-header__extra`},e["header-extra"]?e["header-extra"]():t.titleExtra):null):null,e.description||t.description?a("div",{class:`${n}-thing-main__description`,style:t.descriptionStyle},e.description?e.description():t.description):null),e.default||t.content?a("div",{class:`${n}-thing-main__content`,style:t.contentStyle},e.default?e.default():t.content):null,e.footer?a("div",{class:`${n}-thing-main__footer`},e.footer()):null,e.action?a("div",{class:`${n}-thing-main__action`},e.action()):null))}}});const X={class:"module-tool-card-desc"},Y={__name:"Module",props:{module:{type:Object,default(){return null}}},setup(t){return(e,l)=>{const o=M,c=L("router-link"),d=U;return h(),y(d,{ref:"cardRef",class:"module-tool-card"},{header:u(()=>[$(b(t.module.name),1)]),"header-extra":u(()=>[S(c,{to:t.module.meta.routePath,class:"clear-a-style"},{default:u(()=>[S(o,{type:"primary",size:"tiny",round:""},{default:u(()=>[$("Go")]),_:1})]),_:1},8,["to"])]),default:u(()=>[T("span",X,b(t.module.meta.info.description),1)]),_:1},512)}}},Z=z(Y,[["__scopeId","data-v-36edcc7e"]]);const ee={class:"module-box"},te={class:"module-box-type"},ne={__name:"index",setup(t){const e=V(),l=e.getFiltered(),{filterPattern:o}=D(e),c=R(()=>d=>N(d,o.value));return(d,x)=>{const g=W;return h(),v("div",ee,[(h(!0),v(p,null,w(C(l).children,i=>(h(),y(g,{key:i.meta.routePath,title:i.name},{default:u(()=>[T("div",te,[(h(!0),v(p,null,w(i.children,r=>q((h(),y(Z,{key:r.path,module:r},null,8,["module"])),[[A,C(c)(r)]])),128))])]),_:2},1032,["title"]))),128))])}}},ie=z(ne,[["__scopeId","data-v-410eb796"]]);export{ie as default};
