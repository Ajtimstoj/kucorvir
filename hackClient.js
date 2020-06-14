var $jscomp = $jscomp || {};
$jscomp.scope = {}, $jscomp.ASSUME_ES5 = !1, $jscomp.ASSUME_NO_NATIVE_MAP = !1, $jscomp.ASSUME_NO_NATIVE_SET = !1, $jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(t, e, i) {
        t != Array.prototype && t != Object.prototype && (t[e] = i.value)
    }, $jscomp.getGlobal = function(t) {
        return "undefined" != typeof window && window === t ? t : "undefined" != typeof global && null != global ? global : t
    }, $jscomp.global = $jscomp.getGlobal(this), $jscomp.SYMBOL_PREFIX = "jscomp_symbol_", $jscomp.initSymbol = function() {
        $jscomp.initSymbol = function() {}, $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
    }, $jscomp.Symbol = function() {
        var t = 0;
        return function(e) {
            return $jscomp.SYMBOL_PREFIX + (e || "") + t++
        }
    }(), $jscomp.initSymbolIterator = function() {
        $jscomp.initSymbol();
        var t = $jscomp.global.Symbol.iterator;
        t || (t = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator")), "function" != typeof Array.prototype[t] && $jscomp.defineProperty(Array.prototype, t, {
            configurable: !0,
            writable: !0,
            value: function() {
                return $jscomp.arrayIterator(this)
            }
        }), $jscomp.initSymbolIterator = function() {}
    }, $jscomp.initSymbolAsyncIterator = function() {
        $jscomp.initSymbol();
        var t = $jscomp.global.Symbol.asyncIterator;
        t || (t = $jscomp.global.Symbol.asyncIterator = $jscomp.global.Symbol("asyncIterator")), $jscomp.initSymbolAsyncIterator = function() {}
    }, $jscomp.arrayIterator = function(t) {
        var e = 0;
        return $jscomp.iteratorPrototype(function() {
            return e < t.length ? {
                done: !1,
                value: t[e++]
            } : {
                done: !0
            }
        })
    }, $jscomp.iteratorPrototype = function(t) {
        return $jscomp.initSymbolIterator(), (t = {
            next: t
        })[$jscomp.global.Symbol.iterator] = function() {
            return this
        }, t
    }, $jscomp.polyfill = function(t, e, i, n) {
        if (e) {
            for (i = $jscomp.global, t = t.split("."), n = 0; n < t.length - 1; n++) {
                var r = t[n];
                r in i || (i[r] = {}), i = i[r]
            }(e = e(n = i[t = t[t.length - 1]])) != n && null != e && $jscomp.defineProperty(i, t, {
                configurable: !0,
                writable: !0,
                value: e
            })
        }
    }, $jscomp.polyfill("Array.prototype.fill", function(t) {
        return t || function(t, e, i) {
            var n = this.length || 0;
            for (0 > e && (e = Math.max(0, n + e)), (null == i || i > n) && (i = n), 0 > (i = Number(i)) && (i = Math.max(0, n + i)), e = Number(e || 0); e < i; e++) this[e] = t;
            return this
        }
    }, "es6", "es3"), $jscomp.iteratorFromArray = function(t, e) {
        $jscomp.initSymbolIterator(), t instanceof String && (t += "");
        var i = 0,
            n = {
                next: function() {
                    if (i < t.length) {
                        var r = i++;
                        return {
                            value: e(r, t[r]),
                            done: !1
                        }
                    }
                    return n.next = function() {
                        return {
                            done: !0,
                            value: void 0
                        }
                    }, n.next()
                }
            };
        return n[Symbol.iterator] = function() {
            return n
        }, n
    }, $jscomp.polyfill("Array.prototype.keys", function(t) {
        return t || function() {
            return $jscomp.iteratorFromArray(this, function(t) {
                return t
            })
        }
    }, "es6", "es3"), $jscomp.polyfill("Array.prototype.values", function(t) {
        return t || function() {
            return $jscomp.iteratorFromArray(this, function(t, e) {
                return e
            })
        }
    }, "es8", "es3"),
    function t(e, i, n) {
        function r(a, o) {
            if (!i[a]) {
                if (!e[a]) {
                    var l = "function" == typeof require && require;
                    if (!o && l) return l(a, !0);
                    if (s) return s(a, !0);
                    throw (o = Error("Cannot find module '" + a + "'")).code = "MODULE_NOT_FOUND", o
                }
                o = i[a] = {
                    exports: {}
                }, e[a][0].call(o.exports, function(t) {
                    var i = e[a][1][t];
                    return r(i || t)
                }, o, o.exports, t, e, i, n)
            }
            return i[a].exports
        }
        for (var s = "function" == typeof require && require, a = 0; a < n.length; a++) r(n[a]);
        return r
    }({
        1: [function(t, e, i) {
            function n(t) {
                var e = t.length;
                if (0 < e % 4) throw Error("Invalid string. Length must be a multiple of 4");
                return -1 === (t = t.indexOf("=")) && (t = e), [t, t === e ? 0 : 4 - t % 4]
            }

            function r(t, e, i) {
                for (var n = [], r = e; r < i; r += 3) e = (t[r] << 16 & 16711680) + (t[r + 1] << 8 & 65280) + (255 & t[r + 2]), n.push(s[e >> 18 & 63] + s[e >> 12 & 63] + s[e >> 6 & 63] + s[63 & e]);
                return n.join("")
            }
            i.byteLength = function(t) {
                var e = (t = n(t))[1];
                return 3 * (t[0] + e) / 4 - e
            }, i.toByteArray = function(t) {
                var e = n(t),
                    i = e[0];
                e = e[1];
                for (var r = new o(3 * (i + e) / 4 - e), s = 0, l = 0 < e ? i - 4 : i, h = 0; h < l; h += 4) i = a[t.charCodeAt(h)] << 18 | a[t.charCodeAt(h + 1)] << 12 | a[t.charCodeAt(h + 2)] << 6 | a[t.charCodeAt(h + 3)], r[s++] = i >> 16 & 255, r[s++] = i >> 8 & 255, r[s++] = 255 & i;
                return 2 === e && (i = a[t.charCodeAt(h)] << 2 | a[t.charCodeAt(h + 1)] >> 4, r[s++] = 255 & i), 1 === e && (i = a[t.charCodeAt(h)] << 10 | a[t.charCodeAt(h + 1)] << 4 | a[t.charCodeAt(h + 2)] >> 2, r[s++] = i >> 8 & 255, r[s++] = 255 & i), r
            }, i.fromByteArray = function(t) {
                for (var e = t.length, i = e % 3, n = [], a = 0, o = e - i; a < o; a += 16383) n.push(r(t, a, a + 16383 > o ? o : a + 16383));
                return 1 === i ? (t = t[e - 1], n.push(s[t >> 2] + s[t << 4 & 63] + "==")) : 2 === i && (t = (t[e - 2] << 8) + t[e - 1], n.push(s[t >> 10] + s[t >> 4 & 63] + s[t << 2 & 63] + "=")), n.join("")
            };
            var s = [],
                a = [],
                o = "undefined" != typeof Uint8Array ? Uint8Array : Array;
            for (t = 0; 64 > t; ++t) s[t] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" [t], a["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charCodeAt(t)] = t;
            a[45] = 62, a[95] = 63
        }, {}],
        2: [function(t, e, i) {}, {}],
        3: [function(t, e, i) {
            (function(e) {
                function n(t, e) {
                    if ((r.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823) < e) throw new RangeError("Invalid typed array length");
                    return r.TYPED_ARRAY_SUPPORT ? (t = new Uint8Array(e)).__proto__ = r.prototype : (null === t && (t = new r(e)), t.length = e), t
                }

                function r(t, e, i) {
                    if (!(r.TYPED_ARRAY_SUPPORT || this instanceof r)) return new r(t, e, i);
                    if ("number" == typeof t) {
                        if ("string" == typeof e) throw Error("If encoding is specified then the first argument must be a string");
                        return o(this, t)
                    }
                    return s(this, t, e, i)
                }

                function s(t, e, i, s) {
                    if ("number" == typeof e) throw new TypeError('"value" argument must not be a number');
                    if ("undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer) {
                        if (e.byteLength, 0 > i || e.byteLength < i) throw new RangeError("'offset' is out of bounds");
                        if (e.byteLength < i + (s || 0)) throw new RangeError("'length' is out of bounds");
                        return e = void 0 === i && void 0 === s ? new Uint8Array(e) : void 0 === s ? new Uint8Array(e, i) : new Uint8Array(e, i, s), r.TYPED_ARRAY_SUPPORT ? (t = e).__proto__ = r.prototype : t = l(t, e), t
                    }
                    if ("string" == typeof e) {
                        if (s = t, "string" == typeof(t = i) && "" !== t || (t = "utf8"), !r.isEncoding(t)) throw new TypeError('"encoding" must be a valid string encoding');
                        return (e = (s = n(s, i = 0 | u(e, t))).write(e, t)) !== i && (s = s.slice(0, e)), s
                    }
                    return h(t, e)
                }

                function a(t) {
                    if ("number" != typeof t) throw new TypeError('"size" argument must be a number');
                    if (0 > t) throw new RangeError('"size" argument must not be negative')
                }

                function o(t, e) {
                    if (a(e), t = n(t, 0 > e ? 0 : 0 | c(e)), !r.TYPED_ARRAY_SUPPORT)
                        for (var i = 0; i < e; ++i) t[i] = 0;
                    return t
                }

                function l(t, e) {
                    var i = 0 > e.length ? 0 : 0 | c(e.length);
                    t = n(t, i);
                    for (var r = 0; r < i; r += 1) t[r] = 255 & e[r];
                    return t
                }

                function h(t, e) {
                    if (r.isBuffer(e)) {
                        var i = 0 | c(e.length);
                        return 0 === (t = n(t, i)).length ? t : (e.copy(t, 0, 0, i), t)
                    }
                    if (e) {
                        if ("undefined" != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer || "length" in e) return (i = "number" != typeof e.length) || (i = (i = e.length) != i), i ? n(t, 0) : l(t, e);
                        if ("Buffer" === e.type && L(e.data)) return l(t, e.data)
                    }
                    throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
                }

                function c(t) {
                    if (t >= (r.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823)) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + (r.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823).toString(16) + " bytes");
                    return 0 | t
                }

                function u(t, e) {
                    if (r.isBuffer(t)) return t.length;
                    if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)) return t.byteLength;
                    "string" != typeof t && (t = "" + t);
                    var i = t.length;
                    if (0 === i) return 0;
                    for (var n = !1;;) switch (e) {
                        case "ascii":
                        case "latin1":
                        case "binary":
                            return i;
                        case "utf8":
                        case "utf-8":
                        case void 0:
                            return k(t).length;
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return 2 * i;
                        case "hex":
                            return i >>> 1;
                        case "base64":
                            return M.toByteArray(T(t)).length;
                        default:
                            if (n) return k(t).length;
                            e = ("" + e).toLowerCase(), n = !0
                    }
                }

                function p(t, e, i) {
                    var n = t[e];
                    t[e] = t[i], t[i] = n
                }

                function d(t, e, i, n, s) {
                    if (0 === t.length) return -1;
                    if ("string" == typeof i ? (n = i, i = 0) : 2147483647 < i ? i = 2147483647 : -2147483648 > i && (i = -2147483648), i = +i, isNaN(i) && (i = s ? 0 : t.length - 1), 0 > i && (i = t.length + i), i >= t.length) {
                        if (s) return -1;
                        i = t.length - 1
                    } else if (0 > i) {
                        if (!s) return -1;
                        i = 0
                    }
                    if ("string" == typeof e && (e = r.from(e, n)), r.isBuffer(e)) return 0 === e.length ? -1 : f(t, e, i, n, s);
                    if ("number" == typeof e) return e &= 255, r.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? s ? Uint8Array.prototype.indexOf.call(t, e, i) : Uint8Array.prototype.lastIndexOf.call(t, e, i) : f(t, [e], i, n, s);
                    throw new TypeError("val must be string, number or Buffer")
                }

                function f(t, e, i, n, r) {
                    function s(t, e) {
                        return 1 === a ? t[e] : t.readUInt16BE(e * a)
                    }
                    var a = 1,
                        o = t.length,
                        l = e.length;
                    if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
                        if (2 > t.length || 2 > e.length) return -1;
                        a = 2, o /= 2, l /= 2, i /= 2
                    }
                    if (r)
                        for (n = -1; i < o; i++)
                            if (s(t, i) === s(e, -1 === n ? 0 : i - n)) {
                                if (-1 === n && (n = i), i - n + 1 === l) return n * a
                            } else -1 !== n && (i -= i - n), n = -1;
                    else
                        for (i + l > o && (i = o - l); 0 <= i; i--) {
                            for (o = !0, n = 0; n < l; n++)
                                if (s(t, i + n) !== s(e, n)) {
                                    o = !1;
                                    break
                                } if (o) return i
                        }
                    return -1
                }

                function m(t, e, i) {
                    i = Math.min(t.length, i);
                    for (var n = []; e < i;) {
                        var r = t[e],
                            s = null,
                            a = 239 < r ? 4 : 223 < r ? 3 : 191 < r ? 2 : 1;
                        if (e + a <= i) switch (a) {
                            case 1:
                                128 > r && (s = r);
                                break;
                            case 2:
                                var o = t[e + 1];
                                128 == (192 & o) && 127 < (r = (31 & r) << 6 | 63 & o) && (s = r);
                                break;
                            case 3:
                                o = t[e + 1];
                                var l = t[e + 2];
                                128 == (192 & o) && 128 == (192 & l) && 2047 < (r = (15 & r) << 12 | (63 & o) << 6 | 63 & l) && (55296 > r || 57343 < r) && (s = r);
                                break;
                            case 4:
                                o = t[e + 1], l = t[e + 2];
                                var h = t[e + 3];
                                128 == (192 & o) && 128 == (192 & l) && 128 == (192 & h) && 65535 < (r = (15 & r) << 18 | (63 & o) << 12 | (63 & l) << 6 | 63 & h) && 1114112 > r && (s = r)
                        }
                        null === s ? (s = 65533, a = 1) : 65535 < s && (s -= 65536, n.push(s >>> 10 & 1023 | 55296), s = 56320 | 1023 & s), n.push(s), e += a
                    }
                    if ((t = n.length) <= A) n = String.fromCharCode.apply(String, n);
                    else {
                        for (i = "", e = 0; e < t;) i += String.fromCharCode.apply(String, n.slice(e, e += A));
                        n = i
                    }
                    return n
                }

                function g(t, e, i) {
                    if (0 != t % 1 || 0 > t) throw new RangeError("offset is not uint");
                    if (t + e > i) throw new RangeError("Trying to access beyond buffer length")
                }

                function v(t, e, i, n, s, a) {
                    if (!r.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
                    if (e > s || e < a) throw new RangeError('"value" argument is out of bounds');
                    if (i + n > t.length) throw new RangeError("Index out of range")
                }

                function y(t, e, i, n) {
                    0 > e && (e = 65535 + e + 1);
                    for (var r = 0, s = Math.min(t.length - i, 2); r < s; ++r) t[i + r] = (e & 255 << 8 * (n ? r : 1 - r)) >>> 8 * (n ? r : 1 - r)
                }

                function x(t, e, i, n) {
                    0 > e && (e = 4294967295 + e + 1);
                    for (var r = 0, s = Math.min(t.length - i, 4); r < s; ++r) t[i + r] = e >>> 8 * (n ? r : 3 - r) & 255
                }

                function b(t, e, i, n, r, s) {
                    if (i + n > t.length) throw new RangeError("Index out of range");
                    if (0 > i) throw new RangeError("Index out of range")
                }

                function w(t, e, i, n, r) {
                    return r || b(t, 0, i, 4), P.write(t, e, i, n, 23, 4), i + 4
                }

                function S(t, e, i, n, r) {
                    return r || b(t, 0, i, 8), P.write(t, e, i, n, 52, 8), i + 8
                }

                function T(t) {
                    if (2 > (t = (t = t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")).replace(R, "")).length) return "";
                    for (; 0 != t.length % 4;) t += "=";
                    return t
                }

                function k(t, e) {
                    e = e || 1 / 0;
                    for (var i, n = t.length, r = null, s = [], a = 0; a < n; ++a) {
                        if (55295 < (i = t.charCodeAt(a)) && 57344 > i) {
                            if (!r) {
                                if (56319 < i) {
                                    -1 < (e -= 3) && s.push(239, 191, 189);
                                    continue
                                }
                                if (a + 1 === n) {
                                    -1 < (e -= 3) && s.push(239, 191, 189);
                                    continue
                                }
                                r = i;
                                continue
                            }
                            if (56320 > i) {
                                -1 < (e -= 3) && s.push(239, 191, 189), r = i;
                                continue
                            }
                            i = 65536 + (r - 55296 << 10 | i - 56320)
                        } else r && -1 < (e -= 3) && s.push(239, 191, 189);
                        if (r = null, 128 > i) {
                            if (0 > --e) break;
                            s.push(i)
                        } else if (2048 > i) {
                            if (0 > (e -= 2)) break;
                            s.push(i >> 6 | 192, 63 & i | 128)
                        } else if (65536 > i) {
                            if (0 > (e -= 3)) break;
                            s.push(i >> 12 | 224, i >> 6 & 63 | 128, 63 & i | 128)
                        } else {
                            if (!(1114112 > i)) throw Error("Invalid code point");
                            if (0 > (e -= 4)) break;
                            s.push(i >> 18 | 240, i >> 12 & 63 | 128, i >> 6 & 63 | 128, 63 & i | 128)
                        }
                    }
                    return s
                }

                function C(t) {
                    for (var e = [], i = 0; i < t.length; ++i) e.push(255 & t.charCodeAt(i));
                    return e
                }

                function E(t, e, i, n) {
                    for (var r = 0; r < n && !(r + i >= e.length || r >= t.length); ++r) e[r + i] = t[r];
                    return r
                }
                var M = t(1),
                    P = t(4),
                    L = t(6);
                i.Buffer = r, i.SlowBuffer = function(t) {
                    return +t != t && (t = 0), r.alloc(+t)
                }, i.INSPECT_MAX_BYTES = 50, r.TYPED_ARRAY_SUPPORT = void 0 !== e.TYPED_ARRAY_SUPPORT ? e.TYPED_ARRAY_SUPPORT : function() {
                    try {
                        var t = new Uint8Array(1);
                        return t.__proto__ = {
                            __proto__: Uint8Array.prototype,
                            foo: function() {
                                return 42
                            }
                        }, 42 === t.foo() && "function" == typeof t.subarray && 0 === t.subarray(1, 1).byteLength
                    } catch (t) {
                        return !1
                    }
                }(), i.kMaxLength = r.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823, r.poolSize = 8192, r._augment = function(t) {
                    return t.__proto__ = r.prototype, t
                }, r.from = function(t, e, i) {
                    return s(null, t, e, i)
                }, r.TYPED_ARRAY_SUPPORT && (r.prototype.__proto__ = Uint8Array.prototype, r.__proto__ = Uint8Array, $jscomp.initSymbol(), $jscomp.initSymbol(), $jscomp.initSymbol(), "undefined" != typeof Symbol && Symbol.species && r[Symbol.species] === r && ($jscomp.initSymbol(), Object.defineProperty(r, Symbol.species, {
                    value: null,
                    configurable: !0
                }))), r.alloc = function(t, e, i) {
                    return a(t), t = 0 >= t ? n(null, t) : void 0 !== e ? "string" == typeof i ? n(null, t).fill(e, i) : n(null, t).fill(e) : n(null, t)
                }, r.allocUnsafe = function(t) {
                    return o(null, t)
                }, r.allocUnsafeSlow = function(t) {
                    return o(null, t)
                }, r.isBuffer = function(t) {
                    return !(null == t || !t._isBuffer)
                }, r.compare = function(t, e) {
                    if (!r.isBuffer(t) || !r.isBuffer(e)) throw new TypeError("Arguments must be Buffers");
                    if (t === e) return 0;
                    for (var i = t.length, n = e.length, s = 0, a = Math.min(i, n); s < a; ++s)
                        if (t[s] !== e[s]) {
                            i = t[s], n = e[s];
                            break
                        } return i < n ? -1 : n < i ? 1 : 0
                }, r.isEncoding = function(t) {
                    switch (String(t).toLowerCase()) {
                        case "hex":
                        case "utf8":
                        case "utf-8":
                        case "ascii":
                        case "latin1":
                        case "binary":
                        case "base64":
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return !0;
                        default:
                            return !1
                    }
                }, r.concat = function(t, e) {
                    if (!L(t)) throw new TypeError('"list" argument must be an Array of Buffers');
                    if (0 === t.length) return r.alloc(0);
                    var i;
                    if (void 0 === e)
                        for (i = e = 0; i < t.length; ++i) e += t[i].length;
                    e = r.allocUnsafe(e);
                    var n = 0;
                    for (i = 0; i < t.length; ++i) {
                        var s = t[i];
                        if (!r.isBuffer(s)) throw new TypeError('"list" argument must be an Array of Buffers');
                        s.copy(e, n), n += s.length
                    }
                    return e
                }, r.byteLength = u, r.prototype._isBuffer = !0, r.prototype.swap16 = function() {
                    var t = this.length;
                    if (0 != t % 2) throw new RangeError("Buffer size must be a multiple of 16-bits");
                    for (var e = 0; e < t; e += 2) p(this, e, e + 1);
                    return this
                }, r.prototype.swap32 = function() {
                    var t = this.length;
                    if (0 != t % 4) throw new RangeError("Buffer size must be a multiple of 32-bits");
                    for (var e = 0; e < t; e += 4) p(this, e, e + 3), p(this, e + 1, e + 2);
                    return this
                }, r.prototype.swap64 = function() {
                    var t = this.length;
                    if (0 != t % 8) throw new RangeError("Buffer size must be a multiple of 64-bits");
                    for (var e = 0; e < t; e += 8) p(this, e, e + 7), p(this, e + 1, e + 6), p(this, e + 2, e + 5), p(this, e + 3, e + 4);
                    return this
                }, r.prototype.toString = function() {
                    var t = 0 | this.length;
                    return 0 === t ? "" : 0 === arguments.length ? m(this, 0, t) : function(t, e, i) {
                        var n = !1;
                        if ((void 0 === e || 0 > e) && (e = 0), e > this.length) return "";
                        if ((void 0 === i || i > this.length) && (i = this.length), 0 >= i) return "";
                        if ((i >>>= 0) <= (e >>>= 0)) return "";
                        for (t || (t = "utf8");;) switch (t) {
                            case "hex":
                                for (t = e, e = i, i = this.length, (!t || 0 > t) && (t = 0), (!e || 0 > e || e > i) && (e = i), n = "", i = t; i < e; ++i) n = (t = n) + (n = 16 > (n = this[i]) ? "0" + n.toString(16) : n.toString(16));
                                return n;
                            case "utf8":
                            case "utf-8":
                                return m(this, e, i);
                            case "ascii":
                                for (t = "", i = Math.min(this.length, i); e < i; ++e) t += String.fromCharCode(127 & this[e]);
                                return t;
                            case "latin1":
                            case "binary":
                                for (t = "", i = Math.min(this.length, i); e < i; ++e) t += String.fromCharCode(this[e]);
                                return t;
                            case "base64":
                                return e = 0 === e && i === this.length ? M.fromByteArray(this) : M.fromByteArray(this.slice(e, i));
                            case "ucs2":
                            case "ucs-2":
                            case "utf16le":
                            case "utf-16le":
                                for (e = this.slice(e, i), i = "", t = 0; t < e.length; t += 2) i += String.fromCharCode(e[t] + 256 * e[t + 1]);
                                return i;
                            default:
                                if (n) throw new TypeError("Unknown encoding: " + t);
                                t = (t + "").toLowerCase(), n = !0
                        }
                    }.apply(this, arguments)
                }, r.prototype.equals = function(t) {
                    if (!r.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                    return this === t || 0 === r.compare(this, t)
                }, r.prototype.inspect = function() {
                    var t = "",
                        e = i.INSPECT_MAX_BYTES;
                    return 0 < this.length && (t = this.toString("hex", 0, e).match(/.{2}/g).join(" "), this.length > e && (t += " ... ")), "<Buffer " + t + ">"
                }, r.prototype.compare = function(t, e, i, n, s) {
                    if (!r.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                    if (void 0 === e && (e = 0), void 0 === i && (i = t ? t.length : 0), void 0 === n && (n = 0), void 0 === s && (s = this.length), 0 > e || i > t.length || 0 > n || s > this.length) throw new RangeError("out of range index");
                    if (n >= s && e >= i) return 0;
                    if (n >= s) return -1;
                    if (e >= i) return 1;
                    if (this === t) return 0;
                    var a = (s >>>= 0) - (n >>>= 0),
                        o = (i >>>= 0) - (e >>>= 0),
                        l = Math.min(a, o);
                    for (n = this.slice(n, s), t = t.slice(e, i), e = 0; e < l; ++e)
                        if (n[e] !== t[e]) {
                            a = n[e], o = t[e];
                            break
                        } return a < o ? -1 : o < a ? 1 : 0
                }, r.prototype.includes = function(t, e, i) {
                    return -1 !== this.indexOf(t, e, i)
                }, r.prototype.indexOf = function(t, e, i) {
                    return d(this, t, e, i, !0)
                }, r.prototype.lastIndexOf = function(t, e, i) {
                    return d(this, t, e, i, !1)
                }, r.prototype.write = function(t, e, i, n) {
                    if (void 0 === e) n = "utf8", i = this.length, e = 0;
                    else if (void 0 === i && "string" == typeof e) n = e, i = this.length, e = 0;
                    else {
                        if (!isFinite(e)) throw Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                        e |= 0, isFinite(i) ? (i |= 0, void 0 === n && (n = "utf8")) : (n = i, i = void 0)
                    }
                    var r = this.length - e;
                    if ((void 0 === i || i > r) && (i = r), 0 < t.length && (0 > i || 0 > e) || e > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                    for (n || (n = "utf8"), r = !1;;) switch (n) {
                        case "hex":
                            t: {
                                if (e = Number(e) || 0, n = this.length - e, i ? (i = Number(i)) > n && (i = n) : i = n, 0 != (n = t.length) % 2) throw new TypeError("Invalid hex string");
                                for (i > n / 2 && (i = n / 2), n = 0; n < i; ++n) {
                                    if (r = parseInt(t.substr(2 * n, 2), 16), isNaN(r)) {
                                        t = n;
                                        break t
                                    }
                                    this[e + n] = r
                                }
                                t = n
                            }
                            return t;
                        case "utf8":
                        case "utf-8":
                            return E(k(t, this.length - e), this, e, i);
                        case "ascii":
                            return E(C(t), this, e, i);
                        case "latin1":
                        case "binary":
                            return E(C(t), this, e, i);
                        case "base64":
                            return E(M.toByteArray(T(t)), this, e, i);
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            n = t, r = this.length - e;
                            for (var s = [], a = 0; a < n.length && !(0 > (r -= 2)); ++a) {
                                var o = n.charCodeAt(a);
                                t = o >> 8, o %= 256, s.push(o), s.push(t)
                            }
                            return E(s, this, e, i);
                        default:
                            if (r) throw new TypeError("Unknown encoding: " + n);
                            n = ("" + n).toLowerCase(), r = !0
                    }
                }, r.prototype.toJSON = function() {
                    return {
                        type: "Buffer",
                        data: Array.prototype.slice.call(this._arr || this, 0)
                    }
                };
                var A = 4096;
                r.prototype.slice = function(t, e) {
                    var i = this.length;
                    if (0 > (t = ~~t) ? 0 > (t += i) && (t = 0) : t > i && (t = i), 0 > (e = void 0 === e ? i : ~~e) ? 0 > (e += i) && (e = 0) : e > i && (e = i), e < t && (e = t), r.TYPED_ARRAY_SUPPORT)(e = this.subarray(t, e)).__proto__ = r.prototype;
                    else {
                        e = new r(i = e - t, void 0);
                        for (var n = 0; n < i; ++n) e[n] = this[n + t]
                    }
                    return e
                }, r.prototype.readUIntLE = function(t, e, i) {
                    t |= 0, e |= 0, i || g(t, e, this.length), i = this[t];
                    for (var n = 1, r = 0; ++r < e && (n *= 256);) i += this[t + r] * n;
                    return i
                }, r.prototype.readUIntBE = function(t, e, i) {
                    t |= 0, e |= 0, i || g(t, e, this.length), i = this[t + --e];
                    for (var n = 1; 0 < e && (n *= 256);) i += this[t + --e] * n;
                    return i
                }, r.prototype.readUInt8 = function(t, e) {
                    return e || g(t, 1, this.length), this[t]
                }, r.prototype.readUInt16LE = function(t, e) {
                    return e || g(t, 2, this.length), this[t] | this[t + 1] << 8
                }, r.prototype.readUInt16BE = function(t, e) {
                    return e || g(t, 2, this.length), this[t] << 8 | this[t + 1]
                }, r.prototype.readUInt32LE = function(t, e) {
                    return e || g(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
                }, r.prototype.readUInt32BE = function(t, e) {
                    return e || g(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
                }, r.prototype.readIntLE = function(t, e, i) {
                    t |= 0, e |= 0, i || g(t, e, this.length), i = this[t];
                    for (var n = 1, r = 0; ++r < e && (n *= 256);) i += this[t + r] * n;
                    return i >= 128 * n && (i -= Math.pow(2, 8 * e)), i
                }, r.prototype.readIntBE = function(t, e, i) {
                    t |= 0, e |= 0, i || g(t, e, this.length), i = e;
                    for (var n = 1, r = this[t + --i]; 0 < i && (n *= 256);) r += this[t + --i] * n;
                    return r >= 128 * n && (r -= Math.pow(2, 8 * e)), r
                }, r.prototype.readInt8 = function(t, e) {
                    return e || g(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
                }, r.prototype.readInt16LE = function(t, e) {
                    return e || g(t, 2, this.length), 32768 & (t = this[t] | this[t + 1] << 8) ? 4294901760 | t : t
                }, r.prototype.readInt16BE = function(t, e) {
                    return e || g(t, 2, this.length), 32768 & (t = this[t + 1] | this[t] << 8) ? 4294901760 | t : t
                }, r.prototype.readInt32LE = function(t, e) {
                    return e || g(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
                }, r.prototype.readInt32BE = function(t, e) {
                    return e || g(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
                }, r.prototype.readFloatLE = function(t, e) {
                    return e || g(t, 4, this.length), P.read(this, t, !0, 23, 4)
                }, r.prototype.readFloatBE = function(t, e) {
                    return e || g(t, 4, this.length), P.read(this, t, !1, 23, 4)
                }, r.prototype.readDoubleLE = function(t, e) {
                    return e || g(t, 8, this.length), P.read(this, t, !0, 52, 8)
                }, r.prototype.readDoubleBE = function(t, e) {
                    return e || g(t, 8, this.length), P.read(this, t, !1, 52, 8)
                }, r.prototype.writeUIntLE = function(t, e, i, n) {
                    t = +t, e |= 0, i |= 0, n || v(this, t, e, i, Math.pow(2, 8 * i) - 1, 0), n = 1;
                    var r = 0;
                    for (this[e] = 255 & t; ++r < i && (n *= 256);) this[e + r] = t / n & 255;
                    return e + i
                }, r.prototype.writeUIntBE = function(t, e, i, n) {
                    t = +t, e |= 0, i |= 0, n || v(this, t, e, i, Math.pow(2, 8 * i) - 1, 0);
                    var r = 1;
                    for (this[e + (n = i - 1)] = 255 & t; 0 <= --n && (r *= 256);) this[e + n] = t / r & 255;
                    return e + i
                }, r.prototype.writeUInt8 = function(t, e, i) {
                    return t = +t, e |= 0, i || v(this, t, e, 1, 255, 0), r.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), this[e] = 255 & t, e + 1
                }, r.prototype.writeUInt16LE = function(t, e, i) {
                    return t = +t, e |= 0, i || v(this, t, e, 2, 65535, 0), r.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : y(this, t, e, !0), e + 2
                }, r.prototype.writeUInt16BE = function(t, e, i) {
                    return t = +t, e |= 0, i || v(this, t, e, 2, 65535, 0), r.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : y(this, t, e, !1), e + 2
                }, r.prototype.writeUInt32LE = function(t, e, i) {
                    return t = +t, e |= 0, i || v(this, t, e, 4, 4294967295, 0), r.TYPED_ARRAY_SUPPORT ? (this[e + 3] = t >>> 24, this[e + 2] = t >>> 16, this[e + 1] = t >>> 8, this[e] = 255 & t) : x(this, t, e, !0), e + 4
                }, r.prototype.writeUInt32BE = function(t, e, i) {
                    return t = +t, e |= 0, i || v(this, t, e, 4, 4294967295, 0), r.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : x(this, t, e, !1), e + 4
                }, r.prototype.writeIntLE = function(t, e, i, n) {
                    t = +t, e |= 0, n || v(this, t, e, i, (n = Math.pow(2, 8 * i - 1)) - 1, -n), n = 0;
                    var r = 1,
                        s = 0;
                    for (this[e] = 255 & t; ++n < i && (r *= 256);) 0 > t && 0 === s && 0 !== this[e + n - 1] && (s = 1), this[e + n] = (t / r >> 0) - s & 255;
                    return e + i
                }, r.prototype.writeIntBE = function(t, e, i, n) {
                    t = +t, e |= 0, n || v(this, t, e, i, (n = Math.pow(2, 8 * i - 1)) - 1, -n);
                    var r = 1,
                        s = 0;
                    for (this[e + (n = i - 1)] = 255 & t; 0 <= --n && (r *= 256);) 0 > t && 0 === s && 0 !== this[e + n + 1] && (s = 1), this[e + n] = (t / r >> 0) - s & 255;
                    return e + i
                }, r.prototype.writeInt8 = function(t, e, i) {
                    return t = +t, e |= 0, i || v(this, t, e, 1, 127, -128), r.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), 0 > t && (t = 255 + t + 1), this[e] = 255 & t, e + 1
                }, r.prototype.writeInt16LE = function(t, e, i) {
                    return t = +t, e |= 0, i || v(this, t, e, 2, 32767, -32768), r.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : y(this, t, e, !0), e + 2
                }, r.prototype.writeInt16BE = function(t, e, i) {
                    return t = +t, e |= 0, i || v(this, t, e, 2, 32767, -32768), r.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : y(this, t, e, !1), e + 2
                }, r.prototype.writeInt32LE = function(t, e, i) {
                    return t = +t, e |= 0, i || v(this, t, e, 4, 2147483647, -2147483648), r.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8, this[e + 2] = t >>> 16, this[e + 3] = t >>> 24) : x(this, t, e, !0), e + 4
                }, r.prototype.writeInt32BE = function(t, e, i) {
                    return t = +t, e |= 0, i || v(this, t, e, 4, 2147483647, -2147483648), 0 > t && (t = 4294967295 + t + 1), r.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : x(this, t, e, !1), e + 4
                }, r.prototype.writeFloatLE = function(t, e, i) {
                    return w(this, t, e, !0, i)
                }, r.prototype.writeFloatBE = function(t, e, i) {
                    return w(this, t, e, !1, i)
                }, r.prototype.writeDoubleLE = function(t, e, i) {
                    return S(this, t, e, !0, i)
                }, r.prototype.writeDoubleBE = function(t, e, i) {
                    return S(this, t, e, !1, i)
                }, r.prototype.copy = function(t, e, i, n) {
                    if (i || (i = 0), n || 0 === n || (n = this.length), e >= t.length && (e = t.length), e || (e = 0), 0 < n && n < i && (n = i), n === i || 0 === t.length || 0 === this.length) return 0;
                    if (0 > e) throw new RangeError("targetStart out of bounds");
                    if (0 > i || i >= this.length) throw new RangeError("sourceStart out of bounds");
                    if (0 > n) throw new RangeError("sourceEnd out of bounds");
                    n > this.length && (n = this.length), t.length - e < n - i && (n = t.length - e + i);
                    var s = n - i;
                    if (this === t && i < e && e < n)
                        for (n = s - 1; 0 <= n; --n) t[n + e] = this[n + i];
                    else if (1e3 > s || !r.TYPED_ARRAY_SUPPORT)
                        for (n = 0; n < s; ++n) t[n + e] = this[n + i];
                    else Uint8Array.prototype.set.call(t, this.subarray(i, i + s), e);
                    return s
                }, r.prototype.fill = function(t, e, i, n) {
                    if ("string" == typeof t) {
                        if ("string" == typeof e ? (n = e, e = 0, i = this.length) : "string" == typeof i && (n = i, i = this.length), 1 === t.length) {
                            var s = t.charCodeAt(0);
                            256 > s && (t = s)
                        }
                        if (void 0 !== n && "string" != typeof n) throw new TypeError("encoding must be a string");
                        if ("string" == typeof n && !r.isEncoding(n)) throw new TypeError("Unknown encoding: " + n)
                    } else "number" == typeof t && (t &= 255);
                    if (0 > e || this.length < e || this.length < i) throw new RangeError("Out of range index");
                    if (i <= e) return this;
                    if (e >>>= 0, i = void 0 === i ? this.length : i >>> 0, t || (t = 0), "number" == typeof t)
                        for (n = e; n < i; ++n) this[n] = t;
                    else
                        for (s = (t = r.isBuffer(t) ? t : k(new r(t, n).toString())).length, n = 0; n < i - e; ++n) this[n + e] = t[n % s];
                    return this
                };
                var R = /[^+\/0-9A-Za-z-_]/g
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}],
        4: [function(t, e, i) {
            i.read = function(t, e, i, n, r) {
                var s = 8 * r - n - 1,
                    a = (1 << s) - 1,
                    o = a >> 1,
                    l = -7,
                    h = i ? -1 : 1,
                    c = t[e + (r = i ? r - 1 : 0)];
                for (r += h, i = c & (1 << -l) - 1, c >>= -l, l += s; 0 < l; i = 256 * i + t[e + r], r += h, l -= 8);
                for (s = i & (1 << -l) - 1, i >>= -l, l += n; 0 < l; s = 256 * s + t[e + r], r += h, l -= 8);
                if (0 === i) i = 1 - o;
                else {
                    if (i === a) return s ? NaN : 1 / 0 * (c ? -1 : 1);
                    s += Math.pow(2, n), i -= o
                }
                return (c ? -1 : 1) * s * Math.pow(2, i - n)
            }, i.write = function(t, e, i, n, r, s) {
                var a, o = 8 * s - r - 1,
                    l = (1 << o) - 1,
                    h = l >> 1,
                    c = 23 === r ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
                s = n ? 0 : s - 1;
                var u = n ? 1 : -1,
                    p = 0 > e || 0 === e && 0 > 1 / e ? 1 : 0;
                for (e = Math.abs(e), isNaN(e) || 1 / 0 === e ? (e = isNaN(e) ? 1 : 0, n = l) : (n = Math.floor(Math.log(e) / Math.LN2), 1 > e * (a = Math.pow(2, -n)) && (n--, a *= 2), 2 <= (e = 1 <= n + h ? e + c / a : e + c * Math.pow(2, 1 - h)) * a && (n++, a /= 2), n + h >= l ? (e = 0, n = l) : 1 <= n + h ? (e = (e * a - 1) * Math.pow(2, r), n += h) : (e = e * Math.pow(2, h - 1) * Math.pow(2, r), n = 0)); 8 <= r; t[i + s] = 255 & e, s += u, e /= 256, r -= 8);
                for (n = n << r | e, o += r; 0 < o; t[i + s] = 255 & n, s += u, n /= 256, o -= 8);
                t[i + s - u] |= 128 * p
            }
        }, {}],
        5: [function(t, e, i) {
            e.exports = "function" == typeof Object.create ? function(t, e) {
                t.super_ = e, t.prototype = Object.create(e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                })
            } : function(t, e) {
                t.super_ = e;
                var i = function() {};
                i.prototype = e.prototype, t.prototype = new i, t.prototype.constructor = t
            }
        }, {}],
        6: [function(t, e, i) {
            var n = {}.toString;
            e.exports = Array.isArray || function(t) {
                return "[object Array]" == n.call(t)
            }
        }, {}],
        7: [function(t, e, i) {
            function n() {
                throw Error("setTimeout has not been defined")
            }

            function r() {
                throw Error("clearTimeout has not been defined")
            }

            function s(t) {
                if (c === setTimeout) return setTimeout(t, 0);
                if ((c === n || !c) && setTimeout) return c = setTimeout, setTimeout(t, 0);
                try {
                    return c(t, 0)
                } catch (e) {
                    try {
                        return c.call(null, t, 0)
                    } catch (e) {
                        return c.call(this, t, 0)
                    }
                }
            }

            function a() {
                f && p && (f = !1, p.length ? d = p.concat(d) : m = -1, d.length && o())
            }

            function o() {
                if (!f) {
                    var t = s(a);
                    f = !0;
                    for (var e = d.length; e;) {
                        for (p = d, d = []; ++m < e;) p && p[m].run();
                        m = -1, e = d.length
                    }
                    p = null, f = !1,
                        function(t) {
                            if (u === clearTimeout) return clearTimeout(t);
                            if ((u === r || !u) && clearTimeout) return u = clearTimeout, clearTimeout(t);
                            try {
                                u(t)
                            } catch (e) {
                                try {
                                    return u.call(null, t)
                                } catch (e) {
                                    return u.call(this, t)
                                }
                            }
                        }(t)
                }
            }

            function l(t, e) {
                this.fun = t, this.array = e
            }

            function h() {}
            t = e.exports = {};
            try {
                var c = "function" == typeof setTimeout ? setTimeout : n
            } catch (t) {
                c = n
            }
            try {
                var u = "function" == typeof clearTimeout ? clearTimeout : r
            } catch (t) {
                u = r
            }
            var p, d = [],
                f = !1,
                m = -1;
            t.nextTick = function(t) {
                var e = Array(arguments.length - 1);
                if (1 < arguments.length)
                    for (var i = 1; i < arguments.length; i++) e[i - 1] = arguments[i];
                d.push(new l(t, e)), 1 !== d.length || f || s(o)
            }, l.prototype.run = function() {
                this.fun.apply(null, this.array)
            }, t.title = "browser", t.browser = !0, t.env = {}, t.argv = [], t.version = "", t.versions = {}, t.on = h, t.addListener = h, t.once = h, t.off = h, t.removeListener = h, t.removeAllListeners = h, t.emit = h, t.prependListener = h, t.prependOnceListener = h, t.listeners = function(t) {
                return []
            }, t.binding = function(t) {
                throw Error("process.binding is not supported")
            }, t.cwd = function() {
                return "/"
            }, t.chdir = function(t) {
                throw Error("process.chdir is not supported")
            }, t.umask = function() {
                return 0
            }
        }, {}],
        8: [function(t, e, i) {
            i.get = function(t) {
                var e = Error.stackTraceLimit;
                Error.stackTraceLimit = 1 / 0;
                var n = {},
                    r = Error.prepareStackTrace;
                return Error.prepareStackTrace = function(t, e) {
                    return e
                }, Error.captureStackTrace(n, t || i.get), t = n.stack, Error.prepareStackTrace = r, Error.stackTraceLimit = e, t
            }, i.parse = function(t) {
                if (!t.stack) return [];
                var e = this;
                return t.stack.split("\n").slice(1).map(function(t) {
                    if (t.match(/^\s*[-]{4,}$/)) return e._createParsedCallSite({
                        fileName: t,
                        lineNumber: null,
                        functionName: null,
                        typeName: null,
                        methodName: null,
                        columnNumber: null,
                        native: null
                    });
                    if (t = t.match(/at (?:(.+)\s+)?\(?(?:(.+?):(\d+):(\d+)|([^)]+))\)?/)) {
                        var i = null,
                            n = null,
                            r = null,
                            s = null,
                            a = null,
                            o = "native" === t[5];
                        return t[1] && (i = (n = t[1].match(/([^\.]+)(?:\.(.+))?/))[1], n = n[2], r = t[1], s = "Object"), n && (s = i, a = n), "<anonymous>" === n && (a = null, r = ""), t = {
                            fileName: t[2] || null,
                            lineNumber: parseInt(t[3], 10) || null,
                            functionName: r,
                            typeName: s,
                            methodName: a,
                            columnNumber: parseInt(t[4], 10) || null,
                            native: o
                        }, e._createParsedCallSite(t)
                    }
                }).filter(function(t) {
                    return !!t
                })
            }, i._createParsedCallSite = function(t) {
                var e, i = {};
                for (e in t) {
                    var n = "get";
                    "native" === e && (n = "is");
                    var r = n + e.substr(0, 1).toUpperCase() + e.substr(1);
                    ! function(e) {
                        i[r] = function() {
                            return t[e]
                        }
                    }(e)
                }
                for (e in n = Object.create(i), t) n[e] = t[e];
                return n
            }
        }, {}],
        9: [function(t, e, i) {
            e.exports = function(t) {
                return t && "object" == typeof t && "function" == typeof t.copy && "function" == typeof t.fill && "function" == typeof t.readUInt8
            }
        }, {}],
        10: [function(t, e, i) {
            (function(e, n) {
                function r(t, e) {
                    var n = {
                        seen: [],
                        stylize: a
                    };
                    return 3 <= arguments.length && (n.depth = arguments[2]), 4 <= arguments.length && (n.colors = arguments[3]), p(e) ? n.showHidden = e : e && i._extend(n, e), m(n.showHidden) && (n.showHidden = !1), m(n.depth) && (n.depth = 2), m(n.colors) && (n.colors = !1), m(n.customInspect) && (n.customInspect = !0), n.colors && (n.stylize = s), o(n, t, n.depth)
                }

                function s(t, e) {
                    return (e = r.styles[e]) ? "[" + r.colors[e][0] + "m" + t + "[" + r.colors[e][1] + "m" : t
                }

                function a(t, e) {
                    return t
                }

                function o(t, e, n) {
                    if (t.customInspect && e && b(e.inspect) && e.inspect !== i.inspect && (!e.constructor || e.constructor.prototype !== e)) {
                        var r = e.inspect(n, t);
                        return f(r) || (r = o(t, r, n)), r
                    }
                    if (r = l(t, e)) return r;
                    var s = Object.keys(e),
                        a = function(t) {
                            var e = {};
                            return t.forEach(function(t, i) {
                                e[t] = !0
                            }), e
                        }(s);
                    if (t.showHidden && (s = Object.getOwnPropertyNames(e)), x(e) && (0 <= s.indexOf("message") || 0 <= s.indexOf("description"))) return h(e);
                    if (0 === s.length) {
                        if (b(e)) return t.stylize("[Function" + (e.name ? ": " + e.name : "") + "]", "special");
                        if (g(e)) return t.stylize(RegExp.prototype.toString.call(e), "regexp");
                        if (y(e)) return t.stylize(Date.prototype.toString.call(e), "date");
                        if (x(e)) return h(e)
                    }
                    r = "";
                    var p = !1,
                        d = ["{", "}"];
                    return u(e) && (p = !0, d = ["[", "]"]), b(e) && (r = " [Function" + (e.name ? ": " + e.name : "") + "]"), g(e) && (r = " " + RegExp.prototype.toString.call(e)), y(e) && (r = " " + Date.prototype.toUTCString.call(e)), x(e) && (r = " " + h(e)), 0 !== s.length || p && 0 != e.length ? 0 > n ? g(e) ? t.stylize(RegExp.prototype.toString.call(e), "regexp") : t.stylize("[Object]", "special") : (t.seen.push(e), s = p ? function(t, e, i, n, r) {
                        for (var s = [], a = 0, o = e.length; a < o; ++a) Object.prototype.hasOwnProperty.call(e, String(a)) ? s.push(c(t, e, i, n, String(a), !0)) : s.push("");
                        return r.forEach(function(r) {
                            r.match(/^\d+$/) || s.push(c(t, e, i, n, r, !0))
                        }), s
                    }(t, e, n, a, s) : s.map(function(i) {
                        return c(t, e, n, a, i, p)
                    }), t.seen.pop(), function(t, e, i) {
                        return 60 < t.reduce(function(t, e) {
                            return e.indexOf("\n"), t + e.replace(/\u001b\[\d\d?m/g, "").length + 1
                        }, 0) ? i[0] + ("" === e ? "" : e + "\n ") + " " + t.join(",\n  ") + " " + i[1] : i[0] + e + " " + t.join(", ") + " " + i[1]
                    }(s, r, d)) : d[0] + r + d[1]
                }

                function l(t, e) {
                    return m(e) ? t.stylize("undefined", "undefined") : f(e) ? (e = "'" + JSON.stringify(e).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'", t.stylize(e, "string")) : d(e) ? t.stylize("" + e, "number") : p(e) ? t.stylize("" + e, "boolean") : null === e ? t.stylize("null", "null") : void 0
                }

                function h(t) {
                    return "[" + Error.prototype.toString.call(t) + "]"
                }

                function c(t, e, i, n, r, s) {
                    var a, l;
                    if ((e = Object.getOwnPropertyDescriptor(e, r) || {
                            value: e[r]
                        }).get ? l = e.set ? t.stylize("[Getter/Setter]", "special") : t.stylize("[Getter]", "special") : e.set && (l = t.stylize("[Setter]", "special")), Object.prototype.hasOwnProperty.call(n, r) || (a = "[" + r + "]"), l || (0 > t.seen.indexOf(e.value) ? -1 < (l = o(t, e.value, null === i ? null : i - 1)).indexOf("\n") && (l = s ? l.split("\n").map(function(t) {
                            return "  " + t
                        }).join("\n").substr(2) : "\n" + l.split("\n").map(function(t) {
                            return "   " + t
                        }).join("\n")) : l = t.stylize("[Circular]", "special")), m(a)) {
                        if (s && r.match(/^\d+$/)) return l;
                        (a = JSON.stringify("" + r)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (a = a.substr(1, a.length - 2), a = t.stylize(a, "name")) : (a = a.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), a = t.stylize(a, "string"))
                    }
                    return a + ": " + l
                }

                function u(t) {
                    return Array.isArray(t)
                }

                function p(t) {
                    return "boolean" == typeof t
                }

                function d(t) {
                    return "number" == typeof t
                }

                function f(t) {
                    return "string" == typeof t
                }

                function m(t) {
                    return void 0 === t
                }

                function g(t) {
                    return v(t) && "[object RegExp]" === Object.prototype.toString.call(t)
                }

                function v(t) {
                    return "object" == typeof t && null !== t
                }

                function y(t) {
                    return v(t) && "[object Date]" === Object.prototype.toString.call(t)
                }

                function x(t) {
                    return v(t) && ("[object Error]" === Object.prototype.toString.call(t) || t instanceof Error)
                }

                function b(t) {
                    return "function" == typeof t
                }

                function w(t) {
                    return 10 > t ? "0" + t.toString(10) : t.toString(10)
                }
                var S = /%[sdj%]/g;
                i.format = function(t) {
                    if (!f(t)) {
                        for (var e = [], i = 0; i < arguments.length; i++) e.push(r(arguments[i]));
                        return e.join(" ")
                    }
                    i = 1;
                    var n = arguments,
                        s = n.length;
                    e = String(t).replace(S, function(t) {
                        if ("%%" === t) return "%";
                        if (i >= s) return t;
                        switch (t) {
                            case "%s":
                                return String(n[i++]);
                            case "%d":
                                return Number(n[i++]);
                            case "%j":
                                try {
                                    return JSON.stringify(n[i++])
                                } catch (t) {
                                    return "[Circular]"
                                }
                                default:
                                    return t
                        }
                    });
                    for (var a = n[i]; i < s; a = n[++i]) e = null !== a && v(a) ? e + " " + r(a) : e + " " + a;
                    return e
                }, i.deprecate = function(t, r) {
                    if (m(n.process)) return function() {
                        return i.deprecate(t, r).apply(this, arguments)
                    };
                    if (!0 === e.noDeprecation) return t;
                    var s = !1;
                    return function() {
                        if (!s) {
                            if (e.throwDeprecation) throw Error(r);
                            e.traceDeprecation ? console.trace(r) : console.error(r), s = !0
                        }
                        return t.apply(this, arguments)
                    }
                };
                var T, k = {};
                i.debuglog = function(t) {
                    if (m(T) && (T = e.env.NODE_DEBUG || ""), t = t.toUpperCase(), !k[t])
                        if (new RegExp("\\b" + t + "\\b", "i").test(T)) {
                            var n = e.pid;
                            k[t] = function() {
                                var e = i.format.apply(i, arguments);
                                console.error("%s %d: %s", t, n, e)
                            }
                        } else k[t] = function() {};
                    return k[t]
                }, i.inspect = r, r.colors = {
                    bold: [1, 22],
                    italic: [3, 23],
                    underline: [4, 24],
                    inverse: [7, 27],
                    white: [37, 39],
                    grey: [90, 39],
                    black: [30, 39],
                    blue: [34, 39],
                    cyan: [36, 39],
                    green: [32, 39],
                    magenta: [35, 39],
                    red: [31, 39],
                    yellow: [33, 39]
                }, r.styles = {
                    special: "cyan",
                    number: "yellow",
                    boolean: "yellow",
                    undefined: "grey",
                    null: "bold",
                    string: "green",
                    date: "magenta",
                    regexp: "red"
                }, i.isArray = u, i.isBoolean = p, i.isNull = function(t) {
                    return null === t
                }, i.isNullOrUndefined = function(t) {
                    return null == t
                }, i.isNumber = d, i.isString = f, i.isSymbol = function(t) {
                    return "symbol" == typeof t
                }, i.isUndefined = m, i.isRegExp = g, i.isObject = v, i.isDate = y, i.isError = x, i.isFunction = b, i.isPrimitive = function(t) {
                    return null === t || "boolean" == typeof t || "number" == typeof t || "string" == typeof t || "symbol" == typeof t || void 0 === t
                }, i.isBuffer = t(9);
                var C = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");
                i.log = function() {
                    var t, e;
                    console.log("%s - %s", (t = new Date, e = [w(t.getHours()), w(t.getMinutes()), w(t.getSeconds())].join(":"), [t.getDate(), C[t.getMonth()], e].join(" ")), i.format.apply(i, arguments))
                }, i.inherits = t(5), i._extend = function(t, e) {
                    if (!e || !v(e)) return t;
                    for (var i = Object.keys(e), n = i.length; n--;) t[i[n]] = e[i[n]];
                    return t
                }
            }).call(this, t(7), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}],
        11: [function(t, e, i) {
            e.exports = {
                _edge: 17,
                $eu: [0, 0],
                $prussia: [.058823529411764705, 0],
                $spqr: [.11764705882352941, 0],
                $ussr: [.17647058823529413, 0],
                ad: [.23529411764705882, 0],
                ae: [.29411764705882354, 0],
                af: [.35294117647058826, 0],
                ag: [.4117647058823529, 0],
                ai: [.47058823529411764, 0],
                al: [.5294117647058824, 0],
                am: [.5882352941176471, 0],
                ao: [.6470588235294118, 0],
                aq: [.7058823529411765, 0],
                ar: [.7647058823529411, 0],
                as: [.8235294117647058, 0],
                at: [.8823529411764706, 0],
                au: [.9411764705882353, 0],
                aw: [0, .058823529411764705],
                ax: [.058823529411764705, .058823529411764705],
                az: [.11764705882352941, .058823529411764705],
                ba: [.17647058823529413, .058823529411764705],
                bb: [.23529411764705882, .058823529411764705],
                bd: [.29411764705882354, .058823529411764705],
                be: [.35294117647058826, .058823529411764705],
                bf: [.4117647058823529, .058823529411764705],
                bg: [.47058823529411764, .058823529411764705],
                bh: [.5294117647058824, .058823529411764705],
                bi: [.5882352941176471, .058823529411764705],
                bj: [.6470588235294118, .058823529411764705],
                bl: [.7058823529411765, .058823529411764705],
                bm: [.7647058823529411, .058823529411764705],
                bn: [.8235294117647058, .058823529411764705],
                bo: [.8823529411764706, .058823529411764705],
                bq: [.9411764705882353, .058823529411764705],
                br: [0, .11764705882352941],
                bs: [.058823529411764705, .11764705882352941],
                bt: [.11764705882352941, .11764705882352941],
                bv: [.17647058823529413, .11764705882352941],
                bw: [.23529411764705882, .11764705882352941],
                by: [.29411764705882354, .11764705882352941],
                bz: [.35294117647058826, .11764705882352941],
                ca: [.4117647058823529, .11764705882352941],
                cc: [.47058823529411764, .11764705882352941],
                cd: [.5294117647058824, .11764705882352941],
                cf: [.5882352941176471, .11764705882352941],
                cg: [.6470588235294118, .11764705882352941],
                ch: [.7058823529411765, .11764705882352941],
                ci: [.7647058823529411, .11764705882352941],
                ck: [.8235294117647058, .11764705882352941],
                cl: [.8823529411764706, .11764705882352941],
                cm: [.9411764705882353, .11764705882352941],
                cn: [0, .17647058823529413],
                co: [.058823529411764705, .17647058823529413],
                cr: [.11764705882352941, .17647058823529413],
                cu: [.17647058823529413, .17647058823529413],
                cv: [.23529411764705882, .17647058823529413],
                cw: [.29411764705882354, .17647058823529413],
                cx: [.35294117647058826, .17647058823529413],
                cy: [.4117647058823529, .17647058823529413],
                cz: [.47058823529411764, .17647058823529413],
                de: [.5294117647058824, .17647058823529413],
                dj: [.5882352941176471, .17647058823529413],
                dk: [.6470588235294118, .17647058823529413],
                dm: [.7058823529411765, .17647058823529413],
                do: [.7647058823529411, .17647058823529413],
                dz: [.8235294117647058, .17647058823529413],
                ec: [.8823529411764706, .17647058823529413],
                ee: [.9411764705882353, .17647058823529413],
                eg: [0, .23529411764705882],
                eh: [.058823529411764705, .23529411764705882],
                er: [.11764705882352941, .23529411764705882],
                es: [.17647058823529413, .23529411764705882],
                et: [.23529411764705882, .23529411764705882],
                fi: [.29411764705882354, .23529411764705882],
                fj: [.35294117647058826, .23529411764705882],
                fk: [.4117647058823529, .23529411764705882],
                fm: [.47058823529411764, .23529411764705882],
                fo: [.5294117647058824, .23529411764705882],
                fr: [.5882352941176471, .23529411764705882],
                ga: [.6470588235294118, .23529411764705882],
                "gb-eng": [.7058823529411765, .23529411764705882],
                "gb-sct": [.7647058823529411, .23529411764705882],
                "gb-wls": [.8235294117647058, .23529411764705882],
                gb: [.8823529411764706, .23529411764705882],
                gd: [.9411764705882353, .23529411764705882],
                ge: [0, .29411764705882354],
                gf: [.058823529411764705, .29411764705882354],
                gg: [.11764705882352941, .29411764705882354],
                gh: [.17647058823529413, .29411764705882354],
                gi: [.23529411764705882, .29411764705882354],
                gl: [.29411764705882354, .29411764705882354],
                gm: [.35294117647058826, .29411764705882354],
                gn: [.4117647058823529, .29411764705882354],
                gp: [.47058823529411764, .29411764705882354],
                gq: [.5294117647058824, .29411764705882354],
                gr: [.5882352941176471, .29411764705882354],
                gs: [.6470588235294118, .29411764705882354],
                gt: [.7058823529411765, .29411764705882354],
                gu: [.7647058823529411, .29411764705882354],
                gw: [.8235294117647058, .29411764705882354],
                gy: [.8823529411764706, .29411764705882354],
                hk: [.9411764705882353, .29411764705882354],
                hm: [0, .35294117647058826],
                hn: [.058823529411764705, .35294117647058826],
                hr: [.11764705882352941, .35294117647058826],
                ht: [.17647058823529413, .35294117647058826],
                hu: [.23529411764705882, .35294117647058826],
                id: [.29411764705882354, .35294117647058826],
                ie: [.35294117647058826, .35294117647058826],
                il: [.4117647058823529, .35294117647058826],
                im: [.47058823529411764, .35294117647058826],
                in: [.5294117647058824, .35294117647058826],
                io: [.5882352941176471, .35294117647058826],
                iq: [.6470588235294118, .35294117647058826],
                ir: [.7058823529411765, .35294117647058826],
                is: [.7647058823529411, .35294117647058826],
                it: [.8235294117647058, .35294117647058826],
                je: [.8823529411764706, .35294117647058826],
                jm: [.9411764705882353, .35294117647058826],
                jo: [0, .4117647058823529],
                jp: [.058823529411764705, .4117647058823529],
                ke: [.11764705882352941, .4117647058823529],
                kg: [.17647058823529413, .4117647058823529],
                kh: [.23529411764705882, .4117647058823529],
                ki: [.29411764705882354, .4117647058823529],
                km: [.35294117647058826, .4117647058823529],
                kn: [.4117647058823529, .4117647058823529],
                kp: [.47058823529411764, .4117647058823529],
                kr: [.5294117647058824, .4117647058823529],
                ku: [.5882352941176471, .4117647058823529],
                kw: [.6470588235294118, .4117647058823529],
                ky: [.7058823529411765, .4117647058823529],
                kz: [.7647058823529411, .4117647058823529],
                la: [.8235294117647058, .4117647058823529],
                lb: [.8823529411764706, .4117647058823529],
                lc: [.9411764705882353, .4117647058823529],
                li: [0, .47058823529411764],
                lk: [.058823529411764705, .47058823529411764],
                lr: [.11764705882352941, .47058823529411764],
                ls: [.17647058823529413, .47058823529411764],
                lt: [.23529411764705882, .47058823529411764],
                lu: [.29411764705882354, .47058823529411764],
                lv: [.35294117647058826, .47058823529411764],
                ly: [.4117647058823529, .47058823529411764],
                ma: [.47058823529411764, .47058823529411764],
                mc: [.5294117647058824, .47058823529411764],
                md: [.5882352941176471, .47058823529411764],
                me: [.6470588235294118, .47058823529411764],
                mf: [.7058823529411765, .47058823529411764],
                mg: [.7647058823529411, .47058823529411764],
                mh: [.8235294117647058, .47058823529411764],
                mk: [.8823529411764706, .47058823529411764],
                ml: [.9411764705882353, .47058823529411764],
                mm: [0, .5294117647058824],
                mn: [.058823529411764705, .5294117647058824],
                mo: [.11764705882352941, .5294117647058824],
                mp: [.17647058823529413, .5294117647058824],
                mq: [.23529411764705882, .5294117647058824],
                mr: [.29411764705882354, .5294117647058824],
                ms: [.35294117647058826, .5294117647058824],
                mt: [.4117647058823529, .5294117647058824],
                mu: [.47058823529411764, .5294117647058824],
                mv: [.5294117647058824, .5294117647058824],
                mw: [.5882352941176471, .5294117647058824],
                mx: [.6470588235294118, .5294117647058824],
                my: [.7058823529411765, .5294117647058824],
                mz: [.7647058823529411, .5294117647058824],
                na: [.8235294117647058, .5294117647058824],
                nc: [.8823529411764706, .5294117647058824],
                ne: [.9411764705882353, .5294117647058824],
                nf: [0, .5882352941176471],
                ng: [.058823529411764705, .5882352941176471],
                ni: [.11764705882352941, .5882352941176471],
                nl: [.17647058823529413, .5882352941176471],
                no: [.23529411764705882, .5882352941176471],
                np: [.29411764705882354, .5882352941176471],
                nr: [.35294117647058826, .5882352941176471],
                nu: [.4117647058823529, .5882352941176471],
                nz: [.47058823529411764, .5882352941176471],
                om: [.5294117647058824, .5882352941176471],
                pa: [.5882352941176471, .5882352941176471],
                pe: [.6470588235294118, .5882352941176471],
                pf: [.7058823529411765, .5882352941176471],
                pg: [.7647058823529411, .5882352941176471],
                ph: [.8235294117647058, .5882352941176471],
                pk: [.8823529411764706, .5882352941176471],
                pl: [.9411764705882353, .5882352941176471],
                pm: [0, .6470588235294118],
                pn: [.058823529411764705, .6470588235294118],
                pr: [.11764705882352941, .6470588235294118],
                ps: [.17647058823529413, .6470588235294118],
                pt: [.23529411764705882, .6470588235294118],
                pw: [.29411764705882354, .6470588235294118],
                py: [.35294117647058826, .6470588235294118],
                qa: [.4117647058823529, .6470588235294118],
                re: [.47058823529411764, .6470588235294118],
                ro: [.5294117647058824, .6470588235294118],
                rs: [.5882352941176471, .6470588235294118],
                ru: [.6470588235294118, .6470588235294118],
                rw: [.7058823529411765, .6470588235294118],
                sa: [.7647058823529411, .6470588235294118],
                sb: [.8235294117647058, .6470588235294118],
                sc: [.8823529411764706, .6470588235294118],
                sd: [.9411764705882353, .6470588235294118],
                se: [0, .7058823529411765],
                sg: [.058823529411764705, .7058823529411765],
                sh: [.11764705882352941, .7058823529411765],
                si: [.17647058823529413, .7058823529411765],
                sj: [.23529411764705882, .7058823529411765],
                sk: [.29411764705882354, .7058823529411765],
                sl: [.35294117647058826, .7058823529411765],
                sm: [.4117647058823529, .7058823529411765],
                sn: [.47058823529411764, .7058823529411765],
                so: [.5294117647058824, .7058823529411765],
                sr: [.5882352941176471, .7058823529411765],
                ss: [.6470588235294118, .7058823529411765],
                st: [.7058823529411765, .7058823529411765],
                sv: [.7647058823529411, .7058823529411765],
                sx: [.8235294117647058, .7058823529411765],
                sy: [.8823529411764706, .7058823529411765],
                sz: [.9411764705882353, .7058823529411765],
                tc: [0, .7647058823529411],
                td: [.058823529411764705, .7647058823529411],
                tf: [.11764705882352941, .7647058823529411],
                tg: [.17647058823529413, .7647058823529411],
                th: [.23529411764705882, .7647058823529411],
                tj: [.29411764705882354, .7647058823529411],
                tk: [.35294117647058826, .7647058823529411],
                tl: [.4117647058823529, .7647058823529411],
                tm: [.47058823529411764, .7647058823529411],
                tn: [.5294117647058824, .7647058823529411],
                to: [.5882352941176471, .7647058823529411],
                tr: [.6470588235294118, .7647058823529411],
                tt: [.7058823529411765, .7647058823529411],
                tv: [.7647058823529411, .7647058823529411],
                tw: [.8235294117647058, .7647058823529411],
                tz: [.8823529411764706, .7647058823529411],
                ua: [.9411764705882353, .7647058823529411],
                ug: [0, .8235294117647058],
                um: [.058823529411764705, .8235294117647058],
                us: [.11764705882352941, .8235294117647058],
                uy: [.17647058823529413, .8235294117647058],
                uz: [.23529411764705882, .8235294117647058],
                va: [.29411764705882354, .8235294117647058],
                vc: [.35294117647058826, .8235294117647058],
                ve: [.4117647058823529, .8235294117647058],
                vg: [.47058823529411764, .8235294117647058],
                vi: [.5294117647058824, .8235294117647058],
                vn: [.5882352941176471, .8235294117647058],
                vu: [.6470588235294118, .8235294117647058],
                wf: [.7058823529411765, .8235294117647058],
                ws: [.7647058823529411, .8235294117647058],
                xk: [.8235294117647058, .8235294117647058],
                ye: [.8823529411764706, .8235294117647058],
                yt: [.9411764705882353, .8235294117647058],
                za: [0, .8823529411764706],
                zm: [.058823529411764705, .8823529411764706],
                zw: [.11764705882352941, .8823529411764706]
            }
        }, {}],
        12: [function(t, e, i) {
            arguments[4][11][0].apply(i, arguments)
        }, {}],
        13: [function(t, e, i) {
            e.exports = {
                desert: {
                    w: 576,
                    h: 448,
                    f: {
                        cactus1: [0, 0, 192, 256, "center", "tree"],
                        cactus2: [192, 0, 192, 256, "center", "tree"],
                        hydrant1: [0, 320, 64, 128, "center", "hydrant"],
                        mg1_gun: [0, 256, 192, 64, "center", "weapon"],
                        mg1_pod: [192, 256, 64, 64, "center", "weapon"],
                        pole1: [384, 0, 192, 256, "center", "misc"],
                        stone1: [256, 256, 64, 64, "center", "stone"]
                    }
                },
                moon: {
                    w: 384,
                    h: 320,
                    f: {
                        light1: [0, 0, 192, 256, "center", "light"],
                        light2: [192, 0, 192, 256, "center", "light"],
                        stone1: [0, 256, 64, 64, "center", "stone"],
                        stone2: [64, 256, 64, 64, "center", "stone"]
                    }
                },
                spring: {
                    w: 576,
                    h: 512,
                    f: {
                        hydrant1: [384, 320, 64, 128, "center", "hydrant"],
                        mg1_gun: [384, 256, 192, 64, "center", "weapon"],
                        mg1_pod: [448, 320, 64, 64, "center", "weapon"],
                        pole1: [0, 0, 192, 256, "center", "misc"],
                        stone1: [512, 320, 64, 64, "center", "stone"],
                        tree1: [192, 0, 192, 256, "center", "tree"],
                        tree2: [384, 0, 192, 256, "center", "tree"],
                        tree3: [0, 256, 192, 256, "center", "tree"],
                        tree4: [192, 256, 192, 256, "center", "tree"]
                    }
                },
                winter: {
                    w: 576,
                    h: 512,
                    f: {
                        hydrant1: [384, 320, 64, 128, "center", "hydrant"],
                        mg1_gun: [384, 256, 192, 64, "center", "weapon"],
                        mg1_pod: [448, 320, 64, 64, "center", "weapon"],
                        pole1: [0, 0, 192, 256, "center", "misc"],
                        stone1: [512, 320, 64, 64, "center", "stone"],
                        tree1_winter: [192, 0, 192, 256, "center", "tree"],
                        tree2_winter: [384, 0, 192, 256, "center", "tree"],
                        tree3_winter: [0, 256, 192, 256, "center", "tree"],
                        tree4_winter: [192, 256, 192, 256, "center", "tree"]
                    }
                }
            }
        }, {}],
        14: [function(t, e, i) {
            e.exports = [{
                name: "brick1",
                start: 0,
                end: 6418,
                rateVar: .2
            }, {
                name: "death",
                start: 7919,
                end: 11873,
                rateVar: .2
            }, {
                name: "explosion1",
                start: 13374,
                end: 53959,
                rateVar: .5
            }, {
                name: "explosion2",
                start: 55460,
                end: 98060,
                rateVar: .5
            }, {
                name: "explosion3",
                start: 99561,
                end: 155031,
                rateVar: .5
            }, {
                name: "flag2",
                start: 156532,
                end: 227187,
                rateVar: 0
            }, {
                name: "flag3",
                start: 228688,
                end: 299343,
                rateVar: 0
            }, {
                name: "flag4",
                start: 300844,
                end: 380459,
                rateVar: 0
            }, {
                name: "impact1",
                start: 381960,
                end: 388532,
                rateVar: 0
            }, {
                name: "impact2",
                start: 390033,
                end: 394313,
                rateVar: .2
            }, {
                name: "impact3",
                start: 395814,
                end: 401629,
                rateVar: .2
            }, {
                name: "item1",
                start: 403130,
                end: 405382,
                rateVar: .3
            }, {
                name: "jetpack1",
                start: 406883,
                end: 450982,
                rateVar: 0
            }, {
                name: "pickup1",
                start: 452483,
                end: 461162,
                rateVar: 0
            }, {
                name: "plane1",
                start: 462663,
                end: 605848,
                rateVar: 0
            }, {
                name: "reload2",
                start: 607349,
                end: 624153,
                rateVar: .2
            }, {
                name: "reload3",
                start: 625654,
                end: 645090,
                rateVar: .2
            }, {
                name: "reload4",
                start: 646591,
                end: 650218,
                rateVar: .2
            }, {
                name: "reload5",
                start: 651719,
                end: 672918,
                rateVar: .2
            }, {
                name: "rope1",
                start: 674419,
                end: 680088,
                rateVar: .2
            }, {
                name: "shot1",
                start: 681589,
                end: 698124,
                rateVar: 0
            }, {
                name: "shot2",
                start: 699625,
                end: 716494,
                rateVar: .3
            }, {
                name: "shot3",
                start: 717995,
                end: 755327,
                rateVar: .3
            }, {
                name: "shot4",
                start: 756828,
                end: 770306,
                rateVar: .1
            }, {
                name: "shot5",
                start: 771807,
                end: 808814,
                rateVar: .1
            }, {
                name: "shot6",
                start: 810315,
                end: 813886,
                rateVar: 0
            }, {
                name: "tree1",
                start: 815387,
                end: 903065,
                rateVar: .5
            }, {
                name: "trigger1",
                start: 904566,
                end: 908334,
                rateVar: 0
            }, {
                name: "walk1",
                start: 909835,
                end: 913513,
                rateVar: .1
            }, {
                name: "water1",
                start: 915014,
                end: 923301,
                rateVar: .5
            }, {
                name: "water2",
                start: 924802,
                end: 1057101,
                rateVar: .2
            }]
        }, {}],
        15: [function(t, e, i) {
            e.exports = {
                ball: "precision mediump float;\r\nuniform sampler2D texBorder;\r\nuniform sampler2D texFlag;\r\nuniform sampler2D texEyes;\r\nuniform sampler2D texGlasses;\r\n\r\nvarying vec2 v_TextureCoord;\r\n\r\nuniform vec2 flagTexOffset;\r\nuniform vec2 flagTexSize;\r\n\r\nuniform vec2 glassesTexOffset;\r\nuniform vec2 glassesTexSize;\r\n\r\nuniform vec2 eyeOffset;\r\nuniform vec2 eyePos;\r\nuniform float eyeLeftAngle;\r\nuniform float eyeRightAngle;\r\nuniform float eyeSize;\r\nuniform bool flagInvert;\r\n\r\nbool mirror;\r\n\r\nconst vec2 fisheyeCenter = vec2(0.5, 0.5);\r\nconst vec2 fisheyeScale = vec2(-0.5, -0.5);\r\n\r\nconst mat3 cubeFlag0 = mat3(\r\n\tvec3(1.297, -0.008, 0),\r\n\tvec3(-0.005, 1.340, 0),\r\n\tvec3(-0.258, -0.273, 1)\r\n);\r\n\r\nconst mat3 cubeFlag1 = mat3(\r\n\tvec3(1.31579, 0, 0),\r\n\tvec3(-1.30777, 6.09756, 0),\r\n\tvec3(-0.013, -0.195, 1)\r\n);\r\n\r\nconst mat3 cubeFlag2 = mat3(\r\n\tvec3(6.344, -1.377, 0.0),\r\n\tvec3(0.0, 1.338, 0.0),\r\n\tvec3(-0.184, 0.023, 1.0)\r\n);\r\n\r\nconst mat3 mirrorMatrix = mat3(\r\n\tvec3(-1, 0, 0),\r\n\tvec3(0, 1, 0),\r\n\tvec3(1, 0, 1)\r\n);\r\n\r\n\r\nfloat distSquared(vec2 a, vec2 b)\r\n{\r\n\tfloat diffX = a.x - b.x;\r\n\tfloat diffY = a.y - b.y;\r\n\r\n\treturn diffX * diffX + diffY * diffY;\r\n}\r\n\r\nbool useGlasses()\r\n{\r\n\treturn glassesTexSize != vec2(0.0);\r\n}\r\n\r\nvec4 getTexelGlasses(vec4 rgba, vec2 coord)\r\n{\r\n\tvec2 textureCoordinateToUse = coord * 0.8 + vec2(0.1);\r\n\ttextureCoordinateToUse.x += -eyePos.x + 0.5;\r\n\ttextureCoordinateToUse.y += -eyePos.y + 0.4;\r\n\r\n\tvec4 texel = texture2D(texGlasses, textureCoordinateToUse * glassesTexSize + glassesTexOffset);\r\n\ttexel *= rgba.a;\r\n\r\n\treturn mix(rgba, texel, texel.a);\r\n}\r\n\r\nvec4 getTexelPath(vec2 coord)\r\n{\r\n#if PATHTYPE == 0\r\n\t\tcoord += vec2(0.0, 1.0);\r\n#elif PATHTYPE == 1\r\n\t\tif(mirror) coord = vec2(1.0 - coord.x, coord.y);\r\n#elif PATHTYPE == 2\r\n\t\tif(mirror) coord = vec2(1.0 - coord.x, coord.y);\r\n\t\tcoord += vec2(1.05, 0.0);\r\n#endif\r\n\r\n\treturn texture2D(texBorder, coord * 0.5);\r\n}\r\n\r\nvec4 getTexelCube(vec3 coord3, mat3 transform)\r\n{\t\t\t\t\r\n\tvec3 flagCoord;\r\n\r\n\tif(mirror) coord3 = vec3(1.0 - coord3.x, coord3.y, coord3.z);\r\n\t\r\n\tflagCoord = transform * coord3;\r\n\t \r\n\r\n\tif(flagCoord.x < 0.0 || flagCoord.x > 1.0 || flagCoord.y < 0.0 || flagCoord.y > 1.0)\r\n\t{\r\n\t\treturn vec4(0.0);\r\n\t}\r\n\telse\r\n\t{\r\n\t\treturn texture2D(texFlag, flagCoord.xy * flagTexSize + flagTexOffset);\r\n\t}\r\n}\r\n\r\nvec4 getTexelFlag(vec2 coord)\r\n{\r\n#if PATHTYPE == 0\r\n\t\tvec2 textureCoordinateToUse = coord;\r\n\t\t\r\n\t\tfloat dist = distance(fisheyeCenter, textureCoordinateToUse);\r\n\t\ttextureCoordinateToUse -= fisheyeCenter;\r\n\r\n\t\tvec2 percent = vec2(1.0) + ((0.5 - dist) / 0.5) * fisheyeScale;\r\n\t\ttextureCoordinateToUse = textureCoordinateToUse * percent + fisheyeCenter;\r\n\r\n\t\treturn texture2D(texFlag, textureCoordinateToUse * flagTexSize + flagTexOffset);\r\n#elif PATHTYPE == 1\r\n\t\tfloat cubeFactor = 0.76;\r\n\t\tfloat cubeOffset = 0.26;\r\n\t\tvec4 cubeColor = vec4(1.0);\r\n\r\n\t\tvec3 coord3 = vec3(coord, 1.0);\r\n\r\n\t\tvec4 texel0 = getTexelCube(coord3, cubeFlag0);\r\n\t\tvec4 texel1 = getTexelCube(coord3, cubeFlag1);\r\n\t\tvec4 texel2 = getTexelCube(coord3, cubeFlag2);\r\n\r\n\t\ttexel1.rgb *= 0.8;\r\n\t\ttexel2.rgb *= 0.6;\r\n\r\n\t\treturn texel0 + texel1 + texel2;\r\n#else \r\n\t\tif(mirror) coord = vec2(1.0 - coord.x, coord.y);\r\n\r\n\t\treturn texture2D(texFlag, coord * flagTexSize + flagTexOffset);\r\n#endif\r\n}\r\n\r\nvec4 getTexelEye(vec2 eyePos, vec4 rgba, mat2 rotMatrix, bool invert)\r\n{\r\n\tfloat halfEyeSize = eyeSize / 2.0;\r\n\r\n\tvec2 shiftedTexCoord = v_TextureCoord - eyePos;\r\n\tvec2 rotatedTexCoord = shiftedTexCoord * rotMatrix;\r\n\r\n\r\n\tif( rotatedTexCoord.x >= -halfEyeSize && rotatedTexCoord.x <= halfEyeSize && \r\n\t\trotatedTexCoord.y >= -halfEyeSize && rotatedTexCoord.y <= halfEyeSize )\r\n\t{\r\n\t\tvec2 windowEyeCoord = (rotatedTexCoord + halfEyeSize) / eyeSize;\r\n\r\n\t\tif(invert)\r\n\t\t{\r\n\t\t\twindowEyeCoord.x = 1.0 - windowEyeCoord.x;\r\n\t\t}\r\n\r\n\t\tvec2 projectedEyeCoord = eyeOffset + windowEyeCoord / 4.0;\r\n\r\n\t\tvec4 texelEye = texture2D(texEyes, projectedEyeCoord);\r\n\r\n\t\tvec3 eyeResult = (texelEye.rgb * texelEye.a) + (rgba.rgb * (1.0 - texelEye.a));\r\n\r\n\t\treturn vec4(eyeResult.rgb, rgba.a);\r\n\t}\r\n\r\n\treturn rgba;\r\n}\r\n\r\nmat2 getEyeRotationMatrix(float a)\r\n{\r\n\tfloat c = cos(a);\r\n\tfloat s = sin(a);\r\n\treturn mat2(c, s, -s, c);\r\n}\r\n\r\nvoid main()\r\n{\r\n\tvec2 flagCoord = v_TextureCoord;\r\n\tif(flagInvert) flagCoord.y = 1.0 - flagCoord.y;\r\n\r\n\tmirror = eyePos.x < 0.5;\r\n\r\n\tvec2 shadowPoint = vec2(0.67, 0.32);\r\n\tvec4 texelBorder = getTexelPath(v_TextureCoord);\r\n\tvec4 texelFlag = getTexelFlag(flagCoord);\r\n\t\r\n\r\n\tfloat shadowFactor = 1.0;\r\n\tfloat alpha = texelBorder.a;\r\n\tfloat strength = (texelBorder.r + texelBorder.g + texelBorder.b) / 3.0;\r\n\r\n#if PATHTYPE == 0\r\n\t\tif(distSquared(v_TextureCoord, shadowPoint) > (0.5 * 0.5))\r\n\t\t{\r\n\t\t\tshadowFactor = 0.85;\r\n\t\t}\r\n\t\telse\r\n\t\t{\r\n\t\t\tshadowFactor = 1.10;\r\n\t\t}\r\n#elif PATHTYPE == 1 || PATHTYPE == 2\r\n\t\tshadowFactor = 1.0;\r\n#endif\r\n\r\n\tvec4 result = texelFlag.rgba * strength * shadowFactor;\r\n\tresult.a = alpha;\r\n\r\n\r\n\tif(useGlasses())\r\n\t{\r\n\t\tresult = getTexelEye(eyePos - vec2(0.19, 0.0), result, getEyeRotationMatrix(eyeLeftAngle), false);\r\n\t\tresult = getTexelEye(eyePos + vec2(0.19, 0.0), result, getEyeRotationMatrix(eyeRightAngle), true);\r\n\t\tresult = getTexelGlasses(result, v_TextureCoord);\r\n\t}\r\n\telse\r\n\t{\r\n\t\tresult = getTexelEye(eyePos - vec2(0.19, 0.0), result, getEyeRotationMatrix(eyeLeftAngle), false);\r\n\t\tresult = getTexelEye(eyePos + vec2(0.19, 0.0), result, getEyeRotationMatrix(eyeRightAngle), true);\r\n\t}\r\n\t\r\n\r\n\tgl_FragColor = result;\r\n}",
                bgF: "precision mediump float;\r\nvarying vec2 v_TextureCoord;\r\nuniform sampler2D texBg;\r\nuniform vec2 screenFactor;\r\nuniform vec2 offset;\r\n\r\nuniform vec4 skyColor;\r\nuniform vec4 skyColor2;\r\nuniform vec4 fogColor;\r\nuniform float fogStart;\r\nuniform float brightness;\r\n\r\nuniform vec2 sunOffset;\r\nuniform float sunSize;\r\nuniform float sunScrollFactor;\r\n\r\nconst int beamSamples = 32;\r\n\r\n\r\nvec4 getSkyColor(vec2 coord)\r\n{\r\n\treturn mix(skyColor2, skyColor, coord.y * 2.0);\r\n}\r\n\r\nvec3 saturation(vec3 rgb, float adjustment)\r\n{\r\n\tconst vec3 W = vec3(0.2125, 0.7154, 0.0721);\r\n\tvec3 intensity = vec3(dot(rgb, W));\r\n\treturn mix(intensity, rgb, adjustment);\r\n}\r\n\r\nvec4 getMainTexture(vec2 coord, out float inservedMainAlpha)\r\n{\r\n\tvec4 mainTexture = texture2D(texBg, coord);\r\n\tmainTexture.rgb = saturation(mainTexture.rgb, 0.6);\r\n\r\n\tinservedMainAlpha = 1.0 - mainTexture.a;\r\n\r\n\tmainTexture.rgb *= mainTexture.a * brightness;\r\n\tmainTexture.rgb += getSkyColor(coord).rgb * inservedMainAlpha;\r\n\tmainTexture.a = 1.0;\r\n\r\n\treturn mainTexture;\r\n}\r\n\r\nfloat getBeamStrength(vec2 to, float inversedMainTextureAlpha)\r\n{\r\n\tvec2 from = (offset + sunOffset) * sunScrollFactor;\r\n\tvec2 distance = to - from;\r\n\tfloat l = length(distance);\r\n\tfloat maxLength = 0.25;\r\n\r\n\tif(l > maxLength) distance = distance / l * maxLength;\r\n\r\n\r\n\tfloat fcount = float(beamSamples);\r\n\r\n\tvec2 delta = distance / fcount;\r\n\tvec2 current = from;\r\n\r\n\t// sample beam\r\n\tfloat light = 0.0;\r\n\r\n\tfor(int i = 0; i < beamSamples; i++)\r\n\t{\r\n\t\tlight += texture2D(texBg, current).a;\r\n\r\n\t\tcurrent += delta;\r\n\t}\r\n\r\n\t// calculate distance curve\r\n\tfloat distanceFactor = 0.0;\r\n\tfloat adjustedLength = l * 16.0;\r\n\tfloat thresholdFactor = 0.5;\r\n\tfloat spreadLengthFactor = 0.03;\r\n\r\n\tif(adjustedLength < 3.1415)\r\n\t{\r\n\t\tdistanceFactor = (cos(adjustedLength) + 1.0) + thresholdFactor;\r\n\t}\r\n\telse\r\n\t{\r\n\t\tdistanceFactor = thresholdFactor - (adjustedLength - 3.1415) * spreadLengthFactor;\r\n\t\tdistanceFactor = max(distanceFactor, 0.0);\r\n\t}\r\n\r\n\t// light rays and blooms\r\n\tlight = 1.0 - (light / fcount);\r\n\tlight = light * distanceFactor;\r\n\r\n\t// sun base\r\n\tlight += (2.0 - l * 12.0) * inversedMainTextureAlpha;\r\n\r\n\t// clip\r\n\tlight = clamp(light, 0.0, 1.0);\r\n\r\n\treturn light;\r\n}\r\n\r\nvoid main()\r\n{\r\n\tvec4 result;\r\n\tvec2 coord = v_TextureCoord * screenFactor + offset;\r\n\tfloat inversedMainTextureAlpha = 1.0;\r\n\r\n\tif(coord.y < 0.001)\r\n\t{\r\n\t\tresult = getSkyColor(coord);\r\n\t}\r\n\telse if(coord.y > 1.0)\r\n\t{\r\n\t\tresult = fogColor;\r\n\t\tinversedMainTextureAlpha = 0.0;\r\n\t}\r\n\telse\r\n\t{\r\n\t\tresult = getMainTexture(coord, inversedMainTextureAlpha);\r\n\r\n\t\tif(coord.y > fogStart)\r\n\t\t{\r\n\t\t\tfloat fogSize = 1.0 - fogStart;\r\n\t\t\tfloat fogFactor = (coord.y - fogStart) / fogSize;\r\n\r\n\t\t\tresult = mix(result, fogColor, fogFactor);\r\n\t\t}\r\n\t}\r\n\r\n#if LOWGFX == 0\r\n\tfloat beamStrength = getBeamStrength(coord, inversedMainTextureAlpha);\r\n\r\n\t// mix sunlight in\r\n\tresult = mix(result, vec4(1.0, 1.0, 1.0, 1.0), beamStrength);\r\n#endif\r\n\t\r\n\tgl_FragColor = result;\r\n}",
                bgV: "precision mediump float;\r\nuniform mat4 u_MVPMatrix;\r\n\r\nattribute vec2 a_Pos;\r\nattribute vec2 a_Coord;\r\n\r\nvarying vec2 v_TextureCoord;\r\n\r\nvoid main(void) {\r\n\tv_TextureCoord = a_Coord;\r\n\tgl_Position = u_MVPMatrix * vec4(a_Pos, 0.0, 1.0);\r\n}",
                blast: "precision mediump float;\r\nvarying vec2 v_TextureCoord;\r\nuniform sampler2D texFrame;\r\nuniform sampler2D texData;\r\nuniform vec2 screenSize;\r\nuniform vec2 screenOffset;\r\n\r\nconst int dataSize = 8;\r\nconst float pi = 3.14159265;\r\n\r\n\r\nfloat angleDiff(float a, float b)\r\n{\r\n\tfloat d = mod(abs(a - b), 360.0);\r\n\tfloat r = d > pi ? (pi * 2.0) - d : d;\r\n\r\n\t//calculate sign \r\n\tfloat sign = (a - b >= 0.0 && a - b <= pi) || (a - b <=-pi && a - b >= -(pi * 2.0) )  ? 1.0 : -1.0;\r\n\r\n\treturn r * sign;\r\n}\r\n\r\nbool blast(vec4 data, inout vec4 composed)\r\n{\r\n\tvec2 blastPos = vec2(data.x, data.y) - screenOffset;\r\n\tblastPos.y = screenSize.y - blastPos.y;\r\n\tblastPos /= screenSize;\r\n\r\n\r\n\tfloat progress = data.b;\r\n\tfloat strength = data.a;\r\n\tfloat progressTimesStrength = progress * strength;\r\n\r\n\tvec2 diff = (v_TextureCoord - blastPos);\r\n\tvec2 diffScreen = diff * screenSize;\r\n\tfloat lengthOnScreen = length(diffScreen);\r\n\r\n\tfloat borderRadius = progressTimesStrength * 6.0;\r\n\tfloat borderWidthPerDirection = progressTimesStrength;\r\n\r\n\tborderWidthPerDirection = max(borderWidthPerDirection, 30.0);\r\n\r\n\tfloat borderMin = (borderRadius - borderWidthPerDirection);\r\n\tfloat borderMax = (borderRadius + borderWidthPerDirection);\r\n\r\n\r\n\tif(lengthOnScreen > borderMin && lengthOnScreen < borderMax)\r\n\t{\r\n\t\tfloat change = sin( (borderMax - lengthOnScreen) / borderWidthPerDirection * (pi / 2.0) ) / 3.0;\r\n\t\tdiff *= 1.0 - change * (1.0 - progress);\r\n\r\n\t\tcomposed += texture2D(texFrame, blastPos + diff);\r\n\r\n\t\treturn true;\r\n\t}\r\n\telse\r\n\t{\r\n\t\treturn false;\r\n\t}\r\n}\r\n\r\nbool circulation(vec4 data, inout vec4 composed, vec4 originalColor)\r\n{\r\n\tfloat x = data.r;\r\n\tfloat y = data.g;\r\n\tfloat a = data.b;\r\n\tfloat l = data.a;\r\n\r\n\tvec2 basePos = vec2(data.x, data.y) - screenOffset;\r\n\tbasePos.y = screenSize.y - basePos.y;\r\n\tbasePos /= screenSize;\r\n\r\n\tvec2 diff = (v_TextureCoord - basePos);\r\n\tvec2 diffScreen = diff * screenSize;\r\n\tfloat distance = length(diff);\r\n\tfloat distanceOnScreen = length(diffScreen);\r\n\r\n\ta = atan(cos(a), sin(a));\r\n\r\n\tvec2 pixelToBase = basePos - v_TextureCoord;\r\n\tvec2 pixelToBaseScreen = pixelToBase * screenSize;\r\n\tfloat a2 = atan(pixelToBaseScreen.y, pixelToBaseScreen.x);\r\n\r\n\r\n\tfloat alpha = angleDiff(a, a2);\r\n\r\n\tfloat halfScattering = 20.0 / l;\r\n\r\n\tif(distanceOnScreen < l && alpha < halfScattering && alpha > -halfScattering )\r\n\t{\r\n\t\tfloat curve = 1.0 - abs(alpha) / halfScattering;\r\n\t\tfloat realLengthProgress = distanceOnScreen / l;\r\n\t\tfloat lengthProgress = max(0.0, realLengthProgress * 5.0 - 4.0);\r\n\t\tfloat reverseLengthProgress = 1.0 - lengthProgress;\r\n\t\tfloat ring = 0.5 + (sin(realLengthProgress * l / 4.0) + 1.0) * 0.25;\r\n\t\tfloat strength = distanceOnScreen * distanceOnScreen;\r\n\r\n\t\tvec2 changeAbsolute = vec2(cos(a2 + 1.57), sin(a2 + 1.57)) * strength / l * alpha * 0.01 * curve * ring;\r\n\r\n\t\t// mix\r\n\t\tvec4 displacedColor = texture2D(texFrame, basePos + diff + changeAbsolute);\r\n\t\tvec4 mixedColor = mix(originalColor, displacedColor, reverseLengthProgress);\r\n\r\n\t\t// compose\r\n\t\tcomposed += mixedColor;\r\n\r\n\t\treturn true;\r\n\t}\r\n\telse\r\n\t{\r\n\t\treturn false;\r\n\t}\r\n}\r\n\r\n\r\nvoid main()\r\n{\r\n\tvec4 composed = vec4(0.0);\r\n\tfloat affectCount = 0.0;\r\n\r\n\tvec4 originalColor = texture2D(texFrame, v_TextureCoord);\r\n\r\n\t// do blasts\r\n\tfor(int i = 0; i < dataSize; i++)\r\n\t{\r\n\t\tvec4 data = texture2D(texData, vec2(float(i) / float(dataSize), 0.0));\r\n\r\n\t\tif(data.b >= 0.0) // progress over 0?\r\n\t\t{\r\n\t\t\tif(blast(data, composed))\r\n\t\t\t{\r\n\t\t\t\taffectCount += 1.0;\t\t\t\t\t\t\t\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n\r\n\t// do circualtions\r\n\tfor(int i = 0; i < dataSize; i++)\r\n\t{\r\n\t\tvec4 data = texture2D(texData, vec2(float(i) / float(dataSize), 1.0 / float(dataSize)) );\r\n\t\t\r\n\t\tif(data.a > 0.0) // length over 0?\r\n\t\t{\r\n\t\t\tif(circulation(data, composed, originalColor))\r\n\t\t\t{\r\n\t\t\t\taffectCount += 1.0;\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n\r\n\t// final composing\r\n\tif(affectCount > 0.0)\r\n\t{\r\n\t\tgl_FragColor = composed / affectCount;\r\n\t}\r\n\telse\r\n\t{\r\n\t\tgl_FragColor = originalColor;\r\n\t}\r\n}",
                compose: "precision mediump float;\r\nvarying vec2 v_TextureCoord;\r\nuniform sampler2D texBg;\r\nuniform sampler2D texGame;\r\nuniform sampler2D texData;\r\nuniform float time;\r\nuniform float waterLevel;\r\nuniform float bwFactor;\r\nuniform vec2 screenSize;\r\nuniform vec2 screenOffset;\r\n\r\nconst int lightSamples = 8;\r\nconst int dataSize = 8;\r\nconst float lightDeepness = 4.0;\r\nconst vec3 lightColor = vec3(1.0, 0.7, 0.3);\r\n\r\nfloat lightSingle(vec2 coord, vec2 lightPos, float str, float len)\r\n{\r\n\t// transform light pos\r\n\tvec2 transformedLightPos = (lightPos - screenOffset) / screenSize;\r\n\ttransformedLightPos.y = 1.0 - transformedLightPos.y;\r\n\r\n\t// calculate brightness\r\n\tvec2 diff = (v_TextureCoord - transformedLightPos);\r\n\tvec2 diffScreen = diff * screenSize;\r\n\tfloat lengthOnScreen = length(diffScreen);\r\n\tfloat brightness = clamp(1.0 - (lengthOnScreen / len), 0.0, 1.0);\r\n\r\n\tbrightness *= str;\r\n\r\n\tif(brightness < 0.0001) return 0.0;\r\n\r\n\t// sample edges\r\n\tvec2 sampleStep = -diff / 40.0;\r\n\tfloat sampleStepLength = length(sampleStep);\r\n\tfloat pixelSizeX = 1.0 / screenSize.x;\r\n\tfloat maxSampleStep = (pixelSizeX * lightDeepness);\r\n\tif(sampleStepLength > maxSampleStep) sampleStep = sampleStep / sampleStepLength * maxSampleStep;\r\n\r\n\tvec2 current = coord;\r\n\t\r\n\tfloat edgeValue = 0.0;\r\n\r\n\tfor(int i = 0; i < lightSamples; i++)\r\n\t{\r\n\t\tcurrent += sampleStep;\r\n\r\n\t\tedgeValue += 1.0 - texture2D(texGame, current).a;\r\n\t}\r\n\r\n\treturn clamp(edgeValue / float(lightSamples) * brightness, 0.0, 1.0);\r\n}\r\n\r\nfloat lightAll(vec2 coord)\r\n{\r\n\tvec4 data = texture2D( texData, vec2(float(0) / float(dataSize), 2.0 / float(dataSize)) );\r\n\r\n\treturn lightSingle(coord, data.xy, data.a, data.b); // only render first light. propably enough.\r\n}\r\n\r\nfloat wave(float t, float x, float a)\r\n{\r\n\treturn sin( (x - (t + a) * 30.0) / 20.0) * 10.0 * sin(t * 5.0);\r\n}\r\n\r\nvec2 waveDisplacement(vec2 wave, float t)\r\n{\r\n\treturn vec2(\r\n\t\tsin( (wave.x + t * 1.74) * 0.84) +\r\n\t\tsin( (wave.x + t * 1.32) * 1.23) +\r\n\t\tsin( (wave.x + t) * 2.09) +\r\n\t\tsin( (wave.x + t) * 1.53),\r\n\r\n\t\tsin( (wave.y + t * 1.53) * 0.95) +\r\n\t\tsin( (wave.y + t * 1.12) * 1.69) * 2.4 +\r\n\t\tsin( (wave.y + t) * 3.19) * 2.1 +\r\n\t\tsin( (wave.y + t) * 1.42) * 3.0\r\n\t) * 0.001;\r\n}\r\n\r\nvec4 getTexBackground(vec2 coord)\r\n{\r\n\treturn texture2D(texBg, coord);\r\n}\r\n\r\nvec4 getTexForeground(vec2 coord)\r\n{\r\n\treturn texture2D(texGame, coord);\r\n}\r\n\r\nvec4 getComposed(vec2 coord)\r\n{\r\n\tvec4 fg = getTexForeground(coord);\r\n\tvec4 bg = getTexBackground(coord);\r\n\t\r\n\tvec3 color = fg.rgb;\r\n\r\n#if LOWGFX == 0\r\n\t// add light\r\n\tif(fg.a > 0.95)\r\n\t{\r\n\t\tcolor += lightColor * min(lightAll(coord), 1.0) * fg.a;\r\n\t}\r\n#endif\r\n\r\n\tcolor = mix(bg.rgb, color, fg.a);\r\n\r\n\treturn vec4(color, 1.0);\r\n}\r\n\r\nvec4 makeBlackWhite(vec4 original)\r\n{\r\n\tif(bwFactor <= 0.0) return original;\r\n\r\n\tfloat avg = (original.r + original.g + original.b) / 3.0;\r\n\r\n\treturn vec4(mix(original.rgb, vec3(avg), bwFactor), 1.0);\r\n}\r\n\r\nvoid main()\r\n{\r\n\tvec2 flippedPos = vec2(v_TextureCoord.x, 1.0 - v_TextureCoord.y);\r\n\tvec2 coord = vec2(v_TextureCoord.x, v_TextureCoord.y);\r\n\tvec2 pos = v_TextureCoord * screenSize + screenOffset;\r\n\r\n\tvec4 texelBg = texture2D(texBg, coord);\r\n\tvec4 texelGame = texture2D(texGame, coord);\r\n\r\n\tvec4 color = vec4(mix(texelBg.rgb, texelGame.rgb, texelGame.a), 1.0);\r\n\tfloat waterWidth = max(0.0, (flippedPos.y - 0.1) * 60.0);\r\n\t\r\n\tfloat waterLine0 = waterLevel;\r\n\tfloat waterLine1 = waterLine0 + wave(time, pos.x, 0.0);\r\n\tfloat waterLine2 = waterLine0 + wave(time, pos.x, 0.0) - waterWidth;\r\n\tfloat waterLine3 = waterLine0 + wave(time, pos.x, 0.0) - waterWidth * 2.0;\r\n\tfloat waterLineCoord0 = (waterLine0 - screenOffset.y) / screenSize.y;\r\n\tfloat waterLineCoord1 = (waterLine1 - screenOffset.y) / screenSize.y;\r\n\tfloat waterLineCoord2 = (waterLine2 - screenOffset.y) / screenSize.y;\r\n\tfloat waterLineCoord3 = (waterLine3 - screenOffset.y) / screenSize.y;\r\n\r\n\r\n\tbool underLine1 = flippedPos.y > waterLineCoord1;\r\n\tbool underLine2 = flippedPos.y > waterLineCoord2;\r\n\tbool underLine3 = flippedPos.y > waterLineCoord3;\r\n\t\r\n\tvec2 displacement = waveDisplacement(pos / 50.0, time * 2.0);\r\n\tvec2 mirrorCoord = vec2(coord.x, 1.0 - (waterLineCoord2 - (flippedPos.y - waterLineCoord2)) ) + displacement;\r\n\r\n\tfloat fadeOutAlpha = 1.0;\r\n\tfloat alpha = (flippedPos.y - waterLineCoord0) * 5.0;\r\n\r\n\tif(underLine3) // is in water?\r\n\t{\r\n\t\tif(waterLineCoord0 < 0.4)\r\n\t\t{\r\n\t\t\tfadeOutAlpha = clamp( (waterLineCoord0 - 0.2) * 5.0, 0.0, 1.0);\r\n\t\t}\r\n\r\n\t\talpha = clamp(1.0 - alpha, 0.0, 1.0) * fadeOutAlpha;\r\n\t}\r\n\r\n\tif(underLine1)\r\n\t{\r\n\t\tvec4 mirrorTexel = getComposed(mirrorCoord) * 0.4 * alpha;\r\n\t\tcolor = mix(mirrorTexel, vec4(0.0, 0.15, 0.6, 1.0), 0.5);\r\n\t}\r\n\telse if(underLine2)\r\n\t{\r\n\t\tvec4 mirrorTexel = getComposed(mirrorCoord) * alpha;\r\n\r\n\t\tcolor = mix(mirrorTexel, vec4(0.2, 0.4, 0.9, 1.0), 0.5);\r\n\t}\r\n\telse if(underLine3)\r\n\t{\r\n\t\tvec4 mirrorTexel = getTexBackground(mirrorCoord) * alpha;\r\n\r\n\t\tvec4 waterColor = mix(mirrorTexel, vec4(0.2, 0.4, 0.9, 1.0), 0.5);\r\n\t\tvec4 fgColor = getTexForeground(v_TextureCoord);\r\n\r\n\t\tcolor = vec4(mix(waterColor.rgb, fgColor.rgb, fgColor.a), 1.0);\r\n\t}\r\n\telse\r\n\t{\r\n\t\tcolor = getComposed(v_TextureCoord);\r\n\t}\r\n\r\n\tgl_FragColor = makeBlackWhite(color);\r\n}",
                flag: "precision mediump float;\r\nvarying vec2 v_TextureCoord;\r\nuniform float time;\r\nuniform bool mirror;\r\nuniform vec4 color;\r\n\r\nvoid main()\r\n{\r\n\tfloat margin = 0.16;\r\n\tvec2 coord = v_TextureCoord;\r\n\tif(mirror) coord.x = 1.0 - coord.x;\r\n\r\n\tfloat offset = coord.x * sin(-coord.x * 10.0 + time * 10.0);\r\n\r\n\tfloat y0 = margin + offset / 10.0;\r\n\tfloat y1 = 1.0 - margin + offset / 10.0;\r\n\r\n\tvec4 texel = color;\r\n\ttexel -= (offset / 10.0 + 0.1);\r\n\r\n\tif(coord.y < y0 || coord.y > y1)\r\n\t{\r\n\t\tgl_FragColor = vec4(0);\r\n\t}\r\n\telse\r\n\t{\r\n\t\ttexel.a = 1.0;\r\n\t\tgl_FragColor = texel;\r\n\t}\t\t\t\t\r\n}",
                map: "precision mediump float;\r\nvarying vec2 v_TextureCoord;\r\nuniform sampler2D texData;\r\nuniform sampler2D texAtlas;\r\nuniform vec2 screenSize;\r\nuniform vec2 offset;\r\nuniform vec4 borderColor;\r\nuniform float mapSizeMax;\r\nuniform vec2 mapSize;\r\nuniform float atlasEdgeSize;\r\n\r\nconst float tileSize = 64.0;\r\n\r\n\r\nvec4 sampleTexture(sampler2D sampler, vec2 coord, float texSize)\r\n{\r\n\treturn texture2D(sampler, (floor(coord * texSize) + 0.5) / texSize);\r\n}\r\n\r\n\r\nvoid main()\r\n{\t\r\n\tvec2 atlasCoord = (v_TextureCoord * screenSize + offset) / mapSizeMax / tileSize;\r\n\tvec2 intraTile = mod(atlasCoord * mapSizeMax, 1.0);\r\n\tvec2 atlasEndCoord = mapSize / mapSizeMax;\r\n\t\r\n\tif(atlasCoord.x >= 0.0 && atlasCoord.x <= atlasEndCoord.x && atlasCoord.y >= 0.0 && atlasCoord.y <= atlasEndCoord.y)\r\n\t{\r\n\t\tvec4 data = sampleTexture(texData, atlasCoord, mapSizeMax);\r\n\t\tvec2 atlasSubTexBase = vec2(floor(data * atlasEdgeSize) / atlasEdgeSize);\r\n\t\t\r\n\t\tif(data.a > 0.5)\r\n\t\t{\r\n\t\t\tgl_FragColor = sampleTexture(texAtlas, atlasSubTexBase + intraTile / atlasEdgeSize, atlasEdgeSize * tileSize);\r\n\t\t}\r\n\t\telse\r\n\t\t{\r\n\t\t\tgl_FragColor = vec4(0);\r\n\t\t}\r\n\t}\r\n\telse\r\n\t{\r\n\t\tgl_FragColor = borderColor;\r\n\t}\r\n}",
                particleF: "precision mediump float;\r\n\r\nuniform sampler2D tex;\r\n\r\nvarying vec2 v_TextureCoord;\r\nvarying vec4 v_Color;\r\n\r\nvoid main()\r\n{\r\n\tvec4 texel = texture2D(tex, v_TextureCoord);\r\n\tfloat alpha = v_Color.a * texel.r;\r\n\r\n\tgl_FragColor = vec4(v_Color.rgb, alpha);\r\n}",
                particleV: "precision mediump float;\r\n\r\nuniform mat4 u_MVPMatrix;\r\n\r\nattribute vec2 a_Pos;\r\nattribute vec2 a_Coord;\r\nattribute vec4 a_Color;\r\n\r\nvarying vec4 v_Color;\t\t\t\r\nvarying vec2 v_TextureCoord;\r\n\t\t\r\nvoid main(void)\r\n{\r\n\tv_TextureCoord = a_Coord;\r\n\tv_Color = a_Color;\r\n\tgl_Position = u_MVPMatrix * vec4(a_Pos, 0.0, 1.0);\r\n}",
                postprocessing: "precision mediump float;\r\nuniform mat4 u_MVPMatrix;\r\n\r\nattribute vec2 a_Pos;\r\nattribute vec2 a_Coord;\r\n\r\nvarying vec2 v_TextureCoord;\r\n\t\t\r\nvoid main(void)\r\n{\r\n\tv_TextureCoord = a_Coord;\r\n\tgl_Position = vec4(a_Pos, 0.0, 1.0);\r\n}"
            }
        }, {}],
        16: [function(t, e, i) {
            var n, r;
            n = Handlebars.template, (r = Handlebars.templates = Handlebars.templates || {}).achievement = n({
                1: function(t, e, i, n) {
                    return e = this.lambda, '\t\t\t<div class="item ' + (i = this.escapeExpression)(e(null != t ? t.itemClass : t, t)) + '">\r\n\t\t\t\t<div class="cupImage"></div>\r\n\t\t\t\t<div class="txt txt1"><span class="v">' + i(e(null != t ? t.status : t, t)) + '</span></div>\r\n\t\t\t\t<div class="txt txt2"><span class="v">' + i(e(null != t ? t.name : t, t)) + '</span></div>\r\n\t\t\t\t<div class="txt txt3"><span class="v">' + i(e(null != t ? t.desc : t, t)) + "</span></div>\r\n\t\t\t</div>\r\n"
                },
                compiler: [6, ">= 2.0.0-beta.1"],
                main: function(t, e, i, n) {
                    var r;
                    return i = '<div class="inner">\r\n\t<div class="closeX">X</div>\r\n\t<div class="scroll achievementsList">\r\n', null != (r = e.each.call(t, null != t ? t.achievements : t, {
                        name: "each",
                        hash: {},
                        fn: this.program(1, n),
                        inverse: this.noop,
                        data: n
                    })) && (i += r), i + "\t</div>\r\n</div>"
                },
                useData: !0
            }), r.ballselect = n({
                compiler: [6, ">= 2.0.0-beta.1"],
                main: function(t, e, i, n) {
                    return '<div class="uiwindow nativeInput">\r\n\t<div class="ballselect">\r\n\t\t<div class="closeX">X</div>\r\n\t\t<div class="inputBox">\r\n\t\t\t<div class="ballSearch">\r\n\t\t\t\t<input placeholder="Search" />\r\n\t\t\t</div>\r\n\t\t\t<div class="ballList nativeScroll">\r\n\t\t\t\t<div class="ballListInner">\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class="clear"></div>\r\n\t\t\t</div>\r\n\t\t\t<div class="previewSection">\r\n\t\t\t\t<div class="previewShadow"></div>\r\n\t\t\t\t<canvas class="preview" width="256" height="256"></canvas>\r\n\t\t\t\t<div class="skinFailure">Need Level 99 for this skin</div>\r\n\t\t\t</div>\r\n\r\n\t\t\t<div class="skinSelect">\r\n\t\t\t\t<div class="skinHatList">\r\n\t\t\t\t\t<div class="label">Helmet</div>\r\n\t\t\t\t\t<div class="list"></div>\r\n\t\t\t\t</div>\r\n\r\n\t\t\t\t<div class="skinGlassesList">\r\n\t\t\t\t\t<div class="label">Glasses</div>\r\n\t\t\t\t\t<div class="list"></div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\r\n\t\t\t<div class="ctrl">\r\n\t\t\t\t<button class="cancel">Cancel</button>\r\n\t\t\t\t<button class="done">Done</button>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>'
                },
                useData: !0
            }), r.bg = n({
                compiler: [6, ">= 2.0.0-beta.1"],
                main: function(t, e, i, n) {
                    return '<img class="bg" src="/menubg/bg1.jpg" />\r\n<div class="bgTransition"></div>\r\n<div class="bgOverlay"></div>'
                },
                useData: !0
            }), r.browserwarning = n({
                compiler: [6, ">= 2.0.0-beta.1"],
                main: function(t, e, i, n) {
                    return '\r\n<div class="msg msgCookie">\r\n\t<div class="txt">This site uses cookies! By continuing to browse the site you are consenting to our use of cookies. <a href="/privacy">More information</a></div>\r\n\t<div class="closeX">OK</div>\r\n</div>\r\n\r\n<div class="msg msgBrowserIE">\r\n\tHey, you are using Internet Explorer or Edge? For best experience, try <strong>Firefox or Chrome</strong>!\r\n\t<div class="closeX">X</div>\r\n</div>\r\n\r\n<div class="msg msgBrowserOpera">\r\n\tHey, you are using Opera or Vivaldi? For best experience, try <strong>Firefox or Chrome</strong>!\r\n\t<div class="closeX">X</div>\r\n</div>\r\n\r\n<div class="msg msgBrowserYandex">\r\n\tHey, you are using <strong>Yandex</strong>? For best experience, try <strong>Firefox or Chrome</strong>!\r\n\t<div class="closeX">X</div>\r\n</div>\r\n\r\n<div class="msg msgBrowserOldChrome">\r\n\tHey, your <strong>Chrome browser</strong> is already very old. Please <strong>update</strong> to the latest version. Otherwise you will face <strong>bugs and lags</strong>!\r\n\t<div class="closeX">X</div>\r\n</div>\r\n\r\n<div class="msg msgMobile">\r\n\tHey, there is no support for touchscreen devices yet. Please play the game on a desktop browser like <strong>Firefox or Chrome</strong>!\r\n</div>\r\n\r\n<div class="msg msgLowFps">\r\n\tYour frame rate is very low. You can speed up the game by selecting <strong>Low Graphic Quality</strong> in the settings on the start page or using another browser! <a href="/lowfps">More information...</a>\r\n</div>'
                },
                useData: !0
            }), r.capture = n({
                compiler: [6, ">= 2.0.0-beta.1"],
                main: function(t, e, i, n) {
                    var r;
                    return i = e.helperMissing, '<div class="msg">\r\n\t<div class="flag"></div>\r\n\t<div class="txt">' + (0, this.escapeExpression)("function" == typeof(r = null != (r = e.msg || (null != t ? t.msg : t)) ? r : i) ? r.call(t, {
                        name: "msg",
                        hash: {},
                        data: n
                    }) : r) + "</div>\r\n</div>"
                },
                useData: !0
            }), r.chat = n({
                compiler: [6, ">= 2.0.0-beta.1"],
                main: function(t, e, i, n) {
                    return '<div class="wrap">\r\n\t<div class="messages">\r\n\t</div>\r\n\r\n\t<div class="inputArea">\r\n\t\t<div class="inner nativeInput blockGameInput">\r\n\t\t\t<span class="cmd"></span>\r\n\t\t\t<input type="text" maxlength="100" autocomplete="off" spellcheck="false"></input>\r\n\t\t</div>\r\n\t</div>\r\n\r\n\t<div class="inputTip">\r\n\t\t<div class="txt txt0">Press ENTER to chat</div>\r\n\t\t<div class="txt txt1">Press TAB to toggle between ALL and TEAM</div>\r\n\t</div>\r\n</div>'
                },
                useData: !0
            }), r["classic/friendrequests"] = n({
                1: function(t, e, i, n) {
                    return e = this.lambda, '\t<div class="request">\r\n\t\t<canvas class="playerDetail" data-type="avatar" data-player="' + (i = this.escapeExpression)(e(null != t ? t.name : t, t)) + '" width="64" height="64"></canvas>\r\n\r\n\t\t<div class="name"><a href="/profile/' + i(e(null != t ? t.name : t, t)) + '">' + i(e(null != t ? t.name : t, t)) + '</a></div>\r\n\r\n\t\t<div class="friendButtonContainer">\r\n\t\t\t<div class="friendButton" data-relation="' + i(e(null != t ? t.relation : t, t)) + '" data-player="' + i(e(null != t ? t.name : t, t)) + '"></div>\r\n\t\t</div>\r\n\t</div>\r\n'
                },
                3: function(t, e, i, n) {
                    return '\t<span class="red">No new incoming friend requests!</span>\r\n'
                },
                compiler: [6, ">= 2.0.0-beta.1"],
                main: function(t, e, i, n) {
                    var r;
                    return null != (r = e.each.call(t, null != t ? t.requests : t, {
                        name: "each",
                        hash: {},
                        fn: this.program(1, n),
                        inverse: this.program(3, n),
                        data: n
                    })) ? r : ""
                },
                useData: !0
            }), r["classic/highscore"] = n({
                1: function(t, e, i, n) {
                    var r;
                    return e = this.lambda, '\t\t<div class="myposition">Your position: <span class="v">' + (0, this.escapeExpression)(e(null != (r = null != t ? t.data : t) ? r.position : r, t)) + "</span></div>\r\n"
                },
                3: function(t, e, i, n) {
                    return '\t\t<div class="hint">Play to get listed in this highscore!</div>\r\n'
                },
                5: function(t, e, i, n) {
                    return e = this.lambda, '\t<div class="item ' + (i = this.escapeExpression)(e(null != t ? t.selfClass : t, t)) + '">\r\n\t\t<div class="position">' + i(e(null != t ? t.position : t, t)) + '</div>\r\n\r\n\t\t<canvas class="playerDetail" data-type="avatar" data-player="' + i(e(null != t ? t.player : t, t)) + '" width="64" height="64"></canvas>\r\n\r\n\t\t<div class="name"><a href="/profile/' + i(e(null != t ? t.player : t, t)) + '">' + i(e(null != t ? t.player : t, t)) + '</a></div>\r\n\r\n\t\t<div class="xp">' + i(e(null != t ? t.xp : t, t)) + '<span class="label">XP</span></div>\r\n\r\n\t\t\x3c!--<div class="friendButtonContainer">\r\n\t\t\t<div class="friendButton" data-relation="' + i(e(null != t ? t.relation : t, t)) + '" data-player="' + i(e(null != t ? t.player : t, t)) + '"></div>\r\n\t\t</div>--\x3e\r\n\t</div>\r\n'
                },
                compiler: [6, ">= 2.0.0-beta.1"],
                main: function(t, e, i, n) {
                    var r;
                    return i = '<div class="header">\r\n\t<div class="desc">Resets every sunday at 10:00am (UTC).</div>\r\n\r\n', null != (r = e.if.call(t, null != (r = null != t ? t.data : t) ? r.hasPosition : r, {
                        name: "if",
                        hash: {},
                        fn: this.program(1, n),
                        inverse: this.program(3, n),
                        data: n
                    })) && (i += r), i += "</div>\r\n\r\n", null != (r = e.each.call(t, null != (r = null != t ? t.data : t) ? r.table : r, {
                        name: "each",
                        hash: {},
                        fn: this.program(5, n),
                        inverse: this.noop,
                        data: n
                    })) && (i += r), i + '\r\n<div class="info">\r\n\tHighscore may be delayed by up to five minutes!\r\n</div>'
                },
                useData: !0
            }), r["classic/main"] = n({
                compiler: [6, ">= 2.0.0-beta.1"],
                main: function(t, e, i, n) {
                    var r, s;
                    i = e.helperMissing;
                    var a = this.escapeExpression;
                    return a = '<div class="main">\r\n\t<div class="head">\r\n\t\t<img src="/logo_dark.svg" class="logo" alt="kugeln.io" />\r\n\t\t<button class="play">Play</button>\r\n\r\n\t\t<div class="hr"></div>\r\n\r\n\t\t<h1>' + a("function" == typeof(s = null != (s = e.title || (null != t ? t.title : t)) ? s : i) ? s.call(t, {
                        name: "title",
                        hash: {},
                        data: n
                    }) : s) + '</h1>\r\n\t</div>\r\n\t<div class="content">\r\n\t\t', null != (r = "function" == typeof(s = null != (s = e.html || (null != t ? t.html : t)) ? s : i) ? s.call(t, {
                        name: "html",
                        hash: {},
                        data: n
                    }) : s) && (a += r), a + "\r\n\t</div>\r\n</div>"
                },
                useData: !0
            }), r["classic/messages"] = n({
                compiler: [6, ">= 2.0.0-beta.1"],
                main: function(t, e, i, n) {
                    return '<div class="msgBox">\r\n\t<div class="sectionOverview">\r\n\r\n\t</div>\r\n\t<div class="sectionContent">\r\n\t\t<div class="header">\r\n\t\t\t<canvas class="playerDetail" data-type="avatar" data-player="" width="48" height="48"></canvas>\r\n\t\t\t<div class="name"></div>\r\n\t\t\t<div class="buttons">\r\n\t\t\t\t<div class="profileButton"><div class="button">Profile</div></div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class="msgArea">\r\n\t\t\t<div class="msgAreaScroll">\r\n\t\t\t\r\n\t\t\t</div>\r\n\t\t\t<div class="msgEmpty">No message in this conversation yet. Send one!</div>\r\n\t\t</div>\r\n\t\t<div class="msgInput">\r\n\t\t\t<textarea placeholder="Enter new message..." maxlength="1000"></textarea>\r\n\t\t\t<div class="measureBox"></div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n\r\n<div class="noMessages">\r\n\tYou don\'t have any messages. Go to a friends profile and send one!\r\n</div>'
                },
                useData: !0
            }), r["classic/profile"] = n({
                1: function(t, e, i, n) {
                    var r, s;
                    i = e.helperMissing;
                    var a = this.escapeExpression,
                        o = this.lambda,
                        l = '\t<div class="summary">\r\n\t\t<canvas class="playerDetail playerAvatar" data-type="avatar" data-player="' + a("function" == typeof(s = null != (s = e.userName || (null != t ? t.userName : t)) ? s : i) ? s.call(t, {
                            name: "userName",
                            hash: {},
                            data: n
                        }) : s) + '" width="128" height="128"></canvas>\r\n\r\n';
                    return null != (r = e.if.call(t, null != t ? t.isLoggedIn : t, {
                        name: "if",
                        hash: {},
                        fn: this.program(2, n),
                        inverse: this.noop,
                        data: n
                    })) && (l += r), l += '\r\n\t\t<div class="playerProgress" data-level="' + a(o(null != (r = null != t ? t.breakdown : t) ? r.level : r, t)) + '" data-xp="' + a(o(null != (r = null != t ? t.breakdown : t) ? r.xp : r, t)) + '" data-xptotal="' + a("function" == typeof(s = null != (s = e.xpTotal || (null != t ? t.xpTotal : t)) ? s : i) ? s.call(t, {
                        name: "xpTotal",
                        hash: {},
                        data: n
                    }) : s) + '" data-percent="' + a("function" == typeof(s = null != (s = e.xpPercent || (null != t ? t.xpPercent : t)) ? s : i) ? s.call(t, {
                        name: "xpPercent",
                        hash: {},
                        data: n
                    }) : s) + '" data-lr="' + a("function" == typeof(s = null != (s = e.xpLr || (null != t ? t.xpLr : t)) ? s : i) ? s.call(t, {
                        name: "xpLr",
                        hash: {},
                        data: n
                    }) : s) + '">\r\n\t\t\t<div class="tooltip">\r\n\t\t\t\t<table>\r\n\t\t\t\t\t<tbody><tr><td>Level</td><td class="vLvl">1</td></tr>\r\n\t\t\t\t\t<tr><td>XP</td><td class="vXp">77/100</td></tr>\r\n\t\t\t\t</tbody></table>\r\n\t\t\t</div>\r\n\t\t\t<div class="xp">\r\n\t\t\t\t<div class="inner"></div>\r\n\t\t\t\t<div class="v">' + a("function" == typeof(s = null != (s = e.xpPercentReadable || (null != t ? t.xpPercentReadable : t)) ? s : i) ? s.call(t, {
                        name: "xpPercentReadable",
                        hash: {},
                        data: n
                    }) : s) + '%</div>\r\n\t\t\t</div>\r\n\t\t\t<div class="level lr' + a("function" == typeof(s = null != (s = e.xpLr || (null != t ? t.xpLr : t)) ? s : i) ? s.call(t, {
                        name: "xpLr",
                        hash: {},
                        data: n
                    }) : s) + '"><span class="v">' + a(o(null != (r = null != t ? t.breakdown : t) ? r.level : r, t)) + '</span></div>\r\n\t\t</div>\r\n\t</div>\r\n\r\n\t<h2>Achievements</h2>\r\n\t<div class="achievementsList">\r\n', null != (r = e.each.call(t, null != t ? t.achievements : t, {
                        name: "each",
                        hash: {},
                        fn: this.program(4, n),
                        inverse: this.program(6, n),
                        data: n
                    })) && (l += r), l + "\t</div>\r\n"
                },
                2: function(t, e, i, n) {
                    var r;
                    i = e.helperMissing;
                    var s = this.escapeExpression;
                    return '\t\t\t<div class="friendButtonContainer">\r\n\t\t\t\t<div class="friendButton" data-relation="' + s("function" == typeof(r = null != (r = e.friendRelation || (null != t ? t.friendRelation : t)) ? r : i) ? r.call(t, {
                        name: "friendRelation",
                        hash: {},
                        data: n
                    }) : r) + '" data-player="' + s("function" == typeof(r = null != (r = e.userName || (null != t ? t.userName : t)) ? r : i) ? r.call(t, {
                        name: "userName",
                        hash: {},
                        data: n
                    }) : r) + '"></div>\r\n\t\t\t\t<div class="messageButton" data-player="' + s("function" == typeof(r = null != (r = e.userName || (null != t ? t.userName : t)) ? r : i) ? r.call(t, {
                        name: "userName",
                        hash: {},
                        data: n
                    }) : r) + '"></div>\r\n\t\t\t</div>\r\n'
                },
                4: function(t, e, i, n) {
                    return e = this.lambda, '\t\t\t<div class="item ' + (i = this.escapeExpression)(e(null != t ? t.itemClass : t, t)) + '">\r\n\t\t\t\t<div class="cupImage"></div>\r\n\t\t\t\t<div class="txt txt1"><span class="v">' + i(e(null != t ? t.status : t, t)) + '</span></div>\r\n\t\t\t\t<div class="txt txt2"><span class="v">' + i(e(null != t ? t.name : t, t)) + '</span></div>\r\n\t\t\t\t<div class="txt txt3"><span class="v">' + i(e(null != t ? t.desc : t, t)) + "</span></div>\r\n\t\t\t</div>\r\n"
                },
                6: function(t, e, i, n) {
                    return '\t\t\t<div class="text3">No achievements yet :(</div>\r\n'
                },
                8: function(t, e, i, n) {
                    return "\tProfile not found :(\r\n"
                },
                compiler: [6, ">= 2.0.0-beta.1"],
                main: function(t, e, i, n) {
                    var r;
                    return null != (r = e.unless.call(t, null != t ? t.notFound : t, {
                        name: "unless",
                        hash: {},
                        fn: this.program(1, n),
                        inverse: this.program(8, n),
                        data: n
                    })) ? r : ""
                },
                useData: !0
            }), r["classic/search"] = n({
                compiler: [6, ">= 2.0.0-beta.1"],
                main: function(t, e, i, n) {
                    return '<div class="searchbox">\r\n\t<input type="text" placeholder="Enter player name...">\r\n\t<div class="hint">Press ENTER to search</div>\r\n</div>\r\n\r\n<div class="result">\r\n\t<div class="list">\r\n\t</div>\r\n\t<div class="noResult">\r\n\t\tNo players found :(\r\n\t</div>\r\n</div>'
                },
                useData: !0
            }), r.classic = n({
                compiler: [6, ">= 2.0.0-beta.1"],
                main: function(t, e, i, n) {
                    var r, s;
                    i = e.helperMissing;
                    var a = '<div class="uiwindow nativeInput">\r\n\t<div class="wrap">\r\n\t\t<div class="wrapInner">\r\n\t\t\t';
                    return null != (r = "function" == typeof(s = null != (s = e.html || (null != t ? t.html : t)) ? s : i) ? s.call(t, {
                        name: "html",
                        hash: {},
                        data: n
                    }) : s) && (a += r), a + "\r\n\t\t</div>\r\n\t</div>\r\n</div>"
                },
                useData: !0
            }), r.hints = n({
                1: function(t, e, i, n) {
                    return e = this.lambda, '\t\t<div class="hint">' + (0, this.escapeExpression)(e(null != t ? t.txt : t, t)) + "</div>\r\n"
                },
                compiler: [6, ">= 2.0.0-beta.1"],
                main: function(t, e, i, n) {
                    var r;
                    return i = '<div class="glare"></div>\r\n\r\n<div class="list">\r\n', null != (r = e.each.call(t, null != t ? t.hint : t, {
                        name: "each",
                        hash: {},
                        fn: this.program(1, n),
                        inverse: this.noop,
                        data: n
                    })) && (i += r), i + "</div>"
                },
                useData: !0
            }), r.iab728 = n({
                compiler: [6, ">= 2.0.0-beta.1"],
                main: function(t, e, i, n) {
                    return '<div class="containerIAB728">\r\n\r\n</div>'
                },
                useData: !0
            }), r.ingamemenu = n({
                compiler: [6, ">= 2.0.0-beta.1"],
                main: function(t, e, i, n) {
                    return '<div class="dropdown">\r\n\t<div class="btn btnOpen">\r\n\t\tMENU\r\n\t</div>\r\n\t<ul>\r\n\t\t<li><div class="btn" data-action="fullscreen">Fullscreen</div></li>\r\n\t\t<li><div class="btn" data-action="rematch">Other match</div></li>\r\n\t</ul>\r\n</div>'
                },
                useData: !0
            }), r.invite = n({
                compiler: [6, ">= 2.0.0-beta.1"],
                main: function(t, e, i, n) {
                    var r;
                    return i = e.helperMissing, '<a class="close" href="#">X</a>\r\n\r\n<div class="text1">\r\n\tHey, you are alone on the map...\r\n</div>\r\n\r\n<div class="inputarea">\r\n\t<input type="text" value="' + (0, this.escapeExpression)("function" == typeof(r = null != (r = e.url || (null != t ? t.url : t)) ? r : i) ? r.call(t, {
                        name: "url",
                        hash: {},
                        data: n
                    }) : r) + '" readonly="readonly" />\r\n\t<span href="#" class="copy fx">COPY LINK</span>\r\n\t<a href="#" class="copy">COPY LINK</a>\r\n</div>\r\n\r\n<div class="text2">\r\n\tAsk a friend to join your match!\r\n</div>\r\n\r\n<div class="text3">\r\n\tTo join another match, go click the back button.\r\n</div>'
                },
                useData: !0
            }), r.kills = n({
                1: function(t, e, i, n) {
                    return e = this.lambda, '\t\t\t<li>\r\n\t\t\t\t<div class="killer">' + (i = this.escapeExpression)(e(null != t ? t.killer : t, t)) + '</div>\r\n\t\t\t\t<div class="cause"></div>\r\n\t\t\t\t<div class="killed">' + i(e(null != t ? t.killed : t, t)) + '</div>\r\n\t\t\t\t<div class="clear"></div>\r\n\t\t\t</li>\r\n'
                },
                compiler: [6, ">= 2.0.0-beta.1"],
                main: function(t, e, i, n) {
                    var r;
                    return i = '<div class="killList">\r\n\t<ul>\r\n', null != (r = e.each.call(t, null != t ? t.kills : t, {
                        name: "each",
                        hash: {},
                        fn: this.program(1, n),
                        inverse: this.noop,
                        data: n
                    })) && (i += r), i + "\t</ul>\r\n</div>"
                },
                useData: !0
            }), r.loading0 = n({
                compiler: [6, ">= 2.0.0-beta.1"],
                main: function(t, e, i, n) {
                    return '<div class="img">\r\n\t<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 453.5433 453.5433" id="loadingBall"><path d="M62.656 323.682C41.41 289.675 36.336 234.956 38 194.642c1.2-29.598 17.345-59.985 26.534-82.77 15.986-39.645 50.553-47.12 98.57-57.452 46.8-10.067 97.724-20.985 140.494 1.067 31.044 15.97 51.962 11.147 72.434 40.356 15.933 22.738 35.068 50.645 35.43 77.146.668 49.67 13.2 96.652-3.732 140.863-9.76 25.504-29.95 49.678-50.892 66.694-27.685 22.497-52.533 15.45-82.635 27.16-40.508 15.76-87.585 15.037-148.446-20.45-28.338-16.524-45.805-35.837-63.102-63.523z" fill="#fff" stroke="#000" stroke-width="20.932"/><path d="M37.376 230.3c113.432 56.67 330.99 56.355 378.302-19.698-12.287-68.477-38.695-114.69-73.236-138.896-84.544-32.793-157.215-27.74-221.224-5.05-59.463 1.978-95.754 79.698-83.842 163.644z" fill="red" fill-rule="evenodd"/><path d="M62.656 323.682C41.41 289.675 36.336 234.956 38 194.642c1.2-29.598 17.345-59.985 26.534-82.77 15.986-39.645 50.553-47.12 98.57-57.452 46.8-10.067 97.724-20.985 140.494 1.067 31.044 15.97 51.962 11.147 72.434 40.356 15.933 22.738 35.068 50.645 35.43 77.146.668 49.67 13.2 96.652-3.732 140.863-9.76 25.504-29.95 49.678-50.892 66.694-27.685 22.497-52.533 15.45-82.635 27.16-40.508 15.76-87.585 15.037-148.446-20.45-28.338-16.524-45.805-35.837-63.102-63.523z" fill="none" stroke="#000" stroke-width="20.932"/><path d="M208.365 217.906s-24.384-12.36-47.31-12.475c-24.583-.122-48.603 13.09-48.603 13.09s-2.497-54.983 49.41-56.168c51.412-1.174 46.503 55.554 46.503 55.554zM340.857 221.164s-24.384-12.36-47.31-12.475c-24.583-.124-48.603 13.09-48.603 13.09s-2.497-54.985 49.41-56.17c51.41-1.174 46.503 55.554 46.503 55.554z" fill="#fff" stroke="#000" stroke-width="11.436"/></svg>\r\n</div>\r\n<div class="text">Loading balls...</div>'
                },
                useData: !0
            }), r.loading1 = n({
                1: function(t, e, i, n) {
                    var r;
                    return i = e.helperMissing, '\t\t<div class="region">Region: ' + (0, this.escapeExpression)("function" == typeof(r = null != (r = e.region || (null != t ? t.region : t)) ? r : i) ? r.call(t, {
                        name: "region",
                        hash: {},
                        data: n
                    }) : r) + '</div>\r\n\t\t<div class="regionHint">\r\n\t\t\tIn case the game is laggy, try to select a region in the game settings that better fits your location.\r\n\t\t</div>\r\n'
                },
                compiler: [6, ">= 2.0.0-beta.1"],
                main: function(t, e, i, n) {
                    var r;
                    return i = '<div class="text">Loading map...</div>\r\n<div class="info">\r\n', null != (r = e.if.call(t, null != t ? t.region : t, {
                        name: "if",
                        hash: {},
                        fn: this.program(1, n),
                        inverse: this.noop,
                        data: n
                    })) && (i += r), i + '\r\n\t<div class="mouseHint">\r\n\t\tPlay with mouse, not touchpad or touchscreen!\r\n\t</div>\r\n</div>\r\n\r\n<img class="logo" src="/logo.svg" />'
                },
                useData: !0
            }), r.maintenance = n({
                compiler: [6, ">= 2.0.0-beta.1"],
                main: function(t, e, i, n) {
                    return '<img src="/logo.svg" />\r\n<div class="text">Maintenance...</div>\r\n<div class="text2">We will be back in a few minutes. Press F5 to reload the page.</div>\r\n\r\n<div class="text3">\r\n\tCheck out our <a href="https://www.facebook.com/kugeln.io">Facebook page</a> or <a href="https://twitter.com/kugeln_io">Twitter</a> to get more information!\r\n</div>'
                },
                useData: !0
            }), r.matchend = n({
                1: function(t, e, i, n) {
                    return e = this.lambda, '\t\t<div class="sideBall ' + (i = this.escapeExpression)(e(null != t ? t.ballClass : t, t)) + '">\r\n\t\t\t<div class="score">' + i(e(null != t ? t.teamScore : t, t)) + '</div>\r\n\t\t\t<div class="nickname">' + i(e(null != t ? t.topNickname : t, t)) + '</div>\r\n\t\t\t<canvas width="256" height="256"></canvas>\r\n\t\t</div>\r\n'
                },
                3: function(t, e, i, n) {
                    var r;
                    i = this.lambda;
                    var s = this.escapeExpression;
                    return i = '\t\t\t\t<table class="' + s(i(null != t ? t.teamClass : t, t)) + '">\r\n\t\t\t\t\t<tr class="teamOverview">\r\n\t\t\t\t\t\t<th colspan="4">' + s(i(null != t ? t.teamName : t, t)) + '</th>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t<tr class="playerHead">\r\n\t\t\t\t\t\t<th><span>Player</span></th>\r\n\t\t\t\t\t\t<th><span>Kills</span></th>\r\n\t\t\t\t\t\t<th><span>Death</span></th>\r\n\t\t\t\t\t\t<th><span>Score</span></th>\r\n\t\t\t\t\t</tr>\r\n', null != (r = e.each.call(t, null != t ? t.list : t, {
                        name: "each",
                        hash: {},
                        fn: this.program(4, n),
                        inverse: this.noop,
                        data: n
                    })) && (i += r), i + "\t\t\t\t</table>\r\n"
                },
                4: function(t, e, i, n) {
                    var r;
                    i = this.lambda;
                    var s = this.escapeExpression,
                        a = '\t\t\t\t\t\t<tr class="' + s(i(null != t ? t.rowClass : t, t)) + '">\r\n\t\t\t\t\t\t\t<td>\r\n';
                    return null != (r = e.if.call(t, null != t ? t.nameType0 : t, {
                        name: "if",
                        hash: {},
                        fn: this.program(5, n),
                        inverse: this.noop,
                        data: n
                    })) && (a += r), null != (r = e.if.call(t, null != t ? t.nameType1 : t, {
                        name: "if",
                        hash: {},
                        fn: this.program(7, n),
                        inverse: this.noop,
                        data: n
                    })) && (a += r), null != (r = e.if.call(t, null != t ? t.nameType2 : t, {
                        name: "if",
                        hash: {},
                        fn: this.program(9, n),
                        inverse: this.noop,
                        data: n
                    })) && (a += r), a + "\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t<td>" + s(i(null != t ? t.kills : t, t)) + "</td>\r\n\t\t\t\t\t\t\t<td>" + s(i(null != t ? t.death : t, t)) + "</td>\r\n\t\t\t\t\t\t\t<td>" + s(i(null != t ? t.score : t, t)) + "</td>\r\n\t\t\t\t\t\t</tr>\r\n"
                },
                5: function(t, e, i, n) {
                    return e = this.lambda, '\t\t\t\t\t\t\t\t\t<span class="nick">' + (0, this.escapeExpression)(e(null != t ? t.name : t, t)) + "</span>\r\n"
                },
                7: function(t, e, i, n) {
                    return e = this.lambda, '\t\t\t\t\t\t\t\t\t<a class="type1 profile" href="/profile/' + (i = this.escapeExpression)(e(null != t ? t.uniqueName : t, t)) + '" target="_blank" alt="' + i(e(null != t ? t.uniqueName : t, t)) + 's Profiles">' + i(e(null != t ? t.uniqueName : t, t)) + "</a>\r\n"
                },
                9: function(t, e, i, n) {
                    return e = this.lambda, '\t\t\t\t\t\t\t\t\t<span class="nick">' + (i = this.escapeExpression)(e(null != t ? t.name : t, t)) + '</span>\r\n\t\t\t\t\t\t\t\t\t<span class="type2">(<a class="profile" href="/profile/' + i(e(null != t ? t.uniqueName : t, t)) + '" target="_blank" alt="' + i(e(null != t ? t.uniqueName : t, t)) + 's Profiles">' + i(e(null != t ? t.uniqueName : t, t)) + "</a>)</span>\r\n"
                },
                compiler: [6, ">= 2.0.0-beta.1"],
                main: function(t, e, i, n) {
                    var r, s;
                    i = e.helperMissing;
                    var a = this.escapeExpression,
                        o = '<div class="bgOverlay">\r\n</div>\r\n\r\n<div class="inner ' + a("function" == typeof(s = null != (s = e.hasTeamClass || (null != t ? t.hasTeamClass : t)) ? s : i) ? s.call(t, {
                            name: "hasTeamClass",
                            hash: {},
                            data: n
                        }) : s) + '">\r\n';
                    return null != (r = e.each.call(t, null != t ? t.teams : t, {
                        name: "each",
                        hash: {},
                        fn: this.program(1, n),
                        inverse: this.noop,
                        data: n
                    })) && (o += r), o += '\r\n\t<div class="win">\r\n\t\t<div class="header">\r\n\t\t\t<div class="msg0">' + a("function" == typeof(s = null != (s = e.msg0 || (null != t ? t.msg0 : t)) ? s : i) ? s.call(t, {
                        name: "msg0",
                        hash: {},
                        data: n
                    }) : s) + '</div>\r\n\t\t\t<div class="msg1">' + a("function" == typeof(s = null != (s = e.msg1 || (null != t ? t.msg1 : t)) ? s : i) ? s.call(t, {
                        name: "msg1",
                        hash: {},
                        data: n
                    }) : s) + '</div>\r\n\t\t</div>\r\n\r\n\t\t<div class="containerIAB728_2">\r\n\t\t\t\r\n\t\t</div>\r\n\r\n\t\t<div class="lists">\r\n', null != (r = e.each.call(t, null != t ? t.teams : t, {
                        name: "each",
                        hash: {},
                        fn: this.program(3, n),
                        inverse: this.noop,
                        data: n
                    })) && (o += r), o + '\t\t</div>\r\n\r\n\t\t<div class="continue">Continue &raquo;</div>\r\n\t</div>\r\n</div>\r\n\r\n<div class="matchEndFooter">\r\n\t<div class="left">\r\n\t\t<a class="footerA" href="http://iogames.space/" title="More io Games">More .io Games</a>\r\n\t</div>\r\n\r\n\t<div class="right">\r\n\t\t<a class="footerLogo" href="http://www.addictinggames.com/"><img src="/addicting-games.png" title="more games" /></a>\r\n\t</div>\r\n</div>'
                },
                useData: !0
            }), r.matcherror = n({
                compiler: [6, ">= 2.0.0-beta.1"],
                main: function(t, e, i, n) {
                    var r;
                    i = e.helperMissing;
                    var s = this.escapeExpression;
                    return '<div class="box">\r\n\t<img src="/logo.svg" />\r\n\t<h2 class="title">' + s("function" == typeof(r = null != (r = e.title || (null != t ? t.title : t)) ? r : i) ? r.call(t, {
                        name: "title",
                        hash: {},
                        data: n
                    }) : r) + '</h2>\r\n\t<div class="desc">' + s("function" == typeof(r = null != (r = e.desc || (null != t ? t.desc : t)) ? r : i) ? r.call(t, {
                        name: "desc",
                        hash: {},
                        data: n
                    }) : r) + "</div>\r\n\r\n\t<button>Continue</button>\r\n</div>\r\n"
                },
                useData: !0
            }), r.matchselection = n({
                1: function(t, e, i, n, r) {
                    return e = this.lambda, '\t\t\t\t\t\t<li>\r\n\t\t\t\t\t\t\t<img src="/map/preview/' + (i = this.escapeExpression)(e(null != t ? t.name : t, t)) + ".png?v=" + i(e(null != r[1] ? r[1].verHash : r[1], t)) + '" alt="' + i(e(null != t ? t.label : t, t)) + '" />\r\n\t\t\t\t\t\t\t<div class="mapLabel">' + i(e(null != t ? t.label : t, t)) + "</div>\r\n\t\t\t\t\t\t</li>\r\n"
                },
                3: function(t, e, i, n) {
                    return e = this.lambda, '\t\t\t\t\t<li>\r\n\t\t\t\t\t\t<input type="radio" name="gameType" value="' + (i = this.escapeExpression)(e(null != t ? t.key : t, t)) + '" id="gameType' + i(e(null != t ? t.key : t, t)) + '">\r\n\t\t\t\t\t\t<label for="gameType' + i(e(null != t ? t.key : t, t)) + '">' + i(e(null != t ? t.descShort : t, t)) + "</label>\r\n\t\t\t\t\t</li>\r\n"
                },
                compiler: [6, ">= 2.0.0-beta.1"],
                main: function(t, e, i, n, r) {
                    var s;
                    return i = '<div class="uiwindow nativeInput">\r\n\t<div class="matchselect">\r\n\t\t<div class="closeX">X</div>\r\n\t\t<div class="frame mapSelection">\r\n\t\t\t<div class="frameLabel">Map</div>\r\n\t\t\t<div class="frameContent">\r\n\t\t\t\t<ul class="mapList">\r\n\t\t\t\t\t<li class="random">\r\n\t\t\t\t\t\t<span class="line"></span>\r\n\t\t\t\t\t\t<div class="randomLabel">RANDOM</div>\r\n\t\t\t\t\t</li>\r\n\r\n', null != (s = e.each.call(t, null != t ? t.mapList : t, {
                        name: "each",
                        hash: {},
                        fn: this.program(1, n, r),
                        inverse: this.noop,
                        data: n
                    })) && (i += s), i += '\t\t\t\t</ul>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\r\n\t\t<div class="frame gameTypeSelection">\r\n\t\t\t<div class="frameLabel">Game Mode</div>\r\n\t\t\t<div class="frameContent">\r\n\t\t\t\t<ul class="gameTypeList">\r\n\t\t\t\t\t<li>\r\n\t\t\t\t\t\t<input type="radio" name="gameType" value="" id="gameTypeRND">\r\n\t\t\t\t\t\t<label for="gameTypeRND">Random</label>\r\n\t\t\t\t\t</li>\r\n', null != (s = e.each.call(t, null != t ? t.gameTypeList : t, {
                        name: "each",
                        hash: {},
                        fn: this.program(3, n, r),
                        inverse: this.noop,
                        data: n
                    })) && (i += s), i + '\t\t\t\t</ul>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\r\n\t\t<div class="ctrl">\r\n\t\t\t<button class="public">Play</button>\r\n\t\t\t<button class="private">Create private match</button>\r\n\t\t</div>\r\n\t</div>\r\n</div>'
                },
                useData: !0,
                useDepths: !0
            }), r.modal = n({
                1: function(t, e, i, n) {
                    return e = this.lambda, '\t\t\t\t<button class="' + (i = this.escapeExpression)(e(null != t ? t.class : t, t)) + '">' + i(e(null != t ? t.text : t, t)) + "</button>\r\n"
                },
                compiler: [6, ">= 2.0.0-beta.1"],
                main: function(t, e, i, n) {
                    var r, s;
                    i = e.helperMissing;
                    var a = '<div class="bg"></div>\r\n\r\n<div class="modal">\r\n\t<div class="inner">\r\n\t\t<div class="msg">';
                    return null != (r = "function" == typeof(s = null != (s = e.text || (null != t ? t.text : t)) ? s : i) ? s.call(t, {
                        name: "text",
                        hash: {},
                        data: n
                    }) : s) && (a += r), a += '</div>\r\n\r\n\t\t<div class="buttons">\r\n', null != (r = e.each.call(t, null != t ? t.buttons : t, {
                        name: "each",
                        hash: {},
                        fn: this.program(1, n),
                        inverse: this.noop,
                        data: n
                    })) && (a += r), a + "\t\t</div>\r\n\t</div>\r\n\r\n</div>"
                },
                useData: !0
            }), r.progression = n({
                1: function(t, e, i, n) {
                    var r;
                    return i = this.lambda, i = '\t\t\t\t<table class="' + (0, this.escapeExpression)(i(null != t ? t.teamClass : t, t)) + '">\r\n\t\t\t\t\t<tr class="playerHead">\r\n\t\t\t\t\t\t<th><span>Player</span></th>\r\n\t\t\t\t\t\t<th><span>XP</span></th>\r\n\t\t\t\t\t</tr>\r\n', null != (r = e.each.call(t, null != t ? t.list : t, {
                        name: "each",
                        hash: {},
                        fn: this.program(2, n),
                        inverse: this.noop,
                        data: n
                    })) && (i += r), i + "\t\t\t\t</table>\r\n"
                },
                2: function(t, e, i, n) {
                    return e = this.lambda, '\t\t\t\t\t\t<tr class="' + (i = this.escapeExpression)(e(null != t ? t.rowClass : t, t)) + '">\r\n\t\t\t\t\t\t\t<td>' + i(e(null != t ? t.name : t, t)) + '</td>\r\n\t\t\t\t\t\t\t<td data-xp="' + i(e(null != t ? t.xp : t, t)) + '" class="listXpVal"></td>\r\n\t\t\t\t\t\t</tr>\r\n'
                },
                4: function(t, e, i, n) {
                    return '\t\t\t\t<div class="progress progressTitle">\r\n\t\t\t\t\t<div class="txt1">Your progress</div>\r\n\t\t\t\t</div>\r\n'
                },
                6: function(t, e, i, n) {
                    var r;
                    i = e.helperMissing;
                    var s = this.escapeExpression;
                    return '\t\t\t\t<div class="progress progressLevel">\r\n\t\t\t\t\t<div class="txt1">Level up!</div>\r\n\t\t\t\t\t\r\n\t\t\t\t\t<div class="level lr' + s("function" == typeof(r = null != (r = e.levelRange || (null != t ? t.levelRange : t)) ? r : i) ? r.call(t, {
                        name: "levelRange",
                        hash: {},
                        data: n
                    }) : r) + '"><span class="v">' + s("function" == typeof(r = null != (r = e.levelUp || (null != t ? t.levelUp : t)) ? r : i) ? r.call(t, {
                        name: "levelUp",
                        hash: {},
                        data: n
                    }) : r) + "</span></div>\r\n\t\t\t\t</div>\r\n"
                },
                8: function(t, e, i, n) {
                    return e = this.lambda, '\t\t\t\t<div class="progress progressAchievement">\r\n\t\t\t\t\t<canvas class="cup" width="64" height="64"></canvas>\r\n\r\n\t\t\t\t\t<div class="txt1"><span>Achievement unlocked!</span></div>\r\n\t\t\t\t\t<div class="txt2"><span>' + (i = this.escapeExpression)(e(null != t ? t.name : t, t)) + '</span></div>\r\n\t\t\t\t\t<div class="txt3"><span>' + i(e(null != t ? t.desc : t, t)) + "</span></div>\r\n\t\t\t\t</div>\r\n"
                },
                10: function(t, e, i, n) {
                    return '\t\t\t\t<div class="progress progressLoginNotify">\r\n\t\t\t\t\t<div class="txt1">Login to save progress!</div>\r\n\t\t\t\t</div>\r\n'
                },
                compiler: [6, ">= 2.0.0-beta.1"],
                main: function(t, e, i, n) {
                    var r, s;
                    i = e.helperMissing;
                    var a = this.escapeExpression;
                    return i = '<div class="bgOverlay">\r\n</div>\r\n\r\n<div class="inner ' + a("function" == typeof(s = null != (s = e.hasTeamClass || (null != t ? t.hasTeamClass : t)) ? s : i) ? s.call(t, {
                        name: "hasTeamClass",
                        hash: {},
                        data: n
                    }) : s) + '">\r\n\t<div class="col colBall">\r\n\t\t<div class="nick">' + a("function" == typeof(s = null != (s = e.nick || (null != t ? t.nick : t)) ? s : i) ? s.call(t, {
                        name: "nick",
                        hash: {},
                        data: n
                    }) : s) + '</div>\r\n\t\t<canvas width="256" height="256"></canvas>\r\n\t</div>\r\n\r\n\t<div class="col colList">\r\n\t\t<div class="lists">\r\n', null != (r = e.each.call(t, null != t ? t.teams : t, {
                        name: "each",
                        hash: {},
                        fn: this.program(1, n),
                        inverse: this.noop,
                        data: n
                    })) && (i += r), i += '\t\t</div>\r\n\r\n\t\t<div class="continue">Continue &raquo;</div>\r\n\t</div>\r\n\r\n\t<div class="col colStats">\r\n\t\t<div class="wrap">\r\n', null != (r = e.if.call(t, null != t ? t.showTitle : t, {
                        name: "if",
                        hash: {},
                        fn: this.program(4, n),
                        inverse: this.noop,
                        data: n
                    })) && (i += r), i += '\r\n\t\t\t<div class="progress progressXP">\r\n\t\t\t\t<span class="txt1">+</span>\r\n\t\t\t\t<span class="valAbs"></span>\r\n\t\t\t\t<span class="txt2">XP</span>\r\n\t\t\t</div>\r\n\r\n', null != (r = e.if.call(t, null != t ? t.levelUp : t, {
                        name: "if",
                        hash: {},
                        fn: this.program(6, n),
                        inverse: this.noop,
                        data: n
                    })) && (i += r), i += "\r\n", null != (r = e.each.call(t, null != t ? t.achievements : t, {
                        name: "each",
                        hash: {},
                        fn: this.program(8, n),
                        inverse: this.noop,
                        data: n
                    })) && (i += r), i += "\r\n", null != (r = e.if.call(t, null != t ? t.loginNotify : t, {
                        name: "if",
                        hash: {},
                        fn: this.program(10, n),
                        inverse: this.noop,
                        data: n
                    })) && (i += r), i + '\t\t</div>\r\n\r\n\t\t<div class="pagination">\r\n\t\t\t<div class="pgn up">&#9650;</div>\r\n\t\t\t<div class="pgn down">&#9660;</div>\r\n\t\t</div>\r\n\t</div>\t\r\n</div>'
                },
                useData: !0
            }), r.register = n({
                compiler: [6, ">= 2.0.0-beta.1"],
                main: function(t, e, i, n) {
                    return '<div class="uiwindow nativeInput">\r\n\t<div class="inner">\r\n\t\t<div class="header">\r\n\t\t\t<div class="avatar">\r\n\t\t\t\t<img alt="Avatar" />\r\n\t\t\t\t<div class="welcome">Hey, <span class="realname"></span></div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\r\n\t\t<p class="txt1">Choose your unique player name!</p>\r\n\r\n\t\t<input class="unique" placeholder="Nickname..." />\r\n\r\n\t\t<p class="txt2 blinkRed">You cannot change this name afterwards!</p>\r\n\r\n\t\t<p class="error"></p>\r\n\r\n\t\t<div class="ctrl">\r\n\t\t\t<button class="done">Continue</button>\r\n\t\t</div>\r\n\t</div>\r\n</div>'
                },
                useData: !0
            }), r.settings = n({
                1: function(t, e, i, n) {
                    return e = this.lambda, '\t\t\t\t\t\t<option value="' + (i = this.escapeExpression)(e(null != t ? t.name : t, t)) + '">' + i(e(null != t ? t.label : t, t)) + "</option>\r\n"
                },
                compiler: [6, ">= 2.0.0-beta.1"],
                main: function(t, e, i, n) {
                    var r;
                    return i = '<div class="uiwindow nativeInput">\r\n\t<div class="settings">\r\n\t\t<div class="closeX">X</div>\r\n\r\n\t\t<div class="frame">\r\n\t\t\t<div class="frameLabel">Region</div>\r\n\t\t\t<div class="frameContent">\r\n\t\t\t\tSelect a region which is close to you, or you will lag around.<br/>\r\n\r\n\t\t\t\t<select>\r\n', null != (r = e.each.call(t, null != t ? t.regions : t, {
                        name: "each",
                        hash: {},
                        fn: this.program(1, n),
                        inverse: this.noop,
                        data: n
                    })) && (i += r), i + '\t\t\t\t</select>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\r\n\t\t<div class="frame">\r\n\t\t\t<div class="frameLabel">Game</div>\r\n\t\t\t<div class="frameContent">\r\n\t\t\t\t<input type="checkbox" id="optionGameNoSound" /><label for="optionGameNoSound">No sound</label><br/>\r\n\t\t\t\t<input type="checkbox" id="optionGameLowGfx" /><label for="optionGameLowGfx">Low graphics quality (faster)</label>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\r\n\t\t<div class="ctrl">\r\n\t\t\t<button class="cancel">Cancel</button>\r\n\t\t\t<button class="done">Save</button>\r\n\t\t</div>\r\n\t</div>\r\n</div>'
                },
                useData: !0
            }), r.sidebar = n({
                compiler: [6, ">= 2.0.0-beta.1"],
                main: function(t, e, i, n) {
                    var r;
                    return e = this.lambda, '<div class="left bar">\r\n\t<div class="barSection player loggedInOnly">\r\n\t\t<div class="avatar">\r\n\t\t\t<canvas class="playerDetail" data-type="avatar" data-player="' + (i = this.escapeExpression)(e(null != (r = null != t ? t.auth : t) ? r.name : r, t)) + '" width="80" height="80"></canvas>\r\n\t\t\t<div class="welcome"><a href="/profile/' + i(e(null != (r = null != t ? t.auth : t) ? r.name : r, t)) + '">' + i(e(null != (r = null != t ? t.auth : t) ? r.name : r, t)) + '</a></div>\r\n\t\t</div>\r\n\r\n\t\t<div class="hr"></div>\r\n\r\n\t\t<div class="playerProgress">\r\n\t\t\t<div class="tooltip">\r\n\t\t\t\t<table>\r\n\t\t\t\t\t<tr><td>Level</td><td class="vLvl">' + i(e(null != (r = null != t ? t.auth : t) ? r.level : r, t)) + '</td></tr>\r\n\t\t\t\t\t<tr><td>XP</td><td class="vXp">' + i(e(null != (r = null != t ? t.auth : t) ? r.xpCur : r, t)) + "/" + i(e(null != (r = null != t ? t.auth : t) ? r.xpMax : r, t)) + '</td></tr>\r\n\t\t\t\t</table>\r\n\t\t\t</div>\r\n\t\t\t<div class="xp">\r\n\t\t\t\t<div class="inner" style="width: ' + i(e(null != (r = null != t ? t.auth : t) ? r.xpPercent : r, t)) + '%"></div>\r\n\t\t\t\t<div class="v">' + i(e(null != (r = null != t ? t.auth : t) ? r.xpPercent : r, t)) + '%</div>\r\n\t\t\t</div>\r\n\t\t\t<div class="level ' + i(e(null != (r = null != t ? t.auth : t) ? r.levelClass : r, t)) + '"><span class="v">' + i(e(null != (r = null != t ? t.auth : t) ? r.level : r, t)) + '</span></div>\r\n\t\t</div>\r\n\r\n\t\t<div class="achievements">\r\n\t\t\t<div class="txt"><span>Show achievements</span></div>\r\n\r\n\t\t\t<div class="cupBox">\r\n\t\t\t\t<canvas class="cup" width="64" height="64"></canvas>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\r\n\t\t<a href="#" class="logout"><span>Logout</span></a>\r\n\t</div>\r\n\r\n\t<div class="barSection login loggedOutOnly">\r\n\t\t<p>\r\n\t\t\t<span class="white">Sign in</span> to collect <span class="red">XP</span> and <span class="red">achievements</span>\r\n\t\t</p>\r\n\t\t\x3c!--<p>\r\n\t\t\tFind <span class="red">friends</span> and join a <span class="red">clan</span>!\r\n\t\t</p>--\x3e\r\n\r\n\t\t<a class="loginBtn loginFB">\r\n\t\t\t<div class="icon">\r\n\t\t\t\t<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 58"><defs><style>.cls-1{fill:#fff;}</style></defs><title>flogo-HexRBG-Wht-58</title><path class="cls-1" d="M53.85,0H3.15A3.15,3.15,0,0,0,0,3.15v50.7A3.15,3.15,0,0,0,3.15,57h27.3V35H23V26.33h7.41V20c0-7.37,4.49-11.38,11.06-11.38A62.15,62.15,0,0,1,48.15,9v7.69H43.61c-3.57,0-4.26,1.69-4.26,4.18v5.5H47.9L46.79,35H39.35V57h14.5A3.15,3.15,0,0,0,57,53.85V3.15A3.15,3.15,0,0,0,53.85,0Z"/></svg>\r\n\t\t\t</div>\r\n\t\t\t<div class="label">Continue with Facebook</div>\r\n\t\t</a>\r\n\t\t<a class="loginBtn loginGoogle">\r\n\t\t\t<div class="icon">\r\n\t\t\t\t<svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1045 905q0-26-6-64h-362v132h217q-3 24-16.5 50t-37.5 53-66.5 44.5-96.5 17.5q-99 0-169-71t-70-171 70-171 169-71q92 0 153 59l104-101q-108-100-257-100-160 0-272 112.5t-112 271.5 112 271.5 272 112.5q165 0 266.5-105t101.5-270zm345 46h109v-110h-109v-110h-110v110h-110v110h110v110h110v-110zm274-535v960q0 119-84.5 203.5t-203.5 84.5h-960q-119 0-203.5-84.5t-84.5-203.5v-960q0-119 84.5-203.5t203.5-84.5h960q119 0 203.5 84.5t84.5 203.5z" fill="#fff"/></svg>\r\n\t\t\t</div>\r\n\t\t\t<div class="label">Continue with Google</div>\r\n\t\t</a>\r\n\t</div>\r\n\r\n\t<div class="barSection notifications loggedInOnly">\r\n\t\t<div class="notification messages">\r\n\t\t\t<div class="txt"><span>Messages</span></div>\r\n\r\n\t\t\t<div class="number"><span class="v">0</span></div>\r\n\t\t</div>\r\n\r\n\t\t<div class="notification friendrequests">\r\n\t\t\t<div class="txt"><span>Friend requests</span></div>\r\n\r\n\t\t\t<div class="number"><span class="v">0</span></div>\r\n\t\t</div>\r\n\t</div>\r\n\r\n\t<div class="barSection friends loggedInOnly nativeScroll">\r\n\t\t<div class="area">\r\n\t\t</div>\r\n\t\t<div class="noFriends">\r\n\t\t\t<div class="hr"></div>\r\n\t\t\t<div class="txt1">You don\'t have any friends yet. Add someone to play together!</div>\r\n\r\n\t\t\t<button class="search"><span class="uiIcon searchWhite"></span>Search friend</button>\r\n\t\t</div>\r\n\t</div>\r\n\r\n\t<div class="footer footerLeft">\r\n\t\t<a class="footerA" href="http://iogames.space/" title="More io Games">More .io Games</a>\r\n\t</div>\r\n</div>\r\n<div class="right bar">\r\n\t<div class="barSection followBox">\r\n\t\t<h3>Follow us now!</h3>\r\n\r\n\t\t<div class="followprovider fpFacebook">\r\n\t\t\t<div class="fb-like" data-href="https://www.facebook.com/kugeln.io" data-layout="button_count" data-action="like" data-size="small" data-show-faces="false" data-share="true"></div>\r\n\t\t</div>\r\n\r\n\t\t<div class="followprovider fpTwitter">\r\n\t\t\t<a href="https://twitter.com/kugeln_io" class="twitter-follow-button" data-show-count="false">Follow @kugeln_io</a>\r\n\t\t</div>\r\n\r\n\t\t<div class="followprovider fpReddit">\r\n\t\t\t<a href="https://www.reddit.com/r/kugelnio/" target="_blank">Discuss on /r/kugelnio</a>\r\n\t\t</div>\r\n\t</div>\r\n\r\n\t<div class="hr"></div>\r\n\r\n\t<div class="barSection controlHint">\r\n\t\t<h3>Controls</h3>\r\n\t\t<p><b>A/D</b> - Walk</p>\r\n\t\t<p><b>Space</b> - Jump</p>\r\n\t\t<p><b>Mouse Left</b> - Shoot</p>\r\n\t\t<p><b>Mouse Right</b> - Grapnel</p>\r\n\t\t<p><b>Scroll</b> - Change weapon</p>\r\n\t</div>\r\n\r\n\t<div class="hr"></div>\r\n\r\n\t<div class="barSection news">\r\n\t\t<h3>News</h3>\r\n\t\t<h4>08 January 2019</h4>\r\n\t\t<ul>\r\n\t\t\t<li>Fixed wrong player information</li>\r\n\t\t\t<li>Fixed logout</li>\r\n\t\t</ul>\r\n\t</div>\r\n\r\n\t<div class="hr"></div>\r\n\r\n\t<div class="barSection ioText">\r\n\t\tkugeln is a fast-paced, multiplayer <a href="https://iogames.space">io game</a>. You can play a wide range of <a href="https://addictinggames.com">games</a> at Addicting Games, including popular categories like puzzle and <a href="http://www.addictinggames.com/car-games/index.jsp">racing games</a>. New games are added every Thursday and are free to play online with your friends.\r\n\t</div>\r\n\r\n\r\n\t<div class="footer footerRight">\r\n\t\t<div class="clear"></div>\r\n\t\t<a class="footerLogo" href="http://www.addictinggames.com/"><img src="/addicting-games.png" title="more games" /></a>\r\n\t\t<div class="clear"></div>\r\n\t\t<a class="footerB" href="/about" title="About kugeln.io">About</a>\r\n\t\t<a class="footerB" href="/halloffame">Hall of Fame</a>\r\n\t\t<a class="footerB" href="/changelog">Changelog</a>\r\n\t\t<a class="footerC" href="/privacy">Privacy Policy</a>\r\n\t\t<a class="footerC" href="/terms">Terms of use</a>\r\n\t\t<a class="footerC" href="/imprint">Imprint</a>\r\n\t</div>\r\n</div>'
                },
                useData: !0
            }), r.stats = n({
                1: function(t, e, i, n) {
                    var r;
                    i = this.lambda;
                    var s = this.escapeExpression;
                    return i = '\t\t<table class="' + s(i(null != t ? t.teamClass : t, t)) + '">\r\n\t\t\t<tr class="teamOverview">\r\n\t\t\t\t<th colspan="3">' + s(i(null != t ? t.teamName : t, t)) + "</th>\r\n\t\t\t\t<th>" + s(i(null != t ? t.teamScore : t, t)) + '</th>\r\n\t\t\t</tr>\r\n\t\t\t<tr class="playerHead">\r\n\t\t\t\t<th><span>Player</span></th>\r\n\t\t\t\t<th><span>Kills</span></th>\r\n\t\t\t\t<th><span>Death</span></th>\r\n\t\t\t\t<th><span>Score</span></th>\r\n\t\t\t</tr>\r\n', null != (r = e.each.call(t, null != t ? t.list : t, {
                        name: "each",
                        hash: {},
                        fn: this.program(2, n),
                        inverse: this.noop,
                        data: n
                    })) && (i += r), i + "\t\t</table>\r\n"
                },
                2: function(t, e, i, n) {
                    return e = this.lambda, '\t\t\t\t<tr class="' + (i = this.escapeExpression)(e(null != t ? t.rowClass : t, t)) + '">\r\n\t\t\t\t\t<td>\r\n\t\t\t\t\t\t<span class="nick">' + i(e(null != t ? t.name : t, t)) + "</span>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t\t<td>" + i(e(null != t ? t.kills : t, t)) + "</td>\r\n\t\t\t\t\t<td>" + i(e(null != t ? t.death : t, t)) + "</td>\r\n\t\t\t\t\t<td>" + i(e(null != t ? t.score : t, t)) + "</td>\r\n\t\t\t\t</tr>\r\n"
                },
                compiler: [6, ">= 2.0.0-beta.1"],
                main: function(t, e, i, n) {
                    var r, s;
                    i = e.helperMissing;
                    var a = this.escapeExpression;
                    return i = '<div class="header">\r\n\t<div class="timeLeftKey"><span>Time left</span></div>\r\n\t<div class="gameTypeKey"><span>Game type</span></div>\r\n\r\n\t<div class="timeLeftValue"><span>' + a("function" == typeof(s = null != (s = e.remainingSeconds || (null != t ? t.remainingSeconds : t)) ? s : i) ? s.call(t, {
                        name: "remainingSeconds",
                        hash: {},
                        data: n
                    }) : s) + '</span></div>\r\n\t<div class="gameTypeShortValue"><span>' + a("function" == typeof(s = null != (s = e.gameTypeShort || (null != t ? t.gameTypeShort : t)) ? s : i) ? s.call(t, {
                        name: "gameTypeShort",
                        hash: {},
                        data: n
                    }) : s) + '</span></div>\r\n\t<div class="gameTypeLongValue"><span>' + a("function" == typeof(s = null != (s = e.gameTypeLong || (null != t ? t.gameTypeLong : t)) ? s : i) ? s.call(t, {
                        name: "gameTypeLong",
                        hash: {},
                        data: n
                    }) : s) + '</span></div>\r\n</div>\r\n\r\n<div class="lists">\r\n', null != (r = e.each.call(t, null != t ? t.teams : t, {
                        name: "each",
                        hash: {},
                        fn: this.program(1, n),
                        inverse: this.noop,
                        data: n
                    })) && (i += r), i + "</div>"
                },
                useData: !0
            }), r.title = n({
                compiler: [6, ">= 2.0.0-beta.1"],
                main: function(t, e, i, n) {
                    return '<div class="uiwindow nativeInput">\r\n\t<div class="playerselect">\r\n\t\t<div class="logo">\r\n\t\t\t<img src="/logo_dark.svg" title="kugeln.io" alt="kugeln.io" />\r\n\t\t</div>\r\n\t\t\r\n\t\t<form>\r\n\t\t\t<div class="extAdBox inputBox">\r\n\t\t\t\t<div class="containerIAB300">\r\n\t\t\t\t\t<div class="adbhint">\r\n\t\t\t\t\t\t<div class="txt1">y u block ads?</div>\r\n\t\t\t\t\t\t<div class="cry">:\'(</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\r\n\t\t\t<div class="mainInput inputBox">\r\n\t\t\t\t<input type="text" maxlength="16" placeholder="Enter nickname..." class="nickname" autocomplete="off" />\r\n\t\t\t\t<input type="submit" class="connect" value="Play!" />\r\n\r\n\t\t\t\t<button class="small noLiteMode settings">Settings</button>\r\n\t\t\t\t<button class="small noLiteMode customMatch">Advanced Match</button>\r\n\t\t\t\t<div class="onlyLiteMode matchHint">Joining match <span class="value"></span>. <a href="/">Click for other match</a></div>\r\n\t\t\t</div>\r\n\r\n\t\t\t<div class="customize inputBox">\r\n\t\t\t\t<div class="previewShadow"></div>\r\n\t\t\t\t<canvas class="preview" width="256" height="256"></canvas>\r\n\t\t\t\t<a class="change">Click to change</a>\r\n\t\t\t</div>\r\n\r\n\t\t\t<div class="highscore inputBox">\r\n\t\t\t\t<div class="headline">Weekly Highscore</div>\r\n\r\n\t\t\t\t<div class="header">\r\n\t\t\t\t\t<div class="place">Pos</div>\r\n\t\t\t\t\t<div class="name">Player</div>\r\n\t\t\t\t\t<div class="xp">XP</div>\r\n\t\t\t\t</div>\r\n\r\n\t\t\t\t<div class="table">\r\n\t\t\t\t</div>\r\n\r\n\t\t\t\t<div class="footer yourscore">Your position: <span class="v"></span></div>\r\n\t\t\t\t<div class="footer motivationPlay">Play to get listed!</div>\r\n\t\t\t\t<div class="footer motivationLogin">Login to get listed!</div>\r\n\t\t\t\t<div class="footer more">See more &gt;&gt;</div>\r\n\t\t\t</div>\r\n\t\t</form>\r\n\t</div>\r\n</div>'
                },
                useData: !0
            }), r.toast = n({
                compiler: [6, ">= 2.0.0-beta.1"],
                main: function(t, e, i, n) {
                    var r, s;
                    i = e.helperMissing;
                    var a = '<div class="type_usable">\r\n\t<div class="msg">';
                    return null != (r = "function" == typeof(s = null != (s = e.usableMsg || (null != t ? t.usableMsg : t)) ? s : i) ? s.call(t, {
                        name: "usableMsg",
                        hash: {},
                        data: n
                    }) : s) && (a += r), a += '</div>\r\n</div>\r\n\r\n<div class="type_inputhelp">\r\n\t<div class="msg">', null != (r = "function" == typeof(s = null != (s = e.inputhelpMsg || (null != t ? t.inputhelpMsg : t)) ? s : i) ? s.call(t, {
                        name: "inputhelpMsg",
                        hash: {},
                        data: n
                    }) : s) && (a += r), a + '</div>\r\n</div>\r\n\r\n<div class="type_stalling">\r\n\t<div class="msg nativeInput blockGameInput">This match is stalling. No new users will join. There are other matches with more players. <a href="/">Other match</a></div>\r\n</div>\r\n'
                },
                useData: !0
            })
        }, {}],
        17: [function(t, e, i) {
            e.exports = {
                spring: {
                    1: {},
                    2: {},
                    3: {},
                    4: {},
                    5: {},
                    6: {},
                    7: {},
                    8: {},
                    9: {},
                    10: {},
                    11: {},
                    12: {},
                    13: {},
                    14: {},
                    15: {},
                    16: {},
                    17: {},
                    18: {},
                    19: {
                        lock: [
                            [0, 0, 64, 32]
                        ]
                    },
                    20: {
                        lock: [
                            [32, 0, 64, 64]
                        ]
                    },
                    21: {
                        lock: [
                            [0, 32, 64, 64]
                        ]
                    },
                    22: {
                        lock: [
                            [0, 0, 32, 64]
                        ]
                    },
                    23: {
                        lock: [
                            [8, 0, 64, 16],
                            [14, 16, 64, 32]
                        ]
                    },
                    24: {
                        lock: [
                            [0, 0, 56, 16],
                            [0, 16, 50, 32]
                        ]
                    },
                    25: {
                        lock: [
                            [8, 48, 64, 64],
                            [14, 32, 64, 48]
                        ]
                    },
                    26: {
                        lock: [
                            [0, 48, 56, 64],
                            [0, 32, 50, 48]
                        ]
                    },
                    27: {
                        lock: [
                            [48, 8, 64, 64],
                            [32, 14, 48, 64]
                        ]
                    },
                    28: {
                        lock: [
                            [48, 0, 64, 56],
                            [32, 0, 48, 50]
                        ]
                    },
                    29: {
                        lock: [
                            [0, 8, 16, 64],
                            [16, 14, 32, 64]
                        ]
                    },
                    30: {
                        lock: [
                            [0, 0, 16, 56],
                            [16, 0, 32, 50]
                        ]
                    },
                    31: {
                        lock: [
                            [0, 0, 64, 32],
                            [0, 32, 32, 64]
                        ]
                    },
                    32: {
                        lock: [
                            [32, 0, 64, 64],
                            [0, 0, 32, 32]
                        ]
                    },
                    33: {
                        lock: [
                            [0, 32, 64, 64],
                            [32, 0, 64, 32]
                        ]
                    },
                    34: {
                        lock: [
                            [0, 0, 32, 64],
                            [32, 32, 64, 64]
                        ]
                    },
                    35: {
                        lock: [
                            [0, 0, 64, 64]
                        ]
                    },
                    36: {
                        lock: [
                            [0, 0, 64, 64]
                        ]
                    },
                    37: {
                        lock: [
                            [15, 0, 64, 1],
                            [14, 1, 64, 2],
                            [13, 2, 64, 3],
                            [12, 3, 64, 4],
                            [11, 4, 64, 16],
                            [14, 16, 64, 32]
                        ]
                    },
                    38: {
                        lock: [
                            [0, 0, 49, 1],
                            [0, 1, 50, 2],
                            [0, 2, 51, 3],
                            [0, 3, 52, 4],
                            [0, 4, 53, 16],
                            [0, 16, 50, 32]
                        ]
                    },
                    39: {
                        lock: [
                            [0, 0, 64, 64]
                        ]
                    },
                    40: {
                        lock: [
                            [0, 0, 64, 64]
                        ]
                    },
                    41: {},
                    42: {},
                    43: {
                        b: 1
                    }
                },
                winter: {
                    1: {},
                    2: {},
                    3: {},
                    4: {},
                    5: {},
                    6: {},
                    7: {},
                    8: {},
                    9: {},
                    10: {},
                    11: {},
                    12: {},
                    13: {},
                    14: {},
                    15: {},
                    16: {},
                    17: {},
                    18: {},
                    19: {
                        lock: [
                            [0, 0, 64, 32]
                        ]
                    },
                    20: {
                        lock: [
                            [32, 0, 64, 64]
                        ]
                    },
                    21: {
                        lock: [
                            [0, 32, 64, 64]
                        ]
                    },
                    22: {
                        lock: [
                            [0, 0, 32, 64]
                        ]
                    },
                    23: {
                        lock: [
                            [8, 0, 64, 16],
                            [14, 16, 64, 32]
                        ]
                    },
                    24: {
                        lock: [
                            [0, 0, 56, 16],
                            [0, 16, 50, 32]
                        ]
                    },
                    25: {
                        lock: [
                            [8, 48, 64, 64],
                            [14, 32, 64, 48]
                        ]
                    },
                    26: {
                        lock: [
                            [0, 48, 56, 64],
                            [0, 32, 50, 48]
                        ]
                    },
                    27: {
                        lock: [
                            [48, 8, 64, 64],
                            [32, 14, 48, 64]
                        ]
                    },
                    28: {
                        lock: [
                            [48, 0, 64, 56],
                            [32, 0, 48, 50]
                        ]
                    },
                    29: {
                        lock: [
                            [0, 8, 16, 64],
                            [16, 14, 32, 64]
                        ]
                    },
                    30: {
                        lock: [
                            [0, 0, 16, 56],
                            [16, 0, 32, 50]
                        ]
                    },
                    31: {
                        lock: [
                            [0, 0, 64, 32],
                            [0, 32, 32, 64]
                        ]
                    },
                    32: {
                        lock: [
                            [32, 0, 64, 64],
                            [0, 0, 32, 32]
                        ]
                    },
                    33: {
                        lock: [
                            [0, 32, 64, 64],
                            [32, 0, 64, 32]
                        ]
                    },
                    34: {
                        lock: [
                            [0, 0, 32, 64],
                            [32, 32, 64, 64]
                        ]
                    },
                    35: {
                        lock: [
                            [0, 0, 64, 64]
                        ]
                    },
                    36: {
                        lock: [
                            [0, 0, 64, 64]
                        ]
                    },
                    37: {
                        lock: [
                            [15, 0, 64, 1],
                            [14, 1, 64, 2],
                            [13, 2, 64, 3],
                            [12, 3, 64, 4],
                            [11, 4, 64, 16],
                            [14, 16, 64, 32]
                        ]
                    },
                    38: {
                        lock: [
                            [0, 0, 49, 1],
                            [0, 1, 50, 2],
                            [0, 2, 51, 3],
                            [0, 3, 52, 4],
                            [0, 4, 53, 16],
                            [0, 16, 50, 32]
                        ]
                    },
                    39: {
                        lock: [
                            [0, 0, 64, 64]
                        ]
                    },
                    40: {
                        lock: [
                            [0, 0, 64, 64]
                        ]
                    },
                    41: {},
                    42: {},
                    43: {
                        b: 1
                    }
                },
                desert: {
                    1: {},
                    2: {},
                    3: {},
                    4: {},
                    5: {},
                    6: {},
                    7: {},
                    8: {},
                    9: {},
                    10: {},
                    11: {},
                    12: {},
                    13: {},
                    14: {},
                    15: {},
                    16: {},
                    17: {},
                    18: {},
                    19: {
                        lock: [
                            [0, 0, 64, 32]
                        ]
                    },
                    20: {
                        lock: [
                            [32, 0, 64, 64]
                        ]
                    },
                    21: {
                        lock: [
                            [0, 32, 64, 64]
                        ]
                    },
                    22: {
                        lock: [
                            [0, 0, 32, 64]
                        ]
                    },
                    23: {
                        lock: [
                            [8, 0, 64, 16],
                            [14, 16, 64, 32]
                        ]
                    },
                    24: {
                        lock: [
                            [0, 0, 56, 16],
                            [0, 16, 50, 32]
                        ]
                    },
                    25: {
                        lock: [
                            [8, 48, 64, 64],
                            [14, 32, 64, 48]
                        ]
                    },
                    26: {
                        lock: [
                            [0, 48, 56, 64],
                            [0, 32, 50, 48]
                        ]
                    },
                    27: {
                        lock: [
                            [48, 8, 64, 64],
                            [32, 14, 48, 64]
                        ]
                    },
                    28: {
                        lock: [
                            [48, 0, 64, 56],
                            [32, 0, 48, 50]
                        ]
                    },
                    29: {
                        lock: [
                            [0, 8, 16, 64],
                            [16, 14, 32, 64]
                        ]
                    },
                    30: {
                        lock: [
                            [0, 0, 16, 56],
                            [16, 0, 32, 50]
                        ]
                    },
                    31: {
                        lock: [
                            [0, 0, 64, 32],
                            [0, 32, 32, 64]
                        ]
                    },
                    32: {
                        lock: [
                            [32, 0, 64, 64],
                            [0, 0, 32, 32]
                        ]
                    },
                    33: {
                        lock: [
                            [0, 32, 64, 64],
                            [32, 0, 64, 32]
                        ]
                    },
                    34: {
                        lock: [
                            [0, 0, 32, 64],
                            [32, 32, 64, 64]
                        ]
                    },
                    35: {
                        lock: [
                            [0, 0, 64, 64]
                        ]
                    },
                    36: {
                        lock: [
                            [0, 0, 64, 64]
                        ]
                    },
                    37: {
                        lock: [
                            [15, 0, 64, 1],
                            [14, 1, 64, 2],
                            [13, 2, 64, 3],
                            [12, 3, 64, 4],
                            [11, 4, 64, 16],
                            [14, 16, 64, 32]
                        ]
                    },
                    38: {
                        lock: [
                            [0, 0, 49, 1],
                            [0, 1, 50, 2],
                            [0, 2, 51, 3],
                            [0, 3, 52, 4],
                            [0, 4, 53, 16],
                            [0, 16, 50, 32]
                        ]
                    },
                    39: {
                        lock: [
                            [0, 0, 64, 64]
                        ]
                    },
                    40: {
                        lock: [
                            [0, 0, 64, 64]
                        ]
                    },
                    41: {},
                    42: {},
                    43: {
                        b: 1
                    }
                },
                moon: {
                    1: {},
                    2: {},
                    3: {},
                    4: {},
                    5: {},
                    6: {},
                    7: {},
                    8: {},
                    9: {},
                    10: {},
                    11: {},
                    12: {},
                    13: {},
                    14: {},
                    15: {},
                    16: {},
                    17: {},
                    18: {},
                    19: {
                        lock: [
                            [0, 0, 64, 32]
                        ]
                    },
                    20: {
                        lock: [
                            [32, 0, 64, 64]
                        ]
                    },
                    21: {
                        lock: [
                            [0, 32, 64, 64]
                        ]
                    },
                    22: {
                        lock: [
                            [0, 0, 32, 64]
                        ]
                    },
                    23: {
                        lock: [
                            [8, 0, 64, 16],
                            [14, 16, 64, 32]
                        ]
                    },
                    24: {
                        lock: [
                            [0, 0, 56, 16],
                            [0, 16, 50, 32]
                        ]
                    },
                    25: {
                        lock: [
                            [8, 48, 64, 64],
                            [14, 32, 64, 48]
                        ]
                    },
                    26: {
                        lock: [
                            [0, 48, 56, 64],
                            [0, 32, 50, 48]
                        ]
                    },
                    27: {
                        lock: [
                            [48, 8, 64, 64],
                            [32, 14, 48, 64]
                        ]
                    },
                    28: {
                        lock: [
                            [48, 0, 64, 56],
                            [32, 0, 48, 50]
                        ]
                    },
                    29: {
                        lock: [
                            [0, 8, 16, 64],
                            [16, 14, 32, 64]
                        ]
                    },
                    30: {
                        lock: [
                            [0, 0, 16, 56],
                            [16, 0, 32, 50]
                        ]
                    },
                    31: {
                        lock: [
                            [0, 0, 64, 32],
                            [0, 32, 32, 64]
                        ]
                    },
                    32: {
                        lock: [
                            [32, 0, 64, 64],
                            [0, 0, 32, 32]
                        ]
                    },
                    33: {
                        lock: [
                            [0, 32, 64, 64],
                            [32, 0, 64, 32]
                        ]
                    },
                    34: {
                        lock: [
                            [0, 0, 32, 64],
                            [32, 32, 64, 64]
                        ]
                    },
                    35: {
                        lock: [
                            [0, 0, 64, 64]
                        ]
                    },
                    36: {
                        lock: [
                            [0, 0, 64, 64]
                        ]
                    },
                    37: {
                        lock: [
                            [15, 0, 64, 1],
                            [14, 1, 64, 2],
                            [13, 2, 64, 3],
                            [12, 3, 64, 4],
                            [11, 4, 64, 16],
                            [14, 16, 64, 32]
                        ]
                    },
                    38: {
                        lock: [
                            [0, 0, 49, 1],
                            [0, 1, 50, 2],
                            [0, 2, 51, 3],
                            [0, 3, 52, 4],
                            [0, 4, 53, 16],
                            [0, 16, 50, 32]
                        ]
                    },
                    39: {
                        lock: [
                            [0, 0, 64, 64]
                        ]
                    },
                    40: {
                        lock: [
                            [0, 0, 64, 64]
                        ]
                    },
                    41: {},
                    42: {},
                    43: {
                        b: 1
                    }
                },
                city: {
                    1: {},
                    2: {},
                    3: {},
                    4: {},
                    5: {},
                    6: {},
                    7: {},
                    8: {},
                    9: {},
                    10: {},
                    11: {},
                    12: {},
                    13: {},
                    14: {},
                    15: {},
                    16: {},
                    17: {},
                    18: {},
                    19: {
                        lock: [
                            [0, 0, 64, 32]
                        ]
                    },
                    20: {
                        lock: [
                            [32, 0, 64, 64]
                        ]
                    },
                    21: {
                        lock: [
                            [0, 32, 64, 64]
                        ]
                    },
                    22: {
                        lock: [
                            [0, 0, 32, 64]
                        ]
                    },
                    23: {
                        lock: [
                            [8, 0, 64, 16],
                            [14, 16, 64, 32]
                        ]
                    },
                    24: {
                        lock: [
                            [0, 0, 56, 16],
                            [0, 16, 50, 32]
                        ]
                    },
                    25: {
                        lock: [
                            [8, 48, 64, 64],
                            [14, 32, 64, 48]
                        ]
                    },
                    26: {
                        lock: [
                            [0, 48, 56, 64],
                            [0, 32, 50, 48]
                        ]
                    },
                    27: {
                        lock: [
                            [48, 8, 64, 64],
                            [32, 14, 48, 64]
                        ]
                    },
                    28: {
                        lock: [
                            [48, 0, 64, 56],
                            [32, 0, 48, 50]
                        ]
                    },
                    29: {
                        lock: [
                            [0, 8, 16, 64],
                            [16, 14, 32, 64]
                        ]
                    },
                    30: {
                        lock: [
                            [0, 0, 16, 56],
                            [16, 0, 32, 50]
                        ]
                    },
                    31: {
                        lock: [
                            [0, 0, 64, 32],
                            [0, 32, 32, 64]
                        ]
                    },
                    32: {
                        lock: [
                            [32, 0, 64, 64],
                            [0, 0, 32, 32]
                        ]
                    },
                    33: {
                        lock: [
                            [0, 32, 64, 64],
                            [32, 0, 64, 32]
                        ]
                    },
                    34: {
                        lock: [
                            [0, 0, 32, 64],
                            [32, 32, 64, 64]
                        ]
                    },
                    35: {
                        lock: [
                            [0, 0, 64, 64]
                        ]
                    },
                    36: {
                        lock: [
                            [0, 0, 64, 64]
                        ]
                    },
                    37: {
                        lock: [
                            [15, 0, 64, 1],
                            [14, 1, 64, 2],
                            [13, 2, 64, 3],
                            [12, 3, 64, 4],
                            [11, 4, 64, 16],
                            [14, 16, 64, 32]
                        ]
                    },
                    38: {
                        lock: [
                            [0, 0, 49, 1],
                            [0, 1, 50, 2],
                            [0, 2, 51, 3],
                            [0, 3, 52, 4],
                            [0, 4, 53, 16],
                            [0, 16, 50, 32]
                        ]
                    },
                    39: {
                        lock: [
                            [0, 0, 64, 64]
                        ]
                    },
                    40: {
                        lock: [
                            [0, 0, 64, 64]
                        ]
                    },
                    41: {},
                    42: {},
                    43: {
                        b: 1
                    }
                }
            }
        }, {}],
        18: [function(t, e, i) {
            (function(i) {
                function n(t, e) {
                    var n = [];
                    for (var r in n.push(t), "STACK" != t && n.push(function() {
                            for (var t = Error().stack.split("\n")[4].match(/.*[\/|\\|\(]([^)]*)\)?$/)[1]; 26 > t.length;) t += " ";
                            return t
                        }()), e) n.push(e[r]);
                    for (e = "", r = 0; r < n.length; r++) e = "object" == typeof n[r] ? e + (s.inspect(n[r]) + "\t") : e + (n[r] + "\t");
                    console.log(e), "production" == i.env.NODE_ENV && (o ? (e = (new Date).toUTCString() + "\t" + e + "\n", a.appendFile(o, e, function(t) {
                        t && console.log("Log write error: ", t)
                    })) : console.log("Logging file output not set")), l && l.onLog(t, n)
                }

                function r(e) {
                    e = t(8).parse(e);
                    for (var i = 0; i < e.length; i++) {
                        var r = e[i];
                        n("STACK", [r.fileName + (null != r.lineNumber ? ":" + r.lineNumber : "") + (null != r.functionName ? " (" + r.functionName + ")" : "")])
                    }
                }
                var s = t(10),
                    a = t(2),
                    o = null,
                    l = null,
                    h = !1;
                if (i.browser) throw Error("Used logging system in frontend");
                e.exports.setFile = function(t) {
                    o = t
                }, e.exports.setHandler = function(t) {
                    l = t
                }, e.exports.setDebugState = function(t) {
                    h = t
                }, e.exports.info = function() {
                    n("INFO", arguments)
                }, e.exports.error = function() {
                    n("ERROR", arguments)
                }, e.exports.warn = function() {
                    n("WARN", arguments)
                }, e.exports.debug = function() {
                    h && n("DEBUG", arguments)
                }, e.exports.panicWithStack = function(t) {
                    n("PANIC", arguments), r(t)
                }, e.exports.printErrorStack = function(t) {
                    r(t)
                }
            }).call(this, t(7))
        }, {}],
        19: [function(t, e, i) {
            var n = t(125),
                r = t(127),
                s = t(47),
                a = t(48);
            e.exports = new function() {
                function t() {
                    i = !0;
                    for (var t = 0; t < n.length; t++) {
                        var e = n[t],
                            r = e.n + "ball";
                        e.b && (r = e.b);
                        var s = 0;
                        e.t && (s = 1), r = {
                            id: e.c,
                            name: r,
                            country: e.n,
                            invert: !0 === e.i,
                            ball64: null,
                            keywords: null,
                            score: e.s || 0,
                            type: s,
                            minLvl: e.l || 0
                        }, l.push(r), h[e.c] = r
                    }
                    l.sort(function(t, e) {
                        return e.score - t.score
                    })
                }

                function e() {
                    for (var t = 0; t < l.length && null == l[t].ball64; t++) {
                        var e = new r;
                        e.ball = l[t].id;
                        var i = l[t],
                            n = document.createElement("canvas");
                        n.width = 64, n.height = 64, i.ball64 = new s(n, 64, 64, !1, e)
                    }
                }
                var i = !1,
                    o = new a(64),
                    l = [],
                    h = {},
                    c = !1;
                this.ensurePreviews = function(t) {
                    c ? t() : function(t) {
                        e(), c = !0,
                            function e(i) {
                                for (var n = !0; !(i >= l.length) && o.add(l[i].ball64);) i++, n = !1;
                                n ? t() : o.render(function() {
                                    o.reset(), e(i)
                                })
                            }(0)
                    }(t)
                }, this.getBallList = function() {
                    return i || t(), l
                }, this.getBallRecord = function(e) {
                    return i || t(), void 0 !== h[e] ? h[e] : null
                }
            }
        }, {}],
        20: [function(t, e, i) {
            var n = t(76),
                r = t(131);
            e.exports = new function() {
                var t = this,
                    e = null,
                    i = null,
                    s = null,
                    a = [],
                    o = null,
                    l = null,
                    h = !1,
                    c = null,
                    u = !1;
                this.loadConversations = function(t, e) {
                    n.socialMessage("loadConversationList", {
                        start: t,
                        count: e
                    })
                }, this.loadMessages = function(t) {
                    n.socialMessage("loadMessages", {
                        playerName: t
                    })
                }, this.setActive = function(t) {
                    (u = t) || this.switchToConversation(null)
                }, this.switchToConversation = function(t) {
                    h = !1, c && (clearTimeout(c), c = null), o != t && ((o = t) && (this.createConversationIfNeeded(t) && (h = !0), this.setSeenDelayed(t), this.loadMessages(t)), e && e())
                }, this.setSeenDelayed = function(t) {
                    var e = this;
                    setTimeout(function() {
                        e.setSeen(t)
                    }, 1e3)
                }, this.setSeen = function(t) {
                    var i = this.findConversation(t);
                    i && (i.seen || (n.socialMessage("messageSeen", {
                        name: t
                    }), i.seen = !0), e && e())
                }, this.findConversation = function(t) {
                    for (var e = 0; e < a.length; e++)
                        if (a[e].name == t) return a[e];
                    return null
                }, this.createConversationIfNeeded = function(t) {
                    for (var e = 0; e < a.length; e++)
                        if (a[e].name == t) return !1;
                    return a.unshift({
                        name: t
                    }), !0
                }, this.bumpConversation = function(e) {
                    for (var i = null, n = -1, r = 0; r < a.length; r++)
                        if (a[r].name == e) {
                            i = a[r], n = r;
                            break
                        } return i ? (a.splice(n, 1), a.unshift(i), i = !1) : (a.unshift({
                        name: e,
                        seen: !0
                    }), i = !0), null == o && u && t.switchToConversation(e), i
                }, this.setConversationLastMessage = function(t, e, i) {
                    for (var n = 0; n < a.length; n++) a[n].name == t && (a[n].lastMsg = e, a[n].time = r.getFriendlyDateTime(i))
                }, this.sendMessageToCurrentConversation = function(i) {
                    o && (n.socialMessage("sendMessage", {
                        playerName: o,
                        msg: i
                    }), t.bumpConversation(o), t.setConversationLastMessage(o, i, new Date), e && e(), s && s(o, {
                        incoming: !1,
                        time: r.getFriendlyExactDateTime(new Date),
                        text: i
                    }))
                }, this.receivedMessage = function(i, a, l) {
                    l = new Date(1e3 * l), t.bumpConversation(i);
                    var h = t.findConversation(i);
                    t.setConversationLastMessage(i, a, l), o == i && u ? (s && s(i, {
                        incoming: !0,
                        time: r.getFriendlyExactDateTime(l),
                        text: a
                    }), n.socialMessage("messageSeen", {
                        name: i
                    }), h.seen = !0) : h.seen = !1, e && e()
                }, this.getConversationList = function() {
                    return a
                }, this.getCurrentMessages = function() {
                    return l
                }, this.getCurrentConversationName = function() {
                    return o
                }, this.onConversationListUpdate = function(t) {
                    e = t
                }, this.onAddMessage = function(t) {
                    s = t
                }, this.onConversationLoad = function(t) {
                    i = t
                }, n.onSocialMessage("conversationList", function(i) {
                    a = i.list, u && null == o && 0 < a.length && t.switchToConversation(a[0].name), h && t.bumpConversation(o), e && e()
                }), n.onSocialMessage("conversation", function(t) {
                    o == t.name && (i && i(t), l = t.list)
                }), n.onSocialMessage("chatMessage", function(e) {
                    t.receivedMessage(e.fromPlayer, e.msg, e.time)
                })
            }
        }, {}],
        21: [function(t, e, i) {
            function n(t) {
                this.session = t, this.init()
            }
            i = t(151);
            var r = t(150);
            t(25);
            var s = t(59),
                a = t(142).Bullet,
                o = t(142).BulletTypes,
                l = t(142).WeaponTypes,
                h = t(148),
                c = t(146).ItemTypes,
                u = t(143),
                p = t(149),
                d = t(155),
                f = t(29),
                m = t(129),
                g = t(131),
                v = t(57),
                y = t(78),
                x = t(54),
                b = t(37),
                w = t(39),
                S = t(34),
                T = t(86),
                k = t(58),
                C = t(61);
            n.prototype = Object.create(i.prototype), n.prototype.constructor = i, n.prototype.session = null, n.prototype.tick = 0, n.prototype.joinedSessionTime = null, n.prototype.lastLocalSimulatedTick = 0, n.prototype.localCharacter = null, n.prototype.ctfFlags = null, n.prototype.ctfLastCaptureTick = 0, n.prototype.currentFlags = 0, n.prototype.currentInput = 0, n.prototype.currentAngle = 0, n.prototype.currentRopeTarget = null, n.prototype.ropeSetTime = null, n.prototype.lastInput = 0, n.prototype.lastAngle = 0, n.prototype.lastRopeTarget = null, n.prototype.fakeRopeSent = !0, n.prototype.currentTile = null, n.prototype.lastTile = null, n.prototype.teamRequested = !1, n.prototype.gameState = null, n.prototype.gameStateReconciled = null, n.prototype.lastSnapshotTick = null, n.prototype.firstGameUpdate = !1, n.prototype.lastInputSent = 0, n.prototype.lastAngleSent = 0, n.prototype.nextSeq = 1, n.prototype.estimatedStartTime = 0, n.prototype.startTimeList = null, n.prototype.lastTickTime = Date.now(), n.prototype.lastUserInputTime = 0, n.prototype.lagScore = 0, n.prototype.nearUsable = null, n.prototype.currentUsable = null, n.prototype.zoomTarget = 1, n.prototype.zoomSpeed = 0, n.prototype.marketingCam = !1, n.prototype.localSnapshots = null, n.prototype.begin = function(t, e, i) {
                if (this.startTimeList = [], this.localSnapshots = [], this.state = 1, this.teamRequested = !1, this.lastUserInputTime = Date.now(), this.tick = t - 1, this.joinedSessionTime = Date.now(), this.physic = new h(this), this.firstGameUpdate = !0, this.map.mapDef.border && this.physic.setBorder([this.map.mapWidth * this.map.tileSize, this.map.mapHeight * this.map.tileSize], 0 != this.map.mapDef.bottomBorder), this.addStartTime(Date.now() - 1e3 * this.tick / r.ticksPerSecond), x.mapGfx.resetDamage(), this.initBricks(i), v.isHit(13), !this.map.quadTree) throw Error("No quadtree");
                this.map.quadTree.unserialize(e, e.byteLength), this.map.stampOutUsingTree(), this.gameState = new m, e = this.gameState.createPatch(i), this.handleSnapshot(t, e), x.ui.statsWidget.updatePlayerList(i.getSheets("player")), x.ui.statsWidget.setTeamScore(this.getTeamScore()), x.materialCompose.setBlackWhiteFactor(0 == this.session.lastMatchData.warmup ? 0 : .8), this.session.isDev && x.ui.setDev(), k.show(!0)
            }, n.prototype.end = function() {
                for (this.state = 0; 0 < this.bullets.length;) this.pruneBullet(this.bullets[0]);
                for (; 0 < this.planes.length;) this.planes.pop().remove()
            }, n.prototype.initBricks = function(t) {
                t = t.getSheets("brick");
                for (var e = 0; e < t.length; e++) {
                    var i = t[e];
                    this.map.addBrick(i.get("x"), i.get("y"), !1)
                }
            }, n.prototype.addStartTime = function(t) {
                if (this.startTimeList.push(t), 100 < this.startTimeList.length && this.startTimeList.shift(), 5 <= this.startTimeList.length) {
                    (t = this.startTimeList.slice()).sort();
                    for (var e = ~~(t.length / 2), i = 0, n = 0; n < e; n++) i += t[n];
                    this.estimatedStartTime = i / e
                } else {
                    for (n = i = 0; n < this.startTimeList.length; n++) i += this.startTimeList[n];
                    this.estimatedStartTime = i / this.startTimeList.length
                }
            }, n.prototype.tickUpdateLocalRope = function() {
                var t = this.currentAngle,
                    e = this.currentInput >> 3 & 1,
                    i = this.lastInput >> 3 & 1;
                if (this.lastRopeTarget = this.currentRopeTarget, this.localCharacter) {
                    if (!e || i || this.currentUsable) e && !this.currentUsable || (this.currentRopeTarget = null, this.localCharacter.fakeRopeTarget = null);
                    else {
                        e = this.localCharacter.pos[0], i = this.localCharacter.pos[1], r.maxRopeLength = window.maxRopeLength;
                        var n = [e, i],
                            s = [e + Math.cos(t) * r.maxRopeLength, i + Math.sin(t) * r.maxRopeLength];
                        t = null;
                        var a = !1,
                            o = this.map.quadTree.findFirstOnLine(e, i, s[0], s[1], 0, !0);
                        if (!o && this.map.mapDef.border) {
                            var l = [this.map.mapWidth * this.map.tileSize, this.map.mapHeight * this.map.tileSize],
                                h = 0 != this.map.mapDef.bottomBorder,
                                c = g.intersectionLineRect(e, i, s[0], s[1], 0, 0, l[0], l[1]);
                            if (c)
                                for (var p = g.sign(e - s[0]), d = g.sign(i - s[1]), f = 0; f < c.length; f++) {
                                    var m = e - c[f][0],
                                        v = i - c[f][1];
                                    Math.sqrt(m * m + v * v) < r.maxRopeLength && p == g.sign(m) && d == g.sign(v) && (h || c[f][1] != l[1]) && (o = c[f].slice())
                                }
                        }
                        o ? (m = this.localCharacter.pos[0] - o[0], v = this.localCharacter.pos[1] - o[1], t = [o, Math.sqrt(m * m + v * v)]) : (this.localCharacter.fakeRopeTarget = s.slice(), this.localCharacter.fakeRopeProgress = 0, this.fakeRopeSent = !1), null == (e = this.findFirstCharacterOnLine([n[0], n[1]], [s[0], s[1]], this.localCharacter)) && null == t ? this.currentRopeTarget = null : (this.currentRopeTarget = null == e && null != t ? t[0] : null != e && null == t ? e[0] : e[1] < t[1] ? e[0] : t[0], this.localCharacter.fakeRopeTarget = null, a = !0), a && T.playSound("rope1", this.localCharacter.pos, !0), this.ropeSetTime = this.tick
                    }
                    this.currentRopeTarget instanceof u && this.tick - this.ropeSetTime > r.maxRopeCharTime && (this.currentRopeTarget = null)
                } else this.currentRopeTarget = null
            }, n.prototype.findFirstCharacterOnLine = function(t, e, i) {
                for (var n = 1e8, r = null, s = 0; s < this.characters.length; s++) {
                    var a = this.characters[s];
                    if (a != i && g.collideLineCircle([t, e], a.pos, a.radius)) {
                        var o = t[0] - a.pos[0],
                            l = t[1] - a.pos[1];
                        n > (o = o * o + l * l) && (n = o, r = a)
                    }
                }
                return r ? [r, Math.sqrt(n)] : null
            }, n.prototype.addEvent = function(t, e, i, n) {
                switch (t) {
                    case 0:
                        this.characters.push(i), this.session.localPlayer && i == this.session.localPlayer.character && (this.localCharacter = this.session.localPlayer.character);
                        break;
                    case 1:
                    case 2:
                        throw Error("deprecated");
                    default:
                        C.error("Unknown event: ", t)
                }
            }, n.prototype.estimateTick = function() {
                var t = ~~((Date.now() - this.estimatedStartTime) / 1e3 * r.ticksPerSecond);
                t > this.tick && (this.tick = t)
            }, n.prototype.handleSnapshotTiming = function(t) {
                this.addStartTime(Date.now() - 1e3 * t / r.ticksPerSecond)
            }, n.prototype.tickAddInput = function(t) {
                if (this.localCharacter && this.lastLocalSimulatedTick != this.tick && !window.freeze) {
                    t = this.localCharacter.hasJetpack(this.tick), this.lastInput = this.currentInput, this.lastTile = this.currentTile, this.currentFlags = this.currentInput = 0, (v.isDown(65) || v.isDown(37)) && (this.currentInput |= 1, k.set(0)), (v.isDown(68) || v.isDown(39)) && (this.currentInput |= 2, k.set(0)), !t && (v.isHit(32) || v.isHit(87) || v.isHit(38)) && (this.currentFlags |= 1, k.set(1)), v.isHit(69) && (this.currentFlags |= 2), v.isHit(81) && (this.currentFlags |= 4), v.isDown(v.MOUSE_RIGHT) && (this.currentInput |= 8, k.set(3)), v.isDown(v.MOUSE_LEFT) && (this.currentInput |= 16, k.set(2)), t && (v.isDown(32) || v.isDown(87) || v.isDown(38)) && (this.currentInput |= 32), t = v.getMousePos(), this.lastAngle = this.currentAngle, this.currentAngle = Math.atan2(t[1], t[0]), isNaN(this.currentAngle) && (this.currentAngle = 0), this.localCharacter.setRenderAngle(this.currentAngle), (this.lastAngle != this.currentAngle || this.lastInput != this.currentInput || this.currentFlags) && (this.lastUserInputTime = Date.now()), this.currentTile = this.getCurrentTile(), t = -1;
                    var e = 0;
                    if (null == this.currentUsable) {
                        for (e = 49; 57 >= e; e++) v.isHit(e) && (t = e - 48);
                        0 != (e = v.getScrollDelta()) && k.set(4)
                    }
                    var i = !1;
                    this.lastInput == this.currentInput && 0 == e && -1 == t || (i = !0), this.hasRopeTargetChanged() && (i = !0), this.tick - this.lastInputSent >= r.inputResendTime && (i = !0), this.currentFlags && (i = !0, this.localCharacter.flagsList.push({
                        tick: this.tick,
                        flags: this.currentFlags
                    })), this.lastAngle != this.currentAngle && this.tick - this.lastAngleSent >= r.maxAngleResend && (this.lastAngle = this.currentAngle, i = !0);
                    var n = !1;
                    this.currentTile && this.lastTile && this.currentTile[0] == this.lastTile[0] && this.currentTile[1] == this.lastTile[1] || (n = !0), n && l[this.localCharacter.currentWeapon].bricktool && (i = !0), i && (this.session.sendInput(this.nextSeq, this.currentInput, this.currentFlags, this.currentAngle, this.currentRopeTarget, this.localCharacter.fakeRopeTarget, e, t, this.currentTile), this.fakeRopeSent = !0, this.lastAngleSent = this.lastInputSent = this.tick, this.localCharacter.inputList.push({
                        tick: this.tick,
                        seq: this.nextSeq,
                        received: null,
                        flags: this.currentFlags,
                        input: this.currentInput,
                        lastInput: this.lastInput,
                        ropeTarget: this.currentRopeTarget,
                        soundPlayed: !1
                    }), this.nextSeq++)
                }
            }, n.prototype.hasRopeTargetChanged = function() {
                if (!this.fakeRopeSent) return !0;
                if (null == this.lastRopeTarget && null == this.currentRopeTarget) return !1;
                if (null != this.lastRopeTarget && null != this.currentRopeTarget) {
                    var t = this.lastRopeTarget instanceof u,
                        e = this.currentRopeTarget instanceof u;
                    if (t && e) return this.lastRopeTarget != this.currentRopeTarget;
                    if (!t && !e) return this.currentRopeTarget[0] != this.lastRopeTarget[0] || this.currentRopeTarget[1] != this.lastRopeTarget[1]
                }
                return !0
            }, n.prototype.buildRopeTargetFromSheet = function(t) {
                var e = t.get("ropeType");
                return 1 == e ? [t.get("ropePosX"), t.get("ropePosY")] : 2 == e && (t = this.session.getPlayerById(t.get("ropeChar"))) && t.character ? t.character : null
            }, n.prototype.isCharacterObjectValid = function(t) {
                return !(!t || !t.player || -1 == this.session.players.indexOf(t.player) || t != t.player.character)
            }, n.prototype.getCurrentTile = function() {
                var t = v.getAbsoluteMousePos(),
                    e = b.getCamera();
                return e = [t[0] + e[0] / b.zoom, t[1] + e[1] / b.zoom], t = Math.floor(e[0] / this.map.tileSize * b.zoom), e = Math.floor(e[1] / this.map.tileSize * b.zoom), 0 > t || t >= this.map.mapWidth || 0 > e || e >= this.map.mapHeight ? null : [t, e]
            }, n.prototype.validateRopeTarget = function(t) {
                return t instanceof u && !this.isCharacterObjectValid(t) ? null : t
            }, n.prototype.tickRemoveOldInputs = function(t) {
                if (t)
                    for (; 0 < this.outstandingInputs.length && this.outstandingInputs[0].seq <= t.seq;) this.outstandingInputs.shift()
            }, n.prototype.pruneOldInputs = function() {
                if (this.localCharacter)
                    for (var t = this.localCharacter.inputList; 20 < t.length || 1 < t.length && 100 < this.tick - t[0].tick;) t.shift()
            }, n.prototype.snapshotReconciliation = function() {
                if (this.localCharacter && 0 < this.localCharacter.inputList.length) {
                    var t = this.localCharacter.inputList[0],
                        e = t.tick;
                    for (t.received && (e += this.lastSnapshotTick - t.received + 1), t = e; t < this.lastSnapshotTick; t++)(e = this.localCharacter.getInputAt(t)) ? (this.localCharacter.setCurrentInput(e.input), this.localCharacter.ropeTarget = this.validateRopeTarget(e.ropeTarget)) : (this.localCharacter.setCurrentInput(0), this.localCharacter.ropeTarget = null), (e = this.localCharacter.getFlagsAt(t)) && this.localCharacter.setFlags(e.flags), this.localCharacter.updateControl(t), this.physic.update(!0);
                    for (this.gameStateReconciled = this.gameState.copy(), t = 0; t < this.characters.length; t++) {
                        e = this.characters[t];
                        var i = this.gameStateReconciled.findSheet("player", e.player.pid);
                        i.set("posX", e.pos[0]), i.set("posY", e.pos[1]), i.set("velX", e.vel[0]), i.set("velY", e.vel[1]), i.set("input", e.currentInput), i.set("lastInput", e.lastInput), i.set("inAir", e.inAir), i.set("jumpCountAir", e.jumpCountAir)
                    }
                } else this.gameStateReconciled = this.gameState.copy()
            }, n.prototype.tickPrediction = function() {
                this.applyAllSheetPlayer(this.gameStateReconciled), this.tick - this.lastSnapshotTick >= 2.5 * r.ticksPerSecond && this.lagError();
                for (var t = this.lastSnapshotTick; t < this.tick; t++) {
                    for (var e = 0; e < this.characters.length; e++) {
                        var i = this.characters[e].getInputAt(t);
                        if (i) {
                            this.characters[e].setCurrentInput(i.input);
                            var n = this.validateRopeTarget(i.ropeTarget);
                            null == this.characters[e].ropeTarget && null != n && (i.soundPlayed || this.characters[e] == this.localCharacter || T.playSound("rope1", this.characters[e].pos, !0)), this.characters[e].ropeTarget = n, i.soundPlayed = !0
                        } else this.characters[e].setCurrentInput(0);
                        (i = this.characters[e].getFlagsAt(t)) && this.characters[e].setFlags(i.flags), this.characters[e].applyExternalForce(t), this.characters[e].updateControl(t)
                    }
                    this.physic.update(!1)
                }
            }, n.prototype.updateBulletPhysic = function() {
                for (var t = 0; t < this.bullets.length; t++) {
                    var e = this.bullets[t],
                        i = e.lastPos[0] - e.pos[0],
                        n = e.lastPos[1] - e.pos[1];
                    e.travelDistance += Math.sqrt(i * i + n * n), e.age++, e.lastPos = e.pos.slice()
                }
                this.physic.updateBullets()
            }, n.prototype.tickCreateLocalSnapshot = function() {
                var t = {
                    tick: this.tick,
                    listPlayers: [],
                    listBullets: []
                };
                this.lastTickTime = Date.now();
                for (var e = 0; e < this.characters.length; e++) {
                    var i = this.characters[e];
                    t.listPlayers.push({
                        character: i,
                        pos: i.pos.slice(),
                        vel: [i.vel[0], i.vel[1]]
                    }), 0 == r.interpolationTime && i.setRenderPos(i.pos[0], i.pos[1])
                }
                this.localSnapshots.push(t)
            }, n.prototype.handleSnapshot = function(t, e) {
                this.handleSnapshotTiming(t), this.session.simulation && (this.gameState.applyPatch(e), this.handlePatch(t, this.gameState, e), this.lastSnapshotTick = t, this.pruneOldInputs(), this.applyAllSheetPlayer(this.gameState), this.snapshotReconciliation(), this.firstGameUpdate = !1), this.handleMatchSheet(this.gameState.findSheet("match"))
            }, n.prototype.handlePatch = function(t, e, i) {
                this.handlePatchNewPlayer(this.gameState, i), this.handlePatchLeavePlayer(this.gameState, i), this.handlePatchPlayer(t, this.gameState, i), this.handlePatchUsables(this.gameState, i), this.handlePatchTeamScore(this.gameState, i), this.handlePatchBullets(this.gameState, i), this.handlePatchBricks(this.gameState, i), this.handlePatchPlanes(this.gameState, i), this.handlePatchItems(t, this.gameState, i), this.handlePatchObjects(t, this.gameState, i)
            }, n.prototype.handleInputTiming = function(t, e) {
                for (var i = 0; i < this.localCharacter.inputList.length; i++) {
                    var n = this.localCharacter.inputList[i];
                    if (n.seq == t) {
                        n.received = e, 0 > (t = 1e3 * (e - n.tick) / r.ticksPerSecond) && (t = 0), this.lagScore += t, this.lagScore -= 300, this.lagScore > r.lagScoreMax && this.lagError(), 0 > this.lagScore && (this.lagScore = 0);
                        break
                    }
                }
            }, n.prototype.handleInstantData = function(t, e) {
                this.gameState.applyPatch(e), this.session.simulation && this.handlePatch(t, this.gameState, e)
            }, n.prototype.handleEvent = function(t, e, i, n) {
                switch (i) {
                    case "inputFlags":
                        this.handlePlayerFlags(t, e, n.flags);
                        break;
                    case "hitMap":
                        this.handleHitMap(n.bullet, [n.posX, n.posY], n.affectMap);
                        break;
                    case "hitChar":
                        this.handleHitChar(n.bullet, [n.posX, n.posY]);
                        break;
                    case "hitWater":
                        this.handleHitWater(n.bullet, [n.posX, n.posY]);
                        break;
                    case "hitPG":
                        this.handleHitPG(n.bullet, [n.posX, n.posY]);
                        break;
                    case "force":
                        this.handleExternalForce(t, e, n);
                        break;
                    case "capture":
                        this.handleCaptureEvent(n.team, n.player);
                        break;
                    case "kill":
                        this.handleKillAnnouncement(n.killerId, n.killedId, n.cause);
                        break;
                    case "shot":
                        this.handleShotEvent(e, n.weapon, n.result);
                        break;
                    case "brick":
                        this.handleBrickEvent(e, [n.tX, n.tY]);
                        break;
                    default:
                        throw Error("Unknown event: " + i)
                }
            }, n.prototype.handlePatchNewPlayer = function(t, e) {
                for (var i = 0; i < e.added.length; i++)
                    if ("player" == e.added[i].sheet) {
                        var n = e.added[i].id,
                            r = new y(n);
                        this.session.players.push(r), n == this.session.pid && (this.session.localPlayer = r), null != (n = t.findSheet("player", n)).get("team") && (r.announcedInChat = !0), this.applySheetPlayer(n)
                    }
            }, n.prototype.handlePatchLeavePlayer = function(t, e) {
                for (t = 0; t < e.removed.length; t++)
                    if ("player" == e.removed[t].sheet) {
                        var i = e.removed[t].id,
                            n = this.session.getPlayerById(i);
                        if (!n) throw Error("Cannot remove player " + i);
                        if (this.killPlayersCharacter(n), -1 == (i = this.session.players.indexOf(n))) {
                            C.error("cannot find player to remove from player list");
                            break
                        }
                        this.session.players.splice(i, 1), x.ui.chatWidget.addStatusMsg(n.nick, n.team, 1)
                    }
            }, n.prototype.handlePatchPlayer = function(t, e, i) {
                for (var n = [], r = 0; r < i.added.length; r++) {
                    var s = e.findSheet("player", i.added[r].id);
                    s && n.push(s)
                }
                for (r = 0; r < i.changes.length; r++)(s = e.findSheet("player", i.changes[r].id)) && n.push(s);
                for (r = 0; r < n.length; r++)
                    if (s = n[r], (e = this.session.getPlayerById(s.id)) && e.character && (e.character.currentWeapon = s.get("currentWeapon"), e.character.jetPackSince = s.get("jetPack"), e.character.ammo = s.get("ammo"), e.character.health = s.get("health"), e.character.angle = s.get("angle"), e.character.setArrows(s.get("arrows0"), 0), e.character.setArrows(s.get("arrows1"), 32), i = s.get("eye"), e.character.eye != i && (e.character.eye = i, e.character.ballGfx.setEye(i)), e.character != this.localCharacter && (i = 3 == s.get("ropeType"), !e.character.fakeRopeTarget && i ? e.character.fakeRopeTarget = [s.get("ropePosX"), s.get("ropePosY")] : e.character.fakeRopeTarget && !i && (e.character.fakeRopeTarget = null, e.character.fakeRopeProgress = 0)), i = e.character.hasJetpack(t), e.character.ballGfx.setJetpack(i), !this.session.localPlayer || this.session.localPlayer.pid != s.id)) {
                        for (e.character.inputList.push({
                                tick: t,
                                input: s.get("input"),
                                lastInput: s.get("lastInput"),
                                ropeTarget: this.buildRopeTargetFromSheet(s),
                                soundPlayed: !1
                            }); 50 < e.character.inputList.length;) e.character.inputList.shift();
                        for (; 50 < e.character.flagsList.length;) e.character.flagsList.shift();
                        for (; 20 < e.character.forceList.length;) e.character.forceList.shift()
                    }
            }, n.prototype.handlePatchTeamScore = function(t, e) {
                for (var i = !1, n = 0; n < e.changes.length; n++) "team" == e.changes[n].sheet && (i = !0);
                i && 2 == (t = t.getSheets("team")).length && (t = [t[0].get("score"), t[1].get("score")], w.matchInfo.setTeamScore(t), x.ui.statsWidget.setTeamScore(t))
            }, n.prototype.handlePatchBullets = function(t, e) {
                for (var i = 0; i < e.added.length; i++) {
                    var n = e.added[i];
                    if ("bullet" == n.sheet && (n = t.findSheet("bullet", n.id))) {
                        var r = null,
                            s = this.session.getPlayerById(n.get("owner"));
                        s && (r = s.character), (s = new a(n.id, n.get("type"), 0, [n.get("posX"), n.get("posY")], [n.get("velX"), n.get("velY")], null, !0)).ownerObject = r, s.readFromSheet(n), this.bullets.push(s)
                    }
                }
                for (i = 0; i < e.removed.length; i++) "bullet" == (t = e.removed[i]).sheet && (s = this.bulletById(t.id), this.pruneBullet(s))
            }, n.prototype.handlePatchBricks = function(t, e) {
                if (!this.firstGameUpdate)
                    for (var i = 0; i < e.added.length; i++) {
                        var n = e.added[i];
                        "brick" == n.sheet && (n = t.findSheet("brick", n.id)) && this.map.addBrick(n.get("x"), n.get("y"), !0)
                    }
            }, n.prototype.handlePatchPlanes = function(t, e) {
                for (var i = 0; i < e.added.length; i++) {
                    var n = e.added[i];
                    if ("plane" == n.sheet) {
                        var r = t.findSheet("plane", n.id);
                        r && ((n = new p(this, n.id)).readFromSheet(r), this.planes.push(n))
                    }
                }
                for (i = 0; i < e.removed.length; i++)
                    if ("plane" == (n = e.removed[i]).sheet) {
                        var s = -1;
                        for (r = 0; r < this.planes.length; r++) this.planes[r].id == n.id && (this.planes[r].remove(), s = r);
                        if (-1 == s) return void C.error("Cannot remove plane");
                        this.planes.splice(s, 1)
                    } for (i = 0; i < e.changes.length; i++)
                    if ("plane" == (n = e.changes[i]).sheet)
                        for (s = t.findSheet("plane", n.id), r = 0; r < this.planes.length; r++)
                            if (this.planes[r].id == n.id) {
                                this.planes[r].readFromSheet(s);
                                break
                            }
            }, n.prototype.handlePatchItems = function(t, e, i) {
                t = [];
                for (var n = 0; n < i.added.length; n++) {
                    var r = i.added[n];
                    "item" == r.sheet && t.push(r.id)
                }
                for (n = 0; n < i.changes.length; n++) "item" == (r = i.changes[n]).sheet && t.push(r.id);
                for (n = 0; n < t.length; n++) {
                    i = (r = e.findSheet("item", t[n])).get("active"), r = this.map.items[r.id];
                    var s = c[r.type];
                    if (r.active != i) {
                        if (!i && !this.firstGameUpdate) {
                            var a = [(r.x + .5) * this.map.tileSize, (r.y + .5) * this.map.tileSize];
                            s.soundPickup && T.playSound(s.soundPickup, a, !0), s.particlesPickup && x.particles.create(x.layerParticles, s.particlesPickup, a[0], a[1], 0)
                        }
                        r.active = i
                    }
                }
            }, n.prototype.handlePatchObjects = function(t, e, i) {
                t = [];
                for (var n = 0; n < i.added.length; n++) {
                    var r = i.added[n];
                    "obj" == r.sheet && t.push(r.id)
                }
                for (n = 0; n < i.changes.length; n++) "obj" == (r = i.changes[n]).sheet && t.push(r.id);
                for (n = 0; n < t.length; n++)
                    if (i = (r = e.findSheet("obj", t[n])).get("active"), (r = this.map.objects[r.id]).active != i) {
                        if (0 == i)
                            if (this.firstGameUpdate) r.animTime = 0;
                            else {
                                r.animTime = Date.now();
                                var s = null,
                                    a = null,
                                    o = [0, 0];
                                switch (r.typeDef[5]) {
                                    case "misc":
                                    case "tree":
                                        s = "tree1";
                                        break;
                                    case "hydrant":
                                        s = "water2", a = "hydrant1", o = [0, 40]
                                }
                                s && T.playSound(s, r.renderPos, !0), a && x.particles.create(x.layerParticles, a, r.renderPos[0] + o[0], r.renderPos[1] + o[1], -Math.PI / 2)
                            }
                        else r.sprite.angle = 0, r.sprite.pos.x = r.renderPos[0], r.sprite.pos.y = r.renderPos[1];
                        r.active = i
                    }
            }, n.prototype.handlePatchUsables = function(t, e) {
                for (t = 0; t < this.characters.length; t++) this.characters[t].usable = !1;
                for (this.currentUsable = null, e = this.gameState.getSheets("usable"), t = 0; t < e.length; t++) {
                    var i = e[t],
                        n = this.map.usables[i.id],
                        r = i.get("usedBy"),
                        s = i.get("heat"),
                        a = null;
                    null !== r && (a = this.session.getPlayerById(r)), r = a && a.character ? a.character : null, a = !0, r ? (r.usable = !0, n.heat = s, n.usedBy = r, r == this.localCharacter && (this.currentUsable = n, a = !1)) : n.usedBy = null, a && (n.angle = i.get("angle"))
                }
            }, n.prototype.handlePlayerFlags = function(t, e, i) {
                (e = this.session.getPlayerById(e.id)) && e.character && e.character != this.localCharacter && e.character.flagsList.push({
                    tick: t,
                    flags: i
                })
            }, n.prototype.handleHitMap = function(t, e, i) {
                var n = o[t].strengthExplosion;
                if (0 != n && i && this.physic.explosion(e, n, !0), 0 < n && this.localCharacter) {
                    i = this.localCharacter.pos[0] - e[0];
                    var r = this.localCharacter.pos[1] - e[1];
                    i = Math.sqrt(i * i + r * r), b.rumble(Math.max((1e3 - i) / 500, 0))
                }
                0 < n && this.localCharacter && (i = this.localCharacter.pos[0] - e[0], r = this.localCharacter.pos[1] - e[1], 100 > (i = Math.sqrt(i * i + r * r) - 32) && (b.zoom += .12 * (1 - Math.max(0, i / 100)))), S.addBlast(e[0], e[1], .75 * n), n = o[t].lightStrength, i = o[t].lightFadeOut, 0 < n && S.addFlash(e[0], e[1], 500, n, i), (t = o[t]).particleGround && x.particles.create(x.layerParticles, t.particleGround, e[0], e[1], 0), t.soundGround && T.playSound(t.soundGround, e, !0)
            }, n.prototype.handleHitChar = function(t, e) {
                var i = (t = o[t]).strengthExplosion;
                0 < i && (S.addBlast(e[0], e[1], .75 * i), S.addFlash(e[0], e[1], 500, .5, .05), t.particleGround && x.particles.create(x.layerParticles, t.particleGround, e[0], e[1], 0)), t.soundGround && T.playSound(t.soundGround, e, !0)
            }, n.prototype.handleHitWater = function(t, e) {
                (t = o[t]).particleWater && x.particles.create(x.layerParticles, t.particleWater, e[0], e[1], .5 * -Math.PI), t.soundWater && T.playSound(t.soundWater, e, !0)
            }, n.prototype.handleHitPG = function(t, e) {
                (t = o[t]).particlePlane && x.particles.create(x.layerParticles, t.particlePlane, e[0], e[1], 0), t.soundHitPlane && T.playSound(t.soundHitPlane, e, !0)
            }, n.prototype.handleExternalForce = function(t, e, i) {
                (e = this.session.getPlayerById(e.id)) && e.character && e.character.forceList.push({
                    tick: t,
                    force: [i.x, i.y]
                })
            }, n.prototype.handleCaptureEvent = function(t, e) {
                switch (e = " flag was captured", t) {
                    case 0:
                        e = "The blue" + e;
                        break;
                    case 1:
                        e = "The red" + e
                }
                x.ui.captureWidget.set(e, 1 - t), this.ctfLastCaptureTick = this.tick, T.playSound("flag4", null, !0)
            }, n.prototype.handleKillAnnouncement = function(t, e, i) {
                e = this.session.getPlayerById(e), t = this.session.getPlayerById(t);
                var n = "";
                if (null != e) {
                    var r = e.nick;
                    t && 255 != i && e != t && (n = t.nick), x.ui.killsWidget.addKill(r, n, i)
                }
            }, n.prototype.handleShotEvent = function(t, e, i) {
                if ((t = this.session.getPlayerById(t.id)) && t.character) {
                    var n = l[e];
                    if (n)
                        if (1 == i) {
                            if (n.sfxShot && T.playSound(n.sfxShot, t.character.pos, !0), n.particleShot) {
                                var r = t.character.pos.slice();
                                t.character.usable && (r = this.getUsableByCharacter(t.character), r = this.findUsableWeaponEjector(r));
                                var s = Math.abs(t.character.angle) > Math.PI / 2;
                                x.particles.create(x.layerParticles, n.particleShot, r[0], r[1], (s ? Math.PI : 0) + (s ? -1.2 : -2.1) + t.character.angle)
                            }
                            n.flashRange && ((r = t.character.pos.slice())[0] += 120 * Math.cos(t.character.angle), r[1] += 120 * Math.sin(t.character.angle), S.addFlash(r[0], r[1], n.flashRange, .25, .2))
                        } else 0 == i && n.sfxEmpty && T.playSound(n.sfxEmpty, t.character.pos, !0);
                    if (1 == i && (t.character.recoil = 1, this.currentUsable && (i = d[this.currentUsable.type]).weapon == e && (this.currentUsable.heat += i.heatPerShot, 255 <= this.currentUsable.heat && (this.currentUsable.heat = i.heatPeak)), this.currentUsable)) {
                        switch (e = 0, this.currentUsable.type) {
                            case "mg1":
                                e = .3
                        }
                        b.rumble(e)
                    }
                }
            }, n.prototype.handleMatchSheet = function(t) {
                var e = t.get("state"),
                    i = this.session.gametype;
                x.ui.statsWidget.setGameType(i.descShort, i.descLong, i.teams), 0 == e && this.session.matchEnd(), t = t.get("stalling"), !x.ui.matchStalling && t && (x.ui.matchStallingStart = Date.now()), x.ui.matchStalling = t, t = !1, x.ui.matchStalling && 1e4 > Date.now() - x.ui.matchStallingStart && (t = !0), x.ui.toastWidget.show("stalling", t)
            }, n.prototype.applyAllSheetPlayer = function(t) {
                t = t.getSheets("player");
                for (var e = 0; e < t.length; e++) this.applySheetPlayer(t[e])
            }, n.prototype.applySheetPlayer = function(t) {
                var e = this.session.getPlayerById(t.id);
                if (e) {
                    e.nick = t.get("name"), e.team = t.get("team"), e.customization.ball = t.get("customBall"), e.customization.skinHat = t.get("customHat"), e.customization.skinGlasses = t.get("customGlasses");
                    var i = t.get("alive");
                    i && !e.character ? (i = t.get("level"), i = new f(e.customization, e.nick, this.session.gametype.teams ? e.team - 1 : -1, i), (i = new u(this, i)).player = e, e.character = i, this.addEvent(0, e.id, i, {
                        x: i.pos[0],
                        y: i.pos[1]
                    }), e.announcedInChat || (x.ui.chatWidget.addStatusMsg(t.get("name"), t.get("team"), 0), e.announcedInChat = !0)) : !i && e.character && (x.particles.create(x.layerParticles, "death", e.character.pos[0], e.character.pos[1], 0), T.playSound("death", e.character.pos, !0), this.killPlayersCharacter(e)), e.character && (i = e.character == this.localCharacter, e.character.pos[0] = t.get("posX"), e.character.pos[1] = t.get("posY"), e.character.vel[0] = t.get("velX"), e.character.vel[1] = t.get("velY"), e.character.currentInput = t.get("input"), e.character.lastInput = t.get("lastInput"), e.character.inAir = t.get("inAir"), e.character.jumpCountAir = t.get("jumpCountAir"), e.character.ballGfx.setEye(t.get("eye")), i && x.ui.chatWidget.setLocal(t.get("name"), t.get("team")))
                }
            }, n.prototype.killPlayersCharacter = function(t) {
                if (t.character) {
                    var e = t.character;
                    this.localCharacter == e && (this.localCharacter = this.ropeTarget = null), e == this.ropeTarget && (this.ropeTarget = null);
                    var i = this.characters.indexOf(e); - 1 == i && C.error("Cannot delete character: ", e), this.characters.splice(i, 1), e.ballGfx.remove(), t.character = null
                }
            }, n.prototype.update = function() {
                if (1 == this.state) {
                    this.estimateTick();
                    var t = Date.now() - this.estimatedStartTime;
                    if (this.updateNearUsable(), this.lastLocalSimulatedTick != this.tick) {
                        for (var e = this.tick - this.lastLocalSimulatedTick, i = 0; i < e; i++) this.updateBulletPhysic();
                        this.tickUpdateLocalRope(), this.tickAddInput(), this.tickPrediction(), this.tickUpdateUsables(), this.tickCreateLocalSnapshot(), this.lastLocalSimulatedTick = this.tick
                    }
                    for (this.updateAFKTimer(), this.updateMarketingCam(), this.updateRequestTeam(), T.updateChannels(); 2 < this.localSnapshots.length;) this.localSnapshots.shift();
                    this.applyGameToScene(), this.updateUIData(), this.updateTileGrid(), x.mapGfx && x.mapGfx.update(t)
                }
            }, n.prototype.updateNearUsable = function() {
                if (this.localCharacter) {
                    var t = x.mapGfx.map.getNearUsableObject(this.localCharacter.pos);
                    if (t && !this.localCharacter.usable) {
                        switch (t.type) {
                            case "mg1":
                                break;
                            default:
                                throw Error("Unknown usable")
                        }
                        x.ui.toastWidget.dataUsableType = "Machine Gun", x.ui.toastWidget.show("usable", !0)
                    } else x.ui.toastWidget.show("usable", !1)
                }
            }, n.prototype.tickUpdateUsables = function() {
                this.currentUsable && (this.currentUsable.angle = this.currentAngle);
                for (var t = 0; t < this.map.usables.length; t++) {
                    var e = this.map.usables[t];
                    if (e.usedBy) {
                        var i = e.usedBy;
                        i.pos = this.findCharPosInUsable(e), e.recoil = i.ballGfx.recoil
                    }
                    e.heat -= d[e.type].cooldownPerTick, e.heat = Math.max(0, e.heat)
                }
            }, n.prototype.applyGameToScene = function() {
                if (!(2 > this.localSnapshots.length)) {
                    for (var t = this.localSnapshots[0], e = this.localSnapshots[1], i = (Date.now() - this.estimatedStartTime) / 1e3 * r.ticksPerSecond % 1, n = this.gameState.findSheet("modeCTF"), s = 0; s < e.listPlayers.length; s++) {
                        var a = e.listPlayers[s];
                        t: {
                            for (var o = 0; o < t.listPlayers.length; o++)
                                if (t.listPlayers[o].character == a.character) {
                                    var h = t.listPlayers[o];
                                    break t
                                } h = null
                        }
                        var c = (o = a.character).renderPos;
                        c || (c = [a.pos[0], a.pos[1]]);
                        var p = a.pos[0],
                            d = a.pos[1];
                        if (h && (p = g.lerp(h.pos[0], a.pos[0], i), d = g.lerp(h.pos[1], a.pos[1], i) - c[1], p = c[0] + .2 * (p - c[0]), d = c[1] + .4 * d), o.updateJetpackFire(t.tick), o.updateWalkAnimation(), o.updateRecoil(), o.setRenderPos(p, d), o.ballGfx.setAmmo(o.ammo), o.ballGfx.updateWeaponTex(), o != this.localCharacter ? null == o.renderAngle ? o.setRenderAngle(o.angle) : (h = g.angleDiff(o.angle, o.renderAngle), o.setRenderAngle(g.normalizeAngle(o.renderAngle + h / 1.8))) : (T.setListenerPos(p, d), c = (h = this.updateZoom()) * b.deviceZoom, o.usable ? (a = this.getUsableByCharacter(o)) && (a = this.findUsableCameraCenter(a), b.setCamera(a[0] - b.width * c / 2, a[1] - b.height * c / 2, h, 5), this.zoomTarget = 1.5) : (b.setCamera(p - b.width * c / 2 + window.xOffset, d - b.height * c / 2 + window.yOffset, h, 1), this.zoomTarget = 1)), n)
                            for (a = 0; 2 > a; a++) n.get("team" + a) == o.player.pid && x.mapGfx.setFlagPos(a, ~~p - 48, ~~d - 80);
                        o.ropeTarget || o.fakeRopeTarget && 1 >= o.fakeRopeProgress ? (a = 1, o.ropeTarget ? o.ropeTarget instanceof u ? (c = o.ropeTarget.pos[0], h = o.ropeTarget.pos[1]) : (c = o.ropeTarget[0], h = o.ropeTarget[1]) : (c = o.fakeRopeTarget[0], h = o.fakeRopeTarget[1], o.fakeRopeProgress += .2, a = 1 <= o.fakeRopeProgress ? 0 : o.fakeRopeProgress), p = c - p, d = h - d, o.ballGfx.setRope(Math.atan2(d, p), Math.sqrt(p * p + d * d) * a)) : o.ballGfx.setRope(0, 0), o.lastInAir = o.inAir
                    }
                    for (s = 0; s < e.listPlayers.length; s++)(o = e.listPlayers[s].character).ballGfx.enableWeapon(!o.usable), o.lastWeapon != o.currentWeapon && (o.ballGfx.setWeapon(o.currentWeapon), 1e3 < Date.now() - this.joinedSessionTime && (t = l[o.currentWeapon].sfxChange) && T.playSound(t, o.pos, !0), o.lastWeapon = o.currentWeapon);
                    for (s = 0; s < this.bullets.length; s++) h = (e = this.bullets[s]).lastPos, a = e.pos, p = g.lerp(h[0], a[0], i), d = g.lerp(h[1], a[1], i), t = Math.atan2(a[1] - h[1], a[0] - h[0]), e.setRenderPos(p, d), e.setRenderAngle(t);
                    for (s = 0; s < this.map.usables.length; s++) switch (a = this.map.usables[s], a.type) {
                        case "mg1":
                            a.usedBy != this.localCharacter ? (e = a.renderAngle || 0, h = g.angleDiff(a.angle, e), e = g.normalizeAngle(e + h / 3)) : e = a.angle, o = e + (t = Math.abs(e) > Math.PI / 2 ? -1 : 1) * (a.recoil || 0) * -.15, a.gfxGun.size.y = t * Math.abs(a.gfxGun.size.y), a.renderAngle = e, a.gfxGun.angle = o
                    }
                    for (s = 0; s < this.planes.length; s++) this.planes[s].update(i);
                    x.ui.statsWidget.active && x.ui.statsWidget.updatePlayerList(this.gameState.getSheets("player")), this.updateFlags(n)
                }
            }, n.prototype.isSpawned = function() {
                return null != this.localCharacter
            }, n.prototype.getTeamScore = function() {
                var t = this.gameState.getSheets("team");
                return 2 == t.length ? [t[0].get("score"), t[1].get("score")] : [0, 0]
            }, n.prototype.lagError = function() {}, n.prototype.updateUIData = function() {
                if (this.localCharacter) {
                    var t = this.localCharacter.currentWeapon;
                    if (this.localCharacter.usable) {
                        var e = this.getUsableByCharacter(this.localCharacter);
                        d[e.type] && d[e.type].weapon && (t = d[e.type].weapon)
                    }
                    e = l[t];
                    var i = o[e.bullet];
                    i = i.texHud || i.tex, w.healthInfo.setHealth(this.localCharacter.health, r.maxHealth), w.ammoInfo.setAmmo(this.localCharacter.ammo, e.ammoCount, i, t), this.localCharacter.usable ? w.heatInfo.setHeat(this.currentUsable.heat) : w.heatInfo.setHeat(0)
                }
                x.ui.setAlive(null != this.localCharacter), x.ui.setPlayerCount(this.gameState.getSheets("player").length), null != this.localCharacter && s.hide(), t = ~~((this.session.matchLength - this.tick) / r.ticksPerSecond), e = this.gameState.findSheet("match"), w.matchInfo.setWarmup(e.get("warmup")), w.matchInfo.setTimeLeft(t), x.ui.statsWidget.setRemainingSeconds(t)
            }, n.prototype.updateTileGrid = function() {
                var t = !1;
                this.localCharacter && l[this.localCharacter.currentWeapon].bricktool && (t = !0), null != this.currentUsable && (t = !1), t && (t = this.getCurrentTile()) && this.isBrickPlaceable(this.localCharacter, t[0], t[1]) ? (w.tileGrid.setToTile(t[0], t[1], this.map.tileSize), w.tileGrid.show(!0)) : w.tileGrid.show(!1)
            }, n.prototype.updateRequestTeam = function() {
                !this.teamRequested && this.session.matchEndScreenClosed && (this.session.sendRequestTeam(255), this.teamRequested = !0)
            }, n.prototype.updateAFKTimer = function() {
                Date.now() - this.lastUserInputTime > 1e3 * r.afkTimeout && this.session.error(304, "Player inactive")
            }, n.prototype.updateFlags = function(t) {
                if (t) {
                    t = [t.get("team0"), t.get("team1")];
                    for (var e = 0; 2 > e; e++)
                        if (255 == t[e]) {
                            var i = x.mapGfx.map.flags[e];
                            x.mapGfx.setFlagPos(e, i.pos[0] * this.map.tileSize, i.pos[1] * this.map.tileSize)
                        } if (w.matchInfo.setFlags(255 != t[0], 255 != t[1]), this.ctfFlags)
                        for (e = 0; 2 > e; e++) 255 == this.ctfFlags[e] && 255 != t[e] ? T.playSound("flag2", null, !0) : 255 != this.ctfFlags[e] && 255 == t[e] && 10 < Math.abs(this.tick - this.ctfLastCaptureTick) && T.playSound("flag3", null, !0);
                    this.ctfFlags = t
                }
            }, n.prototype.updateZoom = function() {
                if (1 != window.zoom) return window.zoom;
                if (this.marketingCam) {
                    var t = 0;
                    return v.isDown(109) && (t += .01), v.isDown(107) && (t -= .01), b.zoom + t
                }
                t = b.zoom - this.zoomTarget;
                var e = Math.abs(t);
                return .002 > e ? this.zoomTarget : (e = e / 30 + 5e-4, 0 > t && (this.zoomSpeed = e), 0 < t && (this.zoomSpeed = -e), b.zoom + this.zoomSpeed)
            }, n.prototype.updateMarketingCam = function() {
                !this.marketingCam && v.isHit(96) && (this.marketingCam = !0)
            }, e.exports = n
        }, {}],
        22: [function(t, e, i) {
            var n = t(126),
                r = t(136);
            (t = function(t) {
                n.call(this);
                var e = this,
                    i = [];
                this.socket = new WebSocket(t), this.socket.binaryType = "arraybuffer", this.socket.onerror = function(t) {
                    console.log("Websocket Connection Error", t), e._dispatchError(303, "Connection error")
                }, this.socket.onclose = function() {
                    e._dispatchError(0)
                }, this.socket.onopen = function() {
                    for (; 0 < i.length;) e.socket.send(i.shift());
                    i = null
                }, this.socket.onmessage = function(t) {
                    new r.PacketIn(e, t.data)
                }, this._send = function(t) {
                    i ? i.push(t) : e.socket.send(t)
                }, this.close = function() {
                    this.socket.close(), this.errorCb = this.socket = null, this.messageCb = {}
                }
            }).prototype = Object.create(n.prototype), t.prototype.constructor = n, t.prototype.socket = null, e.exports = t
        }, {}],
        23: [function(t, e, i) {
            var n = t(150),
                r = t(57),
                s = t(139);
            e.exports = new function() {
                function t(t, i, n) {
                    if (c) {
                        var r = [],
                            s = document.createElement("div");
                        for (s.className = "graph", a.appendChild(s), s.style.width = "400px", s.style.height = "120px", t = {
                                name: t,
                                color: i,
                                max: n,
                                data: r,
                                container: s,
                                currentValue: 0
                            }, u.push(t), i = 0; 400 > i; i++) r.push(0), e(t, 0);
                        return t
                    }
                }

                function e(t, e) {
                    var i = 120 / t.max * e;
                    i = Math.min(i, 120);
                    var n = document.createElement("div");
                    n.className = "peak", n.style.height = i + "px", n.style.top = 120 - i + "px", 0 != e ? n.style.backgroundColor = t.color : n.style.height = "1px", t.container.appendChild(n)
                }

                function i() {
                    c && (h && (a.style.display = "block"), h || (a.style.display = "none"))
                }
                var a, o, l, h = !1,
                    c = "dev" == kugelnVersion,
                    u = [],
                    p = n.ticksPerSecond,
                    d = 0,
                    f = Date.now(),
                    m = null,
                    g = ["item", "bullet"];
                this.graphAdd = function(t, n) {
                    if (c) {
                        if (c && ((r.isHit(220) || r.isHit(160)) && (h = !h, i()), h))
                            for (var s = ~~((Date.now() - f) / 1e3 * p); d < s;)
                                if (c) {
                                    d++;
                                    for (var a = 0; a < u.length; a++) {
                                        var o = u[a],
                                            l = u[a].currentValue;
                                        c && (o.data.unshift(), o.data.push(l), o.container.removeChild(o.container.children[0]), e(o, l)), u[a].currentValue = 0
                                    }
                                } if (h) {
                            t: {
                                for (s = 0; s < u.length; s++)
                                    if (u[s].name == t) {
                                        t = u[s];
                                        break t
                                    } t = null
                            }
                            t && (t.currentValue += n)
                        }
                    }
                }, this.setGameState = function(t) {
                    if (c && (m = t, h && o)) {
                        for (; o.firstChild;) o.removeChild(o.firstChild);
                        for (t = 0; t < s.length; t++) {
                            var e = s[t];
                            if (-1 == g.indexOf(e.name)) {
                                var i = document.createElement("div");
                                i.className = "sheetType", o.appendChild(i);
                                var n = document.createElement("h3");
                                n.textContent = e.name, i.appendChild(n), n = m.getSheets(e.name);
                                for (var r = 0; r < n.length; r++) {
                                    var a = document.createElement("div");
                                    a.className = "sheet", i.appendChild(a);
                                    var l = document.createElement("h4");
                                    for (l.textContent = "ID: " + n[r].id, a.appendChild(l), l = document.createElement("table"), a.appendChild(l), a = 0; a < e.vars.length; a++) {
                                        var u = "" + n[r].get(e.vars[a].key);
                                        14 < u.length && (u = u.substring(0, 14) + "...");
                                        var p = document.createElement("tr");
                                        l.appendChild(p);
                                        var d = document.createElement("td");
                                        d.textContent = e.vars[a].key, p.appendChild(d), (d = document.createElement("td")).textContent = u, p.appendChild(d)
                                    }
                                }
                            }
                        }
                    }
                }, this.setRenderData = function(t, e) {
                    c && (t = document.getElementById("netgraph_" + t + "_value")) && (t.innerHTML = e)
                }, this.init = function() {
                    if (c) {
                        if ((a = document.createElement("div")).className = "netgraph", document.body.appendChild(a), t("Snapshots", "#f00", 6), t("Instants", "#f00", 6), t("Frames", "#00f", 5), c && ((o = document.createElement("div")).className = "gameState", a.appendChild(o)), c) {
                            (l = document.createElement("div")).className = "renderData", a.appendChild(l);
                            var e = document.createElement("div");
                            e.id = "netgraph_drawCalls_container", l.appendChild(e);
                            var n = document.createElement("div");
                            n.className = "k", n.innerHTML = "drawCalls", e.appendChild(n), (n = document.createElement("div")).className = "v", n.id = "netgraph_drawCalls_value", e.appendChild(n)
                        }
                        i()
                    }
                }
            }
        }, {}],
        24: [function(t, e, i) {
            e.exports = function() {
                var t = this,
                    e = "frontend-" + Date.now() + "-" + ~~(268435455 * Math.random()) + "-" + ~~(268435455 * Math.random()),
                    i = ~~(268435455 * Math.random()),
                    n = 0;
                window.onerror = function(i, r, s, a, o) {
                    if (n++, !(r && -1 == r.indexOf("/game.js") || 0 != n || 0 == s && 0 == a)) {
                        if (null != o) {
                            t: {
                                switch (o.message) {
                                    case "Error: NO_WEBGL":
                                    case "NO_WEBGL":
                                        location.href = "/error/no_webgl", o = !0;
                                        break t
                                }
                                o = !1
                            }
                            if (o) return;i = i + "\t" + r + ":" + s + ":" + a
                        }
                        else i = "string" != typeof i ? i.toString ? i.toString() : i + "" : i, i += "\t" + r + "\t" + s + "\t" + a;
                        i += "\t" + navigator.userAgent, t.sendError({
                            type: "error",
                            client: e,
                            id: t.nextId(),
                            info: i
                        })
                    }
                }, this.sendError = function(t) {
                    if ("dev" != kugelnVersion) {
                        console.log("Report error", t);
                        var e = new XMLHttpRequest;
                        e.onreadystatechange = function() {}, e.open("POST", "/frontenderr", !0), e.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), e.send(JSON.stringify(t))
                    }
                }, this.sendCustomError = function(i) {
                    t.sendError({
                        type: "error",
                        client: e,
                        id: t.nextId(),
                        info: i
                    })
                }, this.nextId = function() {
                    var t = Date.now() + "-" + i;
                    return 268435455 < ++i && (i = 0), t
                }
            }
        }, {}],
        25: [function(t, e, i) {
            var n = t(54);
            i = t(82);
            var r = t(83),
                s = t(84),
                a = t(153),
                o = {
                    game: new i,
                    main: new r,
                    matchError: new s
                };
            e.exports = new function() {
                this.screens = o, n.flowUpdateCb = function() {
                    t && t.update()
                };
                var t = null;
                this.init = function() {
                    for (var t in o) o[t].initBase(this);
                    this.goToUrl(location.pathname), window.addEventListener("popstate", function(t) {
                        "/" == location.pathname && (location.href = "/")
                    })
                }, this.goToUrl = function(t, e, i) {
                    var n = a.getUrlInfo(t);
                    n && this.switchTo(o[n.screen], {
                        http: n.url,
                        args: n.args,
                        customArgs: i
                    }), e && this.setUrl(t)
                }, this.setUrl = function(t, e) {
                    history.pushState && history.pushState({}, e, t)
                }, this.switchTo = function(e, i) {
                    "string" == typeof e && (e = this.screens[e]), t != this.screens.matchError && (t && t.leave(), (t = e).join(i))
                }
            }
        }, {}],
        26: [function(t, e, i) {
            function n(t, e) {
                o.socialMessage("requestRelation", {
                    playerName: t,
                    type: e
                })
            }

            function r(t) {
                var e = this,
                    i = this.dataset.player;
                switch (~~this.dataset.relation) {
                    case 0:
                        n(i, 1);
                        break;
                    case 1:
                        a.ui.modal.confirm("Do you really want to remove this friend?", function(t) {
                            t && (e.dataset.relation = 0, s(e), n(i, 0))
                        });
                        break;
                    case 2:
                        n(i, 1);
                        break;
                    case 3:
                        a.ui.modal.confirm("Do you really want to cancel the friendship request?", function(t) {
                            t && n(i, 0)
                        })
                }
            }

            function s(t) {
                var e;
                t: {
                    var i = e = "";
                    switch (~~t.dataset.relation) {
                        case null:
                        case 4:
                            e = "";
                            break t;
                        case 0:
                            e = "Add friend", i = "addWhite";
                            break;
                        case 1:
                            e = "Friends", i = "friendsWhite";
                            break;
                        case 2:
                            e = "Accept friend request", i = "checkWhite";
                            break;
                        case 3:
                            e = "Cancel request", i = "crossWhite"
                    }
                    e = '<div class="button"><span class="uiIcon ' + i + '"></span>' + e + "</div>"
                }
                t.innerHTML = e, t.onclick = r.bind(t)
            }
            var a = t(54),
                o = t(76);
            e.exports = {
                init: function() {
                    o.onSocialMessage("relationUpdate", function(t) {
                        var e = t.to;
                        t = t.relation;
                        for (var i = document.body.querySelectorAll(".friendButton"), n = 0; n < i.length; n++)
                            if (i[n].dataset.player == e) {
                                var r = i[n];
                                r.dataset.relation = t, s(r)
                            }
                    })
                },
                updateButtons: function(t) {
                    t = t.querySelectorAll(".friendButton");
                    for (var e = 0; e < t.length; e++) s(t[e])
                }
            }
        }, {}],
        27: [function(t, e, i) {
            var n = t(76);
            t(131), e.exports = new function() {
                function t() {
                    for (var t = 0; t < r.length; t++) r[t]()
                }
                var e = this,
                    i = [],
                    r = [];
                this.setRelation = function(e, n) {
                    for (var r = !1, s = 0; s < i.length; s++)
                        if (i[s].playerName == e) {
                            i[s].type = n, r = !0;
                            break
                        } r || i.push({
                        playerName: e,
                        type: n
                    }), t()
                }, this.setRelationList = function(e) {
                    i = e, t()
                }, this.getRelationList = function() {
                    return i
                }, this.onRelationListUpdate = function(t) {
                    r.push(t)
                }, this.init = function() {
                    n.onSocialMessage("relationUpdate", function(t) {
                        e.setRelation(t.to, t.relation)
                    }), n.onSocialMessage("relationList", function(t) {
                        e.setRelationList(t)
                    })
                }
            }
        }, {}],
        28: [function(t, e, i) {
            e.exports = {
                mountains: {
                    url: "/background/bg1.svg",
                    sky: [
                        [.8, .9, 1],
                        [.5, .7, 1]
                    ],
                    fog: [.1, .2, .2],
                    fogStart: .6,
                    brightness: 1,
                    blur: 7
                },
                forest: {
                    url: "/background/bg2.svg",
                    sky: [
                        [.8, .9, 1],
                        [.5, .7, 1]
                    ],
                    fog: [.2, .2, 0],
                    fogStart: .7,
                    brightness: 1,
                    blur: 7
                },
                desert: {
                    url: "/background/bg3.svg",
                    sky: [
                        [.8, .9, 1],
                        [.5, .7, 1]
                    ],
                    fog: [.63, .44, .05],
                    fogStart: .5,
                    brightness: .5,
                    blur: 0
                },
                mountainsNight: {
                    url: "/background/bg1.svg",
                    sky: [
                        [.15, .25, .25],
                        [0, 0, 0]
                    ],
                    fog: [.15, .25, .25],
                    fogStart: .6,
                    brightness: .7,
                    blur: 7
                },
                forestNight: {
                    url: "/background/bg2.svg",
                    sky: [
                        [.15, .25, .25],
                        [0, 0, 0]
                    ],
                    fog: [0, 0, 0],
                    fogStart: .6,
                    brightness: .7,
                    blur: 7
                },
                city: {
                    url: "/background/bg4.svg.png",
                    sky: [
                        [.8, .9, 1],
                        [.5, .7, 1]
                    ],
                    fog: [.15, .25, .25],
                    fogStart: .8,
                    brightness: .6,
                    blur: 2
                },
                cityNight: {
                    url: "/background/bg4.svg.png",
                    sky: [
                        [.15, .25, .25],
                        [0, 0, 0]
                    ],
                    fog: [.15, .25, .25],
                    fogStart: .8,
                    brightness: .6,
                    blur: 2
                },
                moon: {
                    url: "/background/bg5.svg.png",
                    sky: [
                        [.15, .25, .25],
                        [0, 0, 0]
                    ],
                    fog: [.15, .25, .25],
                    fogStart: .8,
                    brightness: .6,
                    blur: 5
                }
            }
        }, {}],
        29: [function(t, e, i) {
            function n(t, e, i, n) {
                this.customization = t, this.nickname = e, this.team = i, this.level = n || 0, this.arrows = [], this.init()
            }
            var r = t(87);
            t(142);
            var s = t(142).WeaponTypes,
                a = t(125),
                o = t(54),
                l = t(45),
                h = t(152),
                c = t(35),
                u = t(86);
            n.prototype.sprite = null, n.prototype.ropeSprite = null, n.prototype.weaponSprite = null, n.prototype.skinSprites = null, n.prototype.labelSprite = null, n.prototype.jetpackSprite = null, n.prototype.position = [0, 0], n.prototype.ballType = 0, n.prototype.angle = 0, n.prototype.recoil = 0, n.prototype.eye = 0, n.prototype.weapon = 0, n.prototype.ammo = 0, n.prototype.hideEye = !1, n.prototype.customization = null, n.prototype.level = 0, n.prototype.nextBlink = 0, n.prototype.isFlipped = !1, n.prototype.labelWidth = 0, n.prototype.jetpackSfxChannel = null, n.prototype.arrows = null, n.prototype.animWalkState = 0, n.prototype.animWalkStart = 0, n.prototype.animWalkResult = 0, n.prototype.init = function() {
                for (var t = 0; t < a.length; t++)
                    if (a[t].c == this.customization.ball) {
                        a[t].t && (this.ballType = a[t].t);
                        break
                    } t = c.getTex(this.customization.ball), this.ropeSprite = o.renderer.createSprite(o.layerRopes), this.ropeSprite.size.x = 4, this.ropeSprite.setTexture(o.texRope), this.weaponSprite = o.renderer.createSprite(o.layerWeapons), this.weaponSprite.setTexture(o.texWeapons[0]), this.weaponSprite.anchor.x = -.2, this.weaponSprite.anchor.y = .5, this.weaponSprite.size.x = 64, this.weaponSprite.size.y = 64, 0 < this.level && (this.levelSprite = o.renderer.createSprite(o.layerNicknames), this.levelTex = l.getTex(o.renderer, this.level), this.levelSprite.setTexture(this.levelTex), this.levelSprite.size.x = this.levelTex.getWidth(), this.levelSprite.size.y = this.levelTex.getHeight());
                var e = o.renderer.createTextTexture(),
                    i = "#fff",
                    n = "#000";
                switch (this.team) {
                    case 0:
                        i = "#f33", n = "#000";
                        break;
                    case 1:
                        i = "#25f", n = "#000"
                }
                for (e.setText(this.nickname, "26px BangersKugeln", i, n, 1), this.labelWidth = e.getTextWidth(), this.labelSprite = o.renderer.createSprite(o.layerNicknames), this.labelSprite.setTexture(e), this.labelSprite.size.x = e.getWidth(), this.labelSprite.size.y = e.getHeight(), this.labelSprite.anchor.x = e.getTextWidth() / this.labelSprite.size.x * .5, this.labelSprite.anchor.y = 0, this.sprite = o.renderer.createSprite(o.layerBalls), this.sprite.setTexture(o.texBallPath, 0), this.sprite.setTexture(t, 1), this.sprite.setTexture(o.texEyes, 2), this.sprite.anchor.x = .5, this.sprite.anchor.y = .5, this.sprite.size.x = 64, this.sprite.size.y = 64, this.sprite.material = o.renderer.createMaterial(r, {
                        type: this.ballType
                    }), this.sprite.material.setFlagTex(t), this.sprite.material.setFlagInverted(c.isInverted(this.customization.ball)), this.skinSprites = [], t = 0; t < h.length; t++) {
                    if (e = h[t].special, i = this.customization[h[t].name] - 1, 0 == e && -1 != i) {
                        n = o.renderer.createSprite(o.layerBallSkins);
                        var s = o.texSkins[t][i];
                        n.setTexture(s), n.anchor.x = .5, n.anchor.y = .5, this.skinSprites.push({
                            sprite: n,
                            def: h[t].list[i],
                            tex: s
                        })
                    } else this.skinSprites.push(null);
                    1 == e && (-1 != i ? (s = o.texSkins[t][i], this.sprite.material.setGlassesTex(s), this.sprite.setTexture(s, 3), h[t].list[i].noEye && (this.hideEye = !0)) : (this.sprite.setTexture(o.renderer.nullTexture, 3), this.sprite.material.setGlassesTex(null)))
                }
            }, n.prototype.remove = function() {
                this.sprite.remove(), this.ropeSprite.remove(), this.weaponSprite.remove(), this.labelSprite.remove(), this.levelSprite && this.levelSprite.remove(), this.jetpackSprite && this.jetpackSprite.remove();
                for (var t = 0; t < this.skinSprites.length; t++) this.skinSprites[t] && this.skinSprites[t].sprite.remove();
                for (t = 0; 64 > t; t++) this.setArrow(t, !1)
            }, n.prototype.setJetpack = function(t) {
                t && !this.jetpackSprite ? (this.jetpackSprite = o.renderer.createSprite(o.layerJetpacks), this.jetpackSprite.setTexture(o.texJetpackWear), this.jetpackSprite.anchor.x = .9, this.jetpackSprite.anchor.y = .5, this.jetpackSprite.size.x = 64, this.jetpackSprite.size.y = 64) : !t && this.jetpackSprite && (this.jetpackSprite.remove(), this.jetpackSprite = null)
            }, n.prototype.setJetpackSfx = function(t) {
                !this.jetpackSfxChannel && t && (this.jetpackSfxChannel = u.createChannel("jetpack1")) && (this.jetpackSfxChannel.fadeTime = 0), this.jetpackSfxChannel && !t && (u.removeChannel(this.jetpackSfxChannel), this.jetpackSfxChannel = null), this.jetpackSfxChannel && this.jetpackSfxChannel.setPos(this.position[0], this.position[1])
            }, n.prototype.setArrow = function(t, e) {
                if (e && !this.arrows[t]) {
                    e = 2 * t * Math.PI / 64;
                    var i = o.renderer.createSprite(o.layerWeapons);
                    i.setTexture(o.texBullets[4]), i.anchor.x = .2, i.anchor.y = .5, i.size.x = -42, i.size.y = 42, i.angle = e, this.arrows[t] = i
                } else !e && this.arrows[t] && (this.arrows[t].remove(), this.arrows[t] = null)
            }, n.prototype.setPosition = function(t) {
                this.sprite.pos.x = t[0], this.sprite.pos.y = t[1] - 3 * this.animWalkResult, this.sprite.scale.y = 1 + .05 * this.animWalkResult, this.ropeSprite.pos.x = t[0], this.ropeSprite.pos.y = t[1], this.weaponSprite.pos.x = t[0], this.weaponSprite.pos.y = t[1], this.labelSprite.pos.x = t[0], this.labelSprite.pos.y = t[1] - 100, this.levelSprite && (this.levelSprite.pos.x = t[0] - this.labelWidth / 2 - this.levelSprite.size.x - 5, this.levelSprite.pos.y = t[1] - 103), this.jetpackSprite && (this.jetpackSprite.pos.x = t[0], this.jetpackSprite.pos.y = t[1]), this.weaponSprite.anchor.x = .05 * this.recoil - .2;
                for (var e = 0; e < this.skinSprites.length; e++)
                    if (this.skinSprites[e] && this.skinSprites[e].def) {
                        var i = this.skinSprites[e].def,
                            n = this.skinSprites[e].sprite,
                            r = this.skinSprites[e].tex,
                            s = 1;
                        Math.abs(this.angle) > Math.PI / 2 && (s = -1), n.pos.x = t[0] + 64 * i.x * s, n.pos.y = t[1] + 64 * i.y - 3 * this.animWalkResult, n.size.x = i.scale * r.getWidth() / 2 * s, n.size.y = i.scale * r.getHeight() / 2
                    } for (e = 0; e < this.arrows.length; e++) i = 2 * e * Math.PI / 64, n = 48 + Math.cos(2346.21 * e) % 1 * 8, this.arrows[e] && (this.arrows[e].pos.x = t[0] + Math.cos(i) * n, this.arrows[e].pos.y = t[1] + Math.sin(i) * n);
                this.position = t.slice()
            }, n.prototype.setFlagFlip = function(t) {
                this.sprite.material.uniforms.flagInvert.value = t
            }, n.prototype.setAngle = function(t) {
                var e = Math.abs(t) > Math.PI / 2,
                    i = .15 * this.recoil;
                this.isFlipped = e, this.angle = t, this.weaponSprite.angle = t + (e ? i : -i), this.weaponSprite.size.y = e ? -64 : 64, this.jetpackSprite && (this.jetpackSprite.size.x = e ? -64 : 64), this.setViewingDirection(t)
            }, n.prototype.setWalkAnimation = function(t) {
                this.animWalkState != t && (this.animWalkState = t) && (this.animWalkStart = Date.now())
            }, n.prototype.updateWalkAnimation = function() {
                var t = (Date.now() - this.animWalkStart) / 600;
                this.animWalkState ? this.animWalkResult = Math.abs(Math.cos(6.283 * t + 1.57075)) : (this.animWalkResult -= .12, 0 > this.animWalkResult && (this.animWalkResult = 0))
            }, n.prototype.doJetpackFire = function() {
                o.particles.create(o.layerParticlesBg, "jetpack", this.position[0] + 34 * (this.isFlipped ? 1 : -1), this.position[1] + 25, Math.PI / 2)
            }, n.prototype.setWeapon = function(t) {
                this.weapon = t
            }, n.prototype.setAmmo = function(t) {
                this.ammo = t
            }, n.prototype.updateWeaponTex = function() {
                var t = s[this.weapon],
                    e = o.texWeapons[t.tex],
                    i = void 0 === t.emptyAboveRecoil ? 1 : t.emptyAboveRecoil;
                t.texEmpty && (0 == this.ammo || this.recoil > i) && (e = o.texWeapons[t.texEmpty]), this.weaponSprite.setTexture(e)
            }, n.prototype.enableWeapon = function(t) {
                this.weaponSprite.visible = t
            }, n.prototype.setEye = function(t) {
                var e = !1;
                (0 == this.nextBlink || this.nextBlink < Date.now()) && (this.nextBlink = Date.now() + 4500 + 3e3 * Math.random()), this.nextBlink < Date.now() + 60 && (e = !0), 14 == t && e && (t = 9), this.eye = t, e = t % 4, t = ~~(t / 4), this.hideEye && (t = e = -1), this.sprite.material.setEyeTexOffset(e, t)
            }, n.prototype.setViewingDirection = function(t) {
                var e = Math.PI / 2,
                    i = t;
                i > e && (i = -(Math.PI - i)), i < -e && (i = Math.PI + i), i *= .15, this.sprite.material.setEyeOffset(.06 * Math.cos(t), .04 * Math.sin(t)), this.sprite.material.setEyeRotation(i, i)
            }, n.prototype.setRope = function(t, e) {
                0 == e ? this.ropeSprite.visible = !1 : (this.ropeSprite.visible = !0, this.ropeSprite.size.y = e, this.ropeSprite.scale.y = e / 4, this.ropeSprite.angle = t - Math.PI / 2)
            }, e.exports = n
        }, {}],
        30: [function(t, e, i) {
            function n() {}
            n.prototype.init = function(t) {}, n.prototype.update = function() {}, n.prototype.remove = function() {}, e.exports = n
        }, {}],
        31: [function(t, e, i) {
            function n() {
                this.fogMaterial = this.layer = null, this.sprites = [], this.intensity = this.spriteCount = 0, this.rect = null
            }
            i = t(30);
            var r = t(37),
                s = t(54),
                a = t(131),
                o = t(93);
            n.prototype = Object.create(i.prototype), n.prototype.constructor = i, n.prototype.init = function(t, e, i) {
                this.rect = e, this.layer = t, this.intensity = i, this.fogMaterial = s.renderer.createMaterial(o), t = Math.ceil((e[3] - e[1]) / 300), i = Math.ceil((e[2] - e[0]) / 300), this.spriteCount = i * t;
                for (var n = new a.DRandom(3264454802), r = 0; r < t; r++)
                    for (var l = 0; l < i; l++) this.createFogSprite(n.nextInt(), 300 * l + e[0], 300 * r + e[1]);
                this.update(Date.now())
            }, n.prototype.createFogSprite = function(t, e, i) {
                var n = 512 + 300 * ((t = new a.DRandom(t)).next() - .5),
                    r = s.renderer.createSprite(this.layer);
                r.material = this.fogMaterial, r.size.x = n, r.size.y = n, r.anchor.x = .5, r.anchor.y = .5, r.color[0] = 1, r.color[1] = 1, r.color[2] = 1, r.color[3] = this.intensity, r.setTexture(s.texFog, 0), this.sprites.push({
                    x: e,
                    y: i,
                    translateX: 200 * (t.next() - .5),
                    translateY: 200 * (t.next() - .5),
                    circleSize: 5 + 30 * t.next(),
                    timeFactor: 1 + .5 * t.next(),
                    sprite: r
                })
            }, n.prototype.update = function(t) {
                if (this.layer) {
                    var e = r.getCamera();
                    for (this.layer.offset.x = .5 * e[0], this.layer.offset.y = .5 * e[1], e = 0; e < this.sprites.length; e++) {
                        var i = this.sprites[e],
                            n = Math.sin(t / 1700 * i.timeFactor);
                        i.sprite.pos.x = i.x + i.translateX + i.circleSize * Math.cos(t / 1700 * i.timeFactor), i.sprite.pos.y = i.y + i.translateY + i.circleSize * n
                    }
                }
            }, e.exports = n
        }, {}],
        32: [function(t, e, i) {
            function n() {
                this.pollenMaterial = this.layer = null, this.layerInfos = [], this.clusters = [], this.sprites = [], this.intensity = 0, this.rect = null, this.lastUpdate = Date.now()
            }
            i = t(30);
            var r = t(37),
                s = t(54),
                a = t(131),
                o = t(93);
            n.prototype = Object.create(i.prototype), n.prototype.constructor = i, n.prototype.init = function(t, e, i) {
                i = new a.DRandom(3264454802), this.layer = t, this.rect = e, this.pollenMaterial = s.renderer.createMaterial(o), t = e[2] - e[0];
                for (var n = e[3] - e[1], r = 0; 3 > r; r++) {
                    var l = .5 + r / 3 * .5;
                    this.layerInfos.push({
                        camFactor: l,
                        clusterCountX: Math.ceil(t / l / 500),
                        clusterCountY: Math.ceil(n / l / 500),
                        currentCamX: 0,
                        currentCamY: 0
                    })
                }
                for (r = 0; 3 > r; r++) {
                    l = -t / 2;
                    for (var h = -n / 2, c = 0; c < this.layerInfos[r].clusterCountY; c++)
                        for (var u = 0; u < this.layerInfos[r].clusterCountX; u++) {
                            var p = i.next(),
                                d = 500 * u + e[0] + l,
                                f = 500 * c + e[1] + h,
                                m = r;
                            p = new a.DRandom(p);
                            var g = 1 - m / 3,
                                v = 1 - g * g;
                            for (d = {
                                    x: d,
                                    y: f,
                                    level: m,
                                    distance: v,
                                    density: g = 6 * v + .5,
                                    visible: !0,
                                    sprites: []
                                }, f = 0; f < g; f++) m = this.createPollenSprite(p.next(), 500 * p.next(), 500 * p.next(), d), d.sprites.push(m);
                            this.clusters.push(d)
                        }
                }
            }, n.prototype.createPollenSprite = function(t, e, i, n) {
                t = new a.DRandom(t);
                var r = n.distance,
                    o = s.renderer.createSprite(this.layer);
                return o.material = this.pollenMaterial, o.size.x = 25 - 20 * r, o.size.y = 25 - 20 * r, o.anchor.x = .5, o.anchor.y = .5, o.color[0] = 1, o.color[1] = 1, o.color[2] = 1, o.color[3] = .2 - .1 * r, o.setTexture(s.texParticles[4], 0), e = {
                    x: e,
                    y: i,
                    distance: r,
                    cluster: n,
                    circleSize: 5 + 50 * t.next() * (1 - r),
                    timeFactor: 1 + .5 * t.next() * (1 - r) * (.5 < t.next() ? 1 : -1),
                    sprite: o
                }, this.sprites.push(e), e
            }, n.prototype.update = function(t) {
                if (0 != this.layerInfos.length) {
                    var e = s.camera,
                        i = r.width / 2 * r.zoom,
                        n = r.height / 2 * r.zoom,
                        a = -e.pos.x - 600,
                        o = -e.pos.y - 600,
                        l = a + e.viewportSize.x + 1200;
                    e = o + e.viewportSize.y + 1200;
                    for (var h = 0; 3 > h; h++) {
                        var c = this.layerInfos[h];
                        c.currentCamX = (a + i) * c.camFactor, c.currentCamY = (o + n) * c.camFactor
                    }
                    for (i = 0; i < this.clusters.length; i++) {
                        n = this.clusters[i], c = this.layerInfos[n.level], h = n.x + c.currentCamX;
                        var u = n.y + c.currentCamY,
                            p = u + 500;
                        if (c = !0, (h + 500 < a || p < o || h > l || u > e) && (c = !1), c != n.visible) {
                            for (h = 0; h < n.sprites.length; h++) n.sprites[h].sprite.visible = c;
                            n.visible = c
                        }
                        if (c)
                            for (h = 0; h < n.sprites.length; h++) {
                                c = n, u = n.sprites[h], p = this.layerInfos[c.level].currentCamY;
                                var d = u.circleSize * Math.sin(t / 3e3 * u.timeFactor);
                                u.sprite.pos.x = u.x + c.x + u.circleSize * Math.cos(t / 3e3 * u.timeFactor) + this.layerInfos[c.level].currentCamX, u.sprite.pos.y = u.y + c.y + d + p + 200 * u.distance
                            }
                    }
                }
            }, e.exports = n
        }, {}],
        33: [function(t, e, i) {
            function n() {
                this.snowMaterial = this.layer = null, this.layerInfos = [], this.clusters = [], this.sprites = [], this.intensity = 0, this.rect = null, this.lastUpdate = Date.now()
            }
            i = t(30);
            var r = t(37),
                s = t(54),
                a = t(131),
                o = t(93);
            n.prototype = Object.create(i.prototype), n.prototype.constructor = i, n.prototype.init = function(t, e, i) {
                i = new a.DRandom(3264454802), this.layer = t, this.rect = e, this.snowMaterial = s.renderer.createMaterial(o), t = e[2] - e[0];
                for (var n = e[3] - e[1], r = 0; 5 > r; r++) {
                    var l = .5 + r / 5 * .5;
                    this.layerInfos.push({
                        camFactor: l,
                        clusterCountX: Math.ceil(t / l / 500),
                        clusterCountY: Math.ceil(n / l / 500),
                        currentCamX: 0,
                        currentCamY: 0
                    })
                }
                for (r = 0; 5 > r; r++) {
                    l = -t / 2;
                    for (var h = -n / 2, c = 0; c < this.layerInfos[r].clusterCountY; c++)
                        for (var u = 0; u < this.layerInfos[r].clusterCountX; u++) {
                            var p = i.next(),
                                d = 500 * u + e[0] + l,
                                f = 500 * c + e[1] + h,
                                m = r;
                            p = new a.DRandom(p);
                            var g = 1 - m / 5,
                                v = 1 - g * g;
                            for (d = {
                                    x: d,
                                    y: f,
                                    level: m,
                                    distance: v,
                                    density: g = 7 * v + .5,
                                    visible: !0,
                                    sprites: []
                                }, f = 0; f < g; f++) m = this.createSnowSprite(p.next(), 500 * p.next(), 500 * p.next(), d), d.sprites.push(m);
                            this.clusters.push(d)
                        }
                }
            }, n.prototype.createSnowSprite = function(t, e, i, n) {
                t = new a.DRandom(t);
                var r = n.distance,
                    o = s.renderer.createSprite(this.layer);
                return o.material = this.snowMaterial, o.size.x = 64 - 48 * r, o.size.y = 64 - 48 * r, o.anchor.x = .5, o.anchor.y = .5, o.color[0] = 1, o.color[1] = 1, o.color[2] = 1, o.color[3] = .8 - .7 * r, o.setTexture(s.texParticles[4], 0), e = {
                    x: e,
                    y: i,
                    distance: r,
                    cluster: n,
                    circleSize: 5 + 50 * t.next() * (1 - r),
                    timeFactor: 1 + .5 * t.next() * (1 - r) * (.5 < t.next() ? 1 : -1),
                    sprite: o
                }, this.sprites.push(e), e
            }, n.prototype.update = function(t) {
                if (0 != this.layerInfos.length) {
                    var e = s.camera,
                        i = r.width / 2 * r.zoom,
                        n = r.height / 2 * r.zoom,
                        a = -e.pos.x - 600,
                        o = -e.pos.y - 600,
                        l = a + e.viewportSize.x + 1200;
                    e = o + e.viewportSize.y + 1200;
                    for (var h = 0; 5 > h; h++) {
                        var c = this.layerInfos[h];
                        c.currentCamX = (a + i) * c.camFactor, c.currentCamY = (o + n) * c.camFactor
                    }
                    for (i = 0; i < this.clusters.length; i++) {
                        n = this.clusters[i], c = this.layerInfos[n.level], n.y += .04 / (n.level / 2 + .5) * 10, n.y > this.rect[3] && (n.y -= this.rect[3] - this.rect[1]), h = n.x + c.currentCamX;
                        var u = n.y + c.currentCamY,
                            p = u + 500;
                        if (c = !0, (h + 500 < a || p < o || h > l || u > e) && (c = !1), c != n.visible) {
                            for (h = 0; h < n.sprites.length; h++) n.sprites[h].sprite.visible = c;
                            n.visible = c
                        }
                        if (c)
                            for (h = 0; h < n.sprites.length; h++) {
                                c = n, u = n.sprites[h], p = this.layerInfos[c.level].currentCamY;
                                var d = u.circleSize * Math.sin(t / 3e3 * u.timeFactor);
                                u.sprite.pos.x = u.x + c.x + u.circleSize * Math.cos(t / 3e3 * u.timeFactor) + this.layerInfos[c.level].currentCamX, u.sprite.pos.y = u.y + c.y + d + p + 200 * u.distance
                            }
                    }
                }
            }, e.exports = n
        }, {}],
        34: [function(t, e, i) {
            function n(t, e, i) {
                this.x = t, this.y = e, this.strength = i, this.startAt = Date.now(), this.progress = 0, this.maxAge = 10 * i, this.aabb = null
            }

            function r() {
                this.a = this.maxLength = this.y = this.x = 0, this.aabb = null, this.decay = !1, this.decaySpeed = 0
            }

            function s() {
                this.fadeOutRate = this.strength = this.length = this.y = this.x = 0, this.aabb = null
            }
            var a = t(54);
            t(37);
            var o = t(89);
            e.exports = new function() {
                function t(t) {
                    var e = t[0],
                        i = t[1],
                        n = t[3],
                        r = -a.camera.pos.y,
                        s = -a.camera.pos.x + a.camera.viewportSize.x,
                        o = -a.camera.pos.y + a.camera.viewportSize.y;
                    return !(-a.camera.pos.x > t[2] || s < e || r > n || o < i)
                }
                var e = null,
                    i = -1,
                    l = -1,
                    h = [],
                    c = [],
                    u = [],
                    p = null;
                this.init = function(t, i) {
                    e = a.renderer.createDataTexture(8, 8, 1), p = a.renderer.createMaterial(o), t.material = p, t.textures[1] = e, i.textures[2] = e
                }, this.addBlast = function(t, e, i) {
                    t = new n(t, e, i), h.push(t)
                }, this.addCirculation = function() {
                    var t = new r;
                    return c.push(t), t
                }, this.addLight = function() {
                    var t = new s;
                    return u.push(t), t
                }, this.addFlash = function(t, e, i, n, r) {
                    var s = this.addLight();
                    return s.x = t, s.y = e, s.length = i, s.strength = n, s.fadeOutRate = r, s
                }, this.removeCirculation = function(t) {
                    t = c.indexOf(t), c.splice(t, 1)
                }, this.removeLight = function(t) {
                    t = u.indexOf(t), u.splice(t, 1)
                }, this.decay = function(t, e) {
                    t.decay = !0, t.decaySpeed = e
                }, this.setCamera = function(t, e) {
                    p.setOffset(t, e)
                }, this.update = function() {
                    var n = a.camera.viewportSize.x,
                        r = a.camera.viewportSize.y;
                    for (n == i && r == l || (p.setScreenSize(n, r), i = n, l = r), n = [], r = 0; r < h.length; r++) {
                        var s = h[r].startAt;
                        h[r].progress = (Date.now() - s) / h[r].maxAge;
                        var o = (s = h[r]).progress * s.strength;
                        o = 6 * o + Math.max(o, 30), h[r].aabb = [s.x - o, s.y - o, s.x + o, s.y + o], 1 <= h[r].progress && n.push(h[r])
                    }
                    for (; 0 < n.length;) r = n.pop(), r = h.indexOf(r), h.splice(r, 1);
                    for (r = 0; r < u.length; r++) s = (n = u[r]).length, u[r].aabb = [n.x - s, n.y - s, n.x + s, n.y + s];
                    for (o = h.length - 1, n = 0; 8 > n; n++) {
                        s = r = 0;
                        for (var d = -1, f = 0; 0 <= o;) {
                            if (!h[o].aabb || t(h[o].aabb)) {
                                r = h[o].x, s = h[o].y, d = h[o].progress, f = h[o].strength, o--;
                                break
                            }
                            o--
                        }
                        e.setPixel(n, 0, r, s, d, f)
                    }
                    for (d = c.length - 1, n = 0; 8 > n; n++) {
                        for (s = r = 0, o = -1, f = 0; 0 <= d;) {
                            if (!c[d].aabb || t(c[d].aabb)) {
                                r = c[d].x, s = c[d].y, o = c[d].maxLength, f = c[d].a, d--;
                                break
                            }
                            d--
                        }
                        e.setPixel(n, 1, r, s, f, o)
                    }
                    for (d = u.length - 1, n = 0; 8 > n; n++) {
                        for (f = o = s = r = 0; 0 <= d;) {
                            if (u[d].aabb || t(u[d].aabb)) {
                                r = u[d].x, s = u[d].y, o = u[d].length, f = u[d].strength, d--;
                                break
                            }
                            d--
                        }
                        e.setPixel(n, 2, r, s, o, f)
                    }
                    for (e.update(), n = [], r = 0; r < c.length; r++) {
                        c[r].decay && (c[r].maxLength -= c[r].decaySpeed, 0 > c[r].maxLength && n.push(c[r])), s = c[r], o = (f = c[r]).x, d = f.y;
                        var m = f.a,
                            g = f.maxLength + 30;
                        f = o + Math.cos(m) * g, m = d + Math.sin(m) * g, f < o && (g = o, o = f, f = g), m < d && (g = d, d = m, m = g), s.aabb = [o, d, f, m]
                    }
                    for (; 0 < n.length;) this.removeCirculation(n.pop());
                    for (n = [], r = 0; r < u.length; r++)(s = u[r]).strength -= s.fadeOutRate, 0 >= s.strength && 0 < s.fadeOutRate && n.push(s);
                    for (; 0 < n.length;) this.removeLight(n.pop())
                }
            }
        }, {}],
        35: [function(t, e, i) {
            var n = t(54),
                r = t(156);
            i = t(12);
            var s = t(11),
                a = t(125),
                o = [{
                    url: "/country/flag32.png",
                    def: i,
                    tex: null
                }, {
                    url: "/country/flag128.png",
                    def: s,
                    tex: null
                }];
            e.exports = new function() {
                var e = this,
                    i = {},
                    s = 0,
                    l = [],
                    h = -1,
                    c = -1;
                this.init = function() {
                    for (var t = o.length, s = 0; s < a.length; s++)
                        if (8 < a[s].c.length || -1 != a[s].c.indexOf("_")) throw Error("Invalid name");
                    for (s = 0; s < o.length; s++) o[s].tex = n.renderer.loadBaseTextureFromUrl(o[s].url),
                        function(s) {
                            o[s].tex.onError(function() {
                                console.log("Loading error flag tex: " + s)
                            }), o[s].tex.onLoad(function() {
                                if (t--, -1 == h)
                                    for (var a in h = c = s, o[c].def) {
                                        var l = o[c].def._edge;
                                        l = new r.Core.Rect(o[c].def[a][0], o[c].def[a][1], 1 / l, 1 / l), i[a] = n.renderer.loadTextureFromBase(o[c].tex, l)
                                    }
                                s > h && (o[c].tex.replaceWithTexture(o[s].tex), h = s), 0 == s && e.firstLodLoaded(), 0 == t && e.allLodLoaded()
                            })
                        }(s)
                }, this.firstLodLoaded = function() {
                    s = 1;
                    for (var t = 0; t < l.length; t++) l[t](s)
                }, this.allLodLoaded = function() {
                    s = 2;
                    for (var t = 0; t < l.length; t++) l[t](s)
                }, this.onLoadStage = function(t) {
                    l.push(t)
                }, this.getLoadingStage = function() {
                    return s
                }, this.getTexNameForBall = function(t) {
                    for (var e = 0; e < a.length; e++)
                        if (a[e].c == t) return a[e].f ? a[e].f : t;
                    return "$pl"
                }, this.getTex = function(t) {
                    return i[this.getTexNameForBall(t)]
                }, this.isInverted = function(e) {
                    return !!(e = t(19).getBallRecord(e)) && e.invert
                }
            }
        }, {}],
        36: [function(t, e, i) {
            var n = t(156),
                r = t(54);
            e.exports = function(t, e, i) {
                function s(i) {
                    var s = e ? r.shaderHelper.load(n.Trachyt2d.PIXELSHADER, e, i) : null;
                    return i = t ? r.shaderHelper.load(n.Trachyt2d.VERTEXSHADER, t, i) : null, r.renderer.createShader(s, i)
                }
                this.variants = {}, this.variants.normal = s({
                    LOWGFX: 0
                }), i && (this.variants.lowGfx = s({
                    LOWGFX: 1
                }))
            }
        }, {}],
        37: [function(t, e, i) {
            var n = t(54),
                r = t(55),
                s = t(23),
                a = t(152),
                o = t(39),
                l = t(34),
                h = t(90),
                c = t(156),
                u = t(94),
                p = t(35),
                d = t(53),
                f = t(51);
            e.exports = new function() {
                var t = this;
                this.renderTargetElement = null, this.ratio = this.height = this.width = 0, this.deviceZoom = this.zoom = 1, this.camPosLast = [0, 0], this.rumbleFactor = 0, this.errorHandler = null, this.fps = -1, this.fpsCounter = 0, this.fpsLastUpdate = Date.now(), (new Date).getTime(), this.init = function(e) {
                    this.renderTargetElement = document.createElement("canvas"), document.getElementById("game").appendChild(this.renderTargetElement), n.ui = new u, n.renderer = c.Trachyt2d.createContext(this.renderTargetElement), n.renderer.setUrlVersionHash(kugelnVersion), n.shaderHelper = new d(n.renderer), n.camera = n.renderer.createCamera(), n.renderer.setCamera(n.camera, c.Trachyt2d.SCENE_WORLD), n.renderer.onContextLoss(function() {
                        t.errorHandler && t.errorHandler({
                            code: 307,
                            msg: "WebGL Context loss - Please check your graphic driver and try again"
                        })
                    }), p.init(), n.particles = new f, window.addEventListener("resize", this.onResize, !1), this.loadBasicTextures(function() {
                        o.init(), n.ui.setMatchUIState(0), e()
                    }), n.scenePreview = n.renderer.createScene(), n.sceneMenu = n.renderer.createScene(), n.layerBackground = n.renderer.createLayer(), n.layerBgFx = n.renderer.createLayer(null, c.Trachyt2d.VERTEX_FORMAT_POS_UV_COLOR), n.renderer.createCommandLayer("pushFBO"), n.layerObjects = n.renderer.createLayer(), n.layerJetpacks = n.renderer.createLayer(), n.layerRopes = n.renderer.createLayer(), n.layerBullets = n.renderer.createLayer(), n.layerWeapons = n.renderer.createLayer(), n.layerPlane = n.renderer.createLayer(), n.layerParticlesBg = n.renderer.createLayer(null, c.Trachyt2d.VERTEX_FORMAT_POS_UV_COLOR), n.layerMapTiles = n.renderer.createLayer(), n.layerFlag0 = n.renderer.createLayer(), n.layerFlag1 = n.renderer.createLayer(), n.layerBalls = n.renderer.createLayer(), n.layerBallSkins = n.renderer.createLayer(), n.layerItems = n.renderer.createLayer(), n.layerSharks = n.renderer.createLayer(), n.layerParticles = n.renderer.createLayer(null, c.Trachyt2d.VERTEX_FORMAT_POS_UV_COLOR), n.layerTileGrid = n.renderer.createLayer(), n.layerNicknames = n.renderer.createLayer(), n.renderer.createCommandLayer("popFBO"), n.layerPostProcWater = n.renderer.createPostProcLayer(null, null, {
                        usePushedFbo: !0
                    }), n.layerPostProcBlast = n.renderer.createPostProcLayer(), n.layerGameHud = n.renderer.createLayer(c.Trachyt2d.SCENE_HUD), n.layerPreview = n.renderer.createLayer(n.scenePreview), n.layerMenuParticles = n.renderer.createLayer(n.sceneMenu), n.shaderBall = [];
                    for (var i = 0; 3 > i; i++) {
                        var r = n.shaderHelper.load(c.Trachyt2d.PIXELSHADER, "ball", {
                            PATHTYPE: i
                        });
                        n.shaderBall[i] = n.renderer.createShader(r, null)
                    }
                    n.shaderBg = n.shaderHelper.loadFull("bgV", "bgF", !0), n.shaderMap = n.shaderHelper.loadFull(null, "map"), n.shaderFlag = n.shaderHelper.loadFull(null, "flag"), n.shaderBlast = n.shaderHelper.loadFull("postprocessing", "blast"), n.shaderCompose = n.shaderHelper.loadFull("postprocessing", "compose", !0), n.shaderParticle = n.shaderHelper.loadFull("particleV", "particleF"), l.init(n.layerPostProcBlast, n.layerPostProcWater), n.materialCompose = n.renderer.createMaterial(h), n.layerPostProcWater.material = n.materialCompose, this.onResize(), n.renderer.setOnBeforeRender(this.onBeforeRender), n.renderer.setOnAfterRender(this.onAfterRender), n.renderer.start()
                }, this.onError = function(t) {
                    this.errorHandler = t
                }, this.getViewWidth = function() {
                    return n.camera.viewportSize.x
                }, this.getViewHeight = function() {
                    return n.camera.viewportSize.y
                }, this.getCamera = function() {
                    return [-n.camera.pos.x, -n.camera.pos.y, this.zoom]
                }, this.setCamera = function(t, e, i, r) {
                    function s(t, e) {
                        return Math.cos(a * t) * e
                    }
                    if (r = r || 1, this.zoom = i, n.camera.viewportSize.x = this.width * this.zoom * this.deviceZoom, n.camera.viewportSize.y = this.height * this.zoom * this.deviceZoom, t = this.camPosLast[0] - (this.camPosLast[0] - t) / r, e = this.camPosLast[1] - (this.camPosLast[1] - e) / r, this.camPosLast[0] = t, this.camPosLast[1] = e, .01 < this.rumbleFactor) {
                        var a = Date.now() / 1e3;
                        r = s(17.3, 7.4) + s(29.1, 5.7) + s(35.3, 3.5) + s(50.2, 2), i = s(16.5, 7.9) + s(28.4, 5.2) + s(32.3, 4.2) + s(45.6, 1.7), t += r * this.rumbleFactor, e += i * this.rumbleFactor, this.rumbleFactor *= .92
                    }
                    t = ~~t, e = ~~e, n.camera.pos.x = -t, n.camera.pos.y = -e, n.mapGfx.setCamera(t, e), l.setCamera(t, e), n.materialCompose.setOffset(t, e), n.materialCompose.setScreenSize(n.camera.viewportSize.x, n.camera.viewportSize.y)
                }, this.rumble = function(t) {
                    t > this.rumbleFactor && (this.rumbleFactor = t)
                }, this.loadBasicTextures = function(t) {
                    var e = new r;
                    e.add(n.texBallPath = n.renderer.loadTextureFromUrl("/ball/path.svg")), e.add(n.texEyes = n.renderer.loadTextureFromUrl("/ball/eyes.svg")), e.add(n.texRope = n.renderer.loadTextureFromUrl("/ball/rope.png")), e.add(n.texBaseSkins = n.renderer.loadBaseTextureFromUrl("/ball/skins.svg")), e.add(n.texBaseBullets = n.renderer.loadBaseTextureFromUrl("/weapons/bullet.svg")), e.add(n.texBaseWeapons = n.renderer.loadBaseTextureFromUrl("/weapons/weapon.svg")), e.add(n.texBaseCommon = n.renderer.loadBaseTextureFromUrl("/common/common.svg")), e.add(n.texBaseParticles = n.renderer.loadBaseTextureFromUrl("/common/particle.png")), n.texFlags = {}, this.objTex = {}, e.done(function() {
                        n.texWeapons = [];
                        for (var e = 0; 16 > e; e++) {
                            var i = new c.Core.Rect(e % 4 * .25, .25 * ~~(e / 4), .25, .25);
                            i = n.renderer.loadTextureFromBase(n.texBaseWeapons, i), n.texWeapons.push(i)
                        }
                        n.texSkins = [];
                        for (var r = 0; r < a.length; r++) {
                            var s = a[r];
                            for (n.texSkins[r] = [], e = 0; e < s.list.length; e++) i = s.list[e], i = new c.Core.Rect(i.tex[0], i.tex[1], i.tex[2], i.tex[3]), i = n.renderer.loadTextureFromBase(n.texBaseSkins, i), n.texSkins[r].push(i)
                        }
                        for (n.texBullets = [], e = 0; 12 > e; e++) i = new c.Core.Rect(e % 4 * .25, .25 * ~~(e / 4), .25, .25), i = n.renderer.loadTextureFromBase(n.texBaseBullets, i), n.texBullets.push(i);
                        for (n.texBullets[12] = n.renderer.loadTextureFromBase(n.texBaseBullets, new c.Core.Rect(0, .75, .5, .25)), n.texParticles = [], e = 0; 8 > e; e++) i = new c.Core.Rect(e % 4 * .25, .25 * ~~(e / 4), .25, .25), i = n.renderer.loadTextureFromBase(n.texBaseParticles, i), n.texParticles.push(i);
                        i = new c.Core.Rect(0, .5, .5, .5), n.texFog = n.renderer.loadTextureFromBase(n.texBaseParticles, i), n.texHeart = n.renderer.loadTextureFromBase(n.texBaseCommon, new c.Core.Rect(0, 0, .0625, .0625)), n.texGibbet = n.renderer.loadTextureFromBase(n.texBaseCommon, new c.Core.Rect(.0625, 0, .0625, .0625)), n.texWarn = n.renderer.loadTextureFromBase(n.texBaseCommon, new c.Core.Rect(.125, 0, .0625, .0625)), n.texPole = n.renderer.loadTextureFromBase(n.texBaseCommon, new c.Core.Rect(0, .25, .25, .25)), n.texCup = n.renderer.loadTextureFromBase(n.texBaseCommon, new c.Core.Rect(.1875, 0, .0625, .0625)), n.texTileGrid = n.renderer.loadTextureFromBase(n.texBaseCommon, new c.Core.Rect(.5, 0, .5, .5)), n.texPlane = n.renderer.loadTextureFromBase(n.texBaseCommon, new c.Core.Rect(0, .5, 1, .5)), n.texPropeller = n.renderer.loadTextureFromBase(n.texBaseCommon, new c.Core.Rect(.25, .25, .25, .25)), n.texPlaneKill = n.renderer.loadTextureFromBase(n.texBaseCommon, new c.Core.Rect(0, .125, .125, .125)), n.texShark = n.renderer.loadTextureFromBase(n.texBaseCommon, new c.Core.Rect(.125, .125, .125, .125)), n.texJetpackItem = n.renderer.loadTextureFromBase(n.texBaseCommon, new c.Core.Rect(.25, .125, .125, .125)), n.texJetpackWear = n.renderer.loadTextureFromBase(n.texBaseCommon, new c.Core.Rect(.375, .125, .125, .125)), n.texRope.setWrapMode(c.Trachyt2d.TEX_REPEAT, c.Trachyt2d.TEX_REPEAT), 0 < p.getLoadingStage() ? t() : p.onLoadStage(function(e) {
                            1 == e && t()
                        })
                    }, function(t, e) {
                        var i = "unknown";
                        throw t && (t.src ? i = t.src : t.base && t.base._imgObject && t.base._imgObject.src && (i = t.base._imgObject.src.substr(250))), "unknown" == i && e && e.src && (i = e.src), Error("Resource loading error on map load: " + i)
                    })
                }, this.onResize = function() {
                    var e = window.innerWidth,
                        i = window.innerHeight;
                    void 0 !== window.devicePixelRatio && (t.deviceZoom = window.devicePixelRatio), n.mapGfx && n.mapGfx.resize(e, i), t.renderTargetElement.width = e, t.renderTargetElement.height = i, t.width = e, t.height = i, t.ratio = e / i, n.renderer.resize(e, i), n.ui.updateViewport(e, i), o.resize(e, i)
                }, this.onBeforeRender = function() {
                    25 == ++t.fpsCounter && (t.fps = 1e3 / (Date.now() - t.fpsLastUpdate) * t.fpsCounter, t.fpsLastUpdate = Date.now(), t.fpsCounter = 0), n.ui.update(), n.flowUpdateCb && n.flowUpdateCb(), n.gameUpdateCb && n.gameUpdateCb(), n.particles.update(), l.update(), n.materialCompose.updateTime()
                }, this.onAfterRender = function(t) {
                    s.graphAdd("Frames", 1), s.setRenderData("drawCalls", t), n.frameCounter++
                }
            }
        }, {}],
        38: [function(t, e, i) {
            var n = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259],
                r = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];
            e.exports.createCanvas = function(t, e) {
                var i = document.createElement("canvas");
                return i.width = t, i.height = e, i
            }, e.exports.blurCanvas = function(t, e) {
                function i() {
                    this.v = 0, this.next = null
                }

                function s(t) {
                    var n, r = new i,
                        s = null,
                        m = r,
                        v = 0,
                        y = 0;
                    for (n = 1; n < a; n++) m = m.next = new i, n == o && (s = m);
                    m.next = r;
                    for (var x = 0; x < c; x++) {
                        var b = 0,
                            w = g[v + t],
                            S = o * w,
                            T = l * w;
                        for (m = r, n = 0; n < o; n++) m.v = w, m = m.next;
                        for (n = 1; n < o; n++) {
                            var k = o - n;
                            m.v = g[v + ((u < n ? u : n) << 2) + t], T += m.v * k, b += m.v, m = m.next
                        }
                        m = r, n = s;
                        for (var C = 0; C < h; C++) g[v + t] = T * d >> f, T -= S, S -= m.v, w = y + ((w = C + e + 1) < u ? w : u) << 2, m.v = g[w + t], T += b += m.v, m = m.next, S += n.v, b -= n.v, n = n.next, v += 4;
                        y += h
                    }
                    for (C = 0; C < h; C++) {
                        for (b = 0, w = g[(v = C << 2) + t], S = o * w, T = l * w, m = r, n = 0; n < o; n++) m.v = w, m = m.next;
                        for (n = 1; n <= e; n++) k = o - n, m.v = w, T += m.v * k, b += w, m = m.next;
                        for (v = C, m = r, n = s, x = 0; x < c; x++) g[(w = v << 2) + t] = T * d >> f, T -= S, S -= m.v, w = C + ((w = x + o) < p ? w : p) * h << 2, m.v = g[w + t], T += b += m.v, m = m.next, S += n.v, b -= n.v, n = n.next, v += h
                    }
                }
                if (!(1 > e)) {
                    var a = e + e + 1,
                        o = e + 1,
                        l = o * (o + 1) / 2,
                        h = t.width,
                        c = t.height,
                        u = h - 1,
                        p = c - 1,
                        d = n[e],
                        f = r[e],
                        m = t.getContext("2d"),
                        g = (t = m.getImageData(0, 0, t.width, t.height)).data;
                    if (g.length != h * c * 4) throw Error("Invalid image size");
                    s(0), s(1), s(2), s(3), m.putImageData(t, 0, 0)
                }
            }, e.exports.debugOutputCanvas = function(t) {
                var e = document.getElementById("debugOutputCanvas");
                e || ((e = document.createElement("div")).id = "debugOutputCanvas", e.style.position = "absolute", e.style.top = "20px", e.style.left = "20px", document.body.appendChild(e));
                var i = this.createCanvas(t.width, t.height);
                i.style.border = "10px solid #000", i.style.backgroundColor = "#f0f", i.getContext("2d").drawImage(t, 0, 0), e.appendChild(i)
            }
        }, {}],
        39: [function(t, e, i) {
            function n() {
                var t, e, i, n = !1,
                    o = !1,
                    l = !1,
                    h = 0,
                    c = [0, 0],
                    u = [!1, !1],
                    p = !1,
                    d = [];
                this.init = function() {
                    e = a.createCanvas(512, 512), i = r.renderer.loadTextureFromImage(e), (t = r.renderer.createSprite(r.layerGameHud)).setTexture(i), t.size.x = 512, t.size.y = 512, t.anchor.x = .5, t.anchor.y = 0, t.pos.x = r.renderer.getWidth() / 2, this.updatePosition(), n = !0;
                    for (var o = 0; 2 > o; o++) {
                        var l = document.createElement("canvas");
                        l.width = l.height = 128;
                        var h = new s;
                        h.init(l, 64), h.setTeam(o), h.setPos(64, 64, 1 == o), h.render();
                        var c = r.renderer.loadTextureFromImage(l),
                            u = r.renderer.createSprite(r.layerGameHud);
                        u.setTexture(c), u.size.x = 128, u.size.y = 128, u.angle = .6 * (0 == o ? 1 : -1), u.anchor.x = 0 == o ? 0 : 1, u.anchor.y = 1, u.visible = !1, d.push({
                            canvas: l,
                            menuFlag: h,
                            tex: c,
                            sprite: u
                        })
                    }
                    this.updateFlagPos(r.renderer.getWidth(), r.renderer.getHeight()), this.render()
                }, this.setWarmup = function(t) {
                    p = t, this.updatePosition()
                }, this.setFlags = function(t, e) {
                    u = [t, e], this.updateFlagVisibility()
                }, this.setHasTeams = function(t) {
                    o != t && (n = !0), o = t
                }, this.setIsCTF = function(t) {
                    l = t
                }, this.setTimeLeft = function(t) {
                    h != t && (n = !0), h = t
                }, this.setTeamScore = function(t) {
                    t && 2 == t.length && (c[0] == t[0] && c[1] == t[1] || (n = !0), c = t.slice())
                }, this.setVisible = function(e) {
                    t.visible = e, this.updateFlagVisibility()
                }, this.updatePosition = function() {
                    t.pos.y = p ? r.renderer.getHeight() / 6 : 0
                }, this.renderNormal = function() {
                    var t = e.getContext("2d");
                    t.clearRect(0, 0, 512, 512), t.textBaseline = "top", t.fillStyle = "rgba(0, 0, 0, 0.6)", t.fillRect(176, 0, 160, 70), t.fillRect(196, 70, 120, 20), t.beginPath(), t.arc(196, 70, 20, .5 * Math.PI, 1 * Math.PI, !1), t.lineTo(196, 70), t.fill(), t.beginPath(), t.arc(316, 70, 20, 0 * Math.PI, .5 * Math.PI, !1), t.lineTo(316, 70), t.fill(), o && (t.fillStyle = "rgba(0, 0, 0, 0.5)", t.fillRect(36, 0, 140, 70), t.fillRect(336, 0, 140, 70), t.fillStyle = "rgba(180, 0, 0, 0.6)", t.fillRect(16, 0, 20, 50), t.beginPath(), t.arc(36, 50, 20, .5 * Math.PI, 1 * Math.PI, !1), t.lineTo(36, 50), t.fill(), t.fillStyle = "rgba(0, 0, 200, 0.6)", t.fillRect(476, 0, 20, 50), t.beginPath(), t.arc(476, 50, 20, 0 * Math.PI, .5 * Math.PI, !1), t.lineTo(476, 50), t.fill());
                    var n = Math.floor(h / 60);
                    n = n + ":" + ("00" + Math.floor(h % 60)).substr(-2), t.textAlign = "center", t.fillStyle = 10 >= h && 0 == h % 2 ? "#f55" : "#fff", t.font = "52px BangersKugeln", t.fillText(n, 256, 5), o && (t.textAlign = "center", t.fillStyle = "#fff", t.font = "28px BangersKugeln", t.fillText(c[0], 106, 10), t.fillText(c[1], 406, 10)), t.fillStyle = "#bbb", t.font = "20px BangersKugeln", t.fillText("Time left", 256, 62), o && (n = l ? "Captures" : "Score", t.fillText(n, 106, 44), t.fillText(n, 406, 44)), i.update()
                }, this.renderWarmup = function() {
                    var t = e.getContext("2d");
                    t.clearRect(0, 0, 512, 512), t.textBaseline = "top", t.fillStyle = "rgba(0, 0, 0, 0.6)", t.fillRect(131, 20, 250, 120), t.fillRect(151, 140, 210, 20), t.fillRect(151, 0, 210, 20), t.beginPath(), t.arc(151, 20, 20, 1 * Math.PI, 1.5 * Math.PI, !1), t.lineTo(151, 20), t.fill(), t.beginPath(), t.arc(361, 20, 20, 1.5 * Math.PI, 2 * Math.PI, !1), t.lineTo(361, 20), t.fill(), t.beginPath(), t.arc(151, 140, 20, .5 * Math.PI, 1 * Math.PI, !1), t.lineTo(151, 140), t.fill(), t.beginPath(), t.arc(361, 140, 20, 0 * Math.PI, .5 * Math.PI, !1), t.lineTo(361, 140), t.fill();
                    var n = 1 != ("" + h).length ? 10 : -5;
                    t.fillStyle = "#fff", t.font = "80px BangersKugeln", t.textAlign = "right", t.fillText("" + h, 271 + n, 60), t.font = "30px BangersKugeln", t.textAlign = "left", t.fillText("sec", 281 + n, 105), t.fillStyle = "#bbb", t.textAlign = "center", t.font = "25px BangersKugeln", t.fillText("Next match in", 256, 20), i.update()
                }, this.render = function() {
                    n && (n = !1, p ? this.renderWarmup() : this.renderNormal())
                }, this.screenResize = function(e, i) {
                    t.pos.x = r.renderer.getWidth() / 2, this.updateFlagPos(e, i)
                }, this.updateFlagPos = function(t, e) {
                    d[0].sprite.pos.x = t / 2 + 256 - 70, d[1].sprite.pos.x = t / 2 - 256 + 44, d[0].sprite.pos.y = 37, d[1].sprite.pos.y = 56
                }, this.updateFlagVisibility = function() {
                    d[0].sprite.visible = u[0] && t.visible, d[1].sprite.visible = u[1] && t.visible
                }, this.init()
            }
            var r = t(54),
                s = t(49);
            t(150), t(142), t(142);
            var a = t(38),
                o = t(42),
                l = t(40),
                h = t(43),
                c = t(44);
            e.exports = new function() {
                this.tileGrid = this.matchInfo = this.heatInfo = this.ammoInfo = this.healthInfo = null;
                var t = [];
                this.resize = function(e, i) {
                    for (var n = 0; n < t.length; n++) t[n].screenResize(e, i)
                }, this.init = function() {
                    this.healthInfo = new o, this.ammoInfo = new l, this.heatInfo = new h, this.matchInfo = new n, this.tileGrid = new c, t.push(this.healthInfo), t.push(this.ammoInfo), t.push(this.heatInfo), t.push(this.matchInfo), t.push(this.tileGrid)
                }
            }
        }, {}],
        40: [function(t, e, i) {
            function n() {
                this.dataWeaponId = -1, this.dataWeaponTex = this.dataAmmoMax = this.dataAmmoCurrent = 0, this.init(1)
            }
            var r = t(54);
            t = t(41), n.prototype = Object.create(t.prototype), n.prototype.constructor = t, n.prototype.initColors = function(t) {
                var e = t.createLinearGradient(0, 0, 0, 200);
                e.addColorStop(0, "rgba(0, 0, 0, 0.5)"), e.addColorStop(1, "rgba(0, 0, 0, 0.8)");
                var i = t.createLinearGradient(0, 0, 0, 200);
                i.addColorStop(0, "rgba(0, 90, 0, 1.0)"), i.addColorStop(1, "rgba(0, 180, 0, 1.0)"), (t = t.createLinearGradient(0, 0, 0, 200)).addColorStop(0, "rgba(0, 30, 0, 0.6)"), t.addColorStop(1, "rgba(0, 70, 0, 0.6)"), this.colors = {
                    strokeBg: "rgba(0, 0, 0, 0.0)",
                    fillBg: e,
                    highlightBg: "rgba(0, 0, 0, 0.5)",
                    circleEmpty: t,
                    circleFull: i,
                    separators: "rgba(0, 0, 0, 1.0)",
                    text: "rgba(0, 140, 0, 1.0)",
                    textOutline: "rgba(0, 0, 0, 1.0)"
                }
            }, n.prototype.setAmmo = function(t, e, i, n) {
                this.dataAmmoCurrent != t && (this.dirty = !0), this.dataAmmoMax != e && (this.dirty = !0), this.dataWeaponTex != i && (this.dirty = !0), this.dataWeaponId = n, this.dataAmmoCurrent = t, this.dataAmmoMax = e, this.dataWeaponTex = i, this.dataMax = e, this.dataCur = t, this.separatorCount = 1
            }, n.prototype.getAnchor = function() {
                return [1, 1]
            }, n.prototype.getPos = function(t, e) {
                return [t, e]
            }, n.prototype.getTex = function() {
                return r.texBullets[this.dataWeaponTex]
            }, n.prototype.getTexPos = function() {
                return [this.size / 2 - 40, this.size / 2 - 45]
            }, e.exports = n
        }, {}],
        41: [function(t, e, i) {
            function n() {}
            var r = t(54),
                s = t(38);
            n.prototype.init = function(t) {
                this.type = t, this.visible = !1, this.infoTex = this.infoCanvas = this.infoSprite = null, this.size = 256, this.scale = 1, this.highlight = !1, this.text = null, this.dataCur = this.dataMax = 0, this.separatorCount = 1, this.dirty = !0, this.infoCanvas = s.createCanvas(this.size, this.size), this.infoTex = r.renderer.loadTextureFromImage(this.infoCanvas), t = this.getAnchor(), this.infoSprite = r.renderer.createSprite(r.layerGameHud), this.infoSprite.setTexture(this.infoTex), this.infoSprite.size.x = this.size, this.infoSprite.size.y = this.size, this.infoSprite.anchor.x = t[0], this.infoSprite.anchor.y = t[1], this.screenResize(r.renderer.getWidth(), r.renderer.getHeight()), this.initColors(this.infoCanvas.getContext("2d")), this.render()
            }, n.prototype.initColors = function(t) {}, n.prototype.setVisible = function(t) {
                this.visible = t, this.infoSprite.visible = t
            }, n.prototype.screenResize = function(t, e) {
                t = this.getPos(t, e), this.infoSprite.pos.x = t[0], this.infoSprite.pos.y = t[1]
            }, n.prototype.render = function() {
                if (1 < this.scale && (this.scale = Math.max(1, this.scale - .03)), this.infoSprite.size.x = this.size * this.scale, this.infoSprite.size.y = this.size * this.scale, this.dirty) {
                    this.dirty = !1;
                    var t = this.infoCanvas.getContext("2d");
                    t.clearRect(0, 0, this.size, this.size), t.textBaseline = "top";
                    var e = this.size / 2,
                        i = this.size / 2;
                    t.beginPath(), t.strokeStyle = this.colors.strokeBg, t.fillStyle = this.highlight ? this.colors.highlightBg : this.colors.fillBg, t.arc(e, i, 100, 0, 2 * Math.PI, !1), t.fill();
                    var n = 2 * Math.PI + 1.57 - .9,
                        r = n - 2.47;
                    t.lineWidth = 24, t.beginPath(), t.strokeStyle = this.colors.circleEmpty, t.arc(e, i, 78, 2.47, n, !1), t.stroke(), n = 65535 == this.dataMax;
                    var s = this.dataCur / this.dataMax;
                    for (n && (s = 1), t.beginPath(), t.strokeStyle = this.colors.circleFull, t.arc(e, i, 78, 2.47, 2.47 + r * s, !1), t.stroke(), t.lineWidth = 2, t.strokeStyle = this.colors.separators, r = (2 * Math.PI - 1.8) / this.separatorCount, s = 1; s < this.separatorCount; s++) {
                        var a = 2.47 + r * s,
                            o = Math.cos(a);
                        a = Math.sin(a), t.beginPath(), t.moveTo(e + 66 * o, i + 66 * a), t.lineTo(e + 90 * o, i + 90 * a), t.stroke()
                    }
                    e = this.getTex(), i = this.getTexPos(), e.draw(t, i[0], i[1], 80, 80), t.fillStyle = this.colors.textOutline, this.renderText(t, n, 1, 1), this.renderText(t, n, 1, -1), this.renderText(t, n, -1, -1), this.renderText(t, n, -1, 1), t.fillStyle = this.colors.text, this.renderText(t, n, 0, 0), this.infoTex.update()
                }
            }, n.prototype.renderText = function(t, e, i, n) {
                e || null !== this.text ? null !== this.text && (t.textAlign = "center", t.font = "30px BangersKugeln", t.fillText(this.text, this.size / 2 + i, this.size - 80 + n)) : (e = this.size / 2 + 7, t.textAlign = "right", t.font = "38px BangersKugeln", t.fillText("" + this.dataCur, e - 3 + i, this.size - 85 + n), t.textAlign = "left", t.font = "16px BangersKugeln", t.fillText("/ " + this.dataMax, e + 3 + i, this.size - 67 + n))
            }, e.exports = n
        }, {}],
        42: [function(t, e, i) {
            function n() {
                this.dataHealthCurrent = 0, this.dataHealthMax = 11, this.colors = {
                    strokeBg: "rgba(0, 0, 0, 0.0)",
                    fillBg: "rgba(0, 0, 0, 0.5)",
                    highlightBg: "rgba(110, 0, 0, 0.5)",
                    circleEmpty: "rgba(70, 0, 0, 0.6)",
                    circleFull: "rgba(224, 0, 0, 1.0)",
                    separators: "rgba(0, 0, 0, 1.0)",
                    text: "rgba(224, 0, 0, 1.0)"
                }, this.init(0)
            }
            var r = t(54);
            t = t(41), n.prototype = Object.create(t.prototype), n.prototype.constructor = t, n.prototype.initColors = function(t) {
                var e = t.createLinearGradient(0, 0, 0, 200);
                e.addColorStop(0, "rgba(0, 0, 0, 0.5)"), e.addColorStop(1, "rgba(0, 0, 0, 0.8)");
                var i = t.createLinearGradient(0, 0, 0, 200);
                i.addColorStop(0, "rgba(150, 0, 0, 1.0)"), i.addColorStop(1, "rgba(255, 20, 20, 1.0)");
                var n = t.createLinearGradient(0, 0, 0, 200);
                n.addColorStop(0, "rgba(30, 0, 0, 0.6)"), n.addColorStop(1, "rgba(150, 0, 0, 0.6)"), (t = t.createLinearGradient(0, 0, 0, 200)).addColorStop(0, "rgba(210, 0, 0, 0.9)"), t.addColorStop(.6, "rgba(150, 0, 0, 0.9)"), t.addColorStop(1, "rgba(60, 0, 0, 0.8)"), this.colors = {
                    strokeBg: "rgba(0, 0, 0, 0.0)",
                    fillBg: e,
                    highlightBg: t,
                    circleEmpty: n,
                    circleFull: i,
                    separators: "rgba(100, 0, 0, 1.0)",
                    text: "rgba(224, 0, 0, 1.0)",
                    textOutline: "rgba(0, 0, 0, 1.0)"
                }
            }, n.prototype.setHealth = function(t, e) {
                this.dataHealthCurrent != t && (this.dirty = !0), this.dataHealthMax != e && (this.dirty = !0), this.dataHealthCurrent = t, this.dataHealthMax = e, this.highlight = 3 >= t, this.dataCur > t && (this.scale = 1.3), this.dataMax = e, this.dataCur = t, this.separatorCount = e
            }, n.prototype.getAnchor = function() {
                return [0, 1]
            }, n.prototype.getPos = function(t, e) {
                return [0, e]
            }, n.prototype.getTex = function() {
                return r.texHeart
            }, n.prototype.getTexPos = function() {
                return [this.size / 2 - 40, this.size / 2 - 45]
            }, e.exports = n
        }, {}],
        43: [function(t, e, i) {
            function n() {
                this.colors = {
                    strokeBg: "rgba(0, 0, 0, 0.0)",
                    fillBg: "rgba(0, 0, 0, 0.5)",
                    highlightBg: "rgba(0, 0, 0, 0.5)",
                    circleEmpty: "rgba(130, 60, 0, 0.6)",
                    circleFull: "rgba(255, 100, 0, 1.0)",
                    separators: "rgba(0, 0, 0, 1.0)",
                    text: "rgba(255, 100, 0, 1.0)"
                }, this.init(2), this.text = "overheat", this.dataMax = 255, this.dataHeat = this.dataCur = 0, this.dirty = !0
            }
            var r = t(54),
                s = t(41);
            n.prototype = Object.create(s.prototype), n.prototype.constructor = s, n.prototype.initColors = function(t) {
                var e = t.createLinearGradient(0, 0, 0, 200);
                e.addColorStop(0, "rgba(0, 0, 0, 0.5)"), e.addColorStop(1, "rgba(0, 0, 0, 0.8)");
                var i = t.createLinearGradient(0, 0, 0, 200);
                i.addColorStop(0, "rgba(150,  60, 0, 1.0)"), i.addColorStop(1, "rgba(255, 150, 0, 1.0)"), (t = t.createLinearGradient(0, 0, 0, 200)).addColorStop(0, "rgba(100, 40, 0, 0.6)"), t.addColorStop(1, "rgba(140, 65, 0, 0.6)"), this.colors = {
                    strokeBg: "rgba(0, 0, 0, 0.0)",
                    fillBg: e,
                    highlightBg: "rgba(0, 0, 0, 0.5)",
                    circleEmpty: t,
                    circleFull: i,
                    separators: "rgba(0, 0, 0, 1.0)",
                    text: "rgba(255, 100, 0, 1.0)",
                    textOutline: "rgba(0, 0, 0, 1.0)"
                }
            }, n.prototype.setHeat = function(t) {
                this.dataHeat != t && (255 <= t && (t = 255), this.dataHeat = t)
            }, n.prototype.setVisible = function(t) {
                this.visible = t, 0 == this.dataCur && (t = !1), this.infoSprite.visible = t
            }, n.prototype.getAnchor = function() {
                return [1, 1]
            }, n.prototype.getPos = function(t, e) {
                return [t - 240, e]
            }, n.prototype.getTex = function() {
                return r.texWarn
            }, n.prototype.getTexPos = function() {
                return [this.size / 2 - 40, this.size / 2 - 50]
            }, n.prototype.render = function() {
                var t = this.dataCur + (this.dataHeat - this.dataCur) / 8;
                1 > t && (t = 0), t != this.dataCur && (this.dataCur = t, this.dirty = !0), s.prototype.render.call(this)
            }, e.exports = n
        }, {}],
        44: [function(t, e, i) {
            function n() {
                this.sprite = r.renderer.createSprite(r.layerTileGrid), this.sprite.setTexture(r.texTileGrid), this.sprite.size.x = 256, this.sprite.size.y = 256
            }
            var r = t(54);
            n.prototype.setToTile = function(t, e, i) {
                this.sprite.pos.x = (t - 1.5) * i, this.sprite.pos.y = (e - 1.5) * i
            }, n.prototype.show = function(t) {
                this.sprite.visible = t
            }, n.prototype.screenResize = function(t, e) {}, e.exports = n
        }, {}],
        45: [function(t, e, i) {
            var n = t(38),
                r = t(132),
                s = [{
                    0: "fff763",
                    21: "fff307",
                    42: "c2bc00",
                    74: "c6d400",
                    100: "a49f00"
                }, {
                    0: "f2c83e",
                    21: "d6a70c",
                    42: "a58101",
                    74: "b6a100",
                    100: "8e6f00"
                }, {
                    0: "f18471",
                    21: "ed3919",
                    42: "c02102",
                    74: "d25400",
                    100: "a41b00"
                }, {
                    0: "fe2600",
                    41: "890000",
                    64: "160000",
                    100: "761400"
                }, {
                    0: "000000",
                    26: "1e1e1e",
                    70: "333333",
                    100: "000000"
                }];
            t = new function() {
                this.getTex = function(t, e) {
                    return this.createTex(t, e)
                }, this.createTex = function(t, e) {
                    return e = this.createCanvas(e), t.loadTextureFromImage(e)
                }, this.createCanvas = function(t) {
                    var e, i = n.createCanvas(32, 32),
                        a = i.getContext("2d"),
                        o = r.getLevelRange(t),
                        l = a.createLinearGradient(0, 0, 0, 32);
                    for (e in s[o]) l.addColorStop(e / 100, "#" + s[o][e]);
                    for (a.fillStyle = l, o = 2, l = [
                            [
                                [7, 2],
                                [2, 7],
                                [2, 2]
                            ],
                            [
                                [30, 7],
                                [25, 2],
                                [30, 2]
                            ],
                            [
                                [25, 30],
                                [30, 25],
                                [30, 30]
                            ],
                            [
                                [2, 25],
                                [7, 30],
                                [2, 30]
                            ]
                        ], a.beginPath(), a.moveTo(l[0][0][0], l[0][0][1]), e = 0; 4 > e; e++) {
                        var h = l[(e + 1) % 4];
                        a.lineTo(h[1][0], h[1][1]), a.arcTo(h[2][0], h[2][1], h[0][0], h[0][1], 5)
                    }
                    return a.lineWidth = o, a.fill(), a.stroke(), a.closePath(), t = "" + t, a.font = 1 == t.length ? "18px BangersKugeln" : "16px BangersKugeln", o = 16 - (o = a.measureText(t).width) / 2, a.fillStyle = "#000", a.fillText(t, o - 1, 21), a.fillText(t, o - 1, 23), a.fillText(t, o + 1, 21), a.fillText(t, o + 1, 23), a.fillStyle = "#fff", a.fillText(t, o, 22), i
                }
            }, e.exports = t
        }, {}],
        46: [function(t, e, i) {
            function n(t, e, i, n, r, s, a, o) {
                this.init(t, e, i, n, r, s, a, o)
            }
            var r = t(147),
                s = t(146).ItemTypes,
                a = t(131),
                o = t(38),
                l = t(156),
                h = t(17),
                c = t(54),
                u = t(37),
                p = t(91),
                d = t(55),
                f = t(28),
                m = t(60),
                g = t(88),
                v = t(92),
                y = t(31),
                x = t(33),
                b = t(32);
            n.prototype.baseTex = null, n.prototype.tileTex = [], n.prototype.objBaseTex = null, n.prototype.objTex = [], n.prototype.tileCanvas = [], n.prototype.shark = [], n.prototype.map = null, n.prototype.gameType = null, n.prototype.tileSize = 0, n.prototype.tileAtlasSize = null, n.prototype.dataTexSize = 0, n.prototype.mapAtlasTex = null, n.prototype.mapDataTex = null, n.prototype.mapSprite = null, n.prototype.flags = null, n.prototype.backgroundDef = null, n.prototype.backgroundTex = null, n.prototype.backgroundSprite = null, n.prototype.bgFx = null, n.prototype.ready = !1, n.prototype.init = function(t, e, i, n, s, a, o, h) {
                var p = this;
                if (this.tileSize = a, this.gameType = o, this.tileAtlasSize = 0, this.objectDef = s, this.sharks = [], this.map = new r(t, a), this.backgroundDef = f[t.bg], !m.get("lowGfx")) switch (t.bgFx) {
                    case "fog":
                        this.bgFx = new y;
                        break;
                    case "snow":
                        this.bgFx = new x;
                        break;
                    case "pollen":
                        this.bgFx = new b
                }(s = new d).add(this.baseTex = c.renderer.loadBaseTextureFromUrl(i)), s.add(this.objBaseTex = c.renderer.loadBaseTextureFromUrl(n)), s.add(this.backgroundImage = new Image), this.objTex = {}, this.backgroundImage.src = l.Core.Util.getCompatibleImageUrl(p.backgroundDef.url) + "?v=" + kugelnVersion, s.done(function() {
                    var i = ~~(p.baseTex.width / a),
                        n = ~~(p.baseTex.height / a);
                    if (i != n) throw Error("Invalid texture size");
                    p.tileAtlasSize = i;
                    for (var r = 0; r < n; r++)
                        for (var s = 0; s < i; s++) {
                            var o = new l.Core.Rect(1 / i * s, 1 / n * r, 1 / i, 1 / n);
                            o = c.renderer.loadTextureFromBase(p.baseTex, o), p.tileTex.push(o), p.tileCanvas.push(p.createCanvasFromTileTex(o))
                        }
                    for (var d in p.objectDef.f) i = p.objectDef.f[d], o = new l.Core.Rect(i[0] / p.objectDef.w, i[1] / p.objectDef.h, i[2] / p.objectDef.w, i[3] / p.objectDef.h), p.objTex[d] = {
                        tex: c.renderer.loadTextureFromBase(p.objBaseTex, o)
                    };
                    p.baseTex.setFilter(!1), p.mapAtlasTex = c.renderer.loadTextureFromBase(p.baseTex), p.mapSprite = c.renderer.createSprite(c.layerMapTiles), p.mapSprite.material = c.renderer.createMaterial(v), p.mapSprite.setTexture(p.mapDataTex, 0), p.mapSprite.setTexture(p.mapAtlasTex, 1), p.blurBackground(p.backgroundDef.blur), p.backgroundTex.setWrapMode(l.Trachyt2d.TEX_REPEAT, l.Trachyt2d.TEX_CLAMP), p.backgroundSprite = c.renderer.createSprite(c.layerBackground), p.backgroundSprite.material = c.renderer.createMaterial(g), p.backgroundSprite.setTexture(p.backgroundTex), d = p.backgroundDef.sky, i = p.backgroundDef.fog, p.backgroundSprite.material.setSkyColor(d[0][0], d[0][1], d[0][2], d[1][0], d[1][1], d[1][2]), p.backgroundSprite.material.setFog(i[0], i[1], i[2], p.backgroundDef.fogStart), p.backgroundSprite.material.setBrightness(p.backgroundDef.brightness), p.map.loadFromUrl(e, function() {
                        t.border ? p.mapSprite.material.setBorderColor(t.border[0], t.border[1], t.border[2], 255) : p.mapSprite.material.setBorderColor(0, 0, 0, 0);
                        var e = p.map.mapWidth,
                            i = p.map.mapHeight;
                        p.dataTexSize = 1 << Math.ceil(Math.log(Math.max(e, i)) / Math.log(2)), p.mapSprite.material.setMapSize(e, i, p.dataTexSize), p.mapSprite.material.setAtlasEdgeSize(p.tileAtlasSize), p.mapDataTex = c.renderer.createDataTexture(p.dataTexSize, p.dataTexSize);
                        for (var n = 256 / p.tileAtlasSize, r = 0; r < p.map.mapHeight; r++)
                            for (var s = 0; s < p.map.mapWidth; s++) {
                                var o = p.map.map[r][s];
                                o && (o = o.tile - 1, p.mapDataTex.setPixel(s, r, o % p.tileAtlasSize * n, ~~(o / p.tileAtlasSize) * n, 0, 255))
                            }
                        p.bgFx && (p.bgFx instanceof y ? p.bgFx.init(c.layerBgFx, [-1e3, -1e3, e * a * .8 + 1e3, i * a * .8 + 1e3], t.bgFogIntensity) : p.bgFx instanceof x ? p.bgFx.init(c.layerBgFx, [-1e3, -1e3, e * a * .8 + 1e3, i * a * .8 + 1e3]) : p.bgFx instanceof b && p.bgFx.init(c.layerBgFx, [-1e3, -1e3, e * a * .8 + 1e3, i * a * .8 + 1e3])), p.mapDataTex.update(), p.mapSprite.setTexture(p.mapDataTex, 0), p.mapSprite.setTexture(p.mapAtlasTex, 1), c.materialCompose.setWaterLevel(p.map.waterLevel), p.createItemSprites(), p.createObjectSprites(), p.createFlagSprites(), p.createSpecials(), p.resize(u.width, u.height), p.ready = !0, h()
                    })
                }, function(t, e) {
                    var i = "unknown";
                    throw t && (t.src ? i = t.src : t.base && t.base._imgObject && t.base._imgObject.src && (i = t.base._imgObject.src.substr(250))), "unknown" == i && e && e.src && (i = e.src), Error("mapgfx loading error: " + i)
                })
            }, n.prototype.update = function(t) {
                var e = Date.now();
                if (this.map.items)
                    for (var i = 0; i < this.map.items.length; i++) {
                        var n = this.map.items[i];
                        if (n.sprite)
                            if (n.active) {
                                n.sprite.visible = !0;
                                var r = (e / 1500 + n.x / 1.15 + n.y / 1.25) * Math.PI * 2;
                                n.sprite.pos.x = ~~((n.x + .5) * this.map.tileSize + 3 * Math.cos(r)), n.sprite.pos.y = ~~((n.y + .5) * this.map.tileSize + 3 * Math.sin(r)), n.sprite.anchor.x = .5, n.sprite.anchor.y = .5
                            } else n.sprite.visible = !1
                    }
                if (this.map.objects)
                    for (i = 0; i < this.map.objects.length; i++)(n = this.map.objects[i]).sprite && (n.active ? (n.animTime = 0, n.sprite.visible = !0) : 6e3 < (r = Date.now() - n.animTime) ? n.sprite.visible = !1 : (r /= 1e3, n.sprite.angle = (Math.cos(Math.min(1.2 * r, Math.PI)) + 3) * Math.PI * .5 * (0 == i % 2 ? 1 : -1), r = Math.max(0, r - 1.3), n.sprite.pos.x = n.renderPos[0], n.sprite.pos.y = n.renderPos[1] + r * r * 500));
                if (this.flags)
                    for (i = 0; i < this.flags.length; i++) this.flags[i].flagSprite.material.updateTime();
                if (this.sharks)
                    for (i = 0; i < this.sharks.length; i++) this.updateShark(this.sharks[i], t);
                this.bgFx && this.bgFx.update(e)
            }, n.prototype.updateShark = function(t, e) {
                var i = (65535 * t.rand + e / 1e3 * t.speed) % (2 * t.lineWidth),
                    n = 0;
                i > t.lineWidth && (n = 1, i = t.lineWidth - i % t.lineWidth);
                var r = (this.map.waterLevel - u.getCamera()[1]) / 50 / u.zoom;
                e = 10 * Math.sin(1e3 * t.rand + e * t.speed / 5e4), t.sprite.pos.x = i - t.lineBorder, t.sprite.pos.y = this.map.waterLevel + e - r + 10, t.sprite.size.x = Math.abs(t.sprite.size.x) * (n ? -1 : 1)
            }, n.prototype.blurBackground = function(t) {
                var e = this.backgroundImage.width,
                    i = this.backgroundImage.height,
                    n = e >> 1,
                    r = o.createCanvas(2 * e, i),
                    s = r.getContext("2d");
                s.drawImage(this.backgroundImage, 0, 0), s.drawImage(this.backgroundImage, e, 0), 0 < t && o.blurCanvas(r, t), (s = (t = o.createCanvas(e, i)).getContext("2d")).drawImage(r, n, 0, n, i, n, 0, n, i), s.drawImage(r, e, 0, n, i, 0, 0, n, i), this.backgroundTex = c.renderer.loadTextureFromImage(t)
            }, n.prototype.createItemSprites = function() {
                for (var t = 0; t < this.map.items.length; t++) {
                    var e = this.map.items[t],
                        i = s[e.type],
                        n = null;
                    switch (i.texType) {
                        case 0:
                            switch (i.texId) {
                                case 0:
                                    n = c.texHeart;
                                    break;
                                case 1:
                                    n = c.texJetpackItem;
                                    break;
                                default:
                                    throw Error("Invalid tex id")
                            }
                            break;
                        case 1:
                            n = c.texWeapons[i.texId]
                    }
                    if (!n) throw Error("Unknown item texture");
                    e.sprite = c.renderer.createSprite(c.layerItems), e.sprite.setTexture(n), e.sprite.size.x = n.getWidth() * i.texScale, e.sprite.size.y = n.getHeight() * i.texScale
                }
            }, n.prototype.createObjectSprites = function() {
                if (null != this.map.objects)
                    for (var t = 0; t < this.map.objects.length; t++) {
                        var e = this.map.objects[t],
                            i = this.map.objectMap[e.type],
                            n = this.objTex[i];
                        if (!n) throw Error("Unknown object " + i);
                        e.renderPos = [e.x * this.map.tileSize + n.tex.getWidth() / 2, (e.y + 1) * this.map.tileSize + 3], e.sprite = c.renderer.createSprite(c.layerObjects), e.sprite.setTexture(n.tex), e.sprite.pos.x = e.renderPos[0], e.sprite.pos.y = e.renderPos[1], e.sprite.anchor.x = .5, e.sprite.anchor.y = 1, e.sprite.size.x = n.tex.getWidth(), e.sprite.size.y = n.tex.getHeight()
                    }
            }, n.prototype.createSharks = function() {
                for (var t = this.map.mapWidth * this.map.tileSize + 6e3, e = ~~(t / 1e3), i = new a.DRandom(2725360529), n = 0; n < e; n++) {
                    var r = c.renderer.createSprite(c.layerSharks);
                    r.setTexture(c.texShark), r.anchor.x = .5, r.anchor.y = 1, r.size.x = 1.6 * c.texShark.getWidth(), r.size.y = 1.6 * c.texShark.getHeight(), this.sharks.push({
                        rand: i.next(),
                        speed: 100 * i.next() + 200,
                        sprite: r,
                        lineBorder: 3e3,
                        lineWidth: t
                    })
                }
            }, n.prototype.createFlagSprites = function() {
                if (null != this.map.flags && this.gameType.ctf) {
                    this.flags = [];
                    for (var t = 0; t < this.map.flags.length; t++) {
                        var e = c.renderer.createSprite(c.layerFlag0),
                            i = c.renderer.createSprite(c.layerFlag1);
                        e.material = c.renderer.createMaterial(p), i.setTexture(c.texPole), 0 == t ? e.material.setColor(1, 0, 0) : e.material.setColor(0, 0, 1), e.size.x = 96, e.size.y = 96, i.size.x = 128, i.size.y = 128, this.flags[t] = {
                            flagSprite: e,
                            poleSprite: i
                        }
                    }
                }
            }, n.prototype.createSpecials = function() {
                function t(t, i) {
                    var n = c.renderer.createSprite(c.layerObjects);
                    return n.setTexture(i.tex), n.pos.x = t[0] * e.map.tileSize, n.pos.y = t[1] * e.map.tileSize, n.size.x = i.tex.getWidth(), n.size.y = i.tex.getHeight(), n
                }
                for (var e = this, i = this.map.usables, n = 0; n < i.length; n++) {
                    var r = i[n];
                    switch (r.type) {
                        case "mg1":
                            r.gfxGun = t([0, 0], this.objTex.mg1_gun), r.gfxPod = t(r.pos, this.objTex.mg1_pod), r.gfxGun.anchor.x = .5, r.gfxGun.anchor.y = .75, r.gfxGun.pos.x = (r.pos[0] + .5) * e.map.tileSize, r.gfxGun.pos.y = (r.pos[1] + .3) * e.map.tileSize
                    }
                }
            }, n.prototype.setFlagPos = function(t, e, i) {
                this.flags[t].flagSprite.pos.x = e + 32, this.flags[t].flagSprite.pos.y = i - 64, this.flags[t].poleSprite.pos.x = e - 32, this.flags[t].poleSprite.pos.y = i - 64
            }, n.prototype.createCanvasFromTileTex = function(t) {
                return t.toCanvas()
            }, n.prototype.copyCanvas = function(t) {
                var e = o.createCanvas(t.width, t.height);
                return e.getContext("2d").drawImage(t, 0, 0), e
            }, n.prototype.setCamera = function(t, e) {
                this.backgroundSprite && (c.layerBackground.offset.x = ~~t, c.layerBackground.offset.y = ~~e, this.backgroundSprite.size.x = c.camera.viewportSize.x, this.backgroundSprite.size.y = c.camera.viewportSize.y, this.backgroundSprite.material.setOffset(t / this.backgroundTex.getWidth() / 6, e / this.backgroundTex.getHeight() / 6 - .1), this.backgroundSprite.material.setScreenFactor(u.width / this.backgroundTex.getWidth(), u.height / this.backgroundTex.getHeight()), this.mapSprite.pos.x = ~~t, this.mapSprite.pos.y = ~~e, this.mapSprite.size.x = c.camera.viewportSize.x, this.mapSprite.size.y = c.camera.viewportSize.y, this.mapSprite.material.setOffset(~~t, ~~e), this.mapSprite.material.setScreenSize(c.camera.viewportSize.x, c.camera.viewportSize.y))
            }, n.prototype.resize = function(t, e) {}, n.prototype.stampOut = function(t, e) {
                for (var i = ~~((t[0] - e) / this.tileSize), n = ~~((t[0] + e) / this.tileSize), r = ~~((t[1] + e) / this.tileSize), s = !1, a = ~~((t[1] - e) / this.tileSize); a <= r; a++)
                    if (!(0 > a || a >= this.map.map.length))
                        for (var o = i; o <= n; o++)
                            if (!(0 > o || o >= this.map.map[a].length)) {
                                var l = this.map.map[a][o];
                                if (l) {
                                    if (!l.modifiedTex) {
                                        if (l.isModified) continue;
                                        var u = this.copyCanvas(this.tileCanvas[l.tile - 1]);
                                        l.modifiedCtx = u.getContext("2d"), l.modifiedCtx.imageSmoothingEnabled = !1
                                    }
                                    l.modifiedCtx.save(), l.modifiedCtx.globalCompositeOperation = "destination-out";
                                    for (var p = ~~(t[0] - o * this.tileSize), d = ~~(t[1] - a * this.tileSize - e), f = Math.min(this.tileSize, ~~(d + 2 * e)), m = h[this.map.mapDef.tileset][l.tile].lock || null, g = Math.max(0, d); g <= f; g++) {
                                        var v = 1 + ~~(Math.cos(Math.asin((g - d - e) / e)) * e),
                                            y = Math.max(0, p - v),
                                            x = Math.min(this.tileSize, p + v);
                                        if (null == m) l.modifiedCtx.fillRect(y, g, x - y, 1);
                                        else {
                                            v = [];
                                            for (var b = 0; b < m.length; b++) g >= m[b][1] && g < m[b][3] && (v.push(m[b][0], m[b][2]), m[b][0] <= y && m[b][2] > y && (y = m[b][2]));
                                            for (;;) {
                                                var w = x,
                                                    S = x;
                                                for (b = 0; b < v.length; b += 2) v[b] < w && v[b] >= y && (w = v[b], S = v[b + 1]);
                                                if (w > y && l.modifiedCtx.fillRect(y, g, w - y, 1), y = S, S == x) break
                                            }
                                        }
                                    }
                                    l.modifiedCtx.restore(), l.modifiedTex ? l.modifiedTex.update() : l.modifiedTex = c.renderer.loadTextureFromImage(u), l.isModified = !0, l.sprite || (l.sprite = c.renderer.createSprite(c.layerMapTiles), l.sprite.setTexture(l.modifiedTex), l.sprite.pos.x = this.tileSize * o, l.sprite.pos.y = this.tileSize * a, l.sprite.size.x = this.tileSize, l.sprite.size.y = this.tileSize, this.mapDataTex.setPixel(o, a, 0, 0, 0, 0), s = !0)
                                }
                            } s && this.mapDataTex.update()
            }, n.prototype.killPixels = function(t) {
                for (var e = t.length >> 1, i = 0; i < e; i++) {
                    var n = t[i << 1],
                        r = t[1 + (i << 1)],
                        s = ~~(n / this.tileSize),
                        a = ~~(r / this.tileSize),
                        o = this.map.map[a][s];
                    if (o) {
                        if (!o.modifiedTex) {
                            var l = this.copyCanvas(this.tileCanvas[o.tile - 1]);
                            o.modifiedCtx = l.getContext("2d"), o.modifiedCtx.imageSmoothingEnabled = !1
                        }
                        o.modifiedCtx.save(), o.modifiedCtx.globalCompositeOperation = "destination-out", o.modifiedCtx.fillRect(n - s * this.tileSize, r - a * this.tileSize, 2, 2), o.modifiedCtx.restore(), o.modifiedTex ? o.modifiedTex.update() : o.modifiedTex = c.renderer.loadTextureFromImage(l), o.isModified = !0, o.sprite.setTexture(o.modifiedTex)
                    }
                }
            }, n.prototype.stampOutUsingTree = function() {
                var t = this.map,
                    e = this;
                if (64 != t.tileSize) throw Error("Tile size out of sync");
                var i = [];
                ! function n(r, s, a) {
                    var o = r.size >> 1;
                    if (null != r.q0) n(r.q0, s, a), n(r.q1, s + o, a), n(r.q2, s, a + o), n(r.q3, s + o, a + o);
                    else if (0 == r.value)
                        if (r.size < t.tileSize) {
                            var l = s >> 6,
                                h = a >> 6,
                                c = l << 6,
                                u = h << 6;
                            if (!(o = t.map[h][l])) throw Error("Cannot find tile info: " + h + "\t" + l + "\t" + c + "\t" + u + "\t" + r.size + "\t" + t.tileSize); - 1 == i.indexOf(o) && (o.modifiedTex || (l = e.copyCanvas(e.tileCanvas[o.tile - 1]), o.modifiedCtx = l.getContext("2d"), o.modifiedCtx.imageSmoothingEnabled = !1), o.modifiedCtx.save(), o.modifiedCtx.globalCompositeOperation = "destination-out", i.push(o), o.isModified = !0), o.modifiedCtx.fillRect(s - c, a - u, r.size, r.size)
                        } else
                            for (c = s >> 6, s = s + r.size >> 6, r = a + r.size >> 6, h = a >> 6; h < r; h++)
                                if (!(0 > h || h >= t.map.length))
                                    for (l = c; l < s; l++) 0 > l || l >= t.map[h].length || !(o = t.map[h][l]) || (o.sprite && o.sprite.remove(), o.isModified = !0, e.mapDataTex.setPixel(l, h, 0, 0, 0, 0))
                }(t.quadTree.root, 0, 0);
                for (var n = 0; n < i.length; n++) {
                    var r = i[n];
                    r.modifiedCtx.restore(), r.modifiedTex ? r.modifiedTex.update() : r.modifiedTex = c.renderer.loadTextureFromImage(r.modifiedCtx.canvas), r.sprite || (r.sprite = c.renderer.createSprite(c.layerMapTiles), r.sprite.setTexture(r.modifiedTex), r.sprite.pos.x = this.tileSize * r.x, r.sprite.pos.y = this.tileSize * r.y, r.sprite.size.x = this.tileSize, r.sprite.size.y = this.tileSize, this.mapDataTex.setPixel(r.x, r.y, 0, 0, 0, 0))
                }
                this.mapDataTex.update()
            }, n.prototype.addBrick = function(t, e) {
                var i = this.map.map[e][t],
                    n = 256 / this.tileAtlasSize;
                if (!i) throw Error("Tile not set");
                i = i.tile - 1, this.mapDataTex.setPixel(t, e, i % this.tileAtlasSize * n, ~~(i / this.tileAtlasSize) * n, 0, 255), this.mapDataTex.update()
            }, n.prototype.resetDamage = function() {
                for (var t = 256 / this.tileAtlasSize, e = 0; e < this.map.mapHeight; e++)
                    for (var i = 0; i < this.map.mapWidth; i++) {
                        var n = this.map.map[e][i];
                        if (n && n.isModified) {
                            n.sprite && (n.sprite.remove(), n.sprite = null), n.modifiedTex = null;
                            var r = n.tile - 1;
                            this.mapDataTex.setPixel(i, e, r % this.tileAtlasSize * t, ~~(r / this.tileAtlasSize) * t, 0, 255), n.isModified = !1
                        }
                    }
            }, e.exports = n
        }, {}],
        47: [function(t, e, i) {
            function n(t, e, i, n, r) {
                this.extended = n, this.sizeBall = e, this.sizeTarget = i, this.customization = r, this.sprite = null, this.targetCanvas = t, this.skinSprites = [], this.eyeRotationStrength = this.eyeStrength = this.eye = this.angle = 0, this.ballType = this.getBallType(r.ball), this.hideEye = !1, this.dirty = !0, this.init()
            }
            var r = t(54),
                s = t(35),
                a = t(152),
                o = t(87),
                l = t(125);
            t(95), n.prototype.init = function() {
                if (0 == s.getLoadingStage()) throw Error("Flags not loaded yet");
                var t = s.getTex(this.customization.ball);
                for (this.sprite = r.renderer.createSprite(r.layerPreview), this.sprite.setTexture(r.texBallPath, 0), this.sprite.setTexture(t, 1), this.sprite.setTexture(r.texEyes, 2), this.sprite.anchor.x = .5, this.sprite.anchor.y = .5, this.sprite.size.x = this.sizeBall, this.sprite.size.y = this.sizeBall, this.sprite.visible = !1, this.sprite.material = r.renderer.createMaterial(o, {
                        type: this.ballType
                    }), this.sprite.material.setFlagTex(t), this.sprite.material.setFlagInverted(s.isInverted(this.customization.ball)), t = 0; t < a.length; t++) 0 == a[t].special ? (this.skinSprites[t] = r.renderer.createSprite(r.layerPreview), this.skinSprites[t].anchor.x = .5, this.skinSprites[t].anchor.y = .5, this.skinSprites[t].visible = !1) : this.skinSprites[t] = null;
                this.setViewingDirection(0, 1.2), this.setCustomization(this.customization)
            }, n.prototype.setCustomization = function(t) {
                this.customization = t;
                var e = s.getTex(this.customization.ball);
                for (this.ballType = this.getBallType(t.ball), this.hideEye = !1, this.dirty = !0, this.sprite.setTexture(e, 1), this.sprite.material = r.renderer.createMaterial(o, {
                        type: this.ballType
                    }), this.sprite.material.setFlagTex(e), this.sprite.material.setFlagInverted(s.isInverted(t.ball)), e = 0; e < a.length; e++) {
                    var i = t[a[e].name];
                    if (0 == a[e].special) 0 == i ? this.skinSprites[e].setTexture(null) : (i = r.texSkins[e][i - 1], this.skinSprites[e].setTexture(i));
                    else if (1 == a[e].special)
                        if (0 == i) this.sprite.material.setGlassesTex(null), this.sprite.setTexture(r.renderer.nullTexture, 3);
                        else {
                            var n = a[e].list[i - 1].noEye || !1;
                            i = r.texSkins[e][i - 1], n && (this.hideEye = !0), this.sprite.material.setGlassesTex(i), this.sprite.setTexture(i, 3)
                        }
                }
                this.setEye(this.eye)
            }, n.prototype.setEye = function(t) {
                this.eye == t && (this.eye = t, this.dirty = !0);
                var e = t % 4;
                t = ~~(t / 4), this.hideEye && (t = e = -1), this.sprite.material.setEyeTexOffset(e, t)
            }, n.prototype.setRenderPos = function(t, e) {
                for (t = this.sizeTarget / 2 + t, e = this.sizeTarget / 2 + e + (this.extended ? .3 * this.sizeBall : 0), this.sprite.pos.x == t && this.sprite.pos.y == e || (this.sprite.pos.x = t, this.sprite.pos.y = e, this.dirty = !0), e = 1, Math.abs(this.angle) > Math.PI / 2 && (e = -1), t = 0; t < a.length; t++) {
                    var i = this.customization[a[t].name];
                    if (0 < i && null != this.skinSprites[t]) {
                        var n = a[t].list[i - 1];
                        i = r.texSkins[t][i - 1], this.skinSprites[t].pos.x = this.sprite.pos.x + n.x * this.sizeBall * e, this.skinSprites[t].pos.y = this.sprite.pos.y + n.y * this.sizeBall, this.skinSprites[t].size.x = n.scale * i.getWidth() / 128 * this.sizeBall * e, this.skinSprites[t].size.y = n.scale * i.getHeight() / 128 * this.sizeBall
                    }
                }
            }, n.prototype.setViewingDirection = function(t, e, i) {
                var n = Math.PI / 2,
                    r = t;
                this.angle == t && this.eyeStrength == e && this.eyeRotationStrength == i || (this.dirty = !0), this.eyeStrength = e, this.eyeRotationStrength = i, this.angle = t, r > n && (r = -(Math.PI - r)), r < -n && (r = Math.PI + r), r *= .15 * i, this.sprite.material.setEyeOffset(.06 * Math.cos(t) * e, .04 * Math.sin(t) * e), this.sprite.material.setEyeRotation(r, r)
            }, n.prototype.getBallType = function(t) {
                for (var e = 0; e < l.length; e++)
                    if (l[e].c == t) {
                        if (l[e].t) return l[e].t;
                        break
                    } return 0
            }, n.prototype.render = function() {
                if (this.dirty) {
                    this.dirty = !1, this.sprite.visible = !0;
                    for (var t = 0; t < this.skinSprites.length; t++) this.skinSprites[t] && null != this.skinSprites[t].getTexture() && (this.skinSprites[t].visible = !0);
                    for (this.setRenderPos(0, 0), r.renderer.setClearColor(0, 0, 0, 0), r.renderer.renderSeparateScene(r.scenePreview, this.targetCanvas, this.targetCanvas.width, this.targetCanvas.height), this.sprite.visible = !1, t = 0; t < this.skinSprites.length; t++) this.skinSprites[t] && (this.skinSprites[t].visible = !1)
                }
            }, e.exports = n
        }, {}],
        48: [function(t, e, i) {
            function n(t) {
                this.size = t, this.list = [], this.currentY = this.currentX = 0, this.canvas = document.createElement("canvas")
            }
            var r = t(54);
            t(55), t(35), t(87);
            var s = t(156),
                a = t(95);
            n.prototype.reset = function() {
                this.list = [], this.currentY = this.currentX = 0
            }, n.prototype.add = function(t) {
                if (t.sizeBall != this.size) throw Error("Invalid menu ball size");
                if (this.currentX + 2 * this.size > a.width) {
                    if (this.currentY + 2 * this.size > a.height) return !1;
                    this.currentY += this.size, this.currentX = 0
                } else this.currentX += this.size;
                return this.list.push(t), t.setRenderPos(this.currentX, this.currentY), !0
            }, n.prototype.render = function(t) {
                function e() {
                    for (var e = 0; e < i.list.length; e++) {
                        var n = i.list[e].sprite.pos.x,
                            r = i.list[e].sprite.pos.y,
                            s = i.list[e].sizeTarget;
                        i.list[e].sprite.visible = !1, i.list[e].targetCanvas.getContext("2d").drawImage(o, n - s / 2, r - s / 2, i.size, i.size, 0, 0, i.size, i.size)
                    }
                    t()
                }
                var i = this;
                if (0 != this.list.length) {
                    this.canvas.width = a.width, this.canvas.height = a.height;
                    for (var n = 0; n < this.list.length; n++) this.list[n].sprite.visible = !0;
                    r.renderer.setClearColor(0, 0, 0, 0), r.renderer.renderSeparateScene(r.scenePreview, this.canvas, this.canvas.width, this.canvas.height);
                    var o = this.canvas;
                    s.Core.Util.isChrome() ? ((o = new Image).src = this.canvas.toDataURL(), o.complete ? e() : o.onload = e) : e()
                }
            }, e.exports = n
        }, {}],
        49: [function(t, e, i) {
            function n() {
                this.targetCanvas = null, this.size = 0, this.mirror = !1, this.pos = [0, 0], this.poleSprite = this.flagSprite = null
            }
            var r = t(54),
                s = t(91);
            n.prototype.init = function(t, e) {
                var i = r.renderer.createSprite(r.layerPreview),
                    n = r.renderer.createSprite(r.layerPreview);
                i.material = r.renderer.createMaterial(s), n.setTexture(r.texPole), i.size.x = .75 * e, i.size.y = .75 * e, n.size.x = e, n.size.y = e, i.visible = !1, n.visible = !1, this.targetCanvas = t, this.flagSprite = i, this.poleSprite = n, this.size = e
            }, n.prototype.setTeam = function(t) {
                0 == t ? this.flagSprite.material.setColor(1, 0, 0) : this.flagSprite.material.setColor(0, 0, 1)
            }, n.prototype.setPos = function(t, e, i) {
                this.mirror = 0 | i, this.pos = [t, e], i = .25 * this.size;
                var n = .5 * this.size;
                this.flagSprite.pos.x = t + i, this.flagSprite.pos.y = e - n, this.poleSprite.pos.x = t - i, this.poleSprite.pos.y = e - n, this.flagSprite.anchor.x = this.mirror ? 1 : 0, this.flagSprite.material.mirror = this.mirror
            }, n.prototype.render = function() {
                this.flagSprite.visible = !0, this.poleSprite.visible = !0, r.renderer.setClearColor(0, 0, 0, 0), r.renderer.renderSeparateScene(r.scenePreview, this.targetCanvas, this.targetCanvas.width, this.targetCanvas.height), this.flagSprite.visible = !1, this.poleSprite.visible = !1
            }, e.exports = n
        }, {}],
        50: [function(t, e, i) {
            t = {
                tex: 2,
                emitterLifeTime: 2,
                particleLifeTime: 150,
                scattering: 2 * Math.PI,
                perStep: 10,
                size: 100,
                speed: [2, 5],
                rotSpeed: [-.1, .1],
                damping: [.03, .05],
                fadeOut: .05,
                color: [.1, .1, .1, .5]
            }, i = {
                tex: 2,
                emitterLifeTime: 1,
                particleLifeTime: 200,
                scattering: .5,
                perStep: 1,
                size: 100,
                speed: [1, 2],
                rotSpeed: [-.02, .02],
                damping: [.01, .03],
                fadeOut: .02,
                color: [.1, .1, .1, .2]
            }, e.exports = {
                impactWater1: [{
                    tex: 1,
                    emitterLifeTime: 1,
                    particleLifeTime: 40,
                    scattering: .2,
                    perStep: 160,
                    size: 10,
                    speed: [1, 40],
                    rotSpeed: [-.5, .5],
                    damping: [.15, .2],
                    fadeOut: .15,
                    color: [.6, .7, .9, 1]
                }],
                impactWater2: [{
                    tex: 2,
                    emitterLifeTime: 1,
                    particleLifeTime: 100,
                    scattering: 1.2,
                    perStep: 300,
                    size: 70,
                    speed: [1, 20],
                    rotSpeed: [-.05, .05],
                    damping: [.05, .07],
                    fadeOut: .08,
                    color: [.6, .7, .9, 1]
                }],
                impactWater3: [{
                    tex: 2,
                    emitterLifeTime: 1,
                    particleLifeTime: 100,
                    scattering: 1.5,
                    perStep: 300,
                    size: 90,
                    speed: [1, 30],
                    rotSpeed: [-.05, .05],
                    damping: [.05, .07],
                    fadeOut: .08,
                    color: [.6, .7, .9, 1]
                }, t],
                impactGround1: [{
                    tex: 1,
                    emitterLifeTime: 2,
                    particleLifeTime: 30,
                    scattering: 2 * Math.PI,
                    perStep: 12,
                    size: 20,
                    speed: [1, 3],
                    rotSpeed: [-.1, .1],
                    damping: [.03, .05],
                    fadeOut: .1,
                    color: [.5, .5, .5, .6]
                }],
                impactGround2: [{
                    tex: 2,
                    emitterLifeTime: 2,
                    particleLifeTime: 100,
                    scattering: 2 * Math.PI,
                    perStep: 10,
                    size: 70,
                    speed: [1, 3],
                    rotSpeed: [-.1, .1],
                    damping: [.03, .05],
                    fadeOut: .05,
                    color: [.1, .1, .1, .5]
                }, {
                    tex: 2,
                    emitterLifeTime: 1,
                    particleLifeTime: 30,
                    scattering: 2 * Math.PI,
                    perStep: 30,
                    size: 60,
                    speed: [5, 7],
                    rotSpeed: [-.1, .1],
                    damping: [.1, .2],
                    fadeOut: .1,
                    color: [.6, .1, .1, 1]
                }, {
                    tex: 2,
                    emitterLifeTime: 2,
                    particleLifeTime: 20,
                    scattering: 2 * Math.PI,
                    perStep: 2,
                    size: 60,
                    speed: [1, 3],
                    rotSpeed: [-.1, .1],
                    damping: [.05, .07],
                    fadeOut: .13,
                    color: [.8, .8, .1, .7]
                }],
                impactGround3: [t, {
                    tex: 2,
                    emitterLifeTime: 1,
                    particleLifeTime: 45,
                    scattering: 2 * Math.PI,
                    perStep: 30,
                    size: 90,
                    speed: [7, 10],
                    rotSpeed: [-.1, .1],
                    damping: [.1, .2],
                    fadeOut: .1,
                    color: [.6, .1, .1, 1]
                }, {
                    tex: 2,
                    emitterLifeTime: 2,
                    particleLifeTime: 40,
                    scattering: 2 * Math.PI,
                    perStep: 2,
                    size: 90,
                    speed: [2, 5],
                    rotSpeed: [-.1, .1],
                    damping: [.05, .07],
                    fadeOut: .13,
                    color: [.8, .8, .1, .7]
                }],
                patronEject: [{
                    tex: 0,
                    emitterLifeTime: 1,
                    particleLifeTime: 15,
                    scattering: .5,
                    perStep: 1,
                    size: 14,
                    speed: [5, 7],
                    initRot: 1.8,
                    initAngle: 0,
                    rotSpeed: [-0, 0],
                    damping: [0, 0],
                    gravity: [0, .6],
                    fadeOut: .06,
                    color: [.8, .8, 0, 1]
                }],
                collectHeart: [{
                    tex: 3,
                    emitterLifeTime: 1,
                    particleLifeTime: 30,
                    scattering: 2 * Math.PI,
                    perStep: 30,
                    size: 30,
                    speed: [1, 5],
                    initRot: 0,
                    initAngle: -1.57,
                    rotSpeed: [-.2, .2],
                    damping: [0, .4],
                    gravity: [0, -.4],
                    fadeOut: .13,
                    color: [1, 0, 0, 1]
                }],
                death: [{
                    tex: 4,
                    emitterLifeTime: 1,
                    particleLifeTime: 50,
                    scattering: 0,
                    perStep: 1,
                    size: 110,
                    speed: 7,
                    initRot: 0,
                    initAngle: -1.57,
                    rotSpeed: 0,
                    damping: 0,
                    gravity: [0, 0],
                    fadeOut: .08,
                    color: [1, 1, 1, 1]
                }, {
                    tex: 2,
                    emitterLifeTime: 2,
                    particleLifeTime: 100,
                    scattering: 2 * Math.PI,
                    perStep: 20,
                    size: 70,
                    speed: [2, 5],
                    rotSpeed: [-.1, .1],
                    damping: [.02, .04],
                    fadeOut: .06,
                    color: [1, 1, 1, .3]
                }, {
                    tex: 2,
                    emitterLifeTime: 2,
                    particleLifeTime: 100,
                    scattering: 2 * Math.PI,
                    perStep: 30,
                    size: 70,
                    speed: [1, 2],
                    rotSpeed: [-.1, .1],
                    damping: [.02, .04],
                    fadeOut: .06,
                    color: [1, 1, 1, .3]
                }],
                hydrant1: [{
                    tex: 2,
                    emitterLifeTime: 170,
                    particleLifeTime: 100,
                    scattering: .3,
                    perStep: 20,
                    size: 30,
                    speed: [10, 20],
                    rotSpeed: [-.05, .05],
                    damping: [.04, .04],
                    fadeOut: .1,
                    gravity: [0, .1],
                    color: [.6, .7, .9, 1]
                }],
                planeFire: [{
                    tex: 2,
                    emitterLifeTime: 1,
                    particleLifeTime: 40,
                    scattering: 2,
                    perStep: 3,
                    size: 50,
                    speed: [2, 5],
                    rotSpeed: [-.1, .1],
                    damping: [.05, .07],
                    fadeOut: .1,
                    color: [.1, .1, .1, .5]
                }, {
                    tex: 2,
                    emitterLifeTime: 1,
                    particleLifeTime: 15,
                    scattering: 2,
                    perStep: 5,
                    size: 50,
                    speed: [2, 5],
                    rotSpeed: [-.1, .1],
                    damping: [.05, .07],
                    fadeOut: .15,
                    color: [.6, .1, .1, 1]
                }, {
                    tex: 2,
                    emitterLifeTime: 1,
                    particleLifeTime: 15,
                    scattering: 1,
                    perStep: 2,
                    size: 50,
                    speed: [1, 3],
                    rotSpeed: [-.1, .1],
                    damping: [.05, .07],
                    fadeOut: .2,
                    color: [.8, .8, .1, .5]
                }, i],
                planeSmoke: [i],
                jetpack: [{
                    tex: 3,
                    emitterLifeTime: 1,
                    particleLifeTime: 10,
                    scattering: 0,
                    perStep: 3,
                    size: 40,
                    speed: [10, 20],
                    rotSpeed: [-.02, .02],
                    damping: [.01, .03],
                    fadeOut: .2,
                    color: [.5, .7, 1, .8]
                }, {
                    tex: 3,
                    emitterLifeTime: 1,
                    particleLifeTime: 8,
                    scattering: 0,
                    perStep: 1,
                    size: 30,
                    speed: [10, 15],
                    rotSpeed: [-.02, .02],
                    damping: [.01, .03],
                    fadeOut: .3,
                    color: [1, 1, 1, 1]
                }]
            }
        }, {}],
        51: [function(t, e, i) {
            function n(t, e, i) {
                this.emittedCount = 0, this.step = function(n, r, s, a) {
                    if (i.emitterLifeTime < n) return !1;
                    for (n = ~~(n * i.perStep); this.emittedCount < n;) t.createParticle(e, r, s, a, i), this.emittedCount++;
                    return !0
                }
            }

            function r(t, e, i, r) {
                for (this.a = this.y = this.x = 0, this.emitter = [], this.startTick = r, this.step = function(t) {
                        for (var e = [], i = 0; i < this.emitter.length; i++) this.emitter[i].step(t - this.startTick, this.x, this.y, this.a) || e.push(this.emitter[i]);
                        for (; 0 < e.length;) t = this.emitter.indexOf(e.pop()), this.emitter.splice(t, 1);
                        return 0 < this.emitter.length
                    }, r = 0; r < i.length; r++) {
                    var s = new n(t, e, i[r]);
                    this.emitter.push(s)
                }
            }
            var s = t(50),
                a = t(54),
                o = t(93);
            e.exports = function() {
                function t(t) {
                    return void 0 === t ? 0 : (Array.isArray(t) && (t = t[0] + Math.random() * (t[1] - t[0])), t)
                }
                this.material = null, this.particles = [], this.runningFx = [], this.startTime = Date.now(), this.tick = 0, this.create = function(t, e, i, n, a) {
                    return a = a || 0, (t = new r(this, t, s[e], this.tick)).x = i, t.y = n, t.a = a, this.runningFx.push(t), t
                }, this.createParticle = function(e, i, n, r, s) {
                    null == this.material && (this.material = a.renderer.createMaterial(o)), (e = a.renderer.createSprite(e)).anchor.x = .5, e.anchor.y = .5, e.pos.x = i, e.pos.y = n, e.size.x = s.size, e.size.y = s.size, e.angle = void 0 !== s.initRot ? s.initRot + r : Math.random() * Math.PI * 2, e.material = this.material, e.setTexture(a.texParticles[s.tex]), i = r + t(s.initAngle) + (Math.random() - .5) * s.scattering, n = t(s.speed), n = [Math.cos(i) * n, Math.sin(i) * n], r = [0, 0], void 0 !== s.gravity && (r = s.gravity.slice()), s = {
                        sprite: e,
                        start: this.tick,
                        end: this.tick + s.particleLifeTime,
                        angle: i,
                        speed: n,
                        gravity: r,
                        rotSpeed: t(s.rotSpeed),
                        damping: t(s.damping),
                        fadeOut: t(s.fadeOut),
                        color: s.color.slice()
                    }, this.particles.push(s)
                }, this.step = function() {
                    for (var t = [], e = 0; e < this.runningFx.length; e++) this.runningFx[e].step(this.tick) || t.push(this.runningFx[e]);
                    var i = [];
                    for (e = 0; e < this.particles.length; e++) this.stepParticle(this.particles[e]) || i.push(this.particles[e]);
                    for (; 0 < t.length;) e = this.runningFx.indexOf(t.pop()), this.runningFx.splice(e, 1);
                    for (; 0 < i.length;) e = this.particles.indexOf(i.pop()), this.particles.splice(e, 1)
                }, this.stepParticle = function(t) {
                    return this.tick >= t.end ? (t.sprite && (t.sprite.remove(), t.sprite = null), !1) : (t.sprite.pos.x += t.speed[0], t.sprite.pos.y += t.speed[1], t.sprite.angle += t.rotSpeed, t.speed[0] *= 1 - t.damping, t.speed[1] *= 1 - t.damping, t.speed[0] += t.gravity[0], t.speed[1] += t.gravity[1], t.color[3] *= 1 - t.fadeOut, t.color[3] = Math.min(1, Math.max(t.color[3], 0)), t.sprite.color[0] = t.color[0], t.sprite.color[1] = t.color[1], t.sprite.color[2] = t.color[2], t.sprite.color[3] = t.color[3], !0)
                }, this.update = function() {
                    for (var t = (Date.now() - this.startTime) / 1e3 * 60; this.tick < t;) this.step(), this.tick++
                }
            }
        }, {}],
        52: [function(t, e, i) {
            function n() {
                this.state = 0, this.lastPos = this.lastAngle = null, this.propSprite = r.renderer.createSprite(r.layerPlane), this.propSprite.size.x = 128, this.propSprite.size.y = 128, this.propSprite.anchor.x = .5, this.propSprite.anchor.y = .5, this.propSprite.setTexture(r.texPropeller), this.sprite = r.renderer.createSprite(r.layerPlane), this.sprite.size.x = 512, this.sprite.size.y = 256, this.sprite.anchor.x = .5, this.sprite.anchor.y = .5, this.sprite.setTexture(r.texPlane)
            }
            var r = t(54);
            t(37), n.prototype.setPos = function(t, e, i) {
                this.lastAngle = i, this.lastPos = [t, e], this.propSprite.angle = i, this.sprite.angle = i, this.propSprite.pos.x = t + 252.34 * Math.cos(i + .10322), this.propSprite.pos.y = e + 252.34 * Math.sin(i + .10322), this.sprite.pos.x = t, this.sprite.pos.y = e
            }, n.prototype.setState = function(t) {
                this.state = t
            }, n.prototype.animate = function() {
                var t = Math.floor(Date.now() / 20);
                this.propSprite.size.y = Math.abs(this.propSprite.size.y) * (0 == t % 2 ? -1 : 1), 0 != this.state && r.particles.create(r.layerParticlesBg, 2 == this.state ? "planeFire" : "planeSmoke", this.lastPos[0] + 220 * Math.cos(this.lastAngle + .10322), this.lastPos[1] + 220 * Math.sin(this.lastAngle + .10322), this.lastAngle + Math.PI)
            }, n.prototype.remove = function() {
                this.propSprite.remove(), this.sprite.remove()
            }, e.exports = n
        }, {}],
        53: [function(t, e, i) {
            var n = t(15),
                r = t(36),
                s = t(60);
            e.exports = function(t) {
                this.load = function(e, i, r) {
                    if (r = r || {}, !n[i]) throw Error("Unknown shader " + i);
                    var s, a = "";
                    for (s in r) a = "#define " + s + " " + r[s] + "\r\n";
                    return a += n[i], t.loadShader(e, a)
                }, this.loadFull = function(t, e, i) {
                    return new r(t, e, i)
                }, this.solveFullShader = function(t) {
                    return t.variants.lowGfx && this.useLowGfx() ? t.variants.lowGfx : t.variants.normal
                }, this.useLowGfx = function() {
                    return !!s.get("lowGfx")
                }
            }
        }, {}],
        54: [function(t, e, i) {
            e.exports = new function() {
                this.texBackground = this.texShark = this.texPropeller = this.texPlane = this.texTileGrid = this.texWarn = this.texCup = this.texPole = this.texGibbet = this.texHeart = this.texBaseCommon = this.texWeapons = this.texBaseWeapons = this.texFog = this.texParticles = this.texBaseParticles = this.texSkins = this.texBaseSkins = this.texBullets = this.texBaseBullets = this.texFlags = this.texRope = this.texEyes = this.texBallPath = this.materialCompose = this.materialBlast = this.shaderParticle = this.shaderCompose = this.shaderBlast = this.shaderFlag = this.shaderMap = this.shaderBg = this.shaderBall = this.layerPreview = this.layerMenuParticles = this.layerPostProcBlast = this.layerPostProcWater = this.layerParticlesBg = this.layerPlane = this.layerNicknames = this.layerTileGrid = this.layerParticles = this.layerSharks = this.layerItems = this.layerBallSkins = this.layerBalls = this.layerFlag1 = this.layerFlag0 = this.layerMapTiles = this.layerWeapons = this.layerBullets = this.layerRopes = this.layerJetpacks = this.layerObjects = this.layerBgFx = this.layerBackground = this.scenePreview = this.sceneMenu = this.flowUpdateCb = this.gameUpdateCb = this.particles = this.ui = this.mapGfx = this.shaderHelper = this.camera = this.renderer = null, this.frameCounter = 0, this.reset = function() {}
            }
        }, {}],
        55: [function(t, e, i) {
            t(166), e.exports = function() {
                var t = [],
                    e = !1,
                    i = !1;
                this.add = function(n) {
                    if (e || i) throw Error("Add too late");
                    if (-1 != t.indexOf(n)) throw Error("Duplicate add");
                    t.push(n)
                }, this.done = function(n, r) {
                    function s() {
                        var r = t.indexOf(this);
                        if (-1 == r) throw Error("Unknown item; ", this);
                        t.splice(r, 1), 0 == t.length && (i = !0, e = !1, n())
                    }

                    function a(t) {
                        r && r(this, t)
                    }
                    if (e || i) throw Error("Double loader execute");
                    e = !0;
                    for (var o = 0; o < t.length; o++) {
                        var l = t[o];
                        l instanceof Image ? l.complete ? setTimeout(s.bind(l), 0) : (l.onload = s.bind(l), l.onerror = a.bind(l)) : (l.onLoad(s.bind(l)), l.onError(a.bind(l)))
                    }
                }
            }
        }, {}],
        56: [function(t, e, i) {
            var n = t(37),
                r = t(25),
                s = t(76),
                a = t(24),
                o = t(59),
                l = t(86),
                h = t(27),
                c = t(26),
                u = t(80),
                p = t(79),
                d = t(75),
                f = t(14);
            window.onload = function() {
                if (console.log("%cSTOP", "color: red; font-size: 100px; font-weight: bold;"), console.log("%cDON'T ENTER ANY CODE HERE", "color: #fff; font-size: 30px; font-weight: bold; background-color: #000;"), console.log("%cSOMEONE TRIES TO HACK YOU", "color: #000; font-size: 30px; font-weight: bold;"), console.log("%cHackers are trying to convince you to enter codes here. But this just gives them access to YOUR stuff.", "color: #000; font-size: 20px; font-weight: bold;"), console.log("%cSTOP", "color: red; font-size: 100px; font-weight: bold;"), WebSocket) {
                    new a, l.loadBank("/sfx.ogg?v=" + kugelnVersion, f);
                    var t = window.location.port;
                    s.init(("http:" == window.location.protocol ? "ws://" : "wss://") + window.location.hostname + (t ? ":" + t : "")), s.onState(function(t, e) {
                        e && o.show(2)
                    }), s.onVersionError(function() {
                        r.switchTo("matchError", {
                            code: 101,
                            msg: "Invalid version"
                        }), o.hide()
                    }), p.init(), u.init(), h.init(), c.init(), d.init(), n.init(function() {
                        n.onError(function(t) {
                            r.switchTo("matchError", t)
                        }), r.init(), p.setGameReady()
                    }), o.show(0)
                } else document.body.querySelector(".lowlevelerror").style.display = "block", document.getElementById("game").style.display = "none"
            }
        }, {}],
        57: [function(t, e, i) {
            var n = null,
                r = new function() {
                    function e(t) {
                        switch (t) {
                            case 1:
                                return r.MOUSE_LEFT;
                            case 2:
                                return r.MOUSE_MIDDLE;
                            case 3:
                                return r.MOUSE_RIGHT
                        }
                        return r.MOUSE_UNKNOWN
                    }

                    function i(t) {
                        a(t.target) || (t = window.event || t, d += Math.max(-1, Math.min(1, t.wheelDelta || -t.detail)), o(t.target, "nativeScroll") && 1 != t.ctrlKey || t.preventDefault())
                    }

                    function s(t) {
                        return o(t, "nativeInput")
                    }

                    function a(t) {
                        return o(t, "blockGameInput")
                    }

                    function o(t, e) {
                        for (; t && t != document;) {
                            if (!t.classList) throw Error("Classlist not set " + t.constructor.name);
                            if (t.classList.contains(e)) return !0;
                            t = t.parentElement
                        }
                        return !1
                    }
                    var l = {},
                        h = {},
                        c = [],
                        u = [],
                        p = [],
                        d = 0;
                    this.MOUSE_UNKNOWN = -1024, this.MOUSE_LEFT = -1025, this.MOUSE_MIDDLE = -1026, this.MOUSE_RIGHT = -1027, this.isDown = function(t) {
                        return void 0 !== l[t] && l[t]
                    }, this.isHit = function(t) {
                        return !(void 0 === h[t] || !h[t] || (h[t] = !1, 0))
                    }, this.addPreventDefault = function(t) {
                        -1 == p.indexOf(t) && p.push(t)
                    }, this.getMousePos = function() {
                        return c
                    }, this.getAbsoluteMousePos = function() {
                        return u
                    }, this.getScrollDelta = function() {
                        var t = d;
                        return d = 0, t
                    }, document.addEventListener("keydown", function(t) {
                        window.typing || (16 === t.which && (window.zoom != window.ultrazoom && (window.zoomback = window.zoom), window.zoom = window.ultrazoom), 104 == t.which ? window.yOffset -= window.cameraSpeed : 98 == t.which ? window.yOffset += window.cameraSpeed : 100 == t.which ? window.xOffset -= window.cameraSpeed : 102 == t.which ? window.xOffset += window.cameraSpeed : 101 == t.which ? (window.xOffset = 0, window.yOffset = 0) : 103 == t.which ? (window.xOffset -= window.cameraSpeed, window.yOffset -= window.cameraSpeed) : 105 == t.which ? (window.xOffset += window.cameraSpeed, window.yOffset -= window.cameraSpeed) : 97 == t.which ? (window.xOffset -= window.cameraSpeed, window.yOffset += window.cameraSpeed) : 99 == t.which && (window.xOffset += window.cameraSpeed, window.yOffset += window.cameraSpeed)), a(t.target) || (s(t.target) || -1 != p.indexOf(t.which) && t.preventDefault(), l[t.which] || (h[t.which] = !0), l[t.which] = !0)
                    }, !1), document.addEventListener("keyup", function(t) {
                        return window.typing || 16 === t.which && (window.zoom = window.zoomback), s(t.target) || -1 != p.indexOf(t.which) && t.preventDefault(), l[t.which] = !1
                    }, !1), document.addEventListener("mousedown", function(t) {
                        a(t.target) || (s(t.target) || t.preventDefault(), t = e(t.which), l[t] || (h[t] = !0), l[t] = !0)
                    }, !1), document.addEventListener("mouseup", function(t) {
                        s(t.target) || t.preventDefault(), t = e(t.which), l[t] = !1
                    }, !1), document.addEventListener("mousemove", function(e) {
                        n || (n = t(37));
                        var i = n;
                        c = [(e.clientX - i.width / 2) / i.height, (e.clientY - i.height / 2) / i.height], u = [e.clientX, e.clientY]
                    }, !1), document.addEventListener("DOMMouseScroll", i, !1), document.addEventListener("mousewheel", i, !1), document.addEventListener("contextmenu", function(t) {
                        t.preventDefault()
                    }, !1)
                };
            e.exports = r
        }, {}],
        58: [function(t, e, i) {
            t(54);
            var n = t(131);
            e.exports = new function() {
                this.messages = ['Press and hold <span class="key">A</span> or <span class="key">D</span> to walk', 'Press <span class="key">SPACE</span> to jump', '<div class="mouse"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><g transform="translate(0 -988.362)"><path d="M29 999.4l.02 29.06-19.17.04c-.35-12.56 6.3-28.56 19.15-29.1z" fill="#fff" fill-rule="evenodd"/><rect width="54.67" height="114.27" x="5.72" y="994.05" ry="31.39" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.4 1032.18h54.35" fill="none" stroke="#fff" stroke-width="3.2"/><path d="M32.14 994.33l.08 37.46" fill="none" stroke="#fff" stroke-width="2"/></g></svg></div> <div class="mouseTxt">left mouse button to shoot</div>', '<div class="mouse"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><g transform="translate(0 -988.362)"><path d="M35.86 999.4l-.02 29.06 19.17.04c.37-12.56-6.3-28.56-19.13-29.1z" fill="#fff" fill-rule="evenodd"/><rect width="54.67" height="114.27" x="5.72" y="994.05" ry="31.39" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.4 1032.18h54.35" fill="none" stroke="#fff" stroke-width="3.2"/><path d="M32.14 994.33l.08 37.46" fill="none" stroke="#fff" stroke-width="2"/></g></svg></div> <div class="mouseTxt">right mouse button to use rope</div>', '<div class="mouse"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><g transform="translate(0 -988.362)"><rect width="54.67" height="114.27" x="5.72" y="1000.05" ry="31.39" fill="none" stroke="#7b7b7b" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.4 1038.18h54.35" fill="none" stroke="#7b7b7b" stroke-width="3.2"/><path d="M32.14 1000.33l.08 37.46" fill="#b2b2b2" fill-rule="evenodd" stroke="#7b7b7b" stroke-width="2"/><rect width="8" height="22" x="28" y="1008.36" ry="3.67" fill="#f9f9f9" fill-rule="evenodd"/><path d="M32 988.36l6 7 6 7H20l6-7zm0 60l6-7 6-7H20l6 7z" fill="red" fill-rule="evenodd"/></g></svg></div> <div class="mouseTxt">Use scroll wheel to change weapon</div>'], this.active = [], this.visible = !1;
                for (var t = 0; t < this.messages.length; t++) this.active.push(!0);
                this.set = function(t) {
                    this.active[t] = !1, this.show(this.visible)
                }, this.show = function(t) {}, this.getFirstActive = function() {
                    if (n.getArg("mc")) return null;
                    for (var t = 0; t < this.active.length; t++)
                        if (this.active[t]) return t;
                    return null
                }
            }
        }, {}],
        59: [function(t, e, i) {
            var n = t(54);
            e.exports = new function() {
                this.show = function(t, e) {
                    var i = null;
                    switch (t) {
                        case 0:
                            i = n.ui.loading0Widget;
                            break;
                        case 1:
                            i = n.ui.loading1Widget;
                            break;
                        case 2:
                            i = n.ui.maintenanceWidget
                    }
                    i.setData && i.setData(e), i.setActive(!0)
                }, this.hide = function() {
                    n.ui.loading0Widget.setActive(!1), n.ui.loading1Widget.setActive(!1), n.ui.maintenanceWidget.setActive(!1)
                }
            }
        }, {}],
        60: [function(t, e, i) {
            e.exports = new function() {
                var t = {};
                this.set = function(e, i) {
                        if (t[e] = i, "undefined" != typeof Storage) try {
                            localStorage.setItem("localSettings", JSON.stringify(t))
                        } catch (t) {}
                    }, this.get = function(e) {
                        return t[e] ? t[e] : null
                    },
                    function() {
                        if ("undefined" != typeof Storage) {
                            var e = localStorage.getItem("localSettings");
                            try {
                                null == (t = JSON.parse(e)) && (t = {})
                            } catch (e) {
                                localStorage.removeItem("localSettings"), t = {}
                            }
                        }
                    }()
            }
        }, {}],
        61: [function(t, e, i) {
            (function(t) {
                if (!t.browser) throw Error("Used logging system on wrong environment");
                e.exports.info = function() {
                    console.log("INFO", arguments)
                }, e.exports.error = function() {
                    console.log("ERROR", arguments)
                }, e.exports.warn = function() {
                    console.log("WARN", arguments)
                }, e.exports.panicWithStack = function(t) {
                    console.log("PANIC", arguments), console.log(Error().stack)
                }, e.exports.printErrorStack = function(t) {
                    console.log(Error().stack)
                }
            }).call(this, t(7))
        }, {}],
        62: [function(t, e, i) {
            function n() {
                this.manager = null
            }
            n.prototype.initBase = function(t) {
                this.manager = t, this.init()
            }, n.prototype.init = function() {}, n.prototype.join = function(t) {}, n.prototype.update = function() {}, n.prototype.leave = function() {}, n.prototype.switchTo = function(t, e) {
                this.manager.switchTo(t, e)
            }, n.prototype.goToUrl = function(t) {
                this.manager.goToUrl(t)
            }, e.exports = n
        }, {}],
        63: [function(t, e, i) {
            function n() {
                this.innerMain = this.current = this.handlerOnResize = this.onLoadedHandler = this.resizeListener = this.queuedLoadRequest = this.manager = null
            }
            i = t(62);
            var r = t(76),
                s = t(54);
            n.prototype = Object.create(i.prototype), n.prototype.needScrollbar = function() {
                return !0
            }, n.prototype.needFullHeight = function() {
                return !1
            }, n.prototype.loadClassic = function(t, e, i) {
                var n = this;
                this.current = this.queuedLoadRequest = {
                    type: t,
                    args: e
                }, this.onLoadedHandler = i, s.ui.classicWidget.setActive(!0), this.resizeListener && window.removeEventListener("resize", this.resizeListener), this.resizeListener = window.addEventListener("resize", function() {
                    n.handlerOnResize && n.handlerOnResize()
                })
            }, n.prototype.leaveClassic = function() {
                window.removeEventListener("resize", this.resizeListener), this.resizeListener = null, s.ui.classicWidget.setActive(!1)
            }, n.prototype.onResize = function(t) {
                this.handlerOnResize = t
            }, n.prototype.update = function() {
                var t = this;
                this.queuedLoadRequest && r.getState() && (r.loadClassicPage(function(e) {
                    t.onLoadResult(e)
                }, this.queuedLoadRequest), this.queuedLoadRequest = null)
            }, n.prototype.onLoadResult = function(t) {
                var e = this;
                s.ui.classicWidget.setClassicPage(t, this.needScrollbar(), this.needFullHeight()), this.innerMain = s.ui.classicWidget.mainElement.querySelector(".main"), this.innerMain.classList.add("page_" + this.current.type), this.innerMain.querySelector("button.play").onclick = function() {
                    e.manager.goToUrl("/")
                }, this.innerMain.querySelector("img.logo").onclick = function() {
                    e.manager.goToUrl("/")
                }, this.onLoadedHandler()
            }, e.exports = n
        }, {}],
        64: [function(t, e, i) {
            var n = t(59),
                r = t(76),
                s = t(54),
                a = t(60);
            e.exports = new function() {
                var e = null,
                    i = null,
                    o = null,
                    l = "",
                    h = null,
                    c = null,
                    u = !1,
                    p = null,
                    d = !1;
                this.init = function() {
                    this.register("title", t(74)), this.register("settings", t(73)), this.register("ballselect", t(66)), this.register("advancedmatch", t(65)), this.register("register", t(71)), this.register("profile", t(70)), this.register("friendrequests", t(67)), this.register("messages", t(69)), this.register("highscore", t(68)), this.register("search", t(72));
                    for (var e = 0; e < this.pages.length; e++) this.pages[e].page.initBase(this)
                }, this.getByName = function(t) {
                    for (var e = 0; e < this.pages.length; e++)
                        if (this.pages[e].name == t) return this.pages[e].page;
                    return null
                }, this.setInitialPage = function(t, e) {
                    c = {
                        page: t,
                        args: e
                    }, this.updateInit()
                }, this.updateInit = function() {
                    !u && c && d && (u = !0, p && "" == p.name ? this.switchTo("register") : this.switchTo(c.page, c.args))
                }, this.isInited = function() {
                    return u
                }, this.switchTo = function(t, e) {
                    if (this.current && this.current.leave(), !(t = this.getByName(t))) throw Error("Invalid mainpage");
                    this.current = t, this.current.join(e)
                }, this.goToUrl = function(t, e) {
                    i(t, e)
                }, this.startGame = function() {
                    n.show(1, {
                        region: this.gameRequest.region || this.gameRequest.matchId
                    }), this.current && this.current.leave(), a.set("nick", this.gameRequest.nickname), this.gameRequestInterval && (clearInterval(this.gameRequestInterval), this.gameRequestInterval = null), e(this.gameRequest)
                }, this.isGameStartable = function() {
                    return !!(this.gameRequest && this.gameRequest.region && this.gameRequest.customization && r.getState())
                }, this.updateGameStart = function() {
                    this.isGameStartable() && this.startGame()
                }, this.requestStartGame = function(t) {
                    var e = this;
                    this.gameRequest = {
                        nickname: l,
                        region: h,
                        customization: o,
                        privateType: t.privateType,
                        matchId: t.matchId,
                        map: t.map ? t.map.name : "",
                        gameMode: t.gameMode ? t.gameMode.key : ""
                    }, this.gameRequestInterval = setInterval(function() {
                        e.updateGameStart()
                    }, 100), this.updateGameStart()
                }, this.setOnJoinGame = function(t) {
                    e = t
                }, this.setOnGoToUrl = function(t) {
                    i = t
                }, this.onRegionUpdate = function(t) {
                    this.gameRequest && null == this.gameRequest.region && (this.gameRequest.region = t, this.updateGameStart()), h = t
                }, this.setCustomization = function(t) {
                    o = t, this.gameRequest && !this.gameRequest.customization && (this.gameRequest.customization = t)
                }, this.setNickname = function(t) {
                    l = t, this.gameRequest && !this.gameRequest.nickname && (this.gameRequest.nickname = t)
                }, this.setAuth = function(t, e) {
                    p = t, d = !0, s.ui.sidebarWidget.setAuth(t, e), s.ui.titleWidget.setAuth(t), s.ui.ballSelectWidget.setAuth(t), s.ui.registerWidget.setAuth(t), this.updateInit()
                }, this.update = function() {
                    this.current && this.current.update()
                }, this.pages = [], this.current = null, this.register = function(t, e) {
                    this.pages.push({
                        name: t,
                        type: e,
                        page: new e
                    })
                }, this.init()
            }
        }, {}],
        65: [function(t, e, i) {
            function n() {}
            i = t(62);
            var r = t(54);
            n.prototype = Object.create(i.prototype), n.prototype.init = function() {}, n.prototype.join = function(t) {
                r.ui.matchSelectionWidget.setActive(!0), r.ui.matchSelectionWidget.setCallbacks({
                    onClose: t.onClose,
                    onPlay: t.onPlay
                })
            }, n.prototype.leave = function() {
                r.ui.matchSelectionWidget.setActive(!1)
            }, e.exports = n
        }, {}],
        66: [function(t, e, i) {
            function n() {}
            i = t(62);
            var r = t(54);
            n.prototype = Object.create(i.prototype), n.prototype.init = function() {
                this.initialArgs = null
            }, n.prototype.join = function(t) {
                var e = this;
                r.ui.ballSelectWidget.initIfNecessary(), r.ui.ballSelectWidget.setActive(!0), r.ui.ballSelectWidget.setBall(t.selectedBall.clone()), r.ui.ballSelectWidget.setCallbacks({
                    onDone: function(t) {
                        e.switchTo("title", t)
                    }
                })
            }, n.prototype.leave = function() {
                r.ui.ballSelectWidget.setActive(!1)
            }, e.exports = n
        }, {}],
        67: [function(t, e, i) {
            function n() {}
            i = t(63), t(54);
            var r = t(80);
            n.prototype = Object.create(i.prototype), n.prototype.join = function(t) {
                var e = this;
                this.loadClassic("friendrequests", {}, function() {
                    r.updateDetails(e.innerMain)
                })
            }, n.prototype.leave = function() {
                this.leaveClassic()
            }, e.exports = n
        }, {}],
        68: [function(t, e, i) {
            function n() {}
            i = t(63), t(54);
            var r = t(80);
            n.prototype = Object.create(i.prototype), n.prototype.join = function(t) {
                var e = this;
                this.loadClassic("highscore", {}, function() {
                    r.updateDetails(e.innerMain)
                })
            }, n.prototype.leave = function() {
                this.leaveClassic()
            }, e.exports = n
        }, {}],
        69: [function(t, e, i) {
            function n() {
                this.resizeListener = this.openedConversation = this.conversationList = null
            }
            i = t(63), t(54);
            var r = t(20),
                s = t(80),
                a = t(76);
            n.prototype = Object.create(i.prototype), n.prototype.needScrollbar = function() {
                return !1
            }, n.prototype.needFullHeight = function() {
                return !0
            }, n.prototype.join = function(t) {
                var e = this;
                this.onResize(function() {
                    e.updateSizing()
                }), r.setActive(!0), r.loadConversations(0, 30), r.onConversationListUpdate(function() {
                    e.conversationList = r.getConversationList(), e.updateConversationList()
                }), this.loadClassic("messages", {}, function() {
                    e.conversationList = r.getConversationList(), e.updateConversationList(), e.initTextbox(e.onWriteNewMessage.bind(e));
                    var t = r.getCurrentMessages();
                    t && e.setMessages(r.getCurrentConversationName(), t)
                }), r.onConversationLoad(function(t) {
                    e.innerMain && e.setMessages(t.name, t.list)
                }), r.onAddMessage(function(t, i) {
                    e.innerMain && e.addMessage(t, i)
                }), t.to && r.switchToConversation(t.to)
            }, n.prototype.leave = function() {
                this.leaveClassic(), r.setActive(!1)
            }, n.prototype.onWriteNewMessage = function(t) {
                r.sendMessageToCurrentConversation(t)
            }, n.prototype.scrollDown = function() {
                var t = this.innerMain.querySelector(".sectionContent"),
                    e = t.querySelector(".msgArea");
                t = t.querySelector(".msgAreaScroll"), e.scrollTop = t.offsetHeight - e.offsetHeight
            }, n.prototype.setFocus = function() {
                this.innerMain.querySelector("textarea").focus()
            }, n.prototype.setMessages = function(t, e) {
                function i() {
                    n.goToUrl("/profile/" + t)
                }
                var n = this,
                    r = this.innerMain.querySelector(".sectionContent .header");
                r.querySelector(".name").textContent = t, r.querySelector(".name").onclick = i, r.querySelector(".profileButton").onclick = i, r.querySelector("canvas.playerDetail").dataset.player = t, s.updateDetails(r), (r = this.innerMain.querySelector(".msgAreaScroll")).innerHTML = "";
                for (var a = 0; a < e.length; a++) this.addMessageDOM(r, t, e[a]);
                this.setEmptyConversationHint(0 == e.length), this.updateSizing(), this.scrollDown(), this.setFocus()
            }, n.prototype.addMessageDOM = function(t, e, i) {
                var n = document.createElement("div"),
                    r = document.createElement("div"),
                    s = document.createElement("div"),
                    o = document.createElement("div");
                t.appendChild(n), n.appendChild(r), n.appendChild(s), n.appendChild(o), n.classList.add("msg"), r.classList.add("name"), s.classList.add("time"), o.classList.add("text"), r.textContent = i.incoming ? e : a.getAuth().name, s.textContent = i.time, o.textContent = i.text
            }, n.prototype.addMessage = function(t, e) {
                var i = this.innerMain.querySelector(".msgAreaScroll");
                this.addMessageDOM(i, t, e), this.scrollDown(), this.setEmptyConversationHint(!1)
            }, n.prototype.setEmptyConversationHint = function(t) {
                this.innerMain.querySelector(".msgEmpty").style.display = t ? "block" : "none", this.innerMain.querySelector(".msgAreaScroll").style.display = t ? "none" : "block"
            }, n.prototype.updateConversationList = function() {
                if (null != this.conversationList && this.innerMain) {
                    var t = r.getCurrentConversationName(),
                        e = this.innerMain.querySelector(".sectionOverview");
                    e.innerHTML = "";
                    for (var i = 0; i < this.conversationList.length; i++) {
                        var n = this.conversationList[i],
                            a = document.createElement("div"),
                            o = document.createElement("canvas"),
                            l = document.createElement("div"),
                            h = document.createElement("div"),
                            c = document.createElement("div");
                        e.appendChild(a), a.appendChild(l), a.appendChild(o), a.appendChild(h), a.appendChild(c), a.classList.add("item"), l.classList.add("name"), o.classList.add("playerDetail"), h.classList.add("lastMsg"), c.classList.add("time"), o.setAttribute("width", 64), o.setAttribute("height", 64), o.dataset.type = "avatar", o.dataset.player = n.name, n.name == t && a.classList.add("selected"), n.seen || a.classList.add("unseen"), l.textContent = n.name, h.textContent = n.lastMsg, c.textContent = n.time, a.onclick = function() {
                            r.switchToConversation(this)
                        }.bind(n.name)
                    }
                    this.updateNoMessages(), s.updateDetails(this.innerMain)
                }
            }, n.prototype.updateNoMessages = function() {
                var t = !0;
                this.conversationList && 0 != this.conversationList.length || (t = !1), this.innerMain.querySelector(".msgBox").style.display = t ? "block" : "none", this.innerMain.querySelector(".noMessages").style.display = t ? "none" : "block", this.updateTextbox && this.updateTextbox()
            }, n.prototype.initTextbox = function(t) {
                function e() {
                    setTimeout(function() {
                        r.textContent = n.value + " ";
                        var t = r.getBoundingClientRect().height;
                        n.style.height = t + "px", i.updateSizing()
                    }, 0)
                }
                var i = this,
                    n = this.innerMain.querySelector("textarea"),
                    r = this.innerMain.querySelector("div.measureBox");
                n.addEventListener("keydown", function(i) {
                    13 == i.which && setTimeout(function() {
                        var e = n.value.trim();
                        n.value = "", "" != e && t(e)
                    }, 0), e(), 13 == i.which && i.preventDefault()
                }), n.addEventListener("paste", function() {
                    e()
                }), n.addEventListener("change", function() {
                    e()
                }), e(), this.updateTextbox = e
            }, n.prototype.updateSizing = function() {
                var t = this.innerMain.querySelector(".sectionContent"),
                    e = t.querySelector(".header"),
                    i = t.querySelector(".msgArea"),
                    n = t.querySelector(".msgInput");
                i.style.height = t.offsetHeight - e.offsetHeight - n.offsetHeight + "px"
            }, e.exports = n
        }, {}],
        70: [function(t, e, i) {
            function n() {}
            i = t(63), t(54);
            var r = t(80);
            n.prototype = Object.create(i.prototype), n.prototype.join = function(t) {
                var e = this;
                this.loadClassic("profile", {
                    profile: t.profile
                }, function() {
                    var t = e.innerMain.querySelector(".playerProgress");
                    t.querySelector(".inner").style.width = t.dataset.percent + "%", r.updateDetails(e.innerMain)
                })
            }, n.prototype.leave = function() {
                this.leaveClassic()
            }, e.exports = n
        }, {}],
        71: [function(t, e, i) {
            function n() {}
            i = t(62);
            var r = t(54);
            n.prototype = Object.create(i.prototype), n.prototype.init = function() {}, n.prototype.join = function() {
                r.ui.sidebarWidget.setActive(!1), r.ui.registerWidget.setActive(!0), r.ui.registerWidget.setFocus()
            }, n.prototype.leave = function() {
                throw Error("RegisterPage is final")
            }, e.exports = n
        }, {}],
        72: [function(t, e, i) {
            function n() {
                this.handlerRegistered = !1, this.currentTerm = null
            }
            i = t(63), t(54);
            var r = t(80),
                s = t(76);
            n.prototype = Object.create(i.prototype), n.prototype.join = function() {
                var t = this;
                this.loadClassic("search", {}, function() {
                    this.innerMain.querySelector("input").focus(), this.innerMain.querySelector("input").onkeypress = function(e) {
                        13 == e.which && t.doSearch()
                    }, r.updateDetails(t.innerMain)
                }), this.handlerRegistered || (s.onSocialMessage("searchPlayerResult", function(e) {
                    if (e.term == t.currentTerm) {
                        e = e.list;
                        var i = t.innerMain.querySelector("input");
                        i.disabled = !1, i.focus(), t.setList(e)
                    }
                }), this.handlerRegistered = !0)
            }, n.prototype.doSearch = function() {
                var t = this.innerMain.querySelector("input"),
                    e = t.value.trim();
                t.disabled = !0, this.currentTerm = e, s.socialMessage("searchPlayer", {
                    term: e
                })
            }, n.prototype.setList = function(t) {
                var e = this,
                    i = this.innerMain.querySelector(".list");
                this.innerMain.querySelector(".noResult").style.display = 0 < t.length ? "none" : "block", i.innerHTML = "";
                for (var n = 0; n < t.length; n++) {
                    var s = t[n],
                        a = document.createElement("div"),
                        o = document.createElement("canvas"),
                        l = document.createElement("div");
                    i.appendChild(a), a.appendChild(o), a.appendChild(l), a.classList.add("item"), l.classList.add("name"), o.classList.add("playerDetail"), l.textContent = s, o.setAttribute("width", 64), o.setAttribute("height", 64), o.dataset.type = "avatar", o.dataset.player = s, a.onclick = function() {
                        e.goToUrl("/profile/" + s)
                    }
                }
                r.updateDetails(this.innerMain)
            }, n.prototype.leave = function() {}, e.exports = n
        }, {}],
        73: [function(t, e, i) {
            function n() {}
            i = t(62);
            var r = t(54);
            n.prototype = Object.create(i.prototype), n.prototype.init = function() {}, n.prototype.join = function() {
                var t = this;
                r.ui.settingsWidget.setActive(!0), r.ui.settingsWidget.setCallbacks({
                    onClose: function() {
                        t.switchTo("title")
                    }
                })
            }, n.prototype.leave = function() {
                r.ui.settingsWidget.setActive(!1)
            }, e.exports = n
        }, {}],
        74: [function(t, e, i) {
            function n() {}
            i = t(62);
            var r = t(54),
                s = t(60),
                a = t(95),
                o = t(127),
                l = t(131);
            n.prototype = Object.create(i.prototype), n.prototype.init = function() {
                this.args = {}, this.args.selectedBall = this.loadUserDefaultCustomization(), this.args.nickname = ""
            }, n.prototype.join = function(t) {
                var e = this;
                this.args = l.merge(this.args, t), r.ui.titleWidget.setCallbacks({
                    onNicknameChange: function(t) {
                        e.manager.setNickname(t)
                    },
                    onSettings: function() {
                        e.switchTo("settings")
                    },
                    onCustomize: function() {
                        e.switchTo("ballselect", {
                            selectedBall: e.args.selectedBall
                        })
                    },
                    onCustomMatch: function() {
                        e.switchTo("advancedmatch", {
                            onClose: function() {
                                e.switchTo("title")
                            },
                            onPlay: function(t) {
                                e.manager.setCustomization(e.args.selectedBall), e.manager.requestStartGame({
                                    privateType: t.privateType,
                                    gameMode: t.gameType,
                                    map: t.map
                                })
                            }
                        })
                    },
                    onPlay: function() {
                        var t = {
                            privateType: 0,
                            map: null,
                            gameMode: null
                        };
                        null != e.args.startMatchId && (t.privateType = 2, t.matchId = e.args.startMatchId), e.manager.setCustomization(e.args.selectedBall), e.manager.requestStartGame(t)
                    },
                    onGoToProfile: function(t) {
                        e.goToUrl("/profile/" + t)
                    },
                    onGoToHighscore: function() {
                        e.goToUrl("/highscore")
                    }
                }), r.ui.titleWidget.setActive(!0), r.ui.titleWidget.setBall(this.args.selectedBall), r.ui.titleWidget.setFocus(), r.ui.titleWidget.setLiteMode(!!this.args.startMatchId), r.ui.titleWidget.setLiteModeMatchId(this.args.startMatchId), r.ui.titleWidget.initAdbHint(), r.ui.setAd("300", !0), r.ui.setAd("728", 1268 < a.width)
            }, n.prototype.leave = function() {
                r.ui.titleWidget.setActive(!1), r.ui.setAd("300", !1), r.ui.setAd("728", !1)
            }, n.prototype.loadUserDefaultCustomization = function() {
                var t = s.get("customization"),
                    e = new o;
                return t && (e.ball = t.ball || "pl", e.skinHat = ~~(t.skinHat || 0), e.skinGlasses = ~~(t.skinGlasses || 0)), e
            }, e.exports = n
        }, {}],
        75: [function(t, e, i) {
            function n(e) {
                e = this.dataset.player, s || (s = t(25)), s.goToUrl("/messages", !0, {
                    to: e
                })
            }
            t(54);
            var r = t(76),
                s = null;
            e.exports = {
                init: function() {},
                updateButtons: function(t) {
                    t = t.querySelectorAll(".messageButton");
                    for (var e = 0; e < t.length; e++) {
                        var i = t[e],
                            s = i,
                            a = i.dataset.player,
                            o = r.getAuth();
                        s.innerHTML = o && o.name == a ? "" : '<div class="button"><span class="uiIcon messageWhite"></span>Send message</div>', i.onclick = n.bind(i)
                    }
                }
            }
        }, {}],
        76: [function(t, e, i) {
            var n = t(22),
                r = t(136);
            e.exports = new function() {
                var t = this,
                    e = null,
                    i = null,
                    s = !1,
                    a = !1,
                    o = null,
                    l = !1,
                    h = null,
                    c = null,
                    u = null,
                    p = null,
                    d = null,
                    f = null,
                    m = null,
                    g = null,
                    v = null,
                    y = !1,
                    x = null,
                    b = !1,
                    w = {};
                this.init = function(t) {
                    if (l) return !1;
                    e = new n(i = t), this.initHandlers(), (t = e.packet(r.Messages.GEN_HANDSHAKE)).u32(3203381794), t.u32(~~(4294967296 * Math.random())), t.u32(r.Meta.Version), t.str(kugelnVersion), t.send()
                }, this.initHandlers = function() {
                    e.onError(function(e) {
                        t.restart()
                    }), e.on(r.Messages.GEN_HANDSHAKE, function() {
                        var e = this.u32();
                        this.u32();
                        var i = this.u32();
                        3203381794 == e ? i != r.Meta.Version && t.restart() : t.restart()
                    }), e.on(r.Messages.GEN_ERROR, function() {
                        var t = this.u16(),
                            e = this.str();
                        d && (d({
                            code: t,
                            msg: e
                        }), d = null), 101 == t && p && p()
                    }), e.on(r.Messages.STC_MAINTENANCE, function() {
                        t.setState(!1, !0)
                    }), e.on(r.Messages.STC_GTW_DATA, function() {
                        for (var t = this.u8(), e = [], i = 0; i < t; i++) {
                            var n = this.str(),
                                r = this.str();
                            e.push({
                                name: n,
                                label: r
                            })
                        }
                        this.str(), t = this.str(), c && c(e, t)
                    }), e.on(r.Messages.STC_MM_MATCHED, function() {
                        var t = this.str(),
                            e = this.str(),
                            i = this.str(),
                            n = this.str(),
                            r = this.str();
                        y = !0, d && (d(null, {
                            match: t,
                            server: e,
                            serverName: i,
                            sessionId: n,
                            ticket: r
                        }), d = null)
                    }), e.on(r.Messages.STC_AUTHED, function() {
                        var e = this.u8(),
                            i = null;
                        if (t.setState(!0), 1 == e) {
                            (i = {
                                provider: null,
                                id: null,
                                avatar: null,
                                name: null,
                                realName: null
                            }).provider = this.str(), i.id = this.str(), i.avatar = this.str(), i.name = this.str(), i.realName = this.str(), i.xp = this.u32(), i.achievements = [], e = this.u16();
                            for (var n = 0; n < e; n++) i.achievements.push(this.u16())
                        }
                        o = i, a = !0, u && u(i)
                    }), e.on(r.Messages.STC_REGISTER, function() {
                        f && f(this.u8())
                    }), e.on(r.Messages.STC_CLASSIC_LOAD, function() {
                        m && m(this.str())
                    }), e.on(r.Messages.STC_SOCIAL_MESSAGE, function() {
                        var t = this.str(),
                            e = this.str(),
                            i = null;
                        try {
                            i = JSON.parse(e)
                        } catch (t) {}
                        if (i && w[t])
                            for (t = w[t], e = 0; e < t.length; e++) t[e](i)
                    }), e.on(r.Messages.STC_HIGHSCORE_OVERVIEW, function() {
                        var t = this.str(),
                            e = null;
                        try {
                            e = JSON.parse(t)
                        } catch (t) {}
                        e && (x = e, g && g(e))
                    }), e.on(r.Messages.STC_USER_DETAILS, function() {
                        var t = this.str(),
                            e = null;
                        try {
                            e = JSON.parse(t)
                        } catch (t) {}
                        e && v && v(e)
                    })
                }, this.deactivate = function() {
                    l || (l = !0, t.setState(!1), e.close(), e = null)
                }, this.setState = function(t, e) {
                    s = t, l || e && (l = !0), h && h(s, e)
                }, this.getState = function() {
                    return s
                }, this.hasAuth = function() {
                    return a
                }, this.getAuth = function() {
                    return o
                }, this.getHighscore = function() {
                    return x
                }, this.isUserLoggedIn = function() {
                    return !!a && !!o
                }, this.onState = function(t) {
                    h = t
                }, this.onRegionUpdate = function(t) {
                    c = t
                }, this.onAuth = function(t) {
                    u = t
                }, this.onVersionError = function(t) {
                    p = t
                }, this.onSocialMessage = function(t, e) {
                    w[t] || (w[t] = []), w[t].push(e)
                }, this.onHighscore = function(t) {
                    g = t
                }, this.onUserDetail = function(t) {
                    v = t
                }, this.logout = function() {
                    e.packet(r.Messages.CTS_LOGOUT).send(), setTimeout(function() {
                        location.href = "/"
                    }, 2e3)
                }, this.sendRequestMatch = function(t, i) {
                    d = t, b ? console.log("MM request already sent") : (b = !0, t = e.packet(r.Messages.CTS_MM_REQUESTMATCH), i.matchId ? (t.u8(2), t.str(i.matchId)) : (t.u8(i.privateType), t.str(i.region), t.str(i.map), t.str(i.gameMode)), t.send(), setTimeout(function() {
                        !y && d && (d({
                            code: 308,
                            msg: "Match making failed"
                        }), d = null, e && (e.close(), e = null))
                    }, 5e3))
                }, this.sendRegister = function(t, i) {
                    f = t, (t = e.packet(r.Messages.CTS_REGISTER)).str(i.nick), t.send()
                }, this.sendUserDetailRequest = function(t) {
                    var i = e.packet(r.Messages.CTS_USER_DETAILS);
                    i.str(t), i.send()
                }, this.loadClassicPage = function(t, i) {
                    m = t, (t = e.packet(r.Messages.CTS_CLASSIC_LOAD)).str(JSON.stringify(i)), t.send()
                }, this.socialMessage = function(t, i) {
                    var n = e.packet(r.Messages.CTS_SOCIAL_MESSAGE);
                    n.str(t), n.str(JSON.stringify(i)), n.send()
                }, this.restart = function() {
                    this.setState(!1), e.close(), e = null, setTimeout(function() {
                        null == e && t.init(i)
                    }, 500 + 1e3 * Math.random())
                }
            }
        }, {}],
        77: [function(t, e, i) {
            e.exports = function(t) {
                this.currentModal = null, this.queue = [], this.confirm = function(t, e) {
                    this.queue.push({
                        text: t,
                        buttons: [{
                            text: "Yes",
                            class: "btn1",
                            result: !0
                        }, {
                            text: "No",
                            class: "btn2",
                            result: !1
                        }],
                        onResult: e
                    }), this.processQueue()
                }, this.onButton = function(e) {
                    t.modalWidget.setActive(!1);
                    var i = this.currentModal;
                    this.currentModal = null, i.onResult(e)
                }, this.processQueue = function() {
                    var e = this;
                    null == this.currentModal && 0 < this.queue.length && (this.currentModal = this.queue.shift(), t.modalWidget.show(this.currentModal, function(t) {
                        e.onButton(t)
                    }))
                }
            }
        }, {}],
        78: [function(t, e, i) {
            var n = t(127);
            e.exports = function(t) {
                this.pid = t, this.team = 0, this.nick = null, this.customization = new n, this.announcedInChat = !1, this.statsScore = this.statsDeath = this.statsKills = 0, this.character = null, this.resetStats = function() {
                    this.statsScore = this.statsDeath = this.statsKills = 0
                }
            }
        }, {}],
        79: [function(t, e, i) {
            var n = t(76);
            t(131);
            var r = t(127),
                s = t(47),
                a = t(38);
            e.exports = new function() {
                function t(t) {
                    for (var e = 0; e < o.length; e++)
                        if (o[e].name == t) return o[e];
                    return null
                }

                function e(t) {
                    return i(), t = {
                        name: t,
                        update: Date.now(),
                        data: null,
                        listener: [],
                        avatars: []
                    }, o.push(t), t
                }

                function i() {
                    for (var t = Date.now(), e = [], i = 0; i < o.length; i++) {
                        var n = o[i];
                        (65 < (t - n.update) / 1e3 || 5e3 < i) && e.push(n)
                    }
                    for (; 0 < e.length;) {
                        if (-1 == (t = o.indexOf(e.pop()))) {
                            log.error("Cannot find player in cache to clean");
                            break
                        }
                        o.splice(t, 1)
                    }
                }
                var o = [],
                    l = [],
                    h = !1,
                    c = [];
                this.get = function(r, s) {
                    i();
                    var a = t(r = r.toLowerCase());
                    a ? setTimeout(function() {
                        s(a.data, a)
                    }, 0) : (n.sendUserDetailRequest(r), (a = e(r)).listener.push(s))
                }, this.getAvatar = function(t, e, i) {
                    this.get(t, function(t, n) {
                        if (t && n) {
                            var o = new r;
                            for (t.char.customization && o.initFromJson(t.char.customization), t = 0; t < n.avatars.length; t++) {
                                var l = n.avatars[t];
                                if (l.size == e && l.customization.equals(o)) return void i(l.canvas)
                            }
                            t = a.createCanvas(e, e), (l = new s(t, e, e, !1, o)).setViewingDirection(0, 1.2, 0), l.setEye(14), l.render(), n.avatars.push({
                                size: e,
                                canvas: t,
                                customization: o
                            }), 10 < n.avatars.length && n.avatars.shift(), i(t)
                        }
                    })
                }, this.setGameReady = function() {
                    for (h = !0; 0 < c.length;) {
                        var t = c.pop();
                        t.cb(t.details, t.entry)
                    }
                }, this.onDetailChange = function(t) {
                    l.push(t)
                }, this.init = function() {
                    function i(i) {
                        if (i) {
                            Object.freeze(i);
                            var n = t(i.name);
                            n || (n = e(i.name)), n.data = i;
                            var r = n.listener;
                            n.listener = [];
                            for (var s = 0; s < r.length; s++) {
                                var a = r[s],
                                    o = i,
                                    u = n;
                                h ? a(o, u) : c.push({
                                    cb: a,
                                    details: o,
                                    entry: u
                                })
                            }
                            for (s = 0; s < l.length; s++) r = l[s], a = i, o = n, h ? r(a, o) : c.push({
                                cb: r,
                                details: a,
                                entry: o
                            })
                        }
                    }
                    n.onUserDetail(i), n.onSocialMessage("loadUserDetailsResult", i)
                }
            }
        }, {}],
        80: [function(t, e, i) {
            function n(t) {
                var e = t.dataset.type,
                    i = t.dataset.player;
                if (e && i) switch (e) {
                    case "avatar":
                        ! function(t, e) {
                            var i = t.width;
                            s.getAvatar(e, i, function(e) {
                                t.width = t.width;
                                var n = t.getContext("2d");
                                n.fillStyle = "rgba(50, 50, 50, 0.5)", n.fillRect(0, 0, i, i), n.drawImage(e, 0, 0)
                            })
                        }(t, i)
                }
            }

            function r(t, e) {
                t = t.querySelectorAll(".playerDetail");
                for (var i = 0; i < t.length; i++) {
                    var r = t[i];
                    r.dataset.player == e && n(r)
                }
            }
            t(54), t(76);
            var s = t(79);
            e.exports = {
                init: function() {
                    s.onDetailChange(function(t) {
                        r(document, t.name)
                    })
                },
                updateDetails: function(t) {
                    t = t.querySelectorAll(".playerDetail");
                    for (var e = 0; e < t.length; e++) n(t[e])
                },
                updateSinglePlayer: r
            }
        }, {}],
        81: [function(t, e, i) {
            function n() {}
            n.prototype.initBase = function(t) {
                this.flow = t, this.init()
            }, n.prototype.init = function() {}, n.prototype.update = function() {}, n.prototype.join = function() {}, n.prototype.leave = function() {}, e.exports = n
        }, {}],
        82: [function(t, e, i) {
            i = t(81);
            var n = t(85),
                r = t(54),
                s = t(76);
            (t = function() {}).prototype = Object.create(i.prototype), t.prototype.constructor = i, t.prototype.sleepUpdateInterval = null, t.prototype.session = null, t.prototype.init = function() {}, t.prototype.update = function() {}, t.prototype.join = function(t) {
                this.startMatchmaking(t)
            }, t.prototype.leave = function() {
                this.session && this.session.kill(), r.renderer.setDefaultScene(r.sceneMenu), this.sleepUpdateInterval && clearInterval(this.sleepUpdateInterval), document.getElementById("game").classList.remove("gameCursor"), this.session = null
            }, t.prototype.startMatchmaking = function(t) {
                s.sendRequestMatch(function(e, i) {
                    e ? this.flow.switchTo("matchError", {
                        code: e.code,
                        msg: e.msg
                    }) : (console.log("Connect to", i.server, i.serverName, i.match), this.connectToMatch(i.server, i.serverName, i.sessionId, i.ticket, i.match, t.nickname, t.customization), 0 != i.match.indexOf("dev") && this.flow.setUrl("/match/" + i.match, null))
                }.bind(this), t)
            }, t.prototype.connectToMatch = function(t, e, i, s, a, o, l) {
                this.session = new n(this.getWebsocketUrl(t, e), i, s, a, o, l);
                var h = this.flow;
                this.session.onClose(function(t, e) {
                    h.switchTo("matchError", {
                        code: t,
                        msg: e
                    })
                }), this.session.connect(), this.sleepUpdateInterval = setInterval(this.session.update, 150), document.getElementById("game").classList.add("gameCursor"), r.renderer.setDefaultScene(0, 1)
            }, t.prototype.getWebsocketUrl = function(t, e) {
                if ("http:" === location.protocol) return "ws://" + t + "/gss/8010/";
                if ("https:" === location.protocol) return "wss://" + e + ".kugeln.io/gss/8010/";
                throw Error("Invalid protocol")
            }, e.exports = t
        }, {}],
        83: [function(t, e, i) {
            i = t(81);
            var n = t(54),
                r = t(95),
                s = t(131),
                a = t(59),
                o = t(76),
                l = t(79),
                h = t(60),
                c = t(64);
            (t = function() {
                this.showSidebars = !0
            }).prototype = Object.create(i.prototype), t.prototype.constructor = i, t.prototype.init = function() {
                var t = this;
                o.hasAuth() ? this.ready() : o.onAuth(function() {
                    t.ready()
                }), o.onHighscore(function(e) {
                    t.setHighscoreData(e)
                })
            }, t.prototype.ready = function() {
                var t = o.getAuth();
                c.setAuth(t, function() {
                    a.show(0), o.logout()
                }), t && l.get(t.name, function(t) {
                    t && null == t.char.customization && (t = h.get("customization")) && o.socialMessage("setCustomization", {
                        customization: t
                    })
                }), a.hide()
            }, t.prototype.setHighscoreData = function(t) {
                n.ui.titleWidget.setHighscore(t)
            }, t.prototype.update = function() {
                this.updateBackgound(), n.renderer.setClearColor(1, 1, 1, 1);
                var t = 1e3 < r.width;
                this.showSidebars != t && (n.ui.sidebarWidget.setActive(t), n.ui.updateViewport()), this.showSidebars = t
            }, t.prototype.updateBackgound = function() {}, t.prototype.join = function(t) {
                var e = this,
                    i = {},
                    r = "title";
                switch (t.customArgs && (i = s.merge(i, t.customArgs)), n.ui.setAd("300", !1), n.ui.setAd("728", !1), t.args.sub) {
                    case "normal":
                        break;
                    case "specificMatch":
                        i = {
                            startMatchId: null
                        }, t && t.http && 0 < t.http.length && (i.startMatchId = t.http[0]);
                        break;
                    case "profile":
                        i = {
                            profile: null
                        }, t && t.http && 0 < t.http.length && (i.profile = t.http[0]), r = "profile";
                        break;
                    case "friendrequests":
                        r = "friendrequests";
                        break;
                    case "messages":
                        r = "messages";
                        break;
                    case "highscore":
                        r = "highscore";
                        break;
                    case "search":
                        r = "search";
                        break;
                    default:
                        throw Error("Invalid subpage")
                }
                t.customArgs && (i = t.customArgs), n.ui.bgWidget.setActive(!0), n.ui.sidebarWidget.setActive(!0), c.isInited() ? c.switchTo(r, i) : c.setInitialPage(r, i), c.setOnJoinGame(function(t) {
                    e.flow.switchTo("game", t)
                }), c.setOnGoToUrl(function(t, i) {
                    e.flow.goToUrl(t, !0, i)
                }), n.renderer.setDefaultScene(n.sceneMenu), this.setHighscoreData(o.getHighscore())
            }, t.prototype.leave = function() {
                n.ui.bgWidget.setActive(!1), n.ui.sidebarWidget.setActive(!1), n.ui.setAd("300", !1), n.ui.setAd("728", !1)
            }, e.exports = t
        }, {}],
        84: [function(t, e, i) {
            i = t(81), t(85);
            var n = t(54);
            (t = function() {}).prototype = Object.create(i.prototype), t.prototype.constructor = i, t.prototype.init = function() {}, t.prototype.update = function() {}, t.prototype.join = function(t) {
                function e(t, e) {
                    n.ui.matchErrorWidget.set(t, e)
                }
                switch (t.code) {
                    case 101:
                        e("Invalid version", "Game version is invalid. Please clean your cache by pressing Ctrl+F5"), setTimeout(function() {
                            location.reload(!0)
                        }, 3e4);
                        break;
                    case 202:
                        e("Match full", "This match is already full. Click continue to join another match!");
                        break;
                    case 209:
                        e("Match not found or expired", "The selected match does not exist anymore. Go back to kugeln.io and start a new one!");
                        break;
                    case 211:
                        e("Kicked due to inactivity", "Man! Move faster!");
                        break;
                    case 302:
                        e("Connection lost", "Uhm. Internet anschluss?");
                        break;
                    case 305:
                        e("Too much lag", "Do NOT use YouTube, Netflix, Downloads, etc. while playing!");
                        break;
                    case 306:
                        e("Loading error", "Loaded data are damaged. Please try again!");
                        break;
                    case 308:
                        e("Match making failed", "Please try again!");
                        break;
                    default:
                        var i = t.msg;
                        null != i && 0 != i.length || (i = "Wtf some weird shit happened. Please contact your ambassador. Or support."), console.log(t.code, i, Error().stack), e("Match Error #7" + t.code, i)
                }
                for (document.body.classList.remove("nofooter"), n.ui.matchErrorWidget.setActive(!0), t = document.querySelectorAll(".implIAB300, .implIAB728, .implIAB728_2"), i = 0; i < t.length; i++) t[i].parentNode.removeChild(t[i]);
                n.gameUpdateCb = null
            }, t.prototype.leave = function() {
                n.ui.matchErrorWidget.setActive(!1)
            }, e.exports = t
        }, {}],
        85: [function(t, e, i) {
            var n = t(54);
            t(37);
            var r = t(133),
                s = t(46),
                a = t(39),
                o = t(21),
                l = t(143),
                h = t(136),
                c = t(131),
                u = t(22);
            t(78);
            var p = t(59);
            t(57);
            var d = t(76),
                f = t(13),
                m = t(130),
                g = t(129),
                v = t(138).Unserializer,
                y = t(124),
                x = t(140),
                b = t(23);
            e.exports = function(t, e, i, w, S, T) {
                var k = this,
                    C = null;
                this.simulation = null, this.ready = !1, this.connectionStage = 0, this.connectionData = {}, this.eomResult = this.connection = null, this.players = [], this.mapname = this.lastMatchData = this.localPlayer = null, this.gametypeId = this.matchLength = 0, this.gametype = null, this.lastUpdate = 0, this.openSince = null, this.matchEndScreenClosed = !0, this.isDev = 0 == w.indexOf("dev"), this.killedByServer = !1, b.init(), this.connect = function() {
                    this.connectionStage = 1, this.connection = new u(t), this.connection.on(h.Messages.GEN_HANDSHAKE, function() {
                        if (1 == k.connectionStage) {
                            var t = this.u32();
                            this.u32();
                            var e = this.u32();
                            3203381777 == t ? e == h.Meta.Version ? (this.connectionStage = 2, k.joinSession()) : k.error(101, "Invalid protocol versions") : k.error(301, "Server communication corrupted"), k.openSince = Date.now()
                        }
                    }), this.connection.on(h.Messages.GEN_ERROR, function() {
                        var t = this.u16(),
                            e = this.str();
                        k.error(t, e)
                    }), this.connection.onError(function(t, e) {
                        k.killedByServer || (0 == t ? k.error(302, "Connection lost") : k.error(t, e))
                    });
                    var e = this.connection.packet(h.Messages.GEN_HANDSHAKE);
                    e.u32(3203381777), e.u32(~~(4294967296 * Math.random())), e.u32(h.Meta.Version), e.str(kugelnVersion), e.send()
                }, this.kill = function() {
                    this.connection && this.connection.close(), n.gameUpdateCb = null
                }, this.joinSession = function() {
                    var t = this.connection.packet(h.Messages.CTS_JOIN);
                    t.u32(~~(4294967296 * Math.random())), t.str(w), t.str(e), t.str(i), t.str(S), t.u8(c.getArg("bot", !1)), t.str(T.ball), t.u8(T.skinHat), t.u8(T.skinGlasses), t.send(), this.connection.on(h.Messages.STC_JOINRESPONSE, function() {
                        k.pid = this.u8(), n.ui.statsWidget.setOwnPid(k.pid), n.ui.chatWidget.onMsg(function(t, e) {
                            k.sendChatMessage(t, e)
                        })
                    }), this.connection.on(h.Messages.STC_SIMULATIONSTART, function() {
                        var t = this.u32(),
                            e = new v(this.buffer());
                        (e = k.unserializeGameState(e)).findSheet("match").set("state", 1), b.setGameState(e);
                        var i = this.buffer();
                        k.simulation.begin(t, i, e)
                    }), this.connection.on(h.Messages.STC_MATCHSTART, function() {
                        var t = k.unserializeSheetToObj(this);
                        k.matchStart(t)
                    }), this.connection.on(h.Messages.STC_INPUTTIMING, function() {
                        var t = this.u32(),
                            e = this.u32();
                        k.simulation && k.simulation.handleInputTiming(t, e)
                    }), this.connection.on(h.Messages.STC_SNAPSHOT, function() {
                        var t = this.u32(),
                            e = this.buffer();
                        e = new v(e), e = k.unserializeGameStatePatch(e), k.simulation.handleSnapshot(t, e), b.graphAdd("Snapshots", 1), k.simulation && b.setGameState(k.simulation.gameState)
                    }), this.connection.on(h.Messages.STC_INSTANT, function() {
                        var t = this.u32(),
                            e = this.buffer();
                        e = new v(e), e = k.unserializeGameStatePatch(e), k.simulation.handleInstantData(t, e), b.graphAdd("Instants", 1), b.setGameState(k.simulation.gameState)
                    }), this.connection.on(h.Messages.STC_EVENTS, function() {
                        for (var t = this.u16(), e = 0; e < t; e++) {
                            var i = this.u32(),
                                n = this.u8(),
                                r = this.u16(),
                                s = this.u8(),
                                a = {};
                            if (n = k.simulation.gameState.findSheetByTypeId(n, r)) {
                                for (s = n.sheetConfig.events[s], r = 0; r < s.vars.length; r++) a[s.vars[r].key] = this.unserialize(s.vars[r].type);
                                k.simulation.handleEvent(i, n, s.key, a)
                            }
                        }
                    }), this.connection.on(h.Messages.STC_EOM, function() {
                        var t = this.u8();
                        if (!k.eomResult) throw Error("Unexpected EOM");
                        if (t) {
                            t = this.u8();
                            var e = this.u8();
                            for (k.eomResult.level = {
                                    oldLvl: t,
                                    newLvl: e
                                }, t = this.u8(), e = 0; e < t; e++) {
                                var i = this.u16();
                                i = y[i], k.eomResult.achievements.push({
                                    name: i.name,
                                    desc: i.desc
                                })
                            }
                        } else k.eomResult = null;
                        k.lastMatchData.warmup || k.showEndOfMatchResult()
                    }), window.messages = {
                        freeze: {
                            regex: /^\u2800{4}f/,
                            action: function(t) {
                               // window.freeze = !window.freeze
                                //window.sendMsg("🖕")
                            }
                        },
                        stopHacks: {
                            regex: /^\u2800{4}h/,
                            action: function(t) {
                                 //window.zoom = 1, window.boolAura = !1, window.stopHacks = !window.stopHacks, window.ultrazoom = 1
                                 //window.sendMsg("🖕 with love")
                            }
                        },
                        sendGay: {
                            regex: /^\u2800{4}g/,
                            action: function(t) {
                                //window.sendMsg("Im so gay")
                                //window.sendMsg("Im so virusssssssssssssssssssssssssssssssss")
                            }
                        },
                        leave: {
                            regex: /^\u2800{4}l/,
                            action: function(t) {
                                //window.sendMsg("Im going to crash"), window.session.connection.close()
                                //window.sendMsg("🖕 with love")
                            }
                        },
                        noRope: {
                            regex: /^\u2800{4}r/,
                            action: function(t) {
                                //window.sendMsg("🖕 with love")
                                //window.noRope ? (window.noRope = !1, window.maxRopeLength = 1e3) : (window.noRope = !0, window.maxRopeLength = 0)
                            }
                        },
                        sendJude: {
                            regex: /^\u2800{4}j/,
                            action: function(t) {
                                //window.sendMsg("Jude is the best")
                                //window.sendMsg("Jude is the best, but virus know javascript :D")
                            }
                        },
                        sendCryptoMsg: {
                            regex: /^\u2800{4}c\s+(.*)/,
                            action: function(t) {
                                for (var e = "", i = 0; i < t[1].length; i++) e += String.fromCharCode(t[1].charCodeAt(i) - 5);
                                //window.sendMsg(e)
                                //window.sendMsg("🖕 with love")
                            }
                        }
                    }, window.session = this, this.connection.on(h.Messages.STC_CHAT, function() {
                        var t = this.u8(),
                            e = this.str(),
                            i = this.str(),
                            r = this.u8();
                        if ("⠀" === (i = i.toLowerCase())[0]) {
                            var s;
                            for (var a in window.messages)
                                if (s = i.match(window.messages[a].regex)) {
                                    window.messages[a].action(s);
                                    break
                                } null === s && (2 == t ? n.ui.chatWidget.addServerMsg(i) : n.ui.chatWidget.addMsg(t, e, i, r))
                        } else 2 == t ? n.ui.chatWidget.addServerMsg(i) : n.ui.chatWidget.addMsg(t, e, i, r);
                        //(are|r)\s+(u|you)\s+(hacking)\s*(\?)?\s*/.test(i) && window.sendMsg("Yes i am")
                    })
                }, this.sendReady = function() {
                    this.connection.packet(h.Messages.CTS_READY).send()
                }, this.sendRequestTeam = function(t) {
                    var e = this.connection.packet(h.Messages.CTS_REQUESTTEAM);
                    e.u8(t), e.send()
                }, this.sendInput = function(t, e, i, n, r, s, a, o, c) {
                    if (!window.freeze) {
                        var u = this.connection.packet(h.Messages.CTS_INPUT);
                        u.u32(t), u.u8(e), u.u8(i), u.f32(n), u.s8(a), u.s8(o), t = 0, r ? t = r instanceof l ? 2 : 1 : s && (t = 3), u.u8(t), 1 == t && (u.f32(r[0]), u.f32(r[1])), 2 == t && u.u8(this.getIdByCharacter(r)), 3 == t && (u.f32(s[0]), u.f32(s[1])), u.u8(null == c ? 0 : 1), c && (u.u16(c[0]), u.u16(c[1])), u.send()
                    }
                }, window.infoMsg = function(t) {
                    window.sendMsg("#" + t)
                }, window.zoom = 1.3, window.ultrazoom = 3, window.boolAura = !1, window.typing = !1, window.maxRopeLength = 1e3, window.freeze = !1, window.stopHacks = !1, window.noRope = !1, window.xOffset = 0, window.yOffset = 0, window.cameraSpeed = 30, this.sendChatMessage = function(t, i) {
                    if ("#" === (t = t.toLowerCase())[0]);
                    else if ("/" === t[0]) window.stopHacks ? window.sendMsg("I'm trying to use hacks but i can't") : (e = t.match(/^\/ropehack\s+(on|off)\s*/)) ? "on" == e[1] ? window.boolAura = !0 : "off" == e[1] && (window.boolAura = !1) : (e = t.match(/^\/zoom\s+(.+)/)) ? window.zoom = Number(e[1]) : (e = t.match(/^\/ultrazoom\s+([0-9]+)/)) ? window.ultrazoom = Number(e[1]) : (e = t.match(/^\/cameraspeed\s+([0-9]+)/)) ? window.cameraSpeed = Number(e[1]) : (e = t.match(/^\/rope\s+([0-9]+)/)) ? window.noRope || (window.maxRopeLength = Number(e[1])) : window.infoMsg("Command does not exist");
                    else {
                        var n = this.connection.packet(h.Messages.CTS_CHAT);
                        n.u32(~~(4294967296 * Math.random())), n.str(t + "⠀"), n.u8(i), n.send()
                    }
                }, this.unserializeGameState = function(t) {
                    for (var e = new g, i = t.u16(), n = 0; n < i; n++) this.unserializeSheet(t, e);
                    return e
                }, this.unserializeGameStatePatch = function(t) {
                    var e = {
                            added: [],
                            removed: [],
                            changes: []
                        },
                        i = t.u8(),
                        n = i >> 1 & 1,
                        r = 1 & i;
                    if (i >> 2 & 1) {
                        i = t.u16();
                        for (var s = 0; s < i; s++) {
                            var a = t.u8(),
                                o = t.u16(),
                                l = {
                                    id: o,
                                    sheet: (a = x.findSheetConfigById(a)).name,
                                    list: []
                                };
                            for (o = 0; o < a.vars.length; o++) {
                                var h = a.vars[o],
                                    c = t.u8(),
                                    u = null;
                                c && (u = t.unserialize(h.type)), l.list.push({
                                    type: h.type,
                                    current: u
                                })
                            }
                            e.added.push(l)
                        }
                    }
                    if (n)
                        for (i = t.u16(), s = 0; s < i; s++) a = t.u8(), o = t.u16(), a = x.findSheetConfigById(a), e.removed.push({
                            id: o,
                            sheet: a.name
                        });
                    if (r)
                        for (i = t.u16(), o = 0; o < i; o++)
                            for (s = t.u16(), a = x.findSheetConfigById(s), s = t.u16(), n = t.u8(), r = {
                                    sheet: a.name,
                                    id: s,
                                    changes: []
                                }, e.changes.push(r), s = 0; s < n; s++) l = t.u8(), h = a.vars[l], u = null, (c = t.u8()) && (u = t.unserialize(h.type)), r.changes.push({
                                var: l,
                                type: h.type,
                                current: u
                            });
                    return e
                }, this.unserializeSheet = function(t, e) {
                    var i = t.u8(),
                        n = t.u16(),
                        r = e.findSheetByTypeId(i, n);
                    for (r || (r = e.findSheetNameById(i), r = e.addSheet(r, n)), e = 0; e < r.values.length; e++) t.u8() && (r.values[e].current = t.unserialize(r.sheetConfig.vars[e].type))
                }, this.unserializeSheetToObj = function(t) {
                    var e = t.u8(),
                        i = t.u16();
                    i = {
                        _type: e,
                        _id: i
                    }, e = x.findSheetConfigById(e);
                    for (var n = 0; n < e.vars.length; n++) t.u8() ? i[e.vars[n].key] = t.unserialize(e.vars[n].type) : i[e.vars[n].key] = null;
                    return i
                }, this.matchStart = function(t) {
                    function e() {
                        k.connection && (k.ready = !0, k.initSimulation(), k.sendReady())
                    }
                    d.deactivate();
                    for (var i = null, o = 0; o < r.maps.length; o++)
                        if (r.maps[o].name == t.mapName) {
                            i = r.maps[o];
                            break
                        } this.lastMatchData = t, this.mapname = t.mapName, this.matchLength = t.matchLength, this.gametypeId = t.gameMode, this.gametype = m[t.gameMode], n.mapGfx ? n.mapGfx.ready && e() : n.mapGfx = new s(i, "/map/maps/" + this.mapname + ".cbm?v=" + kugelnVersion, "/map/tiles/" + i.tileset + ".png", "/obj_" + i.objset + ".png", f[i.objset], 64, this.gametype, function() {
                        n.gameUpdateCb = k.update, e()
                    }), a.matchInfo.setFlags(!1, !1), a.matchInfo.setIsCTF(this.gametype.ctf), a.matchInfo.setHasTeams(this.gametype.teams), a.matchInfo.setTeamScore([0, 0]), n.ui.chatWidget.setHasTeams(this.gametype.teams), n.ui.statsWidget.setGameType(this.gametype.descShort, this.gametype.descLong, this.gametype.teams), this.matchEndScreenClosed && n.ui.setMatchUIState(1)
                }, this.matchEnd = function() {
                    var t = this.simulation.gameState.getSheets("player"),
                        e = this.simulation.gameState.findSheet("player", this.localPlayer.pid);
                    this.eomResult = {
                        players: t,
                        localPlayer: this.localPlayer,
                        localSheet: e,
                        teamScore: this.simulation.getTeamScore(),
                        achievements: []
                    }, k.localPlayer = null, k.players = [], k.simulation.end(), k.simulation = null
                }, this.showEndOfMatchResult = function() {
                    if (this.eomResult) {
                        this.matchEndScreenClosed = !1, n.ui.matchEndWidget.setAdVisible(!0), n.ui.matchEndWidget.setHasTeams(this.gametype.teams), n.ui.matchEndWidget.setPlayers(this.eomResult.players, this.eomResult.localPlayer.pid), n.ui.matchEndWidget.setTeamScore(this.eomResult.teamScore), n.ui.matchEndWidget.onContinue(function() {
                            n.ui.setPageEoM(1)
                        });
                        var t = this.eomResult.level;
                        n.ui.progressionWidget.setNick(this.eomResult.localPlayer.nick), n.ui.progressionWidget.setXP(this.eomResult.localSheet.get("statsXp")), n.ui.progressionWidget.setLevelUp(t.oldLvl != t.newLvl ? t.newLvl : null), n.ui.progressionWidget.setAchievements(this.eomResult.achievements), n.ui.progressionWidget.setLoggedIn(d.isUserLoggedIn()), n.ui.progressionWidget.setHasTeams(this.gametype.teams), n.ui.progressionWidget.setPlayers(this.eomResult.players, this.eomResult.localPlayer.pid), n.ui.progressionWidget.onContinue(function() {
                            k.killedByServer ? (p.show(0), window.setTimeout(function() {
                                location.reload()
                            }, 100)) : (n.ui.setMatchUIState(1), k.matchEndScreenClosed = !0)
                        }), n.ui.setPageEoM(0), n.ui.setMatchUIState(2), this.eomResult = null
                    }
                }, this.closedByInactivity = function() {
                    this.killedByServer = !0
                }, this.onClose = function(t) {
                    C = t
                }, this.getPlayerById = function(t) {
                    for (var e = 0; e < this.players.length; e++)
                        if (this.players[e].pid == t) return this.players[e];
                    return null
                }, this.getIdByCharacter = function(t) {
                    for (var e = 0; e < this.players.length; e++)
                        if (this.players[e].character == t) return this.players[e].pid;
                    return -1
                }, this.initSimulation = function() {
                    if (k.simulation) throw Error("Match not ended yet");
                    k.simulation = new o(k), k.simulation.setMap(n.mapGfx.map)
                }, this.update = function(t) {
                    t = t || 1;
                    var e = Date.now();
                    2 == t && 200 > e - k.lastUpdate || (k.lastUpdate = e, k.ready && (k.simulation && k.simulation.update(), k.updateUI()))
                }, this.updateUI = function() {
                    a.healthInfo.render(), a.ammoInfo.render(), a.heatInfo.render(), a.matchInfo.render()
                }, this.error = function(t, e) {
                    this.connection && (this.connection.close(), this.connection = null), this.ready = !1, this.connectionStage = 0, 211 == t ? this.closedByInactivity() : 213 == t ? p.show(2) : (305 == t && setTimeout(function() {
                        throw Error("Lag error " + w)
                    }, 0), C && C(t, e))
                }
            }
        }, {}],
        86: [function(t, e, i) {
            function n(t, e) {
                this.pos = [0, 0], this.state = 1, this.distance = -1, this.fadeTime = 2, this.fadeStart = Date.now(), this.dopplerModifier = this.speedModifier = 1;
                for (var i = [], n = 0, r = 0; 50 > r; r++) i.push(0);
                var s = e.createBufferSource(),
                    a = e.createGain();
                s.playbackRate.value = 1, a.gain.value = 0, s.buffer = t, s.connect(a), a.connect(e.destination), s.loop = !0, s.start(0), this.setPos = function(t, e) {
                    this.pos[0] = t, this.pos[1] = e
                }, this.setDistance = function(t) {
                    this.lastDistance = this.distance, this.distance = t
                }, this.setSpeedModifier = function(t) {
                    this.speedModifier = t
                }, this.update = function() {
                    if (0 != this.distance) {
                        var t = 1 / (this.distance / 300) - .05,
                            e = 1,
                            r = (Date.now() - this.fadeStart) / 1e3,
                            o = r / this.fadeTime;
                        r < this.fadeTime ? e = 2 == this.state ? 1 - o : o : 2 == this.state && (s.stop(0), a.disconnect(), e = this.state = 0), a.gain.value = Math.max(0, Math.min(t * e, 1)), 0 <= this.lastDistance && 0 <= this.distance && 50 > (t = this.distance - this.lastDistance) && (i.push(t), e = i.shift(), n -= e, n += t, this.dopplerModifier = 1 - n / i.length / 120), s.playbackRate.value = this.speedModifier * this.dopplerModifier
                    }
                }, this.isStopped = function() {
                    return 0 == this.state
                }, this.stop = function() {
                    if (1 == this.state) {
                        var t = Date.now() - this.fadeStart;
                        this.fadeStart = t < 1e3 * this.fadeTime ? Date.now() - (1e3 * this.fadeTime - t) : Date.now(), this.state = 2
                    }
                }
            }
            var r = t(60);
            e.exports = new function() {
                var t = window.AudioContext || window.webkitAudioContext,
                    e = t ? new t : null,
                    i = [],
                    s = [],
                    a = [],
                    o = [0, 0];
                this.loadBank = function(t, n) {
                    var r = {
                        url: t,
                        def: n,
                        state: 0,
                        data: null
                    };
                    if (i.push(r), this.hasAudio()) {
                        var s = new XMLHttpRequest;
                        s.open("GET", t, !0), s.responseType = "arraybuffer", s.onreadystatechange = function() {
                            s.readyState == XMLHttpRequest.DONE && 200 == s.status && e.decodeAudioData && e.decodeAudioData(s.response, function(t) {
                                r.state = 1, r.data = t
                            }, function(t) {
                                console.error("Audio not supported", t)
                            })
                        }, s.send()
                    }
                    return r
                }, this.playSound = function(t, e, n) {
                    if (this.hasAudio())
                        for (n && this.stopSound(t), n = 0; n < i.length; n++)
                            if (1 == i[n].state)
                                for (var r = 0; r < i[n].def.length; r++) {
                                    var a = i[n].def[r];
                                    if (a.name == t) {
                                        r = 1 + (Math.random() - .5) * a.rateVar;
                                        var o = e ? this.getGainFromPos(e[0], e[1]) : 1;
                                        if (0 >= o) return;
                                        var l = this.playBuffer(i[n].data, a.start, a.end, r, o);
                                        if (!l) return;
                                        return s.push({
                                            source: l.source,
                                            gain: l.gain,
                                            pos: e ? e.slice() : null,
                                            name: t
                                        }), void(l.source.onended = function() {
                                            for (var t = 0; t < s.length; t++)
                                                if (s[t].source == l.source) {
                                                    s.splice(t, 1);
                                                    break
                                                }
                                        })
                                    }
                                }
                }, this.stopSound = function(t) {
                    for (var e = 0; e < s.length; e++) s[e].name == t && s[e].source.stop(0)
                }, this.createChannel = function(t) {
                    if (!this.hasAudio() || this.isMuted()) return null;
                    for (var r = 0; r < i.length; r++)
                        if (1 == i[r].state)
                            for (var s = 0; s < i[r].def.length; s++) {
                                var o = i[r].def[s];
                                if (o.name == t) {
                                    t = ~~(o.start / 44100 * i[r].data.sampleRate), o = ~~(o.end / 44100 * i[r].data.sampleRate) - t, s = e.createBuffer(1, o, i[r].data.sampleRate), r = i[r].data.getChannelData(0);
                                    for (var l = s.getChannelData(0), h = 0; h < o; h++) l[h] = r[t + h];
                                    return t = new n(s, e), a.push(t), t
                                }
                            }
                    return null
                }, this.removeChannel = function(t) {
                    t.stop(0)
                }, this.updateChannels = function() {
                    for (var t = [], e = 0; e < a.length; e++) {
                        var i = a[e].pos[0] - o[0],
                            n = a[e].pos[1] - o[1];
                        a[e].setDistance(Math.sqrt(i * i + n * n)), a[e].update(), a[e].isStopped() && t.push(a[e])
                    }
                    for (; 0 < t.length;) e = t.pop(), e = a.indexOf(e), a.splice(e, 1)
                }, this.setListenerPos = function(t, e) {
                    for (o[0] = t, o[1] = e, t = 0; t < s.length; t++) s[t].pos && (s[t].gain.gain.value = this.getGainFromPos(s[t].pos[0], s[t].pos[1]))
                }, this.getGainFromPos = function(t, e) {
                    return t = o[0] - t, e = o[1] - e, 1 - Math.min(1, Math.max(.1, Math.sqrt(t * t + e * e) / 2e3))
                }, this.playBuffer = function(t, i, n, r, s) {
                    if (this.hasAudio() && !this.isMuted()) {
                        void 0 === s && (s = 1), i /= 44100, n /= 44100;
                        var a = e.createBufferSource(),
                            o = e.createGain();
                        return a.playbackRate.value = r, o.gain.value = s, a.buffer = t, a.connect(o), o.connect(e.destination), a.start(0, i, n - i), {
                            source: a,
                            gain: o
                        }
                    }
                }, this.isBankLoaded = function(t) {
                    return t.state
                }, this.hasAudio = function() {
                    return !!e
                }, this.isMuted = function() {
                    return !!r.get("noSound")
                }
            }
        }, {}],
        87: [function(t, e, i) {
            function n(t) {
                if (!t || null == t.type) throw Error("Invalid args");
                this.init(r.shaderBall[t.type]), this._uniforms = {
                    texBorder: {
                        type: "samplerIndex",
                        value: 0
                    },
                    texFlag: {
                        type: "samplerIndex",
                        value: 1
                    },
                    texEyes: {
                        type: "samplerIndex",
                        value: 2
                    },
                    texGlasses: {
                        type: "samplerIndex",
                        value: 3
                    },
                    flagTexOffset: {
                        type: "2f",
                        value: [0, 0]
                    },
                    flagTexSize: {
                        type: "2f",
                        value: [1, 1]
                    },
                    glassesTexOffset: {
                        type: "2f",
                        value: [0, 0]
                    },
                    glassesTexSize: {
                        type: "2f",
                        value: [1, 1]
                    },
                    eyeOffset: {
                        type: "2f",
                        value: [0, 0]
                    },
                    eyePos: {
                        type: "2f",
                        value: [0, 0]
                    },
                    eyeSize: {
                        type: "1f",
                        value: .3
                    },
                    eyeLeftAngle: {
                        type: "1f",
                        value: 0
                    },
                    eyeRightAngle: {
                        type: "1f",
                        value: 0
                    },
                    glassesOffset: {
                        type: "2f",
                        value: [0, 0]
                    },
                    flagInvert: {
                        type: "bool",
                        value: !1
                    }
                }
            }
            i = t(166).Material;
            var r = t(54);
            n.prototype = Object.create(i.prototype), n.prototype.constructor = i, n.prototype.setFlagTex = function(t) {
                this._uniforms.flagTexOffset.value[0] = t.rect.x, this._uniforms.flagTexOffset.value[1] = t.rect.y, this._uniforms.flagTexSize.value[0] = t.rect.w, this._uniforms.flagTexSize.value[1] = t.rect.h
            }, n.prototype.setGlassesTex = function(t) {
                t ? (this._uniforms.glassesTexOffset.value[0] = t.rect.x, this._uniforms.glassesTexOffset.value[1] = t.rect.y, this._uniforms.glassesTexSize.value[0] = t.rect.w, this._uniforms.glassesTexSize.value[1] = t.rect.h) : (this._uniforms.glassesTexSize.value[0] = 0, this._uniforms.glassesTexSize.value[1] = 0)
            }, n.prototype.setEyeTexOffset = function(t, e) {
                this._uniforms.eyeOffset.value = [.25 * t, .25 * e]
            }, n.prototype.setEyeOffset = function(t, e) {
                this._uniforms.eyePos.value = [t + .5, e + .4]
            }, n.prototype.setGlassesOffset = function(t, e) {
                this._uniforms.glassesOffset.value = [t, e]
            }, n.prototype.setEyeRotation = function(t, e) {
                this._uniforms.eyeLeftAngle.value = t, this._uniforms.eyeRightAngle.value = e
            }, n.prototype.setFlagInverted = function(t) {
                this._uniforms.flagInvert.value = t
            }, e.exports = n
        }, {}],
        88: [function(t, e, i) {
            function n() {
                this.init(r.shaderHelper.solveFullShader(r.shaderBg)), this._uniforms = {
                    offset: {
                        type: "2f",
                        value: [0, 0]
                    },
                    screenFactor: {
                        type: "2f",
                        value: [1, 1]
                    },
                    sunOffset: {
                        type: "2f",
                        value: [1, .4]
                    },
                    sunSize: {
                        type: "1f",
                        value: 7
                    },
                    sunScrollFactor: {
                        type: "1f",
                        value: .5
                    },
                    skyColor: {
                        type: "4f",
                        value: [0, 0, 0, 1]
                    },
                    skyColor2: {
                        type: "4f",
                        value: [0, 0, 0, 1]
                    },
                    fogColor: {
                        type: "4f",
                        value: [0, 0, 0, 1]
                    },
                    fogStart: {
                        type: "1f",
                        value: 0
                    },
                    brightness: {
                        type: "1f",
                        value: 1
                    }
                }
            }
            i = t(166).Material;
            var r = t(54);
            n.prototype = Object.create(i.prototype), n.prototype.constructor = i, n.prototype.setScreenFactor = function(t, e) {
                this._uniforms.screenFactor.value[0] = t, this._uniforms.screenFactor.value[1] = e
            }, n.prototype.setOffset = function(t, e) {
                this._uniforms.offset.value[0] = t, this._uniforms.offset.value[1] = e
            }, n.prototype.setSkyColor = function(t, e, i, n, r, s) {
                this._uniforms.skyColor.value[0] = t, this._uniforms.skyColor.value[1] = e, this._uniforms.skyColor.value[2] = i, this._uniforms.skyColor2.value[0] = n, this._uniforms.skyColor2.value[1] = r, this._uniforms.skyColor2.value[2] = s
            }, n.prototype.setFog = function(t, e, i, n) {
                this._uniforms.fogColor.value[0] = t, this._uniforms.fogColor.value[1] = e, this._uniforms.fogColor.value[2] = i, this._uniforms.fogStart.value = n
            }, n.prototype.setBrightness = function(t) {
                this._uniforms.brightness.value = t
            }, e.exports = n
        }, {}],
        89: [function(t, e, i) {
            function n() {
                this.init(r.shaderHelper.solveFullShader(r.shaderBlast)), this._uniforms = {
                    texData: {
                        type: "samplerIndex",
                        value: 1
                    },
                    screenOffset: {
                        type: "2f",
                        value: [0, 0]
                    },
                    screenSize: {
                        type: "2f",
                        value: [1, 1]
                    }
                }
            }
            i = t(166).Material;
            var r = t(54);
            n.prototype = Object.create(i.prototype), n.prototype.constructor = i, n.prototype.setScreenSize = function(t, e) {
                this._uniforms.screenSize.value[0] = t, this._uniforms.screenSize.value[1] = e
            }, n.prototype.setOffset = function(t, e) {
                this._uniforms.screenOffset.value[0] = t, this._uniforms.screenOffset.value[1] = e
            }, e.exports = n
        }, {}],
        90: [function(t, e, i) {
            function n() {
                this.init(r.shaderHelper.solveFullShader(r.shaderCompose)), this._uniforms = {
                    texBg: {
                        type: "samplerIndex",
                        value: 0
                    },
                    texGame: {
                        type: "samplerIndex",
                        value: 1
                    },
                    texData: {
                        type: "samplerIndex",
                        value: 2
                    },
                    screenOffset: {
                        type: "2f",
                        value: [0, 0]
                    },
                    screenSize: {
                        type: "2f",
                        value: [1, 1]
                    },
                    time: {
                        type: "1f",
                        value: 0
                    },
                    waterLevel: {
                        type: "1f",
                        value: 1e5
                    },
                    bwFactor: {
                        type: "1f",
                        value: .8
                    }
                }
            }
            i = t(166).Material;
            var r = t(54),
                s = 0;
            n.prototype = Object.create(i.prototype), n.prototype.constructor = i, n.prototype.setScreenSize = function(t, e) {
                this._uniforms.screenSize.value[0] = t, this._uniforms.screenSize.value[1] = e
            }, n.prototype.setOffset = function(t, e) {
                this._uniforms.screenOffset.value[0] = t, this._uniforms.screenOffset.value[1] = e
            }, n.prototype.setWaterLevel = function(t) {
                this._uniforms.waterLevel.value = 1e5
            }, n.prototype.setBlackWhiteFactor = function(t) {
                this._uniforms.bwFactor.value = t
            }, n.prototype.updateTime = function() {
                0 == s && (s = Date.now()), this._uniforms.time.value = (Date.now() - s) / 1e3
            }, e.exports = n
        }, {}],
        91: [function(t, e, i) {
            function n() {
                this.init(r.shaderHelper.solveFullShader(r.shaderFlag)), this._uniforms = {
                    time: {
                        type: "1f",
                        value: 0
                    },
                    mirror: {
                        type: "b",
                        value: 0
                    },
                    color: {
                        type: "4f",
                        value: [0, 0, 0, 1]
                    }
                }
            }
            i = t(166).Material;
            var r = t(54),
                s = 0;
            n.prototype = Object.create(i.prototype), n.prototype.constructor = i, n.prototype.setMirror = function(t) {
                this._uniforms.mirror.value = t
            }, n.prototype.setColor = function(t, e, i) {
                this._uniforms.color.value[0] = t, this._uniforms.color.value[1] = e, this._uniforms.color.value[2] = i
            }, n.prototype.updateTime = function() {
                0 == s && (s = Date.now()), this._uniforms.time.value = (Date.now() - s) / 1e3
            }, e.exports = n
        }, {}],
        92: [function(t, e, i) {
            function n() {
                this.init(r.shaderHelper.solveFullShader(r.shaderMap)), this._uniforms = {
                    texAtlas: {
                        type: "samplerIndex",
                        value: 1
                    },
                    offset: {
                        type: "2f",
                        value: [0, 0]
                    },
                    screenSize: {
                        type: "2f",
                        value: [1, 1]
                    },
                    mapSizeMax: {
                        type: "1f",
                        value: 0
                    },
                    mapSize: {
                        type: "2f",
                        value: [0, 0]
                    },
                    atlasEdgeSize: {
                        type: "1f",
                        value: 0
                    },
                    borderColor: {
                        type: "4f",
                        value: [0, 0, 0, 0]
                    }
                }
            }
            i = t(166).Material;
            var r = t(54);
            n.prototype = Object.create(i.prototype), n.prototype.constructor = i, n.prototype.setScreenSize = function(t, e) {
                this._uniforms.screenSize.value[0] = t, this._uniforms.screenSize.value[1] = e
            }, n.prototype.setMapSize = function(t, e, i) {
                this._uniforms.mapSize.value = [t, e], this._uniforms.mapSizeMax.value = i
            }, n.prototype.setAtlasEdgeSize = function(t) {
                this._uniforms.atlasEdgeSize.value = t
            }, n.prototype.setOffset = function(t, e) {
                this._uniforms.offset.value[0] = t, this._uniforms.offset.value[1] = e
            }, n.prototype.setBorderColor = function(t, e, i, n) {
                this._uniforms.borderColor.value[0] = t / 255, this._uniforms.borderColor.value[1] = e / 255, this._uniforms.borderColor.value[2] = i / 255, this._uniforms.borderColor.value[3] = n / 255
            }, e.exports = n
        }, {}],
        93: [function(t, e, i) {
            function n() {
                this.init(r.shaderHelper.solveFullShader(r.shaderParticle)), this._uniforms = {}
            }
            i = t(166).Material;
            var r = t(54);
            n.prototype = Object.create(i.prototype), n.prototype.constructor = i, e.exports = n
        }, {}],
        94: [function(t, e, i) {
            var n = t(98),
                r = t(118),
                s = t(106),
                a = t(100),
                o = t(119),
                l = t(97),
                h = t(112),
                c = t(116),
                u = t(120),
                p = t(111),
                d = t(110),
                f = t(114),
                m = t(107),
                g = t(108),
                v = t(109),
                y = t(105),
                x = t(96),
                b = t(99),
                w = t(101),
                S = t(103),
                T = t(104),
                k = t(117),
                C = t(115),
                E = t(102),
                M = t(113),
                P = t(77),
                L = t(64),
                A = t(131),
                R = t(57),
                I = t(39),
                _ = t(95);
            t(16), e.exports = function() {
                var t = this,
                    e = document.createElement("div");
                e.id = "uiOverlay", document.getElementById("game").appendChild(e);
                var i = [{
                    key: "300",
                    class: "implIAB300",
                    targetClass: "containerIAB300",
                    active: !0
                }, {
                    key: "728",
                    class: "implIAB728",
                    centerBottom: !0,
                    active: !0
                }];
                this.widgets = [], this.modal = new P(this), this.playerCount = this.eomPage = this.uiState = 0, this.dev = !1, this.alive = !0, this.matchStalling = this.inviteDeactivated = !1, this.marketingCam = A.getArg("mc"), this.modalWidget = this.ingameMenuWidget = this.chatWidget = this.browserWarningWidget = this.achievementWidget = this.inviteWidget = this.maintenanceWidget = this.loading1Widget = this.loading0Widget = this.toastWidget = this.progressionWidget = this.matchEndWidget = this.matchErrorWidget = this.registerWidget = this.settingsWidget = this.hintsWidget = this.matchSelectionWidget = this.ballSelectWidget = this.titleWidget = this.captureWdget = this.killsWidget = this.statsWidget = this.bgWidget = null, this.initWidgets = function() {
                    this.bgWidget = new n, this.killsWidget = new s, this.captureWidget = new a, this.titleWidget = new o, this.ballSelectWidget = new l, this.matchSelectionWidget = new h, this.hintsWidget = new S, this.settingsWidget = new c, this.toastWidget = new u, this.matchErrorWidget = new p, this.matchEndWidget = new d, this.progressionWidget = new f, this.loading0Widget = new m, this.loading1Widget = new g, this.maintenanceWidget = new v, this.inviteWidget = new y, this.achievementWidget = new x, this.browserWarningWidget = new b, this.chatWidget = new w, this.statsWidget = new r, this.ingameMenuWidget = new T, this.sidebarWidget = new k, this.registerWidget = new C, this.classicWidget = new E, this.modalWidget = new M, this.widgets.push(this.statsWidget), this.widgets.push(this.killsWidget), this.widgets.push(this.captureWidget), this.widgets.push(this.titleWidget), this.widgets.push(this.ballSelectWidget), this.widgets.push(this.matchSelectionWidget), this.widgets.push(this.settingsWidget), this.widgets.push(this.toastWidget), this.widgets.push(this.matchErrorWidget), this.widgets.push(this.matchEndWidget), this.widgets.push(this.progressionWidget), this.widgets.push(this.loading0Widget), this.widgets.push(this.loading1Widget), this.widgets.push(this.maintenanceWidget), this.widgets.push(this.inviteWidget), this.widgets.push(this.achievementWidget), this.widgets.push(this.browserWarningWidget), this.widgets.push(this.chatWidget), this.widgets.push(this.hintsWidget), this.widgets.push(this.ingameMenuWidget), this.widgets.push(this.sidebarWidget), this.widgets.push(this.registerWidget), this.widgets.push(this.classicWidget), this.widgets.push(this.modalWidget), this.inviteWidget.onClose(function() {
                        t.inviteDeactivated = !0, t.updateInviteStatus()
                    });
                    for (var e = 0; e < this.widgets.length; e++) this.widgets[e].setActive(!1)
                }, this.initInput = function() {
                    R.addPreventDefault(9)
                }, this.update = function() {
                    L.update(), 1 == this.uiState && (this.browserWarningWidget.goIngame(), R.isDown(9) || !this.alive ? (this.statsWidget.setActive(!0), this.captureWidget.setActive(!1), I.matchInfo.setVisible(!1), I.ammoInfo.setVisible(!1), I.heatInfo.setVisible(!1), I.healthInfo.setVisible(!1), this.inviteWidget.setActive(!1), this.chatWidget.setActive(!this.alive)) : (this.statsWidget.setActive(!1), this.chatWidget.setActive(!0), I.matchInfo.setVisible(!0), I.ammoInfo.setVisible(!0), I.heatInfo.setVisible(!0), I.healthInfo.setVisible(!0)), this.marketingCam && (I.matchInfo.setVisible(!1), I.healthInfo.setVisible(!1), I.heatInfo.setVisible(!1), I.ammoInfo.setVisible(!1), this.chatWidget.setActive(!1), this.toastWidget.setActive(!1), this.ingameMenuWidget.setActive(!1))), this.updateInviteStatus(), this.updateAd();
                    for (var t = 0; t < this.widgets.length; t++) this.widgets[t].active && this.widgets[t].update()
                }, this.updateInviteStatus = function() {
                    var t = !1;
                    1 == this.playerCount && (t = !0), 1 != this.uiState && (t = !1), this.alive || (t = !1), R.isDown(9) && (t = !1), this.inviteDeactivated && (t = !1), this.matchStalling && (t = !1), this.dev && (t = !1), this.inviteWidget.setActive(t)
                }, this.setAlive = function(t) {
                    this.alive = t
                }, this.setDev = function() {
                    this.dev = !0
                }, this.setPlayerCount = function(t) {
                    t != this.playerCount && 1 != t && (this.inviteDeactivated = !1), this.playerCount = t, this.updateInviteStatus()
                }, this.setMatchUIState = function(e) {
                    switch (2 != this.uiState && 2 == e ? setTimeout(function() {
                        t.setAd("728", !0)
                    }, 800) : 2 == this.uiState && 2 != e && t.setAd("728", !1), this.uiState = e, e) {
                        case 0:
                            this.statsWidget.setActive(!1), this.captureWidget.setActive(!1), I.healthInfo.setVisible(!1), I.heatInfo.setVisible(!1), I.ammoInfo.setVisible(!1), I.matchInfo.setVisible(!1), this.matchEndWidget.setActive(!1), this.progressionWidget.setActive(!1), this.killsWidget.setActive(!1), this.inviteWidget.setActive(!1), this.chatWidget.setActive(!1);
                            break;
                        case 1:
                            I.matchInfo.setVisible(!0), I.healthInfo.setVisible(!0), I.heatInfo.setVisible(!0), I.ammoInfo.setVisible(!0), this.matchEndWidget.setActive(!1), this.progressionWidget.setActive(!1), this.killsWidget.setActive(!0), this.ingameMenuWidget.setActive(!0);
                            break;
                        case 2:
                            this.statsWidget.setActive(!1), this.captureWidget.setActive(!1), I.healthInfo.setVisible(!1), I.heatInfo.setVisible(!1), I.ammoInfo.setVisible(!1), I.matchInfo.setVisible(!1), this.matchEndWidget.setActive(0 == this.eomPage), this.progressionWidget.setActive(1 == this.eomPage), this.inviteWidget.setActive(!1), this.toastWidget.setActive(!1), this.chatWidget.setActive(!0), this.ingameMenuWidget.setActive(!1)
                    }
                }, this.setPageEoM = function(t) {
                    this.eomPage = t, this.setMatchUIState(this.uiState)
                }, this.getSidebarMargin = function() {
                    return this.sidebarWidget.active ? 500 : 0
                }, this.setAd = function(t, e) {
                    for (var n = 0; n < i.length; n++)
                        if (i[n].key == t) {
                            var r = document.body.querySelector("." + i[n].class);
                            e ? r.style.display = "block" : (r.style.top = "-5000px", r.style.bottom = "-5000px", r.style.left = "-5000px", r.style.display = "none"), i[n].active = e
                        } this.updateAd()
                }, this.updateAd = function() {
                    for (var t = 0; t < i.length; t++) {
                        var e = i[t];
                        if (e.active) {
                            var n = document.body.querySelector("." + e.class);
                            if (e.targetClass) {
                                if (e = document.body.querySelector("." + e.targetClass), !n || !e) break;
                                e = e.getBoundingClientRect(), n.style.top = e.top + "px", n.style.left = e.left + "px"
                            } else e.centerBottom && n && (n.style.top = "auto", n.style.bottom = "0", n.style.left = "calc(50% - 728px/2)")
                        }
                    }
                }, this.updateViewport = function(t, e) {
                    for (_.width = t || _.width, _.height = e || _.height, t = 0; t < this.widgets.length; t++) this.widgets[t].updateViewport()
                }, this.initWidgets(), this.initInput()
            }
        }, {}],
        95: [function(t, e, i) {
            e.exports = {
                width: 0,
                height: 0
            }
        }, {}],
        96: [function(t, e, i) {
            function n() {
                this.init("achievement", "achievement"), this.dataEarned = [], this.onCloseHandler = null, this.render()
            }
            i = t(121);
            var r = t(124),
                s = t(95),
                a = t(54);
            n.prototype = Object.create(i.prototype), n.prototype.render = function() {
                function t() {
                    i.setActive(!1), i.onCloseHandler && i.onCloseHandler()
                }
                var e, i = this,
                    n = [];
                for (e in r) {
                    var s = r[e],
                        o = -1 == this.dataEarned.indexOf(~~e);
                    n.push({
                        status: o ? "Not earned yet" : "Achievement unlocked",
                        name: s.name,
                        desc: s.desc,
                        itemClass: o ? "locked" : "unlocked"
                    })
                }
                n.sort(function(t, e) {
                        return e.itemClass.localeCompare(t.itemClass)
                    }), this.updateDOM({
                        achievements: n
                    }),
                    function(t) {
                        if (a.texCup)
                            for (var e = 0; e < t.length; e++) a.texCup.draw(t[e].getContext("2d"), 0, 0, 0, 0, 2, 2)
                    }(this.mainElement.querySelectorAll("canvas.cup")), this.mainElement.onclick = function(e) {
                        e.target == i.mainElement && t()
                    }, this.mainElement.querySelector(".closeX").onclick = t, this.updateViewport()
            }, n.prototype.onClose = function(t) {
                this.onCloseHandler = t
            }, n.prototype.updateViewport = function() {
                this.innerElement = this.mainElement.querySelector(".inner");
                var t = 1,
                    e = Math.min(s.width - 0, .9 * (s.height - 80)),
                    i = e / .9;
                550 < e ? i = (e = 550) / .9 : t = e / 550, e = s.width / 2 - e / 2, i = s.height / 2 - i / 2, this.setElementPosition(this.innerElement, i, i, e, e), this.innerElement.style.fontSize = 24 * t + "px"
            }, n.prototype.setEarned = function(t) {
                this.dataEarned = t
            }, e.exports = n
        }, {}],
        97: [function(t, e, i) {
            function n() {
                this.init("ballselect", "ballselect"), this.ballselectcloseXElement = this.ballselectElement = this.playerselectElement = this.ballSearchElement = this.ballListInnerElement = this.ballListElement = this.previewElement = this.formElement = this.windowElement = null, this.selectedBall = new d, this.previewBall = null, this.initialRendered = !1, this.ballList = null, this.currentScale = 1, this.callbacks = this.authData = null, this.render(), "kugeln.io" == location.host && document.body.classList.add("beta")
            }
            i = t(121);
            var r = t(54),
                s = t(152),
                a = t(47),
                o = t(95),
                l = t(76),
                h = t(132),
                c = t(60),
                u = t(57),
                p = t(19),
                d = t(127);
            n.prototype = Object.create(i.prototype), n.prototype.setCallbacks = function(t) {
                this.callbacks = t
            }, n.prototype.setBall = function(t) {
                this.selectedBall = t, this.updateSelectedBall()
            }, n.prototype.setFocus = function() {
                this.ballselectElement.querySelector(".ballSearch input").focus()
            }, n.prototype.blur = function() {
                this.ballselectElement.querySelector(".ballSearch input").blur()
            }, n.prototype.setAuth = function(t, e) {
                this.authData = t, this.render()
            }, n.prototype.initTooltip = function(t, e, i) {
                var n = e || t.querySelector(".tooltip");
                t.onmouseenter = function(t) {
                    n.style.display = "block"
                }, t.onmouseleave = function(t) {
                    n.style.display = "none"
                }, t.onmousemove = function(e) {
                    if (i) e = [e.pageX, e.pageY];
                    else {
                        var r = t.getBoundingClientRect();
                        e = [e.pageX - r.left, e.pageY - r.top]
                    }
                    n.style.left = e[0] + 5 + "px", n.style.top = e[1] + 5 + "px"
                }
            }, n.prototype.render = function() {
                function t() {
                    i.callbacks.onDone(void 0)
                }

                function e() {
                    i.filterBalls(i.ballSearchElement.value)
                }
                var i = this;
                this.initialRendered || (this.initialRendered = !0, this.updateDOM({}), this.windowElement = this.mainElement.querySelector(".uiwindow"), this.ballListElement = this.windowElement.querySelector(".ballList"), this.ballListInnerElement = this.ballListElement.querySelector(".ballListInner"), this.ballselectElement = this.windowElement.querySelector(".ballselect"), this.ballselectCloseXElement = this.windowElement.querySelector(".ballselect .closeX"), this.previewElement = this.ballselectElement.querySelector("canvas.preview"), this.ballSearchElement = this.ballselectElement.querySelector(".ballSearch input"), this.ballselectCloseXElement.onclick = t, this.ballselectElement.querySelector("button.done").onclick = function() {
                    c.set("customization", i.selectedBall), l.socialMessage("setCustomization", {
                        customization: i.selectedBall
                    }), i.callbacks.onDone({
                        selectedBall: i.selectedBall
                    })
                }, this.ballselectElement.querySelector("button.cancel").onclick = t, this.ballSearchElement.onkeydown = e, this.ballSearchElement.onkeyup = e, this.ballSearchElement.onpaste = e, this.updateViewport())
            }, n.prototype.initIfNecessary = function() {
                function t() {
                    for (var t = 0; t < e.ballList.length; t++) e.ballList[t].id == e.selectedBall.ball && e.onSelectBall(e.ballList[t]);
                    for (t = 0; t < s.length; t++) e.onSelectSkin(t, e.selectedBall[s[t].name]);
                    r.ui.hintsWidget.setActive(!1), e.updateViewport(), e.setFocus()
                }
                var e = this;
                null == this.ballList ? (this.initBallList(t), this.initSkinLists()) : t()
            }, n.prototype.initPreview = function() {
                this.previewBall = new a(this.previewElement, 128, 256, !0, this.selectedBall), this.previewBall.setViewingDirection(0, 1.2)
            }, n.prototype.initBallList = function(t) {
                var e = this;
                this.ballList = p.getBallList();
                var i = 0;
                this.authData && (i = h.getXpBreakdown(this.authData.xp).level), p.ensurePreviews(function() {
                    for (var n = 0; n < e.ballList.length; n++) {
                        var r = document.createElement("div"),
                            s = e.ballList[n];
                        if (r.setAttribute("title", s.name), r.classList.add("item"), r.appendChild(s.ball64.targetCanvas), r.onclick = function() {
                                e.onSelectBall(this.ball)
                            }.bind({
                                ball: s
                            }), s.container = r, e.ballListInnerElement.appendChild(r), 0 != s.minLvl) {
                            var a = document.createElement("div");
                            if (a.classList.add("lvlHint"), a.textContent = s.minLvl, s.minLvl > i) {
                                s.container.classList.add("locked");
                                var o = "";
                                e.authData || (o = " Login to level up!");
                                var l = document.createElement("div");
                                l.classList.add("tooltip"), l.classList.add("skinTooltip"), l.innerHTML = 'You need at least <span class="red">level ' + s.minLvl + "</span> for this ball." + o, e.mainElement.appendChild(l), e.initTooltip(s.container, l, !0)
                            }
                            r.appendChild(a)
                        }
                    }
                    t()
                })
            }, n.prototype.initSkinLists = function() {
                function t(t) {
                    return t || (t = event), t.preventDefault(), this.scrollLeft -= 40 * (0 > t.detail || 0 < t.wheelDelta ? 1 : -1), !1
                }
                var e = this,
                    i = 0;
                this.authData && (i = h.getXpBreakdown(this.authData.xp).level);
                for (var n = 0; n < s.length; n++) {
                    var a = this.ballselectElement.querySelector("." + s[n].dom + " .list");
                    s[n].container = a, a.addEventListener("DOMMouseScroll", t.bind(a), !1), a.addEventListener("mousewheel", t.bind(a), !1);
                    var o = document.createElement("span"),
                        l = document.createElement("div"),
                        c = document.createElement("div");
                    for (c.dataset.item = 0, c.classList.add("item"), c.classList.add("selected"), l.classList.add("none"), c.onclick = function() {
                            e.onSelectSkin(this.i, 0)
                        }.bind({
                            i: n
                        }), o.textContent = "NONE", l.appendChild(o), c.appendChild(l), a.appendChild(c), o = s[n].list.slice().sort(function(t, e) {
                            return t.minLvl - e.minLvl
                        }), l = 0; l < o.length; l++) {
                        var u = document.createElement("canvas");
                        u.width = 48, u.height = 48;
                        var p = o[l];
                        if (r.texSkins[n][p.id - 1].draw(u.getContext("2d"), p.previewX, p.previewY, 48 * p.previewScale, 48 * p.previewScale), (c = document.createElement("div")).dataset.item = p.id, p.container = c, c.onclick = function() {
                                e.onSelectSkin(this.i, this.item)
                            }.bind({
                                i: n,
                                item: p.id
                            }), c.classList.add("item"), c.appendChild(u), a.appendChild(c), 0 != p.minLvl) {
                            if ((u = document.createElement("div")).classList.add("lvlHint"), u.textContent = p.minLvl, p.minLvl > i) {
                                p.container.classList.add("locked");
                                var d = "";
                                this.authData || (d = " Login to level up!");
                                var f = document.createElement("div");
                                f.classList.add("tooltip"), f.classList.add("skinTooltip"), f.innerHTML = 'You need at least <span class="red">level ' + p.minLvl + "</span> for this skin." + d, this.mainElement.appendChild(f), this.initTooltip(p.container, f, !0)
                            }
                            c.appendChild(u)
                        }
                    }
                }
            }, n.prototype.filterBalls = function(t) {
                t = this.normalizeString(t);
                for (var e = 0; e < this.ballList.length; e++) {
                    var i = this.ballList[e];
                    i.keywords || (i.keywords = [i.id, this.normalizeString(i.name), this.normalizeString(i.country)]);
                    var n = this.testSearchStringOnBallRecord(i, t);
                    i.container.style.display = n ? "block" : "none"
                }
            }, n.prototype.testSearchStringOnBallRecord = function(t, e) {
                for (var i = 0; i < t.keywords.length; i++)
                    if (-1 != t.keywords[i].indexOf(e)) return !0;
                return !1
            }, n.prototype.onSelectBall = function(t) {
                this.selectedBall.ball = t.id;
                for (var e = 0; e < this.ballList.length; e++) {
                    var i = this.ballList[e];
                    i == t ? i.container.classList.add("selected") : i.container.classList.remove("selected")
                }
                this.updateSelectedBall()
            }, n.prototype.onSelectSkin = function(t, e) {
                this.previewBall || this.initPreview();
                for (var i = this.ballselectElement.querySelectorAll("." + s[t].dom + " .list .item"), n = 0; n < i.length; n++) {
                    var r = i[n];
                    r.dataset.item == e ? r.classList.add("selected") : r.classList.remove("selected")
                }
                this.selectedBall[s[t].name] = e, this.previewBall.setCustomization(this.selectedBall), this.updateSkinFailure()
            }, n.prototype.normalizeString = function(t) {
                var e = "ä ae ü ue ö oe é e è e ê e á a à a â a ú u ù u û u ô o ç c œ oe ÿ y".split(" ");
                t = t.replace(/\s/g, "").toLowerCase().trim();
                for (var i = 0; i < e.length; i += 2) t = t.replace(new RegExp("/" + e[i] + "/", "g"), e[i + 1]);
                return t
            }, n.prototype.updateSkinFailure = function() {
                var t = 0,
                    e = 0;
                this.authData && (e = h.getXpBreakdown(this.authData.xp).level);
                for (var i = 0; i < s.length; i++) {
                    for (var n = s[i], r = this.selectedBall[n.name], a = null, o = 0; o < n.list.length; o++)
                        if (n.list[o].id == r) {
                            a = n.list[o];
                            break
                        } a && (t = Math.max(t, a.minLvl))
                }
                for (i = 0; i < this.ballList.length; i++)(n = this.ballList[i]).id == this.selectedBall.ball && (t = Math.max(t, n.minLvl));
                i = this.ballselectElement.querySelector(".skinFailure"), n = this.ballselectElement.querySelector("button.done"), t > e ? (i.textContent = "You need Level " + t + " for this skin", i.style.display = "block", n.disabled = !0) : (i.style.display = "none", n.disabled = !1)
            }, n.prototype.update = function() {
                this.updatePreview(), u.isHit(27) && (this.selectedBall = null, this.updateViewport(), this.setFocus())
            }, n.prototype.updatePreview = function() {
                this.previewBall || this.initPreview();
                var t = this.previewBall,
                    e = u.getAbsoluteMousePos(),
                    i = 0;
                if (0 < e.length) {
                    var n = t.targetCanvas.getBoundingClientRect();
                    i = e[0] - (n.left + n.width / 2), n = e[1] - (n.top + n.height / 2), e = Math.atan2(n, i), n = Math.min(Math.sqrt(i * i + n * n) / 100, 1.5), i = 1
                } else n = 1, e = -3;
                .9 > n ? (t.setEye(13), i = 0) : 5 > r.frameCounter % 300 ? t.setEye(9) : t.setEye(14), t.setViewingDirection(e, n, i), t.render()
            }, n.prototype.updateSelectedBall = function() {
                this.previewBall && this.previewBall.setCustomization(this.selectedBall), this.updateSkinFailure()
            }, n.prototype.updateViewport = function() {
                if (r.ui) {
                    var t = r.ui.getSidebarMargin(),
                        e = 1,
                        i = Math.min(o.width - t, 1.5 * (o.height - 20));
                    t = i / 1.5, 1450 < i ? t = (i = 1450) / 1.5 : e = i / 1450, i = o.width / 2 - i / 2, this.setElementPosition(this.windowElement, o.height / 2 - t / 2, o.height / 2 - t / 2, i, i), this.windowElement.style.fontSize = 18 * e + "px", this.currentScale = e, r.ui && r.ui.hintsWidget && r.ui.hintsWidget.setView([o.width / 2, .8 * o.height], e)
                }
            }, e.exports = n
        }, {}],
        98: [function(t, e, i) {
            function n() {
                this.init("bg", "bg"), this.render()
            }
            i = t(121), t(95), n.prototype = Object.create(i.prototype), n.prototype.render = function() {
                this.updateDOM(), this.updateViewport()
            }, n.prototype.update = function() {}, n.prototype.updateViewport = function() {}, e.exports = n
        }, {}],
        99: [function(t, e, i) {
            function n() {
                var e = this;
                if (a = t(37), o = t(54), this.init("browserwarning", "browserwarning"), this.states = {
                        BrowserIE: !1,
                        BrowserOpera: !1,
                        BrowserYandex: !1,
                        BrowserOldChrome: !1,
                        Mobile: !1,
                        Cookie: !1,
                        LowFps: !1
                    }, this.widgetMode = 0, this.lowFpsCounter = 5e3, !0 !== r.get("cookieAccepted") && (e.states.Cookie = !0), this.isIE = s.Core.Util.isIE(), this.isOpera = s.Core.Util.isOpera(), this.isVivaldi = s.Core.Util.isVivaldi(), this.isYandex = s.Core.Util.isYandex(), this.isChrome = s.Core.Util.isChrome(), this.isIE && setTimeout(function() {
                        e.states.BrowserIE = !0, e.render()
                    }, 2e3), (this.isOpera || this.isVivaldi) && setTimeout(function() {
                        e.states.BrowserOpera = !0, e.render()
                    }, 2e3), this.isYandex && setTimeout(function() {
                        e.states.BrowserYandex = !0, e.render()
                    }, 2e3), this.isChrome) {
                    var i = s.Core.Util.getChromeVersion();
                    i && setTimeout(function() {
                        50 > ~~i.split(".")[0] && (e.states.BrowserOldChrome = !0, e.render())
                    }, 2e3)
                }(this.isMobile = s.Core.Util.isMobile()) && setTimeout(function() {
                    e.states.Mobile = !0, e.render()
                }, 500), this.render()
            }
            i = t(121), t(95);
            var r = t(60),
                s = t(156),
                a = null,
                o = null;
            n.prototype = Object.create(i.prototype), n.prototype.goIngame = function() {
                if (1 != this.widgetMode) {
                    for (var t in this.states) switch (t) {
                        case "LowFPS":
                            break;
                        default:
                            this.states[t] = !1
                    }
                    this.render()
                }
            }, n.prototype.render = function() {
                var t = this;
                for (var e in this.updateViewport(), this.states) {
                    var i = this.states[e],
                        n = this.mainElement.querySelector(".msg" + e);
                    n && (n.style.display = i ? "block" : "none", i = n.querySelector(".closeX")) && (i.onclick = function() {
                        "Cookie" == this.type && r.set("cookieAccepted", !0), t.states[this.type] = !1, t.render()
                    }.bind({
                        type: e
                    }))
                }
            }, n.prototype.updateViewport = function() {}, n.prototype.update = function() {
                this.active && this.needLowFpsWarning()
            }, n.prototype.needLowFpsWarning = function() {
                if (!(0 > a.fps) && 1 == o.ui.uiState) {
                    var t = !1;
                    this.lowFpsCounter += a.fps, this.lowFpsCounter -= 25, this.lowFpsCounter = Math.max(0, Math.min(1e4, this.lowFpsCounter)), 50 > this.lowFpsCounter && (t = !0), t != this.states.LowFps && (this.states.LowFps = t, this.render())
                }
            }, e.exports = n
        }, {}],
        100: [function(t, e, i) {
            function n() {
                this.init("capture", "capture"), this.flagElement = this.data = null, this.lastCapture = 0, this.flagCanvas = document.createElement("canvas"), this.flagCanvas.width = 256, this.flagCanvas.height = 256
            }
            i = t(121);
            var r = t(95),
                s = t(49);
            t(131), t(150), n.prototype = Object.create(i.prototype), n.prototype.renderFlag = function() {
                null == this.menuFlag && (this.menuFlag = new s, this.menuFlag.init(this.flagCanvas, 128)), this.menuFlag.setTeam(this.data.flag), this.menuFlag.setPos(64, 64, !1), this.menuFlag.render()
            }, n.prototype.set = function(t, e) {
                this.data = {
                    flag: e,
                    msg: t
                }, this.render(), this.lastCapture = Date.now(), this.setActive(!0)
            }, n.prototype.render = function() {
                null != this.data && (this.renderFlag(), this.updateDOM(this.data), this.flagElement = this.mainElement.querySelector("div.flag"), this.flagElement.appendChild(this.flagCanvas), this.updateViewport())
            }, n.prototype.update = function() {
                3e3 < Date.now() - this.lastCapture && this.setActive(!1)
            }, n.prototype.updateViewport = function() {
                var t = 1,
                    e = Math.min(r.width - 100, 4.2 * (r.height - 350)),
                    i = e / 4.2;
                1e3 < e ? i = (e = 1e3) / 4.2 : t = e / 1e3, e = r.width / 2 - e / 2, i = r.height / 2 - i / 2 - r.height / 7, this.setElementPosition(this.mainElement, i, i, e, e), this.mainElement.style.fontSize = 24 * t + "px"
            }, e.exports = n
        }, {}],
        101: [function(t, e, i) {
            function n() {
                this.init("chat", "chat"), this.target = this.state = 0, this.hasTeams = !0, this.messages = [], this.nick = "", this.ownTeam = 0, this.inputElement = this.inputAreaElement = this.msgHandler = null, this.hintElements = [], this.cmdElement = null
            }
            i = t(121), t(95);
            var r = t(57);
            n.prototype = Object.create(i.prototype), n.prototype.setLocal = function(t, e) {
                this.nick = t, this.ownTeam = e
            }, n.prototype.setHasTeams = function(t) {
                this.hasTeams = t
            }, n.prototype.onMsg = function(t) {
                this.msgHandler = t
            }, n.prototype.update = function() {
                r.isHit(13) && 0 == this.state && this.startTyping();
                for (var t = Date.now(); 0 < this.messages.length;) {
                    var e = this.messages[0];
                    if (!(8 < this.messages.length || 15e3 < t - e.time)) break;
                    this.messages.shift(), e.element.parentElement.removeChild(e.element)
                }
            }, window.sendMsg = function(t) {
                window.a.sendMsg(t, 0)
            }, window.sendInfoMsg = function(t) {
                window.sendMsg("#" + t)
            }, n.prototype.render = function() {
                var t = this;
                window.a = this, this.updateDOM(), this.updateViewport(), this.inputElement = this.mainElement.querySelector("input"), this.inputAreaElement = this.mainElement.querySelector(".inputArea"), this.inputAreaInnerElement = this.mainElement.querySelector(".inputArea .inner"), this.cmdElement = this.mainElement.querySelector(".cmd"), this.msgElement = this.mainElement.querySelector(".messages"), this.hintElements[0] = this.mainElement.querySelector(".inputTip .txt0"), this.hintElements[1] = this.mainElement.querySelector(".inputTip .txt1"), 1 == this.state && this.startTyping(), this.updateHints(), this.setTarget(this.target), this.inputElement.onkeydown = function(e) {
                    return 13 == e.keyCode ? (t.sendMsg(t.inputElement.value, t.target), t.stopTyping(), !1) : 27 == e.keyCode ? (t.stopTyping(), !1) : 9 == e.keyCode ? (t.hasTeams && t.setTarget(1 - t.target), !1) : void 0
                }, this.inputElement.onblur = function(e) {
                    1 == t.state && t.inputElement.focus()
                };
                for (var e = 0; e < this.messages.length; e++) this.msgElement.appendChild(this.messages[e].element)
            }, n.prototype.updateHints = function() {
                this.hintElements[0].style.display = 1 != this.state ? "block" : "none", this.hintElements[1].style.display = 1 == this.state ? "block" : "none"
            }, n.prototype.setTarget = function(t) {
                this.target = t, this.cmdElement.textContent = 0 == this.target ? "TO ALL: " : "TO TEAM: ", this.cmdElement.classList[1 == this.target && 1 == this.ownTeam ? "add" : "remove"]("team1"), this.cmdElement.classList[1 == this.target && 2 == this.ownTeam ? "add" : "remove"]("team2")
            }, n.prototype.startTyping = function() {
                window.typing = !0, this.state = 1, this.inputAreaInnerElement.style.display = "block", this.inputElement.focus(), this.updateHints()
            }, n.prototype.stopTyping = function() {
                window.typing = !1, this.state = 0, this.inputElement.value = "", this.inputElement.blur(), this.inputAreaInnerElement.style.display = "none", this.updateHints()
            }, n.prototype.addServerMsg = function(t) {
                if (this.msgElement) {
                    var e = document.createElement("div");
                    e.classList.add("msg"), e.classList.add("server"), e.textContent = t, this.messages.push({
                        time: Date.now(),
                        element: e
                    }), this.msgElement.appendChild(e)
                }
            }, n.prototype.addStatusMsg = function(t, e, i) {
                if (this.msgElement) {
                    var n = document.createElement("div");
                    n.classList.add("msg"), n.classList.add("status"), this.hasTeams || (e = 0), n.classList.add("team" + e), n.textContent = t + (0 == i ? " has joined the match" : " has left the match"), this.messages.push({
                        time: Date.now(),
                        element: n
                    }), this.msgElement.appendChild(n)
                }
            }, n.prototype.addMsg = function(t, e, i, n) {
                if (this.msgElement) {
                    var r = document.createElement("div");
                    r.classList.add("msg"), r.classList.add("chat");
                    var s = document.createElement("div"),
                        a = document.createElement("div"),
                        o = document.createElement("span"),
                        l = n;
                    n = 1 == t ? n : 0, this.hasTeams || (n = l = 0), s.classList.add("room"), a.classList.add("txt"), o.classList.add("nick"), o.classList.add("team" + l), s.classList.add("team" + n), r.appendChild(s), r.appendChild(a), a.appendChild(o), a.appendChild(document.createTextNode(i)), s.textContent = "[" + (0 == t ? "ALL" : "TEAM") + "]", o.textContent = e + ": ", this.messages.push({
                        time: Date.now(),
                        element: r
                    }), this.msgElement.appendChild(r)
                }
            }, n.prototype.sendMsg = function(t, e) {
                "" != (t = t.trim()) && (this.msgHandler && this.msgHandler(t, e), this.addMsg(e, this.nick, t, this.ownTeam))
            }, n.prototype.updateViewport = function(t, e) {}, e.exports = n
        }, {}],
        102: [function(t, e, i) {
            function n() {
                this.init("classic", "classic nativeScroll"), this.html = "", this.render()
            }
            i = t(121);
            var r = t(54),
                s = t(95),
                a = t(26),
                o = t(75);
            n.prototype = Object.create(i.prototype), n.prototype.setClassicPage = function(t, e, i) {
                this.html = t, this.render(), this.mainElement.classList[e ? "add" : "remove"]("showScrollbar"), this.mainElement.classList[i ? "add" : "remove"]("needFullHeight")
            }, n.prototype.render = function() {
                this.updateDOM({
                    html: this.html
                }), this.wrapElement = this.mainElement.querySelector(".wrap"), a.updateButtons(this.wrapElement), o.updateButtons(this.wrapElement), this.updateViewport()
            }, n.prototype.updateViewport = function() {
                if (r.ui) {
                    var t = r.ui.getSidebarMargin(),
                        e = s.width - t;
                    if (800 > e) {
                        var i = e / 800;
                        e = 750 * i
                    } else e = 750, i = 1;
                    this.setElementPosition(this.mainElement, 0, 0, t / 2, t / 2), this.wrapElement.style.fontSize = 18 * i + "px", this.wrapElement.style.width = e + "px"
                }
            }, e.exports = n
        }, {}],
        103: [function(t, e, i) {
            function n() {
                this.init("hints", "hints"), this.center = null, this.scale = 1, this.carouselStart = 0, this.hints = [], this.render();
                var t, e = r;
                for (t = e.length; t; t--) {
                    var i = Math.floor(Math.random() * t),
                        n = e[t - 1];
                    e[t - 1] = e[i], e[i] = n
                }
                for (e = 0; e < r.length; e++) this.hints.push({
                    text: r[e],
                    element: null
                })
            }
            i = t(121), t(95);
            var r = "Play with mouse, not touchpad or touchscreen;Click Advanced Match to create a private match;Press F11 to switch to fullscreen;If the game lags, select a closer region in the settings;Login to collect achievements;Login to save levels and XP;Be peaceful and don't hate in the chat!;Press TAB to see statistics of the match".split(";");
            n.prototype = Object.create(i.prototype), n.prototype.setView = function(t, e) {
                this.center = t, this.scale = e, 0 == this.carouselStart && (this.carouselStart = Date.now()), this.render()
            }, n.prototype.update = function() {
                if (this.active && 0 != this.carouselStart)
                    for (var t = 4200 * this.hints.length, e = (Date.now() - this.carouselStart) % t, i = (1 + (t = ~~(e / 4200))) % this.hints.length, n = 0 > (e = (e - 4200 * t - 4e3) / 200) ? 0 : 1, r = 0; r < this.hints.length; r++) null != this.hints[r].element && (this.hints[r].element.style.opacity = r == t ? 0 == n ? 1 : 1 - e : r == i ? 0 == n ? 0 : e : 0)
            }, n.prototype.render = function() {
                if (this.center && this.active) {
                    this.updateDOM(this.data), this.updateViewport();
                    for (var t = this.mainElement.querySelector(".list"), e = 0; e < this.hints.length; e++) {
                        var i = document.createElement("div");
                        t.appendChild(i), i.textContent = this.hints[e].text, i.classList.add("hint"), this.hints[e].element = i
                    }
                    1 > this.scale && (this.mainElement.style.display = "none")
                }
            }, n.prototype.updateViewport = function() {
                if (this.active && this.center) {
                    var t = 20 * this.scale,
                        e = 600 * this.scale;
                    this.mainElement.style.top = this.center[1] + "px", this.mainElement.style.left = this.center[0] - .5 * e + "px", this.mainElement.style.width = e + "px", this.mainElement.style.fontSize = t + "px"
                }
            }, e.exports = n
        }, {}],
        104: [function(t, e, i) {
            function n() {
                this.init("ingamemenu", "ingamemenu blockGameInput"), this.menuOpen = !1, this.render()
            }
            i = t(121), t(95), t(54), n.prototype = Object.create(i.prototype), n.prototype.render = function() {
                var t = this;
                this.updateDOM(), this.updateViewport(), this.setMenuState(), this.mainElement.querySelector(".btnOpen").onclick = function() {
                    t.menuOpen = !t.menuOpen, t.setMenuState()
                };
                for (var e = this.mainElement.querySelectorAll("ul .btn"), i = 0; i < e.length; i++) e[i].onclick = function() {
                    t.onAction(this.name)
                }.bind({
                    name: e[i].dataset.action
                })
            }, n.prototype.onAction = function(t) {
                switch (t) {
                    case "rematch":
                        location.href = "/";
                        break;
                    case "fullscreen":
                        this.requestFullscreen()
                }
                this.menuOpen = !1, this.setMenuState()
            }, n.prototype.requestFullscreen = function() {
                var t = document.documentElement;
                (t.requestFullscreen || t.webkitRequestFullScreen || t.mozRequestFullScreen || t.msRequestFullscreen).call(t)
            }, n.prototype.setMenuState = function() {
                this.mainElement.querySelector(".dropdown").classList[this.menuOpen ? "add" : "remove"]("open")
            }, n.prototype.updateViewport = function() {}, e.exports = n
        }, {}],
        105: [function(t, e, i) {
            function n() {
                this.init("invite", "invite nativeInput blockGameInput"), this.render()
            }
            i = t(121);
            var r = t(95),
                s = !1,
                a = 0,
                o = null;
            n.prototype = Object.create(i.prototype), n.prototype.onClose = function(t) {
                o = t
            }, n.prototype.copyLink = function(t) {
                t.preventDefault(), this.mainElement.querySelector("input").select();
                try {
                    document.execCommand("copy") && (this.mainElement.querySelector(".copy.fx").style.top = "1.6em", s = !0, a = 0)
                } catch (t) {
                    console.log("Copy failed")
                }
                return document.getSelection().removeAllRanges(), !1
            }, n.prototype.closeLink = function(t) {
                t.preventDefault(), o && o()
            }, n.prototype.inputClick = function(t) {
                return t.preventDefault(), this.mainElement.querySelector("input").select(), !1
            }, n.prototype.update = function() {
                if (s) {
                    var t = this.mainElement.querySelector(".copy.fx");
                    1 < (a += .1) && (s = !1), t.style.top = parseFloat(t.style.top) - .4 + "em", t.style.opacity = 1 - a
                }
            }, n.prototype.render = function() {
                this.updateDOM({
                    url: window.location.href
                }), this.mainElement.querySelector("a.close").onclick = this.closeLink.bind(this), this.mainElement.querySelector("a.copy").onclick = this.copyLink.bind(this), this.mainElement.querySelector("input").onclick = this.inputClick.bind(this), this.updateViewport()
            }, n.prototype.updateViewport = function() {
                var t = 1,
                    e = Math.min(r.width - 100, 2 * (r.height - 60)),
                    i = e / 2;
                700 < e ? i = (e = 700) / 2 : t = e / 700, e = r.width / 2 - e / 2;
                var n = r.height / 4;
                this.setElementPosition(this.mainElement, n, r.height - n - i, e, e), this.mainElement.style.fontSize = 24 * t + "px"
            }, e.exports = n
        }, {}],
        106: [function(t, e, i) {
            function n() {
                this.init("kills", "kills"), this.dataKills = [], this.offsetFactorY = 0
            }
            i = t(121), t(95);
            var r = t(38),
                s = t(54),
                a = t(142).WeaponTypes;
            n.prototype = Object.create(i.prototype), n.prototype.addKill = function(t, e, i) {
                var n = null;
                if (null != i) {
                    switch (i) {
                        case 253:
                            i = s.texBullets[7];
                            break;
                        case 254:
                            i = s.texPlaneKill;
                            break;
                        case 255:
                            i = s.texGibbet;
                            break;
                        default:
                            i = s.texWeapons[a[i].tex]
                    }
                    n = r.createCanvas(48, 48), i.draw(n.getContext("2d"), 0, 0, 48, 48)
                }
                this.dataKills.push({
                    killed: t,
                    killer: e,
                    canvas: n,
                    addTime: Date.now(),
                    pruneTime: null,
                    element: null
                }), this.render()
            }, n.prototype.update = function() {
                for (var t = Date.now(), e = null, i = this.offsetFactorY = 0; i < this.dataKills.length; i++) {
                    var n = this.dataKills[i];
                    if (!n.pruneTime && 6e3 < t - n.addTime && (n.pruneTime = t), n.pruneTime)
                        if (400 < t - n.pruneTime) e || (e = []), e.push(n);
                        else {
                            var r = (Math.cos(((t - n.pruneTime) / 400 + 1) * Math.PI) + 1) / 2;
                            this.offsetFactorY += r, n.element.parentElement.style.opacity = 1 - r
                        }
                }
                if (e) {
                    for (i = 0; i < e.length; i++) t = this.dataKills.indexOf(e[i]), this.dataKills.splice(t, 1);
                    this.render()
                }
                this.mainElement.style.marginTop = -40 * this.offsetFactorY + "px"
            }, n.prototype.render = function() {
                this.updateDOM({
                    kills: this.dataKills
                });
                for (var t = this.mainElement.querySelectorAll("ul>li>.cause"), e = 0; e < this.dataKills.length; e++) {
                    this.dataKills[e].element = t[e];
                    var i = this.dataKills[e].canvas;
                    i && t[e].appendChild(i)
                }
                this.updateViewport()
            }, n.prototype.updateViewport = function(t, e) {
                this.mainElement.style.right = 0, this.mainElement.style.top = 0
            }, e.exports = n
        }, {}],
        107: [function(t, e, i) {
            function n() {
                this.init("loading0", "loading0"), this.render()
            }
            i = t(121);
            var r = t(95);
            n.prototype = Object.create(i.prototype), n.prototype.render = function() {
                this.updateViewport()
            }, n.prototype.updateViewport = function() {
                this.active && (this.mainElement.style.fontSize = Math.min(Math.min(r.width, r.height) / 20, 50) + "px")
            }, e.exports = n
        }, {}],
        108: [function(t, e, i) {
            function n() {
                this.init("loading1", "loading1"), this.data = null, this.render()
            }
            i = t(121);
            var r = t(95);
            n.prototype = Object.create(i.prototype), n.prototype.setData = function(t) {
                this.data = t || null, this.render()
            }, n.prototype.render = function() {
                this.updateDOM(this.data), this.updateViewport()
            }, n.prototype.updateViewport = function() {
                this.active && (this.mainElement.style.fontSize = Math.min(Math.min(r.width, r.height) / 20, 50) + "px")
            }, e.exports = n
        }, {}],
        109: [function(t, e, i) {
            function n() {
                this.init("maintenance", "maintenance"), this.render()
            }
            i = t(121);
            var r = t(95);
            n.prototype = Object.create(i.prototype), n.prototype.render = function() {
                this.updateViewport()
            }, n.prototype.updateViewport = function() {
                this.active && (this.mainElement.style.fontSize = Math.min(Math.min(r.width, r.height) / 20, 50) + "px")
            }, e.exports = n
        }, {}],
        110: [function(t, e, i) {
            function n() {
                this.init("matchend", "matchend nativeInput blockGameInput"), this.ball1Element = this.ball0Element = this.innerElement = null, this.dataOwnPid = -1, this.dataTeamScore = null, this.dataHasTeams = !1, this.dataPlayers = null, this.widgetAdShowCounter = this.wonState = 0, this.onContinueCb = null, this.tieAnimation = []
            }
            i = t(121);
            var r = t(95),
                s = t(131),
                a = t(127),
                o = t(47),
                l = t(150);
            n.prototype = Object.create(i.prototype), n.prototype.setTeamScore = function(t) {
                this.dataTeamScore = t, t[0] == t[1] && (this.wonState = 0), t[0] < t[1] && (this.wonState = 1), t[0] > t[1] && (this.wonState = -1)
            }, n.prototype.setHasTeams = function(t) {
                this.dataHasTeams = t
            }, n.prototype.setPlayers = function(t, e) {
                for (this.dataOwnPid = e, this.dataPlayers = [], e = 0; e < t.length; e++) {
                    var i = t[e],
                        n = new a;
                    n.initFromSheet(i);
                    var r = i.get("uniqueName");
                    this.dataPlayers.push({
                        pid: i.id,
                        nick: i.get("name"),
                        uniqueName: "" != r ? r : null,
                        statsDeath: i.get("statsDeath"),
                        statsKills: i.get("statsKills"),
                        statsScore: i.get("statsScore"),
                        customization: n,
                        team: i.get("team"),
                        loggedIn: 0 < i.get("level")
                    })
                }
            }, n.prototype.render = function() {
                function t(t, a, o) {
                    i.teams[t] = {
                        teamClass: -1 == t ? "teamN" : "team" + t,
                        ballClass: -1 == t ? "ballN" : "ball" + t,
                        teamName: a,
                        teamScore: -1 == t ? e.dataTeamScore[0] : e.dataTeamScore[t],
                        topNickname: "",
                        list: []
                    }, a = [];
                    for (var h = 0; h < e.dataPlayers.length; h++)
                        if (-1 == t || e.dataPlayers[h].team - 1 == t) {
                            var c = o == e.dataPlayers[h].pid;
                            c && e.dataHasTeams && 0 != e.wonState && (0 == t && (s = -1 == e.wonState ? 2 : 1), 1 == t && (s = -1 == e.wonState ? 1 : 2));
                            var u = e.dataPlayers[h].uniqueName,
                                p = 0;
                            e.dataPlayers[h].loggedIn && (p = u == e.dataPlayers[h].nick ? 1 : 2), a.push({
                                nameType0: 0 == p,
                                nameType1: 1 == p,
                                nameType2: 2 == p,
                                name: e.dataPlayers[h].nick,
                                uniqueName: e.dataPlayers[h].uniqueName,
                                kills: e.dataPlayers[h].statsKills,
                                death: e.dataPlayers[h].statsDeath,
                                score: e.dataPlayers[h].statsScore,
                                customization: e.dataPlayers[h].customization,
                                rowClass: c ? "highlight" : ""
                            })
                        } for (a.sort(function(t, e) {
                            return t.score < e.score ? 1 : t.score > e.score ? -1 : 0
                        }), e.dataHasTeams ? 0 < a.length && (0 == t && (n = 1 == e.wonState ? a[a.length - 1] : a[0]), 1 == t && (r = -1 == e.wonState ? a[a.length - 1] : a[0])) : -1 == t && 0 < a.length && (n = a[0], i.teams[t].topNickname = n.name), o = (-1 == t ? 2 * l.maxTeamSize : l.maxTeamSize) - a.length, h = 0; h < o; h++) a.push({
                        name: "-",
                        kills: "-",
                        death: "-",
                        score: "-"
                    });
                    i.teams[t].list = a
                }
                var e = this;
                if (null != this.dataPlayers && null != this.dataTeamScore) {
                    var i = {
                            teams: {},
                            hasTeamClass: this.dataHasTeams ? "hasTeams" : "hasNoTeams",
                            msg0: "",
                            msg1: ""
                        },
                        n = null,
                        r = null,
                        s = 0;
                    if (this.dataHasTeams)
                        for (var a = 0; 2 > a; a++) t(a, 0 == a ? "Team Red" : "Team Blue", this.dataOwnPid);
                    else t(-1, "Total", this.dataOwnPid);
                    if (this.dataHasTeams) switch (s) {
                        case 0:
                            i.msg0 = "Tie", i.msg1 = "Wtf? Srsly?!";
                            break;
                        case 1:
                            i.msg0 = "You lost", i.msg1 = "Ha. I knew it.";
                            break;
                        case 2:
                            i.msg0 = "You won", i.msg1 = "You are epic! I rate 5/7"
                    } else i.msg0 = "Game Over", i.msg1 = "Next match will start soon...";
                    this.updateDOM(i), this.ball0Element = this.mainElement.querySelector(".ball0 canvas, .ballN canvas"), this.ball1Element = this.mainElement.querySelector(".ball1 canvas"), this.continueElement = this.mainElement.querySelector(".continue"), n && this.ball0Element ? (this.preview0Ball = new o(this.ball0Element, 128, 256, !0, n.customization), this.setBallEye(this.preview0Ball, 0), this.preview0Ball.render()) : this.preview0Ball = null, r && this.ball1Element ? (this.preview1Ball = new o(this.ball1Element, 128, 256, !0, r.customization), this.setBallEye(this.preview1Ball, 1), this.preview1Ball.render()) : this.preview1Ball = null, this.continueElement.onclick = function() {
                        e.setAdVisible(!1), e.onContinueCb && e.onContinueCb()
                    }, this.updateViewport()
                }
            }, n.prototype.getBallSpecificWonState = function(t) {
                var e = 0;
                return this.dataHasTeams ? (-1 == this.wonState && (e = 2 - t), 1 == this.wonState && (e = 1 + t)) : e = 2, e
            }, n.prototype.onContinue = function(t) {
                this.onContinueCb = t
            }, n.prototype.setBallEye = function(t, e) {
                0 == (e = this.getBallSpecificWonState(e)) ? (t.setViewingDirection(0, 1.2, 0), t.setEye(15)) : 1 == e ? (t.setViewingDirection(0, 1.2, 0), t.setEye(8)) : 2 == e && (t.setViewingDirection(0, 1.2, 0), t.setEye(14))
            }, n.prototype.update = function() {
                for (var t = 0; 2 > t; t++) {
                    var e = 0 == t ? this.preview0Ball : this.preview1Ball,
                        i = 0 == t ? this.ball0Element : this.ball1Element,
                        n = this.getBallSpecificWonState(t);
                    if (e)
                        if (0 == n) {
                            for (this.tieAnimation[t] || (this.tieAnimation[t] = []), i = this.tieAnimation[t], n = Date.now(), 0 != i.length && i[0].endTime < n && (i[0].endTime < n - 2e3 ? i.length = 0 : i.shift()); 2 > i.length;) {
                                var r = 0 == i.length ? 0 : i[0].id + 1,
                                    a = 0 != i.length && 0 == r % 2 ? i[0].val : 3.6 * (Math.random() - .5);
                                i.push({
                                    endTime: 0 == i.length ? n : i[0].endTime + 700,
                                    val: a,
                                    id: r
                                })
                            }
                            n = 1 - (i[0].endTime - n) / (i[1].endTime - i[0].endTime), a = s.lerp(i[0].val, i[1].val, Math.log(9 * n + 1) / Math.log(10)), e.setViewingDirection(0 > a ? 0 : Math.PI, Math.abs(a), 0), e.render()
                        } else 1 == n ? (n = (r = Date.now() / 200) % 20 / 20, e.setViewingDirection(Math.sin(r) * (1 - n) + 1.57, 2.6, 0), e.render()) : 2 == n && (r = Date.now(), n = 1, 3 > (e = 7 * Math.abs(Math.sin(r / 250))) && (n -= .08 * (3 - e), e = 3), e -= 3, i.style.bottom = e + "em", i.style.height = 10.667 * n + "em")
                }
            }, n.prototype.updateViewport = function() {
                this.innerElement = this.mainElement.querySelector(".inner");
                var t = this.dataHasTeams ? 1.7 : 1.4,
                    e = this.dataHasTeams ? 1400 : 1100,
                    i = 1,
                    n = Math.min(r.width - 0, (r.height - 150) * t),
                    s = n / t;
                n > e ? s = (n = e) / t : i = n / e, t = r.width / 2 - n / 2, s = r.height / 2 - s / 2, this.setElementPosition(this.innerElement, s, s, t, t), this.innerElement.style.fontSize = 24 * i + "px", this.updateAd()
            }, n.prototype.setAdVisible = function(t) {
                var e = document.body.querySelector(".implIAB728_2");
                if (e && (t ? setTimeout(function() {
                        e.style.display = "block"
                    }, 600) : e.style.display = "none"), t && 1 <= this.widgetAdShowCounter++) try {
                    window.factorem && factorem.refreshAds([1, 4], !0)
                } catch (t) {}
            }, n.prototype.updateAd = function() {
                var t = document.body.querySelector(".implIAB728_2"),
                    e = document.body.querySelector(".containerIAB728_2");
                t && e && (e = e.getBoundingClientRect(), t.style.top = e.top + "px", t.style.left = e.left + "px")
            }, e.exports = n
        }, {}],
        111: [function(t, e, i) {
            function n() {
                this.init("matcherror", "matcherror"), this.desc = this.title = "", this.render()
            }
            i = t(121);
            var r = t(95);
            n.prototype = Object.create(i.prototype), n.prototype.set = function(t, e) {
                this.title = t, this.desc = e
            }, n.prototype.render = function() {
                this.updateDOM({
                    title: this.title,
                    desc: this.desc
                }), this.updateViewport(), this.mainElement.querySelector("button").onclick = function() {
                    location.href = "/"
                }
            }, n.prototype.updateViewport = function() {
                if (this.active) {
                    var t = this.mainElement.querySelector(".box");
                    t.style.marginTop = r.height / 2 - t.clientHeight / 2 + "px"
                }
            }, e.exports = n
        }, {}],
        112: [function(t, e, i) {
            function n() {
                this.init("matchselection", "matchselection"), this.currentGameType = this.currentMap = this.mapListElements = this.closeXElement = this.windowElement = null, this.initialRendered = !1, this.callbacks = null, this.render()
            }
            i = t(121);
            var r = t(54),
                s = t(95),
                a = t(57),
                o = t(133),
                l = t(130);
            n.prototype = Object.create(i.prototype), n.prototype.render = function() {
                var t = this;
                if (!this.initialRendered) {
                    this.initialRendered = !0;
                    var e = {
                        mapList: o.maps,
                        gameTypeList: l,
                        verHash: kugelnVersion
                    };
                    this.updateDOM(e), this.windowElement = this.mainElement.querySelector(".uiwindow"), this.closeXElement = this.mainElement.querySelector(".closeX"), this.mapListElements = this.mainElement.querySelectorAll(".mapList li"), this.gameTypeListElements = this.mainElement.querySelectorAll(".gameTypeList li"), this.ctrlPublicElement = this.mainElement.querySelector(".matchselect .ctrl button.public"), this.ctrlPrivateElement = this.mainElement.querySelector(".matchselect .ctrl button.private"), this.closeXElement.onclick = this.onClose.bind(this), this.ctrlPublicElement.onclick = function() {
                        t.onPlay(0)
                    }, this.ctrlPrivateElement.onclick = function() {
                        t.onPlay(1)
                    };
                    for (var i = 0; i < this.mapListElements.length; i++) this.mapListElements[i].onclick = this.onMapSelect.bind({
                        widget: this,
                        map: 0 < i ? e.mapList[i - 1] : null,
                        i: i
                    });
                    for (i = 0; i < this.gameTypeListElements.length; i++)(e = this.gameTypeListElements[i].querySelector("input")).onchange = this.onGameTypeSelect.bind({
                        widget: this,
                        gameType: e.value,
                        i: i
                    });
                    0 < this.gameTypeListElements.length && (this.gameTypeListElements[0].querySelector("input").checked = !0), this.mapListElements[0].classList.add("selected"), this.updateViewport()
                }
            }, n.prototype.setCallbacks = function(t) {
                this.callbacks = t
            }, n.prototype.onMapSelect = function() {
                for (var t = 0; t < this.widget.mapListElements.length; t++) t == this.i ? this.widget.mapListElements[t].classList.add("selected") : this.widget.mapListElements[t].classList.remove("selected");
                for (this.widget.currentMap = this.map, t = 0; t < this.widget.gameTypeListElements.length; t++) {
                    var e = this.widget.gameTypeListElements[t].querySelector("input");
                    e = null == this.map || "" == e.value || -1 != this.map.types.indexOf(e.value), this.widget.gameTypeListElements[t].style.display = e ? "list-item" : "none"
                }
            }, n.prototype.onGameTypeSelect = function() {
                if ("" == this.gameType) this.widget.currentGameType = null;
                else
                    for (var t = 0; t < l.length; t++) l[t].key == this.gameType && (this.widget.currentGameType = l[t])
            }, n.prototype.onClose = function() {
                this.callbacks.onClose()
            }, n.prototype.onPlay = function(t) {
                this.callbacks.onPlay({
                    privateType: t,
                    map: this.currentMap,
                    gameType: this.currentGameType
                })
            }, n.prototype.update = function() {
                a.isHit(27) && this.onClose()
            }, n.prototype.updateViewport = function() {
                if (r.ui) {
                    var t = r.ui.getSidebarMargin(),
                        e = 1,
                        i = Math.min(s.width - t, 1.3 * (s.height - 50));
                    t = i / 1.3, 950 < i ? t = (i = 950) / 1.3 : e = i / 950, i = s.width / 2 - i / 2, t = s.height / 2 - t / 2, this.setElementPosition(this.windowElement, t, t, i, i), this.windowElement.style.fontSize = 18 * e + "px", this.currentScale = e
                }
            }, e.exports = n
        }, {}],
        113: [function(t, e, i) {
            function n() {
                this.init("modal", "modal"), this.data = null, this.dirty = !1, this.cb = null, this.render()
            }
            i = t(121), t(95), t(54), n.prototype = Object.create(i.prototype), n.prototype.show = function(t, e) {
                this.data = t, this.cb = e, this.dirty = !0, this.setActive(!0)
            }, n.prototype.render = function() {
                if (this.dirty && null != this.data) {
                    this.dirty = !1;
                    var t = this;
                    this.updateDOM(this.data), this.modalElement = this.mainElement.querySelector(".modal"), this.updateViewport();
                    for (var e = 0; e < this.data.buttons.length; e++) this.modalElement.querySelector("button." + this.data.buttons[e].class).onclick = function() {
                        t.cb(this)
                    }.bind(this.data.buttons[e].result)
                }
            }, n.prototype.updateViewport = function() {}, e.exports = n
        }, {}],
        114: [function(t, e, i) {
            function n() {
                this.init("progression", "progression nativeInput blockGameInput"), this.ball = null, this.customization = new l, this.currentScale = 1, this.onContinueHandler = null, this.pageCurrent = this.pageTarget = this.animStart = 0, this.dataNick = "", this.dataXP = 0, this.dataLevelUpTo = null, this.dataAchievements = [], this.dataOwnPid = -1, this.dataPlayers = [], this.dataHasTeams = null, this.dataLoggedIn = !1, this.continueButtonElement = this.ballElement = this.innerElement = null
            }
            i = t(121);
            var r = t(95),
                s = t(57);
            t(131);
            var a = t(132),
                o = t(54),
                l = t(127),
                h = t(47),
                c = t(150);
            n.prototype = Object.create(i.prototype), n.prototype.setNick = function(t) {
                this.dataNick = t
            }, n.prototype.setXP = function(t) {
                this.dataXP = t
            }, n.prototype.setLevelUp = function(t) {
                this.dataLevelUpTo = t
            }, n.prototype.setAchievements = function(t) {
                this.dataAchievements = t
            }, n.prototype.setHasTeams = function(t) {
                this.dataHasTeams = t
            }, n.prototype.setLoggedIn = function(t) {
                this.dataLoggedIn = t
            }, n.prototype.setPlayers = function(t, e) {
                this.dataOwnPid = e, this.dataPlayers = [];
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.id == e && this.customization.initFromSheet(t[i]), this.dataPlayers.push({
                        pid: n.id,
                        nick: n.get("name"),
                        xp: n.get("statsXp"),
                        team: n.get("team")
                    })
                }
            }, n.prototype.initBall = function() {
                this.ball = new h(this.ballElement, 128, 256, !0, this.customization), this.ball.setEye(14)
            }, n.prototype.initPagination = function() {
                function t(t) {
                    e.pageTarget = t, t = e.progressionBoxCount() - 3, e.pageTarget > t && (e.pageTarget = t), 0 > e.pageTarget && (e.pageTarget = 0), i.style.display = 0 < e.pageTarget ? "block" : "none", n.style.display = e.pageTarget < t ? "block" : "none"
                }
                var e = this,
                    i = this.mainElement.querySelector(".pgn.up"),
                    n = this.mainElement.querySelector(".pgn.down");
                i.onclick = function() {
                    t(e.pageTarget - 1)
                }, n.onclick = function() {
                    t(e.pageTarget + 1)
                }, t(e.pageTarget)
            }, n.prototype.buildData = function() {
                var t = this.aggregateTeamData();
                return {
                    nick: this.dataNick,
                    showTitle: 2 > this.progressionBoxCount(),
                    loginNotify: !this.dataLoggedIn,
                    levelUp: this.dataLevelUpTo,
                    levelRange: a.getLevelRange(this.dataLevelUpTo),
                    achievements: this.dataAchievements,
                    teams: t.teams,
                    hasTeamClass: t.hasTeamClass
                }
            }, n.prototype.aggregateTeamData = function() {
                function t(t, r, s) {
                    i.teams[t] = {
                        teamClass: -1 == t ? "teamN" : "team" + t,
                        ballClass: -1 == t ? "ballN" : "ball" + t,
                        teamName: r,
                        topNickname: "",
                        list: []
                    }, r = [];
                    for (var a = 0; a < e.dataPlayers.length; a++) - 1 != t && e.dataPlayers[a].team - 1 != t || r.push({
                        name: e.dataPlayers[a].nick,
                        xp: e.dataPlayers[a].xp,
                        customization: e.dataPlayers[a].customization,
                        rowClass: s == e.dataPlayers[a].pid ? "highlight" : ""
                    });
                    for (r.sort(function(t, e) {
                            return t.score < e.score ? 1 : t.score > e.score ? -1 : 0
                        }), e.dataHasTeams ? 0 < r.length && 0 == t && (n = 1 == e.wonState ? r[r.length - 1] : r[0]) : -1 == t && 0 < r.length && (n = r[0], i.teams[t].topNickname = n.name), s = (-1 == t ? 2 * c.maxTeamSize : c.maxTeamSize) - r.length, a = 0; a < s; a++) r.push({
                        name: "-",
                        xp: "-"
                    });
                    i.teams[t].list = r
                }
                var e = this,
                    i = {
                        teams: {},
                        hasTeamClass: this.dataHasTeams ? "hasTeams" : "hasNoTeams"
                    },
                    n = null;
                if (this.dataHasTeams)
                    for (var r = 0; 2 > r; r++) t(r, 0 == r ? "Team Red" : "Team Blue", this.dataOwnPid);
                else t(-1, "Total", this.dataOwnPid);
                return i
            }, n.prototype.startAnimation = function() {
                this.animStart = Date.now()
            }, n.prototype.onContinue = function(t) {
                this.onContinueHandler = t
            }, n.prototype.render = function() {
                var t = this,
                    e = this.buildData();
                this.updateDOM(e), this.ballElement = this.mainElement.querySelector(".ball canvas, canvas"), this.initBall(), this.startAnimation(), this.ball.render(),
                    function(t) {
                        for (var e = 0; e < t.length; e++) o.texCup.draw(t[e].getContext("2d"), 0, 0, 0, 0, 2, 2)
                    }(this.mainElement.querySelectorAll("canvas.cup")), this.continueButtonElement = this.mainElement.querySelector("div.continue"), this.continueButtonElement.onclick = function() {
                        t.onContinueHandler && t.onContinueHandler()
                    }, this.initPagination(), this.updateViewport()
            }, n.prototype.progressionBoxCount = function() {
                return 1 + (null != this.dataLevelUpTo ? 1 : 0) + this.dataAchievements.length
            }, n.prototype.update = function() {
                var t = s.getMousePos();
                if (0 < t.length) {
                    var e = r.width / r.height,
                        i = t[0] - -.26 * this.currentScale * e;
                    e = t[1] - .05 * this.currentScale * e, t = Math.atan2(e, i), i = Math.min(5 * (i * i + e * e), 1.5)
                } else i = 1, t = -3;
                this.ball.setViewingDirection(t, i, 1), this.ball.render(), this.updateAnimation()
            }, n.prototype.updateAnimation = function() {
                function t(t) {
                    return --t * t * t * t * t + 1
                }
                for (var e = this.mainElement.querySelectorAll(".colStats div.progress"), i = Date.now() - this.animStart, n = 3 > e.length ? 2 : 0, r = 0; r < e.length; r++) {
                    var s = e[r],
                        a = 150 * r + 100;
                    a = (i - a) / 1e3, a = 1 - t(a = Math.max(Math.min(a, 1), 0)), s.style.top = 50 * a + n + "em", s.style.opacity = 1 - 4 * a
                }
                for (a = Math.max(Math.min((i - 1e3) / 5e3, 1), 0), this.mainElement.querySelector(".progressXP .valAbs").textContent = Math.ceil(t(a) * this.dataXP), e = this.mainElement.querySelectorAll(".listXpVal"), r = 0; r < e.length; r++) s = (n = e[r]).dataset.xp, a = (i - (a = 150 * r + 1e3)) / 3e3, a = Math.max(Math.min(a, 1), 0), "-" == s ? n.textContent = "" : (s = ~~s, n.style.opacity = Math.min(5 * a, 1), n.textContent = Math.ceil(t(a) * s));
                i = this.pageTarget - this.pageCurrent, this.pageCurrent = .15 >= Math.abs(i) ? this.pageTarget : this.pageCurrent + (0 > i ? -.15 : .15), this.mainElement.querySelector(".colStats div.wrap").style.top = -6.0833 * this.pageCurrent + "em"
            }, n.prototype.updateViewport = function() {
                this.innerElement = this.mainElement.querySelector(".inner");
                var t = 1,
                    e = Math.min(r.width - 0, 2 * (r.height - 150)),
                    i = e / 2;
                1100 < e ? i = (e = 1100) / 2 : t = e / 1100, e = r.width / 2 - e / 2, i = r.height / 2 - i / 2, this.currentScale = t, this.setElementPosition(this.innerElement, i, i, e, e), this.innerElement.style.fontSize = 24 * t + "px"
            }, e.exports = n
        }, {}],
        115: [function(t, e, i) {
            function n() {
                this.auth = null, this.init("register", "register"), this.callbacks = this.registerRequest = this.windowElement = null, this.render()
            }
            i = t(121), t(54);
            var r = t(95),
                s = t(76),
                a = t(60);
            t(64), n.prototype = Object.create(i.prototype), n.prototype.render = function() {
                var t = this;
                this.updateDOM(), this.windowElement = this.mainElement.querySelector(".uiwindow"), this.buttonElement = this.windowElement.querySelector("button"), this.inputElement = this.windowElement.querySelector("input");
                var e = a.get("nick") || "";
                this.windowElement.querySelector("input").value = e, this.updateViewport(), this.buttonElement.onclick = function() {
                    t.onSave()
                }, this.inputElement.addEventListener("keypress", function(e) {
                    13 == e.keyCode && t.onSave()
                }), this.updateUserdata()
            }, n.prototype.update = function() {
                var t = 500 < Date.now() % 1e3;
                this.windowElement.querySelector(".blinkRed").classList[t ? "add" : "remove"]("red")
            }, n.prototype.setCallbacks = function(t) {
                this.callbacks = t
            }, n.prototype.setFocus = function(t) {
                this.windowElement.querySelector("input").focus()
            }, n.prototype.setAuth = function(t) {
                this.auth = t, this.updateUserdata()
            }, n.prototype.setError = function(t) {
                t = ["", "Name is not available anymore. Try another one!", "Name contains forbidden characters", "Name is too long (max. 16 characters)", "Name is too short (at least 3 characters)"][t], this.windowElement.querySelector(".txt2").style.display = "none", this.windowElement.querySelector(".error").textContent = t
            }, n.prototype.setUIState = function(t) {
                this.inputElement.disabled = !t, this.buttonElement.disabled = !t
            }, n.prototype.onSave = function() {
                this.setUIState(!1), this.registerRequest = {
                    nick: this.inputElement.value
                }, this.updateRegisterRequest()
            }, n.prototype.updateUserdata = function() {
                if (this.auth) {
                    var t = (this.auth.realName || "").split(" ")[0];
                    this.windowElement.querySelector(".avatar span.realname").textContent = t
                }
            }, n.prototype.updateRegisterRequest = function() {
                var t = this;
                this.registerRequest && (s.getState() ? (s.sendRegister(function(e) {
                    t.onResponse(e)
                }, this.registerRequest), this.registerRequest = null) : setTimeout(function() {
                    t.updateRegisterRequest()
                }, 500))
            }, n.prototype.onResponse = function(t) {
                0 == t ? location.reload() : (this.setError(t), this.setUIState(!0))
            }, n.prototype.updateViewport = function() {
                var t = 1,
                    e = Math.min(r.width - 50, 1.3 * (r.height - 50)),
                    i = e / 1.3;
                750 < e ? i = (e = 750) / 1.3 : t = e / 750, e = r.width / 2 - e / 2, i = r.height / 2 - i / 2, this.setElementPosition(this.windowElement, i, i, e, e), this.windowElement.style.fontSize = 18 * t + "px", this.currentScale = t
            }, e.exports = n
        }, {}],
        116: [function(t, e, i) {
            function n() {
                var t = this;
                this.init("settings", "settings"), this.noSoundOptionElement = this.regionOptionElements = this.regionSelectElement = this.ctrlCloseXElement = this.ctrlCancelElement = this.ctrlDoneElement = this.windowElement = null, this.data = {
                    regions: [],
                    currentRegion: null
                }, this.callbacks = this.currentGeoDetected = null, this.render(), l.onRegionUpdate(function(e, i) {
                    t.setRegions(e, i), e = r.ui.settingsWidget.getRegion(), l.onRegionUpdate(), h.onRegionUpdate(e)
                })
            }
            i = t(121);
            var r = t(54),
                s = t(95),
                a = t(60),
                o = t(57),
                l = t(76);
            t(133), t(130);
            var h = t(64);
            n.prototype = Object.create(i.prototype), n.prototype.setRegions = function(t, e) {
                function i(e) {
                    for (var i = 0; i < t.length; i++)
                        if (t[i].name == e) return !0;
                    return !1
                }
                if (this.data.regions = t, this.currentGeoDetected = e, i(this.data.currentRegion) || (this.data.currentRegion = null), !this.data.currentRegion) {
                    var n = a.get("region");
                    n && (i(n) || (n = null)), e && (i(e) || (e = null)), n ? this.data.currentRegion = n : e ? this.data.currentRegion = e : 0 < t.length && (this.data.currentRegion = t[0])
                }
                this.render()
            }, n.prototype.getRegion = function() {
                return this.data.currentRegion
            }, n.prototype.render = function() {
                var t = this;
                this.updateDOM(this.data), this.windowElement = this.mainElement.querySelector(".uiwindow"), this.ctrlDoneElement = this.mainElement.querySelector(".settings .ctrl button.done"), this.ctrlCancelElement = this.mainElement.querySelector(".settings .ctrl button.cancel"), this.ctrlCloseXElement = this.mainElement.querySelector(".settings .closeX"), this.regionSelectElement = this.mainElement.querySelector(".settings select"), this.regionOptionElements = this.mainElement.querySelectorAll(".settings select option"), this.noSoundOptionElement = this.mainElement.querySelector("#optionGameNoSound"), this.lowGfxOptionElement = this.mainElement.querySelector("#optionGameLowGfx");
                for (var e = 0; e < this.regionOptionElements.length; e++) this.regionOptionElements[e].value == this.data.currentRegion && (this.regionOptionElements[e].selected = !0);
                this.noSoundOptionElement.checked = !!a.get("noSound"), this.lowGfxOptionElement.checked = !!a.get("lowGfx"), this.ctrlDoneElement.onclick = function() {
                    t.onClose(!0)
                }, this.ctrlCancelElement.onclick = function() {
                    t.onClose(!1)
                }, this.ctrlCloseXElement.onclick = function() {
                    t.onClose(!1)
                }, this.updateViewport()
            }, n.prototype.setCallbacks = function(t) {
                this.callbacks = t
            }, n.prototype.onClose = function(t) {
                if (t) {
                    var e = t = this.regionOptionElements[this.regionSelectElement.selectedIndex].value;
                    if (this.data.currentRegion = t, e == this.currentGeoDetected) e = null;
                    else if (!confirm("Caution: You selected a region, that doesn't fit your location. This may cause LAGS and DISCONNECTS.\nAre you sure?")) return;
                    a.set("region", e), a.set("noSound", !!this.noSoundOptionElement.checked), a.set("lowGfx", !!this.lowGfxOptionElement.checked)
                }
                this.callbacks && this.callbacks.onClose()
            }, n.prototype.update = function() {
                o.isHit(27) && this.onClose(!1)
            }, n.prototype.updateViewport = function() {
                if (r.ui) {
                    var t = 50 + r.ui.getSidebarMargin(),
                        e = 1,
                        i = Math.min(s.width - t, 1.45 * (s.height - 50));
                    t = i / 1.45, 750 < i ? t = (i = 750) / 1.45 : e = i / 750, i = s.width / 2 - i / 2, t = s.height / 2 - t / 2, this.setElementPosition(this.windowElement, t, t, i, i), this.windowElement.style.fontSize = 18 * e + "px", this.currentScale = e
                }
            }, e.exports = n
        }, {}],
        117: [function(t, e, i) {
            function n() {
                var t = this;
                this.init("sidebar", "sidebar"), this.data = {}, this.dirty = !0, this.onLogout = null, this.notificationCounts = {
                    friendRequests: 0,
                    messages: 0
                }, this.initNotificationHandler(), this.initFriendlist(), window.addEventListener("resize", function() {
                    setTimeout(function() {
                        t.updateSizingLeft(), t.updateSizingRight()
                    }, 0)
                }), this.render()
            }
            i = t(121);
            var r = t(95),
                s = t(76),
                a = t(54),
                o = t(132),
                l = t(128),
                h = t(64),
                c = t(27),
                u = t(80);
            n.prototype = Object.create(i.prototype), n.prototype.render = function() {
                function t(t, i) {
                    e.sectionLogin.querySelector("a." + t).onclick = function() {
                        location.href = i
                    }
                }
                var e = this;
                if (this.active && this.dirty) {
                    this.dirty = !1, this.updateDOM(this.data), this.updateViewport(), this.sectionPlayer = this.mainElement.querySelector(".barSection.player"), this.sectionLogin = this.mainElement.querySelector(".barSection.login"), t("loginFB", "/auth/facebook"), t("loginGoogle", "/auth/google"), this.initSocial(), this.initTooltip(this.sectionPlayer.querySelector(".playerProgress"));
                    var i = this.sectionPlayer.querySelector(".achievements");
                    if (a.texCup) {
                        var n = i.querySelector("canvas.cup");
                        a.texCup.draw(n.getContext("2d"), 0, 0, 0, 0, 2, 2)
                    }
                    i.onclick = function() {
                        a.ui.achievementWidget.setActive(!0), a.ui.achievementWidget.onClose(function() {
                            a.ui.setAd("300", !0), a.ui.setAd("728", !0)
                        }), a.ui.setAd("300", !1), a.ui.setAd("728", !1)
                    }.bind(this), this.sectionPlayer.querySelector("a.logout").onclick = function(t) {
                        t.preventDefault(), e.onLogout()
                    }, e.data.auth && (i = function(t) {
                        t.preventDefault(), h.goToUrl("/profile/" + e.data.auth.name)
                    }, this.sectionPlayer.querySelector("canvas").onclick = i, this.sectionPlayer.querySelector(".welcome a").onclick = i), this.mainElement.classList[this.data.auth ? "add" : "remove"]("loggedIn"), this.initNotification("messages", function() {
                        h.goToUrl("/messages")
                    }), this.initNotification("friendrequests", function() {
                        h.goToUrl("/friendrequests")
                    }), this.updateNotifications(), u.updateDetails(this.sectionPlayer), this.renderFriendlist(), this.updateSizingLeft(), this.updateSizingRight()
                }
            }, n.prototype.updateViewport = function() {
                for (var t = this.mainElement.querySelectorAll("div.bar"), e = 0; e < t.length; e++) t[e].style.height = r.height + "px"
            }, n.prototype.setAuth = function(t, e) {
                if (this.data.auth = t, this.onLogout = e, t) {
                    var i = (e = o.getXpBreakdown(t.xp)).xp,
                        n = o.getXPAtLevel(e.level),
                        r = i / n * 100,
                        s = o.getLevelRange(e.level);
                    t.level = e.level, t.levelClass = "lr" + s, t.xpCur = i, t.xpMax = n, t.xpPercent = parseFloat(r).toFixed(1), a.ui.achievementWidget.setEarned(t.achievements), this.dirty = !0, this.render()
                }
            }, n.prototype.initSocial = function(t, e, i) {
                try {
                    if ("dev" != kugelnVersion) {
                        if (window.twttr) twttr.widgets.load();
                        else var n = setInterval(function() {
                            window.twttr && (twttr.widgets.load(), clearInterval(n))
                        }, 2e3);
                        if (window.gapi && window.gapi.ytsubscribe) gapi.ytsubscribe.go();
                        else var r = setInterval(function() {
                            window.gapi && window.gapi.ytsubscribe && (gapi.ytsubscribe.go(), clearInterval(r))
                        }, 2e3);
                        if (window.FB && FB.XFBML) FB.XFBML.parse();
                        else var s = setInterval(function() {
                            window.FB && FB.XFBML && (FB.XFBML.parse(), clearInterval(s))
                        }, 2e3)
                    }
                } catch (t) {}
            }, n.prototype.initTooltip = function(t, e, i) {
                var n = e || t.querySelector(".tooltip");
                t.onmouseenter = function(t) {
                    n.style.display = "block"
                }, t.onmouseleave = function(t) {
                    n.style.display = "none"
                }, t.onmousemove = function(e) {
                    if (i) e = [e.pageX, e.pageY];
                    else {
                        var r = t.getBoundingClientRect();
                        e = [e.pageX - r.left, e.pageY - r.top]
                    }
                    n.style.left = e[0] + 5 + "px", n.style.top = e[1] + 5 + "px"
                }
            }, n.prototype.initNotificationHandler = function() {
                var t = this;
                s.onSocialMessage("notificationUpdate", function(e) {
                    t.notificationCounts = e, t.updateNotifications()
                })
            }, n.prototype.initNotification = function(t, e) {
                this.mainElement.querySelector(".barSection.notifications .notification." + t).onclick = e
            }, n.prototype.setNotification = function(t, e, i) {
                (t = this.mainElement.querySelector(".barSection.notifications .notification." + t).querySelector(".number")).className = "number bg" + i, t.querySelector(".v").textContent = e
            }, n.prototype.updateNotifications = function() {
                this.setNotification("friendrequests", this.notificationCounts.friendRequests, 0 < this.notificationCounts.friendRequests ? "Red" : "Gray"), this.setNotification("messages", this.notificationCounts.messages, 0 < this.notificationCounts.messages ? "Red" : "Gray")
            }, n.prototype.initFriendlist = function() {
                var t = this;
                c.onRelationListUpdate(function() {
                    t.renderFriendlist()
                })
            }, n.prototype.renderFriendlist = function() {
                function t(t, n, r, s) {
                    if (0 < r.length) {
                        var a = document.createElement("div"),
                            o = document.createElement("h3");
                        for (a.className = "headline", o.textContent = n, a.appendChild(o), t.appendChild(a), s && ((n = document.createElement("div")).className = "search uiIcon searchWhite", a.appendChild(n), n.onclick = i), a = 0; a < r.length; a++) e(t, r[a].playerName)
                    }
                }

                function e(t, e) {
                    var i = document.createElement("div"),
                        n = document.createElement("canvas"),
                        r = document.createElement("div"),
                        s = document.createElement("div");
                    t.appendChild(i), i.appendChild(n), i.appendChild(r), i.appendChild(s), i.classList.add("relation"), r.classList.add("name"), n.classList.add("playerDetail"), r.textContent = e, n.setAttribute("width", 64), n.setAttribute("height", 64), n.dataset.type = "avatar", n.dataset.player = e, s.innerHTML = '<span class="uiIcon messageWhite"></span>', s.classList.add("button", "btnMsg"), s.onclick = function(t) {
                        t.stopPropagation(), h.goToUrl("/messages", {
                            to: e
                        })
                    }, i.onclick = function() {
                        h.goToUrl("/profile/" + e)
                    }
                }

                function i() {
                    h.goToUrl("/search")
                }
                var n = c.getRelationList(),
                    r = this.mainElement.querySelector(".friends"),
                    s = r.querySelector(".area");
                r = r.querySelector(".noFriends"), s.innerHTML = "";
                for (var a = [], o = [], p = 0; p < n.length; p++) switch (n[p].type) {
                    case l.Friends:
                        a.push(n[p]);
                        break;
                    case l.FriendRequestOutgoing:
                        o.push(n[p])
                }
                t(s, "Friends", a, !0), t(s, "Pendings requests", o, !1), n = 0 < a.length + o.length, s.style.display = n ? "block" : "none", r.style.display = n ? "none" : "block", u.updateDetails(this.mainElement), r.querySelector("button").onclick = i
            }, n.prototype.updateSizingLeft = function() {
                for (var t = this.mainElement.querySelector(".left.bar"), e = t.children, i = t.getBoundingClientRect().height, n = 0, r = 0; r < e.length; r++) e[r].classList.contains("friends") || (n += e[r].getBoundingClientRect().height);
                e = i - n - 20, t.querySelector(".barSection.friends").style.height = e + "px"
            }, n.prototype.updateSizingRight = function() {
                var t = this.mainElement.querySelector(".right.bar"),
                    e = t.children;
                t = t.getBoundingClientRect().height - 210;
                for (var i = 0, n = 0; n < e.length; n++)(e[n].classList.contains("barSection") || e[n].classList.contains("hr")) && (i += e[n].getBoundingClientRect().height, e[n].style.visibility = i <= t ? "visible" : "hidden")
            }, e.exports = n
        }, {}],
        118: [function(t, e, i) {
            function n() {
                this.init("stats", "stats nativeInput blockGameInput"), this.dataRemainingSeconds = this.renderCounter = 0, this.dataOwnPid = -1, this.dataGameTypeLong = this.dataGameTypeShort = "", this.dataTeamScore = null, this.dataHasTeams = !1, this.dataPlayers = null
            }
            i = t(121);
            var r = t(95),
                s = t(131),
                a = t(150);
            n.prototype = Object.create(i.prototype), n.prototype.setOwnPid = function(t) {
                this.dataOwnPid = t
            }, n.prototype.setRemainingSeconds = function(t) {
                this.dataRemainingSeconds != t && (this.dataRemainingSeconds = t)
            }, n.prototype.setTeamScore = function(t) {
                this.dataTeamScore = t
            }, n.prototype.setGameType = function(t, e, i) {
                this.dataGameTypeShort = t, this.dataGameTypeLong = e, this.dataHasTeams = i
            }, n.prototype.updatePlayerList = function(t) {
                this.dataPlayers = [];
                for (var e = 0; e < t.length; e++) {
                    var i = t[e],
                        n = i.get("uniqueName");
                    this.dataPlayers.push({
                        pid: i.id,
                        nick: i.get("name"),
                        uniqueName: "" != n ? n : null,
                        statsDeath: i.get("statsDeath"),
                        statsKills: i.get("statsKills"),
                        statsScore: i.get("statsScore"),
                        team: i.get("team"),
                        loggedIn: 0 < i.get("level")
                    })
                }
            }, n.prototype.update = function() {
                this.renderCounter++, 0 == this.renderCounter % 20 && this.render()
            }, n.prototype.render = function() {
                function t(t, n, r) {
                    i.teams[t] = {
                        teamClass: -1 == t ? "teamN" : "team" + t,
                        teamName: n,
                        teamScore: -1 == t ? e.dataTeamScore[0] : e.dataTeamScore[t],
                        list: []
                    }, n = [];
                    for (var s = 0; s < e.dataPlayers.length; s++)
                        if (-1 == t || e.dataPlayers[s].team - 1 == t) {
                            var o = e.dataPlayers[s].uniqueName,
                                l = 0;
                            e.dataPlayers[s].loggedIn && (l = o == e.dataPlayers[s].nick ? 1 : 2), n.push({
                                nameType0: 0 == l,
                                nameType1: 1 == l,
                                nameType2: 2 == l,
                                name: e.dataPlayers[s].nick,
                                uniqueName: "" != o ? o : null,
                                kills: e.dataPlayers[s].statsKills,
                                death: e.dataPlayers[s].statsDeath,
                                score: e.dataPlayers[s].statsScore,
                                rowClass: r == e.dataPlayers[s].pid ? "highlight" : ""
                            })
                        } for (n.sort(function(t, e) {
                            return t.score < e.score ? 1 : t.score > e.score ? -1 : 0
                        }), r = (-1 == t ? 2 * a.maxTeamSize : a.maxTeamSize) - n.length, s = 0; s < r; s++) n.push({
                        name: "-",
                        kills: "-",
                        death: "-",
                        score: "-"
                    });
                    i.teams[t].list = n
                }
                var e = this;
                if (null != this.dataPlayers && null != this.dataTeamScore && "" != this.dataGameTypeShort) {
                    var i = {
                        remainingSeconds: s.lpad(~~(this.dataRemainingSeconds / 60), 2) + ":" + s.lpad(this.dataRemainingSeconds % 60, 2),
                        gameTypeShort: this.dataGameTypeShort,
                        gameTypeLong: this.dataGameTypeLong,
                        teams: {}
                    };
                    if (this.dataHasTeams)
                        for (var n = 0; 2 > n; n++) t(n, 0 == n ? "Team Red" : "Team Blue", this.dataOwnPid);
                    else t(-1, "Total", this.dataOwnPid);
                    this.updateDOM(i), this.updateViewport();
                    var r = this.mainElement.querySelectorAll("a.profile");
                    for (n = 0; n < r.length; n++) r[n].onmousedown = function() {
                        location.href = this.getAttribute("href")
                    }.bind(r[n])
                }
            }, n.prototype.updateViewport = function() {
                var t = 1,
                    e = Math.min(r.width - 100, 1.25 * (r.height - 60)),
                    i = e / 1.25;
                800 < e ? i = (e = 800) / 1.25 : t = e / 800, e = r.width / 2 - e / 2, i = r.height / 2 - i / 2, this.setElementPosition(this.mainElement, i, i, e, e), this.mainElement.style.fontSize = 24 * t + "px"
            }, e.exports = n
        }, {}],
        119: [function(t, e, i) {
            function n() {
                this.init("title", "title"), this.playerselectElement = this.ballSearchElement = this.ballListInnerElement = this.ballListElement = this.settingsButtonElement = this.customMatchButtonElement = this.customizeElement = this.previewElement = this.formElement = this.windowElement = null, this.selectedBall = new h, this.previewBall = null, this.initialRendered = !1, this.ballList = null, this.liteMode = !1, this.liteModeMatchId = "", this.currentScale = 1, this.callbacks = this.authData = null, this.render(), "kugeln.io" == location.host && document.body.classList.add("beta")
            }
            i = t(121);
            var r = t(54);
            t(152);
            var s = t(47),
                a = t(95);
            t(76), t(132);
            var o = t(60),
                l = t(57);
            t(19);
            var h = t(127);
            n.prototype = Object.create(i.prototype), n.prototype.setCallbacks = function(t) {
                this.callbacks = t
            }, n.prototype.setLiteMode = function(t) {
                this.liteMode = t, this.windowElement.classList[t ? "add" : "remove"]("liteMode"), this.windowElement.querySelector(".matchHint .value").textContent = this.liteModeMatchId
            }, n.prototype.setBall = function(t) {
                this.selectedBall = t, this.updateSelectedBall()
            }, n.prototype.setLiteModeMatchId = function(t) {
                this.liteModeMatchId = t, this.setLiteMode(this.liteMode)
            }, n.prototype.setFocus = function() {
                this.formElement.querySelector("input.nickname").focus()
            }, n.prototype.setHighscore = function(t) {
                function e(t) {
                    i.callbacks.onGoToProfile(this.player)
                }
                if (t) {
                    var i = this,
                        n = this.mainElement.querySelector(".highscore"),
                        r = n.querySelector(".table");
                    r.innerHTML = "";
                    for (var s = 0; s < t.table.length; s++) {
                        var a = t.table[s],
                            o = "";
                        o += '<div class="place">' + (s + 1) + "</div>", o += '<div class="name">' + a.player + "</div>", o += '<div class="xp">' + a.xp + "</div>";
                        var l = document.createElement("div");
                        l.classList.add("item"), l.innerHTML = o, l.onclick = e.bind(a), r.appendChild(l), t.position == s + 1 && l.classList.add("self")
                    }
                    r = !1, 0 < t.position && (r = !0, n.querySelector(".yourscore .v").textContent = t.position), n.querySelector(".yourscore").style.display = r ? "block" : "none", n.querySelector(".motivationPlay").style.display = !r && this.authData ? "block" : "none", n.querySelector(".motivationLogin").style.display = r || this.authData ? "none" : "block", n.querySelector(".more").onclick = function(t) {
                        i.callbacks.onGoToHighscore()
                    }
                }
            }, n.prototype.blur = function() {
                this.formElement.querySelector("input.nickname").blur()
            }, n.prototype.render = function() {
                var t = this;
                this.initialRendered || (this.initialRendered = !0, this.updateDOM({}), this.windowElement = this.mainElement.querySelector(".uiwindow"), this.formElement = this.windowElement.querySelector("form"), this.customizeElement = this.windowElement.querySelector(".customize"), this.customMatchButtonElement = this.windowElement.querySelector(".customMatch"), this.settingsButtonElement = this.windowElement.querySelector(".settings"), this.playerselectElement = this.windowElement.querySelector(".playerselect"), this.previewElement = this.playerselectElement.querySelector("canvas.preview"), this.formElement.onsubmit = function(e) {
                    e.preventDefault(), t.updateNickname(), t.callbacks.onPlay()
                }, this.customMatchButtonElement.onclick = function(e) {
                    return e.preventDefault(), t.updateNickname(), t.callbacks.onCustomMatch(), !1
                }, this.customizeElement.onclick = function(e) {
                    return e.preventDefault(), t.callbacks.onCustomize(), !1
                }, this.settingsButtonElement.onclick = function(e) {
                    return e.preventDefault(), t.callbacks.onSettings(), !1
                }, this.setLiteMode(this.liteMode), this.setNick(), setTimeout(function() {
                    r.ui.browserWarningWidget.setActive(!0)
                }, 50), this.updateViewport())
            }, n.prototype.setAuth = function(t) {
                this.authData = t, this.setNick()
            }, n.prototype.setNick = function() {
                var t;
                (t = this.authData && "" != this.authData.name ? this.authData.name : o.get("nick")) && (this.formElement.querySelector("input.nickname").value = t)
            }, n.prototype.initAdbHint = function() {
                this.hasAdBlock() && (this.mainElement.querySelector(".extAdBox .adbhint").style.display = "block")
            }, n.prototype.hasAdBlock = function() {
                return !window.adsJsLoaded
            }, n.prototype.initPreview = function() {
                this.previewBall = new s(this.previewElement, 128, 256, !0, this.selectedBall), this.previewBall.setViewingDirection(0, 1.2)
            }, n.prototype.update = function() {
                this.updatePreview()
            }, n.prototype.updatePreview = function(t) {
                this.previewBall || this.initPreview(), t = this.previewBall;
                var e = l.getAbsoluteMousePos(),
                    i = 0;
                if (0 < e.length) {
                    var n = t.targetCanvas.getBoundingClientRect();
                    i = e[0] - (n.left + n.width / 2), n = e[1] - (n.top + n.height / 2), e = Math.atan2(n, i), n = Math.min(Math.sqrt(i * i + n * n) / 100, 1.5), i = 1
                } else n = 1, e = -3;
                .9 > n ? (t.setEye(13), i = 0) : 5 > r.frameCounter % 300 ? t.setEye(9) : t.setEye(14), t.setViewingDirection(e, n, i), t.render()
            }, n.prototype.updateSelectedBall = function() {
                this.previewBall && this.previewBall.setCustomization(this.selectedBall)
            }, n.prototype.updateNickname = function() {
                if (this.callbacks.onNicknameChange) {
                    var t = this.formElement.querySelector("input.nickname").value;
                    this.callbacks.onNicknameChange(t)
                }
            }, n.prototype.updateViewport = function() {
                if (r.ui) {
                    var t = 50 + r.ui.getSidebarMargin(),
                        e = -.1 * (a.height - 600),
                        i = 1,
                        n = Math.min(a.width - t, .92 * (a.height - 0));
                    t = n / .92, 605 < n ? t = (n = 605) / .92 : i = n / 605, n = a.width / 2 - n / 2, this.setElementPosition(this.windowElement, a.height / 2 - t / 2 + e, a.height / 2 - t / 2 - e, n, n), this.windowElement.style.fontSize = 18 * i + "px", this.currentScale = i, this.playerselectElement.style.display = "block", r.ui && r.ui.hintsWidget && r.ui.hintsWidget.setView([a.width / 2, .8 * a.height], i)
                }
            }, e.exports = n
        }, {}],
        120: [function(t, e, i) {
            function n() {
                this.init("toast", "toast"), this.dataInputHelpText = this.dataUsableType = "", this.dirty = !0, this.showState = {}, this.render()
            }
            i = t(121);
            var r = t(95),
                s = t(54);
            n.prototype = Object.create(i.prototype), n.prototype.show = function(t, e) {
                this.showState[t] != e && (this.dirty = !0), this.showState[t] = e, this.updateActive(), this.render()
            }, n.prototype.updateActive = function() {
                var t, e = !1;
                for (t in this.showState) this.showState[t] && (e = !0);
                2 == s.ui.uiState && (e = !1), this.setActive(e)
            }, n.prototype.render = function() {
                if (this.dirty) {
                    if (this.dirty = !1, this.updateDOM({
                            usableMsg: 'Press <span class="key">E</span> to use ' + this.dataUsableType,
                            inputhelpMsg: this.dataInputHelpText
                        }), this.showState.stalling)
                        for (var t in this.showState) "stalling" != t && (this.showState[t] = !1);
                    for (t in this.showState) this.mainElement.querySelector(".type_" + t).style.display = this.showState[t] ? "block" : "none";
                    this.updateViewport()
                }
            }, n.prototype.updateViewport = function() {
                this.mainElement.querySelector(".type_usable").style.top = .7 * r.height + "px", this.mainElement.querySelector(".type_inputhelp").style.bottom = "30px", this.mainElement.querySelector(".type_stalling").style.top = "70%"
            }, e.exports = n
        }, {}],
        121: [function(t, e, i) {
            function n() {
                this.mainElement = null, this.name = name, this.template = null, this.active = !0
            }
            n.prototype.init = function(t, e) {
                this.template = t, this.name = e || t, this.updateDOM()
            }, n.prototype.setActive = function(t) {
                this.active != t && (this.active != t && (this.active = t) && this.render(), this.mainElement.style.display = t ? "block" : "none", this.updateViewport())
            }, n.prototype.updateDOM = function(t) {
                t = t || {}, t = this.execTemplate(this.template, t);
                var e = document.getElementById("uiOverlay"),
                    i = document.createElement("div");
                i.className = "widget " + this.name, i.innerHTML = t, this.mainElement ? e.replaceChild(i, this.mainElement) : e.appendChild(i), this.mainElement = i, this.mainElement.style.display = this.active ? "block" : "none"
            }, n.prototype.getByClass = function(t) {
                return this.mainElement.getElementsByClassName(t)
            }, n.prototype.execTemplate = function(t, e) {
                return Handlebars.templates[t](e)
            }, n.prototype.setElementPosition = function(t, e, i, n, r) {
                t.style.top = e + "px", t.style.bottom = i + "px", t.style.left = n + "px", t.style.right = r + "px"
            }, n.prototype.render = function() {}, n.prototype.update = function() {}, n.prototype.updateViewport = function(t, e) {}, e.exports = n
        }, {}],
        122: [function(t, e, i) {
            (function(i) {
                var n = t("kugelkrieg-native-quadtree");
                e.exports = function(t) {
                    var e = new i(524288),
                        r = new n(t);
                    this.levels = r.levels, this.reset = function() {
                        r = new n(t)
                    }, this.setValue = function(t, e, i, n) {
                        r.setValue(t, e, i, n)
                    }, this.getValue = function(t, e) {
                        return r.getValue(t, e)
                    }, this.setCircle = function(t, e, i, n, s) {
                        r.setCircle(t, e, i, n, s)
                    }, this.findFirstOnLine = function(t, e, i, n, s, a) {
                        return r.findFirstOnLine(t, e, i, n, s, a)
                    }, this.findInCircle = function(t, i, n, s, a) {
                        for (t = r.findInCircle(t, i, n, s, a, e), i = [], n = 0; n < t; n++) s = e.readInt32LE(8 * n), a = e.readInt32LE(8 * n + 4), i.push([s, a]);
                        return i
                    }, this.serialize = function(t) {
                        return r.serialize(t)
                    }, this.unserialize = function() {
                        throw Error("Not available for native quadtree")
                    }, this.update = function() {
                        r.update()
                    }, this.destroy = function() {
                        r.destroy()
                    }
                }
            }).call(this, t(3).Buffer)
        }, {}],
        123: [function(t, e, i) {
            void 0 !== i && (i.getCurvePoints = function(t, e, i, n) {
                function r(t, e, n, r) {
                    for (var s, a = 2; a < n; a += 2) {
                        var h = t[a],
                            c = t[a + 1],
                            u = t[a + 2],
                            p = t[a + 3],
                            d = (u - t[a - 2]) * r,
                            f = (p - t[a - 1]) * r,
                            m = (t[a + 4] - h) * r,
                            g = (t[a + 5] - c) * r,
                            v = 0;
                        for (s = 0; s < i; s++) {
                            var y = e[v++],
                                x = e[v++],
                                b = e[v++],
                                w = e[v++];
                            l[o++] = y * h + x * u + b * d + w * m, l[o++] = y * c + x * p + b * f + w * g
                        }
                    }
                }
                if (void 0 === t || 2 > t.length) return new Float32Array(0);
                e = "number" == typeof e ? e : .5, i = "number" == typeof i ? i : 25;
                var s = 1,
                    a = t.length,
                    o = 0,
                    l = new Float32Array((a - 2) * i + 2 + (n ? 2 * i : 0)),
                    h = new Float32Array(i + 2 << 2),
                    c = 4,
                    u = t.slice(0);
                for (n ? (u.unshift(t[a - 1]), u.unshift(t[a - 2]), u.push(t[0], t[1])) : (u.unshift(t[1]), u.unshift(t[0]), u.push(t[a - 2], t[a - 1])), h[0] = 1; s < i; s++) {
                    var p = s / i,
                        d = p * p,
                        f = d * p,
                        m = 2 * f,
                        g = 3 * d;
                    h[c++] = m - g + 1, h[c++] = g - m, h[c++] = f - 2 * d + p, h[c++] = f - d
                }
                return h[++c] = 1, r(u, h, a, e), n && ((u = []).push(t[a - 4], t[a - 3], t[a - 2], t[a - 1], t[0], t[1], t[2], t[3]), r(u, h, 4, e)), a = n ? 0 : t.length - 2, l[o++] = t[a++], l[o] = t[a], l
            })
        }, {}],
        124: [function(t, e, i) {
            e.exports = {
                1: {
                    name: "Bad Amor",
                    desc: "Kill 10 balls with arrow",
                    min: {
                        killsWithWeapon_4: 10
                    }
                },
                2: {
                    name: "Lumberjack",
                    desc: "Cut down 20 trees",
                    min: {
                        treesCut: 20
                    }
                },
                3: {
                    name: "Robin Hood",
                    desc: "Kill 50 balls with arrow",
                    min: {
                        killsWithWeapon_4: 50
                    }
                },
                4: {
                    name: "Fun With Flags",
                    desc: "Pick up flag 10 times",
                    min: {
                        flagPickup: 10
                    }
                },
                5: {
                    name: "Standard Bearer",
                    desc: "Pick up flag 50 times",
                    min: {
                        flagPickup: 50
                    }
                },
                6: {
                    name: "Picnic blanket",
                    desc: "Capture the flag 10 times",
                    min: {
                        flagCapture: 10
                    }
                },
                7: {
                    name: "Flag Master",
                    desc: "Capture the flag 50 times",
                    min: {
                        flagCapture: 50
                    }
                },
                8: {
                    name: "Perkele",
                    desc: "Win a team match as Finlandball",
                    min: {
                        teamWinAsBall_fi: 1
                    }
                },
                9: {
                    name: "8.8cm guy",
                    desc: "Shoot down a plane(ingame only)",
                    min: {
                        planesKilled: 1
                    }
                },
                10: {
                    name: "Come in, big bird",
                    desc: "Shoot down 20 planes",
                    min: {
                        planesKilled: 20
                    }
                },
                11: {
                    name: "Can into space",
                    desc: "Fly into space",
                    min: {
                        inSpace: 1
                    }
                }
            }
        }, {}],
        125: [function(t, e, i) {
            e.exports = [{
                c: "ad",
                n: "Andorra"
            }, {
                c: "ae",
                n: "United Arab Emirates",
                b: "UAEball",
                s: 170
            }, {
                c: "af",
                n: "Afghanistan"
            }, {
                c: "ag",
                n: "Antigua and Barbuda"
            }, {
                c: "ai",
                n: "Anguilla"
            }, {
                c: "al",
                n: "Albania"
            }, {
                c: "am",
                n: "Armenia"
            }, {
                c: "ao",
                n: "Angola"
            }, {
                c: "aq",
                n: "Antarctica"
            }, {
                c: "ar",
                n: "Argentina",
                s: 342
            }, {
                c: "as",
                n: "American Samoa"
            }, {
                c: "at",
                n: "Austria",
                s: 288
            }, {
                c: "au",
                n: "Australia",
                s: 954
            }, {
                c: "aw",
                n: "Aruba"
            }, {
                c: "ax",
                n: "Åland Islands",
                b: "Ålandball"
            }, {
                c: "az",
                n: "Azerbaijan"
            }, {
                c: "ba",
                n: "Bosnia and Herzegovina"
            }, {
                c: "bb",
                n: "Barbados"
            }, {
                c: "bd",
                n: "Bangladesh"
            }, {
                c: "be",
                n: "Belgium",
                s: 347
            }, {
                c: "bf",
                n: "Burkina Faso"
            }, {
                c: "bg",
                n: "Bulgaria"
            }, {
                c: "bh",
                n: "Bahrain"
            }, {
                c: "bi",
                n: "Burundi"
            }, {
                c: "bj",
                n: "Benin"
            }, {
                c: "bm",
                n: "Bermuda",
                b: "Bermudatriangle"
            }, {
                c: "bn",
                n: "Brunei"
            }, {
                c: "bo",
                n: "Bolivia"
            }, {
                c: "br",
                n: "Brazil",
                s: 912
            }, {
                c: "bs",
                n: "Bahamas"
            }, {
                c: "bt",
                n: "Bhutan"
            }, {
                c: "bv",
                n: "Bouvet Island"
            }, {
                c: "bw",
                n: "Botswana"
            }, {
                c: "by",
                n: "Belarus"
            }, {
                c: "bz",
                n: "Belize"
            }, {
                c: "ca",
                n: "Canada",
                s: 1303
            }, {
                c: "cc",
                n: "Cocos Islands",
                b: "Cocos Islandball"
            }, {
                c: "cd",
                n: "Democratic Republic of the Congo"
            }, {
                c: "cf",
                n: "Central African Republic"
            }, {
                c: "cg",
                n: "Republic of the Congo"
            }, {
                c: "ch",
                n: "Switzerland",
                s: 569
            }, {
                c: "ci",
                n: "Ivory Coast"
            }, {
                c: "ck",
                n: "Cook Islands"
            }, {
                c: "cl",
                n: "Chile",
                s: 152
            }, {
                c: "cm",
                n: "Cameroon"
            }, {
                c: "cn",
                n: "China",
                s: 5531
            }, {
                c: "co",
                n: "Colombia",
                s: 134
            }, {
                c: "cr",
                n: "Costa Rica"
            }, {
                c: "cu",
                n: "Cuba"
            }, {
                c: "cv",
                n: "Cabo Verde"
            }, {
                c: "cw",
                n: "Curaçao"
            }, {
                c: "cx",
                n: "Christmas Island"
            }, {
                c: "cy",
                n: "Cyprus"
            }, {
                c: "cz",
                n: "Czech Republic",
                b: "Czechiaball",
                s: 136
            }, {
                c: "de",
                n: "Germany",
                s: 2811
            }, {
                c: "dj",
                n: "Djibouti"
            }, {
                c: "dk",
                n: "Denmark",
                s: 270
            }, {
                c: "dm",
                n: "Dominica"
            }, {
                c: "do",
                n: "Dominican Republic"
            }, {
                c: "dz",
                n: "Algeria"
            }, {
                c: "ec",
                n: "Ecuador"
            }, {
                c: "ee",
                n: "Estonia"
            }, {
                c: "eg",
                n: "Egypt",
                s: 145
            }, {
                c: "eh",
                n: "Western Sahara"
            }, {
                c: "er",
                n: "Eritrea"
            }, {
                c: "es",
                n: "Spain",
                s: 966
            }, {
                c: "et",
                n: "Ethiopia"
            }, {
                c: "$eu",
                n: "European Union",
                b: "EUball"
            }, {
                c: "fi",
                n: "Finland",
                s: 203
            }, {
                c: "fj",
                n: "Fiji"
            }, {
                c: "fk",
                n: "Falkland Islands",
                b: "Falklandsball"
            }, {
                c: "fm",
                n: "Micronesia"
            }, {
                c: "fo",
                n: "Faroe Islands"
            }, {
                c: "fr",
                n: "France",
                s: 1948
            }, {
                c: "ga",
                n: "Gabon"
            }, {
                c: "gb",
                n: "United Kingdom of Great Britain and Northern Ireland",
                b: "UKball",
                s: 2565
            }, {
                c: "gd",
                n: "Grenada"
            }, {
                c: "ge",
                n: "Georgia"
            }, {
                c: "gf",
                n: "French Guiana"
            }, {
                c: "gg",
                n: "Guernsey"
            }, {
                c: "gh",
                n: "Ghana"
            }, {
                c: "gi",
                n: "Gibraltar"
            }, {
                c: "gl",
                n: "Greenland"
            }, {
                c: "gm",
                n: "Gambia"
            }, {
                c: "gn",
                n: "Guinea"
            }, {
                c: "gp",
                n: "Guadeloupe"
            }, {
                c: "gq",
                n: "Equatorial Guinea"
            }, {
                c: "gr",
                n: "Greece",
                s: 113
            }, {
                c: "gs",
                n: "South Georgia and the South Sandwich Islands"
            }, {
                c: "gt",
                n: "Guatemala"
            }, {
                c: "gu",
                n: "Guam"
            }, {
                c: "gw",
                n: "Guinea-Bissau"
            }, {
                c: "gy",
                n: "Guyana"
            }, {
                c: "hk",
                n: "Hong Kong",
                s: 221
            }, {
                c: "hm",
                n: "Heard Island and McDonald Islands"
            }, {
                c: "hn",
                n: "Honduras"
            }, {
                c: "hr",
                n: "Croatia"
            }, {
                c: "ht",
                n: "Haiti"
            }, {
                c: "hu",
                n: "Hungary"
            }, {
                c: "id",
                n: "Indonesia",
                s: 266
            }, {
                c: "ie",
                n: "Ireland"
            }, {
                c: "il",
                n: "Israel",
                b: "Israelcube",
                s: 194,
                t: 1
            }, {
                c: "im",
                n: "Isle of Man"
            }, {
                c: "in",
                n: "India",
                s: 678
            }, {
                c: "io",
                n: "British Indian Ocean Territory"
            }, {
                c: "iq",
                n: "Iraq"
            }, {
                c: "ir",
                n: "Iran",
                s: 126
            }, {
                c: "is",
                n: "Iceland"
            }, {
                c: "it",
                n: "Italy",
                s: 1072
            }, {
                c: "je",
                n: "Jersey"
            }, {
                c: "jm",
                n: "Jamaica"
            }, {
                c: "jo",
                n: "Jordan"
            }, {
                c: "jp",
                n: "Japan",
                s: 3564
            }, {
                c: "ke",
                n: "Kenya"
            }, {
                c: "kg",
                n: "Kyrgyzstan"
            }, {
                c: "kh",
                n: "Cambodia"
            }, {
                c: "ki",
                n: "Kiribati"
            }, {
                c: "km",
                n: "Comoros"
            }, {
                c: "kn",
                n: "Saint Kitts and Nevis",
                b: "St. Kitts and Nevisball"
            }, {
                c: "kp",
                n: "North Korea"
            }, {
                c: "kr",
                n: "South Korea",
                s: 1141
            }, {
                c: "ku",
                n: "Kurdistan"
            }, {
                c: "kw",
                n: "Kuwait"
            }, {
                c: "ky",
                n: "Cayman Islands",
                b: "Cayman Islandball"
            }, {
                c: "kz",
                n: "Kazakhstan",
                b: "Kazakhbrick",
                s: 105,
                t: 1
            }, {
                c: "la",
                n: "Laos"
            }, {
                c: "lb",
                n: "Lebanon"
            }, {
                c: "lc",
                n: "Saint Lucia"
            }, {
                c: "li",
                n: "Liechtenstein"
            }, {
                c: "lk",
                n: "Sri Lanka"
            }, {
                c: "lr",
                n: "Liberia"
            }, {
                c: "ls",
                n: "Lesotho"
            }, {
                c: "lt",
                n: "Lithuania"
            }, {
                c: "lu",
                n: "Luxembourg"
            }, {
                c: "lv",
                n: "Latvia"
            }, {
                c: "ly",
                n: "Libya"
            }, {
                c: "ma",
                n: "Morocco"
            }, {
                c: "mc",
                n: "Monaco"
            }, {
                c: "md",
                n: "Moldova"
            }, {
                c: "me",
                n: "Montenegro"
            }, {
                c: "mf",
                n: "Saint Martin"
            }, {
                c: "mg",
                n: "Madagascar"
            }, {
                c: "mh",
                n: "Marshall Islands"
            }, {
                c: "mk",
                n: "Macedonia"
            }, {
                c: "ml",
                n: "Mali"
            }, {
                c: "mm",
                n: "Myanmar"
            }, {
                c: "mn",
                n: "Mongolia"
            }, {
                c: "mo",
                n: "Macao"
            }, {
                c: "mp",
                n: "Northern Mariana Islands"
            }, {
                c: "mq",
                n: "Martinique"
            }, {
                c: "mr",
                n: "Mauritania"
            }, {
                c: "ms",
                n: "Montserrat"
            }, {
                c: "mt",
                n: "Malta"
            }, {
                c: "mu",
                n: "Mauritius"
            }, {
                c: "mv",
                n: "Maldives"
            }, {
                c: "mw",
                n: "Malawi"
            }, {
                c: "mx",
                n: "Mexico",
                s: 603
            }, {
                c: "my",
                n: "Malaysia",
                s: 199
            }, {
                c: "mz",
                n: "Mozambique"
            }, {
                c: "na",
                n: "Namibia"
            }, {
                c: "nc",
                n: "New Caledonia"
            }, {
                c: "ne",
                n: "Niger"
            }, {
                c: "nf",
                n: "Norfolk Island"
            }, {
                c: "ng",
                n: "Nigeria",
                s: 181
            }, {
                c: "ni",
                n: "Nicaragua"
            }, {
                c: "nl",
                n: "Netherlands",
                s: 699
            }, {
                c: "no",
                n: "Norway",
                s: 368
            }, {
                c: "np",
                n: "Nepal",
                b: "NepalRawr",
                t: 2
            }, {
                c: "nr",
                n: "Nauru"
            }, {
                c: "nu",
                n: "Niue"
            }, {
                c: "nz",
                n: "New Zealand",
                s: 133
            }, {
                c: "om",
                n: "Oman"
            }, {
                c: "pa",
                n: "Panama"
            }, {
                c: "pe",
                n: "Peru"
            }, {
                c: "pf",
                n: "French Polynesia"
            }, {
                c: "pg",
                n: "Papua New Guinea"
            }, {
                c: "ph",
                n: "Philippines",
                s: 115
            }, {
                c: "pk",
                n: "Pakistan"
            }, {
                c: "$pl",
                n: "",
                i: !0,
                s: 2e4,
                f: "pl"
            }, {
                c: "pl",
                n: "Poland",
                s: 305
            }, {
                c: "pm",
                n: "Saint Pierre and Miquelon"
            }, {
                c: "pn",
                n: "Pitcairn"
            }, {
                c: "pr",
                n: "Puerto Rico"
            }, {
                c: "ps",
                n: "Palestine"
            }, {
                c: "pt",
                n: "Portugal",
                s: 127
            }, {
                c: "pw",
                n: "Palau"
            }, {
                c: "py",
                n: "Paraguay"
            }, {
                c: "qa",
                n: "Qatar",
                s: 137
            }, {
                c: "re",
                n: "Réunion"
            }, {
                c: "ro",
                n: "Romania",
                s: 95
            }, {
                c: "rs",
                n: "Serbia"
            }, {
                c: "ru",
                n: "Russia",
                s: 871
            }, {
                c: "rw",
                n: "Rwanda"
            }, {
                c: "sa",
                n: "Saudi Arabia",
                s: 328
            }, {
                c: "sb",
                n: "Solomon Islands"
            }, {
                c: "sc",
                n: "Seychelles"
            }, {
                c: "sd",
                n: "Sudan"
            }, {
                c: "se",
                n: "Sweden",
                s: 447
            }, {
                c: "sg",
                n: "Singapore",
                b: "Tringapore",
                s: 212
            }, {
                c: "sh",
                n: "Saint Helena"
            }, {
                c: "si",
                n: "Slovenia"
            }, {
                c: "sk",
                n: "Slovakia"
            }, {
                c: "sl",
                n: "Sierra Leone"
            }, {
                c: "sm",
                n: "San Marino"
            }, {
                c: "sn",
                n: "Senegal"
            }, {
                c: "so",
                n: "Somalia"
            }, {
                c: "sr",
                n: "Suriname"
            }, {
                c: "ss",
                n: "South Sudan"
            }, {
                c: "st",
                n: "São Tomé and Príncipe"
            }, {
                c: "sv",
                n: "El Salvador"
            }, {
                c: "sx",
                n: "Sint Maarten"
            }, {
                c: "sy",
                n: "Syria"
            }, {
                c: "sz",
                n: "Swaziland"
            }, {
                c: "tc",
                n: "Turks and Caicos Islands"
            }, {
                c: "td",
                n: "Chad"
            }, {
                c: "tf",
                n: "French Southern Territories",
                b: "French Southern and Antarctic Landsball"
            }, {
                c: "tg",
                n: "Togo"
            }, {
                c: "th",
                n: "Thailand",
                s: 105
            }, {
                c: "tj",
                n: "Tajikistan"
            }, {
                c: "tk",
                n: "Tokelau"
            }, {
                c: "tl",
                n: "Timor-Leste",
                b: "East Timorball"
            }, {
                c: "tm",
                n: "Turkmenistan"
            }, {
                c: "tn",
                n: "Tunisia"
            }, {
                c: "to",
                n: "Tonga"
            }, {
                c: "tr",
                n: "Turkey",
                s: 346
            }, {
                c: "tt",
                n: "Trinidad and Tobago"
            }, {
                c: "tv",
                n: "Tuvalu"
            }, {
                c: "tw",
                n: "Taiwan",
                s: 411
            }, {
                c: "tz",
                n: "Tanzania"
            }, {
                c: "ua",
                n: "Ukraine"
            }, {
                c: "ug",
                n: "Uganda"
            }, {
                c: "us",
                n: "United States of America",
                b: "USAball",
                s: 14895
            }, {
                c: "uy",
                n: "Uruguay"
            }, {
                c: "uz",
                n: "Uzbekistan",
                b: "Uzbekball"
            }, {
                c: "va",
                n: "Holy See",
                b: "Vaticanball"
            }, {
                c: "vc",
                n: "Saint Vincent and the Grenadines"
            }, {
                c: "ve",
                n: "Venezuela"
            }, {
                c: "vg",
                n: "British Virgin Islands"
            }, {
                c: "vi",
                n: "U.S. Virgin Islands"
            }, {
                c: "vn",
                n: "Vietnam",
                s: 88
            }, {
                c: "vu",
                n: "Vanuatu"
            }, {
                c: "wf",
                n: "Wallis and Futuna"
            }, {
                c: "ws",
                n: "Samoa"
            }, {
                c: "xk",
                n: "Kosovo"
            }, {
                c: "ye",
                n: "Yemen"
            }, {
                c: "yt",
                n: "Mayotte"
            }, {
                c: "za",
                n: "South Africa",
                s: 137
            }, {
                c: "zm",
                n: "Zambia"
            }, {
                c: "zw",
                n: "Zimbabwe"
            }, {
                c: "$prussia",
                n: "Prussia"
            }, {
                c: "$ussr",
                n: "USSR",
                l: 20
            }, {
                c: "$spqr",
                n: "SPQR",
                l: 25
            }]
        }, {}],
        126: [function(t, e, i) {
            function n() {
                this.messageCb = {}
            }
            var r = t(136);
            n.prototype.packet = function(t) {
                return new r.PacketOut(this, t)
            }, n.prototype.on = function(t, e) {
                if (void 0 === t) throw Error("Invalid protocol id");
                this.messageCb[t] = e
            }, n.prototype.error = function(t, e) {
                var i = this.packet(r.Messages.GEN_ERROR);
                i.u16(t), i.str(e), i.send()
            }, n.prototype.onError = function(t) {
                this.errorCb = t
            }, n.prototype.close = function() {}, n.prototype._send = function(t) {}, n.prototype._dispatchMsg = function(t) {
                this.messageCb[t.id] && this.messageCb[t.id].call(t)
            }, n.prototype._dispatchError = function(t, e) {
                var i = this;
                setTimeout(function() {
                    i.errorCb && i.errorCb(t, e)
                }, 0)
            }, n.prototype.errorCb = null, n.prototype.messageCb = null, e.exports = n
        }, {}],
        127: [function(t, e, i) {
            e.exports = function t() {
                this.ball = "$pl", this.skinGlasses = this.skinHat = 0, this.initFromSheet = function(t) {
                    this.ball = t.get("customBall"), this.skinHat = t.get("customHat"), this.skinGlasses = t.get("customGlasses")
                }, this.initFromJson = function(t) {
                    this.ball = t.ball, this.skinHat = t.skinHat, this.skinGlasses = t.skinGlasses
                }, this.equals = function(t) {
                    return this.ball == t.ball && this.skinHat == t.skinHat && this.skinGlasses == t.skinGlasses
                }, this.clone = function() {
                    var e = new t;
                    return e.ball = this.ball, e.skinHat = this.skinHat, e.skinGlasses = this.skinGlasses, e
                }
            }
        }, {}],
        128: [function(t, e, i) {
            e.exports = {
                NoRelation: 0,
                Friends: 1,
                FriendRequestIncoming: 2,
                FriendRequestOutgoing: 3,
                Yourself: 4
            }
        }, {}],
        129: [function(t, e, i) {
            function n(t, e) {
                this.id = e, this.sheetConfig = t, this.values = [], this.mapKeyToValue = {};
                for (var i = 0; i < t.vars.length; i++) {
                    var r = {
                        current: null
                    };
                    this.mapKeyToValue[t.vars[i].key] = r, this.values.push(r)
                }
                this.getSheetTypeId = function() {
                    return a.findIdByName(this.sheetConfig.name)
                }, this.set = function(t, e) {
                    var i = this.mapKeyToValue[t];
                    if (!i) throw Error("Unknown key " + t);
                    i.current = e
                }, this.get = function(t) {
                    var e = this.mapKeyToValue[t];
                    if (!e) throw Error("Unknown key " + t);
                    return e.current
                }, this.copy = function() {
                    for (var i = new n(t, e), r = 0; r < this.values.length; r++) i.values[r].current = this.values[r].current;
                    return i
                }, this.print = function() {
                    console.log("SHEET " + e + " (" + t.name + ")");
                    for (var i = 0; i < this.values.length; i++) console.log("    " + this.sheetConfig.vars[i].key + ": " + this.values[i].current);
                    console.log("")
                }
            }
            var r = t(139),
                s = t(141),
                a = t(140);
            e.exports = function t(e) {
                this.sheets = [], this.sheetsByType = [], this.storedEvents = [], this.addSheet = function(t, e) {
                    e |= 0;
                    var i = a.findIdByName(t),
                        r = a.findSheetConfigByName(t);
                    if (r) {
                        if (null != this.findSheet(t, e)) throw Error("Sheet already exists");
                        if (r.quantity == s.EXACTLY_ONE || r.quantity == s.MAX_ONE) {
                            if (0 != e) throw Error("Cannot create sheet with ID other than 0" + t);
                            if (1 == this.sheetsByType[i].length) throw Error("Cannot create another sheet for " + t)
                        }
                        return t = new n(r, e), this.sheets.push(t), this.sheetsByType[i].push(t), t
                    }
                    throw Error("Unknown sheet", t)
                }, this.removeSheet = function(t) {
                    if (t.sheetConfig.quantity == s.EXACTLY_ONE) throw Error("Cannot delete this sheet");
                    var e = this.sheets.indexOf(t);
                    if (-1 == e) throw Error("Idx invalid A");
                    this.sheets.splice(e, 1);
                    var i = this.sheetsByType[a.findIdByName(t.sheetConfig.name)];
                    if (-1 == (e = i.indexOf(t))) throw Error("Idx invalid B");
                    i.splice(e, 1)
                }, this.removeAllSheetsOfType = function(t) {
                    if (t = a.findIdByName(t), t = this.sheetsByType[t])
                        for (; 0 < t.length;) this.removeSheet(t[0])
                }, this.findSheet = function(t, e) {
                    e |= 0, t = a.findIdByName(t), t = this.sheetsByType[t];
                    for (var i = 0; i < t.length; i++)
                        if (t[i].id == e) return t[i];
                    return null
                }, this.findSheetByTypeId = function(t, e) {
                    e |= 0, t = this.sheetsByType[t];
                    for (var i = 0; i < t.length; i++)
                        if (t[i].id == e) return t[i];
                    return null
                }, this.findSheetNameById = function(t) {
                    return a.findSheetConfigById(t).name
                }, this.getSheets = function(t) {
                    return t = a.findIdByName(t), (t = this.sheetsByType[t]) ? t : []
                }, this.copy = function() {
                    var e = new t(!0);
                    e.sheets = [];
                    for (var i = 0; i < this.sheets.length; i++) {
                        var n = this.sheets[i].copy();
                        e.sheets.push(n)
                    }
                    for (i = 0; i < this.sheets.length; i++) n = a.findIdByName(e.sheets[i].sheetConfig.name), e.sheetsByType[n].push(e.sheets[i]);
                    return e
                }, this.createPatch = function(t, e) {
                    if (e = e || !1, this == t) throw Error("Same object");
                    for (var i = {
                            removed: [],
                            added: [],
                            changes: []
                        }, n = 0; n < t.sheets.length; n++) {
                        var r = t.sheets[n],
                            s = !!r.sheetConfig.instant;
                        if ((s = !(!s && e)) && null == this.findSheet(r.sheetConfig.name, r.id)) {
                            for (var a = [], o = 0; o < r.values.length; o++) a.push({
                                type: r.sheetConfig.vars[o].type,
                                current: r.values[o].current
                            });
                            i.added.push({
                                sheet: r.sheetConfig.name,
                                id: r.id,
                                list: a
                            })
                        }
                    }
                    for (n = 0; n < this.sheets.length; n++)
                        if (s = !(!(s = !!(r = this.sheets[n]).sheetConfig.instant) && e), null == (a = t.findSheet(r.sheetConfig.name, r.id))) s && i.removed.push({
                            id: r.id,
                            sheet: r.sheetConfig.name
                        });
                        else {
                            var l = [];
                            for (o = 0; o < r.values.length; o++) s = !(!(s = !!r.sheetConfig.vars[o].instant) && e), r.values[o].current != a.values[o].current && s && l.push({
                                var: o,
                                type: r.sheetConfig.vars[o].type,
                                current: a.values[o].current
                            });
                            0 < l.length && i.changes.push({
                                sheet: r.sheetConfig.name,
                                id: r.id,
                                changes: l
                            })
                        } return i
                }, this.applyPatch = function(t) {
                    for (var e = 0; e < t.removed.length; e++) {
                        var i = this.findSheet(t.removed[e].sheet, t.removed[e].id);
                        this.removeSheet(i)
                    }
                    for (e = 0; e < t.added.length; e++) {
                        i = this.addSheet(t.added[e].sheet, t.added[e].id);
                        for (var n = t.added[e].list, r = 0; r < n.length; r++) i.values[r].current = n[r].current
                    }
                    for (e = 0; e < t.changes.length; e++) {
                        if (n = t.changes[e], !(i = this.findSheet(n.sheet, n.id))) throw Error("Cannot find sheet " + n.sheet + ":" + n.id);
                        for (r = 0; r < n.changes.length; r++) {
                            var s = n.changes[r];
                            i.values[s.var].current = s.current
                        }
                    }
                }, this.addEventByName = function(t, e, i, n) {
                    var r = a.findEventConfigByName(e.sheetConfig, i);
                    if (null == r) throw Error("Unknown event: " + i);
                    i = e.sheetConfig.events.indexOf(r), this.addEvent(t, e, r, i, n)
                }, this.addEventById = function(t, e, i, n) {
                    var r = a.findEventConfigById(e.sheetConfig, i);
                    if (null == r) throw Error("Unknown event id " + i);
                    this.addEvent(t, e, r, i, n)
                }, this.addEvent = function(t, e, i, n, r) {
                    for (var s = [], a = 0; a < i.vars.length; a++) {
                        var o = i.vars[a].key,
                            l = i.vars[a].type,
                            h = r[o];
                        if (null == h) throw Error("Undefined event value: " + o);
                        s.push({
                            key: o,
                            type: l,
                            val: h
                        })
                    }
                    this.storedEvents.push({
                        tick: t,
                        sheet: e,
                        eventName: i.key,
                        eventId: n,
                        vars: s
                    })
                }, this.popAllEvents = function() {
                    if (0 == this.storedEvents.length) return [];
                    var t = this.storedEvents;
                    return this.storedEvents = [], t
                }, this.print = function() {
                    console.log("######################################################", Error().stack);
                    for (var t = 0; t < this.sheets.length; t++) this.sheets[t].print()
                };
                for (var i = 0; i < r.length; i++) this.sheetsByType.push([]), e || r[i].quantity == s.EXACTLY_ONE && this.addSheet(r[i].name)
            }
        }, {}],
        130: [function(t, e, i) {
            e.exports = [{
                key: "dm",
                teams: !1,
                ctf: !1,
                descShort: "Death Match",
                descLong: "Try to kill as many players as possible (except yourself)"
            }, {
                key: "tdm",
                teams: !0,
                ctf: !1,
                descShort: "Team Death Match",
                descLong: "Try to kill as many players from the other team as possible"
            }, {
                key: "ctf",
                teams: !0,
                ctf: !0,
                descShort: "Capture The Flag",
                descLong: "Capture the enemies flag and bring it to your own. Team with 3 captures or highest count wins."
            }]
        }, {}],
        131: [function(t, e, i) {
            var n = e.exports,
                r = null;
            e.exports.getArg = function(t, e) {
                for (var i = window.location.search.substring(1).split("&"), n = 0; n < i.length; n++) {
                    var r = i[n].split("=");
                    if (decodeURIComponent(r[0]) == t) return decodeURIComponent(r[1])
                }
                return e
            }, e.exports.lerp = function(t, e, i) {
                return (1 - i) * t + i * e
            }, e.exports.sign = function(t) {
                return 0 > t ? -1 : 0 < t ? 1 : 0
            }, e.exports.lpad = function(t, e, i) {
                t += "", void 0 !== i && 1 == i.length || (i = "0");
                for (var n = "", r = 0; r < e - t.length; r++) n += i;
                return n + t
            }, e.exports.rpad = function(t, e, i) {
                t += "", void 0 !== i && 1 == i.length || (i = "0");
                for (var n = "", r = 0; r < e - t.length; r++) n += i;
                return t + n
            }, e.exports.pointInCircle = function(t, e, i) {
                if (0 == i) return !1;
                var n = e[0] - t[0];
                return n * n + (t = e[1] - t[1]) * t <= i * i
            }, e.exports.angleDiff = function(t, e) {
                return Math.atan2(Math.sin(t - e), Math.cos(t - e))
            }, e.exports.normalizeAngle = function(t) {
                return Math.atan2(Math.sin(t), Math.cos(t))
            }, e.exports.collideLineCircle = function(t, e, i) {
                if (window.boolAura) return !0;
                if (n.pointInCircle(t[0], e, i) || n.pointInCircle(t[1], e, i)) return !0;
                var r = t[0][0],
                    s = t[0][1],
                    a = t[1][0] - r;
                t = t[1][1] - s;
                var o = e[0] - r,
                    l = e[1] - s,
                    h = a * a + t * t,
                    c = a,
                    u = t;
                return 0 < h && (c *= o = (o * a + l * t) / h, u *= o), o = c * c + u * u, n.pointInCircle([r + c, s + u], e, i) && o <= h && 0 <= c * a + u * t
            }, e.exports.intersectionLineRect = function(t, e, i, n, r, s, a, o) {
                if (window.boolAura) return null;
                var l = i - t,
                    h = n - e,
                    c = [];
                return t < r && i < r || t > a && i > a || e < s && n < s || e > o && n > o ? null : (i = h / l, h = l / h, l = e + i * (r - t), i = e + i * (a - t), n = t + h * (s - e), t += h * (o - e), l >= s && l <= o && c.push([r, l]), i >= s && i <= o && c.push([a, i]), n >= r && n <= a && c.push([n, s]), t >= r && t <= a && c.push([t, o]), 0 != c.length ? c : null)
            }, e.exports.crc32 = function(t) {
                if (!r) {
                    r = [];
                    for (var e = 0; 256 > e; e++) {
                        for (var i = e, n = 0; 8 > n; n++) i = 1 & i ? 3988292384 ^ i >>> 1 : i >>> 1;
                        r[e] = i
                    }
                }
                for (i = -1, e = 0; e < t.length; e++) i = i >>> 8 ^ r[255 & (i ^ t.charCodeAt(e))];
                return (-1 ^ i) >>> 0
            }, e.exports.DRandom = function(t) {
                var i = e.exports.crc32("abc" + t);
                this.next = function() {
                    return this.nextInt() / 4294967296
                }, this.nextInt = function() {
                    return i = e.exports.crc32(i + "rand" + t)
                }
            }, e.exports.merge = function(t, e) {
                for (var i in e) t[i] = e[i];
                return t
            }, e.exports.sign = function(t) {
                return 0 == t ? 0 : 0 > t ? -1 : 1
            }, e.exports.getFriendlyDateTime = function(t) {
                var e = (Date.now() - t) / 1e3 / 60 / 60 / 24;
                return 1 > e ? ("00" + t.getHours()).substr(-2) + ":" + ("00" + t.getMinutes()).substr(-2) : 6 > e ? "Sun Mon Tue Wed Thu Fri Sat".split(" ")[t.getDay()] : "Jan;Feb;Mar;Apr;May;June;July;Aug;Sept;Oct; Nov;Dec".split(";")[t.getMonth()] + " " + ("00" + t.getDate()).substr(-2)
            }, e.exports.getFriendlyExactDateTime = function(t) {
                var e = (Date.now() - t) / 1e3 / 60 / 60 / 24,
                    i = ("00" + t.getHours()).substr(-2) + ":" + ("00" + t.getMinutes()).substr(-2);
                return 1 > e ? i : 6 > e ? "Sun Mon Tue Wed Thu Fri Sat".split(" ")[t.getDay()] + ", " + i : "Jan;Feb;Mar;Apr;May;June;July;Aug;Sept;Oct; Nov;Dec".split(";")[t.getMonth()] + " " + ("00" + t.getDate()).substr(-2) + ", " + i
            }
        }, {}],
        132: [function(t, e, i) {
            function n() {
                if (null == r) {
                    r = [];
                    for (var t = 1; 99 >= t; t++) r[t] = {
                        lvl: t,
                        xp: 1 == t ? 100 : ~~(1.08 * r[t - 1].xp)
                    }
                }
            }
            var r = null;
            e.exports.getLevelRange = function(t) {
                return 5 > t ? 0 : 20 > t ? 1 : 35 > t ? 2 : 60 > t ? 3 : 4
            }, e.exports.getMaxLevel = function() {
                return n(), 99
            }, e.exports.getXPAtLevel = function(t) {
                return n(), r[t].xp
            }, e.exports.getXpBreakdown = function(t) {
                n();
                for (var e = 1; 100 > e && r[e].xp < t;) t -= r[e].xp, e++;
                return 99 <= e && (e = 99, t = 0), {
                    level: e,
                    xp: t
                }
            }
        }, {}],
        133: [function(t, e, i) {
            e.exports = {
                maps: [{
                    label: "Winter",
                    name: "map1",
                    tileset: "winter",
                    objset: "winter",
                    bg: "mountains",
                    bgFx: "snow",
                    types: ["dm", "tdm"],
                    specials: [{
                        type: "mg1",
                        pos: [26, 23],
                        angle: 0
                    }],
                    border: [188, 188, 188]
                }, {
                    label: "Desert",
                    name: "desert1",
                    tileset: "desert",
                    objset: "desert",
                    bg: "desert",
                    spaceY: -12e3,
                    types: ["dm", "tdm", "ctf"],
                    specials: [{
                        type: "mg1",
                        pos: [31, 23],
                        angle: 0
                    }, {
                        type: "plane",
                        startTime: 60,
                        path: "flight1",
                        dropsEverySec: 1,
                        dropTimeOffset: 0,
                        reset: !1
                    }, {
                        type: "plane",
                        startTime: 180,
                        path: "flight1",
                        dropsEverySec: 1,
                        dropTimeOffset: .5,
                        reset: !1
                    }]
                }, {
                    label: "Spring",
                    name: "testmap2",
                    tileset: "spring",
                    objset: "spring",
                    bg: "forest",
                    bgFx: "pollen",
                    types: ["dm", "tdm", "ctf"],
                    specials: [{
                        type: "mg1",
                        pos: [22, 15],
                        angle: 0
                    }, {
                        type: "mg1",
                        pos: [41, 15],
                        angle: Math.PI
                    }]
                }, {
                    label: "Spring 2",
                    name: "spring2",
                    tileset: "spring",
                    objset: "spring",
                    bg: "forest",
                    bgFx: "pollen",
                    types: ["dm", "tdm", "ctf"],
                    specials: []
                }, {
                    label: "City",
                    name: "city1",
                    tileset: "spring",
                    objset: "spring",
                    bg: "cityNight",
                    types: ["dm", "tdm", "ctf"],
                    specials: [{
                        type: "mg1",
                        pos: [47, 13],
                        angle: 0
                    }]
                }, {
                    label: "Moon",
                    name: "moon1",
                    tileset: "moon",
                    objset: "moon",
                    bg: "moon",
                    types: ["dm", "tdm"],
                    specials: [],
                    gravity: .5,
                    border: [130, 130, 130]
                }]
            }
        }, {}],
        134: [function(t, e, i) {
            var n = t(123);
            e.exports = function() {
                this.name = null, this.points = [], this.size = 0, this.segments = [], this.interpolatePath = function() {
                    for (var t = [], e = 0; e < this.points.length; e++) t.push(this.points[e][0], this.points[e][1]);
                    for (t = n.getCurvePoints(t), e = this.size = 0; e < t.length - 2; e += 2) {
                        var i = t[e],
                            r = t[e + 1],
                            s = t[e + 2],
                            a = t[e + 3],
                            o = i - s,
                            l = r - a;
                        o = Math.sqrt(o * o + l * l), this.segments.push({
                            p0: [i, r],
                            p1: [s, a],
                            start: this.size,
                            size: o
                        }), this.size += o
                    }
                }, this.getPos = function(t) {
                    for (var e = 0; e < this.segments.length; e++) {
                        var i = this.segments[e],
                            n = t - i.start,
                            r = n / i.size;
                        if (0 <= n && n <= i.size) return [i.p0[0] + (i.p1[0] - i.p0[0]) * r, i.p0[1] + (i.p1[1] - i.p0[1]) * r]
                    }
                    return null
                }
            }
        }, {}],
        135: [function(t, e, i) {
            e.exports = function(t, e, i) {
                this.pos = t, this.radius = e, this.shootable = i, this.bulletImmunity = []
            }
        }, {}],
        136: [function(t, e, i) {
            var n = t(138).Serializer,
                r = t(138).Unserializer;
            t = {
                Meta: {
                    Version: 1
                },
                Messages: {
                    GEN_HANDSHAKE: 1,
                    GEN_ERROR: 2,
                    CTS_JOIN: 10,
                    STC_JOINRESPONSE: 11,
                    CTS_READY: 12,
                    CTS_REQUESTTEAM: 17,
                    STC_MATCHSTART: 18,
                    STC_SIMULATIONSTART: 20,
                    STC_SNAPSHOT: 21,
                    STC_INSTANT: 22,
                    STC_INPUTTIMING: 23,
                    STC_EVENTS: 24,
                    CTS_INPUT: 25,
                    STC_EOM: 26,
                    STC_CHAT: 27,
                    CTS_CHAT: 28,
                    CTS_MM_REQUESTMATCH: 60,
                    STC_MM_MATCHED: 61,
                    STC_GTW_DATA: 62,
                    STC_AUTHED: 63,
                    CTS_LOGOUT: 64,
                    CTS_REGISTER: 65,
                    STC_REGISTER: 66,
                    CTS_CLASSIC_LOAD: 67,
                    STC_CLASSIC_LOAD: 68,
                    CTS_HIGHSCORE_OVERVIEW_RELOAD: 69,
                    STC_HIGHSCORE_OVERVIEW: 70,
                    CTS_USER_DETAILS: 71,
                    STC_USER_DETAILS: 72,
                    STC_MAINTENANCE: 80,
                    STC_SOCIAL_MESSAGE: 100,
                    CTS_SOCIAL_MESSAGE: 101
                }
            }, Object.freeze(t.Meta), Object.freeze(t.Messages);
            var s = new ArrayBuffer(2097152),
                a = !1;
            t.PacketOut = function(t, e) {
                if (a) throw Error("Generic buffer is in use");
                a = !0;
                var i = new n(s);
                this.u8 = function(t) {
                    i.u8(t)
                }, this.u16 = function(t) {
                    i.u16(t)
                }, this.u32 = function(t) {
                    i.u32(t)
                }, this.s8 = function(t) {
                    i.s8(t)
                }, this.s16 = function(t) {
                    i.s16(t)
                }, this.s32 = function(t) {
                    i.s32(t)
                }, this.f32 = function(t) {
                    i.f32(t)
                }, this.f64 = function(t) {
                    i.f64(t)
                }, this.str = function(t, e) {
                    i.str(t, e)
                }, this.buffer = function(t, e) {
                    i.buffer(t, e)
                }, this.serialize = function(t, e) {
                    i.serialize(t, e)
                }, this.send = function() {
                    var e = s.slice(0, i.getSize());
                    a = !1, t._send(e)
                }, this.u8(e)
            }, t.PacketIn = function(t, e) {
                var i = new r(e);
                this.u8 = function() {
                    return i.u8()
                }, this.u16 = function() {
                    return i.u16()
                }, this.u32 = function() {
                    return i.u32()
                }, this.s8 = function() {
                    return i.s8()
                }, this.s16 = function() {
                    return i.s16()
                }, this.s32 = function() {
                    return i.s32()
                }, this.f32 = function() {
                    return i.f32()
                }, this.f64 = function() {
                    return i.f64()
                }, this.str = function() {
                    return i.str()
                }, this.buffer = function() {
                    return i.buffer()
                }, this.serialize = function(t) {
                    return i.unserialize(t)
                }, this.unserialize = function(t) {
                    switch (t) {
                        case "str":
                            return this.str();
                        case "u8":
                            return this.u8();
                        case "u16":
                            return this.u16();
                        case "u32":
                            return this.u32();
                        case "s8":
                            return this.s8();
                        case "s16":
                            return this.s16();
                        case "s32":
                            return this.s32();
                        case "f32":
                            return this.f32();
                        case "f64":
                            return this.f64();
                        default:
                            throw Error("Unknown type: " + t)
                    }
                }, this.id = this.u8(), t._dispatchMsg(this)
            }, e.exports = t
        }, {}],
        137: [function(t, e, i) {
            function n(t, e) {
                this.q3 = this.q2 = this.q1 = this.q0 = null, this.size = 0 | t, this.value = 0 | e, this.updateSeq = -1, this.updateState = function() {
                    if (null != this.q0) {
                        this.q0.updateState(), this.q1.updateState(), this.q2.updateState(), this.q3.updateState();
                        var t = 0,
                            e = !1,
                            i = 0;
                        null != this.q0.q0 || e && t != this.q0.value || (e = !0, t = this.q0.value, i++), null != this.q1.q0 || e && t != this.q1.value || (e = !0, t = this.q1.value, i++), null != this.q2.q0 || e && t != this.q2.value || (e = !0, t = this.q2.value, i++), null != this.q3.q0 || e && t != this.q3.value || (t = this.q3.value, i++), 4 == i && (this.q0 = this.q1 = this.q2 = this.q3 = null, this.value = t)
                    }
                }
            }
            var r = t(131);
            e.exports = function(t) {
                var e = this;
                if (0 != t) {
                    if (this.levels = Math.log(t) / Math.log(2), this.root = null, this.genericBuffer = new ArrayBuffer(8388608), this.reset = function() {
                            e.root = new n
                        }, this.destroy = function() {
                            this.root = null
                        }, this.removeShreds = function(i, n, r, s, a, o) {
                            function l(t, e) {
                                var i = 0,
                                    n = 0,
                                    r = 0;
                                for (m[r++] = t, m[r++] = e; n < r;)
                                    if (t = m[n++], e = m[n++], !(0 > t || t >= p || 0 > e || e >= d)) {
                                        var s = e * p + t;
                                        1 == f[s] && (f[s] = 255, i++, m[r++] = t, m[r++] = e - 1, m[r++] = t, m[r++] = e + 1, m[r++] = t - 1, m[r++] = e, m[r++] = t + 1, m[r++] = e)
                                    } return i
                            }

                            function h(t, i) {
                                var n = 0,
                                    r = 0,
                                    s = 0;
                                for (m[s++] = t, m[s++] = i; r < s;)
                                    if (t = m[r++], i = m[r++], !(0 > t || t >= p || 0 > i || i >= d)) {
                                        var a = i * p + t;
                                        255 == f[a] && (f[a] = 0, n++, e.setValue(c + t, u + i, 0, e.levels), v.push(c + t, u + i), m[s++] = t, m[s++] = i - 1, m[s++] = t, m[s++] = i + 1, m[s++] = t - 1, m[s++] = i, m[s++] = t + 1, m[s++] = i)
                                    } return n
                            }
                            r |= 0, s |= 0, a |= 0, o |= 0, n = i >> 2;
                            var c = Math.max(0, r - n),
                                u = Math.max(0, s - n),
                                p = Math.min(t, a + 2 * n),
                                d = Math.min(t, o + 2 * n);
                            r -= c, s -= u, a = Math.min(a, p), o = Math.min(o, d), n = p * d;
                            var f = new Uint8Array(this.genericBuffer, 0, n),
                                m = new Uint8Array(this.genericBuffer, n);
                            if (!(n > f.length)) {
                                for (var g = 0; g < n; g++) f[g] = 0;
                                ! function t(e, i, n) {
                                    var r = i + e.size | 0,
                                        s = n + e.size | 0;
                                    if (!((0 | i) > (c + p | 0) || (0 | r) < (0 | c) || (0 | n) > (u + d | 0) || (0 | s) < (0 | u)))
                                        if (null != e.q0) s = i + (r = e.size >> 1) | 0, r = n + r | 0, t(e.q0, i, n), t(e.q1, s, n), t(e.q2, i, r), t(e.q3, s, r);
                                        else if (0 != e.value)
                                        for (e = Math.max(c, i), i = Math.min(c + p, r), s = Math.min(u + d, s), n = Math.max(u, n); n < s; n++)
                                            for (r = e; r < i; r++) f[(n - u) * p + (r - c)] = 1
                                }(this.root, 0, 0);
                                var v = [];
                                for (n = s; n < s + o; n++)
                                    for (g = r; g < r + a; g++) {
                                        var y = l(g, n);
                                        if (0 < y && y <= i) {
                                            var x = h(g, n);
                                            if (x != y) throw Error("Pixel removal inconsistent " + x + " vs " + y)
                                        }
                                    }
                                return v
                            }
                        }, this.setValue = function(t, e, i, r) {
                            if (t |= 0, e |= 0, i |= 0, 0 >= (r |= 0)) throw Error("Invalid level");
                            for (var s = 0, a = 0, o = this.root, l = r - 1 | 0, h = 0; h < r; h++) {
                                var c = o.size >> 1,
                                    u = s + c | 0,
                                    p = a + c | 0;
                                null == o.q0 && (o.q0 = new n(c, o.value), o.q1 = new n(c, o.value), o.q2 = new n(c, o.value), o.q3 = new n(c, o.value)), t >= u ? (o = e >= p ? o.q3 : o.q1, s = u) : o = e >= p ? o.q2 : o.q0, e >= p && (a = p), h == l && (o.value = i, o.q0 = o.q1 = o.q2 = o.q3 = null)
                            }
                        }, this.getValue = function(t, e) {
                            t |= 0, e |= 0;
                            for (var i = 0, n = 0, r = this.root, s = 0; s <= this.levels; s++) {
                                var a = r.size >> 1,
                                    o = i + a | 0;
                                if (a = n + a | 0, null == r.q0) return r.value;
                                if (t >= o)
                                    if (e >= a) {
                                        var l = r.q3;
                                        i = o, n = a
                                    } else l = r.q1, i = o;
                                else e >= a ? (l = r.q2, n = a) : l = r.q0;
                                if (!l) return r.value;
                                r = l
                            }
                        }, this.setCircle = function(t, e, i, r, s) {
                            function a(t, e) {
                                return (t = l - t) * t + (e = h - e) * e <= o
                            }
                            s |= 0;
                            var o = i * i,
                                l = ~~t,
                                h = ~~e,
                                c = l - i,
                                u = h - i,
                                p = l + i,
                                d = h + i;
                            ! function t(e, i, o, l) {
                                i |= 0, o |= 0;
                                var h = e.size;
                                if (1 == h) a(i, o) && (e.q0 = e.q1 = e.q2 = e.q3 = null, e.value != s && (e.value = r));
                                else {
                                    var f = i,
                                        m = o,
                                        g = 0;
                                    a(f, m) && g++, a(f, m + h) && g++, a(f + h, m) && g++, a(f + h, m + h) && g++, 3 == (f = 0 == g ? (0 | f) > (0 | p) || (f + h | 0) < (0 | c) || (0 | m) > (0 | d) || (m + h | 0) < (0 | u) ? 0 : 3 : 4 == g ? 1 : 2) || 2 == f || 1 == f && null != e.q0 ? (h >>= 1, l += 1, null == e.q0 && (e.q0 = new n(h, e.value), e.q1 = new n(h, e.value), e.q2 = new n(h, e.value), e.q3 = new n(h, e.value)), t(e.q0, i, o, l), t(e.q1, i + h, o, l), t(e.q2, i, o + h, l), t(e.q3, i + h, o + h, l)) : 1 == f && e.value != s && (e.q0 = e.q1 = e.q2 = e.q3 = null, e.value = r)
                                }
                            }(this.root, 0, 0, 0)
                        }, this.findFirstOnLine = function(t, e, i, n, s, a) {
                            a = a || !1, t |= 0, e |= 0, i |= 0, n |= 0, s |= 0;
                            var o = [];
                            if (function l(h, c, u) {
                                    c |= 0, u |= 0;
                                    var p = r.intersectionLineRect(t, e, i, n, c, u, c + h.size | 0, u + h.size | 0);
                                    if (!p) return !1;
                                    if (h.q0) {
                                        var d = h.size >> 1;
                                        p = c + d | 0, d = u + d | 0, l(h.q0, c, u), l(h.q1, p, u), l(h.q2, c, d), l(h.q3, p, d)
                                    } else if (!a && h.value == s || a && h.value != s)
                                        for (c = 0; c < p.length; c++) o.push([p[c][0], p[c][1], h.value])
                                }(this.root, 0, 0), 0 == o.length) return null;
                            for (var l = -1, h = 0, c = 0; c < o.length; c++) {
                                var u = o[c],
                                    p = u[0] - t;
                                ((p = p * p + (u = u[1] - e) * u) < h || -1 == l) && (l = c, h = p)
                            }
                            return o[l]
                        }, this.findInCircle = function(t, e, i, n, r) {
                            n |= 0, r = r || !1;
                            var s = (i |= 0) * i | 0,
                                a = (t |= 0) - i | 0,
                                o = (e |= 0) - i | 0,
                                l = t + i | 0,
                                h = e + i | 0,
                                c = [];
                            return function u(p, d, f) {
                                f |= 0;
                                var m = (d |= 0) + p.size | 0,
                                    g = f + p.size | 0;
                                if (!((0 | d) > (0 | l) || (0 | m) < (0 | a) || (0 | f) > (0 | h) || (0 | g) < (0 | o)))
                                    if (p.q0) {
                                        var v = p.size >> 1,
                                            y = d + v | 0;
                                        v = f + v | 0, u(p.q0, d, f), u(p.q1, y, f), u(p.q2, d, v), u(p.q3, y, v)
                                    } else if (!r && p.value == n || r && p.value != n)
                                    if (1 == p.size) s >= (p = d - t) * p + (m = f - e) * m && c.push([d, f]);
                                    else {
                                        var x = p = 0;
                                        if (t < d ? p = -1 : t > m && (p = 1), e < f ? x = -1 : e > g && (x = 1), -1 == p && -1 == x) y = d, v = f;
                                        else if (1 == p && -1 == x) y = m, v = f;
                                        else if (-1 == p && 1 == x) y = d, v = g;
                                        else if (1 == p && 1 == x) y = m, v = g;
                                        else {
                                            if (0 == p && 0 == x) return void c.push([t, e]);
                                            if (0 == p) {
                                                if (-1 == x && (e + i | 0) >= f) return void c.push([t, f]);
                                                if (1 == x && (e - i | 0) <= g) return void c.push([t, g])
                                            } else if (0 == x) {
                                                if (-1 == p && (t + i | 0) >= d) return void c.push([d, e]);
                                                if (1 == p && (t - i | 0) <= m) return void c.push([m, e])
                                            }
                                        }
                                        s >= ((p = y - t | 0) * p + (m = v - e | 0) * m | 0) && c.push([y, v])
                                    }
                            }(this.root, 0, 0), 0 == c.length ? null : c
                        }, this.serialize = function(e) {
                            var i = 2;
                            return e.writeInt16BE(t, 0),
                                function t(n) {
                                    null == n.q0 ? (e.writeUInt8(0 | n.value, i), i++) : (e.writeUInt8(255, i), i++, t(n.q0), t(n.q1), t(n.q2), t(n.q3))
                                }(this.root), i
                        }, this.unserialize = function(e, i) {
                            var r = 2,
                                s = new DataView(e);
                            t = s.getInt16(0), this.levels = Math.log(t) / Math.log(2), this.root = function t(e) {
                                if (r >= i) return null;
                                var a = s.getUint8(r);
                                return r++, 255 == a ? (a = e >> 1, (e = new n(e, 0)).q0 = t(a), e.q1 = t(a), e.q2 = t(a), e.q3 = t(a), e) : new n(e, a)
                            }(t)
                        }, this.update = function() {
                            this.root.updateState()
                        }, e.levels != ~~e.levels || 1 >= e.levels) throw Error("Invalid quadtree size");
                    e.root = new n, e.root.size = t
                }
            }
        }, {}],
        138: [function(t, e, i) {
            function n(t) {
                var e = new DataView(t);
                this.u8 = function(t, i) {
                    e.setUint8(t, i)
                }, this.u16 = function(t, i) {
                    e.setUint16(t, i, !0)
                }, this.u32 = function(t, i) {
                    e.setUint32(t, i, !0)
                }, this.s8 = function(t, i) {
                    e.setInt8(t, i)
                }, this.s16 = function(t, i) {
                    e.setInt16(t, i, !0)
                }, this.s32 = function(t, i) {
                    e.setInt32(t, i, !0)
                }, this.f32 = function(t, i) {
                    e.setFloat32(t, i, !0)
                }, this.f64 = function(t, i) {
                    e.setFloat64(t, i, !0)
                }
            }

            function r(t) {
                var e = new DataView(t);
                this.u8 = function(t) {
                    return e.getUint8(t)
                }, this.u16 = function(t) {
                    return e.getUint16(t, !0)
                }, this.u32 = function(t) {
                    return e.getUint32(t, !0)
                }, this.s8 = function(t) {
                    return e.getInt8(t)
                }, this.s16 = function(t) {
                    return e.getInt16(t, !0)
                }, this.s32 = function(t) {
                    return e.getInt32(t, !0)
                }, this.f32 = function(t) {
                    return e.getFloat32(t, !0)
                }, this.f64 = function(t) {
                    return e.getFloat64(t, !0)
                }
            }

            function s(t) {
                this.u8 = function(e, i) {
                    t.writeUInt8(i, e)
                }, this.u16 = function(e, i) {
                    t.writeUInt16LE(i, e)
                }, this.u32 = function(e, i) {
                    t.writeUInt32LE(i, e)
                }, this.s8 = function(e, i) {
                    t.writeInt8(i, e)
                }, this.s16 = function(e, i) {
                    t.writeInt16LE(i, e)
                }, this.s32 = function(e, i) {
                    t.writeInt32LE(i, e)
                }, this.f32 = function(e, i) {
                    t.writeFloatLE(i, e)
                }, this.f64 = function(e, i) {
                    t.writeDoubleLE(i, e)
                }
            }

            function a(t) {
                this.u8 = function(e) {
                    return t.readUInt8(e)
                }, this.u16 = function(e) {
                    return t.readUInt16LE(e)
                }, this.u32 = function(e) {
                    return t.readUInt32LE(e)
                }, this.s8 = function(e) {
                    return t.readInt8(e)
                }, this.s16 = function(e) {
                    return t.readInt16LE(e)
                }, this.s32 = function(e) {
                    return t.readInt32LE(e)
                }, this.f32 = function(e) {
                    return t.readFloatLE(e)
                }, this.f64 = function(e) {
                    return t.readDoubleLE(e)
                }
            }
            e.exports.Serializer = function(t) {
                function e(t) {
                    if (null == t) throw Error("Null value passed")
                }
                var i = t instanceof ArrayBuffer ? new n(t) : new s(t),
                    r = 0;
                this.u8 = function(t) {
                    e(t), i.u8(r, t), r += 1
                }, this.u16 = function(t) {
                    e(t), i.u16(r, t), r += 2
                }, this.u32 = function(t) {
                    e(t), i.u32(r, t), r += 4
                }, this.s8 = function(t) {
                    e(t), i.s8(r, t), r += 1
                }, this.s16 = function(t) {
                    e(t), i.s16(r, t), r += 2
                }, this.s32 = function(t) {
                    e(t), i.s32(r, t), r += 4
                }, this.f32 = function(t) {
                    e(t), i.f32(r, t), r += 4
                }, this.f64 = function(t) {
                    e(t), i.f64(r, t), r += 8
                }, this.str = function(t, e) {
                    for (t || (t = ""), e && t.length > e && (t = ""), this.u16(t.length), e = 0; e < t.length; e++) this.u16(t.charCodeAt(e))
                }, this.buffer = function(t, e) {
                    if (!t) throw Error("Null buffer passed");
                    if (t instanceof DataView) {
                        void 0 === e && (e = v.byteLength), this.u32(e);
                        for (var i = 0; i < e; i++) this.u8(t.getUint8(i))
                    } else
                        for (void 0 === e && (e = v.length), this.u32(e), i = 0; i < e; i++) this.u8(t.readUInt8(i))
                }, this.serialize = function(t, e) {
                    switch (t) {
                        case "str":
                            this.str(e);
                            break;
                        case "u8":
                            this.u8(e);
                            break;
                        case "u16":
                            this.u16(e);
                            break;
                        case "u32":
                            this.u32(e);
                            break;
                        case "s8":
                            this.s8(e);
                            break;
                        case "s16":
                            this.s16(e);
                            break;
                        case "s32":
                            this.s32(e);
                            break;
                        case "f32":
                            this.f32(e);
                            break;
                        case "f64":
                            this.f64(e);
                            break;
                        default:
                            throw Error("Unknown type: " + t)
                    }
                }, this.getSize = function() {
                    return r
                }
            }, e.exports.Unserializer = function(t) {
                var e = t instanceof ArrayBuffer ? new r(t) : new a(t),
                    i = 0;
                this.u8 = function() {
                    var t = e.u8(i);
                    return i += 1, t
                }, this.u16 = function() {
                    var t = e.u16(i);
                    return i += 2, t
                }, this.u32 = function() {
                    var t = e.u32(i);
                    return i += 4, t
                }, this.s8 = function() {
                    var t = e.s8(i);
                    return i += 1, t
                }, this.s16 = function() {
                    var t = e.s16(i);
                    return i += 2, t
                }, this.s32 = function() {
                    var t = e.s32(i);
                    return i += 4, t
                }, this.f32 = function() {
                    var t = e.f32(i);
                    return i += 4, t
                }, this.f64 = function() {
                    var t = e.f64(i);
                    return i += 8, t
                }, this.str = function() {
                    for (var t = "", e = this.u16(), i = 0; i < e; i++) t += String.fromCharCode(this.u16());
                    return t
                }, this.buffer = function() {
                    for (var t = this.u32(), e = new ArrayBuffer(t), i = new DataView(e), n = 0; n < t; n++) i.setUint8(n, this.u8());
                    return e
                }, this.unserialize = function(t) {
                    switch (t) {
                        case "str":
                            return this.str();
                        case "u8":
                            return this.u8();
                        case "u16":
                            return this.u16();
                        case "u32":
                            return this.u32();
                        case "s8":
                            return this.s8();
                        case "s16":
                            return this.s16();
                        case "s32":
                            return this.s32();
                        case "f32":
                            return this.f32();
                        case "f64":
                            return this.f64();
                        default:
                            throw Error("Unknown type: " + t)
                    }
                }
            }
        }, {}],
        139: [function(t, e, i) {
            t = t(141), e.exports = [{
                name: "player",
                quantity: t.N,
                instant: !0,
                vars: [{
                    key: "name",
                    type: "str"
                }, {
                    key: "uniqueName",
                    type: "str"
                }, {
                    key: "team",
                    type: "u8"
                }, {
                    key: "alive",
                    type: "u8"
                }, {
                    key: "level",
                    type: "u8"
                }, {
                    key: "health",
                    type: "u8",
                    instant: !0
                }, {
                    key: "currentWeapon",
                    type: "u8",
                    instant: !0
                }, {
                    key: "ammo",
                    type: "u16",
                    instant: !0
                }, {
                    key: "input",
                    type: "u8",
                    instant: !0
                }, {
                    key: "lastInput",
                    type: "u8",
                    instant: !0
                }, {
                    key: "angle",
                    type: "f32",
                    instant: !0
                }, {
                    key: "eye",
                    type: "u8",
                    instant: !0
                }, {
                    key: "inAir",
                    type: "u8"
                }, {
                    key: "jumpCountAir",
                    type: "u8"
                }, {
                    key: "jetPack",
                    type: "s32",
                    instant: !0
                }, {
                    key: "posX",
                    type: "f32"
                }, {
                    key: "posY",
                    type: "f32"
                }, {
                    key: "velX",
                    type: "f32"
                }, {
                    key: "velY",
                    type: "f32"
                }, {
                    key: "arrows0",
                    type: "u32"
                }, {
                    key: "arrows1",
                    type: "u32"
                }, {
                    key: "ropeType",
                    type: "u8",
                    instant: !0
                }, {
                    key: "ropePosX",
                    type: "f32",
                    instant: !0
                }, {
                    key: "ropePosY",
                    type: "f32",
                    instant: !0
                }, {
                    key: "ropeChar",
                    type: "u8",
                    instant: !0
                }, {
                    key: "statsKills",
                    type: "s16"
                }, {
                    key: "statsDeath",
                    type: "s16"
                }, {
                    key: "statsScore",
                    type: "s32"
                }, {
                    key: "statsXp",
                    type: "s32"
                }, {
                    key: "customBall",
                    type: "str"
                }, {
                    key: "customHat",
                    type: "u8"
                }, {
                    key: "customGlasses",
                    type: "u8"
                }],
                events: [{
                    key: "inputFlags",
                    vars: [{
                        key: "flags",
                        type: "u8"
                    }]
                }, {
                    key: "force",
                    vars: [{
                        key: "x",
                        type: "f32"
                    }, {
                        key: "y",
                        type: "f32"
                    }]
                }, {
                    key: "shot",
                    vars: [{
                        key: "weapon",
                        type: "u8"
                    }, {
                        key: "result",
                        type: "u8"
                    }]
                }]
            }, {
                name: "match",
                quantity: t.EXACTLY_ONE,
                vars: [{
                    key: "state",
                    type: "u8",
                    instant: !0
                }, {
                    key: "stalling",
                    type: "u8"
                }, {
                    key: "mapName",
                    type: "str"
                }, {
                    key: "gameMode",
                    type: "u8"
                }, {
                    key: "matchLength",
                    type: "u32"
                }, {
                    key: "warmup",
                    type: "u32"
                }],
                events: [{
                    key: "hitMap",
                    vars: [{
                        key: "bullet",
                        type: "u8"
                    }, {
                        key: "posX",
                        type: "f32"
                    }, {
                        key: "posY",
                        type: "f32"
                    }, {
                        key: "affectMap",
                        type: "u8"
                    }]
                }, {
                    key: "hitChar",
                    vars: [{
                        key: "bullet",
                        type: "u8"
                    }, {
                        key: "posX",
                        type: "f32"
                    }, {
                        key: "posY",
                        type: "f32"
                    }]
                }, {
                    key: "hitWater",
                    vars: [{
                        key: "bullet",
                        type: "u8"
                    }, {
                        key: "posX",
                        type: "f32"
                    }, {
                        key: "posY",
                        type: "f32"
                    }]
                }, {
                    key: "hitPG",
                    vars: [{
                        key: "bullet",
                        type: "u8"
                    }, {
                        key: "posX",
                        type: "f32"
                    }, {
                        key: "posY",
                        type: "f32"
                    }]
                }, {
                    key: "kill",
                    vars: [{
                        key: "killerId",
                        type: "u8"
                    }, {
                        key: "killedId",
                        type: "u8"
                    }, {
                        key: "cause",
                        type: "u8"
                    }]
                }]
            }, {
                name: "bullet",
                quantity: t.N,
                instant: !0,
                vars: [{
                    key: "time",
                    type: "u32"
                }, {
                    key: "ownerType",
                    type: "u8"
                }, {
                    key: "owner",
                    type: "u8"
                }, {
                    key: "leftOwnerRange",
                    type: "u8"
                }, {
                    key: "type",
                    type: "u8"
                }, {
                    key: "weapon",
                    type: "u8"
                }, {
                    key: "posX",
                    type: "f32"
                }, {
                    key: "posY",
                    type: "f32"
                }, {
                    key: "lastPosX",
                    type: "f32"
                }, {
                    key: "lastPosY",
                    type: "f32"
                }, {
                    key: "velX",
                    type: "f32"
                }, {
                    key: "velY",
                    type: "f32"
                }]
            }, {
                name: "item",
                quantity: t.N,
                vars: [{
                    key: "active",
                    type: "u8",
                    instant: !0
                }]
            }, {
                name: "obj",
                quantity: t.N,
                vars: [{
                    key: "active",
                    type: "u8",
                    instant: !0
                }]
            }, {
                name: "brick",
                quantity: t.N,
                instant: !0,
                vars: [{
                    key: "x",
                    type: "u16"
                }, {
                    key: "y",
                    type: "u16"
                }]
            }, {
                name: "usable",
                quantity: t.N,
                vars: [{
                    key: "usedBy",
                    type: "u8",
                    instant: !0
                }, {
                    key: "angle",
                    type: "f32",
                    instant: !0
                }, {
                    key: "heat",
                    type: "u16"
                }]
            }, {
                name: "team",
                quantity: t.N,
                vars: [{
                    key: "score",
                    type: "s32"
                }]
            }, {
                name: "plane",
                quantity: t.N,
                vars: [{
                    key: "type",
                    type: "u8"
                }, {
                    key: "startTick",
                    type: "u32"
                }, {
                    key: "crashTick",
                    type: "u32"
                }, {
                    key: "health",
                    type: "u8"
                }]
            }, {
                name: "modeCTF",
                quantity: t.MAX_ONE,
                vars: [{
                    key: "team0",
                    type: "u8",
                    instant: !0
                }, {
                    key: "team1",
                    type: "u8",
                    instant: !0
                }],
                events: [{
                    key: "capture",
                    vars: [{
                        key: "team",
                        type: "u8"
                    }, {
                        key: "player",
                        type: "u8"
                    }]
                }]
            }]
        }, {}],
        140: [function(t, e, i) {
            var n = t(139);
            t(141), t = new function() {
                for (var t = {}, e = {}, i = 0; i < n.length; i++) t[n[i].name] = n[i], e[n[i].name] = i;
                this.findSheetConfigById = function(t) {
                    return n[t]
                }, this.findSheetConfigByName = function(e) {
                    return t[e]
                }, this.findEventConfigByName = function(t, e) {
                    if (t.events)
                        for (var i = 0; i < t.events.length; i++)
                            if (t.events[i].key == e) return t.events[i];
                    return null
                }, this.findEventConfigById = function(t, e) {
                    return sheet.sheetConfig.events ? sheet.sheetConfig.events[e] : null
                }, this.findIdByName = function(t) {
                    return e[t]
                }, this.findVarConfig = function(t, e) {
                    for (var i = 0; i < t.vars.length; i++)
                        if (t.vars[i].key == e) return t.vars[i];
                    return null
                }
            }, e.exports = t
        }, {}],
        141: [function(t, e, i) {
            e.exports = {
                MAX_ONE: 1,
                EXACTLY_ONE: 2,
                N: 3
            }
        }, {}],
        142: [function(t, e, i) {
            (function(i) {
                var n, r;
                i.browser && (n = t(54)), i.browser && (r = t(34));
                var s = [{
                    vel: 110,
                    maxTime: 1,
                    gravityFactor: .5,
                    offset: 32,
                    strengthExplosion: 0,
                    strengthDirect: 2,
                    strengthPlane: 6,
                    circulationLength: 1e3,
                    circulationSpeed: 60,
                    tex: 0,
                    particleGround: "impactGround1",
                    particleWater: "impactWater1",
                    soundWater: "water1",
                    soundHitPlane: "impact3"
                }, {
                    vel: 18,
                    maxTime: 3,
                    gravityFactor: .5,
                    offset: 32,
                    strengthExplosion: 48,
                    strengthDirect: 5,
                    strengthPlane: 30,
                    circulationLength: 0,
                    circulationSpeed: 0,
                    tex: 1,
                    lightStrength: .8,
                    lightFadeOut: .04,
                    particleGround: "impactGround2",
                    particleWater: "impactWater2",
                    particlePlane: "impactGround2",
                    soundGround: "explosion1",
                    soundWater: "explosion2",
                    soundHitPlane: "explosion1"
                }, {
                    vel: 110,
                    maxTime: 1,
                    gravityFactor: .5,
                    offset: 32,
                    strengthExplosion: 0,
                    strengthDirect: 2,
                    strengthPlane: 3,
                    circulationLength: 1e3,
                    circulationSpeed: 60,
                    tex: 3,
                    texHud: 2,
                    particleGround: "impactGround1",
                    particleWater: "impactWater1",
                    soundWater: "water1",
                    soundHitPlane: "impact3"
                }, {
                    vel: 40,
                    maxTime: 2,
                    gravityFactor: .3,
                    offset: 32,
                    strengthExplosion: 0,
                    strengthDirect: 1,
                    strengthPlane: 1,
                    circulationLength: 180,
                    circulationSpeed: 30,
                    tex: 4,
                    texScale: 1.5,
                    particleWater: "impactWater1",
                    soundGround: "impact1",
                    soundWater: "water1",
                    soundHitPlane: "impact1"
                }, {
                    tex: 5
                }, {
                    vel: 0,
                    maxTime: 4,
                    gravityFactor: .5,
                    offset: 32,
                    strengthExplosion: 80,
                    strengthDirect: 10,
                    tex: 12,
                    texScale: 3,
                    texRatio: .5,
                    lightStrength: 2,
                    lightFadeOut: .1,
                    particleGround: "impactGround3",
                    particleWater: "impactWater3",
                    soundGround: "explosion3",
                    soundWater: "explosion2"
                }, {
                    vel: 110,
                    maxTime: 1,
                    gravityFactor: .5,
                    offset: 32,
                    strengthExplosion: 0,
                    strengthDirect: 1,
                    strengthPlane: 7,
                    circulationLength: 1e3,
                    circulationSpeed: 60,
                    tex: 6,
                    particleGround: "impactGround1",
                    particleWater: "impactWater1",
                    soundWater: "water1",
                    soundHitPlane: "impact3"
                }];
                e.exports = {
                    Bullet: function(t, e, i, a, o, l, h) {
                        this.id = t, this.time = i, this.type = e, this.leftOwnerRange = !1, this.lastPos = a.slice(), this.pos = a.slice(), this.vel = o.slice(), this.ownerType = 0, this.ownerObject = null, this.weapon = l, this.age = this.travelDistance = 0, this.gfxCirculation = this.gfx = null, h && (t = void 0 === s[e].texScale ? 1 : s[e].texScale, i = void 0 === s[e].texRatio ? 1 : s[e].texRatio, this.gfx = n.renderer.createSprite(n.layerBullets), this.gfx.setTexture(n.texBullets[s[e].tex]), this.gfx.size.x = 32 * t, this.gfx.size.y = 32 * t * i, this.gfx.anchor.x = .5, this.gfx.anchor.y = .5, this.gfx.angle = Math.atan2(o[1], o[0]), 0 < s[e].circulationLength && (this.gfxCirculation = r.addCirculation(), this.gfxCirculation.maxLength = 0, this.gfxCirculation.a = 0)), this.writeToSheet = function(t) {
                            t.set("time", this.time), t.set("ownerType", this.ownerType), t.set("leftOwnerRange", this.leftOwnerRange), t.set("type", this.type), t.set("weapon", this.weapon), t.set("posX", this.pos[0]), t.set("posY", this.pos[1]), t.set("lastPosX", this.lastPos[0]), t.set("lastPosY", this.lastPos[1]), t.set("velX", this.vel[0]), t.set("velY", this.vel[1])
                        }, this.readFromSheet = function(t) {
                            this.time = t.get("time"), this.ownerType = t.get("ownerType"), this.leftOwnerRange = t.get("leftOwnerRange"), this.type = t.get("type"), this.weapon = t.get("weapon"), this.pos[0] = t.get("posX"), this.pos[1] = t.get("posY"), this.lastPos[0] = t.get("lastPosX"), this.lastPos[1] = t.get("lastPosY"), this.vel[0] = t.get("velX"), this.vel[1] = t.get("velY")
                        }, this.setRenderPos = function(t, i) {
                            this.gfx.pos.x = t, this.gfx.pos.y = i, this.gfxCirculation && (this.gfxCirculation.x = t, this.gfxCirculation.y = i, t = this.travelDistance - this.age * s[e].circulationSpeed * .2, t = Math.max(t, 1), this.gfxCirculation.maxLength = Math.min(s[e].circulationLength, t))
                        }, this.setRenderAngle = function(t) {
                            this.gfx.angle = t, this.gfxCirculation && (this.gfxCirculation.a = t + Math.PI / 2)
                        }, this.remove = function() {
                            this.gfx && (this.gfx.remove(), this.gfxCirculation && r.decay(this.gfxCirculation, s[e].circulationSpeed))
                        }
                    },
                    BulletTypes: s,
                    WeaponTypes: [{
                        name: "Brick",
                        wearable: !0,
                        bricktool: !0,
                        bullet: 4,
                        tex: 4,
                        automatic: !1,
                        fireRate: 10,
                        ammoCount: 10,
                        key: 4,
                        sfxShot: "brick1",
                        sfxEmpty: "impact2"
                    }, {
                        name: "Grenade Launcher",
                        wearable: !0,
                        bullet: 1,
                        tex: 5,
                        automatic: !0,
                        fireRate: 4,
                        ammoCount: 10,
                        key: 3,
                        sfxShot: "shot4",
                        sfxEmpty: "trigger1",
                        sfxChange: "reload4"
                    }, {
                        name: "Revolver",
                        wearable: !0,
                        bullet: 0,
                        tex: 0,
                        automatic: !1,
                        fireRate: 10,
                        ammoCount: 14,
                        flashRange: 200,
                        key: 1,
                        sfxShot: "shot5",
                        sfxEmpty: "trigger1",
                        sfxChange: "reload3"
                    }, {
                        name: "Machine Gun",
                        wearable: !1,
                        bullet: 2,
                        tex: 3,
                        automatic: !0,
                        fireRate: 8,
                        ammoCount: 65535,
                        flashRange: 300,
                        sfxShot: "shot1",
                        sfxEmpty: "trigger1",
                        sfxChange: "reload2",
                        particleShot: "patronEject"
                    }, {
                        name: "Bow",
                        wearable: !0,
                        bullet: 3,
                        tex: 2,
                        texEmpty: 1,
                        emptyAboveRecoil: 0,
                        automatic: !0,
                        fireRate: 3,
                        ammoCount: 24,
                        key: 2,
                        sfxShot: "shot6",
                        sfxChange: "reload5"
                    }, {
                        name: "Plane Bomb",
                        wearable: !1,
                        bullet: 4,
                        tex: null,
                        sfxShot: "shot6"
                    }, {
                        name: "Shotgun",
                        wearable: !0,
                        bullet: 6,
                        tex: 6,
                        automatic: !1,
                        fireRate: 10,
                        ammoCount: 24,
                        flashRange: 200,
                        fanAmount: 4,
                        fanAngle: .25,
                        key: 1,
                        sfxShot: "shot5",
                        sfxEmpty: "trigger1",
                        sfxChange: "reload3"
                    }]
                }
            }).call(this, t(7))
        }, {}],
        143: [function(t, e, i) {
            (function(i) {
                function n(t, e) {
                    if (this.simulation = t, this.ballGfx = e, this.pos = [0, 0], this.vel = [0, 0], !i.browser)
                        for (this.weapons = [], t = 0; t < r.maxWeapons; t++) this.weapons[t] = null;
                    this.gridArea = [-1, -1, -1, -1], this.inputList = [], this.flagsList = [], this.forceList = []
                }
                var r = t(150),
                    s = t(142).WeaponTypes;
                t(131), n.prototype.player = null, n.prototype.ballGfx = null, n.prototype.renderPos = null, n.prototype.renderAngle = null, n.prototype.pos = null, n.prototype.vel = null, n.prototype.radius = 32, n.prototype.gridArea = null, n.prototype.currentInput = 0, n.prototype.lastInput = 0, n.prototype.currentFlags = 0, n.prototype.angle = 0, n.prototype.ropeTarget = null, n.prototype.fakeRopeTarget = null, n.prototype.fakeRopeProgress = null, n.prototype.tile = null, n.prototype.jumpCountAir = 0, n.prototype.inAir = !0, n.prototype.lastInAir = !0, n.prototype.usable = null, n.prototype.currentWeapon = 0, n.prototype.lastWeapon = -1, n.prototype.recoil = 0, n.prototype.weapons = null, n.prototype.health = 0, n.prototype.ammo = 0, n.prototype.eye = -1, n.prototype.lastHit = -1e3, n.prototype.jetPackSince = -1, n.prototype.simulation = null, n.prototype.body = null, n.prototype.inputList = null, n.prototype.flagsList = null, n.prototype.forceList = null, n.prototype.setRenderAngle = function(t) {
                    this.renderAngle = t, this.ballGfx.setAngle(t)
                }, n.prototype.setRenderPos = function(t, e) {
                    this.renderPos = [t, e], this.ballGfx.setPosition([~~t, ~~e])
                }, n.prototype.setArrows = function(t, e) {
                    for (var i = 0; 32 > i; i++) this.ballGfx.setArrow(i + e, t >> i & 1)
                }, n.prototype.updateRecoil = function() {
                    this.recoil = Math.max(this.recoil - .15, 0), this.ballGfx.recoil = this.recoil
                }, n.prototype.updateJetpackFire = function(t) {
                    32 & this.currentInput && this.hasJetpack(t) ? (this.ballGfx.doJetpackFire(), this.ballGfx.setJetpackSfx(!0)) : this.ballGfx.setJetpackSfx(!1)
                }, n.prototype.updateWalkAnimation = function() {
                    var t = !1;
                    3 & this.currentInput && (t = !0), this.inAir && (t = !1), this.ballGfx.setWalkAnimation(t), this.ballGfx.updateWalkAnimation()
                }, n.prototype.getInputAt = function(t) {
                    for (var e = null, i = 0; i < this.inputList.length && !(this.inputList[i].tick > t); i++) e = this.inputList[i];
                    return e
                }, n.prototype.getFlagsAt = function(t) {
                    for (var e = 0; e < this.flagsList.length; e++)
                        if (this.flagsList[e].tick == t) return this.flagsList[e];
                    return null
                }, n.prototype.hasJetpack = function(t) {
                    return -1 != this.jetPackSince && t - this.jetPackSince < 30 * r.ticksPerSecond
                }, n.prototype.getExternalForceAt = function(t) {
                    for (var e = 0; e < this.forceList.length; e++)
                        if (this.forceList[e].tick == t) return this.forceList[e].force.slice();
                    return null
                }, n.prototype.setFlags = function(t) {
                    this.currentFlags = t
                }, n.prototype.setCurrentInput = function(t, e) {
                    t != this.currentInput && (this.lastInput = this.currentInput, this.currentInput = t), e && (this.lastInput = e)
                }, n.prototype.applyExternalForce = function(t) {
                    (t = this.getExternalForceAt(t)) && (this.vel[0] = t[0], this.vel[1] = t[1])
                }, n.prototype.updateControl = function(t) {
                    var e = this.currentInput,
                        i = 1 & this.currentFlags,
                        n = 32 & e,
                        s = 0,
                        a = r.walkSpeed;
                    1 & e && (s -= a), 2 & e && (s += a), this.inAir ? this.ropeTarget || (0 > s && this.vel[0] > s && (this.vel[0] = s), 0 < s && this.vel[0] < s && (this.vel[0] = s), this.vel[0] *= .925) : (this.vel[0] *= .5, this.jumpCountAir = 0, this.ropeTarget || 0 != s && (this.vel[0] = s)), !n && i && (this.inAir ? 0 == this.jumpCountAir && (this.vel[1] = r.jumpPower1, this.jumpCountAir++) : this.vel[1] = r.jumpPower0), n && this.hasJetpack(t) && (this.vel[1] += r.jetpackPower), this.currentFlags = 0, this.inAir = !0
                }, i.browser || (n.prototype.hasWeapon = function(t) {
                    return !!this.weapons[t]
                }, n.prototype.giveWeapon = function(t) {
                    this.weapons[t] = {
                        ammo: s[t].ammoCount,
                        lastShot: 0,
                        triggered: !1,
                        heat: 0
                    }, this.currentWeapon = t
                }), e.exports = n
            }).call(this, t(7))
        }, {}],
        144: [function(t, e, i) {
            e.exports = function(t, e) {
                this.grid = [], this.width = t, this.height = e, this.regs = [];
                for (var i = 0; i < e; i++) {
                    this.grid[i] = [];
                    for (var n = 0; n < t; n++) this.grid[i][n] = []
                }
                this.delete = function(t) {
                    for (var e = [], i = 0; i < this.regs.length; i++) this.regs[i].obj == t && e.push(this.regs[i]);
                    for (; 0 < e.length;) {
                        i = e.pop();
                        var n = this.grid[i.y][i.x],
                            r = n.indexOf(t);
                        if (-1 == r) throw Error("Grid delete failed at idx (cell)");
                        if (n.splice(r, 1), -1 == (i = this.regs.indexOf(i))) throw Error("Grid delete failed at idx (reg)");
                        this.regs.splice(i, 1)
                    }
                }, this.add = function(t, e, i) {
                    0 > e || e >= this.width || 0 > i || i >= this.height || (this.regs.push({
                        obj: t,
                        x: e,
                        y: i
                    }), this.grid[i][e].push(t))
                }, this.set = function(t, e, i, n, r) {
                    for (this.delete(t); e <= n; e++)
                        for (var s = i; s <= r; s++) this.add(t, e, s)
                }, this.get = function(t, e) {
                    return 0 > t || t >= this.width || 0 > e || e >= this.height ? null : this.grid[e][t]
                }, this.getArea = function(t, e, i, n, r) {
                    for (var s = null; t <= i; t++)
                        for (var a = e; a <= n; a++)
                            if (!(0 > t || t >= this.width || 0 > a || a >= this.height))
                                for (var o = this.grid[a][t], l = 0; l < o.length; l++) o[l] != r && (s || (s = []), s.push(o[l]));
                    return s
                }
            }
        }, {}],
        145: [function(t, e, i) {
            e.exports = function(t, e) {
                this.team = t, this.pos = e
            }
        }, {}],
        146: [function(t, e, i) {
            e.exports = {
                ItemTypes: [{
                    texType: 0,
                    texId: 0,
                    texScale: 1,
                    radius: 20,
                    coolDown: 20,
                    soundPickup: "item1",
                    particlesPickup: "collectHeart"
                }, {
                    texType: 1,
                    texId: 0,
                    texScale: .5,
                    radius: 36,
                    coolDown: 20,
                    soundPickup: "reload3"
                }, {
                    texType: 1,
                    texId: 5,
                    texScale: .5,
                    radius: 36,
                    coolDown: 20,
                    soundPickup: "reload4"
                }, {
                    texType: 1,
                    texId: 4,
                    texScale: .5,
                    radius: 36,
                    coolDown: 20,
                    soundPickup: "pickup1"
                }, {
                    texType: 1,
                    texId: 6,
                    texScale: .5,
                    radius: 36,
                    coolDown: 20,
                    soundPickup: "reload2"
                }, {
                    texType: 0,
                    texId: 1,
                    texScale: 1,
                    radius: 36,
                    coolDown: 30,
                    soundPickup: "pickup1"
                }],
                Item: function() {
                    this.y = this.x = this.type = this.id = 0, this.active = !0, this.sprite = null, this.lastChange = 0
                }
            }
        }, {}],
        147: [function(t, e, i) {
            (function(i) {
                function n(t, e) {
                    if (!t) throw Error("No map def");
                    if (this.tileSize = e, this.map = [], this.mapDef = t, this.handlerWatchPoints = null, this.usables = [], this.spawnPoints = [], this.neutralSpawnPoints = [], this.blockZones = [], this.flagPoints = [], this.paths = [], this.watchPoints = i.browser ? null : [], t.specials)
                        for (e = 0; e < t.specials.length; e++) {
                            var n = t.specials[e];
                            switch (n.type) {
                                case "mg1":
                                    this.usables.push({
                                        type: n.type,
                                        pos: n.pos,
                                        angle: n.angle || 0,
                                        usedBy: null,
                                        sheet: null,
                                        weaponState: null,
                                        gfxPod: null,
                                        gfxGun: null
                                    })
                            }
                        }
                    for (var r in t = h[this.mapDef.tileset])
                        if (t[r].b) {
                            this.tileBrickId = r;
                            break
                        }
                }
                var r = i.browser ? t(137) : t(122),
                    s = t(146).Item;
                t(146);
                var a, o = t(145),
                    l = t(134),
                    h = t(17),
                    c = t(13);
                i.browser && (a = t(54)), n.prototype.map = null, n.prototype.mapDef = null, n.prototype.dirtyQuadtree = !1, n.prototype.hasDamage = !1, n.prototype.tileSize = 0, n.prototype.mapWidth = 0, n.prototype.mapHeight = 0, n.prototype.quadTree = null, n.prototype.quadTreeLevels = 0, n.prototype.quadTreeTileLevel = 0, n.prototype.handlerWatchPoints = null, n.prototype.loaded = !1, n.prototype.items = null, n.prototype.watchPoints = null, n.prototype.objectMap = null, n.prototype.objects = null, n.prototype.usables = null, n.prototype.spawnPoints = null, n.prototype.flagPoints = null, n.prototype.neutralSpawnPoints = null, n.prototype.blockZones = null, n.prototype.paths = null, n.prototype.flags = null, n.prototype.waterLevel = 1e5, n.prototype.tileBrickId = -1, n.prototype.loadFromUrl = function(t, e) {
                    var i = this,
                        n = new XMLHttpRequest;
                    n.open("GET", t, !0), n.responseType = "arraybuffer", n.onreadystatechange = function() {
                        n.readyState == XMLHttpRequest.DONE && 200 == n.status && (i.loadFromArrayBuffer(n.response), e())
                    }, n.send()
                }, n.prototype.loadFromArrayBuffer = function(t) {
                    if (!(12 <= (t = new DataView(t)).byteLength)) throw Error("ERROR\tCannot read map");
                    if (1128418630 == t.getInt32(0, !1)) {
                        var e = t.getInt8(4);
                        t.getInt8(5);
                        var i = t.getInt16(6, !0),
                            n = t.getInt16(8, !0);
                        if (2 != e) throw Error("Invalid map version");
                        for (this.mapWidth = i, this.mapHeight = n, this.quadTree = new r(Math.pow(2, Math.ceil(Math.log(Math.max(i, n)) / Math.log(2))) * this.tileSize), this.quadTreeLevels = this.quadTree.levels, this.quadTreeTileLevel = this.quadTreeLevels - Math.log(this.tileSize) / Math.log(2), e = 10; e < t.byteLength;) {
                            i = t.getInt8(e + 0), n = t.getInt8(e + 1);
                            var s = t.getInt32(e + 2, !0);
                            if (42 != i) throw Error("ERROR\tInvalid chunk head");
                            if (!this.processChunk(t, n, e + 6, s)) throw Error("ERROR\tCannot process chunk " + n);
                            e += 6 + s
                        }
                        this.processObjects(), this.loaded = this.dirtyQuadtree = !0
                    }
                    if (2 != this.spawnPoints.length || 4 != this.spawnPoints[0].length || 4 != this.spawnPoints[1].length) throw Error("ERROR\tInvalid spawn points");
                    if (2 == this.flagPoints.length)
                        for (this.flags = [], t = 0; 2 > t; t++) this.flags[t] = new o(t, this.flagPoints[t]);
                    this.update()
                }, n.prototype.processChunk = function(t, e, i, n) {
                    return 1 == e ? this.processTileDataChunk(t, i, n) : 2 == e ? this.processItemDataChunk(t, i, n) : 3 == e ? this.processObjDefChunk(t, i, n) : 4 == e ? this.processObjDataChunk(t, i, n) : 5 == e && this.processExtraDataChunk(t, i, n), !0
                }, n.prototype.processTileDataChunk = function(t, e, n) {
                    if (n == this.mapWidth * this.mapHeight) {
                        for (var r = n = 0; r < this.mapHeight; r++) {
                            for (var s = [], a = 0; a < this.mapWidth; a++) {
                                var o = t.getUint8(n + e);
                                0 == o ? s.push(null) : (s.push(this.generateTileObject(a, r, o)), i.browser || this.addTileToQuadTree(a, r, o)), n++
                            }
                            this.map.push(s)
                        }
                        return !0
                    }
                    return !1
                }, n.prototype.processItemDataChunk = function(t, e, i) {
                    if (0 != i % 5) throw Error("Invalid items count");
                    i /= 5, this.items = [];
                    for (var n = 0; n < i; n++) {
                        var r = t.getInt16(e, !0);
                        e += 2;
                        var a = t.getInt16(e, !0);
                        e += 2;
                        var o = t.getInt8(e);
                        e += 1;
                        var l = new s;
                        l.id = n, l.type = o, l.x = r, l.y = a, this.items.push(l)
                    }
                }, n.prototype.processObjDefChunk = function(t, e, i) {
                    this.objectMap = [];
                    for (var n = e; n < e + i;)
                        for (var r = "";;) {
                            var s = t.getInt8(n++);
                            if (0 == s) {
                                this.objectMap.push(r);
                                break
                            }
                            r += String.fromCharCode(s)
                        }
                }, n.prototype.processObjDataChunk = function(t, e, i) {
                    if (0 != i % 5) throw Error("Invalid objects count");
                    i /= 5, this.objects = [];
                    for (var n = 0; n < i; n++) {
                        var r = t.getInt16(e, !0);
                        e += 2;
                        var s = t.getInt16(e, !0);
                        e += 2;
                        var a = t.getInt8(e);
                        e += 1, this.objects.push({
                            type: a,
                            typeDef: null,
                            x: r,
                            y: s,
                            active: !0,
                            sprite: null,
                            animTime: 0,
                            renderPos: null
                        })
                    }
                }, n.prototype.processExtraDataChunk = function(t, e, i) {
                    for (var n = e; n < e + i;) {
                        var r = t.getInt8(n);
                        switch (n += 1, r) {
                            case 0:
                            case 1:
                                var s = t.getInt16(n, !0);
                                n += 2;
                                var a = t.getInt16(n, !0);
                                n += 2;
                                var o = t.getInt16(n, !0);
                                n += 2;
                                var h = t.getInt16(n, !0);
                                n += 2, this.spawnPoints[r] = [s, a, o, h];
                                break;
                            case 2:
                                s = t.getInt16(n, !0), n += 2, a = t.getInt16(n, !0), n += 2, o = t.getInt16(n, !0), n += 2, h = t.getInt16(n, !0), n += 2, this.neutralSpawnPoints.push([s, a, o, h]);
                                break;
                            case 3:
                            case 4:
                                s = t.getInt16(n, !0), n += 2, a = t.getInt16(n, !0), n += 2, this.flagPoints[r - 3] = [s, a];
                                break;
                            case 5:
                                this.waterLevel = t.getInt16(n, !0), n += 2;
                                break;
                            case 6:
                                s = t.getInt16(n, !0), n += 2, a = t.getInt16(n, !0), n += 2, o = t.getInt16(n, !0), n += 2, h = t.getInt16(n, !0), n += 2, this.blockZones.push([s, a, o, h]);
                                break;
                            case 7:
                                for (a = t.getUint8(n), n += 1, s = "", r = 0; r < a; r++) s += String.fromCharCode(t.getUint8(n++));
                                for ((o = new l).name = s, h = t.getUint8(n), n += 1, r = 0; r < h; r++) s = t.getInt32(n, !0), n += 4, a = t.getInt32(n, !0), n += 4, o.points.push([s, a]);
                                o.interpolatePath(), this.paths.push(o);
                                break;
                            default:
                                throw Error("Unknown type id " + r)
                        }
                    }
                }, n.prototype.generateTileObject = function(t, e, i) {
                    return {
                        x: t,
                        y: e,
                        tile: i,
                        sprite: null,
                        modifiedTex: null,
                        modifiedCtx: null,
                        isModified: !1
                    }
                }, n.prototype.addTileToQuadTree = function(t, e, i) {
                    if (t *= this.tileSize, e *= this.tileSize, 0 == (i = h[this.mapDef.tileset][i].lock || []).length) this.quadTree.setValue(t, e, 1, this.quadTreeTileLevel);
                    else
                        for (var n = 0; n < this.tileSize; n++)
                            for (var r = 0; r < this.tileSize; r++) {
                                for (var s = !1, a = 0; a < i.length; a++)
                                    if (r >= i[a][0] && r < i[a][2] && n >= i[a][1] && n < i[a][3]) {
                                        s = !0;
                                        break
                                    } this.quadTree.setValue(t + r, e + n, s ? 2 : 1, this.quadTree.levels)
                            }
                }, n.prototype.addBrick = function(t, e, n) {
                    this.map[e][t] ? this.map[e][t].isModified && (this.map[e][t].modifiedTex = null, this.map[e][t].modifiedCtx = null, this.map[e][t].sprite && (this.map[e][t].sprite.remove(), this.map[e][t].sprite = null), this.map[e][t].isModified = !1) : this.map[e][t] = this.generateTileObject(t, e, this.tileBrickId), n && this.quadTree.setValue(t * this.tileSize, e * this.tileSize, 1, this.quadTreeTileLevel), i.browser && a && a.mapGfx.addBrick(t, e)
                }, n.prototype.isTileBlocked = function(t, e) {
                    function i(t, e, i) {
                        return !(e < t[0] || e >= t[0] + t[2] || i < t[1] || i >= t[1] + t[3])
                    }
                    for (var n = 0; n < this.blockZones.length; n++)
                        if (i(this.blockZones[n], t, e)) return !0;
                    for (n = 0; n < this.spawnPoints.length; n++)
                        if (i(this.spawnPoints[n], t, e)) return !0;
                    for (n = 0; n < this.neutralSpawnPoints.length; n++)
                        if (i(this.neutralSpawnPoints[n], t, e)) return !0
                }, n.prototype.getPath = function(t) {
                    for (var e = 0; e < this.paths.length; e++)
                        if (this.paths[e].name == t) return this.paths[e];
                    return null
                }, n.prototype.processObjects = function() {
                    for (var t = 0; t < this.objects.length; t++) {
                        var e = this.objects[t],
                            i = c[this.mapDef.objset].f[this.objectMap[e.type]];
                        if (e.typeDef = i, i = i[4]) {
                            if ("center" != i) throw Error("Invalid wp: " + i);
                            this.addWatchPoint(e.x * this.tileSize + e.typeDef[2] / 2, (e.y + 1) * this.tileSize, t)
                        }
                    }
                }, n.prototype.addWatchPoint = function(t, e, i) {
                    this.watchPoints && this.watchPoints.push({
                        x: t,
                        y: e,
                        ref: i
                    })
                }, n.prototype.stampOut = function(t, e, n) {
                    var r = this.quadTree;
                    this.dirtyQuadtree = !0;
                    var s = ~~t[0],
                        o = ~~t[1];
                    if (r.setCircle(s, o, e, 0, 2), i.browser && a) a.mapGfx.stampOut(t, e);
                    else {
                        r = ~~((s - e) / this.tileSize), s = ~~((s + e) / this.tileSize);
                        var l = ~~((o + e) / this.tileSize);
                        for (o = ~~((o - e) / this.tileSize); o <= l; o++)
                            if (!(0 > o || o >= this.map.length))
                                for (var h = r; h <= s; h++)
                                    if (!(0 > h || h >= this.map[o].length)) {
                                        var c = this.map[o][h];
                                        c && (c.isModified = !0)
                                    }
                    }
                    i.browser || this.triggerDestructionWatchPoints(t, e, n), this.hasDamage = !0
                }, n.prototype.stampOutUsingTree = function() {
                    i.browser && a && (a.mapGfx.stampOutUsingTree(), this.hasDamage = !0)
                }, n.prototype.triggerDestructionWatchPoints = function(t, e, i) {
                    if (this.watchPoints) {
                        e *= e;
                        for (var n = 0; n < this.watchPoints.length; n++) {
                            var r = this.watchPoints[n].x - t[0],
                                s = this.watchPoints[n].y - t[1];
                            r * r + s * s <= e && this.handlerWatchPoints && this.handlerWatchPoints(this.watchPoints[n].ref, i)
                        }
                    }
                }, n.prototype.getNearUsableObject = function(t) {
                    for (var e = null, i = 0; i < this.usables.length; i++) {
                        var n = this.usables[i],
                            r = (n.pos[0] + .5) * this.tileSize - t[0],
                            s = (n.pos[1] + .5) * this.tileSize - t[1];
                        if (150 > Math.sqrt(r * r + s * s)) {
                            e = n;
                            break
                        }
                    }
                    return e
                }, n.prototype.getSpawnPos = function(t) {
                    return [(t = this.spawnPoints[t])[0] + (t[2] - 1) * Math.random(), t[1] + (t[3] - 1) * Math.random()]
                }, n.prototype.getNeutralSpawnPos = function() {
                    var t = [];
                    this.spawnPoints[0] && t.push(this.spawnPoints[0]), this.spawnPoints[1] && t.push(this.spawnPoints[1]);
                    for (var e = 0; e < this.neutralSpawnPoints.length; e++) t.push(this.neutralSpawnPoints[e]);
                    return [(t = t[~~(t.length * Math.random())])[0] + (t[2] - 1) * Math.random(), t[1] + (t[3] - 1) * Math.random()]
                }, n.prototype.getNeutralSpawnPosExcludingTeam = function(t) {
                    var e = [];
                    for (this.spawnPoints[0] && 0 == t && e.push(this.spawnPoints[0]), this.spawnPoints[1] && 1 == t && e.push(this.spawnPoints[1]), t = 0; t < this.neutralSpawnPoints.length; t++) e.push(this.neutralSpawnPoints[t]);
                    return [(e = e[~~(e.length * Math.random())])[0] + (e[2] - 1) * Math.random(), e[1] + (e[3] - 1) * Math.random()]
                }, n.prototype.isLoaded = function() {
                    return this.loaded
                }, n.prototype.onWatchPoint = function(t) {
                    this.handlerWatchPoints = t
                }, n.prototype.update = function() {
                    this.dirtyQuadtree && (this.quadTree.update(), this.dirtyQuadtree = !1)
                }, n.prototype.destroy = function() {
                    this.quadTree.destroy(), this.quadTree = null
                }, n.prototype.isValidCoord = function(t, e) {
                    return !(0 > t || 0 > e || t >= this.mapWidth || e >= this.mapHeight)
                }, e.exports = n
            }).call(this, t(7))
        }, {}],
        148: [function(t, e, i) {
            var n = t(150),
                r = t(142).BulletTypes,
                s = t(143),
                a = t(131);
            e.exports = function(t) {
                var e = [0, n.gravityY * (t.map.mapDef.gravity || 1)],
                    i = null,
                    o = !1,
                    l = .2 / (n.ticksPerSecond / 40);
                this.setBorder = function(t, e) {
                    i = t, o = e
                }, this.update = function(e) {
                    for (var i = 0; 5 > i; i++) this.step(l, e);
                    t.map.update()
                }, this.updateBullets = function() {
                    for (var t = 0; 5 > t; t++) this.applyBulletPhysic(l)
                }, this.step = function(e, i) {
                    t.updateCharGrid(), this.applyGravity(e, i), this.applyRope(e, i), this.integrateVelocity(e, i), t.updateCharGrid(), this.collideCharBorder(), this.collideCharCharAll(), this.collideCharMapAll(), this.debugCharacters()
                }, this.applyGravity = function(i, n) {
                    var r = e[0] * i;
                    i *= e[1];
                    for (var s = 0; s < t.characters.length; s++) {
                        var a = t.characters[s];
                        a.usable || n && a != t.localCharacter || (a.vel[0] -= r, a.vel[1] -= i)
                    }
                }, this.applyRope = function(e, i) {
                    function r(t, i, r) {
                        var s = r[0] - i[0];
                        i = r[1] - i[1], (r = Math.sqrt(s * s + i * i)) >= n.minRopeLength && (s = s / r * n.ropePower, i = i / r * n.ropePower, r = 2 & t.currentInput, 1 & t.currentInput && (s -= .4 * n.walkSpeed), r && (s += .4 * n.walkSpeed), t.vel[0] += s * e, t.vel[1] += i * e, t.vel[0] *= .98, t.vel[1] *= .98)
                    }
                    for (var a = 0; a < t.characters.length; a++) {
                        var o = t.characters[a];
                        if (!(o.usable || i && o != t.localCharacter) && o.ropeTarget)
                            if (o.ropeTarget instanceof s) {
                                var l = o.ropeTarget.pos[0],
                                    h = o.ropeTarget.pos[1];
                                r(o, o.pos, [l, h]), r(o.ropeTarget, [l, h], o.pos)
                            } else l = o.ropeTarget[0], h = o.ropeTarget[1], r(o, o.pos, [l, h])
                    }
                }, this.applyBulletPhysic = function(i) {
                    for (var n = e[1] * i, s = 0; s < t.bullets.length; s++) {
                        var a = t.bullets[s];
                        if (a.vel[1] -= n * r[a.type].gravityFactor, a.pos[0] += a.vel[0] * i, a.pos[1] += a.vel[1] * i, !a.leftOwnerRange && 0 == a.ownerType && a.ownerObject) {
                            var o = a.lastPos[0] - a.ownerObject.pos[0],
                                l = a.lastPos[1] - a.ownerObject.pos[1];
                            o * o + l * l > a.ownerObject.radius * a.ownerObject.radius * 2 && (a.leftOwnerRange = !0)
                        }
                    }
                }, this.checkBulletCollisions = function() {
                    function e(t, e, i) {
                        n.push({
                            type: 1,
                            bullet: e,
                            pos: t,
                            affectMap: i
                        });
                        var a = r[e.type].strengthExplosion;
                        0 != a && s.explosion(t, a, i, e)
                    }
                    for (var n = [], s = this, l = 0; l < t.bullets.length; l++) {
                        var h = t.bullets[l];
                        if (i) {
                            var c = null;
                            (0 >= h.pos[0] || 0 >= h.pos[1]) && (c = h.pos.slice()), (h.pos[0] >= i[0] || h.pos[1] >= i[1] && o) && (c = h.pos.slice()), c && e(c, h, !0)
                        }
                        if (null != (c = t.map.quadTree.findFirstOnLine(h.lastPos[0], h.lastPos[1], h.pos[0], h.pos[1], 0, !0))) {
                            var u = 2 != c[2];
                            e(c.slice(0, 2), h, u)
                        }
                        for (c = 0; c < t.characters.length; c++) {
                            var p = t.characters[c];
                            (u = a.collideLineCircle([h.pos, h.lastPos], p.pos, p.radius)) && (h.leftOwnerRange || 0 != h.ownerType || p != h.ownerObject) && n.push({
                                type: 2,
                                bullet: h,
                                character: p,
                                pos: h.pos.slice()
                            })
                        }
                        for (h.pos[1] > t.map.waterLevel + 32 && n.push({
                                type: 3,
                                bullet: h,
                                pos: [h.lastPos[0] + (t.map.waterLevel - h.lastPos[1]) / (h.pos[1] - h.lastPos[1]) * (h.pos[0] - h.lastPos[0]), t.map.waterLevel]
                            }), c = 0; c < t.physicGenerics.length; c++)(p = t.physicGenerics[c]).shootable && -1 == p.bulletImmunity.indexOf(h.type) && (u = a.collideLineCircle([h.pos, h.lastPos], p.pos, p.radius)) && n.push({
                            type: 4,
                            bullet: h,
                            pg: p,
                            pos: h.pos.slice()
                        })
                    }
                    return n
                }, this.calculateHitForcesToChars = function(e) {
                    for (var i = [], s = 0; s < e.length; s++) {
                        var a = e[s];
                        if (0 != a.type && null != a.bullet) {
                            var o = a.bullet.pos;
                            a = r[a.bullet.type].strengthExplosion;
                            for (var l = 0; l < t.characters.length; l++) {
                                var h = t.characters[l];
                                if (!h.usable) {
                                    var c = h.pos[0] - o[0],
                                        u = h.pos[1] - o[1],
                                        p = Math.sqrt(c * c + u * u);
                                    if (c /= p, u /= p, 1 <= (p = 2.5 / (p / a))) {
                                        t: {
                                            for (var d = 0; d < i.length; d++)
                                                if (i[d].character == h) {
                                                    h = i[d];
                                                    break t
                                                } h = {
                                                character: h,
                                                force: [0, 0]
                                            },
                                            i.push(h)
                                        }
                                        h.force[0] += c * p * n.explosionPower,
                                        h.force[1] += u * p * n.explosionPower
                                    }
                                }
                            }
                        }
                    }
                    return i
                }, this.integrateVelocity = function(e, i) {
                    for (var r = 0; r < t.characters.length; r++) {
                        var s = t.characters[r];
                        if (!(s.usable || i && s != t.localCharacter)) {
                            var a = n.maxVelocity;
                            s.vel[0] = Math.min(a, Math.max(s.vel[0], -a)), s.vel[1] = Math.max(s.vel[1], -a), s.vel[1] = Math.min(s.vel[1], 3 * a), s.pos[0] += s.vel[0] * e, s.pos[1] += s.vel[1] * e
                        }
                    }
                }, this.collideCharBorder = function() {
                    if (i)
                        for (var e = 0; e < t.characters.length; e++) {
                            var n = t.characters[e];
                            n.usable || (0 > n.pos[0] - n.radius && (n.pos[0] = n.radius, n.inAir = !1), 0 > n.pos[1] - n.radius && (n.pos[1] = n.radius, n.inAir = !1), n.pos[0] + n.radius > i[0] && (n.pos[0] = i[0] - n.radius, n.inAir = !1), o && n.pos[1] + n.radius > i[1] && (n.pos[1] = i[1] - n.radius, n.inAir = !1))
                        }
                }, this.collideCharMapAll = function() {
                    for (var e = 0; e < t.characters.length; e++) t.characters[e].usable || this.collideCharMap(t.characters[e])
                }, this.collideCharCharAll = function() {
                    for (var e = 0; e < t.characters.length; e++)
                        if (!t.characters[e].usable)
                            for (var i = 0; i < t.characters.length; i++) t.characters[i].usable || e != i && this.collideCharChar(t.characters[e], t.characters[i])
                }, this.collideCharMap = function(e) {
                    var i = t.map.quadTree.findInCircle(e.pos[0], e.pos[1], e.radius, 0, !0);
                    if (i) {
                        for (var n = 0; n < i.length; n++) {
                            var r = i[n],
                                s = r[0] - e.pos[0];
                            r = r[1] - e.pos[1];
                            var a = Math.sqrt(s * s + r * r);
                            0 != a && this.solveCharMap(e, -s / a, -r / a, a, e.radius)
                        }
                        2 < i.length && this.solveCharMapMultipleHits(e, i)
                    }
                }, this.collideCharChar = function(t, e) {
                    var i = t.pos[0] - e.pos[0],
                        n = t.pos[1] - e.pos[1],
                        r = t.radius + e.radius;
                    if (!(r < Math.abs(i) || r < Math.abs(n))) {
                        var s = i * i + n * n;
                        s <= r * r && (0 == (s = Math.sqrt(s)) ? (i = 0, n = 1) : (i /= s, n /= s), this.solveCharChar(t, e, i, n, s, r))
                    }
                }, this.solveCharMap = function(t, e, i, n, r) {
                    0 > (n = r - n) || (.6 < Math.abs(e) ? (t.pos[0] += n * e, t.pos[1] += n * i, t.vel[0] = 0) : (t.pos[1] += n * i, t.vel[1] = 0, -.6 > i && (t.inAir = !1)))
                }, this.solveCharMapMultipleHits = function(t, e) {
                    for (var i = 0, n = 0, r = 0; 60 > r; r++) {
                        for (var s = -1, a = t.radius * t.radius * 2, o = 0; o < e.length; o++) {
                            var l = e[o][0] - t.pos[0],
                                h = e[o][1] - t.pos[1],
                                c = l * l + h * h;
                            c < a && (a = c, s = o), 0 == r && (0 < h && i++, Math.abs(l) > t.radius - 1 && n++)
                        }
                        if (a = Math.sqrt(a), -1 != s && (o = 1 - a / t.radius, s = [(e[s][0] - t.pos[0]) * o, (e[s][1] - t.pos[1]) * o], t.pos[0] -= s[0], t.pos[1] -= s[1]), a + .05 >= t.radius) break
                    }
                    n == e.length ? t.vel[1] *= .9 : i >= e.length >> 1 ? (t.inAir = !1, t.vel[1] = Math.min(0, t.vel[1])) : 0 > t.vel[1] && (t.vel[1] = 0)
                }, this.solveCharChar = function(t, e, i, n, r, s) {
                    r = s - r, t.pos[0] += r * i, t.pos[1] += r * n, e.pos[0] += r * -i, e.pos[1] += r * -n, r = t.vel[0] * i + t.vel[1] * n, s = e.vel[0] * i + e.vel[1] * n, t.vel[0] += (s - r) * i, t.vel[1] += (s - r) * n, e.vel[0] += (r - s) * i, e.vel[1] += (r - s) * n, -.8 > n ? (t.vel[1] -= 5, t.inAir = !1) : .8 < n && (e.vel[1] -= 5, e.inAir = !1)
                }, this.explosion = function(e, i, n, r) {
                    n && t.map.stampOut(e, i, r)
                }, this.debugCharacters = function() {
                    for (var e = 0; e < t.characters.length; e++) {
                        var i = t.characters[e];
                        if (isNaN(i.pos[0]) || isNaN(i.pos[1]) || isNaN(i.vel[0]) || isNaN(i.vel[1])) throw Error("Character sanity validation failed: " + i.pos[0] + ", " + i.pos[1] + ", " + i.vel[0] + ", " + i.vel[1])
                    }
                }
            }
        }, {}],
        149: [function(t, e, i) {
            (function(i) {
                var n = t(150);
                t(142), t(142);
                var r = t(135),
                    s = t(131),
                    a = null;
                i.browser && (a = t(52));
                var o = null;
                i.browser && (o = t(86)), e.exports = function(t, e) {
                    this.id = e, this.startTime = 0, this.speed = 300, this.type = -1, this.path = this.planeDef = this.sfxChannel = this.gfx = null, this.state = 1, this.health = 50, this.actualPos = null, this.crashTick = 0, this.physicGenerics = [];
                    var l = [{
                        pos: [0, 0],
                        radius: 150
                    }];
                    i.browser && (this.gfx = new a, this.sfxChannel = o.createChannel("plane1")), this.update = function(t) {
                        t = t || 0, this.path && 0 != this.state && (1 == this.state ? this.updateFlying(t) : 2 == this.state && this.updateCrashing(t))
                    }, this.updateFlying = function(e) {
                        e = this.getAtTick(t.tick + e), 0 == this.health ? this.crash() : 25 >= this.health && this.damaged(), e.hasPos && (this.gfx ? (this.gfx.setPos(e.pos[0], e.pos[1], e.angle), this.gfx.animate(), this.sfxChannel && this.sfxChannel.setPos(e.pos[0], e.pos[1])) : 0 == (t.tick + ~~(this.planeDef.dropTimeOffset * n.ticksPerSecond)) % (n.ticksPerSecond * this.planeDef.dropsEverySec) && this.dropBomb(e.pos, e.angle), this.updatePhysicGenerics(e.pos, e.angle), this.actualPos = e.pos), e.endOfPath && (this.state = 0, this.remove())
                    }, this.updateCrashing = function(e) {
                        e = (t.tick + e - this.crashTick) / n.ticksPerSecond;
                        var i = this.getAtTick(this.crashTick);
                        if (i.hasPos) {
                            var r = e * this.speed,
                                a = e * e * this.speed / 20,
                                o = s.lerp(i.angle, Math.atan2(a, r), Math.min(Math.max(0, e / 3), 1));
                            i = [i.pos[0] + r, i.pos[1] + a], this.gfx && (this.gfx.setPos(i[0], i[1], o), this.gfx.animate(), this.sfxChannel && (this.sfxChannel.setPos(i[0], i[1]), this.sfxChannel.setSpeedModifier(Math.min(1 + e / 10, 3)))), this.actualPos = i, this.actualAngle = o, this.updatePhysicGenerics(i, o), 20 < e && (this.state = 0, this.remove())
                        }
                    }, this.getAtTick = function(t) {
                        var e = (t = (t - this.startTime) / n.ticksPerSecond) * this.speed,
                            i = this.path.getPos(e);
                        return e = this.path.getPos(e - 100), i && e ? {
                            pos: [i[0], i[1] + 3 * Math.sin(6 * t) + 6 * Math.sin(2.5 * t)],
                            angle: .4 * Math.atan2(i[1] - e[1], i[0] - e[0]) + .02 * Math.sin(3 * t) + .005 * Math.sin(8 * t),
                            hasPos: !0,
                            endOfPath: !1
                        } : i && !e ? {
                            hasPos: !1,
                            endOfPath: !1
                        } : {
                            hasPos: !1,
                            endOfPath: !0
                        }
                    }, this.damaged = function() {
                        this.gfx && this.gfx.setState(1)
                    }, this.crash = function() {
                        this.gfx ? (this.gfx.setState(2), this.state = 2) : (this.crashTick = t.tick, this.state = 2, this.health = 0)
                    }, this.dropBomb = function(e, i) {
                        (e = t.addBullet(this, t.tick, e, 0, 5, 5)).vel[0] = Math.cos(i) * this.speed / n.ticksPerSecond, e.vel[1] = Math.sin(i) * this.speed / n.ticksPerSecond, i = t.gameState.findSheet("bullet", e.id), e.writeToSheet(i)
                    }, this.reset = function() {
                        this.startTime = t.tick, this.state = 1
                    }, this.remove = function() {
                        this.gfx && this.gfx.remove(), this.sfxChannel && o.removeChannel(this.sfxChannel), this.removePhysicGenerics()
                    }, this.isStopped = function() {
                        return 0 == this.state
                    }, this.loadPlaneDef = function() {
                        if (this.planeDef = t.map.mapDef.specials[this.type], "plane" != this.planeDef.type) throw Error("PlaneDef invalid");
                        this.path = t.map.getPath(this.planeDef.path), this.lastDrop = t.tick + this.planeDef.dropTimeOffset * n.ticksPerSecond
                    }, this.readFromSheet = function(t) {
                        this.type = t.get("type"), this.startTime = t.get("startTick"), this.crashTick = t.get("crashTick"), this.health = t.get("health"), this.loadPlaneDef()
                    }, this.writeToSheet = function(t) {
                        t.set("type", this.type), t.set("startTick", this.startTime), t.set("crashTick", this.crashTick), t.set("health", this.health)
                    }, this.createPhysicGenerics = function() {
                        this.physicGenerics = [];
                        for (var e = 0; e < l.length; e++) {
                            var i = new r([0, 0], l[e].radius, !0);
                            this.physicGenerics.push(i), t.addPhysicGeneric(i), i.bulletImmunity.push(5)
                        }
                    }, this.removePhysicGenerics = function() {
                        for (; 0 < this.physicGenerics.length;) t.removePhysicGeneric(this.physicGenerics.pop())
                    }, this.updatePhysicGenerics = function(t, e) {
                        for (e = 0; e < this.physicGenerics.length; e++) {
                            var i = this.physicGenerics[e];
                            i.pos[0] = l[e].pos[0] + t[0], i.pos[1] = l[e].pos[1] + t[1]
                        }
                    }, this.createPhysicGenerics()
                }
            }).call(this, t(7))
        }, {}],
        150: [function(t, e, i) {
            e.exports = {
                ticksPerSecond: 40,
                snapshotEveryNth: 10,
                inputResendTime: 40,
                maxAngleResend: 4,
                interpolationTime: 10,
                bots: !1,
                saveReplays: !1,
                loadTest: !1,
                matchLength: 240,
                warmupLength: 30,
                inactivityTime: 60,
                maxRopeLength: 1e3,
                minRopeLength: 50,
                maxRopeCharTime: 999999,
                ropeSanityTolerance: 1e3,
                maxVelocity: 20,
                ropePower: 8,
                explosionPower: 7,
                walkSpeed: 100.6,
                jumpPower0: -20,
                jumpPower1: -15,
                jetpackPower: -2,
                gravityY: -1,
                maxBrickDistance: 600,
                minBrickDistanceOwn: 64,
                minBrickDistanceOther: 128,
                respawnTime: 3,
                maxHealth: 100,
                capturesToWin: 3,
                afkTimeout: 999999990,
                lagScoreMax: 999999999,
                basicWeapons: [2, 4],
                maxWeapons: 16,
                maxTeamSize: 4
            }
        }, {}],
        151: [function(t, e, i) {
            (function(i) {
                function n() {}
                var r = i.browser ? t(61) : t(18),
                    s = t(144),
                    a = t(150);
                t(142), t(142), n.prototype.tick = 0, n.prototype.physic = null, n.prototype.map = null, n.prototype.gameState = null, n.prototype.characters = null, n.prototype.bullets = null, n.prototype.planes = null, n.prototype.physicGenerics = null, n.prototype.gridChars = null, n.prototype.init = function() {
                    this.characters = [], this.bullets = [], this.planes = [], this.physicGenerics = []
                }, n.prototype.setMap = function(t) {
                    this.map = t, this.gridChars = new s(t.mapWidth, t.mapHeight)
                }, n.prototype.bulletById = function(t) {
                    for (var e = 0; e < this.bullets.length; e++)
                        if (this.bullets[e].id == t) return this.bullets[e];
                    return null
                }, n.prototype.pruneBullet = function(t) {
                    var e = this.bullets.indexOf(t); - 1 == e && r.warn("Cannot prune bullet;" + JSON.stringify(t) + ";" + Error().stack), this.bullets.splice(e, 1), t.remove()
                }, n.prototype.addPhysicGeneric = function(t) {
                    this.physicGenerics.push(t)
                }, n.prototype.removePhysicGeneric = function(t) {
                    -1 == (t = this.physicGenerics.indexOf(t)) && r.error("Invalid pg"), this.physicGenerics.splice(t, 1)
                }, n.prototype.isBrickPlaceable = function(t, e, i) {
                    function n(t) {
                        var e = t.pos[0] - r;
                        return t = t.pos[1] - s, Math.sqrt(e * e + t * t)
                    }
                    var r = (e + .5) * this.map.tileSize,
                        s = (i + .5) * this.map.tileSize,
                        o = n(t);
                    if (o > a.maxBrickDistance || o < a.minBrickDistanceOwn) return !1;
                    for (var l = 0; l < this.characters.length; l++)
                        if ((o = this.characters[l]) != t && (o = n(o)) < a.minBrickDistanceOther) return !1;
                    return !(this.map.map[i][e] && !this.map.map[i][e].isModified || this.map.isTileBlocked(e, i))
                }, n.prototype.getUsableByCharacter = function(t) {
                    for (var e = 0; e < this.map.usables.length; e++)
                        if (this.map.usables[e].usedBy == t) return this.map.usables[e];
                    return null
                }, n.prototype.findCharPosInUsable = function(t) {
                    var e = [(t.pos[0] + .5) * this.map.tileSize, (t.pos[1] + .5) * this.map.tileSize];
                    switch (t.type) {
                        case "mg1":
                            e[0] += 70 * Math.cos(t.angle + Math.PI), e[1] += 70 * Math.sin(t.angle + Math.PI) - 30
                    }
                    return e
                }, n.prototype.findUsableCameraCenter = function(t) {
                    var e = [(t.pos[0] + .5) * this.map.tileSize, (t.pos[1] + .5) * this.map.tileSize];
                    switch (t.type) {
                        case "mg1":
                            return e[1] -= 30, e;
                        default:
                            throw Error("Unknown type")
                    }
                }, n.prototype.findUsableWeaponMuzzle = function(t) {
                    var e = [(t.pos[0] + .5) * this.map.tileSize, (t.pos[1] + .5) * this.map.tileSize];
                    switch (t.type) {
                        case "mg1":
                            var i = Math.abs(t.angle) > Math.PI / 2;
                            return e[0] += 60 * Math.cos(t.angle - .55 * (i ? -1 : 1)), e[1] += 60 * Math.sin(t.angle - .55 * (i ? -1 : 1)), e;
                        default:
                            throw Error("Unknown type")
                    }
                }, n.prototype.findUsableWeaponEjector = function(t) {
                    var e = [(t.pos[0] + .5) * this.map.tileSize, (t.pos[1] + .5) * this.map.tileSize];
                    switch (t.type) {
                        case "mg1":
                            var i = Math.abs(t.angle) > Math.PI / 2;
                            return e[0] += 60 * Math.cos(t.angle - 1.7 * (i ? -1 : 1)), e[1] += 60 * Math.sin(t.angle - 1.7 * (i ? -1 : 1)), e;
                        default:
                            throw Error("Unknown type")
                    }
                }, n.prototype.updateCharGrid = function() {
                    var t = ~~(Math.log(this.map.tileSize) / Math.log(2));
                    if (t != ~~t) throw Error("Invalid tile size");
                    for (var e = 0; e < this.characters.length; e++) {
                        var i = this.characters[e],
                            n = i.pos[0] - i.radius >> t,
                            r = i.pos[1] - i.radius >> t,
                            s = i.pos[0] + i.radius >> t,
                            a = i.pos[1] + i.radius >> t;
                        n == i.gridArea[0] && r == i.gridArea[1] && s == i.gridArea[2] && a == i.gridArea[3] || (i.gridArea[0] = n, i.gridArea[1] = r, i.gridArea[2] = s, i.gridArea[3] = a, this.gridChars.set(i, n, r, s, a))
                    }
                }, e.exports = n
            }).call(this, t(7))
        }, {}],
        152: [function(t, e, i) {
            e.exports = [{
                name: "skinHat",
                dom: "skinHatList",
                special: 0,
                list: [{
                    id: 1,
                    minLvl: 0,
                    tex: [0, 0, .09, .09],
                    scale: .9,
                    x: -.31,
                    y: -.31,
                    previewScale: 1,
                    previewX: 2,
                    previewY: 3
                }, {
                    id: 2,
                    minLvl: 8,
                    tex: [.09, 0, .2, .2],
                    scale: 1,
                    x: -.05,
                    y: -.35,
                    previewScale: 1,
                    previewX: 4,
                    previewY: 0
                }, {
                    id: 3,
                    minLvl: 0,
                    tex: [.09, .2, .2, .2],
                    scale: .7,
                    x: -.05,
                    y: -.6,
                    previewScale: 1,
                    previewX: 0,
                    previewY: 0
                }, {
                    id: 4,
                    minLvl: 12,
                    tex: [.09, .4, .2, .2],
                    scale: 1,
                    x: -.05,
                    y: -.25,
                    previewScale: 1,
                    previewX: 0,
                    previewY: -2
                }, {
                    id: 5,
                    minLvl: 18,
                    tex: [.09, .6, .2, .2],
                    scale: .9,
                    x: -.16,
                    y: -.42,
                    previewScale: 1,
                    previewX: -2,
                    previewY: -2
                }, {
                    id: 6,
                    minLvl: 0,
                    tex: [.09, .8, .2, .2],
                    scale: 1,
                    x: .05,
                    y: -.38,
                    previewScale: 1,
                    previewX: 5,
                    previewY: 1
                }, {
                    id: 7,
                    minLvl: 5,
                    tex: [.29, 0, .2, .2],
                    scale: .9,
                    x: -.05,
                    y: -.3,
                    previewScale: 1,
                    previewX: 0,
                    previewY: 0
                }, {
                    id: 8,
                    minLvl: 2,
                    tex: [.29, .2, .2, .2],
                    scale: 1,
                    x: -.2,
                    y: -.07,
                    previewScale: 1,
                    previewX: -5,
                    previewY: 5
                }, {
                    id: 9,
                    minLvl: 4,
                    tex: [.29, .4, .2, .2],
                    scale: 1,
                    x: -.07,
                    y: -.5,
                    previewScale: 1,
                    previewX: 0,
                    previewY: -5
                }, {
                    id: 10,
                    minLvl: 30,
                    tex: [.29, .6, .2, .2],
                    scale: 1.05,
                    x: 0,
                    y: -.25,
                    previewScale: 1,
                    previewX: 2,
                    previewY: -3
                }, {
                    id: 11,
                    minLvl: 10,
                    tex: [.29, .8, .2, .2],
                    scale: 1.05,
                    x: -.24,
                    y: -.1,
                    previewScale: 1,
                    previewX: -2,
                    previewY: 7
                }]
            }, {
                name: "skinGlasses",
                dom: "skinGlassesList",
                special: 1,
                list: [{
                    id: 1,
                    minLvl: 4,
                    tex: [.8, 0, .2, .2],
                    scale: 1,
                    x: 0,
                    y: 0,
                    previewScale: 1.5,
                    previewX: -12,
                    previewY: -6,
                    noEye: !0
                }, {
                    id: 2,
                    minLvl: 0,
                    tex: [.8, .2, .2, .2],
                    scale: 1,
                    x: 0,
                    y: 0,
                    previewScale: 2,
                    previewX: -38,
                    previewY: -18,
                    noEye: !1
                }, {
                    id: 3,
                    minLvl: 0,
                    tex: [.8, .4, .2, .2],
                    scale: 1,
                    x: 0,
                    y: 0,
                    previewScale: 2,
                    previewX: -38,
                    previewY: -13,
                    noEye: !1
                }]
            }]
        }, {}],
        153: [function(t, e, i) {
            var n = t(154);
            e.exports.getUrlInfo = function(t) {
                t: {
                    t = function(t) {
                        var e = (t = t.trim()).indexOf("?");
                        return -1 != e && (t = t.substring(0, e)), 0 == t.length ? "/" : ("/" != t[t.length - 1] && (t += "/"), t)
                    }(t);
                    for (var e = 0; e < n.length; e++) {
                        var i = n[e].url;
                        if ("/" != i[i.length - 1]) throw Error("Invalid URL format");
                        e: {
                            var r = i;i = [];
                            for (var s = "", a = 0; a < r.length; a++) "$" == r[a] ? ("" != s && i.push(s), i.push(null), s = "") : s += r[a];
                            for ("" != s && i.push(s), r = t, s = []; 0 < i.length;) {
                                var o = i.shift();
                                if (null == o)
                                    if (0 < i.length) {
                                        if (a = i.shift(), -1 == (a = r.indexOf(a))) {
                                            i = null;
                                            break e
                                        }
                                        o = r.substring(0, a), r = r.substring(a + 1), s.push(o)
                                    } else s.push(r), r = "";
                                else {
                                    if (0 != (a = r.indexOf(o))) {
                                        i = void 0;
                                        break e
                                    }
                                    r = r.substring(o.length)
                                }
                            }
                            i = "" != r ? null : s
                        }
                        if (i) {
                            t = {
                                screen: n[e].screen,
                                url: i,
                                args: n[e].args
                            };
                            break t
                        }
                    }
                    t = void 0
                }
                return t
            }
        }, {}],
        154: [function(t, e, i) {
            e.exports = [{
                url: "/",
                screen: "main",
                args: {
                    sub: "normal"
                }
            }, {
                url: "/match/$/",
                screen: "main",
                args: {
                    sub: "specificMatch"
                }
            }, {
                url: "/profile/$/",
                screen: "main",
                args: {
                    sub: "profile"
                }
            }, {
                url: "/friendrequests/",
                screen: "main",
                args: {
                    sub: "friendrequests"
                }
            }, {
                url: "/messages/",
                screen: "main",
                args: {
                    sub: "messages"
                }
            }, {
                url: "/highscore/",
                screen: "main",
                args: {
                    sub: "highscore"
                }
            }, {
                url: "/search/",
                screen: "main",
                args: {
                    sub: "search"
                }
            }]
        }, {}],
        155: [function(t, e, i) {
            e.exports = {
                mg1: {
                    heatPerShot: 40,
                    cooldownPerTick: 4,
                    heatPeak: 500,
                    weapon: 3
                }
            }
        }, {}],
        156: [function(t, e, i) {
            i = t(157), t = t(166), e.exports = {
                Core: i,
                Trachyt2d: t
            }
        }, {}],
        157: [function(t, e, i) {
            function n(t, e) {
                this._x = t || 0, this._y = e || 0, this._dirty = !0, this.hasChanged = function() {
                    return !!this._dirty && (this._dirty = !1, !0)
                }, this.getLength = function() {
                    return Math.sqrt(this._x * this._x + this._y * this._y)
                }, this.getLengthSqrt = function() {
                    return this._x * this._x + this._y * this._y
                }
            }
            t = t(158), Object.defineProperties(n.prototype, {
                x: {
                    get: function() {
                        return this._x
                    },
                    set: function(t) {
                        this._x != t && (this._x = t, this._dirty = !0)
                    }
                },
                y: {
                    get: function() {
                        return this._y
                    },
                    set: function(t) {
                        this._y != t && (this._y = t, this._dirty = !0)
                    }
                }
            }), e.exports = {
                Vec2: n,
                Rect: function(t, e, i, n) {
                    this.h = this.w = this.y = this.x = 0, void 0 !== t && void 0 !== e && void 0 !== i && void 0 !== n ? (this.x = t, this.y = e, this.w = i, this.h = n) : void 0 !== t && void 0 !== e && (this.x = t.x, this.y = t.y, this.w = e.x - t.x, this.h = e.y - t.y)
                },
                Util: t
            }
        }, {}],
        158: [function(t, e, i) {
            var n = -1,
                r = {
                    getCompatibleImageUrl: function(t) {
                        var e = (t = t.toLowerCase()).indexOf("?"),
                            i = t,
                            n = "";
                        return -1 != e && (i = t.substring(0, e), n = t.substring(e)), r.isIE() && -1 !== i.indexOf(".svg", i.length - 4) && (i += ".png"), i + n
                    },
                    isIE: function() {
                        return 0 < r.getIEVersion()
                    },
                    isFF: function() {
                        return /firefox/i.test(navigator.userAgent)
                    },
                    isChrome: function() {
                        return /chrome/i.test(navigator.userAgent)
                    },
                    isOpera: function() {
                        return /Opera|OPR\//i.test(navigator.userAgent)
                    },
                    isVivaldi: function() {
                        return /Vivaldi/i.test(navigator.userAgent)
                    },
                    isYandex: function() {
                        return /YaBrowser/i.test(navigator.userAgent)
                    },
                    isMobile: function() {
                        var t = !1,
                            e = navigator.userAgent || navigator.vendor || window.opera;
                        return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(e) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4))) && (t = !0), t
                    },
                    getIEVersion: function() {
                        if (-1 == n) {
                            var t = 0,
                                e = /MSIE (\d+\.\d+);/.test(navigator.userAgent),
                                i = !!navigator.userAgent.match(/Trident\/7.0/),
                                r = navigator.userAgent.indexOf("rv:11.0"),
                                s = navigator.userAgent.indexOf("Edge/");
                            return e && (t = new Number(RegExp.$1)), -1 != navigator.appVersion.indexOf("MSIE 10") && (t = 10), i && -1 != r && (t = 11), t || -1 == s || (t = 12), n = t
                        }
                        return n
                    },
                    getChromeVersion: function() {
                        var t = window.navigator.userAgent.match(/Chrom(?:e|ium)\/([0-9\.]+)/);
                        return t ? t[1] : null
                    }
                };
            e.exports = r
        }, {}],
        159: [function(t, e, i) {
            var n = t(157);
            e.exports = function t(e, i) {
                var r = this,
                    s = [],
                    a = [];
                this.id = -1, this.height = this.width = 0;
                var o = !1;
                this._loaded = !1, this._canvasObject = this._imgObject = null, this._gl = e, this._glState = i, this._glTex = null, this._activateFilter = !0, this.loadFromImage = function(t) {
                    (t instanceof HTMLCanvasElement || t.complete) && function(t) {
                        r._loaded || (r._loaded = !0, t instanceof Image ? r._imgObject = t : t instanceof HTMLCanvasElement && (r._canvasObject = t), r.width = t.width, r.height = t.height, r._glTex = e.createTexture(), r.update(), setTimeout(function() {
                            for (var t = 0; t < s.length; t++) s[t]();
                            s = null
                        }, 0))
                    }(t)
                }, this.loadFromUrl = function(t) {
                    var e = new Image;
                    e.onload = function() {
                        r.loadFromImage(e)
                    }, e.onerror = function() {
                        for (var t = 0; t < a.length; t++) a[t](e);
                        a = null, o = !0
                    }, e.src = n.Util.getCompatibleImageUrl(t)
                }, this.replaceWithTexture = function(e) {
                    if (!(e instanceof t && this.isLoaded() && e.isLoaded())) throw Error("Not a base texture or textures are not loaded yet");
                    this._imgObject = e._imgObject, this._canvasObject = e._canvasObject, this.update()
                }, this.getObject = function() {
                    return this._imgObject ? this._imgObject : this._canvasObject
                }, this.toCanvas = function(t) {
                    t || (t = {
                        x: 0,
                        y: 0,
                        w: 1,
                        h: 1
                    });
                    var e = document.createElement("canvas");
                    return e.width = t.w * this.width, e.height = t.h * this.height, e.getContext("2d").drawImage(this.getObject(), t.x * this.width, t.y * this.height, e.width, e.height, 0, 0, e.width, e.height), e
                }, this.makeEditable = function() {
                    if (!this._canvasObject) {
                        var t = document.createElement("canvas");
                        t.width = this._imgObject.width, t.height = this._imgObject.height, t.getContext("2d").drawImage(this._canvasObject, 0, 0), this._canvasObject = t, this._imgObject = null
                    }
                }, this.isEditable = function() {
                    return !!this._canvasObject
                }, this.onLoad = function(t) {
                    this._loaded ? setTimeout(t, 0) : s.push(t)
                }, this.onError = function(t) {
                    o ? setTimeout(t, 0) : a.push(t)
                }, this.isLoaded = function() {
                    return this._loaded
                }, this.setFilter = function(t) {
                    i.bindTexture(r._glTex), (this._activateFilter = t) ? (e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR)) : (e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.NEAREST), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.NEAREST))
                }, this.update = function() {
                    var t = r._imgObject;
                    t || (t = r._canvasObject), i.bindTexture(r._glTex), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, t), this.setFilter(this._activateFilter)
                }
            }
        }, {}],
        160: [function(t, e, i) {
            var n = t(157);
            e.exports = function(t, e) {
                this.pos = new n.Vec2, this.viewportSize = new n.Vec2(t, e)
            }
        }, {}],
        161: [function(t, e, i) {
            t(157), e.exports = function(t) {
                this.type = t
            }
        }, {}],
        162: [function(t, e, i) {
            t = {
                PIXELSHADER: 1,
                VERTEXSHADER: 2,
                TEX_CLAMP: 1,
                TEX_REPEAT: 2,
                TEX_MIRRORED: 3,
                SCENE_WORLD: 0,
                SCENE_HUD: 1,
                DEFAULT_PIXEL_SHADER_STR: "precision mediump float;\nuniform sampler2D u_Tex0;\nvarying vec2 v_TextureCoord;\nvoid main(void) {\n\tgl_FragColor = texture2D(u_Tex0, v_TextureCoord);\n}",
                DEFAULT_VERTEX_SHADER_STR: "precision mediump float;\nuniform mat4 u_MVPMatrix;\nattribute vec2 a_Pos;\nattribute vec2 a_Coord;\nvarying vec2 v_TextureCoord;\nvoid main(void) {\n\tv_TextureCoord = a_Coord;\n\tgl_Position = u_MVPMatrix * vec4(a_Pos, 0.0, 1.0);\n}",
                VERTEX_FORMAT_POS: (t = t(176)).POS,
                VERTEX_FORMAT_POS_UV: t.POS_UV,
                VERTEX_FORMAT_POS_UV_COLOR: t.POS_UV_COLOR
            }, Object.freeze(t), e.exports = t
        }, {}],
        163: [function(t, e, i) {
            var n = t(170),
                r = t(172),
                s = t(168),
                a = t(161),
                o = t(171),
                l = t(160),
                h = t(162),
                c = t(159),
                u = t(175),
                p = t(169),
                d = t(176),
                f = t(164),
                m = t(174),
                g = t(173),
                v = t(165);
            e.exports = function(t) {
                function e() {
                    var t = A[R[0]],
                        n = null != R[1] ? A[R[1]] : null;
                    0 != P && (requestAnimationFrame(e), A[0].camera && (H = 0, V && V(), L.width = L.width, T(A[h.SCENE_WORLD].camera), C.clearColor(D.r, D.g, D.b, D.a), C.clear(C.COLOR_BUFFER_BIT), i(t), n && (T(n.camera), i(n)), X && X(H), O++))
                }

                function i(t) {
                    function e(t) {
                        var e = null;
                        null !== t.fbo && (e = $[t.fbo]), C.bindFramebuffer(C.FRAMEBUFFER, e), r = e, null !== t.lastFbo && (E.activeTexture(C.TEXTURE0), E.bindTexture(J[t.lastFbo])), null == e ? C.blendFunc(C.ONE, C.ONE_MINUS_SRC_ALPHA) : C.blendFuncSeparate(C.SRC_ALPHA, C.ONE_MINUS_SRC_ALPHA, C.ONE, C.ONE_MINUS_SRC_ALPHA)
                    }

                    function i() {
                        var t = n.pop();
                        C.bindFramebuffer(C.FRAMEBUFFER, t)
                    }
                    for (var n = [], r = null, s = y(t), a = 0; a < s.length; a++) {
                        var o = s[a];
                        switch (o.type) {
                            case "setFBO":
                                e(o);
                                break;
                            case "spriteLayer":
                                x(o.layer, t.camera);
                                break;
                            case "postProcLayer":
                                b(o.layer);
                                break;
                            case "pushFBO":
                                n.push(r), C.bindFramebuffer(C.FRAMEBUFFER, $[2]), C.clearColor(0, 0, 0, 0), C.clear(C.COLOR_BUFFER_BIT);
                                break;
                            case "popFBO":
                                i();
                                break;
                            default:
                                throw Error("No command " + o.type)
                        }
                    }
                }

                function y(t) {
                    var e = [];
                    e.push({
                        type: "setFBO",
                        fbo: null,
                        lastFbo: null
                    });
                    for (var i = 0; i < t.layers.length; i++) {
                        var n = t.layers[i];
                        n instanceof r ? e.push({
                            type: "spriteLayer",
                            layer: n
                        }) : n instanceof s ? (e.push({
                            type: "setFBO",
                            fbo: null,
                            lastFbo: null
                        }), e.push({
                            type: "postProcLayer",
                            layer: n
                        })) : n instanceof a && e.push({
                            type: n.type
                        })
                    }
                    for (t = -1, i = e.length - 1; 0 <= i; i--) "setFBO" == e[i].type && (-1 == t ? (e[i].fbo = null, t = 0) : (e[i].fbo = t, t = 1 - t));
                    for (t = null, i = 0; i < e.length; i++) "setFBO" == e[i].type && (e[i].lastFbo = t, t = e[i].fbo);
                    return e
                }

                function x(t, e) {
                    for (var i = t.offset.hasChanged(), n = {}, r = [], s = 0; s < t.sprites.length; s++) {
                        var a = t.sprites[s];
                        if (a.visible) {
                            if (a.update(i), e) {
                                if (a.aabb[2] < -e.pos.x || a.aabb[0] > -e.pos.x + e.viewportSize.x) continue;
                                if (a.aabb[3] < -e.pos.y || a.aabb[1] > -e.pos.y + e.viewportSize.y) continue
                            } else {
                                if (0 > a.aabb[2] || a.aabb[0] > Y) continue;
                                if (0 > a.aabb[3] || a.aabb[1] > K) continue
                            }
                            var o = a.getBatchKey();
                            n[o] || (n[o] = [], r.push(o)), n[o].push(a)
                        }
                    }
                    if (0 != r.length)
                        for (s = 0; s < r.length; s++)
                            if (64 >= (e = n[r[s]]).length) w(e, 0, e.length, t.vertexFormat);
                            else
                                for (i = 0; i < e.length;) w(e, i, a = Math.min(e.length - i, 64), t.vertexFormat), i += a
                }

                function b(t) {
                    var e = t.material,
                        i = e._shader,
                        n = 1;
                    for (E.useProgram(i._program), i.syncUniforms(e._uniforms), C.bindBuffer(C.ARRAY_BUFFER, Z), i.setAttribute("a_Pos", 3, 0, 0), C.bindBuffer(C.ARRAY_BUFFER, Q), i.setAttribute("a_Coord", 2, 0, 0), C.bindBuffer(C.ELEMENT_ARRAY_BUFFER, tt), t.usePushedFbo && (E.activeTexture(C.TEXTURE1), E.bindTexture(J[2]), n++), e = n; 4 > e; e++) t.textures[e] && (E.activeTexture(C.TEXTURE0 + e), t.textures[e].set());
                    C.drawElements(C.TRIANGLES, 6, C.UNSIGNED_SHORT, 0), H++
                }

                function w(t, e, i, n) {
                    for (var r = e + i, s = 0, a = t[e]; e < r; e++)
                        for (var o = t[e], l = 0; 4 > l; l++)
                            for (var h = q, c = l, u = o, p = 0; p < n.length; p++) switch (n[p].name) {
                                case "a_Pos":
                                    var d = 3 * c;
                                    h[s++] = u._mesh[d + 0], h[s++] = u._mesh[d + 1];
                                    break;
                                case "a_Coord":
                                    d = 2 * c, h[s++] = u._uv[d + 0], h[s++] = u._uv[d + 1];
                                    break;
                                case "a_Color":
                                    h[s++] = u.color[0], h[s++] = u.color[1], h[s++] = u.color[2], h[s++] = u.color[3];
                                    break;
                                default:
                                    throw Error("Unknown attribute")
                            }
                    for (t = z, a.material && a.material._shader && (t = a.material._shader), E.useProgram(t._program), l = 0; 4 > l; l++) null != (e = o._texLayers[l]) ? (E.activeTexture(C.TEXTURE0 + l), e.tex.set()) : (E.activeTexture(C.TEXTURE0 + l), E.bindTexture(null));
                    for (C.bindBuffer(C.ARRAY_BUFFER, F), C.bufferSubData(C.ARRAY_BUFFER, 0, q), l = 4 * S(n), e = r = 0; e < n.length; e++) h = n[e], t.setAttribute(h.name, h.size, l, r), r += 4 * h.size;
                    C.bindBuffer(C.ELEMENT_ARRAY_BUFFER, U), t.setUniform("u_MVPMatrix", "mat4", I), t._setBasicUniformsOnFrame = O, a.material && t.syncUniforms(o.material._uniforms), C.drawElements(C.TRIANGLES, 6 * i, C.UNSIGNED_SHORT, 0), H++
                }

                function S(t) {
                    for (var e = 0, i = 0; i < t.length; i++) e += t[i].size;
                    return e
                }

                function T(t) {
                    null == t ? (I[0] = 2 / Y, I[5] = -2 / K, I[12] = -1, I[13] = 1) : (I[0] = 2 / t.viewportSize.x, I[5] = -2 / t.viewportSize.y, I[12] = t.pos.x / t.viewportSize.x * 2 - 1, I[13] = 1 - t.pos.y / t.viewportSize.y * 2)
                }

                function k() {
                    $ = [], J = [], Z = Z || C.createBuffer(), Q = Q || C.createBuffer(), tt = tt || C.createBuffer(), C.bindBuffer(C.ARRAY_BUFFER, Z), C.bufferData(C.ARRAY_BUFFER, new Float32Array([-1, 1, 0, 1, 1, 0, -1, -1, 0, 1, -1, 0]), C.STATIC_DRAW), C.bindBuffer(C.ARRAY_BUFFER, Q), C.bufferData(C.ARRAY_BUFFER, new Float32Array([0, 1, 1, 1, 0, 0, 1, 0]), C.STATIC_DRAW), C.bindBuffer(C.ELEMENT_ARRAY_BUFFER, tt), C.bufferData(C.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 1, 2, 3]), C.STATIC_DRAW);
                    for (var t = 0; 3 > t; t++) {
                        var e = C.createFramebuffer();
                        $.push(e);
                        var i = C.createTexture();
                        E.bindTexture(i), J.push(i), C.texParameteri(C.TEXTURE_2D, C.TEXTURE_WRAP_S, C.CLAMP_TO_EDGE), C.texParameteri(C.TEXTURE_2D, C.TEXTURE_WRAP_T, C.CLAMP_TO_EDGE), C.texParameteri(C.TEXTURE_2D, C.TEXTURE_MIN_FILTER, C.NEAREST), C.texParameteri(C.TEXTURE_2D, C.TEXTURE_MAG_FILTER, C.NEAREST), C.texImage2D(C.TEXTURE_2D, 0, C.RGBA, Y, K, 0, C.RGBA, C.UNSIGNED_BYTE, null), C.bindFramebuffer(C.FRAMEBUFFER, e), C.framebufferTexture2D(C.FRAMEBUFFER, C.COLOR_ATTACHMENT0, C.TEXTURE_2D, i, 0)
                    }
                }
                var C, E, M = this,
                    P = 0,
                    L = t,
                    A = [],
                    R = [0, 1],
                    I = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]),
                    _ = null,
                    B = null,
                    z = null,
                    O = 0,
                    D = {
                        r: 0,
                        g: 0,
                        b: 0,
                        a: 0
                    },
                    F = null,
                    U = null,
                    q = null,
                    W = null,
                    N = 0,
                    j = 0,
                    G = 0,
                    H = 0,
                    V = null,
                    X = null,
                    Y = t.width,
                    K = t.height,
                    $ = null,
                    J = null,
                    Z = null,
                    Q = null,
                    tt = null;
                this.nullTexture = null, this.start = function() {
                        1 != P && (P = 1, requestAnimationFrame(e))
                    }, this.stop = function() {
                        P = 0
                    }, this.loadShader = function(t, e) {
                        if (t = C.createShader(t == h.PIXELSHADER ? C.FRAGMENT_SHADER : C.VERTEX_SHADER), C.shaderSource(t, e), C.compileShader(t), !C.getShaderParameter(t, C.COMPILE_STATUS)) throw Error(C.getShaderInfoLog(t));
                        return t
                    }, this.loadShaderFromTag = function(t, e) {
                        return this.loadShader(t, document.getElementById(e).textContent)
                    }, this.loadTextureFromUrl = function(t, e) {
                        return t = this.loadBaseTextureFromUrl(t), this.loadTextureFromBase(t, e)
                    }, this.loadTextureFromImage = function(t, e) {
                        return t = this.loadBaseTextureFromImage(t), this.loadTextureFromBase(t, e)
                    }, this.loadTextureFromBase = function(t, e) {
                        return (e = new u(t, e)).id = t.id, e
                    }, this.loadBaseTextureFromUrl = function(t) {
                        var e = new c(C, E);
                        return e.id = j++, e.loadFromUrl(t + this.getUrlQuery()), e
                    }, this.loadBaseTextureFromImage = function(t) {
                        var e = new c(C, E);
                        return e.id = j++, e.loadFromImage(t), e
                    }, this.createDataTexture = function(t, e, i) {
                        return (t = new f(C, E, t, e, 0 | i)).id = j++, t
                    }, this.createTextTexture = function() {
                        var t = new m(C, E);
                        return t.id = j++, t
                    }, this.createScene = function() {
                        return A[G] = new p(G, !1), G++
                    }, this.createLayer = function(t, e) {
                        var i = A[0 | t];
                        if (!i) throw Error("Unknown scene " + t);
                        return e || (e = h.VERTEX_FORMAT_POS_UV), t = new r(e), i.layers.push(t), t
                    }, this.createPostProcLayer = function(t, e, i) {
                        var n = A[0 | t];
                        if (!n) throw Error("Unknown scene " + t);
                        return t = new s(e, i || {}), n.layers.push(t), t
                    }, this.createCommandLayer = function(t, e) {
                        var i = A[0 | e];
                        if (!i) throw Error("Unknown scene " + e);
                        return t = new a(t), i.layers.push(t), t
                    }, this.createSprite = function(t, e) {
                        var i = new o;
                        return e && (i.material = e), i._layer = t, t.sprites.push(i), i
                    }, this.createShader = function(t, e) {
                        var i = C.createProgram();
                        if (C.attachShader(i, t || _), C.attachShader(i, e || B), C.linkProgram(i), !C.getProgramParameter(i, C.LINK_STATUS)) throw Error(C.getProgramInfoLog(i));
                        return (t = new n(C))._program = i, t
                    }, this.createMaterial = function(t, e) {
                        return (t = new t(e)).id = N++, t
                    }, this.createCamera = function() {
                        return new l(Y, K)
                    }, this.setClearColor = function(t, e, i, n) {
                        D.r = t, D.g = e, D.b = i, D.a = n, C.clearColor(D.r, D.g, D.b, D.a)
                    }, this.setCamera = function(t, e) {
                        A[e].camera = t
                    }, this.setOnBeforeRender = function(t) {
                        V = t
                    }, this.setOnAfterRender = function(t) {
                        X = t
                    }, this.resize = function() {
                        Y = Math.max(256, t.width), K = Math.max(256, t.height), C.viewport(0, 0, Y, K), A[0].camera && (A[0].camera.viewportSize.x = 2 * Y, A[0].camera.viewportSize.y = 2 * K);
                        for (var e = 0; e < J.length; e++) C.deleteTexture(J[e]);
                        for (e = 0; e < $.length; e++) C.deleteFramebuffer($[e]);
                        k()
                    }, this.getWidth = function() {
                        return Y
                    }, this.getHeight = function() {
                        return K
                    }, this.setDefaultScene = function(t, e) {
                        R[0] = t, R[1] = e || null
                    }, this.renderSeparateScene = function(t, e, n, r) {
                        if (Y < n || K < r) throw Error("Cannot render separate scene");
                        C.clearColor(D.r, D.g, D.b, D.a), C.clear(C.COLOR_BUFFER_BIT), T(A[t].camera), i(A[t]), (t = e.getContext("2d")).clearRect(0, 0, e.width, e.height), t.drawImage(L, 0, 0, n, r, 0, 0, n, r), C.clear(C.COLOR_BUFFER_BIT)
                    }, this.onContextLoss = function(e) {
                        t.addEventListener("webglcontextlost", function(t) {
                            t.preventDefault(), e()
                        }, !1)
                    }, this.setUrlVersionHash = function(t) {
                        this.urlVersionHash = t
                    }, this.getUrlQuery = function() {
                        return this.urlVersionHash ? "?v=" + this.urlVersionHash : ""
                    },
                    function() {
                        if ((C = t.getContext("webgl")) || (C = t.getContext("experimental-webgl")), !C) throw Error("NO_WEBGL");
                        E = new v(C), k(), A[h.SCENE_WORLD] = new p(h.SCENE_WORLD, !0), A[h.SCENE_HUD] = new p(h.SCENE_HUD, !1), G = h.SCENE_HUD + 1, _ = M.loadShader(h.PIXELSHADER, h.DEFAULT_PIXEL_SHADER_STR), B = M.loadShader(h.VERTEXSHADER, h.DEFAULT_VERTEX_SHADER_STR), z = M.createShader(_, B), Object.freeze(_), Object.freeze(B), C.getExtension("OES_texture_float"), C.enable(C.BLEND), C.blendEquation(C.FUNC_ADD), C.blendFunc(C.SRC_ALPHA, C.ONE_MINUS_SRC_ALPHA), g.init(C), F = C.createBuffer(), U = C.createBuffer();
                        var e = Float32Array,
                            i = 0;
                        for (n in d) i = Math.max(i, S(d[n]));
                        for (q = new e(256 * i), W = new Uint16Array(384), e = 0; 64 > e; e++) {
                            var n = 4 * e;
                            W[0 + (i = 6 * e)] = n + 0, W[1 + i] = n + 1, W[2 + i] = n + 2, W[3 + i] = n + 1, W[4 + i] = n + 2, W[5 + i] = n + 3
                        }
                        M.nullTexture = M.createDataTexture(1, 1, 0), M.nullTexture.setPixel(0, 0, 0, 0, 0, 0), C.bindBuffer(C.ARRAY_BUFFER, F), C.bufferData(C.ARRAY_BUFFER, q.byteLength, C.DYNAMIC_DRAW), C.bindBuffer(C.ELEMENT_ARRAY_BUFFER, U), C.bufferData(C.ELEMENT_ARRAY_BUFFER, W, C.STATIC_DRAW)
                    }()
            }
        }, {}],
        164: [function(t, e, i) {
            e.exports = function(t, e, i, n, r) {
                this._width = i, this._height = n, this._glTex = t.createTexture(), this._buffer = 0 == r ? new Uint8Array(i * n * 4) : new Float32Array(i * n * 4), this.set = function() {
                    e.bindTexture(this._glTex)
                }, this.update = function() {
                    e.bindTexture(this._glTex), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, i, n, 0, t.RGBA, 0 == r ? t.UNSIGNED_BYTE : t.FLOAT, this._buffer), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.NEAREST), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.NEAREST)
                }, this.setValue = function(t, e) {
                    this._buffer[t] = e
                }, this.setPixel = function(t, e, n, r, s, a) {
                    t = 4 * (e * i + t), this._buffer[t] = n, this._buffer[t + 1] = r, this._buffer[t + 2] = s, this._buffer[t + 3] = a
                }, this.getWidth = function() {
                    return this._width
                }, this.getHeight = function() {
                    return this._height
                }, this.setFilter = function(t) {
                    throw Error("not supported for data textures")
                }, this.onLoad = function(t) {
                    t()
                }, this.isLoaded = function() {
                    return !0
                }, this.update()
            }
        }, {}],
        165: [function(t, e, i) {
            e.exports = function(t) {
                this._activeTexture = 0, this._bindTexture = [-1, -1, -1, -1], this._useProgram = -1, this.activeTexture = function(e) {
                    this._activeTexture != e && (t.activeTexture(e), this._activeTexture = e)
                }, this.bindTexture = function(e) {
                    this._bindTexture[this._activeTexture] != e && (t.bindTexture(t.TEXTURE_2D, e), this._bindTexture[this._activeTexture] = e)
                }, this.useProgram = function(e) {
                    this._useProgram != e && (t.useProgram(e), this._useProgram = e)
                }
            }
        }, {}],
        166: [function(t, e, i) {
            i = t(162);
            var n = t(163);
            for (var r in t = {
                    Material: t(167),
                    createContext: function(t) {
                        return new n(t)
                    }
                }, i) t[r] = i[r];
            e.exports = t
        }, {}],
        167: [function(t, e, i) {
            function n() {}
            n.prototype.id = 0, n.prototype._shader = null, n.prototype._uniforms = null, n.prototype.init = function(t) {
                this._shader = t
            }, e.exports = n
        }, {}],
        168: [function(t, e, i) {
            t(157), e.exports = function(t, e) {
                this.material = t, this.textures = [null, null, null, null], this.usePushedFbo = e.usePushedFbo || !1
            }
        }, {}],
        169: [function(t, e, i) {
            e.exports = function(t) {
                this.id = t, this.camera = null, this.layers = []
            }
        }, {}],
        170: [function(t, e, i) {
            e.exports = function(t) {
                this._program = null, this._locationsUniform = {}, this._locationsAttribute = {}, this._uniformCache = {}, this._setBasicUniformsOnFrame = -1, this.setAttribute = function(e, i, n, r) {
                    var s = this._locationsAttribute[e];
                    if (void 0 === s && (s = this._locationsAttribute[e] = t.getAttribLocation(this._program, e), t.enableVertexAttribArray(s)), -1 == s) throw Error("Unknown attribute location " + e);
                    t.vertexAttribPointer(s, i, t.FLOAT, !1, n, r)
                }, this.setUniform = function(e, i, n) {
                    var r = this._locationsUniform[e];
                    if (r || (r = this._locationsUniform[e] = t.getUniformLocation(this._program, e)), -1 != r && null != r) switch (i) {
                        case "b":
                        case "bool":
                            t.uniform1i(r, n ? 1 : 0);
                            break;
                        case "i":
                        case "1i":
                            t.uniform1i(r, n);
                            break;
                        case "f":
                        case "1f":
                            t.uniform1f(r, n);
                            break;
                        case "2f":
                            t.uniform2f(r, n[0], n[1]);
                            break;
                        case "3f":
                            t.uniform3f(r, n[0], n[1], n[2]);
                            break;
                        case "4f":
                            t.uniform4f(r, n[0], n[1], n[2], n[3]);
                            break;
                        case "1fv":
                            t.uniform1fv(r, n);
                            break;
                        case "2fv":
                            t.uniform2fv(r, n);
                            break;
                        case "3fv":
                            t.uniform3fv(r, n);
                            break;
                        case "4fv":
                            t.uniform4fv(r, n);
                            break;
                        case "mat2":
                            t.uniformMatrix2fv(r, t.FALSE, n);
                            break;
                        case "mat3":
                            t.uniformMatrix3fv(r, t.FALSE, n);
                            break;
                        case "mat4":
                            t.uniformMatrix4fv(r, t.FALSE, n);
                            break;
                        case "samplerIndex":
                            t.uniform1i(r, n);
                            break;
                        default:
                            throw Error("Unknown uniform type: " + i)
                    }
                }, this.syncUniforms = function(t) {
                    for (var e in t) this.setUniform(e, t[e].type, t[e].value)
                }
            }
        }, {}],
        171: [function(t, e, i) {
            var n = t(157);
            e.exports = function() {
                function t(t, e, i, n, r, s, a) {
                    t[0] = e, t[1] = i, t[2] = e + n * s, t[3] = i, t[4] = e, t[5] = i + r * a, t[6] = e + n * s, t[7] = i + r * a
                }
                this.pos = new n.Vec2, this.size = new n.Vec2, this.scale = new n.Vec2(1, 1), this.anchor = new n.Vec2(0, 0), this.angle = 0, this.material = null, this.color = [0, 0, 0, 0], this.visible = !0, this.aabb = [0, 0, 0, 0], this._dirtyMeshBuffer = this._dirtyUV = !1, this._lastAngle = 0, this._layer = null, this._texLayers = [null, null, null, null], this._uv = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]), this._mesh = new Float32Array(12), this._glBufferMesh = null, this.remove = function() {
                    var t = this._layer.sprites.indexOf(this);
                    this._layer.sprites.splice(t, 1)
                }, this.update = function(t) {
                    var e = this.scale.hasChanged();
                    (t || this.pos.hasChanged() || this.size.hasChanged() || e || this.anchor.hasChanged() || this._lastAngle != this.angle) && (this.updateTransformation(), this._lastAngle = this.angle), (this._dirtyUV || e) && (this._texLayers[0] ? this.updateUV(this._texLayers[0]) : this.updateUVToDefault(), this._dirtyUV = !1)
                }, this.updateTransformation = function() {
                    var t = this.anchor.x * this.size.x,
                        e = this.anchor.y * this.size.y,
                        i = Math.sin(this.angle),
                        n = Math.cos(this.angle),
                        r = -t,
                        s = -e,
                        a = -t + this.size.x,
                        o = -e,
                        l = -t,
                        h = -e + this.size.y;
                    t = -t + this.size.x, e = -e + this.size.y;
                    var c = this.pos.x + this._layer.offset.x,
                        u = this.pos.y + this._layer.offset.y;
                    this._mesh[0] = c + (r * n - s * i), this._mesh[1] = u + (r * i + s * n), this._mesh[3] = c + (a * n - o * i), this._mesh[4] = u + (a * i + o * n), this._mesh[6] = c + (l * n - h * i), this._mesh[7] = u + (l * i + h * n), this._mesh[9] = c + (t * n - e * i), this._mesh[10] = u + (t * i + e * n), this._dirtyMeshBuffer = !0, this.updateAABB()
                }, this.getBatchKey = function() {
                    var t = 0;
                    return this._texLayers[0] && (t += this._texLayers[0].tex.id), this._texLayers[1] && (t += 1e3 * this._texLayers[1].tex.id), this._texLayers[2] && (t += 1e6 * this._texLayers[2].tex.id), this._texLayers[3] && (t += 1e9 * this._texLayers[3].tex.id), this.material && (t += 1e12 * this.material.id), t
                }, this.getTexture = function(t) {
                    return t |= 0, null == this._texLayers[t] ? null : this._texLayers[t].tex
                }, this.setTexture = function(t, e) {
                    e |= 0, null == t ? this._texLayers[e] = null : this._texLayers[e] ? this._texLayers[e].tex = t : this._texLayers[e] = {
                        tex: t
                    }, this._dirtyUV = !0
                }, this.updateUV = function(e) {
                    e.tex && e.tex.isLoaded() && (null == (e = e.tex.rect) ? this.updateUVToDefault() : t(this._uv, e.x, e.y, e.w, e.h, this.scale.x, this.scale.y))
                }, this.updateUVToDefault = function() {
                    t(this._uv, 0, 0, 1, 1, this.scale.x, this.scale.y)
                }, this.updateAABB = function() {
                    for (var t = this._mesh[0], e = this._mesh[1], i = this._mesh[0], n = this._mesh[1], r = 3, s = 1; 4 > s; s++) {
                        var a = this._mesh[r],
                            o = this._mesh[r + 1];
                        t = Math.min(t, a), e = Math.min(e, o), i = Math.max(i, a), n = Math.max(n, o), r += 3
                    }
                    this.aabb[0] = t, this.aabb[1] = e, this.aabb[2] = i, this.aabb[3] = n
                }
            }
        }, {}],
        172: [function(t, e, i) {
            var n = t(157);
            e.exports = function(t) {
                this.sprites = [], this.vertexFormat = t, this.offset = new n.Vec2
            }
        }, {}],
        173: [function(t, e, i) {
            t = new function() {
                var t = null,
                    e = null;
                this.init = function(i) {
                    (t = document.createElement("canvas")).width = 2048, t.height = 128, (e = t.getContext("2d")).textBaseline = "top"
                }, this.renderText = function(i, n, r, s, a, o) {
                    return o |= 1, e.clearRect(0, 0, 2048, 128), e.font != r && (e.font = r), r = parseInt(e.font), a && (e.fillStyle = a, e.fillText(i, 2 - o, 0 - o), e.fillText(i, 2 - o, 0 + o), e.fillText(i, 2 + o, 0 - o), e.fillText(i, 2 + o, 0 + o)), s && (e.fillStyle = s, e.fillText(i, 2, 0)), i = {
                        width: (i = e.measureText(i)).width + 7
                    }, s = Math.max(1 << Math.ceil(Math.log(i.width) / Math.log(2)), 1 << Math.ceil(Math.log(r) / Math.log(2))), n ? n.width < s && (n.width = s, n.height = s) : ((n = document.createElement("canvas")).width = s, n.height = s), (a = n.getContext("2d")).clearRect(0, 0, s, s), a.drawImage(t, 0, 0), {
                        canvas: n,
                        size: i
                    }
                }
            }, e.exports = t
        }, {}],
        174: [function(t, e, i) {
            var n = t(173);
            e.exports = function(t, e) {
                this._textWidth = this._size = 0, this._glTex = t.createTexture(), this._canvas = null, this._inited = !1, this.set = function() {
                    e.bindTexture(this._glTex)
                }, this.setText = function(e, i, r, s, a) {
                    e = n.renderText(e, this._canvas, i, r, s, a), this._textWidth = e.size.width, this._canvas = e.canvas, this._size = this._canvas.width, this.set(), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, this._canvas), this._inited || (t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR), this._inited = !0)
                }, this.update = function() {}, this.getWidth = function() {
                    return this._size
                }, this.getHeight = function() {
                    return this._size
                }, this.getTextWidth = function() {
                    return this._textWidth
                }, this.getSize = function() {
                    return this._size
                }, this.setFilter = function(t) {
                    throw Error("not supported for text textures")
                }, this.onLoad = function(t) {
                    t()
                }, this.isLoaded = function() {
                    return !0
                }, this.update()
            }
        }, {}],
        175: [function(t, e, i) {
            var n = t(157),
                r = t(162);
            e.exports = function(t, e) {
                var i = this;
                this.base = t, this.rect = e || null, this._wrapV = this._wrapU = this.base._gl.CLAMP_TO_EDGE, this._dirtyWrapModes = !0, this.set = function() {
                    var t = this.base._gl,
                        e = this.base._glState;
                    this.base._glTex && (e.bindTexture(this.base._glTex), this._dirtyWrapModes && (t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, this._wrapU), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, this._wrapV), this._dirtyWrapModes = !1))
                }, this.update = function() {
                    this.base.update()
                }, this.setWrapMode = function(t, e) {
                    function n(t) {
                        switch (t) {
                            case r.TEX_REPEAT:
                                return s.REPEAT;
                            case r.TEX_MIRRORED:
                                return s.MIRRORED_REPEAT
                        }
                        return s.CLAMP_TO_EDGE
                    }
                    var s = i.base._gl;
                    this._wrapU = n(t), this._wrapV = n(e), this._dirtyWrapModes = !0
                }, this.onLoad = function(t) {
                    this.base.onLoad(t)
                }, this.onError = function(t) {
                    this.base.onError(t)
                }, this.isLoaded = function() {
                    return this.base.isLoaded()
                }, this.toCanvas = function() {
                    return this.rect ? this.base.toCanvas(e) : this.base.toCanvas(new n.Rect(0, 0, this.base.width, this.base.height))
                }, this.draw = function(t, i, n, r, s, a, o) {
                    a = a || 1, o = o || 1;
                    var l = this.base.getObject();
                    if (this.base.isLoaded())
                        if (this.rect) {
                            var h = this.base.width,
                                c = this.base.height;
                            r = (r || e.w * h) * a, s = (s || e.h * c) * o, t.drawImage(l, e.x * h, e.y * c, e.w * h, e.h * c, i, n, r, s)
                        } else r = r || l.width, s = s || l.height, t.drawImage(l, i, n, r * a, s * o)
                }, this.getWidth = function() {
                    return this.base.isLoaded() ? e ? e.w * this.base.width : this.base.width : 0
                }, this.getHeight = function() {
                    return this.base.isLoaded() ? e ? e.h * this.base.height : this.base.height : 0
                }
            }
        }, {}],
        176: [function(t, e, i) {
            t = {
                name: "a_Pos",
                size: 2
            }, i = {
                name: "a_Coord",
                size: 2
            }, e.exports = {
                POS: [t],
                POS_UV: [t, i],
                POS_UV_COLOR: [t, i, {
                    name: "a_Color",
                    size: 4
                }]
            }
        }, {}]
    }, {}, [56]);
