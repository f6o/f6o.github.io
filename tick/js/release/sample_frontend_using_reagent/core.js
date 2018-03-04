// Compiled by ClojureScript 1.9.946 {:static-fns true, :optimize-constants true}
goog.provide('sample_frontend_using_reagent.core');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('sample_frontend_using_reagent.tutorial');
goog.require('reagent.core');
sample_frontend_using_reagent.core.todo = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core._conj(cljs.core._conj(cljs.core._conj(cljs.core.List.EMPTY,"Cleaning seats"),"Buying the milk"),"Cutting edges"));
sample_frontend_using_reagent.core.del_link = (function sample_frontend_using_reagent$core$del_link(){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$a$del,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$href,"#",cljs.core.cst$kw$on_DASH_click,(function (self){
return cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([self], 0));
})], null),"-"], null);
});
sample_frontend_using_reagent.core.todo_item = (function sample_frontend_using_reagent$core$todo_item(item){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$item,item], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,item], null)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [sample_frontend_using_reagent.core.del_link], null)], null);
});
sample_frontend_using_reagent.core.todo_component = (function sample_frontend_using_reagent$core$todo_component(){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ul,(function (){var iter__8476__auto__ = (function sample_frontend_using_reagent$core$todo_component_$_iter__13816(s__13817){
return (new cljs.core.LazySeq(null,(function (){
var s__13817__$1 = s__13817;
while(true){
var temp__4657__auto__ = cljs.core.seq(s__13817__$1);
if(temp__4657__auto__){
var s__13817__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_(s__13817__$2)){
var c__8474__auto__ = cljs.core.chunk_first(s__13817__$2);
var size__8475__auto__ = cljs.core.count(c__8474__auto__);
var b__13819 = cljs.core.chunk_buffer(size__8475__auto__);
if((function (){var i__13818 = (0);
while(true){
if((i__13818 < size__8475__auto__)){
var item = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__8474__auto__,i__13818);
cljs.core.chunk_append(b__13819,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [sample_frontend_using_reagent.core.todo_item,item], null));

var G__13820 = (i__13818 + (1));
i__13818 = G__13820;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__13819),sample_frontend_using_reagent$core$todo_component_$_iter__13816(cljs.core.chunk_rest(s__13817__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__13819),null);
}
} else {
var item = cljs.core.first(s__13817__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [sample_frontend_using_reagent.core.todo_item,item], null),sample_frontend_using_reagent$core$todo_component_$_iter__13816(cljs.core.rest(s__13817__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__8476__auto__(cljs.core.deref(sample_frontend_using_reagent.core.todo));
})()], null);
});
sample_frontend_using_reagent.core.global_counter = reagent.core.atom.cljs$core$IFn$_invoke$arity$1((0));
sample_frontend_using_reagent.core.count_up_link = (function sample_frontend_using_reagent$core$count_up_link(counter){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$a$up,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$href,"#",cljs.core.cst$kw$on_DASH_click,(function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(counter,cljs.core.inc);
})], null),"add"], null);
});
sample_frontend_using_reagent.core.counter_component = (function sample_frontend_using_reagent$core$counter_component(counter){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,"Now:",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$count,cljs.core.deref(counter)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [sample_frontend_using_reagent.core.count_up_link,counter], null)], null);
});
sample_frontend_using_reagent.core.mount_root = (function sample_frontend_using_reagent$core$mount_root(){
return reagent.core.render.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [sample_frontend_using_reagent.tutorial.game,sample_frontend_using_reagent.tutorial.create_new_state(),reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY)], null),document.getElementById("app"));
});
sample_frontend_using_reagent.core.init_BANG_ = (function sample_frontend_using_reagent$core$init_BANG_(){
return sample_frontend_using_reagent.core.mount_root();
});
