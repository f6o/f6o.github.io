// Compiled by ClojureScript 1.9.946 {:static-fns true, :optimize-constants true}
goog.provide('sample_frontend_using_reagent.tutorial');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('reagent.core');
sample_frontend_using_reagent.tutorial.board_filled_QMARK_ = (function sample_frontend_using_reagent$tutorial$board_filled_QMARK_(board){
return cljs.core.every_QMARK_((function (p1__13748_SHARP_){
return cljs.core.re_matches(/[OX]/,p1__13748_SHARP_);
}),board);
});
sample_frontend_using_reagent.tutorial.culculate_winner = (function sample_frontend_using_reagent$tutorial$culculate_winner(board){
return cljs.core.some((function (line){
return cljs.core.every_QMARK_((function (i){
return (!(clojure.string.blank_QMARK_((board.cljs$core$IFn$_invoke$arity$1 ? board.cljs$core$IFn$_invoke$arity$1(i) : board.call(null,i))))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((board.cljs$core$IFn$_invoke$arity$1 ? board.cljs$core$IFn$_invoke$arity$1(i) : board.call(null,i)),(function (){var G__13750 = cljs.core.first(line);
return (board.cljs$core$IFn$_invoke$arity$1 ? board.cljs$core$IFn$_invoke$arity$1(G__13750) : board.call(null,G__13750));
})()));
}),cljs.core.rest(line));
}),cljs.core.list(cljs.core.list((0),(1),(2)),cljs.core.list((3),(4),(5)),cljs.core.list((6),(7),(8)),cljs.core.list((0),(3),(6)),cljs.core.list((1),(4),(7)),cljs.core.list((2),(5),(8)),cljs.core.list((0),(4),(8)),cljs.core.list((2),(4),(6))));
});
sample_frontend_using_reagent.tutorial.update_board_result = (function sample_frontend_using_reagent$tutorial$update_board_result(state){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state,cljs.core.assoc,cljs.core.cst$kw$result,(cljs.core.truth_(sample_frontend_using_reagent.tutorial.culculate_winner((function (){var G__13752 = cljs.core.cst$kw$squares;
var fexpr__13751 = cljs.core.deref(state);
return (fexpr__13751.cljs$core$IFn$_invoke$arity$1 ? fexpr__13751.cljs$core$IFn$_invoke$arity$1(G__13752) : fexpr__13751.call(null,G__13752));
})()))?cljs.core.cst$kw$done:(cljs.core.truth_(sample_frontend_using_reagent.tutorial.board_filled_QMARK_((function (){var G__13754 = cljs.core.cst$kw$squares;
var fexpr__13753 = cljs.core.deref(state);
return (fexpr__13753.cljs$core$IFn$_invoke$arity$1 ? fexpr__13753.cljs$core$IFn$_invoke$arity$1(G__13754) : fexpr__13753.call(null,G__13754));
})()))?cljs.core.cst$kw$draw:cljs.core.cst$kw$in_DASH_play
)));
});
sample_frontend_using_reagent.tutorial.click_square = (function sample_frontend_using_reagent$tutorial$click_square(i,state,board_history){
var is_x_QMARK_ = (function (){var G__13756 = cljs.core.cst$kw$is_DASH_x_DASH_next_QMARK_;
var fexpr__13755 = cljs.core.deref(state);
return (fexpr__13755.cljs$core$IFn$_invoke$arity$1 ? fexpr__13755.cljs$core$IFn$_invoke$arity$1(G__13756) : fexpr__13755.call(null,G__13756));
})();
var current_board = (function (){var G__13758 = cljs.core.cst$kw$squares;
var fexpr__13757 = cljs.core.deref(state);
return (fexpr__13757.cljs$core$IFn$_invoke$arity$1 ? fexpr__13757.cljs$core$IFn$_invoke$arity$1(G__13758) : fexpr__13757.call(null,G__13758));
})();
if((clojure.string.blank_QMARK_((function (){var fexpr__13768 = (function (){var G__13770 = cljs.core.cst$kw$squares;
var fexpr__13769 = cljs.core.deref(state);
return (fexpr__13769.cljs$core$IFn$_invoke$arity$1 ? fexpr__13769.cljs$core$IFn$_invoke$arity$1(G__13770) : fexpr__13769.call(null,G__13770));
})();
return (fexpr__13768.cljs$core$IFn$_invoke$arity$1 ? fexpr__13768.cljs$core$IFn$_invoke$arity$1(i) : fexpr__13768.call(null,i));
})())) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((function (){var G__13772 = cljs.core.cst$kw$result;
var fexpr__13771 = cljs.core.deref(state);
return (fexpr__13771.cljs$core$IFn$_invoke$arity$1 ? fexpr__13771.cljs$core$IFn$_invoke$arity$1(G__13772) : fexpr__13771.call(null,G__13772));
})(),cljs.core.cst$kw$in_DASH_play))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(board_history,cljs.core.conj,current_board);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state,cljs.core.assoc,cljs.core.cst$kw$squares,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(current_board,i,(cljs.core.truth_(is_x_QMARK_)?"X":"O")));

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state,cljs.core.assoc,cljs.core.cst$kw$is_DASH_x_DASH_next_QMARK_,cljs.core.not(is_x_QMARK_));

return sample_frontend_using_reagent.tutorial.update_board_result(state);
} else {
return null;
}
});
sample_frontend_using_reagent.tutorial.square = (function sample_frontend_using_reagent$tutorial$square(i,state,board_history){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$square,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$value,i,cljs.core.cst$kw$on_DASH_click,(function (){
return sample_frontend_using_reagent.tutorial.click_square(i,state,board_history);
})], null),(function (){var fexpr__13775 = (function (){var G__13777 = cljs.core.cst$kw$squares;
var fexpr__13776 = cljs.core.deref(state);
return (fexpr__13776.cljs$core$IFn$_invoke$arity$1 ? fexpr__13776.cljs$core$IFn$_invoke$arity$1(G__13777) : fexpr__13776.call(null,G__13777));
})();
return (fexpr__13775.cljs$core$IFn$_invoke$arity$1 ? fexpr__13775.cljs$core$IFn$_invoke$arity$1(i) : fexpr__13775.call(null,i));
})()], null);
});
sample_frontend_using_reagent.tutorial.create_new_state = (function sample_frontend_using_reagent$tutorial$create_new_state(){
return reagent.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$squares,cljs.core.vec(cljs.core.repeat.cljs$core$IFn$_invoke$arity$2((9),"")),cljs.core.cst$kw$result,cljs.core.cst$kw$in_DASH_play,cljs.core.cst$kw$is_DASH_x_DASH_next_QMARK_,true], null));
});
sample_frontend_using_reagent.tutorial.show_status = (function sample_frontend_using_reagent$tutorial$show_status(state){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$status,(function (){var G__13778 = (function (){var G__13780 = cljs.core.cst$kw$result;
var fexpr__13779 = cljs.core.deref(state);
return (fexpr__13779.cljs$core$IFn$_invoke$arity$1 ? fexpr__13779.cljs$core$IFn$_invoke$arity$1(G__13780) : fexpr__13779.call(null,G__13780));
})();
var G__13778__$1 = (((G__13778 instanceof cljs.core.Keyword))?G__13778.fqn:null);
switch (G__13778__$1) {
case "done":
return ["Winner:",cljs.core.str.cljs$core$IFn$_invoke$arity$1((cljs.core.truth_((function (){var G__13782 = cljs.core.cst$kw$is_DASH_x_DASH_next_QMARK_;
var fexpr__13781 = cljs.core.deref(state);
return (fexpr__13781.cljs$core$IFn$_invoke$arity$1 ? fexpr__13781.cljs$core$IFn$_invoke$arity$1(G__13782) : fexpr__13781.call(null,G__13782));
})())?"O":"X"))].join('');

break;
case "draw":
return "Draw Game";

break;
case "in-play":
return ["Next Player: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1((cljs.core.truth_((function (){var G__13784 = cljs.core.cst$kw$is_DASH_x_DASH_next_QMARK_;
var fexpr__13783 = cljs.core.deref(state);
return (fexpr__13783.cljs$core$IFn$_invoke$arity$1 ? fexpr__13783.cljs$core$IFn$_invoke$arity$1(G__13784) : fexpr__13783.call(null,G__13784));
})())?"X":"O"))].join('');

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__13778__$1)].join('')));

}
})()], null);
});
sample_frontend_using_reagent.tutorial.update_state = (function sample_frontend_using_reagent$tutorial$update_state(current_state,new_layout){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(current_state,cljs.core.assoc,cljs.core.cst$kw$squares,new_layout);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(current_state,cljs.core.assoc,cljs.core.cst$kw$is_DASH_x_DASH_next_QMARK_,cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__13786_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("X",p1__13786_SHARP_);
}),new_layout)),cljs.core.count(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__13787_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("O",p1__13787_SHARP_);
}),new_layout))));

return sample_frontend_using_reagent.tutorial.update_board_result(current_state);
});
sample_frontend_using_reagent.tutorial.game = (function sample_frontend_using_reagent$tutorial$game(state,board_history){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$game,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$game_DASH_board,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [sample_frontend_using_reagent.tutorial.show_status,state], null),(function (){var iter__8476__auto__ = (function sample_frontend_using_reagent$tutorial$game_$_iter__13788(s__13789){
return (new cljs.core.LazySeq(null,(function (){
var s__13789__$1 = s__13789;
while(true){
var temp__4657__auto__ = cljs.core.seq(s__13789__$1);
if(temp__4657__auto__){
var s__13789__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_(s__13789__$2)){
var c__8474__auto__ = cljs.core.chunk_first(s__13789__$2);
var size__8475__auto__ = cljs.core.count(c__8474__auto__);
var b__13791 = cljs.core.chunk_buffer(size__8475__auto__);
if((function (){var i__13790 = (0);
while(true){
if((i__13790 < size__8475__auto__)){
var r = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__8474__auto__,i__13790);
cljs.core.chunk_append(b__13791,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$board_DASH_row,(function (){var iter__8476__auto__ = ((function (i__13790,r,c__8474__auto__,size__8475__auto__,b__13791,s__13789__$2,temp__4657__auto__){
return (function sample_frontend_using_reagent$tutorial$game_$_iter__13788_$_iter__13792(s__13793){
return (new cljs.core.LazySeq(null,((function (i__13790,r,c__8474__auto__,size__8475__auto__,b__13791,s__13789__$2,temp__4657__auto__){
return (function (){
var s__13793__$1 = s__13793;
while(true){
var temp__4657__auto____$1 = cljs.core.seq(s__13793__$1);
if(temp__4657__auto____$1){
var s__13793__$2 = temp__4657__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__13793__$2)){
var c__8474__auto____$1 = cljs.core.chunk_first(s__13793__$2);
var size__8475__auto____$1 = cljs.core.count(c__8474__auto____$1);
var b__13795 = cljs.core.chunk_buffer(size__8475__auto____$1);
if((function (){var i__13794 = (0);
while(true){
if((i__13794 < size__8475__auto____$1)){
var c = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__8474__auto____$1,i__13794);
cljs.core.chunk_append(b__13795,cljs.core.with_meta(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [sample_frontend_using_reagent.tutorial.square,c,state,board_history], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,["cell",cljs.core.str.cljs$core$IFn$_invoke$arity$1(c)].join('')], null)));

var G__13810 = (i__13794 + (1));
i__13794 = G__13810;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__13795),sample_frontend_using_reagent$tutorial$game_$_iter__13788_$_iter__13792(cljs.core.chunk_rest(s__13793__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__13795),null);
}
} else {
var c = cljs.core.first(s__13793__$2);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [sample_frontend_using_reagent.tutorial.square,c,state,board_history], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,["cell",cljs.core.str.cljs$core$IFn$_invoke$arity$1(c)].join('')], null)),sample_frontend_using_reagent$tutorial$game_$_iter__13788_$_iter__13792(cljs.core.rest(s__13793__$2)));
}
} else {
return null;
}
break;
}
});})(i__13790,r,c__8474__auto__,size__8475__auto__,b__13791,s__13789__$2,temp__4657__auto__))
,null,null));
});})(i__13790,r,c__8474__auto__,size__8475__auto__,b__13791,s__13789__$2,temp__4657__auto__))
;
return iter__8476__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$2(r,(r + (3))));
})()], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,["row",cljs.core.str.cljs$core$IFn$_invoke$arity$1(r)].join('')], null)));

var G__13811 = (i__13790 + (1));
i__13790 = G__13811;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__13791),sample_frontend_using_reagent$tutorial$game_$_iter__13788(cljs.core.chunk_rest(s__13789__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__13791),null);
}
} else {
var r = cljs.core.first(s__13789__$2);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$board_DASH_row,(function (){var iter__8476__auto__ = ((function (r,s__13789__$2,temp__4657__auto__){
return (function sample_frontend_using_reagent$tutorial$game_$_iter__13788_$_iter__13796(s__13797){
return (new cljs.core.LazySeq(null,((function (r,s__13789__$2,temp__4657__auto__){
return (function (){
var s__13797__$1 = s__13797;
while(true){
var temp__4657__auto____$1 = cljs.core.seq(s__13797__$1);
if(temp__4657__auto____$1){
var s__13797__$2 = temp__4657__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__13797__$2)){
var c__8474__auto__ = cljs.core.chunk_first(s__13797__$2);
var size__8475__auto__ = cljs.core.count(c__8474__auto__);
var b__13799 = cljs.core.chunk_buffer(size__8475__auto__);
if((function (){var i__13798 = (0);
while(true){
if((i__13798 < size__8475__auto__)){
var c = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__8474__auto__,i__13798);
cljs.core.chunk_append(b__13799,cljs.core.with_meta(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [sample_frontend_using_reagent.tutorial.square,c,state,board_history], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,["cell",cljs.core.str.cljs$core$IFn$_invoke$arity$1(c)].join('')], null)));

var G__13812 = (i__13798 + (1));
i__13798 = G__13812;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__13799),sample_frontend_using_reagent$tutorial$game_$_iter__13788_$_iter__13796(cljs.core.chunk_rest(s__13797__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__13799),null);
}
} else {
var c = cljs.core.first(s__13797__$2);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [sample_frontend_using_reagent.tutorial.square,c,state,board_history], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,["cell",cljs.core.str.cljs$core$IFn$_invoke$arity$1(c)].join('')], null)),sample_frontend_using_reagent$tutorial$game_$_iter__13788_$_iter__13796(cljs.core.rest(s__13797__$2)));
}
} else {
return null;
}
break;
}
});})(r,s__13789__$2,temp__4657__auto__))
,null,null));
});})(r,s__13789__$2,temp__4657__auto__))
;
return iter__8476__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$2(r,(r + (3))));
})()], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,["row",cljs.core.str.cljs$core$IFn$_invoke$arity$1(r)].join('')], null)),sample_frontend_using_reagent$tutorial$game_$_iter__13788(cljs.core.rest(s__13789__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__8476__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$3((0),(9),(3)));
})()], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$game_DASH_info,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4,"History"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ol$history,(function (){var iter__8476__auto__ = (function sample_frontend_using_reagent$tutorial$game_$_iter__13800(s__13801){
return (new cljs.core.LazySeq(null,(function (){
var s__13801__$1 = s__13801;
while(true){
var temp__4657__auto__ = cljs.core.seq(s__13801__$1);
if(temp__4657__auto__){
var s__13801__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_(s__13801__$2)){
var c__8474__auto__ = cljs.core.chunk_first(s__13801__$2);
var size__8475__auto__ = cljs.core.count(c__8474__auto__);
var b__13803 = cljs.core.chunk_buffer(size__8475__auto__);
if((function (){var i__13802 = (0);
while(true){
if((i__13802 < size__8475__auto__)){
var vec__13804 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__8474__auto__,i__13802);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13804,(0),null);
var h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13804,(1),null);
cljs.core.chunk_append(b__13803,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,((function (i__13802,vec__13804,i,h,c__8474__auto__,size__8475__auto__,b__13803,s__13801__$2,temp__4657__auto__){
return (function (e){
cljs.core.reset_BANG_(board_history,cljs.core.subvec.cljs$core$IFn$_invoke$arity$3(cljs.core.deref(board_history),(0),i));

return sample_frontend_using_reagent.tutorial.update_state(state,h);
});})(i__13802,vec__13804,i,h,c__8474__auto__,size__8475__auto__,b__13803,s__13801__$2,temp__4657__auto__))
], null),["Go to ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(i,(0)))?"game start":["move #",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join('')))].join('')], null)], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,i], null)));

var G__13813 = (i__13802 + (1));
i__13802 = G__13813;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__13803),sample_frontend_using_reagent$tutorial$game_$_iter__13800(cljs.core.chunk_rest(s__13801__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__13803),null);
}
} else {
var vec__13807 = cljs.core.first(s__13801__$2);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13807,(0),null);
var h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13807,(1),null);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,((function (vec__13807,i,h,s__13801__$2,temp__4657__auto__){
return (function (e){
cljs.core.reset_BANG_(board_history,cljs.core.subvec.cljs$core$IFn$_invoke$arity$3(cljs.core.deref(board_history),(0),i));

return sample_frontend_using_reagent.tutorial.update_state(state,h);
});})(vec__13807,i,h,s__13801__$2,temp__4657__auto__))
], null),["Go to ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(i,(0)))?"game start":["move #",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join('')))].join('')], null)], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,i], null)),sample_frontend_using_reagent$tutorial$game_$_iter__13800(cljs.core.rest(s__13801__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__8476__auto__(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,cljs.core.deref(board_history)));
})()], null)], null)], null);
});
