// Compiled by ClojureScript 1.9.946 {:static-fns true, :optimize-constants true}
goog.provide('reagent.debug');
goog.require('cljs.core');
goog.require('cljs.core.constants');
reagent.debug.has_console = typeof console !== 'undefined';
reagent.debug.tracking = false;
if(typeof reagent.debug.warnings !== 'undefined'){
} else {
reagent.debug.warnings = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
}
if(typeof reagent.debug.track_console !== 'undefined'){
} else {
reagent.debug.track_console = (function (){var o = ({});
o.warn = ((function (o){
return (function() { 
var G__13251__delegate = function (args){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(reagent.debug.warnings,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$warn], null),cljs.core.conj,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,args)], 0));
};
var G__13251 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__13252__i = 0, G__13252__a = new Array(arguments.length -  0);
while (G__13252__i < G__13252__a.length) {G__13252__a[G__13252__i] = arguments[G__13252__i + 0]; ++G__13252__i;}
  args = new cljs.core.IndexedSeq(G__13252__a,0,null);
} 
return G__13251__delegate.call(this,args);};
G__13251.cljs$lang$maxFixedArity = 0;
G__13251.cljs$lang$applyTo = (function (arglist__13253){
var args = cljs.core.seq(arglist__13253);
return G__13251__delegate(args);
});
G__13251.cljs$core$IFn$_invoke$arity$variadic = G__13251__delegate;
return G__13251;
})()
;})(o))
;

o.error = ((function (o){
return (function() { 
var G__13254__delegate = function (args){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(reagent.debug.warnings,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$error], null),cljs.core.conj,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,args)], 0));
};
var G__13254 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__13255__i = 0, G__13255__a = new Array(arguments.length -  0);
while (G__13255__i < G__13255__a.length) {G__13255__a[G__13255__i] = arguments[G__13255__i + 0]; ++G__13255__i;}
  args = new cljs.core.IndexedSeq(G__13255__a,0,null);
} 
return G__13254__delegate.call(this,args);};
G__13254.cljs$lang$maxFixedArity = 0;
G__13254.cljs$lang$applyTo = (function (arglist__13256){
var args = cljs.core.seq(arglist__13256);
return G__13254__delegate(args);
});
G__13254.cljs$core$IFn$_invoke$arity$variadic = G__13254__delegate;
return G__13254;
})()
;})(o))
;

return o;
})();
}
reagent.debug.track_warnings = (function reagent$debug$track_warnings(f){
reagent.debug.tracking = true;

cljs.core.reset_BANG_(reagent.debug.warnings,null);

(f.cljs$core$IFn$_invoke$arity$0 ? f.cljs$core$IFn$_invoke$arity$0() : f.call(null));

var warns = cljs.core.deref(reagent.debug.warnings);
cljs.core.reset_BANG_(reagent.debug.warnings,null);

reagent.debug.tracking = false;

return warns;
});
