/*! For license information please see gridstack-jq.js.LICENSE.txt */ ! function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.GridStack = t() : e.GridStack = t()
}(self, (function() {
    return (e = {
        21: (e, t, i) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            const n = i(334),
                s = i(270),
                o = i(593);
            class r extends n.GridStackDDI {
                static get() {
                    return n.GridStackDDI.get()
                }
                remove(e) {
                    return this.draggable(e, "destroy").resizable(e, "destroy"), e.gridstackNode && delete e.gridstackNode._initDD, this
                }
            }
            t.GridStackDD = r, s.GridStack.prototype._setupAcceptWidget = function() {
                if (this.opts.staticGrid) return this;
                let e, t, i, n = (n, s, a) => {
                    let l = s.gridstackNode;
                    if (!l) return;
                    let h = (a = a || s).getBoundingClientRect(),
                        u = h.left - e.left,
                        c = h.top - e.top,
                        d = {
                            position: {
                                top: c,
                                left: u
                            }
                        };
                    if (l._temporaryRemoved) {
                        if (l.x = Math.max(0, Math.round(u / i)), l.y = Math.max(0, Math.round(c / t)), delete l.autoPosition, this.engine.nodeBoundFix(l), !this.engine.willItFit(l)) {
                            if (l.autoPosition = !0, !this.engine.willItFit(l)) return void r.get().off(s, "drag");
                            l._willFitPos && (o.Utils.copyPos(l, l._willFitPos), delete l._willFitPos)
                        }
                        this._onStartMoving(a, n, d, l, i, t)
                    } else this._dragOrResize(a, n, d, l, i, t)
                };
                return r.get().droppable(this.el, {
                    accept: e => {
                        let t = e.gridstackNode;
                        if (t && t.grid === this) return !0;
                        if (!this.opts.acceptWidgets) return !1;
                        let i = !0;
                        if ("function" == typeof this.opts.acceptWidgets) i = this.opts.acceptWidgets(e);
                        else {
                            let t = !0 === this.opts.acceptWidgets ? ".grid-stack-item" : this.opts.acceptWidgets;
                            i = e.matches(t)
                        }
                        if (i && t && this.opts.maxRow) {
                            let e = {
                                w: t.w,
                                h: t.h,
                                minW: t.minW,
                                minH: t.minH
                            };
                            i = this.engine.willItFit(e)
                        }
                        return i
                    }
                }).on(this.el, "dropover", ((s, o, a) => {
                    let l = o.gridstackNode;
                    if (l && l.grid === this && !l._temporaryRemoved) return !1;
                    l && l.grid && l.grid !== this && !l._temporaryRemoved && l.grid._leave(o.gridstackNode, o, a, !0);
                    let h = this.el.getBoundingClientRect();
                    e = {
                        top: h.top,
                        left: h.left
                    }, i = this.cellWidth(), t = this.getCellHeight(!0), l || (l = this._readAttr(o)), l.grid || (l._isExternal = !0, o.gridstackNode = l), a = a || o;
                    let u = l.w || Math.round(a.offsetWidth / i) || 1,
                        c = l.h || Math.round(a.offsetHeight / t) || 1;
                    return l.grid && l.grid !== this ? (o._gridstackNodeOrig || (o._gridstackNodeOrig = l), o.gridstackNode = l = Object.assign(Object.assign({}, l), {
                        w: u,
                        h: c,
                        grid: this
                    }), this.engine.cleanupNode(l).nodeBoundFix(l), l._initDD = l._isExternal = l._temporaryRemoved = !0) : (l.w = u, l.h = c, l._temporaryRemoved = !0), r.get().on(o, "drag", n), n(s, o, a), !1
                })).on(this.el, "dropout", ((e, t, i) => {
                    let n = t.gridstackNode;
                    return n.grid && n.grid !== this || this._leave(n, t, i, !0), !1
                })).on(this.el, "drop", ((e, t, i) => {
                    let n = t.gridstackNode;
                    if (n && n.grid === this && !n._isExternal) return !1;
                    let s = !!this.placeholder.parentElement;
                    this.placeholder.remove();
                    let a = t._gridstackNodeOrig;
                    if (delete t._gridstackNodeOrig, s && a && a.grid && a.grid !== this) {
                        let e = a.grid;
                        e.engine.removedNodes.push(a), e._triggerRemoveEvent()
                    }
                    return !!n && (s && (this.engine.cleanupNode(n), n.grid = this), r.get().off(t, "drag"), i !== t ? (i.remove(), t.gridstackNode = a, s && (t = t.cloneNode(!0))) : (t.remove(), r.get().remove(t)), !!s && (t.gridstackNode = n, n.el = t, o.Utils.copyPos(n, this._readAttr(this.placeholder)), o.Utils.removePositioningStyles(t), this._writeAttr(t, n), this.el.appendChild(t), this._updateContainerHeight(), this.engine.addedNodes.push(n), this._triggerAddEvent(), this._triggerChangeEvent(), this.engine.endUpdate(), this._gsEventHandler.dropped && this._gsEventHandler.dropped({
                        type: "dropped"
                    }, a && a.grid ? a : void 0, n), window.setTimeout((() => {
                        n.el && n.el.parentElement ? this._prepareDragDropByNode(n) : this.engine.removeNode(n)
                    })), !1))
                })), this
            }, s.GridStack.prototype._setupRemoveDrop = function() {
                if (!this.opts.staticGrid && "string" == typeof this.opts.removable) {
                    let e = document.querySelector(this.opts.removable);
                    if (!e) return this;
                    r.get().isDroppable(e) || r.get().droppable(e, this.opts.removableOptions).on(e, "dropover", (function(e, t) {
                        let i = t.gridstackNode;
                        i && i.grid && (i._isAboutToRemove = !0, t.classList.add("grid-stack-item-removing"))
                    })).on(e, "dropout", (function(e, t) {
                        let i = t.gridstackNode;
                        i && i.grid && (delete i._isAboutToRemove, t.classList.remove("grid-stack-item-removing"))
                    }))
                }
                return this
            }, s.GridStack.setupDragIn = function(e, t) {
                let i, n;
                if (e && (i = e, n = Object.assign(Object.assign({}, {
                        revert: "invalid",
                        handle: ".grid-stack-item-content",
                        scroll: !1,
                        appendTo: "body"
                    }), t || {})), "string" != typeof i) return;
                let s = r.get();
                o.Utils.getElements(i).forEach((e => {
                    s.isDraggable(e) || s.dragIn(e, n)
                }))
            }, s.GridStack.prototype._prepareDragDropByNode = function(e) {
                let t = e.el,
                    i = r.get();
                if (this.opts.staticGrid || e.locked || (e.noMove || this.opts.disableDrag) && (e.noResize || this.opts.disableResize)) return e._initDD && (i.remove(t), delete e._initDD), t.classList.add("ui-draggable-disabled", "ui-resizable-disabled"), this;
                if (!e._initDD) {
                    let n, s, r = (i, o) => {
                            this._gsEventHandler[i.type] && this._gsEventHandler[i.type](i, i.target), n = this.cellWidth(), s = this.getCellHeight(!0), this._onStartMoving(t, i, o, e, n, s)
                        },
                        a = (i, o) => {
                            this._dragOrResize(t, i, o, e, n, s)
                        },
                        l = n => {
                            this.placeholder.remove(), delete e._moving, delete e._lastTried;
                            let s = n.target;
                            if (s.gridstackNode && s.gridstackNode.grid === this) {
                                if (e.el = s, e._isAboutToRemove) {
                                    let o = t.gridstackNode.grid;
                                    o._gsEventHandler[n.type] && o._gsEventHandler[n.type](n, s), i.remove(t), o.engine.removedNodes.push(e), o._triggerRemoveEvent(), delete t.gridstackNode, delete e.el, t.remove()
                                } else e._temporaryRemoved ? (o.Utils.removePositioningStyles(s), o.Utils.copyPos(e, e._orig), this._writePosAttr(s, e), this.engine.addNode(e)) : (o.Utils.removePositioningStyles(s), this._writePosAttr(s, e)), this._gsEventHandler[n.type] && this._gsEventHandler[n.type](n, s);
                                this._extraDragRow = 0, this._updateContainerHeight(), this._triggerChangeEvent(), this.engine.endUpdate()
                            }
                        };
                    i.draggable(t, {
                        start: r,
                        stop: l,
                        drag: a
                    }).resizable(t, {
                        start: r,
                        stop: l,
                        resize: a
                    }), e._initDD = !0
                }
                return e.noMove || this.opts.disableDrag ? (i.draggable(t, "disable"), t.classList.add("ui-draggable-disabled")) : (i.draggable(t, "enable"), t.classList.remove("ui-draggable-disabled")), e.noResize || this.opts.disableResize ? (i.resizable(t, "disable"), t.classList.add("ui-resizable-disabled")) : (i.resizable(t, "enable"), t.classList.remove("ui-resizable-disabled")), this
            }, s.GridStack.prototype._onStartMoving = function(e, t, i, n, s, o) {
                if (this.engine.cleanNodes().beginUpdate(n), this._writePosAttr(this.placeholder, n), this.el.appendChild(this.placeholder), n.el = this.placeholder, n._lastUiPosition = i.position, n._prevYPix = i.position.top, n._moving = "dragstart" === t.type, delete n._lastTried, "dropover" === t.type && n._temporaryRemoved && (this.engine.addNode(n), n._moving = !0), this.engine.cacheRects(s, o, this.opts.marginTop, this.opts.marginRight, this.opts.marginBottom, this.opts.marginLeft), "resizestart" === t.type) {
                    let t = r.get().resizable(e, "option", "minWidth", s * (n.minW || 1)).resizable(e, "option", "minHeight", o * (n.minH || 1));
                    n.maxW && t.resizable(e, "option", "maxWidth", s * n.maxW), n.maxH && t.resizable(e, "option", "maxHeight", o * n.maxH)
                }
            }, s.GridStack.prototype._leave = function(e, t, i, n = !1) {
                e && (n && r.get().off(t, "drag"), e._temporaryRemoved || (e._temporaryRemoved = !0, this.engine.removeNode(e), e.el = e._isExternal && i ? i : t, t._gridstackNodeOrig ? (t.gridstackNode = t._gridstackNodeOrig, delete t._gridstackNodeOrig) : e._isExternal && (delete e.el, delete t.gridstackNode, this.engine.restoreInitial())))
            }, s.GridStack.prototype._dragOrResize = function(e, t, i, n, s, r) {
                let a, l = Object.assign({}, n._orig);
                if ("drag" === t.type) {
                    if (n._temporaryRemoved) return;
                    let t = i.position.top - n._prevYPix;
                    n._prevYPix = i.position.top, o.Utils.updateScrollPosition(e, i.position, t);
                    let a = i.position.left + (i.position.left > n._lastUiPosition.left ? -this.opts.marginRight : this.opts.marginLeft),
                        h = i.position.top + (i.position.top > n._lastUiPosition.top ? -this.opts.marginBottom : this.opts.marginTop);
                    l.x = Math.round(a / s), l.y = Math.round(h / r);
                    let u = this._extraDragRow;
                    if (this.engine.collide(n, l)) {
                        let e = this.getRow(),
                            t = Math.max(0, l.y + n.h - e);
                        this.opts.maxRow && e + t > this.opts.maxRow && (t = Math.max(0, this.opts.maxRow - e)), this._extraDragRow = t
                    } else this._extraDragRow = 0;
                    if (this._extraDragRow !== u && this._updateContainerHeight(), n.x === l.x && n.y === l.y) return
                } else if ("resize" === t.type) {
                    if (l.x < 0) return;
                    if (o.Utils.updateScrollResize(t, e, r), l.w = Math.round((i.size.width - this.opts.marginLeft) / s), l.h = Math.round((i.size.height - this.opts.marginTop) / r), n.w === l.w && n.h === l.h) return;
                    if (n._lastTried && n._lastTried.w === l.w && n._lastTried.h === l.h) return;
                    Math.round(i.position.left) < Math.round(n._orig.x * s) && (l.x = n._orig.x + n._orig.w - l.w), a = !0
                }
                n._lastTried = l;
                let h = {
                    x: i.position.left + this.opts.marginLeft,
                    y: i.position.top + this.opts.marginTop,
                    w: (i.size ? i.size.width : n.w * s) - this.opts.marginLeft - this.opts.marginRight,
                    h: (i.size ? i.size.height : n.h * r) - this.opts.marginTop - this.opts.marginBottom
                };
                if (this.engine.moveNodeCheck(n, Object.assign(Object.assign({}, l), {
                        cellWidth: s,
                        cellHeight: r,
                        rect: h
                    }))) {
                    n._lastUiPosition = i.position, this.engine.cacheRects(s, r, this.opts.marginTop, this.opts.marginRight, this.opts.marginBottom, this.opts.marginLeft), delete n._skipDown, a && n.subGrid && n.subGrid.onParentResize(), this._extraDragRow = 0, this._updateContainerHeight();
                    let e = t.target;
                    this._writePosAttr(e, n), this._gsEventHandler[t.type] && this._gsEventHandler[t.type](t, e)
                }
            }, s.GridStack.prototype.movable = function(e, t) {
                return this.opts.staticGrid || s.GridStack.getElements(e).forEach((e => {
                    let i = e.gridstackNode;
                    i && !i.locked && (t ? delete i.noMove : i.noMove = !0, this._prepareDragDropByNode(i))
                })), this
            }, s.GridStack.prototype.resizable = function(e, t) {
                return this.opts.staticGrid || s.GridStack.getElements(e).forEach((e => {
                    let i = e.gridstackNode;
                    i && !i.locked && (t ? delete i.noResize : i.noResize = !0, this._prepareDragDropByNode(i))
                })), this
            }, s.GridStack.prototype.disable = function() {
                if (!this.opts.staticGrid) return this.enableMove(!1), this.enableResize(!1), this._triggerEvent("disable"), this
            }, s.GridStack.prototype.enable = function() {
                if (!this.opts.staticGrid) return this.enableMove(!0), this.enableResize(!0), this._triggerEvent("enable"), this
            }, s.GridStack.prototype.enableMove = function(e) {
                return this.opts.staticGrid || (this.opts.disableDrag = !e, this.engine.nodes.forEach((t => this.movable(t.el, e)))), this
            }, s.GridStack.prototype.enableResize = function(e) {
                return this.opts.staticGrid || (this.opts.disableResize = !e, this.engine.nodes.forEach((t => this.resizable(t.el, e)))), this
            }
        },
        334: (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            class i {
                static registerPlugin(e) {
                    return i.ddi = new e, i.ddi
                }
                static get() {
                    return i.ddi || i.registerPlugin(i)
                }
                remove(e) {
                    return this
                }
            }
            t.GridStackDDI = i
        },
        62: (e, t, i) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            const n = i(593);
            class s {
                constructor(e = {}) {
                    this.addedNodes = [], this.removedNodes = [], this.column = e.column || 12, this.onChange = e.onChange, this._float = e.float, this.maxRow = e.maxRow, this.nodes = e.nodes || []
                }
                batchUpdate() {
                    return this.batchMode || (this.batchMode = !0, this._prevFloat = this._float, this._float = !0, this.saveInitial()), this
                }
                commit() {
                    return this.batchMode ? (this.batchMode = !1, this._float = this._prevFloat, delete this._prevFloat, this._packNodes()._notify()) : this
                }
                _useEntireRowArea(e, t) {
                    return !this.float && !this._hasLocked && (!e._moving || e._skipDown || t.y <= e.y)
                }
                _fixCollisions(e, t = e, i, s = {}) {
                    if (this._sortNodes(-1), !(i = i || this.collide(e, t))) return !1;
                    if (e._moving && !s.nested && !this.float && this.swap(e, i)) return !0;
                    let o = t;
                    this._useEntireRowArea(e, t) && (o = {
                        x: 0,
                        w: this.column,
                        y: t.y,
                        h: t.h
                    }, i = this.collide(e, o, s.skip));
                    let r = !1,
                        a = {
                            nested: !0,
                            pack: !1
                        };
                    for (; i = i || this.collide(e, o, s.skip);) {
                        let o;
                        if (i.locked || e._moving && !e._skipDown && t.y > e.y && !this.float && (!this.collide(i, Object.assign(Object.assign({}, i), {
                                y: e.y
                            }), e) || !this.collide(i, Object.assign(Object.assign({}, i), {
                                y: t.y - i.h
                            }), e)) ? (e._skipDown = e._skipDown || t.y > e.y, o = this.moveNode(e, Object.assign(Object.assign(Object.assign({}, t), {
                                y: i.y + i.h
                            }), a)), i.locked && o ? n.Utils.copyPos(t, e) : !i.locked && o && s.pack && (this._packNodes(), t.y = i.y + i.h, n.Utils.copyPos(e, t)), r = r || o) : o = this.moveNode(i, Object.assign(Object.assign(Object.assign({}, i), {
                                y: t.y + t.h,
                                skip: e
                            }), a)), !o) return r;
                        i = void 0
                    }
                    return r
                }
                collide(e, t = e, i) {
                    return this.nodes.find((s => s !== e && s !== i && n.Utils.isIntercepted(s, t)))
                }
                collideAll(e, t = e, i) {
                    return this.nodes.filter((s => s !== e && s !== i && n.Utils.isIntercepted(s, t)))
                }
                collideCoverage(e, t, i) {
                    if (!t.rect || !e._rect) return;
                    let n, s = e._rect,
                        o = Object.assign({}, t.rect);
                    return o.y > s.y ? (o.h += o.y - s.y, o.y = s.y) : o.h += s.y - o.y, o.x > s.x ? (o.w += o.x - s.x, o.x = s.x) : o.w += s.x - o.x, i.forEach((e => {
                        if (e.locked || !e._rect) return;
                        let t = e._rect,
                            i = Number.MAX_VALUE,
                            r = Number.MAX_VALUE,
                            a = .5;
                        s.y < t.y ? i = (o.y + o.h - t.y) / t.h : s.y + s.h > t.y + t.h && (i = (t.y + t.h - o.y) / t.h), s.x < t.x ? r = (o.x + o.w - t.x) / t.w : s.x + s.w > t.x + t.w && (r = (t.x + t.w - o.x) / t.w);
                        let l = Math.min(r, i);
                        l > a && (a = l, n = e)
                    })), n
                }
                cacheRects(e, t, i, n, s, o) {
                    return this.nodes.forEach((r => r._rect = {
                        y: r.y * t + i,
                        x: r.x * e + o,
                        w: r.w * e - o - n,
                        h: r.h * t - i - s
                    })), this
                }
                swap(e, t) {
                    if (!t || t.locked || !e || e.locked) return !1;

                    function i() {
                        let i = t.x,
                            n = t.y;
                        return t.x = e.x, t.y = e.y, e.h != t.h ? (e.x = i, e.y = t.y + t.h) : (e.x = i, e.y = n), e._dirty = t._dirty = !0, !0
                    }
                    let s;
                    if (e.w === t.w && e.h === t.h && (e.x === t.x || e.y === t.y) && (s = n.Utils.isTouching(e, t))) return i();
                    if (!1 !== s) {
                        if (e.w === t.w && e.x === t.x && (s || n.Utils.isTouching(e, t))) {
                            if (t.y < e.y) {
                                let i = e;
                                e = t, t = i
                            }
                            return i()
                        }
                        return !1
                    }
                }
                isAreaEmpty(e, t, i, n) {
                    let s = {
                        x: e || 0,
                        y: t || 0,
                        w: i || 1,
                        h: n || 1
                    };
                    return !this.collide(s)
                }
                compact() {
                    if (0 === this.nodes.length) return this;
                    this.batchUpdate()._sortNodes();
                    let e = this.nodes;
                    return this.nodes = [], e.forEach((e => {
                        e.locked || (e.autoPosition = !0), this.addNode(e, !1), e._dirty = !0
                    })), this.commit()
                }
                set float(e) {
                    this._float !== e && (this._float = e || !1, e || this._packNodes()._notify())
                }
                get float() {
                    return this._float || !1
                }
                _sortNodes(e) {
                    return this.nodes = n.Utils.sort(this.nodes, e, this.column), this
                }
                _packNodes() {
                    return this._sortNodes(), this.float ? this.nodes.forEach((e => {
                        if (e._updating || void 0 === e._orig || e.y === e._orig.y) return;
                        let t = e.y;
                        for (; t > e._orig.y;) --t, this.collide(e, {
                            x: e.x,
                            y: t,
                            w: e.w,
                            h: e.h
                        }) || (e._dirty = !0, e.y = t)
                    })) : this.nodes.forEach(((e, t) => {
                        if (!e.locked)
                            for (; e.y > 0;) {
                                let i = 0 === t ? 0 : e.y - 1;
                                if (0 !== t && this.collide(e, {
                                        x: e.x,
                                        y: i,
                                        w: e.w,
                                        h: e.h
                                    })) break;
                                e._dirty = e.y !== i, e.y = i
                            }
                    })), this
                }
                prepareNode(e, t) {
                    (e = e || {})._id = e._id || s._idSeq++, void 0 !== e.x && void 0 !== e.y && null !== e.x && null !== e.y || (e.autoPosition = !0);
                    let i = {
                        x: 0,
                        y: 0,
                        w: 1,
                        h: 1
                    };
                    return n.Utils.defaults(e, i), e.autoPosition || delete e.autoPosition, e.noResize || delete e.noResize, e.noMove || delete e.noMove, "string" == typeof e.x && (e.x = Number(e.x)), "string" == typeof e.y && (e.y = Number(e.y)), "string" == typeof e.w && (e.w = Number(e.w)), "string" == typeof e.h && (e.h = Number(e.h)), isNaN(e.x) && (e.x = i.x, e.autoPosition = !0), isNaN(e.y) && (e.y = i.y, e.autoPosition = !0), isNaN(e.w) && (e.w = i.w), isNaN(e.h) && (e.h = i.h), this.nodeBoundFix(e, t)
                }
                nodeBoundFix(e, t) {
                    return e.maxW && (e.w = Math.min(e.w, e.maxW)), e.maxH && (e.h = Math.min(e.h, e.maxH)), e.minW && (e.w = Math.max(e.w, e.minW)), e.minH && (e.h = Math.max(e.h, e.minH)), e.w > this.column ? (this.column < 12 && (e.w = Math.min(12, e.w), this.cacheOneLayout(e, 12)), e.w = this.column) : e.w < 1 && (e.w = 1), this.maxRow && e.h > this.maxRow ? e.h = this.maxRow : e.h < 1 && (e.h = 1), e.x < 0 && (e.x = 0), e.y < 0 && (e.y = 0), e.x + e.w > this.column && (t ? e.w = this.column - e.x : e.x = this.column - e.w), this.maxRow && e.y + e.h > this.maxRow && (t ? e.h = this.maxRow - e.y : e.y = this.maxRow - e.h), e
                }
                getDirtyNodes(e) {
                    return e ? this.nodes.filter((e => e._dirty && !n.Utils.samePos(e, e._orig))) : this.nodes.filter((e => e._dirty))
                }
                _notify(e, t = !0) {
                    if (this.batchMode) return this;
                    let i = (e = void 0 === e ? [] : Array.isArray(e) ? e : [e]).concat(this.getDirtyNodes());
                    return this.onChange && this.onChange(i, t), this
                }
                cleanNodes() {
                    return this.batchMode || this.nodes.forEach((e => {
                        delete e._dirty, delete e._lastTried
                    })), this
                }
                saveInitial() {
                    return this.nodes.forEach((e => {
                        e._orig = n.Utils.copyPos({}, e), delete e._dirty
                    })), this._hasLocked = this.nodes.some((e => e.locked)), this
                }
                restoreInitial() {
                    return this.nodes.forEach((e => {
                        n.Utils.samePos(e, e._orig) || (n.Utils.copyPos(e, e._orig), e._dirty = !0)
                    })), this._notify(), this
                }
                addNode(e, t = !1) {
                    let i;
                    if (i = this.nodes.find((t => t._id === e._id))) return i;
                    if (delete(e = this.prepareNode(e))._temporaryRemoved, delete e._removeDOM, e.autoPosition) {
                        this._sortNodes();
                        for (let t = 0;; ++t) {
                            let i = t % this.column,
                                s = Math.floor(t / this.column);
                            if (i + e.w > this.column) continue;
                            let o = {
                                x: i,
                                y: s,
                                w: e.w,
                                h: e.h
                            };
                            if (!this.nodes.find((e => n.Utils.isIntercepted(o, e)))) {
                                e.x = i, e.y = s, delete e.autoPosition;
                                break
                            }
                        }
                    }
                    return this.nodes.push(e), t && this.addedNodes.push(e), this._fixCollisions(e), this._packNodes()._notify(), e
                }
                removeNode(e, t = !0, i = !1) {
                    return this.nodes.find((t => t === e)) ? (i && this.removedNodes.push(e), t && (e._removeDOM = !0), this.nodes = this.nodes.filter((t => t !== e)), this._packNodes()._notify(e)) : this
                }
                removeAll(e = !0) {
                    return delete this._layouts, 0 === this.nodes.length ? this : (e && this.nodes.forEach((e => e._removeDOM = !0)), this.removedNodes = this.nodes, this.nodes = [], this._notify(this.removedNodes))
                }
                moveNodeCheck(e, t) {
                    if (e.locked) return !1;
                    if (!this.changedPosConstrain(e, t)) return !1;
                    if (t.pack = !0, !this.maxRow) return this.moveNode(e, t);
                    let i, o = new s({
                        column: this.column,
                        float: this.float,
                        nodes: this.nodes.map((t => t === e ? (i = Object.assign({}, t), i) : Object.assign({}, t)))
                    });
                    if (!i) return !1;
                    let r = o.moveNode(i, t);
                    if (this.maxRow && r && (r = o.getRow() <= this.maxRow, !r)) {
                        let i = this.collide(e, t);
                        if (i && this.swap(e, i)) return this._notify(), !0
                    }
                    return !!r && (o.nodes.filter((e => e._dirty)).forEach((e => {
                        let t = this.nodes.find((t => t._id === e._id));
                        t && (n.Utils.copyPos(t, e), t._dirty = !0)
                    })), this._notify(), !0)
                }
                willItFit(e) {
                    if (delete e._willFitPos, !this.maxRow) return !0;
                    let t = new s({
                            column: this.column,
                            float: this.float,
                            nodes: this.nodes.map((e => Object.assign({}, e)))
                        }),
                        i = Object.assign({}, e);
                    return this.cleanupNode(i), delete i.el, delete i._id, delete i.content, delete i.grid, t.addNode(i), t.getRow() <= this.maxRow && (e._willFitPos = n.Utils.copyPos({}, i), !0)
                }
                changedPosConstrain(e, t) {
                    return t.w = t.w || e.w, t.h = t.h || e.h, e.x !== t.x || e.y !== t.y || (e.maxW && (t.w = Math.min(t.w, e.maxW)), e.maxH && (t.h = Math.min(t.h, e.maxH)), e.minW && (t.w = Math.max(t.w, e.minW)), e.minH && (t.h = Math.max(t.h, e.minH)), e.w !== t.w || e.h !== t.h)
                }
                moveNode(e, t) {
                    if (!e || e.locked || !t) return !1;
                    void 0 === t.pack && (t.pack = !0), "number" != typeof t.x && (t.x = e.x), "number" != typeof t.y && (t.y = e.y), "number" != typeof t.w && (t.w = e.w), "number" != typeof t.h && (t.h = e.h);
                    let i = e.w !== t.w || e.h !== t.h,
                        s = n.Utils.copyPos({}, e, !0);
                    if (n.Utils.copyPos(s, t), s = this.nodeBoundFix(s, i), n.Utils.copyPos(t, s), n.Utils.samePos(e, t)) return !1;
                    let o = n.Utils.copyPos({}, e),
                        r = s,
                        a = this.collideAll(e, r, t.skip),
                        l = !0;
                    if (a.length) {
                        let i = e._moving && !t.nested ? this.collideCoverage(e, t, a) : a[0];
                        l = !!i && !this._fixCollisions(e, s, i, t)
                    }
                    return l && (e._dirty = !0, n.Utils.copyPos(e, s)), t.pack && this._packNodes()._notify(), !n.Utils.samePos(e, o)
                }
                getRow() {
                    return this.nodes.reduce(((e, t) => Math.max(e, t.y + t.h)), 0)
                }
                beginUpdate(e) {
                    return e._updating || (e._updating = !0, delete e._skipDown, this.batchMode || this.saveInitial()), this
                }
                endUpdate() {
                    let e = this.nodes.find((e => e._updating));
                    return e && (delete e._updating, delete e._skipDown), this
                }
                save(e = !0) {
                    let t = [];
                    return this._sortNodes(), this.nodes.forEach((i => {
                        let n = {};
                        for (let e in i) "_" !== e[0] && null !== i[e] && void 0 !== i[e] && (n[e] = i[e]);
                        e || delete n.el, delete n.grid, n.autoPosition || delete n.autoPosition, n.noResize || delete n.noResize, n.noMove || delete n.noMove, n.locked || delete n.locked, t.push(n)
                    })), t
                }
                layoutsNodesChange(e) {
                    return !this._layouts || this._ignoreLayoutsNodeChange || this._layouts.forEach(((t, i) => {
                        if (!t || i === this.column) return this;
                        i < this.column ? this._layouts[i] = void 0 : e.forEach((e => {
                            if (!e._orig) return;
                            let n = t.find((t => t._id === e._id));
                            if (!n) return;
                            let s = i / this.column;
                            e.y !== e._orig.y && (n.y += e.y - e._orig.y), e.x !== e._orig.x && (n.x = Math.round(e.x * s)), e.w !== e._orig.w && (n.w = Math.round(e.w * s))
                        }))
                    })), this
                }
                updateNodeWidths(e, t, i, s = "moveScale") {
                    if (!this.nodes.length || e === t) return this;
                    if (this.cacheLayout(this.nodes, e), 1 === t && i && i.length) {
                        let e = 0;
                        i.forEach((t => {
                            t.x = 0, t.w = 1, t.y = Math.max(t.y, e), e = t.y + t.h
                        }))
                    } else i = n.Utils.sort(this.nodes, -1, e);
                    let o = this._layouts[t] || [],
                        r = this._layouts.length - 1;
                    0 === o.length && t > e && t < r && (o = this._layouts[r] || [], o.length && (e = r, o.forEach((e => {
                        let t = i.findIndex((t => t._id === e._id)); - 1 !== t && (i[t].x = e.x, i[t].y = e.y, i[t].w = e.w)
                    })), o = []));
                    let a = [];
                    if (o.forEach((e => {
                            let t = i.findIndex((t => t._id === e._id)); - 1 !== t && (i[t].x = e.x, i[t].y = e.y, i[t].w = e.w, a.push(i[t]), i.splice(t, 1))
                        })), i.length)
                        if ("function" == typeof s) s(t, e, a, i);
                        else {
                            let n = t / e,
                                o = "move" === s || "moveScale" === s,
                                r = "scale" === s || "moveScale" === s;
                            i.forEach((i => {
                                i.x = 1 === t ? 0 : o ? Math.round(i.x * n) : Math.min(i.x, t - 1), i.w = 1 === t || 1 === e ? 1 : r ? Math.round(i.w * n) || 1 : Math.min(i.w, t), a.push(i)
                            })), i = []
                        } return a = n.Utils.sort(a, -1, t), this._ignoreLayoutsNodeChange = !0, this.batchUpdate(), this.nodes = [], a.forEach((e => {
                        this.addNode(e, !1), e._dirty = !0
                    }), this), this.commit(), delete this._ignoreLayoutsNodeChange, this
                }
                cacheLayout(e, t, i = !1) {
                    let n = [];
                    return e.forEach(((e, t) => {
                        e._id = e._id || s._idSeq++, n[t] = {
                            x: e.x,
                            y: e.y,
                            w: e.w,
                            _id: e._id
                        }
                    })), this._layouts = i ? [] : this._layouts || [], this._layouts[t] = n, this
                }
                cacheOneLayout(e, t) {
                    e._id = e._id || s._idSeq++;
                    let i = {
                        x: e.x,
                        y: e.y,
                        w: e.w,
                        _id: e._id
                    };
                    this._layouts = this._layouts || [], this._layouts[t] = this._layouts[t] || [];
                    let n = this._layouts[t].findIndex((t => t._id === e._id));
                    return -1 === n ? this._layouts[t].push(i) : this._layouts[t][n] = i, this
                }
                cleanupNode(e) {
                    for (let t in e) "_" === t[0] && "_id" !== t && delete e[t];
                    return this
                }
            }
            t.GridStackEngine = s, s._idSeq = 1
        },
        572: (e, t, i) => {
            "use strict";

            function n(e) {
                for (var i in e) t.hasOwnProperty(i) || (t[i] = e[i])
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), n(i(593)), n(i(62)), n(i(334)), n(i(270)), n(i(906))
        },
        270: (e, t, i) => {
            "use strict";

            function n(e) {
                for (var i in e) t.hasOwnProperty(i) || (t[i] = e[i])
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            const s = i(62),
                o = i(593),
                r = i(334);
            n(i(593)), n(i(62)), n(i(334));
            const a = {
                column: 12,
                minRow: 0,
                maxRow: 0,
                itemClass: "grid-stack-item",
                placeholderClass: "grid-stack-placeholder",
                placeholderText: "",
                handle: ".grid-stack-item-content",
                handleClass: null,
                styleInHead: !1,
                cellHeight: "auto",
                cellHeightThrottle: 100,
                margin: 10,
                auto: !0,
                minWidth: 768,
                float: !1,
                staticGrid: !1,
                animate: !0,
                alwaysShowResizeHandle: !1,
                resizable: {
                    autoHide: !0,
                    handles: "se"
                },
                draggable: {
                    handle: ".grid-stack-item-content",
                    scroll: !1,
                    appendTo: "body"
                },
                disableDrag: !1,
                disableResize: !1,
                rtl: "auto",
                removable: !1,
                removableOptions: {
                    accept: ".grid-stack-item"
                },
                marginUnit: "px",
                cellHeightUnit: "px",
                disableOneColumnMode: !1,
                oneColumnModeDomSort: !1
            };
            class l {
                constructor(e, t = {}) {
                    this._gsEventHandler = {}, this._extraDragRow = 0, this.el = e, (t = t || {}).row && (t.minRow = t.maxRow = t.row, delete t.row);
                    let i = o.Utils.toNumber(e.getAttribute("gs-row")),
                        n = Object.assign(Object.assign({}, a), {
                            column: o.Utils.toNumber(e.getAttribute("gs-column")) || 12,
                            minRow: i || o.Utils.toNumber(e.getAttribute("gs-min-row")) || 0,
                            maxRow: i || o.Utils.toNumber(e.getAttribute("gs-max-row")) || 0,
                            staticGrid: o.Utils.toBool(e.getAttribute("gs-static")) || !1,
                            _styleSheetClass: "grid-stack-instance-" + (1e4 * Math.random()).toFixed(0),
                            alwaysShowResizeHandle: t.alwaysShowResizeHandle || !1,
                            resizable: {
                                autoHide: !t.alwaysShowResizeHandle,
                                handles: "se"
                            },
                            draggable: {
                                handle: (t.handleClass ? "." + t.handleClass : t.handle ? t.handle : "") || ".grid-stack-item-content",
                                scroll: !1,
                                appendTo: "body"
                            },
                            removableOptions: {
                                accept: "." + (t.itemClass || "grid-stack-item")
                            }
                        });
                    e.getAttribute("gs-animate") && (n.animate = o.Utils.toBool(e.getAttribute("gs-animate"))), this.opts = o.Utils.defaults(t, n), t = null, this.initMargin(), 1 !== this.opts.column && !this.opts.disableOneColumnMode && this._widthOrContainer() <= this.opts.minWidth && (this._prevColumn = this.opts.column, this.opts.column = 1), "auto" === this.opts.rtl && (this.opts.rtl = "rtl" === e.style.direction), this.opts.rtl && this.el.classList.add("grid-stack-rtl");
                    let r = o.Utils.closestByClass(this.el, a.itemClass);
                    if (r && r.gridstackNode && (this.opts._isNested = r.gridstackNode, this.opts._isNested.subGrid = this, this.el.classList.add("grid-stack-nested")), this._isAutoCellHeight = "auto" === this.opts.cellHeight, this._isAutoCellHeight || "initial" === this.opts.cellHeight ? this.cellHeight(void 0, !1) : this.cellHeight(this.opts.cellHeight, !1), this.el.classList.add(this.opts._styleSheetClass), this._setStaticClass(), this.engine = new s.GridStackEngine({
                            column: this.opts.column,
                            float: this.opts.float,
                            maxRow: this.opts.maxRow,
                            onChange: e => {
                                let t = 0;
                                this.engine.nodes.forEach((e => {
                                    t = Math.max(t, e.y + e.h)
                                })), e.forEach((e => {
                                    let t = e.el;
                                    e._removeDOM ? (t && t.remove(), delete e._removeDOM) : this._writePosAttr(t, e)
                                })), this._updateStyles(!1, t)
                            }
                        }), this.opts.auto) {
                        this.batchUpdate();
                        let e = [];
                        this.getGridItems().forEach((t => {
                            let i = parseInt(t.getAttribute("gs-x")),
                                n = parseInt(t.getAttribute("gs-y"));
                            e.push({
                                el: t,
                                i: (Number.isNaN(i) ? 1e3 : i) + (Number.isNaN(n) ? 1e3 : n) * this.opts.column
                            })
                        })), e.sort(((e, t) => e.i - t.i)).forEach((e => this._prepareElement(e.el))), this.commit()
                    }
                    this.setAnimation(this.opts.animate), this._updateStyles(), 12 != this.opts.column && this.el.classList.add("grid-stack-" + this.opts.column), this.opts.dragIn && l.setupDragIn(this.opts.dragIn, this.opts.dragInOptions), delete this.opts.dragIn, delete this.opts.dragInOptions, this._setupRemoveDrop(), this._setupAcceptWidget(), this._updateWindowResizeEvent()
                }
                static init(e = {}, t = ".grid-stack") {
                    let i = l.getGridElement(t);
                    return i ? (i.gridstack || (i.gridstack = new l(i, Object.assign({}, e))), i.gridstack) : ("string" == typeof t ? console.error('GridStack.initAll() no grid was found with selector "' + t + '" - element missing or wrong selector ?\nNote: ".grid-stack" is required for proper CSS styling and drag/drop, and is the default selector.') : console.error("GridStack.init() no grid element was passed."), null)
                }
                static initAll(e = {}, t = ".grid-stack") {
                    let i = [];
                    return l.getGridElements(t).forEach((t => {
                        t.gridstack || (t.gridstack = new l(t, Object.assign({}, e)), delete e.dragIn, delete e.dragInOptions), i.push(t.gridstack)
                    })), 0 === i.length && console.error('GridStack.initAll() no grid was found with selector "' + t + '" - element missing or wrong selector ?\nNote: ".grid-stack" is required for proper CSS styling and drag/drop, and is the default selector.'), i
                }
                static addGrid(e, t = {}) {
                    if (!e) return null;
                    let i = e;
                    if (!e.classList.contains("grid-stack")) {
                        let n = document.implementation.createHTMLDocument();
                        n.body.innerHTML = `<div class="grid-stack ${t.class||""}"></div>`, i = n.body.children[0], e.appendChild(i)
                    }
                    let n = l.init(t, i);
                    if (n.opts.children) {
                        let e = n.opts.children;
                        delete n.opts.children, n.load(e)
                    }
                    return n
                }
                get placeholder() {
                    if (!this._placeholder) {
                        let e = document.createElement("div");
                        e.className = "placeholder-content", this.opts.placeholderText && (e.innerHTML = this.opts.placeholderText), this._placeholder = document.createElement("div"), this._placeholder.classList.add(this.opts.placeholderClass, a.itemClass, this.opts.itemClass), this.placeholder.appendChild(e)
                    }
                    return this._placeholder
                }
                addWidget(e, t) {
                    if (arguments.length > 2) {
                        console.warn("gridstack.ts: `addWidget(el, x, y, width...)` is deprecated. Use `addWidget({x, y, w, content, ...})`. It will be removed soon");
                        let t = arguments,
                            i = 1,
                            n = {
                                x: t[i++],
                                y: t[i++],
                                w: t[i++],
                                h: t[i++],
                                autoPosition: t[i++],
                                minW: t[i++],
                                maxW: t[i++],
                                minH: t[i++],
                                maxH: t[i++],
                                id: t[i++]
                            };
                        return this.addWidget(e, n)
                    }
                    let i;
                    if ("string" == typeof e) {
                        let t = document.implementation.createHTMLDocument();
                        t.body.innerHTML = e, i = t.body.children[0]
                    } else if (0 === arguments.length || 1 === arguments.length && (void 0 !== (n = e).x || void 0 !== n.y || void 0 !== n.w || void 0 !== n.h || void 0 !== n.content)) {
                        let n = e && e.content || "";
                        t = e;
                        let s = document.implementation.createHTMLDocument();
                        s.body.innerHTML = `<div class="grid-stack-item ${this.opts.itemClass||""}"><div class="grid-stack-item-content">${n}</div></div>`, i = s.body.children[0]
                    } else i = e;
                    var n;
                    let s = this._readAttr(i);
                    t = Object.assign({}, t || {}), o.Utils.defaults(t, s);
                    let r = this.engine.prepareNode(t);
                    if (this._writeAttr(i, t), this._insertNotAppend ? this.el.prepend(i) : this.el.appendChild(i), this._prepareElement(i, !0, t), this._updateContainerHeight(), r.subGrid && !r.subGrid.el) {
                        let e = r.el.querySelector(".grid-stack-item-content");
                        r.subGrid = l.addGrid(e, r.subGrid)
                    }
                    return this._triggerAddEvent(), this._triggerChangeEvent(), i
                }
                save(e = !0, t = !1) {
                    let i = this.engine.save(e);
                    if (e && i.forEach((e => {
                            if (e.el && !e.subGrid) {
                                let t = e.el.querySelector(".grid-stack-item-content");
                                e.content = t ? t.innerHTML : void 0, e.content || delete e.content, delete e.el
                            }
                        })), t) {
                        i.forEach((i => {
                            i.subGrid && (i.subGrid = i.subGrid.save(e, t))
                        }));
                        let n = Object.assign({}, this.opts);
                        return n.marginBottom === n.marginTop && n.marginRight === n.marginLeft && n.marginTop === n.marginRight && (n.margin = n.marginTop, delete n.marginTop, delete n.marginRight, delete n.marginBottom, delete n.marginLeft), n.rtl === ("rtl" === this.el.style.direction) && (n.rtl = "auto"), this._isAutoCellHeight && (n.cellHeight = "auto"), o.Utils.removeInternalAndSame(n, a), n.children = i, n
                    }
                    return i
                }
                load(e, t = !0) {
                    let i = l.Utils.sort([...e], -1, this._prevColumn || this.opts.column);
                    this._insertNotAppend = !0, this._prevColumn && this._prevColumn !== this.opts.column && i.some((e => e.x + e.w > this.opts.column)) && (this._ignoreLayoutsNodeChange = !0, this.engine.cacheLayout(i, this._prevColumn, !0));
                    let n = [];
                    return this.batchUpdate(), t && [...this.engine.nodes].forEach((e => {
                        i.find((t => e.id === t.id)) || ("function" == typeof t ? t(this, e, !1) : (n.push(e), this.removeWidget(e.el, !0, !1)))
                    })), i.forEach((e => {
                        let i = e.id || 0 === e.id ? this.engine.nodes.find((t => t.id === e.id)) : void 0;
                        if (i) {
                            if (this.update(i.el, e), e.subGrid && e.subGrid.children) {
                                let t = i.el.querySelector(".grid-stack");
                                t && t.gridstack && (t.gridstack.load(e.subGrid.children), this._insertNotAppend = !0)
                            }
                        } else t && (e = "function" == typeof t ? t(this, e, !0).gridstackNode : this.addWidget(e).gridstackNode)
                    })), this.engine.removedNodes = n, this.commit(), delete this._ignoreLayoutsNodeChange, delete this._insertNotAppend, this
                }
                batchUpdate() {
                    return this.engine.batchUpdate(), this
                }
                getCellHeight(e = !1) {
                    return !this.opts.cellHeight || "auto" === this.opts.cellHeight || e && this.opts.cellHeightUnit && "px" !== this.opts.cellHeightUnit ? Math.round(this.el.getBoundingClientRect().height) / parseInt(this.el.getAttribute("gs-current-row")) : this.opts.cellHeight
                }
                cellHeight(e, t = !0) {
                    if (t && void 0 !== e && this._isAutoCellHeight !== ("auto" === e) && (this._isAutoCellHeight = "auto" === e, this._updateWindowResizeEvent()), "initial" !== e && "auto" !== e || (e = void 0), void 0 === e) {
                        let t = -this.opts.marginRight - this.opts.marginLeft + this.opts.marginTop + this.opts.marginBottom;
                        e = this.cellWidth() + t
                    }
                    let i = o.Utils.parseHeight(e);
                    return this.opts.cellHeightUnit === i.unit && this.opts.cellHeight === i.h || (this.opts.cellHeightUnit = i.unit, this.opts.cellHeight = i.h, t && this._updateStyles(!0, this.getRow())), this
                }
                cellWidth() {
                    return this._widthOrContainer() / this.opts.column
                }
                _widthOrContainer() {
                    return this.el.clientWidth || this.el.parentElement.clientWidth || window.innerWidth
                }
                commit() {
                    return this.engine.commit(), this._triggerRemoveEvent(), this._triggerAddEvent(), this._triggerChangeEvent(), this
                }
                compact() {
                    return this.engine.compact(), this._triggerChangeEvent(), this
                }
                column(e, t = "moveScale") {
                    if (this.opts.column === e) return this;
                    let i, n = this.opts.column;
                    return 1 === e ? this._prevColumn = n : delete this._prevColumn, this.el.classList.remove("grid-stack-" + n), this.el.classList.add("grid-stack-" + e), this.opts.column = this.engine.column = e, 1 === e && this.opts.oneColumnModeDomSort && (i = [], this.getGridItems().forEach((e => {
                        e.gridstackNode && i.push(e.gridstackNode)
                    })), i.length || (i = void 0)), this.engine.updateNodeWidths(n, e, i, t), this._isAutoCellHeight && this.cellHeight(), this._ignoreLayoutsNodeChange = !0, this._triggerChangeEvent(), delete this._ignoreLayoutsNodeChange, this
                }
                getColumn() {
                    return this.opts.column
                }
                getGridItems() {
                    return Array.from(this.el.children).filter((e => e.matches("." + this.opts.itemClass) && !e.matches("." + this.opts.placeholderClass)))
                }
                destroy(e = !0) {
                    if (this.el) return this._updateWindowResizeEvent(!0), this.setStatic(!0), e ? this.el.parentNode.removeChild(this.el) : (this.removeAll(e), this.el.classList.remove(this.opts._styleSheetClass)), this._removeStylesheet(), delete this.opts._isNested, delete this.opts, delete this._placeholder, delete this.engine, delete this.el.gridstack, delete this.el, this
                }
                float(e) {
                    return this.engine.float = e, this._triggerChangeEvent(), this
                }
                getFloat() {
                    return this.engine.float
                }
                getCellFromPixel(e, t = !1) {
                    let i, n = this.el.getBoundingClientRect();
                    i = t ? {
                        top: n.top + document.documentElement.scrollTop,
                        left: n.left
                    } : {
                        top: this.el.offsetTop,
                        left: this.el.offsetLeft
                    };
                    let s = e.left - i.left,
                        o = e.top - i.top,
                        r = n.width / this.opts.column,
                        a = n.height / parseInt(this.el.getAttribute("gs-current-row"));
                    return {
                        x: Math.floor(s / r),
                        y: Math.floor(o / a)
                    }
                }
                getRow() {
                    return Math.max(this.engine.getRow(), this.opts.minRow)
                }
                isAreaEmpty(e, t, i, n) {
                    return this.engine.isAreaEmpty(e, t, i, n)
                }
                makeWidget(e) {
                    let t = l.getElement(e);
                    return this._prepareElement(t, !0), this._updateContainerHeight(), this._triggerAddEvent(), this._triggerChangeEvent(), t
                }
                on(e, t) {
                    if (-1 !== e.indexOf(" ")) return e.split(" ").forEach((e => this.on(e, t))), this;
                    if ("change" === e || "added" === e || "removed" === e || "enable" === e || "disable" === e) {
                        let i = "enable" === e || "disable" === e;
                        this._gsEventHandler[e] = i ? e => t(e) : e => t(e, e.detail), this.el.addEventListener(e, this._gsEventHandler[e])
                    } else "drag" === e || "dragstart" === e || "dragstop" === e || "resizestart" === e || "resize" === e || "resizestop" === e || "dropped" === e ? this._gsEventHandler[e] = t : console.log("GridStack.on(" + e + ') event not supported, but you can still use $(".grid-stack").on(...) while jquery-ui is still used internally.');
                    return this
                }
                off(e) {
                    return -1 !== e.indexOf(" ") ? (e.split(" ").forEach((e => this.off(e))), this) : ("change" !== e && "added" !== e && "removed" !== e && "enable" !== e && "disable" !== e || this._gsEventHandler[e] && this.el.removeEventListener(e, this._gsEventHandler[e]), delete this._gsEventHandler[e], this)
                }
                removeWidget(e, t = !0, i = !0) {
                    return l.getElements(e).forEach((e => {
                        if (e.parentElement !== this.el) return;
                        let n = e.gridstackNode;
                        n || (n = this.engine.nodes.find((t => e === t.el))), n && (delete e.gridstackNode, r.GridStackDDI.get().remove(e), this.engine.removeNode(n, t, i), t && e.parentElement && e.remove())
                    })), i && (this._triggerRemoveEvent(), this._triggerChangeEvent()), this
                }
                removeAll(e = !0) {
                    return this.engine.nodes.forEach((e => {
                        delete e.el.gridstackNode, r.GridStackDDI.get().remove(e.el)
                    })), this.engine.removeAll(e), this._triggerRemoveEvent(), this
                }
                setAnimation(e) {
                    return e ? this.el.classList.add("grid-stack-animate") : this.el.classList.remove("grid-stack-animate"), this
                }
                setStatic(e) {
                    return this.opts.staticGrid === e || (this.opts.staticGrid = e, this.engine.nodes.forEach((e => this._prepareDragDropByNode(e))), this._setStaticClass()), this
                }
                update(e, t) {
                    if (arguments.length > 2) {
                        console.warn("gridstack.ts: `update(el, x, y, w, h)` is deprecated. Use `update({x, w, content, ...})`. It will be removed soon");
                        let i = arguments,
                            n = 1;
                        return t = {
                            x: i[n++],
                            y: i[n++],
                            w: i[n++],
                            h: i[n++]
                        }, this.update(e, t)
                    }
                    return l.getElements(e).forEach((e => {
                        if (!e || !e.gridstackNode) return;
                        let i = e.gridstackNode,
                            n = Object.assign({}, t);
                        delete n.autoPosition;
                        let s, o = ["x", "y", "w", "h"];
                        if (o.some((e => void 0 !== n[e] && n[e] !== i[e])) && (s = {}, o.forEach((e => {
                                s[e] = void 0 !== n[e] ? n[e] : i[e], delete n[e]
                            }))), !s && (n.minW || n.minH || n.maxW || n.maxH) && (s = {}), n.content) {
                            let t = e.querySelector(".grid-stack-item-content");
                            t && t.innerHTML !== n.content && (t.innerHTML = n.content), delete n.content
                        }
                        let r = !1,
                            a = !1;
                        for (const e in n) "_" !== e[0] && i[e] !== n[e] && (i[e] = n[e], r = !0, a = a || !this.opts.staticGrid && ("noResize" === e || "noMove" === e || "locked" === e));
                        s && (this.engine.cleanNodes().beginUpdate(i).moveNode(i, s), this._updateContainerHeight(), this._triggerChangeEvent(), this.engine.endUpdate()), r && this._writeAttr(e, i), a && this._prepareDragDropByNode(i)
                    })), this
                }
                margin(e) {
                    if (!("string" == typeof e && e.split(" ").length > 1)) {
                        let t = o.Utils.parseHeight(e);
                        if (this.opts.marginUnit === t.unit && this.opts.margin === t.h) return
                    }
                    return this.opts.margin = e, this.opts.marginTop = this.opts.marginBottom = this.opts.marginLeft = this.opts.marginRight = void 0, this.initMargin(), this._updateStyles(!0), this
                }
                getMargin() {
                    return this.opts.margin
                }
                willItFit(e) {
                    if (arguments.length > 1) {
                        console.warn("gridstack.ts: `willItFit(x,y,w,h,autoPosition)` is deprecated. Use `willItFit({x, y,...})`. It will be removed soon");
                        let e = arguments,
                            t = 0,
                            i = {
                                x: e[t++],
                                y: e[t++],
                                w: e[t++],
                                h: e[t++],
                                autoPosition: e[t++]
                            };
                        return this.willItFit(i)
                    }
                    return this.engine.willItFit(e)
                }
                _triggerChangeEvent() {
                    if (this.engine.batchMode) return this;
                    let e = this.engine.getDirtyNodes(!0);
                    return e && e.length && (this._ignoreLayoutsNodeChange || this.engine.layoutsNodesChange(e), this._triggerEvent("change", e)), this.engine.saveInitial(), this
                }
                _triggerAddEvent() {
                    return this.engine.batchMode || this.engine.addedNodes && this.engine.addedNodes.length > 0 && (this._ignoreLayoutsNodeChange || this.engine.layoutsNodesChange(this.engine.addedNodes), this.engine.addedNodes.forEach((e => {
                        delete e._dirty
                    })), this._triggerEvent("added", this.engine.addedNodes), this.engine.addedNodes = []), this
                }
                _triggerRemoveEvent() {
                    return this.engine.batchMode || this.engine.removedNodes && this.engine.removedNodes.length > 0 && (this._triggerEvent("removed", this.engine.removedNodes), this.engine.removedNodes = []), this
                }
                _triggerEvent(e, t) {
                    let i = t ? new CustomEvent(e, {
                        bubbles: !1,
                        detail: t
                    }) : new Event(e);
                    return this.el.dispatchEvent(i), this
                }
                _removeStylesheet() {
                    return this._styles && (o.Utils.removeStylesheet(this._styles._id), delete this._styles), this
                }
                _updateStyles(e = !1, t) {
                    if (e && this._removeStylesheet(), this._updateContainerHeight(), 0 === this.opts.cellHeight) return this;
                    let i = this.opts.cellHeight,
                        n = this.opts.cellHeightUnit,
                        s = `.${this.opts._styleSheetClass} > .${this.opts.itemClass}`;
                    if (!this._styles) {
                        let e = "gridstack-style-" + (1e5 * Math.random()).toFixed(),
                            t = this.opts.styleInHead ? void 0 : this.el.parentNode;
                        if (this._styles = o.Utils.createStylesheet(e, t), !this._styles) return this;
                        this._styles._id = e, this._styles._max = 0, o.Utils.addCSSRule(this._styles, s, `min-height: ${i}${n}`);
                        let r = this.opts.marginTop + this.opts.marginUnit,
                            a = this.opts.marginBottom + this.opts.marginUnit,
                            l = this.opts.marginRight + this.opts.marginUnit,
                            h = this.opts.marginLeft + this.opts.marginUnit,
                            u = `${s} > .grid-stack-item-content`,
                            c = `.${this.opts._styleSheetClass} > .grid-stack-placeholder > .placeholder-content`;
                        o.Utils.addCSSRule(this._styles, u, `top: ${r}; right: ${l}; bottom: ${a}; left: ${h};`), o.Utils.addCSSRule(this._styles, c, `top: ${r}; right: ${l}; bottom: ${a}; left: ${h};`), o.Utils.addCSSRule(this._styles, `${s} > .ui-resizable-ne`, `right: ${l}`), o.Utils.addCSSRule(this._styles, `${s} > .ui-resizable-e`, `right: ${l}`), o.Utils.addCSSRule(this._styles, `${s} > .ui-resizable-se`, `right: ${l}; bottom: ${a}`), o.Utils.addCSSRule(this._styles, `${s} > .ui-resizable-nw`, `left: ${h}`), o.Utils.addCSSRule(this._styles, `${s} > .ui-resizable-w`, `left: ${h}`), o.Utils.addCSSRule(this._styles, `${s} > .ui-resizable-sw`, `left: ${h}; bottom: ${a}`)
                    }
                    if ((t = t || this._styles._max) > this._styles._max) {
                        let e = e => i * e + n;
                        for (let i = this._styles._max + 1; i <= t; i++) {
                            let t = e(i);
                            o.Utils.addCSSRule(this._styles, `${s}[gs-y="${i-1}"]`, `top: ${e(i-1)}`), o.Utils.addCSSRule(this._styles, `${s}[gs-h="${i}"]`, `height: ${t}`), o.Utils.addCSSRule(this._styles, `${s}[gs-min-h="${i}"]`, `min-height: ${t}`), o.Utils.addCSSRule(this._styles, `${s}[gs-max-h="${i}"]`, `max-height: ${t}`)
                        }
                        this._styles._max = t
                    }
                    return this
                }
                _updateContainerHeight() {
                    if (!this.engine || this.engine.batchMode) return this;
                    let e = this.getRow() + this._extraDragRow,
                        t = parseInt(getComputedStyle(this.el)["min-height"]);
                    if (t > 0) {
                        let i = Math.round(t / this.getCellHeight(!0));
                        e < i && (e = i)
                    }
                    if (this.el.setAttribute("gs-current-row", String(e)), 0 === e) return this.el.style.removeProperty("height"), this;
                    let i = this.opts.cellHeight,
                        n = this.opts.cellHeightUnit;
                    return i ? (this.el.style.height = e * i + n, this) : this
                }
                _prepareElement(e, t = !1, i) {
                    i || (e.classList.add(this.opts.itemClass), i = this._readAttr(e)), e.gridstackNode = i, i.el = e, i.grid = this;
                    let n = Object.assign({}, i);
                    return i = this.engine.addNode(i, t), o.Utils.same(i, n) || this._writeAttr(e, i), this._prepareDragDropByNode(i), this
                }
                _writePosAttr(e, t) {
                    return void 0 !== t.x && null !== t.x && e.setAttribute("gs-x", String(t.x)), void 0 !== t.y && null !== t.y && e.setAttribute("gs-y", String(t.y)), t.w && e.setAttribute("gs-w", String(t.w)), t.h && e.setAttribute("gs-h", String(t.h)), this
                }
                _writeAttr(e, t) {
                    if (!t) return this;
                    this._writePosAttr(e, t);
                    let i = {
                        autoPosition: "gs-auto-position",
                        minW: "gs-min-w",
                        minH: "gs-min-h",
                        maxW: "gs-max-w",
                        maxH: "gs-max-h",
                        noResize: "gs-no-resize",
                        noMove: "gs-no-move",
                        locked: "gs-locked",
                        id: "gs-id",
                        resizeHandles: "gs-resize-handles"
                    };
                    for (const n in i) t[n] ? e.setAttribute(i[n], String(t[n])) : e.removeAttribute(i[n]);
                    return this
                }
                _readAttr(e) {
                    let t = {};
                    t.x = o.Utils.toNumber(e.getAttribute("gs-x")), t.y = o.Utils.toNumber(e.getAttribute("gs-y")), t.w = o.Utils.toNumber(e.getAttribute("gs-w")), t.h = o.Utils.toNumber(e.getAttribute("gs-h")), t.maxW = o.Utils.toNumber(e.getAttribute("gs-max-w")), t.minW = o.Utils.toNumber(e.getAttribute("gs-min-w")), t.maxH = o.Utils.toNumber(e.getAttribute("gs-max-h")), t.minH = o.Utils.toNumber(e.getAttribute("gs-min-h")), t.autoPosition = o.Utils.toBool(e.getAttribute("gs-auto-position")), t.noResize = o.Utils.toBool(e.getAttribute("gs-no-resize")), t.noMove = o.Utils.toBool(e.getAttribute("gs-no-move")), t.locked = o.Utils.toBool(e.getAttribute("gs-locked")), t.resizeHandles = e.getAttribute("gs-resize-handles"), t.id = e.getAttribute("gs-id");
                    for (const e in t) {
                        if (!t.hasOwnProperty(e)) return;
                        t[e] || 0 === t[e] || delete t[e]
                    }
                    return t
                }
                _setStaticClass() {
                    let e = ["grid-stack-static"];
                    return this.opts.staticGrid ? (this.el.classList.add(...e), this.el.setAttribute("gs-static", "true")) : (this.el.classList.remove(...e), this.el.removeAttribute("gs-static")), this
                }
                onParentResize() {
                    if (!this.el || !this.el.clientWidth) return;
                    let e = !this.opts.disableOneColumnMode && this.el.clientWidth <= this.opts.minWidth,
                        t = !1;
                    return 1 === this.opts.column !== e && (t = !0, this.opts.animate && this.setAnimation(!1), this.column(e ? 1 : this._prevColumn), this.opts.animate && this.setAnimation(!0)), this._isAutoCellHeight && (!t && this.opts.cellHeightThrottle ? (this._cellHeightThrottle || (this._cellHeightThrottle = o.Utils.throttle((() => this.cellHeight()), this.opts.cellHeightThrottle)), this._cellHeightThrottle()) : this.cellHeight()), this.engine.nodes.forEach((e => {
                        e.subGrid && e.subGrid.onParentResize()
                    })), this
                }
                _updateWindowResizeEvent(e = !1) {
                    const t = (this._isAutoCellHeight || !this.opts.disableOneColumnMode) && !this.opts._isNested;
                    return e || !t || this._windowResizeBind ? !e && t || !this._windowResizeBind || (window.removeEventListener("resize", this._windowResizeBind), delete this._windowResizeBind) : (this._windowResizeBind = this.onParentResize.bind(this), window.addEventListener("resize", this._windowResizeBind)), this
                }
                static getElement(e = ".grid-stack-item") {
                    return o.Utils.getElement(e)
                }
                static getElements(e = ".grid-stack-item") {
                    return o.Utils.getElements(e)
                }
                static getGridElement(e) {
                    return l.getElement(e)
                }
                static getGridElements(e) {
                    return o.Utils.getElements(e)
                }
                initMargin() {
                    let e, t = 0,
                        i = [];
                    return "string" == typeof this.opts.margin && (i = this.opts.margin.split(" ")), 2 === i.length ? (this.opts.marginTop = this.opts.marginBottom = i[0], this.opts.marginLeft = this.opts.marginRight = i[1]) : 4 === i.length ? (this.opts.marginTop = i[0], this.opts.marginRight = i[1], this.opts.marginBottom = i[2], this.opts.marginLeft = i[3]) : (e = o.Utils.parseHeight(this.opts.margin), this.opts.marginUnit = e.unit, t = this.opts.margin = e.h), void 0 === this.opts.marginTop ? this.opts.marginTop = t : (e = o.Utils.parseHeight(this.opts.marginTop), this.opts.marginTop = e.h, delete this.opts.margin), void 0 === this.opts.marginBottom ? this.opts.marginBottom = t : (e = o.Utils.parseHeight(this.opts.marginBottom), this.opts.marginBottom = e.h, delete this.opts.margin), void 0 === this.opts.marginRight ? this.opts.marginRight = t : (e = o.Utils.parseHeight(this.opts.marginRight), this.opts.marginRight = e.h, delete this.opts.margin), void 0 === this.opts.marginLeft ? this.opts.marginLeft = t : (e = o.Utils.parseHeight(this.opts.marginLeft), this.opts.marginLeft = e.h, delete this.opts.margin), this.opts.marginUnit = e.unit, this.opts.marginTop === this.opts.marginBottom && this.opts.marginLeft === this.opts.marginRight && this.opts.marginTop === this.opts.marginRight && (this.opts.margin = this.opts.marginTop), this
                }
                static setupDragIn(e, t) {}
                movable(e, t) {
                    return this
                }
                resizable(e, t) {
                    return this
                }
                disable() {
                    return this
                }
                enable() {
                    return this
                }
                enableMove(e) {
                    return this
                }
                enableResize(e) {
                    return this
                }
                _setupAcceptWidget() {
                    return this
                }
                _setupRemoveDrop() {
                    return this
                }
                _prepareDragDropByNode(e) {
                    return this
                }
                _onStartMoving(e, t, i, n, s, o) {}
                _dragOrResize(e, t, i, n, s, o) {}
                _leave(e, t, i, n = !1) {}
            }
            t.GridStack = l, l.Utils = o.Utils, l.Engine = s.GridStackEngine
        },
        906: (e, t, i) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            const n = i(21),
                s = i(28);
            t.$ = s, i(87), i(949),
                function(e) {
                    for (var i in e) t.hasOwnProperty(i) || (t[i] = e[i])
                }(i(21));
            class o extends n.GridStackDD {
                resizable(e, t, i, n) {
                    let o = s(e);
                    if ("enable" === t) o.resizable().resizable(t);
                    else if ("disable" === t || "destroy" === t) o.data("ui-resizable") && o.resizable(t);
                    else if ("option" === t) o.resizable(t, i, n);
                    else {
                        const i = e.gridstackNode.grid;
                        let n = o.data("gs-resize-handles") ? o.data("gs-resize-handles") : i.opts.resizable.handles;
                        o.resizable(Object.assign(Object.assign(Object.assign({}, i.opts.resizable), {
                            handles: n
                        }), {
                            start: t.start,
                            stop: t.stop,
                            resize: t.resize
                        }))
                    }
                    return this
                }
                draggable(e, t, i, n) {
                    let o = s(e);
                    if ("enable" === t) o.draggable().draggable("enable");
                    else if ("disable" === t || "destroy" === t) o.data("ui-draggable") && o.draggable(t);
                    else if ("option" === t) o.draggable(t, i, n);
                    else {
                        const i = e.gridstackNode.grid;
                        o.draggable(Object.assign(Object.assign({}, i.opts.draggable), {
                            containment: i.opts._isNested && !i.opts.dragOut ? s(i.el).parent() : i.opts.draggable.containment || null,
                            start: t.start,
                            stop: t.stop,
                            drag: t.drag
                        }))
                    }
                    return this
                }
                dragIn(e, t) {
                    return s(e).draggable(t), this
                }
                droppable(e, t, i, n) {
                    let o = s(e);
                    return "function" != typeof t.accept || t._accept || (t._accept = t.accept, t.accept = e => t._accept(e.get(0))), o.droppable(t, i, n), this
                }
                isDroppable(e) {
                    let t = s(e);
                    return Boolean(t.data("ui-droppable"))
                }
                isDraggable(e) {
                    let t = s(e);
                    return Boolean(t.data("ui-draggable"))
                }
                isResizable(e) {
                    let t = s(e);
                    return Boolean(t.data("ui-resizable"))
                }
                on(e, t, i) {
                    return s(e).on(t, ((e, t) => {
                        i(e, t.draggable ? t.draggable[0] : e.target, t.helper ? t.helper[0] : null)
                    })), this
                }
                off(e, t) {
                    return s(e).off(t), this
                }
            }
            t.GridStackDDJQueryUI = o, n.GridStackDD.registerPlugin(o)
        },
        593: (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.obsolete = function(e, t, i, n, s) {
                let o = (...o) => (console.warn("gridstack.js: Function `" + i + "` is deprecated in " + s + " and has been replaced with `" + n + "`. It will be **completely** removed in v1.0"), t.apply(e, o));
                return o.prototype = t.prototype, o
            }, t.obsoleteOpts = function(e, t, i, n) {
                void 0 !== e[t] && (e[i] = e[t], console.warn("gridstack.js: Option `" + t + "` is deprecated in " + n + " and has been replaced with `" + i + "`. It will be **completely** removed in v1.0"))
            }, t.obsoleteOptsDel = function(e, t, i, n) {
                void 0 !== e[t] && console.warn("gridstack.js: Option `" + t + "` is deprecated in " + i + n)
            }, t.obsoleteAttr = function(e, t, i, n) {
                let s = e.getAttribute(t);
                null !== s && (e.setAttribute(i, s), console.warn("gridstack.js: attribute `" + t + "`=" + s + " is deprecated on this object in " + n + " and has been replaced with `" + i + "`. It will be **completely** removed in v1.0"))
            };
            class i {
                static getElements(e) {
                    if ("string" == typeof e) {
                        let t = document.querySelectorAll(e);
                        return t.length || "." === e[0] || "#" === e[0] || (t = document.querySelectorAll("." + e), t.length || (t = document.querySelectorAll("#" + e))), Array.from(t)
                    }
                    return [e]
                }
                static getElement(e) {
                    if ("string" == typeof e) {
                        if (!e.length) return null;
                        if ("#" === e[0]) return document.getElementById(e.substring(1));
                        if ("." === e[0] || "[" === e[0]) return document.querySelector(e);
                        if (!isNaN(+e[0])) return document.getElementById(e);
                        let t = document.querySelector(e);
                        return t || (t = document.getElementById(e)), t || (t = document.querySelector("." + e)), t
                    }
                    return e
                }
                static isIntercepted(e, t) {
                    return !(e.y >= t.y + t.h || e.y + e.h <= t.y || e.x + e.w <= t.x || e.x >= t.x + t.w)
                }
                static isTouching(e, t) {
                    return i.isIntercepted(e, {
                        x: t.x - .5,
                        y: t.y - .5,
                        w: t.w + 1,
                        h: t.h + 1
                    })
                }
                static sort(e, t, i) {
                    return i = i || e.reduce(((e, t) => Math.max(t.x + t.w, e)), 0) || 12, -1 === t ? e.sort(((e, t) => t.x + t.y * i - (e.x + e.y * i))) : e.sort(((e, t) => e.x + e.y * i - (t.x + t.y * i)))
                }
                static createStylesheet(e, t) {
                    let i = document.createElement("style");
                    return i.setAttribute("type", "text/css"), i.setAttribute("gs-style-id", e), i.styleSheet ? i.styleSheet.cssText = "" : i.appendChild(document.createTextNode("")), t ? t.insertBefore(i, t.firstChild) : (t = document.getElementsByTagName("head")[0]).appendChild(i), i.sheet
                }
                static removeStylesheet(e) {
                    let t = document.querySelector("STYLE[gs-style-id=" + e + "]");
                    t && t.parentNode && t.remove()
                }
                static addCSSRule(e, t, i) {
                    "function" == typeof e.addRule ? e.addRule(t, i) : "function" == typeof e.insertRule && e.insertRule(`${t}{${i}}`)
                }
                static toBool(e) {
                    return "boolean" == typeof e ? e : "string" == typeof e ? !("" === (e = e.toLowerCase()) || "no" === e || "false" === e || "0" === e) : Boolean(e)
                }
                static toNumber(e) {
                    return null === e || 0 === e.length ? void 0 : Number(e)
                }
                static parseHeight(e) {
                    let t, i = "px";
                    if ("string" == typeof e) {
                        let n = e.match(/^(-[0-9]+\.[0-9]+|[0-9]*\.[0-9]+|-[0-9]+|[0-9]+)(px|em|rem|vh|vw|%)?$/);
                        if (!n) throw new Error("Invalid height");
                        i = n[2] || "px", t = parseFloat(n[1])
                    } else t = e;
                    return {
                        h: t,
                        unit: i
                    }
                }
                static defaults(e, ...t) {
                    return t.forEach((t => {
                        for (const i in t) {
                            if (!t.hasOwnProperty(i)) return;
                            null === e[i] || void 0 === e[i] ? e[i] = t[i] : "object" == typeof t[i] && "object" == typeof e[i] && this.defaults(e[i], t[i])
                        }
                    })), e
                }
                static same(e, t) {
                    if ("object" != typeof e) return e == t;
                    if (typeof e != typeof t) return !1;
                    if (Object.keys(e).length !== Object.keys(t).length) return !1;
                    for (const i in e)
                        if (e[i] !== t[i]) return !1;
                    return !0
                }
                static copyPos(e, t, i = !1) {
                    return e.x = t.x, e.y = t.y, e.w = t.w, e.h = t.h, i ? (t.minW && (e.minW = t.minW), t.minH && (e.minH = t.minH), t.maxW && (e.maxW = t.maxW), t.maxH && (e.maxH = t.maxH), e) : e
                }
                static samePos(e, t) {
                    return e && t && e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h
                }
                static removeInternalAndSame(e, t) {
                    if ("object" == typeof e && "object" == typeof t)
                        for (let i in e) {
                            let n = e[i];
                            if (n && "object" == typeof n && void 0 !== t[i]) {
                                for (let e in n) n[e] !== t[i][e] && "_" !== e[0] || delete n[e];
                                Object.keys(n).length || delete e[i]
                            } else n !== t[i] && "_" !== i[0] || delete e[i]
                        }
                }
                static closestByClass(e, t) {
                    for (; e = e.parentElement;)
                        if (e.classList.contains(t)) return e;
                    return null
                }
                static throttle(e, t) {
                    let i = !1;
                    return (...n) => {
                        i || (i = !0, setTimeout((() => {
                            e(...n), i = !1
                        }), t))
                    }
                }
                static removePositioningStyles(e) {
                    let t = e.style;
                    t.position && t.removeProperty("position"), t.left && t.removeProperty("left"), t.top && t.removeProperty("top"), t.width && t.removeProperty("width"), t.height && t.removeProperty("height")
                }
                static getScrollParent(e) {
                    if (null === e) return document.documentElement;
                    const t = getComputedStyle(e);
                    return /(auto|scroll)/.test(t.overflow + t.overflowY) ? e : this.getScrollParent(e.parentElement)
                }
                static updateScrollPosition(e, t, i) {
                    let n = e.getBoundingClientRect(),
                        s = window.innerHeight || document.documentElement.clientHeight;
                    if (n.top < 0 || n.bottom > s) {
                        let o = n.bottom - s,
                            r = n.top,
                            a = this.getScrollParent(e);
                        if (null !== a) {
                            let l = a.scrollTop;
                            n.top < 0 && i < 0 ? e.offsetHeight > s ? a.scrollTop += i : a.scrollTop += Math.abs(r) > Math.abs(i) ? i : r : i > 0 && (e.offsetHeight > s ? a.scrollTop += i : a.scrollTop += o > i ? i : o), t.top += a.scrollTop - l
                        }
                    }
                }
                static updateScrollResize(e, t, i) {
                    const n = this.getScrollParent(t),
                        s = n.clientHeight,
                        o = e.clientY < i,
                        r = e.clientY > s - i;
                    o ? n.scrollBy({
                        behavior: "smooth",
                        top: e.clientY - i
                    }) : r && n.scrollBy({
                        behavior: "smooth",
                        top: i - (s - e.clientY)
                    })
                }
            }
            t.Utils = i
        },
        87: (e, t, i) => {
            var n, s, o;
            s = [i(28)], void 0 === (o = "function" == typeof(n = function(e) {
                e.ui = e.ui || {}, e.ui.version = "1.12.1";
                var t, i = 0,
                    n = Array.prototype.slice;
                e.cleanData = (t = e.cleanData, function(i) {
                    var n, s, o;
                    for (o = 0; null != (s = i[o]); o++) try {
                        (n = e._data(s, "events")) && n.remove && e(s).triggerHandler("remove")
                    } catch (e) {}
                    t(i)
                }), e.widget = function(t, i, n) {
                    var s, o, r, a = {},
                        l = t.split(".")[0],
                        h = l + "-" + (t = t.split(".")[1]);
                    return n || (n = i, i = e.Widget), e.isArray(n) && (n = e.extend.apply(null, [{}].concat(n))), e.expr[":"][h.toLowerCase()] = function(t) {
                        return !!e.data(t, h)
                    }, e[l] = e[l] || {}, s = e[l][t], o = e[l][t] = function(e, t) {
                        if (!this._createWidget) return new o(e, t);
                        arguments.length && this._createWidget(e, t)
                    }, e.extend(o, s, {
                        version: n.version,
                        _proto: e.extend({}, n),
                        _childConstructors: []
                    }), (r = new i).options = e.widget.extend({}, r.options), e.each(n, (function(t, n) {
                        e.isFunction(n) ? a[t] = function() {
                            function e() {
                                return i.prototype[t].apply(this, arguments)
                            }

                            function s(e) {
                                return i.prototype[t].apply(this, e)
                            }
                            return function() {
                                var t, i = this._super,
                                    o = this._superApply;
                                return this._super = e, this._superApply = s, t = n.apply(this, arguments), this._super = i, this._superApply = o, t
                            }
                        }() : a[t] = n
                    })), o.prototype = e.widget.extend(r, {
                        widgetEventPrefix: s && r.widgetEventPrefix || t
                    }, a, {
                        constructor: o,
                        namespace: l,
                        widgetName: t,
                        widgetFullName: h
                    }), s ? (e.each(s._childConstructors, (function(t, i) {
                        var n = i.prototype;
                        e.widget(n.namespace + "." + n.widgetName, o, i._proto)
                    })), delete s._childConstructors) : i._childConstructors.push(o), e.widget.bridge(t, o), o
                }, e.widget.extend = function(t) {
                    for (var i, s, o = n.call(arguments, 1), r = 0, a = o.length; r < a; r++)
                        for (i in o[r]) s = o[r][i], o[r].hasOwnProperty(i) && void 0 !== s && (e.isPlainObject(s) ? t[i] = e.isPlainObject(t[i]) ? e.widget.extend({}, t[i], s) : e.widget.extend({}, s) : t[i] = s);
                    return t
                }, e.widget.bridge = function(t, i) {
                    var s = i.prototype.widgetFullName || t;
                    e.fn[t] = function(o) {
                        var r = "string" == typeof o,
                            a = n.call(arguments, 1),
                            l = this;
                        return r ? this.length || "instance" !== o ? this.each((function() {
                            var i, n = e.data(this, s);
                            return "instance" === o ? (l = n, !1) : n ? e.isFunction(n[o]) && "_" !== o.charAt(0) ? (i = n[o].apply(n, a)) !== n && void 0 !== i ? (l = i && i.jquery ? l.pushStack(i.get()) : i, !1) : void 0 : e.error("no such method '" + o + "' for " + t + " widget instance") : e.error("cannot call methods on " + t + " prior to initialization; attempted to call method '" + o + "'")
                        })) : l = void 0 : (a.length && (o = e.widget.extend.apply(null, [o].concat(a))), this.each((function() {
                            var t = e.data(this, s);
                            t ? (t.option(o || {}), t._init && t._init()) : e.data(this, s, new i(o, this))
                        }))), l
                    }
                }, e.Widget = function() {}, e.Widget._childConstructors = [], e.Widget.prototype = {
                    widgetName: "widget",
                    widgetEventPrefix: "",
                    defaultElement: "<div>",
                    options: {
                        classes: {},
                        disabled: !1,
                        create: null
                    },
                    _createWidget: function(t, n) {
                        n = e(n || this.defaultElement || this)[0], this.element = e(n), this.uuid = i++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = e(), this.hoverable = e(), this.focusable = e(), this.classesElementLookup = {}, n !== this && (e.data(n, this.widgetFullName, this), this._on(!0, this.element, {
                            remove: function(e) {
                                e.target === n && this.destroy()
                            }
                        }), this.document = e(n.style ? n.ownerDocument : n.document || n), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), this.options = e.widget.extend({}, this.options, this._getCreateOptions(), t), this._create(), this.options.disabled && this._setOptionDisabled(this.options.disabled), this._trigger("create", null, this._getCreateEventData()), this._init()
                    },
                    _getCreateOptions: function() {
                        return {}
                    },
                    _getCreateEventData: e.noop,
                    _create: e.noop,
                    _init: e.noop,
                    destroy: function() {
                        var t = this;
                        this._destroy(), e.each(this.classesElementLookup, (function(e, i) {
                            t._removeClass(i, e)
                        })), this.element.off(this.eventNamespace).removeData(this.widgetFullName), this.widget().off(this.eventNamespace).removeAttr("aria-disabled"), this.bindings.off(this.eventNamespace)
                    },
                    _destroy: e.noop,
                    widget: function() {
                        return this.element
                    },
                    option: function(t, i) {
                        var n, s, o, r = t;
                        if (0 === arguments.length) return e.widget.extend({}, this.options);
                        if ("string" == typeof t)
                            if (r = {}, n = t.split("."), t = n.shift(), n.length) {
                                for (s = r[t] = e.widget.extend({}, this.options[t]), o = 0; o < n.length - 1; o++) s[n[o]] = s[n[o]] || {}, s = s[n[o]];
                                if (t = n.pop(), 1 === arguments.length) return void 0 === s[t] ? null : s[t];
                                s[t] = i
                            } else {
                                if (1 === arguments.length) return void 0 === this.options[t] ? null : this.options[t];
                                r[t] = i
                            } return this._setOptions(r), this
                    },
                    _setOptions: function(e) {
                        var t;
                        for (t in e) this._setOption(t, e[t]);
                        return this
                    },
                    _setOption: function(e, t) {
                        return "classes" === e && this._setOptionClasses(t), this.options[e] = t, "disabled" === e && this._setOptionDisabled(t), this
                    },
                    _setOptionClasses: function(t) {
                        var i, n, s;
                        for (i in t) s = this.classesElementLookup[i], t[i] !== this.options.classes[i] && s && s.length && (n = e(s.get()), this._removeClass(s, i), n.addClass(this._classes({
                            element: n,
                            keys: i,
                            classes: t,
                            add: !0
                        })))
                    },
                    _setOptionDisabled: function(e) {
                        this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, !!e), e && (this._removeClass(this.hoverable, null, "ui-state-hover"), this._removeClass(this.focusable, null, "ui-state-focus"))
                    },
                    enable: function() {
                        return this._setOptions({
                            disabled: !1
                        })
                    },
                    disable: function() {
                        return this._setOptions({
                            disabled: !0
                        })
                    },
                    _classes: function(t) {
                        var i = [],
                            n = this;

                        function s(s, o) {
                            var r, a;
                            for (a = 0; a < s.length; a++) r = n.classesElementLookup[s[a]] || e(), r = t.add ? e(e.unique(r.get().concat(t.element.get()))) : e(r.not(t.element).get()), n.classesElementLookup[s[a]] = r, i.push(s[a]), o && t.classes[s[a]] && i.push(t.classes[s[a]])
                        }
                        return t = e.extend({
                            element: this.element,
                            classes: this.options.classes || {}
                        }, t), this._on(t.element, {
                            remove: "_untrackClassesElement"
                        }), t.keys && s(t.keys.match(/\S+/g) || [], !0), t.extra && s(t.extra.match(/\S+/g) || []), i.join(" ")
                    },
                    _untrackClassesElement: function(t) {
                        var i = this;
                        e.each(i.classesElementLookup, (function(n, s) {
                            -1 !== e.inArray(t.target, s) && (i.classesElementLookup[n] = e(s.not(t.target).get()))
                        }))
                    },
                    _removeClass: function(e, t, i) {
                        return this._toggleClass(e, t, i, !1)
                    },
                    _addClass: function(e, t, i) {
                        return this._toggleClass(e, t, i, !0)
                    },
                    _toggleClass: function(e, t, i, n) {
                        n = "boolean" == typeof n ? n : i;
                        var s = "string" == typeof e || null === e,
                            o = {
                                extra: s ? t : i,
                                keys: s ? e : t,
                                element: s ? this.element : e,
                                add: n
                            };
                        return o.element.toggleClass(this._classes(o), n), this
                    },
                    _on: function(t, i, n) {
                        var s, o = this;
                        "boolean" != typeof t && (n = i, i = t, t = !1), n ? (i = s = e(i), this.bindings = this.bindings.add(i)) : (n = i, i = this.element, s = this.widget()), e.each(n, (function(n, r) {
                            function a() {
                                if (t || !0 !== o.options.disabled && !e(this).hasClass("ui-state-disabled")) return ("string" == typeof r ? o[r] : r).apply(o, arguments)
                            }
                            "string" != typeof r && (a.guid = r.guid = r.guid || a.guid || e.guid++);
                            var l = n.match(/^([\w:-]*)\s*(.*)$/),
                                h = l[1] + o.eventNamespace,
                                u = l[2];
                            u ? s.on(h, u, a) : i.on(h, a)
                        }))
                    },
                    _off: function(t, i) {
                        i = (i || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, t.off(i).off(i), this.bindings = e(this.bindings.not(t).get()), this.focusable = e(this.focusable.not(t).get()), this.hoverable = e(this.hoverable.not(t).get())
                    },
                    _delay: function(e, t) {
                        var i = this;
                        return setTimeout((function() {
                            return ("string" == typeof e ? i[e] : e).apply(i, arguments)
                        }), t || 0)
                    },
                    _hoverable: function(t) {
                        this.hoverable = this.hoverable.add(t), this._on(t, {
                            mouseenter: function(t) {
                                this._addClass(e(t.currentTarget), null, "ui-state-hover")
                            },
                            mouseleave: function(t) {
                                this._removeClass(e(t.currentTarget), null, "ui-state-hover")
                            }
                        })
                    },
                    _focusable: function(t) {
                        this.focusable = this.focusable.add(t), this._on(t, {
                            focusin: function(t) {
                                this._addClass(e(t.currentTarget), null, "ui-state-focus")
                            },
                            focusout: function(t) {
                                this._removeClass(e(t.currentTarget), null, "ui-state-focus")
                            }
                        })
                    },
                    _trigger: function(t, i, n) {
                        var s, o, r = this.options[t];
                        if (n = n || {}, (i = e.Event(i)).type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), i.target = this.element[0], o = i.originalEvent)
                            for (s in o) s in i || (i[s] = o[s]);
                        return this.element.trigger(i, n), !(e.isFunction(r) && !1 === r.apply(this.element[0], [i].concat(n)) || i.isDefaultPrevented())
                    }
                }, e.each({
                    show: "fadeIn",
                    hide: "fadeOut"
                }, (function(t, i) {
                    e.Widget.prototype["_" + t] = function(n, s, o) {
                        var r;
                        "string" == typeof s && (s = {
                            effect: s
                        });
                        var a = s ? !0 === s || "number" == typeof s ? i : s.effect || i : t;
                        "number" == typeof(s = s || {}) && (s = {
                            duration: s
                        }), r = !e.isEmptyObject(s), s.complete = o, s.delay && n.delay(s.delay), r && e.effects && e.effects.effect[a] ? n[t](s) : a !== t && n[a] ? n[a](s.duration, s.easing, o) : n.queue((function(i) {
                            e(this)[t](), o && o.call(n[0]), i()
                        }))
                    }
                })), e.widget, e.extend(e.expr[":"], {
                    data: e.expr.createPseudo ? e.expr.createPseudo((function(t) {
                        return function(i) {
                            return !!e.data(i, t)
                        }
                    })) : function(t, i, n) {
                        return !!e.data(t, n[3])
                    }
                }), e.fn.extend({
                    disableSelection: (s = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown", function() {
                        return this.on(s + ".ui-disableSelection", (function(e) {
                            e.preventDefault()
                        }))
                    }),
                    enableSelection: function() {
                        return this.off(".ui-disableSelection")
                    }
                }), e.fn.scrollParent = function(t) {
                    var i = this.css("position"),
                        n = "absolute" === i,
                        s = t ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
                        o = this.parents().filter((function() {
                            var t = e(this);
                            return (!n || "static" !== t.css("position")) && s.test(t.css("overflow") + t.css("overflow-y") + t.css("overflow-x"))
                        })).eq(0);
                    return "fixed" !== i && o.length ? o : e(this[0].ownerDocument || document)
                }, e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
                var s, o = !1;
                e(document).on("mouseup", (function() {
                    o = !1
                })), e.widget("ui.mouse", {
                    version: "1.12.1",
                    options: {
                        cancel: "input, textarea, button, select, option",
                        distance: 1,
                        delay: 0
                    },
                    _mouseInit: function() {
                        var t = this;
                        this.element.on("mousedown." + this.widgetName, (function(e) {
                            return t._mouseDown(e)
                        })).on("click." + this.widgetName, (function(i) {
                            if (!0 === e.data(i.target, t.widgetName + ".preventClickEvent")) return e.removeData(i.target, t.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1
                        })), this.started = !1
                    },
                    _mouseDestroy: function() {
                        this.element.off("." + this.widgetName), this._mouseMoveDelegate && this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate)
                    },
                    _mouseDown: function(t) {
                        if (!o) {
                            this._mouseMoved = !1, this._mouseStarted && this._mouseUp(t), this._mouseDownEvent = t;
                            var i = this,
                                n = 1 === t.which,
                                s = !("string" != typeof this.options.cancel || !t.target.nodeName) && e(t.target).closest(this.options.cancel).length;
                            return !(n && !s && this._mouseCapture(t) && (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout((function() {
                                i.mouseDelayMet = !0
                            }), this.options.delay)), this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = !1 !== this._mouseStart(t), !this._mouseStarted) ? (t.preventDefault(), 0) : (!0 === e.data(t.target, this.widgetName + ".preventClickEvent") && e.removeData(t.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(e) {
                                return i._mouseMove(e)
                            }, this._mouseUpDelegate = function(e) {
                                return i._mouseUp(e)
                            }, this.document.on("mousemove." + this.widgetName, this._mouseMoveDelegate).on("mouseup." + this.widgetName, this._mouseUpDelegate), t.preventDefault(), o = !0, 0)))
                        }
                    },
                    _mouseMove: function(t) {
                        if (this._mouseMoved) {
                            if (e.ui.ie && (!document.documentMode || document.documentMode < 9) && !t.button) return this._mouseUp(t);
                            if (!t.which)
                                if (t.originalEvent.altKey || t.originalEvent.ctrlKey || t.originalEvent.metaKey || t.originalEvent.shiftKey) this.ignoreMissingWhich = !0;
                                else if (!this.ignoreMissingWhich) return this._mouseUp(t)
                        }
                        return (t.which || t.button) && (this._mouseMoved = !0), this._mouseStarted ? (this._mouseDrag(t), t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = !1 !== this._mouseStart(this._mouseDownEvent, t), this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted)
                    },
                    _mouseUp: function(t) {
                        this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, t.target === this._mouseDownEvent.target && e.data(t.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(t)), this._mouseDelayTimer && (clearTimeout(this._mouseDelayTimer), delete this._mouseDelayTimer), this.ignoreMissingWhich = !1, o = !1, t.preventDefault()
                    },
                    _mouseDistanceMet: function(e) {
                        return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance
                    },
                    _mouseDelayMet: function() {
                        return this.mouseDelayMet
                    },
                    _mouseStart: function() {},
                    _mouseDrag: function() {},
                    _mouseStop: function() {},
                    _mouseCapture: function() {
                        return !0
                    }
                }), e.ui.plugin = {
                    add: function(t, i, n) {
                        var s, o = e.ui[t].prototype;
                        for (s in n) o.plugins[s] = o.plugins[s] || [], o.plugins[s].push([i, n[s]])
                    },
                    call: function(e, t, i, n) {
                        var s, o = e.plugins[t];
                        if (o && (n || e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType))
                            for (s = 0; s < o.length; s++) e.options[o[s][0]] && o[s][1].apply(e.element, i)
                    }
                }, e.ui.safeActiveElement = function(e) {
                    var t;
                    try {
                        t = e.activeElement
                    } catch (i) {
                        t = e.body
                    }
                    return t || (t = e.body), t.nodeName || (t = e.body), t
                }, e.ui.safeBlur = function(t) {
                    t && "body" !== t.nodeName.toLowerCase() && e(t).trigger("blur")
                }, e.widget("ui.draggable", e.ui.mouse, {
                    version: "1.12.1",
                    widgetEventPrefix: "drag",
                    options: {
                        addClasses: !0,
                        appendTo: "parent",
                        axis: !1,
                        connectToSortable: !1,
                        containment: !1,
                        cursor: "auto",
                        cursorAt: !1,
                        grid: !1,
                        handle: !1,
                        helper: "original",
                        iframeFix: !1,
                        opacity: !1,
                        refreshPositions: !1,
                        revert: !1,
                        revertDuration: 500,
                        scope: "default",
                        scroll: !0,
                        scrollSensitivity: 20,
                        scrollSpeed: 20,
                        snap: !1,
                        snapMode: "both",
                        snapTolerance: 20,
                        stack: !1,
                        zIndex: !1,
                        drag: null,
                        start: null,
                        stop: null
                    },
                    _create: function() {
                        "original" === this.options.helper && this._setPositionRelative(), this.options.addClasses && this._addClass("ui-draggable"), this._setHandleClassName(), this._mouseInit()
                    },
                    _setOption: function(e, t) {
                        this._super(e, t), "handle" === e && (this._removeHandleClassName(), this._setHandleClassName())
                    },
                    _destroy: function() {
                        (this.helper || this.element).is(".ui-draggable-dragging") ? this.destroyOnClear = !0 : (this._removeHandleClassName(), this._mouseDestroy())
                    },
                    _mouseCapture: function(t) {
                        var i = this.options;
                        return !(this.helper || i.disabled || e(t.target).closest(".ui-resizable-handle").length > 0 || (this.handle = this._getHandle(t), !this.handle || (this._blurActiveElement(t), this._blockFrames(!0 === i.iframeFix ? "iframe" : i.iframeFix), 0)))
                    },
                    _blockFrames: function(t) {
                        this.iframeBlocks = this.document.find(t).map((function() {
                            var t = e(this);
                            return e("<div>").css("position", "absolute").appendTo(t.parent()).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()).offset(t.offset())[0]
                        }))
                    },
                    _unblockFrames: function() {
                        this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
                    },
                    _blurActiveElement: function(t) {
                        var i = e.ui.safeActiveElement(this.document[0]);
                        e(t.target).closest(i).length || e.ui.safeBlur(i)
                    },
                    _mouseStart: function(t) {
                        var i = this.options;
                        return this.helper = this._createHelper(t), this._addClass(this.helper, "ui-draggable-dragging"), this._cacheHelperProportions(), e.ui.ddmanager && (e.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(!0), this.offsetParent = this.helper.offsetParent(), this.hasFixedAncestor = this.helper.parents().filter((function() {
                            return "fixed" === e(this).css("position")
                        })).length > 0, this.positionAbs = this.element.offset(), this._refreshOffsets(t), this.originalPosition = this.position = this._generatePosition(t, !1), this.originalPageX = t.pageX, this.originalPageY = t.pageY, i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt), this._setContainment(), !1 === this._trigger("start", t) ? (this._clear(), !1) : (this._cacheHelperProportions(), e.ui.ddmanager && !i.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t), this._mouseDrag(t, !0), e.ui.ddmanager && e.ui.ddmanager.dragStart(this, t), !0)
                    },
                    _refreshOffsets: function(e) {
                        this.offset = {
                            top: this.positionAbs.top - this.margins.top,
                            left: this.positionAbs.left - this.margins.left,
                            scroll: !1,
                            parent: this._getParentOffset(),
                            relative: this._getRelativeOffset()
                        }, this.offset.click = {
                            left: e.pageX - this.offset.left,
                            top: e.pageY - this.offset.top
                        }
                    },
                    _mouseDrag: function(t, i) {
                        if (this.hasFixedAncestor && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(t, !0), this.positionAbs = this._convertPositionTo("absolute"), !i) {
                            var n = this._uiHash();
                            if (!1 === this._trigger("drag", t, n)) return this._mouseUp(new e.Event("mouseup", t)), !1;
                            this.position = n.position
                        }
                        return this.helper[0].style.left = this.position.left + "px", this.helper[0].style.top = this.position.top + "px", e.ui.ddmanager && e.ui.ddmanager.drag(this, t), !1
                    },
                    _mouseStop: function(t) {
                        var i = this,
                            n = !1;
                        return e.ui.ddmanager && !this.options.dropBehaviour && (n = e.ui.ddmanager.drop(this, t)), this.dropped && (n = this.dropped, this.dropped = !1), "invalid" === this.options.revert && !n || "valid" === this.options.revert && n || !0 === this.options.revert || e.isFunction(this.options.revert) && this.options.revert.call(this.element, n) ? e(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), (function() {
                            !1 !== i._trigger("stop", t) && i._clear()
                        })) : !1 !== this._trigger("stop", t) && this._clear(), !1
                    },
                    _mouseUp: function(t) {
                        return this._unblockFrames(), e.ui.ddmanager && e.ui.ddmanager.dragStop(this, t), this.handleElement.is(t.target) && this.element.trigger("focus"), e.ui.mouse.prototype._mouseUp.call(this, t)
                    },
                    cancel: function() {
                        return this.helper.is(".ui-draggable-dragging") ? this._mouseUp(new e.Event("mouseup", {
                            target: this.element[0]
                        })) : this._clear(), this
                    },
                    _getHandle: function(t) {
                        return !this.options.handle || !!e(t.target).closest(this.element.find(this.options.handle)).length
                    },
                    _setHandleClassName: function() {
                        this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element, this._addClass(this.handleElement, "ui-draggable-handle")
                    },
                    _removeHandleClassName: function() {
                        this._removeClass(this.handleElement, "ui-draggable-handle")
                    },
                    _createHelper: function(t) {
                        var i = this.options,
                            n = e.isFunction(i.helper),
                            s = n ? e(i.helper.apply(this.element[0], [t])) : "clone" === i.helper ? this.element.clone().removeAttr("id") : this.element;
                        return s.parents("body").length || s.appendTo("parent" === i.appendTo ? this.element[0].parentNode : i.appendTo), n && s[0] === this.element[0] && this._setPositionRelative(), s[0] === this.element[0] || /(fixed|absolute)/.test(s.css("position")) || s.css("position", "absolute"), s
                    },
                    _setPositionRelative: function() {
                        /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative")
                    },
                    _adjustOffsetFromHelper: function(t) {
                        "string" == typeof t && (t = t.split(" ")), e.isArray(t) && (t = {
                            left: +t[0],
                            top: +t[1] || 0
                        }), "left" in t && (this.offset.click.left = t.left + this.margins.left), "right" in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left), "top" in t && (this.offset.click.top = t.top + this.margins.top), "bottom" in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
                    },
                    _isRootNode: function(e) {
                        return /(html|body)/i.test(e.tagName) || e === this.document[0]
                    },
                    _getParentOffset: function() {
                        var t = this.offsetParent.offset(),
                            i = this.document[0];
                        return "absolute" === this.cssPosition && this.scrollParent[0] !== i && e.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop()), this._isRootNode(this.offsetParent[0]) && (t = {
                            top: 0,
                            left: 0
                        }), {
                            top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                            left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
                        }
                    },
                    _getRelativeOffset: function() {
                        if ("relative" !== this.cssPosition) return {
                            top: 0,
                            left: 0
                        };
                        var e = this.element.position(),
                            t = this._isRootNode(this.scrollParent[0]);
                        return {
                            top: e.top - (parseInt(this.helper.css("top"), 10) || 0) + (t ? 0 : this.scrollParent.scrollTop()),
                            left: e.left - (parseInt(this.helper.css("left"), 10) || 0) + (t ? 0 : this.scrollParent.scrollLeft())
                        }
                    },
                    _cacheMargins: function() {
                        this.margins = {
                            left: parseInt(this.element.css("marginLeft"), 10) || 0,
                            top: parseInt(this.element.css("marginTop"), 10) || 0,
                            right: parseInt(this.element.css("marginRight"), 10) || 0,
                            bottom: parseInt(this.element.css("marginBottom"), 10) || 0
                        }
                    },
                    _cacheHelperProportions: function() {
                        this.helperProportions = {
                            width: this.helper.outerWidth(),
                            height: this.helper.outerHeight()
                        }
                    },
                    _setContainment: function() {
                        var t, i, n, s = this.options,
                            o = this.document[0];
                        this.relativeContainer = null, s.containment ? "window" !== s.containment ? "document" !== s.containment ? s.containment.constructor !== Array ? ("parent" === s.containment && (s.containment = this.helper[0].parentNode), (n = (i = e(s.containment))[0]) && (t = /(scroll|auto)/.test(i.css("overflow")), this.containment = [(parseInt(i.css("borderLeftWidth"), 10) || 0) + (parseInt(i.css("paddingLeft"), 10) || 0), (parseInt(i.css("borderTopWidth"), 10) || 0) + (parseInt(i.css("paddingTop"), 10) || 0), (t ? Math.max(n.scrollWidth, n.offsetWidth) : n.offsetWidth) - (parseInt(i.css("borderRightWidth"), 10) || 0) - (parseInt(i.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (t ? Math.max(n.scrollHeight, n.offsetHeight) : n.offsetHeight) - (parseInt(i.css("borderBottomWidth"), 10) || 0) - (parseInt(i.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relativeContainer = i)) : this.containment = s.containment : this.containment = [0, 0, e(o).width() - this.helperProportions.width - this.margins.left, (e(o).height() || o.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top] : this.containment = [e(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, e(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, e(window).scrollLeft() + e(window).width() - this.helperProportions.width - this.margins.left, e(window).scrollTop() + (e(window).height() || o.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top] : this.containment = null
                    },
                    _convertPositionTo: function(e, t) {
                        t || (t = this.position);
                        var i = "absolute" === e ? 1 : -1,
                            n = this._isRootNode(this.scrollParent[0]);
                        return {
                            top: t.top + this.offset.relative.top * i + this.offset.parent.top * i - ("fixed" === this.cssPosition ? -this.offset.scroll.top : n ? 0 : this.offset.scroll.top) * i,
                            left: t.left + this.offset.relative.left * i + this.offset.parent.left * i - ("fixed" === this.cssPosition ? -this.offset.scroll.left : n ? 0 : this.offset.scroll.left) * i
                        }
                    },
                    _generatePosition: function(e, t) {
                        var i, n, s, o, r = this.options,
                            a = this._isRootNode(this.scrollParent[0]),
                            l = e.pageX,
                            h = e.pageY;
                        return a && this.offset.scroll || (this.offset.scroll = {
                            top: this.scrollParent.scrollTop(),
                            left: this.scrollParent.scrollLeft()
                        }), t && (this.containment && (this.relativeContainer ? (n = this.relativeContainer.offset(), i = [this.containment[0] + n.left, this.containment[1] + n.top, this.containment[2] + n.left, this.containment[3] + n.top]) : i = this.containment, e.pageX - this.offset.click.left < i[0] && (l = i[0] + this.offset.click.left), e.pageY - this.offset.click.top < i[1] && (h = i[1] + this.offset.click.top), e.pageX - this.offset.click.left > i[2] && (l = i[2] + this.offset.click.left), e.pageY - this.offset.click.top > i[3] && (h = i[3] + this.offset.click.top)), r.grid && (s = r.grid[1] ? this.originalPageY + Math.round((h - this.originalPageY) / r.grid[1]) * r.grid[1] : this.originalPageY, h = i ? s - this.offset.click.top >= i[1] || s - this.offset.click.top > i[3] ? s : s - this.offset.click.top >= i[1] ? s - r.grid[1] : s + r.grid[1] : s, o = r.grid[0] ? this.originalPageX + Math.round((l - this.originalPageX) / r.grid[0]) * r.grid[0] : this.originalPageX, l = i ? o - this.offset.click.left >= i[0] || o - this.offset.click.left > i[2] ? o : o - this.offset.click.left >= i[0] ? o - r.grid[0] : o + r.grid[0] : o), "y" === r.axis && (l = this.originalPageX), "x" === r.axis && (h = this.originalPageY)), {
                            top: h - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.offset.scroll.top : a ? 0 : this.offset.scroll.top),
                            left: l - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.offset.scroll.left : a ? 0 : this.offset.scroll.left)
                        }
                    },
                    _clear: function() {
                        this._removeClass(this.helper, "ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1, this.destroyOnClear && this.destroy()
                    },
                    _trigger: function(t, i, n) {
                        return n = n || this._uiHash(), e.ui.plugin.call(this, t, [i, n, this], !0), /^(drag|start|stop)/.test(t) && (this.positionAbs = this._convertPositionTo("absolute"), n.offset = this.positionAbs), e.Widget.prototype._trigger.call(this, t, i, n)
                    },
                    plugins: {},
                    _uiHash: function() {
                        return {
                            helper: this.helper,
                            position: this.position,
                            originalPosition: this.originalPosition,
                            offset: this.positionAbs
                        }
                    }
                }), e.ui.plugin.add("draggable", "connectToSortable", {
                    start: function(t, i, n) {
                        var s = e.extend({}, i, {
                            item: n.element
                        });
                        n.sortables = [], e(n.options.connectToSortable).each((function() {
                            var i = e(this).sortable("instance");
                            i && !i.options.disabled && (n.sortables.push(i), i.refreshPositions(), i._trigger("activate", t, s))
                        }))
                    },
                    stop: function(t, i, n) {
                        var s = e.extend({}, i, {
                            item: n.element
                        });
                        n.cancelHelperRemoval = !1, e.each(n.sortables, (function() {
                            var e = this;
                            e.isOver ? (e.isOver = 0, n.cancelHelperRemoval = !0, e.cancelHelperRemoval = !1, e._storedCSS = {
                                position: e.placeholder.css("position"),
                                top: e.placeholder.css("top"),
                                left: e.placeholder.css("left")
                            }, e._mouseStop(t), e.options.helper = e.options._helper) : (e.cancelHelperRemoval = !0, e._trigger("deactivate", t, s))
                        }))
                    },
                    drag: function(t, i, n) {
                        e.each(n.sortables, (function() {
                            var s = !1,
                                o = this;
                            o.positionAbs = n.positionAbs, o.helperProportions = n.helperProportions, o.offset.click = n.offset.click, o._intersectsWith(o.containerCache) && (s = !0, e.each(n.sortables, (function() {
                                return this.positionAbs = n.positionAbs, this.helperProportions = n.helperProportions, this.offset.click = n.offset.click, this !== o && this._intersectsWith(this.containerCache) && e.contains(o.element[0], this.element[0]) && (s = !1), s
                            }))), s ? (o.isOver || (o.isOver = 1, n._parent = i.helper.parent(), o.currentItem = i.helper.appendTo(o.element).data("ui-sortable-item", !0), o.options._helper = o.options.helper, o.options.helper = function() {
                                return i.helper[0]
                            }, t.target = o.currentItem[0], o._mouseCapture(t, !0), o._mouseStart(t, !0, !0), o.offset.click.top = n.offset.click.top, o.offset.click.left = n.offset.click.left, o.offset.parent.left -= n.offset.parent.left - o.offset.parent.left, o.offset.parent.top -= n.offset.parent.top - o.offset.parent.top, n._trigger("toSortable", t), n.dropped = o.element, e.each(n.sortables, (function() {
                                this.refreshPositions()
                            })), n.currentItem = n.element, o.fromOutside = n), o.currentItem && (o._mouseDrag(t), i.position = o.position)) : o.isOver && (o.isOver = 0, o.cancelHelperRemoval = !0, o.options._revert = o.options.revert, o.options.revert = !1, o._trigger("out", t, o._uiHash(o)), o._mouseStop(t, !0), o.options.revert = o.options._revert, o.options.helper = o.options._helper, o.placeholder && o.placeholder.remove(), i.helper.appendTo(n._parent), n._refreshOffsets(t), i.position = n._generatePosition(t, !0), n._trigger("fromSortable", t), n.dropped = !1, e.each(n.sortables, (function() {
                                this.refreshPositions()
                            })))
                        }))
                    }
                }), e.ui.plugin.add("draggable", "cursor", {
                    start: function(t, i, n) {
                        var s = e("body"),
                            o = n.options;
                        s.css("cursor") && (o._cursor = s.css("cursor")), s.css("cursor", o.cursor)
                    },
                    stop: function(t, i, n) {
                        var s = n.options;
                        s._cursor && e("body").css("cursor", s._cursor)
                    }
                }), e.ui.plugin.add("draggable", "opacity", {
                    start: function(t, i, n) {
                        var s = e(i.helper),
                            o = n.options;
                        s.css("opacity") && (o._opacity = s.css("opacity")), s.css("opacity", o.opacity)
                    },
                    stop: function(t, i, n) {
                        var s = n.options;
                        s._opacity && e(i.helper).css("opacity", s._opacity)
                    }
                }), e.ui.plugin.add("draggable", "scroll", {
                    start: function(e, t, i) {
                        i.scrollParentNotHidden || (i.scrollParentNotHidden = i.helper.scrollParent(!1)), i.scrollParentNotHidden[0] !== i.document[0] && "HTML" !== i.scrollParentNotHidden[0].tagName && (i.overflowOffset = i.scrollParentNotHidden.offset())
                    },
                    drag: function(t, i, n) {
                        var s = n.options,
                            o = !1,
                            r = n.scrollParentNotHidden[0],
                            a = n.document[0];
                        r !== a && "HTML" !== r.tagName ? (s.axis && "x" === s.axis || (n.overflowOffset.top + r.offsetHeight - t.pageY < s.scrollSensitivity ? r.scrollTop = o = r.scrollTop + s.scrollSpeed : t.pageY - n.overflowOffset.top < s.scrollSensitivity && (r.scrollTop = o = r.scrollTop - s.scrollSpeed)), s.axis && "y" === s.axis || (n.overflowOffset.left + r.offsetWidth - t.pageX < s.scrollSensitivity ? r.scrollLeft = o = r.scrollLeft + s.scrollSpeed : t.pageX - n.overflowOffset.left < s.scrollSensitivity && (r.scrollLeft = o = r.scrollLeft - s.scrollSpeed))) : (s.axis && "x" === s.axis || (t.pageY - e(a).scrollTop() < s.scrollSensitivity ? o = e(a).scrollTop(e(a).scrollTop() - s.scrollSpeed) : e(window).height() - (t.pageY - e(a).scrollTop()) < s.scrollSensitivity && (o = e(a).scrollTop(e(a).scrollTop() + s.scrollSpeed))), s.axis && "y" === s.axis || (t.pageX - e(a).scrollLeft() < s.scrollSensitivity ? o = e(a).scrollLeft(e(a).scrollLeft() - s.scrollSpeed) : e(window).width() - (t.pageX - e(a).scrollLeft()) < s.scrollSensitivity && (o = e(a).scrollLeft(e(a).scrollLeft() + s.scrollSpeed)))), !1 !== o && e.ui.ddmanager && !s.dropBehaviour && e.ui.ddmanager.prepareOffsets(n, t)
                    }
                }), e.ui.plugin.add("draggable", "snap", {
                    start: function(t, i, n) {
                        var s = n.options;
                        n.snapElements = [], e(s.snap.constructor !== String ? s.snap.items || ":data(ui-draggable)" : s.snap).each((function() {
                            var t = e(this),
                                i = t.offset();
                            this !== n.element[0] && n.snapElements.push({
                                item: this,
                                width: t.outerWidth(),
                                height: t.outerHeight(),
                                top: i.top,
                                left: i.left
                            })
                        }))
                    },
                    drag: function(t, i, n) {
                        var s, o, r, a, l, h, u, c, d, p, f = n.options,
                            g = f.snapTolerance,
                            m = i.offset.left,
                            v = m + n.helperProportions.width,
                            y = i.offset.top,
                            b = y + n.helperProportions.height;
                        for (d = n.snapElements.length - 1; d >= 0; d--) h = (l = n.snapElements[d].left - n.margins.left) + n.snapElements[d].width, c = (u = n.snapElements[d].top - n.margins.top) + n.snapElements[d].height, v < l - g || m > h + g || b < u - g || y > c + g || !e.contains(n.snapElements[d].item.ownerDocument, n.snapElements[d].item) ? (n.snapElements[d].snapping && n.options.snap.release && n.options.snap.release.call(n.element, t, e.extend(n._uiHash(), {
                            snapItem: n.snapElements[d].item
                        })), n.snapElements[d].snapping = !1) : ("inner" !== f.snapMode && (s = Math.abs(u - b) <= g, o = Math.abs(c - y) <= g, r = Math.abs(l - v) <= g, a = Math.abs(h - m) <= g, s && (i.position.top = n._convertPositionTo("relative", {
                            top: u - n.helperProportions.height,
                            left: 0
                        }).top), o && (i.position.top = n._convertPositionTo("relative", {
                            top: c,
                            left: 0
                        }).top), r && (i.position.left = n._convertPositionTo("relative", {
                            top: 0,
                            left: l - n.helperProportions.width
                        }).left), a && (i.position.left = n._convertPositionTo("relative", {
                            top: 0,
                            left: h
                        }).left)), p = s || o || r || a, "outer" !== f.snapMode && (s = Math.abs(u - y) <= g, o = Math.abs(c - b) <= g, r = Math.abs(l - m) <= g, a = Math.abs(h - v) <= g, s && (i.position.top = n._convertPositionTo("relative", {
                            top: u,
                            left: 0
                        }).top), o && (i.position.top = n._convertPositionTo("relative", {
                            top: c - n.helperProportions.height,
                            left: 0
                        }).top), r && (i.position.left = n._convertPositionTo("relative", {
                            top: 0,
                            left: l
                        }).left), a && (i.position.left = n._convertPositionTo("relative", {
                            top: 0,
                            left: h - n.helperProportions.width
                        }).left)), !n.snapElements[d].snapping && (s || o || r || a || p) && n.options.snap.snap && n.options.snap.snap.call(n.element, t, e.extend(n._uiHash(), {
                            snapItem: n.snapElements[d].item
                        })), n.snapElements[d].snapping = s || o || r || a || p)
                    }
                }), e.ui.plugin.add("draggable", "stack", {
                    start: function(t, i, n) {
                        var s, o = n.options,
                            r = e.makeArray(e(o.stack)).sort((function(t, i) {
                                return (parseInt(e(t).css("zIndex"), 10) || 0) - (parseInt(e(i).css("zIndex"), 10) || 0)
                            }));
                        r.length && (s = parseInt(e(r[0]).css("zIndex"), 10) || 0, e(r).each((function(t) {
                            e(this).css("zIndex", s + t)
                        })), this.css("zIndex", s + r.length))
                    }
                }), e.ui.plugin.add("draggable", "zIndex", {
                    start: function(t, i, n) {
                        var s = e(i.helper),
                            o = n.options;
                        s.css("zIndex") && (o._zIndex = s.css("zIndex")), s.css("zIndex", o.zIndex)
                    },
                    stop: function(t, i, n) {
                        var s = n.options;
                        s._zIndex && e(i.helper).css("zIndex", s._zIndex)
                    }
                }), e.ui.draggable, e.widget("ui.droppable", {
                    version: "1.12.1",
                    widgetEventPrefix: "drop",
                    options: {
                        accept: "*",
                        addClasses: !0,
                        greedy: !1,
                        scope: "default",
                        tolerance: "intersect",
                        activate: null,
                        deactivate: null,
                        drop: null,
                        out: null,
                        over: null
                    },
                    _create: function() {
                        var t, i = this.options,
                            n = i.accept;
                        this.isover = !1, this.isout = !0, this.accept = e.isFunction(n) ? n : function(e) {
                            return e.is(n)
                        }, this.proportions = function() {
                            if (!arguments.length) return t || (t = {
                                width: this.element[0].offsetWidth,
                                height: this.element[0].offsetHeight
                            });
                            t = arguments[0]
                        }, this._addToManager(i.scope), i.addClasses && this._addClass("ui-droppable")
                    },
                    _addToManager: function(t) {
                        e.ui.ddmanager.droppables[t] = e.ui.ddmanager.droppables[t] || [], e.ui.ddmanager.droppables[t].push(this)
                    },
                    _splice: function(e) {
                        for (var t = 0; t < e.length; t++) e[t] === this && e.splice(t, 1)
                    },
                    _destroy: function() {
                        var t = e.ui.ddmanager.droppables[this.options.scope];
                        this._splice(t)
                    },
                    _setOption: function(t, i) {
                        if ("accept" === t) this.accept = e.isFunction(i) ? i : function(e) {
                            return e.is(i)
                        };
                        else if ("scope" === t) {
                            var n = e.ui.ddmanager.droppables[this.options.scope];
                            this._splice(n), this._addToManager(i)
                        }
                        this._super(t, i)
                    },
                    _activate: function(t) {
                        var i = e.ui.ddmanager.current;
                        this._addActiveClass(), i && this._trigger("activate", t, this.ui(i))
                    },
                    _deactivate: function(t) {
                        var i = e.ui.ddmanager.current;
                        this._removeActiveClass(), i && this._trigger("deactivate", t, this.ui(i))
                    },
                    _over: function(t) {
                        var i = e.ui.ddmanager.current;
                        i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this._addHoverClass(), this._trigger("over", t, this.ui(i)))
                    },
                    _out: function(t) {
                        var i = e.ui.ddmanager.current;
                        i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this._removeHoverClass(), this._trigger("out", t, this.ui(i)))
                    },
                    _drop: function(t, i) {
                        var n = i || e.ui.ddmanager.current,
                            s = !1;
                        return !(!n || (n.currentItem || n.element)[0] === this.element[0]) && (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each((function() {
                            var i = e(this).droppable("instance");
                            if (i.options.greedy && !i.options.disabled && i.options.scope === n.options.scope && i.accept.call(i.element[0], n.currentItem || n.element) && r(n, e.extend(i, {
                                    offset: i.element.offset()
                                }), i.options.tolerance, t)) return s = !0, !1
                        })), !s && !!this.accept.call(this.element[0], n.currentItem || n.element) && (this._removeActiveClass(), this._removeHoverClass(), this._trigger("drop", t, this.ui(n)), this.element))
                    },
                    ui: function(e) {
                        return {
                            draggable: e.currentItem || e.element,
                            helper: e.helper,
                            position: e.position,
                            offset: e.positionAbs
                        }
                    },
                    _addHoverClass: function() {
                        this._addClass("ui-droppable-hover")
                    },
                    _removeHoverClass: function() {
                        this._removeClass("ui-droppable-hover")
                    },
                    _addActiveClass: function() {
                        this._addClass("ui-droppable-active")
                    },
                    _removeActiveClass: function() {
                        this._removeClass("ui-droppable-active")
                    }
                });
                var r = e.ui.intersect = function() {
                    function e(e, t, i) {
                        return e >= t && e < t + i
                    }
                    return function(t, i, n, s) {
                        if (!i.offset) return !1;
                        var o = (t.positionAbs || t.position.absolute).left + t.margins.left,
                            r = (t.positionAbs || t.position.absolute).top + t.margins.top,
                            a = o + t.helperProportions.width,
                            l = r + t.helperProportions.height,
                            h = i.offset.left,
                            u = i.offset.top,
                            c = h + i.proportions().width,
                            d = u + i.proportions().height;
                        switch (n) {
                            case "fit":
                                return h <= o && a <= c && u <= r && l <= d;
                            case "intersect":
                                return h < o + t.helperProportions.width / 2 && a - t.helperProportions.width / 2 < c && u < r + t.helperProportions.height / 2 && l - t.helperProportions.height / 2 < d;
                            case "pointer":
                                return e(s.pageY, u, i.proportions().height) && e(s.pageX, h, i.proportions().width);
                            case "touch":
                                return (r >= u && r <= d || l >= u && l <= d || r < u && l > d) && (o >= h && o <= c || a >= h && a <= c || o < h && a > c);
                            default:
                                return !1
                        }
                    }
                }();
                e.ui.ddmanager = {
                    current: null,
                    droppables: {
                        default: []
                    },
                    prepareOffsets: function(t, i) {
                        var n, s, o = e.ui.ddmanager.droppables[t.options.scope] || [],
                            r = i ? i.type : null,
                            a = (t.currentItem || t.element).find(":data(ui-droppable)").addBack();
                        e: for (n = 0; n < o.length; n++)
                            if (!(o[n].options.disabled || t && !o[n].accept.call(o[n].element[0], t.currentItem || t.element))) {
                                for (s = 0; s < a.length; s++)
                                    if (a[s] === o[n].element[0]) {
                                        o[n].proportions().height = 0;
                                        continue e
                                    } o[n].visible = "none" !== o[n].element.css("display"), o[n].visible && ("mousedown" === r && o[n]._activate.call(o[n], i), o[n].offset = o[n].element.offset(), o[n].proportions({
                                    width: o[n].element[0].offsetWidth,
                                    height: o[n].element[0].offsetHeight
                                }))
                            }
                    },
                    drop: function(t, i) {
                        var n = !1;
                        return e.each((e.ui.ddmanager.droppables[t.options.scope] || []).slice(), (function() {
                            this.options && (!this.options.disabled && this.visible && r(t, this, this.options.tolerance, i) && (n = this._drop.call(this, i) || n), !this.options.disabled && this.visible && this.accept.call(this.element[0], t.currentItem || t.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, i)))
                        })), n
                    },
                    dragStart: function(t, i) {
                        t.element.parentsUntil("body").on("scroll.droppable", (function() {
                            t.options.refreshPositions || e.ui.ddmanager.prepareOffsets(t, i)
                        }))
                    },
                    drag: function(t, i) {
                        t.options.refreshPositions && e.ui.ddmanager.prepareOffsets(t, i), e.each(e.ui.ddmanager.droppables[t.options.scope] || [], (function() {
                            if (!this.options.disabled && !this.greedyChild && this.visible) {
                                var n, s, o, a = r(t, this, this.options.tolerance, i),
                                    l = !a && this.isover ? "isout" : a && !this.isover ? "isover" : null;
                                l && (this.options.greedy && (s = this.options.scope, (o = this.element.parents(":data(ui-droppable)").filter((function() {
                                    return e(this).droppable("instance").options.scope === s
                                }))).length && ((n = e(o[0]).droppable("instance")).greedyChild = "isover" === l)), n && "isover" === l && (n.isover = !1, n.isout = !0, n._out.call(n, i)), this[l] = !0, this["isout" === l ? "isover" : "isout"] = !1, this["isover" === l ? "_over" : "_out"].call(this, i), n && "isout" === l && (n.isout = !1, n.isover = !0, n._over.call(n, i)))
                            }
                        }))
                    },
                    dragStop: function(t, i) {
                        t.element.parentsUntil("body").off("scroll.droppable"), t.options.refreshPositions || e.ui.ddmanager.prepareOffsets(t, i)
                    }
                }, !1 !== e.uiBackCompat && e.widget("ui.droppable", e.ui.droppable, {
                    options: {
                        hoverClass: !1,
                        activeClass: !1
                    },
                    _addActiveClass: function() {
                        this._super(), this.options.activeClass && this.element.addClass(this.options.activeClass)
                    },
                    _removeActiveClass: function() {
                        this._super(), this.options.activeClass && this.element.removeClass(this.options.activeClass)
                    },
                    _addHoverClass: function() {
                        this._super(), this.options.hoverClass && this.element.addClass(this.options.hoverClass)
                    },
                    _removeHoverClass: function() {
                        this._super(), this.options.hoverClass && this.element.removeClass(this.options.hoverClass)
                    }
                }), e.ui.droppable, e.widget("ui.resizable", e.ui.mouse, {
                    version: "1.12.1",
                    widgetEventPrefix: "resize",
                    options: {
                        alsoResize: !1,
                        animate: !1,
                        animateDuration: "slow",
                        animateEasing: "swing",
                        aspectRatio: !1,
                        autoHide: !1,
                        classes: {
                            "ui-resizable-se": "ui-icon ui-icon-gripsmall-diagonal-se"
                        },
                        containment: !1,
                        ghost: !1,
                        grid: !1,
                        handles: "e,s,se",
                        helper: !1,
                        maxHeight: null,
                        maxWidth: null,
                        minHeight: 10,
                        minWidth: 10,
                        zIndex: 90,
                        resize: null,
                        start: null,
                        stop: null
                    },
                    _num: function(e) {
                        return parseFloat(e) || 0
                    },
                    _isNumber: function(e) {
                        return !isNaN(parseFloat(e))
                    },
                    _hasScroll: function(t, i) {
                        if ("hidden" === e(t).css("overflow")) return !1;
                        var n = i && "left" === i ? "scrollLeft" : "scrollTop",
                            s = !1;
                        return t[n] > 0 || (t[n] = 1, s = t[n] > 0, t[n] = 0, s)
                    },
                    _create: function() {
                        var t, i = this.options,
                            n = this;
                        this._addClass("ui-resizable"), e.extend(this, {
                            _aspectRatio: !!i.aspectRatio,
                            aspectRatio: i.aspectRatio,
                            originalElement: this.element,
                            _proportionallyResizeElements: [],
                            _helper: i.helper || i.ghost || i.animate ? i.helper || "ui-resizable-helper" : null
                        }), this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i) && (this.element.wrap(e("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
                            position: this.element.css("position"),
                            width: this.element.outerWidth(),
                            height: this.element.outerHeight(),
                            top: this.element.css("top"),
                            left: this.element.css("left")
                        })), this.element = this.element.parent().data("ui-resizable", this.element.resizable("instance")), this.elementIsWrapper = !0, t = {
                            marginTop: this.originalElement.css("marginTop"),
                            marginRight: this.originalElement.css("marginRight"),
                            marginBottom: this.originalElement.css("marginBottom"),
                            marginLeft: this.originalElement.css("marginLeft")
                        }, this.element.css(t), this.originalElement.css("margin", 0), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
                            position: "static",
                            zoom: 1,
                            display: "block"
                        })), this.originalElement.css(t), this._proportionallyResize()), this._setupHandles(), i.autoHide && e(this.element).on("mouseenter", (function() {
                            i.disabled || (n._removeClass("ui-resizable-autohide"), n._handles.show())
                        })).on("mouseleave", (function() {
                            i.disabled || n.resizing || (n._addClass("ui-resizable-autohide"), n._handles.hide())
                        })), this._mouseInit()
                    },
                    _destroy: function() {
                        this._mouseDestroy();
                        var t, i = function(t) {
                            e(t).removeData("resizable").removeData("ui-resizable").off(".resizable").find(".ui-resizable-handle").remove()
                        };
                        return this.elementIsWrapper && (i(this.element), t = this.element, this.originalElement.css({
                            position: t.css("position"),
                            width: t.outerWidth(),
                            height: t.outerHeight(),
                            top: t.css("top"),
                            left: t.css("left")
                        }).insertAfter(t), t.remove()), this.originalElement.css("resize", this.originalResizeStyle), i(this.originalElement), this
                    },
                    _setOption: function(e, t) {
                        switch (this._super(e, t), e) {
                            case "handles":
                                this._removeHandles(), this._setupHandles()
                        }
                    },
                    _setupHandles: function() {
                        var t, i, n, s, o, r = this.options,
                            a = this;
                        if (this.handles = r.handles || (e(".ui-resizable-handle", this.element).length ? {
                                n: ".ui-resizable-n",
                                e: ".ui-resizable-e",
                                s: ".ui-resizable-s",
                                w: ".ui-resizable-w",
                                se: ".ui-resizable-se",
                                sw: ".ui-resizable-sw",
                                ne: ".ui-resizable-ne",
                                nw: ".ui-resizable-nw"
                            } : "e,s,se"), this._handles = e(), this.handles.constructor === String)
                            for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), n = this.handles.split(","), this.handles = {}, i = 0; i < n.length; i++) s = "ui-resizable-" + (t = e.trim(n[i])), o = e("<div>"), this._addClass(o, "ui-resizable-handle " + s), o.css({
                                zIndex: r.zIndex
                            }), this.handles[t] = ".ui-resizable-" + t, this.element.append(o);
                        this._renderAxis = function(t) {
                            var i, n, s, o;
                            for (i in t = t || this.element, this.handles) this.handles[i].constructor === String ? this.handles[i] = this.element.children(this.handles[i]).first().show() : (this.handles[i].jquery || this.handles[i].nodeType) && (this.handles[i] = e(this.handles[i]), this._on(this.handles[i], {
                                mousedown: a._mouseDown
                            })), this.elementIsWrapper && this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i) && (n = e(this.handles[i], this.element), o = /sw|ne|nw|se|n|s/.test(i) ? n.outerHeight() : n.outerWidth(), s = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join(""), t.css(s, o), this._proportionallyResize()), this._handles = this._handles.add(this.handles[i])
                        }, this._renderAxis(this.element), this._handles = this._handles.add(this.element.find(".ui-resizable-handle")), this._handles.disableSelection(), this._handles.on("mouseover", (function() {
                            a.resizing || (this.className && (o = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), a.axis = o && o[1] ? o[1] : "se")
                        })), r.autoHide && (this._handles.hide(), this._addClass("ui-resizable-autohide"))
                    },
                    _removeHandles: function() {
                        this._handles.remove()
                    },
                    _mouseCapture: function(t) {
                        var i, n, s = !1;
                        for (i in this.handles)((n = e(this.handles[i])[0]) === t.target || e.contains(n, t.target)) && (s = !0);
                        return !this.options.disabled && s
                    },
                    _mouseStart: function(t) {
                        var i, n, s, o = this.options,
                            r = this.element;
                        return this.resizing = !0, this._renderProxy(), i = this._num(this.helper.css("left")), n = this._num(this.helper.css("top")), o.containment && (i += e(o.containment).scrollLeft() || 0, n += e(o.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
                            left: i,
                            top: n
                        }, this.size = this._helper ? {
                            width: this.helper.width(),
                            height: this.helper.height()
                        } : {
                            width: r.width(),
                            height: r.height()
                        }, this.originalSize = this._helper ? {
                            width: r.outerWidth(),
                            height: r.outerHeight()
                        } : {
                            width: r.width(),
                            height: r.height()
                        }, this.sizeDiff = {
                            width: r.outerWidth() - r.width(),
                            height: r.outerHeight() - r.height()
                        }, this.originalPosition = {
                            left: i,
                            top: n
                        }, this.originalMousePosition = {
                            left: t.pageX,
                            top: t.pageY
                        }, this.aspectRatio = "number" == typeof o.aspectRatio ? o.aspectRatio : this.originalSize.width / this.originalSize.height || 1, s = e(".ui-resizable-" + this.axis).css("cursor"), e("body").css("cursor", "auto" === s ? this.axis + "-resize" : s), this._addClass("ui-resizable-resizing"), this._propagate("start", t), !0
                    },
                    _mouseDrag: function(t) {
                        var i, n, s = this.originalMousePosition,
                            o = this.axis,
                            r = t.pageX - s.left || 0,
                            a = t.pageY - s.top || 0,
                            l = this._change[o];
                        return this._updatePrevProperties(), !!l && (i = l.apply(this, [t, r, a]), this._updateVirtualBoundaries(t.shiftKey), (this._aspectRatio || t.shiftKey) && (i = this._updateRatio(i, t)), i = this._respectSize(i, t), this._updateCache(i), this._propagate("resize", t), n = this._applyChanges(), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), e.isEmptyObject(n) || (this._updatePrevProperties(), this._trigger("resize", t, this.ui()), this._applyChanges()), !1)
                    },
                    _mouseStop: function(t) {
                        this.resizing = !1;
                        var i, n, s, o, r, a, l, h = this.options,
                            u = this;
                        return this._helper && (s = (n = (i = this._proportionallyResizeElements).length && /textarea/i.test(i[0].nodeName)) && this._hasScroll(i[0], "left") ? 0 : u.sizeDiff.height, o = n ? 0 : u.sizeDiff.width, r = {
                            width: u.helper.width() - o,
                            height: u.helper.height() - s
                        }, a = parseFloat(u.element.css("left")) + (u.position.left - u.originalPosition.left) || null, l = parseFloat(u.element.css("top")) + (u.position.top - u.originalPosition.top) || null, h.animate || this.element.css(e.extend(r, {
                            top: l,
                            left: a
                        })), u.helper.height(u.size.height), u.helper.width(u.size.width), this._helper && !h.animate && this._proportionallyResize()), e("body").css("cursor", "auto"), this._removeClass("ui-resizable-resizing"), this._propagate("stop", t), this._helper && this.helper.remove(), !1
                    },
                    _updatePrevProperties: function() {
                        this.prevPosition = {
                            top: this.position.top,
                            left: this.position.left
                        }, this.prevSize = {
                            width: this.size.width,
                            height: this.size.height
                        }
                    },
                    _applyChanges: function() {
                        var e = {};
                        return this.position.top !== this.prevPosition.top && (e.top = this.position.top + "px"), this.position.left !== this.prevPosition.left && (e.left = this.position.left + "px"), this.size.width !== this.prevSize.width && (e.width = this.size.width + "px"), this.size.height !== this.prevSize.height && (e.height = this.size.height + "px"), this.helper.css(e), e
                    },
                    _updateVirtualBoundaries: function(e) {
                        var t, i, n, s, o, r = this.options;
                        o = {
                            minWidth: this._isNumber(r.minWidth) ? r.minWidth : 0,
                            maxWidth: this._isNumber(r.maxWidth) ? r.maxWidth : 1 / 0,
                            minHeight: this._isNumber(r.minHeight) ? r.minHeight : 0,
                            maxHeight: this._isNumber(r.maxHeight) ? r.maxHeight : 1 / 0
                        }, (this._aspectRatio || e) && (t = o.minHeight * this.aspectRatio, n = o.minWidth / this.aspectRatio, i = o.maxHeight * this.aspectRatio, s = o.maxWidth / this.aspectRatio, t > o.minWidth && (o.minWidth = t), n > o.minHeight && (o.minHeight = n), i < o.maxWidth && (o.maxWidth = i), s < o.maxHeight && (o.maxHeight = s)), this._vBoundaries = o
                    },
                    _updateCache: function(e) {
                        this.offset = this.helper.offset(), this._isNumber(e.left) && (this.position.left = e.left), this._isNumber(e.top) && (this.position.top = e.top), this._isNumber(e.height) && (this.size.height = e.height), this._isNumber(e.width) && (this.size.width = e.width)
                    },
                    _updateRatio: function(e) {
                        var t = this.position,
                            i = this.size,
                            n = this.axis;
                        return this._isNumber(e.height) ? e.width = e.height * this.aspectRatio : this._isNumber(e.width) && (e.height = e.width / this.aspectRatio), "sw" === n && (e.left = t.left + (i.width - e.width), e.top = null), "nw" === n && (e.top = t.top + (i.height - e.height), e.left = t.left + (i.width - e.width)), e
                    },
                    _respectSize: function(e) {
                        var t = this._vBoundaries,
                            i = this.axis,
                            n = this._isNumber(e.width) && t.maxWidth && t.maxWidth < e.width,
                            s = this._isNumber(e.height) && t.maxHeight && t.maxHeight < e.height,
                            o = this._isNumber(e.width) && t.minWidth && t.minWidth > e.width,
                            r = this._isNumber(e.height) && t.minHeight && t.minHeight > e.height,
                            a = this.originalPosition.left + this.originalSize.width,
                            l = this.originalPosition.top + this.originalSize.height,
                            h = /sw|nw|w/.test(i),
                            u = /nw|ne|n/.test(i);
                        return o && (e.width = t.minWidth), r && (e.height = t.minHeight), n && (e.width = t.maxWidth), s && (e.height = t.maxHeight), o && h && (e.left = a - t.minWidth), n && h && (e.left = a - t.maxWidth), r && u && (e.top = l - t.minHeight), s && u && (e.top = l - t.maxHeight), e.width || e.height || e.left || !e.top ? e.width || e.height || e.top || !e.left || (e.left = null) : e.top = null, e
                    },
                    _getPaddingPlusBorderDimensions: function(e) {
                        for (var t = 0, i = [], n = [e.css("borderTopWidth"), e.css("borderRightWidth"), e.css("borderBottomWidth"), e.css("borderLeftWidth")], s = [e.css("paddingTop"), e.css("paddingRight"), e.css("paddingBottom"), e.css("paddingLeft")]; t < 4; t++) i[t] = parseFloat(n[t]) || 0, i[t] += parseFloat(s[t]) || 0;
                        return {
                            height: i[0] + i[2],
                            width: i[1] + i[3]
                        }
                    },
                    _proportionallyResize: function() {
                        if (this._proportionallyResizeElements.length)
                            for (var e, t = 0, i = this.helper || this.element; t < this._proportionallyResizeElements.length; t++) e = this._proportionallyResizeElements[t], this.outerDimensions || (this.outerDimensions = this._getPaddingPlusBorderDimensions(e)), e.css({
                                height: i.height() - this.outerDimensions.height || 0,
                                width: i.width() - this.outerDimensions.width || 0
                            })
                    },
                    _renderProxy: function() {
                        var t = this.element,
                            i = this.options;
                        this.elementOffset = t.offset(), this._helper ? (this.helper = this.helper || e("<div style='overflow:hidden;'></div>"), this._addClass(this.helper, this._helper), this.helper.css({
                            width: this.element.outerWidth(),
                            height: this.element.outerHeight(),
                            position: "absolute",
                            left: this.elementOffset.left + "px",
                            top: this.elementOffset.top + "px",
                            zIndex: ++i.zIndex
                        }), this.helper.appendTo("body").disableSelection()) : this.helper = this.element
                    },
                    _change: {
                        e: function(e, t) {
                            return {
                                width: this.originalSize.width + t
                            }
                        },
                        w: function(e, t) {
                            var i = this.originalSize;
                            return {
                                left: this.originalPosition.left + t,
                                width: i.width - t
                            }
                        },
                        n: function(e, t, i) {
                            var n = this.originalSize;
                            return {
                                top: this.originalPosition.top + i,
                                height: n.height - i
                            }
                        },
                        s: function(e, t, i) {
                            return {
                                height: this.originalSize.height + i
                            }
                        },
                        se: function(t, i, n) {
                            return e.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [t, i, n]))
                        },
                        sw: function(t, i, n) {
                            return e.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [t, i, n]))
                        },
                        ne: function(t, i, n) {
                            return e.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [t, i, n]))
                        },
                        nw: function(t, i, n) {
                            return e.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [t, i, n]))
                        }
                    },
                    _propagate: function(t, i) {
                        e.ui.plugin.call(this, t, [i, this.ui()]), "resize" !== t && this._trigger(t, i, this.ui())
                    },
                    plugins: {},
                    ui: function() {
                        return {
                            originalElement: this.originalElement,
                            element: this.element,
                            helper: this.helper,
                            position: this.position,
                            size: this.size,
                            originalSize: this.originalSize,
                            originalPosition: this.originalPosition
                        }
                    }
                }), e.ui.plugin.add("resizable", "animate", {
                    stop: function(t) {
                        var i = e(this).resizable("instance"),
                            n = i.options,
                            s = i._proportionallyResizeElements,
                            o = s.length && /textarea/i.test(s[0].nodeName),
                            r = o && i._hasScroll(s[0], "left") ? 0 : i.sizeDiff.height,
                            a = o ? 0 : i.sizeDiff.width,
                            l = {
                                width: i.size.width - a,
                                height: i.size.height - r
                            },
                            h = parseFloat(i.element.css("left")) + (i.position.left - i.originalPosition.left) || null,
                            u = parseFloat(i.element.css("top")) + (i.position.top - i.originalPosition.top) || null;
                        i.element.animate(e.extend(l, u && h ? {
                            top: u,
                            left: h
                        } : {}), {
                            duration: n.animateDuration,
                            easing: n.animateEasing,
                            step: function() {
                                var n = {
                                    width: parseFloat(i.element.css("width")),
                                    height: parseFloat(i.element.css("height")),
                                    top: parseFloat(i.element.css("top")),
                                    left: parseFloat(i.element.css("left"))
                                };
                                s && s.length && e(s[0]).css({
                                    width: n.width,
                                    height: n.height
                                }), i._updateCache(n), i._propagate("resize", t)
                            }
                        })
                    }
                }), e.ui.plugin.add("resizable", "containment", {
                    start: function() {
                        var t, i, n, s, o, r, a, l = e(this).resizable("instance"),
                            h = l.options,
                            u = l.element,
                            c = h.containment,
                            d = c instanceof e ? c.get(0) : /parent/.test(c) ? u.parent().get(0) : c;
                        d && (l.containerElement = e(d), /document/.test(c) || c === document ? (l.containerOffset = {
                            left: 0,
                            top: 0
                        }, l.containerPosition = {
                            left: 0,
                            top: 0
                        }, l.parentData = {
                            element: e(document),
                            left: 0,
                            top: 0,
                            width: e(document).width(),
                            height: e(document).height() || document.body.parentNode.scrollHeight
                        }) : (t = e(d), i = [], e(["Top", "Right", "Left", "Bottom"]).each((function(e, n) {
                            i[e] = l._num(t.css("padding" + n))
                        })), l.containerOffset = t.offset(), l.containerPosition = t.position(), l.containerSize = {
                            height: t.innerHeight() - i[3],
                            width: t.innerWidth() - i[1]
                        }, n = l.containerOffset, s = l.containerSize.height, o = l.containerSize.width, r = l._hasScroll(d, "left") ? d.scrollWidth : o, a = l._hasScroll(d) ? d.scrollHeight : s, l.parentData = {
                            element: d,
                            left: n.left,
                            top: n.top,
                            width: r,
                            height: a
                        }))
                    },
                    resize: function(t) {
                        var i, n, s, o, r = e(this).resizable("instance"),
                            a = r.options,
                            l = r.containerOffset,
                            h = r.position,
                            u = r._aspectRatio || t.shiftKey,
                            c = {
                                top: 0,
                                left: 0
                            },
                            d = r.containerElement,
                            p = !0;
                        d[0] !== document && /static/.test(d.css("position")) && (c = l), h.left < (r._helper ? l.left : 0) && (r.size.width = r.size.width + (r._helper ? r.position.left - l.left : r.position.left - c.left), u && (r.size.height = r.size.width / r.aspectRatio, p = !1), r.position.left = a.helper ? l.left : 0), h.top < (r._helper ? l.top : 0) && (r.size.height = r.size.height + (r._helper ? r.position.top - l.top : r.position.top), u && (r.size.width = r.size.height * r.aspectRatio, p = !1), r.position.top = r._helper ? l.top : 0), s = r.containerElement.get(0) === r.element.parent().get(0), o = /relative|absolute/.test(r.containerElement.css("position")), s && o ? (r.offset.left = r.parentData.left + r.position.left, r.offset.top = r.parentData.top + r.position.top) : (r.offset.left = r.element.offset().left, r.offset.top = r.element.offset().top), i = Math.abs(r.sizeDiff.width + (r._helper ? r.offset.left - c.left : r.offset.left - l.left)), n = Math.abs(r.sizeDiff.height + (r._helper ? r.offset.top - c.top : r.offset.top - l.top)), i + r.size.width >= r.parentData.width && (r.size.width = r.parentData.width - i, u && (r.size.height = r.size.width / r.aspectRatio, p = !1)), n + r.size.height >= r.parentData.height && (r.size.height = r.parentData.height - n, u && (r.size.width = r.size.height * r.aspectRatio, p = !1)), p || (r.position.left = r.prevPosition.left, r.position.top = r.prevPosition.top, r.size.width = r.prevSize.width, r.size.height = r.prevSize.height)
                    },
                    stop: function() {
                        var t = e(this).resizable("instance"),
                            i = t.options,
                            n = t.containerOffset,
                            s = t.containerPosition,
                            o = t.containerElement,
                            r = e(t.helper),
                            a = r.offset(),
                            l = r.outerWidth() - t.sizeDiff.width,
                            h = r.outerHeight() - t.sizeDiff.height;
                        t._helper && !i.animate && /relative/.test(o.css("position")) && e(this).css({
                            left: a.left - s.left - n.left,
                            width: l,
                            height: h
                        }), t._helper && !i.animate && /static/.test(o.css("position")) && e(this).css({
                            left: a.left - s.left - n.left,
                            width: l,
                            height: h
                        })
                    }
                }), e.ui.plugin.add("resizable", "alsoResize", {
                    start: function() {
                        var t = e(this).resizable("instance").options;
                        e(t.alsoResize).each((function() {
                            var t = e(this);
                            t.data("ui-resizable-alsoresize", {
                                width: parseFloat(t.width()),
                                height: parseFloat(t.height()),
                                left: parseFloat(t.css("left")),
                                top: parseFloat(t.css("top"))
                            })
                        }))
                    },
                    resize: function(t, i) {
                        var n = e(this).resizable("instance"),
                            s = n.options,
                            o = n.originalSize,
                            r = n.originalPosition,
                            a = {
                                height: n.size.height - o.height || 0,
                                width: n.size.width - o.width || 0,
                                top: n.position.top - r.top || 0,
                                left: n.position.left - r.left || 0
                            };
                        e(s.alsoResize).each((function() {
                            var t = e(this),
                                n = e(this).data("ui-resizable-alsoresize"),
                                s = {},
                                o = t.parents(i.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                            e.each(o, (function(e, t) {
                                var i = (n[t] || 0) + (a[t] || 0);
                                i && i >= 0 && (s[t] = i || null)
                            })), t.css(s)
                        }))
                    },
                    stop: function() {
                        e(this).removeData("ui-resizable-alsoresize")
                    }
                }), e.ui.plugin.add("resizable", "ghost", {
                    start: function() {
                        var t = e(this).resizable("instance"),
                            i = t.size;
                        t.ghost = t.originalElement.clone(), t.ghost.css({
                            opacity: .25,
                            display: "block",
                            position: "relative",
                            height: i.height,
                            width: i.width,
                            margin: 0,
                            left: 0,
                            top: 0
                        }), t._addClass(t.ghost, "ui-resizable-ghost"), !1 !== e.uiBackCompat && "string" == typeof t.options.ghost && t.ghost.addClass(this.options.ghost), t.ghost.appendTo(t.helper)
                    },
                    resize: function() {
                        var t = e(this).resizable("instance");
                        t.ghost && t.ghost.css({
                            position: "relative",
                            height: t.size.height,
                            width: t.size.width
                        })
                    },
                    stop: function() {
                        var t = e(this).resizable("instance");
                        t.ghost && t.helper && t.helper.get(0).removeChild(t.ghost.get(0))
                    }
                }), e.ui.plugin.add("resizable", "grid", {
                    resize: function() {
                        var t, i = e(this).resizable("instance"),
                            n = i.options,
                            s = i.size,
                            o = i.originalSize,
                            r = i.originalPosition,
                            a = i.axis,
                            l = "number" == typeof n.grid ? [n.grid, n.grid] : n.grid,
                            h = l[0] || 1,
                            u = l[1] || 1,
                            c = Math.round((s.width - o.width) / h) * h,
                            d = Math.round((s.height - o.height) / u) * u,
                            p = o.width + c,
                            f = o.height + d,
                            g = n.maxWidth && n.maxWidth < p,
                            m = n.maxHeight && n.maxHeight < f,
                            v = n.minWidth && n.minWidth > p,
                            y = n.minHeight && n.minHeight > f;
                        n.grid = l, v && (p += h), y && (f += u), g && (p -= h), m && (f -= u), /^(se|s|e)$/.test(a) ? (i.size.width = p, i.size.height = f) : /^(ne)$/.test(a) ? (i.size.width = p, i.size.height = f, i.position.top = r.top - d) : /^(sw)$/.test(a) ? (i.size.width = p, i.size.height = f, i.position.left = r.left - c) : ((f - u <= 0 || p - h <= 0) && (t = i._getPaddingPlusBorderDimensions(this)), f - u > 0 ? (i.size.height = f, i.position.top = r.top - d) : (f = u - t.height, i.size.height = f, i.position.top = r.top + o.height - f), p - h > 0 ? (i.size.width = p, i.position.left = r.left - c) : (p = h - t.width, i.size.width = p, i.position.left = r.left + o.width - p))
                    }
                }), e.ui.resizable
            }) ? n.apply(t, s) : n) || (e.exports = o)
        },
        28: function(e, t) {
            var i;
            ! function(t, i) {
                "use strict";
                "object" == typeof e.exports ? e.exports = t.document ? i(t) : function(e) {
                    if (!e.document) throw new Error("jQuery requires a window with a document");
                    return i(e)
                } : i(t)
            }("undefined" != typeof window ? window : this, (function(n, s) {
                "use strict";
                var o = [],
                    r = Object.getPrototypeOf,
                    a = o.slice,
                    l = o.flat ? function(e) {
                        return o.flat.call(e)
                    } : function(e) {
                        return o.concat.apply([], e)
                    },
                    h = o.push,
                    u = o.indexOf,
                    c = {},
                    d = c.toString,
                    p = c.hasOwnProperty,
                    f = p.toString,
                    g = f.call(Object),
                    m = {},
                    v = function(e) {
                        return "function" == typeof e && "number" != typeof e.nodeType
                    },
                    y = function(e) {
                        return null != e && e === e.window
                    },
                    b = n.document,
                    _ = {
                        type: !0,
                        src: !0,
                        nonce: !0,
                        noModule: !0
                    };

                function w(e, t, i) {
                    var n, s, o = (i = i || b).createElement("script");
                    if (o.text = e, t)
                        for (n in _)(s = t[n] || t.getAttribute && t.getAttribute(n)) && o.setAttribute(n, s);
                    i.head.appendChild(o).parentNode.removeChild(o)
                }

                function x(e) {
                    return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? c[d.call(e)] || "object" : typeof e
                }
                var C = "3.5.1",
                    E = function(e, t) {
                        return new E.fn.init(e, t)
                    };

                function k(e) {
                    var t = !!e && "length" in e && e.length,
                        i = x(e);
                    return !v(e) && !y(e) && ("array" === i || 0 === t || "number" == typeof t && t > 0 && t - 1 in e)
                }
                E.fn = E.prototype = {
                    jquery: C,
                    constructor: E,
                    length: 0,
                    toArray: function() {
                        return a.call(this)
                    },
                    get: function(e) {
                        return null == e ? a.call(this) : e < 0 ? this[e + this.length] : this[e]
                    },
                    pushStack: function(e) {
                        var t = E.merge(this.constructor(), e);
                        return t.prevObject = this, t
                    },
                    each: function(e) {
                        return E.each(this, e)
                    },
                    map: function(e) {
                        return this.pushStack(E.map(this, (function(t, i) {
                            return e.call(t, i, t)
                        })))
                    },
                    slice: function() {
                        return this.pushStack(a.apply(this, arguments))
                    },
                    first: function() {
                        return this.eq(0)
                    },
                    last: function() {
                        return this.eq(-1)
                    },
                    even: function() {
                        return this.pushStack(E.grep(this, (function(e, t) {
                            return (t + 1) % 2
                        })))
                    },
                    odd: function() {
                        return this.pushStack(E.grep(this, (function(e, t) {
                            return t % 2
                        })))
                    },
                    eq: function(e) {
                        var t = this.length,
                            i = +e + (e < 0 ? t : 0);
                        return this.pushStack(i >= 0 && i < t ? [this[i]] : [])
                    },
                    end: function() {
                        return this.prevObject || this.constructor()
                    },
                    push: h,
                    sort: o.sort,
                    splice: o.splice
                }, E.extend = E.fn.extend = function() {
                    var e, t, i, n, s, o, r = arguments[0] || {},
                        a = 1,
                        l = arguments.length,
                        h = !1;
                    for ("boolean" == typeof r && (h = r, r = arguments[a] || {}, a++), "object" == typeof r || v(r) || (r = {}), a === l && (r = this, a--); a < l; a++)
                        if (null != (e = arguments[a]))
                            for (t in e) n = e[t], "__proto__" !== t && r !== n && (h && n && (E.isPlainObject(n) || (s = Array.isArray(n))) ? (i = r[t], o = s && !Array.isArray(i) ? [] : s || E.isPlainObject(i) ? i : {}, s = !1, r[t] = E.extend(h, o, n)) : void 0 !== n && (r[t] = n));
                    return r
                }, E.extend({
                    expando: "jQuery" + (C + Math.random()).replace(/\D/g, ""),
                    isReady: !0,
                    error: function(e) {
                        throw new Error(e)
                    },
                    noop: function() {},
                    isPlainObject: function(e) {
                        var t, i;
                        return !(!e || "[object Object]" !== d.call(e) || (t = r(e)) && ("function" != typeof(i = p.call(t, "constructor") && t.constructor) || f.call(i) !== g))
                    },
                    isEmptyObject: function(e) {
                        var t;
                        for (t in e) return !1;
                        return !0
                    },
                    globalEval: function(e, t, i) {
                        w(e, {
                            nonce: t && t.nonce
                        }, i)
                    },
                    each: function(e, t) {
                        var i, n = 0;
                        if (k(e))
                            for (i = e.length; n < i && !1 !== t.call(e[n], n, e[n]); n++);
                        else
                            for (n in e)
                                if (!1 === t.call(e[n], n, e[n])) break;
                        return e
                    },
                    makeArray: function(e, t) {
                        var i = t || [];
                        return null != e && (k(Object(e)) ? E.merge(i, "string" == typeof e ? [e] : e) : h.call(i, e)), i
                    },
                    inArray: function(e, t, i) {
                        return null == t ? -1 : u.call(t, e, i)
                    },
                    merge: function(e, t) {
                        for (var i = +t.length, n = 0, s = e.length; n < i; n++) e[s++] = t[n];
                        return e.length = s, e
                    },
                    grep: function(e, t, i) {
                        for (var n = [], s = 0, o = e.length, r = !i; s < o; s++) !t(e[s], s) !== r && n.push(e[s]);
                        return n
                    },
                    map: function(e, t, i) {
                        var n, s, o = 0,
                            r = [];
                        if (k(e))
                            for (n = e.length; o < n; o++) null != (s = t(e[o], o, i)) && r.push(s);
                        else
                            for (o in e) null != (s = t(e[o], o, i)) && r.push(s);
                        return l(r)
                    },
                    guid: 1,
                    support: m
                }), "function" == typeof Symbol && (E.fn[Symbol.iterator] = o[Symbol.iterator]), E.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), (function(e, t) {
                    c["[object " + t + "]"] = t.toLowerCase()
                }));
                var N = function(e) {
                    var t, i, n, s, o, r, a, l, h, u, c, d, p, f, g, m, v, y, b, _ = "sizzle" + 1 * new Date,
                        w = e.document,
                        x = 0,
                        C = 0,
                        E = le(),
                        k = le(),
                        N = le(),
                        S = le(),
                        T = function(e, t) {
                            return e === t && (c = !0), 0
                        },
                        P = {}.hasOwnProperty,
                        D = [],
                        H = D.pop,
                        z = D.push,
                        A = D.push,
                        R = D.slice,
                        M = function(e, t) {
                            for (var i = 0, n = e.length; i < n; i++)
                                if (e[i] === t) return i;
                            return -1
                        },
                        O = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                        L = "[\\x20\\t\\r\\n\\f]",
                        j = "(?:\\\\[\\da-fA-F]{1,6}[\\x20\\t\\r\\n\\f]?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
                        I = "\\[[\\x20\\t\\r\\n\\f]*(" + j + ")(?:" + L + "*([*^$|!~]?=)" + L + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + j + "))|)" + L + "*\\]",
                        W = ":(" + j + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + I + ")*)|.*)\\)|)",
                        U = new RegExp(L + "+", "g"),
                        q = new RegExp("^[\\x20\\t\\r\\n\\f]+|((?:^|[^\\\\])(?:\\\\.)*)[\\x20\\t\\r\\n\\f]+$", "g"),
                        B = new RegExp("^[\\x20\\t\\r\\n\\f]*,[\\x20\\t\\r\\n\\f]*"),
                        F = new RegExp("^[\\x20\\t\\r\\n\\f]*([>+~]|[\\x20\\t\\r\\n\\f])[\\x20\\t\\r\\n\\f]*"),
                        $ = new RegExp(L + "|>"),
                        G = new RegExp(W),
                        X = new RegExp("^" + j + "$"),
                        Y = {
                            ID: new RegExp("^#(" + j + ")"),
                            CLASS: new RegExp("^\\.(" + j + ")"),
                            TAG: new RegExp("^(" + j + "|[*])"),
                            ATTR: new RegExp("^" + I),
                            PSEUDO: new RegExp("^" + W),
                            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\([\\x20\\t\\r\\n\\f]*(even|odd|(([+-]|)(\\d*)n|)[\\x20\\t\\r\\n\\f]*(?:([+-]|)[\\x20\\t\\r\\n\\f]*(\\d+)|))[\\x20\\t\\r\\n\\f]*\\)|)", "i"),
                            bool: new RegExp("^(?:" + O + ")$", "i"),
                            needsContext: new RegExp("^[\\x20\\t\\r\\n\\f]*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\([\\x20\\t\\r\\n\\f]*((?:-\\d)?\\d*)[\\x20\\t\\r\\n\\f]*\\)|)(?=[^-]|$)", "i")
                        },
                        V = /HTML$/i,
                        K = /^(?:input|select|textarea|button)$/i,
                        Q = /^h\d$/i,
                        J = /^[^{]+\{\s*\[native \w/,
                        Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                        ee = /[+~]/,
                        te = new RegExp("\\\\[\\da-fA-F]{1,6}[\\x20\\t\\r\\n\\f]?|\\\\([^\\r\\n\\f])", "g"),
                        ie = function(e, t) {
                            var i = "0x" + e.slice(1) - 65536;
                            return t || (i < 0 ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320))
                        },
                        ne = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
                        se = function(e, t) {
                            return t ? "\0" === e ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
                        },
                        oe = function() {
                            d()
                        },
                        re = _e((function(e) {
                            return !0 === e.disabled && "fieldset" === e.nodeName.toLowerCase()
                        }), {
                            dir: "parentNode",
                            next: "legend"
                        });
                    try {
                        A.apply(D = R.call(w.childNodes), w.childNodes), D[w.childNodes.length].nodeType
                    } catch (e) {
                        A = {
                            apply: D.length ? function(e, t) {
                                z.apply(e, R.call(t))
                            } : function(e, t) {
                                for (var i = e.length, n = 0; e[i++] = t[n++];);
                                e.length = i - 1
                            }
                        }
                    }

                    function ae(e, t, n, s) {
                        var o, a, h, u, c, f, v, y = t && t.ownerDocument,
                            w = t ? t.nodeType : 9;
                        if (n = n || [], "string" != typeof e || !e || 1 !== w && 9 !== w && 11 !== w) return n;
                        if (!s && (d(t), t = t || p, g)) {
                            if (11 !== w && (c = Z.exec(e)))
                                if (o = c[1]) {
                                    if (9 === w) {
                                        if (!(h = t.getElementById(o))) return n;
                                        if (h.id === o) return n.push(h), n
                                    } else if (y && (h = y.getElementById(o)) && b(t, h) && h.id === o) return n.push(h), n
                                } else {
                                    if (c[2]) return A.apply(n, t.getElementsByTagName(e)), n;
                                    if ((o = c[3]) && i.getElementsByClassName && t.getElementsByClassName) return A.apply(n, t.getElementsByClassName(o)), n
                                } if (i.qsa && !S[e + " "] && (!m || !m.test(e)) && (1 !== w || "object" !== t.nodeName.toLowerCase())) {
                                if (v = e, y = t, 1 === w && ($.test(e) || F.test(e))) {
                                    for ((y = ee.test(e) && ve(t.parentNode) || t) === t && i.scope || ((u = t.getAttribute("id")) ? u = u.replace(ne, se) : t.setAttribute("id", u = _)), a = (f = r(e)).length; a--;) f[a] = (u ? "#" + u : ":scope") + " " + be(f[a]);
                                    v = f.join(",")
                                }
                                try {
                                    return A.apply(n, y.querySelectorAll(v)), n
                                } catch (t) {
                                    S(e, !0)
                                } finally {
                                    u === _ && t.removeAttribute("id")
                                }
                            }
                        }
                        return l(e.replace(q, "$1"), t, n, s)
                    }

                    function le() {
                        var e = [];
                        return function t(i, s) {
                            return e.push(i + " ") > n.cacheLength && delete t[e.shift()], t[i + " "] = s
                        }
                    }

                    function he(e) {
                        return e[_] = !0, e
                    }

                    function ue(e) {
                        var t = p.createElement("fieldset");
                        try {
                            return !!e(t)
                        } catch (e) {
                            return !1
                        } finally {
                            t.parentNode && t.parentNode.removeChild(t), t = null
                        }
                    }

                    function ce(e, t) {
                        for (var i = e.split("|"), s = i.length; s--;) n.attrHandle[i[s]] = t
                    }

                    function de(e, t) {
                        var i = t && e,
                            n = i && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
                        if (n) return n;
                        if (i)
                            for (; i = i.nextSibling;)
                                if (i === t) return -1;
                        return e ? 1 : -1
                    }

                    function pe(e) {
                        return function(t) {
                            return "input" === t.nodeName.toLowerCase() && t.type === e
                        }
                    }

                    function fe(e) {
                        return function(t) {
                            var i = t.nodeName.toLowerCase();
                            return ("input" === i || "button" === i) && t.type === e
                        }
                    }

                    function ge(e) {
                        return function(t) {
                            return "form" in t ? t.parentNode && !1 === t.disabled ? "label" in t ? "label" in t.parentNode ? t.parentNode.disabled === e : t.disabled === e : t.isDisabled === e || t.isDisabled !== !e && re(t) === e : t.disabled === e : "label" in t && t.disabled === e
                        }
                    }

                    function me(e) {
                        return he((function(t) {
                            return t = +t, he((function(i, n) {
                                for (var s, o = e([], i.length, t), r = o.length; r--;) i[s = o[r]] && (i[s] = !(n[s] = i[s]))
                            }))
                        }))
                    }

                    function ve(e) {
                        return e && void 0 !== e.getElementsByTagName && e
                    }
                    for (t in i = ae.support = {}, o = ae.isXML = function(e) {
                            var t = e.namespaceURI,
                                i = (e.ownerDocument || e).documentElement;
                            return !V.test(t || i && i.nodeName || "HTML")
                        }, d = ae.setDocument = function(e) {
                            var t, s, r = e ? e.ownerDocument || e : w;
                            return r != p && 9 === r.nodeType && r.documentElement ? (f = (p = r).documentElement, g = !o(p), w != p && (s = p.defaultView) && s.top !== s && (s.addEventListener ? s.addEventListener("unload", oe, !1) : s.attachEvent && s.attachEvent("onunload", oe)), i.scope = ue((function(e) {
                                return f.appendChild(e).appendChild(p.createElement("div")), void 0 !== e.querySelectorAll && !e.querySelectorAll(":scope fieldset div").length
                            })), i.attributes = ue((function(e) {
                                return e.className = "i", !e.getAttribute("className")
                            })), i.getElementsByTagName = ue((function(e) {
                                return e.appendChild(p.createComment("")), !e.getElementsByTagName("*").length
                            })), i.getElementsByClassName = J.test(p.getElementsByClassName), i.getById = ue((function(e) {
                                return f.appendChild(e).id = _, !p.getElementsByName || !p.getElementsByName(_).length
                            })), i.getById ? (n.filter.ID = function(e) {
                                var t = e.replace(te, ie);
                                return function(e) {
                                    return e.getAttribute("id") === t
                                }
                            }, n.find.ID = function(e, t) {
                                if (void 0 !== t.getElementById && g) {
                                    var i = t.getElementById(e);
                                    return i ? [i] : []
                                }
                            }) : (n.filter.ID = function(e) {
                                var t = e.replace(te, ie);
                                return function(e) {
                                    var i = void 0 !== e.getAttributeNode && e.getAttributeNode("id");
                                    return i && i.value === t
                                }
                            }, n.find.ID = function(e, t) {
                                if (void 0 !== t.getElementById && g) {
                                    var i, n, s, o = t.getElementById(e);
                                    if (o) {
                                        if ((i = o.getAttributeNode("id")) && i.value === e) return [o];
                                        for (s = t.getElementsByName(e), n = 0; o = s[n++];)
                                            if ((i = o.getAttributeNode("id")) && i.value === e) return [o]
                                    }
                                    return []
                                }
                            }), n.find.TAG = i.getElementsByTagName ? function(e, t) {
                                return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : i.qsa ? t.querySelectorAll(e) : void 0
                            } : function(e, t) {
                                var i, n = [],
                                    s = 0,
                                    o = t.getElementsByTagName(e);
                                if ("*" === e) {
                                    for (; i = o[s++];) 1 === i.nodeType && n.push(i);
                                    return n
                                }
                                return o
                            }, n.find.CLASS = i.getElementsByClassName && function(e, t) {
                                if (void 0 !== t.getElementsByClassName && g) return t.getElementsByClassName(e)
                            }, v = [], m = [], (i.qsa = J.test(p.querySelectorAll)) && (ue((function(e) {
                                var t;
                                f.appendChild(e).innerHTML = "<a id='" + _ + "'></a><select id='" + _ + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && m.push("[*^$]=[\\x20\\t\\r\\n\\f]*(?:''|\"\")"), e.querySelectorAll("[selected]").length || m.push("\\[[\\x20\\t\\r\\n\\f]*(?:value|" + O + ")"), e.querySelectorAll("[id~=" + _ + "-]").length || m.push("~="), (t = p.createElement("input")).setAttribute("name", ""), e.appendChild(t), e.querySelectorAll("[name='']").length || m.push("\\[[\\x20\\t\\r\\n\\f]*name[\\x20\\t\\r\\n\\f]*=[\\x20\\t\\r\\n\\f]*(?:''|\"\")"), e.querySelectorAll(":checked").length || m.push(":checked"), e.querySelectorAll("a#" + _ + "+*").length || m.push(".#.+[+~]"), e.querySelectorAll("\\\f"), m.push("[\\r\\n\\f]")
                            })), ue((function(e) {
                                e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                                var t = p.createElement("input");
                                t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && m.push("name[\\x20\\t\\r\\n\\f]*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && m.push(":enabled", ":disabled"), f.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && m.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), m.push(",.*:")
                            }))), (i.matchesSelector = J.test(y = f.matches || f.webkitMatchesSelector || f.mozMatchesSelector || f.oMatchesSelector || f.msMatchesSelector)) && ue((function(e) {
                                i.disconnectedMatch = y.call(e, "*"), y.call(e, "[s!='']:x"), v.push("!=", W)
                            })), m = m.length && new RegExp(m.join("|")), v = v.length && new RegExp(v.join("|")), t = J.test(f.compareDocumentPosition), b = t || J.test(f.contains) ? function(e, t) {
                                var i = 9 === e.nodeType ? e.documentElement : e,
                                    n = t && t.parentNode;
                                return e === n || !(!n || 1 !== n.nodeType || !(i.contains ? i.contains(n) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(n)))
                            } : function(e, t) {
                                if (t)
                                    for (; t = t.parentNode;)
                                        if (t === e) return !0;
                                return !1
                            }, T = t ? function(e, t) {
                                if (e === t) return c = !0, 0;
                                var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                                return n || (1 & (n = (e.ownerDocument || e) == (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !i.sortDetached && t.compareDocumentPosition(e) === n ? e == p || e.ownerDocument == w && b(w, e) ? -1 : t == p || t.ownerDocument == w && b(w, t) ? 1 : u ? M(u, e) - M(u, t) : 0 : 4 & n ? -1 : 1)
                            } : function(e, t) {
                                if (e === t) return c = !0, 0;
                                var i, n = 0,
                                    s = e.parentNode,
                                    o = t.parentNode,
                                    r = [e],
                                    a = [t];
                                if (!s || !o) return e == p ? -1 : t == p ? 1 : s ? -1 : o ? 1 : u ? M(u, e) - M(u, t) : 0;
                                if (s === o) return de(e, t);
                                for (i = e; i = i.parentNode;) r.unshift(i);
                                for (i = t; i = i.parentNode;) a.unshift(i);
                                for (; r[n] === a[n];) n++;
                                return n ? de(r[n], a[n]) : r[n] == w ? -1 : a[n] == w ? 1 : 0
                            }, p) : p
                        }, ae.matches = function(e, t) {
                            return ae(e, null, null, t)
                        }, ae.matchesSelector = function(e, t) {
                            if (d(e), i.matchesSelector && g && !S[t + " "] && (!v || !v.test(t)) && (!m || !m.test(t))) try {
                                var n = y.call(e, t);
                                if (n || i.disconnectedMatch || e.document && 11 !== e.document.nodeType) return n
                            } catch (e) {
                                S(t, !0)
                            }
                            return ae(t, p, null, [e]).length > 0
                        }, ae.contains = function(e, t) {
                            return (e.ownerDocument || e) != p && d(e), b(e, t)
                        }, ae.attr = function(e, t) {
                            (e.ownerDocument || e) != p && d(e);
                            var s = n.attrHandle[t.toLowerCase()],
                                o = s && P.call(n.attrHandle, t.toLowerCase()) ? s(e, t, !g) : void 0;
                            return void 0 !== o ? o : i.attributes || !g ? e.getAttribute(t) : (o = e.getAttributeNode(t)) && o.specified ? o.value : null
                        }, ae.escape = function(e) {
                            return (e + "").replace(ne, se)
                        }, ae.error = function(e) {
                            throw new Error("Syntax error, unrecognized expression: " + e)
                        }, ae.uniqueSort = function(e) {
                            var t, n = [],
                                s = 0,
                                o = 0;
                            if (c = !i.detectDuplicates, u = !i.sortStable && e.slice(0), e.sort(T), c) {
                                for (; t = e[o++];) t === e[o] && (s = n.push(o));
                                for (; s--;) e.splice(n[s], 1)
                            }
                            return u = null, e
                        }, s = ae.getText = function(e) {
                            var t, i = "",
                                n = 0,
                                o = e.nodeType;
                            if (o) {
                                if (1 === o || 9 === o || 11 === o) {
                                    if ("string" == typeof e.textContent) return e.textContent;
                                    for (e = e.firstChild; e; e = e.nextSibling) i += s(e)
                                } else if (3 === o || 4 === o) return e.nodeValue
                            } else
                                for (; t = e[n++];) i += s(t);
                            return i
                        }, (n = ae.selectors = {
                            cacheLength: 50,
                            createPseudo: he,
                            match: Y,
                            attrHandle: {},
                            find: {},
                            relative: {
                                ">": {
                                    dir: "parentNode",
                                    first: !0
                                },
                                " ": {
                                    dir: "parentNode"
                                },
                                "+": {
                                    dir: "previousSibling",
                                    first: !0
                                },
                                "~": {
                                    dir: "previousSibling"
                                }
                            },
                            preFilter: {
                                ATTR: function(e) {
                                    return e[1] = e[1].replace(te, ie), e[3] = (e[3] || e[4] || e[5] || "").replace(te, ie), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                                },
                                CHILD: function(e) {
                                    return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || ae.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && ae.error(e[0]), e
                                },
                                PSEUDO: function(e) {
                                    var t, i = !e[6] && e[2];
                                    return Y.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : i && G.test(i) && (t = r(i, !0)) && (t = i.indexOf(")", i.length - t) - i.length) && (e[0] = e[0].slice(0, t), e[2] = i.slice(0, t)), e.slice(0, 3))
                                }
                            },
                            filter: {
                                TAG: function(e) {
                                    var t = e.replace(te, ie).toLowerCase();
                                    return "*" === e ? function() {
                                        return !0
                                    } : function(e) {
                                        return e.nodeName && e.nodeName.toLowerCase() === t
                                    }
                                },
                                CLASS: function(e) {
                                    var t = E[e + " "];
                                    return t || (t = new RegExp("(^|[\\x20\\t\\r\\n\\f])" + e + "(" + L + "|$)")) && E(e, (function(e) {
                                        return t.test("string" == typeof e.className && e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "")
                                    }))
                                },
                                ATTR: function(e, t, i) {
                                    return function(n) {
                                        var s = ae.attr(n, e);
                                        return null == s ? "!=" === t : !t || (s += "", "=" === t ? s === i : "!=" === t ? s !== i : "^=" === t ? i && 0 === s.indexOf(i) : "*=" === t ? i && s.indexOf(i) > -1 : "$=" === t ? i && s.slice(-i.length) === i : "~=" === t ? (" " + s.replace(U, " ") + " ").indexOf(i) > -1 : "|=" === t && (s === i || s.slice(0, i.length + 1) === i + "-"))
                                    }
                                },
                                CHILD: function(e, t, i, n, s) {
                                    var o = "nth" !== e.slice(0, 3),
                                        r = "last" !== e.slice(-4),
                                        a = "of-type" === t;
                                    return 1 === n && 0 === s ? function(e) {
                                        return !!e.parentNode
                                    } : function(t, i, l) {
                                        var h, u, c, d, p, f, g = o !== r ? "nextSibling" : "previousSibling",
                                            m = t.parentNode,
                                            v = a && t.nodeName.toLowerCase(),
                                            y = !l && !a,
                                            b = !1;
                                        if (m) {
                                            if (o) {
                                                for (; g;) {
                                                    for (d = t; d = d[g];)
                                                        if (a ? d.nodeName.toLowerCase() === v : 1 === d.nodeType) return !1;
                                                    f = g = "only" === e && !f && "nextSibling"
                                                }
                                                return !0
                                            }
                                            if (f = [r ? m.firstChild : m.lastChild], r && y) {
                                                for (b = (p = (h = (u = (c = (d = m)[_] || (d[_] = {}))[d.uniqueID] || (c[d.uniqueID] = {}))[e] || [])[0] === x && h[1]) && h[2], d = p && m.childNodes[p]; d = ++p && d && d[g] || (b = p = 0) || f.pop();)
                                                    if (1 === d.nodeType && ++b && d === t) {
                                                        u[e] = [x, p, b];
                                                        break
                                                    }
                                            } else if (y && (b = p = (h = (u = (c = (d = t)[_] || (d[_] = {}))[d.uniqueID] || (c[d.uniqueID] = {}))[e] || [])[0] === x && h[1]), !1 === b)
                                                for (;
                                                    (d = ++p && d && d[g] || (b = p = 0) || f.pop()) && ((a ? d.nodeName.toLowerCase() !== v : 1 !== d.nodeType) || !++b || (y && ((u = (c = d[_] || (d[_] = {}))[d.uniqueID] || (c[d.uniqueID] = {}))[e] = [x, b]), d !== t)););
                                            return (b -= s) === n || b % n == 0 && b / n >= 0
                                        }
                                    }
                                },
                                PSEUDO: function(e, t) {
                                    var i, s = n.pseudos[e] || n.setFilters[e.toLowerCase()] || ae.error("unsupported pseudo: " + e);
                                    return s[_] ? s(t) : s.length > 1 ? (i = [e, e, "", t], n.setFilters.hasOwnProperty(e.toLowerCase()) ? he((function(e, i) {
                                        for (var n, o = s(e, t), r = o.length; r--;) e[n = M(e, o[r])] = !(i[n] = o[r])
                                    })) : function(e) {
                                        return s(e, 0, i)
                                    }) : s
                                }
                            },
                            pseudos: {
                                not: he((function(e) {
                                    var t = [],
                                        i = [],
                                        n = a(e.replace(q, "$1"));
                                    return n[_] ? he((function(e, t, i, s) {
                                        for (var o, r = n(e, null, s, []), a = e.length; a--;)(o = r[a]) && (e[a] = !(t[a] = o))
                                    })) : function(e, s, o) {
                                        return t[0] = e, n(t, null, o, i), t[0] = null, !i.pop()
                                    }
                                })),
                                has: he((function(e) {
                                    return function(t) {
                                        return ae(e, t).length > 0
                                    }
                                })),
                                contains: he((function(e) {
                                    return e = e.replace(te, ie),
                                        function(t) {
                                            return (t.textContent || s(t)).indexOf(e) > -1
                                        }
                                })),
                                lang: he((function(e) {
                                    return X.test(e || "") || ae.error("unsupported lang: " + e), e = e.replace(te, ie).toLowerCase(),
                                        function(t) {
                                            var i;
                                            do {
                                                if (i = g ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return (i = i.toLowerCase()) === e || 0 === i.indexOf(e + "-")
                                            } while ((t = t.parentNode) && 1 === t.nodeType);
                                            return !1
                                        }
                                })),
                                target: function(t) {
                                    var i = e.location && e.location.hash;
                                    return i && i.slice(1) === t.id
                                },
                                root: function(e) {
                                    return e === f
                                },
                                focus: function(e) {
                                    return e === p.activeElement && (!p.hasFocus || p.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                                },
                                enabled: ge(!1),
                                disabled: ge(!0),
                                checked: function(e) {
                                    var t = e.nodeName.toLowerCase();
                                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                                },
                                selected: function(e) {
                                    return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
                                },
                                empty: function(e) {
                                    for (e = e.firstChild; e; e = e.nextSibling)
                                        if (e.nodeType < 6) return !1;
                                    return !0
                                },
                                parent: function(e) {
                                    return !n.pseudos.empty(e)
                                },
                                header: function(e) {
                                    return Q.test(e.nodeName)
                                },
                                input: function(e) {
                                    return K.test(e.nodeName)
                                },
                                button: function(e) {
                                    var t = e.nodeName.toLowerCase();
                                    return "input" === t && "button" === e.type || "button" === t
                                },
                                text: function(e) {
                                    var t;
                                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                                },
                                first: me((function() {
                                    return [0]
                                })),
                                last: me((function(e, t) {
                                    return [t - 1]
                                })),
                                eq: me((function(e, t, i) {
                                    return [i < 0 ? i + t : i]
                                })),
                                even: me((function(e, t) {
                                    for (var i = 0; i < t; i += 2) e.push(i);
                                    return e
                                })),
                                odd: me((function(e, t) {
                                    for (var i = 1; i < t; i += 2) e.push(i);
                                    return e
                                })),
                                lt: me((function(e, t, i) {
                                    for (var n = i < 0 ? i + t : i > t ? t : i; --n >= 0;) e.push(n);
                                    return e
                                })),
                                gt: me((function(e, t, i) {
                                    for (var n = i < 0 ? i + t : i; ++n < t;) e.push(n);
                                    return e
                                }))
                            }
                        }).pseudos.nth = n.pseudos.eq, {
                            radio: !0,
                            checkbox: !0,
                            file: !0,
                            password: !0,
                            image: !0
                        }) n.pseudos[t] = pe(t);
                    for (t in {
                            submit: !0,
                            reset: !0
                        }) n.pseudos[t] = fe(t);

                    function ye() {}

                    function be(e) {
                        for (var t = 0, i = e.length, n = ""; t < i; t++) n += e[t].value;
                        return n
                    }

                    function _e(e, t, i) {
                        var n = t.dir,
                            s = t.next,
                            o = s || n,
                            r = i && "parentNode" === o,
                            a = C++;
                        return t.first ? function(t, i, s) {
                            for (; t = t[n];)
                                if (1 === t.nodeType || r) return e(t, i, s);
                            return !1
                        } : function(t, i, l) {
                            var h, u, c, d = [x, a];
                            if (l) {
                                for (; t = t[n];)
                                    if ((1 === t.nodeType || r) && e(t, i, l)) return !0
                            } else
                                for (; t = t[n];)
                                    if (1 === t.nodeType || r)
                                        if (u = (c = t[_] || (t[_] = {}))[t.uniqueID] || (c[t.uniqueID] = {}), s && s === t.nodeName.toLowerCase()) t = t[n] || t;
                                        else {
                                            if ((h = u[o]) && h[0] === x && h[1] === a) return d[2] = h[2];
                                            if (u[o] = d, d[2] = e(t, i, l)) return !0
                                        } return !1
                        }
                    }

                    function we(e) {
                        return e.length > 1 ? function(t, i, n) {
                            for (var s = e.length; s--;)
                                if (!e[s](t, i, n)) return !1;
                            return !0
                        } : e[0]
                    }

                    function xe(e, t, i, n, s) {
                        for (var o, r = [], a = 0, l = e.length, h = null != t; a < l; a++)(o = e[a]) && (i && !i(o, n, s) || (r.push(o), h && t.push(a)));
                        return r
                    }

                    function Ce(e, t, i, n, s, o) {
                        return n && !n[_] && (n = Ce(n)), s && !s[_] && (s = Ce(s, o)), he((function(o, r, a, l) {
                            var h, u, c, d = [],
                                p = [],
                                f = r.length,
                                g = o || function(e, t, i) {
                                    for (var n = 0, s = t.length; n < s; n++) ae(e, t[n], i);
                                    return i
                                }(t || "*", a.nodeType ? [a] : a, []),
                                m = !e || !o && t ? g : xe(g, d, e, a, l),
                                v = i ? s || (o ? e : f || n) ? [] : r : m;
                            if (i && i(m, v, a, l), n)
                                for (h = xe(v, p), n(h, [], a, l), u = h.length; u--;)(c = h[u]) && (v[p[u]] = !(m[p[u]] = c));
                            if (o) {
                                if (s || e) {
                                    if (s) {
                                        for (h = [], u = v.length; u--;)(c = v[u]) && h.push(m[u] = c);
                                        s(null, v = [], h, l)
                                    }
                                    for (u = v.length; u--;)(c = v[u]) && (h = s ? M(o, c) : d[u]) > -1 && (o[h] = !(r[h] = c))
                                }
                            } else v = xe(v === r ? v.splice(f, v.length) : v), s ? s(null, r, v, l) : A.apply(r, v)
                        }))
                    }

                    function Ee(e) {
                        for (var t, i, s, o = e.length, r = n.relative[e[0].type], a = r || n.relative[" "], l = r ? 1 : 0, u = _e((function(e) {
                                return e === t
                            }), a, !0), c = _e((function(e) {
                                return M(t, e) > -1
                            }), a, !0), d = [function(e, i, n) {
                                var s = !r && (n || i !== h) || ((t = i).nodeType ? u(e, i, n) : c(e, i, n));
                                return t = null, s
                            }]; l < o; l++)
                            if (i = n.relative[e[l].type]) d = [_e(we(d), i)];
                            else {
                                if ((i = n.filter[e[l].type].apply(null, e[l].matches))[_]) {
                                    for (s = ++l; s < o && !n.relative[e[s].type]; s++);
                                    return Ce(l > 1 && we(d), l > 1 && be(e.slice(0, l - 1).concat({
                                        value: " " === e[l - 2].type ? "*" : ""
                                    })).replace(q, "$1"), i, l < s && Ee(e.slice(l, s)), s < o && Ee(e = e.slice(s)), s < o && be(e))
                                }
                                d.push(i)
                            } return we(d)
                    }
                    return ye.prototype = n.filters = n.pseudos, n.setFilters = new ye, r = ae.tokenize = function(e, t) {
                        var i, s, o, r, a, l, h, u = k[e + " "];
                        if (u) return t ? 0 : u.slice(0);
                        for (a = e, l = [], h = n.preFilter; a;) {
                            for (r in i && !(s = B.exec(a)) || (s && (a = a.slice(s[0].length) || a), l.push(o = [])), i = !1, (s = F.exec(a)) && (i = s.shift(), o.push({
                                    value: i,
                                    type: s[0].replace(q, " ")
                                }), a = a.slice(i.length)), n.filter) !(s = Y[r].exec(a)) || h[r] && !(s = h[r](s)) || (i = s.shift(), o.push({
                                value: i,
                                type: r,
                                matches: s
                            }), a = a.slice(i.length));
                            if (!i) break
                        }
                        return t ? a.length : a ? ae.error(e) : k(e, l).slice(0)
                    }, a = ae.compile = function(e, t) {
                        var i, s = [],
                            o = [],
                            a = N[e + " "];
                        if (!a) {
                            for (t || (t = r(e)), i = t.length; i--;)(a = Ee(t[i]))[_] ? s.push(a) : o.push(a);
                            (a = N(e, function(e, t) {
                                var i = t.length > 0,
                                    s = e.length > 0,
                                    o = function(o, r, a, l, u) {
                                        var c, f, m, v = 0,
                                            y = "0",
                                            b = o && [],
                                            _ = [],
                                            w = h,
                                            C = o || s && n.find.TAG("*", u),
                                            E = x += null == w ? 1 : Math.random() || .1,
                                            k = C.length;
                                        for (u && (h = r == p || r || u); y !== k && null != (c = C[y]); y++) {
                                            if (s && c) {
                                                for (f = 0, r || c.ownerDocument == p || (d(c), a = !g); m = e[f++];)
                                                    if (m(c, r || p, a)) {
                                                        l.push(c);
                                                        break
                                                    } u && (x = E)
                                            }
                                            i && ((c = !m && c) && v--, o && b.push(c))
                                        }
                                        if (v += y, i && y !== v) {
                                            for (f = 0; m = t[f++];) m(b, _, r, a);
                                            if (o) {
                                                if (v > 0)
                                                    for (; y--;) b[y] || _[y] || (_[y] = H.call(l));
                                                _ = xe(_)
                                            }
                                            A.apply(l, _), u && !o && _.length > 0 && v + t.length > 1 && ae.uniqueSort(l)
                                        }
                                        return u && (x = E, h = w), b
                                    };
                                return i ? he(o) : o
                            }(o, s))).selector = e
                        }
                        return a
                    }, l = ae.select = function(e, t, i, s) {
                        var o, l, h, u, c, d = "function" == typeof e && e,
                            p = !s && r(e = d.selector || e);
                        if (i = i || [], 1 === p.length) {
                            if ((l = p[0] = p[0].slice(0)).length > 2 && "ID" === (h = l[0]).type && 9 === t.nodeType && g && n.relative[l[1].type]) {
                                if (!(t = (n.find.ID(h.matches[0].replace(te, ie), t) || [])[0])) return i;
                                d && (t = t.parentNode), e = e.slice(l.shift().value.length)
                            }
                            for (o = Y.needsContext.test(e) ? 0 : l.length; o-- && (h = l[o], !n.relative[u = h.type]);)
                                if ((c = n.find[u]) && (s = c(h.matches[0].replace(te, ie), ee.test(l[0].type) && ve(t.parentNode) || t))) {
                                    if (l.splice(o, 1), !(e = s.length && be(l))) return A.apply(i, s), i;
                                    break
                                }
                        }
                        return (d || a(e, p))(s, t, !g, i, !t || ee.test(e) && ve(t.parentNode) || t), i
                    }, i.sortStable = _.split("").sort(T).join("") === _, i.detectDuplicates = !!c, d(), i.sortDetached = ue((function(e) {
                        return 1 & e.compareDocumentPosition(p.createElement("fieldset"))
                    })), ue((function(e) {
                        return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
                    })) || ce("type|href|height|width", (function(e, t, i) {
                        if (!i) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
                    })), i.attributes && ue((function(e) {
                        return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
                    })) || ce("value", (function(e, t, i) {
                        if (!i && "input" === e.nodeName.toLowerCase()) return e.defaultValue
                    })), ue((function(e) {
                        return null == e.getAttribute("disabled")
                    })) || ce(O, (function(e, t, i) {
                        var n;
                        if (!i) return !0 === e[t] ? t.toLowerCase() : (n = e.getAttributeNode(t)) && n.specified ? n.value : null
                    })), ae
                }(n);
                E.find = N, E.expr = N.selectors, E.expr[":"] = E.expr.pseudos, E.uniqueSort = E.unique = N.uniqueSort, E.text = N.getText, E.isXMLDoc = N.isXML, E.contains = N.contains, E.escapeSelector = N.escape;
                var S = function(e, t, i) {
                        for (var n = [], s = void 0 !== i;
                            (e = e[t]) && 9 !== e.nodeType;)
                            if (1 === e.nodeType) {
                                if (s && E(e).is(i)) break;
                                n.push(e)
                            } return n
                    },
                    T = function(e, t) {
                        for (var i = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && i.push(e);
                        return i
                    },
                    P = E.expr.match.needsContext;

                function D(e, t) {
                    return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
                }
                var H = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

                function z(e, t, i) {
                    return v(t) ? E.grep(e, (function(e, n) {
                        return !!t.call(e, n, e) !== i
                    })) : t.nodeType ? E.grep(e, (function(e) {
                        return e === t !== i
                    })) : "string" != typeof t ? E.grep(e, (function(e) {
                        return u.call(t, e) > -1 !== i
                    })) : E.filter(t, e, i)
                }
                E.filter = function(e, t, i) {
                    var n = t[0];
                    return i && (e = ":not(" + e + ")"), 1 === t.length && 1 === n.nodeType ? E.find.matchesSelector(n, e) ? [n] : [] : E.find.matches(e, E.grep(t, (function(e) {
                        return 1 === e.nodeType
                    })))
                }, E.fn.extend({
                    find: function(e) {
                        var t, i, n = this.length,
                            s = this;
                        if ("string" != typeof e) return this.pushStack(E(e).filter((function() {
                            for (t = 0; t < n; t++)
                                if (E.contains(s[t], this)) return !0
                        })));
                        for (i = this.pushStack([]), t = 0; t < n; t++) E.find(e, s[t], i);
                        return n > 1 ? E.uniqueSort(i) : i
                    },
                    filter: function(e) {
                        return this.pushStack(z(this, e || [], !1))
                    },
                    not: function(e) {
                        return this.pushStack(z(this, e || [], !0))
                    },
                    is: function(e) {
                        return !!z(this, "string" == typeof e && P.test(e) ? E(e) : e || [], !1).length
                    }
                });
                var A, R = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
                (E.fn.init = function(e, t, i) {
                    var n, s;
                    if (!e) return this;
                    if (i = i || A, "string" == typeof e) {
                        if (!(n = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : R.exec(e)) || !n[1] && t) return !t || t.jquery ? (t || i).find(e) : this.constructor(t).find(e);
                        if (n[1]) {
                            if (t = t instanceof E ? t[0] : t, E.merge(this, E.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : b, !0)), H.test(n[1]) && E.isPlainObject(t))
                                for (n in t) v(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
                            return this
                        }
                        return (s = b.getElementById(n[2])) && (this[0] = s, this.length = 1), this
                    }
                    return e.nodeType ? (this[0] = e, this.length = 1, this) : v(e) ? void 0 !== i.ready ? i.ready(e) : e(E) : E.makeArray(e, this)
                }).prototype = E.fn, A = E(b);
                var M = /^(?:parents|prev(?:Until|All))/,
                    O = {
                        children: !0,
                        contents: !0,
                        next: !0,
                        prev: !0
                    };

                function L(e, t) {
                    for (;
                        (e = e[t]) && 1 !== e.nodeType;);
                    return e
                }
                E.fn.extend({
                    has: function(e) {
                        var t = E(e, this),
                            i = t.length;
                        return this.filter((function() {
                            for (var e = 0; e < i; e++)
                                if (E.contains(this, t[e])) return !0
                        }))
                    },
                    closest: function(e, t) {
                        var i, n = 0,
                            s = this.length,
                            o = [],
                            r = "string" != typeof e && E(e);
                        if (!P.test(e))
                            for (; n < s; n++)
                                for (i = this[n]; i && i !== t; i = i.parentNode)
                                    if (i.nodeType < 11 && (r ? r.index(i) > -1 : 1 === i.nodeType && E.find.matchesSelector(i, e))) {
                                        o.push(i);
                                        break
                                    } return this.pushStack(o.length > 1 ? E.uniqueSort(o) : o)
                    },
                    index: function(e) {
                        return e ? "string" == typeof e ? u.call(E(e), this[0]) : u.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
                    },
                    add: function(e, t) {
                        return this.pushStack(E.uniqueSort(E.merge(this.get(), E(e, t))))
                    },
                    addBack: function(e) {
                        return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
                    }
                }), E.each({
                    parent: function(e) {
                        var t = e.parentNode;
                        return t && 11 !== t.nodeType ? t : null
                    },
                    parents: function(e) {
                        return S(e, "parentNode")
                    },
                    parentsUntil: function(e, t, i) {
                        return S(e, "parentNode", i)
                    },
                    next: function(e) {
                        return L(e, "nextSibling")
                    },
                    prev: function(e) {
                        return L(e, "previousSibling")
                    },
                    nextAll: function(e) {
                        return S(e, "nextSibling")
                    },
                    prevAll: function(e) {
                        return S(e, "previousSibling")
                    },
                    nextUntil: function(e, t, i) {
                        return S(e, "nextSibling", i)
                    },
                    prevUntil: function(e, t, i) {
                        return S(e, "previousSibling", i)
                    },
                    siblings: function(e) {
                        return T((e.parentNode || {}).firstChild, e)
                    },
                    children: function(e) {
                        return T(e.firstChild)
                    },
                    contents: function(e) {
                        return null != e.contentDocument && r(e.contentDocument) ? e.contentDocument : (D(e, "template") && (e = e.content || e), E.merge([], e.childNodes))
                    }
                }, (function(e, t) {
                    E.fn[e] = function(i, n) {
                        var s = E.map(this, t, i);
                        return "Until" !== e.slice(-5) && (n = i), n && "string" == typeof n && (s = E.filter(n, s)), this.length > 1 && (O[e] || E.uniqueSort(s), M.test(e) && s.reverse()), this.pushStack(s)
                    }
                }));
                var j = /[^\x20\t\r\n\f]+/g;

                function I(e) {
                    return e
                }

                function W(e) {
                    throw e
                }

                function U(e, t, i, n) {
                    var s;
                    try {
                        e && v(s = e.promise) ? s.call(e).done(t).fail(i) : e && v(s = e.then) ? s.call(e, t, i) : t.apply(void 0, [e].slice(n))
                    } catch (e) {
                        i.apply(void 0, [e])
                    }
                }
                E.Callbacks = function(e) {
                    e = "string" == typeof e ? function(e) {
                        var t = {};
                        return E.each(e.match(j) || [], (function(e, i) {
                            t[i] = !0
                        })), t
                    }(e) : E.extend({}, e);
                    var t, i, n, s, o = [],
                        r = [],
                        a = -1,
                        l = function() {
                            for (s = s || e.once, n = t = !0; r.length; a = -1)
                                for (i = r.shift(); ++a < o.length;) !1 === o[a].apply(i[0], i[1]) && e.stopOnFalse && (a = o.length, i = !1);
                            e.memory || (i = !1), t = !1, s && (o = i ? [] : "")
                        },
                        h = {
                            add: function() {
                                return o && (i && !t && (a = o.length - 1, r.push(i)), function t(i) {
                                    E.each(i, (function(i, n) {
                                        v(n) ? e.unique && h.has(n) || o.push(n) : n && n.length && "string" !== x(n) && t(n)
                                    }))
                                }(arguments), i && !t && l()), this
                            },
                            remove: function() {
                                return E.each(arguments, (function(e, t) {
                                    for (var i;
                                        (i = E.inArray(t, o, i)) > -1;) o.splice(i, 1), i <= a && a--
                                })), this
                            },
                            has: function(e) {
                                return e ? E.inArray(e, o) > -1 : o.length > 0
                            },
                            empty: function() {
                                return o && (o = []), this
                            },
                            disable: function() {
                                return s = r = [], o = i = "", this
                            },
                            disabled: function() {
                                return !o
                            },
                            lock: function() {
                                return s = r = [], i || t || (o = i = ""), this
                            },
                            locked: function() {
                                return !!s
                            },
                            fireWith: function(e, i) {
                                return s || (i = [e, (i = i || []).slice ? i.slice() : i], r.push(i), t || l()), this
                            },
                            fire: function() {
                                return h.fireWith(this, arguments), this
                            },
                            fired: function() {
                                return !!n
                            }
                        };
                    return h
                }, E.extend({
                    Deferred: function(e) {
                        var t = [
                                ["notify", "progress", E.Callbacks("memory"), E.Callbacks("memory"), 2],
                                ["resolve", "done", E.Callbacks("once memory"), E.Callbacks("once memory"), 0, "resolved"],
                                ["reject", "fail", E.Callbacks("once memory"), E.Callbacks("once memory"), 1, "rejected"]
                            ],
                            i = "pending",
                            s = {
                                state: function() {
                                    return i
                                },
                                always: function() {
                                    return o.done(arguments).fail(arguments), this
                                },
                                catch: function(e) {
                                    return s.then(null, e)
                                },
                                pipe: function() {
                                    var e = arguments;
                                    return E.Deferred((function(i) {
                                        E.each(t, (function(t, n) {
                                            var s = v(e[n[4]]) && e[n[4]];
                                            o[n[1]]((function() {
                                                var e = s && s.apply(this, arguments);
                                                e && v(e.promise) ? e.promise().progress(i.notify).done(i.resolve).fail(i.reject) : i[n[0] + "With"](this, s ? [e] : arguments)
                                            }))
                                        })), e = null
                                    })).promise()
                                },
                                then: function(e, i, s) {
                                    var o = 0;

                                    function r(e, t, i, s) {
                                        return function() {
                                            var a = this,
                                                l = arguments,
                                                h = function() {
                                                    var n, h;
                                                    if (!(e < o)) {
                                                        if ((n = i.apply(a, l)) === t.promise()) throw new TypeError("Thenable self-resolution");
                                                        h = n && ("object" == typeof n || "function" == typeof n) && n.then, v(h) ? s ? h.call(n, r(o, t, I, s), r(o, t, W, s)) : (o++, h.call(n, r(o, t, I, s), r(o, t, W, s), r(o, t, I, t.notifyWith))) : (i !== I && (a = void 0, l = [n]), (s || t.resolveWith)(a, l))
                                                    }
                                                },
                                                u = s ? h : function() {
                                                    try {
                                                        h()
                                                    } catch (n) {
                                                        E.Deferred.exceptionHook && E.Deferred.exceptionHook(n, u.stackTrace), e + 1 >= o && (i !== W && (a = void 0, l = [n]), t.rejectWith(a, l))
                                                    }
                                                };
                                            e ? u() : (E.Deferred.getStackHook && (u.stackTrace = E.Deferred.getStackHook()), n.setTimeout(u))
                                        }
                                    }
                                    return E.Deferred((function(n) {
                                        t[0][3].add(r(0, n, v(s) ? s : I, n.notifyWith)), t[1][3].add(r(0, n, v(e) ? e : I)), t[2][3].add(r(0, n, v(i) ? i : W))
                                    })).promise()
                                },
                                promise: function(e) {
                                    return null != e ? E.extend(e, s) : s
                                }
                            },
                            o = {};
                        return E.each(t, (function(e, n) {
                            var r = n[2],
                                a = n[5];
                            s[n[1]] = r.add, a && r.add((function() {
                                i = a
                            }), t[3 - e][2].disable, t[3 - e][3].disable, t[0][2].lock, t[0][3].lock), r.add(n[3].fire), o[n[0]] = function() {
                                return o[n[0] + "With"](this === o ? void 0 : this, arguments), this
                            }, o[n[0] + "With"] = r.fireWith
                        })), s.promise(o), e && e.call(o, o), o
                    },
                    when: function(e) {
                        var t = arguments.length,
                            i = t,
                            n = Array(i),
                            s = a.call(arguments),
                            o = E.Deferred(),
                            r = function(e) {
                                return function(i) {
                                    n[e] = this, s[e] = arguments.length > 1 ? a.call(arguments) : i, --t || o.resolveWith(n, s)
                                }
                            };
                        if (t <= 1 && (U(e, o.done(r(i)).resolve, o.reject, !t), "pending" === o.state() || v(s[i] && s[i].then))) return o.then();
                        for (; i--;) U(s[i], r(i), o.reject);
                        return o.promise()
                    }
                });
                var q = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
                E.Deferred.exceptionHook = function(e, t) {
                    n.console && n.console.warn && e && q.test(e.name) && n.console.warn("jQuery.Deferred exception: " + e.message, e.stack, t)
                }, E.readyException = function(e) {
                    n.setTimeout((function() {
                        throw e
                    }))
                };
                var B = E.Deferred();

                function F() {
                    b.removeEventListener("DOMContentLoaded", F), n.removeEventListener("load", F), E.ready()
                }
                E.fn.ready = function(e) {
                    return B.then(e).catch((function(e) {
                        E.readyException(e)
                    })), this
                }, E.extend({
                    isReady: !1,
                    readyWait: 1,
                    ready: function(e) {
                        (!0 === e ? --E.readyWait : E.isReady) || (E.isReady = !0, !0 !== e && --E.readyWait > 0 || B.resolveWith(b, [E]))
                    }
                }), E.ready.then = B.then, "complete" === b.readyState || "loading" !== b.readyState && !b.documentElement.doScroll ? n.setTimeout(E.ready) : (b.addEventListener("DOMContentLoaded", F), n.addEventListener("load", F));
                var $ = function(e, t, i, n, s, o, r) {
                        var a = 0,
                            l = e.length,
                            h = null == i;
                        if ("object" === x(i))
                            for (a in s = !0, i) $(e, t, a, i[a], !0, o, r);
                        else if (void 0 !== n && (s = !0, v(n) || (r = !0), h && (r ? (t.call(e, n), t = null) : (h = t, t = function(e, t, i) {
                                return h.call(E(e), i)
                            })), t))
                            for (; a < l; a++) t(e[a], i, r ? n : n.call(e[a], a, t(e[a], i)));
                        return s ? e : h ? t.call(e) : l ? t(e[0], i) : o
                    },
                    G = /^-ms-/,
                    X = /-([a-z])/g;

                function Y(e, t) {
                    return t.toUpperCase()
                }

                function V(e) {
                    return e.replace(G, "ms-").replace(X, Y)
                }
                var K = function(e) {
                    return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
                };

                function Q() {
                    this.expando = E.expando + Q.uid++
                }
                Q.uid = 1, Q.prototype = {
                    cache: function(e) {
                        var t = e[this.expando];
                        return t || (t = {}, K(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                            value: t,
                            configurable: !0
                        }))), t
                    },
                    set: function(e, t, i) {
                        var n, s = this.cache(e);
                        if ("string" == typeof t) s[V(t)] = i;
                        else
                            for (n in t) s[V(n)] = t[n];
                        return s
                    },
                    get: function(e, t) {
                        return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][V(t)]
                    },
                    access: function(e, t, i) {
                        return void 0 === t || t && "string" == typeof t && void 0 === i ? this.get(e, t) : (this.set(e, t, i), void 0 !== i ? i : t)
                    },
                    remove: function(e, t) {
                        var i, n = e[this.expando];
                        if (void 0 !== n) {
                            if (void 0 !== t) {
                                i = (t = Array.isArray(t) ? t.map(V) : (t = V(t)) in n ? [t] : t.match(j) || []).length;
                                for (; i--;) delete n[t[i]]
                            }(void 0 === t || E.isEmptyObject(n)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
                        }
                    },
                    hasData: function(e) {
                        var t = e[this.expando];
                        return void 0 !== t && !E.isEmptyObject(t)
                    }
                };
                var J = new Q,
                    Z = new Q,
                    ee = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
                    te = /[A-Z]/g;

                function ie(e, t, i) {
                    var n;
                    if (void 0 === i && 1 === e.nodeType)
                        if (n = "data-" + t.replace(te, "-$&").toLowerCase(), "string" == typeof(i = e.getAttribute(n))) {
                            try {
                                i = function(e) {
                                    return "true" === e || "false" !== e && ("null" === e ? null : e === +e + "" ? +e : ee.test(e) ? JSON.parse(e) : e)
                                }(i)
                            } catch (e) {}
                            Z.set(e, t, i)
                        } else i = void 0;
                    return i
                }
                E.extend({
                    hasData: function(e) {
                        return Z.hasData(e) || J.hasData(e)
                    },
                    data: function(e, t, i) {
                        return Z.access(e, t, i)
                    },
                    removeData: function(e, t) {
                        Z.remove(e, t)
                    },
                    _data: function(e, t, i) {
                        return J.access(e, t, i)
                    },
                    _removeData: function(e, t) {
                        J.remove(e, t)
                    }
                }), E.fn.extend({
                    data: function(e, t) {
                        var i, n, s, o = this[0],
                            r = o && o.attributes;
                        if (void 0 === e) {
                            if (this.length && (s = Z.get(o), 1 === o.nodeType && !J.get(o, "hasDataAttrs"))) {
                                for (i = r.length; i--;) r[i] && 0 === (n = r[i].name).indexOf("data-") && (n = V(n.slice(5)), ie(o, n, s[n]));
                                J.set(o, "hasDataAttrs", !0)
                            }
                            return s
                        }
                        return "object" == typeof e ? this.each((function() {
                            Z.set(this, e)
                        })) : $(this, (function(t) {
                            var i;
                            if (o && void 0 === t) return void 0 !== (i = Z.get(o, e)) || void 0 !== (i = ie(o, e)) ? i : void 0;
                            this.each((function() {
                                Z.set(this, e, t)
                            }))
                        }), null, t, arguments.length > 1, null, !0)
                    },
                    removeData: function(e) {
                        return this.each((function() {
                            Z.remove(this, e)
                        }))
                    }
                }), E.extend({
                    queue: function(e, t, i) {
                        var n;
                        if (e) return t = (t || "fx") + "queue", n = J.get(e, t), i && (!n || Array.isArray(i) ? n = J.access(e, t, E.makeArray(i)) : n.push(i)), n || []
                    },
                    dequeue: function(e, t) {
                        t = t || "fx";
                        var i = E.queue(e, t),
                            n = i.length,
                            s = i.shift(),
                            o = E._queueHooks(e, t);
                        "inprogress" === s && (s = i.shift(), n--), s && ("fx" === t && i.unshift("inprogress"), delete o.stop, s.call(e, (function() {
                            E.dequeue(e, t)
                        }), o)), !n && o && o.empty.fire()
                    },
                    _queueHooks: function(e, t) {
                        var i = t + "queueHooks";
                        return J.get(e, i) || J.access(e, i, {
                            empty: E.Callbacks("once memory").add((function() {
                                J.remove(e, [t + "queue", i])
                            }))
                        })
                    }
                }), E.fn.extend({
                    queue: function(e, t) {
                        var i = 2;
                        return "string" != typeof e && (t = e, e = "fx", i--), arguments.length < i ? E.queue(this[0], e) : void 0 === t ? this : this.each((function() {
                            var i = E.queue(this, e, t);
                            E._queueHooks(this, e), "fx" === e && "inprogress" !== i[0] && E.dequeue(this, e)
                        }))
                    },
                    dequeue: function(e) {
                        return this.each((function() {
                            E.dequeue(this, e)
                        }))
                    },
                    clearQueue: function(e) {
                        return this.queue(e || "fx", [])
                    },
                    promise: function(e, t) {
                        var i, n = 1,
                            s = E.Deferred(),
                            o = this,
                            r = this.length,
                            a = function() {
                                --n || s.resolveWith(o, [o])
                            };
                        for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; r--;)(i = J.get(o[r], e + "queueHooks")) && i.empty && (n++, i.empty.add(a));
                        return a(), s.promise(t)
                    }
                });
                var ne = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
                    se = new RegExp("^(?:([+-])=|)(" + ne + ")([a-z%]*)$", "i"),
                    oe = ["Top", "Right", "Bottom", "Left"],
                    re = b.documentElement,
                    ae = function(e) {
                        return E.contains(e.ownerDocument, e)
                    },
                    le = {
                        composed: !0
                    };
                re.getRootNode && (ae = function(e) {
                    return E.contains(e.ownerDocument, e) || e.getRootNode(le) === e.ownerDocument
                });
                var he = function(e, t) {
                    return "none" === (e = t || e).style.display || "" === e.style.display && ae(e) && "none" === E.css(e, "display")
                };

                function ue(e, t, i, n) {
                    var s, o, r = 20,
                        a = n ? function() {
                            return n.cur()
                        } : function() {
                            return E.css(e, t, "")
                        },
                        l = a(),
                        h = i && i[3] || (E.cssNumber[t] ? "" : "px"),
                        u = e.nodeType && (E.cssNumber[t] || "px" !== h && +l) && se.exec(E.css(e, t));
                    if (u && u[3] !== h) {
                        for (l /= 2, h = h || u[3], u = +l || 1; r--;) E.style(e, t, u + h), (1 - o) * (1 - (o = a() / l || .5)) <= 0 && (r = 0), u /= o;
                        u *= 2, E.style(e, t, u + h), i = i || []
                    }
                    return i && (u = +u || +l || 0, s = i[1] ? u + (i[1] + 1) * i[2] : +i[2], n && (n.unit = h, n.start = u, n.end = s)), s
                }
                var ce = {};

                function de(e) {
                    var t, i = e.ownerDocument,
                        n = e.nodeName,
                        s = ce[n];
                    return s || (t = i.body.appendChild(i.createElement(n)), s = E.css(t, "display"), t.parentNode.removeChild(t), "none" === s && (s = "block"), ce[n] = s, s)
                }

                function pe(e, t) {
                    for (var i, n, s = [], o = 0, r = e.length; o < r; o++)(n = e[o]).style && (i = n.style.display, t ? ("none" === i && (s[o] = J.get(n, "display") || null, s[o] || (n.style.display = "")), "" === n.style.display && he(n) && (s[o] = de(n))) : "none" !== i && (s[o] = "none", J.set(n, "display", i)));
                    for (o = 0; o < r; o++) null != s[o] && (e[o].style.display = s[o]);
                    return e
                }
                E.fn.extend({
                    show: function() {
                        return pe(this, !0)
                    },
                    hide: function() {
                        return pe(this)
                    },
                    toggle: function(e) {
                        return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each((function() {
                            he(this) ? E(this).show() : E(this).hide()
                        }))
                    }
                });
                var fe, ge, me = /^(?:checkbox|radio)$/i,
                    ve = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
                    ye = /^$|^module$|\/(?:java|ecma)script/i;
                fe = b.createDocumentFragment().appendChild(b.createElement("div")), (ge = b.createElement("input")).setAttribute("type", "radio"), ge.setAttribute("checked", "checked"), ge.setAttribute("name", "t"), fe.appendChild(ge), m.checkClone = fe.cloneNode(!0).cloneNode(!0).lastChild.checked, fe.innerHTML = "<textarea>x</textarea>", m.noCloneChecked = !!fe.cloneNode(!0).lastChild.defaultValue, fe.innerHTML = "<option></option>", m.option = !!fe.lastChild;
                var be = {
                    thead: [1, "<table>", "</table>"],
                    col: [2, "<table><colgroup>", "</colgroup></table>"],
                    tr: [2, "<table><tbody>", "</tbody></table>"],
                    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                    _default: [0, "", ""]
                };

                function _e(e, t) {
                    var i;
                    return i = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || "*") : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || "*") : [], void 0 === t || t && D(e, t) ? E.merge([e], i) : i
                }

                function we(e, t) {
                    for (var i = 0, n = e.length; i < n; i++) J.set(e[i], "globalEval", !t || J.get(t[i], "globalEval"))
                }
                be.tbody = be.tfoot = be.colgroup = be.caption = be.thead, be.th = be.td, m.option || (be.optgroup = be.option = [1, "<select multiple='multiple'>", "</select>"]);
                var xe = /<|&#?\w+;/;

                function Ce(e, t, i, n, s) {
                    for (var o, r, a, l, h, u, c = t.createDocumentFragment(), d = [], p = 0, f = e.length; p < f; p++)
                        if ((o = e[p]) || 0 === o)
                            if ("object" === x(o)) E.merge(d, o.nodeType ? [o] : o);
                            else if (xe.test(o)) {
                        for (r = r || c.appendChild(t.createElement("div")), a = (ve.exec(o) || ["", ""])[1].toLowerCase(), l = be[a] || be._default, r.innerHTML = l[1] + E.htmlPrefilter(o) + l[2], u = l[0]; u--;) r = r.lastChild;
                        E.merge(d, r.childNodes), (r = c.firstChild).textContent = ""
                    } else d.push(t.createTextNode(o));
                    for (c.textContent = "", p = 0; o = d[p++];)
                        if (n && E.inArray(o, n) > -1) s && s.push(o);
                        else if (h = ae(o), r = _e(c.appendChild(o), "script"), h && we(r), i)
                        for (u = 0; o = r[u++];) ye.test(o.type || "") && i.push(o);
                    return c
                }
                var Ee = /^key/,
                    ke = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
                    Ne = /^([^.]*)(?:\.(.+)|)/;

                function Se() {
                    return !0
                }

                function Te() {
                    return !1
                }

                function Pe(e, t) {
                    return e === function() {
                        try {
                            return b.activeElement
                        } catch (e) {}
                    }() == ("focus" === t)
                }

                function De(e, t, i, n, s, o) {
                    var r, a;
                    if ("object" == typeof t) {
                        for (a in "string" != typeof i && (n = n || i, i = void 0), t) De(e, a, i, n, t[a], o);
                        return e
                    }
                    if (null == n && null == s ? (s = i, n = i = void 0) : null == s && ("string" == typeof i ? (s = n, n = void 0) : (s = n, n = i, i = void 0)), !1 === s) s = Te;
                    else if (!s) return e;
                    return 1 === o && (r = s, (s = function(e) {
                        return E().off(e), r.apply(this, arguments)
                    }).guid = r.guid || (r.guid = E.guid++)), e.each((function() {
                        E.event.add(this, t, s, n, i)
                    }))
                }

                function He(e, t, i) {
                    i ? (J.set(e, t, !1), E.event.add(e, t, {
                        namespace: !1,
                        handler: function(e) {
                            var n, s, o = J.get(this, t);
                            if (1 & e.isTrigger && this[t]) {
                                if (o.length)(E.event.special[t] || {}).delegateType && e.stopPropagation();
                                else if (o = a.call(arguments), J.set(this, t, o), n = i(this, t), this[t](), o !== (s = J.get(this, t)) || n ? J.set(this, t, !1) : s = {}, o !== s) return e.stopImmediatePropagation(), e.preventDefault(), s.value
                            } else o.length && (J.set(this, t, {
                                value: E.event.trigger(E.extend(o[0], E.Event.prototype), o.slice(1), this)
                            }), e.stopImmediatePropagation())
                        }
                    })) : void 0 === J.get(e, t) && E.event.add(e, t, Se)
                }
                E.event = {
                    global: {},
                    add: function(e, t, i, n, s) {
                        var o, r, a, l, h, u, c, d, p, f, g, m = J.get(e);
                        if (K(e))
                            for (i.handler && (i = (o = i).handler, s = o.selector), s && E.find.matchesSelector(re, s), i.guid || (i.guid = E.guid++), (l = m.events) || (l = m.events = Object.create(null)), (r = m.handle) || (r = m.handle = function(t) {
                                    return void 0 !== E && E.event.triggered !== t.type ? E.event.dispatch.apply(e, arguments) : void 0
                                }), h = (t = (t || "").match(j) || [""]).length; h--;) p = g = (a = Ne.exec(t[h]) || [])[1], f = (a[2] || "").split(".").sort(), p && (c = E.event.special[p] || {}, p = (s ? c.delegateType : c.bindType) || p, c = E.event.special[p] || {}, u = E.extend({
                                type: p,
                                origType: g,
                                data: n,
                                handler: i,
                                guid: i.guid,
                                selector: s,
                                needsContext: s && E.expr.match.needsContext.test(s),
                                namespace: f.join(".")
                            }, o), (d = l[p]) || ((d = l[p] = []).delegateCount = 0, c.setup && !1 !== c.setup.call(e, n, f, r) || e.addEventListener && e.addEventListener(p, r)), c.add && (c.add.call(e, u), u.handler.guid || (u.handler.guid = i.guid)), s ? d.splice(d.delegateCount++, 0, u) : d.push(u), E.event.global[p] = !0)
                    },
                    remove: function(e, t, i, n, s) {
                        var o, r, a, l, h, u, c, d, p, f, g, m = J.hasData(e) && J.get(e);
                        if (m && (l = m.events)) {
                            for (h = (t = (t || "").match(j) || [""]).length; h--;)
                                if (p = g = (a = Ne.exec(t[h]) || [])[1], f = (a[2] || "").split(".").sort(), p) {
                                    for (c = E.event.special[p] || {}, d = l[p = (n ? c.delegateType : c.bindType) || p] || [], a = a[2] && new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"), r = o = d.length; o--;) u = d[o], !s && g !== u.origType || i && i.guid !== u.guid || a && !a.test(u.namespace) || n && n !== u.selector && ("**" !== n || !u.selector) || (d.splice(o, 1), u.selector && d.delegateCount--, c.remove && c.remove.call(e, u));
                                    r && !d.length && (c.teardown && !1 !== c.teardown.call(e, f, m.handle) || E.removeEvent(e, p, m.handle), delete l[p])
                                } else
                                    for (p in l) E.event.remove(e, p + t[h], i, n, !0);
                            E.isEmptyObject(l) && J.remove(e, "handle events")
                        }
                    },
                    dispatch: function(e) {
                        var t, i, n, s, o, r, a = new Array(arguments.length),
                            l = E.event.fix(e),
                            h = (J.get(this, "events") || Object.create(null))[l.type] || [],
                            u = E.event.special[l.type] || {};
                        for (a[0] = l, t = 1; t < arguments.length; t++) a[t] = arguments[t];
                        if (l.delegateTarget = this, !u.preDispatch || !1 !== u.preDispatch.call(this, l)) {
                            for (r = E.event.handlers.call(this, l, h), t = 0;
                                (s = r[t++]) && !l.isPropagationStopped();)
                                for (l.currentTarget = s.elem, i = 0;
                                    (o = s.handlers[i++]) && !l.isImmediatePropagationStopped();) l.rnamespace && !1 !== o.namespace && !l.rnamespace.test(o.namespace) || (l.handleObj = o, l.data = o.data, void 0 !== (n = ((E.event.special[o.origType] || {}).handle || o.handler).apply(s.elem, a)) && !1 === (l.result = n) && (l.preventDefault(), l.stopPropagation()));
                            return u.postDispatch && u.postDispatch.call(this, l), l.result
                        }
                    },
                    handlers: function(e, t) {
                        var i, n, s, o, r, a = [],
                            l = t.delegateCount,
                            h = e.target;
                        if (l && h.nodeType && !("click" === e.type && e.button >= 1))
                            for (; h !== this; h = h.parentNode || this)
                                if (1 === h.nodeType && ("click" !== e.type || !0 !== h.disabled)) {
                                    for (o = [], r = {}, i = 0; i < l; i++) void 0 === r[s = (n = t[i]).selector + " "] && (r[s] = n.needsContext ? E(s, this).index(h) > -1 : E.find(s, this, null, [h]).length), r[s] && o.push(n);
                                    o.length && a.push({
                                        elem: h,
                                        handlers: o
                                    })
                                } return h = this, l < t.length && a.push({
                            elem: h,
                            handlers: t.slice(l)
                        }), a
                    },
                    addProp: function(e, t) {
                        Object.defineProperty(E.Event.prototype, e, {
                            enumerable: !0,
                            configurable: !0,
                            get: v(t) ? function() {
                                if (this.originalEvent) return t(this.originalEvent)
                            } : function() {
                                if (this.originalEvent) return this.originalEvent[e]
                            },
                            set: function(t) {
                                Object.defineProperty(this, e, {
                                    enumerable: !0,
                                    configurable: !0,
                                    writable: !0,
                                    value: t
                                })
                            }
                        })
                    },
                    fix: function(e) {
                        return e[E.expando] ? e : new E.Event(e)
                    },
                    special: {
                        load: {
                            noBubble: !0
                        },
                        click: {
                            setup: function(e) {
                                var t = this || e;
                                return me.test(t.type) && t.click && D(t, "input") && He(t, "click", Se), !1
                            },
                            trigger: function(e) {
                                var t = this || e;
                                return me.test(t.type) && t.click && D(t, "input") && He(t, "click"), !0
                            },
                            _default: function(e) {
                                var t = e.target;
                                return me.test(t.type) && t.click && D(t, "input") && J.get(t, "click") || D(t, "a")
                            }
                        },
                        beforeunload: {
                            postDispatch: function(e) {
                                void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                            }
                        }
                    }
                }, E.removeEvent = function(e, t, i) {
                    e.removeEventListener && e.removeEventListener(t, i)
                }, E.Event = function(e, t) {
                    if (!(this instanceof E.Event)) return new E.Event(e, t);
                    e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? Se : Te, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && E.extend(this, t), this.timeStamp = e && e.timeStamp || Date.now(), this[E.expando] = !0
                }, E.Event.prototype = {
                    constructor: E.Event,
                    isDefaultPrevented: Te,
                    isPropagationStopped: Te,
                    isImmediatePropagationStopped: Te,
                    isSimulated: !1,
                    preventDefault: function() {
                        var e = this.originalEvent;
                        this.isDefaultPrevented = Se, e && !this.isSimulated && e.preventDefault()
                    },
                    stopPropagation: function() {
                        var e = this.originalEvent;
                        this.isPropagationStopped = Se, e && !this.isSimulated && e.stopPropagation()
                    },
                    stopImmediatePropagation: function() {
                        var e = this.originalEvent;
                        this.isImmediatePropagationStopped = Se, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation()
                    }
                }, E.each({
                    altKey: !0,
                    bubbles: !0,
                    cancelable: !0,
                    changedTouches: !0,
                    ctrlKey: !0,
                    detail: !0,
                    eventPhase: !0,
                    metaKey: !0,
                    pageX: !0,
                    pageY: !0,
                    shiftKey: !0,
                    view: !0,
                    char: !0,
                    code: !0,
                    charCode: !0,
                    key: !0,
                    keyCode: !0,
                    button: !0,
                    buttons: !0,
                    clientX: !0,
                    clientY: !0,
                    offsetX: !0,
                    offsetY: !0,
                    pointerId: !0,
                    pointerType: !0,
                    screenX: !0,
                    screenY: !0,
                    targetTouches: !0,
                    toElement: !0,
                    touches: !0,
                    which: function(e) {
                        var t = e.button;
                        return null == e.which && Ee.test(e.type) ? null != e.charCode ? e.charCode : e.keyCode : !e.which && void 0 !== t && ke.test(e.type) ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : e.which
                    }
                }, E.event.addProp), E.each({
                    focus: "focusin",
                    blur: "focusout"
                }, (function(e, t) {
                    E.event.special[e] = {
                        setup: function() {
                            return He(this, e, Pe), !1
                        },
                        trigger: function() {
                            return He(this, e), !0
                        },
                        delegateType: t
                    }
                })), E.each({
                    mouseenter: "mouseover",
                    mouseleave: "mouseout",
                    pointerenter: "pointerover",
                    pointerleave: "pointerout"
                }, (function(e, t) {
                    E.event.special[e] = {
                        delegateType: t,
                        bindType: t,
                        handle: function(e) {
                            var i, n = this,
                                s = e.relatedTarget,
                                o = e.handleObj;
                            return s && (s === n || E.contains(n, s)) || (e.type = o.origType, i = o.handler.apply(this, arguments), e.type = t), i
                        }
                    }
                })), E.fn.extend({
                    on: function(e, t, i, n) {
                        return De(this, e, t, i, n)
                    },
                    one: function(e, t, i, n) {
                        return De(this, e, t, i, n, 1)
                    },
                    off: function(e, t, i) {
                        var n, s;
                        if (e && e.preventDefault && e.handleObj) return n = e.handleObj, E(e.delegateTarget).off(n.namespace ? n.origType + "." + n.namespace : n.origType, n.selector, n.handler), this;
                        if ("object" == typeof e) {
                            for (s in e) this.off(s, t, e[s]);
                            return this
                        }
                        return !1 !== t && "function" != typeof t || (i = t, t = void 0), !1 === i && (i = Te), this.each((function() {
                            E.event.remove(this, e, i, t)
                        }))
                    }
                });
                var ze = /<script|<style|<link/i,
                    Ae = /checked\s*(?:[^=]|=\s*.checked.)/i,
                    Re = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

                function Me(e, t) {
                    return D(e, "table") && D(11 !== t.nodeType ? t : t.firstChild, "tr") && E(e).children("tbody")[0] || e
                }

                function Oe(e) {
                    return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
                }

                function Le(e) {
                    return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"), e
                }

                function je(e, t) {
                    var i, n, s, o, r, a;
                    if (1 === t.nodeType) {
                        if (J.hasData(e) && (a = J.get(e).events))
                            for (s in J.remove(t, "handle events"), a)
                                for (i = 0, n = a[s].length; i < n; i++) E.event.add(t, s, a[s][i]);
                        Z.hasData(e) && (o = Z.access(e), r = E.extend({}, o), Z.set(t, r))
                    }
                }

                function Ie(e, t) {
                    var i = t.nodeName.toLowerCase();
                    "input" === i && me.test(e.type) ? t.checked = e.checked : "input" !== i && "textarea" !== i || (t.defaultValue = e.defaultValue)
                }

                function We(e, t, i, n) {
                    t = l(t);
                    var s, o, r, a, h, u, c = 0,
                        d = e.length,
                        p = d - 1,
                        f = t[0],
                        g = v(f);
                    if (g || d > 1 && "string" == typeof f && !m.checkClone && Ae.test(f)) return e.each((function(s) {
                        var o = e.eq(s);
                        g && (t[0] = f.call(this, s, o.html())), We(o, t, i, n)
                    }));
                    if (d && (o = (s = Ce(t, e[0].ownerDocument, !1, e, n)).firstChild, 1 === s.childNodes.length && (s = o), o || n)) {
                        for (a = (r = E.map(_e(s, "script"), Oe)).length; c < d; c++) h = s, c !== p && (h = E.clone(h, !0, !0), a && E.merge(r, _e(h, "script"))), i.call(e[c], h, c);
                        if (a)
                            for (u = r[r.length - 1].ownerDocument, E.map(r, Le), c = 0; c < a; c++) h = r[c], ye.test(h.type || "") && !J.access(h, "globalEval") && E.contains(u, h) && (h.src && "module" !== (h.type || "").toLowerCase() ? E._evalUrl && !h.noModule && E._evalUrl(h.src, {
                                nonce: h.nonce || h.getAttribute("nonce")
                            }, u) : w(h.textContent.replace(Re, ""), h, u))
                    }
                    return e
                }

                function Ue(e, t, i) {
                    for (var n, s = t ? E.filter(t, e) : e, o = 0; null != (n = s[o]); o++) i || 1 !== n.nodeType || E.cleanData(_e(n)), n.parentNode && (i && ae(n) && we(_e(n, "script")), n.parentNode.removeChild(n));
                    return e
                }
                E.extend({
                    htmlPrefilter: function(e) {
                        return e
                    },
                    clone: function(e, t, i) {
                        var n, s, o, r, a = e.cloneNode(!0),
                            l = ae(e);
                        if (!(m.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || E.isXMLDoc(e)))
                            for (r = _e(a), n = 0, s = (o = _e(e)).length; n < s; n++) Ie(o[n], r[n]);
                        if (t)
                            if (i)
                                for (o = o || _e(e), r = r || _e(a), n = 0, s = o.length; n < s; n++) je(o[n], r[n]);
                            else je(e, a);
                        return (r = _e(a, "script")).length > 0 && we(r, !l && _e(e, "script")), a
                    },
                    cleanData: function(e) {
                        for (var t, i, n, s = E.event.special, o = 0; void 0 !== (i = e[o]); o++)
                            if (K(i)) {
                                if (t = i[J.expando]) {
                                    if (t.events)
                                        for (n in t.events) s[n] ? E.event.remove(i, n) : E.removeEvent(i, n, t.handle);
                                    i[J.expando] = void 0
                                }
                                i[Z.expando] && (i[Z.expando] = void 0)
                            }
                    }
                }), E.fn.extend({
                    detach: function(e) {
                        return Ue(this, e, !0)
                    },
                    remove: function(e) {
                        return Ue(this, e)
                    },
                    text: function(e) {
                        return $(this, (function(e) {
                            return void 0 === e ? E.text(this) : this.empty().each((function() {
                                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                            }))
                        }), null, e, arguments.length)
                    },
                    append: function() {
                        return We(this, arguments, (function(e) {
                            1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || Me(this, e).appendChild(e)
                        }))
                    },
                    prepend: function() {
                        return We(this, arguments, (function(e) {
                            if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                                var t = Me(this, e);
                                t.insertBefore(e, t.firstChild)
                            }
                        }))
                    },
                    before: function() {
                        return We(this, arguments, (function(e) {
                            this.parentNode && this.parentNode.insertBefore(e, this)
                        }))
                    },
                    after: function() {
                        return We(this, arguments, (function(e) {
                            this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                        }))
                    },
                    empty: function() {
                        for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (E.cleanData(_e(e, !1)), e.textContent = "");
                        return this
                    },
                    clone: function(e, t) {
                        return e = null != e && e, t = null == t ? e : t, this.map((function() {
                            return E.clone(this, e, t)
                        }))
                    },
                    html: function(e) {
                        return $(this, (function(e) {
                            var t = this[0] || {},
                                i = 0,
                                n = this.length;
                            if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                            if ("string" == typeof e && !ze.test(e) && !be[(ve.exec(e) || ["", ""])[1].toLowerCase()]) {
                                e = E.htmlPrefilter(e);
                                try {
                                    for (; i < n; i++) 1 === (t = this[i] || {}).nodeType && (E.cleanData(_e(t, !1)), t.innerHTML = e);
                                    t = 0
                                } catch (e) {}
                            }
                            t && this.empty().append(e)
                        }), null, e, arguments.length)
                    },
                    replaceWith: function() {
                        var e = [];
                        return We(this, arguments, (function(t) {
                            var i = this.parentNode;
                            E.inArray(this, e) < 0 && (E.cleanData(_e(this)), i && i.replaceChild(t, this))
                        }), e)
                    }
                }), E.each({
                    appendTo: "append",
                    prependTo: "prepend",
                    insertBefore: "before",
                    insertAfter: "after",
                    replaceAll: "replaceWith"
                }, (function(e, t) {
                    E.fn[e] = function(e) {
                        for (var i, n = [], s = E(e), o = s.length - 1, r = 0; r <= o; r++) i = r === o ? this : this.clone(!0), E(s[r])[t](i), h.apply(n, i.get());
                        return this.pushStack(n)
                    }
                }));
                var qe = new RegExp("^(" + ne + ")(?!px)[a-z%]+$", "i"),
                    Be = function(e) {
                        var t = e.ownerDocument.defaultView;
                        return t && t.opener || (t = n), t.getComputedStyle(e)
                    },
                    Fe = function(e, t, i) {
                        var n, s, o = {};
                        for (s in t) o[s] = e.style[s], e.style[s] = t[s];
                        for (s in n = i.call(e), t) e.style[s] = o[s];
                        return n
                    },
                    $e = new RegExp(oe.join("|"), "i");

                function Ge(e, t, i) {
                    var n, s, o, r, a = e.style;
                    return (i = i || Be(e)) && ("" !== (r = i.getPropertyValue(t) || i[t]) || ae(e) || (r = E.style(e, t)), !m.pixelBoxStyles() && qe.test(r) && $e.test(t) && (n = a.width, s = a.minWidth, o = a.maxWidth, a.minWidth = a.maxWidth = a.width = r, r = i.width, a.width = n, a.minWidth = s, a.maxWidth = o)), void 0 !== r ? r + "" : r
                }

                function Xe(e, t) {
                    return {
                        get: function() {
                            if (!e()) return (this.get = t).apply(this, arguments);
                            delete this.get
                        }
                    }
                }! function() {
                    function e() {
                        if (u) {
                            h.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", u.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", re.appendChild(h).appendChild(u);
                            var e = n.getComputedStyle(u);
                            i = "1%" !== e.top, l = 12 === t(e.marginLeft), u.style.right = "60%", r = 36 === t(e.right), s = 36 === t(e.width), u.style.position = "absolute", o = 12 === t(u.offsetWidth / 3), re.removeChild(h), u = null
                        }
                    }

                    function t(e) {
                        return Math.round(parseFloat(e))
                    }
                    var i, s, o, r, a, l, h = b.createElement("div"),
                        u = b.createElement("div");
                    u.style && (u.style.backgroundClip = "content-box", u.cloneNode(!0).style.backgroundClip = "", m.clearCloneStyle = "content-box" === u.style.backgroundClip, E.extend(m, {
                        boxSizingReliable: function() {
                            return e(), s
                        },
                        pixelBoxStyles: function() {
                            return e(), r
                        },
                        pixelPosition: function() {
                            return e(), i
                        },
                        reliableMarginLeft: function() {
                            return e(), l
                        },
                        scrollboxSize: function() {
                            return e(), o
                        },
                        reliableTrDimensions: function() {
                            var e, t, i, s;
                            return null == a && (e = b.createElement("table"), t = b.createElement("tr"), i = b.createElement("div"), e.style.cssText = "position:absolute;left:-11111px", t.style.height = "1px", i.style.height = "9px", re.appendChild(e).appendChild(t).appendChild(i), s = n.getComputedStyle(t), a = parseInt(s.height) > 3, re.removeChild(e)), a
                        }
                    }))
                }();
                var Ye = ["Webkit", "Moz", "ms"],
                    Ve = b.createElement("div").style,
                    Ke = {};

                function Qe(e) {
                    return E.cssProps[e] || Ke[e] || (e in Ve ? e : Ke[e] = function(e) {
                        for (var t = e[0].toUpperCase() + e.slice(1), i = Ye.length; i--;)
                            if ((e = Ye[i] + t) in Ve) return e
                    }(e) || e)
                }
                var Je = /^(none|table(?!-c[ea]).+)/,
                    Ze = /^--/,
                    et = {
                        position: "absolute",
                        visibility: "hidden",
                        display: "block"
                    },
                    tt = {
                        letterSpacing: "0",
                        fontWeight: "400"
                    };

                function it(e, t, i) {
                    var n = se.exec(t);
                    return n ? Math.max(0, n[2] - (i || 0)) + (n[3] || "px") : t
                }

                function nt(e, t, i, n, s, o) {
                    var r = "width" === t ? 1 : 0,
                        a = 0,
                        l = 0;
                    if (i === (n ? "border" : "content")) return 0;
                    for (; r < 4; r += 2) "margin" === i && (l += E.css(e, i + oe[r], !0, s)), n ? ("content" === i && (l -= E.css(e, "padding" + oe[r], !0, s)), "margin" !== i && (l -= E.css(e, "border" + oe[r] + "Width", !0, s))) : (l += E.css(e, "padding" + oe[r], !0, s), "padding" !== i ? l += E.css(e, "border" + oe[r] + "Width", !0, s) : a += E.css(e, "border" + oe[r] + "Width", !0, s));
                    return !n && o >= 0 && (l += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - o - l - a - .5)) || 0), l
                }

                function st(e, t, i) {
                    var n = Be(e),
                        s = (!m.boxSizingReliable() || i) && "border-box" === E.css(e, "boxSizing", !1, n),
                        o = s,
                        r = Ge(e, t, n),
                        a = "offset" + t[0].toUpperCase() + t.slice(1);
                    if (qe.test(r)) {
                        if (!i) return r;
                        r = "auto"
                    }
                    return (!m.boxSizingReliable() && s || !m.reliableTrDimensions() && D(e, "tr") || "auto" === r || !parseFloat(r) && "inline" === E.css(e, "display", !1, n)) && e.getClientRects().length && (s = "border-box" === E.css(e, "boxSizing", !1, n), (o = a in e) && (r = e[a])), (r = parseFloat(r) || 0) + nt(e, t, i || (s ? "border" : "content"), o, n, r) + "px"
                }

                function ot(e, t, i, n, s) {
                    return new ot.prototype.init(e, t, i, n, s)
                }
                E.extend({
                    cssHooks: {
                        opacity: {
                            get: function(e, t) {
                                if (t) {
                                    var i = Ge(e, "opacity");
                                    return "" === i ? "1" : i
                                }
                            }
                        }
                    },
                    cssNumber: {
                        animationIterationCount: !0,
                        columnCount: !0,
                        fillOpacity: !0,
                        flexGrow: !0,
                        flexShrink: !0,
                        fontWeight: !0,
                        gridArea: !0,
                        gridColumn: !0,
                        gridColumnEnd: !0,
                        gridColumnStart: !0,
                        gridRow: !0,
                        gridRowEnd: !0,
                        gridRowStart: !0,
                        lineHeight: !0,
                        opacity: !0,
                        order: !0,
                        orphans: !0,
                        widows: !0,
                        zIndex: !0,
                        zoom: !0
                    },
                    cssProps: {},
                    style: function(e, t, i, n) {
                        if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                            var s, o, r, a = V(t),
                                l = Ze.test(t),
                                h = e.style;
                            if (l || (t = Qe(a)), r = E.cssHooks[t] || E.cssHooks[a], void 0 === i) return r && "get" in r && void 0 !== (s = r.get(e, !1, n)) ? s : h[t];
                            "string" == (o = typeof i) && (s = se.exec(i)) && s[1] && (i = ue(e, t, s), o = "number"), null != i && i == i && ("number" !== o || l || (i += s && s[3] || (E.cssNumber[a] ? "" : "px")), m.clearCloneStyle || "" !== i || 0 !== t.indexOf("background") || (h[t] = "inherit"), r && "set" in r && void 0 === (i = r.set(e, i, n)) || (l ? h.setProperty(t, i) : h[t] = i))
                        }
                    },
                    css: function(e, t, i, n) {
                        var s, o, r, a = V(t);
                        return Ze.test(t) || (t = Qe(a)), (r = E.cssHooks[t] || E.cssHooks[a]) && "get" in r && (s = r.get(e, !0, i)), void 0 === s && (s = Ge(e, t, n)), "normal" === s && t in tt && (s = tt[t]), "" === i || i ? (o = parseFloat(s), !0 === i || isFinite(o) ? o || 0 : s) : s
                    }
                }), E.each(["height", "width"], (function(e, t) {
                    E.cssHooks[t] = {
                        get: function(e, i, n) {
                            if (i) return !Je.test(E.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? st(e, t, n) : Fe(e, et, (function() {
                                return st(e, t, n)
                            }))
                        },
                        set: function(e, i, n) {
                            var s, o = Be(e),
                                r = !m.scrollboxSize() && "absolute" === o.position,
                                a = (r || n) && "border-box" === E.css(e, "boxSizing", !1, o),
                                l = n ? nt(e, t, n, a, o) : 0;
                            return a && r && (l -= Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - parseFloat(o[t]) - nt(e, t, "border", !1, o) - .5)), l && (s = se.exec(i)) && "px" !== (s[3] || "px") && (e.style[t] = i, i = E.css(e, t)), it(0, i, l)
                        }
                    }
                })), E.cssHooks.marginLeft = Xe(m.reliableMarginLeft, (function(e, t) {
                    if (t) return (parseFloat(Ge(e, "marginLeft")) || e.getBoundingClientRect().left - Fe(e, {
                        marginLeft: 0
                    }, (function() {
                        return e.getBoundingClientRect().left
                    }))) + "px"
                })), E.each({
                    margin: "",
                    padding: "",
                    border: "Width"
                }, (function(e, t) {
                    E.cssHooks[e + t] = {
                        expand: function(i) {
                            for (var n = 0, s = {}, o = "string" == typeof i ? i.split(" ") : [i]; n < 4; n++) s[e + oe[n] + t] = o[n] || o[n - 2] || o[0];
                            return s
                        }
                    }, "margin" !== e && (E.cssHooks[e + t].set = it)
                })), E.fn.extend({
                    css: function(e, t) {
                        return $(this, (function(e, t, i) {
                            var n, s, o = {},
                                r = 0;
                            if (Array.isArray(t)) {
                                for (n = Be(e), s = t.length; r < s; r++) o[t[r]] = E.css(e, t[r], !1, n);
                                return o
                            }
                            return void 0 !== i ? E.style(e, t, i) : E.css(e, t)
                        }), e, t, arguments.length > 1)
                    }
                }), E.Tween = ot, ot.prototype = {
                    constructor: ot,
                    init: function(e, t, i, n, s, o) {
                        this.elem = e, this.prop = i, this.easing = s || E.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = n, this.unit = o || (E.cssNumber[i] ? "" : "px")
                    },
                    cur: function() {
                        var e = ot.propHooks[this.prop];
                        return e && e.get ? e.get(this) : ot.propHooks._default.get(this)
                    },
                    run: function(e) {
                        var t, i = ot.propHooks[this.prop];
                        return this.options.duration ? this.pos = t = E.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), i && i.set ? i.set(this) : ot.propHooks._default.set(this), this
                    }
                }, ot.prototype.init.prototype = ot.prototype, ot.propHooks = {
                    _default: {
                        get: function(e) {
                            var t;
                            return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = E.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0
                        },
                        set: function(e) {
                            E.fx.step[e.prop] ? E.fx.step[e.prop](e) : 1 !== e.elem.nodeType || !E.cssHooks[e.prop] && null == e.elem.style[Qe(e.prop)] ? e.elem[e.prop] = e.now : E.style(e.elem, e.prop, e.now + e.unit)
                        }
                    }
                }, ot.propHooks.scrollTop = ot.propHooks.scrollLeft = {
                    set: function(e) {
                        e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
                    }
                }, E.easing = {
                    linear: function(e) {
                        return e
                    },
                    swing: function(e) {
                        return .5 - Math.cos(e * Math.PI) / 2
                    },
                    _default: "swing"
                }, E.fx = ot.prototype.init, E.fx.step = {};
                var rt, at, lt = /^(?:toggle|show|hide)$/,
                    ht = /queueHooks$/;

                function ut() {
                    at && (!1 === b.hidden && n.requestAnimationFrame ? n.requestAnimationFrame(ut) : n.setTimeout(ut, E.fx.interval), E.fx.tick())
                }

                function ct() {
                    return n.setTimeout((function() {
                        rt = void 0
                    })), rt = Date.now()
                }

                function dt(e, t) {
                    var i, n = 0,
                        s = {
                            height: e
                        };
                    for (t = t ? 1 : 0; n < 4; n += 2 - t) s["margin" + (i = oe[n])] = s["padding" + i] = e;
                    return t && (s.opacity = s.width = e), s
                }

                function pt(e, t, i) {
                    for (var n, s = (ft.tweeners[t] || []).concat(ft.tweeners["*"]), o = 0, r = s.length; o < r; o++)
                        if (n = s[o].call(i, t, e)) return n
                }

                function ft(e, t, i) {
                    var n, s, o = 0,
                        r = ft.prefilters.length,
                        a = E.Deferred().always((function() {
                            delete l.elem
                        })),
                        l = function() {
                            if (s) return !1;
                            for (var t = rt || ct(), i = Math.max(0, h.startTime + h.duration - t), n = 1 - (i / h.duration || 0), o = 0, r = h.tweens.length; o < r; o++) h.tweens[o].run(n);
                            return a.notifyWith(e, [h, n, i]), n < 1 && r ? i : (r || a.notifyWith(e, [h, 1, 0]), a.resolveWith(e, [h]), !1)
                        },
                        h = a.promise({
                            elem: e,
                            props: E.extend({}, t),
                            opts: E.extend(!0, {
                                specialEasing: {},
                                easing: E.easing._default
                            }, i),
                            originalProperties: t,
                            originalOptions: i,
                            startTime: rt || ct(),
                            duration: i.duration,
                            tweens: [],
                            createTween: function(t, i) {
                                var n = E.Tween(e, h.opts, t, i, h.opts.specialEasing[t] || h.opts.easing);
                                return h.tweens.push(n), n
                            },
                            stop: function(t) {
                                var i = 0,
                                    n = t ? h.tweens.length : 0;
                                if (s) return this;
                                for (s = !0; i < n; i++) h.tweens[i].run(1);
                                return t ? (a.notifyWith(e, [h, 1, 0]), a.resolveWith(e, [h, t])) : a.rejectWith(e, [h, t]), this
                            }
                        }),
                        u = h.props;
                    for (function(e, t) {
                            var i, n, s, o, r;
                            for (i in e)
                                if (s = t[n = V(i)], o = e[i], Array.isArray(o) && (s = o[1], o = e[i] = o[0]), i !== n && (e[n] = o, delete e[i]), (r = E.cssHooks[n]) && "expand" in r)
                                    for (i in o = r.expand(o), delete e[n], o) i in e || (e[i] = o[i], t[i] = s);
                                else t[n] = s
                        }(u, h.opts.specialEasing); o < r; o++)
                        if (n = ft.prefilters[o].call(h, e, u, h.opts)) return v(n.stop) && (E._queueHooks(h.elem, h.opts.queue).stop = n.stop.bind(n)), n;
                    return E.map(u, pt, h), v(h.opts.start) && h.opts.start.call(e, h), h.progress(h.opts.progress).done(h.opts.done, h.opts.complete).fail(h.opts.fail).always(h.opts.always), E.fx.timer(E.extend(l, {
                        elem: e,
                        anim: h,
                        queue: h.opts.queue
                    })), h
                }
                E.Animation = E.extend(ft, {
                        tweeners: {
                            "*": [function(e, t) {
                                var i = this.createTween(e, t);
                                return ue(i.elem, e, se.exec(t), i), i
                            }]
                        },
                        tweener: function(e, t) {
                            v(e) ? (t = e, e = ["*"]) : e = e.match(j);
                            for (var i, n = 0, s = e.length; n < s; n++) i = e[n], ft.tweeners[i] = ft.tweeners[i] || [], ft.tweeners[i].unshift(t)
                        },
                        prefilters: [function(e, t, i) {
                            var n, s, o, r, a, l, h, u, c = "width" in t || "height" in t,
                                d = this,
                                p = {},
                                f = e.style,
                                g = e.nodeType && he(e),
                                m = J.get(e, "fxshow");
                            for (n in i.queue || (null == (r = E._queueHooks(e, "fx")).unqueued && (r.unqueued = 0, a = r.empty.fire, r.empty.fire = function() {
                                    r.unqueued || a()
                                }), r.unqueued++, d.always((function() {
                                    d.always((function() {
                                        r.unqueued--, E.queue(e, "fx").length || r.empty.fire()
                                    }))
                                }))), t)
                                if (s = t[n], lt.test(s)) {
                                    if (delete t[n], o = o || "toggle" === s, s === (g ? "hide" : "show")) {
                                        if ("show" !== s || !m || void 0 === m[n]) continue;
                                        g = !0
                                    }
                                    p[n] = m && m[n] || E.style(e, n)
                                } if ((l = !E.isEmptyObject(t)) || !E.isEmptyObject(p))
                                for (n in c && 1 === e.nodeType && (i.overflow = [f.overflow, f.overflowX, f.overflowY], null == (h = m && m.display) && (h = J.get(e, "display")), "none" === (u = E.css(e, "display")) && (h ? u = h : (pe([e], !0), h = e.style.display || h, u = E.css(e, "display"), pe([e]))), ("inline" === u || "inline-block" === u && null != h) && "none" === E.css(e, "float") && (l || (d.done((function() {
                                        f.display = h
                                    })), null == h && (u = f.display, h = "none" === u ? "" : u)), f.display = "inline-block")), i.overflow && (f.overflow = "hidden", d.always((function() {
                                        f.overflow = i.overflow[0], f.overflowX = i.overflow[1], f.overflowY = i.overflow[2]
                                    }))), l = !1, p) l || (m ? "hidden" in m && (g = m.hidden) : m = J.access(e, "fxshow", {
                                    display: h
                                }), o && (m.hidden = !g), g && pe([e], !0), d.done((function() {
                                    for (n in g || pe([e]), J.remove(e, "fxshow"), p) E.style(e, n, p[n])
                                }))), l = pt(g ? m[n] : 0, n, d), n in m || (m[n] = l.start, g && (l.end = l.start, l.start = 0))
                        }],
                        prefilter: function(e, t) {
                            t ? ft.prefilters.unshift(e) : ft.prefilters.push(e)
                        }
                    }), E.speed = function(e, t, i) {
                        var n = e && "object" == typeof e ? E.extend({}, e) : {
                            complete: i || !i && t || v(e) && e,
                            duration: e,
                            easing: i && t || t && !v(t) && t
                        };
                        return E.fx.off ? n.duration = 0 : "number" != typeof n.duration && (n.duration in E.fx.speeds ? n.duration = E.fx.speeds[n.duration] : n.duration = E.fx.speeds._default), null != n.queue && !0 !== n.queue || (n.queue = "fx"), n.old = n.complete, n.complete = function() {
                            v(n.old) && n.old.call(this), n.queue && E.dequeue(this, n.queue)
                        }, n
                    }, E.fn.extend({
                        fadeTo: function(e, t, i, n) {
                            return this.filter(he).css("opacity", 0).show().end().animate({
                                opacity: t
                            }, e, i, n)
                        },
                        animate: function(e, t, i, n) {
                            var s = E.isEmptyObject(e),
                                o = E.speed(t, i, n),
                                r = function() {
                                    var t = ft(this, E.extend({}, e), o);
                                    (s || J.get(this, "finish")) && t.stop(!0)
                                };
                            return r.finish = r, s || !1 === o.queue ? this.each(r) : this.queue(o.queue, r)
                        },
                        stop: function(e, t, i) {
                            var n = function(e) {
                                var t = e.stop;
                                delete e.stop, t(i)
                            };
                            return "string" != typeof e && (i = t, t = e, e = void 0), t && this.queue(e || "fx", []), this.each((function() {
                                var t = !0,
                                    s = null != e && e + "queueHooks",
                                    o = E.timers,
                                    r = J.get(this);
                                if (s) r[s] && r[s].stop && n(r[s]);
                                else
                                    for (s in r) r[s] && r[s].stop && ht.test(s) && n(r[s]);
                                for (s = o.length; s--;) o[s].elem !== this || null != e && o[s].queue !== e || (o[s].anim.stop(i), t = !1, o.splice(s, 1));
                                !t && i || E.dequeue(this, e)
                            }))
                        },
                        finish: function(e) {
                            return !1 !== e && (e = e || "fx"), this.each((function() {
                                var t, i = J.get(this),
                                    n = i[e + "queue"],
                                    s = i[e + "queueHooks"],
                                    o = E.timers,
                                    r = n ? n.length : 0;
                                for (i.finish = !0, E.queue(this, e, []), s && s.stop && s.stop.call(this, !0), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                                for (t = 0; t < r; t++) n[t] && n[t].finish && n[t].finish.call(this);
                                delete i.finish
                            }))
                        }
                    }), E.each(["toggle", "show", "hide"], (function(e, t) {
                        var i = E.fn[t];
                        E.fn[t] = function(e, n, s) {
                            return null == e || "boolean" == typeof e ? i.apply(this, arguments) : this.animate(dt(t, !0), e, n, s)
                        }
                    })), E.each({
                        slideDown: dt("show"),
                        slideUp: dt("hide"),
                        slideToggle: dt("toggle"),
                        fadeIn: {
                            opacity: "show"
                        },
                        fadeOut: {
                            opacity: "hide"
                        },
                        fadeToggle: {
                            opacity: "toggle"
                        }
                    }, (function(e, t) {
                        E.fn[e] = function(e, i, n) {
                            return this.animate(t, e, i, n)
                        }
                    })), E.timers = [], E.fx.tick = function() {
                        var e, t = 0,
                            i = E.timers;
                        for (rt = Date.now(); t < i.length; t++)(e = i[t])() || i[t] !== e || i.splice(t--, 1);
                        i.length || E.fx.stop(), rt = void 0
                    }, E.fx.timer = function(e) {
                        E.timers.push(e), E.fx.start()
                    }, E.fx.interval = 13, E.fx.start = function() {
                        at || (at = !0, ut())
                    }, E.fx.stop = function() {
                        at = null
                    }, E.fx.speeds = {
                        slow: 600,
                        fast: 200,
                        _default: 400
                    }, E.fn.delay = function(e, t) {
                        return e = E.fx && E.fx.speeds[e] || e, t = t || "fx", this.queue(t, (function(t, i) {
                            var s = n.setTimeout(t, e);
                            i.stop = function() {
                                n.clearTimeout(s)
                            }
                        }))
                    },
                    function() {
                        var e = b.createElement("input"),
                            t = b.createElement("select").appendChild(b.createElement("option"));
                        e.type = "checkbox", m.checkOn = "" !== e.value, m.optSelected = t.selected, (e = b.createElement("input")).value = "t", e.type = "radio", m.radioValue = "t" === e.value
                    }();
                var gt, mt = E.expr.attrHandle;
                E.fn.extend({
                    attr: function(e, t) {
                        return $(this, E.attr, e, t, arguments.length > 1)
                    },
                    removeAttr: function(e) {
                        return this.each((function() {
                            E.removeAttr(this, e)
                        }))
                    }
                }), E.extend({
                    attr: function(e, t, i) {
                        var n, s, o = e.nodeType;
                        if (3 !== o && 8 !== o && 2 !== o) return void 0 === e.getAttribute ? E.prop(e, t, i) : (1 === o && E.isXMLDoc(e) || (s = E.attrHooks[t.toLowerCase()] || (E.expr.match.bool.test(t) ? gt : void 0)), void 0 !== i ? null === i ? void E.removeAttr(e, t) : s && "set" in s && void 0 !== (n = s.set(e, i, t)) ? n : (e.setAttribute(t, i + ""), i) : s && "get" in s && null !== (n = s.get(e, t)) ? n : null == (n = E.find.attr(e, t)) ? void 0 : n)
                    },
                    attrHooks: {
                        type: {
                            set: function(e, t) {
                                if (!m.radioValue && "radio" === t && D(e, "input")) {
                                    var i = e.value;
                                    return e.setAttribute("type", t), i && (e.value = i), t
                                }
                            }
                        }
                    },
                    removeAttr: function(e, t) {
                        var i, n = 0,
                            s = t && t.match(j);
                        if (s && 1 === e.nodeType)
                            for (; i = s[n++];) e.removeAttribute(i)
                    }
                }), gt = {
                    set: function(e, t, i) {
                        return !1 === t ? E.removeAttr(e, i) : e.setAttribute(i, i), i
                    }
                }, E.each(E.expr.match.bool.source.match(/\w+/g), (function(e, t) {
                    var i = mt[t] || E.find.attr;
                    mt[t] = function(e, t, n) {
                        var s, o, r = t.toLowerCase();
                        return n || (o = mt[r], mt[r] = s, s = null != i(e, t, n) ? r : null, mt[r] = o), s
                    }
                }));
                var vt = /^(?:input|select|textarea|button)$/i,
                    yt = /^(?:a|area)$/i;

                function bt(e) {
                    return (e.match(j) || []).join(" ")
                }

                function _t(e) {
                    return e.getAttribute && e.getAttribute("class") || ""
                }

                function wt(e) {
                    return Array.isArray(e) ? e : "string" == typeof e && e.match(j) || []
                }
                E.fn.extend({
                    prop: function(e, t) {
                        return $(this, E.prop, e, t, arguments.length > 1)
                    },
                    removeProp: function(e) {
                        return this.each((function() {
                            delete this[E.propFix[e] || e]
                        }))
                    }
                }), E.extend({
                    prop: function(e, t, i) {
                        var n, s, o = e.nodeType;
                        if (3 !== o && 8 !== o && 2 !== o) return 1 === o && E.isXMLDoc(e) || (t = E.propFix[t] || t, s = E.propHooks[t]), void 0 !== i ? s && "set" in s && void 0 !== (n = s.set(e, i, t)) ? n : e[t] = i : s && "get" in s && null !== (n = s.get(e, t)) ? n : e[t]
                    },
                    propHooks: {
                        tabIndex: {
                            get: function(e) {
                                var t = E.find.attr(e, "tabindex");
                                return t ? parseInt(t, 10) : vt.test(e.nodeName) || yt.test(e.nodeName) && e.href ? 0 : -1
                            }
                        }
                    },
                    propFix: {
                        for: "htmlFor",
                        class: "className"
                    }
                }), m.optSelected || (E.propHooks.selected = {
                    get: function(e) {
                        var t = e.parentNode;
                        return t && t.parentNode && t.parentNode.selectedIndex, null
                    },
                    set: function(e) {
                        var t = e.parentNode;
                        t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
                    }
                }), E.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], (function() {
                    E.propFix[this.toLowerCase()] = this
                })), E.fn.extend({
                    addClass: function(e) {
                        var t, i, n, s, o, r, a, l = 0;
                        if (v(e)) return this.each((function(t) {
                            E(this).addClass(e.call(this, t, _t(this)))
                        }));
                        if ((t = wt(e)).length)
                            for (; i = this[l++];)
                                if (s = _t(i), n = 1 === i.nodeType && " " + bt(s) + " ") {
                                    for (r = 0; o = t[r++];) n.indexOf(" " + o + " ") < 0 && (n += o + " ");
                                    s !== (a = bt(n)) && i.setAttribute("class", a)
                                } return this
                    },
                    removeClass: function(e) {
                        var t, i, n, s, o, r, a, l = 0;
                        if (v(e)) return this.each((function(t) {
                            E(this).removeClass(e.call(this, t, _t(this)))
                        }));
                        if (!arguments.length) return this.attr("class", "");
                        if ((t = wt(e)).length)
                            for (; i = this[l++];)
                                if (s = _t(i), n = 1 === i.nodeType && " " + bt(s) + " ") {
                                    for (r = 0; o = t[r++];)
                                        for (; n.indexOf(" " + o + " ") > -1;) n = n.replace(" " + o + " ", " ");
                                    s !== (a = bt(n)) && i.setAttribute("class", a)
                                } return this
                    },
                    toggleClass: function(e, t) {
                        var i = typeof e,
                            n = "string" === i || Array.isArray(e);
                        return "boolean" == typeof t && n ? t ? this.addClass(e) : this.removeClass(e) : v(e) ? this.each((function(i) {
                            E(this).toggleClass(e.call(this, i, _t(this), t), t)
                        })) : this.each((function() {
                            var t, s, o, r;
                            if (n)
                                for (s = 0, o = E(this), r = wt(e); t = r[s++];) o.hasClass(t) ? o.removeClass(t) : o.addClass(t);
                            else void 0 !== e && "boolean" !== i || ((t = _t(this)) && J.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || !1 === e ? "" : J.get(this, "__className__") || ""))
                        }))
                    },
                    hasClass: function(e) {
                        var t, i, n = 0;
                        for (t = " " + e + " "; i = this[n++];)
                            if (1 === i.nodeType && (" " + bt(_t(i)) + " ").indexOf(t) > -1) return !0;
                        return !1
                    }
                });
                var xt = /\r/g;
                E.fn.extend({
                    val: function(e) {
                        var t, i, n, s = this[0];
                        return arguments.length ? (n = v(e), this.each((function(i) {
                            var s;
                            1 === this.nodeType && (null == (s = n ? e.call(this, i, E(this).val()) : e) ? s = "" : "number" == typeof s ? s += "" : Array.isArray(s) && (s = E.map(s, (function(e) {
                                return null == e ? "" : e + ""
                            }))), (t = E.valHooks[this.type] || E.valHooks[this.nodeName.toLowerCase()]) && "set" in t && void 0 !== t.set(this, s, "value") || (this.value = s))
                        }))) : s ? (t = E.valHooks[s.type] || E.valHooks[s.nodeName.toLowerCase()]) && "get" in t && void 0 !== (i = t.get(s, "value")) ? i : "string" == typeof(i = s.value) ? i.replace(xt, "") : null == i ? "" : i : void 0
                    }
                }), E.extend({
                    valHooks: {
                        option: {
                            get: function(e) {
                                var t = E.find.attr(e, "value");
                                return null != t ? t : bt(E.text(e))
                            }
                        },
                        select: {
                            get: function(e) {
                                var t, i, n, s = e.options,
                                    o = e.selectedIndex,
                                    r = "select-one" === e.type,
                                    a = r ? null : [],
                                    l = r ? o + 1 : s.length;
                                for (n = o < 0 ? l : r ? o : 0; n < l; n++)
                                    if (((i = s[n]).selected || n === o) && !i.disabled && (!i.parentNode.disabled || !D(i.parentNode, "optgroup"))) {
                                        if (t = E(i).val(), r) return t;
                                        a.push(t)
                                    } return a
                            },
                            set: function(e, t) {
                                for (var i, n, s = e.options, o = E.makeArray(t), r = s.length; r--;)((n = s[r]).selected = E.inArray(E.valHooks.option.get(n), o) > -1) && (i = !0);
                                return i || (e.selectedIndex = -1), o
                            }
                        }
                    }
                }), E.each(["radio", "checkbox"], (function() {
                    E.valHooks[this] = {
                        set: function(e, t) {
                            if (Array.isArray(t)) return e.checked = E.inArray(E(e).val(), t) > -1
                        }
                    }, m.checkOn || (E.valHooks[this].get = function(e) {
                        return null === e.getAttribute("value") ? "on" : e.value
                    })
                })), m.focusin = "onfocusin" in n;
                var Ct = /^(?:focusinfocus|focusoutblur)$/,
                    Et = function(e) {
                        e.stopPropagation()
                    };
                E.extend(E.event, {
                    trigger: function(e, t, i, s) {
                        var o, r, a, l, h, u, c, d, f = [i || b],
                            g = p.call(e, "type") ? e.type : e,
                            m = p.call(e, "namespace") ? e.namespace.split(".") : [];
                        if (r = d = a = i = i || b, 3 !== i.nodeType && 8 !== i.nodeType && !Ct.test(g + E.event.triggered) && (g.indexOf(".") > -1 && (m = g.split("."), g = m.shift(), m.sort()), h = g.indexOf(":") < 0 && "on" + g, (e = e[E.expando] ? e : new E.Event(g, "object" == typeof e && e)).isTrigger = s ? 2 : 3, e.namespace = m.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = i), t = null == t ? [e] : E.makeArray(t, [e]), c = E.event.special[g] || {}, s || !c.trigger || !1 !== c.trigger.apply(i, t))) {
                            if (!s && !c.noBubble && !y(i)) {
                                for (l = c.delegateType || g, Ct.test(l + g) || (r = r.parentNode); r; r = r.parentNode) f.push(r), a = r;
                                a === (i.ownerDocument || b) && f.push(a.defaultView || a.parentWindow || n)
                            }
                            for (o = 0;
                                (r = f[o++]) && !e.isPropagationStopped();) d = r, e.type = o > 1 ? l : c.bindType || g, (u = (J.get(r, "events") || Object.create(null))[e.type] && J.get(r, "handle")) && u.apply(r, t), (u = h && r[h]) && u.apply && K(r) && (e.result = u.apply(r, t), !1 === e.result && e.preventDefault());
                            return e.type = g, s || e.isDefaultPrevented() || c._default && !1 !== c._default.apply(f.pop(), t) || !K(i) || h && v(i[g]) && !y(i) && ((a = i[h]) && (i[h] = null), E.event.triggered = g, e.isPropagationStopped() && d.addEventListener(g, Et), i[g](), e.isPropagationStopped() && d.removeEventListener(g, Et), E.event.triggered = void 0, a && (i[h] = a)), e.result
                        }
                    },
                    simulate: function(e, t, i) {
                        var n = E.extend(new E.Event, i, {
                            type: e,
                            isSimulated: !0
                        });
                        E.event.trigger(n, null, t)
                    }
                }), E.fn.extend({
                    trigger: function(e, t) {
                        return this.each((function() {
                            E.event.trigger(e, t, this)
                        }))
                    },
                    triggerHandler: function(e, t) {
                        var i = this[0];
                        if (i) return E.event.trigger(e, t, i, !0)
                    }
                }), m.focusin || E.each({
                    focus: "focusin",
                    blur: "focusout"
                }, (function(e, t) {
                    var i = function(e) {
                        E.event.simulate(t, e.target, E.event.fix(e))
                    };
                    E.event.special[t] = {
                        setup: function() {
                            var n = this.ownerDocument || this.document || this,
                                s = J.access(n, t);
                            s || n.addEventListener(e, i, !0), J.access(n, t, (s || 0) + 1)
                        },
                        teardown: function() {
                            var n = this.ownerDocument || this.document || this,
                                s = J.access(n, t) - 1;
                            s ? J.access(n, t, s) : (n.removeEventListener(e, i, !0), J.remove(n, t))
                        }
                    }
                }));
                var kt = n.location,
                    Nt = {
                        guid: Date.now()
                    },
                    St = /\?/;
                E.parseXML = function(e) {
                    var t;
                    if (!e || "string" != typeof e) return null;
                    try {
                        t = (new n.DOMParser).parseFromString(e, "text/xml")
                    } catch (e) {
                        t = void 0
                    }
                    return t && !t.getElementsByTagName("parsererror").length || E.error("Invalid XML: " + e), t
                };
                var Tt = /\[\]$/,
                    Pt = /\r?\n/g,
                    Dt = /^(?:submit|button|image|reset|file)$/i,
                    Ht = /^(?:input|select|textarea|keygen)/i;

                function zt(e, t, i, n) {
                    var s;
                    if (Array.isArray(t)) E.each(t, (function(t, s) {
                        i || Tt.test(e) ? n(e, s) : zt(e + "[" + ("object" == typeof s && null != s ? t : "") + "]", s, i, n)
                    }));
                    else if (i || "object" !== x(t)) n(e, t);
                    else
                        for (s in t) zt(e + "[" + s + "]", t[s], i, n)
                }
                E.param = function(e, t) {
                    var i, n = [],
                        s = function(e, t) {
                            var i = v(t) ? t() : t;
                            n[n.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == i ? "" : i)
                        };
                    if (null == e) return "";
                    if (Array.isArray(e) || e.jquery && !E.isPlainObject(e)) E.each(e, (function() {
                        s(this.name, this.value)
                    }));
                    else
                        for (i in e) zt(i, e[i], t, s);
                    return n.join("&")
                }, E.fn.extend({
                    serialize: function() {
                        return E.param(this.serializeArray())
                    },
                    serializeArray: function() {
                        return this.map((function() {
                            var e = E.prop(this, "elements");
                            return e ? E.makeArray(e) : this
                        })).filter((function() {
                            var e = this.type;
                            return this.name && !E(this).is(":disabled") && Ht.test(this.nodeName) && !Dt.test(e) && (this.checked || !me.test(e))
                        })).map((function(e, t) {
                            var i = E(this).val();
                            return null == i ? null : Array.isArray(i) ? E.map(i, (function(e) {
                                return {
                                    name: t.name,
                                    value: e.replace(Pt, "\r\n")
                                }
                            })) : {
                                name: t.name,
                                value: i.replace(Pt, "\r\n")
                            }
                        })).get()
                    }
                });
                var At = /%20/g,
                    Rt = /#.*$/,
                    Mt = /([?&])_=[^&]*/,
                    Ot = /^(.*?):[ \t]*([^\r\n]*)$/gm,
                    Lt = /^(?:GET|HEAD)$/,
                    jt = /^\/\//,
                    It = {},
                    Wt = {},
                    Ut = "*/".concat("*"),
                    qt = b.createElement("a");

                function Bt(e) {
                    return function(t, i) {
                        "string" != typeof t && (i = t, t = "*");
                        var n, s = 0,
                            o = t.toLowerCase().match(j) || [];
                        if (v(i))
                            for (; n = o[s++];) "+" === n[0] ? (n = n.slice(1) || "*", (e[n] = e[n] || []).unshift(i)) : (e[n] = e[n] || []).push(i)
                    }
                }

                function Ft(e, t, i, n) {
                    var s = {},
                        o = e === Wt;

                    function r(a) {
                        var l;
                        return s[a] = !0, E.each(e[a] || [], (function(e, a) {
                            var h = a(t, i, n);
                            return "string" != typeof h || o || s[h] ? o ? !(l = h) : void 0 : (t.dataTypes.unshift(h), r(h), !1)
                        })), l
                    }
                    return r(t.dataTypes[0]) || !s["*"] && r("*")
                }

                function $t(e, t) {
                    var i, n, s = E.ajaxSettings.flatOptions || {};
                    for (i in t) void 0 !== t[i] && ((s[i] ? e : n || (n = {}))[i] = t[i]);
                    return n && E.extend(!0, e, n), e
                }
                qt.href = kt.href, E.extend({
                    active: 0,
                    lastModified: {},
                    etag: {},
                    ajaxSettings: {
                        url: kt.href,
                        type: "GET",
                        isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(kt.protocol),
                        global: !0,
                        processData: !0,
                        async: !0,
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        accepts: {
                            "*": Ut,
                            text: "text/plain",
                            html: "text/html",
                            xml: "application/xml, text/xml",
                            json: "application/json, text/javascript"
                        },
                        contents: {
                            xml: /\bxml\b/,
                            html: /\bhtml/,
                            json: /\bjson\b/
                        },
                        responseFields: {
                            xml: "responseXML",
                            text: "responseText",
                            json: "responseJSON"
                        },
                        converters: {
                            "* text": String,
                            "text html": !0,
                            "text json": JSON.parse,
                            "text xml": E.parseXML
                        },
                        flatOptions: {
                            url: !0,
                            context: !0
                        }
                    },
                    ajaxSetup: function(e, t) {
                        return t ? $t($t(e, E.ajaxSettings), t) : $t(E.ajaxSettings, e)
                    },
                    ajaxPrefilter: Bt(It),
                    ajaxTransport: Bt(Wt),
                    ajax: function(e, t) {
                        "object" == typeof e && (t = e, e = void 0), t = t || {};
                        var i, s, o, r, a, l, h, u, c, d, p = E.ajaxSetup({}, t),
                            f = p.context || p,
                            g = p.context && (f.nodeType || f.jquery) ? E(f) : E.event,
                            m = E.Deferred(),
                            v = E.Callbacks("once memory"),
                            y = p.statusCode || {},
                            _ = {},
                            w = {},
                            x = "canceled",
                            C = {
                                readyState: 0,
                                getResponseHeader: function(e) {
                                    var t;
                                    if (h) {
                                        if (!r)
                                            for (r = {}; t = Ot.exec(o);) r[t[1].toLowerCase() + " "] = (r[t[1].toLowerCase() + " "] || []).concat(t[2]);
                                        t = r[e.toLowerCase() + " "]
                                    }
                                    return null == t ? null : t.join(", ")
                                },
                                getAllResponseHeaders: function() {
                                    return h ? o : null
                                },
                                setRequestHeader: function(e, t) {
                                    return null == h && (e = w[e.toLowerCase()] = w[e.toLowerCase()] || e, _[e] = t), this
                                },
                                overrideMimeType: function(e) {
                                    return null == h && (p.mimeType = e), this
                                },
                                statusCode: function(e) {
                                    var t;
                                    if (e)
                                        if (h) C.always(e[C.status]);
                                        else
                                            for (t in e) y[t] = [y[t], e[t]];
                                    return this
                                },
                                abort: function(e) {
                                    var t = e || x;
                                    return i && i.abort(t), k(0, t), this
                                }
                            };
                        if (m.promise(C), p.url = ((e || p.url || kt.href) + "").replace(jt, kt.protocol + "//"), p.type = t.method || t.type || p.method || p.type, p.dataTypes = (p.dataType || "*").toLowerCase().match(j) || [""], null == p.crossDomain) {
                            l = b.createElement("a");
                            try {
                                l.href = p.url, l.href = l.href, p.crossDomain = qt.protocol + "//" + qt.host != l.protocol + "//" + l.host
                            } catch (e) {
                                p.crossDomain = !0
                            }
                        }
                        if (p.data && p.processData && "string" != typeof p.data && (p.data = E.param(p.data, p.traditional)), Ft(It, p, t, C), h) return C;
                        for (c in (u = E.event && p.global) && 0 == E.active++ && E.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), p.hasContent = !Lt.test(p.type), s = p.url.replace(Rt, ""), p.hasContent ? p.data && p.processData && 0 === (p.contentType || "").indexOf("application/x-www-form-urlencoded") && (p.data = p.data.replace(At, "+")) : (d = p.url.slice(s.length), p.data && (p.processData || "string" == typeof p.data) && (s += (St.test(s) ? "&" : "?") + p.data, delete p.data), !1 === p.cache && (s = s.replace(Mt, "$1"), d = (St.test(s) ? "&" : "?") + "_=" + Nt.guid++ + d), p.url = s + d), p.ifModified && (E.lastModified[s] && C.setRequestHeader("If-Modified-Since", E.lastModified[s]), E.etag[s] && C.setRequestHeader("If-None-Match", E.etag[s])), (p.data && p.hasContent && !1 !== p.contentType || t.contentType) && C.setRequestHeader("Content-Type", p.contentType), C.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + Ut + "; q=0.01" : "") : p.accepts["*"]), p.headers) C.setRequestHeader(c, p.headers[c]);
                        if (p.beforeSend && (!1 === p.beforeSend.call(f, C, p) || h)) return C.abort();
                        if (x = "abort", v.add(p.complete), C.done(p.success), C.fail(p.error), i = Ft(Wt, p, t, C)) {
                            if (C.readyState = 1, u && g.trigger("ajaxSend", [C, p]), h) return C;
                            p.async && p.timeout > 0 && (a = n.setTimeout((function() {
                                C.abort("timeout")
                            }), p.timeout));
                            try {
                                h = !1, i.send(_, k)
                            } catch (e) {
                                if (h) throw e;
                                k(-1, e)
                            }
                        } else k(-1, "No Transport");

                        function k(e, t, r, l) {
                            var c, d, b, _, w, x = t;
                            h || (h = !0, a && n.clearTimeout(a), i = void 0, o = l || "", C.readyState = e > 0 ? 4 : 0, c = e >= 200 && e < 300 || 304 === e, r && (_ = function(e, t, i) {
                                for (var n, s, o, r, a = e.contents, l = e.dataTypes;
                                    "*" === l[0];) l.shift(), void 0 === n && (n = e.mimeType || t.getResponseHeader("Content-Type"));
                                if (n)
                                    for (s in a)
                                        if (a[s] && a[s].test(n)) {
                                            l.unshift(s);
                                            break
                                        } if (l[0] in i) o = l[0];
                                else {
                                    for (s in i) {
                                        if (!l[0] || e.converters[s + " " + l[0]]) {
                                            o = s;
                                            break
                                        }
                                        r || (r = s)
                                    }
                                    o = o || r
                                }
                                if (o) return o !== l[0] && l.unshift(o), i[o]
                            }(p, C, r)), !c && E.inArray("script", p.dataTypes) > -1 && (p.converters["text script"] = function() {}), _ = function(e, t, i, n) {
                                var s, o, r, a, l, h = {},
                                    u = e.dataTypes.slice();
                                if (u[1])
                                    for (r in e.converters) h[r.toLowerCase()] = e.converters[r];
                                for (o = u.shift(); o;)
                                    if (e.responseFields[o] && (i[e.responseFields[o]] = t), !l && n && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = o, o = u.shift())
                                        if ("*" === o) o = l;
                                        else if ("*" !== l && l !== o) {
                                    if (!(r = h[l + " " + o] || h["* " + o]))
                                        for (s in h)
                                            if ((a = s.split(" "))[1] === o && (r = h[l + " " + a[0]] || h["* " + a[0]])) {
                                                !0 === r ? r = h[s] : !0 !== h[s] && (o = a[0], u.unshift(a[1]));
                                                break
                                            } if (!0 !== r)
                                        if (r && e.throws) t = r(t);
                                        else try {
                                            t = r(t)
                                        } catch (e) {
                                            return {
                                                state: "parsererror",
                                                error: r ? e : "No conversion from " + l + " to " + o
                                            }
                                        }
                                }
                                return {
                                    state: "success",
                                    data: t
                                }
                            }(p, _, C, c), c ? (p.ifModified && ((w = C.getResponseHeader("Last-Modified")) && (E.lastModified[s] = w), (w = C.getResponseHeader("etag")) && (E.etag[s] = w)), 204 === e || "HEAD" === p.type ? x = "nocontent" : 304 === e ? x = "notmodified" : (x = _.state, d = _.data, c = !(b = _.error))) : (b = x, !e && x || (x = "error", e < 0 && (e = 0))), C.status = e, C.statusText = (t || x) + "", c ? m.resolveWith(f, [d, x, C]) : m.rejectWith(f, [C, x, b]), C.statusCode(y), y = void 0, u && g.trigger(c ? "ajaxSuccess" : "ajaxError", [C, p, c ? d : b]), v.fireWith(f, [C, x]), u && (g.trigger("ajaxComplete", [C, p]), --E.active || E.event.trigger("ajaxStop")))
                        }
                        return C
                    },
                    getJSON: function(e, t, i) {
                        return E.get(e, t, i, "json")
                    },
                    getScript: function(e, t) {
                        return E.get(e, void 0, t, "script")
                    }
                }), E.each(["get", "post"], (function(e, t) {
                    E[t] = function(e, i, n, s) {
                        return v(i) && (s = s || n, n = i, i = void 0), E.ajax(E.extend({
                            url: e,
                            type: t,
                            dataType: s,
                            data: i,
                            success: n
                        }, E.isPlainObject(e) && e))
                    }
                })), E.ajaxPrefilter((function(e) {
                    var t;
                    for (t in e.headers) "content-type" === t.toLowerCase() && (e.contentType = e.headers[t] || "")
                })), E._evalUrl = function(e, t, i) {
                    return E.ajax({
                        url: e,
                        type: "GET",
                        dataType: "script",
                        cache: !0,
                        async: !1,
                        global: !1,
                        converters: {
                            "text script": function() {}
                        },
                        dataFilter: function(e) {
                            E.globalEval(e, t, i)
                        }
                    })
                }, E.fn.extend({
                    wrapAll: function(e) {
                        var t;
                        return this[0] && (v(e) && (e = e.call(this[0])), t = E(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map((function() {
                            for (var e = this; e.firstElementChild;) e = e.firstElementChild;
                            return e
                        })).append(this)), this
                    },
                    wrapInner: function(e) {
                        return v(e) ? this.each((function(t) {
                            E(this).wrapInner(e.call(this, t))
                        })) : this.each((function() {
                            var t = E(this),
                                i = t.contents();
                            i.length ? i.wrapAll(e) : t.append(e)
                        }))
                    },
                    wrap: function(e) {
                        var t = v(e);
                        return this.each((function(i) {
                            E(this).wrapAll(t ? e.call(this, i) : e)
                        }))
                    },
                    unwrap: function(e) {
                        return this.parent(e).not("body").each((function() {
                            E(this).replaceWith(this.childNodes)
                        })), this
                    }
                }), E.expr.pseudos.hidden = function(e) {
                    return !E.expr.pseudos.visible(e)
                }, E.expr.pseudos.visible = function(e) {
                    return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
                }, E.ajaxSettings.xhr = function() {
                    try {
                        return new n.XMLHttpRequest
                    } catch (e) {}
                };
                var Gt = {
                        0: 200,
                        1223: 204
                    },
                    Xt = E.ajaxSettings.xhr();
                m.cors = !!Xt && "withCredentials" in Xt, m.ajax = Xt = !!Xt, E.ajaxTransport((function(e) {
                    var t, i;
                    if (m.cors || Xt && !e.crossDomain) return {
                        send: function(s, o) {
                            var r, a = e.xhr();
                            if (a.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)
                                for (r in e.xhrFields) a[r] = e.xhrFields[r];
                            for (r in e.mimeType && a.overrideMimeType && a.overrideMimeType(e.mimeType), e.crossDomain || s["X-Requested-With"] || (s["X-Requested-With"] = "XMLHttpRequest"), s) a.setRequestHeader(r, s[r]);
                            t = function(e) {
                                return function() {
                                    t && (t = i = a.onload = a.onerror = a.onabort = a.ontimeout = a.onreadystatechange = null, "abort" === e ? a.abort() : "error" === e ? "number" != typeof a.status ? o(0, "error") : o(a.status, a.statusText) : o(Gt[a.status] || a.status, a.statusText, "text" !== (a.responseType || "text") || "string" != typeof a.responseText ? {
                                        binary: a.response
                                    } : {
                                        text: a.responseText
                                    }, a.getAllResponseHeaders()))
                                }
                            }, a.onload = t(), i = a.onerror = a.ontimeout = t("error"), void 0 !== a.onabort ? a.onabort = i : a.onreadystatechange = function() {
                                4 === a.readyState && n.setTimeout((function() {
                                    t && i()
                                }))
                            }, t = t("abort");
                            try {
                                a.send(e.hasContent && e.data || null)
                            } catch (e) {
                                if (t) throw e
                            }
                        },
                        abort: function() {
                            t && t()
                        }
                    }
                })), E.ajaxPrefilter((function(e) {
                    e.crossDomain && (e.contents.script = !1)
                })), E.ajaxSetup({
                    accepts: {
                        script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                    },
                    contents: {
                        script: /\b(?:java|ecma)script\b/
                    },
                    converters: {
                        "text script": function(e) {
                            return E.globalEval(e), e
                        }
                    }
                }), E.ajaxPrefilter("script", (function(e) {
                    void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
                })), E.ajaxTransport("script", (function(e) {
                    var t, i;
                    if (e.crossDomain || e.scriptAttrs) return {
                        send: function(n, s) {
                            t = E("<script>").attr(e.scriptAttrs || {}).prop({
                                charset: e.scriptCharset,
                                src: e.url
                            }).on("load error", i = function(e) {
                                t.remove(), i = null, e && s("error" === e.type ? 404 : 200, e.type)
                            }), b.head.appendChild(t[0])
                        },
                        abort: function() {
                            i && i()
                        }
                    }
                }));
                var Yt, Vt = [],
                    Kt = /(=)\?(?=&|$)|\?\?/;
                E.ajaxSetup({
                    jsonp: "callback",
                    jsonpCallback: function() {
                        var e = Vt.pop() || E.expando + "_" + Nt.guid++;
                        return this[e] = !0, e
                    }
                }), E.ajaxPrefilter("json jsonp", (function(e, t, i) {
                    var s, o, r, a = !1 !== e.jsonp && (Kt.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && Kt.test(e.data) && "data");
                    if (a || "jsonp" === e.dataTypes[0]) return s = e.jsonpCallback = v(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, a ? e[a] = e[a].replace(Kt, "$1" + s) : !1 !== e.jsonp && (e.url += (St.test(e.url) ? "&" : "?") + e.jsonp + "=" + s), e.converters["script json"] = function() {
                        return r || E.error(s + " was not called"), r[0]
                    }, e.dataTypes[0] = "json", o = n[s], n[s] = function() {
                        r = arguments
                    }, i.always((function() {
                        void 0 === o ? E(n).removeProp(s) : n[s] = o, e[s] && (e.jsonpCallback = t.jsonpCallback, Vt.push(s)), r && v(o) && o(r[0]), r = o = void 0
                    })), "script"
                })), m.createHTMLDocument = ((Yt = b.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 2 === Yt.childNodes.length), E.parseHTML = function(e, t, i) {
                    return "string" != typeof e ? [] : ("boolean" == typeof t && (i = t, t = !1), t || (m.createHTMLDocument ? ((n = (t = b.implementation.createHTMLDocument("")).createElement("base")).href = b.location.href, t.head.appendChild(n)) : t = b), o = !i && [], (s = H.exec(e)) ? [t.createElement(s[1])] : (s = Ce([e], t, o), o && o.length && E(o).remove(), E.merge([], s.childNodes)));
                    var n, s, o
                }, E.fn.load = function(e, t, i) {
                    var n, s, o, r = this,
                        a = e.indexOf(" ");
                    return a > -1 && (n = bt(e.slice(a)), e = e.slice(0, a)), v(t) ? (i = t, t = void 0) : t && "object" == typeof t && (s = "POST"), r.length > 0 && E.ajax({
                        url: e,
                        type: s || "GET",
                        dataType: "html",
                        data: t
                    }).done((function(e) {
                        o = arguments, r.html(n ? E("<div>").append(E.parseHTML(e)).find(n) : e)
                    })).always(i && function(e, t) {
                        r.each((function() {
                            i.apply(this, o || [e.responseText, t, e])
                        }))
                    }), this
                }, E.expr.pseudos.animated = function(e) {
                    return E.grep(E.timers, (function(t) {
                        return e === t.elem
                    })).length
                }, E.offset = {
                    setOffset: function(e, t, i) {
                        var n, s, o, r, a, l, h = E.css(e, "position"),
                            u = E(e),
                            c = {};
                        "static" === h && (e.style.position = "relative"), a = u.offset(), o = E.css(e, "top"), l = E.css(e, "left"), ("absolute" === h || "fixed" === h) && (o + l).indexOf("auto") > -1 ? (r = (n = u.position()).top, s = n.left) : (r = parseFloat(o) || 0, s = parseFloat(l) || 0), v(t) && (t = t.call(e, i, E.extend({}, a))), null != t.top && (c.top = t.top - a.top + r), null != t.left && (c.left = t.left - a.left + s), "using" in t ? t.using.call(e, c) : ("number" == typeof c.top && (c.top += "px"), "number" == typeof c.left && (c.left += "px"), u.css(c))
                    }
                }, E.fn.extend({
                    offset: function(e) {
                        if (arguments.length) return void 0 === e ? this : this.each((function(t) {
                            E.offset.setOffset(this, e, t)
                        }));
                        var t, i, n = this[0];
                        return n ? n.getClientRects().length ? (t = n.getBoundingClientRect(), i = n.ownerDocument.defaultView, {
                            top: t.top + i.pageYOffset,
                            left: t.left + i.pageXOffset
                        }) : {
                            top: 0,
                            left: 0
                        } : void 0
                    },
                    position: function() {
                        if (this[0]) {
                            var e, t, i, n = this[0],
                                s = {
                                    top: 0,
                                    left: 0
                                };
                            if ("fixed" === E.css(n, "position")) t = n.getBoundingClientRect();
                            else {
                                for (t = this.offset(), i = n.ownerDocument, e = n.offsetParent || i.documentElement; e && (e === i.body || e === i.documentElement) && "static" === E.css(e, "position");) e = e.parentNode;
                                e && e !== n && 1 === e.nodeType && ((s = E(e).offset()).top += E.css(e, "borderTopWidth", !0), s.left += E.css(e, "borderLeftWidth", !0))
                            }
                            return {
                                top: t.top - s.top - E.css(n, "marginTop", !0),
                                left: t.left - s.left - E.css(n, "marginLeft", !0)
                            }
                        }
                    },
                    offsetParent: function() {
                        return this.map((function() {
                            for (var e = this.offsetParent; e && "static" === E.css(e, "position");) e = e.offsetParent;
                            return e || re
                        }))
                    }
                }), E.each({
                    scrollLeft: "pageXOffset",
                    scrollTop: "pageYOffset"
                }, (function(e, t) {
                    var i = "pageYOffset" === t;
                    E.fn[e] = function(n) {
                        return $(this, (function(e, n, s) {
                            var o;
                            if (y(e) ? o = e : 9 === e.nodeType && (o = e.defaultView), void 0 === s) return o ? o[t] : e[n];
                            o ? o.scrollTo(i ? o.pageXOffset : s, i ? s : o.pageYOffset) : e[n] = s
                        }), e, n, arguments.length)
                    }
                })), E.each(["top", "left"], (function(e, t) {
                    E.cssHooks[t] = Xe(m.pixelPosition, (function(e, i) {
                        if (i) return i = Ge(e, t), qe.test(i) ? E(e).position()[t] + "px" : i
                    }))
                })), E.each({
                    Height: "height",
                    Width: "width"
                }, (function(e, t) {
                    E.each({
                        padding: "inner" + e,
                        content: t,
                        "": "outer" + e
                    }, (function(i, n) {
                        E.fn[n] = function(s, o) {
                            var r = arguments.length && (i || "boolean" != typeof s),
                                a = i || (!0 === s || !0 === o ? "margin" : "border");
                            return $(this, (function(t, i, s) {
                                var o;
                                return y(t) ? 0 === n.indexOf("outer") ? t["inner" + e] : t.document.documentElement["client" + e] : 9 === t.nodeType ? (o = t.documentElement, Math.max(t.body["scroll" + e], o["scroll" + e], t.body["offset" + e], o["offset" + e], o["client" + e])) : void 0 === s ? E.css(t, i, a) : E.style(t, i, s, a)
                            }), t, r ? s : void 0, r)
                        }
                    }))
                })), E.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], (function(e, t) {
                    E.fn[t] = function(e) {
                        return this.on(t, e)
                    }
                })), E.fn.extend({
                    bind: function(e, t, i) {
                        return this.on(e, null, t, i)
                    },
                    unbind: function(e, t) {
                        return this.off(e, null, t)
                    },
                    delegate: function(e, t, i, n) {
                        return this.on(t, e, i, n)
                    },
                    undelegate: function(e, t, i) {
                        return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", i)
                    },
                    hover: function(e, t) {
                        return this.mouseenter(e).mouseleave(t || e)
                    }
                }), E.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), (function(e, t) {
                    E.fn[t] = function(e, i) {
                        return arguments.length > 0 ? this.on(t, null, e, i) : this.trigger(t)
                    }
                }));
                var Qt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
                E.proxy = function(e, t) {
                    var i, n, s;
                    if ("string" == typeof t && (i = e[t], t = e, e = i), v(e)) return n = a.call(arguments, 2), (s = function() {
                        return e.apply(t || this, n.concat(a.call(arguments)))
                    }).guid = e.guid = e.guid || E.guid++, s
                }, E.holdReady = function(e) {
                    e ? E.readyWait++ : E.ready(!0)
                }, E.isArray = Array.isArray, E.parseJSON = JSON.parse, E.nodeName = D, E.isFunction = v, E.isWindow = y, E.camelCase = V, E.type = x, E.now = Date.now, E.isNumeric = function(e) {
                    var t = E.type(e);
                    return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
                }, E.trim = function(e) {
                    return null == e ? "" : (e + "").replace(Qt, "")
                }, void 0 === (i = function() {
                    return E
                }.apply(t, [])) || (e.exports = i);
                var Jt = n.jQuery,
                    Zt = n.$;
                return E.noConflict = function(e) {
                    return n.$ === E && (n.$ = Zt), e && n.jQuery === E && (n.jQuery = Jt), E
                }, n.jQuery = n.$ = E, E
            }))
        },
        949: (e, t, i) => {
            var n, s, o;
            s = [i(28), i(87)], void 0 === (o = "function" == typeof(n = function(e) {
                if (e.support.mspointer = window.navigator.msPointerEnabled, e.support.touch = "ontouchstart" in document || "ontouchstart" in window || window.TouchEvent || window.DocumentTouch && document instanceof DocumentTouch || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0, (e.support.touch || e.support.mspointer) && e.ui.mouse) {
                    var t, i = e.ui.mouse.prototype,
                        n = i._mouseInit,
                        s = i._mouseDestroy;
                    i._touchStart = function(e) {
                        var i = this;
                        this._startedMove = e.timeStamp, i._startPos = o(e), !t && i._mouseCapture(e.originalEvent.changedTouches[0]) && (t = !0, i._touchMoved = !1, r(e, "mouseover"), r(e, "mousemove"), r(e, "mousedown"))
                    }, i._touchMove = function(e) {
                        t && (this._touchMoved = !0, r(e, "mousemove"))
                    }, i._touchEnd = function(e) {
                        if (t) {
                            r(e, "mouseup"), r(e, "mouseout");
                            var i = e.timeStamp - this._startedMove;
                            if (!this._touchMoved || i < 500) r(e, "click");
                            else {
                                var n = o(e);
                                Math.abs(n.x - this._startPos.x) < 10 && Math.abs(n.y - this._startPos.y) < 10 && (this._touchMoved && "stylus" !== e.originalEvent.changedTouches[0].touchType || r(e, "click"))
                            }
                            this._touchMoved = !1, t = !1
                        }
                    }, i._mouseInit = function() {
                        var t = this;
                        e.support.mspointer && (t.element[0].style.msTouchAction = "none"), t.element.on({
                            touchstart: e.proxy(t, "_touchStart"),
                            touchmove: e.proxy(t, "_touchMove"),
                            touchend: e.proxy(t, "_touchEnd")
                        }), n.call(t)
                    }, i._mouseDestroy = function() {
                        var t = this;
                        t.element.off({
                            touchstart: e.proxy(t, "_touchStart"),
                            touchmove: e.proxy(t, "_touchMove"),
                            touchend: e.proxy(t, "_touchEnd")
                        }), s.call(t)
                    }
                }

                function o(e) {
                    return {
                        x: e.originalEvent.changedTouches[0].pageX,
                        y: e.originalEvent.changedTouches[0].pageY
                    }
                }

                function r(e, t) {
                    if (!(e.originalEvent.touches.length > 1)) {
                        e.cancelable && e.preventDefault();
                        var i = e.originalEvent.changedTouches[0],
                            n = document.createEvent("MouseEvents");
                        n.initMouseEvent(t, !0, !0, window, 1, i.screenX, i.screenY, i.clientX, i.clientY, !1, !1, !1, !1, 0, null), e.target.dispatchEvent(n)
                    }
                }
            }) ? n.apply(t, s) : n) || (e.exports = o)
        }
    }, t = {}, function i(n) {
        if (t[n]) return t[n].exports;
        var s = t[n] = {
            exports: {}
        };
        return e[n].call(s.exports, s, s.exports, i), s.exports
    }(572)).GridStack;
    var e, t
}));
//# sourceMappingURL=gridstack-jq.js.map